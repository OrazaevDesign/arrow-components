---
name: awds-component-page-title
description: Page Title ArrowDS (.ptitle).
---

# Page Title ArrowDS

Заголовок страницы: хлебные крошки сверху, `<h1>` под ними, под заголовком — необязательный
счётчик «200 товаров». На планшете и мобиле (ниже 1024) вместо крошек — кнопка «Назад»,
она открывает шторку «Вернуться» со списком разделов выше текущего. Составной компонент — готовые части одной колонкой: крошки ↔
заголовок `space-3`, заголовок ↔ счётчик `space-1-5`. Своих цветов, шрифтов и состояний нет:
их держат вложенные компоненты. См. `arrow-design-system` за общей картиной токенов и
`arrow-components-builder` за регенерацией скилла из Figma.

**Figma:** [💠 arrow ↪ components → page-title, набор 1073:761](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=1073-761): `view=desktop` (1050:139853) и `view=mobile` (1073:787); шторка — [back-sheet, 1073:2928](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=1073-2928)

## Состав

| Часть | Компонент | Классы |
|---|---|---|
| крошки (сверху, необязательны) | [awds-component-breadcrumbs](../awds-component-breadcrumbs/SKILL.md) | `nav.crumbs` целиком по его скиллу |
| заголовок страницы | [awds-component-heading](../awds-component-heading/SKILL.md) | `.heading.heading--h1` + `<h1 class="heading__title">` |
| счётчик (снизу, необязателен) | [awds-component-heading](../awds-component-heading/SKILL.md), элемент `.heading__count` | `<p class="heading__count">200 товаров</p>` — прямой ребёнок `.ptitle`, после `.heading` |
| «Назад» (ниже 1024, вместо крошек) | [awds-component-button](../awds-component-button/SKILL.md) `pills`, 100, пилюля, иконка слева | `a.btn.btn-pills.btn--100.btn--pill.ptitle__back[data-ptitle-back]` |
| шторка «Вернуться» | [awds-component-modal](../awds-component-modal/SKILL.md) `dialog` (ниже 1024 — шторка снизу) | `dialog.mdl.mdl-dialog.ptitle__sheet[data-ptitle-sheet]`, крестик `btn-ghost btn--200 btn--icon-only mdl__close` |
| пункты шторки | [awds-component-list-item](../awds-component-list-item/SKILL.md) `transparent`, 400, иконка `arrow-back_2` | `ul.ptitle__list > li > a.list-item.list-item-transparent.list-item--400` |

**Не верстать части заново.** На страницу подключаются `focus-selection.css`,
`button-area.css`, `breadcrumbs.css`, `heading.css`, для мобильной ячейки — `button-pills.css`,
`button-ghost.css` (или секция `button` с вариантами `pills,ghost` и ступенями `100,200`),
`modal.css`, `list-item-transparent.css`, затем `page-title.css` (колонка, зазоры, кто показан
на какой ширине) и `page-title.js` (открытие шторки).

## Разметка

```html
<div class="ptitle">
  <nav class="crumbs" aria-label="Хлебные крошки">
    <ol class="crumbs__list">
      <li class="crumbs__item"><a class="btn-area btn-area-muted btn-area--100" href="/"><span class="btn-area__label">Главная</span></a></li>
      <li class="crumbs__sep" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false"><path d="M6.97958 5.76055C7.17476 5.56543 7.49134 5.56557 7.68661 5.76055L9.57235 7.6463C9.76759 7.84154 9.76756 8.15806 9.57235 8.35333L7.68661 10.2391C7.49134 10.4343 7.17481 10.4343 6.97958 10.2391C6.78447 10.0438 6.78443 9.72726 6.97958 9.53204L8.5118 7.99981L6.97958 6.46758C6.78458 6.2723 6.7844 5.95573 6.97958 5.76055Z" fill="currentColor"/></svg></li>
      <li class="crumbs__item"><span class="crumbs__current" aria-current="page">Рубрика</span></li>
    </ol>
  </nav>
  <div class="heading heading--h1">
    <h1 class="heading__title">Рубрика</h1>
  </div>
  <p class="heading__count">200 товаров</p>
</div>
```

