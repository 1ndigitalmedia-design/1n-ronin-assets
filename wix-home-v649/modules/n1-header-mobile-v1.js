/*!
 * n1-header-mobile-v1 (1.1.0) — 1N Digital Media · ana sayfa mobil / tablet navigasyonu (≤ 900 px)
 * V1.1 (Skill incelemesi): hamburger yalnızca transform ile; numaralar kaldırıldı; basma geri bildirimi; klavyeyle
 * açma/kapama animasyonsuz; özel easing.
 *
 * Mevcut <n1-header> bileşenini (n1-header-v648.js) DEĞİŞTİRMEZ; onun üzerine 900 px ve altında çalışan bir katman ekler:
 *   - Header çubuğu görünür olur (v648 CSS'i ≤900 px'te gizliyordu): logo solda, hamburger sağda, safe-area destekli.
 *   - Menü: aynı menü verisinden (host.menu → JSON) üretilen tam ekran (telefon) / sağ panel (tablet) sayfası.
 *     Yeni bağlantı üretilmez; alt menüsü olan başlık (İnsan Kaynakları) grup olarak, alt bağlantılarıyla listelenir.
 *   - Açılış/kapanış: sayfadaki mevcut GSAP ile (yoksa ya da reduced-motion'da animasyonsuz, tamamen işlevsel).
 *   - Erişilebilirlik: aria-expanded/controls, role=dialog, odak yönetimi ve odak tuzağı, Escape, inert.
 *   - Arka plan kaydırması: html/body stiline DOKUNULMADAN engellenir (menü katmanı dokunma/teker olayını tutar).
 * Kapsam: yalnızca [data-n1hm] işaretli Header (ana sayfa bileşeninin sahibi olduğu). İç sayfaların Header'ı etkilenmez.
 * Masaüstü (≥ 901 px): bu dosyanın eklediği her şey display:none; v648 Header aynen çalışır.
 * Çapa navigasyonu: bağlantılar gerçek <a href>'tir; #hizmetler-ozet tıklamasını yalnızca n1-nav-v1.js yönetir
 * (bu dosya kaydırma yapmaz, yalnızca menüyü kapatır) → aynı olayı iki betik yönetmez.
 */
