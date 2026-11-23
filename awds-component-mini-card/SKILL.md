---
name: awds-component-mini-card
description: Mini Card ArrowDS (.mcard).
---

# Mini-card (быстрый просмотр товара) ArrowDS

Окно товара поверх листинга: фото, цена, вариации, «Купить сейчас», бренд, доставка, в подвале
«Добавить в корзину» и количество. Открывается кнопкой «В корзину» карточки товара
(`awds-component-product-card`) вместо окна Atlas. Композит: своих цветов и шрифтов почти нет,
значения — у вложенных компонентов и токенов DS (`arrow-design-system`).

Макет: Figma «🔶 arrow ↪ system», страница «5 · listing», секция `mini-card` (9983:75153): тело —
набор `mini-card / body` 9983:75782 (оси `view=desktop|mobile`, `state=default|loading|error`), окно —
экземпляр `modal / sidepage`, демо 9992:2760, 9992:2963 и «· in-cart» 10013:379, 10013:1738.
Решения по поведению — `arrowdesign/logs/2026/11/21/` 00-20, 00-27, 01-33, 01-39, 03-20.

## Из чего собран

| Часть | Компонент | Класс |
| --- | --- | --- |
| окно, панель справа; ≤ 615 — шторка снизу | `modal` | `.mdl.mdl-sidepage.mcard`, ширина 480 — ручка `--awds-mdl-width` |
| шапка поверх фото: «Закрыть», избранное, «поделиться» | `modal` (слоты `start` / `end`), `button-overhung` secondary 400 (сердце `.obtn__fav`), `toast` normal | `.mdl__header--overlay`, `.mdl__back`, `[data-mc-share]`, `.mcard__toast` |
| галерея: квадрат, кадры стопкой с кроссфейдом, фото на всю площадь (cover) без наложений поверх плашки `surface-container-low`; стрелки видны при наведении и фокусе внутри галереи; точки | `button-overhung` secondary 400, `slider` dots | `.mcard__gallery`, `.mcard__frame(--active)`, `.mcard__nav`, `.slider.slider-dots(.slider--window)` |
| цена: при скидке число на плашке цвета badge market-percent, старая цена рядом; ниже процент и пошлина | `price`, `badge` market-sale / market-brand 100 | `.mcard__price .price` — 24/32, валюта и старая 12; `.mcard__tips`, `.mcard__duty` |
| вариации | `list-item` variation(-selected, -indeterminate) 400 hug; variation-img(-selected) 76 × 95 — у плитки один класс варианта, `variation-img` или `variation-img-selected`, не оба | `.mcard__aspects`, `.mcard__aspect`, `.mcard__tiles` |
| загрузка / ошибка на месте вариаций | `progress` circular; `list-item` transparent 300 + `button` secondary 400 | `.mcard__loading`, `.mcard__error` |
| название — ссылка на товар, две строки, кегль body | `link` accent | `.mcard__title > .lnk` |
| бренд с логотипом и подписью «100% оригинал» | — (плашка логотипа как в product-card) | `.mcard__brand`, `.mcard__brand-logo`, `.mcard__brand-note` |
| «Купить сейчас»; в loading — состояние загрузки кнопки | `button` secondary 600 (`btn--loading`) | `.mcard__buy` |
| доставка; в loading и error — скелетон двух строк | `list-item` transparent 300, иконки truck и wallet | `.mcard__delivery`, `.mcard__skeleton` |
| подвал: «Добавить в корзину» / степпер + «В корзину» | `modal` footer `--stretch`, `stepper` secondary 600, `button` primary | `.mcard__qty` — степпер по ширине содержимого |

## Разметка

Разметку собирает `mini-card.js`, руками окно не верстается. Скелет — для сверки и отладки:

