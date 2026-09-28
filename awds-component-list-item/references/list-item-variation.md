# List-item / Variaton

**Figma:** [470rar5EfRm4n14vHMXbpc → набор 280:24620](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=280-24620)
**Роль токенов:** `list/variation`

> [!NOTE]
> Этот файл — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`list-item-variation.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## Когда

Строка-вариация товара: цвет, размер, комплектация. **Всегда с описанием** — в макете у этого семейства две строки текста во всех размерах, отсюда и высоты 74/70/58/54/50/42/38.

Обводка по контуру превращает строку в плитку выбора. При наведении вся плитка уходит в бренд — фон, рамка и текст меняются разом.

## HTML

```html
<button type="button" class="list-item list-item-variation list-item--400">
  <span class="list-item__content">
    <span class="list-item__title">Чёрный, 256 ГБ</span>
    <span class="list-item__description">В наличии, 12 900 ₸</span>
  </span>
</button>
```

### Образец в слоте

Образец вариации (цвет, фото) кладётся `<img>` в `.list-item__prefix` или `.list-item__suffix`. Слот с образцом — квадрат во всю высоту пункта, внутренний отступ `rectangle/{N}/img-padding` (4 у 600 и 500, 2 у остальных), образец заполняет его: 66/62/54/50/46/38/34 от 600 до 50 (у `variation`, `variation-selected`, `variation-indeterminate`). Отдельной ячейки под размер нет и не нужно: высота пункта — 2 × `padding` + строка + 2 + строка описания, поэтому размер образца выводится из тех же ячеек и следует за ними. Схему задал владелец в макете 27.09.2026 вместо прежних литералов 42/38/34.

## Цвета

| Состояние | Фон | Рамка | Заголовок | Описание |
|---|---|---|---|---|
| Rest | `secondary-container-core` | `secondary-container-on-lowest` | `secondary-container-on-high` | `secondary-container-on-high` |
| Hover | `primary-container-core` | `primary-container-on` | `primary-container-on-highest` | `secondary-container-on-high` |
| Focus | `secondary-container-core` | `secondary-container-on-lowest` | `secondary-container-on-high` | `secondary-container-on-high` |
| Active | `secondary-container-core` | `secondary-container-on-lowest` | `secondary-container-on-high` | `secondary-container-on-high` |

Галочка (`.list-item__check`): `transparent` в покое.

## Замечания

**Описание здесь обязательно, а не опционально.** Все ячейки макета — двухстрочные; без второй строки геометрия совпадёт с обычной строкой и плитка потеряет пропорцию.

**Тройка с `variation-selected` и `variation-indeterminate`.** Невыбранная, выбранная и неопределённая вариации — один набор, используются вместе.

**Описание привязано к `list/default/description`**, а не к собственной роли вариации. Так в макете, проверено в Rest, Hover и Focus.

## Контраст

Пересчитано 26.09.2026 по текущим значениям темы.

- Описание в состоянии **Rest**: `secondary-container-on-high` (#6a6a6a) на `secondary-container-core` (#f5f5f5) — **4.96:1**, норма 4.5:1 пройдена. Было `secondary-container-on` и 2.78:1; владелец перевёл ячейку на `on-high`.

## Геометрия, состояния, слоты

Общие для всей семьи и описаны в [SKILL.md](../SKILL.md): высота `2 × padding + line-height`, переключение горизонтали от слотов, `align-items: flex-start`, кольцо фокуса `primary-core` вписано в бокс (Inside + Accent), disabled — `opacity: 40%`.

## Refresh

```
обнови awds-component-list-item под Figma
```
