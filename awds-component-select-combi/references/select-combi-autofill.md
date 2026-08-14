# Select Combi / Autofill

**Figma:** [4ipeXkifl3Hl6pVZUF4nuJ → node 394:16475](https://www.figma.com/design/4ipeXkifl3Hl6pVZUF4nuJ/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B5-Forms?node-id=394-16475)

> [!NOTE]
> Этот файл (`select-combi-autofill.md`) — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`select-combi-autofill.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## Когда

Значение подставлено **не пользователем**: браузером, прошлым заказом, геолокацией, данными профиля. Синий фон говорит «это не ты выбирал — проверь».

Это состояние значения: как только пользователь сам открыл список и что-то выбрал, класс снимается и контрол возвращается к `default` (или к `success` / `error` по итогу проверки).

## Особенность у выбора из списка

У `<input>` вариант совпадает с настоящим браузерным автозаполнением. У `<select>` браузер значения не подставляет — здесь `autofill` почти всегда означает **предзаполнение приложением**: «город определили по IP», «пункт выдачи из прошлого заказа», «тариф по умолчанию».

Из этого следует практическое правило: подсветку имеет смысл держать до первого осознанного выбора, а не постоянно. Иначе она перестаёт читаться как «проверь» и становится просто синим полем.

## Чем отличается

Палитра покоя — роли `tertiary-container-*`. Hover двигает рамку в `tertiary-container-on`, active возвращает к `on-low`.

При фокусе синяя подсветка полностью уступает брендовой (`primary-*`), как у остальных цветных вариантов. Мелкое отличие от Default: при фокусе цвет иконок в слотах уходит в `primary-container-on-highest`, а не `on-high` — так в макете.

Всё остальное совпадает с Default и описано в [select-combi-default.md](select-combi-default.md).

## HTML

```html
<span class="scombi scombi-autofill scombi--400">
  <span class="scombi__body">
    <select class="scombi__field" id="city">
      <option value="ala" selected>Алматы</option>
      <option value="ast">Астана</option>
    </select>
    <label class="scombi__label" for="city">Город доставки</label>
  </span>
</span>
```

Меняется только класс варианта. Если подстановку нужно объяснить («определили по вашему адресу»), это текст под контролом, а не цвет.

## Состояния

| Состояние | Селектор |
|---|---|
| Rest | `.scombi-autofill` |
| Hover | `.scombi-autofill:hover:not(:focus-within):has(.scombi__field:enabled)` |
| Active | `.scombi-autofill:active:not(:focus-within):has(.scombi__field:enabled)` |
| Focus | `.scombi-autofill:focus-within` — брендовая подсветка |
| Открыт список | `.scombi.scombi-autofill:has(.scombi__field:open)` (в своём `@supports`) |
| Disabled | `.scombi:has(.scombi__field:disabled)` — на базе, общее для вариантов |

## CSS

`select-combi-autofill.css` — файл **самодостаточный**: та же база `.scombi`, что и у остальных вариантов (побайтово), плюс блок `.scombi-autofill`. Подключается только нужный вариант. Для стилизованного попапа рядом нужен `list-item-transparent.css`.

## Refresh

```
обнови awds-component-select-combi под Figma
```

→ ACB обновит все варианты разом (общий `component.meta.json`). Этот markdown остаётся как есть.
