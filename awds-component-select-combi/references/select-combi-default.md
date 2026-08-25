# Select Combi / Default

Выбор из списка с плавающей меткой на нейтральном сером фоне — базовый вариант для контрола на белой странице. CSS: [select-combi-default.css](select-combi-default.css). Рядом обязателен [`list-item-transparent.css`](../../awds-component-list-item/references/list-item-transparent.css) — им размечаются пункты раскрытого списка.

## Разметка

```html
<span class="scombi scombi-default scombi--400">
  <span class="scombi__body">
    <select class="scombi__field" id="city">
      <option value="" class="list-item list-item-transparent"></option>
      <option value="ala" class="list-item list-item-transparent">
        <span class="list-item__content"><span class="list-item__title">Алматы</span></span>
      </option>
      <option value="ast" class="list-item list-item-transparent">
        <span class="list-item__content"><span class="list-item__title">Астана</span></span>
      </option>
    </select>
    <label class="scombi__label" for="city">Город доставки</label>
  </span>
</span>
```

- **Пустой `<option value="">` без текста** — состояние «ничего не выбрано». По нему метка возвращается на центр и работает как плейсхолдер; в раскрытом списке пункт скрыт. Текста в нём быть не должно — он лёг бы под метку.
- **Порядок «поле, потом `<label>`»** — правило метки построено на соседнем комбинаторе `+`.
- **`__body`** — система координат для абсолютной метки.
- Классы `list-item list-item-transparent` на `<option>` нужны для стилизованного попапа. Там, где движок не умеет `base-select`, они просто игнорируются.

Если значение выбрано всегда — пустой пункт не нужен, метка сразу стоит наверху:

```html
<span class="scombi scombi-default scombi--500">
  <span class="scombi__body">
    <select class="scombi__field" id="pay">
      <option value="card" selected>Картой онлайн</option>
      <option value="cash">Наличными курьеру</option>
    </select>
    <label class="scombi__label" for="pay">Способ оплаты</label>
  </span>
</span>
```

## Иконки в слотах

```html
<span class="scombi scombi-default scombi--500">
  <span class="scombi__prefix" aria-hidden="true">
    <svg viewBox="0 0 24 24">…</svg>
  </span>
  <span class="scombi__body">
    <select class="scombi__field" id="lang">…</select>
    <label class="scombi__label" for="lang">Язык интерфейса</label>
  </span>
</span>
```

Слот принимает одну иконку или несколько (в макете их по две). Появление слота переключает горизонтальный отступ **с этой стороны**: `text-gap` → `padding`, и одновременно у поля, и у метки — иначе метка при уезде прыгнула бы по горизонтали.

Слоты **декоративные** (`pointer-events: none`): у нативного `<select>` кликабельному элементу внутри контрола взяться неоткуда — нажатие в его области список не откроет. Нужна кнопка рядом с выбором — ставь её отдельным элементом за пределами `.scombi`.

**Суффикс лучше не использовать.** Когда он есть, полосу шеврона резервирует обёртка, а не поле, — и клик по самому шеврону перестаёт открывать список (проверено `elementFromPoint`). Без JS это неустранимо; ограничение унаследовано от `awds-component-select`.

## Выключенный контрол

```html
<span class="scombi scombi-default scombi--400">
  <span class="scombi__body">
    <select class="scombi__field" id="pvz" disabled>
      <option value=""></option>
    </select>
    <label class="scombi__label" for="pvz">Пункт выдачи</label>
  </span>
</span>
<p class="hint">Сначала выберите город</p>
```

Гасится вся обёртка (`opacity: var(--awds-opacity-opacity-40)`), как в макете. Контраст в этом состоянии заведомо ниже AA, поэтому рядом нужен текст-причина, а не только серость. Если контрол не может нести атрибут `disabled` — есть запасной класс `.scombi--disabled`.

## Состояния

| Состояние | Что меняется | Селектор |
|---|---|---|
| Rest | `bg secondary-container-core`, `chroma secondary-container-chroma`, рамка `secondary-container-on-low`, текст `secondary-container-on-highest`, метка и шеврон `secondary-container-on-high` | `.scombi-default` |
| Hover | только рамка → `secondary-container-on` | `:hover:not(:focus-within):has(.scombi__field:enabled)` |
| Active | рамка возвращается к `secondary-container-on-low` (в макете Active = Rest; правило нужно, чтобы отменить hover при нажатии) | `:active:not(:focus-within):has(…)` |
| Focus | `bg surface-bright`, `chroma primary-container-chroma`, рамка `primary-dim`, текст `primary-container-on-highest`, метка и шеврон `primary-container-on-high` + кольцо | `:focus-within` |
| Открыт список | то же, что Focus | `@supports` + `:has(.scombi__field:open)` |
| Disabled | Rest + `opacity: var(--awds-opacity-opacity-40)` | `:has(.scombi__field:disabled)` |

