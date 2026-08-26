#!/usr/bin/env node
/**
 * build-dist.mjs — собирает дистрибутив библиотеки из опубликованных копий скиллов.
 *
 * Модель — plans/2026-08-26 - component-dist-and-markup-contract.md (репо arrowdesign),
 * решения Р1, Р1а, Р1б, Р3, Р4.
 *
 * Почему сборка живёт ЗДЕСЬ, а не в arrowdesign рядом со скиллами: в этом репо уже
 * лежит всё нужное — копии CSS каждого компонента, все `component.meta.json`
 * и снапшот темы (`arrow-design-system/references/{studio-vars,derived}.css`), а рядом
 * уже работает `build-storybook.mjs`, читающий те же копии. Значит сборку можно повесить
 * на CI и не полагаться на память агента: скилл публикации (ACP) запускается только
 * вручную, и шаг «пересобери dist» в его инструкции исполнялся бы по памяти.
 *
 * Что собирается:
 *   dist/awds.css               все компоненты, регистрации вне слоя, правила в @layer awds
 *   dist/components/{name}.css  то же по одному компоненту
 *   dist/theme/arrowds.css      снапшот темы, отфильтрованный по замыканию используемых имён
 *   dist/manifest.json          состав: компоненты, версии, размеры, отчёт сборки
 *
 * Использование:
 *   node tools/build-dist.mjs            # собрать в dist/
 *   node tools/build-dist.mjs --check    # собрать в память и сравнить с лежащим (для CI и хука)
 *   node tools/build-dist.mjs --json
 */

import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const ADS = join(ROOT, 'arrow-design-system', 'references');
const PREFIX = 'awds-component-';

const argv = process.argv.slice(2);
const flag = (n) => argv.includes('--' + n);
const CHECK = flag('check');
const JSON_OUT = flag('json');

const sha = (s) => 'sha256:' + createHash('sha256').update(s).digest('hex');

/* ── парс CSS ─────────────────────────────────────────────────────────────── */