С мобильной ячейкой — разметка та же, плюс ссылка «Назад» сразу после крошек и шторка
последним ребёнком. Показ по ширине решает CSS, разметка одна на все ширины:

```html
<div class="ptitle">
  <nav class="crumbs" aria-label="Хлебные крошки">…Главная › Выбор покупателей › Спорт…</nav>
  <a class="btn btn-pills btn--100 btn--pill ptitle__back" href="/r-vybor-pokupateley" data-ptitle-back>
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false"><path d="M9.29996 3.75734C9.56031 3.49709 9.98203 3.49705 10.2423 3.75734C10.5027 4.01766 10.5026 4.43936 10.2423 4.69972L6.94254 7.99952L10.2423 11.2993C10.5027 11.5597 10.5027 11.9823 10.2423 12.2427C9.98206 12.5028 9.56028 12.5028 9.29996 12.2427L5.52848 8.4712C5.26821 8.2109 5.2683 7.78917 5.52848 7.52882L9.29996 3.75734Z" fill="currentColor"/></svg>Назад
  </a>
  <div class="heading heading--h1">
    <h1 class="heading__title">Спорт</h1>
  </div>
  <dialog class="mdl mdl-dialog ptitle__sheet" aria-labelledby="ptitle-sheet-title" data-ptitle-sheet>
    <header class="mdl__header">
      <h2 class="mdl__title" id="ptitle-sheet-title">Вернуться</h2>
      <button class="btn btn-ghost btn--200 btn--icon-only mdl__close" type="button" aria-label="Закрыть" data-ptitle-close><svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><!-- system-close-regular --></svg></button>
    </header>
    <div class="mdl__content">
      <ul class="ptitle__list">
        <li><a class="list-item list-item-transparent list-item--400" href="/">
          <span class="list-item__prefix" aria-hidden="true"><svg viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false"><!-- arrow-back_2-regular, путь — references/page-title.md --></svg></span>
          <span class="list-item__content"><span class="list-item__title">Главная</span></span>
        </a></li>
        <li><a class="list-item list-item-transparent list-item--400" href="/r-vybor-pokupateley">…Выбор покупателей…</a></li>
      </ul>
    </div>
    <footer class="mdl__footer mdl__footer--empty"></footer>
  </dialog>
</div>
```

- **«Назад» — ссылка на ближайший раздел выше, а не `<button>`.** Без скрипта она просто
  уводит туда: функция «вернуться» работает и тогда, когда `script.js` блока не отработал
  (критичный рендер — SSR). `page-title.js` делает из неё кнопку окна: `role="button"`,
  `aria-haspopup="dialog"`, Space нажимает, клик открывает шторку `showModal()`. Клик с
  модификатором или средней кнопкой остаётся переходом — новую вкладку не отнимаем.
- **В шторке — разделы выше текущего**, от «Главной» вниз, как в макете; текущей страницы в
  списке нет.
- **Выше только «Главная» — шторки нет.** `<dialog>` в разметку не ставится, и «Назад» остаётся
  ссылкой на главную: скрипт без `[data-ptitle-sheet]` кнопку не трогает. Окно с одной строкой —
  лишний шаг (решение владельца 10.10.2026). Шторка выводится, когда разделов выше два и больше.
- **Закрытие** — крестик `[data-ptitle-close]`, Esc (платформа), клик по подложке. Прокрутка
  страницы под окном блокируется на `<html>`; после закрытия фокус возвращается на «Назад».
- **`id` заголовка шторки уникален на странице:** блок ставит свой (`id` экземпляра блока).

- **Заголовок — `<h1>`.** Это заголовок страницы, а не секции: тег `h1` здесь
  обязателен, а не выбирается по структуре, как у самостоятельного `heading`. На
  странице `ptitle` один.
