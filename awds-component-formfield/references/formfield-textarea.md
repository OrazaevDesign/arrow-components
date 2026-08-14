# Formfield / Textarea

**Figma:** [4ipeXkifl3Hl6pVZUF4nuJ → node 395:77526](https://www.figma.com/design/4ipeXkifl3Hl6pVZUF4nuJ/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B5-Forms?node-id=395-77526)

> [!NOTE]
> Этот файл (`formfield-textarea.md`) — **author-owned**. ACB пишет первичный draft, потом не трогает.

## Отдельного CSS у этого варианта нет

`Formfiled / Textarea` — **то же поле**, что и [Formfield / Input](formfield-input.md): подпись, контрол, пояснение, ошибка, зазор 4. Сверены все три ячейки макета.

| Size | подпись | контрол | пояснение | ошибка | зазор | высота |
|---|---|---|---|---|---|---|
| 500 | 24 | 88 | 20 | 20 | 4 | **164** |
| 400 | 24 | 80 | 16 | 16 | 4 | **148** |
| 300 | 20 | 76 | 16 | 16 | 4 | **140** |

Поле выше, чем с `input`, ровно на разницу контролов (88 против 48 и так далее) — состав и зазоры не меняются. Высоты контрола совпадают с [awds-component-textarea](../../awds-component-textarea/SKILL.md) тех же ступеней: там они выведены как `2 × padding + 3 × line-height`.

## Разметка

```html
<div class="fld fld--400">
  <label class="lbl" for="note">
    <span class="lbl__body"><span class="lbl__text">Комментарий к заказу</span></span>
  </label>

  <span class="txa txa-default">
    <textarea class="txa__field" id="note" aria-describedby="note-desc"
              placeholder="Например: позвонить за час"></textarea>
  </span>

  <p class="fld__description" id="note-desc">Курьер увидит его перед доставкой</p>
</div>
```

Размерный класс textarea не нужен: `.fld--400` кормит его size-аккумуляторы через мост.

## Поле, которое растёт

У textarea живой ресайз по вертикали. Когда пользователь тянет за угол, **поле растёт вместе с ним**: пояснение и ошибка просто уезжают ниже, зазор остаётся 4. Ломаться тут нечему — колонка не фиксирует высоту частей.

Если поле не должно тянуться, ресайз снимается на самом контроле модификатором `.txa--fixed` (он же убирает ручку), а не на поле.

## Что подключить

`formfield-input.css` + [`label.css`](../../awds-component-label/references/label.css) + [`textarea-default.css`](../../awds-component-textarea/references/textarea-default.css).

## Проверено

Состав ячеек снят из макета (`395:77527`, `395:77532`, `395:77537`); собранное поле замерено в headless chromium — 164/148/140, совпадение полное.
