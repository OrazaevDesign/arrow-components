# List-item / Variation-img

**Figma:** набор создаётся в секции `↪ list-item` (страница «5 · lists»); ссылка проставится при публикации.
**Роль токенов:** `list/variation` (рамка, текст, описание) + `list/variation-img` (подложка и завеса)

> [!NOTE]
> Этот файл — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`list-item-variation-img.css`) и preview (`preview.html`) — генерируются ACB и при следующем refresh затрутся.

## Когда

Вариация товара, у которой смысл несёт **фотография**, а не текст: расцветка, принт, комплект. Текст остаётся подписью под фото, но узнают вариацию по картинке.

Если вариацию можно назвать словом — бери [variation](list-item-variation.md): он дешевле и читается быстрее. Фото нужно там, где словами не объяснить (оттенок ткани, рисунок, форма).

## Откуда взялся

Перенесён 26.09.2026 из компонента `tab-product`, вариант `img`. Там же был вариант `text`, который дублировал [variation](list-item-variation.md) и оказался беднее: две ступени размера вместо семи, без описания и без галочки. Дубликат удалён, уникальная часть переехала сюда.

**Пропорция 4:5 не перенесена** — решение владельца. У `tab-product` плитка держала форму жёстко; здесь высоту задаёт содержимое, как у остальных вариантов семьи. Форму кадра задаёт потребитель — контейнером или собственным `aspect-ratio` на `.list-item__img`.

## HTML

```html
<button type="button" class="list-item list-item-variation-img list-item--400">
  <img class="list-item__img" src="…" alt="Чёрный глянец">
  <span class="list-item__content">
    <span class="list-item__title">Чёрный глянец</span>
    <span class="list-item__description">В наличии, 12 900 ₸</span>
  </span>
</button>
```

`alt` обязателен и описывает **вариацию**, а не товар: «Чёрный глянец», не «Смартфон вид спереди». Пустой `alt` здесь — потеря информации, картинка тут единственный носитель различия.

## Цвета

| Состояние | Подложка | Рамка | Заголовок | Описание |
|---|---|---|---|---|
| Rest | `surface-bright` | `secondary-container-on-lowest` | `secondary-container-on-high` | `secondary-container-on-high` |
| Hover | `surface-bright` | `primary-container-on` | `primary-container-on-highest` | `primary-container-on-high` |
| Focus | `surface-bright` | `secondary-container-on-lowest` | `secondary-container-on-high` | `secondary-container-on-high` |
| Active | `surface-bright` | `secondary-container-on-lowest` | `secondary-container-on-high` | `secondary-container-on-high` |

**Фон не зависит от состояния** — в отличие от `variation`, где он уходит в бренд при наведении. Здесь фон это подложка под фото (`list/variation-img/bg`), а состояние показывают рамка и текст: фото закрывает плитку целиком, и менять под ним цвет бессмысленно.

Завеса (`list/variation-img/veil`, роль `extended-shadow-3`) лежит поверх фото псевдоэлементом `::before` на всей площади: она гасит пестроту кадра, чтобы подпись поверх него читалась. `pointer-events: none` — завеса не перехватывает клики.

## Замечания

**Фото закрывается `object-fit: cover`.** Кадр обрезается по короткой стороне, а не вписывается целиком: в плитке выбора важнее заполненность, чем полнота кадра.

**Завеса — псевдоэлемент, а не узел.** Отдельный `<span>` пришлось бы держать в разметке у каждого потребителя и он попадал бы в порядок чтения скринридера.

**Радиус наследуется от ступени размера** (`rectangle/{N}/rounded`), в отличие от `tab-product`, где он был зафиксирован на `border-radius/500`. Так вариант встаёт в общий ряд семьи.
