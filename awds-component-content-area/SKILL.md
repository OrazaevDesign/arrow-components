---
name: awds-component-content-area
description: >
  Верстка медиа-области (Content Area) ArrowDS — HTML-разметка и CSS на токенах
  дизайн-системы. Используй ВСЕГДА при: добавлении области с фиксированным
  соотношением сторон под иллюстрацию / изображение / видео в разметку или
  PageCraft-блок, выборе типа контента (illustration / img / video), соотношения
  сторон (16:9, 4:3, 1:1, 9:16, A4, Letter, golden ratio…), способа вписывания
  картинки (cover / contain / fill), перекраске SVG-иллюстрации классами
  awds-ill-a…f, вставке embed видео (youtube / vimeo / rutube / vk), получении
  Figma-ссылки на компонент Content Area. 3 типа, 39 соотношений, статичный.
---

# Content Area (медиа-область) ArrowDS

Область с **фиксированным соотношением сторон** и скруглением под три типа контента: SVG-иллюстрация, растровое изображение, видео-embed. Ничего не хардкодит: радиус — `--awds-rounded-700`, цвета — роли. См. скилл `arrow-design-system`.

Компонент **статичный** (без hover/focus/disabled) и **бессhape-ный** (`shape=null`): «размер» — это соотношение сторон, а не size-токены.

## Тип контента (3)

| Тип | Класс | Что показывает | Особенности |
|---|---|---|---|
| **Illustration** | `content-area--illustration` | SVG-иллюстрация по центру (contain) | прозрачный фон; перекраска `awds-ill-*` |
| **Image** | `content-area--img` | растровое изображение | вписывание cover/contain/fill; hairline-рамка |
| **Video** | `content-area--video` | responsive iframe (youtube/vimeo/rutube/vk) | фон surface; hairline-рамка |

Детали каждого — [content-area-illustration.md](references/content-area-illustration.md), [content-area-img.md](references/content-area-img.md), [content-area-video.md](references/content-area-video.md).

## Соотношение сторон (39 + произвольное)

**Класс-хелпер** `content-area--{R}` переопределяет `--awds-content-area-ratio`. По умолчанию (без класса) — **16:9**.

- **Числовые (27):** `1-1 16-9 9-16 4-3 3-4 3-2 2-3 5-4 4-5 16-10 10-16 8-5 9-8 21-9 9-21 32-9 16-5 14-3 8-3 5-2 3-1 2-1 1-2 4-1 6-1 12-1 6-7`
- **Именованные (12):**
  - бумага: `a4-portrait a4-landscape a4-half-portrait a4-half-landscape letter-portrait letter-landscape letter-half-portrait letter-half-landscape`
  - золотое сечение: `golden-portrait golden-landscape golden-half-portrait golden-half-landscape`

**Произвольное соотношение** — инлайн-переменной, без класса:

```html
<figure class="content-area content-area--img" style="--awds-content-area-ratio: 7/3">…</figure>
```

## Структура разметки

```html
<!-- Иллюстрация (инлайн-SVG, перекраска) -->
<div class="content-area content-area--illustration content-area--16-9">
  <svg class="content-area__illustration" viewBox="0 0 267 207">
    <g class="awds-ill-b">…</g>
    <g class="awds-ill-a">…</g>
  </svg>
</div>

<!-- Изображение -->
<figure class="content-area content-area--img content-area--4-3 content-area--fit-cover">
  <img class="content-area__img" src="…" alt="…">
</figure>

<!-- Видео -->
<div class="content-area content-area--video content-area--16-9">
  <iframe class="content-area__video" src="https://www.youtube.com/embed/ID"
          title="…" allowfullscreen loading="lazy"></iframe>
</div>
```

## Перекраска иллюстрации (`awds-ill-a…f`)

Пять классов-слоёв на путях SVG. Цвет каждого — из CSS-переменной с DS-ролью по умолчанию; **колорпикер потребителя** переопределяет её инлайн (`style="--awds-ill-b: #ff5a00"`).

| Класс | Переменная | Дефолт-роль |
|---|---|---|
| `awds-ill-a` | `--awds-ill-a` | `primary-container-on-highest` (ink) |
| `awds-ill-b` | `--awds-ill-b` | `primary-core` (бренд) |
| `awds-ill-c` | `--awds-ill-c` | `primary-container-core` (светлый fill) |
| `awds-ill-d` | `--awds-ill-d` | `primary-dim` |
| `awds-ill-f` | `--awds-ill-f` | `primary-container-on-low` |

`a/b/c` сматчены с эталонным артворком (Figma), `d/f` — осмысленный бренд-fallback (в эталоне не задействованы). Только для **инлайн-SVG**; у `<img src="*.svg">` перекраска недоступна. Держите `preserveAspectRatio` дефолтным (не `none`). Подробнее — [content-area-illustration.md](references/content-area-illustration.md).

## Вписывание картинки (variant img)

`content-area--fit-cover` (дефолт) / `--fit-contain` / `--fit-fill`. Точка привязки — `style="--awds-content-area-position: top"`.

## Откуда берутся значения

| Что | Источник |
|---|---|
| Радиус | `var(--awds-rounded-700)` (12px Smooth) — из макета `border-radius/700` |
| Hairline-рамка (img/video) | `rgb(var(--extended-shadow) / 0.03)` — та же ring-строка, что в `--awds-shadow-elevation-*` (`0 0 0 1px #00000008`); шкала `--awds-opacity-*` от 5%, поэтому alpha — литерал |
| Фон video | `rgb(var(--surface-surface))` |
| Соотношение | `--awds-content-area-ratio` (хелпер или инлайн) |
| Дефолты перекраски | роли `primary-container-*` / `primary-*` |

## CSS

Один файл — `references/content-area.css` (база `.content-area` + типы `--illustration/--img/--video` + 39 соотношений + вписывание + `awds-ill-*`). Подключается один раз глобально.

Визуальный QA — `references/preview.html` (storybook, `file://`): активная конфигурация + сетка всех соотношений + демо перекраски. Переключатели тип / соотношение / вписывание / тема.

## Алгоритм использования

1. Выбери тип: `content-area--illustration` / `--img` / `--video`.
2. Собери разметку по шаблону; медиа-слой — `.content-area__illustration` / `__img` / `__video`.
3. Выбери соотношение: класс `content-area--{R}` или `style="--awds-content-area-ratio: W/H"`. Дефолт 16:9.
4. Для img — задай вписывание (`--fit-cover/contain/fill`). Для video — сконвертируй ссылку в embed-src (см. [content-area-video.md](references/content-area-video.md)). Для иллюстрации — при необходимости переопредели `--awds-ill-*`.
5. Подключи `references/content-area.css`. Нужны `css-variables.css` сайта (роли `--primary-*`, `--surface-surface`, `--extended-shadow`) и базовые токены DS (`--awds-rounded-*`).

## Refresh

```
обнови awds-component-content-area под Figma
```

ACB зайдёт в Figma по ссылкам (`component.meta.json → figma`), сравнит снапшот, обновит `content-area.css` + preview. Документация (этот файл и `{variant}.md`) — не трогается.
