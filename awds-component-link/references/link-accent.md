# Link / Accent

**Источник:** [💠 arrow ↪ components → 4 · elements → ↪ link → `link / accent`](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=454-3489) · значения — ячейки `link/accent-*` темы 21 (студия), в коде читаются ролями с якорями `#cell`.

> [!NOTE]
> `link-accent.md` — **author-owned**. ACB пишет первичный draft, потом не трогает.

Нейтральная ссылка, которая «загорается» акцентом на hover — для интерактивных списков, тегов, элементов, где hover-акцент важнее постоянной заметности.

## HTML

```html
<p>Узнать <a class="lnk lnk-accent" href="/brand">подробнее о бренде</a>.</p>
```

## Состояния

| Состояние | color |
|---|---|
| Rest / Focus / Active | `rgb(var(--surface-on-highest))` |
| Hover | `rgb(var(--accent-core))` |
| Focus | + `outline: var(--awds-focus-width) solid var(--awds-focus-color)` |

Размер/шрифт наследуются. Disabled нет.

## Refresh

```
обнови awds-component-link под Figma
```
