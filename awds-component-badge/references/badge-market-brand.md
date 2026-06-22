# Badge — Market Brand

Маркет-бейдж бренда/нейтральной метки. Градиентная пилюля на роли **secondary** (приглушённый, обычно светло-серый): фон `chroma → core` слева направо, обводка `core`, текст `on`.

**Figma:** [Badge / Market Brand](https://www.figma.com/design/UCYhMA1JeNUNuVGsxUEne7/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B9-Elemets?node-id=2093-5331)

Структура разметки, размеры и слоты — те же, что у [market-percent](badge-market-percent.md); отличается только роль цвета (secondary). Базовый CSS общий — `badge.css`.

## HTML

```html
<!-- текст -->
<span class="badge badge-market-brand badge--400">
  <span class="badge__label">Бренд</span>
</span>

<!-- с иконкой слева -->
<span class="badge badge-market-brand badge--400">
  <svg class="badge__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41 13.42 20.6a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><circle cx="7" cy="7" r="1.5"/></svg>
  <span class="badge__label">Бренд</span>
</span>

<!-- только иконка (Type=Icon) -->
<span class="badge badge-market-brand badge--200">
  <svg class="badge__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41 13.42 20.6a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><circle cx="7" cy="7" r="1.5"/></svg>
</span>
```

## Цвета (роль secondary)

| Свойство | Роль | CSS |
|---|---|---|
| bg | secondary-core | `rgb(var(--secondary-core))` |
| chroma (дрейф градиента) | secondary-chroma | `rgb(var(--secondary-chroma))` |
| border | secondary-core | `rgb(var(--secondary-core))` |
| color (текст/иконки) | secondary-on | `rgb(var(--secondary-on))` |

## Состояния

Нет. Бейдж статичный декоративный — без hover/focus/active/disabled.
