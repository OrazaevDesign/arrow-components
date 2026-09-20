# Tab Group — separated

Вкладки раздельными кнопками: плашки нет, кнопки стоят через зазор. Выбранная —
контрастная, остальные — вторичные.

**Figma:** [tab-group / separated](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=8-43302) — набор `8:43302` секции «↪ tab-group» (`5:44`), файл «💠 arrow ↪ components», страница «6 · tabs».

**CSS:** `references/tab-group-separated.css`. Рядом обязательны
`button-contrast.css` и `button-secondary.css` из `awds-component-button`.

## HTML

```html
<div class="tab-group tab-group-separated tab-group--400">
  <div class="tab-group__track scrollbar scrollbar-transparent"
       role="tablist" aria-label="Категории">

    <button type="button" class="btn btn-contrast" role="tab"
            id="tab-all" aria-controls="panel-all" aria-selected="true" tabindex="0">
      Все
    </button>

    <button type="button" class="btn btn-secondary" role="tab"
            id="tab-new" aria-controls="panel-new" aria-selected="false" tabindex="-1">
      Новинки
    </button>
  </div>
</div>
```

## Значения

| Что | Ступень 400 | Ступень 300 | Откуда |
| --- | --- | --- | --- |
| зазор | 8 | 6 | `--awds-size-tabs-{N}-gap-button` |
| высота ряда | 40 | 36 | кнопка, ступень приходит мостом |
| фон, обводка, радиус группы | нет | нет | у ячеек набора ни заливки, ни обводки |

**Зазор берётся из `gap-button`, а не из `gap`.** Описание набора называет численно
равной ячейку `tabs/{ступень}/gap` — это неверно: в теме `tabs/400/gap` и
`tabs/300/gap` обе дают 6 px. Ровно 8 и 6 даёт `gap-button`, и имя у неё про то же —
зазор между кнопками группы. **16.09.2026 макет догнал код:** обе ячейки набора
перепривязаны со шкалы `space` напрямую (`space/2`, `space/1,5`) на
`size/tabs/{ступень}/gap-button`; значения не изменились — 8 и 6.

## Чего здесь нет

- **Обводки и фона у контейнера.** Их нет и в макете: `separated` — это ряд
  кнопок, а не панель.
- **Своих кнопок.** Тон `contrast` / `secondary` — из группы State `button`.
