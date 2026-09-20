# Badge — System Error

Ошибка: операция не выполнена.

**Figma:** [Badge / System Error](https://www.figma.com/design/UCYhMA1JeNUNuVGsxUEne7/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B9-Elemets?node-id=2093-4898)

Разметка, размеры и слоты — общие для всех бейджей, см. [market-percent](badge-market-percent.md); отличается только набор ячеек цвета. Базовый CSS общий — `badge.css`.

## HTML

```html
<!-- текст -->
<span class="badge badge-system-error badge--400">
  <span class="badge__label">Ошибка</span>
</span>

<!-- с иконкой слева -->
<span class="badge badge-system-error badge--400">
  <svg class="badge__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v4h1"/></svg>
  <span class="badge__label">Ошибка</span>
</span>

<!-- только иконка (Type=Icon) -->
<span class="badge badge-system-error badge--200">
  <svg class="badge__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v4h1"/></svg>
</span>
```

## Цвета

Берутся из слоя State темы, не ролью инлайном — вариант целиком описан студией.

| Свойство | Ячейка State | Резолвится в |
|---|---|---|
| bg | `--awds-state-badge-system-error-bg-rest` | `error-core` |
| chroma (дрейф градиента) | `--awds-state-badge-system-error-chroma-rest` | `error-chroma` |
| border | `--awds-state-badge-system-error-border-rest` | `error-core` |
| color (текст/иконки) | `--awds-state-badge-system-error-color-rest` | `error-on` |

**Градиента нет:** `core` и `chroma` этой роли в теме совпадают, поэтому заливка выходит плоской. В макете стопы разные — расхождение темы с Figma, чинится в студии.

**Совпадает с accent:** `error-core` в теме равен `accent-core` (211 49 34), поэтому Error и Accent сейчас неразличимы. В макете Error темнее.

## Состояния

Нет. Бейдж статичный декоративный — без hover/focus/active/disabled.
