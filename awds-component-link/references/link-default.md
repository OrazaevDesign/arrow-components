# Link / Default

**Источник:** [💠 arrow ↪ components → 4 · elements → ↪ link → `link / default`](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=453-3471) · значения — ячейки `link/default-*` темы 21 (студия), в коде читаются ролями с якорями `#cell`.

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
| Rest / Focus / Active | `rgb(var(--tertiary-on))` |
| Hover | `rgb(var(--accent-core))` |
| Focus | + `outline: var(--awds-focus-width) solid var(--awds-focus-color)` |

Размер и шрифт наследуются от окружающего текста. Disabled нет.

## Refresh

```
обнови awds-component-link под Figma
```
