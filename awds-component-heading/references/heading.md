# heading — заголовок секции + действие

Заголовок `H1–H5` с опциональной ссылкой «Все». Размер — роли WYSIWYG `h{N}` (масштаб × брейкпоинт), раскладка действия адаптивна через `@media`.

**Figma:** [470rar5EfRm4n14vHMXbpc → node 1050:139087](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=1050-139087)

## Разметка

```html
<div class="heading heading--h1">
  <h2 class="heading__title">Heading</h2>
  <a class="btn btn-tertiary btn--100 btn--pill heading__action" href="/all">
    Все
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 6C8.36819 6 8.66699 6.2988 8.66699 6.66699C8.66682 7.03503 8.36808 7.33301 8 7.33301C6.89554 7.33301 6.00018 8.22859 6 9.33301C6 10.4376 6.89543 11.333 8 11.333H12C13.1046 11.333 14 10.4376 14 9.33301C13.9999 8.40232 13.3634 7.61869 12.501 7.39648C12.1446 7.30476 11.9291 6.94135 12.0205 6.58496C12.1123 6.22846 12.4765 6.01285 12.833 6.10449C14.2703 6.47454 15.3329 7.77912 15.333 9.33301C15.333 11.174 13.8409 12.667 12 12.667H8C6.15905 12.667 4.66699 11.174 4.66699 9.33301C4.66717 7.49221 6.15916 6 8 6ZM8 3.33301C9.84095 3.33301 11.333 4.82604 11.333 6.66699C11.3328 8.50779 9.84084 10 8 10C7.63181 10 7.33301 9.7012 7.33301 9.33301C7.33318 8.96497 7.63192 8.66699 8 8.66699C9.10446 8.66699 9.99982 7.77141 10 6.66699C10 5.56242 9.10457 4.66699 8 4.66699H4C2.89543 4.66699 2 5.56242 2 6.66699C2.00015 7.59768 2.63662 8.38131 3.49902 8.60352C3.85541 8.69524 4.0709 9.05865 3.97949 9.41504C3.88774 9.77154 3.5235 9.98715 3.16699 9.89551C1.72966 9.52546 0.667141 8.22088 0.666992 6.66699C0.666992 4.82604 2.15905 3.33301 4 3.33301H8Z"/></svg>
  </a>
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
| `.heading__action` | Действие (опц.) = `awds-component-button` (`.btn-tertiary .btn--100 .btn--pill`). Heading задаёт только `flex: none`. |
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
- `button-tertiary.css` (`awds-component-button`) и `focus-selection.css` — если есть действие «Все».
- Тема студии: роли цвета, роли WYSIWYG, шкала `space`.
