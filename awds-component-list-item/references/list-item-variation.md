# List-item / Variaton

**Figma:** [470rar5EfRm4n14vHMXbpc → набор 280:24620](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=280-24620)
**Роль токенов:** `list/variation`

> [!NOTE]
> Этот файл — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`list-item-variation.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## Когда

Строка-вариация товара: цвет, размер, комплектация. **Описание по желанию.** С описанием плитка двухстрочная, высоты 74/70/58/54/50/42/38. Без описания — однострочная, высоты 52/48/40/36/32/24/20, как у остальной семьи: так выводят размеры, где подпись короткая и цена у всех одна.

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

Образец вариации (цвет, фото) кладётся `<img>` в `.list-item__prefix` или `.list-item__suffix`. Так у `variation`, `variation-selected` и `variation-indeterminate`. В макете это части `prefix-list` и `suffix-list` со значением `content=preview`:

- образец — квадрат `rectangle/{N}/preview`: 66/62/54/50/46/38/34 от 600 до 50;
- снаружи отступ `rectangle/{N}/img-padding`: 4 у 600 и 500, 2 у остальных;
- со стороны текста отступ `rectangle/{N}/padding` строки: 16/12/10/8/8/4/2. Он же зазор до текста.

Высоту пункта задаёт большее из двух: слот с образцом или 2 × `padding` + строки текста. На 500 слот выше текста (70 против 66), поэтому строка с образцом на 4px выше строки без него.

С 2.5.2 (20.11.2026). До этого образец выводился из высоты текста и стоял с отступом `img-padding` со всех сторон. Эту схему владелец задал 27.09.2026. Потом макет перешёл на части с ячейками `preview` (их завели 01.10.2026, list-item 2.4.1), а код вариаций остался на старой схеме: на 500 образец был 58 вместо 62, текст стоял вплотную к образцу.

В наборе `variation` макета у ячеек 500–100 и у 600 вне `rest` ещё стоят оверрайды старой схемы. Сверка держит их исключением до правки макета.

## Цвета

| Состояние | Фон | Рамка | Заголовок | Описание |
|---|---|---|---|---|
| Rest | `secondary-container-core` | `secondary-container-on-lowest` | `secondary-container-on-high` | `secondary-container-on-high` |
| Hover | `focus-container-core` | `focus-container-on` | `focus-container-on-highest` | `secondary-container-on-high` |
| Focus | `secondary-container-core` | `secondary-container-on-lowest` | `secondary-container-on-high` | `secondary-container-on-high` |
| Active | `secondary-container-core` | `secondary-container-on-lowest` | `secondary-container-on-high` | `secondary-container-on-high` |

Галочка (`.list-item__check`): `transparent` в покое.

## Замечания

**Описание необязательно — с 20.11.2026.** До этого оно было обязательным: все ячейки макета двухстрочные. Мини-карточка товара в листинге выводит размеры одной строкой: цена у размеров одного товара обычно одна, и повтор её под каждым размером был бы шумом. В макете это булево `show-description` у вложенного `content-list`. Код ничего не добавлял: высота пункта и так `2 × padding + строка`, а вторая строка прибавляется, только если в разметке есть `.list-item__description`.

Однострочная плитка размера — ширина по содержимому, текст с боковыми полями `padding` ступени (в макете `content-list` с `padding=on`):

```html
<button type="button" role="radio" aria-checked="false" class="list-item list-item-variation list-item--400">
  <span class="list-item__content">
    <span class="list-item__title">38</span>
  </span>
</button>
```

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
