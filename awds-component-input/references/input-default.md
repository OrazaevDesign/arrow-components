# Input / Default

**Figma:** [4ipeXkifl3Hl6pVZUF4nuJ → node 3:1152](https://www.figma.com/design/4ipeXkifl3Hl6pVZUF4nuJ/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B5-Forms?node-id=3-1152)

> [!NOTE]
> Этот файл (`input-default.md`) — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`input-default.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## HTML

Минимальное поле — контейнер-рамка + нативный `<input>`:

```html
<label for="email">Электронная почта</label>
<span class="input input-default input--400">
  <input class="input__field" id="email" type="email" placeholder="you@example.com">
</span>
```

Подпись — **снаружи** компонента: в макете её нет, а `<label for>` должен ссылаться на настоящее поле. Оборачивать контейнер в `<label>` не надо — по нему и так работает клик (`cursor: text`), а вложенный label перехватил бы фокус.

С иконкой слева:

```html
<span class="input input-default input--500">
  <span class="input__prefix" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/></svg>
  </span>
  <input class="input__field" type="search" placeholder="Поиск по каталогу">
</span>
```

Иконки с двух сторон, несколько в слоте:

```html
<span class="input input-default input--400">
  <span class="input__prefix" aria-hidden="true"><svg …/></span>
  <input class="input__field" type="text">
  <span class="input__suffix" aria-hidden="true"><svg …/><svg …/></span>
</span>
```

Выключенное:

```html
<span class="input input-default input--400">
  <input class="input__field" type="text" placeholder="Недоступно для этого заказа" disabled>
</span>
```

**Про иконки.** В макете слоты заполнены филлером `ic20-radio-outline` — по две штуки на сторону. Это метка «здесь может быть иконка», а не иконка инпута: отгружать радио-точку как штатную иконку поля неправильно. Слот принимает любую иконку, одну или несколько; размер задаёт `--awds-input-icon`, боксы идут вплотную (как в auto-layout).

Иконка декоративная → `aria-hidden="true"` на слоте. Если иконка кликабельная (очистить, показать пароль) — это **кнопка**, а не `<svg>` в слоте: положи внутрь `<button type="button" aria-label="…">` и убери `aria-hidden`:

```html
<span class="input input-default input--500">
  <input class="input__field" type="search" value="кроссовки">
  <span class="input__suffix">
    <button type="button" aria-label="Очистить поиск">
      <svg viewBox="0 0 24 24" aria-hidden="true">…</svg>
    </button>
  </span>
</span>
```

CSS сам погасит UA-оформление такой кнопки и отмерит `<svg>` по `--awds-input-icon` — иконка ищется потомком, а не прямым ребёнком, поэтому обёртка в `<button>` ничего не ломает.

**У `type="search"` браузер рисует свой крестик.** Chromium и Safari добавляют `::-webkit-search-cancel-button`, когда в поле есть значение, — и `appearance: none` на самом поле его **не убирает**, гасить надо псевдоэлемент. Иначе рядом с крестиком из слота появляется второй, чужого цвета и размера (в системе такого нет). Компонент гасит его сам, очистку даёт кнопка в слоте — на стороне потребителя делать ничего не нужно.

## Структура

| Элемент | Роль |
|---|---|
| `.input` | Контейнер-рамка: фон-градиент, обводка, скругление, все цветовые аккумуляторы. Padding **не несёт** |
| `.input__field` | Нативный `<input>`. Прозрачный, `flex: 1`, `min-width: 0`, вертикальный padding + горизонтальный `text-gap`/`padding` по наличию слота |
| `.input__prefix` | Слот слева: `padding-left` + `padding-block` |
| `.input__suffix` | Слот справа: `padding-right` + `padding-block` |

## Геометрия

Ничего не хардкодится и явного `height` нет — всё выводится из трёх shape-токенов:

```
высота = calc(2 × rectangle-{N}-padding + rectangle-{N}-typography-line-height)
ширина = 100%   (320px в макете — ширина демо-фрейма, не свойство компонента)
```

| Size | Высота | padding | Иконка | Скругление | Шрифт |
|---|---|---|---|---|---|
| 600 | 52 | 16 | 20 | `rounded-600` | 16/20 |
| 500 | 48 | 14 | 20 | `rounded-500` | 16/20 |
| 400 | 40 | 10 | 20 | `rounded-400` | 14/20 |
| 300 | 36 | 8 | 20 | `rounded-300` | 14/20 |
| 200 | 32 | 8 | 16 | `rounded-200` | 13/16 |
| 100 | 24 | 4 | 16 | `rounded-100` | 13/16 |
| 50 | 20 | 2 | 16 | `rounded-50` | 12/16 |

**Горизонтальный отступ текста зависит от того, есть ли рядом иконка.** Нет слота с этой стороны — отступ `rectangle-{N}-text-gap`, есть — `rectangle-{N}-padding`:

| Size | 600 | 500 | 400 | 300 | 200 | 100 | 50 |
|---|---|---|---|---|---|---|---|
| `padding` (есть иконка) | 16 | 14 | 10 | 8 | 8 | 4 | 2 |
| `text-gap` (иконки нет) | 18 | 18 | 16 | 14 | 14 | 10 | 8 |

Смысл: у голого текста от края до буквы должно быть больше воздуха, чем от иконки до буквы, иначе текст выглядит прижатым к рамке. В макете это булев проп `Padding Icon` у компонента `Content Input`, и он переключает **оба** горизонтальных паддинга сразу — но в CSS сделано **по стороне**, через `:has(> .input__prefix)` и `:has(> .input__suffix)`. Иначе поле с одной иконкой (поиск слева, кнопки справа нет) получило бы неверный отступ со второй стороны — а это самый частый случай.

Вертикальные паддинги не меняются, поэтому высота остаётся `2 × padding + line-height`.

**Почему padding на слотах, а не на контейнере.** Так устроен auto-layout макета, и это не косметика: расстояние «край → иконка» набирается padding'ом слота, а «иконка → текст» — padding'ом поля. Значение одно, но приходит с двух элементов. Если перенести padding на контейнер, при наличии иконки зазор удвоится.

**Почему высота не зависит от иконок.** На каждом размере `icon == line-height`, поэтому слот с иконкой и поле дают одинаковую высоту — поле с иконками и без них стоят в строке ровно.

**Типографика — шкала `control`, не `typography`.** Figma отдаёт `font-size/600 = 16` и `line-height/600 = 20`. У `--awds-typography-*-600` line-height 26 (адаптивная шкала), у `--awds-control-600` — 20. Совпадают все три метрики только у control. В CSS взят не control напрямую, а `var(--awds-rectangle-{N}-typography-*)`: этот shape-токен в `css-global` уже ссылается на нужный `control-{M}` — так «что значит размер N» остаётся в DS.

## Состояния

Цвета живут на классе варианта (`.input-default`), база `.input` бесцветна — как `.btn` / `.btn-primary` у кнопки.

| Состояние | Селектор | Источник |
|---|---|---|
| Rest | `.input-default` | bg `secondary-container-core`, chroma `secondary-container-chroma`, border `secondary-container-on-low`, текст `secondary-container-on-highest`, placeholder и иконка `secondary-container-on-high` |
| Hover | `.input-default:hover:not(:focus-within):has(> .input__field:enabled)` | border `secondary-container-on` |
| Active | `.input-default:active:not(:focus-within):has(> .input__field:enabled)` | border `secondary-container-on-low` |
| Focus | `.input-default:focus-within` | bg `surface-bright`, chroma `primary-container-chroma`, border `primary-dim`, текст `primary-container-on-highest`, placeholder `primary-container-on-high` + кольцо |
| Disabled | `.input:has(> .input__field:disabled)` | `opacity: var(--awds-opacity-opacity-40)` (на базе — не зависит от варианта) |

Три нюанса:

- **Active равен Rest — и правило всё равно нужно.** При нажатии курсор всё ещё над полем, то есть работает `:hover`. Без явного `:active` осталась бы hover-рамка (`secondary-container-on`), а в макете при нажатии рамка возвращается к `on-low`.
- **Фокус гасит hover и active через `:not(:focus-within)`, а не порядком правил.** Порядок в файле решает только при **равной** специфичности, а она тут не равна: `:has()` добавляет вес своего аргумента, поэтому `…:hover:has(> .input__field:enabled)` весит (0,4,0) против (0,2,0) у `…:focus-within`. Без `:not()` hover перебивал бы фокус — и в самом обычном сценарии (кликнул мышью в поле, курсор остался над ним) брендовая рамка подменялась серой.
- **`:focus-within`, а не `:focus-visible`.** У текстового поля «сфокусировано» = активно, и состояние Focus в макете именно про это: рамка и кольцо загораются в том числе при клике мышью.

## Фокус-кольцо — своё, не как у остального набора

| | Кольцо |
|---|---|
| button, checkbox, radio, switch | `rgb(var(--surface-on-highest))`, без альфы — тёмное |
| **input** | `rgb(var(--primary-core) / var(--awds-opacity-opacity-50))` — брендовое, 50% прозрачности |

В макете это слой `FocusSelection` с `opacity 50%` и цветом `focus-selection/outlineVariant` (= `primary-core`), а не `outline` (= `surface-on-highest`).

**`outline-offset: 1px`, а не 0** — снято с геометрии слоя: прямоугольник кольца стоит на 1 наружу от контрола (322×50 при 320×48), обводка 2 наружу от него. CSS-outline рисуется от края бокса, поэтому offset 1 + width 2 дают ту же полосу 1..3. Радиус подтверждает независимо: в макете он равен скруглению контрола + 1, и CSS считает его так же сам из offset. Сверено по всем семи размерам.

## CSS

Подключение: `input-default.css` — один файл (base + 7 размеров + все состояния).

| Блок | Что внутри |
|---|---|
| `@property` | `bg` / `chroma` (inherits:false, живут на контейнере) и `color` / `placehold` / `icon-color` (inherits:true — задаются на контейнере, потребляются в поле, в `::placeholder` и в иконках) |
| Base `.input` | Контейнер: flex, `inset box-shadow` вместо border, градиент, размерные аккумуляторы (default = 400), transition цветов |
| `.input__field` | Погашённое UA-оформление, padding, типографика из токенов, `::placeholder` с цветом из токена и `opacity: 1` (иначе Firefox приглушит второй раз), снятый нативный крестик `type="search"` |
| Слоты | `padding-left` / `padding-right` + `padding-block`, размер `<svg>` от токена (селектор потомка — работает и внутри `<button>`), сброс UA-оформления кнопки + её фокус-кольцо |
| Sizes `.input--{N}` | Заполняют `--awds-input-{padding,icon,rounded,fs,lh,ls}` через `var(--awds-rectangle-{N}-*)` |
| Состояния | Заполняют цветовые аккумуляторы ролями `rgb(var(--*))` |
| `@media (prefers-reduced-motion)` | Гасит переходы — состояние остаётся различимым, меняется мгновенно |

## Соседние варианты

Фрейм называется **Input / Default** — в `component-token-map.json` уже готовы роли для остальных вариантов form-control: `light`, `ghost`, `error`, `success`, `autofill`, `secondary`. Когда для них появятся фреймы в Figma, они добавляются в **этот же** скилл как `.input-{variant}`, а не отдельным скиллом (`error`/`success` — это состояния валидации того же поля).

## Refresh

Если в Figma изменились токены:

```
обнови awds-component-input под Figma
```

→ ACB заходит в Figma, сравнивает со снапшотом, показывает diff, регенерирует CSS и preview. Этот markdown остаётся как есть.
