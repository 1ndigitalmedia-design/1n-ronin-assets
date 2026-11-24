/*!
 * n1-kisaca-biz-v3 — 1N Digital Media · Kısaca Biz (/kisaca-biz) · V3 Immersive Creative Experience
 * Wix Studio Custom Element · Tag name: n1-kisaca-biz-v3 · Kaynak: bu dosyanın HTTPS adresi
 *
 * V2'den bağımsız yeni giriş dosyası. V2 (n1-kisaca-biz-v2.js) değiştirilmedi.
 *
 * Korunanlar (V2 kaynağından aynen):
 *  - Hero ve "Biz kimiz?" bölümleri (işaretleme, CSS, giriş animasyonu ve imleç paralaksı)
 *  - Onaylı v6.48 Header + menü, Footer, WhatsApp / Yukarı Çık entegrasyonu (commit'e sabit kaynaklar)
 *  - Tablet/mobil Header-Footer düzeni, menü paneli düzeltmeleri, footer partner görseli
 *
 * Yeniden yazılanlar (Team bölümünden itibaren):
 *  - Ekip / Creative Engine: 42 parçalı geometrik sahne, her disiplin için ayrı biçim ve hareket dili
 *  - Bizim Standardımız: editoryal satırlar + ilkeye özgü geometrik sahneler (akordeon değil)
 *  - Farklı Disiplinler. Tek Yaratıcı Akıl.: masaüstünde genişleyen yatay şerit, tablet/mobilde kaydırmalı vitrin
 *  - Manifesto: kaydırmaya bağlı kinetik tipografi (pin yok)
 *  - Final: "Fikrin sınırı yok." + CTA
 *
 * Kaldırılanlar: V2 Markalar bölümü ve ona ait HTML/CSS/GSAP; V2'nin Team/Standards/Expertise/Impact blokları;
 *  V1'den kalan ve V2'de kullanılmayan çark/ilkeler/kültür CSS'i ve _wheel() kodu. Ayrıntı: README.md
 *
 * Kurallar: GSAP 3.13.0 + ScrollTrigger yalnızca sayfada yoksa yüklenir. Pin ve spacer yok. Bütün animasyonlar
 *  gsap.context + gsap.matchMedia içinde; ticker, IntersectionObserver, ResizeObserver ve dinleyiciler bağlantı
 *  kesilince temizlenir. İçerik CSS'te gizlenmez: GSAP yüklenemezse veya prefers-reduced-motion açıksa sayfa görünür
 *  ve kullanılabilir kalır. Bütün ikonlar satır içi SVG'dir (Unicode ok/emoji yok). Vurgu rengi #A8CF62.
 *
 * İsteğe bağlı öznitelik (yalnızca Wix dışı önizleme için): deps-base="<klasör>/"
 *   Verilirse jsDelivr dosyaları aynı yol yapısıyla bu klasörden okunur. Wix'te KULLANILMAZ.
 */
