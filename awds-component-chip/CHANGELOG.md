# chip — журнал версий

## 1.1.2 — 2026-11-11 — PATCH · visual
Ячейка chip/unselected/color-rest и color-focus перенаправлены в студии: secondary-container-on-high → secondary-container-on-highest; код догнал (arrow-studio-sync).
Потребителю: Ничего делать не нужно. Вид: текст невыбранного чипса из серого стал почти чёрным.

## 1.1.1 — 2026-11-11 — PATCH
Контракт разметки: чипс «Все», раскрывающий ряд ссылок, — кнопка с aria-expanded; текущая страница в ряду ссылок не выводится (если выводится — chip-selected с aria-current="page"). CSS не менялся
Потребителю: Ничего делать не нужно

## 1.1.0 — 2026-11-11 — MINOR
Чипс-ссылка: <a class="chip chip-unselected" href> для рядов ссылок на соседние страницы раздела (бренды рубрики, популярные категории бренда); CSS не менялся
Потребителю: Ничего делать не нужно; ряд ссылок теперь собирается чипсами, а не кнопками

## 1.0.3 — 2026-10-19 — PATCH · visual
Сетка ячеек State как у кнопки: каждое свойство × rest/hover/focus/active (19 новых, selected border/color/icon-remove → -rest). Ячейки chip/unselected hover и active перенаправлены в студии на accent: hover bg/border accent-container-core, текст и крестик accent-core; active accent-container-dim, текст и крестик accent-dim; код догнал (arrow-studio-sync).
Потребителю: Ничего делать не нужно. Вид: невыбранный чипс на наведении и нажатии подсвечивается акцентом вместо primary-контейнера.

## 1.0.2 — 2026-10-19 — PATCH · visual
unselected: обводка в цвет фона (rest secondary-container-core, hover primary-container-core); крестик на hover — primary-container-on, ячейки icon-remove-rest / icon-remove-hover; переход цвета крестика
Потребителю: Пересобрать копию chip.css в блоках; разметка не меняется

## 1.0.1 — 2026-10-19 — PATCH · visual
Крестик «убрать» — system-close_circle-filled на общем суффиксе с show-gap = off: справа от крестика только padding ступени, без gap
Потребителю: Пересобрать копию chip.css в блоках; в разметке крестика заменить иконку на system-close_circle-filled (viewBox 0 0 20 20)

## 1.0.0 — 2026-10-19 — INIT · visual
Точка отсчёта версий. В состав входит переезд кольца фокуса в слой awds-component-focus-selection (21.08): у потребителей стоит прежняя геометрия, поэтому релиз помечен visual.
Потребителю: пересобрать копии CSS в блоках и посмотреть превью — зазор кольца фокуса изменился.
