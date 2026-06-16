# Button / Contrast

**Figma:** [rRCDPR2SJ90wJZCr5rsXAd → node 489:83105](https://www.figma.com/design/rRCDPR2SJ90wJZCr5rsXAd/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B2-Buttons?node-id=489-83105)

Высококонтрастная «чернильная» кнопка — тёмная поверхность на светлом фоне (или инверсия). Максимальный визуальный вес, когда нужно выбить действие из общего ритма.

Всё на токенах. Цвета → роли `rgb(var(--surface-*))` inline в селекторах (RGB-триплеты сайта); размеры → семантические shape-токены `var(--awds-rectangle-{N}-*)` (маппинг из `component-token-map.json`, определены в css-global); фокус → `rgb(var(--surface-on-highest))`; disabled → `var(--awds-opacity-40)`. Реальную палитру задаёт сайт через `css-variables.css`; базовые шкалы и шрифт зашиты на сайте (зеркало — `arrow-design-system/references/css-global.css`).

Contrast строится на ролях **surface** (`surface-on-highest` для фона, `surface-bright` для текста), а не на отдельном семействе `--contrast-*`. Геометрия, base-механика, loading, icon-only — общие с Primary; `button-contrast.css` самодостаточен (содержит base + sizes), отличается только блоком цветовых ролей варианта.

---

## HTML

### Только текст
```html
<button class="btn btn-contrast btn--400" type="button">
  Текст кнопки
</button>
```

### Иконка слева
```html
<button class="btn btn-contrast btn--400" type="button">
  <svg width="20" height="20" aria-hidden="true"><!-- icon --></svg>
  Текст кнопки
</button>
```

### Иконка справа
```html
<button class="btn btn-contrast btn--400" type="button">
  Текст кнопки
  <svg width="20" height="20" aria-hidden="true"><!-- icon --></svg>
</button>
```

### Только иконка (квадратная)
```html
<button class="btn btn-contrast btn--400 btn--icon-only" type="button" aria-label="Действие">
  <svg width="20" height="20" aria-hidden="true"><!-- icon --></svg>
</button>
```

### Состояние загрузки

Контент в `.btn__content` (скрывается через `visibility: hidden` — сохраняет ширину). Поверх абсолютно центрируется `.btn__progress` размером `--awds-btn-icon`.

```html
<button class="btn btn-contrast btn--400 btn--loading" type="button" disabled aria-busy="true">
  <span class="btn__content">Загрузка…</span>
  <svg class="btn__progress" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2.5"
            stroke-dasharray="40 60" stroke-linecap="round"/>
  </svg>
</button>
```

### Как ссылка
```html
<a class="btn btn-contrast btn--400" href="/action">
  Текст кнопки
</a>
```

---

## CSS — модель токенов

Полный код — `references/button-contrast.css`. Три уровня: site colors / семантические shape size-токены → приватные аккумуляторы `--awds-btn-*` → CSS-свойства в `.btn`. Base и size-классы идентичны Primary; ниже — только блок варианта.

### Variant (`.btn-contrast`)
Заполняет цветовые аккумуляторы inline-ролями surface, по состоянию:

```css
.btn-contrast               { --awds-btn-bg: rgb(var(--surface-on-highest)); --awds-btn-chroma: rgb(var(--surface-on-high)); --awds-btn-color: rgb(var(--surface-bright)); }
.btn-contrast:hover         { --awds-btn-chroma: rgb(var(--surface-on-highest)); /* плоский уже на hover */ }
.btn-contrast:focus-visible { --awds-btn-chroma: rgb(var(--surface-on-high)); /* = rest */ }
.btn-contrast:active        { --awds-btn-chroma: rgb(var(--surface-on-highest)); /* плоский */ }
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

| Состояние | `--awds-btn-bg` | `--awds-btn-chroma` | `--awds-btn-border` | `--awds-btn-color` |
|---|---|---|---|---|
| Rest    | `--surface-on-highest` | `--surface-on-high`    | `--surface-on-highest` | `--surface-bright` |
| Hover   | `--surface-on-highest` | `--surface-on-highest` | `--surface-on-highest` | `--surface-bright` |
| Focus   | `--surface-on-highest` | `--surface-on-high`    | `--surface-on-highest` | `--surface-bright` |
| Active  | `--surface-on-highest` | `--surface-on-highest` | `--surface-on-highest` | `--surface-bright` |
| Disabled| Rest + `opacity: var(--awds-opacity-40)` (= 40%) | | | |
| Loading | Rest + контент `visibility: hidden`, поверх `.btn__progress` размером `--awds-btn-icon` | | | |

Фокус-обводка: `outline: 2px solid rgb(var(--surface-on-highest)); outline-offset: 2px` — роль `surface-on-highest`, общая для всех интерактивных элементов сайта.

**Отличие от других вариантов:** chroma схлопывается в bg уже на `Hover` (а не только на `Active`), поэтому едва заметный градиент виден только в `Rest`/`Focus`.

---

## Модель padding'а (соответствие Figma)

Та же, что у Primary: контейнер + 3 ячейки (`Prefix | Text | Suffix`). Реализовано плоским flex:

- `padding-block: --awds-btn-padding`
- `padding-inline: calc(--awds-btn-padding + --awds-btn-gap)`
- `gap: --awds-btn-gap`

Для `.btn--icon-only` — квадрат с `padding: --awds-btn-padding` со всех сторон.

---

## Полировка (MIFB)

- **Плавная смена состояний.** `--awds-btn-bg` / `--awds-btn-chroma` зарегистрированы через `@property` как `<color>`, поэтому фон-градиент интерполируется при hover/active (а не «снапает»). Переходы — `0.15s ease-out` по конкретным свойствам (не `transition: all`), прерываемые. Спиннер — `@keyframes` + `will-change: transform` (единственный валидный loop-кейс).
- **Живые числа в кнопке** — оберни число в `<span style="font-variant-numeric: tabular-nums">`, чтобы цифры не «прыгали». На обычный текстовый лейбл `tabular-nums` не вешаем (MIFB-принцип 5).
- **Радиусы** — из макета (`--awds-rounded-*` по размеру), концентрию руками не считаем: есть Figma.

---

> **Генерится `arrow-components-builder`.** `button-contrast.css`, `preview.html`, `component.meta.json`, `snapshot/` — ACB-owned, руками не править (затрётся при «обнови awds-component-button»). Правки разметки/состояний — через Figma → refresh. Открой `references/preview.html` (`file://`) для визуального QA.