const stripComments = (css) => css.replace(/\/\*[\s\S]*?\*\//g, '');

/** Плоский разбор верхнего уровня: правила и @-блоки. */
function splitRules(css) {
  const out = [];
  let i = 0;
  while (i < css.length) {
    const brace = css.indexOf('{', i);
    if (brace === -1) break;
    const head = css.slice(i, brace).trim();
    let depth = 1;
    let j = brace + 1;
    while (j < css.length && depth > 0) {
      if (css[j] === '{') depth++;
      else if (css[j] === '}') depth--;
      j++;
    }
    const body = css.slice(brace + 1, j - 1);
    if (head) {
      out.push({
        selector: head.replace(/\s+/g, ' '),
        body: body.replace(/\n\s*\n/g, '\n').trimEnd(),
        at: head.startsWith('@'),
      });
    }
    i = j;
  }
  return out;
}

/** Регистрации: не каскад, а объявление сущности — они остаются ВНЕ слоя. */
const REGISTRATION = /^@(property|keyframes)\b/;

/* ── сбор компонентов ─────────────────────────────────────────────────────── */

function components() {
  const dirs = readdirSync(ROOT, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name.startsWith(PREFIX))
    .map((d) => d.name)
    .filter((d) => existsSync(join(ROOT, d, 'component.meta.json')))
    .sort();

  // Слой кольца фокуса идёт первым: он объявляет контракт --awds-focus-*, на который
  // ссылаются остальные. Дальше — алфавит; он же даёт нужный порядок внутри семейств
  // (button раньше button-favorites, см. правило владения ниже).
  const first = PREFIX + 'focus-selection';
  const ordered = [first, ...dirs.filter((d) => d !== first)].filter((d) => dirs.includes(d));

  return ordered.map((dir) => {
    const meta = JSON.parse(readFileSync(join(ROOT, dir, 'component.meta.json'), 'utf8'));
    const refs = join(ROOT, dir, 'references');
    const files = existsSync(refs) ? readdirSync(refs).filter((f) => f.endsWith('.css')).sort() : [];
    return { dir, name: dir.slice(PREFIX.length), meta, refs, files };
  });
}

/**
 * Правила одного компонента, без дублей базы между variant-файлами.
 *
 * `owned` — карта «нормализованный селектор → компонент, который его уже объявил».
 * Правило владения: ПЕРВЫЙ объявивший селектор владеет им, последующие пропускаются.
 *
 * Зачем это нужно. В отдельных файлах компоненты не встречаются, а в общем — да, и
 * тогда чужая копия чужого класса перебивает оригинал глобально. Живой случай:
 * `button-favorites` держит форк базы кнопки (`.btn`, `.btn svg`, `.btn--icon-only`,
 * `.btn:disabled`), отличающийся от `button` одним свойством `transition` — в общем
 * файле он менял бы анимацию ВСЕХ кнопок. База приезжает из `button`, favorites
 * оставляет только собственные `.btn-favorites*`. Пропуски попадают в отчёт: это
 * известное расхождение, снимется переделкой компонента.
 */
function componentRules(c, owned, report) {
  const out = [];
  const seen = new Set();
  for (const f of c.files) {
    const css = stripComments(readFileSync(join(c.refs, f), 'utf8'));
    for (const rule of splitRules(css)) {
      const key = rule.selector + '|' + rule.body;
      if (seen.has(key)) continue;      // база повторяется в каждом variant-файле
      seen.add(key);

      if (!rule.at) {
        const holder = owned.get(rule.selector);
        if (holder && holder !== c.name) {
          report.skipped.push({ component: c.name, selector: rule.selector, owner: holder });
          continue;
        }
        owned.set(rule.selector, c.name);
      }
      out.push(rule);
    }
  }
  return out;
}

function render(rules, header) {
  const outside = [];
  const inside = [];
  for (const r of rules) {
    const text = `${r.selector} {${r.body}\n}`;
    (r.at && REGISTRATION.test(r.selector) ? outside : inside).push(text);
  }
  const parts = [header];
  if (outside.length) parts.push(outside.join('\n\n'));
  if (inside.length) parts.push(`@layer awds {\n\n${inside.join('\n\n')}\n\n}`);
  return parts.join('\n\n') + '\n';
}

/* ── tree-shake снапшота темы ─────────────────────────────────────────────── */

/**
 * Оставить в снапшоте только те переменные, которые нужны собранному CSS, вместе с
 * транзитивным замыканием их значений.
 *
 * Две тонкости, без которых фильтр ломает тему молча:
 *  — ДВА вида имён. Компоненты ссылаются и на `--awds-*` (шкалы, ступени, State), и на
 *    роли без префикса (`rgb(var(--primary-core))`). Фильтр по одному префиксу отрезал
 *    бы все цвета.
 *  — ветви тем сохраняются ЦЕЛИКОМ. Одно имя объявлено под `:root`, `.theme-light`,
 *    `.theme-dark`, `.typo-*`, `:is(...):hover`, внутри `@media`. Фильтруем ИМЯ, а не
 *    объявление: попало имя — едут все его ветви, иначе тёмная тема или состояния
 *    отвалятся, а светлый rest продолжит работать (поломка невидима в статике).
 */
function shakeTheme(usedNames, sources) {
  const blocks = [];   // { ctx, selector, decls: [{name, value, raw}] }

  function walk(css, ctx) {
    for (const r of splitRules(css)) {
      if (r.at) {
        if (/^@(media|supports)/.test(r.selector)) walk(r.body, ctx ? `${ctx} ${r.selector}` : r.selector);
        continue;   // @property и прочее в снапшоте не фильтруем — их там нет
      }
      const decls = [];
      for (const m of r.body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
        decls.push({ name: m[1], value: m[2].trim() });
      }
      if (decls.length) blocks.push({ ctx, selector: r.selector, decls });
    }
  }
  for (const src of sources) walk(stripComments(src), '');

  // индекс: имя → все его объявления (для замыкания по значениям)
  const byName = new Map();
  for (const b of blocks) for (const d of b.decls) {
    if (!byName.has(d.name)) byName.set(d.name, []);
    byName.get(d.name).push(d);
  }

  const need = new Set(usedNames);
  const queue = [...need];
  while (queue.length) {
    const n = queue.pop();
    for (const d of byName.get(n) || []) {
      for (const m of d.value.matchAll(/var\(\s*(--[\w-]+)/g)) {
        if (!need.has(m[1])) { need.add(m[1]); queue.push(m[1]); }
      }
    }
  }

  const lines = [];
  let lastCtx = null;
  let open = false;
  for (const b of blocks) {
    const keep = b.decls.filter((d) => need.has(d.name));
    if (!keep.length) continue;
    if (b.ctx !== lastCtx) {
      if (open) { lines.push('}'); open = false; }
      if (b.ctx) { lines.push(`${b.ctx} {`); open = true; }
      lastCtx = b.ctx;
    }
    const pad = open ? '  ' : '';
    lines.push(`${pad}${b.selector} {`);
    for (const d of keep) lines.push(`${pad}  ${d.name}: ${d.value};`);
    lines.push(`${pad}}`);
  }
  if (open) lines.push('}');

  const declared = new Set(byName.keys());
  return {
    css: lines.join('\n') + '\n',
    stats: {
      declared: declared.size,
      kept: [...need].filter((n) => declared.has(n)).length,
      missing: [...need].filter((n) => !declared.has(n)).sort(),
    },
  };
}

/* ── сборка ───────────────────────────────────────────────────────────────── */

const stamp = 'Сгенерировано tools/build-dist.mjs — руками не править.';

function build() {
  const comps = components();
  const owned = new Map();
  const report = { skipped: [] };

  const perComponent = comps.map((c) => ({ c, rules: componentRules(c, owned, report) }));

  const files = new Map();

  for (const { c, rules } of perComponent) {
    if (!rules.length) continue;
    const header = `/* ArrowDS · ${c.name}@${c.meta.version ?? '—'}\n   ${stamp} */`;
    files.set(join('components', `${c.name}.css`), render(rules, header));
  }

  const allRules = perComponent.flatMap((x) => x.rules);
  const listed = perComponent.map(({ c }) => `${c.name}@${c.meta.version ?? '—'}`).join(', ');
  const bundleHeader = `/* ArrowDS components — ${perComponent.length} компонентов.\n   ${stamp}\n\n   Правила лежат в @layer awds: код потребителя вне слоёв сильнее любого правила\n   отсюда, независимо от специфичности. Регистрации @property/@keyframes — вне слоя.\n\n   Нужен слой значений: dist/theme/arrowds.css (или CSS темы Design Studio) и\n   составной класс темы на <html>: class="theme-default theme-light".\n\n   Состав: ${listed} */`;
  files.set('awds.css', render(allRules, bundleHeader));

  // имена, на которые ссылается собранный CSS
  const bundle = files.get('awds.css');
  const used = new Set([...bundle.matchAll(/var\(\s*(--[\w-]+)/g)].map((m) => m[1]));
  // приватные контракты компонентов объявлены здесь же — их из темы брать не нужно
  const declaredHere = new Set([...bundle.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]));
  const wanted = [...used].filter((n) => !declaredHere.has(n));

  /* Ссылка С FALLBACK (`var(--x, 0px)`) отсутствием в теме не считается: значение по
     умолчанию — осознанный приём, правило применится и без переменной. Так ведёт себя
     переменная, которую ставит JS в рантайме: `--pcard-dots-shift` выставляет галерея
     карточки через style.setProperty. В tree-shake такие имена всё равно ВХОДЯТ (если
     тема их объявляет, значение должно приехать), но в предупреждение — нет.
     Та же логика, что у token-refs-check.mjs в arrowdesign. */
  const required = new Set([...bundle.matchAll(/var\(\s*(--[\w-]+)\s*\)/g)].map((m) => m[1]));

  const theme = shakeTheme(wanted, [
    readFileSync(join(ADS, 'studio-vars.css'), 'utf8'),
    readFileSync(join(ADS, 'derived.css'), 'utf8'),
  ]);
  files.set(join('theme', 'arrowds.css'), `/* Значения темы ArrowDS — только то, что потребляют компоненты.\n   ${stamp}\n   Переменных: ${theme.stats.kept} из ${theme.stats.declared} объявленных в теме. */\n\n${theme.css}`);

  /* Версия ПАКЕТА — своя, не сумма версий компонентов: набор релизится как целое.
     Живёт в `dist-version.json` корня main и правится человеком при релизе (Р5: тег
     вместо npm-реестра). Состав версий компонентов — в manifest.json ниже. */
  const versionFile = join(ROOT, 'dist-version.json');
  const pkgVersion = existsSync(versionFile)
    ? JSON.parse(readFileSync(versionFile, 'utf8')).version
    : '0.0.0-dev';

  files.set('package.json', JSON.stringify({
    name: '@orazaevdesign/arrow-components',
    version: pkgVersion,
    description: 'CSS-компоненты ArrowDS на переменных темы Design Studio',
    license: 'UNLICENSED',
    sideEffects: ['*.css'],
    exports: {
      './awds.css': './awds.css',
      './theme/arrowds.css': './theme/arrowds.css',
      './components/*.css': './components/*.css',
      './manifest.json': './manifest.json',
    },
    files: ['awds.css', 'components/', 'theme/', 'manifest.json'],
  }, null, 2) + '\n');

  const manifest = {
    generator: 'tools/build-dist.mjs',
    package_version: pkgVersion,
    components: perComponent.map(({ c, rules }) => ({
      name: c.name,
      version: c.meta.version ?? null,
      variants: Object.keys(c.meta.variants || {}),
      sizes: c.meta.size_scale ?? null,
      rules: rules.length,
      bytes: files.get(join('components', `${c.name}.css`))?.length ?? 0,
    })),
    bundle: { bytes: bundle.length, rules: allRules.length, hash: sha(bundle) },
    theme: {
      bytes: files.get(join('theme', 'arrowds.css')).length,
      variables_kept: theme.stats.kept,
      variables_declared: theme.stats.declared,
      missing: theme.stats.missing.filter((n) => required.has(n)),
    },
    skipped_selectors: report.skipped,
  };
  files.set('manifest.json', JSON.stringify(manifest, null, 2) + '\n');

  return { files, manifest, theme, missing: manifest.theme.missing };
}

/* ── запись / проверка ────────────────────────────────────────────────────── */

const { files, manifest, missing } = build();

if (CHECK) {
  const stale = [];
  for (const [rel, content] of files) {
    const p = join(DIST, rel);
    if (rel === 'manifest.json') continue;      // в манифесте есть отчёт, сравниваем по CSS
    if (!existsSync(p)) { stale.push(`${rel} — нет в dist/`); continue; }
    if (readFileSync(p, 'utf8') !== content) stale.push(`${rel} — разошлось`);
  }
  const known = new Set([...files.keys()].map((r) => join(DIST, r)));
  if (existsSync(DIST)) {
    const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) =>
      e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)]);
    for (const p of walk(DIST)) if (!known.has(p)) stale.push(`${p.slice(DIST.length + 1)} — лишний файл`);
  }
  if (JSON_OUT) console.log(JSON.stringify({ stale }, null, 2));
  else if (stale.length) {
    console.log('dist/ устарел:');
    for (const s of stale) console.log('  ' + s);
  } else console.log('dist/ актуален.');
  process.exit(stale.length ? 1 : 0);
}

