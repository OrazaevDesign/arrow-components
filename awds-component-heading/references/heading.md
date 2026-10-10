# heading — заголовок секции + действие

Заголовок `H1–H5` с опциональной ссылкой «Все» или счётчиком «200 товаров». Размер — роли WYSIWYG `h{N}` (масштаб × брейкпоинт), раскладка действия адаптивна через `@media`.

**Figma:** [470rar5EfRm4n14vHMXbpc → node 1050:139087](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=1050-139087)

## Разметка

```html
<div class="heading heading--h1">
  <h2 class="heading__title">Heading</h2>
  <a class="btn btn-pills btn--100 btn--pill heading__action" href="/all">Все</a>
</div>
```

Со счётчиком вместо действия (набор `heading / goods`, node 1057:28891) — просто текст, не ссылка:

```html
<div class="heading heading--h1">
  <h1 class="heading__title">Пледы</h1>
  <span class="heading__count">200 товаров</span>
</div>
```

Без действия — опусти `.heading__action`:

```html
<div class="heading heading--h3"><h3 class="heading__title">Heading</h3></div>
```

## Элементы

| Класс | Роль |
|---|---|
| `.heading` | Контейнер: flex, `flex-wrap`, `align-items: flex-end`, `gap: space-2` (8px), `width: 100%`. Ниже 1024 — без переноса, `space-between`. |
| `.heading__title` | Текст заголовка. Размер — от `.heading--h{N}`. Цвет `surface-on-highest`, semibold, `text-wrap: balance`. Ниже 1024 — `flex: 1 1 0`. |
| `.heading__action` | Действие (опц.) = `awds-component-button` (`.btn-pills .btn--100 .btn--pill`). Heading задаёт только `flex: none`. |
| `.heading__count` | Счётчик (опц.), текст: `surface-on-high`, control 300 13/16/0.1, regular, `tabular-nums`, `nowrap`. В строке заголовка — `padding-block: space-1` (коробка 24, как у пилюли). Раскладка — как у действия. |
| `.heading--h1…--h5` | Уровень (размер) заголовка — роль WYSIWYG `h{N}`. |

## Уровни

| Класс | Роли | Desktop, мод medium |
|---|---|---|
| `.heading--h1` | `--awds-wysiwyg-*-h1` | 34/34/−0.3 |
| `.heading--h2` | `--awds-wysiwyg-*-h2` | 28/34/−0.3 |
| `.heading--h3` | `--awds-wysiwyg-*-h3` | 24/29/−0.2 |
| `.heading--h4` | `--awds-wysiwyg-*-h4` | в макете нет |
| `.heading--h5` | `--awds-wysiwyg-*-h5` | в макете нет |

## Зависимости

- `heading.css` — сам компонент.
- `button-pills.css` (`awds-component-button`) и `focus-selection.css` — если есть действие «Все».
- Тема студии: роли цвета, роли WYSIWYG, шкала `space`.
