---
name: awds-component-content-area
description: Content Area ArrowDS (.content-area).
---

# Content Area (медиа-область) ArrowDS

Область с **фиксированным соотношением сторон** и скруглением под три типа контента: брендовая иллюстрация, изображение (jpg/png/svg) и видео-embed. Ничего не хардкодит: радиус — `--awds-rounded-border-radius-700`, цвета — роли. См. скилл `arrow-design-system`.

Компонент **статичный** (без hover/focus/disabled) и **бессhape-ный** (`shape=null`): «размер» — это соотношение сторон, а не size-токены.

## Тип контента (3)

| Тип | Класс | Что показывает | Особенности |
|---|---|---|---|
| **Illustration** | `content-area-illustration` | брендовый вектор | без рамки и фона; вписывание всегда contain |
| **Image** | `content-area-img` | изображение jpg/png/svg | вписывание cover/contain/fill; hairline-рамка |
| **Video** | `content-area-video` | responsive iframe (youtube/vimeo/rutube/vk) | фон surface; hairline-рамка |

Детали каждого — [content-area-illustration.md](references/content-area-illustration.md), [content-area-img.md](references/content-area-img.md), [content-area-video.md](references/content-area-video.md).

> **Перекраски SVG у компонента нет.** Рисунок остаётся ассетом потребителя; API `awds-ill-*` не заводится. Тип `illustration` отвечает только за бокс: снимает рамку и фон, которые есть у `img`, и вписывает рисунок целиком. Раньше иллюстрации предлагалось вставлять как `content-area-img` с `--fit-contain` — так вокруг прозрачного рисунка оставалась hairline-рамка, которой в макете нет (возвращено 28.08.2026).

## Соотношение сторон (39 + произвольное)

**Класс-хелпер** `content-area--{R}` переопределяет `--awds-content-area-ratio`. По умолчанию (без класса) — **16:9**.

- **Числовые (27):** `1-1 16-9 9-16 4-3 3-4 3-2 2-3 5-4 4-5 16-10 10-16 8-5 9-8 21-9 9-21 32-9 16-5 14-3 8-3 5-2 3-1 2-1 1-2 4-1 6-1 12-1 6-7`
- **Именованные (12):**
  - бумага: `a4-portrait a4-landscape a4-half-portrait a4-half-landscape letter-portrait letter-landscape letter-half-portrait letter-half-landscape`
  - золотое сечение: `golden-portrait golden-landscape golden-half-portrait golden-half-landscape`

**Произвольное соотношение** — инлайн-переменной, без класса:

```html
<figure class="content-area content-area-img" style="--awds-content-area-ratio: 7/3">…</figure>
```

## Структура разметки

```html
<!-- Брендовая иллюстрация: без рамки и фона -->
<figure class="content-area content-area-illustration content-area--16-9">
  <img class="content-area__img" src="/assets/illustrations/megaphone.svg" alt="">
</figure>

<!-- Изображение (jpg/png/svg) -->
<figure class="content-area content-area-img content-area--4-3 content-area--fit-cover">
  <img class="content-area__img" src="…" alt="…">
</figure>

<!-- Видео -->
<div class="content-area content-area-video content-area--16-9">
  <iframe class="content-area__video" src="https://www.youtube.com/embed/ID"
          title="…" allowfullscreen loading="lazy"></iframe>
</div>
```

## Вписывание картинки (variant img)

`content-area--fit-cover` (дефолт) / `--fit-contain` / `--fit-fill`. Точка привязки — `style="--awds-content-area-position: top"`. Для SVG-логотипов подойдёт `--fit-contain`; для брендовых иллюстраций есть отдельный тип `--illustration` — он вписывает целиком и вдобавок снимает рамку.

## Откуда берутся значения

| Что | Источник |
|---|---|
| Радиус | `var(--awds-rounded-border-radius-700)` (12px Smooth) — из макета `border-radius/700` |
| Hairline-рамка | `rgb(var(--extended-shadow) / 0.03)` — та же ring-строка, что в `--awds-shadow-elevation-*` (`0 0 0 1px #00000008`); шкала `--awds-opacity-*` от 5%, поэтому alpha — литерал |
| Фон video | `rgb(var(--surface-surface))` |
| Соотношение | `--awds-content-area-ratio` (хелпер или инлайн) |

## CSS

Один файл — `references/content-area.css` (база `.content-area` + типы `--illustration/--img/--video` + 39 соотношений + вписывание). Подключается один раз глобально.

Визуальный QA — `references/preview.html` (storybook, `file://`): активная конфигурация + сетка всех соотношений. Переключатели тип / соотношение / вписывание / тема.

## Алгоритм использования

1. Выбери тип: `content-area-illustration` (брендовый вектор) / `--img` (jpg/png/svg) / `--video`.
2. Собери разметку по шаблону; медиа-слой — `.content-area__img` / `.content-area__video`.
3. Выбери соотношение: класс `content-area--{R}` или `style="--awds-content-area-ratio: W/H"`. Дефолт 16:9.
4. Для img — задай вписывание (`--fit-cover/contain/fill`). Для video — сконвертируй ссылку в embed-src (см. [content-area-video.md](references/content-area-video.md)).
5. Подключи `references/content-area.css`. Нужны `css-variables.css` сайта (роли `--surface-surface`, `--extended-shadow`) и базовые токены DS (`--awds-rounded-*`).

## Refresh

```
обнови awds-component-content-area под Figma
```

ACB зайдёт в Figma по ссылкам (`component.meta.json → figma`), сравнит снапшот, обновит `content-area.css` + preview. Документация (этот файл и `{variant}.md`) — не трогается.
