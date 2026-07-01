---
name: awds-component-product-card
description: >
  Верстка карточек товара ArrowDS — HTML-разметка и CSS на токенах дизайн-системы.
  Используй ВСЕГДА при: добавлении карточки товара в маркет-грид / слайдер или PageCraft-блок,
  выборе варианта раскладки (price-first), вопросах о стилях product-card / бейджах / избранном,
  получении Figma-ссылки на компонент Product Card. Фото 3:4 + оверлеи, две вьюхи (Desktop-Tablet / Mobile).
---

# Карточка товара ArrowDS

Карточка товара для маркет-грида и слайдера. Композитный layout-компонент: медиа (фото 3:4 с оверлеями) + текстовый контент. Ничего не хардкодит — типографика и отступы из base/Control-шкал, цвета из ролей. См. скилл `arrow-design-system`.

## Варианты (1)

| Вариант | Reference | Порядок контента |
|---|---|---|
| **price-first** | `references/product-card-price-first.md` ✅ | Цена → бренд → название → рейтинг |

> Имя варианта = порядок контента. Если в Figma появятся другие раскладки (brand-first, name-first) — это новые варианты того же скилла, не новый скилл.

## Две вьюхи (ось «view» = размер)

Различия касаются только цены/валюты/рейтинга (Control-шкала), размера бейджей и оверлей-паддингов. Бренд и название одинаковы.

| Вью | Класс | Цена | Валюта | Бейдж | Рейтинг-текст |
|---|---|---|---|---|---|
| **Desktop-Tablet** (база) | `.pcard` | Control 850 (20px) | Control 300 (13px) | `rectangle-100` | Control 300 (13px) |
| **Mobile** | `.pcard--mobile` | Control 500 (15px) | Control 200 (12px) | `rectangle-50` | Control 200 (12px) |

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
| Скругление медиа | `var(--awds-rounded-500)` (8px Smooth) |
| Бренд / название | `--awds-typography-font-size-{600,400}` + `line-height-compact-{600,400}` |
| Иконки | флаг 20px (`space-5`, как иконка избранного), звезда 16px (`space-4`); сердце — в компоненте button-favorites |

## Структура и классы

```
.pcard  .pcard-price-first  [.pcard--mobile]        ← корень (обычно <a>)
├── .pcard__media                                   ← фото 3:4 + оверлеи
│   ├── .pcard__image [.pcard__image--active]  |  .pcard__media-placeholder
│   │       (несколько .pcard__image = галерея; листание: hover-зоны на десктопе, свайп на тач)
│   ├── .pcard__top
│   │   ├── .pcard__country  (<img>/<svg> флаг 24px)
│   │   └── .btn.btn-favorites.btn--icon-only   ← компонент awds-component-button-favorites
│   │       └── .btn-favorites__icon (solid + outline heart; aria-pressed)
│   └── .pcard__badges
│       ├── .pcard__badge.pcard__badge--percent
│       └── .pcard__badge.pcard__badge--sale
├── .slider.slider-dots-mini.pcard__slider         ← awds-component-slider (индикатор галереи; между медиа и контентом, по центру)
│       └ одно фото → вместо слайдера .pcard__slider-spacer (резерв высоты, без сдвига)
└── .pcard__content
    ├── .price.price-{default|sale|none}.price--800/600  ← awds-component-price (default / скидка / нет в наличии; desktop 800 / mobile 600)
    ├── .pcard__brand
    ├── .pcard__name        (clamp 2 строки)
    └── .pcard__feedback ( .pcard__rating-icon + .pcard__rating-value + .pcard__reviews-icon + .pcard__reviews-count )
```

## CSS

Один файл — `references/product-card-price-first.css` (база `.pcard` = Desktop-Tablet + модификатор `.pcard--mobile` + под-элементы). Подключается один раз глобально.

Визуальный QA — `references/preview.html` (storybook, `file://`): обе вьюхи рядом + маркет-грид; тумблеры темы / скругления / избранного / фото.

