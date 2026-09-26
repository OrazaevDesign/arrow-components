# Datepicker — разметка

Панель выбора даты: три вида (`date`, `month`, `year`) и режим периода из двух
панелей. Календарной логики компонент не несёт — числа, «сегодня», переходы по
месяцам и сборку периода делает потребитель.

## Вид «даты»

```html
<div class="dpick dpick--date">
  <div class="dpick__month">
    <div class="dpick__header">
      <button class="dpick__nav dpick__nav--prev" type="button" aria-label="Предыдущий месяц"></button>
      <button class="dpick__title" type="button" aria-live="polite">Сентябрь 2026</button>
      <button class="dpick__nav dpick__nav--next" type="button" aria-label="Следующий месяц"></button>
    </div>

    <div class="dpick__weekdays" role="row">
      <span class="dpick__weekday" role="columnheader" aria-label="Понедельник">Пн</span>
      <span class="dpick__weekday" role="columnheader" aria-label="Вторник">Вт</span>
      <span class="dpick__weekday" role="columnheader" aria-label="Среда">Ср</span>
      <span class="dpick__weekday" role="columnheader" aria-label="Четверг">Чт</span>
      <span class="dpick__weekday" role="columnheader" aria-label="Пятница">Пт</span>
      <span class="dpick__weekday" role="columnheader" aria-label="Суббота">Сб</span>
      <span class="dpick__weekday" role="columnheader" aria-label="Воскресенье">Вс</span>
    </div>

    <div class="dpick__grid" role="grid" aria-label="Сентябрь 2026">
      <button class="dpick__cell" type="button" role="gridcell">1</button>
      <button class="dpick__cell dpick__cell--today" type="button" role="gridcell" aria-current="date">7</button>
      <button class="dpick__cell dpick__cell--selected" type="button" role="gridcell" aria-selected="true">10</button>
      <button class="dpick__cell" type="button" role="gridcell" disabled>11</button>
    </div>
  </div>
</div>
```

Пустые клетки до первого числа месяца — `<span class="dpick__cell" aria-hidden="true"></span>`
либо просто отсутствие элемента с `grid-column-start` у первой даты. Второй
способ короче и не плодит узлов, на которые можно нажать.

## Виды «месяцы» и «годы»

Те же классы, только сетка идёт по три в ряд, а шапки дней недели нет.

```html
<div class="dpick dpick--month">
  <div class="dpick__month">
    <div class="dpick__header">
      <button class="dpick__nav dpick__nav--prev" type="button" aria-label="Предыдущий год"></button>
      <button class="dpick__title" type="button">2026 год</button>
      <button class="dpick__nav dpick__nav--next" type="button" aria-label="Следующий год"></button>
    </div>
    <div class="dpick__grid" role="grid" aria-label="Месяцы 2026 года">
      <button class="dpick__cell" type="button" role="gridcell">Янв</button>
      <button class="dpick__cell dpick__cell--selected" type="button" role="gridcell" aria-selected="true">Мар</button>
    </div>
  </div>
</div>
```

`dpick--year` устроен так же: заголовок несёт диапазон (`2013 – 2026`), ячейки —
года.

## Период

Две панели рядом, разделены линией. Даты между концами периода получают
`dpick__cell--range`, сами концы — `dpick__cell--selected`.

```html
<div class="dpick dpick--date dpick--range">
  <div class="dpick__month"><!-- сентябрь: шапка, дни недели, сетка --></div>
  <div class="dpick__month"><!-- октябрь: то же --></div>
</div>
```

У правой панели в макете нет кнопки «назад», у левой — «вперёд»: период листается
как единое окно из двух месяцев. Убирать кнопку следует вместе с её местом,
иначе заголовок съедет с центра — в макете для этого стоит пустой блок того же
размера:

```html
<span class="dpick__nav" aria-hidden="true"></span>
```

## Состояния ячейки

| Класс | Что значит | Откуда цвет |
|---|---|---|
| — | обычная дата | `list/transparent/*` |
| `:hover` | наведение | `list/transparent/*-hover` |
| `dpick__cell--today` | сегодня | `list/actual-selected/*` |
| `dpick__cell--selected` | выбранная дата и концы периода | `list/accent-selected/*` |
| `dpick__cell--range` | дата внутри выбранного периода | `list/range/*` |
| `disabled` / `aria-disabled` | вне допустимого диапазона, соседний месяц | гашение `opacity/control/disabled` |

`--selected` объявлен после `--range` намеренно: конец периода несёт оба класса
и обязан выглядеть выбранным.

## Доступность

- Сетка размечена `role="grid"` с `role="gridcell"` на ячейках и
  `role="columnheader"` на подписях дней недели. Подпись сокращена до двух букв,
  поэтому полное название дня идёт в `aria-label`.
- Выбранная дата — `aria-selected="true"`, сегодняшняя — `aria-current="date"`.
  Только цвета для этого мало: «сегодня» отличается от обычной даты красным
  текстом, а это различие по цвету.
- Ячейка — настоящая `<button>`: клавиатура и скринридер работают без доработок.
  Стрелками по сетке должен ходить скрипт потребителя — по-умолчанию Tab
  проходит все 31 кнопку подряд, что для календаря долго.
- Кольцо фокуса приходит слоем [awds-component-focus-selection](../awds-component-focus-selection/SKILL.md):
  компонент своих чисел не держит, `focus-selection.css` подключается рядом.
- Заголовок с `aria-live="polite"` проговаривает смену месяца при листании.

## Что должен сделать потребитель

1. Посчитать дни месяца и разложить их по сетке (первую дату сдвинуть на нужный
   день недели через `grid-column-start`).
2. Повесить обработчики на `.dpick__nav` и `.dpick__title` — листание и смена
   вида `date → month → year`.
3. Проставлять классы состояний при выборе.
4. Позиционировать панель рядом с полем. Компонент — `inline-flex` и не знает,
   где он открыт; поповер, якорь и закрытие по Esc — забота потребителя.
