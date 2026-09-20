# Link / Heading

**Источник:** [💠 arrow ↪ components → 4 · elements → ↪ link → `link / heading`](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=454-3498) · значения — ячейки `link/heading-*` темы 21 (студия), в коде читаются ролями с якорями `#cell`.

> [!NOTE]
> `link-heading.md` — **author-owned**. ACB пишет первичный draft, потом не трогает.

Кликабельный заголовок (ссылка-обёртка вокруг title карточки/статьи). **Без подчёркивания** (заголовки не подчёркивают), цвет нейтральный и «загорается» акцентом на hover. Размер и вес наследует от заголовка, в который вложен.

## HTML

```html
<h3><a class="lnk lnk-heading" href="/article/123">Как мы тестируем технику перед отправкой</a></h3>
```

## Состояния

| Состояние | color |
|---|---|
| Rest / Focus / Active | `rgb(var(--surface-on-high))` |
| Hover | `rgb(var(--accent-container-on))` |
| Focus | + `outline: var(--awds-focus-width) solid var(--awds-focus-color)` |

Подчёркивания нет (`text-decoration-line: none`). Размер/вес наследуются от заголовка. Disabled нет.

## Refresh

```
обнови awds-component-link под Figma
```
