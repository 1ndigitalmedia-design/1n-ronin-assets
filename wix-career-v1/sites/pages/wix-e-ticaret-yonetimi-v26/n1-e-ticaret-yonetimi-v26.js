/* KARİYER V1 (wix-career-v1/sites) — kaynak: wix-mobile-performance-v14/pages/wix-e-ticaret-yonetimi-v25/n1-e-ticaret-yonetimi-v25.js. Değişen tek şey: Header v13 (İnsan Kaynakları bağlantı + ayrı alt menü düğmesi) ve site işaretlemesi v15 (kariyer menüsü) adresleri. */
/* MOBILE PERFORMANCE V1.4 — n1-e-ticaret-yonetimi-v25.js = v24 (WebKit filtre düzeltmesi korunur) + telefon/tablette ikincil videolar (mağaza, büyüme) yerine WebP kare; belge yaşam döngüsü; içerik görselleri Wix boyutlandırma srcset. Tag name DEĞİŞMEDİ: n1-e-ticaret-yonetimi-v23. */
/* GLOBAL STABILITY V1.3 — n1-e-ticaret-yonetimi-v24.js = wix-global-menu-v12/pages/wix-e-ticaret-yonetimi-v23/n1-e-ticaret-yonetimi-v23.js @39f762f ile birebir aynı; TEK fark :491 satırı (.ec-line.is-on .ec-line__img filtre hedefi). Etiket (Tag name) DEĞİŞMEDİ: n1-e-ticaret-yonetimi-v23. */
/* GLOBAL MENU V1.2 (wix-global-menu-v12/pages) — kaynak: wix-sitewide-mobile-fix-2026-11-26/wix-e-ticaret-yonetimi-v23/n1-e-ticaret-yonetimi-v23.js @f97db8ed. Değişen tek şey: Header/markup adresleri (v12) ve Hizmetler satırı. */
/*!
 * n1-e-ticaret-yonetimi-v23 — 1N Digital Media · E-Ticaret Yönetimi (/e-ticaret-yonetimi) · Creative Commerce Experience
 * Wix Studio Custom Element · Tag name: n1-e-ticaret-yonetimi-v23 · Kaynak: bu dosyanın HTTPS adresi
 *
 * Fikir: sayfa bir alışverişin yolunu izler. Vitrin (hero), mağazanın kepengi açılır (deneyim), sipariş özeti
 * gibi okunan hizmet kalemleri (kapsam), ödeme adımlarına benzeyen akış (ziyaretten satışa), içerik, performans ve
 * büyümenin tek kadrajda buluştuğu sahne, dağınık harflerin sisteme dizildiği manifesto, final.
 *
 * Mimari (Kısaca Biz V3 / Kreatif Prodüksiyon V22 ile aynı entegrasyon yöntemi):
 *  - Light DOM: onaylı v6.48 Header + menü, Footer, WhatsApp / Yukarı Çık modülleri aynen, commit'e sabit adreslerden yüklenir.
 *    Sayfada başka bir Header / Footer / kontrol katmanı varsa ikincisi oluşturulmaz.
 *  - Sayfaya özel CSS yalnızca n1-e-ticaret-yonetimi-v2 etiketi kapsamında (menü panelinde yalnızca [data-n1-ec] işaretli panel).
 *  - GSAP 3.13.0 + ScrollTrigger yalnızca sayfada yoksa yüklenir. Pin / spacer yok. Animasyonlar gsap.context + matchMedia içinde;
 *    bileşen kaldırılınca tetikleyiciler, zaman çizelgeleri, gözlemciler, zamanlayıcılar ve videolar temizlenir.
 *  - İçerik CSS'te gizlenmez: GSAP yüklenemezse veya prefers-reduced-motion açıksa sayfa görünür ve kullanılabilir.
 *
 * Videolar: kullanıcı tarafından sağlanan Hero 720p, mağaza deneyimi 480p, Büyüme 720p.
 *  - Aynı anda yalnızca biri oynar; görünmeyen video durur. Destek videoları yaklaşmadan indirilmez.
 *  - Yalnızca sağlanan çözünürlükler istenir; mevcut olmayan 480/720p varyantı tahmin edilmez.
 *  - Reduced-motion ve veri tasarrufunda otomatik oynatma yok. Video hatasında fallback alanı korunur.
 *
 * İsteğe bağlı öznitelik (yalnızca Wix dışı önizleme için): deps-base="<klasör>/"
 */
