---
name: awds-component-tab-product
description: Tab Product ArrowDS (.tab-product).
---

# Tab Product ArrowDS

Плитка выбора вариации товара — цвет, размер, объём, комплектация. Два вида
(с подписью и с фото), три тона выбранности, две ступени у текстового вида.
Размеры, цвета и шрифт берутся из токенов DS, ничего не хардкодится. См. скилл
`arrow-design-system` за общей картиной токенов и `arrow-components-builder` за
регенерацией этого скилла из Figma.

## Базовый класс — `.tab-product`

Полное имя, без сокращения — **решение по семье**, принятое владельцем ДС
01.09.2026: вкладки держат одно пространство имён `.tab` / `.tab-group` /
`.tab-product`, ровно как buttons держат `.btn` / `.btn-area` / `.btn-group` /
`.btn-menu`. Свой короткий корень (`.ptab`) и префикс (`.awds-tab`) отвергнуты:
сокращение выпадает из семьи и ничего не говорит тому, кто его не знает, а
приставка `awds-` есть только у `table` и сама числится записанным долгом.
**Не сокращать обратно** — длина здесь принятая цена.

Цена записана: приватные `--awds-tab-product-*` префиксом входят в
`--awds-tab-*` соседа `awds-component-tab`, поэтому грепом `var(--awds-tab-`
находятся оба. Искать точным именем: `var(--awds-tab-product-`. В каскаде
коллизии нет — пересекается только префикс, страдает поиск, а не поведение.
Полностью — `base_class_note` в `component.meta.json`.

**Имя компонента дано по месту применения осознанно** (отклонение от правила 3
канона имён, решение В2 от 31.08.2026): «вкладка выбора вариации товара» точнее
любого описания того, что в ней меняется. Не переименовывать — см. `name_note` в
мете.

## Две независимые оси

| Ось | Значения | Класс |
| --- | --- | --- |
| `content` — вид плитки | `text` · `img` | `.tab-product-text` · `.tab-product-img` |
| тон — выбранность | `selected` · `unselected` · `indeterminate` | `.tab-product-selected` · `.tab-product-unselected` · `.tab-product-indeterminate` |
| `size` — ступень (только у `text`) | `400` · `300` | `.tab-product--400` · `.tab-product--300` |

Оси комбинируются 2 × 3. В макете они склеены в имя набора через дефис
(`tab-product / text-selected`), в CSS разложены на два класса — каждый на один
дефис, потому что внутри своей оси выбор взаимоисключающий.

**Выбранность — вариант, а не состояние.** Оси `state=selected` в закрытом
словаре нет: дизайн-система выражает выбранность именем варианта, за которым
стоит группа ячеек `variation/*` слоя State темы. Третье значение,
`indeterminate`, — тоже имя варианта: это тон доступности вариации, а не
состояние чекбокса.

## Разметка: нативная радиогруппа

```html
<fieldset class="tab-product-group">
  <legend>Размер</legend>
  <label class="tab-product tab-product-text tab-product-selected tab-product--400">
    <input class="tab-product__input" type="radio" name="size" value="m" checked>
    <span class="tab-product__title">M</span>
  </label>
  <label class="tab-product tab-product-text tab-product-unselected tab-product--400">
    <input class="tab-product__input" type="radio" name="size" value="l">
    <span class="tab-product__title">L</span>
  </label>
</fieldset>
```

Семантику несёт `input[type="radio"]`, а не `role="tab"` и не `aria-pressed`:
выбор вариации — «одна из списка», и общий `name` даёт стрелки клавиатуры,
roving-фокус и отправку формы без JS. `role="tab"` пообещал бы `tabpanel` с
`aria-controls`, которого у плитки нет.

Обязательное — таблица в `references/tab-product-text.md`, раздел «Что
обязательно», и поле `markup` в мете (на него опирается
`scripts/component-markup-check.mjs`).

## Откуда берутся значения

| Что | Источник |
| --- | --- |
| фон, обводка, текст | слой State темы, группа `variation/{тон}/{bg,border,color}-{состояние}` |
| геометрия `text` | `size/rectangle/{300,400}/{padding,gap,rounded}`; боковой отступ — из `gap`, как в макете |
| кегль | `rectangle/{N}/typography` → 14 px на обеих ступенях (`control-font-size-400`) |
| радиус `img` | `rounded/border-radius/500` |
| подложка и плёнка `img` | роли `surface/bright` и `extended/shadow/opacity3` |
| гашение | `state/opacity/control-{enabled,disabled}` — тон слоя, не литерал `--awds-opacity-40` |
| кольцо фокуса | слой `awds-component-focus-selection`, `offset=outside · tone=default` |

Свои значения — два: `1px` толщины обводки и `0.15s` перехода, оба с причиной в
`own_values`. Минимальная ширина плитки не литерал, а `calc(2 × padding + lh)`.

## Варианты

| Вариант | Reference | Когда |
| --- | --- | --- |
| **text** | `references/tab-product-text.md` | вариацию можно назвать: размер, объём, название цвета |
| **img** | `references/tab-product-img.md` | вариацию нужно показать: расцветка, принт, отделка |

## CSS

Один файл на все шесть наборов — `references/tab-product.css`. В любом селекторе
вариации одновременно живут выбранная плитка, невыбранные и часто частично
доступная; три файла заставили бы потребителя подключать все три и трижды
получить одну базу.

## Storybook

`references/preview.html`, открывается по `file://` — матрица тон × состояние ×
ступень, переключатели вида и темы, замеры computed-значений.

## Refresh

```
обнови awds-component-tab-product под Figma
```

ACB зайдёт по ссылкам из `component.meta.json`, сравнит с `snapshot/figma.json`,
покажет diff и перепишет CSS и preview. Этот файл и `{variant}.md` —
author-owned, не трогаются.

## Открытые вопросы

Четыре открытых, все `minor`, полностью — в `questions` меты. Два вопроса закрыты
решениями владельца ДС 01.09.2026 и оставлены со `status: answered`, чтобы их не
переоткрывали: базовый класс (одно пространство имён на семью) и контраст подписи у
тона `indeterminate` (плёнка снята совсем — см. ниже).

## Плёнки у тона `indeterminate` нет

В макете у него есть узел `overlay` — `surface/bright` при `opacity/50` поверх
подписи. Владелец снял его 01.09.2026: плёнка была вторым декоративным признаком
того же тона поверх цветового, а группа `variation/indeterminate/*` несёт свои
`bg`, `border` и `color` во всех четырёх состояниях. Решение согласуется с
принятым 31.08.2026, когда у `indeterminate` сняли штрих («отличается цветом, проп
снять»).

Заодно снят дефект доступности: под плёнкой контраст подписи был ≈1,98:1, без неё
считается по собственной ячейке — **4,74:1** в rest, focus и active и **5,94:1** в
hover, то есть AA проходит везде.

**Макет расходится с кодом по структуре**: пятнадцать узлов `overlay` в Figma
остаются до отдельной правки (реестр расхождений, Р-18). Плёнку по макету не
возвращать — макет отстал от решения.
