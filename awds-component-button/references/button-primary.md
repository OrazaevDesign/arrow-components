# Button / Primary

**Figma:** [rRCDPR2SJ90wJZCr5rsXAd → node 1:757](https://www.figma.com/design/rRCDPR2SJ90wJZCr5rsXAd/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B2-Buttons?node-id=1-757)

Главный призыв к действию. На экране/секции — только одна Primary-кнопка.

Всё на токенах. Цвета → роли `rgb(var(--primary-*))` inline в селекторах (RGB-триплеты сайта); размеры → семантические shape-токены `var(--awds-rectangle-{N}-*)` (маппинг из `component-token-map.json`, определены в css-global); фокус → `rgb(var(--surface-on-highest))`; disabled → `var(--awds-opacity-40)`. Реальную палитру задаёт сайт через `css-variables.css`; базовые шкалы и шрифт — блок `arrowds-css`.

---

## HTML

### Только текст
```html
<button class="btn btn-primary btn--400" type="button">
  Текст кнопки
</button>
```

### Иконка слева
```html
<button class="btn btn-primary btn--400" type="button">
  <svg width="20" height="20" aria-hidden="true"><!-- icon --></svg>
  Текст кнопки
</button>
```

### Иконка справа
```html
<button class="btn btn-primary btn--400" type="button">
  Текст кнопки
  <svg width="20" height="20" aria-hidden="true"><!-- icon --></svg>
</button>
```

### Только иконка (квадратная)
```html
<button class="btn btn-primary btn--400 btn--icon-only" type="button" aria-label="Действие">
  <svg width="20" height="20" aria-hidden="true"><!-- icon --></svg>
</button>
```

### Состояние загрузки

Контент в `.btn__content` (скрывается через `visibility: hidden` — сохраняет ширину). Поверх абсолютно центрируется `.btn__progress` размером `--awds-btn-icon`.

```html
<button class="btn btn-primary btn--400 btn--loading" type="button" disabled aria-busy="true">
  <span class="btn__content">Загрузка…</span>
  <svg class="btn__progress" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2.5"
            stroke-dasharray="40 60" stroke-linecap="round"/>
  </svg>
</button>
```

### Как ссылка
```html
<a class="btn btn-primary btn--400" href="/action">
  Текст кнопки
</a>
```

---

## CSS — модель токенов

Полный код — `references/button-primary.css`. Три уровня: site colors / семантические shape size-токены → приватные аккумуляторы `--awds-btn-*` → CSS-свойства в `.btn`.

### Base (`.btn`)
Аккумуляторы заполняются дефолтами размера 400; size-класс и вариант переопределяют их:

```css
.btn {
  /* size-дефолты (= 400) */
  --awds-btn-padding: var(--awds-rectangle-400-padding);
  --awds-btn-fs:      var(--awds-rectangle-400-typography-font-size);
  /* … */
  padding-block: var(--awds-btn-padding);
  padding-inline: calc(var(--awds-btn-padding) + var(--awds-btn-gap));
  gap: var(--awds-btn-gap);
  border-radius: var(--awds-btn-rounded);
  background: linear-gradient(to right, var(--awds-btn-chroma, var(--awds-btn-bg)), var(--awds-btn-bg));
  border: 1px solid var(--awds-btn-border);
  color: var(--awds-btn-color);
  font-family: var(--awds-font-family-system);
  font-weight: var(--awds-font-weight-semibold);
}
.btn:disabled       { opacity: var(--awds-opacity-40); }
.btn:focus-visible  { outline: 2px solid rgb(var(--surface-on-highest)); outline-offset: 2px; }
```

### Size (`.btn--{N}`)
Заполняет size-аккумуляторы семантическими shape-токенами (`map.size.rectangle.{N}`, определены в css-global):

```css
.btn--400 {
  --awds-btn-padding: var(--awds-rectangle-400-padding);
  --awds-btn-gap:     var(--awds-rectangle-400-gap);
  --awds-btn-rounded: var(--awds-rectangle-400-rounded);
  --awds-btn-icon:    var(--awds-rectangle-400-icon);
  --awds-btn-fs:      var(--awds-rectangle-400-typography-font-size);
  --awds-btn-lh:      var(--awds-rectangle-400-typography-line-height);
  --awds-btn-ls:      var(--awds-rectangle-400-typography-letter-spacing);
}
```

### Variant (`.btn-primary`)
Заполняет цветовые аккумуляторы inline-ролями, по состоянию:

```css
.btn-primary               { --awds-btn-bg: rgb(var(--primary-core)); /* chroma/border/color */ }
.btn-primary:hover         { --awds-btn-bg: rgb(var(--primary-dim));  --awds-btn-border: rgb(var(--primary-dim)); }
.btn-primary:focus-visible { --awds-btn-bg: rgb(var(--primary-core)); }
.btn-primary:active        { --awds-btn-bg: rgb(var(--primary-core)); --awds-btn-chroma: rgb(var(--primary-core)); /* плоский */ }
```

---

## Размеры (map.size.rectangle)

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
| Rest    | `--primary-core` | `--primary-chroma` | `--primary-core` | `--primary-on` |
| Hover   | `--primary-dim`  | `--primary-chroma` | `--primary-dim`  | `--primary-on` |
| Focus   | `--primary-core` | `--primary-chroma` | `--primary-core` | `--primary-on` |
| Active  | `--primary-core` | `--primary-core`   | `--primary-core` | `--primary-on` |
| Disabled| Rest + `opacity: var(--awds-opacity-40)` (= 40%) | | | |
| Loading | Rest + контент `visibility: hidden`, поверх `.btn__progress` размером `--awds-btn-icon` | | | |

Фокус-обводка: `outline: 2px solid rgb(var(--surface-on-highest)); outline-offset: 2px` — роль `surface-on-highest` (из `focus-selection/outline`), общая для всех интерактивных элементов сайта.

В Figma на `Active` `chroma` = `bg` (`--primary-core`) — градиент схлопывается в плоский цвет (сигнал «нажато»).

---

## Модель padding'а (соответствие Figma)

Figma раскладывает кнопку на контейнер + 3 ячейки (`Prefix | Text | Suffix`): контейнер `padding-inline = padding`, каждая ячейка `padding-block = padding`, gaps из `pl/pr/px = gap`. Реализовано плоским flex (тот же результат):

- `padding-block: --awds-btn-padding`
- `padding-inline: calc(--awds-btn-padding + --awds-btn-gap)`
- `gap: --awds-btn-gap`

Для `.btn--icon-only` — квадрат с `padding: --awds-btn-padding` со всех сторон.

---

## Полировка (MIFB)

- **Плавная смена состояний.** `--awds-btn-bg` / `--awds-btn-chroma` зарегистрированы через `@property` как `<color>`, поэтому фон-градиент интерполируется при hover/active (а не «снапает»). Переходы — `0.15s ease-out` по конкретным свойствам (не `transition: all`), прерываемые. Спиннер — `@keyframes` + `will-change: transform` (единственный валидный loop-кейс).
- **Живые числа в кнопке** (цена, счётчик корзины: «Оплатить 1 990 ₽», «Корзина (3)») — оберни число в `<span style="font-variant-numeric: tabular-nums">`, чтобы цифры не «прыгали» при обновлении. На обычный текстовый лейбл `tabular-nums` не вешаем — моноширинность там не нужна (MIFB-принцип 5).
- **Радиусы** — из макета (`--awds-rounded-*` по размеру), концентрию руками не считаем: есть Figma.

---

> **Генерится `arrow-components-builder`.** `button-primary.css`, `preview.html`, `component.meta.json`, `snapshot/` — ACB-owned, руками не править (затрётся при «обнови awds-component-button»). Правки разметки/состояний — через Figma → refresh. Открой `references/preview.html` (`file://`) для визуального QA.
