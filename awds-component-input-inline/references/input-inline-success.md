# Input Inline — тон success

**Figma:** [секция ↪ input-inline 34:41032 → набор 34:41155](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=34-41155)

```html
<input class="iinline iinline-success iinline--400" type="text" value="12" aria-label="Количество">
```

Значение принято: и текст, и плейсхолдер красятся ролями `success-container-*` по ячейкам `form-control/success/{color,placeholder}-{состояние}`. Рамки, которая у обычного поля несёт тон, здесь нет — цвет текста остаётся единственным признаком, поэтому рядом обязателен текст-причина: одним цветом статус не сообщают.

Разметка, состояния и правила — [input-inline-default.md](input-inline-default.md).
