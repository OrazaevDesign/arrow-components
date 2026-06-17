# Avatar / Picture

**Figma:** [UCYhMA1JeNUNuVGsxUEne7 → node 2001:122](https://www.figma.com/design/UCYhMA1JeNUNuVGsxUEne7/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B9-Elemets?node-id=2001-122)

> [!NOTE]
> `avatar-picture.md` — **author-owned**. ACB пишет первичный draft, потом не трогает. CSS (`avatar.css`) и preview генерируются и при refresh затрутся.

Аватар с фото пользователя. Изображение заполняет круг (`object-fit: cover`), обрезается по кругу контейнером (`overflow: hidden` + `border-radius: 50%`).

## HTML

```html
<span class="avatar avatar-picture avatar--400">
  <img src="/uploads/user-123.jpg" alt="Анна Климова">
</span>
```

Всегда указывай `alt` (имя пользователя) — для доступности.

## Поведение

| Свойство | Значение |
|---|---|
| Изображение | `width/height: 100%`, `object-fit: cover` |
| Обрезка | круг (`overflow: hidden` + `border-radius: 50%`) |
| Кольцо | `primary-container-on-lowest` (1px, `::after` — видно поверх фото) |
| Фон (пока фото грузится) | градиент `primary-container-*` |
| Скругление | 50% (всегда круг) |

## Размеры

`.avatar--{N}` — см. SKILL.md. По умолчанию `avatar--400`.

## Refresh

```
обнови awds-component-avatar под Figma
```
