---
name: awds-component-button-overhung
description: >
  Верстка «парящих» кнопок Button Overhung ArrowDS — HTML-разметка и CSS на токенах
  дизайн-системы. Используй ВСЕГДА при: добавлении overhung/«парящей»/«нависающей»
  кнопки в разметку или PageCraft-блок, выборе варианта overhung-кнопки из Figma-дизайна,
  вопросах о стилях obtn-primary, получении Figma-ссылки на компонент Button Overhung.
  Это ОТДЕЛЬНЫЙ компонент от awds-component-button: светлый фон + постоянная elevation-тень.
---

# Button Overhung ArrowDS

«Парящая» кнопка: светлая поверхность (`surface-*`) + постоянная тень `var(--awds-shadow-elevation-1)`, благодаря которой кнопка приподнята над фоном. Ничего не хардкодит: размеры, цвета, тень и шрифт — токены DS. См. скилл `arrow-design-system` для общей картины токенов.

**Это отдельный компонент от `awds-component-button`.** У обычной кнопки заливка ролью `primary-*` без тени; у overhung — нейтральный светлый фон `surface-*` и зашитая elevation-тень. Класс тоже свой — `.obtn` (не `.btn`), чтобы оба компонента сосуществовали на странице без конфликта.

## Откуда берутся значения

**Модель ACB**: размеры ссылаются на семантические shape-токены css-global (`--awds-rectangle-{N}-*`), цвета/state инлайнятся ролями прямо в селекторах. Скилл ACB-managed — CSS/snapshot/preview генерируются из Figma, маппинг из `component-token-map.json` (секция `overhung`).

| Что | Источник | Где живёт |
|---|---|---|
| Цвета (bg/chroma/border/color) | `rgb(var(--surface-*))` inline в `.obtn-primary` и его `:hover/:focus-visible/:active` | `references/button-overhung-primary.css` (+ палитра в `css-variables.css` сайта) |
| Парящая тень | `var(--awds-shadow-elevation-1)` в базовом `.obtn` box-shadow | `css-global` (базовая шкала shadow) |
| Цвет фокус-обводки | `rgb(var(--surface-on-highest))` inline | `references/button-overhung-primary.css` |
| Размеры (padding/gap/icon/rounded/font) | `var(--awds-rectangle-{N}-*)` (семантические shape-токены) в `.obtn--{N}` | `css-global` (там же резолвятся в базовые шкалы) |
| `opacity` для disabled | `var(--awds-opacity-40)` | там же |
| Шрифт (family/weight) | `--awds-font-family-system`, `--awds-font-weight-semibold` | там же |

Маппинг variant×state → роль фиксируется в `component.meta.json` + `snapshot/figma.json`. Обновление под Figma — через скилл `arrow-components-builder` («обнови awds-component-button-overhung»), не руками.

## Варианты

| Вариант | Reference | Когда использовать |
|---|---|---|
| **Primary** | `references/button-overhung-primary.md` ✅ | Нейтральная приподнятая кнопка на светлой поверхности — вторичные действия, карточки, тулбары, где нужен объём без яркого бренд-акцента |

Новые варианты (например Secondary — в Figma уже есть `overhung/secondary/*`) добавляются через `arrow-components-builder` (Bootstrap по Figma-ноде варианта).

## Размерные модификаторы

Добавь к кнопке класс `.obtn--{size}`. Размер задаёт padding, gap, border-radius, font-size, line-height и letter-spacing — через семантические shape-токены `--awds-rectangle-{N}-*`.

| Класс | Когда |
|---|---|
| `obtn--600` | Крупные действия, hero |
| `obtn--500` | Главные действия в блоках |
| `obtn--400` | Стандартный размер (по умолчанию) |
| `obtn--300` | Компактные блоки |
| `obtn--200` | Карточки, плотные списки |
| `obtn--100` | Inline-действия |
| `obtn--50`  | Самые компактные контролы |

Конкретные значения каждого размера — в `tokens-components-size.md` скилла `arrow-design-system`, секция `rectangle`.

## Состояния

Тень `elevation-1` постоянна во всех состояниях (так в макете — нажатие не «придавливает» кнопку). Меняется только заливка/текст:

- **Rest / Focus / Active** — одинаковы: фон `surface-surface`, sheen-градиент к `surface-bright`, текст `surface-on`. Focus добавляет обводку `surface-on-highest`.
- **Hover** — chroma темнеет до `surface-dim`, текст контрастнее (`surface-on-highest`).
- **Disabled** — Rest + `opacity: 40%`.

## CSS-файлы

| Вариант | CSS | Что внутри |
|---|---|---|
| Primary | `references/button-overhung-primary.css` | `.obtn` base (с elevation-тенью) + все размеры + `.obtn-primary` со всеми состояниями (inline `rgb(var(--surface-*))`) |

Визуальный QA — `references/preview.html` (storybook, открывается через `file://`).

## Алгоритм использования

1. Убедись, что нужна именно overhung-кнопка (приподнятая, нейтральная) — иначе бери `awds-component-button`.
2. Прочитай `references/button-overhung-primary.md` — там HTML-разметка и описание состояний.
3. Подключи `references/button-overhung-primary.css` (один раз глобально).
4. Убедись, что на странице есть базовые токены DS (`--awds-rectangle-*`, `--awds-shadow-elevation-*`, `--awds-opacity-*`, `--awds-font-*`) и сайтовый `css-variables.css` (даёт `--surface-*` под брендом сайта).
5. Добавь размерный модификатор `.obtn--{size}` (если не указан — `obtn--400`).

## Refresh

При изменении токенов в Figma:

```
обнови awds-component-button-overhung под Figma
```

ACB зайдёт в Figma по сохранённой ссылке (`component.meta.json`), вытащит актуальные variable_defs, сравнит со snapshot, покажет diff и обновит CSS + preview. Документация (этот файл и `{variant}.md`) — не трогается.
