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
| **state** | 961 | — | list (186), form-control (184), button (163), badge (68), variation (37), check-radio (27), range (27), cell (24), … +33 | `--awds-state-opacity-chevron-shrink-rest` |
| **roles** | 296 | light · dark | surface (34), primary (28), secondary (28), tertiary (28), accent (28), addition (28), info (28), success (28), … +3 | `--primary-core-light` |
| **typography** | 228 | desktop · tablet · mobile | font-size (57), line-height (57), line-height-compact (57), letter-spacing (57) | `--awds-typography-font-size-50-desktop` |
| **size** | 215 | — | rectangle (98), square (40), notice (30), nav (15), dropdown (14), tabs (10), range (3), profile-button (3), … +1 | `--awds-size-rectangle-50-padding` |
| **wysiwyg** | 138 | medium · small · large | font-size (36), line-height (36), letter-spacing (36), gap (30) | `--awds-wysiwyg-font-size-h1-medium` |
| **rounded** | 72 | smooth · rounded · none | border-radius (36), outline (36) | `--awds-rounded-border-radius-50-smooth` |
| **shadow** | 60 | elevation-1 · elevation-2 · elevation-3 · elevation-4 | shadow1 (20), shadow2 (20), shadow3 (20) | `--awds-shadow-shadow1-color-elevation-1` |
| **layout** | 45 | desktop · tablet · mobile | card (24), section (21) | `--awds-layout-section-width-large-desktop` |
| **space** | 39 | — | 0 (1), 1 (1), 2 (1), 3 (1), 4 (1), 5 (1), 6 (1), 7 (1), … +31 | `--awds-space-0` |
| **control** | 39 | — | font-size (13), line-height (13), letter-spacing (13) | `--awds-control-font-size-50` |
| **opacity** | 21 | — | 0 (1), 5 (1), 10 (1), 15 (1), 20 (1), 25 (1), 30 (1), 35 (1), … +13 | `--awds-opacity-0` |
| **breakpoints** | 9 | — | desktop (3), tablet (3), mobile (3) | `--awds-breakpoints-desktop-large` |
| **zindex** | 8 | — | dropdown (1), sticky (1), fixed (1), backdrop (1), offcanvas (1), modal (1), popover (1), tooltip (1) | `--awds-zindex-dropdown` |
| **font** | 8 | — | weight (5), family (3) | `--awds-font-family-system` |

Всего 2139 токенов в 14 коллекциях.

## Смысл групп

Описание живёт в самой студии (поле переменной) и приезжает сюда через снапшот. Здесь —
что это за шкала, без чисел; полный текст со ступенями и ссылками стоит комментарием рядом
с переменной в `references/studio-vars.css`. **У ролей описаний нет** — поля под них в API
студии не существует, смысл ролей описан в `SKILL.md`.

| Коллекция | Группа | Что это |
| --- | --- | --- |
| `breakpoints` | `desktop` | Граница вьюпорта |
| `breakpoints` | `mobile` | Граница вьюпорта |
| `breakpoints` | `tablet` | Граница вьюпорта |
| `control` | `font-size` | Кегль текста контрола |
| `control` | `letter-spacing` | Межбуквенный интервал контрола |
| `control` | `line-height` | Интерлиньяж контрола |
| `font` | `family` | Системный стек шрифтов для заголовков. |
| `font` | `weight` | Начертание medium |
| `layout` | `card` | Минимальная ширина баннера в половину ряда (два в ряд). |
| `layout` | `section` | Боковое поле колонки |
| `opacity` | `—` | Прозрачность 50%. |
| `rounded` | `border-radius` | Скругление |
| `rounded` | `outline` | Радиус кольца фокуса |
| `shadow` | `shadow1` | Слой 1 композита тени |
| `shadow` | `shadow2` | Слой 2 композита тени |
| `shadow` | `shadow3` | Слой 3 композита тени |
| `space` | `—` | Шаг шкалы отступов |
| `typography` | `font-size` | Кегль текста |
| `typography` | `letter-spacing` | Межбуквенный интервал |
| `typography` | `line-height-compact` | Плотный интерлиньяж |
| `typography` | `line-height` | Интерлиньяж |
| `wysiwyg` | `font-size` | Кегль роли текста lead. |
| `wysiwyg` | `gap` | Отступ сверху у заголовка h2. |
| `wysiwyg` | `letter-spacing` | Межбуквенный интервал роли текста lead. |
| `wysiwyg` | `line-height` | Интерлиньяж роли текста lead. |
| `zindex` | `—` | Слой наложения: 1050 |

## Как из токена получается имя CSS-переменной

Имя **не выводится правилами** — оно приходит из студии полем
`$extensions["io.designstudio"].cssVar` и лежит в карте для ACB
(`component-token-map.json`). Практический вид: `--awds-{коллекция}-{путь}`, всё в
нижнем регистре. До 02.09.2026 сегмент коллекции удваивался (`--awds-space-space-4`) —
таких имён в теме больше нет, встретил в коде — это обрыв:

| Токен в студии | CSS-переменная |
| --- | --- |
| `space / 4` | `--awds-space-4` |
| `size / rectangle / 600 / padding` | `--awds-size-rectangle-600-padding` |
| `state / button / primary / bg-hover` (состояние — в имени, слой плоский с 02.09.2026) | `--awds-state-button-primary-bg-hover` |
| роль `Primary / Core` | `--primary-core` (у ролей своего префикса нет) |

**Цвет — RGB-триплет**, а не готовый цвет: `--primary-core: 250 216 22`. Потреблять
только через обёртку: `rgb(var(--primary-core))`, с альфой —
`rgb(var(--primary-core) / var(--awds-opacity-50))`.

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
| `.rounded-rounded` | 1 |
| `.rounded-none` | 1 |
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
| длительность и кривая перехода | `references/derived.css` → поле `styles` темы | ни один из трёх типов не держит `0.15s` и `cubic-bezier()`; замер 04.09.2026 |
| размер от кегля, блюр, одиночная длительность | `own_values` меты компонента с причиной | ячеек нет; проверка — `node scripts/component-version.mjs --own-values`. Толщина линии сюда **не** относится: это `--awds-space-px` (1px) и `--awds-space-0-5` (2px) |

## Где смотреть значение и чему верить

| Источник | Что это | Когда |
| --- | --- | --- |
| `references/studio-vars.css` | офлайн-снапшот `vars` темы, обновляется `scripts/sync-studio-vars.mjs` | обычное чтение, греп |
| `references/derived.css` | слой производных: композит тени и движение (`--awds-motion-*`) | когда переменной нет в снапшоте |
| `GET /themes/21/compiled` | **эталон**: одна компиляция, разная упаковка | спор о значении, сверка |
| `token-snapshot/theme-tokens.json` | состояние под git, история значений | «что поехало» — `scripts/token-diff.mjs` |

Правила сверки (контракт от разработчика студии): эталон — `compiled`; цвет сравнивается
**в hex**, никогда в каналах; обратная конвертация каналы → hex как шаг сверки запрещена.
`variables?format=css` ≡ `compiled.vars` строка в строку, `/css` = каналы(vars) +
`styles`. Ловушка: `/css` отдаёт `vars` **и** `styles` склеенными — значение,
«работающее» в этой выдаче, может приходить из слоя производных, а не из переменных темы.

Сомневаешься — спроси тему, а не файл: снапшот отстаёт от студии на время между правкой и
`sync-studio-vars`.
