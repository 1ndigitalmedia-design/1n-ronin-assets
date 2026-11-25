/*!
 * n1-markalar-v1 — 1N Digital Media · Markalar (/markalar)
 * Wix Studio Custom Element · Tag name: n1-markalar-v1 · Kaynak: bu dosyanın HTTPS adresi
 * Veri: n1-markalar-data-v1.js (aynı klasör; Excel'den üretilir). Marka adları, sektörler ve sıralama yalnızca bu dosyadan okunur;
 * toplam, öne çıkan ve sektör sayıları sayfada hesaplanır. Logo ve proje bağlantısı doğrulanmadıkça boş kalır.
 *
 * Bölümler
 *  01 Hero          Tipografik giriş; marka ve sektör sayıları veriden hesaplanır.
 *  02 Öne çıkan     Excel'deki öncelikli grup, Sıra No ile; editoryal dizin.
 *  03 Sektörler     Kalan kayıtlar Excel'deki sektörlere göre; arama + sektör filtresi (GSAP Flip ile yeniden yerleşim).
 *  04 CTA           Sıradaki marka; /iletisim.
 *
 * Mimari: Light DOM, sınıf öneki mk-. Onaylı v6.48 Header + menü, Footer, WhatsApp / Yukarı Çık modülleri commit'e sabit
 * adreslerden aynen yüklenir; sayfada başka bir Header / Footer / kontrol katmanı varsa ikincisi oluşturulmaz.
 * GSAP 3.13.0 + ScrollTrigger (+ Flip) yalnızca sayfada yoksa yüklenir. Pin, spacer, scroll-jacking yok.
 * İçerik CSS'te gizlenmez: GSAP yüklenemezse ya da hareket azaltma açıksa sayfa son hâliyle görünür; arama ve filtre çalışır.
 *
 * İsteğe bağlı öznitelikler: data-src="<veri dosyası adresi>" (varsayılan: bu dosyanın yanındaki n1-markalar-data-v1.js),
 *   deps-base="<klasör>/" (yalnızca Wix dışı önizleme için)
 */