## Алгоритм использования

1. Корень карточки — `<a class="pcard pcard-price-first" href="…">` (мобильная вью: добавь `.pcard--mobile`).
2. Медиа: `<img class="pcard__image" alt="…">` или `.pcard__media-placeholder` если фото нет. Несколько фото → галерея: помечай активный кадр `.pcard__image--active` + добавь индикатор `.slider.slider-dots-mini.pcard__slider` (компонент `awds-component-slider`, точек = кадров) и JS-обвязку `wireGallery` (см. `references/product-card-price-first.md`) — она даёт перелистывание по hover-зонам на десктопе **и свайп влево/вправо на мобиле/таблете** (ссылка-фото несёт `touch-action: pan-y`: вертикальный скролл страницы остаётся нативным). **Много кадров (>5)** — оберни точки в `.pcard__slider-track` и добавь `.pcard__slider--many`: фикс-окно из 5 точек, лента сдвигается (активная по центру), крайние точки уменьшены — индикатор не растягивается. **Одно фото** — слайдера нет, но ставь пустую заглушку `.pcard__slider-spacer` (резерв высоты индикатора), чтобы карточки с 1 и несколькими фото были одной высоты.
3. Оверлеи опциональны: страна (`.pcard__country`), избранное (`.btn.btn-favorites` — компонент `awds-component-button-favorites`, в мобильной вью `+ .btn-favorites--mobile`), бейджи (`.pcard__badge--percent` / `--sale`).
4. Контент в порядке price-first. Цена — компонент `awds-component-price` (desktop `price--800` / mobile `price--600`), подключи `price.css`; выбери тип по данным товара: `price-default` (обычная), `price-sale` (скидка: акцентная + старая зачёркнутая, обычно с бейджем `.badge-market-percent`), `price-none` («Нет в наличии» — при этом скрой бейдж скидки). Название клампится в 2 строки. Между медиа и контентом — индикатор галереи `.pcard__slider` (если несколько фото).
5. Подключи `references/product-card-price-first.css` **и** CSS используемых компонентов: `awds-component-button-favorites/.../button-favorites.css` (избранное), `awds-component-price/.../price.css` (цена), `awds-component-badge/.../badge.css` (бейджи), `awds-component-slider/.../slider.css` (индикатор галереи), `awds-component-tooltip/.../tooltip.css` (тултипы). Нужны `css-variables.css` сайта (роли) и базовые токены DS (`--awds-space-*`, `--awds-typography-*`, `--awds-rounded-*`, `--awds-shadow-*`, `--awds-font-*`).

## Зона корзины (buy-now / brand-first)

Варианты `buy-now` и `brand-first` несут зону корзины `.pcard__cart` (Figma `.AddCart`) с **двумя состояниями** — переключает потребитель по количеству товара в корзине:

- **button** (нет в корзине): `<button class="btn btn-primary btn--400/300">В корзину</button>` — компонент `awds-component-button`.
- **stepper** (в корзине): поле количества `.pcard__stepper` (Input/Secondary) с ghost-кнопками `−`/`+` внутри + квадратная кнопка корзины `.btn-addition`. Кнопки — `awds-component-button` (ghost / addition, `.btn--icon-only`); стилизуется тут только контейнер-инпут и число (`.pcard__stepper-value`, `tabular-nums`).

Скилла form/input в DS нет, поэтому контейнер степпера стилизован в самом product-card на ролях `secondary-core` / `secondary-chroma` (sheen-градиент + бордер) и `secondary-container-on-high` (число). Размеры: `rectangle-400/300-rounded`, gap `space-2`. Подключи дополнительно `button-ghost.css` + `button-addition.css`. Разметка и mobile — в `product-card-buy-now.md` / `product-card-brand-first.md`.

## Refresh

```
обнови awds-component-product-card под Figma
```

ACB зайдёт в Figma по ссылке (`component.meta.json`), сравнит снапшот, обновит CSS + preview. Документация (этот файл и `product-card-price-first.md`) — не трогается.
