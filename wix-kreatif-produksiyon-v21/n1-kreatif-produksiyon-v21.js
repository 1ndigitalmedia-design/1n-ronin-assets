/*!
 * n1-kreatif-produksiyon-v21 — 1N Digital Media · Kreatif Prodüksiyon (/kreatif-produksiyon) · Cinematic Editorial Experience
 * Wix Studio Custom Element · Tag name: n1-kreatif-produksiyon-v2 · Kaynak: bu dosyanın HTTPS adresi
 *
 * Yeni, bağımsız giriş dosyası. Önceki Kreatif Prodüksiyon kaynakları değiştirilmedi.
 *
 * Mimari (Kısaca Biz V3 ile aynı entegrasyon yöntemi):
 *  - Light DOM: onaylı v6.48 Header + menü, Footer, WhatsApp / Yukarı Çık modülleri aynen, commit'e sabit adreslerden yüklenir.
 *  - Sayfaya özel CSS yalnızca n1-kreatif-produksiyon-v2 etiketi kapsamında (menü panelinde yalnızca [data-n1-kp] işaretli panel).
 *  - GSAP 3.13.0 + ScrollTrigger yalnızca sayfada yoksa yüklenir. Pin / spacer yok. Bütün animasyonlar gsap.context + matchMedia içinde.
 *  - İçerik CSS'te gizlenmez: GSAP yüklenemezse veya prefers-reduced-motion açıksa sayfa görünür ve kullanılabilir.
 *
 * Video (tek kaynak, iki görünüm):
 *  - Kaynak: https://video.wixstatic.com/video/6dbf5e_2821f1bb754740f9bc6deb51f052cf8c/1080p/mp4/file.mp4
 *    (30,17 sn · 1920×1080 · 16:9 · ses izi var). Wix aynı videoyu 720p ve 480p olarak da sunar; mobil / veri tasarrufu
 *    durumunda daha hafif sürüm seçilir. Poster: Wix'in bu video için ürettiği gerçek kare (f002).
 *  - Hero ve "Hareket" monitörü ayrı <video> öğeleridir ama aynı anda yalnızca biri oynar; görünmeyen video duraklatılır.
 *    Monitör videosu yaklaşılmadan indirilmez (preload="none").
 *  - Sessiz otomatik oynatma (muted + playsinline). Ses yalnızca kullanıcı açarsa. Hareket azaltmada otomatik oynatma yok.
 *  - Video yüklenemezse poster ve tasarlanmış bir "slate" kalır; sayfa siyah boş ekran olmaz.
 *
 * İsteğe bağlı öznitelik (yalnızca Wix dışı önizleme için): deps-base="<klasör>/"
 */
