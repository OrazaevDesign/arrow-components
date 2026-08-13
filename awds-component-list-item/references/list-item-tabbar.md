# List-item / Tabbar

**Figma:** [cPyLl9CqwylgJMzMzeyF5g → node 590:20402](https://www.figma.com/design/cPyLl9CqwylgJMzMzeyF5g/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B4-Lists?node-id=590-20402)
**Роль токенов:** `list/unselected-tabbar`

> [!NOTE]
> Этот файл — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`list-item-tabbar.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## Когда

Пункт нижней панели вкладок в мобильном интерфейсе — неактивная вкладка. Без фона и рамки: панель держит форму сама, а строки в ней только текст с иконкой.

Не для обычных списков: у tabbar своя логика отклика — при наведении меняется цвет текста, а подложка появляется только под нажатием.

## HTML

```html
<button type="button" class="list-item list-item-tabbar list-item--400">
  <span class="list-item__prefix" aria-hidden="true">
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 9l7-6 7 6v8a1 1 0 0 1-1 1h-4v-5H8v5H4a1 1 0 0 1-1-1z"/></svg>
  </span>
  <span class="list-item__content">
    <span class="list-item__title">Главная</span>
  </span>
</button>
```

## Цвета

| Состояние | Фон | Рамка | Заголовок | Описание |
|---|---|---|---|---|
| Rest | `transparent` | `transparent` | `secondary-container-on-highest` | `secondary-container-on-high` |
| Hover | `transparent` | `transparent` | `accent-container-on` | `accent-container-on` |
| Focus | `transparent` | `transparent` | `secondary-container-on-highest` | `secondary-container-on-high` |
| Active | `surface-surface` | `surface-surface` | `accent-container-on` | `accent-container-on` |

Галочка (`.list-item__check`): `primary-container-on-lowest` в покое, `accent-container-on-lowest` при наведении.

## Замечания

**Пара с `tabbar-selected`.** Активная вкладка — отдельный вариант, у которого акцентный текст стоит уже в покое.

**Иконка красится `currentColor`** и потому уходит в акцент вместе с текстом — так и задумано: во вкладке иконка и подпись читаются как одно целое.

**Ширину в панели задаёт контейнер.** Строка тянется на 100%; чтобы вкладки поделили панель поровну, оберни их во flex с `flex: 1` на каждой.

## Геометрия, состояния, слоты

Общие для всей семьи и описаны в [SKILL.md](../SKILL.md): высота `2 × padding + line-height`, переключение горизонтали от слотов, `align-items: flex-start`, кольцо фокуса `surface-on-highest` с offset 1px, disabled — `opacity: 40%`.

## Refresh

```
обнови awds-component-list-item под Figma
```