rmSync(DIST, { recursive: true, force: true });
for (const [rel, content] of files) {
  const p = join(DIST, rel);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, content, 'utf8');
}

if (JSON_OUT) {
  console.log(JSON.stringify(manifest, null, 2));
} else {
  const kb = (n) => (n / 1024).toFixed(1) + ' КБ';
  console.log(`dist/ собран: ${manifest.components.length} компонентов`);
  console.log(`  awds.css               ${kb(manifest.bundle.bytes)}, правил ${manifest.bundle.rules}`);
  console.log(`  theme/arrowds.css      ${kb(manifest.theme.bytes)}, переменных ${manifest.theme.variables_kept} из ${manifest.theme.variables_declared}`);
  console.log(`  components/*.css       ${manifest.components.length} файлов`);
  if (manifest.skipped_selectors.length) {
    console.log(`\n  Пропущено правил с чужими селекторами: ${manifest.skipped_selectors.length}`);
    for (const s of manifest.skipped_selectors) console.log(`    ${s.component}: ${s.selector}  (владеет ${s.owner})`);
  }
  if (missing.length) {
    console.log(`\n  ⚠ обязательные ссылки без объявления в теме: ${missing.length}`);
    for (const n of missing.slice(0, 12)) console.log('    ' + n);
  }
}
