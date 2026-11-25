/*!
 * n1-reklam-yonetimi-v23 — 1N Digital Media · Reklam Yönetimi (/reklam-yonetimi) · Beyond the Click / Tıklamanın Ötesinde
 * Wix Studio Custom Element · Tag name: n1-reklam-yonetimi-v23 · Kaynak: bu dosyanın HTTPS adresi
 * Bağımsız V2 sürümü; Reklam Yönetimi V1 dosyasına dokunulmadı.
 *
 * Fikir: bir tıklama sonuç değil, bir sinyaldir. Sayfa boyunca küçük bir imleç "tıklar"; asıl iş tıklamadan sonra başlar.
 *  01 Hero          gece ışıklı reklam panoları bir ekran gibi açılır; imleç "TIKLAMANIN" sözcüğüne tıklar, "ÖTESİNDE." onun ötesine kayar.
 *  02 Sinyaller     GÖRÜLDÜ, TIKLANDI, MESAJ GELDİ sözcükleri kaydırdıkça yeşil bir çizgiyle düzeltilir; yanlarında gerçek anlamları.
 *  03 Sistem        altı çalışma alanı; seçilen alan tek bir kitle fotoğrafında farklı bir ayrıntıya odaklanır (aynı kitle, altı soru).
 *  04 Kreatif+veri  iki kreatif varyasyon tek karede; ayırıcı kaydırılarak karşılaştırılır (klavye ve dokunma ile).
 *  05 Mecra         arayan kişi (Google Ads) ile keşfeden kişi (Meta Ads); altta ikisinin ortak zemini: ölçüm.
 *  06 Karar         güncellenmiş 1080p veri videosu; panelde görünen ile işletmede olan yan yana okunur.
 *  07 Döngü         dört fiil kaydırmayla akan bir bant olur; adımlar sırayla yanar ve başa döner.
 *  08 Manifesto     "REKLAM" sözcüğünün harflerinin içinden aynı panolar görünür; ardından "DAHA DOĞRU KARARLAR".
 *  09 Final
 *
 * Mimari: Light DOM, sınıf öneki ry-. Onaylı v6.48 Header + menü, Footer, WhatsApp / Yukarı Çık modülleri commit'e sabit
 * adreslerden aynen yüklenir; sayfada başka bir Header / Footer / kontrol katmanı varsa ikincisi oluşturulmaz.
 * GSAP 3.13.0 + ScrollTrigger yalnızca sayfada yoksa yüklenir. Pin ve spacer yok; animasyonlar gsap.context + matchMedia içinde.
 * İçerik CSS'te gizlenmez: GSAP yüklenemezse ya da hareket azaltma açıksa sayfa son hâliyle görünür.
 *
 * Video: 6dbf5e_d0b5ab077fad434aa46a37dca1aa10b8 (1280×720, 1,84 sn döngü; gece ışıklı reklam panoları).
 *  - Hero'da ve manifestoda kullanılır; aynı anda yalnızca biri oynar, görünmeyen durur, manifestodaki yaklaşılmadan indirilmez.
 *  - Mevcut Hero/manifesto videoları 0,6x hızında kalır. Karar bölümü yalnızca verilen 1080p videoyu gösterir; fotoğraf ya da poster içermez.
 *
 * İsteğe bağlı öznitelik (yalnızca Wix dışı önizleme için): deps-base="<klasör>/"
 */