(function () {
  'use strict';
  var TAG = 'n1-kisaca-biz-v3';
  if (customElements.get(TAG)) return;

  /* ---------- Onaylı kaynaklar (V2 ile aynı, commit'e sabitlenmiş) ---------- */
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
  var PARTNER_ART = {
    tablet: 'https://static.wixstatic.com/media/6dbf5e_800ff5a00ba244f9bb31761a6b2d713d~mv2.png',
    mobile: 'https://static.wixstatic.com/media/6dbf5e_32b849155e954320a1f6479f27fd6ad2~mv2.png'
  };

  /* ---------- Yardımcılar (V2 ile aynı) ---------- */
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
  var SVGA = ' fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" aria-hidden="true" focusable="false"';
  var ARROW = '<svg class="kb-ico" viewBox="0 0 16 16" width="16" height="16"' + SVGA + '><path d="M4.5 11.5l7-7M5.5 4.5h6v6"/></svg>';
  var DOWN = '<svg class="kb-ico" viewBox="0 0 16 16" width="14" height="14"' + SVGA + '><path d="M8 3v10M3.5 8.5L8 13l4.5-4.5"/></svg>';
  var PREV = '<svg class="kb-ico" viewBox="0 0 16 16" width="16" height="16"' + SVGA + '><path d="M13 8H3M7.5 3.5L3 8l4.5 4.5"/></svg>';
  var NEXT = '<svg class="kb-ico" viewBox="0 0 16 16" width="16" height="16"' + SVGA + '><path d="M3 8h10M8.5 3.5L13 8l-4.5 4.5"/></svg>';
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function ln(t) { return '<span class="kb-ln"><span>' + t + '</span></span>'; }
  function chars(w) { return '<span class="kv-wd">' + Array.from(w).map(function (c) { return '<span class="kv-ch">' + c + '</span>'; }).join('') + '</span>'; }

  /* ---------- İçerik ---------- */
  // Ekip / Creative Engine — her disiplinin bir biçimi (formation) ve bir hareket dili (idle) var
  var ENGINE = [
    { n: 'Strateji', m: 'Yakınsama', d: 'Markanın nereye gitmesi gerektiğini veriyle ve sezgiyle birlikte çizer.', from: 'edges' },
    { n: 'Kreatif', m: 'Serbest çağrışım', d: 'Fikre bir karakter, bir ses ve akılda kalan bir biçim kazandırır.', from: 'random' },
    { n: 'Tasarım', m: 'Ritim ve oran', d: 'Görsel dili tutarlı, okunur ve markaya ait kılar.', from: 'start' },
    { n: 'Teknoloji', m: 'Sistem', d: 'Fikirleri çalışan, ölçeklenebilir sistemlere dönüştürür.', from: 'start' },
    { n: 'Performans', m: 'İvme', d: 'Her adımı ölçer; bütçeyi gerçekten işe yarayan yere yönlendirir.', from: 'start' },
    { n: 'Prodüksiyon', m: 'Kare kare', d: 'Fikri görüntüye, sese ve harekete dönüştürür.', from: 'end' },
    { n: 'Yapay Zekâ', m: 'Örüntü', d: 'Üretimi hızlandırır; yeni fikirlere ve deneylere alan açar.', from: 'center' }
  ];
  var STANDARDS = [
    { g: 'ask', t: 'Önce doğru soruyu sorarız.', d: 'Hazır cevaplarla başlamayız. Markanın gerçek ihtiyacını bulmak için önce dinler, sonra brief’i birlikte netleştiririz.' },
    { g: 'join', t: 'Fikirleri birlikte geliştiririz.', d: 'Strateji, kreatif ve teknoloji aynı masada düşünür. Fikir bir ekipten diğerine devredilmez; birlikte olgunlaşır.' },
    { g: 'tech', t: 'Tasarımı teknolojiyle buluştururuz.', d: 'Güzel görünen ama çalışmayan bir şey tasarlamayız. Her fikri, yaşayacağı platformu düşünerek kurarız.' },
    { g: 'detail', t: 'Detaylardan ödün vermeyiz.', d: 'Bir harfin aralığı, bir geçişin süresi, bir butonun yeri. İşin kalitesini çoğu zaman küçük kararlar belirler.' },
    { g: 'measure', t: 'Ölçer, öğrenir ve ilerleriz.', d: 'Yayına almak son adım değil. Sonuçları okur, öğrendiklerimizi bir sonraki adıma taşırız.' }
  ];
  // Adresler: n1-links-v646.js / ana sayfa hizmet bağlantıları ile aynı
  var SERVICES = [
    { n: 'Kreatif Prodüksiyon', h: '/kreatif-produksiyon', d: 'Konseptten çekime, kurgudan son renge kadar markanın hikâyesini görüntüyle anlatırız.' },
    { n: 'E-Ticaret Yönetimi', h: '/e-ticaret-yonetimi', d: 'Vitrini, ürün akışını ve kampanyaları satışa dönük tek bir sistemde yönetiriz.' },
    { n: 'Sosyal Medya', h: '/sosyal-medya', d: 'Markanın her gün konuşan sesini planlar, üretir ve toplulukla birlikte büyütürüz.' },
    { n: 'Reklam Yönetimi', h: '/reklam-yonetimi', d: 'Doğru mesajı doğru kitleye ulaştırır, bütçeyi sonuca göre sürekli yeniden dengeleriz.' },
    { n: 'UI/UX Tasarım', h: '/ui-ux-tasarim', d: 'Kullanıcının yolunu sadeleştirir; arayüzü anlaşılır, erişilebilir ve keyifli kılarız.' },
    { n: 'Yapay Zekâ', h: '/yapay-zeka', d: 'Yapay zekâyı üretim, içerik ve analiz süreçlerinde işe yarayan bir araca dönüştürürüz.' },
    { n: 'Uygulama Geliştirme', h: '/uygulama-gelistirme', d: 'Fikri hızlı, güvenli ve ölçeklenebilir web ve mobil ürünlere dönüştürürüz.' }
  ];

  /* ---------- Creative Engine geometrisi ---------- */
  var NP = 42, CX = 400, CY = 300, DEG = 180 / Math.PI;
  var FORMS = [
    // 0 Strateji — üç halka, içten dışa; parçalar teğet
    (function () { var o = [], R = [[7, 74, 24, 3.4, 1], [14, 150, 18, 2.8, .82], [21, 236, 13, 2.4, .6]];
      R.forEach(function (g, ri) { for (var j = 0; j < g[0]; j++) { var a = -Math.PI / 2 + j * 2 * Math.PI / g[0] + ri * .22; o.push({ x: CX + g[1] * Math.cos(a), y: CY + g[1] * Math.sin(a), w: g[2], h: g[3], r: a * DEG + 90, o: g[4] }); } });
      return o; })(),
    // 1 Kreatif — altın açı (phyllotaxis) dağılımı
    (function () { var o = []; for (var i = 0; i < NP; i++) { var a = i * 2.39996, rr = 34 * Math.sqrt(i + .6), s = 5 + (i * 7 % 5) * 2.2; o.push({ x: CX + rr * Math.cos(a) * 1.12, y: CY + rr * Math.sin(a) * .92, w: s, h: s, r: (a * DEG) % 180, o: .55 + (i % 4) * .15 }); } return o; })(),
    // 2 Tasarım — 7 x 6 ızgara
    (function () { var o = []; for (var r = 0; r < 6; r++) for (var c = 0; c < 7; c++) o.push({ x: CX + (c - 3) * 62, y: CY + (r - 2.5) * 62, w: 12, h: 12, r: 0, o: .85 }); return o; })(),
    // 3 Teknoloji — yatay/dikey veri yolları
    (function () { var o = []; for (var r = 0; r < 6; r++) for (var c = 0; c < 7; c++) { var v = ((r * 7 + c) * 5) % 9 === 0; o.push({ x: CX + (c - 3) * 86, y: CY + (r - 2.5) * 58, w: v ? 40 : 64, h: 2, r: v ? 90 : 0, o: .8 }); } return o; })(),
    // 4 Performans — yükselen çubuklar
    (function () { var o = []; for (var i = 0; i < NP; i++) { var k = i / (NP - 1), h = 22 + 330 * Math.pow(k, 2.1); o.push({ x: 150 + i * 12.2, y: 470 - h / 2, w: 5, h: h, r: 0, o: .45 + .55 * k }); } return o; })(),
    // 5 Prodüksiyon — iki film şeridi: 14 kare + 28 delik
    (function () { var o = [], s, f; for (s = 0; s < 2; s++) for (f = 0; f < 7; f++) o.push({ x: 130 + f * 90, y: s ? 372 : 228, w: 72, h: 46, r: 0, o: .2 });
      for (s = 0; s < 2; s++) for (f = 0; f < 7; f++) { var yb = s ? 372 : 228; o.push({ x: 130 + f * 90 - 18, y: yb - 34, w: 7, h: 7, r: 0, o: .9 }); o.push({ x: 130 + f * 90 + 18, y: yb + 34, w: 7, h: 7, r: 0, o: .9 }); }
      return o; })(),
    // 6 Yapay Zekâ — eşkenar dörtgen kafes
    (function () { var o = []; for (var r = 0; r < 6; r++) for (var c = 0; c < 7; c++) { var u = (c - 3) * 58, v = (r - 2.5) * 58; o.push({ x: CX + (u - v) * .78, y: CY + (u + v) * .5, w: 6, h: 6, r: 45, o: .85 }); } return o; })()
  ];
  var ACC = [
    function (i) { return i < 7; },
    function (i) { return i % 6 === 0; },
    function (i) { return i % 7 === 3; },
    function (i) { return Math.floor(i / 7) === 2; },
    function (i) { return i >= 34; },
    function (i) { return i >= 14 && i % 5 === 0; },
    function (i) { var r = Math.floor(i / 7), c = i % 7; return (r === 2 || r === 3) && (c === 3 || c === 2); }
  ];
  // Hareket dilleri: taban konuma eklenen ofset [dx, dy, dr, dw, dh]
  var IDLE = [
    function (b, i, t) { var ri = i < 7 ? 0 : i < 21 ? 1 : 2, th = t * [.22, -.12, .07][ri], c = Math.cos(th), s = Math.sin(th), x = b.x - CX, y = b.y - CY; return [c * x - s * y - x, s * x + c * y - y, th * DEG, 0, 0]; },
    function (b, i, t) { var k = Math.sin(t * 1.1 + i * .5) * .08; return [(b.x - CX) * k, (b.y - CY) * k, 25 * Math.sin(t * .7 + i), 0, 0]; },
    function (b, i, t) { var k = Math.sin(t * 2.2 - ((i % 7) + Math.floor(i / 7)) * .55) * 6; return [0, 0, 0, k, k]; },
    function (b, i, t) { var p = Math.max(0, Math.sin(t * 1.8 - (i % 7) * .6)); p = p * p * p * p * p * p; return [0, 0, 0, 40 * p, 0]; },
    function (b, i, t) { var d = 14 * Math.sin(t * 2.4 + i * .35); return [0, -d / 2, 0, 0, d]; },
    function (b, i, t) { var top = i < 7 || (i >= 14 && i < 28); return [(top ? 1 : -1) * ((t * 34) % 90), 0, 0, 0, 0]; },
    function (b, i, t) { var d1 = Math.hypot(b.x - CX + 140, b.y - CY), d2 = Math.hypot(b.x - CX - 160, b.y - CY + 60), k = Math.sin(t * 2 - d1 * .035); return [0, 12 * k + 8 * Math.sin(t * 1.4 - d2 * .03), 0, 2.5 * k, 2.5 * k]; }
  ];
  function engineSvg() {
    var p = '';
    for (var i = 0; i < NP; i++) p += '<rect class="kv-pt" x="-.5" y="-.5" width="1" height="1"/>';
    var c = 'M20 52V20h32M748 20h32v32M780 548v32h-32M52 580H20v-32';
    return '<svg class="kv-svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">' +
      '<defs><linearGradient id="kvFade" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".14" stop-color="#fff"/><stop offset=".86" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>' +
      '<mask id="kvMask" maskUnits="userSpaceOnUse" x="0" y="0" width="800" height="600"><rect width="800" height="600" fill="url(#kvFade)"/></mask></defs>' +
      '<path class="kv-crop" d="' + c + '"/><circle class="kv-core" cx="400" cy="300" r="3"/>' +
      '<g class="kv-ps" mask="url(#kvMask)">' + p + '</g></svg>';
  }

  /* ---------- Bizim Standardımız: ilkeye özgü geometriler (120 x 120) ---------- */
  var GLYPH = {
    ask: '<circle class="g-s g-ring" cx="60" cy="60" r="44" pathLength="1"/><circle class="g-s g-dash" cx="60" cy="60" r="27"/><g class="g-orb"><circle class="g-f g-dot" cx="104" cy="60" r="5"/></g>',
    join: '<circle class="g-s g-a" cx="40" cy="60" r="28"/><circle class="g-s g-b g-acc" cx="80" cy="60" r="28"/><circle class="g-f g-mid" cx="60" cy="60" r="4"/>',
    tech: '<rect class="g-s g-sq" x="26" y="26" width="68" height="68"/><path class="g-s g-grid" d="M49 26v68M71 26v68M26 49h68M26 71h68" pathLength="1"/><rect class="g-f g-node" x="68" y="46" width="6" height="6"/>',
    detail: '<rect class="g-s g-n1" x="18" y="18" width="84" height="84"/><rect class="g-s g-n2" x="36" y="36" width="48" height="48"/><rect class="g-f g-n3" x="52" y="52" width="16" height="16"/><path class="g-s g-x" d="M60 4v20M60 96v20M4 60h20M96 60h20" pathLength="1"/>',
    measure: '<path class="g-s g-base" d="M10 108h100" pathLength="1"/><path class="g-s g-step g-acc" d="M12 100V82h24V62h24V42h24V22h22" pathLength="1"/><circle class="g-f g-end" cx="106" cy="22" r="5"/>'
  };
  function glyph(k) { return '<svg class="kv-g kv-g--' + k + '" viewBox="0 0 120 120" aria-hidden="true" focusable="false">' + GLYPH[k] + '</svg>'; }

  /* ---------- Uzmanlık şeridi: hizmete özgü desenler (400 x 400) ---------- */
  var PAT = [
    '<path class="kx-s" d="M60 112V60h52M288 60h52v52M340 288v52h-52M112 340H60v-52" pathLength="1"/><rect class="kx-s" x="112" y="140" width="176" height="120" pathLength="1"/><circle class="kx-s kx-acc" cx="200" cy="200" r="34" pathLength="1"/><path class="kx-s" d="M186 200h28M200 186v28" pathLength="1"/><circle class="kx-f" cx="86" cy="86" r="6"/>',
    '<rect class="kx-s" x="80" y="80" width="60" height="60" pathLength="1"/><rect class="kx-s" x="170" y="80" width="60" height="60" pathLength="1"/><rect class="kx-s" x="260" y="80" width="60" height="60" pathLength="1"/><rect class="kx-s" x="80" y="170" width="60" height="60" pathLength="1"/><rect class="kx-f" x="170" y="170" width="60" height="60"/><rect class="kx-s" x="260" y="170" width="60" height="60" pathLength="1"/><rect class="kx-s" x="80" y="260" width="60" height="60" pathLength="1"/><rect class="kx-s" x="170" y="260" width="60" height="60" pathLength="1"/><rect class="kx-s" x="260" y="260" width="60" height="60" pathLength="1"/>',
    '<circle class="kx-s" cx="200" cy="200" r="34" pathLength="1"/><circle class="kx-s" cx="200" cy="200" r="76" pathLength="1"/><circle class="kx-s" cx="200" cy="200" r="118" pathLength="1"/><circle class="kx-s kx-acc" cx="200" cy="200" r="160" pathLength="1"/><circle class="kx-f" cx="276" cy="200" r="6"/><circle class="kx-f" cx="117" cy="283" r="6"/><circle class="kx-f" cx="313" cy="87" r="6"/>',
    '<circle class="kx-s" cx="210" cy="190" r="44" pathLength="1"/><circle class="kx-s" cx="210" cy="190" r="96" pathLength="1"/><circle class="kx-s" cx="210" cy="190" r="148" pathLength="1"/><path class="kx-s" d="M210 20v340M40 190h340" pathLength="1"/><path class="kx-s kx-acc" d="M40 370Q140 330 210 190" pathLength="1"/><circle class="kx-f" cx="210" cy="190" r="7"/>',
    '<rect class="kx-s" x="70" y="70" width="260" height="260" pathLength="1"/><path class="kx-s" d="M70 112h260M130 112v218" pathLength="1"/><rect class="kx-s" x="152" y="132" width="158" height="66" pathLength="1"/><rect class="kx-s" x="152" y="216" width="70" height="94" pathLength="1"/><rect class="kx-f" x="240" y="216" width="70" height="94"/><path class="kx-s kx-acc" d="M276 262l26 62 10-26 26-10z" pathLength="1"/>',
    '<path class="kx-s" d="M40 160C100 100 160 220 220 160S340 100 360 160" pathLength="1"/><path class="kx-s kx-acc" d="M40 220C100 160 160 280 220 220S340 160 360 220" pathLength="1"/><path class="kx-s" d="M40 280C100 220 160 340 220 280S340 220 360 280" pathLength="1"/><circle class="kx-f" cx="100" cy="130" r="5"/><circle class="kx-f" cx="160" cy="190" r="5"/><circle class="kx-f" cx="220" cy="220" r="5"/><circle class="kx-f" cx="280" cy="190" r="5"/><circle class="kx-f" cx="320" cy="250" r="5"/><circle class="kx-f" cx="130" cy="300" r="5"/>',
    '<rect class="kx-s" x="96" y="66" width="150" height="250" rx="18" pathLength="1"/><rect class="kx-s" x="130" y="96" width="150" height="250" rx="18" pathLength="1"/><rect class="kx-s kx-acc" x="164" y="126" width="150" height="250" rx="18" pathLength="1"/><path class="kx-s" d="M218 220l-22 22 22 22M260 220l22 22-22 22" pathLength="1"/><path class="kx-s" d="M196 180h70M196 302h44" pathLength="1"/>'
  ];

  /* ---------- Hero (V2'den aynen) ---------- */
  function heroSvg() {
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
  /* ---------- Final: sınırsız ışınlar ---------- */
  function finSvg() {
    var F = [1120, 450], L = '', S = '';
    for (var i = 0; i < 14; i++) { var a = i * Math.PI * 2 / 14 + .11; L += '<line class="kv-ray' + (i % 7 === 2 ? ' kv-ray--acc' : '') + '" x1="' + F[0] + '" y1="' + F[1] + '" x2="' + (F[0] + 1900 * Math.cos(a)).toFixed(0) + '" y2="' + (F[1] + 1900 * Math.sin(a)).toFixed(0) + '" pathLength="1"/>'; }
    for (var k = 0; k < 7; k++) { var b = -Math.PI / 2 + k * Math.PI * 2 / 7; S += '<rect class="kv-seed" x="-5" y="-5" width="10" height="10" data-x="' + (26 * Math.cos(b)).toFixed(1) + '" data-y="' + (26 * Math.sin(b)).toFixed(1) + '" transform="translate(' + (F[0] + 26 * Math.cos(b)).toFixed(1) + ' ' + (F[1] + 26 * Math.sin(b)).toFixed(1) + ')"/>'; }
    return '<svg class="kv-fin__svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><g class="kv-fin__g">' +
      '<circle class="kv-fring" cx="1120" cy="450" r="120"/><circle class="kv-fring" cx="1120" cy="450" r="250"/>' + L + S +
      '<circle class="kv-fdot" cx="1120" cy="450" r="8"/></g></svg>';
  }

  function markup() {
    var list = ENGINE.map(function (e, i) {
      return '<li><button type="button" class="kv-item" data-i="' + i + '" aria-pressed="' + (i === 0) + '">' +
        '<span class="kv-item__n" aria-hidden="true">' + pad(i + 1) + '</span><span class="kv-item__name">' + e.n + '</span>' +
        '<span class="kv-item__m">' + e.m + '</span><span class="kv-item__d">' + e.d + '</span></button></li>';
    }).join('');
    var rules = STANDARDS.map(function (s, i) {
      return '<li class="kv-rule' + (i % 2 ? ' kv-rule--alt' : '') + '" tabindex="0" data-i="' + i + '">' +
        '<span class="kv-rule__n" aria-hidden="true">' + pad(i + 1) + '</span>' +
        '<h3 class="kv-rule__t">' + s.t + '</h3><p class="kv-rule__d">' + s.d + '</p>' +
        '<span class="kv-rule__g">' + glyph(s.g) + '</span><i class="kv-rule__line" aria-hidden="true"></i></li>';
    }).join('');
    var panels = SERVICES.map(function (s, i) {
      return '<article class="kv-p' + (i === 0 ? ' is-on' : '') + '" data-i="' + i + '" aria-labelledby="kv-p-h' + i + '">' +
        '<button type="button" class="kv-p__tab" aria-expanded="' + (i === 0) + '" aria-controls="kv-p-b' + i + '"><span class="kv-p__n">' + pad(i + 1) + '</span><span class="kv-p__v">' + s.n + '</span></button>' +
        '<div class="kv-p__body" id="kv-p-b' + i + '">' +
          '<svg class="kv-p__pat" viewBox="0 0 400 400" aria-hidden="true" focusable="false">' + PAT[i] + '</svg>' +
          '<span class="kv-p__k">' + pad(i + 1) + ' / 07</span>' +
          '<h3 class="kv-p__name" id="kv-p-h' + i + '">' + s.n + '</h3>' +
          '<p class="kv-p__d">' + s.d + '</p>' +
          '<a class="kb-link" href="' + s.h + '">Hizmeti incele' + ARROW + '</a>' +
        '</div></article>';
    }).join('');

    return '' +
'<main class="kb" id="kisaca-biz" lang="tr">' +
/* Hero (V2) */
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
/* Biz kimiz? (V2) */
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
/* V3 — Ekip / Creative Engine */
'<section class="kb-sec kv-team" id="kb-ekip" aria-labelledby="kv-team-t">' +
  '<div class="kb-wrap">' +
    '<p class="kv-label">Ekip</p>' +
    '<h2 class="kv-team__title" id="kv-team-t"><span class="kv-sr">Tek bir bakış. Pek çok yetenek.</span>' +
      '<span class="kv-t1" aria-hidden="true"><span class="kv-w">Tek</span> <span class="kv-w">bir</span> <span class="kv-w kv-w--acc">bakış.</span></span>' +
      '<span class="kv-t2" aria-hidden="true">' + chars('Pek') + ' ' + chars('çok') + ' ' + chars('yetenek.') + '</span>' +
    '</h2>' +
    '<p class="kv-team__lede">Strateji, tasarım, teknoloji ve prodüksiyon aynı fikrin etrafında birlikte çalışır. Bir disiplin seçin; sahne o disiplinin düşünme biçimine dönüşsün.</p>' +
    '<div class="kv-engine" data-kv="engine">' +
      '<ol class="kv-list" aria-label="Ekibi oluşturan disiplinler">' + list + '</ol>' +
      '<div class="kv-stage-wrap">' +
        '<div class="kv-stage">' +
          '<span class="kv-word" aria-hidden="true"><span>' + ENGINE[0].n + '</span></span>' +
          engineSvg() +
          '<span class="kv-stage__tag" aria-hidden="true">1N / Creative Engine</span>' +
          '<div class="kv-stage__nav"><button type="button" class="kv-arrow" data-d="-1" aria-label="Önceki disiplin">' + PREV + '</button><button type="button" class="kv-arrow" data-d="1" aria-label="Sonraki disiplin">' + NEXT + '</button></div>' +
        '</div>' +
        '<div class="kv-cap" aria-live="polite">' +
          '<span class="kv-cap__n">01 / 07</span><p class="kv-cap__name">' + ENGINE[0].n + '</p>' +
          '<p class="kv-cap__m">Hareket dili: <b>' + ENGINE[0].m + '</b></p><p class="kv-cap__d">' + ENGINE[0].d + '</p>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</div>' +
'</section>' +
/* V3 — Bizim Standardımız */
'<section class="kb-sec kv-std" id="kb-standart" aria-labelledby="kv-std-t">' +
  '<div class="kb-wrap">' +
    '<div class="kv-std__head">' +
      '<p class="kv-label">Standart</p>' +
      '<h2 class="kv-std__title" id="kv-std-t">' + ln('Bizim') + '<span class="kb-ln kb-ln--acc"><span>standardımız.</span></span></h2>' +
      '<p class="kv-std__sub">İyi iş tesadüfen ortaya çıkmaz.</p>' +
    '</div>' +
    '<ol class="kv-rules" data-kv="rules">' + rules + '</ol>' +
  '</div>' +
'</section>' +
/* V3 — Farklı disiplinler. Tek yaratıcı akıl. */
'<section class="kb-sec kv-exp" id="kb-uzmanlik" aria-labelledby="kv-exp-t">' +
  '<div class="kb-wrap">' +
    '<div class="kv-exp__head">' +
      '<p class="kv-label">Uzmanlık</p>' +
      '<h2 class="kv-exp__title" id="kv-exp-t">' + ln('Farklı disiplinler.') + '<span class="kb-ln kb-ln--acc"><span>Tek yaratıcı akıl.</span></span></h2>' +
      '<div class="kv-exp__ctl"><span class="kv-exp__count" aria-hidden="true"><b>01</b> / 07</span>' +
        '<button type="button" class="kv-arrow" data-d="-1" aria-label="Önceki hizmet">' + PREV + '</button><button type="button" class="kv-arrow" data-d="1" aria-label="Sonraki hizmet">' + NEXT + '</button></div>' +
    '</div>' +
    '<div class="kv-strip" data-kv="strip">' + panels + '</div>' +
    '<div class="kv-exp__bar" aria-hidden="true"><i></i></div>' +
  '</div>' +
'</section>' +
/* V3 — Manifesto */
'<section class="kv-man" aria-labelledby="kv-man-t">' +
  '<svg class="kv-man__bg" viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden="true" focusable="false">' +
    [120, 250, 380, 510, 640, 770].map(function (y, i) { return '<line class="kv-hz' + (i === 3 ? ' kv-hz--acc' : '') + '" x1="-320" y1="' + y + '" x2="1920" y2="' + y + '"/>'; }).join('') +
  '</svg>' +
  '<div class="kb-wrap kv-man__in">' +
    '<p class="kv-label">Manifesto</p>' +
    '<h2 class="kv-man__t" id="kv-man-t"><span class="kv-sr">Biz sadece üretmiyoruz. Devamını düşünüyoruz.</span>' +
      '<span class="kv-ml kv-ml--a" aria-hidden="true"><span class="kv-mw">Biz</span> <span class="kv-mw">sadece</span></span>' +
      '<span class="kv-ml kv-ml--b" aria-hidden="true"><span class="kv-mw">üretmiyoruz.</span></span>' +
      '<span class="kv-ml kv-ml--c" aria-hidden="true"><span class="kv-mw">Devamını</span></span>' +
      '<span class="kv-ml kv-ml--d" aria-hidden="true"><span class="kv-mw">' + chars('düşünüyoruz.') + '</span><span class="kv-tail"><i></i><b></b></span></span>' +
    '</h2>' +
  '</div>' +
'</section>' +
/* V3 — Final */
'<section class="kv-fin" aria-labelledby="kv-fin-t">' +
  finSvg() +
  '<div class="kb-wrap kv-fin__in">' +
    '<p class="kb-tag"><i aria-hidden="true"></i>1N Digital Media</p>' +
    '<h2 class="kv-fin__t" id="kv-fin-t">' + ln('Fikrin') + '<span class="kb-ln kb-ln--acc"><span>sınırı yok.</span></span></h2>' +
    '<p class="kv-fin__sub">Birlikte daha fazlasını düşünebilir, tasarlayabilir ve hayata geçirebiliriz.</p>' +
    '<div class="kb-cta__actions">' +
      '<a class="kb-btn kb-btn--primary" href="/iletisim"><span>Projenizi Konuşalım</span><span class="kb-btn__ico">' + ARROW + '</span></a>' +
      '<a class="kb-btn kb-btn--ghost" href="/teklif-al"><span>Teklif Al</span><span class="kb-btn__ico">' + ARROW + '</span></a>' +
    '</div>' +
  '</div>' +
'</section>' +
'</main>';
  }

  /* ---------- Sayfaya özel CSS (yalnızca n1-kisaca-biz-v3 kapsamında) ---------- */
  var T = TAG;
  var COND = '"Barlow Condensed","Arial Narrow",Arial,sans-serif';
  var CSS = [
T + '{--bg:#080A09;--g1:#0D0F0E;--g2:#131514;--ink:#ECEBE5;--soft:#BDBCB5;--mute:#9A9B95;--dim:#6E706A;--line:rgba(228,227,221,.12);--line2:rgba(228,227,221,.07);--acc:#A8CF62;--ease:cubic-bezier(.22,1,.36,1);',
'  --gap:clamp(18px,2.2vw,40px);--secpad:clamp(96px,8.4vw,160px);display:block;position:relative;width:100%;background:var(--bg);color:var(--ink);font:400 17px/1.6 Barlow,Arial,sans-serif;-webkit-font-smoothing:antialiased;overflow-x:clip;text-align:left}',
T + ' *,' + T + ' *::before,' + T + ' *::after{box-sizing:border-box;min-width:0}',
T + ' :where(.kb) :where(p,h1,h2,h3,ul,ol,dl,dd){margin:0}',
T + ' :where(.kb) :where(ul,ol){padding:0;list-style:none}',
T + ' :where(.kb) :where(a){color:inherit}',
T + ' :where(.kb) :where(button){font:inherit;color:inherit;background:none;border:0;padding:0;margin:0;cursor:pointer;text-align:inherit;-webkit-tap-highlight-color:transparent}',
T + ' .kb :focus-visible{outline:2px solid var(--acc);outline-offset:3px}',
T + ' .kb-ico{display:block;flex:none}',
T + ' .kv-sr{position:absolute!important;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}',
T + ' .kb-wrap{width:90%;margin-left:auto;margin-right:auto}',
T + ' .kb-grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap)}',
T + ' .kb-tag{display:flex;align-items:center;gap:14px;font:500 12px/1.2 Barlow,Arial,sans-serif;letter-spacing:.22em;text-transform:uppercase;color:var(--mute)}',
T + ' .kb-tag i{display:block;width:34px;height:1px;background:var(--acc)}',
T + ' .kb-label{grid-column:1/4;display:flex;align-items:center;gap:12px;font:500 15px/1.3 Barlow,Arial,sans-serif;color:var(--mute);align-self:start;padding-top:.55em}',
T + ' .kb-label::before,' + T + ' .kv-label::before{content:"";flex:none;width:7px;height:7px;border-radius:1px;background:var(--acc)}',
T + ' .kv-label{display:flex;align-items:center;gap:12px;font:500 15px/1.3 Barlow,Arial,sans-serif;color:var(--mute)}',
/* Başlık satır maskeleri: Türkçe İ noktası ve aksanlar için üst/alt güvenli pay */
T + ' .kb-ln{display:block;overflow:hidden;padding:.16em 0 .08em;margin:-.16em 0 -.08em}',
T + ' .kb-ln>span{display:block}',
T + ' .kb-ln--acc{color:var(--acc)}',
T + ' .kb-sec{border-top:1px solid var(--line)}',

/* Hero (V2'den aynen) */
T + ' .kb-hero{position:relative;padding-top:clamp(140px,11vw,196px);padding-bottom:0;overflow:hidden}',
T + ' .kb-hero__grid{display:grid;grid-template-columns:minmax(0,7fr) minmax(0,5fr);column-gap:var(--gap);align-items:center}',
T + ' .kb-hero__copy{position:relative;z-index:2}',
T + ' .kb-hero__title{margin-top:.2em;font:700 clamp(112px,13.6vw,264px)/.98 ' + COND + ';letter-spacing:-.014em;text-transform:uppercase;color:var(--ink)}',
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

/* Biz kimiz? (V2'den aynen) */
T + ' .kb-who{padding:clamp(96px,8.4vw,160px) 0}',
T + ' .kb-who__body{grid-column:4/13}',
T + ' .kb-manifesto{max-width:20ch;font:500 clamp(42px,4.2vw,82px)/1.08 ' + COND + ';letter-spacing:-.01em;color:var(--ink);text-wrap:balance}',
T + ' .kb-who__cols{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:var(--gap);margin-top:clamp(44px,4vw,72px);max-width:920px}',
T + ' .kb-who__cols p{font-size:clamp(16px,1.1vw,18px);line-height:1.7;color:var(--soft)}',

/* Ortak V3 parçaları */
T + ' .kb-link{display:inline-flex;align-items:center;gap:10px;min-height:44px;font:500 13px/1 Barlow,Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase;text-decoration:none;color:var(--ink);border-bottom:1px solid var(--line);transition:color .35s var(--ease),border-color .35s var(--ease)}',
T + ' .kb-link .kb-ico{color:var(--acc);transition:transform .45s var(--ease)}',
T + ' .kb-link:hover{color:var(--acc);border-color:var(--acc)}',
T + ' .kb-link:hover .kb-ico{transform:translate(3px,-3px)}',
T + ' .kv-arrow{display:grid;place-items:center;width:48px;height:48px;border:1px solid var(--line);border-radius:50%;background:rgba(8,10,9,.6);color:var(--ink);transition:background-color .35s var(--ease),color .35s var(--ease),border-color .35s var(--ease);touch-action:manipulation}',
T + ' .kv-arrow:hover,' + T + ' .kv-arrow:focus-visible{background:var(--acc);border-color:var(--acc);color:#080A09}',

/* ===== Ekip / Creative Engine ===== */
T + ' .kv-team{position:relative;padding:var(--secpad) 0}',
T + ' .kv-team__title{margin-top:clamp(28px,2.6vw,44px);font:700 clamp(72px,9.4vw,184px)/1 ' + COND + ';letter-spacing:-.016em;text-transform:uppercase;color:var(--ink)}',
T + ' .kv-t1,' + T + ' .kv-t2{display:block}',
T + ' .kv-t2{padding-left:16%;color:var(--ink)}',
T + ' .kv-w{display:inline-block}',
T + ' .kv-w--acc{color:var(--acc)}',
T + ' .kv-wd{display:inline-block;white-space:nowrap}',
T + ' .kv-ch{display:inline-block}',
T + ' .kv-team__lede{max-width:44ch;margin:clamp(30px,2.6vw,48px) 0 0 auto;font-size:clamp(16px,1.15vw,19px);line-height:1.65;color:var(--soft)}',
T + ' .kv-engine{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:start;margin-top:clamp(56px,5vw,96px)}',
T + ' .kv-list{grid-column:1/6;border-top:1px solid var(--line)}',
T + ' .kv-item{position:relative;display:grid;grid-template-columns:44px minmax(0,1fr) auto;column-gap:14px;row-gap:6px;align-items:baseline;width:100%;padding:clamp(22px,2vw,32px) 0;border-bottom:1px solid var(--line);color:var(--mute);transition:color .45s var(--ease)}',
T + ' .kv-item::before{content:"";position:absolute;left:0;top:-1px;height:1px;width:100%;background:var(--acc);transform:scaleX(0);transform-origin:0 50%;transition:transform .7s var(--ease)}',
T + ' .kv-item[aria-pressed="true"]{color:var(--ink)}',
T + ' .kv-item[aria-pressed="true"]::before{transform:scaleX(1)}',
T + ' .kv-item__n{font:500 13px/1 Barlow,Arial,sans-serif;letter-spacing:.14em;color:var(--dim);transition:color .45s var(--ease)}',
T + ' .kv-item[aria-pressed="true"] .kv-item__n{color:var(--acc)}',
T + ' .kv-item__name{font:600 clamp(30px,2.6vw,48px)/1.08 ' + COND + ';text-transform:uppercase;letter-spacing:-.005em;transition:transform .6s var(--ease)}',
T + ' .kv-item[aria-pressed="true"] .kv-item__name{transform:translateX(8px)}',
T + ' .kv-item__m{font:500 12px/1.2 Barlow,Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:var(--dim);white-space:nowrap}',
T + ' .kv-item[aria-pressed="true"] .kv-item__m{color:var(--acc)}',
T + ' .kv-item__d{grid-column:2/4;max-width:40ch;font-size:clamp(15px,1.02vw,17px);line-height:1.6;color:var(--mute)}',
T + ' .kv-item[aria-pressed="true"] .kv-item__d{color:var(--soft)}',
T + ' .kv-stage-wrap{grid-column:6/13;position:sticky;top:clamp(88px,9vh,120px)}',
T + ' .kv-stage{position:relative;width:100%;aspect-ratio:4/3;max-height:calc(100vh - 220px);background:radial-gradient(ellipse at 50% 50%,rgba(168,207,98,.05),transparent 62%),var(--g1);border:1px solid var(--line2);border-radius:4px;overflow:hidden;isolation:isolate;touch-action:pan-y;container-type:inline-size}',
T + ' .kv-word{position:absolute;left:0;right:0;top:50%;z-index:0;display:block;overflow:hidden;padding:.12em 0 .04em;transform:translateY(-50%);text-align:center;pointer-events:none;font:700 16cqw/1 ' + COND + ';text-transform:uppercase;letter-spacing:-.02em;color:transparent;-webkit-text-stroke:1px rgba(236,235,229,.09);white-space:nowrap}',
T + ' .kv-word>span{display:block}',
T + ' .kv-svg{position:absolute;inset:0;z-index:1;display:block;width:100%;height:100%}',
T + ' .kv-crop{fill:none;stroke:rgba(236,235,229,.22);stroke-width:1.2}',
T + ' .kv-core{fill:var(--acc);opacity:.6}',
T + ' .kv-pt{fill:rgba(236,235,229,.92);transition:fill .6s var(--ease)}',
T + ' .kv-pt.is-a{fill:var(--acc)}',
T + ' .kv-stage__tag{position:absolute;left:clamp(26px,3vw,44px);bottom:clamp(20px,2.4vw,34px);z-index:2;font:500 11px/1 Barlow,Arial,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:var(--dim);pointer-events:none}',
T + ' .kv-stage__nav{position:absolute;right:14px;bottom:14px;z-index:2;display:none;gap:8px}',
T + ' .kv-cap{display:grid;grid-template-columns:auto minmax(0,1fr);align-items:baseline;column-gap:20px;row-gap:6px;padding-top:18px}',
T + ' .kv-cap__n{font:500 12px/1 Barlow,Arial,sans-serif;letter-spacing:.16em;color:var(--acc)}',
T + ' .kv-cap__name{font:600 24px/1.1 ' + COND + ';text-transform:uppercase;color:var(--ink)}',
T + ' .kv-cap__m{grid-column:2;font-size:14px;color:var(--mute)}',
T + ' .kv-cap__m b{font-weight:500;color:var(--soft)}',
T + ' .kv-cap__d{display:none;grid-column:1/-1;margin-top:8px;font-size:16px;line-height:1.6;color:var(--soft)}',

/* ===== Bizim Standardımız ===== */
T + ' .kv-std{position:relative;padding:var(--secpad) 0}',
T + ' .kv-std__head{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:end}',
T + ' .kv-std__head .kv-label{grid-column:1/-1;margin-bottom:clamp(26px,2.4vw,40px)}',
T + ' .kv-std__title{grid-column:1/9;font:700 clamp(64px,8.2vw,164px)/1 ' + COND + ';letter-spacing:-.016em;text-transform:uppercase;color:var(--ink)}',
T + ' .kv-std__sub{grid-column:9/13;padding-bottom:.5em;font:500 clamp(22px,1.9vw,34px)/1.2 ' + COND + ';color:var(--soft)}',
T + ' .kv-rules{margin-top:clamp(56px,5.6vw,104px);border-top:1px solid var(--line);counter-reset:none}',
T + ' .kv-rule{position:relative;display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:center;min-height:clamp(150px,12.4vw,220px);padding:clamp(28px,2.4vw,40px) 0;outline-offset:-2px;transition:opacity .5s var(--ease)}',
T + ' .kv-rule__n{grid-column:1/3;font:700 clamp(56px,6.4vw,124px)/1 ' + COND + ';color:transparent;-webkit-text-stroke:1px rgba(236,235,229,.28);transition:color .5s var(--ease),-webkit-text-stroke-color .5s var(--ease)}',
T + ' .kv-rule__t{position:relative;z-index:1;grid-column:3/9;font:600 clamp(32px,3.3vw,62px)/1.06 ' + COND + ';text-transform:uppercase;letter-spacing:-.008em;color:var(--ink);text-wrap:balance;transition:transform .7s var(--ease)}',
T + ' .kv-rule--alt .kv-rule__t{grid-column:4/10}',
T + ' .kv-rule__d{position:relative;z-index:1;grid-column:10/13;font-size:clamp(15px,1.02vw,17px);line-height:1.62;color:var(--mute);transition:color .5s var(--ease)}',
T + ' .kv-rule--alt .kv-rule__d{grid-column:10/13}',
T + ' .kv-rule__line{position:absolute;left:0;right:0;bottom:0;height:1px;background:var(--line)}',
T + ' .kv-rule__line::after{content:"";position:absolute;inset:0;background:var(--acc);transform:scaleX(0);transform-origin:var(--ox,0%) 50%;transition:transform .8s var(--ease)}',
T + ' .kv-rule__g{position:absolute;z-index:0;top:50%;left:var(--gx,58%);width:clamp(120px,10vw,168px);aspect-ratio:1;margin:calc(clamp(120px,10vw,168px) / -2) 0 0 calc(clamp(120px,10vw,168px) / -2);pointer-events:none;opacity:0;transform:scale(.7) rotate(-8deg);transition:opacity .45s var(--ease),transform .6s var(--ease)}',
T + ' .kv-g{display:block;width:100%;height:100%;overflow:visible}',
T + ' .kv-g .g-s{fill:none;stroke:rgba(236,235,229,.5);stroke-width:1.2}',
T + ' .kv-g .g-acc{stroke:var(--acc)}',
T + ' .kv-g .g-dash{stroke-dasharray:2 5}',
T + ' .kv-g .g-f{fill:var(--acc)}',
T + ' .kv-g [pathLength]{stroke-dasharray:1;stroke-dashoffset:0}',
T + ' .kv-rule.is-on .kv-rule__g{opacity:1;transform:none}',
T + ' .kv-rule.is-on .kv-rule__n{color:var(--acc);-webkit-text-stroke-color:var(--acc)}',
T + ' .kv-rule.is-on .kv-rule__d{color:var(--soft)}',
T + ' .kv-rule.is-on .kv-rule__line::after{transform:scaleX(1)}',
T + ' .kv-rule.is-on .kv-rule__t{transform:translateX(14px)}',
'@media (hover:hover) and (min-width:1025px){' + T + ' .kv-rules.is-hover .kv-rule:not(.is-on){opacity:.38}}',

/* ===== Uzmanlık şeridi ===== */
T + ' .kv-exp{position:relative;padding:var(--secpad) 0;background:linear-gradient(180deg,var(--bg),var(--g1) 40%,var(--g1) 70%,var(--bg))}',
T + ' .kv-exp__head{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:end}',
T + ' .kv-exp__head .kv-label{grid-column:1/-1;margin-bottom:clamp(26px,2.4vw,40px)}',
T + ' .kv-exp__title{grid-column:1/11;font:700 clamp(54px,6.2vw,120px)/1 ' + COND + ';letter-spacing:-.014em;text-transform:uppercase;color:var(--ink)}',
T + ' .kv-exp__ctl{grid-column:11/13;justify-self:end;display:none;align-items:center;gap:10px}',
T + ' .kv-exp__count{margin-right:6px;font:500 13px/1 Barlow,Arial,sans-serif;letter-spacing:.14em;color:var(--mute)}',
T + ' .kv-exp__count b{font-weight:500;color:var(--acc)}',
T + ' .kv-strip{display:flex;gap:8px;height:clamp(520px,42vw,660px);margin-top:clamp(52px,5vw,92px)}',
T + ' .kv-p{position:relative;flex:1 1 0;min-width:0;overflow:hidden;border:1px solid var(--line);border-radius:4px;background:var(--bg);transition:flex-grow .9s var(--ease),border-color .5s var(--ease),background-color .5s var(--ease)}',
T + ' .kv-p.is-on{flex-grow:7;border-color:rgba(168,207,98,.32);background:linear-gradient(160deg,#0E110F,var(--bg) 70%)}',
T + ' .kv-p__tab{position:absolute;inset:0;z-index:2;display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:22px 0 26px;transition:opacity .4s var(--ease),visibility 0s linear 0s}',
T + ' .kv-p__tab:hover .kv-p__v{color:var(--ink)}',
T + ' .kv-p.is-on .kv-p__tab{opacity:0;visibility:hidden;transition:opacity .3s var(--ease),visibility 0s linear .3s}',
T + ' .kv-p__n{font:500 13px/1 Barlow,Arial,sans-serif;letter-spacing:.14em;color:var(--acc)}',
T + ' .kv-p__v{writing-mode:vertical-rl;transform:rotate(180deg);white-space:nowrap;font:600 clamp(22px,1.8vw,32px)/1 ' + COND + ';text-transform:uppercase;letter-spacing:.01em;color:var(--mute);transition:color .4s var(--ease)}',
T + ' .kv-p__body{position:absolute;left:0;top:0;bottom:0;width:min(900px,calc((90vw - 48px) * .538));display:flex;flex-direction:column;justify-content:flex-end;padding:clamp(26px,2.6vw,44px);visibility:hidden;opacity:0;transition:opacity .35s var(--ease),visibility 0s linear .35s}',
T + ' .kv-p.is-on .kv-p__body{visibility:visible;opacity:1;transition:opacity .6s var(--ease) .25s,visibility 0s}',
T + ' .kv-p__pat{position:absolute;right:clamp(12px,2vw,40px);top:clamp(12px,2vw,36px);width:min(52%,380px);height:auto;overflow:visible}',
T + ' .kx-s{fill:none;stroke:rgba(236,235,229,.3);stroke-width:1.2;stroke-dasharray:1;stroke-dashoffset:0}',
T + ' .kx-acc{stroke:var(--acc)}',
T + ' .kx-f{fill:var(--acc)}',
T + ' .kv-p__k{position:relative;font:500 12px/1 Barlow,Arial,sans-serif;letter-spacing:.16em;color:var(--acc)}',
T + ' .kv-p__name{position:relative;margin-top:16px;max-width:12ch;font:700 clamp(48px,4.8vw,96px)/1 ' + COND + ';text-transform:uppercase;letter-spacing:-.014em;color:var(--ink)}',
T + ' .kv-p__d{position:relative;margin-top:18px;max-width:40ch;font-size:clamp(16px,1.12vw,19px);line-height:1.6;color:var(--soft)}',
T + ' .kv-p .kb-link{position:relative;align-self:flex-start;margin-top:22px}',
T + ' .kv-exp__bar{display:none;position:relative;height:1px;margin-top:22px;background:var(--line)}',
T + ' .kv-exp__bar i{position:absolute;left:0;top:0;height:1px;width:calc(100% / 7);background:var(--acc);transform:translateX(calc(var(--k,0) * 100%));transition:transform .5s var(--ease)}',

/* ===== Manifesto ===== */
T + ' .kv-man{position:relative;padding:clamp(120px,12vw,220px) 0;border-top:1px solid var(--line);overflow:hidden;isolation:isolate}',
T + ' .kv-man__bg{position:absolute;inset:0;z-index:-1;width:100%;height:100%}',
T + ' .kv-hz{stroke:rgba(236,235,229,.06);stroke-width:1;vector-effect:non-scaling-stroke}',
T + ' .kv-hz--acc{stroke:rgba(168,207,98,.22)}',
T + ' .kv-man__t{margin-top:clamp(36px,3.4vw,60px);font:700 clamp(62px,10.2vw,200px)/1.02 ' + COND + ';letter-spacing:-.018em;text-transform:uppercase}',
T + ' .kv-ml{display:block;white-space:nowrap}',
T + ' .kv-ml--a,' + T + ' .kv-ml--b{color:var(--mute)}',
T + ' .kv-ml--b{text-align:right}',
T + ' .kv-ml--c{margin-top:.18em;padding-left:8%;color:var(--ink)}',
T + ' .kv-ml--d{display:flex;align-items:center;gap:.18em;color:var(--ink)}',
T + ' .kv-mw{display:inline-block}',
T + ' .kv-tail{position:relative;display:block;flex:1 1 auto;height:.1em;min-width:.4em}',
T + ' .kv-tail i{position:absolute;left:0;right:-6vw;top:50%;height:2px;margin-top:-1px;background:var(--acc);transform-origin:0 50%}',
T + ' .kv-tail b{position:absolute;right:-6vw;top:50%;width:.14em;height:.14em;margin:-.07em 0 0 0;border-radius:50%;background:var(--acc)}',

/* ===== Final ===== */
T + ' .kv-fin{position:relative;padding:clamp(130px,11vw,210px) 0 clamp(110px,9vw,170px);border-top:1px solid var(--line);background:linear-gradient(180deg,var(--bg),var(--g1));overflow:hidden;isolation:isolate}',
T + ' .kv-fin__svg{position:absolute;inset:0;z-index:-1;width:100%;height:100%}',
T + ' .kv-ray{stroke:rgba(236,235,229,.14);stroke-width:1;stroke-dasharray:1;stroke-dashoffset:0;vector-effect:non-scaling-stroke}',
T + ' .kv-ray--acc{stroke:rgba(168,207,98,.6)}',
T + ' .kv-fring{fill:none;stroke:rgba(236,235,229,.07);stroke-width:1;vector-effect:non-scaling-stroke}',
T + ' .kv-seed{fill:var(--acc)}',
T + ' .kv-fdot{fill:var(--acc)}',
T + ' .kv-fin__in{position:relative}',
T + ' .kv-fin__t{margin-top:.42em;font:700 clamp(84px,10.8vw,212px)/.98 ' + COND + ';letter-spacing:-.016em;text-transform:uppercase;color:var(--ink)}',
T + ' .kv-fin__sub{max-width:34ch;margin-top:clamp(30px,2.8vw,48px);font-size:clamp(18px,1.4vw,24px);line-height:1.5;color:var(--soft)}',
T + ' .kb-cta__actions{display:flex;flex-wrap:wrap;gap:14px;margin-top:clamp(36px,3.2vw,56px)}',
T + ' .kb-btn{position:relative;display:inline-flex;align-items:center;justify-content:space-between;gap:22px;height:64px;padding:0 10px 0 28px;border-radius:12px;overflow:hidden;white-space:nowrap;isolation:isolate;',
'  font:500 13.5px/1 Barlow,Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase;text-decoration:none;color:var(--ink);border:1px solid rgba(168,207,98,.42);background:rgba(16,19,17,.72);transition:color .45s var(--ease),border-color .45s ease;touch-action:manipulation}',
T + ' .kb-btn::before{content:"";position:absolute;inset:0;z-index:-1;background:var(--acc);transform:scaleX(0);transform-origin:0 50%;transition:transform .6s cubic-bezier(.65,0,.35,1)}',
T + ' .kb-btn__ico{display:grid;place-items:center;width:44px;height:44px;border-radius:8px;background:rgba(168,207,98,.12);transition:background-color .45s ease,transform .45s var(--ease)}',
T + ' .kb-btn--ghost{border-color:rgba(228,227,221,.22);background:rgba(8,10,9,.5)}',
T + ' .kb-btn--ghost .kb-btn__ico{background:rgba(236,235,229,.06)}',
T + ' .kb-btn:hover,' + T + ' .kb-btn:focus-visible{color:#0A0B0B;border-color:var(--acc)}',
T + ' .kb-btn:hover::before,' + T + ' .kb-btn:focus-visible::before{transform:scaleX(1)}',
T + ' .kb-btn:hover .kb-btn__ico,' + T + ' .kb-btn:focus-visible .kb-btn__ico{background:rgba(10,11,11,.12)}',

/* Header paneli (V2'den aynen; yalnızca bu sayfanın paneline uygulanır) */
'.n1h-panel[data-n1-kb],.n1h-panel[data-n1-kb] *,.n1h-panel[data-n1-kb] *::before,.n1h-panel[data-n1-kb] *::after{box-sizing:border-box}',
'.n1h-panel[data-n1-kb] a.n1h-item{text-decoration:none;color:#ecebe6}',
'.n1h-panel[data-n1-kb] .n1h-sub a{text-decoration:none}',
'@media (max-width:1024px){.n1h-panel[data-n1-kb][data-open]::before{content:"";position:fixed;left:0;right:0;bottom:0;top:72px;z-index:-1;pointer-events:none;background:rgba(8,10,9,.8);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}}',
'@media (max-width:767px){.n1h-panel[data-n1-kb][data-open]::before{top:64px}}',
T + ' .n1ft-partner-art{display:none}',

/* ---------- Tablet (≤1024) ---------- */
'@media (max-width:1024px){',
T + ' .kb-hero{padding-top:128px}',
T + ' .kb-hero__grid{grid-template-columns:minmax(0,1.35fr) minmax(0,1fr)}',
T + ' .kb-hero__title{font-size:clamp(96px,14vw,150px)}',
T + ' .kb-hero__art{max-width:380px}',
T + ' .kb-label{grid-column:1/-1;margin-bottom:22px}',
T + ' .kb-who__body{grid-column:1/-1}',
/* Ekip: sahne solda, kompakt liste sağda */
T + ' .kv-team__title{font-size:clamp(66px,10.4vw,104px)}',
T + ' .kv-t2{padding-left:9%}',
T + ' .kv-team__lede{margin-left:0}',
T + ' .kv-stage-wrap{grid-column:1/8;grid-row:1;position:relative;top:auto}',
T + ' .kv-stage{max-height:none}',
T + ' .kv-list{grid-column:8/13;grid-row:1}',
T + ' .kv-item{grid-template-columns:34px minmax(0,1fr);padding:14px 0}',
T + ' .kv-item__name{font-size:clamp(22px,2.9vw,30px)}',
T + ' .kv-item__m,' + T + ' .kv-item__d{display:none}',
T + ' .kv-cap__d{display:block}',
T + ' .kv-stage__nav{display:flex}',
T + ' .kv-arrow{width:44px;height:44px}',
/* Standart */
T + ' .kv-std__title{grid-column:1/-1}',
T + ' .kv-std__sub{grid-column:1/-1;margin-top:22px;padding:0}',
T + ' .kv-rule{grid-template-columns:72px minmax(0,1fr) 108px;column-gap:20px;row-gap:14px;align-items:start;min-height:0;padding:34px 0 36px}',
T + ' .kv-rule__n{grid-column:1;grid-row:1/3;font-size:54px}',
T + ' .kv-rule__t,' + T + ' .kv-rule--alt .kv-rule__t{grid-column:2;grid-row:1;font-size:clamp(30px,4.6vw,44px)}',
T + ' .kv-rule__d,' + T + ' .kv-rule--alt .kv-rule__d{grid-column:2;grid-row:2;max-width:56ch}',
T + ' .kv-rule__g{position:relative;top:auto;left:auto!important;grid-column:3;grid-row:1/3;align-self:center;width:100%;margin:0;opacity:.5;transform:none}',
T + ' .kv-rule.is-on .kv-rule__t{transform:none}',
/* Uzmanlık: kaydırmalı vitrin */
T + ' .kv-exp__title{grid-column:1/-1}',
T + ' .kv-exp__ctl{display:flex;grid-column:1/-1;justify-self:start;margin-top:26px}',
T + ' .kv-strip{height:auto;gap:12px;margin-left:-5.56%;margin-right:-5.56%;padding:0 5.56%;overflow-x:auto;overscroll-behavior-x:contain;scroll-snap-type:x mandatory;scroll-padding-left:5.56%;scrollbar-width:none;-webkit-overflow-scrolling:touch}',
T + ' .kv-strip::-webkit-scrollbar{display:none}',
T + ' .kv-p,' + T + ' .kv-p.is-on{flex:0 0 58%;min-height:540px;scroll-snap-align:start;border-color:var(--line);background:linear-gradient(160deg,#0E110F,var(--bg) 70%);transition:border-color .5s var(--ease)}',
T + ' .kv-p.is-on{border-color:rgba(168,207,98,.32)}',
T + ' .kv-p__tab{display:none}',
T + ' .kv-p__body,' + T + ' .kv-p.is-on .kv-p__body{position:relative;width:auto;height:100%;min-height:540px;visibility:visible;opacity:1;transition:none}',
T + ' .kv-p__pat{width:min(56%,300px)}',
T + ' .kv-p__name{font-size:clamp(44px,6.4vw,62px)}',
T + ' .kv-exp__bar{display:block}',
/* Manifesto / Final */
T + ' .kv-man__t{font-size:clamp(58px,10.6vw,108px)}',
T + ' .kv-fin__t{font-size:clamp(80px,12.4vw,128px)}',
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
T + '{font-size:16px;--secpad:72px}',
T + ' .kb-wrap{width:calc(100% - 40px)}',
T + ' .kb-hero{padding-top:104px}',
T + ' .kb-hero__grid{display:block;position:relative}',
T + ' .kb-hero__art{position:absolute;top:-6px;right:-18%;width:78%;max-width:none;opacity:.34;z-index:0;pointer-events:none}',
T + ' .kb-hero__title{font-size:clamp(84px,24vw,120px)}',
T + ' .kb-hero__lede{font-size:18px;max-width:28ch}',
T + ' .kb-hero__foot{flex-direction:column;align-items:flex-start;gap:18px;margin-top:44px}',
T + ' .kb-motto{flex-direction:column;gap:6px}',
T + ' .kb-motto span+span::before{display:none}',
T + ' .kb-who{padding:68px 0}',
T + ' .kb-grid{display:block}',
T + ' .kb-label,' + T + ' .kv-label{font-size:13px;padding:0;margin-bottom:20px}',
T + ' .kb-manifesto{font-size:clamp(34px,9vw,48px);line-height:1.12}',
T + ' .kb-who__cols{grid-template-columns:1fr;row-gap:18px;margin-top:30px}',
/* Ekip: sahne üstte, disiplin şeridi, açıklama */
T + ' .kv-team__title{margin-top:0;font-size:clamp(54px,15.4vw,78px);line-height:1.02}',
T + ' .kv-t2{padding-left:0}',
T + ' .kv-team__lede{margin-top:22px;font-size:16px}',
T + ' .kv-engine{display:flex;flex-direction:column;margin-top:34px}',
T + ' .kv-stage-wrap{order:1}',
T + ' .kv-stage{aspect-ratio:1/1;border-radius:4px}',
T + ' .kv-svg{left:-12.5%;width:125%}',
T + ' .kv-word{font-size:16cqw}',
T + ' .kv-list{order:2;display:flex;gap:8px;margin:16px -20px 0;padding:0 20px 4px;border:0;overflow-x:auto;scroll-snap-type:x proximity;scrollbar-width:none}',
T + ' .kv-list::-webkit-scrollbar{display:none}',
T + ' .kv-list li{flex:none;scroll-snap-align:start}',
T + ' .kv-item{display:flex;align-items:center;gap:8px;width:auto;min-height:44px;padding:0 14px;border:1px solid var(--line);border-radius:22px}',
T + ' .kv-item::before{display:none}',
T + ' .kv-item[aria-pressed="true"]{border-color:rgba(168,207,98,.6);background:rgba(168,207,98,.08)}',
T + ' .kv-item__n{font-size:11px}',
T + ' .kv-item__name,' + T + ' .kv-item[aria-pressed="true"] .kv-item__name{font-size:19px;transform:none;white-space:nowrap}',
T + ' .kv-cap{order:3}',
T + ' .kv-cap__name{font-size:28px}',
/* Standart: dikey ritim; geometri numaranın yanında */
T + ' .kv-std__title{font-size:clamp(50px,14.2vw,72px)}',
T + ' .kv-std__sub{font-size:24px}',
T + ' .kv-rules{margin-top:40px}',
T + ' .kv-rule{grid-template-columns:minmax(0,1fr) 76px;column-gap:16px;row-gap:12px;padding:28px 0 30px}',
T + ' .kv-rule__n{grid-column:1;grid-row:1;font-size:44px}',
T + ' .kv-rule__g{grid-column:2;grid-row:1}',
T + ' .kv-rule__t,' + T + ' .kv-rule--alt .kv-rule__t{grid-column:1/-1;grid-row:2;font-size:clamp(28px,8.2vw,38px)}',
T + ' .kv-rule__d,' + T + ' .kv-rule--alt .kv-rule__d{grid-column:1/-1;grid-row:3}',
/* Uzmanlık */
T + ' .kv-exp__title{font-size:clamp(42px,11.6vw,60px)}',
T + ' .kv-strip{margin-left:-20px;margin-right:-20px;padding:0 20px;scroll-padding-left:20px}',
T + ' .kv-p,' + T + ' .kv-p.is-on{flex-basis:86%;min-height:500px}',
T + ' .kv-p__body,' + T + ' .kv-p.is-on .kv-p__body{min-height:500px;padding:24px}',
T + ' .kv-p__pat{width:62%;right:8px;top:8px}',
T + ' .kv-p__name{font-size:clamp(40px,11vw,52px)}',
T + ' .kv-p__d{font-size:16px}',
/* Manifesto */
T + ' .kv-man{padding:96px 0}',
T + ' .kv-man__t{margin-top:26px;font-size:clamp(46px,13.4vw,64px);line-height:1.04}',
T + ' .kv-ml--a{white-space:normal}',
T + ' .kv-ml--b{text-align:left;padding-left:8%}',
T + ' .kv-ml--c{padding-left:0}',
T + ' .kv-tail i,' + T + ' .kv-tail b{right:-20px}',
/* Final */
T + ' .kv-fin{padding:96px 0 92px}',
T + ' .kv-fin__svg{opacity:.55}',
T + ' .kv-fin__t{font-size:clamp(56px,15.6vw,78px);line-height:1}',
T + ' .kv-fin__sub{font-size:18px}',
T + ' .kb-cta__actions{flex-direction:column;gap:11px;margin-top:30px}',
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
T + ' .kv-list{margin-left:-16px;margin-right:-16px;padding-left:16px;padding-right:16px}',
T + ' .kv-strip{margin-left:-16px;margin-right:-16px;padding:0 16px;scroll-padding-left:16px}',
T + ' n1-header .n1h-bar.site-container{width:calc(100% - 32px)!important}',
'}',
/* Hareket azaltma: CSS geçişleri de kısalır (içerik zaten görünür) */
'@media (prefers-reduced-motion:reduce){',
T + ' .kv-p,' + T + ' .kv-p__body,' + T + ' .kv-p__tab,' + T + ' .kv-rule,' + T + ' .kv-rule *,' + T + ' .kv-item,' + T + ' .kv-item *,' + T + ' .kv-p__tab *,' + T + ' .kv-item::before{transition-duration:.01ms!important;transition-delay:0s!important}',
'}'
  ].join('\n');

  /* ---------- Bileşen ---------- */
  class KisacaBizV3 extends HTMLElement {
    connectedCallback() {
      if (this._on) return;
      this._on = true;
      this._cleanups = [];
      this._motion = false;
      var base = this.getAttribute('deps-base');
      this._url = function (k) { return (base ? base.replace(/\/?$/, '/') + 'gh@' : CDN) + PATHS[k]; };
      this.classList.add('n1-inner-page');
      this._mount().catch((e) => {
        console.error('[' + TAG + ']', e);
        if (!this.querySelector('main.kb')) this.innerHTML = '<p style="padding:40px 5%;color:#ECEBE5;font:16px Barlow,Arial,sans-serif">Kısaca Biz yüklenemedi. Lütfen sayfayı yenileyin.</p>';
      });
    }

    _on_(el, ev, fn, opt) { el.addEventListener(ev, fn, opt); this._cleanups.push(function () { el.removeEventListener(ev, fn, opt); }); }

    async _mount() {
      var self = this, url = this._url;
      if (!document.getElementById('n1-kb-v3-style')) {
        var st = document.createElement('style'); st.id = 'n1-kb-v3-style'; st.textContent = CSS; document.head.appendChild(st);
      }
      this.innerHTML = '<div id="ust" style="height:0"></div>' + markup();
      this._anchors();
      this._engine();
      this._rules();
      this._strip();

      var fonts = loadCss(FONTS).catch(function (e) { console.warn('[' + TAG + '] Font yüklenemedi, yedek font kullanılıyor', e); });
      await Promise.all([loadCss(url('footerCss')), loadCss(url('responsive')), loadJs(url('markup'), function () { return !!window.N1_SITE_MARKUP; })]);
      if (!this._on) return;

      // Header / Footer / WhatsApp — onaylı v6.48 işaretlemesinden (V2 ile aynı akış)
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
          } catch (e) { console.warn('[' + TAG + '] Menü verisi okunamadı; onaylı veri olduğu gibi kullanılıyor', e); }
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

      await fonts;
      if (!window.gsap) await loadJs(GSAP, function () { return !!window.gsap; }).catch(function (e) { console.warn('[' + TAG + '] GSAP yüklenemedi; içerik animasyonsuz gösterilir', e); });
      if (window.gsap && !window.ScrollTrigger) await loadJs(ST, function () { return !!window.ScrollTrigger; }).catch(function (e) { console.warn('[' + TAG + '] ScrollTrigger yüklenemedi', e); });
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
      this._on_(a, 'click', function (e) {
        e.preventDefault();
        var t = self.querySelector('#kb-biz'); if (!t) return;
        scrollTo({ top: t.getBoundingClientRect().top + scrollY - 72, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      });
    }

    /* ---------- Creative Engine: durum + etkileşim (GSAP'siz de çalışır) ---------- */
    _engine() {
      var self = this, root = this.querySelector('[data-kv="engine"]');
      var els = [].slice.call(root.querySelectorAll('.kv-pt'));
      var btns = [].slice.call(root.querySelectorAll('.kv-item'));
      var stage = root.querySelector('.kv-stage'), word = root.querySelector('.kv-word>span');
      var cap = { n: root.querySelector('.kv-cap__n'), name: root.querySelector('.kv-cap__name'), m: root.querySelector('.kv-cap__m b'), d: root.querySelector('.kv-cap__d') };
      var E = this._eng = {
        i: 0, P: FORMS[0].map(function (p) { return Object.assign({}, p); }),
        W: { 0: 1, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }, push: els.map(function () { return { x: 0, y: 0 }; }), ptr: null, t: 0, els: els, stage: stage
      };
      E.render = function () {
        var t = E.t;
        for (var i = 0; i < NP; i++) {
          var b = E.P[i], x = b.x, y = b.y, r = b.r, w = b.w, h = b.h;
          for (var m = 0; m < 7; m++) {
            var wm = E.W[m]; if (wm < .001) continue;
            var d = IDLE[m](b, i, t); x += d[0] * wm; y += d[1] * wm; r += d[2] * wm; w += d[3] * wm; h += d[4] * wm;
          }
          var q = E.push[i]; x += q.x; y += q.y;
          els[i].setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') rotate(' + r.toFixed(1) + ') scale(' + Math.max(w, .1).toFixed(2) + ' ' + Math.max(h, .1).toFixed(2) + ')');
          els[i].setAttribute('opacity', b.o.toFixed(2));
        }
      };
      E.set = function (i, quiet) {
        i = (i + 7) % 7; if (i === E.i && !quiet) return;
        var prev = E.i; E.i = i;
        var e = ENGINE[i], T2 = FORMS[i], acc = ACC[i];
        btns.forEach(function (b, k) { b.setAttribute('aria-pressed', String(k === i)); });
        els.forEach(function (el, k) { el.classList.toggle('is-a', acc(k)); });
        cap.n.textContent = pad(i + 1) + ' / 07'; cap.name.textContent = e.n; cap.m.textContent = e.m; cap.d.textContent = e.d;
        var g = window.gsap;
        if (g && self._motion) {
          g.killTweensOf(E.P); g.killTweensOf(E.W);
          g.to(E.P, {
            x: function (k) { return T2[k].x; }, y: function (k) { return T2[k].y; }, w: function (k) { return T2[k].w; }, h: function (k) { return T2[k].h; }, o: function (k) { return T2[k].o; },
            r: function (k) { var c = E.P[k].r, tr = T2[k].r; return tr + 180 * Math.round((c - tr) / 180); },
            duration: 1.15, ease: 'expo.inOut', stagger: { each: .011, from: e.from }, onUpdate: E.kick
          });
          var wv = {}; for (var m = 0; m < 7; m++) wv[m] = m === i ? 1 : 0;
          g.to(E.W, Object.assign(wv, { duration: .9, ease: 'power2.inOut' }));
          if (self._wordTl) self._wordTl.kill();
          self._wordTl = g.timeline()
            .to(word, { yPercent: dirSign(prev, i) * -105, duration: .32, ease: 'power3.in' })
            .add(function () { word.textContent = e.n; })
            .fromTo(word, { yPercent: dirSign(prev, i) * 105 }, { yPercent: 0, duration: .7, ease: 'expo.out' });
        } else {
          E.P = T2.map(function (p) { return Object.assign({}, p); });
          for (var m2 = 0; m2 < 7; m2++) E.W[m2] = 0;
          word.textContent = e.n;
          E.render();
        }
      };
      function dirSign(a, b) { return b > a ? 1 : -1; }
      E.kick = function () { if (!E.running) E.render(); };
      els.forEach(function (el, k) { el.classList.toggle('is-a', ACC[0](k)); });
      E.W[0] = 0; E.render(); E.W[0] = 1;

      var list = root.querySelector('.kv-list');
      this._on_(list, 'click', function (e) { var b = e.target.closest('.kv-item'); if (b) E.set(+b.getAttribute('data-i')); });
      this._on_(list, 'pointerover', function (e) {
        if (e.pointerType !== 'mouse' || !matchMedia('(hover:hover) and (min-width:1025px)').matches) return;
        var b = e.target.closest('.kv-item'); if (b) E.set(+b.getAttribute('data-i'));
      });
      this._on_(list, 'keydown', function (e) {
        var b = e.target.closest('.kv-item'); if (!b) return;
        var i = +b.getAttribute('data-i'), j = null;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') j = (i + 1) % 7; else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') j = (i + 6) % 7;
        else if (e.key === 'Home') j = 0; else if (e.key === 'End') j = 6;
        if (j != null) { e.preventDefault(); btns[j].focus(); E.set(j); }
      });
      [].forEach.call(root.querySelectorAll('.kv-arrow'), function (a) {
        self._on_(a, 'click', function () { var j = (E.i + +a.getAttribute('data-d') + 7) % 7; E.set(j); E.reveal(j); });
      });
      // Dokunmatik: sahnede yatay kaydırma ile disiplin değişir
      var sx = null, sy = 0;
      this._on_(stage, 'pointerdown', function (e) { if (e.pointerType === 'mouse') return; sx = e.clientX; sy = e.clientY; });
      this._on_(stage, 'pointerup', function (e) {
        if (sx == null) return; var dx = e.clientX - sx, dy = e.clientY - sy; sx = null;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.3) { var j = (E.i + (dx < 0 ? 1 : -1) + 7) % 7; E.set(j); E.reveal(j); }
      });
      this._on_(stage, 'pointercancel', function () { sx = null; });
      // Mobilde aktif disiplin çipini görünür alana getir (sayfayı kaydırmadan)
      E.reveal = function (j) {
        if (getComputedStyle(list).overflowX !== 'auto') return;
        var li = btns[j].parentNode; list.scrollTo({ left: li.offsetLeft - 20, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      };
    }

    /* ---------- Bizim Standardımız ---------- */
    _rules() {
      var self = this, list = this.querySelector('[data-kv="rules"]'), rows = [].slice.call(list.querySelectorAll('.kv-rule'));
      var desk = function () { return matchMedia('(hover:hover) and (min-width:1025px)').matches; };
      var R = this._rul = { play: function () {} };
      R.on = function (row, x) {
        rows.forEach(function (r) { if (r !== row) r.classList.remove('is-on'); });
        if (!row.classList.contains('is-on')) { row.classList.add('is-on'); R.play(+row.getAttribute('data-i')); }
        if (x != null) R.move(row, x);
      };
      R.off = function (row) { row.classList.remove('is-on'); };
      R.move = function (row, x) {
        var r = row.getBoundingClientRect(), p = Math.min(.82, Math.max(.18, (x - r.left) / r.width));
        row.style.setProperty('--ox', (p * 100).toFixed(1) + '%');
        if (R.gx) R.gx(row, p * 100); else row.style.setProperty('--gx', (p * 100).toFixed(1) + '%');
      };
      rows.forEach(function (row) {
        self._on_(row, 'pointerenter', function (e) { if (e.pointerType === 'mouse' && desk()) { list.classList.add('is-hover'); R.on(row, e.clientX); } });
        self._on_(row, 'pointermove', function (e) { if (e.pointerType === 'mouse' && desk()) R.move(row, e.clientX); });
        self._on_(row, 'pointerleave', function (e) { if (e.pointerType === 'mouse' && desk()) R.off(row); });
        self._on_(row, 'focus', function () { R.on(row); });
        self._on_(row, 'click', function (e) { if (e.pointerType !== 'mouse' || !desk()) R.on(row); });
      });
      this._on_(list, 'pointerleave', function () { list.classList.remove('is-hover'); });
    }

    /* ---------- Uzmanlık şeridi ---------- */
    _strip() {
      var self = this, sec = this.querySelector('.kv-exp'), strip = sec.querySelector('[data-kv="strip"]');
      var panels = [].slice.call(strip.querySelectorAll('.kv-p'));
      var count = sec.querySelector('.kv-exp__count b'), bar = sec.querySelector('.kv-exp__bar');
      var carousel = function () { return matchMedia('(max-width:1024px)').matches; };
      var X = this._exp = { i: 0, play: function () {} };
      X.set = function (i, fromScroll) {
        i = Math.max(0, Math.min(6, i)); if (i === X.i && !fromScroll) return; if (i === X.i) return;
        X.i = i;
        panels.forEach(function (p, k) { p.classList.toggle('is-on', k === i); p.querySelector('.kv-p__tab').setAttribute('aria-expanded', String(k === i)); });
        count.textContent = pad(i + 1); bar.style.setProperty('--k', i);
        X.play(i);
      };
      X.go = function (i) {
        i = Math.max(0, Math.min(6, i));
        if (carousel()) strip.scrollTo({ left: panels[i].offsetLeft - parseFloat(getComputedStyle(strip).paddingLeft), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
        else X.set(i);
      };
      var timer = 0;
      panels.forEach(function (p, k) {
        var tab = p.querySelector('.kv-p__tab');
        self._on_(tab, 'click', function () { X.set(k); });
        self._on_(p, 'pointerenter', function (e) {
          if (e.pointerType !== 'mouse' || carousel()) return;
          clearTimeout(timer); timer = setTimeout(function () { X.set(k); }, 90);
        });
        self._on_(p, 'pointerleave', function () { clearTimeout(timer); });
        self._on_(p, 'focusin', function () { if (!carousel()) X.set(k); });
      });
      this._cleanups.push(function () { clearTimeout(timer); });
      [].forEach.call(sec.querySelectorAll('.kv-arrow'), function (a) {
        self._on_(a, 'click', function () { X.go(X.i + +a.getAttribute('data-d')); });
      });
      var raf = 0;
      this._on_(strip, 'scroll', function () {
        if (!carousel() || raf) return;
        raf = requestAnimationFrame(function () {
          raf = 0;
          var pl = parseFloat(getComputedStyle(strip).paddingLeft) || 0, best = 0, bd = 1e9;
          panels.forEach(function (p, k) { var d = Math.abs(p.offsetLeft - pl - strip.scrollLeft); if (d < bd) { bd = d; best = k; } });
          X.set(best, true);
        });
      }, { passive: true });
      this._cleanups.push(function () { cancelAnimationFrame(raf); });
    }

    /* ---------- Hareket ---------- */
    _animate() {
      var gsap = window.gsap, STg = window.ScrollTrigger, self = this;
      if (!gsap) return;                                     // içerik zaten görünür ve etkileşimler çalışır
      if (STg) gsap.registerPlugin(STg);
      var q = function (s, r) { return [].slice.call((r || self).querySelectorAll(s)); };
      var E = this._eng;
      this._ctx = gsap.context(function () {
        var mm = gsap.matchMedia();
        self._mm = mm;

        /* Hero (V2 ile aynı) */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
          tl.from(q('.kb-hero [data-kb="tag"]'), { autoAlpha: 0, y: 12, duration: .6 })
            .from(q('.kb-hero__title .kb-ln>span'), { yPercent: 112, duration: 1.1, stagger: .1 }, '<.1')
            .from(q('.kb-hl'), { strokeDashoffset: 1, duration: 1.4, stagger: .06, ease: 'power2.inOut' }, '<.1')
            .from(q('.kb-hc, .kb-hx'), { autoAlpha: 0, duration: 1, stagger: .08 }, '<.3')
            .from(q('.kb-hsq'), { scale: .4, transformOrigin: '50% 50%', autoAlpha: 0, duration: .8 }, '-=.6')
            .from(q('.kb-hdot'), { scale: 0, transformOrigin: '50% 50%', duration: .5, ease: 'back.out(2)' }, '-=.4')
            .fromTo(q('.kb-hpulse'), { attr: { r: 9 }, autoAlpha: .9 }, { attr: { r: 60 }, autoAlpha: 0, duration: 1.4, ease: 'power2.out' }, '-=.2')
            .from(q('.kb-hero__lede, .kb-hero__foot'), { autoAlpha: 0, y: 18, duration: .9, stagger: .12 }, '-=1.6');
        });
        mm.add('(prefers-reduced-motion: no-preference) and (min-width: 1025px) and (hover: hover)', function () {
          var art = self.querySelector('.kb-hg'), hero = self.querySelector('.kb-hero');
          var xTo = gsap.quickTo(art, 'x', { duration: .9, ease: 'power3' }), yTo = gsap.quickTo(art, 'y', { duration: .9, ease: 'power3' });
          var mv = function (e) { var r = hero.getBoundingClientRect(); xTo(((e.clientX - r.left) / r.width - .5) * 18); yTo(((e.clientY - r.top) / r.height - .5) * 14); };
          hero.addEventListener('pointermove', mv);
          return function () { hero.removeEventListener('pointermove', mv); };
        });

        /* Creative Engine: yaşayan sahne (ticker yalnızca sahne görünürken çalışır) */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          self._motion = true;
          var stage = E.stage, visible = false, added = false, t0 = 0;
          var tick = function (time) {
            E.t = time - t0;
            var p = E.ptr;
            for (var i = 0; i < NP; i++) {
              var b = E.P[i], u = E.push[i], tx = 0, ty = 0;
              if (p) { var dx = b.x - p.x, dy = b.y - p.y, d = Math.sqrt(dx * dx + dy * dy) || 1; if (d < 150) { var f = (1 - d / 150); f = f * f * 52; tx = dx / d * f; ty = dy / d * f; } }
              u.x += (tx - u.x) * .12; u.y += (ty - u.y) * .12;
            }
            E.render();
          };
          var sync = function () {
            var want = visible && !document.hidden;
            if (want && !added) { gsap.ticker.add(tick); added = true; E.running = true; }
            else if (!want && added) { gsap.ticker.remove(tick); added = false; E.running = false; }
          };
          var io = new IntersectionObserver(function (en) { visible = en[0].isIntersecting; sync(); }, { rootMargin: '80px 0px' });
          io.observe(stage);
          document.addEventListener('visibilitychange', sync);
          var onMove = function (e) {
            if (e.pointerType !== 'mouse') return;
            var r = stage.getBoundingClientRect(), s = Math.min(r.width / 800, r.height / 600), ox = (r.width - 800 * s) / 2, oy = (r.height - 600 * s) / 2;
            E.ptr = { x: (e.clientX - r.left - ox) / s, y: (e.clientY - r.top - oy) / s };
          };
          var onLeave = function () { E.ptr = null; };
          stage.addEventListener('pointermove', onMove); stage.addEventListener('pointerleave', onLeave);
          // Sahneye girişte parçalar merkezdeki tek noktadan açılır (1N: tek nokta, pek çok biçim)
          if (STg) {
            var start = E.P.map(function () { return { x: CX, y: CY, w: 1, h: 1, o: 0 }; });
            var target = E.P.map(function (b) { return Object.assign({}, b); });
            E.P.forEach(function (b, k) { Object.assign(b, start[k]); });
            E.render();
            gsap.to(E.P, {
              x: function (k) { return target[k].x; }, y: function (k) { return target[k].y; }, w: function (k) { return target[k].w; }, h: function (k) { return target[k].h; }, o: function (k) { return target[k].o; },
              duration: 1.6, ease: 'expo.out', stagger: { each: .014, from: 'center' }, onUpdate: E.kick,
              scrollTrigger: { trigger: stage, start: 'top 78%', once: true }
            });
          }
          return function () {
            self._motion = false; io.disconnect(); document.removeEventListener('visibilitychange', sync);
            if (added) gsap.ticker.remove(tick); added = false; E.running = false;
            stage.removeEventListener('pointermove', onMove); stage.removeEventListener('pointerleave', onLeave);
            gsap.killTweensOf(E.P); gsap.killTweensOf(E.W);
            E.ptr = null; E.push.forEach(function (u) { u.x = 0; u.y = 0; });
            E.P = FORMS[E.i].map(function (p) { return Object.assign({}, p); });
            for (var m = 0; m < 7; m++) E.W[m] = 0;
            E.render(); E.W[E.i] = 1;
          };
        });

        /* Standart: ilke geometrileri (masaüstünde imleci izler) */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          var rows = q('.kv-rule'), tls = rows.map(function (row) { return glyphTl(gsap, row.querySelector('.kv-g')); });
          var gx = rows.map(function (row) {
            var o = { v: 58 };
            return gsap.quickTo(o, 'v', { duration: .6, ease: 'power3', onUpdate: function () { row.style.setProperty('--gx', o.v.toFixed(2) + '%'); } });
          });
          self._rul.play = function (i) { if (tls[i]) tls[i].restart(); };
          self._rul.gx = function (row, v) { var i = rows.indexOf(row); if (gx[i]) gx[i](v); };
          // Satırların alt çizgileri: kaydırma ile soldan sağa yazılır
          rows.forEach(function (row) {
            if (STg) gsap.from(row.querySelector('.kv-rule__line'), { scaleX: 0, transformOrigin: '0 50%', duration: 1.2, ease: 'power3.inOut', scrollTrigger: { trigger: row, start: 'top 88%', once: true } });
          });
          return function () { self._rul.play = function () {}; self._rul.gx = null; };
        });
        // Dokunmatik / dar ekran: ekranın ortasına gelen ilke etkinleşir
        if (STg) mm.add('(max-width: 1024px), (hover: none)', function () {
          q('.kv-rule').forEach(function (row) {
            STg.create({ trigger: row, start: 'top 62%', end: 'bottom 40%', onToggle: function (s) { if (s.isActive) self._rul.on(row); } });
          });
        });

        /* Uzmanlık: desen çizimi */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          var pats = q('.kv-p__pat');
          self._exp.play = function (i) {
            var p = pats[i]; if (!p) return;
            gsap.killTweensOf(p.querySelectorAll('.kx-s, .kx-f'));
            gsap.fromTo(p.querySelectorAll('.kx-s'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.3, ease: 'power2.inOut', stagger: .07, overwrite: true });
            gsap.fromTo(p.querySelectorAll('.kx-f'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: .6, ease: 'back.out(2)', stagger: .06, delay: .5, overwrite: true });
            var pan = p.closest('.kv-p');
            gsap.fromTo(pan.querySelectorAll('.kv-p__k, .kv-p__name, .kv-p__d, .kb-link'), { y: 22, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .8, ease: 'expo.out', stagger: .06, delay: .18, overwrite: true });
          };
          if (STg) STg.create({ trigger: self.querySelector('.kv-strip'), start: 'top 75%', once: true, onEnter: function () { self._exp.play(self._exp.i); } });
          return function () { self._exp.play = function () {}; gsap.set(q('.kv-p__k, .kv-p__name, .kv-p__d, .kv-p .kb-link'), { clearProps: 'transform,opacity,visibility' }); };
        });

        if (!STg) return;

        /* Biz kimiz? (V2 ile aynı giriş) */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          q('.kb-who [data-kb="fade"]').forEach(function (el) {
            gsap.from(el, { autoAlpha: 0, y: 22, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
          });
        });

        /* Ekip başlığı: "tek bir bakış" kelimeleri birleşir, "pek çok yetenek" harfleri hizaya oturur (scrub, pin yok) */
        mm.add({ d: '(prefers-reduced-motion: no-preference) and (min-width: 768px)', m: '(prefers-reduced-motion: no-preference) and (max-width: 767px)' }, function (ctx) {
          var amp = ctx.conditions.d ? 1 : .45, title = self.querySelector('.kv-team__title');
          var w = q('.kv-t1 .kv-w', title), ch = q('.kv-t2 .kv-ch', title);
          var tl = gsap.timeline({ scrollTrigger: { trigger: title, start: 'top 92%', end: 'bottom 45%', scrub: .8 } });
          tl.fromTo(w, { x: function (k) { return (k - 1) * innerWidth * .12 * amp; }, opacity: .25 }, { x: 0, opacity: 1, ease: 'power2.out', duration: 1 }, 0)
            .fromTo(ch, { y: function (k) { return (((k * 37) % 9) - 4) * 14 * amp; }, rotation: function (k) { return (((k * 53) % 7) - 3) * 4 * amp; }, opacity: .2 },
              { y: 0, rotation: 0, opacity: 1, ease: 'power3.out', duration: .9, stagger: { each: .025, from: 'random' } }, .1);
          gsap.from(self.querySelector('.kv-team__lede'), { autoAlpha: 0, y: 18, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: self.querySelector('.kv-team__lede'), start: 'top 90%', once: true } });
          gsap.from(q('.kv-item'), { autoAlpha: 0, x: -24, duration: .8, ease: 'power3.out', stagger: .05, scrollTrigger: { trigger: self.querySelector('.kv-list'), start: 'top 85%', once: true } });
        });
        // Masaüstü: liste kaydırıldıkça yapışkan sahne disipline dönüşür
        mm.add('(min-width: 1025px)', function () {
          q('.kv-list li').forEach(function (li, k) {
            STg.create({ trigger: li, start: 'top 58%', end: 'bottom 58%', onToggle: function (s) { if (s.isActive) E.set(k); else if (k === 0 && s.direction < 0) E.set(0); } });
          });
        });

        /* Standart / Uzmanlık / Final başlık maskeleri */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          q('.kv-std__title, .kv-exp__title, .kv-fin__t').forEach(function (h) {
            gsap.from(h.querySelectorAll('.kb-ln>span'), { yPercent: 112, duration: 1.1, ease: 'power4.out', stagger: .1, scrollTrigger: { trigger: h, start: 'top 86%', once: true } });
          });
          gsap.from(self.querySelector('.kv-std__sub'), { autoAlpha: 0, x: 30, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: self.querySelector('.kv-std__sub'), start: 'top 90%', once: true } });
          // Numaralar: kaydırmayla dikey ritim (scrub, küçük genlik)
          q('.kv-rule__n').forEach(function (n, k) {
            gsap.fromTo(n, { yPercent: 18 + k * 4 }, { yPercent: -18, ease: 'none', scrollTrigger: { trigger: n.parentNode, start: 'top bottom', end: 'bottom top', scrub: true } });
          });
          gsap.from(q('.kv-p'), { autoAlpha: 0, yPercent: 8, duration: 1, ease: 'expo.out', stagger: .06, scrollTrigger: { trigger: self.querySelector('.kv-strip'), start: 'top 85%', once: true } });
        });

        /* Manifesto: kelimeler ayrılıp yeniden birleşir; kuyruk çizgisi "devamını" çizer */
        mm.add({ d: '(prefers-reduced-motion: no-preference) and (min-width: 768px)', m: '(prefers-reduced-motion: no-preference) and (max-width: 767px)' }, function (ctx) {
          var a = ctx.conditions.d ? 1 : .5, sec = self.querySelector('.kv-man');
          var A = q('.kv-ml--a .kv-mw', sec), B = q('.kv-ml--b .kv-mw', sec), C = q('.kv-ml--c .kv-mw', sec), D = q('.kv-ml--d .kv-ch', sec);
          var tl = gsap.timeline({ scrollTrigger: { trigger: sec, start: 'top 85%', end: 'center 52%', scrub: 1, invalidateOnRefresh: true } });
          tl.fromTo(A, { x: function (k) { return (k ? 1 : -1) * innerWidth * .16 * a; } }, { x: 0, ease: 'power2.inOut', duration: .45 }, 0)
            .fromTo(B, { x: function () { return innerWidth * .22 * a; }, opacity: .3 }, { x: 0, opacity: 1, ease: 'power2.inOut', duration: .45 }, 0)
            .fromTo(C, { x: function () { return -innerWidth * .2 * a; }, opacity: .2 }, { x: 0, opacity: 1, ease: 'power3.out', duration: .4 }, .3)
            .fromTo(D, { y: function (k) { return (k % 2 ? -1 : 1) * (28 + (k * 13) % 30) * a; }, x: function (k) { return (k - 5.5) * 16 * a; }, opacity: 0 },
              { y: 0, x: 0, opacity: 1, ease: 'power3.out', duration: .45, stagger: .02 }, .38)
            .fromTo(sec.querySelector('.kv-tail i'), { scaleX: 0 }, { scaleX: 1, ease: 'power2.inOut', duration: .3 }, .72)
            .fromTo(sec.querySelector('.kv-tail b'), { scale: 0 }, { scale: 1, ease: 'back.out(3)', duration: .12 }, .94);
          gsap.fromTo(q('.kv-hz', sec), { xPercent: function (k) { return (k % 2 ? -1 : 1) * 8; } }, { xPercent: function (k) { return (k % 2 ? 1 : -1) * 8; }, ease: 'none', scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: true } });
        });

        /* Final: yedi disiplin tek noktada buluşur, ışınlar sınırların ötesine uzanır */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          var sec = self.querySelector('.kv-fin'), seeds = q('.kv-seed', sec);
          var tl = gsap.timeline({ scrollTrigger: { trigger: sec, start: 'top 70%', once: true } });
          tl.from(q('.kv-fring', sec), { scale: .3, svgOrigin: '1120 450', autoAlpha: 0, duration: 1.2, ease: 'expo.out', stagger: .1 }, 0)
            .from(seeds, { x: function (k) { return '+=' + (+seeds[k].getAttribute('data-x') * 11); }, y: function (k) { return '+=' + (+seeds[k].getAttribute('data-y') * 11); }, rotation: 90, transformOrigin: '50% 50%', autoAlpha: 0, duration: 1.1, ease: 'expo.inOut', stagger: .05 }, .1)
            .from(q('.kv-fdot', sec), { scale: 0, svgOrigin: '1120 450', duration: .5, ease: 'back.out(3)' }, .95)
            .from(q('.kv-ray', sec), { strokeDashoffset: 1, duration: 1.6, ease: 'power3.out', stagger: { each: .03, from: 'random' } }, 1.05)
            .from(q('.kv-fin__sub, .kv-fin .kb-cta__actions', sec), { autoAlpha: 0, y: 20, duration: .9, ease: 'power3.out', stagger: .1 }, .9);
        });
        mm.add('(prefers-reduced-motion: no-preference) and (min-width: 1025px) and (hover: hover)', function () {
          var sec = self.querySelector('.kv-fin'), g = sec.querySelector('.kv-fin__g');
          var xTo = gsap.quickTo(g, 'x', { duration: 1.2, ease: 'power3' }), yTo = gsap.quickTo(g, 'y', { duration: 1.2, ease: 'power3' });
          var mv = function (e) { var r = sec.getBoundingClientRect(); xTo(((e.clientX - r.left) / r.width - .5) * 60); yTo(((e.clientY - r.top) / r.height - .5) * 40); };
          sec.addEventListener('pointermove', mv);
          return function () { sec.removeEventListener('pointermove', mv); };
        });
      }, this);

      // Kontrollü yenileme: fontlar + yükleme bitince bir kez; sonra yalnızca yükseklik değişirse veya ekran yönü dönerse
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
        var onOri = function () { clearTimeout(t); t = setTimeout(refresh, 350); };
        this._on_(window, 'orientationchange', onOri);
        this._cleanups.push(function () { clearTimeout(t); });
      }
    }

    disconnectedCallback() {
      this._on = false;
      if (this._ro) { this._ro.disconnect(); this._ro = null; }
      if (this._wordTl) { this._wordTl.kill(); this._wordTl = null; }
      if (this._ctx) { this._ctx.revert(); this._ctx = null; }          // tweens + ScrollTrigger + matchMedia (ticker/IO temizliği dahil)
      var self = this;
      if (window.ScrollTrigger) window.ScrollTrigger.getAll().forEach(function (t) { var el = t.trigger; if (el && (self.contains(el) || !el.isConnected)) t.kill(); });
      if (window.gsap && this._eng) { window.gsap.killTweensOf(this._eng.P); window.gsap.killTweensOf(this._eng.W); }
      // Paylaşılan Footer modülünün bu kopyaya bağlı tweenleri (modül değiştirilmeden) bellekte kalmasın
      if (window.gsap) {
        var mine = function (t) { return t.targets().some(function (el) { return el && el.nodeType === 1 && self.contains(el); }); };
        window.gsap.globalTimeline.getChildren(false, true, true).forEach(function (a) {
          if (a.getChildren ? a.getChildren(true, true, false).some(mine) : mine(a)) a.kill();
        });
      }
      (this._cleanups || []).forEach(function (f) { try { f(); } catch (e) {} });
      this._cleanups = [];
      if (this._fcOwned) document.body.classList.remove('n1-inner-fc-enabled');
      this._fcOwned = false; this._header = null; this._eng = null;
      this.replaceChildren();
      var st = document.getElementById('n1-kb-v3-style'); if (st && !document.querySelector(TAG)) st.remove();
    }
  }

  /* İlkeye özgü geometri zaman çizelgeleri (duraklatılmış; satır etkinleşince yeniden oynar) */
  function glyphTl(gsap, svg) {
    var s = function (c) { return svg.querySelectorAll(c); }, tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });
    var k = (svg.getAttribute('class').match(/kv-g--(\w+)/) || [])[1];
    if (k === 'ask') {
      tl.fromTo(s('.g-ring'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: .9, ease: 'power2.inOut' })
        .fromTo(s('.g-dash'), { rotation: -90, svgOrigin: '60 60' }, { rotation: 90, svgOrigin: '60 60', duration: 1.4 }, 0)
        .fromTo(s('.g-orb'), { rotation: -320, svgOrigin: '60 60' }, { rotation: 0, svgOrigin: '60 60', duration: 1.2, ease: 'power2.inOut' }, 0)
        .fromTo(s('.g-dot'), { attr: { cx: 104 } }, { attr: { cx: 60 }, duration: .5, ease: 'back.out(2)' }, 1.1);
    } else if (k === 'join') {
      tl.fromTo(s('.g-a'), { attr: { cx: 18 } }, { attr: { cx: 46 }, duration: 1, ease: 'expo.inOut' })
        .fromTo(s('.g-b'), { attr: { cx: 102 } }, { attr: { cx: 74 }, duration: 1, ease: 'expo.inOut' }, 0)
        .fromTo(s('.g-mid'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: .45, ease: 'back.out(3)' }, .8);
    } else if (k === 'tech') {
      tl.fromTo(s('.g-sq'), { rotation: 45, scale: .6, svgOrigin: '60 60' }, { rotation: 0, scale: 1, svgOrigin: '60 60', duration: 1, ease: 'expo.inOut' })
        .fromTo(s('.g-grid'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: .8, ease: 'power2.inOut' }, .5)
        .fromTo(s('.g-node'), { x: -22, y: 22 }, { x: 0, y: 0, duration: .6, ease: 'steps(4)' }, .9);
    } else if (k === 'detail') {
      tl.fromTo(s('.g-n1, .g-n2, .g-n3'), { scale: 0, svgOrigin: '60 60' }, { scale: 1, svgOrigin: '60 60', duration: .7, stagger: .14, ease: 'expo.out' })
        .fromTo(s('.g-x'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: .6 }, .3)
        .fromTo(s('.g-n3'), { rotation: 0, svgOrigin: '60 60' }, { rotation: 90, svgOrigin: '60 60', duration: .6, ease: 'power2.inOut' }, .8);
    } else if (k === 'measure') {
      tl.fromTo(s('.g-base'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: .6 })
        .fromTo(s('.g-step'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut' }, .2)
        .fromTo(s('.g-end'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: .45, ease: 'back.out(3)' }, 1.2);
    }
    return tl;
  }

  customElements.define(TAG, KisacaBizV3);
})();
