---
name: awds-component-checkbox
description: Checkbox ArrowDS (.checkbox).
---

# Checkbox ArrowDS

Квадратный чекбокс на нативном `<input type="checkbox">` — размеры, цвета и иконки берутся из токенов DS, ничего не хардкодится. См. скилл `arrow-design-system` для общей картины токенов и `arrow-components-builder` для регенерации этого скилла из Figma.

## Главное отличие от других компонент-скиллов

В Figma выбранность выражена **тремя наборами** — `checkbox / selected`, `/ indeterminate`, `/ unselected` (разобраны 16.09.2026: по канону `props.md` выбранность это имя набора, а не ось). В коде им НЕ отвечают CSS-варианты: это состояния инпута, поэтому здесь нет `.checkbox-primary` / `.checkbox-secondary` — вариант один, а вид контрола диктует сам `<input>`:

| Набор Figma | Как получить | Что видно |
|---|---|---|
| `checkbox / unselected` | дефолт | Серый бокс, иконок нет |
| `checkbox / selected` | атрибут `checked` | Жёлтый бокс, галка |
| `checkbox / indeterminate` | `input.indeterminate = true` (только из JS) | Жёлтый бокс, прочерк |

Наборы `selected` и `indeterminate` делят одну палитру `check-radio/selected` — различаются только глифом: галочка против черты. Своей группы ячеек у «частично выбран» в теме нет, и это замысел, а не пропуск.

## Откуда берутся значения

| Что | Источник | Где живёт |
|---|---|---|
| Цвета состояний (bg/chroma/border/color) | роли `rgb(var(--primary-*))`, `rgb(var(--secondary-container-*))` inline, с якорем ячейки `check-radio/{группа}/{свойство}-{состояние}` в той же строке | `references/checkbox.css` |
| Кольцо фокуса | `var(--awds-focus-*)`, вариант Outside + Accent | слой `awds-component-focus-selection` |
| Размеры (padding/icon/rounded/gap) | `var(--awds-space-*)`, `var(--awds-rounded-*)` | ячейки `square/{N}/*`, якорь `#cell` в той же строке |
| Гашение (opacity) | выключенное — `var(--awds-opacity-40)` (ячейка `opacity/control/disabled`), включённое — парное `var(--awds-opacity-100)` (ячейка `opacity/control/enabled`) | слой State темы, группа `opacity` |
| Базовая палитра | RGB-триплеты ролей `--{role}` | `css-variables.css` сайта |

**Промежуточный слой `--awds-checkbox-*` в DS НЕ существует.** Внутри `checkbox.css` есть приватные `--awds-checkbox-*` accumulators, но они scope'нуты только на компонент. Подробнее — [arrow-components-builder/references/component-skill-contract.md](../arrow-components-builder/references/component-skill-contract.md).

## Разметка

```html
<label class="checkbox checkbox--400">
  <input class="checkbox__input" type="checkbox">
  <span class="checkbox__box">
    <svg class="checkbox__icon checkbox__icon--check" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">…</svg>
    <svg class="checkbox__icon checkbox__icon--indeterminate" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">…</svg>
  </span>
  <span class="checkbox__label">Согласен с условиями</span>
</label>
```

Полные пути иконок и остальные варианты разметки — в [references/checkbox-default.md](references/checkbox-default.md).

Порядок `input` → `box` фиксирован (состояния навешаны сиблинг-селектором `+`). Обе иконки всегда в DOM — переключаются `opacity`, лейаут не дёргается.

**Внутри подписи корень — `<span>`, а не `<label>`:**

```html
<label class="lbl lbl--400">
  <span class="checkbox">
    <input class="checkbox__input" type="checkbox">
    <span class="checkbox__box"><!-- обе иконки --></span>
  </span>
  <span class="lbl__body"><span class="lbl__text">Согласен с условиями</span></span>
</label>
```

