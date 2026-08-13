# Select / Ghost

**Figma:** [4ipeXkifl3Hl6pVZUF4nuJ → node 394:16004](https://www.figma.com/design/4ipeXkifl3Hl6pVZUF4nuJ/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B5-Forms?node-id=394-16004)
**Роль токенов:** `form-control/ghost`

> [!NOTE]
> Этот файл — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`select-ghost.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## Когда

Полностью прозрачный контрол: ни фона, ни рамки. Для тулбаров, шапок таблиц и мест, где рамка спорила бы с окружением, — например, переключатель сортировки прямо над списком.

Единственный признак интерактивности в покое — шеврон. Поэтому не используй `ghost` там, где рядом нет других подсказок: пользователь может не понять, что это контрол.

## HTML

```html
<label for="view">Вид</label>
<span class="select select-ghost select--400">
  <select class="select__field" id="view">
    <option value="" class="list-item list-item-transparent">
      <span class="list-item__content"><span class="list-item__title">Список</span></span>
    </option>
    <option value="1" class="list-item list-item-transparent">
      <span class="list-item__content"><span class="list-item__title">Плитка</span></span>
    </option>
  </select>
</span>
```

Подпись — снаружи компонента. Пункты списка размечаются компонентом [`awds-component-list-item`](../../awds-component-list-item/SKILL.md); подключи рядом `list-item-transparent.css`.

## Цвета

| Состояние | Фон | Рамка | Текст | Шеврон |
|---|---|---|---|---|
| Rest | `transparent` | `transparent` | `secondary-container-on-highest` | `secondary-container-on-high` |
| Hover | `transparent` | `transparent` | `secondary-container-on-highest` | `secondary-container-on-high` |
| Focus | `transparent` | `transparent` | `primary-container-on-highest` | `primary-container-on-high` |
| Active | `transparent` | `transparent` | `secondary-container-on-highest` | `secondary-container-on-high` |

Chroma (левый край градиента): `transparent` в покое, `transparent` при фокусе.
Плейсхолдер: `secondary-container-on-high` → `primary-container-on-high`.

## Замечания

**Hover и Active в макете равны Rest** — правил для них в CSS нет вовсе. То есть на наведение вариант **не отвечает ничем**, а это заметный минус для обнаруживаемости. Если контрол должен отзываться, бери `light`.

**При фокусе фон и рамка тоже не появляются** — меняются только цвета текста и шеврона, и загорается кольцо. Кольцо здесь единственный видимый контур, поэтому не отключай его своими стилями.

**Тач-цель.** Прозрачный контрол легко сделать слишком узким: следи, чтобы область нажатия оставалась не меньше 44px по высоте — бери размер 500 или 600.

## Геометрия, слоты, попап, доступность

Общие для всех вариантов и описаны в [SKILL.md](../SKILL.md): высота `2 × padding + line-height`, семь размеров, шеврон-псевдоэлемент, переключение горизонтали текста, слой `@supports (appearance: base-select)` с пунктами на `list-item`, кольцо фокуса `primary-core` при 50%.

## Refresh

```
обнови awds-component-select под Figma
```
