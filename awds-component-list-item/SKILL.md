---
name: awds-component-list-item
description: Строка списка ArrowDS: пункт меню, пункт выпадающего списка, вкладка таббара, плитка выбора варианта. Для перечислений и навигационных списков. Токены ArrowDS, работает и по Figma-ссылке.
---

# List-item ArrowDS

Строка списка: слот слева, текст, слот справа. Из неё собираются меню, пункты выпадающего списка, вкладки таббара, строки поиска и плитки выбора вариаций. Общая картина токенов — `arrow-design-system`, регенерация скилла из Figma — `arrow-components-builder`.

Это **кирпич, а не список.** Компонент отвечает за одну строку: её геометрию, состояния и текст. Панель, скролл, роли ARIA у контейнера, навигация стрелками и сам факт выбора — на том, кто список собирает.

## Разметка

```html
<button type="button" class="list-item list-item-transparent list-item--400">
  <span class="list-item__prefix" aria-hidden="true">
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="10" cy="10" r="7"/></svg>
  </span>
  <span class="list-item__content">
    <span class="list-item__title">Алматы</span>
    <span class="list-item__description">Казахстан</span>
  </span>
  <span class="list-item__suffix" aria-hidden="true">
    <svg class="list-item__check" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m4 10 4 4 8-8"/></svg>
  </span>
</button>
```

**Корень — интерактивный элемент**, потому что на нём живут hover / active / focus: `<button>` для действия, `<a>` для перехода. Если строка не кликабельна — тот же класс на `<li>` или `<div>`, но тогда убери `cursor: pointer` на своей стороне.

**Слоты, описание и галочка опциональны.** Минимальная строка — только `__content` с `__title`.

**Класс варианта обязателен.** База `.list-item` бесцветна — как `.btn` без `.btn-primary`.

## Варианты

Двенадцать — по числу ролей `list/*` в дизайн-системе. Геометрия у всех одна, отличаются только цвета и то, на что они реагируют.

| Класс | Роль токенов | Figma | Когда |
|---|---|---|---|
| `list-item-transparent` | `unselected-transparent` | Transparent | Поверх готовой поверхности: попап, карточка, сайдбар. Подсветка только под курсором |
| `list-item-default` | `unselected` | Default | Невыбранная строка на собственной подложке, текст приглушён |
| `list-item-default-selected` | `selected` | Default-selected | Выбранная строка того же списка: подложка та же, текст на полный контраст |
| `list-item-actual-selected` | `unselected-actual` | Actual-selected | Текущее, действующее значение: обводка по контуру + акцентный текст |
| `list-item-accent-selected` | `selected-secondary` | Accent-selected | Выбор с брендовой заливкой — самый заметный. Его же использует попап `select` |
| `list-item-tabbar` | `unselected-tabbar` | Tabbar | Неактивная вкладка нижней панели |
| `list-item-tabbar-selected` | `selected-tabbar` | Tabbar-selected | Активная вкладка нижней панели |
| `list-item-menu` | `unselected-menu` | Menu | Пункт меню: при наведении подложка + акцентный текст |
| `list-item-menu-selected` | `selected-menu` | Menu-selected | Текущий пункт меню |
| `list-item-variation` | `unselected-variation` | Variaton | Плитка вариации товара, **всегда с описанием** |
| `list-item-variation-selected` | `selected-variation` | Variation-selected | Выбранная вариация: брендовая заливка и брендовая обводка |
| `list-item-variation-indeterminate` | `indeterminate-variation` | Variaton-indeterminate | Вариация выбрана частично |

Полная таблица цветов по состояниям, когда брать и чего избегать — в reference каждого варианта: [transparent](references/list-item-transparent.md), [default](references/list-item-default.md), [default-selected](references/list-item-default-selected.md), [actual-selected](references/list-item-actual-selected.md), [accent-selected](references/list-item-accent-selected.md), [tabbar](references/list-item-tabbar.md), [tabbar-selected](references/list-item-tabbar-selected.md), [menu](references/list-item-menu.md), [menu-selected](references/list-item-menu-selected.md), [variation](references/list-item-variation.md), [variation-selected](references/list-item-variation-selected.md), [variation-indeterminate](references/list-item-variation-indeterminate.md).

**Варианты ходят парами** — невыбранный и выбранный: `default` / `default-selected`, `tabbar` / `tabbar-selected`, `menu` / `menu-selected`, `variation` / `variation-selected`. Держи пару вместе: смешивать `menu` с `default-selected` значит показывать выбор не тем способом, каким его показывает остальной список.

