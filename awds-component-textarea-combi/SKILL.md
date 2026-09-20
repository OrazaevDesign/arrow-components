---
name: awds-component-textarea-combi
description: Textarea Combi ArrowDS (.tcombi).
---

# Textarea Combi ArrowDS

Многострочное поле с подписью **внутри рамки**: метка сверху, значение под ней, ручка ресайза в углу. Комби-версия `awds-component-textarea`, как `input-combi` для `input`.

Собран 16.09.2026 из секции [↪ textarea-combi](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=44-75250) файла «💠 arrow ↪ components». Не правь `references/*.css` руками — затрётся при следующем refresh.

## Разметка

```html
<label class="tcombi tcombi-default tcombi--400">
  <span class="tcombi__label">Комментарий к заказу</span>
  <textarea class="tcombi__field" name="comment" rows="3"></textarea>
</label>
```

Корень — `<label>`: клик по рамке ставит курсор в поле, и отдельный `for` не нужен. Метка живёт внутри рамки, поэтому подпись снаружи не ставится — иначе подписей будет две.

## Метка здесь не плавает

Главное отличие от `input-combi`. У однострочного поля метка стоит по центру и уезжает наверх при фокусе — там есть куда. У многострочного центра нет: текст занимает три строки, метка всегда наверху, значение всегда под ней.

Поэтому в CSS нет ни `:placeholder-shown`, ни состояния «заполнено»: их незачем различать. Если поле должно показывать подпись только при вводе — это `textarea` с подписью снаружи, другой компонент.

## Тона

| Класс | Когда |
|---|---|
| `.tcombi-default` | Обычное поле на светлом фоне |
| `.tcombi-light` | Поле на сером блоке: фон белый, иначе контрол сольётся с подложкой |
| `.tcombi-success` | Значение принято |
| `.tcombi-error` | Значение не принято |
| `.tcombi-ghost` | Без фона и рамки — тон несёт только текст |
| `.tcombi-autofill` | Автозаполнение браузера |

Тона `secondary` нет — как и у `textarea`, и в отличие от `input` и `input-combi`. Многострочное поле на брендовой заливке в макете не рисовали.

## Размеры

| Класс | Значение | Метка | Высота |
|---|---|---|---|
| `.tcombi--300` | 14 / 20 | 11 | 76px |
| `.tcombi--400` | 14 / 20 | 11 | **по умолчанию**, 80px |
| `.tcombi--500` | 16 / 20 | 12 | 88px |
| `.tcombi--600` | 16 / 20 | 12 | 92px |

Высота = `input-top + 3 × line-height + input-bottom` и задана как `min-block-size`: три строки — минимум, который увеличивает атрибут `rows` или сам пользователь ресайзом.

Ступеней четыре, а не семь: у 50, 100 и 200 комби-ячейки в теме стоят в `space-0` — метке некуда уезжать при высоте контрола 32px и ниже.

## Откуда берутся значения

| Что | Источник | Где живёт |
|---|---|---|
| Цвета состояний (bg / chroma / border / текст / метка) | роли с якорем ячейки `form-control/{тон}/…` | `references/textarea-combi-{тон}.css` |
| Вертикали метки и значения | `var(--awds-space-*)` по ячейкам `rectangle/{N}/combi/{label-top, input-top, input-bottom}` | `map.size.rectangle` |
| Горизонтальный отступ | `var(--awds-space-*)` по ячейке `rectangle/{N}/text-gap` — всегда, слотов нет | там же |
| Кольцо фокуса | `var(--awds-focus-color-muted)`, вариант `offset=outside · tone=muted` | слой `awds-component-focus-selection` |
| Гашение | `var(--awds-opacity-40)` | ячейка `opacity/control/disabled` |

## Три вещи, которые легко сделать неправильно

1. **Не добавляй подпись снаружи.** Она уже внутри рамки. Две подписи у одного поля — частая ошибка при переходе с обычного `textarea`.
2. **Не фиксируй высоту через `height`.** Три строки — минимум: `rows` и ручка ресайза должны работать. Нужна неизменная высота — класс `.tcombi--fixed`, он гасит ресайз.
3. **Не смешивай способы подписи в одной форме.** Либо всё на combi-контролах (метка внутри), либо всё с подписями снаружи. Смешение читается как ошибка вёрстки.

## Доступность

- Корень `<label>` связывает метку и поле без атрибутов; если корень не `<label>`, нужен `aria-label` на `<textarea>`.
- Фокус виден при любом способе входа (`:focus-within`), кольцо — брендовое при 50%.
- Выключенное гасится до 40%: контраст ниже AA, рядом нужен текст-причина.
- Ресайз только вертикальный: горизонтальный ломал бы раскладку формы.

## Файлы

[default](references/textarea-combi-default.css) · [light](references/textarea-combi-light.css) · [success](references/textarea-combi-success.css) · [error](references/textarea-combi-error.css) · [ghost](references/textarea-combi-ghost.css) · [autofill](references/textarea-combi-autofill.css) — каждый самодостаточен: база плюс свой тон.

Разметка и состояния — [textarea-combi-default.md](references/textarea-combi-default.md). Визуальная QA — [preview.html](references/preview.html).

## Соседи

- **[awds-component-textarea](../awds-component-textarea/SKILL.md)** — то же поле с подписью снаружи, семь ступеней.
- **[awds-component-input-combi](../awds-component-input-combi/SKILL.md)** — однострочный комби-контрол, где метка плавает.
