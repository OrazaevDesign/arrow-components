# Progress / Circular

**Figma:** [progress / circular → node 6:516](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=6-516) — секция `↪ progress` (5:34)
**Механика:** [Material Web · progress](https://github.com/material-components/material-web/blob/main/docs/components/progress.md)

Кольцевой индикатор для мест, где полосе негде лечь: кнопка, иконка, карточка.

Геометрия из макета: диаметр `space-12` (48px), толщина дуги `space-0-5` (2px),
концы круглые. Цвет задаёт место: `--awds-progress-color` принимает готовый цвет,
по умолчанию `rgb(var(--primary-core))`.

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
<svg class="progress progress-circular progress--indeterminate" viewBox="0 0 48 48"
     role="progressbar" aria-label="Загрузка">
  <circle class="progress-circular__arc" cx="24" cy="24" r="23" pathLength="100"/>
</svg>
```

Кольцо вращается, длина дуги дышит от 4% до 80% — границы из material-web. Одно вращение
при постоянной дуге читается как «зависло»: глазу не за что зацепиться.

Дуга не «дышит на месте», а **протягивается**: вместе с длиной (`stroke-dasharray`) едет
и точка начала (`stroke-dashoffset`). Без offset дуга растёт и сжимается вокруг одной и
той же точки вращающегося круга, и раскрытие каждый оборот приходится в новое место —
глаз читает это как случайный сбой.

**Период один — 1.4s** и у вращения, и у протяжки. Разные периоды (пробовал 1.568s и
1.333s, как в MDC, где рост дуги сделан вращением половин, а не dash) при этой
реализации как раз и дают ту самую случайность. Цикл замыкается бесшовно: `dashoffset`
доходит до -100 при длине пути 100, то есть возвращается в исходную точку.

Здесь `stroke-opacity` возвращается к 1 принудительно. Гашение при нуле рассчитано на
determinate, а у indeterminate значения нет вовсе — переменная равна `initial-value: 0`,
и без этой строки дуга получалась полностью прозрачной. Симптом выглядел как «анимации
нет»: она шла, но по невидимому кольцу.

### В кнопке

Кнопка в состоянии `.btn--loading` показывает **это самое кольцо**, а не своё:
классы вешаются на тот же `<svg>`, а `.btn .btn__progress` задаёт ему размер и
цвет через `--awds-progress-size` / `--awds-progress-color`.

```html
<svg class="btn__progress progress progress-circular progress--indeterminate"
     viewBox="0 0 24 24" aria-hidden="true">
  <circle class="progress-circular__arc" cx="12" cy="12" r="10" pathLength="100"/>
</svg>
```

До 29.08.2026 у кнопки был свой спиннер — вращение дуги постоянной длины, то есть
ровно то, что здесь объявлено нечитаемым («зависло»). Хуже была не дублированность,
а то, что худший из двух индикаторов показывался пользователю чаще.

---

## Чего в компоненте нет

- **Трека.** В макете нарисована только активная дуга — фонового кольца нет.
  Дорисовать «для симметрии с линейным» значило бы придумать за макет; появится в
  Figma — приедет при refresh.
- **Шкалы размеров.** Один диаметр, 48px (`--awds-progress-size`, по умолчанию
  `--awds-space-12`). Переопределяется снаружи — так его берёт кнопка, — но
  ступеней Size у прогресса в теме нет, и заводить их за макет мы не будем.
- **`four-color`-режима** из Material (циклическая смена четырёх цветов в
  indeterminate). В макете одна роль.

## Почему SVG, а не conic-gradient

Дуге нужны круглые концы (`stroke-linecap: round`), и на линии 2px это заметно.
`conic-gradient` даёт рубленые края и скруглять их не умеет — путь через маску
превращается в три слоя ради того, что SVG делает одним атрибутом.
