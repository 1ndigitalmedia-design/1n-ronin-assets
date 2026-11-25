/*!
 * n1-nav-v1 — 1N Digital Media · merkezi çapa navigasyonu (Hizmetler → #hizmetler-ozet)
 *
 * Ne yapar
 *  - Çapa hedefi bu sayfadaysa (ana sayfa): bağlantıya tıklanınca sayfa yeniden yüklenmez, mevcut GSAP ile
 *    akıcı kaydırılır; hedef, sabit Header'ın o anki yüksekliğinin altında durur.
 *  - Çapa hedefi bu sayfada değilse (iç sayfalar): kullanıcı yapılandırılmış ana sayfa adresine gönderilir.
 *  - Sayfaya çapa adresiyle gelindiğinde (başka sayfadan, doğrudan URL): Custom Element içeriğinin
 *    oluşması beklenir, hedef doğrulanır, yerleşim oturana kadar sınırlı sayıda düzeltme yapılır.
 *  - prefers-reduced-motion: animasyonsuz, anında konumlama.
 *
 * Ne yapmaz
 *  - Header/menü tasarımına, diğer bağlantılara, ScrollTrigger kayıtlarına dokunmaz. Yeni kütüphane yüklemez.
 *  - ScrollTrigger.refresh() ÇAĞIRMAZ (ana sayfa yükleyicisi zaten tek ve kontrollü yeniliyor); yalnızca
 *    "refresh" olayını dinleyip konumu yeniden doğrular.
 *  - Kullanıcı kaydırmaya başladığı anda (teker, dokunma, klavye, kaydırma çubuğu) bütün işlemleri bırakır.
 *
 * MERKEZİ YAPILANDIRMA (isteğe bağlı) — bu dosyadan önce ya da sonra tanımlanabilir, tıklama anında okunur:
 *   window.N1_NAV_CONFIG = { home: '/n1-full-test' };   // geçici test ana sayfası
 *   Tanımlı değilse home = '/' (nihai adres). Ana sayfa "/" adresine taşındığında bu satır '/' yapılır
 *   ya da tamamen kaldırılır; sayfa bazında hiçbir dosya değişmez.
 */
