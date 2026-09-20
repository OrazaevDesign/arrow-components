# Textarea / Autofill

**Figma:** [секция ↪ textarea 5:16 → набор 44:74427](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=44-74427)

> [!NOTE]
> Этот файл (`textarea-autofill.md`) — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`textarea-autofill.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## Когда

Текст подставлен **не пользователем**: браузером, прошлым заказом, шаблоном обращения, данными профиля. Синий фон говорит «это не ты писал — проверь».

Как только пользователь сам отредактировал текст, класс снимается и поле возвращается к `default` (или к `success` / `error` по итогу проверки).

## Чем отличается

Палитра покоя — роли `tertiary-container-*`. Hover двигает рамку в `tertiary-container-on`, active возвращает к `on-low`.

При фокусе синяя подсветка полностью уступает брендовой (`primary-*`), как у остальных цветных вариантов.

Всё остальное — разметка, семь размеров, высота в три строки, ручка ресайза и модификатор `.txa--fixed`, геометрия, доступность — совпадает с Default и описано в [textarea-default.md](textarea-default.md).

## HTML

```html
<label for="f">Подпись</label>
<span class="txa txa-autofill txa--400">
  <textarea class="txa__field" id="f" placeholder="Плейсхолдер"></textarea>
</span>
```

Меняется только класс варианта.

## Состояния

| Состояние | Селектор |
|---|---|
| Rest | `.txa-autofill` |
| Hover | `.txa-autofill:hover:not(:focus-within):has(.txa__field:enabled)` |
| Active | `.txa-autofill:active:not(:focus-within):has(.txa__field:enabled)` |
| Focus | `.txa-autofill:focus-within — брендовая подсветка` |
| Disabled | `.txa:has(.txa__field:disabled)` — на базе, общее для вариантов |

Ручка ресайза отдельного правила не имеет: она красится `--awds-txa-color` этого варианта при opacity 30% и меняет цвет вместе с текстом.

## CSS

`textarea-autofill.css` — файл **самодостаточный**: та же база `.txa`, что и у остальных вариантов (побайтово), плюс блок `.txa-autofill`. Подключается только нужный вариант.

## Refresh

```
обнови awds-component-textarea под Figma
```

→ ACB обновит все варианты разом (общий `component.meta.json`). Этот markdown остаётся как есть.
