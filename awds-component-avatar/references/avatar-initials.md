# Avatar / Initials

**Figma:** [UCYhMA1JeNUNuVGsxUEne7 → node 2001:82](https://www.figma.com/design/UCYhMA1JeNUNuVGsxUEne7/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B9-Elemets?node-id=2001-82)

> [!NOTE]
> `avatar-initials.md` — **author-owned**. ACB пишет первичный draft, потом не трогает. CSS (`avatar.css`) и preview генерируются и при refresh затрутся.

Аватар с инициалами — когда нет фото пользователя, но есть имя. Текст центрируется, приводится к верхнему регистру, цвет `primary-container-on`, размер — Control-шкала по размеру аватара.

## HTML

```html
<span class="avatar avatar-initials avatar--400">АК</span>
```

Обычно 1–2 буквы (имя + фамилия). Регистр приводится автоматически (`text-transform: uppercase`).

## Поведение

| Свойство | Значение |
|---|---|
| Фон | градиент `primary-container-chroma` → `primary-container-core` |
| Кольцо | `primary-container-on-lowest` (1px, `::after`) |
| Цвет текста | `primary-container-on` |
| Размер текста | `var(--awds-control-N-*)` по размеру (700→950/28px … 50→600/16px) |
| Скругление | 50% (всегда круг) |

## Размеры

`.avatar--{N}` — см. SKILL.md (700=72px … 50=24px). По умолчанию `avatar--400`.

## Refresh

```
обнови awds-component-avatar под Figma
```
