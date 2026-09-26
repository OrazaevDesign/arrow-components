---
name: awds-component-button-overhung
description: Button Overhung ArrowDS (.obtn).
---

# Button Overhung ArrowDS

«Парящая» кнопка-таблетка: светлая поверхность (`surface-*`), полностью скруглённая форма и постоянная тень `var(--awds-shadow-elevation-1)`, благодаря которой кнопка приподнята над фоном. Ничего не хардкодит: размеры, цвета, тень и шрифт — токены DS. См. скилл `arrow-design-system` для общей картины токенов.

**Это отдельный компонент от `awds-component-button`.** У обычной кнопки заливка ролью `primary-*` без тени; у overhung — нейтральный светлый фон `surface-*` и зашитая elevation-тень. Класс тоже свой — `.obtn` (не `.btn`), чтобы оба компонента сосуществовали на странице без конфликта.

## Откуда берутся значения

**Модель ACB**: размеры ссылаются на семантические shape-токены css-global (`--awds-rectangle-{N}-*`), цвета/state инлайнятся ролями прямо в селекторах. Скилл ACB-managed — CSS/snapshot/preview генерируются из Figma, маппинг из `component-token-map.json` (секция `overhung`).

| Что | Источник | Где живёт |
|---|---|---|
| Цвета (bg/chroma/border/color) | ячейки слоя State: `rgb(var(--awds-state-overhung-{variant}-{prop}-{state}))` inline в `.obtn-primary` и его `:hover/:focus-visible/:active`; внутри резолвятся в роли `surface-*` | `references/button-overhung-primary.css` (+ палитра в `css-variables.css` сайта) |
| Парящая тень | `var(--awds-shadow-elevation-1)` в базовом `.obtn` box-shadow | `css-global` (базовая шкала shadow) |
| Кольцо фокуса | `var(--awds-focus-*)`, вариант Outside + Default | слой `awds-component-focus-selection` |
| Размеры (padding/gap/icon/font) | `var(--awds-size-rectangle-{N}-*)` (семантические shape-токены) в `.obtn--{N}` | `css-global` (там же резолвятся в базовые шкалы) |
| Форма | `var(--awds-rounded-border-radius-full)` в базовом `.obtn` — таблетка на всех ступенях, от размера НЕ зависит | `css-global` (токен равен 600px во всех трёх режимах коллекции Rounded, поэтому режим сайта на overhung не влияет) |
| Гашение (opacity) | `var(--awds-state-opacity-control-disabled)` на выключенном состоянии | слой State темы, группа `opacity` |
| Шрифт (family/weight) | `--awds-font-family-system`, `--awds-font-weight-semibold` | там же |

Маппинг variant×state → роль фиксируется в `component.meta.json` + `snapshot/figma.json`. Обновление под Figma — через скилл `arrow-components-builder` («обнови awds-component-button-overhung»), не руками.

## Варианты

| Вариант | Reference | Когда использовать |
|---|---|---|
| **Primary** | `references/button-overhung-primary.md` ✅ | Нейтральная приподнятая кнопка на светлой поверхности — вторичные действия, карточки, тулбары, где нужен объём без яркого бренд-акцента |
| **Secondary** | `references/button-overhung-secondary.md` ✅ | Приглушённая версия Primary (те же роли + тень, но кнопка прозрачнее: 60% в покое → 90% на hover). Тише по весу — для менее приоритетных действий рядом с overhung-primary |

Новые варианты добавляются через `arrow-components-builder` (Bootstrap по Figma-ноде варианта).

## Размерные модификаторы

Добавь к кнопке класс `.obtn--{size}`. Размер задаёт padding, gap, font-size, line-height и letter-spacing — через семантические shape-токены `--awds-size-rectangle-{N}-*`. **Скругление размер не меняет:** у overhung оно одно на все ступени — таблетка (`--awds-rounded-border-radius-full`), в `icon-only` соответственно круг.

| Класс | Когда |
|---|---|
| `obtn--600` | Крупные действия, hero |
| `obtn--500` | Главные действия в блоках |
| `obtn--400` | Стандартный размер (по умолчанию) |
| `obtn--300` | Компактные блоки |
| `obtn--200` | Карточки, плотные списки |
| `obtn--100` | Inline-действия |
| `obtn--50`  | Самые компактные контролы |

Конкретные значения каждого размера — в `tokens-map.md` скилла `arrow-design-system`, секция `rectangle`.

## Оси макета

`content=text|icon` · `size=50…600` · `state=rest|hover|focus|active|disabled|loading`,
плюс булевы слоты `prefix` / `suffix`. Всё на каноне
`arrow-components-builder/references/props.md`.

**Загрузка — шестое значение оси `state`, отдельной оси `loading` больше нет** (15.09.2026,
по решению 14.09 — у `button` то же самое). Каждый набор сжался со 140 ячеек до 84:
`loading=on` осмысленно только в покое, остальные четыре комбинации дублировали друг друга.
Ячейка `state=rest, loading=on` стала `state=loading`. В коде это по-прежнему модификатор
`.obtn--loading` — оси Figma и классы CSS один к одному не ложатся и не должны.
Имя `progress` осталось за компонентом Progress, где это **значение** 0…100, а не флаг.

Размер кольца загрузки и горизонтальный padding в макете привязаны к
`rectangle/{N}/icon` и `rectangle/{N}/padding` — коллекция `button-input` в компоненте
больше не используется, поэтому код совпадает с макетом на всех семи ступенях.

## Состояния

Тень `elevation-1` постоянна во всех состояниях (так в макете — нажатие не «придавливает» кнопку). Меняется только заливка/текст:

- **Rest / Focus / Active** — одинаковы: фон `surface-surface`, sheen-градиент к `surface-bright`, текст `surface-on-high`. Focus добавляет обводку `surface-on-highest`.
- **Hover** — chroma темнеет до `surface-dim`, текст контрастнее (`surface-on-highest`).
- **Disabled** — Rest + `opacity: 40%`.

## CSS-файлы

| Вариант | CSS | Что внутри |
|---|---|---|
| Primary | `references/button-overhung-primary.css` | `.obtn` base (с elevation-тенью) + все размеры + `.obtn-primary` со всеми состояниями (inline `rgb(var(--surface-*))`) |
| Secondary | `references/button-overhung-secondary.css` | `.obtn` base + все размеры + `.obtn-secondary` (те же роли, плюс `opacity` 60%→90% по состояниям) |

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
