/* ==========================================================================
   1N — Partnerlikler & Sertifikasyonlar hareket sistemi (v6.17)
   Mevcut GSAP 3.13.0 + ScrollTrigger. Pin yok, Lenis yok, sürekli animasyon yok.
   - Başlık ve tipografi duvarı: scroll'a bağlı (scrub). Aşağı kaydırınca açılır,
     yukarı kaydırınca doğal olarak geri sarılır; sonunda her şey sabit ve net.
   - Duvar: her marka maskenin içinden yükselir, aynı anda karşı yönden hafifçe
     yerine kayar (sol satırlar soldan, sağ satırlar sağdan).
   - Sertifikasyon + AI: görünür olunca oynar, yukarı çıkınca geri sarar.
   - prefers-reduced-motion: hiçbir animasyon kurulmaz, içerik baştan görünür.
   ========================================================================== */
(function () {
  'use strict';
  var roots = document.querySelectorAll('[data-n1k]');
  if (!roots.length || !window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  roots.forEach(function (root) {
    var q = gsap.utils.selector(root);
    var mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', function () {
      // 0) v6.17 Bölüm geçişi: çizgi soldan sağa, etiket çizgiyle birlikte (scrub, geri sarılır)
      var trans = q('.n1k-trans')[0];
      if (trans && getComputedStyle(trans).display !== 'none') {
        gsap.timeline({
          scrollTrigger: { trigger: trans, start: 'top 75%', end: 'top 55%', scrub: 0.7 }
        }).from(q('.n1k-trans-line'), { scaleX: 0, ease: 'power1.inOut', duration: 1 }, 0)
          .from(q('.n1k-trans-label'), { autoAlpha: 0, x: -10, ease: 'power2.out', duration: 0.55 }, 0.12);
      }

      // 1) Başlık: çizgiden hemen sonra, kısa ve sakin — aşağıdan yukarı + opacity (scrub)
      gsap.timeline({
        scrollTrigger: { trigger: q('.n1k-title')[0], start: 'top 76%', end: 'top 58%', scrub: 0.6 }
      }).from(q('.n1k-title .n1k-t'), { yPercent: 60, autoAlpha: 0, ease: 'power2.out', stagger: 0.14, duration: 1 });

      // 2) Tipografi duvarı
      var wall = q('.n1k-wall')[0];
      var tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: { trigger: wall, start: 'top 90%', end: 'bottom 74%', scrub: 0.8, invalidateOnRefresh: true }
      });
      tl.from(q('.n1k-tag--wall'), { autoAlpha: 0, x: -14, duration: 0.6 }, 0);
      q('.n1k-brand').forEach(function (brand, i) {
        var dir = +brand.getAttribute('data-dir') || 1;
        var at = i * 0.22;
        tl.from(brand.querySelector('.n1k-word'), { yPercent: 104, duration: 1 }, at)
          .from(brand, { x: function () { return dir * Math.min(innerWidth * 0.05, 96); }, duration: 1.35 }, at)
          .from(brand.querySelector('.n1k-kind'), { autoAlpha: 0, y: 10, duration: 0.6 }, at + 0.55);
      });

      // 3) Ayırıcı çizgi
      gsap.from(q('.n1k-rule'), {
        scaleX: 0, transformOrigin: '0% 50%', ease: 'none',
        scrollTrigger: { trigger: q('.n1k-rule')[0], start: 'top 94%', end: 'top 70%', scrub: 0.6 }
      });

      // 4) Sertifikasyon + AI: bir kez oynar, yukarıda geri sarar
      var more = gsap.timeline({
        paused: true, defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: q('.n1k-more')[0], start: 'top 86%', toggleActions: 'play none none reverse' }
      });
      more.from(q('.n1k-more .n1k-tag'), { autoAlpha: 0, x: -12, duration: 0.6, stagger: 0.08 }, 0)
        .from(q('.n1k-cert-name, .n1k-ai-title'), { autoAlpha: 0, y: 14, duration: 0.7, stagger: 0.08 }, 0.08)
        .from(q('.n1k-cert-note'), { autoAlpha: 0, y: 10, duration: 0.6 }, 0.2)
        .from(q('.n1k-ai-line .n1k-t'), { yPercent: 108, duration: 0.95, stagger: 0.14 }, 0.22)
        .from(q('.n1k-ai-note'), { autoAlpha: 0, y: 10, duration: 0.6 }, 0.5)
        .from(q('.n1k-ai-list li'), { autoAlpha: 0, y: 10, duration: 0.55, stagger: 0.06 }, 0.56);

      root.__n1k = { wall: tl, more: more };
    });
  });
})();
