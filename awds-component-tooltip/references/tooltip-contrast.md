# Tooltip — Contrast (тёмный)

Контрастный вариант подсказки: тёмный пузырь, тень `elevation-3`. Для максимально заметных подсказок.

Тёмный вид даёт **островок темы внутри класса**, а не инвертированная пара ролей: `.tooltip-contrast` берёт те же роли, что `default`, но в dark-значении (`--surface-bright-dark`, `--surface-on-highest-dark`), а ячейки `tooltip/contrast/*` ведут на роли по назначению — фон на поверхность, текст на контент. Поэтому подсказка остаётся тёмной и в тёмной теме, а не переворачивается вместе с ней. Дополнительный класс в разметке не нужен.

**Figma:** https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=598-630 (набор `tooltip / contrast`)

## HTML

```html
<span class="tooltip tooltip-contrast tooltip--400 tooltip--side-bottom" role="tooltip" id="tip-status">
  <span class="tooltip__tail"></span>
  <span class="tooltip__bubble">Текст подсказки</span>
</span>
```

Сторона: `tooltip--side-top` / `--side-bottom` / `--side-left` / `--side-right`. Ступень: `tooltip--400` (база) или `tooltip--300` (компактная).

## Стили

| Свойство | Значение |
|---|---|
| Фон пузыря / хвоста | `rgb(var(--surface-bright-dark))` = `#262626` |
| Цвет текста | `rgb(var(--surface-on-highest-dark))` = `#f5f5f5` |
| Тень | `var(--awds-shadow-elevation-3)` |
| Хайрлайн хвоста | погашен: `rgb(var(--extended-transparent))` — на тёмном пузыре кольцо чёрного 3% не читается, в макете вектора обводки нет |
| Padding / текст / скругление | как в `default` (различаются по ступени `size`, не по тону) |

## Состояния

Нет (статичный). Показ/скрытие и позиционирование — на стороне потребителя.
