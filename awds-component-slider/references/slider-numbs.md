# Slider — Numbs

Счётчик «текущий/всего» на frosted-пилюле. Для каруселей с большим числом слайдов, где точки не помещаются.

**Figma:** https://www.figma.com/design/UCYhMA1JeNUNuVGsxUEne7/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B9-Elemets?node-id=2093-4414

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
| Скругление | `var(--awds-rounded-full)` |
| Цвет текста | `rgb(var(--surface-on-high))` |
| Типографика | `--awds-control-300-font-size / -line-height / -letter-spacing`, `--awds-font-weight-semibold` |
| Цифры | `font-variant-numeric: tabular-nums` — не «прыгают» при 1/9 → 1/10 |

Figma-исходник — Inter Medium (500); в DS нет weight-500, округлено к `semibold` (как у `awds-component-notice`).

## Состояния

Нет. Число задаёт потребитель.
