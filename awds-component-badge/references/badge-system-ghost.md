# Badge — System Ghost

Бейдж без плашки — остаётся один текст. Для плотных списков, где заливка создаёт шум.

**Figma:** [Badge / System Ghost](https://www.figma.com/design/UCYhMA1JeNUNuVGsxUEne7/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B9-Elemets?node-id=2093-4855)

Разметка, размеры и слоты — общие для всех бейджей, см. [market-percent](badge-market-percent.md); отличается только набор ячеек цвета. Базовый CSS общий — `badge.css`.

## HTML

```html
<!-- текст -->
<span class="badge badge-system-ghost badge--400">
  <span class="badge__label">Без плашки</span>
</span>

<!-- с иконкой слева -->
<span class="badge badge-system-ghost badge--400">
  <svg class="badge__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v4h1"/></svg>
  <span class="badge__label">Без плашки</span>
</span>

<!-- только иконка (Type=Icon) -->
<span class="badge badge-system-ghost badge--200">
  <svg class="badge__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v4h1"/></svg>
</span>
```

## Цвета

Берутся из слоя State темы, не ролью инлайном — вариант целиком описан студией.

| Свойство | Ячейка State | Резолвится в |
|---|---|---|
| bg | `--awds-state-badge-system-ghost-bg-rest` | `extended-transparent` |
| chroma (дрейф градиента) | `--awds-state-badge-system-ghost-chroma-rest` | `extended-transparent` |
| border | `--awds-state-badge-system-ghost-border-rest` | `extended-transparent` |
| color (текст/иконки) | `--awds-state-badge-system-ghost-color-rest` | `surface-on-high` |

**Полностью прозрачен:** фон, обводка и градиент ссылаются на `--extended-transparent` (`255 255 255 / 0%` — альфа внутри значения). Отдельного правила не нужно.

## Состояния

Нет. Бейдж статичный декоративный — без hover/focus/active/disabled.
