# Textarea Combi — тон autofill

**Figma:** [секция ↪ textarea-combi 44:75250 → набор 44:77283](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=44-77283)

```html
<label class="tcombi tcombi-autofill tcombi--400">
  <span class="tcombi__label">Комментарий к заказу</span>
  <textarea class="tcombi__field" name="comment" rows="3"></textarea>
</label>
```

Автозаполнение браузера: фон третичной роли. Ставится скриптом потребителя по событию autofill — сам браузер этот класс не вешает.

Разметка, состояния и правила — [textarea-combi-default.md](textarea-combi-default.md).
