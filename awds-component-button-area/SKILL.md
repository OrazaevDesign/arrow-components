---
name: awds-component-button-area
description: Button Area ArrowDS (.btn-area).
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
<a class="btn-area btn-area-default btn-area--500 btn-area--fill-x btn-area--loading" href="#">
  <span class="btn-area__label">Загрузка…</span>
  <svg class="btn-area__progress progress progress-circular progress--indeterminate"
       viewBox="0 0 24 24" aria-hidden="true">
    <circle class="progress-circular__arc" cx="12" cy="12" r="10" pathLength="100"/>
  </svg>
</a>
```

- Тег — `<a>` (ссылка) или `<button>` (действие). Префикс/суффикс/icon — опциональны.
- Disabled: `disabled` (на `<button>`), `aria-disabled="true"` или класс `.btn-area--disabled`.

## Оси

- **Вариант** (цвет, ячейки State группы `link`): `.btn-area-{default|muted|contrast|accent|heading}`.
- **Размер** `.btn-area--{500|400|100|50}` — текст/иконка/зазор через shape-слой `rectangle/{N}`.
- **Тип** — текст (с иконками) или `.btn-area--icon-only` (только иконка).
- **Растяжение** — `.btn-area--fill` (обе оси), `--fill-x` (ширина), `--fill-y` (высота). Контент центрирован.
- **Загрузка** — `.btn-area--loading`: контент погашен (место сохраняется), по центру кольцо
  `awds-component-progress`, клики гасятся. Своего спиннера у области нет: в слоте
  `.btn-area__progress` живёт тот же `<svg>`, что и в макете, — на нём обязаны стоять классы
  `progress progress-circular progress--indeterminate`.
- **Состояния** — `:hover` (цвет → hover-роль), `:focus-visible` (обводка), `:active`, disabled (opacity 40%).

## Откуда значения

| Что | Источник |
|---|---|
| Цвет варианта | ячейки слоя State группы **link** — `rgb(var(--awds-state-link-{variant}-{rest\|hover}))`, те же, что привязаны в макете. Резолвятся: default `tertiary-container-on-high→-highest`, muted `surface-on-high→-on-highest`, contrast `surface-on-highest→-on-high`, accent `surface-on-highest→accent-container-on`, heading `surface-on-high→accent-container-on`. Группа `areabutton` в теме накрывает только default/muted/contrast и с 2.0.0 не читается — источник должен быть один |
| Размер (текст/иконка/зазор/радиус) | shape-слой `var(--awds-rectangle-{N}-{typography-*,icon,gap,rounded})` |
| Кольцо фокуса | слой `awds-component-focus-selection`, вариант **Inside + Default**: кольцо уходит внутрь — область тянется на всю ячейку, снаружи места нет |
| Disabled | `opacity: var(--awds-state-opacity-control-disabled)` + `pointer-events: none` |
| Индикатор загрузки | компонент `awds-component-progress`, вариант circular indeterminate; область задаёт ему только `--awds-progress-size` (своя ступень) и `--awds-progress-color` (свой цвет текста) |
| Растяжение | `width/height: 100%` + `align-self: stretch`, контент по центру (`justify-content/align-items: center`) |

## CSS

Один файл — `references/button-area.css` (база `.btn-area` + размеры + 5 вариантов + состояния + progress + fill). Подключается один раз глобально.

Визуальный QA — `references/preview.html` (storybook, `file://`): матрица вариант×размер, переключатели тип / растяжение / загрузка / состояния.

## Оси макета

`content=text|icon` · `size=500|400|100|50` ·
`state=rest|hover|focus|active|disabled|loading`, плюс булевы слоты `prefix` / `suffix`.

**Загрузка — шестое значение оси `state`, отдельной оси `loading` больше нет** (15.09.2026,
по решению 14.09 — так же у `button` и `button-overhung`). Каждый из пяти наборов сжался
с 80 ячеек до 48: `loading=on` осмысленно только в покое, остальные четыре комбинации
дублировали друг друга. В коде это по-прежнему модификатор `.btn-area--loading`.

Макет приведён к канону 31.08.2026: `type=` стал `content=`, `progress=false|true` —
`loading=off|on`, мёртвая ось `var=heading` из фрейма heading удалена.

## Заметки

- **Растяжимая hit-область — суть компонента.** Сам `.btn-area` по умолчанию hug по контенту (`inline-flex`); под `--fill*` тянется под контейнер, контент центрируется. Это то, ради чего он отдельный от `link`.
- **Без подчёркивания** (в отличие от inline-`link`) — это область/кнопка, а не текстовая ссылка.
- Цвета держатся в синхроне с `awds-component-link` (те же роли). Изменение link-ролей в DS → обновить оба (refresh через `arrow-components-builder`).
