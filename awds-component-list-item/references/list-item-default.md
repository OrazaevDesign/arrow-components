# List-item / Default

**Figma:** [470rar5EfRm4n14vHMXbpc → набор 8:59824](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=8-59824)
**Роль токенов:** `list/default`

> [!NOTE]
> Этот файл — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`list-item-default.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## Когда

Невыбранный пункт списка, который сам по себе является поверхностью: строка стоит на собственной подложке, а не поверх чужой.

Отличается от `transparent` тем, что подложка видна всегда, а текст в покое **намеренно приглушён** — строка читается как «ещё не выбрано». При наведении и фокусе текст выходит на полный контраст.

Не берётся внутри попапа или меню поверх готовой панели: там подложка строки сольётся с подложкой панели. Для этого — `transparent`.

## HTML

```html
<button type="button" class="list-item list-item-default list-item--400">
  <span class="list-item__content">
    <span class="list-item__title">Алматы</span>
  </span>
</button>
```

## Цвета

| Состояние | Фон | Рамка | Заголовок | Описание |
|---|---|---|---|---|
| Rest | `secondary-container-core` | `secondary-container-core` | `secondary-container-on-high` | `secondary-container-on-high` |
| Hover | `secondary-container-dim` | `secondary-dim` | `secondary-container-on-highest` | `secondary-container-on-high` |
| Focus | `secondary-container-core` | `secondary-container-core` | `secondary-container-on-highest` | `secondary-container-on-high` |
| Active | `secondary-container-core` | `secondary-container-core` | `secondary-container-on-highest` | `secondary-container-on-high` |

Галочка (`.list-item__check`): `primary-core` в покое.

## Замечания

**Пара с `default-selected`.** Геометрия и подложка совпадают, отличается только контраст текста — этим и показывается выбор. Держи их вместе: `default` для невыбранных строк, `default-selected` для выбранной.

**Рамка hover — `secondary-dim`, и это восстановленное значение.** В репозитории токенов у `list/default/border` в состоянии Hover стоит алиас `{form-control.secondary.dim}`, которого не существует (у `form-control` нет варианта `secondary`). Макет рендерит `#ededed`, что ровно равно `role.secondary.dim` — очевидно, опечатка неймспейса. Взято по значению; после правки токенов перегенерировать.

## Контраст

Пересчитано 26.09.2026 по текущим значениям темы.

- Заголовок в состоянии **Rest**: `secondary-container-on-high` (#6a6a6a) на `secondary-container-core` (#f5f5f5) — **4.96:1**, норма 4.5:1 пройдена.
- Описание в состоянии **Rest**: то же сочетание — **4.96:1**. До 26.09.2026 описание красилось ролью `secondary-container-on` и давало 2.78:1; владелец перевёл ячейку на `on-high`.

Прежние замеры (3.69:1) относились к старым значениям палитры и больше не верны.

## Геометрия, состояния, слоты

Общие для всей семьи и описаны в [SKILL.md](../SKILL.md): высота `2 × padding + line-height`, переключение горизонтали от слотов, `align-items: flex-start`, кольцо фокуса `primary-core` вписано в бокс (Inside + Accent), disabled — `opacity: 40%`.

## Refresh

```
обнови awds-component-list-item под Figma
```
