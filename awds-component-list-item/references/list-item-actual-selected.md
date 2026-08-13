# List-item / Actual-selected

**Figma:** [cPyLl9CqwylgJMzMzeyF5g → node 590:20399](https://www.figma.com/design/cPyLl9CqwylgJMzMzeyF5g/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B4-Lists?node-id=590-20399)
**Роль токенов:** `list/unselected-actual`

> [!NOTE]
> Этот файл — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`list-item-actual-selected.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## Когда

Строка «актуального» значения: прозрачный фон, серая обводка по контуру и акцентный текст. Так помечают текущее, действующее значение — активный тариф, текущий адрес, применённый фильтр.

Обводка отделяет строку от соседей, не заливая её: список остаётся спокойным, а одна строка всё равно выделена.

## HTML

```html
<button type="button" class="list-item list-item-actual-selected list-item--400">
  <span class="list-item__content">
    <span class="list-item__title">Тариф «Базовый»</span>
    <span class="list-item__description">Действует до 30 сентября</span>
  </span>
</button>
```

## Цвета

| Состояние | Фон | Рамка | Заголовок | Описание |
|---|---|---|---|---|
| Rest | `transparent` | `secondary-container-on-lowest` | `accent-container-on` | `accent-container-on-low` |
| Hover | `secondary-container-core` | `secondary-container-on-lowest` | `accent-container-on` | `accent-container-on-low` |
| Focus | `transparent` | `secondary-container-on-lowest` | `accent-container-on` | `accent-container-on-low` |
| Active | `transparent` | `secondary-container-on-lowest` | `accent-container-on` | `accent-container-on-low` |

Галочка (`.list-item__check`): `primary-container-on-lowest` в покое.

## Замечания

**Меняется только фон при наведении** — обводка и текст остаются на месте. Строка не «загорается», а лишь показывает, что она кликабельна.

**Акцентный текст здесь не значит «ошибка».** Роль `accent-container-on` в этой палитре красная, но семантика у неё — «актуальное, текущее». Под ошибку берётся роль `error-*`, и такого варианта в этом Component Set нет.

## Контраст

- Описание в состоянии **Rest**: `accent-container-on-low` (#eea28b) на `transparent` (фон страницы, взят белый) — **2.06:1** при норме 4.5:1.
- Описание в состоянии **Hover**: `accent-container-on-low` (#eea28b) на `secondary-container-core` (#f7f7f7) — **1.93:1** при норме 4.5:1.

Это свойство ролей дизайн-системы, а не вёрстки — чинится в токенах, не здесь.

## Геометрия, состояния, слоты

Общие для всей семьи и описаны в [SKILL.md](../SKILL.md): высота `2 × padding + line-height`, переключение горизонтали от слотов, `align-items: flex-start`, кольцо фокуса `surface-on-highest` с offset 1px, disabled — `opacity: 40%`.

## Refresh

```
обнови awds-component-list-item под Figma
```