Кольцо фокуса: `outline: var(--awds-focus-width) solid var(--awds-focus-color-formcontrol)`, `outline-offset: var(--awds-focus-offset)` — как у `select`, `input` и `input-combi`, и в отличие от остального набора (там `surface-on-highest` без альфы).

Отдельное правило на `:open` нужно потому, что под `base-select` при раскрытии фокус уходит в `<option>` и `:focus-within` на обёртке становится ложным.

## Метка

| Когда | Положение | Кегль |
|---|---|---|
| Ничего не выбрано | `top = padding`, по центру контрола | кегль значения (16/20 или 14/20) |
| Выбрано значение | `top = combi-label-top` (8/6/4/2) | `control-200` (12/16) на 500/600, `control-100` (11/16) на 300/400 |

Фокус метку **не двигает** — двигает только выбранное значение (см. SKILL.md → «Когда метка уезжает»). Переход анимируется `transition` по `top` и свойствам шрифта; `transform: scale()` не подходит — у мелкой метки своё letter-spacing, масштаб растянул бы межбуквенное вместе с кеглем.

## Размеры

```html
<span class="scombi scombi-default scombi--300">…</span>   <!-- 36px -->
<span class="scombi scombi-default scombi--400">…</span>   <!-- 40px, по умолчанию -->
<span class="scombi scombi-default scombi--500">…</span>   <!-- 48px -->
<span class="scombi scombi-default scombi--600">…</span>   <!-- 52px -->
```

| Size | padding | input-top | input-bottom | label-top | значение | метка | высота | полоса шеврона |
|---|---|---|---|---|---|---|---|---|
| 600 | 16 | 24 | 8 | 8 | 16/20 | 12/16 | 52 | 52 |
| 500 | 14 | 22 | 6 | 6 | 16/20 | 12/16 | 48 | 48 |
| 400 | 10 | 16 | 4 | 4 | 14/20 | 11/16 | 40 | 40 |
| 300 | 8 | 14 | 2 | 2 | 14/20 | 11/16 | 36 | 36 |

Ниже 300 компонента нет: у `50/100/200` combi-токены нулевые, метке некуда уезжать.

## Раскрытый список

Под `@supports (appearance: base-select)` панель рисуется по `◆ / Dropdown`: фон `surface-bright`, `padding` и радиус из `--awds-dropdown-{N}-*`, тень `elevation-3`, ширина ровно по обёртке (через собственный `anchor-name` + `anchor-scope`), зазор 4px сверху и снизу.

Пункт — компонент `list-item`, ступенью ниже размера контрола; ступень подставляет сам селект. Выбранный пункт переключается на роли `list/selected-secondary` мостом на `:checked` — класс в разметке для этого не нужен, выбор меняется в рантайме. UA-галочка (`::checkmark`) погашена: в макете выбор отмечен фоном и рамкой.

Пустой пункт в списке скрыт (`display: none`) — он существует только ради состояния метки. В движках без `base-select` попап системный, и там он будет видно пустой строкой; это единственное место, где отличие заметно пользователю.

## Проверено

Headless Chromium, `getComputedStyle` + `getBoundingClientRect`: 48 экземпляров (4 размера × 4 раскладки слотов × {пусто, выбрано, disabled}), 624 замера, 0 расхождений с макетом. Отдельно вживую: hover (рамка `secondary-container-on`, фон не двигается), настоящий фокус (белый фон, тёплый chroma, брендовая рамка, кольцо `rgba(250,216,20,.5)` с offset 1), раскрытый попап (панель по ширине контрола, пустой пункт скрыт, пункт 40px с заголовком 14/20 при контроле 500).

Гоча замеров: цветовые аккумуляторы зарегистрированы через `@property` и анимируются — чтение `getComputedStyle` на первом кадре после `focus()` отдаёт ещё старый цвет. Мерить с задержкой ~400 мс.
