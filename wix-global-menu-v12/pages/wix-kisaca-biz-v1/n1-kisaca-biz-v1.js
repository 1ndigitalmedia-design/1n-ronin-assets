/* GLOBAL MENU V1.2 (wix-global-menu-v12/pages) — kaynak: wix-sitewide-mobile-fix-2026-11-26/wix-kisaca-biz-v1/n1-kisaca-biz-v1.js @f97db8ed. Değişen tek şey: Header/markup adresleri (v12) ve Hizmetler satırı. */
/*!
 * n1-kisaca-biz-v1 — 1N Digital Media · Kısaca Biz (/kisaca-biz)
 * Wix Studio Custom Element · Tag name: n1-kisaca-biz-v1 · Kaynak: bu dosyanın HTTPS adresi
 *
 * Mimari
 *  - Light DOM (paylaşılan Header/Footer modülleri light DOM'da çalışır).
 *  - Sayfaya özel bütün CSS bu dosyada ve `n1-kisaca-biz-v1` etiketiyle kapsamlıdır.
 *  - Header, Footer ve WhatsApp/Yukarı Çık değiştirilmez: ana sayfanın onaylı v6.48 kaynaklarından
 *    (n1-site-markup-v648.js içindeki işaretleme + modül dosyaları) aynen yüklenir.
 *    Yalnızca bu sayfaya özel menü bağlantıları JSON verisinde güncellenir (logo ve marka: "/", Hizmetler: "/#hizmetler-ozet").
 *  - Tablet ve mobil Header/Footer düzeni: Stüdyo Hikâyesi'nde onaylanan ortak iç sayfa CSS'i
 *    (n1-inner-responsive-v6.css) + bu dosyadaki aynı kurallar `n1-kisaca-biz-v1` kapsamında.
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
  var TAG = 'n1-kisaca-biz-v1';
  if (customElements.get(TAG)) return;

  /* ---------- Onaylı kaynaklar (commit'e sabitlenmiş) ---------- */
  var CDN = 'https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@';
  var C648 = 'd24fa373d6d76c0218b3f3b77897a8c2ace04e5e';
  var CM12 = '73c26a633831fbd659138d4b070b110e558db0d8';   /* GLOBAL MENU V1.2: Hizmetler alt menülü markup + header v12 */
  var CRESP = '09612df97e85978976d13edbd79dad0adcc1d1f1';
  var PATHS = {
    markup: CM12 + '/wix-global-menu-v12/site/n1-site-markup-v12.js',
    header: CM12 + '/wix-global-menu-v12/modules/n1-header-v12.js',
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

  /* Mobile/tablet reliability hotfix — preserve desktop rendering. */
  function n1MobileRepair(){return matchMedia('(max-width: 900px), (max-width: 1366px) and (hover: none) and (pointer: coarse)').matches;}
  function n1Deadline(p,ms,label){return new Promise(function(ok,fail){var t=setTimeout(function(){fail(new Error(label+' timeout'));},ms);Promise.resolve(p).then(function(x){clearTimeout(t);ok(x);},function(e){clearTimeout(t);fail(e);});});}
  function n1Optional(p,label){return n1MobileRepair()?n1Deadline(p,5000,label).catch(function(e){console.warn('[1N mobile]',label,e);}):p;}
  function n1Listen(owner,el,type,fn,opt){el.addEventListener(type,fn,opt);owner._cleanups.push(function(){el.removeEventListener(type,fn,opt);});}
  function n1MediaRatio(el){if(!el||!el.isConnected||!el.getClientRects().length||el.closest('[hidden],[data-off]'))return 0;var r=el.getBoundingClientRect();return Math.max(0,Math.min(r.right,innerWidth)-Math.max(0,r.left))*Math.max(0,Math.min(r.bottom,innerHeight)-Math.max(0,r.top))/Math.max(1,r.width*r.height);}
  function n1Play(v){if(!n1MobileRepair())return v.play();if(v._n1Pending)return v._n1Pending;if(!v.paused&&!v.ended)return Promise.resolve();var p;try{p=v.play();}catch(e){v._n1Blocked=e.name==='NotAllowedError';return Promise.reject(e);}if(!p||!p.then)return p;v._n1Pending=p;p.then(function(){v._n1Pending=null;v._n1Blocked=false;},function(e){v._n1Pending=null;v._n1Blocked=!!e&&e.name==='NotAllowedError';});return p;}
  function n1MediaRecovery(owner,list,eligible,choose){
    if(!n1MobileRepair())return;
    function scan(blockedOnly){
      if(!owner._on||!owner.isConnected||document.hidden||matchMedia('(prefers-reduced-motion: reduce)').matches||(navigator.connection&&navigator.connection.saveData))return;
      var best=null,max=0;list.forEach(function(p){var v=p.v,ratio=n1MediaRatio(p.fig||p.box||(p.scr&&p.scr.parentNode)||v);
      if(!blockedOnly){if('visible'in p)p.visible=ratio>=.08;if('ratio'in p)p.ratio=ratio;if(ratio<.08&&!v.paused){v.autoplay=false;v.pause();}}
      if(ratio>=.08&&ratio>max&&eligible(p)&&v.paused&&(!blockedOnly||v._n1Blocked)){best=p;max=ratio;}});
      if(best){best.v._n1Blocked=false;if(choose&&!blockedOnly)choose();else best.play();}
    }
    n1Listen(owner,window,'pageshow',function(e){if(e.persisted)scan(false);});
    function gesture(e){if(!e.isTrusted||(e.target.closest&&e.target.closest('a,button,input,textarea,select,[role="button"]')))return;scan(true);}
    n1Listen(owner,document,'touchend',gesture,true);n1Listen(owner,document,'click',gesture,true);
  }
  function n1SpecialRecovery(owner,v,box,allowed,play,pause){
    if(!n1MobileRepair())return;
    n1Listen(owner,window,'pageshow',function(e){if(!e.persisted)return;if(n1MediaRatio(box)<.08){pause();return;}if(allowed()&&v.paused)play();});
    function gesture(e){if(!e.isTrusted||(e.target.closest&&e.target.closest('a,button,input,textarea,select,[role="button"]')))return;if(v._n1Blocked&&v.paused&&n1MediaRatio(box)>=.08&&allowed()){v._n1Blocked=false;play();}}
    n1Listen(owner,document,'touchend',gesture,true);n1Listen(owner,document,'click',gesture,true);
  }
  function loadJs(src, ready, fresh) {
    var task=loadJsOriginal(src,ready,fresh);if(!n1MobileRepair())return task;
    return n1Deadline(task,10000,'JS '+src).catch(function(e){if(ready&&ready())return;if(ready&&/n1-header-v12\.js|n1-site-markup-v12\.js/.test(src))return n1Deadline(loadJsOriginal(src,ready,true),8000,'retry '+src);throw e;});
  }
  function loadJsOriginal(src, ready, fresh) {
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
/* 03 — Tek ekip, ortak bakış */
'<section class="kb-sec kb-team" aria-labelledby="kb-team-t">' +
  '<div class="kb-wrap kb-grid kb-head">' +
    '<p class="kb-label" data-kb="fade">Tek ekip, ortak bakış</p>' +
    '<h2 class="kb-h2" id="kb-team-t" data-kb="lines">' + ln('Tek ekip.') + ln('Ortak bakış.') + '</h2>' +
  '</div>' +
  '<ul class="kb-wrap kb-principles" data-kb="cards">' +
    '<li class="kb-pr">' + glyph('think') + '<h3>Birlikte düşünürüz</h3><p>Fikir tek bir masada doğar. Strateji, kreatif ve teknoloji ilk günden aynı odadadır.</p></li>' +
    '<li class="kb-pr">' + glyph('merge') + '<h3>Disiplinleri birleştiririz</h3><p>Uzmanlıkları sırayla değil, birlikte çalıştırırız. Böylece iş parçalara bölünmez.</p></li>' +
    '<li class="kb-pr">' + glyph('grow') + '<h3>Fikri geliştiririz</h3><p>İlk fikirle yetinmeyiz. Dener, sadeleştirir ve en güçlü hâline taşırız.</p></li>' +
    '<li class="kb-pr">' + glyph('learn') + '<h3>Sonuçlardan öğreniriz</h3><p>Yayına çıkan her işi izleriz; veriden aldığımızı bir sonraki fikre taşırız.</p></li>' +
  '</ul>' +
'</section>' +
/* 04 — Disiplinler arası üretim */
'<section class="kb-sec kb-disc-sec" aria-labelledby="kb-disc-t">' +
  '<div class="kb-wrap kb-grid kb-head">' +
    '<p class="kb-label" data-kb="fade">Disiplinler arası üretim</p>' +
    '<div class="kb-head__main">' +
      '<h2 class="kb-h2" id="kb-disc-t" data-kb="lines">' + ln('Yedi uzmanlık.') + ln('Tek bir düşünce.') + '</h2>' +
      '<p class="kb-head__lede" data-kb="fade">Her alan diğerini besler. Bir alanı seçin, en yakın çalıştığı disiplinleri görün.</p>' +
    '</div>' +
  '</div>' +
  '<div class="kb-wrap kb-wheel" data-kb="wheel">' +
    '<div class="kb-wheel__stage">' + wheelSvg() +
      '<ul class="kb-wheel__list" aria-label="Disiplinler">' + wheelButtons() + '</ul>' +
    '</div>' +
    '<div class="kb-wheel__detail" aria-live="polite">' +
      '<p class="kb-wheel__k">Seçili disiplin</p>' +
      '<h3 class="kb-wheel__name"></h3>' +
      '<p class="kb-wheel__desc"></p>' +
      '<p class="kb-wheel__rel"></p>' +
      '<a class="kb-link kb-wheel__go" href="/kreatif-produksiyon"><span>Disiplini incele</span>' + ARROW + '</a>' +
    '</div>' +
  '</div>' +
'</section>' +
/* 05 — Düşünce ve üretim */
'<section class="kb-sec kb-impact" aria-labelledby="kb-impact-t">' +
  '<div class="kb-wrap">' +
    '<p class="kb-label" data-kb="fade">Düşünce ve üretim</p>' +
    '<h2 class="kb-impact__title" id="kb-impact-t">' +
      '<span class="kb-impact__a" data-kb="impact-a">' + ln('Fikirden') + '</span>' +
      '<span class="kb-impact__line" aria-hidden="true"><i></i></span>' +
      '<span class="kb-impact__b" data-kb="impact-b">' + ln('gerçek etkiye.') + '</span>' +
    '</h2>' +
    '<p class="kb-impact__text" data-kb="fade">Fikir, ancak gerçek dünyada bir karşılık bulduğunda değer kazanır. Bizim işimiz, ikisi arasındaki mesafeyi kısaltmak.</p>' +
  '</div>' +
'</section>' +
/* 06 — Ekip olarak yaklaşımımız */
'<section class="kb-sec kb-culture" aria-labelledby="kb-culture-t">' +
  '<div class="kb-wrap kb-grid kb-head">' +
    '<p class="kb-label" data-kb="fade">Ekip olarak yaklaşımımız</p>' +
    '<h2 class="kb-h2" id="kb-culture-t" data-kb="lines">' + ln('Cesaret, merak') + ln('ve birlikte üretmek.') + '</h2>' +
  '</div>' +
  '<div class="kb-wrap kb-culture__grid">' +
    '<div class="kb-culture__art" data-kb="field">' + dotField() + '</div>' +
    '<dl class="kb-values" data-kb="cards">' +
      '<div class="kb-val"><dt>Yaratıcı cesaret</dt><dd>Alışılmış olanı sorgulamaktan çekinmeyiz.</dd></div>' +
      '<div class="kb-val"><dt>Sürekli öğrenme</dt><dd>Yeni araçları, yeni yöntemleri ve yeni fikirleri her gün deneriz.</dd></div>' +
      '<div class="kb-val"><dt>Birlikte üretmek</dt><dd>En iyi fikir, kimin söylediğine göre değil, işe ne kattığına göre seçilir.</dd></div>' +
      '<div class="kb-val"><dt>Açık iletişim</dt><dd>Markalarla aynı dili konuşur, süreci şeffaf yürütürüz.</dd></div>' +
    '</dl>' +
  '</div>' +
'</section>' +
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

  /* ---------- Sayfaya özel CSS (yalnızca n1-kisaca-biz-v1 kapsamında) ---------- */
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
      var n1MountEpoch = this._n1Epoch = (this._n1Epoch || 0) + 1;
      this._mount().catch((e) => {
        if(n1MobileRepair()&&(!this._on||this._n1Epoch!==n1MountEpoch))return;
        console.error('[n1-kisaca-biz]', e);
        if (!this.querySelector('main.kb')) this.innerHTML = '<p style="padding:40px 5%;color:#ECEBE5;font:16px Barlow,Arial,sans-serif">Kısaca Biz yüklenemedi. Lütfen sayfayı yenileyin.</p>';
      });
    }

    async _mount() {
      var n1M=n1MobileRepair(), n1Epoch=this._n1Epoch;
      var n1Alive=()=>this._on&&(!n1M||(this.isConnected&&this._n1Epoch===n1Epoch));
      var self = this, url = this._url;
      // 1) Sayfa CSS'i ve içerik hemen (ağ beklemeden)
      if (!document.getElementById('n1-kb-style')) {
        var st = document.createElement('style'); st.id = 'n1-kb-style'; st.textContent = CSS; document.head.appendChild(st);
      }
      this.innerHTML = '<div id="ust" style="height:0"></div>' + markup();
      this._wheel();
      this._anchors();

      // 2) Ortak kaynaklar paralel
      var fonts = loadCss(FONTS).catch(function (e) { console.warn('[n1-kisaca-biz] Font yüklenemedi, yedek font kullanılıyor', e); });
      var shared = Promise.all([n1Optional(loadCss(url('footerCss')),'footer CSS'), n1Optional(loadCss(url('responsive')),'responsive CSS'), loadJs(url('markup'), function () { return !!window.N1_SITE_MARKUP; })]);
      await shared;
      if (!n1Alive()) return;

      // 3) Header / Footer / WhatsApp — onaylı v6.48 işaretlemesinden
      var tpl = document.createElement('template');
      tpl.innerHTML = String(window.N1_SITE_MARKUP || '').split('{{ASSETS}}').join(url('assets'));
      var hdr = tpl.content.querySelector('n1-header'), ft = tpl.content.querySelector('[data-n1-footer]'), fc = tpl.content.querySelector('n1-floating-controls');
      if (!hdr || !ft) throw new Error('Onaylı Header/Footer işaretlemesi bulunamadı');
      var main = this.querySelector('main.kb');

      function n1EnsureHeader(){
        if(!n1Alive()||(self._header&&self._header.isConnected))return;
      var otherHeader = [].some.call(document.querySelectorAll('n1-header'), function (h) { return !self.contains(h)&&(!n1M||(h.isConnected&&h.getClientRects().length>0)); });
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
              if (it.href === '#hizmetler-ozet' && !(it.sub || []).length) { it.href = '/#hizmetler-ozet'; delete it.match; }   /* V1.2: Hizmetler artık alt menü (markup v12); eski veriyle uyum için yalnızca alt menüsüz çapa düzeltilir */
            });
            js.textContent = JSON.stringify(menu);
          } catch (e) { console.warn('[n1-kisaca-biz] Menü verisi okunamadı; onaylı veri olduğu gibi kullanılıyor', e); }
        }
        self.insertBefore(header, main);
        self._header = header;
      }
      }
      async function n1InitHeader(){
        if(!n1Alive())return;n1EnsureHeader();
      if (self._header) {
        if (!customElements.get('n1-header')) await loadJs(url('header'), function () { return !!customElements.get('n1-header'); });
        if(!n1Alive()||!self._header||!self._header.isConnected)return;
        if(!self._header.panel&&self._header.connectedCallback)self._header.connectedCallback();
        if(self._header.panel&&!self._header.panel.isConnected)document.body.appendChild(self._header.panel);
        if (self._header.panel) { self._header.panel.classList.add('n1-inner-panel'); self._header.panel.setAttribute('data-n1-kb', ''); }
      }
      }
      n1EnsureHeader();
      if(n1M){
        var n1HeaderBusy=false;
        function recoverHeader(){
          if(n1HeaderBusy||!n1Alive())return;
          if(self._header&&self._header.isConnected&&self._header.panel&&self._header.panel.isConnected)return;
          n1HeaderBusy=true;n1InitHeader().catch(function(e){console.warn('[1N mobile] header recovery',e);}).then(function(){n1HeaderBusy=false;});
        }
        [100,400,1000,2500].forEach(function(ms){var t=setTimeout(recoverHeader,ms);self._cleanups.push(function(){clearTimeout(t);});});
        n1Listen(self,window,'pageshow',function(e){if(e.persisted){recoverHeader();if(window.ScrollTrigger)requestAnimationFrame(function(){if(n1Alive())window.ScrollTrigger.refresh();});}});
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
      if(n1M)await n1InitHeader().catch(function(e){console.warn('[1N mobile] early header',e);});
      if(!n1Alive())return;
      await n1Optional(fonts,'fonts');
      if (!window.gsap) await loadJs(GSAP, function () { return !!window.gsap; }).catch(function (e) { console.warn('[n1-kisaca-biz] GSAP yüklenemedi; içerik animasyonsuz gösterilir', e); });
      if (window.gsap && !window.ScrollTrigger) await loadJs(ST, function () { return !!window.ScrollTrigger; }).catch(function (e) { console.warn('[n1-kisaca-biz] ScrollTrigger yüklenemedi', e); });
      if (!n1Alive()) return;
      await n1Optional(loadJs(url('links'), null, true),'links');
      if(!n1Alive())return;
      if (!n1M) {
      if (this._header) {
        if (!customElements.get('n1-header')) await loadJs(url('header'), function () { return !!customElements.get('n1-header'); });
        else if (!this._header.panel && this._header.connectedCallback) this._header.connectedCallback();
        if (this._header.panel) { this._header.panel.classList.add('n1-inner-panel'); this._header.panel.setAttribute('data-n1-kb', ''); }
      }
      } else await n1InitHeader().catch(function(e){console.warn('[1N mobile] header',e);});
      if (!n1Alive()) return;
      await loadJs(url('footerJs'), null, true);
      if (this._fcOwned && !customElements.get('n1-floating-controls')) await loadJs(url('floating'), function () { return !!customElements.get('n1-floating-controls'); });
      var layer = document.querySelector('body > .n1fc:last-of-type'); if (this._fcOwned && layer) layer.setAttribute('data-n1-kb', '');
      if (!n1Alive()) return;
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
      this._n1Epoch=(this._n1Epoch||0)+1;
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
      var st = document.getElementById('n1-kb-style'); if (st && !document.querySelector(TAG)) st.remove();
    }
  }
  customElements.define(TAG, KisacaBiz);
})();