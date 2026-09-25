---
name: awds-components
description: Карта компонентов ArrowDS — что уже реализовано и какой скилл открыть. Используй ВСЕГДА, прежде чем верстать любой элемент интерфейса: кнопку, поле, форму, список, таблицу, карточку товара, плашку, подсказку, индикатор, аватар, цену, ссылку. Отвечает на «есть ли готовый компонент», «как это у нас называется», «из чего собрать карточку». Компоненты названы по-английски, а спрашивают их по-русски — здесь словарь соответствий. Не верстай элемент руками, не заглянув сюда: почти всё уже есть, и собранное заново разойдётся с дизайн-системой.
---

# Компоненты ArrowDS — карта

Точка входа в библиотеку. У компонент-скиллов в листинге только имена: всё знание
о том, что они делают и как их называют, лежит здесь.

**Порядок работы:** нашли компонент в таблице → открыли его скилл по ссылке →
верстаете по его разметке и CSS. Значения (цвета, отступы, типографика) — из
`arrow-design-system`, компонент их не выдумывает.

**Не нашли по имени** — ищите по словарю:

```bash
grep -i "<слово>" .claude/skills/awds-components/SKILL.md
```

Колонка «Как называют» и есть словарь: `плашка` → `badge`, `тумблер` → `switch`,
`точки под каруселью` → `slider`.

**Не нашли вовсе** — компонента может не быть. Не собирайте замену из кусков молча:
скажите об этом, компонент заводится через `arrow-components-builder` из макета в
Figma.

---

## 🔶 complex-component

Составные. **Смотреть первыми:** если задача — карточка товара, поле формы или
таблица целиком, готовое уже собрано, и разбирать его на примитивы не нужно.

**Но «первыми» не значит «всегда».** Если спрашивают про поведение одного контрола —
«подпись внутри рамки», «счётчик символов», «выбор одного из списка» — нужен контрол из
`forms`, а не композит вокруг него. Композит берут, когда нужна вся обвязка: подпись,
пояснение, текст ошибки.

<!-- generated:complex-component -->