Вложенные `<label>` невалидны: браузер разбирает такую пару непредсказуемо и клик по тексту перестаёт попадать в инпут, а внешняя обёртка нужна именно ради этого клика. Классы к тегу не привязаны, поэтому работает всё то же самое. Так чекбокс стоит внутри [awds-component-label](../awds-component-label/SKILL.md) и [awds-component-formfield](../awds-component-formfield/SKILL.md); размерный класс там не нужен — ступень раздаёт подпись.

## Размерные модификаторы

| Класс | Бокс | Когда |
|---|---|---|
| `checkbox--200` | 16px | Плотные таблицы, вложенные списки |
| `checkbox--300` | 20px | Списки фильтров, компактные формы |
| `checkbox--400` | 24px | **По умолчанию** — формы, соглашения |
| `checkbox--500` | 28px | Крупные формы, тач-интерфейсы |

Размер бокса = `icon + 2 × padding` из `map.size.square.{N}`. Конкретные значения — в `tokens-map.md` скилла `arrow-design-system`, секция `square`.

На 200/300 бокс меньше тач-минимума 24px: без подписи и без кликабельной строки-родителя бери 400+.

## Доступность

- Инпут остаётся настоящим и в потоке: клавиатура, скринридер, автозаполнение формы работают сами.
- Чекбокс без видимой подписи обязан нести `aria-label` на `<label>`.
- Фокус-кольцо приходит слоем [awds-component-focus-selection](../awds-component-focus-selection/SKILL.md), вариант **Outside + Accent**: полоса 1…3px снаружи бокса. Своих чисел компонент не держит — `focus-selection.css` подключается вместе с `checkbox.css`.
- Disabled гасится `opacity: var(--awds-opacity-40)` (ячейка `opacity/control/disabled`) на всей обёртке — это макетное поведение, контраст подписи в этом состоянии заведомо ниже AA. Не используй disabled как способ «объяснить» недоступность: рядом нужен текст-причина.

## CSS-файл

| Вариант | Файл | Что внутри |
|---|---|---|
| default | `references/checkbox.css` | `.checkbox` base + 4 размера + все три набора × состояния |

## Storybook

Открой [references/preview.html](references/preview.html) локально (`file://`) — матрица размеров × состояний, переключатель типа и темы, живой интерактивный пример с indeterminate.

## Refresh

При изменении токенов в Figma:

```
обнови awds-component-checkbox под Figma
```

ACB зайдёт в Figma по сохранённой ссылке (см. `component.meta.json`), вытащит актуальные variable_defs, сравнит со снапшотом, покажет diff и обновит CSS + preview. Документация (этот файл и `checkbox-default.md`) — не трогается.

## Алгоритм использования

1. Возьми разметку из [references/checkbox-default.md](references/checkbox-default.md) целиком — вместе с обеими иконками.
2. Подключи `references/checkbox.css` (один раз глобально).
3. Убедись, что на странице есть DS-токены (`--awds-square-*`, `--awds-opacity-*`) и сайтовый `css-variables.css` с цветовыми ролями под классом `.theme-default.theme-light` на `<html>`.
4. Добавь размерный модификатор `.checkbox--{N}` (если не указан — действует 400).
5. Indeterminate ставится только из JS: `input.indeterminate = true`.

## Соседние компоненты

- **[awds-component-radio](../awds-component-radio/SKILL.md)** — выбор одного из списка. Близнец: тот же shape `square` и палитра `check-radio/*`, те же состояния. Отличия: круглый (`rounded-full`, не шкала), одна точка вместо галки и прочерка, нет Indeterminate, выбор снимается только группой.
- **[awds-component-switch](../awds-component-switch/SKILL.md)** — мгновенное включение/выключение настройки. Та же палитра `check-radio/*`, но горизонтальная геометрия (`square/{N}/switch-width`) с едущим бегунком. Если настройка применяется только после «Сохранить» — это чекбокс, а не тумблер.
- Чекбокс — про «отметить в наборе» и отложенное применение (форма, фильтр, согласие).
