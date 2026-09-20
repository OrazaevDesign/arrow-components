---
name: awds-component-badge
description: Badge ArrowDS (.badge).
---

# Badge (бейдж) ArrowDS

Декоративная пилюля с градиентной заливкой, опциональными иконками-слотами (prefix / suffix)
и текстовым лейблом. Ничего не хардкодит: размеры — shape `rectangle`, цвета — ячейки слоя
State темы студии. См. скилл `arrow-design-system`.

## Варианты (17) — три семейства

**Market (4)** — витрина: метка на карточке товара.

| Вариант | Reference | Цвет | Когда |
|---|---|---|---|
| **Market Percent** | `references/badge-market-percent.md` ✅ | accent | Скидка / процент на карточке товара |
| **Market Sale** | `references/badge-market-sale.md` ✅ | primary | Распродажа, акция — брендовым цветом |
| **Market New** | `references/badge-market-new.md` ✅ | info | Новинка, только что добавленный товар |
| **Market Brand** | `references/badge-market-brand.md` ✅ | secondary | Нейтральная метка бренда / категории |

**System (7)** — служебная семантика сообщения.

| Вариант | Reference | Цвет | Когда |
|---|---|---|---|
| **System Info** | `references/badge-system-info.md` ✅ | info | Уведомление без требования действия |
| **System Accent** | `references/badge-system-accent.md` ✅ | accent | Внимание нужно, но это ещё не ошибка |
| **System Secondary** | `references/badge-system-secondary.md` ✅ | secondary | Второстепенная пометка, не борется за внимание |
| **System Ghost** | `references/badge-system-ghost.md` ✅ | прозрачный | Плотные списки, где заливка создаёт шум |
| **System Success** | `references/badge-system-success.md` ✅ | success | Операция завершена успешно |
| **System Warning** | `references/badge-system-warning.md` ✅ | warning | Действие возможно, но требует внимания |
| **System Error** | `references/badge-system-error.md` ✅ | error | Операция не выполнена |

**Status (6)** — стадия заказа. В Figma семейство называется `state`, в теме и в классах — `status`:
в CSS «state» уже занято состоянием (rest / hover / focus).

| Вариант | Reference | Цвет | Когда |
|---|---|---|---|
| **State New** | `references/badge-status-new.md` ✅ | info | Новый заказ, не обработан |
| **State Paid** | `references/badge-status-paid.md` ✅ | success | Оплачен |
| **State Paid Client** | `references/badge-status-paidclient.md` ✅ | warning | Оплачен клиентом мимо нас |
| **State In Progress** | `references/badge-status-inprogress.md` ✅ | info-container | В работе — единственный на светлом контейнере |
| **State Delivered** | `references/badge-status-delivered.md` ✅ | secondary | Доставлен |
| **State Cancelled** | `references/badge-status-cancelled.md` ✅ | secondary | Отменён |

## Откуда берутся значения

| Что | Источник |
|---|---|
| Фон (градиент) | `linear-gradient(to right, chroma, bg)` из ячеек `--awds-state-badge-{вариант}-{chroma,bg}-rest` |
| Обводка | `--awds-state-badge-{вариант}-border-rest` (inset box-shadow, inside-stroke как в Figma) |
| Цвет текста / иконок | `--awds-state-badge-{вариант}-color-rest` |
| Padding / gap / размер иконки / скругление | shape `rectangle`: `var(--awds-size-rectangle-N-padding / -gap / -icon / -rounded)` |
| Типографика | `var(--awds-size-rectangle-N-typography)` + `--awds-control-line-height-N / -letter-spacing-N` |
| Цифры процента | `font-variant-numeric: tabular-nums` (не прыгают при смене значения) |

**Цвет варианта целиком описан студией**, ролью инлайном не задаётся: у бейджа четыре
свойства на вариант (bg, chroma, border, color), и держать их согласованными должен один
источник. Своих значений в вариантах нет ни одного.

Состояний нет (бейдж статичный, декоративный — не контрол). Обновление — через
`arrow-components-builder` («обнови awds-component-badge»).

## Что сейчас расходится с макетом

Три расхождения — на стороне темы, не компонента; чинятся в студии, компонент подхватит сам:

- **`secondary-chroma` = `secondary-core`** и **`error-chroma` = `error-core`** — градиент
  вырождается в плоскую заливку у пяти вариантов: Secondary, Brand, Delivered, Cancelled, Error.
  В Figma стопы у них разные.
- **`error-core` = `accent-core`** (211 49 34) — Error и Accent неразличимы, хотя в макете
  Error заметно темнее.
## Размеры (7)

`.badge--{N}`, N — `600 500 400 300 200 100 50`. По умолчанию `badge--400`. Размер задаёт padding, gap между слотами, размер иконки, скругление и типографику лейбла.

## Структура разметки

Инлайновый `<span class="badge badge-market-percent badge--{N}">` с любой комбинацией:

- **Лейбл** — `<span class="badge__label">-30%</span>` (overflow/ellipsis не задевает иконки).
- **Иконки-слоты** — `<svg class="badge__icon">` или прямой `<svg>` ребёнок. Можно prefix (до лейбла), suffix (после), или оба.
- **Type=Icon** (только иконки) — та же пилюля без `__label`, лейбл просто опускается.

Gap между слотами и горизонтальный padding управляются токенами размера — руками отступы не ставим.

## CSS

Один файл — `references/badge.css` (база `.badge` + 17 вариантов `.badge-market-*` / `.badge-system-*` / `.badge-status-*` + 7 размеров). Подключается один раз глобально.

Визуальный QA — `references/preview.html` (storybook, `file://`): матрица размер × (тип text/icon) + контекст на карточке товара.

## Алгоритм использования

1. Разметка (инлайновый `<span>`):
   - только процент: `<span class="badge badge-market-percent badge--400"><span class="badge__label">-30%</span></span>`
   - с иконкой слева: `<span class="badge badge-market-percent badge--400"><svg class="badge__icon" ...></svg><span class="badge__label">-30%</span></span>`
   - только иконка: `<span class="badge badge-market-percent badge--200"><svg class="badge__icon" ...></svg></span>`
2. Выбери размер `badge--{N}` под контекст (на карточке товара обычно 200–400).
3. Позиционирование в углу карточки/фото — на стороне потребителя: контейнер `position: relative`, бейдж `position: absolute; top/left`.
4. Подключи `references/badge.css`. Нужны ячейки слоя State темы (`--awds-state-badge-*`) и базовые токены DS (`--awds-size-rectangle-*`, `--awds-control-*`, `--awds-font-*`).

## Refresh

```
обнови awds-component-badge под Figma
```

ACB зайдёт в Figma по ссылке (`component.meta.json`), сравнит снапшот, обновит `badge.css` + preview. Документация (этот файл и `{variant}.md`) — не трогается.
