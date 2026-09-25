---
name: awds-component-focus-selection
description: Focus Selection ArrowDS (.focus-selection).
---

# focus-selection ArrowDS

Кольцо, которое появляется на контроле при навигации с клавиатуры. Это **не элемент интерфейса, а слой**: собственной разметки у него нет, он надевается на бокс того контрола, который получил фокус. Значения берутся из токенов DS, ничего не хардкодится. См. `arrow-design-system` за общей картиной токенов и `arrow-components-builder` за регенерацией скилла из Figma.

## Главное отличие от других компонент-скиллов

У остальных `awds-component-*` есть разметка и класс. Здесь — **контракт переменных `--awds-focus-*` в `:root`** плюс несколько готовых классов. Причина: в чистом CSS нет миксинов, поэтому декларацию `outline` всё равно пишет сам компонент в своём `:focus-visible`-селекторе — переиспользовать можно только **значения**. Единый источник значений и есть смысл компонента: кольцо фокуса обязано выглядеть одинаково на кнопке, чекбоксе и строке списка, иначе клавиатурная навигация читается как несколько разных интерфейсов.

Второе отличие — **ось `Size` из Figma в CSS не существует**. В макете 9 значений (50…600, Rounded, None) нужны потому, что прямоугольник кольца не наследует радиус контрола и дизайнер задаёт его руками. CSS-outline следует `border-radius` сам и прибавляет к нему `outline-offset` — одно правило воспроизводит всю ось. Замеры подтверждают: `Inside` radius = `rounded/{N}`, `Outside` radius = `rounded/{N} + 1` при `outline-offset: 1px`.

## Оси и что они означают

| Figma | Значения | Как получить | Что видно |
|---|---|---|---|
| `offset` | inside / **outside** | `--awds-focus-offset-inside` / `--awds-focus-offset` | кольцо вписано в бокс / снаружи с зазором 1px |
| `tone` | **default** / muted / accent | `--awds-focus-color{,-muted,-accent}` | нейтральное / брендовое полупрозрачное / брендовое плотное |
| `radius` | 50…600, full, none | — | в CSS не выражается, радиус берётся у контрола |

Толщина кольца одна на все варианты — 2px во всех 54 ячейках макета.

## Откуда берутся значения

| Что | Источник | Где живёт |
|---|---|---|
| Толщина, отступы | геометрия макета: `Outside` — прямоугольник на 1px наружу, stroke 2px OUTSIDE; `Inside` — по контуру, stroke 2px INSIDE | `references/focus-selection.css` |
| Цвет Default | `rgb(var(--surface-on-highest))` | `component-token-map.json` → `map.state.focus.focus-selection.outline` |
| Цвет muted | `rgb(var(--primary-core) / var(--awds-opacity-50))` | там же → `outlineVariant` + opacity применения |
| Цвет Tab | `rgb(var(--primary-core))` | там же → `outlineVariant`, плотный |
| Видимость | `focus-selection/outlineShow` — переменная режима в Figma | в CSS это сам `:focus-visible` |

`muted` и `accent` в Figma указывают на **одну** переменную и различаются только прозрачностью применения. В CSS это две роли — не сливать: у `accent` кольцо плотное.

## Применение

Файл подключается **один раз на страницу, до компонентных CSS** — он объявляет `:root`-контракт, на который те ссылаются.

Элемент фокусируется сам — хватает класса:

```html
<button class="btn btn-primary focus-selection">Оформить</button>
<a class="link-area focus-selection focus-selection--inside" href="#">Строка-ссылка</a>
<input class="input__control focus-selection focus-selection-muted">
```

Кольцо рисует не фокусируемый узел (нативный input спрятан, обводку несёт соседний `span`) — класс не поможет, компонент пишет две строки:

```css
.checkbox__input:focus-visible + .checkbox__box {
  outline: var(--awds-focus-width) solid var(--awds-focus-color);
  outline-offset: var(--awds-focus-offset);
}
```

Полный набор рецептов (outside/inside, muted, обёртка через `:has(:focus-visible)`) — в [references/focus-selection-default.md](references/focus-selection-default.md).

## Кто какой вариант носит

Снято с инстансов набора `focus-selection` внутри самих компонентов (ячейки `State=Focus`):

