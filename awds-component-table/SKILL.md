---
name: awds-component-table
description: Верстка таблиц ArrowDS — HTML-разметка и CSS на токенах дизайн-системы. Используй ВСЕГДА при: добавлении таблицы или ячейки в разметку или PageCraft-блок, выборе варианта ячейки (cell-light / cell-head / cell-default), вопросах о стилях табличных ячеек, получении Figma-ссылки на компонент Cell/Table.
---

# Таблица ArrowDS (`awds-component-table`)

HTML-разметка и CSS таблицы дизайн-системы ArrowDS. Компонент состоит из **обёртки-таблицы** (`.awds-table`) и **ячеек** трёх вариантов. Цвета инлайнятся ролями `rgb(var(--surface-*))` напрямую, типографика и отступы — базовые шкалы `--awds-*`. Никакого хардкода.

Сгенерирован через `arrow-components-builder` из Figma. **Не правь `references/*.css` и `preview.html` руками** — затрётся при следующем refresh. Правки — через Figma → «обнови awds-component-table».

## Когда использовать

- Нужна таблица данных на странице / в PageCraft-блоке.
- Нужна отдельная ячейка с правильным фоном/границей/типографикой DS.
- Пришла Figma-ссылка на компонент Cell или Table.

## Структура

| Класс | Что это |
|---|---|
| `.awds-table` | Обёртка `<table>`: `border-collapse`, `width: 100%`. Общая база двух раскладок. |
| `.awds-table--default` | **Сетка** (Figma Var=Default): полные границы у всех ячеек, залитая шапка. |
| `.awds-table--light` | **Безрамочная** (Figma Var=Light): только горизонтальные разделители строк, прозрачные ячейки, первый столбец flush-влево. |
| `.awds-table-scroll` | Враппер `<div>` для горизонтального скролла широкой таблицы (`overflow-x:auto`) — замена декоративного скроллбара из макета. |
| `.cell` | Базовый класс ячейки (`<th>` / `<td>`): padding, типографика, фокус, transition, `min-width` 80px в таблице. |
| `.cell-light` | Ячейка-«призрак»: прозрачная, фон/граница появляются только на hover. |
| `.cell-head` | Заголовочная: заполнена `surface-surface` + граница, **semibold**, на hover темнеет до `surface-dim`. |
| `.cell-default` | Тельная: фон `surface-bright` (белый) + граница, на hover опускается до `surface-surface`. |
| `.cell__description` | Вторичная строка под основным текстом (цвет `description`). |
| `.cell--numeric` | Числовая ячейка: выравнивание вправо + `tabular-nums`. |

Раскладки соответствуют двум вариантам Figma-ноды таблицы `2038:1350` (`Var=Light` / `Var=Default`).

Файлы: [table.css](references/table.css) (обёртка + база), [cell-light.css](references/cell-light.css), [cell-head.css](references/cell-head.css), [cell-default.css](references/cell-default.css). Подробности разметки и состояний — [cell.md](references/cell.md). Визуальная QA — [preview.html](references/preview.html).

## Базовая разметка

**Сетка (default):**

```html
<div class="awds-table-scroll">
  <table class="awds-table awds-table--default">
    <thead>
      <tr>
        <th class="cell cell-head" scope="col">Имя</th>
        <th class="cell cell-head cell--numeric" scope="col">Сумма</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="cell cell-default">Иван Иванов</td>
        <td class="cell cell-default cell--numeric">1 240,00 ₽</td>
      </tr>
    </tbody>
  </table>
</div>
```

**Безрамочная (light):** замени модификатор на `awds-table--light`, ячейки — `cell cell-light` (разделители строк рисует сама раскладка).

Подключение CSS: всегда нужен `table.css` (база + раскладки) + файл(ы) используемых вариантов ячеек. `.awds-table-scroll` опционален — для таблиц шире контейнера.

## Варианты ячеек

| Вариант | Rest | Hover | Применение |
|---|---|---|---|
| `cell-light` | прозрачный | `surface-surface` + граница | Лёгкие списки, ячейки без визуального «веса». |
| `cell-head` | `surface-surface` + граница | `surface-dim` | Заголовки колонок `<th>`. |
| `cell-default` | `surface-bright` + граница | `surface-surface` | Тело таблицы `<td>`. |

Цвет текста (`surface-on-highest`) и описания (`surface-on-high`) одинаковы во всех вариантах и состояниях. Focus — чёрная обводка `surface-on-highest` (inset). Disabled — `opacity: 40%` через `aria-disabled="true"`.

## Размеры

У ячейки **нет размерной шкалы** (`shape: null`): единственная фиксированная геометрия — padding `--awds-space-3` (12px), типографика `--awds-typography-*-400` (14/22px). Размерных классов `.cell--{N}` нет.

## Заметка по cell-default

Отдельный фрейм **`cell-default`** (`2027:433`) в Figma мис-привязан к token-набору `cell/light` (прозрачный rest). Но нода **таблицы** (`2038:1350`, `Var=Default`) использует реальный токен `cell/default` = `#ffffff` / border `#ededed` — что совпадает с DS-картой (`surface-bright` / `surface-on-lowest`). Скилл следует токену, а не мис-привязанному фрейму: `.cell-default` — белая ячейка с границей. Это уже подтверждено таблицей, спец-действий не требует.

## Источники значений

- **Цвета:** `rgb(var(--surface-*))` — `map.state.*.cell.*`, реальная палитра из `css-variables.css` сайта.
- **Отступы / типографика:** `--awds-space-3`, `--awds-typography-*-400` — базовые шкалы css-global.
- **Фокус:** `rgb(var(--surface-on-highest))`; **disabled:** `var(--awds-opacity-40)`.
- **Шрифт:** `--awds-font-family-system`, `--awds-font-weight-regular`.
