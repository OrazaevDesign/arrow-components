---
name: awds-component-input
description: >
  Верстка текстовых полей ввода ArrowDS — HTML-разметка и CSS на токенах дизайн-системы.
  Используй ВСЕГДА при: добавлении поля ввода в форму, фильтры, поиск или PageCraft-блок
  (email, телефон, промокод, поисковая строка, адрес, имя), поле с иконкой слева или справа
  (поиск, очистить, показать пароль), выборе размера поля (высота 20/24/32/36/40/48/52px),
  вопросах о стилях input / input__field / input__prefix / input__suffix / form-control,
  выборе варианта поля (default, light, success, error, autofill, ghost, secondary),
  подсветке валидации поля (успех / ошибка) и пометке автозаполнения,
  получении Figma-ссылки на компонент Input. Построен на нативном <input> внутри
  контейнера-рамки; состояния Rest / Hover / Focus / Active / Disabled идут от самого поля.
  Для чекбокса — awds-component-checkbox, для радиокнопки — awds-component-radio,
  для тумблера — awds-component-switch, не этот скилл.
---

# Input ArrowDS

Текстовое поле: нативный `<input>` внутри контейнера-рамки — размеры, цвета и типографика берутся из токенов DS, ничего не хардкодится. См. скилл `arrow-design-system` для общей картины токенов и `arrow-components-builder` для регенерации этого скилла из Figma.

## Разметка

```html
<label for="email">Электронная почта</label>
<span class="input input-default input--400">
  <input class="input__field" id="email" type="email" placeholder="you@example.com">
</span>
```

Подпись — **снаружи** компонента: `<label for>` должен ссылаться на настоящее поле, а в макете подписи нет. Оборачивать контейнер в `<label>` не нужно — клик по рамке и так ставит курсор в поле.

Варианты с иконками, несколькими иконками в слоте и выключенным полем — в [references/input-default.md](references/input-default.md).

## Откуда берутся значения

| Что | Источник | Где живёт |
|---|---|---|
| Цвета состояний (bg/chroma/border/текст/placeholder/иконка) | `rgb(var(--secondary-container-*))`, `rgb(var(--primary-container-*))`, `rgb(var(--surface-bright))` inline | `references/input-{вариант}.css` |
| Фокус-кольцо | `rgb(var(--primary-core) / var(--awds-opacity-50))` | Figma `focus-selection/outlineVariant` + `opacity/50` |
| Геометрия (padding/icon/rounded) | `var(--awds-rectangle-{N}-*)` | `component-token-map.json` → `map.size.rectangle` |
| Горизонтальный отступ текста | `var(--awds-rectangle-{N}-text-gap)`, а со слотом — `padding` | Figma: проп `Padding Icon` у `Content Input` |
| Типографика | `var(--awds-rectangle-{N}-typography-*)` → `control-{M}` | там же |
| Opacity для disabled | `var(--awds-opacity-40)` | css-global (базовая шкала) |
| Базовая палитра | RGB-триплеты ролей `--{role}` | `css-variables.css` сайта |

**Промежуточный слой `--awds-input-*` в DS НЕ существует.** Внутри CSS вариантов есть приватные `--awds-input-*` accumulators, но они scope'нуты только на компонент. Подробнее — [arrow-components-builder/references/component-skill-contract.md](../arrow-components-builder/references/component-skill-contract.md).

## Размерные модификаторы

| Класс | Высота | Шрифт | Когда |
|---|---|---|---|
| `input--50` | 20px | 12/16 | Инлайн-правка в плотной таблице |
| `input--100` | 24px | 13/16 | Компактные фильтры |
| `input--200` | 32px | 13/16 | Панели, боковые фильтры |
| `input--300` | 36px | 14/20 | Плотные формы |
| `input--400` | 40px | 14/20 | **По умолчанию** — обычные формы |
| `input--500` | 48px | 16/20 | Поиск, ключевые поля |
| `input--600` | 52px | 16/20 | Тач-интерфейсы, крупные формы |

