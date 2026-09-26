# button-area — кликабельная область (link-area)

Ссылка/кнопка как область нажатия с растяжимой hit-зоной. 5 вариантов (цвет = роли link), 4 размера, состояния, иконки, загрузка, fill.

## Разметка

```html
<a class="btn-area btn-area-default btn-area--500" href="/x">
  <span class="btn-area__prefix"><svg viewBox="0 0 20 20" aria-hidden="true">…</svg></span>
  <span class="btn-area__label">Подробнее</span>
  <span class="btn-area__suffix"><svg viewBox="0 0 20 20" aria-hidden="true">…</svg></span>
</a>
```

Только иконка: `.btn-area--icon-only` + `.btn-area__icon` (без `__label`), задай `aria-label`.

## Классы

| Класс | Роль |
|---|---|
| `.btn-area` | База: flex, контент по центру, цвет из варианта, без подчёркивания |
| `.btn-area-{default\|muted\|contrast\|accent\|heading}` | Цвет (rest + hover), = роли link |
| `.btn-area--{500\|400\|100\|50}` | Размер (текст/иконка/зазор/радиус через `rectangle/{N}`) |
| `.btn-area--icon-only` | Только иконка (gap 0) |
| `.btn-area--fill` / `--fill-x` / `--fill-y` | Растянуть hit-область (обе/ширина/высота); контент центрирован |
| `.btn-area--loading` | Загрузка: контент погашен (место сохраняется), по центру кольцо `awds-component-progress` в слоте `.btn-area__progress`, клики гасятся |
| `.btn-area--disabled` / `[aria-disabled]` / `:disabled` | Приглушение 40% + клики гасятся |
| `.btn-area__prefix` / `__label` / `__suffix` / `__icon` / `__progress` | Слоты |

## Варианты (цвет rest → hover)

| Вариант | rest | hover |
|---|---|---|
| default | tertiary-container-on-high | tertiary-container-on-highest |
| muted | surface-on-high | surface-on-highest |
| contrast | surface-on-highest | surface-on-high |
| accent | surface-on-highest | accent-container-on |
| heading | surface-on-high | accent-container-on |

## Размеры

| Размер | gap | icon | типографика |
|---|---|---|---|
| 500 | 6 | 20 | control-600 (16/20) |
| 400 | 6 | 20 | control-400 (14/20) |
| 100 | 2 | 16 | control-300 (13/16) |
| 50 | 2 | 16 | control-200 (12/16) |

## Зависимости

- `button-area.css` — сам компонент.
- `awds-component-progress` — кольцо загрузки: своего спиннера у области нет, в слоте
  `.btn-area__progress` стоит тот же `<svg>` с классами `progress progress-circular
  progress--indeterminate`.
- DS: `css-variables.css` (роли) + `css-global.css` (rectangle/{N}, opacity-40, rounded-full, control-*).
