# Button Menu — разметка и состояния

**Figma:** [button-menu / default](https://www.figma.com/design/rRCDPR2SJ90wJZCr5rsXAd/%F0%9F%92%A0-comp-%E2%86%AA-buttons?node-id=539-63199)
· [button-menu / accent-selected](https://www.figma.com/design/rRCDPR2SJ90wJZCr5rsXAd/%F0%9F%92%A0-comp-%E2%86%AA-buttons?node-id=1014-348)

> [!NOTE]
> `button-menu.md` — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`button-menu.css`) и preview генерируются и при refresh затрутся.

Кнопка, открывающая меню: круглая эмблема + шеврон, опционально точка-индикатор.
Подключается `references/button-menu.css` (один раз глобально) плюс CSS компонентов из
слотов — `awds-component-emblem`, `awds-component-focus-selection` и, если нужна точка,
`awds-component-notice`.

Три класса обязательны: база `.btn-menu`, тон (`-default` или `-accent-selected`) и
ступень (`--400` / `--300` / `--200`).

## Аватар пользователя (content = avatar)

```html
<button class="btn-menu btn-menu-default btn-menu--400" type="button"
        aria-haspopup="menu" aria-expanded="false" aria-label="Профиль">
  <span class="btn-menu__emblem">
    <span class="emb emb-img emb--150">
      <img src="/media/user.jpg" alt="">
    </span>
  </span>
  <svg class="btn-menu__chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor"
       stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M5 8l5 5 5-5"/>
  </svg>
</button>
```

Вид эмблемы — любой из трёх «портретных»: `emb-img` (фото), `emb-initials` (инициалы),
`emb-placeholder` (силуэт). Кнопке всё равно который: класс приносит эмблема.

## Флаг языка (content = flag)

```html
<button class="btn-menu btn-menu-default btn-menu--400" type="button"
        aria-haspopup="menu" aria-expanded="false" aria-label="Язык: русский">
  <span class="btn-menu__emblem">
    <span class="emb emb-icon emb--150">
      <svg viewBox="0 0 24 24" aria-hidden="true">…</svg>
    </span>
  </span>
  <svg class="btn-menu__chevron" viewBox="0 0 20 20" aria-hidden="true">…</svg>
</button>
```

`emb-icon` — четвёртый вид эмблемы: произвольная иконка на светлой подложке
`surface-bright`, без кольца. Его ступени `150 · 100 · 50` заведены ровно под эту кнопку.

**Флага нет — код языка текстом.** Вместо выдуманной пиктограммы ставится
`emb-initials` с кодом:

```html
<span class="btn-menu__emblem">
  <span class="emb emb-initials emb--150">KZ</span>
</span>
```

Стиль инициалов у эмблемы уже есть (`text-transform: uppercase`, Control-шкала кегля), а
второй графики для «языка без картинки» дизайн-система не описывает. Решение владельца ДС
от 31.08.2026.

## С точкой-индикатором (badge)

Точка — инстанс `awds-component-notice`, вариант primary, ступень 100 (диаметр 6px). Живёт
**внутри** `.btn-menu__emblem`, потому что прижата к углу круга, а не кнопки. В макете
свойство `badge` по умолчанию `false` — то есть точки нет, пока её не попросили.

```html
<button class="btn-menu btn-menu-default btn-menu--400" type="button"
        aria-haspopup="menu" aria-expanded="false"
        aria-label="Профиль, есть новые уведомления">
  <span class="btn-menu__emblem">
    <span class="emb emb-initials emb--150">АК</span>
    <span class="btn-menu__badge">
      <span class="notice notice-accent notice--100" aria-hidden="true"></span>
    </span>
  </span>
  <svg class="btn-menu__chevron" viewBox="0 0 20 20" aria-hidden="true">…</svg>
</button>
```

Точка декоративная: смысл («есть непрочитанные») должен быть в `aria-label` кнопки, а сама
точка `aria-hidden`.

## Раскрытое меню (тон accent-selected)

```html
<button class="btn-menu btn-menu-accent-selected btn-menu--400" type="button"
        aria-haspopup="menu" aria-expanded="true">…</button>
```

Тон меняет фон, обводку и цвет шеврона на группу `list/selected-secondary`. Атрибут
`aria-expanded` живёт рядом и отвечает за доступность: класс — про вид, атрибут — про
смысл. Меняются вместе.

Тон переключается **заменой класса**, а не добавлением модификатора: `.btn-menu-default`
и `.btn-menu-accent-selected` взаимоисключающие (один дефис), вместе не ставятся.

## Ступени

| Класс кнопки | Класс эмблемы | Эмблема | Шеврон | Кнопка |
| --- | --- | --- | --- | --- |
| `btn-menu--400` | `emb--150` | 32px | 20px | 62 × 40 |
| `btn-menu--300` | `emb--100` | 28px | 20px | 58 × 36 |
| `btn-menu--200` | `emb--50` | 24px | 16px | 50 × 32 |

Ступень кнопки и ступень эмблемы задаются независимо — совпадение по таблице обязан
обеспечить потребитель. Несовпадение не ломает вёрстку (высота считается от содержимого),
но расходится с макетом.

## Состояния

| Состояние | Что меняется |
| --- | --- |
| rest | `default`: фон и обводка `list/unselected` · шеврон `surface-on-highest`. `accent-selected`: фон `primary-container-core`, обводка `primary-container-on-lowest`, шеврон `primary-container-on-highest` |
| hover | `default`: фон и обводка темнеют (`secondary-container-dim`) · шеврон `secondary-container-on-highest`. `accent-selected`: без изменений — в теме у всех четырёх состояний одно значение |
| focus | цвета как в rest + кольцо фокуса снаружи бокса |
| active | `default`: фон возвращается к `core`, шеврон остаётся контрастным |
| disabled | rest + `opacity: var(--awds-state-opacity-control-disabled)`, клики сняты |

## Доступность

- Тег — `<button type="button">`. Кнопка открывает меню, значит `aria-haspopup="menu"` и
  `aria-expanded`, который переключается вместе с тоном.
- `aria-label` обязателен: текста внутри нет. Для языка — «Язык: русский», для профиля —
  «Профиль» (плюс упоминание уведомлений, если стоит точка).
- Картинке в эмблеме — `alt=""` (декоративна, смысл несёт сама кнопка); инициалы, силуэт и
  флаг скринридер тоже читать не должен.
- Кольцо фокуса приходит слоем `awds-component-focus-selection`, вариант Outside + Default
  — снаружи бокса, потому что кнопка не растягивается и место снаружи есть.
