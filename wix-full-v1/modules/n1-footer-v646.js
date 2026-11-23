/* 1N Digital Media — Footer (v6.36 · yasal bağlantılar v6.44 · sosyal v6.46)
 * GSAP 3.13 + ScrollTrigger (sayfada zaten yüklü). Yeni kütüphane yok.
 *
 * MERKEZİ YAPILANDIRMA — adresler daha sonra buraya eklenir; url: null iken öğe bağlantı değildir
 * (sahte URL, '#' bağlantısı veya yanlış yönlendirme üretilmez).
 *   SOCIAL  : sosyal medya profilleri (yeni sekmede açılır)
 *   LEGAL   : yasal sayfalar (aynı sekmede açılır)
 *   PARTNERS: partner / sertifikasyon logoları. mono: false → orijinal renkli dosya gösterilir
 *             (marka kuralları renk değişikliğine izin vermiyorsa bu ayarla geri alınır).
 */
(function () {
  'use strict';

  var X = window.N1_EXTERNAL || {};   // v6.46: sosyal adresler merkezi haritadan
  var SOCIAL = {
    facebook:  { label: 'Facebook',  url: X['facebook'] || null },
    instagram: { label: 'Instagram', url: X['instagram'] || null },
    youtube:   { label: 'YouTube',   url: X['youtube'] || null },
    linkedin:  { label: 'LinkedIn',  url: X['linkedin'] || null }
  };
  var R = window.N1_ROUTES || {};   // v6.44: yasal adresler merkezi haritadan
  var LEGAL = {
    'gizlilik':        { label: 'Gizlilik Politikası',        url: R['gizlilik'] || null },
    'kvkk':            { label: 'KVKK Aydınlatma Metni',      url: R['kvkk'] || null },
    'cerez':           { label: 'Çerez Politikası',           url: R['cerez'] || null },
    'kullanim':        { label: 'Kullanım Koşulları',         url: R['kullanim'] || null },
    'basvuru':         { label: 'Veri Sahibi Başvuru Formu',  url: R['basvuru'] || null }
  };
  var PARTNERS = {
    'tiktok':  { mono: true },
    'meta':    { mono: true },
    'google':  { mono: true },
    'wix':     { mono: true },
    'velo':    { mono: true }
  };
  window.N1_FOOTER = { social: SOCIAL, legal: LEGAL, partners: PARTNERS };

  var root = document.querySelector('[data-n1-footer]');
  if (!root) return;

  // ---- bağlantıları yapılandırmadan uygula ----
  function toLink(el, url, newTab) {
    var a = document.createElement('a');
    a.className = el.className.replace(/\bis-pending\b/, '').trim();
    a.innerHTML = el.innerHTML;
    a.href = url;
    if (el.getAttribute('aria-label')) a.setAttribute('aria-label', el.getAttribute('aria-label').replace(/ \(.*\)$/, ''));
    if (newTab) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
    el.replaceWith(a);
  }
  root.querySelectorAll('[data-social]').forEach(function (el) {
    var s = SOCIAL[el.getAttribute('data-social')];
    if (s && s.url) toLink(el, s.url, true);
  });
  root.querySelectorAll('[data-legal]').forEach(function (el) {
    var l = LEGAL[el.getAttribute('data-legal')];
    if (l && l.url) toLink(el, l.url, false);
  });
  root.querySelectorAll('[data-partner]').forEach(function (li) {
    var p = PARTNERS[li.getAttribute('data-partner')], logo = li.querySelector('.n1ft-logo');
    if (p && p.mono === false && logo) {
      var img = document.createElement('img');
      img.className = 'n1ft-logo-img'; img.src = logo.getAttribute('data-src'); img.alt = logo.getAttribute('aria-label');
      img.style.setProperty('--h', getComputedStyle(logo).getPropertyValue('--h'));
      logo.replaceWith(img);
    }
  });

  if (typeof gsap === 'undefined') return;
  if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

  var rule = root.querySelector('.n1ft-rule');
  var cols = root.querySelectorAll('.n1ft-col');
  var logos = root.querySelectorAll('.n1ft-partner');
  var bottom = root.querySelector('.n1ft-bottom');

  var mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', function () {
    // Giriş (bir kez): ince çizgi soldan açılır → sütunlar hafif yükselir → logolar küçük aralıklarla belirir
    gsap.set(rule, { scaleX: 0 });
    gsap.set(cols, { autoAlpha: 0, y: 18 });
    gsap.set(logos, { autoAlpha: 0, y: 10 });
    gsap.set(bottom, { autoAlpha: 0 });
    var tl = gsap.timeline({ paused: true })
      .to(rule, { scaleX: 1, duration: 1.1, ease: 'power3.inOut' }, 0)
      .to(cols, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1 }, 0.25)
      .to(logos, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08 }, 0.55)
      .to(bottom, { autoAlpha: 1, duration: 0.6, ease: 'power2.out' }, 0.9);

    var played = false;
    function play() { if (played) return; played = true; tl.play(); }
    function inView() { var r = root.getBoundingClientRect(), vh = innerHeight; return r.top < vh * 0.85 && r.bottom > 0; }
    function check() { if (!played && inView()) play(); }
    var st = typeof ScrollTrigger !== 'undefined' ? ScrollTrigger.create({ trigger: root, start: 'top 85%', once: true, onEnter: play }) : null;
    addEventListener('scroll', check, { passive: true });
    var t1 = setTimeout(check, 600), t2 = setTimeout(check, 2500); // tetik bildirimi gelmezse güvence
    function onFocus() { if (!played) { played = true; tl.progress(1); } }
    root.addEventListener('focusin', onFocus);

    return function () {
      removeEventListener('scroll', check); clearTimeout(t1); clearTimeout(t2); root.removeEventListener('focusin', onFocus);
      if (st) st.kill(); tl.kill();
      gsap.set([rule, cols, logos, bottom], { clearProps: 'all' });
    };
  });

  root.__n1ft = window.N1_FOOTER;
})();
