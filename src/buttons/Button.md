# Button / Primary

**Figma:** [rRCDPR2SJ90wJZCr5rsXAd → node 1-757](https://www.figma.com/design/rRCDPR2SJ90wJZCr5rsXAd/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B2-Buttons?node-id=1-757)

Главный призыв к действию. На экран/секцию — одна Primary-кнопка.

---

## Подключение

```html
<link rel="stylesheet" href="tokens/variables.css" />
<link rel="stylesheet" href="src/buttons/Button.css" />
```

---

## HTML

### Только текст
```html
<button class="btn btn--primary btn--400" type="button">
  <span class="btn__label">Кнопка</span>
</button>
```

### Иконка слева
```html
<button class="btn btn--primary btn--400" type="button">
  <span class="btn__prefix" aria-hidden="true"><!-- svg --></span>
  <span class="btn__label">Кнопка</span>
</button>
```

### Иконка справа
```html
<button class="btn btn--primary btn--400" type="button">
  <span class="btn__label">Кнопка</span>
  <span class="btn__suffix" aria-hidden="true"><!-- svg --></span>
</button>
```

### Только иконка
```html
<button class="btn btn--primary btn--icon btn--400" type="button" aria-label="Действие">
  <span class="btn__icon" aria-hidden="true"><!-- svg --></span>
</button>
```

### Загрузка (Progress=True)
```html
<button class="btn btn--primary btn--400" type="button" disabled aria-busy="true">
  <span class="btn__spinner" aria-hidden="true"></span>
  <span class="btn__label">Загрузка...</span>
</button>
```

### Как ссылка
```html
<a class="btn btn--primary btn--400" href="/action">
  <span class="btn__label">Кнопка</span>
</a>
```

---

## Размеры

| Класс | Высота | Шрифт |
|---|---|---|
| `btn--600` | 52px | 16px |
| `btn--500` | 48px | 15px |
| `btn--400` | 40px | 14px |
| `btn--300` | 36px | 13px |
| `btn--200` | 32px | 12px |
| `btn--100` | 24px | 12px |
| `btn--50` | 20px | 12px |

---

## Состояния

| Состояние | Как получить |
|---|---|
| Rest | По умолчанию |
| Hover | `:hover` (автоматически) |
| Focus | `:focus-visible` — обводка `var(--color-focus-outline)` |
| Active | `:active` (автоматически) |
| Disabled | Атрибут `disabled` |
| Loading | `disabled` + `aria-busy="true"` + `.btn__spinner` |
