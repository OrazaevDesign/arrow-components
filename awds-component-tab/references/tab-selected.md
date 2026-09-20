# Tab — selected

Открытая вкладка: подчёркивание акцентным цветом, текст самым контрастным тоном.
В группе таких ровно одна.

**Figma:** [470rar5EfRm4n14vHMXbpc → набор 8:42853](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=8-42853) — секция «↪ tab» (`5:43`) файла «💠 arrow ↪ components», страница «6 · tabs».

**CSS:** `references/tab.css` (общий на оба варианта).

## HTML

```html
<button type="button" class="tab tab-selected tab--400" role="tab" aria-selected="true">
  Отзывы
</button>
```

Со счётчиком:

```html
<button type="button" class="tab tab-selected tab--400" role="tab" aria-selected="true">
  Отзывы
  <span class="notice notice-accent">12</span>
</button>
```

Ступень 300:

```html
<button type="button" class="tab tab-selected tab--300" role="tab" aria-selected="true">
  Отзывы
</button>
```

## Состояния

| Состояние | фон | подчёркивание | текст |
| --- | --- | --- | --- |
| rest | `tab/selected/bg-rest` (transparent) | `tab/selected/border-rest` → `primary-core` | `tab/selected/color-rest` → `surface-on-highest` |
| hover | transparent | `primary-dim` | `surface-on-high` |
| focus | transparent | `primary-dim` | `surface-on-highest` |
| active | transparent | `primary-dim` | `surface-on-highest` |
| disabled | те же, что rest | те же | те же, поверх `state/opacity/control-disabled` |

Кольцо фокуса — слой `awds-component-focus-selection`, вариант radius=none ·
offset=outside · tone=default.

## Чего здесь нет

- **Класса `.tab--selected` на двух дефисах.** Выбранность взаимоисключающа: у
  вкладки не бывает «и выбрана, и не выбрана». Один дефис — правило 1 канона имён.
- **Оси `state=selected`.** Закрытый словарь состояний её не содержит; выбранность
  дизайн-система выражает именем варианта, за которым стоит группа ячеек темы.
