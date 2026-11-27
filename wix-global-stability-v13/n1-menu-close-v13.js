/*!
 * n1-menu-close v1.3.0 — 1N Digital Media · menünün sayfa geçişinde tam kapanması (PROBLEM 01)
 *
 * Kök neden (MENU_FIX_REPORT.md): header v12'de kapanış yalnızca CSS geçişleriyle (opacity/transform, kart başına
 * gecikme) yürür. Alt bağlantıya basılınca close() durumu anında "kapalı" yapar ama tarayıcı yeni belgeye geçerken
 * eski belgenin son çizilen karesini gösterir; o karede geçiş henüz ilerlememiştir (WebKit ölçümü: tıklamadan 146 ms
 * sonra data-open=false, "Başlangıca Dön" kartı opacity 1, MENU simgesi hâlâ ×). Wix'in sayfa geçişi (View
 * Transition) ve BFCache de bu kareyi kullanabilir.
 *
 * Ne yapar (header/markup dosyalarına dokunmadan; Wix özel kod, body-end):
 *  - Menü açıkken BAŞKA bir belgeye giden bağlantıya basılınca: geçişler kapatılır (data-n1-instant) ve header'ın kendi
 *    close() yöntemi çağrılır → kapalı durum aynı karede çizilir. Gezinme tarayıcının kendisine bırakılır
 *    (preventDefault yok, JS ile yönlendirme yok).
 *  - pageswap / pagehide: açık menü varsa geçişsiz kapatılır (geçiş görüntüsü ve BFCache kopyası kapalı olur).
 *  - pageshow (BFCache dönüşü): kapalı durum yeniden doğrulanır; geçişler iki kare sonra geri açılır.
 *  - Aynı sayfa içi çapalar (#ust vb.) ve menünün normal aç/kapa animasyonları değişmez.
 * Tasarım, Hizmetler/İnsan Kaynakları alt menüleri ve diğer bileşenler değişmez. Kapsam: yalnızca n1-header olan sayfalar.
 */
(function () {
  'use strict';
  if (window.__n1MenuClose) return;
  var VERSION = '1.3.0';
  var st = { instantCloses: 0, hideCloses: 0, showFixes: 0 };
  window.__n1MenuClose = { version: VERSION, stats: st };

  var css = 'n1-header[data-n1-instant],n1-header[data-n1-instant] *,n1-header[data-n1-instant]::before,' +
    '.n1h-panel[data-n1-instant],.n1h-panel[data-n1-instant] *,.n1h-panel[data-n1-instant]::before' +
    '{transition:none!important;transition-delay:0s!important;animation:none!important}';
  function ensureCss() {
    if (document.getElementById('n1-menu-close-v13')) return;
    var s = document.createElement('style'); s.id = 'n1-menu-close-v13'; s.textContent = css;
    (document.head || document.documentElement).appendChild(s);
  }

  function headers() { return [].slice.call(document.querySelectorAll('n1-header')); }
  function panelOf(h) { return h.panel || null; }
  function isOpen(h) { return h.hasAttribute('data-open') || !!(panelOf(h) && panelOf(h).hasAttribute('data-open')); }

  /* Geçişsiz, durumu tam sıfırlayan kapanış (header'ın kendi close() yöntemi + güvenli yedek) */
  function closeInstant(h) {
    ensureCss();
    var p = panelOf(h);
    h.setAttribute('data-n1-instant', ''); if (p) p.setAttribute('data-n1-instant', '');
    try { if (typeof h.close === 'function' && h.open) h.close(false); } catch (e) {}
    // yedek: close() çalışmasa da DOM durumu kapalı olsun
    h.removeAttribute('data-open');
    if (p) {
      p.removeAttribute('data-open'); try { p.inert = true; } catch (e) {}
      [].forEach.call(p.querySelectorAll('.n1h-sub[data-open]'), function (s) { s.removeAttribute('data-open'); });
      [].forEach.call(p.querySelectorAll('.n1h-item[aria-expanded="true"]'), function (it) { it.setAttribute('aria-expanded', 'false'); });
    }
    var b = h.querySelector('.n1h-menu'); if (b) b.setAttribute('aria-expanded', 'false');
    try { h.open = false; if (typeof h.sub === 'number') h.sub = -1; } catch (e) {}
    void (p || h).offsetWidth;                          // stil hesabını zorla: kapalı durum bu karede uygulanır
  }
  function releaseInstant(frames) {
    var n = frames || 2;
    (function tick() {
      if (--n > 0) return requestAnimationFrame(tick);
      headers().forEach(function (h) { h.removeAttribute('data-n1-instant'); var p = panelOf(h); if (p) p.removeAttribute('data-n1-instant'); });
    })();
  }

  function leavesDocument(a) {
    if (!a || a.hasAttribute('download')) return false;
    var t = (a.getAttribute('target') || '').toLowerCase(); if (t && t !== '_self') return false;
    var raw = a.getAttribute('href'); if (!raw || raw.charAt(0) === '#' || /^(javascript|mailto|tel):/i.test(raw)) return false;
    var u; try { u = new URL(raw, location.href); } catch (e) { return false; }
    return !(u.origin === location.origin && u.pathname === location.pathname && u.search === location.search);
  }

  /* capture: header'ın kendi click işleyicisinden ÖNCE çalışır */
  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a || !leavesDocument(a)) return;
    var open = headers().filter(isOpen); if (!open.length) return;
    open.forEach(closeInstant); st.instantCloses++;
    // gezinme gerçekleşmezse (iptal, aynı belge) animasyonlar kalıcı kapalı kalmasın
    setTimeout(function () { if (document.visibilityState === 'visible') releaseInstant(1); }, 1500);
  }, true);

  function closeAllForLeave() { var open = headers().filter(isOpen); open.forEach(closeInstant); if (open.length) st.hideCloses++; }
  window.addEventListener('pageswap', closeAllForLeave);
  window.addEventListener('pagehide', closeAllForLeave);
  window.addEventListener('pageshow', function (e) {
    if (!e.persisted) return;
    var open = headers().filter(isOpen); open.forEach(closeInstant); if (open.length) st.showFixes++;
    releaseInstant(2);
  });
})();
