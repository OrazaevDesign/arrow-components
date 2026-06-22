# Badge — Market New

Маркет-бейдж новинки. Градиентная пилюля на роли **info** (обычно синий): фон `chroma → core` слева направо, обводка `core`, текст `on` (светлый, контрастный к насыщенному фону).

**Figma:** [Badge / Market New](https://www.figma.com/design/UCYhMA1JeNUNuVGsxUEne7/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B9-Elemets?node-id=2093-5374)

Структура разметки, размеры и слоты — те же, что у [market-percent](badge-market-percent.md); отличается только роль цвета (info). Базовый CSS общий — `badge.css`.

## HTML

```html
<!-- текст -->
<span class="badge badge-market-new badge--400">
  <span class="badge__label">NEW</span>
</span>

<!-- с иконкой слева -->
<span class="badge badge-market-new badge--400">
  <svg class="badge__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3 2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z"/></svg>
  <span class="badge__label">NEW</span>
</span>

<!-- только иконка (Type=Icon) -->
<span class="badge badge-market-new badge--200">
  <svg class="badge__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3 2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z"/></svg>
</span>
```

## Цвета (роль info)

| Свойство | Роль | CSS |
|---|---|---|
| bg | info-core | `rgb(var(--info-core))` |
| chroma (дрейф градиента) | info-chroma | `rgb(var(--info-chroma))` |
| border | info-core | `rgb(var(--info-core))` |
| color (текст/иконки) | info-on | `rgb(var(--info-on))` |

## Состояния

Нет. Бейдж статичный декоративный — без hover/focus/active/disabled.
