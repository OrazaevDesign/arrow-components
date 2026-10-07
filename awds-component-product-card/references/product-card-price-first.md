# Product Card — price-first

Карточка товара в раскладке **price-first**: цена → бренд → название → (рубрика) → (корзина) → рейтинг; отзывы всегда последней строкой, под корзиной, если она включена (с 1.4.2). Фото 3:4 с оверлеями (страна-поставщик, избранное, маркет-бейджи).

**Figma:** [product-card / price-first](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=468-59619)

## HTML

Корень — `<div>` (контейнер). Кликабельны **3 отдельные ссылки** со своим hover: фото → товар, бренд → бренд, название → товар. Строка отзывов `.pcard__feedback` — **статичный блок, не ссылка** (как в макете). Мобильная вью — добавь `.pcard--mobile`.

```html
<div class="pcard pcard-price-first">
  <div class="pcard__media">
    <!-- #1 фото → карточка товара (aria-label, т.к. ссылка без текста) -->
    <a class="pcard__image-link" href="/product/123" aria-label="Название товара">
      <img class="pcard__image" src="/img/123.jpg" alt="Название товара">
    </a>

    <div class="pcard__top">
      <!-- Флаг страны + тултип (awds-component-tooltip): текст = страна из данных карточки -->
      <span class="pcard__country pcard__tip" aria-describedby="pcard-123-tip-country">
        <img src="/flags/de.svg" alt="Германия">
        <span class="tooltip tooltip-contrast tooltip--300 tooltip--side-top" role="tooltip" id="pcard-123-tip-country">
          <span class="tooltip__tail"></span><span class="tooltip__bubble">Германия</span>
        </span>
      </span>
      <!-- Избранное (awds-component-button-favorites) + тултип «Добавить в избранное» -->
      <span class="pcard__tip">
      <button type="button" class="btn btn-favorites btn--icon-only" aria-pressed="false" aria-label="В избранное" aria-describedby="pcard-123-tip-fav">
        <span class="btn-favorites__icon">
          <svg class="btn-favorites__solid" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M11.0928 3.05991C12.7287 1.82393 14.7348 1.67089 16.3496 2.5892C17.9639 3.50742 18.9999 5.38217 19 7.83041C19 10.3627 17.5048 12.5134 15.9102 14.1039C14.295 15.7147 12.4254 16.9035 11.3584 17.5189C10.935 17.765 10.5039 17.9945 10 17.9945C9.49607 17.9945 9.06496 17.765 8.6416 17.5189C7.57455 16.9035 5.70499 15.7147 4.08984 14.1039C2.49516 12.5134 1 10.3627 1 7.83041C1.0001 5.38314 2.03712 3.51291 3.65137 2.59702C5.26481 1.68165 7.26864 1.83336 8.90234 3.06088C9.40086 3.43548 9.74153 3.6909 9.9873 3.8558L10.0127 3.85678C10.2575 3.69164 10.5961 3.43517 11.0928 3.05991Z"/></svg>
          <svg class="btn-favorites__outline" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.0928 3.05991C12.7287 1.82393 14.7348 1.67089 16.3496 2.5892C17.9639 3.50742 18.9999 5.38217 19 7.83041C19 10.3627 17.5048 12.5134 15.9102 14.1039C14.295 15.7147 12.4254 16.9035 11.3584 17.5189C10.935 17.765 10.5039 17.9945 10 17.9945C9.49607 17.9945 9.06495 17.765 8.6416 17.5189C7.57455 16.9035 5.70499 15.7147 4.08984 14.1039C2.49516 12.5134 1 10.3627 1 7.83041C1.0001 5.38314 2.03712 3.51291 3.65137 2.59702C5.26481 1.68165 7.26864 1.83336 8.90234 3.06088C9.26444 3.33297 9.62329 3.61272 10 3.86459C10.375 3.61235 10.7323 3.33224 11.0928 3.05991ZM15.3613 4.32846C14.3526 3.7547 13.165 4.00159 12.2734 4.67514C11.8085 5.0264 11.4258 5.31503 11.1309 5.51401C10.794 5.74121 10.4222 5.96072 10.0029 5.96127C9.58341 5.96178 9.21066 5.74344 8.87305 5.51694C8.57711 5.31839 8.19345 5.02989 7.72656 4.67905C6.83401 4.00833 5.64645 3.7647 4.63867 4.33627C3.7728 4.82752 3.00009 5.95047 3 7.83041C3 9.56747 4.04271 11.2324 5.50195 12.6878C6.78251 13.965 8.29529 15.0576 9.88281 15.9242C9.9903 15.9828 10.0097 15.9828 10.1172 15.9242C11.7047 15.0576 13.2175 13.965 14.498 12.6878C15.9573 11.2324 17 9.56748 17 7.83041C16.9999 5.94766 16.2272 4.82117 15.3613 4.32846Z"/></svg>
        </span>
      </button>
        <span class="tooltip tooltip-contrast tooltip--300 tooltip--side-top" role="tooltip" id="pcard-123-tip-fav"><span class="tooltip__tail"></span><span class="tooltip__bubble">Добавить в избранное</span></span>
      </span>
    </div>

    <!-- Бейджи — компонент awds-component-badge (подключи badge.css). Mobile: .badge--50 -->
    <div class="pcard__badges">
      <span class="badge badge-market-percent badge--100">10%</span>
      <span class="badge badge-market-sale badge--100">Скидка</span>
    </div>
  </div>

  <div class="pcard__content">
    <!-- Цена — компонент awds-component-price (подключи price.css): price-default,
         размерного класса нет — размер задаёт карточка (.typo-*, как бренд/название).
         Цвет surface-on-highest задаёт сам компонент. -->
    <span class="price price-default">
      <span class="price__main"><span class="price__current">1 900</span><span class="price__currency">₽</span></span>
    </span>
    <!-- #2 бренд → страница бренда -->
    <a class="pcard__brand" href="/brand/nike">Brandname</a>
    <!-- #3 название → карточка товара -->
    <a class="pcard__name" href="/product/123">Название товара которое ложится в две строки</a>
    <!-- Отзывы — статичный блок (НЕ ссылка): ★ рейтинг · 💬 счётчик -->
    <div class="pcard__feedback">
      <svg class="pcard__rating-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 1.4 9.9 5.3l4.3.62-3.1 3 .73 4.28L8 11.18 4.17 13.2l.73-4.28-3.1-3 4.3-.62Z"/></svg>
      <span class="pcard__rating-value">4.9</span>
      <svg class="pcard__reviews-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 2C4.27 2 1.25 4.42 1.25 7.4c0 1.52.8 2.88 2.06 3.86-.13.92-.55 1.72-1.16 2.34 1.2.05 2.4-.32 3.34-1.02.74.22 1.56.34 2.51.34 3.73 0 6.75-2.42 6.75-5.52S11.73 2 8 2Z"/></svg>
      <span class="pcard__reviews-count">23 отзыва</span>
    </div>
  </div>
</div>
```

