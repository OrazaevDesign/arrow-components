# Input / Autofill

**Figma:** [4ipeXkifl3Hl6pVZUF4nuJ → node 322:43572](https://www.figma.com/design/4ipeXkifl3Hl6pVZUF4nuJ/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B5-Forms?node-id=322-43572)

> [!NOTE]
> Этот файл (`input-autofill.md`) — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`input-autofill.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## Когда

Значение подставлено браузером, менеджером паролей или подсказкой.

Вариант отмечает, что значение ввёл **не пользователь**. Это подсказка «проверь, что подставилось», а не состояние ошибки.

**Класс вешает приложение, а не браузер.** Нативный `:-webkit-autofill` сюда не завязан: он приходит с собственным фоном, недоступен для чтения из JS напрямую и ведёт себя по-разному в браузерах. Если нужно поймать браузерное автозаполнение — делай это своей логикой и ставь класс сам.

## Чем отличается

При фокусе синяя подсветка уступает брендовой — как только пользователь берётся за поле, пометка «подставлено» перестаёт мешать.

Всё остальное — структура, слоты, семь размеров, геометрия, типографика, доступность, нативный крестик у `type="search"`, кнопка в слоте — совпадает с Default до значения и описано в [input-default.md](input-default.md).

## HTML

```html
<span class="input input-autofill input--400">
  <input class="input__field" type="text" placeholder="Значение">
</span>
```

Меняется только класс варианта.

## Состояния

| Состояние | Селектор |
|---|---|
| Rest | `.input-autofill` |
| Hover | `.input-autofill:hover:not(:focus-within):has(> .input__field:enabled)` |
| Active | `.input-autofill:active:not(:focus-within):has(> .input__field:enabled)` |
| Focus | `.input-autofill:focus-within` |
| Disabled | `.input:has(> .input__field:disabled)` — на базе, общее для вариантов |

Про `:not(:focus-within)` в hover / active — см. [input-default.md → Состояния](input-default.md#состояния): порядок правил там не работает, потому что `:has()` поднимает специфичность выше фокуса.

## CSS

`input-autofill.css` — файл **самодостаточный**: та же база `.input`, что и у остальных вариантов (побайтово), плюс блок `.input-autofill`. Подключается только нужный вариант.

## Refresh

```
обнови awds-component-input под Figma
```

→ ACB обновит все варианты разом (общий `component.meta.json`). Этот markdown остаётся как есть.
