---
name: awds-component-product-card
description: Product Card ArrowDS (.pcard).
---

# Карточка товара ArrowDS

Карточка товара для маркет-грида и слайдера. Композитный layout-компонент: медиа (фото 3:4 с оверлеями) + текстовый контент. Ничего не хардкодит — типографика и отступы из base/Control-шкал, цвета из ролей. См. скилл `arrow-design-system`.

## Варианты (3)

| Вариант | Reference | Порядок контента | Особое |
|---|---|---|---|
| **price-first** | `references/product-card-price-first.md` ✅ | Цена → бренд → название → рейтинг | база: контент слева, флаг страны, корзины нет |
| **brand-first** | `references/product-card-brand-first.md` ✅ | Бренд → название → рейтинг → цена → корзина | контент по центру, бейджи по центру, флага страны нет |
| **buy-now** | `references/product-card-buy-now.md` ✅ | Цена → название → рубрика → рейтинг → корзина | контент слева, вместо бренда ссылка на рубрику `.pcard__category` |

> Имя варианта = порядок контента. Класс варианта обязателен: `.pcard-price-first` / `.pcard-brand-first` / `.pcard-buy-now` — он задаёт порядок и состав частей. Новая раскладка в Figma — это новый вариант того же скилла, не новый скилл.

## Две вьюхи (ось «view» = размер)

Различия касаются размера цены (компонент awds-component-price), бренда, бейджей и оверлей-паддингов. Название и фидбэк — одинаковы в обеих вью.

| Вью | Класс | Цена | Бренд | Бейдж | Рейтинг-текст |
|---|---|---|---|---|---|
| **Desktop-Tablet** (база) | `.pcard` | размер от карточки (масштаб `.typo-*`) | WYSIWYG lead 16/26 | `rectangle-100` | WYSIWYG caption 12/19 |
| **Mobile** | `.pcard--mobile` | размер от карточки (масштаб `.typo-*`) | WYSIWYG body 14/22 | `rectangle-50` | WYSIWYG caption 12/19 |

## Откуда берутся значения

| Что | Источник |
|---|---|
| Текст цены / валюты / бренда / названия | `rgb(var(--surface-on-highest))` (`link/accent` тоже = on-highest) |
| Текст рейтинга | `rgb(var(--surface-on-high))` |
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
│   │       (несколько .pcard__image = галерея; листание: hover-зоны на десктопе, свайп на тач)
│   ├── .pcard__top
│   │   ├── .pcard__country  (<img>/<svg> флаг 24px)
│   │   └── .btn.btn-favorites.btn--icon-only   ← компонент awds-component-button-favorites
│   │       └── .btn-favorites__icon (solid + outline heart; aria-pressed)
│   └── .pcard__badges
│       ├── .badge.badge-market-percent.badge--100   ← компонент awds-component-badge
│       └── .badge.badge-market-sale.badge--100      ← (в мобильной вью .badge--50)
├── .slider.slider-dots-mini.pcard__slider         ← awds-component-slider (индикатор галереи; между медиа и контентом, по центру)
│       └ одно фото → вместо слайдера .pcard__slider-spacer (резерв высоты, без сдвига)
└── .pcard__content
    ├── .price.price-{default|sale|none}  ← awds-component-price (default / скидка / нет в наличии; размер задаёт карточка, едет по .typo-*)
    ├── a.pcard__brand[href]   ← ссылка #2 → бренд (в buy-now вместо неё a.pcard__category[href] → рубрика)
    ├── a.pcard__name[href]    ← ссылка #3 → товар (clamp 2 строки)
    ├── .pcard__feedback ( .pcard__rating-icon + .pcard__rating-value + .pcard__reviews-icon + .pcard__reviews-count ) — статичный блок, не ссылка
    └── .pcard__cart           ← только brand-first / buy-now (см. «Зона корзины»)
```

**Корень — контейнер, а не `<a>`.** Кликабельны три отдельные ссылки: фото, бренд (или рубрика) и название, у каждой свой hover и свой фокус. Обернуть всю карточку в `<a>` нельзя: внутри живут кнопка избранного и кнопка корзины, а интерактивный элемент внутри ссылки — невалидная разметка, и клавиатура до него не доберётся.

## CSS

Файл на вариант — `references/product-card-{price-first,brand-first,buy-now}.css` (база `.pcard` = Desktop-Tablet + модификатор `.pcard--mobile` + под-элементы). Подключается тот, чей вариант стоит на карточке, один раз глобально.

Визуальный QA — `references/preview.html` (storybook, `file://`): обе вьюхи рядом + маркет-грид; тумблеры темы / скругления / избранного / фото.

## Алгоритм использования