**Имена нормализованы.** В Figma фреймы называются «Variaton» (опечатка, пропущена `i`) — в CSS это `variation` и `variation-indeterminate`. Точные подписи из макета лежат в `component.meta.json` → `variants[].figma_label`.

## Горизонталь текста — переключается, и не так, как у input

У `input` и `select` отступ текста задаёт **само поле**: нет иконки — `text-gap`, есть — `padding`. Здесь наоборот: отступ несёт **слот**, у которого паддинг со всех сторон.

| С этой стороны | Отступ контента | Кто его даёт |
|---|---|---|
| Слот есть | `0` | сам слот своим `padding` |
| Слота нет | `rectangle-{N}-text-gap` | контент |

Работает через `:has()`, руками ничего включать не надо. Результат для глаза одинаковый, механика другая — и если поправить одну сторону, не тронув правило, строка разъедется.

Взято не по аналогии с `input`: у вложенного компонента `Content List` есть переключатель `Padding`, и в положении `True` он привязан к `rectangle/500/text-gap = 18`.

## Геометрия

Высота не задаётся явно: `2 × padding + line-height`. Совпадает с `awds-component-input` и `awds-component-select` того же размера — в одной форме контрол и строка списка встают ровно.

| Size | Высота | С описанием | padding | icon | rounded | text-gap | Заголовок | Описание |
|---|---|---|---|---|---|---|---|---|
| 600 | 52 | 74 | 16 | 20 | 10 | 18 | 16/20 | 14/20 |
| 500 | 48 | 70 | 14 | 20 | 8 | 18 | 16/20 | 14/20 |
| 400 | 40 | 58 | 10 | 20 | 8 | 16 | 14/20 | 13/16 |
| 300 | 36 | 54 | 8 | 20 | 6 | 14 | 14/20 | 13/16 |
| 200 | 32 | 50 | 8 | 16 | 6 | 14 | 13/16 | 12/16 |
| 100 | 24 | 42 | 4 | 16 | 6 | 10 | 13/16 | 12/16 |
| 50 | 20 | 38 | 2 | 16 | 4 | 8 | 12/16 | 11/16 |

**Проверено числами**, а не глазами: 12 вариантов × 7 размеров = 84 замера геометрии плюс 36 цветовых снимков в headless Chromium, совпадение с макетом до пикселя.

**Зазор заголовок → описание — 2px, фикс на всех размерах.** Это `--awds-space-space-0-5`, а **не** `rectangle-{N}-gap`: тот идёт 2/2/4/6/6/6/8 и на размере 600 дал бы 8 вместо 2. На 100 и 50 значения случайно совпадают — там ошибку не заметить.

**С описанием иконки остаются у верха, а не центрируются.** В макете корень — `align-items: flex-start`, каждый слот центрует себя сам своим паддингом. Пока описания нет, всё сходится (слот 48 = контент 48 на размере 500) и выглядит как центрирование; с описанием контент вырастает до 70, а слот остаётся 48 и прижат к верху. Это поведение макета, не артефакт вёрстки.

## Состояния

| Состояние | Селектор |
|---|---|
| Rest | `.list-item-{вариант}` |
| Hover | `.list-item-{вариант}:hover:not(:disabled):not([aria-disabled="true"])` |
| Active | `.list-item-{вариант}:active:not(:disabled):not([aria-disabled="true"])` |
| Focus | `.list-item:focus-visible` |
| Disabled | `:disabled`, `[aria-disabled="true"]` |

**Правило `:active` существует не просто так.** У большинства вариантов Active в макете совпадает с Rest, и напрашивается его не писать. Но при нажатии курсор всё ещё висит над строкой, то есть hover активен, — без явного правила фон остался бы серым. Правило именно **отменяет** hover, поэтому оно перечисляет все свойства, которые менял hover.

**Отсечка выключенного — через `:not()`, а не `:enabled`.** Корнем может быть `<li>` или `<a>`, а `:enabled` на не-form-элементах не матчится: правило молча перестало бы работать ровно там, где список собран не на кнопках.

**Кольцо фокуса общее для всех вариантов** — `surface-on-highest`, 2px, как у button / checkbox / radio / switch. Это **не** вариант `input` и `select`, где кольцо своё (`primary-core` при 50%). `outline-offset: 1px` выведен числом: в макете `outline/500 = 9` при `rounded 8`, `outline/600 = 11` при `rounded 10` — радиус кольца ровно `rounded + 1`.

