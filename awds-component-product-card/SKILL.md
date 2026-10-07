---
name: awds-component-product-card
description: Product Card ArrowDS (.pcard).
---

# Карточка товара ArrowDS

Карточка товара для маркет-грида и слайдера. Композитный layout-компонент: медиа (фото 3:4 с оверлеями) + текстовый контент. Ничего не хардкодит — типографика и отступы из base/Control-шкал, цвета из ролей. См. скилл `arrow-design-system`.

## Варианты (3)

| Вариант | Reference | Порядок контента | Особое |
|---|---|---|---|
| **price-first** | `references/product-card-price-first.md` ✅ | Цена → бренд → название → (рубрика) → (корзина) → рейтинг | база: контент слева, флаг страны; рубрика и корзина по умолчанию выключены |
| **brand-first** | `references/product-card-brand-first.md` ✅ | Бренд → название → (рубрика) → цена → корзина → рейтинг | контент по центру, бейджи по центру, флаг страны слева сверху |
| **buy-now** | `references/product-card-buy-now.md` ✅ | Цена → название → рубрика → корзина → рейтинг | контент слева, бренда нет, рубрика по умолчанию включена |
| **button-price** | `references/product-card-button-price.md` ✅ | Бренд → название → (рубрика) → корзина → рейтинг | цена — подпись кнопки корзины; без цены — disabled «Нет в наличии»; зона корзины обязательна |

> Имя варианта = порядок контента. Класс варианта обязателен: `.pcard-price-first` / `.pcard-brand-first` / `.pcard-buy-now` / `.pcard-button-price` — он задаёт порядок и состав частей.
>
> **Строка отзывов под корзиной (с 1.4.0, 07.10.2026).** В `brand-first`, `buy-now` и `button-price` рейтинг стоит последним, после зоны корзины, — так в макете (секция ↪ product-card, node 465:51861). С 1.4.2 так же и в `price-first` (решение владельца 07.10.2026 — единообразие вариантов; корзина в нём по умолчанию выключена, поэтому в блоках порядок не менялся).

## Две вьюхи (ось «view» = размер)

Различия касаются размера цены (компонент awds-component-price), бренда, бейджей и оверлей-паддингов. Название и фидбэк — одинаковы в обеих вью.

| Вью | Класс | Цена | Бренд | Бейдж | Рейтинг-текст |
|---|---|---|---|---|---|
| **Desktop-Tablet** (база) | `.pcard` | размер от карточки (масштаб `.typo-*`) | WYSIWYG lead | `rectangle-100` | WYSIWYG caption |
| **Mobile** | `.pcard--mobile` | размер от карточки (масштаб `.typo-*`) | WYSIWYG body | `rectangle-50` | WYSIWYG caption |

Чисел в таблице нет намеренно: роли дают разные значения по моду масштаба (`.typo-small/medium/large`) и по ширине окна (ступени typography переключаются `@media`). Макет карточки стоит в моде **medium**, мобильная вьюха нарисована мобильными значениями окна — цена там 20/24 против 24/29 на десктопе (сверено `component-figma-check`, 27.09.2026).

## Откуда берутся значения

