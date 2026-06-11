# Cell — разметка, варианты, состояния

Ячейка таблицы ArrowDS. Базовый класс `.cell` + модификатор варианта (`.cell-light` / `.cell-head` / `.cell-default`). Применяется к `<th>` и `<td>`.

Figma: [Cell — light](https://www.figma.com/design/MzbIinUK3d5C31yhl6TKmB/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B3-Cell?node-id=74-21636) · [head](https://www.figma.com/design/MzbIinUK3d5C31yhl6TKmB/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B3-Cell?node-id=2019-929) · [default](https://www.figma.com/design/MzbIinUK3d5C31yhl6TKmB/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B3-Cell?node-id=2027-433)

## HTML

```html
<!-- Простая ячейка -->
<td class="cell cell-default">List</td>

<!-- Заголовок колонки -->
<th class="cell cell-head" scope="col">Название</th>

<!-- С вторичной строкой-описанием -->
<td class="cell cell-default">
  Иван Иванов
  <span class="cell__description">ivan@example.com</span>
</td>

<!-- Числовая колонка (выравнивание вправо + tabular-nums) -->
<td class="cell cell-default cell--numeric">1 240,00 ₽</td>

<!-- Disabled (на td/th используем aria-disabled, не disabled) -->
<td class="cell cell-default" aria-disabled="true">—</td>
```

## CSS

Подключи `table.css` (база `.cell` + обёртка `.awds-table`) и нужные `cell-*.css`. База потребляет приватные аккумуляторы `--awds-cell-bg / -border / -color / -description`, варианты их заполняют ролями.

## Состояния

| State | Селектор | Как воспроизвести в превью |
|---|---|---|
| Rest | `.cell-{variant}` | — |
| Hover | `.cell-{variant}:hover` | `.is-hover` |
| Focus | `.cell:focus-visible` + `.cell-{variant}:focus-visible` | `.is-focus` |
| Active | `.cell-{variant}:active` | `.is-active` |
| Disabled | `.cell[aria-disabled="true"]` | атрибут `aria-disabled="true"` |

Focus-обводка — `outline: 2px solid rgb(var(--surface-on-highest))` со смещением `-2px` (внутрь, чтобы не перекрывать соседние ячейки в flush-таблице).

## Цвета по вариантам (map.state.*.cell.*)

| | light | head (default-head) | default |
|---|---|---|---|
| **Rest** bg | transparent | `surface-surface` | `surface-bright` |
| **Rest** border | transparent | `surface-on-lowest` | `surface-on-lowest` |
| **Hover** bg | `surface-surface` | `surface-dim` | `surface-surface` |
| **Hover** border | `surface-on-lowest` | `surface-on-lowest` | `surface-on-lowest` |
| color | `surface-on-highest` | `surface-on-highest` | `surface-on-highest` |
| description | `surface-on-high` | `surface-on-high` | `surface-on-high` |

Active = Rest. Focus = Rest + обводка. Disabled = Rest + `opacity: var(--awds-opacity-40)`.

## Раскладки таблицы

Ячейки кладутся в одну из двух раскладок (Figma-нода `2038:1350`):

- `.awds-table--default` — сетка: все ячейки с границей (`border-collapse`), шапка залита. Паддинг равномерный `--awds-space-3`.
- `.awds-table--light` — безрамочная: только `border-bottom` между строками (`surface-on-lowest`), ячейки прозрачные, первый столбец flush-влево (`padding-inline-start: 0`).

Широкую таблицу оборачивай в `.awds-table-scroll` (нативный `overflow-x:auto`).

## Заметки

- **`cell-head` — semibold** (`--awds-font-weight-semibold`), тело (`cell-light`/`cell-default`) — `regular`. Подтверждено нодой таблицы (head = `Inter:Semi_Bold`).
- `cell-default` = белая ячейка (`surface-bright`) с границей. Отдельный фрейм `cell-default` (`2027:433`) мис-привязан к `cell/light`, но реальный токен `cell/default` белый — см. таблицу `2038:1350` и шапку [cell-default.css](cell-default.css).
