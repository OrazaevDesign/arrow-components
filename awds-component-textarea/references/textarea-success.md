# Textarea / Success

**Figma:** [4ipeXkifl3Hl6pVZUF4nuJ → node 395:40884](https://www.figma.com/design/4ipeXkifl3Hl6pVZUF4nuJ/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B5-Forms?node-id=395-40884)

> [!NOTE]
> Этот файл (`textarea-success.md`) — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`textarea-success.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## Когда

Введённый текст прошёл проверку — адрес распознан, промокод принят, описание достаточной длины.

Это **состояние значения, а не вид контрола**: класс вешается и снимается по ходу валидации. Держать зелёными все заполненные поля не нужно — подсветка обесценивается.

## Чем отличается

Палитра покоя — роли `success-container-*`. Hover двигает рамку в `success-container-on`, active возвращает к `on-low`.

**При фокусе зелёная подсветка полностью уступает брендовой** — так в макете: пока пользователь пишет, важнее «где я», а не «что со значением».

Всё остальное — разметка, семь размеров, высота в три строки, ручка ресайза и модификатор `.txa--fixed`, геометрия, доступность — совпадает с Default и описано в [textarea-default.md](textarea-default.md).

## HTML

```html
<label for="f">Подпись</label>
<span class="txa txa-success txa--400">
  <textarea class="txa__field" id="f" placeholder="Плейсхолдер"></textarea>
</span>
```

Меняется только класс варианта.

## Состояния

| Состояние | Селектор |
|---|---|
| Rest | `.txa-success` |
| Hover | `.txa-success:hover:not(:focus-within):has(.txa__field:enabled)` |
| Active | `.txa-success:active:not(:focus-within):has(.txa__field:enabled)` |
| Focus | `.txa-success:focus-within — брендовая подсветка` |
| Disabled | `.txa:has(.txa__field:disabled)` — на базе, общее для вариантов |

Ручка ресайза отдельного правила не имеет: она красится `--awds-txa-color` этого варианта при opacity 30% и меняет цвет вместе с текстом.

## CSS

`textarea-success.css` — файл **самодостаточный**: та же база `.txa`, что и у остальных вариантов (побайтово), плюс блок `.txa-success`. Подключается только нужный вариант.

## Refresh

```
обнови awds-component-textarea под Figma
```

→ ACB обновит все варианты разом (общий `component.meta.json`). Этот markdown остаётся как есть.
