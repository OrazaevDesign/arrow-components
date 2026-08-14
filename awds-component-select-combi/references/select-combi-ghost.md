# Select Combi / Ghost

**Figma:** [4ipeXkifl3Hl6pVZUF4nuJ → node 394:16580](https://www.figma.com/design/4ipeXkifl3Hl6pVZUF4nuJ/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B5-Forms?node-id=394-16580)

> [!NOTE]
> Этот файл (`select-combi-ghost.md`) — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`select-combi-ghost.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## Когда

Границу контрола задаёт окружение: ячейка таблицы, строка списка, панель с собственной рамкой. Фон, chroma и рамка **прозрачны во всех состояниях покоя**.

**Не используй ghost как единственный контрол формы**, и с плавающей меткой это правило жёстче, чем у обычного `select`: там в покое видна подпись снаружи и рамка контрола, здесь — серая метка и шеврон на пустом месте. Единственный якорь, по которому контрол вообще опознаётся, — шеврон.

## Чем отличается

**Hover и active не объявлены вовсе — и это не упущение.** В макете ячейки Rest, Hover и Active дают `#ffffff00` во всех трёх свойствах: наведение здесь ничего не подсвечивает. Пустое правило было бы враньём, поэтому его нет. Проверено вживую: под курсором фон, рамка и цвета не меняются.

При фокусе фон и рамка остаются прозрачными — меняются только цвет текста, метки и шеврона плюс кольцо. То есть у ghost фокус — единственный видимый отклик, и убирать его нельзя ни при каких условиях.

Всё остальное — разметка с обёрткой `__body`, пустой `<option value="">`, плавающая метка, четыре размера, геометрия, стилизованный попап — совпадает с Default и описано в [select-combi-default.md](select-combi-default.md).

## HTML

```html
<span class="scombi scombi-ghost scombi--300">
  <span class="scombi__body">
    <select class="scombi__field" id="qty">
      <option value="1" selected>1 шт</option>
      <option value="2">2 шт</option>
    </select>
    <label class="scombi__label" for="qty">Количество</label>
  </span>
</span>
```

Меняется только класс варианта.

## Состояния

| Состояние | Селектор |
|---|---|
| Rest | `.scombi-ghost` |
| Hover / Active | правил нет — совпадают с Rest (так в макете) |
| Focus | `.scombi-ghost:focus-within` — прозрачный фон, брендовые цвета текста и кольцо |
| Открыт список | `.scombi.scombi-ghost:has(.scombi__field:open)` (в своём `@supports`) |
| Disabled | `.scombi:has(.scombi__field:disabled)` — на базе, общее для вариантов |

## CSS

`select-combi-ghost.css` — файл **самодостаточный**: та же база `.scombi`, что и у остальных вариантов (побайтово), плюс блок `.scombi-ghost`. Подключается только нужный вариант. Для стилизованного попапа рядом нужен `list-item-transparent.css`.

## Refresh

```
обнови awds-component-select-combi под Figma
```

→ ACB обновит все варианты разом (общий `component.meta.json`). Этот markdown остаётся как есть.
