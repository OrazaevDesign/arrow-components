---
name: awds-component-slider
description: >
  Верстка индикатора пагинации слайдера/карусели (Slider) ArrowDS — HTML-разметка и CSS
  на токенах дизайн-системы. Используй ВСЕГДА при: добавлении индикатора текущего слайда
  (точки-dots, мини-точки, счётчик «1/N») к карусели/слайдеру/галерее в разметку или
  PageCraft-блок, выборе варианта индикатора (dots / dots-mini / numbs), получении
  Figma-ссылки на компонент Slider. Это НЕ ползунок-регулятор (range) — это
  frosted-индикатор позиции. Статичный, 3 варианта, активный слайд задаёт потребитель.
---

# Slider (индикатор пагинации) ArrowDS

Индикатор текущей позиции в карусели/слайдере/галерее: ряд точек или счётчик «1/2» на полупрозрачной frosted-пилюле. **Это не range-регулятор** (для ползунка значения — `awds-component-range`), а визуальный указатель «какой слайд показан». Ничего не хардкодит по цвету/отступам — роли + токены DS. См. скилл `arrow-design-system`.

## Варианты (3)

| Вариант | Reference | Что это | Когда |
|---|---|---|---|
| **Dots** | `references/slider-dots.md` ✅ | Frosted-пилюля + точки 6px, активная вытянута в 12×6 | Базовый индикатор под слайдером на любом фоне |
| **Dots Mini** | `references/slider-dots-mini.md` ✅ | Точки 4px **без фона** (только blur поверх контента) | Поверх фото/видео в углу — когда плашка лишняя |
| **Numbs** | `references/slider-numbs.md` ✅ | Frosted-пилюля + текст «1/2» (текущий/всего) | Много слайдов — точки не помещаются, нужен счётчик |

## Откуда берутся значения

| Что | Источник |
|---|---|
| Фон пилюли (Dots, Numbs) | `rgb(var(--surface-bright) / var(--awds-opacity-80))` + `backdrop-filter: blur(3px)` |
| Точка неактивная | `rgb(var(--surface-on-highest) / var(--awds-opacity-30))` |
| Точка активная | `rgb(var(--surface-on-highest))` (opacity 100) |
| Текст Numbs | `rgb(var(--surface-on-high))`, типографика `--awds-control-300-*`, semibold |
| Padding / gap | `var(--awds-space-1)` |
| Скругление | `var(--awds-rounded-full)` (всегда пилюля) |
| Цифры Numbs | `font-variant-numeric: tabular-nums` (не прыгают при смене слайда) |
| Геометрия точек (6px), blur (3px) | raw Figma px — в DS нет токена для этих размеров |

Состояний нет (индикатор статичный). «Активную» точку / число задаёт потребитель в разметке. Маппинг variant → роль зафиксирован в `component.meta.json` + `snapshot/figma.json`. Обновление — через `arrow-components-builder` («обнови awds-component-slider»).

## Размеров нет

`shape: null` — компонент бессайзовый, классов `.slider--N` нет. Размер задаётся количеством точек / длиной счётчика. Геометрия точек различается между вариантами (Dots 6px / Mini 4px) и зашита в самих вариантах.

## CSS

Один файл — `references/slider.css` (база `.slider` + 3 варианта `.slider-{dots,dots-mini,numbs}` + элемент `.slider__dot` / модификатор `.slider__dot--active`). Подключается один раз глобально.

Визуальный QA — `references/preview.html` (storybook, `file://`): все три варианта с переключателем числа слайдов, на светлой/тёмной теме и поверх фото (проверка frosted-эффекта).

## Алгоритм использования

1. Выбери вариант: базовый под слайдером → `dots`; поверх медиа без плашки → `dots-mini`; много слайдов → `numbs`.
2. Разметка (контейнер `<div>`, точки — `<span>`):
   - **Dots / Dots Mini** — по одному `.slider__dot` на слайд, активному добавь `.slider__dot--active` + `aria-current="true"`:
     ```html
     <div class="slider slider-dots" role="group" aria-label="Слайд 3 из 5">
       <span class="slider__dot"></span>
       <span class="slider__dot"></span>
       <span class="slider__dot slider__dot--active" aria-current="true"></span>
       <span class="slider__dot"></span>
       <span class="slider__dot"></span>
     </div>
     ```
   - **Numbs** — текст «текущий/всего» прямо в контейнере:
     ```html
     <div class="slider slider-numbs" role="group" aria-label="Слайд 1 из 2">1/2</div>
     ```
3. Кликабельность — на стороне потребителя: если точки должны переключать слайд, замени `<span>` на `<button class="slider__dot" aria-label="Слайд N">` и навешай обработчик. Базовый компонент — чистый индикатор без интерактива (как в Figma).
4. Позиционирование над/поверх слайдера — на стороне потребителя (`position: absolute; bottom; left: 50%; transform: translateX(-50%)`). Сам индикатор — `inline-flex`.
5. Подключи `references/slider.css`. Нужны `css-variables.css` сайта (роли `--surface-*`) и базовые токены DS (`--awds-space-1`, `--awds-rounded-full`, `--awds-opacity-*`, `--awds-control-300-*`, `--awds-font-*`).

## Refresh

```
обнови awds-component-slider под Figma
```

ACB зайдёт в Figma по ссылке (`component.meta.json`), сравнит снапшот, обновит `slider.css` + preview. Документация (этот файл и `{variant}.md`) — не трогается.
