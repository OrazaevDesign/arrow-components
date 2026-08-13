# Input Combi / Autofill

**Figma:** [4ipeXkifl3Hl6pVZUF4nuJ → node 322:82353](https://www.figma.com/design/4ipeXkifl3Hl6pVZUF4nuJ/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B5-Forms?node-id=322-82353)

> [!NOTE]
> Этот файл (`input-combi-autofill.md`) — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`input-combi-autofill.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## Когда

Значение подставлено браузером, менеджером паролей или подсказкой.

Вариант отмечает, что значение ввёл **не пользователь**. Это подсказка «проверь, что подставилось», а не состояние ошибки.

**Класс вешает приложение, а не браузер.** Нативный `:-webkit-autofill` сюда не завязан: он приходит с собственным фоном, недоступен для чтения из JS напрямую и ведёт себя по-разному в браузерах. Если нужно поймать браузерное автозаполнение — делай это своей логикой и ставь класс сам.

Побочный эффект автозаполнения, о котором стоит знать: браузер вставляет значение без событий ввода, но `:placeholder-shown` при этом становится ложным — метка уезжает наверх сама, без вмешательства.

## Чем отличается

При фокусе синяя подсветка уступает брендовой — как только пользователь берётся за поле, пометка «подставлено» перестаёт мешать.

Всё остальное — разметка с обёрткой `__body`, обязательный `placeholder=" "`, плавающая метка, четыре размера, геометрия, типографика, доступность — совпадает с Default до значения и описано в [input-combi-default.md](input-combi-default.md).

## HTML

```html
<span class="icombi icombi-autofill icombi--400">
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
| Rest | `.icombi-autofill` |
| Hover | `.icombi-autofill:hover:not(:focus-within):has(.icombi__field:enabled)` |
| Active | `.icombi-autofill:active:not(:focus-within):has(.icombi__field:enabled)` |
| Focus | `.icombi-autofill:focus-within` |
| Метка наверху | `.icombi:focus-within .icombi__label`, `.icombi__field:not(:placeholder-shown) + .icombi__label` |
| Disabled | `.icombi:has(.icombi__field:disabled)` — на базе, общее для вариантов |

Про `:not(:focus-within)` в hover / active — см. [input-combi-default.md → Состояния](input-combi-default.md#состояния): порядок правил там не работает, потому что `:has()` поднимает специфичность выше фокуса.

## CSS

`input-combi-autofill.css` — файл **самодостаточный**: та же база `.icombi`, что и у остальных вариантов (побайтово), плюс блок `.icombi-autofill`. Подключается только нужный вариант.

## Refresh

```
обнови awds-component-input-combi под Figma
```

→ ACB обновит все варианты разом (общий `component.meta.json`). Этот markdown остаётся как есть.
