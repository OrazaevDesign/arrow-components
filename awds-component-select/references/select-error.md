# Select / Error

**Figma:** [4ipeXkifl3Hl6pVZUF4nuJ → node 394:15821](https://www.figma.com/design/4ipeXkifl3Hl6pVZUF4nuJ/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B5-Forms?node-id=394-15821)
**Роль токенов:** `form-control/error`

> [!NOTE]
> Этот файл — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`select-error.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## Когда

Значение не прошло проверку или обязательный выбор не сделан. Показывается после попытки отправки формы либо после ухода фокуса — но не во время выбора.

## HTML

```html
<label for="pay-err">Способ оплаты</label>
<span class="select select-error select--400">
  <select class="select__field" id="pay-err">
    <option value="" class="list-item list-item-transparent">
      <span class="list-item__content"><span class="list-item__title">Выберите способ</span></span>
    </option>
    <option value="1" class="list-item list-item-transparent">
      <span class="list-item__content"><span class="list-item__title">Картой онлайн</span></span>
    </option>
  </select>
</span>
```

Подпись — снаружи компонента. Пункты списка размечаются компонентом [`awds-component-list-item`](../../awds-component-list-item/SKILL.md); подключи рядом `list-item-transparent.css`.

## Цвета

| Состояние | Фон | Рамка | Текст | Шеврон |
|---|---|---|---|---|
| Rest | `error-container-core` | `error-container-on-low` | `error-container-on-highest` | `error-container-on-high` |
| Hover | `error-container-core` | `error-container-on` | `error-container-on-highest` | `error-container-on-high` |
| Focus | `surface-bright` | `primary-dim` | `primary-container-on-highest` | `primary-container-on-high` |
| Active | `error-container-core` | `error-container-on-low` | `error-container-on-highest` | `error-container-on-high` |

Chroma (левый край градиента): `error-container-chroma` в покое, `primary-container-chroma` при фокусе.
Плейсхолдер: `error-container-on-high` → `primary-container-on-high`.

## Замечания

**Цвет — только половина сообщения.** Обязателен текст рядом: что не так и что сделать. Свяжи его с контролом через `aria-describedby`, а сам `<select>` пометь `aria-invalid="true"` — иначе для скринридера ошибки нет.

**При фокусе красный уходит** — как и у `success`. Пользователь исправляет значение, и в этот момент ему нужен обычный фокус, а не напоминание об ошибке.

**Не ставь `error` превентивно** на обязательные поля до первой попытки: форма, красная с самого начала, читается как сломанная.

## Геометрия, слоты, попап, доступность

Общие для всех вариантов и описаны в [SKILL.md](../SKILL.md): высота `2 × padding + line-height`, семь размеров, шеврон-псевдоэлемент, переключение горизонтали текста, слой `@supports (appearance: base-select)` с пунктами на `list-item`, кольцо фокуса `primary-core` при 50%.

## Refresh

```
обнови awds-component-select под Figma
```
