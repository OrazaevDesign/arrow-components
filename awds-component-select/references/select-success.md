# Select / Success

**Figma:** [470rar5EfRm4n14vHMXbpc → секция ↪ select 5:17, набор 34:46349](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=34-46349)
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
| Focus | `primary-container-base` | `primary-dim` | `primary-container-on-highest` | `primary-container-on-high` |
| Active | `success-container-core` | `success-container-on-low` | `success-container-on-highest` | `success-container-on-high` |

Плейсхолдер: `success-container-on-high` → `primary-container-on-high`.

## Замечания

**При фокусе вариант теряет зелёный** — фон уходит в `primary-container-base`, рамка в `primary-dim`, как у всех остальных вариантов. Пока пользователь работает с контролом, состояние валидации не показывается: оно про результат, а не про процесс.

**Цвет — не сообщение.** Рядом нужен текст («Доставка в этот город есть»), иначе для человека с дальтонизмом и для скринридера состояние не существует.

## Открытый список

Пока список раскрыт, поле показывается **в состоянии фокуса** — с фокусной рамкой и кольцом. Это не автоматика браузера: под `base-select` фокус уходит в попап, `:focus-within` на обёртке становится ложным, и без отдельного правила поле осталось бы в виде наведения. Правило висит на `:has(> .select__field:open)` и перебивает `hover` по весу — курсор в этот момент обычно как раз над контролом.

## Геометрия, слоты, попап, доступность

Общие для всех вариантов и описаны в [SKILL.md](../SKILL.md): высота `2 × padding + line-height`, семь размеров, шеврон-псевдоэлемент, переключение горизонтали текста, слой `@supports (appearance: base-select)` с пунктами на `list-item`, кольцо фокуса `primary-core` при 50%.

## Refresh

```
обнови awds-component-select под Figma
```
