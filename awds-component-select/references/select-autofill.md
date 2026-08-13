# Select / Autofill

**Figma:** [4ipeXkifl3Hl6pVZUF4nuJ → node 394:16187](https://www.figma.com/design/4ipeXkifl3Hl6pVZUF4nuJ/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B5-Forms?node-id=394-16187)
**Роль токенов:** `form-control/autofill`

> [!NOTE]
> Этот файл — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`select-autofill.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## Когда

Поле, заполненное браузером из сохранённых данных. Синяя подложка повторяет то, что браузер рисует сам, но токенами дизайн-системы — чтобы автозаполненный контрол не выбивался из формы чужим системным цветом.

## HTML

```html
<label for="region">Регион</label>
<span class="select select-autofill select--400">
  <select class="select__field" id="region">
    <option value="" class="list-item list-item-transparent">
      <span class="list-item__content"><span class="list-item__title">Выберите регион</span></span>
    </option>
    <option value="1" class="list-item list-item-transparent">
      <span class="list-item__content"><span class="list-item__title">Алматинская область</span></span>
    </option>
  </select>
</span>
```

Подпись — снаружи компонента. Пункты списка размечаются компонентом [`awds-component-list-item`](../../awds-component-list-item/SKILL.md); подключи рядом `list-item-transparent.css`.

## Цвета

| Состояние | Фон | Рамка | Текст | Шеврон |
|---|---|---|---|---|
| Rest | `tertiary-container-core` | `tertiary-container-on-low` | `tertiary-container-on-highest` | `tertiary-container-on-high` |
| Hover | `tertiary-container-core` | `tertiary-container-on` | `tertiary-container-on-highest` | `tertiary-container-on-high` |
| Focus | `surface-bright` | `primary-dim` | `primary-container-on-highest` | `primary-container-on-high` |
| Active | `tertiary-container-core` | `tertiary-container-on-low` | `tertiary-container-on-highest` | `tertiary-container-on-high` |

Chroma (левый край градиента): `tertiary-container-chroma` в покое, `primary-container-chroma` при фокусе.
Плейсхолдер: `tertiary-container-on-high` → `primary-container-on-high`.

## Замечания

**Класс ставится скриптом, а не руками.** Нативный `:autofill` на `<select>` браузеры не применяют (это псевдокласс для полей ввода), поэтому вариант навешивается тем кодом, который знает, что значение пришло из автозаполнения.

**При фокусе синий уходит** — как у `success` и `error`. Как только пользователь взялся за контрол, значение перестаёт быть «подставленным».

**Не используй как декоративный синий.** У варианта есть смысл — «это подставил браузер»; в другой роли он собьёт с толку.

## Геометрия, слоты, попап, доступность

Общие для всех вариантов и описаны в [SKILL.md](../SKILL.md): высота `2 × padding + line-height`, семь размеров, шеврон-псевдоэлемент, переключение горизонтали текста, слой `@supports (appearance: base-select)` с пунктами на `list-item`, кольцо фокуса `primary-core` при 50%.

## Refresh

```
обнови awds-component-select под Figma
```
