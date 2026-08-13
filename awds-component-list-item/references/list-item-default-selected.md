# List-item / Default-selected

**Figma:** [cPyLl9CqwylgJMzMzeyF5g → node 590:20401](https://www.figma.com/design/cPyLl9CqwylgJMzMzeyF5g/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B4-Lists?node-id=590-20401)
**Роль токенов:** `list/selected`

> [!NOTE]
> Этот файл — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`list-item-default-selected.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## Когда

Выбранный пункт того же списка, что и `default`. Подложка та же, но текст выходит на полный контраст — так показывается выбор.

Выбор здесь несёт **только контраст текста**, без заливки и рамки. Если выбор должен быть заметен с одного взгляда через весь экран — бери `accent-selected` с брендовой заливкой.

## HTML

```html
<button type="button" class="list-item list-item-default-selected list-item--400">
  <span class="list-item__content">
    <span class="list-item__title">Алматы</span>
  </span>
  <span class="list-item__suffix" aria-hidden="true">
    <svg class="list-item__check" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m4 10 4 4 8-8"/></svg>
  </span>
</button>
```

## Цвета

| Состояние | Фон | Рамка | Заголовок | Описание |
|---|---|---|---|---|
| Rest | `secondary-container-core` | `secondary-container-core` | `secondary-container-on-highest` | `secondary-container-on-high` |
| Hover | `secondary-container-dim` | `secondary-container-dim` | `secondary-container-on-highest` | `secondary-container-on-high` |
| Focus | `secondary-container-core` | `secondary-container-core` | `secondary-container-on-highest` | `secondary-container-on-high` |
| Active | `secondary-container-core` | `secondary-container-core` | `secondary-container-on-highest` | `secondary-container-on-high` |

Галочка (`.list-item__check`): `secondary-container-on` в покое.

## Замечания

**Один контраст текста — слабый признак выбора.** В паре `default` / `default-selected` разница между невыбранным и выбранным сводится к цвету заголовка. Если строка выбирается мышью и результат надо считывать быстро, добавь галочку в `suffix` — под неё в этом варианте уже заведена роль `icon-check`.

**Выбор надо объявить и программно**, не только цветом: `aria-selected="true"` на строке в `role="listbox"` или `aria-current` в навигации.

## Геометрия, состояния, слоты

Общие для всей семьи и описаны в [SKILL.md](../SKILL.md): высота `2 × padding + line-height`, переключение горизонтали от слотов, `align-items: flex-start`, кольцо фокуса `surface-on-highest` с offset 1px, disabled — `opacity: 40%`.

## Refresh

```
обнови awds-component-list-item под Figma
```
