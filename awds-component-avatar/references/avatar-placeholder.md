# Avatar / Placeholder

**Figma:** [UCYhMA1JeNUNuVGsxUEne7 → node 2001:102](https://www.figma.com/design/UCYhMA1JeNUNuVGsxUEne7/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B9-Elemets?node-id=2001-102)

> [!NOTE]
> `avatar-placeholder.md` — **author-owned**. ACB пишет первичный draft, потом не трогает. CSS (`avatar.css`) и preview генерируются и при refresh затрутся.

Аватар-заглушка — когда нет ни фото, ни имени. Силуэт-иконка пользователя, приглушённая до 60% непрозрачности.

## HTML

```html
<span class="avatar avatar-placeholder avatar--400">
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
| Цвет иконки | `primary-container-on` |
| Размер иконки | 60% диаметра |
| Непрозрачность иконки | `var(--awds-opacity-60)` |
| Скругление | 50% (всегда круг) |

## Размеры

`.avatar--{N}` — см. SKILL.md. По умолчанию `avatar--400`.

## Refresh

```
обнови awds-component-avatar под Figma
```
