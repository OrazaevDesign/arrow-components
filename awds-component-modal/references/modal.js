/* Modal — «назад» закрывает окно, а не уводит со страницы.

   Модальный <dialog> открывается без шага в истории браузера, поэтому жест «назад» на
   iPhone и кнопка «назад» браузера уводили на прошлую страницу, а окно оставалось. Модуль
   даёт каждому открытому окну свой шаг истории на том же адресе:
     • окно открылось (showModal) → pushState, адрес тот же;
     • «назад» → закрывается верхнее окно, и только оно; окно над окном — по одному;
     • окно закрыли изнутри (крестик, кнопка, подложка, Esc, «назад» Android) → модуль сам
       убирает свой шаг (history.go), следующее «назад» снова уводит со страницы;
     • ссылка внутри открытого окна ведёт через location.replace: иначе шаг окна остался бы
       в истории и «назад» с новой страницы вернул бы на ту же страницу дважды.
   «Назад» закрывает окно как Esc: сначала событие cancel. Обработчик отменил его (например,
   гасит вложенный список) — окно остаётся открытым, шаг возвращается.

   Блоки свои вызовы showModal не меняют: модуль видит открытие по атрибуту open у
   dialog.mdl (MutationObserver на весь документ), окно, открытое через show(), не трогает.

   Копия едет в каждый блок с окном, исполняется одна: первый экземпляр занимает
   window.awdsModalHistory. Блок, который сам пишет в историю сразу после закрытия окна,
   ждёт awdsModalHistory.settled(): шаг окна убирается асинхронно, и pushState до этого
   лёг бы не туда — «назад» модуля откатил бы запись блока. Обработчик popstate блока
   получает и шаги окон: адрес у них тот же, что под окном. */
(function () {
  if (window.awdsModalHistory || !window.history || !history.pushState || !window.MutationObserver) return;

  var KEY = 'awdsModal';
  var stack = [];   // открытые окна по порядку открытия
  var steps = 0;    // шагов окон в истории над базой
  var base = 0;     // глубина записи под первым окном (после перезагрузки с окном — не 0)
  var expect = 0;   // переходов history.go модуля, чей popstate ещё не пришёл
  var orphans = 0;  // шаги, которые убрать не вышло: их займут следующие окна
  var waiters = [];
  var timer = 0;

  function depth() {
    var s = history.state;
    return s && typeof s === 'object' && typeof s[KEY] === 'number' ? s[KEY] : 0;
  }
  function busy() { return expect > 0; }
  function flush() {
    if (busy()) return;
    var list = waiters; waiters = [];
    for (var i = 0; i < list.length; i++) list[i]();
  }
  function whenSettled(fn) { waiters.push(fn); flush(); }

  function push(dialog) {
    if (!dialog.open || stack.indexOf(dialog) < 0 || dialog.__awdsStep) return;
    if (!steps) base = depth();
    var s = history.state, next = {};
    if (s && typeof s === 'object') for (var k in s) next[k] = s[k];
    next[KEY] = base + steps + 1;
    history.pushState(next, '');
    steps++;
    dialog.__awdsStep = true;
  }
  function travel(n) {
    expect++;
    history.go(-n);
    // popstate не пришёл — переход не случился. Так бывает в Safari 18: history.go без
    // жеста пользователя он молча пропускает. Пустой шаг остаётся в истории; чтобы «назад»
    // не залипал на нём, его займёт следующее открытое окно. Блоки вечно не ждут.
    clearTimeout(timer);
    timer = setTimeout(function () {
      if (!expect) return;
      expect = 0;
      var now = Math.max(0, depth() - base);
      if (now > steps) { orphans += now - steps; steps = now; }
      flush();
    }, 1000);
  }
  function back(n) {
    if (n <= 0) return;
    steps -= n;
    travel(n);
  }

  function opened(dialog) {
    if (stack.indexOf(dialog) >= 0 || !dialog.matches(':modal')) return;
    stack.push(dialog);
    if (orphans) { orphans--; dialog.__awdsStep = true; return; }
    whenSettled(function () { push(dialog); });
  }
  // Окно закрылось. Вернуть число шагов, которые надо убрать.
  function closed(dialog) {
    var i = stack.indexOf(dialog);
    if (i < 0) return 0;
    stack.splice(i, 1);
    var had = dialog.__awdsStep, byHistory = dialog.__awdsByHistory;
    dialog.__awdsStep = dialog.__awdsByHistory = false;
    return had && !byHistory ? 1 : 0;
  }

  function handle(records) {
    var gone = 0;
    for (var i = 0; i < records.length; i++) {
      var d = records[i].target;
      if (d.tagName !== 'DIALOG' || !d.classList.contains('mdl')) continue;
      if (d.open) opened(d); else gone += closed(d);
    }
    back(gone);
  }
  var mo = new MutationObserver(handle);
  mo.observe(document.documentElement, { subtree: true, attributes: true, attributeFilter: ['open'] });

  window.addEventListener('popstate', function () {
    if (expect) { expect--; clearTimeout(timer); }
    var d = Math.max(0, depth() - base);
    // «вперёд» на шаг уже закрытого окна: окна нет, шаг пустой — вернуться обратно
    if (d > steps) { travel(d - steps); return; }
    // «назад» пользователя: закрыть столько верхних окон, сколько шагов он отступил
    var drop = steps - d;
    steps = d;
    var lost = Math.min(orphans, drop);   // пустые шаги сверху — окна под ними не трогать
    orphans -= lost; drop -= lost;
    for (var j = stack.length - 1; j >= 0 && drop > 0; j--) {
      var dialog = stack[j];
      if (!dialog.__awdsStep) continue;
      drop--;
      var ev = new Event('cancel', { cancelable: true });
      if (dialog.dispatchEvent(ev)) {
        dialog.__awdsByHistory = true;
        dialog.close();
      } else {
        dialog.__awdsStep = false;   // окно осталось — вернуть ему шаг
        whenSettled(push.bind(null, dialog));
      }
    }
    flush();
  });

  // Ссылка из открытого окна заменяет текущую запись, а не добавляет новую. Витрина Атласа
  // на части ссылок не пускает клик всплывать до document (замер шапки 11.10.2026), поэтому
  // клик замечается на фазе перехвата window, а решение принимает слушатель на самой ссылке:
  // он идёт после её собственных обработчиков и видит их preventDefault, но раньше всплытия.
  function eligible(a) {
    var dialog = a && a.closest('dialog.mdl');
    if (!dialog || !dialog.__awdsStep || a.hasAttribute('download')) return false;
    if (a.target && a.target !== '_self') return false;
    var url = new URL(a.href, location.href);
    if (!/^https?:$/.test(url.protocol)) return false;
    return !(url.href.split('#')[0] === location.href.split('#')[0] && url.hash);   // якорь на странице
  }
  function onLink(e) {
    this.__awdsLink = false;
    if (e.defaultPrevented || !eligible(this)) return;
    e.preventDefault();
    location.replace(new URL(this.href, location.href).href);
  }
  window.addEventListener('click', function (e) {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || a.__awdsLink || !eligible(a)) return;
    a.__awdsLink = true;
    a.addEventListener('click', onLink, { once: true });
  }, true);

  window.awdsModalHistory = {
    // Обещание: шаги закрытых окон убраны, можно писать в историю.
    settled: function () {
      handle(mo.takeRecords());
      return new Promise(function (resolve) { whenSettled(resolve); });
    }
  };
})();

