/*!
 * n1-stability v1.1.1 — 1N Digital Media · kurumsal site mobil/tablet kararlılık katmanı
 *
 * v1.1.0 → v1.1.1 (GLOBAL MENU V1.2): TEK değişiklik ana sayfa ön yükleme listesi (WARM_HOME) — ana sayfa v6.57 ve
 *   Header/markup v12 adreslerine güncellendi (v1.1.0 listesi v6.56/v648 adreslerini içeriyordu). Davranış aynı.
 *   Özel çapa navigasyonuna bağımlılık yoktur (yalnızca tanılama ekranı varsa __n1Nav sürümünü gösterir).
 *
 * v1.0.0 → v1.1.0 (MOBILE STABILITY V1.1 — FIX_REPORT.md F-07…F-11):
 *  - KAPSAM: yalnızca 1N kurumsal sayfalarında çalışır (açık izin listesi). Intelligence, yönetim, giriş, üye/
 *    hesap ve müşteri panelleri açık red listesindedir (red listesi önceliklidir). Kapsam dışında hiçbir dinleyici,
 *    gözlemci, zamanlayıcı ya da ağ isteği oluşturulmaz.
 *  - YAŞAM DÖNGÜSÜ: zamanlayıcılar öğe üzerinde tutulur (modülde Map yok, öğeye güçlü referans kalmaz);
 *    pagehide'da zamanlayıcılar temizlenir, gözlemciler kapatılır; BFCache dönüşünde (pageshow persisted) tek ve
 *    tekrarsız yeniden kurulur. DOM'dan çıkan video gözlemden düşürülür, kaynağı geri YÜKLENMEZ (ayrık öğe indirme
 *    yapmasın), play() sarmalayıcısı kaldırılır. Masaüstü ↔ mobil profil değişiminde modül kendini kapatır/açar.
 *  - ÖN YÜKLEME: A/B ölçümüne göre yalnızca fayda gösteren liste bırakıldı (PERFORMANCE_REPORT.md §1);
 *    credentials:'omit' (üçüncü taraf CDN'e çerez gönderilmez; Chromium'da önbellek isabeti aynı ölçüldü).
 *  - TANILAMA: yalnızca ?n1diag=1 ile açılır ve aynı sekmede sayfalar arasında açık kalır (?n1diag=0 kapatır).
 *    Normal ziyaretçide sessionStorage yazımı, günlük dizisi, interval ve DOM işlemi yoktur.
 *
 *  - UZAK-BIRAKMA VARSAYILAN KAPALI: 21 döngü × 2 WebKit koşusunda kaynakları serbest bıraktığı halde süreç
 *    belleğini düşürmedi (TEST_REPORT.md §10). Yalnızca gerçek cihaz karşılaştırması için ?n1far=1 ile (sekme
 *    boyunca) açılır, ?n1far=0 kapatır. Kapalıyken IntersectionObserver/MutationObserver hiç kurulmaz.
 *
 * Değişmeyen davranış (v1.0.0): pagehide'da 1N videolarının kaynağını bırakma, BFCache dönüşünde geri yükleme,
 * bırakılmış videoda play() → önce kaynağı geri yükleme.
 * Tasarım, metin, bağlantı, video kalitesi, GSAP/ScrollTrigger, Header/Footer, reklam/izleme kodları değişmez.
 */
