/*!
 * n1-home-mobile-v2 — 1N Digital Media · ana sayfa MOBİL / TABLET bölüm katmanı (v6.50 / V1.2)
 * Yalnızca mobil/tablet profilinde (n1-site-v1[data-n1-profile="m"|"t"]) yüklenir; masaüstünde ağ isteği bile yapılmaz.
 * Bölüm modüllerinin (wix-full-v1, commit d24fa37) hiçbiri değişmedi; bu dosya onların ÜSTÜNE, yalnızca eksik mobil
 * davranışları ekler. Tek örnek: window.__n1m2 (yeniden kurulumda destroy() ile her şey bırakılır).
 *
 *  1  Markalar (Rev 13) — gerçek neden: n1-brands-v625.css ".n1b-viewport{touch-action:pan-y}" dokunmatik ekranda
 *     tarayıcının YATAY kaydırmasını kapatıyordu (masaüstü sürükleme için yazılmış kural). Modül dokunmatikte yerel
 *     kaydırmaya bıraktığı için parmakla sürükleme hiçbir şey yapmıyordu. Düzeltme CSS'te (touch-action:pan-x pan-y);
 *     burada yalnızca önceki/sonraki ok düğmeleri ve durumları eklenir (scroll-snap ile aynı adım).
 *  2  Digital Ecosystem (Rev 16) — gerçek neden: modül kaydırmaya bağlı proje geçişini (ScrollTrigger pin) yalnızca
 *     "(min-width:1024px)" koşulunda kurar; altında hiçbir kaydırma mekanizması yoktu (yalnızca tıklama). Burada
 *     pin YOK: sahne CSS position:sticky ile Header'ın altında durur, altına (N−1) adımlık doğal kaydırma payı eklenir,
 *     tek ScrollTrigger (scrub yok, yalnızca onUpdate) ilerlemeyi proje sırasına çevirir ve modülün kendi select()
 *     fonksiyonunu çağırır (sayaç, açıklama, adres, "Projeyi Keşfet" bağlantısı modülün kendi kodu ile birlikte değişir).
 *     İsme/numaraya dokunma: proje hemen seçilir ve sayfa o projenin kaydırma konumuna yumuşakça gider (kilit süresince
 *     kaydırma güncellemesi seçimi ezmez). Son projeden sonra sayfa doğal akışla devam eder; sıkışma yoktur.
 *  3  Sektörler (Rev 14) — "odak şeridi": ekranın ortasından geçen sektör öne çıkar (IntersectionObserver, kaydırma
 *     dinleyicisi yok). Bağlantı olmayan öğelere tıklanabilirlik eklenmez.
 *  4  Manifesto (Rev 15) — üç vuruşun satırları maskeden yükselir (GSAP + ScrollTrigger, bir kez).
 *  5  Footer partner görseli (Rev 18) — iç sayfalardaki onaylı yöntem: <picture> + (max-width:767px) mobil görsel,
 *     tablet görseli; lazy + async; yüklenemezse görsel kaldırılır ve mevcut beş logo görünür kalır.
 *  6  iOS :active dokunma geri bildirimi için tek pasif touchstart dinleyicisi.
 */
