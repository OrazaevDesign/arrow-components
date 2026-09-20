# Notice / Secondary

**Figma:** [470rar5EfRm4n14vHMXbpc → node 6:246](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=6-246) — секция `↪ notice` (5:31) страницы `4 · elements`

> [!NOTE]
> `notice-secondary.md` — **author-owned**. ACB пишет первичный draft, потом не трогает.

Нейтральный счётчик (роль secondary — приглушённый серый). Когда число нужно показать, но без яркого акцента.

## HTML

```html
<span class="notice notice-secondary notice--400">12</span>
```

## Цвета

| Свойство | Роль |
|---|---|
| Фон | `secondary-core` (+ sheen `secondary-chroma`) |
| Цвет числа | `secondary-on-dim` |

## Размеры

`.notice--{N}` — см. SKILL.md. По умолчанию `notice--400`.

## Refresh

```
обнови awds-component-notice под Figma
```
