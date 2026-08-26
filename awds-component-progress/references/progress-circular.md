# Progress / Circular

**Figma:** [UCYhMA1JeNUNuVGsxUEne7 → node 2093:3126](https://www.figma.com/design/UCYhMA1JeNUNuVGsxUEne7/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B9-Elemets?node-id=2093-3126)
**Механика:** [Material Web · progress](https://github.com/material-components/material-web/blob/main/docs/components/progress.md)

Кольцевой индикатор для мест, где полосе негде лечь: кнопка, иконка, карточка.

Геометрия из макета: диаметр `space-12` (48px), толщина дуги `space-0-5` (2px),
концы круглые. Цвет — роль `rgb(var(--surface-on))`.

---

## HTML

### Determinate

```html
<svg class="progress progress-circular" viewBox="0 0 48 48"
     style="--awds-progress-value: 50"
     role="progressbar"
     aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"
     aria-label="Загрузка файла">
  <circle class="progress-circular__arc" cx="24" cy="24" r="23" pathLength="100"/>
</svg>
```

`pathLength="100"` — ключевая деталь: он нормализует длину пути к 100, поэтому
значение прогресса подставляется в `stroke-dasharray` **как есть**, без вычисления
`2πr` и без пересчёта при смене диаметра.

### Indeterminate

```html
<svg class="progress progress-circular progress-circular--indeterminate" viewBox="0 0 48 48"
     role="progressbar" aria-label="Загрузка">
  <circle class="progress-circular__arc" cx="24" cy="24" r="23" pathLength="100"/>
</svg>
```

Кольцо вращается, длина дуги дышит от 4% до 80% — границы из material-web. Одно вращение
при постоянной дуге читается как «зависло»: глазу не за что зацепиться.

**Периоды намеренно разные:** вращение 1.568s, дыхание дуги 1.333s. Из-за того, что они
не кратны, рисунок не повторяется каждый оборот — именно это отличает живое движение от
механического. Значения и кривая `cubic-bezier(0.4, 0, 0.2, 1)` взяты из material-web.

Здесь `stroke-opacity` возвращается к 1 принудительно. Гашение при нуле рассчитано на
determinate, а у indeterminate значения нет вовсе — переменная равна `initial-value: 0`,
и без этой строки дуга получалась полностью прозрачной. Симптом выглядел как «анимации
нет»: она шла, но по невидимому кольцу.

### В кнопке

У кнопки есть свой спиннер (`.btn__progress` при `.btn--loading`) — там он и
остаётся. Кольцо отсюда нужно, когда индикатор живёт **сам по себе**: в карточке,
в пустом состоянии, рядом со статусом.

---

## Чего в компоненте нет

- **Трека.** В макете нарисована только активная дуга — фонового кольца нет.
  Дорисовать «для симметрии с линейным» значило бы придумать за макет; появится в
  Figma — приедет при refresh.
- **Шкалы размеров.** Один диаметр, 48px. Переопределяется переменной, но ступеней
  Size у прогресса в теме нет.
- **`four-color`-режима** из Material (циклическая смена четырёх цветов в
  indeterminate). В макете одна роль.

## Почему SVG, а не conic-gradient

Дуге нужны круглые концы (`stroke-linecap: round`), и на линии 2px это заметно.
`conic-gradient` даёт рубленые края и скруглять их не умеет — путь через маску
превращается в три слоя ради того, что SVG делает одним атрибутом.
