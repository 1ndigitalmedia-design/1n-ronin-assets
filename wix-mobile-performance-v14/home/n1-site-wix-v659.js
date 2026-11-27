/* MOBILE PERFORMANCE V1.4 — n1-site-wix-v659.js = v658 + (1) video denetleyicisi n1-video-m5-v14 (pagehide/BFCache'te kaynak bırakma) + (2) site işaretlemesi v14 (Hikâyemizin Devamı → /kisaca-biz). Ronin 2× politikası, tasarım ve diğer her şey aynı. Tag name: n1-site-v1. */
/* GLOBAL STABILITY V1.3 — n1-site-wix-v658.js: v6.57 ile aynı; TEK fark: mobil video denetleyicisi n1-video-m5-v13.js (bağlantı dokunuşunda engellenmiş filmleri başlatmaz). Önceki not → GLOBAL MENU V1.2 — n1-site-wix-v657.js: v6.56 ile aynı; farklar: Header/markup v12 (Hizmetler alt menü), özel çapa navigasyonu (n1-nav-v1.js) yüklenmez, v6.56 mobil dosyaları sabit adresten okunur. Etiket aynı: n1-site-v1. */
/*!
 * n1-site-wix-v656 — 1N Digital Media ana sayfası · Wix Studio Custom Element · MOBILE & TABLET LIFECYCLE FIX (v6.56)
 * Temel: n1-site-wix-v652.js (V1.4 Final, GitHub @ 167d1165). MASAÜSTÜ yolu (profil "d") v6.52/v6.51/v6.50/v6.49 ile aynıdır:
 * aynı modüller, aynı sabit commit adresleri, aynı Ronin Bd/Bx paketleri, aynı video kaynakları, aynı sıra.
 *
 * Wix Studio → Custom Element   Tag name: n1-site-v1   Kaynak: bu dosyanın HTTPS adresi (jsDelivr, commit'e sabit)
 *
 * Cihaz profili V1.4 ile aynı (d masaüstü · t tablet · m telefon; yalnız dokunmatik yatay telefon/tablet m/t; fare ya da izleme
 * dörtgeni olan her cihaz d). d ↔ m/t geçişinde bileşen bir kez yeniden kurulur; m ↔ t yalnızca öznitelik değiştirir.
 *
 * V1.5 mobil/tablet kaynakları (yalnızca m/t profilinde istenir; aynı commit'teki bu klasörden):
 *   modules/n1-m5-build.js   işaretleme (V1.4 + Hizmetler mini filmi)        site/n1-home-m5.css   tasarım katmanı
 *   modules/n1-home-m5.js    hareket katmanı (GSAP/ScrollTrigger)            modules/n1-video-m5.js hero + M2/M1 + mini film
 *   media/ronin-m5-film.mp4, media/ronin-m5-film-2x.mp4, media/ronin-m5-poster.webp   Ronin (yan kenar karartması kaldırıldı)
 * Header: onaylı v6.48 Header + iç sayfa kuralları (V1.3/V1.4 ile aynı).
 */