- **Корень — `<div>`.** `<header>` допустим, только когда компонент стоит внутри
  `<main>` или `<article>`: вне них `<header>` становится ориентиром `banner` и
  спорит с шапкой сайта.
- **Крошки необязательны.** В макете у компонента булево свойство показа крошек. Без
  крошек `ptitle` — колонка из одного заголовка, зазор не появляется (`gap` между
  одним ребёнком не рисуется).
- **Счётчик необязателен.** `<p class="heading__count">` — после `.heading`, прямым
  ребёнком `.ptitle`. Просто текст, не ссылка (решение владельца 09.10.2026): в макете
  инстанс `button-area / muted`, это расхождение «макет не прав». Без счётчика
  компонент такой же, как в 1.0.0.
- **Действия «Все» у заголовка нет.** В инстансе макета оно скрыто: у заголовка
  страницы нет раздела «выше», куда вела бы ссылка.

## Почему счётчик — `.heading__count`, а не `.ptitle__count`

Вид счётчика — цвет `surface-on-high`, control 300 13/16/0.1, regular — уже описан в
`heading` (набор `heading / goods`). Свой `.ptitle__count` повторил бы пять объявлений, и
правка вида в `heading` молча не дошла бы до заголовка страницы: два источника на одну
вещь. Поэтому `ptitle` берёт элемент `heading` целиком, а сам задаёт только место —
зазор `space-1-5` правилом `.ptitle > .heading + .heading__count`. Своих цветов и шрифтов
у `ptitle` по-прежнему нет. Шрифт счётчика задан на самом `.heading__count`, а не
унаследован от `.heading`, — поэтому элемент работает и вне `.heading`. Отступ коробки 24
(`padding-block: space-1`) — только внутри строки `.heading`: под заголовком страницы
коробка счётчика 16, как в макете.

Цена — элемент живёт вне своего блока, против буквы BEM. Принято осознанно: элемент
описан в контракте `heading`, `ptitle` его только размещает.

## Почему h1 — класс, а не мост

Уровень задаётся классом `.heading--h1` в разметке, а не правилом `.ptitle .heading`,
которое кормило бы аккумуляторы заголовка. Мост, как у `formfield`, нужен, когда
ступень у частей **одна на всех** и выбирает её потребитель: `.fld--400` раздаёт
ступень подписи и контролу разом. Здесь ступени нет — уровень у заголовка страницы
всегда h1, и у `heading` для этого уже есть публичный класс. Мост писал бы в приватные
`--awds-heading-*` чужого компонента: переименование аккумулятора в `heading` молча
выключило бы его, а гейты этого не видят. Цена — `.heading--h1` нужно не забыть;
её держит контракт `markup` (`component-markup-check`).

## Мобильная ячейка: почему так

- **Порог 1024 — медиазапрос, тот же, что у `modal`.** Ниже 1024 окно `modal` и так
  становится шторкой снизу; кнопка и шторка переключаются одной границей. Container query
  здесь не подходит: у компонента нет своего контейнера, а безымянный `@container` ищет
  ближайшего предка с `container-type` — без него условие не сработает никогда и «Назад»
  не появится вовсе.
- **Разметка одна на все ширины**, показ решает CSS (`display: none` у крошек ниже 1024 и у
  «Назад» от 1024). Две отдельные разметки по ширине пришлось бы выбирать скриптом — то есть
  на сервере обе всё равно рисуются.
- **Шторка — внутри `.ptitle`, последним ребёнком.** CSS блока живёт в `@scope` корня блока:
  окно, вынесенное из блока, осталось бы без стилей. В верхнем слое (`showModal`) `<dialog>`
  выходит из потока, а `@scope` считается по DOM — стили доезжают.
- **Цена:** на десктопе в DOM лишние ссылка и `<dialog>` (скрыты, в дерево доступности не
  попадают), шторке нужен скрипт; без скрипта «Назад» — обычная ссылка на родителя.

## Откуда берутся значения

