# Page Title / разметка и поведение

**Figma:** [470rar5EfRm4n14vHMXbpc → node 1050:139853](https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=1050-139853)

> [!NOTE]
> Этот файл — **author-owned**. ACB пишет первичный draft, потом не трогает.
> CSS (`page-title.css`) и preview (`preview.html`) генерируются ACB и при следующем
> refresh затрутся.

## HTML

Эталон из макета — путь «Главная › Рубрика» и заголовок страницы:

```html
<div class="ptitle">
  <nav class="crumbs" aria-label="Хлебные крошки">
    <ol class="crumbs__list">
      <li class="crumbs__item">
        <a class="btn-area btn-area-muted btn-area--100" href="/">
          <span class="btn-area__label">Главная</span>
        </a>
      </li>
      <li class="crumbs__sep" aria-hidden="true">
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false"><path d="M6.97958 5.76055C7.17476 5.56543 7.49134 5.56557 7.68661 5.76055L9.57235 7.6463C9.76759 7.84154 9.76756 8.15806 9.57235 8.35333L7.68661 10.2391C7.49134 10.4343 7.17481 10.4343 6.97958 10.2391C6.78447 10.0438 6.78443 9.72726 6.97958 9.53204L8.5118 7.99981L6.97958 6.46758C6.78458 6.2723 6.7844 5.95573 6.97958 5.76055Z" fill="currentColor"/></svg>
      </li>
      <li class="crumbs__item">
        <span class="crumbs__current" aria-current="page">Рубрика</span>
      </li>
    </ol>
  </nav>
  <div class="heading heading--h1">
    <h1 class="heading__title">Рубрика</h1>
  </div>
</div>
```

Без крошек — например, на главной, где пути нет:

```html
<div class="ptitle">
  <div class="heading heading--h1">
    <h1 class="heading__title">Товары для дома</h1>
  </div>
</div>
```

Подключение по порядку: `focus-selection.css`, `button-area.css`, `breadcrumbs.css`,
`heading.css`, затем `page-title.css`.

## Поведение

| Ситуация | Что происходит |
|---|---|
| Длинный путь | Крошки переносятся на следующую строку (правило `breadcrumbs`); зазор до заголовка остаётся 12 |
| Длинный заголовок | Переносится и выравнивается `text-wrap: balance` (правило `heading`) |
| Узкий экран | Кегль h1 уменьшается внутри роли по брейкпоинту; зазор `space-3` фиксирован |
| Нет крошек | Колонка из одного заголовка, зазора нет |
| Тёмный островок | Цвета берут вложенные компоненты из ролей — `ptitle` красить нечего |

## Чего нет

- **Своего вертикального ритма снаружи.** Отступ над крошками и под заголовком задаёт
  блок или страница, как у `heading`.
- **Разметки BreadcrumbList для поиска.** Её отдаёт страница или блок (`json_ld`), а не
  вид компонента.
- **Действия у заголовка.** В макете скрыто — см. SKILL.md.
