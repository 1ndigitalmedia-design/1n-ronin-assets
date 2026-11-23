/* 1N Digital Media — Data Transparency giriş animasyonu (v6.43). GSAP 3.13 + ScrollTrigger (sitede yüklü).
 * Yalnızca başlık için hafif fade, metin için hafif fade-up; tek sefer. Çizgi açılımı footer'ın kendi çizgisindedir.
 * GSAP yoksa veya hareket azaltıldıysa hiçbir şey gizlenmez; tetik kaçarsa zaman aşımı tamamlar. */
(function () {
  'use strict';
  var root = document.querySelector('[data-n1-gads]');
  if (!root || !window.gsap) return;
  var G = window.gsap, ST = window.ScrollTrigger;
  var head = root.querySelector('.n1gads-head'), text = root.querySelector('.n1gads-text');
  G.matchMedia().add('(prefers-reduced-motion: no-preference)', function () {
    G.set(head, { autoAlpha: 0 }); G.set(text, { autoAlpha: 0, y: 10 });
    var tl = G.timeline({ paused: true })
      .to(head, { autoAlpha: 1, duration: 0.6, ease: 'power2.out' }, 0)
      .to(text, { autoAlpha: 1, y: 0, duration: 0.75, ease: 'power3.out' }, 0.12);
    var done = false;
    function play() { if (!done) { done = true; tl.play(); } }
    function check() { var r = root.getBoundingClientRect(); if (!done && r.top < innerHeight * 0.94 && r.bottom > 0) play(); }
    var st = ST ? ST.create({ trigger: root, start: 'top 90%', once: true, onEnter: play }) : null;
    addEventListener('scroll', check, { passive: true });
    var t1 = setTimeout(check, 600), t2 = setTimeout(function () { if (!done && root.getBoundingClientRect().top < innerHeight * 1.5) play(); }, 4000);
    return function () { removeEventListener('scroll', check); clearTimeout(t1); clearTimeout(t2); if (st) st.kill(); tl.kill(); G.set([head, text], { clearProps: 'all' }); };
  });
})();