(function () {
  'use strict';
  if (window.__n1Nav) return;

  var ANCHORS = ['hizmetler-ozet'];            // yönetilen çapalar (mevcut kimlik korunur)
  var KNOWN_HOMES = ['/', '/n1-full-test'];    // ana sayfanın bulunabileceği adresler (nihai + geçici)
  var HOME_TAG = 'n1-site-v1';                 // ana sayfa Custom Element etiketi
  var GAP = 12, GAP_NO_HEADER = 24;            // Header altı nefes payı (px)
  var WAIT_MS = 30000;                         // yavaş bağlantıda hedefin oluşması için en uzun bekleme
  var SETTLE_MS = 12000, SETTLE_MAX = 8;       // varış sonrası yerleşim penceresi ve en fazla düzeltme sayısı

  function norm(p) {
    p = String(p == null ? '/' : p).replace(/[?#].*$/, '');
    if (p.length > 1) p = p.replace(/\/+$/, '');
    return p || '/';
  }
  function cfg() {
    var c = window.N1_NAV_CONFIG || {};
    return { home: norm(c.home || '/'), explicit: !!c.home };
  }
  function hashId(h) { try { return decodeURIComponent(String(h || '').replace(/^#/, '')); } catch (e) { return ''; } }
  function managed(id) { return ANCHORS.indexOf(id) >= 0; }
  function reduced() { try { return matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } }
  function now() { return (window.performance && performance.now) ? performance.now() : Date.now(); }

  /* Sabit Header'ın o anki alt kenarı (masaüstü / tablet / mobilde farklı; gizliyse 0) */
  function headerOffset() {
    var h = document.querySelector('n1-header'), bottom = 0;
    if (h) {
      var cs = getComputedStyle(h);
      if (cs.display !== 'none' && cs.visibility !== 'hidden' && cs.position === 'fixed') {
        var r = (h.querySelector('.n1h-bar') || h).getBoundingClientRect();
        if (r.height > 0 && r.top < 4) bottom = Math.max(0, Math.round(r.bottom));
      }
    }
    return bottom ? bottom + GAP : GAP_NO_HEADER;
  }
  function targetY(el) {
    var max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    var y = el.getBoundingClientRect().top + window.pageYOffset - headerOffset();
    return Math.max(0, Math.min(Math.round(y), max));
  }
  function jump(y) {
    try { window.scrollTo({ top: y, left: window.pageXOffset, behavior: 'instant' }); }
    catch (e) { window.scrollTo(window.pageXOffset, y); }
  }

  /* ---------- kullanıcı girdisi: her şeyi bırak ---------- */
  var INPUTS = ['wheel', 'touchstart', 'pointerdown', 'keydown'];
  var inputCbs = [];
  function onInput(e) {
    if (e.type === 'keydown' && !/^(Arrow|Page|Home|End| |Spacebar)/.test(e.key || '')) return;
    var list = inputCbs.slice(); inputCbs = [];
    INPUTS.forEach(function (t) { window.removeEventListener(t, onInput, true); });
    list.forEach(function (f) { try { f(); } catch (err) {} });
  }
  function untilInput(cb) {
    if (!inputCbs.length) INPUTS.forEach(function (t) { window.addEventListener(t, onInput, { capture: true, passive: true }); });
    inputCbs.push(cb);
    return function () { var i = inputCbs.indexOf(cb); if (i >= 0) inputCbs.splice(i, 1); if (!inputCbs.length) INPUTS.forEach(function (t) { window.removeEventListener(t, onInput, true); }); };
  }

  /* ---------- akıcı kaydırma (mevcut GSAP çekirdeği; eklenti yok) ---------- */
  var tween = null, offTween = null;
  function stopTween() { if (tween) { tween.kill(); tween = null; } if (offTween) { offTween(); offTween = null; } }
  function go(el, smooth) {
    stopTween();
    var y = targetY(el), from = window.pageYOffset, dist = Math.abs(y - from);
    if (!smooth || reduced() || !window.gsap || dist < 2) { jump(y); return; }
    var o = { y: from };
    offTween = untilInput(function () { if (tween) { tween.kill(); tween = null; } offTween = null; });
    tween = window.gsap.to(o, {
      y: y, duration: Math.max(0.55, Math.min(1.15, dist / 2600)), ease: 'power3.inOut', overwrite: true,
      onUpdate: function () { jump(o.y); },
      onComplete: function () {
        tween = null; if (offTween) { offTween(); offTween = null; }
        var y2 = targetY(el); if (Math.abs(y2 - window.pageYOffset) > 2) jump(y2);   // yol üzerinde yerleşim değiştiyse son düzeltme
      }
    });
  }

  /* ---------- varış: hedefi bekle, doğrula, yerleşim oturana kadar sınırlı düzelt ---------- */
  var arrival = null;   // etkin varış işlemi (tek)
  function cancelArrival() { if (arrival) { var a = arrival; arrival = null; a(); } }
  function settle(el) {
    var n = 0, timer = 0, done = false, t0 = now(), ro = null, offIn = null;
    function finish() {
      if (done) return; done = true; clearTimeout(timer); clearTimeout(endT);
      window.removeEventListener('scroll', later, true); window.removeEventListener('load', later);
      if (ro) ro.disconnect();
      if (window.ScrollTrigger && window.ScrollTrigger.removeEventListener) window.ScrollTrigger.removeEventListener('refresh', later);
      if (offIn) offIn();
      if (arrival === finish) arrival = null;
    }
    function check() {
      if (done) return;
      if (!el.isConnected) { finish(); return; }
      if (tween) return;                                   // kullanıcı tıklamasıyla başlayan kaydırma öncelikli
      var y = targetY(el);
      if (Math.abs(y - window.pageYOffset) > 2) {
        if (n >= SETTLE_MAX) { finish(); return; }
        n++; jump(y);
      }
    }
    function later() { if (done) return; clearTimeout(timer); timer = setTimeout(check, 140); }
    offIn = untilInput(finish);
    window.addEventListener('scroll', later, { capture: true, passive: true });
    if (document.readyState !== 'complete') window.addEventListener('load', later);
    if (window.ResizeObserver) { ro = new ResizeObserver(later); ro.observe(document.documentElement); if (document.body) ro.observe(document.body); }
    if (window.ScrollTrigger && window.ScrollTrigger.addEventListener) window.ScrollTrigger.addEventListener('refresh', later);
    var endT = setTimeout(finish, SETTLE_MS);
    arrival = finish;
    check();
    return t0;
  }
  function whenTarget(id, found) {
    var el = document.getElementById(id);
    if (el) { found(el); return function () {}; }
    var mo = null, to = 0, off = false;
    function stop() { if (off) return; off = true; if (mo) mo.disconnect(); clearTimeout(to); }
    mo = new MutationObserver(function () { var e = document.getElementById(id); if (e) { stop(); found(e); } });
    mo.observe(document.documentElement, { childList: true, subtree: true });
    to = setTimeout(stop, WAIT_MS);
    return stop;
  }
  function arrive() {
    var id = hashId(location.hash);
    if (!managed(id)) return;
    cancelArrival();
    var stopWait = whenTarget(id, function (el) {
      if (arrival === stopWait) arrival = null;
      // bir kare bekle: bağlanan Custom Element'in ilk yerleşimi oluşsun
      requestAnimationFrame(function () { if (hashId(location.hash) === id) settle(el); });
    });
    arrival = stopWait;
    // Geçici dönem: çapa adresi ana sayfa bileşeni olmayan bilinen bir ana sayfa adresinde açıldıysa
    // (ör. eski "/" sayfası) ve merkezi yapılandırma başka bir adres gösteriyorsa oraya geç.
    var c = cfg(), here = norm(location.pathname);
    if (c.explicit && here !== c.home && KNOWN_HOMES.indexOf(here) >= 0) {
      var redirect = function () {
        if (document.getElementById(id) || document.querySelector(HOME_TAG)) return;
        cancelArrival(); location.replace(c.home + '#' + id);
      };
      if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { setTimeout(redirect, 600); }, { once: true });
      else setTimeout(redirect, 600);
    }
  }

  /* ---------- bağlantılar (olay yetkilendirme: Header hangi sürümde olursa olsun çalışır) ---------- */
  function linkAnchor(a) {
    var raw = a.getAttribute('href'); if (!raw || raw.indexOf('#') < 0) return null;
    var u; try { u = new URL(raw, location.href); } catch (e) { return null; }
    if (u.origin !== location.origin) return null;
    var id = hashId(u.hash); if (!managed(id)) return null;
    var p = norm(u.pathname);
    if (p === norm(location.pathname) || p === cfg().home || KNOWN_HOMES.indexOf(p) >= 0) return id;
    return null;
  }
  function closestLink(t) { return t && t.closest ? t.closest('a[href]') : null; }
  function onClick(e) {
    if (e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = closestLink(e.target); if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
    var id = linkAnchor(a); if (!id) return;
    var el = document.getElementById(id);
    e.preventDefault();                                   // yayılım durdurulmaz: Header kendi menüsünü kapatır
    if (el) {
      cancelArrival();
      if (hashId(location.hash) !== id) { try { history.pushState(history.state, '', '#' + id); } catch (err) {} }
      requestAnimationFrame(function () { go(el, true); });
    } else {
      location.assign(cfg().home + '#' + id);             // tam sayfa geçişi: varışta arrive() çalışır
    }
  }
  /* İç sayfalarda bağlantının görünen adresi de merkezi adrese eşitlenir (yeni sekme, durum çubuğu) */
  function onIntent(e) {
    var a = closestLink(e.target); if (!a) return;
    var id = linkAnchor(a); if (!id || document.getElementById(id)) return;
    var dest = cfg().home + '#' + id;
    if (a.getAttribute('href') !== dest) a.setAttribute('href', dest);
  }
  function onHistory() {
    // Geri/ileri: tarayıcı kendi konumunu geri yükler; çapa adresine dönüldüyse konum doğrulanır.
    stopTween();
    if (managed(hashId(location.hash))) arrive(); else cancelArrival();
  }

  document.addEventListener('click', onClick, true);
  document.addEventListener('pointerover', onIntent, { capture: true, passive: true });
  document.addEventListener('focusin', onIntent, true);
  document.addEventListener('touchstart', onIntent, { capture: true, passive: true });
  window.addEventListener('popstate', onHistory);
  window.addEventListener('hashchange', onHistory);
  window.addEventListener('pageshow', function (e) { if (e.persisted) arrive(); });

  window.__n1Nav = {
    version: '1.0.1',
    config: cfg,
    offset: headerOffset,
    go: function (id, smooth) { var el = document.getElementById(id || ANCHORS[0]); if (el) go(el, smooth !== false); return !!el; }
  };
  /* Yenileme yeni bir çapa navigasyonu değildir: eski fragment'i kaldır ve Ronin girişine dön. */
  function resetReloadAnchor() {
    var here = norm(location.pathname);
    if (!managed(hashId(location.hash)) || KNOWN_HOMES.indexOf(here) < 0) return false;
    var entry = window.performance && performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
    var reload = entry ? entry.type === 'reload' : !!(window.performance && performance.navigation && performance.navigation.type === 1);
    if (!reload) return false;
    try { history.replaceState(history.state, '', location.pathname + location.search); } catch (e) { return false; }
    var previous, offInput, timer, done = false;
    try { previous = history.scrollRestoration; history.scrollRestoration = 'manual'; } catch (e) {}
    function finish() {
      if (done) return; done = true;
      clearTimeout(timer); window.removeEventListener('pageshow', onShow);
      if (offInput) offInput();
      try { if (previous) history.scrollRestoration = previous; } catch (e) {}
    }
    function onShow() { requestAnimationFrame(function () { if (!done) { jump(0); finish(); } }); }
    offInput = untilInput(finish);
    jump(0);
    timer = setTimeout(finish, 12000);
    if (document.readyState === 'complete') onShow();
    else window.addEventListener('pageshow', onShow, { once: true });
    return true;
  }
  if (!resetReloadAnchor()) arrive();
})();
