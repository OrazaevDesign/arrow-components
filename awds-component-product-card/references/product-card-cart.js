/* product-card-cart.js — счётчик «в корзине» на кнопке карточки товара (product-card 4.2.0).

   Что делает. Один раз на страницу читает корзину покупателя (GET /my/shopping-cart/new-data —
   тот же эндпоинт, что у мини-карточки и корзины), считает штуки каждого товара по всем его
   вариантам и ставит карточкам с узлом .pcard__cart-count:
     • data-cart-state="added" на .pcard__cart и число в счётчике (больше 99 — «99+»);
     • data-cart-state="button" и пустой счётчик, если товара в корзине нет.
   Карточки без .pcard__cart-count (старая разметка с вью --added) скрипт не трогает.

   Как находит товар. Позиция корзины несёт productVariationId и ссылку на товар
   «//site/s/item-<id товара>.html», а id товара отдельным полем — нет (проба на shopotam
   21.11.2026). Карточка несёт data-product-id и data-product-variation-id на кнопке корзины
   (атрибуты Atlas) или на самом .pcard__cart. Сначала сверяемся по id товара из ссылки — так
   считаются все размеры; нет id товара в карточке — по id варианта.

   Когда обновляет. На событие awds:cart-change (его шлёт мини-карточка после добавления),
   на возврат на страницу (pageshow из кэша истории, visibilitychange) — корзину могли
   поменять в другой вкладке. Карточки, добавленные на страницу позже (подгрузка листинга),
   получают число сразу из уже прочитанной корзины.

   Доступное имя. Счётчик — aria-hidden: цифра внутри имени кнопки читалась бы как «с 3
   декабря 2». Вместо неё к имени кнопки добавляется фраза из data-cart-count-label на
   .pcard__cart («в корзине: {n}»; по умолчанию — по-русски), исходное имя возвращается,
   когда товар из корзины ушёл.

   Защита от второго запуска — window.awdsPcardCart. API: awdsPcardCart.refresh() —
   перечитать корзину и обновить все карточки; awdsPcardCart.apply(root) — применить уже
   прочитанную корзину к поддереву. */
(function () {
  'use strict';
  if (window.awdsPcardCart) return;

  var ENDPOINT = '/my/shopping-cart/new-data';
  var CART = '.pcard__cart';
  var COUNT = '.pcard__cart-count';
  var ID_ATTRS = '[data-product-id], [data-product-variation-id]';
  var DEFAULT_LABEL = 'в корзине: {n}';

  var counts = null;      // { p: {id товара: штук}, v: {id варианта: штук} }
  var pending = null;     // промис текущего чтения корзины
  var timer = 0;

  function items(data) {
    var wh = data && data.products && data.products.warehouses;
    var out = [];
    if (!wh) return out;
    Object.keys(wh).forEach(function (k) { (wh[k] || []).forEach(function (it) { out.push(it); }); });
    return out;
  }

  function productIdFromUrl(url) {
    var m = /item-(\d+)\.html/.exec(url || '');
    return m ? m[1] : null;
  }

  function load() {
    if (pending) return pending;
    pending = fetch(ENDPOINT, {
      credentials: 'same-origin',
      headers: { 'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json' }
    }).then(function (r) { return r.ok ? r.json() : null; })
      .then(function (json) {
        var c = { p: {}, v: {} };
        items(json && json.data).forEach(function (it) {
          var q = Number(it.quantity) || 0;
          if (q <= 0) return;
          var pid = productIdFromUrl(it.url);
          if (pid) c.p[pid] = (c.p[pid] || 0) + q;
          if (it.productVariationId != null) {
            var vid = String(it.productVariationId);
            c.v[vid] = (c.v[vid] || 0) + q;
          }
        });
        counts = c;
        return c;
      })
      .catch(function () { return counts; });   // сеть упала — оставляем то, что было
    return pending;
  }

  function idsOf(cart) {
    var holder = cart.matches(ID_ATTRS) ? cart : cart.querySelector(ID_ATTRS);
    if (!holder) return { pid: null, vid: null };
    return {
      pid: holder.getAttribute('data-product-id'),
      vid: holder.getAttribute('data-product-variation-id')
    };
  }

  function quantity(ids) {
    if (!counts) return 0;
    if (ids.pid) return counts.p[ids.pid] || 0;
    if (ids.vid) return counts.v[ids.vid] || 0;
    return 0;
  }

  function setLabel(cart, badge, n) {
    var btn = badge.closest('button, a');
    if (!btn) return;
    if (!btn.hasAttribute('data-pcard-label-base')) {
      var base = btn.getAttribute('aria-label');
      if (base == null) {
        var clone = btn.cloneNode(true);
        var b = clone.querySelector(COUNT);
        if (b) b.remove();
        base = clone.textContent.replace(/\s+/g, ' ').trim();
        btn.setAttribute('data-pcard-label-own', '');   // aria-label поставили мы — снимем сами
      }
      btn.setAttribute('data-pcard-label-base', base);
    }
    var baseLabel = btn.getAttribute('data-pcard-label-base');
    if (n > 0) {
      var tmpl = cart.getAttribute('data-cart-count-label') || DEFAULT_LABEL;
      btn.setAttribute('aria-label', baseLabel + ', ' + tmpl.replace('{n}', String(n)));
    } else if (btn.hasAttribute('data-pcard-label-own')) {
      btn.removeAttribute('aria-label');
    } else {
      btn.setAttribute('aria-label', baseLabel);
    }
  }

  function applyOne(cart) {
    var badge = cart.querySelector(COUNT);
    if (!badge) return;
    var n = quantity(idsOf(cart));
    badge.setAttribute('aria-hidden', 'true');
    badge.textContent = n > 99 ? '99+' : (n > 0 ? String(n) : '');
    cart.setAttribute('data-cart-state', n > 0 ? 'added' : 'button');
    setLabel(cart, badge, n);
  }

  function apply(root) {
    if (!counts) return;
    var scope = root || document;
    if (scope.matches && scope.matches(CART)) { applyOne(scope); return; }
    scope.querySelectorAll(CART).forEach(applyOne);
  }

  function refresh() {
    pending = null;
    return load().then(function () { apply(document); });
  }

  function refreshSoon() {
    clearTimeout(timer);
    timer = setTimeout(refresh, 250);   // пачка изменений корзины — одно чтение
  }

  function hasCounters(root) {
    return !!(root && root.querySelector && root.querySelector(COUNT));
  }

  function start() {
    if (hasCounters(document)) refresh();

    document.addEventListener('awds:cart-change', refreshSoon);
    window.addEventListener('pageshow', function (e) { if (e.persisted) refreshSoon(); });
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible' && counts) refreshSoon();
    });

    if (!window.MutationObserver) return;
    new MutationObserver(function (records) {
      for (var i = 0; i < records.length; i++) {
        var added = records[i].addedNodes;
        for (var j = 0; j < added.length; j++) {
          var node = added[j];
          if (node.nodeType !== 1) continue;
          var isCart = node.matches(CART) && node.querySelector(COUNT);
          if (!isCart && !hasCounters(node)) continue;
          if (counts) apply(node);
          else load().then(function () { apply(document); });
        }
      }
    }).observe(document.body, { childList: true, subtree: true });
  }

  window.awdsPcardCart = { refresh: refresh, apply: apply };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
