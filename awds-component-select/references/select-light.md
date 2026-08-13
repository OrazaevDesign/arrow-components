# Select / Light

**Figma:** [4ipeXkifl3Hl6pVZUF4nuJ → node 394:15454](https://www.figma.com/design/4ipeXkifl3Hl6pVZUF4nuJ/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B5-Forms?node-id=394-15454)
**Роль токенов:** `form-control/light`

> [!NOTE]
> Этот файл — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`select-light.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## Когда

Поле на белом фоне с серой обводкой. Берётся там, где серая заливка обычного `default` слилась бы с окружением: плотные панели фильтров, строки таблиц, тулбары над списком.

Отличие от `ghost` — рамка есть всегда, то есть контрол виден как контрол даже в покое. `ghost` полностью растворяется.

## HTML

```html
<label for="sort">Сортировка</label>
<span class="select select-light select--400">
  <select class="select__field" id="sort">
    <option value="" class="list-item list-item-transparent">
      <span class="list-item__content"><span class="list-item__title">По умолчанию</span></span>
    </option>
    <option value="1" class="list-item list-item-transparent">
      <span class="list-item__content"><span class="list-item__title">Сначала дешёвые</span></span>
    </option>
  </select>
</span>
```

Подпись — снаружи компонента. Пункты списка размечаются компонентом [`awds-component-list-item`](../../awds-component-list-item/SKILL.md); подключи рядом `list-item-transparent.css`.

## Цвета

| Состояние | Фон | Рамка | Текст | Шеврон |
|---|---|---|---|---|
| Rest | `surface-bright` | `secondary-container-on-low` | `secondary-container-on-highest` | `secondary-container-on-high` |
| Hover | `surface-bright` | `secondary-container-on` | `secondary-container-on-highest` | `secondary-container-on-high` |
| Focus | `surface-bright` | `primary-dim` | `primary-container-on-highest` | `primary-container-on-high` |
| Active | `surface-bright` | `secondary-container-on-low` | `secondary-container-on-highest` | `secondary-container-on-high` |

Chroma (левый край градиента): `surface-bright` в покое, `primary-container-chroma` при фокусе.
Плейсхолдер: `secondary-container-on-high` → `primary-container-on-high`.

## Замечания

**Единственное, что меняется на наведении, — рамка** (`on-low` → `on`). Фон белый во всех состояниях, включая фокус: подсвечивать нечем, всю работу делают рамка и кольцо.

**На белой странице контрол опознаётся только по рамке и шеврону.** Если вокруг тоже белое, поставь `default` — у него серая подложка отделяет поле от фона.

## Геометрия, слоты, попап, доступность

Общие для всех вариантов и описаны в [SKILL.md](../SKILL.md): высота `2 × padding + line-height`, семь размеров, шеврон-псевдоэлемент, переключение горизонтали текста, слой `@supports (appearance: base-select)` с пунктами на `list-item`, кольцо фокуса `primary-core` при 50%.

## Refresh

```
обнови awds-component-select под Figma
```
