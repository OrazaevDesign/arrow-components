# Textarea / Light

**Figma:** [4ipeXkifl3Hl6pVZUF4nuJ → node 395:40736](https://www.figma.com/design/4ipeXkifl3Hl6pVZUF4nuJ/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B5-Forms?node-id=395-40736)

> [!NOTE]
> Этот файл (`textarea-light.md`) — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`textarea-light.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## Когда

Поле стоит на **сером** блоке — карточке, панели, в модалке. Там `default` (серый на сером) теряется, а белый фон отделяет контрол от подложки.

Обратное тоже верно: на белой странице `light` сливается с фоном и держится на одной рамке. Выбор варианта — от фона, на котором стоит поле, а не от важности поля.

## Чем отличается

Только фоном покоя: `surface-bright` вместо `secondary-container-core`, и `chroma` тоже `surface-bright` — градиента в покое фактически нет.

Отсюда единственное отличие в CSS: **правило фокуса не переопределяет `bg`** — он уже белый. Меняются `chroma`, рамка и цвета текста. Рамка, hover, active, кольцо — как у Default.

Всё остальное — разметка, семь размеров, высота в три строки, ручка ресайза и модификатор `.txa--fixed`, геометрия, доступность — совпадает с Default и описано в [textarea-default.md](textarea-default.md).

## HTML

```html
<label for="f">Подпись</label>
<span class="txa txa-light txa--400">
  <textarea class="txa__field" id="f" placeholder="Плейсхолдер"></textarea>
</span>
```

Меняется только класс варианта.

## Состояния

| Состояние | Селектор |
|---|---|
| Rest | `.txa-light` |
| Hover | `.txa-light:hover:not(:focus-within):has(.txa__field:enabled)` |
| Active | `.txa-light:active:not(:focus-within):has(.txa__field:enabled)` |
| Focus | `.txa-light:focus-within` |
| Disabled | `.txa:has(.txa__field:disabled)` — на базе, общее для вариантов |

Ручка ресайза отдельного правила не имеет: она красится `--awds-txa-color` этого варианта при opacity 30% и меняет цвет вместе с текстом.

## CSS

`textarea-light.css` — файл **самодостаточный**: та же база `.txa`, что и у остальных вариантов (побайтово), плюс блок `.txa-light`. Подключается только нужный вариант.

## Refresh

```
обнови awds-component-textarea под Figma
```

→ ACB обновит все варианты разом (общий `component.meta.json`). Этот markdown остаётся как есть.
