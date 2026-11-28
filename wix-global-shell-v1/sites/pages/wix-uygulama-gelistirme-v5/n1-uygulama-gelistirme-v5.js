/* GLOBAL SHELL V1 (wix-global-shell-v1) — kaynak: wix-career-v1/sites/pages/wix-uygulama-gelistirme-v4/n1-uygulama-gelistirme-v4.js. Değişen tek şey: Header v14 (İletişim, A7 Prodüksiyon, Uygulama ve Platformlar) ve site işaretlemesi v16 adresleri. */
/* KARİYER V1 (wix-career-v1/sites) — kaynak: wix-mobile-performance-v14/pages/wix-uygulama-gelistirme-v3/n1-uygulama-gelistirme-v3.js. Değişen tek şey: Header v13 (İnsan Kaynakları bağlantı + ayrı alt menü düğmesi) ve site işaretlemesi v15 (kariyer menüsü) adresleri. */
/* MOBILE PERFORMANCE V1.4 — n1-uygulama-gelistirme-v3.js = v2 + telefon/tablette ikincil videolar (web, ekranlar, hareket) yerine WebP kare; hero videosu korunur; belge yaşam döngüsü. Tag name DEĞİŞMEDİ: n1-uygulama-gelistirme-v2. */
/* GLOBAL MENU V1.2 (wix-global-menu-v12/pages) — kaynak: wix-sitewide-mobile-fix-2026-11-26/wix-uygulama-gelistirme-v2/n1-uygulama-gelistirme-v2.js @f97db8ed. Değişen tek şey: Header/markup adresleri (v12) ve Hizmetler satırı. */
/*!
 * n1-uygulama-gelistirme-v2 — 1N Digital Media · Uygulama Geliştirme (/uygulama-gelistirme) · Beyond the Screen / Ekranın ötesinde bir deneyim
 * Wix Studio Custom Element · Tag name: n1-uygulama-gelistirme-v2 · Kaynak: bu dosyanın HTTPS adresi
 * Bağımsız V1 sürümü; diğer hizmet sayfalarına, onaylı Header/Footer ve ana sayfa kaynaklarına dokunulmadı.
 *
 * Fikir: bir ekran çerçevesi. Sayfa boyunca içerik o çerçevenin dışına taşar; fikir ekranda kalmaz, çalışan bir deneyime dönüşür.
 *  01 Hero          Küçük bir ekran çerçevesi açılır ve tam genişliğe taşar; "FİKİRDEN ÜRÜNE." konturdan dolguya geçer.
 *  02 İnsan         Görsel, insanın yüzünden başlayan bir daireyle açılır; altı konu okundukça aydınlanır.
 *  03 App Lab       Product Experience Simulator: aynı temsili veriyle çalışan Mobile App, Web App ve Dashboard.
 *  04 Ne yapıyoruz  Beş hizmet; masaüstünde dizin + sahne, telefonda ve tablette alt alta.
 *  05 Süreç         Yedi aşama; kaydırdıkça yandaki küçük ürün taslaktan sürüme gelişir.
 *  06 Hareket       Dikey video ve beş mikro etkileşim; hareket açılıp kapatılarak karşılaştırılabilir.
 *  07 Gerçek hayat  Üç kullanım bağlamı; cihaz şeması ve tasarım kararları birlikte değişir.
 *  08 Kalite        Sekiz ilke; her biri bir kontrol işaretiyle çizilir.
 *  09 Final         Sorudan birincil düğmeye inen bir çizgi.
 *
 * Mimari: Light DOM, sınıf öneki ap-. Onaylı v6.48 Header + menü, Footer, WhatsApp / Yukarı Çık modülleri commit'e sabit
 * adreslerden aynen yüklenir; sayfada başka bir Header / Footer / kontrol katmanı varsa ikincisi oluşturulmaz.
 * GSAP 3.13.0 + ScrollTrigger yalnızca sayfada yoksa yüklenir. Pin ve spacer yok; animasyonlar gsap.context + matchMedia içinde.
 * Videolar: poster yok, autoplay özniteliği yok; muted + playsinline + loop. Aynı anda yalnızca bir video oynar,
 * görünmeyen durur, uzaktakiler indirilmez. Yalnızca verilen 720p adresleri kullanılır.
 * İçerik CSS'te gizlenmez: GSAP yüklenemezse ya da hareket azaltma açıksa sayfa son hâliyle görünür ve demolar çalışır.
 *
 * İsteğe bağlı öznitelik (yalnızca Wix dışı önizleme için): deps-base="<klasör>/"
 */
