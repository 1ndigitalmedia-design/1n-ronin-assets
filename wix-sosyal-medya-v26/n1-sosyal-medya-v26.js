/*!
 * n1-sosyal-medya-v26 — 1N Digital Media · Sosyal Medya (/sosyal-medya) · Beyond the Feed / Akışın Ötesinde
 * Wix Studio Custom Element · Tag name: n1-sosyal-medya-v26 · Kaynak: bu dosyanın HTTPS adresi
 * Bağımsız V2 sürümü; Sosyal Medya V1 dosyasına dokunulmadı.
 *
 * Fikir: akış (feed) dikey, sonsuz ve aceleci bir sütundur. Sayfa bu sütunla başlar ve her bölümde onun dışına çıkar:
 *  01 Hero          dikey film bir akış sütunu gibi açılır; başlık sütunun üstünden geçerken onun içinde tersine döner.
 *  02 Hikâye        üç kare, kaydırdıkça çizilen tek bir iple birbirine bağlanır: paylaşım değil, devam eden hikâye.
 *  03 Strateji      beş aşama; seçilen aşama metni ve görüntüyü değiştirir (dokunma, klavye, fare).
 *  04 Hareket       bir fikir, kaydırdıkça farklı anlatım biçimlerine dönüşen tek bir cümlede ilerler.
 *  05 Ritim         aynı sözcük yedi farklı anlatımla yazılır: tutarlılık aynılık değildir.
 *  06 Rakamlar      sakin, sayısız bir değerlendirme listesi.
 *  07 Yaklaşım      "akışı" sözcüğüne bir harf eklenir ve "bakışı" olur; ardından bir kare sinematik bir şeride açılır.
 *  08 Final
 *
 * Mimari: Light DOM, sınıf öneki sm-. Onaylı v6.48 Header + menü, Footer, WhatsApp / Yukarı Çık modülleri commit'e sabit
 * adreslerden aynen yüklenir; sayfada başka bir Header / Footer / kontrol katmanı varsa ikincisi oluşturulmaz.
 * GSAP 3.13.0 + ScrollTrigger yalnızca sayfada yoksa yüklenir. Pin ve spacer yok; animasyonlar gsap.context + matchMedia içinde.
 * İçerik CSS'te gizlenmez: GSAP yüklenemezse ya da hareket azaltma açıksa sayfa son hâliyle görünür.
 *
 * Videolar:
 *  - Hero: 6dbf5e_67c5c858b42a4ce3b0e76195a59c8b3e (yeni kullanıcı videosu, 720p; kadraj kaynakta henüz doğrulanmadı).
 *  - Hareket: 6dbf5e_4892baa5590541faae6c24693b7fb00c (arkadaki büyük ekranın 1080p videosu; öndeki küçük Glitch fotoğrafı korunur).
 *  - Final CTA: 6dbf5e_f14a9f803bc442838bfe159f0aa49e72 (kullanıcının 1080p videosu; eski görsel sadece yedek poster).
 *  - Aynı anda tek video oynar; görünmeyen durur; ikincisi bölüme yaklaşılmadan indirilmez. Hero ve hareket videoları tüm cihazlarda yalnızca sağlanan 720p kaynaklarını kullanır.
 *  - Video yüklenemezse Wix'in videodan ürettiği gerçek kare (poster) kalır.
 *
 * İsteğe bağlı öznitelik (yalnızca Wix dışı önizleme için): deps-base="<klasör>/"
 */
