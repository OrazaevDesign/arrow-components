# Checkbox / default

**Figma:** [4ipeXkifl3Hl6pVZUF4nuJ → node 395:43665](https://www.figma.com/design/4ipeXkifl3Hl6pVZUF4nuJ/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B5-Forms?node-id=395-43665)

> [!NOTE]
> Этот файл (`checkbox-default.md`) — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`checkbox.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## HTML

Полная разметка (иконки нужны обе — они переключаются по состоянию инпута):

```html
<label class="checkbox checkbox--400">
  <input class="checkbox__input" type="checkbox">
  <span class="checkbox__box">
    <svg class="checkbox__icon checkbox__icon--check" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.2929 7.29289C17.6834 6.90237 18.3164 6.90237 18.7069 7.29289C19.0975 7.68342 19.0975 8.31643 18.7069 8.70696L10.7069 16.707C10.3164 17.0975 9.68342 17.0975 9.29289 16.707L5.29289 12.707C4.90237 12.3164 4.90237 11.6834 5.29289 11.2929C5.68342 10.9024 6.31643 10.9024 6.70696 11.2929L9.99992 14.5859L17.2929 7.29289Z"/></svg>
    <svg class="checkbox__icon checkbox__icon--indeterminate" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 11C18.5523 11 19 11.4477 19 12C19 12.5523 18.5523 13 18 13H6C5.44772 13 5 12.5523 5 12C5 11.4477 5.44772 11 6 11H18Z"/></svg>
  </span>
  <span class="checkbox__label">Согласен получать письма о скидках</span>
</label>
```

Без подписи (в таблице, в списке фильтров) — подпись обязательна для скринридера, поэтому `aria-label`:

```html
<label class="checkbox checkbox--300" aria-label="Выбрать строку">
  <input class="checkbox__input" type="checkbox">
  <span class="checkbox__box"><!-- обе иконки --></span>
</label>
```

Отмечен изначально / выключен:

```html
<input class="checkbox__input" type="checkbox" checked>
<input class="checkbox__input" type="checkbox" disabled>
```

Indeterminate («выбрать всё», часть подпунктов отмечена) — **атрибута нет**, только через JS:

```js
document.querySelector('#select-all .checkbox__input').indeterminate = true;
```

Если в разметке одновременно `checked` и `indeterminate = true` — как и в браузерном чекбоксе, показывается прочерк.

## Структура

| Элемент | Роль |
|---|---|
| `.checkbox` (`<label>`) | Обёртка. Несёт размерные аккумуляторы, `gap` до подписи, курсор |
| `.checkbox__input` | Нативный `<input type="checkbox">`. Прозрачный, растянут на всю обёртку — он же зона клика и источник состояний. Из потока не убран: остаётся в таб-порядке и доступен скринридеру |
| `.checkbox__box` | Визуальный квадрат: фон-градиент, обводка, иконки |
| `.checkbox__icon--check` / `--indeterminate` | Галка и прочерк, стекнуты в одну grid-ячейку, переключаются `opacity` |
| `.checkbox__label` | Подпись. **Своей типографики не задаёт** — наследует от места вставки |

Порядок `input` → `box` менять нельзя: состояния навешаны сиблинг-селектором `+`.

## Состояния

Ось Figma `Type` — это состояния инпута, а не CSS-варианты. Selected и Indeterminate делят палитру `check-radio/selected`, различаются только иконкой.

| Состояние | Селектор | Источник |
|---|---|---|
| Unselected Rest | `.checkbox__box` | bg `secondary-container-core`, chroma `secondary-container-chroma`, border `secondary-container-on-low` |
| Unselected Hover | `.checkbox:hover > .checkbox__input:enabled + .checkbox__box` | bg `secondary-container-dim`, border `secondary-container-on` |
| Unselected Active | `.checkbox:active > …` | bg = chroma `secondary-container-dim` (плоский), border `secondary-container-on-low` |
| Selected / Indeterminate Rest | `:checked +`, `:indeterminate +` | bg `primary-core`, chroma `primary-chroma`, border `primary-core`, иконка `primary-on` |
| Selected / Indeterminate Hover | `.checkbox:hover > …:checked` | bg / border `primary-dim` |
| Selected / Indeterminate Active | `.checkbox:active > …:checked` | bg = chroma `primary-core` (плоский градиент) |
| Focus | `.checkbox__input:focus-visible + .checkbox__box` | `outline: 2px solid rgb(var(--surface-on-highest))`, **`outline-offset: 0`** |
| Disabled | `.checkbox:has(> .checkbox__input:disabled)` | `opacity: var(--awds-opacity-opacity-40)` на всей обёртке |

`outline-offset: 0`, а не 2px как у `.btn` — в макете FocusSelection стоит вплотную к боксу. Контрол маленький (16–28px), кольцо с зазором на нём выглядело бы отдельным элементом.

## Размеры

Класс `.checkbox--{N}`, где N — один из: `200`, `300`, `400`, `500`. Без класса действует размер 400.

| Класс | Бокс | Иконка | Padding | Radius | Когда |
|---|---|---|---|---|---|
| `.checkbox--200` | 16px | 16 | 0 | `rounded-200` | Плотные таблицы, вложенные списки |
| `.checkbox--300` | 20px | 20 | 0 | `rounded-300` | Списки фильтров, компактные формы |
| `.checkbox--400` | 24px | 20 | 2 | `rounded-400` | **По умолчанию** — формы, соглашения |
| `.checkbox--500` | 28px | 24 | 2 | `rounded-500` | Крупные формы, тач-интерфейсы |

Размер бокса = `icon + 2 × padding`, значения — shape-токены `var(--awds-square-{N}-*)` (см. `arrow-design-system/references/tokens-components-size.md`, секция `square`).

Тач-таргет: сам бокс на 200/300 меньше 24px. Если чекбокс стоит без подписи и без соседней кликабельной области — бери 400+ либо расширь зону клика на родителе (строку таблицы, ячейку).

## CSS

Подключение: `checkbox.css` — один файл на весь компонент (base + sizes + все состояния).

| Блок | Что внутри |
|---|---|
| `@property` | `--awds-checkbox-bg` / `-chroma` как `<color>` — чтобы градиент интерполировался при смене состояния |
| Base `.checkbox` | Обёртка: flex, gap, курсор, размерные аккумуляторы (default = 400) |
| `.checkbox__input` | Прозрачный инпут на всю обёртку |
| `.checkbox__box` | Квадрат: размер от токенов, `inset box-shadow` вместо border, фон-градиент, transition |
| Sizes `.checkbox--{N}` | Заполняют `--awds-checkbox-{padding,icon,rounded,gap}` через `var(--awds-square-{N}-*)` |
| Type + State | Заполняют `--awds-checkbox-{bg,chroma,border,color}` ролями `rgb(var(--*))` |

## Refresh

Если в Figma изменились токены:

```
обнови awds-component-checkbox под Figma
```

→ ACB заходит в Figma, сравнивает со снапшотом, показывает diff, регенерирует CSS и preview. Этот markdown остаётся как есть.
