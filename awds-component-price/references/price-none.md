# Price — None

Товара нет в наличии: вместо цены — приглушённый плейсхолдер «Нет в наличии».

**Figma:** [Price ↔ None Right 1100](https://www.figma.com/design/UCYhMA1JeNUNuVGsxUEne7/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B9-Elemets?node-id=2093-2236)

## HTML

```html
<span class="price price-none price--600">
  <span class="price__placeholder">Нет в наличии</span>
</span>
```

## CSS

- Плейсхолдер (`.price__placeholder`): `color: rgb(var(--surface-on))`, вторичная шкала типографики размера.
- Ни `.price__main`, ни `.price__old` не выводятся.

## Когда

Товар закончился / снят с продажи. Приглушённый цвет сигналирует недоступность, размер занимает то же место, что и цена — раскладка карточки не прыгает.
