---
name: awds-component-link
description: >
  Верстка текстовых ссылок ArrowDS — HTML-разметка и CSS на токенах дизайн-системы.
  Используй ВСЕГДА при: добавлении ссылки (<a>) в разметку или PageCraft-блок, выборе
  варианта ссылки (default / muted / contrast / accent / heading), вопросах о стилях
  lnk-default и т.п., кликабельных заголовках. Это текстовый компонент — только цвет,
  без размеров и без disabled-состояния.
---

# Ссылки ArrowDS

Текстовая ссылка ничего не хардкодит: цвет берётся из ролей DS, размер/шрифт **наследуются из контекста** (ссылка инлайновая). Cм. скилл `arrow-design-system` для общей картины токенов.

## Откуда берутся значения

Link — **color-only** компонент: DS задаёт только цвет текста по варианту и состоянию (`State/*/link/{variant}`). Размерной шкалы нет (`shape: null`), disabled-состояния в токенах нет. Подчёркивание и focus-обводка — дефолт поверх токенов (значения из шкалы, не хардкод).

| Что | Источник | Где |
|---|---|---|
| Цвет варианта | `rgb(var(--{role}))` inline в `.lnk-{variant}` и его `:hover/:focus-visible/:active` | `references/link-{variant}.css` |
| Подчёркивание | `text-decoration-line: underline` + `text-underline-offset: var(--awds-space-0-5)`, толщина `from-font` | там же (у `heading` — без подчёркивания) |
| Фокус-обводка | `2px solid rgb(var(--surface-on-highest))`, `outline-offset: 2px`, скругление `var(--awds-rounded-200)` | там же |
| Размер/шрифт | **наследуются** от родителя — не задаются | — |

Маппинг variant×state → роль фиксируется в `component.meta.json` + `snapshot/figma.json`. Обновление — через `arrow-components-builder` («обнови awds-component-link»), не руками.

## Варианты

| Вариант | Reference | Цвет (rest → hover) | Когда использовать |
|---|---|---|---|
| **Default** | `references/link-default.md` ✅ | tertiary-container-on-high → -on-highest | Обычная инлайн-ссылка в тексте (брендовый tertiary) |
| **Muted** | `references/link-muted.md` ✅ | surface-on-high → -on-highest | Приглушённые ссылки: футер, второстепенная навигация, мета |
| **Contrast** | `references/link-contrast.md` ✅ | surface-on-highest → -on-high | Сильная ссылка, читается контрастнее текста |
| **Accent** | `references/link-accent.md` ✅ | surface-on-highest → accent-container-on | Нейтральная ссылка, «загорается» акцентом на hover |
| **Heading** | `references/link-heading.md` ✅ | surface-on-high → accent-container-on | Кликабельный заголовок (без подчёркивания), акцент на hover |

Подчёркивание есть у всех вариантов, кроме **heading** (заголовки не подчёркивают).

## Состояния

`rest` / `hover` / `focus` / `active`. Меняется только цвет; focus добавляет обводку. **Focus и active по цвету = rest** (видимое изменение даёт только hover). Disabled-состояния нет — ссылку, которую нельзя кликнуть, рендерить не как `.lnk`, а как обычный текст.

## CSS-файлы

| Вариант | CSS | Что внутри |
|---|---|---|
| Default | `references/link-default.css` | `.lnk` base + `.lnk-default` со всеми состояниями |
| Muted | `references/link-muted.css` | `.lnk` base + `.lnk-muted` |
| Contrast | `references/link-contrast.css` | `.lnk` base + `.lnk-contrast` |
| Accent | `references/link-accent.css` | `.lnk` base + `.lnk-accent` |
| Heading | `references/link-heading.css` | `.lnk` base + `.lnk-heading` (без подчёркивания) |

Каждый файл самодостаточен (содержит общую базу `.lnk` + свой вариант). Визуальный QA — `references/preview.html` (storybook, `file://`).

## Алгоритм использования

1. Определи вариант (default для обычных ссылок; heading для кликабельных заголовков; muted для футера).
2. Прочитай reference MD варианта — там HTML и описание.
3. Подключи нужный `link-{variant}.css` (один раз глобально).
4. Убедись, что на странице есть `css-variables.css` сайта (даёт `--{role}` под `.theme-default.theme-light`) и базовые токены DS (`--awds-space-*`, `--awds-rounded-*`).
5. Разметка: `<a class="lnk lnk-{variant}" href="…">текст</a>`. Размер ссылки = размер окружающего текста.

## Refresh

```
обнови awds-component-link под Figma
```

Если в Figma появится Component Set ссылок — пропиши `file_key`/`node_id` в `component.meta.json` и снимай токены оттуда. Сейчас компонент собран из DS-токенов `State/*/link` (без отдельной Figma-ноды). Документация (этот файл и `{variant}.md`) при refresh не трогается.
