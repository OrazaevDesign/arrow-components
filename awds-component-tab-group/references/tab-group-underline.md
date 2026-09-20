# Tab Group — underline

Панель вкладок с подчёркиванием: инстансы `tab`, зазор панели, никакого
контейнерного оформления.

**Figma:** [tab-group / underline](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=8-43315) — набор `8:43315` секции «↪ tab-group» (`5:44`), файл «💠 arrow ↪ components», страница «6 · tabs».

**CSS:** `references/tab-group-underline.css`. Рядом обязателен `tab.css` из
`awds-component-tab`, а при счётчиках — `notice.css`.

## HTML

```html
<div class="tab-group tab-group-underline tab-group--400">
  <div class="tab-group__track scrollbar scrollbar-transparent"
       role="tablist" aria-label="Разделы товара">

    <button type="button" class="tab tab-selected" role="tab"
            id="tab-descr" aria-controls="panel-descr" aria-selected="true" tabindex="0">
      Описание
    </button>

    <button type="button" class="tab tab-unselected" role="tab"
            id="tab-specs" aria-controls="panel-specs" aria-selected="false" tabindex="-1">
      Характеристики
      <span class="notice notice-accent">12</span>
    </button>

    <button type="button" class="tab tab-unselected" role="tab"
            id="tab-ship" aria-controls="panel-ship" aria-selected="false" tabindex="-1" disabled>
      Доставка
    </button>
  </div>
</div>
```

**`.tab--400` на вкладках писать не нужно** — ступень раздаёт мост
`.tab-group--{N} .tab`, а вторым звеном `.tab-group--{N} .tab .notice` — ступень
счётчику. Второе звено обязательно: мост самой вкладки (`.tab--{N} .notice`) не
срабатывает, потому что класса `.tab--{N}` в разметке нет.

## Значения

| Что | Ступень 400 | Ступень 300 | Откуда |
| --- | --- | --- | --- |
| зазор панели | 20 | 16 | `--awds-size-tabs-{N}-gap-panel` |
| высота ряда | 40 | 36 | вкладка, ступень приходит мостом |
| кегль вкладки | 14 | 14 | `rectangle/{N}/typography` → одна ячейка |
| кегль счётчика | 13 | 12 | `notice/{N}/typography`, вторым звеном моста |
| габарит счётчика | 20 | 20 | `notice/{N}/size` — обе на `space/5` |

`size/tabs/{ступень}/gap-panel` используется в библиотеке **только здесь** — это
её единственный потребитель.

## Чего здесь нет

- **Разделительной линии под панелью.** В макете её нет; линия под всей полосой —
  решение блока, а не компонента.
- **Своих вкладок.** Вкладка — инстанс `tab`; выбранность выражена классом
  варианта вкладки, а не классом группы.
