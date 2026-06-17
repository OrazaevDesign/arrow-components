---
name: awds-component-avatar
description: >
  Верстка аватаров ArrowDS — HTML-разметка и CSS на токенах дизайн-системы.
  Используй ВСЕГДА при: добавлении аватара пользователя в разметку или PageCraft-блок,
  выборе типа аватара (initials / placeholder / picture), вопросах о стилях avatar / размерах,
  получении Figma-ссылки на компонент Avatar. Круглый, 3 типа × 10 размеров, статичный.
---

# Аватары ArrowDS

Круглый аватар пользователя. Ничего не хардкодит: диаметр — base space-шкала, типографика инициалов — Control-шкала, цвета — роли `primary-container-*`. См. скилл `arrow-design-system`.

## Типы (3)

| Тип | Reference | Что показывает |
|---|---|---|
| **Initials** | `references/avatar-initials.md` ✅ | Инициалы пользователя (текст, напр. «АК») — когда нет фото |
| **Placeholder** | `references/avatar-placeholder.md` ✅ | Силуэт-иконка (60% opacity) — когда нет ни фото, ни имени |
| **Picture** | `references/avatar-picture.md` ✅ | Фото пользователя (`<img>`, обрезано в круг) |

Все три используют **один цветовой набор** (`primary-container-*`) и одну размерную шкалу — различаются только содержимым. Состояний нет (аватар статичный).

## Откуда берутся значения

| Что | Источник |
|---|---|
| Фон | `rgb(var(--primary-container-core))` + sheen `rgb(var(--primary-container-chroma))` |
| Кольцо | `rgb(var(--primary-container-on-lowest))` (через `::after` inset box-shadow) |
| Инициалы / иконка | `rgb(var(--primary-container-on))` |
| Иконка placeholder | + `opacity: var(--awds-opacity-60)` |
| Диаметр | `var(--awds-space-N)` (24–64; для 72 — `calc(space-16 + space-2)`) |
| Размер инициалов | `var(--awds-control-N-font-size / -line-height / -letter-spacing)` |
| Скругление | `50%` — аватар **всегда круглый**, не зависит от темы Rounded |

> Диаметры — это собственная шкала аватара (50–700 → 24–72px). В DS нет shape-слоя `avatar`, поэтому размеры ссылаются на базовые шкалы (`--awds-space-*`, `--awds-control-*`) напрямую, а не через `var(--awds-{shape}-N-*)`. Инициалы используют **Control**-шкалу (фикс), а не `--awds-typography-*` (та респонсивная и расходится с макетом).

## Размеры (10)

`.avatar--{N}`, где N — `700 600 500 400 300 250 200 150 100 50`. Диаметр от 72px (700) до 24px (50). По умолчанию — `avatar--400` (48px).

| Класс | Ø | Класс | Ø |
|---|---|---|---|
| `avatar--700` | 72px | `avatar--250` | 40px |
| `avatar--600` | 64px | `avatar--200` | 36px |
| `avatar--500` | 56px | `avatar--150` | 32px |
| `avatar--400` | 48px | `avatar--100` | 28px |
| `avatar--300` | 44px | `avatar--50` | 24px |

## CSS

Один файл — `references/avatar.css` (база `.avatar` + кольцо `::after` + типы `.avatar-{initials,placeholder,picture}` + 10 размеров). Подключается один раз глобально.

Визуальный QA — `references/preview.html` (storybook, `file://`): матрица размер × тип + пример стопки с наложением.

## Алгоритм использования

1. Определи тип: есть фото → `picture`; есть имя → `initials`; ничего → `placeholder`.
2. Разметка (контейнер — `<span>`, инлайновый):
   - `<span class="avatar avatar-initials avatar--400">АК</span>`
   - `<span class="avatar avatar-placeholder avatar--400"><svg>…</svg></span>`
   - `<span class="avatar avatar-picture avatar--400"><img src="…" alt="Имя"></span>`
3. Подключи `references/avatar.css`. Нужны `css-variables.css` сайта (роли `--primary-container-*`) и базовые токены DS (`--awds-space-*`, `--awds-control-*`, `--awds-opacity-*`, `--awds-font-*`).
4. Добавь размер `.avatar--{N}` (по умолчанию `avatar--400`).

## Refresh

```
обнови awds-component-avatar под Figma
```

ACB зайдёт в Figma по ссылке (`component.meta.json`), сравнит снапшот, обновит `avatar.css` + preview. Документация (этот файл и `{type}.md`) — не трогается.
