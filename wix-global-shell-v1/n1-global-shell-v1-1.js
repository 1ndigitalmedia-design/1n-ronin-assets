/*!
 * n1-global-shell-v1 — 1N Digital Media · bağımsız Header, Footer ve WhatsApp/Yukarı Çık bileşenleri
 * Wix Studio Custom Element · TEK dosya, üç etiket (yalnız Server URL + Tag Name ile kurulur; Velo, Popup, sayfa kodu, iframe mesajlaşması YOK):
 *   n1-global-header-v1    Header: 1N SVG logosu · DIGITAL ADVERTISING AGENCY. · MENU/CLOSE (Teklif Al YOK). Menü = ortak header v14 + menü verisi v16
 *   n1-global-footer-v1    Footer: onaylı kurumsal footer işaretlemesi (site işaretlemesi v16) + footer CSS/JS v636/v646 — mevcut sayfalarla aynı kaynak
 *   n1-global-floating-v1  İsteğe bağlı: onaylı WhatsApp / Yukarı Çık katmanı (v632). Sayfada zaten varsa ikincisini oluşturmaz.
 * Kaynak: wix-global-shell-v1/src (tools/build_shell.py ile üretilir). Belgeler: wix-global-shell-v1/HEADER_COMPONENT.md, FOOTER_COMPONENT.md.
 *
 * Yerleşim: Light DOM. Header ve Footer bileşenin kendi kutusunda akar (sabit/fixed değil): dış genişlik %100 (Wix bölümü), içerik %90.
 *   Menü paneli ortak header modülünün kendi davranışıyla document.body'ye taşınır (position:fixed) — Wix bölüm/kap taşmasından (overflow)
 *   ve yığın bağlamından bağımsız olarak sayfanın üzerinde açılır. Yayınlanmış sitede Custom Element sayfanın kendi DOM'undadır; editör
 *   ve önizlemede Wix bileşeni bir iframe içinde çizer, bu yüzden panel orada kendi kutusuyla sınırlı görünebilir (WIX_COMPATIBILITY.md).
 * Kapsam: bütün kurallar bileşen etiketine, ortak .n1-inner-page sınıfına ve panelin data-n1-gs özniteliğine bağlı; Wix bileşenlerine genel CSS yok.
 * Yaşam döngüsü: her bileşen yalnız kendi kaynaklarını yönetir; yeniden bağlanmada dinleyici çoğalmaz; disconnectedCallback'te temizlenir.
 *   BFCache dönüşünde menü kapalı (header v14 + V1.3 menü kapanışı). Kaydırma kilidi kullanılmaz (panel kendi içinde kayar, dışarı dokunuş kapatır).
 * Performans: video, canvas, WebGL, GSAP, sürekli animasyon yok. Platform logoları yalnız menü ilk açıldığında yüklenir (160/320 WebP).
 */
