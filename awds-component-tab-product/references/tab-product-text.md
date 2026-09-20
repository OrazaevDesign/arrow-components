# Tab Product — text

Плитка выбора вариации товара с подписью: размер («M», «42»), объём («2 ТБ»),
название цвета, комплектация. Одна из полосы, выбирается ровно одна.

**Figma:** [tab-product / text-unselected](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=8-42962) ·
[text-selected](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=8-42997) ·
[text-indeterminate](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=8-43020) —
секция «↪ tab-product» (`5:45`) файла «💠 arrow ↪ components», страница «6 · tabs».

**CSS:** `references/tab-product.css` (один на оба вида и все три тона).

## HTML

Полоса размеров — нативная радиогруппа. Общий `name` обязателен: именно он даёт
браузеру «одна из списка», стрелки клавиатуры и roving-фокус.

```html
<fieldset class="tab-product-group">
  <legend>Размер</legend>

  <label class="tab-product tab-product-text tab-product-unselected tab-product--400">
    <input class="tab-product__input" type="radio" name="size" value="s">
    <span class="tab-product__title">S</span>
  </label>

  <label class="tab-product tab-product-text tab-product-selected tab-product--400">
    <input class="tab-product__input" type="radio" name="size" value="m" checked>
    <span class="tab-product__title">M</span>
  </label>

  <label class="tab-product tab-product-text tab-product-indeterminate tab-product--400">
    <input class="tab-product__input" type="radio" name="size" value="l">
    <span class="tab-product__title">L</span>
  </label>

  <label class="tab-product tab-product-text tab-product-unselected tab-product--400">
    <input class="tab-product__input" type="radio" name="size" value="xl" disabled>
    <span class="tab-product__title">XL</span>
  </label>
</fieldset>
```

Ступень 300 — там, где полоса стоит в узком месте (мобильная карточка, боковая
панель фильтра):

```html
<label class="tab-product tab-product-text tab-product-unselected tab-product--300">
  <input class="tab-product__input" type="radio" name="size" value="xs">
  <span class="tab-product__title">XS</span>
</label>
```

Подпись словом, а не числом, — плитка растянется по содержимому, минимум остаётся
квадратом:

```html
<label class="tab-product tab-product-text tab-product-selected tab-product--400">
  <input class="tab-product__input" type="radio" name="color" value="graphite" checked>
  <span class="tab-product__title">Графитовый</span>
</label>
```

`.tab-product-group` компонент не объявляет — это обёртка потребителя. Зазор между
плитками даёт она, у самой плитки внешних отступов нет.

## Что обязательно

| Что | Почему |
| --- | --- |
| `input[type="radio"]` с классом `.tab-product__input` | выбор одного из списка даёт браузер по общему `name`; без него плитка перестаёт быть выбором и становится картинкой с классом |
| одинаковый `name` у всех плиток группы | связь между элементами, а не свойство одной; линтер разметки её не проверяет — это забота потребителя |
| класс тона: `.tab-product-selected` \| `.tab-product-unselected` \| `.tab-product-indeterminate` | тон — вариант, а не состояние: за каждым стоит группа ячеек `variation/*` в теме. Без класса тона цвет фона и текста не объявлены |
| класс вида `.tab-product-text` | отступы, кегль и минимальная ширина живут в нём, а не в базе: у вида `img` их нет вовсе |
| `disabled` на `.tab-product__input` у выключенной плитки | `pointer-events: none` гасит мышь, но не клавиатуру. Тот же дефект чинили у `range` |

Класс тона обязан совпадать с `checked`: класс красит, `checked` отправляется
формой. Рассинхрон CSS не заметит — это единственное место, где потребитель
обязан держать две вещи в согласии, и на серверном рендере (PageCraft, 4CMS) обе
приходят из одного шаблонного условия.

## Что значит indeterminate

**Вариация доступна не полностью**, а не «нет в наличии». Основание — макет:
у тона `indeterminate` есть свои ячейки `hover`, `focus` и `active` и отдельная
ячейка `disabled`, то есть плитка остаётся интерактивной и выбираемой. Полностью
недоступная вариация выражается нативным `disabled`, а не этим тоном.

Практический случай: цвет есть, но не во всех размерах, — плитка цвета в тоне
`indeterminate`, и после её выбора часть размеров придёт выключенной.

Слово `indeterminate` взято не у чекбокса: это третье значение выбранности в слое
State темы (`variation/indeterminate`), наравне с `selected` и `unselected`.

## Состояния

Значения — слой State темы, группа `variation`. Роли указаны для тона
`unselected`; у `selected` и `indeterminate` та же схема, своя группа.

| Состояние | фон | обводка | текст |
| --- | --- | --- | --- |
| rest | `secondary-container-core` | `secondary-container-dim` | `secondary-container-on-high` |
| hover | `primary-container-core` | `primary-core` | `primary-container-on-highest` |
| focus | `secondary-container-core` | `secondary-container-dim` | `secondary-container-on-high` |
| active | `secondary-container-core` | `secondary-container-dim` | `secondary-container-on-high` |
| disabled | те же, что rest | те же | те же, поверх `state/opacity/control-disabled` |

Кольцо фокуса — слой `awds-component-focus-selection`, вариант `offset=outside` ·
`tone=default`. Надевается на `.tab-product`, а фокус берёт спрятанный внутри `input`,
поэтому селектор `:has(> .tab-product__input:focus-visible)`.

## Размеры

`.tab-product--400` (плитка 40×40 минимум) и `.tab-product--300` (36×36). Кегль на обеих
ступенях 14 px: `rectangle/300/typography` и `rectangle/400/typography` указывают
на одну ячейку `control-font-size-400` — решение владельца ДС 01.09.2026, вкладка
остаётся в одной шкале с остальными контролами.

Боковой отступ взят из ячейки `rectangle/{N}/gap`, а не `…/padding`, — так
привязано в макете на всех тридцати текстовых ячейках. Минимальная ширина
считается как `2 × padding-block + line-height`, то есть плитка не бывает уже
квадрата.

## Чего здесь нет

- **`role="tab"`.** Роль обещает `tablist` и `tabpanel` с `aria-controls`;
  у плитки вариации панели нет, она меняет цену и артикул. Имя компонента «tab»
  дано по месту применения (отклонение от правила 3 канона, решение В2 от
  31.08.2026) и на ARIA-роль не переносится.
- **`aria-pressed`.** Это тумблер, то есть много-из-многих. Вариация — одна из
  списка.
- **Класса `.tab-product--selected` на двух дефисах.** Выбранность взаимоисключающа:
  два дефиса обещают комбинируемость, которой нет (правило 1 канона имён).
- **Градиента.** Ячейка `variation/{тон}/chroma` в переменных Figma отсутствует,
  а в теме равна своему `bg` во всех тонах и состояниях — второй стоп дал бы тот
  же цвет и отобрал у потребителя `background-color`.
- **Точки-свотча внутри плитки.** Проверено 01.09.2026: эллипсов в наборах ноль.