| Компонент | Что это | Как называют | Состав · входит в | Версия | Ссылки |
| --- | --- | --- | --- | --- | --- |
| [formfield](../awds-component-formfield/SKILL.md) | Поле формы целиком: подпись СНАРУЖИ, контрол, пояснение и текст ошибки | поле формы целиком, блок поля, валидация, текст ошибки под полем | внутри: checkbox, input, label, radio, select, switch, textarea, uploader | 1.0.11 | [макет](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=71-21455) · [задача](https://app.asana.com/1/15638570680505/project/1203198440472196/task/1218421798669854) |
| [heading](../awds-component-heading/SKILL.md) | Заголовок секции H1–H5 с опциональным действием «Все ›» | заголовок, заголовок секции, шапка блока, title | внутри: button-area | 1.0.6 | [макет](https://www.figma.com/design/fgXw7Tlrdfz0gCUi2xbZDt/%F0%9F%94%B6-B2C-%E2%86%AA-%C2%B9-Componets?node-id=6128-6392) · [задача](https://app.asana.com/1/15638570680505/project/1203198440472196/task/1218421798640911) |
| [product-card](../awds-component-product-card/SKILL.md) | Карточка товара: фото 3:4 с оверлеями, бейджи, избранное, две вьюхи | карточка товара, товар, карточка в гриде, плитка товара | внутри: badge, button, button-favorites, focus-selection, price, slider, tooltip | 1.1.12 | [макет](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=468-59619) · [задача](https://app.asana.com/1/15638570680505/project/1203198440472196/task/1218422992569426) |
| [table](../awds-component-table/SKILL.md) | Таблица: шапка, строки, выравнивание колонок, зебра, адаптив | таблица, характеристики, сравнение, тарифы | внутри: focus-selection | 1.0.10 | [макет](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=76-57983) · [задача](https://app.asana.com/1/15638570680505/project/1203198440472196/task/1218421826278966) |

<!-- /generated -->

## 💠 buttons

<!-- generated:buttons -->

| Компонент | Что это | Как называют | Состав · входит в | Версия | Ссылки |
| --- | --- | --- | --- | --- | --- |
| [button](../awds-component-button/SKILL.md) | Кнопка: primary, secondary, clean, addition; размеры и состояния | кнопка, баттон, кнопка действия, призыв к действию | внутри: focus-selection, progress · входит в: 7 компонентов | 2.2.6 | [макет](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=5-7) · [задача](https://app.asana.com/1/15638570680505/project/1203198440472196/task/1218422992693893) |
| [button-area](../awds-component-button-area/SKILL.md) | Кликабельная строка-обёртка во всю ширину с иконками | строка-ссылка, кликабельная область, строка меню, link-area | внутри: focus-selection, progress · входит в: heading, modal | 2.0.6 | [макет](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=5-9) · [задача](https://app.asana.com/1/15638570680505/project/1203198440472196/task/1218421798642337) |
| [button-favorites](../awds-component-button-favorites/SKILL.md) | Icon-only heart-toggle: добавить в избранное | избранное, сердечко, лайк, вишлист | внутри: button, focus-selection · входит в: product-card | 2.0.1 | [макет](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=5-10) · [задача](https://app.asana.com/1/15638570680505/project/1203198440472196/task/1218433190678568) |
| [button-group](../awds-component-button-group/SKILL.md) | Кнопки встык: внешние углы скруглены, стыки прямые | группа кнопок, кнопки встык, сегментированный контрол, назад-вперёд | внутри: button | 1.0.3 | [макет](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=5-12) · [задача](https://app.asana.com/1/15638570680505/project/1203198440472196/task/1218433190679024) |
| [button-menu](../awds-component-button-menu/SKILL.md) | Кнопка меню: эмблема с аватаром или флагом, шеврон, точка непрочитанных | кнопка профиля, профиль, аватар в шапке, кнопка аккаунта, меню пользователя, переключатель языка, кнопка языка, выбор языка, флаг в шапке | внутри: emblem, notice, focus-selection | 2.0.6 | [макет](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=5-11) · [задача](https://app.asana.com/1/15638570680505/project/1203198440472196/task/1218421798556856) |
| [button-overhung](../awds-component-button-overhung/SKILL.md) | Парящая кнопка: светлый фон плюс постоянная elevation-тень | парящая кнопка, нависающая кнопка, кнопка над медиа, кнопка на фото | внутри: focus-selection, progress | 2.0.12 | [макет](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=5-8) · [задача](https://app.asana.com/1/15638570680505/project/1203198440472196/task/1218421798642209) |

<!-- /generated -->

## 💠 tabs

Три компонента, а не один с осью — их путают, потому что все три по-русски
«вкладки».

- **`tab`** — одна вкладка навигации: переключает раздел страницы, выбранность
  показывает подчёркиванием, умеет счётчик. Живёт внутри `tab-group`, но законна и
  сама по себе.
- **`tab-product`** — не навигация: плитка выбора вариации товара (цвет, размер,
  комплектация), с подписью или с фото. Она ничего не переключает на странице, она
  меняет то, что покупают.
- **`tab-group`** — контейнер: держит ряд, раздаёт вложенным размерную ступень,
  прокручивает ряд при переполнении и несёт семантику `role="tablist"`, которую одна
  вкладка гарантировать не может. Своих цветов и шрифтов у него нет. Вид `underline`
  собран из `tab`, виды `boxed` и `separated` — из `button`.

Ряд вкладок собирают через `tab-group`, а не руками из `tab`: клавиатура, прокрутка
и ARIA живут в контейнере.

<!-- generated:tabs -->

| Компонент | Что это | Как называют | Состав · входит в | Версия | Ссылки |
| --- | --- | --- | --- | --- | --- |
| [tab](../awds-component-tab/SKILL.md) | Одна вкладка с подчёркиванием: выбранная и невыбранная, со счётчиком | вкладка, таб, переключатель разделов, вкладка раздела, подчёркнутая вкладка | внутри: focus-selection, notice · входит в: tab-group | 1.0.5 | [макет](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=8-42820) · [задача](https://app.asana.com/1/15638570680505/project/1203198440472196/task/1218421798659959) |
| [tab-group](../awds-component-tab-group/SKILL.md) | Контейнер вкладок: плашка, раздельные кнопки, подчёркивание; прокрутка при переполнении | группа вкладок, таббар, переключатель разделов, сегментированный контрол, панель вкладок, полоса вкладок, табы | внутри: tab, button, notice, scrollbar, focus-selection | 1.0.3 | [макет](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=8-43289) · [задача](https://app.asana.com/1/15638570680505/project/1203198440472196/task/1218421826367613) |
| [tab-product](../awds-component-tab-product/SKILL.md) | Плитка выбора вариации товара: цвет, размер, комплектация — с подписью или фото | выбор цвета, выбор размера, вариация товара, свотч, плитка размера, выбор расцветки, выбор комплектации | внутри: focus-selection | 1.0.5 | [макет](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=8-42962) · [задача](https://app.asana.com/1/15638570680505/project/1203198440472196/task/1218421650244449) |

<!-- /generated -->

## 💠 forms

Контролы формы. Собирать поле целиком — через `formfield`, он раздаёт размерную
ступень подписи и контролу.

<!-- generated:forms -->

| Компонент | Что это | Как называют | Состав · входит в | Версия | Ссылки |
| --- | --- | --- | --- | --- | --- |
| [checkbox](../awds-component-checkbox/SKILL.md) | Чекбокс на нативном input: состояния checked и indeterminate | чекбокс, галочка, флажок, согласие, выбрать всё | внутри: focus-selection · входит в: formfield, label | 1.0.10 | [макет](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=5-21) · [задача](https://app.asana.com/1/15638570680505/project/1203198440472196/task/1218436374081219) |
| [datepicker](../awds-component-datepicker/SKILL.md) | Панель выбора даты: дни, месяцы, годы и период из двух панелей | календарь, выбор даты, датапикер, выбрать период, диапазон дат, календарик | внутри: focus-selection | 1.0.2 | [макет](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=44-87012) · [задача](https://app.asana.com/1/15638570680505/project/1203198440472196/task/1218421650220439) |
| [input](../awds-component-input/SKILL.md) | Текстовое поле, подпись СНАРУЖИ рамки | поле ввода, инпут, текстовое поле, поле формы | внутри: focus-selection · входит в: formfield, uploader | 1.0.14 | [макет](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=5-14) · [задача](https://app.asana.com/1/15638570680505/project/1203198440472196/task/1218421798643467) |
| [input-combi](../awds-component-input-combi/SKILL.md) | Текстовое поле с плавающей меткой: подпись внутри рамки уезжает наверх | плавающая метка, подпись внутри поля, подпись уезжает наверх, floating label, компактная форма | внутри: focus-selection | 1.0.14 | [макет](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=5-15) · [задача](https://app.asana.com/1/15638570680505/project/1203198440472196/task/1218421798641834) |
| [input-inline](../awds-component-input-inline/SKILL.md) | Поле ввода без рамки и фона — текст прямо в потоке | инлайн-поле, поле без рамки, редактируемое значение, правка на месте | внутри: focus-selection | 1.0.0 | [макет](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=34-41032) · [задача](https://app.asana.com/1/15638570680505/project/1203198440472196/task/1218550678089922) |
| [label](../awds-component-label/SKILL.md) | Подпись к контролу: размеры, обязательность, состояние ошибки | подпись, лейбл, название поля, подпись над полем | внутри: checkbox, focus-selection, radio, switch · входит в: formfield | 1.0.9 | [макет](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=5-13) · [задача](https://app.asana.com/1/15638570680505/project/1203198440472196/task/1218421650158060) |
| [radio](../awds-component-radio/SKILL.md) | Радиокнопка на нативном input: выбор одного из списка | радио, радиокнопка, выбор одного, способ доставки, способ оплаты | внутри: focus-selection · входит в: formfield, label | 1.0.10 | [макет](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=5-22) · [задача](https://app.asana.com/1/15638570680505/project/1203198440472196/task/1218433190718216) |
| [select](../awds-component-select/SKILL.md) | Выпадающий список, подпись снаружи рамки | селект, выпадающий список, дропдаун, выбор из перечня | внутри: focus-selection, list-item · входит в: formfield | 1.0.20 | [макет](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=5-17) · [задача](https://app.asana.com/1/15638570680505/project/1203198440472196/task/1218421650179199) |
| [select-combi](../awds-component-select-combi/SKILL.md) | Выпадающий список с плавающей меткой внутри рамки | селект с плавающей меткой, дропдаун с подписью внутри | внутри: focus-selection, list-item | 1.0.21 | [макет](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=5-18) · [задача](https://app.asana.com/1/15638570680505/project/1203198440472196/task/1218422992765221) |
| [switch](../awds-component-switch/SKILL.md) | Тумблер вкл/выкл: размеры, состояния, подпись | тумблер, переключатель, свитч, вкл-выкл, настройка | внутри: focus-selection · входит в: formfield, label | 1.0.9 | [макет](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=5-23) · [задача](https://app.asana.com/1/15638570680505/project/1203198440472196/task/1218421798669723) |
| [textarea](../awds-component-textarea/SKILL.md) | Многострочное поле: счётчик символов, авто-рост | текстовая область, многострочное поле, комментарий, отзыв, адрес | внутри: focus-selection · входит в: formfield | 1.0.15 | [макет](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=5-16) · [задача](https://app.asana.com/1/15638570680505/project/1203198440472196/task/1218421798659280) |
| [textarea-combi](../awds-component-textarea-combi/SKILL.md) | Многострочное поле с подписью ВНУТРИ рамки | текстовая область с меткой, комментарий с подписью внутри, многострочное поле комби, textarea с плавающей меткой | внутри: focus-selection | 1.0.2 | [макет](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=44-75250) · [задача](https://app.asana.com/1/15638570680505/project/1203198440472196/task/1218552368692065) |
| [uploader](../awds-component-uploader/SKILL.md) | Загрузчик файлов: поле выбора, drag-and-drop, список загруженного | загрузка файлов, аплоадер, прикрепить файл, drag-and-drop, фото в отзыве | внутри: button, focus-selection, input · входит в: formfield | 2.0.1 | [макет](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=5-26) · [задача](https://app.asana.com/1/15638570680505/project/1203198440472196/task/1218422992779399) |

<!-- /generated -->

## 💠 elements

Самостоятельные примитивы: показать цену, статус, оценку, медиа, прогресс.

<!-- generated:elements -->

| Компонент | Что это | Как называют | Состав · входит в | Версия | Ссылки |
| --- | --- | --- | --- | --- | --- |
| [link](../awds-component-link/SKILL.md) | Текстовая ссылка: только цвет, без размеров | ссылка, линк, текстовая ссылка, кликабельный текст | внутри: focus-selection | 1.0.6 | [макет](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=453-3471) · [задача](https://app.asana.com/1/15638570680505/project/1203198440472196/task/1218433190731839) |
| [range](../awds-component-range/SKILL.md) | Ползунок-регулятор: трек, ручка, диапазон двумя ручками | ползунок, регулятор, фильтр по цене, диапазон, слайдер цены | внутри: focus-selection | 2.0.10 | [макет](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=5-35) · [задача](https://app.asana.com/1/15638570680505/project/1203198440472196/task/1218421826367301) |
| [rating](../awds-component-rating/SKILL.md) | Оценка звёздами: пять звёзд, выбор и режим показа | рейтинг, звёзды, звёздочки, оценка, оценка товара | внутри: focus-selection | 2.0.9 | [макет](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=5-36) · [задача](https://app.asana.com/1/15638570680505/project/1203198440472196/task/1218436374095445) |
| [badge](../awds-component-badge/SKILL.md) | Градиентная пилюля для скидки, служебного сообщения и стадии заказа | бейдж, плашка, лейбл, ярлык, скидка, стикер, статус заказа | входит в: product-card | 1.1.4 | [макет](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=5-29) · [задача](https://app.asana.com/1/15638570680505/project/1203198440472196/task/1218421826211735) |
| [content-area](../awds-component-content-area/SKILL.md) | Медиа-слот: иллюстрация, изображение или видео с соотношением сторон | медиа, картинка, изображение, видео, медиа-область, слот под фото | — | 2.0.3 | [макет](https://www.figma.com/design/UCYhMA1JeNUNuVGsxUEne7/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B9-Elemets?node-id=2221-43) · [задача](https://app.asana.com/1/15638570680505/project/1203198440472196/task/1218436374096208) |
| [emblem](../awds-component-emblem/SKILL.md) | Круг с содержимым: инициалы, фото, силуэт-заглушка или произвольная иконка | эмблема, аватар, аватарка, юзерпик, фото профиля, портрет, круглая иконка, флаг в круге | входит в: button-menu | 3.0.6 | [макет](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=5-40) · [задача](https://app.asana.com/1/15638570680505/project/1203198440472196/task/1218421650241050) |
| [focus-selection](../awds-component-focus-selection/SKILL.md) | Слой-контракт --awds-focus-*: кольцо фокуса для навигации с клавиатуры | фокус, обводка, кольцо фокуса, focus ring, клавиатурная навигация | входит в: 29 компонентов | 2.0.10 | [макет](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=6-36) · [задача](https://app.asana.com/1/15638570680505/project/1203198440472196/task/1218422992781103) |
| [notice](../awds-component-notice/SKILL.md) | Счётчик или точка-индикатор поверх иконки | счётчик, бейдж на иконке, точка, индикатор непрочитанного, число на иконке | входит в: button-menu, tab, tab-group | 2.0.3 | [макет](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=6-229) · [задача](https://app.asana.com/1/15638570680505/project/1203198440472196/task/1218422992779408) |
| [price](../awds-component-price/SKILL.md) | Цена товара: текущая и старая зачёркнутая, валюта, ориентация | цена, стоимость, ценник, старая цена, перечёркнутая цена | входит в: product-card | 2.0.5 | [макет](https://www.figma.com/design/UCYhMA1JeNUNuVGsxUEne7/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B9-Elemets?node-id=2093-760) · [задача](https://app.asana.com/1/15638570680505/project/1203198440472196/task/1218433190798064) |
| [progress](../awds-component-progress/SKILL.md) | Индикатор загрузки: линейная полоса и кольцо, determinate и indeterminate | прогресс, загрузка, индикатор загрузки, полоса загрузки, прогресс-бар, спиннер | входит в: button, button-area, button-overhung, toast | 2.0.2 | [макет](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=5-34) · [задача](https://app.asana.com/1/15638570680505/project/1203198440472196/task/1218433190743989) |
| [scrollbar](../awds-component-scrollbar/SKILL.md) | Красит нативную полосу прокрутки браузера, своей разметки нет | скроллбар, полоса прокрутки, прокрутка, скролл | входит в: modal, tab-group | 2.0.6 | [макет](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=5-39) · [задача](https://app.asana.com/1/15638570680505/project/1203198440472196/task/1218421798697073) |
| [slider](../awds-component-slider/SKILL.md) | Индикатор пагинации карусели: точки, мини-точки, счётчик «1/N» | точки под каруселью, пагинация, дотсы, индикатор слайда, карусель | входит в: product-card | 1.0.8 | [макет](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=5-37) · [задача](https://app.asana.com/1/15638570680505/project/1203198440472196/task/1218421798695713) |

<!-- /generated -->

## 💠 lists

<!-- generated:lists -->

| Компонент | Что это | Как называют | Состав · входит в | Версия | Ссылки |
| --- | --- | --- | --- | --- | --- |
| [list-item](../awds-component-list-item/SKILL.md) | Строка списка: пункт меню, пункт выпадающего списка, вкладка таббара, плитка вариации | пункт списка, строка списка, пункт меню, вкладка таббара, элемент списка | внутри: focus-selection · входит в: select, select-combi | 1.0.12 | [макет](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=8-59676) · [задача](https://app.asana.com/1/15638570680505/project/1203198440472196/task/1218422992787788) |

<!-- /generated -->

## 💠 navigation

Навигация по каталогу: где я и как перейти дальше. Контур совпадает с секцией доски
`💠 8 · navigation` и страницей `8 · navigation` в макете.

<!-- generated:navigation -->

| Компонент | Что это | Как называют | Состав · входит в | Версия | Ссылки |
| --- | --- | --- | --- | --- | --- |
| [pagination](../awds-component-pagination/SKILL.md) | Лента страниц с прокруткой: номера, стрелки листания и подпись «сколько из скольких» | пагинация, страницы, постраничная навигация, листалка, переключение страниц, номера страниц | внутри: button, focus-selection | 1.0.1 | [макет](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=78-47712) · [задача](https://app.asana.com/1/15638570680505/task/1218422992809185) |

<!-- /generated -->

## 💠 popups

<!-- generated:popups -->

| Компонент | Что это | Как называют | Состав · входит в | Версия | Ссылки |
| --- | --- | --- | --- | --- | --- |
| [modal](../awds-component-modal/SKILL.md) | Окно поверх страницы: диалог по центру и панель у края, на мобильном — шторка | модалка, модальное окно, диалог, попап, сайдпейдж, боковая панель, шторка, окно подтверждения | внутри: button, button-area, scrollbar | 1.0.1 | [макет](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=5-48) · [задача](https://app.asana.com/1/15638570680505/project/1203198440472196/task/1218731434531418) |
| [toast](../awds-component-toast/SKILL.md) | Плашка-уведомление: иконка или таймер, текст, кнопка действия и крестик | тост, уведомление, плашка уведомления, снекбар, сообщение о результате, всплывающее сообщение | внутри: progress, focus-selection | 1.0.0 | [макет](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=5-49) · [задача](https://app.asana.com/1/15638570680505/project/1203198440472196/task/1218701192164026) |
| [popover](../awds-component-popover/SKILL.md) | Панель-поповер с хвостом и слотом под меню, календарь или фильтр | поповер, выпадающая панель, панель меню, всплывающая панель, дропдаун-панель | — | 1.0.0 | [макет](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=5-47) · [задача](https://app.asana.com/1/15638570680505/project/1203198440472196/task/1218693238915653) |
| [tooltip](../awds-component-tooltip/SKILL.md) | Подсказка-пузырь с хвостом-стрелкой, светлая и contrast | тултип, подсказка, всплывающая подсказка, хинт | входит в: product-card | 2.0.0 | [макет](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=5-46) · [задача](https://app.asana.com/1/15638570680505/project/1203198440472196/task/1218436374099537) |

<!-- /generated -->

---

## Двойники: что с чем путают

| Берут | А нужен | Разница |
| --- | --- | --- |
| `input` | `input-combi` | подпись СНАРУЖИ рамки против плавающей метки ВНУТРИ |
| `select` | `select-combi` | то же самое для выпадающего списка |
| `slider` | `range` | точки-пагинация карусели против ползунка-регулятора |
| `checkbox` | `switch` | выбор из списка против мгновенного вкл/выкл |
| `checkbox` | `radio` | несколько вариантов против одного из списка |
| `button` | `button-area` | кнопка против кликабельной строки во всю ширину |
| `button` | `button-overhung` | обычная кнопка против парящей с постоянной тенью |
| `button` | `button-menu` | кнопка действия против кнопки, которая открывает меню или выбор: эмблема, шеврон, точка непрочитанных |
| `button-menu` | `button-area` | слово «меню» есть у обоих: `button-menu` — компактная кнопка в шапке, которая меню ОТКРЫВАЕТ; `button-area` — кликабельная строка ВНУТРИ меню |
| `badge` | `notice` | пилюля со скидкой или статусом против счётчика на иконке |
| `tab` | `tab-group` | одна вкладка против контейнера ряда. Ряд собирают группой: клавиатура, прокрутка и `role="tablist"` живут в ней |
| `tab` | `tab-product` | вкладка переключает раздел страницы, плитка вариации меняет то, что покупают: цвет, размер, комплектацию |
| `tab` | `list-item` | вкладка раздела с подчёркиванием против строки списка. У `list-item` есть вариант `tabbar` — это вкладка НИЖНЕЙ панели, третья сущность, и по слову «вкладка» находятся все три |
| `tab-group` | `button-group` | панель навигации по разделам (размерная ступень, мост, `role="tablist"`) против кнопок встык в один сегментированный контрол |
| `tab-product` | `list-item` вариант `variation` | обе — выбор вариации товара: компактная плитка с короткой подписью или фото против двухстрочной строки-плитки, где описание обязательно |
| `emblem` | `content-area` | круг фиксированной ступени (инициалы, фото, флаг, иконка) против медиа-слота с соотношением сторон |
| `formfield` | `input` / `input-combi` | поле целиком с подписью, ошибкой и пояснением против одного контрола. Спрашивают про поведение контрола («подпись внутри рамки», «счётчик символов») — нужен контрол, а не композит |

## Общие правила

**Кольцо фокуса не инлайнится.** Компоненты ссылаются на контракт `--awds-focus-*`
из [focus-selection](../awds-component-focus-selection/SKILL.md) — это слой, а не
компонент для вставки в разметку. От него зависят 24 компонента — точное число
всегда в его строке таблицы `elements`, колонка «входит в».

**Размерная ступень едет мостом, а не классом на потомке.** Составной компонент
кормит size-аккумуляторы вложенных: `.fld--{N}` раздаёт ступень подписи и контролу,
поэтому `.lbl--400` рядом писать не нужно. Мост весит `(0,2,0)` против `(0,1,0)` у
size-класса — точные правила в `bridge_note` меты каждого композита.

**Базовый класс короткий и свой.** `.fld`, а не `.formfield` и не `.field`: общие
имена почти наверняка заняты у потребителя. Греп-гейт по префиксу `--awds-form*`
снят 25.08.2026 — он пересекался с приватными аккумуляторами `--awds-{base_class}-*`
и блокировал публикацию за легитимное имя; сейчас чужой компонентный токен ловит
`token-refs-check` (см. [publish-workflow](../arrow-components-publisher/references/publish-workflow.md)).
Причина по каждому базовому классу — в `base_class_note` меты.

**Прослойки компонентных цветовых токенов нет.** Цвета инлайнятся ролями
`rgb(var(--primary-core))`, размеры — целями ступеней Size, резолвленными при сборке
в шаг публичной шкалы (`--awds-space-*`, `--awds-rounded-border-radius-*`,
`--awds-control-*`): сам слой Size приватен, его имён в теме нет. См.
[arrow-design-system](../arrow-design-system/SKILL.md).

## Как устроена эта карта

Секции и их порядок — author-owned, правятся руками владельцем дизайн-системы.
Таблицы между маркерами `<!-- generated:{family} -->` собирает
`scripts/build-component-catalog.mjs` из `component.meta.json` каждого компонента
(поля `family`, `summary`, `aliases`, `uses`). Руками таблицы не правятся —
затрутся при следующем прогоне.

Семейство существует, если для него есть маркер здесь. Значение `family` без
секции — ошибка генератора, а не повод завести секцию на лету.
