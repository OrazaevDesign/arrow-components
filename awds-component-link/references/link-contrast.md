# Link / Contrast

**Источник:** [💠 arrow ↪ components → 4 · elements → ↪ link → `link / contrast`](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=454-3480) · значения — ячейки `link/contrast-*` темы 21 (студия), в коде читаются ролями с якорями `#cell`.

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
| Focus | + `outline: var(--awds-focus-width) solid var(--awds-focus-color)` |

Размер/шрифт наследуются. Disabled нет.

## Refresh

```
обнови awds-component-link под Figma
```
