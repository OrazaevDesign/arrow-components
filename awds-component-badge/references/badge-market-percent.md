# Badge — Market Percent

Маркет-бейдж скидки/процента. Градиентная пилюля на роли **accent**: фон `chroma → core` слева направо, обводка `core`, текст `on`.

**Figma:** [Badge / Market Precent](https://www.figma.com/design/UCYhMA1JeNUNuVGsxUEne7/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B9-Elemets?node-id=2093-5286)

## HTML

```html
<!-- только процент -->
<span class="badge badge-market-percent badge--400">
  <span class="badge__label">-30%</span>
</span>

<!-- с иконкой слева -->
<span class="badge badge-market-percent badge--400">
  <svg class="badge__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 12V8H6a2 2 0 0 1 0-4h12v4"/><path d="M4 6v12a2 2 0 0 0 2 2h14v-4"/><circle cx="16" cy="14" r="2"/></svg>
  <span class="badge__label">-30%</span>
</span>

<!-- только иконка (Type=Icon) -->
<span class="badge badge-market-percent badge--200">
  <svg class="badge__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 5 5 19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>
</span>
```

## CSS

`badge.css` (общий файл компонента):
- база `.badge` — лейаут (inline-flex, gap, padding), градиентный фон, обводка inset box-shadow, типографика, `tabular-nums`;
- слоты `.badge__icon` (или `> svg`) — размер из `--awds-badge-icon`; `.badge__label` — текст с ellipsis;
- вариант `.badge-market-percent` — заполняет аккумуляторы цвета ролью accent;
- 7 размеров `.badge--{600..50}` — заполняют аккумуляторы размера из shape `rectangle`.

## Цвета (роль accent)

| Свойство | Роль | CSS |
|---|---|---|
| bg | accent-core | `rgb(var(--accent-core))` |
| chroma (дрейф градиента) | accent-chroma | `rgb(var(--accent-chroma))` |
| border | accent-core | `rgb(var(--accent-core))` |
| color (текст/иконки) | accent-on | `rgb(var(--accent-on))` |

## Размеры (shape rectangle)

| Size | padding | gap | icon | rounded |
|---|---|---|---|---|
| 600 | space-4 (16) | space-2 (8) | space-5 (20) | rounded-600 |
| 500 | space-3-5 (14) | space-1-5 (6) | space-5 (20) | rounded-500 |
| 400 | space-2-5 (10) | space-1-5 (6) | space-5 (20) | rounded-400 |
| 300 | space-2 (8) | space-1-5 (6) | space-5 (20) | rounded-300 |
| 200 | space-2 (8) | space-1 (4) | space-4 (16) | rounded-200 |
| 100 | space-1 (4) | space-0-5 (2) | space-4 (16) | rounded-100 |
| 50 | space-0-5 (2) | space-0-5 (2) | space-4 (16) | rounded-50 |

Значения через семантический shape-слой `var(--awds-rectangle-N-*)` — резолвятся в базовую шкалу на сайте.

## Состояния

Нет. Бейдж статичный декоративный — без hover/focus/active/disabled.
