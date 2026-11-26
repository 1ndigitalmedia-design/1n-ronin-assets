/*!
 * n1-stability-v1 — 1N Digital Media · site geneli mobil/tablet kararlılık katmanı (v1.0.0)
 *
 * Neden var (MOBILE STABILITY & TECHNICAL OPTIMIZATION V1.0 — ROOT_CAUSE_ANALYSIS.md):
 *  - iPhone Safari/Chrome (ikisi de WebKit) aynı site içindeki sayfaları tek bir WebContent sürecinde tutar ve
 *    geri/ileri önbelleğine (BFCache) aldığı sayfaları bellekte saklar. Sayfa bileşenleri videoları sayfadan
 *    ayrılırken yalnızca DURAKLATIYOR; kaynak (src), çözücü ve tampon bellekte kalıyor. Bileşenlerin
 *    disconnectedCallback temizliği tam sayfa geçişinde hiç çalışmıyor.
 *  - Uzun sayfalarda kaydırılıp geçilen videolar duraklatılıyor ama tamponları serbest bırakılmıyor
 *    (Playwright ölçümü: sayfa sonunda videoların tamamı readyState>=2).
 *  - Header'ı oluşturan ortak dosyalar Wix Custom Element betiği geldikten SONRA sırayla isteniyor.
 *
 * Ne yapar (yalnızca mobil/tablet profilinde; masaüstünde hiçbir şey yapmaz):
 *  1. pagehide: 1N bileşenlerine ait (<n1-*> içindeki) ve src özniteliği olan videoların kaynağını bırakır
 *     (pause → removeAttribute('src') → load()). Konum ve "oynuyordu" bilgisi saklanır.
 *  2. pageshow (BFCache dönüşü): bırakılan kaynakları geri yükler; sayfadan ayrılırken oynayan ve hâlâ ekranda
 *     olan video sessiz/inline olarak yeniden oynatılır. Kullanıcının duraklattığı video oynatılmaz.
 *  3. Ekranın çok dışında (≈1,5 ekran) en az 4 sn DURAKLATILMIŞ bekleyen videoların kaynağını bırakır; video
 *     ekrana ≈1,5 ekran yaklaşınca kaynak ve konum geri yüklenir (oynatma kararını sayfa bileşeni verir).
 *     Kaynağı bırakılmış bir videoda play() çağrılırsa kaynak önce geri yüklenir (bileşen mantığı bozulmaz).
 *  4. Wix Custom Element betiği gelmeden önce, tüm iç sayfaların ortak kullandığı Header/Footer/GSAP dosyalarını
 *     düşük öncelikle HTTP önbelleğine ısıtır (çalıştırmaz, DOM'a eklemez).
 *  5. Tanılama: window.__n1Stability.report(); ?n1diag=1 ile ekranda küçük bir yaşam döngüsü günlüğü.
 *
 * Ne yapmaz: tasarım, metin, bağlantı, video kalitesi, GSAP/ScrollTrigger kayıtları, Header/Footer işaretlemesi,
 * reklam/izleme kodları değişmez. Wix'in kendi videolarına (n1-* dışı) dokunulmaz. Kütüphane yüklemez.
 */
