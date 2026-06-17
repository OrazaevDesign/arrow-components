# Button Overhung / Primary

**Figma:** [rRCDPR2SJ90wJZCr5rsXAd → node 145:30637](https://www.figma.com/design/rRCDPR2SJ90wJZCr5rsXAd/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B2-Buttons?node-id=145-30637)

> [!NOTE]
> Этот файл (`button-overhung-primary.md`) — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`button-overhung-primary.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

«Парящая» нейтральная кнопка: светлый фон `surface-*` с лёгким sheen-градиентом и постоянной тенью `elevation-1`. В отличие от обычной `.btn-primary`, не использует бренд-цвет и всегда приподнята над поверхностью.

## HTML

Базовая разметка:

```html
<button class="obtn obtn-primary obtn--400">
  Купить
</button>
```

Иконка слева (текст в `__content` — чтобы лоадер мог его скрыть):

```html
<button class="obtn obtn-primary obtn--400">
  <svg viewBox="0 0 24 24" fill="currentColor"><!-- icon path --></svg>
  <span class="obtn__content">Добавить</span>
</button>
```

Иконка справа:

```html
<button class="obtn obtn-primary obtn--400">
  <span class="obtn__content">Дальше</span>
  <svg viewBox="0 0 24 24" fill="currentColor"><!-- icon path --></svg>
</button>
```

Только иконка (квадратная):

```html
<button class="obtn obtn-primary obtn--400 obtn--icon-only" aria-label="Опции">
  <svg viewBox="0 0 24 24" fill="currentColor"><!-- icon path --></svg>
</button>
```

Состояние загрузки (Figma Progress=True): контент скрывается, поверх — спиннер:

```html
<button class="obtn obtn-primary obtn--400 obtn--loading" disabled aria-busy="true">
  <span class="obtn__content">Загрузка…</span>
  <svg class="obtn__progress" viewBox="0 0 24 24"><!-- spinner path --></svg>
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
| Sizes `.obtn--{N}` | Заполняют `--awds-obtn-{padding,gap,rounded,icon,fs,lh,ls}` через shape-токены `--awds-rectangle-{N}-*` |
| Variant `.obtn-primary` | Rest — заполняют `--awds-obtn-{bg,chroma,border,color}` ролями `rgb(var(--surface-*))` |
| `:hover` / `:focus-visible` / `:active` | Те же accumulators, другие роли (см. ниже) |

## Состояния

| Состояние | bg | chroma | border | color | Доп. |
|---|---|---|---|---|---|
| Rest | `surface-surface` | `surface-bright` | `surface-surface` | `surface-on` | тень `elevation-1` |
| Hover | `surface-surface` | `surface-dim` | `surface-surface` | `surface-on-highest` | — |
| Focus | `surface-surface` | `surface-bright` | `surface-surface` | `surface-on` | `outline: 2px solid rgb(var(--surface-on-highest))` |
| Active | `surface-surface` | `surface-bright` | `surface-surface` | `surface-on` | = Rest |
| Disabled | = Rest | | | | `opacity: var(--awds-opacity-40)` + `pointer-events: none` |

Тень `elevation-1` одинакова во всех состояниях (зашита в `.obtn`, не в селекторах) — в макете нажатие не меняет высоту.

## Размеры

Класс `.obtn--{N}`, где N — один из: 50, 100, 200, 300, 400, 500, 600.

Все значения инлайнятся через семантические shape-токены `--awds-rectangle-{N}-*` (резолв из `map.size.rectangle.{N}`; см. `arrow-design-system/references/tokens-components-size.md`, секция `rectangle`).

## Refresh

Если в Figma изменились токены overhung-кнопки:

```
обнови awds-component-button-overhung под Figma
```

→ ACB заходит в Figma, сравнивает, показывает diff, регенерирует CSS. Этот markdown остаётся как есть — правь сам, если нужно изменить HTML-примеры или описание.
