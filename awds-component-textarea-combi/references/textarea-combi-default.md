# Textarea Combi — разметка и состояния

**Figma:** [секция ↪ textarea-combi 44:75250 → набор 44:76856](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=44-76856)

## Минимальная разметка

```html
<label class="tcombi tcombi-default tcombi--400">
  <span class="tcombi__label">Комментарий к заказу</span>
  <textarea class="tcombi__field" name="comment" rows="3"></textarea>
</label>
```

Порядок узлов обязателен: метка первой, поле вторым. В макете они наложены абсолютно, в CSS идут потоком — результат тот же, а разметка остаётся линейной и доступной с клавиатуры.

## Состояния

| Состояние | Селектор | Что меняется |
|---|---|---|
| Rest | — | фон, рамка, текст и метка по ячейкам `-rest` |
| Hover | `.tcombi-{тон}:hover:not(:focus-within):has(> .tcombi__field:enabled)` | рамка и текст по ячейкам `-hover` |
| Focus | `.tcombi-{тон}:focus-within` | фон, рамка, текст, метка по `-focus` плюс кольцо |
| Active | `.tcombi-{тон}:active:not(:focus-within):has(> .tcombi__field:enabled)` | ячейки `-active` |
| Disabled | `.tcombi:has(> .tcombi__field:disabled)` или `.tcombi--disabled` | `opacity: 40%`, ресайз выключен |

`:focus-within`, а не `:focus-visible`: у текстового поля «сфокусировано» = активно, рамка обязана загораться и при клике мышью. `:not(:focus-within)` у hover стоит намеренно — `:has()` поднимает вес селектора выше, чем у `:focus-within`, и без него наведение на сфокусированное поле подменяло бы брендовую рамку серой.

## Фиксированная высота

```html
<label class="tcombi tcombi-default tcombi--400 tcombi--fixed">…</label>
```

`.tcombi--fixed` гасит `resize` у поля. Берётся там, где ресайз ломает раскладку: узкая колонка, ячейка таблицы, модальное окно.

## Чего у компонента нет

Слотов `prefix` / `suffix` и иконок: в макете их нет ни в одном из шести тонов. Нужна иконка внутри контрола — это `input` или `input-combi`, а не многострочное поле.
