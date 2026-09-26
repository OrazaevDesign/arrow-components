# Range / Default

**Figma:** [470rar5EfRm4n14vHMXbpc → node 6:732](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=6-732)

> [!NOTE]
> `range-default.md` — **author-owned**. ACB пишет первичный draft, потом не трогает. CSS (`range.css`) и preview генерируются и при refresh затрутся.

Слайдер с жёлтым (primary) ползунком. Основной вариант на светлых поверхностях.

## HTML

```html
<div class="range range-default range--400">
  <div class="range__track"><div class="range__fill"></div></div>
  <div class="range__thumb"></div>
  <input class="range__input" type="range" min="0" max="100" value="60" aria-label="Значение">
</div>
```

Диапазон: добавь `range--double`, второй ползунок и второй `<input>` (см. SKILL.md). Подключи `range.js` один раз на странице — он синхронит значения инпутов с визуалом.

## Цвета

Значения приходят ролями напрямую: ячейки слоя State стали приватными 03.09.2026, их
имён в теме нет. Ниже — цели тех ячеек, взятые из `component-token-map.json`.

| Элемент | Источник |
|---|---|
| Рельса | `--surface-container-container` |
| Заливка | `--primary-core` |
| Ползунок | `--primary-core` (+ sheen `--primary-chroma`) |
| Обводка ползунка | `--primary-core` — того же цвета, что заливка ручки |
| hover / active | наведение — `--primary-dim`; нажатие гасит sheen ручки до `--primary-core`, и градиент схлопывается в плоский цвет |
| фокус | `var(--awds-focus-color-muted)`, только `:focus-visible` |

Тени у Default-ползунка нет — в макете композит стоит только у Light.

**Градиент у ручки есть, у заливки трека — нет.** Заливка стала плоской 25.09.2026 вместе
с остальными форм-контролами, ручке градиент вернули 26.09.2026 отдельным решением
владельца: в полосе высотой 4px переход не читается, а на круге диаметром 20–24px держит
объём. Поэтому в словаре живут ячейки `range/default/chroma-*`, но нет `range/chroma`.

## Выключенное состояние

Атрибут `disabled` на `<input>` обязателен: класс `.range--disabled` только красит,
а `pointer-events: none` не мешает клавиатуре менять значение.

## Размеры

`.range--{N}` — 500/400 (ползунок 24/20px). По умолчанию `range--400`.

## Refresh

```
обнови awds-component-range под Figma
```
