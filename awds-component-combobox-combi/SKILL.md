---
name: awds-component-combobox-combi
description: Combobox Combi ArrowDS (.cbcombi).
---

# Combobox Combi ArrowDS

Поле с подсказками при вводе, метка внутри рамки: человек печатает — под полем открывается список совпадений из базы (город, адрес, бренд), выбирает строку. Первое применение — выбор города в шапке и в чекауте. Размеры, цвета и типографика — из токенов DS, ничего не хардкодится.

Это **композит**, а не новое поле: поле — [`awds-component-input-combi`](../awds-component-input-combi/SKILL.md), строки — [`awds-component-list-item`](../awds-component-list-item/SKILL.md) вариант `transparent`, загрузка — [`awds-component-progress`](../awds-component-progress/SKILL.md) кольцом. Компонент добавляет обёртку, панель и мосты ступени.

## Разметка

```html
<div class="cbcombi cbcombi--500">
  <span class="icombi icombi-default">
    <span class="icombi__body">
      <input class="icombi__field" id="city" type="text" placeholder=" " autocomplete="off"
             role="combobox" aria-autocomplete="list" aria-controls="city-list"
             aria-expanded="true" aria-activedescendant="city-opt-0">
      <label class="icombi__label" for="city">Город или населенный пункт</label>
    </span>
  </span>

  <div class="cbcombi__panel">
    <ul class="cbcombi__list" id="city-list" role="listbox" aria-label="Города">
      <li class="list-item list-item-transparent" role="option" id="city-opt-0" aria-selected="true">
        <span class="list-item__content">
          <span class="list-item__title"><mark class="cbcombi__match">Крас</mark>ногорск</span>
          <span class="list-item__description">Московская область</span>
        </span>
      </li>
      <!-- … -->
    </ul>
  </div>
</div>
```

Вместо `<ul>` в панели бывает одно из двух состояний:

```html
<!-- ничего не нашлось -->
<div class="list-item list-item-transparent cbcombi__empty" role="status">
  <span class="list-item__content">
    <span class="list-item__title">Ничего не нашлось</span>
    <span class="list-item__description">Проверьте название или введите ближайший город</span>
  </span>
</div>

<!-- идёт запрос -->
<div class="cbcombi__loading" role="status">
  <svg class="progress progress-circular progress--indeterminate" viewBox="0 0 48 48"
       role="progressbar" aria-label="Ищем города">
    <circle class="progress-circular__arc" cx="24" cy="24" r="23" pathLength="100"/>
  </svg>
</div>
```

Подключить рядом: `input-combi-default.css` (или другой тон поля), `list-item-transparent.css`, `progress-circular.css`, `focus-selection.css`, потом `combobox-combi-default.css`.

## Что делает компонент, а что — JS потребителя

| Компонент (CSS) | JS потребителя |
|---|---|
| панель под полем, ширина по полю, поверх соседей | запрос подсказок к базе по вводу, задержка между нажатиями |
| **показ панели по `aria-expanded="true"` у поля** | ставит `aria-expanded` — `true`, когда есть что показать или идёт запрос; `false` на Esc, выбор и уход фокуса |
| подсветка строки с `aria-selected="true"` — как под мышью | стрелки двигают `aria-selected` и `aria-activedescendant` у поля |
| полужирное совпадение в `<mark class="cbcombi__match">` | оборачивает совпавшую часть названия в `<mark>` |
| вид «ничего не нашлось» и загрузки | решает, что показать: список, пусто или загрузку |
| ступень поля, панели и строк от одного `.cbcombi--{N}` | Enter и клик по строке кладут значение в поле и сохраняют выбор |

Живой пример этого поведения на статичном списке — [references/preview.html](references/preview.html), блок «Живой пример».

**Показ висит на `aria-expanded`, а не на классе.** Атрибут JS обязан ставить для чтения с экрана в любом случае — стиль на нём не даёт разойтись виду и тому, что услышит незрячий: открытая глазу панель всегда объявлена открытой.

## Ступени

Мост от `.cbcombi--{N}` раздаёт ступень всем трём частям — классы размера на вложенных не ставятся и не действуют.

| Класс | Поле | Панель | Строки |
|---|---|---|---|
| `cbcombi--600` | `input-combi` 600 | `dropdown/600` | `list-item` 500 |
| `cbcombi--500` | 500 | `dropdown/500` | 400 |
| `cbcombi--400` (по умолчанию) | 400 | `dropdown/400` | 300 |
| `cbcombi--300` | 300 | `dropdown/300` | 200 |

Строки на ступень ниже поля — правило семейства, как пункт в попапе `select`. Блоки моста собраны из исходников `input-combi` и `list-item` вместе с якорями `#cell`, поэтому правка ячейки в студии доезжает сюда тем же `arrow-studio-sync`.

## Откуда берутся значения

| Что | Источник |
|---|---|
| Фон панели | `rgb(var(--surface-bright))` — ячейка `picker/bg`, как у попапа select |
| Поля и скругление панели | `dropdown/{N}/padding`, `dropdown/{N}/border-radius` |
| Тень панели | `var(--awds-shadow-elevation-3)` |
| Отступ панели от поля | `var(--awds-space-1)` |
| Слой наложения | `var(--awds-zindex-dropdown)` |
| Подсветка строки с клавиатуры | ячейки `list/transparent/*-hover` — те же, что у наведения |
| Совпадение | `var(--awds-font-weight-semibold)` |

## Строка подсказки: название и регион

Каждая строка несёт регион описанием (`list-item__description`): одноимённых населённых пунктов много — например, Троицк есть и в Москве, и в Челябинской области. Без региона человек выберет не тот, и цены с доставкой посчитаются не для него. Регион приходит из базы вместе с названием. Совпадение с вводом выделяется только в названии.

## Доступность

- Поле — `role="combobox"`, `aria-autocomplete="list"`, `aria-controls` на `id` списка, `aria-expanded`, `aria-activedescendant` на `id` подсвеченной строки. Фокус остаётся в поле: по строкам двигается `aria-activedescendant`, а не фокус.
- Список — `role="listbox"` с `aria-label`; строка — `role="option"` с `aria-selected`.
- Пустая выдача и загрузка — `role="status"`: изменение услышат без перевода фокуса.
- `autocomplete="off"` у поля: иначе поверх наших подсказок откроется браузерная история ввода.
- Кольцо фокуса — у поля (`input-combi`); у панели и строк своего кольца нет.

## Соседние компоненты

- **[awds-component-select-combi](../awds-component-select-combi/SKILL.md)** — выбор из короткого известного списка, ввода нет. Больше двух десятков вариантов или список живёт в базе — этот компонент.
- **[awds-component-input-combi](../awds-component-input-combi/SKILL.md)** — поле без подсказок. Тоны поля (`error`, `success`…) ставятся классом на вложенном `.icombi` как обычно.
- **[awds-component-formfield](../awds-component-formfield/SKILL.md)** — пояснение и текст ошибки под полем. В макете `formfield-combi / input` принимает `combobox-combi` свапом `swap-{N}`.