### Состояния цены (скидка / нет в наличии)

Цена — компонент `awds-component-price`, у него три типа. Карточка выбирает нужный по данным товара (подключи `price.css`):

```html
<!-- Обычная цена -->
<span class="price price-default">
  <span class="price__main"><span class="price__current">1 900</span><span class="price__currency">₽</span></span>
</span>

<!-- Скидка: акцентная цена + старая зачёркнутая (показывай вместе с бейджем .badge-market-percent) -->
<span class="price price-sale">
  <span class="price__main"><span class="price__current">1 900</span><span class="price__currency">₽</span></span>
  <span class="price__old"><span class="price__old-value">2 000</span><span class="price__old-currency">₽</span></span>
</span>

<!-- Нет в наличии: плейсхолдер вместо цены -->
<span class="price price-none">
  <span class="price__placeholder">Нет в наличии</span>
</span>
```

- Размер: класса нет — его задаёт карточка правилом `.pcard .price` (см. `product-card-*.css`). Цена едет по `.typo-*` карточки, как бренд и название; одинакова для всех трёх типов и обеих вью.
- **Скидка** (`price-sale`): текущая цена — акцент, старая — зачёркнута; обычно вместе с бейджем скидки `.badge-market-percent` в `.pcard__badges`.
- **Нет в наличии** (`price-none`): цену заменяет «Нет в наличии». Логично при этом скрыть бейдж скидки и (если есть) отключить корзину/избранное — это на стороне данных потребителя.
- Все детали типов цены — в скилле `awds-component-price`.

