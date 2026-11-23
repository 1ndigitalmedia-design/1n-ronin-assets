/* 1N Digital Media — Biz Kimiz / tipografik anlatım (v6.35 · bağlantı v6.44)
 * GSAP 3.13 + ScrollTrigger + SplitText (sayfada zaten yüklü). Yeni kütüphane, pin veya ek kaydırma mesafesi yok.
 * Kaydırmaya bağlı satır maskesi: aşağı kaydırdıkça satırlar maskeden yükselir, yukarı kaydırınca geri sarılır.
 *
 * BAĞLANTI (v6.44): "Hikâyemizin Devamı" → merkezi haritadaki /studyo-hikayesi (aynı sekme, kök-göreli adres).
 */
(function () {
  'use strict';

  var root = document.querySelector('[data-n1-about]');
  if (!root) return;
  var cta = root.querySelector('.n1ab-cta');
  var path = (window.N1_ROUTES || {})[cta.getAttribute('data-link') || 'studyo-hikayesi'];
  if (path) cta.setAttribute('href', path);
  cta.removeAttribute('aria-disabled'); cta.removeAttribute('title');

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);
  var hasSplit = typeof SplitText !== 'undefined';
  if (hasSplit) gsap.registerPlugin(SplitText);

  var text = root.querySelector('.n1ab-text');
  var ctaWrap = root.querySelector('.n1ab-cta-wrap');
  var arrow = root.querySelector('.n1ab-cta-ico svg');

  var mm = gsap.matchMedia();
  mm.add({ motion: '(prefers-reduced-motion: no-preference)', fine: '(hover: hover) and (pointer: fine)', desk: '(min-width: 901px)' }, function (ctx) {
    var c = ctx.conditions;
    var cleanups = [];

    if (c.motion && hasSplit) {
      var ctaTl = null;
      var build = function () {
        var split = SplitText.create(text, {
          type: 'lines', linesClass: 'n1ab-line', mask: 'lines', autoSplit: true,
          onSplit: function (self) {
            // satırlar maskeden yükselir + hafif opaklık; buton en sonda belirir — tamamen kaydırmaya bağlı
            var tl = gsap.timeline({
              scrollTrigger: { trigger: text, start: c.desk ? 'top 94%' : 'top 88%', end: 'bottom 70%', scrub: 0.6, invalidateOnRefresh: true }
            });
            // başlangıç durumu tüm satırlara açıkça uygulanır (kademeli fromTo yalnızca ilk satırı hemen çizer)
            gsap.set(self.lines, { yPercent: 104, autoAlpha: 0.25 });
            gsap.set(ctaWrap, { autoAlpha: 0, y: 18 });
            tl.to(self.lines, { yPercent: 0, autoAlpha: 1, ease: 'power2.out', stagger: 0.16, duration: 0.7 }, 0);
            // buton kendi konumuna bağlı: ekrana girdiğinde belirir (metnin bitmesini beklemez)
            if (ctaTl) { ctaTl.scrollTrigger && ctaTl.scrollTrigger.kill(); ctaTl.kill(); }
            ctaTl = gsap.timeline({ scrollTrigger: { trigger: ctaWrap, start: 'top 96%', end: 'top 82%', scrub: 0.6, invalidateOnRefresh: true } })
              .to(ctaWrap, { autoAlpha: 1, y: 0, ease: 'power2.out' });
            return tl; // SplitText yeniden bölerken bunu temizler; buton çizelgesi yukarıda elle temizlenir
          }
        });
        cleanups.push(function () { split.revert(); if (ctaTl) { ctaTl.scrollTrigger && ctaTl.scrollTrigger.kill(); ctaTl.kill(); } gsap.set(ctaWrap, { clearProps: 'all' }); });
      };
      // Font yüklendikten sonra böl: satır kırılımları değişmez, layout shift olmaz
      if (document.fonts && document.fonts.status !== 'loaded') document.fonts.ready.then(function () { ctx.add(build); });
      else build();
    }

    // ---- Buton hover: ok sağ üste çıkıp sol alttan döner + çok hafif manyetik çekim ----
    if (c.fine) {
      var arrowTl = null;
      var enter = function () {
        if (!c.motion || (arrowTl && arrowTl.isActive())) return;
        arrowTl = gsap.timeline()
          .to(arrow, { x: 13, y: -13, autoAlpha: 0, duration: 0.28, ease: 'power2.in' })
          .set(arrow, { x: -13, y: 13 })
          .to(arrow, { x: 0, y: 0, autoAlpha: 1, duration: 0.45, ease: 'expo.out' });
      };
      var qx = gsap.quickTo(cta, 'x', { duration: 0.6, ease: 'power3.out' });
      var qy = gsap.quickTo(cta, 'y', { duration: 0.6, ease: 'power3.out' });
      var move = function (e) {
        if (!c.motion) return;
        var r = cta.getBoundingClientRect();
        qx(gsap.utils.clamp(-6, 6, (e.clientX - (r.left + r.width / 2)) * 0.08));
        qy(gsap.utils.clamp(-4, 4, (e.clientY - (r.top + r.height / 2)) * 0.12));
      };
      var leave = function () { qx(0); qy(0); };
      cta.addEventListener('pointerenter', enter); cta.addEventListener('focus', enter);
      cta.addEventListener('pointermove', move); cta.addEventListener('pointerleave', leave);
      cleanups.push(function () {
        cta.removeEventListener('pointerenter', enter); cta.removeEventListener('focus', enter);
        cta.removeEventListener('pointermove', move); cta.removeEventListener('pointerleave', leave);
        if (arrowTl) arrowTl.kill(); gsap.set([cta, arrow], { clearProps: 'transform,opacity,visibility' });
      });
    }

    return function () { cleanups.forEach(function (f) { f(); }); };
  });

  root.__n1ab = { href: cta.getAttribute('href') };
})();
