# Product Card — button-price

Карточка товара, где цена — подпись кнопки корзины. Контент **слева**, порядок бренд → название → рубрика → рейтинг → кнопка «🛒 12 900 ₽». Отдельной строки цены нет. Медиа как у `buy-now` (флаг страны слева + избранное справа, бейджи слева снизу).

**Figma:** [product-card / button-price](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=985-30177)

Отличия от `buy-now`: сверху **бренд** (как в `price-first`: lead 18/29, на мобиле body 16/26) вместо цены; цена переехала в **кнопку корзины**. Зона корзины в этом варианте **обязательна** — свойства `show-cart` нет, иначе карточка останется без цены. Галерея, отзывы, степпер, тултипы и hover фото — как в `buy-now`. Подключи `price.css` и `slider.css` дополнительно.

## HTML

Корень — `<div>` (контейнер). Кликабельны отдельные ссылки/кнопки со своим hover. Мобильная вью — `.pcard--mobile`. Подключи `product-card-button-price.css` + `button.css` + `button-favorites.css` + `badge.css` + `price.css`.

```html
<div class="pcard pcard-button-price">
  <div class="pcard__media">
    <!-- #1 фото → карточка товара -->
    <a class="pcard__image-link" href="/product/123" aria-label="Название товара">
      <img class="pcard__image" src="/img/123.jpg" alt="Название товара">
    </a>

    <div class="pcard__top">
      <!-- Флаг + тултип (awds-component-tooltip): текст = страна из данных карточки -->
      <span class="pcard__country pcard__tip" aria-describedby="pcard-123-tip-country">
        <img src="/flags/de.svg" alt="Германия">
        <span class="tooltip tooltip-contrast tooltip--300 tooltip--side-top" role="tooltip" id="pcard-123-tip-country"><span class="tooltip__tail"></span><span class="tooltip__bubble">Германия</span></span>
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

    <!-- Бейджи (слева снизу) — компонент awds-component-badge. Mobile: .badge--50 -->
    <div class="pcard__badges">
      <span class="badge badge-market-percent badge--100">10%</span>
      <span class="badge badge-market-sale badge--100">Скидка</span>
    </div>
  </div>

  <!-- Индикатор галереи (если кадров >1) — между медиа и контентом, по центру.
       Одно фото → вместо него .pcard__slider-spacer (резерв высоты). Галерея/окно —
       как в price-first (см. там). -->
  <div class="pcard__slider-spacer" aria-hidden="true"></div>

  <div class="pcard__content">
    <!-- бренд → страница бренда (link/accent) -->
    <a class="pcard__brand" href="/brand/acme">Brandname</a>
    <!-- название → товар -->
    <a class="pcard__name" href="/product/123">Название товара которое ложится в строку</a>
    <!-- рубрика → категория (link/muted), необязательна: show-category -->
    <a class="pcard__category" href="/catalog/sneakers">Ссылка на рубрику товара</a>
    <!-- отзывы — статичный блок (НЕ ссылка), необязателен: show-feedback -->
    <div class="pcard__feedback">
      <svg class="pcard__rating-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 1.4 9.9 5.3l4.3.62-3.1 3 .73 4.28L8 11.18 4.17 13.2l.73-4.28-3.1-3 4.3-.62Z"/></svg>
      <span class="pcard__rating-value">4.9</span>
      <svg class="pcard__reviews-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 2C4.27 2 1.25 4.42 1.25 7.4c0 1.52.8 2.88 2.06 3.86-.13.92-.55 1.72-1.16 2.34 1.2.05 2.4-.32 3.34-1.02.74.22 1.56.34 2.51.34 3.73 0 6.75-2.42 6.75-5.52S11.73 2 8 2Z"/></svg>
      <span class="pcard__reviews-count">23 отзыва</span>
    </div>
    <!-- Зона корзины (Figma .AddCart). ОБЕ вью всегда в DOM (сложены стопкой);
         активную задаёт data-cart-state на .pcard__cart (button | stepper),
         переключение — плавный кросс-фейд (CSS). Потребитель только меняет
         атрибут (см. wireStepper ниже). Дефолт без атрибута = button. -->
    <div class="pcard__cart" data-cart-state="button">
      <!-- Вью A — кнопка: подпись — цена (товара нет в корзине) -->
      <div class="pcard__cart-view pcard__cart-view--button">
        <button type="button" class="btn btn-primary btn--400" aria-label="В корзину, 12 900 ₽">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M6 16a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm9 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM1.2 2a1 1 0 1 0 0 2h1.6l2.1 9.05a1 1 0 0 0 .98.77h9.02a1 1 0 0 0 .96-.72l1.74-6.05A.85.85 0 0 0 17.78 6H5.07l-.44-1.99A1 1 0 0 0 3.66 2H1.2Z"/></svg>
          <span class="price price-default"><span class="price__main"><span class="price__current">12 900</span><span class="price__currency">₽</span></span></span>
        </button>
      </div>
      <!-- Вью B — степпер (товар в корзине; кол-во регулируется) -->
      <div class="pcard__cart-view pcard__cart-view--stepper">
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
</div>
```

## Цена в кнопке

