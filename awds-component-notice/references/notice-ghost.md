# Notice / Ghost

**Figma:** [470rar5EfRm4n14vHMXbpc → node 6:263](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=6-263) — секция `↪ notice` (5:31) страницы `4 · elements`

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

`.notice--{N}` — см. SKILL.md. По умолчанию `notice--400`. У ghost точка (`notice--100`) визуально не видна (фон прозрачный) — для индикатора-точки используй `accent`/`secondary`.

## Refresh

```
обнови awds-component-notice под Figma
```
