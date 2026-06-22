# Badge — Market Sale

Маркет-бейдж распродажи. Градиентная пилюля на роли **primary** (брендовый, обычно жёлтый): фон `chroma → core` слева направо, обводка `core`, текст `on` (тёмный, контрастный к яркому фону).

**Figma:** [Badge / Market Sale](https://www.figma.com/design/UCYhMA1JeNUNuVGsxUEne7/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B9-Elemets?node-id=2093-5417)

Структура разметки, размеры и слоты — те же, что у [market-percent](badge-market-percent.md); отличается только роль цвета (primary вместо accent). Базовый CSS общий — `badge.css`.

## HTML

```html
<!-- текст -->
<span class="badge badge-market-sale badge--400">
  <span class="badge__label">SALE</span>
</span>

<!-- с иконкой слева -->
<span class="badge badge-market-sale badge--400">
  <svg class="badge__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 12V8H6a2 2 0 0 1 0-4h12v4"/><path d="M4 6v12a2 2 0 0 0 2 2h14v-4"/><circle cx="16" cy="14" r="2"/></svg>
  <span class="badge__label">SALE</span>
</span>

<!-- только иконка (Type=Icon) -->
<span class="badge badge-market-sale badge--200">
  <svg class="badge__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 5 5 19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>
</span>
```

## Цвета (роль primary)

| Свойство | Роль | CSS |
|---|---|---|
| bg | primary-core | `rgb(var(--primary-core))` |
| chroma (дрейф градиента) | primary-chroma | `rgb(var(--primary-chroma))` |
| border | primary-core | `rgb(var(--primary-core))` |
| color (текст/иконки) | primary-on | `rgb(var(--primary-on))` |

## Состояния

Нет. Бейдж статичный декоративный — без hover/focus/active/disabled.
