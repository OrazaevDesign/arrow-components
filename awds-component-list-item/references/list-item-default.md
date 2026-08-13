# List-item / Default

**Figma:** [cPyLl9CqwylgJMzMzeyF5g → node 590:20398](https://www.figma.com/design/cPyLl9CqwylgJMzMzeyF5g/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B4-Lists?node-id=590-20398)
**Роль токенов:** `list/unselected`

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
| Rest | `secondary-container-core` | `secondary-container-core` | `secondary-container-on` | `secondary-container-on` |
| Hover | `secondary-container-dim` | `secondary-dim` | `secondary-container-on-highest` | `secondary-container-on-high` |
| Focus | `secondary-container-core` | `secondary-container-core` | `secondary-container-on-highest` | `secondary-container-on-high` |
| Active | `secondary-container-core` | `secondary-container-core` | `secondary-container-on-highest` | `secondary-container-on-high` |

Галочка (`.list-item__check`): `primary-container-on-lowest` в покое.

## Замечания

**Пара с `default-selected`.** Геометрия и подложка совпадают, отличается только контраст текста — этим и показывается выбор. Держи их вместе: `default` для невыбранных строк, `default-selected` для выбранной.

**Рамка hover — `secondary-dim`, и это восстановленное значение.** В репозитории токенов у `list/unselected/border` в состоянии Hover стоит алиас `{form-control.secondary.dim}`, которого не существует (у `form-control` нет варианта `secondary`). Макет рендерит `#ededed`, что ровно равно `role.secondary.dim` — очевидно, опечатка неймспейса. Взято по значению; после правки токенов перегенерировать.

## Контраст

- Заголовок в состоянии **Rest**: `secondary-container-on` (#808080) на `secondary-container-core` (#f7f7f7) — **3.69:1** при норме 4.5:1.
- Описание в состоянии **Rest**: `secondary-container-on` (#808080) на `secondary-container-core` (#f7f7f7) — **3.69:1** при норме 4.5:1.

Это свойство ролей дизайн-системы, а не вёрстки — чинится в токенах, не здесь.

## Геометрия, состояния, слоты

Общие для всей семьи и описаны в [SKILL.md](../SKILL.md): высота `2 × padding + line-height`, переключение горизонтали от слотов, `align-items: flex-start`, кольцо фокуса `surface-on-highest` с offset 1px, disabled — `opacity: 40%`.

## Refresh

```
обнови awds-component-list-item под Figma
```
