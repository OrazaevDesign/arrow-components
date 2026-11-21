# List-item / Actual-selected

**Figma:** [470rar5EfRm4n14vHMXbpc → набор 8:59972](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=8-59972)
**Роль токенов:** `list/actual-selected`

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
| Rest | `transparent` | `secondary-container-on-lowest` | `accent-container-on-highest` | `accent-container-on-highest` |
| Hover | `secondary-container-core` | `secondary-container-on-lowest` | `accent-container-on-highest` | `accent-container-on-highest` |
| Focus | `transparent` | `secondary-container-on-lowest` | `accent-container-on-highest` | `accent-container-on-highest` |
| Active | `transparent` | `secondary-container-on-lowest` | `accent-container-on-highest` | `accent-container-on-highest` |

Галочка (`.list-item__check`): `accent-container-on-highest` в покое.

## Замечания

**Меняется только фон при наведении** — обводка и текст остаются на месте. Строка не «загорается», а лишь показывает, что она кликабельна.

**Акцентный текст здесь не значит «ошибка».** Роль `accent-container-on-highest` — тёмный тон акцента, в палитре shopotam красный, но семантика у неё — «актуальное, текущее». Под ошибку берётся роль `error-*`, и такого варианта в этом Component Set нет.

## Контраст

С 20.11.2026 текст, описание, иконки, галочка и шеврон трёх выбранных вариантов (`menu-selected`, `tabbar-selected`, `actual-selected`) идут на `accent-container-on-highest`, а не на `accent-core`. Замер по локальной студии, светлая тема:

| Фон | `accent-core` (было) | `accent-container-on-highest` (стало) |
|---|---|---|
| `secondary-container-core` (наведение, `menu-selected`) | 3.93 корень · 4.12 shopotam | 5.10 · 5.23 |
| белый фон страницы (`transparent`) | 4.28 · 4.49 | 5.56 · 5.70 |

Норма 4.5:1. В тёмном островке новая роль даёт 4.89 на корне и 4.45 на shopotam — сайты сейчас живут в светлой теме. Поводом стала проверка рамки справки `awds-doc-layout` на shopotam: пункт дерева давал 4.02:1.

## Геометрия, состояния, слоты

Общие для всей семьи и описаны в [SKILL.md](../SKILL.md): высота `2 × padding + line-height`, переключение горизонтали от слотов, `align-items: flex-start`, кольцо фокуса `primary-core` вписано в бокс (Inside + Accent), disabled — `opacity: 40%`.

## Refresh

```
обнови awds-component-list-item под Figma
```
