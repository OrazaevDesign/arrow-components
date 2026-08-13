# Input / Error

**Figma:** [4ipeXkifl3Hl6pVZUF4nuJ → node 322:32999](https://www.figma.com/design/4ipeXkifl3Hl6pVZUF4nuJ/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B5-Forms?node-id=322-32999)

> [!NOTE]
> Этот файл (`input-error.md`) — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`input-error.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## Когда

Поле не прошло валидацию.

**Error — это состояние валидации.** Цвет ошибку не объясняет, поэтому обязательны три вещи, и все они на стороне потребителя:

```html
<label for="email">Электронная почта</label>
<span class="input input-error input--400">
  <input class="input__field" id="email" type="email"
         aria-invalid="true" aria-describedby="email-err" value="ivan@">
</span>
<p id="email-err">Не хватает домена — например, ivan@example.com</p>
```

- `aria-invalid="true"` — скринридер объявит поле ошибочным;
- `aria-describedby` на текст причины — иначе пользователь слышит «ошибка» без объяснения;
- сам текст причины: что не так и как починить, а не «неверный формат».

## Чем отличается

При фокусе красная подсветка **полностью уступает брендовой**. То есть пока пользователь правит поле, ошибка визуально снимается — а `aria-invalid` остаётся, пока приложение не перепроверит значение.

Всё остальное — структура, слоты, семь размеров, геометрия, типографика, доступность, нативный крестик у `type="search"`, кнопка в слоте — совпадает с Default до значения и описано в [input-default.md](input-default.md).

## HTML

```html
<span class="input input-error input--400">
  <input class="input__field" type="text" placeholder="Значение">
</span>
```

Меняется только класс варианта.

## Состояния

| Состояние | Селектор |
|---|---|
| Rest | `.input-error` |
| Hover | `.input-error:hover:not(:focus-within):has(> .input__field:enabled)` |
| Active | `.input-error:active:not(:focus-within):has(> .input__field:enabled)` |
| Focus | `.input-error:focus-within` |
| Disabled | `.input:has(> .input__field:disabled)` — на базе, общее для вариантов |

Про `:not(:focus-within)` в hover / active — см. [input-default.md → Состояния](input-default.md#состояния): порядок правил там не работает, потому что `:has()` поднимает специфичность выше фокуса.

## CSS

`input-error.css` — файл **самодостаточный**: та же база `.input`, что и у остальных вариантов (побайтово), плюс блок `.input-error`. Подключается только нужный вариант.

## Refresh

```
обнови awds-component-input под Figma
```

→ ACB обновит все варианты разом (общий `component.meta.json`). Этот markdown остаётся как есть.
