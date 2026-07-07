# Content Area — Illustration

Медиа-область с SVG-иллюстрацией, вписанной по центру (contain) на прозрачном фоне. Артворк перекрашивается через классы-слои `awds-ill-a…f`.

**Figma:** [var=illustration](https://www.figma.com/design/UCYhMA1JeNUNuVGsxUEne7/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B9-Elemets?node-id=2221-60)

## HTML

```html
<div class="content-area content-area--illustration content-area--16-9">
  <svg class="content-area__illustration" viewBox="0 0 267 207" xmlns="http://www.w3.org/2000/svg">
    <!-- пути сгруппированы по слою-цвету -->
    <g class="awds-ill-c"><path d="…"/></g>   <!-- светлый fill -->
    <g class="awds-ill-b"><path d="…"/></g>   <!-- брендовый акцент -->
    <g class="awds-ill-a"><path d="…"/></g>   <!-- тёмный ink -->
  </svg>
</div>
```

Иллюстрация может быть и `<img class="content-area__illustration" src="….svg">` — тогда она вписывается через `object-fit: contain`, но **перекраска классами недоступна** (только для инлайн-SVG).

## Перекраска (`awds-ill-a…f`)

Пять слоёв-классов вешаются на пути / группы SVG. Цвет каждого читается из CSS-переменной с DS-ролью по умолчанию:

| Класс | Переменная | Дефолт-роль | Из эталонного артворка |
|---|---|---|---|
| `awds-ill-a` | `--awds-ill-a` | `--primary-container-on-highest` | тёмный ink `#19110A` |
| `awds-ill-b` | `--awds-ill-b` | `--primary-core` | бренд `#FAD646` |
| `awds-ill-c` | `--awds-ill-c` | `--primary-container-core` | светлый fill `#FFFAE7` |
| `awds-ill-d` | `--awds-ill-d` | `--primary-dim` | — (fallback) |
| `awds-ill-f` | `--awds-ill-f` | `--primary-container-on-low` | — (fallback) |

Колорпикер потребителя задаёт цвет инлайн — он побеждает дефолт:

```html
<div class="content-area content-area--illustration content-area--16-9"
     style="--awds-ill-b: #FF5A00; --awds-ill-a: #101828;">
  <svg class="content-area__illustration" viewBox="0 0 267 207">…</svg>
</div>
```

Без инлайн-переопределения иллюстрация рисуется в брендовых ролях сайта и корректно перетекает между сайтами/темами.

## Правила

- **`preserveAspectRatio`** инлайн-SVG держите дефолтным (`xMidYMid meet`) — **не `none`**, иначе артворк растянется под соотношение бокса. Экспорт из Figma ставит `none` — уберите атрибут.
- Классы `awds-ill-*` вешаются на элементы **внутри** SVG (`<g>` / `<path>`), задают `fill`. Обводки (`stroke`) в артворке не используются; если нужны — добавьте `stroke: var(--awds-ill-*)` руками.
- Фон варианта прозрачный, рамки нет (в отличие от `img` / `video`).

## CSS

Полный CSS — [content-area.css](content-area.css), секции `Base`, `Variant: illustration`.
