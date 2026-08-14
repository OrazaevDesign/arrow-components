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

```html
<label class="lbl lbl--400">
  <span class="checkbox">
    <input class="checkbox__input" type="checkbox">
    <span class="checkbox__box">
      <svg class="checkbox__icon checkbox__icon--check" viewBox="0 0 24 24" fill="currentColor">…</svg>
    </span>
  </span>
  <span class="lbl__body">
    <span class="lbl__text">Согласен с условиями</span>
  </span>
</label>
```

- Контрол размечается `<span class="checkbox">`, **не** `<label class="checkbox">`: вложенные `<label>` невалидны, а внешняя обёртка нужна для клика по тексту.
- Размерный класс контролу не нужен — подпись задаёт ступень мостом.
- Радио и переключатель — так же, со своими классами (`.radio` / `.switch`).

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
| `lbl--500` | 28 | 28 | 24 | 20 | 2 |

Текст везде 14/20. Зазор контрол→текст 8 на всех размерах, образец→текст 6.

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

Headless Chromium, `getComputedStyle` + `getBoundingClientRect`: 27 строк (8 типов × 3 размера + 3 выключенных), 222 замера, 0 расхождений с макетом. Контролы брались живыми из `awds-component-checkbox` / `-radio` / `-switch` — мост размеров отработал на всех трёх ступенях без единого size-класса на самих контролах.

Отдельная проверка после правки: расстояние от текста до подсказки равно 8 на всех размерах. В первой версии тело было растянуто (`flex: 1`) и уводило подсказку к правому краю — расхождение с макетом.
