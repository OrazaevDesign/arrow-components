# Link / Muted

**Источник:** [💠 arrow ↪ components → 4 · elements → ↪ link → `link / muted`](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=454-3471) · значения — ячейки `link/muted-*` темы 21 (студия), в коде читаются ролями с якорями `#cell`.

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
| Focus | + `outline: var(--awds-focus-width) solid var(--awds-focus-color)` |

Размер/шрифт наследуются. Disabled нет.

## Refresh

```
обнови awds-component-link под Figma
```
