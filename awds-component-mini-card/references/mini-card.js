/* mini-card.js — мини-карточка товара (быстрый просмотр) вместо окна Atlas.
   Компонент awds-component-mini-card. Копия едет в script.js каждого блока с карточками
   (секция awds:component-js, правит scripts/sync-component-js.mjs); исполняется одна: первая
   занимает window.awdsMiniCard, остальные выходят сразу.

   Подключение в блоке — одна строка вне секции, после словаря строк:
     if (window.awdsMiniCard) window.awdsMiniCard.attach(ROOT, i18n);
   ROOT — класс корня блока (scope его CSS), i18n(root) → { t(key, vars) } — словарь блока.
   Окно рисуется внутри корня того блока, где нажали кнопку: CSS блока лежит в @scope и до
   <body> не достаёт, а модальный <dialog> всё равно уходит в верхний слой.

   Кнопка «В корзину» карточки сохраняет атрибуты Atlas (data-selector="mini-product-card:root",
   data-product-id, data-product-variation-id). Слушатель стоит на window в фазе захвата —
   раньше делегата Atlas на document — и гасит событие, только если блок подключён. Скрипт блока
   не отработал — клик доходит до Atlas, и открывается его окно: запасной путь.

   Данные: GET product-variation-offers/{variationId}.json (все вариации разом, корзина, избранное).
   Пока ответа нет — state=loading: фото, цена, название и бренд взяты из карточки листинга.
   Корзина: GET /my/shopping-cart/{variationId}/set-quantity/{qty} (как у Atlas), после ответа —
   событие awds:cart-change на document (его слушает awds-header). «Купить сейчас» — как «Купить»
   в строке корзины Atlas: положить, снять галки с остальных позиций, отметить эту, перейти на
   summary.checkoutUrl. Решения — logs/2026/11/21/03-20 и 01-33 (arrowdesign). */
