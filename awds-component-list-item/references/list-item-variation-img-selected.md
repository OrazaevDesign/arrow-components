# List-item / Variation-img-selected

**Figma:** [470rar5EfRm4n14vHMXbpc → набор 1408:23](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=1408-23)
**Роль токенов:** `list/variation-selected` (рамка, текст, описание) + `list/variation-img` (подложка и завеса)

> [!NOTE]
> Этот файл — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`list-item-variation-img-selected.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## Когда

Выбранная вариация с фотографией: цвет, принт, комплект, который покупатель выбрал сейчас. Пара к
[variation-img](list-item-variation-img.md), как [variation-selected](list-item-variation-selected.md)
к [variation](list-item-variation.md). В ряду фото-плиток выбрана одна, остальные — `variation-img`.

## Откуда взялся

Заведён 20.11.2026 для мини-карточки товара в листинге. Своего выбранного состояния у
`variation-img` не было, и выбранный цвет в макете рисовали состоянием `active`. Но `active` — это
нажатие: в коде такая плитка выглядела бы нажатой, а после отпускания кнопки мыши теряла бы выбор.
Отдельный набор, а не ось `selected`, — потому что вся семья `list-item` держит выбор парами
наборов.

## HTML

```html
<button type="button" role="radio" aria-checked="true" class="list-item list-item-variation-img-selected list-item--400">
  <img class="list-item__img" src="…" alt="Чёрный">
</button>
```

Выбор одного из ряда — это группа радиокнопок. Если плитки стоят кнопками, ряду нужна
`role="radiogroup"` с подписью, а плитке — `role="radio"` и `aria-checked`. Цвет рамки сам по себе
выбор не озвучивает.

`alt` описывает вариацию, а не товар — как у `variation-img`.

## Цвета

| Состояние | Подложка | Рамка | Заголовок | Описание |
|---|---|---|---|---|
| Rest | `surface-bright` | `focus-core` | `focus-container-on-highest` | `focus-container-on-high` |
| Hover | `surface-bright` | `focus-core` | `focus-container-on-highest` | `focus-container-on-high` |
| Focus | `surface-bright` | `focus-core` | `focus-container-on-highest` | `focus-container-on-high` |
| Active | `surface-bright` | `focus-core` | `focus-container-on-highest` | `focus-container-on-high` |

Рамка 2px — ячейка `outline/width`, как у `variation-selected`. У невыбранной `variation-img` рамка
1px (`outline/offset`). Подложка и завеса — от `variation-img`, они от выбора не зависят.

## Замечания

**Состояния одинаковые.** Как у `variation-selected`: плитка уже выбрана, на наведение не отвечает.
Если клик по ней снимает выбор, это надо сообщить текстом или иконкой.

**Ступеней размера в макете нет**, как у `variation-img`: пять состояний на одной ступени. Код несёт
всю лестницу семьи, размер плитки задаёт потребитель контейнером.
