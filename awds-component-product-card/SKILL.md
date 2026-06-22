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
│   ├── .pcard__image  |  .pcard__media-placeholder
│   ├── .pcard__top
│   │   ├── .pcard__country  (<img>/<svg> флаг 20px)
│   │   └── .btn.btn-favorites.btn--icon-only   ← компонент awds-component-button-favorites
│   │       └── .btn-favorites__icon (solid + outline heart; aria-pressed)
│   └── .pcard__badges
│       ├── .pcard__badge.pcard__badge--percent
│       └── .pcard__badge.pcard__badge--sale
└── .pcard__content
    ├── .pcard__price ( .pcard__price-value + .pcard__price-currency )
    ├── .pcard__brand
    ├── .pcard__name        (clamp 2 строки)
    └── .pcard__feedback ( .pcard__rating-icon + .pcard__rating-text )
```

## CSS

Один файл — `references/product-card-price-first.css` (база `.pcard` = Desktop-Tablet + модификатор `.pcard--mobile` + под-элементы). Подключается один раз глобально.

Визуальный QA — `references/preview.html` (storybook, `file://`): обе вьюхи рядом + маркет-грид; тумблеры темы / скругления / избранного / фото.

## Алгоритм использования

1. Корень карточки — `<a class="pcard pcard-price-first" href="…">` (мобильная вью: добавь `.pcard--mobile`).
2. Медиа: `<img class="pcard__image" alt="…">` или `.pcard__media-placeholder` если фото нет.
3. Оверлеи опциональны: страна (`.pcard__country`), избранное (`.btn.btn-favorites` — компонент `awds-component-button-favorites`, в мобильной вью `+ .btn-favorites--mobile`), бейджи (`.pcard__badge--percent` / `--sale`).
4. Контент в порядке price-first. Цену дай числом, валюту отдельным span. Название клампится в 2 строки.
5. Подключи `references/product-card-price-first.css` **и** `awds-component-button-favorites/references/button-favorites.css` (для кнопки избранного). Нужны `css-variables.css` сайта (роли) и базовые токены DS (`--awds-space-*`, `--awds-control-*`, `--awds-rectangle-*`, `--awds-typography-*`, `--awds-rounded-*`, `--awds-shadow-*`, `--awds-font-*`).

## Refresh

```
обнови awds-component-product-card под Figma
```

ACB зайдёт в Figma по ссылке (`component.meta.json`), сравнит снапшот, обновит CSS + preview. Документация (этот файл и `product-card-price-first.md`) — не трогается.
