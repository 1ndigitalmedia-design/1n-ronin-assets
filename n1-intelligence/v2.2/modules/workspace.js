/* 1N INTELLIGENCE V2.2 — Çalışma alanı: marka, bölüm navigasyonu ve tema kontrolü (#htmlNav, yeni embed)
   Wix site menüsünden ayrıdır; yalnızca bu sayfadaki dashboard bölümlerine geçiş sağlar.
   Sözleşme (V2 ile aynı; Velo eki gerekir, mevcut sözleşmeleri değiştirmez):
     widget → Velo: { action:'n1iNavigate', target }        Velo: $w('#htmlX').scrollTo()
     Velo → widget: { action:'n1iActive', target }          Velo: onViewportEnter
     widget → Velo: { action:'n1iSetTheme', theme }         Velo: tercihi saklar, bütün embed'lere yayınlar
     Velo → bütün embed'ler: { action:'n1iTheme', theme }   (çekirdek uygular)
   V2.1:
     - Masaüstü/tablet: iki satır. Üstte müşteri adı + ürün kimliği + tema; altta ikon + kısa adlı sekmeler.
       Sekmeler sığmazsa yatay kaydırılır (kenar soluklaşması + ok düğmeleri). Yazı küçültülmez.
     - Mobil (< 720 px): sekmeler "Bölüm" düğmesindeki cam menüye taşınır; düğme etkin bölümün adını gösterir.
     - Tema kontrolü her genişlikte görünür (güneş / ay, 44 px dokunma alanı).
     - Etkin sekme kayan gösterge ile belirtilir (GSAP varsa 240 ms; yoksa / hareket azaltmada anında).
   V2.2 — erişim kodu kapısı (yalnızca Velo isterse görünür; istemezse V2.1 ile aynı):
     Velo → widget: { action:'n1iAuthRequired', reason, remember }   kapıyı göster
     widget → Velo: { action:'n1iAuthSubmit', code, remember }       kod alanı gönderimden hemen sonra temizlenir
     Velo → widget: { action:'n1iAuthResult', ok, message, retryAfterSec }
     widget → Velo: { action:'n1iSignOut' }
   Oturum belirteci bu embed'e hiç gelmez.
   Bu embed Wix içinde "sticky" DEĞİLDİR: iFrame kendi dışına sabitlenemez. Wix Studio'da bölüm sabitleme
   ayrıca denenmeli (WIX_SETUP.md). Tema düğmesi temayı KENDİSİ değiştirmez; yalnızca isteği iletir. */
