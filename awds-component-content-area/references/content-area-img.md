# Content Area — Image

Медиа-область с растровым изображением. Способ вписывания выбирается модификатором. Hairline-рамка по краю.

**Figma:** [var=img](https://www.figma.com/design/UCYhMA1JeNUNuVGsxUEne7/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B9-Elemets?node-id=2221-69)

## HTML

```html
<figure class="content-area content-area--img content-area--4-3 content-area--fit-cover">
  <img class="content-area__img" src="/path/photo.jpg" alt="Описание">
</figure>
```

`<figure>` семантичнее для медиа, но подойдёт и `<div>`. Всегда указывайте `alt`.

## Вписывание (`object-fit`)

| Модификатор | object-fit | Когда |
|---|---|---|
| `content-area--fit-cover` (дефолт) | `cover` | Заполнить область, обрезав лишнее — фото, обложки |
| `content-area--fit-contain` | `contain` | Показать целиком, letterbox — логотипы, скриншоты, диаграммы |
| `content-area--fit-fill` | `fill` | Растянуть под бокс без пропорций (редко) |

Точка привязки при `cover` — через переменную (по умолчанию `center`):

```html
<figure class="content-area content-area--img content-area--16-9"
        style="--awds-content-area-position: top">
  <img class="content-area__img" src="…" alt="…">
</figure>
```

## Соотношение сторон

Класс-хелпер (`content-area--16-9`, `--4-3`, `--1-1`, `--a4-portrait`…) или произвольное через `style="--awds-content-area-ratio: 7/3"`. Полный список — в [SKILL.md](../SKILL.md).

## Правила

- Изображение всегда `.content-area__img` — оно абсолютно заполняет бокс; геометрию задаёт соотношение, не сама картинка.
- Для ретины давайте `srcset` / достаточное разрешение: при `cover` картинка масштабируется до бокса.
- Lezy-loading: добавьте `loading="lazy"` на `<img>` для внеэкранных областей.

## CSS

Полный CSS — [content-area.css](content-area.css), секции `Base`, `Variant: img`.
