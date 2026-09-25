---
name: awds-component-emblem
description: Emblem ArrowDS (.emb).
---

# Эмблемы ArrowDS

Круг с содержимым: портрет пользователя, силуэт-заглушка, фото или произвольная иконка. Ничего не хардкодит: диаметр — base space-шкала, типографика инициалов — Control-шкала, цвета — роли `primary-container-*` и `surface-bright`. См. скилл `arrow-design-system`.

Имя `emblem` — у самой вещи, а не у первого потребителя: круг понадобился не только профилю, но и флагу языка, и пиктограмме. До версии 3.0.0 компонент назывался `avatar`, базовый класс был `.avatar`.

## Содержимое (ось `content`, 4 значения)

| Значение | Reference | Что показывает | Ступени |
|---|---|---|---|
| **initials** | `references/emblem-initials.md` ✅ | Инициалы пользователя (текст, напр. «АК») — когда нет фото | все 10 |
| **placeholder** | `references/emblem-placeholder.md` ✅ | Силуэт-иконка (60%) — когда нет ни фото, ни имени | все 10 |
| **img** | `references/emblem-img.md` ✅ | Фото пользователя (`<img>`, обрезано в круг) | все 10 |
| **icon** | `references/emblem-icon.md` ✅ | Произвольная иконка на светлой подложке (флаг языка, пиктограмма) | 150 · 100 · 50 |

Первые три — один цветовой набор (`primary-container-*`) и одна размерная шкала, различаются только содержимым. **`icon` стоит особняком:** светлая подложка `surface-bright`, кольца нет, ступеней три. Состояний нет ни у кого — эмблема статична.

## Откуда берутся значения

| Что | Источник |
|---|---|
| Фон (initials · placeholder · img) | `rgb(var(--primary-container-core))` + sheen `rgb(var(--primary-container-chroma))` |
| Фон (icon) | `rgb(var(--surface-bright))`, без градиента |
| Кольцо | `rgb(var(--primary-container-on-lowest))` (через `::after` inset box-shadow); у `icon` кольца нет |
| Инициалы / силуэт | `rgb(var(--primary-container-on-high))` |
| Гашение силуэта | `var(--awds-state-opacity-content-placeholder)` — ячейка слоя State за Figma-токеном `opacity/content/placeholder` |
| Диаметр | `var(--awds-space-N)` (24–80) |
| Размер инициалов | `var(--awds-control-N-font-size / -line-height / -letter-spacing)` |
| Размер иконки у `icon` | `var(--awds-space-N)` — 24 / 20 / 16 на ступенях 150 / 100 / 50 |
| Скругление | `var(--awds-rounded-border-radius-full)` — 600px во всех трёх темах Rounded, круг остаётся кругом |

> Диаметры — это собственная шкала эмблемы (50–700 → 24–80px). В DS нет shape-слоя `emblem`, поэтому размеры ссылаются на базовые шкалы (`--awds-space-*`, `--awds-control-*`) напрямую, а не через `var(--awds-{shape}-N-*)`. Инициалы используют **Control**-шкалу (фикс), а не `--awds-typography-*` (та респонсивная и расходится с макетом). Ступени `150` и `250` — законное отклонение от канонной шкалы, записано в `arrow-components-builder/references/props.md`.

## Размеры (10)

`.emb--{N}`, где N — `700 600 500 400 300 250 200 150 100 50`. Диаметр от 80px (700) до 24px (50). По умолчанию — `emb--400` (48px).

| Класс | Ø | Класс | Ø |
|---|---|---|---|
| `emb--700` | 80px | `emb--250` | 40px |
| `emb--600` | 64px | `emb--200` | 36px |
| `emb--500` | 56px | `emb--150` | 32px |
| `emb--400` | 48px | `emb--100` | 28px |
| `emb--300` | 44px | `emb--50` | 24px |

У `emb-icon` живут только `--150`, `--100`, `--50`: остальных ступеней в макете нет, и заводить их значило бы обещать размер, за которым нет значения.

## CSS

Один файл — `references/emblem.css` (база `.emb` + кольцо `::after` + виды `.emb-{initials,placeholder,img,icon}` + 10 размеров). Подключается один раз глобально.

Визуальный QA — `references/preview.html` (storybook, `file://`): матрица размер × вид и пример стопки с наложением.

## Алгоритм использования

1. Определи содержимое: есть фото → `img`; есть имя → `initials`; ничего → `placeholder`; в круге не человек, а знак (флаг, пиктограмма) → `icon`.
2. Разметка (контейнер — `<span>`, инлайновый):
   - `<span class="emb emb-initials emb--400">АК</span>`
   - `<span class="emb emb-placeholder emb--400"><svg>…</svg></span>`
   - `<span class="emb emb-img emb--400"><img src="…" alt="Имя"></span>`
   - `<span class="emb emb-icon emb--150"><svg>…</svg></span>`
3. Подключи `references/emblem.css`. Нужны `css-variables.css` сайта (роли `--primary-container-*`, `--surface-bright`) и базовые токены DS (`--awds-space-*`, `--awds-control-*`, `--awds-rounded-*`, `--awds-state-opacity-*`, `--awds-font-*`).
4. Добавь размер `.emb--{N}` (по умолчанию `emb--400`).

## Refresh

```
обнови awds-component-emblem под Figma
```

ACB зайдёт в Figma по ссылке (`component.meta.json`), сравнит снапшот, обновит `emblem.css` + preview. Документация (этот файл и `emblem-{content}.md`) — не трогается.
