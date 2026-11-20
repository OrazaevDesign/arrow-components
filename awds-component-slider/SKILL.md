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

Плюс модификатор **`.slider--window`** у Dots и Dots Mini: окно из пяти точек для длинной галереи (с 1.1.0), см. «Окно из пяти точек».

## Откуда берутся значения

| Что | Источник |
|---|---|
| Фон пилюли (Dots, Numbs) | `rgb(var(--surface-bright) / var(--awds-opacity-80))` + `backdrop-filter: blur(3px)` |
| Точка неактивная | `rgb(var(--surface-on-high) / var(--awds-opacity-30))` |
| Точка активная | `rgb(var(--surface-on-high))` (opacity 100) |
| Текст Numbs | `rgb(var(--surface-on-high))`, типографика `--awds-control-300-*`, medium |
| Padding / gap | `var(--awds-space-1)` |
| Скругление | `var(--awds-rounded-border-radius-full)` (всегда пилюля) |
| Цифры Numbs | `font-variant-numeric: tabular-nums` (не прыгают при смене слайда) |
| Геометрия точек | ступени Space: 6/12 → `space-1-5`/`space-3`, mini 4/8 → `space-1`/`space-2` |
| Размытие подложки | `blur(3px)` — единственное своё значение: шкалы размытия в DS нет |

Состояний нет (индикатор статичный). «Активную» точку / число задаёт потребитель в разметке. Маппинг variant → роль зафиксирован в `component.meta.json` + `snapshot/figma.json`. Обновление — через `arrow-components-builder` («обнови awds-component-slider»).

## Размеров нет

`shape: null` — компонент бессайзовый, классов `.slider--N` нет. Размер задаётся количеством точек / длиной счётчика. Геометрия точек различается между вариантами (Dots 6px / Mini 4px) и зашита в самих вариантах.

**Порог: точек не больше семи.** Пилюля растёт вместе с их числом — 5 точек дают 60px, 11 уже 120px, и на узком экране индикатор занимает половину ширины. Поэтому длинному ряду точек компонент даёт два ответа:

- **окно из пяти точек** (`.slider--window`, с 1.1.0) — для галереи фото товара: так листаются фото в карточке товара и в мини-карточке;
- **Numbs** — счётчик «1/12» не растёт вовсе.

### Окно из пяти точек

Когда кадров больше пяти, корень получает `.slider--window`, точки ложатся в ленту `.slider__track`. Видно пять точек, лента едет вслед за активной и держит её по центру, крайние точки окна уменьшены (`.slider__dot--sm`). При пяти кадрах и меньше окно не нужно: обычные точки без ленты.

Ширина окна считается из геометрии варианта, поэтому окно работает и у `dots`, и у `dots-mini` (52px у mini, 64px у dots).

**Начальное окно выводит разметка**, скрипт при запуске индикатор не трогает: активна первая точка, точки с пятой по последнюю несут `slider__dot--sm`, сдвиг 0. В Liquid: `{% if n > 5 and forloop.index0 >= 4 %} slider__dot--sm{% endif %}`. Так раскладывает и скрипт при первом кадре, а раскладка сотни карточек при загрузке была бы принудительной компоновкой страницы.

```html
<div class="slider slider-dots-mini slider--window" role="group" aria-label="Фото 1 из 10">
  <span class="slider__track">
    <span class="slider__dot slider__dot--active" aria-current="true"></span>
    <span class="slider__dot"></span>
    <span class="slider__dot"></span>
    <span class="slider__dot"></span>
    <span class="slider__dot slider__dot--sm"></span>
    <!-- … по точке на кадр, у всех с пятой — slider__dot--sm … -->
  </span>
</div>
```

**Сдвиг ленты — скрипт потребителя.** Компонент без JS, листание и смену активной точки делает галерея. Эталон раскладки окна, вызывать после смены активной точки:

