# Select Combi / Success

**Figma:** [4ipeXkifl3Hl6pVZUF4nuJ → node 394:16790](https://www.figma.com/design/4ipeXkifl3Hl6pVZUF4nuJ/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B5-Forms?node-id=394-16790)

> [!NOTE]
> Этот файл (`select-combi-success.md`) — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`select-combi-success.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## Когда

Выбранное значение прошло проверку — адрес нашёлся в справочнике, пункт выдачи доступен, тариф подтверждён.

Это **состояние значения, а не вид контрола**: класс вешается и снимается по ходу валидации, а не выбирается при вёрстке формы. Держать зелёными все заполненные поля не нужно — подсветка обесценивается; она нужна там, где проверка была неочевидной и её результат стоит показать.

## Чем отличается

Палитра покоя — роли `success-container-*`: фон, рамка, текст, метка и шеврон. Hover двигает рамку в `success-container-on`, active возвращает к `on-low`.

**При фокусе зелёная подсветка полностью уступает брендовой** — фон, рамка, текст, метка и шеврон уходят в `primary-*`, как у Default. Так в макете: пока пользователь в контроле, важнее «где я», а не «что со значением».

Всё остальное — разметка с обёрткой `__body`, пустой `<option value="">`, плавающая метка, четыре размера, геометрия, стилизованный попап, доступность — совпадает с Default и описано в [select-combi-default.md](select-combi-default.md).

## HTML

```html
<span class="scombi scombi-success scombi--400">
  <span class="scombi__body">
    <select class="scombi__field" id="pvz">
      <option value="p1" selected>Абая, 150</option>
    </select>
    <label class="scombi__label" for="pvz">Пункт выдачи</label>
  </span>
</span>
```

Меняется только класс варианта. Цвет — не сообщение: если результат проверки нужно объяснить, рядом ставится текст.

## Состояния

| Состояние | Селектор |
|---|---|
| Rest | `.scombi-success` |
| Hover | `.scombi-success:hover:not(:focus-within):has(.scombi__field:enabled)` |
| Active | `.scombi-success:active:not(:focus-within):has(.scombi__field:enabled)` |
| Focus | `.scombi-success:focus-within` — брендовая подсветка |
| Открыт список | `.scombi.scombi-success:has(.scombi__field:open)` (в своём `@supports`) |
| Disabled | `.scombi:has(.scombi__field:disabled)` — на базе, общее для вариантов |

## CSS

`select-combi-success.css` — файл **самодостаточный**: та же база `.scombi`, что и у остальных вариантов (побайтово), плюс блок `.scombi-success`. Подключается только нужный вариант. Для стилизованного попапа рядом нужен `list-item-transparent.css`.

## Refresh

```
обнови awds-component-select-combi под Figma
```

→ ACB обновит все варианты разом (общий `component.meta.json`). Этот markdown остаётся как есть.
