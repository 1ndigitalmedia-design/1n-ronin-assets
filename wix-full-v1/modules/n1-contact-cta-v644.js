/* 1N Digital Media — İletişim / proje başlatma bölümü (v6.34 · bağlantı v6.44)
 * GSAP 3.13 + ScrollTrigger (sayfada zaten yüklü). Yeni kütüphane yok.
 *
 * BAĞLANTI (v6.44): "Projenizi Konuşalım" → merkezi haritadaki /iletisim (aynı sekme, kök-göreli adres).
 */
(function () {
  'use strict';

  var root = document.querySelector('[data-n1-contact]');
  if (!root) return;
  var cta = root.querySelector('.n1ct-cta');
  var path = (window.N1_ROUTES || {})[cta.getAttribute('data-link') || 'iletisim'];
  if (path) { cta.setAttribute('href', path); cta.removeAttribute('target'); cta.removeAttribute('rel'); }

  if (typeof gsap === 'undefined') return;
  if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

  var fig = root.querySelector('.n1ct-fig img');
  var tag = root.querySelector('.n1ct-tag');
  var tagLine = root.querySelector('.n1ct-tag i');
  var lines = root.querySelectorAll('.n1ct-line > span');
  var desc = root.querySelector('.n1ct-desc');
  var ctaWrap = root.querySelector('.n1ct-cta-wrap');
  var arrow = root.querySelector('.n1ct-cta-ico svg');

  var mm = gsap.matchMedia();
  mm.add({ motion: '(prefers-reduced-motion: no-preference)', fine: '(hover: hover) and (pointer: fine)' }, function (ctx) {
    var c = ctx.conditions;
    var cleanups = [];

    if (c.motion) {
      // ---- Giriş: figür alttan açılır → etiket → başlık satırları → açıklama → CTA (bir kez, ~2 sn) ----
      gsap.set(fig, { autoAlpha: 0, clipPath: 'inset(100% 0% 0% 0%)', scale: 1.035, transformOrigin: '50% 100%' });
      gsap.set(tag, { autoAlpha: 0 }); gsap.set(tagLine, { scaleX: 0 });
      gsap.set(lines, { yPercent: 108 });
      gsap.set(desc, { autoAlpha: 0, y: 16 });
      gsap.set(ctaWrap, { autoAlpha: 0, y: 14 });

      var tl = gsap.timeline({ paused: true })
        .to(fig, { autoAlpha: 1, clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 1.5, ease: 'expo.out' }, 0)
        .to(tag, { autoAlpha: 1, duration: 0.6, ease: 'power2.out' }, 0.25)
        .to(tagLine, { scaleX: 1, duration: 0.8, ease: 'power3.inOut' }, 0.25)
        .to(lines, { yPercent: 0, duration: 1.05, ease: 'expo.out', stagger: 0.11 }, 0.4)
        .to(desc, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.85)
        .to(ctaWrap, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 1.05)
        .set(fig, { clearProps: 'clipPath,scale' });

      var played = false;
      var play = function () { if (played) return; played = true; tl.play(); };
      var inView = function () { var r = root.getBoundingClientRect(), vh = innerHeight; return r.top < vh * 0.78 && r.bottom > vh * 0.15; };
      var check = function () { if (!played && inView()) play(); };
      var st = typeof ScrollTrigger !== 'undefined' ? ScrollTrigger.create({ trigger: root, start: 'top 72%', once: true, onEnter: play }) : null;
      addEventListener('scroll', check, { passive: true });
      var t1 = setTimeout(check, 600), t2 = setTimeout(check, 2500); // tetik bildirimi gelmezse güvence
      var onFocus = function () { if (!played) { played = true; tl.progress(1); } }; // klavyeyle gelinirse hemen görünür
      root.addEventListener('focusin', onFocus);
      cleanups.push(function () {
        removeEventListener('scroll', check); clearTimeout(t1); clearTimeout(t2); root.removeEventListener('focusin', onFocus);
        if (st) st.kill(); tl.kill();
        gsap.set([fig, tag, tagLine, lines, desc, ctaWrap], { clearProps: 'all' });
      });
    }

    // ---- CTA hover: ok sağ üste çıkıp sol alttan döner + çok hafif manyetik çekim ----
    if (c.fine) {
      var arrowTl = null;
      var enter = function () {
        if (!c.motion || (arrowTl && arrowTl.isActive())) return;
        arrowTl = gsap.timeline()
          .to(arrow, { x: 14, y: -14, autoAlpha: 0, duration: 0.28, ease: 'power2.in' })
          .set(arrow, { x: -14, y: 14 })
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
      cta.addEventListener('pointerenter', enter);
      cta.addEventListener('focus', enter);
      cta.addEventListener('pointermove', move);
      cta.addEventListener('pointerleave', leave);
      cleanups.push(function () {
        cta.removeEventListener('pointerenter', enter); cta.removeEventListener('focus', enter);
        cta.removeEventListener('pointermove', move); cta.removeEventListener('pointerleave', leave);
        if (arrowTl) arrowTl.kill(); gsap.set([cta, arrow], { clearProps: 'transform,opacity,visibility' });
      });
    }

    return function () { cleanups.forEach(function (f) { f(); }); };
  });

  root.__n1ct = { href: cta.getAttribute('href') };
})();