Высота не задаётся явно — она равна `2 × padding + line-height` и совпадает со слотами и без них (на каждом размере иконка равна line-height). Ширина — `100%`; 320px в макете это ширина демо-фрейма, а не свойство компонента.

## Пять вещей, которые легко сделать неправильно

1. **Padding — на слотах, а не на контейнере.** Так в auto-layout макета: «край → иконка» даёт padding слота, «иконка → текст» — padding поля. Перенесёшь padding на контейнер — при иконке зазор удвоится.
2. **Горизонтальный отступ текста — `text-gap`, если с этой стороны нет иконки.** Не тот же `padding`: у голого текста от края до буквы должно быть больше воздуха, чем от иконки до буквы. `text-gap` шире — 18/18/16/14/14/10/8 против `padding` 16/14/10/8/8/4/2. Переключается **по стороне** (`:has(> .input__prefix)` / `:has(> .input__suffix)`), потому что поле с одной иконкой — самый частый случай. Вертикаль всегда `padding`, высота не меняется.
3. **Типографика — шкала `control`, не `typography`.** Figma даёт `font-size/600 = 16` при `line-height/600 = 20`; у `typography-600` line-height 26. В CSS взят `var(--awds-rectangle-{N}-typography-*)`, который в DS уже маршрутизирован на нужный `control-{M}`.
4. **Фокус-кольцо у input своё.** Брендовое `primary-core` при 50% прозрачности, а не тёмное `surface-on-highest` как у button / checkbox / radio / switch. Не копируй кольцо из соседнего компонента.
5. **Фокус гасит hover через `:not(:focus-within)`, а не порядком правил.** `:has()` в hover-селекторе поднимает специфичность выше, чем у `:focus-within`, — без `:not()` наведение на сфокусированное поле подменяло бы брендовую рамку серой.

## Доступность

- Поле остаётся нативным: клавиатура, автозаполнение, типы (`email`, `tel`, `search`), отправка формы работают сами.
- Подпись обязательна: `<label for>` снаружи либо `aria-label` на самом `<input>`. Placeholder подписью не считается — он исчезает при вводе.
- Фокус виден при любом способе входа в поле (`:focus-within`), кольцо стоит вплотную к рамке.
- Декоративная иконка в слоте → `aria-hidden="true"`. Кликабельная (очистить, показать пароль) → внутри слота настоящий `<button type="button" aria-label="…">`, без `aria-hidden`.
- Disabled гасится `opacity: var(--awds-opacity-40)` на всей обёртке — макетное поведение, контраст в этом состоянии заведомо ниже AA. Рядом нужен текст-причина, а не только серость.
- Размеры 50 и 100 (высота 20 и 24px) меньше тач-минимума — только для мыши и плотных таблиц.

## Варианты

Выбор варианта — от **фона, на котором стоит поле**, а не от важности поля:

| Вариант | Класс | Фон в покое | Когда |
|---|---|---|---|
| **default** | `.input-default` | `secondary-container-core` — серый | Поле на белой странице |
| **light** | `.input-light` | `surface-bright` — белый | Поле на сером блоке: карточка, панель фильтров, модалка |
| **success** | `.input-success` | `success-container-core` — зелёный | Значение прошло валидацию |
| **error** | `.input-error` | `error-container-core` — красный | Значение не прошло валидацию |
| **autofill** | `.input-autofill` | `tertiary-container-core` — синий | Значение подставил браузер, а не пользователь |
| **ghost** | `.input-ghost` | прозрачный | Границу задаёт окружение: ячейка таблицы, инлайн-правка |
| **secondary** | `.input-secondary` | `secondary-core`, рамка в цвет фона | Второстепенное поле: фильтр, служебный ввод |

**success / error / autofill — это состояния значения**, а не виды контрола: класс вешается и снимается по ходу валидации. У `error` цвета мало — нужны `aria-invalid` и текст причины (см. [input-error.md](references/input-error.md)).

**Два варианта ведут себя не как все**, и это сверено по ячейкам макета:

