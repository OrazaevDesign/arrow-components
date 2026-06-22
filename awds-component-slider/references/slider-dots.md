# Slider — Dots

Базовый индикатор пагинации: полупрозрачная frosted-пилюля с рядом точек. Активный слайд — вытянутая в пилюлю тёмная точка, остальные — приглушённые круги.

**Figma:** https://www.figma.com/design/UCYhMA1JeNUNuVGsxUEne7/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B9-Elemets?node-id=2093-4387

## HTML

По одному `.slider__dot` на слайд. Активному — `.slider__dot--active` + `aria-current="true"`.

```html
<div class="slider slider-dots" role="group" aria-label="Слайд 3 из 5">
  <span class="slider__dot"></span>
  <span class="slider__dot"></span>
  <span class="slider__dot slider__dot--active" aria-current="true"></span>
  <span class="slider__dot"></span>
  <span class="slider__dot"></span>
</div>
```

Кликабельные точки — замени `<span>` на `<button class="slider__dot" aria-label="Слайд 3">`.

## Стили

| Свойство | Значение |
|---|---|
| Фон | `rgb(var(--surface-bright) / var(--awds-opacity-80))` |
| Размытие подложки | `backdrop-filter: blur(3px)` (raw, нет DS-токена) |
| Padding / gap | `var(--awds-space-1)` |
| Скругление пилюли | `var(--awds-rounded-full)` |
| Точка | 6px (raw Figma px), `rgb(var(--surface-on-highest) / var(--awds-opacity-30))` |
| Активная точка | 12×6, `rgb(var(--surface-on-highest))` |

## Состояния

Нет. Индикатор статичный; «активность» — класс-модификатор на точке. Активная точка плавно вытягивается через `transition` (MIFB, прерываемая, гасится при `prefers-reduced-motion`).