```html
<dialog class="mdl mdl-sidepage mcard" aria-labelledby="awds-mc-1-title">
  <header class="mdl__header mdl__header--overlay">
    <button class="obtn obtn-secondary obtn--400 obtn--icon-only mdl__back" type="button" aria-label="Закрыть">…arrow_left…</button>
    <button class="obtn obtn-secondary obtn--400 obtn--icon-only" type="button" aria-pressed="false" aria-label="В избранное"><span class="obtn__fav" aria-hidden="true">…</span></button>
    <button class="obtn obtn-secondary obtn--400 obtn--icon-only" type="button" aria-label="Поделиться">…share_2…</button>
  </header>
  <div class="mdl__content mdl__content--flush">
    <div class="mcard__body" data-state="loading">
      <div class="mcard__gallery theme-default theme-light">
        <div class="mcard__frames"><img class="mcard__frame mcard__frame--active" src="…" alt="Название товара"><img class="mcard__frame" data-src="…" alt=""></div>
        <button class="obtn obtn-secondary obtn--400 obtn--icon-only mcard__nav mcard__nav--prev" type="button" aria-label="Предыдущее фото">…</button>
        <button class="obtn obtn-secondary obtn--400 obtn--icon-only mcard__nav mcard__nav--next" type="button" aria-label="Следующее фото">…</button>
        <div class="slider slider-dots mcard__dots" aria-hidden="true">…</div>
      </div>
      <div class="mcard__info">
        <div class="mcard__price-block">
          <div class="mcard__price"><span class="price price-sale">…</span></div>
          <div class="mcard__tips"><span class="mcard__badges"><span class="badge badge--100 badge-market-sale">10%</span></span><span class="badge badge--100 badge-market-brand mcard__duty">≈ 763 ₽ таможенный платёж</span></div>
        </div>
        <div class="mcard__details">
          <div class="mcard__aspects">
          <div class="mcard__aspect" role="radiogroup" aria-labelledby="…">
            <p class="mcard__aspect-label"><span>Размер:</span><span class="mcard__aspect-value">37</span></p>
            <div class="mcard__tiles">
              <button class="list-item list-item-variation-selected list-item--400 list-item--hug" type="button" role="radio" aria-checked="true">…</button>
            </div>
          </div>
          </div>
          <div class="mcard__loading">…progress circular…</div>
          <div class="mcard__error" role="alert">…list-item transparent… <button class="btn btn-secondary btn--400" type="button">Повторить</button></div>
        </div>
        <div class="mcard__main">
          <div class="mcard__head">
            <h2 class="mcard__title" id="awds-mc-1-title"><a class="lnk lnk-accent lnk--ul-hover" href="…">Название товара</a></h2>
            <a class="mcard__brand" href="…"><span class="mcard__brand-logo"><img src="…" alt=""></span><span class="mcard__brand-text"><span class="lnk lnk-accent lnk--ul-hover mcard__brand-name">Бренд</span><span class="mcard__brand-note">100% оригинал</span></span></a>
          </div>
          <button class="btn btn-secondary btn--600 mcard__buy" type="button"><span class="btn__content">Купить сейчас</span></button>
          <ul class="mcard__delivery"><li class="list-item list-item-transparent list-item--300">…</li></ul>
          <div class="mcard__skeleton" aria-hidden="true">…две строки-плашки…</div>
        </div>
      </div>
    </div>
  </div>
  <footer class="mdl__footer mdl__footer--stretch">
    <button class="btn btn-primary btn--500" type="button">Добавить в корзину</button>
  </footer>
  <p class="mcard__status" aria-live="polite"></p>
</dialog>
```

## Состояния тела

Атрибут `data-state` на `.mcard__body`, в макете ось `state`.

| `state` | Что видно |
| --- | --- |
| `loading` (сразу при открытии) | фото, цена, процент скидки, название и бренд из карточки листинга; строка бейджей держит место под пошлину; на месте вариаций кольцо в поле высотой с две группы вариаций (цвет с фото и размер, 199), как в макете; доставку держит скелетон двух строк; «Купить сейчас» в состоянии загрузки (`btn--loading`), кнопка подвала выключена |
| `default` (нет атрибута) | всё по ответу `product-variation-offers` |
| `error` | на месте вариаций строка «Не загрузились размеры и доставка» и «Повторить»; скелетон доставки; «Купить сейчас» и кнопка подвала выключены |

