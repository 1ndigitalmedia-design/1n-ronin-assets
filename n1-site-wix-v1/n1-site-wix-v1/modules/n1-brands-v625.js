/* ==========================================================================
   1N — Çalıştığımız Markalar: sürükleme + SÜRÜKLEYİN imleci (v6.25)
   Mevcut GSAP 3.13.0 (gsap.ticker, quickTo). Ek eklenti, Lenis, pin yok.
   - Fare ile: tut-sürükle, bırakınca atalet ile yavaşlar; kenarlarda yumuşak sınır.
   - Trackpad yatay kaydırma (deltaX) ve klavye (← →) da şeridi taşır.
   - Hız kadar çok hafif eğim (en fazla 3°), bırakınca sıfırlanır.
   - SÜRÜKLEYİN imleci: alanın üzerinde belirir, fareyi gecikmeli izler, basılıyken küçülür.
   - Şerit görünmezken ticker hesap yapmaz (IntersectionObserver).
   - Dokunmatik / dar ekran / hareket azaltma: yerel yatay kaydırma, özel imleç yok.
   ========================================================================== */
(function () {
  'use strict';
  var root = document.querySelector('[data-n1-brands]');
  if (!root || !window.gsap) return;

  var viewport = root.querySelector('.n1b-viewport');
  var track = root.querySelector('.n1b-track');
  var names = root.querySelectorAll('.n1b-name');
  var bar = root.querySelector('.n1b-progress-bar');
  var fine = matchMedia('(hover: hover) and (pointer: fine) and (min-width: 901px)');
  var reduce = matchMedia('(prefers-reduced-motion: reduce)');

  // native kaydırmada da ilerleme çizgisi çalışsın
  function nativeProgress() {
    var max = viewport.scrollWidth - viewport.clientWidth;
    var p = max > 0 ? viewport.scrollLeft / max : 0;
    var vis = viewport.clientWidth / viewport.scrollWidth;
    gsap.set(bar, { scaleX: vis, x: p * (1 - vis) * bar.parentNode.clientWidth });
  }
  viewport.addEventListener('scroll', nativeProgress, { passive: true });

  if (!fine.matches || reduce.matches) { nativeProgress(); return; }
  root.classList.add('is-drag');

  // --- Şerit fiziği -------------------------------------------------------------
  var x = 0, target = 0, min = 0, vel = 0, dragging = false, startX = 0, startT = 0, lastX = 0, lastT = 0, visible = false;
  function measure() {
    min = Math.min(0, viewport.clientWidth - track.scrollWidth);
    target = clamp(target); x = clamp(x);
  }
  function clamp(v) { return Math.max(min, Math.min(0, v)); }
  function soft(v) { // kenarda yumuşak direnç
    if (v > 0) return v * 0.25;
    if (v < min) return min + (v - min) * 0.25;
    return v;
  }
  var setX = gsap.quickSetter(track, 'x', 'px');
  var setSkew = Array.prototype.map.call(names, function (n) { return gsap.quickSetter(n, 'skewX', 'deg'); });
  var skew = 0;

  function tick() {
    if (!visible && !dragging) return;
    if (!dragging) {
      target += vel; vel *= 0.92;                 // atalet
      if (Math.abs(vel) < 0.05) vel = 0;
      if (target > 0 || target < min) { target += (clamp(target) - target) * 0.18; vel *= 0.6; }
    }
    var prev = x;
    x += (target - x) * 0.14;                     // yumuşak takip
    if (Math.abs(target - x) < 0.05) x = target;
    setX(x);
    var s = Math.max(-3, Math.min(3, (x - prev) * -0.12));
    skew += (s - skew) * 0.2;
    if (Math.abs(skew) < 0.01) skew = 0;
    for (var i = 0; i < setSkew.length; i++) setSkew[i](skew);
    var span = -min || 1, visR = viewport.clientWidth / track.scrollWidth;
    gsap.set(bar, { scaleX: visR, x: (-x / span) * (1 - visR) * bar.parentNode.clientWidth });
  }
  gsap.ticker.add(tick);

  // --- Fare ile sürükleme ----------------------------------------------------------
  viewport.addEventListener('pointerdown', function (e) {
    if (e.button !== 0) return;
    dragging = true; root.classList.add('is-dragging');
    startX = e.clientX; startT = target; lastX = e.clientX; lastT = performance.now(); vel = 0;
    viewport.setPointerCapture(e.pointerId);
    cursorPress(true);
  });
  viewport.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    target = soft(startT + (e.clientX - startX));
    var now = performance.now(), dt = Math.max(1, now - lastT);
    vel = (e.clientX - lastX) / dt * 16;          // px / kare
    lastX = e.clientX; lastT = now;
  });
  function end(e) {
    if (!dragging) return;
    dragging = false; root.classList.remove('is-dragging');
    if (performance.now() - lastT > 80) vel = 0;  // bırakmadan önce durduysa fırlatma yok
    vel = Math.max(-60, Math.min(60, vel));
    try { viewport.releasePointerCapture(e.pointerId); } catch (_) {}
    cursorPress(false);
  }
  viewport.addEventListener('pointerup', end);
  viewport.addEventListener('pointercancel', end);
  viewport.addEventListener('dragstart', function (e) { e.preventDefault(); });

  // trackpad yatay kaydırma (dikey sayfa kaydırmasına karışmaz)
  viewport.addEventListener('wheel', function (e) {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) * 1.2) {
      e.preventDefault(); vel = 0; target = clamp(target - e.deltaX);
    }
  }, { passive: false });

  // klavye
  viewport.setAttribute('tabindex', '0');
  viewport.addEventListener('keydown', function (e) {
    var step = (root.querySelector('.n1b-item') || {}).offsetWidth || 400;
    if (e.key === 'ArrowRight') { e.preventDefault(); vel = 0; target = clamp(target - step); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); vel = 0; target = clamp(target + step); }
  });

  // --- SÜRÜKLEYİN imleci --------------------------------------------------------------------
  var cursor = document.createElement('div');
  cursor.className = 'n1b-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.innerHTML = '<span class="n1b-cursor-ring"></span><span lang="tr">SÜRÜKLEYİN</span>';
  document.body.appendChild(cursor);
  var cx = gsap.quickTo(cursor, 'x', { duration: 0.45, ease: 'power3.out' });
  var cy = gsap.quickTo(cursor, 'y', { duration: 0.45, ease: 'power3.out' });
  var inside = false;
  viewport.addEventListener('pointerenter', function (e) {
    inside = true;
    gsap.set(cursor, { x: e.clientX, y: e.clientY });
    gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out', overwrite: 'auto' });
  });
  viewport.addEventListener('pointerleave', function () {
    inside = false;
    if (!dragging) gsap.to(cursor, { opacity: 0, scale: 0.4, duration: 0.35, ease: 'power2.in', overwrite: 'auto' });
  });
  window.addEventListener('pointermove', function (e) { if (inside || dragging) { cx(e.clientX); cy(e.clientY); } }, { passive: true });
  function cursorPress(on) {
    gsap.to(cursor, { scale: on ? 0.82 : (inside ? 1 : 0.4), opacity: on || inside ? 1 : 0, duration: 0.35, ease: 'power3.out', overwrite: 'auto' });
  }
  // sayfa kaydırılırken imleç alan dışında kalırsa gizle
  window.addEventListener('scroll', function () {
    if (!inside || dragging) return;
    var r = viewport.getBoundingClientRect(), cr = cursor.getBoundingClientRect(), my = cr.top + cr.height / 2;
    if (my < r.top || my > r.bottom) { inside = false; gsap.to(cursor, { opacity: 0, scale: 0.4, duration: 0.3, overwrite: 'auto' }); }
  }, { passive: true });

  // görünürlük: ekran dışındayken hesap yok
  new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }, { rootMargin: '100px 0px' }).observe(root);

  measure();
  window.addEventListener('resize', measure);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  root.__n1b = { state: function () { return { x: x, target: target, min: min, vel: vel, dragging: dragging, skew: skew }; } };
})();