(function () {
  'use strict';
  var TAG = 'n1-e-ticaret-yonetimi-v23';
  var STYLE_ID = 'n1-ec23-style';
  if (customElements.get(TAG)) return;

  /* ---------- Onaylı kaynaklar (commit'e sabit) ---------- */
  var CDN = 'https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@';
  var C648 = 'd24fa373d6d76c0218b3f3b77897a8c2ace04e5e';
  var CM12 = '162599ec580db98d848cf6670bcde7ee30bf97f5';   /* GLOBAL MENU V1.2: Hizmetler alt menülü markup + header v12 */
  var CCR = 'f40415a3785e0172bdcc58189479253ff10cd17e';   /* KARİYER V1: header v13 + site işaretlemesi v15 (İnsan Kaynakları menüsü) */
  var CRESP = '09612df97e85978976d13edbd79dad0adcc1d1f1';
  var PATHS = {
    markup: CCR + '/wix-career-v1/site/n1-site-markup-v15.js',
    header: CCR + '/wix-career-v1/modules/n1-header-v13.js',
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

  /* ---------- Medya ---------- */
  var VBASE = 'https://video.wixstatic.com/video/6dbf5e_';
  function vset(id) { return { hd: VBASE + id + '/720p/mp4/file.mp4', sd: VBASE + id + '/480p/mp4/file.mp4' }; }
  var V_HERO = '3c7918f906c1478f9149099d6d398635';   // Hero: kullanıcının ilettiği yeni 720p video
  var V_STORE = '382aee7841704e1c9e54539673ff9f63';  // Deneyim altı sol: 480p video
  var V_TRIO = 'efaf0298818c43b19c85c0c37bdb7f4a';   // İçerik/Büyüme/Performans ortası: 720p video
  function exactVideo(id, quality) { var src = VBASE + id + '/' + quality + '/mp4/file.mp4'; return { hd: src, sd: src }; }
  function poster(id, w) { return 'https://static.wixstatic.com/media/6dbf5e_' + id + 'f000.jpg/v1/fill/w_' + w + ',h_' + Math.round(w * 16 / 9) + ',q_80/e-ticaret-yonetimi.jpg'; }
  function pickVideo(set) {
    var c = navigator.connection || {};
    if (c.saveData || /(^|-)2g$/.test(c.effectiveType || '') || matchMedia('(max-width:767px)').matches) return set.sd;
    return set.hd;
  }
  var IMG_BASE = 'https://static.wixstatic.com/media/6dbf5e_';
  var USER_MEDIA = {
    experience: IMG_BASE + '736b08d9f4c148e4b78def3e47ecfd39~mv2.png',
    right: IMG_BASE + '8ecaf4f6560a46adb6a404eb53575d3d~mv2.png',
    content: IMG_BASE + '568ef15bfc7e44b68318936d0c4d656f~mv2.jpg',
    performance: IMG_BASE + '142b71494f64426ab1f11eea90de5652~mv2.png',
    final: IMG_BASE + 'e512ee571d3942af8a3cc329520415bc~mv2.png'
  };
  /* ---------- Uçtan Uca Yönetim: onaylı 8 kategori görseli ---------- */
  var SCOPE_MEDIA = {
    store: IMG_BASE + '135d1b54f3fa47bd96f2385aa7b50ec1~mv2.png',
    category: IMG_BASE + '49a60c059443481d8168a520ef283db5~mv2.png',
    content: IMG_BASE + 'ec518ffa738d4a3889ed913a394eff77~mv2.png',
    campaign: IMG_BASE + '5c3c145608594d98aa7dc6e9cb2432d6~mv2.png',
    experience: IMG_BASE + '74c7472360b748ee9824285904db863f~mv2.png',
    conversion: IMG_BASE + '5bd6bee681fd4cb18b5d7d26138df471~mv2.png',
    performance: IMG_BASE + 'adbb40898f2f46ceb5a8c2c9eafc7dae~mv2.png',
    growth: IMG_BASE + '599a31ec526143638ed02477072ab7aa~mv2.png'
  };
  // V1.4: özgün boyutlu PNG/JPG yerine Wix görsel hizmetinden ekran boyutuna uygun sürüm (fit: kırpmasız, büyütmesiz; enc_auto → tarayıcıya göre WebP/AVIF)
  function remoteSet(url) { var ext = /\.jpe?g$/i.test(url) ? 'jpg' : 'png'; return [240, 480, 960, 1440].map(function (w) { return url + '/v1/fit/w_' + w + ',h_' + (w * 3) + ',q_86,enc_auto/e-ticaret-yonetimi.' + ext + ' ' + w + 'w'; }).join(', '); }
  function remotePic(url, cls, alt, sizes, pos, eager) {
    var ext = /\.jpe?g$/i.test(url) ? 'jpg' : 'png';
    return '<img class="' + cls + '" src="' + esc(url + '/v1/fit/w_960,h_2880,q_86,enc_auto/e-ticaret-yonetimi.' + ext) + '" srcset="' + esc(remoteSet(url)) + '" alt="' + esc(alt) + '" sizes="' + esc(sizes) + '"' +
      (eager ? '' : ' loading="lazy"') + ' decoding="async"' + (pos ? ' style="object-position:' + esc(pos) + '"' : '') + '>';
  }
  // fit: genişlik w, yükseklik serbest (h = 3w); srcset genişlikleri gerçek genişlikle örtüşür
  function img(id, w) { return IMG_BASE + id + '~mv2.jpg/v1/fit/w_' + w + ',h_' + (w * 3) + ',q_82,enc_auto/e-ticaret-yonetimi.jpg'; }
  function srcset(id, ws) { return (ws || [480, 800, 1200, 1800]).map(function (w) { return img(id, w) + ' ' + w + 'w'; }).join(', '); }
  function pic(id, cls, alt, sizes, pos, opt) {
    opt = opt || {};
    return '<img class="' + cls + '" src="' + img(id, opt.w || 800) + '" srcset="' + srcset(id, opt.ws) + '" sizes="' + sizes + '" alt="' + alt + '"' +
      (opt.eager ? '' : ' loading="lazy"') + ' decoding="async"' + (pos ? ' style="object-position:' + pos + '"' : '') + '>';
  }
  // Görseller (orijinal boyutlar gerçek tarayıcıda okundu)
  var IM = {
    street: 'b3b2125719444da096612ae4b8dfcb51',    // 4794×2775 · taş sokakta küçük dükkân vitrini
    boutique: 'c24bf4f4914543beb24e3f5d0daada58',  // 3752×5628 · askılı butik içinde sohbet eden çift
    phone: '9d1227a52b1b42d09f282cdde3bcad81',     // 4480×6720 · sade duvar önünde mağaza ekranı açık telefon
    grid: '1be3beeb51de49babcc841299ef18802',      // 4000×6000 · dizüstünde ürün listesi, seçen el
    edit: '7aa4826b50954335922cc31837935904',      // 4000×6000 · dizüstünde görsel düzenleyen kadın
    pdp: 'bb2c4c6c0189438f8d531bf1cebd005a',       // 4016×6016 · telefonda ürün sayfası, arkada dizüstü
    pay: 'e1dc42dfee334ef6b841dd14ce5b7836',       // 6165×4110 · "Shop now" ekranı ve telefonda ödeme
    dash: '75cf07f63a874311a9f75297ff06345e',      // 6016×4016 · tablette analiz paneli, kahve
    report: 'ac2f9f39ca474cbb98b8163c605de39f'     // 4480×6720 · masada basılı pasta grafik raporu
  };

  /* ---------- Yardımcılar ---------- */

  /* Mobile/tablet reliability hotfix — preserve desktop rendering. */
  function n1MobileRepair(){return matchMedia('(max-width: 900px), (max-width: 1366px) and (hover: none) and (pointer: coarse)').matches;}

  /* ---------- V1.4 · cihaz profili, mobil sabit kareler, belge yaşam döngüsü (wix-mobile-performance-v14/RESOURCE_LIFECYCLE.md) ---------- */
  // Hafif profil = telefon ve tablet (iPad yatay, izleme dörtgenli iPad dahil; dokunmatik ekran her zaman vardır). Sayfa açılışında BİR KEZ belirlenir:
  // döndürme ya da pencere boyutu değişince medya yeniden seçilmez (yükleme/çözücü dalgalanması olmaz). Masaüstü (yalnız fare/izleme dörtgeni) her genişlikte videoyu korur.
  var N1_LITE = (function () { try { return matchMedia('(any-pointer: coarse) and (max-width: 1366px)').matches || matchMedia('(max-width: 900px) and (hover: none)').matches; } catch (e) { return false; } })();
  var N1_STILLS = 'https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@274e02bbda53e00b186c4d1b82349edc9dd32009/wix-mobile-performance-v14/media/stills/e-ticaret-yonetimi/';
  var N1_STILL = {"eticaret-store":{"w":720,"h":900,"ws":[480,720]},"eticaret-trio":{"w":720,"h":1280,"ws":[480,720]}};
  // İkincil video yerine yüksek kaliteli WebP kare (MOBILE_MEDIA_MAPPING.md). <video> öğesi hiç oluşturulmaz: istek, ön yükleme ve kod çözücü yok.
  function n1StillHtml(key, alt, cls, sizes, extra) {
    var s = N1_STILL[key], mid = s.ws.filter(function (w) { return w <= 960; }).pop() || s.ws[0];
    return '<img class="' + (cls || 'n1-still') + '" data-n1-still="' + key + '"' + (extra || '') + ' alt="' + (alt || '') + '" decoding="async" loading="lazy" width="' + s.w + '" height="' + s.h +
      '" src="' + N1_STILLS + key + '-' + mid + '.webp" srcset="' + s.ws.map(function (w) { return N1_STILLS + key + '-' + w + '.webp ' + w + 'w'; }).join(', ') + '" sizes="' + (sizes || '(max-width: 900px) 100vw, 60vw') + '">';
  }
  (function () {
    if (!N1_LITE || document.getElementById('n1-still-v14')) return;
    var s = document.createElement('style'); s.id = 'n1-still-v14';
    s.textContent = '.n1-still{position:absolute;inset:0;display:block;width:100%;height:100%;object-fit:cover;opacity:1;visibility:visible}';
    (document.head || document.documentElement).appendChild(s);
  })();
  // Belge yaşam döngüsü: sayfa gizlenirken (gezinme ya da BFCache) bu bileşenin videoları durdurulur ve kaynakları bırakılır (kod çözücü + arabellek);
  // BFCache dönüşünde yalnız bırakılanlar geri yüklenir, görünür ve oynuyor idiyse yeniden oynar. İdempotent: birden çok pagehide/pageshow güvenli.
  // Yalnız kendi kökündeki <video> öğelerine dokunur (Wix ve diğer bileşenler etkilenmez). Dinleyiciler bileşenin temizliğine (_cleanups) bağlıdır.
  function n1Life(owner) {
    if (owner._n1Life) return; owner._n1Life = true;
    var held = [];
    function release() {
      [].forEach.call(owner.querySelectorAll('video'), function (v) {
        if (v._n1Held) return; var src = v.getAttribute('src'); if (!src) return;
        v._n1Held = { src: src, play: !v.paused && !v.ended, t: v.currentTime || 0, preload: v.preload };
        try { v.pause(); } catch (e) {} v.removeAttribute('src'); try { v.load(); } catch (e) {}
        held.push(v);
      });
    }
    function restore(e) {
      if (!e.persisted) return;
      held.splice(0).forEach(function (v) {
        var h = v._n1Held; v._n1Held = null; if (!h || !v.isConnected || v.getAttribute('src')) return;
        v.preload = h.preload || 'metadata'; v.setAttribute('src', h.src);
        if (h.t > .05) v.addEventListener('loadedmetadata', function () { try { v.currentTime = h.t; } catch (x) {} }, { once: true });
        try { v.load(); } catch (x) {}
        if (!h.play) return;
        var go = function () { if (owner._on && owner.isConnected && !document.hidden && v.paused && n1MediaRatio(v) >= .08) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } };
        go(); v.addEventListener('canplay', go, { once: true });   // load() bekleyen play() sözünü iptal edebilir: hazır olunca bir kez daha
      });
    }
    n1Listen(owner, window, 'pagehide', release);
    n1Listen(owner, window, 'pageshow', restore, true);   // yakalama evresi: sayfanın kendi pageshow kurtarmasından ÖNCE kaynak geri gelir
    owner._cleanups.push(function () { owner._n1Life = false; held.length = 0; });
  }
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
    return n1Deadline(task,10000,'JS '+src).catch(function(e){if(ready&&ready())return;if(ready&&/n1-header-v13\.js|n1-site-markup-v15\.js/.test(src))return n1Deadline(loadJsOriginal(src,ready,true),8000,'retry '+src);throw e;});
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
  // İkonlar: tek 16'lık ızgara, 1.5 çizgi, aria-hidden
  var SV = ' viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" aria-hidden="true" focusable="false"';
  var I = {
    arrow: '<svg class="ec-ico"' + SV + '><path d="M4.5 11.5l7-7M5.5 4.5h6v6"/></svg>',
    down: '<svg class="ec-ico"' + SV + '><path d="M8 3v10M3.5 8.5L8 13l4.5-4.5"/></svg>',
    play: '<svg class="ec-ico ec-ico--play"' + SV + '><path d="M5 3.5v9l7-4.5z"/></svg>',
    pause: '<svg class="ec-ico ec-ico--pause"' + SV + '><path d="M5.5 3.5v9M10.5 3.5v9"/></svg>',
    check: '<svg class="ec-ico"' + SV + '><path d="M3 8.5l3 3 7-7"/></svg>'
  };
  function ln(t, cls) { return '<span class="ec-ln' + (cls ? ' ' + cls : '') + '"><span>' + t + '</span></span>'; }
  function chars(t, cls) { return '<span class="ec-chs' + (cls ? ' ' + cls : '') + '">' + Array.from(t).map(function (c) { return c === ' ' ? '<span class="ec-sp"> </span>' : '<span class="ec-ch">' + c + '</span>'; }).join('') + '</span>'; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }

  /* ---------- İçerik ---------- */
  var PATH = ['Vitrin', 'Kategori', 'Ürün', 'Sepet', 'Ödeme', 'Teslimat', 'Sadakat'];
  var FEEL = [
    { k: 'Görmeden önce', t: 'Markayı hisseder.' },
    { k: 'Sepete atmadan önce', t: 'Güven duyar.' },
    { k: 'Satın almadan önce', t: 'Deneyimle bağ kurar.' }
  ];
  // Sipariş özeti gibi okunan hizmet kalemleri. Sıralı bir süreç olmadıkları için numara yok; etiket kalemin alanını söyler.
  var LINES = [
    { tag: 'Vitrin', t: 'Mağaza kurgusu', d: 'Ana sayfadan koleksiyon sayfalarına kadar ziyaretçinin mağazada nasıl dolaşacağını planlarız.', url: SCOPE_MEDIA.store, pos: '30% 40%', alt: 'Mağaza kurgusu görseli' },
    { tag: 'Katalog', t: 'Ürün ve kategori yapısı', d: 'Ürün bilgisi, varyantlar ve kategori ağacı; aranan ürünün kolayca bulunacağı bir düzene oturur.', url: SCOPE_MEDIA.category, pos: '18% 38%', alt: 'Ürün ve kategori yapısı görseli' },
    { tag: 'İçerik', t: 'Görsel ve içerik yönetimi', d: 'Ürün fotoğrafı, açıklama metni ve banner aynı marka dilini konuşur; her yeni ürün bu dile uyarak yayına girer.', url: SCOPE_MEDIA.content, pos: '62% 40%', alt: 'Görsel ve içerik yönetimi görseli' },
    { tag: 'Takvim', t: 'Kampanya ve dönemsel iletişim', d: 'Sezon geçişlerini ve özel günleri önceden planlar, mağazayı, içeriği ve reklamı aynı takvime bağlarız.', url: SCOPE_MEDIA.campaign, pos: '48% 82%', alt: 'Kampanya ve dönemsel iletişim görseli' },
    { tag: 'Deneyim', t: 'Kullanıcı deneyimi', d: 'Mobilde rahat okunan sayfalar, anlaşılır filtreler, kısa yollar. Ziyaretçi aradığını düşünmeden bulmalı.', url: SCOPE_MEDIA.experience, pos: '44% 52%', alt: 'Kullanıcı deneyimi görseli' },
    { tag: 'Dönüşüm', t: 'Dönüşüm odaklı iyileştirme', d: 'Ziyaretin nerede yarım kaldığını izler, sepet ve ödeme adımlarını sürekli sadeleştiririz.', url: SCOPE_MEDIA.conversion, pos: '84% 50%', alt: 'Dönüşüm odaklı iyileştirme görseli' },
    { tag: 'Performans', t: 'Reklam ve performans entegrasyonu', d: 'Reklam hesapları, ölçüm altyapısı ve ürün katalogları birbirine bağlı çalışır; her harcama izlenebilir olur.', url: SCOPE_MEDIA.performance, pos: '64% 40%', alt: 'Reklam ve performans entegrasyonu görseli' },
    { tag: 'Büyüme', t: 'Sürdürülebilir büyüme', d: 'Kısa vadeli kampanyaları uzun vadeli bir planın parçası olarak kurar, büyümeyi tekrarlanabilir kılarız.', url: SCOPE_MEDIA.growth, pos: '50% 46%', alt: 'Sürdürülebilir büyüme görseli' }
  ];
  var STEPS = [
    { v: 'Dikkat çek', s: 'Dikkat', d: 'Doğru kitleye, doğru anda, markaya ait bir görüntüyle görünmek. Reklam ve içerik ilk teması aynı dille kurar.' },
    { v: 'Güven oluştur', s: 'Güven', d: 'Net ürün bilgisi, tutarlı görseller, açık teslimat ve iade koşulları. Güven, küçük ayrıntıların toplamıdır.' },
    { v: 'Deneyimi sadeleştir', s: 'Sadelik', d: 'Daha az tıklama, daha anlaşılır filtreler, mobilde rahat okunan sayfalar. Karar vermenin önündeki engeller kalkar.' },
    { v: 'Satın almayı kolaylaştır', s: 'Ödeme', d: 'Sepetten ödemeye kadar her adımı kısaltırız: gereksiz alanlar çıkar, uygun ödeme seçenekleri öne gelir.' },
    { v: 'Sadakat oluştur', s: 'Sadakat', d: 'Satış bittiğinde ilişki başlar. Sipariş sonrası iletişim, kampanya ritmi ve kişisel öneriler geri dönüşü besler.' }
  ];
  var TRIO = [
    { k: 'İçerik', d: 'Ürün fotoğrafından kampanya videosuna; marka dilini taşıyan, her mecranın ölçüsüne ve ritmine uygun içerik üretimi.' },
    { k: 'Performans', d: 'Reklam bütçesinin hangi üründe, hangi kitlede ve hangi mesajla karşılık bulduğunu ölçer, kararları buna göre veririz.' },
    { k: 'Büyüme', d: 'İçerik ve performans aynı hedefe baktığında büyüme tesadüf olmaktan çıkar; ölçülebilir ve tekrarlanabilir hâle gelir.' }
  ];
  var PRINCIPLES = [
    { t: 'Düzenli optimizasyon', d: 'Mağazayı yayına alıp bırakmayız; veriye bakar, küçük iyileştirmeleri düzenli aralıklarla hayata geçiririz.' },
    { t: 'Görsel tutarlılık', d: 'Ürün fotoğrafından banner\'a kadar her görsel aynı marka dilini konuşur.' },
    { t: 'Kampanya ritmi', d: 'Dönemsel kampanyaları bir takvim içinde planlar, mağazayı her döneme önceden hazırlarız.' },
    { t: 'Kategori ve koleksiyon mantığı', d: 'Ürünleri müşterinin düşündüğü gibi gruplarız; koleksiyonlar bir hikâye anlatır.' },
    { t: 'Satış odaklı deneyim', d: 'Her tasarım kararını, ziyaretçiyi satın almaya yaklaştırıp yaklaştırmadığına göre tartarız.' },
    { t: 'İçerik ve reklam uyumu', d: 'Reklamın vaat ettiği ile sayfanın gösterdiği aynı olur; tıklayan ziyaretçi aradığını bulur.' }
  ];

  function screen(id, label, eager, still) {
    if (N1_LITE && still) return '<div class="ec-screen">' + n1StillHtml(still, label, null, '(max-width:1024px) 60vw, 30vw') + '</div>';   // V1.4
    return '<div class="ec-screen">' +
      '<img class="ec-poster" alt="" decoding="async"' + (eager ? '' : ' loading="lazy"') + ' src="' + poster(id, 540) + '" srcset="' + poster(id, 360) + ' 360w, ' + poster(id, 540) + ' 540w, ' + poster(id, 720) + ' 720w" sizes="(max-width:767px) 62vw, (max-width:1024px) 40vw, 28vw">' +
      '<video class="ec-video" muted playsinline webkit-playsinline loop preload="none" aria-label="' + label + '"></video>' +
      '<span class="ec-screen__prog" aria-hidden="true"><i></i></span>' +
      '<p class="ec-screen__err" role="status"></p>' +
    '</div>' +
    '<button type="button" class="ec-play" aria-label="Videoyu duraklat" aria-pressed="false">' + I.pause + I.play + '</button>';
  }

  function markup() {
    var path = PATH.map(function (p, i) { return '<li class="ec-path__i' + (i === 0 ? ' is-on' : '') + '"><span>' + p + '</span></li>'; }).join('');
    var feel = FEEL.map(function (f, i) { return '<li class="ec-feel__i" data-i="' + i + '"><span class="ec-feel__k">' + f.k + '</span><span class="ec-feel__t">' + f.t + '</span></li>'; }).join('');
    var lines = LINES.map(function (l, i) {
      return '<li class="ec-line' + (i === 0 ? ' is-on' : '') + '" data-i="' + i + '">' +
        '<span class="ec-line__thumb">' + remotePic(l.url, 'ec-line__img', l.alt, '120px', l.pos) + '</span>' +
        '<h3 class="ec-line__t">' + l.t + '</h3>' +
        '<p class="ec-line__d">' + l.d + '</p>' +
        '<span class="ec-line__tag">' + l.tag + '</span>' +
      '</li>';
    }).join('');
    var steps = STEPS.map(function (s, i) {
      var v = s.v.toLocaleUpperCase('tr-TR');
      return '<li class="ec-step" data-i="' + i + '">' +
        '<span class="ec-step__n" aria-hidden="true">0' + (i + 1) + '</span>' +
        '<h3 class="ec-step__v"><span class="ec-step__base">' + v + '</span><span class="ec-step__fill" aria-hidden="true">' + v + '</span></h3>' +
        '<p class="ec-step__d">' + s.d + '</p>' +
      '</li>';
    }).join('');
    var strip = STEPS.map(function (s, i) { return '<li class="ec-strip__i' + (i === 0 ? ' is-on' : '') + '"><span class="ec-strip__n">0' + (i + 1) + '</span><span class="ec-strip__k">' + s.s + '</span></li>'; }).join('');
    var trio = TRIO.map(function (t, i) { return '<div class="ec-trio__c" data-i="' + i + '"><h3 class="ec-trio__k">' + t.k + '</h3><p>' + t.d + '</p></div>'; }).join('');
    var princ = PRINCIPLES.map(function (p) { return '<li class="ec-pr"><span class="ec-pr__ico">' + I.check + '</span><h3 class="ec-pr__t">' + p.t + '</h3><p class="ec-pr__d">' + p.d + '</p></li>'; }).join('');

    return '' +
'<main class="ec" id="e-ticaret-yonetimi" lang="tr">' +
/* 01 — Vitrin */
'<section class="ec-hero" aria-labelledby="ec-h1">' +
  '<div class="ec-wrap ec-hero__grid">' +
    '<nav class="ec-crumb" aria-label="Sayfa yolu"><ol><li><a href="/">Ana sayfa</a></li><li><a href="/#hizmetler-ozet">Hizmetler</a></li><li aria-current="page">E-ticaret yönetimi</li></ol></nav>' +
    '<h1 class="ec-hero__title" id="ec-h1"><span class="ec-sr">E-ticaret yönetimi. Satışa giden dijital deneyim.</span>' +
      '<span class="ec-tl" aria-hidden="true">' + chars('E-TİCARET') + '</span>' +
      '<span class="ec-tl ec-tl--acc" aria-hidden="true">' + chars('YÖNETİMİ.') + '</span>' +
    '</h1>' +
    '<div class="ec-hero__copy">' +
      '<p class="ec-hero__sub" aria-hidden="true">' + ln('SATIŞA GİDEN') + ln('DİJİTAL DENEYİM.') + '</p>' +
      '<p class="ec-hero__p">Vitrinden ödeme ekranına, ilk tıklamadan tekrar gelen müşteriye kadar her adımı tek bir deneyim olarak kurgular, yönetir ve büyütürüz.</p>' +
      '<a class="ec-scroll" href="#ec-deneyim"><span>Mağazaya gir</span>' + I.down + '</a>' +
    '</div>' +
    '<figure class="ec-hero__stage" data-ec="hero">' + screen(V_HERO, '1N E-ticaret yönetimi açılış videosu, sessiz oynatım', true) +
      '<figcaption class="ec-stage__cap">Bir kararın son karesi: ödeme.</figcaption>' +
    '</figure>' +
  '</div>' +
  '<div class="ec-wrap ec-path"><p class="ec-sr">Bir alışverişin yolu:</p><ol class="ec-path__l" aria-label="Bir alışverişin yolu">' + path + '</ol><i class="ec-path__bar" aria-hidden="true"></i></div>' +
'</section>' +
/* 02 — Satış bir deneyimdir */
'<section class="ec-sec ec-exp" id="ec-deneyim" aria-labelledby="ec-exp-t">' +
  '<div class="ec-wrap">' +
    '<p class="ec-label">Deneyim</p>' +
    '<h2 class="ec-h2" id="ec-exp-t">' + ln('SATIŞ') + ln('BİR DENEYİMDİR.', 'ec-ln--acc') + '</h2>' +
    '<div class="ec-exp__scene">' +
      '<figure class="ec-shop">' +
        '<div class="ec-shop__frame">' + remotePic(USER_MEDIA.experience, 'ec-shop__img', 'Eski çarşı ve geleneksel mağazacılık temalı görsel', '(max-width:1024px) 100vw, 64vw', '50% 58%', true) +
          '<span class="ec-shop__glitch ec-shop__glitch--a" aria-hidden="true">' + remotePic(USER_MEDIA.experience, 'ec-glitch__img', '', '(max-width:1024px) 100vw, 64vw', '50% 58%', true) + '</span>' +
          '<span class="ec-shop__glitch ec-shop__glitch--b" aria-hidden="true">' + remotePic(USER_MEDIA.experience, 'ec-glitch__img', '', '(max-width:1024px) 100vw, 64vw', '50% 58%', true) + '</span>' +
          '<i class="ec-shutter" aria-hidden="true"></i></div>' +
        '<figcaption class="ec-cap">Vitrin: müşteri içeri girmeden önce markayla tanışır.</figcaption>' +
      '</figure>' +
      '<ol class="ec-feel" aria-label="Satın almadan önce">' + feel + '</ol>' +
    '</div>' +
    '<div class="ec-exp__more">' +
      '<figure class="ec-crop ec-crop--a" data-ec="store"><div class="ec-scrbox ec-crop__screen">' + screen(V_STORE, 'Mağaza deneyimi videosu, sessiz oynatım', false, 'eticaret-store') + '</div>' +
        '<figcaption class="ec-cap">Mağaza: deneyim rafta başlar.</figcaption></figure>' +
      '<figure class="ec-crop ec-crop--b">' + remotePic(USER_MEDIA.right, 'ec-crop__img', 'Dijital alışveriş deneyimini anlatan görsel', '(max-width:767px) 40vw, 22vw', '50% 78%') +
        '<figcaption class="ec-cap">Ekran: aynı deneyim cebe sığar.</figcaption></figure>' +
      '<p class="ec-exp__p">Fiziksel bir mağazada vitrin, ışık ve raf düzeni ne işe yarıyorsa dijitalde de görsel dil, sayfa kurgusu ve ödeme akışı aynı işi görür. Bu deneyimi parça parça değil, baştan sona birlikte tasarlarız.</p>' +
    '</div>' +
  '</div>' +
'</section>' +
/* 03 — Uçtan uca yönetim (sipariş özeti) */
'<section class="ec-sec ec-scope" id="ec-kapsam" aria-labelledby="ec-scope-t">' +
  '<div class="ec-wrap">' +
    '<div class="ec-scope__head">' +
      '<p class="ec-label">Kapsam</p>' +
      '<h2 class="ec-h2" id="ec-scope-t">' + ln('UÇTAN UCA') + ln('YÖNETİM.', 'ec-ln--acc') + '</h2>' +
      '<p class="ec-scope__lede">Bir mağazayı ayakta tutan işler ayrı ayrı yürümez. Hepsini, aynı siparişin kalemleri gibi tek bir planda toplarız.</p>' +
    '</div>' +
    '<div class="ec-order">' +
      '<p class="ec-order__h" aria-hidden="true"><span>Kalem</span><span>Kapsam</span><span>Alan</span></p>' +
      '<ul class="ec-lines">' + lines + '</ul>' +
      '<p class="ec-total"><span class="ec-total__k">Toplam</span><span class="ec-total__v">' + ln('TEK BİR SİSTEM.') + '</span></p>' +
    '</div>' +
  '</div>' +
'</section>' +
/* 04 — Ziyaretten satışa */
'<section class="ec-sec ec-flow" id="ec-akis" aria-labelledby="ec-flow-t">' +
  '<div class="ec-wrap">' +
    '<div class="ec-flow__head">' +
      '<p class="ec-label">Akış</p>' +
      '<h2 class="ec-h2" id="ec-flow-t">' + ln('ZİYARETTEN') + ln('SATIŞA.', 'ec-ln--acc') + '</h2>' +
      '<p class="ec-flow__lede">Bir ziyaretçiyi müşteriye dönüştüren beş adım. Her birini ayrı ayrı tasarlar, birlikte ölçeriz.</p>' +
    '</div>' +
    '<div class="ec-flow__body">' +
      '<div class="ec-strip" aria-hidden="true"><ol class="ec-strip__l">' + strip + '</ol><span class="ec-strip__bar"><i></i></span></div>' +
      '<ol class="ec-steps">' + steps + '</ol>' +
    '</div>' +
  '</div>' +
'</section>' +
/* 05 — İçerik, performans, büyüme */
'<section class="ec-sec ec-trio" id="ec-buyume" aria-labelledby="ec-trio-t">' +
  '<div class="ec-wrap">' +
    '<p class="ec-label">Omurga</p>' +
    '<h2 class="ec-h2 ec-trio__h" id="ec-trio-t">' + ln('İÇERİK,') + ln('PERFORMANS,') + ln('BÜYÜME.', 'ec-ln--acc') + '</h2>' +
    '<div class="ec-trio__stage">' +
      '<figure class="ec-trio__l"><div class="ec-trio__f">' + remotePic(USER_MEDIA.content, 'ec-trio__img', 'E-ticaret içerik üretimini anlatan görsel', '(max-width:767px) 38vw, 22vw', '58% 50%') + '</div><figcaption>İçerik</figcaption></figure>' +
      '<figure class="ec-trio__m" data-ec="trio">' + screen(V_TRIO, 'E-ticaret büyüme videosu, sessiz oynatım', false, 'eticaret-trio') + '<figcaption>Büyüme</figcaption></figure>' +
      '<figure class="ec-trio__r"><div class="ec-trio__f">' + remotePic(USER_MEDIA.performance, 'ec-trio__img', 'E-ticaret performansını anlatan görsel', '(max-width:767px) 44vw, 26vw', '66% 46%') + '</div><figcaption>Performans</figcaption></figure>' +
    '</div>' +
    '<div class="ec-trio__copy">' + trio + '</div>' +
  '</div>' +
'</section>' +
/* 06 — Tek tek işler değil, işleyen sistemler */
'<section class="ec-sec ec-sys" id="ec-sistem" aria-labelledby="ec-sys-t">' +
  '<div class="ec-wrap">' +
    '<p class="ec-label">Yaklaşım</p>' +
    '<h2 class="ec-sys__t" id="ec-sys-t"><span class="ec-sr">Tek tek işler değil, işleyen sistemler.</span>' +
      '<span class="ec-sl ec-sl--a" aria-hidden="true">' + chars('TEK TEK') + '</span>' +
      '<span class="ec-sl ec-sl--b" aria-hidden="true">' + chars('İŞLER DEĞİL,') + '</span>' +
      '<span class="ec-sl ec-sl--c" aria-hidden="true">' + ln('İŞLEYEN') + '</span>' +
      '<span class="ec-sl ec-sl--d" aria-hidden="true">' + ln('SİSTEMLER.') + '</span>' +
    '</h2>' +
    '<div class="ec-sys__body">' +
      '<p class="ec-sys__p">Bir e-ticaret markası tek seferlik işlerle büyümez. Optimizasyon, görsel dil, kampanya takvimi ve reklam birbirini besleyen bir düzen içinde çalıştığında mağaza her ay biraz daha iyi satar.</p>' +
      '<ul class="ec-prs">' + princ + '</ul>' +
    '</div>' +
  '</div>' +
'</section>' +
/* 07 — Final */
'<section class="ec-fin" aria-labelledby="ec-fin-t">' +
  '<div class="ec-wrap ec-fin__grid">' +
    '<div class="ec-fin__copy">' +
      '<p class="ec-label">Başlayalım</p>' +
      '<h2 class="ec-fin__t" id="ec-fin-t">' + ln('MARKANIZI') + ln('DİJİTALDE') + ln('BÜYÜTELİM.', 'ec-ln--acc') + '</h2>' +
      '<p class="ec-fin__sub">E-ticaret deneyiminizi birlikte daha güçlü, daha rafine ve daha satış odaklı hâle getirebiliriz.</p>' +
      '<div class="ec-fin__cta">' +
        '<a class="ec-btn ec-btn--primary" href="/iletisim"><span>Projenizi Konuşalım</span><span class="ec-btn__ico">' + I.arrow + '</span></a>' +
        '<a class="ec-btn ec-btn--ghost" href="/teklif-al"><span>Teklif Al</span><span class="ec-btn__ico">' + I.arrow + '</span></a>' +
      '</div>' +
    '</div>' +
    '<figure class="ec-fin__fig">' + remotePic(USER_MEDIA.final, 'ec-fin__img', 'E-ticaret deneyimini temsil eden görsel', '(max-width:1024px) 40vw, 30vw', '46% 54%') + '</figure>' +
  '</div>' +
'</section>' +
'</main>';
  }

  /* ---------- CSS (yalnızca n1-e-ticaret-yonetimi-v23 kapsamında) ---------- */
  var T = TAG;
  var COND = '"Barlow Condensed","Arial Narrow",Arial,sans-serif';
  var CSS = [
T + '{--bg:#080A09;--g1:#0D0F0E;--g2:#121513;--ink:#ECEBE5;--soft:#BDBCB5;--mute:#9A9B95;--dim:#6E706A;--ghost:#2B2E2B;--line:rgba(228,227,221,.12);--line2:rgba(228,227,221,.07);--acc:#A8CF62;--ease:cubic-bezier(.22,1,.36,1);',
'  --hdr:88px;--gap:clamp(18px,2.2vw,40px);--secpad:clamp(100px,8.6vw,168px);display:block;position:relative;width:100%;background:var(--bg);color:var(--ink);font:400 17px/1.6 Barlow,Arial,sans-serif;-webkit-font-smoothing:antialiased;overflow-x:clip;text-align:left}',
T + ' *,' + T + ' *::before,' + T + ' *::after{box-sizing:border-box;min-width:0}',
T + ' :where(.ec) :where(p,h1,h2,h3,ul,ol,figure,figcaption){margin:0}',
T + ' :where(.ec) :where(ul,ol){padding:0;list-style:none}',
T + ' :where(.ec) :where(a){color:inherit}',
T + ' :where(.ec) :where(button){font:inherit;color:inherit;background:none;border:0;padding:0;margin:0;cursor:pointer;-webkit-tap-highlight-color:transparent}',
T + ' .ec :focus-visible{outline:2px solid var(--acc);outline-offset:3px}',
T + ' .ec img{display:block;max-width:none}',
T + ' .ec-ico{display:block;flex:none}',
T + ' .ec-sr{position:absolute!important;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}',
T + ' .ec-wrap{width:90%;margin-left:auto;margin-right:auto}',
T + ' .ec-sec{position:relative;padding:var(--secpad) 0;border-top:1px solid var(--line)}',
T + ' .ec-label{display:flex;align-items:center;gap:12px;font:500 15px/1.3 Barlow,Arial,sans-serif;color:var(--mute)}',
T + ' .ec-label::before{content:"";flex:none;width:7px;height:7px;border-radius:1px;background:var(--acc)}',
/* Satır maskesi: Türkçe İ, Ş, Ğ, Ü, Ö için üst/alt güvenli pay */
T + ' .ec-ln{display:block;overflow:hidden;padding:.17em 0 .09em;margin:-.17em 0 -.09em}',
T + ' .ec-ln>span{display:block}',
T + ' .ec-ln--acc{color:var(--acc)}',
T + ' .ec-chs{display:inline-block;white-space:nowrap}',
T + ' .ec-ch{display:inline-block;will-change:transform}',
T + ' .ec-sp{display:inline-block;width:.24em}',
T + ' .ec-h2{margin-top:clamp(26px,2.4vw,40px);font:700 clamp(60px,7.4vw,148px)/1 ' + COND + ';letter-spacing:-.016em;color:var(--ink)}',
T + ' .ec-cap{margin-top:14px;font-size:14px;line-height:1.5;color:var(--mute)}',

/* Ekran: poster + video (9:16) */
T + ' .ec-screen{position:absolute;inset:0;overflow:hidden;border-radius:6px;background:#0B0D0C}',
T + ' .ec-poster,' + T + ' .ec-video{position:absolute;inset:0;display:block;width:100%;height:100%;object-fit:cover}',
T + ' .ec-video{opacity:0;transition:opacity .6s var(--ease)}',
T + ' .ec-screen.is-started .ec-video{opacity:1}',
T + ' .ec-screen.is-failed .ec-video{opacity:0}',
T + ' .ec-screen::after{content:"";position:absolute;inset:auto 0 0 0;height:34%;background:linear-gradient(180deg,rgba(8,10,9,0),rgba(8,10,9,.55));pointer-events:none}',
T + ' .ec-screen__prog{position:absolute;left:14px;right:14px;bottom:14px;z-index:2;height:2px;background:rgba(236,235,229,.22);overflow:hidden}',
T + ' .ec-screen__prog i{position:absolute;inset:0;background:var(--acc);transform:scaleX(0);transform-origin:0 50%}',
T + ' .ec-screen__err{position:absolute;left:14px;right:14px;bottom:26px;z-index:2;font-size:12px;line-height:1.4;color:var(--soft)}',
T + ' .ec-screen__err:empty{display:none}',
T + ' .ec-scrbox{position:relative}',
T + ' .ec-play{position:absolute;right:12px;top:12px;z-index:3;display:grid;place-items:center;width:40px;height:40px;border-radius:50%;background:rgba(8,10,9,.55);color:var(--ink);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);transition:background-color .3s var(--ease),color .3s var(--ease);touch-action:manipulation}',
T + ' .ec-play:hover,' + T + ' .ec-play:focus-visible{background:var(--acc);color:#080A09}',
T + ' .ec-play .ec-ico--play,' + T + ' .ec-play[aria-pressed="true"] .ec-ico--pause{display:none}',
T + ' .ec-play[aria-pressed="true"] .ec-ico--play{display:block}',
T + ' .ec-play:disabled{display:none}',

/* ===== 01 Vitrin ===== */
T + ' .ec-hero{position:relative;padding:calc(var(--hdr) + clamp(28px,3vw,56px)) 0 0;overflow:hidden}',
T + ' .ec-hero__grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:start}',
T + ' .ec-crumb{grid-column:1/9;grid-row:1;font:500 13px/1.4 Barlow,Arial,sans-serif;color:var(--mute)}',
T + ' .ec-crumb ol{display:flex;flex-wrap:wrap;gap:4px 0}',
T + ' .ec-crumb li+li::before{content:"/";margin:0 10px;color:var(--dim)}',
T + ' .ec-crumb a{text-decoration:none;transition:color .3s var(--ease)}',
T + ' .ec-crumb a:hover{color:var(--ink)}',
T + ' .ec-crumb [aria-current]{color:var(--ink)}',
T + ' .ec-hero__title{grid-column:1/9;grid-row:2;margin-top:clamp(28px,3vw,52px);font:700 clamp(96px,14.6vw,300px)/.9 ' + COND + ';letter-spacing:-.018em;perspective:900px}',
T + ' .ec-tl{display:block;padding:.06em 0 .02em}',
T + ' .ec-tl--acc{color:var(--acc)}',
T + ' .ec-tl .ec-ch{transform-origin:50% 60% -.2em;backface-visibility:hidden}',
T + ' .ec-hero__copy{grid-column:1/7;grid-row:3;margin-top:clamp(30px,3vw,54px)}',
T + ' .ec-hero__sub{font:600 clamp(28px,2.6vw,50px)/1.02 ' + COND + ';letter-spacing:.005em;color:var(--ink)}',
T + ' .ec-hero__p{max-width:46ch;margin-top:22px;font-size:clamp(16px,1.15vw,19px);line-height:1.62;color:var(--soft)}',
T + ' .ec-scroll{display:inline-flex;align-items:center;gap:12px;margin-top:28px;font:500 13px/1 Barlow,Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase;text-decoration:none;color:var(--ink)}',
T + ' .ec-scroll .ec-ico{color:var(--acc);transition:transform .45s var(--ease)}',
T + ' .ec-scroll:hover .ec-ico{transform:translateY(3px)}',
T + ' .ec-hero__stage{position:relative;grid-column:9/13;grid-row:1/4;justify-self:end;height:clamp(440px,calc(100vh - var(--hdr) - 150px),740px);aspect-ratio:9/16;max-width:100%}',
T + ' .ec-hero__stage .ec-scrbox{height:100%}',
T + ' .ec-stage__cap{position:absolute;right:calc(100% + 18px);bottom:4px;width:13ch;font-size:13px;line-height:1.45;color:var(--mute);text-align:right}',
T + ' .ec-path{position:relative;margin-top:clamp(56px,5vw,92px);padding:18px 0 clamp(36px,3vw,52px);border-top:1px solid var(--line)}',
T + ' .ec-path__l{display:flex;justify-content:space-between;gap:12px}',
T + ' .ec-path__i{font:600 clamp(15px,1.15vw,19px)/1 ' + COND + ';letter-spacing:.12em;text-transform:uppercase;color:var(--dim);transition:color .5s var(--ease)}',
T + ' .ec-path__i.is-on{color:var(--ink)}',
T + ' .ec-path__bar{position:absolute;top:-1px;left:0;height:2px;width:0;background:var(--acc);transition:transform .7s var(--ease),width .7s var(--ease)}',

/* ===== 02 Deneyim ===== */
T + ' .ec-exp__scene{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:end;margin-top:clamp(54px,5vw,96px)}',
T + ' .ec-shop{grid-column:1/9}',
T + ' .ec-shop__frame{position:relative;aspect-ratio:16/10;overflow:hidden;border-radius:4px;background:var(--g1)}',
T + ' .ec-shop__img{position:absolute;left:0;top:-6%;width:100%;height:112%;object-fit:cover}',
T + ' .ec-shop__frame{isolation:isolate}',
T + ' .ec-shop__glitch{position:absolute;inset:-6% 0;z-index:1;pointer-events:none;opacity:0;will-change:auto}',
T + ' .ec-glitch__img{display:block;width:100%;height:100%;object-fit:cover;object-position:50% 58%}',
T + ' .ec-shop__frame.is-glitch .ec-shop__glitch--a{animation:ec-glitch-a .88s steps(1,end) both}',
T + ' .ec-shop__frame.is-glitch .ec-shop__glitch--b{animation:ec-glitch-b .88s steps(1,end) both;mix-blend-mode:screen;filter:contrast(1.13) hue-rotate(22deg)}',
'@keyframes ec-glitch-a{0%,11%,24%,41%,63%,83%,100%{opacity:0;transform:translateX(0);clip-path:inset(0)}12%{opacity:.63;transform:translateX(-7px);clip-path:inset(23% 0 64% 0)}25%{opacity:.4;transform:translateX(5px);clip-path:inset(68% 0 19% 0)}42%{opacity:.48;transform:translateX(-4px);clip-path:inset(42% 0 45% 0)}64%{opacity:.5;transform:translateX(3px);clip-path:inset(9% 0 78% 0)}}',
'@keyframes ec-glitch-b{0%,16%,32%,53%,76%,100%{opacity:0;transform:translateX(0);clip-path:inset(0)}17%{opacity:.42;transform:translateX(5px);clip-path:inset(56% 0 34% 0)}33%{opacity:.36;transform:translateX(-5px);clip-path:inset(18% 0 69% 0)}54%{opacity:.42;transform:translateX(4px);clip-path:inset(79% 0 10% 0)}}',
/* Kepenk: vitrinin önündeki ince oluklu kepenk, kaydırınca yukarı sarılır */
T + ' .ec-shutter{position:absolute;inset:0;z-index:2;display:block;background:repeating-linear-gradient(180deg,#1A1D1B 0 9px,#121513 9px 11px,#232624 11px 12px);box-shadow:inset 0 -14px 0 #0E100F;transform:translateY(-101%)}',
T + ' .ec-feel{grid-column:9/13;display:flex;flex-direction:column;gap:clamp(26px,2.6vw,44px);padding-bottom:40px}',
T + ' .ec-feel__i{display:block}',
T + ' .ec-feel__k{display:block;font:500 13px/1.3 Barlow,Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:var(--acc)}',
T + ' .ec-feel__t{display:block;margin-top:10px;font:600 clamp(30px,2.7vw,52px)/1.02 ' + COND + ';color:var(--ink)}',
T + ' .ec-exp__more{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);margin-top:clamp(70px,7vw,130px);align-items:start}',
T + ' .ec-crop{position:relative}',
T + ' .ec-crop__img{width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:4px;background:var(--g1)}',
T + ' .ec-crop--a .ec-scrbox{position:relative;aspect-ratio:4/5;overflow:hidden;border-radius:4px;background:var(--g1)}',
T + ' .ec-crop--a .ec-screen{border-radius:4px}',
T + ' .ec-crop--a .ec-play{width:36px;height:36px}',
T + ' .ec-crop--a{grid-column:2/6}',
T + ' .ec-crop--b{grid-column:7/10;margin-top:clamp(90px,10vw,180px)}',
T + ' .ec-crop--b .ec-crop__img{aspect-ratio:3/4}',
T + ' .ec-exp__p{grid-column:10/13;align-self:end;font-size:clamp(16px,1.1vw,18px);line-height:1.7;color:var(--soft)}',

/* ===== 03 Kapsam: sipariş özeti ===== */
T + ' .ec-scope__head{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:end}',
T + ' .ec-scope__head .ec-label,' + T + ' .ec-scope__head .ec-h2{grid-column:1/9}',
T + ' .ec-scope__lede{grid-column:9/13;grid-row:2;max-width:38ch;font-size:clamp(16px,1.15vw,19px);line-height:1.65;color:var(--soft)}',
T + ' .ec-order{margin-top:clamp(56px,5vw,96px)}',
T + ' .ec-order__h,' + T + ' .ec-line{display:grid;grid-template-columns:clamp(84px,7.2vw,120px) minmax(0,1.15fr) minmax(0,1fr) minmax(96px,.32fr);column-gap:clamp(18px,2.4vw,44px);align-items:center}',
T + ' .ec-order__h{padding-bottom:14px;font:500 12px/1 Barlow,Arial,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:var(--dim)}',
T + ' .ec-order__h span:first-child{grid-column:1/3}',
T + ' .ec-order__h span:last-child{text-align:right}',
T + ' .ec-lines{border-top:1px solid var(--line)}',
T + ' .ec-line{position:relative;padding:clamp(16px,1.5vw,24px) 0;border-bottom:1px solid var(--line);cursor:default}',
T + ' .ec-line::before{content:"";position:absolute;left:0;right:0;top:-1px;height:1px;background:var(--acc);transform:scaleX(0);transform-origin:0 50%;transition:transform .7s var(--ease)}',
T + ' .ec-line.is-on::before{transform:scaleX(1)}',
T + ' .ec-line__thumb{position:relative;display:block;aspect-ratio:4/5;overflow:hidden;border-radius:3px;background:var(--g1)}',
T + ' .ec-line__img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:grayscale(1) brightness(.42);transform:scale(1.12);transition:transform 1.1s var(--ease),filter .7s var(--ease)}',
T + ' .ec-line.is-on .ec-line__img{filter:grayscale(0) brightness(1);transform:scale(1)}',   /* V1.3 v24: 'none' yerine aynı işlev listesi — görsel olarak eşdeğer; WebKit'te grayscale→none filtre geçişi sekmeyi çökertiyordu (ROOT_CAUSE_ANALYSIS.md §P02-B) */
T + ' .ec-line__t{font:600 clamp(30px,3.3vw,64px)/1 ' + COND + ';letter-spacing:-.005em;text-transform:uppercase;color:var(--mute);transition:color .5s var(--ease),translate .7s var(--ease)}',
T + ' .ec-line.is-on .ec-line__t{color:var(--ink);translate:6px 0}',
T + ' .ec-line__d{max-width:46ch;font-size:clamp(15px,1.05vw,17px);line-height:1.6;color:var(--dim);transition:color .5s var(--ease)}',
T + ' .ec-line.is-on .ec-line__d{color:var(--soft)}',
T + ' .ec-line__tag{justify-self:end;font:500 12px/1 Barlow,Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:var(--dim);transition:color .5s var(--ease)}',
T + ' .ec-line.is-on .ec-line__tag{color:var(--acc)}',
T + ' .ec-total{display:flex;align-items:baseline;justify-content:space-between;gap:24px;padding-top:clamp(26px,2.4vw,40px)}',
T + ' .ec-total__k{font:500 12px/1 Barlow,Arial,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:var(--mute)}',
T + ' .ec-total__v{font:700 clamp(44px,5.4vw,104px)/1 ' + COND + ';color:var(--acc);text-align:right}',

/* ===== 04 Akış ===== */
T + ' .ec-flow__head{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:end}',
T + ' .ec-flow__head .ec-label,' + T + ' .ec-flow__head .ec-h2{grid-column:1/9}',
T + ' .ec-flow__lede{grid-column:9/13;grid-row:2;max-width:36ch;font-size:clamp(16px,1.15vw,19px);line-height:1.65;color:var(--soft)}',
T + ' .ec-flow__body{position:relative;margin-top:clamp(52px,5vw,90px)}',
T + ' .ec-strip{position:sticky;top:var(--hdr);z-index:5;padding:16px 0 0;background:linear-gradient(180deg,var(--bg) 78%,rgba(8,10,9,0))}',
T + ' .ec-strip__l{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px}',
T + ' .ec-strip__i{display:flex;align-items:baseline;gap:10px;font:600 15px/1 ' + COND + ';letter-spacing:.1em;text-transform:uppercase;color:var(--dim);transition:color .5s var(--ease)}',
T + ' .ec-strip__n{font:500 12px/1 Barlow,Arial,sans-serif;letter-spacing:.06em;font-variant-numeric:tabular-nums}',
T + ' .ec-strip__i.is-on,' + T + ' .ec-strip__i.is-done{color:var(--ink)}',
T + ' .ec-strip__i.is-on .ec-strip__n{color:var(--acc)}',
T + ' .ec-strip__bar{position:relative;display:block;height:2px;margin-top:14px;background:var(--line)}',
T + ' .ec-strip__bar i{position:absolute;inset:0;background:var(--acc);transform:scaleX(.2);transform-origin:0 50%;transition:transform .8s var(--ease)}',
T + ' .ec-steps{margin-top:clamp(20px,2vw,34px)}',
T + ' .ec-step{display:grid;grid-template-columns:clamp(54px,5vw,90px) minmax(0,1fr) minmax(0,.42fr);column-gap:clamp(18px,2.4vw,44px);align-items:start;padding:clamp(34px,3.6vw,64px) 0;border-bottom:1px solid var(--line2)}',
T + ' .ec-step:last-child{border-bottom:0}',
T + ' .ec-step__n{padding-top:.9em;font:500 14px/1 Barlow,Arial,sans-serif;letter-spacing:.08em;font-variant-numeric:tabular-nums;color:var(--acc)}',
T + ' .ec-step__v{position:relative;font:700 clamp(56px,7.6vw,150px)/.94 ' + COND + ';letter-spacing:-.012em;padding:.08em 0 .03em}',
T + ' .ec-step__base{display:block;color:var(--ghost)}',
T + ' .ec-step__fill{position:absolute;inset:0;display:block;padding:inherit;color:var(--ink);clip-path:inset(0 0% 0 0)}',
T + ' .ec-step.is-on .ec-step__fill{color:var(--ink)}',
T + ' .ec-step__d{padding-top:.7em;max-width:34ch;font-size:clamp(15px,1.08vw,18px);line-height:1.65;color:var(--soft)}',

/* ===== 05 İçerik, performans, büyüme ===== */
T + ' .ec-trio__h{max-width:12ch}',
T + ' .ec-trio__stage{position:relative;display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:center;margin-top:clamp(46px,4.4vw,84px)}',
T + ' .ec-trio__stage figcaption{margin-top:14px;font:600 15px/1 ' + COND + ';letter-spacing:.14em;text-transform:uppercase;color:var(--mute)}',
T + ' .ec-trio__l{grid-column:1/5;grid-row:1;position:relative;z-index:1;align-self:end;margin-bottom:clamp(40px,5vw,96px)}',
T + ' .ec-trio__r{grid-column:9/13;grid-row:1;position:relative;z-index:1;align-self:start;margin-top:clamp(40px,4vw,80px)}',
T + ' .ec-trio__r figcaption{text-align:right}',
T + ' .ec-trio__l{margin-right:-3.2vw}',
T + ' .ec-trio__r{margin-left:-3.2vw}',
T + ' .ec-trio__f{position:relative;overflow:hidden;border-radius:4px;background:var(--g1)}',
T + ' .ec-trio__l .ec-trio__f{aspect-ratio:4/5}',
T + ' .ec-trio__r .ec-trio__f{aspect-ratio:5/4}',
T + ' .ec-trio__img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}',
T + ' .ec-trio__m{grid-column:5/9;grid-row:1;position:relative;z-index:2;justify-self:center;width:min(100%,calc((100vh - var(--hdr) - 120px) * .5625))}',
T + ' .ec-trio__m .ec-scrbox{position:relative;aspect-ratio:9/16}',
T + ' .ec-trio__m figcaption{text-align:center;color:var(--acc)}',
T + ' .ec-trio__copy{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));column-gap:var(--gap);margin-top:clamp(56px,5vw,96px);border-top:1px solid var(--line)}',
T + ' .ec-trio__c{padding-top:24px}',
T + ' .ec-trio__k{font:700 clamp(26px,2.2vw,40px)/1 ' + COND + ';text-transform:uppercase;color:var(--ink)}',
T + ' .ec-trio__c[data-i="2"] .ec-trio__k{color:var(--acc)}',
T + ' .ec-trio__c p{max-width:38ch;margin-top:14px;font-size:clamp(15px,1.05vw,17px);line-height:1.65;color:var(--soft)}',

/* ===== 06 Sistem ===== */
T + ' .ec-sys__t{margin-top:clamp(26px,2.4vw,40px);font:700 clamp(64px,9.2vw,190px)/.92 ' + COND + ';letter-spacing:-.016em;color:var(--ink)}',
T + ' .ec-sl{display:block}',
T + ' .ec-sl--a,' + T + ' .ec-sl--b{color:var(--soft);padding:.06em 0 .02em}',
T + ' .ec-sl--b{padding-left:8%}',
T + ' .ec-sl--c{margin-top:.06em}',
T + ' .ec-sl--d{color:var(--acc);padding-left:8%}',
T + ' .ec-sys__body{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);margin-top:clamp(60px,5.6vw,110px)}',
T + ' .ec-sys__p{grid-column:1/5;font-size:clamp(17px,1.25vw,21px);line-height:1.6;color:var(--soft)}',
T + ' .ec-prs{grid-column:6/13;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:var(--gap);border-top:1px solid var(--line)}',
T + ' .ec-pr{display:grid;grid-template-columns:auto minmax(0,1fr);column-gap:14px;padding:22px 0 26px;border-bottom:1px solid var(--line2)}',
T + ' .ec-pr__ico{grid-row:1/3;padding-top:3px;color:var(--acc)}',
T + ' .ec-pr__t{font:600 clamp(22px,1.7vw,30px)/1.05 ' + COND + ';text-transform:uppercase;color:var(--ink)}',
T + ' .ec-pr__d{margin-top:10px;font-size:15px;line-height:1.6;color:var(--mute)}',

/* ===== 07 Final ===== */
T + ' .ec-fin{position:relative;padding:clamp(110px,9vw,170px) 0 clamp(90px,7vw,130px);border-top:1px solid var(--line);background:linear-gradient(180deg,var(--bg),var(--g1));overflow:hidden}',
T + ' .ec-fin__grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:end}',
T + ' .ec-fin__copy{grid-column:1/9}',
T + ' .ec-fin__t{margin-top:clamp(26px,2.4vw,40px);font:700 clamp(80px,9.6vw,196px)/.96 ' + COND + ';letter-spacing:-.016em;color:var(--ink)}',
T + ' .ec-fin__sub{max-width:44ch;margin-top:clamp(28px,2.6vw,44px);font-size:clamp(17px,1.25vw,21px);line-height:1.55;color:var(--soft)}',
T + ' .ec-fin__cta{display:flex;flex-wrap:wrap;gap:14px;margin-top:clamp(32px,3vw,52px)}',
T + ' .ec-fin__fig{grid-column:9/13;position:relative;aspect-ratio:3/4;overflow:hidden;border-radius:4px;background:var(--g1)}',
T + ' .ec-fin__img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}',
T + ' .ec-btn{position:relative;display:inline-flex;align-items:center;justify-content:space-between;gap:22px;height:64px;padding:0 10px 0 28px;border-radius:12px;overflow:hidden;white-space:nowrap;isolation:isolate;',
'  font:500 13.5px/1 Barlow,Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase;text-decoration:none;color:var(--ink);border:1px solid rgba(168,207,98,.42);background:rgba(16,19,17,.72);transition:color .45s var(--ease),border-color .45s ease;touch-action:manipulation}',
T + ' .ec-btn::before{content:"";position:absolute;inset:0;z-index:-1;background:var(--acc);transform:scaleX(0);transform-origin:0 50%;transition:transform .6s cubic-bezier(.65,0,.35,1)}',
T + ' .ec-btn__ico{display:grid;place-items:center;width:44px;height:44px;border-radius:8px;background:rgba(168,207,98,.12);transition:background-color .45s ease}',
T + ' .ec-btn--ghost{border-color:rgba(228,227,221,.22);background:rgba(8,10,9,.5)}',
T + ' .ec-btn--ghost .ec-btn__ico{background:rgba(236,235,229,.06)}',
T + ' .ec-btn:hover,' + T + ' .ec-btn:focus-visible{color:#0A0B0B;border-color:var(--acc)}',
T + ' .ec-btn:hover::before,' + T + ' .ec-btn:focus-visible::before{transform:scaleX(1)}',
T + ' .ec-btn:hover .ec-btn__ico,' + T + ' .ec-btn:focus-visible .ec-btn__ico{background:rgba(10,11,11,.12)}',

/* Header paneli (yalnızca bu sayfanın paneli) */
'.n1h-panel[data-n1-ec],.n1h-panel[data-n1-ec] *,.n1h-panel[data-n1-ec] *::before,.n1h-panel[data-n1-ec] *::after{box-sizing:border-box}',
'.n1h-panel[data-n1-ec] a.n1h-item{text-decoration:none;color:#ecebe6}',
'.n1h-panel[data-n1-ec] .n1h-sub a{text-decoration:none}',
'@media (max-width:1024px){.n1h-panel[data-n1-ec][data-open]::before{content:"";position:fixed;left:0;right:0;bottom:0;top:72px;z-index:-1;pointer-events:none;background:rgba(8,10,9,.8);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}}',
'@media (max-width:767px){.n1h-panel[data-n1-ec][data-open]::before{top:64px}}',
T + ' .n1ft-partner-art{display:none}',

/* ---------- Tablet (≤1024) ---------- */
'@media (max-width:1024px){',
T + '{--hdr:72px}',
T + ' .ec-crumb,' + T + ' .ec-hero__title{grid-column:1/-1}',
T + ' .ec-hero__title{font-size:clamp(84px,16.4vw,168px)}',
T + ' .ec-hero__copy{grid-column:1/8;grid-row:3;align-self:center;padding-top:40px}',
T + ' .ec-hero__sub{font-size:clamp(26px,3.6vw,36px)}',
T + ' .ec-hero__stage{grid-column:8/13;grid-row:3;justify-self:end;width:100%;height:auto;margin-top:clamp(30px,4vw,48px)}',
T + ' .ec-stage__cap{position:static;width:auto;margin-top:12px;text-align:left}',
T + ' .ec-hero__stage .ec-scrbox{height:auto;aspect-ratio:9/16}',
T + ' .ec-path__l{flex-wrap:wrap;justify-content:flex-start;gap:12px 26px}',
T + ' .ec-path__bar{display:none}',
T + ' .ec-shop{grid-column:1/-1}',
T + ' .ec-feel{grid-column:1/-1;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--gap);margin-top:34px;padding:0}',
T + ' .ec-feel__t{font-size:clamp(26px,3.4vw,34px)}',
T + ' .ec-crop--a{grid-column:1/7}',
T + ' .ec-crop--b{grid-column:8/13;margin-top:120px}',
T + ' .ec-exp__p{grid-column:1/-1;max-width:56ch;margin-top:48px}',
T + ' .ec-scope__head .ec-label,' + T + ' .ec-scope__head .ec-h2,' + T + ' .ec-scope__lede,' + T + ' .ec-flow__head .ec-label,' + T + ' .ec-flow__head .ec-h2,' + T + ' .ec-flow__lede{grid-column:1/-1}',
T + ' .ec-scope__lede,' + T + ' .ec-flow__lede{grid-row:auto;margin-top:26px;max-width:52ch}',
T + ' .ec-order__h{display:none}',
T + ' .ec-line{grid-template-columns:clamp(72px,10vw,96px) minmax(0,1fr) auto;grid-template-areas:"th t tag" "th d d";row-gap:10px;align-items:start}',
T + ' .ec-line__thumb{grid-area:th}',
T + ' .ec-line__t{grid-area:t;font-size:clamp(28px,4.2vw,40px)}',
T + ' .ec-line__d{grid-area:d}',
T + ' .ec-line__tag{grid-area:tag;padding-top:6px}',
T + ' .ec-strip__i{flex-direction:column;align-items:flex-start;gap:6px;font-size:14px}',
T + ' .ec-step{grid-template-columns:clamp(44px,6vw,64px) minmax(0,1fr);row-gap:14px}',
T + ' .ec-step__d{grid-column:2;padding-top:0;max-width:52ch}',
T + ' .ec-step__v{font-size:clamp(54px,9vw,96px)}',
T + ' .ec-trio__l{grid-column:1/5}',
T + ' .ec-trio__m{grid-column:4/10;width:100%}',
T + ' .ec-trio__r{grid-column:9/13}',
T + ' .ec-trio__copy{grid-template-columns:1fr;row-gap:0}',
T + ' .ec-trio__c{display:grid;grid-template-columns:minmax(150px,.4fr) minmax(0,1fr);column-gap:var(--gap);padding:22px 0;border-bottom:1px solid var(--line2)}',
T + ' .ec-trio__c p{margin-top:0}',
T + ' .ec-sys__t{font-size:clamp(60px,10.6vw,108px)}',
T + ' .ec-sys__p,' + T + ' .ec-prs{grid-column:1/-1}',
T + ' .ec-prs{margin-top:40px}',
T + ' .ec-fin__copy{grid-column:1/9}',
T + ' .ec-fin__fig{grid-column:9/13}',
T + ' .ec-fin__t{font-size:clamp(70px,11vw,112px)}',
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
T + '{font-size:16px;--secpad:80px;--hdr:64px}',
T + ' .ec-wrap{width:calc(100% - 40px)}',
T + ' .ec-hero__grid{display:flex;flex-direction:column;align-items:stretch}',
T + ' .ec-crumb{font-size:12px}',
T + ' .ec-hero__title{margin-top:24px;font-size:clamp(60px,21.4vw,110px);line-height:.92}',
T + ' .ec-hero__copy{display:contents}',
T + ' .ec-hero__sub{order:1;margin-top:22px;font-size:clamp(25px,7.2vw,32px)}',
T + ' .ec-hero__stage{order:2;align-self:flex-end;width:60%;margin-top:26px}',
T + ' .ec-stage__cap{position:absolute;right:calc(100% + 14px);bottom:2px;width:min(30vw,13ch);margin:0;text-align:right;font-size:12px}',
T + ' .ec-hero__p{order:3;margin-top:28px;font-size:16px}',
T + ' .ec-scroll{order:4;margin-top:22px}',
T + ' .ec-path{margin-top:48px;padding:16px 0 30px}',
T + ' .ec-path__l{gap:10px 18px}',
T + ' .ec-path__i{font-size:14px;letter-spacing:.1em}',
T + ' .ec-label{font-size:13px}',
T + ' .ec-h2{margin-top:20px;font-size:clamp(48px,13.2vw,66px)}',
T + ' .ec-exp__scene{display:block;margin-top:40px}',
T + ' .ec-shop__frame{aspect-ratio:4/3.4;margin:0 -20px;border-radius:0}',
T + ' .ec-shop .ec-cap{margin-top:12px}',
T + ' .ec-feel{display:flex;flex-direction:column;gap:24px;margin-top:38px}',
T + ' .ec-feel__t{font-size:clamp(30px,8.6vw,38px)}',
T + ' .ec-exp__more{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:14px;margin-top:64px}',
T + ' .ec-crop--a{grid-column:1/8}',
T + ' .ec-crop--b{grid-column:8/13;margin-top:96px}',
T + ' .ec-crop .ec-cap{font-size:12.5px}',
T + ' .ec-exp__p{grid-column:1/-1;margin-top:36px;font-size:16px}',
T + ' .ec-order{margin-top:44px}',
T + ' .ec-line{grid-template-columns:64px minmax(0,1fr);grid-template-areas:"th tag" "th t" "d d";column-gap:16px;row-gap:6px;padding:18px 0}',
T + ' .ec-line__tag{justify-self:start;padding-top:2px;font-size:11px}',
T + ' .ec-line__t{font-size:clamp(25px,7vw,30px);line-height:1.02}',
T + ' .ec-line.is-on .ec-line__t{translate:none}',
T + ' .ec-line__d{margin-top:8px;font-size:15px}',
T + ' .ec-total{flex-direction:column;align-items:flex-start;gap:12px}',
T + ' .ec-total__v{font-size:clamp(42px,12vw,58px);text-align:left}',
T + ' .ec-flow__body{margin-top:40px}',
T + ' .ec-strip{margin:0 -20px;padding:12px 20px 0}',
T + ' .ec-strip__l{gap:6px}',
T + ' .ec-strip__k{display:none}',
T + ' .ec-strip__i.is-on .ec-strip__k{display:block}',
T + ' .ec-strip__i{font-size:12px;letter-spacing:.06em}',
T + ' .ec-strip__n{font-size:11px}',
T + ' .ec-strip__bar{margin-top:10px}',
T + ' .ec-step{grid-template-columns:1fr;row-gap:12px;padding:34px 0}',
T + ' .ec-step__n{padding-top:0}',
T + ' .ec-step__d{grid-column:1;font-size:15.5px}',
T + ' .ec-step__v{font-size:clamp(44px,12.4vw,60px);line-height:.96}',
T + ' .ec-trio__stage{display:block;margin-top:44px;padding:40px 0 30px}',
T + ' .ec-trio__m{width:62%;margin:0 auto}',
T + ' .ec-trio__l{position:absolute;left:0;bottom:64px;width:40%;margin:0}',
T + ' .ec-trio__r{position:absolute;right:0;top:0;width:46%;margin:0}',
T + ' .ec-trio__l figcaption,' + T + ' .ec-trio__r figcaption{display:none}',
T + ' .ec-trio__stage figcaption{margin-top:12px;font-size:13px}',
T + ' .ec-trio__l .ec-trio__f,' + T + ' .ec-trio__r .ec-trio__f{box-shadow:0 18px 40px rgba(0,0,0,.55)}',
T + ' .ec-trio__copy{margin-top:36px}',
T + ' .ec-trio__c{grid-template-columns:1fr;row-gap:10px;padding:20px 0}',
T + ' .ec-sys__t{font-size:clamp(50px,14.6vw,74px);line-height:.94}',
T + ' .ec-sl--b,' + T + ' .ec-sl--d{padding-left:0}',
T + ' .ec-sys__body{display:block;margin-top:44px}',
T + ' .ec-prs{grid-template-columns:1fr}',
T + ' .ec-pr__t{font-size:24px}',
T + ' .ec-fin{padding:86px 0 72px}',
T + ' .ec-fin__grid{display:block}',
T + ' .ec-fin__fig{display:none}',
T + ' .ec-fin__t{font-size:clamp(52px,14.6vw,74px);line-height:.98}',
T + ' .ec-fin__cta{flex-direction:column;gap:11px}',
T + ' .ec-btn{width:100%;height:56px;padding:0 7px 0 18px;font-size:12px}',
T + ' .ec-btn__ico{width:42px;height:42px}',
T + ' n1-header .n1h-bar.site-container{width:calc(100% - 40px)!important;height:64px!important}',
T + ' n1-header .n1h-logo img{width:30px!important;height:30px!important}',
T + ' .n1ft-inner{width:calc(100% - 40px)}',
T + ' .n1ft-top{grid-template-columns:1fr!important;gap:32px;padding:39px 0 36px}',
T + ' .n1ft-col--brand{grid-column:auto}',
T + ' .n1ft-brand{font-size:45px}',
'}',
'@media (max-width:360px){',
T + ' .ec-wrap,' + T + ' .n1ft-inner{width:calc(100% - 32px)}',
T + ' .ec-shop__frame{margin:0 -16px}',
T + ' .ec-strip{margin:0 -16px;padding-left:16px;padding-right:16px}',
T + ' n1-header .n1h-bar.site-container{width:calc(100% - 32px)!important}',
'}',
'@media (prefers-reduced-motion:reduce){',
T + ' .ec *,' + T + ' .ec *::before,' + T + ' .ec *::after{transition-duration:.01ms!important;transition-delay:0s!important}',
T + ' .ec-shop__glitch{display:none!important}',
'}'
  ].join('\n');

  /* ---------- Bileşen ---------- */
  class ETicaretYonetimiV1 extends HTMLElement {
    connectedCallback() {
      if (this._on) return;
      this._on = true;
      this._cleanups = [];
      var base = this.getAttribute('deps-base');
      this._url = function (k) { return (base ? base.replace(/\/?$/, '/') + 'gh@' : CDN) + PATHS[k]; };
      this.classList.add('n1-inner-page');
      var n1MountEpoch = this._n1Epoch = (this._n1Epoch || 0) + 1;
      this._mount().catch((e) => {
        if(n1MobileRepair()&&(!this._on||this._n1Epoch!==n1MountEpoch))return;
        console.error('[' + TAG + ']', e);
        if (!this.querySelector('main.ec')) this.innerHTML = '<p style="padding:40px 5%;color:#ECEBE5;font:16px Barlow,Arial,sans-serif">E-Ticaret Yönetimi yüklenemedi. Lütfen sayfayı yenileyin.</p>';
      });
    }

    _ev(el, ev, fn, opt) { if (!el) return; el.addEventListener(ev, fn, opt); this._cleanups.push(function () { el.removeEventListener(ev, fn, opt); }); }

    async _mount() {
      var n1M=n1MobileRepair(), n1Epoch=this._n1Epoch;
      var n1Alive=()=>this._on&&(!n1M||(this.isConnected&&this._n1Epoch===n1Epoch));
      var self = this, url = this._url;
      if (!document.getElementById(STYLE_ID)) {
        var st = document.createElement('style'); st.id = STYLE_ID; st.textContent = CSS; document.head.appendChild(st);
      }
      this.innerHTML = '<div id="ust" style="height:0"></div>' + markup();
      // 9:16 ekran kutusu (aspect-ratio taşıyıcısı)
      [].forEach.call(this.querySelectorAll('.ec-hero__stage, .ec-trio__m'), function (f) {
        var box = document.createElement('div'); box.className = 'ec-scrbox';
        while (f.firstChild && f.firstChild.nodeName !== 'FIGCAPTION') box.appendChild(f.firstChild);
        f.insertBefore(box, f.firstChild);
      });
      this._anchors();
      this._glitch();
      this._videos(); n1Life(this);
      this._path();
      this._lines();
      this._flow();

      var fonts = loadCss(FONTS).catch(function (e) { console.warn('[' + TAG + '] Font yüklenemedi, yedek font kullanılıyor', e); });
      await Promise.all([n1Optional(loadCss(url('footerCss')),'footer CSS'), n1Optional(loadCss(url('responsive')),'responsive CSS'), loadJs(url('markup'), function () { return !!window.N1_SITE_MARKUP; })]);
      if (!n1Alive()) return;

      var tpl = document.createElement('template');
      tpl.innerHTML = String(window.N1_SITE_MARKUP || '').split('{{ASSETS}}').join(url('assets'));
      var hdr = tpl.content.querySelector('n1-header'), ft = tpl.content.querySelector('[data-n1-footer]'), fc = tpl.content.querySelector('n1-floating-controls');
      if (!hdr || !ft) throw new Error('Onaylı Header/Footer işaretlemesi bulunamadı');
      var main = this.querySelector('main.ec');

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
          } catch (e) { console.warn('[' + TAG + '] Menü verisi okunamadı; onaylı veri olduğu gibi kullanılıyor', e); }
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
        if (self._header.panel) { self._header.panel.classList.add('n1-inner-panel'); self._header.panel.setAttribute('data-n1-ec', ''); }
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

      var otherFc = [].some.call(document.querySelectorAll('n1-floating-controls'), function (f) { return !self.contains(f); }) || !!document.querySelector('.n1fc:not([data-n1-ec])');
      if (fc && !otherFc) {
        var floating = fc.cloneNode(true);
        if (matchMedia('(max-width:1024px)').matches) floating.setAttribute('show-after', '0.5');
        this.append(floating);
        document.body.classList.add('n1-inner-fc-enabled');
        this._fcOwned = true;
      }

      if(n1M)await n1InitHeader().catch(function(e){console.warn('[1N mobile] early header',e);});
      if(!n1Alive())return;
      await n1Optional(fonts,'fonts');
      if (!window.gsap) await loadJs(GSAP, function () { return !!window.gsap; }).catch(function (e) { console.warn('[' + TAG + '] GSAP yüklenemedi; içerik animasyonsuz gösterilir', e); });
      if (window.gsap && !window.ScrollTrigger) await loadJs(ST, function () { return !!window.ScrollTrigger; }).catch(function (e) { console.warn('[' + TAG + '] ScrollTrigger yüklenemedi', e); });
      if (!n1Alive()) return;
      await n1Optional(loadJs(url('links'), null, true),'links');
      if(!n1Alive())return;
      if (!n1M) {
      if (this._header) {
        if (!customElements.get('n1-header')) await loadJs(url('header'), function () { return !!customElements.get('n1-header'); });
        else if (!this._header.panel && this._header.connectedCallback) this._header.connectedCallback();
        if (this._header.panel) { this._header.panel.classList.add('n1-inner-panel'); this._header.panel.setAttribute('data-n1-ec', ''); }
      }
      } else await n1InitHeader().catch(function(e){console.warn('[1N mobile] header',e);});
      if (!n1Alive()) return;
      if (this._footerOwned) await loadJs(url('footerJs'), null, true);
      if (this._fcOwned && !customElements.get('n1-floating-controls')) await loadJs(url('floating'), function () { return !!customElements.get('n1-floating-controls'); });
      var layer = document.querySelector('body > .n1fc:last-of-type'); if (this._fcOwned && layer) layer.setAttribute('data-n1-ec', '');
      if (!n1Alive()) return;
      this._animate();
    }

    _anchors() {
      var a = this.querySelector('.ec-scroll'), self = this;
      this._ev(a, 'click', function (e) {
        e.preventDefault();
        var t = self.querySelector('#ec-deneyim'); if (!t) return;
        scrollTo({ top: t.getBoundingClientRect().top + scrollY - 40, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      });
    }

    /* ---------- Görsel glitch: kısa, tek seferlik ve reduced-motion güvenli ---------- */
    _glitch() {
      var frame = this.querySelector('.ec-shop__frame');
      if (!frame || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      var started = false, timer = null;
      var burst = function () {
        clearTimeout(timer);
        frame.classList.remove('is-glitch');
        // Tekrarlanan hover hareketinde animasyonu güvenilir biçimde yeniden başlat.
        void frame.offsetWidth;
        frame.classList.add('is-glitch');
        timer = setTimeout(function () { frame.classList.remove('is-glitch'); }, 930);
      };
      var obs = new IntersectionObserver(function (entries) {
        if (!started && entries.some(function (entry) { return entry.isIntersecting && entry.intersectionRatio >= .55; })) {
          started = true; obs.disconnect();
          timer = setTimeout(burst, 470);
        }
      }, { threshold: [.55] });
      obs.observe(frame);
      var onEnter = function () { if (matchMedia('(hover:hover) and (prefers-reduced-motion:no-preference)').matches) burst(); };
      this._ev(frame, 'pointerenter', onEnter);
      this._cleanups.push(function () { obs.disconnect(); clearTimeout(timer); frame.classList.remove('is-glitch'); });
    }

    /* ---------- Video: Hero, mağaza ve Büyüme; aynı anda yalnızca bir oynatıcı ---------- */
    _videos() {
      var self = this, reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      var c = navigator.connection || {}, autoOK = !reduced && !c.saveData;
      var VIDS = [];
      var make = function (fig, set) {
        var scr = fig.querySelector('.ec-screen'), v = scr.querySelector('video'), btn = fig.querySelector('.ec-play'), err = scr.querySelector('.ec-screen__err'), prog = scr.querySelector('.ec-screen__prog i');
        if (!v) return { fig: fig, scr: scr, still: true };   // V1.4: telefon/tablette sabit kare (video yok)
        v.defaultMuted = true; v.muted = true; v.playsInline = true; v.setAttribute('webkit-playsinline', ''); if(n1MobileRepair()){v.setAttribute('muted','');v.setAttribute('playsinline','');}
        var P = { fig: fig, scr: scr, v: v, src: pickVideo(set), visible: false, userPaused: false, loaded: false, failed: false, auto: autoOK };
        P.load = function (mode) { if (P.loaded) return; P.loaded = true; v.preload = mode || 'auto'; v.src = P.src; };
        P.play = function () {
          if (P.failed) return;
          P.load();
          VIDS.forEach(function (o) { if (o !== P) { o.v.autoplay = false; if (!o.v.paused) o.v.pause(); } });
          v.autoplay = true;
          var pr = n1Play(v); if (pr && pr.catch) pr.catch(function () { P.sync(); });
        };
        P.sync = function () {
          var playing = !v.paused && !v.ended;
          btn.setAttribute('aria-pressed', String(!playing)); btn.setAttribute('aria-label', playing ? 'Videoyu duraklat' : 'Videoyu oynat');
        };
        ['play', 'pause', 'ended'].forEach(function (e) { self._ev(v, e, P.sync); });
        self._ev(v, 'playing', function () { scr.classList.add('is-started'); });
        self._ev(v, 'timeupdate', function () { if (v.duration) prog.style.transform = 'scaleX(' + (v.currentTime / v.duration).toFixed(4) + ')'; });
        self._ev(v, 'error', function () {
          P.failed = true; scr.classList.add('is-failed'); btn.disabled = true;
          err.textContent = 'Video şu anda yüklenemedi. Görsel alan korunuyor.';
        });
        self._ev(scr.querySelector('.ec-poster'), 'error', function (e) { e.target.remove(); });
        self._ev(btn, 'click', function () { if (v.paused) { P.userPaused = false; P.play(); } else { P.userPaused = true; v.pause(); } });
        self._ev(v, 'canplay', function () { if (P.visible && P.auto && !P.userPaused && v.paused && !document.hidden) P.play(); });
        P.sync();
        VIDS.push(P);
        return P;
      };
      var hero = make(this.querySelector('[data-ec="hero"]'), exactVideo(V_HERO, '720p'));
      var store = make(this.querySelector('[data-ec="store"]'), exactVideo(V_STORE, '480p'));
      var trio = make(this.querySelector('[data-ec="trio"]'), exactVideo(V_TRIO, '720p'));
      this._vids = VIDS;
      n1MediaRecovery(this,VIDS,function(p){return !p.userPaused&&!p.failed&&p.auto!==false&&!matchMedia('(prefers-reduced-motion: reduce)').matches;});
      var io = new IntersectionObserver(function (en) {
        en.forEach(function (e) {
          var P = VIDS.filter(function (o) { return o.fig === e.target; })[0]; if (!P) return;
          P.visible = e.isIntersecting && e.intersectionRatio >= .08;
          if (P.visible && P.auto && !P.userPaused && !document.hidden) P.play();
          else if (!P.visible) { P.v.autoplay = false; if (!P.v.paused) P.v.pause(); }
        });
      }, { threshold: [0, .08, .25, .6] });
      VIDS.forEach(function (P) { io.observe(P.fig); });
      // Destek videoları görünür alana yaklaşılmadan indirilmez
      var near = new IntersectionObserver(function (en, observer) {
        en.forEach(function (e) {
          if (!e.isIntersecting) return;
          var current = e.target === store.fig ? store : trio;
          current.load(autoOK ? 'auto' : 'metadata');
          observer.unobserve(e.target);
        });
      }, { rootMargin: '500px 0px' });
      if (!store.still) near.observe(store.fig); if (!trio.still) near.observe(trio.fig);
      var onVis = function () { VIDS.forEach(function (P) { if (document.hidden) P.v.pause(); else if (P.visible && P.auto && !P.userPaused) P.play(); }); };
      document.addEventListener('visibilitychange', onVis);
      hero.load(autoOK ? 'auto' : 'metadata');
      this._cleanups.push(function () {
        io.disconnect(); near.disconnect(); document.removeEventListener('visibilitychange', onVis);
        VIDS.forEach(function (P) { try { P.v.pause(); P.v.removeAttribute('src'); P.v.load(); } catch (e) {} });
      });
    }

    /* ---------- Hero: alışverişin yolu (görünürken sırayla ilerler) ---------- */
    _path() {
      var self = this, wrap = this.querySelector('.ec-path'), items = [].slice.call(wrap.querySelectorAll('.ec-path__i')), bar = wrap.querySelector('.ec-path__bar');
      var k = 0, timer = null, visible = false;
      var place = function () {
        var it = items[k], r = it.getBoundingClientRect(), w = wrap.getBoundingClientRect();
        bar.style.width = r.width + 'px'; bar.style.transform = 'translateX(' + (r.left - w.left) + 'px)';
      };
      var set = function (i) { k = i; items.forEach(function (it, j) { it.classList.toggle('is-on', j === k); }); place(); };
      var still = matchMedia('(prefers-reduced-motion: reduce)');
      var run = function () {
        clearInterval(timer); timer = null;
        if (still.matches) { items.forEach(function (it) { it.classList.add('is-on'); }); bar.style.width = '0'; return; }
        if (visible && !document.hidden) timer = setInterval(function () { set((k + 1) % items.length); }, 1700);
      };
      var io = new IntersectionObserver(function (en) { visible = en[0].isIntersecting; run(); }, { threshold: .2 });
      io.observe(wrap);
      this._ev(window, 'resize', place);
      this._ev(document, 'visibilitychange', run);
      set(0);
      this._cleanups.push(function () { io.disconnect(); clearInterval(timer); });
    }

    /* ---------- Kapsam: aktif kalem (kaydırma ortası; masaüstünde imleç). GSAP'siz de çalışır ---------- */
    _lines() {
      var self = this, list = this.querySelector('.ec-lines'), rows = [].slice.call(list.querySelectorAll('.ec-line'));
      var scrollK = 0, hoverK = null;
      var apply = function () { var k = hoverK != null ? hoverK : scrollK; rows.forEach(function (r, i) { r.classList.toggle('is-on', i === k); }); };
      var io = new IntersectionObserver(function (en) {
        en.forEach(function (e) { if (e.isIntersecting) scrollK = +e.target.getAttribute('data-i'); });
        apply();
      }, { rootMargin: '-46% 0px -46% 0px' });
      rows.forEach(function (r) { io.observe(r); });
      if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
        rows.forEach(function (r) { self._ev(r, 'pointerenter', function () { hoverK = +r.getAttribute('data-i'); apply(); }); });
        this._ev(list, 'pointerleave', function () { hoverK = null; apply(); });
      }
      this._cleanups.push(function () { io.disconnect(); });
    }

    /* ---------- Akış: ilerleme şeridi (GSAP'siz de çalışır) ---------- */
    _flow() {
      var steps = [].slice.call(this.querySelectorAll('.ec-step')), items = [].slice.call(this.querySelectorAll('.ec-strip__i')), bar = this.querySelector('.ec-strip__bar i');
      var set = function (k) {
        items.forEach(function (it, i) { it.classList.toggle('is-on', i === k); it.classList.toggle('is-done', i < k); });
        steps.forEach(function (s, i) { s.classList.toggle('is-on', i === k); });
        bar.style.transform = 'scaleX(' + ((k + 1) / steps.length) + ')';
      };
      var io = new IntersectionObserver(function (en) {
        en.forEach(function (e) { if (e.isIntersecting) set(+e.target.getAttribute('data-i')); });
      }, { rootMargin: '-45% 0px -50% 0px' });
      steps.forEach(function (s) { io.observe(s); });
      set(0);
      this._cleanups.push(function () { io.disconnect(); });
    }

    /* ---------- Hareket ---------- */
    _animate() {
      var gsap = window.gsap, STg = window.ScrollTrigger, self = this;
      if (!gsap) return;
      if (STg) gsap.registerPlugin(STg);
      var q = function (s, r) { return [].slice.call((r || self).querySelectorAll(s)); };
      var one = function (s) { return self.querySelector(s); };
      // Belirlenimli sahte rastgele (her yüklemede aynı "dağınıklık")
      var rnd = function (i, s) { var x = Math.sin((i + 1) * 12.9898 + s * 78.233) * 43758.5453; return x - Math.floor(x); };

      this._ctx = gsap.context(function () {
        var mm = gsap.matchMedia();

        /* 01 Vitrin: başlık fiyat panosu gibi harf harf döner, film bir ürün yuvası gibi alttan açılır */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          var scr = one('.ec-hero__stage .ec-scrbox');
          var tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
          tl.from(one('.ec-crumb'), { autoAlpha: 0, y: 10, duration: .8 }, .1)
            .from(q('.ec-hero__title .ec-ch'), { rotationX: -96, transformPerspective: 700, yPercent: 30, autoAlpha: 0, duration: 1.1, ease: 'power4.out', stagger: { each: .045, from: 'start' } }, .2)
            .fromTo(scr, { clipPath: 'inset(100% 0% 0% 0% round 6px)' }, { clipPath: 'inset(0% 0% 0% 0% round 6px)', duration: 1.5, ease: 'expo.inOut' }, .35)
            .from(q('.ec-hero__stage .ec-poster, .ec-hero__stage .ec-video'), { scale: 1.18, duration: 2, ease: 'expo.out' }, .6)
            .from(q('.ec-hero__sub .ec-ln>span'), { yPercent: 110, duration: 1, stagger: .1, ease: 'power4.out' }, .95)
            .from(q('.ec-hero__p, .ec-scroll, .ec-stage__cap'), { autoAlpha: 0, y: 14, duration: .9, stagger: .08 }, 1.2)
            .from(q('.ec-path__i'), { autoAlpha: 0, y: 10, duration: .7, stagger: .05 }, 1.35);
          // Kaydırınca film hafifçe yükselir, başlık ters yönde kayar
          if (STg && matchMedia('(min-width:768px)').matches) {
            gsap.to(one('.ec-hero__stage'), { yPercent: -7, ease: 'none', scrollTrigger: { trigger: one('.ec-hero'), start: 'top top', end: 'bottom top', scrub: .6 } });
            gsap.to(one('.ec-hero__title'), { xPercent: -3, ease: 'none', scrollTrigger: { trigger: one('.ec-hero'), start: 'top top', end: 'bottom top', scrub: .6 } });
          }
          return function () { gsap.set(scr, { clearProps: 'clipPath' }); };
        });

        if (!STg) return;

        /* Bölüm başlıkları: maskeden yükselen satırlar */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          q('.ec-sec .ec-h2, .ec-fin__t').forEach(function (h) {
            gsap.from(q('.ec-ln>span', h), { yPercent: 112, duration: 1.15, ease: 'power4.out', stagger: .1, scrollTrigger: { trigger: h, start: 'top 86%', once: true } });
          });
          q('.ec-sec .ec-label, .ec-fin .ec-label').forEach(function (l) {
            gsap.from(l, { autoAlpha: 0, x: -14, duration: .8, ease: 'expo.out', scrollTrigger: { trigger: l, start: 'top 90%', once: true } });
          });
        });

        /* 02 Deneyim: kepenk yukarı sarılır, üç cümle sırayla yanar */
        mm.add({ m: '(prefers-reduced-motion: no-preference) and (max-width: 767px)', d: '(prefers-reduced-motion: no-preference) and (min-width: 768px)' }, function (ctx) {
          var frame = one('.ec-shop__frame'), sh = one('.ec-shutter'), im = one('.ec-shop__img');
          gsap.set(sh, { y: 0, yPercent: 0 });   // CSS'teki açık konum (-101%) piksel olarak okunmasın
          gsap.timeline({ scrollTrigger: { trigger: frame, start: 'top 82%', end: ctx.conditions.m ? 'top 22%' : 'top 30%', scrub: .7 } })
            .to(sh, { yPercent: -101, ease: 'power2.inOut', duration: 1 }, 0)
            .fromTo(im, { scale: 1.12 }, { scale: 1, ease: 'power2.out', duration: 1 }, 0);
          gsap.fromTo(im, { yPercent: -3 }, { yPercent: 3, ease: 'none', scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true } });
          var feel = q('.ec-feel__i');
          gsap.set(feel, { opacity: .18 });
          feel.forEach(function (f, i) {
            gsap.to(f, { opacity: 1, ease: 'none', scrollTrigger: { trigger: ctx.conditions.m ? f : frame, start: ctx.conditions.m ? 'top 82%' : 'top ' + (66 - i * 14) + '%', end: ctx.conditions.m ? 'top 62%' : 'top ' + (56 - i * 14) + '%', scrub: .5 } });
          });
          gsap.from(q('.ec-feel__t'), { yPercent: 40, duration: 1, ease: 'expo.out', stagger: .12, scrollTrigger: { trigger: one('.ec-feel'), start: 'top 88%', once: true } });
          // Destek kareleri: farklı hızlarda kayar, kenardan açılır
          q('.ec-crop').forEach(function (c, i) {
            var fr = c.querySelector(i ? '.ec-crop__img' : '.ec-crop__screen');
            if (fr) gsap.fromTo(fr, { clipPath: i ? 'inset(0% 0% 100% 0%)' : 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut', scrollTrigger: { trigger: c, start: 'top 85%', once: true } });
            if (ctx.conditions.d) gsap.fromTo(c, { y: i ? 60 : 20 }, { y: i ? -40 : -10, ease: 'none', scrollTrigger: { trigger: one('.ec-exp__more'), start: 'top bottom', end: 'bottom top', scrub: true } });
          });
          gsap.from(one('.ec-exp__p'), { autoAlpha: 0, y: 20, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: one('.ec-exp__p'), start: 'top 90%', once: true } });
          return function () { gsap.set(sh, { clearProps: 'all' }); gsap.set(feel, { clearProps: 'opacity' }); };
        });

        /* 03 Kapsam: kalemler hesap fişi gibi satır satır yazılır; toplam en sonda belirir */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          var rows = q('.ec-line');
          rows.forEach(function (r) {
            gsap.from([r.querySelector('.ec-line__t'), r.querySelector('.ec-line__d'), r.querySelector('.ec-line__tag')], { autoAlpha: 0, x: -18, duration: .9, ease: 'expo.out', stagger: .07, scrollTrigger: { trigger: r, start: 'top 92%', once: true } });
          });
          gsap.from(one('.ec-order__h'), { autoAlpha: 0, duration: .8, scrollTrigger: { trigger: one('.ec-order'), start: 'top 88%', once: true } });
          gsap.from(one('.ec-total__k'), { autoAlpha: 0, x: -14, duration: .8, ease: 'expo.out', scrollTrigger: { trigger: one('.ec-total'), start: 'top 90%', once: true } });
          gsap.from(q('.ec-total .ec-ln>span'), { yPercent: 110, duration: 1.2, ease: 'power4.out', scrollTrigger: { trigger: one('.ec-total'), start: 'top 90%', once: true } });
          gsap.from(one('.ec-scope__lede'), { autoAlpha: 0, y: 18, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: one('.ec-scope__lede'), start: 'top 90%', once: true } });
        });

        /* 04 Akış: her fiil soldan sağa "dolar"; ödeme adımları gibi */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          q('.ec-step').forEach(function (s) {
            var f = s.querySelector('.ec-step__fill');
            gsap.fromTo(f, { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: s, start: 'top 86%', end: 'top 38%', scrub: .5 } });
            gsap.from([s.querySelector('.ec-step__n'), s.querySelector('.ec-step__d')], { autoAlpha: 0, y: 16, duration: .9, ease: 'expo.out', stagger: .08, scrollTrigger: { trigger: s, start: 'top 80%', once: true } });
          });
          gsap.from(one('.ec-flow__lede'), { autoAlpha: 0, y: 18, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: one('.ec-flow__lede'), start: 'top 90%', once: true } });
          gsap.from(q('.ec-strip__i'), { autoAlpha: 0, y: 8, duration: .7, stagger: .06, ease: 'expo.out', scrollTrigger: { trigger: one('.ec-strip'), start: 'top 92%', once: true } });
        });

        /* 05 Üçlü: içerik ve performans kareleri dışarıdan gelip büyüme filminin iki yanına yaklaşır */
        mm.add({ m: '(prefers-reduced-motion: no-preference) and (max-width: 767px)', t: '(prefers-reduced-motion: no-preference) and (min-width: 768px) and (max-width: 1024px)', d: '(prefers-reduced-motion: no-preference) and (min-width: 1025px)' }, function (ctx) {
          var stage = one('.ec-trio__stage'), l = one('.ec-trio__l'), r = one('.ec-trio__r'), m = one('.ec-trio__m .ec-scrbox');
          var far = ctx.conditions.d ? .75 : ctx.conditions.t ? .5 : .3;
          var tl = gsap.timeline({ scrollTrigger: { trigger: stage, start: 'top 88%', end: ctx.conditions.m ? 'center 60%' : 'center 55%', scrub: .8 } });
          tl.fromTo(l, { xPercent: -38 * far, yPercent: 16 * far, rotation: -2.5 * far }, { xPercent: 0, yPercent: 0, rotation: 0, ease: 'power2.out', duration: 1 }, 0)
            .fromTo(r, { xPercent: 38 * far, yPercent: -16 * far, rotation: 2.5 * far }, { xPercent: 0, yPercent: 0, rotation: 0, ease: 'power2.out', duration: 1 }, 0)
            .fromTo(m, { scale: .9, clipPath: 'inset(8% 10% 8% 10% round 6px)' }, { scale: 1, clipPath: 'inset(0% 0% 0% 0% round 6px)', ease: 'power2.out', duration: 1 }, 0);
          q('.ec-trio__img').forEach(function (im) { gsap.fromTo(im, { scale: 1.14 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: stage, start: 'top bottom', end: 'bottom top', scrub: true } }); });
          gsap.from(q('.ec-trio__c'), { autoAlpha: 0, y: 24, duration: 1, ease: 'expo.out', stagger: .12, scrollTrigger: { trigger: one('.ec-trio__copy'), start: 'top 88%', once: true } });
          return function () { gsap.set([l, r, m], { clearProps: 'all' }); };
        });

        /* 06 Sistem: dağınık harfler ("tek tek") kaydırdıkça hizaya girer; "işleyen sistemler" bütün hâlinde yükselir */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          var t = one('.ec-sys__t'), ch = q('.ec-sl--a .ec-ch, .ec-sl--b .ec-ch');
          gsap.fromTo(ch, {
            yPercent: function (i) { return (rnd(i, 1) - .5) * 70; },
            xPercent: function (i) { return (rnd(i, 2) - .5) * 40; },
            rotation: function (i) { return (rnd(i, 3) - .5) * 26; },
            opacity: function (i) { return .3 + rnd(i, 4) * .5; }
          }, { yPercent: 0, xPercent: 0, rotation: 0, opacity: 1, ease: 'power2.out', stagger: { each: .012, from: 'random' }, scrollTrigger: { trigger: t, start: 'top 88%', end: 'top 34%', scrub: .7 } });
          gsap.from(q('.ec-sl--c .ec-ln>span, .ec-sl--d .ec-ln>span'), { yPercent: 112, duration: 1.2, ease: 'power4.out', stagger: .12, scrollTrigger: { trigger: one('.ec-sl--c'), start: 'top 82%', once: true } });
          gsap.from(one('.ec-sys__p'), { autoAlpha: 0, y: 18, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: one('.ec-sys__body'), start: 'top 88%', once: true } });
          q('.ec-pr').forEach(function (p, i) {
            gsap.from(p, { autoAlpha: 0, y: 18, duration: .9, ease: 'expo.out', delay: (i % 2) * .08, scrollTrigger: { trigger: p, start: 'top 92%', once: true } });
          });
          return function () { gsap.set(ch, { clearProps: 'all' }); };
        });

        /* 07 Final: görsel aşağıdan açılır, başlık ve butonlar sırayla gelir */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          var fig = one('.ec-fin__fig');
          gsap.fromTo(fig, { clipPath: 'inset(100% 0% 0% 0% round 4px)' }, { clipPath: 'inset(0% 0% 0% 0% round 4px)', duration: 1.6, ease: 'expo.inOut', scrollTrigger: { trigger: one('.ec-fin'), start: 'top 70%', once: true } });
          gsap.from(q('.ec-fin__sub, .ec-fin__cta'), { autoAlpha: 0, y: 20, duration: .9, ease: 'expo.out', stagger: .1, scrollTrigger: { trigger: one('.ec-fin__sub'), start: 'top 92%', once: true } });
          return function () { gsap.set(fig, { clearProps: 'clipPath' }); };
        });

        /* Masaüstü + imleç: vitrin filmi imlece çok hafif eğilir */
        mm.add('(prefers-reduced-motion: no-preference) and (min-width: 1025px) and (hover: hover)', function () {
          var hero = one('.ec-hero'), st = one('.ec-hero__stage .ec-scrbox');
          gsap.set(st, { transformPerspective: 900 });
          var rx = gsap.quickTo(st, 'rotationX', { duration: .9, ease: 'power3' }), ry = gsap.quickTo(st, 'rotationY', { duration: .9, ease: 'power3' });
          var mv = function (e) { var r = hero.getBoundingClientRect(), nx = (e.clientX - r.left) / r.width - .5, ny = (e.clientY - r.top) / r.height - .5; ry(nx * 6); rx(ny * -4); };
          hero.addEventListener('pointermove', mv);
          return function () { hero.removeEventListener('pointermove', mv); gsap.set(st, { clearProps: 'transform' }); };
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
      this._n1Epoch=(this._n1Epoch||0)+1;
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
      this._fcOwned = false; this._footerOwned = false; this._header = null; this._vids = null;
      this.replaceChildren();
      var st = document.getElementById(STYLE_ID); if (st && !document.querySelector(TAG)) st.remove();
    }
  }
  customElements.define(TAG, ETicaretYonetimiV1);
})();
