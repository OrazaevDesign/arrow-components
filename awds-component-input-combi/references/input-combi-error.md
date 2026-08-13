# Input Combi / Error

**Figma:** [4ipeXkifl3Hl6pVZUF4nuJ → node 322:73149](https://www.figma.com/design/4ipeXkifl3Hl6pVZUF4nuJ/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B5-Forms?node-id=322-73149)

> [!NOTE]
> Этот файл (`input-combi-error.md`) — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`input-combi-error.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## Когда

Поле не прошло валидацию.

**Error — это состояние значения.** Цвет ошибку не объясняет, поэтому обязательны три вещи, и все они на стороне потребителя:

```html
<span class="icombi icombi-error icombi--400">
  <span class="icombi__body">
    <input class="icombi__field" id="email" type="email" placeholder=" "
           aria-invalid="true" aria-describedby="email-err" value="ivan@">
    <label class="icombi__label" for="email">Электронная почта</label>
  </span>
</span>
<p id="email-err">Не хватает домена — например, ivan@example.com</p>
```

- `aria-invalid="true"` — скринридер объявит поле ошибочным;
- `aria-describedby` на текст причины — иначе пользователь слышит «ошибка» без объяснения;
- сам текст причины: что не так и как починить, а не «неверный формат».

Здесь `aria-describedby` важнее, чем у обычного поля: метка уже занята названием поля и внутри рамки места под пояснение нет.

## Чем отличается

При фокусе красная подсветка **полностью уступает брендовой**. То есть пока пользователь правит поле, ошибка визуально снимается — а `aria-invalid` остаётся, пока приложение не перепроверит значение.

Всё остальное — разметка с обёрткой `__body`, обязательный `placeholder=" "`, плавающая метка, четыре размера, геометрия, типографика, доступность — совпадает с Default до значения и описано в [input-combi-default.md](input-combi-default.md).

## HTML

```html
<span class="icombi icombi-error icombi--400">
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
| Rest | `.icombi-error` |
| Hover | `.icombi-error:hover:not(:focus-within):has(.icombi__field:enabled)` |
| Active | `.icombi-error:active:not(:focus-within):has(.icombi__field:enabled)` |
| Focus | `.icombi-error:focus-within` |
| Метка наверху | `.icombi:focus-within .icombi__label`, `.icombi__field:not(:placeholder-shown) + .icombi__label` |
| Disabled | `.icombi:has(.icombi__field:disabled)` — на базе, общее для вариантов |

Про `:not(:focus-within)` в hover / active — см. [input-combi-default.md → Состояния](input-combi-default.md#состояния): порядок правил там не работает, потому что `:has()` поднимает специфичность выше фокуса.

## CSS

`input-combi-error.css` — файл **самодостаточный**: та же база `.icombi`, что и у остальных вариантов (побайтово), плюс блок `.icombi-error`. Подключается только нужный вариант.

## Refresh

```
обнови awds-component-input-combi под Figma
```

→ ACB обновит все варианты разом (общий `component.meta.json`). Этот markdown остаётся как есть.
