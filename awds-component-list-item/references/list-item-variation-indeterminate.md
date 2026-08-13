# List-item / Variaton-indeterminate

**Figma:** [cPyLl9CqwylgJMzMzeyF5g → node 590:22196](https://www.figma.com/design/cPyLl9CqwylgJMzMzeyF5g/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B4-Lists?node-id=590-22196)
**Роль токенов:** `list/indeterminate-variation`

> [!NOTE]
> Этот файл — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`list-item-variation-indeterminate.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## Когда

Вариация в неопределённом состоянии — когда выбор частичный: часть вложенных опций выбрана, часть нет. Аналог `indeterminate` у чекбокса, только строкой.

От `variation` отличается фоном: белый `surface-bright` вместо серого.

## HTML

```html
<button type="button" class="list-item list-item-variation-indeterminate list-item--400">
  <span class="list-item__content">
    <span class="list-item__title">Чёрный</span>
    <span class="list-item__description">Выбрано 2 из 5 размеров</span>
  </span>
</button>
```

## Цвета

| Состояние | Фон | Рамка | Заголовок | Описание |
|---|---|---|---|---|
| Rest | `surface-bright` | `secondary-container-on-lowest` | `secondary-container-on-high` | `secondary-container-on` |
| Hover | `primary-container-core` | `primary-core` | `primary-container-on-highest` | `primary-container-on-high` |
| Focus | `surface-bright` | `secondary-container-on-lowest` | `secondary-container-on-high` | `secondary-container-on` |
| Active | `surface-bright` | `secondary-container-on-lowest` | `secondary-container-on-high` | `secondary-container-on` |

Галочка (`.list-item__check`): `primary-container-on` в покое.

## Замечания

**Неопределённость передаётся только фоном.** Белая подложка против серой у `variation` — разница тонкая и цветовая. Смысл «выбрано частично» обязан быть в тексте (как в примере выше: «Выбрано 2 из 5»), иначе состояние не прочитается ни глазами, ни экранной читалкой.

**Для чтения с экрана** используй `aria-checked="mixed"` на строке с ролью, которая это допускает (`role="menuitemcheckbox"` или `role="option"` в связке с описанием состояния).

## Контраст

- Описание в состоянии **Rest**: `secondary-container-on` (#808080) на `surface-bright` (#ffffff) — **3.95:1** при норме 4.5:1.

Это свойство ролей дизайн-системы, а не вёрстки — чинится в токенах, не здесь.

## Геометрия, состояния, слоты

Общие для всей семьи и описаны в [SKILL.md](../SKILL.md): высота `2 × padding + line-height`, переключение горизонтали от слотов, `align-items: flex-start`, кольцо фокуса `surface-on-highest` с offset 1px, disabled — `opacity: 40%`.

## Refresh

```
обнови awds-component-list-item под Figma
```
