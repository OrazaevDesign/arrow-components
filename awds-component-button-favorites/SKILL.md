---
name: awds-component-button-favorites
description: Button Favorites ArrowDS (.btn-favorites).
---

# Кнопка «в избранное» ArrowDS

Сердце-toggle: добавить товар в избранное. Это **гость-кнопка компонента Button** (`.btn .btn-favorites`) — без фона и обводки во всех состояниях, — у которой в слоте иконки стоит **дуотон из двух слоёв heart** (заливка + контур). Размер берётся из общей шкалы кнопки, содержимым может быть одно сердце или сердце с подписью. Ничего не хардкодит: геометрия из shape-токенов, цвета из ролей. См. скиллы `arrow-design-system` и `awds-component-button`.

## На базе кнопки

База `.btn`, шкала `.btn--50…600` и `.btn--icon-only` идентичны `awds-component-button` (shape=rectangle, аккумуляторы `--awds-btn-*`). Favorites добавляет вариант `.btn-favorites`, который:

- берёт поверхность гостя: `--awds-btn-bg / -chroma / -border` на роли `extended/transparent`, цвет подписи — из ячеек `button/ghost/color-*`;
- несёт дуотон через две иконки, а не через `color` кнопки.

Файл `references/button-favorites.css` самодостаточный (включает базу `.btn` и всю шкалу), отдельно подключать button не нужно.

## Размеры

| Класс | Габарит icon-only | Сердце |
|---|---|---|
| `.btn--600` | 52px | 20px |
| `.btn--500` | 48px | 20px |
| `.btn--400` (дефолт) | 40px | 20px |
| `.btn--300` | 36px | 20px |
| `.btn--200` | 32px | 16px |
| `.btn--100` | 24px | 16px |
| `.btn--50` | 20px | 16px |

> **Ломающее в 2.0.0.** Класса `.btn-favorites--mobile` (32px с сердцем 20px) больше нет: такой ступени в макете не существует. Ближайшая по габариту — `.btn--200` (те же 32px, сердце 16px).

## Состояния (toggle)

| Состояние | CSS | Дуотон (заливка / контур) |
|---|---|---|
| **Rest** (не в избранном) | `.btn-favorites` | `surface-bright` (белый) / `surface-on-high` (серый) |
| **Hover** | `.btn-favorites:hover` | `error-container-dim` (розовый) / `error-container-on` (красный) |
| **Focus** | `:focus-visible` | как Rest; кольцо рисует слой `focus-selection` |
| **Press** | `:active` | как Hover, плюс `transform: scale(0.9)` |
| **Selected** (в избранном) | `.btn-favorites[aria-pressed="true"]` | `error-container-on` / `error-container-on` (сплошной красный) |

> В Figma выбранность — **отдельный набор** (`favorites-selected`), а не мод Active: мод Active компилируется в `:active`, то есть в нажатие, а «в избранном» — постоянное состояние. Поэтому в коде это `aria-pressed="true"`, а `:active` отдан press-feedback.

Белая заливка в Rest нужна, чтобы серый контур читался поверх фото; на светлом фоне она невидима — это норма.

## Содержимое: сердце или сердце с подписью

Ось макета `content=text|icon`. Icon-only — `.btn--icon-only` плюс `aria-label`; с подписью — текст рядом с иконкой, `aria-label` не нужен.

## Дуотон-разметка (2 иконки)

В `.btn-favorites__icon` — два стекнутых SVG (вектор из Figma `ic20-favourites`), оба `fill="currentColor"`: `.btn-favorites__solid` (залитое сердце) под `.btn-favorites__outline` (залитое кольцо-контур, `fill-rule="evenodd"`). CSS красит слои через `--awds-btn-fav-fill` / `--awds-btn-fav-stroke`. Кольцо рисует границу поверх заливки — получается дуотон. Размер обёртки ведёт ступень шкалы, поэтому сердце уменьшается вместе с кнопкой.

Готовая разметка обоих вариантов — в `references/button-favorites.md`.

## CSS

Один файл — `references/button-favorites.css` (база `.btn` + шкала `.btn--50…600` + `.btn--icon-only` + вариант `.btn-favorites` + дуотон). Подключается один раз глобально.

Визуальный QA — `references/preview.html` (storybook, `file://`): матрица размер × состояние на фото-подложке, переключатель содержимого и живой toggle по клику.

## Алгоритм использования

1. `<button class="btn btn-favorites btn--icon-only" type="button" aria-pressed="false" aria-label="В избранное">`; нужен другой размер — добавь `.btn--{N}`.
2. Внутрь — `.btn-favorites__icon` с двумя SVG (solid + outline, см. `button-favorites.md`).
3. Toggle на клик: переключай `aria-pressed` (`false`↔`true`) и `aria-label` («В избранное» ↔ «В избранном»). CSS сам перекрасит сердце.
4. Подключи `references/button-favorites.css`. Нужны `css-variables.css` сайта (роли `--surface-*`, `--error-container-*`, `--extended-transparent`) и базовые токены DS (`--awds-rounded-*`, `--awds-space-*`, `--awds-opacity-*`, `--awds-control-*`, `--awds-font-*`).

> Карточка товара (`awds-component-product-card`) использует этот компонент: кнопка избранного в `.pcard__top` — `.btn.btn-favorites.btn--icon-only` (в мобильной вью `+ .btn--200`).

## Refresh

```
обнови awds-component-button-favorites под Figma
```

ACB зайдёт в Figma по ссылке (`component.meta.json`), сравнит снапшот, обновит CSS + preview. Документация (этот файл и `button-favorites.md`) — не трогается.
