/*
 * 1N Digital Media | Stüdyo Hikâyesi V10
 * Mobil/tablet WhatsApp + Yukarı Çık görünürlük düzeltmesi.
 * - Onaylı Stüdyo V9 kodunu sabit commit üzerinden aynen yükler.
 * - Ana sayfayı, ortak Header/MENU'yü ve desktop floating modülünü değiştirmez.
 * - Sadece /studyo-hikayesi içindeki n1-studyo-v1 öğesi bağlıyken çalışır.
 * - Yeni GSAP/Lenis/kaydırma kütüphanesi yüklemez.
 * - Dosya tek başına Wix Studio Custom Element'in Server URL kaynağı olarak tasarlanmıştır.
 * - Custom Element tag adı DEĞİŞMEZ: n1-studyo-v1.
 */
(function () {
  'use strict';
  const TAG = 'n1-studyo-v1';
  const V9 = 'https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@e02bd6bac1f65428140aa9334d49cc4dd6d82548/wix-studyo-v1/n1-studyo-wix-compact-v9.js';
  const LINK = 'https://api.whatsapp.com/send/?phone=905516816026&text&type=phone_number&app_absent=0';
  const ID = 'n1-studio-mobile-fc';
  const CSS_ID = 'n1-studio-mobile-fc-v10-style';
  const BODY_CLASS = 'n1-studio-mobile-fc-on';
  const KEY = '__n1StudioFloatingV10';
  if (window[KEY]) return;

  let overlay = null;
  let topButton = null;
  let menuObserver = null;
  let lifecycleObserver = null;
  let raf = 0;
  let resizeRaf = 0;
  let disposed = false;
  let bootFailed = false;

  const CSS = `
/* V10 overlay replaces shared controls ONLY on this Studio page <=1024px. */
@media(max-width:1024px){
  body.${BODY_CLASS} .n1fc { display:none!important; }
  body.${BODY_CLASS} #${ID} {
    display:flex!important; position:fixed!important; visibility:visible;
    z-index:10010!important; flex-direction:column; align-items:flex-end;
    pointer-events:none; gap:9px;
    right:calc(18px + env(safe-area-inset-right,0px))!important;
    bottom:calc(18px + env(safe-area-inset-bottom,0px))!important;
    font-family:Barlow,"Helvetica Neue",Arial,sans-serif;
  }
  #${ID} .n1smfc-btn {
    box-sizing:border-box!important; position:relative; display:grid!important; place-items:center;
    width:46px!important; height:46px!important; min-width:46px!important; min-height:46px!important;
    padding:0!important; margin:0!important; border-radius:10px!important;
    border:1px solid rgba(228,227,221,.18)!important;
    background:rgba(12,14,13,.82)!important;
    color:#e4e3dd!important; text-decoration:none!important;
    -webkit-backdrop-filter:blur(10px) saturate(115%);
    backdrop-filter:blur(10px) saturate(115%);
    pointer-events:auto!important; cursor:pointer;
    touch-action:manipulation; -webkit-tap-highlight-color:transparent;
    transition:opacity .25s ease, transform .25s ease, background-color .25s ease;
  }
  #${ID} .n1smfc-btn svg {display:block;width:21px;height:21px;fill:none;stroke:currentColor;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}
  #${ID} .n1smfc-btn:hover,#${ID} .n1smfc-btn:focus-visible {
    outline:2px solid #A8CF62;outline-offset:2px;
    background:rgba(20,23,21,.92)!important;
  }
  #${ID} .n1smfc-wa:after {
    content:"";position:absolute;top:8px;right:8px;width:5px;height:5px;
    border-radius:50%;background:#A8CF62;
  }
  #${ID} .n1smfc-top:not([data-on]) {
    opacity:0!important;visibility:hidden!important;
    transform:translateY(12px);pointer-events:none!important;
  }
  #${ID}[data-menu-open] {opacity:0!important;visibility:hidden!important;pointer-events:none!important}
  #${ID} .n1smfc-sr {position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
}
@media(max-width:767px){
  body.${BODY_CLASS} #${ID} {
    right:calc(14px + env(safe-area-inset-right,0px))!important;
    bottom:calc(16px + env(safe-area-inset-bottom,0px))!important;
    gap:8px;
  }
  #${ID} .n1smfc-btn {
    width:44px!important;height:44px!important;min-width:44px!important;min-height:44px!important;
  }
}
@media(min-width:1025px){#${ID}{display:none!important}}
@media(prefers-reduced-motion:reduce){#${ID} .n1smfc-btn{transition:none!important}}
`;

  function hasStudio() {
    const page = document.querySelector(TAG);
    return !!(page && page.isConnected);
  }
  function findHeader() {
    return document.querySelector(TAG + ' n1-header');
  }
  function update() {
    raf = 0;
    if (!overlay) return;
    const header = findHeader();
    const menuOpen = !!(header && header.hasAttribute('data-open'));
    overlay.toggleAttribute('data-menu-open', menuOpen);
    const on = window.scrollY > window.innerHeight * 0.5;
    topButton.toggleAttribute('data-on', on);
    topButton.inert = !on;
    topButton.setAttribute('aria-hidden', on ? 'false' : 'true');
    topButton.tabIndex = on ? 0 : -1;
  }
  function scheduleUpdate() {
    if (!raf) raf = window.requestAnimationFrame(update);
  }
  function observeHeader() {
    if (menuObserver) menuObserver.disconnect();
    menuObserver = new MutationObserver(scheduleUpdate);
    const h = findHeader();
    if (h) menuObserver.observe(h, {attributes:true,attributeFilter:['data-open']});
    scheduleUpdate();
  }
  function onTopClick() {
    // Native scrolling; no extra GSAP copy or library, no reliance on a hidden button.
    const reduced = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    window.scrollTo({top:0,left:0,behavior:reduced ? 'instant' : 'smooth'});
  }
  function mount() {
    if (overlay || !hasStudio() || !document.body) return;
    const style = document.getElementById(CSS_ID) || document.createElement('style');
    if (!style.id) {style.id = CSS_ID;style.textContent = CSS;document.head.appendChild(style);}
    overlay = document.createElement('nav');
    overlay.id = ID;
    overlay.setAttribute('aria-label','Hızlı erişim');
    overlay.innerHTML = `
      <button type="button" class="n1smfc-btn n1smfc-top" aria-label="Sayfanın başına dön" aria-hidden="true" tabindex="-1">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6"/></svg>
      </button>
      <a class="n1smfc-btn n1smfc-wa" target="_blank" rel="noopener noreferrer" href="${LINK}" aria-label="WhatsApp'tan 1N Digital Media'ya yaz (yeni sekme)">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.6 20.4l1.25-4.1A8.6 8.6 0 1 1 8 19.3z"/><path d="M9.05 8.05c.3-.55.75-.6 1.05-.6.25 0 .45.1.55.35l.75 1.75c.08.2.05.45-.1.62l-.6.68c.6 1.2 1.55 2.15 2.8 2.8l.68-.6c.17-.15.42-.18.62-.1l1.75.75c.25.1.35.3.35.55 0 .3-.05.75-.6 1.05-.6.33-1.45.45-2.4.05a9.6 9.6 0 0 1-4.9-4.9c-.4-.95-.28-1.8.05-2.4z" fill="currentColor" stroke="none"/></svg>
        <span class="n1smfc-sr">WhatsApp'tan yaz</span>
      </a>`;
    topButton = overlay.querySelector('.n1smfc-top');
    topButton.addEventListener('click',onTopClick);
    document.body.appendChild(overlay);
    document.body.classList.add(BODY_CLASS);
    window.addEventListener('scroll',scheduleUpdate,{passive:true});
    window.addEventListener('resize',scheduleUpdate,{passive:true});
    observeHeader();
    scheduleUpdate();
  }
  function unmount() {
    if (!overlay) return;
    if (menuObserver) menuObserver.disconnect();
    menuObserver = null;
    window.removeEventListener('scroll',scheduleUpdate);
    window.removeEventListener('resize',scheduleUpdate);
    if (raf) window.cancelAnimationFrame(raf);
    raf = 0;
    if (topButton) topButton.removeEventListener('click',onTopClick);
    if (overlay) overlay.remove();
    overlay = null;
    topButton = null;
    document.body.classList.remove(BODY_CLASS);
  }
  function reconcile() {
    resizeRaf = 0;
    if (hasStudio()) {
      if (!overlay) mount();
      else if (!menuObserver || !findHeader()) scheduleUpdate();
      else observeHeader();
    } else unmount();
  }
  function scheduleReconcile() {
    if (!resizeRaf) resizeRaf = window.requestAnimationFrame(reconcile);
  }
  function observeLifecycle() {
    if (disposed || !document.body) return;
    lifecycleObserver = new MutationObserver(scheduleReconcile);
    lifecycleObserver.observe(document.body,{subtree:true,childList:true});
    scheduleReconcile();
  }
  function start() {
    if (document.body) observeLifecycle();
    else document.addEventListener('DOMContentLoaded',observeLifecycle,{once:true});
  }

  window[KEY] = {version:'10',get installed(){return !!overlay;}};
  if (customElements.get(TAG)) {
    start();
  } else {
    const source = document.createElement('script');
    source.src = V9;
    source.async = false;
    source.onerror = function () {
      bootFailed = true;
      console.error('[1N Stüdyo V10] Onaylı V9 kaynağı yüklenemedi:', V9);
    };
    source.onload = function () {
      if (!bootFailed) customElements.whenDefined(TAG).then(start);
    };
    document.head.appendChild(source);
  }
})();