1. Корень карточки — контейнер `<div class="pcard pcard-price-first">` (или `<article>`), **без `href`**: кликабельны три отдельные ссылки внутри — фото, бренд (в buy-now рубрика) и название. Мобильная вью — добавь `.pcard--mobile`.
2. Медиа: ссылка на товар `<a class="pcard__image-link" href="…" aria-label="…">`, внутри неё `<img class="pcard__image" alt="…">` или `.pcard__media-placeholder`, если фото нет. Несколько фото → галерея: помечай активный кадр `.pcard__image--active` + добавь индикатор `.slider.slider-dots-mini.pcard__slider` (компонент `awds-component-slider`, точек = кадров) и JS-обвязку `wireGallery` (см. `references/product-card-price-first.md`) — она даёт перелистывание по hover-зонам на десктопе **и свайп влево/вправо на мобиле/таблете** (ссылка-фото несёт `touch-action: pan-y`: вертикальный скролл страницы остаётся нативным). **Много кадров (>5)** — оберни точки в `.pcard__slider-track` и добавь `.pcard__slider--many`: фикс-окно из 5 точек, лента сдвигается (активная по центру), крайние точки уменьшены — индикатор не растягивается. **Одно фото** — слайдера нет, но ставь пустую заглушку `.pcard__slider-spacer` (резерв высоты индикатора), чтобы карточки с 1 и несколькими фото были одной высоты.
3. Оверлеи опциональны: страна (`.pcard__country`), избранное (`.btn.btn-favorites` — компонент `awds-component-button-favorites`, в мобильной вью `+ .btn--200`), бейджи (`.badge.badge-market-percent` / `.badge.badge-market-sale` — компонент `awds-component-badge`, в мобильной вью `.badge--50` вместо `.badge--100`).
4. Контент в порядке price-first. Цена — компонент `awds-component-price`, размерный класс **не пишется** — его задаёт карточка (цена едет по `.typo-*` вместе с брендом/названием, без раздельного desktop/mobile), подключи `price.css`; выбери тип по данным товара: `price-default` (обычная), `price-sale` (скидка: акцентная + старая зачёркнутая, обычно с бейджем `.badge-market-percent`), `price-none` («Нет в наличии» — при этом скрой бейдж скидки). Название клампится в 2 строки. Между медиа и контентом — индикатор галереи `.pcard__slider` (если несколько фото).
5. Подключи `references/product-card-{вариант}.css` **и** CSS используемых компонентов: `awds-component-button-favorites/.../button-favorites.css` (избранное), `awds-component-price/.../price.css` (цена), `awds-component-badge/.../badge.css` (бейджи), `awds-component-slider/.../slider.css` (индикатор галереи), `awds-component-tooltip/.../tooltip.css` (тултипы). Нужны `css-variables.css` сайта (роли) и базовые токены DS (`--awds-space-*`, `--awds-typography-*`, `--awds-rounded-*`, `--awds-shadow-*`, `--awds-font-*`).

## Зона корзины (buy-now / brand-first)

Варианты `buy-now` и `brand-first` несут зону корзины `.pcard__cart` (Figma `.AddCart`) с **двумя вью**. Обе вью держатся в DOM (сложены в один слот через grid-stack), активную выбирает атрибут `data-cart-state="button|stepper"`; переключение — **плавный кросс-фейд** (прерываемый `transition`, MIFB), а не подмена DOM. Меняет атрибут потребитель:

- **button** (нет в корзине): `.pcard__cart-view--button` → `<button class="btn btn-primary btn--400/300">В корзину</button>` — компонент `awds-component-button`.
- **stepper** (в корзине): `.pcard__cart-view--stepper` → поле количества `.pcard__stepper` (Input/Secondary) с ghost-кнопками `−`/`+` внутри + квадратная кнопка корзины `.btn-addition`. Кнопки — `awds-component-button` (ghost / addition, `.btn--icon-only`); стилизуется тут только контейнер-инпут и число (`.pcard__stepper-value`, `tabular-nums`). Число при смене получает мягкий bump (`@keyframes pcard-stepper-bump`, ретриггер класса `.pcard__stepper-value--bump`). Готовый `wireStepper` — в `product-card-buy-now.md`.

Скилла form/input в DS нет, поэтому контейнер степпера стилизован в самом product-card на ролях `secondary-core` / `secondary-chroma` (sheen-градиент + бордер) и `secondary-container-on-high` (число). Размеры: `rectangle-400/300-rounded`, gap `space-2`. Подключи дополнительно `button-ghost.css` + `button-addition.css`. Разметка и mobile — в `product-card-buy-now.md` / `product-card-brand-first.md`.

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

**Две сверки, где часть и карточка расходятся:** `.category` в словаре привязана к ячейке
`link/heading`, а рубрика в самой карточке — к `link/muted` (код следует карточке);
`.feedback` держит «4.2 · 23 отзыва» одним текстом, а карточка — двумя узлами разного
тона. Обе расхождения — открытые вопросы, не дефекты кода.

## Refresh

```
обнови awds-component-product-card под Figma
```

ACB зайдёт в Figma по ссылке (`component.meta.json`), сравнит снапшот, обновит CSS + preview. Документация (этот файл и `product-card-price-first.md`) — не трогается.
