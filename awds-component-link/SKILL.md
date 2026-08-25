---
name: awds-component-link
description: Текстовые ссылки ArrowDS (lnk-default, lnk-muted, lnk-contrast, lnk-accent, lnk-heading): только цвет, без размеров. Для любого <a> в блоке и кликабельного заголовка. Токены ArrowDS, работает и по Figma-ссылке.
---

# Ссылки ArrowDS

Текстовая ссылка ничего не хардкодит: цвет берётся из ролей DS, размер/шрифт **наследуются из контекста** (ссылка инлайновая). Cм. скилл `arrow-design-system` для общей картины токенов.

## Откуда берутся значения

Link — **color-only** компонент: DS задаёт только цвет текста по варианту и состоянию (`State/*/link/{variant}`). Размерной шкалы нет (`shape: null`), disabled-состояния в токенах нет. Подчёркивание и focus-обводка — дефолт поверх токенов (значения из шкалы, не хардкод).

| Что | Источник | Где |
|---|---|---|
| Цвет варианта | `rgb(var(--{role}))` inline в `.lnk-{variant}` и его `:hover/:focus-visible/:active` | `references/link-{variant}.css` |
| Подчёркивание | ось «стиль линии × поведение» (см. раздел ниже). Линия `1px` (`--awds-space-space-px`), цвет = currentColor на `30%` (`--awds-opacity-opacity-30` через `color-mix`), offset `--awds-space-space-0-5` | база `.lnk` + модификаторы `.lnk--ul-*` (у `heading` — без подчёркивания) |
| Фокус-обводка | `var(--awds-focus-width) solid var(--awds-focus-color)`, `outline-offset: var(--awds-focus-offset)`, скругление `var(--awds-rounded-border-radius-200)` | там же |
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

## Подчёркивание — ось «стиль линии × поведение»

Ортогонально цветовому варианту. Линия всегда **1px** (`--awds-space-space-px`), цвет = **текущий цвет ссылки на 30%** (`color-mix(in srgb, currentColor var(--awds-opacity-opacity-30), transparent)` — следует за цветом варианта, в т.ч. за сменой на hover). Модификаторы вешаются на тот же `<a>` рядом с `.lnk .lnk-{variant}`.

**Две оси:**
- **Стиль линии:** `.lnk--ul-solid` (по умолчанию) · `.lnk--ul-dashed` (пунктир) · `.lnk--ul-dotted` (точки).
- **Поведение:** по умолчанию линия **есть и гаснет по hover**; `.lnk--ul-hover` инвертирует (**нет линии → появляется по hover**); `.lnk--ul-none` — **без подчёркивания**.

**7 готовых комбинаций:**

| # | Что | Классы (сверх `.lnk .lnk-{variant}`) |
|---|---|---|
| 1.1 | Линия, гаснет по hover | — (по умолчанию) |
| 1.2 | Пунктир, гаснет по hover | `.lnk--ul-dashed` |
| 1.3 | Точки, гаснет по hover | `.lnk--ul-dotted` |
| 2.1 | Линия, появляется по hover | `.lnk--ul-hover` |
| 2.2 | Пунктир, появляется по hover | `.lnk--ul-hover .lnk--ul-dashed` |
| 2.3 | Точки, появляется по hover | `.lnk--ul-hover .lnk--ul-dotted` |
| 3 | Без подчёркивания | `.lnk--ul-none` |

Пример: `<a class="lnk lnk-default lnk--ul-dotted" href="…">ссылка</a>` — точечное подчёркивание, гаснущее по наведению.

> Гашение/появление анимируется через `text-decoration-color` (прерываемый transition 0.15s), поэтому layout не прыгает. `heading` по своей природе без подчёркивания.

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
