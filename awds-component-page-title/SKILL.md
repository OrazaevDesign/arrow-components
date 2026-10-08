---
name: awds-component-page-title
description: Page Title ArrowDS (.ptitle).
---

# Page Title ArrowDS

Заголовок страницы: хлебные крошки сверху, `<h1>` под ними. Составной компонент — две
готовые части одной колонкой с зазором `space-3`. Своих цветов, шрифтов и состояний нет:
их держат вложенные компоненты. См. `arrow-design-system` за общей картиной токенов и
`arrow-components-builder` за регенерацией скилла из Figma.

**Figma:** [💠 arrow ↪ components → page-title, node 1050:139853](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=1050-139853)

## Состав

| Часть | Компонент | Классы |
|---|---|---|
| крошки (сверху, необязательны) | [awds-component-breadcrumbs](../awds-component-breadcrumbs/SKILL.md) | `nav.crumbs` целиком по его скиллу |
| заголовок страницы (снизу) | [awds-component-heading](../awds-component-heading/SKILL.md) | `.heading.heading--h1` + `<h1 class="heading__title">` |

**Не верстать части заново.** На страницу подключаются `focus-selection.css`,
`button-area.css`, `breadcrumbs.css`, `heading.css` и затем `page-title.css`, который
добавляет только колонку и зазор.

## Разметка

```html
<div class="ptitle">
  <nav class="crumbs" aria-label="Хлебные крошки">
    <ol class="crumbs__list">
      <li class="crumbs__item"><a class="btn-area btn-area-muted btn-area--100" href="/"><span class="btn-area__label">Главная</span></a></li>
      <li class="crumbs__sep" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false"><path d="M6.97958 5.76055C7.17476 5.56543 7.49134 5.56557 7.68661 5.76055L9.57235 7.6463C9.76759 7.84154 9.76756 8.15806 9.57235 8.35333L7.68661 10.2391C7.49134 10.4343 7.17481 10.4343 6.97958 10.2391C6.78447 10.0438 6.78443 9.72726 6.97958 9.53204L8.5118 7.99981L6.97958 6.46758C6.78458 6.2723 6.7844 5.95573 6.97958 5.76055Z" fill="currentColor"/></svg></li>
      <li class="crumbs__item"><span class="crumbs__current" aria-current="page">Рубрика</span></li>
    </ol>
  </nav>
  <div class="heading heading--h1">
    <h1 class="heading__title">Рубрика</h1>
  </div>
</div>
```

- **Заголовок — `<h1>`.** Это заголовок страницы, а не секции: тег `h1` здесь
  обязателен, а не выбирается по структуре, как у самостоятельного `heading`. На
  странице `ptitle` один.
- **Корень — `<div>`.** `<header>` допустим, только когда компонент стоит внутри
  `<main>` или `<article>`: вне них `<header>` становится ориентиром `banner` и
  спорит с шапкой сайта.
- **Крошки необязательны.** В макете у компонента булево свойство показа крошек. Без
  крошек `ptitle` — колонка из одного заголовка, зазор не появляется (`gap` между
  одним ребёнком не рисуется).
- **Действия «Все» у заголовка нет.** В инстансе макета оно скрыто: у заголовка
  страницы нет раздела «выше», куда вела бы ссылка.

## Почему h1 — класс, а не мост

Уровень задаётся классом `.heading--h1` в разметке, а не правилом `.ptitle .heading`,
которое кормило бы аккумуляторы заголовка. Мост, как у `formfield`, нужен, когда
ступень у частей **одна на всех** и выбирает её потребитель: `.fld--400` раздаёт
ступень подписи и контролу разом. Здесь ступени нет — уровень у заголовка страницы
всегда h1, и у `heading` для этого уже есть публичный класс. Мост писал бы в приватные
`--awds-heading-*` чужого компонента: переименование аккумулятора в `heading` молча
выключило бы его, а гейты этого не видят. Цена — `.heading--h1` нужно не забыть;
её держит контракт `markup` (`component-markup-check`).

## Откуда берутся значения

| Что | Макет | Токен |
|---|---|---|
| Зазор крошки ↔ заголовок | `space/3` = 12 | `var(--awds-space-3)` — фикс, одно определение в теме |
| Раскладка | flex-col, оба ребёнка Fill | `flex-direction: column; align-items: stretch` |
| Крошки: 13/16/0.1, `link/muted-rest`, шеврон 16 | — | `awds-component-breadcrumbs` |
| Заголовок: 34/34/−0.3, semibold, `surface/on-highest` | роли `h1` (desktop, мод medium) | `awds-component-heading`, роли WYSIWYG h1 |

Кегль заголовка растёт по брейкпоинту и масштабу `.typo-*` внутри роли h1 — компонент
это не трогает. Зазор `space-3` от ширины окна не зависит.

## CSS-файл

| Файл | Что внутри |
|---|---|
| `references/page-title.css` | `.ptitle`: колонка, растяжение частей, зазор `space-3` |

## Storybook

[references/preview.html](references/preview.html) (`file://`) — эталон из макета,
длинный заголовок в узкой колонке, вариант без крошек, тёмная тема, самопроверка
числами (зазор 12, h1 34/34 на десктопе).

## Refresh

```
обнови awds-component-page-title под Figma
```

## Соседние компоненты

- **[awds-component-heading](../awds-component-heading/SKILL.md)** — заголовок секции
  без крошек; уровень любой, действие «Все» есть.
- **[awds-component-breadcrumbs](../awds-component-breadcrumbs/SKILL.md)** — крошки
  сами по себе, без заголовка.
