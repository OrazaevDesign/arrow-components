# Emblem / Initials

**Figma:** [470rar5EfRm4n14vHMXbpc → node 6:340](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=6-340)

> [!NOTE]
> `emblem-initials.md` — **author-owned**. ACB пишет первичный draft, потом не трогает. CSS (`emblem.css`) и preview генерируются и при refresh затрутся.

Эмблема с инициалами — когда нет фото пользователя, но есть имя. Текст центрируется, приводится к верхнему регистру, цвет `primary-container-on-high`, размер — Control-шкала по размеру эмблемы.

## HTML

```html
<span class="emb emb-initials emb--400">АК</span>
```

Обычно 1–2 буквы (имя + фамилия). Регистр приводится автоматически (`text-transform: uppercase`).

## Поведение

| Свойство | Значение |
|---|---|
| Фон | градиент `primary-container-chroma` → `primary-container-core` |
| Кольцо | `primary-container-on-lowest` (1px, `::after`) |
| Цвет текста | `primary-container-on-high` |
| Размер текста | `var(--awds-control-N-*)` по размеру (700→950/28px … 50→600/16px) |
| Скругление | `var(--awds-rounded-border-radius-full)` (всегда круг) |

## Размеры

`.emb--{N}` — см. SKILL.md (700=80px … 50=24px). По умолчанию `emb--400`.

## Refresh

```
обнови awds-component-emblem под Figma
```