/* Блокировка прокрутки под открытым окном (1.11.0).

   Страница под модальным окном не прокручивается. Полоса прокрутки уходит вместе со своим
   местом, а её ширина возвращается отступом справа, чтобы страница не сдвигалась вбок. Место
   полосы снимается явно (scrollbar-gutter: auto): витрина держит на <html>
   scrollbar-gutter: stable, при overflow: hidden место оставалось пустым, и затемнение под него
   не ложилось — справа белая полоса 8 px (независимая проверка листинга, 26.10.2026). Ширина
   компенсации — разница clientWidth после и до, а не innerWidth − clientWidth: при stable они
   расходятся с раскладкой. Её же получает переменная --awds-scroll-lock-gap: fixed-слои,
   которые считаются от окна, вычитают её в CSS.

   Держателей несколько (окно поверх окна, каталог шапки), блокировка снимается с последним.
   Модальные dialog.mdl держат её сами; не-окна (popover, развёрнутый поиск) — через
   window.awdsScrollLock.hold(ключ) / release(ключ). Окно гаснет после close ещё 0.2 с:
   полосу возвращаем, когда закончились его переходы и ::backdrop, иначе гаснущее окно дёрнется
   вбок на полширины полосы. Модуль ставится своей проверкой, отдельно от истории: старая копия
   modal из другого блока, занявшая awdsModalHistory первой, не должна оставить страницу без
   блокировки. До 1.11.0 блокировку держал каждый блок сам, и копии спорили за стили <html>. */
(function () {
  if (window.awdsScrollLock || !window.MutationObserver) return;
  var holders = [], saved = null;
  function set(key, on) {
    var html = document.documentElement, i = holders.indexOf(key);
    if (on && i < 0) holders.push(key);
    if (!on && i >= 0) holders.splice(i, 1);
    if (holders.length && !saved) {
      // Ширина полосы — по <body>: при scrollbar-gutter: stable clientWidth у <html> в Chromium не
      // меняется (замер 26.10.2026: 1800 до и после при полосе 8), а содержимое расширяется. Берём
      // большее из двух — в браузере, где меняется <html>, сработает он.
      var body = document.body, wb = body ? body.getBoundingClientRect().width : 0;
      var before = html.clientWidth, pad = parseFloat(getComputedStyle(html).paddingRight) || 0;
      saved = { o: html.style.overflow, g: html.style.scrollbarGutter, p: html.style.paddingRight };
      html.style.overflow = 'hidden';
      html.style.scrollbarGutter = 'auto';
      var gap = Math.max(html.clientWidth - before, body ? body.getBoundingClientRect().width - wb : 0, 0);
      if (gap) {
        html.style.paddingRight = (pad + gap) + 'px';
        html.style.setProperty('--awds-scroll-lock-gap', gap + 'px');
      }
    } else if (!holders.length && saved) {
      html.style.overflow = saved.o; html.style.scrollbarGutter = saved.g; html.style.paddingRight = saved.p;
      html.style.removeProperty('--awds-scroll-lock-gap');
      saved = null;
    }
  }
  function release(dialog) {
    if (holders.indexOf(dialog) < 0) return;
    if (!dialog.getAnimations) { set(dialog, false); return; }
    requestAnimationFrame(function () {
      var running = dialog.getAnimations({ subtree: true }).map(function (a) { return a.finished.catch(function () {}); });
      Promise.all(running).then(function () { if (!dialog.open) set(dialog, false); });
    });
  }
  new MutationObserver(function (records) {
    for (var i = 0; i < records.length; i++) {
      var d = records[i].target;
      if (d.tagName !== 'DIALOG' || !d.classList.contains('mdl')) continue;
      if (d.open && d.matches(':modal')) set(d, true);
      else if (!d.open) release(d);
    }
  }).observe(document.documentElement, { subtree: true, attributes: true, attributeFilter: ['open'] });
  window.awdsScrollLock = {
    hold: function (key) { set(key, true); },
    release: function (key) { set(key, false); }
  };
})();
