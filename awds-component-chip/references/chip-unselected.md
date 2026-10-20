# Chip / Unselected

**Figma:** [chip / unselected](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=1109-4149) — набор `1109:4149` секции «↪ chip» (`5:30`).

Выключенный фильтр. В покое — серая поверхность контейнера `secondary`, на hover
подсвечивается accent-контейнером, текст и крестик — `accent-core`: так пользователь
видит, что нажатие включит фильтр. Нажатие (active) — `accent-container-dim` и `accent-dim`.

**CSS:** `references/chip.css`.

## HTML

```html
<button type="button" class="chip chip-unselected chip--400" aria-pressed="false">
  В наличии
</button>
```

С иконкой слева (слот `prefix`, цвет иконки идёт за цветом текста):

```html
<button type="button" class="chip chip-unselected chip--400" aria-pressed="false">
  <svg viewBox="0 0 24 24" aria-hidden="true"><!-- icon --></svg>
  Со скидкой
</button>
```

## Состояния

| Состояние | bg | border | color | Ячейка |
| --- | --- | --- | --- | --- |
| rest | `secondary-container-core` | `secondary-container-core` (в цвет фона) | `secondary-container-on-high` | `chip/unselected/*-rest` |
| hover | `accent-container-core` | `accent-container-core` (в цвет фона) | `accent-core` | `chip/unselected/*-hover` |
| focus | как rest + кольцо `--awds-focus-*` | | | `chip/unselected/*-focus` |
| active | `accent-container-dim` | `accent-container-dim` (в цвет фона) | `accent-dim` | `chip/unselected/*-active` |
| disabled | как rest, `opacity/control/disabled` | | | |

Крестик (`.chip__remove`, часть `. / suffix` с `show-gap` = off, иконка `system-close_circle-filled`) — `secondary-container-on` (ячейка `icon-remove-rest`), на hover — `accent-core` (`icon-remove-hover`), на active — `accent-dim` (`icon-remove-active`), в цвет текста. В focus — как в rest (`icon-remove-focus`).

## Переключение

```js
chip.addEventListener('click', () => {
  const on = chip.getAttribute('aria-pressed') !== 'true';
  chip.setAttribute('aria-pressed', String(on));
  chip.classList.toggle('chip-selected', on);
  chip.classList.toggle('chip-unselected', !on);
});
```

Класс и `aria-pressed` меняются вместе: класс красит, атрибут сообщает состояние
вспомогательным технологиям.
