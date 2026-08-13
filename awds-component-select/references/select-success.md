# Select / Success

**Figma:** [4ipeXkifl3Hl6pVZUF4nuJ → node 394:15637](https://www.figma.com/design/4ipeXkifl3Hl6pVZUF4nuJ/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B5-Forms?node-id=394-15637)
**Роль токенов:** `form-control/success`

> [!NOTE]
> Этот файл — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`select-success.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## Когда

Значение проверено и принято. Ставится **после** успешной валидации — например, когда выбранный город подтверждён службой доставки.

Не для постоянного использования: если контрол зелёный всегда, зелёный перестаёт что-либо значить и на реальном подтверждении его никто не заметит.

## HTML

```html
<label for="city-ok">Город доставки</label>
<span class="select select-success select--400">
  <select class="select__field" id="city-ok">
    <option value="" class="list-item list-item-transparent">
      <span class="list-item__content"><span class="list-item__title">Выберите город</span></span>
    </option>
    <option value="1" class="list-item list-item-transparent">
      <span class="list-item__content"><span class="list-item__title">Алматы</span></span>
    </option>
  </select>
</span>
```

Подпись — снаружи компонента. Пункты списка размечаются компонентом [`awds-component-list-item`](../../awds-component-list-item/SKILL.md); подключи рядом `list-item-transparent.css`.

## Цвета

| Состояние | Фон | Рамка | Текст | Шеврон |
|---|---|---|---|---|
| Rest | `success-container-core` | `success-container-on-low` | `success-container-on-highest` | `success-container-on-high` |
| Hover | `success-container-core` | `success-container-on` | `success-container-on-highest` | `success-container-on-high` |
| Focus | `surface-bright` | `primary-dim` | `primary-container-on-highest` | `primary-container-on-high` |
| Active | `success-container-core` | `success-container-on-low` | `success-container-on-highest` | `success-container-on-high` |

Chroma (левый край градиента): `success-container-chroma` в покое, `primary-container-chroma` при фокусе.
Плейсхолдер: `success-container-on-high` → `primary-container-on-high`.

## Замечания

**При фокусе вариант теряет зелёный** — фон уходит в `surface-bright`, рамка в `primary-dim`, как у всех остальных вариантов. Пока пользователь работает с контролом, состояние валидации не показывается: оно про результат, а не про процесс.

**Цвет — не сообщение.** Рядом нужен текст («Доставка в этот город есть»), иначе для человека с дальтонизмом и для скринридера состояние не существует.

## Геометрия, слоты, попап, доступность

Общие для всех вариантов и описаны в [SKILL.md](../SKILL.md): высота `2 × padding + line-height`, семь размеров, шеврон-псевдоэлемент, переключение горизонтали текста, слой `@supports (appearance: base-select)` с пунктами на `list-item`, кольцо фокуса `primary-core` при 50%.

## Refresh

```
обнови awds-component-select под Figma
```
