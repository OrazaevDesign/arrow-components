# Switch / default

**Figma:** [4ipeXkifl3Hl6pVZUF4nuJ → node 395:57077](https://www.figma.com/design/4ipeXkifl3Hl6pVZUF4nuJ/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B5-Forms?node-id=395-57077)

> [!NOTE]
> Этот файл (`switch-default.md`) — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`switch.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## HTML

`role="switch"` на нативном чекбоксе — скринридер объявит «переключатель, вкл/выкл», а не «флажок, отмечен».

**Var=Default** — пустой бегунок:

```html
<label class="switch switch--400">
  <input class="switch__input" type="checkbox" role="switch" checked>
  <span class="switch__track">
    <span class="switch__handle"></span>
  </span>
  <span class="switch__label">Показывать цены с учётом скидки</span>
</label>
```

**Var=Icon** — в бегунке галка (вкл) и крестик (выкл). Нужны **обе** иконки, они переключаются по состоянию:

```html
<label class="switch switch--600">
  <input class="switch__input" type="checkbox" role="switch">
  <span class="switch__track">
    <span class="switch__handle">
      <svg class="switch__icon switch__icon--on" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <g transform="translate(5 7)"><path d="M12.2929 0.292893C12.6834 -0.0976311 13.3164 -0.0976311 13.707 0.292893C14.0975 0.683417 14.0975 1.31643 13.707 1.70696L5.70696 9.70696C5.31643 10.0975 4.68342 10.0975 4.29289 9.70696L0.292893 5.70696C-0.0976311 5.31643 -0.0976311 4.68342 0.292893 4.29289C0.683417 3.90237 1.31643 3.90237 1.70696 4.29289L4.99992 7.58586L12.2929 0.292893Z"/></g>
      </svg>
      <svg class="switch__icon switch__icon--off" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <g transform="translate(5 5)"><path d="M12.2929 0.292893C12.6834 -0.0976311 13.3164 -0.097631 13.707 0.292893C14.0975 0.683417 14.0975 1.31643 13.707 1.70696L8.41399 6.99992L13.707 12.2929C14.0975 12.6834 14.0975 13.3164 13.707 13.707C13.3164 14.0975 12.6834 14.0975 12.2929 13.707L6.99992 8.41399L1.70696 13.707C1.31643 14.0975 0.683418 14.0975 0.292893 13.707C-0.0976304 13.3164 -0.0976305 12.6834 0.292893 12.2929L5.58586 6.99992L0.292893 1.70696C-0.097631 1.31643 -0.0976311 0.683417 0.292893 0.292893C0.683417 -0.097631 1.31643 -0.0976309 1.70696 0.292893L6.99992 5.58586L12.2929 0.292893Z"/></g>
      </svg>
    </span>
  </span>
  <span class="switch__label">Тёмная тема</span>
</label>
```

Без подписи (тумблер в строке настроек, подпись отдельным элементом) — обязателен `aria-label`:

```html
<label class="switch switch--400" aria-label="Уведомления о новых поступлениях">
  <input class="switch__input" type="checkbox" role="switch">
  <span class="switch__track"><span class="switch__handle"></span></span>
</label>
```

Подпись справа от тумблера — как в примере выше. Подпись **слева**, тумблер у правого края строки (типовая раскладка списка настроек):

```html
<div class="my-settings-row">
  <label class="switch switch--400" style="flex-direction: row-reverse; justify-content: space-between; width: 100%;">
    <input class="switch__input" type="checkbox" role="switch">
    <span class="switch__track"><span class="switch__handle"></span></span>
    <span class="switch__label">Синхронизация между устройствами</span>
  </label>
</div>
```

Раскладка строки — зона потребителя, в компоненте её нет: `flex-direction` и `justify-content` задай своим классом, не инлайном.

## Структура

| Элемент | Роль |
|---|---|
| `.switch` (`<label>`) | Обёртка. Несёт размерные аккумуляторы, `gap` до подписи, курсор |
| `.switch__input` | Нативный `<input type="checkbox" role="switch">`. Прозрачный, растянут на всю обёртку — он же зона клика и источник состояний. Из потока не убран: остаётся в таб-порядке |
| `.switch__track` | Трек: размер от токенов, фон-градиент, обводка, `rounded-full`. Здесь же задаются все цветовые аккумуляторы |
| `.switch__handle` | Бегунок: круг, едет через `translateX`. Цвет фона — `handle`, цвет иконки — унаследованный `color` |
| `.switch__icon--on` / `--off` | Галка и крестик, стекнуты в одну grid-ячейку, переключаются `opacity`. Только для Var=Icon |
| `.switch__label` | Подпись. **Своей типографики не задаёт** — наследует от места вставки |

Порядок `input` → `track` менять нельзя: состояния навешаны сиблинг-селектором `+`.

## Геометрия

Всё считается от трёх shape-токенов, ничего не хардкодится:

```
трек:    width  = var(--awds-square-{N}-switch-width)
         height = calc(icon + 2 × padding)
круг:    calc(icon − 2 × var(--awds-space-space-0-5))
ход:     calc(switch-width − 2 × padding − icon)
```

| Size | Трек | Круг | Ход |
|---|---|---|---|
| 200 | 28×16 | 12 | 12 |
| 300 | 32×20 | 16 | 12 |
| 400 | 36×24 | 16 | 12 |
| 500 | 44×28 | 20 | 16 |
| 600 | 52×32 | 24 | 20 |

Ход в макете нарисован распоркой «space» рядом с бегунком; отдельного токена под него нет, поэтому в CSS он выводится формулой — и совпадает с макетом на всех пяти размерах.

**Скругление не размерное:** `var(--awds-rounded-border-radius-full)` — 600px во всех модах коллекции Rounded. Тумблер остаётся пилюлей даже под `.rounded-none`.

## Состояния

| Состояние | Селектор | Источник |
|---|---|---|
| Unselected Rest | `.switch__track` | bg `secondary-container-core`, chroma `secondary-container-chroma`, border `secondary-container-on-low`, handle `secondary-container-on` |
| Unselected Hover | `.switch:hover > .switch__input:enabled + .switch__track` | bg `secondary-container-dim`, border `secondary-container-on` |
| Unselected Active | `.switch:active > …` | bg = chroma `secondary-container-dim` (плоский), border `secondary-container-on-low` |
| Selected Rest | `.switch__input:checked + .switch__track` | bg `primary-core`, chroma `primary-chroma`, border `primary-core`, handle `primary-on-dim` |
| Selected Hover | `.switch:hover > …:checked` | bg / border `primary-dim` |
| Selected Active | `.switch:active > …:checked` | bg = chroma `primary-core` (плоский градиент) |
| Focus | `.switch__input:focus-visible + .switch__track` | `outline: var(--awds-focus-width) solid var(--awds-focus-color)`, **`outline-offset: var(--awds-focus-offset)`** |
| Disabled | `.switch:has(> .switch__input:disabled)` | `opacity: var(--awds-opacity-opacity-40)` на всей обёртке |

Два нюанса из макета:

- **Иконка в бегунке залита цветом трека** (`check-radio/{type}/bg`), а не контрастной ролью — она «выбита» в тёмном или сером круге. Поэтому на hover она уезжает вместе с фоном: `primary-core → primary-dim`.
- **Цвет бегунка при hover/active не меняется** — только при переключении Type.

## Switch, checkbox или radio

| Задача | Контрол |
|---|---|
| Включить/выключить настройку, эффект **сразу** | **switch** |
| Отметить пункты в наборе, применить **по кнопке** | checkbox |
| Одно согласие в форме | checkbox |
| Выбрать один вариант из нескольких | radio |

Тумблер обещает мгновенное действие. Если состояние применяется только после «Сохранить» — это чекбокс, иначе пользователь решит, что уже всё сработало. И не подписывай тумблер отрицанием («Не показывать…»): «выключено» + «не показывать» = двойное отрицание.

## CSS

Подключение: `switch.css` — один файл на весь компонент (base + 5 размеров + все Type × State).

| Блок | Что внутри |
|---|---|
| `@property` | `--awds-switch-bg` / `-chroma` (inherits:false, живут на треке) и `-handle` / `-icon-color` (inherits:true — задаются на треке, потребляются в бегунке) |
| Base `.switch` | Обёртка: flex, gap, курсор, размерные аккумуляторы (default = 400) |
| `.switch__input` | Прозрачный инпут на всю обёртку |
| `.switch__track` | Трек: размеры и `--awds-switch-travel` от токенов, `inset box-shadow` вместо border, градиент, transition цветов |
| `.switch__handle` | Круг: размер и отступ от токенов, `transition: transform` |
| Sizes `.switch--{N}` | Заполняют `--awds-switch-{width,icon,padding,gap}` через `var(--awds-square-{N}-*)` |
| Type + State | Заполняют цветовые аккумуляторы ролями `rgb(var(--*))` |
| `@media (prefers-reduced-motion)` | Гасит переезд бегунка и перекраску — состояние остаётся различимым, меняется мгновенно |

## Refresh

Если в Figma изменились токены:

```
обнови awds-component-switch под Figma
```

→ ACB заходит в Figma, сравнивает со снапшотом, показывает diff, регенерирует CSS и preview. Этот markdown остаётся как есть.
