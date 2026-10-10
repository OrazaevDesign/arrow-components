---
name: awds-component-heading
description: Heading ArrowDS (.heading).
---

# Heading (заголовок секции + действие) ArrowDS

Заголовок секции `H1–H5` с опциональной ссылкой-действием «Все» или счётчиком «200 товаров» справа. Статичный (без состояний). Размер следует ролям WYSIWYG: меняется по масштабу типографики и по брейкпоинту. Раскладка действия адаптивна.

**Figma:** [💠 arrow ↪ components → heading / action, node 1050:139087](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=1050-139087) · [heading / goods, node 1057:28891](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=1057-28891)

## Когда использовать

- Заголовок секции/блока маркета (витрина, подборка, рубрика) — с уровнем H1–H5.
- Заголовок + ссылка «Все / Смотреть все / Перейти» справа.
- Заголовок + число товаров («200 товаров») справа — рубрика, подборка, выдача.
- Любой смысловой заголовок поверх DS-типографики, который должен сам адаптироваться по ширине экрана и масштабу.

## Структура

```html
<!-- Заголовок + действие «Все» -->
<div class="heading heading--h1">
  <h2 class="heading__title">Heading</h2>
  <a class="btn btn-pills btn--100 btn--pill heading__action" href="/all">Все</a>
</div>

<!-- Заголовок + счётчик (набор heading / goods) -->
<div class="heading heading--h1">
  <h1 class="heading__title">Пледы</h1>
  <span class="heading__count">200 товаров</span>
</div>

<!-- Только заголовок (без действия) -->
<div class="heading heading--h3">
  <h3 class="heading__title">Heading</h3>
</div>
```

- **Семантика vs визуал.** Тег (`<h1>…<h6>`) выбирай по структуре документа; визуальный размер задаёт класс `.heading--h{N}` — они независимы (можно `<h2 class="heading__title">` в `.heading--h1`).
- **Действие** «Все» — опционально, это композиция **`awds-component-button`**: `.btn.btn-pills.btn--100.btn--pill`, только текст. Иконки-ссылки с 2.1.0 нет: в макете её убрали (в `variable_defs` пропал `rectangle/100/icon`). Подключи `button-pills.css` и слой фокуса `focus-selection.css`. В Figma действие — инстанс `button / pills`, size=100, скругление 26 (пилюля). Цвет, размер, скругление, состояния и фокус держит button; `.heading__action` только запрещает пилюле сжиматься.
- **Счётчик** «200 товаров» — опционально, `<span class="heading__count">`, вместо действия. **Просто текст, не ссылка**: без hover и фокуса, цвет `surface-on-high` (покой `link/muted-rest`), шрифт control 300 13/16/0.1, regular, `tabular-nums`. Стоит там же, где «Все»: коробка 24 по высоте (`padding-block: space-1`), поэтому нижняя линия у счётчика и пилюли одна. Склонение («1 товар», «2 товара», «5 товаров») — забота потребителя.

## Уровни (размер) и адаптив

Размер — роли WYSIWYG `--awds-wysiwyg-{font-size,line-height,letter-spacing}-h{N}`. Роль выбирает ступень typography по моду масштаба (`.typo-small` / `.typo-medium` / `.typo-large` у предка, по умолчанию medium), ступень растёт по брейкпоинту.

| Класс | Desktop, мод medium (fs/lh/ls) | В макете |
|---|---|---|
| `.heading--h1` | 34/34/−0.3 | да |
| `.heading--h2` | 28/34/−0.3 | да |
| `.heading--h3` | 24/29/−0.2 | да |
| `.heading--h4` | роль h4 | нет — сохранён решением владельца |
| `.heading--h5` | роль h5 | нет — сохранён решением владельца |

Точные числа других модов и брейкпоинтов — в `arrow-design-system/references/studio-vars.css`, здесь их нет намеренно.

**Раскладка действия и счётчика по View** (одинаковая, зашита через `@media`, класса нет):
- **Desktop ≥1024** (`view=desktop`) — «Все» или счётчик вплотную к заголовку, зазор `space-2` (8px), по нижней линии. Длинный заголовок уводит действие на следующую строку (`flex-wrap`).
- **< 1024** (`view=mobile`) — заголовок занимает остаток строки и переносится сам, «Все» или счётчик у правого края по нижней линии (`space-between`).

