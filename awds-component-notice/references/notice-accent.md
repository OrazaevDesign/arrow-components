# Notice / Primary

**Figma:** [470rar5EfRm4n14vHMXbpc → node 6:229](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=6-229) — секция `↪ notice` (5:31) страницы `4 · elements`

> [!NOTE]
> `notice-accent.md` — **author-owned**. ACB пишет первичный draft, потом не трогает. CSS (`notice.css`) и preview генерируются и при refresh затрутся.

Яркий счётчик нотификаций (роль accent — обычно красный). Главный «привлекающий» бейдж: новые уведомления, непрочитанные сообщения.

## HTML

```html
<span class="notice notice-accent notice--400">9</span>
<span class="notice notice-accent notice--400">99+</span>
<span class="notice notice-accent notice--100"></span>   <!-- точка-индикатор -->
```

В углу иконки:

```html
<span class="bell" style="position:relative;">
  <svg>…</svg>
  <span class="notice notice-accent notice--200" style="position:absolute;top:-6px;right:-6px;">5</span>
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
