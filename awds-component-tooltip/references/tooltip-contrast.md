# Tooltip — Contrast (тёмный)

Контрастный вариант подсказки: фон `surface-on-highest` (тёмный), текст `surface-bright` (белый), тень `elevation-3`. Для максимально заметных подсказок на светлом фоне.

**Figma:** https://www.figma.com/design/XfUbnX6GFLFZ6nInMOlyQD/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B6-Popup?node-id=4001-27091

## HTML

```html
<span class="tooltip tooltip-contrast tooltip--bottom">
  <span class="tooltip__tail"></span>
  <span class="tooltip__bubble">Текст подсказки</span>
</span>
```

Сторона: `tooltip--top` / `--bottom` / `--left` / `--right`. Компактный размер: добавь `tooltip--compact`.

## Стили

| Свойство | Значение |
|---|---|
| Фон пузыря / хвоста | `rgb(var(--surface-on-highest))` |
| Цвет текста | `rgb(var(--surface-bright))` |
| Тень | `var(--awds-shadow-elevation-3)` |
| Padding / текст / скругление | как в `default` (различаются по Type, не по Variant) |

## Состояния

Нет (статичный). Показ/скрытие и позиционирование — на стороне потребителя.
