# Input Combi / Secondary

**Figma:** [4ipeXkifl3Hl6pVZUF4nuJ → node 322:85319](https://www.figma.com/design/4ipeXkifl3Hl6pVZUF4nuJ/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B5-Forms?node-id=322-85319)

> [!NOTE]
> Этот файл (`input-combi-secondary.md`) — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`input-combi-secondary.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## Когда

Второстепенное поле, которое не должно спорить с основными: фильтр, поиск внутри панели, служебный ввод.

Рамка здесь **в цвет фона** — поле читается как мягкая плашка, а не как обведённый контрол.

## Чем отличается

**Три отличия от остальных вариантов, все неочевидные и все сверенные по ячейкам:**

1. **Hover меняет фон, а не рамку.** У остальных вариантов наведение затемняет рамку; здесь рамка в цвет фона, затемнять отдельно нечего — на hover уезжают и фон, и рамка (`secondary-dim`).
2. **Кольцо фокуса тёмное.** В ячейке Focus стоит `focus-selection/outline` (= `surface-on-highest`), без `opacity/50` — то есть как у button / checkbox / radio / switch, а **не** брендовое при 50%, как у остальных шести вариантов.
3. **Текст и метка при фокусе не перекрашиваются** в брендовые — тоже в отличие от остальных.

Всё остальное — разметка с обёрткой `__body`, обязательный `placeholder=" "`, плавающая метка, четыре размера, геометрия, типографика, доступность — совпадает с Default до значения и описано в [input-combi-default.md](input-combi-default.md).

## HTML

```html
<span class="icombi icombi-secondary icombi--400">
  <span class="icombi__body">
    <input class="icombi__field" id="f" type="text" placeholder=" ">
    <label class="icombi__label" for="f">Подпись</label>
  </span>
</span>
```

Меняется только класс варианта.

## Состояния

| Состояние | Селектор |
|---|---|
| Rest | `.icombi-secondary` |
| Hover | `.icombi-secondary:hover:not(:focus-within):has(.icombi__field:enabled)` |
| Active | `.icombi-secondary:active:not(:focus-within):has(.icombi__field:enabled)` |
| Focus | `.icombi-secondary:focus-within` |
| Метка наверху | `.icombi:focus-within .icombi__label`, `.icombi__field:not(:placeholder-shown) + .icombi__label` |
| Disabled | `.icombi:has(.icombi__field:disabled)` — на базе, общее для вариантов |

Про `:not(:focus-within)` в hover / active — см. [input-combi-default.md → Состояния](input-combi-default.md#состояния): порядок правил там не работает, потому что `:has()` поднимает специфичность выше фокуса.

## CSS

`input-combi-secondary.css` — файл **самодостаточный**: та же база `.icombi`, что и у остальных вариантов (побайтово), плюс блок `.icombi-secondary`. Подключается только нужный вариант.

## Refresh

```
обнови awds-component-input-combi под Figma
```

→ ACB обновит все варианты разом (общий `component.meta.json`). Этот markdown остаётся как есть.
