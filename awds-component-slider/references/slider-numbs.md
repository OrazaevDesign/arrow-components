# Slider — Numbs

Счётчик «текущий/всего» на frosted-пилюле. Для каруселей с большим числом слайдов, где точки не помещаются.

**Figma:** https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=6-1468

## HTML

Текст «текущий/всего» прямо в контейнере.

```html
<div class="slider slider-numbs" role="group" aria-label="Слайд 1 из 2">1/2</div>
```

## Стили

| Свойство | Значение |
|---|---|
| Фон | `rgb(var(--surface-bright) / var(--awds-opacity-80))` + `backdrop-filter: blur(3px)` |
| Padding | `var(--awds-space-1)` |
| Скругление | `var(--awds-rounded-border-radius-full)` |
| Цвет текста | `rgb(var(--surface-on-high))` |
| Типографика | `--awds-control-font-size-300 / -line-height / -letter-spacing`, `--awds-font-weight-medium` |
| Цифры | `font-variant-numeric: tabular-nums` — не «прыгают» при 1/9 → 1/10 |
| Минимальная ширина | `var(--awds-space-9)` (36px) + центровка — размер пилюли из макета |

В макете счётчик привязан к `font-weight/medium` (500) — в коде та же ячейка `--awds-font-weight-medium`. До 27.09.2026 здесь стоял semibold с пометкой «в DS нет 500»; ячейка medium в студии есть.

## Состояния

Нет. Число задаёт потребитель.
