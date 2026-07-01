# Product Card — price-first

Карточка товара в раскладке **price-first**: цена → бренд → название → рейтинг. Фото 3:4 с оверлеями (страна-поставщик, избранное, маркет-бейджи).

**Figma:** [product-card / price-first](https://www.figma.com/design/fgXw7Tlrdfz0gCUi2xbZDt/%F0%9F%94%B6-B2C-%E2%86%AA-%C2%B9-Componets?node-id=7460-1800)

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
      <span class="pcard__country pcard__tip">
        <img src="/flags/de.svg" alt="Германия">
        <span class="tooltip tooltip-contrast tooltip--compact tooltip--top" role="tooltip">
          <span class="tooltip__tail"></span><span class="tooltip__bubble">Германия</span>
        </span>
      </span>
      <!-- Избранное (awds-component-button-favorites) + тултип «Добавить в избранное» -->
      <span class="pcard__tip">
      <button type="button" class="btn btn-favorites btn--icon-only" aria-pressed="false" aria-label="В избранное">
        <span class="btn-favorites__icon">
          <svg class="btn-favorites__solid" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M11.0928 3.05991C12.7287 1.82393 14.7348 1.67089 16.3496 2.5892C17.9639 3.50742 18.9999 5.38217 19 7.83041C19 10.3627 17.5048 12.5134 15.9102 14.1039C14.295 15.7147 12.4254 16.9035 11.3584 17.5189C10.935 17.765 10.5039 17.9945 10 17.9945C9.49607 17.9945 9.06496 17.765 8.6416 17.5189C7.57455 16.9035 5.70499 15.7147 4.08984 14.1039C2.49516 12.5134 1 10.3627 1 7.83041C1.0001 5.38314 2.03712 3.51291 3.65137 2.59702C5.26481 1.68165 7.26864 1.83336 8.90234 3.06088C9.40086 3.43548 9.74153 3.6909 9.9873 3.8558L10.0127 3.85678C10.2575 3.69164 10.5961 3.43517 11.0928 3.05991Z"/></svg>
          <svg class="btn-favorites__outline" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.0928 3.05991C12.7287 1.82393 14.7348 1.67089 16.3496 2.5892C17.9639 3.50742 18.9999 5.38217 19 7.83041C19 10.3627 17.5048 12.5134 15.9102 14.1039C14.295 15.7147 12.4254 16.9035 11.3584 17.5189C10.935 17.765 10.5039 17.9945 10 17.9945C9.49607 17.9945 9.06495 17.765 8.6416 17.5189C7.57455 16.9035 5.70499 15.7147 4.08984 14.1039C2.49516 12.5134 1 10.3627 1 7.83041C1.0001 5.38314 2.03712 3.51291 3.65137 2.59702C5.26481 1.68165 7.26864 1.83336 8.90234 3.06088C9.26444 3.33297 9.62329 3.61272 10 3.86459C10.375 3.61235 10.7323 3.33224 11.0928 3.05991ZM15.3613 4.32846C14.3526 3.7547 13.165 4.00159 12.2734 4.67514C11.8085 5.0264 11.4258 5.31503 11.1309 5.51401C10.794 5.74121 10.4222 5.96072 10.0029 5.96127C9.58341 5.96178 9.21066 5.74344 8.87305 5.51694C8.57711 5.31839 8.19345 5.02989 7.72656 4.67905C6.83401 4.00833 5.64645 3.7647 4.63867 4.33627C3.7728 4.82752 3.00009 5.95047 3 7.83041C3 9.56747 4.04271 11.2324 5.50195 12.6878C6.78251 13.965 8.29529 15.0576 9.88281 15.9242C9.9903 15.9828 10.0097 15.9828 10.1172 15.9242C11.7047 15.0576 13.2175 13.965 14.498 12.6878C15.9573 11.2324 17 9.56748 17 7.83041C16.9999 5.94766 16.2272 4.82117 15.3613 4.32846Z"/></svg>
        </span>
      </button>
        <span class="tooltip tooltip-contrast tooltip--compact tooltip--top" role="tooltip"><span class="tooltip__tail"></span><span class="tooltip__bubble">Добавить в избранное</span></span>
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
         desktop price--800 / mobile price--600. Цвет surface-on-highest задаёт сам компонент. -->
    <span class="price price-default price--800">
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
<span class="price price-default price--800">
  <span class="price__main"><span class="price__current">1 900</span><span class="price__currency">₽</span></span>
</span>

<!-- Скидка: акцентная цена + старая зачёркнутая (показывай вместе с бейджем .badge-market-percent) -->
<span class="price price-sale price--800">
  <span class="price__main"><span class="price__current">1 900</span><span class="price__currency">₽</span></span>
  <span class="price__old"><span class="price__old-value">2 000</span><span class="price__old-currency">₽</span></span>
</span>

<!-- Нет в наличии: плейсхолдер вместо цены -->
<span class="price price-none price--800">
  <span class="price__placeholder">Нет в наличии</span>
</span>
```

- Размер: `price--800` desktop / `price--600` mobile (одинаков для всех трёх типов).
- **Скидка** (`price-sale`): текущая цена — акцент, старая — зачёркнута; обычно вместе с бейджем скидки `.badge-market-percent` в `.pcard__badges`.
- **Нет в наличии** (`price-none`): цену заменяет «Нет в наличии». Логично при этом скрыть бейдж скидки и (если есть) отключить корзину/избранное — это на стороне данных потребителя.
- Все детали типов цены — в скилле `awds-component-price`.

### Галерея фото (несколько кадров + слайдер)

Если у товара несколько фото — вложи **несколько** `<img class="pcard__image">` в ссылку-фото (первый помечен `.pcard__image--active`) и добавь индикатор `awds-component-slider` (вариант **dots-mini**, подключи `slider.css`) **между `.pcard__media` и `.pcard__content`** (как в макете — по центру, под фото; НЕ оверлеем). Число точек = числу кадров.

Листание работает в двух режимах, оба — через один `wireGallery` (ниже):

- **Десктоп (мышь)** — наведение делит фото на равные вертикальные зоны по числу кадров: позиция курсора по X выбирает активный кадр и активную точку; уход курсора возвращает к первому.
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

JS-обвязка потребителя (десктоп — hover-зоны, мобила/таблет — свайп):

```js
function wireGallery(link) {
  const imgs = [...link.querySelectorAll('.pcard__image')];
  if (imgs.length < 2) return;                       // одиночное фото — листать нечего
  const card = link.closest('.pcard');
  const slider = card.querySelector('.pcard__slider');
  const dots = slider ? [...slider.querySelectorAll('.slider__dot')] : [];
  const track = slider ? slider.querySelector('.pcard__slider-track') : null;
  const many = slider ? slider.classList.contains('pcard__slider--many') : false;
  const n = imgs.length;
  let current = 0;

  // Окно индикатора (много кадров): лента сдвигается, держа активную по центру окна.
  // Центрируем ПИКСЕЛЬНО (offsetLeft/offsetWidth не зависят от transform и корректны
  // при удлинённой активной точке). Крайние точки окна уменьшаются (--sm).
  const layoutDots = (i) => {
    if (!many || !track || !dots.length) return;
    const cs = getComputedStyle(slider);
    const winW = slider.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0);
    const x0 = dots[0].offsetLeft;
    const center = (d) => (d.offsetLeft - x0) + d.offsetWidth / 2;
    const trackW = (dots[n - 1].offsetLeft - x0) + dots[n - 1].offsetWidth;
    let shift = winW / 2 - center(dots[i]);
    shift = Math.min(0, Math.max(shift, winW - trackW));     // не выходим за края ленты
    track.style.setProperty('--pcard-dots-shift', `${shift}px`);
    const moreLeft = shift < -0.5, moreRight = shift > (winW - trackW) + 0.5;
    dots.forEach((d) => {
      const c = center(d) + shift;
      d.classList.toggle('slider__dot--sm', (moreLeft && c < winW * 0.18) || (moreRight && c > winW * 0.82));
    });
  };
  const setActive = (i) => {
    current = Math.min(n - 1, Math.max(0, i));
    imgs.forEach((im, k) => im.classList.toggle('pcard__image--active', k === current));
    dots.forEach((d, k) => d.classList.toggle('slider__dot--active', k === current));
    layoutDots(current);
  };

  // Десктоп (мышь): перелистывание по hover-зонам.
  link.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    const r = link.getBoundingClientRect();
    setActive(Math.floor((e.clientX - r.left) / r.width * n));
  });
  link.addEventListener('pointerleave', (e) => {
    if (e.pointerType === 'mouse') setActive(0);
  });

  // Мобила/таблет (тач/перо): свайп влево/вправо. CSS даёт ссылке touch-action:pan-y —
  // вертикальный скролл страницы остаётся нативным, горизонталь приходит сюда. Порог
  // SWIPE листает по одному кадру; ребейз sx позволяет длинному свайпу листать дальше.
  // После свайпа гасим клик по ссылке, чтобы жест не открыл карточку товара.
  const SWIPE = 32;                                  // порог, px
  let sx = 0, sy = 0, axis = '', dragging = false, swiped = false;
  link.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse') return;
    dragging = true; swiped = false; axis = '';
    sx = e.clientX; sy = e.clientY;
  });
  link.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'mouse' || !dragging) return;
    const dx = e.clientX - sx, dy = e.clientY - sy;
    if (!axis && Math.hypot(dx, dy) > 8) axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
    if (axis === 'x' && Math.abs(dx) >= SWIPE) {
      setActive(current + (dx < 0 ? 1 : -1));        // влево → следующий, вправо → предыдущий
      swiped = true;
      sx = e.clientX;                                // ребейз под следующий шаг того же жеста
    }
  });
  link.addEventListener('pointerup',     () => { dragging = false; });
  link.addEventListener('pointercancel', () => { dragging = false; axis = ''; });
  link.addEventListener('click', (e) => { if (swiped) { e.preventDefault(); swiped = false; } });

  setActive(0);
}
// Свайп/hover — во всех вариантах карточки; селектор ловит любую ссылку-фото.
document.querySelectorAll('.pcard__image-link').forEach(wireGallery);
```

Одиночное фото (без `.pcard__image--active` и без `.pcard__slider`) работает как прежде — `wireGallery` его пропускает. Мало кадров (≤ окна) — обычные точки без `.pcard__slider--many`/`-track`. Свайп доступен на всех тач-устройствах независимо от числа кадров (≥2).

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

В мобильной вью добавь `.pcard--mobile` корню, кнопке избранного — `.btn-favorites--mobile` (32px вместо 40px), а бейджам — `.badge--50` вместо `.badge--100`:

```html
<div class="pcard pcard-price-first pcard--mobile">
  …
  <button class="btn btn-favorites btn-favorites--mobile btn--icon-only" …>…</button>
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
| `.pcard__image-link` (#1) | товар | фото `scale(0.9) → scale(1)` (0.4s) — раскрывается до 100% · 3%-скрим `opacity → 0` |
| `.pcard__brand` (#2) | бренд | цвет `surface-on-highest → accent-container-on` |
| `.pcard__name` (#3) | товар | цвет `surface-on-highest → accent-container-on` |
| `.pcard__feedback` | — (не ссылка) | статичный: ★ warning · рейтинг surface-on-highest · 💬 иконка surface-on · счётчик surface-on-high |

Фокус-обводка — на каждой ссылке отдельно (`:focus-visible`). Оверлеи над фото: избранное (`.btn-favorites`) — своя кнопка-тоггл (pointer-events:auto); бейджи — `pointer-events:none`, hover/клик проходят к ссылке-фото. Флаг теперь `pointer-events:auto` (ловит hover для тултипа) — зум фото остаётся на остальной площади. Все hover-переходы гасятся при `prefers-reduced-motion: reduce` (зум фото отключается).

### Тултипы (компонент `awds-component-tooltip`, подключи `tooltip.css`)

Триггер `.pcard__tip` (обёртка). Показ по `:hover`/`:focus-within` с задержкой **400мс**, скрытие почти мгновенно (спека tooltip). Тултип — `contrast`/`compact`/`--top` (выпадает **сверху** от элемента, хвост вниз), центрирован по горизонтали относительно триггера.

| Где | `.pcard__tip` на | Текст |
|---|---|---|
| Флаг страны | `.pcard__country` | страна (из данных карточки) |
| Избранное | обёртка вокруг `.btn-favorites` | «Добавить в избранное» |

Точное избегание выхода тултипа за край экрана — на JS-контроллере (как в спеке tooltip); CSS даёт показ/скрытие и центрирование под триггером.

## Опциональные элементы

Любой оверлей можно убрать — карточка не сломается:

- **`.pcard__country`** — флаг страны-поставщика. Бокс 24×24px, флаг вписан с сохранением пропорций (`object-fit: contain` — не обрезается). Нет страны → убери блок.
- **`.pcard__badges`** — маркет-бейджи (компонент `awds-component-badge`, подключи `badge.css`): `badge-market-percent` (акцент) для скидки в %, `badge-market-sale` (бренд-primary) для «Скидка». Можно один, оба или ни одного.
- **`.btn-favorites`** — избранное (компонент `awds-component-button-favorites`, подключи `button-favorites.css`). Нет логики избранного → убери кнопку.
- **`.pcard__slider`** — индикатор галереи (компонент `awds-component-slider`, dots-mini, подключи `slider.css`). Одно фото → не добавляй (и не нужен `.pcard__image--active`).

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
| Счётчик отзывов | `.pcard__reviews-count` |
| Скидка % | `.badge-market-percent` (текст) |
| Состояние избранного | `.btn-favorites[aria-pressed]` |

## Токены

Все значения — через DS. Полная карта — в шапке `product-card-price-first.css` и в `SKILL.md`. Цвета: `surface-on-highest` (текст + скрим над фото @ opacity-5), `accent-container-on` (бренд/название на hover), `surface-on-high` (рейтинг), `surface-bright` (фон медиа = рамка вокруг уменьшенного фото), `warning-core` (звезда). Теней нет. Бейджи и избранное — внешние компоненты (`badge.css`, `button-favorites.css`).
