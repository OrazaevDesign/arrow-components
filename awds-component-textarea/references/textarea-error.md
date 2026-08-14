# Textarea / Error

**Figma:** [4ipeXkifl3Hl6pVZUF4nuJ → node 395:41032](https://www.figma.com/design/4ipeXkifl3Hl6pVZUF4nuJ/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B5-Forms?node-id=395-41032)

> [!NOTE]
> Этот файл (`textarea-error.md`) — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`textarea-error.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## Когда

Текст не прошёл проверку или обязательное поле осталось пустым: отзыв короче минимума, в комментарии запрещённые символы, причина возврата не указана.

Это **состояние значения**: класс снимается, когда пользователь исправил текст.

## Чем отличается

Палитра покоя — роли `error-container-*`. Hover двигает рамку в `error-container-on`, active возвращает к `on-low`.

**При фокусе красная подсветка полностью уступает брендовой** — ошибка при этом не теряется, её держит текст причины под полем.

Одного цвета мало: нужны `aria-invalid="true"` и текст причины, связанный через `aria-describedby`. У многострочного поля это особенно важно — ошибка часто про длину или содержание, и объяснить её цветом невозможно:

```html
<span class="txa txa-error txa--400">
  <textarea class="txa__field" id="review" aria-invalid="true" aria-describedby="review-err"></textarea>
</span>
<p id="review-err">Расскажите чуть подробнее — нужно хотя бы 50 символов</p>
```

Всё остальное — разметка, семь размеров, высота в три строки, ручка ресайза и модификатор `.txa--fixed`, геометрия, доступность — совпадает с Default и описано в [textarea-default.md](textarea-default.md).

## HTML

```html
<label for="f">Подпись</label>
<span class="txa txa-error txa--400">
  <textarea class="txa__field" id="f" placeholder="Плейсхолдер"></textarea>
</span>
```

Меняется только класс варианта.

## Состояния

| Состояние | Селектор |
|---|---|
| Rest | `.txa-error` |
| Hover | `.txa-error:hover:not(:focus-within):has(.txa__field:enabled)` |
| Active | `.txa-error:active:not(:focus-within):has(.txa__field:enabled)` |
| Focus | `.txa-error:focus-within — брендовая подсветка` |
| Disabled | `.txa:has(.txa__field:disabled)` — на базе, общее для вариантов |

Ручка ресайза отдельного правила не имеет: она красится `--awds-txa-color` этого варианта при opacity 30% и меняет цвет вместе с текстом.

## CSS

`textarea-error.css` — файл **самодостаточный**: та же база `.txa`, что и у остальных вариантов (побайтово), плюс блок `.txa-error`. Подключается только нужный вариант.

## Refresh

```
обнови awds-component-textarea под Figma
```

→ ACB обновит все варианты разом (общий `component.meta.json`). Этот markdown остаётся как есть.
