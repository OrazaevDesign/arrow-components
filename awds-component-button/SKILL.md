---
name: awds-component-button
description: >
  Верстка кнопок ArrowDS — HTML-разметка и CSS на токенах дизайн-системы.
  Используй ВСЕГДА при: добавлении любой кнопки в разметку или PageCraft-блок,
  выборе варианта кнопки из Figma-дизайна, вопросах о стилях btn-primary / btn-secondary и т.д.,
  получении Figma-ссылки на компонент кнопки.
---

# Кнопки ArrowDS

Кнопка ничего не хардкодит: размеры, цвета и шрифт — токены из дизайн-системы. Cм. скилл `arrow-design-system` для общей картины токенов.

## Откуда берутся значения

**Модель ACB**: размеры ссылаются на семантические shape-токены css-global (`--awds-rectangle-{N}-*`), цвета/state инлайнятся ролями прямо в селекторах (компонентных цветовых прослоек `--awds-button-*-bg` нет). Скилл ACB-managed — CSS/snapshot/preview генерируются из Figma, маппинг из `component-token-map.json`.

| Что | Источник | Где живёт |
|---|---|---|
| Цвета вариантов (bg/border/color/chroma) | `var(--color-{role}-*)` inline в `.btn-{variant}` и его `:hover/:focus-visible/:active` | `references/{variant}.css` (+ палитра в `css-variables.css` сайта) |
| Цвет фокус-обводки | `var(--color-surface-on-highest)` inline | `references/{variant}.css` |
| Размеры (padding/gap/icon/rounded/font) | `var(--awds-rectangle-{N}-*)` (семантические shape-токены) в `.btn--{N}` | `blocks/arrowds-css/style.css` (там же резолвятся в базовые шкалы) |
| `opacity` для disabled | `var(--awds-opacity-40)` | там же |
| Шрифт (family/weight) | `--awds-font-family-system`, `--awds-font-weight-semibold` | там же |

Маппинг variant×state → роль фиксируется в `component.meta.json` + `snapshot/figma.json`. Обновление под Figma — через скилл `arrow-components-builder` («обнови awds-component-button»), не руками.

## Варианты

| Вариант | Reference | Когда использовать |
|---|---|---|
| **Primary** | `references/button-primary.md` ✅ | Главный CTA — одно главное действие на экране/секции |
| **Secondary** | `references/button-secondary.md` ✅ | Второстепенное действие рядом с Primary |
| Tertiary | *(в разработке)* | Третичное, менее заметное — навигация |
| Ghost | *(в разработке)* | Текстовая кнопка без фона, минимальный визуальный вес |
| Addition | *(в разработке)* | Финальные действия: корзина, оплата |
| Contrast | *(в разработке)* | Тёмная кнопка / инверсия на светлом фоне |
| Clean | *(в разработке)* | Белая кнопка для цветных секций |

Новые варианты добавляются через `arrow-components-builder` (Bootstrap по Figma-ноде варианта): он вытащит роли каждого состояния и сгенерирует `references/{variant}.css` с inline-ссылками `var(--color-{role}-*)`. Вручную блок `.btn-primary` не копируем.

## Размерные модификаторы

Добавь к кнопке класс `.btn--{size}`. Размер задаёт padding, gap, border-radius, font-size, line-height и letter-spacing — через семантические shape-токены `--awds-rectangle-{N}-*` (маппинг из `component-token-map.json`, определены в css-global).

| Класс | Когда |
|---|---|
| `btn--600` | Крупные CTA, hero-секции |
| `btn--500` | Главные действия в блоках |
| `btn--400` | Стандартный размер (используй по умолчанию) |
| `btn--300` | Компактные блоки |
| `btn--200` | Карточки, плотные списки |
| `btn--100` | Inline-действия |
| `btn--50`  | Самые компактные контролы |

Конкретные значения каждого размера — в `tokens-components-size.md` скилла `arrow-design-system`, секция `rectangle`.

## CSS-файлы

| Вариант | CSS | Что внутри |
|---|---|---|
| Primary | `references/button-primary.css` | `.btn` base + все размеры + `.btn-primary` со всеми состояниями (inline `rgb(var(--primary-*))`) |
| Secondary | `references/button-secondary.css` | `.btn` base + все размеры + `.btn-secondary` со всеми состояниями (inline `rgb(var(--secondary-*))`) |

Визуальный QA всех вариантов/размеров/состояний — `references/preview.html` (storybook, открывается через `file://`).

## Алгоритм

1. Определи вариант (обычно Primary если один CTA, Secondary если рядом с Primary).
2. Прочитай reference MD варианта — там HTML-разметка и описание состояний.
3. Подключи соответствующий CSS-файл из таблицы выше (один раз глобально).
4. Убедись, что на странице есть блок `arrowds-css` (даёт базовые шкалы `--awds-font-*`, `--awds-opacity-*`, `--awds-space-*`, `--awds-rounded-*`, `--awds-control-*`, `--awds-shadow-*` **и семантические shape size-токены `--awds-rectangle-*`**) и подключён сайтовый `css-variables.css` (даёт `--color-*` под брендом сайта — кнопка ссылается на роли и токены `arrowds-css`).
5. Добавь размерный модификатор `.btn--{size}` (если не указан — `btn--400`).
