# Progress / Linear

**Figma:** [UCYhMA1JeNUNuVGsxUEne7 → node 2093:3060](https://www.figma.com/design/UCYhMA1JeNUNuVGsxUEne7/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B9-Elemets?node-id=2093-3060)
**Механика:** [Material Web · progress](https://github.com/material-components/material-web/blob/main/docs/components/progress.md)

Полоса загрузки. Показывает долю выполненного (`determinate`) или сам факт работы,
когда доля неизвестна (`indeterminate`).

Всё на токенах: геометрия — шкала Space (`space-3` область, `space-1` полоса,
`space-1-5` зазор), радиус — `--awds-rounded-border-radius-full`, цвет — роль
`rgb(var(--surface-on))`, трек — та же роль под `--awds-opacity-opacity-20`.

---

## HTML

### Determinate — доля известна

Значение приходит **числом 0…100** в переменной `--awds-progress-value`, а не
процентом: то же число нужно круговому варианту для `stroke-dasharray`, и одна
переменная избавляет потребителя от двух форматов.

```html
<div class="progress progress-linear"
     style="--awds-progress-value: 50"
     role="progressbar"
     aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"
     aria-label="Загрузка файла">
  <span class="progress-linear__active"></span>
  <span class="progress-linear__track"><span class="progress-linear__stop"></span></span>
</div>
```

`aria-valuenow` дублирует значение для скринридера — CSS-переменную он не читает.
Значит при обновлении прогресса меняются **оба**: и переменная, и атрибут.

### Indeterminate — доля неизвестна

```html
<div class="progress progress-linear progress-linear--indeterminate"
     role="progressbar" aria-label="Загрузка">
  <span class="progress-linear__active"></span>
  <span class="progress-linear__track"></span>
</div>
```

Без `aria-valuenow`: атрибут со значением обещал бы известную долю. Точка-стоп
скрывается по той же причине — она обозначает финиш.

### Обновление из JS

```js
const bar = document.querySelector('.progress-linear');
function setProgress(percent) {
  bar.style.setProperty('--awds-progress-value', percent);
  bar.setAttribute('aria-valuenow', percent);
}
```

---

## Что делает CSS сам

| Ситуация | Поведение | Почему так |
| --- | --- | --- |
| значение 100% | трек и точка-стоп исчезают | трек начинается после активной части плюс зазор, поэтому при 100% уезжает за край; точка обрезается вместе с ним (`overflow: clip`) |
| значение меняется | ширина едет `0.3s ease-out` | значение приходит скачками (ответ сервера), переход перехватывает движение с текущей точки — в отличие от keyframes |
| `prefers-reduced-motion` | бегущая полоса заменяется пульсацией | факт работы виден, движения по экрану нет |

## Чего в компоненте нет

- **Шкалы размеров.** В макете один размер. Толщину и высоту можно переопределить
  переменными `--awds-progress-track`, но ступеней Size у прогресса в теме пока нет —
  завести их должен дизайнер, тогда появится `.progress--{N}`.
- **Буфера** (`buffer` из Material — вторая, более светлая полоса под активной). В
  макете его нет, придумывать не стали.
- **Трёх сегментов активной части.** В Figma она нарезана на
  `Segment-start / Segment / Segment-end` — это заготовка M3 под волнистый индикатор
  (слои называются `wave-increment`). Волна выпрямлена: все три сегмента — прямая
  линия `stroke-width: 4` с круглыми концами, поэтому в CSS одна полоса.