```js
// Держит активную точку по центру окна; крайние точки окна уменьшает.
// Размеры берёт по offsetLeft/offsetWidth: на них не влияет transform уменьшенных точек.
function layoutSliderWindow(slider, i) {
  var track = slider.querySelector('.slider__track');
  var dots = track ? track.querySelectorAll('.slider__dot') : [];
  var n = dots.length;
  if (!n || !slider.clientWidth) return;         // индикатор скрыт — разложить, когда получит ширину
  var cs = getComputedStyle(slider);
  var winW = slider.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
  // Раскладку считаем конечную, а не ту, что на экране: только что активная точка
  // ещё вытягивается анимацией, и замер по ней сдвигал окно на 1–3px.
  // Сумма ширин точек при этом постоянна, поэтому ширина ленты верна всегда.
  var g = parseFloat(getComputedStyle(track).columnGap) || 0;
  var s = Infinity;                                // обычная точка — самая узкая
  Array.prototype.forEach.call(dots, function (d) { s = Math.min(s, d.offsetWidth); });
  var trackW = (dots[n - 1].offsetLeft - dots[0].offsetLeft) + dots[n - 1].offsetWidth;
  var a = trackW - (n - 1) * (s + g);              // ширина активной точки
  var center = function (k) {
    return k < i ? k * (s + g) + s / 2
         : k === i ? i * (s + g) + a / 2
         : (k - 1) * (s + g) + a + g + s / 2;
  };
  var shift = Math.min(0, Math.max(winW / 2 - center(i), winW - trackW));
  track.style.setProperty('--awds-slider-shift', shift + 'px');
  var moreLeft = shift < -0.5, moreRight = shift > (winW - trackW) + 0.5;
  Array.prototype.forEach.call(dots, function (d, k) {
    var c = center(k) + shift;
    d.classList.toggle('slider__dot--sm', (moreLeft && c < winW * 0.18) || (moreRight && c > winW * 0.82));
  });
}
```

Индикатор, скрытый в момент листания (неактивная вкладка, вьюха без точек), имеет нулевую ширину, и окно вышло бы отрицательным. Поэтому функция в таком случае ничего не делает, а раскладывать окно заново — дело `ResizeObserver` потребителя, когда индикатор получит ширину.

**Карточка товара берёт это окно** с product-card 4.0.0: её индикатор — `.slider.slider-dots-mini.slider--window.pcard__slider`, сдвиг ставит `wireGallery` карточки по этому эталону. До 4.0.0 карточка рисовала окно сама (`.pcard__slider--many`, `.pcard__slider-track`, `--pcard-dots-shift`); эти имена сняты.

## CSS

Один файл — `references/slider.css` (база `.slider` + 3 варианта `.slider-{dots,dots-mini,numbs}` + элемент `.slider__dot` / модификатор `.slider__dot--active`). Подключается один раз глобально.

Визуальный QA — `references/preview.html` (storybook, `file://`): все три варианта с переключателем числа слайдов, на светлой/тёмной теме и поверх фото (проверка frosted-эффекта).

## Алгоритм использования

1. Выбери вариант: базовый под слайдером → `dots`; поверх медиа без плашки → `dots-mini`; галерея товара с кадрами больше пяти → `dots` или `dots-mini` с `.slider--window` (см. «Окно из пяти точек»); прочие карусели при слайдах больше семи → `numbs`.
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
5. Подключи `references/slider.css`. Нужны `css-variables.css` сайта (роли `--surface-*`) и базовые токены DS (`--awds-space-1`, `--awds-rounded-border-radius-full`, `--awds-opacity-*`, `--awds-control-300-*`, `--awds-font-*`, для окна ещё `--awds-motion-*`).

## Refresh

```
обнови awds-component-slider под Figma
```

ACB зайдёт в Figma по ссылке (`component.meta.json`), сравнит снапшот, обновит `slider.css` + preview. Документация (этот файл и `{variant}.md`) — не трогается.
