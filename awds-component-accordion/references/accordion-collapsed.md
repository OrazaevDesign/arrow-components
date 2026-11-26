# Accordion — collapsed

Свёрнутый пункт: видна только строка вопроса с шевроном вниз. Пункт в этом виде,
пока у `<details>` нет атрибута `open`.

**Figma:** [470rar5EfRm4n14vHMXbpc → набор 1470:155749](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=1470-155749) — секция «↪ accordion» (`5:42`) файла «💠 arrow ↪ components», страница «5 · lists».

**CSS:** `references/accordion.css` (общий на оба варианта).

## HTML

```html
<details class="accordion accordion-outline accordion--h4">
  <summary class="accordion__summary">
    <span class="accordion__title">Сколько идёт доставка из-за рубежа?</span>
    <span class="accordion__chevron" aria-hidden="true"></span>
  </summary>
  <div class="accordion__answer">Обычно от 7 до 14 дней.</div>
</details>
```

Строка с линией, уровень h6:

```html
<details class="accordion accordion-divider accordion--h6">
  <summary class="accordion__summary">
    <span class="accordion__title">Покупателям</span>
    <span class="accordion__chevron" aria-hidden="true"></span>
  </summary>
  <div class="accordion__answer">…</div>
</details>
```

## Состояния

| Состояние | фон | контур | вопрос | шеврон |
| --- | --- | --- | --- | --- |
| rest | `accordion/collapsed/bg-rest` → `extended-transparent` | `border-rest` → `surface-on-lowest` | `color-rest` → `surface-on-highest` | `chevron-rest` → `surface-on-high` |
| hover | `bg-hover` → `surface-surface` | `surface-on-lowest` | `surface-on-highest` | `surface-on-high` |
| focus | `extended-transparent` | `surface-on-lowest` | `surface-on-highest` | `surface-on-high` |
| active | `extended-transparent` | `surface-on-lowest` | `surface-on-highest` | `surface-on-high` |

У вида `raised` фон другой: в покое, фокусе и нажатии — `surface/raised/bg` → `surface-bright`, на наведении — та же ячейка `bg-hover`. Контура нет, вместо него тень `elevation-1`.

Ответ в свёрнутом пункте не виден, его цвет задаёт вариант expanded.
