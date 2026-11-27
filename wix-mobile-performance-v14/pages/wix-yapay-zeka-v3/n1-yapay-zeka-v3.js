/* MOBILE PERFORMANCE V1.4 — n1-yapay-zeka-v3.js = v2 + telefon/tablette ikincil videolar (üretim, hikâye) yerine WebP kare; hero videosu korunur; belge yaşam döngüsü. Tag name DEĞİŞMEDİ: n1-yapay-zeka-v2. */
/* GLOBAL MENU V1.2 (wix-global-menu-v12/pages) — kaynak: wix-sitewide-mobile-fix-2026-11-26/wix-yapay-zeka-v2/n1-yapay-zeka-v2.js @f97db8ed. Değişen tek şey: Header/markup adresleri (v12) ve Hizmetler satırı. */
/*!
 * n1-yapay-zeka-v2 — 1N Digital Media · AI / Yapay Zekâ (/yapay-zeka) · Beyond the Prompt / Fikrin ötesindeki zekâ
 * Wix Studio Custom Element · Tag name: n1-yapay-zeka-v2 · Kaynak: bu dosyanın HTTPS adresi
 * Bağımsız V1 sürümü; diğer hizmet sayfalarına, onaylı Header/Footer ve ana sayfa kaynaklarına dokunulmadı.
 *
 * Fikir: bir istem (prompt) satırının sonunda yanıp sönen imleç. Sayfa o imlecin ötesine geçer:
 *  01 Hero          "YAPAY" ile "ZEKÂ." arasına bir imleç düşer; imleç açılır ve sinematik videonun penceresi olur.
 *  02 İnsan         HUMAN VISION × ARTIFICIAL INTELLIGENCE kaydırdıkça buluşur; insanın ve teknolojinin getirdikleri.
 *  03 Üretim        HAYAL ET. YÖNET. ÜRET. Beş alan, beş farklı kompozisyon (görsel, kare video, bant, diyagonal, şerit).
 *  04 Creative Lab  Creative Direction Mixer: aynı mevcut görsellerin üç sanat yönetimi yorumu (yeni görsel üretilmez).
 *  05 Süreç         altı aşama; kaydırdıkça her aşamanın adı "yazılır" (kontur dolar), merdiven düzeni.
 *  06 Hareket       dikey video ve videoyla eşzamanlı bölümler: tek bir tuştan bir dünyaya.
 *  07 Sorumluluk    "ÜRETMEK YETMEZ." üstü çizilir; teslimden önce sorulan sekiz soru.
 *  08 Gelecek       iki cümlenin arasında bir görsel; girişte bir kez kontrollü kanal ayrışması.
 *  09 Final         "GELECEĞİ BİRLİKTE ÜRETELİM." bir istem gibi yazılır.
 *
 * Mimari: Light DOM, sınıf öneki ai-. Onaylı v6.48 Header + menü, Footer, WhatsApp / Yukarı Çık modülleri commit'e sabit
 * adreslerden aynen yüklenir; sayfada başka bir Header / Footer / kontrol katmanı varsa ikincisi oluşturulmaz.
 * GSAP 3.13.0 + ScrollTrigger yalnızca sayfada yoksa yüklenir. Pin ve spacer yok; animasyonlar gsap.context + matchMedia içinde.
 * Videolar: poster yok, autoplay özniteliği yok; muted + playsinline + loop. Aynı anda yalnızca bir video oynar,
 * görünmeyen durur, uzaktakiler indirilmez. Video kaynakları verilen çözünürlüklerle kullanılır.
 * İçerik CSS'te gizlenmez: GSAP yüklenemezse ya da hareket azaltma açıksa sayfa son hâliyle görünür.
 *
 * İsteğe bağlı öznitelik (yalnızca Wix dışı önizleme için): deps-base="<klasör>/"
 */
