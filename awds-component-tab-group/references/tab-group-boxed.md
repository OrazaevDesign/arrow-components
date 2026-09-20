# Tab Group — boxed

Панель вкладок в плашке: утопленный контейнер, внутри кнопки встык, выбранная —
приподнятая светлая. То, что в интерфейсах называют сегментированным контролом.

**Figma:** [tab-group / boxed](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=8-43289) — набор `8:43289` секции «↪ tab-group» (`5:44`), файл «💠 arrow ↪ components», страница «6 · tabs».

**CSS:** `references/tab-group-boxed.css` (самодостаточный: база, ступени, плашка, мост).
Рядом обязательны `button-clean.css` и `button-ghost.css` из `awds-component-button`.

## HTML

```html
<div class="tab-group tab-group-boxed tab-group--400">
  <div class="tab-group__track scrollbar scrollbar-transparent"
       role="tablist" aria-label="Разделы товара">

    <button type="button" class="btn btn-clean" role="tab"
            id="tab-descr" aria-controls="panel-descr" aria-selected="true" tabindex="0">
      Описание
    </button>

    <button type="button" class="btn btn-ghost" role="tab"
            id="tab-specs" aria-controls="panel-specs" aria-selected="false" tabindex="-1">
      Характеристики
    </button>

    <button type="button" class="btn btn-ghost" role="tab"
            id="tab-reviews" aria-controls="panel-reviews" aria-selected="false" tabindex="-1">
      Отзывы
    </button>
  </div>
</div>

<div id="panel-descr" role="tabpanel" aria-labelledby="tab-descr" tabindex="0">…</div>
<div id="panel-specs" role="tabpanel" aria-labelledby="tab-specs" tabindex="0" hidden>…</div>
<div id="panel-reviews" role="tabpanel" aria-labelledby="tab-reviews" tabindex="0" hidden>…</div>
```

Ступень 300 — `tab-group--300`; тон кнопок и всё остальное не меняется.

**`.btn--400` на кнопках писать не нужно** — ступень раздаёт мост
`.tab-group--{N} .btn`. Он весит `(0,2,0)` против `(0,1,0)` у `.btn--{N}`, поэтому
внутри группы ступень диктует группа, даже если написать класс кнопки руками.

## Значения

| Что | Ступень 400 | Ступень 300 | Откуда |
| --- | --- | --- | --- |
| внутренний отступ плашки | 2 | 2 | `--awds-space-0-5` (в макете `space/0,5`) |
| радиус плашки | 10 | 8 | `--awds-rounded-border-radius-600` / `-400` |
| радиус кнопки | 8 | 6 | `rectangle/{N}/rounded` — приходит мостом |
| высота плашки | 44 | 40 | ряд + 2×2 |
| зазор между кнопками | 0 | 0 | кнопки встык |
| фон плашки | градиент `surface/dim` → `surface/surface` сверху вниз |  | роли |
| обводка плашки | 1 px `surface/dim`, inside | | `own_values` |
| приподнятость выбранной | `--awds-shadow-elevation-1` | | слой производных |

**Радиус концентричен:** 10 = 8 + 2, 8 = 6 + 2. Но в CSS он не считается
арифметикой — в макете привязаны конкретные ступени шкалы `border-radius`, и в
режиме `None` они дают 0, тогда как `calc(0 + 2px)` дал бы скругление там, где
дизайнер его снял.

## Чего здесь нет

- **Своих кнопок.** Вкладка — инстанс `button`; тон `clean` для выбранной,
  `ghost` для остальных. Пересобирать кнопку внутри группы значило бы держать
  вторую копию её геометрии и цветов.
- **Класса выбранности у группы.** Выбранность живёт на конкретной кнопке
  (`btn-clean` + `aria-selected="true"`), а не на контейнере: контейнер не знает,
  которая из вкладок открыта.
- **`overflow: hidden` на плашке.** Обрезает дорожка, а не плашка: иначе кольцо
  фокуса срезалось бы по краю плашки.
