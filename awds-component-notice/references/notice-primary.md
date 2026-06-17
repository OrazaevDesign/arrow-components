# Notice / Primary

**Figma:** [UCYhMA1JeNUNuVGsxUEne7 → node 2093:562](https://www.figma.com/design/UCYhMA1JeNUNuVGsxUEne7/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B9-Elemets?node-id=2093-562)

> [!NOTE]
> `notice-primary.md` — **author-owned**. ACB пишет первичный draft, потом не трогает. CSS (`notice.css`) и preview генерируются и при refresh затрутся.

Яркий счётчик нотификаций (роль accent — обычно красный). Главный «привлекающий» бейдж: новые уведомления, непрочитанные сообщения.

## HTML

```html
<span class="notice notice-primary notice--400">9</span>
<span class="notice notice-primary notice--400">99+</span>
<span class="notice notice-primary notice--100"></span>   <!-- точка-индикатор -->
```

В углу иконки:

```html
<span class="bell" style="position:relative;">
  <svg>…</svg>
  <span class="notice notice-primary notice--200" style="position:absolute;top:-6px;right:-6px;">5</span>
</span>
```

## Цвета

| Свойство | Роль |
|---|---|
| Фон | `accent-core` (+ sheen `accent-chroma`) |
| Цвет числа | `accent-on` |

## Размеры

`.notice--{N}` — см. SKILL.md (600=28px … 100=6px-точка). По умолчанию `notice--400`.

## Refresh

```
обнови awds-component-notice под Figma
```
