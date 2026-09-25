# Toast — Alert (ошибка)

Сообщение о том, что действие не прошло: не удалось оплатить, не сохранилось, кончился товар. Фон — роль ошибки `error/core`, текст — `error/on`. Островка темы здесь нет: тон ошибки одинаков в обеих темах, роль уже контрастна.

**Figma:** https://www.figma.com/design/470rar5EfRm4n14vHMXbpc/%F0%9F%92%A0-arrow-%E2%86%AA-components?node-id=617-48420 (набор `toast / alert`)

## HTML

```html
<div class="toast toast-alert" role="status">
  <div class="toast__content">
    <span class="toast__icon"><svg viewBox="0 0 20 20" aria-hidden="true"><!-- иконка --></svg></span>
    <span class="toast__text">Не удалось оплатить</span>
  </div>
  <button class="toast__action" type="button">Повторить</button>
  <button class="toast__close" type="button" aria-label="Закрыть">
    <svg viewBox="0 0 20 20" aria-hidden="true"><!-- крестик --></svg>
  </button>
</div>
```

С обратным отсчётом вместо иконки:

```html
<span class="toast__icon">
  <span class="toast__timer">
    <svg class="progress progress-circular" viewBox="0 0 48 48" style="--awds-progress-value: 80"
         role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="5" aria-label="Осталось секунд">
      <circle class="progress-circular__arc" cx="24" cy="24" r="23" pathLength="100"/>
    </svg>
    <span class="toast__timer-value">4</span>
  </span>
</span>
```

## Стили

| Свойство | Значение |
|---|---|
| Фон | `rgb(var(--error-core))` — ячейка `toast/alert/bg` |
| Текст, иконка, кольцо | `rgb(var(--error-on))` — ячейка `toast/alert/color` |
| Остальное | как у `toast-normal`: тень `elevation-3`, скругление 8, отступы 10/6 |

## Состояния

У плашки нет. У кнопки и крестика — наведение и фокус с клавиатуры.
