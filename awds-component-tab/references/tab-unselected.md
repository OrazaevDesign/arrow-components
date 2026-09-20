# Tab — unselected

Вкладка закрытого раздела: подчёркивания в покое нет, оно проявляется на наведении
приглушённым тоном. Текст на ступень тише выбранного.

**Figma:** [470rar5EfRm4n14vHMXbpc → набор 8:42820](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=8-42820) — секция «↪ tab» (`5:43`) файла «💠 arrow ↪ components», страница «6 · tabs».

**CSS:** `references/tab.css` (общий на оба варианта).

## HTML

```html
<button type="button" class="tab tab-unselected tab--400" role="tab" aria-selected="false">
  Характеристики
</button>
```

Со счётчиком:

```html
<button type="button" class="tab tab-unselected tab--400" role="tab" aria-selected="false">
  Характеристики
  <span class="notice notice-accent">3</span>
</button>
```

Выключенная:

```html
<button type="button" class="tab tab-unselected tab--400" role="tab" aria-selected="false" disabled>
  Доставка
</button>
```

Атрибут `disabled` обязателен: класс и `pointer-events: none` гасят мышь, но не
клавиатуру — без атрибута вкладка активируется с `Enter`.

## Состояния

| Состояние | фон | подчёркивание | текст |
| --- | --- | --- | --- |
| rest | `tab/unselected/bg-rest` (transparent) | `tab/unselected/border-rest` (transparent) | `tab/unselected/color-rest` → `surface-on-high` |
| hover | transparent | `surface-on-low` | `surface-on-highest` |
| focus | transparent | `surface-dim` | `surface-on-high` |
| active | transparent | `surface-dim` | `surface-on-high` |
| disabled | те же, что rest | те же | те же, поверх `state/opacity/control-disabled` |

Подчёркивание в покое прозрачно, а не отсутствует: место под него занято всегда
(`box-shadow` не влияет на раскладку), поэтому появление линии на наведении не
двигает ни текст, ни соседние вкладки.

Кольцо фокуса — слой `awds-component-focus-selection`, вариант radius=none ·
offset=outside · tone=default.
