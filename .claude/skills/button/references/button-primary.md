# Button / Primary

**Figma:** [rRCDPR2SJ90wJZCr5rsXAd → node 1:757](https://www.figma.com/design/rRCDPR2SJ90wJZCr5rsXAd/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B2-Buttons?node-id=1-757)

Главный призыв к действию. На экране/секции — только одна Primary-кнопка.

---

## HTML

### Только текст
```html
<button class="btn btn-primary btn--400" type="button">
  Текст кнопки
</button>
```

### Иконка слева
```html
<button class="btn btn-primary btn--400" type="button">
  <svg width="20" height="20" aria-hidden="true"><!-- icon --></svg>
  Текст кнопки
</button>
```

### Иконка справа
```html
<button class="btn btn-primary btn--400" type="button">
  Текст кнопки
  <svg width="20" height="20" aria-hidden="true"><!-- icon --></svg>
</button>
```

### Только иконка (квадратная)
```html
<button class="btn btn-primary btn--400 btn--icon-only" type="button" aria-label="Действие">
  <svg width="20" height="20" aria-hidden="true"><!-- icon --></svg>
</button>
```

### Состояние загрузки
```html
<button class="btn btn-primary btn--400" type="button" disabled aria-busy="true">
  <svg class="btn__spinner" width="20" height="20" aria-hidden="true"><!-- spinner --></svg>
  Загрузка...
</button>
```

### Как ссылка
```html
<a class="btn btn-primary btn--400" href="/action">
  Текст кнопки
</a>
```

---

## CSS

```css
/* ─────────────────────────────────────────────────
   Base — добавь один раз в глобальный buttons.css
   ───────────────────────────────────────────────── */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--_gap, 6px);
  padding: var(--_pv, 10px) var(--_ph, 16px);
  border: 1px solid var(--_border);
  border-radius: var(--_rounded, 8px);
  background: linear-gradient(to right, var(--_chroma, var(--_bg)), var(--_bg));
  color: var(--_color);
  font-size: var(--_fs, 14px);
  line-height: var(--_lh, 20px);
  font-weight: 600;
  letter-spacing: 0;
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
  -webkit-font-smoothing: antialiased;
}

.btn:disabled,
.btn[aria-disabled="true"] {
  opacity: 0.4;
  pointer-events: none;
}

.btn:focus-visible {
  outline: 2px solid var(--color-surface-on-highest);
  outline-offset: 2px;
}

.btn svg {
  width: var(--_icon, 20px);
  height: var(--_icon, 20px);
  flex-shrink: 0;
}

.btn--icon-only {
  aspect-ratio: 1;
  padding: var(--_pv);
}

/* ─────────────────────────────────────────────────
   Sizes — общие для всех вариантов кнопок
   Высоты: 52 / 48 / 40 / 36 / 32 / 24 / 20 px
   ───────────────────────────────────────────────── */
.btn--600 { --_pv:16px; --_ph:24px; --_gap:8px;  --_rounded:var(--rounded-600,10px); --_fs:16px; --_lh:20px; --_icon:20px; }
.btn--500 { --_pv:14px; --_ph:20px; --_gap:6px;  --_rounded:var(--rounded-500,8px);  --_fs:16px; --_lh:20px; --_icon:20px; }
.btn--400 { --_pv:10px; --_ph:16px; --_gap:6px;  --_rounded:var(--rounded-400,8px);  --_fs:14px; --_lh:20px; --_icon:20px; }
.btn--300 { --_pv:8px;  --_ph:14px; --_gap:6px;  --_rounded:var(--rounded-300,6px);  --_fs:14px; --_lh:20px; --_icon:20px; }
.btn--200 { --_pv:8px;  --_ph:12px; --_gap:4px;  --_rounded:var(--rounded-200,6px);  --_fs:13px; --_lh:16px; --_icon:16px; }
.btn--100 { --_pv:4px;  --_ph:6px;  --_gap:2px;  --_rounded:var(--rounded-100,6px);  --_fs:13px; --_lh:16px; --_icon:16px; }
.btn--50  { --_pv:2px;  --_ph:4px;  --_gap:2px;  --_rounded:var(--rounded-50,4px);   --_fs:12px; --_lh:16px; --_icon:16px; }

/* ─────────────────────────────────────────────────
   Button / Primary
   Figma node 1:757 — rRCDPR2SJ90wJZCr5rsXAd
   ───────────────────────────────────────────────── */
.btn-primary {
  --_bg:     var(--color-primary-core);
  --_chroma: var(--color-primary-chroma);
  --_border: var(--color-primary-core);
  --_color:  var(--color-primary-on);
}

.btn-primary:hover {
  --_bg:     var(--color-primary-dim);
  --_border: var(--color-primary-dim);
}

.btn-primary:active {
  /* Active — градиент → сплошной (chroma = bg) */
  --_chroma: var(--color-primary-core);
}
```

---

## Состояния

| Состояние | `--_bg` | `--_border` | `--_chroma` |
|---|---|---|---|
| Rest | `--color-primary-core` | `--color-primary-core` | `--color-primary-chroma` |
| Hover | `--color-primary-dim` | `--color-primary-dim` | `--color-primary-chroma` |
| Focus | `--color-primary-core` | `--color-primary-core` | `--color-primary-chroma` |
| Active | `--color-primary-core` | `--color-primary-core` | `--color-primary-core` |
| Disabled | (rest + `opacity: 0.4`) | | |

Фокус-обводка: `outline: 2px solid var(--color-surface-on-highest); outline-offset: 2px`

---

## Анимация загрузки (Progress)

```css
@keyframes btn-spin {
  to { transform: rotate(360deg); }
}
.btn__spinner {
  animation: btn-spin 0.8s linear infinite;
}
```