(function () {
  'use strict';
  var N = window.N1I, esc = N.esc, ui = N.ui;
  var root = document.getElementById('n1i-root');
  var c = N.cfg.client || {};
  var mods = Array.isArray(c.modules) ? c.modules.filter(function (m) { return m.enabled !== false; }) : [];
  var active = mods.length ? mods[0].id : null, menuOpen = false, pendingTimer = 0, userNavUntil = 0, userNavTarget = null;

  var SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4L6 18M18 6l1.4-1.4"/></svg>';
  var MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>';
  var OUT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4M10 16l-4-4 4-4M6 12h10"/></svg>';
  var EYE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.8"/></svg>';
  var LEFT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>';
  var RIGHT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';

  function label(id) { for (var i = 0; i < mods.length; i++) if (mods[i].id === id) return mods[i].label; return 'Bölümler'; }
  function icon(id) { for (var i = 0; i < mods.length; i++) if (mods[i].id === id) return mods[i].icon || 'info'; return 'menu'; }
  function links(cls) {
    return mods.map(function (m) { return '<li><a href="#' + esc(m.id) + '" class="' + cls + '" data-nav="' + esc(m.id) + '"' + (m.id === active ? ' aria-current="true"' : '') + '>' + N.icon(m.icon || 'info') + '<span>' + esc(m.label) + '</span></a></li>'; }).join('');
  }

  root.innerHTML = '<div class="n1i-wash ws-wrap"><nav class="ws n1i-glass" aria-label="Rapor bölümleri">' +
    '<div class="ws__top">' +
      '<div class="ws__id"><span class="ws__mark" aria-hidden="true" translate="no">1N</span>' +
        '<div class="ws__names"><div class="ws__client">' + esc(c.name || 'Müşteri') + '</div>' +
        '<div class="ws__product"><span translate="no">1N Intelligence</span><span class="ws__dot" aria-hidden="true"></span><span>Dijital performans raporu</span></div></div>' +
        ui.demoChip() + '</div>' +
      '<div class="ws__tools">' +
        '<button type="button" class="ws__toggle" aria-expanded="false" aria-controls="ws-menu"><span class="ws__toggle-ic">' + N.icon(icon(active)) + '</span><span class="ws__toggle-t">' + esc(label(active)) + '</span>' + N.icon('chevron', 'ws__chev') + '<span class="n1i-sr"> — bölüm menüsü</span></button>' +
        '<button type="button" class="ws__out" data-signout hidden aria-label="Oturumu kapat" title="Oturumu kapat">' + OUT + '</button>' +
        '<div class="n1i-seg ws__theme" role="group" aria-label="Tema">' +
          '<button type="button" class="n1i-seg__btn" data-theme-btn="light" aria-pressed="true" aria-label="Açık tema">' + SUN + '<span class="ws__tlabel" aria-hidden="true">Açık</span></button>' +
          '<button type="button" class="n1i-seg__btn" data-theme-btn="dark" aria-pressed="false" aria-label="Koyu tema">' + MOON + '<span class="ws__tlabel" aria-hidden="true">Koyu</span></button>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="ws__tabs">' +
      '<button type="button" class="ws__arrow ws__arrow--l" data-scroll="-1" aria-label="Önceki bölümler" tabindex="-1" hidden>' + LEFT + '</button>' +
      '<ul class="ws__links" role="list"><li class="ws__ind" aria-hidden="true" role="presentation"></li>' + links('ws__link') + '</ul>' +
      '<button type="button" class="ws__arrow ws__arrow--r" data-scroll="1" aria-label="Sonraki bölümler" tabindex="-1" hidden>' + RIGHT + '</button>' +
    '</div></nav>' +
    '<div class="ws__menu n1i-glass n1i-glass--strong" id="ws-menu" hidden><ul role="list">' + links('ws__mlink') + '</ul></div>' +
    '<div class="ws__msgwrap"><p class="ws__msg n1i-toast n1i-glass" role="status" aria-live="polite" hidden></p></div>' +
    '<section class="ws__gate n1i-glass n1i-glass--strong" aria-labelledby="ws-gate-t" hidden>' +
      '<div class="ws__gate-ic" aria-hidden="true">' + N.icon('lock') + '</div>' +
      '<div class="ws__gate-body"><h2 class="ws__gate-t" id="ws-gate-t">Rapor erişim kodu</h2>' +
      '<p class="ws__gate-p">Bu rapor yalnızca size verilen erişim koduyla açılır. Kodu 1N Digital Media ekibinden alabilirsiniz.</p>' +
      '<form class="ws__form" novalidate autocomplete="on">' +
        '<label class="ws__lbl" for="ws-code">Erişim kodu</label>' +
        '<div class="ws__field"><input id="ws-code" name="password" type="password" inputmode="text" autocomplete="current-password" autocapitalize="characters" spellcheck="false" maxlength="80" required aria-describedby="ws-gerr">' +
          '<button type="button" class="ws__eye" data-eye aria-pressed="false" aria-label="Kodu göster">' + EYE + '</button></div>' +
        '<label class="ws__rem" hidden><input type="checkbox" data-remember> <span>Bu cihazda 30 gün hatırla</span></label>' +
        '<p class="ws__gerr" id="ws-gerr" role="alert"></p>' +
        '<button type="submit" class="n1i-btn ws__go" data-go>Raporu aç</button>' +
      '</form></div></section></div>';

  var st = document.createElement('style');
  st.textContent = '.n1i-root{padding-top:16px;padding-bottom:10px}' +
    '.ws-wrap::before{height:100%;inset:-6px -6px -6px -6px}' +
    '.ws{border-radius:26px;padding:12px 12px 10px}' +
    '.ws__top{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:2px 4px 12px 6px}' +
    '.ws__id{display:flex;align-items:center;gap:14px;min-width:0}' +
    '.ws__mark{width:44px;height:44px;border-radius:14px;display:grid;place-items:center;background:var(--n1i-accent);color:var(--n1i-accent-ink);font-family:var(--n1i-font-display);font-weight:600;font-size:19px;letter-spacing:.02em;flex:none;box-shadow:inset 0 1px 0 rgba(255,255,255,.55),0 4px 12px -4px rgba(87,141,25,.55)}' +
    '.ws__names{min-width:0}' +
    '.ws__client{font-weight:600;font-size:23px;line-height:1.12;letter-spacing:-.018em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--n1i-text)}' +
    '.ws__product{display:flex;align-items:center;gap:8px;margin-top:3px;font-size:var(--n1i-fs-sm);font-weight:500;color:var(--n1i-muted);white-space:nowrap}' +
    '.ws__product span:first-child{color:var(--n1i-text-2);font-weight:600}' +
    '.ws__dot{width:3px;height:3px;border-radius:50%;background:var(--n1i-faint);flex:none}' +
    '.ws__tools{display:flex;align-items:center;gap:8px;flex:none}' +
    '.ws__theme .n1i-seg__btn{display:inline-flex;align-items:center;gap:7px;min-height:40px;min-width:44px;padding:0 14px;justify-content:center}' +
    '.ws__theme svg{width:17px;height:17px;flex:none}' +
    '.ws__theme[aria-busy="true"]{opacity:.72}' +
    /* sekme satırı */
    '.ws__tabs{position:relative;display:flex;align-items:center;border-radius:18px;background:var(--n1i-glass-tint);box-shadow:inset 0 0 0 1px var(--n1i-glass-edge)}' +
    '.ws__links{position:relative;display:flex;gap:2px;list-style:none;margin:0;padding:5px;overflow-x:auto;scrollbar-width:none;scroll-behavior:smooth;flex:1;min-width:0;isolation:isolate}' +
    '.ws__links::-webkit-scrollbar{display:none}' +
    '.ws__links li{flex:1 0 auto}' +
    '.ws__ind{position:absolute;z-index:-1;top:5px;bottom:5px;left:0;width:0;border-radius:13px;background:var(--n1i-ink);box-shadow:0 1px 2px rgba(0,0,0,.14),0 6px 14px -4px rgba(0,0,0,.22);opacity:0;pointer-events:none}' +
    '.ws__links.has-ind .ws__ind{opacity:1}' +
    '.ws__link{position:relative;display:flex;align-items:center;justify-content:center;gap:8px;min-height:42px;padding:0 15px;border-radius:13px;color:var(--n1i-text-2);text-decoration:none;font-size:14px;font-weight:600;white-space:nowrap;transition:color var(--n1i-dur-fast) var(--n1i-ease),background-color var(--n1i-dur-fast) var(--n1i-ease)}' +
    '.ws__link svg,.ws__mlink svg{width:17px;height:17px;flex:none}' +
    '.ws__link:hover{color:var(--n1i-text);background:var(--n1i-surface)}' +
    '.ws__link[aria-current="true"]{color:var(--n1i-on-ink)}' +
    '.ws__links:not(.has-ind) .ws__link[aria-current="true"]{background:var(--n1i-ink)}' +
    '.ws__link[aria-current="true"]:hover{background:transparent}.ws__links:not(.has-ind) .ws__link[aria-current="true"]:hover{background:var(--n1i-ink)}' +
    '.ws__link:focus-visible{outline-offset:-2px;border-radius:13px}' +
    /* taşma: kenar soluklaşması + oklar */
    '.ws__tabs.is-ovl-l .ws__links{-webkit-mask-image:linear-gradient(90deg,transparent 0,#000 48px);mask-image:linear-gradient(90deg,transparent 0,#000 48px)}' +
    '.ws__tabs.is-ovl-r .ws__links{-webkit-mask-image:linear-gradient(90deg,#000 calc(100% - 48px),transparent 100%);mask-image:linear-gradient(90deg,#000 calc(100% - 48px),transparent 100%)}' +
    '.ws__tabs.is-ovl-l.is-ovl-r .ws__links{-webkit-mask-image:linear-gradient(90deg,transparent 0,#000 48px,#000 calc(100% - 48px),transparent 100%);mask-image:linear-gradient(90deg,transparent 0,#000 48px,#000 calc(100% - 48px),transparent 100%)}' +
    '.ws__arrow{flex:none;width:36px;height:36px;margin:0 3px;display:grid;place-items:center;border-radius:12px;border:0;background:var(--n1i-surface);color:var(--n1i-text-2);box-shadow:var(--n1i-shadow-1)}' +
    '.ws__arrow svg{width:16px;height:16px}.ws__arrow:hover{color:var(--n1i-text)}' +
    /* mobil menü düğmesi */
    '.ws__toggle{display:none;align-items:center;gap:8px;min-height:44px;padding:0 12px 0 10px;border-radius:var(--n1i-r-pill);border:1px solid var(--n1i-glass-edge);background:var(--n1i-surface);color:var(--n1i-text);font-size:14px;font-weight:600;max-width:52vw;box-shadow:var(--n1i-shadow-1)}' +
    '.ws__toggle-ic{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;background:var(--n1i-ink);color:var(--n1i-on-ink);flex:none}' +
    '.ws__toggle-ic svg{width:15px;height:15px}' +
    '.ws__toggle-t{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}' +
    '.ws__chev{width:16px;height:16px;flex:none;color:var(--n1i-muted);transition:transform var(--n1i-dur) var(--n1i-ease)}' +
    '.ws__toggle[aria-expanded="true"] .ws__chev{transform:rotate(180deg)}' +
    '.ws__menu{margin-top:10px;border-radius:24px;padding:10px;transform-origin:50% 0}' +
    '.ws__menu ul{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}' +
    '.ws__mlink{display:flex;align-items:center;gap:11px;min-height:54px;padding:0 14px;border-radius:16px;background:var(--n1i-surface);border:1px solid var(--n1i-line-soft);color:var(--n1i-text);text-decoration:none;font-size:15px;font-weight:600}' +
    '.ws__mlink svg{color:var(--n1i-text-2)}' +
    '.ws__mlink[aria-current="true"]{background:var(--n1i-ink);color:var(--n1i-on-ink);border-color:var(--n1i-ink)}.ws__mlink[aria-current="true"] svg{color:inherit}' +
    '.ws__msgwrap{display:flex;justify-content:flex-end;padding:0 6px}' +
    /* V2.2 erişim kodu kapısı */
    '.ws__out{width:44px;height:40px;display:grid;place-items:center;border-radius:var(--n1i-r-pill);border:1px solid var(--n1i-glass-edge);background:var(--n1i-surface);color:var(--n1i-text-2);box-shadow:var(--n1i-shadow-1)}.ws__out svg{width:18px;height:18px}.ws__out:hover{color:var(--n1i-text)}' +
    '.ws.is-locked .ws__tabs,.ws.is-locked .ws__toggle{display:none!important}' +
    '.ws__gate{display:flex;gap:20px;align-items:flex-start;margin-top:14px;border-radius:26px;padding:28px}' +
    '.ws__gate[hidden]{display:none}' +
    '.ws__gate-ic{width:48px;height:48px;border-radius:16px;display:grid;place-items:center;background:var(--n1i-accent-surface);color:var(--n1i-accent-ink);flex:none;box-shadow:inset 0 0 0 1px var(--n1i-accent-edge)}.ws__gate-ic svg{width:22px;height:22px}' +
    '.ws__gate-body{flex:1;min-width:0;max-width:520px}' +
    '.ws__gate-t{margin:2px 0 6px;font-size:var(--n1i-fs-title);line-height:1.15;letter-spacing:-.018em;font-weight:600;color:var(--n1i-text)}' +
    '.ws__gate-p{margin:0 0 18px;color:var(--n1i-muted);font-size:var(--n1i-fs-base);line-height:1.5;max-width:60ch}' +
    '.ws__lbl{display:block;font-size:var(--n1i-fs-sm);font-weight:600;color:var(--n1i-text-2);margin:0 0 6px}' +
    '.ws__field{display:flex;align-items:center;gap:6px;border-radius:16px;background:var(--n1i-surface);border:1px solid var(--n1i-line);padding:4px 4px 4px 14px;transition:border-color var(--n1i-dur-fast) var(--n1i-ease),box-shadow var(--n1i-dur-fast) var(--n1i-ease)}' +
    '.ws__field:focus-within{border-color:var(--n1i-accent-ring);box-shadow:0 0 0 2px var(--n1i-accent-ring)}' +
    '.ws__field input{flex:1;min-width:0;min-height:44px;border:0;background:transparent;color:var(--n1i-text);outline:none;font:600 17px/1.2 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;letter-spacing:.08em;outline:none}' +
    '.ws__field[aria-invalid="true"]{border-color:var(--n1i-neg)}' +
    '.ws__eye{width:44px;height:44px;display:grid;place-items:center;border:0;border-radius:12px;background:transparent;color:var(--n1i-muted)}.ws__eye svg{width:19px;height:19px}.ws__eye[aria-pressed="true"]{color:var(--n1i-text)}' +
    '.ws__rem{display:flex;align-items:center;gap:10px;margin:12px 0 0;font-size:var(--n1i-fs-sm);color:var(--n1i-text-2);min-height:32px}.ws__rem input{width:18px;height:18px;accent-color:var(--n1i-ink)}' +
    '.ws__gerr{min-height:20px;margin:10px 0 0;color:var(--n1i-neg);font-size:var(--n1i-fs-sm);font-weight:600}' +
    '.ws__gerr:empty{min-height:0;margin:0}' +
    '.ws__go{margin-top:16px;min-height:48px;padding:0 26px;border-radius:var(--n1i-r-pill);background:var(--n1i-ink);color:var(--n1i-on-ink);border:0;font-weight:600;font-size:15px}' +
    '.ws__go[disabled]{opacity:.55;cursor:not-allowed}' +
    '@media (max-width:719px){.ws__gate{flex-direction:column;align-items:stretch;gap:14px;padding:20px;border-radius:22px}.ws__gate-body{max-width:none}.ws__go{width:100%}.ws__out{order:2;flex:none}}' +
    '.ws__msg{margin:10px 0 0}' +
    '@media (max-width:1439px){.ws__link{padding:0 12px;gap:7px}}' +
    '@media (max-width:1023px){.ws__product span:nth-child(n+2){display:none}.ws__client{font-size:21px}}' +
    '@media (max-width:719px){.ws{padding:10px}.ws__top{padding:0;gap:10px;flex-wrap:wrap}.ws__tools{display:contents}.ws__id{order:1;flex:1 1 0}.ws__theme{order:2;width:auto!important;flex:none}.ws__theme .n1i-seg__btn{flex:none!important}.ws__toggle{order:3;flex:1 1 100%;max-width:none;justify-content:flex-start;min-height:48px;border-radius:16px}.ws__toggle .ws__chev{margin-left:auto}.ws__toggle-t{max-width:none!important}.ws__tabs{display:none}.ws__toggle{display:inline-flex}.ws__tlabel{display:none}.ws__theme .n1i-seg__btn{padding:0;width:44px;min-height:40px}.ws__mark{width:40px;height:40px;font-size:17px;border-radius:13px}.ws__id{gap:11px}.ws .n1i-chip--demo{display:none}.ws__client{font-size:18px}.ws__product{font-size:12.5px}.ws__msgwrap{justify-content:stretch}.ws__msg{width:100%;border-radius:16px}}' +
    '@media (max-width:479px){.ws__product{display:none}.ws__toggle{padding:0 12px 0 10px}}' +
    '@media (max-width:359px){.ws__mark{display:none}.ws__client{font-size:17px}}' +
    '@media (max-width:339px){.ws__menu ul{grid-template-columns:1fr}}' +
    /* mobilde demo etiketi navigasyonun altında, tam görünür */
    '.ws__demo-m{display:none}@media (max-width:719px){.ws__demo-m{display:flex;margin:8px 4px 0}}';
  document.head.appendChild(st);
  if (N.cfg.demo) root.querySelector('.ws-wrap').insertAdjacentHTML('beforeend', '<div class="ws__demo-m">' + ui.demoChip() + '</div>');

  var toggle = root.querySelector('.ws__toggle'), menu = document.getElementById('ws-menu'), themeSeg = root.querySelector('.ws__theme'), msg = root.querySelector('.ws__msg');
  var tabs = root.querySelector('.ws__tabs'), list = root.querySelector('.ws__links'), ind = root.querySelector('.ws__ind');
  var arrowL = root.querySelector('.ws__arrow--l'), arrowR = root.querySelector('.ws__arrow--r');

  /* Taşma durumu: okları ve kenar soluklaşmasını göster */
  function overflow() {
    var max = list.scrollWidth - list.clientWidth;
    var l = list.scrollLeft > 4, r = max - list.scrollLeft > 4;
    tabs.classList.toggle('is-ovl-l', l); tabs.classList.toggle('is-ovl-r', r);
    arrowL.hidden = !l; arrowR.hidden = !r;
  }
  /* Etkin sekmeyi görünür alana getir (yalnızca bu iFrame içindeki listeyi kaydırır; Wix sayfasını kaydırmaz) */
  function reveal(a, smooth) {
    if (!a) return;
    var li = a.parentNode, left = li.offsetLeft - 48, right = li.offsetLeft + li.offsetWidth + 48;
    if (left < list.scrollLeft) list.scrollTo({ left: Math.max(0, left), behavior: smooth ? 'smooth' : 'auto' });
    else if (right > list.scrollLeft + list.clientWidth) list.scrollTo({ left: right - list.clientWidth, behavior: smooth ? 'smooth' : 'auto' });
  }
  function moveInd(animate) {
    var a = list.querySelector('[aria-current="true"]');
    if (!a || !a.offsetWidth) { list.classList.remove('has-ind'); return; }
    var x = a.parentNode.offsetLeft, w = a.offsetWidth;
    list.classList.add('has-ind');
    var g = window.gsap;
    if (animate && g && N.motion.allowed() && ind.getAttribute('data-ready')) g.to(ind, { x: x, width: w, duration: 0.24, ease: 'power3.out', overwrite: true });
    else { ind.style.transform = 'translateX(' + x + 'px)'; ind.style.width = w + 'px'; }
    ind.setAttribute('data-ready', '1');
  }

  /* Mobil menü: GSAP varsa 200 ms açılır, yoksa anında */
  function setMenu(o) {
    menuOpen = o; toggle.setAttribute('aria-expanded', String(o));
    if (o) {
      menu.hidden = false; N.height.schedule();
      var g = window.gsap;
      if (g && N.motion.allowed()) {
        g.fromTo(menu, { opacity: 0, y: -6, scale: 0.985 }, { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: 'power2.out', clearProps: 'transform,opacity' });
        g.fromTo(menu.querySelectorAll('li'), { opacity: 0, y: 4 }, { opacity: 1, y: 0, duration: 0.18, ease: 'power2.out', stagger: 0.015, clearProps: 'transform,opacity' });
      }
      var a = menu.querySelector('[aria-current="true"]') || menu.querySelector('a'); if (a) a.focus();
    } else { menu.hidden = true; N.height.schedule(); }
  }
  function setActive(id, fromUser) {
    if (!id) return;
    active = id;
    root.querySelectorAll('[data-nav]').forEach(function (a) { if (a.getAttribute('data-nav') === id) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
    toggle.querySelector('.ws__toggle-t').textContent = label(id);
    toggle.querySelector('.ws__toggle-ic').innerHTML = N.icon(icon(id));
    reveal(list.querySelector('[aria-current="true"]'), true);
    moveInd(true);
  }
  function showTheme(t) {
    themeSeg.querySelectorAll('[data-theme-btn]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-theme-btn') === t)); });
    themeSeg.removeAttribute('aria-busy');
    N.seg.sync(root, true);
  }
  function toast(text) {
    if (!text) { msg.hidden = true; msg.textContent = ''; N.height.schedule(); return; }
    /* Önce görünür yap, metni bir kare sonra yaz: canlı bölge duyurusu kaçmasın */
    msg.hidden = false; msg.textContent = '';
    requestAnimationFrame(function () { msg.innerHTML = N.icon('alert') + '<span>' + esc(text) + '</span>'; N.height.schedule(); });
    var g = window.gsap; if (g && N.motion.allowed()) g.fromTo(msg, { opacity: 0, y: -4 }, { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out', clearProps: 'transform,opacity' });
  }

  toggle.addEventListener('click', function () { setMenu(!menuOpen); });
  list.addEventListener('scroll', function () { overflow(); }, { passive: true });
  root.addEventListener('click', function (e) {
    var ar = e.target.closest('[data-scroll]');
    if (ar) { list.scrollBy({ left: Number(ar.getAttribute('data-scroll')) * list.clientWidth * 0.7, behavior: 'smooth' }); return; }
    var tb = e.target.closest('[data-theme-btn]');
    if (tb) {
      var t = tb.getAttribute('data-theme-btn');
      if (t === N.theme.get()) { showTheme(t); return; }
      toast('');
      showTheme(t); themeSeg.setAttribute('aria-busy', 'true');
      clearTimeout(pendingTimer);
      var sent = N.theme.request(t);
      /* Sahibi (Wix sayfa kodu) yanıt vermezse seçimi geri al ve açıkla */
      pendingTimer = setTimeout(function () {
        if (N.theme.get() !== t) { showTheme(N.theme.get()); toast('Tema değiştirilemedi: sayfa kodu yanıt vermedi.'); }
      }, sent ? 1500 : 0);
      return;
    }
    var a = e.target.closest('[data-nav]'); if (!a) return;
    e.preventDefault();
    var id = a.getAttribute('data-nav');
    /* Kaydırma sürerken aradaki bölümlerin etkin bildirimi sekmeyi oynatmasın */
    userNavUntil = Date.now() + 1800; userNavTarget = id;
    setActive(id, true);
    if (menuOpen) {
      /* Önce menüyü kapat ve yeni yüksekliği bildir; kaydırma isteği yükseklik oturduktan sonra gider.
         Aksi halde menü kapanınca hedef bölüm yukarı kayar. */
      setMenu(false); toggle.focus(); N.height.now();
      setTimeout(function () { N.bridge.send({ action: 'n1iNavigate', target: id }); }, 180);
      return;
    }
    N.bridge.send({ action: 'n1iNavigate', target: id });
  });
  /* Klavye: sekme listesinde ← → ile gezinme */
  list.addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    var all = Array.prototype.slice.call(list.querySelectorAll('.ws__link')), i = all.indexOf(document.activeElement);
    if (i < 0) return;
    e.preventDefault();
    var n = all[(i + (e.key === 'ArrowRight' ? 1 : -1) + all.length) % all.length]; n.focus(); reveal(n, true);
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menuOpen) { setMenu(false); toggle.focus(); } });
  document.addEventListener('click', function (e) { if (menuOpen && !e.target.closest('#ws-menu') && !e.target.closest('.ws__toggle')) setMenu(false); });
  N.theme.onChange(function (t) { clearTimeout(pendingTimer); toast(''); showTheme(t); N.height.schedule(); });

  function relayout() { overflow(); moveInd(false); reveal(list.querySelector('[aria-current="true"]'), false); }
  window.addEventListener('resize', function () { clearTimeout(relayout._t); relayout._t = setTimeout(relayout, 60); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(relayout);
  showTheme(N.theme.get());
  relayout();
  N.height.start(root);
  /* ---------- V2.2 erişim kodu kapısı ---------- */
  var navEl = root.querySelector('.ws'), gate = root.querySelector('.ws__gate'), form = root.querySelector('.ws__form');
  var codeIn = document.getElementById('ws-code'), field = root.querySelector('.ws__field'), gerr = document.getElementById('ws-gerr');
  var go = root.querySelector('[data-go]'), rem = root.querySelector('.ws__rem'), remBox = root.querySelector('[data-remember]'), outBtn = root.querySelector('[data-signout]');
  var waitTimer = 0, sending = false;
  var REASONS = { EXPIRED: 'Oturum süresi doldu. Erişim kodunu yeniden girin.', REVOKED: 'Oturum sonlandırıldı. Erişim kodunu yeniden girin.', SIGNED_OUT: 'Oturum kapatıldı.' };
  function setErr(t) { gerr.textContent = t || ''; field.setAttribute('aria-invalid', t ? 'true' : 'false'); N.height.schedule(); }
  function lock(d) {
    navEl.classList.add('is-locked'); gate.hidden = false; outBtn.hidden = true;
    if (menuOpen) setMenu(false);
    rem.hidden = !d.remember;
    setErr(REASONS[d.reason] || '');
    sending = false; go.disabled = false; go.textContent = 'Raporu aç';
    N.height.schedule();
    setTimeout(function () { try { codeIn.focus({ preventScroll: true }); } catch (e) { codeIn.focus(); } }, 60);
  }
  function unlock() {
    navEl.classList.remove('is-locked'); gate.hidden = true; outBtn.hidden = false; setErr('');
    sending = false; go.disabled = false; go.textContent = 'Raporu aç';
    relayout(); N.height.schedule();
  }
  function countdown(sec) {
    clearInterval(waitTimer); var left = Math.max(1, Math.min(3600, Number(sec) || 60));
    go.disabled = true;
    function tick() { if (left <= 0) { clearInterval(waitTimer); go.disabled = false; go.textContent = 'Raporu aç'; return; } var m = Math.floor(left / 60), s2 = left % 60; go.textContent = 'Tekrar deneme: ' + m + ':' + (s2 < 10 ? '0' : '') + s2; left--; }
    tick(); waitTimer = setInterval(tick, 1000);
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (sending || go.disabled) return;
    var v = codeIn.value.trim();
    if (v.length < 8) { setErr('Erişim kodunu eksiksiz girin.'); codeIn.focus(); return; }
    sending = true; go.disabled = true; go.textContent = 'Doğrulanıyor…'; setErr('');
    N.bridge.send({ action: 'n1iAuthSubmit', code: v, remember: !rem.hidden && remBox.checked });
    codeIn.value = '';   /* kod DOM'da tutulmaz */
  });
  root.querySelector('[data-eye]').addEventListener('click', function () {
    var show = codeIn.type === 'password'; codeIn.type = show ? 'text' : 'password';
    this.setAttribute('aria-pressed', String(show)); this.setAttribute('aria-label', show ? 'Kodu gizle' : 'Kodu göster');
  });
  outBtn.addEventListener('click', function () { N.bridge.send({ action: 'n1iSignOut' }); });
  N.bridge.listen(function (d) {
    if (d.action === 'n1iAuthRequired') { lock(d); return; }
    if (d.ok) { unlock(); return; }
    sending = false;
    if (d.code === 'RATE_LIMITED' && d.retryAfterSec) { setErr(d.message || 'Çok fazla deneme yapıldı.'); countdown(d.retryAfterSec); }
    else { go.disabled = false; go.textContent = 'Raporu aç'; setErr(typeof d.message === 'string' ? d.message.slice(0, 160) : 'Erişim doğrulanamadı.'); }
    codeIn.focus();
  }, { accept: function (d) { return d.action === 'n1iAuthRequired' || d.action === 'n1iAuthResult'; }, dedupe: function () { return false; } });

  var ids = mods.map(function (m) { return m.id; });
  N.bridge.listen(function (d) { if (Date.now() < userNavUntil && d.target !== userNavTarget) return; setActive(d.target); }, { accept: function (d) { return d.action === 'n1iActive' && ids.indexOf(d.target) > -1; }, dedupe: function () { return false; } });
})();
