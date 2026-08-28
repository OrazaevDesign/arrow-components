# Range / Light

**Figma:** [UCYhMA1JeNUNuVGsxUEne7 → node 2093:3552](https://www.figma.com/design/UCYhMA1JeNUNuVGsxUEne7/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B9-Elemets?node-id=2093-3552)

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

Значения приходят ячейками слоя State — не ролями напрямую: «какой цвет у Light-ручки
в hover» решает дизайнер в студии.

| Элемент | Источник |
|---|---|
| Рельса | `--awds-state-range-container-rest` |
| Заливка | `--awds-state-range-bg-*` (+ sheen `--awds-state-range-chroma-*`) — как у Default |
| Ползунок | `--awds-state-range-light-bg-*` (+ sheen `--awds-state-range-light-chroma-*`) |
| Обводка ползунка | `--awds-state-range-light-border-*` |
| **Тень ползунка** | `var(--awds-shadow-elevation-1)` — из макета, на всех состояниях |
| фокус | `var(--awds-focus-color-formcontrol)`, только `:focus-visible` |

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

`.range--{N}` — 500/400/300. По умолчанию `range--400`.

## Refresh

```
обнови awds-component-range под Figma
```
