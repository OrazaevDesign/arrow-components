---
name: awds-component-breadcrumbs
description: Breadcrumbs ArrowDS (.crumbs).
---

# Breadcrumbs ArrowDS

Хлебные крошки: путь от главной к текущей странице одной строкой, шаги разделены
шевроном. Значения — только токены DS. См. `arrow-design-system` за общей картиной
токенов и `arrow-components-builder` за регенерацией скилла из Figma.

## Главное: пункты — это button-area

Своего цвета у крошек нет — только тот же `link/muted-rest`, что у пунктов. Ссылки —
инстансы [awds-component-button-area](../awds-component-button-area/SKILL.md):

| Что | Чем |
|---|---|
| шаг пути (ссылка) | `.btn-area.btn-area-muted.btn-area--100` |
| разделитель | `li.crumbs__sep[aria-hidden="true"]` с шевроном `ic-a` |
| текущая страница | `span.crumbs__current[aria-current="page"]` — не ссылка |

**Не верстать ссылки заново.** Рядом подключаются `button-area.css` и
`focus-selection.css`, а `breadcrumbs.css` добавляет раскладку, разделитель и текущую
страницу. Ступень `100` — та, что даёт 13/16 и иконку 16, как в макете.

## Текущая страница — не ссылка

Последний шаг выглядит как пункт в покое, но наведения, фокуса и курсора-руки у него
нет: ссылка на страницу, где пользователь уже стоит, — пустое действие и лишняя
остановка табуляции. Решение владельца 09.10.2026. О том, что это текущая страница,
сообщает `aria-current="page"`, а не цвет.

## Откуда берутся значения

| Что | Макет | Токен |
|---|---|---|
| Кегль, интерлиньяж, трекинг | `font-size/300` 13, `line-height/300` 16, `letter-spacing/300` 0.1 | `--awds-control-{font-size,line-height,letter-spacing}-300` |
| Насыщенность | `weight/regular` 400 | `--awds-font-weight-regular` |
| Цвет текущей страницы и шеврона | `link/muted-rest` #6a6a6a | `rgb(var(--surface-on-high))` |
| Размер шеврона | `rectangle/100/icon` 16 | `--awds-space-4` |
| Зазор между шагами | auto-layout слота `list`: gap 0 | `gap: 0` — воздух даёт поле иконки |
| Цвет ссылок, наведение, кольцо фокуса | — | `awds-component-button-area`, `awds-component-focus-selection` |

**Шкалы размеров у компонента нет.** Ступень одна — пункты `btn-area--100`. Как у
`pagination` и `link`.

## Разметка

```html
<nav class="crumbs" aria-label="Хлебные крошки">
  <ol class="crumbs__list">
    <li class="crumbs__item"><a class="btn-area btn-area-muted btn-area--100" href="/"><span class="btn-area__label">Главная</span></a></li>
    <li class="crumbs__sep" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false"><path d="…шеврон ic-a…" fill="currentColor"/></svg></li>
    <li class="crumbs__item"><span class="crumbs__current" aria-current="page">Рубрика</span></li>
  </ol>
</nav>
```

Полная разметка с путём шеврона, выбор способа разделителя и поведение длинной цепочки —
в [references/breadcrumbs.md](references/breadcrumbs.md).

## Чего в компоненте нет

- **Свёртки на мобильном.** Блок `awds-breadcrumbs` на узком контейнере сворачивает путь
  в «‹ родитель». В макете компонента этого нет — открытый вопрос в мете.
- **Разметки BreadcrumbList для поиска.** Это забота страницы (блок умеет `json_ld`),
  а не вида крошек.

## CSS-файл

| Вариант | Файл | Что внутри |
|---|---|---|
| единственный | `references/breadcrumbs.css` | раскладка с переносом, разделитель, текущая страница |

## Storybook

Открой [references/preview.html](references/preview.html) локально (`file://`) —
эталон из макета, длинная цепочка с переносом, одиночный шаг, самопроверка числами.

## Refresh

```
обнови awds-component-breadcrumbs под Figma
```

## Соседние компоненты

- **[awds-component-button-area](../awds-component-button-area/SKILL.md)** — все шаги пути.
- **[awds-component-pagination](../awds-component-pagination/SKILL.md)** — соседняя
  карточка секции `8 · navigation`: перебор страниц, а не путь к странице.
- **[awds-component-link](../awds-component-link/SKILL.md)** — инлайн-ссылка в тексте.
  В крошках не используется: у шага пути нет подчёркивания, это область, а не ссылка в
  абзаце.
