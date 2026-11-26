/*!
 * n1-home-mobile-v3 — 1N Digital Media · ana sayfa MOBİL / TABLET bölüm katmanı (v6.51 / V1.3)
 * Yalnızca mobil/tablet profilinde (n1-site-v1[data-n1-profile="m"|"t"]) yüklenir; masaüstünde ağ isteği bile yapılmaz.
 * Bölüm modüllerinin (wix-full-v1, commit d24fa37) hiçbiri değişmedi. Tek örnek: window.__n1m3 (destroy() her şeyi bırakır).
 * V1.2 katmanından (n1-home-mobile-v2) korunanlar: Markalar okları, manifesto vuruşları, footer partner görseli.
 *
 *  1  Ronin hero → Hizmetler geçişi (Rev 02). Gerçek neden: hero sahnesi (ronin-hero-mv2) 100svh yüksekliğinde sticky bir
 *     katmandır; video + CTA kompozisyonu Header'ın altından başlar ve sahnenin üst kısmına yerleşir. Uzun ekranlarda
 *     CTA'nın altında kalan sahne alanı (390×844'te 303 px, 820×1180'de 160 px) sahne serbest kalınca boş siyah alan olarak
 *     kaydırılıyordu. Kaydırma mesafesi (animasyon süresi) DEĞİŞMEZ: hero öğesinin yüksekliği aynı kalır; yalnızca
 *     sonraki bölüm, sahnenin CTA altındaki ölçülmüş boş alanı kadar yukarı alınır (hero'nun her yerleşim olayında
 *     — rh6:layout — yeniden hesaplanır; yatay telefonda yan yerleşimde uygulanmaz). Rastgele negatif boşluk değil:
 *     değer = sahne yüksekliği − (CTA altı + hedef aralık).
 *  2  Partnerlikler & Sertifikasyonlar (Rev 03) — "kayıt defteri": marka · noktalı çizgi · statü satırları; teknik
 *     sertifikasyon aynı satır diliyle (WIX VELO ······ CERTIFIED). Giriş: noktalı çizgiler soldan çizilir (bir kez).
 *  3  İstatistikler (Rev 06) — n1-stats-v632'nin window.N1_METRICS tablosuyla doğrulama + sayaç (genişlik kilitli).
 *  4  Sektörler (Rev 07) — tek tipografik dizin akışı; kaydırdıkça okuma çizgisi sektörleri sırayla aydınlatır (scrub,
 *     geri alınabilir). Hiçbir sektör gizlenmez; aydınlanmamış ad da okunur kontrasttadır (6,5:1).
 *  5  Digital Ecosystem (Rev 09). Gerçek neden: V1.2'de yalnızca proje sahnesi sticky idi; sahne ekrandan kısa olduğu için
 *     kaydırma payı boyunca altında (390×844'te ≈ 300 px) boş alan görünüyordu ve son projeden sonra yarım adım daha
 *     sürüyordu. Şimdi başlık + sahne birlikte sığıyorsa birlikte sabitlenir ve Header ile ekran altı arasında ortalanır
 *     (boş alan yok); sığmıyorsa yalnızca sahne sabitlenir. Adım mesafesi kısaltıldı (0,24 × ekran, 140–230 px).
 *     İleri/geri kaydırma, isme/numaraya dokunma, sayaç, açıklama, adres ve "Projeyi Keşfet" bağlantısı modülün kendi
 *     select() fonksiyonuyla değişir (V1.2 ile aynı yöntem).
 */
