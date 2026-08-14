# Formfield / Select

**Figma:** [4ipeXkifl3Hl6pVZUF4nuJ → node 395:77510](https://www.figma.com/design/4ipeXkifl3Hl6pVZUF4nuJ/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B5-Forms?node-id=395-77510)

> [!NOTE]
> Этот файл (`formfield-select.md`) — **author-owned**. ACB пишет первичный draft, потом не трогает.

## Отдельного CSS у этого варианта нет — и не должно быть

`Formfiled / Select` — **то же поле**, что и [Formfield / Input](formfield-input.md), с другим контролом внутри. Это не предположение: сверены все три ячейки макета.

| Size | подпись | контрол | пояснение | ошибка | зазор | высота |
|---|---|---|---|---|---|---|
| 500 | 24 | 48 | 20 | 20 | 4 | **124** |
| 400 | 24 | 40 | 16 | 16 | 4 | **108** |
| 300 | 20 | 36 | 16 | 16 | 4 | **100** |

Числа совпадают с `Formfiled / Input` до пикселя, состав и порядок частей тот же. Поэтому подключается всё тот же [formfield-input.css](formfield-input.css) — плюс, разумеется, CSS самого селекта.

## Разметка

```html
<div class="fld fld--400">
  <label class="lbl" for="city">
    <span class="lbl__body"><span class="lbl__text">Город доставки</span></span>
  </label>

  <span class="select select-default">
    <select class="select__field" id="city" aria-describedby="city-desc">
      <option value="">Выберите город</option>
      <option value="ala">Алматы</option>
    </select>
  </span>

  <p class="fld__description" id="city-desc">Доставим за 1–2 дня</p>
</div>
```

Размерный класс селекту не нужен: `.fld--400` кормит его size-аккумуляторы через мост.

## Что подключить

`formfield-input.css` + [`label.css`](../../awds-component-label/references/label.css) + [`select-default.css`](../../awds-component-select/references/select-default.css). Для стилизованного раскрытого списка селекту нужен ещё `list-item-transparent.css` — см. [awds-component-select](../../awds-component-select/SKILL.md).

## Про пустой вариант

У селекта внутри поля пустой `<option value="">` показывает плейсхолдер и красится ролью `placehold`. Не путать с `awds-component-select-combi`, где пустой пункт обязан быть без текста: там его роль играет плавающая метка, а здесь подпись стоит снаружи и текст в пустом пункте уместен.

## Проверено

Состав всех трёх ячеек снят из макета (`395:77511`, `395:77516`, `395:77521`); собранное поле замерено в headless chromium — 124/108/100, совпадение полное.
