---
name: awds-component-range
description: >
  Верстка слайдеров (Range) ArrowDS — HTML-разметка и CSS на токенах дизайн-системы.
  Используй ВСЕГДА при: добавлении ползунка-слайдера, выбора диапазона (range), регулятора
  значения в разметку или PageCraft-блок, выборе варианта (default / light), одиночного или
  двойного (диапазон) слайдера, получении Figma-ссылки на компонент Range.
---

# Range (слайдер) ArrowDS

Слайдер: рельса (track) + заливка выбранного (fill) + ползунок(и) (thumb). Презентационный компонент — позиции задаются CSS-переменными, интерактив (drag) подключает потребитель. Ничего не хардкодит: размеры — shape-токены, цвета — роли. См. скилл `arrow-design-system`.

## Варианты (2) × режимы

| Вариант | Reference | Ползунок |
|---|---|---|
| **Default** | `references/range-default.md` ✅ | жёлтый (primary) |
| **Light** | `references/range-light.md` ✅ | белый с обводкой (secondary-container) |

Заливка у обоих — **primary** (жёлтая). Различается только ползунок.

**Режим:** `single` (один ползунок) или `.range--double` (диапазон — два ползунка, заливка между ними).

## Откуда берутся значения

| Что | Источник |
|---|---|
| Рельса (track) | `rgb(var(--surface-container-container))`, высота `var(--awds-space-1)` (4px) |
| Заливка (fill) | `rgb(var(--primary-core))` + sheen `rgb(var(--primary-chroma))` |
| Ползунок Default | `rgb(var(--primary-core))` |
| Ползунок Light | `rgb(var(--secondary-container-core))` + обводка `rgb(var(--secondary-container-dim))` |
| Размер ползунка | `var(--awds-square-N-handle)` (500=24, 400=20, 300=20px) |
| Скругление | `var(--awds-rounded-full)` (рельса/заливка), `50%` (ползунок) |
| hover | заливка/ползунок темнеют до `primary-dim` (light-ползунок → `secondary-container-dim`) |
| disabled | `.range--disabled` → `opacity: var(--awds-opacity-40)` |

## Размеры (3)

`.range--{N}`, N — `500 400 300`. Меняется диаметр ползунка (24 / 20 / 20px); рельса константна 4px. По умолчанию `range--400`.

## Как работает интерактив

Слайдер **рабочий**: поверх визуального слоя лежит прозрачный нативный `<input type="range">` — он даёт drag (мышь/тач), клавиатуру (стрелки), фокус и ARIA «из коробки». Тонкий `range.js` синхронит `value` инпута в CSS-переменные `--range-from`/`--range-to` (доли 0–1), по которым позиционируются визуальный ползунок и заливка. Позиция считается с учётом ширины ползунка — визуальный и нативный thumb совпадают.

- **single** — один `<input>` (→ `--range-to`).
- **double** — два `<input>` (`inputs[0]`=from, `inputs[1]`=to). **Ограничение перемещения ручек** (как [doka.guide](https://doka.guide/recipes/input-range-style/#ogranichenie-peremeshcheniya-ruchek)): ручки не пересекаются — `from` зажимается ≤ `to`, `to` ≥ `from`; когда верхняя ручка в самом минимуме, `range.js` поднимает её `z-index`, чтобы её можно было ухватить. Нижняя ручка по умолчанию сверху (z-index) — всегда захватываемая.

Подключи `range.js` один раз на странице. Для контента, добавленного динамически после загрузки, вызови `awdsRangeInit(root)`.

## HTML

Single:

```html
<div class="range range-default range--400">
  <div class="range__track"><div class="range__fill"></div></div>
  <div class="range__thumb"></div>
  <input class="range__input" type="range" min="0" max="100" value="60" aria-label="Громкость">
</div>
```

Double (диапазон):

```html
<div class="range range-default range--400 range--double">
  <div class="range__track"><div class="range__fill"></div></div>
  <div class="range__thumb range__thumb--from"></div>
  <div class="range__thumb range__thumb--to"></div>
  <input class="range__input" type="range" min="0" max="100" value="25" aria-label="Цена от">
  <input class="range__input" type="range" min="0" max="100" value="70" aria-label="Цена до">
</div>
```

```html
<!-- один раз на странице -->
<script src="…/range.js"></script>
```

> Значение читается с нативных `<input>` (их `value`/`min`/`max`) — отправляй форму как обычно, слушай `input`/`change` на `.range__input`. Визуал — производное от значения, своей логики хранения нет.

## CSS / JS

- `references/range.css` — база `.range` + `__track`/`__fill`/`__thumb`/`__input` + 2 варианта + 3 размера + `--double`. Подключается один раз глобально.
- `references/range.js` — авто-инициализация (синхронизация значений с визуалом). Один раз на странице.

Визуальный QA — `references/preview.html` (storybook, `file://`): Default/Light × размеры × single/double.

## Refresh

```
обнови awds-component-range под Figma
```

ACB зайдёт в Figma по ссылке (`component.meta.json`), сравнит снапшот, обновит `range.css` + preview. Документация (этот файл и `{variant}.md`) — не трогается.
