/*!
 * n1-career-v1 — 1N Digital Media · Kariyer bölümü (İnsan Kaynakları · Açık Pozisyonlar · Staj Programları)
 * Wix Studio Custom Element · tek dosya, üç etiket (her sayfaya kendi etiketi eklenir; aynı Server URL):
 *   /insan-kaynaklari  → n1-insan-kaynaklari-v1
 *   /acik-pozisyonlar  → n1-acik-pozisyonlar-v1
 *   /staj-programlari  → n1-staj-programlari-v1
 * Kaynak: wix-career-v1/src (tools/build_pages.py ile üretilir). Tasarım: wix-career-v1/DESIGN_GUIDE.md.
 *
 * Mimari: Light DOM, sınıf öneki cr-. Header (v13, kariyer menüsü), site işaretlemesi (v15), Footer, WhatsApp / Yukarı Çık
 *   commit'e sabit adreslerden yüklenir; sayfada başka bir Header / Footer / kontrol katmanı varsa ikincisi oluşturulmaz
 *   (Kısaca Biz sayfasının onaylı iskeleti ve mobil kurtarma mantığı).
 * Performans: video, canvas, WebGL, görsel dosyası, ScrollTrigger, sürekli animasyon YOK. GSAP çekirdeği yalnız sayfada yoksa yüklenir
 *   ve yalnız bir kerelik metin girişi için kullanılır (görünür olunca; prefers-reduced-motion'da hiç). GSAP yüklenemezse içerik
 *   son hâliyle görünür (başlangıçta CSS ile gizlenen hiçbir şey yok).
 * Yaşam döngüsü: dinleyici, zamanlayıcı, IntersectionObserver ve gsap.context bileşene bağlıdır; disconnectedCallback'te temizlenir.
 *   BFCache dönüşünde Header kurtarılır; animasyon yeniden oynatılmaz (içerik zaten son hâlinde).
 * Yükseklik: içerikten gelir (100vh / sabit yükseklik yok). Wix: genişlik %100, yükseklik Auto.
 * SEO: tek H1 (sayfa başlığı). Başlık, açıklama ve canonical Wix sayfa SEO ayarlarındadır (SEO_SETTINGS.md). JobPosting verisi yok.
 * İsteğe bağlı öznitelik (yalnız Wix dışı önizleme): deps-base="<klasör>/"
 */
