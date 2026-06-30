# Price — Sale

Цена со скидкой: текущая цена акцентным цветом + старая цена зачёркнутая, приглушённая.

**Figma:** [Price ↔ Sale Right 1100](https://www.figma.com/design/UCYhMA1JeNUNuVGsxUEne7/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B9-Elemets?node-id=2093-1972)

## HTML

```html
<!-- Горизонтальная, ₽ справа -->
<span class="price price-sale price--600">
  <span class="price__main">
    <span class="price__current">1 900</span>
    <span class="price__currency">₽</span>
  </span>
  <span class="price__old">
    <span class="price__old-value">2 000</span>
    <span class="price__old-currency">₽</span>
  </span>
</span>

<!-- Вертикальная (старая цена снизу) -->
<span class="price price-sale price--600 price--vertical"> … </span>

<!-- Валюта слева -->
<span class="price price-sale price--600 price--currency-left"> … </span>
```

## CSS

- Текущая цена (`.price__main`): `color: rgb(var(--accent-container-on))`.
- Старая цена (`.price__old`): `color: rgb(var(--surface-on))`, `text-decoration: line-through`, вторичная шкала типографики.
- Главное число — главная шкала размера, валюта — вторичная.

## Когда

Товар со скидкой в карточке, маркет-гриде, корзине. Акцентный цвет привлекает внимание к выгоде, зачёркнутая старая цена показывает размер скидки.
