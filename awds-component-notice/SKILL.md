---
name: awds-component-notice
description: >
  Верстка бейджей-счётчиков (Notice) ArrowDS — HTML-разметка и CSS на токенах дизайн-системы.
  Используй ВСЕГДА при: добавлении счётчика нотификаций / непрочитанных / бейджа с числом
  в разметку или PageCraft-блок, выборе варианта (primary / secondary / ghost), точки-индикатора,
  получении Figma-ссылки на компонент Notice. Круг для 1 цифры, пилюля для 2+, статичный.
---

# Notice (бейдж-счётчик) ArrowDS

Маленький бейдж с числом — счётчик нотификаций, непрочитанных, корзины. Круг для одной цифры, пилюля для двузначных. Ничего не хардкодит: размеры — shape `notice`, цвета — роли. См. скилл `arrow-design-system`.

## Варианты (3)

| Вариант | Reference | Цвет | Когда |
|---|---|---|---|
| **Primary** | `references/notice-primary.md` ✅ | accent (яркий, обычно красный) | Привлекающий внимание счётчик: новые уведомления, непрочитанные |
| **Secondary** | `references/notice-secondary.md` ✅ | secondary (приглушённый серый) | Нейтральный счётчик без акцента |
| **Ghost** | `references/notice-ghost.md` ✅ | прозрачный фон, только число | Когда фон не нужен — число поверх контента |

## Откуда берутся значения

| Что | Источник |
|---|---|
| Фон + sheen | `rgb(var(--accent-core))` / `rgb(var(--secondary-core))` / `transparent` + `*-chroma` |
| Цвет числа | `rgb(var(--accent-on))` / `rgb(var(--secondary-on-dim))` / `rgb(var(--surface-on-high))` |
| Диаметр / padding / шрифт | shape `notice`: `var(--awds-notice-N-size / -padding-h / -padding-v / -typography-*)` |
| Скругление | `var(--awds-rounded-full)` (всегда пилюля) |
| Цифры | `font-variant-numeric: tabular-nums` (не прыгают при смене значения) |

Состояний нет (бейдж статичный). Маппинг variant → роль фиксируется в `component.meta.json` + `snapshot/figma.json`. Обновление — через `arrow-components-builder` («обнови awds-component-notice»).

## Размеры (6)

`.notice--{N}`, N — `600 500 400 300 200 100`. Диаметр одной цифры от 28px (600) до 6px (100). По умолчанию `notice--400` (20px).

- **`notice--100` (6px)** — точка-индикатор, без числа (контент пустой). Для «есть непрочитанные» без счётчика.
- Остальные — с числом. Двузначные/`99+` автоматически раздуваются в пилюлю (`padding-inline`).

## CSS

Один файл — `references/notice.css` (база `.notice` + 3 варианта `.notice-{primary,secondary,ghost}` + 6 размеров). Подключается один раз глобально.

Визуальный QA — `references/preview.html` (storybook, `file://`): матрица размер × вариант + контекст (число/пилюля/точка, иконка-якорь с бейджем в углу).

## Алгоритм использования

1. Выбери вариант: яркий счётчик → `primary`; нейтральный → `secondary`; без фона → `ghost`. Только индикатор «есть» → `notice--100` без числа.
2. Разметка (инлайновый `<span>`):
   - `<span class="notice notice-primary notice--400">9</span>`
   - двузначный: `<span class="notice notice-primary notice--400">99</span>`
   - точка: `<span class="notice notice-primary notice--100"></span>`
3. Позиционирование в углу иконки/кнопки — на стороне потребителя: контейнер `position: relative`, бейдж `position: absolute; top/right` (см. preview, блок «иконка-якорь»).
4. Подключи `references/notice.css`. Нужны `css-variables.css` сайта (роли `--accent-*`, `--secondary-*`, `--surface-*`) и базовые токены DS (`--awds-notice-*`, `--awds-rounded-full`, `--awds-font-*`).

## Refresh

```
обнови awds-component-notice под Figma
```

ACB зайдёт в Figma по ссылке (`component.meta.json`), сравнит снапшот, обновит `notice.css` + preview. Документация (этот файл и `{variant}.md`) — не трогается.