(function () {
  'use strict';
  var STYLE_ID = 'n1-cr-style';

  /* ---------- Onaylı kaynaklar (commit'e sabit) ---------- */
  var CDN = 'https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@';
  var C648 = 'd24fa373d6d76c0218b3f3b77897a8c2ace04e5e';
  var CCR = '{{CCR}}';   /* KARİYER V1: header v13 (hibrit İK satırı) + site işaretlemesi v15 (kariyer menüsü) */
  var CRESP = '09612df97e85978976d13edbd79dad0adcc1d1f1';
  var PATHS = {
    markup: CCR + '/wix-career-v1/site/n1-site-markup-v15.js',
    header: CCR + '/wix-career-v1/modules/n1-header-v13.js',
    footerJs: C648 + '/wix-full-v1/modules/n1-footer-v646.js',
    footerCss: C648 + '/wix-full-v1/modules/n1-footer-v636.css',
    links: C648 + '/wix-full-v1/modules/n1-links-v646.js',
    floating: C648 + '/wix-full-v1/modules/n1-floating-controls-v632.js',
    responsive: CRESP + '/wix-studyo-v1/site/n1-inner-responsive-v6.css',
    assets: C648 + '/wix-full-v1/aktarim-medya/'
  };
  var FONTS = 'https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@400;500;600;700&display=swap';
  var GSAP = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js';
  var PARTNER_ART = {
    tablet: 'https://static.wixstatic.com/media/6dbf5e_800ff5a00ba244f9bb31761a6b2d713d~mv2.png',
    mobile: 'https://static.wixstatic.com/media/6dbf5e_32b849155e954320a1f6479f27fd6ad2~mv2.png'
  };

{{CONTENT}}

  /* ---------- Yardımcılar (Kısaca Biz v1 onaylı iskeletinden, değiştirilmeden) ---------- */
{{HELPERS}}

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  var ARROW_UR = '<svg class="cr-ico" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" aria-hidden="true" focusable="false"><path d="M7 17L17 7M9 7h8v8"/></svg>';
  var ARROW_L = '<svg class="cr-ico" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" aria-hidden="true" focusable="false"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>';
  function kicker(k, cls) { return '<p class="' + cls + '"><span class="cr-k-n">' + esc(k[0]) + '</span><span class="cr-k-s" aria-hidden="true">/</span><span>' + esc(k[1]) + '</span></p>'; }
  function title2(t, tag, cls) {   // iki satırlı tipografik başlık; son nokta vurgu renginde
    return '<' + tag + ' class="' + cls + '"><span class="cr-ln">' + esc(t[0]) + '</span> <span class="cr-ln">' + esc(t[1]) + '<span class="cr-stop">.</span></span></' + tag + '>';
  }
  function pad2(n) { return (n < 10 ? '0' : '') + n; }

  function markup(c) {
    var h = '<main class="cr cr--' + c.kind + '">' +
      '<section class="cr-hero cr-wrap" aria-labelledby="cr-h1">' +
        '<div class="cr-meta" data-cr-in>' + kicker(c.kicker, 'cr-kicker') + '<p class="cr-path" aria-hidden="true">' + 'reklam1n.com' + esc(c.path) + '</p></div>' +
        title2(c.title, 'h1', 'cr-title').replace('<h1 class="cr-title">', '<h1 class="cr-title" id="cr-h1" data-cr-in>') +
        '<div class="cr-lead" data-cr-in><p class="cr-accent">' + esc(c.accent) + '</p><p class="cr-desc">' + esc(c.desc) + '</p></div>' +
      '</section>';
    if (c.kind === 'hub') {
      h += '<section class="cr-doors cr-wrap" aria-label="Kariyer alanları">' + c.doors.map(function (d) {
        return '<a class="cr-door cr-door--' + d.tone + '" href="' + esc(d.href) + '" data-cr-rise>' +
          '<div class="cr-door__top">' + kicker(d.kicker, 'cr-door__kicker').replace(/^<p/, '<span').replace(/<\/p>$/, '</span>') + '<span class="cr-door__arrow">' + ARROW_UR + '</span></div>' +
          '<div class="cr-door__body">' + title2(d.title, 'h2', 'cr-door__title') + '<p class="cr-door__sub">' + esc(d.sub) + '</p></div>' +
        '</a>';
      }).join('') + '</section>';
    } else {
      var n = (c.items || []).length;
      h += '<section class="cr-status cr-wrap" aria-label="Durum" data-cr-rise>' +
        '<div class="cr-status__frame">' +
          '<p class="cr-status__count"><data value="' + n + '">' + pad2(n) + '</data><span>' + esc(c.countLabel) + '</span></p>' +
          '<div class="cr-status__body"><p class="cr-status__label"><i aria-hidden="true"></i>Durum</p>' +
          '<p class="cr-status__text">' + esc(n ? c.listLabel : c.empty) + '</p></div>' +
        '</div>' +
        (n ? '<ul class="cr-list" aria-label="' + esc(c.listLabel) + '">' + c.items.map(function (it) {   // ileride: gerçek kayıtlar
          return '<li><a class="cr-list__a" href="' + esc(it.href) + '"><span class="cr-list__t">' + esc(it.title) + '</span><span class="cr-list__m">' + esc(it.meta || '') + '</span>' + ARROW_UR + '</a></li>';
        }).join('') + '</ul>' : '') +
      '</section>' +
      '<nav class="cr-back cr-wrap" aria-label="Kariyer" data-cr-rise><a class="cr-back__a" href="' + esc(c.back.href) + '">' + ARROW_L + '<span>' + esc(c.back.text) + '</span></a></nav>';
    }
    return h + '</main>';
  }

  /* ---------- Stil (yalnız bu bileşenler; tek <style>, üç etikete ortak) ---------- */
  var S = 'n1-insan-kaynaklari-v1,n1-acik-pozisyonlar-v1,n1-staj-programlari-v1';
  var R = ':is(' + S + ')';
  var CSS = [
S + '{--bg:#080A09;--g1:#0D0F0E;--ink:#ECEBE5;--soft:#BDBCB5;--mute:#9A9B95;--dim:#6E706A;--line:rgba(228,227,221,.14);--line2:rgba(228,227,221,.08);--acc:#A2FF00;--acc-ink:#080A09;--ease:cubic-bezier(.22,1,.36,1);',
'  --gap:clamp(16px,2vw,32px);display:block;position:relative;width:100%;background:var(--bg);color:var(--ink);font:400 17px/1.6 Barlow,Arial,sans-serif;-webkit-font-smoothing:antialiased;overflow-x:clip;text-align:left}',
R + ' *,' + R + ' *::before,' + R + ' *::after{box-sizing:border-box;min-width:0}',
R + ' :where(.cr) :where(p,h1,h2,ul){margin:0}',
R + ' :where(.cr) :where(ul){padding:0;list-style:none}',
R + ' :where(.cr) :where(a){color:inherit;text-decoration:none}',
R + ' .cr :focus-visible{outline:2px solid var(--acc);outline-offset:4px}',
R + ' .cr-ico{display:block;flex:none}',
R + ' .cr-wrap{width:90%;margin-left:auto;margin-right:auto}',
/* Kahraman: meta satırı (ince çizgi), dev başlık, vurgu + açıklama */
R + ' .cr-hero{padding:clamp(128px,13vw,200px) 0 clamp(48px,6vw,96px)}',
R + ' .cr-meta{display:flex;align-items:center;justify-content:space-between;gap:16px;padding-bottom:16px;border-bottom:1px solid var(--line)}',
R + ' .cr-kicker,' + R + ' .cr-door__kicker{display:inline-flex;align-items:center;gap:10px;font:500 12px/1 Barlow,Arial,sans-serif;letter-spacing:.22em;text-transform:uppercase;color:var(--soft)}',
R + ' .cr-k-n{color:var(--acc)}',
R + ' .cr-k-s{color:var(--dim)}',
R + ' .cr-path{font:400 12px/1 Barlow,Arial,sans-serif;letter-spacing:.08em;color:var(--dim);white-space:nowrap}',
R + ' .cr-title{margin-top:clamp(28px,3.4vw,56px);font:700 clamp(46px,11.6vw,204px)/.9 "Barlow Condensed",Barlow,Arial,sans-serif;letter-spacing:-.01em;text-transform:none;color:var(--ink)}',
R + ' .cr-ln{display:block}',
R + ' .cr-ln+.cr-ln{margin-top:.12em}',   /* Ç kuyruğu ile alt satırdaki İ noktası çakışmasın */
R + ' .cr-stop{color:var(--acc)}',
R + ' .cr-lead{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);row-gap:18px;margin-top:clamp(32px,4vw,64px);padding-top:clamp(20px,2vw,28px);border-top:1px solid var(--line2)}',
R + ' .cr-accent{grid-column:1/span 6;font:500 clamp(26px,2.8vw,44px)/1.04 "Barlow Condensed",Barlow,Arial,sans-serif;letter-spacing:.005em;color:var(--acc)}',
R + ' .cr-desc{grid-column:8/span 5;max-width:46ch;font-size:clamp(16px,1.12vw,19px);line-height:1.62;color:var(--soft)}',
/* İK: iki büyük yönlendirme alanı (tamamı bağlantı) */
R + ' .cr-doors{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:var(--gap);padding-bottom:clamp(64px,6.4vw,112px)}',
R + ' .cr-door{position:relative;display:flex;flex-direction:column;justify-content:space-between;gap:48px;min-height:clamp(320px,33vw,520px);padding:clamp(24px,2.6vw,44px);',
'  border:1px solid transparent;transition:border-color .45s var(--ease),background-color .45s var(--ease)}',
R + ' .cr-door--acc{background:var(--acc);color:var(--acc-ink)}',
R + ' .cr-door--acc .cr-door__kicker{color:var(--acc-ink)}',
R + ' .cr-door--acc .cr-k-n,' + R + ' .cr-door--acc .cr-k-s,' + R + ' .cr-door--acc .cr-stop{color:var(--acc-ink)}',
R + ' .cr-door--dark{background:var(--g1);border-color:var(--line);color:var(--ink)}',
R + ' .cr-door__top{display:flex;align-items:flex-start;justify-content:space-between;gap:16px}',
R + ' .cr-door__arrow{display:grid;place-items:center;width:52px;height:52px;flex:none;border:1px solid currentColor;transition:background-color .45s var(--ease),color .45s var(--ease)}',
R + ' .cr-door--dark .cr-door__arrow{color:var(--acc)}',
R + ' .cr-door__arrow .cr-ico{transition:transform .45s var(--ease)}',
R + ' .cr-door__body{display:block}',
R + ' .cr-door__title{font:700 clamp(40px,5.4vw,96px)/.92 "Barlow Condensed",Barlow,Arial,sans-serif;letter-spacing:-.005em}',
R + ' .cr-door__sub{display:block;margin-top:18px;font:500 clamp(15px,1.1vw,18px)/1.4 Barlow,Arial,sans-serif;letter-spacing:.01em}',
R + ' .cr-door--acc .cr-door__sub{color:rgba(8,10,9,.78)}',
R + ' .cr-door--dark .cr-door__sub{color:var(--soft)}',
R + ' .cr-door:focus-visible{outline-offset:6px}',
'@media (hover:hover) and (pointer:fine){',
R + ' .cr-door:hover .cr-door__arrow .cr-ico{transform:translate(3px,-3px)}',
R + ' .cr-door--acc:hover .cr-door__arrow{background:var(--acc-ink);color:var(--acc)}',
R + ' .cr-door--dark:hover{border-color:rgba(162,255,0,.55)}',
R + ' .cr-door--dark:hover .cr-door__arrow{background:var(--acc);color:var(--acc-ink)}',
R + ' .cr-back__a:hover .cr-ico{transform:translateX(-4px)}',
R + ' .cr-back__a:hover span::after{background:var(--acc)}',
R + ' .cr-list__a:hover{background:rgba(236,235,229,.03)}',
'}',
/* Açık Pozisyonlar / Staj: tipografik durum alanı */
R + ' .cr-status{padding-bottom:clamp(40px,4.4vw,72px)}',
R + ' .cr-status__frame{display:grid;grid-template-columns:minmax(0,4fr) minmax(0,8fr);align-items:end;column-gap:var(--gap);row-gap:28px;padding:clamp(24px,3vw,48px);border:1px solid var(--line)}',
R + ' .cr-status__count{display:flex;flex-direction:column;gap:14px}',
R + ' .cr-status__count data{display:block;font:700 clamp(96px,12vw,200px)/.8 "Barlow Condensed",Barlow,Arial,sans-serif;letter-spacing:-.02em;color:transparent;-webkit-text-stroke:1px var(--acc)}',
R + ' .cr-status__count span,' + R + ' .cr-status__label{font:500 12px/1 Barlow,Arial,sans-serif;letter-spacing:.22em;text-transform:uppercase;color:var(--mute)}',
R + ' .cr-status__body{padding-top:clamp(20px,2vw,28px);border-top:1px solid var(--line2)}',
R + ' .cr-status__label{display:flex;align-items:center;gap:10px}',
R + ' .cr-status__label i{display:block;width:8px;height:8px;flex:none;background:var(--acc)}',
R + ' .cr-status__text{margin-top:16px;font:600 clamp(28px,3.4vw,56px)/1.02 "Barlow Condensed",Barlow,Arial,sans-serif;letter-spacing:.002em;color:var(--ink);max-width:22ch}',
R + ' .cr-list{margin-top:var(--gap);border-top:1px solid var(--line)}',
R + ' .cr-list__a{display:grid;grid-template-columns:1fr auto auto;align-items:center;gap:20px;min-height:72px;padding:0 4px;border-bottom:1px solid var(--line);transition:background-color .3s ease}',
R + ' .cr-list__t{font:600 clamp(20px,1.8vw,28px)/1.1 "Barlow Condensed",Barlow,Arial,sans-serif}',
R + ' .cr-list__m{font-size:14px;color:var(--mute)}',
R + ' .cr-back{padding-bottom:clamp(56px,5.6vw,96px)}',
R + ' .cr-back__a{display:inline-flex;align-items:center;gap:14px;min-height:48px;font:500 13px/1 Barlow,Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:var(--ink)}',
R + ' .cr-back__a .cr-ico{color:var(--acc);transition:transform .4s var(--ease)}',
R + ' .cr-back__a span{position:relative;padding:6px 0}',
R + ' .cr-back__a span::after{content:"";position:absolute;left:0;right:0;bottom:0;height:1px;background:var(--line);transition:background-color .4s var(--ease)}',
/* Tablet */
'@media (max-width:1024px){',
R + ' .cr-accent{grid-column:1/-1}',
R + ' .cr-desc{grid-column:1/-1;max-width:56ch}',
'}',
/* Mobil */
'@media (max-width:699px){',
R + ' .cr-hero{padding-top:112px;padding-bottom:40px}',
R + ' .cr-title{font-size:clamp(42px,14.4vw,66px)}',
R + ' .cr-wrap{width:calc(100% - 40px)}',
R + ' .cr-path{display:none}',
R + ' .cr-doors{grid-template-columns:minmax(0,1fr);gap:12px;padding-bottom:48px}',
R + ' .cr-door{min-height:250px;gap:36px;padding:22px}',
R + ' .cr-door__arrow{width:46px;height:46px}',
R + ' .cr-door__title{font-size:clamp(38px,11.4vw,54px)}',
R + ' .cr-status__frame{grid-template-columns:minmax(0,1fr);padding:22px}',
R + ' .cr-status__count data{font-size:clamp(84px,26vw,120px)}',
R + ' .cr-status__text{font-size:clamp(26px,7.6vw,34px)}',
R + ' .cr-back{padding-bottom:40px}',
R + ' .cr-status{padding-bottom:28px}',
'}',
/* Ortak iç sayfa kabuğu: Header paneli ve mobil/tablet Header + Footer düzeni (Kısaca Biz v1 onaylı kuralları, bu etiketler için) */
'.n1h-panel[data-n1-cr],.n1h-panel[data-n1-cr] *,.n1h-panel[data-n1-cr] *::before,.n1h-panel[data-n1-cr] *::after{box-sizing:border-box}',
'.n1h-panel[data-n1-cr] a.n1h-item{text-decoration:none;color:#ecebe6}',
'.n1h-panel[data-n1-cr] .n1h-sub a{text-decoration:none}',
'@media (max-width:1024px){.n1h-panel[data-n1-cr][data-open]::before{content:"";position:fixed;left:0;right:0;bottom:0;top:72px;z-index:-1;pointer-events:none;background:rgba(8,10,9,.8);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}}',
'@media (max-width:767px){.n1h-panel[data-n1-cr][data-open]::before{top:64px}}',
R + ' .n1ft-partner-art{display:none}',
'@media (max-width:1024px){',
R + ' n1-header{display:block!important;position:fixed!important;top:0!important;left:0!important;right:0!important;width:100%!important;min-height:0!important;height:auto!important;z-index:900!important;background:rgba(8,10,9,.95);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);border-bottom:1px solid rgba(228,227,221,.07)}',
R + ' n1-header .n1h-bar.site-container{display:grid!important;align-items:center!important;width:calc(100% - 48px)!important;margin-inline:auto!important;padding-inline:0!important;height:72px!important;max-width:100%!important}',
R + ' n1-header .n1h-logo{margin:0!important;flex:none}',
R + ' n1-header .n1h-logo img{width:32px!important;height:32px!important;max-width:none!important}',
R + ' n1-header .n1h-right{align-items:center!important}',
R + ' n1-header .n1h-menu{display:inline-flex!important;height:40px!important;margin:0!important}',
R + ' n1-header .n1h-cta{display:none!important}',
R + ' footer.n1ft .n1ft-partner{opacity:1!important;visibility:visible!important;transform:none!important}',
'}',
'@media (max-width:900px){' + R + ' .n1ft-inner{width:90%}}',
'@media (max-width:767px){',
R + ' n1-header .n1h-bar.site-container{width:calc(100% - 40px)!important;height:64px!important}',
R + ' n1-header .n1h-logo img{width:30px!important;height:30px!important}',
R + ' .n1ft-inner{width:calc(100% - 40px)}',
R + ' .n1ft-top{grid-template-columns:1fr!important;gap:32px;padding:39px 0 36px}',
R + ' .n1ft-col--brand{grid-column:auto}',
R + ' .n1ft-brand{font-size:45px}',
'}',
'@media (max-width:360px){' + R + ' n1-header .n1h-bar.site-container{width:calc(100% - 32px)!important}' + R + ' .cr-wrap,' + R + ' .n1ft-inner{width:calc(100% - 32px)}}',
'@media (prefers-reduced-motion:reduce){' + R + ' .cr *{transition-duration:0s!important}}'
  ].join('\n');

  /* ---------- Bileşen ---------- */
  function define(TAG) {
    if (customElements.get(TAG)) return;
    var C = PAGES[TAG], LOG = '[' + TAG + ']';
    class CareerPage extends HTMLElement {
      connectedCallback() {
        if (this._on) return;
        this._on = true;
        this._cleanups = [];
        var base = this.getAttribute('deps-base');
        var url = function (k) { return (base ? base.replace(/\/?$/, '/') + 'gh@' : CDN) + PATHS[k]; };
        this._url = url;
        this.classList.add('n1-inner-page');
        var n1MountEpoch = this._n1Epoch = (this._n1Epoch || 0) + 1;
        this._mount().catch((e) => {
          if (n1MobileRepair() && (!this._on || this._n1Epoch !== n1MountEpoch)) return;
          console.error(LOG, e);
          if (!this.querySelector('main.cr')) this.innerHTML = '<p style="padding:40px 5%;color:#ECEBE5;font:16px Barlow,Arial,sans-serif">Sayfa yüklenemedi. Lütfen sayfayı yenileyin.</p>';
        });
      }

      async _mount() {
        var n1M = n1MobileRepair(), n1Epoch = this._n1Epoch;
        var n1Alive = () => this._on && (!n1M || (this.isConnected && this._n1Epoch === n1Epoch));
        var self = this, url = this._url;
        // 1) Sayfa CSS'i ve içerik hemen (ağ beklemeden) — içerik ilk boyamada son hâlinde görünür
        if (!document.getElementById(STYLE_ID)) { var st = document.createElement('style'); st.id = STYLE_ID; st.textContent = CSS; document.head.appendChild(st); }
        this.innerHTML = '<div id="ust" style="height:0"></div>' + markup(C);

        // 2) Ortak kaynaklar paralel
        var fonts = loadCss(FONTS).catch(function (e) { console.warn(LOG, 'Font yüklenemedi, yedek font kullanılıyor', e); });
        await Promise.all([n1Optional(loadCss(url('footerCss')), 'footer CSS'), n1Optional(loadCss(url('responsive')), 'responsive CSS'), loadJs(url('markup'), function () { return !!window.N1_SITE_MARKUP; })]);
        if (!n1Alive()) return;

        // 3) Header / Footer / WhatsApp — onaylı site işaretlemesinden (v15)
        var tpl = document.createElement('template');
        tpl.innerHTML = String(window.N1_SITE_MARKUP || '').split('{{ASSETS}}').join(url('assets'));
        var hdr = tpl.content.querySelector('n1-header'), ft = tpl.content.querySelector('[data-n1-footer]'), fc = tpl.content.querySelector('n1-floating-controls');
        if (!hdr || !ft) throw new Error('Onaylı Header/Footer işaretlemesi bulunamadı');
        var main = this.querySelector('main.cr');

        function n1EnsureHeader() {
          if (!n1Alive() || (self._header && self._header.isConnected)) return;
          var otherHeader = [].some.call(document.querySelectorAll('n1-header'), function (h) { return !self.contains(h) && (!n1M || (h.isConnected && h.getClientRects().length > 0)); });
          if (otherHeader) return;
          var header = hdr.cloneNode(true);
          header.setAttribute('logo-href', '/');
          header.setAttribute('cta-href', header.getAttribute('cta-href') || '/teklif-al');
          var js = header.querySelector('script[type="application/json"]');
          if (js) {
            try {
              var menu = JSON.parse(js.textContent);
              if (menu.brand) menu.brand.href = '/';
              (menu.items || []).forEach(function (it) { if (it.href === '#hizmetler-ozet' && !(it.sub || []).length) { it.href = '/#hizmetler-ozet'; delete it.match; } });
              js.textContent = JSON.stringify(menu);
            } catch (e) { console.warn(LOG, 'Menü verisi okunamadı; onaylı veri olduğu gibi kullanılıyor', e); }
          }
          self.insertBefore(header, main);
          self._header = header;
        }
        async function n1InitHeader() {
          if (!n1Alive()) return; n1EnsureHeader();
          if (!self._header) return;
          if (!customElements.get('n1-header')) await loadJs(url('header'), function () { return !!customElements.get('n1-header'); });
          if (!n1Alive() || !self._header || !self._header.isConnected) return;
          if (!self._header.panel && self._header.connectedCallback) self._header.connectedCallback();
          if (self._header.panel && !self._header.panel.isConnected) document.body.appendChild(self._header.panel);
          if (self._header.panel) { self._header.panel.classList.add('n1-inner-panel'); self._header.panel.setAttribute('data-n1-cr', ''); }
        }
        n1EnsureHeader();
        if (n1M) {
          var busy = false;
          var recoverHeader = function () {
            if (busy || !n1Alive()) return;
            if (self._header && self._header.isConnected && self._header.panel && self._header.panel.isConnected) return;
            busy = true; n1InitHeader().catch(function (e) { console.warn('[1N mobile] header recovery', e); }).then(function () { busy = false; });
          };
          [100, 400, 1000, 2500].forEach(function (ms) { var t = setTimeout(recoverHeader, ms); self._cleanups.push(function () { clearTimeout(t); }); });
          n1Listen(self, window, 'pageshow', function (e) { if (e.persisted) recoverHeader(); });
        }

        var fw = document.createElement('template'); fw.innerHTML = ft.outerHTML;
        var footerRoot = fw.content.querySelector('footer.n1ft');
        var partners = footerRoot && footerRoot.querySelector('.n1ft-partners');
        if (partners) {
          var pic = document.createElement('picture'); pic.className = 'n1ft-partner-art';
          var src = document.createElement('source'); src.media = '(max-width: 767px)'; src.srcset = PARTNER_ART.mobile;
          var img = document.createElement('img'); img.src = PARTNER_ART.tablet; img.alt = '1N Digital Media iş ortakları ve sertifikalar'; img.loading = 'lazy'; img.decoding = 'async';
          img.onerror = function () { pic.classList.add('n1-art-failed'); };
          pic.append(src, img); partners.parentNode.insertBefore(pic, partners);
        }
        var copy = fw.content.querySelector('.n1ft-copy');
        if (copy) copy.textContent = copy.textContent.replace(/©\s*\d{4}/, '© ' + new Date().getFullYear());
        this.append(fw.content);

        var otherFc = [].some.call(document.querySelectorAll('n1-floating-controls'), function (f) { return !self.contains(f); }) || !!document.querySelector('.n1fc:not([data-n1-cr])');
        if (fc && !otherFc) {
          var floating = fc.cloneNode(true);
          if (matchMedia('(max-width:1024px)').matches) floating.setAttribute('show-after', '0.5');
          this.append(floating);
          document.body.classList.add('n1-inner-fc-enabled');
          this._fcOwned = true;
        }

        // 4) Header, GSAP çekirdeği (yalnız yoksa), paylaşılan modüller — onaylı sırayla
        if (n1M) await n1InitHeader().catch(function (e) { console.warn('[1N mobile] early header', e); });
        if (!n1Alive()) return;
        await n1Optional(fonts, 'fonts');
        if (!window.gsap) await loadJs(GSAP, function () { return !!window.gsap; }).catch(function (e) { console.warn(LOG, 'GSAP yüklenemedi; içerik animasyonsuz gösterilir', e); });
        if (!n1Alive()) return;
        this._animate();   // içerik girişi Header/Footer modüllerini beklemez
        await n1Optional(loadJs(url('links'), null, true), 'links');
        if (!n1Alive()) return;
        if (!n1M) {
          if (this._header) {
            if (!customElements.get('n1-header')) await loadJs(url('header'), function () { return !!customElements.get('n1-header'); });
            else if (!this._header.panel && this._header.connectedCallback) this._header.connectedCallback();
            if (this._header.panel) { this._header.panel.classList.add('n1-inner-panel'); this._header.panel.setAttribute('data-n1-cr', ''); }
          }
        } else await n1InitHeader().catch(function (e) { console.warn('[1N mobile] header', e); });
        if (!n1Alive()) return;
        await loadJs(url('footerJs'), null, true);
        if (this._fcOwned && !customElements.get('n1-floating-controls')) await loadJs(url('floating'), function () { return !!customElements.get('n1-floating-controls'); });
        var layer = document.querySelector('body > .n1fc:last-of-type'); if (this._fcOwned && layer) layer.setAttribute('data-n1-cr', '');
      }

      // Tek seferlik, hafif giriş: kahraman hemen; alt bloklar görünür olunca (IntersectionObserver). Hareket azaltmada hiç çalışmaz.
      _animate() {
        var G = window.gsap; if (!G || this._ctx || this._animated) return;
        this._animated = true;   // BFCache dönüşünde / yeniden bağlanmada tekrar oynatılmaz
        var root = this;
        this._ctx = G.context(function () {
          var mm = G.matchMedia();
          mm.add('(prefers-reduced-motion: no-preference)', function () {
            var hero = root.querySelectorAll('[data-cr-in]'), rise = root.querySelectorAll('[data-cr-rise]');
            G.from(hero, { autoAlpha: 0, y: 18, duration: 0.9, ease: 'power3.out', stagger: 0.09, clearProps: 'transform,opacity,visibility' });
            if (!rise.length || !('IntersectionObserver' in window)) return;
            G.set(rise, { autoAlpha: 0, y: 26 });
            var io = new IntersectionObserver(function (es) {
              es.forEach(function (e) {
                if (!e.isIntersecting) return; io.unobserve(e.target);
                G.to(e.target, { autoAlpha: 1, y: 0, duration: 0.85, ease: 'power3.out', delay: 0.05, clearProps: 'transform,opacity,visibility' });
              });
            }, { rootMargin: '0px', threshold: 0 });   // tek piksel görünür olunca: sayfa sonundaki öğe asla gizli kalmaz
            rise.forEach(function (el) { io.observe(el); });
            var reveal = function () { io.disconnect(); G.set(rise, { clearProps: 'transform,opacity,visibility' }); };   // klavye odağı gizli öğeye düşmesin
            root.addEventListener('focusin', reveal, { once: true });
            // güvence: görünür alandaki bir öğe herhangi bir nedenle (yükseklik değişimi, kesilen gözlemci) tetiklenmediyse 3 sn sonra açılır
            var guard = setTimeout(function () { rise.forEach(function (el) { var r = el.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0 && +getComputedStyle(el).opacity < 1) { io.unobserve(el); G.to(el, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }); } }); }, 3000);
            return function () { io.disconnect(); clearTimeout(guard); root.removeEventListener('focusin', reveal); };
          });
        }, this);
      }

      disconnectedCallback() {
        this._n1Epoch = (this._n1Epoch || 0) + 1;
        this._on = false;
        if (this._ctx) { this._ctx.revert(); this._ctx = null; }       // tweens + matchMedia + IntersectionObserver
        this._animated = false;
        var self = this;                                                // paylaşılan Footer modülünün bu sayfadaki tetikleyicileri
        if (window.ScrollTrigger) window.ScrollTrigger.getAll().forEach(function (t) { var el = t.trigger; if (el && (self.contains(el) || !el.isConnected)) t.kill(); });
        (this._cleanups || []).forEach(function (f) { try { f(); } catch (e) {} });
        this._cleanups = [];
        if (this._fcOwned) document.body.classList.remove('n1-inner-fc-enabled');
        this._fcOwned = false; this._header = null;
        this.replaceChildren();                                         // Header paneli ve WhatsApp katmanı kendi disconnectedCallback'lerinde kaldırılır
        var st = document.getElementById(STYLE_ID); if (st && !document.querySelector(S)) st.remove();
      }
    }
    customElements.define(TAG, CareerPage);
  }
  Object.keys(PAGES).forEach(define);
})();
