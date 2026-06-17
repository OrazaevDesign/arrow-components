# Link / Heading

**Источник:** ArrowDS токены `State/*/link/heading` (без отдельной Figma-ноды).

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
| Focus | + `outline: 2px solid rgb(var(--surface-on-highest))` |

Подчёркивания нет (`text-decoration-line: none`). Размер/вес наследуются от заголовка. Disabled нет.

## Refresh

```
обнови awds-component-link под Figma
```