**У трёх вариантов состояний нет вовсе** — `accent-selected`, `menu-selected`, `variation-selected` выглядят одинаково в Rest, Hover, Focus и Active. Строка уже выбрана, подсвечивать нечего. Следствие: на наведение она **не отвечает**, и если по ней можно кликнуть, чтобы снять выбор, сообщи это текстом или иконкой.

## Откуда берутся значения

| Что | Источник | Где живёт |
|---|---|---|
| Цвета состояний | `rgb(var(--*))` inline, своя роль на вариант | `references/list-item-{вариант}.css` |
| Цвет описания | роль `list/unselected/description` (см. ниже) | `map.state.*.list` |
| Цвет галочки | роль `icon-check` варианта | `map.state.*.list.{роль}.icon-check` |
| Фокус-кольцо | `rgb(var(--surface-on-highest))` | `map.state.focus.focus-selection.outline` |
| Геометрия | `var(--awds-rectangle-{N}-*)` | `map.size.rectangle` |
| Горизонталь без слота | `var(--awds-rectangle-{N}-text-gap)` | Figma: проп `Padding` у `Content List` |
| Зазор заголовок/описание | `var(--awds-space-space-0-5)` | Figma: `space/0,5`, фикс |
| Типографика | `var(--awds-rectangle-{N}-typography-*)` → `control-{M}` | там же |
| Типографика описания | `var(--awds-rectangle-{N}-description-*)` → `control-{M−1}` | там же |
| Opacity для disabled | `var(--awds-opacity-opacity-40)` | css-global |

## Размерные модификаторы

| Класс | Высота | Шрифт | Когда |
|---|---|---|---|
| `list-item--50` | 20px | 12/16 | Плотные таблицы, инлайн-подсказки |
| `list-item--100` | 24px | 13/16 | Компактные меню |
| `list-item--200` | 32px | 13/16 | Боковые панели, фильтры |
| `list-item--300` | 36px | 14/20 | Пункт дропдауна под контрол 400 |
| `list-item--400` | 40px | 14/20 | **По умолчанию** — обычные меню и списки |
| `list-item--500` | 48px | 16/20 | Ключевые списки, тач |
| `list-item--600` | 52px | 16/20 | Крупные тач-интерфейсы |

Ширина — 100%: строка тянется на контейнер. 235px в макете — ширина демо-ячейки.

**Внутри выпадающего списка строка на ступень ниже контрола:** у `select--500` пункт — `list-item--400`. Это не описка, а правило семейства (см. `awds-component-select`).

## Пять вещей, которые легко сделать неправильно

1. **Не ставь горизонтальный `padding` контенту руками.** Он переключается через `:has()` от наличия слотов. Прописав его жёстко, получишь двойной отступ там, где слот уже дал свой.
2. **Зазор заголовок/описание — `space-0-5`, не `rectangle-{N}-gap`.** Ошибка не видна на размерах 50 и 100 и вылезает на 600 восемью пикселями вместо двух.
3. **Не центрируй слоты при описании.** `align-items: flex-start` — из макета; иконка у строки с описанием стоит напротив заголовка, а не по центру блока.
4. **Не заменяй `inset box-shadow` на `border`.** Плюс 2px к высоте, и строка перестаёт совпадать с input и select того же размера.
5. **Не смешивай варианты из разных пар.** Невыбранный `menu` рядом с выбранным `default-selected` — два разных языка выбора в одном списке.

## Доступность

- **Роли задаёт контейнер, а не строка.** Меню — `role="menu"` + `role="menuitem"`; список выбора — `role="listbox"` + `role="option"` с `aria-selected`; вкладки — `aria-current="page"`. Компонент их не проставляет: одна и та же строка живёт в разных списках.
- **Выбор объявляй программно, а не только цветом.** Во всех «selected»-вариантах выбор передаётся заливкой или контрастом текста; без атрибута для чтения с экрана он не существует.
- Кликабельная строка должна быть `<button>` или `<a>` — тогда клавиатура и чтение с экрана работают сами.
- Декоративная иконка в слоте → `aria-hidden="true"`. Если иконка несёт смысл (статус, «выбрано»), дай ей текстовую подпись.
- Фокус виден при входе с клавиатуры (`:focus-visible`), кольцо стоит в 1px от края.
- Размеры 50 и 100 (20 и 24px) меньше тач-минимума — только для мыши и плотных таблиц.
- Disabled гасится `opacity: 40%` — контраст заведомо ниже AA. Рядом нужен текст-причина, а не только серость.

**Где роли не дотягивают до 4.5:1** (посчитано, не на глаз; это свойство токенов, а не вёрстки):

