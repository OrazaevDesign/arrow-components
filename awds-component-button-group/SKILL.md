---
name: awds-component-button-group
description: Button Group ArrowDS (.btn-group).
---

# Button Group ArrowDS

Обёртка, склеивающая несколько `.btn` в один сегментированный контрол.

**Компонент состоит из трёх правил CSS и ни одного собственного значения.**
Это не упрощение — это результат проверки: `get_variable_defs` на группе
(нода `1:6593`) возвращает исключительно токены вложенных кнопок, а группы
`button-group` в слое State темы нет вовсе.

## Разметка

```html
<div class="btn-group">
  <button class="btn btn-primary btn--600" type="button">Button</button>
  <button class="btn btn-primary btn--600 btn--icon-only" type="button" aria-label="Ещё">
    <svg viewBox="0 0 20 20" aria-hidden="true">…</svg>
  </button>
</div>
```

Вариант (`btn-primary`) и размер (`btn--600`) — на каждой кнопке. У группы
классов варианта и размера **нет**.

## Что делает группа

| Правило | Зачем |
| --- | --- |
| `display: inline-flex; align-items: center` | кнопки встык, `gap` не задаётся |
| радиус стыка → `0` через `:not(:first-child)` / `:not(:last-child)` | внешние углы остаются теми, что дала ступень кнопки; группа не знает радиус |
| `> :focus-visible { z-index: 1 }` | кольцо фокуса не подрезается соседом |
| `isolation: isolate` | `z-index` не вылезает за пределы группы |

Скругление именно **гасится**, а не назначается: иначе группе пришлось бы
ссылаться на приватный аккумулятор кнопки `--awds-btn-rounded` и тем самым
делать его контрактом.

## Раскладки из макета

Ось `side=` в Figma классом не стала — где стоит иконочная кнопка, видно из
порядка узлов:

| `side=` в макете | Разметка |
| --- | --- |
| `end` | `[текст][иконка]` |
| `start` | `[иконка][текст]` |
| `startend` | `[иконка][текст][иконка]` |

## Зависимости

`awds-component-button` — группа без кнопок бессмысленна, а всё оформление
приходит от них. Кольцо фокуса — через `awds-component-focus-selection`, как у
всех.

## Reference

- [references/button-group.md](references/button-group.md) — разметка, что делает CSS, чего в компоненте нет, вопрос про толщину шва.
- [references/button-group.css](references/button-group.css) — сам компонент, 3 правила.
- [references/preview.html](references/preview.html) — storybook: раскладки × варианты × ступени.
