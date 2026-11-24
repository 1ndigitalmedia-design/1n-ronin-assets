/*!
 * n1-kisaca-biz-v2 — 1N Digital Media · Kısaca Biz (/kisaca-biz)
 * Wix Studio Custom Element · Tag name: n1-kisaca-biz-v2 · Kaynak: bu dosyanın HTTPS adresi
 *
 * Mimari
 *  - Light DOM (paylaşılan Header/Footer modülleri light DOM'da çalışır).
 *  - Sayfaya özel bütün CSS bu dosyada ve `n1-kisaca-biz-v2` etiketiyle kapsamlıdır.
 *  - Header, Footer ve WhatsApp/Yukarı Çık değiştirilmez: ana sayfanın onaylı v6.48 kaynaklarından
 *    (n1-site-markup-v648.js içindeki işaretleme + modül dosyaları) aynen yüklenir.
 *    Yalnızca bu sayfaya özel menü bağlantıları JSON verisinde güncellenir (logo ve marka: "/", Hizmetler: "/#hizmetler-ozet").
 *  - Tablet ve mobil Header/Footer düzeni: Stüdyo Hikâyesi'nde onaylanan ortak iç sayfa CSS'i
 *    (n1-inner-responsive-v6.css) + bu dosyadaki aynı kurallar `n1-kisaca-biz-v2` kapsamında.
 *  - GSAP 3.13.0 + ScrollTrigger yalnızca sayfada yoksa yüklenir (ikinci kopya yok). SplitText kullanılmaz.
 *  - Bütün animasyonlar gsap.context() içinde; bağlantı kesilince context, ScrollTrigger'lar, observer'lar ve
 *    olay dinleyicileri temizlenir. Pin/scroll kilidi yok; bu yüzden ScrollTrigger boşluk (spacer) yüksekliği oluşmaz.
 *  - İçerik CSS'te asla gizlenmez: GSAP yüklenemezse veya prefers-reduced-motion açıksa sayfa tamamen görünür kalır.
 *  - Yükseklik içerikten gelir (sabit/tahmini yükseklik yok, sayfa geneli için 100vh yok).
 *  - Bütün yön ikonları satır içi SVG'dir; Unicode ok/emoji kullanılmaz.
 *
 * İsteğe bağlı öznitelik (yalnızca Wix dışı önizleme için): deps-base="<klasör>/"
 *   Verilirse jsDelivr dosyaları aynı yol yapısıyla bu klasörden okunur. Wix'te KULLANILMAZ.
 */
