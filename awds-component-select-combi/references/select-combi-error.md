# Select Combi / Error

**Figma:** [4ipeXkifl3Hl6pVZUF4nuJ → node 394:16685](https://www.figma.com/design/4ipeXkifl3Hl6pVZUF4nuJ/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B5-Forms?node-id=394-16685)

> [!NOTE]
> Этот файл (`select-combi-error.md`) — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`select-combi-error.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## Когда

Выбор не прошёл проверку или обязательный выбор не сделан: город не поддерживается доставкой, выбранный пункт выдачи закрылся, форму отправили с пустым обязательным списком.

Это **состояние значения**: класс вешается при неуспешной проверке и снимается, когда пользователь выбрал допустимый вариант.

## Одного цвета мало

Красная рамка не объясняет, что не так, и не читается скринридером. Обязательный минимум рядом с контролом:

```html
<span class="scombi scombi-error scombi--400">
  <span class="scombi__body">
    <select class="scombi__field" id="city" aria-invalid="true" aria-describedby="city-err">
      <option value=""></option>
      <option value="ala">Алматы</option>
    </select>
    <label class="scombi__label" for="city">Город доставки</label>
  </span>
</span>
<p id="city-err">Мы пока не возим в этот город — выберите другой или заберите из пункта выдачи</p>
```

- **`aria-invalid="true"`** — состояние для скринридера, цвета он не видит.
- **`aria-describedby`** на текст причины — читается сразу после имени контрола.
- **Текст причины** говорит, что делать дальше, а не «Ошибка». У списка причин мало: значение недопустимо или не выбрано — это можно объяснить одной фразой.

С плавающей меткой места под текст ошибки в контроле нет вовсе (метка занимает верхнюю строку), поэтому текст всегда живёт **под** контролом.

## Чем отличается

Палитра покоя — роли `error-container-*`. Hover двигает рамку в `error-container-on`, active возвращает к `on-low`.

**При фокусе красная подсветка полностью уступает брендовой** — так в макете: пока пользователь в контроле, важнее «где я». Ошибка при этом не теряется — её держит текст под контролом.

Всё остальное совпадает с Default и описано в [select-combi-default.md](select-combi-default.md).

## Состояния

| Состояние | Селектор |
|---|---|
| Rest | `.scombi-error` |
| Hover | `.scombi-error:hover:not(:focus-within):has(.scombi__field:enabled)` |
| Active | `.scombi-error:active:not(:focus-within):has(.scombi__field:enabled)` |
| Focus | `.scombi-error:focus-within` — брендовая подсветка |
| Открыт список | `.scombi.scombi-error:has(.scombi__field:open)` (в своём `@supports`) |
| Disabled | `.scombi:has(.scombi__field:disabled)` — на базе, общее для вариантов |

## CSS

`select-combi-error.css` — файл **самодостаточный**: та же база `.scombi`, что и у остальных вариантов (побайтово), плюс блок `.scombi-error`. Подключается только нужный вариант. Для стилизованного попапа рядом нужен `list-item-transparent.css`.

## Refresh

```
обнови awds-component-select-combi под Figma
```

→ ACB обновит все варианты разом (общий `component.meta.json`). Этот markdown остаётся как есть.
