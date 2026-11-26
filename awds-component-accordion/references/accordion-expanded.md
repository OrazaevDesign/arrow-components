# Accordion — expanded

Раскрытый пункт: под вопросом виден ответ, шеврон развёрнут вверх, нижний отступ строки
вопроса сжат до зазора. Пункт в этом виде, когда у `<details>` стоит атрибут `open`.

**Figma:** [470rar5EfRm4n14vHMXbpc → набор 1470:156090](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=1470-156090) — секция «↪ accordion» (`5:42`) файла «💠 arrow ↪ components», страница «5 · lists».

**CSS:** `references/accordion.css` (общий на оба варианта).

## HTML

```html
<details class="accordion accordion-outline accordion--h4" open>
  <summary class="accordion__summary">
    <span class="accordion__title">Сколько идёт доставка из-за рубежа?</span>
    <span class="accordion__chevron" aria-hidden="true"></span>
  </summary>
  <div class="accordion__answer">
    <p>Обычно от 7 до 14 дней: срок зависит от страны отправки и таможни.</p>
  </div>
</details>
```

Группа, где открыт только один пункт:

```html
<details class="accordion accordion-outline accordion--h4" name="faq" open>…</details>
<details class="accordion accordion-outline accordion--h4" name="faq">…</details>
<details class="accordion accordion-outline accordion--h4" name="faq">…</details>
```

## Состояния

| Состояние | фон | контур | вопрос | шеврон | ответ |
| --- | --- | --- | --- | --- | --- |
| rest | `accordion/expanded/bg-rest` → `extended-transparent` | `border-rest` → `surface-on-lowest` | `color-rest` → `surface-on-highest` | `chevron-rest` → `surface-on-highest` | `description-rest` → `surface-on-high` |
| hover | `bg-hover` → `surface-surface` | `surface-on-lowest` | `surface-on-highest` | `surface-on-highest` | `surface-on-high` |
| focus | `extended-transparent` | `surface-on-lowest` | `surface-on-highest` | `surface-on-highest` | `surface-on-high` |
| active | `extended-transparent` | `surface-on-lowest` | `surface-on-highest` | `surface-on-highest` | `surface-on-high` |

У вида `raised` фон другой: в покое, фокусе и нажатии — `surface/raised/bg` → `surface-bright`, на наведении — та же ячейка `bg-hover`. Контура нет, вместо него тень `elevation-1`.

Ячейки `description-*` заведены 26.11.2026: до компонента ответ в `awds-faq` красился
ролью `surface-on-high` напрямую, без ячейки.
