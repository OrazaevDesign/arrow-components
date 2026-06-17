# Link / Default

**Источник:** ArrowDS токены `State/*/link/default` (без отдельной Figma-ноды).

> [!NOTE]
> `link-default.md` — **author-owned**. ACB пишет первичный draft, потом не трогает. CSS и preview генерируются и при refresh затрутся.

Обычная инлайн-ссылка в тексте. Брендовый цвет (роль tertiary), подчёркнута.

## HTML

```html
<p>Читайте <a class="lnk lnk-default" href="/delivery">условия доставки</a> перед оформлением.</p>
```

С иконкой (масштабируется к размеру текста, `1em`):

```html
<a class="lnk lnk-default" href="https://github.com/…">GitHub
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 5h8v8M15 5L5 15"/></svg>
</a>
```

## Состояния

| Состояние | color |
|---|---|
| Rest / Focus / Active | `rgb(var(--tertiary-container-on-high))` |
| Hover | `rgb(var(--tertiary-container-on-highest))` |
| Focus | + `outline: 2px solid rgb(var(--surface-on-highest))` |

Размер и шрифт наследуются от окружающего текста. Disabled нет.

## Refresh

```
обнови awds-component-link под Figma
```