| Что | Источник |
|---|---|
| Текст цены / валюты / бренда / названия | `rgb(var(--surface-on-highest))` (`link/accent` тоже = on-highest) |
| Текст рейтинга | `rgb(var(--surface-on-high))` |
| Рубрика `.pcard__category` | ячейка `link/heading`: rest `surface-on-high`, hover `accent-core`. До 1.4.0 была `link/muted` с hover `surface-on-highest` — макет 07.10.2026 перевёл рубрику на `link/heading` |
| Бренд / название — hover | ячейка `link/accent`: rest `surface-on-highest`, hover `accent-core` (без изменений) |
| Стрелки галереи | компонент `awds-component-button-overhung` / secondary 100 — свои цвета, тень и прозрачность 60% → 90% |
| Фон медиа | `rgb(var(--surface-bright))` |
| Звезда рейтинга | `rgb(var(--warning-core))` (`rating/selected`) |
| Бейдж **percent** | bg `accent-core` / sheen `accent-chroma` / border `accent-core` / текст `accent-on` |
| Бейдж **sale** | bg `primary-core` / sheen `primary-chroma` / border `primary-core` / текст `primary-on` |
| Избранное | компонент `awds-component-button-favorites` (`.btn-favorites`) — свои цвета/состояния |
| Скругление медиа | `var(--awds-rounded-border-radius-500)` (8px Smooth) |
| Бренд / название / фидбэк | **Роли WYSIWYG-пресетов** `--awds-wysiwyg-*-lead/body/caption-{fs,lh,ls}` (НЕ жёсткий шаг `--awds-typography-*`). Бренд desktop = `lead`, mobile = `body`; название = `body`; фидбэк/рубрика = `caption`. Роли масштабируются коллекцией `.typo-large/medium/small` на секции-предке — карточка едет по той же оси, что типографика блоков. **Макет стоит в моде Medium, а это и есть дефолт `:root`** (lead 18/29, body 16/26, caption 13/21) — отдельный класс для совпадения с макетом не нужен; `.typo-small` и `.typo-large` дают соседние ступени. До переезда в новый файл витрина стояла на Small, отсюда прежняя формулировка «`.typo-small` = макет». Цена тоже едет по этой оси: `.pcard .price` переопределяет аккумуляторы price на роли WYSIWYG `price-listing` (24/29 в medium) и `caption` — фикс-шкалы `control-*` у цены внутри карточки нет |
| Иконки | флаг 20px (`space-5`, как иконка избранного), звезда 16px (`space-4`); сердце — в компоненте button-favorites |

## Структура и классы

```
.pcard  .pcard-price-first  [.pcard--mobile]        ← корень: контейнер <div>/<article>, НЕ ссылка
├── .pcard__media                                   ← фото 3:4 + оверлеи
│   ├── a.pcard__image-link[href][aria-label]       ← ссылка #1 → товар (фото без текста, отсюда aria-label)
│   │   └── .pcard__image[alt] [.pcard__image--active]  |  .pcard__media-placeholder
│   │       (несколько .pcard__image = галерея; листание: стрелки .pcard__nav на десктопе, свайп на тач)
│   ├── .pcard__top
│   │   ├── .pcard__country  (<img>/<svg> флаг 24px)
│   │   └── .btn.btn-favorites.btn--icon-only   ← компонент awds-component-button-favorites
│   │       └── .btn-favorites__icon (solid + outline heart; aria-pressed)
│   ├── .pcard__nav                             ← стрелки галереи, только при 2+ кадрах (с 1.4.0)
│   │   ├── button.obtn.obtn-secondary.obtn--100.obtn--icon-only.pcard__nav-btn.pcard__nav-btn--prev  ← awds-component-button-overhung
│   │   └── button.obtn.obtn-secondary.obtn--100.obtn--icon-only.pcard__nav-btn.pcard__nav-btn--next
│   └── .pcard__badges
│       ├── .badge.badge-market-percent.badge--100   ← компонент awds-component-badge
│       └── .badge.badge-market-sale.badge--100      ← (в мобильной вью .badge--50)
├── .slider.slider-dots-mini.pcard__slider         ← awds-component-slider (индикатор галереи; между медиа и контентом, по центру)
│       └ одно фото → вместо слайдера .pcard__slider-spacer (резерв высоты, без сдвига)
└── .pcard__content
    ├── .price.price-{default|sale|none}  ← awds-component-price (default / скидка / нет в наличии; размер задаёт карточка, едет по .typo-*)
    ├── a.pcard__brand[href]   ← ссылка #2 → бренд (в buy-now бренда нет)
    ├── a.pcard__name[href]    ← ссылка #3 → товар (1 строка с многоточием)
    ├── a.pcard__category[href] ← рубрика, необязательна (`show-category`)
    ├── .pcard__cart           ← зона корзины, необязательна (`show-cart`, см. «Зона корзины»)
    └── .pcard__feedback ( .pcard__rating-icon + .pcard__rating-value + .pcard__reviews-icon + .pcard__reviews-count ) — статичный блок, не ссылка, необязателен (`show-feedback`)
        └ товар без отзывов → пустая .pcard__feedback.pcard__feedback--empty[aria-hidden] (резерв высоты строки)

Порядок выше — во всех четырёх вариантах: отзывы последние, под корзиной. В price-first так с 1.4.2
(решение владельца 07.10.2026 — единообразие; корзина там по умолчанию выключена, и в блоках порядок не менялся).
С 07.10.2026 рубрика, отзывы и зона корзины есть во **всех** вариантах и включаются по отдельности. Выключено — элемента нет в разметке. Значения по умолчанию и порядок строк — в `{variant}.md`, раздел «Необязательные строки».
```

