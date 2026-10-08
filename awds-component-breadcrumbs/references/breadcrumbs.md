# Breadcrumbs / разметка и поведение

**Figma:** [470rar5EfRm4n14vHMXbpc → node 1050:139593](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=1050-139593)

> [!NOTE]
> Этот файл — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`breadcrumbs.css`) и preview (`preview.html`) генерируются ACB и при следующем
> refresh затрутся.

## HTML

Эталон — путь из трёх шагов, последний — текущая страница:

```html
<nav class="crumbs" aria-label="Хлебные крошки">
  <ol class="crumbs__list">
    <li class="crumbs__item">
      <a class="btn-area btn-area-muted btn-area--100" href="/">
        <span class="btn-area__label">Главная</span>
      </a>
    </li>
    <li class="crumbs__sep" aria-hidden="true">
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false"><path d="M6.97958 5.76055C7.17476 5.56543 7.49134 5.56557 7.68661 5.76055L9.57235 7.6463C9.76759 7.84154 9.76756 8.15806 9.57235 8.35333L7.68661 10.2391C7.49134 10.4343 7.17481 10.4343 6.97958 10.2391C6.78447 10.0438 6.78443 9.72726 6.97958 9.53204L8.5118 7.99981L6.97958 6.46758C6.78458 6.2723 6.7844 5.95573 6.97958 5.76055Z" fill="currentColor"/></svg>
    </li>
    <li class="crumbs__item">
      <a class="btn-area btn-area-muted btn-area--100" href="/catalog/">
        <span class="btn-area__label">Каталог</span>
      </a>
    </li>
    <li class="crumbs__sep" aria-hidden="true">
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false"><path d="M6.97958 5.76055C7.17476 5.56543 7.49134 5.56557 7.68661 5.76055L9.57235 7.6463C9.76759 7.84154 9.76756 8.15806 9.57235 8.35333L7.68661 10.2391C7.49134 10.4343 7.17481 10.4343 6.97958 10.2391C6.78447 10.0438 6.78443 9.72726 6.97958 9.53204L8.5118 7.99981L6.97958 6.46758C6.78458 6.2723 6.7844 5.95573 6.97958 5.76055Z" fill="currentColor"/></svg>
    </li>
    <li class="crumbs__item">
      <span class="crumbs__current" aria-current="page">Рубрика</span>
    </li>
  </ol>
</nav>
```

Подключение: `button-area.css` и `focus-selection.css` (пункты-ссылки), затем
`breadcrumbs.css`.

## Из чего собрано

| Узел макета | Код |
|---|---|
| `breadcrumbs` (1050:139593) | `nav.crumbs` с `aria-label` |
| слот `list` (1050:139716), flex-wrap, gap 0 | `ol.crumbs__list` |
| `button-area / muted`, size=100 | `li.crumbs__item > a.btn-area.btn-area-muted.btn-area--100` |
| `ic-a` (шеврон 16) | `li.crumbs__sep[aria-hidden="true"] > svg` |
| последний `button-area / muted` | `li.crumbs__item > span.crumbs__current[aria-current="page"]` |

## Почему разделитель — отдельный `li aria-hidden`

Рассмотрены три способа:

| Способ | За | Против |
|---|---|---|
| **`li.crumbs__sep aria-hidden`** — выбран | повторяет слот макета 1-в-1 (пункт, `ic-a`, пункт); так же сделан блок `awds-breadcrumbs`, перевод блока на компонент не меняет разметку; иконка — обычный SVG в потоке, цвет `currentColor` | в `ol` лежат не только пункты. Скринридер их не считает — `aria-hidden` выводит `li` из дерева доступности, и список объявляется «из 3», а не «из 5» |
| SVG внутри пункта, перед ссылкой | `ol` содержит только пункты; при переносе стрелка уезжает вместе со своим пунктом | расходится с макетом и с блоком; первый пункт обязан отличаться от остальных составом |
| псевдоэлемент `::before` с маской | разметка короче | иконка уезжает в CSS data-URI: её не заменить из макета без правки CSS, а `content` псевдо­элемента часть скринридеров читает |

Цена выбора: при переносе строки шеврон может остаться последним на верхней строке.
Макет переноса не показывает, поэтому это не лечится — записано открытым вопросом в мете.

## Состояния

| Узел | Состояние | Откуда |
|---|---|---|
| пункт-ссылка | rest / hover / focus / active / disabled | `button-area` вариант `muted`: покой `surface-on-high`, наведение `surface-on-highest`; кольцо — слой `focus-selection` |
| текущая страница | только rest | `surface-on-high` (`#cell link/muted-rest`), без наведения, фокуса и курсора-руки |
| разделитель | только rest | `surface-on-high` (`#cell link/muted-rest`) |

## Длинная цепочка

Макет задаёт только перенос: слот `list` — flex-wrap. Длинное название одного пункта
уходит в многоточие (метка `button-area` и `.crumbs__current` — одна строка с
`text-overflow: ellipsis`).

Свёртки на мобильном («‹ родитель», как в блоке `awds-breadcrumbs`) в компоненте **нет**:
в макете её нет, и выдумывать её здесь не стали. Вопрос записан в мете.

## Что делает потребитель

1. Строит цепочку от главной к текущей странице.
2. Каждому шагу, кроме последнего, рисует ссылку `button-area` muted 100.
3. Между шагами ставит `li.crumbs__sep aria-hidden="true"` с шевроном.
4. Последний шаг — `span.crumbs__current aria-current="page"`, не ссылка.
5. Если шаг один (только «Главная»), делает его ссылкой: мёртвый текст без пути назад
   пользу не несёт — так же решено в блоке.
