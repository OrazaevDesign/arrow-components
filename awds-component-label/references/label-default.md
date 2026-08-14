# Label

**Figma:** [4ipeXkifl3Hl6pVZUF4nuJ → node 395:77055](https://www.figma.com/design/4ipeXkifl3Hl6pVZUF4nuJ/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B5-Forms?node-id=395-77055)

> [!NOTE]
> Этот файл (`label-default.md`) — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`label.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

Подпись к контролу формы. CSS: [label.css](label.css). Для типов с контролом рядом нужен CSS соответствующего компонента — [checkbox.css](../../awds-component-checkbox/references/checkbox.css), [radio.css](../../awds-component-radio/references/radio.css), [switch.css](../../awds-component-switch/references/switch.css).

## Type = Label

```html
<label class="lbl lbl--400" for="city">
  <span class="lbl__body">
    <span class="lbl__text">Город доставки</span>
  </span>
</label>
```

Обычная подпись к полю. Связь через `for` + `id` обязательна — иначе клик по подписи не сфокусирует поле, а скринридер не назовёт его.

## Type = Label + Help

```html
<label class="lbl lbl--400" for="inn">
  <span class="lbl__body">
    <span class="lbl__text">ИНН</span>
  </span>
  <button type="button" class="lbl__help" aria-label="Зачем нужен ИНН">
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6">…</svg>
  </button>
</label>
```

Знак вопроса стоит **вплотную за текстом**, а не у правого края — так в макете, и так связь «вопрос про эту подпись» очевиднее. Нужен «?» у края (широкая таблица настроек) — добавь `margin-inline-start: auto` на кнопке.

Кнопка, а не `<span>`: за подсказкой стоит объяснение, до него должны доходить клавиатура и скринридер. Сам тултип — [awds-component-tooltip](../../awds-component-tooltip/SKILL.md).

## Type = Icon

```html
<label class="lbl lbl--400">
  <span class="lbl__icon"><svg viewBox="0 0 24 24">…</svg></span>
  <span class="lbl__body">
    <span class="lbl__text">Доставка по Европе</span>
  </span>
</label>
```

Бокс иконки равен боксу чекбокса того же размера (28/24/20) — иначе строки с иконкой и с чекбоксом встали бы по разным вертикалям.

## Type = Checkbox / Radio / Switch

**Внутренности контрола копируются из его скилла 1-в-1, включая иконки** — они часть компонента, а не декорация. Единственное изменение — обёртка `<span>` вместо `<label>`.

Чекбокс ([awds-component-checkbox](../../awds-component-checkbox/SKILL.md)) — две иконки, галка и прочерк; какая видна, решает состояние инпута:

```html
<label class="lbl lbl--400">
  <span class="checkbox">
    <input class="checkbox__input" type="checkbox">
    <span class="checkbox__box">
      <svg class="checkbox__icon checkbox__icon--check" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">…</svg>
      <svg class="checkbox__icon checkbox__icon--indeterminate" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">…</svg>
    </span>
  </span>
  <span class="lbl__body">
    <span class="lbl__text">Согласен с условиями</span>
  </span>
</label>
```

Радио ([awds-component-radio](../../awds-component-radio/SKILL.md)) — **внутри `__box` обязателен `<svg class="radio__dot">`**. Без него кружок останется пустым и на радиокнопку не похож:

```html
<label class="lbl lbl--400">
  <span class="radio">
    <input class="radio__input" type="radio" name="delivery" value="pickup">
    <span class="radio__box">
      <svg class="radio__dot" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="5"/></svg>
    </span>
  </span>
  <span class="lbl__body">
    <span class="lbl__text">Самовывоз</span>
  </span>
</label>
```

Переключатель ([awds-component-switch](../../awds-component-switch/SKILL.md)) — дорожка с ручкой, инпуту нужен `role="switch"`:

```html
<label class="lbl lbl--400">
  <span class="switch">
    <input class="switch__input" type="checkbox" role="switch">
    <span class="switch__track"><span class="switch__handle"></span></span>
  </span>
  <span class="lbl__body">
    <span class="lbl__text">Показывать цены с НДС</span>
  </span>
</label>
```

- Контрол размечается `<span class="…">`, **не** `<label class="…">`: вложенные `<label>` невалидны, а внешняя обёртка нужна для клика по тексту.
- Размерный класс контролу не нужен — подпись задаёт ступень мостом.
- Группа радиокнопок по-прежнему требует общего `name` и обёртки `<fieldset>` с `<legend>` — см. скилл радио.

## Type = Checkbox + Color

```html
<label class="lbl lbl--500">
  <span class="checkbox">
    <input class="checkbox__input" type="checkbox">
    <span class="checkbox__box">…</span>
  </span>
  <span class="lbl__body">
    <span class="lbl__mark" style="background: #c0392b"></span>
    <span class="lbl__text">Красный</span>
  </span>
</label>
```

Кружок-образец: обводка и скругление от компонента, **заливку задаёт потребитель** — это цвет товара, а не роль дизайн-системы. Обводка нужна всегда, иначе белые и светлые образцы исчезают на белом фоне.

Название рядом обязательно: цвет сам по себе не читается ни скринридером, ни при дальтонизме.

## Type = Checkbox + Flag

```html
<label class="lbl lbl--500">
  <span class="checkbox">…</span>
  <span class="lbl__body">
    <span class="lbl__mark lbl__mark--plain"><svg viewBox="0 0 24 24">…</svg></span>
    <span class="lbl__text">Европа</span>
  </span>
</label>
```

Тот же слот, но `--plain` снимает рамку и скругление: форму несёт сама картинка.

## Размеры

| Класс | Строка | Контрол | Образец | Подсказка | Отступ текста |
|---|---|---|---|---|---|
| `lbl--300` | 20 | 20 | 20 | 16 | 0 |
| `lbl--400` | 24 | 24 | 20 | 16 | 2 |
| `lbl--500` | 28 | 28 | 24 | 20 | 4 |

Текст везде 14/20. Зазор контрол→текст 8 на всех размерах, образец→текст 6. Отступ текста в таблице — эффективный: без контрола он макетный (2/2/0), с контролом такой, чтобы первая строка встала по центру контрола (4/2/0).

## Выравнивание по верхнему краю

Контрол, образец и подсказка держатся **верхнего края строки**, а не её середины. На однострочной подписи это незаметно — числа макета сходятся в обоих случаях. Разница появляется, когда текст переносится:

```html
<label class="lbl lbl--500">
  <span class="checkbox">…</span>
  <span class="lbl__body">
    <span class="lbl__text">Согласен получать письма о новинках, скидках и персональных предложениях</span>
  </span>
</label>
```

Чекбокс остаётся у первой строки, а его центр совпадает с центром этой строки (проверено на пятистрочном тексте). При выравнивании по центру он уполз бы к середине абзаца и перестал читаться как относящийся к его началу.

Образец цвета центрируется по первой строке симметричным отрицательным `margin-block`: на размере 500 он выше строки (24 против 20) и выступает на 2px сверху и снизу — ровно как в макете, — но строку по высоте не распирает.

## Выключенное состояние

```html
<label class="lbl lbl--400">
  <span class="checkbox">
    <input class="checkbox__input" type="checkbox" disabled>
    <span class="checkbox__box">…</span>
  </span>
  <span class="lbl__body"><span class="lbl__text">Недоступно в вашем городе</span></span>
</label>
```

Ряд гаснет целиком (`opacity: var(--awds-opacity-40)`). **Этого состояния в макете нет** — правило выведено, иначе рядом стоял бы серый чекбокс с чёрной подписью. Причину недоступности пиши текстом, а не только серостью.

## Проверено

Headless Chromium, `getComputedStyle` + `getBoundingClientRect`: 27 строк (8 типов × 3 размера + 3 выключенных), 141 замер вертикали и зазоров, 0 расхождений с макетом — y текста 4/2/0 с контролом и 2/2/0 без, y образца 2/2/0, y подсказки 2/4/2, высота строки 28/24/20 (без контрола 24/24/20), зазоры 8 и 6.

Контролы брались живыми из `awds-component-checkbox` / `-radio` / `-switch` — мост размеров отработал на всех трёх ступенях без единого size-класса на самих контролах.

Отдельно на пятистрочном тексте: контрол прижат к верху строки, его центр совпадает с центром первой строки.

Три ошибки, найденные проверками и исправленные:
1. В превью радио было размечено без `radio__dot` — кружок выглядел пустым, на радиокнопку не похож. Внутренности контролов теперь копируются из их скиллов дословно.
2. Тело было растянуто (`flex: 1`) и уводило подсказку к правому краю — в макете она стоит вплотную за текстом.
3. Образец с односторонним отрицательным отступом распирал строку на размере 500 (30 вместо 28) — заменён на симметричный `margin-block`.
