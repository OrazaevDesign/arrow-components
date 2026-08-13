# List-item / Menu

**Figma:** [cPyLl9CqwylgJMzMzeyF5g → node 590:20410](https://www.figma.com/design/cPyLl9CqwylgJMzMzeyF5g/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B4-Lists?node-id=590-20410)
**Роль токенов:** `list/unselected-menu`

> [!NOTE]
> Этот файл — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`list-item-menu.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## Когда

Пункт меню — выпадающего, контекстного или бокового. В покое прозрачный, при наведении получает подложку и акцентный текст.

Отличается от `transparent` откликом: там при наведении только серая подложка, здесь ещё и текст уходит в акцент. Меню так подчёркивает, что пункт — это действие.

## HTML

```html
<button type="button" class="list-item list-item-menu list-item--400">
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
| Rest | `transparent` | `transparent` | `secondary-container-on-highest` | `secondary-container-on-high` |
| Hover | `surface-surface` | `surface-surface` | `accent-container-on` | `accent-container-on` |
| Focus | `transparent` | `transparent` | `secondary-container-on-highest` | `secondary-container-on-high` |
| Active | `surface-surface` | `surface-surface` | `accent-container-on` | `accent-container-on` |

Галочка (`.list-item__check`): `primary-container-on-lowest` в покое, `accent-container-on-lowest` при наведении.

## Замечания

**Пара с `menu-selected`** — текущий пункт меню.

**Фон при наведении — `surface-surface`, а не `secondary-container-core`.** Роли разные, хотя в этой палитре значения совпадают (`#f7f7f7`). На сайте с другой палитрой они могут разойтись, поэтому подменять одну другой нельзя.

**Контейнеру нужна роль.** Само меню — `role="menu"`, пункты — `role="menuitem"`; компонент их не проставляет.

## Геометрия, состояния, слоты

Общие для всей семьи и описаны в [SKILL.md](../SKILL.md): высота `2 × padding + line-height`, переключение горизонтали от слотов, `align-items: flex-start`, кольцо фокуса `surface-on-highest` с offset 1px, disabled — `opacity: 40%`.

## Refresh

```
обнови awds-component-list-item под Figma
```
