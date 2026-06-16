# Button / Secondary

**Figma:** [rRCDPR2SJ90wJZCr5rsXAd → node 489:59661](https://www.figma.com/design/rRCDPR2SJ90wJZCr5rsXAd/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B2-Buttons?node-id=489-59661)

Второстепенное действие рядом с Primary — приглушённая поверхность. Можно несколько на экране; Primary при этом остаётся одна.

Всё на токенах. Цвета → роли `rgb(var(--secondary-*))` inline в селекторах (RGB-триплеты сайта); размеры → семантические shape-токены `var(--awds-rectangle-{N}-*)` (маппинг из `component-token-map.json`, определены в css-global); фокус → `rgb(var(--surface-on-highest))`; disabled → `var(--awds-opacity-40)`. Реальную палитру задаёт сайт через `css-variables.css`; базовые шкалы и шрифт зашиты на сайте (зеркало — `arrow-design-system/references/css-global.css`).

Геометрия, base-механика, loading, icon-only — общие с Primary; `button-secondary.css` самодостаточен (содержит base + sizes), отличается только блоком цветовых ролей варианта.

---

## HTML

### Только текст
```html
<button class="btn btn-secondary btn--400" type="button">
  Текст кнопки
</button>
```

### Иконка слева
```html
<button class="btn btn-secondary btn--400" type="button">
  <svg width="20" height="20" aria-hidden="true"><!-- icon --></svg>
  Текст кнопки
</button>
```

### Иконка справа
```html
<button class="btn btn-secondary btn--400" type="button">
  Текст кнопки
  <svg width="20" height="20" aria-hidden="true"><!-- icon --></svg>
</button>
```

### Только иконка (квадратная)
```html
<button class="btn btn-secondary btn--400 btn--icon-only" type="button" aria-label="Действие">
  <svg width="20" height="20" aria-hidden="true"><!-- icon --></svg>
</button>
```

### Состояние загрузки

Контент в `.btn__content` (скрывается через `visibility: hidden` — сохраняет ширину). Поверх абсолютно центрируется `.btn__progress` размером `--awds-btn-icon`.

```html
<button class="btn btn-secondary btn--400 btn--loading" type="button" disabled aria-busy="true">
  <span class="btn__content">Загрузка…</span>
  <svg class="btn__progress" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2.5"
            stroke-dasharray="40 60" stroke-linecap="round"/>
  </svg>
</button>
```

### Как ссылка
```html
<a class="btn btn-secondary btn--400" href="/action">
  Текст кнопки
</a>
```

---

## CSS — модель токенов

Полный код — `references/button-secondary.css`. Три уровня: site colors / семантические shape size-токены → приватные аккумуляторы `--awds-btn-*` → CSS-свойства в `.btn`. Base и size-классы идентичны Primary; ниже — только блок варианта.

### Variant (`.btn-secondary`)
Заполняет цветовые аккумуляторы inline-ролями, по состоянию:

```css
.btn-secondary               { --awds-btn-bg: rgb(var(--secondary-core)); /* chroma/border/color */ }
.btn-secondary:hover         { --awds-btn-bg: rgb(var(--secondary-dim));  --awds-btn-border: rgb(var(--secondary-dim)); }
.btn-secondary:focus-visible { --awds-btn-bg: rgb(var(--secondary-core)); }
.btn-secondary:active        { --awds-btn-bg: rgb(var(--secondary-core)); --awds-btn-chroma: rgb(var(--secondary-core)); /* плоский */ }
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
| Rest    | `--secondary-core` | `--secondary-chroma` | `--secondary-core` | `--secondary-on` |
| Hover   | `--secondary-dim`  | `--secondary-chroma` | `--secondary-dim`  | `--secondary-on` |
| Focus   | `--secondary-core` | `--secondary-chroma` | `--secondary-core` | `--secondary-on` |
| Active  | `--secondary-core` | `--secondary-core`   | `--secondary-core` | `--secondary-on` |
| Disabled| Rest + `opacity: var(--awds-opacity-40)` (= 40%) | | | |
| Loading | Rest + контент `visibility: hidden`, поверх `.btn__progress` размером `--awds-btn-icon` | | | |

Фокус-обводка: `outline: 2px solid rgb(var(--surface-on-highest)); outline-offset: 2px` — роль `surface-on-highest` (из `focus-selection/outline`), общая для всех интерактивных элементов сайта.

В Figma на `Active` `chroma` = `bg` (`--secondary-core`) — градиент схлопывается в плоский цвет (сигнал «нажато»).

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
- **Живые числа в кнопке** (цена, счётчик) — оберни число в `<span style="font-variant-numeric: tabular-nums">`, чтобы цифры не «прыгали». На обычный текстовый лейбл `tabular-nums` не вешаем (MIFB-принцип 5).
- **Радиусы** — из макета (`--awds-rounded-*` по размеру), концентрию руками не считаем: есть Figma.

---

> **Генерится `arrow-components-builder`.** `button-secondary.css`, `preview.html`, `component.meta.json`, `snapshot/` — ACB-owned, руками не править (затрётся при «обнови awds-component-button»). Правки разметки/состояний — через Figma → refresh. Открой `references/preview.html` (`file://`) для визуального QA.
