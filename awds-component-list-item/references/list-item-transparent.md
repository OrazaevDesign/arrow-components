# List-item / Transparent

**Figma:** [cPyLl9CqwylgJMzMzeyF5g → node 1:22254](https://www.figma.com/design/cPyLl9CqwylgJMzMzeyF5g/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B4-Lists?node-id=1-22254)
**Роль токенов:** `list/unselected-transparent`

> [!NOTE]
> Этот файл — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`list-item-transparent.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## Когда

Строка без собственного фона: подсветка появляется только под курсором. Это база для меню и пунктов попапа поверх **готовой поверхности** — панели дропдауна, карточки, сайдбара.

Не берётся, если строка живёт на голом фоне страницы и должна читаться как отдельный объект: в покое она визуально ничем не отделена от соседей. Для этого — `default` с постоянной подложкой.

Не берётся для табличных данных: как только колонок больше одной и их надо сравнивать по вертикали, это таблица (`awds-component-table`), а не список.

## HTML

```html
<button type="button" class="list-item list-item-transparent list-item--400">
  <span class="list-item__prefix" aria-hidden="true">
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M10 17s6-5.4 6-9.4a6 6 0 1 0-12 0C4 11.6 10 17 10 17z"/><circle cx="10" cy="7.5" r="2"/></svg>
  </span>
  <span class="list-item__content">
    <span class="list-item__title">Алматы</span>
    <span class="list-item__description">Казахстан</span>
  </span>
</button>
```

## Цвета

| Состояние | Фон | Рамка | Заголовок | Описание |
|---|---|---|---|---|
| Rest | `transparent` | `transparent` | `secondary-container-on-highest` | `secondary-container-on` |
| Hover | `secondary-container-core` | `secondary-container-core` | `secondary-container-on-highest` | `secondary-container-on-high` |
| Focus | `transparent` | `transparent` | `secondary-container-on-highest` | `secondary-container-on-high` |
| Active | `transparent` | `transparent` | `secondary-container-on-highest` | `secondary-container-on-high` |

Галочка (`.list-item__check`): `primary-container-on-lowest` в покое.

## Замечания

**Самый нейтральный вариант семейства.** Кроме кольца фокуса и подсветки под курсором он не рисует ничего — вся визуальная работа остаётся за поверхностью, на которой он лежит.

**Описание привязано к роли `list/unselected/description`,** а не к собственной `unselected-transparent/description`. Так в макете; проверено в Rest, Hover и Focus у этого семейства и у `variation`. Практическое следствие — цвет описания **меняется по состоянию**: в покое приглушённый, при наведении и фокусе темнее.

**Иконки в слотах красятся `currentColor`,** то есть уходят в цвет заголовка. Если иконка должна остаться нейтральной при смене состояния, задай ей цвет явно.

## Контраст

- Описание в состоянии **Rest**: `secondary-container-on` (#808080) на `transparent` (фон страницы, взят белый) — **3.95:1** при норме 4.5:1.

Это свойство ролей дизайн-системы, а не вёрстки — чинится в токенах, не здесь.

## Геометрия, состояния, слоты

Общие для всей семьи и описаны в [SKILL.md](../SKILL.md): высота `2 × padding + line-height`, переключение горизонтали от слотов, `align-items: flex-start`, кольцо фокуса `surface-on-highest` с offset 1px, disabled — `opacity: 40%`.

## Refresh

```
обнови awds-component-list-item под Figma
```
