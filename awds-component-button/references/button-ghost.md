# Button / Ghost

**Figma:** [rRCDPR2SJ90wJZCr5rsXAd → node 489:94401](https://www.figma.com/design/rRCDPR2SJ90wJZCr5rsXAd/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B2-Buttons?node-id=489-94401)

Текстовая кнопка без фона и обводки — минимальный визуальный вес. Для третьестепенных действий, тулбаров, «Отмена» рядом с заполненной кнопкой.

Всё на токенах. Фон/обводка — `transparent` во всех состояниях; цвет текста → роли `rgb(var(--surface-on-high/-highest))` inline в селекторах (RGB-триплеты сайта); размеры → семантические shape-токены `var(--awds-rectangle-{N}-*)`; фокус → `rgb(var(--surface-on-highest))`; disabled → `var(--awds-opacity-40)`. Реальную палитру задаёт сайт через `css-variables.css`.

Геометрия, base-механика, loading, icon-only — общие с Primary; `button-ghost.css` самодостаточен (содержит base + sizes), отличается только блоком цветовых ролей варианта.

---

## HTML

### Только текст
```html
<button class="btn btn-ghost btn--400" type="button">
  Текст кнопки
</button>
```

### Иконка слева
```html
<button class="btn btn-ghost btn--400" type="button">
  <svg width="20" height="20" aria-hidden="true"><!-- icon --></svg>
  Текст кнопки
</button>
```

### Иконка справа
```html
<button class="btn btn-ghost btn--400" type="button">
  Текст кнопки
  <svg width="20" height="20" aria-hidden="true"><!-- icon --></svg>
</button>
```

### Только иконка (квадратная)
```html
<button class="btn btn-ghost btn--400 btn--icon-only" type="button" aria-label="Действие">
  <svg width="20" height="20" aria-hidden="true"><!-- icon --></svg>
</button>
```

### Состояние загрузки

Контент в `.btn__content` (скрывается через `visibility: hidden` — сохраняет ширину). Поверх абсолютно центрируется `.btn__progress` размером `--awds-btn-icon`.

```html
<button class="btn btn-ghost btn--400 btn--loading" type="button" disabled aria-busy="true">
  <span class="btn__content">Загрузка…</span>
  <svg class="btn__progress" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2.5"
            stroke-dasharray="40 60" stroke-linecap="round"/>
  </svg>
</button>
```

### Как ссылка
```html
<a class="btn btn-ghost btn--400" href="/action">
  Текст кнопки
</a>
```

---

## CSS — модель токенов

Полный код — `references/button-ghost.css`. Три уровня: site colors / семантические shape size-токены → приватные аккумуляторы `--awds-btn-*` → CSS-свойства в `.btn`. Base и size-классы идентичны Primary; ниже — только блок варианта.

### Variant (`.btn-ghost`)
Фон/обводка прозрачны; меняется только цвет текста по состоянию:

```css
.btn-ghost               { --awds-btn-bg: transparent; --awds-btn-border: transparent; --awds-btn-color: rgb(var(--surface-on-high)); }
.btn-ghost:hover         { --awds-btn-color: rgb(var(--surface-on-highest)); /* текст темнеет */ }
.btn-ghost:focus-visible { --awds-btn-color: rgb(var(--surface-on-highest)); }
.btn-ghost:active        { --awds-btn-color: rgb(var(--surface-on-highest)); }
```

---

## Размеры (map.size.rectangle)

Идентичны Primary (shape=rectangle, та же геометрия):

| size | padding | gap | icon | rounded | typography |
|---|---|---|---|---|---|
| 50  | space-0-5 | space-0-5 | space-4 | rounded-50  | control-200 |
| 100 | space-1   | space-0-5 | space-4 | rounded-100 | control-300 |
| 200 | space-2   | space-1   | space-4 | rounded-200 | control-300 |
| 300 | space-2   | space-1-5 | space-5 | rounded-300 | control-400 |
| 400 | space-2-5 | space-1-5 | space-5 | rounded-400 | control-400 |
| 500 | space-3-5 | space-1-5 | space-5 | rounded-500 | control-600 |
| 600 | space-4   | space-2   | space-5 | rounded-600 | control-600 |

---

## Состояния

| Состояние | `--awds-btn-bg` | `--awds-btn-border` | `--awds-btn-color` |
|---|---|---|---|
| Rest    | `transparent` | `transparent` | `--surface-on-high` |
| Hover   | `transparent` | `transparent` | `--surface-on-highest` |
| Focus   | `transparent` | `transparent` | `--surface-on-highest` |
| Active  | `transparent` | `transparent` | `--surface-on-highest` |
| Disabled| Rest + `opacity: var(--awds-opacity-40)` (= 40%) | | |
| Loading | Rest + контент `visibility: hidden`, поверх `.btn__progress` размером `--awds-btn-icon` | | |

Фокус-обводка: `outline: 2px solid rgb(var(--surface-on-highest)); outline-offset: 2px` — роль `surface-on-highest` (из `focus-selection/outline`), общая для всех интерактивных элементов сайта.

Единственный визуальный сигнал состояния — потемнение текста (`surface-on-high` → `surface-on-highest`); фон и обводка прозрачны всегда.

---

## Модель padding'а (соответствие Figma)

Та же, что у Primary: контейнер + 3 ячейки (`Prefix | Text | Suffix`). Реализовано плоским flex:

- `padding-block: --awds-btn-padding`
- `padding-inline: calc(--awds-btn-padding + --awds-btn-gap)`
- `gap: --awds-btn-gap`

Для `.btn--icon-only` — детерминированный квадрат `width = height = icon + 2*padding`.

---

## Полировка (MIFB)

- **Плавная смена состояний.** Цвет текста анимируется через `transition: color 0.15s ease-out` (прерываемо, без `transition: all`). Фон-аккумуляторы `@property` остаются `transparent` — без визуального эффекта, но единая механика с заполненными вариантами. Спиннер — `@keyframes` + `will-change: transform`.
- **Живые числа в кнопке** — оберни число в `<span style="font-variant-numeric: tabular-nums">`. На обычный текстовый лейбл `tabular-nums` не вешаем (MIFB-принцип 5).
- **Радиусы** — из макета (`--awds-rounded-*` по размеру), хотя на прозрачном фоне они незаметны (видны только на фокус-обводке/при наведении, если добавить hover-фон).

---

> **Генерится `arrow-components-builder`.** `button-ghost.css`, `preview.html`, `component.meta.json`, `snapshot/` — ACB-owned, руками не править (затрётся при «обнови awds-component-button»). Правки разметки/состояний — через Figma → refresh. Открой `references/preview.html` (`file://`) для визуального QA.
