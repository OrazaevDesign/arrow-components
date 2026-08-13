---
name: awds-component-switch
description: >
  Верстка тумблеров-переключателей ArrowDS — HTML-разметка и CSS на токенах дизайн-системы.
  Используй ВСЕГДА при: включении/выключении настройки с мгновенным эффектом (тёмная тема,
  уведомления, показ цен со скидкой, синхронизация), списке настроек с переключателями,
  добавлении switch / toggle в форму, панель настроек или PageCraft-блок, выборе размера
  тумблера (28/32/36/44/52px по ширине), варианте с иконками галка-крестик в бегунке,
  вопросах о стилях switch / switch__track / switch__handle / check-radio.
  Построен на нативном input type="checkbox" role="switch" — Selected / Unselected это
  :checked / дефолт, а не CSS-варианты.
  Для отметки пунктов с применением по кнопке — awds-component-checkbox, для выбора одного
  из списка — awds-component-radio, не этот скилл.
---

# Switch ArrowDS

Тумблер на нативном `<input type="checkbox" role="switch">` — размеры, цвета и иконки берутся из токенов DS, ничего не хардкодится. См. скилл `arrow-design-system` для общей картины токенов и `arrow-components-builder` для регенерации этого скилла из Figma.

## Оси макета → чем выражены в CSS

| Ось Figma | Значения | В CSS |
|---|---|---|
| `Type` | Selected / Unselected | Состояние инпута: `checked` / дефолт |
| `Var` | Default / Icon | **Наличие иконок в разметке.** Отдельного класса нет — правила CSS одни и те же |
| `Size` | 200 / 300 / 400 / 500 / 600 | `.switch--{N}` |
| `State` | Rest / Hover / Focus / Active / Disabled | `:hover` / `:focus-visible` / `:active` / `:disabled` |

Тумблер обещает **мгновенный** эффект. Если настройка применяется только после «Сохранить» — это чекбокс, а не switch.

## Откуда берутся значения

| Что | Источник | Где живёт |
|---|---|---|
| Цвета трека (bg/chroma/border) | `rgb(var(--primary-*))`, `rgb(var(--secondary-container-*))` inline | `references/switch.css` |
| Цвет бегунка | `rgb(var(--primary-on-dim))` / `rgb(var(--secondary-container-on))` | `component-token-map.json` → `check-radio.*.handle` |
| Цвет иконки в бегунке | = цвет фона трека (иконка «выбита» в круге) | Figma `check-radio/{type}/bg` |
| Цвет фокус-обводки | `rgb(var(--surface-on-highest))` (inline) | `component-token-map.json` → `map.state.focus` |
| Геометрия (ширина/высота/круг/ход) | `var(--awds-square-{N}-{switch-width,icon,padding})` + `var(--awds-space-0-5)` | `component-token-map.json` → `map.size.square` |
| Скругление | `var(--awds-rounded-full)` — фиксированное, не размерное | Figma `border-radius/full` |
| Opacity для disabled | `var(--awds-opacity-40)` | css-global (базовая шкала) |
| Базовая палитра | RGB-триплеты ролей `--{role}` | `css-variables.css` сайта |

**Промежуточный слой `--awds-switch-*` в DS НЕ существует.** Внутри `switch.css` есть приватные `--awds-switch-*` accumulators, но они scope'нуты только на компонент. Подробнее — [arrow-components-builder/references/component-skill-contract.md](../arrow-components-builder/references/component-skill-contract.md).

## Разметка

```html
<label class="switch switch--400">
  <input class="switch__input" type="checkbox" role="switch" checked>
  <span class="switch__track">
    <span class="switch__handle"></span>
  </span>
  <span class="switch__label">Показывать цены с учётом скидки</span>
</label>
```

Вариант с иконками (галка / крестик в бегунке), раскладка «подпись слева, тумблер справа» и версия без подписи — в [references/switch-default.md](references/switch-default.md).

## Размерные модификаторы

