/*!
 * n1-site-wix-v648 — 1N Digital Media ana sayfası · Wix Studio Custom Element (canlı adayı, menü sadeleştirildi)
 * Referans: v6.47 Ronin ve onaylı bölüm modülleri (korundu). Ronin + Header test paketi (n1-site-test) ile aynı yaklaşım; ondan bağımsız çalışır.
 * Wix ortamında HENÜZ DOĞRULANMADI (yalnızca yerel Wix benzetiminde test edildi).
 *
 * Wix Studio → Custom Element
 *   Tag name: n1-site-v1      Kaynak: bu dosyanın HTTPS adresi
 *   Öznitelikler:
 *     assets-base  Aktarım görsellerinin klasörü (img/…, media/…), sonu "/"            — ZORUNLU
 *     ronin-base   Ronin .bin paketleri ve posterlerinin klasörü (Aşama 03'te kullanılan) — ZORUNLU
 *     code-base    (isteğe bağlı) modules/ ve site/ klasörlerinin kökü. Verilmezse bu dosyanın adresinden bulunur.
 *     debug        (isteğe bağlı) tanılama paneli
 *     sticky-fix   VARSAYILAN KAPALI. Yalnızca tanılama bir sorunu doğrular ve ayrıca onaylanırsa.
 *
 * Akış (tek giriş noktası, modüller ayrı dosyalarda ve v6.47 sırasıyla):
 *   1 fontlar + kapsamlı site CSS'i + modül CSS'leri (head'e bir kez)   2 sayfa iskeleti (site/n1-site-markup-v1.js)
 *   3 Header ve yüzen kontroller body'ye (v6.47'deki gibi body seviyesinde)   4 Ronin (v6.47 öznitelikleri, .bin)
 *   5 GSAP 3.13.0 → ScrollTrigger → SplitText (yalnızca yoksa, bir kez)   6 modüller sırayla   7 fontlar hazır → tek refresh
 *   Kaldırılınca: ScrollTrigger'lar, modül olay dinleyicileri, body'ye eklenen öğeler, eklenen stiller ve html sınıfları temizlenir.
 */
(function () {
  'use strict';
  var TAG = 'n1-site-v1';
  if (customElements.get(TAG)) return;

  var SELF_SRC = (document.currentScript && document.currentScript.src) ||
    (function () { var s = [].slice.call(document.scripts).filter(function (x) { return /n1-site-wix-v648\.js(\?|$)/.test(x.src); }); return s.length ? s[s.length - 1].src : ''; })();

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
    if (!fresh) loaded[src] = p;
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

  var BODY_OWN = /^(n1|rh6)/;   // modüllerin body'ye eklediği öğeler: .n1h-panel, .n1fc…, .n1b-cursor, .n1sr-cursor

  class N1SiteV1 extends HTMLElement {
    static get observedAttributes() { return ['assets-base', 'ronin-base', 'debug', 'sticky-fix']; }

    connectedCallback() {
      if (this._on) return;
      if (document.querySelector(TAG + '[data-n1s-live]')) { diagNote('Sayfada ikinci bir <n1-site-v1> var; yalnızca ilki çalışır.'); return; }
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
      return { code: code, assets: slash(this.getAttribute('assets-base')) || "https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@d24fa373d6d76c0218b3f3b77897a8c2ace04e5e/wix-full-v1/aktarim-medya/", ronin: slash(this.getAttribute('ronin-base')) || "https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@d24fa373d6d76c0218b3f3b77897a8c2ace04e5e/wix-v647/media/" };
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
      var cssDone = Promise.all([loadCss(B.code + 'site/n1-site-base-v1.css')].concat(ORDER.css.map(function (f) { return loadCss(B.code + 'modules/' + f); })));
      var markupDone = loadScript("https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@d24fa373d6d76c0218b3f3b77897a8c2ace04e5e/wix-home-v648/site/n1-site-markup-v648.js");

      Promise.all([cssDone, markupDone]).then(function () {
        if (!self._on) return;
        self._render();
        return ensureGsap(ORDER.gsap);
      }).then(function () {
        if (!self._on) return;
        // modüller v6.47 sırasıyla; bölüm modülleri (IIFE) her bağlanışta yeniden çalışır
        return ORDER.js.reduce(function (p, f) {
          return p.then(function () { if (self._on) return loadScript(f === 'n1-header-v613.js' ? "https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@d24fa373d6d76c0218b3f3b77897a8c2ace04e5e/wix-home-v648/modules/n1-header-v648.js" : B.code + 'modules/' + f, true); });
        }, Promise.resolve());
      }).then(function () {
        if (!self._on) return;
        scopeHeaderCss();
        self._ready();
      }).catch(function (e) { diagNote(String(e && e.message || e)); self._queueDiag(); });
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
        document.body.appendChild(el); self._owned.push(el);     // v6.47'de de body'nin doğrudan çocuğuydu
      });
      // Ronin: v6.47 oluşturma betiğiyle aynı öznitelikler; paketler .bin, posterler doğrudan <img>
      var tier = innerWidth * (devicePixelRatio || 1) > 1700 ? 'x' : 'd';
      var D = tier === 'x' ? RONIN.Bx : RONIN.Bd, M = RONIN.m;
      var el = document.createElement('ronin-hero-v67');
      var at = { id: 'hero', 'frames-base': B.ronin, 'fade-color': '#080A09', 'scroll-vh': '300', 'stage-weights': '9,33,22,27,9', 'smooth-ms': '30',
        accent: matchMedia('(max-width: 900px)').matches ? '#A1FF00' : '#93C25A', 'cta-href': '#iletisim', 'edge-top': '#040404', 'edge-mid': '#080808', 'edge-bottom': '#101010',
        'pack-d': D.packs.join(','), 'poster-d': D.poster, 'pack-m': M.packs.join(','), 'poster-m': M.poster };
      for (var k in at) el.setAttribute(k, at[k]);
      el.dataset.fogMid = '0';
      var slot = frag.querySelector('#heroSlot'); if (slot) slot.replaceWith(el);
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
      this._queueDiag();
    }

    _note(t) { this._clearNote(); var n = this._noteEl = document.createElement('p'); n.className = 'n1s-note'; n.textContent = t; this.appendChild(n); }
    _clearNote() { if (this._noteEl) { this._noteEl.remove(); this._noteEl = null; } }

    disconnectedCallback() {
      if (!this._on) return;
      this._on = false; this.removeAttribute('data-n1s-live');
      var ST = window.ScrollTrigger, self = this;
      if (this._ro) this._ro.disconnect(); clearTimeout(this._roT); cancelAnimationFrame(this._diagRaf);
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