Подпись кнопки — компонент `awds-component-price` по обычной разметке. Размер и цвет задаёт кнопка: карточка переопределяет аккумуляторы цены на шкалу control 400 (14/20 semibold, как подпись кнопки) и `currentColor`. Валюта того же кегля, что и число — в макете «12 900 ₽» один текст. Размерный класс цене не пиши.

| Состояние товара | Кнопка |
|---|---|
| обычная цена | иконка корзины + `<span class="price price-default">` с ценой; `aria-label="В корзину, 12 900 ₽"` |
| со скидкой | иконка + **только новая цена** (`.price-sale` без `.price__old`). Старую в кнопку не выводят: на 158px рядом с иконкой она не помещается, выгоду показывает бейдж скидки на фото. Если шаблон всё же отдаёт `.price__old`, карточка его скрывает |
| нет в наличии | `<button class="btn btn-primary btn--400" disabled>Нет в наличии</button>` — без иконки и без цены; кнопка гаснет компонентом `button` |

```html
<!-- со скидкой: только новая цена -->
<button type="button" class="btn btn-primary btn--400" aria-label="В корзину, 11 900 ₽">
  <svg …иконка корзины…></svg>
  <span class="price price-sale"><span class="price__main"><span class="price__current">11 900</span><span class="price__currency">₽</span></span></span>
</button>

<!-- нет в наличии -->
<button type="button" class="btn btn-primary btn--400" disabled>Нет в наличии</button>
```

`aria-label` обязателен у кнопки с ценой: одно число не говорит экранному диктору, что делает кнопка. В степпере цена не показывается — он такой же, как в `buy-now`.

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

Добавь `.pcard--mobile` корню; избранному — `.btn--200`; бейджам — `.badge--50`. Зона корзины остаётся `.btn--400`, как на десктопе (48px в обеих вьюхах). Бренд на мобиле мельче — роль body, это делает CSS.

## Состояния и hover

| Элемент | href / действие | Hover |
|---|---|---|
| `.pcard__image-link` | товар | фото без зума (`scale(0.9)` всегда, зум убран в 1.3.2) · 3%-скрим `opacity → 0` |
| `.pcard__brand` | бренд | `surface-on-highest → accent-core` (link/accent) |
| `.pcard__name` | товар | `surface-on-highest → accent-core` (link/accent) |
| `.pcard__category` | рубрика | `surface-on-high → surface-on-highest` (link/muted) |
| `.pcard__feedback` | — (не ссылка) | статичный |
| `.pcard__cart` | добавить / менять кол-во | обе вью в DOM, активную задаёт `data-cart-state`; кросс-фейд |
| `.btn-favorites` | избранное | свой компонент (toggle `aria-pressed`) |

Теней нет. Фокус — на каждой ссылке отдельно. Переходы гасятся при `prefers-reduced-motion`. Степпер и `wireStepper` — [product-card-buy-now.md](product-card-buy-now.md#степпер-корзины-js-потребителя).

## Поля для биндинга (PageCraft / SSR)

| Слот | Куда |
|---|---|
| Ссылка на товар | `.pcard__image-link[href]` + `.pcard__name[href]` |
| Ссылка на бренд | `.pcard__brand[href]` |
| Ссылка на рубрику | `.pcard__category[href]` |
| Фото | `.pcard__image[src]` / `.pcard__image-link[aria-label]` |
| Флаг страны | `.pcard__country img[src]` |
| Цена | внутри кнопки: `.price__current` число, `.price__currency` символ; текст `aria-label` кнопки; нет в наличии → `disabled` и «Нет в наличии» |
| Бренд / Название / Рубрика | `.pcard__brand` / `.pcard__name` / `.pcard__category` |
| Рейтинг | `.pcard__rating-value` (число) |
| Счётчик отзывов | `.pcard__reviews-count` |
| Галерея фото | несколько `.pcard__image[src]` + `.pcard__slider` (одно фото → `.pcard__slider-spacer`) |
| Скидка % | `.badge-market-percent` |
| Корзина | `.pcard__cart[data-cart-state]`: вью `--button` ↔ вью `--stepper` |
| Избранное | `.btn-favorites[aria-pressed]` |

**Необязательные строки.** Две строки контента включаются свойствами макета:

| Свойство в макете | Строка в коде | По умолчанию в button-price |
|---|---|---|
| `show-category` | `<a class="pcard__category">` — рубрика товара | вкл. |
| `show-feedback` | `<div class="pcard__feedback">` — рейтинг и отзывы целиком | вкл. |

Выключенное свойство означает, что элемента нет в разметке. Не прячь его через `hidden` или `display:none`: данные останутся в SSR-ответе. Зона корзины здесь не выключается.

## Токены

Все значения — через DS. Цвета: бренд и название `surface-on-highest` (link/accent) → hover `accent-core`; рубрика `surface-on-high` (link/muted) → hover `surface-on-highest`; рейтинг «4.9» `surface-on-highest`; 💬 `surface-on`; счётчик `surface-on-high`; звезда `warning-core`; фон медиа `surface-bright`; скрим `surface-on-highest` @ `opacity-5`. Цена в кнопке — `awds-component-price` на шкале `--awds-control-*-400` и `currentColor` кнопки. Степпер — как в `buy-now`. Теней нет.