(function () {
  'use strict';
  if (window.awdsMiniCard || !window.HTMLDialogElement) return;

  var SEL = '[data-selector="mini-product-card:root"][data-product-variation-id]';
  var DEFAULTS = {
    productVariationOffers: '/atlas/webapi/product-variation-offers/:productVariationId.json',
    shoppingCartSetQuantity: '/my/shopping-cart/:variationId/set-quantity/:quantity',
    shoppingCartDataNew: '/my/shopping-cart/new-data',
    shoppingCartUpdateSelected: '/my/shopping-cart/:basketId/check/:action?:query',
    pageCart: '/my/shopping-cart',
    pageCheckout: '/my/shopping-cart/checkout'
  };
  /* Иконки — из макета (Figma Ka13CUzLUGk47hSRV1lwQ8, экспорт 21.11.2026); «назад» и «поделиться» — из шапки modal
     (470rar5EfRm4n14vHMXbpc, / header content=overlay, 21.11.2026); сердце — как у button-favorites, слои .obtn__fav. */
  var ICON = {
    back: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9.29364 5.63628C9.68418 5.24594 10.3172 5.24581 10.7077 5.63628C11.0978 6.02677 11.0979 6.65992 10.7077 7.05034L6.75751 11.0005H20.0007C20.5527 11.0009 21.0007 11.4485 21.0007 12.0005C21.0004 12.5524 20.5525 13.0002 20.0007 13.0005H6.75751L10.7077 16.9498C11.0979 17.3402 11.0978 17.9733 10.7077 18.3638C10.3173 18.7543 9.68418 18.7541 9.29364 18.3638L3.63641 12.7076C3.24595 12.3171 3.24608 11.684 3.63641 11.2935L9.29364 5.63628Z"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.5 2C20.433 2 22 3.567 22 5.5C22 7.433 20.433 9 18.5 9C17.5889 9 16.7594 8.65154 16.1367 8.08105L11.7324 10.3887C11.9046 10.8945 12 11.436 12 12C12 12.5633 11.9051 13.1042 11.7334 13.6094L16.1367 15.918C16.7594 15.3477 17.5891 15 18.5 15C20.433 15 22 16.567 22 18.5C22 20.433 20.433 22 18.5 22C16.567 22 15 20.433 15 18.5C15 18.2021 15.0374 17.9129 15.1074 17.6367L10.7217 15.3379C9.80629 16.3578 8.47837 17 7 17C4.23858 17 2 14.7614 2 12C2 9.23858 4.23858 7 7 7C8.47811 7 9.80631 7.64149 10.7217 8.66113L15.1074 6.3623C15.0375 6.08644 15 5.7976 15 5.5C15 3.567 16.567 2 18.5 2ZM18.5 17C17.6716 17 17 17.6716 17 18.5C17 19.3284 17.6716 20 18.5 20C19.3284 20 20 19.3284 20 18.5C20 17.6716 19.3284 17 18.5 17ZM7 9C5.34315 9 4 10.3431 4 12C4 13.6569 5.34315 15 7 15C8.65685 15 10 13.6569 10 12C10 10.3431 8.65685 9 7 9ZM18.5 4C17.6716 4 17 4.67157 17 5.5C17 6.32843 17.6716 7 18.5 7C19.3284 7 20 6.32843 20 5.5C20 4.67157 19.3284 4 18.5 4Z"/></svg>',
    prev: '<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10.2441 7.05371C10.5695 6.72831 11.0974 6.72839 11.4229 7.05371C11.7483 7.37915 11.7483 7.90699 11.4229 8.23242L9.65527 10L11.4229 11.7676C11.7483 12.093 11.7482 12.6208 11.4229 12.9463C11.0974 13.2717 10.5696 13.2717 10.2441 12.9463L7.8877 10.5898C7.56226 10.2644 7.56226 9.73657 7.8877 9.41113L10.2441 7.05371Z"/></svg>',
    next: '<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M8.57715 7.05371C8.90256 6.7283 9.43042 6.72836 9.75586 7.05371L12.1133 9.41113C12.4384 9.73659 12.4386 10.2645 12.1133 10.5898L9.75586 12.9463C9.43042 13.2717 8.90259 13.2717 8.57715 12.9463C8.25189 12.6208 8.25177 12.093 8.57715 11.7676L10.3447 10L8.57715 8.23242C8.2518 7.90698 8.25176 7.37912 8.57715 7.05371Z"/></svg>',
    truck: '<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M11.6797 2.5166C13.0604 2.5166 14.1797 3.63589 14.1797 5.0166V5.02148H15.8633C16.3627 5.02157 16.8358 5.24551 17.1523 5.63184L18.7891 7.62891C19.0329 7.92664 19.1659 8.29974 19.166 8.68457V12.5225C19.166 13.3754 18.5246 14.0771 17.6982 14.1758C17.7167 14.3085 17.7275 14.4442 17.7275 14.582C17.7274 16.1926 16.4221 17.4979 14.8115 17.498C13.2008 17.498 11.8947 16.1927 11.8945 14.582C11.8945 14.449 11.9037 14.3178 11.9209 14.1895H8.7002C8.71745 14.3178 8.72754 14.449 8.72754 14.582C8.72736 16.1927 7.42127 17.498 5.81055 17.498C4.19982 17.498 2.89373 16.1927 2.89355 14.582C2.89355 14.4372 2.90441 14.2945 2.9248 14.1553C1.7385 13.9602 0.833008 12.931 0.833008 11.6895V5.0166C0.833008 3.636 1.95245 2.51678 3.33301 2.5166H11.6797ZM5.81055 13.332C5.12019 13.332 4.56055 13.8917 4.56055 14.582C4.56072 15.2722 5.1203 15.832 5.81055 15.832C6.50079 15.832 7.06037 15.2722 7.06055 14.582C7.06055 13.8917 6.5009 13.332 5.81055 13.332ZM14.8115 13.332C14.1212 13.332 13.5615 13.8917 13.5615 14.582C13.5617 15.2722 14.1213 15.832 14.8115 15.832C15.5016 15.8319 16.0613 15.2721 16.0615 14.582C16.0615 13.8918 15.5017 13.3322 14.8115 13.332ZM3.33301 4.18262C2.87292 4.18279 2.5 4.55647 2.5 5.0166V11.6895C2.5 12.1496 2.87292 12.5223 3.33301 12.5225H3.74512C4.27317 11.9928 5.00356 11.665 5.81055 11.665C6.61754 11.665 7.34792 11.9928 7.87598 12.5225H12.5127V5.0166C12.5127 4.55636 12.1399 4.18262 11.6797 4.18262H3.33301ZM14.1797 11.7344C14.3831 11.6895 14.5946 11.665 14.8115 11.665C15.6185 11.6651 16.349 11.9928 16.877 12.5225H17.499V8.68457L15.8633 6.6875H14.1797V11.7344Z"/></svg>',
    wallet: '<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M13.333 3.33398C13.7932 3.33398 14.167 3.70773 14.167 4.16797C14.1668 4.62806 13.7931 5.00098 13.333 5.00098H4.58301C4.35304 5.00115 4.16699 5.18796 4.16699 5.41797C4.16717 5.64783 4.35315 5.83381 4.58301 5.83398H15.833C16.7535 5.83398 17.5 6.5805 17.5 7.50098V15.001C17.5 15.9215 16.7535 16.668 15.833 16.668H4.16699C3.24652 16.668 2.5 15.9215 2.5 15.001V5.41797C2.5 4.26748 3.43256 3.33416 4.58301 3.33398H13.333ZM4.16699 15.001H15.833V7.50098H4.58301C4.44052 7.50095 4.30144 7.48626 4.16699 7.45898V15.001ZM12.917 10.001C13.6072 10.0012 14.167 10.5607 14.167 11.251C14.167 11.9412 13.6072 12.5008 12.917 12.501C12.2266 12.501 11.667 11.9413 11.667 11.251C11.667 10.5606 12.2266 10.001 12.917 10.001ZM12.917 10.834C12.6869 10.834 12.5 11.0209 12.5 11.251C12.5 11.4811 12.6869 11.668 12.917 11.668C13.147 11.6678 13.333 11.481 13.333 11.251C13.333 11.021 13.147 10.8342 12.917 10.834Z"/></svg>',
    del: '<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M11.8994 1.66699C12.6166 1.66701 13.2535 2.12542 13.4805 2.80566L13.9336 4.16699H16.667C17.1271 4.16717 17.5 4.53987 17.5 5C17.5 5.46013 17.1271 5.83283 16.667 5.83301H16.6133L15.9346 15.999C15.847 17.3123 14.7566 18.333 13.4404 18.333H6.55957C5.24342 18.333 4.152 17.3123 4.06445 15.999L3.38672 5.83301H3.33301C2.87292 5.83283 2.5 5.46013 2.5 5C2.5 4.53987 2.87292 4.16717 3.33301 4.16699H6.06641L6.51953 2.80566C6.74655 2.12542 7.38342 1.66701 8.10059 1.66699H11.8994ZM5.72754 15.8887C5.75672 16.3264 6.12086 16.667 6.55957 16.667H13.4404C13.8791 16.667 14.2433 16.3264 14.2725 15.8887L14.9424 5.83301H5.05762L5.72754 15.8887ZM8.33301 8.33301C8.79324 8.33301 9.16699 8.70676 9.16699 9.16699V13.333C9.16699 13.7932 8.79324 14.167 8.33301 14.167C7.87292 14.1668 7.5 13.7931 7.5 13.333V9.16699C7.5 8.70686 7.87292 8.33318 8.33301 8.33301ZM11.667 8.33301C12.1271 8.33318 12.5 8.70686 12.5 9.16699V13.333C12.5 13.7931 12.1271 14.1668 11.667 14.167C11.2068 14.167 10.833 13.7932 10.833 13.333V9.16699C10.833 8.70676 11.2068 8.33301 11.667 8.33301ZM7.82324 4.16699H12.1768L11.8994 3.33301H8.10059L7.82324 4.16699Z"/></svg>',
    add: '<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10 3.33301C10.4602 3.33301 10.833 3.70675 10.833 4.16699V9.16699H15.833C16.2932 9.16699 16.667 9.53976 16.667 10C16.667 10.4602 16.2932 10.833 15.833 10.833H10.833V15.833C10.833 16.2932 10.4602 16.667 10 16.667C9.53976 16.667 9.16699 16.2932 9.16699 15.833V10.833H4.16699C3.70675 10.833 3.33301 10.4602 3.33301 10C3.33301 9.53976 3.70675 9.16699 4.16699 9.16699H9.16699V4.16699C9.16699 3.70675 9.53976 3.33301 10 3.33301Z"/></svg>',
    minus: '<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M15.833 9.16699C16.2932 9.16699 16.667 9.53976 16.667 10C16.667 10.4602 16.2932 10.833 15.833 10.833H4.16699C3.70675 10.833 3.33301 10.4602 3.33301 10C3.33301 9.53976 3.70675 9.16699 4.16699 9.16699H15.833Z"/></svg>',
    warn: '<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10 1.66797C14.6024 1.66797 18.333 5.3986 18.333 10.001C18.333 14.6033 14.6024 18.334 10 18.334C5.39763 18.334 1.66699 14.6033 1.66699 10.001C1.66699 5.3986 5.39763 1.66797 10 1.66797ZM10 3.33398C6.3181 3.33398 3.33301 6.31908 3.33301 10.001C3.33301 13.6829 6.3181 16.668 10 16.668C13.6819 16.668 16.667 13.6829 16.667 10.001C16.667 6.31908 13.6819 3.33398 10 3.33398ZM10.002 12.501C10.4619 12.5012 10.8348 12.874 10.835 13.334C10.835 13.7941 10.462 14.1678 10.002 14.168H10C9.53976 14.168 9.16699 13.7942 9.16699 13.334C9.16717 12.8739 9.53987 12.501 10 12.501H10.002ZM10 5.00098C10.4601 5.00098 10.8328 5.3739 10.833 5.83398V10.834C10.833 11.2942 10.4602 11.668 10 11.668C9.53976 11.668 9.16699 11.2942 9.16699 10.834V5.83398C9.16717 5.3739 9.53987 5.00098 10 5.00098Z"/></svg>'
  };
  var FAV_SOLID = '<svg class="obtn__fav-solid" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M11.0928 3.05991C12.7287 1.82393 14.7348 1.67089 16.3496 2.5892C17.9639 3.50742 18.9999 5.38217 19 7.83041C19 10.3627 17.5048 12.5134 15.9102 14.1039C14.295 15.7147 12.4254 16.9035 11.3584 17.5189C10.935 17.765 10.5039 17.9945 10 17.9945C9.49607 17.9945 9.06496 17.765 8.6416 17.5189C7.57455 16.9035 5.70499 15.7147 4.08984 14.1039C2.49516 12.5134 1 10.3627 1 7.83041C1.0001 5.38314 2.03712 3.51291 3.65137 2.59702C5.26481 1.68165 7.26864 1.83336 8.90234 3.06088C9.40086 3.43548 9.74153 3.6909 9.9873 3.8558L10.0127 3.85678C10.2575 3.69164 10.5961 3.43517 11.0928 3.05991Z"/></svg>';
  var FAV_OUTLINE = '<svg class="obtn__fav-outline" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.0928 3.05991C12.7287 1.82393 14.7348 1.67089 16.3496 2.5892C17.9639 3.50742 18.9999 5.38217 19 7.83041C19 10.3627 17.5048 12.5134 15.9102 14.1039C14.295 15.7147 12.4254 16.9035 11.3584 17.5189C10.935 17.765 10.5039 17.9945 10 17.9945C9.49607 17.9945 9.06495 17.765 8.6416 17.5189C7.57455 16.9035 5.70499 15.7147 4.08984 14.1039C2.49516 12.5134 1 10.3627 1 7.83041C1.0001 5.38314 2.03712 3.51291 3.65137 2.59702C5.26481 1.68165 7.26864 1.83336 8.90234 3.06088C9.26444 3.33297 9.62329 3.61272 10 3.86459C10.375 3.61235 10.7323 3.33224 11.0928 3.05991ZM15.3613 4.32846C14.3526 3.7547 13.165 4.00159 12.2734 4.67514C11.8085 5.0264 11.4258 5.31503 11.1309 5.51401C10.794 5.74121 10.4222 5.96072 10.0029 5.96127C9.58341 5.96178 9.21066 5.74344 8.87305 5.51694C8.57711 5.31839 8.19345 5.02989 7.72656 4.67905C6.83401 4.00833 5.64645 3.7647 4.63867 4.33627C3.7728 4.82752 3.00009 5.95047 3 7.83041C3 9.56747 4.04271 11.2324 5.50195 12.6878C6.78251 13.965 8.29529 15.0576 9.88281 15.9242C9.9903 15.9828 10.0097 15.9828 10.1172 15.9242C11.7047 15.0576 13.2175 13.965 14.498 12.6878C15.9573 11.2324 17 9.56748 17 7.83041C16.9999 5.94766 16.2272 4.82117 15.3613 4.32846Z"/></svg>';
  var roots = [];          // [{ cls, i18n }]
  var endpointsP = null;
  var uid = 0;

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function has(v) { return v != null && String(v) !== ''; }
  function strip(html) { var d = document.createElement('div'); d.innerHTML = String(html || ''); return (d.textContent || '').replace(/\s+/g, ' ').trim(); }
  function fill(tpl, vals) {
    var i = 0;
    return String(tpl).replace(/:[a-zA-Z]+/g, function () { return encodeURIComponent(vals[i++]); });
  }

  /* Адреса витрины — из карты эндпоинтов Atlas (body[data-endpoint], та же, что читает шапка).
     Нет карты — адреса по умолчанию, они те же, что зашиты в Atlas запасными. */
  function endpoints() {
    if (endpointsP) return endpointsP;
    var url = document.body && document.body.getAttribute('data-endpoint');
    endpointsP = (url ? fetch(url, { credentials: 'same-origin', headers: { 'Accept': 'application/json' } })
      .then(function (r) { return r.ok ? r.json() : null; })
      .catch(function () { return null; }) : Promise.resolve(null))
      .then(function (j) {
        var e = (j && j.endpoints) || {}, out = {};
        Object.keys(DEFAULTS).forEach(function (k) { out[k] = typeof e[k] === 'string' && e[k].charAt(0) === '/' ? e[k] : DEFAULTS[k]; });
        return out;
      });
    return endpointsP;
  }
  function getJSON(url) {
    return fetch(url, {
      credentials: 'same-origin',
      headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' }
    }).then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); });
  }

  /* ── корзина ───────────────────────────────────────────────────────────────────────── */
  function setQuantity(variationId, qty) {
    return endpoints().then(function (ep) {
      return getJSON(fill(ep.shoppingCartSetQuantity, [variationId, qty]));
    }).then(function (res) {
      if (!res || res.status !== 'success') throw new Error('cart');
      if (Array.isArray(res.dataLayer) && window.dataLayer && window.dataLayer.push) {
        res.dataLayer.forEach(function (d) { window.dataLayer.push(d); });
      }
      return res;
    });
  }
  function cartChanged(variationId, quantity, delta) {
    try {
      document.dispatchEvent(new CustomEvent('awds:cart-change', { detail: { variationId: String(variationId), quantity: quantity, delta: delta } }));
    } catch (e) { /* старый браузер без CustomEvent-конструктора — счётчик шапки обновится при переходе */ }
  }
  function basketItems(data) {
    var p = data && data.products, out = [];
    if (!p) return out;
    var wh = p.warehouses || {};
    Object.keys(wh).forEach(function (k) { (wh[k] || []).forEach(function (it) { out.push(it); }); });
    return out;
  }
  /* «Купить сейчас»: в заказе только этот товар. Остальные позиции остаются в корзине без галок. */
  function buyNow(variationId, qtyInCart) {
    var ep;
    return endpoints().then(function (e) {
      ep = e;
      return qtyInCart > 0 ? null : setQuantity(variationId, 1).then(function () { cartChanged(variationId, 1, 1); });
    }).then(function () { return getJSON(ep.shoppingCartDataNew); }).then(function (data) {
      var basketId = data && data.basketId;
      var items = basketItems(data);
      var mine = items.filter(function (it) { return String(it.productVariationId) === String(variationId); })[0];
      if (!basketId || !mine) return data;
      var steps = items.filter(function (it) { return it !== mine && it.checked; }).map(function (it) { return ['off', it.basketItemId]; });
      if (!mine.checked) steps.push(['on', mine.basketItemId]);
      return steps.reduce(function (p, s) {
        return p.then(function () {
          var url = fill(ep.shoppingCartUpdateSelected.replace(/\?.*$/, ''), [basketId, s[0]]) + '?basketItemIds[]=' + encodeURIComponent(s[1]);
          return getJSON(url).then(function (r) { if (!r || r.status !== 'success') throw new Error('check'); });
        });
      }, Promise.resolve()).then(function () { return steps.length ? getJSON(ep.shoppingCartDataNew) : data; });
    }).then(function (data) {
      var url = data && data.summary && data.summary.checkoutUrl;
      window.location.href = has(url) ? url : ep.pageCheckout;
    });
  }

  /* ── окно из пяти точек (эталон layoutSliderWindow, SKILL awds-component-slider) ──────── */
  function layoutSliderWindow(slider, i) {
    var track = slider.querySelector('.slider__track');
    var dots = track ? track.querySelectorAll('.slider__dot') : [];
    var n = dots.length;
    if (!n || !slider.clientWidth) return;
    var cs = getComputedStyle(slider);
    var winW = slider.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    var g = parseFloat(getComputedStyle(track).columnGap) || 0;
    var s = Infinity;
    Array.prototype.forEach.call(dots, function (d) { s = Math.min(s, d.offsetWidth); });
    var trackW = (dots[n - 1].offsetLeft - dots[0].offsetLeft) + dots[n - 1].offsetWidth;
    var a = trackW - (n - 1) * (s + g);
    var center = function (k) {
      return k < i ? k * (s + g) + s / 2 : k === i ? i * (s + g) + a / 2 : (k - 1) * (s + g) + a + g + s / 2;
    };
    var shift = Math.min(0, Math.max(winW / 2 - center(i), winW - trackW));
    track.style.setProperty('--awds-slider-shift', shift + 'px');
    var moreLeft = shift < -0.5, moreRight = shift > (winW - trackW) + 0.5;
    Array.prototype.forEach.call(dots, function (d, k) {
      var c = center(k) + shift;
      d.classList.toggle('slider__dot--sm', (moreLeft && c < winW * 0.18) || (moreRight && c > winW * 0.82));
    });
  }

  /* ── данные карточки листинга: показываются сразу, до ответа offers ───────────────────── */
  function fromCard(btn) {
    var card = btn.closest('.pcard') || btn.parentNode;
    var q = function (s) { return card.querySelector(s); };
    var frames = Array.prototype.map.call(card.querySelectorAll('.pcard__image'), function (im) {
      return { src: im.getAttribute('src') || im.getAttribute('data-src') || '', srcset: im.getAttribute('srcset') || im.getAttribute('data-srcset') || '' };
    }).filter(function (f) { return has(f.src); });
    var name = q('.pcard__name'), brand = q('.pcard__brand'), logo = q('.pcard__brand-logo img');
    var price = card.querySelector('.pcard__content > .price, .pcard__price .price') || q('.price');
    return {
      card: card,
      productId: btn.getAttribute('data-product-id'),
      variationId: btn.getAttribute('data-product-variation-id'),
      // Дата доставки из данных листинга (variation.deliveryDate.formatted): блок кладёт её на кнопку
      // карточки атрибутом. Ответ вариаций дату часто не несёт (shopotam, 23.11.2026), а срок —
      // «сегодня + срок сайта», один для всех вариаций в наличии.
      deliveryDate: btn.getAttribute('data-delivery-date') || '',
      frames: frames,
      name: name ? name.textContent.trim() : '',
      url: name ? name.getAttribute('href') : '',
      brand: brand ? brand.textContent.trim() : '',
      brandUrl: brand ? brand.getAttribute('href') : '',
      logo: logo ? logo.getAttribute('src') : '',
      priceHtml: price ? price.outerHTML : '',
      badgesHtml: pctBadge(q('.pcard__badges .badge-market-percent')),
      fav: q('[data-cps-fav]')
    };
  }

  /* Строка-скелетон доставки: держит место двух строк list-item transparent 300, пока ответа
     offers нет или он упал (решение владельца 23.11.2026). Своего скелетона в ArrowDS нет —
     плашки повторяют иконку и две строки текста. */
  var SKELETON_ROW = '<span class="mcard__skeleton-row"><span class="mcard__skeleton-icon"></span><span class="mcard__skeleton-lines"><span></span><span></span></span></span>';

  /* ── разметка ──────────────────────────────────────────────────────────────────────── */
  function shell(L, id) {
    return '<header class="mdl__header mdl__header--overlay">' +
        '<button class="obtn obtn-secondary obtn--400 obtn--icon-only mdl__back" type="button" data-mc-close aria-label="' + esc(L.t('mini.close')) + '">' + ICON.back + '</button>' +
        '<button class="obtn obtn-secondary obtn--400 obtn--icon-only" type="button" data-mc-fav aria-pressed="false" aria-label="' + esc(L.t('card.fav')) + '" hidden><span class="obtn__fav" aria-hidden="true">' + FAV_SOLID + FAV_OUTLINE + '</span></button>' +
        '<button class="obtn obtn-secondary obtn--400 obtn--icon-only" type="button" data-mc-share aria-label="' + esc(L.t('mini.share')) + '" hidden>' + ICON.share + '</button>' +
      '</header>' +
      '<div class="mdl__content mdl__content--flush">' +
        '<div class="mcard__body" data-state="loading">' +
          '<div class="mcard__gallery theme-default theme-light">' +
            '<div class="mcard__frames" data-mc-frames></div>' +
            '<button class="obtn obtn-secondary obtn--400 obtn--icon-only mcard__nav mcard__nav--prev" type="button" data-mc-prev aria-label="' + esc(L.t('card.photo_prev')) + '" hidden>' + ICON.prev + '</button>' +
            '<button class="obtn obtn-secondary obtn--400 obtn--icon-only mcard__nav mcard__nav--next" type="button" data-mc-next aria-label="' + esc(L.t('card.photo_next')) + '" hidden>' + ICON.next + '</button>' +
            '<div class="slider slider-dots mcard__dots" data-mc-dots aria-hidden="true" hidden></div>' +
          '</div>' +
          '<div class="mcard__info">' +
            '<div class="mcard__price-block">' +
              '<div class="mcard__price" data-mc-price></div>' +
              '<div class="mcard__tips"><span class="mcard__badges" data-mc-badges></span><span class="badge badge--100 badge-market-brand mcard__duty" data-mc-duty hidden></span></div>' +
            '</div>' +
            '<div class="mcard__details">' +
              '<div class="mcard__aspects" data-mc-aspects></div>' +
              '<div class="mcard__loading"><svg class="progress progress-circular progress--indeterminate" viewBox="0 0 48 48" role="progressbar" aria-label="' + esc(L.t('mini.loading')) + '"><circle class="progress-circular__arc" cx="24" cy="24" r="23" pathLength="100"/></svg></div>' +
              '<div class="mcard__error" role="alert">' +
                '<div class="list-item list-item-transparent list-item--300"><span class="list-item__prefix" aria-hidden="true">' + ICON.warn + '</span>' +
                  '<span class="list-item__content"><span class="list-item__title">' + esc(L.t('mini.error_title')) + '</span><span class="list-item__description">' + esc(L.t('mini.error_desc')) + '</span></span></div>' +
                '<button class="btn btn-secondary btn--400" type="button" data-mc-retry>' + esc(L.t('action.retry')) + '</button>' +
              '</div>' +
            '</div>' +
            '<div class="mcard__main">' +
              '<div class="mcard__head">' +
                '<h2 class="mcard__title" id="' + id + '-title"><a class="lnk lnk-accent lnk--ul-hover" data-mc-name href="#"></a></h2>' +
                '<a class="mcard__brand" data-mc-brand href="#" hidden><span class="mcard__brand-logo" data-mc-logo hidden><img alt="" loading="lazy" decoding="async"></span>' +
                  '<span class="mcard__brand-text"><span class="lnk lnk-accent lnk--ul-hover mcard__brand-name" data-mc-brand-name></span><span class="mcard__brand-note">' + esc(L.t('mini.original')) + '</span></span></a>' +
              '</div>' +
              '<button class="btn btn-secondary btn--600 mcard__buy" type="button" data-mc-buy disabled><span class="btn__content">' + esc(L.t('mini.buy_now')) + '</span></button>' +
              '<ul class="mcard__delivery" data-mc-delivery></ul>' +
              '<div class="mcard__skeleton" aria-hidden="true">' + SKELETON_ROW + SKELETON_ROW + '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<footer class="mdl__footer mdl__footer--stretch" data-mc-footer></footer>' +
      '<p class="mcard__status" data-mc-status aria-live="polite"></p>' +
      '<div class="toast toast-normal mcard__toast" role="status" data-mc-toast hidden><div class="toast__content"><span class="toast__text" data-mc-toast-text></span></div></div>';
  }

  function priceHtml(v) {
    var cur = has(v.price_formatted) ? v.price_formatted : (has(v.price) ? String(v.price) : '');
    if (!cur) return '';
    var sym = v.price_currency_sign || '';
    var oldF = has(v.price_old_formatted) ? v.price_old_formatted : (Number(v.price_old) > Number(v.price) ? String(v.price_old) : '');
    var sale = has(oldF);
    var h = '<span class="price price-' + (sale ? 'sale' : 'default') + '"><span class="price__main"><span class="price__current">' + esc(cur) + '</span>' +
      (sym ? '<span class="price__currency">' + esc(sym) + '</span>' : '') + '</span>';
    if (sale) h += '<span class="price__old"><span class="price__old-value">' + esc(oldF) + '</span>' + (sym ? '<span class="price__old-currency">' + esc(sym) + '</span>' : '') + '</span>';
    return h + '</span>';
  }
  /* Процент окно считает само по двум ценам, как Atlas: поле discount ответа с ним расходится. */
  function badgesHtml(v, L) {
    var p = Number(v.price), o = Number(v.price_old);
    if (!(o > p && p > 0)) return '';
    var pct = Math.round((o - p) / o * 100);
    if (pct < 1) return '';
    return '<span class="badge badge--100 badge-market-sale">' + pct + '%</span>';
  }

  /* Процент из карточки листинга — до ответа offers. В карточке это бейдж market-percent, в окне
     тот же процент стоит бейджем market-sale рядом с пошлиной (макет price · .tips, 23.11.2026). */
  function pctBadge(el) {
    var t = el ? el.textContent.trim() : '';
    return t ? '<span class="badge badge--100 badge-market-sale">' + esc(t) + '</span>' : '';
  }

  /* Загрузка кнопки — состояние btn--loading компонента button: подпись гаснет, поверх кольцо
     progress. aria-disabled держит кнопку ненажимаемой, aria-busy говорит читалке «ждём». */
  var BTN_PROGRESS = '<svg class="btn__progress progress progress-circular progress--indeterminate" viewBox="0 0 24 24" aria-hidden="true"><circle class="progress-circular__arc" cx="12" cy="12" r="10" pathLength="100"/></svg>';
  function setBusy(btn, on) {
    var ring = btn.querySelector('.btn__progress');
    btn.classList.toggle('btn--loading', on);
    if (on) {
      btn.setAttribute('aria-busy', 'true');
      btn.setAttribute('aria-disabled', 'true');
      if (!ring) btn.insertAdjacentHTML('beforeend', BTN_PROGRESS);
    } else {
      btn.removeAttribute('aria-busy');
      btn.removeAttribute('aria-disabled');
      if (ring) ring.remove();
    }
  }

  /* ── окно ──────────────────────────────────────────────────────────────────────────── */
  function MiniCard(rootEl, L) {
    this.L = L;
    this.id = 'awds-mc-' + (++uid);
    var d = this.dialog = document.createElement('dialog');
    d.className = 'mdl mdl-sidepage mcard';
    d.setAttribute('aria-labelledby', this.id + '-title');
    d.innerHTML = shell(L, this.id);
    rootEl.appendChild(d);
    this.q = function (s) { return d.querySelector(s); };
    this.frameIndex = 0;
    this.bind();
  }
  var P = MiniCard.prototype;

  P.bind = function () {
    var self = this, d = this.dialog, frames = this.q('[data-mc-frames]');
    d.addEventListener('click', function (e) {
      var t = e.target;
      if (t === d) { d.close(); return; }                                   // клик по подложке
      if (t.closest('[data-mc-close]')) { d.close(); return; }
      if (t.closest('[data-mc-prev]')) { self.go(-1); return; }
      if (t.closest('[data-mc-next]')) { self.go(1); return; }
      if (t.closest('[data-mc-retry]')) { self.load(); return; }
      if (t.closest('[data-mc-buy]')) { self.buy(); return; }
      if (t.closest('[data-mc-add]')) { self.setQty(1); return; }
      if (t.closest('[data-mc-inc]')) { self.setQty(self.qty() + 1); return; }
      if (t.closest('[data-mc-dec]')) { self.setQty(self.qty() - 1); return; }
      if (t.closest('[data-mc-fav]')) { self.toggleFav(); return; }
      if (t.closest('[data-mc-share]')) { self.share(); return; }
      var tile = t.closest('[data-mc-param]');
      if (tile) self.pick(tile.getAttribute('data-mc-aspect'), tile.getAttribute('data-mc-param'));
    });
    // Свайп — как у галереи product-card (wireGallery): порог 32 px листает на кадр, длинный
    // свайп листает дальше; вертикальный жест отдаётся прокрутке окна (touch-action: pan-y).
    var SWIPE = 32, sx = 0, sy = 0, axis = '', dragging = false;
    frames.addEventListener('pointerdown', function (e) {
      self.warm();
      if (e.pointerType === 'mouse' || (self.frameCount || 0) < 2) return;
      dragging = true; axis = ''; sx = e.clientX; sy = e.clientY;
    });
    frames.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var dx = e.clientX - sx, dy = e.clientY - sy;
      if (!axis && Math.sqrt(dx * dx + dy * dy) > 8) axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      if (axis === 'x' && Math.abs(dx) >= SWIPE) {
        var rtl = getComputedStyle(frames).direction === 'rtl';
        self.go((dx < 0) !== rtl ? 1 : -1);                               // влево → следующий
        sx = e.clientX;
      }
    });
    var stop = function () { dragging = false; };
    frames.addEventListener('pointerup', stop);
    frames.addEventListener('pointercancel', stop);
    this.q('.mcard__gallery').addEventListener('pointerenter', function () { self.warm(); });
    d.addEventListener('close', function () {
      if (d.open) return;                                                // окно лишь сменило режим (вход гостя)
      if (self.favObserver) { self.favObserver.disconnect(); self.favObserver = null; }
      clearTimeout(self.toastTimer); self.q('[data-mc-toast]').hidden = true;
      self.stopAuthWatch();
      self.busy = false;
    });
  };

  P.open = function (src) {
    this.src = src;
    this.data = null;
    this.cart = {};
    this.selected = null;
    this.variation = null;
    var d = this.dialog;
    // данные карточки — сразу
    this.renderFrames(src.frames, src.name);
    this.q('[data-mc-badges]').innerHTML = src.badgesHtml;
    this.q('[data-mc-price]').innerHTML = src.priceHtml;
    var nm = this.q('[data-mc-name]');
    nm.textContent = src.name;
    nm.setAttribute('href', has(src.url) ? src.url : '#');
    this.renderBrand(src.brand, src.brandUrl, src.logo);
    this.q('[data-mc-aspects]').innerHTML = '';
    this.q('[data-mc-delivery]').innerHTML = '';
    this.q('[data-mc-duty]').hidden = true;
    this.q('[data-mc-status]').textContent = '';
    this.syncFav();
    this.syncShare();
    this.setState('loading');
    if (!d.open) d.showModal();
    this.focusClose();
    this.load();
  };

  /* Фокус при открытии — на само окно, без кольца (решение владельца 23.11.2026; до 2.0.1 кольцо
     стояло на «Закрыть»). Фокус внутри окна нужен: Tab и читалка начинают с него, Esc закрывает.
     Окно с tabindex="-1" фокусируется скриптом, но в порядок табуляции не входит; первый Tab ведёт
     на «Закрыть». Кольца у окна нет — это не элемент управления. */
  P.focusClose = function () {
    var d = this.dialog;
    if (!d.hasAttribute('tabindex')) d.setAttribute('tabindex', '-1');
    try { d.focus({ preventScroll: true }); } catch (e) { d.focus(); }
  };

  P.setState = function (s) {
    var body = this.q('.mcard__body');
    if (s === 'default') body.removeAttribute('data-state'); else body.setAttribute('data-state', s);
    this.state = s;
    var buy = this.q('[data-mc-buy]');
    setBusy(buy, s === 'loading');
    buy.disabled = s !== 'default' || !this.inStock();
    this.renderFooter();
  };

  P.load = function () {
    var self = this, vid = this.src.variationId, token = this.token = {};
    this.setState('loading');
    endpoints().then(function (ep) {
      return getJSON(fill(ep.productVariationOffers, [vid]));
    }).then(function (j) {
      if (self.token !== token) return;
      var vs = j && j.product && Array.isArray(j.product.variations) ? j.product.variations : null;
      if (!vs || !vs.length) throw new Error('offers');
      self.data = j;
      self.cart = {};
      var vib = j.variations_in_basket;
      if (vib && !Array.isArray(vib)) Object.keys(vib).forEach(function (k) { self.cart[String(k)] = Number(vib[k]) || 0; });
      var start = self.byId(vid);
      // Окно открывается на вариации из карточки (решение 01-33, п. 3); её нет в ответе — на первой в наличии.
      if (!start) start = vs.filter(function (v) { return self.available(v); })[0] || vs[0];
      self.applyVariation(start, true);
      self.setState('default');
    }).catch(function () {
      if (self.token !== token) return;
      self.setState('error');
    });
  };

  P.byId = function (id) {
    var vs = this.data.product.variations;
    for (var i = 0; i < vs.length; i++) if (String(vs[i].id) === String(id)) return vs[i];
    return null;
  };
  P.available = function (v) { return !!v && Number(v.quantity) > 0 && Number(v.price) > 0; };
  P.inStock = function () { return this.variation ? this.available(this.variation) : !!this.src && this.state !== 'error'; };
  P.qty = function () { return this.variation ? (this.cart[String(this.variation.id)] || 0) : 0; };
  P.paramOf = function (v, aspectId) {
    var pl = v.params_list || [];
    for (var i = 0; i < pl.length; i++) if (String(pl[i].aspect_id) === String(aspectId)) return String(pl[i].param_id != null ? pl[i].param_id : pl[i].id);
    return null;
  };

  /* Аспекты в порядке ответа, значения в порядке аспекта; без наличия — не выводятся (как у Atlas).
     Значение, которого нет при выбранных остальных, — плитка variation-indeterminate: нажатие
     переключит и остальные аспекты на ближайшую вариацию в наличии. */
  P.renderAspects = function () {
    var self = this, L = this.L, pr = this.data.product, v = this.variation;
    var aspects = pr.aspects || {}, params = pr.params || {};
    var ids = Object.keys(aspects);
    var live = pr.variations.filter(function (x) { return self.available(x); });
    var html = '';
    ids.forEach(function (aid) {
      var a = aspects[aid];
      var order = Array.isArray(a.params) ? a.params.map(String) : [];
      var present = {};
      live.forEach(function (x) { var p = self.paramOf(x, aid); if (p) present[p] = 1; });
      var list = order.filter(function (p) { return present[p]; });
      Object.keys(present).forEach(function (p) { if (list.indexOf(p) < 0) list.push(p); });
      if (!list.length) return;
      var cur = v ? self.paramOf(v, aid) : null;
      var curName = cur && params[cur] ? params[cur].name : '';
      var gid = self.id + '-a' + aid;
      html += '<div class="mcard__aspect" role="radiogroup" aria-labelledby="' + gid + '">' +
        '<p class="mcard__aspect-label" id="' + gid + '"><span>' + esc(a.name) + ':</span><span class="mcard__aspect-value">' + esc(curName) + '</span></p><div class="mcard__tiles">';
      list.forEach(function (pid) {
        var pm = params[pid] || {};
        var sel = pid === cur;
        var fits = sel || live.some(function (x) {
          if (self.paramOf(x, aid) !== pid) return false;
          return ids.every(function (o) { return o === aid || !v || self.paramOf(x, o) === self.paramOf(v, o); });
        });
        var img = a.type === 'image' ? (pm.preview_url_2x || pm.preview_url || pm.image_url || self.imageForParam(aid, pid)) : '';
        var attrs = ' type="button" role="radio" aria-checked="' + (sel ? 'true' : 'false') + '" tabindex="' + (sel ? '0' : '-1') + '" data-mc-aspect="' + esc(aid) + '" data-mc-param="' + esc(pid) + '"';
        if (img) {
          // Один класс варианта, как в эталоне list-item: с двумя классами в блоке побеждала секция
          // variation-img, идущая в style.css позже, и выбранная плитка выглядела невыбранной.
          html += '<button class="list-item ' + (sel ? 'list-item-variation-img-selected' : 'list-item-variation-img') + ' list-item--400 mcard__tile-img"' + attrs +
            (fits ? '' : ' aria-description="' + esc(L.t('mini.not_in_combo')) + '"') + '><img class="list-item__img" src="' + esc(img) + '" alt="' + esc(pm.name) + '" loading="lazy" decoding="async"></button>';
        } else {
          var cls = sel ? 'list-item-variation-selected' : (fits ? 'list-item-variation' : 'list-item-variation-indeterminate');
          html += '<button class="list-item ' + cls + ' list-item--400 list-item--hug"' + attrs +
            (fits ? '' : ' aria-description="' + esc(L.t('mini.not_in_combo')) + '"') + '><span class="list-item__content"><span class="list-item__title">' + esc(pm.name) + '</span></span></button>';
        }
      });
      html += '</div></div>';
    });
    var box = this.q('[data-mc-aspects]');
    box.innerHTML = html;
    // Стрелки внутри группы — как у радиокнопок: выбор переезжает на соседнюю плитку.
    if (!box.__mcKeys) {
      box.__mcKeys = true;
      box.addEventListener('keydown', function (e) {
        var k = e.key, t = e.target.closest('[data-mc-param]');
        if (!t || ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].indexOf(k) < 0) return;
        var tiles = Array.prototype.slice.call(t.parentNode.querySelectorAll('[data-mc-param]'));
        var i = tiles.indexOf(t) + (k === 'ArrowLeft' || k === 'ArrowUp' ? -1 : 1);
        if (i < 0) i = tiles.length - 1; if (i >= tiles.length) i = 0;
        e.preventDefault();
        var next = tiles[i];
        self.pick(next.getAttribute('data-mc-aspect'), next.getAttribute('data-mc-param'), true);
      });
    }
    Array.prototype.forEach.call(box.querySelectorAll('[aria-checked="true"]'), function (b) {
      if (b.scrollIntoView && getComputedStyle(b.parentNode).overflowX === 'auto') b.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    });
  };
  P.imageForParam = function (aid, pid) {
    var self = this, vs = this.data.product.variations;
    for (var i = 0; i < vs.length; i++) {
      if (self.paramOf(vs[i], aid) === pid) { var im = (vs[i].images || [])[0]; if (im) return im.preview_url_2x || im.preview_url || im.thumb_url; }
    }
    return '';
  };

  P.pick = function (aid, pid, keepFocus) {
    var self = this, v = this.variation, ids = Object.keys(this.data.product.aspects || {});
    var live = this.data.product.variations.filter(function (x) { return self.available(x) && self.paramOf(x, aid) === pid; });
    if (!live.length) return;
    // Сначала — вариация, где остальные аспекты как сейчас; нет — та, что совпадает в большем числе.
    var score = function (x) { return ids.filter(function (o) { return o !== aid && v && self.paramOf(x, o) === self.paramOf(v, o); }).length; };
    live.sort(function (a, b) { return score(b) - score(a); });
    var next = live[0];
    var colorChanged = !v || ids.some(function (o) {
      var a = (self.data.product.aspects || {})[o];
      return a && a.type === 'image' && self.paramOf(next, o) !== self.paramOf(v, o);
    });
    this.applyVariation(next, colorChanged);
    var t = this.q('[data-mc-aspect="' + aid + '"][data-mc-param="' + pid + '"]');
    if (t && keepFocus !== false) t.focus();
  };

  P.applyVariation = function (v, resetFrames) {
    var L = this.L;
    this.variation = v;
    this.q('[data-mc-price]').innerHTML = priceHtml(v);
    this.q('[data-mc-badges]').innerHTML = badgesHtml(v, L);
    var nm = this.q('[data-mc-name]');
    var name = (v.meta && v.meta.h1) || v.name_moderated || this.src.name;
    nm.textContent = name;
    if (has(v.variationUrl)) nm.setAttribute('href', v.variationUrl);
    var duty = this.q('[data-mc-duty]');
    duty.hidden = !(v.duty && v.duty.isDutyExist && has(v.duty.valueFormatted));
    if (!duty.hidden) duty.textContent = L.t('mini.duty', { value: v.duty.valueFormatted });
    this.renderBrand(has(v.brand) ? v.brand : this.src.brand, has(v.brandUrl) ? v.brandUrl : this.src.brandUrl, this.src.logo);
    this.renderDelivery(v);
    if (resetFrames) {
      var frames = (v.images || []).map(function (im) {
        var s1 = im.large_url || im.full_url || im.preview_url, s2 = im.large_url_2x || im.full_url_2x;
        return { src: s1, srcset: s2 ? s1 + ' 1x, ' + s2 + ' 2x' : '' };
      }).filter(function (f) { return has(f.src); });
      if (frames.length) this.renderFrames(frames, name, true);
    }
    this.renderAspects();
    this.q('[data-mc-buy]').disabled = this.state !== 'default' || !this.available(v);
    this.renderFooter();
  };

  P.renderBrand = function (name, url, logo) {
    var b = this.q('[data-mc-brand]');
    b.hidden = !has(name);
    if (!has(name)) return;
    b.setAttribute('href', has(url) ? url : '#');
    this.q('[data-mc-brand-name]').textContent = name;
    var lg = this.q('[data-mc-logo]');
    lg.hidden = !has(logo);
    if (has(logo)) lg.firstChild.setAttribute('src', logo);
  };

  /* Строки доставки — shipping_data вариации (решение 03-20, п. 3): способ и дата, цена доставки. */
  P.renderDelivery = function (v) {
    var L = this.L, rows = [];
    var sd = Array.isArray(v.shipping_data) ? v.shipping_data : [];
    var ctx = v.variation_widgets_context || {};
    var post = sd.filter(function (s) { return s.icon === 'post'; })[0];
    var price = sd.filter(function (s) { return s.icon === 'price'; })[0];
    if (post) {
      var method = (post.data && post.data.method) || strip(post.text);
      // Дата — как у Atlas: последний день срока словами («12 декабря»), а не dateFrom (ISO «2026-12-01»).
      var pd = post.data || {}, strong = /<strong>([^<]+)<\/strong>/i.exec(String(post.text || ''));
      var date = pd.dateToFormatted || pd.dateFormatted || (strong ? strong[1].trim() : '') || ctx.deliveryDate || '';
      var from = !has(date) && this.src && has(this.src.deliveryDate) ? this.src.deliveryDate : '';
      rows.push([ICON.truck, has(date) ? L.t('mini.delivery_date', { date: date })
        : has(from) ? L.t('mini.delivery_from', { date: from }) : L.t('mini.delivery'), method]);
    }
    if (price) {
      var plain = strip(price.text);
      var m = /заказа\s+(.+)$/i.exec(plain);  // i18n-ok: разбор текста ответа витрины, не строка интерфейса
      rows.push(m ? [ICON.wallet, L.t('mini.delivery') + ' ' + m[1], L.t('mini.delivery_cost')] : [ICON.wallet, plain, '']);
    }
    this.q('[data-mc-delivery]').innerHTML = rows.map(function (r) {
      return '<li class="list-item list-item-transparent list-item--300"><span class="list-item__prefix" aria-hidden="true">' + r[0] + '</span>' +
        '<span class="list-item__content"><span class="list-item__title">' + esc(r[1]) + '</span>' +
        (has(r[2]) ? '<span class="list-item__description">' + esc(r[2]) + '</span>' : '') + '</span></li>';
    }).join('');
  };

  /* ── галерея ───────────────────────────────────────────────────────────────────────── */
  /* Галерея — как в product-card: кадры лежат стопкой, активный проявляется поверх уходящего
     (кроссфейд в CSS), стрелки листают по кругу, на таче — свайп. До 1.0.2 была лента с
     прокруткой и снапом: стрелки и точки догоняли прокрутку, листание дёргалось. Кадры со
     второго — без src (адрес в data-src): у стопки один прямоугольник, и lazy грузил бы их
     все сразу. Прогрев — на наведение, касание или первое листание. */
  /* smooth — замена кадров после ответа offers: первое фото карточки остаётся на месте, пока новое
     первое фото не загружено и не раскодировано (не дольше 1,5 с). Иначе при открытии окно на миг
     пустело и фото «прыгало» (замечание владельца 23.11.2026). */
  P.renderFrames = function (frames, name, smooth) {
    var self = this, box = this.q('[data-mc-frames]'), token = this.framesToken = {};
    var html = frames.map(function (f, i) {
      var set = has(f.srcset) ? ' ' + (i === 0 ? '' : 'data-') + 'srcset="' + esc(f.srcset) + '"' : '';
      return '<img class="mcard__frame" draggable="false" ' + (i === 0 ? '' : 'data-') + 'src="' + esc(f.src) + '"' + set +
        ' alt="' + (i === 0 ? esc(name) : '') + '" decoding="async">';
    }).join('');
    var cur = box.querySelector('.mcard__frame');
    if (smooth && cur && frames[0] && cur.getAttribute('src') !== frames[0].src) {
      var pre = new Image(), done = false;
      var go = function () { if (done) return; done = true; if (self.framesToken === token) self.putFrames(box, html, frames.length); };
      if (has(frames[0].srcset)) pre.srcset = frames[0].srcset;
      pre.src = frames[0].src;
      (pre.decode ? pre.decode() : Promise.reject()).then(go, go);
      setTimeout(go, 1500);
      return;
    }
    this.putFrames(box, html, frames.length);
  };
  P.putFrames = function (box, html, n) {
    box.innerHTML = html;
    this.warmed = false;
    this.frameCount = n;
    var dots = this.q('[data-mc-dots]');
    dots.hidden = n < 2;
    dots.classList.toggle('slider--window', n > 5);
    var h = '';
    for (var i = 0; i < n; i++) h += '<span class="slider__dot' + (i === 0 ? ' slider__dot--active' : '') + (n > 5 && i >= 4 ? ' slider__dot--sm' : '') + '"></span>';
    dots.innerHTML = n > 5 ? '<span class="slider__track">' + h + '</span>' : h;
    this.q('[data-mc-prev]').hidden = n < 2;
    this.q('[data-mc-next]').hidden = n < 2;
    this.frameIndex = -1;
    this.setFrame(0);
  };
  P.warm = function () {
    if (this.warmed) return;
    this.warmed = true;
    Array.prototype.forEach.call(this.q('[data-mc-frames]').querySelectorAll('.mcard__frame'), function (im) {
      if (im.dataset.srcset) { im.srcset = im.dataset.srcset; im.removeAttribute('data-srcset'); }
      if (im.dataset.src) { im.src = im.dataset.src; im.removeAttribute('data-src'); }
      if (im.decode) im.decode().catch(function () {});
    });
  };
  P.setFrame = function (i) {
    var n = this.frameCount || 0;
    if (!n) return;
    i = Math.max(0, Math.min(n - 1, i));
    if (i === this.frameIndex) return;
    this.frameIndex = i;
    var many = n > 1;
    Array.prototype.forEach.call(this.q('[data-mc-frames]').querySelectorAll('.mcard__frame'), function (im, k) {
      im.classList.toggle('mcard__frame--active', many && k === i);
    });
    var dots = this.q('[data-mc-dots]');
    Array.prototype.forEach.call(dots.querySelectorAll('.slider__dot'), function (d, k) { d.classList.toggle('slider__dot--active', k === i); });
    if (n > 5) layoutSliderWindow(dots, i);
  };
  /* Шаг по кругу, как стрелки product-card: с последнего кадра — на первый. */
  P.go = function (step) {
    var n = this.frameCount || 0;
    if (n < 2) return;
    this.warm();
    this.setFrame((this.frameIndex + step + n) % n);
  };

  /* ── подвал и корзина ──────────────────────────────────────────────────────────────── */
  P.renderFooter = function () {
    var L = this.L, f = this.q('[data-mc-footer]'), q = this.qty();
    var ready = this.state === 'default' && this.variation;
    if (ready && q > 0) {
      var max = Number(this.variation.quantity) || q;
      var dec = q <= 1
        ? '<button class="btn btn-secondary btn--600 btn--icon-only" type="button" data-mc-dec aria-label="' + esc(L.t('mini.qty_remove')) + '">' + ICON.del + '</button>'
        : '<button class="btn btn-secondary btn--600 btn--icon-only" type="button" data-mc-dec aria-label="' + esc(L.t('mini.qty_dec')) + '">' + ICON.minus + '</button>';
      f.innerHTML = '<div class="stepper stepper-secondary stepper--600 mcard__qty" role="group" aria-label="' + esc(L.t('mini.qty')) + '">' + dec +
        '<output class="stepper__value" aria-live="polite">' + q + '</output>' +
        '<button class="btn btn-secondary btn--600 btn--icon-only" type="button" data-mc-inc aria-label="' + esc(L.t('mini.qty_inc')) + '"' + (q >= max ? ' disabled' : '') + '>' + ICON.add + '</button></div>' +
        '<a class="btn btn-addition btn--600" data-mc-cart href="' + esc(this.cartUrl || DEFAULTS.pageCart) + '">' + esc(L.t('mini.to_cart')) + '</a>';   // макет in-cart: button / addition 600
    } else if (ready && !this.available(this.variation)) {
      f.innerHTML = '<button class="btn btn-primary btn--600" type="button" disabled>' + esc(L.t('card.out_of_stock')) + '</button>';
    } else {
      // Пока окно не знает корзину (загрузка, ошибка), кнопка выключена: set-quantity пишет число,
      // а не прибавляет, и «1» поверх товара, который уже лежит в корзине, уменьшила бы количество.
      f.innerHTML = '<button class="btn btn-primary btn--600" type="button" data-mc-add' + (ready ? '' : ' disabled') + '>' + esc(L.t('mini.add_to_cart')) + '</button>';
    }
  };

  P.setQty = function (n) {
    var self = this, v = this.variation;
    if (!v || this.busy) return;
    var vid = String(v.id), was = this.cart[vid] || 0;
    n = Math.max(0, Math.min(Number(v.quantity) || n, n));
    if (n === was) return;
    var act = document.activeElement, from = act && act.hasAttribute ? (act.hasAttribute('data-mc-inc') ? 'inc' : act.hasAttribute('data-mc-dec') ? 'dec' : act.hasAttribute('data-mc-add') ? 'add' : null) : null;
    this.busy = true;
    this.cart[vid] = n;                                                  // оптимистично, как Atlas
    this.renderFooter();
    this.refocus(from, n);
    setQuantity(vid, n).then(function () {
      cartChanged(vid, n, n - was);
    }).catch(function () {
      self.cart[vid] = was;                                              // откат
      self.renderFooter();
      self.q('[data-mc-status]').textContent = self.L.t('mini.cart_error');
    }).then(function () { self.busy = false; });
  };
  /* Подвал перерисован — фокус остаётся у того, кто его держал: «Добавить» → «+», «−» на нуле → «Добавить»,
     «+» на пределе (выключен) → «−». Фокус был вне подвала — не трогаем. */
  P.refocus = function (from, after) {
    if (!from) return;
    var f = this.q('[data-mc-footer]');
    var el = after === 0 ? f.querySelector('[data-mc-add]') : f.querySelector('[data-mc-' + (from === 'add' ? 'inc' : from) + ']');
    if (el && el.disabled) el = f.querySelector('[data-mc-dec]');
    if (el) el.focus();
  };

  P.buy = function () {
    var self = this, v = this.variation, btn = this.q('[data-mc-buy]');
    if (!v || !this.available(v) || this.busy) return;
    this.busy = true;
    btn.disabled = true;
    setBusy(btn, true);
    buyNow(String(v.id), this.qty()).catch(function () {
      self.busy = false;
      btn.disabled = false;
      setBusy(btn, false);
      self.q('[data-mc-status]').textContent = self.L.t('mini.cart_error');
    });
  };

  /* ── «поделиться» (решение владельца 21.11.2026) ──────────────────────────────────────
     Системное меню, где браузер его даёт (navigator.share: телефоны, Safari, Chrome на Windows);
     иначе — ссылка на товар в буфер и тост «Ссылка скопирована». Отмена меню пользователем —
     не ошибка (AbortError), тоста нет. Кнопки нет, если у карточки нет ссылки на товар. */
  P.shareUrl = function () {
    var u = this.src && this.src.url;
    if (!has(u)) return '';
    try { return new URL(u, location.href).href; } catch (e) { return ''; }
  };
  P.syncShare = function () {
    this.q('[data-mc-share]').hidden = !this.shareUrl();
  };
  P.share = function () {
    var self = this, url = this.shareUrl(), L = this.L;
    if (!url) return;
    if (navigator.share) {
      navigator.share({ title: this.src.name || document.title, url: url }).catch(function (e) {
        if (e && e.name === 'AbortError') return;
        self.copyLink(url);
      });
      return;
    }
    this.copyLink(url);
  };
  P.copyLink = function (url) {
    var self = this, L = this.L;
    var done = function () { self.toast(L.t('mini.link_copied')); };
    var fail = function () { self.toast(L.t('mini.share_error')); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done, fail);
    else fail();
  };
  /* Тост — awds-component-toast normal: статичная плашка, показ и скрытие ведёт мини-карточка.
     Стоит над подвалом окна: отступ снизу — высота подвала, её подвал меняет сам (кнопка ↔ степпер). */
  P.toast = function (text) {
    var t = this.q('[data-mc-toast]'), f = this.q('[data-mc-footer]');
    this.q('[data-mc-toast-text]').textContent = text;
    t.style.setProperty('--mcard-toast-offset', (f ? f.offsetHeight : 0) + 'px');
    t.hidden = false;
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(function () { t.hidden = true; }, 3000);
  };

  /* ── избранное — через кнопку карточки: у неё уже есть запрос, вход для гостя и откат ─── */
  P.syncFav = function () {
    var self = this, src = this.src.fav, mine = this.q('[data-mc-fav]');
    mine.hidden = !src;
    if (!src) return;
    var copy = function () { mine.setAttribute('aria-pressed', src.getAttribute('aria-pressed') === 'true' ? 'true' : 'false'); };
    copy();
    if (window.MutationObserver) {
      this.favObserver = new MutationObserver(copy);
      this.favObserver.observe(src, { attributes: true, attributeFilter: ['aria-pressed'] });
    }
  };
  /* Гостю витрина открывает окно входа (модуль Atlas authTrigger по [data-auth]). Его окно —
     обычный слой в <body> (z-index 1060), а наше модальное лежит в верхнем слое браузера и
     делает остальную страницу инертной: вход оказался бы под нами и не нажимался. До 1.0.2
     окно просто закрывалось. Теперь на время входа оно переходит в немодальный режим —
     остаётся на месте ниже слоя входа (.mcard--under, z-index offcanvas 1050), — а когда
     окно входа исчезло, снова становится модальным. Вошёл — Atlas перезагрузит страницу. */
  P.toggleFav = function () {
    var src = this.src.fav;
    if (!src) return;
    if (src.hasAttribute('data-auth')) this.underAuth();
    src.click();
  };
  P.underAuth = function () {
    var self = this, d = this.dialog;
    if (!d.open || !d.matches(':modal')) return;
    d.classList.add('mcard--under');
    d.close();                                                           // синхронно: событие close придёт уже открытому окну
    d.show();
    var seen = false, gone = 0, waited = 0;
    var atlasModal = function () {
      var list = document.querySelectorAll('.z-modal');
      for (var i = 0; i < list.length; i++) if (!d.contains(list[i]) && list[i].getAttribute('aria-hidden') !== 'true') return true;
      return false;
    };
    this.stopAuthWatch();
    this.authTimer = setInterval(function () {
      waited += 250;
      if (atlasModal()) { seen = true; gone = 0; return; }
      // Окно входа не появилось за 10 с (модуля нет — гость уходит на страницу входа) или
      // закрылось (два замера подряд: между прелоадером и окном бывает пустой кадр).
      if ((seen && ++gone >= 2) || (!seen && waited >= 10000)) self.backFromAuth();
    }, 250);
  };
  P.stopAuthWatch = function () {
    if (this.authTimer) { clearInterval(this.authTimer); this.authTimer = 0; }
  };
  P.backFromAuth = function () {
    var d = this.dialog;
    this.stopAuthWatch();
    d.classList.remove('mcard--under');
    if (!d.open || d.matches(':modal')) return;
    d.close();
    d.showModal();
    var fav = this.q('[data-mc-fav]');
    if (fav && !fav.hidden) fav.focus();
  };

  /* ── вход ──────────────────────────────────────────────────────────────────────────── */
  function rootOf(btn) {
    for (var i = 0; i < roots.length; i++) {
      var el = btn.closest('.' + roots[i].cls);
      if (el) return { el: el, i18n: roots[i].i18n };
    }
    return null;
  }
  function open(btn) {
    var r = rootOf(btn);
    if (!r) return false;
    var L = r.i18n(r.el);
    var mc = r.el.__awdsMiniCard || (r.el.__awdsMiniCard = new MiniCard(r.el, L));
    endpoints().then(function (ep) { mc.cartUrl = ep.pageCart; });
    mc.open(fromCard(btn));
    return true;
  }

  window.addEventListener('click', function (e) {
    var btn = e.target && e.target.closest ? e.target.closest(SEL) : null;
    if (!btn || btn.disabled || !rootOf(btn)) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    open(btn);
  }, true);

  window.awdsMiniCard = {
    /* Блок подключает окно к своим карточкам: cls — класс корня блока, i18n(root) — словарь. */
    attach: function (cls, i18n) {
      if (!cls || typeof i18n !== 'function') return;
      for (var i = 0; i < roots.length; i++) if (roots[i].cls === cls) return;
      roots.push({ cls: cls, i18n: i18n });
    },
    open: open
  };
})();
