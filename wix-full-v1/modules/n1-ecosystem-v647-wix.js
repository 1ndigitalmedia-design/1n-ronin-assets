/* [n1-site-wix-v1] Wix kopyası: yalnızca 4 ikon yolu window.N1_ASSET_BASE ile öneklenir; başka değişiklik yok.
 * 1N Digital Media — Interactive Ecosystem (v6.41, bağımsız tasarım denemesi)
 * GSAP 3.13 + ScrollTrigger (sitede zaten yüklü sürüm). Yeni kütüphane, scroll motoru, WebGL yok. Yalnızca transform + opacity.
 * v6.41: masaüstünde bölüm ekrana sabitlenir; sayfa kaydırması projeler arasında ilerletir (tekerlek olayı engellenmez).
 *
 * PROJE VERİSİ — tek merkezi tablo. Gerçek logo geldiğinde `logo` alanına dosya yolunu yazın
 * (ör. 'img/eco/a7.svg'); orta alandaki tipografik yer tutucu otomatik olarak logoyla değişir.
 */
(function () {
  'use strict';

  /* LOGOLAR — merkezi kaynak tablosu.
   * local: önizlemede kullanılan, orijinal dosyalardan yalnızca rengi/zemini ayıklanmış şeffaf maske PNG (şekil = alfa).
   * wix:   orijinal Wix medya dosyası (renkli + zeminli). Wix'e aktarırken img/eco/*.png dosyaları Wix'e yüklenip
   *        o adres `local` yerine yazılır; renk CSS'teki --eco-logo değişkeninden gelir (#8A8E89).
   * scale: optik denge (dolgun logolar biraz küçültülür). */
  var LOGOS = {
    a7:       { local: (window.N1_ASSET_BASE || '') + 'img/eco/a7.png',       wix: 'https://static.wixstatic.com/media/6dbf5e_4958b4594d8742e2952955073afc309d~mv2.png', scale: 1.1 },
    hementik: { local: (window.N1_ASSET_BASE || '') + 'img/eco/hementik.png', wix: 'https://static.wixstatic.com/media/6dbf5e_a6f86c10cb2b4c43bc391b747338a745~mv2.png', scale: 1 },
    zeyp:     { local: (window.N1_ASSET_BASE || '') + 'img/eco/zeyp.png',     wix: 'https://static.wixstatic.com/media/6dbf5e_080167aa974345e8a054d0deae46c346~mv2.png', scale: 1 },
    live:     { local: (window.N1_ASSET_BASE || '') + 'img/eco/live.png',     wix: 'https://static.wixstatic.com/media/6dbf5e_0cb9bd29e4bc448480c640a6a1fafd89~mv2.png', scale: 0.8 }
  };
  window.N1_ECOSYSTEM_LOGOS = LOGOS;

  var PROJECTS = [
    { key: 'a7',       name: 'A7',           wheel: 'A7',           label: 'A7 Prodüksiyon',           url: 'https://www.a7-1n.com/a7-produksiyon',
      desc: 'Sinematik video prodüksiyonu, yaratıcı içerik ve görsel hikâye anlatımı alanındaki çalışmalarımız.', logo: LOGOS.a7 },
    { key: 'zeyp',     name: 'Zeyp',         wheel: 'Zeyp',         url: 'https://www.zeyp.com.tr/',
      desc: 'Gelir, gider ve cari süreçlerinin yönetimini kolaylaştırmak için geliştirilen dijital uygulama.', logo: LOGOS.zeyp },
    { key: 'hementik', name: 'HemenTık.la',  wheel: 'HemenTık.la',  url: 'https://www.hementik.la/',
      desc: 'Markaların, işletmelerin ve içerik üreticilerinin dijital bağlantılarını tek merkezde sunan bio-link platformu.', logo: LOGOS.hementik },
    { key: 'live',     name: 'Live Markets', wheel: 'Live Markets', url: 'https://www.carsialtin.com/faprika/canli-piyasalar/', lang: 'en',
      desc: 'Finansal piyasa verilerinin görüntülenmesine yönelik dijital piyasa ekranı çözümü.', logo: LOGOS.live }
  ];
  window.N1_ECOSYSTEM = PROJECTS;

  var root = document.querySelector('[data-n1-eco]');
  if (!root) return;
  var N = PROJECTS.length;
  var REP = 3;                       // yörüngede döngüsel tekrar: 4 proje × 3 = 12 yuva, çark hep dolu görünür
  var SLOTS = N * REP;
  var STEP = 9.5 * Math.PI / 180;    // yuvalar arası açı

  var wheel = root.querySelector('.n1eco-wheel');
  var orbit = root.querySelector('.n1eco-orbit');
  var circle = orbit.querySelector('circle');
  var tick = orbit.querySelector('.n1eco-tick');
  var mark = root.querySelector('.n1eco-mark');
  var desc = root.querySelector('.n1eco-desc');
  var domain = root.querySelector('.n1eco-domain');
  var count = root.querySelector('.n1eco-count');
  var cta = root.querySelector('.n1eco-cta');
  var live = root.querySelector('.n1eco-live');
  var navBtns = [];
  var G = window.gsap;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)');

  // ---- yörünge öğeleri (görsel; ekran okuyucudan gizli — erişilebilir seçici sağdaki düğmeler) ----
  var items = [];
  for (var k = 0; k < SLOTS; k++) {
    var p = PROJECTS[k % N];
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'n1eco-item'; b.tabIndex = -1; b.setAttribute('aria-hidden', 'true');
    b.dataset.slot = k; b.dataset.project = k % N;
    b.innerHTML = '<span></span><i class="n1eco-dot"></i>';
    b.firstChild.textContent = p.wheel;
    if (p.lang) b.firstChild.lang = p.lang;   // ör. 'Live Markets' → LIVE (Türkçe İ değil)
    wheel.appendChild(b); items.push(b);
  }

  // ---- erişilebilir seçici ----
  var nav = root.querySelector('.n1eco-nav');
  PROJECTS.forEach(function (p, i) {
    var li = document.createElement('li'), bt = document.createElement('button');
    bt.type = 'button'; bt.textContent = String(i + 1).padStart(2, '0');
    bt.setAttribute('aria-label', p.name); bt.setAttribute('aria-pressed', 'false');
    bt.addEventListener('click', function () { select(i); });
    li.appendChild(bt); nav.appendChild(li); navBtns.push(bt);
  });

  // ---- geometri ----
  var geo = { R: 600, cx: 0, cy: 0, ax: 40, spacing: 120 };
  function measure() {
    var w = wheel.clientWidth, h = wheel.clientHeight;
    geo.R = Math.max(420, h * 0.98);          // büyük yarıçap: kavis hafif, okunur
    geo.ax = Math.min(56, w * 0.05);          // aktif ismin sol boşluğu
    geo.cx = geo.ax - geo.R;                  // çember merkezi solda, ekran dışında
    geo.cy = h / 2;
    geo.spacing = geo.R * STEP;
    circle.setAttribute('cx', geo.cx); circle.setAttribute('cy', geo.cy); circle.setAttribute('r', geo.R - 18);
    tick.setAttribute('x1', geo.ax - 34); tick.setAttribute('x2', geo.ax - 18);
    tick.setAttribute('y1', geo.cy); tick.setAttribute('y2', geo.cy);
    render();
  }

  // ---- durum: sürekli konum (yuva cinsinden). Tek bir tween bu değeri sürer → hızlı seçimlerde çakışma yok ----
  var state = { pos: 0 };
  var active = 0;
  function wrap(d) { d = ((d % SLOTS) + SLOTS) % SLOTS; return d > SLOTS / 2 ? d - SLOTS : d; }
  function render() {
    for (var i = 0; i < SLOTS; i++) {
      var d = wrap(i - state.pos), a = d * STEP, ad = Math.abs(d);
      var x = geo.cx + geo.R * Math.cos(a), y = geo.cy + geo.R * Math.sin(a);
      var el = items[i], hh = el.offsetHeight || 80;
      var op = ad > 5.2 ? 0 : Math.max(0, 1 - ad * 0.22);
      el.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + (y - hh / 2).toFixed(1) + 'px,0) rotate(' + (a * 180 / Math.PI).toFixed(2) + 'deg)';
      el.style.opacity = op.toFixed(3);
      el.style.visibility = op < 0.01 ? 'hidden' : 'visible';
      el.style.pointerEvents = ad < 4.5 ? 'auto' : 'none';
    }
  }
  function nearestSlotOf(project) {           // seçilen projenin en yakın kopyası → en kısa yön
    var best = null, bd = 1e9;
    for (var i = project; i < SLOTS; i += N) { var d = wrap(i - state.pos); if (Math.abs(d) < Math.abs(bd)) { bd = d; best = i; } }
    return state.pos + bd;
  }

  // ---- içerik geçişi (orta + sağ) ----
  var contentTl = null;
  function fillMark(p) {
    // v6.47: orta alanda yalnızca ikon — tek tip kare "uygulama ikonu" kutusu (yazı yok)
    mark.innerHTML = '';
    var tile = document.createElement('span'); tile.className = 'n1eco-tile';
    tile.setAttribute('role', 'img'); tile.setAttribute('aria-label', (p.label || p.name) + ' logosu');
    if (p.logo) {
      var ico = document.createElement('span'); ico.className = 'n1eco-logo';
      ico.style.setProperty('--logo-src', 'url("' + p.logo.local + '")');
      ico.style.setProperty('--logo-scale', p.logo.scale || 1);
      tile.appendChild(ico);
    }
    mark.appendChild(tile);
  }
  function fillDetail(i) {
    var p = PROJECTS[i];
    desc.textContent = p.desc;
    domain.textContent = p.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
    count.innerHTML = '<b>' + String(i + 1).padStart(2, '0') + '</b> / ' + String(N).padStart(2, '0');
    cta.href = p.url; cta.setAttribute('aria-label', 'Projeyi keşfet: ' + p.name + ' (yeni sekmede açılır)');
    navBtns.forEach(function (b, j) { b.setAttribute('aria-pressed', j === i ? 'true' : 'false'); });
    live.textContent = p.name + '. ' + p.desc;
  }
  function swapContent(i, instant) {
    if (contentTl) contentTl.kill();
    if (instant || !G || reduce.matches) { G && G.set([mark, desc], { clearProps: 'all' }); fillMark(PROJECTS[i]); fillDetail(i); return; }
    contentTl = G.timeline()
      .to(mark, { autoAlpha: 0, clipPath: 'inset(0% 0% 100% 0%)', duration: 0.26, ease: 'power2.in' }, 0)
      .to(desc, { yPercent: -30, autoAlpha: 0, duration: 0.22, ease: 'power2.in' }, 0)
      .add(function () { fillMark(PROJECTS[i]); fillDetail(i); })
      .fromTo(mark, { autoAlpha: 0, clipPath: 'inset(100% 0% 0% 0%)' }, { autoAlpha: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6, ease: 'expo.out' })
      .fromTo(desc, { yPercent: 40, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.55, ease: 'expo.out' }, '<0.05')
      .set(mark, { clearProps: 'clipPath' });
  }

  // ---- seçim ----
  var posTween = null, introTl = null;
  function finishIntro() { if (introTl && introTl.isActive()) introTl.progress(1); }
  function setActive(i, instant) {
    if (i === active && !instant) return;
    active = i;
    items.forEach(function (el) { el.classList.toggle('is-active', +el.dataset.project === i); });
    swapContent(i, instant);
  }
  function goTo(target, instant) {
    finishIntro();
    if (posTween) posTween.kill();
    if (instant || !G || reduce.matches) { state.pos = target; render(); return; }
    posTween = G.to(state, { pos: target, duration: 0.9, ease: 'expo.out', onUpdate: render });
  }
  function select(i, instant) {
    if (pin && !instant) { scrollToProject(i); return; }
    goTo(nearestSlotOf(i), instant); setActive(i, instant);
  }
  function step(dir) { select((active + dir + N) % N); }

  // ---- etkileşim: tıklama, sürükleme (yalnızca fare/kalem), klavye. Tekerlek ele geçirilmez. ----
  wheel.addEventListener('click', function (e) {
    if (dragMoved) return;
    var b = e.target.closest('.n1eco-item'); if (!b) return;
    var slot = +b.dataset.slot;
    if (pin) { scrollToProject(+b.dataset.project); return; }
    if (posTween) posTween.kill();
    goTo(state.pos + wrap(slot - state.pos));
    setActive(+b.dataset.project);
  });
  var drag = null, dragMoved = false;
  wheel.addEventListener('pointerdown', function (e) {
    if (e.pointerType === 'touch' || e.button !== 0) return;
    finishIntro(); if (posTween) posTween.kill();
    drag = { y: e.clientY, pos: state.pos, sy: scrollY }; dragMoved = false;
    if (scrollTw) scrollTw.kill();
  });
  addEventListener('pointermove', function (e) {
    if (!drag) return;
    var dy = e.clientY - drag.y;
    if (!dragMoved && Math.abs(dy) < 6) return;
    if (!dragMoved) { dragMoved = true; wheel.classList.add('is-dragging'); try { wheel.setPointerCapture(e.pointerId); } catch (_) {} }
    if (pin) { scrollTo(0, drag.sy - dy / geo.spacing * pxPerProject()); return; }   // sürükleme = kaydırma; snap projeye oturtur
    state.pos = drag.pos - dy / geo.spacing; render();
    var near = ((Math.round(state.pos) % SLOTS) + SLOTS) % SLOTS % N;
    if (near !== active) setActive(near);
  });
  function endDrag() {
    if (!drag) return;
    drag = null; wheel.classList.remove('is-dragging');
    if (dragMoved && pin) { scrollToProject(Math.round(clampP(pin.progress) * (N - 1))); setTimeout(function () { dragMoved = false; }, 0); return; }
    if (dragMoved) { goTo(Math.round(state.pos)); setTimeout(function () { dragMoved = false; }, 0); }
  }
  addEventListener('pointerup', endDrag); addEventListener('pointercancel', endDrag);
  wheel.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); step(1); }
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
    else if (e.key === 'Home') { e.preventDefault(); select(0); }
    else if (e.key === 'End') { e.preventDefault(); select(N - 1); }
  });
  nav.addEventListener('keydown', function (e) {
    var i = navBtns.indexOf(document.activeElement); if (i < 0) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); navBtns[(i + 1) % N].focus(); select((i + 1) % N); }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); navBtns[(i - 1 + N) % N].focus(); select((i - 1 + N) % N); }
  });

  // ---- başlangıç ----
  var ro = new ResizeObserver(measure); ro.observe(wheel);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  select(0, true);
  measure();

  // ---- kaydırmaya bağlı sabitleme (yalnızca masaüstü + hareket serbest). Mobil ve azaltılmış hareket: tıklama modu ----
  var pin = null, scrollTw = null, posTo = null;
  function clampP(v) { return Math.min(1, Math.max(0, v)); }
  function pxPerProject() { return pin ? (pin.end - pin.start) / (N - 1) : 0; }
  function scrollToProject(i) {
    finishIntro();
    var y = pin.start + i * pxPerProject();
    if (scrollTw) scrollTw.kill();
    var o = { y: scrollY }, dist = Math.abs(y - o.y);
    scrollTw = G.to(o, { y: y, duration: Math.min(1.1, 0.45 + dist / 2400), ease: 'power3.inOut',
      onUpdate: function () { scrollTo(0, o.y); } });
  }
  var ST = window.ScrollTrigger;
  if (G && ST) {
    G.registerPlugin(ST);
    var mm = G.matchMedia();
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', function () {
      if (posTween) posTween.kill();
      posTo = G.quickTo(state, 'pos', { duration: 0.55, ease: 'power3.out', onUpdate: render });
      root.classList.add('is-pinned-mode');
      pin = ST.create({
        trigger: root.querySelector('.n1eco-stage'),
        start: 'center center',
        end: function () { return '+=' + Math.round(innerHeight * 0.55 * (N - 1)); },
        pin: true, anticipatePin: 1, invalidateOnRefresh: true,
        snap: { snapTo: 1 / (N - 1), duration: { min: 0.25, max: 0.6 }, delay: 0.1, ease: 'power2.inOut' },
        onUpdate: function (self) {
          if (self.progress > 0) finishIntro();
          posTo(self.progress * (N - 1));
          var i = Math.round(self.progress * (N - 1));
          if (i !== active) setActive(i);
        }
      });
      // sitede diğer ScrollTrigger'lar önceden oluşturulmuş olabilir: konuma göre sırala ve yeniden ölç
      requestAnimationFrame(function () { if (ST.sort) ST.sort(); ST.refresh(); });
      // sayfa ortadan yüklenirse başlangıç konumunu kaydırmaya eşitle
      state.pos = clampP(pin.progress) * (N - 1); render(); setActive(Math.round(state.pos), true);
      return function () {
        if (scrollTw) scrollTw.kill();
        pin = null; posTo = null; root.classList.remove('is-pinned-mode');
        var i = active; state.pos = nearestSlotOf(i); render();
      };
    });
  }

  // ---- giriş: çark yörüngeye oturur, plaka ve açıklama belirir (bir kez) ----
  if (G && !reduce.matches) {
    var intro = { pos: -2.4 }, introTo = pin ? state.pos : 0;
    introTl = G.timeline({ paused: true })
      .fromTo(intro, { pos: introTo - 2.4 }, { pos: introTo, duration: 1.4, ease: 'expo.out', onUpdate: function () { state.pos = intro.pos; render(); }, onComplete: function () { if (pin) { state.pos = clampP(pin.progress) * (N - 1); render(); } } }, 0)
      .from(wheel, { autoAlpha: 0, duration: 0.7, ease: 'power2.out' }, 0)
      .from(mark, { autoAlpha: 0, clipPath: 'inset(100% 0% 0% 0%)', duration: 0.9, ease: 'expo.out', clearProps: 'clipPath' }, 0.35)
      .from(root.querySelectorAll('.n1eco-detail > *'), { autoAlpha: 0, y: 14, duration: 0.7, ease: 'power3.out', stagger: 0.07 }, 0.45);
    var played = false;
    var io = new IntersectionObserver(function (es) {
      if (es[0].isIntersecting && !played) { played = true; io.disconnect(); introTl.play(); }
    }, { threshold: 0.3 });
    io.observe(root.querySelector('.n1eco-stage'));
    setTimeout(function () { var r = root.getBoundingClientRect(); if (!played && r.top < innerHeight * 0.8 && r.bottom > 0) { played = true; io.disconnect(); introTl.play(); } }, 1500);
  }

  root.__n1eco = { pinned: function () { return !!pin; }, pin: function () { return pin; }, select: select, state: function () { return { active: active, pos: state.pos }; }, projects: PROJECTS };
})();
