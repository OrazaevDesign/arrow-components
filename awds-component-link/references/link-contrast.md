# Link / Contrast

**Источник:** ArrowDS токены `State/*/link/contrast` (без отдельной Figma-ноды).

> [!NOTE]
> `link-contrast.md` — **author-owned**. ACB пишет первичный draft, потом не трогает.

Максимально контрастная ссылка (почти чёрный текст) — когда ссылка должна читаться сильнее основного текста. На hover чуть мягче.

## HTML

```html
<p>Готовы? <a class="lnk lnk-contrast" href="/checkout">Купить сейчас</a>.</p>
```

## Состояния

| Состояние | color |
|---|---|
| Rest / Focus / Active | `rgb(var(--surface-on-highest))` |
| Hover | `rgb(var(--surface-on-high))` |
| Focus | + `outline: 2px solid rgb(var(--surface-on-highest))` |

Размер/шрифт наследуются. Disabled нет.

## Refresh

```
обнови awds-component-link под Figma
```
