# List-item / Menu-selected

**Figma:** [cPyLl9CqwylgJMzMzeyF5g → node 590:20558](https://www.figma.com/design/cPyLl9CqwylgJMzMzeyF5g/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B4-Lists?node-id=590-20558)
**Роль токенов:** `list/selected-menu`

> [!NOTE]
> Этот файл — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`list-item-menu-selected.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## Когда

Текущий пункт меню: постоянная подложка и акцентный текст. Показывает раздел, в котором пользователь находится сейчас.

## HTML

```html
<button type="button" class="list-item list-item-menu-selected list-item--400">
  <span class="list-item__prefix" aria-hidden="true">
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 5h12M4 10h12M4 15h8"/></svg>
  </span>
  <span class="list-item__content">
    <span class="list-item__title">Настройки профиля</span>
  </span>
</button>
```

## Цвета

| Состояние | Фон | Рамка | Заголовок | Описание |
|---|---|---|---|---|
| Rest | `secondary-container-core` | `secondary-container-core` | `accent-container-on` | `accent-container-on` |
| Hover | `secondary-container-core` | `secondary-container-core` | `accent-container-on` | `accent-container-on` |
| Focus | `secondary-container-core` | `secondary-container-core` | `accent-container-on` | `accent-container-on` |
| Active | `secondary-container-core` | `secondary-container-core` | `accent-container-on` | `accent-container-on` |

Галочка (`.list-item__check`): `accent-container-on-lowest` в покое.

## Замечания

**Состояния не меняются** — Rest, Hover, Focus и Active идентичны. Текущий пункт не подсвечивается под курсором: он уже выделен.

**Объяви текущий раздел программно** — `aria-current="page"`, иначе для чтения с экрана он ничем не отличается от остальных.

## Геометрия, состояния, слоты

Общие для всей семьи и описаны в [SKILL.md](../SKILL.md): высота `2 × padding + line-height`, переключение горизонтали от слотов, `align-items: flex-start`, кольцо фокуса `surface-on-highest` с offset 1px, disabled — `opacity: 40%`.

## Refresh

```
обнови awds-component-list-item под Figma
```
