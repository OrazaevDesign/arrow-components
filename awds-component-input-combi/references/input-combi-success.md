# Input Combi / Success

**Figma:** [4ipeXkifl3Hl6pVZUF4nuJ → node 322:61640](https://www.figma.com/design/4ipeXkifl3Hl6pVZUF4nuJ/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B5-Forms?node-id=322-61640)

> [!NOTE]
> Этот файл (`input-combi-success.md`) — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`input-combi-success.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## Когда

Поле прошло валидацию — значение принято.

**Success — это состояние значения, а не вид контрола.** Класс вешается после успешной проверки и снимается, когда пользователь снова меняет значение. Держать поле зелёным постоянно бессмысленно: подсветка перестаёт что-либо сообщать.

Зелёная подсветка сама по себе ничего не объясняет. Если успех неочевиден («логин свободен», «промокод применён») — рядом нужен короткий текст, а не только цвет: цвет не читается скринридером и не различается при дальтонизме.

## Чем отличается

При фокусе зелёная подсветка **полностью уступает брендовой** — фон, рамка, текст и метка становятся такими же, как у Default. Проверено по ячейке Focus, а не выведено по аналогии.

Всё остальное — разметка с обёрткой `__body`, обязательный `placeholder=" "`, плавающая метка, четыре размера, геометрия, типографика, доступность — совпадает с Default до значения и описано в [input-combi-default.md](input-combi-default.md).

## HTML

```html
<span class="icombi icombi-success icombi--400">
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
| Rest | `.icombi-success` |
| Hover | `.icombi-success:hover:not(:focus-within):has(.icombi__field:enabled)` |
| Active | `.icombi-success:active:not(:focus-within):has(.icombi__field:enabled)` |
| Focus | `.icombi-success:focus-within` |
| Метка наверху | `.icombi:focus-within .icombi__label`, `.icombi__field:not(:placeholder-shown) + .icombi__label` |
| Disabled | `.icombi:has(.icombi__field:disabled)` — на базе, общее для вариантов |

Про `:not(:focus-within)` в hover / active — см. [input-combi-default.md → Состояния](input-combi-default.md#состояния): порядок правил там не работает, потому что `:has()` поднимает специфичность выше фокуса.

## CSS

`input-combi-success.css` — файл **самодостаточный**: та же база `.icombi`, что и у остальных вариантов (побайтово), плюс блок `.icombi-success`. Подключается только нужный вариант.

## Refresh

```
обнови awds-component-input-combi под Figma
```

→ ACB обновит все варианты разом (общий `component.meta.json`). Этот markdown остаётся как есть.
