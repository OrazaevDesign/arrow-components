# List-item / Variation-selected

**Figma:** [cPyLl9CqwylgJMzMzeyF5g → node 590:22197](https://www.figma.com/design/cPyLl9CqwylgJMzMzeyF5g/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B4-Lists?node-id=590-22197)
**Роль токенов:** `list/selected-variation`

> [!NOTE]
> Этот файл — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`list-item-variation-selected.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## Когда

Выбранная вариация товара: брендовая заливка и брендовая обводка. Показывает, какой вариант выбран сейчас.

## HTML

```html
<button type="button" class="list-item list-item-variation-selected list-item--400">
  <span class="list-item__content">
    <span class="list-item__title">Чёрный, 256 ГБ</span>
    <span class="list-item__description">В наличии, 12 900 ₸</span>
  </span>
</button>
```

## Цвета

| Состояние | Фон | Рамка | Заголовок | Описание |
|---|---|---|---|---|
| Rest | `primary-container-core` | `primary-core` | `primary-container-on-highest` | `primary-container-on-high` |
| Hover | `primary-container-core` | `primary-core` | `primary-container-on-highest` | `primary-container-on-high` |
| Focus | `primary-container-core` | `primary-core` | `primary-container-on-highest` | `primary-container-on-high` |
| Active | `primary-container-core` | `primary-core` | `primary-container-on-highest` | `primary-container-on-high` |

Галочка (`.list-item__check`): `primary-container-on` в покое.

## Замечания

**Состояния не меняются** — Rest, Hover, Focus и Active идентичны.

**Рамка — `primary-core`, самая насыщенная роль бренда.** Это единственный вариант семейства, где рамка ярче фона: так выбранная плитка держит контур на фоне соседних.

В макете в ячейке Rest дополнительно стоит `focus-selection/outlineShow` со значением `outlineVariant` = `primary-core` — тем же цветом, что и рамка. Это тот же контур, задублированный слоем эффекта, поэтому в CSS он один: `inset box-shadow` рамки. Отдельного кольца не добавляем, иначе получилось бы две обводки.

## Геометрия, состояния, слоты

Общие для всей семьи и описаны в [SKILL.md](../SKILL.md): высота `2 × padding + line-height`, переключение горизонтали от слотов, `align-items: flex-start`, кольцо фокуса `surface-on-highest` с offset 1px, disabled — `opacity: 40%`.

## Refresh

```
обнови awds-component-list-item под Figma
```
