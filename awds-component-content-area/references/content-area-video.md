# Content Area — Video

Медиа-область с видео-embed (responsive iframe). Фон `surface-surface` виден до загрузки кадра, hairline-рамка по краю. Поддерживаемые провайдеры: **YouTube, Vimeo, Rutube, VK Video**.

**Figma:** [var=video](https://www.figma.com/design/UCYhMA1JeNUNuVGsxUEne7/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B9-Elemets?node-id=2221-71)

> В макете video-вариант — плейсхолдер с play-кнопкой (facade). Здесь реализован как **прямой responsive iframe** (решение автора): iframe вписан в aspect-ratio-бокс, грузится сразу. Facade (превью + клик-загрузка) можно добавить на стороне потребителя.

## HTML

```html
<div class="content-area content-area--video content-area--16-9">
  <iframe class="content-area__video"
          src="https://www.youtube.com/embed/VIDEO_ID"
          title="Название ролика"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          loading="lazy"></iframe>
</div>
```

Ратио видео почти всегда `16-9` (`--9-16` для вертикальных shorts/клипов).

## Embed-URL по провайдерам

Потребитель конвертирует «ссылку на страницу» → «embed src»:

| Провайдер | Ссылка на страницу | `src` для iframe |
|---|---|---|
| **YouTube** | `youtube.com/watch?v=ID` или `youtu.be/ID` | `https://www.youtube.com/embed/ID` |
| **Vimeo** | `vimeo.com/ID` | `https://player.vimeo.com/video/ID` |
| **Rutube** | `rutube.ru/video/ID/` | `https://rutube.ru/play/embed/ID` |
| **VK Video** | `vk.com/video{OWNER_ID}_{VIDEO_ID}` | `https://vk.com/video_ext.php?oid={OWNER_ID}&id={VIDEO_ID}&hd=2` |

`ID` — идентификатор из ссылки. Для VK нужны и `oid` (владелец, часто отрицательный для сообществ), и `id`.

## Правила

- Всегда `.content-area__video` на `<iframe>` — он заполняет бокс, `border:0`.
- `title` на iframe обязателен (доступность). `allowfullscreen` — для полноэкранного режима.
- `loading="lazy"` откладывает загрузку внеэкранных плееров.
- Для приватности/скорости используйте no-cookie домены, где есть: YouTube — `youtube-nocookie.com/embed/ID`.

## CSS

Полный CSS — [content-area.css](content-area.css), секции `Base`, `Variant: video`.