| Вариант | Компоненты |
|---|---|
| **Outside + Default** | `button` (8), `button-overhung` (2), `list-item` (12), `input/secondary`, `input-combi/secondary` |
| **Outside + Accent** | `checkbox`, `radio`, `switch` — кольцо плотное брендовое, решение 25.09.2026 |
| **outside + muted** | `input`, `input-combi`, `select`, `select-combi`, `textarea`, `uploader` — кроме варианта `secondary` |
| **Inside + Default** | `button-area` (5), `table` (3) |
| **канон по умолчанию** (в макете кольца нет) | `button-favorites`, `label`, `link` (5), `product-card` (3), `range` |

В `list-item/Variation-selected` в макете встречается `Inside + Tab` — это обводка **выбранной плитки**, а не кольцо фокуса; фокус в `list-item` везде `Outside + Default`.

## Доступность

- `outline`, а не `border` или `box-shadow`: outline не влияет на лейаут, поэтому кольцо не сдвигает соседей при фокусе.
- `:focus-visible`, а не `:focus` — кольцо не появляется от мыши, но появляется от Tab и от ввода в поле.
- `outline: none` без замены не ставится нигде: клавиатурная навигация слепнет. Если кольцо мешает на самом контроле — оно переносится на родителя или соседа, но не гасится.
- Толщина 2px и полоса 1…3px снаружи дают кольцу непрерывный контур на любом фоне; ниже 2px обводка теряется на плотных фонах.
- В режиме `forced-colors` (Windows High Contrast) цвета подменяются системным `Highlight` — свой токен там может совпасть с фоном.
- Кольцо `muted` полупрозрачное: у поля в фокусе рамка уже брендовая, и плотное кольцо поверх неё сливается с ней в толстую полосу.

## Ограничение offset=inside при ненулевом радиусе

CSS считает радиус outline как `border-radius + outline-offset`, поэтому при `offset: -2px` внешний радиус кольца выходит на 2px **меньше** радиуса контрола, а в Figma stroke INSIDE радиус не уменьшает. Расхождение нулевое при радиусе 0 — а оба потребителя `inside` (`button-area`, `table`) в макете стоят на `radius=none`, то есть радиус 0. Если `inside` понадобится на скруглённом контроле, кольцо рисуется inset-тенью:

```css
box-shadow: inset 0 0 0 var(--awds-focus-width) var(--awds-focus-color);
```

с **обязательным** перечислением существующих теней компонента в том же объявлении: `box-shadow` не складывается, вторая декларация затирает первую — у `checkbox`/`radio` inset-тень несёт бордер, потерять его нельзя.

## CSS-файл

| Вариант | Файл | Что внутри |
|---|---|---|
| default | `references/focus-selection.css` | `:root`-контракт `--awds-focus-*`, классы `.focus-selection*`, канон применения, `forced-colors` |

## Storybook

Открой [references/preview.html](references/preview.html) локально (`file://`) — матрица `Type × Var` на живых контролах (Tab по странице показывает настоящее `:focus-visible`), сравнение с геометрией макета в числах, переключатель темы.

## Refresh

При изменении токенов в Figma:

```
обнови awds-component-focus-selection под Figma
```

ACB зайдёт по сохранённой ссылке (см. `component.meta.json`), вытащит variable_defs и геометрию, сравнит со снапшотом и обновит CSS + preview. Документация (этот файл и `focus-selection-default.md`) не трогается.

**Правка этого компонента — правка всех остальных.** Если изменилась геометрия или цвет кольца, значения меняются здесь, в одном файле; компонентные CSS не трогаются, потому что держат ссылки, а не числа. Если же изменился **набор потребителей** (компонент переехал с Outside на Inside) — правится тот компонент и таблица выше.

## Соседние компоненты

- Кольцо фокуса надевают на себя все интерактивные компоненты — отдельных «соседей» у слоя нет. Ближайший по смыслу родственник: **[awds-component-list-item](../awds-component-list-item/SKILL.md)**, где похожая обводка (`Inside + Tab`) используется не для фокуса, а для отметки выбранной плитки — не перепутать назначения.
- Значения ролей и шкал — **[arrow-design-system](../arrow-design-system/SKILL.md)**, старший источник.