(function () {
  'use strict';
  if (window.__n1Stability) return;

  var VERSION = '1.0.0';
  var MOBILE_MQ = '(max-width: 1024px), (hover: none) and (pointer: coarse)';
  var FAR_MARGIN = '150% 0px 150% 0px';   // bu bölgenin dışı "uzak" sayılır
  var FAR_DELAY = 4000;                   // uzakta ve duraklatılmış bu kadar kalırsa kaynak bırakılır (ms)
  var LOG_KEY = 'n1-stability-log';

  /* Ortak bağımlılıklar (iç sayfalar + ana sayfa aynı sabit commit'leri kullanır). Eskiyse yalnızca boşa
     indirme olur; işlev etkilenmez. Sayfa sürümleri değişince DEPLOYMENT.md'deki listeyle birlikte güncellenir. */
  var J = 'https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@';
  var C648 = J + 'd24fa373d6d76c0218b3f3b77897a8c2ace04e5e/';
  var WARM = [
    C648 + 'wix-home-v648/site/n1-site-markup-v648.js',
    C648 + 'wix-home-v648/modules/n1-header-v648.js',
    C648 + 'wix-full-v1/modules/n1-footer-v636.css',
    C648 + 'wix-full-v1/modules/n1-footer-v646.js',
    C648 + 'wix-full-v1/modules/n1-links-v646.js',
    C648 + 'wix-full-v1/modules/n1-floating-controls-v632.js',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js'
  ];
  var WARM_INNER = [
    J + '09612df97e85978976d13edbd79dad0adcc1d1f1/wix-studyo-v1/site/n1-inner-responsive-v6.css'
  ];
  /* Sayfaya özgü dosyalar: Wix'te o sayfanın Custom Element'ine yazılı, canlıda doğrulanan adresler
     (DEPENDENCY_MAP.md). Wix kaynağı değişince bu liste de güncellenmelidir; eski kalırsa yalnızca boşa indirme olur. */
  var F97 = J + 'f97db8edb37f1e1388f276d840e262fc8452b80a/';
  var SW = F97 + 'wix-sitewide-mobile-fix-2026-11-26/';
  var C648M = C648 + 'wix-full-v1/';
  var WARM_PAGE = {
    '/': [
      F97 + 'wix-home-v656/n1-site-wix-v656.js',
      F97 + 'wix-home-v656/modules/n1-m5-build.js',
      F97 + 'wix-home-v656/site/n1-home-m5.css',
      F97 + 'wix-home-v656/modules/n1-video-m5.js',
      F97 + 'wix-home-v656/modules/n1-home-m5.js',
      F97 + 'wix-home-v656/media/ronin-m5-poster.webp',
      C648M + 'site/n1-site-base-v1.css'
    ].concat(['partners-v617', 'samurai-video-v632', 'stats-v632', 'video-band-v633', 'contact-cta-v634', 'about-v635',
      'ecosystem-v647', 'gads-v643', 'brands-v625', 'showreel-v628', 'sectors-v630'].map(function (m) { return C648M + 'modules/n1-' + m + '.css'; })),
    '/kreatif-produksiyon': [SW + 'wix-kreatif-produksiyon-v23/n1-kreatif-produksiyon-v23.js'],
    '/e-ticaret-yonetimi': [SW + 'wix-e-ticaret-yonetimi-v23/n1-e-ticaret-yonetimi-v23.js'],
    '/sosyal-medya': [SW + 'wix-sosyal-medya-v27/n1-sosyal-medya-v27.js'],
    '/reklam-yonetimi': [SW + 'wix-reklam-yonetimi-v23/n1-reklam-yonetimi-v23.js'],
    '/ui-ux-tasarim': [SW + 'wix-uiux-tasarim-v28/n1-uiux-tasarim-v28.js'],
    '/yapay-zeka': [SW + 'wix-yapay-zeka-v2/n1-yapay-zeka-v2.js'],
    '/uygulama-gelistirme': [SW + 'wix-uygulama-gelistirme-v2/n1-uygulama-gelistirme-v2.js'],
    '/markalar': [SW + 'wix-markalar-v1/n1-markalar-v11.js'],
    '/kisaca-biz': [SW + 'wix-kisaca-biz-v1/n1-kisaca-biz-v1.js']
  };

  function mobile() { try { return matchMedia(MOBILE_MQ).matches; } catch (e) { return false; } }
  function now() { return Math.round((window.performance && performance.now) ? performance.now() : Date.now()); }
  function path() { return (location.pathname.replace(/\/+$/, '') || '/').toLowerCase(); }

  var stats = { released: 0, restored: 0, resumed: 0, farReleased: 0, playIntercepts: 0, warmed: 0 };
  var log = [];
  function note(s) {
    var line = path() + ' ' + s + ' @' + now();
    log.push(line); if (log.length > 40) log.shift();
    try {
      var a = JSON.parse(sessionStorage.getItem(LOG_KEY) || '[]'); a.push(line); if (a.length > 60) a = a.slice(-60);
      sessionStorage.setItem(LOG_KEY, JSON.stringify(a));
    } catch (e) {}
    if (diag) diag.render();
  }

  /* ---------- 1N bileşenine ait videolar ---------- */
  function owned(v) {
    for (var e = v.parentElement; e; e = e.parentElement) { if (e.tagName && e.tagName.lastIndexOf('N1-', 0) === 0) return true; }
    return false;
  }
  function ourVideos() { return [].filter.call(document.getElementsByTagName('video'), owned); }
  function ratio(el) {
    if (!el.isConnected) return 0;
    var r = el.getBoundingClientRect(); if (!r.width || !r.height) return 0;
    var w = Math.max(0, Math.min(innerWidth, r.right) - Math.max(0, r.left)), h = Math.max(0, Math.min(innerHeight, r.bottom) - Math.max(0, r.top));
    return (w * h) / (r.width * r.height);
  }

  var nativePlay = HTMLMediaElement.prototype.play;

  function release(v, why) {
    if (v.__n1rel) return false;
    var src = v.getAttribute('src');
    if (!src) return false;                     // kaynak atanmamış ya da <source> kullanıyor: dokunulmaz
    v.__n1rel = { src: src, t: v.currentTime || 0, playing: !v.paused && !v.ended, why: why };
    try { if (!v.paused) v.pause(); } catch (e) {}
    v.removeAttribute('src');
    try { v.load(); } catch (e) {}              // çözücü ve tampon serbest kalır
    // Bileşen bu sırada play() çağırırsa: önce kaynak geri, sonra özgün play (mantık değişmez)
    v.play = function () { stats.playIntercepts++; restore(v, 'play'); return nativePlay.apply(v, arguments); };
    stats.released++; if (why === 'far') stats.farReleased++;
    return true;
  }

  function restore(v, why) {
    var st = v.__n1rel; if (!st) return null;
    v.__n1rel = null;
    try { delete v.play; } catch (e) { v.play = nativePlay; }
    if (st.t > 0.05) {
      var seek = function () {
        v.removeEventListener('loadedmetadata', seek);
        try { if (v.currentTime < 0.05 && isFinite(v.duration) && st.t < v.duration) v.currentTime = st.t; } catch (e) {}
      };
      v.addEventListener('loadedmetadata', seek);
    }
    v.setAttribute('src', st.src);               // kaynak seçimi preload özniteliğine göre yeniden başlar
    stats.restored++;
    return st;
  }

  /* ---------- 1–2 · sayfadan ayrılma / BFCache dönüşü ---------- */
  function onPageHide(e) {
    if (!mobile()) return;
    var n = 0;
    ourVideos().forEach(function (v) { if (release(v, 'pagehide')) n++; });
    note('pagehide persisted=' + !!(e && e.persisted) + ' released=' + n);
  }
  function onPageShow(e) {
    var nav = (performance.getEntriesByType && performance.getEntriesByType('navigation')[0] || {}).type || '';
    if (!e || !e.persisted) { note('pageshow persisted=false nav=' + nav); return; }
    var n = 0, r = 0;
    ourVideos().forEach(function (v) {
      var st = v.__n1rel; if (!st || st.why !== 'pagehide') return;
      if (ratio(v) <= 0 && !nearViewport(v)) { st.why = 'far'; return; }      // ekrandan uzak: yaklaşınca yüklenir
      restore(v, 'pageshow'); r++;
      if (st.playing && !document.hidden && ratio(v) >= 0.08) {
        v.muted = true; v.playsInline = true;
        var p; try { p = v.play(); } catch (err) {}
        if (p && p.catch) p.catch(function () {});
        n++; stats.resumed++;
      }
    });
    note('pageshow persisted=true restored=' + r + ' resumed=' + n);
    rescanFar();
  }

  /* ---------- 3 · ekranın çok dışında bekleyen videolar ---------- */
  var farIO = null, farTimers = new Map(), watched = new WeakSet();
  function nearViewport(v) {
    var r = v.getBoundingClientRect(), m = innerHeight * 1.5;
    return r.bottom > -m && r.top < innerHeight + m;
  }
  function onFar(entries) {
    entries.forEach(function (en) {
      var v = en.target;
      if (en.isIntersecting) {
        clearTimeout(farTimers.get(v)); farTimers.delete(v);
        if (v.__n1rel && v.__n1rel.why === 'far') { restore(v, 'near'); }
        return;
      }
      if (farTimers.has(v)) return;
      farTimers.set(v, setTimeout(function () {
        farTimers.delete(v);
        if (!mobile() || document.hidden || !v.isConnected || nearViewport(v)) return;
        if (!v.paused) return;                   // oynayan videoya dokunulmaz (karar bileşenindir)
        release(v, 'far');
      }, FAR_DELAY));
    });
  }
  function watch(v) {
    if (watched.has(v) || !owned(v)) return;
    watched.add(v); if (farIO) farIO.observe(v);
  }
  function rescanFar() { [].forEach.call(document.getElementsByTagName('video'), watch); }

  /* ---------- 4 · ortak dosyaları önbelleğe ısıtma ---------- */
  function warm() {
    if (!window.fetch || (navigator.connection && navigator.connection.saveData)) return;
    var p = path();
    var list = (WARM_PAGE[p] || []).concat(WARM, p === '/' ? [] : WARM_INNER);   // sayfanın kendi betiği önce
    list.forEach(function (u) {
      try {
        var o = { mode: 'no-cors', credentials: 'include' };
        try { o.priority = 'low'; } catch (e) {}
        fetch(u, o).then(function () { stats.warmed++; }, function () {});
      } catch (e) {}
    });
  }

  /* ---------- 5 · tanılama ---------- */
  var diag = null;
  function setupDiag() {
    if (!/[?&]n1diag=1\b/.test(location.search)) return;
    var box = document.createElement('pre');
    box.setAttribute('aria-hidden', 'true');
    box.style.cssText = 'position:fixed;left:6px;bottom:6px;z-index:2147483646;max-width:70vw;max-height:40vh;overflow:auto;margin:0;padding:6px 8px;font:10px/1.35 ui-monospace,Menlo,monospace;color:#d8ffb0;background:rgba(0,0,0,.78);border-radius:6px;pointer-events:none;white-space:pre-wrap';
    diag = { render: function () {
      var all = []; try { all = JSON.parse(sessionStorage.getItem(LOG_KEY) || '[]'); } catch (e) {}
      var vids = ourVideos();
      box.textContent = 'n1-stability ' + VERSION + ' · mobil=' + mobile() + '\n' +
        'video=' + vids.length + ' src=' + vids.filter(function (v) { return v.getAttribute('src'); }).length +
        ' oynayan=' + vids.filter(function (v) { return !v.paused; }).length + ' bırakılan=' + vids.filter(function (v) { return v.__n1rel; }).length + '\n' +
        JSON.stringify(stats) + '\n' + all.slice(-14).join('\n');
    } };
    (document.body || document.documentElement).appendChild(box);
    diag.render(); setInterval(diag.render, 2000);
  }

  /* ---------- kurulum ---------- */
  window.addEventListener('pagehide', onPageHide, true);
  window.addEventListener('pageshow', onPageShow, true);   // capture: bileşenlerin pageshow işleyicilerinden ÖNCE kaynak geri gelir

  function start() {
    if (!mobile()) { note('desktop: pasif'); return; }
    if ('IntersectionObserver' in window) {
      farIO = new IntersectionObserver(onFar, { rootMargin: FAR_MARGIN, threshold: 0 });
      rescanFar();
      // Videolar bileşenler kurulunca eklenir: yalnızca <video> eklenmesini izleyen hafif bir gözlemci
      var mo = new MutationObserver(function (list) {
        for (var i = 0; i < list.length; i++) {
          var add = list[i].addedNodes;
          for (var k = 0; k < add.length; k++) {
            var n = add[k]; if (n.nodeType !== 1) continue;
            if (n.tagName === 'VIDEO') watch(n);
            else if (n.getElementsByTagName) { var vs = n.getElementsByTagName('video'); for (var j = 0; j < vs.length; j++) watch(vs[j]); }
          }
        }
      });
      mo.observe(document.documentElement, { childList: true, subtree: true });
      // Sayfa kurulumu bittikten sonra gözlemciye gerek kalmaz (yeni video eklenmez); 60 sn sonra kapatılır
      setTimeout(function () { mo.disconnect(); rescanFar(); }, 60000);
    }
    warm();
    setupDiag();
    note('start nav=' + ((performance.getEntriesByType && performance.getEntriesByType('navigation')[0] || {}).type || ''));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true }); else start();

  window.__n1Stability = {
    version: VERSION,
    stats: stats,
    report: function () {
      var vids = ourVideos();
      return { version: VERSION, mobile: mobile(), stats: Object.assign({}, stats), videos: vids.length,
        withSrc: vids.filter(function (v) { return v.getAttribute('src'); }).length,
        released: vids.filter(function (v) { return v.__n1rel; }).length,
        playing: vids.filter(function (v) { return !v.paused; }).length, log: log.slice() };
    }
  };
})();