**Резерв строки отзывов.** Когда строка отзывов включена, она стоит у каждой карточки ряда. У товара без отзывов вместо неё пустая `<div class="pcard__feedback pcard__feedback--empty" aria-hidden="true"></div>`: высоту ей даёт `::before` с неразрывным пробелом на строке caption, поэтому резерв едет по `.typo-*` вместе с текстом. Без резерва карточки без отзывов были бы ниже, и ряд прыгал бы. Счётчик склоняется по числу — «1 отзыв / 2 отзыва / 5 отзывов» (остатки от деления на 10 и 100), зашитого «отзыва» больше нет.

**Стрелки галереи.** `.pcard__nav` лежит внутри `.pcard__media`, после `.pcard__top` и перед `.pcard__badges`; ставится только при двух кадрах и больше. Кнопки по краям фото, по центру его высоты, поле `space-2` (8px). Видны только на десктопе: при наведении на фото (`@media (hover: hover)` + `.pcard__media:hover`) или при фокусе внутри (`:focus-within`). На тач-экранах (`hover: none`) и в `.pcard--mobile` стрелок нет. Почему так (решение владельца 07.10.2026): постоянные стрелки на каждой карточке ряда шумят, а на таче галерею и так листает свайп. Обёртка гасится целиком (`opacity 0 → 1`), прозрачность самих кнопок 60% → 90% держит button-overhung, так что две прозрачности не спорят. На десктопе стрелки — единственный способ листать: переключение кадра позицией курсора (hover-зоны) убрано решением владельца 07.10.2026 — со стрелками оно мешало, кадр менялся от простого движения мыши. Уход курсора с `.pcard__media` возвращает первый кадр. CSS — раздел «Стрелки галереи» в каждом `product-card-*.css`, JS — `wireGallery` (`references/product-card-price-first.md`).

**Корень — контейнер, а не `<a>`.** Кликабельны три отдельные ссылки: фото, бренд (или рубрика) и название, у каждой свой hover и свой фокус. Обернуть всю карточку в `<a>` нельзя: внутри живут кнопка избранного и кнопка корзины, а интерактивный элемент внутри ссылки — невалидная разметка, и клавиатура до него не доберётся.

## CSS

Файл на вариант — `references/product-card-{price-first,brand-first,buy-now,button-price}.css` (база `.pcard` = Desktop-Tablet + модификатор `.pcard--mobile` + под-элементы). Подключается тот, чей вариант стоит на карточке, один раз глобально.

Визуальный QA — `references/preview.html` (storybook, `file://`): обе вьюхи рядом + маркет-грид; тумблеры темы / скругления / избранного / фото.

## Алгоритм использования

