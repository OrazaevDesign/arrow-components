# Emblem / Img

**Figma:** [470rar5EfRm4n14vHMXbpc → node 6:361](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=6-361)

> [!NOTE]
> `emblem-img.md` — **author-owned**. ACB пишет первичный draft, потом не трогает. CSS (`emblem.css`) и preview генерируются и при refresh затрутся.

Эмблема с фото пользователя. Изображение заполняет круг (`object-fit: cover`), обрезается по кругу контейнером (`overflow: hidden` + полный радиус).

## HTML

```html
<span class="emb emb-img emb--400">
  <img src="/uploads/user-123.jpg" alt="Анна Климова">
</span>
```

Всегда указывай `alt` (имя пользователя) — для доступности.

## Поведение

| Свойство | Значение |
|---|---|
| Изображение | `width/height: 100%`, `object-fit: cover` |
| Обрезка | круг (`overflow: hidden` + `var(--awds-rounded-border-radius-full)`) |
| Кольцо | `primary-container-on-lowest` (1px, `::after` — видно поверх фото) |
| Фон (пока фото грузится) | градиент `primary-container-*` |
| Скругление | `var(--awds-rounded-border-radius-full)` (всегда круг) |

## Размеры

`.emb--{N}` — см. SKILL.md. По умолчанию `emb--400`.

## Refresh

```
обнови awds-component-emblem под Figma
```