| Что | Макет | Токен |
|---|---|---|
| Зазор крошки ↔ заголовок | `space/3` = 12 | `var(--awds-space-3)` — фикс, одно определение в теме |
| Зазор заголовок ↔ счётчик | `space/1-5` = 6 (обёртка «div» 1057:45304) | `var(--awds-space-1-5)` — фикс |
| Раскладка | flex-col, все дети Fill | `flex-direction: column; align-items: stretch`; зазоры — `margin-block-start` соседа, обёртки в разметке нет |
| Счётчик: 13/16/0.1, regular, `link/muted-rest` | инстанс `button-area / muted` 80×16 | `awds-component-heading`, `.heading__count`, роль `surface-on-high` |
| Крошки: 13/16/0.1, `link/muted-rest`, шеврон 16 | — | `awds-component-breadcrumbs` |
| Заголовок: 34/34/−0.3, semibold, `surface/on-highest` | роли `h1` (desktop, мод medium) | `awds-component-heading`, роли WYSIWYG h1 |
| «Назад» ↔ заголовок | `space/3` = 12 (view=mobile 1073:787) | `var(--awds-space-3)` — тот же зазор, что у крошек |
| «Назад»: pills 100, 13/16 600, иконка 16 | инстанс `button / pills`, Hug | `awds-component-button`; `align-self: flex-start` |
| Шторка: заголовок 18/22 600, поля `gutter-modal`, пустой подвал 16 | инстанс `modal / dialog` (back-sheet 1073:2928) | `awds-component-modal`, `.mdl__footer--empty` |
| Пункт: 14/20, строка 40, иконка 20 цветом `list/transparent/icon` | инстанс `list-item / transparent` 400 | `awds-component-list-item` |

Кегль заголовка растёт по брейкпоинту и масштабу `.typo-*` внутри роли h1 — компонент
это не трогает. Зазоры `space-3` и `space-1-5` от ширины окна не зависят.

## Расхождения с макетом

- **Шапка шторки выше макета на 10** (56 против 46 при ширине 360). В макете крестик
  `modal / dialog` стоит абсолютно и высоты шапке не добавляет, в коде `modal` он в потоке
  (32). Это расхождение компонента `modal`, а не `page-title`: правится там, для всех окон.

- **Счётчик — текст, а не ссылка** (решение владельца 09.10.2026, «макет не прав»). В
  макете под заголовком инстанс `button-area / muted`; счётчик никуда не ведёт, код
  ставит текст. В макете заменить на текст на роли `surface/on-high`.
- **Зазор заголовок ↔ счётчик — 6, а не 12.** В постановке стоял `space-3`; в макете
  (снимок 09.10.2026) счётчик лежит во внутренней обёртке с `gap` = переменная `1-5`
  (6), компонент 351×84. Код идёт за привязкой макета.

## CSS и скрипт

| Файл | Что внутри |
|---|---|
| `references/page-title.css` | `.ptitle`: колонка, растяжение частей, зазоры `space-3` и `space-1-5`; ниже 1024 крошки скрыты, «Назад» показана; `.ptitle__list` без маркеров |
| `references/page-title.js` | «Назад» открывает шторку: `role="button"`, Space, `showModal()`, крестик, подложка, блокировка прокрутки, возврат фокуса; MutationObserver для блоков, вставленных позже |

## Storybook

[references/preview.html](references/preview.html) (`file://`) — эталон из макета,
длинный заголовок в узкой колонке, со счётчиком, вариант без крошек, тёмная тема,
самопроверка числами (зазоры 12 и 6, h1 34/34 на десктопе, счётчик 13/16).

## Refresh

```
обнови awds-component-page-title под Figma
```

## Соседние компоненты

- **[awds-component-heading](../awds-component-heading/SKILL.md)** — заголовок секции
  без крошек; уровень любой, действие «Все» есть.
- **[awds-component-breadcrumbs](../awds-component-breadcrumbs/SKILL.md)** — крошки
  сами по себе, без заголовка.