(function () {
  'use strict';
  var VERSION = '1.1.0';   /* V2.1: header v15 (tek renkli kompakt platform logoları) */
  var CDN = 'https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@';
  var C648 = 'd24fa373d6d76c0218b3f3b77897a8c2ace04e5e';
  var CGS = '9bbcefd65becbc196baebea26600060b01af406c';   /* GLOBAL SHELL V1: header v14 + site işaretlemesi v16 */
  var CRESP = '09612df97e85978976d13edbd79dad0adcc1d1f1';
  var PATHS = {
    markup: CGS + '/wix-global-shell-v1/site/n1-site-markup-v16.js',
    header: '6df38aa58398670c8e2617632ef88b9895bfd4e9/wix-global-shell-v1/modules/n1-header-v15.js',
    footerJs: C648 + '/wix-full-v1/modules/n1-footer-v646.js',
    footerCss: C648 + '/wix-full-v1/modules/n1-footer-v636.css',
    floating: C648 + '/wix-full-v1/modules/n1-floating-controls-v632.js',
    responsive: CRESP + '/wix-studyo-v1/site/n1-inner-responsive-v6.css',
    assets: C648 + '/wix-full-v1/aktarim-medya/'
  };
  var FONTS = 'https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@400;500;600;700&display=swap';
  var PARTNER_ART = {   // mevcut iç sayfalarla aynı onaylı tablet/mobil partner görselleri (Wix Medya)
    tablet: 'https://static.wixstatic.com/media/6dbf5e_800ff5a00ba244f9bb31761a6b2d713d~mv2.png',
    mobile: 'https://static.wixstatic.com/media/6dbf5e_32b849155e954320a1f6479f27fd6ad2~mv2.png'
  };
  var HTAG = 'n1-global-header-v1', FTAG = 'n1-global-footer-v1', XTAG = 'n1-global-floating-v1';

  /* ---------- paylaşılan yükleyiciler (sayfa başına bir kez) ---------- */
  var W = window.__n1GlobalShell = window.__n1GlobalShell || { version: VERSION, js: {}, css: {} };
  function url(el, k) { var b = el.getAttribute('deps-base'); return (b ? b.replace(/\/?$/, '/') + 'gh@' : CDN) + PATHS[k]; }
  function loadJs(src, ready, fresh) {
    if (!fresh && ready && ready()) return Promise.resolve();
    if (!fresh && W.js[src]) return W.js[src];
    var p = new Promise(function (ok, fail) {
      var s = document.createElement('script'); s.src = src; s.async = false;
      var t = setTimeout(function () { fail(new Error('zaman aşımı ' + src)); }, 15000);
      s.onload = function () { clearTimeout(t); if (fresh) s.remove(); ok(); };
      s.onerror = function () { clearTimeout(t); s.remove(); if (!fresh) delete W.js[src]; fail(new Error('yüklenemedi ' + src)); };
      document.head.appendChild(s);
    });
    if (!fresh) W.js[src] = p;
    return p;
  }
  function loadCss(href) {
    if (W.css[href]) return W.css[href];
    if ([].some.call(document.querySelectorAll('link[rel="stylesheet"]'), function (l) { return l.href === href; })) return (W.css[href] = Promise.resolve());
    return (W.css[href] = new Promise(function (ok) {
      var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = href;
      l.onload = function () { ok(); }; l.onerror = function () { ok(); };   // CSS yoksa da bileşen çalışır
      document.head.appendChild(l);
    }));
  }
  function markupTpl(el) {
    return loadJs(url(el, 'markup'), function () { return !!window.N1_SITE_MARKUP; }).then(function () {
      var t = document.createElement('template');
      t.innerHTML = String(window.N1_SITE_MARKUP || '').split('{{ASSETS}}').join(url(el, 'assets'));
      return t;
    });
  }
  function style(id, css) { if (document.getElementById(id)) return; var s = document.createElement('style'); s.id = id; s.textContent = css; document.head.appendChild(s); }
  function listen(owner, el, type, fn, opt) { el.addEventListener(type, fn, opt); owner._cleanups.push(function () { el.removeEventListener(type, fn, opt); }); }

  /* ---------- Header ---------- */
  var H = HTAG;
  var HCSS = [
H + '{display:block;position:relative;width:100%;height:88px;background:#080A09;color:#e4e3dd;font-family:Barlow,"Helvetica Neue",Arial,sans-serif;z-index:1;contain:layout style}',
H + ' *,' + H + ' *::before,' + H + ' *::after{box-sizing:border-box}',
/* ortak n1-header bileşenin kutusunda akar: fixed değil, gradyan yok (Wix bölümü arka planı ve sabitlemeyi yönetir) */
H + ' n1-header{display:block!important;position:absolute!important;inset:0!important;height:100%!important;z-index:auto!important;pointer-events:auto}',
H + ' n1-header::before{display:none!important}',
H + ' n1-header .n1h-bar.site-container{display:grid!important;grid-template-columns:1fr auto 1fr!important;align-items:center!important;width:90%!important;max-width:none!important;height:100%!important;margin:0 auto!important;padding:0!important}',
H + ' n1-header .n1h-logo img{width:32px!important;height:32px!important;max-width:none!important}',
H + ' n1-header .n1h-cta{display:none!important}',
/* panel: Başlangıca Dön kartı dahil bütün bağlantılar için tarayıcı varsayılanlarını nötrle; sayfanın üzerinde en üst katman */
'.n1h-panel[data-n1-gs]{z-index:99990!important}',
'.n1h-panel[data-n1-gs],.n1h-panel[data-n1-gs] *,.n1h-panel[data-n1-gs] *::before,.n1h-panel[data-n1-gs] *::after{box-sizing:border-box}',
'.n1h-panel[data-n1-gs] a{text-decoration:none}',
'.n1h-panel[data-n1-gs] a.n1h-item{color:#ecebe6}',
'.n1h-panel[data-n1-gs] .n1h-sub h3,.n1h-panel[data-n1-gs] .n1h-platcard h3{font-family:Barlow,Arial,sans-serif}',
'@media (max-width:1024px){',
H + '{height:72px}',
H + ' n1-header .n1h-bar.site-container{grid-template-columns:minmax(42px,1fr) max-content minmax(42px,1fr)!important}',
'.n1h-panel[data-n1-gs]{top:80px!important}',
'.n1h-panel[data-n1-gs][data-open]::before{content:"";position:fixed;left:0;right:0;bottom:0;top:72px;z-index:-1;pointer-events:none;background:rgba(8,10,9,.8);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}',
'}',
'@media (max-width:767px){',
H + '{height:64px}',
H + ' n1-header .n1h-logo img{width:30px!important;height:30px!important}',
'.n1h-panel[data-n1-gs]{top:72px!important;max-height:calc(100dvh - 84px)!important}',
'.n1h-panel[data-n1-gs][data-open]::before{top:64px}',
'}',
'@media (max-width:360px){' + H + ' n1-header .n1h-tag{font-size:6.9px!important;letter-spacing:.035em!important}}'
  ].join('\n');

  class GlobalHeader extends HTMLElement {
    connectedCallback() {
      if (this._on) return; this._on = true; this._cleanups = [];
      var epoch = this._epoch = (this._epoch || 0) + 1, self = this;
      var alive = function () { return self._on && self._epoch === epoch && self.isConnected; };
      this.classList.add('n1-inner-page');
      style('n1-gs-header-style', HCSS);
      loadCss(FONTS); loadCss(url(this, 'responsive'));
      // aynı sayfada ikinci bir 1N Header varsa (kurumsal sayfa header'ı ya da ikinci bağımsız header) yenisi oluşturulmaz
      var other = [].filter.call(document.querySelectorAll('n1-header'), function (h) { return !self.contains(h) && h.isConnected; }).length;
      var twin = [].filter.call(document.querySelectorAll(HTAG), function (h) { return h !== self && h._ownsHeader; }).length;
      if (other || twin) { this._skipped = true; this.setAttribute('data-n1-gs-skip', other ? 'page-header' : 'duplicate'); console.warn('[' + HTAG + '] sayfada zaten bir 1N Header var; ikincisi oluşturulmadı'); return; }
      this._ownsHeader = true;
      markupTpl(this).then(function (tpl) {
        if (!alive()) return;
        var src = tpl.content.querySelector('n1-header'); if (!src) throw new Error('Header işaretlemesi bulunamadı');
        var h = src.cloneNode(true);
        h.setAttribute('logo-href', '/'); h.setAttribute('no-cta', ''); h.removeAttribute('cta-text'); h.removeAttribute('cta-href');
        var js = h.querySelector('script[type="application/json"]');
        if (js) { try { var m = JSON.parse(js.textContent); if (m.brand) m.brand.href = '/'; (m.items || []).forEach(function (it) { if (it.href === '#hizmetler-ozet' && !(it.sub || []).length) { it.href = '/#hizmetler-ozet'; delete it.match; } }); js.textContent = JSON.stringify(m); } catch (e) { console.warn('[' + HTAG + '] menü verisi okunamadı', e); } }
        self.appendChild(h); self._header = h;
        return loadJs(url(self, 'header'), function () { return !!customElements.get('n1-header'); }).then(function () {
          if (!alive() || !self._header) return;
          if (!self._header.panel && self._header.connectedCallback) self._header.connectedCallback();
          var p = self._header.panel; if (!p) return;
          if (!p.isConnected) document.body.appendChild(p);
          p.classList.add('n1-inner-panel'); p.setAttribute('data-n1-gs', '');
          // BFCache dönüşü: menü kapalı ve kullanılabilir (header v14 iç durumu sıfırlar; V1.3 menü kapanışı DOM'u kapatır)
          listen(self, window, 'pageshow', function (e) { if (e.persisted && self._header && self._header.open) self._header.close(false); });
          self.setAttribute('data-ready', '');
        });
      }).catch(function (e) { if (alive()) console.error('[' + HTAG + ']', e); });
    }
    disconnectedCallback() {
      this._epoch = (this._epoch || 0) + 1; this._on = false;
      (this._cleanups || []).forEach(function (f) { try { f(); } catch (e) {} }); this._cleanups = [];
      if (this._header && this._header.open && this._header.close) try { this._header.close(false); } catch (e) {}
      this._header = null; this._ownsHeader = false; this._skipped = false;
      this.replaceChildren();   // n1-header kendi disconnectedCallback'inde panelini ve dinleyicilerini kaldırır
      this.removeAttribute('data-ready'); this.removeAttribute('data-n1-gs-skip');
    }
  }

  /* ---------- Footer ---------- */
  var F = FTAG;
  var FCSS = [
F + '{display:block;position:relative;width:100%;margin:0;padding:0;background:#080A09;color:#e4e3dd;text-align:left;overflow-x:clip}',
F + ' *,' + F + ' *::before,' + F + ' *::after{box-sizing:border-box}',
F + ' .n1ft-inner{width:90%!important;max-width:none!important;margin-left:auto!important;margin-right:auto!important}',
F + ' .n1ft-partner-art{display:none}',
F + ' footer.n1ft{margin:0!important}',
'@media (max-width:1024px){' + F + ' footer.n1ft .n1ft-partner{opacity:1!important;visibility:visible!important;transform:none!important}}',
'@media (max-width:767px){',
F + ' .n1ft-top{grid-template-columns:1fr!important;gap:32px;padding:39px 0 36px}',
F + ' .n1ft-col--brand{grid-column:auto}',
F + ' .n1ft-brand{font-size:45px}',
'}'
  ].join('\n');

  class GlobalFooter extends HTMLElement {
    connectedCallback() {
      if (this._on) return; this._on = true;
      var epoch = this._epoch = (this._epoch || 0) + 1, self = this;
      var alive = function () { return self._on && self._epoch === epoch && self.isConnected; };
      this.classList.add('n1-inner-page');
      style('n1-gs-footer-style', FCSS);
      loadCss(FONTS);
      Promise.all([loadCss(url(this, 'footerCss')), loadCss(url(this, 'responsive')), markupTpl(this)]).then(function (r) {
        if (!alive()) return;
        var tpl = r[2], ft = tpl.content.querySelector('[data-n1-footer]'); if (!ft) throw new Error('Footer işaretlemesi bulunamadı');
        var fw = document.createElement('template'); fw.innerHTML = ft.outerHTML;
        var root = fw.content.querySelector('footer.n1ft'), partners = root && root.querySelector('.n1ft-partners');
        if (partners) {   // mevcut iç sayfalarla aynı: tablet/mobilde onaylı partner görseli, masaüstünde tekil logolar
          var pic = document.createElement('picture'); pic.className = 'n1ft-partner-art';
          var so = document.createElement('source'); so.media = '(max-width: 767px)'; so.srcset = PARTNER_ART.mobile;
          var img = document.createElement('img'); img.src = PARTNER_ART.tablet; img.alt = '1N Digital Media iş ortakları ve sertifikalar'; img.loading = 'lazy'; img.decoding = 'async';
          img.onerror = function () { pic.classList.add('n1-art-failed'); };
          pic.append(so, img); partners.parentNode.insertBefore(pic, partners);
        }
        var copy = fw.content.querySelector('.n1ft-copy'); if (copy) copy.textContent = copy.textContent.replace(/©\s*\d{4}/, '© ' + new Date().getFullYear());
        self.replaceChildren(fw.content);
        return loadJs(url(self, 'footerJs'), null, true).then(function () { if (alive()) self.setAttribute('data-ready', ''); });
      }).catch(function (e) { if (alive()) console.error('[' + FTAG + ']', e); });
    }
    disconnectedCallback() {
      this._epoch = (this._epoch || 0) + 1; this._on = false;
      var self = this;   // paylaşılan footer modülünün bu bileşendeki ScrollTrigger/GSAP tetikleyicileri (sayfada GSAP varsa)
      if (window.ScrollTrigger) window.ScrollTrigger.getAll().forEach(function (t) { var el = t.trigger; if (el && (self.contains(el) || !el.isConnected)) t.kill(); });
      this.replaceChildren(); this.removeAttribute('data-ready');
    }
  }

  /* ---------- WhatsApp / Yukarı Çık (isteğe bağlı) ---------- */
  class GlobalFloating extends HTMLElement {
    connectedCallback() {
      if (this._on) return; this._on = true;
      var epoch = this._epoch = (this._epoch || 0) + 1, self = this;
      var alive = function () { return self._on && self._epoch === epoch && self.isConnected; };
      this.style.cssText = 'display:block;width:0;height:0;overflow:visible';
      var exists = [].some.call(document.querySelectorAll('n1-floating-controls'), function (f) { return !self.contains(f); }) || !!document.querySelector('.n1fc:not([data-n1-gs])');
      if (exists) { this.setAttribute('data-n1-gs-skip', 'exists'); return; }   // mevcut kontrolleri çoğaltma
      loadCss(url(this, 'responsive'));
      markupTpl(this).then(function (tpl) {
        if (!alive()) return;
        var fc = tpl.content.querySelector('n1-floating-controls'); if (!fc) return;
        var f = fc.cloneNode(true); if (matchMedia('(max-width:1024px)').matches) f.setAttribute('show-after', '0.5');
        self.appendChild(f); document.body.classList.add('n1-inner-fc-enabled'); self._owned = true;
        return loadJs(url(self, 'floating'), function () { return !!customElements.get('n1-floating-controls'); }).then(function () {
          var layer = document.querySelector('body > .n1fc:last-of-type'); if (alive() && layer) layer.setAttribute('data-n1-gs', '');
          if (alive()) self.setAttribute('data-ready', '');
        });
      }).catch(function (e) { if (alive()) console.error('[' + XTAG + ']', e); });
    }
    disconnectedCallback() {
      this._epoch = (this._epoch || 0) + 1; this._on = false;
      if (this._owned) document.body.classList.remove('n1-inner-fc-enabled'); this._owned = false;
      this.replaceChildren(); this.removeAttribute('data-ready'); this.removeAttribute('data-n1-gs-skip');   // katman kendi disconnectedCallback'inde kalkar
    }
  }

  if (!customElements.get(HTAG)) customElements.define(HTAG, GlobalHeader);
  if (!customElements.get(FTAG)) customElements.define(FTAG, GlobalFooter);
  if (!customElements.get(XTAG)) customElements.define(XTAG, GlobalFloating);
})();
