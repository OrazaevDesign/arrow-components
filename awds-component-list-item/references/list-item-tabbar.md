# List-item / Tabbar

**Figma:** [470rar5EfRm4n14vHMXbpc → набор 853:143851](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=853-143851)
**Роль токенов:** `list/tabbar`

> [!NOTE]
> Этот файл — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`list-item-tabbar.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## Когда

Вкладка нижней панели мобильного интерфейса — неактивная. Без фона и рамки: панель держит форму сама, во вкладке только иконка и подпись.

Не для обычных списков: у вкладки своя раскладка (иконка над подписью) и своя логика отклика — при наведении и в фокусе меняется цвет, подложка появляется только под нажатием.

## HTML

```html
<nav class="tabbar" aria-label="Разделы">
  <a href="/catalog" class="list-item list-item-tabbar">
    <span class="list-item__prefix" aria-hidden="true">
      <svg viewBox="0 0 20 20" fill="currentColor">…</svg>
      <span class="notice notice-accent">3</span>   <!-- счётчик, необязательный -->
    </span>
    <span class="list-item__content">
      <span class="list-item__title">Каталог</span>
    </span>
  </a>
</nav>
```

## Цвета

| Состояние | Фон | Рамка | Подпись и иконка |
|---|---|---|---|
| Rest | `transparent` | `transparent` | `secondary-container-on-high` |
| Hover | `transparent` | `transparent` | `accent-core` |
| Focus | `transparent` | `transparent` | `accent-core` — как hover: ячейки `color-focus` в студии нет |
| Active | `surface-surface` | `surface-surface` | `accent-core` |
| Disabled | как Rest | | прозрачность 40% |

## Геометрия

С 2.0.0 (28.09.2026) вкладка панели устроена иначе, чем остальная семья, и **size-классы
`.list-item--{N}` на ней не действуют**: панель одна на экран и вместе со списком не
масштабируется.

| | Значение |
|---|---|
| Раскладка | столбец: иконка над подписью, по центру |
| Отступ | `var(--awds-space-1-5)` (6px) со всех сторон; в макете привязан к шкале, ступени Size нет |
| Иконка | `var(--awds-space-5)` (20px, `square/400/icon`), красится цветом подписи |
| Подпись | control 100 (12/16), regular, в одну строку |
| Ширина | от 56 (слоты минимум 44 + отступы) и по содержимому; высота 48, без подписи — 32 |
| Скругление | `var(--awds-rounded-border-radius-400)` — под ним фон нажатой вкладки и кольцо фокуса |
| Фокус | кольцо `default` (не `accent`), вписано в бокс |

**Только иконка** — та же разметка без `.list-item__content` (в макете `content=icon`).
Своего класса нет: без подписи вкладка сама становится 56 × 32. Подпись тогда нужна в
`aria-label` на кнопке.

**Счётчик** — компонент [notice](../../awds-component-notice/SKILL.md) внутри
`.list-item__prefix`, класс ступени не нужен: 200-ю ступень раздаёт мост. Встаёт как в
макете: на 12 от левого края иконки и на 6 выше неё.

**Панель делит ширину контейнер**: оберни вкладки во flex и дай каждой `flex: 1`.
Подпись не переносится, поэтому длинная вкладка раздвигает панель, а не рвёт слово.

## Пара

`tabbar-selected` — выбранная вкладка той же панели: раскладка одна, различаются только цвета.

## Refresh

```
обнови awds-component-list-item под Figma
```
