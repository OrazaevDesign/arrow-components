# Textarea / Default

**Figma:** [4ipeXkifl3Hl6pVZUF4nuJ → node 395:40586](https://www.figma.com/design/4ipeXkifl3Hl6pVZUF4nuJ/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B5-Forms?node-id=395-40586)

> [!NOTE]
> Этот файл (`textarea-default.md`) — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`textarea-default.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

Многострочное поле на нейтральном сером фоне — базовый вариант для формы на белой странице. CSS: [textarea-default.css](textarea-default.css).

## Разметка

```html
<label for="comment">Комментарий к заказу</label>
<span class="txa txa-default txa--400">
  <textarea class="txa__field" id="comment" placeholder="Например: позвонить за час"></textarea>
</span>
```

Обёртка несёт рамку, фон и ручку; поле — текст и отступы. Слотов у компонента нет: иконку внутрь многострочного поля класть некуда, а кнопку (отправить, приложить файл) ставят под полем, а не в него.

## Высота и rows

```html
<!-- три строки по умолчанию -->
<span class="txa txa-default txa--400"><textarea class="txa__field" id="a"></textarea></span>

<!-- пять строк: rows увеличивает высоту -->
<span class="txa txa-default txa--500"><textarea class="txa__field" id="b" rows="5"></textarea></span>
```

Высота выведена из макета как `2 × padding + 3 × line-height` и задана через `min-block-size` — значит `rows` больше трёх её увеличит, а меньше трёх не уменьшит. Так поле не схлопывается там, где потребитель забыл атрибут, и растёт там, где он осознанно попросил больше.

## Ресайз

```html
<!-- по умолчанию: тянется по вертикали, ручка видна -->
<span class="txa txa-default txa--400"><textarea class="txa__field" id="c"></textarea></span>

<!-- размер фиксирован: ресайза нет, ручки тоже нет -->
<span class="txa txa-default txa--400 txa--fixed"><textarea class="txa__field" id="d"></textarea></span>
```

Ручка — иконка из макета, нарисованная псевдоэлементом обёртки поверх нативного механизма. Системный уголок Chromium скрыт (`::-webkit-resizer`), тяга при этом работает: псевдоэлемент прозрачен для событий. В Firefox поверх нашей иконки останется системная — единственное известное расхождение.

`resize: vertical`, не `both`: поле шириной 100% при горизонтальной тяге вылезло бы за пределы формы.

## Выключенное

```html
<span class="txa txa-default txa--400">
  <textarea class="txa__field" id="e" disabled></textarea>
</span>
<p class="hint">Комментарий можно оставить после оформления</p>
```

Гасится вся обёртка (`opacity: var(--awds-opacity-40)`), ресайз снят. **Ручка при этом остаётся видимой** — так в макете: выключенный вид считывается по всему блоку, а не по одной иконке. Контраст в этом состоянии заведомо ниже AA, поэтому рядом нужен текст-причина.

## Состояния

| Состояние | Что меняется | Селектор |
|---|---|---|
| Rest | `bg secondary-container-core`, `chroma secondary-container-chroma`, рамка `secondary-container-on-low`, текст `secondary-container-on-highest`, плейсхолдер `secondary-container-on-high` | `.txa-default` |
| Hover | только рамка → `secondary-container-on` | `:hover:not(:focus-within):has(.txa__field:enabled)` |
| Active | рамка возвращается к `secondary-container-on-low` (в макете Active = Rest; правило нужно, чтобы отменить hover при нажатии) | `:active:not(:focus-within):has(…)` |
| Focus | `bg surface-bright`, `chroma primary-container-chroma`, рамка `primary-dim`, текст `primary-container-on-highest`, плейсхолдер `primary-container-on-high` + кольцо; ручка красится вместе с текстом | `:focus-within` |
| Disabled | Rest + `opacity: var(--awds-opacity-40)` | `:has(.txa__field:disabled)` |

Кольцо фокуса: `outline: 2px solid rgb(var(--primary-core) / var(--awds-opacity-50))`, `outline-offset: 1px` — как у input, select и combi-версий.

## Размеры

| Size | padding | text-gap | fs/lh | высота |
|---|---|---|---|---|
| 600 | 16 | 18 | 16/20 | 92 |
| 500 | 14 | 18 | 16/20 | 88 |
| 400 | 10 | 16 | 14/20 | 80 |
| 300 | 8 | 14 | 14/20 | 76 |
| 200 | 8 | 14 | 13/16 | 64 |
| 100 | 4 | 10 | 13/16 | 56 |
| 50 | 2 | 8 | 12/16 | 52 |

Горизонталь — всегда `text-gap`: слотов нет, текст отсчитывается от края. Вертикаль — `padding`.

## Проверено

Headless Chromium, `getComputedStyle` + `getBoundingClientRect`: 28 экземпляров (7 размеров × {обычный, `--fixed`} × {активный, disabled}), 280 замеров, 0 расхождений с макетом. Живой фокус на размере 500: фон, рамка, текст, плейсхолдер и ручка уходят в focus-роли, кольцо `rgba(250,216,20,.5)` с offset 1, blur возвращает rest.

Про ресайз: хит-тест в правом нижнем углу возвращает сам `<textarea>` (псевдоэлемент событий не перехватывает), а обёртка следует за высотой поля — при увеличении поля на 40px её бокс вырос ровно на 40. Саму тягу мышью программно не воспроизвести: нативный ресайз реагирует только на trusted-события, поэтому проверялась механика, а не жест.

Гоча замеров: цветовые аккумуляторы зарегистрированы через `@property` и анимируются — чтение `getComputedStyle` на первом кадре после `focus()` отдаёт ещё старый цвет. Мерить с задержкой ~400 мс.
