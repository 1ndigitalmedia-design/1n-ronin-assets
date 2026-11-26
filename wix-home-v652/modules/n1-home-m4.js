/*!
 * n1-home-m4 — 1N Digital Media · ana sayfa MOBİL / TABLET hareket katmanı (v6.52 / Creative Experience V1.4)
 * Yalnızca mobil/tablet profilinde yüklenir. Tek örnek: window.__n1m4 (destroy() her şeyi bırakır).
 * Masaüstü modüllerine dokunmaz; GSAP/ScrollTrigger yoksa içerik statik ve tam görünür kalır.
 *
 *  1  Header ölçüsü → --m4-hb (hero film alanı ve sticky sahneler Header'ın gerçek alt kenarına hizalanır)
 *  2  Hero sahne yazıları: EKRANDA ÇİZİLEN karenin zamanına bağlı (n1-video-m4 'm4:time'); maskeli satır geçişi.
 *     Perde: sonraki bölüm hero'nun üstüne kayarken film hafifçe kararır; tamamen örtülünce video durur.
 *  3  Giriş hareketleri: başlık satırları maskeden yükselir, listeler çizgiyle birlikte sırayla gelir (bir kez, IO).
 *  4  Manifesto: kaydırdıkça kelimeler sırayla aydınlanır (geri alınabilir; scrub yok, ilerleme okunur).
 *  5  Digital Ecosystem: sticky sahne; dikey kaydırma yatay şeridi ilerletir ve projeyi değiştirir; dokunma/klavye ile seçim.
 *  6  Markalar: gerçek dokunmatik yatay kaydırma + oklar + ilerleme çizgisi.
 *  7  İstatistikler: N1_METRICS doğrulaması + sayaç (genişlik kilitli).   8  Footer partner görseli (V1.2–V1.3 ile aynı).
 */
