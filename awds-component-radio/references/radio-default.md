# Radio / default

**Figma:** [4ipeXkifl3Hl6pVZUF4nuJ → node 395:56332](https://www.figma.com/design/4ipeXkifl3Hl6pVZUF4nuJ/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B5-Forms?node-id=395-56332)

> [!NOTE]
> Этот файл (`radio-default.md`) — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`radio.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## HTML

**Радиокнопка не бывает одна.** Смысл появляется только в группе с общим `name` — это она обеспечивает взаимное исключение и стрелки клавиатуры. Базовый случай:

```html
<fieldset class="radio-group">
  <legend>Способ доставки</legend>

  <label class="radio radio--400">
    <input class="radio__input" type="radio" name="delivery" value="pickup" checked>
    <span class="radio__box">
      <svg class="radio__dot" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="5"/></svg>
    </span>
    <span class="radio__label">Самовывоз из пункта выдачи</span>
  </label>

  <label class="radio radio--400">
    <input class="radio__input" type="radio" name="delivery" value="courier">
    <span class="radio__box">
      <svg class="radio__dot" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="5"/></svg>
    </span>
    <span class="radio__label">Курьером до двери</span>
  </label>
</fieldset>
```

Одна радиокнопка без подписи (в таблице, в списке) — подпись обязательна для скринридера:

```html
<label class="radio radio--300" aria-label="Выбрать этот тариф">
  <input class="radio__input" type="radio" name="plan" value="pro">
  <span class="radio__box"><svg class="radio__dot" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="5"/></svg></span>
</label>
```

Выключенный вариант:

```html
<input class="radio__input" type="radio" name="delivery" value="post" disabled>
```

Если `<fieldset>`/`<legend>` не подходят по вёрстке — заверни группу в `<div role="radiogroup" aria-labelledby="…">` с отдельным заголовком. Группировка `name` при этом остаётся обязательной.

## Структура

| Элемент | Роль |
|---|---|
| `.radio-group` (`<fieldset>`) | Группа. Вертикальная раскладка с шагом `square/400/gap`. UA-стили fieldset погашены |
| `.radio` (`<label>`) | Обёртка одной кнопки. Несёт размерные аккумуляторы, `gap` до подписи, курсор |
| `.radio__input` | Нативный `<input type="radio">`. Прозрачный, растянут на всю обёртку — он же зона клика, источник состояний и участник группы по `name`. Из потока не убран: остаётся в таб-порядке |
| `.radio__box` | Визуальный круг: фон-градиент, обводка, точка |
| `.radio__dot` | Точка выбора (SVG `circle r=5` в 24-виюбоксе), переключается `opacity` |
| `.radio__label` | Подпись. **Своей типографики не задаёт** — наследует от места вставки |

Порядок `input` → `box` менять нельзя: состояния навешаны сиблинг-селектором `+`.

## Состояния

Ось Figma `Type` — состояние инпута, а не CSS-вариант.

| Состояние | Селектор | Источник |
|---|---|---|
| Unselected Rest | `.radio__box` | bg `secondary-container-core`, chroma `secondary-container-chroma`, border `secondary-container-on-low` |
| Unselected Hover | `.radio:hover > .radio__input:enabled + .radio__box` | bg `secondary-container-dim`, border `secondary-container-on` |
| Unselected Active | `.radio:active > …` | bg = chroma `secondary-container-dim` (плоский), border `secondary-container-on-low` |
| Selected Rest | `.radio__input:checked + .radio__box` | bg `primary-core`, chroma `primary-chroma`, border `primary-core`, точка `primary-on` |
| Selected Hover | `.radio:hover > …:checked` | bg / border `primary-dim` |
| Selected Active | `.radio:active > …:checked` | bg = chroma `primary-core` (плоский градиент) |
| Focus | `.radio__input:focus-visible + .radio__box` | `outline: 2px solid rgb(var(--surface-on-highest))`, **`outline-offset: 0`** |
| Disabled | `.radio:has(> .radio__input:disabled)` | `opacity: var(--awds-opacity-opacity-40)` на всей обёртке |

Значения полностью совпадают с `awds-component-checkbox` — это одна пара токенов `check-radio/*`. `outline-offset: 0`, а не 2px как у `.btn`: в макете кольцо стоит вплотную к кругу.

## Размеры

Класс `.radio--{N}`, где N — один из: `200`, `300`, `400`, `500`. Без класса действует размер 400.

| Класс | Круг | Иконка | Padding | Точка | Когда |
|---|---|---|---|---|---|
| `.radio--200` | 16px | 16 | 0 | ≈6.7px | Плотные таблицы, вложенные списки |
| `.radio--300` | 20px | 20 | 0 | ≈8.3px | Списки выбора, компактные формы |
| `.radio--400` | 24px | 20 | 2 | ≈8.3px | **По умолчанию** — формы, способы доставки/оплаты |
| `.radio--500` | 28px | 24 | 2 | 10px | Крупные формы, тач-интерфейсы |

Размер круга = `icon + 2 × padding`, значения — shape-токены `var(--awds-square-{N}-*)`. Точка масштабируется вместе с иконкой (SVG с `viewBox="0 0 24 24"`), как в макете.

**Скругление не размерное:** `border-radius: var(--awds-rounded-border-radius-full)` — 600px во всех модах коллекции Rounded. Радиокнопка остаётся круглой даже под `.rounded-none`, и это правильно: круг здесь несёт смысл «выбор один из многих».

Тач-таргет: круг на 200/300 меньше 24px. Без подписи и без кликабельной строки-родителя бери 400+.

## Radio или checkbox

| Задача | Контрол |
|---|---|
| Выбрать **один** вариант из нескольких, отказаться нельзя | **radio** (задай `checked` на разумном по умолчанию) |
| Выбрать любое число вариантов, включая ноль | checkbox |
| Одно согласие / одна опция «да-нет» | checkbox, не группа radio из одной кнопки |
| Мгновенное вкл/выкл настройки | switch |

Радиокнопку **нельзя снять кликом** — это поведение нативного инпута, не баг вёрстки. Если пользователю нужно «ничего из перечисленного» — добавь такой вариант явным пунктом группы.

## CSS

Подключение: `radio.css` — один файл на весь компонент (base + sizes + все состояния + группа).

| Блок | Что внутри |
|---|---|
| `@property` | `--awds-radio-bg` / `-chroma` как `<color>` — чтобы градиент интерполировался при смене состояния |
| Base `.radio` | Обёртка: flex, gap, курсор, размерные аккумуляторы (default = 400) |
| `.radio__input` | Прозрачный инпут на всю обёртку |
| `.radio__box` | Круг: размер от токенов, `inset box-shadow` вместо border, `rounded-full`, фон-градиент, transition |
| Sizes `.radio--{N}` | Заполняют `--awds-radio-{padding,icon,gap}` через `var(--awds-square-{N}-*)`; `rounded` не трогают |
| Type + State | Заполняют `--awds-radio-{bg,chroma,border,color}` ролями `rgb(var(--*))` |
| `.radio-group` | Композиция уровня потребителя (в Figma-ноде группы нет): колонка с шагом `square/400/gap` |

## Refresh

Если в Figma изменились токены:

```
обнови awds-component-radio под Figma
```

→ ACB заходит в Figma, сравнивает со снапшотом, показывает diff, регенерирует CSS и preview. Этот markdown остаётся как есть.
