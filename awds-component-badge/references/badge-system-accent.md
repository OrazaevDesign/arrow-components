# Badge — System Accent

Акцентный служебный бейдж: привлекает внимание там, где info недостаточно, но это ещё не ошибка.

**Figma:** [Badge / System Accent](https://www.figma.com/design/UCYhMA1JeNUNuVGsxUEne7/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B9-Elemets?node-id=2093-4769)

Разметка, размеры и слоты — общие для всех бейджей, см. [market-percent](badge-market-percent.md); отличается только набор ячеек цвета. Базовый CSS общий — `badge.css`.

## HTML

```html
<!-- текст -->
<span class="badge badge-system-accent badge--400">
  <span class="badge__label">Важно</span>
</span>

<!-- с иконкой слева -->
<span class="badge badge-system-accent badge--400">
  <svg class="badge__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v4h1"/></svg>
  <span class="badge__label">Важно</span>
</span>

<!-- только иконка (Type=Icon) -->
<span class="badge badge-system-accent badge--200">
  <svg class="badge__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v4h1"/></svg>
</span>
```

## Цвета

Берутся из слоя State темы, не ролью инлайном — вариант целиком описан студией.

| Свойство | Ячейка State | Резолвится в |
|---|---|---|
| bg | `--awds-state-badge-system-accent-bg-rest` | `accent-core` |
| chroma (дрейф градиента) | `--awds-state-badge-system-accent-chroma-rest` | `accent-chroma` |
| border | `--awds-state-badge-system-accent-border-rest` | `accent-core` |
| color (текст/иконки) | `--awds-state-badge-system-accent-color-rest` | `accent-on` |

## Состояния

Нет. Бейдж статичный декоративный — без hover/focus/active/disabled.
