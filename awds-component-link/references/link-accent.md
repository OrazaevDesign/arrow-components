# Link / Accent

**Источник:** ArrowDS токены `State/*/link/accent` (без отдельной Figma-ноды).

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
| Hover | `rgb(var(--accent-container-on))` |
| Focus | + `outline: 2px solid rgb(var(--surface-on-highest))` |

Размер/шрифт наследуются. Disabled нет.

## Refresh

```
обнови awds-component-link под Figma
```
