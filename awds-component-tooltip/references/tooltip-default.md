# Tooltip — Default (светлый)

Светлый вариант подсказки: фон `surface-bright` (белый), текст `surface-on-high` (приглушённый), тень `elevation-3`. Для подсказок на тёмном/контентном фоне или нейтральном UI.

**Figma:** https://www.figma.com/design/XfUbnX6GFLFZ6nInMOlyQD/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B6-Popup?node-id=4001-27067

## HTML

```html
<span class="tooltip tooltip-default tooltip--top">
  <span class="tooltip__tail"></span>
  <span class="tooltip__bubble">Текст подсказки</span>
</span>
```

Сторона: `tooltip--top` / `--bottom` / `--left` / `--right`. Компактный размер: добавь `tooltip--compact`.

```html
<span class="tooltip tooltip-default tooltip--compact tooltip--left">
  <span class="tooltip__tail"></span>
  <span class="tooltip__bubble">Инфо</span>
</span>
```

## Стили

| Свойство | Значение |
|---|---|
| Фон пузыря / хвоста | `rgb(var(--surface-bright))` |
| Цвет текста | `rgb(var(--surface-on-high))` |
| Тень | `var(--awds-shadow-elevation-3)` |
| Padding (Default / Compact) | `space-2-5`/`-2` · `space-1-5`/`-1` |
| Текст (Default / Compact) | `typography-400` (14) · `typography-300` (13) |
| Скругление | `rounded-400` (8) · `rounded-300` (6, compact) |

## Состояния

Нет (статичный). Показ/скрытие и позиционирование — на стороне потребителя.