| Класс | Трек | Круг | Ход | Когда |
|---|---|---|---|---|
| `switch--200` | 28×16 | 12 | 12 | Плотные таблицы, вложенные списки |
| `switch--300` | 32×20 | 16 | 12 | Компактные панели |
| `switch--400` | 36×24 | 16 | 12 | **По умолчанию** — списки настроек |
| `switch--500` | 44×28 | 20 | 16 | Крупные формы |
| `switch--600` | 52×32 | 24 | 20 | Тач-интерфейсы; единственный размер, где иконки в бегунке читаются уверенно |

Геометрия выводится из токенов формулами (см. `switch-default.md` → «Геометрия»), включая **ход бегунка**: `switch-width − 2×padding − icon`. Отдельного токена под ход в Figma нет — в макете это распорка рядом с бегунком.

Скругление у всех размеров одно — `var(--awds-rounded-full)`, тумблер остаётся пилюлей даже под `.rounded-none`.

## Доступность

- `role="switch"` на нативном чекбоксе: скринридер объявит «переключатель, вкл/выкл» вместо «флажок, отмечен». Клавиатура, таб-порядок и отправка формы работают сами.
- Тумблер без видимой подписи обязан нести `aria-label` на `<label>`.
- Фокус-кольцо — `outline-offset: 0` (вплотную к треку, как в макете), не 2px как у `.btn`.
- Подпись формулируй утверждением, не отрицанием: «выключено» + «Не показывать…» читается как двойное отрицание.
- Disabled гасится `opacity: var(--awds-opacity-40)` на всей обёртке — макетное поведение, контраст подписи в этом состоянии заведомо ниже AA. Рядом нужен текст-причина.
- `@media (prefers-reduced-motion: reduce)` гасит переезд бегунка: состояние остаётся различимым (положение, цвет, иконка), меняется мгновенно.

## CSS-файл

| Вариант | Файл | Что внутри |
|---|---|---|
| default | `references/switch.css` | `.switch` base + 5 размеров + все Type × State + reduced-motion |

## Storybook

Открой [references/preview.html](references/preview.html) локально (`file://`) — матрица размеров × состояний, переключатели типа, `Var`, темы и мода скругления, живые строки настроек с рабочим переездом бегунка.

## Refresh

При изменении токенов в Figma:

```
обнови awds-component-switch под Figma
```

ACB зайдёт в Figma по сохранённой ссылке (см. `component.meta.json`), вытащит актуальные variable_defs, сравнит со снапшотом, покажет diff и обновит CSS + preview. Документация (этот файл и `switch-default.md`) — не трогается.

## Алгоритм использования

1. Проверь, что нужен именно switch: эффект применяется **сразу**. Иначе — checkbox.
2. Возьми разметку из [references/switch-default.md](references/switch-default.md); для `Var=Icon` нужны **обе** иконки — они переключаются по состоянию.
3. Подключи `references/switch.css` (один раз глобально).
4. Убедись, что на странице есть DS-токены (`--awds-square-*`, `--awds-rounded-full`, `--awds-space-0-5`, `--awds-opacity-*`) и сайтовый `css-variables.css` с цветовыми ролями под классом `.theme-default.theme-light` на `<html>`.
5. Добавь размерный модификатор `.switch--{N}` (если не указан — действует 400).
6. Раскладку строки настроек (подпись слева, тумблер у правого края) задай своим классом-обёрткой — в компоненте её нет.

## Соседние компоненты

Тройка форм на одной палитре `check-radio/*` и одной shape-шкале `square`:

- **[awds-component-checkbox](../awds-component-checkbox/SKILL.md)** — отметить пункты в наборе, применение отложенное. Квадрат, галка + прочерк (есть Indeterminate).
- **[awds-component-radio](../awds-component-radio/SKILL.md)** — выбрать один вариант из нескольких. Круг, точка, группа с общим `name`.
- **Switch** (этот) — мгновенное вкл/выкл. Отличия от близнецов: горизонтальная геометрия с едущим бегунком, размер 600, ось `Var`, своя роль `handle`, иконка залита цветом трека.
