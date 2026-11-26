---
name: awds-component-accordion
description: Accordion ArrowDS (.accordion).
---

# Accordion ArrowDS

Раскрывающийся пункт «вопрос — ответ»: FAQ, справка, условия доставки, колонки ссылок
подвала на телефоне. Собран на нативных `<details>`/`<summary>` и работает без скрипта.
Цвета, отступы и шрифт берутся из токенов DS, ничего не хардкодится. Общая картина
токенов — `arrow-design-system`, регенерация из Figma — `arrow-components-builder`.

**Пункт, а не список.** Компонент — один `<details>`. Стопку пунктов, зазор между
боксами и заголовок секции собирает потребитель (блок `awds-faq`).

## Оси

| Ось | Значения | Как выражается |
| --- | --- | --- |
| раскрытость | `collapsed` · `expanded` | нативный атрибут `open` на `<details>` |
| `view` | `outline` · `divider` · `raised` | класс вида `.accordion-outline` / `-divider` / `-raised` |
| `heading` | `h3` · `h4` · `h5` · `h6` · `body` | класс `.accordion--h4` и т. п.; без класса — h4 |
| `state` | `rest` · `hover` · `focus` · `active` | псевдоклассы на `summary`, красится весь пункт |

**Раскрытость — вариант темы, но атрибут в коде.** Группа State называет варианты
`accordion/collapsed` и `accordion/expanded`, в макете это два набора. В коде вариант
переключает пользователь кликом, поэтому он выражен атрибутом `open`, который ставит
сам браузер. Класс пришлось бы переключать скриптом, а `script.js` блока на витрине
может не отработать.

**Размера нет, есть уровень заголовка.** Вопрос набирается ролью WYSIWYG, как
заголовок секции в `heading`: роль сама масштабируется модами `.typo-*` и брейкпоинтом.
Отступы, зазор до шеврона и скругление идут за уровнем.

| `heading` | padding-block | padding-inline (outline) | зазор | скругление |
| --- | --- | --- | --- | --- |
| h3 | `space-7` | `space-8` | `space-3` | `rounded-600` |
| h4 | `space-6` | `space-8` | `space-3` | `rounded-600` |
| h5 | `space-5` | `space-6` | `space-2` | `rounded-500` |
| h6 | `space-4` | `space-5` | `space-2` | `rounded-500` |
| body | `space-3` | `space-4` | `space-1-5` | `rounded-400` |

У `divider` боковых отступов и скругления нет: строка встаёт вровень с текстом вокруг,
линия только снизу.

`raised` — для цветной подложки (FAQ `dark`, `faded`, `gradient`, `rich`): геометрия как
у `outline`, контура нет, фон — тон `raised` группы `surface` (`surface-bright`), тень
`elevation-1`. На наведении фон берёт ту же ячейку `bg-hover`, что и остальные виды.

## Разметка

```html
<details class="accordion accordion-outline accordion--h4">
  <summary class="accordion__summary">
    <span class="accordion__title">Сколько идёт доставка из-за рубежа?</span>
    <span class="accordion__chevron" aria-hidden="true"></span>
  </summary>
  <div class="accordion__answer">
    Обычно от 7 до 14 дней: срок зависит от страны отправки и таможни.
  </div>
</details>
```

| Узел | Обязателен | Зачем |
| --- | --- | --- |
| `<details class="accordion …">` | да | раскрытие, клавиатура и `aria-expanded` без скрипта |
| `<summary class="accordion__summary">` | да, первым ребёнком | кликабельная строка, роль кнопки |
| `.accordion__title` | да | вопрос; тегом может быть `h2`–`h6`, если пункт нужен в оглавлении документа |
| `<span class="accordion__chevron" aria-hidden="true">` | да | шеврон маской, скринридеру не нужен |
| `<div class="accordion__answer">` | да | ответ; внутри можно абзацы и списки |

- `open` — пункт раскрыт при загрузке.
- `name="faq"` — одинаковый у пунктов группы: открыт только один (Baseline 2024).

Подключение: `references/accordion.css` и слой кольца фокуса
`awds-component-focus-selection/references/focus-selection.css`.

## Состояния

Наведение, фокус и нажатие считаются по строке вопроса (`summary`), а красят весь пункт
через `:has()`: в макете фон наведения и кольцо фокуса лежат на всём боксе. Наведение на
текст ответа пункт не подсвечивает. Hover — под гейтом `(hover: hover) and (pointer: fine)`.

Цвета по ячейкам — в `references/accordion-collapsed.md` и
`references/accordion-expanded.md`, полная таблица — в шапке `accordion.css`.

Кольцо фокуса — слой `awds-component-focus-selection`, вариант offset=inside ·
tone=accent; радиус кольца повторяет скругление пункта.

## Раскрытие

Мгновенное везде, плавное там, где есть `::details-content` и `interpolate-size`
(Chrome 131+). Это прогрессивное улучшение: без него теряется только анимация.
`prefers-reduced-motion: reduce` гасит движение, шеврон переворачивается сразу.

## Чего здесь нет

- **Скрипта.** Ни для раскрытия, ни для «одного открытого» — это `<details name>`.
- **Классов `.accordion-collapsed` / `.accordion-expanded`.** Раскрытость — атрибут `open`.
- **Состояния `disabled`.** Ячеек гашения в группе нет, выключенный пункт «вопрос —
  ответ» не встречается ни у одного потребителя.
- **Иконки плюс-минус.** Решение владельца 26.11.2026: шеврон, как в ячейках State.

## Figma

Файл «💠 arrow ↪ components», страница «5 · lists», секция «↪ accordion» (`5:42`):
наборы `accordion / collapsed` (`1470:155749`) и `accordion / expanded` (`1470:156090`),
оси `view` × `heading` × `state`, текстовые свойства `title` и `description`.