### Галерея фото (несколько кадров + слайдер)

Если у товара несколько фото — вложи **несколько** `<img class="pcard__image">` в ссылку-фото (первый помечен `.pcard__image--active`) и добавь индикатор `awds-component-slider` (вариант **dots-mini**, подключи `slider.css`) **между `.pcard__media` и `.pcard__content`** (как в макете — по центру, под фото; НЕ оверлеем). Число точек = числу кадров.

Листание работает в трёх режимах, все — через один `wireGallery` (ниже):

- **Десктоп (мышь)** — наведение делит фото на равные вертикальные зоны по числу кадров: позиция курсора по X выбирает активный кадр и активную точку; уход курсора с `.pcard__media` возвращает к первому.
- **Стрелки** `.pcard__nav` (с 1.4.0) — две кнопки `awds-component-button-overhung` / secondary 100 по краям фото, по центру высоты, поле `space-2` (8px). Клик листает по кадру **по кругу**: `(current ± 1 + n) % n`. После клика hover-зоны выключаются, пока курсор на фото, — иначе первое же движение мыши перебило бы выбранный стрелкой кадр. Видны только на десктопе, при наведении на фото или фокусе внутри; на тач-экранах и в `.pcard--mobile` стрелок нет. Подключи `button-overhung-secondary.css`.
- **Мобила / таблет (тач)** — **свайп** влево/вправо листает кадры по одному. Вертикальный скролл страницы остаётся нативным (в CSS ссылка-фото несёт `touch-action: pan-y`), горизонтальный жест уходит в JS. Свайп не открывает карточку товара — клик по ссылке после жеста подавляется.

Кадры — кроссфейд (CSS), смена активного — JS потребителя (ниже).

**Много кадров (например 10).** Чтобы индикатор не растягивался, при числе кадров больше окна (`DOTS_WINDOW = 5`) точки оборачивают в `.pcard__slider-track` и добавляют классу слайдера `.pcard__slider--many` — это включает **фикс-окно**: лента точек сдвигается, держа активную по центру, крайние точки окна уменьшаются (`.slider__dot--sm`, намёк, что есть ещё кадры). Сдвиг и edge-классы выставляет тот же `wireGallery` (ниже).

```html
<!-- Много кадров: лента в .pcard__slider-track + класс .pcard__slider--many -->
<div class="slider slider-dots-mini pcard__slider pcard__slider--many" aria-hidden="true">
  <span class="pcard__slider-track">
    <span class="slider__dot slider__dot--active"></span>
    <span class="slider__dot"></span>
    <!-- … все N точек … -->
  </span>
</div>
```

```html
<div class="pcard pcard-price-first">
  <div class="pcard__media">
    <a class="pcard__image-link" href="/product/123" aria-label="Название товара">
      <img class="pcard__image pcard__image--active" src="/img/123-1.jpg" alt="Название товара — фото 1">
      <img class="pcard__image" src="/img/123-2.jpg" alt="Название товара — фото 2">
      <img class="pcard__image" src="/img/123-3.jpg" alt="Название товара — фото 3">
    </a>
    <div class="pcard__top">…</div>
    <!-- Стрелки галереи — только при 2+ кадрах. Компонент awds-component-button-overhung,
         secondary 100 (подключи button-overhung-secondary.css). После .pcard__top, перед бейджами. -->
    <div class="pcard__nav">
      <button type="button" class="obtn obtn-secondary obtn--100 obtn--icon-only pcard__nav-btn pcard__nav-btn--prev" aria-label="Предыдущее фото"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4l-6 6 6 6"/></svg></button>
      <button type="button" class="obtn obtn-secondary obtn--100 obtn--icon-only pcard__nav-btn pcard__nav-btn--next" aria-label="Следующее фото"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 4l6 6-6 6"/></svg></button>
    </div>
    <div class="pcard__badges">…</div>
  </div>

  <!-- Индикатор: awds-component-slider, dots-mini. Между медиа и контентом, по центру.
       Точек = числу кадров, первая активна. -->
  <div class="slider slider-dots-mini pcard__slider" aria-hidden="true">
    <span class="slider__dot slider__dot--active"></span>
    <span class="slider__dot"></span>
    <span class="slider__dot"></span>
  </div>

  <div class="pcard__content">…</div>
</div>
```

