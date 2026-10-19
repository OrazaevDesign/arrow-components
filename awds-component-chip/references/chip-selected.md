# Chip / Selected

**Figma:** [chip / selected](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=1109-50780) — набор `1109:50780` секции «↪ chip» (`5:30`).

Включённый или применённый фильтр: заливка `primary-core`, текст `primary-on`. На hover
фон темнеет до `primary-dim`, обводка и текст не меняются.

**CSS:** `references/chip.css`.

## HTML

Переключатель во включённом положении:

```html
<button type="button" class="chip chip-selected chip--400" aria-pressed="true">
  В наличии
</button>
```

Применённый фильтр с крестиком: весь чипс — кнопка «убрать». Отдельной цели у
крестика нет, потому что кнопку внутри кнопки разметка не допускает.

```html
<button type="button" class="chip chip-selected chip--400" aria-label="Убрать фильтр: Красный">
  Красный
  <svg class="chip__remove" viewBox="0 0 24 24" aria-hidden="true"><!-- system-close --></svg>
</button>
```

## Состояния

| Состояние | bg | border | color | Ячейка |
| --- | --- | --- | --- | --- |
| rest | `primary-core` | `primary-core` | `primary-on` | `chip/selected/bg-rest`, `border`, `color` |
| hover | `primary-dim` | `primary-core` | `primary-on` | `chip/selected/bg-hover` |
| focus | как rest + кольцо `--awds-focus-*` | | | своих ячеек нет |
| active | как rest | | | своих ячеек нет |
| disabled | как rest, `opacity/control/disabled` | | | |

Крестик (`.chip__remove`) — `primary-on-dim` во всех состояниях.