Кнопка подвала выключена, пока окно не знает корзину: `set-quantity` пишет число, а не прибавляет,
и «1» поверх лежащего в корзине товара уменьшила бы количество.

«В корзине» — состояние подвала, не тела: степпер (на единице «−» становится корзиной, «Удалить из
корзины») и ссылка «В корзину» на `pageCart`. «+» выключен на остатке вариации (`quantity`).

## Вьюхи

`view=mobile` — окно ≤ 615 (та же граница, на которой sidepage становится шторкой): нет стрелок
галереи, листание свайпом; ряд плиток прокручивается вбок без переноса, выбранная плитка
подкручивается в поле зрения. `view=desktop` — стрелки при наведении на галерею и при фокусе внутри неё, плитки переносятся.

## Подключение в блоке

Блоку некуда подключить общий файл, поэтому скрипт едет копией (как `modal.js`):

1. `style.css` — секции компонентов: `mini-card`, `modal`, `stepper`, `list-item` (transparent,
   variation, variation-selected, variation-indeterminate, variation-img, variation-img-selected; 300,
   400), `progress` circular, `button` (primary, secondary; 400, 500, 600), `button-overhung`
   secondary 400 (с 1.3.0 — и кнопки шапки с сердцем `.obtn__fav`), `toast` normal (тост «Ссылка
   скопирована», с 1.3.0), `slider` dots, `link` accent, `price`, `badge` (market-sale и market-brand 100 —
   с 1.4.0, бейджи процента и пошлины). Секции `button` ghost 500 и
   `button-favorites` 500 шапке больше не нужны; у блока они могут остаться для своих элементов.
2. `script.js` — секции `// awds:component-js modal@…` и `// awds:component-js mini-card@…` на
   верхнем уровне файла; в коде блока после словаря строк одна строка:
   ```js
   if (window.awdsMiniCard) window.awdsMiniCard.attach(ROOT, i18n);
   ```
   `ROOT` — класс корня блока, `i18n(root)` — его словарь (`card.fav`, `card.photo_prev`,
   `card.photo_next`, `card.out_of_stock`, `action.retry` и все `mini.*` из
   `ui-strings.json` — в `awds:i18n` и `awds:i18n-js` блока).
3. Кнопка «В корзину» карточки остаётся с атрибутами Atlas: `data-selector="mini-product-card:root"`,
   `data-product-id`, `data-product-variation-id`.
   С 2.1.0 кнопка несёт и `data-delivery-date` — дату доставки из данных листинга
   (`variation.deliveryDate.formatted`, «9 декабря»). Окно берёт её, когда в ответе вариаций даты нет
   (так на shopotam, 23.11.2026), и пишет «Доставка с 9 декабря» (`mini.delivery_from`). Дата одна на
   все вариации в наличии: это «сегодня + срок сайта». Атрибута нет — строка «Доставка» без даты.

Окно создаётся один раз на корень блока и живёт внутри него: CSS блока в `@scope`, а модальный
`<dialog>` всё равно рисуется в верхнем слое.

## Поведение

- **Перехват раньше Atlas.** Слушатель на `window` в фазе захвата; Atlas слушает `document`.
  Событие гасится, только если кнопка в подключённом блоке. Скрипт блока не отработал — клик
  уходит Atlas, и открывается его окно: это запасной путь, а не ошибка.
- **Вариация при открытии** — та, что в карточке (`data-product-variation-id`); нет в ответе — первая
  в наличии.
- **Вариации.** Аспекты в порядке ответа; значения без наличия не выводятся. Значение, которого нет
  при выбранных остальных аспектах, — плитка `variation-indeterminate` («нет в этом сочетании»);
  нажатие переключает остальные аспекты на ближайшую вариацию в наличии. Группа — `radiogroup`,
  стрелки двигают выбор. Смена цвета (аспект `type: image`) меняет кадры галереи.
