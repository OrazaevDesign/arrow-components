# FocusSelection / default

**Figma:** [UCYhMA1JeNUNuVGsxUEne7 → node 2093:265](https://www.figma.com/design/UCYhMA1JeNUNuVGsxUEne7/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B9-Elemets?node-id=2093-265)

> [!NOTE]
> Этот файл (`focus-selection-default.md`) — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`focus-selection.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## Подключение

`focus-selection.css` подключается **один раз на страницу, до компонентных CSS**: он объявляет `:root`-контракт, на который те ссылаются. Компонент, подключённый без этого файла, останется без кольца фокуса — переменные не разрешатся, и `outline` не отрисуется. Это осознанная цена единого слоя: fallback-значения в каждом компоненте вернули бы дубли, ради устранения которых слой и заведён.

## HTML

Элемент фокусируется сам (кнопка, ссылка, `input`, `[tabindex]`) — достаточно класса:

```html
<button class="btn btn-primary focus-selection">Оформить заказ</button>
```

`Inside` — кольцо внутрь, когда снаружи места нет (область тянется на всю ячейку или строку):

```html
<a class="link-area focus-selection focus-selection--inside" href="/catalog">Перейти в каталог</a>
```

`Formcontrol` — брендовое полупрозрачное кольцо для полей ввода:

```html
<input class="input__control focus-selection focus-selection--formcontrol" type="text">
```

`Tab` — брендовое плотное, для таб-баров и плиток выбора:

```html
<button class="tab focus-selection focus-selection--tab" role="tab">Характеристики</button>
```

Фокус берёт вложенный контрол, а кольцо нужно на обёртке (строка списка с кнопкой внутри):

```html
<div class="list-item focus-selection-within">
  <span class="list-item__label">Доставка курьером</span>
  <button class="list-item__action">Выбрать</button>
</div>
```

## Применение внутри компонента

Класс работает только там, где фокус получает **тот же** узел, который несёт кольцо. У половины компонентов это не так: нативный `input` спрятан, а обводку рисует соседний `span`. Тогда компонент пишет две строки в своём селекторе — переиспользуются значения, не декларация (миксинов в CSS нет).

| Случай | Селектор и правило |
|---|---|
| Outside + Default | `.btn:focus-visible { outline: var(--awds-focus-width) solid var(--awds-focus-color); outline-offset: var(--awds-focus-offset) }` |
| Outside + Formcontrol | `.input:focus-within { outline: var(--awds-focus-width) solid var(--awds-focus-color-formcontrol); outline-offset: var(--awds-focus-offset) }` |
| Inside | `.link-area:focus-visible { outline: var(--awds-focus-width) solid var(--awds-focus-color); outline-offset: var(--awds-focus-offset-inside) }` |
| Кольцо на соседе | `.checkbox__input:focus-visible + .checkbox__box { outline: var(--awds-focus-width) solid var(--awds-focus-color); outline-offset: var(--awds-focus-offset) }` |
| Кольцо на родителе | `.list-item:has(:focus-visible) { outline: var(--awds-focus-width) solid var(--awds-focus-color); outline-offset: var(--awds-focus-offset) }` |

## Переменные

| Переменная | Значение | Ось Figma |
|---|---|---|
| `--awds-focus-width` | `2px` | толщина, одна на все ячейки |
| `--awds-focus-offset` | `1px` | `Type=Outside` |
| `--awds-focus-offset-inside` | `calc(-1 * var(--awds-focus-width))` | `Type=Inside` |
| `--awds-focus-color` | `rgb(var(--surface-on-highest))` | `Var=Default` |
| `--awds-focus-color-formcontrol` | `rgb(var(--primary-core) / var(--awds-opacity-opacity-50))` | `Var=Formcontrol` |
| `--awds-focus-color-tab` | `rgb(var(--primary-core))` | `Var=Tab` |

`--awds-focus-offset-inside` считается от ширины, а не задан числом: если макет сменит толщину кольца, внутренний вариант поедет за ней сам.

## Геометрия из макета

Замеры по всем 54 ячейкам (`Size × Var × Type`), stroke везде 2px:

| Type | Прямоугольник кольца | strokeAlign | Полоса кольца | CSS |
|---|---|---|---|---|
| `Outside` | 34×34 при контроле 32×32, смещён на −1px | OUTSIDE | 1…3px **снаружи** | `outline-offset: 1px` |
| `Inside` | ровно по контуру контрола, 32×32 | INSIDE | 0…2px **внутрь** | `outline-offset: -2px` |

Радиус подтверждает модель независимо: `Inside` radius = `rounded/{N}` (50→4, 100/200/300→6, 400/500→8, 600→10, Rounded→600 — совпадает с `--awds-rounded-{N}-smooth`), `Outside` radius = то же **+1**. CSS считает радиус outline как `border-radius + outline-offset`, поэтому ось `Size` в CSS не эмитится: одно правило воспроизводит все девять значений.

## Состояния

Единственное состояние — фокус с клавиатуры. В макете инстанс `FocusSelection` лежит во **всех** ячейках (Rest / Hover / Active / Disabled тоже), а видимость переключает переменная режима `focus-selection/outlineShow` — в CSS её роль играет сам `:focus-visible`. Поэтому при снятии данных из Figma считать нужно только ячейки `State=Focus`: инстанс в ячейке Hover ничего не значит, он там невидим.

| Состояние | Селектор | Источник |
|---|---|---|
| Focus (клавиатура) | `:focus-visible` | `outline: var(--awds-focus-width) solid var(--awds-focus-color)` |
| Focus в обёртке | `:has(:focus-visible)` | то же, кольцо на родителе |
| Focus от мыши | — | кольца нет: `:focus-visible` не срабатывает на клик |
| forced-colors | `@media (forced-colors: active)` | цвет подменяется системным `Highlight` |

## Чего не делать

- **Не подменять `outline` на `border` или `box-shadow`** «чтобы красивее»: `outline` не влияет на лейаут, поэтому кольцо не сдвигает соседей при фокусе. Border сдвинет, `box-shadow` затрёт существующие тени компонента.
- **Не гасить фокус через `outline: none`** без замены. Если кольцо мешает на самом контроле — оно переносится на родителя или соседа, но не исчезает.
- **Не задавать offset числом в компоненте.** Тогда правка макета опять становится правкой 70 файлов — ровно то, ради устранения чего слой заведён.
- **Не сливать `Formcontrol` и `Tab`**, хотя в Figma они указывают на одну переменную: у `Tab` кольцо плотное, у `Formcontrol` — 50%, потому что рамка поля в фокусе уже брендовая и плотное кольцо поверх неё сливается с ней в толстую полосу.
- **Не использовать `Inside` на скруглённом контроле** без проверки: `outline-offset: -2px` уменьшает внешний радиус кольца на 2px против макета. При радиусе 0 (оба потребителя `Inside` стоят на `Size=None`) расхождения нет; при ненулевом нужна inset-тень с перечислением существующих теней компонента в том же объявлении.
