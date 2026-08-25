---
name: awds-component-radio
description: Радиокнопки ArrowDS на нативном input: выбор одного из списка, размеры, состояния. Для способа доставки и оплаты. Несколько вариантов — checkbox. Токены ArrowDS, работает и по Figma-ссылке.
---

# Radio ArrowDS

Круглая радиокнопка на нативном `<input type="radio">` — размеры, цвета и точка берутся из токенов DS, ничего не хардкодится. См. скилл `arrow-design-system` для общей картины токенов и `arrow-components-builder` для регенерации этого скилла из Figma.

## Главное: радиокнопка живёт только в группе

Ось Figma `Type` (Selected / Unselected) — это **не CSS-варианты**, а состояние инпута. Вариант один, а вид контрола диктует сам `<input>`:

| Figma Type | Как получить | Что видно |
|---|---|---|
| Unselected | дефолт | Серый круг, точки нет |
| Selected | атрибут `checked` | Жёлтый круг с точкой |

Взаимное исключение, стрелки клавиатуры и «нельзя снять выбор кликом» дают **общий `name`** у инпутов группы — это поведение платформы, не CSS. Одна радиокнопка вне группы — почти всегда ошибка выбора контрола (нужен checkbox).

## Откуда берутся значения

| Что | Источник | Где живёт |
|---|---|---|
| Цвета состояний (bg/chroma/border/color) | `rgb(var(--primary-*))`, `rgb(var(--secondary-container-*))` inline | `references/radio.css` |
| Кольцо фокуса | `var(--awds-focus-*)`, вариант Outside + Default | слой `awds-component-focus-selection` |
| Размеры (padding/icon/gap) | `var(--awds-square-{N}-*)` | `component-token-map.json` → `map.size.square` |
| Скругление | `var(--awds-rounded-border-radius-full)` — фиксированное, не размерное | Figma `border-radius/full` |
| Opacity для disabled | `var(--awds-opacity-opacity-40)` | css-global (базовая шкала) |
| Базовая палитра | RGB-триплеты ролей `--{role}` | `css-variables.css` сайта |

**Промежуточный слой `--awds-radio-*` в DS НЕ существует.** Внутри `radio.css` есть приватные `--awds-radio-*` accumulators, но они scope'нуты только на компонент. Подробнее — [arrow-components-builder/references/component-skill-contract.md](../arrow-components-builder/references/component-skill-contract.md).

## Разметка

```html
<fieldset class="radio-group">
  <legend>Способ доставки</legend>
  <label class="radio radio--400">
    <input class="radio__input" type="radio" name="delivery" value="pickup" checked>
    <span class="radio__box">
      <svg class="radio__dot" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="5"/></svg>
    </span>
    <span class="radio__label">Самовывоз</span>
  </label>
  <!-- остальные варианты с тем же name -->
</fieldset>
```

Остальные варианты разметки (без подписи, disabled, `role="radiogroup"` вместо fieldset) — в [references/radio-default.md](references/radio-default.md).

## Размерные модификаторы

| Класс | Круг | Когда |
|---|---|---|
| `radio--200` | 16px | Плотные таблицы, вложенные списки |
| `radio--300` | 20px | Списки выбора, компактные формы |
| `radio--400` | 24px | **По умолчанию** — способы доставки/оплаты, тарифы |
| `radio--500` | 28px | Крупные формы, тач-интерфейсы |

Круг = `icon + 2 × padding` из `map.size.square.{N}`; точка масштабируется вместе с иконкой. Конкретные значения — в `tokens-map.md` скилла `arrow-design-system`, секция `square`.

Скругление у всех размеров одно — `var(--awds-rounded-border-radius-full)` (600px во всех модах Rounded), поэтому радиокнопка круглая даже под `.rounded-none`.

На 200/300 круг меньше тач-минимума 24px: без подписи и без кликабельной строки-родителя бери 400+.

## Доступность

- Инпут остаётся настоящим и в потоке: группировка по `name`, стрелки клавиатуры, скринридер и отправка формы работают сами.
- Группе нужен заголовок: `<fieldset>` + `<legend>` либо `role="radiogroup"` + `aria-labelledby`.
- Радиокнопка без видимой подписи обязана нести `aria-label` на `<label>`.
- Фокус-кольцо приходит слоем [awds-component-focus-selection](../awds-component-focus-selection/SKILL.md), вариант **Outside + Default**: полоса 1…3px снаружи круга. Своих чисел компонент не держит — `focus-selection.css` подключается вместе с `radio.css`.
- Disabled гасится `opacity: var(--awds-opacity-opacity-40)` на всей обёртке — макетное поведение, контраст подписи в этом состоянии заведомо ниже AA. Рядом нужен текст-причина, а не только серость.
- Ставь `checked` на разумный вариант по умолчанию: группа без выбора заставляет пользователя угадывать, а «снять всё» он потом не сможет.

## CSS-файл

| Вариант | Файл | Что внутри |
|---|---|---|
| default | `references/radio.css` | `.radio` base + 4 размера + все Type × State + `.radio-group` |

## Storybook

Открой [references/preview.html](references/preview.html) локально (`file://`) — матрица размеров × состояний, переключатели типа, темы и мода скругления (проверка, что круг остаётся кругом), живые группы с общим `name`.

## Refresh

При изменении токенов в Figma:

```
обнови awds-component-radio под Figma
```

ACB зайдёт в Figma по сохранённой ссылке (см. `component.meta.json`), вытащит актуальные variable_defs, сравнит со снапшотом, покажет diff и обновит CSS + preview. Документация (этот файл и `radio-default.md`) — не трогается.

## Алгоритм использования

1. Проверь, что нужен именно radio: **один** вариант из нескольких, отказаться нельзя. Иначе — checkbox или switch.
2. Возьми разметку группы из [references/radio-default.md](references/radio-default.md) — вместе с `<fieldset>`/`<legend>` и общим `name`.
3. Подключи `references/radio.css` (один раз глобально).
4. Убедись, что на странице есть DS-токены (`--awds-square-*`, `--awds-rounded-border-radius-full`, `--awds-opacity-*`) и сайтовый `css-variables.css` с цветовыми ролями под классом `.theme-default.theme-light` на `<html>`.
5. Добавь размерный модификатор `.radio--{N}` (если не указан — действует 400) и `checked` на вариант по умолчанию.

## Соседние компоненты

- **[awds-component-checkbox](../awds-component-checkbox/SKILL.md)** — близнец: тот же shape `square`, та же палитра `check-radio/*`, те же состояния. Отличия: квадрат со скруглением из шкалы, галка + прочерк (есть Indeterminate), выбор снимается кликом.
- **[awds-component-switch](../awds-component-switch/SKILL.md)** — мгновенное включение/выключение настройки. Та же палитра `check-radio/*`, но горизонтальная геометрия (`square/{N}/switch-width`) с едущим бегунком.
