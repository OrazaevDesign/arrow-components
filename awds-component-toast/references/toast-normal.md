# Toast — Normal (тёмная плашка)

Обычное сообщение о результате: удалили, сохранили, добавили. Фон и текст — островок темы: ячейки `toast/normal/*` ведут на `surface/bright` и `surface/on-highest`, а тёмный вид даёт сам компонент, читая те же роли в dark-значении. Поэтому плашка остаётся тёмной и в тёмной теме.

**Figma:** https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=617-48419 (набор `toast / normal`)

## HTML

```html
<div class="toast toast-normal" role="status">
  <div class="toast__content">
    <span class="toast__icon"><svg viewBox="0 0 20 20" aria-hidden="true"><!-- иконка --></svg></span>
    <span class="toast__text">Товар удалён</span>
  </div>
  <button class="toast__action" type="button">Отменить</button>
  <button class="toast__close" type="button" aria-label="Закрыть">
    <svg viewBox="0 0 20 20" aria-hidden="true"><!-- крестик --></svg>
  </button>
</div>
```

Без кнопок — только контент; правый отступ вернётся сам:

```html
<div class="toast toast-normal" role="status">
  <div class="toast__content">
    <span class="toast__icon"><svg viewBox="0 0 20 20" aria-hidden="true"></svg></span>
    <span class="toast__text">Сохранено</span>
  </div>
</div>
```

## Стили

| Свойство | Значение |
|---|---|
| Фон | `rgb(var(--surface-bright-dark))` — ячейка `toast/normal/bg` |
| Текст, иконка, кольцо | `rgb(var(--surface-on-highest-dark))` — ячейка `toast/normal/color` |
| Тень | `var(--awds-shadow-elevation-3)` |
| Скругление | `var(--awds-rounded-border-radius-400)` (8) |
| Подложка контрола при наведении | тот же цвет под `var(--awds-opacity-20)` |

## Состояния

У плашки нет. У кнопки и крестика — наведение (подложка) и фокус с клавиатуры (кольцо цветом контента).
