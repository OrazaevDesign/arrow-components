# Pagination — разметка

**Источник:** [💠 arrow ↪ components → 8 · navigation → ↪ pagination](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=78-47712) · своё — шторки и подпись, остальное инстансы `button`.

> [!NOTE]
> `pagination.md` — **author-owned**. ACB пишет первичный draft, потом не трогает.

## Полная разметка

```html
<nav class="pgn" aria-label="Страницы каталога">
  <div class="pgn__controls">
    <ul class="pgn__list">
      <li class="pgn__item"><a class="btn btn-secondary btn--300" href="?page=1">1</a></li>
      <li class="pgn__item"><a class="btn btn-secondary btn--300" href="?page=2">2</a></li>
      <li class="pgn__item"><a class="btn btn-primary btn--300" href="?page=3" aria-current="page">3</a></li>
      <li class="pgn__item"><a class="btn btn-secondary btn--300" href="?page=4">4</a></li>
      <!-- …остальные страницы… -->
    </ul>

    <div class="pgn__edge pgn__edge--start">
      <a class="btn btn-ghost btn--300 btn--icon-only" href="?page=1" aria-label="Первая страница">
        <svg width="20" height="20" aria-hidden="true"><!-- arrow-to-left --></svg>
      </a>
      <a class="btn btn-ghost btn--300 btn--icon-only" href="?page=2" aria-label="Предыдущая страница">
        <svg width="20" height="20" aria-hidden="true"><!-- arrow-left --></svg>
      </a>
    </div>

    <div class="pgn__edge pgn__edge--end">
      <a class="btn btn-ghost btn--300 btn--icon-only" href="?page=4" aria-label="Следующая страница">
        <svg width="20" height="20" aria-hidden="true"><!-- arrow-right --></svg>
      </a>
      <a class="btn btn-ghost btn--300 btn--icon-only" href="?page=21" aria-label="Последняя страница">
        <svg width="20" height="20" aria-hidden="true"><!-- arrow-to-right --></svg>
      </a>
    </div>
  </div>

  <p class="pgn__caption">Товары 51–100. Всего 1108</p>
</nav>
```

## Три положения — это разметка, а не классы

Ось `position` из макета в CSS не выражена: у компонента нет модификатора положения,
потому что положение видно по тому, какие группы стрелок отрисованы.

| Положение | Что рендерит потребитель |
|---|---|
| первая страница (`position=start`) | только `.pgn__edge--end` |
| середина (`position=center`) | обе группы |
| последняя (`position=end`) | только `.pgn__edge--start` |

Группа стрелок несёт на себе и шторку — градиент лежит на `.pgn__edge`. Значит нет
группы → нет и шторки, и край ленты виден целиком. Ровно это показывают три ячейки
макета.

**Не прятать стрелки через `disabled`.** На первой странице кнопки «в начало» и «назад»
не выключаются, а не рендерятся: выключенная кнопка остаётся в табуляции и читается
скринридером как доступное действие, которого нет.

## Лента, а не усечение

Все страницы идут подряд одним рядом; ряд прокручивается горизонтально, шторки
маскируют обрезанные края. Привычного `1 … 10 [11] 12 … 50` здесь нет — так нарисован
макет, и это решение владельца от 18.09.2026.

Что из этого следует потребителю:

- **Прокрутку к текущей странице делает он.** Компонент не знает, какая страница
  активна, и сам ленту не листает. После рендера:

  ```js
  const current = list.querySelector('[aria-current="page"]');
  current?.scrollIntoView({ inline: 'center', block: 'nearest' });
  ```

  `scroll-behavior: smooth` на ленте уже стоит и гасится при `prefers-reduced-motion`.

- **Пока страниц мало, лента стоит по центру** и не прокручивается — это тот же CSS,
  без ветвлений.

## Подпись

`.pgn__caption` — строка под лентой: сколько товаров показано и сколько всего.
Числа в ней меняются при листании, поэтому цифры моноширинные (`tabular-nums`) —
строка не дёргается.

Текст пишет потребитель. В макете стоит «Товары 51-100. Всего - 1108»; правильная
типографика — диапазон через тире без пробелов и без дефиса-связки:
**«Товары 51–100. Всего 1108»**.

## Доступность

- Корень — `<nav>` с `aria-label`: на странице каталога пагинация не одна (верхняя и
  нижняя), и без имени они неразличимы в списке ориентиров.
- Лента — `<ul>`, каждая страница `<li>`: скринридер объявляет «список из 21».
  `.pgn__item { display: contents }` убирает обёртку из раскладки, не убирая из дерева
  доступности.
- Текущая страница — `aria-current="page"` **и** `btn-primary`: цвет один не годится.
- Страницы — ссылки `<a href>`, а не кнопки: страница каталога имеет адрес, её
  открывают в новой вкладке и копируют.
- Стрелки — `btn--icon-only` с `aria-label`; текста внутри нет, `aria-label` и есть имя.
- Кольцо фокуса приходит слоем
  [awds-component-focus-selection](../../awds-component-focus-selection/SKILL.md)
  вместе с кнопкой.

## Чего в компоненте нет

| Нет | Почему |
|---|---|
| размерной шкалы | в макете одна ступень — кнопки `btn--300`; у `link`, `tooltip`, `product-card` так же |
| своих состояний | наведение, фокус и нажатие живут в кнопке |
| выбора «показывать по N» | это отдельный контрол, в макете его нет |
| подгрузки «ещё» | другой паттерн; пагинация даёт адреса страниц |