(function () {
  'use strict';
  var TAG = 'n1-site-v1';
  if (customElements.get(TAG)) return;

  var SELF_SRC = (document.currentScript && document.currentScript.src) ||
    (function () { var s = [].slice.call(document.scripts).filter(function (x) { return /n1-site-wix-v659\.js(\?|$)/.test(x.src); }); return s.length ? s[s.length - 1].src : ''; })();

  /* ---------- Bağımlılık sırası (v6.47 index.html'den derlendi) ---------- */
  var ORDER = {
    "fonts": "https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@500;600;700&family=Montserrat:wght@700&display=swap",
    "gsap": [
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/SplitText.min.js"
    ],
    "css": [
      "n1-partners-v617.css",
      "n1-samurai-video-v632.css",
      "n1-stats-v632.css",
      "n1-video-band-v633.css",
      "n1-contact-cta-v634.css",
      "n1-about-v635.css",
      "n1-footer-v636.css",
      "n1-ecosystem-v647.css",
      "n1-gads-v643.css",
      "n1-brands-v625.css",
      "n1-showreel-v628.css",
      "n1-sectors-v630.css"
    ],
    "js": [
      "ronin-hero-v67.js",
      "n1-header-v613.js",
      "ronin-type-v613.js",
      "n1-links-v646.js",
      "n1-service-links-v644.js",
      "js/gsap-vault-mit-v629.js",
      "n1-partners-v617.js",
      "n1-samurai-video-v621.js",
      "n1-stats-v632.js",
      "n1-contact-cta-v644.js",
      "n1-about-v644.js",
      "n1-footer-v646.js",
      "n1-ecosystem-v647-wix.js",
      "n1-gads-v643.js",
      "n1-brands-v625.js",
      "n1-showreel-v628.js",
      "n1-sectors-v630.js",
      "js/onizleme.js",
      "n1-floating-controls-v632.js"
    ]
  };

  /* ---------- Ronin medya manifestosu (Aşama 03 ile aynı dosyalar; adres = ronin-base + ad) ---------- */
  var RONIN = {
    Bx: { packs: ['ronin-Bx-v67-a0.bin', 'ronin-Bx-v67-a.bin', 'ronin-Bx-v67-b.bin'], poster: 'ronin-v67-poster-Bx.webp' },
    Bd: { packs: ['ronin-Bd-v67-a0.bin', 'ronin-Bd-v67-a.bin', 'ronin-Bd-v67-b.bin'], poster: 'ronin-v67-poster-Bd.webp' },
    m:  { packs: ['ronin-m-v63-a0.bin', 'ronin-m-v63-a.bin', 'ronin-m-v63-b.bin'],   poster: 'ronin-v6-poster-m.webp' }
  };

  function dirOf(u) { return u ? u.replace(/[?#].*$/, '').replace(/[^/]*$/, '') : ''; }
  /* Merkezi çapa navigasyonu: DEĞİŞMEDİ (v1.0.1, main b35d9875). Wix global Custom Code aynı adresi yüklüyorsa tarayıcı
     dosyayı bir kez indirir; modül window.__n1Nav korumasıyla tek örnek çalışır (olaylar iki kez bağlanmaz). */
  var VIDEO_M5_V13 = "https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@fbc905e6b07721d26a78eb84df56a076693ad7e2/wix-mobile-performance-v14/home/n1-video-m5-v14.js";   /* V1.3: gesture düzeltmeli video denetleyicisi (PROBLEM 02) */
  var NAV_SRC = "";   /* GLOBAL MENU V1.2: özel çapa navigasyonu (n1-nav-v1.js) artık YÜKLENMEZ; Hizmetler menüsü standart bağlantılı alt menü */
  /* Bu sürümün kendi dosyaları (mobil/tablet): bu dosyanın klasöründen, yani AYNI commit'ten yüklenir. */
  var HOME_SELF = "https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f97db8edb37f1e1388f276d840e262fc8452b80a/wix-home-v656/";   /* V1.2: mobil/tablet modül ve medya dosyaları canlı v6.56 klasöründen (kopyalanmadı) */
  /* Onaylı v6.49 kaynak commit'i: değişmeyen mobil dosyalar buradan okunur (yeniden kopyalanmadı). */
  var V649 = "https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@8dfa9c22c3acb9aabbfd8e96c06d14c9570342f6/wix-home-v649/";
  /* V1.3: onaylı V1.2 kaynak commit'i (homepage-v650-v12, 0b2c64d1). DEĞİŞMEYEN mobil dosyalar (Ronin motoru ronin-hero-mv2,
     sahne yazısı ronin-type-mobile-v2, g/gl kare paketleri ve posterleri) buradan okunur; v651 klasörüne kopyalanmadı. */
  var V650 = "https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@0b2c64d11e51fac11fe4c68d78331f607483ac65/wix-home-v650/";
  /* V1.4 · yeni Ronin hero filmi (mobil/tablet). Kaynak: Wix'teki özgün yükleme 560×752, 24 fps, 18,04 sn; renk düzenlemesi
     dosyaya işlenmiştir (CSS filtresi yok). İki kademe: doğal 560×752 ve yapay 2× (Real-ESRGAN, 1120×1504 — doğal çözünürlük
     DEĞİLDİR). Kademe n1-m4-build'de ekrandaki film genişliği × piksel yoğunluğuna göre seçilir. Öznitelikler: hero-video, hero-poster. */
  var HERO_M4 = { video: 'ronin-m5-film.mp4', video2x: 'ronin-m5-film-2x.mp4', poster: 'ronin-m5-poster.webp', w: 560, h: 752, ctaHref: '#iletisim' };
  /* V1.5 · Hizmetler oval medyası: kreatif prodüksiyon mini filmi (Wix'teki demo filmin 360p sürümü, 313 KB, 5,0 sn; 1080p istenmez).
     Poster: Wix görsel dönüştürücüsünden aynı kadraj (320×165, merkez). Öznitelikle değiştirilebilir: mini-video, mini-poster. */
  // v6.54: requested 720p mini source; previous poster is emergency fallback pending matching thumbnail.
  var MINI_M5 = { src: 'https://video.wixstatic.com/video/6dbf5e_ba9aa241bd914b07a97c4c315f153bfa/720p/mp4/file.mp4',
    poster: 'https://static.wixstatic.com/media/6dbf5e_ba9aa241bd914b07a97c4c315f153bfaf002.jpg' };
  var MOBILE_MQ = '(max-width: 900px)';
  /* M1/M2 eşleştirmesi İÇERİĞE göre yapıldı (bkz. RESPONSIVE_REPORT.md): masaüstündeki ilk video (eller, katana, dik kabza)
     = M2; son video bandı (kırmızı fon, yüz + kılıç) = M1. */
  var VIDEO_M = {
    first: { src: 'https://video.wixstatic.com/video/6dbf5e_809e8dea872246c7ae68b073341efafb/480p/mp4/file.mp4', poster: 'https://static.wixstatic.com/media/6dbf5e_809e8dea872246c7ae68b073341efafbf002.jpg', id: 'samuray-video', loopEnd: '3.5', loopStart: '0.12' },   // V1.2: M2'nin siyah kuyruğu döngüye girmez
    last:  { src: 'https://video.wixstatic.com/video/6dbf5e_48741869fc89488392bce24c731dafa4/480p/mp4/file.mp4', poster: 'https://static.wixstatic.com/media/6dbf5e_48741869fc89488392bce24c731dafa4f002.jpg', id: 'video-bandi' }
  };
  /* V1.1 — yalnızca mobil/tablet: yüzen kontrollerin (n1-floating-controls-v632, DEĞİŞMEDİ) "altında tıklanabilir öğe var mı"
     denetimi her kaydırma karesinde 10 kez document.elementsFromPoint çağırıyordu; 4× CPU kısıtlı ölçümde 6 sn kaydırmada
     ≈1,6 sn ana iş parçacığı. Mobilde bu denetim en çok 200 ms'de bir yapılır, kaydırma durunca son durum bir kez daha
     ölçülür. Masaüstünde bu fonksiyon çağrılmaz. */
  function tuneFloatingControls(tries) {
    var fc = document.querySelector('n1-floating-controls');
    if (!fc || typeof fc._overInteractive !== 'function') { if ((tries || 0) < 20) setTimeout(function () { tuneFloatingControls((tries || 0) + 1); }, 150); return; }
    if (fc.__n1mTuned) return;
    var orig = fc._overInteractive, last = -1e9, val = false, trail = 0;
    fc.__n1mTuned = true;
    fc._overInteractive = function () {
      var now = performance.now();
      if (now - last < 200) {
        clearTimeout(trail); trail = setTimeout(function () { last = -1e9; if (fc.isConnected && fc._update) fc._update(); }, 220);
        return val;
      }
      last = now; val = orig.call(fc); return val;
    };
    // V1.2: modül "altında tıklanabilir öğe var mı" ölçümünü Yukarı Çık düğmesi görünür olmadan ÖNCE yapar; düğmenin
    // belirdiği adımda hero CTA'sının üstünde kalabiliyordu. Görünürlük değiştiği anda ölçüm bir kez daha yapılır.
    var upd = fc._update;
    if (typeof upd === 'function') fc._update = function () { var was = fc.topOn; var r = upd.apply(fc, arguments); if (fc.topOn !== was) { last = -1e9; upd.apply(fc, arguments); } return r; };
  }
  function mqm(q) { try { return matchMedia(q).matches; } catch (e) { return false; } }
  function deviceProfile() {
    var w = window.innerWidth || document.documentElement.clientWidth || 0, h = window.innerHeight || w;
    if (w > 900) {
      // geniş tablet (iPad Pro dikey): genişlik + yön + birincil işaretçi + hover birlikte (dokunmatik tek başına değil)
      if (w <= 1100 && h >= w * 1.15 && mqm('(pointer: coarse)') && mqm('(hover: none)')) return 't';
      // V1.4: yalnızca dokunmatik dışında HİÇBİR işaretçisi olmayan cihazlar (any-pointer: fine ve any-hover yok): kısa kenar < 600 →
      // yatay telefon, 1366 px'e kadar → yatay tablet. Dokunmatik ekranlı dizüstü/masaüstü (izleme dörtgeni ya da fare var) ve
      // klavye-izleme dörtgenli iPad masaüstü kalır.
      if (mqm('(pointer: coarse)') && mqm('(hover: none)') && !mqm('(any-pointer: fine)') && !mqm('(any-hover: hover)')) { if (Math.min(w, h) < 600 && w <= 1100) return 'm'; if (w <= 1366) return 't'; }
      return 'd';
    }
    return (w >= 768 && Math.min(w, h) >= 600) ? 't' : 'm';
  }
  /* Ronin paket kademesi (gri):
       g   864×1088 — tablet ve 3× yoğunluklu telefonlar (güncel iPhone'lar: 390 px genişlikte büyütme 1,80 → 1,35)
       gl  648×816  — 2× ve altı yoğunluklu telefonlar (büyütme ≤ 1,2; daha akıcı), ayrıca tarayıcı düşük bellek
                      (≤ 2 GB) ya da Veri Tasarrufu bildirirse. iOS Safari bellek/veri bilgisi vermez.
     "ronin-tier" özniteliği kademeyi zorlar. */
  function roninTier(el, P) {
    var f = el && el.getAttribute('ronin-tier'); if (f === 'g' || f === 'gl') return f;
    var c = navigator.connection || {}, mem = navigator.deviceMemory, dpr = window.devicePixelRatio || 1;
    if (c.saveData || (mem && mem <= 2)) return 'gl';
    return (P === 'm' && dpr < 2.5) ? 'gl' : 'g';
  }
  function slash(u) { u = (u || '').trim(); return u && !/\/$/.test(u) ? u + '/' : u; }

  /* ---------- tek seferlik yükleyiciler ---------- */
  var loaded = {};
  function loadScript(src, fresh) {
    // fresh: bölüm modülleri her bağlanışta yeniden çalışır (IIFE); kütüphaneler bir kez
    if (!fresh && loaded[src]) return loaded[src];
    var p = new Promise(function (res, rej) {
      var s = document.createElement('script'); s.src = src; s.async = false; s.setAttribute('data-n1s', '');
      s.onload = function () { res(); }; s.onerror = function () { rej(new Error('yüklenemedi: ' + src)); };
      document.head.appendChild(s);
    });
    if (!fresh) {loaded[src] = p;if(deviceProfile()!=='d')p.catch(function(){if(loaded[src]===p)delete loaded[src];});}
    return p;
  }
  function loadCss(href) {
    var ex = document.querySelector('link[data-n1s-css="' + href + '"]');
    if (ex) return Promise.resolve(ex);
    return new Promise(function (res) {
      var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = href; l.setAttribute('data-n1s-css', href);
      l.onload = l.onerror = function () { res(l); };
      document.head.appendChild(l);
    });
  }
  function ensureFonts(href) {
    if (document.querySelector('link[data-n1s-fonts]')) return;
    ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'].forEach(function (u, i) {
      var p = document.createElement('link'); p.rel = 'preconnect'; p.href = u; if (i) p.crossOrigin = ''; p.setAttribute('data-n1s-fonts', ''); document.head.appendChild(p);
    });
    var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = href; l.setAttribute('data-n1s-fonts', ''); document.head.appendChild(l);
  }
  function ensureGsap(urls) {
    // Sayfada GSAP zaten varsa yeniden yüklenmez; yalnızca eksik eklenti yüklenir.
    var need = [];
    if (!window.gsap) need.push(urls[0]);
    else if (window.gsap.version !== '3.13.0') diagNote('Sayfada farklı bir GSAP sürümü var: ' + window.gsap.version + ' (beklenen 3.13.0)');
    if (!window.ScrollTrigger) need.push(urls[1]);
    if (!window.SplitText) need.push(urls[2]);
    return need.reduce(function (p, u) { return p.then(function () { return loadScript(u); }); }, Promise.resolve())
      .then(function () { window.gsap.registerPlugin(window.ScrollTrigger, window.SplitText); });
  }
  var notes = [];
  function diagNote(t) { notes.push(t); try { console.warn('[n1-site-v1] ' + t); } catch (e) {} }

  /* ---------- modül olay dinleyicisi kaydı (yalnızca bu paketin dosyalarından gelenler) ----------
   * window/document/html/body üzerinde, çağrı yığını paket adresini içeren addEventListener kayıtları tutulur;
   * bileşen kaldırılınca bunlar kaldırılır. Wix'in kendi dinleyicilerine dokunulmaz. */
  var tracker = null;
  function startTracker(codeBase) {
    if (tracker) return tracker;
    var targets = [window, document, document.documentElement, document.body], recs = [], saved = [];
    targets.forEach(function (t) {
      var orig = t.addEventListener;
      var patched = function __n1sAddListener(type, fn, opts) {
        try {
          // Yığının ilk satırları bu ara katmanın kendisidir (paket dosyası) → atlanır; yalnızca ÇAĞIRANA bakılır.
          var lines = String(new Error().stack || '').split('\n'), i = 0;
          while (i < lines.length && lines[i].indexOf('__n1sAddListener') < 0) i++;
          var caller = i < lines.length ? lines.slice(i + 1).join('\n') : '';
          if (codeBase && caller.indexOf(codeBase) >= 0) recs.push([t, type, fn, opts]);
        } catch (e) {}
        return orig.call(this, type, fn, opts);
      };
      // Wix Studio may expose addEventListener as read-only on Window or other host objects.
      // Tracking is best-effort: never abort the entire site when an API cannot be patched.
      var originalOwnDescriptor = Object.getOwnPropertyDescriptor(t, 'addEventListener');
      try {
        t.addEventListener = patched;
        if (t.addEventListener === patched) saved.push([t, originalOwnDescriptor]);
        else diagNote('Olay dinleyicisi takip edilemedi (salt okunur API): ' + (t === window ? 'window' : t === document ? 'document' : t.tagName || 'element'));
      } catch (e) {
        diagNote('Olay dinleyicisi takip edilemedi (Wix izin vermiyor): ' + (t === window ? 'window' : t === document ? 'document' : t.tagName || 'element'));
      }
    });
    tracker = {
      recs: recs,
      stop: function (removeAll) {
        // Restore the exact previous own-property descriptor; deleting an original
        // own method would otherwise alter Wix's event handling after unmount.
        saved.forEach(function (s) {
          try {
            if (s[1]) Object.defineProperty(s[0], 'addEventListener', s[1]);
            else delete s[0].addEventListener;
          } catch (e) { diagNote('Olay dinleyicisi API geri yüklenemedi.'); }
        });
        if (removeAll) recs.forEach(function (r) { try { r[0].removeEventListener(r[1], r[2], r[3]); } catch (e) {} });
        tracker = null;
      }
    };
    return tracker;
  }

  /* Header'ın kendi CSS'indeki genel .site-container kuralını yalnızca Header içine daraltır (Aşama 03 ile aynı) */
  function scopeHeaderCss() {
    var st = document.getElementById('n1h-style');
    if (!st || st.getAttribute('data-n1s-scoped') === '1') return;
    var t = st.textContent, from = '.site-container{', to = 'n1-header[data-n1-owner] .site-container{';
    var n = t.split(from).length - 1;
    if (n === 1) { st.textContent = t.replace(from, to); st.setAttribute('data-n1s-scoped', '1'); }
    else diagNote('.site-container kuralı beklenen biçimde bulunamadı (' + n + '); dokunulmadı');
  }

  /* ---------- V1.2 · mobil/tablet iskelet düzenlemeleri (yalnızca P !== 'd'; masaüstünde çağrılmaz) ----------
   * Bölüm modülleri çalışmadan ÖNCE, etkisiz <template> içinde yapılır. Metinler ve bağlantılar mevcut iskeletten okunur;
   * hiçbir adres, kimlik ya da metin uydurulmaz. Masaüstü iskeleti ve modülleri değişmez. */
  var SVC_LABEL = { 'kreatif-produksiyon': 'Kreatif Prodüksiyon', 'e-ticaret-yonetimi': 'E-Ticaret Yönetimi', 'sosyal-medya': 'Sosyal Medya',
    'reklam-yonetimi': 'Reklam Yönetimi', 'ui-ux-tasarim': 'UI-UX Tasarım', 'ai': 'Yapay Zekâ', 'uygulama': 'Uygulama Geliştirme' };
  var ARROW = '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false"><path d="M4.5 11.5l7-7M5.5 4.5h6v6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/></svg>';
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function mobileMarkup(frag) {
    try {
      // Hizmetler (#hizmetler-ozet): tek paragraf → ayrı ayrı dokunulabilir hizmet satırları. Kimlik yeni kapsayıcıya geçer
      // (çapa navigasyonu aynı kimliği bulur); bağlantılar ve data-service değerleri olduğu gibi taşınır (n1-service-links
      // merkezi haritası yine uygular). Kapanış cümlesi korunur.
      var p = frag.querySelector('#hizmetler-ozet');
      if (p) {
        var links = [].slice.call(p.querySelectorAll('a.sh-link'));
        var acc = p.querySelector('.intro-acc'), close = acc ? acc.textContent.trim() : 'tek ritimde.';
        var box = document.createElement('div');
        box.className = 'n1m-svc'; box.id = 'hizmetler-ozet'; box.setAttribute('data-n1m', 'services');
        box.setAttribute('style', p.getAttribute('style') || '');
        box.innerHTML = '<p class="n1m-eyebrow"><i aria-hidden="true"></i>Hizmetler</p>' +
          '<ol class="n1m-svc-list">' + links.map(function (a, i) {
            var key = a.getAttribute('data-service') || '', label = SVC_LABEL[key] || a.textContent.trim();
            return '<li class="n1m-svc-item"><a class="n1m-svc-link" data-service="' + esc(key) + '" href="' + esc(a.getAttribute('href') || '#') + '">' +
              '<span class="n1m-svc-no" aria-hidden="true">' + (i < 9 ? '0' : '') + (i + 1) + '</span><span class="n1m-svc-name">' + esc(label) + '</span>' +
              '<span class="n1m-svc-go" aria-hidden="true">' + ARROW + '</span></a></li>';
          }).join('') + '</ol>' +
          '<p class="n1m-svc-close">Tek ekipte, <span class="n1m-acc">' + esc(close) + '</span></p>';
        p.replaceWith(box);
      }
      // Manifesto (#biz-kimiz): aynı metin, üç tipografik vuruşa ayrılır. Modülün beklediği .n1ab-text gizli ve boş bir
      // yer tutucu olarak kalır (SplitText hedefi bulur, hata yok); CTA ve bağlantısı aynen korunur.
      var ab = frag.querySelector('[data-n1-about] .n1ab-text');
      if (ab) {
        var s = [].slice.call(ab.querySelectorAll('.n1ab-s')).map(function (x) { return x.textContent.replace(/\s+/g, ' ').trim(); });
        // büyük/küçük harf: 1. vuruş büyük harf (başlık); 2–3 cümle düzeninde (Türkçe yerel ayarıyla: İ/ı doğru dönüşür)
        var lc = function (t) { return t.toLocaleLowerCase('tr-TR'); };
        var sc = function (t) { var l = lc(t); return l.charAt(0).toLocaleUpperCase('tr-TR') + l.slice(1); };
        var hiEl = ab.querySelectorAll('.n1ab-s')[4] && ab.querySelectorAll('.n1ab-s')[4].querySelector('.n1ab-hi');
        var hi4 = hiEl ? hiEl.textContent.trim() : '';
        var hi1El = ab.querySelectorAll('.n1ab-s')[1] && ab.querySelectorAll('.n1ab-s')[1].querySelector('.n1ab-hi');
        var hi1 = hi1El ? hi1El.textContent.trim() : '';
        if (s.length === 5 && hi4 && hi1 && s[4].indexOf(hi4) === 0 && s[1].indexOf(hi1) === 0) {
          var mf = document.createElement('div'); mf.className = 'n1m-mf'; mf.setAttribute('lang', 'tr');
          mf.innerHTML =
            '<p class="n1m-mf-beat n1m-mf-1"><span class="n1m-mf-ln n1m-mf-pre">' + esc(s[0]) + '</span>' +
              '<span class="n1m-mf-ln n1m-mf-big"><span class="n1m-acc">' + esc(hi1) + '</span>' + esc(s[1].slice(hi1.length)) + '</span></p>' +
            '<p class="n1m-mf-beat n1m-mf-2"><span class="n1m-mf-ln">' + esc(sc(s[2])) + '</span></p>' +
            '<p class="n1m-mf-beat n1m-mf-3"><span class="n1m-mf-ln">' + esc(sc(s[3])) + ' ' +
              '<span class="n1m-acc">' + esc(lc(hi4)) + '</span>' + esc(lc(s[4].slice(hi4.length))) + '</span></p>';
          ab.parentNode.insertBefore(mf, ab);
          ab.innerHTML = ''; ab.setAttribute('aria-hidden', 'true'); ab.classList.add('n1m-src');
        }
      }
      // ───── V1.3 · Partnerlikler & Sertifikasyonlar (Rev 03) + AI Strategy (Rev 04) ─────
      // Metinler mevcut iskeletten okunur (hiçbiri uydurulmaz). Masaüstü hareket modülünün (n1-partners-v617) kancası
      // data-n1k mobilde data-n1m-k olur: modül bu bölümü bulmaz, mobil tasarım kendi (n1-home-mobile-v3) hareketini kullanır.
      var pk = frag.querySelector('section[data-n1k]');
      if (pk && pk.querySelector('.n1k-wall')) {
        var tx = function (el) { return el ? el.textContent.replace(/\s+/g, ' ').trim() : ''; };
        var ttl = pk.querySelector('.n1k-title'), ttlTxt = (ttl && ttl.getAttribute('aria-label')) || tx(ttl);
        var ttlParts = [].map.call(pk.querySelectorAll('.n1k-title .n1k-t'), tx);
        var wallTag = tx(pk.querySelector('.n1k-tag--wall'));
        var brands = [].map.call(pk.querySelectorAll('.n1k-wall .n1k-brand'), function (b) {
          var k = b.querySelector('.n1k-kind'); return { name: tx(b.querySelector('.n1k-word')), kind: tx(k), lang: (k && k.getAttribute('lang')) || 'en' };
        });
        var cert = pk.querySelector('.n1k-cert'), certTag = tx(cert && cert.querySelector('.n1k-tag')), certName = tx(cert && cert.querySelector('.n1k-cert-name')), certNote = tx(cert && cert.querySelector('.n1k-cert-note'));
        var cm = /^(.*\S)\s+(CERTIFIED)$/.exec(certName);
        var ai = pk.querySelector('.n1k-ai');
        var row = function (name, kind, kindLang, extra) {
          return '<span class="n1m-pk-name">' + esc(name) + '</span><span class="n1m-pk-lead" aria-hidden="true"></span>' +
            (kind ? '<span class="n1m-pk-kind' + (extra || '') + '"' + (kindLang ? ' lang="' + kindLang + '"' : '') + '>' + esc(kind) + '</span>' : '');
        };
        var html = '<div class="n1m-pk">' +
          '<h2 class="n1m-pk-title" id="n1k-title" aria-label="' + esc(ttlTxt) + '">' + (ttlParts.length ? ttlParts : [ttlTxt]).map(function (t) { return '<span class="n1m-pk-tl" aria-hidden="true">' + esc(t) + '</span>'; }).join(' ') + '</h2>' +
          '<div class="n1m-pk-body">' +
            '<p class="n1m-eyebrow n1m-pk-eyebrow"><i aria-hidden="true"></i><span>' + esc(wallTag) + '</span><span class="n1m-pk-count" aria-hidden="true">' + (brands.length < 10 ? '0' : '') + brands.length + '</span></p>' +
            '<ul class="n1m-pk-list" lang="en" translate="no" aria-label="' + esc(wallTag) + '">' + brands.map(function (b) {
              return '<li class="n1m-pk-row">' + row(b.name, b.kind, b.lang === 'tr' ? 'tr' : '') + '</li>'; }).join('') + '</ul>' +
            (cert ? '<div class="n1m-pk-cert">' +
              '<p class="n1m-eyebrow n1m-pk-eyebrow"><i aria-hidden="true"></i><span>' + esc(certTag) + '</span></p>' +
              '<p class="n1m-pk-row n1m-pk-row--cert" lang="en" translate="no" aria-label="' + esc(certName) + '"><span class="n1m-pk-in" aria-hidden="true">' +
                (cm ? row(cm[1], cm[2], '', ' n1m-pk-seal') : row(certName, '', '')) + '</span></p>' +
              '<p class="n1m-pk-note">' + esc(certNote) + '</p></div>' : '') +
          '</div></div>';
        if (ai) {
          var aiTag = tx(ai.querySelector('.n1k-tag')), aiTitle = tx(ai.querySelector('.n1k-ai-title'));
          var aiLines = [].map.call(ai.querySelectorAll('.n1k-ai-line .n1k-t'), tx), aiNote = tx(ai.querySelector('.n1k-ai-note'));
          var aiList = [].map.call(ai.querySelectorAll('.n1k-ai-list li'), tx);
          html += '<div class="n1m-ai">' +
            '<div class="n1m-ai-a"><p class="n1m-eyebrow" lang="tr"><i aria-hidden="true"></i><span>' + esc(aiTag) + '</span></p>' +
            '<h3 class="n1m-ai-title" lang="en" translate="no">' + esc(aiTitle) + '</h3>' +
            '<p class="n1m-ai-line" lang="en" translate="no">' + aiLines.map(function (t, i) { return '<span class="n1m-ai-l' + (i ? ' n1m-acc' : '') + '">' + esc(t) + '</span>'; }).join(' ') + '</p></div>' +
            '<div class="n1m-ai-b"><p class="n1m-ai-note">' + esc(aiNote) + '</p>' +
            '<ul class="n1m-ai-list" lang="en" translate="no">' + aiList.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></div></div>';
        }
        var pkc = pk.querySelector('.site-container') || pk;
        pkc.innerHTML = html;
        pk.removeAttribute('data-n1k'); pk.setAttribute('data-n1m-k', '');
      }

      // ───── V1.3 · İstatistikler (Rev 06) ─────
      // Değerler yedek iskeletten okunur; n1-home-mobile-v3, n1-stats-v632'nin yayımladığı window.N1_METRICS tablosu
      // varsa değerleri ondan doğrular/günceller (tek doğruluk kaynağı). Masaüstü sayaç modülünün kancası mobilde kapanır.
      var st = frag.querySelector('section[data-n1-stats]');
      if (st && st.querySelector('.n1st-item')) {
        var rows = [].map.call(st.querySelectorAll('.n1st-item'), function (li) {
          var v = li.querySelector('.n1st-val'), u = li.querySelector('.n1st-unit'), pl = li.querySelector('.n1st-plus'), lb = li.querySelector('.n1st-label');
          return { value: v ? v.textContent.trim() : '', unit: u ? u.textContent.trim() : '', plus: !!pl, label: lb ? lb.textContent.replace(/\s+/g, ' ').trim() : '' };
        });
        var sin = st.querySelector('.n1st-inner') || st;
        sin.innerHTML = '<ul class="n1m-st-list">' + rows.map(function (r) {
          return '<li class="n1m-st-row"><p class="n1m-st-num" aria-hidden="true"><span class="n1m-st-val" data-value="' + esc(r.value) + '">' + esc(r.value) + '</span>' +
            (r.unit ? '<span class="n1m-st-unit">' + esc(r.unit) + '</span>' : '') + '<span class="n1m-st-plus">' + (r.plus ? '+' : '') + '</span></p>' +
            '<p class="n1m-st-label" aria-hidden="true">' + esc(r.label) + '</p><span class="n1m-sr">' + esc(r.value + r.unit + (r.plus ? '+' : '') + ' ' + r.label) + '</span></li>';
        }).join('') + '</ul>';
        st.removeAttribute('data-n1-stats'); st.setAttribute('data-n1m-stats', '');
      }

      // ───── V1.3 · Uzmanlaştığımız Sektörler (Rev 07) ─────
      // 13 sektör tek bir tipografik dizin akışında; n1-sectors-v630'un kancası mobilde kapanır. Bağlantı yoksa düz metin.
      var sx = frag.querySelector('section[data-n1-sectors]');
      if (sx && sx.querySelector('.n1sec-item')) {
        var sTitle = [].map.call(sx.querySelectorAll('.n1sec-tl > span'), function (e) { return e.textContent.trim(); });
        var dsc = sx.querySelector('.n1sec-desc'), strong = dsc && dsc.querySelector('strong');
        var lead = strong ? strong.textContent.trim() : '', rest = dsc ? dsc.textContent.replace(lead, '').replace(/\s+/g, ' ').trim() : '';
        var items = [].map.call(sx.querySelectorAll('.n1sec-item'), function (li) { var nm = li.querySelector('.n1sec-name'); return { key: li.getAttribute('data-sector') || '', label: nm ? nm.textContent.trim() : '', href: nm && nm.tagName === 'A' ? nm.getAttribute('href') : '' }; });
        var sxi = sx.querySelector('.n1sec-inner') || sx;
        sxi.innerHTML = '<div class="n1m-sx-head"><h2 class="n1m-sx-title" id="n1sec-title" lang="tr">' + sTitle.map(function (t) { return '<span class="n1m-sx-tl">' + esc(t) + '</span>'; }).join(' ') + '</h2>' +
          '<p class="n1m-sx-desc">' + (lead ? '<strong>' + esc(lead) + '</strong> ' : '') + esc(rest) + '</p></div>' +
          '<ul class="n1m-sx-flow" lang="tr" aria-label="Uzmanlaştığımız sektörler">' + items.map(function (it, i) {
            var nm = it.href ? '<a class="n1m-sx-name" href="' + esc(it.href) + '">' + esc(it.label) + '</a>' : '<span class="n1m-sx-name">' + esc(it.label) + '</span>';
            return '<li class="n1m-sx-it" data-sector="' + esc(it.key) + '"><span class="n1m-sx-no" aria-hidden="true">' + (i < 9 ? '0' : '') + (i + 1) + '</span>' + nm + '</li>';
          }).join(' ') + '</ul>';   // aradaki boşluk: satır yalnızca sektörler ARASINDA kırılır (ad bölünmez)
        sx.removeAttribute('data-n1-sectors'); sx.setAttribute('data-n1m-sectors', '');
      }
    } catch (e) { diagNote('Mobil iskelet düzenlemesi atlandı: ' + (e && e.message)); }
  }

  var BODY_OWN = /^(n1|rh6)/;   // modüllerin body'ye eklediği öğeler: .n1h-panel, .n1fc…, .n1b-cursor, .n1sr-cursor

  class N1SiteV1 extends HTMLElement {
    static get observedAttributes() { return ['assets-base', 'ronin-base', 'debug', 'sticky-fix']; }


    connectedCallback() {
      if (this._on) return;
      if (document.querySelector(TAG + '[data-n1s-live]')) {
        diagNote('Sayfada ikinci bir <n1-site-v1> var; yalnızca ilki çalışır.');
        if(deviceProfile()!=='d'&&this.isConnected&&(this._n1ConnectTries||0)<5){var self=this;this._n1ConnectTries=(this._n1ConnectTries||0)+1;this._n1ConnectTimer=setTimeout(function(){if(self.isConnected&&!self._on)self.connectedCallback();},200*this._n1ConnectTries);}
        return;
      }
      this._n1ConnectTries=0;
      this._on = true; this.setAttribute('data-n1s-live', '');
      this._start();
    }

    attributeChangedCallback(name, o, v) {
      if (!this._on || o === v) return;
      if ((name === 'assets-base' || name === 'ronin-base') && this._waiting) this._start();
      if (name === 'debug') this._queueDiag();
    }

    _bases() {
      var code = "https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@d24fa373d6d76c0218b3f3b77897a8c2ace04e5e/wix-full-v1/"; // Production codebase is fixed to the approved main release.
      return { code: code, assets: slash(this.getAttribute('assets-base')) || "https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@d24fa373d6d76c0218b3f3b77897a8c2ace04e5e/wix-full-v1/aktarim-medya/", ronin: slash(this.getAttribute('ronin-base')) || "https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@d24fa373d6d76c0218b3f3b77897a8c2ace04e5e/wix-v647/media/", home: HOME_SELF || slash(this.getAttribute('home-base')), roninM: slash(this.getAttribute('ronin-mobile-base')) || V650 + 'media/' };
    }

    _start() {
      var B = this._bases(), self = this;
      if (!B.code) { this._note('Paket adresi bulunamadı (code-base).'); return; }
      if (!B.assets || !B.ronin) {
        this._waiting = true;
        this._note('Medya adresleri bekleniyor: ' + (!B.assets ? 'assets-base ' : '') + (!B.ronin ? 'ronin-base' : '') + '. Custom Element öznitelikleri girilince sayfa kurulur.');
        return;
      }
      this._waiting = false; this._clearNote();
      this._B = B; window.N1_ASSET_BASE = B.assets;
      // Cihaz profili: mobil/tablet dosyaları bulunamazsa (home-base yok) güvenli biçimde masaüstü yoluna düşülür.
      var P = this._profile = deviceProfile(), epoch=this._n1Epoch=(this._n1Epoch||0)+1;
      var alive=function(){return self._on&&(P==='d'||(self.isConnected&&self._n1Epoch===epoch));};
      if (P !== 'd' && !B.home) { diagNote('Mobil/tablet dosyalarının adresi bulunamadı (home-base); masaüstü yolu kullanılıyor.'); P = this._profile = 'd'; }
      this.setAttribute('data-n1-profile', P); if(P !== 'd') this.setAttribute('data-n1-video-release','656');
      if (!this._mq) {
        this._mq = matchMedia(MOBILE_MQ);
        this._mqFn = function () { clearTimeout(self._mqT); self._mqT = setTimeout(function () {
          if (!self._on) return; var np = deviceProfile();
          if ((np === 'd') !== (self._profile === 'd')) { self._remount(); return; }
          // V1.4: telefon <-> tablet (döndürme, bölünmüş ekran): işaretleme aynı; yalnızca profil özniteliği ve tetikleyiciler
          if (np !== self._profile) { self._profile = np; self.setAttribute('data-n1-profile', np); if (window.ScrollTrigger) window.ScrollTrigger.refresh(); }
        }, 350); };
        if (this._mq.addEventListener) this._mq.addEventListener('change', this._mqFn); else this._mq.addListener(this._mqFn);
        window.addEventListener('resize', this._mqFn); window.addEventListener('orientationchange', this._mqFn);
      }
      if (P !== 'd' && !document.querySelector('link[data-n1s-poster]')) {   // V1.4: ilk görüntü = yeni film posteri, CSS/iskelet beklenmeden istenir
        var pl = document.createElement('link'); pl.rel = 'preload'; pl.as = 'image'; pl.href = this.getAttribute('hero-poster') || (B.home + 'media/' + HERO_M4.poster); pl.setAttribute('fetchpriority', 'high'); pl.setAttribute('data-n1s-poster', ''); document.head.appendChild(pl);
      }
      this._t0 = performance.now();
      this._stBefore = window.ScrollTrigger ? new Set(window.ScrollTrigger.getAll()) : new Set();
      this._htmlClasses = [].slice.call(document.documentElement.classList);
      this._htmlStyle = document.documentElement.getAttribute('style');   // ScrollTrigger html'e scroll-behavior yazar; kaldırılınca geri yüklenir
      this._tracker = startTracker(B.code);
      this._owned = [];
      this._mo = new MutationObserver(function (list) {
        list.forEach(function (m) { [].forEach.call(m.addedNodes, function (n) {
          if (n.nodeType === 1 && n.parentNode === document.body && (BODY_OWN.test(n.tagName.toLowerCase()) || BODY_OWN.test(String(n.className || '')))) {
            if (!n.hasAttribute('data-n1-owner')) n.setAttribute('data-n1-owner', TAG);
            if (self._owned.indexOf(n) < 0) self._owned.push(n);
          }
        }); });
      });
      this._mo.observe(document.body, { childList: true });

      ensureFonts(ORDER.fonts);
      // Çapa navigasyonu (Hizmetler → #hizmetler-ozet): bölüm modüllerinden bağımsız, bir kez yüklenir; yüklenemezse sayfa etkilenmez.
      if (NAV_SRC) loadScript(NAV_SRC).catch(function (e) { diagNote(String(e && e.message || e)); });
      var cssDone = Promise.all([loadCss(B.code + 'site/n1-site-base-v1.css')].concat(ORDER.css.map(function (f) { return loadCss(B.code + 'modules/' + f); })))
        .then(function () { if (P !== 'd') return loadCss(B.home + 'site/n1-home-m5.css'); });   // V1.5: mobil/tablet katmanı (V1.4 tasarımı + 6 revizyon)   // modül CSS'lerinden SONRA (aynı özgüllükte sonraki kazanır)
      var markupDone = loadScript("https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@fbc905e6b07721d26a78eb84df56a076693ad7e2/wix-mobile-performance-v14/site/n1-site-markup-v14.js");

      // V1.4: mobil/tablet işaretleme oluşturucu iskeletle paralel istenir (masaüstünde hiç istenmez)
      var buildDone = P !== 'd' ? loadScript(B.home + 'modules/n1-m5-build.js') : Promise.resolve();
      var earlyHeader=false,earlyVideo=false;
      Promise.all([cssDone, markupDone, buildDone]).then(function () {
        if (!alive()) return;
        self._render();
        if(P==='d')return ensureGsap(ORDER.gsap);
        // Mobile essentials do not wait for GSAP. Preserve the desktop module order.
        return Promise.all([
          loadScript("https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@162599ec580db98d848cf6670bcde7ee30bf97f5/wix-global-menu-v12/modules/n1-header-v12.js",true).then(function(){if(alive()){earlyHeader=true;scopeHeaderCss();self._innerHeader(P);}}).catch(function(e){diagNote(String(e));}),
          loadScript(VIDEO_M5_V13,true).then(function(){if(alive())earlyVideo=true;}).catch(function(e){diagNote(String(e));})
        ]).then(function(){if(alive())return ensureGsap(ORDER.gsap);});
      }).then(function () {
        // Mobil tarayıcıda adres çubuğunun açılıp kapanması ScrollTrigger'ı yeniden ölçtürmesin (yalnızca mobil/tablet profilinde)
        if (alive() && P !== 'd' && window.ScrollTrigger && window.ScrollTrigger.config) { try { window.ScrollTrigger.config({ ignoreMobileResize: true }); } catch (e) {} }
      }).then(function () {
        if (!alive()) return;
        // modüller v6.47 sırasıyla; bölüm modülleri (IIFE) her bağlanışta yeniden çalışır
        return ORDER.js.reduce(function (p, f) {
          return p.then(function () {
            if (!alive()) return;
            if (f === 'ronin-hero-v67.js' && P !== 'd') return;          // V1.4: mobil/tablet hero = native film (n1-video-m4); Ronin kare motorları indirilmez
            if (f === 'n1-header-v613.js' && P !== 'd' && earlyHeader) return;
            if (f === 'n1-header-v613.js') return loadScript("https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@162599ec580db98d848cf6670bcde7ee30bf97f5/wix-global-menu-v12/modules/n1-header-v12.js", true)
              .then(function () { if (alive() && P !== 'd') self._innerHeader(P); });   // V1.3: iç sayfalardaki onaylı Header düzeni (ayrı menü motoru yok)
            if (f === 'n1-samurai-video-v621.js' && P !== 'd' && earlyVideo) return;
            if (f === 'n1-samurai-video-v621.js' && P !== 'd') return loadScript(VIDEO_M5_V13, true);   // V1.5: hero + M2/M1 + mini film (gerçek iPhone bulgularına göre)
            if (f === 'ronin-type-v613.js' && P !== 'd') return;      // V1.4: sahne yazıları n1-home-m4 içinde (filmin kare zamanına bağlı)
            return loadScript(B.code + 'modules/' + f, true);
          });
        }, Promise.resolve());
      }).then(function () {
        // V1.3: mobil/tablet bölüm katmanı (hero geçişi, Partnerlikler, İstatistikler, Sektörler, Markalar, Ecosystem, manifesto, footer)
        if (alive() && P !== 'd') return loadScript(B.home + 'modules/n1-home-m5.js', true);   // V1.5: mobil/tablet hareket katmanı
      }).then(function () {
        if (!alive()) return;
        scopeHeaderCss();
        self._ready();
      }).catch(function (e) {
        diagNote(String(e && e.message || e)); self._queueDiag();
        // Temel erişim: bir bağımlılık (ör. GSAP CDN) yüklenemese de içerik görünür kalır; Header ve çapa navigasyonu
        // GSAP gerektirmez → yalnızca bu hata yolunda ayrıca yüklenir (normal akışta bu satırlar hiç çalışmaz).
        if (!alive() || !self.firstElementChild || (P==='d' && self.querySelector && document.querySelector('n1-header[data-n1-owner] .n1h-bar:not([data-n1m-ph])'))) return;   // V1.3: yer tutucu çubuk sayılmaz
        (earlyHeader?Promise.resolve():loadScript("https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@162599ec580db98d848cf6670bcde7ee30bf97f5/wix-global-menu-v12/modules/n1-header-v12.js", true))
          .then(function () { if(!alive())return;scopeHeaderCss(); if (P !== 'd') self._innerHeader(P); })
          // V1.2: Ronin motoru ve sahne yazıları GSAP kullanmaz → GSAP yüklenemese de hero boş kalmaz (mobil/tablet)
          // V1.4: hero filmi ve M1/M2 GSAP kullanmaz → GSAP yüklenemese de oynar (ya da poster + düğme); sahne yazıları statik kalır
          .then(function () { if (alive() && P !== 'd' && !window.__n1v4) return loadScript(VIDEO_M5_V13, true); })
          // V1.4: proje tablosu (N1_ECOSYSTEM) masaüstü modülünce yayımlanır; modül kök bulamayınca çıkar, GSAP gerekmez
          .then(function () { if (alive() && P !== 'd' && !window.N1_ECOSYSTEM) return loadScript(B.code + 'modules/n1-ecosystem-v647-wix.js', true).catch(function () {}); })
          // V1.4: hareket katmanı GSAP olmadan da çalışır (statik durumlar, etkin marka, sayaçlar son değerde, footer görseli)
          .then(function () { if (alive() && P !== 'd' && !window.__n1m4) return loadScript(B.home + 'modules/n1-home-m5.js', true); })
          .catch(function () {});
      });
    }

    _render() {
      var B = this._B, self = this;
      var html = String(window.N1_SITE_MARKUP || '').split('{{ASSETS}}').join(B.assets);
      // İskelet önce etkisiz bir <template> içinde hazırlanır: tanımlı Custom Element'ler (n1-header vb.) yanlış yerde
      // bir kez bağlanıp verisini tüketmesin. Header ve yüzen kontroller doğrudan body'de, TEK sefer bağlanır.
      var tpl = document.createElement('template'); tpl.innerHTML = html;
      var frag = tpl.content;
      ['n1-header', 'n1-floating-controls'].forEach(function (t) {
        document.querySelectorAll(t + '[data-n1-owner]').forEach(function (old) { old.remove(); });
        var el = frag.querySelector(t); if (!el) return;
        el.setAttribute('data-n1-owner', TAG);
        if (t === 'n1-header' && self._profile !== 'd') {   // V1.3: yalnızca mobil/tablet
          el.setAttribute('data-n1-hp', self._profile);
          // Header betiği gelene kadar boş, ölçülebilir bir çubuk (yükseklik iç sayfa kuralından: 64 / 72 px). Hero ilk
          // yerleşimde gerçek Header yüksekliğini okur → Header bağlanınca video kaymaz (CLS 0). Bağlanınca Header kendi
          // işaretlemesiyle değiştirir (innerHTML); masaüstünde eklenmez.
          var ph = document.createElement('div'); ph.className = 'n1h-bar site-container'; ph.setAttribute('aria-hidden', 'true'); ph.setAttribute('data-n1m-ph', ''); el.appendChild(ph);
        }
        document.body.appendChild(el); self._owned.push(el);     // v6.47'de de body'nin doğrudan çocuğuydu
      });
      var el, tier = '', P = this._profile;
      if (P === 'd') {
        // Ronin: v6.47 oluşturma betiğiyle aynı öznitelikler; paketler .bin, posterler doğrudan <img>
        tier = innerWidth * (devicePixelRatio || 1) > 1700 ? 'x' : 'd';
        var D = tier === 'x' ? RONIN.Bx : RONIN.Bd, M = RONIN.m;
        el = document.createElement('ronin-hero-v67');
        var at = { id: 'hero', 'frames-base': B.ronin, 'fade-color': '#080A09', 'scroll-vh': '300', 'stage-weights': '9,33,22,27,9', 'smooth-ms': '30',
          accent: matchMedia('(max-width: 900px)').matches ? '#A1FF00' : '#93C25A', 'cta-href': '#iletisim', 'edge-top': '#040404', 'edge-mid': '#080808', 'edge-bottom': '#101010',
          'pack-d': D.packs.join(','), 'poster-d': D.poster, 'pack-m': M.packs.join(','), 'poster-m': M.poster };
        for (var k in at) el.setAttribute(k, at[k]);
        el.dataset.fogMid = '0';
      } else {
        // V1.4 · mobil/tablet: hero öğesini n1-m4-build oluşturur (native film). Ronin kare motoru ve paketleri istenmez.
        el = null;
        // Sinematik videolar: yalnızca mobil/tablet adresi atanır (masaüstü adresi DOM'a hiç girmez → arka planda indirilmez)
        [['first', 'video-mobile-first'], ['last', 'video-mobile-last']].forEach(function (pair) {
          var V = VIDEO_M[pair[0]], sec = frag.querySelector('#' + V.id), vid = sec && sec.querySelector('video'); if (!vid) return;
          vid.setAttribute('data-sources', V.src);
          if (V.loopEnd) vid.setAttribute('data-loop-end', V.loopEnd);
          if (V.loopStart) vid.setAttribute('data-loop-start', V.loopStart);   // V1.5: M2 ilk karesi siyah
          vid.setAttribute('width', '768'); vid.setAttribute('height', '450'); vid.setAttribute('preload', 'none'); vid.removeAttribute('autoplay');
          sec.setAttribute('data-n1m-video', pair[0]);
          var pb = self.getAttribute('ronin-mobile-base') ? B.roninM : V649 + 'media/';
          var poster = /^https:\/\//.test(V.poster) ? V.poster : pb + V.poster; vid.setAttribute('poster', poster); sec.style.backgroundImage = 'url("' + poster + '")';
        });
      }
      var slot = frag.querySelector('#heroSlot'); if (slot && el) slot.replaceWith(el);
      if (P !== 'd') {   // V1.1: masaüstü tipografi etiketi yerine mobil etiket (iki katman aynı sahneye yazmaz)
        // V1.4: bağımsız mobil/tablet işaretlemesi (tek DOM; içerik, kimlik ve bağlantılar iskeletten okunur)
        if (window.N1M4 && window.N1M4.build) {
          try {
            window.N1M4.build(frag, { hero: { src: this.getAttribute('hero-video') || (B.home + 'media/' + HERO_M4.video), src2x: this.getAttribute('hero-video') ? '' : (B.home + 'media/' + HERO_M4.video2x), poster: this.getAttribute('hero-poster') || (B.home + 'media/' + HERO_M4.poster),
              w: HERO_M4.w, h: HERO_M4.h, ctaHref: HERO_M4.ctaHref }, glyph: '',
              mini: { src: MINI_M5.src, poster: MINI_M5.poster } });
          } catch (e) { diagNote('Mobil işaretleme (m5) kurulamadı: ' + (e && e.message)); }
        }
      }
      window.__tier = tier;
      this.innerHTML = '';
      this.appendChild(frag);
      this.classList.add('has-js');                       // v6.47'de html.has-js idi; yalnızca bileşen kökünde
      var ust = this.querySelector('#ust'); if (ust) ust.setAttribute('data-n1-owner', TAG);
    }

    _ready() {
      var self = this, ST = window.ScrollTrigger;
      this._readyMs = Math.round(performance.now() - this._t0);
      // Tek ve kontrollü yenileme: fontlar hazır + (gerekirse) sayfa yüklemesi bitince
      var refreshOnce = function () { if (!self._on || !ST) return; ST.refresh(); self._lastH = Math.round(self.getBoundingClientRect().height); self._queueDiag(); };
      var fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
      var loadReady = document.readyState === 'complete' ? Promise.resolve() : new Promise(function (r) { addEventListener('load', r, { once: true }); });
      Promise.all([fontsReady, loadReady]).then(function () { requestAnimationFrame(refreshOnce); });
      // Yükseklik gerçekten değişirse (görsel/video yüklendi, Wix yerleşimi oturdu) bir kez daha; sürekli döngü yok
      this._ro = new ResizeObserver(function () {
        var h = Math.round(self.getBoundingClientRect().height);
        if (self._lastH != null && Math.abs(h - self._lastH) > 2) {
          clearTimeout(self._roT); self._roT = setTimeout(refreshOnce, 250);
        }
        self._queueDiag();
      });
      this._ro.observe(this); if (this.parentElement) this._ro.observe(this.parentElement);
      if (this._profile !== 'd') {
        tuneFloatingControls();
        this._n1PageShow=function(ev){if(!ev.persisted||!self._on||!self.isConnected)return;var h=document.querySelector('n1-header[data-n1-owner="'+TAG+'"]');if(h&&h.panel&&!h.panel.isConnected)document.body.appendChild(h.panel);scopeHeaderCss();self._innerHeader(self._profile);requestAnimationFrame(refreshOnce);};
        window.addEventListener('pageshow',this._n1PageShow);
      }
      this._queueDiag();
    }

    /* Masaüstü ↔ mobil/tablet profil geçişi: mevcut temizlik (disconnectedCallback) + yeniden kurulum; tek sefer, döngü yok */
    _remount() {
      if (!this._on || this._remounting) return; this._remounting = true;
      var y = window.pageYOffset, hgt = Math.max(1, document.documentElement.scrollHeight - window.innerHeight), self = this;
      this.disconnectedCallback(); this.connectedCallback();
      setTimeout(function () { self._remounting = false; }, 1200);
      // kullanıcı sayfanın ortasındaysa yaklaşık aynı oranda kalsın (yerleşim oturunca)
      if (y > 40) setTimeout(function () { if (self._on) window.scrollTo(0, Math.round((y / hgt) * Math.max(1, document.documentElement.scrollHeight - window.innerHeight))); }, 1400);
    }

    /* V1.3 · Header (Rev 01): iç sayfalarla (Kısaca Biz v3, Stüdyo Hikâyesi) AYNI onaylı v6.48 Header bileşeni ve AYNI kurallar.
     * V1.2'deki ayrı mobil menü motoru (n1-header-mobile-v1) artık yüklenmez → tek Header, tek MENU, tek animasyon motoru.
     * İç sayfalar Header'ın kendi menü panelini ".n1-inner-panel" sınıfıyla kullanır; burada da aynısı yapılır. Görsel kurallar
     * n1-home-responsive-v3.css içinde: iç sayfa kaynaklarından (n1-inner-responsive-v6.css @09612df + n1-kisaca-biz-v3.js
     * @78cbd9d) araçla aktarılmış ve n1-header[data-n1-hp] kapsamına alınmıştır. Masaüstünde bu öznitelik hiç eklenmez. */
    _innerHeader(P) {
      var h = document.querySelector('n1-header[data-n1-owner="' + TAG + '"]'); if (!h) return;
      h.setAttribute('data-n1-hp', P);
      var pn = h.panel || document.querySelector('.n1h-panel[data-n1-owner="' + TAG + '"]');
      if (pn) { pn.classList.add('n1-inner-panel'); pn.setAttribute('data-n1-hp', P); }
    }

    _note(t) { this._clearNote(); var n = this._noteEl = document.createElement('p'); n.className = 'n1s-note'; n.textContent = t; this.appendChild(n); }
    _clearNote() { if (this._noteEl) { this._noteEl.remove(); this._noteEl = null; } }

    disconnectedCallback() {
      clearTimeout(this._n1ConnectTimer);this._n1Epoch=(this._n1Epoch||0)+1;
      if(this._n1PageShow){window.removeEventListener('pageshow',this._n1PageShow);this._n1PageShow=null;}
      if (!this._on) return;
      this._on = false; this.removeAttribute('data-n1s-live');
      var ST = window.ScrollTrigger, self = this;
      if (this._ro) this._ro.disconnect(); clearTimeout(this._roT); cancelAnimationFrame(this._diagRaf);
      clearTimeout(this._mqT);
      if (this._mq) { if (this._mq.removeEventListener) this._mq.removeEventListener('change', this._mqFn); else this._mq.removeListener(this._mqFn); this._mq = null; window.removeEventListener('resize', this._mqFn); window.removeEventListener('orientationchange', this._mqFn); }
      if (window.__n1m4 && window.__n1m4.destroy) { try { window.__n1m4.destroy(); } catch (e) {} window.__n1m4 = null; }
      if (window.__n1v4 && window.__n1v4.destroy) { try { window.__n1v4.destroy(); } catch (e) {} window.__n1v4 = null; }
      document.querySelectorAll('link[data-n1s-poster]').forEach(function (l) { l.remove(); });
      var rcss = document.querySelector('link[data-n1s-css$="n1-home-m5.css"]'); if (rcss) rcss.remove();
      if (this._mo) this._mo.disconnect();
      // Kaldırılan öğeler ayrı (sayfa dışı) bir kapta tutulur; bunlara bağlı tetikleyiciler hemen ve SplitText'in
      // gecikmeli yeniden bölmeleri için kısa aralıklarla birkaç kez daha temizlenir (sürekli döngü değil, 4 sefer).
      var grave = document.createElement('div');
      while (this.firstChild) grave.appendChild(this.firstChild);
      (this._owned || []).forEach(function (n) { grave.appendChild(n); });
      var sweep = function () {
        if (!window.ScrollTrigger) return;
        window.ScrollTrigger.getAll().forEach(function (t) {
          var tr = t.trigger, pn = t.pin;
          if ((tr && grave.contains(tr)) || (pn && grave.contains(pn)) || (!self._stBefore.has(t) && tr && !document.contains(tr))) t.kill(true);
        });
        if (window.gsap) { try { window.gsap.killTweensOf(grave.querySelectorAll('*')); } catch (e) {} }
      };
      sweep(); [60, 400, 1500, 4000].forEach(function (ms) { setTimeout(sweep, ms); });
      // Header, yüzen kontroller ve imleçler yukarıda kaba taşındı (Header kendi panelini ve dinleyicilerini temizler)
      document.querySelectorAll('[data-n1-owner="' + TAG + '"]').forEach(function (n) { if (!self.contains(n)) n.remove(); });
      if (this._tracker) { this._tracker.stop(true); this._tracker = null; }
      this._restoreSticky();
      // modüllerin html'e eklediği sınıflar (has-scroll-highlight) geri alınır
      var keep = this._htmlClasses || [];
      [].slice.call(document.documentElement.classList).forEach(function (c) { if (keep.indexOf(c) < 0) document.documentElement.classList.remove(c); });
      if (this._htmlStyle == null) document.documentElement.removeAttribute('style'); else document.documentElement.setAttribute('style', this._htmlStyle);
      document.querySelectorAll('script[data-n1s]').forEach(function (s) { s.remove(); });
      if (this._diagEl) { this._diagEl.remove(); this._diagEl = null; }
      delete window.__n1SiteDiag;
    }

    /* ---------- tanılama (yalnızca okur; Wix öğelerini değiştirmez) ---------- */
    _queueDiag() {
      if (this._dq) return; this._dq = true; var self = this;
      this._diagRaf = requestAnimationFrame(function () { self._dq = false; self._diagnose(); });
    }
    _diagnose() {
      if (!this._on) return;
      var r = this.getBoundingClientRect(), p = this.parentElement, ST = window.ScrollTrigger;
      var kids = [].slice.call(this.children), sum = 0;
      kids.forEach(function (k) { var cs = getComputedStyle(k); if (cs.position !== 'fixed' && cs.position !== 'absolute') sum += k.getBoundingClientRect().height; });
      var out = {
        selfH: Math.round(r.height), parentH: p ? Math.round(p.getBoundingClientRect().height) : null, childrenH: Math.round(sum),
        afterRoot: Math.round(document.documentElement.scrollHeight - (r.bottom + scrollY)),
        pins: ST ? ST.getAll().filter(function (t) { return t.pin; }).map(function (t) { var sp = t.pin.parentElement; return { start: Math.round(t.start), end: Math.round(t.end), spacer: sp && sp.classList.contains('pin-spacer') ? Math.round(sp.getBoundingClientRect().height) : null }; }) : [],
        triggers: ST ? ST.getAll().length : 0, listeners: this._tracker ? this._tracker.recs.length : 0,
        bodyOwned: document.querySelectorAll('body > [data-n1-owner="' + TAG + '"]').length,
        headers: document.querySelectorAll('n1-header').length, floating: document.querySelectorAll('n1-floating-controls').length,
        sticky: [], clipped: [], readyMs: this._readyMs || null, notes: notes.slice()
      };
      for (var a = this.parentElement; a && a !== document.documentElement; a = a.parentElement) {
        var cs = getComputedStyle(a), nm = a.tagName.toLowerCase() + (a.id ? '#' + a.id : '');
        if (/(hidden|auto|scroll)/.test(cs.overflowX + ' ' + cs.overflowY)) out.sticky.push(nm + ' overflow:' + cs.overflowX + '/' + cs.overflowY);
        if (a.getBoundingClientRect().height + 1 < out.selfH && /(hidden|clip)/.test(cs.overflowY)) out.clipped.push(nm);
      }
      if (this.hasAttribute('sticky-fix') && !(this._stickyFixed && this._stickyFixed.length)) this._applySticky();
      this.diag = out; window.__n1SiteDiag = out;
      if (this.hasAttribute('debug')) {
        if (!this._diagEl) { this._diagEl = document.createElement('div'); this._diagEl.className = 'n1s-diag'; document.body.appendChild(this._diagEl); }
        var ok = function (b) { return b ? '✓' : '⚠'; };
        this._diagEl.textContent = 'n1-site-v1 tanılama\n' +
          'bileşen: ' + out.selfH + ' px · kapsayıcı: ' + out.parentH + ' px ' + ok(out.parentH == null || Math.abs(out.parentH - out.selfH) <= 2) + '\n' +
          'bölümler toplamı: ' + out.childrenH + ' px ' + ok(Math.abs(out.childrenH - out.selfH) <= 2) + ' · bileşenden sonra sayfa: ' + out.afterRoot + ' px\n' +
          'pin: ' + (out.pins.map(function (q) { return q.start + '→' + q.end + ' (spacer ' + q.spacer + ')'; }).join(', ') || 'yok') + '\n' +
          'ScrollTrigger: ' + out.triggers + ' · dinleyici kaydı: ' + out.listeners + ' · header: ' + out.headers + ' · yüzen: ' + out.floating + '\n' +
          'sticky\'yi bozabilecek üst öğe: ' + (out.sticky.length ? '\n  ⚠ ' + out.sticky.join('\n  ⚠ ') : 'yok ✓') + '\n' +
          'kesen üst öğe: ' + (out.clipped.length ? out.clipped.join(', ') + ' ⚠' : 'yok ✓') +
          (out.readyMs ? '\nmodüller hazır: ' + out.readyMs + ' ms' : '') + (out.notes.length ? '\nnot: ' + out.notes.join(' | ') : '');
      } else if (this._diagEl) { this._diagEl.remove(); this._diagEl = null; }
    }
    _applySticky() {
      this._stickyFixed = [];
      for (var a = this.parentElement; a && a !== document.body && a !== document.documentElement; a = a.parentElement) {
        var cs = getComputedStyle(a);
        ['overflowX', 'overflowY'].forEach(function (pr) { if (/(hidden|auto|scroll)/.test(cs[pr])) { this._stickyFixed.push([a, pr, a.style[pr]]); a.style[pr] = 'clip'; } }, this);
      }
    }
    _restoreSticky() { (this._stickyFixed || []).forEach(function (r) { r[0].style[r[1]] = r[2]; }); this._stickyFixed = []; }
  }

  customElements.define(TAG, N1SiteV1);
})();
