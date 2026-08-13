# Input / Secondary

**Figma:** [4ipeXkifl3Hl6pVZUF4nuJ → node 322:49551](https://www.figma.com/design/4ipeXkifl3Hl6pVZUF4nuJ/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B5-Forms?node-id=322-49551)

> [!NOTE]
> Этот файл (`input-secondary.md`) — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`input-secondary.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## Когда

Второстепенное поле, которое не должно спорить с основными: фильтр, поиск внутри панели, служебный ввод.

Рамка здесь **в цвет фона** — поле читается как мягкая плашка, а не как обведённый контрол.

## Чем отличается

**Два отличия от всех остальных вариантов, оба неочевидны и оба сверены по ячейкам:**

1. **Hover меняет фон, а не рамку.** У остальных вариантов наведение затемняет рамку; здесь рамка в цвет фона, затемнять отдельно нечего — на hover уезжают и фон, и рамка (`secondary-dim`).
2. **Кольцо фокуса тёмное.** В ячейке Focus стоит `focus-selection/outline` (= `surface-on-highest`), без `opacity/50` — то есть как у button / checkbox / radio / switch, а **не** брендовое при 50%, как у остальных шести вариантов Input.

Плюс при фокусе текст и placeholder **не** перекрашиваются в брендовые — тоже в отличие от остальных.

Всё остальное — структура, слоты, семь размеров, геометрия, типографика, доступность, нативный крестик у `type="search"`, кнопка в слоте — совпадает с Default до значения и описано в [input-default.md](input-default.md).

## HTML

```html
<span class="input input-secondary input--400">
  <input class="input__field" type="text" placeholder="Значение">
</span>
```

Меняется только класс варианта.

## Состояния

| Состояние | Селектор |
|---|---|
| Rest | `.input-secondary` |
| Hover | `.input-secondary:hover:not(:focus-within):has(> .input__field:enabled)` |
| Active | `.input-secondary:active:not(:focus-within):has(> .input__field:enabled)` |
| Focus | `.input-secondary:focus-within` |
| Disabled | `.input:has(> .input__field:disabled)` — на базе, общее для вариантов |

Про `:not(:focus-within)` в hover / active — см. [input-default.md → Состояния](input-default.md#состояния): порядок правил там не работает, потому что `:has()` поднимает специфичность выше фокуса.

## CSS

`input-secondary.css` — файл **самодостаточный**: та же база `.input`, что и у остальных вариантов (побайтово), плюс блок `.input-secondary`. Подключается только нужный вариант.

## Refresh

```
обнови awds-component-input под Figma
```

→ ACB обновит все варианты разом (общий `component.meta.json`). Этот markdown остаётся как есть.
