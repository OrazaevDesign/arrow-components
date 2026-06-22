# Product Card — buy-now

Карточка товара с акцентом на покупку: контент **слева**, порядок цена (крупная) → название → ссылка на рубрику → рейтинг → кнопка «В корзину». Медиа как у `price-first` (флаг страны слева + избранное справа, бейджи слева снизу).

**Figma:** [Product Card / Buy Now](https://www.figma.com/design/fgXw7Tlrdfz0gCUi2xbZDt/%F0%9F%94%B6-B2C-%E2%86%AA-%C2%B9-Componets?node-id=7460-2602)

Отличия от `price-first`: вместо бренда — **ссылка на рубрику** (категория, `link/muted`); снизу **кнопка «В корзину»** (компонент `awds-component-button`). Hover-модель фото — та же (`scale(0.9) → scale(1)`, 3%-скрим, без теней).

## HTML

Корень — `<div>` (контейнер). Кликабельны отдельные ссылки/кнопки со своим hover. Мобильная вью — `.pcard--mobile`. Подключи `product-card-buy-now.css` + `button.css` + `button-favorites.css` + `badge.css`.

```html
<div class="pcard pcard-buy-now">
  <div class="pcard__media">
    <!-- #1 фото → карточка товара -->
    <a class="pcard__image-link" href="/product/123" aria-label="Название товара">
      <img class="pcard__image" src="/img/123.jpg" alt="Название товара">
    </a>

    <div class="pcard__top">
      <!-- Флаг + тултип (awds-component-tooltip): текст = страна из данных карточки -->
      <span class="pcard__country pcard__tip">
        <img src="/flags/de.svg" alt="Германия">
        <span class="tooltip tooltip-contrast tooltip--compact tooltip--top" role="tooltip"><span class="tooltip__tail"></span><span class="tooltip__bubble">Германия</span></span>
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

    <!-- Бейджи (слева снизу) — компонент awds-component-badge. Mobile: .badge--50 -->
    <div class="pcard__badges">
      <span class="badge badge-market-percent badge--100">10%</span>
      <span class="badge badge-market-sale badge--100">Скидка</span>
    </div>
  </div>

  <div class="pcard__content">
    <div class="pcard__price">
      <span class="pcard__price-value">1 900</span>
      <span class="pcard__price-currency">₽</span>
    </div>
    <!-- #2 название → товар -->
    <a class="pcard__name" href="/product/123">Название товара которое ложится в строку</a>
    <!-- #3 рубрика → категория -->
    <a class="pcard__category" href="/catalog/sneakers">Ссылка на рубрику товара</a>
    <!-- #4 отзывы → к отзывам товара -->
    <a class="pcard__feedback" href="/product/123#reviews">
      <svg class="pcard__rating-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 1.4 9.9 5.3l4.3.62-3.1 3 .73 4.28L8 11.18 4.17 13.2l.73-4.28-3.1-3 4.3-.62Z"/></svg>
      <span class="pcard__rating-text">4.25 · 23 отзыва</span>
    </a>
    <!-- Кнопка корзины — компонент awds-component-button (.btn .btn-primary .btn--400) -->
    <button type="button" class="btn btn-primary btn--400">В корзину</button>
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

Добавь `.pcard--mobile` корню; избранному — `.btn-favorites--mobile`; бейджам — `.badge--50`; кнопке корзины — `.btn--300`:

```html
<div class="pcard pcard-buy-now pcard--mobile">
  …
  <button class="btn btn-favorites btn-favorites--mobile btn--icon-only" …>…</button>
  …
  <div class="pcard__badges">
    <span class="badge badge-market-percent badge--50">10%</span>
    <span class="badge badge-market-sale badge--50">Скидка</span>
  </div>
  …
  <button type="button" class="btn btn-primary btn--300">В корзину</button>
</div>
```

## Состояния и hover

Контейнер (`<div>`), внутри отдельные ссылки/кнопки, hover у каждой свой:

| Элемент | href / действие | Hover |
|---|---|---|
| `.pcard__image-link` (#1) | товар | фото `scale(0.9) → scale(1)` · 3%-скрим `opacity → 0` |
| `.pcard__name` (#2) | товар | цвет `surface-on-highest → accent-container-on` |
| `.pcard__category` (#3) | рубрика/категория | цвет `surface-on-high → surface-on-highest` (link/muted) |
| `.pcard__feedback` (#4) | товар `#reviews` | текст рейтинга → `accent-container-on` |
| `.btn-primary` (корзина) | добавить в корзину | свой компонент `awds-component-button` |
| `.btn-favorites` | избранное | свой компонент (toggle `aria-pressed`) |

Теней нет. Фокус — на каждой ссылке отдельно. Бейджи/флаг не перехватывают hover фото (`pointer-events:none`). Переходы гасятся при `prefers-reduced-motion`.

## Поля для биндинга (PageCraft / SSR)

| Слот | Куда |
|---|---|
| Ссылка на товар | `.pcard__image-link[href]` + `.pcard__name[href]` |
| Ссылка на рубрику | `.pcard__category[href]` |
| Ссылка на отзывы | `.pcard__feedback[href]` |
| Фото | `.pcard__image[src]` / `.pcard__image-link[aria-label]` |
| Флаг страны | `.pcard__country img[src]` |
| Цена | `.pcard__price-value` (число), `.pcard__price-currency` (символ) |
| Название / Рубрика | `.pcard__name` / `.pcard__category` |
| Рейтинг / отзывы | `.pcard__rating-text` |
| Скидка % | `.badge-market-percent` |
| Корзина | `.btn-primary` (текст/обработчик) |
| Избранное | `.btn-favorites[aria-pressed]` |

## Токены

Все значения — через DS. Цвета: цена/название `surface-on-highest`; рубрика `surface-on-high` → hover `surface-on-highest` (link/muted); рейтинг `surface-on-high`; звезда `warning-core`; фон медиа `surface-bright`; скрим `surface-on-highest` @ `opacity-5` (≈3%); hover названия/отзывов `accent-container-on`. Теней нет. Бейджи, кнопка, избранное — внешние компоненты (`badge.css`, `button.css`, `button-favorites.css`).