- **Цена и скидка** — из вариации; процент окно считает само по двум ценам, как Atlas.
- **Пошлина** — строка под ценой, если `duty.isDutyExist`.
- **Доставка** — `shipping_data` вариации: способ (`post`) с датой, если она есть, и цена (`price`).
- **Бренд** — имя и ссылка из ответа, логотип — из карточки листинга (в ответе offers логотипа нет):
  выключен логотип в блоке — в окне только имя.
- **«Поделиться»** (21.11.2026) — системное меню (`navigator.share`: телефоны, Safari, Chrome на
  Windows) со ссылкой на товар из карточки; где меню нет — ссылка в буфер и тост `toast` normal
  «Ссылка скопирована» на 3 с по центру над подвалом (`.mcard__toast`, высоту подвала скрипт кладёт в
  `--mcard-toast-offset`). Отмена меню — не ошибка. Не скопировалось — тост «Не удалось скопировать
  ссылку». Нет ссылки у карточки — нет и кнопки. Строки — `mini.share`, `mini.link_copied`,
  `mini.share_error`.
- **Избранное** — нажатием кнопки карточки (`[data-cps-fav]`): запрос, вход гостя и откат уже там;
  окно отражает её `aria-pressed`. Гостю витрина открывает окно входа Atlas (обычный слой в
  `<body>`, z-index 1060): на это время наше окно становится немодальным (`.mcard--under`,
  z-index 1050) и остаётся на месте под входом; окно входа закрыли — наше снова модальное, фокус
  на избранном. Вошёл — Atlas перезагружает страницу.
- **Корзина** — `GET /my/shopping-cart/{variationId}/set-quantity/{qty}` с `X-Requested-With`, успех —
  `status: "success"`, `dataLayer` ответа уходит в `window.dataLayer`. Изменение оптимистичное,
  ошибка — откат и сообщение для читалки. После успеха — событие `awds:cart-change` на `document`
  (`detail: { variationId, quantity, delta }`), его слушает `awds-header`.
- **«Купить сейчас»** — как «Купить» в строке корзины Atlas: положить 1 шт. (если ещё нет), снять
  галки с остальных позиций (`check/off`), отметить эту (`check/on`), перейти на
  `summary.checkoutUrl` из `new-data`. Остальные товары остаются в корзине без галок.
- **Адреса** — из карты эндпоинтов Atlas (`body[data-endpoint]`, `endpoints.*`); нет карты —
  адреса по умолчанию, те же, что зашиты в Atlas.
- **Галерея** — как в product-card: кадры лежат стопкой, новый проявляется поверх уходящего;
  стрелки листают по кругу, на таче свайп (порог 32 px, вертикаль отдана прокрутке). Кадры со
  второго приходят в `data-src` и грузятся на наведение, касание или первое листание.
- **Фокус** при открытии — на самом окне (`tabindex="-1"`), без кольца (с 2.1.0, решение владельца
  23.11.2026; раньше — кольцо на «Закрыть»). Первый Tab ведёт на «Закрыть»; после перерисовки подвала фокус
  остаётся у нажатой кнопки. Закрывают «Закрыть», Esc, клик по подложке, «назад» браузера
  (`modal.js`). Прокрутку страницы держит `modal.js`.

## Ограничения

- Строки доставки собраны из текста ответа: цена доставки берётся из фразы «…заказа в Россию от
  643 ₽». Другой формулировки (другой язык витрины) — строка выводится текстом ответа целиком.
- Строку «Доставка из Германии» (`shipping_data` с `icon: delivery`) макет не рисует, окно её не
  выводит.
- Оптовая цена, подписка на поступление, `is_hide_price` — не нарисованы и не поддержаны: из
  листинга окно открывается только у товара в наличии.