(function () {
  'use strict';
  var host = document.querySelector('n1-site-v1[data-n1-profile]');
  if (!host || host.getAttribute('data-n1-profile') === 'd') return;
  if (window.__n1m2 && window.__n1m2.destroy) { try { window.__n1m2.destroy(); } catch (e) {} }
  var G = window.gsap, ST = window.ScrollTrigger;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var offs = [], triggers = [], observers = [], timers = [];
  function on(t, ev, fn, o) { t.addEventListener(ev, fn, o); offs.push(function () { t.removeEventListener(ev, fn, o); }); }
  function headerBottom() {
    var bar = document.querySelector('n1-header .n1h-bar');
    if (bar) { var r = bar.getBoundingClientRect(); if (r.height > 0 && r.bottom > 0 && r.bottom < 220) return Math.round(r.bottom); }
    return 64;
  }
  var state = { brands: null, eco: null, sectors: null, manifesto: null, footerArt: null };

  /* marka adları ve İngilizce sahne yazıları otomatik çeviriye kapalı (yalnızca öznitelik; metin değişmez) */
  [].forEach.call(host.querySelectorAll('.n1k-wall, .n1k-cert-name, .n1k-ai-title, .n1k-ai-line, .n1k-ai-list, .n1b-name, .n1eco-wheel, #hero'), function (e) { e.setAttribute('translate', 'no'); });

  /* iOS Safari :active yalnızca belgede bir touchstart dinleyicisi varsa çalışır */
  on(document, 'touchstart', function () {}, { passive: true });

  /* ---------- 1 · Markalar: ok düğmeleri ---------- */
  (function brands() {
    var root = host.querySelector('[data-n1-brands]'); if (!root) return;
    var vp = root.querySelector('.n1b-viewport'), track = root.querySelector('.n1b-track'); if (!vp || !track) return;
    var nav = document.createElement('div'); nav.className = 'n1m-bnav';
    nav.innerHTML = '<button type="button" class="n1m-bnav-b" data-d="-1" aria-label="Önceki marka"><svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M10 3 5 8l5 5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/></svg></button>' +
      '<button type="button" class="n1m-bnav-b" data-d="1" aria-label="Sonraki marka"><svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/></svg></button>';
    var prog = root.querySelector('.n1b-progress');
    (prog && prog.parentNode ? prog.parentNode : root).insertBefore(nav, prog ? prog.nextSibling : null);
    var bPrev = nav.children[0], bNext = nav.children[1];
    function step() { var it = track.querySelector('.n1b-item'); if (!it) return vp.clientWidth * 0.8; var cs = getComputedStyle(track); return it.getBoundingClientRect().width + (parseFloat(cs.columnGap || cs.gap) || 0); }
    function upd() { var max = vp.scrollWidth - vp.clientWidth - 2; bPrev.disabled = vp.scrollLeft <= 2; bNext.disabled = vp.scrollLeft >= max; }
    on(nav, 'click', function (e) { var b = e.target.closest('button'); if (!b) return; vp.scrollBy({ left: +b.getAttribute('data-d') * step(), behavior: reduce ? 'auto' : 'smooth' }); });
    on(vp, 'scroll', upd, { passive: true }); on(window, 'resize', upd);
    upd(); timers.push(setTimeout(upd, 800));
    state.brands = { nav: nav, update: upd, viewport: vp };
    offs.push(function () { nav.remove(); });
  })();

  /* ---------- 2 · Digital Ecosystem: kaydırma ile proje geçişi (yalnızca modül kendi pin modunda değilse) ---------- */
  (function eco() {
    var root = host.querySelector('[data-n1-eco]'); if (!root || !root.__n1eco || !ST) return;
    var api = root.__n1eco; if (api.pinned()) return;              // ≥ 1024 px: modülün kendi (masaüstü) pin modu
    if (reduce) return;                                              // hareket azaltma: yalnızca dokunma ile seçim
    var N = (api.projects || []).length; if (N < 2) return;
    var stage = root.querySelector('.n1eco-stage'), inner = root.querySelector('.n1eco-inner'); if (!stage || !inner) return;
    var spacer = document.createElement('div'); spacer.className = 'n1m-eco-spacer'; spacer.setAttribute('aria-hidden', 'true');
    stage.parentNode.insertBefore(spacer, stage.nextSibling);
    root.classList.add('n1m-eco-scroll');
    var stepPx = 0, top = 0, lock = 0, lockT = 0, cur = api.state().active;
    function geom() {
      top = headerBottom() + 8;
      root.style.setProperty('--n1m-eco-top', top + 'px');
      stepPx = Math.round(Math.max(160, Math.min(320, innerHeight * 0.34)));
      spacer.style.height = (stepPx * (N - 1)) + 'px';
    }
    geom();
    function idxFrom(p) { return Math.max(0, Math.min(N - 1, Math.round(p * (N - 1)))); }
    var st = ST.create({
      trigger: spacer,
      start: function () { return 'top ' + (top + stage.offsetHeight) + 'px'; },
      end: function () { return 'bottom ' + (top + stage.offsetHeight) + 'px'; },
      invalidateOnRefresh: true,
      onRefreshInit: geom,
      onUpdate: function (self) {
        if (lock) return;
        var i = idxFrom(self.progress);
        if (i !== cur) { cur = i; api.select(i, false); }
      }
    });
    triggers.push(st);
    function scrollToProject(i, smooth) {
      var y = st.start + (st.end - st.start) * (i / (N - 1));
      lock = 1; clearTimeout(lockT);
      cur = i; api.select(i, false);
      window.scrollTo({ top: Math.round(y), behavior: smooth ? 'smooth' : 'auto' });
      var release = function () { lock = 0; cur = idxFrom(st.progress); if (cur !== i) { cur = i; } };
      lockT = setTimeout(release, smooth ? 950 : 60);
    }
    // dokunma/klik: modülün kendi işleyicisinden ÖNCE (yakalama aşaması) — seçim + kaydırma konumu birlikte
    var wheel = root.querySelector('.n1eco-wheel'), navEl = root.querySelector('.n1eco-nav');
    function pick(e) {
      var b = e.target.closest('.n1eco-item'), i = -1;
      if (b && root.contains(b)) i = +b.getAttribute('data-project');
      else { var nb = e.target.closest('.n1eco-nav button'); if (nb && navEl) i = [].indexOf.call(navEl.querySelectorAll('button'), nb); }
      if (!(i >= 0 && i < N)) return;
      e.preventDefault(); e.stopImmediatePropagation();
      scrollToProject(i, !reduce);
    }
    if (wheel) on(wheel, 'click', pick, true);
    if (navEl) on(navEl, 'click', pick, true);
    // klavye: modülün ok tuşu işleyicisi select() çağırır; kaydırma konumu da eşitlenir
    on(root, 'keydown', function (e) {
      if (!/^Arrow(Up|Down|Left|Right)$/.test(e.key)) return;
      timers.push(setTimeout(function () { var a = api.state().active; if (a !== cur) scrollToProject(a, false); }, 0));
    });
    on(window, 'resize', function () { geom(); });
    state.eco = { trigger: st, spacer: spacer, step: function () { return stepPx; }, current: function () { return cur; }, scrollToProject: scrollToProject };
    offs.push(function () { spacer.remove(); root.classList.remove('n1m-eco-scroll'); root.style.removeProperty('--n1m-eco-top'); clearTimeout(lockT); });
  })();

  /* ---------- 3 · Sektörler: odak şeridi ---------- */
  (function sectors() {
    var root = host.querySelector('[data-n1-sectors]'); if (!root) return;
    var items = [].slice.call(root.querySelectorAll('.n1sec-item')); if (!items.length) return;
    root.setAttribute('data-n1m-count', String(items.length));
    if (reduce || !('IntersectionObserver' in window)) return;
    root.classList.add('n1m-sec-focus');
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { e.target.classList.toggle('is-focus', e.isIntersecting); });
    }, { rootMargin: '-49.5% 0px -49.5% 0px', threshold: 0 });
    items.forEach(function (li) { io.observe(li); });
    observers.push(io);
    state.sectors = { io: io, focused: function () { return items.filter(function (li) { return li.classList.contains('is-focus'); }).map(function (li) { return li.getAttribute('data-sector'); }); } };
  })();

  /* ---------- 4 · Manifesto: vuruşların satırları ---------- */
  (function manifesto() {
    var root = host.querySelector('[data-n1-about] .n1m-mf'); if (!root || reduce || !G || !ST) return;
    [].forEach.call(root.querySelectorAll('.n1m-mf-beat'), function (beat) {
      var lines = beat.querySelectorAll('.n1m-mf-ln');
      G.set(lines, { yPercent: 40, autoAlpha: 0 });
      triggers.push(ST.create({ trigger: beat, start: 'top 88%', once: true,
        onEnter: function () { G.to(lines, { yPercent: 0, autoAlpha: 1, duration: 0.9, ease: 'expo.out', stagger: 0.09, overwrite: 'auto' }); } }));
    });
    state.manifesto = true;
  })();

  /* ---------- 5 · Footer partner görseli ---------- */
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
    ft.classList.add('n1m-art');                                     // logolar gizlenir, görsel alanı oranla ayrılır (CLS yok)
    var ok = function () { if (img.naturalWidth > 0) { ft.classList.add('n1m-art-ok'); list.setAttribute('aria-hidden', 'true'); } else fail(); };
    var fail = function () { ft.classList.remove('n1m-art', 'n1m-art-ok'); ft.classList.add('n1m-art-failed'); list.removeAttribute('aria-hidden'); pic.remove(); };
    img.addEventListener('load', ok, { once: true }); img.addEventListener('error', fail, { once: true });
    if (img.complete && img.naturalWidth) ok();
    state.footerArt = { picture: pic, img: img };
    offs.push(function () { if (pic.isConnected) pic.remove(); ft.classList.remove('n1m-art', 'n1m-art-ok', 'n1m-art-failed'); list.removeAttribute('aria-hidden'); });
  })();

  /* DOM eklemeleri (ok düğmeleri, kaydırma payı, footer görseli) tetikleyici konumlarını değiştirir → tek, koşulsuz yenileme
     (GSAP ScrollTrigger kuralı: düzen değişikliğinden sonra refresh). */
  if (ST) { var rf = requestAnimationFrame(function () { ST.refresh(); }); offs.push(function () { cancelAnimationFrame(rf); }); }

  window.__n1m2 = {
    state: state,
    destroy: function () {
      triggers.forEach(function (t) { try { t.kill(); } catch (e) {} }); triggers = [];
      observers.forEach(function (o) { try { o.disconnect(); } catch (e) {} }); observers = [];
      timers.forEach(clearTimeout); timers = [];
      offs.forEach(function (f) { try { f(); } catch (e) {} }); offs = [];
    }
  };
})();