JS-обвязка потребителя (десктоп — hover-зоны и стрелки, мобила/таблет — свайп). Эталон — функция `wireGallery` в `blocks/awds-category-product-slider/script.js`; ниже она же, без блоковой обвязки:

```js
function wireGallery(link) {
  var imgs = Array.prototype.slice.call(link.querySelectorAll('.pcard__image'));
  if (imgs.length < 2) return;                       // одно фото — листать нечего
  // Прогрев: кадры декодируем заранее, на первое наведение или касание. Иначе новый
  // кадр проявлялся ещё не нарисованным и «вспыхивал», когда браузер его дорисовывал.
  var warmed = false;
  function warm() {
    if (warmed) return;
    warmed = true;
    imgs.forEach(function (im) { im.loading = 'eager'; if (im.decode) im.decode().catch(function () {}); });
  }
  link.addEventListener('pointerenter', warm);
  link.addEventListener('pointerdown', warm);
  var pcard = link.closest ? link.closest('.pcard') : null;
  var slider = pcard ? pcard.querySelector('.pcard__slider') : null;
  var dots = slider ? Array.prototype.slice.call(slider.querySelectorAll('.slider__dot')) : [];
  var track = slider ? slider.querySelector('.pcard__slider-track') : null;
  var many = slider ? slider.classList.contains('pcard__slider--many') : false;
  var n = imgs.length, current = 0;
  // Много кадров: индикатор — фикс-окно, лента сдвигается, держа активную точку по
  // центру. Центрируем пиксельно (offsetLeft/offsetWidth не зависят от transform и
  // корректны при удлинённой активной точке); крайние точки окна уменьшаем (--sm).
  function layoutDots(i) {
    if (!many || !track || !dots.length) return;
    var cs = getComputedStyle(slider);
    var winW = slider.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0);
    var x0 = dots[0].offsetLeft;
    var center = function (d) { return (d.offsetLeft - x0) + d.offsetWidth / 2; };
    var trackW = (dots[n - 1].offsetLeft - x0) + dots[n - 1].offsetWidth;
    var shift = Math.min(0, Math.max(winW / 2 - center(dots[i]), winW - trackW));
    track.style.setProperty('--pcard-dots-shift', shift + 'px');
    var moreLeft = shift < -0.5, moreRight = shift > (winW - trackW) + 0.5;
    dots.forEach(function (d) {
      var c = center(d) + shift;
      d.classList.toggle('slider__dot--sm', (moreLeft && c < winW * 0.18) || (moreRight && c > winW * 0.82));
    });
  }
  function setActive(i) {
    current = Math.min(n - 1, Math.max(0, i));
    imgs.forEach(function (im, k) { im.classList.toggle('pcard__image--active', k === current); });
    dots.forEach(function (d, k) { d.classList.toggle('slider__dot--active', k === current); });
    layoutDots(current);
  }
  // Стрелки (с 07.10.2026): листают по кадру, по кругу. Нажатая стрелка «держит» кадр —
  // пока курсор на фото, hover-зоны его не перебивают; уход с фото возвращает первый кадр.
  var manual = false;
  var media = link.closest ? link.closest('.pcard__media') : null;
  Array.prototype.forEach.call(media ? media.querySelectorAll('.pcard__nav-btn') : [], function (b) {
    b.addEventListener('click', function (e) {
      e.preventDefault();
      warm();
      manual = true;
      setActive((current + (b.classList.contains('pcard__nav-btn--prev') ? -1 : 1) + n) % n);
    });
  });
  // Десктоп (мышь): hover-зоны.
  link.addEventListener('pointermove', function (e) {
    if (e.pointerType !== 'mouse' || manual) return;
    var r = link.getBoundingClientRect();
    setActive(Math.floor((e.clientX - r.left) / r.width * n));
  });
  // Сброс — по уходу с медиа, а не со ссылки: стрелки лежат рядом со ссылкой, и переход
  // курсора на стрелку не должен возвращать первый кадр.
  (media || link).addEventListener('pointerleave', function (e) {
    if (e.pointerType === 'mouse') { manual = false; setActive(0); }
  });
  // Мобила/таблет (тач/перо): свайп. Порог SWIPE листает по одному кадру; ребейз sx —
  // длинный свайп листает дальше. После свайпа гасим клик, чтобы жест не открыл товар.
  var SWIPE = 32, sx = 0, sy = 0, axis = '', dragging = false, swiped = false;
  link.addEventListener('pointerdown', function (e) {
    if (e.pointerType === 'mouse') return;
    // ниже десктопа точки спрятаны (offsetParent null) — свайп отдаём ленте карусели
    if (!slider || slider.offsetParent === null) return;
    dragging = true; swiped = false; axis = ''; sx = e.clientX; sy = e.clientY;
  });
  link.addEventListener('pointermove', function (e) {
    if (e.pointerType === 'mouse' || !dragging) return;
    var dx = e.clientX - sx, dy = e.clientY - sy;
    if (!axis && Math.sqrt(dx * dx + dy * dy) > 8) axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
    if (axis === 'x' && Math.abs(dx) >= SWIPE) {
      setActive(current + (dx < 0 ? 1 : -1));        // влево → следующий, вправо → предыдущий
      swiped = true; sx = e.clientX;
    }
  });
  link.addEventListener('pointerup', function () { dragging = false; });
  link.addEventListener('pointercancel', function () { dragging = false; axis = ''; });
  link.addEventListener('click', function (e) { if (swiped) { e.preventDefault(); swiped = false; } }, true);
  setActive(0);
}
// Во всех вариантах карточки; селектор ловит любую ссылку-фото. Стрелки функция находит
// сама — в .pcard__media той же карточки.
document.querySelectorAll('.pcard__image-link').forEach(wireGallery);
```

