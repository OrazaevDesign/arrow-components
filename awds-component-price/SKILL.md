---
name: awds-component-price
description: >
  Верстка цены товара (Price) ArrowDS — HTML-разметка и CSS на токенах дизайн-системы.
  Используй ВСЕГДА при: добавлении цены товара в карточку, маркет-грид, корзину или
  PageCraft-блок, выборе типа цены (sale со скидкой / default обычная / none «нет в
  наличии»), ориентации (горизонтальная / вертикальная), стороны знака валюты,
  размера цены, вопросах о стилях price / price-sale, получении Figma-ссылки на
  компонент Price. Текущая + старая (зачёркнутая) цена, 11 размеров, статичный.
---

# Price (цена товара) ArrowDS

Отображение цены товара. Текущая цена + опциональная старая (зачёркнутая) + знак валюты, либо плейсхолдер «Нет в наличии». Ничего не хардкодит: размер — шкала типографики `--awds-typography-*`, цвета — роли. См. скилл `arrow-design-system`.

Компонент **статичный** (без состояний hover/focus/disabled) и **бессhape-ный** (`shape=null`): размер задаётся не shape-токенами, а напрямую базовой шкалой типографики.

## Тип цены (3)

| Тип | Класс | Что показывает | Цвет текущей цены |
|---|---|---|---|
| **Sale** | `price-sale` | текущая цена + старая (зачёркнутая) | `accent-container-on` (акцент) |
| **Default** | `price-default` | одна цена | `surface-on-highest` (нейтральный) |
| **None** | `price-none` | «Нет в наличии» | — (плейсхолдер `surface-on`) |

Старая цена и плейсхолдер всегда приглушённые — `surface-on`.

## Ориентация (2)

- **Горизонтальная** (по умолчанию) — старая цена в один ряд с текущей: `1 900 ₽  2 000 ₽`.
- **Вертикальная** — `price--vertical`, старая цена строкой ниже.

## Сторона знака валюты (2)

- **Right** (по умолчанию) — `1 900 ₽`.
- **Left** — `price--currency-left`, `₽ 1 900`. Разметка та же (число, валюта); меняется только порядок флекса.

## Размеры (11)

`.price--{N}`, N — `100 200 300 400 500 600 700 800 900 1000 1100`. По умолчанию `price--600`. Внутри размера главная цена крупнее, валюта / старая цена / плейсхолдер — на пару ступеней мельче (вторичная шкала). Line-height — компактная ветка (`line-height-compact`), плотный числовой набор как в макете.

Размер маппится на пару DS-токенов typography (main / secondary), сматченных по значению px — см. `component.meta.json → size_typography_map`.

## Структура разметки

Инлайновый `<span class="price price-{тип} price--{N}">`.

**Sale** (текущая + старая):
```html
<span class="price price-sale price--600">
  <span class="price__main">
    <span class="price__current">1 900</span>
    <span class="price__currency">₽</span>
  </span>
  <span class="price__old">
    <span class="price__old-value">2 000</span>
    <span class="price__old-currency">₽</span>
  </span>
</span>
```

**Default** (одна цена) — без `.price__old`:
```html
<span class="price price-default price--600">
  <span class="price__main">
    <span class="price__current">1 900</span>
    <span class="price__currency">₽</span>
  </span>
</span>
```

**None** (нет в наличии):
```html
<span class="price price-none price--600">
  <span class="price__placeholder">Нет в наличии</span>
</span>
```

Зачёркивание старой цены — `text-decoration: line-through` на `.price__old` (рисуется метрикой шрифта `from-font`, не хардкод-px). Зазор между атомами — `--awds-price-gap: 0.2em` (font-относительный, пропорционален кеглю на каждом размере), руками отступы не ставим.

## Откуда берутся значения

| Что | Источник |
|---|---|
| Цвет текущей цены | sale → `rgb(var(--accent-container-on))`, default → `rgb(var(--surface-on-highest))` |
| Цвет старой цены / плейсхолдера | `rgb(var(--surface-on))` |
| Размер главного числа | ФИКС-шкала Control/Value: `var(--awds-control-{main}-font-size)` + `-line-height` + `-letter-spacing`. НЕ адаптивная `--awds-typography-*` (она раздувается на десктопе и ломает фикс-размер цены) |
| Размер валюты / старой цены | вторичная ступень Control `--awds-control-{sec}-*` |
| Зазор между атомами | `--awds-price-gap: 0.2em` (font-относительный — пропорционален кеглю на всех 11 размерах) |
| Шрифт / вес | `var(--awds-font-family-system)`, `var(--awds-font-weight-semibold)` |
| Цифры | `font-variant-numeric: tabular-nums` (не прыгают при смене значения) |

## CSS

Один файл — `references/price.css` (база `.price` + типы `.price-{sale,default,none}` + ориентация `.price--vertical` + сторона `.price--currency-left` + 11 размеров). Подключается один раз глобально.

Визуальный QA — `references/preview.html` (storybook, `file://`): матрица размеров + переключатели тип / ориентация / сторона валюты + контекст на карточке товара.

## Алгоритм использования

1. Выбери тип: `price-sale` (со скидкой), `price-default` (обычная), `price-none` (нет в наличии).
2. Собери разметку по шаблону выше; для default опусти `.price__old`, для none — только `.price__placeholder`.
3. Выбери размер `price--{N}` под контекст (на карточке товара обычно 600–800, в крупном блоке/на странице товара — 900–1100).
4. При необходимости добавь `price--vertical` (старая цена снизу) и/или `price--currency-left` (`₽` слева).
5. Подключи `references/price.css`. Нужны `css-variables.css` сайта (роли `--accent-container-on`, `--surface-on-highest`, `--surface-on`) и базовые токены DS (`--awds-typography-*`, `--awds-space-*`, `--awds-font-*`).

## Refresh

```
обнови awds-component-price под Figma
```

ACB зайдёт в Figma по ссылкам (`component.meta.json → figma.sets`), сравнит снапшот, обновит `price.css` + preview. Документация (этот файл и `{variant}.md`) — не трогается.
