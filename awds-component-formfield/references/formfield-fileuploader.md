# Formfield / FileUploader

**Figma:** [4ipeXkifl3Hl6pVZUF4nuJ → node 395:77542](https://www.figma.com/design/4ipeXkifl3Hl6pVZUF4nuJ/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B5-Forms?node-id=395-77542)

> [!NOTE]
> Этот файл (`formfield-fileuploader.md`) — **author-owned**. ACB пишет первичный draft, потом не трогает.

## Отдельного CSS у этого варианта нет

`Formfiled / FileUploader` — **то же поле формы**, что и [Formfield / Input](formfield-input.md), только вместо одиночного контрола внутри стоит целый загрузчик ([awds-component-uploader](../../awds-component-uploader/SKILL.md)). Сверены все три ячейки:

| Size | подпись | загрузчик | пояснение | ошибка | зазор | высота |
|---|---|---|---|---|---|---|
| 500 | 24 | 176 | 20 | 20 | 4 | **252** |
| 400 | 24 | 168 | 16 | 16 | 4 | **236** |
| 300 | 20 | 164 | 16 | 16 | 4 | **228** |

Состав, порядок частей и зазор 4 — те же, что у поля с `input`. Разница только в высоте контрола, потому что загрузчик — это поле выбора плюс список файлов.

## Разметка

```html
<div class="fld fld--400">
  <label class="lbl" for="docs">
    <span class="lbl__body"><span class="lbl__text">Документы</span></span>
  </label>

  <div class="upl">
    <label class="upl__label">
      <input class="upl__input" type="file" id="docs" multiple aria-describedby="docs-desc">
      <span class="input input-default">
        <input class="input__field" type="text" placeholder="Выберите файл" readonly tabindex="-1">
        <span class="input__suffix" aria-hidden="true"><svg viewBox="0 0 20 20">…</svg></span>
      </span>
    </label>

    <ul class="upl__list">
      <li class="upl__file">…</li>
    </ul>
  </div>

  <p class="fld__description" id="docs-desc">До 10 Мб, PDF или JPG</p>
</div>
```

## Ступень проходит на два уровня вниз

Классы `.upl--{N}` и `.input--{N}` ставить не нужно: мост поля написан селектором потомка (`.fld--500 .input`), поэтому он достаёт и то поле, которое лежит **внутри** загрузчика. Проверено замером: при `.fld--500` поле выбора внутри `.upl` даёт 48px, при `.fld--300` — 36px.

Список файлов от ступени не зависит: строка всегда 36, список 120 — так в макете и у самого загрузчика.

## Что подключить

`formfield-input.css` + [`label.css`](../../awds-component-label/references/label.css) + [`uploader.css`](../../awds-component-uploader/references/uploader.css) + CSS поля ([`input-default.css`](../../awds-component-input/references/input-default.css)) и кнопки удаления ([`button-ghost.css`](../../awds-component-button/references/button-ghost.css)).

## Где ошибка, а где пояснение

У этой связки два уровня ошибок, и путать их не надо:

- **`.upl__file--error`** — ошибка по конкретному файлу («12 Мб — больше допустимых 10»). Красит строку файла, остальные файлы не трогает.
- **`.fld__error`** — ошибка по всему полю («Загрузите хотя бы один документ», «Не хватает акта»). Стоит под загрузчиком.

Пояснение (`.fld__description`) — про требования к файлам целиком: размер, форматы, количество. Оно связывается с `<input type="file">` через `aria-describedby`, а не с текстовым полем-витриной.

## Проверено

Состав всех трёх ячеек снят из макета (`395:77543`, `395:77548`, `395:77553`); собранная композиция замерена в headless chromium — 24 замера, 0 расхождений: полные высоты 252/236/228, зазор 4, загрузчик 176/168/164, поле внутри него 48/40/36, список 120, строка файла 36.