(function () {
  'use strict';
  var TAG = 'n1-sosyal-medya-v26';
  var STYLE_ID = 'n1-sm26-style';
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
  function vexact(id, quality) { var src = VBASE + id + '/' + quality + '/mp4/file.mp4'; return { hd: src, sd: src }; }
  var V_HERO = '67c5c858b42a4ce3b0e76195a59c8b3e';     // Kullanıcı tarafından sağlanan yeni 720p Hero videosu
  var V_HERO_FINAL_STILL = 'e6722cf66dab428ea81f8b6b3418a49b'; // Final alanındaki önceki fotoğrafı koru
  var V_STRATEGY = VBASE + '044b3674636a4813b20f3f7dd8a402fe/480p/mp4/file.mp4';
  var V_MOTION = '4892baa5590541faae6c24693b7fb00c';   // Kullanıcının istediği arkadaki BÜYÜK Hareket videosu, 1080p
  var V_FINAL = 'f14a9f803bc442838bfe159f0aa49e72'; // 1080p kapanış videosu
  // Wix'in videodan ürettiği gerçek kare; r = genişlik / yükseklik
  function poster(id, w, r) { return 'https://static.wixstatic.com/media/6dbf5e_' + id + 'f000.jpg/v1/fill/w_' + w + ',h_' + Math.round(w / r) + ',q_80/sosyal-medya.jpg'; }
  function pickVideo(set) {
    var c = navigator.connection || {};
    if (c.saveData || /(^|-)2g$/.test(c.effectiveType || '') || matchMedia('(max-width:767px)').matches) return set.sd;
    return set.hd;
  }
  var IMG_BASE = 'https://static.wixstatic.com/media/6dbf5e_';
  // fit: genişlik w, yükseklik serbest (h = 3w); srcset genişlikleri gerçek genişlikle örtüşür
  function img(id, w) { return IMG_BASE + id + '~mv2.jpg/v1/fit/w_' + w + ',h_' + (w * 3) + ',q_82,enc_auto/sosyal-medya.jpg'; }
  function srcset(id, ws) { return (ws || [480, 800, 1200, 1800]).map(function (w) { return img(id, w) + ' ' + w + 'w'; }).join(', '); }
  function pic(id, cls, alt, sizes, pos, opt) {
    opt = opt || {};
    return '<img class="' + cls + '" src="' + img(id, opt.w || 800) + '" srcset="' + srcset(id, opt.ws) + '" sizes="' + sizes + '" alt="' + alt + '"' +
      (opt.eager ? '' : ' loading="lazy"') + ' decoding="async"' + (pos ? ' style="object-position:' + pos + '"' : '') + '>';
  }
  // Görseller (orijinal boyutlar gerçek tarayıcıda okundu)
  var IM = {
    hay: '0ffe788738344eafab50d732134bc447',       // 6240×4160 · beyaz kıyafetle saman yığınına uzanmış kadın, bulutlu gök
    duo: '419bcc6a7c0044ac9328b7945436c0d2',       // 2535×3802 · sarı-mavi fon önünde birbirine bakan iki kadın
    tulle: 'c9d42b72e1ca4e8c9730b3db8bfcca93',     // 3268×4902 · turuncu fonda turkuaz tüllü etekle oturan kadın, yanında trafik lambası
    light: '247d5010ffcd42c582eeed4f32d3f13e',     // 5472×3648 · mavi-mor ışıkta duran iki siluet, arkada pembe ışık halkası
    posters: '01215c24e29744a2857318feb3150fdd',   // 2543×4000 · afiş kaplı duvarın önünde siyah kıyafetli kadın
    plan: '2ab1dd8d04374e48b055233bb44fb463',      // 4000×6000 · masada tablet; ekranda görsel ızgara, yanında kalemler
    food: '881c414e98294f6e909c0e084811f283',      // 2832×4240 · telefonla yemek tabağını fotoğraflayan el
    notebook: 'b0e0a51e3cfb41c6996e4fb90ccaea21',  // 3712×5568 · fotoğraf makinesi ve "Social Media Marketing" yazan defter
    glitch: 'acd1a7ef22834d729d1399a3c4453a9b',    // 2906×4372 · renk kaymalı, bozulmuş (glitch) portre
    fabric: '3ae1864f9b4444c7a40d9f1809709c0c'     // 6720×4480 · gökyüzü önünde sarı kıyafetli kadın ve uçuşan turuncu kumaş
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
    arrow: '<svg class="sm-ico"' + SV + '><path d="M4.5 11.5l7-7M5.5 4.5h6v6"/></svg>',
    down: '<svg class="sm-ico"' + SV + '><path d="M8 3v10M3.5 8.5L8 13l4.5-4.5"/></svg>',
    play: '<svg class="sm-ico sm-ico--play"' + SV + '><path d="M5 3.5v9l7-4.5z"/></svg>',
    pause: '<svg class="sm-ico sm-ico--pause"' + SV + '><path d="M5.5 3.5v9M10.5 3.5v9"/></svg>',
    prev: '<svg class="sm-ico"' + SV + '><path d="M13 8H3M7.5 3.5L3 8l4.5 4.5"/></svg>',
    next: '<svg class="sm-ico"' + SV + '><path d="M3 8h10M8.5 3.5L13 8l-4.5 4.5"/></svg>'
  };
  function ln(t, cls) { return '<span class="sm-ln' + (cls ? ' ' + cls : '') + '"><span>' + t + '</span></span>'; }
  function chars(t, cls) { return '<span class="sm-chs' + (cls ? ' ' + cls : '') + '">' + Array.from(t).map(function (c) { return c === ' ' ? '<span class="sm-sp"> </span>' : '<span class="sm-ch">' + c + '</span>'; }).join('') + '</span>'; }

  /* ---------- İçerik ---------- */
  var CHAPTERS = [
    { k: 'Strateji', d: 'Ne söyleyeceğimizden önce neden söylediğimizi belirleriz.' },
    { k: 'Marka karakteri', d: 'Markanın sesi, tavrı ve görsel dünyası.' },
    { k: 'Hedef kitle', d: 'Kimin için yazdığımızı, neyi merak ettiğini biliriz.' },
    { k: 'İçerik düzeni', d: 'Seriler, formatlar ve sürdürülebilir bir yayın sıklığı.' },
    { k: 'Topluluk iletişimi', d: 'Yorumlar ve mesajlar sohbetin bir parçasıdır.' },
    { k: 'Değerlendirme', d: 'Her ay neyin karşılık bulduğunu okur, planı güncelleriz.' }
  ];
  /* Strateji bölümü: ilk sekme 480p film, sonraki dört sekme yeni fotoğraflar */
  var STAGES = [
    { t: 'Markayı anlamak', d: 'Markanın karakterini, hedeflerini ve iletişim dilini belirlemek.', q: 'Ne söylediği kadar nasıl söylediğini de tanımlarız: ton, sözcük seçimi, görsel tavır.', video: true },
    { t: 'Topluluğu tanımak', d: 'Hedef kitlenin sorularını, beklentilerini ve davranışlarını anlamak.', q: 'Kim takip ediyor, neyi soruyor, hangi saatte ve hangi biçimde karşılık veriyor?', id: '6262e9a67b0946368174e46ee526afe8', pos: '50% 45%', alt: 'Topluluğu tanıma stratejisi görseli' },
    { t: 'Yayın dilini kurmak', d: 'Tutarlı bir editoryal yapı ve sürdürülebilir içerik ritmi geliştirmek.', q: 'İçerik başlıkları, seriler ve yayın sıklığı; ekibin aylarca sürdürebileceği bir düzen.', id: '95f2de32bdfd4e16aab6d632d36e0c52', pos: '50% 45%', alt: 'Yayın dilini kurma stratejisi görseli' },
    { t: 'İletişimi sürdürmek', d: 'Sosyal medyayı tek yönlü yayından çıkarıp gerçek bir etkileşime dönüştürmek.', q: 'Yorumlara, mesajlara ve etiketlere markanın sesiyle ve zamanında yanıt veririz.', id: 'b01c811daf7844ecacdb404ed347cfd5', pos: '50% 45%', alt: 'Topluluk iletişimi stratejisi görseli' },
    { t: 'Sonuçlardan öğrenmek', d: 'İçeriğin etkisini yorumlayarak iletişimi geliştirmek.', q: 'Hangi içeriğin konuşma başlattığını okur, bir sonraki ayın planını buna göre kurarız.', id: '71c7d0b1c9c747bcb4c1105856997a8e', pos: '50% 45%', alt: 'Sosyal medya analiz ve öğrenme görseli' }
  ];
  var FORMS = ['kısa bir videoya', 'bir hikâye karesine', 'kaydırmalı bir gönderiye', 'canlı bir yayına', 'bir topluluk sorusuna'];
  var BEATS = [
    { k: 'İçerik stratejisi', d: 'Ne anlatacağımızın planı.' },
    { k: 'Editoryal takvim', d: 'Ne zaman, hangi sırayla.' },
    { k: 'Feed ve Story dengesi', d: 'Kalıcı olanla anlık olan.' },
    { k: 'Kısa video anlatımı', d: 'İlk saniyede kurulan dikkat.' },
    { k: 'Kampanya iletişimi', d: 'Dönemsel çıkışlar, aynı ses.' },
    { k: 'Topluluk etkileşimi', d: 'Yanıt veren, soru soran marka.' },
    { k: 'Analiz ve optimizasyon', d: 'Okunan sonuç, güncellenen plan.' }
  ];
  var READS = [
    { t: 'Nitelikli etkileşim', d: 'Kaç yorum geldiğinden çok, yorumların içeriğe ne kattığı.' },
    { t: 'İçerik ilgisi', d: 'İzlenme süresi, sonuna kadar okunan ve tekrar dönülen içerikler.' },
    { t: 'Kaydetme ve paylaşma', d: 'Bir içeriği saklamak ya da birine göndermek, beğeniden daha güçlü bir işarettir.' },
    { t: 'Mesaj ve iletişim talepleri', d: 'Sosyal medyadan gelen sorular, randevu ve teklif istekleri.' },
    { t: 'İletişimin tutarlılığı', d: 'Ton, görsel dil ve yanıt hızı her kanalda aynı karakteri taşıyor mu?' },
    { t: 'Ticari hedeflerle ilişki', d: 'Sosyal medyada kurulan ilişki, satış ve talep hedefleriyle nasıl buluşuyor?' }
  ];
  function up(s) { return s.toLocaleUpperCase('tr-TR'); }

  function screen(id, r, label, eager, sizes, fallbackId) {
    var still = fallbackId || id;
    return '<div class="sm-scrbox"><div class="sm-screen">' +
      '<img class="sm-poster" alt="" decoding="async"' + (eager ? '' : ' loading="lazy"') + ' src="' + poster(still, 720, r) + '" srcset="' + poster(still, 480, r) + ' 480w, ' + poster(still, 720, r) + ' 720w, ' + poster(still, 1280, r) + ' 1280w" sizes="' + sizes + '">' +
      '<video class="sm-video" muted playsinline loop preload="none" aria-label="' + label + '"></video>' +
      '<span class="sm-screen__prog" aria-hidden="true"><i></i></span>' +
      '<p class="sm-screen__err" role="status"></p>' +
    '</div>' +
    '<button type="button" class="sm-play" aria-label="Videoyu duraklat" aria-pressed="false">' + I.pause + I.play + '</button></div>';
  }

  function markup() {
    var chapters = CHAPTERS.map(function (c, i) { return '<li class="sm-cp" data-i="' + i + '"><span class="sm-cp__k">' + c.k + '</span><span class="sm-cp__d">' + c.d + '</span></li>'; }).join('');
    var tabs = STAGES.map(function (s, i) {
      return '<button type="button" role="tab" class="sm-tab" id="sm-tab-' + i + '" aria-controls="sm-stage" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '" data-i="' + i + '">' +
        '<span class="sm-tab__n">0' + (i + 1) + '</span><span class="sm-tab__t">' + up(s.t) + '</span><i class="sm-tab__bar" aria-hidden="true"></i></button>';
    }).join('');
    var stageImgs = '<div class="sm-stg__fallback" aria-hidden="true"><span>01 / STRATEJİ</span><strong>MARKAYI ANLAMAK.</strong></div>' +
      '<video class="sm-stg__img sm-stg__video is-on" data-i="0" muted playsinline loop preload="none" aria-label="Markayı anlamak strateji videosu, sessiz"></video>' +
      STAGES.slice(1).map(function (st, i) { return pic(st.id, 'sm-stg__img', st.alt, '(max-width:767px) 100vw, (max-width:1024px) 46vw, 30vw', st.pos).replace('<img ', '<img data-i="' + (i + 1) + '" '); }).join('') +
      '<button type="button" class="sm-stg__vbtn is-active" aria-label="Strateji videosunu oynat" aria-pressed="false">' + I.play + I.pause + '</button>' +
      '<p class="sm-stg__video-error" role="status"></p>';
    var forms = FORMS.map(function (f, i) { return '<span class="sm-morph__w' + (i === 0 ? ' is-on' : '') + '" data-i="' + i + '">' + f + '</span>'; }).join('');
    var beats = BEATS.map(function (b, i) { return '<li class="sm-beat sm-beat--' + (i + 1) + '"><span class="sm-beat__w" aria-hidden="true">' + (i % 2 ? 'karakter' : 'KARAKTER') + '</span><span class="sm-beat__k">' + b.k + '</span><span class="sm-beat__d">' + b.d + '</span></li>'; }).join('');
    var reads = READS.map(function (r) { return '<div class="sm-read"><dt>' + r.t + '</dt><dd>' + r.d + '</dd></div>'; }).join('');

    return '' +
'<main class="sm" id="sosyal-medya" lang="tr">' +
/* 01 — Akışın ötesinde */
'<section class="sm-hero" aria-labelledby="sm-h1">' +
  '<div class="sm-wrap">' +
    '<p class="sm-kicker"><span>1N Digital Media</span><span>Sosyal medya yönetimi</span></p>' +
    '<div class="sm-hero__stage">' +
      '<h1 class="sm-hero__title" id="sm-h1"><span class="sm-sr">Sosyal medya. Akışın ötesinde.</span>' +
        '<span class="sm-tl" aria-hidden="true">' + chars('SOSYAL') + '</span>' +
        '<span class="sm-tl" aria-hidden="true">' + chars('MEDYA.') + '</span>' +
      '</h1>' +
      '<figure class="sm-feed" data-sm="hero">' + screen(V_HERO, 9 / 16, '1N Sosyal Medya açılış videosu; sessiz oynatım', true, '(max-width:767px) 56vw, 22vw') +
        '<figcaption class="sm-feed__cap">Her paylaşım bir yerde başlar. Biz onu anlamlı bir hikâyeye dönüştürürüz.</figcaption></figure>' +
    '</div>' +
    '<div class="sm-hero__foot">' +
      '<p class="sm-hero__alt" aria-hidden="true">' + ln('AKIŞIN') + ln('ÖTESİNDE.') + '</p>' +
      '<p class="sm-hero__p">Her paylaşım bir iz bırakır. Biz o izin bir marka hikâyesine dönüşmesini sağlarız.</p>' +
      '<a class="sm-scroll" href="#sm-hikaye"><span>Akışın dışına çık</span>' + I.down + '</a>' +
    '</div>' +
  '</div>' +
'</section>' +
/* 02 — Devam eden bir hikâye */
'<section class="sm-sec sm-story" id="sm-hikaye" aria-labelledby="sm-story-t">' +
  '<div class="sm-wrap">' +
    '<p class="sm-label">Hikâye</p>' +
    '<h2 class="sm-story__h" id="sm-story-t">' +
      '<span class="sm-story__a">' + ln('SADECE') + ln('PAYLAŞMIYORUZ.') + '</span>' +
      '<span class="sm-story__b">' + ln('DEVAM EDEN') + ln('BİR HİKÂYE') + ln('KURUYORUZ.', 'sm-ln--acc') + '</span>' +
    '</h2>' +
    '<div class="sm-story__scene">' +
      '<svg class="sm-thread" aria-hidden="true" focusable="false"><path class="sm-thread__p" d=""/></svg>' +
      '<figure class="sm-sf sm-sf--a">' + pic(IM.hay, 'sm-sf__img', 'Beyaz kıyafetli bir kadın bulutlu gökyüzü altında saman yığınına uzanmış', '(max-width:767px) 100vw, 56vw', '50% 40%', { w: 1200, ws: [800, 1200, 1800, 2400] }) + '<figcaption class="sm-cap">Bir duruş.</figcaption></figure>' +
      '<div class="sm-story__copy">' +
        '<p class="sm-story__p">Sosyal medya yönetimi bir görsel hazırlayıp paylaşmakla bitmez. Her paylaşım bir öncekinin devamı, bir sonrakinin hazırlığıdır.</p>' +
        '<ol class="sm-cps">' + chapters + '</ol>' +
      '</div>' +
      '<figure class="sm-sf sm-sf--c">' + pic(IM.tulle, 'sm-sf__img', 'Turuncu fon önünde turkuaz tüllü etekle oturan kadın, yanında bir trafik lambası', '(max-width:767px) 58vw, 26vw', '50% 55%') + '<figcaption class="sm-cap">Bir renk.</figcaption></figure>' +
      '<figure class="sm-sf sm-sf--b">' + pic(IM.duo, 'sm-sf__img', 'Sarı ve mavi fon önünde, biri mavi biri kırmızı giyinmiş, birbirine bakan iki kadın', '(max-width:767px) 52vw, 26vw', '50% 45%') + '<figcaption class="sm-cap">Bir diyalog.</figcaption></figure>' +
    '</div>' +
  '</div>' +
'</section>' +
/* 03 — Her içeriğin bir nedeni var */
'<section class="sm-sec sm-engine" id="sm-strateji" aria-labelledby="sm-eng-t">' +
  '<div class="sm-wrap">' +
    '<div class="sm-head">' +
      '<p class="sm-label">Strateji</p>' +
      '<h2 class="sm-h2" id="sm-eng-t">' + ln('HER İÇERİĞİN') + ln('BİR NEDENİ VAR.', 'sm-ln--acc') + '</h2>' +
      '<p class="sm-lede">Doğru mesaj, doğru topluluk ve doğru zaman.</p>' +
    '</div>' +
    '<div class="sm-eng">' +
      '<div class="sm-tabs" role="tablist" aria-label="Strateji aşamaları" aria-orientation="vertical">' + tabs + '</div>' +
      '<div class="sm-stg" role="tabpanel" id="sm-stage" aria-labelledby="sm-tab-0" tabindex="0">' +
        '<div class="sm-stg__media">' + stageImgs + '</div>' +
        '<div class="sm-stg__copy" aria-live="polite">' +
          '<p class="sm-stg__n"><b>01</b> / 05</p>' +
          '<h3 class="sm-stg__t">' + ln(up(STAGES[0].t)) + '</h3>' +
          '<p class="sm-stg__d">' + STAGES[0].d + '</p>' +
          '<p class="sm-stg__q">' + STAGES[0].q + '</p>' +
          '<div class="sm-stg__nav"><button type="button" class="sm-arw sm-arw--prev" aria-label="Önceki aşama">' + I.prev + '</button><button type="button" class="sm-arw sm-arw--next" aria-label="Sonraki aşama">' + I.next + '</button></div>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</div>' +
'</section>' +
/* 04 — İçerik harekete geçtiğinde */
'<section class="sm-sec sm-motion" id="sm-hareket" aria-labelledby="sm-mo-t">' +
  '<div class="sm-wrap">' +
    '<div class="sm-head">' +
      '<p class="sm-label">Hareket</p>' +
      '<h2 class="sm-h2" id="sm-mo-t">' + ln('İÇERİK') + ln('HAREKETE') + ln('GEÇTİĞİNDE.', 'sm-ln--acc') + '</h2>' +
    '</div>' +
    '<p class="sm-morph"><span class="sm-sr">Bir fikir; ' + FORMS.join(', ') + ' dönüşür.</span>' +
      '<span class="sm-morph__a" aria-hidden="true">Bir fikir</span> <span class="sm-morph__slot" aria-hidden="true">' + forms + '</span> <span class="sm-morph__z" aria-hidden="true">dönüşür.</span></p>' +
    '<div class="sm-mo__stage">' +
      '<figure class="sm-band" data-sm="motion">' + screen(V_MOTION, 16 / 9, 'Sosyal Medya hareketli içerik videosu; sessiz oynatım', false, '(max-width:1024px) 100vw, 90vw') +
        '<figcaption class="sm-cap">Platformlar çok; markanın karakteri tek.</figcaption></figure>' +
      '<figure class="sm-glitch">' + pic(IM.glitch, 'sm-glitch__img', 'Renkleri kaymış, sinyal bozulması efektli bir portre', '(max-width:767px) 50vw, 24vw', '50% 40%') + '</figure>' +
      '<p class="sm-mo__p">Aynı fikir her platformda farklı bir uzunluk, ritim ve dil ister. Fikri korur, anlatımı her biçime göre yeniden kurarız: kurgusu, ilk saniyesi, metni ve kapanışıyla.</p>' +
    '</div>' +
  '</div>' +
'</section>' +
/* 05 — Her markanın kendi ritmi var */
'<section class="sm-sec sm-rhythm" id="sm-ritim" aria-labelledby="sm-rh-t">' +
  '<div class="sm-wrap">' +
    '<div class="sm-head">' +
      '<p class="sm-label">Ritim</p>' +
      '<h2 class="sm-h2" id="sm-rh-t">' + ln('HER MARKANIN') + ln('KENDİ RİTMİ VAR.', 'sm-ln--acc') + '</h2>' +
    '</div>' +
    '<p class="sm-quote">Sosyal medyada tutarlılık, bütün paylaşımların birbirinin aynısı olması değildir. <strong>Aynı marka karakterinin farklı anlatımlarda korunabilmesidir.</strong></p>' +
    '<ol class="sm-beats" aria-label="Sosyal medya yönetiminin ritmi">' + beats + '</ol>' +
  '</div>' +
'</section>' +
/* 06 — Rakamların ötesinde */
'<section class="sm-sec sm-reads" id="sm-degerlendirme" aria-labelledby="sm-rd-t">' +
  '<div class="sm-wrap sm-reads__grid">' +
    '<div class="sm-reads__side">' +
      '<p class="sm-label">Değerlendirme</p>' +
      '<h2 class="sm-h2" id="sm-rd-t">' + ln('RAKAMLARIN') + ln('ÖTESİNDE.', 'sm-ln--acc') + '</h2>' +
      '<p class="sm-reads__sub">Önemli olan yalnızca kaç kişinin gördüğü değil, markayla nasıl bir ilişki kurulduğudur.</p>' +
      '<p class="sm-reads__p">Beğeni ve gösterim tek başına başarıyı anlatmaz. Rakamları, arkalarındaki davranışı anlamak için okuruz.</p>' +
    '</div>' +
    '<dl class="sm-reads__list">' + reads + '</dl>' +
  '</div>' +
'</section>' +
/* 07 — Akışı değil, bakışı yönetiyoruz */
'<section class="sm-sec sm-way" id="sm-yaklasim" aria-labelledby="sm-way-t">' +
  '<div class="sm-wrap">' +
    '<p class="sm-label">Yaklaşım</p>' +
    '<h2 class="sm-way__t" id="sm-way-t"><span class="sm-sr">Biz akışı değil, bakışı yönetiyoruz.</span>' +
      '<span class="sm-wl sm-wl--1" aria-hidden="true">' + ln('BİZ') + '</span>' +
      '<span class="sm-wl sm-wl--2" aria-hidden="true">' + ln('AKIŞI DEĞİL,') + '</span>' +
      '<span class="sm-wl sm-wl--3" aria-hidden="true"><span class="sm-b"><span>B</span></span><span class="sm-akisi">AKIŞI</span></span>' +
      '<span class="sm-wl sm-wl--4" aria-hidden="true">' + ln('YÖNETİYORUZ.') + '</span>' +
    '</h2>' +
    '<p class="sm-way__p">Görünür olmak yalnızca başlangıç. Bizim işimiz, markanın bir bakışta tanınması, bir sonraki paylaşımının beklenmesi ve konuşulduğunda doğru hatırlanması.</p>' +
    '<figure class="sm-strip">' + pic(IM.fabric, 'sm-strip__img', 'Gökyüzü önünde sarı kıyafetli bir kadın ve rüzgârda uçuşan turuncu bir kumaş', '100vw', '50% 46%', { w: 1800, ws: [800, 1200, 1800, 2400] }) +
      '<figcaption class="sm-cap">Bir bakış: hareket, renk ve duruş aynı karede.</figcaption></figure>' +
  '</div>' +
'</section>' +
/* 08 — Final */
'<section class="sm-fin" aria-labelledby="sm-fin-t">' +
  '<div class="sm-wrap sm-fin__grid">' +
    '<div class="sm-fin__copy">' +
      '<p class="sm-label">Başlayalım</p>' +
      '<h2 class="sm-fin__t" id="sm-fin-t">' + ln('MARKANIZIN') + ln('HİKÂYESİNİ') + ln('BİRLİKTE') + ln('ANLATALIM.', 'sm-ln--acc') + '</h2>' +
      '<p class="sm-fin__sub">Markanızın sesini, görsel dünyasını ve sosyal medya iletişimini birlikte şekillendirelim.</p>' +
      '<div class="sm-fin__cta">' +
        '<a class="sm-btn sm-btn--primary" href="/iletisim"><span>Projenizi Konuşalım</span><span class="sm-btn__ico">' + I.arrow + '</span></a>' +
        '<a class="sm-btn sm-btn--ghost" href="/teklif-al"><span>Teklif Al</span><span class="sm-btn__ico">' + I.arrow + '</span></a>' +
      '</div>' +
    '</div>' +
    '<figure class="sm-fin__fig" data-sm="final">' + screen(V_FINAL, 9 / 16, 'Sosyal Medya kapanış videosu; sessiz oynatım', false, '(max-width:767px) 80vw, 22vw', V_HERO_FINAL_STILL) +
      '<figcaption class="sm-cap">Hikâye bir sonraki paylaşımda devam eder.</figcaption></figure>' +
  '</div>' +
'</section>' +
'</main>';
  }

  /* ---------- CSS (yalnızca n1-sosyal-medya-v26 kapsamında) ---------- */
  var T = TAG;
  var COND = '"Barlow Condensed","Arial Narrow",Arial,sans-serif';
  var CSS = [
T + '{--bg:#080A09;--g1:#0D0F0E;--g2:#121513;--ink:#ECEBE5;--soft:#BDBCB5;--mute:#9A9B95;--dim:#6E706A;--ghost:#2B2E2B;--line:rgba(228,227,221,.12);--line2:rgba(228,227,221,.07);--acc:#A8CF62;--ease:cubic-bezier(.22,1,.36,1);',
'  --hdr:88px;--gap:clamp(18px,2.2vw,40px);--secpad:clamp(100px,8.6vw,168px);display:block;position:relative;width:100%;background:var(--bg);color:var(--ink);font:400 17px/1.6 Barlow,Arial,sans-serif;-webkit-font-smoothing:antialiased;overflow-x:clip;text-align:left}',
T + ' *,' + T + ' *::before,' + T + ' *::after{box-sizing:border-box;min-width:0}',
T + ' :where(.sm) :where(p,h1,h2,h3,ul,ol,figure,figcaption){margin:0}',
T + ' :where(.sm) :where(ul,ol){padding:0;list-style:none}',
T + ' :where(.sm) :where(a){color:inherit}',
T + ' :where(.sm) :where(button){font:inherit;color:inherit;background:none;border:0;padding:0;margin:0;cursor:pointer;-webkit-tap-highlight-color:transparent}',
T + ' .sm :focus-visible{outline:2px solid var(--acc);outline-offset:3px}',
T + ' .sm img{display:block;max-width:none}',
T + ' .sm-ico{display:block;flex:none}',
T + ' .sm-sr{position:absolute!important;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}',
T + ' .sm-wrap{width:90%;margin-left:auto;margin-right:auto}',
T + ' .sm-sec{position:relative;padding:var(--secpad) 0;border-top:1px solid var(--line)}',
T + ' .sm-label{display:flex;align-items:center;gap:12px;font:500 15px/1.3 Barlow,Arial,sans-serif;color:var(--mute)}',
T + ' .sm-label::before{content:"";flex:none;width:7px;height:7px;border-radius:1px;background:var(--acc)}',
/* Satır maskesi: Türkçe İ, Ş, Ğ, Ü, Ö için üst/alt güvenli pay */
T + ' .sm-ln{display:block;overflow:hidden;padding:.17em 0 .09em;margin:-.17em 0 -.09em}',
T + ' .sm-ln>span{display:block}',
T + ' .sm-ln--acc{color:var(--acc)}',
T + ' .sm-chs{display:inline-block;white-space:nowrap}',
T + ' .sm-ch{display:inline-block;will-change:transform}',
T + ' .sm-sp{display:inline-block;width:.24em}',
T + ' .sm-h2{margin-top:clamp(26px,2.4vw,40px);font:700 clamp(60px,7.4vw,148px)/1 ' + COND + ';letter-spacing:-.016em;color:var(--ink)}',
T + ' .sm-cap{margin-top:14px;font-size:14px;line-height:1.5;color:var(--mute)}',

/* Ekran: poster + video (9:16) */
T + ' .sm-screen{position:absolute;inset:0;overflow:hidden;border-radius:6px;background:#0B0D0C}',
T + ' .sm-poster,' + T + ' .sm-video{position:absolute;inset:0;display:block;width:100%;height:100%;object-fit:cover}',
T + ' .sm-video{opacity:0;transition:opacity .6s var(--ease)}',
T + ' .sm-screen.is-started .sm-video{opacity:1}',
T + ' .sm-screen.is-failed .sm-video{opacity:0}',
T + ' .sm-screen::after{content:"";position:absolute;inset:auto 0 0 0;height:34%;background:linear-gradient(180deg,rgba(8,10,9,0),rgba(8,10,9,.55));pointer-events:none}',
T + ' .sm-screen__prog{position:absolute;left:14px;right:14px;bottom:14px;z-index:2;height:2px;background:rgba(236,235,229,.22);overflow:hidden}',
T + ' .sm-screen__prog i{position:absolute;inset:0;background:var(--acc);transform:scaleX(0);transform-origin:0 50%}',
T + ' .sm-screen__err{position:absolute;left:14px;right:14px;bottom:26px;z-index:2;font-size:12px;line-height:1.4;color:var(--soft)}',
T + ' .sm-screen__err:empty{display:none}',
T + ' .sm-scrbox{position:relative}',
T + ' .sm-play{position:absolute;right:12px;top:12px;z-index:3;display:grid;place-items:center;width:40px;height:40px;border-radius:50%;background:rgba(8,10,9,.55);color:var(--ink);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);transition:background-color .3s var(--ease),color .3s var(--ease);touch-action:manipulation}',
T + ' .sm-play:hover,' + T + ' .sm-play:focus-visible{background:var(--acc);color:#080A09}',
T + ' .sm-play .sm-ico--play,' + T + ' .sm-play[aria-pressed="true"] .sm-ico--pause{display:none}',
T + ' .sm-play[aria-pressed="true"] .sm-ico--play{display:block}',
T + ' .sm-play:disabled{display:none}',


/* ===== Ortak başlık düzeni ===== */
T + ' .sm-head{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:end}',
T + ' .sm-head .sm-label,' + T + ' .sm-head .sm-h2{grid-column:1/9}',
T + ' .sm-lede{grid-column:9/13;grid-row:2;max-width:34ch;font-size:clamp(17px,1.3vw,22px);line-height:1.5;color:var(--soft)}',

/* ===== 01 Akışın ötesinde ===== */
T + ' .sm-hero{position:relative;padding:calc(var(--hdr) + clamp(26px,3vw,54px)) 0 clamp(70px,6vw,110px);overflow:hidden;isolation:isolate}',
T + ' .sm-kicker{display:flex;flex-wrap:wrap;gap:6px 28px;font:500 14px/1.3 Barlow,Arial,sans-serif;letter-spacing:.04em;color:var(--mute)}',
T + ' .sm-kicker span:first-child{color:var(--ink)}',
T + ' .sm-hero__stage{position:relative;margin-top:clamp(18px,2vw,34px)}',
T + ' .sm-hero__title{position:relative;z-index:2;font:700 clamp(110px,18.6vw,360px)/.86 ' + COND + ';letter-spacing:-.022em;color:var(--ink);mix-blend-mode:difference;pointer-events:none}',
T + ' .sm-tl{display:block;padding:.07em 0 .02em}',
T + ' .sm-tl .sm-ch{transform-origin:50% 100%}',
/* Akış sütunu: dikey film; başlık bu sütunun üstünden geçerken içinde tersine döner (mix-blend: difference) */
T + ' .sm-feed{position:absolute;z-index:1;left:44%;top:3%;width:clamp(220px,21vw,410px)}',
T + ' .sm-feed .sm-scrbox{aspect-ratio:9/16}',
T + ' .sm-feed__cap{position:absolute;left:calc(100% + 18px);bottom:0;width:15ch;font-size:13px;line-height:1.5;color:var(--mute)}',
T + ' .sm-hero__foot{position:relative;z-index:3;width:min(46%,640px);margin-top:clamp(30px,3vw,56px)}',
T + ' .sm-hero__alt{font:700 clamp(44px,4.6vw,92px)/.92 ' + COND + ';letter-spacing:-.01em;color:var(--acc)}',
T + ' .sm-hero__p{max-width:40ch;margin-top:clamp(20px,2vw,32px);font-size:clamp(17px,1.25vw,21px);line-height:1.55;color:var(--soft)}',
T + ' .sm-scroll{display:inline-flex;align-items:center;gap:12px;margin-top:26px;font:500 13px/1 Barlow,Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase;text-decoration:none;color:var(--ink)}',
T + ' .sm-scroll .sm-ico{color:var(--acc);transition:transform .45s var(--ease)}',
T + ' .sm-scroll:hover .sm-ico{transform:translateY(3px)}',

/* ===== 02 Hikâye ===== */
T + ' .sm-story__h{margin-top:clamp(26px,2.4vw,40px);font-family:' + COND + ';font-weight:700;letter-spacing:-.016em}',
T + ' .sm-story__a{display:block;font-size:clamp(40px,4.4vw,88px);line-height:.98;color:var(--dim)}',
T + ' .sm-story__b{display:block;margin-top:.18em;font-size:clamp(60px,7.4vw,148px);line-height:1;color:var(--ink)}',
T + ' .sm-story__scene{position:relative;display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);margin-top:clamp(56px,5vw,96px)}',
T + ' .sm-thread{position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none;z-index:0}',
T + ' .sm-thread__p{fill:none;stroke:var(--acc);stroke-width:1.5;opacity:.55;vector-effect:non-scaling-stroke}',
T + ' .sm-sf{position:relative;z-index:1}',
T + ' .sm-sf__img{width:100%;object-fit:cover;border-radius:3px;background:var(--g1)}',
T + ' .sm-sf--a{grid-column:1/8;grid-row:1}',
T + ' .sm-sf--a .sm-sf__img{aspect-ratio:3/2}',
T + ' .sm-story__copy{grid-column:9/13;grid-row:1;align-self:end}',
T + ' .sm-story__p{font-size:clamp(17px,1.25vw,21px);line-height:1.55;color:var(--ink)}',
T + ' .sm-cps{margin-top:clamp(24px,2.4vw,40px);border-top:1px solid var(--line)}',
T + ' .sm-cp{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.3fr);column-gap:18px;padding:13px 0;border-bottom:1px solid var(--line2)}',
T + ' .sm-cp__k{font:600 17px/1.25 ' + COND + ';letter-spacing:.04em;text-transform:uppercase;color:var(--ink)}',
T + ' .sm-cp__d{font-size:14.5px;line-height:1.5;color:var(--mute)}',
T + ' .sm-sf--c{grid-column:2/6;grid-row:2;margin-top:clamp(90px,9vw,170px)}',
T + ' .sm-sf--c .sm-sf__img{aspect-ratio:4/5}',
T + ' .sm-sf--b{grid-column:8/12;grid-row:2;margin-top:clamp(200px,20vw,380px)}',
T + ' .sm-sf--b .sm-sf__img{aspect-ratio:2/3}',

/* ===== 03 Strateji ===== */
T + ' .sm-eng{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);margin-top:clamp(56px,5vw,96px);align-items:start}',
T + ' .sm-tabs{grid-column:1/6;display:flex;flex-direction:column;border-top:1px solid var(--line)}',
T + ' .sm-tab{position:relative;display:grid;grid-template-columns:clamp(40px,3.4vw,58px) minmax(0,1fr);align-items:baseline;padding:clamp(16px,1.5vw,24px) 0;border-bottom:1px solid var(--line);text-align:left;touch-action:manipulation}',
T + ' .sm-tab__n{font:500 13px/1 Barlow,Arial,sans-serif;letter-spacing:.08em;font-variant-numeric:tabular-nums;color:var(--dim);transition:color .4s var(--ease)}',
T + ' .sm-tab__t{font:700 clamp(28px,2.7vw,52px)/1 ' + COND + ';letter-spacing:-.005em;color:var(--dim);transition:color .45s var(--ease),translate .6s var(--ease)}',
T + ' .sm-tab__bar{position:absolute;left:0;right:0;bottom:-1px;height:2px;background:var(--acc);transform:scaleX(0);transform-origin:0 50%;transition:transform .7s var(--ease)}',
T + ' .sm-tab:hover .sm-tab__t{color:var(--soft)}',
T + ' .sm-tab[aria-selected="true"] .sm-tab__t{color:var(--ink);translate:8px 0}',
T + ' .sm-tab[aria-selected="true"] .sm-tab__n{color:var(--acc)}',
T + ' .sm-tab[aria-selected="true"] .sm-tab__bar{transform:scaleX(1)}',
T + ' .sm-stg{grid-column:7/13;display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr);column-gap:var(--gap);align-items:end;outline-offset:6px}',
T + ' .sm-stg__media{position:relative;aspect-ratio:4/5;overflow:hidden;border-radius:3px;background:var(--g1)}',
T + ' .sm-stg__img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .5s var(--ease)}',
T + ' .sm-stg__img.is-on{opacity:1;z-index:2}',
T + ' .sm-stg__img.is-prev{opacity:1;z-index:1}',
T + ' .sm-stg__fallback{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-end;gap:8px;padding:clamp(20px,3vw,36px);background:linear-gradient(145deg,#171f14,#080A09);color:var(--ink)}',
T + ' .sm-stg__fallback span{font:500 12px/1.4 Barlow,Arial,sans-serif;letter-spacing:.17em;color:var(--acc)}',
T + ' .sm-stg__fallback strong{font:700 clamp(34px,3vw,54px)/1.08 ' + COND + ';max-width:10ch}',
T + ' .sm-stg__video:not(.is-started){opacity:0!important}',
T + ' .sm-stg__video{background:transparent}',
T + ' .sm-stg__vbtn{position:absolute;top:16px;right:16px;z-index:5;display:none;place-items:center;width:46px;height:46px;border-radius:50%;border:1px solid rgba(236,235,229,.45);background:rgba(8,10,9,.75);color:var(--ink);cursor:pointer}',
T + ' .sm-stg__vbtn.is-active{display:grid}',
T + ' .sm-stg__vbtn:focus-visible{outline:2px solid var(--acc);outline-offset:4px}',
T + ' .sm-stg__vbtn .sm-ico--pause{display:none}',
T + ' .sm-stg__vbtn.is-playing .sm-ico--pause{display:block}',
T + ' .sm-stg__vbtn.is-playing .sm-ico--play{display:none}',
T + ' .sm-stg__video-error{position:absolute;left:16px;bottom:16px;z-index:4;max-width:80%;font:400 13px/1.5 Barlow,Arial,sans-serif;color:var(--ink)}',
T + ' .sm-stg__n{font:500 13px/1 Barlow,Arial,sans-serif;letter-spacing:.12em;font-variant-numeric:tabular-nums;color:var(--mute)}',
T + ' .sm-stg__n b{font-weight:500;color:var(--acc)}',
T + ' .sm-stg__t{margin-top:18px;font:700 clamp(30px,2.6vw,50px)/1 ' + COND + ';color:var(--ink)}',
T + ' .sm-stg__d{margin-top:18px;font-size:clamp(17px,1.2vw,20px);line-height:1.5;color:var(--ink)}',
T + ' .sm-stg__q{margin-top:14px;font-size:15px;line-height:1.6;color:var(--mute)}',
T + ' .sm-stg__nav{display:flex;gap:8px;margin-top:28px}',
T + ' .sm-arw{display:grid;place-items:center;width:46px;height:46px;border:1px solid var(--line);border-radius:50%;color:var(--ink);transition:background-color .3s var(--ease),color .3s var(--ease),border-color .3s var(--ease);touch-action:manipulation}',
T + ' .sm-arw:hover,' + T + ' .sm-arw:focus-visible{background:var(--acc);border-color:var(--acc);color:#080A09}',

/* ===== 04 Hareket ===== */
T + ' .sm-morph{display:flex;flex-direction:column;align-items:flex-start;gap:0;margin-top:clamp(44px,4vw,72px);font:600 clamp(32px,3.6vw,68px)/1.12 ' + COND + ';color:var(--soft)}',
T + ' .sm-morph__slot{position:relative;display:inline-grid;overflow:hidden;padding:.12em 0 .06em;margin:-.04em 0 -.02em;font-size:1.5em;line-height:1;color:var(--acc)}',
T + ' .sm-morph__w{grid-area:1/1;white-space:nowrap;transform:translateY(110%);opacity:0;transition:transform .7s var(--ease),opacity .4s var(--ease)}',
T + ' .sm-morph__w.is-on{transform:none;opacity:1}',
T + ' .sm-morph__w.is-out{transform:translateY(-110%);opacity:0}',
T + ' .sm-mo__stage{position:relative;display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);margin-top:clamp(40px,4vw,70px)}',
T + ' .sm-band{grid-column:1/-1;grid-row:1}',
T + ' .sm-band .sm-scrbox{aspect-ratio:16/7}',
T + ' .sm-band .sm-screen{border-radius:4px}',
T + ' .sm-band .sm-screen::after{display:none}',
T + ' .sm-glitch{grid-column:9/12;grid-row:1/3;align-self:end;position:relative;z-index:2;margin-top:clamp(30px,3vw,52px)}',
T + ' .sm-glitch__img{width:100%;aspect-ratio:2/3;object-fit:cover;border-radius:3px;box-shadow:0 30px 70px rgba(0,0,0,.6)}',
T + ' .sm-band .sm-cap{max-width:30ch}',
T + ' .sm-mo__p{grid-column:1/7;grid-row:2;margin-top:clamp(30px,3vw,52px);max-width:52ch;font-size:clamp(17px,1.2vw,20px);line-height:1.6;color:var(--soft)}',

/* ===== 05 Ritim ===== */
T + ' .sm-quote{max-width:38ch;margin-top:clamp(40px,3.6vw,64px);font-size:clamp(20px,1.7vw,30px);line-height:1.42;color:var(--mute)}',
T + ' .sm-quote strong{font-weight:500;color:var(--ink)}',
T + ' .sm-beats{display:flex;flex-wrap:wrap;align-items:flex-end;gap:clamp(30px,3vw,56px) clamp(26px,2.8vw,54px);margin-top:clamp(56px,5vw,96px)}',
T + ' .sm-beat{display:flex;flex-direction:column;gap:8px;max-width:100%}',
T + ' .sm-beat__w{display:block;padding:.06em 0 .03em;white-space:nowrap;color:var(--ink)}',
T + ' .sm-beat__k{font:600 14px/1.2 ' + COND + ';letter-spacing:.1em;text-transform:uppercase;color:var(--soft)}',
T + ' .sm-beat__d{font-size:13.5px;line-height:1.45;color:var(--mute)}',
/* Aynı sözcük, yedi anlatım */
T + ' .sm-beat--1 .sm-beat__w{font:700 clamp(64px,7.4vw,150px)/.92 ' + COND + ';letter-spacing:-.02em}',
T + ' .sm-beat--2 .sm-beat__w{font:400 clamp(26px,2.2vw,42px)/1 Barlow,Arial,sans-serif;letter-spacing:.02em;color:var(--soft)}',
T + ' .sm-beat--3 .sm-beat__w{font:700 clamp(44px,4.4vw,88px)/.92 ' + COND + ';color:transparent;-webkit-text-stroke:1.5px var(--ink)}',
T + ' .sm-beat--4 .sm-beat__w{font:500 clamp(22px,1.8vw,34px)/1 ' + COND + ';letter-spacing:.42em;color:var(--soft)}',
T + ' .sm-beat--5 .sm-beat__w{font:700 clamp(54px,5.6vw,112px)/.92 ' + COND + ';color:var(--acc)}',
T + ' .sm-beat--6 .sm-beat__w{font:600 clamp(30px,2.6vw,50px)/1 Barlow,Arial,sans-serif;letter-spacing:-.02em}',
T + ' .sm-beat--7 .sm-beat__w{font:700 clamp(30px,2.6vw,50px)/1 ' + COND + ';padding:.08em .22em .04em;background:var(--ink);color:#080A09;border-radius:2px;align-self:flex-start}',

/* ===== 06 Rakamların ötesinde ===== */
T + ' .sm-reads__grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:start}',
T + ' .sm-reads__side{grid-column:1/6;position:sticky;top:calc(var(--hdr) + 36px)}',
T + ' .sm-reads__sub{max-width:34ch;margin-top:clamp(26px,2.4vw,40px);font-size:clamp(19px,1.45vw,25px);line-height:1.45;color:var(--ink)}',
T + ' .sm-reads__p{max-width:40ch;margin-top:18px;font-size:16px;line-height:1.65;color:var(--mute)}',
T + ' .sm-reads__list{grid-column:7/13;margin:clamp(10px,4vw,80px) 0 0}',
T + ' .sm-read{position:relative;padding:clamp(24px,2.2vw,36px) 0}',
T + ' .sm-read::before{content:"";position:absolute;left:0;right:0;top:0;height:1px;background:var(--line);transform-origin:0 50%;transform:scaleX(var(--sm-line,1))}',
T + ' .sm-read dt{font:600 clamp(26px,2.2vw,40px)/1.05 ' + COND + ';text-transform:uppercase;color:var(--ink)}',
T + ' .sm-read dd{margin:12px 0 0;max-width:44ch;font-size:16px;line-height:1.6;color:var(--mute)}',

/* ===== 07 Yaklaşım ===== */
T + ' .sm-way{overflow:hidden}',
T + ' .sm-way__t{margin-top:clamp(26px,2.4vw,40px);font:700 clamp(72px,10.6vw,214px)/.9 ' + COND + ';letter-spacing:-.02em;color:var(--ink)}',
T + ' .sm-wl{display:block}',
T + ' .sm-wl--2{color:var(--dim);padding-left:12%}',
T + ' .sm-wl--3{display:flex;align-items:flex-end;padding:.08em 0 .03em;white-space:nowrap}',
T + ' .sm-b{display:inline-block;overflow:hidden;color:var(--acc)}',
T + ' .sm-b span{display:inline-block}',
T + ' .sm-akisi{display:inline-block;color:var(--ink)}',
'@supports ((-webkit-background-clip:text) or (background-clip:text)){',
T + ' .sm-akisi.is-fill{color:transparent;-webkit-background-clip:text;background-clip:text;background-size:cover;background-position:50% 45%}',
'}',
T + ' .sm-wl--4{padding-left:12%}',
T + ' .sm-way__p{max-width:44ch;margin:clamp(34px,3vw,56px) 0 0 auto;font-size:clamp(18px,1.4vw,24px);line-height:1.5;color:var(--soft)}',
T + ' .sm-strip{margin-top:clamp(70px,6vw,120px)}',
T + ' .sm-strip__img{width:100%;aspect-ratio:21/9;object-fit:cover;border-radius:3px;background:var(--g1)}',

/* ===== 08 Final ===== */
T + ' .sm-fin{position:relative;padding:clamp(110px,9vw,170px) 0 clamp(90px,7vw,130px);border-top:1px solid var(--line);background:linear-gradient(180deg,var(--bg),var(--g1));overflow:hidden}',
T + ' .sm-fin__grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);align-items:end}',
T + ' .sm-fin__copy{grid-column:1/9}',
T + ' .sm-fin__t{margin-top:clamp(26px,2.4vw,40px);font:700 clamp(76px,8.8vw,180px)/.96 ' + COND + ';letter-spacing:-.016em;color:var(--ink)}',
T + ' .sm-fin__sub{max-width:44ch;margin-top:clamp(28px,2.6vw,44px);font-size:clamp(17px,1.25vw,21px);line-height:1.55;color:var(--soft)}',
T + ' .sm-fin__cta{display:flex;flex-wrap:wrap;gap:14px;margin-top:clamp(32px,3vw,52px)}',
T + ' .sm-fin__fig{grid-column:10/13}',
T + ' .sm-fin__fig .sm-scrbox{width:100%;aspect-ratio:9/16;border-radius:4px;background:var(--g1)}',

T + ' .sm-btn{position:relative;display:inline-flex;align-items:center;justify-content:space-between;gap:22px;height:64px;padding:0 10px 0 28px;border-radius:12px;overflow:hidden;white-space:nowrap;isolation:isolate;',
'  font:500 13.5px/1 Barlow,Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase;text-decoration:none;color:var(--ink);border:1px solid rgba(168,207,98,.42);background:rgba(16,19,17,.72);transition:color .45s var(--ease),border-color .45s ease;touch-action:manipulation}',
T + ' .sm-btn::before{content:"";position:absolute;inset:0;z-index:-1;background:var(--acc);transform:scaleX(0);transform-origin:0 50%;transition:transform .6s cubic-bezier(.65,0,.35,1)}',
T + ' .sm-btn__ico{display:grid;place-items:center;width:44px;height:44px;border-radius:8px;background:rgba(168,207,98,.12);transition:background-color .45s ease}',
T + ' .sm-btn--ghost{border-color:rgba(228,227,221,.22);background:rgba(8,10,9,.5)}',
T + ' .sm-btn--ghost .sm-btn__ico{background:rgba(236,235,229,.06)}',
T + ' .sm-btn:hover,' + T + ' .sm-btn:focus-visible{color:#0A0B0B;border-color:var(--acc)}',
T + ' .sm-btn:hover::before,' + T + ' .sm-btn:focus-visible::before{transform:scaleX(1)}',
T + ' .sm-btn:hover .sm-btn__ico,' + T + ' .sm-btn:focus-visible .sm-btn__ico{background:rgba(10,11,11,.12)}',

/* Header paneli (yalnızca bu sayfanın paneli) */
'.n1h-panel[data-n1-sm],.n1h-panel[data-n1-sm] *,.n1h-panel[data-n1-sm] *::before,.n1h-panel[data-n1-sm] *::after{box-sizing:border-box}',
'.n1h-panel[data-n1-sm] a.n1h-item{text-decoration:none;color:#ecebe6}',
'.n1h-panel[data-n1-sm] .n1h-sub a{text-decoration:none}',
'@media (max-width:1024px){.n1h-panel[data-n1-sm][data-open]::before{content:"";position:fixed;left:0;right:0;bottom:0;top:72px;z-index:-1;pointer-events:none;background:rgba(8,10,9,.8);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}}',
'@media (max-width:767px){.n1h-panel[data-n1-sm][data-open]::before{top:64px}}',
T + ' .n1ft-partner-art{display:none}',

/* ---------- Tablet (≤1024) ---------- */
'@media (max-width:1024px){',
T + '{--hdr:72px}',
T + ' .sm-hero__title{font-size:clamp(100px,19.6vw,200px)}',
T + ' .sm-feed{left:50%;top:6%;width:clamp(200px,30vw,300px)}',
T + ' .sm-thread{display:none}',
T + ' .sm-feed__cap{left:auto;right:0;top:calc(100% + 12px);bottom:auto;width:100%;text-align:left}',
T + ' .sm-hero__foot{width:min(58%,520px)}',
T + ' .sm-hero__alt{font-size:clamp(44px,7vw,68px)}',
T + ' .sm-head .sm-label,' + T + ' .sm-head .sm-h2,' + T + ' .sm-lede{grid-column:1/-1}',
T + ' .sm-lede{grid-row:auto;margin-top:22px;max-width:44ch}',
T + ' .sm-sf--a{grid-column:1/-1}',
T + ' .sm-story__copy{grid-column:1/-1;grid-row:2;display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);column-gap:var(--gap);margin-top:44px}',
T + ' .sm-cps{margin-top:0}',
T + ' .sm-sf--c{grid-column:1/7;grid-row:3;margin-top:70px}',
T + ' .sm-sf--b{grid-column:8/13;grid-row:3;margin-top:190px}',
T + ' .sm-tabs{grid-column:1/-1}',
T + ' .sm-tab__t{font-size:clamp(30px,4.4vw,42px)}',
T + ' .sm-stg{grid-column:1/-1;margin-top:44px}',
T + ' .sm-band .sm-scrbox{aspect-ratio:16/9}',
T + ' .sm-glitch{grid-column:8/13;grid-row:2;margin:-110px 0 0}',
T + ' .sm-mo__p{grid-column:1/8;grid-row:2}',
T + ' .sm-reads__side{grid-column:1/-1;position:static}',
T + ' .sm-reads__list{grid-column:1/-1;margin-top:40px}',
T + ' .sm-way__t{font-size:clamp(70px,13.6vw,136px)}',
T + ' .sm-wl--2,' + T + ' .sm-wl--4{padding-left:6%}',
T + ' .sm-strip__img{aspect-ratio:16/9}',
T + ' .sm-fin__copy{grid-column:1/9}',
T + ' .sm-fin__fig{grid-column:9/13}',
T + ' .sm-fin__t{font-size:clamp(66px,10.4vw,108px)}',
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
T + ' .sm-wrap{width:calc(100% - 40px)}',
T + ' .sm-kicker{font-size:11.5px;gap:4px 16px}',
T + ' .sm-hero__title{font-size:clamp(90px,29vw,140px);line-height:.88}',
T + ' .sm-feed{position:relative;left:auto;right:auto;top:auto;width:54%;margin:-.62em 0 0 auto;font-size:clamp(90px,29vw,140px)}',
T + ' .sm-feed__cap{position:absolute;left:auto;right:calc(100% + 14px);top:auto;bottom:2px;width:min(34vw,15ch);font-size:12px;text-align:right}',
T + ' .sm-hero__foot{width:100%;margin-top:34px}',
T + ' .sm-hero__alt{font-size:clamp(48px,14.4vw,64px)}',
T + ' .sm-hero__p{font-size:17px}',
T + ' .sm-label{font-size:13px}',
T + ' .sm-h2{margin-top:20px;font-size:clamp(46px,12.8vw,62px)}',
T + ' .sm-story__a{font-size:clamp(34px,9.6vw,46px)}',
T + ' .sm-story__b{font-size:clamp(48px,13.6vw,66px)}',
T + ' .sm-story__scene{display:block;margin-top:40px}',
T + ' .sm-thread{display:none}',
T + ' .sm-sf--a{margin:0 -20px}',
T + ' .sm-sf--a .sm-sf__img{border-radius:0;aspect-ratio:4/3.2}',
T + ' .sm-sf--a .sm-cap{padding:0 20px}',
T + ' .sm-story__copy{display:block;margin-top:34px}',
T + ' .sm-cps{margin-top:26px}',
T + ' .sm-cp{grid-template-columns:1fr;row-gap:4px;padding:14px 0}',
T + ' .sm-sf--c{display:inline-block;vertical-align:top;width:56%;margin:46px 0 0}',
T + ' .sm-sf--b{display:inline-block;vertical-align:top;width:40%;margin:130px 0 0 4%}',
T + ' .sm-sf .sm-cap{font-size:12.5px}',
T + ' .sm-eng{display:block;margin-top:40px}',
T + ' .sm-tabs{flex-direction:row;gap:8px;margin:0 -20px;padding:0 20px 4px;border:0;overflow-x:auto;scroll-snap-type:x proximity;scrollbar-width:none}',
T + ' .sm-tabs::-webkit-scrollbar{display:none}',
T + ' .sm-tab{flex:none;grid-template-columns:auto auto;column-gap:10px;padding:12px 16px;border:1px solid var(--line);border-radius:24px;scroll-snap-align:start}',
T + ' .sm-tab__t{font-size:17px;letter-spacing:.02em;white-space:nowrap}',
T + ' .sm-tab[aria-selected="true"]{border-color:rgba(168,207,98,.6);background:rgba(168,207,98,.07)}',
T + ' .sm-tab[aria-selected="true"] .sm-tab__t{translate:none}',
T + ' .sm-tab__bar{display:none}',
T + ' .sm-stg{display:block;margin-top:22px}',
T + ' .sm-stg__media{aspect-ratio:4/4.4}',
T + ' .sm-stg__copy{margin-top:22px}',
T + ' .sm-stg__t{font-size:clamp(32px,9vw,40px)}',
T + ' .sm-morph{font-size:clamp(24px,7vw,30px);margin-top:34px}',
T + ' .sm-morph__slot{font-size:1.1em}',
T + ' .sm-mo__stage{display:block;margin-top:30px}',
T + ' .sm-band{margin:0 -20px}',
T + ' .sm-band .sm-screen{border-radius:0}',
T + ' .sm-band .sm-cap{padding:0 20px}',
T + ' .sm-glitch{width:50%;margin:-40px 0 0 auto}',
T + ' .sm-mo__p{margin-top:28px;font-size:16.5px}',
T + ' .sm-quote{font-size:clamp(19px,5.4vw,23px)}',
T + ' .sm-beats{flex-direction:column;align-items:flex-start;gap:30px;margin-top:44px}',
T + ' .sm-beat{width:100%;padding-bottom:22px;border-bottom:1px solid var(--line2)}',
T + ' .sm-beat--1 .sm-beat__w{font-size:clamp(58px,17.6vw,80px)}',
T + ' .sm-beat--3 .sm-beat__w{font-size:clamp(46px,14vw,64px)}',
T + ' .sm-beat--5 .sm-beat__w{font-size:clamp(52px,16vw,72px)}',
T + ' .sm-reads__sub{font-size:20px}',
T + ' .sm-read dt{font-size:clamp(25px,7vw,30px)}',
T + ' .sm-way__t{font-size:clamp(60px,18.4vw,92px);line-height:.92}',
T + ' .sm-wl--2,' + T + ' .sm-wl--4{padding-left:0}',
T + ' .sm-way__p{margin-left:0;font-size:17.5px}',
T + ' .sm-strip{margin:56px -20px 0}',
T + ' .sm-strip__img{aspect-ratio:4/3.4;border-radius:0}',
T + ' .sm-strip .sm-cap{padding:0 20px}',
T + ' .sm-fin{padding:86px 0 72px}',
T + ' .sm-fin__grid{display:block}',
T + ' .sm-fin__fig{display:none}',
T + ' .sm-fin__t{font-size:clamp(50px,14vw,70px);line-height:.98}',
T + ' .sm-fin__cta{flex-direction:column;gap:11px}',
T + ' .sm-btn{width:100%;height:56px;padding:0 7px 0 18px;font-size:12px}',
T + ' .sm-btn__ico{width:42px;height:42px}',
T + ' n1-header .n1h-bar.site-container{width:calc(100% - 40px)!important;height:64px!important}',
T + ' n1-header .n1h-logo img{width:30px!important;height:30px!important}',
T + ' .n1ft-inner{width:calc(100% - 40px)}',
T + ' .n1ft-top{grid-template-columns:1fr!important;gap:32px;padding:39px 0 36px}',
T + ' .n1ft-col--brand{grid-column:auto}',
T + ' .n1ft-brand{font-size:45px}',
'}',
'}',
'@media (max-width:360px){',
T + ' .sm-wrap,' + T + ' .n1ft-inner{width:calc(100% - 32px)}',
T + ' .sm-sf--a,' + T + ' .sm-band,' + T + ' .sm-strip{margin-left:-16px;margin-right:-16px}',
T + ' .sm-tabs{margin:0 -16px;padding:0 16px 4px}',
T + ' n1-header .n1h-bar.site-container{width:calc(100% - 32px)!important}',
'}',
'@media (prefers-reduced-motion:reduce){',
T + ' .sm *,' + T + ' .sm *::before,' + T + ' .sm *::after{transition-duration:.01ms!important;transition-delay:0s!important}',
'}'
  ].join('\n');

  /* ---------- Bileşen ---------- */
  class SosyalMedyaV26 extends HTMLElement {
    connectedCallback() {
      if (this._on) return;
      this._on = true;
      this._cleanups = [];
      var base = this.getAttribute('deps-base');
      this._url = function (k) { return (base ? base.replace(/\/?$/, '/') + 'gh@' : CDN) + PATHS[k]; };
      this.classList.add('n1-inner-page');
      this._mount().catch((e) => {
        console.error('[' + TAG + ']', e);
        if (!this.querySelector('main.sm')) this.innerHTML = '<p style="padding:40px 5%;color:#ECEBE5;font:16px Barlow,Arial,sans-serif">Sosyal Medya yüklenemedi. Lütfen sayfayı yenileyin.</p>';
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
      this._thread();
      this._engine();
      this._strategyVideo();
      this._morph();
      this._way();

      var fonts = loadCss(FONTS).catch(function (e) { console.warn('[' + TAG + '] Font yüklenemedi, yedek font kullanılıyor', e); });
      await Promise.all([loadCss(url('footerCss')), loadCss(url('responsive')), loadJs(url('markup'), function () { return !!window.N1_SITE_MARKUP; })]);
      if (!this._on) return;

      var tpl = document.createElement('template');
      tpl.innerHTML = String(window.N1_SITE_MARKUP || '').split('{{ASSETS}}').join(url('assets'));
      var hdr = tpl.content.querySelector('n1-header'), ft = tpl.content.querySelector('[data-n1-footer]'), fc = tpl.content.querySelector('n1-floating-controls');
      if (!hdr || !ft) throw new Error('Onaylı Header/Footer işaretlemesi bulunamadı');
      var main = this.querySelector('main.sm');

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

      var otherFc = [].some.call(document.querySelectorAll('n1-floating-controls'), function (f) { return !self.contains(f); }) || !!document.querySelector('.n1fc:not([data-n1-sm])');
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
        if (this._header.panel) { this._header.panel.classList.add('n1-inner-panel'); this._header.panel.setAttribute('data-n1-sm', ''); }
      }
      if (this._footerOwned) await loadJs(url('footerJs'), null, true);
      if (this._fcOwned && !customElements.get('n1-floating-controls')) await loadJs(url('floating'), function () { return !!customElements.get('n1-floating-controls'); });
      var layer = document.querySelector('body > .n1fc:last-of-type'); if (this._fcOwned && layer) layer.setAttribute('data-n1-sm', '');
      if (!this._on) return;
      this._animate();
    }


    _anchors() {
      var a = this.querySelector('.sm-scroll'), self = this;
      this._ev(a, 'click', function (e) {
        e.preventDefault();
        var t = self.querySelector('#sm-hikaye'); if (!t) return;
        scrollTo({ top: t.getBoundingClientRect().top + scrollY - 40, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      });
    }

    /* ---------- Video: iki film, aynı anda tek oynatıcı ---------- */
    _videos() {
      var self = this, reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      var c = navigator.connection || {}, autoOK = !reduced && !c.saveData;
      var VIDS = [];
      var make = function (fig, set) {
        var scr = fig.querySelector('.sm-screen'), v = scr.querySelector('video'), btn = fig.querySelector('.sm-play'), err = scr.querySelector('.sm-screen__err'), prog = scr.querySelector('.sm-screen__prog i');
        var P = { fig: fig, scr: scr, v: v, src: pickVideo(set), visible: false, userPaused: false, loaded: false, failed: false, auto: autoOK };
        P.load = function (mode) { if (P.loaded) return; P.loaded = true; v.preload = mode || 'auto'; v.src = P.src; };
        P.play = function () {
          if (P.failed) return;
          P.load();
          VIDS.forEach(function (o) { if (o !== P && !o.v.paused) o.v.pause(); });
          var pr = v.play(); if (pr && pr.catch) pr.catch(function () { P.sync(); });
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
          err.textContent = 'Video şu anda yüklenemedi; filmin bir karesi gösteriliyor.';
        });
        self._ev(scr.querySelector('.sm-poster'), 'error', function (e) { e.target.remove(); });
        self._ev(btn, 'click', function () { if (v.paused) { P.userPaused = false; P.play(); } else { P.userPaused = true; v.pause(); } });
        P.sync();
        VIDS.push(P);
        return P;
      };
      var hero = make(this.querySelector('[data-sm="hero"]'), vexact(V_HERO, '720p'));
      var motion = make(this.querySelector('[data-sm="motion"]'), vexact(V_MOTION, '1080p'));
      var finalVideo = make(this.querySelector('[data-sm="final"]'), vexact(V_FINAL, '1080p'));
      this._vids = VIDS;
      var io = new IntersectionObserver(function (en) {
        en.forEach(function (e) {
          var P = VIDS.filter(function (o) { return o.fig === e.target; })[0]; if (!P) return;
          P.visible = e.intersectionRatio >= .3;
          if (P.visible && P.auto && !P.userPaused && !document.hidden) P.play();
          else if (!P.visible && !P.v.paused) P.v.pause();
        });
      }, { threshold: [0, .3, .6] });
      VIDS.forEach(function (P) { io.observe(P.fig); });
      // İkinci film bölüme yaklaşılmadan indirilmez
      var near = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { motion.load(autoOK ? 'auto' : 'metadata'); near.disconnect(); } }, { rootMargin: '500px 0px' });
      near.observe(motion.fig);
      // Final video görsel alanının yakınına gelene kadar yüklenmez.
      var nearFinal = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) { finalVideo.load('metadata'); nearFinal.disconnect(); }
      }, { rootMargin: '450px 0px' });
      nearFinal.observe(finalVideo.fig);
      var onVis = function () { VIDS.forEach(function (P) { if (document.hidden) P.v.pause(); else if (P.visible && P.auto && !P.userPaused) P.play(); }); };
      document.addEventListener('visibilitychange', onVis);
      if (!autoOK) hero.load('metadata');
      this._cleanups.push(function () {
        io.disconnect(); near.disconnect(); nearFinal.disconnect(); document.removeEventListener('visibilitychange', onVis);
        VIDS.forEach(function (P) { try { P.v.pause(); P.v.removeAttribute('src'); P.v.load(); } catch (e) {} });
      });
    }

    /* ---------- Hikâye: kareleri birbirine bağlayan ip (ölçüye göre çizilir) ---------- */
    _thread() {
      var self = this, scene = this.querySelector('.sm-story__scene'), svg = scene.querySelector('.sm-thread'), path = svg.querySelector('path');
      var a = scene.querySelector('.sm-sf--a .sm-sf__img'), b = scene.querySelector('.sm-sf--b .sm-sf__img'), c = scene.querySelector('.sm-sf--c .sm-sf__img');
      var draw = function () {
        if (getComputedStyle(svg).display === 'none') return;
        var S = scene.getBoundingClientRect(), A = a.getBoundingClientRect(), B = b.getBoundingClientRect(), C = c.getBoundingClientRect();
        var p = function (x, y) { return (x - S.left).toFixed(1) + ' ' + (y - S.top).toFixed(1); };
        var ax = A.left + A.width * .3, ay = A.bottom, cx = C.left + C.width * .5, cy = C.top, cr = C.right, cm = C.top + C.height * .62, bx = B.left, bm = B.top + B.height * .4;
        path.setAttribute('d', 'M' + p(ax, ay) + ' C' + p(ax, ay + (cy - ay) * .6) + ' ' + p(cx, cy - (cy - ay) * .5) + ' ' + p(cx, cy) +
          ' M' + p(cr, cm) + ' C' + p(cr + (bx - cr) * .6, cm) + ' ' + p(bx - (bx - cr) * .5, bm) + ' ' + p(bx, bm));
        self._threadLen = path.getTotalLength();
      };
      this._drawThread = draw;
      draw();
      [a, b, c].forEach(function (im) { if (!im.complete) self._ev(im, 'load', draw); });
      if ('ResizeObserver' in window) { var ro = new ResizeObserver(function () { draw(); }); ro.observe(scene); this._cleanups.push(function () { ro.disconnect(); }); }
    }

    /* ---------- Strateji: sekmeler (dokunma, klavye, fare; GSAP'siz de çalışır) ---------- */
    _engine() {
      var self = this, tabs = [].slice.call(this.querySelectorAll('.sm-tab')), panel = this.querySelector('.sm-stg');
      var imgs = [].slice.call(panel.querySelectorAll('.sm-stg__img')), n = panel.querySelector('.sm-stg__n b'), t = panel.querySelector('.sm-stg__t'), d = panel.querySelector('.sm-stg__d'), qq = panel.querySelector('.sm-stg__q');
      var E = { i: 0, anim: null };
      E.set = function (i, focus) {
        i = (i + STAGES.length) % STAGES.length; if (i === E.i) { if (focus) tabs[i].focus(); return; }
        var prev = E.i; E.i = i;
        tabs.forEach(function (b, k) { b.setAttribute('aria-selected', String(k === i)); b.tabIndex = k === i ? 0 : -1; });
        panel.setAttribute('aria-labelledby', 'sm-tab-' + i);
        if (focus) tabs[i].focus();
        var s = STAGES[i];
        n.textContent = '0' + (i + 1);
        t.innerHTML = ln(up(s.t)); d.textContent = s.d; qq.textContent = s.q;
        imgs.forEach(function (im, k) { im.classList.toggle('is-on', k === i); im.classList.toggle('is-prev', k === prev); if (k === i && im.tagName === 'IMG') im.loading = 'eager'; });
        if (E.anim) E.anim(i, prev); else imgs[prev].classList.remove('is-prev');
        if (self._strategyVid) self._strategyVid.onStage(i);
        var list = tabs[0].parentNode;
        if (getComputedStyle(list).overflowX === 'auto') list.scrollTo({ left: tabs[i].offsetLeft - 20, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      };
      tabs.forEach(function (b, k) {
        self._ev(b, 'click', function () { E.set(k); });
        self._ev(b, 'keydown', function (e) {
          var m = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
          if (m) { e.preventDefault(); E.set(E.i + m, true); }
          else if (e.key === 'Home') { e.preventDefault(); E.set(0, true); }
          else if (e.key === 'End') { e.preventDefault(); E.set(STAGES.length - 1, true); }
        });
      });
      this._ev(panel.querySelector('.sm-arw--prev'), 'click', function () { E.set(E.i - 1); });
      this._ev(panel.querySelector('.sm-arw--next'), 'click', function () { E.set(E.i + 1); });
      // Dokunmatik: görsel üzerinde yatay kaydırma aşama değiştirir
      var x0 = null, media = panel.querySelector('.sm-stg__media');
      this._ev(media, 'touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
      this._ev(media, 'touchend', function (e) { if (x0 == null) return; var dx = e.changedTouches[0].clientX - x0; x0 = null; if (Math.abs(dx) > 50) E.set(E.i + (dx < 0 ? 1 : -1)); }, { passive: true });
      this._eng = E;
    }

    /* ---------- Strateji ilk aşaması: görünürken 480p oynatma; sekme değişince durdur ---------- */
    _strategyVideo() {
      var self = this, media = this.querySelector('.sm-stg__media'), v = media.querySelector('.sm-stg__video'),
          btn = media.querySelector('.sm-stg__vbtn'), err = media.querySelector('.sm-stg__video-error');
      var conn = navigator.connection || {}, reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      var state = { selected: true, visible: false, auto: !conn.saveData && !reduced, pausedByUser: false, loaded: false, failed: false };
      function load() { if (state.loaded) return; state.loaded = true; v.src = V_STRATEGY; v.preload = 'metadata'; v.load(); }
      function sync() {
        var playing = !v.paused && !v.ended;
        btn.classList.toggle('is-playing', playing);
        btn.setAttribute('aria-pressed', String(playing));
        btn.setAttribute('aria-label', playing ? 'Strateji videosunu duraklat' : 'Strateji videosunu oynat');
      }
      function pause() { if (!v.paused) v.pause(); sync(); }
      function play(userAction) {
        if (state.failed || !state.selected || (!userAction && (!state.visible || document.hidden))) return;
        load();
        (self._vids || []).forEach(function (p) { if (!p.v.paused) p.v.pause(); });
        var promise = v.play();
        if (promise && promise.catch) promise.catch(sync);
      }
      state.onStage = function (i) {
        state.selected = i === 0;
        btn.classList.toggle('is-active', state.selected);
        btn.tabIndex = state.selected ? 0 : -1;
        if (!state.selected) pause();
        else if (state.visible && state.auto && !state.pausedByUser) play(false);
      };
      this._ev(btn, 'click', function () {
        if (!v.paused) { state.pausedByUser = true; pause(); }
        else { state.pausedByUser = false; play(true); }
      });
      this._ev(v, 'playing', function () { v.classList.add('is-started'); sync(); });
      this._ev(v, 'pause', sync);
      this._ev(v, 'ended', sync);
      this._ev(v, 'error', function () {
        state.failed = true; v.classList.remove('is-started'); pause(); btn.disabled = true;
        err.textContent = 'Video şu anda oynatılamıyor.';
      });
      var io = new IntersectionObserver(function (entries) {
        state.visible = entries[0].intersectionRatio >= .25;
        if (!state.visible) pause();
        else if (state.selected && state.auto && !state.pausedByUser) play(false);
      }, { threshold: [0, .25, .6] });
      io.observe(media);
      var onVisibility = function () {
        if (document.hidden) pause();
        else if (state.selected && state.visible && state.auto && !state.pausedByUser) play(false);
      };
      document.addEventListener('visibilitychange', onVisibility);
      this._cleanups.push(function () {
        io.disconnect(); document.removeEventListener('visibilitychange', onVisibility);
        pause(); v.removeAttribute('src'); try { v.load(); } catch (e) {}
      });
      this._strategyVid = state;
      sync();
    }

    /* ---------- Hareket: bir fikir, beş anlatım (kaydırmaya bağlı; GSAP'siz de çalışır) ---------- */
    _morph() {
      var self = this, ws = [].slice.call(this.querySelectorAll('.sm-morph__w')), sec = this.querySelector('.sm-motion'), k = 0;
      var set = function (i) {
        if (i === k) return;
        ws.forEach(function (w, j) { w.classList.toggle('is-on', j === i); w.classList.toggle('is-out', j === k && j !== i); });
        k = i;
      };
      var still = matchMedia('(prefers-reduced-motion: reduce)').matches;
      var onScroll = function () {
        var r = sec.getBoundingClientRect(), h = innerHeight;
        var p = Math.min(1, Math.max(0, (h * .8 - r.top) / (r.height * .85)));
        set(Math.min(ws.length - 1, Math.floor(p * ws.length)));
      };
      var on = false, raf = 0;
      var tick = function () { raf = 0; onScroll(); };
      var listen = function () { if (!raf) raf = requestAnimationFrame(tick); };
      // Yalnızca bölüm görünürken kaydırma dinlenir
      var io = new IntersectionObserver(function (en) {
        var vis = en[0].isIntersecting;
        if (vis && !on) { addEventListener('scroll', listen, { passive: true }); on = true; onScroll(); }
        else if (!vis && on) { removeEventListener('scroll', listen); on = false; }
      });
      io.observe(sec);
      if (still) ws.forEach(function (w) { w.style.transition = 'none'; });
      this._cleanups.push(function () { io.disconnect(); removeEventListener('scroll', listen); if (raf) cancelAnimationFrame(raf); });
    }

    /* ---------- Yaklaşım: "bakışı" sözcüğü görselle dolar (destek varsa) ---------- */
    _way() {
      var a = this.querySelector('.sm-akisi');
      var W3 = window.CSS;   // yerel CSS dizisiyle karışmasın
      if (W3 && W3.supports && (W3.supports('background-clip', 'text') || W3.supports('-webkit-background-clip', 'text'))) {
        a.style.backgroundImage = 'url("' + img(IM.fabric, 1200) + '")';
        a.classList.add('is-fill');
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

        /* 01 Hero: akış sütunu ince bir çizgiden açılır ve içinde film yukarı "kayar"; başlık harfleri akış gibi aşağıdan yukarı akar */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          var box = one('.sm-feed .sm-scrbox'), media = q('.sm-feed .sm-poster, .sm-feed .sm-video');
          var tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
          tl.from(q('.sm-kicker span'), { autoAlpha: 0, y: 10, duration: .8, stagger: .08 }, .1)
            .fromTo(box, { clipPath: 'inset(0% 49.6% 0% 49.6% round 4px)' }, { clipPath: 'inset(0% 0% 0% 0% round 4px)', duration: 1.4, ease: 'expo.inOut' }, .25)
            .from(media, { yPercent: 18, scale: 1.12, duration: 1.8 }, .45)
            .from(q('.sm-hero__title .sm-tl:first-child .sm-ch'), { yPercent: 105, autoAlpha: 0, duration: 1, ease: 'power4.out', stagger: .05 }, .35)
            .from(q('.sm-hero__title .sm-tl:last-child .sm-ch'), { yPercent: 105, autoAlpha: 0, duration: 1, ease: 'power4.out', stagger: .05 }, .55)
            .from(q('.sm-hero__alt .sm-ln>span'), { yPercent: 110, duration: 1, ease: 'power4.out', stagger: .1 }, 1.05)
            .from(q('.sm-hero__p, .sm-scroll, .sm-feed__cap, .sm-feed .sm-play'), { autoAlpha: 0, y: 12, duration: .9, stagger: .08 }, 1.3);
          if (STg && matchMedia('(min-width:768px)').matches) {
            // Kaydırınca sütun başlıktan daha yavaş akar; başlık ve sütun birbirinin üstünden geçmeye devam eder
            gsap.to(one('.sm-feed'), { yPercent: -16, ease: 'none', scrollTrigger: { trigger: one('.sm-hero'), start: 'top top', end: 'bottom top', scrub: .6 } });
            gsap.to(one('.sm-hero__title'), { yPercent: 10, ease: 'none', scrollTrigger: { trigger: one('.sm-hero'), start: 'top top', end: 'bottom top', scrub: .6 } });
          }
          return function () { gsap.set(box, { clearProps: 'clipPath' }); };
        });

        if (!STg) return;

        /* Bölüm başlıkları: maskeden yükselen satırlar (bir kez) */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          q('.sm-sec .sm-h2, .sm-story__h, .sm-fin__t').forEach(function (h) {
            gsap.from(q('.sm-ln>span', h), { yPercent: 112, duration: 1.15, ease: 'power4.out', stagger: .09, scrollTrigger: { trigger: h, start: 'top 86%', once: true } });
          });
          q('.sm-sec .sm-label, .sm-fin .sm-label').forEach(function (l) {
            gsap.from(l, { autoAlpha: 0, x: -14, duration: .8, ease: 'expo.out', scrollTrigger: { trigger: l, start: 'top 90%', once: true } });
          });
          q('.sm-lede').forEach(function (l) { gsap.from(l, { autoAlpha: 0, y: 16, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: l, start: 'top 92%', once: true } }); });
        });

        /* 02 Hikâye: ip kaydırdıkça çizilir; kareler ipin geldiği yönden açılır; bölümler sırayla yazılır */
        mm.add({ m: '(prefers-reduced-motion: no-preference) and (max-width: 1024px)', d: '(prefers-reduced-motion: no-preference) and (min-width: 1025px)' }, function (ctx) {
          var scene = one('.sm-story__scene'), path = one('.sm-thread__p');
          if (ctx.conditions.d) {
            var len = function () { return self._threadLen || path.getTotalLength() || 1; };
            gsap.fromTo(path, { strokeDasharray: function () { return len(); }, strokeDashoffset: function () { return len(); } },
              { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: scene, start: 'top 60%', end: 'bottom 70%', scrub: .6, invalidateOnRefresh: true } });
          }
          var dirs = { a: 'inset(0% 0% 100% 0%)', c: 'inset(0% 0% 100% 0%)', b: 'inset(0% 100% 0% 0%)' };
          ['a', 'c', 'b'].forEach(function (k) {
            var f = one('.sm-sf--' + k), im = f.querySelector('.sm-sf__img');
            gsap.fromTo(im, { clipPath: dirs[k] }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut', scrollTrigger: { trigger: f, start: 'top 82%', once: true } });
            gsap.from(im, { scale: 1.16, duration: 1.8, ease: 'expo.out', scrollTrigger: { trigger: f, start: 'top 82%', once: true } });
            if (ctx.conditions.d && k !== 'a') gsap.fromTo(f, { y: k === 'b' ? 70 : 30 }, { y: k === 'b' ? -50 : -20, ease: 'none', scrollTrigger: { trigger: scene, start: 'top bottom', end: 'bottom top', scrub: true } });
          });
          gsap.from(one('.sm-story__p'), { autoAlpha: 0, y: 18, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: one('.sm-story__copy'), start: 'top 88%', once: true } });
          gsap.from(q('.sm-cp'), { autoAlpha: 0, x: -16, duration: .8, ease: 'expo.out', stagger: .08, scrollTrigger: { trigger: one('.sm-cps'), start: 'top 88%', once: true } });
          return function () { gsap.set(path, { clearProps: 'all' }); };
        });

        /* 03 Strateji: sekmeler sırayla dizilir; aşama değişince görsel silinerek, başlık maskeden değişir */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          gsap.from(q('.sm-tab'), { autoAlpha: 0, x: -24, duration: .9, ease: 'expo.out', stagger: .07, scrollTrigger: { trigger: one('.sm-tabs'), start: 'top 86%', once: true } });
          gsap.fromTo(one('.sm-stg__media'), { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut', scrollTrigger: { trigger: one('.sm-stg'), start: 'top 82%', once: true } });
          gsap.from(q('.sm-stg__copy > *'), { autoAlpha: 0, y: 16, duration: .9, ease: 'expo.out', stagger: .07, scrollTrigger: { trigger: one('.sm-stg'), start: 'top 80%', once: true } });
          var E = self._eng, imgs = q('.sm-stg__img');
          E.anim = function (i, prev) {
            var inc = imgs[i], out = imgs[prev], dir = i > prev ? 1 : -1;
            gsap.killTweensOf([inc, out]);
            gsap.fromTo(inc, { clipPath: dir > 0 ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)', scale: 1.08 }, { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: .95, ease: 'expo.inOut', onComplete: function () { out.classList.remove('is-prev'); gsap.set(inc, { clearProps: 'clipPath' }); } });
            gsap.fromTo(out, { xPercent: 0 }, { xPercent: -12 * dir, duration: .95, ease: 'expo.inOut', onComplete: function () { gsap.set(out, { clearProps: 'transform' }); } });
            gsap.from(q('.sm-stg__t .sm-ln>span'), { yPercent: 110, duration: .8, ease: 'power4.out' });
            gsap.from(q('.sm-stg__d, .sm-stg__q'), { autoAlpha: 0, y: 10, duration: .7, ease: 'expo.out', stagger: .06 });
          };
          return function () { E.anim = null; q('.sm-stg__img').forEach(function (im) { im.classList.remove('is-prev'); }); };
        });

        /* 04 Hareket: film şeridi ortadan iki yana açılır; bozulmuş portre ters yönde kayar */
        mm.add({ m: '(prefers-reduced-motion: no-preference) and (max-width: 767px)', d: '(prefers-reduced-motion: no-preference) and (min-width: 768px)' }, function (ctx) {
          var box = one('.sm-band .sm-scrbox');
          gsap.fromTo(box, { clipPath: 'inset(46% 0% 46% 0% round 4px)' }, { clipPath: 'inset(0% 0% 0% 0% round 4px)', ease: 'power2.out', scrollTrigger: { trigger: one('.sm-band'), start: 'top 88%', end: ctx.conditions.m ? 'top 45%' : 'top 40%', scrub: .6 } });
          gsap.from(one('.sm-morph'), { autoAlpha: 0, y: 20, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: one('.sm-morph'), start: 'top 88%', once: true } });
          var g = one('.sm-glitch');
          gsap.fromTo(g.querySelector('img'), { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'expo.inOut', scrollTrigger: { trigger: g, start: 'top 90%', once: true } });
          if (ctx.conditions.d) gsap.fromTo(g, { y: 80 }, { y: -60, ease: 'none', scrollTrigger: { trigger: one('.sm-mo__stage'), start: 'top bottom', end: 'bottom top', scrub: true } });
          gsap.from(one('.sm-mo__p'), { autoAlpha: 0, y: 18, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: one('.sm-mo__p'), start: 'top 92%', once: true } });
          return function () { gsap.set(box, { clearProps: 'clipPath' }); };
        });

        /* 05 Ritim: yedi anlatım vuruş vuruş gelir; her sözcük kendi hareketiyle */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          gsap.from(one('.sm-quote'), { autoAlpha: 0, y: 20, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: one('.sm-quote'), start: 'top 88%', once: true } });
          var beats = q('.sm-beat'), from = [
            { yPercent: 60, autoAlpha: 0 }, { x: -30, autoAlpha: 0 }, { scale: .8, autoAlpha: 0, transformOrigin: '0% 100%' }, { letterSpacing: '1.2em', autoAlpha: 0 },
            { yPercent: -60, autoAlpha: 0 }, { x: 30, autoAlpha: 0 }, { scaleX: 0, transformOrigin: '0% 50%' }
          ];
          var tl = gsap.timeline({ scrollTrigger: { trigger: one('.sm-beats'), start: 'top 82%', once: true } });
          beats.forEach(function (b, i) {
            var at = i * .14;
            tl.from(b.querySelector('.sm-beat__w'), Object.assign({ duration: .9, ease: i % 2 ? 'expo.out' : 'back.out(1.6)' }, from[i]), at)
              .from([b.querySelector('.sm-beat__k'), b.querySelector('.sm-beat__d')], { autoAlpha: 0, y: 8, duration: .6, ease: 'expo.out', stagger: .05 }, at + .25);
          });
        });

        /* 06 Rakamların ötesinde: sakin; çizgiler soldan çizilir, satırlar yavaşça belirir */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          gsap.from(q('.sm-reads__sub, .sm-reads__p'), { autoAlpha: 0, y: 16, duration: 1.2, ease: 'expo.out', stagger: .12, scrollTrigger: { trigger: one('.sm-reads__side'), start: 'top 80%', once: true } });
          q('.sm-read').forEach(function (r) {
            var tl = gsap.timeline({ scrollTrigger: { trigger: r, start: 'top 88%', once: true } });
            tl.fromTo(r, { '--sm-line': 0 }, { '--sm-line': 1, duration: 1.3, ease: 'expo.out' }, 0)
              .from(r.querySelector('dt'), { autoAlpha: 0, y: 14, duration: 1.2, ease: 'expo.out' }, 0)
              .from(r.querySelector('dd'), { autoAlpha: 0, duration: 1.4, ease: 'power2.out' }, .2);
          });
        });

        /* 07 Yaklaşım: "AKIŞI"na bir "B" eklenir ve "BAKIŞI" olur; ardından kare sinematik bir şeride açılır */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          var t = one('.sm-way__t'), b = one('.sm-b'), ak = one('.sm-akisi');
          gsap.from(q('.sm-wl--1 .sm-ln>span, .sm-wl--2 .sm-ln>span'), { yPercent: 112, duration: 1.15, ease: 'power4.out', stagger: .12, scrollTrigger: { trigger: t, start: 'top 80%', once: true } });
          var tl = gsap.timeline({ scrollTrigger: { trigger: one('.sm-wl--3'), start: 'top 82%', end: 'top 42%', scrub: .7, invalidateOnRefresh: true } });
          tl.fromTo(b, { width: 0 }, { width: function () { return b.scrollWidth; }, ease: 'power3.inOut', duration: 1 }, 0)
            .from(b.querySelector('span'), { yPercent: -110, ease: 'power3.out', duration: .8 }, .15)
            .fromTo(ak, { backgroundPosition: '50% 0%' }, { backgroundPosition: '50% 60%', ease: 'none', duration: 1 }, 0);
          gsap.from(q('.sm-wl--4 .sm-ln>span'), { yPercent: 112, duration: 1.15, ease: 'power4.out', scrollTrigger: { trigger: one('.sm-wl--4'), start: 'top 86%', once: true } });
          gsap.from(one('.sm-way__p'), { autoAlpha: 0, y: 18, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: one('.sm-way__p'), start: 'top 90%', once: true } });
          var strip = one('.sm-strip__img');
          gsap.timeline({ scrollTrigger: { trigger: one('.sm-strip'), start: 'top 92%', end: 'top 30%', scrub: .7 } })
            .fromTo(strip, { clipPath: 'inset(0% 44% 0% 44% round 3px)', scale: 1.18 }, { clipPath: 'inset(0% 0% 0% 0% round 3px)', scale: 1, ease: 'power2.inOut' });
          return function () { gsap.set([b, strip, ak], { clearProps: 'all' }); };
        });

        /* 08 Final: satırlar sırayla, kare aşağıdan açılır */
        mm.add('(prefers-reduced-motion: no-preference)', function () {
          var fig = one('.sm-fin__fig .sm-scrbox');
          gsap.fromTo(fig, { clipPath: 'inset(100% 0% 0% 0% round 4px)' }, { clipPath: 'inset(0% 0% 0% 0% round 4px)', duration: 1.6, ease: 'expo.inOut', scrollTrigger: { trigger: one('.sm-fin'), start: 'top 70%', once: true } });
          gsap.from(q('.sm-fin__sub, .sm-fin__cta'), { autoAlpha: 0, y: 20, duration: .9, ease: 'expo.out', stagger: .1, scrollTrigger: { trigger: one('.sm-fin__sub'), start: 'top 94%', once: true } });
          return function () { gsap.set(fig, { clearProps: 'clipPath' }); };
        });
      }, this);

      if (STg) {
        var last = 0, t = 0;
        var refresh = function () { if (!self._on) return; if (self._drawThread) self._drawThread(); STg.refresh(); last = Math.round(self.getBoundingClientRect().height); };
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
      this._fcOwned = false; this._footerOwned = false; this._header = null; this._vids = null; this._eng = null; this._strategyVid = null; this._drawThread = null;
      this.replaceChildren();
      var st = document.getElementById(STYLE_ID); if (st && !document.querySelector(TAG)) st.remove();
    }
  }
  customElements.define(TAG, SosyalMedyaV26);
})();

