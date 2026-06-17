# Link / Muted

**Источник:** ArrowDS токены `State/*/link/muted` (без отдельной Figma-ноды).

> [!NOTE]
> `link-muted.md` — **author-owned**. ACB пишет первичный draft, потом не трогает.

Приглушённая ссылка (нейтральный серый) — футер, второстепенная навигация, мета-информация. На hover контрастнее.

## HTML

```html
<nav class="footer-links">
  <a class="lnk lnk-muted" href="/about">О компании</a>
  <a class="lnk lnk-muted" href="/contacts">Контакты</a>
</nav>
```

## Состояния

| Состояние | color |
|---|---|
| Rest / Focus / Active | `rgb(var(--surface-on-high))` |
| Hover | `rgb(var(--surface-on-highest))` |
| Focus | + `outline: 2px solid rgb(var(--surface-on-highest))` |

Размер/шрифт наследуются. Disabled нет.

## Refresh

```
обнови awds-component-link под Figma
```