(function () {
  'use strict';
  var TAG = 'n1-kisaca-biz-v2';
  if (customElements.get(TAG)) return;

  /* ---------- Onaylı kaynaklar (commit'e sabitlenmiş) ---------- */
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
  var ST = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js';
  // Stüdyo Hikâyesi'nde kullanılan, Wix Medya'daki onaylı partner görselleri (tablet/mobil footer)
  var PARTNER_ART = {
    tablet: 'https://static.wixstatic.com/media/6dbf5e_800ff5a00ba244f9bb31761a6b2d713d~mv2.png',
    mobile: 'https://static.wixstatic.com/media/6dbf5e_32b849155e954320a1f6479f27fd6ad2~mv2.png'
  };

  /* ---------- Yardımcılar ---------- */
  // ready: Custom Element modülleri için "zaten tanımlı mı" denetimi (bir kez yüklenir).
  // fresh: bağlandığı öğeleri her çalışmada yeniden bulan IIFE modülleri (Footer, bağlantı haritası) için
  //        her bağlanışta yeniden çalıştırılır; ana sayfa bileşeni de modülleri böyle yeniden çalıştırır.
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
  var ARROW = '<svg class="kb-ico" viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" aria-hidden="true" focusable="false"><path d="M4.5 11.5l7-7M5.5 4.5h6v6"/></svg>';
  var DOWN = '<svg class="kb-ico" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" aria-hidden="true" focusable="false"><path d="M8 3v10M3.5 8.5L8 13l4.5-4.5"/></svg>';

  /* ---------- İçerik ---------- */
  var DISCIPLINES = [
    { n: 'Kreatif Prodüksiyon', h: '/kreatif-produksiyon', d: 'Fikri görüntüye, sese ve hikâyeye dönüştürür.', r: [2, 3, 4] },
    { n: 'E-Ticaret Yönetimi', h: '/e-ticaret-yonetimi', d: 'Markanın vitrinini satışa hazır, ölçülebilir bir deneyime çevirir.', r: [3, 4, 6] },
    { n: 'Sosyal Medya', h: '/sosyal-medya', d: 'Markanın her gün konuşan sesini kurar ve sürdürür.', r: [0, 3, 5] },
    { n: 'Reklam Yönetimi', h: '/reklam-yonetimi', d: 'Doğru mesajı doğru kitleye, doğru bütçeyle ulaştırır.', r: [0, 1, 2] },
    { n: 'UI/UX Tasarım', h: '/ui-ux-tasarim', d: 'Deneyimi sade, anlaşılır ve kullanılabilir kılar.', r: [1, 6, 0] },
    { n: 'Yapay Zekâ', h: '/yapay-zeka', d: 'Üretimi hızlandırır, yeni fikirlere alan açar.', r: [0, 2, 6] },
    { n: 'Uygulama Geliştirme', h: '/uygulama-gelistirme', d: 'Fikri çalışan, ölçeklenebilir bir ürüne dönüştürür.', r: [4, 1, 5] }
  ];

  function wheelSvg() {
    var n = DISCIPLINES.length, cx = 300, cy = 300, R = 228, pts = [], chords = '', nodes = '';
    for (var i = 0; i < n; i++) { var a = -Math.PI / 2 + i * 2 * Math.PI / n; pts.push([cx + R * Math.cos(a), cy + R * Math.sin(a)]); }
    for (var a1 = 0; a1 < n; a1++) for (var b1 = a1 + 1; b1 < n; b1++) {
      chords += '<line class="kb-chord" data-a="' + a1 + '" data-b="' + b1 + '" x1="' + pts[a1][0].toFixed(1) + '" y1="' + pts[a1][1].toFixed(1) + '" x2="' + pts[b1][0].toFixed(1) + '" y2="' + pts[b1][1].toFixed(1) + '"/>';
    }
    pts.forEach(function (p, i) { nodes += '<circle class="kb-node" data-i="' + i + '" cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="7"/>'; });
    return '<svg class="kb-wheel__svg" viewBox="0 0 600 600" aria-hidden="true" focusable="false">' +
      '<circle class="kb-wheel__ring" cx="300" cy="300" r="228"/><circle class="kb-wheel__ring kb-wheel__ring--in" cx="300" cy="300" r="132"/>' +
      '<g class="kb-chords">' + chords + '</g><g class="kb-nodes">' + nodes + '</g><circle class="kb-wheel__core" cx="300" cy="300" r="5"/></svg>';
  }
  function wheelButtons() {
    var n = DISCIPLINES.length;
    return DISCIPLINES.map(function (d, i) {
      var a = -Math.PI / 2 + i * 2 * Math.PI / n, x = 50 + 38 * Math.cos(a), y = 50 + 38 * Math.sin(a);
      var side = Math.cos(a) > 0.2 ? 'r' : Math.cos(a) < -0.2 ? 'l' : 'c';
      return '<li><button type="button" class="kb-disc kb-disc--' + side + '" data-i="' + i + '" aria-pressed="' + (i === 0) + '" style="--x:' + x.toFixed(2) + '%;--y:' + y.toFixed(2) + '%"><span>' + d.n + '</span></button></li>';
    }).join('');
  }
  function heroSvg() {
    // Yedi disiplin çizgisi tek bir odak noktasında buluşur: "ortak bakış"
    var F = [430, 300], starts = [[0, 40], [0, 175], [0, 300], [0, 425], [0, 560], [150, 0], [150, 600]], lines = '';
    starts.forEach(function (s, i) { lines += '<line class="kb-hl' + (i === 2 ? ' kb-hl--acc' : '') + '" x1="' + s[0] + '" y1="' + s[1] + '" x2="' + F[0] + '" y2="' + F[1] + '" pathLength="1"/>'; });
    return '<svg class="kb-hero__svg" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">' +
      '<g class="kb-hg">' +
      '<circle class="kb-hc" cx="430" cy="300" r="168"/><circle class="kb-hc" cx="430" cy="300" r="104"/><circle class="kb-hc kb-hc--3" cx="430" cy="300" r="46"/>' +
      '<line class="kb-hx" x1="430" y1="90" x2="430" y2="510"/><line class="kb-hx" x1="230" y1="300" x2="600" y2="300"/>' +
      lines +
      '<rect class="kb-hsq" x="402" y="272" width="56" height="56"/>' +
      '<circle class="kb-hpulse" cx="430" cy="300" r="9"/><circle class="kb-hdot" cx="430" cy="300" r="7"/>' +
      '</g></svg>';
  }
  function glyph(k) {
    var p = {
      think: '<circle cx="18" cy="24" r="11"/><circle cx="30" cy="24" r="11"/>',
      merge: '<rect x="7" y="7" width="20" height="20"/><rect x="21" y="21" width="20" height="20"/>',
      grow: '<path d="M7 38 L19 26 L27 32 L41 12"/><path d="M31 12 H41 V22"/>',
      learn: '<path d="M24 8 a16 16 0 1 1 -15.2 11"/><path d="M6 10 L9 19 L18 16"/>'
    }[k];
    return '<svg class="kb-glyph" viewBox="0 0 48 48" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true" focusable="false">' + p + '</svg>';
  }
  function dotField() {
    // 14 x 7 nokta; "ekip" takımyıldızı belirli noktaları birleştirir (deterministik)
    var cols = 14, rows = 7, gx = 40, gy = 40, out = '', team = [[2, 1], [5, 2], [4, 5], [8, 4], [10, 1], [12, 3], [11, 6], [7, 6]], links = [[0, 1], [1, 2], [1, 3], [3, 4], [4, 5], [5, 6], [3, 7], [7, 2], [3, 5]];
    for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) out += '<circle class="kb-dot" cx="' + (20 + c * gx) + '" cy="' + (20 + r * gy) + '" r="2"/>';
    var L = links.map(function (l) { var a = team[l[0]], b = team[l[1]]; return '<line class="kb-tl" x1="' + (20 + a[0] * gx) + '" y1="' + (20 + a[1] * gy) + '" x2="' + (20 + b[0] * gx) + '" y2="' + (20 + b[1] * gy) + '" pathLength="1"/>'; }).join('');
    var T = team.map(function (t) { return '<circle class="kb-td" cx="' + (20 + t[0] * gx) + '" cy="' + (20 + t[1] * gy) + '" r="5"/>'; }).join('');
    return '<svg class="kb-field" viewBox="0 0 560 280" aria-hidden="true" focusable="false"><g>' + out + '</g><g>' + L + '</g><g>' + T + '</g></svg>';
  }
  function ln(t) { return '<span class="kb-ln"><span>' + t + '</span></span>'; }

  function markup() {
    return '' +
'<main class="kb" id="kisaca-biz">' +
/* 01 — Hero */
'<section class="kb-hero" aria-labelledby="kb-h1">' +
  '<div class="kb-wrap kb-hero__grid">' +
    '<div class="kb-hero__copy">' +
      '<p class="kb-tag" data-kb="tag"><i aria-hidden="true"></i>1N Digital Media</p>' +
      '<h1 class="kb-hero__title" id="kb-h1" data-kb="lines">' + ln('Kısaca') + ln('Biz.') + '</h1>' +
      '<p class="kb-hero__lede" data-kb="fade">Farklı disiplinleri, ortak bir yaratıcı bakışta buluşturuyoruz.</p>' +
    '</div>' +
    '<div class="kb-hero__art" data-kb="art">' + heroSvg() + '</div>' +
  '</div>' +
  '<div class="kb-wrap kb-hero__foot" data-kb="fade">' +
    '<p class="kb-motto"><span>Tek ekip.</span><span>Farklı disiplinler.</span><span>Ortak bir bakış.</span></p>' +
    '<a class="kb-scroll" href="#kb-biz">Keşfet' + DOWN + '</a>' +
  '</div>' +
'</section>' +
/* 02 — Biz kimiz? */
'<section class="kb-sec kb-who" id="kb-biz" aria-labelledby="kb-who-t">' +
  '<div class="kb-wrap kb-grid">' +
    '<p class="kb-label" data-kb="fade">Biz kimiz?</p>' +
    '<div class="kb-who__body">' +
      '<h2 class="kb-manifesto" id="kb-who-t" data-kb="fade">Bir fikrin değerini, onu hayata geçiren ekibin uyumu belirler.</h2>' +
      '<div class="kb-who__cols" data-kb="fade">' +
        '<p>1N Digital Media; strateji, tasarım, teknoloji, prodüksiyon ve dijital performansı aynı ekipte buluşturan yaratıcı bir yapı. Her disiplin kendi uzmanlığını getirir, ama hepsi aynı soruya cevap arar: Bu marka için doğru olan ne?</p>' +
        '<p>Bir kampanyanın fikrini yazan ekip, onun nasıl ölçüleceğini de düşünür. Bir arayüzü tasarlayan ekip, içeriğin nasıl üretileceğini de bilir. Bizi farklı kılan, bu soruların aynı masada sorulması.</p>' +
      '</div>' +
    '</div>' +
  '</div>' +
'</section>' +
/* 03–07 — Creative editorial redesign (original Hero / Biz Kimiz / CTA retained) */
"<section class=\"kb2-team kb-sec\" id=\"kb-team\" aria-labelledby=\"kb2-team-h\">\n<div class=\"kb-wrap kb2-team-header\">\n <p class=\"kb2-overline\"><span class=\"kb2-bullet\"></span> 03 / ONE TEAM, MANY MINDS</p>\n <div class=\"kb2-team-headgrid\"><h2 class=\"kb2-display kb2-team-title\" id=\"kb2-team-h\"><span>TEK BİR</span><span class=\"kb2-accent\">BAKIŞ.</span><span>PEK ÇOK</span><span>YETENEK.</span></h2>\n <div class=\"kb2-team-aside\"><div class=\"kb2-orbit\" aria-hidden=\"true\"><span class=\"kb2-orbit-center\">1N</span><span class=\"kb2-orbit-ring\"></span><span class=\"kb2-orbit-dot\"></span></div><p>Birbirinden ayrı çalışan uzmanlıklar değil; fikri ilk andan itibaren birlikte düşünen tek bir yaratıcı ekip.</p><span class=\"kb2-index\">TEAM / 01—04</span></div></div>\n <div class=\"kb2-team-nav\"><span>EKİBİ OLUŞTURAN DİSİPLİNLER</span><div class=\"kb2-arrows\"><button type=\"button\" class=\"kb2-nav kb2-nav-prev\" aria-label=\"Önceki disiplin\"><svg viewBox=\"0 0 24 24\" width=\"22\" height=\"22\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M19 12H5m6 6-6-6 6-6\"/></svg></button><button type=\"button\" class=\"kb2-nav kb2-nav-next\" aria-label=\"Sonraki disiplin\"><svg viewBox=\"0 0 24 24\" width=\"22\" height=\"22\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M5 12h14m-6-6 6 6-6 6\"/></svg></button></div></div>\n</div>\n<div class=\"kb2-rail\" role=\"region\" aria-label=\"Ekip disiplinleri\" tabindex=\"0\"><div class=\"kb2-rail-track\"><article class=\"kb2-card kb2-card--1\" aria-label=\"STRATEJİ\">\n  <div class=\"kb2-card-top\"><span>01 / 04</span><span>OBSERVE / 1N</span></div>\n  <div class=\"kb2-card-art\" aria-hidden=\"true\"><span class=\"kb2-card-symbol\">1</span><span class=\"kb2-card-grain\"></span><span class=\"kb2-card-ray kb2-card-ray-1\"></span><span class=\"kb2-card-ray kb2-card-ray-2\"></span></div>\n  <div class=\"kb2-card-copy\"><h3>STRATEJİ</h3><strong>Yönü belirler.</strong><p>Herkes aynı soruya bakmaya başladığında, fikir yönünü bulur.</p></div>\n </article><article class=\"kb2-card kb2-card--2\" aria-label=\"KREATİF\">\n  <div class=\"kb2-card-top\"><span>02 / 04</span><span>IMAGINE / 1N</span></div>\n  <div class=\"kb2-card-art\" aria-hidden=\"true\"><span class=\"kb2-card-symbol\">2</span><span class=\"kb2-card-grain\"></span><span class=\"kb2-card-ray kb2-card-ray-1\"></span><span class=\"kb2-card-ray kb2-card-ray-2\"></span></div>\n  <div class=\"kb2-card-copy\"><h3>KREATİF</h3><strong>Fikre karakter verir.</strong><p>Mesajı, görüntüyü ve hareketi markaya ait bir dile dönüştürür.</p></div>\n </article><article class=\"kb2-card kb2-card--3\" aria-label=\"TEKNOLOJİ\">\n  <div class=\"kb2-card-top\"><span>03 / 04</span><span>BUILD / 1N</span></div>\n  <div class=\"kb2-card-art\" aria-hidden=\"true\"><span class=\"kb2-card-symbol\">3</span><span class=\"kb2-card-grain\"></span><span class=\"kb2-card-ray kb2-card-ray-1\"></span><span class=\"kb2-card-ray kb2-card-ray-2\"></span></div>\n  <div class=\"kb2-card-copy\"><h3>TEKNOLOJİ</h3><strong>Olasılıkları genişletir.</strong><p>Deneyimi sadece tasarlamayız; kullanıcıyla buluşacağı sistemi de düşünürüz.</p></div>\n </article><article class=\"kb2-card kb2-card--4\" aria-label=\"PRODÜKSİYON\">\n  <div class=\"kb2-card-top\"><span>04 / 04</span><span>CRAFT / 1N</span></div>\n  <div class=\"kb2-card-art\" aria-hidden=\"true\"><span class=\"kb2-card-symbol\">4</span><span class=\"kb2-card-grain\"></span><span class=\"kb2-card-ray kb2-card-ray-1\"></span><span class=\"kb2-card-ray kb2-card-ray-2\"></span></div>\n  <div class=\"kb2-card-copy\"><h3>PRODÜKSİYON</h3><strong>Hikâyeyi yaşatır.</strong><p>Bir fikrin duygusunu gerçek görüntü, kurgu ve detaylarla güçlendirir.</p></div>\n </article></div></div>\n<div class=\"kb-wrap kb2-team-under\"><span>FARKLI YETENEKLER, ORTAK RİTİM.</span><span>SCROLL TO EXPLORE / 1N</span></div>\n</section><section class=\"kb2-brands kb-sec\" id=\"kb-brands\" aria-labelledby=\"kb2-brands-h\"><div class=\"kb-wrap\">\n<div class=\"kb2-section-head\"><p class=\"kb2-overline\"><span class=\"kb2-bullet\"></span>04 / SELECTED COLLABORATIONS</p><a class=\"kb2-sub-link\" href=\"/markalar\">TÜM MARKALAR <span><svg viewBox=\"0 0 24 24\" width=\"23\" height=\"23\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M5 19 19 5M9 5h10v10\"/></svg></span></a></div>\n<h2 class=\"kb2-display kb2-brands-title\" id=\"kb2-brands-h\">BİRLİKTE <em>İZ</em><br> BIRAKTIĞIMIZ <span>MARKALAR.</span></h2>\n<p class=\"kb2-brands-desc\">Farklı sektörlerden, farklı ölçeklerde işler. Her biri kendi hikâyesiyle; biz aynı yaratıcı merakla.</p>\n<div class=\"kb2-brand-grid\" role=\"list\"><div class=\"kb2-brand\" role=\"listitem\"><span class=\"kb2-brand-index\">01</span><div><strong>CETAŞ</strong><small>JEWELLERY</small></div><span class=\"kb2-brand-dot\" aria-hidden=\"true\"></span></div><div class=\"kb2-brand\" role=\"listitem\"><span class=\"kb2-brand-index\">02</span><div><strong>OYAK</strong><small>ENERJİ</small></div><span class=\"kb2-brand-dot\" aria-hidden=\"true\"></span></div><div class=\"kb2-brand\" role=\"listitem\"><span class=\"kb2-brand-index\">03</span><div><strong>MERCEDES</strong><small>TİCARİ</small></div><span class=\"kb2-brand-dot\" aria-hidden=\"true\"></span></div><div class=\"kb2-brand\" role=\"listitem\"><span class=\"kb2-brand-index\">04</span><div><strong>SCHNEIDER</strong><small>ELECTRIC</small></div><span class=\"kb2-brand-dot\" aria-hidden=\"true\"></span></div><div class=\"kb2-brand\" role=\"listitem\"><span class=\"kb2-brand-index\">05</span><div><strong>PETROL</strong><small>OFİSİ</small></div><span class=\"kb2-brand-dot\" aria-hidden=\"true\"></span></div><div class=\"kb2-brand\" role=\"listitem\"><span class=\"kb2-brand-index\">06</span><div><strong>JOLLY TUR</strong><small>WHITEFEST</small></div><span class=\"kb2-brand-dot\" aria-hidden=\"true\"></span></div><div class=\"kb2-brand\" role=\"listitem\"><span class=\"kb2-brand-index\">07</span><div><strong>OPEL</strong><small>GRANDLAND</small></div><span class=\"kb2-brand-dot\" aria-hidden=\"true\"></span></div><div class=\"kb2-brand\" role=\"listitem\"><span class=\"kb2-brand-index\">08</span><div><strong>REEBOK</strong><small>EVENT</small></div><span class=\"kb2-brand-dot\" aria-hidden=\"true\"></span></div></div></div></section><section class=\"kb2-standards kb-sec\" id=\"kb-standart\" aria-labelledby=\"kb2-std-h\"><div class=\"kb-wrap\">\n<div class=\"kb2-section-head\"><p class=\"kb2-overline\"><span class=\"kb2-bullet\"></span>05 / THE 1N WAY</p><span class=\"kb2-heading-id\">001—005</span></div>\n<div class=\"kb2-standards-heading\"><h2 class=\"kb2-display\" id=\"kb2-std-h\">BİZİM<br><em>STANDARDIMIZ.</em></h2><p>Her projede, her kararda ve her detayda yeniden sahip çıktığımız çalışma biçimi. 1N’i en iyi anlatan şey bu.</p></div>\n<div class=\"kb2-std-list\"><details class=\"kb2-std\"><summary><span class=\"kb2-std-n\">01</span><span class=\"kb2-std-main\">ÖNCE SORU SORARIZ.</span><span class=\"kb2-std-word\">ASK</span><span class=\"kb2-std-toggle\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" width=\"23\" height=\"23\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M5 19 19 5M9 5h10v10\"/></svg></span></summary><div class=\"kb2-std-detail\"><p>Hazır cevaplar yerine problemin özünü arar, doğru brief’i birlikte kurarız.</p></div></details><details class=\"kb2-std\"><summary><span class=\"kb2-std-n\">02</span><span class=\"kb2-std-main\">FİKRİN PEŞİNİ BIRAKMAYIZ.</span><span class=\"kb2-std-word\">EXPLORE</span><span class=\"kb2-std-toggle\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" width=\"23\" height=\"23\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M5 19 19 5M9 5h10v10\"/></svg></span></summary><div class=\"kb2-std-detail\"><p>İlk güçlü fikir çoğu zaman başlangıçtır. Dener, iterasyon yapar, olgunlaştırırız.</p></div></details><details class=\"kb2-std\"><summary><span class=\"kb2-std-n\">03</span><span class=\"kb2-std-main\">HER DETAYA SAHİP ÇIKARIZ.</span><span class=\"kb2-std-word\">CRAFT</span><span class=\"kb2-std-toggle\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" width=\"23\" height=\"23\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M5 19 19 5M9 5h10v10\"/></svg></span></summary><div class=\"kb2-std-detail\"><p>Görsel dil, ürün deneyimi, teknik uygulama ve ölçüm bir bütün olarak ele alınır.</p></div></details><details class=\"kb2-std\"><summary><span class=\"kb2-std-n\">04</span><span class=\"kb2-std-main\">BİRLİKTE ÜRETİRİZ.</span><span class=\"kb2-std-word\">CONNECT</span><span class=\"kb2-std-toggle\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" width=\"23\" height=\"23\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M5 19 19 5M9 5h10v10\"/></svg></span></summary><div class=\"kb2-std-detail\"><p>Farklı uzmanlıkları birbirine devreden değil, birlikte düşünen bir ekip olarak çalışırız.</p></div></details><details class=\"kb2-std\"><summary><span class=\"kb2-std-n\">05</span><span class=\"kb2-std-main\">ÖLÇER, YENİDEN DÜŞÜNÜRÜZ.</span><span class=\"kb2-std-word\">EVOLVE</span><span class=\"kb2-std-toggle\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" width=\"23\" height=\"23\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M5 19 19 5M9 5h10v10\"/></svg></span></summary><div class=\"kb2-std-detail\"><p>Yayına almak son değil. Gerçek dünyadan aldığımızı bir sonraki adıma taşırız.</p></div></details></div></div></section><section class=\"kb2-expertise kb-sec\" id=\"kb-expertise\" aria-labelledby=\"kb2-exp-h\"><div class=\"kb-wrap\">\n<div class=\"kb2-section-head\"><p class=\"kb2-overline\"><span class=\"kb2-bullet\"></span>06 / OUR EXPERTISE</p><span class=\"kb2-heading-id\">FOUR DIRECTIONS / ONE STUDIO</span></div>\n<h2 class=\"kb2-display kb2-exp-heading\" id=\"kb2-exp-h\">FARKLI ALANLAR.<br><em>TEK SİSTEM.</em></h2>\n<div class=\"kb2-exp-grid\"><article class=\"kb2-exp-card kb2-exp-card--1\"><div class=\"kb2-exp-top\"><span>01 / EXPERTISE</span><span class=\"kb2-exp-stamp\" aria-hidden=\"true\">1N</span></div><div class=\"kb2-exp-visual\" aria-hidden=\"true\"><span class=\"kb2-exp-letter\">S</span><span class=\"kb2-exp-visual-ring\"></span></div><div class=\"kb2-exp-body\"><h3>STRATEJİ</h3><p>Doğru problemi tanımlamak</p><small>Konumlandırma · Araştırma · Dijital yön · İçgörü</small><a href=\"/reklam-yonetimi\" aria-label=\"STRATEJİ alanını keşfet\">KEŞFET <svg viewBox=\"0 0 24 24\" width=\"23\" height=\"23\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M5 19 19 5M9 5h10v10\"/></svg></a></div></article><article class=\"kb2-exp-card kb2-exp-card--2\"><div class=\"kb2-exp-top\"><span>02 / EXPERTISE</span><span class=\"kb2-exp-stamp\" aria-hidden=\"true\">1N</span></div><div class=\"kb2-exp-visual\" aria-hidden=\"true\"><span class=\"kb2-exp-letter\">K</span><span class=\"kb2-exp-visual-ring\"></span></div><div class=\"kb2-exp-body\"><h3>KREATİF</h3><p>Görsel dünyanın karakterini kurmak</p><small>Art direction · Tasarım · İçerik · Motion</small><a href=\"/kreatif-produksiyon\" aria-label=\"KREATİF alanını keşfet\">KEŞFET <svg viewBox=\"0 0 24 24\" width=\"23\" height=\"23\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M5 19 19 5M9 5h10v10\"/></svg></a></div></article><article class=\"kb2-exp-card kb2-exp-card--3\"><div class=\"kb2-exp-top\"><span>03 / EXPERTISE</span><span class=\"kb2-exp-stamp\" aria-hidden=\"true\">1N</span></div><div class=\"kb2-exp-visual\" aria-hidden=\"true\"><span class=\"kb2-exp-letter\">T</span><span class=\"kb2-exp-visual-ring\"></span></div><div class=\"kb2-exp-body\"><h3>TEKNOLOJİ</h3><p>Fikri çalışan deneyime dönüştürmek</p><small>UI/UX · Web · E-ticaret · Uygulama · AI</small><a href=\"/uygulama-gelistirme\" aria-label=\"TEKNOLOJİ alanını keşfet\">KEŞFET <svg viewBox=\"0 0 24 24\" width=\"23\" height=\"23\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M5 19 19 5M9 5h10v10\"/></svg></a></div></article><article class=\"kb2-exp-card kb2-exp-card--4\"><div class=\"kb2-exp-top\"><span>04 / EXPERTISE</span><span class=\"kb2-exp-stamp\" aria-hidden=\"true\">1N</span></div><div class=\"kb2-exp-visual\" aria-hidden=\"true\"><span class=\"kb2-exp-letter\">P</span><span class=\"kb2-exp-visual-ring\"></span></div><div class=\"kb2-exp-body\"><h3>PERFORMANS</h3><p>İşin etkisini anlayıp büyütmek</p><small>Google Ads · Meta Ads · Analitik · Optimizasyon</small><a href=\"/reklam-yonetimi\" aria-label=\"PERFORMANS alanını keşfet\">KEŞFET <svg viewBox=\"0 0 24 24\" width=\"23\" height=\"23\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M5 19 19 5M9 5h10v10\"/></svg></a></div></article></div></div></section><section class=\"kb2-impact kb-sec\" aria-labelledby=\"kb2-impact-h\"><div class=\"kb-wrap kb2-impact-inner\"><p class=\"kb2-overline\"><span class=\"kb2-bullet\"></span>07 / THE NEXT IDEA</p>\n<h2 class=\"kb2-impact-message\" id=\"kb2-impact-h\"><span>FİKRİN</span><span class=\"kb2-accent\">SINIRI</span><span>YOK.</span></h2><div class=\"kb2-impact-bottom\"><span class=\"kb2-impact-line\" aria-hidden=\"true\"></span><p>Disiplinleri değil, olasılıkları birleştiriyoruz. Birlikte düşünmek, birlikte daha iyisini yapmak için.</p></div><div class=\"kb2-impact-seal\" aria-hidden=\"true\"><span>1N</span><span>CREATIVE / DIGITAL / TECHNOLOGY</span></div></div></section>" +
/* 07 — Final CTA */
'<section class="kb-sec kb-cta" aria-labelledby="kb-cta-t">' +
  '<div class="kb-wrap">' +
    '<p class="kb-tag" data-kb="fade"><i aria-hidden="true"></i>The Next Move / 1N</p>' +
    '<h2 class="kb-cta__title" id="kb-cta-t" data-kb="lines">' + ln('Birlikte') + '<span class="kb-ln kb-ln--acc"><span>üretelim.</span></span></h2>' +
    '<div class="kb-cta__row" data-kb="fade">' +
      '<div class="kb-cta__actions">' +
        '<a class="kb-btn kb-btn--primary" href="/iletisim"><span>Projenizi Konuşalım</span><span class="kb-btn__ico">' + ARROW + '</span></a>' +
        '<a class="kb-btn kb-btn--ghost" href="/teklif-al"><span>Teklif Al</span><span class="kb-btn__ico">' + ARROW + '</span></a>' +
      '</div>' +
      '<p class="kb-cta__note">Markanızın bir sonraki adımını birlikte planlayalım.</p>' +
    '</div>' +
  '</div>' +
'</section>' +
'</main>';
  }

  /* ---------- Sayfaya özel CSS (yalnızca n1-kisaca-biz-v2 kapsamında) ---------- */
  var T = TAG;
  var CSS = [
T + '{--bg:#080A09;--g1:#0D0F0E;--g2:#131514;--ink:#ECEBE5;--soft:#BDBCB5;--mute:#9A9B95;--dim:#6E706A;--line:rgba(228,227,221,.12);--line2:rgba(228,227,221,.07);--acc:#A8CF62;--ease:cubic-bezier(.22,1,.36,1);',
'  --gap:clamp(18px,2.2vw,40px);display:block;position:relative;width:100%;background:var(--bg);color:var(--ink);font:400 17px/1.6 Barlow,Arial,sans-serif;-webkit-font-smoothing:antialiased;overflow-x:clip;text-align:left}',
T + ' *,' + T + ' *::before,' + T + ' *::after{box-sizing:border-box;min-width:0}',
/* Sıfırlamalar :where() ile sıfır özgüllükte: bileşen sınıflarının boşluklarını ezmez */
T + ' :where(.kb) :where(p,h1,h2,h3,ul,dl,dd){margin:0}',
T + ' :where(.kb) :where(ul){padding:0;list-style:none}',
T + ' :where(.kb) :where(a){color:inherit}',
T + ' .kb :focus-visible{outline:2px solid var(--acc);outline-offset:3px}',
T + ' .kb-ico{display:block;flex:none}',
T + ' .kb-wrap{width:90%;margin-left:auto;margin-right:auto}',
T + ' .kb-grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap)}',
T + ' .kb-tag{display:flex;align-items:center;gap:14px;font:500 12px/1.2 Barlow,Arial,sans-serif;letter-spacing:.22em;text-transform:uppercase;color:var(--mute)}',
T + ' .kb-tag i{display:block;width:34px;height:1px;background:var(--acc)}',
T + ' .kb-label{grid-column:1/4;display:flex;align-items:center;gap:12px;font:500 15px/1.3 Barlow,Arial,sans-serif;color:var(--mute);align-self:start;padding-top:.55em}',
T + ' .kb-label::before{content:"";flex:none;width:7px;height:7px;border-radius:1px;background:var(--acc)}',
/* Başlık satır maskeleri: Türkçe İ noktası ve aksanlar için üst/alt güvenli pay */
T + ' .kb-ln{display:block;overflow:hidden;padding:.16em 0 .08em;margin:-.16em 0 -.08em}',
T + ' .kb-ln>span{display:block}',
T + ' .kb-ln--acc{color:var(--acc)}',
T + ' .kb-sec{border-top:1px solid var(--line)}',
T + ' .kb-head{align-items:start}',
T + ' .kb-h2{grid-column:4/13;font:600 clamp(52px,5.4vw,104px)/1.02 "Barlow Condensed","Arial Narrow",Arial,sans-serif;letter-spacing:-.012em;color:var(--ink)}',
T + ' .kb-head__main{grid-column:4/13;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,340px);column-gap:var(--gap);align-items:end}',
T + ' .kb-head__main .kb-h2{grid-column:auto}',
T + ' .kb-head__lede{padding-bottom:.6em;font-size:clamp(16px,1.1vw,18px);line-height:1.6;color:var(--soft)}',

/* 01 Hero */
T + ' .kb-hero{position:relative;padding-top:clamp(140px,11vw,196px);padding-bottom:0;overflow:hidden}',
T + ' .kb-hero__grid{display:grid;grid-template-columns:minmax(0,7fr) minmax(0,5fr);column-gap:var(--gap);align-items:center}',
T + ' .kb-hero__copy{position:relative;z-index:2}',
T + ' .kb-hero__title{margin-top:.2em;font:700 clamp(112px,13.6vw,264px)/.98 "Barlow Condensed","Arial Narrow",Arial,sans-serif;letter-spacing:-.014em;text-transform:uppercase;color:var(--ink)}',
T + ' .kb-hero__title .kb-ln:last-child>span{color:var(--acc)}',
T + ' .kb-hero__lede{margin-top:clamp(36px,3.2vw,56px);max-width:30ch;font:400 clamp(19px,1.45vw,25px)/1.45 Barlow,Arial,sans-serif;color:var(--soft)}',
T + ' .kb-hero__art{position:relative;justify-self:end;width:100%;max-width:620px;aspect-ratio:1}',
T + ' .kb-hero__svg{display:block;width:100%;height:100%;overflow:visible}',
T + ' .kb-hc{fill:none;stroke:var(--line);stroke-width:1}',
T + ' .kb-hc--3{stroke:rgba(168,207,98,.35)}',
T + ' .kb-hx{stroke:var(--line2);stroke-width:1;stroke-dasharray:3 7}',
T + ' .kb-hl{stroke:rgba(236,235,229,.22);stroke-width:1.1;stroke-dasharray:1;stroke-dashoffset:0}',
T + ' .kb-hl--acc{stroke:var(--acc);stroke-width:1.6}',
T + ' .kb-hsq{fill:none;stroke:rgba(168,207,98,.55);stroke-width:1}',
T + ' .kb-hdot{fill:var(--acc)}',
T + ' .kb-hpulse{fill:none;stroke:var(--acc);stroke-width:1.2;opacity:0}',
T + ' .kb-hero__foot{display:flex;align-items:center;justify-content:space-between;gap:24px;margin-top:clamp(40px,4vw,72px);padding:22px 0;border-top:1px solid var(--line)}',
T + ' .kb-motto{display:flex;flex-wrap:wrap;gap:0;font:500 clamp(16px,1.2vw,20px)/1.3 "Barlow Condensed",Arial,sans-serif;letter-spacing:.02em;color:var(--soft)}',
T + ' .kb-motto span{display:inline-flex;align-items:center}',
T + ' .kb-motto span+span::before{content:"";width:22px;height:1px;margin:0 16px;background:var(--dim)}',
T + ' .kb-motto span:last-child{color:var(--acc)}',
T + ' .kb-scroll{display:inline-flex;align-items:center;gap:10px;font:500 13px/1 Barlow,Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase;text-decoration:none;color:var(--mute);transition:color .35s var(--ease)}',
T + ' .kb-scroll:hover{color:var(--ink)}',

/* 02 Biz kimiz? */
T + ' .kb-who{padding:clamp(96px,8.4vw,160px) 0}',
T + ' .kb-who__body{grid-column:4/13}',
T + ' .kb-manifesto{max-width:20ch;font:500 clamp(42px,4.2vw,82px)/1.08 "Barlow Condensed","Arial Narrow",Arial,sans-serif;letter-spacing:-.01em;color:var(--ink);text-wrap:balance}',
T + ' .kb-who__cols{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:var(--gap);margin-top:clamp(44px,4vw,72px);max-width:920px}',
T + ' .kb-who__cols p{font-size:clamp(16px,1.1vw,18px);line-height:1.7;color:var(--soft)}',

/* 03 İlkeler */
T + ' .kb-team{padding:clamp(96px,8.4vw,160px) 0}',
T + ' .kb .kb-principles{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:0;margin:clamp(56px,5vw,96px) auto 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}',
T + ' .kb-pr{position:relative;padding:clamp(28px,2.4vw,40px) clamp(18px,1.8vw,32px) clamp(34px,3vw,52px);border-left:1px solid var(--line);transition:background-color .5s var(--ease)}',
T + ' .kb-pr:first-child{border-left:0;padding-left:0}',
T + ' .kb-pr::before{content:"";position:absolute;left:0;right:0;top:-1px;height:1px;background:var(--acc);transform:scaleX(0);transform-origin:0 50%;transition:transform .7s var(--ease)}',
T + ' .kb-pr:hover::before{transform:scaleX(1)}',
T + ' .kb-glyph{display:block;width:44px;height:44px;color:var(--acc)}',
T + ' .kb-pr h3{margin-top:clamp(40px,4vw,72px);font:600 clamp(26px,2.1vw,38px)/1.1 "Barlow Condensed",Arial,sans-serif;color:var(--ink)}',
T + ' .kb-pr p{margin-top:14px;font-size:clamp(15px,1.02vw,17px);line-height:1.62;color:var(--mute);transition:color .45s var(--ease)}',
T + ' .kb-pr:hover p{color:var(--soft)}',

/* 04 Disiplin çarkı */
T + ' .kb-disc-sec{padding:clamp(96px,8.4vw,160px) 0;background:linear-gradient(180deg,var(--bg),var(--g1) 30%,var(--g1) 70%,var(--bg))}',
T + ' .kb-wheel{display:grid;grid-template-columns:minmax(0,7fr) minmax(0,5fr);column-gap:var(--gap);align-items:center;margin-top:clamp(48px,4.4vw,84px)}',
T + ' .kb-wheel__stage{position:relative;width:100%;max-width:680px;aspect-ratio:1;justify-self:center}',
T + ' .kb-wheel__svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}',
T + ' .kb-wheel__ring{fill:none;stroke:var(--line);stroke-width:1}',
T + ' .kb-wheel__ring--in{stroke:var(--line2);stroke-dasharray:2 6}',
T + ' .kb-chord{stroke:rgba(236,235,229,.07);stroke-width:1;transition:stroke .45s var(--ease),stroke-width .45s var(--ease)}',
T + ' .kb-chord.is-rel{stroke:rgba(168,207,98,.75);stroke-width:1.5}',
T + ' .kb-node{fill:var(--bg);stroke:rgba(236,235,229,.45);stroke-width:1.2;transition:fill .4s var(--ease),stroke .4s var(--ease)}',
T + ' .kb-node.is-rel{stroke:var(--acc)}',
T + ' .kb-node.is-on{fill:var(--acc);stroke:var(--acc)}',
T + ' .kb-wheel__core{fill:var(--acc)}',
T + ' .kb-wheel__list{position:absolute;inset:0}',
T + ' .kb-wheel__list li{position:static}',
T + ' .kb-disc{position:absolute;left:var(--x);top:var(--y);display:flex;align-items:center;min-height:44px;padding:8px 12px;border:0;border-radius:8px;background:transparent;color:var(--soft);cursor:pointer;',
'  font:500 clamp(15px,1.15vw,19px)/1.15 "Barlow Condensed",Arial,sans-serif;letter-spacing:.01em;white-space:nowrap;transition:color .35s var(--ease),background-color .35s var(--ease);-webkit-tap-highlight-color:transparent;touch-action:manipulation}',
T + ' .kb-disc--r{transform:translate(14px,-50%)}',
T + ' .kb-disc--l{transform:translate(calc(-100% - 14px),-50%)}',
T + ' .kb-disc--c{transform:translate(-50%,calc(-100% - 14px))}',
T + ' .kb-disc:hover{color:var(--ink);background:rgba(236,235,229,.04)}',
T + ' .kb-disc[aria-pressed="true"]{color:var(--acc)}',
T + ' .kb-wheel__detail{position:relative;padding:clamp(28px,2.6vw,44px) 0 0;border-top:1px solid var(--line);min-height:300px}',
T + ' .kb-wheel__k{font:500 12px/1.2 Barlow,Arial,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:var(--dim)}',
T + ' .kb-wheel__name{margin-top:16px;font:600 clamp(40px,3.6vw,68px)/1.04 "Barlow Condensed",Arial,sans-serif;color:var(--ink)}',
T + ' .kb-wheel__desc{margin-top:16px;max-width:34ch;font-size:clamp(16px,1.15vw,19px);line-height:1.55;color:var(--soft)}',
T + ' .kb-wheel__rel{margin-top:18px;font-size:15px;line-height:1.55;color:var(--mute)}',
T + ' .kb-wheel__rel b{font-weight:500;color:var(--soft)}',
T + ' .kb-link{display:inline-flex;align-items:center;gap:10px;margin-top:28px;min-height:44px;font:500 13px/1 Barlow,Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase;text-decoration:none;color:var(--ink);border-bottom:1px solid var(--line);transition:color .35s var(--ease),border-color .35s var(--ease)}',
T + ' .kb-link .kb-ico{color:var(--acc);transition:transform .45s var(--ease)}',
T + ' .kb-link:hover{color:var(--acc);border-color:var(--acc)}',
T + ' .kb-link:hover .kb-ico{transform:translate(3px,-3px)}',

/* 05 Fikirden gerçek etkiye */
T + ' .kb-impact{padding:clamp(96px,8.4vw,160px) 0;overflow:hidden}',
T + ' .kb-impact__title{display:block;margin-top:.5em;font:700 clamp(76px,10.6vw,212px)/1 "Barlow Condensed","Arial Narrow",Arial,sans-serif;letter-spacing:-.016em;text-transform:uppercase;color:var(--ink)}',
T + ' .kb-impact__a,' + T + ' .kb-impact__b{display:block;will-change:transform}',
T + ' .kb-impact__b{text-align:right;color:var(--acc)}',
T + ' .kb-impact__line{display:flex;align-items:center;gap:0;height:clamp(26px,3vw,52px)}',
T + ' .kb-impact__line i{display:block;height:1px;width:100%;background:linear-gradient(90deg,var(--line),var(--acc));transform-origin:0 50%}',
T + ' .kb-impact__text{margin-top:clamp(40px,3.6vw,64px);max-width:44ch;font-size:clamp(17px,1.2vw,20px);line-height:1.6;color:var(--soft)}',

/* 06 Kültür */
T + ' .kb-culture{padding:clamp(96px,8.4vw,160px) 0}',
T + ' .kb-culture__grid{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);column-gap:calc(var(--gap) * 2);align-items:center;margin-top:clamp(52px,4.6vw,88px)}',
T + ' .kb-field{display:block;width:100%;height:auto}',
T + ' .kb-dot{fill:rgba(236,235,229,.16)}',
T + ' .kb-tl{stroke:rgba(168,207,98,.55);stroke-width:1;stroke-dasharray:1;stroke-dashoffset:0}',
T + ' .kb-td{fill:var(--acc)}',
T + ' .kb-values{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:var(--gap);row-gap:clamp(30px,2.6vw,44px)}',
T + ' .kb-val{padding-top:20px;border-top:1px solid var(--line)}',
T + ' .kb-val dt{font:600 clamp(24px,1.9vw,34px)/1.12 "Barlow Condensed",Arial,sans-serif;color:var(--ink)}',
T + ' .kb-val dd{margin-top:10px;font-size:clamp(15px,1.02vw,17px);line-height:1.6;color:var(--mute)}',

/* 07 CTA */
T + ' .kb-cta{position:relative;padding:clamp(110px,9vw,170px) 0;background:linear-gradient(180deg,var(--bg),var(--g1));overflow:hidden}',
T + ' .kb-cta__title{margin-top:.42em;font:700 clamp(84px,10.4vw,208px)/.98 "Barlow Condensed","Arial Narrow",Arial,sans-serif;letter-spacing:-.016em;text-transform:uppercase;color:var(--ink)}',
T + ' .kb-cta__row{display:flex;align-items:center;flex-wrap:wrap;gap:clamp(24px,3vw,56px);margin-top:clamp(40px,3.4vw,60px)}',
T + ' .kb-cta__actions{display:flex;flex-wrap:wrap;gap:14px}',
T + ' .kb-cta__note{max-width:32ch;font-size:clamp(16px,1.12vw,19px);line-height:1.55;color:var(--soft)}',
T + ' .kb-btn{position:relative;display:inline-flex;align-items:center;justify-content:space-between;gap:22px;height:64px;padding:0 10px 0 28px;border-radius:12px;overflow:hidden;white-space:nowrap;isolation:isolate;',
'  font:500 13.5px/1 Barlow,Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase;text-decoration:none;color:var(--ink);border:1px solid rgba(168,207,98,.42);background:rgba(16,19,17,.72);transition:color .45s var(--ease),border-color .45s ease;touch-action:manipulation}',
T + ' .kb-btn::before{content:"";position:absolute;inset:0;z-index:-1;background:var(--acc);transform:scaleX(0);transform-origin:0 50%;transition:transform .6s cubic-bezier(.65,0,.35,1)}',
T + ' .kb-btn__ico{display:grid;place-items:center;width:44px;height:44px;border-radius:8px;background:rgba(168,207,98,.12);transition:background-color .45s ease,transform .45s var(--ease)}',
T + ' .kb-btn--ghost{border-color:rgba(228,227,221,.22);background:transparent}',
T + ' .kb-btn--ghost .kb-btn__ico{background:rgba(236,235,229,.06)}',
T + ' .kb-btn:hover,' + T + ' .kb-btn:focus-visible{color:#0A0B0B;border-color:var(--acc)}',
T + ' .kb-btn:hover::before,' + T + ' .kb-btn:focus-visible::before{transform:scaleX(1)}',
T + ' .kb-btn:hover .kb-btn__ico,' + T + ' .kb-btn:focus-visible .kb-btn__ico{background:rgba(10,11,11,.12)}',

/* Header paneli body'de durur; v6.48 menüsündeki bağlantı (<a>) satırları için tarayıcı varsayılanlarını nötrler.
   Header modülü değiştirilmez; kurallar yalnızca bu sayfanın paneline (data-n1-kb) uygulanır. */
'.n1h-panel[data-n1-kb],.n1h-panel[data-n1-kb] *,.n1h-panel[data-n1-kb] *::before,.n1h-panel[data-n1-kb] *::after{box-sizing:border-box}',
'.n1h-panel[data-n1-kb] a.n1h-item{text-decoration:none;color:#ecebe6}',
'.n1h-panel[data-n1-kb] .n1h-sub a{text-decoration:none}',
/* Tablet/mobil: panelin arkasında sayfa metni karışmasın diye hafif örtü. Header çubuğu açık kalır, dokunuşlar örtüden
   geçer (dışarı dokununca menü Header'ın kendi davranışıyla kapanır). */
'@media (max-width:1024px){.n1h-panel[data-n1-kb][data-open]::before{content:"";position:fixed;left:0;right:0;bottom:0;top:72px;z-index:-1;pointer-events:none;background:rgba(8,10,9,.8);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}}',
'@media (max-width:767px){.n1h-panel[data-n1-kb][data-open]::before{top:64px}}',
/* Footer partner görseli (tablet/mobil) — ortak iç sayfa CSS'i ile birlikte çalışır */
T + ' .n1ft-partner-art{display:none}',

/* ---------- Tablet (≤1024) ---------- */
'@media (max-width:1024px){',
T + ' .kb-hero{padding-top:128px}',
T + ' .kb-hero__grid{grid-template-columns:minmax(0,1.35fr) minmax(0,1fr)}',
T + ' .kb-hero__title{font-size:clamp(96px,14vw,150px)}',
T + ' .kb-hero__art{max-width:380px}',
T + ' .kb-label{grid-column:1/-1;margin-bottom:22px}',
T + ' .kb-h2,' + T + ' .kb-head__main,' + T + ' .kb-who__body{grid-column:1/-1}',
T + ' .kb-head__main{grid-template-columns:1fr;row-gap:20px}',
T + ' .kb .kb-principles{grid-template-columns:repeat(2,minmax(0,1fr))}',
T + ' .kb-pr:nth-child(3){border-left:0;padding-left:0}',
T + ' .kb-pr:nth-child(n+3){border-top:1px solid var(--line)}',
T + ' .kb-wheel{grid-template-columns:1fr;row-gap:36px}',
T + ' .kb-wheel__stage{max-width:560px}',
T + ' .kb-wheel__detail{min-height:0}',
T + ' .kb-culture__grid{grid-template-columns:1fr;row-gap:44px}',
T + ' .kb-culture__art{max-width:560px}',
/* Header (Stüdyo Hikâyesi'ndeki onaylı iç sayfa düzeni, bu etiket için) */
T + ' n1-header{display:block!important;position:fixed!important;top:0!important;left:0!important;right:0!important;width:100%!important;min-height:0!important;height:auto!important;z-index:900!important;background:rgba(8,10,9,.95);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);border-bottom:1px solid rgba(228,227,221,.07)}',
T + ' n1-header .n1h-bar.site-container{display:grid!important;align-items:center!important;width:calc(100% - 48px)!important;margin-inline:auto!important;padding-inline:0!important;height:72px!important;max-width:100%!important}',
T + ' n1-header .n1h-logo{margin:0!important;flex:none}',
T + ' n1-header .n1h-logo img{width:32px!important;height:32px!important;max-width:none!important}',
T + ' n1-header .n1h-right{align-items:center!important}',
T + ' n1-header .n1h-menu{display:inline-flex!important;height:40px!important;margin:0!important}',
T + ' n1-header .n1h-cta{display:none!important}',
T + ' footer.n1ft .n1ft-partner{opacity:1!important;visibility:visible!important;transform:none!important}',
'}',
'@media (max-width:900px){',
T + ' .n1ft-inner{width:90%}',
'}',

/* ---------- Mobil (≤767) ---------- */
'@media (max-width:767px){',
T + '{font-size:16px}',
T + ' .kb-wrap{width:calc(100% - 40px)}',
T + ' .kb-hero{padding-top:104px}',
T + ' .kb-hero__grid{display:block;position:relative}',
T + ' .kb-hero__art{position:absolute;top:-6px;right:-18%;width:78%;max-width:none;opacity:.34;z-index:0;pointer-events:none}',
T + ' .kb-hero__title{font-size:clamp(84px,24vw,120px)}',
T + ' .kb-hero__lede{font-size:18px;max-width:28ch}',
T + ' .kb-hero__foot{flex-direction:column;align-items:flex-start;gap:18px;margin-top:44px}',
T + ' .kb-motto{flex-direction:column;gap:6px}',
T + ' .kb-motto span+span::before{display:none}',
T + ' .kb-who,' + T + ' .kb-team,' + T + ' .kb-disc-sec,' + T + ' .kb-impact,' + T + ' .kb-culture{padding:68px 0}',
T + ' .kb-grid{display:block}',
T + ' .kb-label{font-size:13px;padding:0;margin-bottom:20px}',
T + ' .kb-h2{font-size:clamp(46px,12.4vw,66px);line-height:1.04}',
T + ' .kb-manifesto{font-size:clamp(34px,9vw,48px);line-height:1.12}',
T + ' .kb-who__cols{grid-template-columns:1fr;row-gap:18px;margin-top:30px}',
T + ' .kb .kb-principles{grid-template-columns:1fr;margin-top:36px}',
T + ' .kb-pr,' + T + ' .kb-pr:nth-child(3){border-left:0;padding:26px 0 30px}',
T + ' .kb-pr+.kb-pr{border-top:1px solid var(--line)}',
T + ' .kb-pr h3{margin-top:22px;font-size:30px}',
T + ' .kb-wheel{margin-top:34px;row-gap:26px}',
T + ' .kb-wheel__stage{aspect-ratio:auto;max-width:none}',
T + ' .kb-wheel__svg{position:relative;inset:auto;display:block;width:min(78%,300px);height:auto;margin:0 auto 22px}',
T + ' .kb-wheel__list{position:static;display:grid;grid-template-columns:1fr 1fr;gap:6px}',
T + ' .kb-disc,' + T + ' .kb-disc--r,' + T + ' .kb-disc--l,' + T + ' .kb-disc--c{position:static;transform:none;width:100%;min-height:46px;padding:10px 12px;white-space:normal;text-align:left;font-size:17px;border:1px solid var(--line);border-radius:10px}',
T + ' .kb-disc[aria-pressed="true"]{border-color:rgba(168,207,98,.6);background:rgba(168,207,98,.06)}',
T + ' .kb-wheel__name{font-size:40px}',
T + ' .kb-impact__title{font-size:clamp(54px,15.6vw,84px);line-height:1.02}',
T + ' .kb-impact__b{text-align:left}',
T + ' .kb-impact__line{height:22px}',
T + ' .kb-culture__grid{margin-top:34px;row-gap:34px}',
T + ' .kb-values{grid-template-columns:1fr;row-gap:22px}',
T + ' .kb-cta{padding:80px 0 92px}',
T + ' .kb-cta__title{font-size:clamp(64px,18vw,96px);line-height:1}',
T + ' .kb-cta__row{flex-direction:column;align-items:stretch;gap:22px;margin-top:30px}',
T + ' .kb-cta__actions{flex-direction:column;gap:11px}',
T + ' .kb-btn{width:100%;height:56px;padding:0 7px 0 18px;font-size:12px}',
T + ' .kb-btn__ico{width:42px;height:42px}',
T + ' n1-header .n1h-bar.site-container{width:calc(100% - 40px)!important;height:64px!important}',
T + ' n1-header .n1h-logo img{width:30px!important;height:30px!important}',
T + ' .n1ft-inner{width:calc(100% - 40px)}',
T + ' .n1ft-top{grid-template-columns:1fr!important;gap:32px;padding:39px 0 36px}',
T + ' .n1ft-col--brand{grid-column:auto}',
T + ' .n1ft-brand{font-size:45px}',
'}',
'@media (max-width:360px){',
T + ' .kb-wrap,' + T + ' .n1ft-inner{width:calc(100% - 32px)}',
T + ' .kb-hero__title{font-size:23vw}',
T + ' .kb-cta__title{font-size:17vw}',
T + ' .kb-wheel__list{grid-template-columns:1fr}',
T + ' n1-header .n1h-bar.site-container{width:calc(100% - 32px)!important}',
'}'
,
/* ========= KISACA BIZ V2 — CREATIVE EXPERIENCE ========= */
T + ' .kb2-accent{color:var(--acc)}',
T + ' .kb2-overline{display:flex;align-items:center;gap:12px;font:500 11px/1.3 Barlow,Arial,sans-serif;letter-spacing:.24em;color:#A1A39C;text-transform:uppercase}',
T + ' .kb2-bullet{width:7px;height:7px;flex:none;background:var(--acc);border-radius:1px}',
T + ' .kb2-display{margin:0;font:600 clamp(62px,8.3vw,164px)/1.1 "Barlow Condensed",Impact,sans-serif;letter-spacing:-.027em;text-transform:uppercase}',
T + ' .kb2-display em{font-style:normal;color:var(--acc)}',
T + ' .kb2-heading-id{font-size:12px;letter-spacing:.16em;color:#8A9087}',
T + ' .kb2-section-head{display:flex;justify-content:space-between;align-items:center;gap:20px;margin-bottom:clamp(46px,6vw,90px)}',
T + ' .kb2-team{padding:clamp(100px,12vw,176px) 0 38px;overflow:hidden}',
T + ' .kb2-team-headgrid{display:grid;grid-template-columns:minmax(0,1.7fr) minmax(260px,.5fr);gap:5vw;align-items:end;margin:45px 0 70px}',
T + ' .kb2-team-title{font-size:clamp(70px,10vw,190px);line-height:1.06}',
T + ' .kb2-team-title>span{display:block}',
T + ' .kb2-team-aside{display:flex;flex-direction:column;align-items:flex-start;gap:26px;padding-bottom:18px}',
T + ' .kb2-team-aside p{font-size:clamp(17px,1.25vw,20px);line-height:1.65;color:var(--soft);max-width:28ch}',
T + ' .kb2-index{font:500 10px/1.3 Barlow,Arial,sans-serif;color:#737970;letter-spacing:.23em}',
T + ' .kb2-orbit{display:grid;place-items:center;position:relative;width:126px;height:126px;isolation:isolate}',
T + ' .kb2-orbit-center{font:700 38px/1 "Barlow Condensed",Arial,sans-serif;letter-spacing:-.045em;color:var(--acc)}',
T + ' .kb2-orbit-ring{position:absolute;inset:7px;border:1px solid rgba(168,207,98,.43);border-radius:50%;box-shadow:0 0 0 19px rgba(168,207,98,.04)}',
T + ' .kb2-orbit-dot{position:absolute;left:50%;top:0;width:9px;height:9px;background:var(--acc);border-radius:50%;transform:translateX(-50%)}',
T + ' .kb2-team-nav,.kb2-team-under{display:flex;align-items:center;justify-content:space-between;gap:20px}',
T + ' .kb2-team-nav{border-top:1px solid var(--line);padding-top:22px}',
T + ' .kb2-team-nav>span,.kb2-team-under>span{font:500 11px/1.4 Barlow,Arial,sans-serif;letter-spacing:.17em;color:#92978E}',
T + ' .kb2-arrows{display:flex;gap:7px}',
T + ' .kb2-nav{width:48px;height:48px;display:grid;place-items:center;border:1px solid var(--line);border-radius:50%;background:#0E100F;color:var(--ink);cursor:pointer;transition:background .25s,color .25s,border-color .25s}',
T + ' .kb2-nav:hover,.kb2-nav:focus-visible{background:var(--acc);color:#080A09;border-color:var(--acc)}',
T + ' .kb2-rail{width:100%;margin-top:24px;overflow-x:auto;overflow-y:hidden;overscroll-behavior-inline:contain;scroll-snap-type:x proximity;scrollbar-width:thin;scrollbar-color:#353C34 transparent;outline-offset:-4px}',
T + ' .kb2-rail-track{display:flex;gap:16px;width:max-content;padding:0 5vw 24px}',
T + ' .kb2-card{position:relative;display:flex;flex-direction:column;justify-content:space-between;flex:0 0 clamp(360px,40vw,660px);min-height:clamp(450px,42vw,640px);background:#111513;border:1px solid rgba(168,207,98,.15);padding:clamp(24px,2.5vw,42px);overflow:hidden;scroll-snap-align:start;isolation:isolate}',
T + ' .kb2-card:nth-child(2){background:#161817}.kb2-card:nth-child(3){background:#101A14}.kb2-card:nth-child(4){background:#171916}',
T + ' .kb2-card:before{content:"";position:absolute;inset:0;z-index:-2;pointer-events:none;background:radial-gradient(circle at 50% 34%,rgba(168,207,98,.07),transparent 55%)}',
T + ' .kb2-card-top{display:flex;justify-content:space-between;gap:18px;color:#99A395;font:500 11px/1 Barlow,Arial,sans-serif;letter-spacing:.17em}',
T + ' .kb2-card-art{position:relative;margin:auto;display:grid;place-items:center;aspect-ratio:1;width:min(83%,375px);border:1px solid rgba(168,207,98,.18);border-radius:50%;transform:rotate(-9deg);transition:transform .9s cubic-bezier(.22,1,.36,1)}',
T + ' .kb2-card:nth-child(2) .kb2-card-art{border-radius:3%;transform:rotate(8deg)}',
T + ' .kb2-card:nth-child(3) .kb2-card-art{border-radius:50% 50% 8% 8%;transform:rotate(9deg)}',
T + ' .kb2-card:nth-child(4) .kb2-card-art{border-radius:6%;transform:rotate(-12deg)}',
T + ' .kb2-card:hover .kb2-card-art{transform:rotate(0deg) scale(1.05)}',
T + ' .kb2-card-symbol{font:600 clamp(180px,17vw,300px)/1 "Barlow Condensed",Impact,sans-serif;color:transparent;-webkit-text-stroke:1px rgba(168,207,98,.64);text-stroke:1px rgba(168,207,98,.64);letter-spacing:-.09em}',
T + ' .kb2-card-grain{position:absolute;inset:16%;border:1px dashed rgba(236,235,229,.2);border-radius:50%}',
T + ' .kb2-card-ray{position:absolute;width:110%;height:1px;background:rgba(168,207,98,.24)}',
T + ' .kb2-card-ray-1{transform:rotate(45deg)}.kb2-card-ray-2{transform:rotate(-45deg)}',
T + ' .kb2-card-copy{position:relative;z-index:1}',
T + ' .kb2-card-copy h3{font:600 clamp(37px,3.8vw,69px)/1.12 "Barlow Condensed",Impact,sans-serif;letter-spacing:-.02em;color:var(--acc)}',
T + ' .kb2-card-copy strong{display:block;margin-top:10px;font:500 clamp(19px,1.5vw,25px)/1.25 Barlow,sans-serif}',
T + ' .kb2-card-copy p{margin-top:8px;font:400 15px/1.65 Barlow,sans-serif;color:#A7ADA4;max-width:46ch}',
T + ' .kb2-team-under{padding:23px 0 0}',
T + ' .kb2-brands{padding:clamp(100px,12vw,195px) 0;background:#0C0F0D}',
T + ' .kb2-sub-link{display:inline-flex;align-items:center;gap:10px;font:500 11px/1.4 Barlow,sans-serif;letter-spacing:.14em;text-decoration:none;color:#DEE0D7}',
T + ' .kb2-sub-link span{color:var(--acc)}',
T + ' .kb2-brands-title{max-width:1500px}',
T + ' .kb2-brands-title span{color:var(--acc)}',
T + ' .kb2-brands-desc{max-width:680px;margin:clamp(24px,3vw,52px) 0 0 auto;color:#B5B9B0;font:400 clamp(17px,1.45vw,22px)/1.6 Barlow,sans-serif}',
T + ' .kb2-brand-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:0;margin-top:clamp(56px,7vw,112px);border-top:1px solid var(--line);border-left:1px solid var(--line)}',
T + ' .kb2-brand{display:flex;justify-content:space-between;flex-direction:column;position:relative;gap:38px;min-height:218px;border-right:1px solid var(--line);border-bottom:1px solid var(--line);padding:26px;overflow:hidden;transition:background .4s}',
T + ' .kb2-brand:hover{background:rgba(168,207,98,.052)}',
T + ' .kb2-brand-index{color:#7E867B;letter-spacing:.16em;font-size:10px}',
T + ' .kb2-brand strong{display:block;font:600 clamp(26px,2.4vw,46px)/1.08 "Barlow Condensed",Impact,sans-serif;letter-spacing:-.02em}',
T + ' .kb2-brand small{display:block;margin-top:6px;color:#8E968B;font:400 11px/1.3 Barlow,sans-serif;letter-spacing:.19em}',
T + ' .kb2-brand-dot{position:absolute;right:25px;top:25px;width:6px;height:6px;background:var(--acc);border-radius:50%;opacity:0;transition:opacity .25s}',
T + ' .kb2-brand:hover .kb2-brand-dot{opacity:1}',
T + ' .kb2-brand-note{margin-top:20px;color:#828980;font-size:12px;line-height:1.5}',
T + ' .kb2-standards{padding:clamp(110px,13vw,210px) 0}',
T + ' .kb2-standards-heading{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(220px,.5fr);align-items:end;gap:5vw;margin-bottom:clamp(60px,8vw,130px)}',
T + ' .kb2-standards-heading p{font-size:18px;line-height:1.65;max-width:32ch;color:#9EA59B}',
T + ' .kb2-std-list{border-top:1px solid #343B35}',
T + ' .kb2-std{border-bottom:1px solid #343B35;position:relative}',
T + ' .kb2-std summary{display:grid;grid-template-columns:75px minmax(0,1fr) 125px 52px;align-items:center;gap:14px;list-style:none;cursor:pointer;min-height:126px;padding:15px 0;transition:background .3s}',
T + ' .kb2-std summary::-webkit-details-marker{display:none}',
T + ' .kb2-std summary::marker{content:""}',
T + ' .kb2-std summary:hover,.kb2-std[open] summary{background:rgba(168,207,98,.035)}',
T + ' .kb2-std-n{font-size:12px;color:var(--acc);letter-spacing:.14em}',
T + ' .kb2-std-main{font:600 clamp(30px,4.1vw,66px)/1.14 "Barlow Condensed",Impact,sans-serif;letter-spacing:-.01em}',
T + ' .kb2-std-word{font-size:10px;letter-spacing:.15em;color:#879288;text-align:right}',
T + ' .kb2-std-toggle{display:grid;place-items:center;width:45px;height:45px;border:1px solid rgba(168,207,98,.3);border-radius:50%;color:var(--acc);transition:background .25s,transform .35s}',
T + ' .kb2-std[open] .kb2-std-toggle{transform:rotate(90deg);background:rgba(168,207,98,.09)}',
T + ' .kb2-std-detail{padding:0 60px 32px 89px;max-width:850px}',
T + ' .kb2-std-detail p{font-size:clamp(16px,1.5vw,22px);line-height:1.6;color:#AAB0A7}',
T + ' .kb2-expertise{padding:clamp(100px,12vw,190px) 0;background:#0D100E}',
T + ' .kb2-exp-heading{margin-bottom:clamp(50px,7vw,110px)}',
T + ' .kb2-exp-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}',
T + ' .kb2-exp-card{position:relative;display:flex;flex-direction:column;justify-content:space-between;min-height:clamp(580px,52vw,760px);padding:clamp(26px,3vw,55px);overflow:hidden;background:#141815;isolation:isolate}',
T + ' .kb2-exp-card--2{background:#192019}.kb2-exp-card--3{background:#131917}.kb2-exp-card--4{background:#1B1D19}',
T + ' .kb2-exp-card:after{content:"";position:absolute;inset:0;pointer-events:none;z-index:-1;background:radial-gradient(circle at 55% 40%,rgba(168,207,98,.08),transparent 53%)}',
T + ' .kb2-exp-top{display:flex;justify-content:space-between;align-items:center;color:#AAB3A6;font-size:11px;letter-spacing:.19em}',
T + ' .kb2-exp-stamp{color:var(--acc);font:700 33px/1 "Barlow Condensed",Impact,sans-serif}',
T + ' .kb2-exp-visual{position:relative;display:grid;place-items:center;aspect-ratio:1;width:min(85%,390px);margin:auto;transform:rotate(-9deg);transition:transform .8s}',
T + ' .kb2-exp-card:hover .kb2-exp-visual{transform:rotate(0deg) scale(1.07)}',
T + ' .kb2-exp-visual-ring{position:absolute;inset:5%;border:1px solid rgba(168,207,98,.42);border-radius:50%;box-shadow:0 0 0 20px rgba(168,207,98,.015),0 0 0 75px rgba(168,207,98,.012)}',
T + ' .kb2-exp-card--2 .kb2-exp-visual-ring{border-radius:10%;transform:rotate(28deg)}',
T + ' .kb2-exp-card--3 .kb2-exp-visual-ring{border-radius:48% 5% 48% 5%;transform:rotate(30deg)}',
T + ' .kb2-exp-card--4 .kb2-exp-visual-ring{border-radius:6% 46% 8% 46%;transform:rotate(-18deg)}',
T + ' .kb2-exp-letter{font:700 clamp(160px,22vw,365px)/1 "Barlow Condensed",Impact,sans-serif;color:transparent;-webkit-text-stroke:1px rgba(168,207,98,.7)}',
T + ' .kb2-exp-body h3{font:600 clamp(40px,4.6vw,82px)/1.12 "Barlow Condensed",Impact,sans-serif;letter-spacing:-.025em}',
T + ' .kb2-exp-body p{font-size:clamp(18px,1.5vw,24px);margin-top:12px;line-height:1.4}',
T + ' .kb2-exp-body small{display:block;font-size:13px;letter-spacing:.03em;color:#A2ABA0;margin-top:16px}',
T + ' .kb2-exp-body a{display:inline-flex;align-items:center;gap:13px;margin-top:28px;border-bottom:1px solid rgba(168,207,98,.65);padding-bottom:8px;color:var(--acc);font-size:11px;font-weight:600;letter-spacing:.16em;text-decoration:none}',
T + ' .kb2-exp-body a svg{transition:transform .3s}',
T + ' .kb2-exp-body a:hover svg{transform:translate(3px,-3px)}',
T + ' .kb2-impact{position:relative;overflow:hidden;padding:clamp(120px,18vw,270px) 0;background:#101612}',
T + ' .kb2-impact-inner{position:relative;isolation:isolate}',
T + ' .kb2-impact-message{position:relative;z-index:1;margin:50px 0 90px;font:700 clamp(102px,17.8vw,340px)/.99 "Barlow Condensed",Impact,sans-serif;letter-spacing:-.035em}',
T + ' .kb2-impact-message>span{display:block}',
T + ' .kb2-impact-bottom{position:relative;z-index:1;display:flex;align-items:start;justify-content:space-between;gap:30px}',
T + ' .kb2-impact-line{height:1px;background:var(--acc);flex:1;transform-origin:left}',
T + ' .kb2-impact-bottom p{max-width:520px;color:#BAC5B4;font-size:clamp(17px,1.5vw,23px);line-height:1.6}',
T + ' .kb2-impact-seal{position:absolute;right:-7%;top:5%;width:400px;height:400px;border-radius:50%;border:1px solid rgba(168,207,98,.18);display:flex;flex-direction:column;align-items:center;justify-content:center;transform:rotate(-22deg);z-index:-1}',
T + ' .kb2-impact-seal:before{content:"";position:absolute;inset:20px;border:1px dashed rgba(168,207,98,.1);border-radius:50%}',
T + ' .kb2-impact-seal>span:first-child{font:700 190px/1 "Barlow Condensed",Impact,sans-serif;color:rgba(168,207,98,.07)}',
T + ' .kb2-impact-seal>span:last-child{font-size:9px;letter-spacing:.2em;color:rgba(168,207,98,.27)}',
T + ' .kb2-cta-anchor{scroll-margin-top:90px}',
'@media(max-width:1100px){',
T + ' .kb2-team-headgrid{grid-template-columns:1fr 260px}',
T + ' .kb2-team-title{font-size:clamp(72px,10.4vw,140px)}',
T + ' .kb2-standards-heading .kb2-display{font-size:clamp(45px,6vw,74px)}',
T + ' .kb2-brand-grid{grid-template-columns:repeat(2,minmax(0,1fr))}',
T + ' .kb2-std summary{grid-template-columns:55px minmax(0,1fr) 80px 44px}',
'}',
'@media(max-width:767px){',
T + ' .kb2-display{font-size:clamp(48px,11.5vw,78px);line-height:1.13}',
T + ' .kb2-overline{font-size:10px;letter-spacing:.14em}',
T + ' .kb2-team{padding:84px 0 18px}',
T + ' .kb2-team-headgrid{display:block;margin:32px 0}',
T + ' .kb2-team-title{font-size:clamp(60px,14.8vw,96px);line-height:1.13}',
T + ' .kb2-team-aside{flex-direction:row;align-items:center;gap:20px;margin-top:32px;padding:0}',
T + ' .kb2-team-aside p{font-size:15px;line-height:1.55;flex:1}',
T + ' .kb2-orbit{flex:0 0 88px;width:88px;height:88px}',
T + ' .kb2-orbit-center{font-size:30px}',
T + ' .kb2-index{display:none}',
T + ' .kb2-team-nav>span{max-width:180px;font-size:9px}',
T + ' .kb2-nav{width:39px;height:39px}',
T + ' .kb2-rail{overflow:visible;scroll-snap-type:none}',
T + ' .kb2-rail-track{width:auto;display:grid;grid-template-columns:1fr;gap:10px;padding:0 20px 14px}',
T + ' .kb2-card{flex:none;width:100%;min-height:460px;padding:26px}',
T + ' .kb2-card-art{width:200px}',
T + ' .kb2-card-symbol{font-size:160px}',
T + ' .kb2-card-copy h3{font-size:clamp(30px,8.6vw,43px);line-height:1.15}',
T + ' .kb2-team-under{display:none}',
T + ' .kb2-arrows{display:none}',
T + ' .kb2-brands{padding:88px 0}',
T + ' .kb2-brand-grid{grid-template-columns:repeat(2,minmax(0,1fr));margin-top:44px}',
T + ' .kb2-brand{min-height:165px;padding:18px;gap:20px}',
T + ' .kb2-brand strong{font-size:clamp(22px,5.7vw,36px)}',
T + ' .kb2-brand small{font-size:9px}',
T + ' .kb2-sub-link{font-size:9px}',
T + ' .kb2-brands-desc{font-size:16px;margin:24px 0 0}',
T + ' .kb2-standards{padding:88px 0}',
T + ' .kb2-standards-heading{display:block;margin-bottom:45px}',
T + ' .kb2-standards-heading p{font-size:16px;margin-top:20px}',
T + ' .kb2-standards-heading .kb2-display{font-size:clamp(40px,10vw,65px)}',
T + ' .kb2-std summary{grid-template-columns:30px minmax(0,1fr) 37px;min-height:100px;gap:9px}',
T + ' .kb2-std-main{font-size:clamp(26px,7vw,40px);line-height:1.17}',
T + ' .kb2-std-word{display:none}',
T + ' .kb2-std-toggle{width:35px;height:35px}',
T + ' .kb2-std-detail{padding:0 12px 24px 39px}',
T + ' .kb2-std-detail p{font-size:15px}',
T + ' .kb2-expertise{padding:88px 0}',
T + ' .kb2-exp-grid{grid-template-columns:1fr}',
T + ' .kb2-exp-card{min-height:530px;padding:26px}',
T + ' .kb2-exp-visual{width:70%}',
T + ' .kb2-exp-letter{font-size:190px}',
T + ' .kb2-exp-body h3{font-size:clamp(34px,9vw,51px)}',
T + ' .kb2-exp-body small{font-size:12px}',
T + ' .kb2-impact{padding:110px 0}',
T + ' .kb2-impact-message{font-size:clamp(86px,21vw,150px);line-height:1.07;margin:45px 0 65px}',
T + ' .kb2-impact-bottom{flex-direction:column;gap:25px}',
T + ' .kb2-impact-line{width:100%;flex:none}',
T + ' .kb2-impact-bottom p{font-size:17px}',
T + ' .kb2-impact-seal{right:-55%;top:18%;width:300px;height:300px}',
'}',
'@media(max-width:360px){',
T + ' .kb2-team-title{font-size:14.5vw}',
T + ' .kb2-brand{padding:14px}',
T + ' .kb2-brand strong{font-size:21px}',
T + ' .kb2-impact-message{font-size:20.5vw}',
'}',
'@media(prefers-reduced-motion:reduce){',
T + ' .kb2-card-art,' + T + ' .kb2-exp-visual,' + T + ' .kb2-nav,' + T + ' .kb2-exp-body a svg{transition:none!important}',
'}',
  ].join('\n');

  /* ---------- Bileşen ---------- */
  class KisacaBiz extends HTMLElement {
    connectedCallback() {
      if (this._on) return;
      this._on = true;
      this._cleanups = [];
      var base = this.getAttribute('deps-base');
      var url = function (k) { return (base ? base.replace(/\/?$/, '/') + 'gh@' : CDN) + PATHS[k]; };
      this._url = url;
      this.classList.add('n1-inner-page');
      this._mount().catch((e) => {
        console.error('[n1-kisaca-biz-v2]', e);
        if (!this.querySelector('main.kb')) this.innerHTML = '<p style="padding:40px 5%;color:#ECEBE5;font:16px Barlow,Arial,sans-serif">Kısaca Biz yüklenemedi. Lütfen sayfayı yenileyin.</p>';
      });
    }

    async _mount() {
      var self = this, url = this._url;
      // 1) Sayfa CSS'i ve içerik hemen (ağ beklemeden)
      if (!document.getElementById('n1-kb-v2-style')) {
        var st = document.createElement('style'); st.id = 'n1-kb-v2-style'; st.textContent = CSS; document.head.appendChild(st);
      }
      this.innerHTML = '<div id="ust" style="height:0"></div>' + markup();
      this._wheel();
      this._creativeControls();
      this._anchors();

      // 2) Ortak kaynaklar paralel
      var fonts = loadCss(FONTS).catch(function (e) { console.warn('[n1-kisaca-biz-v2] Font yüklenemedi, yedek font kullanılıyor', e); });
      var shared = Promise.all([loadCss(url('footerCss')), loadCss(url('responsive')), loadJs(url('markup'), function () { return !!window.N1_SITE_MARKUP; })]);
      await shared;
      if (!this._on) return;

      // 3) Header / Footer / WhatsApp — onaylı v6.48 işaretlemesinden
      var tpl = document.createElement('template');
      tpl.innerHTML = String(window.N1_SITE_MARKUP || '').split('{{ASSETS}}').join(url('assets'));
      var hdr = tpl.content.querySelector('n1-header'), ft = tpl.content.querySelector('[data-n1-footer]'), fc = tpl.content.querySelector('n1-floating-controls');
      if (!hdr || !ft) throw new Error('Onaylı Header/Footer işaretlemesi bulunamadı');
      var main = this.querySelector('main.kb');

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
          } catch (e) { console.warn('[n1-kisaca-biz-v2] Menü verisi okunamadı; onaylı veri olduğu gibi kullanılıyor', e); }
        }
        this.insertBefore(header, main);
        this._header = header;
      }

      var fw = document.createElement('template'); fw.innerHTML = ft.outerHTML;
      var footerRoot = fw.content.querySelector('footer.n1ft');
      var partners = footerRoot && footerRoot.querySelector('.n1ft-partners');
      if (partners) {
        var pic = document.createElement('picture'); pic.className = 'n1ft-partner-art';
        var src = document.createElement('source'); src.media = '(max-width: 767px)'; src.srcset = PARTNER_ART.mobile;
        var img = document.createElement('img'); img.src = PARTNER_ART.tablet; img.alt = '1N Digital Media iş ortakları ve sertifikalar'; img.loading = 'lazy'; img.decoding = 'async';
        img.onerror = function () { pic.classList.add('n1-art-failed'); };
        pic.append(src, img); partners.parentNode.insertBefore(pic, partners);
      }
      // Telif yılı güncel yıla çekilir (Footer tasarımı ve diğer içerik değişmez)
      var copy = fw.content.querySelector('.n1ft-copy');
      if (copy) copy.textContent = copy.textContent.replace(/©\s*\d{4}/, '© ' + new Date().getFullYear());
      this.append(fw.content);

      var otherFc = [].some.call(document.querySelectorAll('n1-floating-controls'), function (f) { return !self.contains(f); }) || !!document.querySelector('.n1fc:not([data-n1-kb])');
      if (fc && !otherFc) {
        var floating = fc.cloneNode(true);
        if (matchMedia('(max-width:1024px)').matches) floating.setAttribute('show-after', '0.5');
        this.append(floating);
        document.body.classList.add('n1-inner-fc-enabled');
        this._fcOwned = true;
      }

      // 4) GSAP (yalnızca yoksa) ve paylaşılan modüller, onaylı sırayla
      await fonts;
      if (!window.gsap) await loadJs(GSAP, function () { return !!window.gsap; }).catch(function (e) { console.warn('[n1-kisaca-biz-v2] GSAP yüklenemedi; içerik animasyonsuz gösterilir', e); });
      if (window.gsap && !window.ScrollTrigger) await loadJs(ST, function () { return !!window.ScrollTrigger; }).catch(function (e) { console.warn('[n1-kisaca-biz-v2] ScrollTrigger yüklenemedi', e); });
      if (!this._on) return;
      await loadJs(url('links'), null, true);
      if (this._header) {
        if (!customElements.get('n1-header')) await loadJs(url('header'), function () { return !!customElements.get('n1-header'); });
        else if (!this._header.panel && this._header.connectedCallback) this._header.connectedCallback();
        if (this._header.panel) { this._header.panel.classList.add('n1-inner-panel'); this._header.panel.setAttribute('data-n1-kb', ''); }
      }
      await loadJs(url('footerJs'), null, true);
      if (this._fcOwned && !customElements.get('n1-floating-controls')) await loadJs(url('floating'), function () { return !!customElements.get('n1-floating-controls'); });
      var layer = document.querySelector('body > .n1fc:last-of-type'); if (this._fcOwned && layer) layer.setAttribute('data-n1-kb', '');
      if (!this._on) return;
      this._animate();
    }

    _anchors() {
      var a = this.querySelector('.kb-scroll'), self = this;
      var h = function (e) {
        e.preventDefault();
        var t = self.querySelector('#kb-biz'); if (!t) return;
        var y = t.getBoundingClientRect().top + scrollY - 72;
        scrollTo({ top: y, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      };
      a.addEventListener('click', h); this._cleanups.push(function () { a.removeEventListener('click', h); });
    }

    _wheel() {
      var root = this.querySelector('[data-kb="wheel"]'); if (!root) return;
      var btns = [].slice.call(root.querySelectorAll('.kb-disc')), chords = [].slice.call(root.querySelectorAll('.kb-chord')), nodes = [].slice.call(root.querySelectorAll('.kb-node'));
      var nm = root.querySelector('.kb-wheel__name'), ds = root.querySelector('.kb-wheel__desc'), rl = root.querySelector('.kb-wheel__rel'), go = root.querySelector('.kb-wheel__go');
      var set = function (i) {
        var d = DISCIPLINES[i];
        btns.forEach(function (b, k) { b.setAttribute('aria-pressed', String(k === i)); });
        nodes.forEach(function (n, k) { n.classList.toggle('is-on', k === i); n.classList.toggle('is-rel', d.r.indexOf(k) > -1); });
        chords.forEach(function (c) {
          var a = +c.getAttribute('data-a'), b = +c.getAttribute('data-b');
          c.classList.toggle('is-rel', (a === i && d.r.indexOf(b) > -1) || (b === i && d.r.indexOf(a) > -1));
        });
        nm.textContent = d.n; ds.textContent = d.d;
        rl.innerHTML = 'En yakın çalıştığı alanlar: <b>' + d.r.map(function (k) { return DISCIPLINES[k].n; }).join(', ') + '</b>';
        go.setAttribute('href', d.h); go.setAttribute('aria-label', d.n + ' sayfasını incele');
      };
      var onClick = function (e) { var b = e.target.closest('.kb-disc'); if (b) set(+b.getAttribute('data-i')); };
      var onKey = function (e) {
        var b = e.target.closest('.kb-disc'); if (!b) return;
        var i = +b.getAttribute('data-i'), n = btns.length, j = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') j = (i + 1) % n;
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') j = (i - 1 + n) % n;
        if (j != null) { e.preventDefault(); btns[j].focus(); set(j); }
      };
      var onHover = function (e) { if (!matchMedia('(hover:hover)').matches) return; var b = e.target.closest('.kb-disc'); if (b) set(+b.getAttribute('data-i')); };
      root.addEventListener('click', onClick); root.addEventListener('keydown', onKey); root.addEventListener('pointerover', onHover);
      this._cleanups.push(function () { root.removeEventListener('click', onClick); root.removeEventListener('keydown', onKey); root.removeEventListener('pointerover', onHover); });
      set(0);
    }

    _creativeControls() {
      var self = this;
      var rail = this.querySelector('.kb2-rail');
      var prev = this.querySelector('.kb2-nav-prev');
      var next = this.querySelector('.kb2-nav-next');
      if (rail && prev && next) {
        var step = function () {
          var card = rail.querySelector('.kb2-card');
          return card ? card.getBoundingClientRect().width + 16 : rail.clientWidth * .85;
        };
        var scroll = function (direction) {
          rail.scrollBy({ left: step() * direction, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
        };
        var onPrev = function () { scroll(-1); };
        var onNext = function () { scroll(1); };
        prev.addEventListener('click', onPrev);
        next.addEventListener('click', onNext);
        this._cleanups.push(function () { prev.removeEventListener('click', onPrev); next.removeEventListener('click', onNext); });
      }
      // Only one expanded standard row: accessible native <details> behaviour.
      var standards = [].slice.call(this.querySelectorAll('.kb2-std'));
      standards.forEach(function (d) {
        var closeOthers = function () {
          if (!d.open) return;
          standards.forEach(function (other) { if (other !== d && other.open) other.open = false; });
        };
        d.addEventListener('toggle', closeOthers);
        self._cleanups.push(function () { d.removeEventListener('toggle', closeOthers); });
      });
    }

    _animate() {
      var gsap = window.gsap, STg = window.ScrollTrigger, self = this;
      if (!gsap) return;                                     // içerik zaten görünür
      if (STg) gsap.registerPlugin(STg);
      var q = function (s) { return [].slice.call(self.querySelectorAll(s)); };
      this._ctx = gsap.context(function () {
        var mm = gsap.matchMedia();
        self._mm = mm;
        // Hero: tek sahne. Yalnızca hareket tercihine bağlı; genişlik/dokunmatik değişiminde yeniden oynatılmaz.
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          var E = 'power3.out';
          var tl = gsap.timeline({ defaults: { ease: E } });
          tl.from(q('.kb-hero [data-kb="tag"]'), { autoAlpha: 0, y: 12, duration: .6 })
            .from(q('.kb-hero__title .kb-ln>span'), { yPercent: 112, duration: 1.1, stagger: .1 }, '<.1')
            .from(q('.kb-hl'), { strokeDashoffset: 1, duration: 1.4, stagger: .06, ease: 'power2.inOut' }, '<.1')
            .from(q('.kb-hc, .kb-hx'), { autoAlpha: 0, duration: 1, stagger: .08 }, '<.3')
            .from(q('.kb-hsq'), { scale: .4, transformOrigin: '50% 50%', autoAlpha: 0, duration: .8 }, '-=.6')
            .from(q('.kb-hdot'), { scale: 0, transformOrigin: '50% 50%', duration: .5, ease: 'back.out(2)' }, '-=.4')
            .fromTo(q('.kb-hpulse'), { attr: { r: 9 }, autoAlpha: .9 }, { attr: { r: 60 }, autoAlpha: 0, duration: 1.4, ease: 'power2.out' }, '-=.2')
            .from(q('.kb-hero__lede, .kb-hero__foot'), { autoAlpha: 0, y: 18, duration: .9, stagger: .12 }, '-=1.6');
        });
        // Masaüstü + fare: geometrinin hafif imleç paralaksı
        mm.add('(prefers-reduced-motion: no-preference) and (min-width: 1025px) and (hover: hover)', function () {
          {
            var art = self.querySelector('.kb-hg'), hero = self.querySelector('.kb-hero');
            var xTo = gsap.quickTo(art, 'x', { duration: .9, ease: 'power3' }), yTo = gsap.quickTo(art, 'y', { duration: .9, ease: 'power3' });
            var mv = function (e) { var r = hero.getBoundingClientRect(); xTo(((e.clientX - r.left) / r.width - .5) * 18); yTo(((e.clientY - r.top) / r.height - .5) * 14); };
            hero.addEventListener('pointermove', mv);
            return function () { hero.removeEventListener('pointermove', mv); };
          }
        });
        if (!STg) return;
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          // Satır maskeleri (hero dışı)
          q('.kb-sec [data-kb="lines"]').forEach(function (h) {
            gsap.from(h.querySelectorAll('.kb-ln>span'), { yPercent: 112, duration: 1.05, ease: 'power3.out', stagger: .09, scrollTrigger: { trigger: h, start: 'top 86%', once: true } });
          });
          q('.kb-sec [data-kb="fade"]').forEach(function (el) {
            gsap.from(el, { autoAlpha: 0, y: 22, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
          });
          // İlkeler: kademeli giriş + sembol çizimi
          q('.kb-principles').forEach(function (g) {
            var items = g.querySelectorAll('.kb-pr');
            gsap.from(items, { autoAlpha: 0, y: 34, duration: .9, ease: 'power3.out', stagger: .1, scrollTrigger: { trigger: g, start: 'top 84%', once: true } });
            gsap.from(g.querySelectorAll('.kb-glyph > *'), { scale: .6, transformOrigin: '50% 50%', autoAlpha: 0, duration: .8, stagger: .05, ease: 'power2.out', scrollTrigger: { trigger: g, start: 'top 84%', once: true } });
          });
          // Disiplin çarkı
          var wh = self.querySelector('[data-kb="wheel"]');
          if (wh) {
            var wtl = gsap.timeline({ scrollTrigger: { trigger: wh, start: 'top 80%', once: true } });
            wtl.from(wh.querySelectorAll('.kb-wheel__ring'), { scale: .85, transformOrigin: '50% 50%', autoAlpha: 0, duration: 1, ease: 'power3.out', stagger: .1 })
               .from(wh.querySelectorAll('.kb-node'), { scale: 0, transformOrigin: '50% 50%', duration: .5, stagger: .06, ease: 'back.out(2)' }, '-=.6')
               .from(wh.querySelectorAll('.kb-chord'), { autoAlpha: 0, duration: .8, stagger: .01 }, '-=.4')
               .from(wh.querySelectorAll('.kb-disc'), { autoAlpha: 0, duration: .6, stagger: .05 }, '-=.8')
               .from(wh.querySelector('.kb-wheel__detail'), { autoAlpha: 0, y: 20, duration: .8, ease: 'power3.out' }, '-=.6');
          }
          // Fikirden gerçek etkiye: kaydırmaya bağlı hafif tipografik geçiş (pin yok)
          var imp = self.querySelector('.kb-impact__title');
          if (imp) {
            gsap.fromTo(imp.querySelector('.kb-impact__a'), { xPercent: -6 }, { xPercent: 0, ease: 'none', scrollTrigger: { trigger: imp, start: 'top bottom', end: 'center 45%', scrub: .6 } });
            gsap.fromTo(imp.querySelector('.kb-impact__b'), { xPercent: 6 }, { xPercent: 0, ease: 'none', scrollTrigger: { trigger: imp, start: 'top bottom', end: 'center 45%', scrub: .6 } });
            gsap.fromTo(imp.querySelector('.kb-impact__line i'), { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: imp, start: 'top 80%', end: 'center 45%', scrub: .6 } });
            gsap.from(imp.querySelectorAll('.kb-ln>span'), { yPercent: 112, duration: 1.1, ease: 'power3.out', stagger: .12, scrollTrigger: { trigger: imp, start: 'top 82%', once: true } });
          }
          // Ekip takımyıldızı
          var fld = self.querySelector('[data-kb="field"]');
          if (fld) {
            var ftl = gsap.timeline({ scrollTrigger: { trigger: fld, start: 'top 82%', once: true } });
            ftl.from(fld.querySelectorAll('.kb-dot'), { autoAlpha: 0, duration: .5, stagger: { each: .006, from: 'random' } })
               .from(fld.querySelectorAll('.kb-tl'), { strokeDashoffset: 1, duration: 1.1, stagger: .08, ease: 'power2.inOut' }, '-=.3')
               .from(fld.querySelectorAll('.kb-td'), { scale: 0, transformOrigin: '50% 50%', duration: .45, stagger: .06, ease: 'back.out(2.2)' }, '-=1');
          }
          // V2: Team, brands, standards, expertise and statement.
          q('.kb2-overline, .kb2-section-head, .kb2-display').forEach(function (el) {
            gsap.from(el, { autoAlpha: 0, y: 26, duration: .85, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
          });
          q('.kb2-card').forEach(function (el) {
            gsap.from(el, { autoAlpha: 0, y: 45, duration: .8, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 95%', once: true } });
          });
          q('.kb2-brand, .kb2-exp-card').forEach(function (el) {
            gsap.from(el, { autoAlpha: 0, y: 30, duration: .85, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
          });
          q('.kb2-std').forEach(function (el) {
            gsap.from(el, { autoAlpha: 0, x: 26, duration: .7, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 94%', once: true } });
          });
          var statement = self.querySelector('.kb2-impact-message');
          if (statement) {
            gsap.from(statement.querySelectorAll('span'), {
              y: 44, autoAlpha: 0, duration: .95, stagger: .13, ease: 'power3.out',
              scrollTrigger: { trigger: statement, start: 'top 86%', once: true }
            });
          }
          q('.kb-values').forEach(function (g) {
            gsap.from(g.querySelectorAll('.kb-val'), { autoAlpha: 0, y: 24, duration: .8, ease: 'power3.out', stagger: .08, scrollTrigger: { trigger: g, start: 'top 86%', once: true } });
          });
        });
      }, this);

      // Kontrollü yenileme: fontlar + yükleme bitince bir kez; sonra yalnızca yükseklik gerçekten değişirse
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
          this._cleanups.push(function () { clearTimeout(t); });
        }
      }
    }

    disconnectedCallback() {
      this._on = false;
      if (this._ro) { this._ro.disconnect(); this._ro = null; }
      if (this._ctx) { this._ctx.revert(); this._ctx = null; }          // tweens + ScrollTrigger'lar + matchMedia
      var self = this;                                                  // paylaşılan Footer modülünün bu sayfadaki tetikleyicileri
      if (window.ScrollTrigger) window.ScrollTrigger.getAll().forEach(function (t) { var el = t.trigger; if (el && (self.contains(el) || !el.isConnected)) t.kill(); });
      (this._cleanups || []).forEach(function (f) { try { f(); } catch (e) {} });
      this._cleanups = [];
      if (this._fcOwned) document.body.classList.remove('n1-inner-fc-enabled');
      this._fcOwned = false; this._header = null;
      this.replaceChildren();                                           // Header paneli ve WhatsApp katmanı kendi disconnectedCallback'lerinde kaldırılır
      var st = document.getElementById('n1-kb-v2-style'); if (st && !document.querySelector(TAG)) st.remove();
    }
  }
  customElements.define(TAG, KisacaBiz);
})();