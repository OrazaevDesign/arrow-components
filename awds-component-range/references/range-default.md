# Range / Default

**Figma:** [UCYhMA1JeNUNuVGsxUEne7 → node 2093:3495](https://www.figma.com/design/UCYhMA1JeNUNuVGsxUEne7/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B9-Elemets?node-id=2093-3495)

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

Значения приходят ячейками слоя State, а не ролями напрямую.

| Элемент | Источник |
|---|---|
| Рельса | `--awds-state-range-container-rest` |
| Заливка | `--awds-state-range-bg-*` (+ sheen `--awds-state-range-chroma-*`) |
| Ползунок | `--awds-state-range-default-bg-*` (+ sheen `--awds-state-range-default-chroma-*`) |
| Обводка ползунка | `--awds-state-range-default-border-*` |
| hover / active | те же ячейки в срезе `-hover` / `-active` |
| фокус | `var(--awds-focus-color-formcontrol)`, только `:focus-visible` |

Тени у Default-ползунка нет — в макете композит стоит только у Light.

## Выключенное состояние

Атрибут `disabled` на `<input>` обязателен: класс `.range--disabled` только красит,
а `pointer-events: none` не мешает клавиатуре менять значение.

## Размеры

`.range--{N}` — 500/400/300 (ползунок 24/20/20px). По умолчанию `range--400`.

## Refresh

```
обнови awds-component-range под Figma
```
