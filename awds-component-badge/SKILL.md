---
name: awds-component-badge
description: >
  Верстка маркет-бейджей (Badge) ArrowDS — HTML-разметка и CSS на токенах дизайн-системы.
  Используй ВСЕГДА при: добавлении бейджа скидки / процента / маркет-метки в разметку,
  карточку товара или PageCraft-блок, выборе размера бейджа, вопросах о стилях
  badge / badge-market-percent, получении Figma-ссылки на компонент Badge. Градиентная
  пилюля с опциональными иконками-слотами и текстовым лейблом, 7 размеров, статичный.
---

# Badge (маркет-бейдж) ArrowDS

Декоративная градиентная пилюля для маркет-меток — скидка, процент, распродажа, статус. С опциональными иконками-слотами (prefix / suffix) и текстовым лейблом. Ничего не хардкодит: размеры — shape `rectangle`, цвета — роли. См. скилл `arrow-design-system`.

Остальные семейства бейджей (system/*, state/*) уже описаны в `arrow-design-system/references/component-token-map.json` и добавляются будущими вариантами через `arrow-components-builder`.

## Варианты (4)

| Вариант | Reference | Цвет | Когда |
|---|---|---|---|
| **Market Percent** | `references/badge-market-percent.md` ✅ | accent (яркий градиент) | Бейдж скидки / процента на карточке товара, в маркет-сетке |
| **Market Sale** | `references/badge-market-sale.md` ✅ | primary (брендовый градиент) | Бейдж распродажи / акции, привлекающий внимание брендовым цветом |
| **Market New** | `references/badge-market-new.md` ✅ | info (синий градиент) | Бейдж новинки / только что добавленного товара |
| **Market Brand** | `references/badge-market-brand.md` ✅ | secondary (приглушённый градиент) | Нейтральная метка бренда / категории без яркого акцента |

## Откуда берутся значения

| Что | Источник |
|---|---|
| Фон (градиент) | `linear-gradient(to right, rgb(var(--{role}-chroma)), rgb(var(--{role}-core)))` — role = accent (percent) / primary (sale) / info (new) / secondary (brand) |
| Обводка | `rgb(var(--{role}-core))` (inset box-shadow, inside-stroke) |
| Цвет текста / иконок | `rgb(var(--{role}-on))` |
| Padding / gap / размер иконки / скругление | shape `rectangle`: `var(--awds-rectangle-N-padding / -gap / -icon / -rounded)` |
| Типографика | `var(--awds-rectangle-N-typography-font-size / -line-height / -letter-spacing)` |
| Цифры процента | `font-variant-numeric: tabular-nums` (не прыгают при смене значения) |

Состояний нет (бейдж статичный, декоративный — не контрол). Маппинг variant → роль фиксируется в `component.meta.json` + `snapshot/figma.json`. Обновление — через `arrow-components-builder` («обнови awds-component-badge»).

## Размеры (7)

`.badge--{N}`, N — `600 500 400 300 200 100 50`. По умолчанию `badge--400`. Размер задаёт padding, gap между слотами, размер иконки, скругление и типографику лейбла.

## Структура разметки

Инлайновый `<span class="badge badge-market-percent badge--{N}">` с любой комбинацией:

- **Лейбл** — `<span class="badge__label">-30%</span>` (overflow/ellipsis не задевает иконки).
- **Иконки-слоты** — `<svg class="badge__icon">` или прямой `<svg>` ребёнок. Можно prefix (до лейбла), suffix (после), или оба.
- **Type=Icon** (только иконки) — та же пилюля без `__label`, лейбл просто опускается.

Gap между слотами и горизонтальный padding управляются токенами размера — руками отступы не ставим.

## CSS

Один файл — `references/badge.css` (база `.badge` + варианты `.badge-market-{percent,sale,new,brand}` + 7 размеров). Подключается один раз глобально.

Визуальный QA — `references/preview.html` (storybook, `file://`): матрица размер × (тип text/icon) + контекст на карточке товара.

## Алгоритм использования

1. Разметка (инлайновый `<span>`):
   - только процент: `<span class="badge badge-market-percent badge--400"><span class="badge__label">-30%</span></span>`
   - с иконкой слева: `<span class="badge badge-market-percent badge--400"><svg class="badge__icon" ...></svg><span class="badge__label">-30%</span></span>`
   - только иконка: `<span class="badge badge-market-percent badge--200"><svg class="badge__icon" ...></svg></span>`
2. Выбери размер `badge--{N}` под контекст (на карточке товара обычно 200–400).
3. Позиционирование в углу карточки/фото — на стороне потребителя: контейнер `position: relative`, бейдж `position: absolute; top/left`.
4. Подключи `references/badge.css`. Нужны `css-variables.css` сайта (роли `--accent-*` для percent, `--primary-*` для sale, `--info-*` для new, `--secondary-*` для brand) и базовые токены DS (`--awds-rectangle-*`, `--awds-font-*`).

## Refresh

```
обнови awds-component-badge под Figma
```

ACB зайдёт в Figma по ссылке (`component.meta.json`), сравнит снапшот, обновит `badge-market-percent.css` + preview. Документация (этот файл и `{variant}.md`) — не трогается.
