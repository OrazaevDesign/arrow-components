# Modal — Sidepage (панель у края)

Панель во всю высоту, прижатая к краю экрана: фильтры, корзина, детали заказа. Скруглений нет — у края экрана их нечем показать. На телефоне (≤615) превращается в шторку снизу, как и диалог; на планшете остаётся панелью у края.

**Figma:** https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=637-48439 (набор `modal / sidepage`)

## HTML

```html
<dialog class="mdl mdl-sidepage" aria-labelledby="filters-title">
  <header class="mdl__header">
    <h2 class="mdl__title" id="filters-title">Фильтры</h2>
    <button class="btn btn-ghost btn--500 btn--icon-only mdl__close" type="button" aria-label="Закрыть">
      <svg viewBox="0 0 20 20" aria-hidden="true"></svg>
    </button>
  </header>
  <div class="mdl__content mdl__content--flush">
    <!-- список фильтров во всю ширину: отступы приносит он сам -->
  </div>
  <footer class="mdl__footer mdl__footer--reverse">
    <button class="btn btn-primary btn--500" type="button">Показать 240</button>
    <button class="btn btn-secondary btn--500" type="button">Сбросить</button>
  </footer>
</dialog>
```

## Сторона

Ось `side` (в макете `modal / sidepage`, `side=end|start`). По умолчанию панель у конца строки, справа (`side=end`, класса нет). Левая панель — модификатор `.mdl--side-start`:

```html
<dialog class="mdl mdl-sidepage mdl--side-start">…</dialog>
```

Скруглена грань, обращённая к странице: у правой панели — левые углы, у левой — правые. Стороны логические, поэтому при письме справа налево панель и скругление отражаются сами. До 1.12.0 левая панель задавалась инлайн-стилем `margin-inline: 0 auto` — так она встанет слева, но со скруглением не той грани: заменить на модификатор.

## Стили

| Свойство | Значение |
|---|---|
| Фон, подложка, тень | как у `mdl-dialog` |
| Скругление | внутренняя грань: `rounded-900` (20) на десктопе, `rounded-800` (16) на планшете (616–1023); углы у края экрана прямые (с 1.12.0). На телефоне (≤615) — шторка, верхние углы `rounded-800` при любой стороне |
| Высота | 100% экрана; на телефоне — по содержимому, но не выше `100% − 48px` |

## Состояния

Нет. Открыто или закрыто — атрибут `open` у `<dialog>`.
