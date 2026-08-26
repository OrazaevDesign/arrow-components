# Карта темы студии: что где искать

<!-- СГЕНЕРИРОВАНО scripts/build-tokens-map.mjs — руками не правь.
     Источник: token-snapshot/theme-tokens.json (снимок tokens/export темы 21). -->

**Значений здесь нет и не будет.** Карта отвечает на «в какой коллекции искать и какие там
группы»; само значение смотрится в снапшоте переменных или в живой теме:

```bash
grep -n "awds-size-rectangle-600" .claude/skills/arrow-design-system/references/studio-vars.css
node .agents/skills/design-studio-api/scripts/variables-public.mjs 21 --format css --raw | grep …
```

Причина: справочники со значениями уже сгнили один раз — были написаны на именах, которых
в теме нет, и агент по ним приносил в код переменные-пустышки. Карта генерируется, поэтому
расходиться ей нечем.

## Коллекции

| Коллекция | Токенов | Моды | Группы внутри | Пример имени |
| --- | --- | --- | --- | --- |
| **State** | 1476 | Rest · Hover · Focus · Active | list (336), badge (272), form-control (224), button (192), nav-button (48), variation (48), cell (48), check-radio (40), … +12 | `--awds-state-opacity-control-enabled-rest` |
| **Typography** | 468 | Desktop · Tablet · Mobile | typography (228), body (90), display (60), heading (45), title (45) | `--awds-typography-typography-font-size-50-desktop` |
| **roles** | 294 | light · dark | Surface (34), Primary (28), Secondary (28), Tertiary (28), Accent (28), Addition (28), Info (28), Success (28), … +3 | `--primary-core-light` |
| **Size** | 209 | — | rectangle (98), square (40), notice (30), nav (15), tabs (10), dropdown (8), range (3), profile-button (3), … +1 | `--awds-size-rectangle-50-padding` |
| **Layout** | 180 | Desktop · Tablet · Mobile | layout (180) | `--awds-layout-layout-market-section-large-max-desktop` |
| **WYSIWYG** | 138 | Medium · Small · Large | WYSIWYG (138) | `--awds-wysiwyg-wysiwyg-font-size-h1-medium` |
| **Rounded** | 72 | Smooth · None · Rounded | border-radius (36), outline (36) | `--awds-rounded-border-radius-50-smooth` |
| **Shadow** | 60 | elevation-1 · elevation-2 · elevation-3 · elevation-4 | shadow1 (20), shadow2 (20), shadow3 (20) | `--awds-shadow-shadow1-color-elevation-1` |
| **Space** | 39 | — | space (39) | `--awds-space-space-0` |
| **Control** | 39 | — | font-size (13), line-height (13), letter-spacing (13) | `--awds-control-font-size-50` |
| **Opacity** | 21 | — | opacity (21) | `--awds-opacity-opacity-0` |
| **Breakpoints** | 17 | — | breakpoints (17) | `--awds-breakpoints-breakpoints-market-desktop-large` |
| **Zindex** | 8 | — | zindex (8) | `--awds-zindex-zindex-dropdown` |
| **Font** | 7 | — | weight (4), family (3) | `--awds-font-family-system` |

Всего 3028 токенов в 14 коллекциях.

## Как из токена получается имя CSS-переменной

Имя **не выводится правилами** — оно приходит из студии полем
`$extensions["io.designstudio"].cssVar` и лежит в карте для ACB
(`component-token-map.json`). Практический вид: `--awds-{коллекция}-{путь}`, где имя
коллекции удваивается, если путь начинается с него же:

| Токен в студии | CSS-переменная |
| --- | --- |
| `Space / space / 4` | `--awds-space-space-4` |
| `Size / rectangle / 600 / padding` | `--awds-size-rectangle-600-padding` |
| `State / button / primary / bg` [Hover] | `--awds-state-button-primary-bg-hover` |
| роль `Primary / Core` | `--primary-core` (у ролей своего префикса нет) |

**Цвет — RGB-триплет**, а не готовый цвет: `--primary-core: 250 216 22`. Потреблять
только через обёртку: `rgb(var(--primary-core))`, с альфой —
`rgb(var(--primary-core) / var(--awds-opacity-opacity-50))`.

## Роли

Групп ролей 12: `accent`, `addition`, `awds`, `error`, `extended`, `info`, `primary`, `secondary`, `success`, `surface`, `tertiary`, `warning`.

У каждой роли два мода — `light` и `dark`: студия эмитит `--primary-core-light` и
`--primary-core-dark`, а `--primary-core` ссылается на активный. Переключение — класс
темы на `<html>`, составной: `theme-default` + `theme-light` / `theme-dark`.

## Чем переключаются моды

Мод коллекции компилируется либо в класс (SCOPE), либо в обёртку (TEMPLATE). Что реально
встречается в скомпилированном CSS темы:

| Обёртка | Блоков в CSS |
| --- | --- |
| `.theme-light` | 1 |
| `.theme-dark` | 1 |
| `.desktop` | 1 |
| `@media (max-width: 1067px)` | 1 |
| `@media (max-width: 615px)` | 1 |
| `.rounded-smooth` | 1 |
| `.rounded-none` | 1 |
| `.rounded-rounded` | 1 |
| `.typo-medium` | 1 |
| `.typo-small` | 1 |
| `.typo-large` | 1 |

Отсюда важное следствие: **`.typo-*` и `.rounded-*` — не токены, а CSS-проекция мода
коллекции.** В Figma та же ось существует как режим коллекции, поэтому класса в макете нет
и быть не может.

## Границы: чего студия не выражает

| Что | Где живёт | Почему не ячейка |
| --- | --- | --- |
| композит тени `--awds-shadow-elevation-1…4` | `references/derived.css` → поле `styles` темы | тень это 18 переменных, ни один из трёх типов (COLOR, NUMBER, DIMENSION) не держит смесь размеров с цветом |
| контракт кольца фокуса `--awds-focus-*` | компонент `awds-component-focus-selection` | кольцо — часть компонента, а не значение системы |
| альфа (`роль / 50%`) | там же, в правиле компонента | альфа в студии невыразима |
| толщина линии, длительность анимации, размер от кегля | `own_values` меты компонента с причиной | ячеек нет; проверка — `node scripts/component-version.mjs --own-values` |

## Где смотреть значение и чему верить

| Источник | Что это | Когда |
| --- | --- | --- |
| `references/studio-vars.css` | офлайн-снапшот `vars` темы, обновляется `scripts/sync-studio-vars.mjs` | обычное чтение, греп |
| `references/derived.css` | слой производных (композит тени) | когда переменной нет в снапшоте |
| `GET /themes/21/compiled` | **эталон**: одна компиляция, разная упаковка | спор о значении, сверка |
| `token-snapshot/theme-tokens.json` | состояние под git, история значений | «что поехало» — `scripts/token-diff.mjs` |

Правила сверки (контракт от разработчика студии): эталон — `compiled`; цвет сравнивается
**в hex**, никогда в каналах; обратная конвертация каналы → hex как шаг сверки запрещена.
`variables?format=css` ≡ `compiled.vars` строка в строку, `/css` = каналы(vars) +
`styles`. Ловушка: `/css` отдаёт `vars` **и** `styles` склеенными — значение,
«работающее» в этой выдаче, может приходить из слоя производных, а не из переменных темы.

Сомневаешься — спроси тему, а не файл: снапшот отстаёт от студии на время между правкой и
`sync-studio-vars`.