(function () {
  'use strict';
  if (window.__n1Stability) return;

  var VERSION = '1.1.1';
  var MOBILE_MQ = '(max-width: 1024px), (hover: none) and (pointer: coarse)';
  var FAR_MARGIN = '150% 0px 150% 0px';
  var FAR_DELAY = 4000;
  var DIAG_KEY = 'n1-diag', LOG_KEY = 'n1-stability-log', FAR_KEY = 'n1-far';
  var FAR_RELEASE_DEFAULT = false;

  /* ---------- kapsam ---------- */
  var SCOPE_ALLOW = ['/', '/n1-full-test', '/kisaca-biz', '/markalar',
    '/kreatif-produksiyon', '/e-ticaret-yonetimi', '/sosyal-medya', '/reklam-yonetimi', '/ui-ux-tasarim', '/yapay-zeka', '/uygulama-gelistirme',
    '/kvkk-aydinlatma-metni', '/cerez-politikasi', '/kullanim-kosullari', '/gizlilik', '/gizlilik-politikasi', '/veri-sahibi-basvuru-formu'];
  var SCOPE_DENY = /(^|\/)(intelligence|admin|dashboard|dasboard|panel|login|giris|signin|sign-in|account|my-account|hesabim|profile|settings|notifications|my-addresses|members?|uye|popup-|n1i-)/i;
  function path() { return (location.pathname.replace(/\/+$/, '') || '/').toLowerCase(); }
  function inScope(p) { p = p || path(); return !SCOPE_DENY.test(p) && SCOPE_ALLOW.indexOf(p) >= 0; }
  if (!inScope()) { window.__n1Stability = { version: VERSION, active: false, reason: 'scope' }; return; }

  /* ---------- ön yükleme (A/B: PERFORMANCE_REPORT.md §1) ---------- */
  var WARM_MODE = 'home';                 // 'off' | 'home' | 'page' | 'full'
  var J = 'https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@';
  var C648 = J + 'd24fa373d6d76c0218b3f3b77897a8c2ace04e5e/', C648M = C648 + 'wix-full-v1/';
  var F97 = J + 'f97db8edb37f1e1388f276d840e262fc8452b80a/', SW = F97 + 'wix-sitewide-mobile-fix-2026-11-26/';
  var WARM_SHARED = [C648 + 'wix-home-v648/site/n1-site-markup-v648.js', C648 + 'wix-home-v648/modules/n1-header-v648.js',
    C648M + 'modules/n1-footer-v636.css', C648M + 'modules/n1-footer-v646.js', C648M + 'modules/n1-links-v646.js', C648M + 'modules/n1-floating-controls-v632.js',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js'];
  var G12 = J + '39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/', M12 = J + '162599ec580db98d848cf6670bcde7ee30bf97f5/wix-global-menu-v12/';
  var WARM_HOME = [G12 + 'pages/wix-home-v657/n1-site-wix-v657.js', F97 + 'wix-home-v656/modules/n1-m5-build.js', F97 + 'wix-home-v656/site/n1-home-m5.css',
    F97 + 'wix-home-v656/modules/n1-video-m5.js', F97 + 'wix-home-v656/modules/n1-home-m5.js', F97 + 'wix-home-v656/media/ronin-m5-poster.webp',
    C648M + 'site/n1-site-base-v1.css', M12 + 'site/n1-site-markup-v12.js', M12 + 'modules/n1-header-v12.js']
    .concat(['partners-v617', 'samurai-video-v632', 'stats-v632', 'video-band-v633', 'contact-cta-v634', 'about-v635', 'footer-v636',
      'ecosystem-v647', 'gads-v643', 'brands-v625', 'showreel-v628', 'sectors-v630'].map(function (m) { return C648M + 'modules/n1-' + m + '.css'; }));
  var WARM_INNER = {
    '/kreatif-produksiyon': SW + 'wix-kreatif-produksiyon-v23/n1-kreatif-produksiyon-v23.js',
    '/e-ticaret-yonetimi': SW + 'wix-e-ticaret-yonetimi-v23/n1-e-ticaret-yonetimi-v23.js',
    '/sosyal-medya': SW + 'wix-sosyal-medya-v27/n1-sosyal-medya-v27.js',
    '/reklam-yonetimi': SW + 'wix-reklam-yonetimi-v23/n1-reklam-yonetimi-v23.js',
    '/ui-ux-tasarim': SW + 'wix-uiux-tasarim-v28/n1-uiux-tasarim-v28.js',
    '/yapay-zeka': SW + 'wix-yapay-zeka-v2/n1-yapay-zeka-v2.js',
    '/uygulama-gelistirme': SW + 'wix-uygulama-gelistirme-v2/n1-uygulama-gelistirme-v2.js',
    '/markalar': SW + 'wix-markalar-v1/n1-markalar-v11.js',
    '/kisaca-biz': SW + 'wix-kisaca-biz-v1/n1-kisaca-biz-v1.js'
  };
  function warmList() {
    var p = path(), home = p === '/' || p === '/n1-full-test';
    if (WARM_MODE === 'off') return [];
    if (WARM_MODE === 'home') return home ? WARM_HOME : [];
    var page = home ? WARM_HOME : (WARM_INNER[p] ? [WARM_INNER[p]] : []);
    if (WARM_MODE === 'page') return page;
    return page.concat(WARM_SHARED, home ? [] : [J + '09612df97e85978976d13edbd79dad0adcc1d1f1/wix-studyo-v1/site/n1-inner-responsive-v6.css']);
  }
  function warm() {
    if (!window.fetch || (navigator.connection && navigator.connection.saveData)) return;
    var seen = {};
    warmList().forEach(function (u) {
      if (seen[u]) return; seen[u] = 1;
      try { fetch(u, { mode: 'no-cors', credentials: 'omit', priority: 'low' }).then(function () { stats.warmed++; }, function () {}); } catch (e) {}
    });
  }

  /* ---------- tanılama (yalnızca n1diag) ---------- */
  var diagOn = false;
  try {
    var q = /[?&]n1diag=([01])\b/.exec(location.search);
    if (q && q[1] === '1') sessionStorage.setItem(DIAG_KEY, '1');
    else if (q && q[1] === '0') { sessionStorage.removeItem(DIAG_KEY); sessionStorage.removeItem(LOG_KEY); }
    diagOn = sessionStorage.getItem(DIAG_KEY) === '1';
  } catch (e) {}
  var farOn = FAR_RELEASE_DEFAULT;                        // gerçek cihaz karşılaştırması: ?n1far=1 / ?n1far=0
  try {
    var qf = /[?&]n1far=([01])\b/.exec(location.search);
    if (qf && qf[1] === '1') sessionStorage.setItem(FAR_KEY, '1'); else if (qf && qf[1] === '0') sessionStorage.removeItem(FAR_KEY);
    if (qf || sessionStorage.getItem(FAR_KEY)) farOn = sessionStorage.getItem(FAR_KEY) === '1';
  } catch (e) {}
  var stats = { released: 0, restored: 0, resumed: 0, farReleased: 0, playIntercepts: 0, warmed: 0, starts: 0, bfRestores: 0 };
  var box = null;
  function now() { return Math.round(performance.now()); }
  function note(s) {
    if (!diagOn) return;
    try {
      var a = JSON.parse(sessionStorage.getItem(LOG_KEY) || '[]');
      a.push(path() + ' ' + s + ' @' + now()); if (a.length > 80) a = a.slice(-80);
      sessionStorage.setItem(LOG_KEY, JSON.stringify(a));
    } catch (e) {}
    render();
  }
  function render() {
    if (!diagOn || !document.body) return;
    if (!box) {
      box = document.createElement('pre'); box.setAttribute('aria-hidden', 'true');
      box.style.cssText = 'position:fixed;left:6px;bottom:6px;z-index:2147483646;max-width:72vw;max-height:42vh;overflow:auto;margin:0;padding:6px 8px;font:10px/1.35 ui-monospace,Menlo,monospace;color:#d8ffb0;background:rgba(0,0,0,.8);border-radius:6px;pointer-events:none;white-space:pre-wrap';
      document.body.appendChild(box);
    }
    var all = []; try { all = JSON.parse(sessionStorage.getItem(LOG_KEY) || '[]'); } catch (e) {}
    var v = ourVideos(), nav = (performance.getEntriesByType('navigation')[0] || {}).type;
    box.textContent = 'n1-stability ' + VERSION + ' · mobil=' + active + ' · uzak=' + (farOn ? 'açık' : 'kapalı') + ' · nav=' + nav + ' · n1Nav=' + ((window.__n1Nav && window.__n1Nav.version) || '-') + '\n' +
      'video=' + v.length + ' src=' + v.filter(function (x) { return x.getAttribute('src'); }).length + ' oynayan=' + v.filter(function (x) { return !x.paused; }).length +
      ' bırakılan=' + v.filter(function (x) { return x.__n1rel; }).length + '\n' + JSON.stringify(stats) + '\n' + all.slice(-16).join('\n');
  }

  /* ---------- 1N videoları ---------- */
  function mobile() { try { return matchMedia(MOBILE_MQ).matches; } catch (e) { return false; } }
  function owned(v) { for (var e = v.parentElement; e; e = e.parentElement) { if (e.tagName && e.tagName.lastIndexOf('N1-', 0) === 0) return true; } return false; }
  function ourVideos() { return [].filter.call(document.getElementsByTagName('video'), owned); }
  function ratio(el) {
    var r = el.getBoundingClientRect(); if (!el.isConnected || !r.width || !r.height) return 0;
    var w = Math.max(0, Math.min(innerWidth, r.right) - Math.max(0, r.left)), h = Math.max(0, Math.min(innerHeight, r.bottom) - Math.max(0, r.top));
    return (w * h) / (r.width * r.height);
  }
  function nearViewport(v) { var r = v.getBoundingClientRect(), m = innerHeight * 1.5; return r.bottom > -m && r.top < innerHeight + m; }
  var nativePlay = HTMLMediaElement.prototype.play;

  function release(v, why) {
    if (v.__n1rel || !v.isConnected) return false;
    var src = v.getAttribute('src'); if (!src) return false;
    v.__n1rel = { src: src, t: v.currentTime || 0, playing: !v.paused && !v.ended, why: why };
    try { if (!v.paused) v.pause(); } catch (e) {}
    v.removeAttribute('src');
    try { v.load(); } catch (e) {}
    v.play = function () { stats.playIntercepts++; restore(v); return nativePlay.apply(v, arguments); };
    stats.released++; if (why === 'far') stats.farReleased++;
    return true;
  }
  function unwrap(v) { if (Object.prototype.hasOwnProperty.call(v, 'play')) { try { delete v.play; } catch (e) { v.play = nativePlay; } } }
  function restore(v) {
    var st = v.__n1rel; if (!st) return null;
    v.__n1rel = null; unwrap(v);
    if (!v.isConnected) return null;                       // ayrık öğe: kaynak geri yüklenmez
    if (v.getAttribute('src')) return st;                  // bileşen bu arada yeni kaynak atadı (ör. yedek dosya): onun seçimi korunur
    if (st.t > 0.05) {
      var seek = function () { v.removeEventListener('loadedmetadata', seek); try { if (v.currentTime < 0.05 && isFinite(v.duration) && st.t < v.duration) v.currentTime = st.t; } catch (e) {} };
      v.addEventListener('loadedmetadata', seek);
    }
    v.setAttribute('src', st.src);
    stats.restored++;
    return st;
  }
  function clearFar(v) { if (v.__n1farT) { clearTimeout(v.__n1farT); v.__n1farT = 0; } }
  function forget(v) {                                    // DOM'dan çıkan video
    clearFar(v); if (io) io.unobserve(v);
    if (v.__n1rel) { v.__n1rel = null; unwrap(v); }
  }

  /* ---------- gözlemciler (tek örnek; pagehide'da kapanır, pageshow'da yeniden kurulur) ---------- */
  var io = null, mo = null, moT = 0, watched = new WeakSet(), active = false;
  function onFar(entries) {
    entries.forEach(function (en) {
      var v = en.target;
      if (!v.isConnected) { forget(v); return; }
      if (en.isIntersecting) { clearFar(v); if (v.__n1rel && v.__n1rel.why === 'far') restore(v); return; }
      if (v.__n1farT) return;
      v.__n1farT = setTimeout(function () {
        v.__n1farT = 0;
        if (!v.isConnected) { forget(v); return; }      // uzaktayken DOM'dan çıkan video: IO yeni giriş üretmez
        if (!active || document.hidden || nearViewport(v) || !v.paused) return;
        if (release(v, 'far')) note('far-release');
      }, FAR_DELAY);
    });
  }
  function watch(v) { if (!io || watched.has(v) || !owned(v)) return; watched.add(v); io.observe(v); }
  function scan() { [].forEach.call(document.getElementsByTagName('video'), watch); }
  function connect() {
    if (!farOn || io || !('IntersectionObserver' in window)) return;
    io = new IntersectionObserver(onFar, { rootMargin: FAR_MARGIN, threshold: 0 });
    watched = new WeakSet(); scan();
    if (!mo && 'MutationObserver' in window) {
      mo = new MutationObserver(function (list) {
        for (var i = 0; i < list.length; i++) for (var k = 0, a = list[i].addedNodes; k < a.length; k++) {
          var n = a[k]; if (n.nodeType !== 1) continue;
          if (n.tagName === 'VIDEO') watch(n); else if (n.getElementsByTagName) { var vs = n.getElementsByTagName('video'); for (var j = 0; j < vs.length; j++) watch(vs[j]); }
        }
      });
      mo.observe(document.documentElement, { childList: true, subtree: true });
      moT = setTimeout(stopMO, 60000);                   // bileşenler kurulduktan sonra yeni video eklenmez
    }
  }
  function stopMO() { clearTimeout(moT); moT = 0; if (mo) { mo.disconnect(); mo = null; } }
  function disconnect() {
    stopMO();
    [].forEach.call(document.getElementsByTagName('video'), clearFar);
    if (io) { io.disconnect(); io = null; }
  }

  /* ---------- profil ve yaşam döngüsü ---------- */
  function activate() {
    if (active) return; active = true; stats.starts++;
    connect(); note('aktif');
  }
  function deactivate() {                                  // masaüstüne geçiş: bırakılanlar geri, gözlemciler kapalı
    if (!active) return; active = false; disconnect();
    ourVideos().forEach(function (v) { if (v.__n1rel) restore(v); });
    note('pasif (masaüstü profili)');
  }
  function onPageHide(e) {
    if (!active) return;
    var n = 0; ourVideos().forEach(function (v) { if (release(v, 'pagehide')) n++; });
    disconnect();
    note('pagehide persisted=' + !!(e && e.persisted) + ' bırakılan=' + n);
  }
  function onPageShow(e) {
    if (!e || !e.persisted) { note('pageshow persisted=false'); return; }
    stats.bfRestores++;
    if (!mobile()) { active = true; deactivate(); return; }
    var r = 0, n = 0;
    ourVideos().forEach(function (v) {
      var st = v.__n1rel; if (!st || st.why !== 'pagehide') return;
      if (!nearViewport(v)) { st.why = 'far'; return; }   // yaklaşınca IO geri yükler
      restore(v); r++;
      if (st.playing && !document.hidden && ratio(v) >= 0.08) {
        v.muted = true; v.playsInline = true;
        var p; try { p = v.play(); } catch (err) {} if (p && p.catch) p.catch(function () {});
        n++; stats.resumed++;
      }
    });
    connect();                                             // tek IO; MO yeniden kurulmaz (stopMO sonrası mo=null → connect kurar, 60 sn)
    note('pageshow persisted=true geri=' + r + ' devam=' + n);
  }
  var mq = null;
  function onProfile() { if (mobile()) { activate(); scan(); } else deactivate(); }

  window.addEventListener('pagehide', onPageHide, true);
  window.addEventListener('pageshow', onPageShow, true);   // capture: bileşen işleyicilerinden önce

  function start() {
    try { mq = matchMedia(MOBILE_MQ); if (mq.addEventListener) mq.addEventListener('change', onProfile); else if (mq.addListener) mq.addListener(onProfile); } catch (e) {}
    if (mobile()) { activate(); warm(); } else note('masaüstü: pasif');
    render();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true }); else start();

  window.__n1Stability = {
    version: VERSION, active: true, stats: stats,
    report: function () {
      var v = ourVideos();
      return { version: VERSION, mobile: active, scope: path(), warmMode: WARM_MODE, farRelease: farOn, diag: diagOn, stats: Object.assign({}, stats),
        observers: { io: !!io, mo: !!mo }, videos: v.length, withSrc: v.filter(function (x) { return x.getAttribute('src'); }).length,
        released: v.filter(function (x) { return x.__n1rel; }).length, playing: v.filter(function (x) { return !x.paused; }).length };
    }
  };
})();
