(function(){if(window.top!==window)return;function go(){var st=document.createElement('style');st.textContent="\n@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap');\n\n/* 1N DIGITAL MEDIA \u2014 GLOBAL LOADER V1.3 (V1 tasar\u0131m\u0131 birebir; yaln\u0131z View Transition katman\u0131 ve durum y\u00f6netimi) */\n\n#n1GlobalLoader {\n  position: fixed !important;\n  inset: 0 !important;\n  z-index: 2147483647 !important;\n  display: flex !important;\n  align-items: center !important;\n  justify-content: center !important;\n  overflow: hidden !important;\n  background: #080A09 !important;\n  opacity: 1;\n  pointer-events: all;\n  transition: opacity .5s ease;\n}\n\n#n1GlobalLoader,\n#n1GlobalLoader * {\n  box-sizing: border-box;\n}\n\n#n1GlobalLoader .n1-loader-counter {\n  display: flex !important;\n  align-items: baseline !important;\n  justify-content: center !important;\n  font-family: 'Montserrat', Arial, sans-serif !important;\n  font-size: 210px !important;\n  font-weight: 900 !important;\n  line-height: 1 !important;\n  letter-spacing: -.09em !important;\n  white-space: nowrap !important;\n  font-variant-numeric: tabular-nums !important;\n  font-feature-settings: \"tnum\" 1 !important;\n  font-synthesis: none !important;\n  transform: none !important;\n  transition: none !important;\n  animation: none !important;\n}\n\n#n1GlobalLoader .n1-loader-percent {\n  display: inline-block;\n  flex-shrink: 0;\n  margin-right: -.045em;\n  color: #A1FF00 !important;\n}\n\n#n1GlobalLoader .n1-loader-digits {\n  display: inline-block !important;\n  flex-shrink: 0 !important;\n  width: 2ch !important;\n  color: #EEEDE8 !important;\n  text-align: left !important;\n  font-family: inherit !important;\n  font-weight: 900 !important;\n  letter-spacing: -.12em !important;\n  font-variant-numeric: tabular-nums !important;\n  font-feature-settings: \"tnum\" 1 !important;\n  transform: none !important;\n  transition: none !important;\n  animation: none !important;\n}\n\n/* TABLET */\n@media (min-width: 768px) and (max-width: 1024px) {\n  #n1GlobalLoader .n1-loader-counter {\n    font-size: 145px !important;\n  }\n}\n\n/* MOB\u0130L */\n@media (min-width: 361px) and (max-width: 767px) {\n  #n1GlobalLoader .n1-loader-counter {\n    font-size: 93px !important;\n  }\n}\n\n/* K\u00dc\u00c7\u00dcK MOB\u0130L */\n@media (max-width: 360px) {\n  #n1GlobalLoader .n1-loader-counter {\n    font-size: 82px !important;\n  }\n}\n\n/* KAPANI\u015e */\n#n1GlobalLoader.n1-loader-close {\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  #n1GlobalLoader {\n    transition: none !important;\n  }\n}\n\n/* V1.3 \u2014 Wix sayfa ge\u00e7i\u015fi (View Transition, OutIn) loader'\u0131n \u00dcST\u00dcNE yeni sayfa i\u00e7eri\u011fini \u00e7iziyordu (flicker).\n   Loader kendi ge\u00e7i\u015f grubuna al\u0131n\u0131r: ge\u00e7i\u015f katman\u0131nda sayfa i\u00e7eri\u011finin \u00fcst\u00fcnde ve animasyonsuz kal\u0131r. */\n#n1GlobalLoader {\n  view-transition-name: n1-global-loader;\n}\n::view-transition-group(n1-global-loader),\n::view-transition-old(n1-global-loader),\n::view-transition-new(n1-global-loader) {\n  animation: none !important;\n}\n::view-transition-group(n1-global-loader) {\n  z-index: 2147483647;\n}\n";document.documentElement.appendChild(st);
/* 1N DIGITAL MEDIA — GLOBAL LOADER V1.3
 * V1 → V1.3 (LOADER_FIX_REPORT.md):
 *  - Flicker: loader View Transition'da kendi grubunda (CSS yukarıda); Wix geçişi iptal edilmez.
 *  - Ana sayfa ('/') eklendi: içerik kurulup header ve Ronin ilk karesi (ya da poster/engellenme/hata) hazır olunca kapanır.
 *  - 500 ms'lik süresiz setInterval kaldırıldı (Wix geçişleri tam sayfa); popstate + pageshow yeterli.
 *  - BFCache: sayfadan ayrılırken yarım kalan loader, geri dönüşte (pageshow persisted) hemen kaldırılır.
 *  - Güvenlik: 12 sn mutlak üst sınır korunur; ana sayfada ek 8 sn içerik sınırı.
 *  - Test: yalnız test anahtarı açıkken sessionStorage 'n1t-loader'='off' loader'ı devre dışı bırakır (normal ziyaretçi: yalnızca okuma).
 */
(function () {
  'use strict';

  if (window.__n1GlobalLoaderInstalled) return;
  window.__n1GlobalLoaderInstalled = '1.3';

  try { if (sessionStorage.getItem('n1t-loader') === 'off') { window.__n1GlobalLoaderInstalled = '1.3-off'; return; } } catch (e) {}

  /* YÜKLEME EKRANI GÖSTERİLECEK SAYFALAR */
  const ROUTES = new Set([
    '/',

    '/studyo-hikayesi',
    '/yaratici-bakisimiz',
    '/calisma-ritmimiz',

    '/kreatif-studyo',
    '/marka-deneyimi',
    '/dijital-performans',
    '/sosyal-medya-icerik',
    '/web-e-ticaret',
    '/yapay-zeka-inovasyon',

    '/secili-isler',
    '/marka-hikayeleri',
    '/creative-showcase',

    '/reklam-ajansi',
    '/workshops',
    '/icgoruler',

    '/iletisim',
    '/teklif-al',

    '/ekibimize-katil',
    '/acik-pozisyonlar',

    '/kreatif-produksiyon',
    '/e-ticaret-yonetimi',
    '/sosyal-medya',
    '/reklam-yonetimi',
    '/ui-ux-tasarim',
    '/yapay-zeka',
    '/uygulama-gelistirme',

    '/markalar',
    '/kisaca-biz',

    '/gizlilik',
    '/gizlilik-politikasi',
    '/kvkk-aydinlatma-metni',
    '/cerez-politikasi',
    '/kullanim-kosullari',
    '/veri-sahibi-basvuru-formu'
  ]);

  const normalizePath = () =>
    (window.location.pathname.replace(/\/+$/, '') || '/')
      .toLowerCase();

  /* Ana sayfa: n1-site-v1 kuruldu + header logosu var + Ronin hazır (mobil film ilk kare / poster / engellenme / hata;
     masaüstü ronin-hero-v67 öğesi). Video tamamen inmeden kapanır. */
  function homeReady(sinceMs) {
    const site = document.querySelector('n1-site-v1');
    if (!site || !site.firstElementChild) return false;
    if (!document.querySelector('n1-header .n1h-logo')) return false;
    const film = document.querySelector('[data-m4-film]');
    if (film) {
      const s = film.getAttribute('data-n1v-state') || '';
      return film.classList.contains('is-ready') || /^(blocked|poster|error|user|done)$/.test(s) || sinceMs > 8000;
    }
    return !!document.querySelector('ronin-hero-v67') || sinceMs > 8000;
  }

  function pageReady(path, sinceMs) {
    if (document.readyState === 'loading') {
      return false;
    }

    if (path === '/') return homeReady(sinceMs);

    /* STÜDYO HİKÂYESİ */
    if (path === '/studyo-hikayesi') {
      const page = document.querySelector('n1-studyo-v1');

      return !!(
        page &&
        page.querySelector('main.st') &&
        page.querySelector('footer.n1ft') &&
        page.querySelector('n1-header .n1h-logo') &&
        page.querySelector('n1-floating-controls') &&
        customElements.get('n1-floating-controls')
      );
    }

    /* YARATICI BAKIŞIMIZ */
    if (path === '/yaratici-bakisimiz') {
      const page = document.querySelector('n1-yaratici-v1');
      const narrow = window.matchMedia(
        '(max-width:1024px)'
      ).matches;

      return !!(
        page &&
        page.querySelector('main.n1v#n1v-main') &&
        page.querySelector('footer.n1ft') &&
        page.querySelector('n1-header .n1h-logo') &&
        page.querySelector('n1-floating-controls') &&
        customElements.get('n1-floating-controls') &&
        (
          !narrow ||
          document.getElementById('n1v-mobile-controls')
        )
      );
    }

    /* DİĞER WIX SAYFALARI */
    return !!(
      document.body &&
      document.querySelector(
        '#SITE_CONTAINER, main, [role="main"]'
      )
    );
  }

  let active = null;
  let lastPath = null;

  function createLoader(path) {
    const loader = document.createElement('div');

    loader.id = 'n1GlobalLoader';
    loader.setAttribute('role', 'status');
    loader.setAttribute('aria-label', 'Sayfa yükleniyor');

    loader.innerHTML = `
      <div class="n1-loader-counter" aria-hidden="true">
        <span class="n1-loader-percent">%</span>
        <span class="n1-loader-digits">01</span>
      </div>
    `;

    (document.body || document.documentElement)
      .appendChild(loader);

    const digits = loader.querySelector(
      '.n1-loader-digits'
    );

    const started = Date.now();
    let progress = 1;
    let done = false;
    let forced = false;
    let fadeTimer = 0;
    let removeTimer = 0;

    function finish() {
      if (done) return;

      done = true;
      clearInterval(timer);
      clearTimeout(safety);

      digits.textContent = '99';

      fadeTimer = setTimeout(function () {
        loader.classList.add('n1-loader-close');
      }, 120);

      removeTimer = setTimeout(function () {
        loader.remove();
        if (active && active.el === loader) active = null;
      }, 700);
    }

    const timer = setInterval(function () {
      if (done) return;

      if (
        progress < 94 ||
        forced ||
        pageReady(path, Date.now() - started)
      ) {
        progress = Math.min(progress + 1, 99);
      }

      digits.textContent = String(progress)
        .padStart(2, '0');

      if (progress === 99) {
        finish();
      }
    }, 24);

    /* 12 SANİYELİK GÜVENLİK SINIRI */
    const safety = setTimeout(function () {
      forced = true;
    }, 12000);

    return {
      el: loader,
      destroy() {
        done = true;
        clearInterval(timer);
        clearTimeout(safety);
        clearTimeout(fadeTimer);
        clearTimeout(removeTimer);
        loader.remove();
      }
    };
  }

  function checkRoute(force) {
    const path = normalizePath();

    if (!force && path === lastPath) return;

    if (active) {
      active.destroy();
      active = null;
    }

    lastPath = path;

    if (ROUTES.has(path)) {
      active = createLoader(path);
    }
  }

  /* İLK AÇILIŞ */
  checkRoute();

  /* TARAYICI GERİ / İLERİ (aynı belge içi geçmiş değişimi) */
  window.addEventListener('popstate', function () { checkRoute(false); });

  /* BFCache dönüşü: ayrılırken yarım kalmış loader eski durumuyla geri gelmesin */
  window.addEventListener('pageshow', function (e) {
    if (!e.persisted) return;
    if (active) { active.destroy(); active = null; }
    const stale = document.getElementById('n1GlobalLoader');
    if (stale) stale.remove();
    lastPath = normalizePath();
  });
})();
}
if(document.documentElement)go();else{var mo=new MutationObserver(function(){if(document.documentElement){mo.disconnect();go();}});mo.observe(document,{childList:true});}})();