## Откуда берутся значения

| Что | Источник |
|---|---|
| Размер заголовка | `var(--awds-wysiwyg-font-size-h{N})` + `-line-height-h{N}` + `-letter-spacing-h{N}` |
| Цвет заголовка | `rgb(var(--surface-on-highest))` |
| Вес | `var(--awds-font-weight-semibold)` |
| Действие «Все» | внешний `awds-component-button` (`.btn-pills .btn--100 .btn--pill`) — цвет pills, размер control-300 13/16, паддинг/зазор/иконка ступени 100, состояния, фокус |
| Счётчик | `rgb(var(--surface-on-high))`, `var(--awds-control-{font-size,line-height,letter-spacing}-300)`, `var(--awds-font-weight-regular)`, `padding-block: var(--awds-space-1)` в строке заголовка |
| Зазор заголовок ↔ действие | `var(--awds-space-2)` (8px, макет `space/2`) |
| Перенос заголовка | `text-wrap: balance` (MIFB — без сирот) |

## Расхождения с макетом

- **Счётчик — текст, а не ссылка** (решение владельца 09.10.2026, «макет не прав»). В наборе `heading / goods` справа стоит инстанс `button-area / muted` 80×24, то есть кликабельная область. Счётчик никуда не ведёт: ссылка без цели — ложный тач-таргет и лишняя остановка Tab. Код ставит `<span class="heading__count">` того же цвета и кегля; в макете инстанс заменить на текст на роли `surface/on-high`.

- ~~h2 на ступени 910~~ — **снято 09.10.2026**: ячейка h2 в макете на ролях h2 целиком (28/34/−0.3), код такой же с 2.0.0.
- **Зазор ниже 1024.** В ячейке `view=mobile` зазора нет (только `space-between`); код держит `space-2` как минимальную дистанцию, чтобы перенесённый заголовок не упирался в пилюлю.
- **Перенос заголовка.** В макете текст `whitespace-nowrap`; в коде заголовок переносится — длинный текст на узкой колонке иначе вылезает за контейнер.
- **Описание компонента в Figma** ещё говорит про примитивы 920/910/900 и `button-area` — устарело, источник правды — этот скилл. Описание набора `heading / goods` скопировано с `heading / action` и про счётчик молчит.

## CSS

Один файл — `references/heading.css` (база `.heading` + `.heading__title` + `.heading__action` + `.heading__count` + уровни `.heading--h{1..5}` + раскладка по View через `@media`). Для действия дополнительно нужны `button-pills.css` (`awds-component-button`) и `focus-selection.css`.

Визуальный QA — `references/preview.html` (storybook, `file://`): все уровни, переключатели Тема / Масштаб / Справа (действие / счётчик / ничего) / View (View меняет ширину iframe → срабатывает `@media`).

## Композиция

| Компонент | Зачем |
|---|---|
| `awds-component-button` (`.btn-pills` `--100` `--pill`) | Действие «Все» целиком. В Figma — инстанс `button / pills`. Heading лишь раскладывает его по View. |

## Заметки

- **Вертикальный отступ над заголовком** в компонент НЕ заложен: это flow-ритм контекста, его задаёт потребитель (например, `gap` контейнера секции).
- Компонент `shape: null` — размер идёт через роли WYSIWYG, без ступеней Size.
- **Миграция с 2.1:** у «Все» вариант кнопки `btn-tertiary` → `btn-pills` (макет 1050:139087, 10.10.2026: в Figma `button / pills`, size=100, только текст). В блоке подключи вариант `pills` секции `button` вместо `tertiary`. Не заменить — не сломается, но цвет и рамка разойдутся с макетом.
- **Миграция с 2.0:** из разметки «Все» убрать `<svg>` иконки-ссылки — `<a class="btn btn-pills btn--100 btn--pill heading__action" href>Все</a>`. Не убрать — не сломается, но разойдётся с макетом.
- **Миграция с 1.x:** `btn-area btn-area-default btn-area--100 btn-area--fill-y` с `__label`/`__suffix` → `btn btn-pills btn--100 btn--pill` с текстом и иконкой-ссылкой прямо в `<a>`; `button-area.css` заменить на `button-pills.css`. Размеры уровней выросли: h1 теперь роль h1 (34 на десктопе вместо 28).
