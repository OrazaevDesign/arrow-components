# Price — Default

Обычная цена без скидки: одна цена нейтральным цветом, без старой.

**Figma:** [Price ↔ Default Right 1100](https://www.figma.com/design/UCYhMA1JeNUNuVGsxUEne7/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B9-Elemets?node-id=2093-2148)

## HTML

```html
<span class="price price-default price--600">
  <span class="price__main">
    <span class="price__current">1 900</span>
    <span class="price__currency">₽</span>
  </span>
</span>
```

Блок `.price__old` опускается. Модификаторы `price--vertical` / `price--currency-left` работают так же.

## CSS

- Текущая цена (`.price__main`): `color: rgb(var(--surface-on-highest))`.
- Старой цены нет.

## Когда

Товар без скидки. Нейтральный цвет — цена не конкурирует за внимание с другими акцентами карточки.
