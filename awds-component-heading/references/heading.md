# heading — заголовок секции + действие

Заголовок `H1–H5` с опциональной ссылкой «Все ›». Адаптивен по брейкпоинту (View Desktop/Tablet/Mobile зашит в шкалу typography и `@media` раскладки).

## Разметка

```html
<div class="heading heading--h1">
  <h2 class="heading__title">Heading</h2>
  <a class="btn-area btn-area-default btn-area--100 btn-area--fill-y heading__action" href="/all">
    <span class="btn-area__label">Все</span>
    <span class="btn-area__suffix"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 4l4 4-4 4"/></svg></span>
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
| `.heading` | Контейнер: flex, `align-items: flex-end`, `gap: 6px`, `width: 100%`. На <1068 — `space-between`. |
| `.heading__title` | Текст заголовка. Размер — от `.heading--h{N}`. Цвет `surface-on-highest`, semibold, `text-wrap: balance`. |
| `.heading__action` | Действие (опц.) = `awds-component-button-area` (`.btn-area-default --100 --fill-y`). Цвет/размер/состояния/шеврон/полная высота — из button-area. Класс — опц. хук. |
| `.heading--h1…--h5` | Уровень (размер) заголовка. |

## Уровни

| Класс | typography | Mobile → Tablet → Desktop |
|---|---|---|
| `.heading--h1` | 920 | 22/26 → 24/29 → 28/34 |
| `.heading--h2` | 910 | 20/24 → 20/26 → 24/29 |
| `.heading--h3` | 900 | 19/24 (фикс) |
| `.heading--h4` | 800 | 18/22 (фикс) |
| `.heading--h5` | 600 | 16/19 (фикс) |

## Зависимости

- `heading.css` — сам компонент.
- `button-area.css` (`awds-component-button-area`) — если есть действие «Все ›».
- DS: `css-variables.css` (роли) + `css-global.css` (шкала typography, space).
