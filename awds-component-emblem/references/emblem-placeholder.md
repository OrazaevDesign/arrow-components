# Emblem / Placeholder

**Figma:** [470rar5EfRm4n14vHMXbpc → node 6:372](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=6-372)

> [!NOTE]
> `emblem-placeholder.md` — **author-owned**. ACB пишет первичный draft, потом не трогает. CSS (`emblem.css`) и preview генерируются и при refresh затрутся.

Эмблема-заглушка — когда нет ни фото, ни имени. Силуэт пользователя, приглушённый ячейкой `opacity/content/placeholder`.

Не путать с `emblem-icon`: там в круге стоит **произвольный** знак на светлой подложке, здесь — фиксированный силуэт человека на фирменной, и он живёт на всех десяти ступенях.

## HTML

```html
<span class="emb emb-placeholder emb--400">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
    <circle cx="12" cy="8" r="3.5"/>
    <path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6"/>
  </svg>
</span>
```

Иконку можно заменить на любую свою — CSS отвечает только за размер (60% диаметра) и приглушение.

## Поведение

| Свойство | Значение |
|---|---|
| Фон | градиент `primary-container-chroma` → `primary-container-core` |
| Кольцо | `primary-container-on-lowest` (1px, `::after`) |
| Цвет силуэта | `primary-container-on-high` |
| Размер силуэта | 60% диаметра |
| Непрозрачность | `var(--awds-state-opacity-content-placeholder)` |
| Скругление | `var(--awds-rounded-border-radius-full)` (всегда круг) |

## Размеры

`.emb--{N}` — см. SKILL.md. По умолчанию `emb--400`.

## Refresh

```
обнови awds-component-emblem под Figma
```
