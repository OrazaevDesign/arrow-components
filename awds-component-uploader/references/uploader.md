# Uploader

**Figma:** [470rar5EfRm4n14vHMXbpc → секция ↪ uploader 5:26](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=5-26) · строка файла — набор `uploader / file` (оси `content=img|file` × `error=off|on`)

> [!NOTE]
> Этот файл (`uploader.md`) — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`uploader.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

Загрузчик файлов. CSS: [uploader.css](uploader.css). Рядом нужны [input-default.css](../../awds-component-input/references/input-default.css) и [button-ghost.css](../../awds-component-button/references/button-ghost.css).

## Поле выбора

```html
<label class="upl__drop">
  <input class="upl__input" type="file" multiple accept="image/*,.pdf">
  <span class="input input-default">
    <span class="upl__prompt">Выберите файл или перетащите его сюда</span>
    <span class="input__suffix" aria-hidden="true">
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6">…</svg>
    </span>
  </span>
</label>
```

**Это зона, а не поле ввода.** Файл на неё бросают мышью или нажимают её — и то и другое
работает без скрипта: настоящий `<input type="file">` растянут на всю зону и сделан
прозрачным, а такой инпут принимает брошенные на него файлы нативно. Он же остаётся в
табуляции и несёт фокус, поэтому кольцо рисуется правилом `.upl__input:focus-visible + .input`.

- Обводка **пунктиром** — так зона и обозначена в макете (`dashPattern [2,2]` на всех трёх
  ступенях). Рисуется псевдоэлементом: рамка поля это `inset box-shadow`, а он пунктирным
  не бывает. Шаг штриха задаёт браузер — макетные 2/2 средствами `border-style` не выражаются.
- Подпись зоны — обычный `<span class="upl__prompt">`, не `<input readonly>`: читать её как
  поле ввода незачем.
- Иконка загрузки (`ic20-upload-outline` в макете) кладётся в слот `.input__suffix`.
- Пока файл тащат над зоной, потребитель вешает `.upl__drop--over` (на `dragenter`, снимает
  на `dragleave` и `drop`) — рамка и фон становятся как в фокусе. Событие `dragover` видит
  только скрипт, из CSS его не поймать.

```js
const drop = document.querySelector('.upl__drop');
['dragenter', 'dragover'].forEach(e => drop.addEventListener(e, ev => {
  ev.preventDefault();
  drop.classList.add('upl__drop--over');
}));
['dragleave', 'drop'].forEach(e => drop.addEventListener(e, () => drop.classList.remove('upl__drop--over')));
```

## Строка файла

С превью картинки (в макете `Var = IMG`):

```html
<li class="upl__file">
  <span class="upl__preview"><img src="/uploads/wp.png" alt=""></span>
  <span class="upl__content">
    <span class="upl__name">wp.png изображение 1</span>
    <span class="upl__size">324 kb</span>
  </span>
  <span class="upl__progress"><svg viewBox="0 0 20 20">…</svg></span>
  <button type="button" class="btn btn-ghost btn--300 btn--icon-only upl__remove"
          aria-label="Удалить wp.png">
    <svg viewBox="0 0 20 20">…</svg>
  </button>
</li>
```

С иконкой типа файла (`Var = Default`) — вместо `.upl__preview` ставится `.upl__icon`:

```html
<span class="upl__icon">
  <svg viewBox="0 0 20 20" fill="currentColor"><!-- ic24-page-solid --></svg>
</span>
```

**`btn--icon-only` обязателен.** Без него кнопка удаления выходит 48×36 вместо 36×36 и строка перестаёт быть ровной.

Индикатор загрузки — **слот**: в макете там внешний компонент `ProgressIndicators` (M3 circular), которого в arrow-components нет. Бокс 20×20 зарезервирован, чтобы строка не прыгала, когда индикатор появляется и исчезает. Загрузка закончилась — элемент просто убирают.

## Файл с ошибкой

```html
<li class="upl__file upl__file--error">
  <span class="upl__icon">…</span>
  <span class="upl__content">
    <span class="upl__name">contract.pdf</span>
    <span class="upl__size">12 Мб — больше допустимых 10</span>
  </span>
  <button type="button" class="btn btn-ghost btn--300 btn--icon-only upl__remove"
          aria-label="Удалить contract.pdf">…</button>
</li>
```

Краснеют обе строки — так в макете (цвет стоит на контейнере). Модификатор вешается на конкретный `<li>`: остальные файлы остаются нормальными. Вторая строка при ошибке — место для причины, а не для веса.

## Список без поля выбора

`<ul class="upl__list">` работает **сам по себе**, без обёртки `.upl` — так показывают уже загруженные файлы там, где выбирать нечего: карточка заказа, просмотр заявки, письмо.

```html
<ul class="upl__list">
  <li class="upl__file">…</li>
</ul>
```

Размерные переменные объявлены и на списке, и на строке, поэтому геометрия не разваливается. (В первой версии они жили только на `.upl`, и автономная строка вырастала до 300px — проверка это поймала.)

## Размеры

| Класс | Поле | Список | Всего (3 файла) |
|---|---|---|---|
| `upl--300` | 36 | 120 | 164 |
| `upl--400` | 40 | 120 | 168 |
| `upl--500` | 48 | 120 | 176 |

Размер меняет только поле: строка файла всегда 36, имя 13/16, вес 12/16. Зазоры 8 (поле → список) и 6 (между файлами и внутри строки) одинаковы на всех размерах.

Превью, бокс иконки и кнопка удаления — три квадрата 36×36 по одной формуле `rectangle-300: icon + 2 × padding`. Кнопка собрана так же, поэтому они не разъедутся.

## Доступность

- `<ul>` / `<li>` — скринридер объявит число файлов.
- `aria-label` кнопки **называет файл**: «Удалить wp.png», иначе в списке одинаковые кнопки.
- Причина ошибки — текстом, а не только цветом.
- Если процент загрузки важен, рядом нужен `aria-live` со статусом: сам индикатор — картинка.

## Проверено

Headless Chromium, `getComputedStyle` + `getBoundingClientRect`: 3 загрузчика × 3 строки файла, 114 замеров, 0 расхождений. Полные высоты 176/168/164 совпали с ячейками макета; список 120 на всех размерах; строка 36; боксы превью, иконки и кнопки 36×36; индикатор 20×20; при ошибке имя и вес в `error-core`.

Отдельно: длинное имя обрезается многоточием и не выталкивает кнопку за правый край.

Найденный при проверке дефект: в первой версии тестовой разметки кнопка была без `btn--icon-only` и вышла 48×36. Тот же класс ошибок, что с `radio__dot` у label — разметку вложенных компонентов надо брать из их скиллов, а не по памяти.
