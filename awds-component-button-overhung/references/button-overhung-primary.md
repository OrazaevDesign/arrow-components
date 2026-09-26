# Button Overhung / Primary

**Figma:** [rRCDPR2SJ90wJZCr5rsXAd → node 145:30637](https://www.figma.com/design/rRCDPR2SJ90wJZCr5rsXAd/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B2-Buttons?node-id=145-30637)

> [!NOTE]
> Этот файл (`button-overhung-primary.md`) — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`button-overhung-primary.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

«Парящая» нейтральная кнопка: светлый фон `surface-*` с лёгким sheen-градиентом и постоянной тенью `elevation-1`. В отличие от обычной `.btn-primary`, не использует бренд-цвет и всегда приподнята над поверхностью.

## HTML

Базовая разметка:

```html
<button class="obtn obtn-primary obtn--400" type="button">
  Купить
</button>
```

`type="button"` стоит во всех примерах: без него нативная кнопка внутри формы по
умолчанию `submit` и отправляет форму. Вне формы атрибут ничего не меняет, поэтому он
и есть безопасный дефолт. У варианта-ссылки (`<a>`) атрибута нет — он бывает только у
`<button>`.

Иконка слева (текст в `__content` — чтобы лоадер мог его скрыть):

```html
<button class="obtn obtn-primary obtn--400" type="button">
  <svg viewBox="0 0 24 24" fill="currentColor"><!-- icon path --></svg>
  <span class="obtn__content">Добавить</span>
</button>
```

Иконка справа:

```html
<button class="obtn obtn-primary obtn--400" type="button">
  <span class="obtn__content">Дальше</span>
  <svg viewBox="0 0 24 24" fill="currentColor"><!-- icon path --></svg>
</button>
```

Только иконка (квадратная):

```html
<button class="obtn obtn-primary obtn--400 obtn--icon-only" type="button" aria-label="Опции">
  <svg viewBox="0 0 24 24" fill="currentColor"><!-- icon path --></svg>
</button>
```

Состояние загрузки (Figma `loading=on`): контент скрывается, поверх — кольцо
`awds-component-progress`. Своего спиннера у кнопки нет: классы компонента вешаются на
тот же `<svg>`, что и слот `.obtn__progress`, а кнопка сообщает ему размер и цвет.

```html
<button class="obtn obtn-primary obtn--400 obtn--loading" type="button" disabled aria-busy="true">
  <span class="obtn__content">Загрузка…</span>
  <svg class="obtn__progress progress progress-circular progress--indeterminate"
       viewBox="0 0 24 24" aria-hidden="true">
    <circle class="progress-circular__arc" cx="12" cy="12" r="10" pathLength="100"/>
  </svg>
</button>
```

Как ссылка:

```html
<a href="..." class="obtn obtn-primary obtn--400">Ссылка-кнопка</a>
```

## CSS

Подключение: `button-overhung-primary.css`.

| Блок | Что внутри |
|---|---|
| Base `.obtn` | Layout (flex), `box-shadow` = `elevation-1` (парящая тень) + inset stroke, фон-градиент, типографика, default size 400, focus-visible, disabled, loading/icon-only |
| Sizes `.obtn--{N}` | Заполняют `--awds-obtn-{padding,gap,icon,fs,lh,ls}` через shape-токены `--awds-size-rectangle-{N}-*`. `--awds-obtn-rounded` в набор не входит: радиус общий (таблетка) и объявлен в базовом `.obtn` |
| Variant `.obtn-primary` | Rest — заполняют `--awds-obtn-{bg,chroma,border,color}` ролями `rgb(var(--surface-*))` |
| `:hover` / `:focus-visible` / `:active` | Те же accumulators, другие роли (см. ниже) |

## Состояния

| Состояние | bg | chroma | border | color | Доп. |
|---|---|---|---|---|---|
| Rest | `surface-surface` | `surface-bright` | `surface-surface` | `surface-on-high` | тень `elevation-1` |
| Hover | `surface-surface` | `surface-dim` | `surface-surface` | `surface-on-highest` | — |
| Focus | `surface-surface` | `surface-bright` | `surface-surface` | `surface-on-high` | `outline: var(--awds-focus-width) solid var(--awds-focus-color)` |
| Active | `surface-surface` | `surface-bright` | `surface-surface` | `surface-on-high` | = Rest |
| Disabled | = Rest | | | | `opacity: var(--awds-state-opacity-control-disabled)` + `pointer-events: none` |

Тень `elevation-1` одинакова во всех состояниях (зашита в `.obtn`, не в селекторах) — в макете нажатие не меняет высоту.

## Размеры

Класс `.obtn--{N}`, где N — один из: 50, 100, 200, 300, 400, 500, 600.

Все значения инлайнятся через семантические shape-токены `--awds-rectangle-{N}-*` (резолв из `map.size.rectangle.{N}`; см. `arrow-design-system/references/tokens-map.md`, секция `rectangle`).

## Refresh

Если в Figma изменились токены overhung-кнопки:

```
обнови awds-component-button-overhung под Figma
```

→ ACB заходит в Figma, сравнивает, показывает diff, регенерирует CSS. Этот markdown остаётся как есть — правь сам, если нужно изменить HTML-примеры или описание.
