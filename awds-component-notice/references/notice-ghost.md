# Notice / Ghost

**Figma:** [UCYhMA1JeNUNuVGsxUEne7 → node 2093:592](https://www.figma.com/design/UCYhMA1JeNUNuVGsxUEne7/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B9-Elemets?node-id=2093-592)

> [!NOTE]
> `notice-ghost.md` — **author-owned**. ACB пишет первичный draft, потом не трогает.

Счётчик без фона — только число (роль `surface-on-high`). Когда подложка не нужна: число рядом с текстом/иконкой, на уже окрашенном контейнере.

## HTML

```html
<span class="notice notice-ghost notice--400">7</span>
```

## Цвета

| Свойство | Роль |
|---|---|
| Фон / обводка | `transparent` |
| Цвет числа | `surface-on-high` |

## Размеры

`.notice--{N}` — см. SKILL.md. По умолчанию `notice--400`. У ghost точка (`notice--100`) визуально не видна (фон прозрачный) — для индикатора-точки используй `primary`/`secondary`.

## Refresh

```
обнови awds-component-notice под Figma
```
