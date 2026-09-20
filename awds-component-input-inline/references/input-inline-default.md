# Input Inline — разметка и состояния

**Figma:** [секция ↪ input-inline 34:41032 → набор 34:41077](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=34-41077)

## Минимальная разметка

```html
<input class="iinline iinline-default iinline--400" type="text" placeholder="Введите значение" aria-label="Количество">
```

Класс висит на самом `<input>`. Ширина — `100%`: место в потоке задаёт родитель, 320px в макете это ширина демо-фрейма.

## Состояния

| Состояние | Селектор | Что меняется |
|---|---|---|
| Rest | — | цвет значения `color-rest`, плейсхолдера `placeholder-rest` |
| Hover | `.iinline-{тон}:hover:enabled` | у `default` совпадает с Rest, у `success` и `error` — свой оттенок |
| Focus | `.iinline-{тон}:focus` | цвет уходит в `primary-container-*`, добавляется кольцо `:focus-visible` |
| Active | `.iinline-{тон}:active:not(:focus):enabled` | возвращает Rest-окраску при нажатии — иначе осталась бы hover |
| Disabled | `.iinline:disabled` или `.iinline--disabled` | `opacity: 40%` |

`:focus`, а не `:focus-within`: обёртки нет, состояние держит сам `<input>`. Кольцо при этом рисуется на `:focus-visible` — при клике мышью в поле оно не нужно, там и так виден курсор.

## В таблице

```html
<td class="cell cell-default">
  <input class="iinline iinline-default iinline--300" type="text" value="1 240,00 ₽" aria-label="Цена">
</td>
```

Ступень поля берётся на шаг ниже ступени ячейки: текст в ячейке таблицы идёт кеглем 14/22, поле на `--300` даёт те же 14/20 и не растит строку.

## Чего у компонента нет

Ни слотов `prefix` / `suffix`, ни иконок, ни рамки, ни фона, ни скругления — всё это признаки `awds-component-input`. Нужен хоть один из них — берётся он, а не этот компонент.