(function () {
  'use strict';
  var TAG = 'n1-kreatif-produksiyon-v21';
  if (customElements.get(TAG)) return;

  /* ---------- Onaylı kaynaklar (Kısaca Biz V3 ile aynı, commit'e sabit) ---------- */
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

  /* ---------- Video ---------- */
  var HERO_VIDEO_URL = 'https://video.wixstatic.com/video/6dbf5e_8388dde9e33c490594eb19d4bbcf4eee/720p/mp4/file.mp4';
  var VIDEO_URL = 'https://video.wixstatic.com/video/6dbf5e_2821f1bb754740f9bc6deb51f052cf8c/1080p/mp4/file.mp4';
  var HERO_VIDEO = {
    hd: HERO_VIDEO_URL,
    md: HERO_VIDEO_URL,
    sd: HERO_VIDEO_URL
  };
  var VIDEO = {
    hd: VIDEO_URL,
    md: 'https://video.wixstatic.com/video/6dbf5e_2821f1bb754740f9bc6deb51f052cf8c/720p/mp4/file.mp4',
    sd: 'https://video.wixstatic.com/video/6dbf5e_2821f1bb754740f9bc6deb51f052cf8c/480p/mp4/file.mp4'
  };
  var VIDEO_DUR = 30.17;
  var POSTER_ID = 'https://static.wixstatic.com/media/6dbf5e_2821f1bb754740f9bc6deb51f052cf8cf002.jpg';
  function poster(w) { var h = Math.round(w * 9 / 16); return POSTER_ID + '/v1/fill/w_' + w + ',h_' + h + ',q_80/kreatif-produksiyon-kare.jpg'; }
  function pickVideo(set) {
    var c = navigator.connection || {}, src = set || VIDEO;
    if (c.saveData || /(^|-)2g$/.test(c.effectiveType || '') || matchMedia('(max-width:767px)').matches) return src.sd || src.md || src.hd;
    if (matchMedia('(max-width:1024px)').matches) return src.md || src.hd;
    return src.hd;
  }
  // Videonun gerçek bölümleri (kare kare incelenerek çıkarıldı; zaman: saniye)
  var CHAPTERS = [
    { t: 0.5, n: 'Açılış', d: '1N_Digital_Media yazısı parazitle açılır' },
    { t: 3.6, n: 'Arayüz katmanı', d: 'Altıgen çerçeveler, zaman kodu, "PRESENTS"' },
    { t: 5.9, n: 'Ateşleme', d: '"IMAGINATION" ve gün batımında fırlatma' },
    { t: 9.4, n: 'Yörünge', d: 'Uzaydan bulutların ve Dünya\'nın görüntüsü' },
    { t: 12.4, n: 'Darbe', d: '"BRUTALIZE" ve kırılan görüntü blokları' },
    { t: 15.2, n: 'Zirve', d: 'Karlı sırtta ilerleyen dağcılar' },
    { t: 18.3, n: 'Serbest düşüş', d: 'Beyaz flaş, ardından bulutların üstünde atlayış' },
    { t: 22.4, n: 'Kırılma', d: 'Işık çizgileri ve glitch başlık kartı' },
    { t: 26.2, n: 'Kapanış', d: 'Siyah zeminde kısa jenerik' }
  ];
  // Videonun her 0,25 sn'sindeki ortalama parlaklık (0–255), gerçek kareler üzerinden ölçüldü (121 örnek)
  var RHYTHM = [0,1,7,45,87,18,0,0,0,4,1,0,3,0,7,26,2,32,23,0,40,81,43,13,89,53,78,1,5,0,27,43,0,0,0,10,6,2,58,72,95,15,17,34,85,167,0,0,2,10,64,106,146,24,7,39,1,19,160,63,142,167,164,0,0,3,68,12,128,0,0,11,0,250,123,116,147,233,133,115,180,154,125,151,157,172,164,166,0,46,68,3,15,17,0,26,24,19,15,0,11,2,44,10,1,0,1,1,0,0,0,0,1,1,0,0,1,1,0,0,0];

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
  // İkonlar: hepsi aynı 16'lık ızgara, 1.5 çizgi, aria-hidden
  var SV = ' viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" aria-hidden="true" focusable="false"';
  var I = {
    arrow: '<svg class="kp-ico"' + SV + '><path d="M4.5 11.5l7-7M5.5 4.5h6v6"/></svg>',
    down: '<svg class="kp-ico"' + SV + '><path d="M8 3v10M3.5 8.5L8 13l4.5-4.5"/></svg>',
    prev: '<svg class="kp-ico"' + SV + '><path d="M13 8H3M7.5 3.5L3 8l4.5 4.5"/></svg>',
    next: '<svg class="kp-ico"' + SV + '><path d="M3 8h10M8.5 3.5L13 8l-4.5 4.5"/></svg>',
    play: '<svg class="kp-ico kp-ico--play"' + SV + '><path d="M5 3.5v9l7-4.5z"/></svg>',
    pause: '<svg class="kp-ico kp-ico--pause"' + SV + '><path d="M5.5 3.5v9M10.5 3.5v9"/></svg>',
    muted: '<svg class="kp-ico kp-ico--muted"' + SV + '><path d="M2.5 6v4h2.5l3.5 3V3L5 6zM11 6l3.5 4M14.5 6L11 10"/></svg>',
    sound: '<svg class="kp-ico kp-ico--sound"' + SV + '><path d="M2.5 6v4h2.5l3.5 3V3L5 6zM11 5.5c.9.7 1.4 1.5 1.4 2.5s-.5 1.8-1.4 2.5M12.8 3.5c1.4 1.2 2.2 2.7 2.2 4.5s-.8 3.3-2.2 4.5"/></svg>'
  };
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function tc(s) { s = Math.max(0, s || 0); var m = Math.floor(s / 60), r = s - m * 60, w = Math.floor(r), c = Math.floor((r - w) * 100); return pad(m) + ':' + pad(w) + '.' + pad(c); }
  function ln(t, cls) { return '<span class="kp-ln' + (cls ? ' ' + cls : '') + '"><span>' + t + '</span></span>'; }
  function chars(w) { return '<span class="kp-wd">' + Array.from(w).map(function (c) { return '<span class="kp-ch">' + c + '</span>'; }).join('') + '</span>'; }
  function words(t) { return t.split(' ').map(function (w) { return '<span class="kp-w">' + w + '</span>'; }).join(' '); }

  /* ---------- İçerik ---------- */
  var IDEA = [
    ['Kamera,', 0], ['ışık', 0], ['ve', 0], ['kurgu', 0], ['birer', 0], ['araçtır.', 0], ['Bir', 0], ['karenin', 0], ['gücü;', 0], ['neyi', 0], ['göstereceğine,', 0], ['neyi', 0], ['dışarıda', 0], ['bırakacağına', 0], ['ve', 0], ['izleyiciye', 0], ['hangi', 0], ['duyguyu', 0], ['taşıyacağına', 0], ['verilen', 0], ['kararlardan', 0], ['gelir.', 0],
    ['Biz', 0], ['bu', 0], ['kararları', 0], ['stratejiyle', 1], ['başlatır;', 0], ['ışıkla,', 2], ['kompozisyonla,', 3], ['hareketle', 4], ['ve', 0], ['kurguyla', 5], ['markanın', 0], ['diline', 0], ['dönüştürürüz.', 0]
  ];
  var IDEA_KEYS = ['Strateji', 'Işık', 'Kompozisyon', 'Hareket', 'Kurgu'];
  var SCENES = [
    { k: 'Creative Direction', h: 'Konsept, hikâye ve görsel yön.', p: 'Markanın ne söylemek istediğini netleştirir, bunu taşıyacak hikâyeyi ve görsel dili belirleriz. Ton, referanslar ve moodboard bu aşamada şekillenir.', note: ['Ana fikir', 'Ton', 'Referans'] },
    { k: 'Pre-Production', h: 'Planlama, referanslar, kadraj ve çekim hazırlığı.', p: 'Çekim listesi, storyboard, mekân, ekip ve takvim hazırlanır. Her kadraj, sette kamera açılmadan önce kâğıt üzerinde kurulur.', note: ['A kamera', 'B kamera', 'Hareket yolu'] },
    { k: 'Production', h: 'Çekim, ışık, hareket ve sahne yönetimi.', p: 'Sette ışığı, kamera hareketini ve oyunculuğu aynı hikâyeye hizmet edecek şekilde yönetiriz. Her çekim, kurgudaki yerini bilerek alınır.', note: ['Ana ışık', 'Dolgu', 'Arka ışık'] },
    { k: 'Post-Production', h: 'Kurgu, renk, ses ve mecralara uyarlama.', p: 'Ritim kurguda, duygu renkte ve seste tamamlanır. Ana içerik, yayınlanacağı her mecranın ölçüsüne ve diline göre uyarlanır.', note: ['Görüntü', 'Ses', 'Renk'] }
  ];
  var FORMATS = [
    { n: 'Marka ve kampanya filmleri', r: '2.39 : 1', w: 2.39, h: 1, pos: '50% 90%', g: 'scope', d: 'Markanın hikâyesini sinema diliyle anlatan, kampanyanın bütün mecralarına taşınacak ana filmler.' },
    { n: 'Ürün fotoğraf ve video prodüksiyonu', r: '4 : 5', w: 4, h: 5, pos: '55% 70%', g: 'product', d: 'Ürünün dokusunu, ölçüsünü ve kullanım anını ışık ve kadrajla görünür kılan çekimler.' },
    { n: 'Sosyal medya için kısa video', r: '9 : 16', w: 9, h: 16, pos: '55% 70%', g: 'social', d: 'İlk saniyede yakalayan, dikey ekran için baştan kurgulanmış kısa içerikler.' },
    { n: 'Kreatif konsept ve art direction', r: '3 : 2', w: 3, h: 2, pos: '50% 86%', g: 'thirds', d: 'Çekimden önce görsel dili kurarız: renk, ışık, kadraj ve ton tek bir yönde buluşur.' },
    { n: 'Motion design', r: '16 : 9', w: 16, h: 9, pos: '50% 50%', g: 'motion', d: 'Tipografiyi, grafiği ve geçişleri markanın ritmine göre hareketlendiririz.' },
    { n: 'Post-production ve görsel adaptasyonlar', r: '16:9 / 1:1 / 9:16', w: 16, h: 9, pos: '50% 60%', g: 'adapt', d: 'Kurgu, renk ve ses sonrası tek bir ana içeriği her mecranın ölçüsüne uyarlarız.' },
    { n: 'AI destekli görsel üretim süreçleri', r: '1 : 1', w: 1, h: 1, pos: '55% 70%', g: 'ai', d: 'Fikir aşamasında hızlı görselleştirme ve varyasyon için; yaratıcı kontrol her zaman ekipte.' }
  ];

  /* ---------- SVG çizimleri ---------- */
  function brackets(cls) { return '<span class="kp-brk ' + (cls || '') + '" aria-hidden="true"><i></i><i></i><i></i><i></i></span>'; }
  function ideaSvg() {
    // Fikirden kareye: nokta / ışık / üçte bir ızgara / hareket yolu / kesme
    return '<svg class="kp-idea__svg" viewBox="0 0 480 270" aria-hidden="true" focusable="false">' +
      '<defs><linearGradient id="kpLight" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#A8CF62" stop-opacity=".34"/><stop offset=".7" stop-color="#A8CF62" stop-opacity="0"/></linearGradient></defs>' +

      '<g class="kp-d k0"><circle class="kp-d-dot" cx="300" cy="150" r="5"/><path class="kp-d-s" d="M300 128v-14M300 172v14M278 150h-14M322 150h14" pathLength="1"/></g>' +
      '<g class="kp-d k1"><path class="kp-d-light" d="M0 0L250 0 340 270 0 270z"/><path class="kp-d-s kp-d-acc" d="M18 18L300 150" pathLength="1"/></g>' +
      '<g class="kp-d k2"><path class="kp-d-s" d="M160 0v270M320 0v270M0 90h480M0 180h480" pathLength="1"/></g>' +
      '<g class="kp-d k3"><path class="kp-d-s kp-d-acc kp-d-path" d="M60 220C140 210 210 120 300 150S430 90 460 40" pathLength="1"/><circle class="kp-d-mov" cx="60" cy="220" r="4"/></g>' +
      '<g class="kp-d k4"><path class="kp-d-s kp-d-cut" d="M240 0v270" pathLength="1"/><path class="kp-d-s" d="M228 254l12 12 12-12M228 16l12-12 12 12" pathLength="1"/></g>' +
      '</svg>';
  }
  var BOARD = [
    // 01 Creative Direction — üst üste binen referans kareleri ve fikir halkası
    '<rect class="kp-b-s kp-b-1" x="58" y="58" width="150" height="96" pathLength="1"/><rect class="kp-b-s kp-b-2" x="132" y="96" width="150" height="96" pathLength="1"/><rect class="kp-b-s kp-b-3 kp-b-acc" x="206" y="134" width="150" height="96" pathLength="1"/>' +
    '<circle class="kp-b-s kp-b-acc" cx="372" cy="74" r="34" pathLength="1"/><circle class="kp-b-f" cx="372" cy="74" r="5"/><path class="kp-b-s kp-b-dash" d="M372 108L300 150" pathLength="1"/>' +
    '<path class="kp-b-s" d="M74 176h100M74 190h70M74 204h86" pathLength="1"/>',
    // 02 Pre-Production — kuşbakışı çekim planı: özne, iki kamera, görüş açıları, dolly yolu
    '<path class="kp-b-s kp-b-grid" d="M80 30v210M160 30v210M240 30v210M320 30v210M400 30v210M40 70h400M40 135h400M40 200h400" pathLength="1"/>' +
    '<circle class="kp-b-s kp-b-acc" cx="250" cy="120" r="16" pathLength="1"/><circle class="kp-b-f" cx="250" cy="120" r="4"/>' +
    '<g class="kp-b-camA"><path class="kp-b-cone" d="M110 210L250 112 236 140z"/><rect class="kp-b-s" x="96" y="200" width="26" height="18" pathLength="1"/></g>' +
    '<g class="kp-b-camB"><path class="kp-b-cone" d="M400 80L258 112 266 128z"/><rect class="kp-b-s" x="396" y="66" width="26" height="18" pathLength="1"/></g>' +
    '<path class="kp-b-s kp-b-dash kp-b-acc" d="M70 160C110 120 140 236 200 232" pathLength="1"/>',
    // 03 Production — ışık düzeni: ana ışık konisi, dolgu, arka ışık, özne, kamera kadrajı
    '<path class="kp-b-key" d="M70 40L250 140 230 180z"/><path class="kp-b-fill" d="M430 60L262 136 270 168z"/>' +
    '<rect class="kp-b-s kp-b-acc" x="54" y="26" width="28" height="22" pathLength="1"/><rect class="kp-b-s" x="420" y="48" width="24" height="18" pathLength="1"/><circle class="kp-b-s" cx="248" cy="40" r="10" pathLength="1"/>' +
    '<circle class="kp-b-s" cx="248" cy="156" r="22" pathLength="1"/><path class="kp-b-s" d="M226 210h44" pathLength="1"/>' +
    '<rect class="kp-b-s kp-b-dash" x="150" y="96" width="196" height="110" pathLength="1"/><path class="kp-b-s" d="M236 236h24v14h-24z" pathLength="1"/>',
    // 04 Post-Production — kurgu zaman çizelgesi, ses dalgası, renk tekerleği, oynatma çizgisi
    '<rect class="kp-b-s" x="40" y="52" width="110" height="26" pathLength="1"/><rect class="kp-b-s kp-b-acc" x="154" y="52" width="74" height="26" pathLength="1"/><rect class="kp-b-s" x="232" y="52" width="130" height="26" pathLength="1"/>' +
    '<rect class="kp-b-s" x="70" y="86" width="90" height="26" pathLength="1"/><rect class="kp-b-s" x="196" y="86" width="96" height="26" pathLength="1"/>' +
    '<path class="kp-b-s kp-b-wave" d="M40 148q10-18 20 0t20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0" pathLength="1"/>' +
    '<circle class="kp-b-s" cx="410" cy="128" r="38" pathLength="1"/><path class="kp-b-s" d="M410 96v64M378 128h64" pathLength="1"/><circle class="kp-b-f kp-b-wheel" cx="424" cy="116" r="5"/>' +
    '<path class="kp-b-s" d="M40 200h330" pathLength="1"/><g class="kp-b-head"><path class="kp-b-s kp-b-acc" d="M120 40v176" pathLength="1"/><path class="kp-b-f" d="M113 34h14l-7 9z"/></g>'
  ];
  function rhythmSvg() {
    var n = RHYTHM.length, w = 960 / n, b = '';
    RHYTHM.forEach(function (v, i) { var h = 4 + v / 255 * 108; b += '<rect x="' + (i * w + .6).toFixed(2) + '" y="' + (116 - h).toFixed(1) + '" width="' + (w - 1.2).toFixed(2) + '" height="' + h.toFixed(1) + '"/>'; });
    return '<svg class="kp-rh__svg" viewBox="0 0 960 120" preserveAspectRatio="none" aria-hidden="true" focusable="false">' +
      '<defs><clipPath id="kpRhClip"><rect class="kp-rh__clip" x="0" y="0" width="0" height="120"/></clipPath></defs>' +
      '<g class="kp-rh__bars">' + b + '</g><g class="kp-rh__done" clip-path="url(#kpRhClip)">' + b + '</g>' +
      CHAPTERS.map(function (c) { return '<line class="kp-rh__mark" x1="' + (c.t / VIDEO_DUR * 960).toFixed(1) + '" x2="' + (c.t / VIDEO_DUR * 960).toFixed(1) + '" y1="0" y2="120"/>'; }).join('') +
      '<line class="kp-rh__head" x1="0" x2="0" y1="0" y2="120"/></svg>';
  }
  function fmtGuides() {
    return '<svg class="kp-fmt__g" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">' +
      '<g class="g-scope"><path d="M0 14h100M0 86h100"/></g>' +
      '<g class="g-product"><path d="M50 40v20M40 50h20"/><rect x="22" y="22" width="56" height="56"/></g>' +
      '<g class="g-social"><path d="M0 12h100M0 80h100"/><rect x="84" y="40" width="8" height="30"/></g>' +
      '<g class="g-thirds"><path d="M33.33 0v100M66.66 0v100M0 33.33h100M0 66.66h100"/></g>' +
      '<g class="g-motion"><path class="g-mp" d="M8 78C30 70 40 30 62 36S88 22 94 14" pathLength="1"/></g>' +
      '<g class="g-adapt"><rect x="0.5" y="0.5" width="99" height="99"/><rect x="21.88" y="0.5" width="56.25" height="99"/><rect x="34.18" y="0.5" width="31.64" height="99" class="g-acc"/></g>' +
      '<g class="g-ai"><path d="M25 0v100M50 0v100M75 0v100M0 25h100M0 50h100M0 75h100"/></g>' +
      '</svg>';
  }

  function markup() {
    var chapters = CHAPTERS.map(function (c, i) {
      return '<li><button type="button" class="kp-chap" data-t="' + c.t + '" data-i="' + i + '"><span class="kp-chap__tc">' + tc(c.t).slice(0, 5) + '</span><span class="kp-chap__n">' + c.n + '</span><span class="kp-chap__d">' + c.d + '</span></button></li>';
    }).join('');
    var scenes = SCENES.map(function (s, i) {
      return '<article class="kp-scene' + (i % 2 ? ' kp-scene--r' : '') + '" data-i="' + i + '" aria-labelledby="kp-sc-h' + i + '">' +
        '<div class="kp-scene__copy">' +
          '<p class="kp-scene__n" aria-hidden="true">' + pad(i + 1) + '</p>' +
          '<p class="kp-scene__k">Sahne ' + pad(i + 1) + ' / ' + s.k + '</p>' +
          '<h3 class="kp-scene__h" id="kp-sc-h' + i + '">' + s.h + '</h3>' +
          '<p class="kp-scene__p">' + s.p + '</p>' +
        '</div>' +
        '<figure class="kp-board" aria-hidden="true">' +
          '<div class="kp-board__frame">' + brackets() + '<svg class="kp-board__svg" viewBox="0 0 480 270" focusable="false">' + BOARD[i] + '</svg></div>' +
          '<figcaption class="kp-board__cap"><span>Çerçeve ' + pad(i + 1) + '</span>' + s.note.map(function (n) { return '<span>' + n + '</span>'; }).join('') + '</figcaption>' +
        '</figure>' +
      '</article>';
    }).join('');
    var fmts = FORMATS.map(function (f, i) {
      return '<li><button type="button" class="kp-fmt__btn" data-i="' + i + '" aria-pressed="' + (i === 0) + '"><span class="kp-fmt__n" aria-hidden="true">' + pad(i + 1) + '</span><span class="kp-fmt__name">' + f.n + '</span><span class="kp-fmt__r">' + f.r + '</span></button></li>';
    }).join('');
    var ctl = function (k) {
      return '<div class="kp-ctl" data-ctl="' + k + '">' +
        '<button type="button" class="kp-btnico kp-play" aria-label="Videoyu duraklat" aria-pressed="false">' + I.pause + I.play + '</button>' +
        '<button type="button" class="kp-btnico kp-mute" aria-label="Sesi aç" aria-pressed="false">' + I.muted + I.sound + '</button>' +
        '<span class="kp-tc" aria-hidden="true"><b>00:00.00</b> / ' + (k === 'hero' ? '--:--' : tc(VIDEO_DUR)) + '</span></div>';
    };

    return '' +
'<main class="kp" id="kreatif-produksiyon" lang="tr">' +
/* 01 — Açılış karesi */
'<section class="kp-hero" aria-labelledby="kp-h1">' +
  '<div class="kp-wrap kp-hero__grid">' +
    '<div class="kp-hero__stage">' +
      '<div class="kp-screen" data-kp="hero">' +
        '<div class="kp-slate" aria-hidden="true"><span>1N</span><i></i></div>' +
        '<img class="kp-poster" alt="" decoding="async" src="' + poster(1280) + '" srcset="' + poster(768) + ' 768w, ' + poster(1280) + ' 1280w, ' + poster(1920) + ' 1920w" sizes="(max-width:1024px) 100vw, 64vw">' +
        '<video class="kp-video" muted playsinline loop preload="none" aria-label="1N Digital Media kreatif prodüksiyon açılış filmi, sessiz başlar"></video>' +
        '<div class="kp-screen__err" role="status"></div>' +
      '</div>' +
      brackets('kp-brk--hero') +
      '<div class="kp-hud kp-hud--t" aria-hidden="true"><span>Kreatif Prodüksiyon</span><span>VIDEO / 720P</span></div>' +
      ctl('hero') +
    '</div>' +
    '<div class="kp-hero__copy">' +
      '<p class="kp-tag"><i aria-hidden="true"></i>1N Digital Media</p>' +
      '<h1 class="kp-hero__title" id="kp-h1">' + ln('Kreatif') + ln('Prodüksiyon.') + '</h1>' +
      '<p class="kp-hero__sub">' + ln('Fikirden kareye.') + ln('Kareden etkiye.', 'kp-ln--acc') + '</p>' +
    '</div>' +
  '</div>' +
  '<div class="kp-wrap kp-hero__foot"><p>Strateji, ışık, kurgu ve hareketle markanın görsel hikâyesini üretiyoruz.</p><a class="kp-scroll" href="#kp-fikir">Kareye gir' + I.down + '</a></div>' +
'</section>' +
/* 02 — Fikir görüntüye dönüşür */
'<section class="kp-sec kp-idea" id="kp-fikir" aria-labelledby="kp-idea-t">' +
  '<div class="kp-wrap">' +
    '<p class="kp-label">Fikir</p>' +
    '<h2 class="kp-h2" id="kp-idea-t">' + ln('Her güçlü kare') + ln('bir fikirle başlar.', 'kp-ln--acc') + '</h2>' +
    '<div class="kp-idea__grid">' +
      '<div class="kp-idea__copy">' +
        '<p class="kp-idea__text">' + IDEA.map(function (w) { return '<span class="kp-iw' + (w[1] ? ' kp-iw--k" data-k="' + (w[1] - 1) : '') + '">' + w[0] + '</span>'; }).join(' ') + '</p>' +
        '<p class="kp-idea__lede">Prodüksiyon bizim için yalnızca çekim anı değildir. Fikrin taşıdığı duyguyu; ışık, kadraj, hareket ve kurgu kararlarıyla görünür bir dile çeviririz.</p>' +
      '</div>' +
      '<div class="kp-idea__stage">' +
        '<p class="kp-idea__eyebrow">Görüntünün yapı taşları</p>' +
        '<div class="kp-idea__keys">' + IDEA_KEYS.map(function (k, i) { return '<span data-k="' + i + '"><b>' + pad(i + 1) + '</b><strong>' + k + '</strong></span>'; }).join('') + '</div>' +
        '<div class="kp-idea__canvas">' + ideaSvg() + '</div>' +
      '</div>' +
    '</div>' +
  '</div>' +
'</section>' +
/* 03 — Bir fikrin yolculuğu (storyboard) */
'<section class="kp-sec kp-journey" id="kp-surec" aria-labelledby="kp-jr-t">' +
  '<div class="kp-wrap">' +
    '<div class="kp-jr__head"><p class="kp-label">Süreç</p>' +
      '<h2 class="kp-h2" id="kp-jr-t">' + ln('Bir fikrin') + ln('yolculuğu.', 'kp-ln--acc') + '</h2>' +
      '<p class="kp-jr__lede">Tek bir kampanya filmi için de, her ay devam eden içerik üretimi için de aynı dört sahneyi işletiriz. Değişen yalnızca ölçek ve ritim.</p></div>' +
    '<div class="kp-jr__body"><div class="kp-spine" aria-hidden="true"><i class="kp-spine__fill"></i></div>' + scenes + '</div>' +
  '</div>' +
'</section>' +
/* 04 — Hareket bir anlatım dilidir */
'<section class="kp-sec kp-motion" id="kp-hareket" aria-labelledby="kp-mo-t">' +
  '<div class="kp-wrap">' +
    '<div class="kp-mo__head"><p class="kp-label">Hareket</p>' +
      '<h2 class="kp-h2" id="kp-mo-t">' + ln('Hareket') + ln('bir anlatım dilidir.', 'kp-ln--acc') + '</h2>' +
      '<p class="kp-mo__lede">Bir kesmenin yeri, bir karenin süresi, bir geçişin hızı. İzleyicinin ne hissedeceğini bu kararlar belirler. Filmi bölüm bölüm açın; alttaki çizgi her çeyrek saniyedeki ışık yoğunluğunu gösterir.</p></div>' +
    '<div class="kp-monitor" data-kp="monitor">' +
      '<div class="kp-mon__screen">' +
        '<div class="kp-screen">' +
          '<div class="kp-slate" aria-hidden="true"><span>1N</span><i></i></div>' +
          '<img class="kp-poster" alt="" decoding="async" loading="lazy" src="' + poster(1280) + '" srcset="' + poster(768) + ' 768w, ' + poster(1280) + ' 1280w" sizes="(max-width:1024px) 100vw, 60vw">' +
          '<video class="kp-video" muted playsinline loop preload="none" aria-label="Kreatif prodüksiyon filmi, bölüm görünümü"></video>' +
          '<div class="kp-screen__err" role="status"></div>' +
        '</div>' + brackets('kp-brk--mon') +
        '<p class="kp-mon__now" aria-live="polite"><span class="kp-mon__k">Bölüm</span> <b>' + CHAPTERS[0].n + '</b></p>' +
      '</div>' +
      '<ol class="kp-chaps" aria-label="Film bölümleri">' + chapters + '</ol>' +
      '<div class="kp-mon__bar">' + ctl('mon') +
        '<div class="kp-rh" role="slider" tabindex="0" aria-label="Film zaman çizgisi" aria-valuemin="0" aria-valuemax="' + Math.round(VIDEO_DUR) + '" aria-valuenow="0" aria-valuetext="00:00">' + rhythmSvg() + '</div>' +
      '</div>' +
    '</div>' +
  '</div>' +
'</section>' +
/* 05 — Her formatta aynı yaratıcı bakış */
'<section class="kp-sec kp-fmt" id="kp-formatlar" aria-labelledby="kp-fm-t">' +
  '<div class="kp-wrap">' +
    '<div class="kp-fm__head"><p class="kp-label">Üretim alanları</p>' +
      '<h2 class="kp-h2" id="kp-fm-t">' + ln('Her formatta') + ln('aynı yaratıcı bakış.', 'kp-ln--acc') + '</h2></div>' +
    '<div class="kp-fmt__wrap" data-kp="formats">' +
      '<div class="kp-fmt__stage">' +
        '<div class="kp-fmt__box"><div class="kp-fmt__frame" data-g="' + FORMATS[0].g + '">' +
          '<div class="kp-slate" aria-hidden="true"><span>1N</span><i></i></div>' +
          '<img class="kp-fmt__img" alt="" decoding="async" loading="lazy" src="' + poster(1280) + '" style="object-position:' + FORMATS[0].pos + '">' +
          fmtGuides() + brackets('kp-brk--fmt') +
          '<span class="kp-fmt__ratio" aria-hidden="true">' + FORMATS[0].r + '</span>' +
        '</div></div>' +
        '<div class="kp-fmt__info" aria-live="polite"><p class="kp-fmt__k">' + pad(1) + ' / 07</p><h3 class="kp-fmt__t">' + FORMATS[0].n + '</h3><p class="kp-fmt__d">' + FORMATS[0].d + '</p></div>' +
      '</div>' +
      '<ol class="kp-fmt__list" aria-label="Üretim alanları">' + fmts + '</ol>' +
    '</div>' +
    '<p class="kp-fmt__note">Kadrajdaki görüntü, sayfadaki filmin gerçek bir karesidir; aynı kare her formatta yeniden kadrajlanır.</p>' +
  '</div>' +
'</section>' +
/* 06 — Prodüksiyon felsefemiz */
'<section class="kp-phil" aria-labelledby="kp-ph-t">' +
  '<i class="kp-lb kp-lb--t" aria-hidden="true"></i><i class="kp-lb kp-lb--b" aria-hidden="true"></i>' +
  '<div class="kp-wrap kp-phil__in">' +
    '<p class="kp-label">Felsefe</p>' +
    '<h2 class="kp-phil__t" id="kp-ph-t"><span class="kp-sr">Sadece görüntü üretmiyoruz. Hikâye inşa ediyoruz.</span>' +
      '<span class="kp-pl kp-pl--a" aria-hidden="true">' + words('Sadece görüntü') + '</span>' +
      '<span class="kp-pl kp-pl--b" aria-hidden="true">' + words('üretmiyoruz.') + '</span>' +
      '<span class="kp-pl kp-pl--c" aria-hidden="true">' + chars('Hikâye') + '</span>' +
      '<span class="kp-pl kp-pl--d" aria-hidden="true">' + chars('inşa') + ' ' + chars('ediyoruz.') + '</span>' +
    '</h2>' +
    '<p class="kp-phil__p">Bir kampanya filmi tek bir kareden ibaret değildir; markanın zaman içinde kurduğu hikâyenin bir sahnesidir. Her üretimi, bir önceki ve bir sonraki işle aynı dili konuşacak şekilde kurarız.</p>' +
  '</div>' +
'</section>' +
/* 07 — Final */
'<section class="kp-fin" aria-labelledby="kp-fin-t">' +
  '<div class="kp-wrap kp-fin__in">' +
    '<div class="kp-fin__frame">' + brackets('kp-brk--fin') +
      '<p class="kp-fin__q">Bir fikrin var mı?</p>' +
      '<h2 class="kp-fin__t" id="kp-fin-t">' + ln('Onu') + ln('hayata geçirelim.', 'kp-ln--acc') + '</h2>' +
      '<p class="kp-fin__sub">Kısa bir görüşmeyle başlayalım: fikri dinleyelim, hangi formatta en güçlü duracağını birlikte bulalım.</p>' +
      '<div class="kp-fin__cta">' +
        '<a class="kp-btn kp-btn--primary" href="/iletisim"><span>Projenizi Konuşalım</span><span class="kp-btn__ico">' + I.arrow + '</span></a>' +
        '<a class="kp-btn kp-btn--ghost" href="/teklif-al"><span>Teklif Al</span><span class="kp-btn__ico">' + I.arrow + '</span></a>' +
      '</div>' +
    '</div>' +
    '<p class="kp-fin__end" aria-hidden="true"><span>Son kare</span><b class="kp-fin__tc">' + tc(VIDEO_DUR) + '</b><span>1N Digital Media</span></p>' +
  '</div>' +
'</section>' +
'</main>';
  }

  /* ---------- CSS (yalnızca n1-kreatif-produksiyon-v2 kapsamında) ---------- */
  var T = TAG;
  var COND = '"Barlow Condensed","Arial Narrow",Arial,sans-serif';
  var CSS = [
T + '{--bg:#080A09;--g1:#0D0F0E;--g2:#131514;--ink:#ECEBE5;--soft:#BDBCB5;--mute:#9A9B95;--dim:#6E706A;--line:rgba(228,227,221,.12);--line2:rgba(228,227,221,.07);--acc:#A8CF62;--ease:cubic-bezier(.22,1,.36,1);',
'  --gap:clamp(18px,2.2vw,40px);--secpad:clamp(96px,8.4vw,160px);display:block;position:relative;width:100%;background:var(--bg);color:var(--ink);font:400 17px/1.6 Barlow,Arial,sans-serif;-webkit-font-smoothing:antialiased;overflow-x:clip;text-align:left}',
T + ' *,' + T + ' *::before,' + T + ' *::after{box-sizing:border-box;min-width:0}',
T + ' :where(.kp) :where(p,h1,h2,h3,ul,ol,figure,figcaption){margin:0}',
T + ' :where(.kp) :where(ul,ol){padding:0;list-style:none}',
T + ' :where(.kp) :where(a){color:inherit}',
T + ' :where(.kp) :where(button){font:inherit;color:inherit;background:none;border:0;padding:0;margin:0;cursor:pointer;text-align:inherit;-webkit-tap-highlight-color:transparent}',
T + ' .kp :focus-visible{outline:2px solid var(--acc);outline-offset:3px}',
T + ' .kp-ico{display:block;flex:none}',
T + ' .kp-sr{position:absolute!important;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}',
T + ' .kp-wrap{width:90%;margin-left:auto;margin-right:auto}',
T + ' .kp-sec{position:relative;padding:var(--secpad) 0;border-top:1px solid var(--line)}',
T + ' .kp-tag{display:flex;align-items:center;gap:14px;font:500 12px/1.2 Barlow,Arial,sans-serif;letter-spacing:.22em;text-transform:uppercase;color:var(--mute)}',
T + ' .kp-tag i{display:block;width:34px;height:1px;background:var(--acc)}',
T + ' .kp-label{display:flex;align-items:center;gap:12px;font:500 15px/1.3 Barlow,Arial,sans-serif;color:var(--mute)}',
T + ' .kp-label::before{content:"";flex:none;width:7px;height:7px;border-radius:1px;background:var(--acc)}',
/* Satır maskesi: Türkçe İ, Ş, Ğ, Ü için üst/alt güvenli pay */
T + ' .kp-ln{display:block;overflow:hidden;padding:.17em 0 .09em;margin:-.17em 0 -.09em}',
T + ' .kp-ln>span{display:block}',
T + ' .kp-ln--acc{color:var(--acc)}',
T + ' .kp-h2{margin-top:clamp(26px,2.4vw,40px);font:700 clamp(60px,7.4vw,148px)/1 ' + COND + ';letter-spacing:-.016em;text-transform:uppercase;color:var(--ink)}',
/* Çerçeve köşeleri */
T + ' .kp-brk{position:absolute;inset:0;display:block;pointer-events:none}',
T + ' .kp-brk i{position:absolute;width:clamp(16px,2.2vw,30px);height:clamp(16px,2.2vw,30px);border:0 solid rgba(236,235,229,.6)}',
T + ' .kp-brk i:nth-child(1){left:0;top:0;border-left-width:1.5px;border-top-width:1.5px;transform-origin:0 0}',
T + ' .kp-brk i:nth-child(2){right:0;top:0;border-right-width:1.5px;border-top-width:1.5px;transform-origin:100% 0}',
T + ' .kp-brk i:nth-child(3){right:0;bottom:0;border-right-width:1.5px;border-bottom-width:1.5px;transform-origin:100% 100%}',
T + ' .kp-brk i:nth-child(4){left:0;bottom:0;border-left-width:1.5px;border-bottom-width:1.5px;transform-origin:0 100%}',
/* Ekran + video + poster + slate (video yüklenmezse de boş kalmaz) */
T + ' .kp-screen{position:absolute;inset:0;overflow:hidden;background:#050605}',
T + ' .kp-slate{position:absolute;inset:0;display:grid;place-items:center;background:radial-gradient(ellipse at 50% 50%,rgba(168,207,98,.07),transparent 60%),repeating-linear-gradient(90deg,rgba(236,235,229,.035) 0 1px,transparent 1px 12.5%),#070908}',
T + ' .kp-slate span{font:700 clamp(48px,8vw,140px)/1 ' + COND + ';color:transparent;-webkit-text-stroke:1px rgba(236,235,229,.16)}',
T + ' .kp-slate i{position:absolute;left:8%;right:8%;top:50%;height:1px;background:rgba(168,207,98,.25)}',
T + ' .kp-poster,' + T + ' .kp-video{position:absolute;inset:0;display:block;width:100%;height:100%;object-fit:contain;background:transparent}',
T + ' .kp-video{opacity:0;transition:opacity .6s var(--ease)}',
T + ' .kp-screen.is-started .kp-video{opacity:1}',
T + ' .kp-screen.is-started .kp-poster{opacity:0;transition:opacity .6s var(--ease) .2s}',
T + ' .kp-hero__stage .kp-poster{display:none!important}',
T + ' .kp-screen.is-failed .kp-video{opacity:0}',
T + ' .kp-screen.is-failed .kp-poster{opacity:1}',
T + ' .kp-screen__err{position:absolute;left:16px;bottom:14px;z-index:2;max-width:80%;font-size:13px;color:var(--soft)}',
T + ' .kp-screen__err:empty{display:none}',
/* Video kontrolleri */
T + ' .kp-ctl{display:flex;align-items:center;gap:8px}',
T + ' .kp-btnico{display:grid;place-items:center;width:44px;height:44px;border:1px solid var(--line);border-radius:4px;background:rgba(8,10,9,.7);color:var(--ink);transition:background-color .3s var(--ease),color .3s var(--ease),border-color .3s var(--ease);touch-action:manipulation}',
T + ' .kp-btnico:hover,' + T + ' .kp-btnico:focus-visible{background:var(--acc);border-color:var(--acc);color:#080A09}',
T + ' .kp-play .kp-ico--play,' + T + ' .kp-play[aria-pressed="true"] .kp-ico--pause{display:none}',
T + ' .kp-play[aria-pressed="true"] .kp-ico--play{display:block}',
T + ' .kp-mute .kp-ico--sound,' + T + ' .kp-mute[aria-pressed="true"] .kp-ico--muted{display:none}',
T + ' .kp-mute[aria-pressed="true"] .kp-ico--sound{display:block}',
T + ' .kp-tc{margin-left:8px;font:500 13px/1 Barlow,Arial,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:.08em;color:var(--mute);white-space:nowrap}',
T + ' .kp-tc b{font-weight:500;color:var(--ink)}',

/* ===== 01 Açılış karesi ===== */
T + ' .kp-hero{position:relative;padding:clamp(118px,9.4vw,160px) 0 0;overflow:hidden}',
T + ' .kp-hero__grid{position:relative;display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:end}',
T + ' .kp-hero__stage{position:relative;grid-column:5/13;grid-row:1;aspect-ratio:16/9;isolation:isolate}',
T + ' .kp-hero__stage .kp-screen{clip-path:inset(0 0 0 0)}',
T + ' .kp-brk--hero{inset:-14px}',
T + ' .kp-hud{position:absolute;left:0;right:0;display:flex;justify-content:space-between;gap:16px;font:500 11px/1 Barlow,Arial,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:var(--mute);pointer-events:none}',
T + ' .kp-hud--t{top:-38px}',
T + ' .kp-hero__stage .kp-ctl{position:absolute;right:0;bottom:-62px}',
T + ' .kp-hero__copy{position:relative;grid-column:1/9;grid-row:1;align-self:end;padding-bottom:clamp(8px,2vw,36px);pointer-events:none}',
T + ' .kp-hero__copy a,' + T + ' .kp-hero__copy button{pointer-events:auto}',
T + ' .kp-hero__title{margin-top:.34em;font:700 clamp(96px,11.4vw,228px)/.96 ' + COND + ';letter-spacing:-.016em;text-transform:uppercase;color:#ECEBE5;mix-blend-mode:difference}',
T + ' .kp-hero__sub{margin-top:clamp(22px,2.2vw,38px);font:600 clamp(24px,2.3vw,44px)/1.04 ' + COND + ';letter-spacing:.01em;text-transform:uppercase;color:var(--ink)}',
T + ' .kp-hero__foot{display:flex;align-items:center;justify-content:space-between;gap:24px;margin-top:clamp(84px,7vw,120px);padding:22px 0;border-top:1px solid var(--line)}',
T + ' .kp-hero__foot p{max-width:52ch;font-size:clamp(16px,1.12vw,19px);line-height:1.55;color:var(--soft)}',
T + ' .kp-scroll{display:inline-flex;align-items:center;gap:10px;min-height:44px;font:500 13px/1 Barlow,Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase;text-decoration:none;color:var(--mute);white-space:nowrap;transition:color .35s var(--ease)}',
T + ' .kp-scroll:hover{color:var(--ink)}',

/* ===== 02 Fikir ===== */
T + ' .kp-idea{overflow:hidden;background:radial-gradient(85% 120% at 84% 24%,rgba(168,207,98,.08),transparent 56%),linear-gradient(180deg,transparent 0%,rgba(255,255,255,.02) 36%,transparent 100%)}',
T + ' .kp-idea__grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:start;margin-top:clamp(52px,5vw,92px)}',
T + ' .kp-idea__copy{grid-column:1/7}',
T + ' .kp-idea__text{font:500 clamp(30px,2.6vw,50px)/1.16 ' + COND + ';letter-spacing:-.004em;color:var(--ink)}',
T + ' .kp-idea__lede{margin-top:26px;max-width:36ch;font-size:clamp(16px,1.08vw,19px);line-height:1.68;color:var(--soft)}',
T + ' .kp-iw--k{color:var(--acc)}',
T + ' .kp-idea__stage{grid-column:7/13;position:sticky;top:clamp(96px,12vh,140px);min-height:clamp(420px,44vw,560px);padding-top:8px}',
T + ' .kp-idea__stage::before{content:"";position:absolute;left:6%;right:0;top:58px;bottom:20px;border-top:1px solid var(--line);border-bottom:1px solid rgba(168,207,98,.16)}',
T + ' .kp-idea__eyebrow{position:relative;z-index:2;font:500 12px/1.3 Barlow,Arial,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:var(--dim)}',
T + ' .kp-idea__keys{position:relative;z-index:2;display:grid;gap:14px;max-width:340px;margin-top:22px}',
T + ' .kp-idea__keys span{display:grid;grid-template-columns:56px minmax(0,1fr);column-gap:14px;align-items:baseline;padding:0 0 12px;border-bottom:1px solid var(--line);color:var(--mute);transition:color .35s var(--ease),transform .35s var(--ease),border-color .35s var(--ease)}',
T + ' .kp-idea__keys b{font:500 11px/1.2 Barlow,Arial,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:var(--dim)}',
T + ' .kp-idea__keys strong{font:600 clamp(18px,1.4vw,24px)/1.05 ' + COND + ';letter-spacing:.01em;text-transform:uppercase;color:inherit}',
T + ' .kp-idea__keys span.is-on{color:var(--ink);border-color:rgba(168,207,98,.45);transform:translateX(-10px)}',
T + ' .kp-idea__canvas{position:absolute;left:0;right:0;bottom:0;height:clamp(220px,24vw,300px);opacity:.98}',
T + ' .kp-idea__svg{display:block;width:100%;height:100%;overflow:visible}',
T + ' .kp-d-s{fill:none;stroke:rgba(236,235,229,.42);stroke-width:1.25;stroke-dasharray:1;stroke-dashoffset:0}',
T + ' .kp-d-acc{stroke:var(--acc)}',
T + ' .kp-d-dot,' + T + ' .kp-d-mov{fill:var(--acc)}',
T + ' .kp-d-light{fill:url(#kpLight);opacity:.84}',

/* ===== 03 Yolculuk (storyboard) ===== */
T + ' .kp-jr__head{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:end}',
T + ' .kp-jr__head .kp-label,' + T + ' .kp-jr__head .kp-h2{grid-column:1/-1}',
T + ' .kp-jr__lede{grid-column:8/13;margin-top:24px;font-size:clamp(16px,1.12vw,19px);line-height:1.6;color:var(--soft)}',
T + ' .kp-jr__body{position:relative;margin-top:clamp(64px,6vw,112px);padding-left:clamp(48px,5vw,88px)}',
T + ' .kp-spine{position:absolute;left:0;top:0;bottom:0;width:1px;background:var(--line)}',
T + ' .kp-spine__fill{position:absolute;left:-1px;top:0;width:3px;height:100%;background:var(--acc);transform-origin:50% 0;transform:scaleY(1)}',
T + ' .kp-scene{position:relative;display:grid;grid-template-columns:repeat(11,minmax(0,1fr));column-gap:var(--gap);align-items:center;padding:clamp(40px,4vw,72px) 0}',
T + ' .kp-scene+.kp-scene{border-top:1px solid var(--line2)}',
T + ' .kp-scene::before{content:"";position:absolute;left:calc(clamp(48px,5vw,88px) * -1 - 5px);top:clamp(52px,5vw,88px);width:11px;height:11px;border:1px solid var(--acc);border-radius:50%;background:var(--bg)}',
T + ' .kp-scene__copy{grid-column:1/5}',
T + ' .kp-board{grid-column:5/12}',
T + ' .kp-scene--r .kp-scene__copy{grid-column:8/12;grid-row:1}',
T + ' .kp-scene--r .kp-board{grid-column:1/8;grid-row:1}',
T + ' .kp-scene__n{font:700 clamp(64px,6vw,118px)/1 ' + COND + ';color:transparent;-webkit-text-stroke:1px rgba(236,235,229,.3)}',
T + ' .kp-scene__k{margin-top:18px;font:500 12px/1.3 Barlow,Arial,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:var(--acc)}',
T + ' .kp-scene__h{margin-top:12px;font:600 clamp(30px,2.6vw,50px)/1.08 ' + COND + ';text-transform:uppercase;letter-spacing:-.006em;color:var(--ink);text-wrap:balance}',
T + ' .kp-scene__p{margin-top:16px;max-width:42ch;font-size:clamp(15px,1.04vw,18px);line-height:1.65;color:var(--soft)}',
T + ' .kp-board__frame{position:relative;aspect-ratio:16/9;background:linear-gradient(180deg,var(--g1),#0A0C0B);border:1px solid var(--line2)}',
T + ' .kp-board__frame .kp-brk{inset:-10px}',
T + ' .kp-board__svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}',
T + ' .kp-b-s{fill:none;stroke:rgba(236,235,229,.48);stroke-width:1.3;stroke-dasharray:1;stroke-dashoffset:0}',
T + ' .kp-b-acc{stroke:var(--acc)}',
T + ' .kp-b-grid{stroke:rgba(236,235,229,.09)}',
T + ' .kp-b-dash{stroke-dasharray:.012 .014}',
T + ' .kp-b-f{fill:var(--acc)}',
T + ' .kp-b-cone{fill:rgba(236,235,229,.07);stroke:rgba(236,235,229,.25);stroke-width:1}',
T + ' .kp-b-key{fill:rgba(168,207,98,.16)}',
T + ' .kp-b-fill{fill:rgba(236,235,229,.07)}',
T + ' .kp-board__cap{display:flex;flex-wrap:wrap;gap:6px 18px;margin-top:16px;font:500 11px/1.4 Barlow,Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:var(--dim)}',
T + ' .kp-board__cap span:first-child{color:var(--acc)}',

/* ===== 04 Hareket monitörü ===== */
T + ' .kp-motion{background:linear-gradient(180deg,var(--bg),var(--g1) 35%,var(--g1) 75%,var(--bg))}',
T + ' .kp-mo__head{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:end}',
T + ' .kp-mo__head .kp-label,' + T + ' .kp-mo__head .kp-h2{grid-column:1/-1}',
T + ' .kp-mo__lede{grid-column:8/13;margin-top:24px;font-size:clamp(16px,1.12vw,19px);line-height:1.6;color:var(--soft)}',
T + ' .kp-monitor{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);row-gap:24px;margin-top:clamp(52px,5vw,92px)}',
T + ' .kp-mon__screen{position:relative;grid-column:1/9;aspect-ratio:16/9}',
T + ' .kp-brk--mon{inset:-10px}',
T + ' .kp-mon__now{position:absolute;left:0;top:-30px;font:500 12px/1 Barlow,Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:var(--mute)}',
T + ' .kp-mon__now b{font-weight:500;color:var(--acc)}',
T + ' .kp-chaps{grid-column:9/13;align-self:stretch;display:flex;flex-direction:column;border-top:1px solid var(--line)}',
T + ' .kp-chaps li{flex:1 1 0}',
T + ' .kp-chap{display:grid;grid-template-columns:58px minmax(0,1fr);column-gap:10px;align-items:baseline;width:100%;height:100%;min-height:44px;padding:8px 0;border-bottom:1px solid var(--line);color:var(--mute);transition:color .35s var(--ease)}',
T + ' .kp-chap__tc{font:500 12px/1.3 Barlow,Arial,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:.08em;color:var(--dim)}',
T + ' .kp-chap__n{font:600 clamp(17px,1.3vw,22px)/1.15 ' + COND + ';text-transform:uppercase;letter-spacing:.01em}',
T + ' .kp-chap__d{grid-column:2;font-size:13px;line-height:1.4;color:var(--dim)}',
T + ' .kp-chap:hover,' + T + ' .kp-chap.is-on{color:var(--ink)}',
T + ' .kp-chap.is-on .kp-chap__tc{color:var(--acc)}',
T + ' .kp-mon__bar{grid-column:1/-1;display:grid;grid-template-columns:auto minmax(0,1fr);align-items:center;column-gap:22px}',
T + ' .kp-rh{position:relative;height:64px;cursor:pointer;touch-action:none;outline-offset:4px}',
T + ' .kp-rh__svg{display:block;width:100%;height:100%}',
T + ' .kp-rh__bars rect{fill:rgba(236,235,229,.16)}',
T + ' .kp-rh__done rect{fill:var(--acc)}',
T + ' .kp-rh__mark{stroke:rgba(236,235,229,.22);stroke-width:1;vector-effect:non-scaling-stroke;stroke-dasharray:2 3}',
T + ' .kp-rh__head{stroke:var(--ink);stroke-width:1.5;vector-effect:non-scaling-stroke}',

/* ===== 05 Formatlar ===== */
T + ' .kp-fmt__wrap{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:start;margin-top:clamp(52px,5vw,92px)}',
T + ' .kp-fmt__stage{grid-column:1/9}',
T + ' .kp-fmt__box{position:relative;display:flex;align-items:center;justify-content:center;height:clamp(340px,40vw,600px);border:1px solid var(--line2);background:repeating-linear-gradient(0deg,rgba(236,235,229,.03) 0 1px,transparent 1px 40px),repeating-linear-gradient(90deg,rgba(236,235,229,.03) 0 1px,transparent 1px 40px)}',
T + ' .kp-fmt__frame{position:relative;flex:none;width:94%;aspect-ratio:2.39/1;max-height:90%;overflow:visible}',
T + ' .kp-fmt__frame>.kp-slate,' + T + ' .kp-fmt__img{position:absolute;inset:0;width:100%;height:100%}',
T + ' .kp-fmt__img{display:block;object-fit:cover;transition:object-position .9s var(--ease)}',
T + ' .kp-fmt__img.is-err{display:none}',
T + ' .kp-brk--fmt{inset:-8px}',
T + ' .kp-fmt__g{position:absolute;inset:0;width:100%;height:100%;overflow:visible}',
T + ' .kp-fmt__g g{opacity:0;transition:opacity .5s var(--ease)}',
T + ' .kp-fmt__g path,' + T + ' .kp-fmt__g rect{fill:none;stroke:rgba(236,235,229,.6);stroke-width:1;vector-effect:non-scaling-stroke}',
T + ' .kp-fmt__g .g-acc,' + T + ' .kp-fmt__g .g-mp{stroke:var(--acc)}',
T + ' .kp-fmt__g .g-mp{stroke-width:1.6;stroke-dasharray:1;stroke-dashoffset:0}',
T + ' .kp-fmt__frame[data-g="scope"] .g-scope,' + T + ' .kp-fmt__frame[data-g="product"] .g-product,' + T + ' .kp-fmt__frame[data-g="social"] .g-social,' + T + ' .kp-fmt__frame[data-g="thirds"] .g-thirds,' + T + ' .kp-fmt__frame[data-g="motion"] .g-motion,' + T + ' .kp-fmt__frame[data-g="adapt"] .g-adapt,' + T + ' .kp-fmt__frame[data-g="ai"] .g-ai{opacity:1}',
T + ' .kp-fmt__ratio{position:absolute;left:0;top:-30px;font:500 12px/1 Barlow,Arial,sans-serif;letter-spacing:.16em;color:var(--acc);white-space:nowrap}',
T + ' .kp-fmt__info{display:grid;grid-template-columns:auto minmax(0,1fr);column-gap:22px;row-gap:8px;margin-top:26px}',
T + ' .kp-fmt__k{grid-row:1/3;font:500 13px/1.6 Barlow,Arial,sans-serif;letter-spacing:.14em;color:var(--acc)}',
T + ' .kp-fmt__t{font:600 clamp(26px,2.2vw,40px)/1.08 ' + COND + ';text-transform:uppercase;color:var(--ink)}',
T + ' .kp-fmt__d{max-width:54ch;font-size:clamp(15px,1.04vw,18px);line-height:1.6;color:var(--soft)}',
T + ' .kp-fmt__list{grid-column:9/13;border-top:1px solid var(--line)}',
T + ' .kp-fmt__btn{position:relative;display:grid;grid-template-columns:30px minmax(0,1fr);column-gap:10px;row-gap:2px;width:100%;min-height:44px;padding:16px 0;border-bottom:1px solid var(--line);color:var(--mute);transition:color .35s var(--ease)}',
T + ' .kp-fmt__btn::after{content:"";position:absolute;left:0;bottom:-1px;width:100%;height:1px;background:var(--acc);transform:scaleX(0);transform-origin:0 50%;transition:transform .6s var(--ease)}',
T + ' .kp-fmt__btn[aria-pressed="true"]{color:var(--ink)}',
T + ' .kp-fmt__btn[aria-pressed="true"]::after{transform:scaleX(1)}',
T + ' .kp-fmt__n{font:500 12px/1.6 Barlow,Arial,sans-serif;letter-spacing:.12em;color:var(--dim)}',
T + ' .kp-fmt__btn[aria-pressed="true"] .kp-fmt__n{color:var(--acc)}',
T + ' .kp-fmt__name{font:600 clamp(19px,1.45vw,25px)/1.12 ' + COND + ';text-transform:uppercase}',
T + ' .kp-fmt__r{grid-column:2;font:500 12px/1.3 Barlow,Arial,sans-serif;letter-spacing:.12em;color:var(--dim)}',
T + ' .kp-fmt__note{margin-top:22px;max-width:60ch;font-size:13px;line-height:1.5;color:var(--dim)}',

/* ===== 06 Felsefe ===== */
T + ' .kp-phil{position:relative;padding:clamp(150px,13vw,240px) 0;border-top:1px solid var(--line);overflow:hidden;isolation:isolate}',
T + ' .kp-lb{position:absolute;left:0;right:0;z-index:-1;height:clamp(56px,7vw,120px);background:#020302;transform-origin:50% 0}',
T + ' .kp-lb--t{top:0;border-bottom:1px solid var(--line2)}',
T + ' .kp-lb--b{bottom:0;border-top:1px solid var(--line2);transform-origin:50% 100%}',
T + ' .kp-phil__t{margin-top:clamp(30px,3vw,52px);font:700 clamp(58px,9.6vw,190px)/1.02 ' + COND + ';letter-spacing:-.018em;text-transform:uppercase}',
T + ' .kp-pl{display:block;white-space:nowrap}',
T + ' .kp-pl--a,' + T + ' .kp-pl--b{color:var(--mute)}',
T + ' .kp-pl--b{padding-left:22%}',
T + ' .kp-pl--c{margin-top:.2em;color:var(--ink)}',
T + ' .kp-pl--d{padding-left:12%;color:var(--acc)}',
T + ' .kp-w,' + T + ' .kp-wd,' + T + ' .kp-ch{display:inline-block}',
T + ' .kp-wd{white-space:nowrap}',
T + ' .kp-phil__p{max-width:46ch;margin:clamp(36px,3.4vw,60px) 0 0 auto;font-size:clamp(16px,1.15vw,20px);line-height:1.62;color:var(--soft)}',

/* ===== 07 Final ===== */
T + ' .kp-fin{position:relative;padding:clamp(110px,9vw,170px) 0 clamp(80px,6vw,110px);border-top:1px solid var(--line);background:linear-gradient(180deg,var(--bg),var(--g1));overflow:hidden}',
T + ' .kp-fin__frame{position:relative;padding:clamp(48px,5vw,96px) clamp(28px,5vw,96px)}',
T + ' .kp-brk--fin i{border-color:rgba(168,207,98,.75)}',
T + ' .kp-fin__q{font:600 clamp(24px,2.3vw,42px)/1.1 ' + COND + ';text-transform:uppercase;color:var(--soft)}',
T + ' .kp-fin__t{margin-top:.5em;font:700 clamp(80px,10.4vw,204px)/.98 ' + COND + ';letter-spacing:-.016em;text-transform:uppercase;color:var(--ink)}',
T + ' .kp-fin__sub{max-width:44ch;margin-top:clamp(28px,2.6vw,44px);font-size:clamp(17px,1.25vw,21px);line-height:1.55;color:var(--soft)}',
T + ' .kp-fin__cta{display:flex;flex-wrap:wrap;gap:14px;margin-top:clamp(32px,3vw,52px)}',
T + ' .kp-fin__end{display:flex;justify-content:space-between;gap:18px;margin-top:clamp(28px,2.6vw,44px);font:500 11px/1.3 Barlow,Arial,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:var(--dim)}',
T + ' .kp-fin__end b{font-weight:500;font-variant-numeric:tabular-nums;color:var(--acc)}',
T + ' .kp-btn{position:relative;display:inline-flex;align-items:center;justify-content:space-between;gap:22px;height:64px;padding:0 10px 0 28px;border-radius:12px;overflow:hidden;white-space:nowrap;isolation:isolate;',
'  font:500 13.5px/1 Barlow,Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase;text-decoration:none;color:var(--ink);border:1px solid rgba(168,207,98,.42);background:rgba(16,19,17,.72);transition:color .45s var(--ease),border-color .45s ease;touch-action:manipulation}',
T + ' .kp-btn::before{content:"";position:absolute;inset:0;z-index:-1;background:var(--acc);transform:scaleX(0);transform-origin:0 50%;transition:transform .6s cubic-bezier(.65,0,.35,1)}',
T + ' .kp-btn__ico{display:grid;place-items:center;width:44px;height:44px;border-radius:8px;background:rgba(168,207,98,.12);transition:background-color .45s ease}',
T + ' .kp-btn--ghost{border-color:rgba(228,227,221,.22);background:rgba(8,10,9,.5)}',
T + ' .kp-btn--ghost .kp-btn__ico{background:rgba(236,235,229,.06)}',
T + ' .kp-btn:hover,' + T + ' .kp-btn:focus-visible{color:#0A0B0B;border-color:var(--acc)}',
T + ' .kp-btn:hover::before,' + T + ' .kp-btn:focus-visible::before{transform:scaleX(1)}',
T + ' .kp-btn:hover .kp-btn__ico,' + T + ' .kp-btn:focus-visible .kp-btn__ico{background:rgba(10,11,11,.12)}',

/* Header paneli (Kısaca Biz V3 ile aynı; yalnızca bu sayfanın paneli) */
'.n1h-panel[data-n1-kp],.n1h-panel[data-n1-kp] *,.n1h-panel[data-n1-kp] *::before,.n1h-panel[data-n1-kp] *::after{box-sizing:border-box}',
'.n1h-panel[data-n1-kp] a.n1h-item{text-decoration:none;color:#ecebe6}',
'.n1h-panel[data-n1-kp] .n1h-sub a{text-decoration:none}',
'@media (max-width:1024px){.n1h-panel[data-n1-kp][data-open]::before{content:"";position:fixed;left:0;right:0;bottom:0;top:72px;z-index:-1;pointer-events:none;background:rgba(8,10,9,.8);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}}',
'@media (max-width:767px){.n1h-panel[data-n1-kp][data-open]::before{top:64px}}',
T + ' .n1ft-partner-art{display:none}',

/* ---------- Tablet (≤1024) ---------- */
'@media (max-width:1024px){',
T + ' .kp-hero{padding-top:118px}',
T + ' .kp-hero__grid{display:flex;flex-direction:column;align-items:stretch}',
T + ' .kp-hero__copy{order:1;padding:0;pointer-events:auto}',
T + ' .kp-hero__title{margin-top:.3em;font-size:clamp(84px,12.6vw,128px);mix-blend-mode:normal}',
T + ' .kp-hero__sub{font-size:clamp(24px,3.4vw,34px)}',
T + ' .kp-hero__stage{order:2;width:100%;margin-top:78px}',
T + ' .kp-hero__stage{margin-bottom:60px}',
T + ' .kp-hero__stage .kp-ctl{left:0;right:auto;top:calc(100% + 16px);bottom:auto}',
T + ' .kp-brk--hero{inset:-10px}',
T + ' .kp-hero__foot{margin-top:56px}',
T + ' .kp-idea__grid{display:flex;flex-direction:column;gap:40px}',
T + ' .kp-idea__lede{max-width:56ch}',
T + ' .kp-idea__stage{position:relative;top:auto;min-height:420px;padding-top:0}',
T + ' .kp-idea__stage::before{left:0;top:54px}',
T + ' .kp-idea__keys{max-width:none;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:18px;row-gap:12px}',
T + ' .kp-idea__keys span{grid-template-columns:44px minmax(0,1fr)}',
T + ' .kp-idea__canvas{position:relative;left:auto;right:auto;bottom:auto;height:260px;margin-top:22px}',
T + ' .kp-jr__lede,' + T + ' .kp-mo__lede{grid-column:1/-1;max-width:60ch}',
T + ' .kp-jr__body{padding-left:44px}',
T + ' .kp-scene,' + T + ' .kp-scene--r{grid-template-columns:repeat(12,minmax(0,1fr));row-gap:28px}',
T + ' .kp-scene__copy,' + T + ' .kp-scene--r .kp-scene__copy{grid-column:1/6;grid-row:1}',
T + ' .kp-board,' + T + ' .kp-scene--r .kp-board{grid-column:6/13;grid-row:1}',
T + ' .kp-scene::before{left:-49px}',
T + ' .kp-scene__n{font-size:64px}',
T + ' .kp-scene__h{font-size:clamp(26px,3.6vw,34px)}',
T + ' .kp-mon__screen{grid-column:1/-1}',
T + ' .kp-chaps{grid-column:1/-1;flex-direction:row;overflow-x:auto;gap:8px;border:0;padding-bottom:4px;scroll-snap-type:x proximity;scrollbar-width:none}',
T + ' .kp-chaps::-webkit-scrollbar{display:none}',
T + ' .kp-chaps li{flex:none;scroll-snap-align:start}',
T + ' .kp-chap{grid-template-columns:auto;width:auto;padding:10px 14px;border:1px solid var(--line);border-radius:4px}',
T + ' .kp-chap__d{display:none}',
T + ' .kp-chap.is-on{border-color:rgba(168,207,98,.6);background:rgba(168,207,98,.06)}',
T + ' .kp-mon__bar{grid-template-columns:1fr;row-gap:14px}',
T + ' .kp-fmt__stage{grid-column:1/-1}',
T + ' .kp-fmt__box{height:clamp(340px,56vw,520px)}',
T + ' .kp-fmt__list{grid-column:1/-1;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:var(--gap);margin-top:34px}',
T + ' .kp-phil__t{font-size:clamp(56px,10.6vw,100px)}',
T + ' .kp-fin__t{font-size:clamp(70px,11vw,112px)}',
/* Header (Kısaca Biz V3 ile aynı iç sayfa düzeni, bu etiket için) */
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
T + '{font-size:16px;--secpad:76px}',
T + ' .kp-wrap{width:calc(100% - 40px)}',
T + ' .kp-hero{padding-top:100px}',
T + ' .kp-hero__title{font-size:clamp(58px,16.2vw,84px);line-height:.98}',
T + ' .kp-hero__sub{font-size:clamp(22px,6.4vw,30px)}',
T + ' .kp-hero__stage{margin-top:64px}',
T + ' .kp-hud{font-size:10px;letter-spacing:.14em}',
T + ' .kp-hud--t{top:-30px}',
T + ' .kp-hud--t span:first-child{display:none}',
T + ' .kp-hero__stage .kp-ctl{top:calc(100% + 14px)}',
T + ' .kp-hero__foot{flex-direction:column;align-items:flex-start;gap:14px;margin-top:44px}',
T + ' .kp-label{font-size:13px}',
T + ' .kp-h2{margin-top:20px;font-size:clamp(46px,12.6vw,64px)}',
T + ' .kp-idea__grid{margin-top:34px;gap:30px}',
T + ' .kp-idea__text{font-size:clamp(26px,7.4vw,34px);line-height:1.2}',
T + ' .kp-idea__lede{margin-top:18px;font-size:15px;line-height:1.72}',
T + ' .kp-idea__stage{min-height:0}',
T + ' .kp-idea__stage::before{inset:48px 0 14px 0}',
T + ' .kp-idea__keys{grid-template-columns:1fr;margin-top:18px;gap:12px}',
T + ' .kp-idea__keys strong{font-size:20px}',
T + ' .kp-idea__canvas{height:210px;margin-top:14px}',
T + ' .kp-jr__body{margin-top:44px;padding-left:28px}',
T + ' .kp-scene,' + T + ' .kp-scene--r{display:flex;flex-direction:column;align-items:stretch;gap:26px;padding:36px 0}',
T + ' .kp-scene::before{left:-33px;top:48px}',
T + ' .kp-scene__n{font-size:54px}',
T + ' .kp-scene__h{font-size:clamp(26px,7.4vw,32px)}',
T + ' .kp-monitor{margin-top:52px;row-gap:20px}',
T + ' .kp-chaps{margin:0 -20px;padding:0 20px 4px}',
T + ' .kp-chap{padding:9px 12px}',
T + ' .kp-chap__n{font-size:17px}',
T + ' .kp-mon__bar .kp-ctl{flex-wrap:wrap}',
T + ' .kp-rh{height:52px}',
T + ' .kp-fmt__wrap{margin-top:34px}',
T + ' .kp-fmt__box{height:clamp(300px,96vw,420px)}',
T + ' .kp-fmt__list{display:flex;gap:8px;margin:24px -20px 0;padding:0 20px 4px;border:0;overflow-x:auto;scroll-snap-type:x proximity;scrollbar-width:none}',
T + ' .kp-fmt__list::-webkit-scrollbar{display:none}',
T + ' .kp-fmt__list li{flex:none;scroll-snap-align:start}',
T + ' .kp-fmt__btn{display:flex;align-items:center;gap:8px;width:auto;padding:0 14px;border:1px solid var(--line);border-radius:22px}',
T + ' .kp-fmt__btn::after,' + T + ' .kp-fmt__r{display:none}',
T + ' .kp-fmt__btn[aria-pressed="true"]{border-color:rgba(168,207,98,.6);background:rgba(168,207,98,.08)}',
T + ' .kp-fmt__name{font-size:17px;white-space:nowrap}',
T + ' .kp-fmt__info{grid-template-columns:1fr;margin-top:22px}',
T + ' .kp-fmt__k{grid-row:auto}',
T + ' .kp-phil{padding:120px 0}',
T + ' .kp-lb{height:44px}',
T + ' .kp-phil__t{font-size:clamp(44px,12.4vw,62px);line-height:1.04}',
T + ' .kp-pl--a{white-space:normal}',
T + ' .kp-pl--b{padding-left:10%}',
T + ' .kp-pl--d{padding-left:0;white-space:normal}',
T + ' .kp-fin{padding:84px 0 70px}',
T + ' .kp-fin__frame{padding:40px 22px}',
T + ' .kp-fin__t{font-size:clamp(52px,14.4vw,72px);line-height:1}',
T + ' .kp-fin__cta{flex-direction:column;gap:11px}',
T + ' .kp-btn{width:100%;height:56px;padding:0 7px 0 18px;font-size:12px}',
T + ' .kp-btn__ico{width:42px;height:42px}',
T + ' .kp-fin__end{flex-wrap:wrap}',
T + ' n1-header .n1h-bar.site-container{width:calc(100% - 40px)!important;height:64px!important}',
T + ' n1-header .n1h-logo img{width:30px!important;height:30px!important}',
T + ' .n1ft-inner{width:calc(100% - 40px)}',
T + ' .n1ft-top{grid-template-columns:1fr!important;gap:32px;padding:39px 0 36px}',
T + ' .n1ft-col--brand{grid-column:auto}',
T + ' .n1ft-brand{font-size:45px}',
'}',
'@media (max-width:360px){',
T + ' .kp-wrap,' + T + ' .n1ft-inner{width:calc(100% - 32px)}',
T + ' .kp-chaps,' + T + ' .kp-fmt__list{margin-left:-16px;margin-right:-16px;padding-left:16px;padding-right:16px}',
T + ' n1-header .n1h-bar.site-container{width:calc(100% - 32px)!important}',
'}',
'@media (prefers-reduced-motion:reduce){',
T + ' .kp *,' + T + ' .kp *::before,' + T + ' .kp *::after{transition-duration:.01ms!important;transition-delay:0s!important}',
'}'
  ].join('\n');

  /* ---------- Bileşen ---------- */
  class KreatifProduksiyonV2 extends HTMLElement {
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
        if (!this.querySelector('main.kp')) this.innerHTML = '<p style="padding:40px 5%;color:#ECEBE5;font:16px Barlow,Arial,sans-serif">Kreatif Prodüksiyon yüklenemedi. Lütfen sayfayı yenileyin.</p>';
      });
    }

    _ev(el, ev, fn, opt) { el.addEventListener(ev, fn, opt); this._cleanups.push(function () { el.removeEventListener(ev, fn, opt); }); }

    async _mount() {
      var self = this, url = this._url;
      if (!document.getElementById('n1-kp2-style')) {
        var st = document.createElement('style'); st.id = 'n1-kp2-style'; st.textContent = CSS; document.head.appendChild(st);
      }
      this.innerHTML = '<div id="ust" style="height:0"></div>' + markup();
      this._anchors();
      this._videos();
      this._formats();

      var fonts = loadCss(FONTS).catch(function (e) { console.warn('[' + TAG + '] Font yüklenemedi, yedek font kullanılıyor', e); });
      await Promise.all([loadCss(url('footerCss')), loadCss(url('responsive')), loadJs(url('markup'), function () { return !!window.N1_SITE_MARKUP; })]);
      if (!this._on) return;

      var tpl = document.createElement('template');
      tpl.innerHTML = String(window.N1_SITE_MARKUP || '').split('{{ASSETS}}').join(url('assets'));
      var hdr = tpl.content.querySelector('n1-header'), ft = tpl.content.querySelector('[data-n1-footer]'), fc = tpl.content.querySelector('n1-floating-controls');
      if (!hdr || !ft) throw new Error('Onaylı Header/Footer işaretlemesi bulunamadı');
      var main = this.querySelector('main.kp');

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

      var otherFc = [].some.call(document.querySelectorAll('n1-floating-controls'), function (f) { return !self.contains(f); }) || !!document.querySelector('.n1fc:not([data-n1-kp])');
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
        if (this._header.panel) { this._header.panel.classList.add('n1-inner-panel'); this._header.panel.setAttribute('data-n1-kp', ''); }
      }
      await loadJs(url('footerJs'), null, true);
      if (this._fcOwned && !customElements.get('n1-floating-controls')) await loadJs(url('floating'), function () { return !!customElements.get('n1-floating-controls'); });
      var layer = document.querySelector('body > .n1fc:last-of-type'); if (this._fcOwned && layer) layer.setAttribute('data-n1-kp', '');
      if (!this._on) return;
      this._animate();
    }

    _anchors() {
      var a = this.querySelector('.kp-scroll'), self = this;
      this._ev(a, 'click', function (e) {
        e.preventDefault();
        var t = self.querySelector('#kp-fikir'); if (!t) return;
        scrollTo({ top: t.getBoundingClientRect().top + scrollY - 72, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      });
    }

    /* ---------- Video: tek kaynak, aynı anda tek oynatıcı ---------- */
    _videos() {
      var self = this, reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      var heroSrc = pickVideo(HERO_VIDEO), monitorSrc = pickVideo(VIDEO);
      var make = function (root, auto, src) {
        var scr = root.querySelector('.kp-screen'), v = scr.querySelector('video'), pst = scr.querySelector('.kp-poster'), err = scr.querySelector('.kp-screen__err');
        var ctl = root.querySelector('.kp-ctl') || root.parentNode.querySelector('.kp-ctl');
        var P = { root: root, scr: scr, v: v, ctl: ctl, auto: auto, src: src, visible: false, userPaused: false, loaded: false, failed: false };
        P.load = function (mode) { if (P.loaded) return; P.loaded = true; v.preload = mode || 'auto'; v.src = P.src; };
        P.play = function () {
          if (P.failed) return;
          P.load();
          VIDS.forEach(function (o) { if (o !== P && !o.v.paused) o.v.pause(); });
          var pr = v.play(); if (pr && pr.catch) pr.catch(function () { P.sync(); });
        };
        P.sync = function () {
          var playing = !v.paused && !v.ended;
          scr.classList.toggle('is-playing', playing);
          if (ctl) {
            var b = ctl.querySelector('.kp-play'); b.setAttribute('aria-pressed', String(!playing)); b.setAttribute('aria-label', playing ? 'Videoyu duraklat' : 'Videoyu oynat');
            var m = ctl.querySelector('.kp-mute'); m.setAttribute('aria-pressed', String(!v.muted)); m.setAttribute('aria-label', v.muted ? 'Sesi aç' : 'Sesi kapat');
          }
        };
        P.time = function () {
          var t = P.pendingT != null ? P.pendingT : v.currentTime;   // yükleme sürerken seçilen bölüm korunur
          if (ctl) ctl.querySelector('.kp-tc b').textContent = tc(t);
          if (P.onTime) P.onTime(t);
        };
        ['play', 'pause', 'ended', 'volumechange'].forEach(function (e) { self._ev(v, e, P.sync); });
        var started = function () { scr.classList.add('is-started'); };
        self._ev(v, 'playing', started); self._ev(v, 'seeked', function () { if (v.currentTime > .05) started(); });
        self._ev(v, 'loadedmetadata', function () {
          if (P.src === heroSrc && ctl && Number.isFinite(v.duration) && v.duration > 0) {
            var time = ctl.querySelector('.kp-tc');
            if (time && time.lastChild && time.lastChild.nodeType === 3) time.lastChild.nodeValue = ' / ' + tc(v.duration);
          }
        });
        self._ev(v, 'timeupdate', P.time);
        self._ev(v, 'seeked', P.time);
        self._ev(v, 'error', function () {
          P.failed = true; scr.classList.add('is-failed'); scr.classList.remove('is-playing');
          err.textContent = 'Video şu anda yüklenemedi. Kare görüntüsü gösteriliyor.';
          if (ctl) [].forEach.call(ctl.querySelectorAll('button'), function (b) { b.disabled = true; });
        });
        if (pst) self._ev(pst, 'error', function () { pst.remove(); });
        if (ctl) {
          self._ev(ctl.querySelector('.kp-play'), 'click', function () { if (v.paused) { P.userPaused = false; P.play(); } else { P.userPaused = true; v.pause(); } });
          self._ev(ctl.querySelector('.kp-mute'), 'click', function () { v.muted = !v.muted; if (!v.muted && v.paused) P.play(); });
        }
        // Kare zamanını hassas okumak: requestVideoFrameCallback varsa yalnızca oynarken çalışır
        if (v.requestVideoFrameCallback) {
          var cb = function () { if (!self._on) return; P.time(); P.rvfc = v.requestVideoFrameCallback(cb); };
          self._ev(v, 'play', function () { if (P.rvfc == null) P.rvfc = v.requestVideoFrameCallback(cb); });
          self._ev(v, 'pause', function () { if (P.rvfc != null) { v.cancelVideoFrameCallback(P.rvfc); P.rvfc = null; } });
        }
        P.sync();
        return P;
      };
      var VIDS = [];
      var hero = make(this.querySelector('.kp-hero__stage'), true, heroSrc);
      var mon = make(this.querySelector('.kp-mon__screen').parentNode, true, monitorSrc);
      VIDS.push(hero, mon);
      this._vids = VIDS;
      var c = navigator.connection || {}, autoOK = !reduced && !c.saveData;
      hero.auto = mon.auto = autoOK;
      // Hero: hemen meta veriyi değil, görünür olunca oynatmayı başlatır
      // Görünürlük: ekran dışındaki video duraklar; görünen ve kullanıcı durdurmamışsa (otomatik oynatma izinliyse) oynar
      var io = new IntersectionObserver(function (en) {
        en.forEach(function (e) {
          var P = VIDS.filter(function (o) { return o.scr.parentNode === e.target; })[0]; if (!P) return;
          P.visible = e.intersectionRatio >= .35;
          if (P.visible && P.auto && !P.userPaused && !document.hidden) P.play();
          else if (!P.visible && !P.v.paused) P.v.pause();
        });
      }, { threshold: [0, .35, .6], rootMargin: '0px' });
      // Kırpılmayan dış kutu gözlenir: açılış animasyonundaki clip-path görünürlük oranını düşürmesin
      VIDS.forEach(function (P) { io.observe(P.scr.parentNode); });
      // Monitör videosu ancak bölüme yaklaşınca indirilir
      var near = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { mon.load(autoOK ? 'auto' : 'metadata'); near.disconnect(); } }, { rootMargin: '400px 0px' });
      near.observe(mon.scr);
      var onVis = function () { VIDS.forEach(function (P) { if (document.hidden) P.v.pause(); else if (P.visible && P.auto && !P.userPaused) P.play(); }); };
      document.addEventListener('visibilitychange', onVis);
      if (!autoOK) hero.load('metadata');   // hareket azaltma / veri tasarrufu: yalnızca meta veri; video kullanıcı oynatınca iner
      this._cleanups.push(function () {
        io.disconnect(); near.disconnect(); document.removeEventListener('visibilitychange', onVis);
        VIDS.forEach(function (P) { try { if (P.rvfc != null) P.v.cancelVideoFrameCallback(P.rvfc); P.v.pause(); P.v.removeAttribute('src'); P.v.load(); } catch (e) {} });
      });

      /* Bölümler + ritim çizgisi (monitör) */
      var chaps = [].slice.call(this.querySelectorAll('.kp-chap')), now = this.querySelector('.kp-mon__now b');
      var rh = this.querySelector('.kp-rh'), clip = rh.querySelector('.kp-rh__clip'), head = rh.querySelector('.kp-rh__head');
      var cur = -1;
      mon.onTime = function (t) {
        var x = (t / VIDEO_DUR * 960).toFixed(1);
        clip.setAttribute('width', x); head.setAttribute('x1', x); head.setAttribute('x2', x);
        rh.setAttribute('aria-valuenow', Math.round(t)); rh.setAttribute('aria-valuetext', tc(t).slice(0, 5));
        var k = 0; CHAPTERS.forEach(function (c, i) { if (t >= c.t - .05) k = i; });
        if (k !== cur) { cur = k; chaps.forEach(function (b, i) { b.classList.toggle('is-on', i === k); }); now.textContent = CHAPTERS[k].n; }
      };
      mon.onTime(0);
      var seek = function (t) {
        t = Math.max(0, Math.min(VIDEO_DUR - .05, t));
        mon.load();
        var go = function () { mon.pendingT = null; try { mon.v.currentTime = t; } catch (e) {} mon.onTime(t); };
        if (mon.v.readyState >= 1) go(); else { mon.pendingT = t; mon.v.addEventListener('loadedmetadata', go, { once: true }); mon.time(); }
      };
      chaps.forEach(function (b) {
        self._ev(b, 'click', function () { seek(+b.getAttribute('data-t')); mon.userPaused = false; if (!mon.failed) mon.play(); });
      });
      var fromX = function (e) { var r = rh.getBoundingClientRect(); return (e.clientX - r.left) / r.width * VIDEO_DUR; };
      var drag = false;
      this._ev(rh, 'pointerdown', function (e) { drag = true; try { rh.setPointerCapture(e.pointerId); } catch (x) {} seek(fromX(e)); });
      this._ev(rh, 'pointermove', function (e) { if (drag) seek(fromX(e)); });
      this._ev(rh, 'pointerup', function () { drag = false; });
      this._ev(rh, 'pointercancel', function () { drag = false; });
      this._ev(rh, 'keydown', function (e) {
        var t = mon.v.currentTime || 0, d = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') d = t + 1; else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') d = t - 1;
        else if (e.key === 'PageUp') d = t + 5; else if (e.key === 'PageDown') d = t - 5; else if (e.key === 'Home') d = 0; else if (e.key === 'End') d = VIDEO_DUR;
        if (d != null) { e.preventDefault(); seek(d); }
      });
    }

    /* ---------- Formatlar: kadraj oranı değişir (GSAP'siz de çalışır) ---------- */
    _formats() {
      var self = this, root = this.querySelector('[data-kp="formats"]');
      var box = root.querySelector('.kp-fmt__box'), fr = root.querySelector('.kp-fmt__frame'), img = root.querySelector('.kp-fmt__img');
      var btns = [].slice.call(root.querySelectorAll('.kp-fmt__btn')), ratio = root.querySelector('.kp-fmt__ratio');
      var info = { k: root.querySelector('.kp-fmt__k'), t: root.querySelector('.kp-fmt__t'), d: root.querySelector('.kp-fmt__d') };
      var F = this._fmt = { i: 0 };
      this._ev(img, 'error', function () { img.classList.add('is-err'); });
      F.size = function (i) {
        var f = FORMATS[i], bw = box.clientWidth * .9, bh = box.clientHeight * .84, r = f.w / f.h;
        var w = bw, h = w / r; if (h > bh) { h = bh; w = h * r; }
        return { width: Math.round(w), height: Math.round(h) };
      };
      F.apply = function (i, animate) {
        var s = F.size(i), g = window.gsap;
        fr.style.aspectRatio = 'auto'; fr.style.maxHeight = 'none';
        if (g && animate && self._motion) g.to(fr, { width: s.width, height: s.height, duration: .95, ease: 'expo.inOut', overwrite: true });
        else { if (g) g.killTweensOf(fr); fr.style.width = s.width + 'px'; fr.style.height = s.height + 'px'; }
      };
      F.set = function (i, force) {
        i = (i + 7) % 7; if (i === F.i && !force) return; F.i = i; var f = FORMATS[i];
        btns.forEach(function (b, k) { b.setAttribute('aria-pressed', String(k === i)); });
        fr.setAttribute('data-g', f.g); img.style.objectPosition = f.pos; ratio.textContent = f.r;
        info.k.textContent = pad(i + 1) + ' / 07'; info.t.textContent = f.n; info.d.textContent = f.d;
        F.apply(i, true);
        if (F.onSet) F.onSet(i);
      };
      var list = root.querySelector('.kp-fmt__list');
      this._ev(list, 'click', function (e) { var b = e.target.closest('.kp-fmt__btn'); if (b) { F.set(+b.getAttribute('data-i')); F.reveal(); } });
      this._ev(list, 'pointerover', function (e) { if (e.pointerType !== 'mouse' || !matchMedia('(hover:hover) and (min-width:1025px)').matches) return; var b = e.target.closest('.kp-fmt__btn'); if (b) F.set(+b.getAttribute('data-i')); });
      this._ev(list, 'keydown', function (e) {
        var b = e.target.closest('.kp-fmt__btn'); if (!b) return; var i = +b.getAttribute('data-i'), j = null;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') j = i + 1; else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') j = i - 1;
        if (j != null) { e.preventDefault(); j = (j + 7) % 7; btns[j].focus(); F.set(j); }
      });
      F.reveal = function () {
        if (getComputedStyle(list).overflowX !== 'auto') return;
        var li = btns[F.i].parentNode; list.scrollTo({ left: li.offsetLeft - 20, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      };
      F.apply(0, false);
      if ('ResizeObserver' in window) {
        var w0 = 0, ro = new ResizeObserver(function () { var w = box.clientWidth; if (Math.abs(w - w0) > 1) { w0 = w; F.apply(F.i, false); } });
        ro.observe(box); this._cleanups.push(function () { ro.disconnect(); });
      }
    }

    /* ---------- Hareket ---------- */
    _animate() {
      var gsap = window.gsap, STg = window.ScrollTrigger, self = this;
      if (!gsap) return;
      if (STg) gsap.registerPlugin(STg);
      var q = function (s, r) { return [].slice.call((r || self).querySelectorAll(s)); };
      var one = function (s) { return self.querySelector(s); };
      this._ctx = gsap.context(function () {
        var mm = gsap.matchMedia();
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          self._motion = true;
          /* 01 Açılış: kadraj ince bir yarıktan açılır (letterbox), köşeler çizilir, başlık maskeden yükselir */
          var hs = one('.kp-hero__stage .kp-screen');
          var tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
          tl.fromTo(hs, { clipPath: 'inset(49.6% 0% 49.6% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.inOut' }, .15)
            .from(q('.kp-brk--hero i'), { scale: 0, autoAlpha: 0, duration: 1.1, stagger: .06, ease: 'expo.out' }, .9)
            .from(q('.kp-hero .kp-tag'), { autoAlpha: 0, x: -16, duration: .8 }, .35)
            .from(q('.kp-hero__title .kp-ln>span'), { yPercent: 115, duration: 1.25, stagger: .12, ease: 'power4.out' }, .55)
            .from(q('.kp-hero__sub .kp-ln>span'), { yPercent: 115, duration: 1, stagger: .1, ease: 'power4.out' }, 1.05)
            .from(q('.kp-hud span, .kp-hero__stage .kp-ctl'), { autoAlpha: 0, y: 8, duration: .7, stagger: .08 }, 1.3)
            .from(one('.kp-hero__foot'), { autoAlpha: 0, duration: .9 }, 1.5);
          return function () { self._motion = false; gsap.set(hs, { clearProps: 'clipPath' }); };
        });
        mm.add('(prefers-reduced-motion: no-preference) and (min-width: 1025px) and (hover: hover)', function () {
          var hero = one('.kp-hero'), b = one('.kp-brk--hero'), t = one('.kp-hero__title');
          var bx = gsap.quickTo(b, 'x', { duration: .9, ease: 'power3' }), by = gsap.quickTo(b, 'y', { duration: .9, ease: 'power3' });
          var tx = gsap.quickTo(t, 'x', { duration: 1.2, ease: 'power3' });
          var mv = function (e) { var r = hero.getBoundingClientRect(), nx = (e.clientX - r.left) / r.width - .5, ny = (e.clientY - r.top) / r.height - .5; bx(nx * 14); by(ny * 10); tx(nx * -10); };
          hero.addEventListener('pointermove', mv);
          return function () { hero.removeEventListener('pointermove', mv); };
        });

        if (!STg) return;

        mm.add('(prefers-reduced-motion: no-preference)', function () {
          // Başlık maskeleri
          q('.kp-sec .kp-h2, .kp-fin__t').forEach(function (h) {
            gsap.from(h.querySelectorAll('.kp-ln>span'), { yPercent: 115, duration: 1.1, ease: 'power4.out', stagger: .1, scrollTrigger: { trigger: h, start: 'top 86%', once: true } });
          });
          // Hero kaydırırken: kadraj hafifçe geri çekilir (kamera geri kayar), pin yok
          gsap.to(one('.kp-hero__stage'), { scale: .94, yPercent: 6, ease: 'none', scrollTrigger: { trigger: one('.kp-hero'), start: 'top top', end: 'bottom top', scrub: true } });

          /* 02 Fikir: kelimeler okunurken kare katman katman kurulur */
          var words = q('.kp-iw'), keys = q('.kp-idea__keys span'), fig = one('.kp-idea__svg');
          gsap.set(q('.kp-d', fig), { autoAlpha: 0 });
          var it = gsap.timeline({ scrollTrigger: { trigger: one('.kp-idea__text'), start: 'top 78%', end: 'bottom 52%', scrub: .6 } });
          words.forEach(function (w, i) {
            var at = i / words.length;
            it.fromTo(w, { opacity: .2 }, { opacity: 1, duration: .04, ease: 'none' }, at);
            var k = w.getAttribute('data-k');
            if (k != null) {
              var g = fig.querySelector('.k' + (+k));
              it.to(g, { autoAlpha: 1, duration: .03 }, at)
                .fromTo(g.querySelectorAll('[pathLength]'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: .12, ease: 'none' }, at)
                .add(function () { keys.forEach(function (s, j) { s.classList.toggle('is-on', j <= +k); }); }, at);
            }
          });
          // Hareket katmanı: nokta yolu izler (scrub'a bağlı, sürekli döngü yok)
          var path = fig.querySelector('.kp-d-path'), mov = fig.querySelector('.kp-d-mov');
          if (path && path.getTotalLength) {
            var L = path.getTotalLength(), pr = { p: 0 };
            it.to(pr, { p: 1, duration: .25, ease: 'none', onUpdate: function () { var pt = path.getPointAtLength(pr.p * L); mov.setAttribute('cx', pt.x.toFixed(1)); mov.setAttribute('cy', pt.y.toFixed(1)); } }, .75);
          }
          return function () { keys.forEach(function (s) { s.classList.remove('is-on'); }); };
        });

        /* 03 Yolculuk: omurga kaydırmayla dolar; her sahnenin çizimi kendi hareketiyle kurulur */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          gsap.fromTo(one('.kp-spine__fill'), { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: one('.kp-jr__body'), start: 'top 70%', end: 'bottom 70%', scrub: true } });
          q('.kp-scene').forEach(function (sc, i) {
            var svg = sc.querySelector('.kp-board__svg');
            var tl = gsap.timeline({ scrollTrigger: { trigger: sc, start: 'top 72%', once: true } });
            tl.from(sc.querySelector('.kp-scene__n'), { yPercent: 40, autoAlpha: 0, duration: 1, ease: 'expo.out' })
              .from(sc.querySelectorAll('.kp-scene__k, .kp-scene__h, .kp-scene__p'), { x: i % 2 ? 26 : -26, autoAlpha: 0, duration: .9, stagger: .08, ease: 'expo.out' }, .1)
              .from(sc.querySelectorAll('.kp-board .kp-brk i'), { scale: 0, autoAlpha: 0, duration: .9, stagger: .05, ease: 'expo.out' }, 0)
              .fromTo(svg.querySelectorAll('[pathLength]'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.4, stagger: .04, ease: 'power2.inOut' }, .15)
              .from(svg.querySelectorAll('.kp-b-f'), { scale: 0, transformOrigin: '50% 50%', duration: .5, stagger: .06, ease: 'back.out(3)' }, .9);
            if (i === 0) tl.from(svg.querySelectorAll('.kp-b-1, .kp-b-2, .kp-b-3'), { x: function (k) { return (k - 1) * -60; }, y: function (k) { return (k - 1) * -24; }, duration: 1.2, ease: 'expo.inOut' }, .3);
            if (i === 1) tl.from(svg.querySelectorAll('.kp-b-camA, .kp-b-camB'), { rotation: function (k) { return k ? 24 : -24; }, svgOrigin: '250 120', duration: 1.4, ease: 'expo.inOut' }, .5)
                           .from(svg.querySelectorAll('.kp-b-cone'), { autoAlpha: 0, duration: .8 }, .7);
            if (i === 2) tl.from(svg.querySelector('.kp-b-key'), { autoAlpha: 0, duration: .9, ease: 'steps(5)' }, .7).from(svg.querySelector('.kp-b-fill'), { autoAlpha: 0, duration: .6 }, 1.1);
            if (i === 3) tl.fromTo(svg.querySelector('.kp-b-head'), { x: 0 }, { x: 220, duration: 2.2, ease: 'power1.inOut' }, .8).from(svg.querySelector('.kp-b-wheel'), { rotation: -140, svgOrigin: '410 128', duration: 1.6, ease: 'expo.out' }, 1);
          });
        });

        /* 04 Hareket: ritim çubukları videonun ışık eğrisinden yükselir */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          var bars = q('.kp-rh__bars rect');
          gsap.from(bars, { scaleY: 0, transformOrigin: '50% 100%', duration: .7, ease: 'power3.out', stagger: { each: .006, from: 'start' }, scrollTrigger: { trigger: one('.kp-rh'), start: 'top 92%', once: true } });
          gsap.from(q('.kp-brk--mon i'), { scale: 0, autoAlpha: 0, duration: 1, stagger: .05, ease: 'expo.out', scrollTrigger: { trigger: one('.kp-mon__screen'), start: 'top 80%', once: true } });
          gsap.from(q('.kp-chap'), { autoAlpha: 0, x: 20, duration: .7, stagger: .05, ease: 'expo.out', scrollTrigger: { trigger: one('.kp-chaps'), start: 'top 85%', once: true } });
        });

        /* 05 Formatlar: kadraj değişiminde rehber çizgiler yeniden çizilir */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          var fr = one('.kp-fmt__frame');
          self._fmt.onSet = function (i) {
            var g = fr.querySelector('.g-' + FORMATS[i].g);
            if (g) gsap.fromTo(g, { autoAlpha: 0 }, { autoAlpha: 1, duration: .6, delay: .5, overwrite: true });
            var mp = fr.querySelector('.g-mp'); if (FORMATS[i].g === 'motion') gsap.fromTo(mp, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.2, delay: .6, ease: 'power2.inOut' });
            gsap.fromTo(q('.kp-fmt__t, .kp-fmt__d'), { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .6, stagger: .05, ease: 'expo.out', overwrite: true });
          };
          gsap.from(q('.kp-brk--fmt i'), { scale: 0, autoAlpha: 0, duration: 1, stagger: .05, ease: 'expo.out', scrollTrigger: { trigger: one('.kp-fmt__box'), start: 'top 80%', once: true } });
          gsap.from(q('.kp-fmt__btn'), { autoAlpha: 0, x: 18, duration: .7, stagger: .05, ease: 'expo.out', scrollTrigger: { trigger: one('.kp-fmt__list'), start: 'top 88%', once: true } });
          return function () { self._fmt.onSet = null; gsap.set(q('.kp-fmt__g g, .kp-fmt__t, .kp-fmt__d'), { clearProps: 'opacity,visibility,transform' }); };
        });

        /* 06 Felsefe: siyah bantlar kadrajı sinemaskopa kapatır; "inşa ediyoruz" harfleri üst üste oturarak kurulur */
        mm.add({ d: '(prefers-reduced-motion: no-preference) and (min-width: 768px)', m: '(prefers-reduced-motion: no-preference) and (max-width: 767px)' }, function (ctx) {
          var a = ctx.conditions.d ? 1 : .5, sec = one('.kp-phil');
          var tl = gsap.timeline({ scrollTrigger: { trigger: sec, start: 'top 82%', end: 'center 50%', scrub: 1, invalidateOnRefresh: true } });
          tl.fromTo(q('.kp-lb', sec), { scaleY: 0 }, { scaleY: 1, ease: 'power2.inOut', duration: .35 }, 0)
            .fromTo(q('.kp-pl--a .kp-w', sec), { x: function (k) { return (k ? 1 : -1) * innerWidth * .12 * a; }, opacity: .2 }, { x: 0, opacity: 1, duration: .35, ease: 'power2.out' }, .05)
            .fromTo(q('.kp-pl--b .kp-w', sec), { x: function () { return innerWidth * .16 * a; }, opacity: .2 }, { x: 0, opacity: 1, duration: .35, ease: 'power2.out' }, .12)
            .fromTo(q('.kp-pl--c .kp-ch', sec), { yPercent: -120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .25, stagger: .025, ease: 'power3.in' }, .42)
            .fromTo(q('.kp-pl--d .kp-ch', sec), { yPercent: -160, opacity: 0, rotation: function (k) { return ((k * 37) % 9 - 4) * 3 * a; } }, { yPercent: 0, opacity: 1, rotation: 0, duration: .3, stagger: .022, ease: 'bounce.out' }, .58);
          gsap.from(one('.kp-phil__p'), { autoAlpha: 0, y: 20, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: one('.kp-phil__p'), start: 'top 92%', once: true } });
        });

        /* 07 Final: kapanış kadrajı çizilir, zaman kodu son kareye sayar */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          var sec = one('.kp-fin'), tcEl = one('.kp-fin__tc'), o = { t: 0 };
          var tl = gsap.timeline({ scrollTrigger: { trigger: sec, start: 'top 72%', once: true } });
          tl.from(q('.kp-brk--fin i'), { scale: 0, autoAlpha: 0, x: function (k) { return [-60, 60, 60, -60][k]; }, y: function (k) { return [-40, -40, 40, 40][k]; }, duration: 1.3, stagger: .04, ease: 'expo.out' }, 0)
            .from(one('.kp-fin__q'), { autoAlpha: 0, y: 16, duration: .8, ease: 'expo.out' }, .2)
            .from(q('.kp-fin__sub, .kp-fin__cta'), { autoAlpha: 0, y: 20, duration: .9, ease: 'expo.out', stagger: .1 }, .8)
            .to(o, { t: VIDEO_DUR, duration: 1.6, ease: 'power2.out', onUpdate: function () { tcEl.textContent = tc(o.t); } }, .3);
          return function () { tcEl.textContent = tc(VIDEO_DUR); };
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
      (this._cleanups || []).forEach(function (f) { try { f(); } catch (e) {} });   // videolar durdurulur ve kaynakları bırakılır
      this._cleanups = [];
      if (this._fcOwned) document.body.classList.remove('n1-inner-fc-enabled');
      this._fcOwned = false; this._header = null; this._vids = null; this._fmt = null;
      this.replaceChildren();
      var st = document.getElementById('n1-kp2-style'); if (st && !document.querySelector(TAG)) st.remove();
    }
  }
  customElements.define(TAG, KreatifProduksiyonV2);
})();