Две детали кода, которые легко потерять при переносе:

- **Сброс — по `pointerleave` с `.pcard__media`, а не со ссылки.** Стрелки лежат рядом со ссылкой-фото, не внутри неё. Слушай уход со ссылки — переход курсора на стрелку сбрасывал бы кадр на первый.
- **Свайп включается, только когда точки видны** (`slider.offsetParent !== null`). Блоки прячут точки ниже десктопа, и тогда свайп по фото листает ленту карусели, а не кадры.

Одиночное фото (без `.pcard__image--active`, без `.pcard__slider` и без `.pcard__nav`) работает как прежде — `wireGallery` его пропускает. Мало кадров (≤ окна) — обычные точки без `.pcard__slider--many`/`-track`. Свайп доступен на всех тач-устройствах независимо от числа кадров (≥2).

**Одно фото — резерв места под индикатор.** Когда кадр один, слайдер не выводят, но вместо него ставят пустую заглушку `<div class="pcard__slider-spacer" aria-hidden="true"></div>` (между `.pcard__media` и `.pcard__content`). Она занимает ровно высоту индикатора dots-mini — карточки с одним и несколькими фото получаются одной высоты, контент (цена/бренд) не сдвигается в гриде. Если в каталоге у всех товаров одно фото — заглушку можно не ставить.

### Без фото

Внутри `.pcard__image-link` замени `<img class="pcard__image">` на плейсхолдер (ссылка на товар остаётся):

