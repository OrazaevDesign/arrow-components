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

## Цвета

| Элемент | Роль |
|---|---|
| Рельса | `surface-container-container` |
| Заливка | `primary-core` (+ sheen `primary-chroma`) — как у Default |
| Ползунок | `secondary-container-core` (+ sheen `surface-bright`) |
| Обводка ползунка | `secondary-container-dim` |
| hover | заливка → `primary-dim`, ползунок → `secondary-container-dim` |

## Размеры

`.range--{N}` — 500/400/300. По умолчанию `range--400`.

## Refresh

```
обнови awds-component-range под Figma
```
