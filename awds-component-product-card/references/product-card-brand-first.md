# Product Card — brand-first

Карточка товара в раскладке **brand-first**: контент **по центру**, порядок **бренд → название → рейтинг → цена → кнопка «В корзину»**. Фото 3:4 с оверлеями (избранное, маркет-бейджи по центру). Флага страны нет.

**Figma:** [Product Card / Brand First](https://www.figma.com/design/fgXw7Tlrdfz0gCUi2xbZDt/%F0%9F%94%B6-B2C-%E2%86%AA-%C2%B9-Componets?node-id=7460-2601)

Отличия от `price-first`: центрированный контент, бейджи по центру снизу фото, флага нет, есть кнопка корзины (компонент `awds-component-button`). Общее с price-first: цена — компонент `awds-component-price` (desktop `price--800` 20px / mobile `price--600` 16px), строка отзывов `★ рейтинг 💬 счётчик` (статичная, не ссылка), галерея фото со слайдером (`awds-component-slider` dots-mini, окно при многих кадрах), hover-модель фото (`scale(0.9) → scale(1)`, 3%-скрим, без теней). Подключи `price.css` и `slider.css` дополнительно.

## HTML

Корень — `<div>` (контейнер). Кликабельны отдельные ссылки/кнопки со своим hover. Мобильная вью — добавь `.pcard--mobile`. Подключи `product-card-brand-first.css` + `button.css` + `button-favorites.css` + `badge.css`.

```html
<div class="pcard pcard-brand-first">
  <div class="pcard__media">
    <!-- #1 фото → карточка товара -->
    <a class="pcard__image-link" href="/product/123" aria-label="Название товара">
      <img class="pcard__image" src="/img/123.jpg" alt="Название товара">
    </a>

    <div class="pcard__top">
      <!-- Избранное (awds-component-button-favorites) + тултип «Добавить в избранное».
           Флага страны в brand-first нет. -->
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

    <!-- Бейджи (по центру) — компонент awds-component-badge. Mobile: .badge--50 -->
    <div class="pcard__badges">
      <span class="badge badge-market-percent badge--100">10%</span>
      <span class="badge badge-market-sale badge--100">Скидка</span>
    </div>
  </div>

  <!-- Индикатор галереи (если кадров >1) — между медиа и контентом, по центру.
       Одно фото → вместо него .pcard__slider-spacer (резерв высоты, без сдвига).
       Галерея/слайдер/окно при многих кадрах — как в price-first (см. там). -->
  <div class="pcard__slider-spacer" aria-hidden="true"></div>

  <div class="pcard__content">
    <!-- #2 бренд → бренд -->
    <a class="pcard__brand" href="/brand/nike">Brandname</a>
    <!-- #3 название → товар -->
    <a class="pcard__name" href="/product/123">Название товара которое ложится в строку</a>
    <!-- отзывы — статичный блок (НЕ ссылка): ★ рейтинг · 💬 счётчик -->
    <div class="pcard__feedback">
      <svg class="pcard__rating-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 1.4 9.9 5.3l4.3.62-3.1 3 .73 4.28L8 11.18 4.17 13.2l.73-4.28-3.1-3 4.3-.62Z"/></svg>
      <span class="pcard__rating-value">4.9</span>
      <svg class="pcard__reviews-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 2C4.27 2 1.25 4.42 1.25 7.4c0 1.52.8 2.88 2.06 3.86-.13.92-.55 1.72-1.16 2.34 1.2.05 2.4-.32 3.34-1.02.74.22 1.56.34 2.51.34 3.73 0 6.75-2.42 6.75-5.52S11.73 2 8 2Z"/></svg>
      <span class="pcard__reviews-count">23 отзыва</span>
    </div>
    <!-- цена — компонент awds-component-price (подключи price.css): desktop price--800 -->
    <div class="pcard__price">
      <span class="price price-default price--800">
        <span class="price__main"><span class="price__current">1 900</span><span class="price__currency">₽</span></span>
      </span>
    </div>
    <!-- Зона корзины (Figma .AddCart). Потребитель показывает ОДНО из состояний:
         товара нет в корзине → кнопка «В корзину»; есть → степпер с количеством. -->

    <!-- Состояние A — кнопка (товара нет в корзине) -->
    <div class="pcard__cart">
      <button type="button" class="btn btn-primary btn--400">В корзину</button>
    </div>

    <!-- Состояние B — степпер (товар в корзине; кол-во регулируется) -->
    <div class="pcard__cart">
      <div class="pcard__stepper">
        <button type="button" class="btn btn-ghost btn--400 btn--icon-only" aria-label="Убрать один">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M5 10h10"/></svg>
        </button>
        <span class="pcard__stepper-value" aria-live="polite">1</span>
        <button type="button" class="btn btn-ghost btn--400 btn--icon-only" aria-label="Добавить один">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M10 5v10M5 10h10"/></svg>
        </button>
      </div>
      <button type="button" class="btn btn-addition btn--400 btn--icon-only" aria-label="В корзину">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M6 16a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm9 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM1.2 2a1 1 0 1 0 0 2h1.6l2.1 9.05a1 1 0 0 0 .98.77h9.02a1 1 0 0 0 .96-.72l1.74-6.05A.85.85 0 0 0 17.78 6H5.07l-.44-1.99A1 1 0 0 0 3.66 2H1.2Z"/></svg>
      </button>
    </div>
  </div>
</div>
```

### Без фото

Внутри `.pcard__image-link` замени `<img>` на плейсхолдер (как в price-first):

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

Добавь `.pcard--mobile` корню; избранному — `.btn-favorites--mobile`; бейджам — `.badge--50`; всем кнопкам зоны корзины (`btn-primary` / `btn-ghost` / `btn-addition`) — `.btn--300` вместо `.btn--400` (скругление инпута степпера подтянется само через `.pcard--mobile`):

```html
<div class="pcard pcard-brand-first pcard--mobile">
  …
  <button class="btn btn-favorites btn-favorites--mobile btn--icon-only" …>…</button>
  …
  <div class="pcard__badges">
    <span class="badge badge-market-percent badge--50">10%</span>
    <span class="badge badge-market-sale badge--50">Скидка</span>
  </div>
  …
  <!-- Состояние A — кнопка -->
  <div class="pcard__cart">
    <button type="button" class="btn btn-primary btn--300">В корзину</button>
  </div>
  <!-- Состояние B — степпер -->
  <div class="pcard__cart">
    <div class="pcard__stepper">
      <button type="button" class="btn btn-ghost btn--300 btn--icon-only" aria-label="Убрать один">…</button>
      <span class="pcard__stepper-value" aria-live="polite">1</span>
      <button type="button" class="btn btn-ghost btn--300 btn--icon-only" aria-label="Добавить один">…</button>
    </div>
    <button type="button" class="btn btn-addition btn--300 btn--icon-only" aria-label="В корзину">…</button>
  </div>
</div>
```

## Состояния и hover

Контейнер (`<div>`), внутри отдельные ссылки/кнопки, hover у каждой свой:

| Элемент | href / действие | Hover |
|---|---|---|
| `.pcard__image-link` (#1) | товар | фото `scale(0.9) → scale(1)` · 3%-скрим `opacity → 0` |
| `.pcard__brand` (#2) | бренд | цвет `surface-on-highest → accent-container-on` |
| `.pcard__name` (#3) | товар | цвет `surface-on-highest → accent-container-on` |
| `.pcard__feedback` | — (не ссылка) | статичный: ★ warning · рейтинг surface-on-highest · 💬 иконка surface-on · счётчик surface-on-high |
| `.pcard__cart` (зона корзины) | добавить / менять кол-во | состояние A — `.btn-primary` (кнопка); состояние B — степпер: `.btn-ghost` −/+ + квадратная `.btn-addition`; переключает потребитель |
| `.btn-favorites` | избранное | свой компонент (toggle `aria-pressed`) |

Теней нет. Фокус — на каждой ссылке отдельно. Бейджи/флаг не перехватывают hover фото (`pointer-events:none`). Переходы гасятся при `prefers-reduced-motion`.

## Поля для биндинга (PageCraft / SSR)

| Слот | Куда |
|---|---|
| Ссылка на товар | `.pcard__image-link[href]` + `.pcard__name[href]` |
| Ссылка на бренд | `.pcard__brand[href]` |
| Ссылка на отзывы | `.pcard__feedback[href]` |
| Фото | `.pcard__image[src]` / `.pcard__image-link[aria-label]` |
| Цена | компонент `.price` (`.price__current` число, `.price__currency` символ); состояния default / sale / none — как в price-first |
| Бренд / Название | `.pcard__brand` / `.pcard__name` |
| Рейтинг | `.pcard__rating-value` (число) |
| Счётчик отзывов | `.pcard__reviews-count` |
| Галерея фото | несколько `.pcard__image[src]` + `.pcard__slider` (одно фото → `.pcard__slider-spacer`) |
| Скидка % | `.badge-market-percent` |
| Корзина | `.pcard__cart`: кнопка `.btn-primary` (нет в корзине) ↔ степпер `.pcard__stepper` (`.pcard__stepper-value` = кол-во, `.btn-ghost` −/+, `.btn-addition` = подтвердить); состояние выбирает потребитель |
| Избранное | `.btn-favorites[aria-pressed]` |

## Токены

Все значения — через DS. Цвета: бренд / название `surface-on-highest` (роль `link/accent`); рейтинг «4.9» `surface-on-highest`; 💬 иконка отзывов `surface-on`; счётчик отзывов `surface-on-high`; звезда `warning-core`; фон медиа `surface-bright`; скрим `surface-on-highest` @ `opacity-5` (≈3%); hover ссылок (бренд/название) `accent-container-on`. Цена — компонент `awds-component-price` (свои токены). Теней нет. Бейджи, кнопки, избранное — внешние компоненты (`badge.css`, `button.css`, `button-favorites.css`). Степпер (Figma `.AddCart`): контейнер-инпут (Input/Secondary) — sheen-градиент `secondary-chroma → secondary-core` + бордер `secondary-core`; число (form-control placehold) `secondary-container-on-high`; gap зоны `space-2`; скругление инпута `rectangle-400/300-rounded`. Кнопки −/+ и корзины — `awds-component-button` (ghost / addition, `.btn--icon-only`).