(function () {
  'use strict';
  var host = document.querySelector('n1-site-v1[data-n1-profile]');
  if (!host || host.getAttribute('data-n1-profile') === 'd') return;
  if (window.__n1m3 && window.__n1m3.destroy) { try { window.__n1m3.destroy(); } catch (e) {} }
  var G = window.gsap, ST = window.ScrollTrigger;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var offs = [], triggers = [], observers = [], timers = [], tweens = [];
  function on(t, ev, fn, o) { t.addEventListener(ev, fn, o); offs.push(function () { t.removeEventListener(ev, fn, o); }); }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function headerBottom() {
    var bar = document.querySelector('n1-header .n1h-bar');
    if (bar) { var r = bar.getBoundingClientRect(); if (r.height > 0 && r.bottom > 0 && r.bottom < 220) return Math.round(r.bottom); }
    return innerWidth >= 768 ? 72 : 64;
  }
  var refreshT = 0;
  function refreshSoon() { if (!ST) return; clearTimeout(refreshT); refreshT = setTimeout(function () { ST.refresh(); }, 180); }
  offs.push(function () { clearTimeout(refreshT); });
  var state = { hero: null, partners: null, stats: null, sectors: null, brands: null, eco: null, manifesto: null, footerArt: null };

  /* marka adları ve İngilizce başlıklar otomatik çeviriye kapalı (yalnızca öznitelik; metin değişmez) */
  [].forEach.call(host.querySelectorAll('.n1m-pk-list, .n1m-pk-row--cert, .n1m-ai-title, .n1m-ai-line, .n1m-ai-list, .n1b-name, .n1eco-wheel, #hero'), function (e) { e.setAttribute('translate', 'no'); });
  /* iOS Safari :active yalnızca belgede bir touchstart dinleyicisi varsa çalışır */
  on(document, 'touchstart', function () {}, { passive: true });

  /* ---------- 1 · Hero → Hizmetler ---------- */
  (function hero() {
    var h = host.querySelector('ronin-hero-mv2'); if (!h) return;
    var nx = h.nextElementSibling;
    while (nx && (/^(ronin-type|script|style)/i.test(nx.tagName) || getComputedStyle(nx).position === 'absolute' || getComputedStyle(nx).display === 'none')) nx = nx.nextElementSibling;
    if (nx) nx.classList.add('n1m-after-hero');
    var lastK = -1;
    function apply() {
      var r = h.rect, copy = h.querySelector('.rh6-copy');
      if (!r || r.side || r.ctaTop == null || !copy || h.hasAttribute('data-static')) { h.style.removeProperty('margin-bottom'); lastK = 0; return; }
      var ctaBottom = r.ctaTop + (copy.offsetHeight || 54);
      var gap = Math.round(clamp(r.W * 0.064, 22, 40));                       // CTA alt kenarı → sonraki bölümün üst kenarı
      var k = Math.max(0, Math.round(r.H - ctaBottom - gap));
      if (k === lastK) return;
      lastK = k; h.style.setProperty('margin-bottom', (-k) + 'px');
      state.hero = { overlap: k, ctaBottom: Math.round(ctaBottom), stageH: r.H, gap: gap };
      refreshSoon();
    }
    on(h, 'rh6:layout', apply); apply();
    offs.push(function () { h.style.removeProperty('margin-bottom'); if (nx) nx.classList.remove('n1m-after-hero'); });
  })();

  /* ---------- 2 · Partnerlikler & Sertifikasyonlar: kayıt defteri girişi ---------- */
  (function partners() {
    var pk = host.querySelector('[data-n1m-k] .n1m-pk'); if (!pk) return;
    var rows = [].slice.call(pk.querySelectorAll('.n1m-pk-row'));
    state.partners = { rows: rows.length };
    if (reduce || !G || !ST || !rows.length) return;
    var parts = function (r) { return { n: r.querySelector('.n1m-pk-name'), l: r.querySelector('.n1m-pk-lead'), k: r.querySelector('.n1m-pk-kind') }; };
    rows.forEach(function (r) { var p = parts(r); G.set([p.n, p.k].filter(Boolean), { autoAlpha: 0, y: 8 }); if (p.l) G.set(p.l, { scaleX: 0, transformOrigin: '0% 50%' }); });
    // satır grubu ekrana girince: ad → çizgi → statü, satırlar 70 ms arayla (toplam < 1,1 sn; içerik uzun süre gizli kalmaz)
    function reveal(group) {
      var tl = G.timeline({ defaults: { ease: 'expo.out' } });
      group.forEach(function (r, i) { var p = parts(r), t = i * 0.07;
        if (p.n) tl.to(p.n, { autoAlpha: 1, y: 0, duration: 0.55 }, t);
        if (p.l) tl.to(p.l, { scaleX: 1, duration: 0.8 }, t + 0.06);
        if (p.k) tl.to(p.k, { autoAlpha: 1, y: 0, duration: 0.5 }, t + 0.22);
      });
      tweens.push(tl);
    }
    var list = rows.filter(function (r) { return !r.classList.contains('n1m-pk-row--cert'); }), cert = rows.filter(function (r) { return r.classList.contains('n1m-pk-row--cert'); });
    [[list, pk.querySelector('.n1m-pk-list')], [cert, cert[0]]].forEach(function (g) {
      if (!g[0].length || !g[1]) return;
      triggers.push(ST.create({ trigger: g[1], start: 'top 88%', once: true, onEnter: function () { reveal(g[0]); } }));
    });
  })();

  /* ---------- 3 · İstatistikler: değer doğrulama + sayaç ---------- */
  (function stats() {
    var root = host.querySelector('[data-n1m-stats]'); if (!root) return;
    var rows = [].slice.call(root.querySelectorAll('.n1m-st-row')); if (!rows.length) return;
    var M = window.N1_METRICS;
    // tek doğruluk kaynağı: masaüstü modülünün tablosu (aynı sıra ve sayı ise değerler oradan yazılır)
    if (Array.isArray(M) && M.length === rows.length) M.forEach(function (m, i) {
      var r = rows[i], v = r.querySelector('.n1m-st-val'), pl = r.querySelector('.n1m-st-plus'), lb = r.querySelector('.n1m-st-label'), sr = r.querySelector('.n1m-sr');
      var un = r.querySelector('.n1m-st-unit');
      if (m.unit && !un) { un = document.createElement('span'); un.className = 'n1m-st-unit'; v.parentNode.insertBefore(un, pl); }
      if (un) un.textContent = m.unit || '';
      v.textContent = String(m.value); v.setAttribute('data-value', String(m.value));
      if (pl) pl.textContent = m.plus ? '+' : '';
      if (lb) lb.textContent = m.label;
      if (sr) sr.textContent = m.value + (m.unit || '') + (m.plus ? '+' : '') + ' ' + m.label;
      if (m.key) r.setAttribute('data-key', m.key);
    });
    var vals = rows.map(function (r) { return r.querySelector('.n1m-st-val'); });
    vals.forEach(function (v) { v.style.minWidth = String(v.getAttribute('data-value')).length + 'ch'; });   // tabular-nums: genişlik sabit
    state.stats = { values: vals.map(function (v) { return v.getAttribute('data-value'); }) };
    if (reduce || !G || !ST) return;
    var nums = vals.filter(function (v) { return /^\d+$/.test(v.getAttribute('data-value')); });
    var plus = [].slice.call(root.querySelectorAll('.n1m-st-plus, .n1m-st-unit'));
    nums.forEach(function (v) { v.textContent = '0'; });
    G.set(plus, { autoAlpha: 0 });
    triggers.push(ST.create({ trigger: root, start: 'top 86%', once: true, onEnter: function () {
      nums.forEach(function (v, i) {
        var end = +v.getAttribute('data-value'), o = { n: 0 };
        tweens.push(G.to(o, { n: end, duration: 1.25, delay: i * 0.12, ease: 'power3.out', onUpdate: function () { v.textContent = String(Math.round(o.n)); }, onComplete: function () { v.textContent = String(end); } }));
      });
      tweens.push(G.to(plus, { autoAlpha: 1, duration: 0.4, delay: 0.75, stagger: 0.1, ease: 'power2.out' }));
    } }));
  })();

  /* ---------- 4 · Sektörler: dizin akışı + okuma çizgisi ---------- */
  (function sectors() {
    var root = host.querySelector('[data-n1m-sectors]'); if (!root) return;
    var flow = root.querySelector('.n1m-sx-flow'), items = [].slice.call(root.querySelectorAll('.n1m-sx-it')); if (!flow || !items.length) return;
    var S = window.N1_SECTORS;                                         // n1-sectors-v630 tablosu: ad ve (varsa) bağlantı
    if (Array.isArray(S)) S.forEach(function (s) {
      var li = flow.querySelector('[data-sector="' + s.key + '"]'); if (!li) return;
      var nm = li.querySelector('.n1m-sx-name'); if (!nm) return;
      if (s.label) nm.textContent = s.label;
      if (s.url && nm.tagName !== 'A') { var a = document.createElement('a'); a.className = 'n1m-sx-name'; a.href = s.url; a.textContent = nm.textContent; nm.replaceWith(a); }
    });
    state.sectors = { count: items.length, labels: items.map(function (li) { return li.querySelector('.n1m-sx-name').textContent; }), lit: function () { return items.filter(function (li) { return li.classList.contains('is-lit'); }).length; } };
    if (reduce || !ST) return;
    root.classList.add('n1m-sx-sweep');
    var lit = -1;
    function paint(p) { var n = Math.round(p * items.length); if (n === lit) return; lit = n; items.forEach(function (li, i) { li.classList.toggle('is-lit', i < n); }); }
    triggers.push(ST.create({ trigger: flow, start: 'top 84%', end: 'bottom 56%', onUpdate: function (self) { paint(self.progress); }, onRefresh: function (self) { paint(self.progress); } }));
    offs.push(function () { root.classList.remove('n1m-sx-sweep'); items.forEach(function (li) { li.classList.remove('is-lit'); }); });
  })();

  /* ---------- 5 · Markalar: ok düğmeleri (V1.2 ile aynı) ---------- */
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
    on(nav, 'click', function (e) { var b = e.target.closest('button'); if (!b) return; vp.scrollBy({ left: +b.getAttribute('data-d') * step(), behavior: (reduce || e.detail === 0) ? 'auto' : 'smooth' }); });
    on(vp, 'scroll', upd, { passive: true }); on(window, 'resize', upd);
    upd(); timers.push(setTimeout(upd, 800));
    state.brands = { nav: nav, update: upd, viewport: vp };
    offs.push(function () { nav.remove(); });
  })();

  /* ---------- 6 · Digital Ecosystem ---------- */
  (function eco() {
    var root = host.querySelector('[data-n1-eco]'); if (!root || !root.__n1eco || !ST) return;
    var api = root.__n1eco; if (api.pinned()) return;              // ≥ 1024 px: modülün kendi (masaüstü) pin modu
    if (reduce) return;                                              // hareket azaltma: yalnızca dokunma ile seçim
    var N = (api.projects || []).length; if (N < 2) return;
    var stage = root.querySelector('.n1eco-stage'), inner = root.querySelector('.n1eco-inner'), head = root.querySelector('.n1eco-head'); if (!stage || !inner) return;
    var spacer = document.createElement('div'); spacer.className = 'n1m-eco-spacer'; spacer.setAttribute('aria-hidden', 'true');
    root.classList.add('n1m-eco-scroll');
    var stepPx = 0, top = 0, lock = 0, lockT = 0, cur = api.state().active, mode = '', sticky = stage;
    function geom() {
      var hb = headerBottom(), avail = innerHeight - hb;
      var ms = parseFloat(getComputedStyle(stage).marginTop) || 0;
      var whole = (head ? head.offsetHeight : 0) + ms + stage.offsetHeight;     // başlık + sahne (normal akış yüksekliği)
      var m = whole <= avail - 24 ? 'whole' : 'stage';
      if (m !== mode) {
        mode = m; root.classList.toggle('n1m-eco-whole', m === 'whole');
        sticky = m === 'whole' ? inner : stage;
        if (m === 'whole') inner.parentNode.insertBefore(spacer, inner.nextSibling); else stage.parentNode.insertBefore(spacer, stage.nextSibling);
      }
      top = m === 'whole' ? hb + Math.max(10, Math.round((avail - whole) / 2)) : hb + 8;
      root.style.setProperty('--n1m-eco-top', top + 'px');
      stepPx = Math.round(clamp(innerHeight * 0.24, 140, 230));
      spacer.style.height = (stepPx * (N - 1)) + 'px';
    }
    geom();
    function idxFrom(p) { return Math.max(0, Math.min(N - 1, Math.round(p * (N - 1)))); }
    var st = ST.create({
      trigger: spacer,
      start: function () { return 'top ' + (top + sticky.offsetHeight) + 'px'; },
      end: function () { return 'bottom ' + (top + sticky.offsetHeight) + 'px'; },
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
      lockT = setTimeout(function () { lock = 0; }, smooth ? 950 : 60);
    }
    var wheel = root.querySelector('.n1eco-wheel'), navEl = root.querySelector('.n1eco-nav');
    function pick(e) {
      var b = e.target.closest('.n1eco-item'), i = -1;
      if (b && root.contains(b)) i = +b.getAttribute('data-project');
      else { var nb = e.target.closest('.n1eco-nav button'); if (nb && navEl) i = [].indexOf.call(navEl.querySelectorAll('button'), nb); }
      if (!(i >= 0 && i < N)) return;
      e.preventDefault(); e.stopImmediatePropagation();
      scrollToProject(i, !reduce && e.detail !== 0);                  // klavyeyle (Enter/Boşluk) anında
    }
    if (wheel) on(wheel, 'click', pick, true);
    if (navEl) on(navEl, 'click', pick, true);
    on(root, 'keydown', function (e) {
      if (!/^Arrow(Up|Down|Left|Right)$/.test(e.key)) return;
      timers.push(setTimeout(function () { var a = api.state().active; if (a !== cur) scrollToProject(a, false); }, 0));
    });
    on(window, 'resize', function () { geom(); });
    state.eco = { trigger: st, spacer: spacer, mode: function () { return mode; }, top: function () { return top; }, step: function () { return stepPx; }, current: function () { return cur; }, scrollToProject: scrollToProject };
    offs.push(function () { spacer.remove(); root.classList.remove('n1m-eco-scroll', 'n1m-eco-whole'); root.style.removeProperty('--n1m-eco-top'); clearTimeout(lockT); });
  })();

  /* ---------- 7 · Manifesto: vuruşların satırları (V1.2.1 ile aynı) ---------- */
  (function manifesto() {
    var root = host.querySelector('[data-n1-about] .n1m-mf'); if (!root || reduce || !G || !ST) return;
    [].forEach.call(root.querySelectorAll('.n1m-mf-beat'), function (beat) {
      var lines = beat.querySelectorAll('.n1m-mf-ln');
      G.set(lines, { yPercent: 24, autoAlpha: 0 });
      triggers.push(ST.create({ trigger: beat, start: 'top 88%', once: true,
        onEnter: function () { tweens.push(G.to(lines, { yPercent: 0, autoAlpha: 1, duration: 0.7, ease: 'expo.out', stagger: 0.07, overwrite: 'auto' })); } }));
    });
    state.manifesto = true;
  })();

  /* ---------- 8 · Footer partner görseli (V1.2 ile aynı onaylı görseller) ---------- */
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
    state.footerArt = { picture: pic, img: img };
    offs.push(function () { if (pic.isConnected) pic.remove(); ft.classList.remove('n1m-art', 'n1m-art-ok', 'n1m-art-failed'); list.removeAttribute('aria-hidden'); });
  })();

  /* DOM eklemeleri ve hero geçişi tetikleyici konumlarını değiştirir → tek, koşulsuz yenileme */
  if (ST) { var rf = requestAnimationFrame(function () { ST.refresh(); }); offs.push(function () { cancelAnimationFrame(rf); }); }

  window.__n1m3 = {
    state: state,
    destroy: function () {
      tweens.forEach(function (t) { try { t.kill(); } catch (e) {} }); tweens = [];
      triggers.forEach(function (t) { try { t.kill(); } catch (e) {} }); triggers = [];
      observers.forEach(function (o) { try { o.disconnect(); } catch (e) {} }); observers = [];
      timers.forEach(clearTimeout); timers = [];
      offs.forEach(function (f) { try { f(); } catch (e) {} }); offs = [];
    }
  };
})();
