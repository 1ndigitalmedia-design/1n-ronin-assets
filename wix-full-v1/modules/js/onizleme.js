/* 1N Digital Media tasarım önizlemesi — bölüm başlıklarının satır açılışı (1N için yazıldı; Prior kodu kullanılmadı). */
(function () {
  const root = document.documentElement;
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') { root.classList.remove('has-js'); return; }
  gsap.registerPlugin(ScrollTrigger);

  const mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.utils.toArray('.reveal-lines').forEach((h) => {
      const lines = h.querySelectorAll('.ln > span');
      gsap.fromTo(lines, { yPercent: 108 }, {
        yPercent: 0, duration: 1.1, stagger: 0.12, ease: 'expo.out',
        scrollTrigger: { trigger: h, start: 'top 85%', once: true },
      });
    });
  });

  // Ronin kendi yüksekliğini kurduktan sonra alttaki tetikleyicilerin konumları yenilenir
  window.addEventListener('load', () => setTimeout(() => ScrollTrigger.refresh(), 300));
})();
