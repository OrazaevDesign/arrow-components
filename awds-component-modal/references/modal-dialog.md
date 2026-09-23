# Modal — Dialog (окно по центру)

Окно с решением: подтверждение, короткая форма, выбор. Стоит по центру экрана, скруглено со всех сторон (`rounded-600`), тень `elevation-4`. Ниже 1068px превращается в шторку снизу со скруглёнными верхними углами.

**Figma:** https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=637-48438 (набор `modal / dialog`)

## HTML

```html
<dialog class="mdl mdl-dialog" aria-labelledby="mdl-title">
  <header class="mdl__header">
    <h2 class="mdl__title" id="mdl-title">Удалить адрес?</h2>
    <button class="btn btn-ghost btn--200 mdl__close" type="button" aria-label="Закрыть">
      <svg viewBox="0 0 20 20" aria-hidden="true"></svg>
    </button>
  </header>
  <div class="mdl__content">
    <p class="mdl__text">Адрес пропадёт из списка доставки. Это нельзя отменить.</p>
  </div>
  <footer class="mdl__footer">
    <button class="btn btn-secondary btn--300" type="button">Отмена</button>
    <button class="btn btn-primary btn--300" type="button">Удалить</button>
  </footer>
</dialog>
```

Открыть — `dialog.showModal()`, закрыть — `dialog.close()`.

## Ширина

Своей фиксированной ширины у окна нет: `--awds-mdl-width` по умолчанию берёт `--awds-layout-form-max`, потребитель перекрывает его под свой случай.

```html
<dialog class="mdl mdl-dialog" style="--awds-mdl-width: 640px">…</dialog>
```

## Стили

| Свойство | Значение |
|---|---|
| Фон | `rgb(var(--surface-bright))` — ячейка `modal/bg` |
| Подложка | `rgb(var(--surface-on-highest) / var(--awds-opacity-50))` — ячейка `modal/backdrop` |
| Тень | `var(--awds-shadow-elevation-4)` |
| Скругление | `var(--awds-rounded-border-radius-600)` (10), на мобильном — только сверху |
| Боковые отступы | `var(--awds-layout-section-gutter)` — 24 / 16 |

## Состояния

Нет. Открыто или закрыто — атрибут `open` у `<dialog>`.
