# Input Combi / Light

**Figma:** [4ipeXkifl3Hl6pVZUF4nuJ → node 322:59585](https://www.figma.com/design/4ipeXkifl3Hl6pVZUF4nuJ/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B5-Forms?node-id=322-59585)

> [!NOTE]
> Этот файл (`input-combi-light.md`) — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`input-combi-light.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## Когда

Поле стоит на сером блоке: карточка, панель фильтров, модалка.

Выбор между `light` и `default` — **от подложки, а не от важности поля**. На белой странице поле должно быть темнее фона (`default`), на сером блоке — светлее (`light`). Перепутаешь — поле сольётся с подложкой, и пользователь не увидит границу ввода.

С плавающей меткой это заметнее, чем у обычного поля: в покое видимого содержимого всего один текст, и если рамка потерялась, опознать контрол не по чему.

## Чем отличается

Единственное отличие от Default — **фон покоя**: `surface-bright` (белый) вместо `secondary-container-core` (серого). Рамка, текст, метка, все состояния и фокус — совпадают до значения.

Всё остальное — разметка с обёрткой `__body`, обязательный `placeholder=" "`, плавающая метка, четыре размера, геометрия, типографика, доступность — совпадает с Default до значения и описано в [input-combi-default.md](input-combi-default.md).

## HTML

```html
<span class="icombi icombi-light icombi--400">
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
| Rest | `.icombi-light` |
| Hover | `.icombi-light:hover:not(:focus-within):has(.icombi__field:enabled)` |
| Active | `.icombi-light:active:not(:focus-within):has(.icombi__field:enabled)` |
| Focus | `.icombi-light:focus-within` |
| Метка наверху | `.icombi:focus-within .icombi__label`, `.icombi__field:not(:placeholder-shown) + .icombi__label` |
| Disabled | `.icombi:has(.icombi__field:disabled)` — на базе, общее для вариантов |

Про `:not(:focus-within)` в hover / active — см. [input-combi-default.md → Состояния](input-combi-default.md#состояния): порядок правил там не работает, потому что `:has()` поднимает специфичность выше фокуса.

## CSS

`input-combi-light.css` — файл **самодостаточный**: та же база `.icombi`, что и у остальных вариантов (побайтово), плюс блок `.icombi-light`. Подключается только нужный вариант.

## Refresh

```
обнови awds-component-input-combi под Figma
```

→ ACB обновит все варианты разом (общий `component.meta.json`). Этот markdown остаётся как есть.
