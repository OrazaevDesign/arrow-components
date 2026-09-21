# Tooltip — Default (светлый)

Светлый вариант подсказки: фон `surface-bright` (белый), текст `surface-on-high` (приглушённый), тень `elevation-3`. Для подсказок на тёмном/контентном фоне или нейтральном UI.

**Figma:** https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=598-629 (набор `tooltip / default`)

## HTML

```html
<span class="tooltip tooltip-default tooltip--400 tooltip--side-top">
  <span class="tooltip__tail"></span>
  <span class="tooltip__bubble">Текст подсказки</span>
</span>
```

Сторона: `tooltip--side-top` / `--side-bottom` / `--side-left` / `--side-right`. Ступень: `tooltip--400` (база) или `tooltip--300` (компактная).

```html
<span class="tooltip tooltip-default tooltip--300 tooltip--side-left">
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
| Padding (400 / 300) | `space-2-5`/`-2` · `space-1-5`/`-1` |
| Текст (400 / 300) | `control-400` (14/20) · `control-300` (13/16) |
| Скругление (400 / 300) | `rounded-400` (8) · `rounded-300` (6) |

## Состояния

Нет (статичный). Показ/скрытие и позиционирование — на стороне потребителя.