```html
<a class="pcard__image-link" href="/product/123" aria-label="Название товара">
  <div class="pcard__media-placeholder">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="9" r="1.6"/><path d="M21 16l-5-5L7 20"/>
    </svg>
  </div>
</a>
```

### Mobile

В мобильной вью добавь `.pcard--mobile` корню, кнопке избранного — `.btn--200` (32px вместо 40px, сердце 16px вместо 20px), а бейджам — `.badge--50` вместо `.badge--100`:

```html
<div class="pcard pcard-price-first pcard--mobile">
  …
  <button class="btn btn-favorites btn--200 btn--icon-only" …>…</button>
  …
  <div class="pcard__badges">
    <span class="badge badge-market-percent badge--50">10%</span>
    <span class="badge badge-market-sale badge--50">Скидка</span>
  </div>
  …
</div>
```

## Состояния и hover

Карточка статична по контенту (`states = rest`). Это **контейнер** (`<div>`), внутри — 3 отдельные ссылки, hover у каждой **свой** (наведение на одну не затрагивает остальные). Строка отзывов `.pcard__feedback` — статичный блок (не ссылка), без hover:

| Ссылка | href | Поведение по `:hover` |
|---|---|---|
| `.pcard__image-link` (#1) | товар | фото без зума (`scale(0.9)` всегда, зум убран в 1.3.2) · 3%-скрим `opacity → 0` |
| `.pcard__brand` (#2) | бренд | цвет `surface-on-highest → accent-core` |
| `.pcard__name` (#3) | товар | цвет `surface-on-highest → accent-core` |
| `.pcard__category` (если включена) | рубрика | цвет `surface-on-high → accent-core` (ячейка `link/heading`; до 1.4.0 — `link/muted`, hover `surface-on-highest`) |
| `.pcard__nav-btn` | предыдущий / следующий кадр | компонент button-overhung secondary: прозрачность 60% → 90%; сама обёртка `.pcard__nav` проявляется при наведении на фото |
| `.pcard__feedback` | — (не ссылка) | статичный: ★ warning · рейтинг surface-on-highest · 💬 иконка surface-on · счётчик surface-on-high |

Фокус-обводка — на каждой ссылке отдельно (`:focus-visible`). Оверлеи над фото: избранное (`.btn-favorites`) — своя кнопка-тоггл (pointer-events:auto); бейджи — `pointer-events:none`, hover/клик проходят к ссылке-фото. Флаг теперь `pointer-events:auto` (ловит hover для тултипа) — hover фото (скрим) остаётся на остальной площади. Все hover-переходы гасятся при `prefers-reduced-motion: reduce`.

### Тултипы (компонент `awds-component-tooltip`, подключи `tooltip.css`)

Триггер `.pcard__tip` (обёртка). Показ по `:hover`/`:focus-within` с задержкой **400мс**, скрытие почти мгновенно (спека tooltip). Тултип — `.tooltip-contrast.tooltip--300.tooltip--side-top` (выпадает **сверху** от элемента, хвост вниз), центрирован по горизонтали относительно триггера.

Пузырь несёт `role="tooltip"` и `id`, триггер — `aria-describedby` с этим `id` (спека tooltip): без пары подсказка немая для скринридера. У флага триггер — сам `.pcard__country.pcard__tip`, у избранного — кнопка `.btn-favorites` внутри обёртки. **`id` уникален на странице:** карточек в гриде много, поэтому в блоке к нему подмешивают id товара (`…-tip-country-{{ p.id }}`), а не берут из сниппета как есть.

| Где | `.pcard__tip` на | Текст |
|---|---|---|
| Флаг страны | `.pcard__country` (он же несёт `aria-describedby`) | страна (из данных карточки) |
| Избранное | обёртка вокруг `.btn-favorites` (`aria-describedby` — на самой кнопке) | «Добавить в избранное» |

Точное избегание выхода тултипа за край экрана — на JS-контроллере (как в спеке tooltip); CSS даёт показ/скрытие и центрирование под триггером.

## Опциональные элементы

Любой оверлей можно убрать — карточка не сломается:

- **`.pcard__country`** — флаг страны-поставщика. Бокс 24×24px, флаг вписан с сохранением пропорций (`object-fit: contain` — не обрезается). Нет страны → убери блок.
- **`.pcard__badges`** — маркет-бейджи (компонент `awds-component-badge`, подключи `badge.css`): `badge-market-percent` (акцент) для скидки в %, `badge-market-sale` (бренд-primary) для «Скидка». Можно один, оба или ни одного.
- **`.btn-favorites`** — избранное (компонент `awds-component-button-favorites`, подключи `button-favorites.css`). Нет логики избранного → убери кнопку.
- **`.pcard__slider`** — индикатор галереи (компонент `awds-component-slider`, dots-mini, подключи `slider.css`). Одно фото → не добавляй (и не нужен `.pcard__image--active`).
- **`.pcard__nav`** — стрелки галереи (компонент `awds-component-button-overhung`, secondary 100, подключи `button-overhung-secondary.css`). Одно фото → не добавляй.

## Поля для биндинга (PageCraft / SSR)

| Слот | Куда |
|---|---|
| Ссылка на товар | `.pcard__image-link[href]` + `.pcard__name[href]` |
| Ссылка на бренд | `.pcard__brand[href]` |
| Фото | `.pcard__image[src]` / `.pcard__image-link[aria-label]` |
| Галерея фото | несколько `.pcard__image[src]` + `.pcard__slider` точек по числу кадров |
| Флаг страны | `.pcard__country img[src]` |
| Цена | компонент `.price` (`.price__current` число, `.price__currency` символ) |
| Бренд | `.pcard__brand` |
| Название | `.pcard__name` |
| Рейтинг | `.pcard__rating-value` (число) |
| Счётчик отзывов | `.pcard__reviews-count` — число и слово, склонённое по числу: «1 отзыв», «2 отзыва», «5 отзывов» (остаток от деления на 10 и на 100, 11–14 → «отзывов») |
| Отзывов нет | `.pcard__feedback.pcard__feedback--empty[aria-hidden="true"]` без содержимого — резерв высоты строки |
| Скидка % | `.badge-market-percent` (текст) |
| Состояние избранного | `.btn-favorites[aria-pressed]` |

**Необязательные строки.** Три строки контента включаются свойствами макета, и в каждом варианте есть все три:

| Свойство в макете | Строка в коде | По умолчанию в price-first |
|---|---|---|
| `show-category` | `<a class="pcard__category">` — рубрика товара | выкл. |
| `show-feedback` | `<div class="pcard__feedback">` — рейтинг и отзывы целиком | вкл. |
| `show-cart` | `<div class="pcard__cart">` — зона корзины (кнопка и степпер) | выкл. |

Выключенное свойство означает, что элемента нет в разметке. Не прячь его через `hidden` или `display:none`: данные останутся в SSR-ответе. CSS править не нужно — у каждой строки свой верхний отступ, соседи от неё не зависят, и карточка просто становится ниже, как в макете. Порядок строк — как в разметке выше; рубрика идёт сразу после названия, зона корзины — последней. Порядок price-first в 1.4.0 не менялся: в остальных вариантах отзывы переехали под корзину, здесь — нет.

**Включённые отзывы стоят у каждой карточки.** У товара без отзывов вместо строки ставь пустой резерв — ряд не прыгает:

```html
<div class="pcard__feedback pcard__feedback--empty" aria-hidden="true"></div>
```

Высоту даёт `::before` с неразрывным пробелом на строке caption (CSS компонента), так что резерв масштабируется по `.typo-*` вместе с текстом.

## Токены

Все значения — через DS. Полная карта — в шапке `product-card-price-first.css` и в `SKILL.md`. Цвета: `surface-on-highest` (текст + скрим над фото @ opacity-5), `accent-core` (бренд/название/рубрика на hover), `surface-on-high` (рейтинг), `surface-bright` (фон медиа = рамка вокруг уменьшенного фото), `warning-core` (звезда). Теней нет. Бейджи и избранное — внешние компоненты (`badge.css`, `button-favorites.css`).
