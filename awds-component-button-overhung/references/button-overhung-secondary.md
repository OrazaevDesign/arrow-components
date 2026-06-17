# Button Overhung / Secondary

**Figma:** [rRCDPR2SJ90wJZCr5rsXAd → node 490:231905](https://www.figma.com/design/rRCDPR2SJ90wJZCr5rsXAd/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B2-Buttons?node-id=490-231905)

> [!NOTE]
> Этот файл (`button-overhung-secondary.md`) — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`button-overhung-secondary.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

Приглушённая «парящая» кнопка. Использует те же роли `surface-*` и ту же постоянную тень `elevation-1`, что и Primary, но **вся кнопка прозрачнее**: `opacity` 60% в покое, «уплотняется» до 90% на hover / focus / active. Визуально тише primary — для менее приоритетных действий рядом с ним.

## HTML

Базовая разметка:

```html
<button class="obtn obtn-secondary obtn--400">
  Отмена
</button>
```

Иконка слева (текст в `__content`):

```html
<button class="obtn obtn-secondary obtn--400">
  <svg viewBox="0 0 24 24" fill="currentColor"><!-- icon path --></svg>
  <span class="obtn__content">Назад</span>
</button>
```

Только иконка / загрузка / ссылка — как у Primary, заменив `obtn-primary` на `obtn-secondary` (см. `button-overhung-primary.md`).

## CSS

Подключение: `button-overhung-secondary.css` (самодостаточный — содержит общую базу `.obtn` + вариант).

| Блок | Что внутри |
|---|---|
| Base `.obtn` | Идентична primary: layout, `box-shadow` = `elevation-1` + inset stroke, фон-градиент, типографика, размер 400, focus-visible, disabled, loading/icon-only |
| Sizes `.obtn--{N}` | Те же shape-токены `--awds-rectangle-{N}-*` |
| Variant `.obtn-secondary` | Роли `rgb(var(--surface-*))` (как primary) + `opacity: var(--awds-opacity-60)`; переход дополнен `opacity` |
| `:hover` / `:focus-visible` / `:active` | Те же роли + `opacity: var(--awds-opacity-90)` (кнопка уплотняется) |

## Состояния

| Состояние | bg | chroma | border | color | opacity |
|---|---|---|---|---|---|
| Rest | `surface-surface` | `surface-bright` | `surface-surface` | `surface-on` | **60%** |
| Hover | `surface-surface` | `surface-dim` | `surface-surface` | `surface-on-highest` | **90%** |
| Focus | `surface-surface` | `surface-bright` | `surface-surface` | `surface-on` | **90%** + `outline` |
| Active | `surface-surface` | `surface-bright` | `surface-surface` | `surface-on` | **90%** |
| Disabled | = Rest цвета | | | | **40%** (`--awds-opacity-40`, база `.obtn:disabled` перекрывает 60% по специфичности) |

Отличие от Primary — только непрозрачность всей кнопки. Цвета, тень и геометрия совпадают. Тень `elevation-1` постоянна.

## Размеры

Класс `.obtn--{N}`, N ∈ {50, 100, 200, 300, 400, 500, 600}. Значения — через `--awds-rectangle-{N}-*` (см. `arrow-design-system/references/tokens-components-size.md`, секция `rectangle`).

## Refresh

```
обнови awds-component-button-overhung под Figma
```

→ ACB заходит в Figma, сравнивает, показывает diff, регенерирует CSS. Этот markdown остаётся как есть.