(function () {
  'use strict';
  var TAG = 'n1-yapay-zeka-v2';
  var STYLE_ID = 'n1-ai2-style';
  if (customElements.get(TAG)) return;

  /* ---------- Onaylı kaynaklar (commit'e sabit) ---------- */
  var CDN = 'https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@';
  var C648 = 'd24fa373d6d76c0218b3f3b77897a8c2ace04e5e';
  var CM12 = '162599ec580db98d848cf6670bcde7ee30bf97f5';   /* GLOBAL MENU V1.2: Hizmetler alt menülü markup + header v12 */
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
  var PARTNER_ART = {
    tablet: 'https://static.wixstatic.com/media/6dbf5e_800ff5a00ba244f9bb31761a6b2d713d~mv2.png',
    mobile: 'https://static.wixstatic.com/media/6dbf5e_32b849155e954320a1f6479f27fd6ad2~mv2.png'
  };


  /* ---------- Medya (içerikler gerçek tarayıcıda açılarak incelendi) ---------- */
  // Videolar verilen çözünürlüklerde kullanılır; başka çözünürlük adresi üretilmez.
  var VID = {
    hero: { src: 'https://video.wixstatic.com/video/6dbf5e_8da46d06b07a4784a27a413446f081f9/720p/mp4/file.mp4', w: 720, h: 1280, first: 0 },
    // 720×1280 · 30 sn · mavi, bloklu bir yüzeyin üzerinde ilerleyen kamera; ufukta turuncu-kırmızı ışık bandı
    gen: { src: 'https://video.wixstatic.com/video/6dbf5e_e177591c89e44710be97a52b3e6284f1/1080p/mp4/file.mp4', w: 1080, h: 1080, first: 0 },
    // 1080×1080 · 15 sn · açık zeminde renkli parçalar: ızgara dağılır, tek tek nesnelere ayrılır, yoğun şeritlere yeniden dizilir
    story: { src: 'https://video.wixstatic.com/video/6dbf5e_6c47eb3e5ef6409fb3285c7623d6054f/1080p/mp4/file.mp4', w: 608, h: 1080, first: 1.2 }
    // 608×1080 · 15 sn · beyaz zeminde büyüteç simgeli tek bir tuş; tuşlar çoğalır, bloklardan bir yapı kurulur,
    // pikselli bir bulut karlı bir manzarada bir ağaca dönüşür, arkada kutup ışıkları
  };
  // Hareket bölümündeki video bölümleri (saniyeler videonun gerçek karelerine göre belirlendi)
  var CHAPTERS = [
    { t: 0, k: 'GİRDİ', h: 'Tek bir tuş', d: 'Her şey tek bir girdiyle başlar: bir soru, bir cümle, bir niyet.' },
    { t: 3, k: 'ÇOĞALMA', h: 'Çoğalan parçalar', d: 'Fikir, birbirine benzeyen ama aynı olmayan seçeneklere ayrılır.' },
    { t: 5, k: 'YAPI', h: 'Bir düzen kurulur', d: 'Seçilen parçalar bir ritim ve bir kompozisyon içinde yerine oturur.' },
    { t: 8.8, k: 'DÜNYA', h: 'Bir dünya belirir', d: 'Yönetilen fikir bir sahneye, bir atmosfere, bir anlatıya dönüşür.' }
  ];

  var IMG_BASE = 'https://static.wixstatic.com/media/6dbf5e_';
  // fit: genişlik w, yükseklik serbest (h = 3w). Orijinal dosya biçimi korunur (jpg/png).
  function img(m, w) { w = Math.min(w, m.w); return IMG_BASE + m.id + '~mv2.' + m.ext + '/v1/fit/w_' + w + ',h_' + (w * 3) + ',q_84,enc_auto/yapay-zeka.' + m.ext; }
  function srcset(m, ws) {
    var out = [];
    (ws || [480, 800, 1200, 1800, 2400]).forEach(function (w) { var r = Math.min(w, m.w); if (out.indexOf(r) < 0) out.push(r); });
    return out.map(function (w) { return img(m, w) + ' ' + w + 'w'; }).join(', ');
  }
  function pic(m, cls, alt, sizes, pos, opt) {
    opt = opt || {};
    return '<img class="' + cls + '" src="' + img(m, opt.w || 800) + '" srcset="' + srcset(m, opt.ws) + '" sizes="' + sizes + '" alt="' + alt + '"' +
      ' width="' + m.w + '" height="' + m.h + '"' + (opt.eager ? '' : ' loading="lazy"') + ' decoding="async"' + (pos ? ' style="object-position:' + pos + '"' : '') + '>';
  }
  var IM = {
    // 4023×7152 · beyaz, kuşbakışı bir zeminde dağılmış küçük cam kapsüller; içlerinde renkli nesneler
    capsules: { id: '213b57a103524b5da4db006dcf318a75', ext: 'jpg', w: 4023, h: 7152 },
    // 6000×4000 · mavi-mint gökyüzünde süzülen yarı saydam turkuaz bir form, altında pembe camsı bir silindir
    sky: { id: 'ed75aad55db941a78d36e905680b6d77', ext: 'jpg', w: 6000, h: 4000 },
    // 4000×7112 · kırmızı-turuncu yarı saydam bir cam yüzey, üzerinde yuvarlak hatlı şekiller; mavi-sarı dalgalı dokular
    glass: { id: 'bba6915d52c14a27acc0f7074c6d946b', ext: 'jpg', w: 4000, h: 7112 },
    // 1448×1086 · koyu panelli, yeşil ışıklı bir zeminde ışıklı bir istem kutusu: "How do large language models work?"
    prompt: { id: '3e07eec967bf47a2b71121d0ebe2542b', ext: 'png', w: 1448, h: 1086 },
    // 7104×4000 · siyah zeminde mavi dalgalı bir çerçevenin içinde kırmızı-kahve dokulu bir yüzey, turuncu ışık çizgileri
    wave: { id: 'db1b918073474a1d9abc99edc81b8b88', ext: 'jpg', w: 7104, h: 4000 }
  };

  /* ---------- Yardımcılar ---------- */

  /* Mobile/tablet reliability hotfix — preserve desktop rendering. */
  function n1MobileRepair(){return matchMedia('(max-width: 900px), (max-width: 1366px) and (hover: none) and (pointer: coarse)').matches;}

  /* ---------- V1.4 · cihaz profili, mobil sabit kareler, belge yaşam döngüsü (wix-mobile-performance-v14/RESOURCE_LIFECYCLE.md) ---------- */
  // Hafif profil = telefon ve tablet (iPad yatay, izleme dörtgenli iPad dahil; dokunmatik ekran her zaman vardır). Sayfa açılışında BİR KEZ belirlenir:
  // döndürme ya da pencere boyutu değişince medya yeniden seçilmez (yükleme/çözücü dalgalanması olmaz). Masaüstü (yalnız fare/izleme dörtgeni) her genişlikte videoyu korur.
  var N1_LITE = (function () { try { return matchMedia('(any-pointer: coarse) and (max-width: 1366px)').matches || matchMedia('(max-width: 900px) and (hover: none)').matches; } catch (e) { return false; } })();
  var N1_STILLS = 'https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@274e02bbda53e00b186c4d1b82349edc9dd32009/wix-mobile-performance-v14/media/stills/yapay-zeka/';
  var N1_STILL = {"yapay-gen":{"w":1080,"h":1080,"ws":[480,720,960,1080]},"yapay-story":{"w":608,"h":1080,"ws":[480,608]}};
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
  // İkonlar: tek 16'lık ızgara, 1.5 çizgi, aria-hidden
  var SV = ' viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" aria-hidden="true" focusable="false"';
  var I = {
    arrow: '<svg class="ai-ico"' + SV + '><path d="M4.5 11.5l7-7M5.5 4.5h6v6"/></svg>',
    down: '<svg class="ai-ico"' + SV + '><path d="M8 3v10M3.5 8.5L8 13l4.5-4.5"/></svg>',
    play: '<svg class="ai-ico ai-ico--play"' + SV + '><path d="M5 3.5v9l7-4.5z"/></svg>',
    pause: '<svg class="ai-ico ai-ico--pause"' + SV + '><path d="M5.5 3.5v9M10.5 3.5v9"/></svg>',
    prev: '<svg class="ai-ico"' + SV + '><path d="M13 8H3M7.5 3.5L3 8l4.5 4.5"/></svg>',
    next: '<svg class="ai-ico"' + SV + '><path d="M3 8h10M8.5 3.5L13 8l-4.5 4.5"/></svg>'
  };
  function ln(t, cls) { return '<span class="ai-ln' + (cls ? ' ' + cls : '') + '"><span>' + t + '</span></span>'; }
  function chars(t, cls) { return '<span class="ai-chs' + (cls ? ' ' + cls : '') + '">' + Array.from(t).map(function (c) { return c === ' ' ? '<span class="ai-sp"> </span>' : '<span class="ai-ch">' + c + '</span>'; }).join('') + '</span>'; }

  /* ---------- İçerik ---------- */
  var PROD = [
    { n: '01', k: 'AI VISUAL PRODUCTION', w: 'GÖRSEL', d: 'Kreatif konseptler, kampanya görselleri, görsel varyasyonlar ve yaratıcı sanat yönetimi.' },
    { n: '02', k: 'AI VIDEO PRODUCTION', w: 'VİDEO', d: 'Sinematik sahneler, hareketli içerikler, yaratıcı video konseptleri ve video üretim süreçleri.' },
    { n: '03', k: 'AI CONTENT DEVELOPMENT', w: 'İÇERİK', d: 'Marka diline uygun fikir geliştirme, içerik konseptleri, metin alternatifleri ve kampanya planlama.' },
    { n: '04', k: 'AI CREATIVE DIRECTION', w: 'YÖN', d: 'Fikirden son çıktıya kadar görsel kimlik, kompozisyon, mesaj ve estetik tutarlılığın yönetimi.' },
    { n: '05', k: 'AI-ENHANCED DIGITAL EXPERIENCES', w: 'DENEYİM', d: 'Etkileşimli web deneyimleri, yaratıcı prototipler ve uygun projelerde yapay zekâ destekli dijital etkileşimler.' }
  ];
  var FLOW = [
    { n: '01', k: 'IDEA', d: 'Yaratıcı fikir ve proje hedefinin belirlenmesi.' },
    { n: '02', k: 'DIRECTION', d: 'Sanat yönetimi, görsel referanslar, stil ve kompozisyon kararları.' },
    { n: '03', k: 'GENERATION', d: 'Uygun yapay zekâ araçlarıyla alternatiflerin oluşturulması.' },
    { n: '04', k: 'REFINEMENT', d: 'Sonuçların değerlendirilmesi, yönlendirmelerin iyileştirilmesi ve gerekli düzenlemelerin yapılması.' },
    { n: '05', k: 'HUMAN REVIEW', d: 'Görsel bütünlük, marka uyumu, gerçekçilik, haklar ve kalite kontrolü.' },
    { n: '06', k: 'DELIVERY', d: 'Doğru platform, format ve kampanya gereksinimlerine uygun teslim.' }
  ];
  var CHECKS = [
    { k: 'Marka bütünlüğü', q: 'Bu çıktı markanın sesi, tonu ve değerleriyle aynı yerde duruyor mu?' },
    { k: 'Görsel tutarlılık', q: 'Renk, ışık, kompozisyon ve karakterler bir seriden diğerine aynı kalıyor mu?' },
    { k: 'Üretim kalitesi', q: 'Çözünürlük, detay ve kusurlar yayın ortamının gerektirdiği seviyede mi?' },
    { k: 'Kaynak ve kullanım hakları', q: 'Kullanılan araçların ve girdilerin hakları bu kullanım için uygun mu?' },
    { k: 'Gerçekçilik kontrolü', q: 'Eller, yazılar, ürün detayları ve fizik kuralları doğru görünüyor mu?' },
    { k: 'İnsan değerlendirmesi', q: 'Bu çıktıyı yayına almadan önce bir uzman gözü onayladı mı?' },
    { k: 'Veri gizliliği', q: 'Araçlara verilen bilgiler marka ve kişi verilerini koruyor mu?' },
    { k: 'Yanıltıcı içerik', q: 'Çıktı gerçek olmayan bir şeyi gerçekmiş gibi gösteriyor mu?' }
  ];
  // Creative Direction Mixer: her yorumun karar kaydı
  var DIRS = {
    cinematic: { n: '01', t: 'Cinematic', tr: 'Sinematik', s: 'Geniş kadraj, yavaş ritim, karanlık bir sahnede tek bir başlık.',
      log: { Maske: 'Sinemaskop şeritler (2,39:1)', Tipografi: 'Altta, geniş harf aralığıyla tek satır', Oran: 'Tek ana görsel, tam genişlik', Ritim: 'Yavaş, 1,4 sn geçiş', Renk: 'Koyu sahne, sıcak ışık', Hareket: 'Yumuşak, uzun yavaşlama' } },
    editorial: { n: '02', t: 'Editorial', tr: 'Editoryal', s: 'Kâğıt zemin, asimetrik ızgara, okuma sırası belli bir sayfa düzeni.',
      log: { Maske: 'Dik dikdörtgen kadraj, kenar boşluklu', Tipografi: 'Solda büyük, iki satırlık başlık', Oran: 'Ana görsel %55, ikinci görsel küçük', Ritim: 'Net, 0,8 sn geçiş', Renk: 'Kırık beyaz zemin, koyu metin', Hareket: 'Kararlı, kısa yavaşlama' } },
    experimental: { n: '03', t: 'Experimental', tr: 'Deneysel', s: 'Kırık açı, kanal ayrışması ve görselin üzerine taşan dev tipografi.',
      log: { Maske: 'Eğik, kırpılmış çokgen', Tipografi: 'Görselin üzerine taşan dev başlık', Oran: 'İki görsel üst üste, kaydırılmış', Ritim: 'Hızlı, sekmeli 0,6 sn geçiş', Renk: 'Yeşil vurgu, renk kanalları ayrık', Hareket: 'Sıçrayan, ani duruşlu' } }
  };
  var DIR_KEYS = ['cinematic', 'editorial', 'experimental'];

  var I2 = {
    caret: '<span class="ai-caret" aria-hidden="true"></span>',
    x: '<svg class="ai-ico ai-ico--x" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" aria-hidden="true" focusable="false"><path d="M8 8l24 24M32 8L8 32"/></svg>'
  };
  function vid(key, cls, label) {
    var v = VID[key];
    if (N1_LITE && key !== 'hero' && N1_STILL['yapay-' + key]) return '<div class="ai-vid ' + cls + ' is-ready" data-still="' + key + '" style="--ar:' + v.w + '/' + v.h + '">' + n1StillHtml('yapay-' + key, label) + '</div>';   // V1.4
    return '<div class="ai-vid ' + cls + '" data-v="' + key + '" style="--ar:' + v.w + '/' + v.h + '">' +
      '<video muted playsinline webkit-playsinline loop preload="none" disablepictureinpicture aria-label="' + label + '" width="' + v.w + '" height="' + v.h + '"></video>' +
      '<button type="button" class="ai-play" data-paused="1" aria-label="Videoyu oynat">' + I.play + I.pause + '</button>' +
      '<p class="ai-vid__err" role="status"></p>' +
    '</div>';
  }

  function markup() {
    return '<main class="ai" id="icerik">' +
/* 01 — Hero */
'<section class="ai-hero" aria-labelledby="ai-hero-t">' +
  '<div class="ai-wrap">' +
    '<p class="ai-kick"><span>1N Digital Media</span><span>AI / Yapay zekâ</span></p>' +
    '<div class="ai-hero__stage">' +
      '<h1 class="ai-hero__t" id="ai-hero-t"><span class="ai-hw ai-hw--a">' + chars('YAPAY') + '</span> <span class="ai-hw ai-hw--b">' + chars('ZEKÂ.') + '</span></h1>' +
      vid('hero', 'ai-hero__win', 'Mavi, bloklu bir yüzeyin üzerinde ilerleyen kamera; ufukta turuncu bir ışık bandı') +
      '<span class="ai-hero__caret" aria-hidden="true"></span>' +
    '<div class="ai-hero__foot">' +
      '<p class="ai-hero__msg">' + ln('FİKRİN') + ln('ÖTESİNDE.' + I2.caret, 'ai-ln--acc') + '</p>' +
      '<div class="ai-hero__side">' +
        '<p class="ai-hero__sub">Yaratıcılığın sınırlarını teknolojiyle yeniden keşfediyoruz. Yapay zekâyı fikir geliştirmeden görsel üretime, videodan dijital deneyimlere kadar yaratıcı süreçlerimizin bir parçası hâline getiriyoruz.</p>' +
        '<a class="ai-scroll" href="#ai-lab">Creative Lab\'i deneyin' + I.down + '</a>' +
      '</div>' +
    '</div>' +
    '</div>' +
  '</div>' +
'</section>' +

/* 02 — İnsan × Zekâ */
'<section class="ai-sec ai-human" aria-labelledby="ai-human-t">' +
  '<div class="ai-wrap">' +
    '<div class="ai-human__top">' +
      '<div class="ai-human__copy">' +
        '<p class="ai-mark">Human × Intelligence' + I2.caret + '</p>' +
        '<h2 class="ai-h2" id="ai-human-t">' + ln('YARATICILIK') + ln('İNSANLA') + ln('BAŞLAR.', 'ai-ln--acc') + '</h2>' +
        '<p class="ai-human__sub"><span>Teknoloji olasılıkları genişletir.</span> <span>Yönü yaratıcı düşünce belirler.</span></p>' +
        '<p class="ai-body">Bizim için yapay zekâ, yaratıcı kararların yerine geçen bir sistem değil; araştırma, keşif, prototipleme ve üretim süreçlerimizi geliştiren bir araçtır.</p>' +
      '</div>' +
      '<figure class="ai-human__fig">' + pic(IM.prompt, 'ai-human__img', 'Koyu, yeşil ışıklı bir zeminde ışıklı bir istem kutusu; içinde "How do large language models work?" yazıyor', '(max-width:767px) 90vw, (max-width:1024px) 60vw, 40vw', '50% 40%', { ws: [480, 800, 1200, 1448] }) +
        '<figcaption class="ai-cap">Her üretim bir soruyla başlar. Soruyu soran, cevabı değerlendiren insandır.</figcaption></figure>' +
    '</div>' +
    '<div class="ai-eq" aria-hidden="true"><span class="ai-eq__a">HUMAN VISION</span><span class="ai-eq__x">' + I2.x + '</span><span class="ai-eq__b">ARTIFICIAL INTELLIGENCE</span></div>' +
    '<p class="ai-sr">Human vision çarpı artificial intelligence: insan vizyonu ile yapay zekânın birlikteliği.</p>' +
    '<div class="ai-pair">' +
      '<div class="ai-pair__col"><p class="ai-pair__h">İnsan getirir</p><ul class="ai-pair__l"><li>Amaç ve bağlam</li><li>Beğeni ve sanat yönetimi</li><li>Marka bilgisi</li><li>Son karar ve sorumluluk</li></ul></div>' +
      '<div class="ai-pair__col"><p class="ai-pair__h">Teknoloji getirir</p><ul class="ai-pair__l"><li>Hızlı keşif</li><li>Çok sayıda varyasyon</li><li>Prototip ve deneme</li><li>Yeni üretim biçimleri</li></ul></div>' +
    '</div>' +
  '</div>' +
'</section>' +

/* 03 — Üretim */
'<section class="ai-sec ai-prod" aria-labelledby="ai-prod-t">' +
  '<div class="ai-wrap">' +
    '<p class="ai-mark">AI Creative Production' + I2.caret + '</p>' +
    '<h2 class="ai-prod__t" id="ai-prod-t"><span class="ai-pw">HAYAL ET.</span> <span class="ai-pw">YÖNET.</span> <span class="ai-pw ai-pw--acc">ÜRET.</span></h2>' +
    '<p class="ai-prod__lede ai-body">Yapay zekâ destekli yaratıcı üretimde araç değişir, yaklaşım değişmez: önce fikir, sonra yön, en son üretim. Aşağıdaki görsel ve videolar bu yaklaşımın atmosferini gösterir; müşteri işi olarak sunulmaz.</p>' +
    '<div class="ai-pr ai-pr--1">' +
      '<figure class="ai-pr__fig">' + pic(IM.glass, 'ai-pr__img', 'Kırmızı-turuncu yarı saydam bir cam yüzey, üzerinde yuvarlak hatlı şekiller ve mavi-sarı dalgalı dokular', '(max-width:767px) 90vw, 38vw', '45% 52%') + '</figure>' +
      '<div class="ai-pr__copy"><p class="ai-pr__n">' + PROD[0].n + '</p><h3 class="ai-pr__k">' + PROD[0].k + '</h3><p class="ai-pr__d">' + PROD[0].d + '</p></div>' +
      '<p class="ai-pr__w" aria-hidden="true">' + PROD[0].w + '</p>' +
    '</div>' +
    '<div class="ai-pr ai-pr--2">' +
      '<div class="ai-pr__copy"><p class="ai-pr__n">' + PROD[1].n + '</p><h3 class="ai-pr__k">' + PROD[1].k + '</h3><p class="ai-pr__d">' + PROD[1].d + '</p></div>' +
      '<div class="ai-pr__media">' + vid('gen', 'ai-pr__vid', 'Açık zeminde renkli parçalardan oluşan bir ızgara dağılıp yeniden diziliyor') + '</div>' +
      '<p class="ai-pr__w" aria-hidden="true">' + PROD[1].w + '</p>' +
    '</div>' +
    '<div class="ai-pr ai-pr--3">' +
      '<figure class="ai-pr__fig">' + pic(IM.capsules, 'ai-pr__img', 'Beyaz, kuşbakışı bir zeminde dağılmış küçük cam kapsüller; içlerinde renkli nesneler', '(max-width:767px) 100vw, 90vw', '50% 38%', { ws: [800, 1200, 1800, 2400] }) + '</figure>' +
      '<div class="ai-pr__copy"><p class="ai-pr__n">' + PROD[2].n + '</p><h3 class="ai-pr__k">' + PROD[2].k + '</h3><p class="ai-pr__d">' + PROD[2].d + '</p></div>' +
    '</div>' +
    '<div class="ai-pr ai-pr--4">' +
      '<figure class="ai-pr__fig">' + pic(IM.wave, 'ai-pr__img', 'Siyah zeminde mavi dalgalı bir çerçeve; içinde kırmızı-kahve dokulu bir yüzey ve turuncu ışık çizgileri', '(max-width:767px) 90vw, 58vw', '40% 50%', { ws: [800, 1200, 1800, 2400] }) + '</figure>' +
      '<div class="ai-pr__copy"><p class="ai-pr__n">' + PROD[3].n + '</p><h3 class="ai-pr__k">' + PROD[3].k + '</h3><p class="ai-pr__d">' + PROD[3].d + '</p></div>' +
    '</div>' +
    '<div class="ai-pr ai-pr--5">' +
      '<div class="ai-pr__copy"><p class="ai-pr__n">' + PROD[4].n + '</p><h3 class="ai-pr__k">' + PROD[4].k + '</h3><p class="ai-pr__d">' + PROD[4].d + ' Bu sayfadaki Creative Lab, böyle bir prototipin küçük bir örneğidir.</p></div>' +
      '<figure class="ai-pr__fig">' + pic(IM.sky, 'ai-pr__img', 'Mavi-mint gökyüzünde süzülen yarı saydam turkuaz bir form ve altında pembe camsı bir silindir', '(max-width:767px) 100vw, 90vw', '50% 46%', { ws: [800, 1200, 1800, 2400] }) + '</figure>' +
    '</div>' +
  '</div>' +
'</section>' +

/* 04 — AI Creative Lab */
'<section class="ai-sec ai-lab" id="ai-lab" aria-labelledby="ai-lab-t">' +
  '<div class="ai-wrap">' +
    '<div class="ai-lab__head">' +
      '<div><p class="ai-mark">AI Creative Lab' + I2.caret + '</p>' +
      '<h2 class="ai-h2 ai-lab__t" id="ai-lab-t">' + ln(chars('YARATICILIĞI')) + ln(chars('DENEYİMLE.'), 'ai-ln--acc') + '</h2></div>' +
      '<div class="ai-lab__intro"><p class="ai-body">Aynı fikir, aynı görseller, üç farklı sanat yönetimi kararı. Bir yaklaşım seçin; maske, tipografi, oran, ritim, renk ve hareket birlikte değişir.</p>' +
      '<p class="ai-lab__note"><strong>Creative Direction Demo.</strong> Bu alan yeni görsel üretmez ve bir yapay zekâ servisine bağlanmaz; sayfadaki mevcut iki görselin üç tasarım yorumunu gösterir.</p></div>' +
    '</div>' +
    '<div class="ai-lab__grid">' +
      '<fieldset class="ai-dirs"><legend class="ai-dirs__l">Creative Direction Mixer · bir yaklaşım seçin</legend>' +
        DIR_KEYS.map(function (k, i) { var d = DIRS[k]; return '<label class="ai-dir"><input type="radio" name="ai-dir" value="' + k + '"' + (i === 0 ? ' checked' : '') + '><span class="ai-dir__b"><span class="ai-dir__n">' + d.n + '</span><span class="ai-dir__t">' + d.t + '</span><span class="ai-dir__s">' + d.tr + ': ' + d.s + '</span></span></label>'; }).join('') +
      '</fieldset>' +
      '<div class="ai-mixwrap">' +
        '<div class="ai-mix" data-dir="cinematic" role="img" aria-label="Sinematik yorum: geniş kadrajlı, koyu sahnede gökyüzünde süzülen form ve altta tek satır başlık">' +
          '<span class="ai-mix__bar ai-mix__bar--t" aria-hidden="true"></span><span class="ai-mix__bar ai-mix__bar--b" aria-hidden="true"></span>' +
          '<div class="ai-mix__a"><div class="ai-mix__ai">' +
            pic(IM.sky, 'ai-mix__img', '', '(max-width:767px) 92vw, 62vw', '50% 46%', { ws: [800, 1200, 1800, 2400] }) +
            '<span class="ai-mix__ch ai-mix__ch--r" aria-hidden="true">' + pic(IM.sky, 'ai-mix__img', '', '(max-width:767px) 92vw, 62vw', '50% 46%', { ws: [800, 1200, 1800, 2400] }) + '</span>' +
            '<span class="ai-mix__ch ai-mix__ch--c" aria-hidden="true">' + pic(IM.sky, 'ai-mix__img', '', '(max-width:767px) 92vw, 62vw', '50% 46%', { ws: [800, 1200, 1800, 2400] }) + '</span>' +
          '</div></div>' +
          '<div class="ai-mix__b">' + pic(IM.wave, 'ai-mix__img', '', '(max-width:767px) 40vw, 20vw', '62% 46%') + '</div>' +
          '<p class="ai-mix__h" aria-hidden="true"><span>FİKRİN</span> <span>ÖTESİNDE.</span></p>' +
          '<p class="ai-mix__s" aria-hidden="true">Yaratıcılığın sınırlarını teknolojiyle yeniden keşfediyoruz.</p>' +
          '<p class="ai-mix__m" aria-hidden="true"><span data-mix="n">01</span><span data-mix="t">Cinematic</span></p>' +
        '</div>' +
        '<p class="ai-mix__tag">Temsili yorum · mevcut görseller kullanılır, yeni görsel üretilmez</p>' +
      '</div>' +
      '<div class="ai-log">' +
        '<p class="ai-log__h">Karar kaydı</p>' +
        '<dl class="ai-log__l">' + Object.keys(DIRS.cinematic.log).map(function (k) { return '<div class="ai-log__r"><dt>' + k + '</dt><dd data-log="' + k + '">' + DIRS.cinematic.log[k] + '</dd></div>'; }).join('') + '</dl>' +
        '<p class="ai-sr" data-mix="live" aria-live="polite"></p>' +
      '</div>' +
    '</div>' +
  '</div>' +
'</section>' +

/* 05 — Fikirden çıktıya */
'<section class="ai-sec ai-flow" aria-labelledby="ai-flow-t">' +
  '<div class="ai-wrap">' +
    '<p class="ai-mark">From Idea to Output' + I2.caret + '</p>' +
    '<h2 class="ai-h2" id="ai-flow-t">' + ln('BİR FİKİR.') + ln('SAYISIZ OLASILIK.', 'ai-ln--acc') + '</h2>' +
    '<ol class="ai-steps">' + FLOW.map(function (s, i) {
      return '<li class="ai-step" style="--i:' + i + '"><span class="ai-step__n">' + s.n + '</span>' +
        '<p class="ai-step__k"><span class="ai-step__o" aria-hidden="true">' + s.k + '</span><span class="ai-step__f">' + s.k + '</span></p>' +
        '<p class="ai-step__d">' + s.d + '</p></li>';
    }).join('') + '</ol>' +
  '</div>' +
'</section>' +

/* 06 — Hareket */
'<section class="ai-sec ai-motion" aria-labelledby="ai-motion-t">' +
  '<div class="ai-wrap ai-motion__grid">' +
    '<div class="ai-motion__copy">' +
      '<p class="ai-mark">Motion & Generative Storytelling' + I2.caret + '</p>' +
      '<h2 class="ai-h2 ai-motion__t" id="ai-motion-t">' + ln('HAREKET') + ln('BİR ANLATIYA') + ln('DÖNÜŞÜR.', 'ai-ln--acc') + '</h2>' +
      '<p class="ai-body">Yapay zekâ destekli video üretimi, farklı sahne yaklaşımlarının hızlı keşfedilmesine, görsel fikirlerin prototiplenmesine ve yeni anlatım biçimlerinin geliştirilmesine olanak tanır.</p>' +
      '<p class="ai-body ai-body--strong">Ancak sahnenin anlamını, markayla ilişkisini ve final kalitesini yaratıcı yönetim belirler.</p>' +
    '</div>' +
    '<div class="ai-motion__stage">' +
      vid('story', 'ai-motion__vid', 'Beyaz zeminde tek bir tuş çoğalarak bloklardan bir yapıya, sonra karlı bir manzarada bir ağaca dönüşüyor') +
      '<p class="ai-motion__word" aria-hidden="true"><span>' + CHAPTERS[0].k + '</span></p>' +
    '</div>' +
    '<ol class="ai-chap" aria-label="Video bölümleri">' + CHAPTERS.map(function (c, i) {
      var s = Math.floor(c.t), mm = '00:' + (s < 10 ? '0' : '') + s;
      return '<li><button type="button" class="ai-chap__b' + (i ? '' : ' is-on') + '" data-t="' + c.t + '" aria-current="' + (i ? 'false' : 'true') + '">' +
        '<span class="ai-chap__t">' + mm + '</span><span class="ai-chap__h">' + c.h + '</span><span class="ai-chap__d">' + c.d + '</span><span class="ai-chap__p" aria-hidden="true"><i></i></span></button></li>';
    }).join('') + '</ol>' +
  '</div>' +
'</section>' +

/* 07 — Sorumlu üretim */
'<section class="ai-sec ai-resp" aria-labelledby="ai-resp-t">' +
  '<div class="ai-wrap">' +
    '<p class="ai-mark">Responsible Intelligence' + I2.caret + '</p>' +
    '<h2 class="ai-resp__t" id="ai-resp-t"><span class="ai-resp__a">' + ln('ÜRETMEK') + ln('YETMEZ.') + '<span class="ai-strike" aria-hidden="true"></span></span>' +
      '<span class="ai-resp__b">' + ln('DOĞRU') + ln('ÜRETMEK') + ln('GEREKİR.', 'ai-ln--acc') + '</span></h2>' +
    '<div class="ai-resp__body">' +
      '<blockquote class="ai-resp__q"><p>Her üretilebilen içerik kullanılmaya hazır değildir.</p></blockquote>' +
      '<p class="ai-body">İyi bir yaratıcı üretim süreci yalnızca çıktının oluşmasına değil, doğru değerlendirilmesine de dayanır. Bu yüzden her çıktı, teslimden önce aynı soruların önünden geçer.</p>' +
    '</div>' +
    '<ol class="ai-checks">' + CHECKS.map(function (c, i) { return '<li class="ai-check"><span class="ai-check__n">' + (i < 9 ? '0' : '') + (i + 1) + '</span><span class="ai-check__k">' + c.k + '</span><span class="ai-check__q">' + c.q + '</span></li>'; }).join('') + '</ol>' +
    '<p class="ai-resp__foot">Bu sorular bir sertifika ya da garanti değildir; her projede insan değerlendirmesiyle yanıtlanan çalışma kurallarımızdır.</p>' +
  '</div>' +
'</section>' +

/* 08 — Gelecek */
'<section class="ai-sec ai-future" aria-labelledby="ai-future-t">' +
  '<div class="ai-wrap">' +
    '<p class="ai-mark">The Future is Collaborative' + I2.caret + '</p>' +
    '<h2 class="ai-future__t" id="ai-future-t">' +
      '<span class="ai-future__a">' + ln('GELECEK') + ln('TEKNOLOJİYLE') + ln('DEĞİL.') + '</span>' +
      '<span class="ai-future__b">' + ln('YARATICILIKLA') + ln('ŞEKİLLENİR.', 'ai-ln--acc') + '</span>' +
    '</h2>' +
  '</div>' +
  '<figure class="ai-future__fig">' +
    '<div class="ai-gl">' + pic(IM.wave, 'ai-gl__img', 'Siyah zeminde mavi dalgalı bir çerçeve; içinde kırmızı-kahve dokulu bir yüzey ve turuncu ışık çizgileri', '100vw', '42% 50%', { ws: [800, 1200, 1800, 2400] }) +
      '<span class="ai-gl__ch ai-gl__ch--r" aria-hidden="true">' + pic(IM.wave, 'ai-gl__img', '', '100vw', '42% 50%', { ws: [800, 1200, 1800, 2400] }) + '</span>' +
      '<span class="ai-gl__ch ai-gl__ch--c" aria-hidden="true">' + pic(IM.wave, 'ai-gl__img', '', '100vw', '42% 50%', { ws: [800, 1200, 1800, 2400] }) + '</span>' +
    '</div>' +
  '</figure>' +
  '<div class="ai-wrap ai-future__foot">' +
    '<ul class="ai-trio"><li><span>İnsan düşüncesi</span> bir yön belirler.</li><li><span>Yaratıcı yönlendirme</span> o yönü bir dile çevirir.</li><li><span>Gelişen üretim teknolojileri</span> o dilin ulaşabileceği yeri genişletir.</li></ul>' +
  '</div>' +
'</section>' +

/* 09 — Final */
'<section class="ai-fin" aria-labelledby="ai-fin-t">' +
  '<div class="ai-wrap">' +
    '<p class="ai-mark">Beyond the Prompt' + I2.caret + '</p>' +
    '<h2 class="ai-fin__t" id="ai-fin-t"><span class="ai-fin__l">' + chars('GELECEĞİ') + '</span><span class="ai-fin__l">' + chars('BİRLİKTE') + '</span><span class="ai-fin__l ai-fin__l--acc">' + chars('ÜRETELİM.') + '<span class="ai-fin__caret" aria-hidden="true"></span></span></h2>' +
    '<div class="ai-fin__row">' +
      '<p class="ai-fin__sub">Yapay zekâ destekli yaratıcı fikirlerden görsel ve video üretimine kadar markanız için yeni olasılıkları birlikte keşfedelim.</p>' +
      '<div class="ai-fin__cta">' +
        '<a class="ai-btn ai-btn--primary" href="/iletisim"><span>Projenizi Konuşalım</span><span class="ai-btn__ico">' + I.arrow + '</span></a>' +
        '<a class="ai-btn ai-btn--ghost" href="/teklif-al"><span>Teklif Al</span><span class="ai-btn__ico">' + I.arrow + '</span></a>' +
      '</div>' +
    '</div>' +
  '</div>' +
'</section>' +
'</main>';
  }

  /* ---------- CSS (yalnızca n1-yapay-zeka-v2 kapsamında) ---------- */
  var CSS = "n1-yapay-zeka-v2{--bg:#080A09;--g1:#0D0F0E;--g2:#121513;--ink:#ECEBE5;--soft:#BDBCB5;--mute:#9A9B95;--dim:#6E706A;--ghost:#2B2E2B;--line:rgba(228,227,221,.12);--line2:rgba(228,227,221,.07);--acc:#A8CF62;--ease:cubic-bezier(.22,1,.36,1);\n  --hdr:88px;--gap:clamp(18px,2.2vw,40px);--secpad:clamp(100px,8.6vw,168px);display:block;position:relative;width:100%;background:var(--bg);color:var(--ink);font:400 17px/1.6 Barlow,Arial,sans-serif;-webkit-font-smoothing:antialiased;overflow-x:clip;text-align:left}\nn1-yapay-zeka-v2 *,n1-yapay-zeka-v2 *::before,n1-yapay-zeka-v2 *::after{box-sizing:border-box;min-width:0}\nn1-yapay-zeka-v2 :where(.ai) :where(p,h1,h2,h3,ul,ol,figure,figcaption){margin:0}\nn1-yapay-zeka-v2 :where(.ai) :where(ul,ol){padding:0;list-style:none}\nn1-yapay-zeka-v2 :where(.ai) :where(a){color:inherit}\nn1-yapay-zeka-v2 :where(.ai) :where(button){font:inherit;color:inherit;background:none;border:0;padding:0;margin:0;cursor:pointer;-webkit-tap-highlight-color:transparent}\nn1-yapay-zeka-v2 .ai :focus-visible{outline:2px solid var(--acc);outline-offset:3px}\nn1-yapay-zeka-v2 .ai img{display:block;max-width:none}\nn1-yapay-zeka-v2 .ai-ico{display:block;flex:none}\nn1-yapay-zeka-v2 .ai-sr{position:absolute!important;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}\nn1-yapay-zeka-v2 .ai-wrap{width:90%;margin-left:auto;margin-right:auto}\nn1-yapay-zeka-v2 .ai-sec{position:relative;padding:var(--secpad) 0;border-top:1px solid var(--line)}\nn1-yapay-zeka-v2 .ai-label{display:flex;align-items:center;gap:12px;font:500 15px/1.3 Barlow,Arial,sans-serif;color:var(--mute)}\nn1-yapay-zeka-v2 .ai-label::before{content:\"\";flex:none;width:7px;height:7px;border-radius:1px;background:var(--acc)}\nn1-yapay-zeka-v2 .ai-ln{display:block;overflow:hidden;padding:.17em 0 .09em;margin:-.17em 0 -.09em}\nn1-yapay-zeka-v2 .ai-ln>span{display:block}\nn1-yapay-zeka-v2 .ai-ln--acc{color:var(--acc)}\nn1-yapay-zeka-v2 .ai-chs{display:inline-block;white-space:nowrap}\nn1-yapay-zeka-v2 .ai-ch{display:inline-block;will-change:transform}\nn1-yapay-zeka-v2 .ai-sp{display:inline-block;width:.24em}\nn1-yapay-zeka-v2 .ai-h2{margin-top:clamp(26px,2.4vw,40px);font:700 clamp(60px,7.4vw,148px)/1 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:-.016em;color:var(--ink)}\nn1-yapay-zeka-v2 .ai-cap{margin-top:14px;font-size:14px;line-height:1.5;color:var(--mute)}\nn1-yapay-zeka-v2 .ai-btn{position:relative;display:inline-flex;align-items:center;justify-content:space-between;gap:22px;height:64px;padding:0 10px 0 28px;border-radius:12px;overflow:hidden;white-space:nowrap;isolation:isolate;\n  font:500 13.5px/1 Barlow,Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase;text-decoration:none;color:var(--ink);border:1px solid rgba(168,207,98,.42);background:rgba(16,19,17,.72);transition:color .45s var(--ease),border-color .45s ease;touch-action:manipulation}\nn1-yapay-zeka-v2 .ai-btn::before{content:\"\";position:absolute;inset:0;z-index:-1;background:var(--acc);transform:scaleX(0);transform-origin:0 50%;transition:transform .6s cubic-bezier(.65,0,.35,1)}\nn1-yapay-zeka-v2 .ai-btn__ico{display:grid;place-items:center;width:44px;height:44px;border-radius:8px;background:rgba(168,207,98,.12);transition:background-color .45s ease}\nn1-yapay-zeka-v2 .ai-btn--ghost{border-color:rgba(228,227,221,.22);background:rgba(8,10,9,.5)}\nn1-yapay-zeka-v2 .ai-btn--ghost .ai-btn__ico{background:rgba(236,235,229,.06)}\nn1-yapay-zeka-v2 .ai-btn:hover,n1-yapay-zeka-v2 .ai-btn:focus-visible{color:#0A0B0B;border-color:var(--acc)}\nn1-yapay-zeka-v2 .ai-btn:hover::before,n1-yapay-zeka-v2 .ai-btn:focus-visible::before{transform:scaleX(1)}\nn1-yapay-zeka-v2 .ai-btn:hover .ai-btn__ico,n1-yapay-zeka-v2 .ai-btn:focus-visible .ai-btn__ico{background:rgba(10,11,11,.12)}\n.n1h-panel[data-n1-ai],.n1h-panel[data-n1-ai] *,.n1h-panel[data-n1-ai] *::before,.n1h-panel[data-n1-ai] *::after{box-sizing:border-box}\n.n1h-panel[data-n1-ai] a.n1h-item{text-decoration:none;color:#ecebe6}\n.n1h-panel[data-n1-ai] .n1h-sub a{text-decoration:none}\n@media (max-width:1024px){.n1h-panel[data-n1-ai][data-open]::before{content:\"\";position:fixed;left:0;right:0;bottom:0;top:72px;z-index:-1;pointer-events:none;background:rgba(8,10,9,.8);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}}\n@media (max-width:767px){.n1h-panel[data-n1-ai][data-open]::before{top:64px}}\nn1-yapay-zeka-v2 .n1ft-partner-art{display:none}\nn1-yapay-zeka-v2 .ai-mark{display:flex;align-items:center;gap:.2em;font:500 15px/1.3 Barlow,Arial,sans-serif;color:var(--mute)}\nn1-yapay-zeka-v2 .ai-mark .ai-caret{width:2px;height:1.05em;margin-left:.3em}\nn1-yapay-zeka-v2 .ai-caret{display:inline-block;flex:none;width:.075em;height:.74em;margin-left:.07em;vertical-align:-.02em;background:var(--acc)}\nn1-yapay-zeka-v2 .ai-h2{margin-top:clamp(24px,2.2vw,36px);font:700 clamp(58px,7.2vw,140px)/.96 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:-.012em;color:var(--ink)}\nn1-yapay-zeka-v2 .ai-body{margin-top:22px;max-width:46ch;font-size:clamp(17px,1.2vw,20px);line-height:1.6;color:var(--soft)}\nn1-yapay-zeka-v2 .ai-body--strong{color:var(--ink);font-weight:500}\nn1-yapay-zeka-v2 .ai-cap{margin-top:14px;max-width:46ch;font-size:14px;line-height:1.5;color:var(--mute)}\nn1-yapay-zeka-v2 .ai-ico{width:16px;height:16px}\nn1-yapay-zeka-v2 .ai-vid{position:relative;overflow:hidden;aspect-ratio:var(--ar);background:var(--g1)}\nn1-yapay-zeka-v2 .ai-vid video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .7s var(--ease)}\nn1-yapay-zeka-v2 .ai-vid.is-ready video{opacity:1}\nn1-yapay-zeka-v2 .ai-play{position:absolute;right:12px;bottom:12px;z-index:3;display:grid;place-items:center;width:44px;height:44px;border-radius:50%;color:var(--ink);background:rgba(8,10,9,.62);border:1px solid rgba(236,235,229,.26);transition:background-color .3s var(--ease),border-color .3s var(--ease)}\nn1-yapay-zeka-v2 .ai-play:hover{background:rgba(8,10,9,.86);border-color:var(--acc)}\nn1-yapay-zeka-v2 .ai-play .ai-ico{width:16px;height:16px}\nn1-yapay-zeka-v2 .ai-play[data-paused=\"1\"] .ai-ico--pause,n1-yapay-zeka-v2 .ai-play[data-paused=\"0\"] .ai-ico--play{display:none}\nn1-yapay-zeka-v2 .ai-play:disabled{opacity:.4;cursor:default}\nn1-yapay-zeka-v2 .ai-vid__err{position:absolute;left:14px;right:66px;bottom:16px;z-index:2;font-size:13px;line-height:1.4;color:var(--soft)}\nn1-yapay-zeka-v2 .ai-vid__err:empty{display:none}\nn1-yapay-zeka-v2 .ai-hero{position:relative;padding:calc(var(--hdr) + clamp(22px,2.6vw,44px)) 0 clamp(80px,7vw,128px);overflow:hidden}\nn1-yapay-zeka-v2 .ai-kick{display:flex;flex-wrap:wrap;gap:6px 26px;font:500 15px/1.3 Barlow,Arial,sans-serif;color:var(--mute)}\nn1-yapay-zeka-v2 .ai-kick span:first-child{color:var(--ink)}\nn1-yapay-zeka-v2 .ai-hero__stage{--win:min(clamp(210px,24vw,420px),max(200px,calc((100svh - var(--hdr) - 190px) * .5625)));--fs:clamp(64px,11vw,212px);position:relative;display:flex;flex-wrap:wrap;justify-content:center;margin-top:clamp(18px,2vw,34px)}\nn1-yapay-zeka-v2 .ai-hero__win{position:relative;z-index:1;width:var(--win);aspect-ratio:9/16;border-radius:3px}\nn1-yapay-zeka-v2 .ai-hero__t{position:absolute;left:0;right:0;top:50%;z-index:2;display:grid;grid-template-columns:minmax(0,1fr) var(--win) minmax(0,1fr);transform:translateY(-50%);font:700 var(--fs)/.9 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:-.01em;color:var(--ink);pointer-events:none}\nn1-yapay-zeka-v2 .ai-hw{display:block;padding-top:.12em;white-space:nowrap}\nn1-yapay-zeka-v2 .ai-hw--a{grid-column:1;justify-self:end;margin-right:clamp(14px,1.8vw,34px)}\nn1-yapay-zeka-v2 .ai-hw--b{grid-column:3;justify-self:start;margin-left:clamp(14px,1.8vw,34px)}\nn1-yapay-zeka-v2 .ai-hero__caret{position:absolute;left:50%;top:50%;z-index:3;width:5px;height:calc(var(--fs) * .74);margin:calc(var(--fs) * -.37) 0 0 -2.5px;background:var(--acc);opacity:0;pointer-events:none}\nn1-yapay-zeka-v2 .ai-hero__foot{flex:0 0 100%;display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:end;margin-top:clamp(40px,4.4vw,76px)}\nn1-yapay-zeka-v2 .ai-hero__msg{grid-column:1/7;font:700 clamp(46px,5.2vw,100px)/.96 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:-.01em}\nn1-yapay-zeka-v2 .ai-hero__side{grid-column:8/13;padding-bottom:.4em}\nn1-yapay-zeka-v2 .ai-hero__sub{max-width:44ch;font-size:clamp(17px,1.25vw,21px);line-height:1.6;color:var(--soft)}\n@media (min-width:1025px) and (min-height:820px){\nn1-yapay-zeka-v2 .ai-hero{padding-bottom:clamp(70px,6vw,110px)}\nn1-yapay-zeka-v2 .ai-hero__foot{position:absolute;left:0;right:0;bottom:0;z-index:2;margin:0;grid-template-columns:minmax(0,1fr) var(--win) minmax(0,1fr);column-gap:0;pointer-events:none}\nn1-yapay-zeka-v2 .ai-hero__foot a{pointer-events:auto}\nn1-yapay-zeka-v2 .ai-hero__msg{grid-column:1;justify-self:end;margin-right:clamp(14px,1.8vw,34px);font-size:clamp(40px,4.3vw,90px)}\nn1-yapay-zeka-v2 .ai-hero__side{grid-column:3;margin-left:clamp(14px,1.8vw,34px);padding-bottom:0}\nn1-yapay-zeka-v2 .ai-hero__sub{max-width:34ch;font-size:clamp(16px,1.12vw,19px)}\n}\nn1-yapay-zeka-v2 .ai-scroll{display:inline-flex;align-items:center;gap:10px;min-height:44px;margin-top:20px;font:600 15px/1 Barlow,Arial,sans-serif;color:var(--ink);text-decoration:none}\nn1-yapay-zeka-v2 .ai-scroll .ai-ico{color:var(--acc);transition:transform .4s var(--ease)}\nn1-yapay-zeka-v2 .ai-scroll:hover .ai-ico{transform:translateY(3px)}\nn1-yapay-zeka-v2 .ai-human__top{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:start}\nn1-yapay-zeka-v2 .ai-human__copy{grid-column:1/7}\nn1-yapay-zeka-v2 .ai-human__sub{margin-top:30px;font:600 clamp(20px,1.7vw,30px)/1.3 Barlow,Arial,sans-serif;color:var(--ink)}\nn1-yapay-zeka-v2 .ai-human__sub span{display:block}\nn1-yapay-zeka-v2 .ai-human__fig{grid-column:8/13;margin-top:clamp(70px,9vw,170px)}\nn1-yapay-zeka-v2 .ai-human__img{width:100%;height:auto;aspect-ratio:4/3;object-fit:cover;border-radius:3px;background:var(--g1)}\nn1-yapay-zeka-v2 .ai-eq{display:flex;align-items:center;justify-content:center;gap:clamp(14px,1.8vw,34px);margin-top:clamp(80px,8vw,150px);font:700 clamp(28px,4.4vw,88px)/1 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:.01em;white-space:nowrap}\nn1-yapay-zeka-v2 .ai-eq__a{color:var(--ink)}\nn1-yapay-zeka-v2 .ai-eq__b{color:transparent;-webkit-text-stroke:1px rgba(236,235,229,.55)}\nn1-yapay-zeka-v2 .ai-eq__x{display:block;color:var(--acc)}\nn1-yapay-zeka-v2 .ai-eq__x .ai-ico{width:.72em;height:.72em}\nn1-yapay-zeka-v2 .ai-pair{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:clamp(40px,6vw,120px);max-width:880px;margin:clamp(44px,4vw,70px) auto 0}\nn1-yapay-zeka-v2 .ai-pair__h{font:600 15px/1.3 Barlow,Arial,sans-serif;color:var(--acc)}\nn1-yapay-zeka-v2 .ai-pair__l{margin-top:12px}\nn1-yapay-zeka-v2 .ai-pair__l li{padding:9px 0;font:500 clamp(19px,1.5vw,26px)/1.3 Barlow,Arial,sans-serif;color:var(--ink)}\nn1-yapay-zeka-v2 .ai-prod__t{display:flex;flex-wrap:wrap;gap:0 .26em;margin-top:clamp(24px,2.2vw,36px);font:700 clamp(62px,10vw,196px)/.96 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:-.012em}\nn1-yapay-zeka-v2 .ai-pw{display:inline-block;padding-top:.1em}\nn1-yapay-zeka-v2 .ai-pw--acc{color:var(--acc)}\nn1-yapay-zeka-v2 .ai-prod__lede{max-width:54ch}\nn1-yapay-zeka-v2 .ai-pr{position:relative;display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:end;margin-top:clamp(100px,10vw,190px)}\nn1-yapay-zeka-v2 .ai-pr__fig{position:relative;overflow:hidden;border-radius:3px;background:var(--g1)}\nn1-yapay-zeka-v2 .ai-pr__img{display:block;width:100%;height:100%;object-fit:cover}\nn1-yapay-zeka-v2 .ai-pr__copy{position:relative;z-index:2}\nn1-yapay-zeka-v2 .ai-pr__n{font:600 15px/1 Barlow,Arial,sans-serif;color:var(--acc);font-variant-numeric:tabular-nums}\nn1-yapay-zeka-v2 .ai-pr__k{margin-top:14px;font:700 clamp(30px,3vw,58px)/1 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:.004em;color:var(--ink)}\nn1-yapay-zeka-v2 .ai-pr__d{margin-top:16px;max-width:40ch;font-size:clamp(16px,1.15vw,19px);line-height:1.6;color:var(--soft)}\nn1-yapay-zeka-v2 .ai-pr__w{position:absolute;z-index:1;font:700 clamp(96px,16vw,310px)/.8 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:-.02em;color:transparent;-webkit-text-stroke:1px rgba(236,235,229,.2);white-space:nowrap;pointer-events:none}\nn1-yapay-zeka-v2 .ai-pr--1 .ai-pr__fig{grid-column:1/6;aspect-ratio:4/5}\nn1-yapay-zeka-v2 .ai-pr--1 .ai-pr__copy{grid-column:7/12;padding-bottom:clamp(20px,4vw,80px)}\nn1-yapay-zeka-v2 .ai-pr--1 .ai-pr__w{left:-.04em;bottom:-.12em}\nn1-yapay-zeka-v2 .ai-pr--2{align-items:center}\nn1-yapay-zeka-v2 .ai-pr--2 .ai-pr__copy{grid-column:1/6;grid-row:1}\nn1-yapay-zeka-v2 .ai-pr--2 .ai-pr__media{grid-column:7/13;grid-row:1}\nn1-yapay-zeka-v2 .ai-pr--2 .ai-pr__vid{width:100%;border-radius:3px}\nn1-yapay-zeka-v2 .ai-pr--2 .ai-pr__w{right:-.02em;bottom:-.14em}\nn1-yapay-zeka-v2 .ai-pr--3 .ai-pr__fig{grid-column:1/-1;aspect-ratio:21/8}\nn1-yapay-zeka-v2 .ai-pr--3 .ai-pr__copy{grid-column:1/-1;display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:end;margin-top:clamp(24px,2.4vw,40px)}\nn1-yapay-zeka-v2 .ai-pr--3 .ai-pr__n,n1-yapay-zeka-v2 .ai-pr--3 .ai-pr__k{grid-column:1/8}\nn1-yapay-zeka-v2 .ai-pr--3 .ai-pr__d{grid-column:8/13;grid-row:1/3}\nn1-yapay-zeka-v2 .ai-pr--4 .ai-pr__fig{grid-column:1/9;aspect-ratio:16/10}\nn1-yapay-zeka-v2 .ai-pr--4 .ai-pr__copy{grid-column:9/13;padding-bottom:6px}\nn1-yapay-zeka-v2 .ai-pr--5 .ai-pr__copy{grid-column:1/8}\nn1-yapay-zeka-v2 .ai-pr--5 .ai-pr__fig{grid-column:1/-1;aspect-ratio:5/1;margin-top:clamp(30px,3vw,52px)}\nn1-yapay-zeka-v2 .ai-lab__head{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:end}\nn1-yapay-zeka-v2 .ai-lab__head>div:first-child{grid-column:1/8}\nn1-yapay-zeka-v2 .ai-lab__intro{grid-column:8/13}\nn1-yapay-zeka-v2 .ai-lab__intro .ai-body{margin-top:0}\nn1-yapay-zeka-v2 .ai-lab__note{margin-top:18px;max-width:46ch;padding-left:14px;border-left:2px solid var(--acc);font-size:15px;line-height:1.55;color:var(--soft)}\nn1-yapay-zeka-v2 .ai-lab__note strong{color:var(--ink);font-weight:600}\nn1-yapay-zeka-v2 .ai-lab__grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);margin-top:clamp(50px,5vw,90px);align-items:start}\nn1-yapay-zeka-v2 .ai-dirs{grid-column:1/4;grid-row:1;min-width:0;margin:0;padding:0;border:0}\nn1-yapay-zeka-v2 .ai-dirs__l{padding:0;font:500 14px/1.4 Barlow,Arial,sans-serif;color:var(--mute)}\nn1-yapay-zeka-v2 .ai-dir{position:relative;display:block;margin-top:10px;cursor:pointer}\nn1-yapay-zeka-v2 .ai-dir input{position:absolute;inset:0;width:100%;height:100%;margin:0;opacity:0;cursor:pointer}\nn1-yapay-zeka-v2 .ai-dir__b{display:grid;grid-template-columns:auto minmax(0,1fr);column-gap:14px;row-gap:6px;padding:16px 18px;border-radius:10px;border:1px solid var(--line);background:#0D0F0E;transition:border-color .35s var(--ease),background-color .35s var(--ease)}\nn1-yapay-zeka-v2 .ai-dir__n{font:600 14px/1.5 Barlow,Arial,sans-serif;color:var(--mute);font-variant-numeric:tabular-nums}\nn1-yapay-zeka-v2 .ai-dir__t{font:700 clamp(24px,1.9vw,32px)/1 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:.02em;text-transform:uppercase;color:var(--soft)}\nn1-yapay-zeka-v2 .ai-dir__s{grid-column:2;font-size:14px;line-height:1.45;color:var(--mute)}\nn1-yapay-zeka-v2 .ai-dir:hover .ai-dir__b{border-color:rgba(236,235,229,.3)}\nn1-yapay-zeka-v2 .ai-dir input:checked+.ai-dir__b{border-color:var(--acc);background:rgba(168,207,98,.08)}\nn1-yapay-zeka-v2 .ai-dir input:checked+.ai-dir__b .ai-dir__n,n1-yapay-zeka-v2 .ai-dir input:checked+.ai-dir__b .ai-dir__t{color:var(--acc)}\nn1-yapay-zeka-v2 .ai-dir input:checked+.ai-dir__b .ai-dir__s{color:var(--soft)}\nn1-yapay-zeka-v2 .ai-dir input:focus-visible+.ai-dir__b{outline:2px solid var(--ink);outline-offset:3px}\nn1-yapay-zeka-v2 .ai-mixwrap{grid-column:4/13;grid-row:1/3}\nn1-yapay-zeka-v2 .ai-mix__tag{margin-top:12px;font-size:13px;line-height:1.4;color:var(--mute)}\nn1-yapay-zeka-v2 .ai-log{grid-column:1/4;grid-row:2;margin-top:34px}\nn1-yapay-zeka-v2 .ai-log__h{font:600 14px/1.3 Barlow,Arial,sans-serif;color:var(--ink)}\nn1-yapay-zeka-v2 .ai-log__l{margin:8px 0 0}\nn1-yapay-zeka-v2 .ai-log__r{padding:8px 0}\nn1-yapay-zeka-v2 .ai-log__r dt{font-size:13px;line-height:1.3;color:var(--mute)}\nn1-yapay-zeka-v2 .ai-log__r dd{margin:2px 0 0;font-size:15px;line-height:1.4;color:var(--ink)}\nn1-yapay-zeka-v2 .ai-mix{--t:var(--ink);position:relative;overflow:hidden;aspect-ratio:16/10;border-radius:4px;background:#040505;color:var(--t);container-type:inline-size;transition:background-color .7s var(--ease)}\nn1-yapay-zeka-v2 .ai-mix>*{position:absolute}\nn1-yapay-zeka-v2 .ai-mix__bar{left:0;width:100%;height:11%;z-index:4;background:#000;transform-origin:50% 0;transition:transform .9s var(--ease)}\nn1-yapay-zeka-v2 .ai-mix__bar--t{top:0}\nn1-yapay-zeka-v2 .ai-mix__bar--b{top:89%;transform-origin:50% 100%}\nn1-yapay-zeka-v2 .ai-mix__a,n1-yapay-zeka-v2 .ai-mix__b{overflow:visible}\nn1-yapay-zeka-v2 .ai-mix__ai{position:absolute;inset:0;overflow:hidden;clip-path:polygon(0 0,100% 0,100% 100%,0 100%);transition:clip-path .9s var(--ease),transform .9s var(--ease)}\nn1-yapay-zeka-v2 .ai-mix__ai>img,n1-yapay-zeka-v2 .ai-mix__ch>img,n1-yapay-zeka-v2 .ai-mix__b img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}\nn1-yapay-zeka-v2 .ai-mix__a .ai-mix__ai::after{content:\"\";position:absolute;inset:0;z-index:3;background:linear-gradient(180deg,rgba(4,5,5,0) 46%,rgba(4,5,5,.78) 100%);transition:opacity .7s var(--ease)}\nn1-yapay-zeka-v2 .ai-mix__ch{position:absolute;inset:0;z-index:2;opacity:0;mix-blend-mode:screen;transition:opacity .5s var(--ease),transform .7s var(--ease)}\nn1-yapay-zeka-v2 .ai-mix__ch--r>img{filter:grayscale(1) sepia(1) saturate(7) hue-rotate(-38deg) brightness(.75)}\nn1-yapay-zeka-v2 .ai-mix__ch--c>img{filter:grayscale(1) sepia(1) saturate(7) hue-rotate(150deg) brightness(.75)}\nn1-yapay-zeka-v2 .ai-mix__b{overflow:hidden;z-index:2;opacity:0;transition:opacity .6s var(--ease)}\nn1-yapay-zeka-v2 .ai-mix__h{z-index:5;margin:0;font:700 6.2cqw/.92 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:.2em;white-space:nowrap;color:var(--t)}\nn1-yapay-zeka-v2 .ai-mix__h span{display:inline-block}\nn1-yapay-zeka-v2 .ai-mix__s{z-index:5;margin:0;font-size:max(12px,1.35cqw);line-height:1.45;color:var(--t);opacity:.78}\nn1-yapay-zeka-v2 .ai-mix__m{z-index:5;margin:0;display:flex;gap:.8em;font:600 max(11px,1.2cqw)/1 Barlow,Arial,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:var(--t)}\nn1-yapay-zeka-v2 .ai-mix__m span:first-child{color:var(--acc)}\nn1-yapay-zeka-v2 .ai-mix[data-dir=\"cinematic\"] .ai-mix__a{left:0;top:11%;width:100%;height:78%}\nn1-yapay-zeka-v2 .ai-mix[data-dir=\"cinematic\"] .ai-mix__b{left:76%;top:58%;width:16%;height:22%}\nn1-yapay-zeka-v2 .ai-mix[data-dir=\"cinematic\"] .ai-mix__h{left:6%;top:63%;width:80%}\nn1-yapay-zeka-v2 .ai-mix[data-dir=\"cinematic\"] .ai-mix__s{left:6%;top:76%;width:46%}\nn1-yapay-zeka-v2 .ai-mix[data-dir=\"cinematic\"] .ai-mix__m{left:6%;top:16%;width:60%}\nn1-yapay-zeka-v2 .ai-mix[data-dir=\"editorial\"]{--t:#151716;background:#ECEBE5}\nn1-yapay-zeka-v2 .ai-mix[data-dir=\"editorial\"] .ai-mix__bar{transform:scaleY(0)}\nn1-yapay-zeka-v2 .ai-mix[data-dir=\"editorial\"] .ai-mix__a{left:46%;top:8%;width:48%;height:84%}\nn1-yapay-zeka-v2 .ai-mix[data-dir=\"editorial\"] .ai-mix__a .ai-mix__ai::after{opacity:0}\nn1-yapay-zeka-v2 .ai-mix[data-dir=\"editorial\"] .ai-mix__b{left:6%;top:60%;width:20%;height:32%;opacity:1}\nn1-yapay-zeka-v2 .ai-mix[data-dir=\"editorial\"] .ai-mix__h{left:6%;top:9%;width:36%;font-size:7.4cqw;letter-spacing:-.005em;white-space:normal}\nn1-yapay-zeka-v2 .ai-mix[data-dir=\"editorial\"] .ai-mix__h span{display:block}\nn1-yapay-zeka-v2 .ai-mix[data-dir=\"editorial\"] .ai-mix__s{left:29%;top:60%;width:14%;opacity:1;color:#3E413C}\nn1-yapay-zeka-v2 .ai-mix[data-dir=\"editorial\"] .ai-mix__m{left:6%;top:50%;width:36%;color:#53564F}\nn1-yapay-zeka-v2 .ai-mix[data-dir=\"editorial\"] .ai-mix__m span:first-child{color:#151716}\nn1-yapay-zeka-v2 .ai-mix[data-dir=\"experimental\"]{background:#080A09}\nn1-yapay-zeka-v2 .ai-mix[data-dir=\"experimental\"] .ai-mix__bar{transform:scaleY(0)}\nn1-yapay-zeka-v2 .ai-mix[data-dir=\"experimental\"] .ai-mix__a{left:20%;top:7%;width:58%;height:78%}\nn1-yapay-zeka-v2 .ai-mix[data-dir=\"experimental\"] .ai-mix__ai{clip-path:polygon(9% 0,100% 7%,91% 100%,0 90%);transform:rotate(-4deg)}\nn1-yapay-zeka-v2 .ai-mix[data-dir=\"experimental\"] .ai-mix__a .ai-mix__ai::after{opacity:.35}\nn1-yapay-zeka-v2 .ai-mix[data-dir=\"experimental\"] .ai-mix__ch{opacity:.62}\nn1-yapay-zeka-v2 .ai-mix[data-dir=\"experimental\"] .ai-mix__ch--r{transform:translate(1.4cqw,-.4cqw)}\nn1-yapay-zeka-v2 .ai-mix[data-dir=\"experimental\"] .ai-mix__ch--c{transform:translate(-1.4cqw,.4cqw)}\nn1-yapay-zeka-v2 .ai-mix[data-dir=\"experimental\"] .ai-mix__b{left:68%;top:56%;width:26%;height:34%;opacity:1}\nn1-yapay-zeka-v2 .ai-mix[data-dir=\"experimental\"] .ai-mix__h{left:4%;top:50%;width:92%;font-size:12.6cqw;line-height:.84;letter-spacing:-.02em;white-space:normal;color:var(--acc)}\nn1-yapay-zeka-v2 .ai-mix[data-dir=\"experimental\"] .ai-mix__h span{display:block}\nn1-yapay-zeka-v2 .ai-mix[data-dir=\"experimental\"] .ai-mix__h span+span{padding-left:.7em}\nn1-yapay-zeka-v2 .ai-mix[data-dir=\"experimental\"] .ai-mix__s{left:74%;top:8%;width:22%;text-align:right}\nn1-yapay-zeka-v2 .ai-mix[data-dir=\"experimental\"] .ai-mix__m{left:4%;top:8%;width:30%}\nn1-yapay-zeka-v2 .ai-steps{margin-top:clamp(56px,6vw,110px)}\nn1-yapay-zeka-v2 .ai-step{display:flex;flex-wrap:wrap;align-items:baseline;column-gap:clamp(18px,2.4vw,44px);row-gap:8px;padding:clamp(14px,1.6vw,26px) 0 clamp(14px,1.6vw,26px) calc(var(--i) * 6.6%)}\nn1-yapay-zeka-v2 .ai-step__n{flex:none;width:2.6em;font:600 15px/1 Barlow,Arial,sans-serif;color:var(--acc);font-variant-numeric:tabular-nums}\nn1-yapay-zeka-v2 .ai-step__k{position:relative;flex:none;font:700 clamp(44px,6.2vw,122px)/1 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:-.005em;white-space:nowrap}\nn1-yapay-zeka-v2 .ai-step__o{display:block;color:transparent;-webkit-text-stroke:1px rgba(236,235,229,.34)}\nn1-yapay-zeka-v2 .ai-step__f{position:absolute;inset:0;color:var(--ink);clip-path:inset(-.2em 0 -.2em 0)}\nn1-yapay-zeka-v2 .ai-step__d{flex:1 1 220px;max-width:34ch;font-size:clamp(16px,1.15vw,19px);line-height:1.55;color:var(--soft)}\nn1-yapay-zeka-v2 .ai-motion__grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:center}\nn1-yapay-zeka-v2 .ai-motion__copy{grid-column:1/5;align-self:start}\nn1-yapay-zeka-v2 .ai-motion__t{font-size:clamp(52px,5.6vw,112px)}\nn1-yapay-zeka-v2 .ai-motion__stage{position:relative;grid-column:5/9;display:flex;justify-content:center}\nn1-yapay-zeka-v2 .ai-motion__vid{width:min(100%,calc((100svh - 140px) * .563));border-radius:3px}\nn1-yapay-zeka-v2 .ai-motion__word{position:absolute;left:0;bottom:7%;z-index:4;margin:0;font:700 clamp(54px,6vw,118px)/1 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:.01em;color:#ECEBE5;mix-blend-mode:difference;transform:translateX(-26%);pointer-events:none;white-space:nowrap}\nn1-yapay-zeka-v2 .ai-motion__word span{display:block}\nn1-yapay-zeka-v2 .ai-chap{grid-column:9/13}\nn1-yapay-zeka-v2 .ai-chap li+li{margin-top:6px}\nn1-yapay-zeka-v2 .ai-chap__b{display:grid;grid-template-columns:3.6em minmax(0,1fr);column-gap:12px;row-gap:4px;width:100%;min-height:44px;padding:14px 0;text-align:left}\nn1-yapay-zeka-v2 .ai-chap__t{grid-row:1/3;font:600 14px/1.5 Barlow,Arial,sans-serif;color:var(--mute);font-variant-numeric:tabular-nums}\nn1-yapay-zeka-v2 .ai-chap__h{font:600 clamp(18px,1.4vw,22px)/1.3 Barlow,Arial,sans-serif;color:var(--soft);transition:color .3s var(--ease)}\nn1-yapay-zeka-v2 .ai-chap__d{font-size:14.5px;line-height:1.5;color:var(--mute)}\nn1-yapay-zeka-v2 .ai-chap__p{grid-column:2;display:block;height:2px;margin-top:8px;background:rgba(236,235,229,.12);overflow:hidden}\nn1-yapay-zeka-v2 .ai-chap__p i{display:block;height:100%;background:var(--acc);transform:scaleX(0);transform-origin:0 50%}\nn1-yapay-zeka-v2 .ai-chap__b.is-on .ai-chap__t{color:var(--acc)}\nn1-yapay-zeka-v2 .ai-chap__b.is-on .ai-chap__h{color:var(--ink)}\nn1-yapay-zeka-v2 .ai-chap__b.is-on .ai-chap__d{color:var(--soft)}\nn1-yapay-zeka-v2 .ai-chap__b:hover .ai-chap__h{color:var(--ink)}\nn1-yapay-zeka-v2 .ai-resp__t{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:var(--gap);margin-top:clamp(24px,2.2vw,36px);font:700 clamp(56px,8.2vw,160px)/.96 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:-.012em}\nn1-yapay-zeka-v2 .ai-resp__a{position:relative;align-self:start;justify-self:start;color:var(--mute)}\nn1-yapay-zeka-v2 .ai-resp__b{align-self:end;padding-top:clamp(40px,8vw,170px)}\nn1-yapay-zeka-v2 .ai-strike{position:absolute;left:-2%;top:63%;width:104%;height:.07em;background:var(--acc);transform-origin:0 50%}\nn1-yapay-zeka-v2 .ai-resp__body{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:end;margin-top:clamp(50px,5vw,90px)}\nn1-yapay-zeka-v2 .ai-resp__q{grid-column:1/7;margin:0}\nn1-yapay-zeka-v2 .ai-resp__q p{font:600 clamp(26px,2.5vw,46px)/1.2 Barlow,Arial,sans-serif;color:var(--ink)}\nn1-yapay-zeka-v2 .ai-resp__body .ai-body{grid-column:8/13;margin-top:0}\nn1-yapay-zeka-v2 .ai-checks{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:clamp(40px,5vw,96px);margin-top:clamp(50px,5vw,90px)}\nn1-yapay-zeka-v2 .ai-check{display:grid;grid-template-columns:3em minmax(0,1fr);column-gap:10px;row-gap:6px;padding:20px 0}\nn1-yapay-zeka-v2 .ai-check__n{grid-row:1/3;font:600 14px/1.55 Barlow,Arial,sans-serif;color:var(--acc);font-variant-numeric:tabular-nums}\nn1-yapay-zeka-v2 .ai-check__k{font:600 clamp(19px,1.45vw,24px)/1.3 Barlow,Arial,sans-serif;color:var(--ink)}\nn1-yapay-zeka-v2 .ai-check__q{font-size:clamp(15px,1.1vw,17px);line-height:1.55;color:var(--soft)}\nn1-yapay-zeka-v2 .ai-resp__foot{max-width:62ch;margin-top:30px;font-size:14px;line-height:1.55;color:var(--mute)}\nn1-yapay-zeka-v2 .ai-future__t{display:block;margin-top:clamp(24px,2.2vw,36px);font:700 clamp(54px,8.8vw,172px)/.96 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:-.012em}\nn1-yapay-zeka-v2 .ai-future__a,n1-yapay-zeka-v2 .ai-future__b{display:block}\nn1-yapay-zeka-v2 .ai-future__b{margin-top:.18em;text-align:right}\nn1-yapay-zeka-v2 .ai-future__fig{margin-top:clamp(50px,5vw,90px)}\nn1-yapay-zeka-v2 .ai-gl{position:relative;overflow:hidden;aspect-ratio:21/9;background:#000}\nn1-yapay-zeka-v2 .ai-gl__img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}\nn1-yapay-zeka-v2 .ai-gl__ch{position:absolute;inset:0;opacity:0;visibility:hidden;mix-blend-mode:screen}\nn1-yapay-zeka-v2 .ai-gl.is-gl .ai-gl__ch{visibility:visible}\nn1-yapay-zeka-v2 .ai-gl__ch--r .ai-gl__img{filter:grayscale(1) sepia(1) saturate(7) hue-rotate(-38deg) brightness(.8)}\nn1-yapay-zeka-v2 .ai-gl__ch--c .ai-gl__img{filter:grayscale(1) sepia(1) saturate(7) hue-rotate(150deg) brightness(.8)}\nn1-yapay-zeka-v2 .ai-future__foot{margin-top:clamp(40px,4vw,70px)}\nn1-yapay-zeka-v2 .ai-trio{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));column-gap:var(--gap)}\nn1-yapay-zeka-v2 .ai-trio li{max-width:30ch;font:500 clamp(18px,1.4vw,24px)/1.4 Barlow,Arial,sans-serif;color:var(--soft)}\nn1-yapay-zeka-v2 .ai-trio span{color:var(--ink);font-weight:600}\nn1-yapay-zeka-v2 .ai-fin{position:relative;padding:clamp(110px,10vw,190px) 0 clamp(90px,8vw,140px);border-top:1px solid var(--line)}\nn1-yapay-zeka-v2 .ai-fin__t{display:block;margin-top:clamp(24px,2.2vw,36px);font:700 clamp(64px,11.6vw,226px)/.94 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:-.014em}\nn1-yapay-zeka-v2 .ai-fin__l{display:block;padding-top:.08em;white-space:nowrap}\nn1-yapay-zeka-v2 .ai-fin__l--acc{color:var(--acc)}\nn1-yapay-zeka-v2 .ai-fin__caret{display:inline-block;width:.06em;height:.7em;margin-left:.08em;vertical-align:-.02em;background:var(--acc);animation:ai-blink 1.1s steps(1) 0s 6}\nn1-yapay-zeka-v2 .ai-fin__row{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:end;margin-top:clamp(40px,4vw,70px)}\nn1-yapay-zeka-v2 .ai-fin__sub{grid-column:1/7;max-width:46ch;font-size:clamp(18px,1.4vw,24px);line-height:1.5;color:var(--soft)}\nn1-yapay-zeka-v2 .ai-fin__cta{grid-column:8/13;display:flex;flex-wrap:wrap;justify-content:flex-end;gap:14px}\n@keyframes ai-blink{0%{opacity:1}50%{opacity:0}100%{opacity:1}}\n@media (max-width:1024px){n1-yapay-zeka-v2 .ai-play{right:auto;left:12px}n1-yapay-zeka-v2 [data-v=story] .ai-play{left:auto;right:12px}}\n@media (max-width:1024px){\nn1-yapay-zeka-v2 .ai-hero__msg{grid-column:1/-1}\nn1-yapay-zeka-v2 .ai-hero__side{grid-column:1/10;margin-top:26px;padding-bottom:0}\nn1-yapay-zeka-v2 .ai-human__copy{grid-column:1/-1}\nn1-yapay-zeka-v2 .ai-human__fig{grid-column:3/-1;margin-top:48px}\nn1-yapay-zeka-v2 .ai-pr--1 .ai-pr__fig{grid-column:1/7}\nn1-yapay-zeka-v2 .ai-pr--1 .ai-pr__copy{grid-column:7/13}\nn1-yapay-zeka-v2 .ai-pr--2 .ai-pr__copy{grid-column:1/-1}\nn1-yapay-zeka-v2 .ai-pr--2 .ai-pr__media{grid-column:3/-1;grid-row:2;margin-top:32px}\nn1-yapay-zeka-v2 .ai-pr--3 .ai-pr__n,n1-yapay-zeka-v2 .ai-pr--3 .ai-pr__k,n1-yapay-zeka-v2 .ai-pr--3 .ai-pr__d{grid-column:1/-1;grid-row:auto}\nn1-yapay-zeka-v2 .ai-pr--4 .ai-pr__fig{grid-column:1/-1}\nn1-yapay-zeka-v2 .ai-pr--4 .ai-pr__copy{grid-column:1/10;margin-top:28px}\nn1-yapay-zeka-v2 .ai-pr--5 .ai-pr__copy{grid-column:1/11}\nn1-yapay-zeka-v2 .ai-lab__head>div:first-child{grid-column:1/-1}\nn1-yapay-zeka-v2 .ai-lab__intro{grid-column:1/11;margin-top:28px}\nn1-yapay-zeka-v2 .ai-dirs{grid-column:1/-1;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));column-gap:12px}\nn1-yapay-zeka-v2 .ai-dirs__l{grid-column:1/-1}\nn1-yapay-zeka-v2 .ai-dir__b{height:100%;grid-template-columns:1fr}\nn1-yapay-zeka-v2 .ai-dir__s{grid-column:1}\nn1-yapay-zeka-v2 .ai-mixwrap{grid-column:1/-1;grid-row:2;margin-top:26px}\nn1-yapay-zeka-v2 .ai-log{grid-column:1/-1;grid-row:3;margin-top:30px}\nn1-yapay-zeka-v2 .ai-log__l{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));column-gap:var(--gap)}\nn1-yapay-zeka-v2 .ai-step{padding-left:calc(var(--i) * 4%)}\nn1-yapay-zeka-v2 .ai-motion__copy{grid-column:1/-1}\nn1-yapay-zeka-v2 .ai-motion__stage{grid-column:1/7;grid-row:2;margin-top:44px}\nn1-yapay-zeka-v2 .ai-motion__vid{width:100%}\nn1-yapay-zeka-v2 .ai-motion__word{transform:translateX(-8%)}\nn1-yapay-zeka-v2 .ai-chap{grid-column:7/13;grid-row:2;margin-top:44px}\nn1-yapay-zeka-v2 .ai-resp__q{grid-column:1/-1}\nn1-yapay-zeka-v2 .ai-resp__body .ai-body{grid-column:1/11;margin-top:26px}\nn1-yapay-zeka-v2 .ai-fin__sub{grid-column:1/-1}\nn1-yapay-zeka-v2 .ai-fin__cta{grid-column:1/-1;justify-content:flex-start;margin-top:30px}\nn1-yapay-zeka-v2 .ai-hero__stage{--win:min(30vw,max(200px,calc((100svh - var(--hdr) - 190px) * .5625)))}\nn1-yapay-zeka-v2 n1-header{display:block!important;position:fixed!important;top:0!important;left:0!important;right:0!important;width:100%!important;min-height:0!important;height:auto!important;z-index:900!important;background:rgba(8,10,9,.95);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);border-bottom:1px solid rgba(228,227,221,.07)}\nn1-yapay-zeka-v2 n1-header .n1h-bar.site-container{display:grid!important;align-items:center!important;width:calc(100% - 48px)!important;margin-inline:auto!important;padding-inline:0!important;height:72px!important;max-width:100%!important}\nn1-yapay-zeka-v2 n1-header .n1h-logo{margin:0!important;flex:none}\nn1-yapay-zeka-v2 n1-header .n1h-logo img{width:32px!important;height:32px!important;max-width:none!important}\nn1-yapay-zeka-v2 n1-header .n1h-right{align-items:center!important}\nn1-yapay-zeka-v2 n1-header .n1h-menu{display:inline-flex!important;height:40px!important;margin:0!important}\nn1-yapay-zeka-v2 n1-header .n1h-cta{display:none!important}\nn1-yapay-zeka-v2 footer.n1ft .n1ft-partner{opacity:1!important;visibility:visible!important;transform:none!important}\n}\n@media (max-width:900px){n1-yapay-zeka-v2 .n1ft-inner{width:90%}}\n@media (max-width:767px){\nn1-yapay-zeka-v2{--secpad:92px}\nn1-yapay-zeka-v2 .ai-wrap{width:calc(100% - 40px)}\nn1-yapay-zeka-v2 .ai-hero{padding-bottom:76px}\nn1-yapay-zeka-v2 .ai-hero__stage{display:block;margin-top:24px}\nn1-yapay-zeka-v2 .ai-hero__t{position:static;display:block;transform:none;font-size:clamp(76px,24.5vw,150px);line-height:.9}\nn1-yapay-zeka-v2 .ai-hw{display:block;margin:0!important;justify-self:auto!important}\nn1-yapay-zeka-v2 .ai-hero__win{width:100%;aspect-ratio:4/5;margin-top:22px}\nn1-yapay-zeka-v2 .ai-hero__caret{display:none}\nn1-yapay-zeka-v2 .ai-hero__msg{font-size:clamp(46px,14vw,78px)}\nn1-yapay-zeka-v2 .ai-human__fig{grid-column:1/-1;margin-top:40px}\nn1-yapay-zeka-v2 .ai-eq{flex-direction:column;gap:8px;margin-top:64px;font-size:clamp(26px,8vw,46px)}\nn1-yapay-zeka-v2 .ai-pair{grid-template-columns:1fr;row-gap:30px;margin-top:40px}\nn1-yapay-zeka-v2 .ai-prod__t{font-size:clamp(58px,17vw,110px)}\nn1-yapay-zeka-v2 .ai-pr{display:block;margin-top:84px}\nn1-yapay-zeka-v2 .ai-pr__copy{margin-top:24px}\nn1-yapay-zeka-v2 .ai-pr__w{font-size:24vw}\nn1-yapay-zeka-v2 .ai-pr--1 .ai-pr__w{bottom:auto;top:calc((100vw - 40px) * 1.25 - .62em)}\nn1-yapay-zeka-v2 .ai-pr--2 .ai-pr__copy{margin-top:0}\nn1-yapay-zeka-v2 .ai-pr--2 .ai-pr__media{margin-top:26px}\nn1-yapay-zeka-v2 .ai-pr--2 .ai-pr__w{bottom:-.1em}\nn1-yapay-zeka-v2 .ai-pr--3 .ai-pr__fig{aspect-ratio:4/3}\nn1-yapay-zeka-v2 .ai-pr--3 .ai-pr__copy{display:block}\nn1-yapay-zeka-v2 .ai-pr--4 .ai-pr__copy{margin-top:24px}\nn1-yapay-zeka-v2 .ai-pr--5 .ai-pr__copy{margin-top:0}\nn1-yapay-zeka-v2 .ai-pr--5 .ai-pr__fig{aspect-ratio:2.2/1;margin-top:28px}\nn1-yapay-zeka-v2 .ai-dirs{display:block}\nn1-yapay-zeka-v2 .ai-dir__b{grid-template-columns:auto minmax(0,1fr)}\nn1-yapay-zeka-v2 .ai-dir__s{grid-column:2}\nn1-yapay-zeka-v2 .ai-log__l{grid-template-columns:repeat(2,minmax(0,1fr))}\nn1-yapay-zeka-v2 .ai-mix{aspect-ratio:4/5}\nn1-yapay-zeka-v2 .ai-mix__s{display:none}\nn1-yapay-zeka-v2 .ai-mix__bar{height:21%}\nn1-yapay-zeka-v2 .ai-mix__bar--b{top:79%}\nn1-yapay-zeka-v2 .ai-mix__m{font-size:11px}\nn1-yapay-zeka-v2 .ai-mix[data-dir=\"cinematic\"] .ai-mix__a{top:21%;height:58%}\nn1-yapay-zeka-v2 .ai-mix[data-dir=\"cinematic\"] .ai-mix__b{left:70%;top:62%;width:24%;height:12%}\nn1-yapay-zeka-v2 .ai-mix[data-dir=\"cinematic\"] .ai-mix__h{left:6%;top:83%;width:88%;font-size:8.2cqw;letter-spacing:.14em}\nn1-yapay-zeka-v2 .ai-mix[data-dir=\"cinematic\"] .ai-mix__m{left:6%;top:9%;width:88%}\nn1-yapay-zeka-v2 .ai-mix[data-dir=\"editorial\"] .ai-mix__a{left:34%;top:30%;width:60%;height:62%}\nn1-yapay-zeka-v2 .ai-mix[data-dir=\"editorial\"] .ai-mix__b{left:6%;top:62%;width:22%;height:30%}\nn1-yapay-zeka-v2 .ai-mix[data-dir=\"editorial\"] .ai-mix__h{left:6%;top:5%;width:88%;font-size:13cqw}\nn1-yapay-zeka-v2 .ai-mix[data-dir=\"editorial\"] .ai-mix__m{left:6%;top:31%;width:26%;line-height:1.5;flex-direction:column;gap:2px}\nn1-yapay-zeka-v2 .ai-mix[data-dir=\"experimental\"] .ai-mix__a{left:9%;top:8%;width:82%;height:58%}\nn1-yapay-zeka-v2 .ai-mix[data-dir=\"experimental\"] .ai-mix__b{left:60%;top:43%;width:34%;height:16%}\nn1-yapay-zeka-v2 .ai-mix[data-dir=\"experimental\"] .ai-mix__h{left:5%;top:60%;width:90%;font-size:18cqw}\nn1-yapay-zeka-v2 .ai-mix[data-dir=\"experimental\"] .ai-mix__m{left:5%;top:3%;width:60%}\nn1-yapay-zeka-v2 .ai-step{padding-left:0;display:block}\nn1-yapay-zeka-v2 .ai-step__n{display:block;margin-bottom:8px}\nn1-yapay-zeka-v2 .ai-step__k{display:inline-block;font-size:clamp(42px,13vw,80px)}\nn1-yapay-zeka-v2 .ai-step__d{margin-top:8px}\nn1-yapay-zeka-v2 .ai-motion__stage{grid-column:1/-1;margin-top:40px}\nn1-yapay-zeka-v2 .ai-motion__vid{width:78%}\nn1-yapay-zeka-v2 .ai-motion__word{left:11%;bottom:6%;font-size:clamp(46px,15vw,90px);transform:translateX(-12%)}\nn1-yapay-zeka-v2 .ai-chap{grid-column:1/-1;grid-row:3;margin-top:30px}\nn1-yapay-zeka-v2 .ai-resp__t{grid-template-columns:1fr;font-size:clamp(54px,15.4vw,96px)}\nn1-yapay-zeka-v2 .ai-resp__b{padding-top:22px}\nn1-yapay-zeka-v2 .ai-resp__body .ai-body{grid-column:1/-1}\nn1-yapay-zeka-v2 .ai-checks{grid-template-columns:1fr}\nn1-yapay-zeka-v2 .ai-future__t{font-size:clamp(46px,13.2vw,90px)}\nn1-yapay-zeka-v2 .ai-gl{aspect-ratio:4/3}\nn1-yapay-zeka-v2 .ai-trio{grid-template-columns:1fr;row-gap:18px}\nn1-yapay-zeka-v2 .ai-fin__t{font-size:clamp(60px,18.4vw,120px)}\nn1-yapay-zeka-v2 .ai-fin__cta{flex-direction:column;align-items:stretch}\nn1-yapay-zeka-v2 .ai-btn{width:100%;height:56px;padding:0 7px 0 18px;font-size:12px}\nn1-yapay-zeka-v2 .ai-btn__ico{width:42px;height:42px}\nn1-yapay-zeka-v2 n1-header .n1h-bar.site-container{width:calc(100% - 40px)!important;height:64px!important}\nn1-yapay-zeka-v2 n1-header .n1h-logo img{width:30px!important;height:30px!important}\nn1-yapay-zeka-v2 .n1ft-inner{width:calc(100% - 40px)}\nn1-yapay-zeka-v2 .n1ft-top{grid-template-columns:1fr!important;gap:32px;padding:39px 0 36px}\nn1-yapay-zeka-v2 .n1ft-col--brand{grid-column:auto}\nn1-yapay-zeka-v2 .n1ft-brand{font-size:45px}\n}\n@media (max-width:360px){n1-yapay-zeka-v2 .ai-wrap,n1-yapay-zeka-v2 .n1ft-inner{width:calc(100% - 32px)}n1-yapay-zeka-v2 n1-header .n1h-bar.site-container{width:calc(100% - 32px)!important}}\n@media (prefers-reduced-motion:reduce){n1-yapay-zeka-v2 .ai *,n1-yapay-zeka-v2 .ai *::before,n1-yapay-zeka-v2 .ai *::after{transition-duration:.01ms!important;transition-delay:0s!important;animation-duration:.01ms!important;animation-iteration-count:1!important}}";

  /* ---------- Bileşen ---------- */
  class YapayZekaV2 extends HTMLElement {
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
        if (!this.querySelector('main.ai')) this.innerHTML = '<p style="padding:40px 5%;color:#ECEBE5;font:16px Barlow,Arial,sans-serif">Yapay Zekâ sayfası yüklenemedi. Lütfen sayfayı yenileyin.</p>';
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
      this._anchors();
      this._videos(); n1Life(this);
      this._lab();
      this._chapters();
      this._future();

      var fonts = loadCss(FONTS).catch(function (e) { console.warn('[' + TAG + '] Font yüklenemedi, yedek font kullanılıyor', e); });
      await Promise.all([n1Optional(loadCss(url('footerCss')),'footer CSS'), n1Optional(loadCss(url('responsive')),'responsive CSS'), loadJs(url('markup'), function () { return !!window.N1_SITE_MARKUP; })]);
      if (!n1Alive()) return;

      var tpl = document.createElement('template');
      tpl.innerHTML = String(window.N1_SITE_MARKUP || '').split('{{ASSETS}}').join(url('assets'));
      var hdr = tpl.content.querySelector('n1-header'), ft = tpl.content.querySelector('[data-n1-footer]'), fc = tpl.content.querySelector('n1-floating-controls');
      if (!hdr || !ft) throw new Error('Onaylı Header/Footer işaretlemesi bulunamadı');
      var main = this.querySelector('main.ai');

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
        if (self._header.panel) { self._header.panel.classList.add('n1-inner-panel'); self._header.panel.setAttribute('data-n1-ai', ''); }
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

      var otherFc = [].some.call(document.querySelectorAll('n1-floating-controls'), function (f) { return !self.contains(f); }) || !!document.querySelector('.n1fc:not([data-n1-ai])');
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
        if (this._header.panel) { this._header.panel.classList.add('n1-inner-panel'); this._header.panel.setAttribute('data-n1-ai', ''); }
      }
      } else await n1InitHeader().catch(function(e){console.warn('[1N mobile] header',e);});
      if (!n1Alive()) return;
      if (this._footerOwned) await loadJs(url('footerJs'), null, true);
      if (this._fcOwned && !customElements.get('n1-floating-controls')) await loadJs(url('floating'), function () { return !!customElements.get('n1-floating-controls'); });
      var layer = document.querySelector('body > .n1fc:last-of-type'); if (this._fcOwned && layer) layer.setAttribute('data-n1-ai', '');
      if (!n1Alive()) return;
      this._animate();
    }


    _anchors() {
      var a = this.querySelector('.ai-scroll'), self = this;
      this._ev(a, 'click', function (e) {
        var t = self.querySelector('#ai-lab'); if (!t) return;
        e.preventDefault();
        scrollTo({ top: t.getBoundingClientRect().top + scrollY - 40, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      });
    }

    /* ---------- Videolar: poster yok, aynı anda tek video, görünmeyen durur, uzaktaki indirilmez ---------- */
    _videos() {
      var self = this, reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      var c = navigator.connection || {}, autoOK = !reduced && !c.saveData;
      var V = [];
      [].forEach.call(this.querySelectorAll('.ai-vid'), function (box) {
        var key = box.getAttribute('data-v'), meta = VID[key], v = box.querySelector('video'), btn = box.querySelector('.ai-play'), err = box.querySelector('.ai-vid__err');
        if (!v) return;   // V1.4: telefon/tablette sabit kare
        v.defaultMuted = true; v.muted = true; v.playsInline = true; v.setAttribute('webkit-playsinline', ''); if(n1MobileRepair()){v.setAttribute('muted','');v.setAttribute('playsinline','');}
        var P = { key: key, box: box, v: v, ratio: 0, user: false, loaded: false, failed: false, seekTo: null };
        P.load = function (mode) {
          if (P.loaded) { if (mode === 'auto' && v.preload !== 'auto') v.preload = 'auto'; return; }
          P.loaded = true; v.preload = mode || 'auto'; v.src = meta.src;
        };
        P.play = function () {
          if (P.failed) return;
          P.load('auto');
          V.forEach(function (o) { if (o !== P && !o.v.paused) o.v.pause(); });
          v.autoplay = true;
        var pr = n1Play(v); if (pr && pr.catch) pr.catch(function () { P.sync(); });
        };
        P.sync = function () {
          var playing = !v.paused && !v.ended;
          btn.setAttribute('data-paused', playing ? '0' : '1');
          btn.setAttribute('aria-label', playing ? 'Videoyu duraklat' : 'Videoyu oynat');
        };
        ['play', 'pause', 'ended'].forEach(function (e) { self._ev(v, e, P.sync); });
        var ready = function () { box.classList.add('is-ready'); };
        self._ev(v, 'playing', ready);
        self._ev(v, 'seeked', ready);
        self._ev(v, 'loadedmetadata', function () {
          if (P.seekTo != null) { v.currentTime = P.seekTo; P.seekTo = null; }
          else if (v.paused && v.currentTime === 0 && meta.first) v.currentTime = meta.first;   // hareketsiz durumda anlamlı ilk kare (videonun kendisi)
          else if (v.paused) v.currentTime = .05;
        });
        self._ev(v, 'error', function () {
          if (!v.getAttribute('src')) return;
          P.failed = true; box.classList.add('is-failed'); btn.disabled = true;
          err.textContent = 'Video şu anda yüklenemedi.';
        });
        self._ev(btn, 'click', function () { if (v.paused) { P.user = false; P.forced = true; P.forcedAt = Date.now(); P.play(); } else { P.user = true; P.forced = false; v.pause(); } });
        self._ev(v, 'canplay', function () { if (P.ratio >= .08 && !P.user && !document.hidden && v.paused && !P.failed) choose(); });
        P.sync();
        V.push(P);
      });
      this._vids = V;
      n1MediaRecovery(this,V,function(p){return !p.user&&!p.failed&&!p.box.closest('[data-off]');},function(){choose();});
      var choose = function () {
        if (document.hidden) { V.forEach(function (P) { if (!P.v.paused) P.v.pause(); }); return; }
        var best = null;
        V.forEach(function (P) {
          var want = (autoOK && !P.user) || P.forced;
          if (P.ratio >= .08 && want && !P.failed && (!best || P.ratio > best.ratio)) best = P;
        });
        V.forEach(function (P) {
          if (P === best) return;
          if (!P.v.paused && (best || P.ratio < .02)) P.v.pause();
          if (P.ratio < .02 && Date.now() - (P.forcedAt || 0) > 2500) P.forced = false;
        });
        if (best && best.v.paused) best.play();
      };
      var io = new IntersectionObserver(function (en) {
        en.forEach(function (e) { var P = V.filter(function (o) { return o.box === e.target; })[0]; if (P) P.ratio = e.isIntersecting ? e.intersectionRatio : 0; });
        choose();
      }, { threshold: [0, .02, .08, .2, .5, 1] });
      var near = new IntersectionObserver(function (en) {
        en.forEach(function (e) {
          if (!e.isIntersecting) return;
          var P = V.filter(function (o) { return o.box === e.target; })[0]; if (!P) return;
          P.load(autoOK ? 'auto' : 'metadata'); near.unobserve(e.target);
        });
      }, { rootMargin: '600px 0px' });
      V.forEach(function (P) { io.observe(P.box); if (P.key !== 'hero') near.observe(P.box); });
      var hero = V.filter(function (P) { return P.key === 'hero'; })[0];
      if (hero) hero.load(autoOK ? 'auto' : 'metadata');
      document.addEventListener('visibilitychange', choose);
      this._cleanups.push(function () {
        io.disconnect(); near.disconnect(); document.removeEventListener('visibilitychange', choose);
        V.forEach(function (P) { try { P.v.pause(); P.v.removeAttribute('src'); P.v.load(); } catch (e) {} });
      });
    }

    /* ---------- Creative Direction Mixer: aynı görseller, üç sanat yönetimi yorumu ---------- */
    _lab() {
      var self = this, root = this.querySelector('.ai-lab'), mix = root.querySelector('.ai-mix'), live = root.querySelector('[data-mix="live"]');
      var parts = ['.ai-mix__a', '.ai-mix__b', '.ai-mix__h', '.ai-mix__s', '.ai-mix__m'].map(function (s) { return mix.querySelector(s); });
      var LABEL = {
        cinematic: 'Sinematik yorum: geniş kadrajlı, koyu bir sahnede gökyüzünde süzülen form ve altta tek satır başlık',
        editorial: 'Editoryal yorum: kırık beyaz zeminde sağda dik kadrajlı görsel, solda büyük başlık ve küçük ikinci görsel',
        experimental: 'Deneysel yorum: eğik kırpılmış, renk kanalları ayrışmış görsel ve üzerine taşan yeşil dev başlık'
      };
      var TIM = { cinematic: { d: 1.4, e: 'expo.inOut' }, editorial: { d: .8, e: 'power3.inOut' }, experimental: { d: .62, e: 'back.inOut(1.4)' } };
      var cur = mix.getAttribute('data-dir');
      var rel = function (el, box) { var r = el.getBoundingClientRect(); return { left: r.left - box.left, top: r.top - box.top, width: r.width, height: r.height }; };
      var apply = function (dir) {
        if (!DIRS[dir] || dir === cur) return;
        var g = window.gsap, still = matchMedia('(prefers-reduced-motion: reduce)').matches, box = mix.getBoundingClientRect();
        var before = parts.slice(0, 2).map(function (el) { return rel(el, box); });
        if (g) { g.killTweensOf(parts); g.killTweensOf(mix.querySelectorAll('.ai-mix__h span')); g.set(parts, { clearProps: 'left,top,width,height,opacity,transform,letterSpacing' }); g.set(mix.querySelectorAll('.ai-mix__h span'), { clearProps: 'all' }); }
        mix.setAttribute('data-dir', dir); cur = dir;
        var d = DIRS[dir];
        mix.setAttribute('aria-label', LABEL[dir]);
        mix.querySelector('[data-mix="n"]').textContent = d.n;
        mix.querySelector('[data-mix="t"]').textContent = d.t;
        Object.keys(d.log).forEach(function (k) { var dd = root.querySelector('[data-log="' + k + '"]'); if (dd) dd.textContent = d.log[k]; });
        live.textContent = d.tr + ' yorum seçildi. ' + d.s;
        if (!g || still) return;
        box = mix.getBoundingClientRect();
        parts.slice(0, 2).forEach(function (el, i) {
          var to = rel(el, box), from = before[i];
          if (!from.width || !to.width) return;
          g.fromTo(el, from, { left: to.left, top: to.top, width: to.width, height: to.height, duration: TIM[dir].d, ease: TIM[dir].e, clearProps: 'left,top,width,height' });
        });
        var spans = mix.querySelectorAll('.ai-mix__h span'), rest = parts.slice(3);
        if (dir === 'cinematic') {
          g.fromTo(spans, { opacity: 0, letterSpacing: '.6em' }, { opacity: 1, letterSpacing: '.2em', duration: 1.5, ease: 'expo.out', stagger: .12, delay: .35, clearProps: 'opacity,letterSpacing' });
          g.from(rest, { opacity: 0, duration: 1, delay: .7, clearProps: 'opacity' });
        } else if (dir === 'editorial') {
          g.from(spans, { opacity: 0, yPercent: 55, duration: .7, ease: 'power3.out', stagger: .08, delay: .25, clearProps: 'opacity,transform' });
          g.from(rest, { opacity: 0, y: 10, duration: .55, ease: 'power2.out', stagger: .06, delay: .45, clearProps: 'opacity,transform' });
        } else {
          g.from(spans, { opacity: 0, x: function (i) { return i ? 60 : -60; }, rotation: function (i) { return i ? 4 : -6; }, duration: .5, ease: 'back.out(2.4)', stagger: .07, delay: .15, clearProps: 'opacity,transform' });
          g.from(rest, { opacity: 0, duration: .25, ease: 'steps(3)', delay: .3, clearProps: 'opacity' });
        }
        g.from(root.querySelectorAll('.ai-log__r dd'), { opacity: 0, x: -8, duration: .45, ease: 'power2.out', stagger: .04, clearProps: 'opacity,transform' });
      };
      this._ev(root.querySelector('.ai-dirs'), 'change', function (e) { if (e.target.name === 'ai-dir') apply(e.target.value); });
      this._mix = { apply: apply };
    }

    /* ---------- Hareket: videoyla eşzamanlı bölümler ---------- */
    _chapters() {
      var self = this, P = (this._vids || []).filter(function (o) { return o.key === 'story'; })[0];
      var btns = [].slice.call(this.querySelectorAll('.ai-chap__b')), bars = btns.map(function (b) { return b.querySelector('.ai-chap__p i'); });
      var word = this.querySelector('.ai-motion__word span'), cur = 0;
      if (!P) return;
      var v = P.v;
      var set = function (i) {
        if (i === cur) return; cur = i;
        btns.forEach(function (b, j) { b.classList.toggle('is-on', j === i); b.setAttribute('aria-current', String(j === i)); });
        var g = window.gsap, txt = CHAPTERS[i].k;
        if (g && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
          g.killTweensOf(word);
          g.timeline().to(word, { yPercent: -40, opacity: 0, duration: .2, ease: 'power2.in', onComplete: function () { word.textContent = txt; } })
            .fromTo(word, { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .55, ease: 'expo.out' });
        } else word.textContent = txt;
      };
      var tick = function () {
        var t = v.currentTime, dur = v.duration || 15, i = 0;
        CHAPTERS.forEach(function (c, j) { if (t >= c.t - .01) i = j; });
        set(i);
        bars.forEach(function (b, j) {
          var a = CHAPTERS[j].t, z = j + 1 < CHAPTERS.length ? CHAPTERS[j + 1].t : dur;
          var p = j < i ? 1 : j > i ? 0 : Math.max(0, Math.min(1, (t - a) / (z - a)));
          b.style.transform = 'scaleX(' + p.toFixed(3) + ')';
        });
      };
      this._ev(v, 'timeupdate', tick);
      this._ev(v, 'seeked', tick);
      btns.forEach(function (b, i) {
        self._ev(b, 'click', function () {
          var t = CHAPTERS[i].t + .05;
          P.load('auto');
          if (v.readyState >= 1) v.currentTime = t; else P.seekTo = t;
          set(i);
          P.user = false; P.forced = true; P.forcedAt = Date.now(); P.play();
          var r = P.box.getBoundingClientRect(), vis = Math.max(0, Math.min(r.bottom, innerHeight) - Math.max(r.top, 0)) / Math.max(1, r.height);
          if (vis < .5) P.box.scrollIntoView({ block: 'center', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
        });
      });
    }

    /* ---------- Gelecek: kısa, kontrollü kanal ayrışması (sürekli çalışmaz) ---------- */
    _future() {
      var self = this, gl = this.querySelector('.ai-gl'), last = 0;
      this._glitch = function (k) {
        var g = window.gsap;
        if (!g || matchMedia('(prefers-reduced-motion: reduce)').matches || !gl.isConnected) return;
        var now = Date.now(); if (now - last < 1800) return; last = now;
        k = k || 1;
        var r = gl.querySelector('.ai-gl__ch--r'), c = gl.querySelector('.ai-gl__ch--c'), base = gl.querySelector('.ai-gl__img');
        gl.classList.add('is-gl');
        g.timeline({ onComplete: function () { gl.classList.remove('is-gl'); g.set([r, c, base], { clearProps: 'all' }); } })
          .set([r, c], { opacity: .8 })
          .to(r, { x: '1.6%', duration: .08 * k, ease: 'steps(2)' }, 0)
          .to(c, { x: '-1.6%', duration: .08 * k, ease: 'steps(2)' }, 0)
          .to(r, { clipPath: 'inset(18% 0% 52% 0%)', x: '3%', duration: .06 * k, ease: 'none' }, .1 * k)
          .to(c, { clipPath: 'inset(56% 0% 20% 0%)', x: '-2.4%', duration: .06 * k, ease: 'none' }, .1 * k)
          .to(base, { x: '-0.8%', duration: .05, ease: 'none' }, .14 * k)
          .to(base, { x: '0%', duration: .05, ease: 'none' }, .24 * k)
          .to([r, c], { clipPath: 'inset(0% 0% 0% 0%)', duration: .1 * k, ease: 'none' }, .28 * k)
          .to(r, { x: '.6%', duration: .1 * k }, .28 * k)
          .to(c, { x: '-.6%', duration: .1 * k }, .28 * k)
          .to([r, c], { opacity: 0, x: 0, duration: .38 * k, ease: 'power2.out' }, .46 * k);
      };
      if (matchMedia('(hover:hover) and (pointer:fine) and (min-width:1025px)').matches) this._ev(gl, 'pointerenter', function () { self._glitch(.7); });
    }

    /* ---------- Hareket ---------- */
    _animate() {
      var gsap = window.gsap, STg = window.ScrollTrigger, self = this;
      if (!gsap) return;
      if (STg) gsap.registerPlugin(STg);
      var q = function (s, r) { return [].slice.call((r || self).querySelectorAll(s)); };
      var one = function (s, r) { return (r || self).querySelector(s); };
      var once = function (el, start) { return { trigger: el, start: start || 'top 84%', once: true }; };
      var hero = one('.ai-hero'), stage = one('.ai-hero__stage'), win = one('.ai-hero__win'), caret = one('.ai-hero__caret');
      var wA = one('.ai-hw--a'), wB = one('.ai-hw--b');

      this._ctx = gsap.context(function () {
        var mm = gsap.matchMedia();

        /* 01 Hero — "YAPAY ZEKÂ." yazılır, araya bir imleç düşer; imleç açılır ve videonun penceresi olur */
        mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px)', function () {
          var sr = stage.getBoundingClientRect(), mid = sr.left + sr.width / 2;
          var dA = mid - wA.getBoundingClientRect().right - 10, dB = mid - wB.getBoundingClientRect().left + 10;
          var k = win.offsetHeight / Math.max(1, caret.offsetHeight);
          var tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
          tl.from(q('.ai-kick span'), { opacity: 0, y: 8, duration: .7, stagger: .08 }, 0)
            .set(win, { clipPath: 'inset(0% 50% 0% 50%)' }, 0)
            .set(wA, { x: dA }, 0).set(wB, { x: dB }, 0)
            .set(caret, { opacity: 1, scaleY: 0 }, 0)
            .to(caret, { scaleY: 1, duration: .35, ease: 'power3.out' }, .15)
            .from(q('.ai-ch', wA).concat(q('.ai-ch', wB)), { opacity: 0, duration: .01, stagger: .075, ease: 'none' }, .35)
            .to(caret, { keyframes: [{ opacity: 0, duration: .01 }, { opacity: 1, duration: .01, delay: .24 }, { opacity: 0, duration: .01, delay: .24 }, { opacity: 1, duration: .01, delay: .24 }] }, 1.15)
            .to(caret, { scaleY: k, duration: .9, ease: 'expo.inOut' }, 1.95)
            .to(win, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.25, ease: 'expo.inOut' }, 2.35)
            .to([wA, wB], { x: 0, duration: 1.25, ease: 'expo.inOut' }, 2.35)
            .to(caret, { opacity: 0, duration: .5, ease: 'power2.out' }, 2.9)
            .from(q('.ai-hero__msg .ai-ln>span'), { yPercent: 140, duration: 1.1, ease: 'power4.out', stagger: .1 }, 3.0)
            .from(q('.ai-hero__sub, .ai-scroll'), { opacity: 0, y: 16, duration: .9, stagger: .1 }, 3.3);
          return function () { gsap.set([win, wA, wB, caret], { clearProps: 'all' }); };
        });
        mm.add('(prefers-reduced-motion: no-preference) and (max-width: 767px)', function () {
          var tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
          tl.from(q('.ai-kick span'), { opacity: 0, y: 8, duration: .7, stagger: .08 }, 0)
            .from(q('.ai-hero__t .ai-ch'), { opacity: 0, duration: .01, stagger: .07, ease: 'none' }, .2)
            .fromTo(win, { clipPath: 'inset(0% 49.4% 0% 49.4%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'expo.inOut' }, 1.1)
            .from(q('.ai-hero__msg .ai-ln>span'), { yPercent: 140, duration: 1, ease: 'power4.out', stagger: .1 }, 1.6)
            .from(q('.ai-hero__sub, .ai-scroll'), { opacity: 0, y: 14, duration: .8, stagger: .1 }, 1.9);
          return function () { gsap.set(win, { clearProps: 'clipPath' }); };
        });
        /* Hero — kaydırdıkça pencere büyür, kelimeler kenarlara açılır (yalnızca masaüstü) */
        mm.add('(prefers-reduced-motion: no-preference) and (min-width: 1025px)', function () {
          var st = { trigger: hero, start: 'top top', end: 'bottom top', scrub: .6 };
          gsap.to(win, { scale: 1.12, ease: 'none', scrollTrigger: st });
          gsap.to(one('.ai-chs', wA), { xPercent: -22, ease: 'none', scrollTrigger: st });
          gsap.to(one('.ai-chs', wB), { xPercent: 22, ease: 'none', scrollTrigger: st });
        });

        /* Bölüm işaretleri: imleç önce gelir, ardından yazı */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          q('.ai-sec .ai-mark, .ai-fin .ai-mark').forEach(function (m) {
            var tl = gsap.timeline({ scrollTrigger: once(m, 'top 90%') });
            tl.from(one('.ai-caret', m), { scaleY: 0, duration: .4, ease: 'power3.out' }).from(m, { opacity: 0, x: -10, duration: .7, ease: 'expo.out' }, .1);
          });
        });

        /* 02 İnsan — başlık yükselir; HUMAN VISION ile ARTIFICIAL INTELLIGENCE kaydırdıkça buluşur */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          var h = one('#ai-human-t');
          gsap.from(q('.ai-ln>span', h), { yPercent: 140, duration: 1.15, ease: 'power4.out', stagger: .09, scrollTrigger: once(h) });
          gsap.from(q('.ai-human__sub span, .ai-human__copy .ai-body'), { opacity: 0, y: 16, duration: .9, ease: 'expo.out', stagger: .1, scrollTrigger: once(one('.ai-human__sub')) });
          var fig = one('.ai-human__img');
          gsap.fromTo(fig, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut', scrollTrigger: once(fig) });
          gsap.from(q('.ai-pair__l li'), { opacity: 0, x: -12, duration: .7, ease: 'expo.out', stagger: .05, scrollTrigger: once(one('.ai-pair')) });
          return function () { gsap.set(fig, { clearProps: 'clipPath' }); };
        });
        mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px)', function () {
          var eq = one('.ai-eq'), st = { trigger: eq, start: 'top bottom', end: 'center 55%', scrub: .5 };
          gsap.fromTo(one('.ai-eq__a'), { xPercent: -55, opacity: .15 }, { xPercent: 0, opacity: 1, ease: 'none', scrollTrigger: st });
          gsap.fromTo(one('.ai-eq__b'), { xPercent: 45, opacity: .15 }, { xPercent: 0, opacity: 1, ease: 'none', scrollTrigger: st });
          gsap.fromTo(one('.ai-eq__x'), { rotation: -135, scale: .3 }, { rotation: 0, scale: 1, ease: 'none', scrollTrigger: st });
        });
        mm.add('(prefers-reduced-motion: no-preference) and (max-width: 767px)', function () {
          gsap.from(q('.ai-eq > span'), { opacity: 0, y: 18, duration: .8, ease: 'expo.out', stagger: .12, scrollTrigger: once(one('.ai-eq')) });
        });

        /* 03 Üretim — HAYAL ET. YÖNET. ÜRET. sırayla; her alanın açılışı farklı */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          var t = one('.ai-prod__t');
          gsap.from(q('.ai-pw', t), { opacity: 0, scale: .72, transformOrigin: '0% 85%', duration: 1, ease: 'expo.out', stagger: .28, scrollTrigger: once(t) });
          var R = {
            1: { from: 'inset(100% 0% 0% 0%)', to: 'inset(0% 0% 0% 0%)' },
            2: { from: 'circle(0% at 50% 50%)', to: 'circle(72% at 50% 50%)' },
            3: { from: 'inset(0% 50% 0% 50%)', to: 'inset(0% 0% 0% 0%)' },
            4: { from: 'polygon(0% 0%, 0% 0%, -40% 100%, 0% 100%)', to: 'polygon(0% 0%, 140% 0%, 100% 100%, 0% 100%)' },
            5: { from: 'inset(48% 0% 48% 0%)', to: 'inset(0% 0% 0% 0%)' }
          };
          var targets = [];
          [1, 2, 3, 4, 5].forEach(function (i) {
            var row = one('.ai-pr--' + i), media = one('.ai-pr__fig, .ai-pr__vid', row);
            targets.push(media);
            gsap.fromTo(media, { clipPath: R[i].from }, { clipPath: R[i].to, duration: 1.5, ease: 'expo.inOut', scrollTrigger: once(media, 'top 82%') });
            var im = one('.ai-pr__img', row); if (im) gsap.from(im, { scale: 1.18, duration: 1.9, ease: 'power3.out', scrollTrigger: once(media, 'top 82%') });
            gsap.from(q('.ai-pr__n, .ai-pr__k, .ai-pr__d', row), { opacity: 0, y: 18, duration: .9, ease: 'expo.out', stagger: .09, scrollTrigger: once(one('.ai-pr__copy', row), 'top 88%') });
            var w = one('.ai-pr__w', row); if (w) gsap.from(w, { opacity: 0, xPercent: i === 1 ? -10 : 10, duration: 1.6, ease: 'expo.out', scrollTrigger: once(media, 'top 70%') });
          });
          return function () { gsap.set(targets, { clearProps: 'clipPath' }); };
        });

        /* 04 Creative Lab — başlık harfleri rastgele sırayla; sahne sinemaskop şeritten açılır */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          var h = one('#ai-lab-t'), mix = one('.ai-mix');
          gsap.from(q('.ai-ch', h), { opacity: 0, duration: .5, ease: 'power2.out', stagger: { each: .035, from: 'random' }, scrollTrigger: once(h) });
          gsap.from(q('.ai-dir'), { opacity: 0, x: -16, duration: .8, ease: 'expo.out', stagger: .08, scrollTrigger: once(one('.ai-dirs')) });
          gsap.fromTo(mix, { clipPath: 'inset(50% 0% 50% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut', scrollTrigger: once(mix, 'top 80%') });
          return function () { gsap.set(mix, { clearProps: 'clipPath' }); };
        });

        /* 05 Süreç — başlık satırları silinir gibi yazılır; her aşamanın adı kaydırdıkça dolar */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          var h = one('#ai-flow-t');
          gsap.from(q('.ai-ln>span', h), { clipPath: 'inset(-20% 100% -20% 0%)', duration: 1.2, ease: 'power3.inOut', stagger: .2, scrollTrigger: once(h) });
          q('.ai-step').forEach(function (s) {
            var st = { trigger: s, start: 'top 88%', end: 'top 48%', scrub: .5 };
            gsap.fromTo(one('.ai-step__f', s), { clipPath: 'inset(-20% 100% -20% 0%)' }, { clipPath: 'inset(-20% 0% -20% 0%)', ease: 'none', scrollTrigger: st });
            gsap.fromTo(q('.ai-step__d, .ai-step__n', s), { opacity: .2 }, { opacity: 1, ease: 'none', scrollTrigger: st });
          });
          return function () { gsap.set(q('.ai-step__f, .ai-ln>span', one('.ai-flow')), { clearProps: 'clipPath' }); };
        });

        /* 06 Hareket — satırlar yandan gelir; video penceresi yaklaşır */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          var h = one('#ai-motion-t');
          gsap.from(q('.ai-ln>span', h), { xPercent: -30, opacity: 0, duration: 1.2, ease: 'expo.out', stagger: .1, scrollTrigger: once(h) });
          gsap.from(q('.ai-motion__copy .ai-body'), { opacity: 0, y: 14, duration: .9, ease: 'expo.out', stagger: .12, scrollTrigger: once(one('.ai-motion__copy .ai-body')) });
          var v = one('.ai-motion__vid');
          gsap.fromTo(v, { clipPath: 'inset(8% 8% 8% 8%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut', scrollTrigger: once(v, 'top 82%') });
          gsap.from(q('.ai-chap li'), { opacity: 0, x: 18, duration: .8, ease: 'expo.out', stagger: .08, scrollTrigger: once(one('.ai-chap')) });
          return function () { gsap.set(v, { clearProps: 'clipPath' }); };
        });

        /* 07 Sorumluluk — "ÜRETMEK YETMEZ." üstü çizilir ve geri çekilir */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          var h = one('#ai-resp-t'), a = one('.ai-resp__a');
          var tl = gsap.timeline({ scrollTrigger: once(h, 'top 78%') });
          tl.from(q('.ai-ln>span', a), { yPercent: 140, duration: 1.05, ease: 'power4.out', stagger: .09 })
            .from(a, { color: '#ECEBE5', duration: .6, ease: 'power2.out' }, 1.05)
            .from(one('.ai-strike'), { scaleX: 0, duration: .7, ease: 'power3.inOut' }, .95)
            .from(q('.ai-resp__b .ai-ln>span'), { yPercent: 140, duration: 1.05, ease: 'power4.out', stagger: .09 }, 1.3);
          gsap.from(one('.ai-resp__q'), { opacity: 0, y: 20, duration: 1, ease: 'expo.out', scrollTrigger: once(one('.ai-resp__q')) });
          q('.ai-check').forEach(function (c, i) { gsap.from(c, { opacity: 0, y: 16, duration: .8, ease: 'expo.out', delay: (i % 2) * .08, scrollTrigger: once(c, 'top 92%') }); });
        });

        /* 08 Gelecek — harf aralığı kapanır; görsel girişte bir kez kanal ayrışması yaşar */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          var h = one('#ai-future-t');
          gsap.from(q('.ai-future__a .ai-ln>span'), { opacity: 0, letterSpacing: '.24em', duration: 1.4, ease: 'expo.out', stagger: .1, scrollTrigger: once(h) });
          gsap.from(q('.ai-future__b .ai-ln>span'), { opacity: 0, letterSpacing: '.24em', duration: 1.4, ease: 'expo.out', stagger: .1, scrollTrigger: once(one('.ai-future__b')) });
          gsap.from(q('.ai-trio li'), { opacity: 0, y: 16, duration: .9, ease: 'expo.out', stagger: .1, scrollTrigger: once(one('.ai-trio')) });
        });
        mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px)', function () {
          var gl = one('.ai-gl');
          gsap.fromTo(one('.ai-gl__img'), { scale: 1.12 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: gl, start: 'top bottom', end: 'bottom top', scrub: .6 } });
          STg && STg.create({ trigger: gl, start: 'top 62%', once: true, onEnter: function () { self._glitch && self._glitch(1); } });
        });

        /* 09 Final — bir istem gibi yazılır */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          var h = one('#ai-fin-t');
          gsap.from(q('.ai-ch', h), { opacity: 0, duration: .01, ease: 'none', stagger: .05, scrollTrigger: once(h, 'top 80%') });
          gsap.from(q('.ai-fin__sub, .ai-fin__cta .ai-btn'), { opacity: 0, y: 18, duration: .9, ease: 'expo.out', stagger: .1, scrollTrigger: once(one('.ai-fin__row'), 'top 92%') });
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
      this._fcOwned = false; this._footerOwned = false; this._header = null; this._vids = null; this._mix = null;
      this.replaceChildren();
      var st = document.getElementById(STYLE_ID); if (st && !document.querySelector(TAG)) st.remove();
    }
  }
  customElements.define(TAG, YapayZekaV2);
})();