(function () {
  'use strict';
  var TAG = 'n1-reklam-yonetimi-v23';
  var STYLE_ID = 'n1-ry23-style';
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

  /* ---------- Medya ---------- */
  var VBASE = 'https://video.wixstatic.com/video/6dbf5e_';
  function vset(id) { return { hd: VBASE + id + '/720p/mp4/file.mp4', sd: VBASE + id + '/480p/mp4/file.mp4' }; }
  var V_ADS = 'd0b5ab077fad434aa46a37dca1aa10b8';   // 1280×720 · 1,84 sn · gece, ışıklı reklam panoları (hızlı kesmeli döngü)
  var V_DEC = 'https://video.wixstatic.com/video/6dbf5e_3855bf1db1384a9c961782c650b3686d/1080p/mp4/file.mp4'; // Karar paneli yeni 1080p video
  // Wix'in videodan ürettiği gerçek kare; r = genişlik / yükseklik
  function poster(id, w, r) { return 'https://static.wixstatic.com/media/6dbf5e_' + id + 'f000.jpg/v1/fill/w_' + w + ',h_' + Math.round(w / r) + ',q_80/reklam-yonetimi.jpg'; }
  function pickVideo(set) {
    var c = navigator.connection || {};
    if (c.saveData || /(^|-)2g$/.test(c.effectiveType || '') || matchMedia('(max-width:767px)').matches) return set.sd;
    return set.hd;
  }
  var IMG_BASE = 'https://static.wixstatic.com/media/6dbf5e_';
  // fit: genişlik w, yükseklik serbest (h = 3w); srcset genişlikleri gerçek genişlikle örtüşür
  function img(id, w) { return IMG_BASE + id + '~mv2.jpg/v1/fit/w_' + w + ',h_' + (w * 3) + ',q_82,enc_auto/reklam-yonetimi.jpg'; }
  function srcset(id, ws) { return (ws || [480, 800, 1200, 1800]).map(function (w) { return img(id, w) + ' ' + w + 'w'; }).join(', '); }
  function pic(id, cls, alt, sizes, pos, opt) {
    opt = opt || {};
    return '<img class="' + cls + '" src="' + img(id, opt.w || 800) + '" srcset="' + srcset(id, opt.ws) + '" sizes="' + sizes + '" alt="' + alt + '"' +
      (opt.eager ? '' : ' loading="lazy"') + ' decoding="async"' + (pos ? ' style="object-position:' + pos + '"' : '') + '>';
  }
  // Görseller (orijinal boyutlar ve içerikler gerçek tarayıcıda açılarak doğrulandı)
  var IM = {
    hoarding: 'd0b183b444384117930d058ad9f8ce16', // 4070×6107 · şantiye panosu: üst üste "PAST PRESENT", ortada "FUTURE" afişi
    crowd: 'afb374f89f444257a19aec41a10a4708',    // 6720×4480 · beyaz kapüşonlu genç grup: telefonlara bakan, fotoğraf çeken, düşünen
    render: 'e148502c52ea48eeb4b6295bf55a4597',   // 2262×4022 · beyaz zeminde 3B ürün sahnesi: elma ve yeşil yapraklı cam silindir
    wave: 'f8ba2dc6014745958bcdc6392e9724ec',     // 7104×4000 · kırmızı ve krem soyut dalga dokusu
    news: '25ede6e8cb884c89b92019571a321f93',     // 1828×2560 · pembe ışıkta, ucu yanan bir gazeteyi okuyan kadın
    streak: '8de8c361fafe4f27b9a2a56b84fb79b3'    // 4160×5199 · turkuaz, kırmızı ve kremin kesiştiği soyut fırça çizgileri
    // Kullanılmadı: 6dbf5e_2e9bfb6f… (afiş duvarı; AC/DC, KISS, Castrol, Harley-Davidson gibi üçüncü taraf markalar ve sanatçılar)
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
    arrow: '<svg class="ry-ico"' + SV + '><path d="M4.5 11.5l7-7M5.5 4.5h6v6"/></svg>',
    down: '<svg class="ry-ico"' + SV + '><path d="M8 3v10M3.5 8.5L8 13l4.5-4.5"/></svg>',
    play: '<svg class="ry-ico ry-ico--play"' + SV + '><path d="M5 3.5v9l7-4.5z"/></svg>',
    pause: '<svg class="ry-ico ry-ico--pause"' + SV + '><path d="M5.5 3.5v9M10.5 3.5v9"/></svg>',
    prev: '<svg class="ry-ico"' + SV + '><path d="M13 8H3M7.5 3.5L3 8l4.5 4.5"/></svg>',
    next: '<svg class="ry-ico"' + SV + '><path d="M3 8h10M8.5 3.5L13 8l-4.5 4.5"/></svg>'
  };
  function ln(t, cls) { return '<span class="ry-ln' + (cls ? ' ' + cls : '') + '"><span>' + t + '</span></span>'; }
  function chars(t, cls) { return '<span class="ry-chs' + (cls ? ' ' + cls : '') + '">' + Array.from(t).map(function (c) { return c === ' ' ? '<span class="ry-sp"> </span>' : '<span class="ry-ch">' + c + '</span>'; }).join('') + '</span>'; }
  // Ek ikonlar (aynı 16'lık ızgara ve çizgi kalınlığı; imleç dolu çizilir)
  I.cursor = '<svg class="ry-cur__svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d="M5 2.8v16.6l4.3-4.2 2.9 6.4 2.8-1.2-2.9-6.3h6z" fill="currentColor" stroke="#080A09" stroke-width="1.3" stroke-linejoin="round"/></svg>';
  I.spark = '<svg class="ry-spark" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" aria-hidden="true" focusable="false"><path d="M12 2.5v4M4.8 6.3l2.7 2.6M2.5 13.5h4M19.2 6.3l-2.7 2.6M21.5 13.5h-4"/></svg>';
  I.swap = '<svg class="ry-ico"' + SV + '><path d="M6 4.5L2.5 8 6 11.5M10 4.5L13.5 8 10 11.5"/></svg>';
  I.loop = '<svg class="ry-ico"' + SV + '><path d="M12.5 6.5A5 5 0 1 0 13 9.5"/><path d="M13 3.5v3h-3"/></svg>';

  /* ---------- İçerik ---------- */
  var SIGNALS = [
    { w: 'GÖRÜLDÜ', t: 'Bir reklamın görülmesi, ilgi yarattığını göstermez.', n: 'Gösterim bir temastır. İlgi, bakışın orada bir süre kalmasıyla başlar.' },
    { w: 'TIKLANDI', t: 'Bir reklamın tıklanması, satış gerçekleştiğini kanıtlamaz.', n: 'Tıklama bir merak sinyalidir. Satış, yolculuğun devamında karar verilirse oluşur.' },
    { w: 'MESAJ GELDİ', t: 'Bir mesajın başlatılması, o mesajın nitelikli bir talep olduğu anlamına gelmez.', n: 'Mesajın değeri, karşı taraftaki ihtiyacın gerçekliğiyle ve konuşmanın nasıl ilerlediğiyle anlaşılır.' }
  ];
  // Aynı kitle fotoğrafı, altı farklı ayrıntı: s = yakınlaşma, o = odak noktası (görselin yüzdesi)
  var AREAS = [
    { k: 'STRATEJİ', d: 'Markanın hedefleri, hedef kitlesi, rekabet koşulları ve kampanya öncelikleri belirlenir.', c: 'Önce bütün resim.', s: 1, o: '50% 50%' },
    { k: 'KREATİF', d: 'Reklamın mesajı, görsel dili ve kullanıcıya sunduğu değer netleştirilir.', c: 'Mesajı kim, hangi kareden görecek?', s: 2.1, o: '6% 52%' },
    { k: 'HEDEFLEME', d: 'Doğru kitlelere, doğru mecra ve kampanya mimarisi üzerinden ulaşılması planlanır.', c: 'Doğru kişi, doğru an.', s: 2.2, o: '34% 68%' },
    { k: 'ÖLÇÜM', d: 'Dönüşüm olayları, analitik altyapı ve verinin güvenilirliği değerlendirilir.', c: 'Hangi hareket gerçekten anlamlı?', s: 2.4, o: '80% 42%' },
    { k: 'OPTİMİZASYON', d: 'Kreatifler, bütçeler, hedeflemeler ve kampanya yapıları sonuçlara göre geliştirilir.', c: 'Neyin işe yaradığını tartmak.', s: 2.6, o: '53% 38%' },
    { k: 'RAPORLAMA', d: 'Platform verileri iş hedefleriyle ilişkilendirilerek anlamlı kararların alınması sağlanır.', c: 'Görüleni kayda geçirmek.', s: 2.3, o: '20% 24%' }
  ];
  var CRAFT = [
    { v: 'Test et.', t: 'Mesaj ve görsel alternatiflerini aynı koşullarda denemek.' },
    { v: 'Uyarla.', t: 'Hedef kitlenin farklı ihtiyaçlarına uygun kreatifler üretmek.' },
    { v: 'Bağla.', t: 'Reklamın ilk temasını ve sonraki kullanıcı yolculuğunu birlikte düşünmek.' },
    { v: 'Öğren.', t: 'Sonuçlardan öğrenerek sonraki kreatif kararlarını geliştirmek.' }
  ];
  var GOOGLE = ['Arama ağı reklamları', 'Performance Max kampanyaları', 'Arama niyeti ve anahtar kelime stratejisi', 'Dönüşüm odaklı reklam yapıları', 'Kampanya optimizasyonu'];
  var META = ['Instagram ve Facebook reklamları', 'Marka bilinirliği kampanyaları', 'Etkileşim ve video kampanyaları', 'Mesaj ve potansiyel müşteri odaklı kampanyalar', 'Satış ve dönüşüm kampanyaları', 'Kreatif testleri ve optimizasyon'];
  var MEASURE = [
    ['Google Analytics 4', 'Sitedeki ve uygulamadaki davranışı tek bir olay modeliyle okumak.'],
    ['Google Tag Manager', 'Etiketleri ve dönüşüm olaylarını kod değişikliğine bağlı kalmadan yönetmek.'],
    ['Dönüşüm olayları', 'Form, arama, mesaj ve satın alma gibi anlamlı adımları tanımlamak.'],
    ['Kampanya bağlantı parametreleri', 'UTM ile her ziyaretin hangi kampanyadan geldiğini ayırt etmek.'],
    ['Mesaj, form ve e-ticaret etkileşimleri', 'WhatsApp, form ve sepet adımlarını ölçülebilir hâle getirmek.'],
    ['Çevrimdışı dönüşüm eşleştirmesi', 'Uygun durumlarda satış kayıtlarını Google gelişmiş dönüşümler veya Meta Dönüşümler API\'si ile eşleştirmek.']
  ];
  var DECIDE = [
    ['Yüksek erişim', 'tek başına ticari başarı değildir.'],
    ['Düşük mesaj maliyeti', 'tek başına kaliteli satış fırsatı anlamına gelmez.'],
    ['Panelde raporlanan dönüşümler', 'işletmenin gerçek satış kayıtlarından farklı olabilir.'],
    ['WhatsApp, Instagram DM, telefon ve mağaza satışları', 'reklam paneline eksiksiz yansımayabilir.']
  ];
  var LOOP = [
    { v: 'YAYINLA.', t: 'Planlanan stratejiyi uygun kampanya yapısıyla hayata geçir.' },
    { v: 'ÖLÇ.', t: 'Gerçekten anlamlı sinyalleri izle.' },
    { v: 'ÖĞREN.', t: 'Sonuçları yaratıcı ve ticari bağlamda yorumla.' },
    { v: 'GELİŞTİR.', t: 'Kampanyayı ve sonraki yaratıcı kararları optimize et.' }
  ];

  function up(s) { return s.toLocaleUpperCase('tr-TR'); }
  // Gece panoları: poster + video; manifestoda harflerin içinden görünür
  function screen(r, label, eager, sizes, cls) {
    var ko = !!cls;   // manifestodaki kopya dekoratif: ekran okuyucudan gizli
    return '<div class="ry-screen' + (cls ? ' ' + cls : '') + '"' + (ko ? ' aria-hidden="true"' : '') + '>' +
      '<img class="ry-poster" alt="" decoding="async"' + (eager ? '' : ' loading="lazy"') + ' src="' + poster(V_ADS, 960, r) + '" srcset="' + poster(V_ADS, 640, r) + ' 640w, ' + poster(V_ADS, 960, r) + ' 960w, ' + poster(V_ADS, 1280, r) + ' 1280w" sizes="' + sizes + '">' +
      '<video class="ry-video" muted playsinline webkit-playsinline loop preload="none"' + (ko ? ' tabindex="-1"' : ' aria-label="' + label + '"') + '></video>' +
    '</div>' +
    (ko ? '' : '<p class="ry-screen__err" role="status"></p>');
  }
  function playBtn() { return '<button type="button" class="ry-play" aria-label="Videoyu duraklat" aria-pressed="false">' + I.pause + I.play + '</button>'; }
  // Kelimeyi düzelten el çizimi çizgi (ölçüye göre esner)
  function strike() { return '<svg class="ry-strike" viewBox="0 0 400 40" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M4 26C70 20 150 22 220 18S340 13 396 15" pathLength="1"/></svg>'; }

  function markup() {
    return '<main class="ry" id="icerik">' +
/* 01 — Hero */
'<section class="ry-hero" aria-labelledby="ry-hero-t">' +
  '<div class="ry-wrap ry-hero__grid">' +
    '<p class="ry-kicker"><span>1N Digital Media</span><span>Reklam yönetimi</span></p>' +
    '<h1 class="ry-hero__title" id="ry-hero-t">' +
      '<span class="ry-tl ry-tl--a">' + chars('REKLAM') + '</span>' +
      '<span class="ry-tl ry-tl--b">' + chars('YÖNETİMİ.') + '</span>' +
    '</h1>' +
    '<figure class="ry-board" data-ry="hero">' +
      '<div class="ry-board__frame">' + screen(16 / 9, 'Gece, ışıklı reklam panoları', true, '(max-width:767px) 100vw, 50vw') + playBtn() + '</div>' +
      '<figcaption class="ry-cap">Bir kentin ortasında aynı anda yüzlerce mesaj. Hangisi akılda kalıyor?</figcaption>' +
    '</figure>' +
    '<div class="ry-beyond">' +
      '<p class="ry-beyond__t"><span class="ry-sr">Tıklamanın ötesinde.</span>' +
        '<span class="ry-beyond__a" aria-hidden="true">TIKLAMANIN</span>' +
        '<span class="ry-beyond__b" aria-hidden="true"><span>ÖTESİNDE.</span></span>' +
        '<span class="ry-cur" aria-hidden="true">' + I.spark + I.cursor + '</span>' +
      '</p>' +
      '<p class="ry-hero__sub">Görünürlük bir başlangıçtır. Gerçek değer, doğru insanlara ulaşan ve ölçülebilir hedeflerle gelişen reklam stratejisinde ortaya çıkar.</p>' +
      '<a class="ry-scroll" href="#ry-sinyal"><span>Tıklamadan sonra ne olur?</span>' + I.down + '</a>' +
    '</div>' +
  '</div>' +
'</section>' +

/* 02 — Görünür olmak yetmez */
'<section class="ry-sec ry-sig" id="ry-sinyal" aria-labelledby="ry-sig-t">' +
  '<div class="ry-wrap">' +
    '<div class="ry-sig__head">' +
      '<div class="ry-sig__copy">' +
        '<p class="ry-label">Sinyaller</p>' +
        '<h2 class="ry-h2" id="ry-sig-t">' + ln('GÖRÜNÜR') + ln('OLMAK') + ln('YETMEZ.', 'ry-ln--acc') + '</h2>' +
        '<p class="ry-lede">Panoda, akışta ya da arama sonucunda görünmek bir temas yaratır. Ama her sinyal, üzerine kurulan anlam kadar değerlidir.</p>' +
      '</div>' +
      '<figure class="ry-sig__fig">' + pic(IM.hoarding, 'ry-sig__img', 'Bir şantiye panosunda art arda tekrar eden PAST PRESENT yazıları ve ortada FUTURE sözcüğü', '(max-width:767px) 88vw, 30vw', '38% 50%') +
        '<figcaption class="ry-cap">Aynı mesaj, yüz kez tekrar. Görülmek, hatırlanmak demek değil.</figcaption></figure>' +
    '</div>' +
    '<ol class="ry-sigs">' +
      SIGNALS.map(function (s, i) {
        return '<li class="ry-sigr">' +
          '<span class="ry-sigr__n" aria-hidden="true">0' + (i + 1) + '</span>' +
          '<p class="ry-sigr__w"><span class="ry-sigr__word">' + s.w + strike() + '</span></p>' +
          '<div class="ry-sigr__c"><p class="ry-sigr__t">' + s.t + '</p><p class="ry-sigr__n2">' + s.n + '</p></div>' +
        '</li>';
      }).join('') +
    '</ol>' +
    '<div class="ry-sig__end">' +
      '<figure class="ry-sig__news">' + pic(IM.news, 'ry-sig__nimg', 'Pembe ışık altında, ucu alev alan bir gazeteyi okuyan kadın', '(max-width:767px) 60vw, 24vw', '50% 40%') + '</figure>' +
      '<p class="ry-sig__last">İyi reklam yönetimi, bu sinyallerin her birini <em>doğru bağlamda</em> değerlendirmektir.</p>' +
    '</div>' +
  '</div>' +
'</section>' +

/* 03 — Performans bir sistemdir */
'<section class="ry-sec ry-sys" aria-labelledby="ry-sys-t">' +
  '<div class="ry-wrap">' +
    '<div class="ry-head">' +
      '<p class="ry-label">Sistem</p>' +
      '<h2 class="ry-h2" id="ry-sys-t">' + ln('PERFORMANS') + ln('BİR SİSTEMDİR.') + '</h2>' +
      '<p class="ry-lede">Aynı kitle, altı farklı soru. Bir alanı seçin; fotoğraf o alanın baktığı ayrıntıya yaklaşır.</p>' +
    '</div>' +
    '<div class="ry-sys__ui">' +
      '<div class="ry-sys__words" role="tablist" aria-label="Reklam yönetiminin altı çalışma alanı">' +
        AREAS.map(function (a, i) {
          return '<button type="button" class="ry-word' + (i === 0 ? ' is-on' : '') + '" role="tab" id="ry-word-' + i + '" aria-controls="ry-stage" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '">' +
            '<span class="ry-word__n" aria-hidden="true">0' + (i + 1) + '</span><span class="ry-word__k">' + a.k + '</span></button>';
        }).join('') +
      '</div>' +
      '<div class="ry-stage" id="ry-stage" role="tabpanel" aria-labelledby="ry-word-0">' +
        '<figure class="ry-lens"><div class="ry-lens__frame">' + pic(IM.crowd, 'ry-lens__img', 'Beyaz kapüşonlu genç bir grup: kimi telefonuna bakıyor, kimi fotoğraf çekiyor, kimi düşünüyor', '(max-width:767px) 100vw, 56vw', '', { w: 1200, ws: [800, 1200, 1800, 2400] }) + '</div>' +
          '<figcaption class="ry-cap ry-lens__cap">' + AREAS[0].c + '</figcaption></figure>' +
        '<div class="ry-stage__copy" aria-live="polite">' +
          '<p class="ry-stage__n"><b>01</b> / 06</p>' +
          '<h3 class="ry-stage__k">' + AREAS[0].k + '</h3>' +
          '<p class="ry-stage__d">' + AREAS[0].d + '</p>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</div>' +
'</section>' +

/* 04 — Yaratıcılık veriyle güçlenir */
'<section class="ry-sec ry-cd" aria-labelledby="ry-cd-t">' +
  '<div class="ry-wrap">' +
    '<div class="ry-head">' +
      '<p class="ry-label">Kreatif ve veri</p>' +
      '<h2 class="ry-h2" id="ry-cd-t">' + ln('YARATICILIK') + ln('VERİYLE') + ln('GÜÇLENİR.', 'ry-ln--acc') + '</h2>' +
      '<p class="ry-lede">Doğru fikir, doğru ölçümle gelişir.</p>' +
    '</div>' +
    '<figure class="ry-ab" style="--x:50%">' +
      '<div class="ry-ab__frame">' +
        pic(IM.wave, 'ry-ab__img ry-ab__img--b', 'Varyasyon B: kırmızı ve krem tonlarında soyut bir doku', '(max-width:767px) 100vw, 90vw', '50% 50%', { w: 1800, ws: [800, 1200, 1800, 2400] }) +
        '<div class="ry-ab__a">' + pic(IM.render, 'ry-ab__img', 'Varyasyon A: beyaz zeminde bir elma ve yeşil yapraklı cam silindirden oluşan ürün sahnesi', '(max-width:767px) 64vw, 58vw', '42% 26%', { w: 1200, ws: [800, 1200, 1800, 2400] }) + '</div>' +
        '<span class="ry-ab__tag ry-ab__tag--a" aria-hidden="true"><b>A</b> Ürünü göster</span>' +
        '<span class="ry-ab__tag ry-ab__tag--b" aria-hidden="true"><b>B</b> Hissi göster</span>' +
        '<span class="ry-ab__bar" aria-hidden="true"><span class="ry-ab__knob">' + I.swap + '</span></span>' +
        '<input class="ry-ab__range" type="range" min="4" max="96" value="50" step="1" aria-label="Varyasyon A ile B arasındaki ayırıcı" aria-valuetext="A yüzde 50, B yüzde 50">' +
      '</div>' +
      '<figcaption class="ry-cap">Örnek görselleştirme: aynı mesaj için iki kreatif yön. Gerçek bir test sonucu göstermez.</figcaption>' +
    '</figure>' +
    '<ol class="ry-craft">' +
      CRAFT.map(function (c) { return '<li class="ry-craft__i"><span class="ry-craft__v">' + ln(c.v) + '</span><p class="ry-craft__t">' + c.t + '</p></li>'; }).join('') +
    '</ol>' +
  '</div>' +
'</section>' +

/* 05 — Doğru mecra, doğru strateji */
'<section class="ry-sec ry-ch" aria-labelledby="ry-ch-t">' +
  '<div class="ry-wrap">' +
    '<div class="ry-head">' +
      '<p class="ry-label">Mecralar</p>' +
      '<h2 class="ry-h2" id="ry-ch-t">' + ln('DOĞRU MECRA.') + ln('DOĞRU STRATEJİ.') + '</h2>' +
      '<p class="ry-lede">İnsanlar bir yerde arar, başka bir yerde keşfeder. Strateji, hangi anda hangi mecrada konuşulacağını seçmektir.</p>' +
    '</div>' +
    '<div class="ry-ch__pair">' +
      '<article class="ry-ch__col ry-ch__col--g" aria-labelledby="ry-ch-g">' +
        '<p class="ry-ch__plat">Google Ads</p>' +
        '<h3 class="ry-ch__w" id="ry-ch-g"><span class="ry-type" data-text="ARAYAN">ARAYAN</span><span class="ry-caret" aria-hidden="true"></span></h3>' +
        '<p class="ry-ch__s">Niyet zaten var. İhtiyacını yazan kişiye doğru anda, doğru cevapla görünmek gerekir.</p>' +
        '<ul class="ry-ch__list">' + GOOGLE.map(function (g) { return '<li>' + g + '</li>'; }).join('') + '</ul>' +
      '</article>' +
      '<article class="ry-ch__col ry-ch__col--m" aria-labelledby="ry-ch-m">' +
        '<p class="ry-ch__plat">Meta Ads</p>' +
        '<h3 class="ry-ch__w" id="ry-ch-m">' + chars('KEŞFEDEN') + '</h3>' +
        '<p class="ry-ch__s">Niyet henüz oluşmamış olabilir. Akışta ilgiyi uyandırmak, sonra o ilgiyi bir talebe dönüştürmek gerekir.</p>' +
        '<ul class="ry-ch__list">' + META.map(function (g) { return '<li>' + g + '</li>'; }).join('') + '</ul>' +
      '</article>' +
    '</div>' +
    '<div class="ry-ms">' +
      '<div class="ry-ms__h"><h3 class="ry-ms__t">ÖLÇÜM ALTYAPISI</h3><p class="ry-ms__s">İki mecranın altındaki ortak zemin. Kurulum, kullanıcı izinleri (ör. Google İzin Modu) ve KVKK dikkate alınarak yapılır.</p></div>' +
      '<ul class="ry-ms__list">' + MEASURE.map(function (m) { return '<li><b>' + m[0] + '</b><span>' + m[1] + '</span></li>'; }).join('') + '</ul>' +
    '</div>' +
  '</div>' +
'</section>' +

/* 06 — Veriyi okumak yetmez */
'<section class="ry-sec ry-dec" aria-labelledby="ry-dec-t">' +
  '<div class="ry-wrap">' +
    '<p class="ry-label">Karar</p>' +
    '<h2 class="ry-dec__t" id="ry-dec-t">' +
      '<span class="ry-dec__a">' + ln('VERİYİ') + ln('OKUMAK') + ln('YETMEZ.') + '</span>' +
      '<span class="ry-dec__b">' + ln('KARARA') + ln('DÖNÜŞTÜRMEK') + ln('GEREKİR.', 'ry-ln--acc') + '</span>' +
    '</h2>' +
    '<figure class="ry-dec__fig"><div class="ry-dec__frame" data-ry="decision-video">' +
        '<div class="ry-dec__media">' +
          '<video class="ry-dec__video" muted playsinline webkit-playsinline loop preload="metadata" src="' + V_DEC + '" aria-label="Reklam verilerini ve analitik kararları anlatan video; sessiz oynatım"></video>' +
        '</div>' +
        '<button type="button" class="ry-play ry-dec__play" aria-label="Videoyu oynat" aria-pressed="true">' + I.pause + I.play + '</button>' +
        '<p class="ry-dec__error" role="status"></p></div>' +
      '<figcaption class="ry-cap">Panel bir pencere. Kararı, pencerenin dışında olanlarla birlikte veririz.</figcaption></figure>' +
    '<div class="ry-dec__rows">' +
      '<p class="ry-dec__hd" aria-hidden="true"><span>Panelde görünen</span><span>Okurken sorduğumuz</span></p>' +
      '<ul>' + DECIDE.map(function (d) { return '<li class="ry-dr"><b class="ry-dr__a">' + d[0] + '</b><span class="ry-dr__l" aria-hidden="true"></span><span class="ry-dr__b">' + d[1] + '</span></li>'; }).join('') + '</ul>' +
      '<p class="ry-dec__end">Bu nedenle yalnızca platform verisine değil, mümkün olduğu ölçüde gerçek müşteri ve satış geri bildirimlerine de bakarız.</p>' +
    '</div>' +
  '</div>' +
'</section>' +

/* 07 — Yayınla, ölç, öğren, geliştir */
'<section class="ry-sec ry-loop" aria-labelledby="ry-loop-t">' +
  '<div class="ry-wrap">' +
    '<p class="ry-label">Süreç</p>' +
    '<h2 class="ry-h2 ry-loop__t" id="ry-loop-t">' + LOOP.map(function (l) { return '<span class="ry-loop__w">' + ln(l.v) + '</span>'; }).join('') + '</h2>' +
  '</div>' +
  '<div class="ry-band" aria-hidden="true"><div class="ry-band__track">' +
    [0, 1, 2].map(function () { return LOOP.map(function (l, i) { return '<span class="ry-band__w' + (i % 2 ? ' is-o' : '') + '">' + l.v + '</span>'; }).join(''); }).join('') +
  '</div></div>' +
  '<div class="ry-wrap">' +
    '<ol class="ry-steps">' +
      LOOP.map(function (l, i) { return '<li class="ry-step is-on"><span class="ry-step__n">0' + (i + 1) + '</span><b class="ry-step__v">' + l.v + '</b><p class="ry-step__t">' + l.t + '</p></li>'; }).join('') +
    '</ol>' +
    '<p class="ry-loop__end">' + I.loop + '<span>Ve öğrendiklerimizle yeniden yayınla. Reklam yönetimi bir kurulum değil, devam eden bir süreçtir.</span></p>' +
  '</div>' +
'</section>' +

/* 08 — Manifesto */
'<section class="ry-sec ry-man" aria-labelledby="ry-man-t">' +
  '<div class="ry-wrap">' +
    '<p class="ry-label">Yaklaşım</p>' +
    '<h2 class="ry-man__t" id="ry-man-t">' +
      '<span class="ry-ko" data-ry="man">' + screen(16 / 9, 'Gece, ışıklı reklam panoları; manifesto sözcüklerinin içinden görünür', false, '100vw', 'ry-screen--ko') +
        '<span class="ry-ko__mask"><span class="ry-ko__l">BİZ SADECE</span><span class="ry-ko__l ry-ko__l--big">REKLAM</span><span class="ry-ko__l">YÖNETMİYORUZ.</span></span>' +
      '</span>' +
      '<span class="ry-man__b">' + ln('DAHA DOĞRU') + ln('KARARLAR', 'ry-ln--acc ry-man__k') + ln('TASARLIYORUZ.') + '</span>' +
    '</h2>' +
    '<div class="ry-man__foot"><p class="ry-man__p">Reklamı bir yayın düğmesi olarak değil; strateji, kreatif, ölçüm ve öğrenmenin birlikte çalıştığı bir karar sistemi olarak yönetiyoruz.</p>' + playBtn().replace('ry-play', 'ry-play ry-play--man') + '</div>' +
  '</div>' +
'</section>' +

/* 09 — Final */
'<section class="ry-fin" aria-labelledby="ry-fin-t">' +
  '<div class="ry-wrap ry-fin__grid">' +
    '<div class="ry-fin__copy">' +
      '<p class="ry-label">Başlayalım</p>' +
      '<h2 class="ry-fin__t" id="ry-fin-t">' + ln('REKLAMINIZI') + ln('BİRLİKTE') + ln('GELİŞTİRELİM.', 'ry-ln--acc') + '</h2>' +
      '<p class="ry-fin__sub">Stratejiden kreatife, ölçümden optimizasyona kadar dijital reklam süreçlerinizi birlikte değerlendirelim.</p>' +
      '<div class="ry-fin__cta">' +
        '<a class="ry-btn ry-btn--primary" href="/iletisim"><span>Projenizi Konuşalım</span><span class="ry-btn__ico">' + I.arrow + '</span></a>' +
        '<a class="ry-btn ry-btn--ghost" href="/teklif-al"><span>Teklif Al</span><span class="ry-btn__ico">' + I.arrow + '</span></a>' +
        '<span class="ry-cur ry-cur--fin" aria-hidden="true">' + I.spark + I.cursor + '</span>' +
      '</div>' +
    '</div>' +
    '<figure class="ry-fin__fig">' + pic(IM.streak, 'ry-fin__img', 'Turkuaz, kırmızı ve krem renklerin birbirini kestiği soyut fırça çizgileri', '(max-width:1024px) 34vw, 24vw', '46% 50%') +
      '<figcaption class="ry-cap">Her kesişim bir karar noktası.</figcaption></figure>' +
  '</div>' +
'</section>' +
'</main>';
  }

  /* ---------- CSS (yalnızca n1-reklam-yonetimi-v23 kapsamında) ---------- */
  var CSS = "n1-reklam-yonetimi-v23{--bg:#080A09;--g1:#0D0F0E;--g2:#121513;--ink:#ECEBE5;--soft:#BDBCB5;--mute:#9A9B95;--dim:#6E706A;--ghost:#2B2E2B;--line:rgba(228,227,221,.12);--line2:rgba(228,227,221,.07);--acc:#A8CF62;--ease:cubic-bezier(.22,1,.36,1);\n  --hdr:88px;--gap:clamp(18px,2.2vw,40px);--secpad:clamp(100px,8.6vw,168px);display:block;position:relative;width:100%;background:var(--bg);color:var(--ink);font:400 17px/1.6 Barlow,Arial,sans-serif;-webkit-font-smoothing:antialiased;overflow-x:clip;text-align:left}\nn1-reklam-yonetimi-v23 *,n1-reklam-yonetimi-v23 *::before,n1-reklam-yonetimi-v23 *::after{box-sizing:border-box;min-width:0}\nn1-reklam-yonetimi-v23 :where(.ry) :where(p,h1,h2,h3,ul,ol,figure,figcaption){margin:0}\nn1-reklam-yonetimi-v23 :where(.ry) :where(ul,ol){padding:0;list-style:none}\nn1-reklam-yonetimi-v23 :where(.ry) :where(a){color:inherit}\nn1-reklam-yonetimi-v23 :where(.ry) :where(button){font:inherit;color:inherit;background:none;border:0;padding:0;margin:0;cursor:pointer;-webkit-tap-highlight-color:transparent}\nn1-reklam-yonetimi-v23 .ry :focus-visible{outline:2px solid var(--acc);outline-offset:3px}\nn1-reklam-yonetimi-v23 .ry img{display:block;max-width:none}\nn1-reklam-yonetimi-v23 .ry-ico{display:block;flex:none}\nn1-reklam-yonetimi-v23 .ry-sr{position:absolute!important;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}\nn1-reklam-yonetimi-v23 .ry-wrap{width:90%;margin-left:auto;margin-right:auto}\nn1-reklam-yonetimi-v23 .ry-sec{position:relative;padding:var(--secpad) 0;border-top:1px solid var(--line)}\nn1-reklam-yonetimi-v23 .ry-label{display:flex;align-items:center;gap:12px;font:500 15px/1.3 Barlow,Arial,sans-serif;color:var(--mute)}\nn1-reklam-yonetimi-v23 .ry-label::before{content:\"\";flex:none;width:7px;height:7px;border-radius:1px;background:var(--acc)}\nn1-reklam-yonetimi-v23 .ry-ln{display:block;overflow:hidden;padding:.17em 0 .09em;margin:-.17em 0 -.09em}\nn1-reklam-yonetimi-v23 .ry-ln>span{display:block}\nn1-reklam-yonetimi-v23 .ry-ln--acc{color:var(--acc)}\nn1-reklam-yonetimi-v23 .ry-chs{display:inline-block;white-space:nowrap}\nn1-reklam-yonetimi-v23 .ry-ch{display:inline-block;will-change:transform}\nn1-reklam-yonetimi-v23 .ry-sp{display:inline-block;width:.24em}\nn1-reklam-yonetimi-v23 .ry-h2{margin-top:clamp(26px,2.4vw,40px);font:700 clamp(60px,7.4vw,148px)/1 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:-.016em;color:var(--ink)}\nn1-reklam-yonetimi-v23 .ry-cap{margin-top:14px;font-size:14px;line-height:1.5;color:var(--mute)}\nn1-reklam-yonetimi-v23 .ry-btn{position:relative;display:inline-flex;align-items:center;justify-content:space-between;gap:22px;height:64px;padding:0 10px 0 28px;border-radius:12px;overflow:hidden;white-space:nowrap;isolation:isolate;\n  font:500 13.5px/1 Barlow,Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase;text-decoration:none;color:var(--ink);border:1px solid rgba(168,207,98,.42);background:rgba(16,19,17,.72);transition:color .45s var(--ease),border-color .45s ease;touch-action:manipulation}\nn1-reklam-yonetimi-v23 .ry-btn::before{content:\"\";position:absolute;inset:0;z-index:-1;background:var(--acc);transform:scaleX(0);transform-origin:0 50%;transition:transform .6s cubic-bezier(.65,0,.35,1)}\nn1-reklam-yonetimi-v23 .ry-btn__ico{display:grid;place-items:center;width:44px;height:44px;border-radius:8px;background:rgba(168,207,98,.12);transition:background-color .45s ease}\nn1-reklam-yonetimi-v23 .ry-btn--ghost{border-color:rgba(228,227,221,.22);background:rgba(8,10,9,.5)}\nn1-reklam-yonetimi-v23 .ry-btn--ghost .ry-btn__ico{background:rgba(236,235,229,.06)}\nn1-reklam-yonetimi-v23 .ry-btn:hover,n1-reklam-yonetimi-v23 .ry-btn:focus-visible{color:#0A0B0B;border-color:var(--acc)}\nn1-reklam-yonetimi-v23 .ry-btn:hover::before,n1-reklam-yonetimi-v23 .ry-btn:focus-visible::before{transform:scaleX(1)}\nn1-reklam-yonetimi-v23 .ry-btn:hover .ry-btn__ico,n1-reklam-yonetimi-v23 .ry-btn:focus-visible .ry-btn__ico{background:rgba(10,11,11,.12)}\n.n1h-panel[data-n1-ry],.n1h-panel[data-n1-ry] *,.n1h-panel[data-n1-ry] *::before,.n1h-panel[data-n1-ry] *::after{box-sizing:border-box}\n.n1h-panel[data-n1-ry] a.n1h-item{text-decoration:none;color:#ecebe6}\n.n1h-panel[data-n1-ry] .n1h-sub a{text-decoration:none}\n@media (max-width:1024px){.n1h-panel[data-n1-ry][data-open]::before{content:\"\";position:fixed;left:0;right:0;bottom:0;top:72px;z-index:-1;pointer-events:none;background:rgba(8,10,9,.8);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}}\n@media (max-width:767px){.n1h-panel[data-n1-ry][data-open]::before{top:64px}}\nn1-reklam-yonetimi-v23 .n1ft-partner-art{display:none}\nn1-reklam-yonetimi-v23 .ry-head{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:end}\nn1-reklam-yonetimi-v23 .ry-head .ry-label,n1-reklam-yonetimi-v23 .ry-head .ry-h2{grid-column:1/9}\nn1-reklam-yonetimi-v23 .ry-lede{grid-column:9/13;grid-row:2;max-width:34ch;font-size:clamp(17px,1.3vw,22px);line-height:1.5;color:var(--soft)}\nn1-reklam-yonetimi-v23 .ry-cap{margin-top:14px;font-size:14px;line-height:1.5;color:var(--mute)}\nn1-reklam-yonetimi-v23 .ry-screen{position:absolute;inset:0;overflow:hidden;background:#0B0D0C}\nn1-reklam-yonetimi-v23 .ry-poster,n1-reklam-yonetimi-v23 .ry-video{position:absolute;inset:0;display:block;width:100%;height:100%;object-fit:cover}\nn1-reklam-yonetimi-v23 .ry-video{opacity:0;transition:opacity .6s var(--ease)}\nn1-reklam-yonetimi-v23 .ry-screen.is-started .ry-video{opacity:1}\nn1-reklam-yonetimi-v23 .ry-screen.is-failed .ry-video{opacity:0}\nn1-reklam-yonetimi-v23 .ry-screen__err{position:absolute;left:14px;right:14px;bottom:14px;z-index:2;font-size:12px;line-height:1.4;color:var(--soft)}\nn1-reklam-yonetimi-v23 .ry-screen__err:empty{display:none}\nn1-reklam-yonetimi-v23 .ry-play{position:absolute;right:14px;top:14px;z-index:3;display:grid;place-items:center;width:40px;height:40px;border-radius:50%;background:rgba(8,10,9,.6);color:var(--ink);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);transition:background-color .3s var(--ease),color .3s var(--ease);touch-action:manipulation}\nn1-reklam-yonetimi-v23 .ry-play:hover,n1-reklam-yonetimi-v23 .ry-play:focus-visible{background:var(--acc);color:#080A09}\nn1-reklam-yonetimi-v23 .ry-play .ry-ico--play,n1-reklam-yonetimi-v23 .ry-play[aria-pressed=\"true\"] .ry-ico--pause{display:none}\nn1-reklam-yonetimi-v23 .ry-play[aria-pressed=\"true\"] .ry-ico--play{display:block}\nn1-reklam-yonetimi-v23 .ry-play:disabled{display:none}\nn1-reklam-yonetimi-v23 .ry-cur{position:absolute;left:0;top:0;z-index:4;width:clamp(26px,2.1vw,38px);color:var(--ink);opacity:0;pointer-events:none;will-change:transform}\nn1-reklam-yonetimi-v23 .ry-cur__svg{display:block;width:100%;height:auto;filter:drop-shadow(0 4px 10px rgba(0,0,0,.45))}\nn1-reklam-yonetimi-v23 .ry-spark{position:absolute;left:-62%;top:-58%;width:100%;height:auto;color:var(--acc);opacity:0}\nn1-reklam-yonetimi-v23 .ry-hero{position:relative;padding:calc(var(--hdr) + clamp(26px,3vw,54px)) 0 clamp(80px,7vw,130px);overflow:hidden;isolation:isolate}\nn1-reklam-yonetimi-v23 .ry-hero__grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap)}\nn1-reklam-yonetimi-v23 .ry-kicker{grid-column:1/-1;display:flex;flex-wrap:wrap;gap:6px 28px;font:500 14px/1.3 Barlow,Arial,sans-serif;letter-spacing:.04em;color:var(--mute)}\nn1-reklam-yonetimi-v23 .ry-kicker span:first-child{color:var(--ink)}\nn1-reklam-yonetimi-v23 .ry-hero__title{grid-column:1/8;grid-row:2;align-self:start;margin-top:clamp(30px,3.4vw,64px);font:700 clamp(76px,10.6vw,210px)/.9 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:-.018em;color:var(--ink)}\nn1-reklam-yonetimi-v23 .ry-tl{display:block;overflow:hidden;padding:.16em 0 .06em;margin:-.16em 0 -.06em;white-space:nowrap}\nn1-reklam-yonetimi-v23 .ry{container-type:inline-size}\nn1-reklam-yonetimi-v23 .ry-board{grid-column:8/-1;grid-row:2;align-self:start;margin:clamp(34px,3.6vw,70px) -5vw 0 0;margin-right:-5cqw}\nn1-reklam-yonetimi-v23 .ry-board__frame{position:relative;aspect-ratio:16/9;border-radius:4px 0 0 4px;overflow:hidden;background:#0B0D0C}\nn1-reklam-yonetimi-v23 .ry-board .ry-cap{max-width:40ch}\nn1-reklam-yonetimi-v23 .ry-beyond{grid-column:1/-1;grid-row:3;display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:end;margin-top:clamp(44px,4.4vw,90px)}\nn1-reklam-yonetimi-v23 .ry-beyond__t{position:relative;grid-column:1/9;grid-row:1/3;display:flex;flex-wrap:wrap;align-items:baseline;gap:0 .2em;font:700 clamp(52px,6.8vw,136px)/.98 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:-.012em}\nn1-reklam-yonetimi-v23 .ry-beyond__a{color:var(--ink)}\nn1-reklam-yonetimi-v23 .ry-beyond__b{display:inline-block;overflow:hidden;padding:.16em .04em .06em 0;margin:-.16em 0 -.06em;color:var(--acc)}\nn1-reklam-yonetimi-v23 .ry-beyond__b>span{display:inline-block}\nn1-reklam-yonetimi-v23 .ry-hero__sub{grid-column:9/13;grid-row:1;max-width:36ch;font-size:clamp(17px,1.25vw,21px);line-height:1.55;color:var(--soft)}\nn1-reklam-yonetimi-v23 .ry-scroll{grid-column:9/13;grid-row:2;justify-self:start;display:inline-flex;align-items:center;gap:12px;margin-top:26px;padding:6px 0;font:500 15px/1.3 Barlow,Arial,sans-serif;color:var(--ink);text-decoration:none}\nn1-reklam-yonetimi-v23 .ry-scroll .ry-ico{color:var(--acc);transition:transform .4s var(--ease)}\nn1-reklam-yonetimi-v23 .ry-scroll:hover .ry-ico{transform:translateY(3px)}\nn1-reklam-yonetimi-v23 .ry-sig__head{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:end}\nn1-reklam-yonetimi-v23 .ry-sig__copy{grid-column:1/8}\nn1-reklam-yonetimi-v23 .ry-sig__copy .ry-lede{max-width:40ch;margin-top:clamp(26px,2.2vw,40px)}\nn1-reklam-yonetimi-v23 .ry-sig__fig{grid-column:9/13}\nn1-reklam-yonetimi-v23 .ry-sig__img{width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:4px;background:var(--g1)}\nn1-reklam-yonetimi-v23 .ry-sigs{margin-top:clamp(70px,7vw,130px);border-top:1px solid var(--line)}\nn1-reklam-yonetimi-v23 .ry-sigr{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:center;padding:clamp(30px,3vw,54px) 0;border-bottom:1px solid var(--line)}\nn1-reklam-yonetimi-v23 .ry-sigr__n{grid-column:1/2;align-self:start;margin-top:.5em;font:500 14px/1 Barlow,Arial,sans-serif;color:var(--mute)}\nn1-reklam-yonetimi-v23 .ry-sigr__w{grid-column:2/8;font:700 clamp(54px,7vw,140px)/.98 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:-.012em}\nn1-reklam-yonetimi-v23 .ry-sigr__word{position:relative;display:inline-block;color:var(--mute);white-space:nowrap}\nn1-reklam-yonetimi-v23 .ry-strike{position:absolute;left:-3%;top:34%;width:106%;height:.34em;overflow:visible;pointer-events:none}\nn1-reklam-yonetimi-v23 .ry-strike path{fill:none;stroke:var(--acc);stroke-width:6px;stroke-linecap:round;vector-effect:non-scaling-stroke;stroke-dasharray:1;stroke-dashoffset:0}\nn1-reklam-yonetimi-v23 .ry-sigr__c{grid-column:8/13}\nn1-reklam-yonetimi-v23 .ry-sigr__t{font:600 clamp(20px,1.55vw,28px)/1.35 Barlow,Arial,sans-serif;color:var(--ink)}\nn1-reklam-yonetimi-v23 .ry-sigr__n2{margin-top:12px;max-width:44ch;font-size:16px;line-height:1.55;color:var(--soft)}\nn1-reklam-yonetimi-v23 .ry-sig__end{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:center;margin-top:clamp(70px,7vw,130px)}\nn1-reklam-yonetimi-v23 .ry-sig__news{grid-column:1/5}\nn1-reklam-yonetimi-v23 .ry-sig__nimg{width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:4px;background:var(--g1)}\nn1-reklam-yonetimi-v23 .ry-sig__last{grid-column:6/13;font:700 clamp(40px,4.4vw,86px)/1.04 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:-.008em;color:var(--ink)}\nn1-reklam-yonetimi-v23 .ry-sig__last em{font-style:normal;color:var(--acc)}\nn1-reklam-yonetimi-v23 .ry-sys__ui{margin-top:clamp(56px,5vw,96px)}\nn1-reklam-yonetimi-v23 .ry-sys__words{display:flex;flex-wrap:wrap;gap:.1em .46em;padding-top:clamp(24px,2vw,36px);border-top:1px solid var(--line);font:700 clamp(40px,5vw,98px)/1 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:-.01em}\nn1-reklam-yonetimi-v23 .ry-word{position:relative;display:inline-flex;align-items:flex-start;gap:.16em;padding:.06em 0 .14em;color:#5F625C;text-align:left;transition:color .45s var(--ease);touch-action:manipulation}\nn1-reklam-yonetimi-v23 .ry-word::after{content:\"\";position:absolute;left:0;right:0;bottom:0;height:3px;background:var(--acc);transform:scaleX(0);transform-origin:0 50%;transition:transform .6s var(--ease)}\nn1-reklam-yonetimi-v23 .ry-word:hover{color:var(--soft)}\nn1-reklam-yonetimi-v23 .ry-word.is-on{color:var(--ink)}\nn1-reklam-yonetimi-v23 .ry-word.is-on::after{transform:scaleX(1)}\nn1-reklam-yonetimi-v23 .ry-word__n{margin-top:.42em;font:500 13px/1 Barlow,Arial,sans-serif;letter-spacing:.02em;color:var(--mute)}\nn1-reklam-yonetimi-v23 .ry-word.is-on .ry-word__n{color:var(--acc)}\nn1-reklam-yonetimi-v23 .ry-stage{font:400 17px/1.6 Barlow,Arial,sans-serif;letter-spacing:normal;display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:end;margin-top:clamp(40px,3.6vw,68px)}\nn1-reklam-yonetimi-v23 .ry-lens{grid-column:1/8}\nn1-reklam-yonetimi-v23 .ry-lens__frame{position:relative;aspect-ratio:16/10;overflow:hidden;border-radius:4px;background:var(--g1)}\nn1-reklam-yonetimi-v23 .ry-lens__img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transform-origin:50% 50%;transition:transform 1.25s var(--ease),transform-origin 1.25s var(--ease)}\nn1-reklam-yonetimi-v23 .ry-stage__copy{grid-column:9/13;padding-bottom:40px}\nn1-reklam-yonetimi-v23 .ry-stage__n{font:500 14px/1 Barlow,Arial,sans-serif;color:var(--mute)}\nn1-reklam-yonetimi-v23 .ry-stage__n b{font-weight:500;color:var(--acc)}\nn1-reklam-yonetimi-v23 .ry-stage__k{margin-top:18px;font:700 clamp(38px,3.4vw,66px)/1 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;color:var(--ink)}\nn1-reklam-yonetimi-v23 .ry-stage__d{margin-top:18px;max-width:34ch;font-size:clamp(17px,1.25vw,20px);line-height:1.55;color:var(--soft)}\nn1-reklam-yonetimi-v23 .ry-ab{margin-top:clamp(56px,5vw,96px)}\nn1-reklam-yonetimi-v23 .ry-ab__frame{position:relative;aspect-ratio:2/1;overflow:hidden;border-radius:4px;background:var(--g1);-webkit-user-select:none;user-select:none}\nn1-reklam-yonetimi-v23 .ry-ab__img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}\nn1-reklam-yonetimi-v23 .ry-ab__a{position:absolute;inset:0;background:#ECEBE7;clip-path:inset(0 calc(100% - var(--x)) 0 0)}\nn1-reklam-yonetimi-v23 .ry-ab__a .ry-ab__img{right:auto;width:64%;-webkit-mask-image:linear-gradient(90deg,#000 78%,transparent);mask-image:linear-gradient(90deg,#000 78%,transparent)}\nn1-reklam-yonetimi-v23 .ry-ab__bar{position:absolute;top:0;bottom:0;left:var(--x);width:2px;margin-left:-1px;background:var(--ink);pointer-events:none}\nn1-reklam-yonetimi-v23 .ry-ab__knob{position:absolute;top:50%;left:50%;display:grid;place-items:center;width:54px;height:54px;margin:-27px 0 0 -27px;border-radius:50%;background:var(--acc);color:#080A09;box-shadow:0 8px 24px rgba(0,0,0,.35);transition:transform .35s var(--ease)}\nn1-reklam-yonetimi-v23 .ry-ab__range{position:absolute;inset:0;z-index:2;width:100%;height:100%;margin:0;opacity:0;cursor:ew-resize;touch-action:pan-y}\nn1-reklam-yonetimi-v23 .ry-ab__frame:focus-within .ry-ab__knob,n1-reklam-yonetimi-v23 .ry-ab__frame:hover .ry-ab__knob{transform:scale(1.1)}\nn1-reklam-yonetimi-v23 .ry-ab__frame:has(.ry-ab__range:focus-visible){outline:2px solid var(--acc);outline-offset:4px}\nn1-reklam-yonetimi-v23 .ry-ab__tag{position:absolute;top:18px;z-index:1;display:flex;align-items:center;gap:10px;padding:9px 14px;border-radius:6px;background:rgba(8,10,9,.76);font:500 14px/1 Barlow,Arial,sans-serif;color:var(--ink);pointer-events:none}\nn1-reklam-yonetimi-v23 .ry-ab__tag b{font:700 18px/1 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;color:var(--acc)}\nn1-reklam-yonetimi-v23 .ry-ab__tag--a{left:18px}\nn1-reklam-yonetimi-v23 .ry-ab__tag--b{right:18px}\nn1-reklam-yonetimi-v23 .ry-craft{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));column-gap:var(--gap);row-gap:40px;margin-top:clamp(48px,4.4vw,84px)}\nn1-reklam-yonetimi-v23 .ry-craft__i{padding-top:22px;border-top:1px solid var(--line)}\nn1-reklam-yonetimi-v23 .ry-craft__v{display:block;font:700 clamp(36px,3.3vw,64px)/1 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;color:var(--ink)}\nn1-reklam-yonetimi-v23 .ry-craft__t{margin-top:14px;max-width:28ch;font-size:16px;line-height:1.55;color:var(--soft)}\nn1-reklam-yonetimi-v23 .ry-ch__pair{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));margin-top:clamp(56px,5vw,96px);border-top:1px solid var(--line)}\nn1-reklam-yonetimi-v23 .ry-ch__col{padding:clamp(34px,3vw,58px) 0 clamp(8px,1vw,16px)}\nn1-reklam-yonetimi-v23 .ry-ch__col--g{padding-right:var(--gap);border-right:1px solid var(--line)}\nn1-reklam-yonetimi-v23 .ry-ch__col--m{padding-left:var(--gap)}\nn1-reklam-yonetimi-v23 .ry-ch__plat{font:500 15px/1.3 Barlow,Arial,sans-serif;color:var(--mute)}\nn1-reklam-yonetimi-v23 .ry-ch__w{display:flex;align-items:flex-end;margin-top:12px;font:700 clamp(64px,7.6vw,150px)/.98 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:-.014em;color:var(--ink);white-space:nowrap}\nn1-reklam-yonetimi-v23 .ry-caret{display:inline-block;flex:none;width:.06em;height:.74em;margin:0 0 .12em .07em;background:var(--acc);animation:ry-blink 1.1s steps(1) infinite}\nn1-reklam-yonetimi-v23 .ry-ch__s{margin-top:22px;max-width:32ch;font-size:clamp(18px,1.4vw,23px);line-height:1.45;color:var(--soft)}\nn1-reklam-yonetimi-v23 .ry-ch__list{margin-top:32px;border-top:1px solid var(--line2)}\nn1-reklam-yonetimi-v23 .ry-ch__list li{display:flex;gap:14px;padding:14px 0;border-bottom:1px solid var(--line2);font-size:17px;line-height:1.45;color:var(--ink)}\nn1-reklam-yonetimi-v23 .ry-ch__list li::before{content:\"\";flex:none;width:12px;height:1px;margin-top:.75em;background:var(--acc)}\nn1-reklam-yonetimi-v23 .ry-ms{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);margin-top:clamp(64px,6vw,110px);padding-top:clamp(30px,2.6vw,48px);border-top:1px solid var(--acc)}\nn1-reklam-yonetimi-v23 .ry-ms__h{grid-column:1/5}\nn1-reklam-yonetimi-v23 .ry-ms__t{font:700 clamp(36px,3.2vw,60px)/1 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;color:var(--ink)}\nn1-reklam-yonetimi-v23 .ry-ms__s{margin-top:16px;max-width:34ch;font-size:16px;line-height:1.55;color:var(--soft)}\nn1-reklam-yonetimi-v23 .ry-ms__list{grid-column:6/13;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:var(--gap)}\nn1-reklam-yonetimi-v23 .ry-ms__list li{padding:16px 0;border-bottom:1px solid var(--line2)}\nn1-reklam-yonetimi-v23 .ry-ms__list b{display:block;font:600 17px/1.35 Barlow,Arial,sans-serif;color:var(--ink)}\nn1-reklam-yonetimi-v23 .ry-ms__list span{display:block;margin-top:6px;font-size:15px;line-height:1.5;color:var(--mute)}\nn1-reklam-yonetimi-v23 .ry-dec__t{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);margin-top:clamp(26px,2.4vw,40px);font:700 clamp(58px,7vw,140px)/1 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:-.014em}\nn1-reklam-yonetimi-v23 .ry-dec__a{grid-column:1/8;color:var(--mute)}\nn1-reklam-yonetimi-v23 .ry-dec__b{grid-column:5/13;margin-top:.3em;color:var(--ink)}\nn1-reklam-yonetimi-v23 .ry-dec__fig{margin-top:clamp(56px,5vw,96px)}\nn1-reklam-yonetimi-v23 .ry-dec__frame{position:relative;aspect-ratio:21/9;overflow:hidden;border-radius:4px;background:var(--g1)}\nn1-reklam-yonetimi-v23 .ry-dec__rows{margin-top:clamp(56px,5vw,96px)}\nn1-reklam-yonetimi-v23 .ry-dec__hd,n1-reklam-yonetimi-v23 .ry-dr{display:grid;grid-template-columns:minmax(0,5fr) minmax(36px,2fr) minmax(0,5fr);column-gap:var(--gap);align-items:center}\nn1-reklam-yonetimi-v23 .ry-dec__hd{padding-bottom:14px;border-bottom:1px solid var(--line);font-size:14px;color:var(--mute)}\nn1-reklam-yonetimi-v23 .ry-dec__hd span:last-child{grid-column:3}\nn1-reklam-yonetimi-v23 .ry-dr{padding:clamp(22px,2vw,36px) 0;border-bottom:1px solid var(--line)}\nn1-reklam-yonetimi-v23 .ry-dr__a{font:700 clamp(28px,2.7vw,52px)/1.06 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;color:var(--ink)}\nn1-reklam-yonetimi-v23 .ry-dr__l{display:block;height:1px;background:var(--acc);transform-origin:0 50%}\nn1-reklam-yonetimi-v23 .ry-dr__b{font-size:clamp(18px,1.4vw,24px);line-height:1.4;color:var(--soft)}\nn1-reklam-yonetimi-v23 .ry-dec__end{max-width:46ch;margin:clamp(36px,3vw,56px) 0 0 auto;font-size:clamp(18px,1.4vw,23px);line-height:1.5;color:var(--ink)}\nn1-reklam-yonetimi-v23 .ry-loop__t{display:flex;flex-wrap:wrap;gap:0 .26em}\nn1-reklam-yonetimi-v23 .ry-loop__w:nth-child(2n) .ry-ln>span{color:var(--mute)}\nn1-reklam-yonetimi-v23 .ry-band{margin-top:clamp(48px,4.4vw,84px);overflow:hidden;padding:clamp(16px,1.4vw,26px) 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}\nn1-reklam-yonetimi-v23 .ry-band__track{display:flex;gap:.36em;width:max-content;font:700 clamp(84px,11vw,220px)/1 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:-.01em;white-space:nowrap;will-change:transform}\nn1-reklam-yonetimi-v23 .ry-band__w{color:#1F2220}\nn1-reklam-yonetimi-v23 .ry-band__w.is-o{color:transparent;-webkit-text-stroke:1px rgba(236,235,229,.3)}\nn1-reklam-yonetimi-v23 .ry-steps{position:relative;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));column-gap:var(--gap);margin-top:clamp(44px,4vw,76px);--p:1}\nn1-reklam-yonetimi-v23 .ry-steps::before,n1-reklam-yonetimi-v23 .ry-steps::after{content:\"\";position:absolute;left:0;right:0;top:0;height:1px;background:var(--line)}\nn1-reklam-yonetimi-v23 .ry-steps::after{height:2px;background:var(--acc);transform:scaleX(var(--p));transform-origin:0 50%}\nn1-reklam-yonetimi-v23 .ry-step{padding-top:28px;color:var(--mute);transition:color .5s var(--ease)}\nn1-reklam-yonetimi-v23 .ry-step.is-on{color:var(--ink)}\nn1-reklam-yonetimi-v23 .ry-step__n{display:block;font:500 14px/1 Barlow,Arial,sans-serif;color:var(--mute)}\nn1-reklam-yonetimi-v23 .ry-step.is-on .ry-step__n{color:var(--acc)}\nn1-reklam-yonetimi-v23 .ry-step__v{display:block;margin-top:16px;font:700 clamp(32px,2.8vw,54px)/1 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif}\nn1-reklam-yonetimi-v23 .ry-step__t{margin-top:12px;max-width:26ch;font-size:16px;line-height:1.55}\nn1-reklam-yonetimi-v23 .ry-loop__end{display:flex;align-items:center;gap:14px;margin-top:clamp(40px,3.4vw,64px);font-size:17px;line-height:1.5;color:var(--soft)}\nn1-reklam-yonetimi-v23 .ry-loop__end .ry-ico{width:20px;height:20px;color:var(--acc)}\nn1-reklam-yonetimi-v23 .ry-man__t{display:block;margin-top:clamp(26px,2.4vw,40px)}\nn1-reklam-yonetimi-v23 .ry-ko{position:relative;display:block;overflow:hidden;isolation:isolate;border-radius:4px}\nn1-reklam-yonetimi-v23 .ry-screen--ko{z-index:0}\nn1-reklam-yonetimi-v23 .ry-screen--ko::after{content:\"\";position:absolute;inset:0;background:#CFCEC8;mix-blend-mode:screen;opacity:.46;pointer-events:none}\nn1-reklam-yonetimi-v23 .ry-ko__mask{position:relative;z-index:1;display:block;padding:.04em .02em .08em;background:#080A09;color:#fff;mix-blend-mode:multiply}\nn1-reklam-yonetimi-v23 .ry-ko__l{display:block;font:700 clamp(60px,7.4vw,148px)/.95 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:-.012em}\nn1-reklam-yonetimi-v23 .ry-ko__l--big{margin:.02em 0 .04em -.03em;font-size:clamp(130px,24vw,470px);line-height:.82;letter-spacing:-.03em}\nn1-reklam-yonetimi-v23 .ry-man__b{display:block;margin-top:clamp(22px,2vw,40px);font:700 clamp(60px,7.4vw,148px)/1 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:-.012em;color:var(--ink)}\nn1-reklam-yonetimi-v23 .ry-man__foot{display:flex;align-items:flex-end;justify-content:space-between;gap:var(--gap);margin-top:clamp(40px,3.6vw,68px)}\nn1-reklam-yonetimi-v23 .ry-man__p{max-width:46ch;font-size:clamp(18px,1.35vw,22px);line-height:1.5;color:var(--soft)}\nn1-reklam-yonetimi-v23 .ry-play--man{position:relative;right:auto;top:auto;flex:none;width:48px;height:48px;border:1px solid var(--line)}\nn1-reklam-yonetimi-v23 .ry-fin{position:relative;padding:var(--secpad) 0 clamp(110px,9vw,170px);border-top:1px solid var(--line);overflow:hidden}\nn1-reklam-yonetimi-v23 .ry-fin__grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:end}\nn1-reklam-yonetimi-v23 .ry-fin__copy{grid-column:1/9}\nn1-reklam-yonetimi-v23 .ry-fin__t{margin-top:clamp(26px,2.4vw,40px);font:700 clamp(68px,8.6vw,170px)/1 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:-.014em;color:var(--ink)}\nn1-reklam-yonetimi-v23 .ry-fin__sub{margin-top:30px;max-width:46ch;font-size:clamp(18px,1.3vw,22px);line-height:1.55;color:var(--soft)}\nn1-reklam-yonetimi-v23 .ry-fin__cta{position:relative;display:flex;flex-wrap:wrap;gap:14px;margin-top:40px}\nn1-reklam-yonetimi-v23 .ry-fin__fig{grid-column:10/13}\nn1-reklam-yonetimi-v23 .ry-fin__img{width:100%;aspect-ratio:3/5;object-fit:cover;border-radius:4px;background:var(--g1)}\n@keyframes ry-blink{50%{opacity:0}}\n@media (max-width:1024px){\nn1-reklam-yonetimi-v23 .ry-hero__title{grid-column:1/-1;font-size:clamp(76px,13.6vw,150px)}\nn1-reklam-yonetimi-v23 .ry-board{grid-column:3/-1;grid-row:3;margin:clamp(30px,4vw,48px) -5vw 0 0;margin-right:-5cqw}\nn1-reklam-yonetimi-v23 .ry-beyond{grid-row:4;margin-top:clamp(36px,5vw,60px)}\nn1-reklam-yonetimi-v23 .ry-beyond__t{grid-column:1/-1;grid-row:1;font-size:clamp(52px,9.4vw,100px)}\nn1-reklam-yonetimi-v23 .ry-hero__sub{grid-column:1/9;grid-row:2;margin-top:28px}\nn1-reklam-yonetimi-v23 .ry-scroll{grid-column:1/9;grid-row:3}\nn1-reklam-yonetimi-v23 .ry-head .ry-label,n1-reklam-yonetimi-v23 .ry-head .ry-h2{grid-column:1/-1}\nn1-reklam-yonetimi-v23 .ry-lede{grid-column:1/10;grid-row:3;margin-top:28px}\nn1-reklam-yonetimi-v23 .ry-sig__copy{grid-column:1/8}\nn1-reklam-yonetimi-v23 .ry-sig__fig{grid-column:8/13}\nn1-reklam-yonetimi-v23 .ry-sigr__w{grid-column:2/-1}\nn1-reklam-yonetimi-v23 .ry-sigr__c{grid-column:2/-1;margin-top:20px}\nn1-reklam-yonetimi-v23 .ry-sig__news{grid-column:1/6}\nn1-reklam-yonetimi-v23 .ry-sig__last{grid-column:6/13;font-size:clamp(34px,4.8vw,56px)}\nn1-reklam-yonetimi-v23 .ry-sys__words{font-size:clamp(38px,6.4vw,66px)}\nn1-reklam-yonetimi-v23 .ry-stage{display:block}\nn1-reklam-yonetimi-v23 .ry-stage__copy{max-width:560px;margin-top:26px;padding-bottom:0}\nn1-reklam-yonetimi-v23 .ry-ab__frame{aspect-ratio:16/10}\nn1-reklam-yonetimi-v23 .ry-craft{grid-template-columns:repeat(2,minmax(0,1fr))}\nn1-reklam-yonetimi-v23 .ry-ch__w{font-size:clamp(56px,8.4vw,86px)}\nn1-reklam-yonetimi-v23 .ry-ms__h{grid-column:1/-1}\nn1-reklam-yonetimi-v23 .ry-ms__list{grid-column:1/-1;margin-top:26px}\nn1-reklam-yonetimi-v23 .ry-dec__a{grid-column:1/-1}\nn1-reklam-yonetimi-v23 .ry-dec__b{grid-column:3/-1}\nn1-reklam-yonetimi-v23 .ry-dec__frame{aspect-ratio:16/9}\nn1-reklam-yonetimi-v23 .ry-steps{grid-template-columns:repeat(2,minmax(0,1fr));row-gap:40px}\nn1-reklam-yonetimi-v23 .ry-fin__copy{grid-column:1/9}\nn1-reklam-yonetimi-v23 .ry-fin__fig{grid-column:9/13}\nn1-reklam-yonetimi-v23 .ry-fin__t{font-size:clamp(60px,9.4vw,100px)}\nn1-reklam-yonetimi-v23 n1-header{display:block!important;position:fixed!important;top:0!important;left:0!important;right:0!important;width:100%!important;min-height:0!important;height:auto!important;z-index:900!important;background:rgba(8,10,9,.95);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);border-bottom:1px solid rgba(228,227,221,.07)}\nn1-reklam-yonetimi-v23 n1-header .n1h-bar.site-container{display:grid!important;align-items:center!important;width:calc(100% - 48px)!important;margin-inline:auto!important;padding-inline:0!important;height:72px!important;max-width:100%!important}\nn1-reklam-yonetimi-v23 n1-header .n1h-logo{margin:0!important;flex:none}\nn1-reklam-yonetimi-v23 n1-header .n1h-logo img{width:32px!important;height:32px!important;max-width:none!important}\nn1-reklam-yonetimi-v23 n1-header .n1h-right{align-items:center!important}\nn1-reklam-yonetimi-v23 n1-header .n1h-menu{display:inline-flex!important;height:40px!important;margin:0!important}\nn1-reklam-yonetimi-v23 n1-header .n1h-cta{display:none!important}\nn1-reklam-yonetimi-v23 footer.n1ft .n1ft-partner{opacity:1!important;visibility:visible!important;transform:none!important}\n}\n@media (max-width:900px){n1-reklam-yonetimi-v23 .n1ft-inner{width:90%}}\n@media (max-width:767px){\nn1-reklam-yonetimi-v23{--gap:16px;--secpad:88px}\nn1-reklam-yonetimi-v23 .ry-wrap{width:calc(100% - 40px)}\nn1-reklam-yonetimi-v23 .ry-hero{padding-bottom:72px}\nn1-reklam-yonetimi-v23 .ry-hero__title{margin-top:30px;font-size:clamp(60px,19.4vw,90px);line-height:.92}\nn1-reklam-yonetimi-v23 .ry-board{grid-column:1/-1;margin:28px -20px 0 0}\nn1-reklam-yonetimi-v23 .ry-beyond__t{font-size:clamp(40px,12.4vw,58px)}\nn1-reklam-yonetimi-v23 .ry-hero__sub{grid-column:1/-1;font-size:17px}\nn1-reklam-yonetimi-v23 .ry-scroll{grid-column:1/-1}\nn1-reklam-yonetimi-v23 .ry-h2{font-size:clamp(48px,14.4vw,68px)}\nn1-reklam-yonetimi-v23 .ry-head{display:block}\nn1-reklam-yonetimi-v23 .ry-lede{margin-top:22px;font-size:17px}\nn1-reklam-yonetimi-v23 .ry-sig__head{display:block}\nn1-reklam-yonetimi-v23 .ry-sig__fig{width:78%;margin:44px 0 0 auto}\nn1-reklam-yonetimi-v23 .ry-sigs{margin-top:64px}\nn1-reklam-yonetimi-v23 .ry-sigr{display:block;padding:30px 0}\nn1-reklam-yonetimi-v23 .ry-sigr__n{display:block;margin:0 0 14px}\nn1-reklam-yonetimi-v23 .ry-sigr__w{font-size:clamp(42px,12.8vw,62px)}\nn1-reklam-yonetimi-v23 .ry-sigr__c{margin-top:18px}\nn1-reklam-yonetimi-v23 .ry-sigr__t{font-size:19px}\nn1-reklam-yonetimi-v23 .ry-sig__end{display:block;margin-top:64px}\nn1-reklam-yonetimi-v23 .ry-sig__news{width:62%}\nn1-reklam-yonetimi-v23 .ry-sig__last{margin-top:30px;font-size:clamp(32px,9.4vw,44px)}\nn1-reklam-yonetimi-v23 .ry-sys__words{display:block;padding-top:0;border-top:0;font-size:clamp(34px,10.4vw,48px)}\nn1-reklam-yonetimi-v23 .ry-word{display:flex;width:100%;padding:16px 0 14px;border-top:1px solid var(--line)}\nn1-reklam-yonetimi-v23 .ry-word::after{bottom:-1px;height:2px}\nn1-reklam-yonetimi-v23 .ry-word__n{margin-top:.34em}\nn1-reklam-yonetimi-v23 .ry-stage{margin:6px 0 26px}\nn1-reklam-yonetimi-v23 .ry-stage__k{display:none}\nn1-reklam-yonetimi-v23 .ry-stage__copy{margin-top:18px}\nn1-reklam-yonetimi-v23 .ry-lens__frame{aspect-ratio:4/3}\nn1-reklam-yonetimi-v23 .ry-ab__frame{aspect-ratio:4/5}\nn1-reklam-yonetimi-v23 .ry-ab__tag{top:12px;padding:8px 10px;font-size:13px}\nn1-reklam-yonetimi-v23 .ry-ab__tag--a{left:12px}\nn1-reklam-yonetimi-v23 .ry-ab__tag--b{right:12px}\nn1-reklam-yonetimi-v23 .ry-ab__knob{width:48px;height:48px;margin:-24px 0 0 -24px}\nn1-reklam-yonetimi-v23 .ry-craft{grid-template-columns:1fr;row-gap:30px}\nn1-reklam-yonetimi-v23 .ry-ch__pair{grid-template-columns:1fr}\nn1-reklam-yonetimi-v23 .ry-ch__col--g{padding-right:0;border-right:0;border-bottom:1px solid var(--line)}\nn1-reklam-yonetimi-v23 .ry-ch__col--m{padding-left:0}\nn1-reklam-yonetimi-v23 .ry-ch__w{font-size:clamp(52px,15.6vw,76px)}\nn1-reklam-yonetimi-v23 .ry-ch__s{font-size:18px}\nn1-reklam-yonetimi-v23 .ry-ms{display:block}\nn1-reklam-yonetimi-v23 .ry-ms__list{grid-template-columns:1fr}\nn1-reklam-yonetimi-v23 .ry-dec__t{display:block;font-size:clamp(44px,12.8vw,62px)}\nn1-reklam-yonetimi-v23 .ry-dec__b{display:block;margin-top:.4em}\nn1-reklam-yonetimi-v23 .ry-dec__frame{aspect-ratio:4/3}\nn1-reklam-yonetimi-v23 .ry-dec__hd{display:none}\nn1-reklam-yonetimi-v23 .ry-dr{display:block;padding:26px 0}\nn1-reklam-yonetimi-v23 .ry-dr__a{font-size:clamp(28px,8.4vw,38px)}\nn1-reklam-yonetimi-v23 .ry-dr__l{width:48px;margin:16px 0 14px}\nn1-reklam-yonetimi-v23 .ry-dr__b{font-size:18px}\nn1-reklam-yonetimi-v23 .ry-dec__end{margin-left:0;font-size:18px}\nn1-reklam-yonetimi-v23 .ry-loop__t{display:block}\nn1-reklam-yonetimi-v23 .ry-band__track{font-size:24vw}\nn1-reklam-yonetimi-v23 .ry-steps{display:block;padding-left:24px}\nn1-reklam-yonetimi-v23 .ry-steps::before,n1-reklam-yonetimi-v23 .ry-steps::after{left:0;right:auto;top:0;bottom:0;width:1px;height:auto}\nn1-reklam-yonetimi-v23 .ry-steps::after{width:2px;transform:scaleY(var(--p));transform-origin:50% 0}\nn1-reklam-yonetimi-v23 .ry-step{padding:0 0 32px}\nn1-reklam-yonetimi-v23 .ry-step__v{margin-top:12px;font-size:36px}\nn1-reklam-yonetimi-v23 .ry-loop__end{align-items:flex-start}\nn1-reklam-yonetimi-v23 .ry-ko__l{font-size:clamp(34px,10.6vw,50px)}\nn1-reklam-yonetimi-v23 .ry-ko__l--big{font-size:clamp(96px,30vw,140px)}\nn1-reklam-yonetimi-v23 .ry-man__b{font-size:clamp(44px,12.8vw,62px)}\nn1-reklam-yonetimi-v23 .ry-man__foot{flex-direction:column;align-items:flex-start;gap:22px}\nn1-reklam-yonetimi-v23 .ry-fin__grid{display:block}\nn1-reklam-yonetimi-v23 .ry-fin__t{font-size:clamp(46px,13.2vw,64px);line-height:.98}\nn1-reklam-yonetimi-v23 .ry-fin__cta{flex-direction:column;gap:11px}\nn1-reklam-yonetimi-v23 .ry-fin__fig{width:62%;margin:56px 0 0 auto}\nn1-reklam-yonetimi-v23 .ry-fin__img{aspect-ratio:4/5}\nn1-reklam-yonetimi-v23 .ry-cur--fin{display:none}\nn1-reklam-yonetimi-v23 .ry-btn{width:100%;height:56px;padding:0 7px 0 18px;font-size:12px}\nn1-reklam-yonetimi-v23 .ry-btn__ico{width:42px;height:42px}\nn1-reklam-yonetimi-v23 n1-header .n1h-bar.site-container{width:calc(100% - 40px)!important;height:64px!important}\nn1-reklam-yonetimi-v23 n1-header .n1h-logo img{width:30px!important;height:30px!important}\nn1-reklam-yonetimi-v23 .n1ft-inner{width:calc(100% - 40px)}\nn1-reklam-yonetimi-v23 .n1ft-top{grid-template-columns:1fr!important;gap:32px;padding:39px 0 36px}\nn1-reklam-yonetimi-v23 .n1ft-col--brand{grid-column:auto}\nn1-reklam-yonetimi-v23 .n1ft-brand{font-size:45px}\n}\n@media (max-width:360px){n1-reklam-yonetimi-v23 .ry-wrap,n1-reklam-yonetimi-v23 .n1ft-inner{width:calc(100% - 32px)}n1-reklam-yonetimi-v23 .ry-board{margin-right:-16px}n1-reklam-yonetimi-v23 n1-header .n1h-bar.site-container{width:calc(100% - 32px)!important}}\n@media (prefers-reduced-motion:reduce){n1-reklam-yonetimi-v23 .ry *,n1-reklam-yonetimi-v23 .ry *::before,n1-reklam-yonetimi-v23 .ry *::after{transition-duration:.01ms!important;transition-delay:0s!important}n1-reklam-yonetimi-v23 .ry-caret{animation:none}}";

  CSS += '\n' +
    TAG + ' .ry-dec__media{position:absolute;inset:0;overflow:hidden}' +
    TAG + ' .ry-dec__video{position:absolute;inset:0;display:block;width:100%;height:100%;object-fit:cover;opacity:1;background:#080A09}' +
    TAG + ' .ry-dec__play{position:absolute;top:16px;right:16px;z-index:3;width:44px;height:44px}' +
    TAG + ' .ry-dec__error{position:absolute;left:16px;right:16px;bottom:12px;z-index:3;margin:0;font:400 12px/1.45 Barlow,Arial,sans-serif;color:var(--ink);text-shadow:0 1px 4px #080A09}' +
    TAG + ' .ry-dec__error:empty{display:none}' +
    TAG + ' .ry-dec__frame.is-failed .ry-dec__video{opacity:0}';

  /* ---------- Bileşen ---------- */
  class ReklamYonetimiV23 extends HTMLElement {
    connectedCallback() {
      if (this._on) return;
      this._on = true;
      this._cleanups = [];
      var base = this.getAttribute('deps-base');
      this._url = function (k) { return (base ? base.replace(/\/?$/, '/') + 'gh@' : CDN) + PATHS[k]; };
      this.classList.add('n1-inner-page');
      this._mount().catch((e) => {
        console.error('[' + TAG + ']', e);
        if (!this.querySelector('main.ry')) this.innerHTML = '<p style="padding:40px 5%;color:#ECEBE5;font:16px Barlow,Arial,sans-serif">Reklam Yönetimi yüklenemedi. Lütfen sayfayı yenileyin.</p>';
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
      this._videos();
      this._decisionVideo();
      this._sys();
      this._ab();

      var fonts = loadCss(FONTS).catch(function (e) { console.warn('[' + TAG + '] Font yüklenemedi, yedek font kullanılıyor', e); });
      await Promise.all([loadCss(url('footerCss')), loadCss(url('responsive')), loadJs(url('markup'), function () { return !!window.N1_SITE_MARKUP; })]);
      if (!this._on) return;

      var tpl = document.createElement('template');
      tpl.innerHTML = String(window.N1_SITE_MARKUP || '').split('{{ASSETS}}').join(url('assets'));
      var hdr = tpl.content.querySelector('n1-header'), ft = tpl.content.querySelector('[data-n1-footer]'), fc = tpl.content.querySelector('n1-floating-controls');
      if (!hdr || !ft) throw new Error('Onaylı Header/Footer işaretlemesi bulunamadı');
      var main = this.querySelector('main.ry');

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

      var otherFc = [].some.call(document.querySelectorAll('n1-floating-controls'), function (f) { return !self.contains(f); }) || !!document.querySelector('.n1fc:not([data-n1-ry])');
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
        if (this._header.panel) { this._header.panel.classList.add('n1-inner-panel'); this._header.panel.setAttribute('data-n1-ry', ''); }
      }
      if (this._footerOwned) await loadJs(url('footerJs'), null, true);
      if (this._fcOwned && !customElements.get('n1-floating-controls')) await loadJs(url('floating'), function () { return !!customElements.get('n1-floating-controls'); });
      var layer = document.querySelector('body > .n1fc:last-of-type'); if (this._fcOwned && layer) layer.setAttribute('data-n1-ry', '');
      if (!this._on) return;
      this._animate();
    }


    _anchors() {
      var a = this.querySelector('.ry-scroll'), self = this;
      this._ev(a, 'click', function (e) {
        e.preventDefault();
        var t = self.querySelector('#ry-sinyal'); if (!t) return;
        scrollTo({ top: t.getBoundingClientRect().top + scrollY - 40, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      });
    }

    /* ---------- Video: aynı film iki yerde, aynı anda tek oynatıcı ---------- */
    _videos() {
      var self = this, reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      var c = navigator.connection || {}, autoOK = !reduced && !c.saveData;
      var src = pickVideo(vset(V_ADS)), VIDS = [];
      var make = function (watch, scr, btn) {
        var v = scr.querySelector('video'), err = scr.parentNode.querySelector('.ry-screen__err');
        v.defaultMuted = true; v.muted = true; v.playsInline = true; v.setAttribute('webkit-playsinline', '');
        var P = { fig: watch, scr: scr, v: v, visible: false, userPaused: false, loaded: false, failed: false };
        P.load = function (mode) { if (P.loaded) return; P.loaded = true; v.preload = mode || 'auto'; v.src = src; };
        P.play = function () {
          if (P.failed) return;
          P.load();
          VIDS.forEach(function (o) { if (o !== P) { o.v.autoplay = false; if (!o.v.paused) o.v.pause(); } });
          v.playbackRate = .6;   // 1,8 sn'lik hızlı kesmeler sakinleşir
          v.autoplay = true;
          var pr = v.play(); if (pr && pr.catch) pr.catch(function () { P.sync(); });
        };
        P.sync = function () {
          var playing = !v.paused && !v.ended;
          btn.setAttribute('aria-pressed', String(!playing)); btn.setAttribute('aria-label', playing ? 'Videoyu duraklat' : 'Videoyu oynat');
        };
        ['play', 'pause', 'ended'].forEach(function (e) { self._ev(v, e, P.sync); });
        self._ev(v, 'loadedmetadata', function () { v.playbackRate = .6; });
        self._ev(v, 'playing', function () { scr.classList.add('is-started'); });
        self._ev(v, 'error', function () {
          if (!v.getAttribute('src')) return;
          P.failed = true; scr.classList.add('is-failed'); btn.disabled = true;
          if (err) err.textContent = 'Video şu anda yüklenemedi; filmin bir karesi gösteriliyor.';
        });
        self._ev(scr.querySelector('.ry-poster'), 'error', function (e) { e.target.remove(); });
        self._ev(btn, 'click', function () { if (v.paused) { P.userPaused = false; P.play(); } else { P.userPaused = true; v.pause(); } });
        self._ev(v, 'canplay', function () { if (P.visible && autoOK && !P.userPaused && v.paused && !document.hidden) P.play(); });
        P.sync();
        VIDS.push(P);
        return P;
      };
      var hb = this.querySelector('[data-ry="hero"]'), mk = this.querySelector('[data-ry="man"]');
      var hero = make(hb, hb.querySelector('.ry-screen'), hb.querySelector('.ry-play'));
      var man = make(mk, mk.querySelector('.ry-screen'), this.querySelector('.ry-play--man'));
      // Manifestodaki kopyada hata notu yok: harflerin içinde okunmaz, yalnızca kare kalır
      this._vids = VIDS;
      var io = new IntersectionObserver(function (en) {
        en.forEach(function (e) {
          var P = VIDS.filter(function (o) { return o.fig === e.target; })[0]; if (!P) return;
          P.visible = e.isIntersecting && e.intersectionRatio >= .08;
          if (P.visible && autoOK && !P.userPaused && !document.hidden) P.play();
          else if (!P.visible) { P.v.autoplay = false; if (!P.v.paused) P.v.pause(); }
        });
      }, { threshold: [0, .08, .25, .6] });
      VIDS.forEach(function (P) { io.observe(P.fig); });
      // Manifestodaki kopya bölüme yaklaşılmadan indirilmez
      var near = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { man.load(autoOK ? 'auto' : 'metadata'); near.disconnect(); } }, { rootMargin: '500px 0px' });
      near.observe(man.fig);
      var onVis = function () { VIDS.forEach(function (P) { if (document.hidden) P.v.pause(); else if (P.visible && autoOK && !P.userPaused) P.play(); }); };
      document.addEventListener('visibilitychange', onVis);
      hero.load(autoOK ? 'auto' : 'metadata');
      this._cleanups.push(function () {
        io.disconnect(); near.disconnect(); document.removeEventListener('visibilitychange', onVis);
        VIDS.forEach(function (P) { try { P.v.pause(); P.v.removeAttribute('src'); P.v.load(); } catch (e) {} });
      });
    }

    /* ---------- Karar sahnesi: fotoğrafsız ve postersiz 1080p video ---------- */
    _decisionVideo() {
      var fig = this.querySelector('[data-ry="decision-video"]');
      if (!fig) return;
      var media = fig.querySelector('.ry-dec__media'), v = fig.querySelector('video'),
          btn = fig.querySelector('.ry-dec__play'), err = fig.querySelector('.ry-dec__error'),
          conn = navigator.connection || {}, reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      var state = { visible: false, promoted: false, failed: false, userPaused: false, auto: !reduced && !conn.saveData };
      function sync() {
        var playing = !v.paused && !v.ended;
        btn.setAttribute('aria-pressed', String(!playing));
        btn.setAttribute('aria-label', playing ? 'Videoyu duraklat' : 'Videoyu oynat');
        fig.classList.toggle('is-playing', playing);
      }
      function load() {
        if (state.promoted) return;
        state.promoted = true; v.preload = 'auto';
        if (v.readyState < 2) v.load();
      }
      function pause() { if (!v.paused) v.pause(); sync(); }
      function play() {
        if (!state.visible || document.hidden || state.failed) return;
        load();
        var attempt = v.play();
        if (attempt && attempt.catch) attempt.catch(sync);
      }
      this._ev(btn, 'click', function () {
        if (!v.paused) { state.userPaused = true; pause(); }
        else { state.userPaused = false; play(); }
      });
      this._ev(v, 'playing', function () { fig.classList.add('is-started'); sync(); });
      this._ev(v, 'pause', sync);
      this._ev(v, 'ended', sync);
      this._ev(v, 'error', function () {
        if (!v.getAttribute('src')) return;
        state.failed = true; fig.classList.add('is-failed'); fig.classList.remove('is-started');
        btn.disabled = true; pause(); err.textContent = 'Video şu anda yüklenemiyor.';
      });
      var io = new IntersectionObserver(function (entries) {
        state.visible = entries[0].intersectionRatio >= .25;
        if (!state.visible) pause();
        else if (state.auto && !state.userPaused) play();
      }, { threshold: [0, .25, .6] });
      io.observe(fig);
      // Bölüm ekrana yaklaşırken videonun ilk karesini hazırlamaya başla.
      var near = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) { load(); near.disconnect(); }
      }, { rootMargin: '900px 0px' });
      near.observe(fig);
      var onVisibility = function () {
        if (document.hidden) pause();
        else if (state.visible && state.auto && !state.userPaused) play();
      };
      document.addEventListener('visibilitychange', onVisibility);
      this._cleanups.push(function () {
        near.disconnect(); io.disconnect(); document.removeEventListener('visibilitychange', onVisibility);
        pause(); v.removeAttribute('src'); try { v.load(); } catch (e) {}
      });
      sync();
    }

    /* ---------- Sistem: altı alan, tek kitle fotoğrafı (dokunma, klavye, fare; GSAP'siz de çalışır) ---------- */
    _sys() {
      var self = this, tabs = [].slice.call(this.querySelectorAll('.ry-word')), stage = this.querySelector('.ry-stage');
      var words = this.querySelector('.ry-sys__words');
      var lens = stage.querySelector('.ry-lens__img'), cap = stage.querySelector('.ry-lens__cap');
      var n = stage.querySelector('.ry-stage__n b'), k = stage.querySelector('.ry-stage__k'), d = stage.querySelector('.ry-stage__d');
      var mq = matchMedia('(max-width:767px)'), cur = 0;
      // Masaüstü ve tablette sekme düzeni; telefonda akordeon: panel seçilen sözcüğün hemen altına yerleşir
      var place = function () {
        var mob = mq.matches, after = mob ? tabs[cur] : words;
        if (after.nextSibling !== stage) after.parentNode.insertBefore(stage, after.nextSibling);
        if (mob) {
          words.removeAttribute('role'); stage.setAttribute('role', 'region');
          tabs.forEach(function (t, j) { t.removeAttribute('role'); t.removeAttribute('aria-selected'); t.setAttribute('aria-expanded', String(j === cur)); t.tabIndex = 0; });
        } else {
          words.setAttribute('role', 'tablist'); stage.setAttribute('role', 'tabpanel');
          tabs.forEach(function (t, j) { t.setAttribute('role', 'tab'); t.removeAttribute('aria-expanded'); t.setAttribute('aria-selected', String(j === cur)); t.tabIndex = j === cur ? 0 : -1; });
        }
        tabs.forEach(function (t, j) { t.classList.toggle('is-on', j === cur); });
      };
      var crop = function (a) { lens.style.transformOrigin = a.o; lens.style.transform = 'scale(' + a.s + ')'; };
      var sel = function (i, focus) {
        if (i === cur) { if (focus) tabs[i].focus(); return; }
        cur = i;
        stage.setAttribute('aria-labelledby', tabs[i].id);
        var a = AREAS[i], swap = function () { n.textContent = '0' + (i + 1); k.textContent = a.k; d.textContent = a.d; cap.textContent = a.c; };
        place();
        crop(a);
        var g = window.gsap, still = matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (g && !still) {
          g.killTweensOf([k, d, cap]);
          g.timeline()
            .to([k, d, cap], { autoAlpha: 0, y: -8, duration: .22, ease: 'power2.in', stagger: .03, onComplete: swap })
            .fromTo([k, d, cap], { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: .55, ease: 'expo.out', stagger: .05 });
        } else swap();
        if (focus) tabs[i].focus();
      };
      tabs.forEach(function (t, i) {
        self._ev(t, 'click', function () { sel(i); });
        self._ev(t, 'keydown', function (e) {
          if (mq.matches) return;   // akordeonda doğal Tab sırası kullanılır
          var m = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
          if (m) { e.preventDefault(); sel((i + m + tabs.length) % tabs.length, true); }
          else if (e.key === 'Home') { e.preventDefault(); sel(0, true); }
          else if (e.key === 'End') { e.preventDefault(); sel(tabs.length - 1, true); }
        });
      });
      crop(AREAS[0]); place();
      var onMq = function () { place(); };
      if (mq.addEventListener) mq.addEventListener('change', onMq); else mq.addListener(onMq);
      this._cleanups.push(function () { if (mq.removeEventListener) mq.removeEventListener('change', onMq); else mq.removeListener(onMq); });
      this._sysSel = sel;
    }

    /* ---------- Kreatif ve veri: iki varyasyon arasında ayırıcı (aralık girdisi: dokunma, klavye, fare) ---------- */
    _ab() {
      var fig = this.querySelector('.ry-ab'), r = fig.querySelector('.ry-ab__range'), self = this;
      var set = function (x) {
        x = Math.max(4, Math.min(96, +x));
        fig.style.setProperty('--x', x + '%');
        r.setAttribute('aria-valuetext', 'A yüzde ' + Math.round(x) + ', B yüzde ' + Math.round(100 - x));
      };
      this._ev(r, 'input', function () { self._abTouched = true; if (self._abTw) { self._abTw.kill(); self._abTw = null; } set(r.value); });
      this._abSet = function (x) { r.value = Math.round(x); set(x); };
    }

    /* ---------- Hareket ---------- */
    _animate() {
      var gsap = window.gsap, STg = window.ScrollTrigger, self = this;
      if (!gsap) return;
      if (STg) gsap.registerPlugin(STg);
      var q = function (s, r) { return [].slice.call((r || self).querySelectorAll(s)); };
      var one = function (s) { return self.querySelector(s); };
      var once = function (el, start) { return { trigger: el, start: start || 'top 86%', once: true }; };
      // İmleç: kutuya göre hedef öğenin sağ ucuna gider ve "tıklar"
      var aim = function (box, target) {
        var b = box.getBoundingClientRect(), r = target.getBoundingClientRect();
        return { x: r.right - b.left - r.width * .14, y: r.top - b.top + r.height * .5 };
      };

      this._ctx = gsap.context(function () {
        var mm = gsap.matchMedia();

        /* 01 Hero: panolar bir ekran gibi yanar; imleç "TIKLAMANIN" sözcüğüne tıklar, "ÖTESİNDE." onun ötesine kayar */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          var frame = one('.ry-board__frame'), media = q('.ry-board .ry-poster, .ry-board .ry-video');
          var box = one('.ry-beyond__t'), cur = one('.ry-beyond .ry-cur'), spark = cur.querySelector('.ry-spark');
          var p = aim(box, one('.ry-beyond__a'));
          var tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
          tl.from(q('.ry-kicker span'), { autoAlpha: 0, y: 10, duration: .8, stagger: .08 }, .05)
            .from(q('.ry-tl--a .ry-ch'), { yPercent: 108, duration: 1.1, ease: 'power4.out', stagger: .045 }, .15)
            .from(q('.ry-tl--b .ry-ch'), { yPercent: 108, duration: 1.1, ease: 'power4.out', stagger: .04 }, .32)
            .fromTo(frame, { clipPath: 'inset(49.6% 0% 49.6% 0% round 4px)' }, { clipPath: 'inset(0% 0% 0% 0% round 4px)', duration: 1.25, ease: 'expo.inOut' }, .35)
            .fromTo(media, { scale: 1.14, filter: 'brightness(2.4) saturate(.2)' }, { scale: 1, filter: 'brightness(1) saturate(1)', duration: 1.6, ease: 'power3.out' }, .6)
            .from(one('.ry-beyond__a'), { autoAlpha: 0, y: 26, duration: 1 }, .95)
            .from(q('.ry-hero__sub, .ry-scroll, .ry-board .ry-cap'), { autoAlpha: 0, y: 16, duration: .9, stagger: .08 }, 1.25)
            .fromTo(cur, { x: p.x + 150, y: p.y + 120, autoAlpha: 0 }, { x: p.x, y: p.y, autoAlpha: 1, duration: 1.1, ease: 'power3.inOut' }, 1.3)
            .to(cur.querySelector('.ry-cur__svg'), { scale: .8, transformOrigin: '20% 15%', duration: .12, yoyo: true, repeat: 1, ease: 'power2.inOut' }, 2.42)
            .fromTo(spark, { autoAlpha: 1, scale: .5 }, { autoAlpha: 0, scale: 1.25, duration: .7, ease: 'power2.out' }, 2.5)
            .from(one('.ry-beyond__b>span'), { xPercent: -112, duration: 1.15, ease: 'expo.out' }, 2.52)
            .to(cur, { x: '+=90', y: '+=24', autoAlpha: 0, duration: .9, ease: 'power2.in' }, 3.05);
          return function () { gsap.set([cur, spark], { clearProps: 'all' }); gsap.set(media, { clearProps: 'filter,transform' }); };
        });
        mm.add('(prefers-reduced-motion: no-preference) and (min-width: 1025px)', function () {
          var scr = one('.ry-board .ry-screen');
          gsap.fromTo(scr, { yPercent: -4, scale: 1.1 }, { yPercent: 6, scale: 1.1, ease: 'none', scrollTrigger: { trigger: one('.ry-hero'), start: 'top top', end: 'bottom top', scrub: .6 } });
          gsap.to(one('.ry-hero__title'), { yPercent: 12, ease: 'none', scrollTrigger: { trigger: one('.ry-hero'), start: 'top top', end: 'bottom top', scrub: .6 } });
        });

        /* Başlıklar: satırlar maskenin altından gelir (bir kez) */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          q('.ry-sec .ry-h2, .ry-dec__t, .ry-man__b, .ry-fin__t').forEach(function (h) {
            gsap.from(q('.ry-ln>span', h), { yPercent: 112, duration: 1.15, ease: 'power4.out', stagger: .09, scrollTrigger: once(h) });
          });
          q('.ry-sec .ry-label, .ry-fin .ry-label').forEach(function (l) { gsap.from(l, { autoAlpha: 0, x: -12, duration: .8, ease: 'expo.out', scrollTrigger: once(l, 'top 92%') }); });
          q('.ry-lede').forEach(function (l) { gsap.from(l, { autoAlpha: 0, y: 18, duration: .9, ease: 'expo.out', scrollTrigger: once(l, 'top 92%') }); });
        });

        /* 02 Sinyaller: her sözcük kaydırdıkça yeşil bir çizgiyle düzeltilir ve geri çekilir; anlamı yanında belirir */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          q('.ry-sigr').forEach(function (row) {
            var path = row.querySelector('.ry-strike path'), word = row.querySelector('.ry-sigr__word');
            gsap.timeline({ scrollTrigger: { trigger: row, start: 'top 80%', end: 'top 42%', scrub: .6 } })
              .fromTo(path, { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: 'none' }, 0)
              .fromTo(word, { color: '#ECEBE5' }, { color: '#9A9B95', ease: 'none' }, .2);
            gsap.from(row.querySelectorAll('.ry-sigr__t, .ry-sigr__n2'), { autoAlpha: 0, y: 18, duration: .9, ease: 'expo.out', stagger: .08, scrollTrigger: once(row, 'top 72%') });
          });
          var hf = one('.ry-sig__img');
          gsap.fromTo(hf, { clipPath: 'inset(100% 0% 0% 0% round 4px)' }, { clipPath: 'inset(0% 0% 0% 0% round 4px)', duration: 1.5, ease: 'expo.inOut', scrollTrigger: once(hf) });
          var nf = one('.ry-sig__nimg');
          gsap.fromTo(nf, { clipPath: 'inset(0% 100% 0% 0% round 4px)' }, { clipPath: 'inset(0% 0% 0% 0% round 4px)', duration: 1.4, ease: 'expo.inOut', scrollTrigger: once(nf) });
          gsap.from(one('.ry-sig__last'), { autoAlpha: 0, y: 30, duration: 1.1, ease: 'expo.out', scrollTrigger: once(one('.ry-sig__last')) });
          return function () { gsap.set(q('.ry-strike path'), { clearProps: 'strokeDashoffset' }); gsap.set(q('.ry-sigr__word'), { clearProps: 'color' }); gsap.set([hf, nf], { clearProps: 'clipPath' }); };
        });
        mm.add('(prefers-reduced-motion: no-preference) and (min-width: 1025px)', function () {
          gsap.fromTo(one('.ry-sig__img'), { yPercent: 6 }, { yPercent: -6, ease: 'none', scrollTrigger: { trigger: one('.ry-sig__head'), start: 'top bottom', end: 'bottom top', scrub: .6 } });
        });

        /* 03 Sistem: sözcükler dizilir, mercek soldan açılır */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          gsap.from(q('.ry-word'), { autoAlpha: 0, yPercent: 40, duration: .9, ease: 'expo.out', stagger: .06, scrollTrigger: once(one('.ry-sys__ui')) });
          var lf = one('.ry-lens__frame');
          gsap.fromTo(lf, { clipPath: 'inset(0% 100% 0% 0% round 4px)' }, { clipPath: 'inset(0% 0% 0% 0% round 4px)', duration: 1.5, ease: 'expo.inOut', scrollTrigger: once(lf) });
          return function () { gsap.set(lf, { clearProps: 'clipPath' }); };
        });

        /* 04 Kreatif ve veri: ayırıcı bir kez A'dan B'ye süzülür (dokunulduysa durur); fiiller maskeden çıkar */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          var fr = one('.ry-ab__frame');
          gsap.fromTo(fr, { clipPath: 'inset(0% 0% 100% 0% round 4px)' }, { clipPath: 'inset(0% 0% 0% 0% round 4px)', duration: 1.4, ease: 'expo.inOut', scrollTrigger: once(fr, 'top 82%') });
          var o = { x: 90 };
          STg && STg.create({
            trigger: fr, start: 'top 62%', once: true,
            onEnter: function () {
              if (self._abTouched) return;
              self._abSet(90);
              self._abTw = gsap.to(o, { x: 50, duration: 1.9, ease: 'expo.inOut', onUpdate: function () { if (!self._abTouched) self._abSet(o.x); } });
            }
          });
          q('.ry-craft__i').forEach(function (it, i) {
            gsap.from(it.querySelector('.ry-ln>span'), { yPercent: 112, duration: 1, ease: 'power4.out', delay: i * .08, scrollTrigger: once(one('.ry-craft')) });
            gsap.from(it.querySelector('.ry-craft__t'), { autoAlpha: 0, y: 14, duration: .9, ease: 'expo.out', delay: .2 + i * .08, scrollTrigger: once(one('.ry-craft')) });
          });
          return function () { gsap.set(fr, { clearProps: 'clipPath' }); if (!self._abTouched && self._abSet) self._abSet(50); };
        });

        /* 05 Mecralar: ARAYAN arama kutusuna yazılır gibi; KEŞFEDEN harfleri akıştan dağınık gelip hizalanır */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          var ty = one('.ry-type'), full = ty.getAttribute('data-text'), o = { n: 0 };
          ty.textContent = '';
          gsap.to(o, { n: full.length, duration: .95, ease: 'steps(' + full.length + ')', delay: .2, scrollTrigger: once(one('.ry-ch__pair'), 'top 78%'), onUpdate: function () { ty.textContent = full.slice(0, Math.round(o.n)); } });
          var offs = [70, -50, 95, -80, 40, -95, 75, -35];
          gsap.from(q('.ry-ch__col--m .ry-ch'), { yPercent: function (i) { return offs[i % offs.length]; }, autoAlpha: 0, duration: 1.2, ease: 'expo.out', stagger: .045, delay: .35, scrollTrigger: once(one('.ry-ch__pair'), 'top 78%') });
          q('.ry-ch__list, .ry-ms__list').forEach(function (l) { gsap.from(l.children, { autoAlpha: 0, x: -14, duration: .8, ease: 'expo.out', stagger: .05, scrollTrigger: once(l) }); });
          gsap.from(q('.ry-ms__t, .ry-ms__s'), { autoAlpha: 0, y: 18, duration: .9, ease: 'expo.out', stagger: .08, scrollTrigger: once(one('.ry-ms')) });
          return function () { ty.textContent = full; };
        });

        /* 06 Karar: veri ekranı kaydırdıkça netleşir (telefonda yok); her satırda okunan veri bir çizgiyle karara bağlanır */
        mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px)', function () {
          var im = one('.ry-dec__media');
          gsap.fromTo(im, { filter: 'blur(18px) saturate(.25)', scale: 1.08 }, { filter: 'blur(0px) saturate(1)', scale: 1, ease: 'none', scrollTrigger: { trigger: one('.ry-dec__frame'), start: 'top 90%', end: 'center 52%', scrub: .6 } });
          return function () { gsap.set(im, { clearProps: 'filter,transform' }); };
        });
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          var fr = one('.ry-dec__frame');
          gsap.fromTo(fr, { clipPath: 'inset(0% 6% 0% 6% round 4px)' }, { clipPath: 'inset(0% 0% 0% 0% round 4px)', ease: 'none', scrollTrigger: { trigger: fr, start: 'top 95%', end: 'top 45%', scrub: .6 } });
          q('.ry-dr').forEach(function (r) {
            gsap.timeline({ scrollTrigger: once(r, 'top 84%') })
              .from(r.querySelector('.ry-dr__a'), { autoAlpha: 0, x: -18, duration: .8, ease: 'expo.out' })
              .fromTo(r.querySelector('.ry-dr__l'), { scaleX: 0 }, { scaleX: 1, duration: .7, ease: 'power3.inOut' }, .2)
              .from(r.querySelector('.ry-dr__b'), { autoAlpha: 0, x: 18, duration: .8, ease: 'expo.out' }, .55);
          });
          gsap.from(one('.ry-dec__end'), { autoAlpha: 0, y: 18, duration: .9, ease: 'expo.out', scrollTrigger: once(one('.ry-dec__end')) });
          return function () { gsap.set(fr, { clearProps: 'clipPath' }); };
        });

        /* 07 Döngü: fiiller kaydırmayla akan bir bant; adımlar ilerledikçe yanar */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          var tr = one('.ry-band__track');
          gsap.fromTo(tr, { xPercent: 0 }, { xPercent: -33.333, ease: 'none', scrollTrigger: { trigger: one('.ry-band'), start: 'top bottom', end: 'bottom top', scrub: .5 } });
          var steps = one('.ry-steps'), items = q('.ry-step');
          var upd = function (pr) {
            steps.style.setProperty('--p', pr.toFixed(4));
            var k = Math.min(items.length - 1, Math.floor(pr * items.length * .999 + .25));
            items.forEach(function (it, j) { it.classList.toggle('is-on', j <= k); });
          };
          STg && STg.create({ trigger: steps, start: 'top 78%', end: 'bottom 48%', scrub: true, onUpdate: function (s) { upd(s.progress); }, onRefresh: function (s) { upd(s.progress); } });
          gsap.from(q('.ry-loop__end'), { autoAlpha: 0, y: 16, duration: .9, ease: 'expo.out', scrollTrigger: once(one('.ry-loop__end')) });
          return function () { steps.style.removeProperty('--p'); items.forEach(function (it) { it.classList.add('is-on'); }); };
        });

        /* 08 Manifesto: harflerin içindeki panolar kaydırdıkça kayar, yazı oturur; ardından "KARARLAR" yeşile döner */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          var ko = one('.ry-ko'), scr = one('.ry-screen--ko');
          gsap.from(q('.ry-ko__l'), { autoAlpha: 0, yPercent: 26, duration: 1.15, ease: 'expo.out', stagger: .1, scrollTrigger: once(ko, 'top 80%') });
          gsap.fromTo(scr, { yPercent: -8, scale: 1.18 }, { yPercent: 8, scale: 1.18, ease: 'none', scrollTrigger: { trigger: ko, start: 'top bottom', end: 'bottom top', scrub: .6 } });
          gsap.fromTo(one('.ry-man__k>span'), { color: '#ECEBE5' }, { color: '#A8CF62', duration: .9, ease: 'power2.out', delay: .7, scrollTrigger: once(one('.ry-man__b')) });
          gsap.from(one('.ry-man__foot'), { autoAlpha: 0, y: 18, duration: .9, ease: 'expo.out', scrollTrigger: once(one('.ry-man__foot')) });
          return function () { gsap.set(scr, { clearProps: 'transform' }); gsap.set(one('.ry-man__k>span'), { clearProps: 'color' }); };
        });
        mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px)', function () {
          gsap.fromTo(one('.ry-ko__mask'), { scale: 1.06, transformOrigin: '0% 60%' }, { scale: 1, ease: 'none', scrollTrigger: { trigger: one('.ry-ko'), start: 'top bottom', end: 'center 55%', scrub: .6 } });
        });

        /* 09 Final: kare yukarıdan açılır; imleç birincil butona gelip bir kez tıklar */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          var fig = one('.ry-fin__img');
          gsap.fromTo(fig, { clipPath: 'inset(0% 0% 100% 0% round 4px)' }, { clipPath: 'inset(0% 0% 0% 0% round 4px)', duration: 1.6, ease: 'expo.inOut', scrollTrigger: once(one('.ry-fin'), 'top 70%') });
          gsap.from(q('.ry-fin__sub, .ry-fin__cta .ry-btn'), { autoAlpha: 0, y: 20, duration: .9, ease: 'expo.out', stagger: .1, scrollTrigger: once(one('.ry-fin__sub'), 'top 94%') });
          return function () { gsap.set(fig, { clearProps: 'clipPath' }); };
        });
        mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px)', function () {
          var box = one('.ry-fin__cta'), cur = one('.ry-cur--fin'), spark = cur.querySelector('.ry-spark');
          var p = aim(box, one('.ry-fin__cta .ry-btn--primary .ry-btn__ico'));
          gsap.timeline({ scrollTrigger: once(box, 'top 78%'), delay: .9 })
            .fromTo(cur, { x: p.x + 140, y: p.y + 110, autoAlpha: 0 }, { x: p.x, y: p.y, autoAlpha: 1, duration: 1, ease: 'power3.inOut' })
            .to(cur.querySelector('.ry-cur__svg'), { scale: .8, transformOrigin: '20% 15%', duration: .12, yoyo: true, repeat: 1, ease: 'power2.inOut' }, '+=.08')
            .fromTo(spark, { autoAlpha: 1, scale: .5 }, { autoAlpha: 0, scale: 1.25, duration: .7, ease: 'power2.out' }, '<.06')
            .to(cur, { x: '+=70', y: '+=26', autoAlpha: 0, duration: .8, ease: 'power2.in' }, '+=.35');
          return function () { gsap.set([cur, spark], { clearProps: 'all' }); };
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
      this._fcOwned = false; this._footerOwned = false; this._header = null; this._vids = null; this._sysSel = null; this._abSet = null; if (this._abTw) { this._abTw.kill(); this._abTw = null; }
      this.replaceChildren();
      var st = document.getElementById(STYLE_ID); if (st && !document.querySelector(TAG)) st.remove();
    }
  }
  customElements.define(TAG, ReklamYonetimiV23);
})();
