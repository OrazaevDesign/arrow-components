# Select Combi / Light

**Figma:** [4ipeXkifl3Hl6pVZUF4nuJ → node 394:16895](https://www.figma.com/design/4ipeXkifl3Hl6pVZUF4nuJ/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B5-Forms?node-id=394-16895)

> [!NOTE]
> Этот файл (`select-combi-light.md`) — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`select-combi-light.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## Когда

Контрол стоит на **сером** блоке — карточке, панели фильтров, в модалке. Там `default` (серый на сером) теряется, а белый фон отделяет контрол от подложки.

Обратное тоже верно: на белой странице `light` сливается с фоном и держится на одной рамке. Выбор варианта — от фона, на котором стоит контрол, а не от важности поля.

## Чем отличается

Только фоном покоя: `surface-bright` вместо `secondary-container-core`, и `chroma` тоже `surface-bright` — то есть градиента в покое фактически нет.

Из этого следует единственное отличие в CSS: **правило фокуса не переопределяет `bg`** — он уже белый. Меняются `chroma`, рамка и цвета текста. Рамка, hover, active, кольцо фокуса — как у Default (роли `secondary-container-*`).

Всё остальное — разметка с обёрткой `__body`, пустой `<option value="">`, плавающая метка, четыре размера, геометрия, стилизованный попап, доступность — совпадает с Default и описано в [select-combi-default.md](select-combi-default.md).

## HTML

```html
<span class="scombi scombi-light scombi--400">
  <span class="scombi__body">
    <select class="scombi__field" id="f">
      <option value=""></option>
      <option value="ala">Алматы</option>
    </select>
    <label class="scombi__label" for="f">Город</label>
  </span>
</span>
```

Меняется только класс варианта.

## Состояния

| Состояние | Селектор |
|---|---|
| Rest | `.scombi-light` |
| Hover | `.scombi-light:hover:not(:focus-within):has(.scombi__field:enabled)` |
| Active | `.scombi-light:active:not(:focus-within):has(.scombi__field:enabled)` |
| Focus | `.scombi-light:focus-within` |
| Открыт список | `.scombi.scombi-light:has(.scombi__field:open)` (в своём `@supports`) |
| Метка наверху | база: `.scombi__field:has(option[value=""]:checked) + .scombi__label` возвращает её на центр |
| Disabled | `.scombi:has(.scombi__field:disabled)` — на базе, общее для вариантов |

Про `:not(:focus-within)` в hover / active — см. [select-combi-default.md → Состояния](select-combi-default.md#состояния).

## CSS

`select-combi-light.css` — файл **самодостаточный**: та же база `.scombi`, что и у остальных вариантов (побайтово), плюс блок `.scombi-light`. Подключается только нужный вариант. Для стилизованного попапа рядом нужен `list-item-transparent.css`.

## Refresh

```
обнови awds-component-select-combi под Figma
```

→ ACB обновит все варианты разом (общий `component.meta.json`). Этот markdown остаётся как есть.
