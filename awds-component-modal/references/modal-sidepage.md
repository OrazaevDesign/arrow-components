# Modal — Sidepage (панель у края)

Панель во всю высоту, прижатая к краю экрана: фильтры, корзина, детали заказа. Скруглений нет — у края экрана их нечем показать. Ниже 1068px превращается в шторку снизу, как и диалог.

**Figma:** https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=637-48439 (набор `modal / sidepage`)

## HTML

```html
<dialog class="mdl mdl-sidepage" aria-labelledby="filters-title">
  <header class="mdl__header">
    <h2 class="mdl__title" id="filters-title">Фильтры</h2>
    <button class="btn btn-ghost btn--200 mdl__close" type="button" aria-label="Закрыть">
      <svg viewBox="0 0 20 20" aria-hidden="true"></svg>
    </button>
  </header>
  <div class="mdl__content mdl__content--flush">
    <!-- список фильтров во всю ширину: отступы приносит он сам -->
  </div>
  <footer class="mdl__footer mdl__footer--reverse">
    <button class="btn btn-primary btn--300" type="button">Показать 240</button>
    <button class="btn btn-secondary btn--300" type="button">Сбросить</button>
  </footer>
</dialog>
```

## Сторона

По умолчанию панель у правого края (`margin-inline: auto 0`). Левая задаётся потребителем:

```html
<dialog class="mdl mdl-sidepage" style="margin-inline: 0 auto">…</dialog>
```

## Стили

| Свойство | Значение |
|---|---|
| Фон, подложка, тень | как у `mdl-dialog` |
| Скругление | нет; на мобильном — верхние углы `rounded-600` |
| Высота | 100% экрана; на мобильном — по содержимому, но не выше `100% − 48px` |

## Состояния

Нет. Открыто или закрыто — атрибут `open` у `<dialog>`.
