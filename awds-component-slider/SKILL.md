---
name: awds-component-slider
description: Slider ArrowDS (.slider).
---

# Slider (индикатор пагинации) ArrowDS

Индикатор текущей позиции в карусели/слайдере/галерее: ряд точек или счётчик «1/2» на полупрозрачной frosted-пилюле. **Это не range-регулятор** (для ползунка значения — `awds-component-range`), а визуальный указатель «какой слайд показан». Ничего не хардкодит по цвету/отступам — роли + токены DS. См. скилл `arrow-design-system`.

## Варианты (3)

| Вариант | Reference | Что это | Когда |
|---|---|---|---|
| **Dots** | `references/slider-dots.md` ✅ | Frosted-пилюля + точки 6px, активная вытянута в 12×6 | Базовый индикатор под слайдером на любом фоне |
| **Dots Mini** | `references/slider-dots-mini.md` ✅ | Точки 4px **без фона** (только blur поверх контента) | Поверх фото/видео в углу — когда плашка лишняя |
| **Numbs** | `references/slider-numbs.md` ✅ | Frosted-пилюля + текст «1/2» (текущий/всего) | Слайдов больше семи — точки не помещаются, нужен счётчик |

## Откуда берутся значения

| Что | Источник |
|---|---|
| Фон пилюли (Dots, Numbs) | `rgb(var(--surface-bright) / var(--awds-opacity-80))` + `backdrop-filter: blur(3px)` |
| Точка неактивная | `rgb(var(--surface-on-highest) / var(--awds-opacity-30))` |
| Точка активная | `rgb(var(--surface-on-highest))` (opacity 100) |
| Текст Numbs | `rgb(var(--surface-on-high))`, типографика `--awds-control-300-*`, semibold |
| Padding / gap | `var(--awds-space-1)` |
| Скругление | `var(--awds-rounded-border-radius-full)` (всегда пилюля) |
| Цифры Numbs | `font-variant-numeric: tabular-nums` (не прыгают при смене слайда) |
| Геометрия точек | ступени Space: 6/12 → `space-1-5`/`space-3`, mini 4/8 → `space-1`/`space-2` |
| Размытие подложки | `blur(3px)` — единственное своё значение: шкалы размытия в DS нет |

Состояний нет (индикатор статичный). «Активную» точку / число задаёт потребитель в разметке. Маппинг variant → роль зафиксирован в `component.meta.json` + `snapshot/figma.json`. Обновление — через `arrow-components-builder` («обнови awds-component-slider»).

## Размеров нет

`shape: null` — компонент бессайзовый, классов `.slider--N` нет. Размер задаётся количеством точек / длиной счётчика. Геометрия точек различается между вариантами (Dots 6px / Mini 4px) и зашита в самих вариантах.

**Порог: точек не больше семи.** Пилюля растёт вместе с их числом — 5 точек дают 60px, 11 уже 120px, и на узком экране индикатор занимает половину ширины. Прокрутки ленты у компонента нет намеренно: в макете лента длиннее окна и обрезана рамкой, но окна у Dots и Mini разной ширины (5 и 4 позиции) — это рамка макета, а не правило. Ответ на «много слайдов» дизайн-система даёт вариантом **Numbs**: счётчик «1/12» не растёт вовсе.

## CSS

Один файл — `references/slider.css` (база `.slider` + 3 варианта `.slider-{dots,dots-mini,numbs}` + элемент `.slider__dot` / модификатор `.slider__dot--active`). Подключается один раз глобально.

Визуальный QA — `references/preview.html` (storybook, `file://`): все три варианта с переключателем числа слайдов, на светлой/тёмной теме и поверх фото (проверка frosted-эффекта).

## Алгоритм использования

1. Выбери вариант: базовый под слайдером → `dots`; поверх медиа без плашки → `dots-mini`; слайдов больше семи → `numbs` (точки перестают помещаться, пилюля разъезжается).
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
5. Подключи `references/slider.css`. Нужны `css-variables.css` сайта (роли `--surface-*`) и базовые токены DS (`--awds-space-1`, `--awds-rounded-border-radius-full`, `--awds-opacity-*`, `--awds-control-300-*`, `--awds-font-*`).

## Refresh

```
обнови awds-component-slider под Figma
```

ACB зайдёт в Figma по ссылке (`component.meta.json`), сравнит снапшот, обновит `slider.css` + preview. Документация (этот файл и `{variant}.md`) — не трогается.
