---
name: awds-component-heading
description: >
  Верстка заголовка секции (Heading + Button) ArrowDS — HTML-разметка и CSS на токенах
  дизайн-системы. Используй ВСЕГДА при: добавлении заголовка секции/блока с уровнем
  H1–H5, заголовка с опциональной ссылкой-действием «Все ›» справа, выборе размера
  заголовка, вопросах о стилях heading / heading__title / heading__action, адаптиве
  заголовка по брейкпоинту (Desktop/Tablet/Mobile), получении Figma-ссылки на компонент
  Heading. 5 уровней, адаптивная типографика, опциональное действие, статичный.
---

# Heading (заголовок секции + действие) ArrowDS

Заголовок секции `H1–H5` с опциональной ссылкой-действием («Все ›») справа. Статичный (без состояний). Размер и раскладка адаптивны по брейкпоинту.

## Когда использовать

- Заголовок секции/блока маркета (витрина, подборка, рубрика) — с уровнем H1–H5.
- Заголовок + ссылка «Все / Смотреть все / Перейти» справа.
- Любой смысловой заголовок поверх DS-типографики, который должен сам адаптироваться по ширине экрана.

## Структура

```html
<!-- Заголовок + действие «Все ›» -->
<div class="heading heading--h1">
  <h2 class="heading__title">Heading</h2>
  <a class="btn-area btn-area-default btn-area--100 btn-area--fill-y heading__action" href="/all">
    <span class="btn-area__label">Все</span>
    <span class="btn-area__suffix"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 4l4 4-4 4"/></svg></span>
  </a>
</div>

<!-- Только заголовок (без действия) -->
<div class="heading heading--h3">
  <h3 class="heading__title">Heading</h3>
</div>
```

- **Семантика vs визуал.** Тег (`<h1>…<h6>`) выбирай по структуре документа; визуальный размер задаёт класс `.heading--h{N}` — они независимы (можно `<h2 class="heading__title">` в карточке `.heading--h1`).
- **Действие** «Все ›» — опционально, это композиция **`awds-component-button-area`** (`.btn-area.btn-area-default.btn-area--100.btn-area--fill-y`) — подключи `button-area.css`. В Figma действие heading-а и есть инстанс Button Area/Default. Цвет/размер (control-300 13/16)/состояния/суффикс-шеврон/полную высоту (`--fill-y`) держит сам button-area; heading лишь раскладывает его по View. Класс `.heading__action` — опц. хук (без собственных стилей).

## Уровни (размер) и адаптив

Размер заголовка — адаптивные примитивы typography: один класс `.heading--h{N}` даёт три размера View автоматически (примитив растёт по `@media`).

| Класс | Mobile → Tablet → Desktop (fs/lh) |
|---|---|
| `.heading--h1` | 22/26 → 24/29 → **28/34** |
| `.heading--h2` | 20/24 → 20/26 → **24/29** |
| `.heading--h3` | **19/24** (фикс на всех View) |
| `.heading--h4` | **18/22** (фикс) |
| `.heading--h5` | **16/19** (фикс) |

**Раскладка действия по View** (зашита через `@media`):
- **Desktop ≥1068** — «Все ›» вплотную к заголовку (gap 6px, по нижней линии).
- **Tablet 616–1067 / Mobile <616** — «Все ›» прижата к правому краю (`space-between`).

## Откуда берутся значения

| Что | Источник |
|---|---|
| Размер заголовка | адаптивный примитив `var(--awds-typography-font-size-{920\|910\|900\|800\|600})` + `-line-height-compact-{N}` + `-letter-spacing-{N}` |
| Цвет заголовка | `rgb(var(--surface-on-highest))` |
| Вес | `var(--awds-font-weight-semibold)` |
| Действие «Все ›» | внешний `awds-component-button-area` (`.btn-area-default` `.btn-area--100` `.btn-area--fill-y`) — он держит цвет (tertiary-container-on-high → hover -on-highest), размер (control-300 13/16), состояния, суффикс-шеврон, полную высоту |
| Зазор заголовок ↔ действие (desktop) | `var(--awds-space-1-5)` (6px) |
| Зазор текст ↔ шеврон | `var(--awds-space-0-5)` (2px); иконка `var(--awds-space-4)` (16px) |
| Перенос заголовка | `text-wrap: balance` (MIFB — без сирот) |

## CSS

Один файл — `references/heading.css` (база `.heading` + `.heading__title` + уровни `.heading--h{1..5}` + раскладка по View через `@media`). Подключается один раз глобально. Для действия дополнительно нужен `button-area.css` (компонент `awds-component-button-area`).

Визуальный QA — `references/preview.html` (storybook, `file://`): все уровни, переключатели Действие / View / тема (View меняет ширину iframe → срабатывает `@media`).

## Композиция

| Компонент | Зачем |
|---|---|
| `awds-component-button-area` (`.btn-area-default` `--100` `--fill-y`) | Действие «Все ›» целиком (цвет/размер/состояния/шеврон/полная высота). В Figma — инстанс Button Area/Default. Heading лишь раскладывает по View. |

## Заметки

- **Вертикальный отступ над заголовком** (в Figma — `pt: wysiwyg/gap/h{N}`) в компонент НЕ заложен: это flow-ритм контекста, его задаёт потребитель (например, `gap` контейнера секции).
- Компонент `shape: null` — размер идёт напрямую через шкалу typography, без shape-токенов (как `awds-component-price`).
