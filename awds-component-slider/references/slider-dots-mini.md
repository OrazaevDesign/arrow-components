# Slider — Dots Mini

Компактный индикатор без плашки: точки 4px прямо поверх контента (фото/видео). Фон не заливается — только лёгкое размытие подложки. Активная точка вытянута в 8×4.

**Figma:** https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=6-1455

## HTML

Идентична Dots, отличается классом варианта `slider-dots-mini`.

```html
<div class="slider slider-dots-mini" role="group" aria-label="Слайд 1 из 5">
  <span class="slider__dot slider__dot--active" aria-current="true"></span>
  <span class="slider__dot"></span>
  <span class="slider__dot"></span>
  <span class="slider__dot"></span>
  <span class="slider__dot"></span>
</div>
```

## Стили

| Свойство | Значение |
|---|---|
| Фон | `transparent` (без заливки) |
| Размытие подложки | `backdrop-filter: blur(3px)` |
| Padding / gap | `var(--awds-space-1)` |
| Точка | `var(--awds-space-1)` (4px), `rgb(var(--surface-on-highest) / var(--awds-opacity-30))` |
| Активная точка | `var(--awds-space-2)`×4 (8×4), `rgb(var(--surface-on-highest))` |

## Когда

Поверх фото/баннера в углу карусели, где белая плашка визуально мешает. На светлом контенте тёмные точки могут терять контраст — тогда лучше `dots` с фоном.

## Состояния

Нет (см. Dots).
