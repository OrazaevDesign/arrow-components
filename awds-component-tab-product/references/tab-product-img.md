# Tab Product — img

Плитка выбора вариации товара с фотографией: расцветка, принт, вариант отделки —
всё, что словом не назвать, а показать нужно. Пропорция 4:5, одна из полосы.

**Figma:** [tab-product / img-unselected](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=8-42985) ·
[img-selected](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=8-43053) ·
[img-indeterminate](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=8-43065) —
секция «↪ tab-product» (`5:45`) файла «💠 arrow ↪ components», страница «6 · tabs».

**CSS:** `references/tab-product.css` (один на оба вида и все три тона).

## HTML

```html
<fieldset class="tab-product-group">
  <legend>Расцветка</legend>

  <label class="tab-product tab-product-img tab-product-selected">
    <input class="tab-product__input" type="radio" name="color" value="oak" checked>
    <img class="tab-product__img" src="/media/sofa-oak.jpg" alt="Дуб натуральный">
  </label>

  <label class="tab-product tab-product-img tab-product-unselected">
    <input class="tab-product__input" type="radio" name="color" value="walnut">
    <img class="tab-product__img" src="/media/sofa-walnut.jpg" alt="Орех">
  </label>

  <label class="tab-product tab-product-img tab-product-indeterminate">
    <input class="tab-product__input" type="radio" name="color" value="graphite">
    <img class="tab-product__img" src="/media/sofa-graphite.jpg" alt="Графит">
  </label>
</fieldset>
```

`alt` — название вариации, а не «фото товара»: для человека со скринридером это
единственный текст плитки, и он же подпись радиокнопки.

## Ширина задаётся снаружи

Оси размера у вида с фото нет — и это не пропуск. В макете пропорцию держит
инстанс `FixedAspectRatioSpacer` 4:5, а ширина ячейки (76 px) — демонстрационная.

В CSS компонент объявляет `aspect-ratio: 4 / 5`, `inline-size: 100%` и
`flex: 0 1 auto`. Дефолт из этого получается «плитки делят полосу поровну». Нужна
другая раскладка — её задаёт потребитель или контейнер:

```html
<!-- фиксированная ширина плитки -->
<label class="tab-product tab-product-img tab-product-unselected" style="inline-size: 76px">…</label>
```

```css
/* полоса из плиток по 80px с прокруткой */
.product-colors { display: flex; gap: var(--awds-space-2); overflow-x: auto; }
.product-colors .tab-product { inline-size: 80px; flex: 0 0 auto; }
```

Класс `.tab-product--400` / `.tab-product--300` на плитке с фото не ставится: ступени задают
отступы и кегль, которых у неё нет.

## Из чего собрана плитка

Три слоя, ровно как в макете:

| Слой | Что | Чем в CSS |
| --- | --- | --- |
| подложка | роль `surface/bright` | `--awds-tab-product-bg` в `.tab-product.tab-product-img` |
| фото | image-заливка ячейки | `<img class="tab-product__img">`, `object-fit: cover` |
| плёнка | роль `extended/shadow/opacity3` | `.tab-product.tab-product-img::before` |

Плёнка нужна, чтобы светлое фото не сливалось с белой подложкой страницы. До
01.09.2026 эти три слоя жили библиотечным paint-стилем `headphones/listing/11`,
внутри которого лежали сырые `#FFFFFF` и `rgba(0,0,0,.03)`; стиль разобран, оба
значения теперь роли.

Четвёртого слоя у тона `indeterminate` нет: узел `overlay` (`surface/bright` при
`opacity/50`) снят решением владельца ДС 01.09.2026 — тон читается своими `bg`,
`border` и `color`, а плёнка была вторым декоративным признаком того же тона. В
макете узел пока остаётся, это расхождение по структуре (реестр, Р-18).

## Обводка у невыбранной плитки — только на hover

Замер по макету: из пяти ячеек `tab-product / img-unselected` заливку обводки
несёт ровно одна — `state=hover`. У остальных четырёх массив `strokes` пуст.
У тонов `selected` и `indeterminate` обводка стоит во всех состояниях, у вида
`text` — тоже.

Ячейка `variation/unselected/border-rest` в теме есть и не пустая
(`secondary-container-dim`), то есть значение существует, а макет его у фото не
применяет. Код идёт за макетом: наличие обводки — структура, а по структуре Figma
старший. Вопрос вынесен владельцу (`img-unselected-border-only-hover`).

## Состояния

| Состояние | подложка | обводка |
| --- | --- | --- |
| rest | `surface-bright` | `selected` → `primary-core`; `unselected` → нет; `indeterminate` → `surface-on-lowest` |
| hover | `surface-bright` | во всех тонах — `primary-core` |
| focus | `surface-bright` | как rest + кольцо слоя focus-selection |
| active | `surface-bright` | как rest |
| disabled | как rest | как rest, поверх `state/opacity/control-disabled` |

Кольцо фокуса — слой `awds-component-focus-selection`, вариант `offset=outside` ·
`tone=default` (снято с инстанса в ячейке `state=focus`, где стоит
`radius=500, offset=outside, tone=default`). Ось `radius` в CSS не выражается:
`outline` следует `border-radius` сам.

## Чего здесь нет

- **Оси размера.** Её нет в макете осознанно: геометрию задаёт пропорция.
- **`background-image` вместо `<img>`.** Фон не попадает в дерево доступности и
  не грузится ленивым `loading="lazy"`; вариация товара — контент, а не декор.
- **Своей ячейки пропорции.** `4 / 5` — своё значение: коллекции пропорций в
  теме нет (вопрос `tabs-aspect-ratio-cell`).
