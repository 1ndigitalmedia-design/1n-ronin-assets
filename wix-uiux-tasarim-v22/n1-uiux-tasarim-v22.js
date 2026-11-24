/*!
 * n1-uiux-tasarim-v22 — 1N Digital Media · UI/UX Tasarım (/ui-ux-tasarim) · Designed to feel. Built to work.
 * Wix Studio Custom Element · Tag name: n1-uiux-tasarim-v22 · Kaynak: bu dosyanın HTTPS adresi
 * Bağımsız V2 sürümü; UI/UX Tasarım V1 dosyasına dokunulmadı.
 *
 * Fikir: sayfa UI/UX'i anlatmaz, ziyaretçiye yaptırır. Başlık harfleri dağınık gelir ve bir taban çizgisine oturur;
 * sonraki her bölümde ziyaretçi bir tasarım kararını kendisi değiştirir ve sonucunu görür.
 *  01 Hero          harfler taban çizgisine oturur; görsel, imlecin (dokunmanın) gittiği yerde renklenir: dikkat.
 *  02 Hissedilir    "İYİ GÖRÜNÜR." ile "İYİ ÇALIŞIR." kaydırdıkça karşılıklı akar; üç soru.
 *  03 Deneyim       üç çalışan temsili arayüz: Netlik (karmaşık/sade + kendi bulma süreniz), Akış (3 ya da 5 adım),
 *                   Geri bildirim (bekleme, başarı, hata, geri alma).
 *  04 Süreç         altı aşama; kaydırdıkça büyük sözcük ve görsel değişir (yapışkan sütun, pin yok).
 *  05 Laboratuvar   tek bir bileşen; yoğunluk, hiyerarşi, kontrast (canlı WCAG oranı) ve davranış değiştirilebilir.
 *  06 Kapsam        on hizmet tipografik bir dizin olarak.
 *  07 Erişilebilirlik  sekiz ilke + çalışan bir form doğrulama örneği (yalnızca renk / renk+metin+ikon, gri önizleme).
 *  08 Manifesto     "GÜZEL GÖRÜNMESİ YETMEZ." dağınık başlar, kaydırdıkça hizalanır; "DOĞRU ÇALIŞMALI."
 *  09 Final
 *
 * Mimari: Light DOM, sınıf öneki ux-. Onaylı v6.48 Header + menü, Footer, WhatsApp / Yukarı Çık modülleri commit'e sabit
 * adreslerden aynen yüklenir; sayfada başka bir Header / Footer / kontrol katmanı varsa ikincisi oluşturulmaz.
 * GSAP 3.13.0 + ScrollTrigger yalnızca sayfada yoksa yüklenir. Pin ve spacer yok; animasyonlar gsap.context + matchMedia içinde.
 * Demoların durumu düz JavaScript nesnelerinde tutulur; GSAP yalnızca geçişleri süsler, yüklenemezse demolar aynen çalışır.
 * İçerik CSS'te gizlenmez: GSAP yüklenemezse ya da hareket azaltma açıksa sayfa son hâliyle görünür. Video yok.
 *
 * İsteğe bağlı öznitelik (yalnızca Wix dışı önizleme için): deps-base="<klasör>/"
 */
