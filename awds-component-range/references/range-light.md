# Range / Light

**Figma:** [470rar5EfRm4n14vHMXbpc → node 6:771](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=6-771)

> [!NOTE]
> `range-light.md` — **author-owned**. ACB пишет первичный draft, потом не трогает.

Слайдер с **белым ползунком в обводке** (заливка та же — жёлтая primary). Для цветных/насыщенных подложек, где жёлтый ползунок сливался бы с фоном.

## HTML

```html
<div class="range range-light range--400">
  <div class="range__track"><div class="range__fill"></div></div>
  <div class="range__thumb"></div>
  <input class="range__input" type="range" min="0" max="100" value="45" aria-label="Значение">
</div>
```

Подключи `range.js` один раз на странице.

## Цвета и тень

Значения приходят ролями напрямую: ячейки слоя State стали приватными 03.09.2026, их
имён в теме нет. Ниже — цели тех ячеек, взятые из `component-token-map.json`.

| Элемент | Источник |
|---|---|
| Рельса | `--surface-container-container` |
| Заливка | `--primary-core` (+ sheen `--primary-chroma`) — как у Default |
| Ползунок | `--secondary-container-core`, наведение `--secondary-container-dim` (+ sheen `--surface-bright`) |
| Обводка ползунка | `--secondary-container-dim` |
| **Тень ползунка** | `var(--awds-shadow-elevation-1)` — из макета, на всех состояниях |
| фокус | `var(--awds-focus-color-muted)`, только `:focus-visible` |

**Тень — не украшение.** Ползунок здесь светлый, и трек под ним светлый тоже: без подъёма
край ручки пропадает. В макете композит стоит во всех Light-ячейках и совпадает с
`elevation-1` по всем девяти числам — сверено с темой, а не подобрано на глаз.

## Выключенное состояние

```html
<input class="range__input" type="range" … disabled>
```

Атрибут обязателен: класс `.range--disabled` только красит. `pointer-events: none` гасит
мышь, но не клавиатуру — без атрибута стрелки продолжают менять значение.

## Размеры

`.range--{N}` — 500/400. По умолчанию `range--400`.

## Refresh

```
обнови awds-component-range под Figma
```
