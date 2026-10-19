# Chip / Unselected

**Figma:** [chip / unselected](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=1109-4149) — набор `1109:4149` секции «↪ chip» (`5:30`).

Выключенный фильтр. В покое — серая поверхность контейнера `secondary`, на hover
подсвечивается primary-контейнером и primary-обводкой: так пользователь видит, что
нажатие включит фильтр.

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
| rest | `secondary-container-core` | `secondary-container-dim` | `secondary-container-on-high` | `chip/unselected/*-rest` |
| hover | `primary-container-core` | `primary-core` | `primary-container-on-highest` | `chip/unselected/*-hover` |
| focus | как rest + кольцо `--awds-focus-*` | | | своих ячеек нет |
| active | как rest | | | своих ячеек нет |
| disabled | как rest, `opacity/control/disabled` | | | |

Крестик (`.chip__remove`) — `secondary-container-on` во всех состояниях.

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
