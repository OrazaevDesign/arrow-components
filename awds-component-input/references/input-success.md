# Input / Success

**Figma:** [4ipeXkifl3Hl6pVZUF4nuJ → node 322:27157](https://www.figma.com/design/4ipeXkifl3Hl6pVZUF4nuJ/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B5-Forms?node-id=322-27157)

> [!NOTE]
> Этот файл (`input-success.md`) — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`input-success.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## Когда

Поле прошло валидацию — значение принято.

**Success — это состояние валидации, а не вид контрола.** Класс вешается после успешной проверки и снимается, когда пользователь снова меняет значение. Держать поле зелёным постоянно бессмысленно: подсветка перестаёт что-либо сообщать.

Зелёная подсветка сама по себе ничего не объясняет. Если успех неочевиден («логин свободен», «промокод применён») — рядом нужен короткий текст, а не только цвет: цвет не читается скринридером и не различается при дальтонизме.

## Чем отличается

При фокусе зелёная подсветка **полностью уступает брендовой** — фон, рамка и текст становятся такими же, как у Default. Проверено по ячейке Focus, а не выведено по аналогии.

Всё остальное — структура, слоты, семь размеров, геометрия, типографика, доступность, нативный крестик у `type="search"`, кнопка в слоте — совпадает с Default до значения и описано в [input-default.md](input-default.md).

## HTML

```html
<span class="input input-success input--400">
  <input class="input__field" type="text" placeholder="Значение">
</span>
```

Меняется только класс варианта.

## Состояния

| Состояние | Селектор |
|---|---|
| Rest | `.input-success` |
| Hover | `.input-success:hover:not(:focus-within):has(> .input__field:enabled)` |
| Active | `.input-success:active:not(:focus-within):has(> .input__field:enabled)` |
| Focus | `.input-success:focus-within` |
| Disabled | `.input:has(> .input__field:disabled)` — на базе, общее для вариантов |

Про `:not(:focus-within)` в hover / active — см. [input-default.md → Состояния](input-default.md#состояния): порядок правил там не работает, потому что `:has()` поднимает специфичность выше фокуса.

## CSS

`input-success.css` — файл **самодостаточный**: та же база `.input`, что и у остальных вариантов (побайтово), плюс блок `.input-success`. Подключается только нужный вариант.

## Refresh

```
обнови awds-component-input под Figma
```

→ ACB обновит все варианты разом (общий `component.meta.json`). Этот markdown остаётся как есть.
