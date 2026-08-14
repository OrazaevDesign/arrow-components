# Formfield / Input

**Figma:** [4ipeXkifl3Hl6pVZUF4nuJ → node 395:77494](https://www.figma.com/design/4ipeXkifl3Hl6pVZUF4nuJ/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B5-Forms?node-id=395-77494)

> [!NOTE]
> Этот файл (`formfield-input.md`) — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`formfield-input.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

Поле формы целиком. CSS: [formfield-input.css](formfield-input.css). Рядом нужны [label.css](../../awds-component-label/references/label.css) и CSS того контрола, который стоит внутри.

## Полный состав

```html
<div class="fld fld--400">
  <label class="lbl" for="mail">
    <span class="lbl__body"><span class="lbl__text">Электронная почта</span></span>
  </label>

  <span class="input input-default">
    <input class="input__field" id="mail" type="email" aria-describedby="mail-desc">
  </span>

  <p class="fld__description" id="mail-desc">Пришлём чек и статус заказа</p>
</div>
```

Четыре части идут колонкой с зазором 4px: подпись → контрол → пояснение → ошибка. Любую можно опустить — пустых элементов в разметке оставлять не нужно.

## Поле с ошибкой

```html
<div class="fld fld--400">
  <label class="lbl" for="mail2">
    <span class="lbl__body"><span class="lbl__text">Электронная почта</span></span>
  </label>

  <span class="input input-error">
    <input class="input__field" id="mail2" type="email"
           value="ivan@" aria-invalid="true" aria-describedby="mail2-desc mail2-err">
  </span>

  <p class="fld__description" id="mail2-desc">Пришлём чек и статус заказа</p>
  <p class="fld__error" id="mail2-err">Не хватает домена — например, ivan@example.com</p>
</div>
```

- Красный вариант ставится **на контрол** (`input-error`), а не на поле: цвет несёт контрол.
- `aria-invalid` и `aria-describedby` обязательны. Если показаны и пояснение, и ошибка — оба id через пробел.
- Текст ошибки объясняет, что не так и что делать. Слово «Ошибка» в качестве текста бесполезно.

## Другие контролы

Состав и зазоры не меняются — меняется только вложенный компонент. Сверено по макету: у `Formfiled / Select` те же высоты ячеек, что у Input, у `Formfiled / Textarea` — больше ровно на высоту контрола.

```html
<div class="fld fld--500">
  <label class="lbl" for="city"><span class="lbl__body"><span class="lbl__text">Город</span></span></label>
  <span class="select select-default">
    <select class="select__field" id="city">…</select>
  </span>
</div>

<div class="fld fld--400">
  <label class="lbl" for="note"><span class="lbl__body"><span class="lbl__text">Комментарий</span></span></label>
  <span class="txa txa-default">
    <textarea class="txa__field" id="note"></textarea>
  </span>
</div>
```

## Размеры

| Класс | Подпись | Контрол | Пояснение и ошибка | Высота с input | с textarea |
|---|---|---|---|---|---|
| `fld--300` | 20 | 36 | 16 (12/16) | 100 | 140 |
| `fld--400` | 24 | 40 | 16 (13/16) | 108 | 148 |
| `fld--500` | 24 | 48 | 20 (14/20) | 124 | 164 |

Зазор — 4px между всеми частями, одинаковый на всех размерах.

**Размерные классы вложенным не нужны.** `.fld--{N}` кормит size-аккумуляторы подписи и контрола сам. Мост при этом сильнее их собственных классов: `.fld--500 .input` весит (0,2,0) против (0,1,0) у `.input--300`. Нужна нестандартная пара — задавай переменные инлайном на самом контроле.

## Типографика пояснения

Ручной маппинг по значению, а не `rectangle-{N}-description`:

| Размер поля | Пояснение | Семантический токен дал бы |
|---|---|---|
| 500 | 14/20 (`control-400`) | 14/20 — совпало |
| 400 | 13/16 (`control-300`) | 13/16 — совпало |
| 300 | **12/16** (`control-200`) | 13/16 — **на ступень крупнее макета** |

Из-за размера 300 семантику взять нельзя.

## Выключенное поле

```html
<div class="fld fld--400">
  <label class="lbl" for="promo"><span class="lbl__body"><span class="lbl__text">Промокод</span></span></label>
  <span class="input input-default"><input class="input__field" id="promo" disabled></span>
  <p class="fld__description">Появится после выбора способа доставки</p>
</div>
```

Гаснет **только пояснение** (40%): контрол и подпись гасятся своими правилами, а текст ошибки — если он показан — остаётся в полную силу. Этого состояния в макете нет, правило выведено.

## Проверено

Headless Chromium, `getComputedStyle` + `getBoundingClientRect`: 11 полей (3 размера × 3 контрола + поле без пояснения + выключенное), 83 замера, 0 расхождений. Полные высоты сверены с ячейками макета — 9 из 9: Input 124/108/100, Select 124/108/100, Textarea 164/148/140.

Мост проверен тем, что ни одному вложенному компоненту не выставлялся size-класс: ступень пришла от поля.

Гоча проверки цветов: сравнивать нужно с `probe('rgb(var(--роль))')`, а не с hex из Figma. Первый прогон дал ложное расхождение по цвету пояснения — палитра снапшота темнее эталонной, роль при этом резолвилась верно.
