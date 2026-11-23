/* Stüdyo Hikâyesi — sade görünme hareketleri. İçerik JS olmadan da görünür. */
(function () {
  var html = document.querySelector('n1-studyo-v1'), reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!html || reduce || !('IntersectionObserver' in window)) return;
  html.classList.add('js');
  html.querySelectorAll('[data-lines]').forEach(function (h) { h.querySelectorAll('.st-ln').forEach(function (l, i) { l.style.setProperty('--i', i); }); });
  html.querySelectorAll('.st-hero [data-in]').forEach(function (el, i) { el.style.setProperty('--d', (i ? 420 + i * 120 : 60) + 'ms'); });
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  html.querySelectorAll('[data-lines],[data-in]').forEach(function (el) { io.observe(el); });
  requestAnimationFrame(function () { requestAnimationFrame(function () { html.querySelector('.st-hero').classList.add('is-ready'); }); });
})();
