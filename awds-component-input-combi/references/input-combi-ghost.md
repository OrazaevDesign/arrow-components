# Input Combi / Ghost

**Figma:** [4ipeXkifl3Hl6pVZUF4nuJ → node 322:78959](https://www.figma.com/design/4ipeXkifl3Hl6pVZUF4nuJ/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B5-Forms?node-id=322-78959)

> [!NOTE]
> Этот файл (`input-combi-ghost.md`) — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`input-combi-ghost.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## Когда

Границу поля задаёт окружение: строка таблицы, инлайн-правка, ячейка.

Фон, chroma и рамка **прозрачны во всех состояниях покоя**. Поле опознаётся только по метке и по кольцу при фокусе.

**Не используй ghost как единственное поле формы**, и с плавающей меткой это правило жёстче, чем у обычного `input`: там в покое виден placeholder внутри видимой рамки, здесь — один серый текст на пустом месте, без рамки, без заливки и без реакции на наведение. Ghost работает там, где поле уже обрамлено чем-то другим — ячейкой таблицы, строкой списка, панелью.

## Чем отличается

**Hover и active не объявлены вовсе — и это не упущение.** В макете ячейки Rest, Hover и Active дают `#ffffff00` во всех трёх свойствах: наведение здесь ничего не подсвечивает. Пустое правило в CSS было бы враньём, поэтому его нет.

При фокусе фон и рамка остаются прозрачными — меняются только цвет текста, цвет метки и кольцо.

Всё остальное — разметка с обёрткой `__body`, обязательный `placeholder=" "`, плавающая метка, четыре размера, геометрия, типографика, доступность — совпадает с Default до значения и описано в [input-combi-default.md](input-combi-default.md).

## HTML

```html
<span class="icombi icombi-ghost icombi--400">
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
| Rest | `.icombi-ghost` |
| Focus | `.icombi-ghost:focus-within` |
| Метка наверху | `.icombi:focus-within .icombi__label`, `.icombi__field:not(:placeholder-shown) + .icombi__label` |
| Disabled | `.icombi:has(.icombi__field:disabled)` — на базе, общее для вариантов |

Про `:not(:focus-within)` в hover / active — см. [input-combi-default.md → Состояния](input-combi-default.md#состояния): порядок правил там не работает, потому что `:has()` поднимает специфичность выше фокуса.

## CSS

`input-combi-ghost.css` — файл **самодостаточный**: та же база `.icombi`, что и у остальных вариантов (побайтово), плюс блок `.icombi-ghost`. Подключается только нужный вариант.

## Refresh

```
обнови awds-component-input-combi под Figma
```

→ ACB обновит все варианты разом (общий `component.meta.json`). Этот markdown остаётся как есть.