(function () {
  'use strict';
  var TAG = 'n1-markalar-v1';
  var STYLE_ID = 'n1-mk1-style';
  if (customElements.get(TAG)) return;
  var SELF_SRC = (document.currentScript && document.currentScript.src) || '';
  var DATA_FILE = 'n1-markalar-data-v1.js';
  /* ---------- Onaylı kaynaklar (commit'e sabit) ---------- */
  var CDN = 'https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@';
  var C648 = 'd24fa373d6d76c0218b3f3b77897a8c2ace04e5e';
  var CRESP = '09612df97e85978976d13edbd79dad0adcc1d1f1';
  var PATHS = {
    markup: C648 + '/wix-home-v648/site/n1-site-markup-v648.js',
    header: C648 + '/wix-home-v648/modules/n1-header-v648.js',
    footerJs: C648 + '/wix-full-v1/modules/n1-footer-v646.js',
    footerCss: C648 + '/wix-full-v1/modules/n1-footer-v636.css',
    links: C648 + '/wix-full-v1/modules/n1-links-v646.js',
    floating: C648 + '/wix-full-v1/modules/n1-floating-controls-v632.js',
    responsive: CRESP + '/wix-studyo-v1/site/n1-inner-responsive-v6.css',
    assets: C648 + '/wix-full-v1/aktarim-medya/'
  };
  var FONTS = 'https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@400;500;600;700&display=swap';
  var GSAP = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js';
  var FLIP = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/Flip.min.js';
  var ST = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js';
  var PARTNER_ART = {
    tablet: 'https://static.wixstatic.com/media/6dbf5e_800ff5a00ba244f9bb31761a6b2d713d~mv2.png',
    mobile: 'https://static.wixstatic.com/media/6dbf5e_32b849155e954320a1f6479f27fd6ad2~mv2.png'
  };

  /* ---------- Yardımcılar ---------- */
  function loadJs(src, ready, fresh) {
    return new Promise(function (ok, fail) {
      if (ready && ready()) return ok();
      var ex = fresh ? null : [].find.call(document.scripts, function (s) { return s.src === src; });
      if (ex) {
        if (ready && ready()) return ok();
        ex.addEventListener('load', function () { ok(); }); ex.addEventListener('error', function () { fail(new Error('JS: ' + src)); });
        if (ready) { var t0 = Date.now(); (function poll() { if (ready()) return ok(); if (Date.now() - t0 > 8000) return fail(new Error('JS zaman aşımı: ' + src)); setTimeout(poll, 50); })(); }
        return;
      }
      var s = document.createElement('script'); s.src = src; s.async = false;
      s.onload = function () { if (fresh) s.remove(); ok(); }; s.onerror = function () { s.remove(); fail(new Error('JS: ' + src)); };
      document.head.appendChild(s);
    });
  }
  function loadCss(href) {
    return new Promise(function (ok, fail) {
      if ([].some.call(document.querySelectorAll('link[rel="stylesheet"]'), function (l) { return l.href === href; })) return ok();
      var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = href;
      l.onload = function () { ok(); }; l.onerror = function () { fail(new Error('CSS: ' + href)); };
      document.head.appendChild(l);
    });
  }
  /* ---------- Metinler (brief'teki sabit metinler) ---------- */
  var TXT = {
    heroLede: 'Farklı sektörlerden markalarla yaratıcı fikirleri, stratejiyi, tasarımı ve teknolojiyi bir araya getiriyoruz. Her projeyi yeni bir deneyim, her iş birliğini kalıcı değer üretmek için bir fırsat olarak görüyoruz.',
    featNote: 'Excel listesindeki öncelikli ulusal ve uluslararası kayıtlar, öncelik sırasıyla. Liste hem markaları hem de bu markalar için üretilen seçili projeleri içerir.',
    indNote: 'Portföyün geri kalanı, listede belirtilen sektörlere göre. Arayın ya da bir sektör seçin.',
    empty: 'Aramanıza uygun marka veya proje bulunamadı.',
    ctaLede: 'Markanız için yaratıcı, stratejik ve teknoloji odaklı çözümleri birlikte geliştirelim.',
    cta: 'BİRLİKTE ÇALIŞALIM', ctaHref: '/iletisim'
  };

  /* ---------- Yardımcılar ---------- */
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  var TRMAP = { 'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u', 'â': 'a', 'î': 'i', 'û': 'u' };
  /* Türkçe duyarlı, büyük/küçük harf ve aksan duyarsız eşleştirme anahtarı; her karakter tek karaktere eşlenir (vurgu için konum korunur) */
  function norm(s) {
    var out = '', str = String(s || '');
    for (var i = 0; i < str.length; i++) {
      var c = str[i].toLocaleLowerCase('tr-TR');
      c = TRMAP[c] || c;
      c = c.normalize('NFD').replace(/[̀-ͯ]/g, '');
      out += c.length === 1 ? c : (c.charAt(0) || ' ');
    }
    return out;
  }
  function slug(s) { return norm(s).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function ln(t, cls) { return '<span class="mk-ln' + (cls ? ' ' + cls : '') + '"><span>' + t + '</span></span>'; }
  var I = {
    arrow: '<svg class="mk-ico" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h13M13 6l6 6-6 6"/></svg>',
    out: '<svg class="mk-ico" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M8 16L16 8M9 8h7v7"/></svg>',
    search: '<svg class="mk-ico" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true" focusable="false"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L20 20"/></svg>',
    x: '<svg class="mk-ico" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    chev: '<svg class="mk-ico" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M6 9l6 6 6-6"/></svg>'
  };

  /* ---------- Veri modeli: Excel sırası korunur; sayılar buradan hesaplanır ---------- */
  function model(raw) {
    var list = (raw && raw.brands || []).filter(function (b) { return b && b.name; }).slice().sort(function (a, b) { return a.order - b.order; });
    list.forEach(function (b) { b._n = norm(b.name); b._s = slug(b.sector); if (!b.id) b.id = slug(b.name) + '-' + b.order; });
    var featured = list.filter(function (b) { return b.featured; });
    var rest = list.filter(function (b) { return !b.featured; });
    var allSectors = [], groups = [], gmap = {};
    list.forEach(function (b) { if (allSectors.indexOf(b.sector) < 0) allSectors.push(b.sector); });
    rest.forEach(function (b) { if (!gmap[b._s]) { gmap[b._s] = { name: b.sector, slug: b._s, items: [] }; groups.push(gmap[b._s]); } gmap[b._s].items.push(b); });
    return { list: list, featured: featured, rest: rest, sectors: allSectors, groups: groups };
  }

  function nameHtml(b) {
    var n = '<span class="mk-nm" data-raw="' + esc(b.name) + '">' + esc(b.name) + '</span>';
    return b.projectUrl ? '<a class="mk-link" href="' + esc(b.projectUrl) + '">' + n + I.out + '</a>' : n;
  }
  function featItem(b, i) {
    var logo = b.logo ? '<span class="mk-f__logo' + (b.logoMono ? ' is-mono' : '') + '"><img src="' + esc(b.logo) + '" alt="' + esc(b.logoAlt || b.name) + '" loading="lazy" decoding="async"></span>' : '';
    return '<li class="mk-f' + (b.logo ? ' has-logo' : '') + '" data-id="' + esc(b.id) + '">' +
      '<span class="mk-f__n" aria-hidden="true">' + pad(i + 1) + '</span>' + logo +
      '<span class="mk-f__name' + (b.logo ? ' mk-sr' : '') + '">' + nameHtml(b) + '</span>' +
      '<span class="mk-f__sec">' + esc(b.sector) + '</span></li>';
  }
  function nameItem(b) { return '<li class="mk-name" data-id="' + esc(b.id) + '">' + nameHtml(b) + '</li>'; }

  function markup(M) {
    var total = M.list.length, sec = M.sectors.length;
    var hero = '<section class="mk-hero" aria-labelledby="mk-h1"><div class="mk-wrap">' +
      '<p class="mk-label"><span>MARKALAR</span><span class="mk-slash" aria-hidden="true">/</span><span lang="en">BRANDS</span></p>' +
      '<h1 class="mk-h1" id="mk-h1">' + ln('BİRLİKTE DEĞER') + ' ' + ln('ÜRETİYORUZ<span class="mk-dot">.</span>') + '</h1>' +
      '<div class="mk-hero__foot"><p class="mk-lede">' + TXT.heroLede + '</p>' +
      '<div class="mk-stats">' +
        '<p class="mk-stat"><span class="mk-stat__rule" aria-hidden="true"></span><span class="mk-num" data-to="' + total + '" aria-hidden="true">' + total + '</span><span class="mk-sr">' + total + ' </span><span class="mk-stat__l">MARKA VE PROJE</span></p>' +
        '<p class="mk-stat"><span class="mk-stat__rule" aria-hidden="true"></span><span class="mk-num" data-to="' + sec + '" aria-hidden="true">' + sec + '</span><span class="mk-sr">' + sec + ' </span><span class="mk-stat__l">FARKLI SEKTÖR</span></p>' +
      '</div></div></div></section>';

    var feat = '<section class="mk-sec mk-feat" aria-labelledby="mk-feat-h"><div class="mk-wrap">' +
      '<div class="mk-head"><p class="mk-label" lang="en">SELECTED BRANDS &amp; PROJECTS</p>' +
      '<h2 class="mk-h2" id="mk-feat-h">' + ln('ÖNE ÇIKAN') + ' ' + ln('MARKALAR') + '</h2>' +
      '<p class="mk-note"><span class="mk-note__n">' + M.featured.length + ' kayıt.</span> ' + TXT.featNote + '</p></div>' +
      '<ol class="mk-grid">' + M.featured.map(featItem).join('') + '</ol></div></section>';

    var chips = '<button type="button" class="mk-chip" data-sec="" aria-pressed="true">TÜM SEKTÖRLER<span class="mk-chip__c">' + M.rest.length + '</span></button>' +
      M.groups.map(function (g) { return '<button type="button" class="mk-chip" data-sec="' + g.slug + '" aria-pressed="false">' + esc(g.name) + '<span class="mk-chip__c">' + g.items.length + '</span></button>'; }).join('');
    var opts = '<option value="">TÜM SEKTÖRLER (' + M.rest.length + ')</option>' + M.groups.map(function (g) { return '<option value="' + g.slug + '">' + esc(g.name) + ' (' + g.items.length + ')</option>'; }).join('');
    var rows = '<div class="mk-row mk-row--feat" data-sec="__feat" hidden><div class="mk-row__head"><h3 class="mk-row__t">Öne çıkan markalarda</h3><p class="mk-row__c"><span data-c>0</span> sonuç</p></div><ul class="mk-names">' +
      M.featured.map(nameItem).join('') + '</ul></div>' +
      M.groups.map(function (g) {
        return '<div class="mk-row" data-sec="' + g.slug + '"><div class="mk-row__head"><h3 class="mk-row__t">' + esc(g.name) + '</h3><p class="mk-row__c"><span data-c>' + g.items.length + '</span> marka ve proje</p></div>' +
          '<ul class="mk-names">' + g.items.map(nameItem).join('') + '</ul></div>';
      }).join('');
    var ind = '<section class="mk-sec mk-ind" aria-labelledby="mk-ind-h"><div class="mk-wrap">' +
      '<div class="mk-head"><p class="mk-label" lang="en">INDUSTRIES &amp; BRANDS</p>' +
      '<h2 class="mk-h2" id="mk-ind-h">' + ln('FARKLI SEKTÖRLER.') + ' ' + ln('ORTAK VİZYON.') + '</h2>' +
      '<p class="mk-note">' + TXT.indNote + '</p></div>' +
      '<div class="mk-tools" role="search" aria-label="Markalar ve projelerde ara">' +
        '<div class="mk-search">' + I.search + '<label class="mk-sr" for="mk-q">Marka veya proje ara</label>' +
          '<input class="mk-q" id="mk-q" type="search" placeholder="Marka veya proje ara..." autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="search" aria-describedby="mk-count">' +
          '<button type="button" class="mk-clear" aria-label="Aramayı temizle" hidden>' + I.x + '</button></div>' +
        '<div class="mk-filter" role="group" aria-label="Sektöre göre filtrele">' + chips + '</div>' +
        '<div class="mk-select"><label class="mk-select__l" for="mk-sel">Sektör</label><div class="mk-select__box"><select id="mk-sel" class="mk-sel">' + opts + '</select>' + I.chev + '</div></div>' +
        '<p class="mk-count" id="mk-count" role="status" aria-live="polite" aria-atomic="true"></p>' +
      '</div>' +
      '<div class="mk-results">' + rows + '<p class="mk-empty" hidden>' + TXT.empty + '</p></div>' +
      '</div></section>';

    var cta = '<section class="mk-sec mk-cta" aria-labelledby="mk-cta-h"><div class="mk-wrap mk-cta__in">' +
      '<div class="mk-cta__main"><p class="mk-label" lang="en">NEXT COLLABORATION</p>' +
      '<h2 class="mk-cta__h" id="mk-cta-h">' + ln('SIRADAKİ MARKA') + ' ' + ln('SİZİN MARKANIZ') + ' ' + ln('OLSUN<span class="mk-dot">.</span>') + '</h2></div>' +
      '<div class="mk-cta__side"><p class="mk-cta__p">' + TXT.ctaLede + '</p>' +
      '<a class="mk-btn" href="' + TXT.ctaHref + '"><span>' + TXT.cta + '</span><span class="mk-btn__ico">' + I.arrow + '</span></a></div>' +
      '</div></section>';

    return '<main class="mk" id="mk-main">' + hero + feat + ind + cta + '</main>';
  }

  /* ---------- CSS (yalnızca n1-markalar-v1 kapsamında) ---------- */
  var CSS = "n1-markalar-v1{--bg:#080A09;--g1:#0D0F0E;--g2:#121513;--ink:#ECEBE5;--soft:#BDBCB5;--mute:#9A9B95;--dim:#6E706A;--ghost:#2B2E2B;--line:rgba(228,227,221,.12);--line2:rgba(228,227,221,.07);--acc:#A8CF62;--ease:cubic-bezier(.22,1,.36,1);\n  --hdr:88px;--gap:clamp(18px,2.2vw,40px);--secpad:clamp(100px,8.6vw,168px);display:block;position:relative;width:100%;background:var(--bg);color:var(--ink);font:400 17px/1.6 Barlow,Arial,sans-serif;-webkit-font-smoothing:antialiased;overflow-x:clip;text-align:left}\nn1-markalar-v1 *,n1-markalar-v1 *::before,n1-markalar-v1 *::after{box-sizing:border-box;min-width:0}\nn1-markalar-v1 :where(.mk) :where(p,h1,h2,h3,ul,ol,figure,figcaption){margin:0}\nn1-markalar-v1 :where(.mk) :where(ul,ol){padding:0;list-style:none}\nn1-markalar-v1 :where(.mk) :where(a){color:inherit}\nn1-markalar-v1 :where(.mk) :where(button){font:inherit;color:inherit;background:none;border:0;padding:0;margin:0;cursor:pointer;-webkit-tap-highlight-color:transparent}\nn1-markalar-v1 .mk :focus-visible{outline:2px solid var(--acc);outline-offset:3px}\nn1-markalar-v1 .mk img{display:block;max-width:none}\nn1-markalar-v1 .mk-ico{display:block;flex:none}\nn1-markalar-v1 .mk-sr{position:absolute!important;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}\nn1-markalar-v1 .mk-wrap{width:90%;margin-left:auto;margin-right:auto}\nn1-markalar-v1 .mk-sec{position:relative;padding:var(--secpad) 0;border-top:1px solid var(--line)}\nn1-markalar-v1 .mk-label{display:flex;align-items:center;gap:12px;font:500 15px/1.3 Barlow,Arial,sans-serif;color:var(--mute)}\nn1-markalar-v1 .mk-label::before{content:\"\";flex:none;width:7px;height:7px;border-radius:1px;background:var(--acc)}\nn1-markalar-v1 .mk-ln{display:block;overflow:hidden;padding:.17em 0 .09em;margin:-.17em 0 -.09em}\nn1-markalar-v1 .mk-ln>span{display:block}\nn1-markalar-v1 .mk-ln--acc{color:var(--acc)}\nn1-markalar-v1 .mk-chs{display:inline-block;white-space:nowrap}\nn1-markalar-v1 .mk-ch{display:inline-block;will-change:transform}\nn1-markalar-v1 .mk-sp{display:inline-block;width:.24em}\nn1-markalar-v1 .mk-h2{margin-top:clamp(26px,2.4vw,40px);font:700 clamp(60px,7.4vw,148px)/1 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:-.016em;color:var(--ink)}\nn1-markalar-v1 .mk-cap{margin-top:14px;font-size:14px;line-height:1.5;color:var(--mute)}\nn1-markalar-v1 .mk-btn{position:relative;display:inline-flex;align-items:center;justify-content:space-between;gap:22px;height:64px;padding:0 10px 0 28px;border-radius:12px;overflow:hidden;white-space:nowrap;isolation:isolate;\n  font:500 13.5px/1 Barlow,Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase;text-decoration:none;color:var(--ink);border:1px solid rgba(168,207,98,.42);background:rgba(16,19,17,.72);transition:color .45s var(--ease),border-color .45s ease;touch-action:manipulation}\nn1-markalar-v1 .mk-btn::before{content:\"\";position:absolute;inset:0;z-index:-1;background:var(--acc);transform:scaleX(0);transform-origin:0 50%;transition:transform .6s cubic-bezier(.65,0,.35,1)}\nn1-markalar-v1 .mk-btn__ico{display:grid;place-items:center;width:44px;height:44px;border-radius:8px;background:rgba(168,207,98,.12);transition:background-color .45s ease}\nn1-markalar-v1 .mk-btn--ghost{border-color:rgba(228,227,221,.22);background:rgba(8,10,9,.5)}\nn1-markalar-v1 .mk-btn--ghost .mk-btn__ico{background:rgba(236,235,229,.06)}\nn1-markalar-v1 .mk-btn:hover,n1-markalar-v1 .mk-btn:focus-visible{color:#0A0B0B;border-color:var(--acc)}\nn1-markalar-v1 .mk-btn:hover::before,n1-markalar-v1 .mk-btn:focus-visible::before{transform:scaleX(1)}\nn1-markalar-v1 .mk-btn:hover .mk-btn__ico,n1-markalar-v1 .mk-btn:focus-visible .mk-btn__ico{background:rgba(10,11,11,.12)}\n.n1h-panel[data-n1-mk],.n1h-panel[data-n1-mk] *,.n1h-panel[data-n1-mk] *::before,.n1h-panel[data-n1-mk] *::after{box-sizing:border-box}\n.n1h-panel[data-n1-mk] a.n1h-item{text-decoration:none;color:#ecebe6}\n.n1h-panel[data-n1-mk] .n1h-sub a{text-decoration:none}\n@media (max-width:1024px){.n1h-panel[data-n1-mk][data-open]::before{content:\"\";position:fixed;left:0;right:0;bottom:0;top:72px;z-index:-1;pointer-events:none;background:rgba(8,10,9,.8);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}}\n@media (max-width:767px){.n1h-panel[data-n1-mk][data-open]::before{top:64px}}\nn1-markalar-v1 .n1ft-partner-art{display:none}\nn1-markalar-v1 .mk-label{display:flex;align-items:center;gap:10px;font:500 14px/1.3 Barlow,Arial,sans-serif;letter-spacing:.12em;color:var(--mute)}\nn1-markalar-v1 .mk-label::before{content:\"\";flex:none;width:7px;height:7px;border-radius:1px;background:var(--acc)}\nn1-markalar-v1 .mk-slash{color:var(--dim)}\nn1-markalar-v1 .mk-ln{display:block;overflow:hidden;padding:.17em 0 .08em;margin:-.17em 0 -.08em}\nn1-markalar-v1 .mk-ln>span{display:block}\nn1-markalar-v1 .mk-dot{color:var(--acc)}\nn1-markalar-v1 .mk-ico{display:block;flex:none}\nn1-markalar-v1 .mk-sr{position:absolute!important;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}\nn1-markalar-v1 .mk-wrap{width:90%;max-width:1760px;margin-left:auto;margin-right:auto}\nn1-markalar-v1 .mk-sec{position:relative;padding:clamp(96px,8vw,160px) 0;border-top:1px solid var(--line)}\nn1-markalar-v1 .mk a{text-decoration:none}\nn1-markalar-v1 .mk-hero{padding:calc(var(--hdr) + clamp(64px,7.4vw,140px)) 0 clamp(64px,6vw,112px)}\nn1-markalar-v1 .mk-h1{margin-top:clamp(24px,2.2vw,38px);font:700 clamp(64px,9.4vw,188px)/.9 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:-.018em;color:var(--ink)}\nn1-markalar-v1 .mk-hero__foot{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);row-gap:44px;align-items:end;margin-top:clamp(44px,4.4vw,80px)}\nn1-markalar-v1 .mk-lede{grid-column:1/7;max-width:52ch;font-size:clamp(18px,1.3vw,21px);line-height:1.6;color:var(--soft)}\nn1-markalar-v1 .mk-stats{grid-column:8/13;display:grid;grid-template-columns:1fr 1fr;column-gap:var(--gap)}\nn1-markalar-v1 .mk-stat{position:relative;display:flex;flex-direction:column;gap:12px;padding-top:18px}\nn1-markalar-v1 .mk-stat__rule{position:absolute;left:0;right:0;top:0;height:1px;background:rgba(228,227,221,.28)}\nn1-markalar-v1 .mk-stat:first-child .mk-stat__rule{background:var(--acc)}\nn1-markalar-v1 .mk-num{font:600 clamp(64px,6.2vw,118px)/.86 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:-.02em;font-variant-numeric:tabular-nums;color:var(--ink)}\nn1-markalar-v1 .mk-stat__l{font:500 14px/1.3 Barlow,Arial,sans-serif;letter-spacing:.12em;color:var(--mute)}\nn1-markalar-v1 .mk-head{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);row-gap:22px;align-items:end;margin-bottom:clamp(48px,4.6vw,84px)}\nn1-markalar-v1 .mk-head .mk-label{grid-column:1/-1}\nn1-markalar-v1 .mk-h2{grid-column:1/8;font:700 clamp(52px,6vw,116px)/.92 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:-.014em;color:var(--ink)}\nn1-markalar-v1 .mk-note{grid-column:9/13;max-width:42ch;font-size:16.5px;line-height:1.6;color:var(--mute)}\nn1-markalar-v1 .mk-note__n{color:var(--ink);font-weight:500}\nn1-markalar-v1 .mk-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));column-gap:clamp(20px,2vw,40px);row-gap:clamp(8px,1vw,16px);counter-reset:none}\nn1-markalar-v1 .mk-f{--mk-rule:1;position:relative;display:grid;grid-template-rows:auto 1fr auto;row-gap:14px;min-height:clamp(150px,11vw,200px);padding:18px 0 22px}\nn1-markalar-v1 .mk-f::before,n1-markalar-v1 .mk-f::after{content:\"\";position:absolute;left:0;right:0;top:0;height:1px;transform-origin:0 50%}\nn1-markalar-v1 .mk-f::before{background:rgba(228,227,221,.2);transform:scaleX(var(--mk-rule))}\nn1-markalar-v1 .mk-f::after{background:var(--acc);transform:scaleX(0);transition:transform .55s var(--ease)}\nn1-markalar-v1 .mk-f__n{font:500 13.5px/1 Barlow,Arial,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:.06em;color:var(--dim);transition:color .3s ease}\nn1-markalar-v1 .mk-f__name{align-self:start;font:600 clamp(25px,2vw,38px)/1.02 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:.002em;color:var(--ink);overflow-wrap:break-word;hyphens:manual;text-wrap:balance}\nn1-markalar-v1 .mk-f__sec{font-size:14px;line-height:1.4;color:var(--mute)}\nn1-markalar-v1 .mk-f__logo{display:flex;align-items:center;height:clamp(40px,3.4vw,60px);max-width:78%}\nn1-markalar-v1 .mk-f__logo img{display:block;max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain}\nn1-markalar-v1 .mk-f__logo.is-mono img{filter:grayscale(1) brightness(1.15)}\n@media (hover:hover){\nn1-markalar-v1 .mk-f:hover::after{transform:scaleX(1)}\nn1-markalar-v1 .mk-f:hover .mk-f__n{color:var(--acc)}\n}\nn1-markalar-v1 .mk-link{display:inline-flex;align-items:baseline;gap:.3em;color:inherit}\nn1-markalar-v1 .mk-link .mk-ico{align-self:center;color:var(--acc)}\nn1-markalar-v1 .mk-link:hover .mk-nm{text-decoration:underline;text-decoration-color:var(--acc);text-underline-offset:.16em}\nn1-markalar-v1 .mk-tools{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);row-gap:22px;align-items:center;padding-bottom:clamp(30px,2.6vw,44px);border-bottom:1px solid rgba(228,227,221,.28)}\nn1-markalar-v1 .mk-search{grid-column:1/8;position:relative;display:flex;align-items:center;gap:14px;border-bottom:1px solid rgba(228,227,221,.32);transition:border-color .3s ease}\nn1-markalar-v1 .mk-search:focus-within{border-color:var(--acc)}\nn1-markalar-v1 .mk-search>.mk-ico{color:var(--mute)}\nn1-markalar-v1 .mk-q{flex:1;width:100%;height:64px;padding:0;border:0;outline:0;background:transparent;color:var(--ink);font:500 clamp(20px,1.6vw,26px)/1.2 Barlow,Arial,sans-serif;-webkit-appearance:none;appearance:none;border-radius:0}\nn1-markalar-v1 .mk-q::placeholder{color:var(--dim);opacity:1}\nn1-markalar-v1 .mk-q::-webkit-search-cancel-button{display:none}\nn1-markalar-v1 .mk-q:focus-visible{outline:none}\nn1-markalar-v1 .mk-search:has(.mk-q:focus-visible){outline:2px solid var(--acc);outline-offset:6px;border-radius:2px}\nn1-markalar-v1 .mk-clear{display:grid;place-items:center;width:44px;height:44px;border-radius:8px;color:var(--soft);transition:color .2s ease,background-color .2s ease}\nn1-markalar-v1 .mk-clear:hover{color:var(--ink);background:rgba(236,235,229,.06)}\nn1-markalar-v1 .mk-clear[hidden]{display:none}\nn1-markalar-v1 .mk-count{grid-column:9/13;justify-self:end;font-size:15px;line-height:1.45;color:var(--mute);text-align:right;min-height:1.45em}\nn1-markalar-v1 .mk-filter{grid-column:1/-1;grid-row:2;display:flex;flex-wrap:wrap;gap:8px}\nn1-markalar-v1 .mk-chip{display:inline-flex;align-items:center;gap:10px;min-height:44px;padding:0 14px;border:1px solid var(--line);border-radius:8px;font:500 14.5px/1.2 Barlow,Arial,sans-serif;color:var(--soft);transition:color .25s ease,border-color .25s ease,background-color .25s ease}\nn1-markalar-v1 .mk-chip:hover{color:var(--ink);border-color:rgba(228,227,221,.34)}\nn1-markalar-v1 .mk-chip[aria-pressed=\"true\"]{color:#0A0B0B;background:var(--ink);border-color:var(--ink)}\nn1-markalar-v1 .mk-chip__c{font-size:12.5px;font-variant-numeric:tabular-nums;color:var(--dim)}\nn1-markalar-v1 .mk-chip[aria-pressed=\"true\"] .mk-chip__c{color:#3A3D39}\nn1-markalar-v1 .mk-select{display:none}\nn1-markalar-v1 .mk-row{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);padding:clamp(34px,3vw,52px) 0;border-bottom:1px solid var(--line)}\nn1-markalar-v1 .mk-row[hidden],n1-markalar-v1 .mk-name[hidden],n1-markalar-v1 .mk-empty[hidden]{display:none}\nn1-markalar-v1 .mk-row__head{grid-column:1/5;align-self:start;position:sticky;top:calc(var(--hdr) + 24px);display:flex;flex-direction:column;gap:10px;padding-right:12px}\nn1-markalar-v1 .mk-row__t{font:600 clamp(26px,2.2vw,40px)/1.02 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:.002em;color:var(--ink)}\nn1-markalar-v1 .mk-row__c{font-size:14.5px;line-height:1.4;color:var(--mute)}\nn1-markalar-v1 .mk-row__c span{color:var(--acc);font-variant-numeric:tabular-nums;font-weight:500}\nn1-markalar-v1 .mk-row--feat .mk-row__t{color:var(--acc)}\nn1-markalar-v1 .mk-names{grid-column:5/13;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));column-gap:clamp(20px,2vw,36px);align-content:start}\nn1-markalar-v1 .mk-name{display:flex;align-items:center;min-height:54px;padding:12px 0;border-top:1px solid var(--line2);font:500 clamp(17px,1.25vw,20px)/1.35 Barlow,Arial,sans-serif;color:var(--ink);overflow-wrap:break-word}\nn1-markalar-v1 .mk-name mark,n1-markalar-v1 .mk-f mark{background:none;color:var(--acc);text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:.18em}\nn1-markalar-v1 .mk-empty{padding:56px 0 8px;font:600 clamp(22px,1.8vw,30px)/1.3 Barlow,Arial,sans-serif;color:var(--soft)}\nn1-markalar-v1 .mk-cta__in{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);row-gap:44px;align-items:end}\nn1-markalar-v1 .mk-cta__main{grid-column:1/9}\nn1-markalar-v1 .mk-cta__h{margin-top:clamp(24px,2.2vw,38px);font:700 clamp(58px,7.2vw,146px)/.92 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:-.016em;color:var(--ink)}\nn1-markalar-v1 .mk-cta__side{grid-column:9/13;display:flex;flex-direction:column;gap:28px;padding-bottom:.6vw}\nn1-markalar-v1 .mk-cta__p{max-width:36ch;font-size:clamp(18px,1.3vw,21px);line-height:1.55;color:var(--soft)}\nn1-markalar-v1 .mk-btn{position:relative;display:inline-flex;align-items:center;justify-content:space-between;gap:22px;align-self:flex-start;height:64px;padding:0 10px 0 28px;border-radius:12px;overflow:hidden;white-space:nowrap;isolation:isolate;font:500 13.5px/1 Barlow,Arial,sans-serif;letter-spacing:.16em;color:var(--ink);border:1px solid rgba(168,207,98,.42);background:rgba(16,19,17,.72);transition:color .45s var(--ease),border-color .45s ease;touch-action:manipulation}\nn1-markalar-v1 .mk-btn::before{content:\"\";position:absolute;inset:0;z-index:-1;background:var(--acc);transform:scaleX(0);transform-origin:0 50%;transition:transform .6s cubic-bezier(.65,0,.35,1)}\nn1-markalar-v1 .mk-btn__ico{display:grid;place-items:center;width:44px;height:44px;border-radius:8px;background:rgba(168,207,98,.12);transition:background-color .45s ease}\nn1-markalar-v1 .mk-btn:hover,n1-markalar-v1 .mk-btn:focus-visible{color:#0A0B0B;border-color:var(--acc)}\nn1-markalar-v1 .mk-btn:hover::before,n1-markalar-v1 .mk-btn:focus-visible::before{transform:scaleX(1)}\nn1-markalar-v1 .mk-btn:hover .mk-btn__ico,n1-markalar-v1 .mk-btn:focus-visible .mk-btn__ico{background:rgba(10,11,11,.12)}\nn1-markalar-v1 .mk-msg{padding:150px 5% 80px;color:var(--soft);font-size:17px}\n@media (min-width:1025px) and (max-width:1279px){n1-markalar-v1 .mk-grid{grid-template-columns:repeat(4,minmax(0,1fr))}}\n@media (min-width:2200px){n1-markalar-v1 .mk-grid{grid-template-columns:repeat(6,minmax(0,1fr))}}\n@media (max-width:1024px){\nn1-markalar-v1 .mk-hero{padding-top:calc(var(--hdr) + 64px)}\nn1-markalar-v1 .mk-lede{grid-column:1/-1}\nn1-markalar-v1 .mk-stats{grid-column:1/-1;max-width:640px}\nn1-markalar-v1 .mk-h2{grid-column:1/-1}\nn1-markalar-v1 .mk-note{grid-column:1/-1;max-width:60ch}\nn1-markalar-v1 .mk-grid{grid-template-columns:repeat(3,minmax(0,1fr))}\nn1-markalar-v1 .mk-f{min-height:150px}\nn1-markalar-v1 .mk-search{grid-column:1/-1}\nn1-markalar-v1 .mk-count{grid-column:1/-1;grid-row:3;justify-self:start;text-align:left}\nn1-markalar-v1 .mk-row{display:block}\nn1-markalar-v1 .mk-row__head{position:static;flex-direction:row;align-items:baseline;justify-content:space-between;gap:16px;padding-right:0;margin-bottom:18px}\nn1-markalar-v1 .mk-names{grid-template-columns:repeat(3,minmax(0,1fr))}\nn1-markalar-v1 .mk-cta__main,n1-markalar-v1 .mk-cta__side{grid-column:1/-1}\nn1-markalar-v1 n1-header{display:block!important;position:fixed!important;top:0!important;left:0!important;right:0!important;width:100%!important;min-height:0!important;height:auto!important;z-index:900!important;background:rgba(8,10,9,.95);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);border-bottom:1px solid rgba(228,227,221,.07)}\nn1-markalar-v1 n1-header .n1h-bar.site-container{display:grid!important;align-items:center!important;width:calc(100% - 48px)!important;margin-inline:auto!important;padding-inline:0!important;height:72px!important;max-width:100%!important}\nn1-markalar-v1 n1-header .n1h-logo{margin:0!important;flex:none}\nn1-markalar-v1 n1-header .n1h-logo img{width:32px!important;height:32px!important;max-width:none!important}\nn1-markalar-v1 n1-header .n1h-right{align-items:center!important}\nn1-markalar-v1 n1-header .n1h-menu{display:inline-flex!important;height:40px!important;margin:0!important}\nn1-markalar-v1 n1-header .n1h-cta{display:none!important}\nn1-markalar-v1 footer.n1ft .n1ft-partner{opacity:1!important;visibility:visible!important;transform:none!important}\n}\n@media (max-width:900px){n1-markalar-v1 .n1ft-inner{width:90%}}\n@media (max-width:767px){\nn1-markalar-v1 .mk-hero{padding-top:calc(var(--hdr) + 44px);padding-bottom:56px}\nn1-markalar-v1 .mk-label{font-size:12.5px;letter-spacing:.1em}\nn1-markalar-v1 .mk-h1{font-size:clamp(52px,15.4vw,84px);line-height:.92}\nn1-markalar-v1 .mk-lede{font-size:17px}\nn1-markalar-v1 .mk-hero__foot{row-gap:36px;margin-top:32px}\nn1-markalar-v1 .mk-num{font-size:clamp(56px,16vw,80px)}\nn1-markalar-v1 .mk-stat__l{font-size:12.5px;letter-spacing:.1em}\nn1-markalar-v1 .mk-sec{padding:72px 0}\nn1-markalar-v1 .mk-head{margin-bottom:36px}\nn1-markalar-v1 .mk-h2{font-size:clamp(44px,12.6vw,64px)}\nn1-markalar-v1 .mk-note{font-size:15.5px}\nn1-markalar-v1 .mk-grid{grid-template-columns:repeat(2,minmax(0,1fr));column-gap:16px;row-gap:4px}\nn1-markalar-v1 .mk-f{min-height:118px;row-gap:10px;padding:14px 0 18px}\nn1-markalar-v1 .mk-f__name{font-size:clamp(21px,5.8vw,26px);line-height:1.04}\nn1-markalar-v1 .mk-f__sec{font-size:13px}\nn1-markalar-v1 .mk-tools{row-gap:16px}\nn1-markalar-v1 .mk-q{height:56px;font-size:19px}\nn1-markalar-v1 .mk-filter{display:none}\nn1-markalar-v1 .mk-select{grid-column:1/-1;grid-row:2;display:flex;flex-direction:column;gap:8px}\nn1-markalar-v1 .mk-select__l{font:500 13px/1.3 Barlow,Arial,sans-serif;letter-spacing:.06em;color:var(--mute)}\nn1-markalar-v1 .mk-select__box{position:relative}\nn1-markalar-v1 .mk-sel{width:100%;height:52px;padding:0 46px 0 14px;border:1px solid rgba(228,227,221,.24);border-radius:8px;background:var(--g1);color:var(--ink);font:500 16px/1.2 Barlow,Arial,sans-serif;-webkit-appearance:none;appearance:none}\nn1-markalar-v1 .mk-sel:focus-visible{outline:2px solid var(--acc);outline-offset:2px}\nn1-markalar-v1 .mk-select__box .mk-ico{position:absolute;right:14px;top:50%;transform:translateY(-50%);color:var(--acc);pointer-events:none}\nn1-markalar-v1 .mk-count{font-size:14px}\nn1-markalar-v1 .mk-row{padding:30px 0}\nn1-markalar-v1 .mk-row__head{flex-direction:column;align-items:flex-start;gap:6px;margin-bottom:14px}\nn1-markalar-v1 .mk-row__t{font-size:clamp(25px,7vw,30px)}\nn1-markalar-v1 .mk-names{grid-template-columns:repeat(2,minmax(0,1fr));column-gap:16px}\nn1-markalar-v1 .mk-name{min-height:48px;padding:10px 0;font-size:16px}\nn1-markalar-v1 .mk-cta__h{font-size:clamp(46px,13.2vw,72px)}\nn1-markalar-v1 .mk-cta__side{gap:22px}\nn1-markalar-v1 .mk-btn{width:100%;height:56px;padding:0 7px 0 18px;font-size:13px}\nn1-markalar-v1 .mk-btn__ico{width:42px;height:42px}\nn1-markalar-v1 .mk-cta .mk-btn{font-size:13px}\nn1-markalar-v1 .mk-btn{width:100%;height:56px;padding:0 7px 0 18px;font-size:12px}\nn1-markalar-v1 .mk-btn__ico{width:42px;height:42px}\nn1-markalar-v1 n1-header .n1h-bar.site-container{width:calc(100% - 40px)!important;height:64px!important}\nn1-markalar-v1 n1-header .n1h-logo img{width:30px!important;height:30px!important}\nn1-markalar-v1 .n1ft-inner{width:calc(100% - 40px)}\nn1-markalar-v1 .n1ft-top{grid-template-columns:1fr!important;gap:32px;padding:39px 0 36px}\nn1-markalar-v1 .n1ft-col--brand{grid-column:auto}\nn1-markalar-v1 .n1ft-brand{font-size:45px}\n}\n@media (max-width:360px){n1-markalar-v1 .mk-wrap,n1-markalar-v1 .n1ft-inner{width:calc(100% - 32px)}n1-markalar-v1 n1-header .n1h-bar.site-container{width:calc(100% - 32px)!important}}\n@media (prefers-reduced-motion:reduce){n1-markalar-v1 .mk *,n1-markalar-v1 .mk *::before,n1-markalar-v1 .mk *::after{transition-duration:.01ms!important;transition-delay:0s!important;animation-duration:.01ms!important;animation-iteration-count:1!important}}";

  /* ---------- Bileşen ---------- */
  class MarkalarV1 extends HTMLElement {
    connectedCallback() {
      if (this._on) return;
      this._on = true;
      this._cleanups = [];
      var base = this.getAttribute('deps-base');
      this._url = function (k) { return (base ? base.replace(/\/?$/, '/') + 'gh@' : CDN) + PATHS[k]; };
      this.classList.add('n1-inner-page');
      this._mount().catch((e) => {
        console.error('[' + TAG + ']', e);
        if (!this.querySelector('main.mk')) this.innerHTML = '<p style="padding:40px 5%;color:#ECEBE5;font:16px Barlow,Arial,sans-serif">Markalar sayfası yüklenemedi. Lütfen sayfayı yenileyin.</p>';
      });
    }

    /* Veri dosyası: sayfada zaten varsa kullanılır; yoksa data-src veya bu dosyanın yanındaki n1-markalar-data-v1.js yüklenir */
    _data() {
      if (window.N1_MARKALAR_DATA) return Promise.resolve();
      var src = this.getAttribute('data-src') || (SELF_SRC ? SELF_SRC.replace(/[^/?#]*([?#].*)?$/, DATA_FILE) : DATA_FILE);
      return loadJs(src, function () { return !!window.N1_MARKALAR_DATA; });
    }

    _ev(el, ev, fn, opt) { if (!el) return; el.addEventListener(ev, fn, opt); this._cleanups.push(function () { el.removeEventListener(ev, fn, opt); }); }

    async _mount() {
      var self = this, url = this._url;
      if (!document.getElementById(STYLE_ID)) {
        var st = document.createElement('style'); st.id = STYLE_ID; st.textContent = CSS; document.head.appendChild(st);
      }
      await this._data();
      if (!this._on) return;
      this._M = model(window.N1_MARKALAR_DATA);
      if (!this._M.list.length) throw new Error('Marka verisi boş');
      this.innerHTML = '<div id="ust" style="height:0"></div>' + markup(this._M);
      this._filter();

      var fonts = loadCss(FONTS).catch(function (e) { console.warn('[' + TAG + '] Font yüklenemedi, yedek font kullanılıyor', e); });
      await Promise.all([loadCss(url('footerCss')), loadCss(url('responsive')), loadJs(url('markup'), function () { return !!window.N1_SITE_MARKUP; })]);
      if (!this._on) return;

      var tpl = document.createElement('template');
      tpl.innerHTML = String(window.N1_SITE_MARKUP || '').split('{{ASSETS}}').join(url('assets'));
      var hdr = tpl.content.querySelector('n1-header'), ft = tpl.content.querySelector('[data-n1-footer]'), fc = tpl.content.querySelector('n1-floating-controls');
      if (!hdr || !ft) throw new Error('Onaylı Header/Footer işaretlemesi bulunamadı');
      var main = this.querySelector('main.mk');

      var otherHeader = [].some.call(document.querySelectorAll('n1-header'), function (h) { return !self.contains(h); });
      if (!otherHeader) {
        var header = hdr.cloneNode(true);
        header.setAttribute('logo-href', '/');
        header.setAttribute('cta-href', header.getAttribute('cta-href') || '/teklif-al');
        var js = header.querySelector('script[type="application/json"]');
        if (js) {
          try {
            var menu = JSON.parse(js.textContent);
            if (menu.brand) menu.brand.href = '/';
            (menu.items || []).forEach(function (it) {
              if (it.href === '#hizmetler-ozet' || it.title === 'Hizmetler') { it.href = '/#hizmetler-ozet'; delete it.match; }
            });
            js.textContent = JSON.stringify(menu);
          } catch (e) { console.warn('[' + TAG + '] Menü verisi okunamadı; onaylı veri olduğu gibi kullanılıyor', e); }
        }
        this.insertBefore(header, main);
        this._header = header;
      }

      var otherFooter = [].some.call(document.querySelectorAll('footer.n1ft'), function (f) { return !self.contains(f); });
      if (!otherFooter) {
        var fw = document.createElement('template'); fw.innerHTML = ft.outerHTML;
        var footerRoot = fw.content.querySelector('footer.n1ft');
        var partners = footerRoot && footerRoot.querySelector('.n1ft-partners');
        if (partners) {
          var pc = document.createElement('picture'); pc.className = 'n1ft-partner-art';
          var src = document.createElement('source'); src.media = '(max-width: 767px)'; src.srcset = PARTNER_ART.mobile;
          var im = document.createElement('img'); im.src = PARTNER_ART.tablet; im.alt = '1N Digital Media iş ortakları ve sertifikalar'; im.loading = 'lazy'; im.decoding = 'async';
          im.onerror = function () { pc.classList.add('n1-art-failed'); };
          pc.append(src, im); partners.parentNode.insertBefore(pc, partners);
        }
        var copy = fw.content.querySelector('.n1ft-copy');
        if (copy) copy.textContent = copy.textContent.replace(/©\s*\d{4}/, '© ' + new Date().getFullYear());
        this.append(fw.content);
        this._footerOwned = true;
      }

      var otherFc = [].some.call(document.querySelectorAll('n1-floating-controls'), function (f) { return !self.contains(f); }) || !!document.querySelector('.n1fc:not([data-n1-mk])');
      if (fc && !otherFc) {
        var floating = fc.cloneNode(true);
        if (matchMedia('(max-width:1024px)').matches) floating.setAttribute('show-after', '0.5');
        this.append(floating);
        document.body.classList.add('n1-inner-fc-enabled');
        this._fcOwned = true;
      }

      await fonts;
      if (!window.gsap) await loadJs(GSAP, function () { return !!window.gsap; }).catch(function (e) { console.warn('[' + TAG + '] GSAP yüklenemedi; içerik animasyonsuz gösterilir', e); });
      if (window.gsap && !window.ScrollTrigger) await loadJs(ST, function () { return !!window.ScrollTrigger; }).catch(function (e) { console.warn('[' + TAG + '] ScrollTrigger yüklenemedi', e); });
      if (window.gsap && !window.Flip) await loadJs(FLIP, function () { return !!window.Flip; }).catch(function (e) { console.warn('[' + TAG + '] Flip yüklenemedi; filtre animasyonsuz çalışır', e); });
      if (!this._on) return;
      await loadJs(url('links'), null, true);
      if (this._header) {
        if (!customElements.get('n1-header')) await loadJs(url('header'), function () { return !!customElements.get('n1-header'); });
        else if (!this._header.panel && this._header.connectedCallback) this._header.connectedCallback();
        if (this._header.panel) { this._header.panel.classList.add('n1-inner-panel'); this._header.panel.setAttribute('data-n1-mk', ''); }
      }
      if (this._footerOwned) await loadJs(url('footerJs'), null, true);
      if (this._fcOwned && !customElements.get('n1-floating-controls')) await loadJs(url('floating'), function () { return !!customElements.get('n1-floating-controls'); });
      var layer = document.querySelector('body > .n1fc:last-of-type'); if (this._fcOwned && layer) layer.setAttribute('data-n1-mk', '');
      if (!this._on) return;
      this._animate();
    }


    /* ---------- Arama + sektör filtresi ---------- */
    _filter() {
      var self = this, M = this._M;
      var root = this.querySelector('.mk-ind');
      var q = root.querySelector('.mk-q'), clear = root.querySelector('.mk-clear'), sel = root.querySelector('.mk-sel');
      var chips = [].slice.call(root.querySelectorAll('.mk-chip'));
      var rows = [].slice.call(root.querySelectorAll('.mk-row'));
      var empty = root.querySelector('.mk-empty'), count = root.querySelector('.mk-count');
      var byId = {}; M.list.forEach(function (b) { byId[b.id] = b; });
      var items = rows.map(function (r) {
        return { el: r, feat: r.classList.contains('mk-row--feat'), sec: r.getAttribute('data-sec'), c: r.querySelector('[data-c]'),
          names: [].slice.call(r.querySelectorAll('.mk-name')).map(function (li) { var b = byId[li.getAttribute('data-id')]; return { el: li, b: b, nm: li.querySelector('.mk-nm') }; }) };
      });
      var state = { q: '', sec: '' }, liveT = 0, typeT = 0;

      function mark(n, needle) {
        var raw = n.b.name;
        if (!needle) { if (n.marked) { n.nm.textContent = raw; n.marked = false; } return; }
        var i = n.b._n.indexOf(needle);
        if (i < 0 || n.b._n.length !== raw.length) { n.nm.textContent = raw; n.marked = false; return; }
        n.nm.innerHTML = esc(raw.slice(0, i)) + '<mark>' + esc(raw.slice(i, i + needle.length)) + '</mark>' + esc(raw.slice(i + needle.length));
        n.marked = true;
      }

      function apply() {
        var needle = norm(state.q).replace(/\s+/g, ' ').trim(), total = 0, featN = 0, secs = 0;
        items.forEach(function (it) {
          var shown = 0;
          var rowOk = it.feat ? !!needle : (!state.sec || it.sec === state.sec);
          it.names.forEach(function (n) {
            var ok = rowOk && (!needle || n.b._n.indexOf(needle) > -1) && (!it.feat || !state.sec || n.b._s === state.sec);
            n.el.hidden = !ok; if (ok) shown++;
            mark(n, ok ? needle : '');
          });
          it.el.hidden = !shown;
          if (it.c) it.c.textContent = shown;
          if (shown) { total += shown; if (it.feat) featN = shown; else secs++; }
        });
        empty.hidden = total > 0;
        var txt;
        if (!total) txt = TXT.empty;
        else if (needle) txt = '"' + state.q.trim() + '" için ' + total + ' sonuç' + (featN ? ': ' + featN + ' öne çıkan, ' + (total - featN) + ' sektörel' : '') + '.';
        else txt = total + ' marka ve proje, ' + secs + ' sektör gösteriliyor.';
        clearTimeout(liveT); liveT = setTimeout(function () { if (self._on) count.textContent = txt; }, needle ? 350 : 0);
        clear.hidden = !state.q;
        chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c.getAttribute('data-sec') === state.sec)); });
        if (sel.value !== state.sec) sel.value = state.sec;
      }
      this._applyFilter = apply;

      /* Seyrek eylem (sektör seçimi, temizleme): GSAP Flip ile yeniden yerleşim. Sık eylem (yazma): animasyonsuz. */
      function run(animate) {
        var F = window.Flip, gsap = window.gsap;
        self._revealAll();
        var can = animate && F && gsap && !matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!can) { apply(); self._refreshSoon(); return; }
        /* Yalnızca ekranda (ve hemen çevresinde) görünenler konumdan konuma kayar; uzaktan gelecek olanlar yerinde belirir */
        var vh = innerHeight;
        var inView = function (e) { var r = e.getBoundingClientRect(); return r.bottom > -vh * .25 && r.top < vh * 1.25; };
        var targets = [].slice.call(root.querySelectorAll('.mk-row:not([hidden]), .mk-row:not([hidden]) .mk-name:not([hidden]), .mk-empty')).filter(inView);
        var st = F.getState(targets);
        apply();
        if (self._flip) self._flip.kill();
        var now = [].slice.call(root.querySelectorAll('.mk-row:not([hidden]), .mk-row:not([hidden]) .mk-name:not([hidden]), .mk-empty:not([hidden])'));
        self._flip = F.from(st, { targets: now, duration: .5, ease: 'power3.inOut', nested: true, prune: true,
          onEnter: function (els) { return gsap.fromTo(els, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .4, delay: .12, stagger: { each: .008, amount: .25 }, ease: 'power2.out', clearProps: 'opacity,transform' }); },
          onComplete: function () { self._flip = null; self._refreshSoon(); } });
      }

      this._ev(q, 'input', function () { state.q = q.value; clearTimeout(typeT); typeT = setTimeout(function () { run(false); }, 90); });
      this._ev(q, 'keydown', function (e) { if (e.key === 'Escape' && q.value) { e.preventDefault(); q.value = ''; state.q = ''; run(true); } });
      this._ev(clear, 'click', function () { q.value = ''; state.q = ''; run(true); q.focus(); });
      chips.forEach(function (c) {
        self._ev(c, 'click', function () { var v = c.getAttribute('data-sec'); if (v === state.sec) return; state.sec = v; run(true); });
      });
      /* Ok tuşlarıyla sektör düğmeleri arasında gezinme (Tab ile de erişilir) */
      this._ev(root.querySelector('.mk-filter'), 'keydown', function (e) {
        var i = chips.indexOf(document.activeElement); if (i < 0) return;
        var k = e.key, j = k === 'ArrowRight' ? i + 1 : k === 'ArrowLeft' ? i - 1 : k === 'Home' ? 0 : k === 'End' ? chips.length - 1 : -2;
        if (j === -2) return; e.preventDefault(); chips[(j + chips.length) % chips.length].focus();
      });
      this._ev(sel, 'change', function () { state.sec = sel.value; run(true); });
      this._cleanups.push(function () { clearTimeout(liveT); clearTimeout(typeT); if (self._flip) { self._flip.kill(); self._flip = null; } });
      apply();
    }

    /* Henüz kaydırmayla görünmemiş satırlar filtre sonrası gizli kalmasın */
    _revealAll() {
      if (this._revealed) return;
      this._revealed = true;
      (this._rowTriggers || []).forEach(function (t) { t.kill(); });
      this._rowTriggers = null;
      if (window.gsap) window.gsap.set(this.querySelectorAll('.mk-row__head, .mk-row .mk-names'), { clearProps: 'opacity,transform' });
    }

    _refreshSoon() {
      var self = this;
      clearTimeout(this._rt);
      this._rt = setTimeout(function () { if (self._on && window.ScrollTrigger) window.ScrollTrigger.refresh(); }, 120);
    }
    /* ---------- Hareket ---------- */
    _animate() {
      var gsap = window.gsap, STg = window.ScrollTrigger, self = this;
      if (!gsap) return;
      if (STg) gsap.registerPlugin(STg);
      if (window.Flip) gsap.registerPlugin(window.Flip);
      var q = function (s, r) { return [].slice.call((r || self).querySelectorAll(s)); };
      var one = function (s, r) { return (r || self).querySelector(s); };
      var lines = function (h) { return q('.mk-ln>span', h); };
      /* Bir kez görünen bölüm, kırılım değişince (ör. döndürme) yeniden gizlenmez */
      var seen = self._seen || (self._seen = {});

      this._ctx = gsap.context(function () {
        var mm = gsap.matchMedia();

        /* 01 Hero — satır satır maskeli giriş, açıklama, sayaçlar (sayı DOM'da zaten son değerinde; sayaç yalnızca görsel) */
        mm.add({ big: '(prefers-reduced-motion: no-preference) and (min-width: 768px)', small: '(prefers-reduced-motion: no-preference) and (max-width: 767px)' }, function (c) {
          if (seen.hero) return;
          var big = c.conditions.big, nums = q('.mk-hero .mk-num');
          var tl = gsap.timeline({ defaults: { ease: 'expo.out' }, onComplete: function () { seen.hero = 1; } });
          tl.from(q('.mk-hero .mk-label > span'), { opacity: 0, y: 8, duration: .6, stagger: .06 }, 0)
            .from(lines(one('.mk-h1')), { yPercent: 108, duration: big ? 1.15 : .9, stagger: .1, ease: 'power4.out' }, .1)
            .from(one('.mk-lede'), { opacity: 0, y: 16, duration: .9 }, big ? .55 : .45)
            .from(q('.mk-stat__rule'), { scaleX: 0, transformOrigin: '0 50%', duration: 1, ease: 'power3.inOut', stagger: .1 }, .5)
            .from(q('.mk-stat__l'), { opacity: 0, y: 8, duration: .6, stagger: .1 }, .8);
          nums.forEach(function (n, i) {
            var to = +n.getAttribute('data-to'), o = { v: 0 };
            tl.to(o, { v: to, duration: big ? 1.4 : 1, ease: 'power2.out', onUpdate: function () { n.textContent = Math.round(o.v); }, onComplete: function () { n.textContent = to; } }, .6 + i * .12);
          });
          return function () { nums.forEach(function (n) { n.textContent = n.getAttribute('data-to'); }); };
        });

        if (!STg) return;
        var once = function (el, start) { return { trigger: el, start: start || 'top 84%', once: true }; };

        /* Bölüm başlıkları — maskeli satır girişi (bölüm başına tek ScrollTrigger) */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          q('.mk-head').forEach(function (h, i) {
            if (seen['h' + i]) return;
            gsap.timeline({ scrollTrigger: Object.assign(once(h, 'top 86%'), { onEnter: function () { seen['h' + i] = 1; } }), defaults: { ease: 'power4.out' } })
              .from(q('.mk-label', h), { opacity: 0, y: 8, duration: .6 }, 0)
              .from(lines(h), { yPercent: 108, duration: 1, stagger: .09 }, .05)
              .from(q('.mk-note', h), { opacity: 0, y: 12, duration: .8, ease: 'expo.out' }, .35);
          });
        });

        /* 02 Öne çıkan — tüm dizin için TEK ScrollTrigger; çizgiler soldan çizilir, adlar kısa bir stagger ile gelir */
        mm.add({ big: '(prefers-reduced-motion: no-preference) and (min-width: 768px)', small: '(prefers-reduced-motion: no-preference) and (max-width: 767px)' }, function (c) {
          if (seen.grid) return;
          var grid = one('.mk-grid'), it = q('.mk-f', grid);
          var tl = gsap.timeline({ scrollTrigger: Object.assign(once(grid, 'top 88%'), { onEnter: function () { seen.grid = 1; } }) });
          tl.from(it, { '--mk-rule': 0, duration: c.conditions.big ? .9 : .6, ease: 'power3.inOut', stagger: c.conditions.big ? .035 : .02 }, 0)
            .from(q('.mk-f__name, .mk-f__logo', grid), { opacity: 0, y: c.conditions.big ? 22 : 12, duration: .7, ease: 'expo.out', stagger: c.conditions.big ? .035 : .02 }, .1)
            .from(q('.mk-f__n, .mk-f__sec', grid), { opacity: 0, duration: .6, stagger: c.conditions.big ? .02 : .01 }, .3);
        });

        /* 03 Sektörler — satır başlıkları kaydırdıkça; ScrollTrigger.batch (sektör başına bir tetikleyici, marka başına değil). Telefonda yok. */
        mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px)', function () {
          if (self._revealed) return;
          var rows = q('.mk-row:not(.mk-row--feat):not([data-mk-seen])');
          if (!rows.length) return;
          gsap.set(q('.mk-row__head, .mk-names', rows[0].parentNode).filter(function (e) { return !e.closest('[data-mk-seen]') && !e.closest('.mk-row--feat'); }), { opacity: 0, y: 18 });
          self._rowTriggers = STg.batch(rows, {
            start: 'top 90%', once: true,
            onEnter: function (batch) {
              batch.forEach(function (r) { r.setAttribute('data-mk-seen', ''); });
              var parts = []; batch.forEach(function (r) { parts.push(one('.mk-row__head', r), one('.mk-names', r)); });
              gsap.to(parts, { opacity: 1, y: 0, duration: .8, ease: 'expo.out', stagger: .06, overwrite: true, clearProps: 'opacity,transform' });
            }
          });
          return function () { if (self._rowTriggers) self._rowTriggers.forEach(function (t) { t.kill(); }); self._rowTriggers = null; gsap.set(q('.mk-row__head, .mk-names', one('.mk-results')), { clearProps: 'opacity,transform' }); };
        });

        /* 04 CTA — satırlar, metin ve düğme */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          if (seen.cta) return;
          var h = one('.mk-cta');
          gsap.timeline({ scrollTrigger: Object.assign(once(h, 'top 78%'), { onEnter: function () { seen.cta = 1; } }), defaults: { ease: 'power4.out' } })
            .from(one('.mk-cta .mk-label'), { opacity: 0, y: 8, duration: .6 }, 0)
            .from(lines(one('.mk-cta__h')), { yPercent: 108, duration: 1.1, stagger: .11 }, .05)
            .from(q('.mk-cta__p, .mk-cta .mk-btn'), { opacity: 0, y: 16, duration: .9, stagger: .1, ease: 'expo.out' }, .5);
        });
      }, this);

      if (STg) {
        var last = 0, t = 0;
        var refresh = function () { if (!self._on) return; STg.refresh(); last = Math.round(self.getBoundingClientRect().height); };
        var ready = Promise.all([document.fonts ? document.fonts.ready : null, document.readyState === 'complete' ? null : new Promise(function (r) { addEventListener('load', r, { once: true }); })]);
        ready.then(function () { requestAnimationFrame(refresh); });
        if ('ResizeObserver' in window) {
          this._ro = new ResizeObserver(function () {
            var h = Math.round(self.getBoundingClientRect().height);
            if (last && Math.abs(h - last) > 2) { clearTimeout(t); t = setTimeout(refresh, 250); }
          });
          this._ro.observe(this);
        }
        this._ev(window, 'orientationchange', function () { clearTimeout(t); t = setTimeout(refresh, 350); });
        this._cleanups.push(function () { clearTimeout(t); });
      }
    }


    disconnectedCallback() {
      this._on = false;
      if (this._ro) { this._ro.disconnect(); this._ro = null; }
      if (this._ctx) { this._ctx.revert(); this._ctx = null; }
      var self = this;
      if (window.ScrollTrigger) window.ScrollTrigger.getAll().forEach(function (t) { var el = t.trigger; if (el && (self.contains(el) || !el.isConnected)) t.kill(); });
      if (window.gsap) {
        var mine = function (t) { return t.targets().some(function (el) { return el && el.nodeType === 1 && self.contains(el); }); };
        window.gsap.globalTimeline.getChildren(false, true, true).forEach(function (a) { if (a.getChildren ? a.getChildren(true, true, false).some(mine) : mine(a)) a.kill(); });
      }
      (this._cleanups || []).forEach(function (f) { try { f(); } catch (e) {} });   // videolar durur, zamanlayıcı ve gözlemciler kapanır
      this._cleanups = [];
      if (this._fcOwned) document.body.classList.remove('n1-inner-fc-enabled');
      this._fcOwned = false; this._footerOwned = false; this._header = null; this._M = null; this._seen = null; this._applyFilter = null; this._rowTriggers = null; this._revealed = false; clearTimeout(this._rt); if (this._flip) { this._flip.kill(); this._flip = null; }
      this.replaceChildren();
      var st = document.getElementById(STYLE_ID); if (st && !document.querySelector(TAG)) st.remove();
    }
  }
  customElements.define(TAG, MarkalarV1);
})();