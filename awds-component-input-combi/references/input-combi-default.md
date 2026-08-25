# Input Combi / Default

**Figma:** [4ipeXkifl3Hl6pVZUF4nuJ → node 251:16991](https://www.figma.com/design/4ipeXkifl3Hl6pVZUF4nuJ/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B5-Forms?node-id=251-16991)

> [!NOTE]
> Этот файл (`input-combi-default.md`) — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`input-combi-default.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## Когда

Поле, где подпись должна остаться видимой после заполнения, а места на подпись сверху нет: плотные формы, модалки, длинные формы адреса и профиля.

Не берётся, если поле одно и вертикали хватает — внешняя подпись читается лучше, она видна всегда и не конкурирует со значением. И не смешивается в одной форме с полями `awds-component-input`: две разные механики подписи рядом выглядят как недоделка.

## HTML

```html
<span class="icombi icombi-default icombi--400">
  <span class="icombi__body">
    <input class="icombi__field" id="city" type="text" placeholder=" ">
    <label class="icombi__label" for="city">Город</label>
  </span>
</span>
```

**`placeholder=" "` — не опечатка и не украшение.** Пустое поле определяется через `:placeholder-shown`, а этот псевдокласс требует атрибута. Уберёшь — метка залипнет наверху над пустым полем, и контрол будет выглядеть вечно заполненным. Видимого placeholder тут нет: `::placeholder` покрашен в `transparent`, подпись даёт метка.

**Порядок «поле → метка» обязателен.** Заполненность ловится соседним комбинатором `.icombi__field:not(:placeholder-shown) + .icombi__label`, а он смотрит только вперёд. Поменяешь местами — метка перестанет реагировать на значение (фокус при этом продолжит работать, поэтому баг легко не заметить).

**`__body` — не лишняя обёртка.** Метка позиционируется абсолютно, и ей нужна система координат ровно по полю. От `.icombi` она отсчитывалась бы от левого края контрола и при иконке в `prefix` уехала бы под иконку.

### С иконкой в prefix

```html
<span class="icombi icombi-default icombi--500">
  <span class="icombi__prefix" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
  </span>
  <span class="icombi__body">
    <input class="icombi__field" id="mail" type="email" placeholder=" ">
    <label class="icombi__label" for="mail">Электронная почта</label>
  </span>
</span>
```

Иконка в макете — филлер (`ic20-radio-outline`), слот принимает любую. Иконок может быть несколько, боксы идут вплотную — как в auto-layout.

### С кнопкой очистки в suffix

```html
<span class="icombi icombi-default icombi--400">
  <span class="icombi__body">
    <input class="icombi__field" id="q" type="text" placeholder=" " value="Алматы">
    <label class="icombi__label" for="q">Город</label>
  </span>
  <span class="icombi__suffix">
    <button type="button" aria-label="Очистить город">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
    </button>
  </span>
</span>
```

Кликабельная иконка — настоящая `<button>` с `aria-label`, без `aria-hidden` на слоте. У неё своё кольцо фокуса.

### Выключенное

```html
<span class="icombi icombi-default icombi--400">
  <span class="icombi__body">
    <input class="icombi__field" id="promo" type="text" placeholder=" " disabled>
    <label class="icombi__label" for="promo">Промокод</label>
  </span>
</span>
```

Гасится вся обёртка (`opacity: 40%`) — так в макете. Контраст в этом состоянии заведомо ниже AA, поэтому рядом нужен текст-причина, а не только серость.

## Геометрия

Высота **совпадает с обычным полем того же размера** — метка не удлиняет контрол:

| Size | Высота | padding | Значение: сверху / снизу | Метка наверху: отступ / кегль |
|---|---|---|---|---|
| 600 | 52 | 16 | 24 / 8 | 8 / 12–16 |
| 500 | 48 | 14 | 22 / 6 | 6 / 12–16 |
| 400 | 40 | 10 | 16 / 4 | 4 / 11–16 |
| 300 | 36 | 8 | 14 / 2 | 2 / 11–16 |

Закономерность макета, проверенная на всех четырёх размерах: `input-top = padding + Δ`, `input-bottom = label-top = padding − Δ`, где Δ = 8 у 500/600 и 6 у 300/400. Строку значения сдвигают вниз, освобождая место метке, и ровно на столько же поднимают низ. Считать это в CSS не нужно — все три числа лежат в `--awds-rectangle-{N}-combi-*`.

В покое метка стоит по центру в кегле значения (`top: padding`), поэтому высота сходится и там: `padding + line-height + padding`.

**По горизонтали и поле, и метка отступают на `text-gap`, если с этой стороны нет слота** (18/18/16/14 против `padding` 16/14/10/8), и на `padding`, если слот есть. В макете горизонтальные паддинги строк `label` и `input` всегда равны — поэтому `left`/`right` метки переключаются тем же правилом, что и `padding-inline` поля. Разведёшь их — метка при уезде прыгнет по горизонтали, а в покое встанет не по вертикали значения.

**Проверено числами**, а не глазами: 4 размера × {пусто, заполнено} = 32 замера computed px в headless chromium, совпадение с Figma до пикселя.

## Состояния

| Состояние | Селектор |
|---|---|
| Rest | `.icombi-default` |
| Hover | `.icombi-default:hover:not(:focus-within):has(.icombi__field:enabled)` |
| Active | `.icombi-default:active:not(:focus-within):has(.icombi__field:enabled)` |
| Focus | `.icombi-default:focus-within` |
| Метка наверху | `.icombi:focus-within .icombi__label`, `.icombi__field:not(:placeholder-shown) + .icombi__label` |
| Disabled | `.icombi:has(.icombi__field:disabled)` |

`:not(:focus-within)` в hover и active — не перестраховка. `:has()` добавляет вес своего аргумента: hover-селектор весит (0,5,0) против (0,2,0) у `:focus-within`, и порядок правил в файле не спас бы. Без него самый обычный сценарий — кликнул мышью в поле, курсор остался над ним — подменял бы брендовую рамку серой hover-овой. Проверено живым наведением: рамка `rgb(115,120,130)` на ховере и `rgb(250,223,66)` при фокусе поверх ховера.

**Состояния «заполнено» в макете нет** — оно выведено. В Figma есть только Rest (пусто, метка по центру) и Focus (метка наверху, под ней значение). Что происходит с заполненным полем после потери фокуса, макет не говорит; единственный осмысленный ответ — метка остаётся наверху, иначе она наложилась бы на значение, а форма потеряла бы все подписи. Отсюда `:not(:placeholder-shown)` в селекторе.

## Цвета

Роли те же, что у `Input / Default` — в Figma обе группы ячеек ссылаются на один `form-control/default/*`, сверено по всем пяти состояниям:

| | Rest / Active | Hover | Focus |
|---|---|---|---|
| Фон | `secondary-container-core` | = Rest | `surface-bright` |
| Chroma | `secondary-container-chroma` | = Rest | `primary-container-chroma` |
| Рамка | `secondary-container-on-low` | `secondary-container-on` | `primary-dim` |
| Текст | `secondary-container-on-highest` | = Rest | `primary-container-on-highest` |
| Метка | `secondary-container-on-high` | = Rest | `primary-container-on-high` |

Кольцо фокуса — слой [awds-component-focus-selection](../../awds-component-focus-selection/SKILL.md), вариант **Outside + Formcontrol**: `primary-core` при 50% прозрачности, зазор 1px. Это **не** тёмное `surface-on-highest`, как у button / checkbox / radio / switch (там вариант Default): у полей ввода рамка в фокусе уже брендовая, и плотное кольцо слилось бы с ней в одну полосу.

## CSS

`input-combi-default.css` — самодостаточный файл: база `.icombi`, четыре размера, блок варианта и reduced-motion. Приватные аккумуляторы — `--awds-icombi-*` (не `--awds-input-combi-*`, см. [SKILL.md](../SKILL.md) → «Откуда берутся значения»).

Уезд метки анимируется явным списком свойств (`top`, `font-size`, `line-height`, `letter-spacing`), а не `transform: scale()`: у мелкой метки своё letter-spacing, и масштабирование растянуло бы межбуквенное вместе с кеглем. При `prefers-reduced-motion: reduce` метка перескакивает мгновенно — движение гасится, информация остаётся.

## Refresh

```
обнови awds-component-input-combi под Figma
```

→ ACB обновит CSS и preview. Этот markdown остаётся как есть.