(function () {
  'use strict';
  var TAG = 'n1-uiux-tasarim-v22';
  var STYLE_ID = 'n1-ux22-style';
  if (customElements.get(TAG)) return;

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
  var ST = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js';
  var PARTNER_ART = {
    tablet: 'https://static.wixstatic.com/media/6dbf5e_800ff5a00ba244f9bb31761a6b2d713d~mv2.png',
    mobile: 'https://static.wixstatic.com/media/6dbf5e_32b849155e954320a1f6479f27fd6ad2~mv2.png'
  };

  /* ---------- Görseller ---------- */
  var IMG_BASE = 'https://static.wixstatic.com/media/6dbf5e_';
  var HERO_IMAGE = 'https://static.wixstatic.com/media/6dbf5e_ac664ac6ed364a05a9fb9c00790285d2~mv2.png';
  // fit: genişlik w, yükseklik serbest (h = 3w); srcset genişlikleri gerçek genişlikle örtüşür
  function img(id, w) { return IMG_BASE + id + '~mv2.jpg/v1/fit/w_' + w + ',h_' + (w * 3) + ',q_82,enc_auto/ui-ux-tasarim.jpg'; }
  function srcset(id, ws) { return (ws || [480, 800, 1200, 1800]).map(function (w) { return img(id, w) + ' ' + w + 'w'; }).join(', '); }
  function pic(id, cls, alt, sizes, pos, opt) {
    opt = opt || {};
    return '<img class="' + cls + '" src="' + img(id, opt.w || 800) + '" srcset="' + srcset(id, opt.ws) + '" sizes="' + sizes + '" alt="' + alt + '"' +
      (opt.eager ? '' : ' loading="lazy"') + ' decoding="async"' + (pos ? ' style="object-position:' + pos + '"' : '') + '>';
  }
  // Görseller (orijinal boyutlar ve içerikler gerçek tarayıcıda açılarak doğrulandı)
  var IM = {
    hand: '9daec1fad0634cf98a22f4bf0e66b0d8',    // 3072×4096 · turkuaz fonda, elde tutulan telefon; ekranda saat ve yuvarlak kontroller
    grid: '391fd400ec2f4917af7d4fcc84bd6792',    // 4000×6000 · koyu masada telefon; ekranda fotoğraf ızgarası (altta bir banka kartı: kadraj dışı)
    dash: '158d2856c2d742f9b2f17f67a5d2a502',    // 6240×4160 · kırmızı ışıkta tablet; koyu bir veri paneli, grafikler
    synth: 'a515d5a00c2847d08e0a3deb37576153',   // 6240×4160 · bir ses cihazının ekranı: Samples, Tuning, Saturation, Filter, Patterns
    ipad: '7e0a3bb63e3a494c915180b32a26cc51',    // 2268×4032 · keçe masa örtüsünde iPad (3B nesne ızgarası), kulaklık
    leaf: '00b4da3f3b6340d495f63c97ac983747',    // 3304×1858 · koyu zeminde yaprak görselli bir telefon arayüzü ve bitki
    music: '4e22f69df76d4dc5883109ea2a12a026',   // 3456×5184 · siyah-beyaz, eğik çekilmiş bir müzik uygulaması ekranı
    imac: '0e0ad9f315e54895b8b3e161f4b78b16',    // 3546×5319 · masaüstü bilgisayarda tasarlanan bir web sayfası, klavyede bir el
    desk: '1e9f3a8736bc46e88c0d64f33a7935e0'     // 2000×3000 · çalışma masası; monitörde yan yana mobil ekran akışları
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
  // İkonlar: tek 16'lık ızgara, 1.5 çizgi, aria-hidden
  var SV = ' viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" aria-hidden="true" focusable="false"';
  var I = {
    arrow: '<svg class="ux-ico"' + SV + '><path d="M4.5 11.5l7-7M5.5 4.5h6v6"/></svg>',
    down: '<svg class="ux-ico"' + SV + '><path d="M8 3v10M3.5 8.5L8 13l4.5-4.5"/></svg>',
    play: '<svg class="ux-ico ux-ico--play"' + SV + '><path d="M5 3.5v9l7-4.5z"/></svg>',
    pause: '<svg class="ux-ico ux-ico--pause"' + SV + '><path d="M5.5 3.5v9M10.5 3.5v9"/></svg>',
    prev: '<svg class="ux-ico"' + SV + '><path d="M13 8H3M7.5 3.5L3 8l4.5 4.5"/></svg>',
    next: '<svg class="ux-ico"' + SV + '><path d="M3 8h10M8.5 3.5L13 8l-4.5 4.5"/></svg>'
  };
  function ln(t, cls) { return '<span class="ux-ln' + (cls ? ' ' + cls : '') + '"><span>' + t + '</span></span>'; }
  function chars(t, cls) { return '<span class="ux-chs' + (cls ? ' ' + cls : '') + '">' + Array.from(t).map(function (c) { return c === ' ' ? '<span class="ux-sp"> </span>' : '<span class="ux-ch">' + c + '</span>'; }).join('') + '</span>'; }
  // Ek ikonlar (aynı 16'lık ızgara, 1.5 çizgi)
  I.check = '<svg class="ux-ico"' + SV + '><path d="M3 8.5l3 3 7-7"/></svg>';
  I.alert = '<svg class="ux-ico"' + SV + '><path d="M8 4.5v4.5M8 11.2v.3"/><path d="M8 1.8l6.5 12H1.5z"/></svg>';
  I.spin = '<svg class="ux-ico ux-spin"' + SV + '><path d="M8 2a6 6 0 1 1-6 6"/></svg>';
  I.save = '<svg class="ux-ico"' + SV + '><path d="M4 2.5h8v11l-4-3-4 3z"/></svg>';
  I.back = '<svg class="ux-ico"' + SV + '><path d="M13 8H3M7.5 3.5L3 8l4.5 4.5"/></svg>';
  I.reset = '<svg class="ux-ico"' + SV + '><path d="M3.5 6.5A5 5 0 1 1 3 9.5"/><path d="M3 3.5v3h3"/></svg>';

  /* ---------- İçerik ---------- */
  var QUESTIONS = [
    { q: 'Kullanıcı doğru içeriği kolayca bulabiliyor mu?', a: 'Bulmak', d: 'Hiyerarşi, aranan bilginin ilk bakışta öne çıkmasını sağlar.' },
    { q: 'Bir sonraki adımı anlayabiliyor mu?', a: 'Anlamak', d: 'Açık etiketler ve tek bir ana eylem, tereddüdü azaltır.' },
    { q: 'Arayüz karmaşık mı, yoksa yönlendirici mi?', a: 'Yönlenmek', d: 'Sade bir akış, kullanıcıyı düşünmek yerine ilerlemeye davet eder.' }
  ];
  /* Yeni 'Her İyi Deneyimin Bir Mantığı Var' görselleri; sıra kullanıcı tarafından verildi. */
  var PROCESS_IM = {
    discover: '2b9f938206d14b5e81bcc471ee445150',
    define: '045521fe819c455fa19615f94f7825b2',
    design: '91290906ba324d6b8d515e02d6ee037b',
    prototype: 'caafc3cb0dce40ae9b4cd1be3cde5145',
    validate: '8281c4859bd04de18739b74be080349c',
    improve: 'c568d39f92d247c4b7762337dfac03ab'
  };
  var STAGES = [
    { k: 'KEŞİF', e: 'Discover', d: 'Kullanıcı ihtiyaçlarını, iş hedeflerini ve mevcut deneyimi anlarız.', im: 'discover', pos: '50% 50%', alt: 'Keşif aşaması görseli' },
    { k: 'TANIMLAMA', e: 'Define', d: 'Kullanıcı problemini, bilgi mimarisini ve temel öncelikleri netleştiririz.', im: 'define', pos: '50% 50%', alt: 'Tanımlama aşaması görseli' },
    { k: 'TASARIM', e: 'Design', d: 'Kullanıcı akışlarını, görsel dili ve bileşen sistemlerini oluştururuz.', im: 'design', pos: '50% 50%', alt: 'Tasarım aşaması görseli' },
    { k: 'PROTOTİPLEME', e: 'Prototype', d: 'Etkileşimleri ve kritik kullanıcı yolculuklarını deneyimlenebilir hâle getiririz.', im: 'prototype', pos: '50% 50%', alt: 'Prototipleme aşaması görseli' },
    { k: 'DOĞRULAMA', e: 'Validate', d: 'Uygun araştırma ve test yöntemleriyle tasarım kararlarını gözden geçiririz.', im: 'validate', pos: '50% 50%', alt: 'Doğrulama aşaması görseli' },
    { k: 'İYİLEŞTİRME', e: 'Improve', d: 'Geri bildirimlere ve gözlemlere göre deneyimi geliştiririz.', im: 'improve', pos: '50% 50%', alt: 'İyileştirme aşaması görseli' }
  ];
  var SERVICES = [
    ['Web arayüz tasarımı', 'Geniş ekranda bilgiyi düzenlemek.'],
    ['Mobil uygulama arayüzleri', 'Küçük ekranda tek bir karara odaklanmak.'],
    ['Kullanıcı deneyimi tasarımı', 'Ürünle kurulan ilişkinin tamamını düşünmek.'],
    ['Kullanıcı akışları', 'Bir hedefe giden en kısa ve en açık yol.'],
    ['Bilgi mimarisi', 'İçeriği insanların aradığı biçimde gruplamak.'],
    ['Etkileşim tasarımı', 'Her eylemin anlaşılır bir karşılığı olması.'],
    ['Prototipleme', 'Kararları kod yazılmadan önce denemek.'],
    ['Design system geliştirme', 'Tutarlılığı ölçeklenebilir bileşenlere dönüştürmek.'],
    ['Responsive tasarım', 'Aynı ürünü her ekran için yeniden kurgulamak.'],
    ['Kullanılabilirlik değerlendirmesi', 'Mevcut deneyimdeki sürtünmeleri bulmak.']
  ];
  var A11Y = [
    ['Okunabilir tipografi', 'Yeterli punto, satır aralığı ve satır uzunluğu.'],
    ['Yeterli kontrast', 'Metin için en az 4,5:1, büyük metin ve arayüz öğeleri için en az 3:1 (WCAG 2.2, AA).'],
    ['Klavye ile kullanım', 'Her işlev fare olmadan da kullanılabilir.'],
    ['Anlamlı odak durumları', 'Odaklanan öğe her zaman görünür ve başka bir öğenin altında kalmaz.'],
    ['Açık hata mesajları', 'Ne olduğu ve nasıl düzeltileceği, yalnızca renkle değil sözle de söylenir.'],
    ['Dokunmatik kullanım', 'Rahat dokunma alanları; sürükleme gerektiren her şeyin tek dokunuşla bir karşılığı.'],
    ['Hareket azaltma tercihleri', 'Sistem ayarında hareket azaltılmışsa, süs niteliğindeki hareketler durur.'],
    ['Anlaşılır içerik hiyerarşisi', 'Başlıklar, sıralı yapı ve ekran okuyucuya anlamlı adlar.']
  ];

  // Segmentli seçim: yerel radio düğmeleri (klavye ve ekran okuyucu desteği tarayıcıdan gelir)
  function seg(name, legend, opts, val, cls) {
    return '<fieldset class="ux-seg' + (cls ? ' ' + cls : '') + '"><legend class="ux-seg__l">' + legend + '</legend><div class="ux-seg__o">' +
      opts.map(function (o) { return '<label class="ux-seg__i"><input type="radio" name="' + name + '" value="' + o[0] + '"' + (o[0] === val ? ' checked' : '') + '><span>' + o[1] + '</span></label>'; }).join('') +
      '</div></fieldset>';
  }
  function sw(id, label, on) {
    return '<button type="button" class="ux-sw" role="switch" id="' + id + '" aria-checked="' + (on ? 'true' : 'false') + '"><span class="ux-sw__t" aria-hidden="true"><span class="ux-sw__k"></span></span><span class="ux-sw__l">' + label + '</span></button>';
  }
  function tag() { return '<p class="ux-tag">Temsili arayüz · gerçek bir müşteri projesi değildir</p>'; }

  function markup() {
    return '<main class="ux" id="icerik">' +
/* 01 — Hero */
'<section class="ux-hero" aria-labelledby="ux-hero-t">' +
  '<div class="ux-wrap ux-hero__grid">' +
    '<p class="ux-kicker"><span>1N Digital Media</span><span>UI/UX tasarım</span></p>' +
    '<h1 class="ux-hero__title" id="ux-hero-t"><span class="ux-tl">' + chars('UI/UX') + '</span><span class="ux-tl">' + chars('TASARIM.') + '</span><span class="ux-base" aria-hidden="true"></span></h1>' +
    '<figure class="ux-spot" data-ux="spot">' +
      '<div class="ux-spot__frame">' +
        '<img class="ux-spot__img" src="' + HERO_IMAGE + '" alt="UI/UX tasarım ana görseli" loading="eager" fetchpriority="high" decoding="async">' +
      '</div>' +
      '<figcaption class="ux-cap">İyi tasarım, görünenin ötesinde deneyimi şekillendirir.</figcaption>' +
    '</figure>' +
    '<div class="ux-hero__foot">' +
      '<p class="ux-hero__msg"><span class="ux-hm">' + ln('HİSSEDİLEN') + ln('TASARIM.') + '</span><span class="ux-hm ux-hm--b">' + ln('İŞLEYEN') + ln('DENEYİM.', 'ux-ln--acc') + '</span></p>' +
      '<div class="ux-hero__side">' +
        '<p class="ux-hero__sub">Her etkileşim bir karar, her karar bir deneyimdir. Biz dijital ürünleri yalnızca güzel görünmeleri için değil, insanlar tarafından rahatça kullanılmaları için tasarlarız.</p>' +
        '<a class="ux-scroll" href="#ux-deneyim"><span>Deneyimi deneyin</span>' + I.down + '</a>' +
      '</div>' +
    '</div>' +
  '</div>' +
'</section>' +

/* 02 — Tasarım yalnızca görünmez */
'<section class="ux-sec ux-feel" aria-labelledby="ux-feel-t">' +
  '<div class="ux-wrap">' +
    '<div class="ux-head">' +
      '<p class="ux-label">His</p>' +
      '<h2 class="ux-h2" id="ux-feel-t">' + ln('TASARIM') + ln('YALNIZCA') + ln('GÖRÜNMEZ.') + ln('HİSSEDİLİR.', 'ux-ln--acc') + '</h2>' +
      '<p class="ux-lede">Bir tasarımın değeri yalnızca ilk bakışta değil, kullanıcının onunla kurduğu ilişki boyunca ortaya çıkar.</p>' +
    '</div>' +
  '</div>' +
  '<div class="ux-vs" aria-hidden="true"><p class="ux-vs__en">Looks good. Works better.</p><p class="ux-vs__a">İYİ GÖRÜNÜR.</p><p class="ux-vs__b">İYİ ÇALIŞIR.</p></div>' +
  '<div class="ux-wrap ux-feel__body">' +
    '<figure class="ux-feel__fig">' + pic(IM.synth, 'ux-feel__img', 'Bir ses cihazının karanlık ekranı: her ayarın adı ve değeri açıkça yazılı', '(max-width:767px) 100vw, 44vw', '40% 60%', { w: 1200, ws: [800, 1200, 1800] }) +
      '<figcaption class="ux-cap">Her ayarın bir adı ve değeri var. Netlik, karmaşık bir sistemi bile okunur kılar.</figcaption></figure>' +
    '<ol class="ux-qs">' + QUESTIONS.map(function (q) { return '<li class="ux-q"><span class="ux-q__a">' + q.a + '</span><p class="ux-q__q">' + q.q + '</p><p class="ux-q__d">' + q.d + '</p></li>'; }).join('') + '</ol>' +
  '</div>' +
'</section>' +

/* 03 — Deneyimi anlatmıyoruz, yaşatıyoruz */
'<section class="ux-sec ux-exp" id="ux-deneyim" aria-labelledby="ux-exp-t">' +
  '<div class="ux-wrap">' +
    '<div class="ux-head">' +
      '<p class="ux-label">Deneyim</p>' +
      '<h2 class="ux-h2" id="ux-exp-t">' + ln('DENEYİMİ') + ln('ANLATMIYORUZ.') + ln('YAŞATIYORUZ.', 'ux-ln--acc') + '</h2>' +
      '<p class="ux-lede">Üç küçük, gerçekten çalışan arayüz. Fare, dokunma ya da klavyeyle deneyin; her biri bir tasarım kararının etkisini gösterir.</p>' +
    '</div>' +
    '<div class="ux-demo">' +
      '<div class="ux-dtabs" role="tablist" aria-label="Deneyim örnekleri">' +
        [['01', 'Netlik', 'Karmaşık ve sade düzen'], ['02', 'Akış', 'Gereksiz adımların etkisi'], ['03', 'Geri bildirim', 'Arayüz ne olduğunu söylemeli']].map(function (t, i) {
          return '<button type="button" class="ux-dtab" role="tab" id="ux-dtab-' + i + '" aria-controls="ux-dp-' + i + '" aria-selected="' + (i === 0) + '" tabindex="' + (i ? -1 : 0) + '"><span class="ux-dtab__n">' + t[0] + '</span><span class="ux-dtab__k">' + t[1] + '</span><span class="ux-dtab__d">' + t[2] + '</span></button>';
        }).join('') +
      '</div>' +

      /* Netlik */
      '<div class="ux-dp" role="tabpanel" id="ux-dp-0" aria-labelledby="ux-dtab-0" tabindex="0">' +
        '<div class="ux-dp__info">' +
          '<h3 class="ux-dp__t">Bilgiyi bulmak ne kadar sürüyor?</h3>' +
          '<p class="ux-dp__p">Aynı etkinlik kartı, iki farklı düzen. <b>Görevi başlatın</b>, ardından kartta <b>başlama saatini</b> bulup üzerine dokunun. Sonra düzeni değiştirip tekrar deneyin.</p>' +
          seg('ux-cl-mode', 'Düzen', [['messy', 'Karmaşık'], ['clear', 'Sade']], 'messy') +
          '<div class="ux-dp__row"><button type="button" class="ux-btn-s" data-cl="start">Görevi başlat</button></div>' +
          '<p class="ux-dp__res" role="status" aria-live="polite" data-cl="res">Görev henüz başlamadı.</p>' +
          '<dl class="ux-times"><div><dt>Karmaşık</dt><dd data-cl="t-messy">—</dd></div><div><dt>Sade</dt><dd data-cl="t-clear">—</dd></div></dl>' +
          '<p class="ux-note">Süreler yalnızca sizin bu denemenize aittir; bir araştırma sonucu değildir.</p>' +
        '</div>' +
        '<div class="ux-screen">' + tag() +
          '<article class="ux-ev" data-mode="messy" aria-label="Temsili etkinlik kartı">' +
            '<p class="ux-ev__noise" aria-hidden="true"><span>YENİ!</span><span>SON YERLER</span><span>%100 ÜCRETSİZ</span><span>KAÇIRMA</span></p>' +
            '<button type="button" class="ux-hit ux-ev__title" data-k="title">Tasarım Buluşması: Arayüzde Netlik</button>' +
            '<button type="button" class="ux-hit ux-ev__desc" data-k="desc">Ürün ekipleri için sade arayüzler üzerine kısa bir konuşma ve soru-cevap.</button>' +
            '<div class="ux-ev__meta">' +
              '<button type="button" class="ux-hit ux-ev__date" data-k="date"><span class="ux-ev__lb">Tarih</span>12 Aralık, Perşembe</button>' +
              '<button type="button" class="ux-hit ux-ev__time" data-k="time"><span class="ux-ev__lb">Başlangıç</span>19.00</button>' +
              '<button type="button" class="ux-hit ux-ev__place" data-k="place"><span class="ux-ev__lb">Yer</span>Kadıköy, İstanbul</button>' +
              '<button type="button" class="ux-hit ux-ev__price" data-k="price"><span class="ux-ev__lb">Katılım</span>Ücretsiz, kayıtlı</button>' +
            '</div>' +
            '<div class="ux-ev__cta"><button type="button" class="ux-hit ux-ev__go" data-k="go">Yerimi ayır</button><button type="button" class="ux-hit ux-ev__x" data-k="share">Paylaş</button><button type="button" class="ux-hit ux-ev__x ux-ev__x2" data-k="cal">Takvime ekle</button></div>' +
          '</article>' +
        '</div>' +
      '</div>' +

      /* Akış */
      '<div class="ux-dp" role="tabpanel" id="ux-dp-1" aria-labelledby="ux-dtab-1" tabindex="0" hidden>' +
        '<div class="ux-dp__info">' +
          '<h3 class="ux-dp__t">Her ek adım bir vazgeçme fırsatıdır.</h3>' +
          '<p class="ux-dp__p">Temsili bir randevu akışını tamamlayın. Ardından gereksiz adımları açıp aynı görevi tekrar deneyin; adım ve dokunuş sayısını karşılaştırın.</p>' +
          sw('ux-fl-extra', 'Gereksiz adımları ekle', false) +
          '<dl class="ux-times"><div><dt>Adım</dt><dd data-fl="step">1 / 3</dd></div><div><dt>Dokunuş</dt><dd data-fl="taps">0</dd></div></dl>' +
          '<p class="ux-dp__res" role="status" aria-live="polite" data-fl="res">Akış 3 adım.</p>' +
        '</div>' +
        '<div class="ux-screen">' + tag() +
          '<form class="ux-fl" novalidate aria-label="Temsili randevu akışı">' +
            '<div class="ux-fl__bar" aria-hidden="true"><i></i></div>' +
            '<div class="ux-fl__body"></div>' +
            '<p class="ux-fl__err" role="alert" data-fl="err"></p>' +
            '<div class="ux-fl__nav"><button type="button" class="ux-btn-s ux-btn-s--ghost" data-fl="back">' + I.back + '<span>Geri</span></button><button type="submit" class="ux-btn-s" data-fl="next">Devam</button></div>' +
          '</form>' +
        '</div>' +
      '</div>' +

      /* Geri bildirim */
      '<div class="ux-dp" role="tabpanel" id="ux-dp-2" aria-labelledby="ux-dtab-2" tabindex="0" hidden>' +
        '<div class="ux-dp__info">' +
          '<h3 class="ux-dp__t">Arayüz ne olduğunu söylemeli.</h3>' +
          '<p class="ux-dp__p">Dosyayı gönderin ve sonucu izleyin. Geri bildirimi kapatıp aynı işlemi tekrarlayın: gönderildi mi, bilemezsiniz. Hatayı açarak arayüzün sorunu nasıl anlattığını görün.</p>' +
          seg('ux-fb-mode', 'Geri bildirim', [['on', 'Açık'], ['off', 'Kapalı']], 'on') +
          sw('ux-fb-fail', 'Bağlantı hatası oluştur', false) +
        '</div>' +
        '<div class="ux-screen">' + tag() +
          '<div class="ux-fb" data-fb="on" aria-label="Temsili dosya gönderimi">' +
            '<div class="ux-fb__file"><span class="ux-fb__ext" aria-hidden="true">PDF</span><span><b>sunum-taslagi.pdf</b><span class="ux-fb__sz">2,4 MB</span></span>' +
              '<button type="button" class="ux-fb__save" aria-pressed="false" aria-label="Dosyayı kaydet">' + I.save + '</button></div>' +
            '<button type="button" class="ux-fb__send" data-st="idle"><span class="ux-fb__ic" aria-hidden="true">' + I.spin + I.check + I.alert + '</span><span class="ux-fb__lb">Gönder</span></button>' +
            '<p class="ux-fb__msg" role="status" aria-live="polite"></p>' +
            '<div class="ux-toast" role="status" aria-live="polite" hidden><span class="ux-toast__t"></span><button type="button" class="ux-toast__u">Geri al</button></div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</div>' +
'</section>' +

/* 04 — Süreç */
'<section class="ux-sec ux-proc" aria-labelledby="ux-proc-t">' +
  '<div class="ux-wrap">' +
    '<div class="ux-head">' +
      '<p class="ux-label">Süreç</p>' +
      '<h2 class="ux-h2" id="ux-proc-t">' + ln('HER İYİ') + ln('DENEYİMİN') + ln('BİR MANTIĞI VAR.') + '</h2>' +
    '</div>' +
    '<div class="ux-proc__grid">' +
      '<div class="ux-proc__stage" aria-hidden="true">' +
        '<div class="ux-proc__frame">' + STAGES.map(function (s, i) { return pic(PROCESS_IM[s.im], 'ux-proc__img' + (i ? '' : ' is-on') + (s.crop ? ' ux-crop' : ''), '', '(max-width:767px) 1px, (max-width:1024px) 50vw, 40vw', s.pos, { w: 1300, ws: [900, 1300, 1900] }); }).join('') + '</div>' +
        '<p class="ux-proc__big"><span class="ux-proc__n">01</span><span class="ux-proc__k">' + STAGES[0].k + '</span></p>' +
      '</div>' +
      '<ol class="ux-proc__list">' +
        STAGES.map(function (s, i) {
          return '<li class="ux-st' + (i ? '' : ' is-on') + '" data-i="' + i + '">' +
            '<figure class="ux-st__fig">' + pic(PROCESS_IM[s.im], 'ux-st__img' + (s.crop ? ' ux-crop' : ''), s.alt, '(max-width:767px) 100vw, 1px', s.pos) + '</figure>' +
            '<p class="ux-st__n">0' + (i + 1) + ' <span lang="en">' + s.e + '</span></p>' +
            '<h3 class="ux-st__k">' + s.k + '</h3>' +
            '<p class="ux-st__d">' + s.d + '</p>' +
          '</li>';
        }).join('') +
      '</ol>' +
    '</div>' +
  '</div>' +
'</section>' +

/* 05 — Arayüz laboratuvarı */
'<section class="ux-sec ux-lab" aria-labelledby="ux-lab-t">' +
  '<div class="ux-wrap">' +
    '<div class="ux-head">' +
      '<p class="ux-label">Laboratuvar</p>' +
      '<h2 class="ux-h2" id="ux-lab-t">' + ln('DETAYLAR') + ln('DENEYİMİ') + ln('DEĞİŞTİRİR.', 'ux-ln--acc') + '</h2>' +
      '<p class="ux-lede">Aynı bileşen, dört karar. Bir ayarı değiştirin; içerik aynı kalır, deneyim değişir.</p>' +
    '</div>' +
    '<div class="ux-lab__grid">' +
      '<form class="ux-lab__ctl" aria-label="Bileşen ayarları">' +
        seg('ux-lab-space', 'Boşluk ve hizalama', [['compact', 'Sıkışık'], ['spacious', 'Ferah']], 'spacious') +
        seg('ux-lab-type', 'Tipografi hiyerarşisi', [['flat', 'Düz'], ['clear', 'Net']], 'clear') +
        seg('ux-lab-contrast', 'Kontrast', [['low', 'Düşük'], ['ok', 'Yeterli']], 'ok') +
        seg('ux-lab-behave', 'Buton davranışı', [['static', 'Statik'], ['live', 'Etkileşimli']], 'live') +
        '<button type="button" class="ux-btn-d" data-lab="reset">' + I.reset + '<span>Önerilen ayarlara dön</span></button>' +
      '</form>' +
      '<div class="ux-lab__out">' +
        '<div class="ux-screen ux-screen--lab">' + tag() +
          '<article class="ux-spec" data-space="spacious" data-type="clear" data-contrast="ok" data-behave="live" aria-label="Temsili makale kartı">' +
            '<p class="ux-spec__k">Rehber · 6 dk okuma</p>' +
            '<h3 class="ux-spec__t">Formlarda daha az alan, daha çok tamamlanan başvuru</h3>' +
            '<p class="ux-spec__p">Her alan kullanıcıdan bir karar ister. Gerçekten gerekli olmayan soruları çıkarmak, formu kısaltmanın en dürüst yoludur.</p>' +
            '<div class="ux-spec__cta"><button type="button" class="ux-spec__b1">Okumaya devam et</button><button type="button" class="ux-spec__b2" aria-pressed="false">Kaydet</button></div>' +
            '<p class="ux-spec__fb" role="status" aria-live="polite"></p>' +
          '</article>' +
        '</div>' +
        '<div class="ux-lab__read" aria-live="polite">' +
          '<p class="ux-lab__ratio"><span>Metin kontrastı</span><b data-lab="ratio">—</b><span data-lab="verdict"></span></p>' +
          '<p class="ux-lab__warn" data-lab="warn" hidden>Düşük kontrast burada bilerek gösteriliyor ve metni okumayı zorlaştırır. <button type="button" class="ux-link" data-lab="fix">Yeterli kontrasta dön</button></p>' +
          '<p class="ux-lab__why" data-lab="why"></p>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</div>' +
'</section>' +

/* 06 — Kapsam */
'<section class="ux-sec ux-scope" aria-labelledby="ux-scope-t">' +
  '<div class="ux-wrap">' +
    '<div class="ux-head">' +
      '<p class="ux-label">Kapsam</p>' +
      '<h2 class="ux-h2" id="ux-scope-t">' + ln('HER EKRANDA') + ln('AYNI DÜŞÜNCE.') + ln('FARKLI', 'ux-ln--acc') + ln('DENEYİMLER.', 'ux-ln--acc') + '</h2>' +
    '</div>' +
    '<div class="ux-scope__grid">' +
      '<figure class="ux-scope__fig">' + pic(IM.desk, 'ux-scope__img', 'Bir çalışma masası; monitörde aynı ürünün yan yana dizilmiş mobil ekranları', '(max-width:767px) 100vw, 40vw', '50% 40%', { w: 1200, ws: [800, 1200, 1800] }) +
        '<figcaption class="ux-cap">Aynı ürün, onlarca ekran. Masaüstünde geniş bir düzen, telefonda tek bir karar.</figcaption></figure>' +
      '<ol class="ux-svc">' + SERVICES.map(function (s, i) { return '<li class="ux-svc__i"><span class="ux-svc__n" aria-hidden="true">' + (i < 9 ? '0' : '') + (i + 1) + '</span><b class="ux-svc__k">' + s[0] + '</b><span class="ux-svc__d">' + s[1] + '</span></li>'; }).join('') + '</ol>' +
    '</div>' +
  '</div>' +
'</section>' +

/* 07 — Erişilebilirlik */
'<section class="ux-sec ux-acc" aria-labelledby="ux-acc-t">' +
  '<div class="ux-wrap">' +
    '<div class="ux-head">' +
      '<p class="ux-label">Erişilebilirlik</p>' +
      '<h2 class="ux-h2" id="ux-acc-t">' + ln('İYİ TASARIM') + ln('HERKES İÇİNDİR.') + '</h2>' +
      '<p class="ux-lede">Bir arayüz yalnızca belirli bir cihazda, belirli bir kullanıcı için ya da yalnızca fareyle çalışıyorsa, deneyim eksiktir.</p>' +
    '</div>' +
    '<div class="ux-acc__grid">' +
      '<ul class="ux-acc__list">' + A11Y.map(function (a) { return '<li><b>' + a[0] + '</b><span>' + a[1] + '</span></li>'; }).join('') + '</ul>' +
      '<div class="ux-acc__demo">' +
        '<h3 class="ux-dp__t">Hata yalnızca renkle anlatılırsa?</h3>' +
        '<p class="ux-dp__p">Alanı boş bırakın ya da hatalı bir adres yazıp gönderin. Sonra hata gösterimini değiştirin ve gri önizlemeyi açın: renk görmeyen biri için ne değişiyor?</p>' +
        seg('ux-ac-mode', 'Hata gösterimi', [['color', 'Yalnızca renk'], ['full', 'Renk + metin + ikon']], 'full') +
        sw('ux-ac-gray', 'Gri tonlamalı önizle', false) +
        '<p class="ux-note" data-ac="warn" hidden>"Yalnızca renk" modu bilerek eksik bırakıldı: hata sözle söylenmez. Karşılaştırdıktan sonra "Renk + metin + ikon" seçeneğine dönün.</p>' +
        '<div class="ux-screen ux-screen--acc">' + tag() +
          '<form class="ux-sub" data-mode="full" novalidate aria-label="Temsili bülten aboneliği">' +
            '<label class="ux-sub__l" for="ux-sub-mail">E-posta adresiniz</label>' +
            '<div class="ux-sub__row"><input class="ux-sub__in" id="ux-sub-mail" type="email" autocomplete="email" inputmode="email" placeholder="ornek@alanadi.com"><button type="submit" class="ux-btn-s">Abone ol</button></div>' +
            '<p class="ux-sub__err" id="ux-sub-err" aria-live="assertive"></p>' +
            '<p class="ux-sub__ok" role="status" aria-live="polite"></p>' +
          '</form>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</div>' +
'</section>' +

/* 08 — Manifesto */
'<section class="ux-sec ux-man" aria-labelledby="ux-man-t">' +
  '<div class="ux-wrap">' +
    '<p class="ux-label">Yaklaşım</p>' +
    '<div class="ux-man__grid">' +
      '<h2 class="ux-man__t" id="ux-man-t">' +
        '<span class="ux-man__a">' + ['GÜZEL', 'GÖRÜNMESİ', 'YETMEZ.'].map(function (w) { return '<span class="ux-mw">' + chars(w) + '</span>'; }).join('') + '</span>' +
        '<span class="ux-man__b">' + ln('DOĞRU') + ln('ÇALIŞMALI.', 'ux-ln--acc') + '<span class="ux-man__line" aria-hidden="true"></span></span>' +
      '</h2>' +
      '<figure class="ux-man__fig">' + pic(IM.music, 'ux-man__img', 'Siyah-beyaz, eğik açıyla çekilmiş bir müzik uygulaması ekranı', '(max-width:767px) 80vw, 30vw', '40% 50%') + '</figure>' +
    '</div>' +
    '<p class="ux-man__p">Güzel bir ekran ilk bakışı kazanır. Doğru çalışan bir ekran, kullanıcının güvenini. Biz ikisini birlikte tasarlarız: önce insanı anlarız, sonra her kararı onun yerine kendimiz deneriz.</p>' +
  '</div>' +
'</section>' +

/* 09 — Final */
'<section class="ux-fin" aria-labelledby="ux-fin-t">' +
  '<div class="ux-wrap ux-fin__grid">' +
    '<div class="ux-fin__copy">' +
      '<p class="ux-label">Başlayalım</p>' +
      '<h2 class="ux-fin__t" id="ux-fin-t">' + ln('BİRLİKTE') + ln('DAHA İYİ') + ln('DENEYİMLER') + ln('TASARLAYALIM.', 'ux-ln--acc') + '</h2>' +
      '<p class="ux-fin__sub">Dijital ürününüzü insanların kolayca anlayabildiği, rahatça kullanabildiği ve keyifle deneyimlediği bir yapıya birlikte dönüştürelim.</p>' +
      '<div class="ux-fin__cta">' +
        '<a class="ux-btn ux-btn--primary" href="/iletisim"><span>Projenizi Konuşalım</span><span class="ux-btn__ico">' + I.arrow + '</span></a>' +
        '<a class="ux-btn ux-btn--ghost" href="/teklif-al"><span>Teklif Al</span><span class="ux-btn__ico">' + I.arrow + '</span></a>' +
      '</div>' +
    '</div>' +
    '<figure class="ux-fin__fig">' + pic(IM.hand, 'ux-fin__img', 'Elde tutulan bir telefonun yakın planı; parmak ekrana dokunmak üzere', '(max-width:1024px) 34vw, 24vw', '28% 66%') +
      '<figcaption class="ux-cap">Her deneyim bir dokunuşla başlar.</figcaption></figure>' +
  '</div>' +
'</section>' +
'</main>';
  }

  /* ---------- CSS (yalnızca n1-uiux-tasarim-v22 kapsamında) ---------- */
  var CSS = "n1-uiux-tasarim-v22{--bg:#080A09;--g1:#0D0F0E;--g2:#121513;--ink:#ECEBE5;--soft:#BDBCB5;--mute:#9A9B95;--dim:#6E706A;--ghost:#2B2E2B;--line:rgba(228,227,221,.12);--line2:rgba(228,227,221,.07);--acc:#A8CF62;--ease:cubic-bezier(.22,1,.36,1);\n  --hdr:88px;--gap:clamp(18px,2.2vw,40px);--secpad:clamp(100px,8.6vw,168px);display:block;position:relative;width:100%;background:var(--bg);color:var(--ink);font:400 17px/1.6 Barlow,Arial,sans-serif;-webkit-font-smoothing:antialiased;overflow-x:clip;text-align:left}\nn1-uiux-tasarim-v22 *,n1-uiux-tasarim-v22 *::before,n1-uiux-tasarim-v22 *::after{box-sizing:border-box;min-width:0}\nn1-uiux-tasarim-v22 :where(.ux) :where(p,h1,h2,h3,ul,ol,figure,figcaption){margin:0}\nn1-uiux-tasarim-v22 :where(.ux) :where(ul,ol){padding:0;list-style:none}\nn1-uiux-tasarim-v22 :where(.ux) :where(a){color:inherit}\nn1-uiux-tasarim-v22 :where(.ux) :where(button){font:inherit;color:inherit;background:none;border:0;padding:0;margin:0;cursor:pointer;-webkit-tap-highlight-color:transparent}\nn1-uiux-tasarim-v22 .ux :focus-visible{outline:2px solid var(--acc);outline-offset:3px}\nn1-uiux-tasarim-v22 .ux img{display:block;max-width:none}\nn1-uiux-tasarim-v22 .ux-ico{display:block;flex:none}\nn1-uiux-tasarim-v22 .ux-sr{position:absolute!important;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}\nn1-uiux-tasarim-v22 .ux-wrap{width:90%;margin-left:auto;margin-right:auto}\nn1-uiux-tasarim-v22 .ux-sec{position:relative;padding:var(--secpad) 0;border-top:1px solid var(--line)}\nn1-uiux-tasarim-v22 .ux-label{display:flex;align-items:center;gap:12px;font:500 15px/1.3 Barlow,Arial,sans-serif;color:var(--mute)}\nn1-uiux-tasarim-v22 .ux-label::before{content:\"\";flex:none;width:7px;height:7px;border-radius:1px;background:var(--acc)}\nn1-uiux-tasarim-v22 .ux-ln{display:block;overflow:hidden;padding:.17em 0 .09em;margin:-.17em 0 -.09em}\nn1-uiux-tasarim-v22 .ux-ln>span{display:block}\nn1-uiux-tasarim-v22 .ux-ln--acc{color:var(--acc)}\nn1-uiux-tasarim-v22 .ux-chs{display:inline-block;white-space:nowrap}\nn1-uiux-tasarim-v22 .ux-ch{display:inline-block;will-change:transform}\nn1-uiux-tasarim-v22 .ux-sp{display:inline-block;width:.24em}\nn1-uiux-tasarim-v22 .ux-h2{margin-top:clamp(26px,2.4vw,40px);font:700 clamp(60px,7.4vw,148px)/1 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:-.016em;color:var(--ink)}\nn1-uiux-tasarim-v22 .ux-cap{margin-top:14px;font-size:14px;line-height:1.5;color:var(--mute)}\nn1-uiux-tasarim-v22 .ux-btn{position:relative;display:inline-flex;align-items:center;justify-content:space-between;gap:22px;height:64px;padding:0 10px 0 28px;border-radius:12px;overflow:hidden;white-space:nowrap;isolation:isolate;\n  font:500 13.5px/1 Barlow,Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase;text-decoration:none;color:var(--ink);border:1px solid rgba(168,207,98,.42);background:rgba(16,19,17,.72);transition:color .45s var(--ease),border-color .45s ease;touch-action:manipulation}\nn1-uiux-tasarim-v22 .ux-btn::before{content:\"\";position:absolute;inset:0;z-index:-1;background:var(--acc);transform:scaleX(0);transform-origin:0 50%;transition:transform .6s cubic-bezier(.65,0,.35,1)}\nn1-uiux-tasarim-v22 .ux-btn__ico{display:grid;place-items:center;width:44px;height:44px;border-radius:8px;background:rgba(168,207,98,.12);transition:background-color .45s ease}\nn1-uiux-tasarim-v22 .ux-btn--ghost{border-color:rgba(228,227,221,.22);background:rgba(8,10,9,.5)}\nn1-uiux-tasarim-v22 .ux-btn--ghost .ux-btn__ico{background:rgba(236,235,229,.06)}\nn1-uiux-tasarim-v22 .ux-btn:hover,n1-uiux-tasarim-v22 .ux-btn:focus-visible{color:#0A0B0B;border-color:var(--acc)}\nn1-uiux-tasarim-v22 .ux-btn:hover::before,n1-uiux-tasarim-v22 .ux-btn:focus-visible::before{transform:scaleX(1)}\nn1-uiux-tasarim-v22 .ux-btn:hover .ux-btn__ico,n1-uiux-tasarim-v22 .ux-btn:focus-visible .ux-btn__ico{background:rgba(10,11,11,.12)}\n.n1h-panel[data-n1-ux],.n1h-panel[data-n1-ux] *,.n1h-panel[data-n1-ux] *::before,.n1h-panel[data-n1-ux] *::after{box-sizing:border-box}\n.n1h-panel[data-n1-ux] a.n1h-item{text-decoration:none;color:#ecebe6}\n.n1h-panel[data-n1-ux] .n1h-sub a{text-decoration:none}\n@media (max-width:1024px){.n1h-panel[data-n1-ux][data-open]::before{content:\"\";position:fixed;left:0;right:0;bottom:0;top:72px;z-index:-1;pointer-events:none;background:rgba(8,10,9,.8);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}}\n@media (max-width:767px){.n1h-panel[data-n1-ux][data-open]::before{top:64px}}\nn1-uiux-tasarim-v22 .n1ft-partner-art{display:none}\nn1-uiux-tasarim-v22 .ux-head{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:end}\nn1-uiux-tasarim-v22 .ux-head .ux-label,n1-uiux-tasarim-v22 .ux-head .ux-h2{grid-column:1/9}\nn1-uiux-tasarim-v22 .ux-lede{grid-column:9/13;grid-row:2;max-width:34ch;font-size:clamp(17px,1.3vw,22px);line-height:1.5;color:var(--soft)}\nn1-uiux-tasarim-v22 .ux-cap{margin-top:14px;font-size:14px;line-height:1.5;color:var(--mute)}\nn1-uiux-tasarim-v22 .ux-note{margin-top:14px;font-size:14px;line-height:1.5;color:var(--mute)}\nn1-uiux-tasarim-v22 .ux-sr{position:absolute!important;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}\nn1-uiux-tasarim-v22 .ux-link{display:inline;padding:0;font:inherit;color:var(--acc);text-decoration:underline;text-underline-offset:3px;cursor:pointer}\nn1-uiux-tasarim-v22 .ux-ico{width:16px;height:16px}\nn1-uiux-tasarim-v22 .ux-spin{animation:ux-rot .8s linear infinite}\nn1-uiux-tasarim-v22 .ux-seg{margin:22px 0 0;padding:0;border:0;min-width:0}\nn1-uiux-tasarim-v22 .ux-seg__l{padding:0;margin-bottom:10px;font:500 14px/1.3 Barlow,Arial,sans-serif;color:var(--mute)}\nn1-uiux-tasarim-v22 .ux-seg__o{display:inline-flex;flex-wrap:wrap;gap:4px;padding:4px;border-radius:12px;background:#151816;border:1px solid var(--line)}\nn1-uiux-tasarim-v22 .ux-seg__i{position:relative;display:block;cursor:pointer}\nn1-uiux-tasarim-v22 .ux-seg__i input{position:absolute;inset:0;width:100%;height:100%;margin:0;opacity:0;cursor:pointer}\nn1-uiux-tasarim-v22 .ux-seg__i span{display:flex;align-items:center;justify-content:center;min-width:44px;min-height:44px;padding:0 18px;border-radius:9px;font:600 15px/1 Barlow,Arial,sans-serif;color:var(--soft);transition:background-color .35s var(--ease),color .35s var(--ease)}\nn1-uiux-tasarim-v22 .ux-seg__i input:checked+span{background:var(--acc);color:#0A0B0B}\nn1-uiux-tasarim-v22 .ux-seg__i:hover input:not(:checked)+span{color:var(--ink);background:rgba(236,235,229,.06)}\nn1-uiux-tasarim-v22 .ux-seg__i input:focus-visible+span{outline:2px solid var(--ink);outline-offset:2px}\nn1-uiux-tasarim-v22 .ux-sw{display:inline-flex;align-items:center;gap:14px;min-height:44px;margin-top:18px;padding:0;text-align:left;color:var(--ink);font:500 15px/1.3 Barlow,Arial,sans-serif}\nn1-uiux-tasarim-v22 .ux-sw__t{position:relative;flex:none;width:48px;height:28px;border-radius:14px;background:#2A2E2B;border:1px solid rgba(236,235,229,.24);transition:background-color .3s var(--ease)}\nn1-uiux-tasarim-v22 .ux-sw__k{position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:var(--ink);transition:transform .3s var(--ease)}\nn1-uiux-tasarim-v22 .ux-sw[aria-checked=\"true\"] .ux-sw__t{background:var(--acc);border-color:var(--acc)}\nn1-uiux-tasarim-v22 .ux-sw[aria-checked=\"true\"] .ux-sw__k{transform:translateX(20px);background:#0A0B0B}\nn1-uiux-tasarim-v22 .ux-screen{--p:#EFEEE9;--pi:#151716;--pm:#53564F;--pl:#CFCEC7;position:relative;padding:clamp(18px,2vw,30px);border-radius:12px;background:var(--p);color:var(--pi)}\nn1-uiux-tasarim-v22 .ux-tag{margin-bottom:16px;font:500 12px/1.3 Barlow,Arial,sans-serif;letter-spacing:.02em;color:var(--pm)}\nn1-uiux-tasarim-v22 .ux-screen :focus-visible{outline:2px solid #151716;outline-offset:3px}\nn1-uiux-tasarim-v22 .ux-btn-s{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:44px;padding:0 20px;border-radius:10px;background:#151716;color:#F4F3EE;font:600 15px/1 Barlow,Arial,sans-serif;transition:transform .2s var(--ease),background-color .3s var(--ease)}\nn1-uiux-tasarim-v22 .ux-btn-s:hover{background:#2B2F2C}\nn1-uiux-tasarim-v22 .ux-btn-s:active{transform:scale(.97)}\nn1-uiux-tasarim-v22 .ux-btn-s--ghost{background:transparent;color:#151716;box-shadow:inset 0 0 0 1px var(--pl)}\nn1-uiux-tasarim-v22 .ux-btn-s--ghost:hover{background:rgba(21,23,22,.06)}\nn1-uiux-tasarim-v22 .ux-dp__info .ux-btn-s{background:var(--acc);color:#0A0B0B}\nn1-uiux-tasarim-v22 .ux-dp__info .ux-btn-s:hover{background:#B8DA7A}\nn1-uiux-tasarim-v22 .ux-btn-d{display:inline-flex;align-items:center;gap:10px;min-height:44px;margin-top:26px;padding:0 16px;border-radius:10px;border:1px solid var(--line);color:var(--ink);font:500 15px/1 Barlow,Arial,sans-serif;transition:border-color .3s var(--ease)}\nn1-uiux-tasarim-v22 .ux-btn-d:hover{border-color:var(--acc)}\nn1-uiux-tasarim-v22 .ux-hero{position:relative;padding:calc(var(--hdr) + clamp(26px,3vw,54px)) 0 clamp(80px,7vw,130px);overflow:hidden}\nn1-uiux-tasarim-v22 .ux-hero__grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap)}\nn1-uiux-tasarim-v22 .ux-kicker{grid-column:1/-1;display:flex;flex-wrap:wrap;gap:6px 28px;font:500 14px/1.3 Barlow,Arial,sans-serif;letter-spacing:.04em;color:var(--mute)}\nn1-uiux-tasarim-v22 .ux-kicker span:first-child{color:var(--ink)}\nn1-uiux-tasarim-v22 .ux-hero__title{position:relative;grid-column:1/8;grid-row:2;align-self:start;margin-top:clamp(30px,3.4vw,64px);padding-bottom:.08em;font:700 clamp(84px,12vw,236px)/.9 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:-.018em;color:var(--ink)}\nn1-uiux-tasarim-v22 .ux-tl{display:block;white-space:nowrap}\nn1-uiux-tasarim-v22 .ux-base{position:absolute;left:0;right:0;bottom:0;height:2px;background:var(--acc);transform-origin:0 50%;opacity:.9}\nn1-uiux-tasarim-v22 .ux-spot{grid-column:9/-1;grid-row:2/4;align-self:start;margin-top:clamp(34px,3.6vw,70px)}\nn1-uiux-tasarim-v22 .ux-spot__frame{position:relative;aspect-ratio:3/4;overflow:hidden;border-radius:6px;background:var(--g1)}\nn1-uiux-tasarim-v22 .ux-spot__img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}\nn1-uiux-tasarim-v22 .ux-hero__foot{grid-column:1/9;grid-row:3;display:grid;grid-template-columns:repeat(8,minmax(0,1fr));column-gap:var(--gap);align-items:end;margin-top:clamp(40px,4vw,80px)}\nn1-uiux-tasarim-v22 .ux-hero__msg{grid-column:1/6;font:700 clamp(40px,4.4vw,86px)/1 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:-.01em;color:var(--ink)}\nn1-uiux-tasarim-v22 .ux-hm{display:block}\nn1-uiux-tasarim-v22 .ux-hm--b{margin-top:.18em}\nn1-uiux-tasarim-v22 .ux-hero__side{grid-column:6/9}\nn1-uiux-tasarim-v22 .ux-hero__sub{font-size:clamp(16px,1.15vw,19px);line-height:1.55;color:var(--soft)}\nn1-uiux-tasarim-v22 .ux-scroll{display:inline-flex;align-items:center;gap:12px;min-height:44px;margin-top:18px;font:500 15px/1.3 Barlow,Arial,sans-serif;color:var(--ink);text-decoration:none}\nn1-uiux-tasarim-v22 .ux-scroll .ux-ico{color:var(--acc);transition:transform .4s var(--ease)}\nn1-uiux-tasarim-v22 .ux-scroll:hover .ux-ico{transform:translateY(3px)}\nn1-uiux-tasarim-v22 .ux-vs{margin-top:clamp(56px,5vw,96px);overflow:hidden;padding:8px 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}\nn1-uiux-tasarim-v22 .ux-vs p{white-space:nowrap}\nn1-uiux-tasarim-v22 .ux-vs__en{width:90%;margin:6px auto 0;font:500 14px/1 Barlow,Arial,sans-serif;color:var(--mute)}\nn1-uiux-tasarim-v22 .ux-vs__a,n1-uiux-tasarim-v22 .ux-vs__b{font:700 clamp(84px,12vw,230px)/1 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:-.016em;will-change:transform}\nn1-uiux-tasarim-v22 .ux-vs__a{color:transparent;-webkit-text-stroke:1px rgba(236,235,229,.42);padding-left:5vw}\nn1-uiux-tasarim-v22 .ux-vs__b{color:var(--ink);text-align:right;padding-right:5vw}\nn1-uiux-tasarim-v22 .ux-feel__body{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:start;margin-top:clamp(56px,5vw,96px)}\nn1-uiux-tasarim-v22 .ux-feel__fig{grid-column:1/6}\nn1-uiux-tasarim-v22 .ux-feel__img{width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:6px;background:var(--g1)}\nn1-uiux-tasarim-v22 .ux-qs{grid-column:7/13;border-top:1px solid var(--line)}\nn1-uiux-tasarim-v22 .ux-q{padding:clamp(24px,2.2vw,40px) 0;border-bottom:1px solid var(--line)}\nn1-uiux-tasarim-v22 .ux-q__a{display:block;font:500 14px/1 Barlow,Arial,sans-serif;color:var(--acc)}\nn1-uiux-tasarim-v22 .ux-q__q{margin-top:14px;font:700 clamp(28px,2.5vw,46px)/1.08 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;color:var(--ink)}\nn1-uiux-tasarim-v22 .ux-q__d{margin-top:12px;max-width:44ch;font-size:16px;line-height:1.55;color:var(--soft)}\nn1-uiux-tasarim-v22 .ux-demo{margin-top:clamp(56px,5vw,96px)}\nn1-uiux-tasarim-v22 .ux-dtabs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));column-gap:var(--gap);border-top:1px solid var(--line)}\nn1-uiux-tasarim-v22 .ux-dtab{position:relative;display:grid;grid-template-columns:auto 1fr;column-gap:14px;align-items:baseline;min-height:44px;padding:22px 0 20px;text-align:left;color:var(--mute);transition:color .4s var(--ease)}\nn1-uiux-tasarim-v22 .ux-dtab::before{content:\"\";position:absolute;left:0;right:0;top:-1px;height:3px;background:var(--acc);transform:scaleX(0);transform-origin:0 50%;transition:transform .6s var(--ease)}\nn1-uiux-tasarim-v22 .ux-dtab[aria-selected=\"true\"]{color:var(--ink)}\nn1-uiux-tasarim-v22 .ux-dtab[aria-selected=\"true\"]::before{transform:scaleX(1)}\nn1-uiux-tasarim-v22 .ux-dtab:hover{color:var(--soft)}\nn1-uiux-tasarim-v22 .ux-dtab__n{font:500 14px/1 Barlow,Arial,sans-serif}\nn1-uiux-tasarim-v22 .ux-dtab[aria-selected=\"true\"] .ux-dtab__n{color:var(--acc)}\nn1-uiux-tasarim-v22 .ux-dtab__k{font:700 clamp(30px,2.8vw,52px)/1 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif}\nn1-uiux-tasarim-v22 .ux-dtab__d{grid-column:2;margin-top:8px;font-size:15px;line-height:1.4;color:var(--mute)}\nn1-uiux-tasarim-v22 .ux-dp{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:start;margin-top:clamp(32px,3vw,56px)}\nn1-uiux-tasarim-v22 .ux-dp[hidden]{display:none}\nn1-uiux-tasarim-v22 .ux-dp:focus-visible{outline:2px solid var(--acc);outline-offset:8px}\nn1-uiux-tasarim-v22 .ux-dp__info{grid-column:1/5}\nn1-uiux-tasarim-v22 .ux-dp__t{font:700 clamp(28px,2.4vw,44px)/1.06 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;color:var(--ink)}\nn1-uiux-tasarim-v22 .ux-dp__p{margin-top:16px;font-size:16px;line-height:1.6;color:var(--soft)}\nn1-uiux-tasarim-v22 .ux-dp__p b{font-weight:600;color:var(--ink)}\nn1-uiux-tasarim-v22 .ux-dp__row{margin-top:22px}\nn1-uiux-tasarim-v22 .ux-dp__res{min-height:1.5em;margin-top:18px;font:600 16px/1.5 Barlow,Arial,sans-serif;color:var(--ink)}\nn1-uiux-tasarim-v22 .ux-times{display:flex;gap:28px;margin:16px 0 0}\nn1-uiux-tasarim-v22 .ux-times div{min-width:96px;padding-top:10px;border-top:1px solid var(--line)}\nn1-uiux-tasarim-v22 .ux-times dt{font-size:13px;color:var(--mute)}\nn1-uiux-tasarim-v22 .ux-times dd{margin:6px 0 0;font:700 28px/1 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;color:var(--ink)}\nn1-uiux-tasarim-v22 .ux-dp .ux-screen{grid-column:6/13}\nn1-uiux-tasarim-v22 .ux-ev{display:flex;flex-direction:column;gap:14px}\nn1-uiux-tasarim-v22 .ux-hit{display:block;width:100%;min-height:44px;padding:6px 8px;margin:0 -8px;border-radius:8px;text-align:left;color:inherit;transition:background-color .25s var(--ease),box-shadow .25s var(--ease)}\nn1-uiux-tasarim-v22 .ux-hit:hover{background:rgba(21,23,22,.05)}\nn1-uiux-tasarim-v22 .ux-hit.is-right{box-shadow:inset 0 0 0 2px #151716;background:var(--acc)!important;color:#0A0B0B!important}\nn1-uiux-tasarim-v22 .ux-hit.is-wrong{animation:ux-shake .35s var(--ease)}\nn1-uiux-tasarim-v22 .ux-ev__noise{display:none}\nn1-uiux-tasarim-v22 .ux-ev__title{font:700 clamp(26px,2.2vw,36px)/1.05 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif}\nn1-uiux-tasarim-v22 .ux-ev__desc{font-size:15px;line-height:1.5;color:var(--pm)}\nn1-uiux-tasarim-v22 .ux-ev__meta{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px 16px;padding:14px 0;border-top:1px solid var(--pl);border-bottom:1px solid var(--pl)}\nn1-uiux-tasarim-v22 .ux-ev__meta .ux-hit{margin:0;font:600 17px/1.25 Barlow,Arial,sans-serif}\nn1-uiux-tasarim-v22 .ux-ev__lb{display:block;margin-bottom:4px;font:500 13px/1 Barlow,Arial,sans-serif;color:var(--pm)}\nn1-uiux-tasarim-v22 .ux-ev__time{font-size:22px!important}\nn1-uiux-tasarim-v22 .ux-ev__cta{display:flex;flex-wrap:wrap;align-items:center;gap:6px 18px}\nn1-uiux-tasarim-v22 .ux-ev__go{width:auto;margin:0;padding:0 22px;background:#151716;color:#F4F3EE;font:600 15px/1 Barlow,Arial,sans-serif;display:inline-flex;align-items:center}\nn1-uiux-tasarim-v22 .ux-ev__go:hover{background:#2B2F2C}\nn1-uiux-tasarim-v22 .ux-ev__x{width:auto;margin:0;font:500 15px/1 Barlow,Arial,sans-serif;text-decoration:underline;text-underline-offset:3px;color:var(--pi);display:inline-flex;align-items:center}\nn1-uiux-tasarim-v22 .ux-ev[data-mode=\"messy\"]{gap:6px;text-align:center;font-family:Arial,sans-serif}\nn1-uiux-tasarim-v22 .ux-ev[data-mode=\"messy\"] .ux-hit{text-align:center;margin:0}\nn1-uiux-tasarim-v22 .ux-ev[data-mode=\"messy\"] .ux-ev__noise{display:flex;flex-wrap:wrap;justify-content:center;gap:6px;font:700 11px/1 Arial,sans-serif}\nn1-uiux-tasarim-v22 .ux-ev[data-mode=\"messy\"] .ux-ev__noise span{padding:5px 7px;border-radius:3px;background:#D94F2B;color:#fff}\nn1-uiux-tasarim-v22 .ux-ev[data-mode=\"messy\"] .ux-ev__noise span:nth-child(2){background:#2B5BD9}\nn1-uiux-tasarim-v22 .ux-ev[data-mode=\"messy\"] .ux-ev__noise span:nth-child(3){background:#E8B21D;color:#151716}\nn1-uiux-tasarim-v22 .ux-ev[data-mode=\"messy\"] .ux-ev__noise span:nth-child(4){background:#7A2BD9}\nn1-uiux-tasarim-v22 .ux-ev[data-mode=\"messy\"] .ux-ev__title{order:3;font:400 italic 16px/1.3 Georgia,serif;color:#7A2BD9}\nn1-uiux-tasarim-v22 .ux-ev[data-mode=\"messy\"] .ux-ev__desc{order:2;font:700 15px/1.3 Arial,sans-serif;color:#151716}\nn1-uiux-tasarim-v22 .ux-ev[data-mode=\"messy\"] .ux-ev__meta{order:4;display:flex;flex-wrap:wrap;justify-content:center;gap:4px;padding:6px 0;border:2px dashed #D94F2B}\nn1-uiux-tasarim-v22 .ux-ev[data-mode=\"messy\"] .ux-ev__meta .ux-hit{width:auto;min-width:44px;padding:4px 6px;font:400 13px/1.3 Arial,sans-serif;background:#E9E3D3}\nn1-uiux-tasarim-v22 .ux-ev[data-mode=\"messy\"] .ux-ev__lb{display:none}\nn1-uiux-tasarim-v22 .ux-ev[data-mode=\"messy\"] .ux-ev__time{order:4;font-size:12px!important}\nn1-uiux-tasarim-v22 .ux-ev[data-mode=\"messy\"] .ux-ev__price{order:1;font-weight:700!important;color:#D94F2B}\nn1-uiux-tasarim-v22 .ux-ev[data-mode=\"messy\"] .ux-ev__cta{order:5;justify-content:center;gap:6px}\nn1-uiux-tasarim-v22 .ux-ev[data-mode=\"messy\"] .ux-ev__go,n1-uiux-tasarim-v22 .ux-ev[data-mode=\"messy\"] .ux-ev__x{padding:0 12px;border-radius:3px;text-decoration:none;font:700 13px/1 Arial,sans-serif;color:#fff;background:#2B5BD9}\nn1-uiux-tasarim-v22 .ux-ev[data-mode=\"messy\"] .ux-ev__x2{background:#D94F2B}\nn1-uiux-tasarim-v22 .ux-fl{display:flex;flex-direction:column;gap:16px}\nn1-uiux-tasarim-v22 .ux-fl__bar{height:4px;border-radius:2px;background:var(--pl);overflow:hidden}\nn1-uiux-tasarim-v22 .ux-fl__bar i{display:block;height:100%;width:var(--w,33%);background:#151716;transition:width .5s var(--ease)}\nn1-uiux-tasarim-v22 .ux-fl__s{font:500 13px/1 Barlow,Arial,sans-serif;color:var(--pm)}\nn1-uiux-tasarim-v22 .ux-fl__t{margin-top:6px;font:700 clamp(24px,2vw,32px)/1.08 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif}\nn1-uiux-tasarim-v22 .ux-fl__h{margin-top:6px;font-size:15px;line-height:1.5;color:var(--pm)}\nn1-uiux-tasarim-v22 .ux-fl fieldset{margin:12px 0 0;padding:0;border:0;min-width:0}\nn1-uiux-tasarim-v22 .ux-fl legend{padding:0}\nn1-uiux-tasarim-v22 .ux-opts{display:grid;gap:8px}\nn1-uiux-tasarim-v22 .ux-opts--chips{grid-template-columns:repeat(auto-fill,minmax(96px,1fr))}\nn1-uiux-tasarim-v22 .ux-opt{position:relative;display:block;cursor:pointer}\nn1-uiux-tasarim-v22 .ux-opt input{position:absolute;inset:0;width:100%;height:100%;margin:0;opacity:0;cursor:pointer}\nn1-uiux-tasarim-v22 .ux-opt span{display:flex;align-items:center;min-height:48px;padding:10px 14px;border-radius:10px;background:#FBFAF7;box-shadow:inset 0 0 0 1px #85887F;font:500 15px/1.3 Barlow,Arial,sans-serif;transition:box-shadow .2s var(--ease),background-color .2s var(--ease)}\nn1-uiux-tasarim-v22 .ux-opt input:checked+span{background:var(--acc);box-shadow:inset 0 0 0 2px #151716;font-weight:600}\nn1-uiux-tasarim-v22 .ux-opt input:focus-visible+span{outline:2px solid #151716;outline-offset:2px}\nn1-uiux-tasarim-v22 .ux-fl__sum{display:grid;gap:8px;padding:14px;border-radius:10px;background:#FBFAF7;box-shadow:inset 0 0 0 1px var(--pl);font-size:15px}\nn1-uiux-tasarim-v22 .ux-fl__sum b{font-weight:600}\nn1-uiux-tasarim-v22 .ux-fl__done{display:flex;gap:12px;align-items:flex-start;padding:14px;border-radius:10px;background:var(--acc);color:#0A0B0B;font:600 16px/1.45 Barlow,Arial,sans-serif}\nn1-uiux-tasarim-v22 .ux-fl__done .ux-ico{flex:none;margin-top:3px}\nn1-uiux-tasarim-v22 .ux-fl__err{display:flex;gap:8px;align-items:flex-start;min-height:0;font:600 15px/1.4 Barlow,Arial,sans-serif;color:#A3261C}\nn1-uiux-tasarim-v22 .ux-fl__err:empty{display:none}\nn1-uiux-tasarim-v22 .ux-fl__nav{display:flex;justify-content:space-between;gap:10px}\nn1-uiux-tasarim-v22 .ux-fl__nav [hidden]{display:none}\nn1-uiux-tasarim-v22 .ux-fb{display:flex;flex-direction:column;gap:16px}\nn1-uiux-tasarim-v22 .ux-fb__file{display:flex;align-items:center;gap:14px;padding:12px 12px 12px 14px;border-radius:10px;background:#FBFAF7;box-shadow:inset 0 0 0 1px var(--pl);font-size:15px}\nn1-uiux-tasarim-v22 .ux-fb__file>span:nth-child(2){flex:1;display:flex;flex-direction:column;gap:3px}\nn1-uiux-tasarim-v22 .ux-fb__ext{display:grid;place-items:center;width:40px;height:44px;border-radius:6px;background:#151716;color:#F4F3EE;font:700 11px/1 Barlow,Arial,sans-serif}\nn1-uiux-tasarim-v22 .ux-fb__sz{font-size:13px;color:var(--pm)}\nn1-uiux-tasarim-v22 .ux-fb__save{display:grid;place-items:center;width:44px;height:44px;border-radius:10px;color:#151716;transition:background-color .25s var(--ease)}\nn1-uiux-tasarim-v22 .ux-fb__save:hover{background:rgba(21,23,22,.07)}\nn1-uiux-tasarim-v22 .ux-fb__save[aria-pressed=\"true\"] svg{fill:#151716}\nn1-uiux-tasarim-v22 .ux-fb[data-fb=\"off\"] .ux-fb__save svg{fill:none!important}\nn1-uiux-tasarim-v22 .ux-fb__send{position:relative;display:flex;align-items:center;justify-content:center;gap:10px;min-height:52px;border-radius:12px;background:#151716;color:#F4F3EE;font:600 16px/1 Barlow,Arial,sans-serif;transition:background-color .3s var(--ease),transform .2s var(--ease)}\nn1-uiux-tasarim-v22 .ux-fb__send:active{transform:scale(.98)}\nn1-uiux-tasarim-v22 .ux-fb__ic{display:none}\nn1-uiux-tasarim-v22 .ux-fb__ic .ux-ico{display:none}\nn1-uiux-tasarim-v22 .ux-fb__send[data-st=\"busy\"] .ux-fb__ic,n1-uiux-tasarim-v22 .ux-fb__send[data-st=\"done\"] .ux-fb__ic,n1-uiux-tasarim-v22 .ux-fb__send[data-st=\"fail\"] .ux-fb__ic{display:block}\nn1-uiux-tasarim-v22 .ux-fb__send[data-st=\"busy\"] .ux-spin{display:block}\nn1-uiux-tasarim-v22 .ux-fb__send[data-st=\"done\"] .ux-fb__ic .ux-ico:nth-child(2){display:block}\nn1-uiux-tasarim-v22 .ux-fb__send[data-st=\"fail\"] .ux-fb__ic .ux-ico:nth-child(3){display:block}\nn1-uiux-tasarim-v22 .ux-fb__send[data-st=\"busy\"]{background:#3A3F3B;cursor:progress}\nn1-uiux-tasarim-v22 .ux-fb__send[data-st=\"done\"]{background:var(--acc);color:#0A0B0B}\nn1-uiux-tasarim-v22 .ux-fb__send[data-st=\"fail\"]{background:#A3261C}\nn1-uiux-tasarim-v22 .ux-fb[data-fb=\"off\"] .ux-fb__send{background:#151716!important;color:#F4F3EE!important;cursor:pointer}\nn1-uiux-tasarim-v22 .ux-fb[data-fb=\"off\"] .ux-fb__ic{display:none!important}\nn1-uiux-tasarim-v22 .ux-fb__msg{min-height:1.5em;font:600 15px/1.45 Barlow,Arial,sans-serif}\nn1-uiux-tasarim-v22 .ux-fb__msg.is-fail{color:#A3261C}\nn1-uiux-tasarim-v22 .ux-toast{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:8px 8px 8px 16px;border-radius:12px;background:#151716;color:#F4F3EE;font:500 15px/1.3 Barlow,Arial,sans-serif}\nn1-uiux-tasarim-v22 .ux-toast[hidden]{display:none}\nn1-uiux-tasarim-v22 .ux-toast__u{min-height:44px;padding:0 14px;border-radius:8px;color:var(--acc);font:600 15px/1 Barlow,Arial,sans-serif}\nn1-uiux-tasarim-v22 .ux-toast__u:focus-visible{outline:2px solid #F4F3EE!important}\nn1-uiux-tasarim-v22 .ux-proc__grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);margin-top:clamp(56px,5vw,96px)}\nn1-uiux-tasarim-v22 .ux-proc__stage{grid-column:1/7;position:sticky;top:calc(var(--hdr) + 24px);align-self:start}\nn1-uiux-tasarim-v22 .ux-proc__frame{position:relative;aspect-ratio:4/5;max-height:calc(100vh - var(--hdr) - 190px);width:100%;overflow:hidden;border-radius:6px;background:var(--g1)}\nn1-uiux-tasarim-v22 .ux-proc__img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transform:scale(1.06);transition:opacity .8s var(--ease),transform 1.4s var(--ease)}\nn1-uiux-tasarim-v22 .ux-proc__img.is-on{opacity:1;transform:scale(1)}\nn1-uiux-tasarim-v22 .ux-proc__img.ux-crop{transform-origin:64% 30%;transform:scale(1.8)}\nn1-uiux-tasarim-v22 .ux-proc__img.ux-crop.is-on{transform:scale(1.7)}\nn1-uiux-tasarim-v22 .ux-proc__big{display:flex;align-items:baseline;gap:14px;margin-top:18px;font:700 clamp(48px,5.4vw,108px)/1 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:-.014em;color:var(--ink);white-space:nowrap}\nn1-uiux-tasarim-v22 .ux-proc__n{font:500 16px/1 Barlow,Arial,sans-serif;color:var(--acc)}\nn1-uiux-tasarim-v22 .ux-proc__list{grid-column:8/13}\nn1-uiux-tasarim-v22 .ux-st{display:flex;flex-direction:column;justify-content:center;min-height:min(62vh,620px);padding:28px 0;border-top:1px solid var(--line);color:var(--mute);transition:color .5s var(--ease)}\nn1-uiux-tasarim-v22 .ux-st.is-on{color:var(--ink)}\nn1-uiux-tasarim-v22 .ux-st__fig{display:none}\nn1-uiux-tasarim-v22 .ux-st__n{font:500 14px/1.3 Barlow,Arial,sans-serif;color:var(--mute)}\nn1-uiux-tasarim-v22 .ux-st__n span{margin-left:8px}\nn1-uiux-tasarim-v22 .ux-st.is-on .ux-st__n{color:var(--acc)}\nn1-uiux-tasarim-v22 .ux-st__k{margin-top:14px;font:700 clamp(34px,3vw,58px)/1 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif}\nn1-uiux-tasarim-v22 .ux-st__d{margin-top:14px;max-width:36ch;font-size:clamp(17px,1.25vw,21px);line-height:1.5;color:var(--soft)}\nn1-uiux-tasarim-v22 .ux-lab__grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:start;margin-top:clamp(48px,4.4vw,84px)}\nn1-uiux-tasarim-v22 .ux-lab__ctl{grid-column:1/5}\nn1-uiux-tasarim-v22 .ux-lab__ctl .ux-seg:first-child{margin-top:0}\nn1-uiux-tasarim-v22 .ux-lab__out{grid-column:6/13}\nn1-uiux-tasarim-v22 .ux-screen--lab{transition:background-color .4s var(--ease)}\nn1-uiux-tasarim-v22 .ux-spec{--sp:24px;--gp:14px;display:flex;flex-direction:column;gap:var(--gp);padding:var(--sp);border-radius:10px;background:#FBFAF7;box-shadow:0 1px 0 var(--pl),0 10px 30px rgba(21,23,22,.06);transition:padding .45s var(--ease),gap .45s var(--ease)}\nn1-uiux-tasarim-v22 .ux-spec[data-space=\"compact\"]{--sp:10px;--gp:3px}\nn1-uiux-tasarim-v22 .ux-spec[data-space=\"spacious\"]{--sp:clamp(24px,2.6vw,40px);--gp:16px}\nn1-uiux-tasarim-v22 .ux-spec__k{font:500 13px/1.3 Barlow,Arial,sans-serif;color:#53564F}\nn1-uiux-tasarim-v22 .ux-spec__t{font:700 clamp(26px,2.4vw,40px)/1.06 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;color:#151716}\nn1-uiux-tasarim-v22 .ux-spec__p{max-width:52ch;font-size:16px;line-height:1.6;color:#3E413C}\nn1-uiux-tasarim-v22 .ux-spec[data-space=\"compact\"] .ux-spec__p{line-height:1.3}\nn1-uiux-tasarim-v22 .ux-spec[data-type=\"flat\"] .ux-spec__k,n1-uiux-tasarim-v22 .ux-spec[data-type=\"flat\"] .ux-spec__t,n1-uiux-tasarim-v22 .ux-spec[data-type=\"flat\"] .ux-spec__p{font:400 15px/1.45 Barlow,Arial,sans-serif;color:#3E413C}\nn1-uiux-tasarim-v22 .ux-spec[data-contrast=\"low\"] .ux-spec__k,n1-uiux-tasarim-v22 .ux-spec[data-contrast=\"low\"] .ux-spec__t,n1-uiux-tasarim-v22 .ux-spec[data-contrast=\"low\"] .ux-spec__p{color:#BDBCB5}\nn1-uiux-tasarim-v22 .ux-spec[data-contrast=\"low\"] .ux-spec__b1{background:#D9D8D2;color:#FBFAF7}\nn1-uiux-tasarim-v22 .ux-spec[data-contrast=\"low\"] .ux-spec__b2{color:#BDBCB5;box-shadow:inset 0 0 0 1px #E2E1DB}\nn1-uiux-tasarim-v22 .ux-spec__cta{display:flex;flex-wrap:wrap;gap:10px;margin-top:6px}\nn1-uiux-tasarim-v22 .ux-spec[data-space=\"compact\"] .ux-spec__cta{gap:2px;margin-top:0}\nn1-uiux-tasarim-v22 .ux-spec__b1,n1-uiux-tasarim-v22 .ux-spec__b2{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:44px;padding:0 18px;border-radius:10px;font:600 15px/1 Barlow,Arial,sans-serif}\nn1-uiux-tasarim-v22 .ux-spec__b1{background:#151716;color:#F4F3EE}\nn1-uiux-tasarim-v22 .ux-spec__b2{color:#151716;box-shadow:inset 0 0 0 1px #9FA19A}\nn1-uiux-tasarim-v22 .ux-spec[data-behave=\"live\"] .ux-spec__b1,n1-uiux-tasarim-v22 .ux-spec[data-behave=\"live\"] .ux-spec__b2{transition:transform .18s var(--ease),background-color .25s var(--ease),box-shadow .25s var(--ease)}\nn1-uiux-tasarim-v22 .ux-spec[data-behave=\"live\"] .ux-spec__b1:hover{background:#2F3430}\nn1-uiux-tasarim-v22 .ux-spec[data-behave=\"live\"] .ux-spec__b2:hover{box-shadow:inset 0 0 0 2px #151716}\nn1-uiux-tasarim-v22 .ux-spec[data-behave=\"live\"] .ux-spec__b1:active,n1-uiux-tasarim-v22 .ux-spec[data-behave=\"live\"] .ux-spec__b2:active{transform:scale(.96)}\nn1-uiux-tasarim-v22 .ux-spec[data-behave=\"live\"] .ux-spec__b2[aria-pressed=\"true\"]{background:var(--acc);color:#0A0B0B;box-shadow:inset 0 0 0 2px #151716}\nn1-uiux-tasarim-v22 .ux-spec__fb{min-height:1.4em;font:600 14px/1.4 Barlow,Arial,sans-serif;color:#151716}\nn1-uiux-tasarim-v22 .ux-spec[data-space=\"compact\"] .ux-spec__fb{min-height:1.2em}\nn1-uiux-tasarim-v22 .ux-lab__read{margin-top:18px}\nn1-uiux-tasarim-v22 .ux-lab__ratio{display:flex;flex-wrap:wrap;align-items:baseline;gap:6px 14px;font-size:15px;color:var(--soft)}\nn1-uiux-tasarim-v22 .ux-lab__ratio b{font:700 34px/1 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;color:var(--ink)}\nn1-uiux-tasarim-v22 .ux-lab__warn{margin-top:10px;padding:12px 14px;border-radius:10px;background:rgba(227,111,90,.12);border:1px solid rgba(227,111,90,.5);font-size:15px;line-height:1.5;color:var(--ink)}\nn1-uiux-tasarim-v22 .ux-lab__warn[hidden]{display:none}\nn1-uiux-tasarim-v22 .ux-lab__why{margin-top:12px;max-width:60ch;font-size:15px;line-height:1.55;color:var(--soft)}\nn1-uiux-tasarim-v22 .ux-scope__grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:start;margin-top:clamp(56px,5vw,96px)}\nn1-uiux-tasarim-v22 .ux-scope__fig{grid-column:1/6;position:sticky;top:calc(var(--hdr) + 24px)}\nn1-uiux-tasarim-v22 .ux-scope__img{width:100%;aspect-ratio:4/5;max-height:calc(100vh - var(--hdr) - 120px);object-fit:cover;border-radius:6px;background:var(--g1)}\nn1-uiux-tasarim-v22 .ux-svc{grid-column:7/13;border-top:1px solid var(--line)}\nn1-uiux-tasarim-v22 .ux-svc__i{display:grid;grid-template-columns:48px 1fr;column-gap:12px;row-gap:6px;padding:20px 0;border-bottom:1px solid var(--line)}\nn1-uiux-tasarim-v22 .ux-svc__n{grid-row:1/3;padding-top:.45em;font:500 14px/1 Barlow,Arial,sans-serif;color:var(--mute)}\nn1-uiux-tasarim-v22 .ux-svc__k{font:700 clamp(28px,2.4vw,44px)/1.04 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;color:var(--ink)}\nn1-uiux-tasarim-v22 .ux-svc__d{font-size:16px;line-height:1.5;color:var(--soft)}\nn1-uiux-tasarim-v22 .ux-acc__grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:start;margin-top:clamp(48px,4.4vw,84px)}\nn1-uiux-tasarim-v22 .ux-acc__list{grid-column:1/6;border-top:1px solid var(--line)}\nn1-uiux-tasarim-v22 .ux-acc__list li{padding:16px 0;border-bottom:1px solid var(--line2)}\nn1-uiux-tasarim-v22 .ux-acc__list b{display:block;font:600 18px/1.3 Barlow,Arial,sans-serif;color:var(--ink)}\nn1-uiux-tasarim-v22 .ux-acc__list span{display:block;margin-top:5px;font-size:15px;line-height:1.5;color:var(--soft)}\nn1-uiux-tasarim-v22 .ux-acc__demo{grid-column:7/13}\nn1-uiux-tasarim-v22 .ux-screen--acc{margin-top:22px;transition:filter .4s var(--ease)}\nn1-uiux-tasarim-v22 .ux-screen--acc.is-gray{filter:grayscale(1)}\nn1-uiux-tasarim-v22 .ux-sub__l{display:block;font:600 15px/1.3 Barlow,Arial,sans-serif}\nn1-uiux-tasarim-v22 .ux-sub__row{display:flex;flex-wrap:wrap;gap:10px;margin-top:10px}\nn1-uiux-tasarim-v22 .ux-sub__in{flex:1 1 220px;min-width:0;min-height:48px;padding:0 14px;border-radius:10px;border:1px solid #85887F;background:#FBFAF7;color:#151716;font:400 16px/1.2 Barlow,Arial,sans-serif}\nn1-uiux-tasarim-v22 .ux-sub__in::placeholder{color:#6A6D66}\nn1-uiux-tasarim-v22 .ux-sub__in:focus-visible{outline:2px solid #151716;outline-offset:2px}\nn1-uiux-tasarim-v22 .ux-sub__in[aria-invalid=\"true\"],n1-uiux-tasarim-v22 .ux-sub.is-bad .ux-sub__in{border:2px solid #C4372B;background:#FBEDEA}\nn1-uiux-tasarim-v22 .ux-sub__err{display:flex;gap:8px;align-items:flex-start;min-height:0;margin-top:10px;font:600 15px/1.45 Barlow,Arial,sans-serif;color:#A3261C}\nn1-uiux-tasarim-v22 .ux-sub__err:empty{display:none}\nn1-uiux-tasarim-v22 .ux-sub__err .ux-ico{flex:none;margin-top:2px}\nn1-uiux-tasarim-v22 .ux-sub[data-mode=\"color\"] .ux-sub__err{display:none}\nn1-uiux-tasarim-v22 .ux-sub__ok{min-height:0;margin-top:10px;font:600 15px/1.45 Barlow,Arial,sans-serif}\nn1-uiux-tasarim-v22 .ux-sub__ok:empty{display:none}\nn1-uiux-tasarim-v22 .ux-man__grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:end;margin-top:clamp(26px,2.4vw,40px)}\nn1-uiux-tasarim-v22 .ux-man__t{grid-column:1/9;font:700 clamp(64px,8vw,160px)/.98 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:-.014em}\nn1-uiux-tasarim-v22 .ux-man__a{display:block;color:var(--mute)}\nn1-uiux-tasarim-v22 .ux-mw{display:block;white-space:nowrap}\nn1-uiux-tasarim-v22 .ux-man__b{position:relative;display:block;margin-top:.24em;padding-bottom:.1em;color:var(--ink)}\nn1-uiux-tasarim-v22 .ux-man__line{position:absolute;left:0;bottom:0;width:62%;height:3px;background:var(--acc);transform-origin:0 50%}\nn1-uiux-tasarim-v22 .ux-man__fig{grid-column:10/13;align-self:center}\nn1-uiux-tasarim-v22 .ux-man__img{width:100%;aspect-ratio:3/4;object-fit:cover;border-radius:6px;background:var(--g1)}\nn1-uiux-tasarim-v22 .ux-man__p{max-width:52ch;margin-top:clamp(40px,3.6vw,68px);font-size:clamp(18px,1.35vw,22px);line-height:1.55;color:var(--soft)}\nn1-uiux-tasarim-v22 .ux-fin{position:relative;padding:var(--secpad) 0 clamp(110px,9vw,170px);border-top:1px solid var(--line);overflow:hidden}\nn1-uiux-tasarim-v22 .ux-fin__grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:end}\nn1-uiux-tasarim-v22 .ux-fin__copy{grid-column:1/9}\nn1-uiux-tasarim-v22 .ux-fin__t{margin-top:clamp(26px,2.4vw,40px);font:700 clamp(64px,7.6vw,150px)/1 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:-.014em;color:var(--ink)}\nn1-uiux-tasarim-v22 .ux-fin__sub{margin-top:30px;max-width:48ch;font-size:clamp(18px,1.3vw,22px);line-height:1.55;color:var(--soft)}\nn1-uiux-tasarim-v22 .ux-fin__cta{display:flex;flex-wrap:wrap;gap:14px;margin-top:40px}\nn1-uiux-tasarim-v22 .ux-fin__fig{grid-column:10/13}\nn1-uiux-tasarim-v22 .ux-fin__img{width:100%;aspect-ratio:3/4;object-fit:cover;border-radius:6px;background:var(--g1)}\n@keyframes ux-rot{to{transform:rotate(360deg)}}\n@keyframes ux-shake{25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}\n@media (max-width:1024px){\nn1-uiux-tasarim-v22 .ux-hero__title{grid-column:1/8;font-size:clamp(76px,12.6vw,140px)}\nn1-uiux-tasarim-v22 .ux-spot{grid-column:8/-1;grid-row:2;margin-top:clamp(34px,4vw,56px)}\nn1-uiux-tasarim-v22 .ux-hero__foot{grid-column:1/-1;grid-row:3;grid-template-columns:repeat(12,minmax(0,1fr))}\nn1-uiux-tasarim-v22 .ux-hero__msg{grid-column:1/8;font-size:clamp(40px,6vw,64px)}\nn1-uiux-tasarim-v22 .ux-hero__side{grid-column:8/13}\nn1-uiux-tasarim-v22 .ux-head .ux-label,n1-uiux-tasarim-v22 .ux-head .ux-h2{grid-column:1/-1}\nn1-uiux-tasarim-v22 .ux-lede{grid-column:1/10;grid-row:3;margin-top:28px}\nn1-uiux-tasarim-v22 .ux-feel__fig{grid-column:1/6}\nn1-uiux-tasarim-v22 .ux-qs{grid-column:6/13}\nn1-uiux-tasarim-v22 .ux-dp__info{grid-column:1/-1}\nn1-uiux-tasarim-v22 .ux-dp .ux-screen{grid-column:1/-1;margin-top:28px}\nn1-uiux-tasarim-v22 .ux-dp__info{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:var(--gap)}\nn1-uiux-tasarim-v22 .ux-dp__info>*{grid-column:1/-1}\nn1-uiux-tasarim-v22 .ux-proc__stage{grid-column:1/7}\nn1-uiux-tasarim-v22 .ux-proc__list{grid-column:7/13}\nn1-uiux-tasarim-v22 .ux-proc__big{font-size:clamp(40px,6vw,64px)}\nn1-uiux-tasarim-v22 .ux-lab__ctl{grid-column:1/-1;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:var(--gap)}\nn1-uiux-tasarim-v22 .ux-lab__ctl .ux-seg:nth-child(2){margin-top:0}\nn1-uiux-tasarim-v22 .ux-lab__ctl .ux-btn-d{grid-column:1/-1;justify-self:start}\nn1-uiux-tasarim-v22 .ux-lab__out{grid-column:1/-1;margin-top:28px}\nn1-uiux-tasarim-v22 .ux-scope__fig{grid-column:1/6}\nn1-uiux-tasarim-v22 .ux-svc{grid-column:6/13}\nn1-uiux-tasarim-v22 .ux-acc__list{grid-column:1/-1;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:var(--gap)}\nn1-uiux-tasarim-v22 .ux-acc__demo{grid-column:1/-1;margin-top:48px}\nn1-uiux-tasarim-v22 .ux-man__t{grid-column:1/-1}\nn1-uiux-tasarim-v22 .ux-man__fig{grid-column:8/13;margin-top:40px}\nn1-uiux-tasarim-v22 .ux-fin__copy{grid-column:1/9}\nn1-uiux-tasarim-v22 .ux-fin__fig{grid-column:9/13}\nn1-uiux-tasarim-v22 .ux-fin__t{font-size:clamp(58px,8.4vw,92px)}\nn1-uiux-tasarim-v22 n1-header{display:block!important;position:fixed!important;top:0!important;left:0!important;right:0!important;width:100%!important;min-height:0!important;height:auto!important;z-index:900!important;background:rgba(8,10,9,.95);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);border-bottom:1px solid rgba(228,227,221,.07)}\nn1-uiux-tasarim-v22 n1-header .n1h-bar.site-container{display:grid!important;align-items:center!important;width:calc(100% - 48px)!important;margin-inline:auto!important;padding-inline:0!important;height:72px!important;max-width:100%!important}\nn1-uiux-tasarim-v22 n1-header .n1h-logo{margin:0!important;flex:none}\nn1-uiux-tasarim-v22 n1-header .n1h-logo img{width:32px!important;height:32px!important;max-width:none!important}\nn1-uiux-tasarim-v22 n1-header .n1h-right{align-items:center!important}\nn1-uiux-tasarim-v22 n1-header .n1h-menu{display:inline-flex!important;height:40px!important;margin:0!important}\nn1-uiux-tasarim-v22 n1-header .n1h-cta{display:none!important}\nn1-uiux-tasarim-v22 footer.n1ft .n1ft-partner{opacity:1!important;visibility:visible!important;transform:none!important}\n}\n@media (max-width:900px){n1-uiux-tasarim-v22 .n1ft-inner{width:90%}}\n@media (max-width:767px){\nn1-uiux-tasarim-v22{--gap:16px;--secpad:88px}\nn1-uiux-tasarim-v22 .ux-wrap{width:calc(100% - 40px)}\nn1-uiux-tasarim-v22 .ux-hero{padding-bottom:72px}\nn1-uiux-tasarim-v22 .ux-hero__title{grid-column:1/-1;margin-top:28px;font-size:clamp(66px,23vw,100px)}\nn1-uiux-tasarim-v22 .ux-spot{grid-column:1/-1;grid-row:4;margin-top:40px}\nn1-uiux-tasarim-v22 .ux-spot__frame{aspect-ratio:1/1}\nn1-uiux-tasarim-v22 .ux-spot__img{object-position:50% 42%}\nn1-uiux-tasarim-v22 .ux-hero__foot{grid-row:3;display:block;margin-top:30px}\nn1-uiux-tasarim-v22 .ux-hero__msg{font-size:clamp(38px,11.6vw,54px)}\nn1-uiux-tasarim-v22 .ux-hero__side{margin-top:26px}\nn1-uiux-tasarim-v22 .ux-h2{font-size:clamp(44px,13.4vw,64px)}\nn1-uiux-tasarim-v22 .ux-head{display:block}\nn1-uiux-tasarim-v22 .ux-lede{margin-top:22px;font-size:17px}\nn1-uiux-tasarim-v22 .ux-vs__a,n1-uiux-tasarim-v22 .ux-vs__b{font-size:22vw}\nn1-uiux-tasarim-v22 .ux-feel__body{display:block}\nn1-uiux-tasarim-v22 .ux-feel__fig{width:82%}\nn1-uiux-tasarim-v22 .ux-qs{margin-top:40px}\nn1-uiux-tasarim-v22 .ux-q__q{font-size:clamp(26px,7.6vw,34px)}\nn1-uiux-tasarim-v22 .ux-dtabs{grid-template-columns:1fr;row-gap:0}\nn1-uiux-tasarim-v22 .ux-dtab{padding:14px 0;border-bottom:1px solid var(--line2)}\nn1-uiux-tasarim-v22 .ux-dtab::before{top:auto;bottom:-1px}\nn1-uiux-tasarim-v22 .ux-dtab__d{margin-top:4px;font-size:14px}\nn1-uiux-tasarim-v22 .ux-dtab__k{font-size:30px}\nn1-uiux-tasarim-v22 .ux-dp__info{display:block}\nn1-uiux-tasarim-v22 .ux-dp .ux-screen{margin:24px -8px 0}\nn1-uiux-tasarim-v22 .ux-seg__o{display:flex}\nn1-uiux-tasarim-v22 .ux-seg__i{flex:1}\nn1-uiux-tasarim-v22 .ux-seg__i span{padding:0 10px}\nn1-uiux-tasarim-v22 .ux-ev__meta{grid-template-columns:1fr 1fr;gap:4px 10px}\nn1-uiux-tasarim-v22 .ux-proc__grid{display:block}\nn1-uiux-tasarim-v22 .ux-proc__stage{display:none}\nn1-uiux-tasarim-v22 .ux-st{min-height:0;padding:26px 0 30px;color:var(--ink)}\nn1-uiux-tasarim-v22 .ux-st__fig{display:block;margin-bottom:22px;overflow:hidden;border-radius:6px}\nn1-uiux-tasarim-v22 .ux-st__img.ux-crop{transform-origin:64% 30%;transform:scale(1.7)}\nn1-uiux-tasarim-v22 .ux-st__img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:6px;background:var(--g1)}\nn1-uiux-tasarim-v22 .ux-st__n{color:var(--acc)}\nn1-uiux-tasarim-v22 .ux-st__k{font-size:clamp(34px,10vw,46px)}\nn1-uiux-tasarim-v22 .ux-lab__ctl{display:block}\nn1-uiux-tasarim-v22 .ux-lab__ctl .ux-seg:nth-child(2){margin-top:22px}\nn1-uiux-tasarim-v22 .ux-screen--lab{margin:0 -8px}\nn1-uiux-tasarim-v22 .ux-scope__grid{display:block}\nn1-uiux-tasarim-v22 .ux-scope__fig{position:static;width:82%}\nn1-uiux-tasarim-v22 .ux-scope__img{max-height:none}\nn1-uiux-tasarim-v22 .ux-svc{margin-top:40px}\nn1-uiux-tasarim-v22 .ux-svc__i{grid-template-columns:36px 1fr}\nn1-uiux-tasarim-v22 .ux-svc__k{font-size:clamp(26px,7.6vw,34px)}\nn1-uiux-tasarim-v22 .ux-acc__list{display:block}\nn1-uiux-tasarim-v22 .ux-screen--acc{margin-left:-8px;margin-right:-8px}\nn1-uiux-tasarim-v22 .ux-man__t{font-size:clamp(44px,13.4vw,64px)}\nn1-uiux-tasarim-v22 .ux-man__grid{display:block}\nn1-uiux-tasarim-v22 .ux-man__fig{width:64%;margin:40px 0 0 auto}\nn1-uiux-tasarim-v22 .ux-fin__grid{display:block}\nn1-uiux-tasarim-v22 .ux-fin__t{font-size:clamp(44px,12.4vw,60px);line-height:.98}\nn1-uiux-tasarim-v22 .ux-fin__cta{flex-direction:column;gap:11px}\nn1-uiux-tasarim-v22 .ux-fin__fig{width:62%;margin:56px 0 0 auto}\nn1-uiux-tasarim-v22 .ux-btn{width:100%;height:56px;padding:0 7px 0 18px;font-size:12px}\nn1-uiux-tasarim-v22 .ux-btn__ico{width:42px;height:42px}\nn1-uiux-tasarim-v22 n1-header .n1h-bar.site-container{width:calc(100% - 40px)!important;height:64px!important}\nn1-uiux-tasarim-v22 n1-header .n1h-logo img{width:30px!important;height:30px!important}\nn1-uiux-tasarim-v22 .n1ft-inner{width:calc(100% - 40px)}\nn1-uiux-tasarim-v22 .n1ft-top{grid-template-columns:1fr!important;gap:32px;padding:39px 0 36px}\nn1-uiux-tasarim-v22 .n1ft-col--brand{grid-column:auto}\nn1-uiux-tasarim-v22 .n1ft-brand{font-size:45px}\n}\n@media (max-width:360px){n1-uiux-tasarim-v22 .ux-wrap,n1-uiux-tasarim-v22 .n1ft-inner{width:calc(100% - 32px)}n1-uiux-tasarim-v22 n1-header .n1h-bar.site-container{width:calc(100% - 32px)!important}}\n@media (prefers-reduced-motion:reduce){n1-uiux-tasarim-v22 .ux *,n1-uiux-tasarim-v22 .ux *::before,n1-uiux-tasarim-v22 .ux *::after{transition-duration:.01ms!important;transition-delay:0s!important;animation-duration:.01ms!important;animation-iteration-count:1!important}}";

  /* ---------- Bileşen ---------- */
  class UiuxTasarimV22 extends HTMLElement {
    connectedCallback() {
      if (this._on) return;
      this._on = true;
      this._cleanups = [];
      var base = this.getAttribute('deps-base');
      this._url = function (k) { return (base ? base.replace(/\/?$/, '/') + 'gh@' : CDN) + PATHS[k]; };
      this.classList.add('n1-inner-page');
      this._mount().catch((e) => {
        console.error('[' + TAG + ']', e);
        if (!this.querySelector('main.ux')) this.innerHTML = '<p style="padding:40px 5%;color:#ECEBE5;font:16px Barlow,Arial,sans-serif">UI/UX Tasarım yüklenemedi. Lütfen sayfayı yenileyin.</p>';
      });
    }

    _ev(el, ev, fn, opt) { if (!el) return; el.addEventListener(ev, fn, opt); this._cleanups.push(function () { el.removeEventListener(ev, fn, opt); }); }

    async _mount() {
      var self = this, url = this._url;
      if (!document.getElementById(STYLE_ID)) {
        var st = document.createElement('style'); st.id = STYLE_ID; st.textContent = CSS; document.head.appendChild(st);
      }
      this.innerHTML = '<div id="ust" style="height:0"></div>' + markup();
      this._anchors();
      this._demo();
      this._process();
      this._lab();
      this._a11y();

      var fonts = loadCss(FONTS).catch(function (e) { console.warn('[' + TAG + '] Font yüklenemedi, yedek font kullanılıyor', e); });
      await Promise.all([loadCss(url('footerCss')), loadCss(url('responsive')), loadJs(url('markup'), function () { return !!window.N1_SITE_MARKUP; })]);
      if (!this._on) return;

      var tpl = document.createElement('template');
      tpl.innerHTML = String(window.N1_SITE_MARKUP || '').split('{{ASSETS}}').join(url('assets'));
      var hdr = tpl.content.querySelector('n1-header'), ft = tpl.content.querySelector('[data-n1-footer]'), fc = tpl.content.querySelector('n1-floating-controls');
      if (!hdr || !ft) throw new Error('Onaylı Header/Footer işaretlemesi bulunamadı');
      var main = this.querySelector('main.ux');

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

      var otherFc = [].some.call(document.querySelectorAll('n1-floating-controls'), function (f) { return !self.contains(f); }) || !!document.querySelector('.n1fc:not([data-n1-ux])');
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
        if (this._header.panel) { this._header.panel.classList.add('n1-inner-panel'); this._header.panel.setAttribute('data-n1-ux', ''); }
      }
      if (this._footerOwned) await loadJs(url('footerJs'), null, true);
      if (this._fcOwned && !customElements.get('n1-floating-controls')) await loadJs(url('floating'), function () { return !!customElements.get('n1-floating-controls'); });
      var layer = document.querySelector('body > .n1fc:last-of-type'); if (this._fcOwned && layer) layer.setAttribute('data-n1-ux', '');
      if (!this._on) return;
      this._animate();
    }


    _anchors() {
      var a = this.querySelector('.ux-scroll'), self = this;
      this._ev(a, 'click', function (e) {
        e.preventDefault();
        var t = self.querySelector('#ux-deneyim'); if (!t) return;
        scrollTo({ top: t.getBoundingClientRect().top + scrollY - 40, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      });
    }

    /* ---------- Deneyim: sekmeler + üç çalışan temsili arayüz ---------- */
    _demo() {
      var self = this, root = this.querySelector('.ux-demo');
      var tabs = [].slice.call(root.querySelectorAll('.ux-dtab')), panels = [].slice.call(root.querySelectorAll('.ux-dp'));
      var fmt = function (n) { return n.toLocaleString('tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }); };
      var sel = function (i, focus) {
        tabs.forEach(function (t, j) { t.setAttribute('aria-selected', String(j === i)); t.tabIndex = j === i ? 0 : -1; });
        panels.forEach(function (p, j) { p.hidden = j !== i; });
        var g = window.gsap;
        if (g && !matchMedia('(prefers-reduced-motion: reduce)').matches) g.fromTo(panels[i].children, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .55, ease: 'expo.out', stagger: .06, clearProps: 'all' });
        if (focus) tabs[i].focus();
      };
      tabs.forEach(function (t, i) {
        self._ev(t, 'click', function () { sel(i); });
        self._ev(t, 'keydown', function (e) {
          var m = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
          if (m) { e.preventDefault(); sel((i + m + tabs.length) % tabs.length, true); }
          else if (e.key === 'Home') { e.preventDefault(); sel(0, true); }
          else if (e.key === 'End') { e.preventDefault(); sel(tabs.length - 1, true); }
        });
      });
      var S = this._state = { cl: { mode: 'messy', start: 0, times: {} }, fl: { extra: false, i: 0, data: {}, taps: 0, done: false, log: {} }, fb: { mode: 'on', fail: false, st: 'idle', saved: false } };

      /* 01 Netlik: aynı kart, iki düzen; kullanıcı kendi bulma süresini ölçer */
      var p0 = panels[0], ev = p0.querySelector('.ux-ev'), res = p0.querySelector('[data-cl="res"]');
      var names = { messy: 'Karmaşık', clear: 'Sade' };
      var clear = function () { [].forEach.call(ev.querySelectorAll('.ux-hit'), function (h) { h.classList.remove('is-right', 'is-wrong'); }); };
      [].forEach.call(p0.querySelectorAll('input[name="ux-cl-mode"]'), function (r) {
        self._ev(r, 'change', function () {
          S.cl.mode = r.value; ev.setAttribute('data-mode', r.value); clear();
          if (S.cl.start) { S.cl.start = performance.now(); res.textContent = names[r.value] + ' düzene geçildi; süre yeniden başladı. Başlama saatini bulun.'; }
          else res.textContent = names[r.value] + ' düzen. Hazır olduğunuzda görevi başlatın.';
        });
      });
      this._ev(p0.querySelector('[data-cl="start"]'), 'click', function () {
        clear(); S.cl.start = performance.now();
        res.textContent = 'Süre başladı. Kartta etkinliğin başlama saatini bulun ve üzerine dokunun.';
      });
      [].forEach.call(ev.querySelectorAll('.ux-hit'), function (h) {
        self._ev(h, 'click', function () {
          if (!S.cl.start) { res.textContent = 'Önce "Görevi başlat" düğmesine basın; süre o anda başlar.'; return; }
          if (h.getAttribute('data-k') === 'time') {
            var t = (performance.now() - S.cl.start) / 1000; S.cl.start = 0; S.cl.times[S.cl.mode] = t;
            clear(); h.classList.add('is-right');
            p0.querySelector('[data-cl="t-' + S.cl.mode + '"]').textContent = fmt(t) + ' sn';
            var other = S.cl.mode === 'messy' ? 'clear' : 'messy';
            res.textContent = 'Buldunuz: ' + fmt(t) + ' saniye (' + names[S.cl.mode] + ' düzen).' + (S.cl.times[other] == null ? ' Şimdi ' + names[other].toLocaleLowerCase('tr-TR') + ' düzene geçip tekrar deneyin.' : '');
          } else {
            h.classList.remove('is-wrong'); void h.offsetWidth; h.classList.add('is-wrong');
            res.textContent = 'Bu değil. Etkinliğin başlama saatini arayın.';
          }
        });
      });

      /* 02 Akış: 3 adım ya da gereksiz adımlarla 5 adım */
      var p1 = panels[1], form = p1.querySelector('.ux-fl'), body = form.querySelector('.ux-fl__body'), err = form.querySelector('[data-fl="err"]');
      var back = form.querySelector('[data-fl="back"]'), next = form.querySelector('[data-fl="next"]'), bar = form.querySelector('.ux-fl__bar i');
      var fres = p1.querySelector('[data-fl="res"]'), fstep = p1.querySelector('[data-fl="step"]'), ftaps = p1.querySelector('[data-fl="taps"]'), xsw = p1.querySelector('#ux-fl-extra');
      var opt = function (name, v, l) { return '<label class="ux-opt"><input type="radio" name="' + name + '" value="' + v + '"' + (S.fl.data[name] === v ? ' checked' : '') + '><span>' + l + '</span></label>'; };
      var STEP = {
        svc: { t: 'Hangi konuda görüşmek istersiniz?', h: 'Bir seçenek yeterli.', f: function () { return '<fieldset><legend class="ux-sr">Görüşme konusu</legend><div class="ux-opts">' + [['audit', 'Kullanılabilirlik değerlendirmesi'], ['new', 'Yeni bir arayüz'], ['improve', 'Mevcut ürünü iyileştirme']].map(function (o) { return opt('svc', o[0], o[1]); }).join('') + '</div></fieldset>'; }, ok: function () { return !!S.fl.data.svc || 'Devam etmek için bir konu seçin.'; } },
        acct: { t: 'Önce bir hesap oluşturun.', h: 'Bu adım randevu için gerekli değil; gereksiz adımlara bir örnek.', f: function () { return '<div class="ux-opts"><label class="ux-sub__l" for="ux-fl-name">Ad soyad</label><input class="ux-sub__in" id="ux-fl-name" name="name" autocomplete="off" value="' + (S.fl.data.name || '') + '"><label class="ux-sub__l" for="ux-fl-tel">Telefon</label><input class="ux-sub__in" id="ux-fl-tel" name="tel" inputmode="tel" autocomplete="off" value="' + (S.fl.data.tel || '') + '"></div>'; }, ok: function () { return (S.fl.data.name && S.fl.data.tel) ? true : 'Devam etmek için ad soyad ve telefon alanlarını doldurun.'; } },
        slot: { t: 'Size uygun zaman', h: 'Saatler İstanbul saatiyle.', f: function () { return '<fieldset><legend class="ux-sr">Randevu zamanı</legend><div class="ux-opts ux-opts--chips">' + ['Pzt 10.00', 'Pzt 14.00', 'Sal 11.00', 'Çar 16.00', 'Per 10.00', 'Cum 15.00'].map(function (o) { return opt('slot', o, o); }).join('') + '</div></fieldset>'; }, ok: function () { return !!S.fl.data.slot || 'Devam etmek için bir zaman seçin.'; } },
        news: { t: 'Bültenimize abone olmak ister misiniz?', h: 'Bu soru da randevu için gerekli değil.', f: function () { return '<fieldset><legend class="ux-sr">Bülten tercihi</legend><div class="ux-opts">' + [['yes', 'Evet'], ['no', 'Hayır']].map(function (o) { return opt('news', o[0], o[1]); }).join('') + '</div></fieldset>'; }, ok: function () { return !!S.fl.data.news || 'Devam etmek için bir seçenek işaretleyin.'; } },
        conf: { t: 'Kontrol edip onaylayın.', h: 'Bilgileriniz doğruysa onaylayın; gerekirse geri dönebilirsiniz.', f: function () { var L = { audit: 'Kullanılabilirlik değerlendirmesi', 'new': 'Yeni bir arayüz', improve: 'Mevcut ürünü iyileştirme' }; return '<div class="ux-fl__sum"><span>Konu: <b>' + L[S.fl.data.svc] + '</b></span><span>Zaman: <b>' + S.fl.data.slot + '</b></span></div>'; }, ok: function () { return true; } }
      };
      var steps = function () { return S.fl.extra ? ['svc', 'acct', 'slot', 'news', 'conf'] : ['svc', 'slot', 'conf']; };
      var render = function (focus) {
        var L = steps(), n = L.length, k = L[S.fl.i];
        err.textContent = '';
        if (S.fl.done) {
          body.innerHTML = '<div class="ux-fl__done" tabindex="-1">' + I.check + '<span>Randevu talebiniz alındı (temsili). ' + n + ' adım, ' + S.fl.taps + ' dokunuş.</span></div>';
          bar.parentNode.style.setProperty('--w', '100%'); bar.style.width = '100%';
          back.hidden = true; next.textContent = 'Baştan başla';
          fstep.textContent = n + ' / ' + n;
          if (focus) body.firstChild.focus();
          return;
        }
        var st = STEP[k];
        body.innerHTML = '<p class="ux-fl__s">Adım ' + (S.fl.i + 1) + ' / ' + n + '</p><h4 class="ux-fl__t" tabindex="-1">' + st.t + '</h4><p class="ux-fl__h">' + st.h + '</p>' + st.f();
        bar.style.width = ((S.fl.i + 1) / n * 100) + '%';
        back.hidden = S.fl.i === 0; next.textContent = k === 'conf' ? 'Randevuyu onayla' : 'Devam';
        fstep.textContent = (S.fl.i + 1) + ' / ' + n;
        if (focus) body.querySelector('.ux-fl__t').focus();
      };
      var reset = function () { S.fl.i = 0; S.fl.data = {}; S.fl.taps = 0; S.fl.done = false; ftaps.textContent = '0'; render(); };
      this._ev(form, 'change', function (e) { if (e.target.name) S.fl.data[e.target.name] = e.target.value; });
      this._ev(form, 'input', function (e) { if (e.target.name) S.fl.data[e.target.name] = e.target.value.trim(); });
      this._ev(form, 'click', function (e) { var t = e.target; if (t.closest('button') || t.tagName === 'INPUT') { S.fl.taps++; ftaps.textContent = String(S.fl.taps); } });
      this._ev(form, 'submit', function (e) {
        e.preventDefault();
        if (S.fl.done) { reset(); render(true); fres.textContent = 'Akış yeniden başladı.'; return; }
        var L = steps(), r = STEP[L[S.fl.i]].ok();
        if (r !== true) {
          err.innerHTML = I.alert + '<span>' + r + '</span>';
          var f = body.querySelector('input'); if (f) f.focus();
          return;
        }
        if (S.fl.i < L.length - 1) { S.fl.i++; render(true); return; }
        S.fl.done = true; S.fl.log[L.length] = S.fl.taps; render(true);
        var a = S.fl.log[3], b = S.fl.log[5];
        fres.textContent = 'Tamamlandı: ' + L.length + ' adım, ' + S.fl.taps + ' dokunuş.' + (a != null && b != null ? ' Karşılaştırma: 3 adımda ' + a + ', 5 adımda ' + b + ' dokunuş.' : (L.length === 3 ? ' Şimdi gereksiz adımları açıp tekrar deneyin.' : ''));
      });
      this._ev(back, 'click', function () { if (S.fl.i > 0) { S.fl.i--; render(true); } });
      this._ev(xsw, 'click', function () {
        S.fl.extra = !S.fl.extra; xsw.setAttribute('aria-checked', String(S.fl.extra)); reset();
        fres.textContent = S.fl.extra ? 'Akış artık 5 adım: hesap oluşturma ve bülten soruları eklendi.' : 'Akış 3 adıma döndü.';
      });
      render();

      /* 03 Geri bildirim: bekleme, başarı, hata ve geri alma */
      var p2 = panels[2], fb = p2.querySelector('.ux-fb'), send = fb.querySelector('.ux-fb__send'), lb = send.querySelector('.ux-fb__lb'), msg = fb.querySelector('.ux-fb__msg');
      var save = fb.querySelector('.ux-fb__save'), toast = fb.querySelector('.ux-toast'), toastT = toast.querySelector('.ux-toast__t'), undo = toast.querySelector('.ux-toast__u'), fsw = p2.querySelector('#ux-fb-fail');
      var tmr = 0, ttmr = 0;
      var setSt = function (st) {
        S.fb.st = st; send.setAttribute('data-st', st);
        send.setAttribute('aria-busy', String(st === 'busy'));
        lb.textContent = { idle: 'Gönder', busy: 'Gönderiliyor…', done: 'Gönderildi', fail: 'Tekrar dene' }[st];
      };
      this._ev(send, 'click', function () {
        if (S.fb.st === 'busy') return;
        clearTimeout(tmr); msg.textContent = ''; msg.classList.remove('is-fail');
        if (S.fb.mode === 'off') { S.fb.st = 'busy'; tmr = setTimeout(function () { S.fb.st = 'idle'; }, 1400); return; }   // bilerek sessiz
        setSt('busy');
        tmr = setTimeout(function () {
          if (S.fb.fail) { setSt('fail'); msg.classList.add('is-fail'); msg.textContent = 'Gönderilemedi: bağlantı kurulamadı. İnternet bağlantınızı kontrol edip tekrar deneyin.'; }
          else { setSt('done'); msg.textContent = 'sunum-taslagi.pdf gönderildi. Alıcıya bir onay e-postası gider (temsili).'; tmr = setTimeout(function () { if (S.fb.st === 'done') setSt('idle'); }, 4000); }
        }, 1400);
      });
      var showToast = function (t) {
        if (S.fb.mode === 'off') return;
        toastT.textContent = t; toast.hidden = false; clearTimeout(ttmr);
        ttmr = setTimeout(function () { toast.hidden = true; }, 7000);
      };
      this._ev(save, 'click', function () {
        S.fb.saved = !S.fb.saved; save.setAttribute('aria-pressed', String(S.fb.saved));
        showToast(S.fb.saved ? 'Dosya kaydedildi.' : 'Kayıt kaldırıldı.');
      });
      this._ev(undo, 'click', function () {
        S.fb.saved = !S.fb.saved; save.setAttribute('aria-pressed', String(S.fb.saved));
        toastT.textContent = 'Geri alındı.'; clearTimeout(ttmr); ttmr = setTimeout(function () { toast.hidden = true; }, 3000); save.focus();
      });
      [].forEach.call(p2.querySelectorAll('input[name="ux-fb-mode"]'), function (r) {
        self._ev(r, 'change', function () {
          S.fb.mode = r.value; fb.setAttribute('data-fb', r.value); clearTimeout(tmr); setSt('idle'); msg.textContent = ''; toast.hidden = true;
        });
      });
      this._ev(fsw, 'click', function () { S.fb.fail = !S.fb.fail; fsw.setAttribute('aria-checked', String(S.fb.fail)); if (S.fb.st !== 'busy') { setSt('idle'); msg.textContent = ''; } });
      this._cleanups.push(function () { clearTimeout(tmr); clearTimeout(ttmr); });
    }

    /* ---------- Süreç: görünür aşama sözcüğü ve görseli değiştirir ---------- */
    _process() {
      var items = [].slice.call(this.querySelectorAll('.ux-st')), imgs = [].slice.call(this.querySelectorAll('.ux-proc__img'));
      var n = this.querySelector('.ux-proc__n'), k = this.querySelector('.ux-proc__k'), cur = 0, self = this;
      var set = function (i) {
        if (i === cur) return; cur = i;
        items.forEach(function (it, j) { it.classList.toggle('is-on', j === i); });
        imgs.forEach(function (im, j) { im.classList.toggle('is-on', j === i); });
        var g = window.gsap, txt = STAGES[i].k, num = '0' + (i + 1);
        if (g && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
          g.killTweensOf(k);
          g.timeline().to(k, { yPercent: -60, opacity: 0, duration: .22, ease: 'power2.in', onComplete: function () { k.textContent = txt; n.textContent = num; } })
            .fromTo(k, { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .5, ease: 'expo.out' });
        } else { k.textContent = txt; n.textContent = num; }
      };
      var pre = new IntersectionObserver(function (en) {   // sahne görselleri bölüme yaklaşınca birlikte yüklenir
        if (en.some(function (e) { return e.isIntersecting; })) { imgs.forEach(function (im) { im.loading = 'eager'; }); pre.disconnect(); }
      }, { rootMargin: '120% 0px 120% 0px' });
      pre.observe(this.querySelector('.ux-proc'));
      this._cleanups.push(function () { pre.disconnect(); });
      var io = new IntersectionObserver(function (en) {
        en.forEach(function (e) { if (e.isIntersecting) set(+e.target.getAttribute('data-i')); });
      }, { rootMargin: '-45% 0px -45% 0px' });
      items.forEach(function (it) { io.observe(it); });
      this._cleanups.push(function () { io.disconnect(); });
      void self;
    }

    /* ---------- Laboratuvar: dört karar, gerçek durum + canlı kontrast oranı ---------- */
    _lab() {
      var self = this, root = this.querySelector('.ux-lab'), spec = root.querySelector('.ux-spec'), form = root.querySelector('.ux-lab__ctl');
      var ratioEl = root.querySelector('[data-lab="ratio"]'), verdict = root.querySelector('[data-lab="verdict"]'), warn = root.querySelector('[data-lab="warn"]'), why = root.querySelector('[data-lab="why"]');
      var b1 = spec.querySelector('.ux-spec__b1'), b2 = spec.querySelector('.ux-spec__b2'), sfb = spec.querySelector('.ux-spec__fb');
      var DEF = { space: 'spacious', type: 'clear', contrast: 'ok', behave: 'live' };
      var st = Object.assign({}, DEF);
      var WHY = {
        space: { compact: 'Sıkışık: öğeler arasında nefes alanı yok; başlık, metin ve butonlar tek bir blok gibi okunur.', spacious: 'Ferah: boşluk öğeleri gruplar; neyin neye ait olduğu bir bakışta anlaşılır.' },
        type: { flat: 'Düz: her satır aynı ağırlıkta; göz nereden başlayacağını bilemez.', clear: 'Net: başlık, metin ve etiket farklı boyut ve ağırlıkta; okuma sırası kendiliğinden oluşur.' },
        contrast: { low: 'Düşük kontrast: açık gri metin açık zeminde kaybolur; özellikle güneş altında ve az gören kullanıcılar için okunmaz.', ok: 'Yeterli kontrast: metin ile zemin arasında açık bir fark var.' },
        behave: { 'static': 'Statik: butonlar üzerine gelindiğinde, basıldığında ya da kaydedildiğinde hiçbir şey söylemez. Odak çerçevesi erişilebilirlik için yine de korunur.', live: 'Etkileşimli: üzerine gelme, basma ve kaydetme durumları görünür; arayüz her eyleme cevap verir.' }
      };
      var lum = function (c) {
        var m = c.match(/\d+(\.\d+)?/g); if (!m) return 1;
        var v = m.slice(0, 3).map(function (x) { x = x / 255; return x <= .04045 ? x / 12.92 : Math.pow((x + .055) / 1.055, 2.4); });
        return .2126 * v[0] + .7152 * v[1] + .0722 * v[2];
      };
      var ratio = function (a, b) { var A = lum(a), B = lum(b); return (Math.max(A, B) + .05) / (Math.min(A, B) + .05); };
      var read = function () {
        var cs = getComputedStyle(spec), bg = cs.backgroundColor, tc = getComputedStyle(spec.querySelector('.ux-spec__p')).color;
        var r = ratio(tc, bg), s = r.toLocaleString('tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ':1';
        ratioEl.textContent = s;
        verdict.textContent = r >= 4.5 ? 'Gövde metni için WCAG 2.2 AA eşiğini (4,5:1) karşılıyor.' : r >= 3 ? 'Yalnızca büyük metin için yeterli (3:1); gövde metni için yetersiz.' : 'Gövde metni için WCAG 2.2 AA eşiğinin (4,5:1) çok altında.';
        warn.hidden = st.contrast !== 'low';
      };
      var apply = function (changed) {
        Object.keys(st).forEach(function (k) { spec.setAttribute('data-' + k, st[k]); });
        [].forEach.call(form.querySelectorAll('input[type="radio"]'), function (r) { var k = r.name.replace('ux-lab-', ''); r.checked = st[k] === r.value; });
        if (st.behave === 'static') { b2.setAttribute('aria-pressed', 'false'); sfb.textContent = ''; }
        why.textContent = WHY[changed || 'space'][st[changed || 'space']];
        read();
      };
      this._ev(form, 'change', function (e) { var k = e.target.name.replace('ux-lab-', ''); st[k] = e.target.value; apply(k); });
      this._ev(form, 'submit', function (e) { e.preventDefault(); });
      this._ev(root.querySelector('[data-lab="reset"]'), 'click', function () { st = Object.assign({}, DEF); apply('space'); why.textContent = 'Önerilen ayarlar: ferah boşluk, net hiyerarşi, yeterli kontrast, etkileşimli butonlar.'; });
      this._ev(root.querySelector('[data-lab="fix"]'), 'click', function () { st.contrast = 'ok'; apply('contrast'); var r = form.querySelector('input[name="ux-lab-contrast"][value="ok"]'); if (r) r.focus(); });
      this._ev(b1, 'click', function () { if (st.behave === 'live') sfb.textContent = 'Makale açılıyor… (temsili)'; });
      this._ev(b2, 'click', function () {
        if (st.behave !== 'live') return;   // statik: bilerek hiçbir geri bildirim yok
        var on = b2.getAttribute('aria-pressed') !== 'true';
        b2.setAttribute('aria-pressed', String(on));
        sfb.textContent = on ? 'Makale kaydedilenlere eklendi.' : 'Makale kaydedilenlerden çıkarıldı.';
      });
      apply('space');
      this._labRead = read;
      void self;
    }

    /* ---------- Erişilebilirlik: hata yalnızca renkle mi, sözle de mi? ---------- */
    _a11y() {
      var self = this, root = this.querySelector('.ux-acc__demo'), form = root.querySelector('.ux-sub'), inp = form.querySelector('.ux-sub__in');
      var err = form.querySelector('.ux-sub__err'), ok = form.querySelector('.ux-sub__ok'), scr = root.querySelector('.ux-screen--acc');
      var gray = root.querySelector('#ux-ac-gray'), note = root.querySelector('[data-ac="warn"]'), mode = 'full';
      var clearSt = function () { form.classList.remove('is-bad'); inp.removeAttribute('aria-invalid'); inp.removeAttribute('aria-describedby'); err.innerHTML = ''; ok.textContent = ''; };
      this._ev(form, 'submit', function (e) {
        e.preventDefault(); clearSt();
        var v = inp.value.trim(), good = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
        if (good) { ok.textContent = 'Temsili abonelik tamamlandı: ' + v + '. Gerçek bir kayıt yapılmadı.'; return; }
        if (mode === 'color') { form.classList.add('is-bad'); inp.focus(); return; }   // bilerek eksik: yalnızca kırmızı çerçeve
        inp.setAttribute('aria-invalid', 'true'); inp.setAttribute('aria-describedby', 'ux-sub-err');
        err.innerHTML = I.alert + '<span>' + (v ? 'Bu e-posta adresi eksik görünüyor: "@" işareti ve bir alan adı içermeli. Örneğin: ad@alanadi.com' : 'E-posta adresi gerekli. Örneğin: ad@alanadi.com') + '</span>';
        inp.focus();
      });
      this._ev(inp, 'input', function () { if (form.classList.contains('is-bad') || inp.getAttribute('aria-invalid')) clearSt(); });
      [].forEach.call(root.querySelectorAll('input[name="ux-ac-mode"]'), function (r) {
        self._ev(r, 'change', function () { mode = r.value; form.setAttribute('data-mode', mode); note.hidden = mode !== 'color'; clearSt(); });
      });
      this._ev(gray, 'click', function () { var on = gray.getAttribute('aria-checked') !== 'true'; gray.setAttribute('aria-checked', String(on)); scr.classList.toggle('is-gray', on); });
    }

    /* ---------- Hareket ---------- */
    _animate() {
      var gsap = window.gsap, STg = window.ScrollTrigger, self = this;
      if (!gsap) return;
      if (STg) gsap.registerPlugin(STg);
      var q = function (s, r) { return [].slice.call((r || self).querySelectorAll(s)); };
      var one = function (s) { return self.querySelector(s); };
      var once = function (el, start) { return { trigger: el, start: start || 'top 86%', once: true }; };
      // Belirlenimci dağınıklık: her harf için sabit küçük kayma ve dönüş (rastgele değil, her açılışta aynı)
      var sx = function (i) { return ((i * 37) % 11 - 5) * 4; }, sy = function (i) { return ((i * 29) % 9 - 4) * 9; }, sr = function (i) { return ((i * 53) % 13 - 6) * 1.6; };

      this._ctx = gsap.context(function () {
        var mm = gsap.matchMedia();

        /* 01 Hero: harfler dağınık gelir ve yeşil taban çizgisine oturur (hizalama = düzen); görsel ortadan açılır */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          var ch = q('.ux-hero__title .ux-ch'), base = one('.ux-base'), fr = one('.ux-spot__frame');
          var tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
          tl.from(q('.ux-kicker span'), { opacity: 0, y: 10, duration: .8, stagger: .08 }, .05)
            .from(ch, { opacity: 0, x: function (i) { return sx(i) * 2; }, y: function (i) { return sy(i) * 1.6; }, rotation: function (i) { return sr(i) * 2; }, duration: .7, stagger: .035, ease: 'power3.out' }, .1)
            .fromTo(base, { scaleX: 0 }, { scaleX: 1, duration: .9, ease: 'power3.inOut' }, .55)
            .to(ch, { keyframes: [{ y: -4, duration: .12 }, { y: 0, duration: .5, ease: 'back.out(3)' }], stagger: .02 }, 1.2)
            .fromTo(fr, { clipPath: 'inset(50% 0% 50% 0% round 6px)' }, { clipPath: 'inset(0% 0% 0% 0% round 6px)', duration: 1.3, ease: 'expo.inOut' }, .4)
            .from(q('.ux-spot__img'), { scale: 1.14, duration: 1.8, ease: 'power3.out' }, .5)
            .from(q('.ux-hero__msg .ux-ln>span'), { yPercent: 140, duration: 1, ease: 'power4.out', stagger: .08 }, .95)
            .from(q('.ux-hero__sub, .ux-scroll, .ux-spot .ux-cap'), { opacity: 0, y: 16, duration: .9, stagger: .08 }, 1.3);
          return function () { gsap.set([fr].concat(q('.ux-spot__img')), { clearProps: 'clipPath,transform' }); };
        });
        mm.add('(prefers-reduced-motion: no-preference) and (min-width: 1025px)', function () {
          gsap.to(one('.ux-hero__title'), { yPercent: 14, ease: 'none', scrollTrigger: { trigger: one('.ux-hero'), start: 'top top', end: 'bottom top', scrub: .6 } });
          gsap.to(one('.ux-spot__frame'), { yPercent: -6, ease: 'none', scrollTrigger: { trigger: one('.ux-hero'), start: 'top top', end: 'bottom top', scrub: .6 } });
        });

        /* Başlıklar: satırlar maskenin altından gelir (bir kez) */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          q('.ux-sec .ux-h2, .ux-man__b, .ux-fin__t').forEach(function (h) {
            gsap.from(q('.ux-ln>span', h), { yPercent: 140, duration: 1.15, ease: 'power4.out', stagger: .08, scrollTrigger: once(h) });
          });
          q('.ux-sec .ux-label, .ux-fin .ux-label').forEach(function (l) { gsap.from(l, { opacity: 0, x: -12, duration: .8, ease: 'expo.out', scrollTrigger: once(l, 'top 92%') }); });
          q('.ux-lede').forEach(function (l) { gsap.from(l, { opacity: 0, y: 18, duration: .9, ease: 'expo.out', scrollTrigger: once(l, 'top 92%') }); });
        });

        /* 02 His: "İYİ GÖRÜNÜR." ile "İYİ ÇALIŞIR." kaydırdıkça karşılıklı akar; sorular sırayla gelir */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          var vs = one('.ux-vs');
          gsap.fromTo(one('.ux-vs__a'), { xPercent: 8 }, { xPercent: -22, ease: 'none', scrollTrigger: { trigger: vs, start: 'top bottom', end: 'bottom top', scrub: .5 } });
          gsap.fromTo(one('.ux-vs__b'), { xPercent: -8 }, { xPercent: 18, ease: 'none', scrollTrigger: { trigger: vs, start: 'top bottom', end: 'bottom top', scrub: .5 } });
          var fi = one('.ux-feel__img');
          gsap.fromTo(fi, { clipPath: 'inset(0% 0% 100% 0% round 6px)' }, { clipPath: 'inset(0% 0% 0% 0% round 6px)', duration: 1.4, ease: 'expo.inOut', scrollTrigger: once(fi) });
          q('.ux-q').forEach(function (it) { gsap.from(it.children, { opacity: 0, y: 18, duration: .9, ease: 'expo.out', stagger: .07, scrollTrigger: once(it) }); });
          return function () { gsap.set(fi, { clearProps: 'clipPath' }); };
        });

        /* 03 Deneyim: sekmeler dizilir, ekran alttan açılır */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          gsap.from(q('.ux-dtab'), { opacity: 0, y: 20, duration: .9, ease: 'expo.out', stagger: .08, scrollTrigger: once(one('.ux-dtabs')) });
          var sc = one('#ux-dp-0 .ux-screen');
          gsap.fromTo(sc, { clipPath: 'inset(100% 0% 0% 0% round 12px)' }, { clipPath: 'inset(0% 0% 0% 0% round 12px)', duration: 1.3, ease: 'expo.inOut', scrollTrigger: once(sc, 'top 88%') });
          return function () { gsap.set(sc, { clearProps: 'clipPath' }); };
        });

        /* 04 Süreç: görsel çerçevesi açılır */
        mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px)', function () {
          var pf = one('.ux-proc__frame');
          gsap.fromTo(pf, { clipPath: 'inset(0% 100% 0% 0% round 6px)' }, { clipPath: 'inset(0% 0% 0% 0% round 6px)', duration: 1.4, ease: 'expo.inOut', scrollTrigger: once(pf) });
          return function () { gsap.set(pf, { clearProps: 'clipPath' }); };
        });
        mm.add('(prefers-reduced-motion: no-preference) and (max-width: 767px)', function () {
          q('.ux-st__img').forEach(function (im) { gsap.fromTo(im, { clipPath: 'inset(0% 0% 100% 0% round 6px)' }, { clipPath: 'inset(0% 0% 0% 0% round 6px)', duration: 1.2, ease: 'expo.inOut', scrollTrigger: once(im) }); });
          return function () { gsap.set(q('.ux-st__img'), { clearProps: 'clipPath' }); };
        });

        /* 05 Laboratuvar: kontroller ve bileşen gelir */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          gsap.from(q('.ux-lab__ctl > *'), { opacity: 0, x: -16, duration: .9, ease: 'expo.out', stagger: .07, scrollTrigger: once(one('.ux-lab__ctl')) });
          var sp = one('.ux-screen--lab');
          gsap.fromTo(sp, { clipPath: 'inset(0% 0% 0% 100% round 12px)' }, { clipPath: 'inset(0% 0% 0% 0% round 12px)', duration: 1.3, ease: 'expo.inOut', scrollTrigger: once(sp) });
          return function () { gsap.set(sp, { clearProps: 'clipPath' }); };
        });

        /* 06 Kapsam ve 07 Erişilebilirlik: dizin satırları sırayla */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          var sf = one('.ux-scope__img');
          gsap.fromTo(sf, { clipPath: 'inset(0% 0% 100% 0% round 6px)' }, { clipPath: 'inset(0% 0% 0% 0% round 6px)', duration: 1.4, ease: 'expo.inOut', scrollTrigger: once(sf) });
          gsap.from(q('.ux-svc__i'), { opacity: 0, x: 24, duration: .8, ease: 'expo.out', stagger: .05, scrollTrigger: once(one('.ux-svc')) });
          gsap.from(q('.ux-acc__list li'), { opacity: 0, y: 14, duration: .8, ease: 'expo.out', stagger: .05, scrollTrigger: once(one('.ux-acc__list')) });
          return function () { gsap.set(sf, { clearProps: 'clipPath' }); };
        });

        /* 08 Manifesto: "GÜZEL GÖRÜNMESİ YETMEZ." dağınık durur, kaydırdıkça hizalanır; ardından yeşil taban çizgisi */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          var ch = q('.ux-man__a .ux-ch'), t = one('.ux-man__t');
          gsap.fromTo(ch, { x: function (i) { return sx(i) * 2.2; }, y: function (i) { return sy(i) * 1.4; }, rotation: function (i) { return sr(i) * 2.4; } },
            { x: 0, y: 0, rotation: 0, ease: 'none', stagger: { each: .01 }, scrollTrigger: { trigger: t, start: 'top 90%', end: 'top 35%', scrub: .6 } });
          gsap.fromTo(one('.ux-man__line'), { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: 'power3.inOut', delay: .5, scrollTrigger: once(one('.ux-man__b'), 'top 80%') });
          var mi = one('.ux-man__img');
          gsap.fromTo(mi, { clipPath: 'inset(100% 0% 0% 0% round 6px)', rotation: -3 }, { clipPath: 'inset(0% 0% 0% 0% round 6px)', rotation: 0, duration: 1.5, ease: 'expo.inOut', scrollTrigger: once(mi) });
          gsap.from(one('.ux-man__p'), { opacity: 0, y: 18, duration: .9, ease: 'expo.out', scrollTrigger: once(one('.ux-man__p')) });
          return function () { gsap.set(ch, { clearProps: 'transform' }); gsap.set(mi, { clearProps: 'clipPath,transform' }); };
        });

        /* 09 Final: kare açılır, butonlar gelir */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          var fig = one('.ux-fin__img');
          gsap.fromTo(fig, { clipPath: 'inset(0% 0% 100% 0% round 6px)' }, { clipPath: 'inset(0% 0% 0% 0% round 6px)', duration: 1.6, ease: 'expo.inOut', scrollTrigger: once(one('.ux-fin'), 'top 70%') });
          gsap.from(q('.ux-fin__sub, .ux-fin__cta .ux-btn'), { opacity: 0, y: 20, duration: .9, ease: 'expo.out', stagger: .1, scrollTrigger: once(one('.ux-fin__sub'), 'top 94%') });
          return function () { gsap.set(fig, { clearProps: 'clipPath' }); };
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
      this._fcOwned = false; this._footerOwned = false; this._header = null; this._vids = null; this._state = null;
      this.replaceChildren();
      var st = document.getElementById(STYLE_ID); if (st && !document.querySelector(TAG)) st.remove();
    }
  }
  customElements.define(TAG, UiuxTasarimV22);
})();