# List-item / Variaton

**Figma:** [cPyLl9CqwylgJMzMzeyF5g → node 324:77087](https://www.figma.com/design/cPyLl9CqwylgJMzMzeyF5g/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B4-Lists?node-id=324-77087)
**Роль токенов:** `list/unselected-variation`

> [!NOTE]
> Этот файл — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`list-item-variation.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## Когда

Строка-вариация товара: цвет, размер, комплектация. **Всегда с описанием** — в макете у этого семейства две строки текста во всех размерах, отсюда и высоты 74/70/58/54/50/42/38.

Обводка по контуру превращает строку в плитку выбора. При наведении вся плитка уходит в бренд — фон, рамка и текст меняются разом.

## HTML

```html
<button type="button" class="list-item list-item-variation list-item--400">
  <span class="list-item__content">
    <span class="list-item__title">Чёрный, 256 ГБ</span>
    <span class="list-item__description">В наличии, 12 900 ₸</span>
  </span>
</button>
```

## Цвета

| Состояние | Фон | Рамка | Заголовок | Описание |
|---|---|---|---|---|
| Rest | `secondary-container-core` | `secondary-container-on-lowest` | `secondary-container-on-high` | `secondary-container-on` |
| Hover | `primary-container-core` | `primary-core` | `primary-container-on-highest` | `secondary-container-on-high` |
| Focus | `secondary-container-core` | `secondary-container-on-lowest` | `secondary-container-on-high` | `secondary-container-on-high` |
| Active | `secondary-container-core` | `secondary-container-on-lowest` | `secondary-container-on-high` | `secondary-container-on-high` |

Галочка (`.list-item__check`): `transparent` в покое.

## Замечания

**Описание здесь обязательно, а не опционально.** Все ячейки макета — двухстрочные; без второй строки геометрия совпадёт с обычной строкой и плитка потеряет пропорцию.

**Тройка с `variation-selected` и `variation-indeterminate`.** Невыбранная, выбранная и неопределённая вариации — один набор, используются вместе.

**Описание привязано к `list/unselected/description`**, а не к собственной роли вариации. Так в макете, проверено в Rest, Hover и Focus.

## Контраст

- Описание в состоянии **Rest**: `secondary-container-on` (#808080) на `secondary-container-core` (#f7f7f7) — **3.69:1** при норме 4.5:1.

Это свойство ролей дизайн-системы, а не вёрстки — чинится в токенах, не здесь.

## Геометрия, состояния, слоты

Общие для всей семьи и описаны в [SKILL.md](../SKILL.md): высота `2 × padding + line-height`, переключение горизонтали от слотов, `align-items: flex-start`, кольцо фокуса `surface-on-highest` с offset 1px, disabled — `opacity: 40%`.

## Refresh

```
обнови awds-component-list-item под Figma
```
