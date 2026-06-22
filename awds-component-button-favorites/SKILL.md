---
name: awds-component-button-favorites
description: >
  Верстка кнопки «в избранное» (heart toggle) ArrowDS — icon-only вариант компонента Button на токенах дизайн-системы.
  Используй ВСЕГДА при: добавлении кнопки избранного / вишлиста / лайка-сердца в разметку,
  карточку товара или PageCraft-блок, вопросах о стилях button-favorites / состоянии «в избранном»,
  получении Figma-ссылки на компонент Favourites. Прозрачная (без фона) icon-only кнопка с двумя иконками, toggle, 2 вью (Desktop 40 / Mobile 32).
---

# Кнопка «в избранное» ArrowDS

Иконка-сердце поверх медиа (карточка товара, галерея). Это **icon-only вариант компонента Button** (`.btn .btn-favorites .btn--icon-only`) — **без фона и бордера** во всех состояниях. Внутри — **две** иконки heart (заливка + контур), меняется только их дуотон-цвет. Ничего не хардкодит: геометрия из shape-токенов кнопки, цвета из ролей. См. скиллы `arrow-design-system` и `awds-component-button`.

## На базе кнопки

База `.btn` и `.btn--icon-only` идентичны `awds-component-button` (shape=rectangle, аккумуляторы `--awds-btn-*`). Favorites добавляет вариант `.btn-favorites`, который:

- зануляет поверхность: `--awds-btn-bg / -chroma / -border = transparent` во всех состояниях (фона и обводки нет);
- несёт дуотон через две иконки, а не через `color` кнопки.

Файл `references/button-favorites.css` самодостаточный (включает базу `.btn`), отдельно подключать button не нужно.

## Состояния (toggle)

| Состояние | CSS | Дуотон (заливка / контур) |
|---|---|---|
| **Rest** (не в избранном) | `.btn-favorites` | `surface-bright` (белый) / `surface-on-high` (серый) |
| **Hover** | `.btn-favorites:hover` | `error-container-dim` (розовый) / `error-container-on` (красный) |
| **Selected** (в избранном) | `.btn-favorites[aria-pressed="true"]` | `error-container-on` / `error-container-on` (сплошной красный) |
| Press | `:active` | без смены цвета, `transform: scale(0.9)` |
| Focus | `:focus-visible` | обводка `surface-on-highest` (от базы `.btn`) |

> В Figma «в избранном» названо **State=Active** — это **постоянное** состояние, не нажатие. Поэтому в коде = `aria-pressed="true"`, а CSS `:active` отдан press-feedback.

Белая заливка в Rest нужна, чтобы серый контур читался поверх фото; на светлом фоне она невидима — это норма.

## Две вьюхи (ось «view» = размер кнопки)

| Вью | Класс | Padding | Габарит | Иконка |
|---|---|---|---|---|
| **Desktop** (база) | `.btn` (дефолт = rectangle-400) | 10px | 40×40 | 20px |
| **Mobile** | `.btn-favorites--mobile` | 6px (`space-1-5`) | 32×32 | 20px |

Desktop — дефолтная геометрия `.btn` (rectangle-400: padding 10, иконка 20 → icon-only 40px), отдельный size-класс не нужен. Mobile (32px) нет в стандартной shape-шкале rectangle, поэтому padding задан на base-шкале (`space-1-5`).

## Дуотон-разметка (2 иконки)

В `.btn-favorites__icon` — два стекнутых 20px-SVG (вектор из Figma `ic20-favourites`), оба `fill="currentColor"`: `.btn-favorites__solid` (залитое сердце) под `.btn-favorites__outline` (залитое кольцо-контур, `fill-rule="evenodd"`). CSS красит слои через `--awds-btn-fav-fill` / `--awds-btn-fav-stroke`. Кольцо рисует границу поверх заливки — получается дуотон.