- **ghost** — на hover **ничего не подсвечивается** (в макете rest / hover / active одинаково прозрачны), поэтому правило hover в CSS отсутствует намеренно. Не годится как единственное поле формы: не видно, куда писать.
- **secondary** — hover меняет **фон**, а не рамку (рамка в цвет фона), и кольцо фокуса **тёмное** `surface-on-highest` без альфы, а не брендовое при 50% как у остальных шести.

У остальных пяти вариантов при фокусе подсветка (зелёная / красная / синяя / серая) **полностью уступает брендовой** — фокус важнее статуса значения.

Цвета живут на классе варианта, база `.input` бесцветна (как `.btn` / `.btn-primary` у кнопки), поэтому класс варианта обязателен: `class="input input-default input--400"`.

## CSS-файлы

| Вариант | Файл | Reference |
|---|---|---|
| default | `references/input-default.css` | [input-default.md](references/input-default.md) |
| light | `references/input-light.css` | [input-light.md](references/input-light.md) |
| success | `references/input-success.css` | [input-success.md](references/input-success.md) |
| error | `references/input-error.css` | [input-error.md](references/input-error.md) |
| autofill | `references/input-autofill.css` | [input-autofill.md](references/input-autofill.md) |
| ghost | `references/input-ghost.css` | [input-ghost.md](references/input-ghost.md) |
| secondary | `references/input-secondary.css` | [input-secondary.md](references/input-secondary.md) |

Каждый файл **самодостаточен**: содержит базу `.input` (побайтово одинаковую) + 7 размеров + свой блок варианта + reduced-motion. Подключается только нужный вариант; если нужны оба — оба файла, дублирующаяся база безвредна.

## Storybook

Открой [references/preview.html](references/preview.html) локально (`file://`) — матрица размеров × состояний, переключатели варианта, слотов (в т.ч. «две иконки, как в макете»), содержимого, темы и мода скругления, оба варианта рядом на серой подложке и живая форма с рабочим фокусом.

## Refresh

При изменении токенов в Figma:

```
обнови awds-component-input под Figma
```

ACB зайдёт в Figma по сохранённым ссылкам обоих вариантов (см. `component.meta.json`), вытащит актуальные variable_defs, сравнит со снапшотом, покажет diff и обновит CSS + preview. Документация (этот файл и все `input-{вариант}.md`) — не трогается.

## Алгоритм использования

1. Возьми разметку из [references/input-default.md](references/input-default.md) и заведи подпись через `<label for>`.
2. Подключи CSS нужного варианта (`input-{вариант}.css`) — один раз глобально.
3. Убедись, что на странице есть DS-токены (`--awds-rectangle-*`, `--awds-opacity-*`, `--awds-font-*`) и сайтовый `css-variables.css` с цветовыми ролями под классом `.theme-default.theme-light` на `<html>`.
4. Поставь класс варианта (`input-default`, `input-error`, …) — без него поле останется бесцветным, — размерный модификатор `.input--{N}` (если не указан, действует 400) и правильный `type`.
5. Ширину задай контейнеру-родителю: поле тянется на 100%.

## Соседние компоненты

- **[awds-component-input-combi](../awds-component-input-combi/SKILL.md)** — то же поле, но подпись живёт **внутри** рамки и уезжает наверх при вводе. Отдельный компонент Figma, а не вариант этого: своя разметка (метка в обёртке `__body`), четыре размера вместо семи и своя ось `combi`-токенов. Палитра общая, поэтому цвета совпадают — но смешивать два способа подписи в одной форме не стоит.
- **`Input Inline / *`** — в Figma ещё один **отдельный** компонент семейства, а не вариант этого. Сюда не входит; понадобится — заводится своим скиллом.
- **[awds-component-checkbox](../awds-component-checkbox/SKILL.md)**, **[awds-component-radio](../awds-component-radio/SKILL.md)**, **[awds-component-switch](../awds-component-switch/SKILL.md)** — остальные контролы форм. Они на shape `square` и палитре `check-radio/*`; input — на `rectangle` и `form-control/*`.
- **[awds-component-button](../awds-component-button/SKILL.md)** — тот же shape `rectangle`, поэтому кнопка рядом с полем одного размера совпадает по высоте и скруглению.