(function () {
  'use strict';
  var prev = window.__n1HeaderMobile;
  if (prev && prev.destroy) { try { prev.destroy(); } catch (e) {} }

  var MQ = '(max-width: 900px)', EASE = 'cubic-bezier(.22,.8,.24,1)';
  var host = document.querySelector('n1-header[data-n1-owner="n1-site-v1"]') || document.querySelector('n1-header[data-n1-owner]');
  if (!host) return;

  var css = '\
@media (max-width:900px){\
n1-header[data-n1hm]{display:block!important;--n1hm-accent:#A2FF00;--n1hm-h:60px;padding-top:env(safe-area-inset-top,0px)}\
n1-header[data-n1hm]::before{height:calc(120px + env(safe-area-inset-top,0px))}\
n1-header[data-n1hm] .n1h-bar{grid-template-columns:auto 1fr auto;height:var(--n1hm-h);width:calc(100% - 36px);margin-left:auto;margin-right:auto}\
n1-header[data-n1hm] .n1h-logo img{width:30px;height:30px}\
n1-header[data-n1hm] .n1h-tag{display:none}\
n1-header[data-n1hm] .n1h-menu,n1-header[data-n1hm] .n1h-cta{display:none}\
n1-header[data-n1hm] .n1h-right{gap:8px;align-items:center}\
.n1hm-btn{position:relative;display:inline-grid;place-items:center;width:46px;height:46px;padding:0;margin:0;border-radius:12px;cursor:pointer;pointer-events:auto;color:#ecebe6;\
background:rgba(12,14,13,.5);border:1px solid rgba(228,227,221,.12);-webkit-backdrop-filter:blur(12px) saturate(120%);backdrop-filter:blur(12px) saturate(120%);\
-webkit-tap-highlight-color:transparent;touch-action:manipulation;transition:background-color .3s ' + EASE + ',border-color .3s ' + EASE + '}\
.n1hm-btn:focus-visible{outline:2px solid #ecebe6;outline-offset:3px}\
.n1hm-btn[aria-expanded="true"]{background:rgba(24,27,25,.9);border-color:rgba(162,255,0,.34)}\
.n1hm-ico{position:relative;display:block;width:20px;height:14px}\
.n1hm-ico i{position:absolute;right:0;top:6.25px;width:20px;height:1.5px;border-radius:1px;background:currentColor;transform-origin:50% 50%;transition:transform .42s ' + EASE + '}\
.n1hm-ico i:nth-child(1){transform:translateY(-4.25px)}\
.n1hm-ico i:nth-child(2){transform-origin:100% 50%;transform:translateY(4.25px) scaleX(.65);background:var(--n1hm-accent,#A2FF00)}\
.n1hm-btn[aria-expanded="true"] .n1hm-ico i:nth-child(1){transform:rotate(45deg)}\
.n1hm-btn[aria-expanded="true"] .n1hm-ico i:nth-child(2){transform-origin:50% 50%;transform:rotate(-45deg)}\
.n1hm-cta{display:none;align-items:center;gap:9px;height:46px;padding:0 16px;border-radius:12px;pointer-events:auto;text-decoration:none;color:#ecebe6;font:500 12px/1 Barlow,Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase;\
background:rgba(12,14,13,.5);border:1px solid rgba(162,255,0,.26);-webkit-backdrop-filter:blur(12px) saturate(120%);backdrop-filter:blur(12px) saturate(120%)}\
.n1hm-cta i{width:6px;height:6px;border-radius:50%;background:var(--n1hm-accent,#A2FF00)}\
.n1hm-sheet{--n1hm-accent:#A2FF00;position:fixed;z-index:898;left:0;top:0;right:0;bottom:0;height:100vh;height:100dvh;display:flex;justify-content:flex-end;visibility:hidden;pointer-events:none;\
font-family:Barlow,"Helvetica Neue",Arial,sans-serif;color:#ecebe6;overscroll-behavior:contain;touch-action:none}\
.n1hm-sheet[data-open]{visibility:visible;pointer-events:auto}\
.n1hm-back{position:absolute;inset:0;background:rgba(5,6,6,.78);-webkit-backdrop-filter:blur(18px) saturate(110%);backdrop-filter:blur(18px) saturate(110%);opacity:0}\
.n1hm-sheet[data-open] .n1hm-back{opacity:1}\
.n1hm-panel{position:relative;display:flex;flex-direction:column;width:100%;height:100%;padding:calc(env(safe-area-inset-top,0px) + 60px + 14px) 18px calc(env(safe-area-inset-bottom,0px) + 18px);box-sizing:border-box}\
.n1hm-scroll{flex:1 1 auto;min-height:0;overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;touch-action:pan-y;scrollbar-width:none}\
.n1hm-scroll::-webkit-scrollbar{display:none}\
.n1hm-list{list-style:none;margin:0;padding:0;border-top:1px solid rgba(228,227,221,.1)}\
.n1hm-list>li{border-bottom:1px solid rgba(228,227,221,.1)}\
.n1hm-link{display:flex;align-items:baseline;gap:14px;min-height:64px;padding:14px 4px;box-sizing:border-box;text-decoration:none;color:#ecebe6;-webkit-tap-highlight-color:transparent;touch-action:manipulation;transition:opacity .16s ' + EASE + '}\
.n1hm-link:active,.n1hm-sub a:active,.n1hm-go:active,.n1hm-home:active{opacity:.62}\
.n1hm-btn:active{background:rgba(24,27,25,.9)}\
.n1hm-txt{flex:1;font:600 clamp(32px,9.2vw,44px)/1.02 "Barlow Condensed",Barlow,Arial,sans-serif;letter-spacing:.005em}\
.n1hm-note{flex:none;font:400 11px/1 Barlow,Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:rgba(228,227,221,.4)}\
.n1hm-link:active .n1hm-txt,.n1hm-link:focus-visible .n1hm-txt{color:var(--n1hm-accent)}\
.n1hm-link:focus-visible,.n1hm-sub a:focus-visible,.n1hm-go:focus-visible,.n1hm-home:focus-visible{outline:2px solid #ecebe6;outline-offset:2px;border-radius:6px}\
.n1hm-group{padding:14px 4px 10px}\
.n1hm-group .n1hm-head{display:flex;align-items:baseline;gap:14px}\
.n1hm-group .n1hm-txt{font-size:clamp(24px,6.6vw,30px);color:rgba(236,235,230,.74)}\
.n1hm-sub{list-style:none;margin:8px 0 0;padding:0}\
.n1hm-sub a,.n1hm-sub span{display:flex;align-items:center;min-height:44px;font:400 17px/1.2 Barlow,Arial,sans-serif;color:#ecebe6;text-decoration:none;touch-action:manipulation;-webkit-tap-highlight-color:transparent}\
.n1hm-sub a::before{content:"";width:14px;height:1px;margin-right:12px;background:var(--n1hm-accent);opacity:.8}\
.n1hm-sub span{color:rgba(228,227,221,.5)}\
.n1hm-foot{flex:none;display:grid;gap:10px;padding-top:16px}\
.n1hm-go{display:flex;align-items:center;justify-content:space-between;min-height:56px;padding:0 20px;border-radius:12px;background:var(--n1hm-accent);color:#0b0d0c;text-decoration:none;font:600 14px/1 Barlow,Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase}\
.n1hm-go svg{width:14px;height:14px}\
.n1hm-home{display:flex;align-items:center;justify-content:space-between;min-height:48px;padding:0 4px;color:rgba(228,227,221,.62);text-decoration:none;font:400 12px/1 Barlow,Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase}\
.n1hm-home b{font:600 17px/1 "Barlow Condensed",Barlow,Arial,sans-serif;letter-spacing:.02em;text-transform:none;color:var(--n1hm-accent)}\
}\
@media (min-width:600px) and (max-width:900px){\
n1-header[data-n1hm]{--n1hm-h:72px}\
n1-header[data-n1hm] .n1h-bar{width:calc(100% - 56px)}\
n1-header[data-n1hm] .n1h-logo img{width:32px;height:32px}\
n1-header[data-n1hm] .n1h-tag{display:block;font-size:10.5px;letter-spacing:.2em}\
.n1hm-cta{display:inline-flex}\
.n1hm-panel{width:min(440px,62%);height:auto;max-height:calc(100% - env(safe-area-inset-top,0px) - 72px - 26px);margin:calc(env(safe-area-inset-top,0px) + 72px + 10px) 28px 0 0;padding:10px 18px 18px;border-radius:16px;background:#111312;box-shadow:0 24px 60px rgba(0,0,0,.55);align-self:flex-start}\
.n1hm-list{border-top:0}\
.n1hm-txt{font-size:34px}\
.n1hm-link{min-height:58px}\
}\
@media (max-width:900px) and (max-height:520px){.n1hm-link{min-height:48px;padding:8px 4px}.n1hm-txt{font-size:28px}.n1hm-group .n1hm-txt{font-size:22px}}\
@media (min-width:901px){.n1hm-btn,.n1hm-cta,.n1hm-sheet{display:none!important}}\
@media (prefers-reduced-motion:reduce){.n1hm-ico i,.n1hm-btn{transition:none}}';

  var st = document.getElementById('n1hm-style');
  if (!st) { st = document.createElement('style'); st.id = 'n1hm-style'; st.setAttribute('data-n1-owner', 'n1-site-v1'); document.head.appendChild(st); }
  st.textContent = css;

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function reduced() { try { return matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } }

  var right = host.querySelector('.n1h-right'); if (!right) return;
  var menu = host.menu;
  if (!menu) { var js = host.querySelector('script[type="application/json"]'); try { menu = js ? JSON.parse(js.textContent) : null; } catch (e) { menu = null; } }
  if (!menu || !menu.items) return;
  var deskCta = host.querySelector('.n1h-cta');
  var ctaHref = deskCta ? deskCta.getAttribute('href') : (host.getAttribute('cta-href') || '');
  var ctaText = deskCta ? deskCta.textContent.trim() : (host.getAttribute('cta-text') || 'Teklif Al');
  var id = 'n1hm-' + Math.random().toString(36).slice(2, 7);

  host.setAttribute('data-n1hm', '');
  var cta = null;
  if (ctaHref) { cta = document.createElement('a'); cta.className = 'n1hm-cta'; cta.href = ctaHref; cta.innerHTML = '<i aria-hidden="true"></i>' + esc(ctaText); right.appendChild(cta); }
  var btn = document.createElement('button');
  btn.className = 'n1hm-btn'; btn.type = 'button'; btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-controls', id); btn.setAttribute('aria-label', 'Menüyü aç');
  btn.innerHTML = '<span class="n1hm-ico" aria-hidden="true"><i></i><i></i></span>';
  right.appendChild(btn);

  var rows = menu.items.map(function (it) {
    if (it.href && !(it.sub || []).length) {
      return '<li><a class="n1hm-link n1hm-a" href="' + esc(it.href) + '"><span class="n1hm-txt">' + esc(it.title) + '</span><span class="n1hm-note" aria-hidden="true">' + esc(it.note || '') + '</span></a></li>';
    }
    return '<li class="n1hm-group n1hm-a"><div class="n1hm-head"><span class="n1hm-txt">' + esc(it.title) + '</span><span class="n1hm-note" aria-hidden="true">' + esc(it.note || '') + '</span></div><ul class="n1hm-sub" aria-label="' + esc(it.title) + '">' +
      (it.sub || []).map(function (s) { return s.href ? '<li><a href="' + esc(s.href) + '">' + esc(s.text) + '</a></li>' : '<li><span aria-disabled="true">' + esc(s.text) + '</span></li>'; }).join('') + '</ul></li>';
  }).join('');
  var sheet = document.createElement('div');
  sheet.className = 'n1hm-sheet'; sheet.id = id; sheet.setAttribute('role', 'dialog'); sheet.setAttribute('aria-modal', 'true'); sheet.setAttribute('aria-label', 'Site menüsü'); sheet.inert = true;
  sheet.innerHTML = '<div class="n1hm-back" data-close></div><div class="n1hm-panel"><nav class="n1hm-scroll" aria-label="Ana menü"><ul class="n1hm-list">' + rows + '</ul></nav><div class="n1hm-foot">' +
    (ctaHref ? '<a class="n1hm-go n1hm-a" href="' + esc(ctaHref) + '"><span>' + esc(ctaText) + '</span><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="square" aria-hidden="true"><path d="M4.5 11.5l7-7M5.5 4.5h6v6"/></svg></a>' : '') +
    (menu.brand ? '<a class="n1hm-home n1hm-a" href="' + esc(menu.brand.href || '#ust') + '"><b>' + esc(menu.brand.text || '1N Digital Media') + '</b><span>' + esc(menu.brand.note || 'Başlangıca dön') + '</span></a>' : '') + '</div></div>';
  document.body.appendChild(sheet);

  var back = sheet.querySelector('.n1hm-back'), panel = sheet.querySelector('.n1hm-panel'), scroller = sheet.querySelector('.n1hm-scroll');
  var parts = [].slice.call(sheet.querySelectorAll('.n1hm-a'));
  var open = false, tl = null, mq = matchMedia(MQ), dead = false;

  function focusables() { return [btn].concat([].slice.call(sheet.querySelectorAll('a[href]'))); }
  function killTl() { if (tl) { tl.kill(); tl = null; } }
  function clearInline() { if (window.gsap) { try { window.gsap.set([back, panel].concat(parts), { clearProps: 'all' }); } catch (e) {} } }
  function show(instant) {
    if (open || dead || !mq.matches) return; open = true;
    sheet.inert = false; sheet.setAttribute('data-open', ''); btn.setAttribute('aria-expanded', 'true'); btn.setAttribute('aria-label', 'Menüyü kapat'); host.setAttribute('data-n1hm-open', '');
    scroller.scrollTop = 0; killTl();
    var g = window.gsap;
    if (g && !reduced() && !instant) {
      tl = g.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(back, { opacity: 0 }, { opacity: 1, duration: 0.32, ease: 'power1.out' }, 0)
        .fromTo(panel, { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.42 }, 0.02)
        .fromTo(parts, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.045 }, 0.08);
    }
    var first = sheet.querySelector('a[href]');
    requestAnimationFrame(function () { if (open && first) first.focus({ preventScroll: true }); });
  }
  function hide(returnFocus, instant) {
    if (!open) return; open = false;
    btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-label', 'Menüyü aç'); host.removeAttribute('data-n1hm-open');
    var done = function () { if (open) return; sheet.removeAttribute('data-open'); sheet.inert = true; clearInline(); };
    killTl();
    var g = window.gsap;
    if (g && !reduced() && !instant) {
      tl = g.timeline({ onComplete: done });
      tl.to(parts, { opacity: 0, y: 8, duration: 0.16, ease: 'power1.in' }, 0).to(panel, { opacity: 0, y: -8, duration: 0.22, ease: 'power2.in' }, 0.04).to(back, { opacity: 0, duration: 0.24, ease: 'power1.in' }, 0.06);
      sheet.style.pointerEvents = 'none'; tl.eventCallback('onComplete', function () { sheet.style.pointerEvents = ''; done(); });
    } else done();
    if (returnFocus) btn.focus({ preventScroll: true });
  }
  function onBtn(e) { var kb = e && e.detail === 0; open ? hide(true, kb) : show(kb); }   // detail 0 = klavye (Enter/Boşluk)
  function onSheetClick(e) {
    if (e.target.closest('[data-close]')) { hide(true); return; }
    if (e.target.closest('a[href]')) hide(false);                 // bağlantı seçildi: menü kapanır; gezinmeyi tarayıcı / n1-nav yönetir
  }
  function onKey(e) {
    if (!open) return;
    if (e.key === 'Escape') { e.preventDefault(); hide(true, true); return; }
    if (e.key === 'Tab') {
      var f = focusables(), i = f.indexOf(document.activeElement);
      if (i < 0) { e.preventDefault(); f[0].focus(); return; }
      if (e.shiftKey && i === 0) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
    }
  }
  /* Arka plan kaydırma kilidi: html/body'ye stil yazılmaz. Menü katmanı olayı tutar; yalnızca taşan liste kayar. */
  function canScroll(target, dy) {
    if (!scroller.contains(target)) return false;
    var max = scroller.scrollHeight - scroller.clientHeight; if (max <= 1) return false;
    if (dy == null) return true;
    return dy > 0 ? scroller.scrollTop < max : scroller.scrollTop > 0;
  }
  var ty = 0;
  function onTouchStart(e) { ty = e.touches && e.touches[0] ? e.touches[0].clientY : 0; }
  function onTouchMove(e) { var y = e.touches && e.touches[0] ? e.touches[0].clientY : ty; if (!canScroll(e.target, ty - y) && e.cancelable) e.preventDefault(); }
  function onWheel(e) { if (!canScroll(e.target, e.deltaY) && e.cancelable) e.preventDefault(); }
  function onMq() { if (!mq.matches && open) hide(false, true); }

  btn.addEventListener('click', onBtn);
  sheet.addEventListener('click', onSheetClick);
  sheet.addEventListener('touchstart', onTouchStart, { passive: true });
  sheet.addEventListener('touchmove', onTouchMove, { passive: false });
  sheet.addEventListener('wheel', onWheel, { passive: false });
  document.addEventListener('keydown', onKey);
  if (mq.addEventListener) mq.addEventListener('change', onMq); else if (mq.addListener) mq.addListener(onMq);
  window.addEventListener('pagehide', function () { if (open) hide(false, true); });

  function destroy() {
    if (dead) return; dead = true; killTl(); open = false;
    document.removeEventListener('keydown', onKey);
    if (mq.removeEventListener) mq.removeEventListener('change', onMq); else if (mq.removeListener) mq.removeListener(onMq);
    if (sheet.parentNode) sheet.parentNode.removeChild(sheet);
    if (btn.parentNode) btn.parentNode.removeChild(btn);
    if (cta && cta.parentNode) cta.parentNode.removeChild(cta);
    host.removeAttribute('data-n1hm'); host.removeAttribute('data-n1hm-open');
  }
  // Header DOM'dan kaldırılırsa (Wix sayfa geçişi, bileşenin yeniden kurulması) kendini temizler
  var mo = new MutationObserver(function () { if (!host.isConnected) { mo.disconnect(); destroy(); } });
  mo.observe(document.body, { childList: true });

  window.__n1HeaderMobile = { version: '1.1.0', open: show, close: function () { hide(false); }, isOpen: function () { return open; }, destroy: function () { mo.disconnect(); destroy(); } };
})();