```html
<button class="btn btn-favorites btn--icon-only" type="button" aria-pressed="false" aria-label="В избранное">
  <span class="btn-favorites__icon">
    <svg class="btn-favorites__solid" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M11.0928 3.05991C12.7287 1.82393 14.7348 1.67089 16.3496 2.5892C17.9639 3.50742 18.9999 5.38217 19 7.83041C19 10.3627 17.5048 12.5134 15.9102 14.1039C14.295 15.7147 12.4254 16.9035 11.3584 17.5189C10.935 17.765 10.5039 17.9945 10 17.9945C9.49607 17.9945 9.06496 17.765 8.6416 17.5189C7.57455 16.9035 5.70499 15.7147 4.08984 14.1039C2.49516 12.5134 1 10.3627 1 7.83041C1.0001 5.38314 2.03712 3.51291 3.65137 2.59702C5.26481 1.68165 7.26864 1.83336 8.90234 3.06088C9.40086 3.43548 9.74153 3.6909 9.9873 3.8558L10.0127 3.85678C10.2575 3.69164 10.5961 3.43517 11.0928 3.05991Z"/></svg>
    <svg class="btn-favorites__outline" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.0928 3.05991C12.7287 1.82393 14.7348 1.67089 16.3496 2.5892C17.9639 3.50742 18.9999 5.38217 19 7.83041C19 10.3627 17.5048 12.5134 15.9102 14.1039C14.295 15.7147 12.4254 16.9035 11.3584 17.5189C10.935 17.765 10.5039 17.9945 10 17.9945C9.49607 17.9945 9.06495 17.765 8.6416 17.5189C7.57455 16.9035 5.70499 15.7147 4.08984 14.1039C2.49516 12.5134 1 10.3627 1 7.83041C1.0001 5.38314 2.03712 3.51291 3.65137 2.59702C5.26481 1.68165 7.26864 1.83336 8.90234 3.06088C9.26444 3.33297 9.62329 3.61272 10 3.86459C10.375 3.61235 10.7323 3.33224 11.0928 3.05991ZM15.3613 4.32846C14.3526 3.7547 13.165 4.00159 12.2734 4.67514C11.8085 5.0264 11.4258 5.31503 11.1309 5.51401C10.794 5.74121 10.4222 5.96072 10.0029 5.96127C9.58341 5.96178 9.21066 5.74344 8.87305 5.51694C8.57711 5.31839 8.19345 5.02989 7.72656 4.67905C6.83401 4.00833 5.64645 3.7647 4.63867 4.33627C3.7728 4.82752 3.00009 5.95047 3 7.83041C3 9.56747 4.04271 11.2324 5.50195 12.6878C6.78251 13.965 8.29529 15.0576 9.88281 15.9242C9.9903 15.9828 10.0097 15.9828 10.1172 15.9242C11.7047 15.0576 13.2175 13.965 14.498 12.6878C15.9573 11.2324 17 9.56748 17 7.83041C16.9999 5.94766 16.2272 4.82117 15.3613 4.32846Z"/></svg>
  </span>
</button>
```

## CSS

Один файл — `references/button-favorites.css` (база `.btn` + `.btn--icon-only` + вариант `.btn-favorites` + дуотон + `.btn-favorites--mobile`). Подключается один раз глобально.

Визуальный QA — `references/preview.html` (storybook, `file://`): матрица состояние × вью на фото-подложке + живой toggle по клику.

## Алгоритм использования

1. `<button class="btn btn-favorites btn--icon-only" type="button" aria-pressed="false" aria-label="В избранное">` (мобильная вью — добавь `.btn-favorites--mobile`).
2. Внутрь — `.btn-favorites__icon` с двумя SVG (solid + outline, см. выше).
3. Toggle на клик: переключай `aria-pressed` (`false`↔`true`) и `aria-label` («В избранное» ↔ «В избранном»). CSS сам перекрасит сердце.
4. Подключи `references/button-favorites.css`. Нужны `css-variables.css` сайта (роли `--surface-*`, `--error-container-*`) и базовые токены DS (`--awds-rectangle-*`, `--awds-space-*`, `--awds-opacity-*`, `--awds-font-*`).

> Карточка товара (`awds-component-product-card`) уже использует этот компонент: кнопка избранного в `.pcard__top` — `.btn.btn-favorites.btn--icon-only` (в мобильной вью `+ .btn-favorites--mobile`).

## Refresh

```
обнови awds-component-button-favorites под Figma
```

ACB зайдёт в Figma по ссылке (`component.meta.json`), сравнит снапшот, обновит CSS + preview. Документация (этот файл и `button-favorites.md`) — не трогается.
