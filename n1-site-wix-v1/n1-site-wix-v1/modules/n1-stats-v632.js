/* 1N Digital Media — Ajans göstergeleri (v6.32)
 * GSAP 3.13 + ScrollTrigger (sayfada zaten yüklü). Yeni kütüphane yok.
 *
 * VERİ — tek merkezi tablo. Değer değişince burayı güncelle; index.html'deki yedek metin
 * (JS çalışmazsa görünen) de aynı tutulmalı. Para birimi bilerek yok.
 *   value  : sayısal değer (count-up hedefi)
 *   unit   : sayının hemen yanındaki birim (ör. 'M'), kırık beyaz
 *   plus   : true → soft yeşil artı işareti
 */
(function () {
  'use strict';

  var METRICS = [
    { key: 'marka',  value: 80,  unit: '',  plus: true,  label: 'Marka Yönetimi' },
    { key: 'butce',  value: 320, unit: 'M', plus: true,  label: 'Reklam Bütçe Yönetimi' },
    { key: 'ulke',   value: 4,   unit: '',  plus: false, label: 'Ülke' }
  ];
  window.N1_METRICS = METRICS;

  var root = document.querySelector('[data-n1-stats]');
  if (!root) return;
  var list = root.querySelector('.n1st-list');

  // Tablodan çiz (HTML'deki yedek metnin yerine aynı yapıyı kurar)
  list.innerHTML = METRICS.map(function (m) {
    var full = m.value + m.unit + (m.plus ? '+' : '');
    return '<li class="n1st-item" data-key="' + m.key + '">'
      + '<p class="n1st-num" aria-hidden="true"><span class="n1st-rise">'
      + '<span class="n1st-val" data-value="' + m.value + '">' + m.value + '</span>'
      + (m.unit ? '<span class="n1st-unit">' + m.unit + '</span>' : '')
      + (m.plus ? '<span class="n1st-plus">+</span>' : '')
      + '</span></p>'
      + '<p class="n1st-label" aria-hidden="true">' + m.label + '</p>'
      + '<span class="n1st-sr">' + full + ' ' + m.label + '</span></li>';
  }).join('');

  if (typeof gsap === 'undefined') return;
  if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

  var items = list.querySelectorAll('.n1st-item');
  var rule = root.querySelector('.n1st-rule');

  // Sayı genişliği animasyon boyunca sabit: eşit genişlikli rakamlarda (tabular-nums) son değerin
  // basamak sayısı kadar 'ch' ayrılır; font yüklenmeden ölçüm gerekmez (titreşim/kayma yok)
  function lockWidths() {
    list.querySelectorAll('.n1st-val').forEach(function (v) { v.style.minWidth = String(v.dataset.value).length + 'ch'; });
  }

  var mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', function () {
    var rises = list.querySelectorAll('.n1st-rise');
    var plus = list.querySelectorAll('.n1st-plus');
    var labels = list.querySelectorAll('.n1st-label');
    var vals = list.querySelectorAll('.n1st-val');

    lockWidths();
    gsap.set(rule, { scaleX: 0 });
    gsap.set(items, { '--st-div': 0 });
    gsap.set(rises, { yPercent: 105 });
    gsap.set(plus, { autoAlpha: 0, x: -6 });
    gsap.set(labels, { autoAlpha: 0, y: 12 });
    vals.forEach(function (v) { v.textContent = '0'; });

    var tl = gsap.timeline({ paused: true });
    tl.to(rule, { scaleX: 1, duration: 1.1, ease: 'power3.inOut' }, 0)
      .to(items, { '--st-div': 1, duration: 0.9, ease: 'power3.out', stagger: 0.1 }, 0.2)
      .to(rises, { yPercent: 0, duration: 1.0, ease: 'expo.out', stagger: 0.12 }, 0.25);
    vals.forEach(function (v, i) {
      var end = +v.dataset.value, o = { n: 0 };
      var dur = end < 10 ? 0.9 : 1.6;
      tl.to(o, { n: end, duration: dur, ease: 'power3.out', onUpdate: function () { v.textContent = String(Math.round(o.n)); } }, 0.3 + i * 0.12);
      // artı işareti sayı hedefe varırken yerine oturur
      var p = v.parentNode.querySelector('.n1st-plus');
      if (p) tl.to(p, { autoAlpha: 1, x: 0, duration: 0.5, ease: 'power3.out' }, 0.3 + i * 0.12 + dur * 0.72);
    });
    tl.to(labels, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12 }, 0.55);

    var played = false;
    function play() { if (played) return; played = true; tl.play(); }
    function inView() { var r = root.getBoundingClientRect(), vh = innerHeight; return r.top < vh * 0.85 && r.bottom > vh * 0.1; }
    function check() { if (!played && inView()) play(); }
    // Bir kez oynar; yukarı-aşağı kaydırmada sıfırlanmaz
    var st = typeof ScrollTrigger !== 'undefined' ? ScrollTrigger.create({ trigger: root, start: 'top 80%', once: true, onEnter: play }) : null;
    addEventListener('scroll', check, { passive: true });
    var t1 = setTimeout(check, 600), t2 = setTimeout(check, 2500); // tetik bildirimi gelmezse güvence

    return function () {
      removeEventListener('scroll', check); clearTimeout(t1); clearTimeout(t2);
      if (st) st.kill(); tl.kill();
      vals.forEach(function (v) { v.textContent = v.dataset.value; v.style.minWidth = ''; });
      gsap.set([rule, rises, plus, labels], { clearProps: 'all' }); gsap.set(items, { '--st-div': 1 });
    };
  });

  root.__n1st = { metrics: METRICS };
})();
