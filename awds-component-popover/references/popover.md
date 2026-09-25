# Popover — панель с хвостом

Оболочка под произвольное содержимое: панель `surface-bright`, скругление `rounded-600` (10px), тень `elevation-3` и хвост-стрелка в сторону якоря. Внутри — что угодно: меню, календарь, фильтр, карточка-превью.

**Figma:** https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=77-58798 (набор `popover`)

## HTML

```html
<span class="pop pop--side-top">
  <span class="pop__tail"></span>
  <span class="pop__panel">
    <!-- содержимое: меню, календарь, фильтр -->
  </span>
</span>
```

Хвост идёт **перед** панелью: панель рисуется поверх и перекрывает его внутреннюю половину.

Сторона: `pop--side-top` (база) / `--side-bottom` / `--side-left` / `--side-right`.

С нативным показом (Baseline 2024) — тот же класс плюс атрибут:

```html
<button popovertarget="user-menu" type="button">Профиль</button>

<div class="pop pop--side-bottom" id="user-menu" popover>
  <span class="pop__tail"></span>
  <div class="pop__panel">
    <ul class="menu">…</ul>
  </div>
</div>
```

Позиционирование рядом с якорем остаётся на потребителе: anchor positioning вне планки Baseline 2024.

## Паддинга у панели нет

Отступы приносит содержимое — у списка свои, у календаря свои. Это не упущение, а то, как панель нарисована в макете: иначе у каждого потребителя складывались бы два паддинга.

```html
<span class="pop pop--side-bottom">
  <span class="pop__tail"></span>
  <span class="pop__panel">
    <ul class="menu" style="padding: var(--awds-space-1)">…</ul>
  </span>
</span>
```

## Стили

| Свойство | Значение |
|---|---|
| Фон панели / хвоста | `rgb(var(--surface-bright))` — ячейка `popover/bg` |
| Хайрлайн хвоста | `rgb(var(--extended-shadow-3))` — ячейка `popover/hairline` |
| Тень | `var(--awds-shadow-elevation-3)` |
| Скругление | `var(--awds-rounded-border-radius-600)` (10px) |
| Хвост | квадрат `var(--awds-space-2)` (8px), повёрнут на 45° |

## Состояния

Нет (статичный). Показ, скрытие и позиционирование — на стороне потребителя.