1. Корень карточки — контейнер `<div class="pcard pcard-price-first">` (или `<article>`), **без `href`**: кликабельны три отдельные ссылки внутри — фото, бренд (в buy-now рубрика) и название. Мобильная вью — добавь `.pcard--mobile`.
2. Медиа: ссылка на товар `<a class="pcard__image-link" href="…" aria-label="…">`, внутри неё `<img class="pcard__image" alt="…">` или `.pcard__media-placeholder`, если фото нет. Несколько фото → галерея: помечай активный кадр `.pcard__image--active` + добавь индикатор `.slider.slider-dots-mini.pcard__slider` (компонент `awds-component-slider`, точек = кадров) и JS-обвязку `wireGallery` (см. `references/product-card-price-first.md`) — она даёт листание **стрелками** `.pcard__nav` на десктопе (по кругу; позиция курсора кадр не переключает, уход курсора с фото возвращает первый кадр) **и свайп влево/вправо на мобиле/таблете** (ссылка-фото несёт `touch-action: pan-y`: вертикальный скролл страницы остаётся нативным). **Много кадров (>5)** — оберни точки в `.pcard__slider-track` и добавь `.pcard__slider--many`: фикс-окно из 5 точек, лента сдвигается (активная по центру), крайние точки уменьшены — индикатор не растягивается. **Одно фото** — слайдера нет, но ставь пустую заглушку `.pcard__slider-spacer` (резерв высоты индикатора), чтобы карточки с 1 и несколькими фото были одной высоты. При двух кадрах и больше добавь в `.pcard__media` стрелки `.pcard__nav` (после `.pcard__top`, перед `.pcard__badges`; разметка — в `product-card-price-first.md`), при одном кадре стрелок нет.
3. Оверлеи опциональны: страна (`.pcard__country`), избранное (`.btn.btn-favorites` — компонент `awds-component-button-favorites`, в мобильной вью `+ .btn--200`), бейджи (`.badge.badge-market-percent` / `.badge.badge-market-sale` — компонент `awds-component-badge`, в мобильной вью `.badge--50` вместо `.badge--100`).
4. Контент в порядке price-first. Цена — компонент `awds-component-price`, размерный класс **не пишется** — его задаёт карточка (цена едет по `.typo-*` вместе с брендом/названием, без раздельного desktop/mobile), подключи `price.css`; выбери тип по данным товара: `price-default` (обычная), `price-sale` (скидка: акцентная + старая зачёркнутая, обычно с бейджем `.badge-market-percent`), `price-none` («Нет в наличии» — при этом скрой бейдж скидки). Название клампится в 2 строки. Между медиа и контентом — индикатор галереи `.pcard__slider` (если несколько фото).
5. Подключи `references/product-card-{вариант}.css` **и** CSS используемых компонентов: `awds-component-button-favorites/.../button-favorites.css` (избранное), `awds-component-price/.../price.css` (цена), `awds-component-badge/.../badge.css` (бейджи), `awds-component-slider/.../slider.css` (индикатор галереи), `awds-component-tooltip/.../tooltip.css` (тултипы), `awds-component-button-overhung/.../button-overhung-secondary.css` (стрелки галереи; без него `.obtn` не получит ни формы, ни прозрачности). Нужны `css-variables.css` сайта (роли) и базовые токены DS (`--awds-space-*`, `--awds-typography-*`, `--awds-rounded-*`, `--awds-shadow-*`, `--awds-font-*`).

## Зона корзины (buy-now / brand-first / button-price)

**Как её собирают блоки (с 07.10.2026).** Товарные слайдеры выводят только вью `button`, а кнопка «В корзину» открывает модалку быстрого просмотра Atlas — ту же, что у штатной мини-карточки витрины:

```html
<div class="pcard__cart" data-cart-state="button">
  <div class="pcard__cart-view pcard__cart-view--button">
    <button type="button" class="btn btn-primary btn--400"
            data-selector="mini-product-card:root"
            data-product-id="{{ p.id }}"
            data-product-variation-id="{{ p.variation.id }}">
      <svg …иконка корзины…></svg>В корзину
    </button>
  </div>
</div>
```

- Клик ловит делегированный слушатель `app.js` Atlas на `document` (WidgetManager, фаза capture) и монтирует виджет в `#mini-product-card-modal-host`. Своего JS не нужно: кнопка работает, даже если `script.js` блока на витрине не отработал.
- В модалке покупатель выбирает вариацию, видит доставку и пошлину, задаёт количество; если товара нет в наличии — «Подписаться».
- Правило Atlas регистрируется, только если `body.dataset.rubricFilterVersion === 'new'`.
- Товар без цены (нет в наличии) — кнопка `disabled`, атрибутов модалки на ней нет.

**Почему модалка, а не свой степпер** (решение владельца 07.10.2026): прежний свой `POST /my/shopping-cart/{id}/set-quantity` клал товар в корзину без выбора размера. Модалка Atlas этот выбор уже делает, и дублировать её логику в каждом блоке незачем.

**Цена решения.** Состояние «в корзине» карточка больше не показывает: после добавления кнопка остаётся кнопкой. Модалка держится на внутренних атрибутах Atlas: их переименование тихо сломает кнопку. После обновлений Atlas проверять, что в `app-*.js` витрины осталась строка `mini-product-card:root`.