| Вариант | Что | Контраст |
|---|---|---|
| `default` | заголовок и описание в Rest, `secondary-container-on` на `secondary-container-core` | **3.69:1** |
| `transparent`, `variation-indeterminate` | описание в Rest, `secondary-container-on` на белом | **3.95:1** |
| `actual-selected` | описание, `accent-container-on-low` | **2.06:1** в Rest, **1.93:1** на hover |

У `default` приглушённый текст в Rest — намеренный приём («ещё не выбрано»), но на этом контрасте он читается плохо; при наведении и фокусе строка выходит на полный контраст. Если в списке важен сам текст, а не только факт выбора, бери `transparent` или `default-selected`.

## Три находки в макете и токенах

**1. Описание красится ролью `list/unselected/description`, а не собственной ролью варианта.** Проверено в четырёх независимых ячейках (Transparent Rest; Variaton Rest, Hover и Focus). Следствие: цвет описания **меняется по состоянию** — `secondary-container-on` в покое, `secondary-container-on-high` при наведении и фокусе. Исключение: `variation-selected` и `variation-indeterminate` используют свои роли. Реализовано как в макете.

**2. В репозитории токенов битый алиас.** У `list/unselected/border` в состоянии Hover стоит `{form-control.secondary.dim}` — такого пути нет, у `form-control` нет варианта `secondary`. Макет рендерит `#ededed`, что ровно равно `role.secondary.dim`: похоже на опечатку неймспейса. Взято по значению; после правки токенов достаточно перегенерировать скилл.

**3. У `variation-selected` в ячейке Rest включён `focus-selection/outlineShow`** со значением `outlineVariant` = `primary-core` — тем же цветом, что и рамка. Трактовано как задублированный контур: в CSS рамка одна, второго кольца не добавляем, иначе получилось бы две обводки.

## Storybook

Открой [references/preview.html](references/preview.html) локально (`file://`) — переключатель варианта, матрица 7 размеров × 5 состояний, все двенадцать вариантов рядом на одном размере, пример в панели дропдауна, переключатели слотов, описания, темы и мода скругления, живые замеры computed px.

Зеркала состояний (`.is-hover`, `.is-focus`, `.is-active`) генерируются ACB из того же `component-token-map.json`, что и сами варианты, и лежат в инлайновом `<style>`: на `file://` прочитать правила из подключённых CSS нельзя.

## Refresh

```
обнови awds-component-list-item под Figma
```

ACB зайдёт в Figma по сохранённым ссылкам (см. `component.meta.json`), вытащит актуальные variable_defs по всем двенадцати фреймам, сравнит со снапшотом, покажет diff и обновит CSS + preview. Документация (этот файл и `list-item-*.md`) — не трогается.

## Алгоритм использования

1. Выбери вариант по таблице выше — и сразу его пару, если в списке бывает выбранное состояние.
2. Возьми разметку из reference варианта; выбери корень — `<button>`, `<a>` или неинтерактивный `<li>`.
3. Подключи `references/list-item-{вариант}.css` — файлы самодостаточны, база в них одинакова, можно подключить только нужные.
4. Убедись, что на странице есть DS-токены (`--awds-rectangle-*`, `--awds-space-*`, `--awds-opacity-*`, `--awds-font-*`) и сайтовый `css-variables.css` с ролями под классом `.theme-default.theme-light` на `<html>`.
5. Поставь класс варианта и размерный модификатор (`list-item--{N}`; без него действует 400).
6. Роли ARIA, состояние выбора и навигацию с клавиатуры задай на контейнере списка — компонент их не проставляет.

## Соседние компоненты

- **[awds-component-select](../awds-component-select/SKILL.md)** — нативный выпадающий список. Его раскрытая панель построена по тому же макету `◆ / Dropdown`, а пункт внутри — эта же строка на ступень ниже размера контрола; выбранный пункт оформлен как `accent-selected`.
- **[awds-component-input](../awds-component-input/SKILL.md)** — текстовое поле. Та же shape-шкала `rectangle`, та же высота при равном размере, но горизонталь текста переключается зеркально (см. выше).
- **[awds-component-checkbox](../awds-component-checkbox/SKILL.md)**, **[awds-component-radio](../awds-component-radio/SKILL.md)** — если в строке нужен настоящий переключатель, он кладётся в слот `__prefix`, а не рисуется иконкой.
- **[awds-component-table](../awds-component-table/SKILL.md)** — для табличных данных с колонками. Список — это одна колонка смысла, таблица — несколько; не растягивай строку списка до таблицы.
