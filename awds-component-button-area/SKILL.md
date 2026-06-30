---
name: awds-component-button-area
description: >
  Верстка «Button Area» ArrowDS — кликабельной ОБЛАСТИ-обёртки (link-area): текст ±
  иконки префикс/суффикс, центрированный контент, растяжимая под контейнер область
  нажатия. Используй ВСЕГДА при: добавлении кликабельной ссылки-области/кнопки-ссылки,
  где нужна увеличенная зона клика (растянуть по ширине/высоте), ссылке с иконкой
  слева/справа, only-icon кликабельной области, состоянии загрузки на ссылке-кнопке,
  выборе варианта default/muted/contrast/accent/heading, вопросах про .btn-area /
  .btn-area--fill / .btn-area__label / hit-area. Это link как полноценная область
  клика (с размерами, состояниями, progress, fill). Для inline-ссылки в тексте —
  awds-component-link; для настоящей кнопки с фоном — awds-component-button.
---

# Button Area (кликабельная область) ArrowDS

Ссылка/кнопка как **область нажатия**: опц. иконка-префикс + текст + опц. иконка-суффикс, контент центрирован. Главное — **hit-область растягивается** под контейнер (модификаторы `--fill*`), а контент остаётся по центру. Куда поместишь — такую зону клика и получишь.

## Когда что

| Нужно | Компонент |
|---|---|
| Кликабельная **область** (увеличенная зона клика, растягивается, ± иконки, состояния, загрузка) | **`awds-component-button-area`** (этот) |
| Inline-ссылка внутри текста (подчёркивание, наследует кегль) | `awds-component-link` |
| Кнопка с фоном/заливкой (primary/secondary…) | `awds-component-button` |

## Структура

```html
<!-- Текст + иконки префикс/суффикс -->
<a class="btn-area btn-area-default btn-area--500" href="/somewhere">
  <span class="btn-area__prefix"><svg viewBox="0 0 20 20" aria-hidden="true">…</svg></span>
  <span class="btn-area__label">Подробнее</span>
  <span class="btn-area__suffix"><svg viewBox="0 0 20 20" aria-hidden="true">…</svg></span>
</a>

<!-- Только иконка (Type=Icon) -->
<button class="btn-area btn-area-accent btn-area--400 btn-area--icon-only" aria-label="Закрыть">
  <span class="btn-area__icon"><svg viewBox="0 0 20 20" aria-hidden="true">…</svg></span>
</button>

<!-- Растянут по ширине + загрузка -->
<a class="btn-area btn-area-default btn-area--500 btn-area--fill-x btn-area--progress" href="#">
  <span class="btn-area__label">Загрузка…</span>
  <span class="btn-area__spinner" aria-hidden="true"></span>
</a>
```

- Тег — `<a>` (ссылка) или `<button>` (действие). Префикс/суффикс/icon — опциональны.
- Disabled: `disabled` (на `<button>`), `aria-disabled="true"` или класс `.btn-area--disabled`.

## Оси

- **Вариант** (цвет, = роли `awds-component-link`): `.btn-area-{default|muted|contrast|accent|heading}`.
- **Размер** `.btn-area--{500|400|100|50}` — текст/иконка/зазор через shape-слой `rectangle/{N}`.
- **Тип** — текст (с иконками) или `.btn-area--icon-only` (только иконка).
- **Растяжение** — `.btn-area--fill` (обе оси), `--fill-x` (ширина), `--fill-y` (высота). Контент центрирован.
- **Загрузка** — `.btn-area--progress`: контент скрыт (место сохраняется), по центру спиннер, клики гасятся.
- **Состояния** — `:hover` (цвет → hover-роль), `:focus-visible` (обводка), `:active`, disabled (opacity 40%).

## Откуда значения

| Что | Источник |
|---|---|
| Цвет варианта | роли `awds-component-link` (rest → hover): default `tertiary-container-on-high→-highest`, muted `surface-on-high→-on-highest`, contrast `surface-on-highest→-on-high`, accent `surface-on-highest→accent-container-on`, heading `surface-on-high→accent-container-on` |
| Размер (текст/иконка/зазор/радиус) | shape-слой `var(--awds-rectangle-{N}-{typography-*,icon,gap,rounded})` |
| Focus-обводка | `rgb(var(--surface-on-highest))` |
| Disabled | `opacity: var(--awds-opacity-40)` + `pointer-events: none` |
| Спиннер | `var(--awds-rounded-full)` + `@keyframes` (прерываемая анимация — для загрузки корректно) |
| Растяжение | `width/height: 100%` + `align-self: stretch`, контент по центру (`justify-content/align-items: center`) |

## CSS

Один файл — `references/button-area.css` (база `.btn-area` + размеры + 5 вариантов + состояния + progress + fill). Подключается один раз глобально.

Визуальный QA — `references/preview.html` (storybook, `file://`): матрица вариант×размер, переключатели тип / растяжение / загрузка / состояния.

## Заметки

- **Растяжимая hit-область — суть компонента.** Сам `.btn-area` по умолчанию hug по контенту (`inline-flex`); под `--fill*` тянется под контейнер, контент центрируется. Это то, ради чего он отдельный от `link`.
- **Без подчёркивания** (в отличие от inline-`link`) — это область/кнопка, а не текстовая ссылка.
- Цвета держатся в синхроне с `awds-component-link` (те же роли). Изменение link-ролей в DS → обновить оба (refresh через `arrow-components-builder`).
