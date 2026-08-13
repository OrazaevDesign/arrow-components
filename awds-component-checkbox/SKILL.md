---
name: awds-component-checkbox
description: >
  Верстка чекбоксов ArrowDS — HTML-разметка и CSS на токенах дизайн-системы.
  Используй ВСЕГДА при: добавлении чекбокса в форму, фильтры, таблицу или PageCraft-блок,
  согласии с условиями / подписке / «выбрать всё», выборе размера чекбокса (16/20/24/28px),
  состоянии indeterminate (частично отмеченный список), вопросах о стилях checkbox /
  checkbox__box / check-radio, получении Figma-ссылки на компонент Checkbox.
  Построен на нативном input type="checkbox" — состояния Selected / Indeterminate /
  Unselected это :checked / :indeterminate / дефолт, а не CSS-варианты.
  Для переключателя «вкл/выкл» — это switch, для выбора одного из списка — radio, не этот скилл.
---

# Checkbox ArrowDS

Квадратный чекбокс на нативном `<input type="checkbox">` — размеры, цвета и иконки берутся из токенов DS, ничего не хардкодится. См. скилл `arrow-design-system` для общей картины токенов и `arrow-components-builder` для регенерации этого скилла из Figma.

## Главное отличие от других компонент-скиллов

Ось Figma `Type` (Selected / Indeterminate / Unselected) — это **не CSS-варианты**, а состояния инпута. Поэтому здесь нет `.checkbox-primary` / `.checkbox-secondary`: вариант один, а вид контрола диктует сам `<input>`:

| Figma Type | Как получить | Что видно |
|---|---|---|
| Unselected | дефолт | Серый бокс, иконок нет |
| Selected | атрибут `checked` | Жёлтый бокс, галка |
| Indeterminate | `input.indeterminate = true` (только из JS) | Жёлтый бокс, прочерк |

Selected и Indeterminate делят одну палитру `check-radio/selected` — различаются только иконкой.

## Откуда берутся значения

| Что | Источник | Где живёт |
|---|---|---|
| Цвета состояний (bg/chroma/border/color) | `rgb(var(--primary-*))`, `rgb(var(--secondary-container-*))` inline | `references/checkbox.css` |
| Цвет фокус-обводки | `rgb(var(--surface-on-highest))` (inline) | `component-token-map.json` → `map.state.focus` |
| Размеры (padding/icon/rounded/gap) | `var(--awds-square-{N}-*)` | `component-token-map.json` → `map.size.square` |
| Opacity для disabled | `var(--awds-opacity-40)` | css-global (базовая шкала) |
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

## Размерные модификаторы

| Класс | Бокс | Когда |
|---|---|---|
| `checkbox--200` | 16px | Плотные таблицы, вложенные списки |
| `checkbox--300` | 20px | Списки фильтров, компактные формы |
| `checkbox--400` | 24px | **По умолчанию** — формы, соглашения |
| `checkbox--500` | 28px | Крупные формы, тач-интерфейсы |

Размер бокса = `icon + 2 × padding` из `map.size.square.{N}`. Конкретные значения — в `tokens-components-size.md` скилла `arrow-design-system`, секция `square`.

На 200/300 бокс меньше тач-минимума 24px: без подписи и без кликабельной строки-родителя бери 400+.

## Доступность

- Инпут остаётся настоящим и в потоке: клавиатура, скринридер, автозаполнение формы работают сами.
- Чекбокс без видимой подписи обязан нести `aria-label` на `<label>`.
- Фокус-кольцо — `outline-offset: 0` (вплотную к боксу, как в макете), не 2px как у `.btn`.
- Disabled гасится `opacity: var(--awds-opacity-40)` на всей обёртке — это макетное поведение, контраст подписи в этом состоянии заведомо ниже AA. Не используй disabled как способ «объяснить» недоступность: рядом нужен текст-причина.

## CSS-файл

| Вариант | Файл | Что внутри |
|---|---|---|
| default | `references/checkbox.css` | `.checkbox` base + 4 размера + все Type × State |

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