**Степпер остался в компоненте.** CSS двух вью и кросс-фейд ниже — возможность компонента, ей по-прежнему можно пользоваться вне товарных слайдеров. Блоки её не используют: вью `.pcard__cart-view--stepper` не рендерят, атрибутов `data-cps-add/inc/dec` и `data-cps-cart` в них нет.

### Две вью (возможность компонента)

Любой вариант может нести зону корзины (по умолчанию она включена в `buy-now` и `brand-first`, в `button-price` обязательна) `.pcard__cart` (Figma `.AddCart`) с **двумя вью**. Обе вью держатся в DOM (сложены в один слот через grid-stack), активную выбирает атрибут `data-cart-state="button|stepper"`; переключение — **плавный кросс-фейд** (прерываемый `transition`, MIFB), а не подмена DOM. Меняет атрибут потребитель:

- **button** (нет в корзине): `.pcard__cart-view--button` → `<button class="btn btn-primary btn--400">В корзину</button>` — компонент `awds-component-button`.
- **stepper** (в корзине): `.pcard__cart-view--stepper` → поле количества `.pcard__stepper` (Input/Secondary) с ghost-кнопками `−`/`+` внутри + квадратная кнопка корзины `.btn-addition`. Кнопки — `awds-component-button` (ghost / addition, `.btn--icon-only`); стилизуется тут только контейнер-инпут и число (`.pcard__stepper-value`, `tabular-nums`). Число при смене получает мягкий bump (`@keyframes pcard-stepper-bump`, ретриггер класса `.pcard__stepper-value--bump`). Готовый `wireStepper` — в `product-card-buy-now.md`.

Контейнер степпера стилизован в самом product-card на ролях `secondary-core` / `secondary-chroma` (sheen-градиент и внутренняя обводка — inset-тень, как INSIDE в макете: поле 40px, кнопки под рамкой) и `secondary-on` (число, ячейка `form-control/secondary/color` — значение, а не подсказка). Число — шкала control 400 (14/20), как у контролов. Размеры: `rectangle-400-rounded`, gap `space-2`. Подключи дополнительно `button-ghost.css` + `button-addition.css`. Разметка и mobile — в `product-card-buy-now.md` / `product-card-brand-first.md`.

## Словарь частей в макете

Рядом с карточкой лежит секция **`↪ part`** — 15 частей (14 наборов и одиночная `.blog`),
из которых карточка собрана:
[↪ part](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=5-53) на странице `9 · commerce`.

**Словарь богаче кода, и это намеренно** (решение владельца 18.09.2026 — заход закрывал
проход по компонентам, а не расширял карточку). В коде нет пяти частей:

| Часть макета | Что это | Почему нет в коде |
|---|---|---|
| `.colors` | точки цветов товара, ось `count=2…4+` | нет блока-потребителя |
| `.blog` | дата, счётчик комментариев (скрыт по умолчанию) и просмотров; три текстовых свойства `date`/`comments`/`views`, оси нет | каталог блога, а не товаров |
| `.course` | эмблема курса | каталог курсов |
| `.brand-badge` | бренд плашкой вместо текста | карточка держит бренд текстом |
| `.layout` `kind=app\|course` | пропорции фото 1:1 и 4:3 | код знает только 3:4 |

Вопросы заведены в мете и на доске — реализовывать эти части в обход вопроса не нужно.

**Сверка, где часть и карточка расходятся:** `.feedback` держит «4.2 · 23 отзыва» одним
текстом, а карточка — двумя узлами разного тона. Это открытый вопрос, не дефект кода.

Второй вопрос закрыт 07.10.2026: `.category` в словаре была привязана к ячейке
`link/heading`, а рубрика в карточке — к `link/muted`. Макет перевёл рубрику карточки на
`link/heading` (hover `accent-core`), код догнал его в 1.4.0, и часть с карточкой совпадают.

## Refresh

```
обнови awds-component-product-card под Figma
```

ACB зайдёт в Figma по ссылке (`component.meta.json`), сравнит снапшот, обновит CSS + preview. Документация (этот файл и `product-card-price-first.md`) — не трогается.