(function () {
  'use strict';
  var host = document.querySelector('n1-site-v1[data-n1-profile]');
  if (!host || host.getAttribute('data-n1-profile') === 'd') return;
  if (window.__n1m4 && window.__n1m4.destroy) { try { window.__n1m4.destroy(); } catch (e) {} }
  var G = window.gsap, ST = window.ScrollTrigger;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var motion = !reduce && !!G && !!ST;
  var offs = [], triggers = [], observers = [], timers = [], tweens = [], state = {};
  function on(t, ev, fn, o) { t.addEventListener(ev, fn, o); offs.push(function () { t.removeEventListener(ev, fn, o); }); }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function $(s, r) { return (r || host).querySelector(s); }
  function $$(s, r) { return [].slice.call((r || host).querySelectorAll(s)); }
  on(document, 'touchstart', function () {}, { passive: true });   // iOS :active
  host.classList.add('m4-js'); offs.push(function () { host.classList.remove('m4-js'); });   // etkileşimli durumlar (etkin marka, kontur → dolu, sahne) yalnızca bu katman çalışınca
  if (motion) { host.classList.add('m4-motion'); offs.push(function () { host.classList.remove('m4-motion'); }); }

  /* ---------- 1 · Header alt kenarı ---------- */
  function headerBottom() {
    var bar = document.querySelector('n1-header[data-n1-hp] .n1h-bar:not([data-n1m-ph])') || document.querySelector('n1-header .n1h-bar');
    var b = bar ? Math.round(bar.getBoundingClientRect().bottom) : 0;
    return b > 20 && b < 200 ? b : 0;
  }
  function setHb() { var b = headerBottom(); if (b) host.style.setProperty('--m4-hb', b + 'px'); state.hb = b; }
  setHb(); timers.push(setTimeout(setHb, 400), setTimeout(setHb, 1400));
  offs.push(function () { host.style.removeProperty('--m4-hb'); });

  /* ---------- 2 · Hero ---------- */
  (function hero() {
    var root = $('.m4-hero'); if (!root) return;
    var scenes = $$('.m4-sc', root), box = $('.m4-scenes', root), idxEl = $('.m4-sc-i', root), prog = $('.m4-hero-prog i', root);
    // harfler: her karakter ayrı span (maskeden yükselir). Ekran okuyucu metni .m4-sr'de tek ve sabit.
    scenes.forEach(function (sc) {
      var w = $('.m4-sc-w', sc);
      (function split(node) {
        [].slice.call(node.childNodes).forEach(function (c) {
          if (c.nodeType === 3) { var f = document.createDocumentFragment(); c.textContent.split('').forEach(function (ch) { var sp = document.createElement('span'); sp.className = 'm4-ch'; sp.textContent = ch === ' ' ? ' ' : ch; f.appendChild(sp); }); c.replaceWith(f); }
          else if (c.nodeType === 1) split(c);
        });
      })(w);
    });
    // genişliğe sığdırma: her sahne kelimesi bandın tam genişliğini doldurur (100 px'te ölçülür, orantılanır)
    // CSS sahne boyutlarını ölçülmüş oranlarla kesin verir (CLS 0). Burada yalnızca yazı tipi metriği farklı çıkarsa (>%1,5) düzeltilir.
    function fit() {
      var avail = box.clientWidth; if (!avail) return;
      scenes.forEach(function (sc) {
        sc.style.fontSize = ''; var cur = parseFloat(getComputedStyle(sc).fontSize) || 0, w = $('.m4-sc-w', sc).getBoundingClientRect().width || 1;
        if (w > avail * 1.002 || (w < avail * 0.97 && cur < innerHeight * (innerWidth > innerHeight ? 0.2 : 0.16) - 1)) sc.style.fontSize = Math.floor(cur * avail / w * 0.995) + 'px';
      });
    }
    fit(); if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
    on(window, 'resize', function () { clearTimeout(fit.t); fit.t = setTimeout(fit, 150); });
    offs.push(function () { clearTimeout(fit.t); scenes.forEach(function (sc) { sc.style.fontSize = ''; }); });
    // sahne zamanları kaynak filmin karelerine göre (18,04 sn): BRANDING kılıç çekilirken; CREATIVE film içi geçiş efektiyle (≈4,5 sn)
    // birlikte; THINK BEYOND kol sola uzanırken; CREATE IMPACT yakın plandan geniş plana geçişte.
    var PLAN = [['branding', 0], ['creative', 4.5], ['think', 9.3], ['create', 12.8]], DUR = 18.04;
    var cur = '', busy = null;
    function sceneAt(t) { var k = PLAN[0][0]; PLAN.forEach(function (p) { if (t >= p[1]) k = p[0]; }); return k; }
    function el(k) { return scenes.filter(function (s) { return s.getAttribute('data-sc') === k; })[0]; }
    function show(k, instant) {
      if (k === cur) return; var prev = cur && el(cur), next = el(k); cur = k; root.setAttribute('data-scene', k);
      var n = PLAN.map(function (p) { return p[0]; }).indexOf(k) + 1; if (idxEl) idxEl.textContent = '0' + n;
      if (!next) return;
      if (!motion || instant) { scenes.forEach(function (s) { s.classList.toggle('is-on', s === next); }); return; }
      if (busy) busy.progress(1);
      var tl = G.timeline();
      if (prev) tl.to($$('.m4-ch', prev), { yPercent: -112, duration: 0.38, ease: 'power3.in', stagger: 0.012 }).call(function () { prev.classList.remove('is-on'); });
      tl.call(function () { next.classList.add('is-on'); })
        .fromTo($$('.m4-ch', next), { yPercent: 112 }, { yPercent: 0, duration: 0.9, ease: 'expo.out', stagger: 0.028 }, prev ? '-=0.06' : 0);
      busy = tl; tweens.push(tl);
    }
    if (motion) { show('branding', true); G.fromTo($$('.m4-ch', el('branding')), { yPercent: 112 }, { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.035, delay: 0.2 });
      G.fromTo($$('.m4-sl', root), { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.9, ease: 'expo.out', stagger: 0.08, delay: 0.1 }); }
    else show('branding', true);
    if (!reduce) on(root, 'm4:time', function (e) { var t = e.detail.t; show(sceneAt(t)); if (prog) prog.style.transform = 'scaleX(' + Math.min(1, t / DUR).toFixed(4) + ')'; });
    state.hero = { scene: function () { return cur; }, plan: PLAN, fit: fit };

    // Perde: sonraki bölüm (kâğıt) üstüne gelirken film kararır ve hafifçe geri çekilir; tamamen örtülünce video durur
    var next = root.nextElementSibling, shade = $('.m4-film-shade', root), filmBox = $('.m4-film-box', root);
    if (!next) return;
    function covered(p) { var api = root.__n1v4; if (api && api.setVisible) api.setVisible(!p); }
    if (ST) {
      triggers.push(ST.create({ trigger: next, start: 'top bottom', end: function () { return 'top ' + (state.hb || 60) + 'px'; },
        onUpdate: function (self) { if (!motion) return; if (shade) shade.style.opacity = (self.progress * 0.75).toFixed(3); if (filmBox) filmBox.style.transform = 'scale(' + (1 - self.progress * 0.06).toFixed(4) + ')'; },
        onLeave: function () { covered(true); }, onEnterBack: function () { covered(false); } }));
    } else {
      var io = new IntersectionObserver(function (es) { es.forEach(function (en) { covered(en.boundingClientRect.top <= (state.hb || 60) + 2 && en.isIntersecting); }); }, { threshold: [0, 0.5, 1] });
      io.observe(next); observers.push(io);
    }
    offs.push(function () { if (shade) shade.style.opacity = ''; if (filmBox) filmBox.style.transform = ''; scenes.forEach(function (s) { s.classList.remove('is-on'); }); });
  })();

  /* ---------- 2b · Hizmetler cümlesi: kelimeler kaydırdıkça mürekkep tonuna döner (bağlantılar korunur) ---------- */
  (function services() {
    var p = $('.m4-svc-text'); if (!p || !motion) return;
    var tw = document.createTreeWalker(p, NodeFilter.SHOW_TEXT), list = [];
    while (tw.nextNode()) if (tw.currentNode.textContent.trim()) list.push(tw.currentNode);
    var words = [];
    list.forEach(function (n) {
      var f = document.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach(function (w) { if (!w) return; if (/^\s+$/.test(w)) { f.appendChild(document.createTextNode(w)); return; } var s = document.createElement('span'); s.className = 'm4-wd'; s.textContent = w; f.appendChild(s); words.push(s); });
      n.replaceWith(f);
    });
    var lit = -1;
    function paint(pr) { var n = Math.round(pr * words.length); if (n === lit) return; lit = n; words.forEach(function (w, i) { w.classList.toggle('is-lit', i < n); }); }
    triggers.push(ST.create({ trigger: p, start: 'top 86%', end: 'bottom 58%', onUpdate: function (s) { paint(s.progress); }, onRefresh: function (s) { paint(s.progress); } }));
    state.services = { words: words.length, lit: function () { return lit; } };
  })();

  /* ---------- 3 · Giriş hareketleri (bir kez) ---------- */
  (function reveals() {
    if (!motion) return;
    // başlıklar: satır/parça başına maske
    $$('.m4-main .m4-h2, .m4-ct-title').forEach(function (h) {
      var parts = $$(':scope > span', h);
      if (!parts.length) { var t = h.textContent; h.textContent = ''; var s = document.createElement('span'); s.textContent = t; h.appendChild(s); parts = [s]; }
      parts.forEach(function (p) { var m = document.createElement('span'); m.className = 'm4-mask'; p.parentNode.insertBefore(m, p); m.appendChild(p); p.style.transitionDelay = (parts.indexOf(p) * 80) + 'ms'; });
      h.setAttribute('data-m4-mask', '');
    });
    $$('.m4-main .m4-eye:not(.m4-eye--paper), .m4-eco-lead, .m4-sx-desc, .m4-pk-cert, .m4-ai-note, .m4-ai-line, .m4-ct-desc, .m4-ct .m4-cta, .m4-mf .m4-link, .m4-br-head .m4-link, .m4-svc-foot').forEach(function (e) { e.setAttribute('data-m4-rise', ''); });
    $$('.m4-ai-list').forEach(function (l) { $$(':scope > li', l).forEach(function (li, i) { li.style.setProperty('--i', Math.min(i, 12)); }); });
    var targets = $$('[data-m4-rise], [data-m4-mask], .m4-pk-list, .m4-st-list, .m4-ai-list');
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -12% 0px' });
    targets.forEach(function (t) { io.observe(t); }); observers.push(io);
    offs.push(function () { targets.forEach(function (t) { t.classList.remove('is-in'); t.removeAttribute('data-m4-rise'); }); });
  })();

  /* ---------- 4 · Manifesto kelime aydınlatma ---------- */
  (function manifesto() {
    var root = $('.m4-mf'); if (!root || !motion) return;
    var words = $$('.m4-w', root); if (!words.length) return;
    root.classList.add('is-lit-ready'); var lit = -1;
    function paint(p) { var n = Math.round(p * words.length); if (n === lit) return; lit = n; words.forEach(function (w, i) { w.classList.toggle('is-lit', i < n); }); }
    triggers.push(ST.create({ trigger: $('.m4-mf-text', root), start: 'top 82%', end: 'bottom 52%', onUpdate: function (s) { paint(s.progress); }, onRefresh: function (s) { paint(s.progress); } }));
    state.manifesto = { words: words.length, lit: function () { return lit; } };
    offs.push(function () { root.classList.remove('is-lit-ready'); words.forEach(function (w) { w.classList.remove('is-lit'); }); });
  })();

  /* ---------- 5 · Digital Ecosystem ---------- */
  (function eco() {
    var root = $('.m4-eco'); if (!root) return;
    var P = window.N1_ECOSYSTEM, track = $('.m4-eco-track', root); if (!Array.isArray(P) || !P.length || !track) return;
    var N = P.length, info = $('.m4-eco-info', root), pin = $('.m4-eco-pin', root), stage = $('.m4-eco-stage', root), strip = $('.m4-eco-strip', root), bar = $('.m4-eco-prog i', root);
    var nm = $('.m4-eco-name', root), ds = $('.m4-eco-desc', root), cnt = $('.m4-eco-count', root), dom = $('.m4-eco-domain', root), cta = $('.m4-eco-cta', root);
    function pad(i) { return (i < 9 ? '0' : '') + (i + 1); }
    track.innerHTML = P.map(function (p, i) {
      var lg = p.logo || {};
      return '<li class="m4-eco-it"><button type="button" class="m4-eco-btn" data-i="' + i + '" aria-label="' + (p.label || p.name) + '">' +
        '<span class="m4-eco-fig" data-n="' + pad(i) + '"><span class="m4-eco-logo" style="--logo-src:url(&quot;' + (lg.local || '') + '&quot;);--logo-k:' + (lg.scale || 1) + '"></span></span>' +
        '<span class="m4-eco-cap"><span translate="no">' + p.name + '</span><span aria-hidden="true">↗</span></span></button></li>';
    }).join('');
    var items = $$('.m4-eco-it', track), cur = -1, swapT = 0;
    function select(i, instant) {
      i = clamp(i, 0, N - 1); if (i === cur) return; cur = i; var p = P[i];
      items.forEach(function (it, k) { it.setAttribute('aria-current', k === i ? 'true' : 'false'); });
      function write() {
        nm.textContent = p.label || p.name; if (p.lang) nm.setAttribute('lang', p.lang); else nm.removeAttribute('lang');
        ds.textContent = p.desc || ''; cnt.textContent = pad(i) + ' / ' + pad(N - 1);
        dom.textContent = p.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
        cta.href = p.url; cta.setAttribute('aria-label', (cta.textContent.trim()) + ': ' + (p.label || p.name) + ' (yeni sekmede açılır)');
      }
      clearTimeout(swapT);
      if (!motion || instant) { write(); info.classList.remove('is-swap'); return; }
      info.classList.add('is-swap'); swapT = setTimeout(function () { write(); info.classList.remove('is-swap'); }, 180);
    }
    select(0, true);
    var stepPx = 0, st = null, lock = 0;
    function shift(p) {
      var max = Math.max(0, track.scrollWidth - strip.clientWidth);
      track.style.transform = 'translate3d(' + (-p * max).toFixed(1) + 'px,0,0)';
      if (bar) bar.style.transform = 'scaleX(' + (0.12 + p * 0.88).toFixed(3) + ')';
    }
    function geom() {
      var vh = innerHeight, hb = state.hb || 60, fits = stage.offsetHeight + hb + 24 <= vh;
      stepPx = Math.round(clamp(vh * 0.3, 150, 260));
      var staticMode = !motion || !fits;
      root.classList.toggle('is-static', staticMode);
      pin.style.height = staticMode ? '' : (stage.offsetHeight + stepPx * (N - 1)) + 'px';
      return staticMode;
    }
    var staticMode = geom();
    if (!staticMode) {
      st = ST.create({ trigger: pin, start: function () { return 'top ' + ((state.hb || 60) + 12) + 'px'; }, end: function () { return '+=' + stepPx * (N - 1); },
        onUpdate: function (self) { shift(self.progress); if (!lock) select(Math.round(self.progress * (N - 1))); },
        onRefresh: function (self) { shift(self.progress); } });
      triggers.push(st);
    } else if (bar) bar.style.transform = 'scaleX(1)';
    function go(i) {
      select(i);
      if (st) { lock = 1; clearTimeout(go.t); go.t = setTimeout(function () { lock = 0; }, 900);
        scrollTo({ top: st.start + i * stepPx + 1, behavior: reduce ? 'auto' : 'smooth' }); }
      else { var it = items[i]; if (it && strip.scrollTo) strip.scrollTo({ left: it.offsetLeft - 0, behavior: reduce ? 'auto' : 'smooth' }); }
    }
    on(track, 'click', function (e) { var b = e.target.closest('.m4-eco-btn'); if (b) go(+b.getAttribute('data-i')); });
    on(track, 'keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return; e.preventDefault();
      var i = clamp(cur + (e.key === 'ArrowRight' ? 1 : -1), 0, N - 1); go(i); var b = $$('.m4-eco-btn', track)[i]; if (b) b.focus({ preventScroll: true });
    });
    on(window, 'resize', function () { clearTimeout(eco.t); eco.t = setTimeout(function () { geom(); if (ST) ST.refresh(); }, 250); });
    state.eco = { current: function () { return cur; }, step: function () { return stepPx; }, trigger: function () { return st; }, isStatic: function () { return root.classList.contains('is-static'); }, go: go };
    offs.push(function () { clearTimeout(swapT); clearTimeout(go.t); clearTimeout(eco.t); pin.style.height = ''; track.style.transform = ''; root.classList.remove('is-static'); });
  })();

  /* ---------- 6 · Markalar ---------- */
  (function brands() {
    var root = $('.m4-br'); if (!root) return;
    var vp = $('.m4-br-vp', root), bar = $('.m4-br-prog i', root), bP = $('.m4-br-b[data-d="-1"]', root), bN = $('.m4-br-b[data-d="1"]', root);
    if (!vp) return;
    function step() { var it = $('.m4-br-it', vp); if (!it) return vp.clientWidth * 0.8; return it.getBoundingClientRect().width + (parseFloat(getComputedStyle(it).marginRight) || 0); }
    var raf = 0;
    var its = $$('.m4-br-it', vp), cntEl = $('.m4-br-cnt', root), act = -1;
    function pad2(i) { return (i < 9 ? '0' : '') + (i + 1); }
    function upd() {
      raf = 0; var max = vp.scrollWidth - vp.clientWidth, p = max > 0 ? vp.scrollLeft / max : 1;
      // etkin marka: sol kenara (kaydırma dolgusu) en yakın öğe; sona gelince son öğe
      var x0 = vp.getBoundingClientRect().left + (parseFloat(getComputedStyle(vp).scrollPaddingLeft) || 0), best = 0, bd = 1e9;
      its.forEach(function (it, i) { var d = Math.abs(it.getBoundingClientRect().left - x0); if (d < bd) { bd = d; best = i; } });
      if (p > 0.995) best = its.length - 1;
      if (best !== act) { act = best; its.forEach(function (it, i) { it.classList.toggle('is-active', i === act); }); if (cntEl) cntEl.textContent = pad2(act) + ' / ' + pad2(its.length - 1); }
      if (bar) bar.style.transform = 'scaleX(' + (0.1 + p * 0.9).toFixed(3) + ')';
      if (bP) bP.disabled = vp.scrollLeft <= 2; if (bN) bN.disabled = vp.scrollLeft >= max - 2;
    }
    on(vp, 'scroll', function () { if (!raf) raf = requestAnimationFrame(upd); }, { passive: true });
    on(root, 'click', function (e) { var b = e.target.closest('.m4-br-b'); if (!b) return; vp.scrollBy({ left: +b.getAttribute('data-d') * step(), behavior: (reduce || e.detail === 0) ? 'auto' : 'smooth' }); });
    on(window, 'resize', upd); upd();
    state.brands = { vp: vp, update: upd };
    offs.push(function () { cancelAnimationFrame(raf); });
  })();

  /* ---------- 6b · Partnerlikler: satır ekranın alt üçte birinden geçince kontur → dolu (geri alınabilir) ---------- */
  (function partners() {
    var rows = $$('.m4-pk-row'); if (!rows.length) return;
    if (!motion) { rows.forEach(function (r) { r.classList.add('is-lit'); }); return; }
    rows.forEach(function (r) { triggers.push(ST.create({ trigger: r, start: 'top 72%', toggleClass: { targets: r, className: 'is-lit' } })); });
    offs.push(function () { rows.forEach(function (r) { r.classList.remove('is-lit'); }); });
  })();

  /* ---------- 7 · İstatistikler: N1_METRICS doğrulaması + kaydırmaya bağlı sayaç ---------- */
  (function stats() {
    var root = $('[data-n1m-stats]'); if (!root) return;
    var rows = $$('.m4-st-it', root); if (!rows.length) return;
    var M = window.N1_METRICS;
    if (Array.isArray(M) && M.length === rows.length) M.forEach(function (m, i) {
      var r = rows[i], v = $('.m4-st-val', r), pl = $('.m4-st-plus', r), lb = $('.m4-st-label', r), sr = $('.m4-sr', r), un = $('.m4-st-unit', r);
      if (m.unit && !un) { un = document.createElement('span'); un.className = 'm4-st-unit'; v.parentNode.insertBefore(un, pl); }
      if (un) un.textContent = m.unit || '';
      v.textContent = String(m.value); v.setAttribute('data-value', String(m.value));
      if (pl) pl.textContent = m.plus ? '+' : ''; if (lb) lb.textContent = m.label;
      if (sr) sr.textContent = m.value + (m.unit || '') + (m.plus ? '+' : '') + ' ' + m.label;
    });
    var vals = rows.map(function (r) { return $('.m4-st-val', r); });
    function lock() { vals.forEach(function (v) { v.style.minWidth = ''; var t = v.textContent; v.textContent = v.getAttribute('data-value'); v.style.minWidth = Math.ceil(v.getBoundingClientRect().width) + 'px'; v.textContent = t; }); }
    lock(); if (document.fonts && document.fonts.ready) document.fonts.ready.then(lock);   // son değerin genişliği: sayaç boyunca hizalama sabit
    state.stats = { values: vals.map(function (v) { return v.getAttribute('data-value'); }) };
    if (!motion) return;
    vals.forEach(function (v) {
      var end = +v.getAttribute('data-value'); if (!/^\d+$/.test(v.getAttribute('data-value'))) return;
      var last = -1;
      triggers.push(ST.create({ trigger: v.closest('.m4-st-it'), start: 'top 96%', end: 'top 52%',
        onUpdate: function (self) { var e = 1 - Math.pow(1 - self.progress, 3), n = Math.round(end * e); if (n !== last) { last = n; v.textContent = String(n); } },
        onRefresh: function (self) { var n = Math.round(end * (1 - Math.pow(1 - self.progress, 3))); last = n; v.textContent = String(n); } }));
    });
    offs.push(function () { vals.forEach(function (v) { v.textContent = v.getAttribute('data-value'); v.style.minWidth = ''; }); });
  })();

  /* ---------- 7b · Sektörler: okuma sırasında aydınlanma (scrub yok, ilerleme okunur; geri alınabilir) ---------- */
  (function sectors() {
    var list = $('.m4-sx-list'); if (!list || !motion) return;
    var items = $$('.m4-sx-it', list), lit = -1;
    function paint(p) { var n = Math.round(p * items.length); if (n === lit) return; lit = n; items.forEach(function (li, i) { li.classList.toggle('is-lit', i < n); }); }
    triggers.push(ST.create({ trigger: list, start: 'top 84%', end: 'bottom 60%', onUpdate: function (s) { paint(s.progress); }, onRefresh: function (s) { paint(s.progress); } }));
    state.sectors = { n: items.length, lit: function () { return lit; } };
    offs.push(function () { items.forEach(function (li) { li.classList.remove('is-lit'); }); });
  })();

  /* ---------- 8 · Footer partner görseli (V1.2–V1.3 ile aynı onaylı görseller) ---------- */
  (function footerArt() {
    var ft = host.querySelector('footer.n1ft') || document.querySelector('footer.n1ft');
    var list = ft && ft.querySelector('.n1ft-partners'); if (!list || ft.querySelector('.n1m-ftart')) return;
    var ART = { mobile: 'https://static.wixstatic.com/media/6dbf5e_32b849155e954320a1f6479f27fd6ad2~mv2.png',   // 1080×200
                tablet: 'https://static.wixstatic.com/media/6dbf5e_800ff5a00ba244f9bb31761a6b2d713d~mv2.png' };  // 1024×128
    var pic = document.createElement('picture'); pic.className = 'n1m-ftart';
    var src = document.createElement('source'); src.media = '(max-width: 767px)'; src.srcset = ART.mobile; src.width = 1080; src.height = 200;
    var img = document.createElement('img'); img.src = ART.tablet; img.width = 1024; img.height = 128;
    img.alt = '1N Digital Media iş ortakları ve sertifikalar: TikTok Marketing Partner, Meta Business Partner, Google Partner, Wix Partners, Wix Velo Certified';
    img.loading = 'lazy'; img.decoding = 'async';
    pic.append(src, img); list.parentNode.insertBefore(pic, list);
    ft.classList.add('n1m-art');
    var ok = function () { if (img.naturalWidth > 0) { ft.classList.add('n1m-art-ok'); list.setAttribute('aria-hidden', 'true'); } else fail(); };
    var fail = function () { ft.classList.remove('n1m-art', 'n1m-art-ok'); ft.classList.add('n1m-art-failed'); list.removeAttribute('aria-hidden'); pic.remove(); };
    img.addEventListener('load', ok, { once: true }); img.addEventListener('error', fail, { once: true });
    if (img.complete && img.naturalWidth) ok();
    state.footerArt = { img: img };
    offs.push(function () { if (pic.isConnected) pic.remove(); ft.classList.remove('n1m-art', 'n1m-art-ok', 'n1m-art-failed'); list.removeAttribute('aria-hidden'); });
  })();

  /* döndürme / boyut: Header ölçüsü ve tetikleyiciler yeniden */
  var rz = 0;
  on(window, 'resize', function () { clearTimeout(rz); rz = setTimeout(function () { setHb(); if (ST) ST.refresh(); }, 220); });
  on(window, 'orientationchange', function () { clearTimeout(rz); rz = setTimeout(function () { setHb(); if (ST) ST.refresh(); }, 350); });
  offs.push(function () { clearTimeout(rz); });
  if (ST) { var rf = requestAnimationFrame(function () { ST.refresh(); }); offs.push(function () { cancelAnimationFrame(rf); }); }

  window.__n1m4 = {
    state: state, motion: motion,
    destroy: function () {
      tweens.forEach(function (t) { try { t.kill(); } catch (e) {} }); tweens = [];
      triggers.forEach(function (t) { try { t.kill(); } catch (e) {} }); triggers = [];
      observers.forEach(function (o) { try { o.disconnect(); } catch (e) {} }); observers = [];
      timers.forEach(clearTimeout); timers = [];
      offs.forEach(function (f) { try { f(); } catch (e) {} }); offs = [];
    }
  };
})();
