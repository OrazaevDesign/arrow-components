# List-item / Accent-selected

**Figma:** [cPyLl9CqwylgJMzMzeyF5g → node 590:20400](https://www.figma.com/design/cPyLl9CqwylgJMzMzeyF5g/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B4-Lists?node-id=590-20400)
**Роль токенов:** `list/selected-secondary`

> [!NOTE]
> Этот файл — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`list-item-accent-selected.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## Когда

Выбранный пункт с брендовой заливкой — самый заметный способ показать выбор. Берётся там, где выбранное значение должно читаться мгновенно: пункт выпадающего списка, выбранный вариант доставки, активный фильтр.

Это же оформление использует раскрытый список `awds-component-select` для выбранного пункта.

## HTML

```html
<button type="button" class="list-item list-item-accent-selected list-item--400">
  <span class="list-item__content">
    <span class="list-item__title">Астана</span>
  </span>
  <span class="list-item__suffix" aria-hidden="true">
    <svg class="list-item__check" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m4 10 4 4 8-8"/></svg>
  </span>
</button>
```

## Цвета

| Состояние | Фон | Рамка | Заголовок | Описание |
|---|---|---|---|---|
| Rest | `primary-container-core` | `primary-container-on-lowest` | `primary-container-on-highest` | `primary-container-on-high` |
| Hover | `primary-container-core` | `primary-container-on-lowest` | `primary-container-on-highest` | `primary-container-on-high` |
| Focus | `primary-container-core` | `primary-container-on-lowest` | `primary-container-on-highest` | `primary-container-on-high` |
| Active | `primary-container-core` | `primary-container-on-lowest` | `primary-container-on-highest` | `primary-container-on-high` |

Галочка (`.list-item__check`): `primary-container-on` в покое.

## Замечания

**Состояния не меняются вообще** — Rest, Hover, Focus и Active в макете идентичны. Это осознанно: строка уже выбрана, подсвечивать её под курсором нечем и незачем. Единственный отклик на клавиатуру — кольцо фокуса.

Из этого следует, что в списке такая строка **не даёт обратной связи на наведение**. Если по ней можно кликнуть, чтобы снять выбор, добавь эту подсказку текстом или иконкой — цветом она не сообщается.

## Геометрия, состояния, слоты

Общие для всей семьи и описаны в [SKILL.md](../SKILL.md): высота `2 × padding + line-height`, переключение горизонтали от слотов, `align-items: flex-start`, кольцо фокуса `surface-on-highest` с offset 1px, disabled — `opacity: 40%`.

## Refresh

```
обнови awds-component-list-item под Figma
```
