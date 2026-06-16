# Button / Clean

**Figma:** [rRCDPR2SJ90wJZCr5rsXAd → node 489:119060](https://www.figma.com/design/rRCDPR2SJ90wJZCr5rsXAd/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B2-Buttons?node-id=489-119060)

Белая кнопка с тонкой обводкой — для цветных/насыщенных секций (hero, баннеры), где нужна нейтральная светлая поверхность поверх фона.

Всё на токенах. Цвета → роли `rgb(var(--surface-*))` inline в селекторах (RGB-триплеты сайта); размеры → семантические shape-токены `var(--awds-rectangle-{N}-*)`; фокус → `rgb(var(--surface-on-highest))`; disabled → `var(--awds-opacity-40)`. Реальную палитру задаёт сайт через `css-variables.css`.

Единственный вариант, где `border ≠ bg`: обводка `surface-dim` тонко, но видимо очерчивает белую кнопку. Реализована через inset box-shadow (не влияет на размер). `chroma = bg` — фон плоский, без градиента.

Геометрия, base-механика, loading, icon-only — общие с Primary; `button-clean.css` самодостаточен (содержит base + sizes), отличается только блоком цветовых ролей варианта.

---

## HTML

### Только текст
```html
<button class="btn btn-clean btn--400" type="button">
  Текст кнопки
</button>
```

### Иконка слева
```html
<button class="btn btn-clean btn--400" type="button">
  <svg width="20" height="20" aria-hidden="true"><!-- icon --></svg>
  Текст кнопки
</button>
```

### Иконка справа
```html
<button class="btn btn-clean btn--400" type="button">
  Текст кнопки
  <svg width="20" height="20" aria-hidden="true"><!-- icon --></svg>
</button>
```

### Только иконка (квадратная)
```html
<button class="btn btn-clean btn--400 btn--icon-only" type="button" aria-label="Действие">
  <svg width="20" height="20" aria-hidden="true"><!-- icon --></svg>
</button>
```

### Состояние загрузки

Контент в `.btn__content` (скрывается через `visibility: hidden` — сохраняет ширину). Поверх абсолютно центрируется `.btn__progress` размером `--awds-btn-icon`.

```html
<button class="btn btn-clean btn--400 btn--loading" type="button" disabled aria-busy="true">
  <span class="btn__content">Загрузка…</span>
  <svg class="btn__progress" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2.5"
            stroke-dasharray="40 60" stroke-linecap="round"/>
  </svg>
</button>
```

### Как ссылка
```html
<a class="btn btn-clean btn--400" href="/action">
  Текст кнопки
</a>
```

---

## CSS — модель токенов

Полный код — `references/button-clean.css`. Три уровня: site colors / семантические shape size-токены → приватные аккумуляторы `--awds-btn-*` → CSS-свойства в `.btn`. Base и size-классы идентичны Primary; ниже — только блок варианта.

### Variant (`.btn-clean`)
Заполняет цветовые аккумуляторы inline-ролями surface, по состоянию:

```css
.btn-clean               { --awds-btn-bg: rgb(var(--surface-bright));  --awds-btn-border: rgb(var(--surface-dim)); --awds-btn-color: rgb(var(--surface-on-high)); }
.btn-clean:hover         { --awds-btn-bg: rgb(var(--surface-surface)); --awds-btn-color: rgb(var(--surface-on-highest)); /* фон и текст темнеют */ }
.btn-clean:focus-visible { --awds-btn-bg: rgb(var(--surface-bright));  /* = rest */ }
.btn-clean:active        { --awds-btn-bg: rgb(var(--surface-surface)); --awds-btn-color: rgb(var(--surface-on-highest)); }
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
| Rest    | `--surface-bright`  | `--surface-dim` | `--surface-on-high` |
| Hover   | `--surface-surface` | `--surface-dim` | `--surface-on-highest` |
| Focus   | `--surface-bright`  | `--surface-dim` | `--surface-on-high` |
| Active  | `--surface-surface` | `--surface-dim` | `--surface-on-highest` |
| Disabled| Rest + `opacity: var(--awds-opacity-40)` (= 40%) | | |
| Loading | Rest + контент `visibility: hidden`, поверх `.btn__progress` размером `--awds-btn-icon` | | |

Фокус-обводка: `outline: 2px solid rgb(var(--surface-on-highest)); outline-offset: 2px` — роль `surface-on-highest` (из `focus-selection/outline`), общая для всех интерактивных элементов сайта.

`chroma = bg` во всех состояниях → фон плоский (без градиента). Обводка `surface-dim` постоянна и видима — единственный вариант с border ≠ bg.

---

## Модель padding'а (соответствие Figma)

Та же, что у Primary: контейнер + 3 ячейки (`Prefix | Text | Suffix`). Реализовано плоским flex:

- `padding-block: --awds-btn-padding`
- `padding-inline: calc(--awds-btn-padding + --awds-btn-gap)`
- `gap: --awds-btn-gap`

Для `.btn--icon-only` — детерминированный квадрат `width = height = icon + 2*padding`.

---

## Полировка (MIFB)

- **Плавная смена состояний.** `--awds-btn-bg` / `--awds-btn-chroma` зарегистрированы через `@property` как `<color>`, поэтому фон интерполируется при hover/active. Обводка (`box-shadow`) и цвет текста анимируются явными свойствами (`0.15s ease-out`, не `transition: all`), прерываемо. Спиннер — `@keyframes` + `will-change: transform`.
- **Живые числа в кнопке** — оберни число в `<span style="font-variant-numeric: tabular-nums">`. На обычный текстовый лейбл `tabular-nums` не вешаем (MIFB-принцип 5).
- **Радиусы** — из макета (`--awds-rounded-*` по размеру), концентрию руками не считаем: есть Figma.

---

> **Генерится `arrow-components-builder`.** `button-clean.css`, `preview.html`, `component.meta.json`, `snapshot/` — ACB-owned, руками не править (затрётся при «обнови awds-component-button»). Правки разметки/состояний — через Figma → refresh. Открой `references/preview.html` (`file://`) для визуального QA.
