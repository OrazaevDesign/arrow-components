# Badge — State Paid Client

Стадия заказа: оплачен клиентом — деньги получены не через нас.

**Figma:** [Badge / State Paid Client](https://www.figma.com/design/UCYhMA1JeNUNuVGsxUEne7/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B9-Elemets?node-id=2093-5199)

Разметка, размеры и слоты — общие для всех бейджей, см. [market-percent](badge-market-percent.md); отличается только набор ячеек цвета. Базовый CSS общий — `badge.css`.

## HTML

```html
<!-- текст -->
<span class="badge badge-status-paidclient badge--400">
  <span class="badge__label">Оплачен клиентом</span>
</span>

<!-- с иконкой слева -->
<span class="badge badge-status-paidclient badge--400">
  <svg class="badge__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v4h1"/></svg>
  <span class="badge__label">Оплачен клиентом</span>
</span>

<!-- только иконка (Type=Icon) -->
<span class="badge badge-status-paidclient badge--200">
  <svg class="badge__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v4h1"/></svg>
</span>
```

## Цвета

Берутся из слоя State темы, не ролью инлайном — вариант целиком описан студией.

| Свойство | Ячейка State | Резолвится в |
|---|---|---|
| bg | `--awds-state-badge-status-paidclient-bg-rest` | `warning-core` |
| chroma (дрейф градиента) | `--awds-state-badge-status-paidclient-chroma-rest` | `warning-chroma` |
| border | `--awds-state-badge-status-paidclient-border-rest` | `warning-core` |
| color (текст/иконки) | `--awds-state-badge-status-paidclient-color-rest` | `warning-on` |

## Состояния

Нет. Бейдж статичный декоративный — без hover/focus/active/disabled.