(function () {
  'use strict';
  var TAG = 'n1-uygulama-gelistirme-v2';
  var STYLE_ID = 'n1-ap2-style';
  if (customElements.get(TAG)) return;

  /* ---------- Onaylı kaynaklar (commit'e sabit) ---------- */
  var CDN = 'https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@';
  var C648 = 'd24fa373d6d76c0218b3f3b77897a8c2ace04e5e';
  var CM12 = '162599ec580db98d848cf6670bcde7ee30bf97f5';   /* GLOBAL MENU V1.2: Hizmetler alt menülü markup + header v12 */
  var CCR = 'cce282464fb3eac460bb13b4d03286b250d65712';   /* KARİYER V1: header v13 + site işaretlemesi v15 (İnsan Kaynakları menüsü) */
  var CRESP = '09612df97e85978976d13edbd79dad0adcc1d1f1';
  var PATHS = {
    markup: CCR + '/wix-global-shell-v1/site/n1-site-markup-v16.js',
    header: CCR + '/wix-global-shell-v1/modules/n1-header-v14.js',
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
  // Yalnızca verilen 720p adresleri kullanılır; başka çözünürlük adresi üretilmez.
  var VB = 'https://video.wixstatic.com/video/6dbf5e_';
  var VID = {
    // 1280×720 · 7,0 sn · siyah zeminde su damlaları; sarı-yeşil bir ışık çizgisi gelir, sıvı bir küre döner ve bir telefona dönüşür
    hero: { src: VB + '8957dee5671c411da297848f5ee956d0/720p/mp4/file.mp4', w: 1280, h: 720, first: 0 },
    // 720×1280 · 6,7 sn · koyu arayüz panelleri; telefon ekranından büyük bir monitördeki web arayüzüne geçiş
    web: { src: VB + '58f4d602044e4af1972b2898b5a5694a/720p/mp4/file.mp4', w: 720, h: 1280, first: 3.2 },
    // 720×1280 · 5,7 sn · yeşil tonlu konsept ürün ("Quarn"): telefon, masaüstü, büyük ekran ve saat
    screens: { src: VB + 'cbd02cfab44141d6838302d4f3b915c7/720p/mp4/file.mp4', w: 720, h: 1280, first: 1.6 },
    // 720×1280 · 11,4 sn · açık, pastel arayüz bileşenleri birbirine dönüşür; telefon, kartlar, figürler
    motion: { src: VB + '23811760080b45b7aa77526f31898777/720p/mp4/file.mp4', w: 720, h: 1280, first: 3 }
  };

  var IMG_BASE = 'https://static.wixstatic.com/media/6dbf5e_';
  // fit: genişlik w, yükseklik serbest (h = 3w). Orijinal dosya biçimi (png) korunur; orijinalden büyük istenmez.
  function img(m, w) { w = Math.min(w, m.w); return IMG_BASE + m.id + '~mv2.png/v1/fit/w_' + w + ',h_' + (w * 3) + ',q_86,enc_auto/uygulama-gelistirme.png'; }
  function srcset(m) {
    var out = [];
    [480, 760, 1100, 1500, 1800].forEach(function (w) { var r = Math.min(w, m.w); if (out.indexOf(r) < 0) out.push(r); });
    return out.map(function (w) { return img(m, w) + ' ' + w + 'w'; }).join(', ');
  }
  function pic(m, cls, alt, sizes, pos) {
    return '<img class="' + cls + '" src="' + img(m, 760) + '" srcset="' + srcset(m) + '" sizes="' + sizes + '" alt="' + alt + '"' +
      ' width="' + m.w + '" height="' + m.h + '" loading="lazy" decoding="async"' + (pos ? ' style="object-position:' + pos + '"' : '') + '>';
  }
  var IM = {
    // 941×1672 · eğik telefonda "Move Smarter" etkinlik paneli, arkasında cam bir ikinci ekran, sıvı kıvrımlar; altta mağaza rozetleri (kadraj dışında bırakılır)
    phone: { id: '743bc98f9700467488238240371a7f82', w: 941, h: 1672 },
    // 1122×1402 · "Track More, Achieve More" grafikli telefon, çevresinde sıvı halka ve kabarcıklar; altta mağaza rozetleri (kadraj dışında bırakılır)
    track: { id: '4f7093b2349244c6807bf0e39b6a3a81', w: 1122, h: 1402 },
    // 941×1672 · telefonun üzerinde katman katman ayrılmış cam kartlar (oynat, görsel, grafik, mesaj); altta koyu bir dalga
    layers: { id: '736ef9d37279475fa0acfff055377404', w: 941, h: 1672 },
    // 941×1672 · ekranında yeşil dalga çizgileri olan eğik bir telefon, kaya bir zeminin üzerinde
    rock: { id: 'afe04b8ed3574774becd2a9d5c851888', w: 941, h: 1672 },
    // 1671×941 · gözleri kapalı, kulaklıklı bir kadın; yanında süzülen cam arayüz kartları
    human: { id: 'cd0f0715f18d4141bf8e71149a13ad33', w: 1671, h: 941 },
    // 941×1672 · ışık huzmesiyle telefonun üstünde yükselen, parlayan cam kart yığını; sıvı şeritler
    stack: { id: 'b4395e2c7e014e258d21d6204343e770', w: 941, h: 1672 }
  };

  /* ---------- App Lab: temsili ürün "Atölye" ve örnek veri (gerçek bir uygulama değildir) ---------- */
  var ST_ORDER = ['planned', 'progress', 'review', 'done'];
  var ST_NAME = { planned: 'Planlandı', progress: 'Sürüyor', review: 'İncelemede', done: 'Tamamlandı' };
  var TYPES = ['Tasarım', 'Video', 'Ürün'];
  var SEED = [
    { id: 'p1', name: 'Lansman filmi', type: 'Video', status: 'progress', due: '12 Ara', tasks: [['Senaryo onayı', 1], ['Çekim planı', 1], ['Kurgu', 0], ['Ses ve renk', 0]] },
    { id: 'p2', name: 'Mobil uygulama ana ekranı', type: 'Ürün', status: 'review', due: '9 Ara', tasks: [['Kullanıcı akışı', 1], ['Arayüz tasarımı', 1], ['Prototip testi', 1], ['Geri bildirim düzeltmeleri', 0]] },
    { id: 'p3', name: 'Sosyal medya şablon seti', type: 'Tasarım', status: 'progress', due: '15 Ara', tasks: [['Izgara sistemi', 1], ['Tipografi', 0], ['12 şablon', 0]] },
    { id: 'p4', name: 'Katalog çekimi', type: 'Video', status: 'planned', due: '20 Ara', tasks: [['Mekân seçimi', 0], ['Ürün listesi', 0], ['Işık planı', 0]] },
    { id: 'p5', name: 'Web sitesi yenileme', type: 'Ürün', status: 'progress', due: '22 Ara', tasks: [['İçerik haritası', 1], ['Tasarım sistemi', 0], ['Geliştirme', 0], ['Erişilebilirlik kontrolü', 0]] },
    { id: 'p6', name: 'Marka kılavuzu', type: 'Tasarım', status: 'done', due: '2 Ara', tasks: [['Logo kullanımı', 1], ['Renk ve yazı', 1], ['Uygulama örnekleri', 1]] },
    { id: 'p7', name: 'Bülten tasarımı', type: 'Tasarım', status: 'planned', due: '27 Ara', tasks: [['Şablon', 0], ['Mobil kontrol', 0]] },
    { id: 'p8', name: 'Rezervasyon akışı prototipi', type: 'Ürün', status: 'review', due: '11 Ara', tasks: [['Akış şeması', 1], ['Tıklanabilir prototip', 1], ['Kullanıcı denemesi', 0]] }
  ];
  function seed() {
    return SEED.map(function (p) { return { id: p.id, name: p.name, type: p.type, status: p.status, due: p.due, tasks: p.tasks.map(function (t, i) { return { id: p.id + 't' + i, t: t[0], d: !!t[1] }; }) }; });
  }
  function prog(p) { var n = p.tasks.length, d = p.tasks.filter(function (t) { return t.d; }).length; return n ? Math.round(d / n * 100) : 0; }

  /* ---------- Yardımcılar ---------- */

  /* Mobile/tablet reliability hotfix — preserve desktop rendering. */
  function n1MobileRepair(){return matchMedia('(max-width: 900px), (max-width: 1366px) and (hover: none) and (pointer: coarse)').matches;}

  /* ---------- V1.4 · cihaz profili, mobil sabit kareler, belge yaşam döngüsü (wix-mobile-performance-v14/RESOURCE_LIFECYCLE.md) ---------- */
  // Hafif profil = telefon ve tablet (iPad yatay, izleme dörtgenli iPad dahil; dokunmatik ekran her zaman vardır). Sayfa açılışında BİR KEZ belirlenir:
  // döndürme ya da pencere boyutu değişince medya yeniden seçilmez (yükleme/çözücü dalgalanması olmaz). Masaüstü (yalnız fare/izleme dörtgeni) her genişlikte videoyu korur.
  var N1_LITE = (function () { try { return matchMedia('(any-pointer: coarse) and (max-width: 1366px)').matches || matchMedia('(max-width: 900px) and (hover: none)').matches; } catch (e) { return false; } })();
  var N1_STILLS = 'https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@274e02bbda53e00b186c4d1b82349edc9dd32009/wix-mobile-performance-v14/media/stills/uygulama-gelistirme/';
  var N1_STILL = {"uygulama-web":{"w":720,"h":1280,"ws":[480,720]},"uygulama-screens":{"w":720,"h":1280,"ws":[480,720]},"uygulama-motion":{"w":720,"h":1280,"ws":[480,720]}};
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
    return n1Deadline(task,10000,'JS '+src).catch(function(e){if(ready&&ready())return;if(ready&&/n1-header-v14\.js|n1-site-markup-v16\.js/.test(src))return n1Deadline(loadJsOriginal(src,ready,true),8000,'retry '+src);throw e;});
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
    arrow: '<svg class="ap-ico"' + SV + '><path d="M4.5 11.5l7-7M5.5 4.5h6v6"/></svg>',
    down: '<svg class="ap-ico"' + SV + '><path d="M8 3v10M3.5 8.5L8 13l4.5-4.5"/></svg>',
    play: '<svg class="ap-ico ap-ico--play"' + SV + '><path d="M5 3.5v9l7-4.5z"/></svg>',
    pause: '<svg class="ap-ico ap-ico--pause"' + SV + '><path d="M5.5 3.5v9M10.5 3.5v9"/></svg>',
    prev: '<svg class="ap-ico"' + SV + '><path d="M13 8H3M7.5 3.5L3 8l4.5 4.5"/></svg>',
    next: '<svg class="ap-ico"' + SV + '><path d="M3 8h10M8.5 3.5L13 8l-4.5 4.5"/></svg>'
  };
  function ln(t, cls) { return '<span class="ap-ln' + (cls ? ' ' + cls : '') + '"><span>' + t + '</span></span>'; }
  function chars(t, cls) { return '<span class="ap-chs' + (cls ? ' ' + cls : '') + '">' + Array.from(t).map(function (c) { return c === ' ' ? '<span class="ap-sp"> </span>' : '<span class="ap-ch">' + c + '</span>'; }).join('') + '</span>'; }
  /* ---------- İçerik ---------- */
  var SV2 = ' viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"';
  var I2 = {
    corner: '<svg class="ap-ico ap-corner"' + SV2 + '><path d="M2 6V2h4M14 10v4h-4"/></svg>',
    back: '<svg class="ap-ico"' + SV2 + '><path d="M10 3.5L5.5 8l4.5 4.5"/></svg>',
    chev: '<svg class="ap-ico"' + SV2 + '><path d="M6 3.5L10.5 8 6 12.5"/></svg>',
    check: '<svg class="ap-ico"' + SV2 + '><path d="M3 8.5l3 3 7-7"/></svg>',
    reset: '<svg class="ap-ico"' + SV2 + '><path d="M3 3v3.5h3.5"/><path d="M3.6 6.4A5 5 0 1 1 3 9"/></svg>',
    search: '<svg class="ap-ico"' + SV2 + '><circle cx="7" cy="7" r="4.25"/><path d="M10.2 10.2L13.5 13.5"/></svg>',
    folder: '<svg class="ap-ico"' + SV2 + '><path d="M2 4.5h4l1.5 1.5H14v6.5H2z"/></svg>',
    list: '<svg class="ap-ico"' + SV2 + '><path d="M5.5 4h8M5.5 8h8M5.5 12h8M2.5 4h.5M2.5 8h.5M2.5 12h.5"/></svg>',
    gear: '<svg class="ap-ico"' + SV2 + '><circle cx="8" cy="8" r="2"/><path d="M8 1.8v2M8 12.2v2M1.8 8h2M12.2 8h2M3.6 3.6L5 5M11 11l1.4 1.4M3.6 12.4L5 11M11 5l1.4-1.4"/></svg>',
    board: '<svg class="ap-ico"' + SV2 + '><path d="M2.5 2.5h3v11h-3zM6.5 2.5h3v7h-3zM10.5 2.5h3v9h-3z"/></svg>',
    bars: '<svg class="ap-ico"' + SV2 + '><path d="M2.5 4h7M2.5 8h11M2.5 12h4.5"/></svg>',
    next: '<svg class="ap-ico"' + SV2 + '><path d="M3 8h9.5M9 4.5L12.5 8 9 11.5"/></svg>',
    bell: '<svg class="ap-ico ap-bell"' + SV2 + '><path d="M4 11V7a4 4 0 0 1 8 0v4l1 1.5H3z"/><path d="M6.8 14h2.4"/><path class="ap-bell__x" d="M2.5 2.5l11 11"/></svg>',
    mark: '<svg class="ap-ico ap-markico"' + SV2 + '><path d="M4 2.5h8v11L8 10.5l-4 3z"/></svg>'
  };
  function lab(t) { return '<p class="ap-label">' + I2.corner + '<span>' + t + '</span></p>'; }
  function vid(key, cls, label, note) {
    var m = VID[key];
    if (N1_LITE && key !== 'hero' && N1_STILL['uygulama-' + key]) return '<div class="ap-vid ' + cls + ' is-ready" data-still="' + key + '" style="--ar:' + m.w + '/' + m.h + '">' + n1StillHtml('uygulama-' + key, label) + (note ? '<p class="ap-vid__note">' + note + '</p>' : '') + '</div>';   // V1.4
    return '<div class="ap-vid ' + cls + '" data-v="' + key + '" style="--ar:' + m.w + '/' + m.h + '">' +
      '<video muted playsinline webkit-playsinline loop preload="none" disablepictureinpicture aria-label="' + label + '"></video>' +
      '<button class="ap-play" type="button" data-paused="1" aria-label="Videoyu oynat">' + I.play + I.pause + '</button>' +
      '<p class="ap-vid__err" role="status"></p>' + (note ? '<p class="ap-vid__note">' + note + '</p>' : '') + '</div>';
  }
  function corners(cls) { return '<svg class="' + cls + '" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path vector-effect="non-scaling-stroke" d="M0 12V0h12M88 0h12v12M100 88v12H88M12 100H0V88"/></svg>'; }

  var TOPICS = [
    { k: 'Gerçek kullanıcı ihtiyacı', q: 'Bu ürünü kim, hangi anda ve neden açacak?' },
    { k: 'Problemin tanımlanması', q: 'Çözdüğümüz şey gerçek bir sorun mu, yoksa bir varsayım mı?' },
    { k: 'Kullanıcı yolculuğu', q: 'İlk açılıştan işin bittiği ana kadar hangi adımlardan geçiyor?' },
    { k: 'Erişilebilirlik', q: 'Klavyeyle, ekran okuyucuyla ve küçük ekranda da kullanılabiliyor mu?' },
    { k: 'Kullanım kolaylığı', q: 'En sık yapılan işlem en az adımla yapılabiliyor mu?' },
    { k: 'Ürün hedefleri', q: 'Ürünün işe yaradığını hangi davranıştan anlayacağız?' }
  ];
  var SVCS = [
    { k: 'MOBILE APPLICATIONS', tr: 'Mobil uygulamalar', d: 'Mobil cihazlara uygun, kullanıcının günlük akışına entegre edilen dijital deneyimler.' },
    { k: 'WEB APPLICATIONS', tr: 'Web uygulamaları', d: 'Tarayıcı üzerinden kullanılabilen, işlevsel ve kullanıcı odaklı uygulama arayüzleri.' },
    { k: 'CUSTOM DIGITAL PRODUCTS', tr: 'Özel dijital ürünler', d: 'Belirli bir ihtiyacı karşılamak için kurgulanan özel dijital çözümler.' },
    { k: 'DASHBOARDS & MANAGEMENT INTERFACES', tr: 'Yönetim panelleri', d: 'Bilginin anlaşılır, düzenli ve kullanılabilir biçimde sunulduğu yönetim deneyimleri.' },
    { k: 'PROTOTYPES & MVP EXPERIENCES', tr: 'Prototip ve MVP', d: 'Ürün fikirlerinin test edilmesini ve geliştirilmesini kolaylaştıran prototipler.' }
  ];
  var FLOW = [
    { k: 'DISCOVER', d: 'İhtiyacın ve ürün hedefinin anlaşılması.', s: 'Sorular masada: kim, neden, başarı neye benzer?' },
    { k: 'DEFINE', d: 'Fonksiyonların, kullanıcı akışlarının ve ürün kapsamının belirlenmesi.', s: 'Ekranlar ve aralarındaki yol belli olur.' },
    { k: 'DESIGN', d: 'Arayüzün, bilgi mimarisinin ve etkileşimlerin tasarlanması.', s: 'Yerleşim ve hiyerarşi tel çerçevede kurulur.' },
    { k: 'PROTOTYPE', d: 'Temel işlevlerin test edilebildiği bir deneyim oluşturulması.', s: 'Satıra dokunulur, detay açılır; akış denenebilir.' },
    { k: 'DEVELOP', d: 'Onaylanan kapsam doğrultusunda yazılımın geliştirilmesi.', s: 'Gerçek içerik, renk ve durumlarla çalışan arayüz.' },
    { k: 'TEST & REFINE', d: 'Kullanılabilirlik, erişilebilirlik ve temel işlevlerin değerlendirilmesi.', s: 'Dokunma alanı, kontrast ve klavye kontrol edilir.' },
    { k: 'EVOLVE', d: 'Geri bildirimlere ve değişen ihtiyaçlara göre ürünün geliştirilmesi.', s: 'Yeni sürüm: geri bildirimden gelen arama eklenir.' }
  ];
  var MOS = [
    { k: 'done', t: 'İşlem tamamlandı', w: 'Düğme bir onay işaretine dönüşür ve kısa bir bildirim gelir: işlem bitti, istenirse geri alınabilir.' },
    { k: 'page', t: 'Sayfa geçişi', w: 'Yeni ekran dokunulan yönden gelir, başlık yerinde kalır. Kullanıcı nerede olduğunu kaybetmez.' },
    { k: 'state', t: 'Durum değişimi', w: 'Anahtar kayar, simge değişir, yazı “Açık” olur. Durum yalnızca renkle değil, üç ayrı ipucuyla anlatılır.' },
    { k: 'feedback', t: 'Geri bildirim', w: 'Simge dolar ve bir an büyür; işlemin sonucu dokunulan yerde görülür.' },
    { k: 'load', t: 'Yükleme durumu', w: 'Gelecek içeriğin yeri önceden ayrılır, sayfa zıplamaz. Buradaki bekleme bir canlandırmadır; gerçek bir istek yapılmaz.' }
  ];
  var LIFE = {
    phone: { t: 'Yolda', s: 'Tek elde telefon', rows: ['Altta, başparmağın rahat ulaştığı yerde', 'En az 44 × 44 px, aralarında boşluk', 'Tek sütun; en önemli işlem ilk ekranda', 'Dokunma ve kısa metin; uzun form yok'] },
    tablet: { t: 'Toplantıda', s: 'Tablet, birlikte bakılan ekran', rows: ['Üstte sekmeler; yatayda yan panel', 'Dokunma ve klavye birlikte', 'İki sütun, sunuma uygun büyük ölçek', 'Dokunma, kalem; yön değişimine uyum'] },
    desk: { t: 'Masada', s: 'Masaüstü, odaklı çalışma', rows: ['Solda kalıcı menü', 'İşaretçi: üzerine gelme ve odak durumları', 'Liste ve detay yan yana, yoğun bilgi', 'Klavye kısayolları ve toplu işlem'] }
  };
  var LIFE_K = ['Navigasyon', 'Hedef ve girdi alanı', 'İçerik önceliği', 'Girdi biçimi'];
  var QUAL = [
    { k: 'Kullanılabilirlik', d: 'Kullanıcı ne yapacağını düşünmeden bulabilmeli; akışlar gerçek kişilerle denenir.' },
    { k: 'Performans', d: 'Görsel, video ve kod ihtiyaç kadar yüklenir; ağır işler kullanıcıyı bekletmez.' },
    { k: 'Erişilebilirlik', d: 'Klavye, ekran okuyucu, kontrast ve hareket hassasiyeti baştan hesaba katılır.' },
    { k: 'Hata yönetimi', d: 'Bir şey ters gittiğinde ne olduğu ve nasıl düzeltileceği açıkça söylenir.' },
    { k: 'Güvenli tasarım yaklaşımı', d: 'Yalnızca gereken veri istenir; yetkiler ve girişler en baştan düşünülür.' },
    { k: 'Tutarlı bileşenler', d: 'Aynı işlem her ekranda aynı görünür ve aynı biçimde davranır.' },
    { k: 'Test ve doğrulama', d: 'Her sürüm temel akışlar ve farklı ekranlar üzerinde kontrol edilir.' },
    { k: 'Bakım ve geliştirme', d: 'Kod ve tasarım, bir sonraki sürümü kolaylaştıracak biçimde düzenlenir.' }
  ];

  function heroM() {
    return '<section class="ap-hero" aria-labelledby="ap-hero-t">' +
      '<div class="ap-hero__stage">' +
        '<div class="ap-wrap ap-hero__copy">' +
          '<p class="ap-kick"><span>1N Digital Media</span><span>Uygulama Geliştirme</span></p>' +
          '<h1 id="ap-hero-t" class="ap-hero__t"><span class="ap-hl"><span class="ap-fill">FİKİRDEN</span></span><span class="ap-hl"><span class="ap-fill ap-fill--acc">ÜRÜNE.</span></span></h1>' +
        '</div>' +
        '<div class="ap-hero__screen">' + vid('hero', 'ap-hero__vid', 'Su damlalarından doğan sıvı bir formun dönerek bir telefona dönüştüğü sinematik video') + '<span class="ap-hero__shade" aria-hidden="true"></span></div>' +
        corners('ap-hero__frame') +
      '</div>' +
      '<div class="ap-wrap ap-hero__foot">' +
        '<p class="ap-hero__sub"><span class="ap-ln"><span>ÇALIŞAN</span></span><span class="ap-ln"><span>DENEYİMLER.</span></span></p>' +
        '<div class="ap-hero__side"><p class="ap-hero__txt">İyi dijital ürünler, güçlü fikirlerin doğru deneyimlerle buluşmasıyla ortaya çıkar. Kullanıcının ihtiyaçlarını anlayan, işlevsel ve gelişime açık uygulama deneyimleri tasarlıyoruz.</p>' +
        '<a class="ap-scroll" href="#ap-lab">App Lab’i deneyin' + I.down + '</a></div>' +
      '</div>' +
    '</section>';
  }

  function expM() {
    var T = [['Önce'], ['gerçek kullanıcı ihtiyacını', 1], ['dinleriz.'], ['Problemi tanımlarız,', 1], ['kullanıcı yolculuğunu', 1], ['çizeriz;'], ['erişilebilirliği,', 1], ['kullanım kolaylığını', 1], ['ve'], ['ürün hedeflerini', 1], ['aynı masada tutarız.']];
    var words = T.map(function (t) { return '<span class="ap-w' + (t[1] ? ' ap-w--k' : '') + '">' + t[0] + '</span>'; }).join(' ');
    return '<section class="ap-sec ap-exp" id="ap-insan" aria-labelledby="ap-exp-t"><div class="ap-wrap">' +
      '<div class="ap-exp__head">' +
        '<div>' + lab('Experience First') + '<h2 id="ap-exp-t" class="ap-h2 ap-exp__t">' + ln('ÖNCE') + ln('İNSANI') + ln('ANLARIZ.', 'ap-ln--acc') + '</h2></div>' +
        '<div class="ap-exp__side"><p class="ap-lede">Teknolojinin değeri, kullanıcıya sunduğu deneyimle ölçülür.</p>' +
        '<p class="ap-body">Bir uygulamaya ekran tasarlayarak değil, onu kullanacak kişinin gününe bakarak başlarız. Arayüz, bu anlayışın en son görünen hâlidir.</p></div>' +
      '</div></div>' +
      '<figure class="ap-exp__fig"><div class="ap-exp__frame">' + pic(IM.human, 'ap-exp__img', 'Gözleri kapalı, kulaklıklı bir kadın; yanında süzülen cam arayüz kartları', '(max-width:767px) 100vw, 94vw', '30% 50%') + '</div>' +
      '<figcaption class="ap-wrap ap-cap">Temsili görsel · müşteri projesi değildir</figcaption></figure>' +
      '<div class="ap-wrap"><p class="ap-sent" aria-label="Önce gerçek kullanıcı ihtiyacını dinleriz. Problemi tanımlarız, kullanıcı yolculuğunu çizeriz; erişilebilirliği, kullanım kolaylığını ve ürün hedeflerini aynı masada tutarız.">' + words + '</p>' +
      '<ul class="ap-qs">' + TOPICS.map(function (t, i) {
        return '<li class="ap-q"><span class="ap-q__n">0' + (i + 1) + '</span><span class="ap-q__k">' + t.k + '</span><span class="ap-q__q">' + t.q + '</span></li>';
      }).join('') + '</ul></div>' +
    '</section>';
  }

  function labM() {
    var V = [['mobile', 'MOBILE APP', 'Alt menü, liste, detay ve görev durumları'], ['web', 'WEB APP', 'Menü, filtrelenen liste ve detay paneli'], ['dash', 'DASHBOARD', 'Durum özeti, pano ve ilerleme görünümü']];
    return '<section class="ap-sec ap-lab" id="ap-lab" aria-labelledby="ap-lab-t"><div class="ap-wrap">' +
      '<div class="ap-lab__head">' +
        '<div>' + lab('Interactive App Lab') + '<h2 id="ap-lab-t" class="ap-h2 ap-lab__t">' + ln('BİR UYGULAMA.') + ln('BİRDEN FAZLA') + ln('DENEYİM.', 'ap-ln--acc') + '</h2></div>' +
        '<div class="ap-lab__intro"><p class="ap-lede">Bir dijital ürünün değeri yalnızca tasarımında değil, kullanıcısıyla kurduğu etkileşimdedir.</p>' +
        '<p class="ap-note"><strong>Product Experience Simulator.</strong> “Atölye” adlı temsili bir proje yönetimi uygulaması, örnek verilerle çalışır. Gerçek bir ürün değildir; sunucuya bağlanmaz, veri kaydetmez veya göndermez. Değişiklikler yalnızca bu sayfada tutulur ve üç görünüm arasında paylaşılır.</p></div>' +
      '</div>' +
      '<div class="ap-sim__bar"><div class="ap-views" role="tablist" aria-label="Ürün görünümü">' + V.map(function (v, i) {
        return '<button class="ap-view" type="button" role="tab" id="ap-v-' + v[0] + '" data-view="' + v[0] + '" aria-controls="ap-sim" aria-selected="' + (i ? 'false' : 'true') + '" tabindex="' + (i ? '-1' : '0') + '">' +
          '<span class="ap-view__n">0' + (i + 1) + '</span><span class="ap-view__t">' + v[1] + '</span><span class="ap-view__s">' + v[2] + '</span></button>';
      }).join('') + '</div>' +
      '<button class="ap-reset" type="button">' + I2.reset + '<span>Demoyu sıfırla</span></button></div>' +
      '<div class="ap-sim" id="ap-sim" role="tabpanel" aria-labelledby="ap-v-mobile" data-view="mobile">' + corners('ap-sim__corners') + '<div class="ap-dev"></div></div>' +
      '<p class="ap-sim__cap">Temsili ürün demosu · örnek veri · 1N Digital Media müşteri projesi değildir</p>' +
      '<p class="ap-sr" aria-live="polite" data-live></p>' +
    '</div></section>';
  }

  function buildM() {
    var media = [
      pic(IM.phone, 'ap-svc__img', 'Eğik bir telefonda etkinlik paneli ve arkasında cam bir ikinci ekran', '(max-width:1024px) 90vw, 40vw', '50% 0%'),
      vid('web', 'ap-svc__vid', 'Telefon ekranından büyük bir monitördeki web arayüzüne geçen koyu tonlu video'),
      pic(IM.stack, 'ap-svc__img', 'Bir telefonun üzerinde ışık huzmesiyle yükselen cam arayüz kartları', '(max-width:1024px) 90vw, 40vw', '50% 40%'),
      pic(IM.track, 'ap-svc__img', 'Grafikli bir telefon ekranı, çevresinde sıvı bir halka ve kabarcıklar', '(max-width:1024px) 90vw, 40vw', '50% 19%'),
      pic(IM.layers, 'ap-svc__img', 'Bir telefonun üzerinde katmanlarına ayrılmış cam kartlar', '(max-width:1024px) 90vw, 40vw', '50% 30%')
    ];
    return '<section class="ap-sec ap-build" aria-labelledby="ap-build-t"><div class="ap-wrap">' +
      lab('What We Build') +
      '<h2 id="ap-build-t" class="ap-build__t"><span class="ap-build__a">' + ln('FARKLI') + ln('EKRANLAR.') + '</span><span class="ap-build__b">' + ln('TEK BİR') + ln('DÜŞÜNCE.', 'ap-ln--acc') + '</span></h2>' +
      '<p class="ap-body ap-build__lede">Mobil, web ya da bir yönetim paneli: ekran değişir, kullanıcıyı anlama biçimimiz değişmez. Görseller ve video yaklaşımın atmosferini gösterir; müşteri işi olarak sunulmaz.</p>' +
      '<div class="ap-svcs">' + corners('ap-svcs__frame') + SVCS.map(function (s, i) {
        return '<article class="ap-svc ap-svc--' + (i + 1) + (i ? '' : ' is-on') + '" data-i="' + i + '">' +
          '<h3 class="ap-svc__h"><span class="ap-svc__hi"><span class="ap-svc__n">0' + (i + 1) + '</span><span class="ap-svc__k">' + s.k + '</span></span></h3>' +
          '<div class="ap-svc__body" id="ap-svc-' + (i + 1) + '"><div><p class="ap-svc__tr">' + s.tr + '</p><p class="ap-svc__d">' + s.d + '</p></div></div>' +
          '<div class="ap-svc__media">' + media[i] + '</div>' +
        '</article>';
      }).join('') + '</div>' +
      '<p class="ap-cap ap-build__note">Hizmet kapsamı her projede ihtiyaca göre birlikte belirlenir.</p>' +
    '</div></section>';
  }

  function flowM() {
    return '<section class="ap-sec ap-flow" aria-labelledby="ap-flow-t"><div class="ap-wrap">' +
      '<div class="ap-flow__head"><div>' + lab('From Idea to Product') + '<h2 id="ap-flow-t" class="ap-h2">' + ln('FİKİR') + ln('KODLA') + ln('BULUŞTUĞUNDA.', 'ap-ln--acc') + '</h2></div>' +
      '<p class="ap-body ap-flow__lede">Bir ürün tek seferde ortaya çıkmaz. Aşamalar ilerledikçe yandaki küçük ekran da gelişir: sorulardan akışa, taslaktan çalışan bir sürüme.</p></div>' +
      '<div class="ap-flow__grid">' +
        '<div class="ap-flow__board"><div class="ap-art" data-s="0" aria-hidden="true">' +
          '<div class="ap-art__bar"><i></i><i></i><i></i><span class="ap-art__ver">v1.1</span></div>' +
          '<div class="ap-art__body">' +
            '<div class="ap-a ap-a--notes"><span>Kim kullanacak?</span><span>Hangi sorunu çözüyor?</span><span>Başarı neye benzer?</span></div>' +
            '<svg class="ap-a ap-a--map" viewBox="0 0 400 220"><g class="ap-map__l"><path d="M92 110H138M222 110H268"/><path d="M180 132V160H300V132"/></g>' +
              '<g class="ap-map__n"><rect x="12" y="88" width="80" height="44" rx="6"/><rect x="138" y="88" width="84" height="44" rx="6"/><rect x="268" y="88" width="84" height="44" rx="6"/><rect x="232" y="160" width="68" height="40" rx="6"/></g>' +
              '<g class="ap-map__t"><text x="52" y="115">Giriş</text><text x="180" y="115">Liste</text><text x="310" y="115">Detay</text><text x="266" y="185">Onay</text></g></svg>' +
            '<div class="ap-a ap-a--ui">' +
              '<div class="ap-ui__top"><b></b><span class="ap-ui__title">Projeler</span><span class="ap-ui__search">' + I2.search + '<em>Ara</em></span></div>' +
              ['Lansman filmi', 'Web sitesi yenileme', 'Marka kılavuzu'].map(function (t, i) {
                return '<div class="ap-ui__row' + (i ? '' : ' ap-ui__row--hot') + '"><i class="ap-ui__dot ap-ui__dot--' + ['progress', 'progress', 'done'][i] + '"></i><b></b><span class="ap-ui__txt">' + t + '</span><em class="ap-ui__bar"><i style="width:' + [50, 25, 100][i] + '%"></i></em></div>';
              }).join('') +
              '<div class="ap-ui__btn"><span>Yeni proje</span></div>' +
            '</div>' +
            '<div class="ap-a ap-a--hot"><span class="ap-hot__ring"></span><svg class="ap-hot__cur" viewBox="0 0 16 16"><path d="M3 2l9 5.2-4 .9-1.8 3.7z"/></svg></div>' +
            '<div class="ap-a ap-a--code"><span>&lt;/&gt;</span><em>HTML · CSS · JS</em></div>' +
            '<div class="ap-a ap-a--test"><span class="ap-tag ap-tag--1">' + I2.check + '44 px hedef</span><span class="ap-tag ap-tag--2">' + I2.check + 'Kontrast</span><span class="ap-tag ap-tag--3">' + I2.check + 'Klavye</span></div>' +
            '<div class="ap-a ap-a--new"><span>Yeni: arama</span></div>' +
          '</div></div>' +
          '<p class="ap-flow__now"><span data-flow-n>01 / 07</span><span data-flow-s>' + FLOW[0].s + '</span></p>' +
        '</div>' +
        '<ol class="ap-flow__steps">' + FLOW.map(function (f, i) {
          return '<li class="ap-fs" data-i="' + i + '"><button type="button" class="ap-fs__b" aria-pressed="' + (i ? 'false' : 'true') + '"><span class="ap-fs__n">0' + (i + 1) + '</span><span class="ap-fs__k">' + f.k + '</span><span class="ap-fs__d">' + f.d + '</span></button></li>';
        }).join('') + '</ol>' +
      '</div>' +
    '</div></section>';
  }

  function motionM() {
    return '<section class="ap-sec ap-motion" aria-labelledby="ap-motion-t"><div class="ap-wrap">' +
      '<div class="ap-motion__grid">' +
        '<div class="ap-motion__copy">' + lab('Motion Makes It Meaningful') + '<h2 id="ap-motion-t" class="ap-h2 ap-motion__t">' + ln('HAREKET') + ln('DENEYİMİN') + ln('BİR PARÇASIDIR.', 'ap-ln--acc') + '</h2>' +
          '<div class="ap-motion__side"><p class="ap-lede">Bir geçiş yalnızca güzel görünmek için yapılmaz.</p><p class="ap-body">Kullanıcıya bir işlemin sonucunu, bir ekranın değiştiğini veya sistemin verdiği yanıtı anlatmalıdır. Aşağıdaki örnekleri deneyin; hareketi kapatıp aynı işlemi tekrar yapın.</p></div></div>' +
        '<div class="ap-motion__media">' + vid('motion', 'ap-motion__vid', 'Açık, pastel tonlarda arayüz kartlarının birbirine dönüştüğü dikey video') + '</div>' +
        '<div class="ap-mo">' +
          '<div class="ap-mo__top"><span class="ap-mo__l" id="ap-mo-l">Hareket</span><button class="ap-sw" type="button" role="switch" aria-checked="true" aria-labelledby="ap-mo-l" data-motion><span class="ap-sw__t"><i></i></span><span class="ap-sw__v">Açık</span></button></div>' +
          '<div class="ap-mo__tabs" role="group" aria-label="Mikro etkileşim örneği">' + MOS.map(function (m, i) {
            return '<button type="button" class="ap-mo__tab" data-mo="' + m.k + '" aria-pressed="' + (i ? 'false' : 'true') + '">' + m.t + '</button>';
          }).join('') + '</div>' +
          '<div class="ap-mo__stage">' +
            '<div class="ap-ms" data-ms="done"><div class="ap-ms__card"><p class="ap-ms__k">Lansman filmi</p><p class="ap-ms__t">Kurgu</p>' +
              '<button type="button" class="ap-ms__btn" data-act="done"><span class="ap-ms__bi">' + I2.check + '</span><span class="ap-ms__bt">Görevi tamamla</span></button></div>' +
              '<div class="ap-toast" role="status"><span class="ap-toast__in" hidden>' + I2.check + '<span>Görev tamamlandı</span><button type="button" data-act="undo">Geri al</button></span></div></div>' +
            '<div class="ap-ms" data-ms="page" hidden><div class="ap-ms__card ap-ms__page"><div class="ap-pg ap-pg--list"><p class="ap-ms__k">Projeler</p>' +
              ['Lansman filmi', 'Katalog çekimi', 'Marka kılavuzu'].map(function (t) { return '<button type="button" class="ap-pg__row" data-act="open"><span>' + t + '</span>' + I2.chev + '</button>'; }).join('') +
              '</div><div class="ap-pg ap-pg--detail" hidden><button type="button" class="ap-pg__back" data-act="back">' + I2.back + '<span>Projeler</span></button><p class="ap-pg__title"></p><p class="ap-ms__t">4 görev · 2 tamamlandı</p><span class="ap-pg__bar"><i></i></span></div></div></div>' +
            '<div class="ap-ms" data-ms="state" hidden><div class="ap-ms__card"><p class="ap-ms__k">Ayarlar</p>' +
              '<button type="button" class="ap-ms__set" role="switch" aria-checked="false" data-act="toggle">' + I2.bell + '<span class="ap-ms__sl">Bildirimler</span><span class="ap-ms__sv">Kapalı</span><span class="ap-sw__t"><i></i></span></button></div></div>' +
            '<div class="ap-ms" data-ms="feedback" hidden><div class="ap-ms__card"><p class="ap-ms__k">Marka kılavuzu</p><p class="ap-ms__t">Renk ve yazı · 12 sayfa</p>' +
              '<button type="button" class="ap-ms__save" aria-pressed="false" data-act="save">' + I2.mark + '<span>Kaydet</span></button></div></div>' +
            '<div class="ap-ms" data-ms="load" hidden><div class="ap-ms__card"><p class="ap-ms__k">Bu hafta</p><div class="ap-ld" data-state="idle"><div class="ap-ld__sk" aria-hidden="true"><i></i><i></i><i></i></div>' +
              '<ul class="ap-ld__list"><li>Senaryo onayı · Pzt</li><li>Prototip testi · Çar</li><li>Kurgu teslimi · Cum</li></ul></div>' +
              '<button type="button" class="ap-ms__btn ap-ms__btn--ghost" data-act="load"><span class="ap-ms__bt">İçeriği yükle</span></button></div></div>' +
          '</div>' +
          '<p class="ap-mo__why" aria-live="polite">' + MOS[0].w + '</p>' +
          '<p class="ap-cap">Temsili etkileşimler · hiçbir veri gönderilmez veya kaydedilmez</p>' +
        '</div>' +
      '</div>' +
    '</div></section>';
  }

  function lifeM() {
    var keys = ['phone', 'tablet', 'desk'];
    var svg = '<svg class="ap-dia" viewBox="0 0 320 220" aria-hidden="true" focusable="false">' +
      '<g class="ap-dia__g" data-g="phone"><rect class="ap-dia__dev" x="114" y="12" width="92" height="196" rx="14"/><path class="ap-dia__zone" d="M206 208 L206 120 A96 96 0 0 0 114 196 L114 208 Z"/>' +
        '<rect class="ap-dia__nav" x="122" y="180" width="76" height="18" rx="5"/><circle class="ap-dia__dot" cx="137" cy="189" r="3"/><circle class="ap-dia__dot" cx="160" cy="189" r="3"/><circle class="ap-dia__dot" cx="183" cy="189" r="3"/>' +
        '<rect class="ap-dia__blk" x="122" y="30" width="76" height="10" rx="3"/><rect class="ap-dia__blk ap-dia__blk--l" x="122" y="48" width="76" height="34" rx="4"/><rect class="ap-dia__blk ap-dia__blk--l" x="122" y="88" width="76" height="22" rx="4"/><rect class="ap-dia__blk ap-dia__blk--l" x="122" y="116" width="76" height="22" rx="4"/></g>' +
      '<g class="ap-dia__g" data-g="tablet"><rect class="ap-dia__dev" x="40" y="34" width="240" height="160" rx="12"/><rect class="ap-dia__nav" x="52" y="46" width="216" height="14" rx="4"/>' +
        '<rect class="ap-dia__blk ap-dia__blk--l" x="52" y="70" width="104" height="112" rx="5"/><rect class="ap-dia__blk ap-dia__blk--l" x="164" y="70" width="104" height="52" rx="5"/><rect class="ap-dia__blk ap-dia__blk--l" x="164" y="130" width="104" height="52" rx="5"/>' +
        '<path class="ap-dia__pen" d="M232 160 L262 130 L270 138 L240 168 Z"/></g>' +
      '<g class="ap-dia__g" data-g="desk"><rect class="ap-dia__dev" x="20" y="20" width="280" height="160" rx="8"/><path class="ap-dia__dev" d="M130 180 L124 204 H196 L190 180"/><rect class="ap-dia__nav" x="30" y="30" width="44" height="140" rx="4"/>' +
        '<rect class="ap-dia__blk ap-dia__blk--l" x="82" y="30" width="96" height="140" rx="4"/><rect class="ap-dia__blk ap-dia__blk--l" x="186" y="30" width="104" height="140" rx="4"/>' +
        '<path class="ap-dia__blk" d="M92 48h76M92 64h76M92 80h76M92 96h76M92 112h76"/><path class="ap-dia__cur" d="M232 92 l14 8 -6 1.6 -3 6z"/></g></svg>';
    return '<section class="ap-sec ap-life" aria-labelledby="ap-life-t"><div class="ap-wrap">' +
      '<div class="ap-life__head"><div>' + lab('Designed for Real Life') + '<h2 id="ap-life-t" class="ap-h2">' + ln('HER EKRANDA') + ln('DOĞRU') + ln('DENEYİM.', 'ap-ln--acc') + '</h2></div>' +
      '<p class="ap-body ap-life__lede">Responsive tasarım yalnızca elemanları küçültmek değildir. İçerik önceliği, navigasyon, dokunma alanları, ekran oranı ve kullanıcının o anki durumu her cihazda farklıdır.</p></div>' +
      '<div class="ap-life__grid">' +
        '<div class="ap-life__media">' + vid('screens', 'ap-life__vid', 'Aynı konsept ürünün telefonda, masaüstünde, büyük ekranda ve saatte göründüğü yeşil tonlu video') + '<p class="ap-cap">Konsept ürün videosu · 1N Digital Media müşteri işi değildir</p></div>' +
        '<div class="ap-life__panel">' +
          '<div class="ap-ctx" role="group" aria-label="Kullanım bağlamı">' + keys.map(function (k, i) {
            return '<button type="button" class="ap-ctx__b" data-ctx="' + k + '" aria-pressed="' + (i ? 'false' : 'true') + '"><span class="ap-ctx__t">' + LIFE[k].t + '</span><span class="ap-ctx__s">' + LIFE[k].s + '</span></button>';
          }).join('') + '</div>' +
          '<div class="ap-life__stage" data-ctx="phone">' + svg + '</div>' +
          '<dl class="ap-dec">' + LIFE_K.map(function (k, i) { return '<div class="ap-dec__r"><dt>' + k + '</dt><dd data-dec="' + i + '">' + LIFE.phone.rows[i] + '</dd></div>'; }).join('') + '</dl>' +
          '<p class="ap-sr" aria-live="polite" data-life-live></p>' +
        '</div>' +
      '</div>' +
    '</div></section>';
  }

  function qualM() {
    return '<section class="ap-sec ap-qual" aria-labelledby="ap-qual-t"><div class="ap-wrap"><div class="ap-qual__grid">' +
      '<figure class="ap-qual__fig"><div class="ap-qual__frame">' + pic(IM.rock, 'ap-qual__img', 'Ekranında yeşil dalga çizgileri olan bir telefon, kaya bir zeminin üzerinde', '(max-width:767px) 90vw, (max-width:1024px) 50vw, 36vw', '50% 50%') + '</div></figure>' +
      '<div class="ap-qual__copy">' + lab('Quality Is a Feature') +
        '<h2 id="ap-qual-t" class="ap-h2 ap-qual__t">' + ln('GÜZEL') + ln('GÖRÜNMEK') + ln('YETMEZ.') + '</h2>' +
        '<p class="ap-qual__sub"><span class="ap-ln ap-ln--acc"><span>DOĞRU</span></span><span class="ap-ln ap-ln--acc"><span>ÇALIŞMALI.</span></span><svg class="ap-qual__u" viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M2 8 C80 2 200 2 298 6"/></svg></p>' +
        '<p class="ap-body">Güvenilir bir ürün; doğru çalışan, hata anında ne yapacağını bilen ve zamanla bozulmadan büyüyebilen üründür.</p>' +
      '</div>' +
      '<ul class="ap-qs2">' + QUAL.map(function (q) {
        return '<li class="ap-qi"><svg class="ap-qi__c" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10.5"/><path d="M7 12.4l3.3 3.2L17 9"/></svg><span class="ap-qi__k">' + q.k + '</span><span class="ap-qi__d">' + q.d + '</span></li>';
      }).join('') + '</ul>' +
      '<p class="ap-cap ap-qual__note">Bu ilkeler bir çalışma biçimini anlatır; sertifika, ölçüm sonucu veya garanti değildir.</p>' +
    '</div></div></section>';
  }

  function finM() {
    return '<section class="ap-fin" aria-labelledby="ap-fin-t"><div class="ap-wrap">' +
      lab('Final Experience') +
      '<h2 id="ap-fin-t" class="ap-fin__t"><span class="ap-fin__a">BİR FİKRİN</span><span class="ap-fin__b">VAR MI<span class="ap-fin__q">?</span></span></h2>' +
      '<div class="ap-fin__row">' +
        '<p class="ap-fin__sub"><span>ONU BİRLİKTE</span> <span>ÇALIŞAN BİR</span> <span>DENEYİME</span> <span>DÖNÜŞTÜRELİM.</span></p>' +
        '<div class="ap-fin__side"><p class="ap-body">Yeni bir dijital ürün, mobil uygulama veya özel bir kullanıcı deneyimi için fikrinizi birlikte değerlendirelim.</p>' +
        '<div class="ap-fin__cta"><a class="ap-btn" href="/iletisim"><span>PROJENİZİ KONUŞALIM</span><span class="ap-btn__ico">' + I.arrow + '</span></a>' +
        '<a class="ap-btn ap-btn--ghost" href="/teklif-al"><span>TEKLİF AL</span><span class="ap-btn__ico">' + I.arrow + '</span></a></div></div>' +
      '</div>' +
      '<svg class="ap-fin__line" viewBox="0 0 1000 400" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path vector-effect="non-scaling-stroke" d="M640 10 C 700 120, 560 180, 640 260 S 760 330, 720 392"/></svg>' +
    '</div></section>';
  }

  function markup() {
    return '<main class="ap" aria-label="Uygulama Geliştirme">' + heroM() + expM() + labM() + buildM() + flowM() + motionM() + lifeM() + qualM() + finM() + '</main>';
  }

  /* ---------- CSS (yalnızca n1-uygulama-gelistirme-v2 kapsamında) ---------- */
  var CSS = "n1-uygulama-gelistirme-v2{--bg:#080A09;--g1:#0D0F0E;--g2:#121513;--ink:#ECEBE5;--soft:#BDBCB5;--mute:#9A9B95;--dim:#6E706A;--ghost:#2B2E2B;--line:rgba(228,227,221,.12);--line2:rgba(228,227,221,.07);--acc:#A8CF62;--ease:cubic-bezier(.22,1,.36,1);\n  --hdr:88px;--gap:clamp(18px,2.2vw,40px);--secpad:clamp(100px,8.6vw,168px);display:block;position:relative;width:100%;background:var(--bg);color:var(--ink);font:400 17px/1.6 Barlow,Arial,sans-serif;-webkit-font-smoothing:antialiased;overflow-x:clip;text-align:left}\nn1-uygulama-gelistirme-v2 *,n1-uygulama-gelistirme-v2 *::before,n1-uygulama-gelistirme-v2 *::after{box-sizing:border-box;min-width:0}\nn1-uygulama-gelistirme-v2 :where(.ap) :where(p,h1,h2,h3,ul,ol,figure,figcaption){margin:0}\nn1-uygulama-gelistirme-v2 :where(.ap) :where(ul,ol){padding:0;list-style:none}\nn1-uygulama-gelistirme-v2 :where(.ap) :where(a){color:inherit}\nn1-uygulama-gelistirme-v2 :where(.ap) :where(button){font:inherit;color:inherit;background:none;border:0;padding:0;margin:0;cursor:pointer;-webkit-tap-highlight-color:transparent}\nn1-uygulama-gelistirme-v2 .ap :focus-visible{outline:2px solid var(--acc);outline-offset:3px}\nn1-uygulama-gelistirme-v2 .ap img{display:block;max-width:none}\nn1-uygulama-gelistirme-v2 .ap-ico{display:block;flex:none}\nn1-uygulama-gelistirme-v2 .ap-sr{position:absolute!important;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}\nn1-uygulama-gelistirme-v2 .ap-wrap{width:90%;margin-left:auto;margin-right:auto}\nn1-uygulama-gelistirme-v2 .ap-sec{position:relative;padding:var(--secpad) 0;border-top:1px solid var(--line)}\nn1-uygulama-gelistirme-v2 .ap-label{display:flex;align-items:center;gap:12px;font:500 15px/1.3 Barlow,Arial,sans-serif;color:var(--mute)}\nn1-uygulama-gelistirme-v2 .ap-label::before{content:\"\";flex:none;width:7px;height:7px;border-radius:1px;background:var(--acc)}\nn1-uygulama-gelistirme-v2 .ap-ln{display:block;overflow:hidden;padding:.17em 0 .09em;margin:-.17em 0 -.09em}\nn1-uygulama-gelistirme-v2 .ap-ln>span{display:block}\nn1-uygulama-gelistirme-v2 .ap-ln--acc{color:var(--acc)}\nn1-uygulama-gelistirme-v2 .ap-chs{display:inline-block;white-space:nowrap}\nn1-uygulama-gelistirme-v2 .ap-ch{display:inline-block;will-change:transform}\nn1-uygulama-gelistirme-v2 .ap-sp{display:inline-block;width:.24em}\nn1-uygulama-gelistirme-v2 .ap-h2{margin-top:clamp(26px,2.4vw,40px);font:700 clamp(60px,7.4vw,148px)/1 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:-.016em;color:var(--ink)}\nn1-uygulama-gelistirme-v2 .ap-cap{margin-top:14px;font-size:14px;line-height:1.5;color:var(--mute)}\nn1-uygulama-gelistirme-v2 .ap-btn{position:relative;display:inline-flex;align-items:center;justify-content:space-between;gap:22px;height:64px;padding:0 10px 0 28px;border-radius:12px;overflow:hidden;white-space:nowrap;isolation:isolate;\n  font:500 13.5px/1 Barlow,Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase;text-decoration:none;color:var(--ink);border:1px solid rgba(168,207,98,.42);background:rgba(16,19,17,.72);transition:color .45s var(--ease),border-color .45s ease;touch-action:manipulation}\nn1-uygulama-gelistirme-v2 .ap-btn::before{content:\"\";position:absolute;inset:0;z-index:-1;background:var(--acc);transform:scaleX(0);transform-origin:0 50%;transition:transform .6s cubic-bezier(.65,0,.35,1)}\nn1-uygulama-gelistirme-v2 .ap-btn__ico{display:grid;place-items:center;width:44px;height:44px;border-radius:8px;background:rgba(168,207,98,.12);transition:background-color .45s ease}\nn1-uygulama-gelistirme-v2 .ap-btn--ghost{border-color:rgba(228,227,221,.22);background:rgba(8,10,9,.5)}\nn1-uygulama-gelistirme-v2 .ap-btn--ghost .ap-btn__ico{background:rgba(236,235,229,.06)}\nn1-uygulama-gelistirme-v2 .ap-btn:hover,n1-uygulama-gelistirme-v2 .ap-btn:focus-visible{color:#0A0B0B;border-color:var(--acc)}\nn1-uygulama-gelistirme-v2 .ap-btn:hover::before,n1-uygulama-gelistirme-v2 .ap-btn:focus-visible::before{transform:scaleX(1)}\nn1-uygulama-gelistirme-v2 .ap-btn:hover .ap-btn__ico,n1-uygulama-gelistirme-v2 .ap-btn:focus-visible .ap-btn__ico{background:rgba(10,11,11,.12)}\n.n1h-panel[data-n1-ap],.n1h-panel[data-n1-ap] *,.n1h-panel[data-n1-ap] *::before,.n1h-panel[data-n1-ap] *::after{box-sizing:border-box}\n.n1h-panel[data-n1-ap] a.n1h-item{text-decoration:none;color:#ecebe6}\n.n1h-panel[data-n1-ap] .n1h-sub a{text-decoration:none}\n@media (max-width:1024px){.n1h-panel[data-n1-ap][data-open]::before{content:\"\";position:fixed;left:0;right:0;bottom:0;top:72px;z-index:-1;pointer-events:none;background:rgba(8,10,9,.8);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}}\n@media (max-width:767px){.n1h-panel[data-n1-ap][data-open]::before{top:64px}}\nn1-uygulama-gelistirme-v2 .n1ft-partner-art{display:none}\nn1-uygulama-gelistirme-v2 .ap-label{display:flex;align-items:center;gap:10px;font:500 15px/1.3 Barlow,Arial,sans-serif;color:var(--mute)}\nn1-uygulama-gelistirme-v2 .ap-label::before{display:none}\nn1-uygulama-gelistirme-v2 .ap-label .ap-corner{width:16px;height:16px;color:var(--acc)}\nn1-uygulama-gelistirme-v2 .ap-h2{margin-top:clamp(24px,2.2vw,36px);font:700 clamp(56px,7vw,136px)/.96 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:-.012em;color:var(--ink)}\nn1-uygulama-gelistirme-v2 .ap-lede{font:600 clamp(21px,1.75vw,32px)/1.3 Barlow,Arial,sans-serif;color:var(--ink)}\nn1-uygulama-gelistirme-v2 .ap-body{margin-top:20px;max-width:48ch;font-size:clamp(17px,1.2vw,20px);line-height:1.6;color:var(--soft)}\nn1-uygulama-gelistirme-v2 .ap-cap{margin-top:14px;max-width:62ch;font-size:13.5px;line-height:1.5;color:var(--mute)}\nn1-uygulama-gelistirme-v2 .ap-ico{width:16px;height:16px}\nn1-uygulama-gelistirme-v2 .ap-sr{position:absolute!important;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}\nn1-uygulama-gelistirme-v2 .ap-vid{position:relative;overflow:hidden;aspect-ratio:var(--ar);background:var(--g1)}\nn1-uygulama-gelistirme-v2 .ap-vid video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .7s var(--ease)}\nn1-uygulama-gelistirme-v2 .ap-vid.is-ready video{opacity:1}\nn1-uygulama-gelistirme-v2 .ap-play{position:absolute;right:12px;bottom:12px;z-index:3;display:grid;place-items:center;width:44px;height:44px;border-radius:50%;color:var(--ink);background:rgba(8,10,9,.62);border:1px solid rgba(236,235,229,.26);transition:background-color .3s var(--ease),border-color .3s var(--ease)}\nn1-uygulama-gelistirme-v2 .ap-play:hover{background:rgba(8,10,9,.86);border-color:var(--acc)}\nn1-uygulama-gelistirme-v2 .ap-play[data-paused=\"1\"] .ap-ico--pause,n1-uygulama-gelistirme-v2 .ap-play[data-paused=\"0\"] .ap-ico--play{display:none}\nn1-uygulama-gelistirme-v2 .ap-play:disabled{opacity:.4;cursor:default}\nn1-uygulama-gelistirme-v2 .ap-vid__err{position:absolute;left:14px;right:66px;bottom:16px;z-index:2;font-size:13px;line-height:1.4;color:var(--soft)}\nn1-uygulama-gelistirme-v2 .ap-vid__err:empty{display:none}\nn1-uygulama-gelistirme-v2 .ap-hero{position:relative;padding-top:var(--hdr)}\nn1-uygulama-gelistirme-v2 .ap-hero__stage{position:relative;height:clamp(560px,calc(100svh - var(--hdr)),56.25vw);min-height:560px;overflow:hidden;background:#000}\nn1-uygulama-gelistirme-v2 .ap-hero__screen{position:absolute;inset:0;z-index:0}\nn1-uygulama-gelistirme-v2 .ap-hero__vid{position:absolute;inset:0;aspect-ratio:auto}\nn1-uygulama-gelistirme-v2 .ap-hero__vid video{object-position:62% 50%}\nn1-uygulama-gelistirme-v2 .ap-hero__shade{position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(90deg,rgba(8,10,9,.82) 0%,rgba(8,10,9,.5) 34%,rgba(8,10,9,0) 62%),linear-gradient(0deg,rgba(8,10,9,.9) 0%,rgba(8,10,9,0) 38%)}\nn1-uygulama-gelistirme-v2 .ap-hero__frame{position:absolute;left:24%;right:24%;top:16%;bottom:16%;z-index:2;width:52%;height:68%;fill:none;stroke:var(--acc);stroke-width:1.5;opacity:0;pointer-events:none}\nn1-uygulama-gelistirme-v2 .ap-hero__copy{position:absolute;left:0;right:0;bottom:clamp(30px,4vw,64px);z-index:3;pointer-events:none}\nn1-uygulama-gelistirme-v2 .ap-kick{display:flex;flex-wrap:wrap;gap:6px 26px;font:500 15px/1.3 Barlow,Arial,sans-serif;color:var(--mute)}\nn1-uygulama-gelistirme-v2 .ap-kick span:first-child{color:var(--ink)}\nn1-uygulama-gelistirme-v2 .ap-hero__t{margin-top:clamp(14px,1.4vw,24px);font:700 clamp(84px,12.2vw,236px)/.86 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:-.014em}\nn1-uygulama-gelistirme-v2 .ap-hl{display:block;padding-top:.1em}\nn1-uygulama-gelistirme-v2 .ap-fill{display:inline-block;color:transparent;-webkit-text-stroke:1.5px rgba(236,235,229,.72);background-image:linear-gradient(90deg,var(--ink) 0 50%,rgba(236,235,229,0) 50% 100%);background-size:200% 100%;background-position:0 0;background-repeat:no-repeat;-webkit-background-clip:text;background-clip:text;padding:.16em .02em 0;margin-top:-.16em}\nn1-uygulama-gelistirme-v2 .ap-fill--acc{-webkit-text-stroke-color:var(--acc);background-image:linear-gradient(90deg,var(--acc) 0 50%,rgba(168,207,98,0) 50% 100%)}\nn1-uygulama-gelistirme-v2 .ap-hero__foot{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:end;padding:clamp(44px,4.4vw,80px) 0 clamp(90px,8vw,150px)}\nn1-uygulama-gelistirme-v2 .ap-hero__sub{grid-column:1/7;font:700 clamp(46px,5.4vw,104px)/.94 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:-.008em;color:var(--ink)}\nn1-uygulama-gelistirme-v2 .ap-hero__side{grid-column:8/13}\nn1-uygulama-gelistirme-v2 .ap-hero__txt{max-width:44ch;font-size:clamp(17px,1.22vw,21px);line-height:1.6;color:var(--soft)}\nn1-uygulama-gelistirme-v2 .ap-scroll{display:inline-flex;align-items:center;gap:10px;min-height:44px;margin-top:18px;font:600 15px/1 Barlow,Arial,sans-serif;color:var(--ink);text-decoration:none}\nn1-uygulama-gelistirme-v2 .ap-scroll .ap-ico{color:var(--acc);transition:transform .4s var(--ease)}\nn1-uygulama-gelistirme-v2 .ap-scroll:hover .ap-ico{transform:translateY(3px)}\nn1-uygulama-gelistirme-v2 .ap-exp__head{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:end}\nn1-uygulama-gelistirme-v2 .ap-exp__head>div:first-child{grid-column:1/7}\nn1-uygulama-gelistirme-v2 .ap-exp__side{grid-column:8/13;padding-bottom:.6em}\nn1-uygulama-gelistirme-v2 .ap-exp__fig{margin:clamp(60px,6vw,110px) 0 0}\nn1-uygulama-gelistirme-v2 .ap-exp__frame{position:relative;margin:0 3vw;overflow:hidden;aspect-ratio:16/8;background:var(--g1)}\nn1-uygulama-gelistirme-v2 .ap-exp__img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}\nn1-uygulama-gelistirme-v2 .ap-exp__fig .ap-cap{margin-top:14px}\nn1-uygulama-gelistirme-v2 .ap-sent{margin-top:clamp(70px,7vw,130px);max-width:26ch;font:600 clamp(30px,3.5vw,66px)/1.16 Barlow,Arial,sans-serif;letter-spacing:-.012em;color:var(--soft)}\nn1-uygulama-gelistirme-v2 .ap-w{display:inline}\nn1-uygulama-gelistirme-v2 .ap-w--k{color:var(--ink)}\nn1-uygulama-gelistirme-v2 .ap-qs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));column-gap:var(--gap);row-gap:clamp(30px,3vw,50px);margin-top:clamp(60px,6vw,110px);padding-top:clamp(30px,3vw,50px);border-top:1px solid var(--line)}\nn1-uygulama-gelistirme-v2 .ap-q{display:grid;grid-template-columns:2.6em minmax(0,1fr);row-gap:8px}\nn1-uygulama-gelistirme-v2 .ap-q__n{grid-row:1/3;font:600 14px/1.6 Barlow,Arial,sans-serif;color:var(--acc);font-variant-numeric:tabular-nums}\nn1-uygulama-gelistirme-v2 .ap-q__k{font:600 clamp(19px,1.45vw,24px)/1.3 Barlow,Arial,sans-serif;color:var(--ink)}\nn1-uygulama-gelistirme-v2 .ap-q__q{max-width:32ch;font-size:clamp(15px,1.1vw,17px);line-height:1.55;color:var(--soft)}\nn1-uygulama-gelistirme-v2 .ap-lab__head{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:end}\nn1-uygulama-gelistirme-v2 .ap-lab__head>div:first-child{grid-column:1/8}\nn1-uygulama-gelistirme-v2 .ap-lab__intro{grid-column:8/13}\nn1-uygulama-gelistirme-v2 .ap-note{margin-top:18px;max-width:50ch;padding-left:14px;border-left:2px solid var(--acc);font-size:15px;line-height:1.55;color:var(--soft)}\nn1-uygulama-gelistirme-v2 .ap-note strong{color:var(--ink);font-weight:600}\nn1-uygulama-gelistirme-v2 .ap-sim__bar{display:flex;flex-wrap:wrap;align-items:stretch;justify-content:space-between;gap:16px;margin-top:clamp(50px,5vw,86px)}\nn1-uygulama-gelistirme-v2 .ap-views{display:flex;flex-wrap:wrap;gap:10px}\nn1-uygulama-gelistirme-v2 .ap-view{display:grid;grid-template-columns:auto minmax(0,1fr);column-gap:12px;row-gap:4px;width:clamp(200px,19vw,290px);padding:14px 18px;border-radius:12px;border:1px solid var(--line);background:#0D0F0E;text-align:left;transition:border-color .35s var(--ease),background-color .35s var(--ease)}\nn1-uygulama-gelistirme-v2 .ap-view__n{grid-row:1/3;font:600 14px/1.6 Barlow,Arial,sans-serif;color:var(--mute);font-variant-numeric:tabular-nums}\nn1-uygulama-gelistirme-v2 .ap-view__t{font:700 clamp(22px,1.7vw,30px)/1 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:.02em;color:var(--soft)}\nn1-uygulama-gelistirme-v2 .ap-view__s{font-size:13.5px;line-height:1.4;color:var(--mute)}\nn1-uygulama-gelistirme-v2 .ap-view:hover{border-color:rgba(236,235,229,.3)}\nn1-uygulama-gelistirme-v2 .ap-view[aria-selected=\"true\"]{border-color:var(--acc);background:rgba(168,207,98,.08)}\nn1-uygulama-gelistirme-v2 .ap-view[aria-selected=\"true\"] .ap-view__n,n1-uygulama-gelistirme-v2 .ap-view[aria-selected=\"true\"] .ap-view__t{color:var(--acc)}\nn1-uygulama-gelistirme-v2 .ap-reset{display:inline-flex;align-items:center;gap:10px;align-self:center;min-height:44px;padding:0 16px;border-radius:10px;border:1px solid var(--line);font:500 14px/1 Barlow,Arial,sans-serif;color:var(--soft)}\nn1-uygulama-gelistirme-v2 .ap-reset:hover{color:var(--ink);border-color:rgba(236,235,229,.3)}\nn1-uygulama-gelistirme-v2 .ap-sim{position:relative;display:flex;justify-content:center;margin-top:18px;padding:clamp(24px,2.6vw,44px);border-radius:16px;border:1px solid var(--line);background:radial-gradient(120% 90% at 50% 0%,#111412 0%,#0A0C0B 70%)}\nn1-uygulama-gelistirme-v2 .ap-sim__corners{position:absolute;inset:12px;width:calc(100% - 24px);height:calc(100% - 24px);fill:none;stroke:rgba(168,207,98,.55);stroke-width:1.2;pointer-events:none}\nn1-uygulama-gelistirme-v2 .ap-sim__cap{margin-top:12px;font-size:13.5px;color:var(--mute)}\nn1-uygulama-gelistirme-v2 .ap-dev{position:relative;container-type:inline-size;width:380px;height:min(740px,calc(100svh - 230px));min-height:560px;max-width:100%;border-radius:40px;padding:10px;background:#050605;border:1px solid rgba(236,235,229,.2);box-shadow:0 30px 80px rgba(0,0,0,.45)}\nn1-uygulama-gelistirme-v2 .ap-sim[data-view=\"web\"] .ap-dev{width:100%;height:640px;border-radius:14px;padding:0}\nn1-uygulama-gelistirme-v2 .ap-sim[data-view=\"dash\"] .ap-dev{width:100%;height:auto;min-height:600px;border-radius:14px;padding:0}\nn1-uygulama-gelistirme-v2 .ap-app{position:relative;height:100%;overflow:hidden;border-radius:30px;background:#0F1211;color:var(--ink);font-size:15px;line-height:1.45}\nn1-uygulama-gelistirme-v2 .ap-app h4,n1-uygulama-gelistirme-v2 .ap-app h5,n1-uygulama-gelistirme-v2 .ap-app p{margin:0}\nn1-uygulama-gelistirme-v2 .ap-app ul{margin:0;padding:0;list-style:none}\nn1-uygulama-gelistirme-v2 .ap-app button{min-height:44px}\nn1-uygulama-gelistirme-v2 .ap-st{display:inline-flex;align-items:center;gap:7px;font:600 12.5px/1 Barlow,Arial,sans-serif;color:var(--soft);white-space:nowrap}\nn1-uygulama-gelistirme-v2 .ap-st i{display:block;flex:none;width:10px;height:10px;border-radius:50%;border:1.5px solid currentColor}\nn1-uygulama-gelistirme-v2 .ap-st--planned i{border-color:#8E9089}\nn1-uygulama-gelistirme-v2 .ap-st--progress{color:var(--acc)}\nn1-uygulama-gelistirme-v2 .ap-st--progress i{background:linear-gradient(90deg,var(--acc) 50%,transparent 50%)}\nn1-uygulama-gelistirme-v2 .ap-st--review{color:#D9DCCF}\nn1-uygulama-gelistirme-v2 .ap-st--review i{border-style:dashed;border-color:var(--acc)}\nn1-uygulama-gelistirme-v2 .ap-st--done{color:var(--acc)}\nn1-uygulama-gelistirme-v2 .ap-st--done i{background:var(--acc);border-color:var(--acc)}\nn1-uygulama-gelistirme-v2 .ap-bar{display:block;height:4px;border-radius:2px;background:rgba(236,235,229,.1);overflow:hidden}\nn1-uygulama-gelistirme-v2 .ap-bar i{display:block;height:100%;border-radius:2px;background:var(--acc)}\nn1-uygulama-gelistirme-v2 .ap-chips{display:flex;flex-wrap:wrap;gap:6px}\nn1-uygulama-gelistirme-v2 .ap-chip{min-height:44px!important;padding:0 14px;border-radius:999px;border:1px solid rgba(236,235,229,.16);font:500 13px/1 Barlow,Arial,sans-serif;color:var(--soft)}\nn1-uygulama-gelistirme-v2 .ap-chip[aria-pressed=\"true\"]{background:var(--acc);border-color:var(--acc);color:#0B0D0C}\nn1-uygulama-gelistirme-v2 .ap-rows{display:flex;flex-direction:column;gap:8px}\nn1-uygulama-gelistirme-v2 .ap-row{position:relative;display:grid;grid-template-columns:minmax(0,1fr) 16px;column-gap:10px;row-gap:9px;width:100%;padding:13px 14px;border-radius:12px;background:#161A18;border:1px solid transparent;text-align:left;transition:border-color .3s var(--ease),background-color .3s var(--ease)}\nn1-uygulama-gelistirme-v2 .ap-row:hover{border-color:rgba(236,235,229,.16)}\nn1-uygulama-gelistirme-v2 .ap-row.is-sel{border-color:var(--acc);background:rgba(168,207,98,.07)}\nn1-uygulama-gelistirme-v2 .ap-row__t{grid-column:1;font:600 15.5px/1.25 Barlow,Arial,sans-serif;color:var(--ink)}\nn1-uygulama-gelistirme-v2 .ap-row__m{grid-column:1;display:flex;align-items:center;justify-content:space-between;gap:10px}\nn1-uygulama-gelistirme-v2 .ap-row__due{font-size:12.5px;color:var(--mute)}\nn1-uygulama-gelistirme-v2 .ap-row .ap-bar{grid-column:1}\nn1-uygulama-gelistirme-v2 .ap-row__chev{grid-column:2;grid-row:1/4;align-self:center;color:var(--mute)}\nn1-uygulama-gelistirme-v2 .is-compact .ap-row{row-gap:6px;padding:9px 12px}\nn1-uygulama-gelistirme-v2 .is-compact .ap-row .ap-bar{display:none}\nn1-uygulama-gelistirme-v2 .ap-empty{padding:18px 4px;font-size:14px;line-height:1.5;color:var(--mute)}\nn1-uygulama-gelistirme-v2 .ap-link{display:inline-flex;align-items:center;min-height:44px!important;min-width:44px;padding:0 4px;font:600 13.5px/1 Barlow,Arial,sans-serif;color:var(--acc);text-decoration:underline;text-underline-offset:3px}\nn1-uygulama-gelistirme-v2 .ap-back{display:inline-flex;align-items:center;gap:6px;min-height:44px;margin:0 0 6px -4px;padding:0 8px 0 2px;border-radius:8px;font:600 14px/1 Barlow,Arial,sans-serif;color:var(--acc)}\nn1-uygulama-gelistirme-v2 .ap-det{display:flex;flex-direction:column;align-items:flex-start;gap:10px}\nn1-uygulama-gelistirme-v2 .ap-det__meta{font-size:13px;color:var(--mute)}\nn1-uygulama-gelistirme-v2 .ap-det__t{font:700 clamp(26px,9cqw,34px)/1 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:.005em;color:var(--ink)}\nn1-uygulama-gelistirme-v2 .ap-det__prog{display:grid;width:100%;gap:8px;margin-top:4px;font-size:13px;color:var(--soft)}\nn1-uygulama-gelistirme-v2 .ap-det__h{margin-top:10px!important;font:600 12.5px/1 Barlow,Arial,sans-serif;letter-spacing:.06em;color:var(--mute)}\nn1-uygulama-gelistirme-v2 .ap-seg{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;width:100%}\nn1-uygulama-gelistirme-v2 .ap-seg__b{min-height:44px;padding:0 10px;border-radius:9px;border:1px solid rgba(236,235,229,.14);font:500 13.5px/1.1 Barlow,Arial,sans-serif;color:var(--soft)}\nn1-uygulama-gelistirme-v2 .ap-seg__b[aria-pressed=\"true\"]{border-color:var(--acc);background:rgba(168,207,98,.12);color:var(--ink)}\nn1-uygulama-gelistirme-v2 .ap-tasks{display:flex;flex-direction:column;gap:4px;width:100%}\nn1-uygulama-gelistirme-v2 .ap-task{position:relative;display:flex;align-items:center;gap:10px}\nn1-uygulama-gelistirme-v2 .ap-task__in{position:absolute;left:0;top:50%;width:22px;height:22px;margin:-11px 0 0;opacity:0;cursor:pointer}\nn1-uygulama-gelistirme-v2 .ap-task__l{display:flex;align-items:center;gap:12px;min-height:44px;flex:1;cursor:pointer}\nn1-uygulama-gelistirme-v2 .ap-task__box{display:grid;place-items:center;flex:none;width:22px;height:22px;border-radius:7px;border:1.5px solid rgba(236,235,229,.4);color:#0B0D0C;transition:background-color .25s var(--ease),border-color .25s var(--ease)}\nn1-uygulama-gelistirme-v2 .ap-task__box .ap-ico{width:14px;height:14px;stroke-width:2.2;opacity:0;transform:scale(.4);transition:opacity .2s,transform .3s var(--ease)}\nn1-uygulama-gelistirme-v2 .ap-task__in:checked+.ap-task__l .ap-task__box{background:var(--acc);border-color:var(--acc)}\nn1-uygulama-gelistirme-v2 .ap-task__in:checked+.ap-task__l .ap-task__box .ap-ico{opacity:1;transform:none}\nn1-uygulama-gelistirme-v2 .ap-task__in:focus-visible+.ap-task__l .ap-task__box{outline:2px solid var(--acc);outline-offset:3px}\nn1-uygulama-gelistirme-v2 .ap-task__t{display:flex;flex-direction:column;font-size:14.5px;color:var(--ink)}\nn1-uygulama-gelistirme-v2 .ap-task__t small{font-size:12px;color:var(--mute)}\nn1-uygulama-gelistirme-v2 .ap-task.is-done .ap-task__t{color:var(--mute);text-decoration:line-through;text-decoration-color:rgba(236,235,229,.35)}\nn1-uygulama-gelistirme-v2 .ap-sw__t{position:relative;display:block;flex:none;width:44px;height:26px;border-radius:13px;background:rgba(236,235,229,.16);transition:background-color .3s var(--ease)}\nn1-uygulama-gelistirme-v2 .ap-sw__t i{position:absolute;left:3px;top:3px;width:20px;height:20px;border-radius:50%;background:#ECEBE5;transition:transform .35s var(--ease)}\nn1-uygulama-gelistirme-v2 [aria-checked=\"true\"] .ap-sw__t{background:var(--acc)}\nn1-uygulama-gelistirme-v2 [aria-checked=\"true\"] .ap-sw__t i{transform:translateX(18px);background:#0B0D0C}\nn1-uygulama-gelistirme-v2 .ap-app--m{display:flex;flex-direction:column}\nn1-uygulama-gelistirme-v2 .ap-m__status{display:flex;align-items:center;justify-content:space-between;padding:12px 22px 6px;font:600 12px/1 Barlow,Arial,sans-serif;color:var(--mute)}\nn1-uygulama-gelistirme-v2 .ap-m__pill{width:64px;height:18px;border-radius:9px;background:#000}\nn1-uygulama-gelistirme-v2 .ap-m__view{position:relative;flex:1;overflow:hidden}\nn1-uygulama-gelistirme-v2 .ap-m__scr{position:absolute;inset:0;overflow-y:auto;overscroll-behavior:contain;padding:8px 16px 20px;scrollbar-width:thin}\nn1-uygulama-gelistirme-v2 .ap-m__head{display:flex;flex-wrap:wrap;align-items:baseline;justify-content:space-between;gap:8px 12px;margin-bottom:14px}\nn1-uygulama-gelistirme-v2 .ap-m__t{font:700 30px/1 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:.005em}\nn1-uygulama-gelistirme-v2 .ap-m__c{font-size:13px;color:var(--mute)}\nn1-uygulama-gelistirme-v2 .ap-m__head .ap-chips{flex:0 0 100%}\nn1-uygulama-gelistirme-v2 .ap-m__nav{display:grid;grid-template-columns:repeat(3,1fr);padding:6px 10px 12px;border-top:1px solid rgba(236,235,229,.08);background:#0C0E0D}\nn1-uygulama-gelistirme-v2 .ap-m__nb{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;min-height:52px!important;border-radius:10px;font:500 12px/1 Barlow,Arial,sans-serif;color:var(--mute)}\nn1-uygulama-gelistirme-v2 .ap-m__nb .ap-ico{width:20px;height:20px}\nn1-uygulama-gelistirme-v2 .ap-m__nb[aria-current=\"page\"]{color:var(--acc)}\nn1-uygulama-gelistirme-v2 .ap-set{display:flex;align-items:center;justify-content:space-between;gap:14px;width:100%;padding:14px;margin-bottom:8px;border-radius:12px;background:#161A18;text-align:left}\nn1-uygulama-gelistirme-v2 .ap-set__t{display:flex;flex-direction:column;gap:3px;font:600 15px/1.3 Barlow,Arial,sans-serif}\nn1-uygulama-gelistirme-v2 .ap-set__t small{font-weight:400;font-size:12.5px;color:var(--mute)}\nn1-uygulama-gelistirme-v2 .ap-app--w{display:flex;flex-direction:column;border-radius:14px}\nn1-uygulama-gelistirme-v2 .ap-w__top{display:flex;align-items:center;gap:7px;padding:12px 16px;border-bottom:1px solid rgba(236,235,229,.08);background:#0B0D0C;font-size:12.5px;color:var(--mute)}\nn1-uygulama-gelistirme-v2 .ap-w__top i{width:10px;height:10px;border-radius:50%;background:rgba(236,235,229,.16)}\nn1-uygulama-gelistirme-v2 .ap-w__top span{margin-left:10px}\nn1-uygulama-gelistirme-v2 .ap-w__in{display:grid;grid-template-columns:190px minmax(0,1fr);flex:1;min-height:0}\nn1-uygulama-gelistirme-v2 .ap-w__side{display:flex;flex-direction:column;gap:4px;padding:18px 12px;border-right:1px solid rgba(236,235,229,.08);background:#0C0F0E}\nn1-uygulama-gelistirme-v2 .ap-w__brand{padding:0 10px 14px;font:700 24px/1 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;color:var(--ink)}\nn1-uygulama-gelistirme-v2 .ap-w__nb{display:flex;align-items:center;gap:10px;min-height:44px!important;padding:0 10px;border-radius:9px;font:500 14px/1 Barlow,Arial,sans-serif;color:var(--soft);text-align:left}\nn1-uygulama-gelistirme-v2 .ap-w__nb span{flex:1}\nn1-uygulama-gelistirme-v2 .ap-w__nb em{font-style:normal;font-size:12px;color:var(--mute)}\nn1-uygulama-gelistirme-v2 .ap-w__nb:hover{background:rgba(236,235,229,.05)}\nn1-uygulama-gelistirme-v2 .ap-w__nb[aria-current=\"page\"]{background:rgba(168,207,98,.1);color:var(--ink)}\nn1-uygulama-gelistirme-v2 .ap-w__nb[aria-current=\"page\"] .ap-ico{color:var(--acc)}\nn1-uygulama-gelistirme-v2 .ap-w__main{display:grid;grid-template-columns:minmax(260px,340px) minmax(0,1fr);min-height:0}\nn1-uygulama-gelistirme-v2 .ap-w__main--tasks{display:flex;flex-direction:column;padding:20px 24px;overflow-y:auto}\nn1-uygulama-gelistirme-v2 .ap-w__list{display:flex;flex-direction:column;gap:12px;min-height:0;padding:18px 16px;border-right:1px solid rgba(236,235,229,.08);overflow-y:auto;scrollbar-width:thin}\nn1-uygulama-gelistirme-v2 .ap-w__bar{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px}\nn1-uygulama-gelistirme-v2 .ap-w__t{font:700 26px/1 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;color:var(--ink)}\nn1-uygulama-gelistirme-v2 .ap-w__c{font-size:12.5px;color:var(--mute)}\nn1-uygulama-gelistirme-v2 .ap-search{position:relative;display:flex;align-items:center;gap:8px;padding:0 12px;border-radius:10px;border:1px solid rgba(236,235,229,.14);background:#141816;color:var(--mute)}\nn1-uygulama-gelistirme-v2 .ap-search:focus-within{border-color:var(--acc)}\nn1-uygulama-gelistirme-v2 .ap-search__in{flex:1;min-width:0;height:44px;border:0;outline:0;background:none;font:400 14.5px Barlow,Arial,sans-serif;color:var(--ink)}\nn1-uygulama-gelistirme-v2 .ap-search__in::placeholder{color:var(--mute)}\nn1-uygulama-gelistirme-v2 .ap-w__filters{display:flex;flex-direction:column;gap:10px}\nn1-uygulama-gelistirme-v2 .ap-sel{display:flex;align-items:center;gap:10px;font-size:13px;color:var(--mute)}\nn1-uygulama-gelistirme-v2 .ap-sel select{flex:1;height:44px;padding:0 10px;border-radius:9px;border:1px solid rgba(236,235,229,.14);background:#141816;color:var(--ink);font:400 14px Barlow,Arial,sans-serif}\nn1-uygulama-gelistirme-v2 .ap-w__detail{padding:22px 28px;overflow-y:auto;scrollbar-width:thin}\nn1-uygulama-gelistirme-v2 .ap-w__detail .ap-back{display:none}\nn1-uygulama-gelistirme-v2 .ap-w__detail .ap-det__t{font-size:clamp(30px,4cqw,46px)}\nn1-uygulama-gelistirme-v2 .ap-w__detail .ap-seg{grid-template-columns:repeat(4,minmax(0,1fr));max-width:560px}\nn1-uygulama-gelistirme-v2 .ap-w__detail .ap-det__prog{max-width:560px}\nn1-uygulama-gelistirme-v2 .ap-tasks--table .ap-task{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr) auto;column-gap:14px;padding:2px 0;border-bottom:1px solid rgba(236,235,229,.06)}\nn1-uygulama-gelistirme-v2 .ap-tasks--table .ap-task__p{font-size:13px;color:var(--mute)}\nn1-uygulama-gelistirme-v2 .ap-w__main--tasks .ap-tasks{margin-top:16px}\n@container (max-width:760px){\nn1-uygulama-gelistirme-v2 .ap-w__in{grid-template-columns:minmax(0,1fr)}\nn1-uygulama-gelistirme-v2 .ap-w__side{flex-direction:row;flex-wrap:wrap;align-items:center;padding:10px 12px;border-right:0;border-bottom:1px solid rgba(236,235,229,.08)}\nn1-uygulama-gelistirme-v2 .ap-w__brand{padding:0 8px 0 4px;font-size:20px}\nn1-uygulama-gelistirme-v2 .ap-w__main{display:block;position:relative;overflow-y:auto}\nn1-uygulama-gelistirme-v2 .ap-w__main[data-pane=\"list\"] .ap-w__detail,.ap-w__main[data-pane=\"detail\"] .ap-w__list{display:none}\nn1-uygulama-gelistirme-v2 .ap-w__list{border-right:0;overflow:visible}\nn1-uygulama-gelistirme-v2 .ap-w__detail{padding:16px}\nn1-uygulama-gelistirme-v2 .ap-w__detail .ap-back{display:inline-flex}\nn1-uygulama-gelistirme-v2 .ap-w__detail .ap-seg{grid-template-columns:repeat(2,minmax(0,1fr))}\nn1-uygulama-gelistirme-v2 .ap-tasks--table .ap-task{grid-template-columns:minmax(0,1fr) auto}\nn1-uygulama-gelistirme-v2 .ap-tasks--table .ap-task__p{display:none}\n}\nn1-uygulama-gelistirme-v2 .ap-app--d{display:flex;flex-direction:column;gap:18px;padding:22px 24px 26px;border-radius:14px}\nn1-uygulama-gelistirme-v2 .ap-d__top{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:14px}\nn1-uygulama-gelistirme-v2 .ap-d__s{margin-top:6px!important;font-size:13px;color:var(--mute)}\nn1-uygulama-gelistirme-v2 .ap-d__ctl{display:flex;flex-wrap:wrap;align-items:center;gap:12px}\nn1-uygulama-gelistirme-v2 .ap-modes{display:flex;padding:3px;border-radius:11px;border:1px solid rgba(236,235,229,.14)}\nn1-uygulama-gelistirme-v2 .ap-mode{display:inline-flex;align-items:center;gap:8px;min-height:44px!important;padding:0 14px;border-radius:8px;font:500 13.5px/1 Barlow,Arial,sans-serif;color:var(--soft)}\nn1-uygulama-gelistirme-v2 .ap-mode[aria-pressed=\"true\"]{background:rgba(168,207,98,.14);color:var(--ink)}\nn1-uygulama-gelistirme-v2 .ap-mode[aria-pressed=\"true\"] .ap-ico{color:var(--acc)}\nn1-uygulama-gelistirme-v2 .ap-d__tiles{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}\nn1-uygulama-gelistirme-v2 .ap-tile{display:flex;flex-direction:column;align-items:flex-start;gap:10px;padding:14px 16px;border-radius:12px;border:1px solid rgba(236,235,229,.1);background:#141816;text-align:left}\nn1-uygulama-gelistirme-v2 .ap-tile__n{font:700 40px/1 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;color:var(--ink);font-variant-numeric:tabular-nums}\nn1-uygulama-gelistirme-v2 .ap-tile[aria-pressed=\"true\"]{border-color:var(--acc)}\nn1-uygulama-gelistirme-v2 .ap-d__board{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;align-items:start}\nn1-uygulama-gelistirme-v2 .ap-col{min-width:0;padding:12px;border-radius:12px;background:#0B0D0C;border:1px solid rgba(236,235,229,.06)}\nn1-uygulama-gelistirme-v2 .ap-col.is-col{border-color:rgba(168,207,98,.35)}\nn1-uygulama-gelistirme-v2 .ap-col__h{display:flex;align-items:center;justify-content:space-between;gap:8px;margin:0 0 10px;font:600 13px/1 Barlow,Arial,sans-serif;color:var(--mute)}\nn1-uygulama-gelistirme-v2 .ap-col__l{display:flex;flex-direction:column;gap:8px}\nn1-uygulama-gelistirme-v2 .ap-col__e{padding:14px 4px;font-size:13px;color:var(--dim)}\nn1-uygulama-gelistirme-v2 .ap-card{display:flex;flex-direction:column;gap:8px;padding:12px;border-radius:10px;background:#171B19;border:1px solid rgba(236,235,229,.06)}\nn1-uygulama-gelistirme-v2 .ap-card__t{font:600 14.5px/1.3 Barlow,Arial,sans-serif;color:var(--ink)}\nn1-uygulama-gelistirme-v2 .ap-card__m{font-size:12.5px;color:var(--mute)}\nn1-uygulama-gelistirme-v2 .ap-card__a{display:flex;align-items:center;justify-content:space-between;gap:8px}\nn1-uygulama-gelistirme-v2 .ap-adv{display:grid;place-items:center;width:44px;height:44px;border-radius:10px;border:1px solid rgba(168,207,98,.4);color:var(--acc)}\nn1-uygulama-gelistirme-v2 .ap-adv:hover{background:var(--acc);color:#0B0D0C}\nn1-uygulama-gelistirme-v2 .ap-d__prog{display:flex;flex-direction:column;gap:14px;padding:6px 2px}\nn1-uygulama-gelistirme-v2 .ap-d__prog li{display:grid;grid-template-columns:minmax(0,220px) minmax(0,1fr) 48px;align-items:center;column-gap:16px}\nn1-uygulama-gelistirme-v2 .ap-d__pn{font-size:14.5px;color:var(--ink)}\nn1-uygulama-gelistirme-v2 .ap-d__prog .ap-bar{height:10px;border-radius:5px}\nn1-uygulama-gelistirme-v2 .ap-d__pv{font:600 13.5px/1 Barlow,Arial,sans-serif;color:var(--soft);text-align:right;font-variant-numeric:tabular-nums}\n@container (max-width:640px){\nn1-uygulama-gelistirme-v2 .ap-app--d{padding:16px}\nn1-uygulama-gelistirme-v2 .ap-d__tiles{grid-template-columns:repeat(2,minmax(0,1fr))}\nn1-uygulama-gelistirme-v2 .ap-d__board{grid-template-columns:minmax(0,1fr)}\nn1-uygulama-gelistirme-v2 .ap-col:not(.is-col){display:none}\nn1-uygulama-gelistirme-v2 .ap-d__prog li{grid-template-columns:minmax(0,1fr) 44px;row-gap:6px}\nn1-uygulama-gelistirme-v2 .ap-d__prog .ap-bar{grid-column:1/-1;grid-row:2}\n}\nn1-uygulama-gelistirme-v2 .ap-build__t{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);margin-top:clamp(24px,2.2vw,36px);font:700 clamp(56px,7.4vw,144px)/.96 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:-.012em}\nn1-uygulama-gelistirme-v2 .ap-build__a{grid-column:1/7}\nn1-uygulama-gelistirme-v2 .ap-build__b{grid-column:6/13;padding-top:clamp(60px,7vw,140px);text-align:right}\nn1-uygulama-gelistirme-v2 .ap-build__lede{margin-top:clamp(30px,3vw,50px)}\nn1-uygulama-gelistirme-v2 .ap-svcs{position:relative;margin-top:clamp(60px,6vw,110px)}\nn1-uygulama-gelistirme-v2 .ap-svcs__frame{display:none}\nn1-uygulama-gelistirme-v2 .ap-svc{position:relative;display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:center;padding:clamp(34px,4vw,60px) 0;border-top:1px solid var(--line)}\nn1-uygulama-gelistirme-v2 .ap-svc__h{grid-column:1/8;margin:0;font:700 clamp(36px,4vw,74px)/1 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:.004em;color:var(--ink)}\nn1-uygulama-gelistirme-v2 .ap-svc__hi{display:flex;align-items:baseline;gap:18px}\nn1-uygulama-gelistirme-v2 .ap-svc__n{flex:none;font:600 15px/1 Barlow,Arial,sans-serif;color:var(--acc);font-variant-numeric:tabular-nums}\nn1-uygulama-gelistirme-v2 .ap-svc__body{grid-column:1/8;margin-top:18px}\nn1-uygulama-gelistirme-v2 .ap-svc__tr{font:600 15px/1.3 Barlow,Arial,sans-serif;color:var(--mute)}\nn1-uygulama-gelistirme-v2 .ap-svc__d{margin-top:8px;max-width:44ch;font-size:clamp(17px,1.2vw,20px);line-height:1.6;color:var(--soft)}\nn1-uygulama-gelistirme-v2 .ap-svc__media{position:relative;grid-column:8/13;grid-row:1/3;overflow:hidden;aspect-ratio:4/5;border-radius:4px;background:#000}\nn1-uygulama-gelistirme-v2 .ap-svc__media .ap-svc__img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}\nn1-uygulama-gelistirme-v2 .ap-svc__media .ap-vid{position:absolute;inset:0;aspect-ratio:auto}\nn1-uygulama-gelistirme-v2 .ap-svc--4 .ap-svc__media{aspect-ratio:5/4}\nn1-uygulama-gelistirme-v2 .ap-build__note{margin-top:34px}\n@media (min-width:1025px){\nn1-uygulama-gelistirme-v2 .ap-svcs{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);grid-template-rows:repeat(5,auto) 1fr;align-items:start;min-height:min(78vh,760px)}\nn1-uygulama-gelistirme-v2 .ap-svcs__frame{display:block;position:absolute;z-index:3;top:-14px;bottom:-14px;left:calc((100% + var(--gap)) * 7 / 12 - 14px);right:-14px;width:auto;height:auto;fill:none;stroke:rgba(168,207,98,.6);stroke-width:1.2;pointer-events:none}\nn1-uygulama-gelistirme-v2 .ap-svc{position:static;display:block;grid-column:1/7;padding:0;border-top:1px solid var(--line)}\nn1-uygulama-gelistirme-v2 .ap-svc:last-of-type{border-bottom:1px solid var(--line)}\nn1-uygulama-gelistirme-v2 .ap-svc__h{font-size:clamp(30px,2.7vw,50px)}\nn1-uygulama-gelistirme-v2 .ap-svc__btn{display:block;width:100%;min-height:44px;padding:clamp(16px,1.4vw,24px) 0;text-align:left;color:var(--dim);transition:color .4s var(--ease)}\nn1-uygulama-gelistirme-v2 .ap-svc__btn .ap-svc__hi{transition:transform .6s var(--ease)}\nn1-uygulama-gelistirme-v2 .ap-svc__btn:hover,n1-uygulama-gelistirme-v2 .ap-svc__btn:focus-visible{color:var(--soft)}\nn1-uygulama-gelistirme-v2 .ap-svc.is-on .ap-svc__btn{color:var(--ink)}\nn1-uygulama-gelistirme-v2 .ap-svc.is-on .ap-svc__btn .ap-svc__hi{transform:translateX(clamp(14px,1.4vw,26px))}\nn1-uygulama-gelistirme-v2 .ap-svc:not(.is-on) .ap-svc__n{color:var(--dim)}\nn1-uygulama-gelistirme-v2 .ap-svc__body{display:grid;grid-template-rows:0fr;margin:0;transition:grid-template-rows .6s var(--ease)}\nn1-uygulama-gelistirme-v2 .ap-svc__body>div{overflow:hidden;visibility:hidden;padding-left:clamp(48px,3.6vw,70px)}\nn1-uygulama-gelistirme-v2 .ap-svc.is-on .ap-svc__body{grid-template-rows:1fr}\nn1-uygulama-gelistirme-v2 .ap-svc.is-on .ap-svc__body>div{visibility:visible;padding-bottom:clamp(20px,1.8vw,30px)}\nn1-uygulama-gelistirme-v2 .ap-svc__media{position:absolute;grid-column:auto;grid-row:auto;top:0;bottom:0;right:0;left:calc((100% + var(--gap)) * 7 / 12);width:auto;height:auto;aspect-ratio:auto;z-index:1;opacity:0;visibility:hidden;transition:opacity .5s var(--ease),visibility 0s .5s}\nn1-uygulama-gelistirme-v2 .ap-svc.is-on .ap-svc__media{z-index:2;opacity:1;visibility:visible;transition:opacity .5s var(--ease)}\nn1-uygulama-gelistirme-v2 .ap-svc--4 .ap-svc__media{aspect-ratio:auto}\nn1-uygulama-gelistirme-v2 .ap-svc--4 .ap-svc__img{inset:auto;left:0;top:-6%;width:100%;height:150%;object-fit:cover;object-position:50% 0!important}\n}\nn1-uygulama-gelistirme-v2 .ap-flow__head{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:end}\nn1-uygulama-gelistirme-v2 .ap-flow__head>div{grid-column:1/8}\nn1-uygulama-gelistirme-v2 .ap-flow__lede{grid-column:8/13;margin-top:0}\nn1-uygulama-gelistirme-v2 .ap-flow__grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:start;margin-top:clamp(60px,6vw,110px)}\nn1-uygulama-gelistirme-v2 .ap-flow__board{grid-column:7/13;grid-row:1;position:sticky;top:calc(var(--hdr) + 40px)}\nn1-uygulama-gelistirme-v2 .ap-flow__steps{grid-column:1/6;grid-row:1}\nn1-uygulama-gelistirme-v2 .ap-fs{min-height:clamp(190px,27vh,280px);display:flex;align-items:center;border-top:1px solid var(--line)}\nn1-uygulama-gelistirme-v2 .ap-fs__b{display:grid;grid-template-columns:2.8em minmax(0,1fr);column-gap:10px;row-gap:10px;width:100%;padding:20px 0;text-align:left}\nn1-uygulama-gelistirme-v2 .ap-fs__n{grid-row:1/3;font:600 14px/1.9 Barlow,Arial,sans-serif;color:var(--dim);font-variant-numeric:tabular-nums;transition:color .4s var(--ease)}\nn1-uygulama-gelistirme-v2 .ap-fs__k{font:700 clamp(34px,3.6vw,66px)/1 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:.004em;color:var(--dim);transition:color .4s var(--ease)}\nn1-uygulama-gelistirme-v2 .ap-fs__d{max-width:36ch;font-size:clamp(16px,1.1vw,18px);line-height:1.55;color:var(--mute);transition:color .4s var(--ease)}\nn1-uygulama-gelistirme-v2 .ap-fs.is-past .ap-fs__k{color:var(--soft)}\nn1-uygulama-gelistirme-v2 .ap-fs.is-on .ap-fs__n{color:var(--acc)}\nn1-uygulama-gelistirme-v2 .ap-fs.is-on .ap-fs__k{color:var(--ink)}\nn1-uygulama-gelistirme-v2 .ap-fs.is-on .ap-fs__d{color:var(--soft)}\nn1-uygulama-gelistirme-v2 .ap-fs__b:hover .ap-fs__k{color:var(--soft)}\nn1-uygulama-gelistirme-v2 .ap-flow__now{display:flex;flex-wrap:wrap;gap:6px 18px;margin-top:16px;font-size:14.5px;line-height:1.5;color:var(--soft)}\nn1-uygulama-gelistirme-v2 .ap-flow__now span:first-child{font-weight:600;color:var(--acc);font-variant-numeric:tabular-nums}\nn1-uygulama-gelistirme-v2 .ap-art{--t:.55s;position:relative;overflow:hidden;aspect-ratio:4/3;border-radius:14px;border:1px solid rgba(236,235,229,.16);background:#0E1110}\nn1-uygulama-gelistirme-v2 .ap-art__bar{display:flex;align-items:center;gap:6px;height:34px;padding:0 14px;border-bottom:1px solid rgba(236,235,229,.08)}\nn1-uygulama-gelistirme-v2 .ap-art__bar i{width:8px;height:8px;border-radius:50%;background:rgba(236,235,229,.16)}\nn1-uygulama-gelistirme-v2 .ap-art__ver{margin-left:auto;padding:4px 8px;border-radius:6px;background:var(--acc);font:700 11px/1 Barlow,Arial,sans-serif;color:#0B0D0C;opacity:0;transform:translateY(-6px);transition:opacity var(--t),transform var(--t)}\nn1-uygulama-gelistirme-v2 .ap-art.g6 .ap-art__ver{opacity:1;transform:none}\nn1-uygulama-gelistirme-v2 .ap-art__body{position:absolute;left:0;right:0;top:34px;bottom:0}\nn1-uygulama-gelistirme-v2 .ap-a{position:absolute;inset:0;opacity:0;transition:opacity var(--t) var(--ease),transform var(--t) var(--ease);pointer-events:none}\nn1-uygulama-gelistirme-v2 .ap-a--notes{display:block}\nn1-uygulama-gelistirme-v2 .ap-a--notes span{position:absolute;padding:12px 14px;border-radius:4px;background:#ECEBE5;color:#151716;font:600 clamp(12px,1.15vw,16px)/1.2 Barlow,Arial,sans-serif;box-shadow:0 10px 24px rgba(0,0,0,.35)}\nn1-uygulama-gelistirme-v2 .ap-a--notes span:nth-child(1){left:8%;top:14%;transform:rotate(-4deg)}\nn1-uygulama-gelistirme-v2 .ap-a--notes span:nth-child(2){left:42%;top:38%;transform:rotate(3deg);background:var(--acc)}\nn1-uygulama-gelistirme-v2 .ap-a--notes span:nth-child(3){left:16%;top:66%;transform:rotate(-2deg)}\nn1-uygulama-gelistirme-v2 .ap-art:not(.g1) .ap-a--notes{opacity:1}\nn1-uygulama-gelistirme-v2 .ap-a--map{width:100%;height:100%;padding:6% 4%}\nn1-uygulama-gelistirme-v2 .ap-map__l path{fill:none;stroke:var(--acc);stroke-width:2;stroke-dasharray:6 6}\nn1-uygulama-gelistirme-v2 .ap-map__n rect{fill:#151917;stroke:rgba(236,235,229,.5);stroke-width:1.5}\nn1-uygulama-gelistirme-v2 .ap-map__t text{fill:#ECEBE5;font:600 15px Barlow,Arial,sans-serif;text-anchor:middle}\nn1-uygulama-gelistirme-v2 .ap-art.g1:not(.g2) .ap-a--map{opacity:1}\nn1-uygulama-gelistirme-v2 .ap-a--ui{padding:5% 6%;display:flex;flex-direction:column;gap:3.4%}\nn1-uygulama-gelistirme-v2 .ap-ui__top{display:flex;align-items:center;gap:4%;height:11%}\nn1-uygulama-gelistirme-v2 .ap-ui__top b{width:30%;height:52%;border-radius:4px;background:rgba(236,235,229,.14)}\nn1-uygulama-gelistirme-v2 .ap-ui__title,n1-uygulama-gelistirme-v2 .ap-ui__search{display:none}\nn1-uygulama-gelistirme-v2 .ap-ui__row{position:relative;display:flex;align-items:center;gap:4%;height:16%;padding:0 4%;border-radius:8px;border:1px dashed rgba(236,235,229,.24)}\nn1-uygulama-gelistirme-v2 .ap-ui__row b{width:46%;height:22%;border-radius:3px;background:rgba(236,235,229,.14)}\nn1-uygulama-gelistirme-v2 .ap-ui__dot{width:12px;height:12px;flex:none;border-radius:50%;border:1.5px solid rgba(236,235,229,.3)}\nn1-uygulama-gelistirme-v2 .ap-ui__txt{display:none;flex:1;font:600 clamp(12px,1.15vw,16px)/1 Barlow,Arial,sans-serif;color:#ECEBE5}\nn1-uygulama-gelistirme-v2 .ap-ui__bar{display:none;width:22%;height:5px;border-radius:3px;background:rgba(236,235,229,.12);overflow:hidden}\nn1-uygulama-gelistirme-v2 .ap-ui__bar i{display:block;height:100%;background:var(--acc)}\nn1-uygulama-gelistirme-v2 .ap-ui__btn{align-self:flex-start;display:grid;place-items:center;width:34%;height:12%;margin-top:auto;border-radius:8px;border:1.5px dashed rgba(236,235,229,.3);font:600 clamp(11px,1vw,14px)/1 Barlow,Arial,sans-serif;color:transparent}\nn1-uygulama-gelistirme-v2 .ap-art.g2 .ap-a--ui{opacity:1}\nn1-uygulama-gelistirme-v2 .ap-art.g4 .ap-ui__top b,n1-uygulama-gelistirme-v2 .ap-art.g4 .ap-ui__row b{display:none}\nn1-uygulama-gelistirme-v2 .ap-art.g4 .ap-ui__title{display:block;flex:1;font:700 clamp(18px,1.9vw,28px)/1 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;color:#ECEBE5}\nn1-uygulama-gelistirme-v2 .ap-art.g4 .ap-ui__row{border:1px solid transparent;background:#171B19}\nn1-uygulama-gelistirme-v2 .ap-art.g4 .ap-ui__txt,n1-uygulama-gelistirme-v2 .ap-art.g4 .ap-ui__bar{display:block}\nn1-uygulama-gelistirme-v2 .ap-art.g4 .ap-ui__dot--progress{border-color:var(--acc);background:linear-gradient(90deg,var(--acc) 50%,transparent 50%)}\nn1-uygulama-gelistirme-v2 .ap-art.g4 .ap-ui__dot--done{border-color:var(--acc);background:var(--acc)}\nn1-uygulama-gelistirme-v2 .ap-art.g4 .ap-ui__btn{border:0;background:var(--acc);color:#0B0D0C}\nn1-uygulama-gelistirme-v2 .ap-art.g6 .ap-ui__search{display:flex;align-items:center;gap:6px;padding:6px 10px;border-radius:8px;border:1px solid var(--acc);font:500 clamp(11px,1vw,14px)/1 Barlow,Arial,sans-serif;color:var(--soft)}\nn1-uygulama-gelistirme-v2 .ap-ui__search em{font-style:normal}\nn1-uygulama-gelistirme-v2 .ap-a--hot .ap-hot__ring{position:absolute;left:8%;top:21.5%;width:84%;height:16%;border-radius:10px;border:2px solid var(--acc)}\nn1-uygulama-gelistirme-v2 .ap-hot__cur{position:absolute;left:62%;top:30%;width:26px;height:26px;fill:#ECEBE5;stroke:#0B0D0C;stroke-width:1}\nn1-uygulama-gelistirme-v2 .ap-art.g3:not(.g4) .ap-a--hot{opacity:1}\nn1-uygulama-gelistirme-v2 .ap-art.g3:not(.g4) .ap-hot__ring{animation:ap-ring 1.6s var(--ease) infinite}\n@keyframes ap-ring{0%{box-shadow:0 0 0 0 rgba(168,207,98,.5)}80%,100%{box-shadow:0 0 0 14px rgba(168,207,98,0)}}\nn1-uygulama-gelistirme-v2 .ap-a--code{inset:auto 5% 6% auto;display:flex;align-items:center;gap:10px;padding:8px 12px;border-radius:8px;background:#000;border:1px solid rgba(168,207,98,.45);font:600 clamp(11px,1vw,14px)/1 Barlow,Arial,sans-serif;color:var(--soft)}\nn1-uygulama-gelistirme-v2 .ap-a--code span{font:700 clamp(15px,1.4vw,20px)/1 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;color:var(--acc)}\nn1-uygulama-gelistirme-v2 .ap-a--code em{font-style:normal}\nn1-uygulama-gelistirme-v2 .ap-art.g4:not(.g5) .ap-a--code{opacity:1}\nn1-uygulama-gelistirme-v2 .ap-tag{position:absolute;display:inline-flex;align-items:center;gap:6px;padding:7px 10px;border-radius:999px;background:#ECEBE5;color:#0B0D0C;font:600 clamp(11px,1vw,13.5px)/1 Barlow,Arial,sans-serif;box-shadow:0 8px 20px rgba(0,0,0,.4)}\nn1-uygulama-gelistirme-v2 .ap-tag .ap-ico{width:13px;height:13px;stroke-width:2.2;color:#0B0D0C}\nn1-uygulama-gelistirme-v2 .ap-tag--1{right:4%;bottom:7%}\nn1-uygulama-gelistirme-v2 .ap-tag--2{right:6%;top:30%}\nn1-uygulama-gelistirme-v2 .ap-tag--3{left:44%;top:6%}\nn1-uygulama-gelistirme-v2 .ap-art.g5:not(.g6) .ap-a--test{opacity:1}\nn1-uygulama-gelistirme-v2 .ap-a--new{inset:auto auto 7% 6%;transform:translateY(8px)}\nn1-uygulama-gelistirme-v2 .ap-a--new span{display:inline-block;padding:8px 12px;border-radius:999px;background:var(--acc);color:#0B0D0C;font:600 clamp(11px,1vw,13.5px)/1 Barlow,Arial,sans-serif}\nn1-uygulama-gelistirme-v2 .ap-art.g6 .ap-a--new{opacity:1;transform:none}\nn1-uygulama-gelistirme-v2 .ap-art.g6 .ap-ui__btn{opacity:0}\nn1-uygulama-gelistirme-v2 .ap-motion__grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);row-gap:clamp(50px,5vw,80px);align-items:start}\nn1-uygulama-gelistirme-v2 .ap-motion__copy{grid-column:1/-1;display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:end}\nn1-uygulama-gelistirme-v2 .ap-motion__copy>.ap-label,n1-uygulama-gelistirme-v2 .ap-motion__copy>.ap-h2{grid-column:1/8}\nn1-uygulama-gelistirme-v2 .ap-motion__side{grid-column:8/13;grid-row:2;padding-bottom:.5em}\nn1-uygulama-gelistirme-v2 .ap-motion__media{grid-column:1/5}\nn1-uygulama-gelistirme-v2 .ap-motion__vid{border-radius:4px}\nn1-uygulama-gelistirme-v2 .ap-mo{grid-column:6/13;align-self:center}\nn1-uygulama-gelistirme-v2 .ap-mo__top{display:flex;align-items:center;justify-content:space-between;gap:14px}\nn1-uygulama-gelistirme-v2 .ap-mo__l{font:600 15px/1 Barlow,Arial,sans-serif;color:var(--ink)}\nn1-uygulama-gelistirme-v2 .ap-sw{display:inline-flex;align-items:center;gap:12px;min-height:44px;padding:0 4px;font:500 14px/1 Barlow,Arial,sans-serif;color:var(--soft)}\nn1-uygulama-gelistirme-v2 .ap-mo__tabs{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}\nn1-uygulama-gelistirme-v2 .ap-mo__tab{min-height:44px;padding:0 16px;border-radius:999px;border:1px solid var(--line);font:500 14px/1 Barlow,Arial,sans-serif;color:var(--soft)}\nn1-uygulama-gelistirme-v2 .ap-mo__tab:hover{border-color:rgba(236,235,229,.3)}\nn1-uygulama-gelistirme-v2 .ap-mo__tab[aria-pressed=\"true\"]{border-color:var(--acc);background:rgba(168,207,98,.1);color:var(--ink)}\nn1-uygulama-gelistirme-v2 .ap-mo__stage{position:relative;display:grid;place-items:center;min-height:360px;margin-top:20px;padding:clamp(24px,3vw,48px);border-radius:16px;border:1px solid var(--line);background:radial-gradient(90% 80% at 50% 0%,#141816 0%,#0A0C0B 70%)}\nn1-uygulama-gelistirme-v2 .ap-ms{width:min(100%,380px)}\nn1-uygulama-gelistirme-v2 .ap-ms[hidden]{display:none}\nn1-uygulama-gelistirme-v2 .ap-ms__card{position:relative;overflow:hidden;padding:22px;border-radius:18px;background:#161A18;border:1px solid rgba(236,235,229,.08)}\nn1-uygulama-gelistirme-v2 .ap-ms__k{font:600 13px/1 Barlow,Arial,sans-serif;color:var(--mute)}\nn1-uygulama-gelistirme-v2 .ap-ms__t{margin-top:8px;font:700 30px/1 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;color:var(--ink)}\nn1-uygulama-gelistirme-v2 .ap-ms__btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:48px;margin-top:20px;padding:0 20px;border-radius:12px;background:var(--acc);font:600 15px/1 Barlow,Arial,sans-serif;color:#0B0D0C;white-space:nowrap;overflow:hidden}\nn1-uygulama-gelistirme-v2 .ap-ms__btn--ghost{background:none;border:1px solid rgba(168,207,98,.5);color:var(--ink)}\nn1-uygulama-gelistirme-v2 .ap-ms__btn:disabled{cursor:default}\nn1-uygulama-gelistirme-v2 .ap-ms__bi{display:none}\nn1-uygulama-gelistirme-v2 .ap-ms__bi .ap-ico{width:18px;height:18px;stroke-width:2.2}\nn1-uygulama-gelistirme-v2 .ap-ms.is-done .ap-ms__btn,n1-uygulama-gelistirme-v2 .is-done>.ap-ms__card .ap-ms__btn{background:rgba(168,207,98,.16);color:var(--acc)}\nn1-uygulama-gelistirme-v2 .ap-ms.is-done .ap-ms__bi{display:block}\nn1-uygulama-gelistirme-v2 .ap-toast{min-height:56px;margin-top:12px}\nn1-uygulama-gelistirme-v2 .ap-toast__in{display:flex;align-items:center;gap:10px;padding:8px 8px 8px 14px;border-radius:12px;background:#ECEBE5;color:#0B0D0C;font:600 14.5px/1.2 Barlow,Arial,sans-serif}\nn1-uygulama-gelistirme-v2 .ap-toast__in[hidden]{display:none}\nn1-uygulama-gelistirme-v2 .ap-toast__in>span{flex:1}\nn1-uygulama-gelistirme-v2 .ap-toast__in button{min-height:44px;padding:0 12px;border-radius:9px;font:700 14px/1 Barlow,Arial,sans-serif;color:#0B0D0C;text-decoration:underline;text-underline-offset:3px}\nn1-uygulama-gelistirme-v2 .ap-ms__page{min-height:250px}\nn1-uygulama-gelistirme-v2 .ap-pg[hidden]{display:none}\nn1-uygulama-gelistirme-v2 .ap-pg__row{display:flex;align-items:center;justify-content:space-between;width:100%;min-height:48px;margin-top:8px;padding:0 12px;border-radius:10px;background:#1C211F;font:500 15px/1 Barlow,Arial,sans-serif;color:var(--ink);text-align:left}\nn1-uygulama-gelistirme-v2 .ap-pg__row .ap-ico{color:var(--mute)}\nn1-uygulama-gelistirme-v2 .ap-pg__back{display:inline-flex;align-items:center;gap:6px;min-height:44px;margin-left:-4px;font:600 14px/1 Barlow,Arial,sans-serif;color:var(--acc)}\nn1-uygulama-gelistirme-v2 .ap-pg__title{margin-top:10px;font:700 34px/1 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;color:var(--ink)}\nn1-uygulama-gelistirme-v2 .ap-pg__bar{display:block;height:5px;margin-top:16px;border-radius:3px;background:rgba(236,235,229,.1);overflow:hidden}\nn1-uygulama-gelistirme-v2 .ap-pg__bar i{display:block;width:50%;height:100%;background:var(--acc)}\nn1-uygulama-gelistirme-v2 .ap-ms__set{display:flex;align-items:center;gap:12px;width:100%;min-height:56px;margin-top:16px;padding:0 12px;border-radius:12px;background:#1C211F;text-align:left;color:var(--ink)}\nn1-uygulama-gelistirme-v2 .ap-ms__set .ap-bell{width:20px;height:20px;color:var(--mute)}\nn1-uygulama-gelistirme-v2 .ap-bell__x{transition:opacity .3s}\nn1-uygulama-gelistirme-v2 .ap-ms__set[aria-checked=\"true\"] .ap-bell{color:var(--acc)}\nn1-uygulama-gelistirme-v2 .ap-ms__set[aria-checked=\"true\"] .ap-bell__x{opacity:0}\nn1-uygulama-gelistirme-v2 .ap-ms__sl{flex:1;font:600 15px/1 Barlow,Arial,sans-serif}\nn1-uygulama-gelistirme-v2 .ap-ms__sv{font-size:13px;color:var(--mute)}\nn1-uygulama-gelistirme-v2 .ap-ms__save{display:inline-flex;align-items:center;gap:10px;min-height:48px;margin-top:20px;padding:0 18px;border-radius:12px;border:1px solid rgba(236,235,229,.2);font:600 15px/1 Barlow,Arial,sans-serif;color:var(--ink)}\nn1-uygulama-gelistirme-v2 .ap-markico{width:20px;height:20px;transition:fill .3s,color .3s}\nn1-uygulama-gelistirme-v2 .ap-ms__save[aria-pressed=\"true\"]{border-color:var(--acc)}\nn1-uygulama-gelistirme-v2 .ap-ms__save[aria-pressed=\"true\"] .ap-markico{fill:var(--acc);color:var(--acc)}\nn1-uygulama-gelistirme-v2 .ap-ld{margin-top:14px;min-height:126px}\nn1-uygulama-gelistirme-v2 .ap-ld__sk{display:none;flex-direction:column;gap:12px;padding-top:4px}\nn1-uygulama-gelistirme-v2 .ap-ld__sk i{display:block;height:30px;border-radius:8px;background:linear-gradient(90deg,#1E2321 0%,#2A302D 50%,#1E2321 100%);background-size:200% 100%;animation:ap-sk 1.1s linear infinite}\n@keyframes ap-sk{0%{background-position:100% 0}100%{background-position:-100% 0}}\nn1-uygulama-gelistirme-v2 .ap-ld__list{display:none;flex-direction:column}\nn1-uygulama-gelistirme-v2 .ap-ld__list li{padding:10px 0;border-bottom:1px solid rgba(236,235,229,.08);font-size:15px;color:var(--ink)}\nn1-uygulama-gelistirme-v2 .ap-ld[data-state=\"idle\"]::before{content:\"İçerik henüz yüklenmedi.\";display:block;padding:44px 0;font-size:14px;color:var(--mute);text-align:center}\nn1-uygulama-gelistirme-v2 .ap-ld[data-state=\"loading\"] .ap-ld__sk{display:flex}\nn1-uygulama-gelistirme-v2 .ap-ld[data-state=\"done\"] .ap-ld__list{display:flex}\nn1-uygulama-gelistirme-v2 .ap-mo.is-still *,n1-uygulama-gelistirme-v2 .ap-mo.is-still *::before,n1-uygulama-gelistirme-v2 .ap-mo.is-still *::after{transition:none!important;animation:none!important}\nn1-uygulama-gelistirme-v2 .ap-mo__why{min-height:3.2em;margin-top:18px;max-width:60ch;font-size:clamp(16px,1.15vw,18px);line-height:1.55;color:var(--soft)}\nn1-uygulama-gelistirme-v2 .ap-life__head{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:end}\nn1-uygulama-gelistirme-v2 .ap-life__head>div{grid-column:1/8}\nn1-uygulama-gelistirme-v2 .ap-life__lede{grid-column:8/13;margin-top:0}\nn1-uygulama-gelistirme-v2 .ap-life__grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:center;margin-top:clamp(60px,6vw,110px)}\nn1-uygulama-gelistirme-v2 .ap-life__media{grid-column:9/13;grid-row:1}\nn1-uygulama-gelistirme-v2 .ap-life__vid{border-radius:4px}\nn1-uygulama-gelistirme-v2 .ap-life__panel{grid-column:1/8;grid-row:1}\nn1-uygulama-gelistirme-v2 .ap-ctx{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}\nn1-uygulama-gelistirme-v2 .ap-ctx__b{display:flex;flex-direction:column;gap:6px;min-height:44px;padding:14px 16px;border-radius:12px;border:1px solid var(--line);background:#0D0F0E;text-align:left;transition:border-color .35s var(--ease),background-color .35s var(--ease)}\nn1-uygulama-gelistirme-v2 .ap-ctx__t{font:700 clamp(22px,1.7vw,30px)/1 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;color:var(--soft)}\nn1-uygulama-gelistirme-v2 .ap-ctx__s{font-size:13.5px;line-height:1.35;color:var(--mute)}\nn1-uygulama-gelistirme-v2 .ap-ctx__b:hover{border-color:rgba(236,235,229,.3)}\nn1-uygulama-gelistirme-v2 .ap-ctx__b[aria-pressed=\"true\"]{border-color:var(--acc);background:rgba(168,207,98,.08)}\nn1-uygulama-gelistirme-v2 .ap-ctx__b[aria-pressed=\"true\"] .ap-ctx__t{color:var(--acc)}\nn1-uygulama-gelistirme-v2 .ap-life__stage{margin-top:18px;padding:clamp(14px,2vw,30px);border-radius:16px;border:1px solid var(--line);background:#0B0D0C}\nn1-uygulama-gelistirme-v2 .ap-dia{display:block;width:100%;height:auto;max-height:360px}\nn1-uygulama-gelistirme-v2 .ap-dia__g{opacity:0;transform:scale(.94);transform-origin:160px 110px;transition:opacity .5s var(--ease),transform .6s var(--ease)}\nn1-uygulama-gelistirme-v2 .ap-life__stage[data-ctx=\"phone\"] [data-g=\"phone\"],n1-uygulama-gelistirme-v2 .ap-life__stage[data-ctx=\"tablet\"] [data-g=\"tablet\"],n1-uygulama-gelistirme-v2 .ap-life__stage[data-ctx=\"desk\"] [data-g=\"desk\"]{opacity:1;transform:none}\nn1-uygulama-gelistirme-v2 .ap-dia__dev{fill:none;stroke:rgba(236,235,229,.7);stroke-width:1.5}\nn1-uygulama-gelistirme-v2 .ap-dia__zone{fill:rgba(168,207,98,.14);stroke:none}\nn1-uygulama-gelistirme-v2 .ap-dia__nav{fill:var(--acc)}\nn1-uygulama-gelistirme-v2 .ap-dia__dot{fill:#0B0D0C}\nn1-uygulama-gelistirme-v2 .ap-dia__blk{fill:rgba(236,235,229,.14);stroke:none}\nn1-uygulama-gelistirme-v2 path.ap-dia__blk{fill:none;stroke:rgba(236,235,229,.2);stroke-width:4;stroke-linecap:round}\nn1-uygulama-gelistirme-v2 .ap-dia__blk--l{fill:none;stroke:rgba(236,235,229,.24);stroke-width:1.2}\nn1-uygulama-gelistirme-v2 .ap-dia__pen{fill:var(--acc)}\nn1-uygulama-gelistirme-v2 .ap-dia__cur{fill:#ECEBE5;stroke:#0B0D0C;stroke-width:1}\nn1-uygulama-gelistirme-v2 .ap-dec{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:var(--gap);margin:22px 0 0}\nn1-uygulama-gelistirme-v2 .ap-dec__r{padding:14px 0;border-top:1px solid var(--line)}\nn1-uygulama-gelistirme-v2 .ap-dec dt{font-size:13px;line-height:1.3;color:var(--mute)}\nn1-uygulama-gelistirme-v2 .ap-dec dd{margin:6px 0 0;font:500 clamp(16px,1.2vw,19px)/1.4 Barlow,Arial,sans-serif;color:var(--ink)}\nn1-uygulama-gelistirme-v2 .ap-qual__grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:start}\nn1-uygulama-gelistirme-v2 .ap-qual__fig{grid-column:1/6;grid-row:1/3;margin:0}\nn1-uygulama-gelistirme-v2 .ap-qual__frame{position:relative;overflow:hidden;aspect-ratio:941/1500;border-radius:4px;background:#000}\nn1-uygulama-gelistirme-v2 .ap-qual__img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}\nn1-uygulama-gelistirme-v2 .ap-qual__copy{grid-column:7/13;grid-row:1}\nn1-uygulama-gelistirme-v2 .ap-qual__sub{position:relative;display:inline-block;margin-top:14px;font:700 clamp(56px,7vw,136px)/.96 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:-.012em}\nn1-uygulama-gelistirme-v2 .ap-qual__u{position:absolute;left:0;bottom:-.08em;width:100%;height:.12em;fill:none;stroke:var(--acc);stroke-width:3;overflow:visible}\nn1-uygulama-gelistirme-v2 .ap-qs2{grid-column:7/13;grid-row:2;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:clamp(24px,3vw,56px);margin-top:clamp(40px,4vw,70px)}\nn1-uygulama-gelistirme-v2 .ap-qi{display:grid;grid-template-columns:30px minmax(0,1fr);column-gap:12px;row-gap:6px;padding:18px 0;border-top:1px solid var(--line)}\nn1-uygulama-gelistirme-v2 .ap-qi__c{grid-row:1/3;width:24px;height:24px;margin-top:2px;fill:none;stroke:var(--acc);stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}\nn1-uygulama-gelistirme-v2 .ap-qi__k{font:600 clamp(18px,1.35vw,22px)/1.3 Barlow,Arial,sans-serif;color:var(--ink)}\nn1-uygulama-gelistirme-v2 .ap-qi__d{font-size:clamp(15px,1.05vw,16.5px);line-height:1.55;color:var(--soft)}\nn1-uygulama-gelistirme-v2 .ap-qual__note{grid-column:7/13;grid-row:3}\nn1-uygulama-gelistirme-v2 .ap-fin{position:relative;padding:clamp(110px,10vw,190px) 0 clamp(90px,8vw,140px);border-top:1px solid var(--line)}\nn1-uygulama-gelistirme-v2 .ap-fin .ap-wrap{position:relative}\nn1-uygulama-gelistirme-v2 .ap-fin__t{display:block;margin-top:clamp(24px,2.2vw,36px);font:700 clamp(68px,12.4vw,240px)/.9 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:-.016em}\nn1-uygulama-gelistirme-v2 .ap-fin__a,n1-uygulama-gelistirme-v2 .ap-fin__b{display:block;padding-top:.08em;white-space:nowrap}\nn1-uygulama-gelistirme-v2 .ap-fin__b{padding-left:clamp(40px,14vw,280px)}\nn1-uygulama-gelistirme-v2 .ap-fin__q{display:inline-block;color:var(--acc)}\nn1-uygulama-gelistirme-v2 .ap-fin__row{position:relative;z-index:1;display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:end;margin-top:clamp(50px,5vw,90px)}\nn1-uygulama-gelistirme-v2 .ap-fin__sub{grid-column:1/7;font:700 clamp(34px,3.6vw,70px)/1 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:-.004em;color:var(--soft)}\nn1-uygulama-gelistirme-v2 .ap-fin__sub span{display:inline}\nn1-uygulama-gelistirme-v2 .ap-fin__sub span:last-child{color:var(--ink)}\nn1-uygulama-gelistirme-v2 .ap-fin__side{grid-column:8/13}\nn1-uygulama-gelistirme-v2 .ap-fin__side .ap-body{margin-top:0}\nn1-uygulama-gelistirme-v2 .ap-fin__cta{display:flex;flex-wrap:wrap;gap:14px;margin-top:26px}\nn1-uygulama-gelistirme-v2 .ap-fin__line{position:absolute;inset:0;z-index:0;width:100%;height:100%;fill:none;stroke:rgba(168,207,98,.7);stroke-width:1.5;stroke-dasharray:3 7;pointer-events:none;overflow:visible}\n@media (max-width:1024px){n1-uygulama-gelistirme-v2 .ap-play{right:auto;left:12px}}\n@media (min-width:768px){n1-uygulama-gelistirme-v2 .ap-hero .ap-play{top:16px;bottom:auto;right:16px;left:auto}}\nn1-uygulama-gelistirme-v2 .ap-app .ap-col__h{margin:0 0 10px}\n@media (max-width:1024px){\nn1-uygulama-gelistirme-v2 .ap-hero__stage{height:clamp(520px,92vw,calc(100svh - var(--hdr)))}\nn1-uygulama-gelistirme-v2 .ap-hero__vid video{object-position:70% 50%}\nn1-uygulama-gelistirme-v2 .ap-hero__sub{grid-column:1/-1}\nn1-uygulama-gelistirme-v2 .ap-hero__side{grid-column:1/-1;margin-top:26px}\nn1-uygulama-gelistirme-v2 .ap-exp__head>div:first-child,n1-uygulama-gelistirme-v2 .ap-exp__side{grid-column:1/-1}\nn1-uygulama-gelistirme-v2 .ap-exp__side{margin-top:30px;padding:0}\nn1-uygulama-gelistirme-v2 .ap-qs{grid-template-columns:repeat(2,minmax(0,1fr))}\nn1-uygulama-gelistirme-v2 .ap-lab__head>div:first-child,n1-uygulama-gelistirme-v2 .ap-lab__intro{grid-column:1/-1}\nn1-uygulama-gelistirme-v2 .ap-lab__intro{margin-top:30px}\nn1-uygulama-gelistirme-v2 .ap-views{flex:1 1 100%}\nn1-uygulama-gelistirme-v2 .ap-view{flex:1 1 0;width:auto}\nn1-uygulama-gelistirme-v2 .ap-build__a,n1-uygulama-gelistirme-v2 .ap-build__b{grid-column:1/-1}\nn1-uygulama-gelistirme-v2 .ap-build__b{padding-top:.12em}\nn1-uygulama-gelistirme-v2 .ap-svc__h,n1-uygulama-gelistirme-v2 .ap-svc__body{grid-column:1/7}\nn1-uygulama-gelistirme-v2 .ap-svc__media{grid-column:7/13}\nn1-uygulama-gelistirme-v2 .ap-flow__head>div,n1-uygulama-gelistirme-v2 .ap-flow__lede{grid-column:1/-1}\nn1-uygulama-gelistirme-v2 .ap-flow__lede{margin-top:26px}\nn1-uygulama-gelistirme-v2 .ap-flow__board{grid-column:1/-1;grid-row:1;top:calc(var(--hdr) + 8px);z-index:2;padding-bottom:16px;background:var(--bg)}\nn1-uygulama-gelistirme-v2 .ap-flow__steps{grid-column:1/-1;grid-row:2}\nn1-uygulama-gelistirme-v2 .ap-fs{min-height:clamp(160px,22vh,240px)}\nn1-uygulama-gelistirme-v2 .ap-motion__copy>.ap-label,n1-uygulama-gelistirme-v2 .ap-motion__copy>.ap-h2,n1-uygulama-gelistirme-v2 .ap-motion__side{grid-column:1/-1;grid-row:auto}\nn1-uygulama-gelistirme-v2 .ap-motion__side{margin-top:28px;padding:0}\nn1-uygulama-gelistirme-v2 .ap-motion__media{grid-column:1/6}\nn1-uygulama-gelistirme-v2 .ap-mo{grid-column:6/13}\nn1-uygulama-gelistirme-v2 .ap-life__head>div,n1-uygulama-gelistirme-v2 .ap-life__lede{grid-column:1/-1}\nn1-uygulama-gelistirme-v2 .ap-life__lede{margin-top:26px}\nn1-uygulama-gelistirme-v2 .ap-life__panel{grid-column:1/8}\nn1-uygulama-gelistirme-v2 .ap-life__media{grid-column:8/13}\nn1-uygulama-gelistirme-v2 .ap-ctx__s{font-size:12.5px}\nn1-uygulama-gelistirme-v2 .ap-dec{grid-template-columns:minmax(0,1fr)}\nn1-uygulama-gelistirme-v2 .ap-qual__fig{grid-column:1/6;grid-row:1}\nn1-uygulama-gelistirme-v2 .ap-qual__copy{grid-column:6/13;grid-row:1;align-self:center}\nn1-uygulama-gelistirme-v2 .ap-qs2{grid-column:1/-1;grid-row:2}\nn1-uygulama-gelistirme-v2 .ap-qual__note{grid-column:1/-1;grid-row:3}\nn1-uygulama-gelistirme-v2 .ap-fin__sub,n1-uygulama-gelistirme-v2 .ap-fin__side{grid-column:1/-1}\nn1-uygulama-gelistirme-v2 .ap-fin__side{margin-top:30px}\nn1-uygulama-gelistirme-v2 .ap-fin__line{display:none}\nn1-uygulama-gelistirme-v2 .ap-art{width:min(100%,600px);margin:0 auto;aspect-ratio:16/10}\nn1-uygulama-gelistirme-v2 .ap-flow__now{justify-content:center}\nn1-uygulama-gelistirme-v2 n1-header{display:block!important;position:fixed!important;top:0!important;left:0!important;right:0!important;width:100%!important;min-height:0!important;height:auto!important;z-index:900!important;background:rgba(8,10,9,.95);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);border-bottom:1px solid rgba(228,227,221,.07)}\nn1-uygulama-gelistirme-v2 n1-header .n1h-bar.site-container{display:grid!important;align-items:center!important;width:calc(100% - 48px)!important;margin-inline:auto!important;padding-inline:0!important;height:72px!important;max-width:100%!important}\nn1-uygulama-gelistirme-v2 n1-header .n1h-logo{margin:0!important;flex:none}\nn1-uygulama-gelistirme-v2 n1-header .n1h-logo img{width:32px!important;height:32px!important;max-width:none!important}\nn1-uygulama-gelistirme-v2 n1-header .n1h-right{align-items:center!important}\nn1-uygulama-gelistirme-v2 n1-header .n1h-menu{display:inline-flex!important;height:40px!important;margin:0!important}\nn1-uygulama-gelistirme-v2 n1-header .n1h-cta{display:none!important}\nn1-uygulama-gelistirme-v2 footer.n1ft .n1ft-partner{opacity:1!important;visibility:visible!important;transform:none!important}\n}\n@media (max-width:900px){n1-uygulama-gelistirme-v2 .n1ft-inner{width:90%}}\n@media (max-width:767px){\nn1-uygulama-gelistirme-v2 .ap-hero__stage{height:auto;min-height:0;display:flex;flex-direction:column;overflow:visible;background:var(--bg)}\nn1-uygulama-gelistirme-v2 .ap-hero__copy{position:relative;bottom:auto;padding-top:26px}\nn1-uygulama-gelistirme-v2 .ap-hero__t{font-size:clamp(64px,19.6vw,120px)}\nn1-uygulama-gelistirme-v2 .ap-fill{-webkit-text-stroke-width:1px}\nn1-uygulama-gelistirme-v2 .ap-hero__screen{position:relative;inset:auto;margin-top:28px;aspect-ratio:4/5;overflow:hidden}\nn1-uygulama-gelistirme-v2 .ap-hero__vid video{object-position:64% 50%}\nn1-uygulama-gelistirme-v2 .ap-hero__shade{background:linear-gradient(0deg,rgba(8,10,9,.55) 0%,rgba(8,10,9,0) 30%)}\nn1-uygulama-gelistirme-v2 .ap-hero__frame{display:none}\nn1-uygulama-gelistirme-v2 .ap-hero__foot{display:block;padding:34px 0 80px}\nn1-uygulama-gelistirme-v2 .ap-hero__sub{font-size:clamp(46px,13.4vw,80px)}\nn1-uygulama-gelistirme-v2 .ap-hero__side{margin-top:22px}\nn1-uygulama-gelistirme-v2 .ap-h2{font-size:clamp(50px,14.4vw,84px)}\nn1-uygulama-gelistirme-v2 .ap-exp__frame{margin:0;aspect-ratio:4/5}\nn1-uygulama-gelistirme-v2 .ap-exp__img{object-position:28% 50%!important}\nn1-uygulama-gelistirme-v2 .ap-sent{font-size:clamp(26px,7.6vw,40px)}\nn1-uygulama-gelistirme-v2 .ap-qs{grid-template-columns:minmax(0,1fr)}\nn1-uygulama-gelistirme-v2 .ap-views{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}\nn1-uygulama-gelistirme-v2 .ap-view{grid-template-columns:minmax(0,1fr);padding:10px 10px 12px;row-gap:6px}\nn1-uygulama-gelistirme-v2 .ap-view__n{grid-row:auto;font-size:12.5px;line-height:1}\nn1-uygulama-gelistirme-v2 .ap-view__t{font-size:clamp(16px,4.6vw,21px);letter-spacing:.01em}\nn1-uygulama-gelistirme-v2 .ap-view__s{display:none}\nn1-uygulama-gelistirme-v2 .ap-reset{width:100%;justify-content:center}\nn1-uygulama-gelistirme-v2 .ap-sim{padding:10px;border-radius:14px}\nn1-uygulama-gelistirme-v2 .ap-sim__corners{display:none}\nn1-uygulama-gelistirme-v2 .ap-dev{width:100%;height:640px;border-radius:30px;padding:6px}\nn1-uygulama-gelistirme-v2 .ap-app{border-radius:24px}\nn1-uygulama-gelistirme-v2 .ap-sim[data-view=\"web\"] .ap-dev{height:620px}\nn1-uygulama-gelistirme-v2 .ap-sim[data-view=\"dash\"] .ap-dev{min-height:0}\nn1-uygulama-gelistirme-v2 .ap-d__top{align-items:flex-start}\nn1-uygulama-gelistirme-v2 .ap-build__t{font-size:clamp(50px,14.4vw,84px)}\nn1-uygulama-gelistirme-v2 .ap-build__b{text-align:left;padding-left:12vw}\nn1-uygulama-gelistirme-v2 .ap-svc{padding:34px 0 40px}\nn1-uygulama-gelistirme-v2 .ap-svc__h,n1-uygulama-gelistirme-v2 .ap-svc__body,n1-uygulama-gelistirme-v2 .ap-svc__media{grid-column:1/-1}\nn1-uygulama-gelistirme-v2 .ap-svc__h{font-size:clamp(32px,9vw,48px)}\nn1-uygulama-gelistirme-v2 .ap-svc__hi{gap:12px}\nn1-uygulama-gelistirme-v2 .ap-svc__media{grid-row:3;margin-top:24px}\nn1-uygulama-gelistirme-v2 .ap-flow__board{top:calc(var(--hdr) + 6px);padding-bottom:12px}\nn1-uygulama-gelistirme-v2 .ap-art{aspect-ratio:16/11}\nn1-uygulama-gelistirme-v2 .ap-flow__now{margin-top:10px;font-size:13.5px}\nn1-uygulama-gelistirme-v2 .ap-fs{min-height:auto}\nn1-uygulama-gelistirme-v2 .ap-fs__b{padding:26px 0}\nn1-uygulama-gelistirme-v2 .ap-fs__k{font-size:clamp(30px,9vw,46px)}\nn1-uygulama-gelistirme-v2 .ap-motion__media{grid-column:1/-1;width:min(78%,340px);margin:0 auto}\nn1-uygulama-gelistirme-v2 .ap-mo{grid-column:1/-1}\nn1-uygulama-gelistirme-v2 .ap-mo__tabs{gap:6px}\nn1-uygulama-gelistirme-v2 .ap-mo__tab{padding:0 13px;font-size:13.5px}\nn1-uygulama-gelistirme-v2 .ap-mo__stage{min-height:330px;padding:18px}\nn1-uygulama-gelistirme-v2 .ap-life__panel{grid-column:1/-1}\nn1-uygulama-gelistirme-v2 .ap-life__media{grid-column:1/-1;grid-row:2;width:min(78%,340px);margin:44px auto 0}\nn1-uygulama-gelistirme-v2 .ap-ctx{grid-template-columns:minmax(0,1fr);gap:8px}\nn1-uygulama-gelistirme-v2 .ap-ctx__b{flex-direction:row;align-items:baseline;justify-content:space-between;gap:12px;padding:12px 14px}\nn1-uygulama-gelistirme-v2 .ap-ctx__s{text-align:right}\nn1-uygulama-gelistirme-v2 .ap-qual__fig{grid-column:1/-1;grid-row:1}\nn1-uygulama-gelistirme-v2 .ap-qual__frame{aspect-ratio:4/5}\nn1-uygulama-gelistirme-v2 .ap-qual__copy{grid-column:1/-1;grid-row:2;margin-top:46px}\nn1-uygulama-gelistirme-v2 .ap-qual__sub{font-size:clamp(50px,14.4vw,84px)}\nn1-uygulama-gelistirme-v2 .ap-qs2{grid-row:3;grid-template-columns:minmax(0,1fr)}\nn1-uygulama-gelistirme-v2 .ap-qual__note{grid-row:4}\nn1-uygulama-gelistirme-v2 .ap-fin__t{font-size:clamp(60px,17.4vw,110px)}\nn1-uygulama-gelistirme-v2 .ap-fin__b{padding-left:10vw}\nn1-uygulama-gelistirme-v2 .ap-fin__sub{font-size:clamp(32px,9vw,48px)}\nn1-uygulama-gelistirme-v2 .ap-fin__cta .ap-btn{width:100%}\nn1-uygulama-gelistirme-v2 .ap-btn{width:100%;height:56px;padding:0 7px 0 18px;font-size:12px}\nn1-uygulama-gelistirme-v2 .ap-btn__ico{width:42px;height:42px}\nn1-uygulama-gelistirme-v2 n1-header .n1h-bar.site-container{width:calc(100% - 40px)!important;height:64px!important}\nn1-uygulama-gelistirme-v2 n1-header .n1h-logo img{width:30px!important;height:30px!important}\nn1-uygulama-gelistirme-v2 .n1ft-inner{width:calc(100% - 40px)}\nn1-uygulama-gelistirme-v2 .n1ft-top{grid-template-columns:1fr!important;gap:32px;padding:39px 0 36px}\nn1-uygulama-gelistirme-v2 .n1ft-col--brand{grid-column:auto}\nn1-uygulama-gelistirme-v2 .n1ft-brand{font-size:45px}\n}\n@media (max-width:360px){n1-uygulama-gelistirme-v2 .ap-wrap,n1-uygulama-gelistirme-v2 .n1ft-inner{width:calc(100% - 32px)}n1-uygulama-gelistirme-v2 n1-header .n1h-bar.site-container{width:calc(100% - 32px)!important}}\n@media (prefers-reduced-motion:reduce){n1-uygulama-gelistirme-v2 .ap *,n1-uygulama-gelistirme-v2 .ap *::before,n1-uygulama-gelistirme-v2 .ap *::after{transition-duration:.01ms!important;transition-delay:0s!important;animation-duration:.01ms!important;animation-iteration-count:1!important}}";

  /* ---------- Bileşen ---------- */
  class UygulamaGelistirmeV2 extends HTMLElement {
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
        if (!this.querySelector('main.ap')) this.innerHTML = '<p style="padding:40px 5%;color:#ECEBE5;font:16px Barlow,Arial,sans-serif">Uygulama Geliştirme sayfası yüklenemedi. Lütfen sayfayı yenileyin.</p>';
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
      this._build();
      this._flow();
      this._motionDemo();
      this._life();
      this._finLine();

      var fonts = loadCss(FONTS).catch(function (e) { console.warn('[' + TAG + '] Font yüklenemedi, yedek font kullanılıyor', e); });
      await Promise.all([n1Optional(loadCss(url('footerCss')),'footer CSS'), n1Optional(loadCss(url('responsive')),'responsive CSS'), loadJs(url('markup'), function () { return !!window.N1_SITE_MARKUP; })]);
      if (!n1Alive()) return;

      var tpl = document.createElement('template');
      tpl.innerHTML = String(window.N1_SITE_MARKUP || '').split('{{ASSETS}}').join(url('assets'));
      var hdr = tpl.content.querySelector('n1-header'), ft = tpl.content.querySelector('[data-n1-footer]'), fc = tpl.content.querySelector('n1-floating-controls');
      if (!hdr || !ft) throw new Error('Onaylı Header/Footer işaretlemesi bulunamadı');
      var main = this.querySelector('main.ap');

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
        if (self._header.panel) { self._header.panel.classList.add('n1-inner-panel'); self._header.panel.setAttribute('data-n1-ap', ''); }
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

      var otherFc = [].some.call(document.querySelectorAll('n1-floating-controls'), function (f) { return !self.contains(f); }) || !!document.querySelector('.n1fc:not([data-n1-ap])');
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
        if (this._header.panel) { this._header.panel.classList.add('n1-inner-panel'); this._header.panel.setAttribute('data-n1-ap', ''); }
      }
      } else await n1InitHeader().catch(function(e){console.warn('[1N mobile] header',e);});
      if (!n1Alive()) return;
      if (this._footerOwned) await loadJs(url('footerJs'), null, true);
      if (this._fcOwned && !customElements.get('n1-floating-controls')) await loadJs(url('floating'), function () { return !!customElements.get('n1-floating-controls'); });
      var layer = document.querySelector('body > .n1fc:last-of-type'); if (this._fcOwned && layer) layer.setAttribute('data-n1-ap', '');
      if (!n1Alive()) return;
      this._animate();
    }


    _anchors() {
      var a = this.querySelector('.ap-scroll'), self = this;
      this._ev(a, 'click', function (e) {
        var t = self.querySelector('#ap-lab'); if (!t) return;
        e.preventDefault();
        scrollTo({ top: t.getBoundingClientRect().top + scrollY - 40, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      });
    }

    /* ---------- Videolar: poster yok, aynı anda tek video, görünmeyen durur, uzaktaki indirilmez ---------- */
    _videos() {
      var self = this, reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      var c = navigator.connection || {}, autoOK = !reduced && !c.saveData;
      var V = [];
      [].forEach.call(this.querySelectorAll('.ap-vid'), function (box) {
        var key = box.getAttribute('data-v'), meta = VID[key], v = box.querySelector('video'), btn = box.querySelector('.ap-play'), err = box.querySelector('.ap-vid__err');
        if (!v) return;   // V1.4: telefon/tablette sabit kare
        v.defaultMuted = true; v.muted = true; v.playsInline = true; v.setAttribute('webkit-playsinline', ''); if(n1MobileRepair()){v.setAttribute('muted','');v.setAttribute('playsinline','');}
        var P = { key: key, box: box, v: v, ratio: 0, user: false, loaded: false, failed: false };
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
          if (v.paused && v.currentTime === 0) v.currentTime = meta.first || .05;   // hareketsiz durumda videonun kendi anlamlı karesi
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
      var off = function (P) { return !!P.box.closest('[data-off]'); };
      var choose = function () {
        if (!self._on) return;
        if (document.hidden) { V.forEach(function (P) { if (!P.v.paused) P.v.pause(); }); return; }
        var best = null;
        V.forEach(function (P) {
          var want = (autoOK && !P.user) || P.forced;
          if (P.ratio >= .08 && want && !P.failed && !off(P) && (!best || P.ratio > best.ratio)) best = P;
        });
        V.forEach(function (P) {
          if (P === best) return;
          if (!P.v.paused && (best || P.ratio < .02 || off(P))) P.v.pause();
          if ((P.ratio < .02 || off(P)) && Date.now() - (P.forcedAt || 0) > 2500) P.forced = false;
        });
        if (best && best.v.paused) best.play();
      };
      this._vidChoose = choose;
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

    /* ---------- Ne yapıyoruz: masaüstünde dizin + sahne (açılır düğmeler), küçük ekranlarda alt alta ---------- */
    _build() {
      var self = this, items = [].slice.call(this.querySelectorAll('.ap-svc')), mq = matchMedia('(min-width:1025px)');
      var fine = matchMedia('(hover:hover) and (pointer:fine)'), cur = 0, hov = 0;
      var activate = function (i, user) {
        if (i === cur && user) return;
        var prev = cur; cur = i;
        items.forEach(function (it, k) {
          var on = k === i; it.classList.toggle('is-on', on);
          var b = it.querySelector('.ap-svc__btn'); if (b) b.setAttribute('aria-expanded', String(on));
          var md = it.querySelector('.ap-svc__media'); if (on) md.removeAttribute('data-off'); else md.setAttribute('data-off', '');
        });
        var g = window.gsap;
        if (user && g && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
          var m = items[i].querySelector('.ap-svc__media'), dir = i > prev ? 1 : -1;
          g.fromTo(m, { clipPath: dir > 0 ? 'inset(100% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: .9, ease: 'expo.inOut', clearProps: 'clipPath' });
          g.fromTo(m.querySelector('img,video'), { scale: 1.12 }, { scale: 1, duration: 1.2, ease: 'expo.out', clearProps: 'transform' });
          var bd = items[i].querySelector('.ap-svc__body > div'); if (bd) g.fromTo(bd, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .5, delay: .15, ease: 'power2.out', clearProps: 'transform,opacity' });
        }
        if (self._vidChoose) setTimeout(self._vidChoose, 30);
      };
      var on = [];
      var desktop = function () {
        items.forEach(function (it, i) {
          var h = it.querySelector('.ap-svc__h'), hi = h.querySelector('.ap-svc__hi');
          var b = document.createElement('button'); b.type = 'button'; b.className = 'ap-svc__btn';
          b.setAttribute('aria-controls', 'ap-svc-' + (i + 1)); b.appendChild(hi); h.appendChild(b);
          var click = function () { activate(i, true); }, enter = function () { if (!fine.matches) return; clearTimeout(hov); hov = setTimeout(function () { activate(i, true); }, 140); }, leave = function () { clearTimeout(hov); };
          b.addEventListener('click', click); b.addEventListener('pointerenter', enter); b.addEventListener('pointerleave', leave);
          on.push(function () { b.removeEventListener('click', click); b.removeEventListener('pointerenter', enter); b.removeEventListener('pointerleave', leave); h.appendChild(hi); b.remove(); });
        });
        activate(cur, false);
      };
      var stacked = function () {
        on.splice(0).forEach(function (f) { f(); });
        items.forEach(function (it) { it.querySelector('.ap-svc__media').removeAttribute('data-off'); });
        if (self._vidChoose) setTimeout(self._vidChoose, 30);
      };
      var apply = function () { clearTimeout(hov); if (mq.matches) { if (!on.length) desktop(); } else stacked(); };
      apply();
      mq.addEventListener('change', apply);
      this._cleanups.push(function () { mq.removeEventListener('change', apply); clearTimeout(hov); on.splice(0).forEach(function (f) { f(); }); });
    }

    /* ---------- Süreç: aşama okundukça küçük ürün gelişir (pin yok; tıklanarak da seçilir) ---------- */
    _flow() {
      var self = this, art = this.querySelector('.ap-art'), steps = [].slice.call(this.querySelectorAll('.ap-fs'));
      var nEl = this.querySelector('[data-flow-n]'), sEl = this.querySelector('[data-flow-s]'), cur = -1;
      var set = function (i) {
        if (i === cur) return; cur = i;
        art.setAttribute('data-s', i);
        for (var k = 1; k < 7; k++) art.classList.toggle('g' + k, i >= k);
        steps.forEach(function (s, k) { s.classList.toggle('is-on', k === i); s.classList.toggle('is-past', k < i); s.querySelector('button').setAttribute('aria-pressed', String(k === i)); });
        nEl.textContent = '0' + (i + 1) + ' / 07'; sEl.textContent = FLOW[i].s;
      };
      set(0);
      var lockY = null;
      steps.forEach(function (s, i) { self._ev(s.querySelector('button'), 'click', function () { set(i); lockY = scrollY; }); });
      // kaydırma konumu: okuma çizgisini (masaüstünde ekranın ortası, küçük ekranda tahtanın altı) geçen son aşama
      var raf = 0, small = matchMedia('(max-width:1024px)');
      var pick = function () {
        raf = 0; if (!self._on) return;
        if (lockY != null) { if (Math.abs(scrollY - lockY) < 120) return; lockY = null; }
        var line = small.matches ? innerHeight * .74 : innerHeight * .5, k = -1;
        steps.forEach(function (s, i) { if (s.getBoundingClientRect().top < line) k = i; });
        if (k >= 0) set(k);
        else if (steps[0].getBoundingClientRect().top > line) set(0);
      };
      var onScroll = function () { if (!raf) raf = requestAnimationFrame(pick); };
      addEventListener('scroll', onScroll, { passive: true });
      this._cleanups.push(function () { removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); });
    }

    /* ---------- Hareket: beş mikro etkileşim, hareket açık / kapalı ---------- */
    _motionDemo() {
      var self = this, mo = this.querySelector('.ap-mo'), sw = mo.querySelector('[data-motion]'), why = mo.querySelector('.ap-mo__why');
      var tabs = [].slice.call(mo.querySelectorAll('.ap-mo__tab')), scenes = [].slice.call(mo.querySelectorAll('.ap-ms'));
      var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches, motion = !reduced, curK = 'done', loadT = 0;
      var anim = function () { return motion && !!window.gsap; };
      var W = {}; MOS.forEach(function (m) { W[m.k] = m.w; });
      var text = function () { why.textContent = W[curK] + (motion ? '' : ' Hareket kapalı: sonuç aynı, ama değişimi fark etmek zorlaşır.'); };
      var setMotion = function (v) {
        motion = v; sw.setAttribute('aria-checked', String(v)); sw.querySelector('.ap-sw__v').textContent = v ? 'Açık' : 'Kapalı';
        mo.classList.toggle('is-still', !v); text();
      };
      setMotion(motion);
      this._ev(sw, 'click', function () { setMotion(!motion); });
      var reset = function (k) {
        var s = mo.querySelector('[data-ms="' + k + '"]');
        if (k === 'done') { var b = s.querySelector('[data-act="done"]'); b.disabled = false; s.classList.remove('is-done'); b.querySelector('.ap-ms__bt').textContent = 'Görevi tamamla'; s.querySelector('.ap-toast__in').hidden = true; }
        if (k === 'page') { s.querySelector('.ap-pg--list').hidden = false; s.querySelector('.ap-pg--detail').hidden = true; }
        if (k === 'load') { clearTimeout(loadT); s.querySelector('.ap-ld').setAttribute('data-state', 'idle'); s.querySelector('[data-act="load"] .ap-ms__bt').textContent = 'İçeriği yükle'; }
      };
      tabs.forEach(function (t) {
        self._ev(t, 'click', function () {
          var k = t.getAttribute('data-mo'); if (k === curK) return;
          reset(curK); curK = k;
          tabs.forEach(function (x) { x.setAttribute('aria-pressed', String(x === t)); });
          scenes.forEach(function (s) { s.hidden = s.getAttribute('data-ms') !== k; });
          text();
          if (anim()) window.gsap.fromTo(mo.querySelector('[data-ms="' + k + '"] .ap-ms__card'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .45, ease: 'power3.out', clearProps: 'transform,opacity' });
        });
      });
      this._ev(mo.querySelector('.ap-mo__stage'), 'click', function (e) {
        var b = e.target.closest('[data-act]'); if (!b) return;
        var a = b.getAttribute('data-act'), s = b.closest('.ap-ms'), g = window.gsap;
        if (a === 'done') {
          var w0 = b.offsetWidth; s.classList.add('is-done'); b.querySelector('.ap-ms__bt').textContent = 'Tamamlandı';
          var tin = s.querySelector('.ap-toast__in'); tin.hidden = false;
          if (anim()) {
            g.fromTo(b, { width: w0 }, { width: b.offsetWidth, duration: .45, ease: 'power3.inOut', clearProps: 'width' });
            g.fromTo(b.querySelector('.ap-ms__bi'), { scale: 0, rotation: -40 }, { scale: 1, rotation: 0, duration: .5, delay: .1, ease: 'back.out(2.6)', clearProps: 'transform' });
            g.fromTo(tin, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .5, delay: .2, ease: 'expo.out', clearProps: 'transform,opacity' });
          }
          b.disabled = true; tin.querySelector('button').focus();
        } else if (a === 'undo') {
          reset('done'); s.querySelector('[data-act="done"]').focus();
        } else if (a === 'open') {
          var list = s.querySelector('.ap-pg--list'), det = s.querySelector('.ap-pg--detail');
          det.querySelector('.ap-pg__title').textContent = b.querySelector('span').textContent;
          list.hidden = true; det.hidden = false; det.querySelector('[data-act="back"]').focus();
          if (anim()) { g.fromTo(det, { xPercent: 30, opacity: 0 }, { xPercent: 0, opacity: 1, duration: .5, ease: 'power3.out', clearProps: 'transform,opacity' }); g.fromTo(det.querySelector('.ap-pg__bar i'), { width: 0 }, { width: '50%', duration: .7, delay: .2, ease: 'power3.out' }); }
        } else if (a === 'back') {
          var l2 = s.querySelector('.ap-pg--list'), d2 = s.querySelector('.ap-pg--detail'), t = d2.querySelector('.ap-pg__title').textContent;
          d2.hidden = true; l2.hidden = false;
          var back = [].filter.call(l2.querySelectorAll('[data-act="open"]'), function (x) { return x.textContent === t; })[0]; if (back) back.focus();
          if (anim()) g.fromTo(l2, { xPercent: -16, opacity: 0 }, { xPercent: 0, opacity: 1, duration: .45, ease: 'power3.out', clearProps: 'transform,opacity' });
        } else if (a === 'toggle') {
          var v = b.getAttribute('aria-checked') !== 'true'; b.setAttribute('aria-checked', String(v)); b.querySelector('.ap-ms__sv').textContent = v ? 'Açık' : 'Kapalı';
          if (anim() && v) g.fromTo(b.querySelector('.ap-bell'), { rotation: 0 }, { keyframes: [{ rotation: 16, duration: .08 }, { rotation: -12, duration: .1 }, { rotation: 8, duration: .1 }, { rotation: 0, duration: .14 }], transformOrigin: '50% 10%', clearProps: 'transform' });
        } else if (a === 'save') {
          var sv = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', String(sv)); b.querySelector('span').textContent = sv ? 'Kaydedildi' : 'Kaydet';
          if (anim() && sv) g.fromTo(b.querySelector('.ap-markico'), { scale: 1.45 }, { scale: 1, duration: .5, ease: 'back.out(3)', clearProps: 'transform' });
        } else if (a === 'load') {
          var ld = s.querySelector('.ap-ld'); clearTimeout(loadT);
          ld.setAttribute('data-state', 'loading'); b.querySelector('.ap-ms__bt').textContent = 'Yükleniyor…'; b.disabled = true;
          loadT = setTimeout(function () {
            if (!self._on) return;
            ld.setAttribute('data-state', 'done'); b.disabled = false; b.querySelector('.ap-ms__bt').textContent = 'Yeniden yükle';
            if (anim()) g.fromTo(ld.querySelectorAll('li'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: .4, stagger: .08, ease: 'power2.out', clearProps: 'transform,opacity' });
          }, 900);
        }
      });
      this._cleanups.push(function () { clearTimeout(loadT); });
    }

    /* ---------- Gerçek hayat: bağlam seçilir, şema ve kararlar birlikte değişir ---------- */
    _life() {
      var self = this, stage = this.querySelector('.ap-life__stage'), bs = [].slice.call(this.querySelectorAll('.ap-ctx__b'));
      var dds = [].slice.call(this.querySelectorAll('[data-dec]')), liveEl = this.querySelector('[data-life-live]');
      bs.forEach(function (b) {
        self._ev(b, 'click', function () {
          var k = b.getAttribute('data-ctx'); if (stage.getAttribute('data-ctx') === k) return;
          bs.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
          stage.setAttribute('data-ctx', k);
          dds.forEach(function (d, i) { d.textContent = LIFE[k].rows[i]; });
          liveEl.textContent = LIFE[k].t + ', ' + LIFE[k].s.toLocaleLowerCase('tr') + ': ' + LIFE[k].rows.join('; ') + '.';
          var g = window.gsap;
          if (g && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
            g.fromTo(dds, { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: .45, stagger: .06, ease: 'power2.out', clearProps: 'transform,opacity' });
            var grp = stage.querySelector('[data-g="' + k + '"]');
            g.fromTo(grp.querySelectorAll('.ap-dia__blk, .ap-dia__nav'), { opacity: 0, scale: .9, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: .5, stagger: .04, delay: .15, ease: 'power3.out', clearProps: 'transform,opacity' });
          }
        });
      });
    }

    /* ---------- Final: sorudan birincil düğmeye inen çizgi (masaüstü) ---------- */
    _finLine() {
      var self = this, fin = this.querySelector('.ap-fin'), svg = fin.querySelector('.ap-fin__line'), path = svg.querySelector('path');
      var q = fin.querySelector('.ap-fin__q'), cta = fin.querySelector('.ap-fin__cta .ap-btn'), wrap = fin.querySelector('.ap-wrap');
      var draw = function () {
        if (!self._on) return;
        var W = wrap.getBoundingClientRect(), a = q.getBoundingClientRect(), b = cta.getBoundingClientRect();
        if (!W.width) return;
        svg.setAttribute('viewBox', '0 0 ' + Math.round(W.width) + ' ' + Math.round(W.height));
        var sx = a.left + a.width * .42 - W.left, sy = a.bottom - W.top + 8, ex = b.left - W.left - 16, ey = b.top + b.height / 2 - W.top;
        if (ex - sx < 40) { sx = ex - 40; }
        path.setAttribute('d', 'M' + sx.toFixed(1) + ' ' + sy.toFixed(1) + ' C ' + (sx - 10).toFixed(1) + ' ' + (sy + (ey - sy) * .75).toFixed(1) + ', ' + (ex - (ex - sx) * .55).toFixed(1) + ' ' + ey.toFixed(1) + ', ' + ex.toFixed(1) + ' ' + ey.toFixed(1));
      };
      this._finDraw = draw;
      if ('ResizeObserver' in window) { var ro = new ResizeObserver(function () { draw(); }); ro.observe(wrap); this._cleanups.push(function () { ro.disconnect(); }); }
      draw();
    }

    /* ---------- Interactive App Lab: üç görünüm, tek ortak durum (temsili veri, sunucu yok) ---------- */
    _lab() {
      var self = this, root = this.querySelector('.ap-lab'), sim = root.querySelector('.ap-sim'), dev = sim.querySelector('.ap-dev');
      var live = root.querySelector('[data-live]'), tabs = [].slice.call(root.querySelectorAll('.ap-view'));
      var S;
      var fresh = function () {
        S = { data: seed(), view: S ? S.view : 'mobile',
          m: { screen: 'list', filter: 'all', sel: null, showDone: false, compact: false },
          w: { nav: 'projects', q: '', st: 'all', type: 'all', sel: 'p1', pane: 'list', all: false },
          d: { mode: 'board', type: 'all', col: 'progress' } };
      };
      fresh();
      var still = function () { return !window.gsap || matchMedia('(prefers-reduced-motion: reduce)').matches; };
      var say = function (t) { live.textContent = ''; setTimeout(function () { live.textContent = t; }, 30); };
      var P = function (id) { return S.data.filter(function (p) { return p.id === id; })[0]; };

      /* güvenli DOM: veriler yalnızca textContent ile yazılır; html yalnızca sabit ikonlar için */
      function el(t, a, kids) {
        var e = document.createElement(t);
        if (a) Object.keys(a).forEach(function (k) {
          var v = a[k]; if (v == null || v === false) return;
          if (k === 'class') e.className = v; else if (k === 'text') e.textContent = v; else if (k === 'icon') e.insertAdjacentHTML('afterbegin', v);
          else e.setAttribute(k, v === true ? '' : v);
        });
        (kids || []).forEach(function (c) { if (c != null) e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
        return e;
      }
      function badge(st) { return el('span', { class: 'ap-st ap-st--' + st }, [el('i', { 'aria-hidden': 'true' }), ST_NAME[st]]); }
      function bar(p, key) { var v = prog(p); return el('span', { class: 'ap-bar', 'data-flip-w': key || null }, [el('i', { style: 'width:' + v + '%' })]); }
      function statusSeg(p, scope) {
        return el('div', { class: 'ap-seg', role: 'group', 'aria-label': 'Durum' }, ST_ORDER.map(function (s) {
          return el('button', { type: 'button', class: 'ap-seg__b', 'data-a': 'status', 'data-id': p.id, 'data-v': s, 'data-fk': scope + '-st-' + s, 'aria-pressed': String(p.status === s) }, [ST_NAME[s]]);
        }));
      }
      function tasks(p, scope, hideDone) {
        var list = p.tasks.filter(function (t) { return !(hideDone && t.d); });
        if (!list.length) return el('p', { class: 'ap-empty', text: 'Açık görev kalmadı.' });
        return el('ul', { class: 'ap-tasks' }, list.map(function (t) {
          var id = scope + '-' + t.id;
          return el('li', { class: 'ap-task' + (t.d ? ' is-done' : ''), 'data-flip': id }, [
            el('input', { type: 'checkbox', id: 'ap-' + id, class: 'ap-task__in', 'data-a': 'task', 'data-id': p.id, 'data-t': t.id, 'data-fk': id, checked: t.d }),
            el('label', { for: 'ap-' + id, class: 'ap-task__l' }, [el('span', { class: 'ap-task__box', icon: I2.check, 'aria-hidden': 'true' }), el('span', { class: 'ap-task__t', text: t.t })])
          ]);
        }));
      }
      function detail(p, scope, back) {
        var n = p.tasks.length, d = p.tasks.filter(function (t) { return t.d; }).length;
        return el('div', { class: 'ap-det' }, [
          back ? el('button', { type: 'button', class: 'ap-back', 'data-a': 'back', 'data-fk': scope + '-back', icon: I2.back }, [el('span', { text: back })]) : null,
          el('p', { class: 'ap-det__meta' }, [p.type + ' · Teslim ' + p.due]),
          el('h4', { class: 'ap-det__t', 'data-flip': 'title-' + p.id, text: p.name }),
          badge(p.status),
          el('div', { class: 'ap-det__prog' }, [bar(p, scope + '-bar'), el('span', { text: '%' + prog(p) + ' · ' + d + '/' + n + ' görev' })]),
          el('p', { class: 'ap-det__h', text: 'Durumu değiştir' }), statusSeg(p, scope),
          el('p', { class: 'ap-det__h', text: 'Görevler' }), tasks(p, scope, false)
        ]);
      }
      function chips(name, cur, opts, label) {
        return el('div', { class: 'ap-chips', role: 'group', 'aria-label': label }, opts.map(function (o) {
          return el('button', { type: 'button', class: 'ap-chip', 'data-a': name, 'data-v': o[0], 'data-fk': name + '-' + o[0], 'aria-pressed': String(cur === o[0]) }, [o[1]]);
        }));
      }
      function row(p, scope, sel) {
        return el('li', { 'data-flip': scope + '-' + p.id }, [el('button', { type: 'button', class: 'ap-row' + (sel ? ' is-sel' : ''), 'data-a': 'open', 'data-id': p.id, 'data-fk': scope + '-open-' + p.id, 'aria-current': sel ? 'true' : null }, [
          el('span', { class: 'ap-row__t', 'data-flip': scope === 'm' ? 'title-' + p.id : null, text: p.name }),
          el('span', { class: 'ap-row__m' }, [badge(p.status), el('span', { class: 'ap-row__due', text: p.due })]),
          bar(p, scope + '-row-' + p.id),
          el('span', { class: 'ap-row__chev', icon: I2.chev, 'aria-hidden': 'true' })
        ])]);
      }

      /* ---- Mobile App ---- */
      function mobile() {
        var m = S.m, nav = [['list', 'Projeler', I2.folder], ['tasks', 'Görevler', I2.list], ['settings', 'Ayarlar', I2.gear]];
        var body;
        if (m.screen === 'detail' && P(m.sel)) {
          body = el('div', { class: 'ap-m__scr ap-m__scr--detail', 'data-scr': 'detail' }, [detail(P(m.sel), 'm', 'Projeler')]);
        } else if (m.screen === 'tasks') {
          var open = [];
          S.data.forEach(function (p) { p.tasks.forEach(function (t) { if (m.showDone || !t.d) open.push([p, t]); }); });
          body = el('div', { class: 'ap-m__scr', 'data-scr': 'tasks' }, [
            el('div', { class: 'ap-m__head' }, [el('h4', { class: 'ap-m__t', text: 'Görevler' }), el('p', { class: 'ap-m__c', text: S.data.reduce(function (a, p) { return a + p.tasks.filter(function (t) { return !t.d; }).length; }, 0) + ' açık görev' })]),
            open.length ? el('ul', { class: 'ap-tasks ap-tasks--all' }, open.map(function (x) {
              var id = 'mt-' + x[1].id;
              return el('li', { class: 'ap-task' + (x[1].d ? ' is-done' : ''), 'data-flip': id }, [
                el('input', { type: 'checkbox', id: 'ap-' + id, class: 'ap-task__in', 'data-a': 'task', 'data-id': x[0].id, 'data-t': x[1].id, 'data-fk': id, checked: x[1].d }),
                el('label', { for: 'ap-' + id, class: 'ap-task__l' }, [el('span', { class: 'ap-task__box', icon: I2.check, 'aria-hidden': 'true' }), el('span', { class: 'ap-task__t' }, [x[1].t, el('small', { text: x[0].name })])])
              ]);
            })) : el('p', { class: 'ap-empty', text: 'Bütün görevler tamamlandı.' })
          ]);
        } else if (m.screen === 'settings') {
          var sw = function (k, t, s) {
            return el('button', { type: 'button', class: 'ap-set', role: 'switch', 'aria-checked': String(!!m[k]), 'data-a': 'set', 'data-v': k, 'data-fk': 'set-' + k }, [
              el('span', { class: 'ap-set__t' }, [t, el('small', { text: s })]), el('span', { class: 'ap-sw__t', 'aria-hidden': 'true' }, [el('i')])]);
          };
          body = el('div', { class: 'ap-m__scr', 'data-scr': 'settings' }, [
            el('div', { class: 'ap-m__head' }, [el('h4', { class: 'ap-m__t', text: 'Ayarlar' })]),
            sw('showDone', 'Tamamlanan görevleri göster', 'Görevler ekranında'), sw('compact', 'Sıkı liste', 'Projeler ekranında daha az boşluk'),
            el('p', { class: 'ap-empty', text: 'Ayarlar yalnızca bu demo içinde geçerlidir.' })
          ]);
        } else {
          var f = m.filter, list = S.data.filter(function (p) { return f === 'all' || (f === 'done' ? p.status === 'done' : p.status !== 'done'); });
          body = el('div', { class: 'ap-m__scr' + (m.compact ? ' is-compact' : ''), 'data-scr': 'list' }, [
            el('div', { class: 'ap-m__head' }, [el('h4', { class: 'ap-m__t', text: 'Projeler' }), el('p', { class: 'ap-m__c', text: list.length + ' proje' }),
              chips('m-filter', f, [['all', 'Tümü'], ['active', 'Aktif'], ['done', 'Tamamlanan']], 'Projeleri süz')]),
            el('ul', { class: 'ap-rows' }, list.map(function (p) { return row(p, 'm', false); }))
          ]);
        }
        var cur = m.screen === 'detail' ? 'list' : m.screen;
        return el('div', { class: 'ap-app ap-app--m' }, [
          el('div', { class: 'ap-m__status', 'aria-hidden': 'true' }, [el('span', { text: 'Atölye' }), el('span', { class: 'ap-m__pill' })]),
          el('div', { class: 'ap-m__view' }, [body]),
          el('nav', { class: 'ap-m__nav', 'aria-label': 'Uygulama menüsü' }, nav.map(function (n) {
            return el('button', { type: 'button', class: 'ap-m__nb', 'data-a': 'm-tab', 'data-v': n[0], 'data-fk': 'mtab-' + n[0], 'aria-current': cur === n[0] ? 'page' : null, icon: n[2] }, [el('span', { text: n[1] })]);
          }))
        ]);
      }

      /* ---- Web App ---- */
      function web() {
        var w = S.w;
        var list = S.data.filter(function (p) {
          return (w.st === 'all' || p.status === w.st) && (w.type === 'all' || p.type === w.type) && (!w.q || p.name.toLocaleLowerCase('tr').indexOf(w.q.toLocaleLowerCase('tr')) > -1);
        });
        var side = el('nav', { class: 'ap-w__side', 'aria-label': 'Web uygulaması menüsü' }, [
          el('p', { class: 'ap-w__brand', text: 'Atölye' }),
          el('button', { type: 'button', class: 'ap-w__nb', 'data-a': 'w-nav', 'data-v': 'projects', 'data-fk': 'wnav-p', 'aria-current': w.nav === 'projects' ? 'page' : null, icon: I2.folder }, [el('span', { text: 'Projeler' }), el('em', { text: String(S.data.length) })]),
          el('button', { type: 'button', class: 'ap-w__nb', 'data-a': 'w-nav', 'data-v': 'tasks', 'data-fk': 'wnav-t', 'aria-current': w.nav === 'tasks' ? 'page' : null, icon: I2.list }, [el('span', { text: 'Görevler' }), el('em', { text: String(S.data.reduce(function (a, p) { return a + p.tasks.filter(function (t) { return !t.d; }).length; }, 0)) })])
        ]);
        var main;
        if (w.nav === 'tasks') {
          var rows = [];
          S.data.forEach(function (p) { p.tasks.forEach(function (t) { if (w.all || !t.d) rows.push([p, t]); }); });
          main = el('div', { class: 'ap-w__main ap-w__main--tasks' }, [
            el('div', { class: 'ap-w__bar' }, [el('h4', { class: 'ap-w__t', text: 'Görevler' }), chips('w-all', w.all ? 'all' : 'open', [['open', 'Açık'], ['all', 'Tümü']], 'Görevleri süz')]),
            el('ul', { class: 'ap-tasks ap-tasks--table' }, rows.map(function (x) {
              var id = 'wt-' + x[1].id;
              return el('li', { class: 'ap-task' + (x[1].d ? ' is-done' : ''), 'data-flip': id }, [
                el('input', { type: 'checkbox', id: 'ap-' + id, class: 'ap-task__in', 'data-a': 'task', 'data-id': x[0].id, 'data-t': x[1].id, 'data-fk': id, checked: x[1].d }),
                el('label', { for: 'ap-' + id, class: 'ap-task__l' }, [el('span', { class: 'ap-task__box', icon: I2.check, 'aria-hidden': 'true' }), el('span', { class: 'ap-task__t', text: x[1].t })]),
                el('span', { class: 'ap-task__p', text: x[0].name }), badge(x[0].status)
              ]);
            }))
          ]);
        } else {
          var sel = P(w.sel);
          main = el('div', { class: 'ap-w__main', 'data-pane': w.pane }, [
            el('div', { class: 'ap-w__list' }, [
              el('div', { class: 'ap-w__bar' }, [el('h4', { class: 'ap-w__t', text: 'Projeler' }), el('span', { class: 'ap-w__c', text: list.length + ' / ' + S.data.length })]),
              el('label', { class: 'ap-search', for: 'ap-wq', icon: I2.search }, [el('span', { class: 'ap-sr', text: 'Projelerde ara' }),
                el('input', { id: 'ap-wq', type: 'search', class: 'ap-search__in', placeholder: 'Projelerde ara', value: w.q, 'data-a': 'w-q', 'data-fk': 'wq', autocomplete: 'off' })]),
              el('div', { class: 'ap-w__filters' }, [
                el('label', { class: 'ap-sel' }, [el('span', { text: 'Durum' }), el('select', { 'data-a': 'w-st', 'data-fk': 'wst' }, [['all', 'Tümü']].concat(ST_ORDER.map(function (s) { return [s, ST_NAME[s]]; })).map(function (o) { return el('option', { value: o[0], selected: w.st === o[0] }, [o[1]]); }))]),
                chips('w-type', w.type, [['all', 'Tümü']].concat(TYPES.map(function (t) { return [t, t]; })), 'Türe göre süz')
              ]),
              list.length ? el('ul', { class: 'ap-rows' }, list.map(function (p) { return row(p, 'w', p.id === w.sel); }))
                : el('div', { class: 'ap-empty' }, [el('p', { text: w.q ? '“' + w.q + '” için proje bulunamadı.' : 'Bu filtrelerle proje yok.' }), el('button', { type: 'button', class: 'ap-link', 'data-a': 'w-clear', 'data-fk': 'wclear', text: 'Filtreleri temizle' })])
            ]),
            el('div', { class: 'ap-w__detail' }, [sel ? detail(sel, 'w', 'Liste') : el('p', { class: 'ap-empty', text: 'Bir proje seçin.' })])
          ]);
        }
        return el('div', { class: 'ap-app ap-app--w' }, [
          el('div', { class: 'ap-w__top', 'aria-hidden': 'true' }, [el('i'), el('i'), el('i'), el('span', { text: 'Temsili web uygulaması' })]),
          el('div', { class: 'ap-w__in' }, [side, main])
        ]);
      }

      /* ---- Dashboard ---- */
      function dash() {
        var d = S.d, data = S.data.filter(function (p) { return d.type === 'all' || p.type === d.type; });
        var tiles = el('div', { class: 'ap-d__tiles', role: 'group', 'aria-label': 'Durum özeti' }, ST_ORDER.map(function (s) {
          var n = data.filter(function (p) { return p.status === s; }).length;
          return el('button', { type: 'button', class: 'ap-tile ap-tile--' + s, 'data-a': 'd-col', 'data-v': s, 'data-fk': 'dcol-' + s, 'aria-pressed': String(d.col === s) }, [
            el('span', { class: 'ap-tile__n', text: String(n) }), el('span', { class: 'ap-tile__k' }, [badge(s)])]);
        }));
        var view;
        if (d.mode === 'progress') {
          var sorted = data.slice().sort(function (a, b) { return prog(b) - prog(a); });
          view = el('ul', { class: 'ap-d__prog' }, sorted.map(function (p) {
            return el('li', { 'data-flip': 'dp-' + p.id }, [el('span', { class: 'ap-d__pn', text: p.name }), bar(p, 'dp-' + p.id), el('span', { class: 'ap-d__pv', text: '%' + prog(p) })]);
          }));
        } else {
          view = el('div', { class: 'ap-d__board' }, ST_ORDER.map(function (s) {
            var cards = data.filter(function (p) { return p.status === s; });
            return el('section', { class: 'ap-col' + (d.col === s ? ' is-col' : ''), 'aria-label': ST_NAME[s] }, [
              el('h5', { class: 'ap-col__h' }, [badge(s), el('span', { text: String(cards.length) })]),
              el('ul', { class: 'ap-col__l' }, cards.map(function (p) {
                var ni = ST_ORDER.indexOf(p.status) + 1;
                return el('li', { class: 'ap-card', 'data-flip': 'dc-' + p.id }, [
                  el('p', { class: 'ap-card__t', text: p.name }), el('p', { class: 'ap-card__m', text: p.type + ' · ' + p.due }), bar(p, 'dc-b-' + p.id),
                  el('div', { class: 'ap-card__a' }, [
                    el('button', { type: 'button', class: 'ap-link', 'data-a': 'd-open', 'data-id': p.id, 'data-fk': 'dopen-' + p.id }, ['Detay', el('span', { class: 'ap-sr', text: ': ' + p.name })]),
                    ni < ST_ORDER.length ? el('button', { type: 'button', class: 'ap-adv', 'data-a': 'advance', 'data-id': p.id, 'data-fk': 'adv-' + p.id, icon: I2.next, 'aria-label': p.name + ': ' + ST_NAME[ST_ORDER[ni]] + ' aşamasına taşı', title: ST_NAME[ST_ORDER[ni]] + ' aşamasına taşı' }) : null
                  ])
                ]);
              }).concat(cards.length ? [] : [el('li', { class: 'ap-col__e', text: 'Proje yok' })]))
            ]);
          }));
        }
        return el('div', { class: 'ap-app ap-app--d' }, [
          el('div', { class: 'ap-d__top' }, [
            el('div', null, [el('h4', { class: 'ap-w__t', text: 'Genel bakış' }), el('p', { class: 'ap-d__s', text: 'Sayılar bu demodaki örnek veriden hesaplanır.' })]),
            el('div', { class: 'ap-d__ctl' }, [
              chips('d-type', d.type, [['all', 'Tümü']].concat(TYPES.map(function (t) { return [t, t]; })), 'Türe göre süz'),
              el('div', { class: 'ap-modes', role: 'group', 'aria-label': 'Görünüm' }, [['board', 'Pano', I2.board], ['progress', 'İlerleme', I2.bars]].map(function (o) {
                return el('button', { type: 'button', class: 'ap-mode', 'data-a': 'd-mode', 'data-v': o[0], 'data-fk': 'dmode-' + o[0], 'aria-pressed': String(d.mode === o[0]), icon: o[2] }, [el('span', { text: o[1] })]);
              }))
            ])
          ]),
          tiles, view
        ]);
      }

      /* ---- Çizim + geçişler ---- */
      var render = function (fx) {
        fx = fx || {};
        var g = window.gsap, anim = !still();
        var before = {}, widths = {};
        if (anim) {
          [].forEach.call(dev.querySelectorAll('[data-flip]'), function (n) { before[n.getAttribute('data-flip')] = n.getBoundingClientRect(); });
          [].forEach.call(dev.querySelectorAll('[data-flip-w]'), function (n) { widths[n.getAttribute('data-flip-w')] = n.firstChild.style.width; });
        }
        var fk = document.activeElement && dev.contains(document.activeElement) ? document.activeElement.getAttribute('data-fk') : null;
        var caret = fk === 'wq' ? document.activeElement.selectionStart : null;
        var app = S.view === 'web' ? web() : S.view === 'dash' ? dash() : mobile();
        dev.replaceChildren(app);
        sim.setAttribute('data-view', S.view);
        if (fx.focus) fk = fx.focus;
        if (fk) { var f = dev.querySelector('[data-fk="' + fk + '"]'); if (f) { f.focus({ preventScroll: true }); if (caret != null && f.setSelectionRange) f.setSelectionRange(caret, caret); } }
        if (!anim) return;
        [].forEach.call(dev.querySelectorAll('[data-flip-w]'), function (n) {
          var o = widths[n.getAttribute('data-flip-w')], i = n.firstChild;
          if (o != null && o !== i.style.width) g.fromTo(i, { width: o }, { width: i.style.width, duration: .6, ease: 'power3.out' });
        });
        if (fx.slide) {
          var scr = dev.querySelector('.ap-m__scr, .ap-w__main');
          if (scr) g.fromTo(scr, { xPercent: fx.slide > 0 ? 26 : -14, opacity: 0 }, { xPercent: 0, opacity: 1, duration: .5, ease: 'power3.out', clearProps: 'transform,opacity' });
        }
        [].forEach.call(dev.querySelectorAll('[data-flip]'), function (n) {
          var k = n.getAttribute('data-flip'), a = before[k];
          if (fx.slide && !/^title-/.test(k)) return;
          var b = n.getBoundingClientRect();
          if (!a) { if (!fx.slide && !fx.noEnter) g.fromTo(n, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: .4, ease: 'power2.out', delay: .05, clearProps: 'transform,opacity' }); return; }
          var dx = a.left - b.left, dy = a.top - b.top;
          if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
          g.fromTo(n, { x: dx, y: dy }, { x: 0, y: 0, duration: fx.slow ? .75 : .5, ease: 'power3.inOut', clearProps: 'transform' });
        });
        if (fx.pulse) { var pz = dev.querySelector(fx.pulse); if (pz) g.fromTo(pz, { scale: .86 }, { scale: 1, duration: .5, ease: 'back.out(3)', clearProps: 'transform' }); }
      };
      this._labRender = render;

      var setView = function (v, focusTab) {
        if (v === S.view) return;
        var g = window.gsap, anim = !still(), r0 = dev.getBoundingClientRect();
        S.view = v;
        tabs.forEach(function (t) { var on = t.getAttribute('data-view') === v; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; if (on) sim.setAttribute('aria-labelledby', t.id); });
        render({ noEnter: true });
        if (focusTab) focusTab.focus();
        say({ mobile: 'Mobil uygulama görünümü', web: 'Web uygulaması görünümü', dash: 'Yönetim paneli görünümü' }[v] + ' açıldı. Aynı örnek veri kullanılıyor.');
        if (!anim) return;
        var r1 = dev.getBoundingClientRect();
        g.fromTo(dev, { width: r0.width, height: r0.height }, { width: r1.width, height: r1.height, duration: .7, ease: 'expo.inOut', clearProps: 'width,height' });
        g.fromTo(dev.firstChild, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .55, delay: .3, ease: 'power3.out', clearProps: 'transform,opacity' });
        g.fromTo(sim.querySelector('.ap-sim__corners'), { scale: .97, opacity: .2 }, { scale: 1, opacity: 1, duration: .7, ease: 'expo.out', clearProps: 'transform,opacity' });
      };
      tabs.forEach(function (t, i) {
        self._ev(t, 'click', function () { setView(t.getAttribute('data-view')); });
        self._ev(t, 'keydown', function (e) {
          var k = e.key, n = k === 'ArrowRight' || k === 'ArrowDown' ? i + 1 : k === 'ArrowLeft' || k === 'ArrowUp' ? i - 1 : k === 'Home' ? 0 : k === 'End' ? tabs.length - 1 : null;
          if (n == null) return; e.preventDefault(); n = (n + tabs.length) % tabs.length; setView(tabs[n].getAttribute('data-view'), tabs[n]);
        });
      });
      this._ev(root.querySelector('.ap-reset'), 'click', function () { fresh(); render({ noEnter: true }); say('Demo başlangıç durumuna döndü.'); });

      var act = function (a, n) {
        var id = n.getAttribute('data-id'), v = n.getAttribute('data-v'), p = id && P(id);
        switch (a) {
          case 'm-tab': S.m.screen = v; render({ slide: v === 'list' ? -1 : 1, focus: 'mtab-' + v }); break;
          case 'm-filter': S.m.filter = v; render(); break;
          case 'open':
            if (S.view === 'web') { var dd = dev.querySelector('.ap-w__detail'), nar = !!dd && getComputedStyle(dd).display === 'none'; S.w.sel = id; S.w.pane = 'detail'; render({ slide: nar ? 1 : 0, focus: nar ? 'w-back' : 'w-open-' + id }); }
            else { S.m.sel = id; S.m.screen = 'detail'; render({ slide: 1, focus: 'm-back' }); }
            say(p.name + ' açıldı.'); break;
          case 'back':
            if (S.view === 'web') { S.w.pane = 'list'; render({ slide: -1, focus: 'w-open-' + S.w.sel }); }
            else { S.m.screen = 'list'; render({ slide: -1, focus: 'm-open-' + S.m.sel }); }
            break;
          case 'status': if (p.status !== v) { p.status = v; render({ pulse: '.ap-det .ap-st' }); say(p.name + ': ' + ST_NAME[v] + ' olarak güncellendi.'); } break;
          case 'set': S.m[v] = !S.m[v]; render(); break;
          case 'w-nav': S.w.nav = v; S.w.pane = 'list'; render({ slide: v === 'tasks' ? 1 : -1, focus: v === 'tasks' ? 'wnav-t' : 'wnav-p' }); break;
          case 'w-type': S.w.type = v; render(); break;
          case 'w-all': S.w.all = v === 'all'; render(); break;
          case 'w-clear': S.w.q = ''; S.w.st = 'all'; S.w.type = 'all'; render({ focus: 'wq' }); say('Filtreler temizlendi.'); break;
          case 'd-type': S.d.type = v; render(); break;
          case 'd-mode': S.d.mode = v; render({ noEnter: false }); break;
          case 'd-col': S.d.col = v; render(); break;
          case 'd-open': S.w.sel = id; S.w.nav = 'projects'; S.w.pane = 'detail'; S.w.q = ''; S.w.st = 'all'; S.w.type = 'all'; setView('web'); say(p.name + ' web uygulamasında açıldı.'); break;
          case 'advance':
            var ni = ST_ORDER.indexOf(p.status) + 1; if (ni >= ST_ORDER.length) break;
            p.status = ST_ORDER[ni]; S.d.col = p.status;
            render({ slow: true, focus: dev.querySelector('[data-fk="adv-' + id + '"]') && ni + 1 < ST_ORDER.length ? 'adv-' + id : 'dopen-' + id });
            say(p.name + ' ' + ST_NAME[p.status] + ' sütununa taşındı.'); break;
        }
      };
      this._ev(dev, 'click', function (e) {
        var n = e.target.closest('[data-a]'); if (!n || !dev.contains(n) || n.tagName === 'INPUT' || n.tagName === 'SELECT') return;
        act(n.getAttribute('data-a'), n);
      });
      this._ev(dev, 'change', function (e) {
        var n = e.target, a = n.getAttribute('data-a');
        if (a === 'task') {
          var p = P(n.getAttribute('data-id')), t = p.tasks.filter(function (x) { return x.id === n.getAttribute('data-t'); })[0];
          t.d = n.checked; render({ noEnter: true });
          say(t.t + (t.d ? ' tamamlandı. ' : ' yeniden açıldı. ') + p.name + ' %' + prog(p) + '.');
        } else if (a === 'w-st') { S.w.st = n.value; render(); }
      });
      this._ev(dev, 'input', function (e) { if (e.target.getAttribute('data-a') === 'w-q') { S.w.q = e.target.value.slice(0, 60); render(); } });
      render({ noEnter: true });
    }
    /* ---------- Hareket ---------- */
    _animate() {
      var gsap = window.gsap, STg = window.ScrollTrigger, self = this;
      if (!gsap) return;
      if (STg) gsap.registerPlugin(STg);
      var q = function (s, r) { return [].slice.call((r || self).querySelectorAll(s)); };
      var one = function (s, r) { return (r || self).querySelector(s); };
      var once = function (el, start) { return { trigger: el, start: start || 'top 84%', once: true }; };
      var lines = function (h) { return q('.ap-ln>span', h); };
      var draw = function (els, opt) {
        els.forEach(function (e) { var L = e.getTotalLength ? Math.ceil(e.getTotalLength()) : 0; if (!L) return; gsap.set(e, { strokeDasharray: L, strokeDashoffset: L }); });
        return gsap.to(els, Object.assign({ strokeDashoffset: 0, duration: 1, ease: 'power2.inOut', onComplete: function () { gsap.set(els, { clearProps: 'strokeDasharray,strokeDashoffset' }); } }, opt));
      };
      var hero = one('.ap-hero'), scr = one('.ap-hero__screen'), frame = one('.ap-hero__frame'), fills = q('.ap-fill');

      this._ctx = gsap.context(function () {
        var mm = gsap.matchMedia();

        /* 01 Hero — küçük bir ekran çerçevesi; başlık konturdan dolguya geçer, ekran çerçeveden taşar */
        mm.add({ big: '(prefers-reduced-motion: no-preference) and (min-width: 768px)', small: '(prefers-reduced-motion: no-preference) and (max-width: 767px)' }, function (c) {
          var big = c.conditions.big;
          var tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
          tl.from(q('.ap-kick span'), { opacity: 0, y: 8, duration: .7, stagger: .08 }, 0)
            .fromTo(scr, { clipPath: big ? 'inset(16% 24% 16% 24% round 14px)' : 'inset(12% 10% 12% 10% round 14px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1.5, ease: 'expo.inOut' }, 1.05)
            .fromTo(fills, { backgroundPosition: '100% 0' }, { backgroundPosition: '0% 0', duration: 1.15, stagger: .2, ease: 'power3.inOut' }, .3)
            .from(lines(one('.ap-hero__sub')), { yPercent: 140, duration: 1.1, stagger: .1, ease: 'power4.out' }, 1.6)
            .from(one('.ap-hero__side'), { opacity: 0, y: 14, duration: .9 }, 1.8);
          if (big) {
            tl.fromTo(frame, { opacity: 0, scale: .92 }, { opacity: 1, scale: 1, duration: .7 }, .15)
              .to(frame, { scaleX: 1.92, scaleY: 1.47, opacity: 0, duration: 1.5, ease: 'expo.inOut' }, 1.05);
            if (STg && matchMedia('(min-width: 1025px)').matches) {
              gsap.to(one('.ap-hero__vid video'), { scale: 1.08, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: .5 } });
              gsap.to(one('.ap-hero__copy'), { y: -70, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: .5 } });
            }
          }
          return function () { gsap.set([scr, frame].concat(fills), { clearProps: 'all' }); };
        });

        if (!STg) return;

        /* 02 İnsan — görsel yüzden başlayan bir daireyle açılır; cümle okundukça aydınlanır */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          var h = one('#ap-exp-t'), mob = matchMedia('(max-width: 767px)').matches;
          gsap.from(lines(h), { yPercent: 140, duration: 1.1, stagger: .09, ease: 'power4.out', scrollTrigger: once(h) });
          gsap.from(one('.ap-exp__side'), { opacity: 0, y: 16, duration: 1, ease: 'expo.out', scrollTrigger: once(one('.ap-exp__side')) });
          var fr = one('.ap-exp__frame');
          gsap.fromTo(fr, { clipPath: 'circle(7% at ' + (mob ? '30% 38%' : '28% 46%') + ')' }, { clipPath: 'circle(140% at ' + (mob ? '30% 38%' : '28% 46%') + ')', duration: 1.8, ease: 'expo.inOut', scrollTrigger: once(fr, 'top 78%') });
          gsap.fromTo(one('.ap-exp__img'), { scale: 1.18 }, { scale: 1, duration: 2.2, ease: 'expo.out', scrollTrigger: once(fr, 'top 78%') });
          var sent = one('.ap-sent');
          gsap.from(q('.ap-w', sent), { color: 'rgba(236,235,229,.16)', stagger: .1, ease: 'none', scrollTrigger: { trigger: sent, start: 'top 82%', end: 'bottom 52%', scrub: .4 } });
          gsap.from(q('.ap-q'), { opacity: 0, y: 14, duration: .9, stagger: .07, ease: 'expo.out', scrollTrigger: once(one('.ap-qs')) });
        });

        /* 03 App Lab — satırlar soldan kayar, simülatör çerçevesi yerine oturur */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          var h = one('#ap-lab-t');
          gsap.from(lines(h), { xPercent: -14, opacity: 0, duration: 1.1, stagger: .1, ease: 'expo.out', scrollTrigger: once(h) });
          gsap.from(one('.ap-lab__intro'), { opacity: 0, y: 16, duration: 1, ease: 'expo.out', scrollTrigger: once(one('.ap-lab__intro')) });
          gsap.from(q('.ap-view'), { opacity: 0, y: 18, duration: .8, stagger: .08, ease: 'expo.out', scrollTrigger: once(one('.ap-views')) });
          var sim = one('.ap-sim');
          gsap.from(one('.ap-sim__corners'), { scale: 1.06, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: once(sim, 'top 80%') });
          gsap.from(one('.ap-dev'), { y: 50, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: once(sim, 'top 80%') });
        });

        /* 04 Ne yapıyoruz — iki cümle karşı yönlerden gelir; dizin ve sahne */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          var h = one('#ap-build-t');
          gsap.from(lines(one('.ap-build__a')), { xPercent: -10, opacity: 0, duration: 1.2, stagger: .1, ease: 'expo.out', scrollTrigger: once(h) });
          gsap.from(lines(one('.ap-build__b')), { xPercent: 10, opacity: 0, duration: 1.2, stagger: .1, delay: .15, ease: 'expo.out', scrollTrigger: once(h) });
          if (matchMedia('(min-width: 1025px)').matches) {
            var sv = one('.ap-svcs');
            gsap.from(q('.ap-svc__h'), { x: -40, opacity: 0, duration: 1, stagger: .08, ease: 'expo.out', scrollTrigger: once(sv, 'top 78%') });
            gsap.from(one('.ap-svcs__frame'), { scale: .94, opacity: 0, duration: 1.3, ease: 'expo.out', scrollTrigger: once(sv, 'top 78%') });
            gsap.fromTo(one('.ap-svc.is-on .ap-svc__media'), { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'expo.inOut', clearProps: 'clipPath', scrollTrigger: once(sv, 'top 78%') });
          } else {
            q('.ap-svc__media').forEach(function (m) {
              gsap.fromTo(m, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'expo.inOut', clearProps: 'clipPath', scrollTrigger: once(m, 'top 88%') });
            });
          }
        });

        /* 05 Süreç — başlık satırları silinerek yazılır; tahta yerine oturur */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          var h = one('#ap-flow-t');
          gsap.fromTo(lines(h), { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, stagger: .14, ease: 'power3.inOut', clearProps: 'clipPath', scrollTrigger: once(h) });
          gsap.from(one('.ap-art'), { y: 40, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: once(one('.ap-flow__board'), 'top 82%') });
        });

        /* 06 Hareket — başlık hafif bir dönüşle oturur; video ve demo ayrı ritimlerde */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          var h = one('#ap-motion-t');
          gsap.from(lines(h), { yPercent: 120, rotation: 3, transformOrigin: '0% 100%', duration: 1.1, stagger: .1, ease: 'power4.out', scrollTrigger: once(h) });
          var md = one('.ap-motion__media');
          gsap.from(md, { scale: .9, opacity: 0, duration: 1.3, ease: 'expo.out', scrollTrigger: once(md, 'top 82%') });
          gsap.from(one('.ap-mo'), { x: 30, opacity: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: once(one('.ap-mo'), 'top 84%') });
        });

        /* 07 Gerçek hayat — cihaz şeması çizgiyle çizilir */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          var h = one('#ap-life-t');
          gsap.fromTo(lines(h), { clipPath: 'inset(0% 0% 100% 0%)', yPercent: 30 }, { clipPath: 'inset(0% 0% 0% 0%)', yPercent: 0, duration: 1, stagger: .1, ease: 'power3.out', clearProps: 'clipPath', scrollTrigger: once(h) });
          var st = one('.ap-life__stage');
          STg.create({ trigger: st, start: 'top 80%', once: true, onEnter: function () {
            var g = one('[data-g="' + st.getAttribute('data-ctx') + '"]', st);
            draw(q('.ap-dia__dev', g), { duration: 1.3 });
            gsap.from(q('.ap-dia__blk, .ap-dia__nav, .ap-dia__zone', g), { opacity: 0, duration: .6, stagger: .05, delay: .6, ease: 'power2.out', clearProps: 'opacity' });
          } });
          gsap.from(q('.ap-ctx__b'), { opacity: 0, y: 14, duration: .8, stagger: .08, ease: 'expo.out', scrollTrigger: once(one('.ap-ctx')) });
        });

        /* 08 Kalite — görsel alttan açılır, alt çizgi ve kontrol işaretleri çizilir */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          var fr = one('.ap-qual__frame'), h = one('#ap-qual-t'), sub = one('.ap-qual__sub');
          gsap.fromTo(fr, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.inOut', clearProps: 'clipPath', scrollTrigger: once(fr, 'top 80%') });
          gsap.fromTo(one('.ap-qual__img'), { scale: 1.2 }, { scale: 1, duration: 2, ease: 'expo.out', scrollTrigger: once(fr, 'top 80%') });
          gsap.from(lines(h), { yPercent: 140, duration: 1.1, stagger: .09, ease: 'power4.out', scrollTrigger: once(h) });
          gsap.from(lines(sub), { yPercent: 140, duration: 1.1, stagger: .09, delay: .35, ease: 'power4.out', scrollTrigger: once(h) });
          STg.create({ trigger: sub, start: 'top 82%', once: true, onEnter: function () { draw([one('.ap-qual__u path')], { duration: .9, delay: .9 }); } });
          q('.ap-qi').forEach(function (it, i) {
            STg.create({ trigger: it, start: 'top 90%', once: true, onEnter: function () {
              draw(q('circle, path', one('.ap-qi__c', it)), { duration: .7, delay: (i % 2) * .1, stagger: .15 });
              gsap.from(q('.ap-qi__k, .ap-qi__d', it), { opacity: 0, x: 10, duration: .7, delay: .2 + (i % 2) * .1, stagger: .06, ease: 'power2.out', clearProps: 'transform,opacity' });
            } });
          });
        });

        /* 09 Final — soru iki yandan gelir; çizgi sorudan birincil düğmeye iner */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          var h = one('#ap-fin-t');
          var tl = gsap.timeline({ scrollTrigger: once(h, 'top 80%'), defaults: { ease: 'expo.out' }, onComplete: function () { if (self._finDraw) self._finDraw(); } });
          tl.from(one('.ap-fin__a'), { xPercent: -16, opacity: 0, duration: 1.3 }, 0)
            .from(one('.ap-fin__b'), { xPercent: 16, opacity: 0, duration: 1.3 }, .12)
            .from(one('.ap-fin__q'), { yPercent: -60, rotation: -24, duration: 1, ease: 'back.out(2)' }, .5)
            .from(q('.ap-fin__sub span'), { opacity: 0, y: 18, duration: .9, stagger: .08 }, .7)
            .from(one('.ap-fin__side'), { opacity: 0, y: 16, duration: .9 }, .95);
          if (matchMedia('(min-width: 1025px)').matches) tl.set(one('.ap-fin__line'), { clipPath: 'inset(0% 0% 100% 0%)' }, 0).add(function () { if (self._finDraw) self._finDraw(); }, 1.45).to(one('.ap-fin__line'), { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power2.inOut', clearProps: 'clipPath' }, 1.45);
        });
      }, this);

      if (STg) {
        var last = 0, t = 0;
        var refresh = function () { if (!self._on) return; if (self._finDraw) self._finDraw(); STg.refresh(); last = Math.round(self.getBoundingClientRect().height); };
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
      this._fcOwned = false; this._footerOwned = false; this._header = null; this._vids = null; this._vidChoose = null; this._finDraw = null; this._labRender = null;
      this.replaceChildren();
      var st = document.getElementById(STYLE_ID); if (st && !document.querySelector(TAG)) st.remove();
    }
  }
  customElements.define(TAG, UygulamaGelistirmeV2);
})();
