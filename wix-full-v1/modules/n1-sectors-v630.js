/* 1N Digital Media — Uzmanlaştığımız Sektörler (v6.30)
 * GSAP 3.13 + ScrollTrigger (sayfada zaten yüklü olanlar). Yeni kütüphane yok.
 *
 * SEKTÖR VERİSİ — tek merkezi tablo. Bir sektör sayfası yayına girdiğinde yalnızca
 * `url` alanını doldur (ör. '/sektorler/mucevher'); öğe otomatik olarak gerçek
 * bağlantıya dönüşür. url: null iken öğe bağlantı gibi davranmaz (sahte link yok).
 */
(function () {
  'use strict';

  var SECTORS = [
    { key: 'mucevher',            label: 'Mücevher',              url: null },
    { key: 'insaat',              label: 'İnşaat',                url: null },
    { key: 'ev-tekstili',         label: 'Ev Tekstili',           url: null },
    { key: 'kisisel-markalar',    label: 'Kişisel Markalar',      url: null },
    { key: 'emlak',               label: 'Emlak',                 url: null },
    { key: 'turizm',              label: 'Turizm',                url: null },
    { key: 'tiyatro',             label: 'Tiyatro',               url: null },
    { key: 'cafe-ve-restoran',    label: 'Cafe ve Restoran',      url: null },
    { key: 'mobilya',             label: 'Mobilya',               url: null },
    { key: 'spor',                label: 'Spor',                  url: null },
    { key: 'sanayi-uretimi',      label: 'Sanayi Üretimi',        url: null },
    { key: 'isitme-teknolojileri',label: 'İşitme Teknolojileri',  url: null },
    { key: 'odyoloji-isitme',     label: 'Odyoloji & İşitme',     url: null }
  ];
  window.N1_SECTORS = SECTORS;

  var root = document.querySelector('[data-n1-sectors]');
  if (!root) return;
  var list = root.querySelector('.n1sec-list');

  // Liste HTML'de hazır gelir (JS olmadan da okunur); JS yalnızca bağlantıları ve hareketi ekler.
  // HTML'de olmayan bir sektör tabloya eklenirse listeye de eklenir.
  SECTORS.forEach(function (s) {
    var li = list.querySelector('[data-sector="' + s.key + '"]');
    if (!li) {
      li = document.createElement('li'); li.className = 'n1sec-item'; li.setAttribute('data-sector', s.key);
      li.innerHTML = '<span class="n1sec-rise"><span class="n1sec-name"></span></span>';
      li.querySelector('.n1sec-name').textContent = s.label;
      list.appendChild(li);
    }
    var name = li.querySelector('.n1sec-name');
    if (s.url && name.tagName !== 'A') {
      var a = document.createElement('a');
      a.className = 'n1sec-name'; a.href = s.url; a.textContent = s.label;
      name.replaceWith(a);
    }
  });

  if (typeof gsap === 'undefined') return;
  var hasST = typeof ScrollTrigger !== 'undefined';
  if (hasST) gsap.registerPlugin(ScrollTrigger);

  var titleLines = root.querySelectorAll('.n1sec-tl > span');
  var desc = root.querySelector('.n1sec-desc');
  var rule = root.querySelector('.n1sec-rule');
  var rises = root.querySelectorAll('.n1sec-rise');
  var names = function () { return root.querySelectorAll('.n1sec-name'); };

  var mm = gsap.matchMedia();
  mm.add({ motion: '(prefers-reduced-motion: no-preference)', fine: '(hover: hover) and (pointer: fine)' }, function (ctx) {
    var c = ctx.conditions;
    if (!c.motion) return; // azaltılmış hareket: her şey baştan görünür, hareket yok

    // ---- Giriş: başlık maskeden yükselir → çizgi çizilir → sektörler sırayla çıkar (bir kez) ----
    gsap.set(titleLines, { yPercent: 108 });
    gsap.set(desc, { autoAlpha: 0, y: 18 });
    gsap.set(rule, { scaleX: 0 });
    gsap.set(rises, { yPercent: 110 });

    var tl = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } })
      .to(titleLines, { yPercent: 0, duration: 1.15, stagger: 0.12 }, 0)
      .to(desc, { autoAlpha: 1, y: 0, duration: 1, ease: 'power3.out' }, 0.35)
      .to(rule, { scaleX: 1, duration: 1.1, ease: 'power3.inOut' }, 0.3)
      .to(rises, { yPercent: 0, duration: 1.05, stagger: 0.045 }, 0.65);

    var played = false;
    function play() { if (played) return; played = true; tl.play(); }
    function finish() { played = true; tl.progress(1); }
    function inView() { var r = root.getBoundingClientRect(), vh = innerHeight; return r.top < vh * 0.82 && r.bottom > vh * 0.1; }

    var st = hasST ? ScrollTrigger.create({ trigger: root, start: 'top 78%', once: true, onEnter: play }) : null;
    // Güvence (v6.28'deki ders): tetik bildirimi gelmezse kaydırma kontrolü + zamanlayıcı oynatır
    function check() { if (!played && inView()) play(); }
    addEventListener('scroll', check, { passive: true });
    var t1 = setTimeout(check, 600), t2 = setTimeout(check, 2500);
    // Klavyeyle bölüme gelinirse içerik hemen görünür
    function onFocus() { if (!played) finish(); }
    root.addEventListener('focusin', onFocus);

    // ---- Hover: çok hafif manyetik çekim (yalnızca hassas işaretçide) ----
    var cleanups = [];
    if (c.fine) {
      names().forEach(function (el) {
        var qx = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
        var qy = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });
        function move(e) {
          var r = el.getBoundingClientRect();
          var dx = (e.clientX - (r.left + r.width / 2)) / r.width, dy = (e.clientY - (r.top + r.height / 2)) / r.height;
          qx(gsap.utils.clamp(-7, 7, dx * 14)); qy(gsap.utils.clamp(-4, 4, dy * 8));
        }
        function leave() { qx(0); qy(0); }
        el.addEventListener('pointermove', move);
        el.addEventListener('pointerleave', leave);
        cleanups.push(function () { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); gsap.set(el, { x: 0, y: 0 }); });
      });
    }

    return function () {
      removeEventListener('scroll', check); clearTimeout(t1); clearTimeout(t2);
      root.removeEventListener('focusin', onFocus);
      if (st) st.kill(); tl.kill();
      gsap.set([titleLines, rises], { clearProps: 'transform' }); gsap.set([desc, rule], { clearProps: 'all' });
      cleanups.forEach(function (f) { f(); });
    };
  });

  root.__n1sec = { sectors: SECTORS };
})();
