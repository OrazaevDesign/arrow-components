# Input / Light

**Figma:** [4ipeXkifl3Hl6pVZUF4nuJ → node 322:16305](https://www.figma.com/design/4ipeXkifl3Hl6pVZUF4nuJ/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B5-Forms?node-id=322-16305)

> [!NOTE]
> Этот файл (`input-light.md`) — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`input-light.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## Чем отличается от Default

Ровно одним: **подложкой**. В rest / hover / active поле берёт `surface-bright` (белое) вместо `secondary-container-core` (серое).

| | Default | Light |
|---|---|---|
| Фон в покое | `secondary-container-core` — серый | `surface-bright` — белый |
| Рамка, текст, placeholder | одинаковые | одинаковые |
| Геометрия, типографика, размеры | одинаковые | одинаковые |
| Состояние Focus | `surface-bright` + `primary-container-chroma` | **то же самое** |
| Иконка при фокусе | `secondary-container-on-high` | `primary-container-on-high` |

Сверено по всем пяти состояниям и по контрольному размеру: расходятся только `bg` / `chroma` в покое и цвет иконки при фокусе. Всё остальное совпадает до значения, поэтому база `.input` в обоих CSS-файлах идентична побайтово.

## Когда какой

Выбор — от **фона, на котором стоит поле**, а не от важности поля:

- **Default** — поле на белой странице. Серая заливка отделяет его от фона.
- **Light** — поле на сером блоке: карточка, панель фильтров, модалка, подложка `surface-container-*`. Белое поле отделяется от серого окружения; серый Default на сером фоне слился бы.

Проверка простая: если фон вокруг поля не белый — скорее всего нужен light.

## HTML

Разметка полностью совпадает с Default, меняется только класс варианта:

```html
<label for="promo">Промокод</label>
<span class="input input-light input--400">
  <input class="input__field" id="promo" type="text" placeholder="Введите код">
</span>
```

Со слотами:

```html
<span class="input input-light input--500">
  <span class="input__prefix" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/></svg>
  </span>
  <input class="input__field" type="search" placeholder="Поиск по фильтрам">
</span>
```

Всё остальное — структура, слоты, размеры, геометрия, доступность, нативный крестик у `type="search"`, кнопка в слоте — описано в [input-default.md](input-default.md) и работает здесь один в один.

## Состояния

| Состояние | Селектор | Отличие от Default |
|---|---|---|
| Rest | `.input-light` | bg и chroma `surface-bright` |
| Hover | `.input-light:hover:not(:focus-within):has(> .input__field:enabled)` | — |
| Active | `.input-light:active:not(:focus-within):has(> .input__field:enabled)` | — |
| Focus | `.input-light:focus-within` | иконка `primary-container-on-high` |
| Disabled | `.input:has(> .input__field:disabled)` | — (на базе, общее для вариантов) |

Про `:not(:focus-within)` в hover / active — см. [input-default.md → Состояния](input-default.md#состояния): порядок правил там не работает, потому что `:has()` поднимает специфичность выше фокуса.

## CSS

Подключение: `input-light.css` — файл **самодостаточный**: содержит ту же базу `.input`, что и `input-default.css`, плюс свой блок `.input-light`. Так же устроены варианты кнопки (`button-primary.css` / `button-secondary.css`) — потребитель подключает только нужный вариант, без зависимостей по порядку.

Если на странице нужны оба варианта — подключаются оба файла. Дублирующаяся база безвредна: правила идентичны, конфликта нет.

## Refresh

```
обнови awds-component-input под Figma
```

→ ACB обновит оба варианта разом (у них общий `component.meta.json`). Этот markdown остаётся как есть.
