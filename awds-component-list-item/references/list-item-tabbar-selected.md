# List-item / Tabbar-selected

**Figma:** [470rar5EfRm4n14vHMXbpc → набор 8:60712](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=8-60712)
**Роль токенов:** `list/tabbar-selected`

> [!NOTE]
> Этот файл — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`list-item-tabbar-selected.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## Когда

Активная вкладка нижней панели: акцентный текст без фона. Показывает, где пользователь находится сейчас.

## HTML

```html
<button type="button" class="list-item list-item-tabbar-selected list-item--400">
  <span class="list-item__prefix" aria-hidden="true">
    <svg viewBox="0 0 20 20" fill="currentColor"><path d="M3 9l7-6 7 6v8a1 1 0 0 1-1 1h-4v-5H8v5H4a1 1 0 0 1-1-1z"/></svg>
  </span>
  <span class="list-item__content">
    <span class="list-item__title">Главная</span>
  </span>
</button>
```

## Цвета

| Состояние | Фон | Рамка | Заголовок | Описание |
|---|---|---|---|---|
| Rest | `transparent` | `transparent` | `accent-core` | `accent-core` |
| Hover | `transparent` | `transparent` | `accent-core` | `accent-core` |
| Focus | `transparent` | `transparent` | `accent-core` | `accent-core` |
| Active | `transparent` | `transparent` | `accent-core` | `accent-core` |

Галочка (`.list-item__check`): `accent-core` в покое, `accent-core` при наведении.

## Замечания

**Активная вкладка отличается от неактивной только цветом текста.** Ни фона, ни подчёркивания в макете нет. Цвет — единственный признак, а это ровно тот случай, который WCAG 1.4.1 просит не оставлять единственным. Практический выход, который применяют в tabbar: заливать иконку активной вкладки (filled), а у неактивной оставлять контурную — тогда состояние читается и по форме. Разметка это позволяет: иконка задаётся автором.

**Текущую вкладку объяви программно** — `aria-current="page"` на строке.

## Геометрия, состояния, слоты

Общие для всей семьи и описаны в [SKILL.md](../SKILL.md): высота `2 × padding + line-height`, переключение горизонтали от слотов, `align-items: flex-start`, кольцо фокуса `primary-core` вписано в бокс (Inside + Accent), disabled — `opacity: 40%`.

## Refresh

```
обнови awds-component-list-item под Figma
```
