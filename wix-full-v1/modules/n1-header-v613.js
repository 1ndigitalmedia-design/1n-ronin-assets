/*!
 * n1-header — 1N Digital Media masaüstü header (v6.13)
 * v6.13: hafif cam etkili koyu butonlar; menü başlıklarında kısa ajans tanımları; "1N Digital Media" marka öğesi menünün altında.
 * v6.11'den farklar: küçük ve keskin köşeli logo; koyu, yarı saydam TEKLİF AL / MENU; menüde "1N Digital Media"
 * marka bağlantısı (Ana Sayfa yerine); altı ana başlık ve yanda açılan alt menü kartı.
 * Korunanlar: konumlar, %90 kapsayıcı, orta metin, MENU/CLOSE geçişi, kart yapısı/köşeleri, açılış-kapanış hareketi,
 * kaydırma gradienti, panelin body'ye taşınması (kırpılmaz), Escape / dışarı tıklama, odak yönetimi, reduced-motion.
 *
 * Menü içeriği öğenin içindeki JSON'dan okunur (kolay değiştirilir):
 *   <n1-header><script type="application/json">{"brand":{"text":"1N Digital Media","href":"#ust"},
 *     "items":[{"title":"Hizmetler","match":"#hizmetler","sub":[{"text":"Creative Studio"},{"text":"…","href":"#hizmetler"}]}]}</script></n1-header>
 *   href'i olmayan alt başlıklar bağlantı değildir (daha soluk görünür, tıklanmaz) — sahte URL üretilmez.
 * Alt menü: ana başlığın üzerine gelince (ya da tıklayınca / Enter, →) ana kartın solunda aynı stilde bir kart açılır;
 *   ana kart büyümez. ← veya Escape alt menüyü kapatır, ikinci Escape menüyü kapatır.
 */
(function () {
  'use strict';
  const TAG = 'n1-header';
  if (customElements.get(TAG)) return;
  const EASE = 'cubic-bezier(.22,.8,.24,1)';
  const css = `
@media (min-width:901px){.site-container{width:var(--site-w,90%);margin-left:auto;margin-right:auto}}
${TAG}{position:fixed;top:0;left:0;right:0;z-index:900;display:block;pointer-events:none;font-family:Barlow,"Helvetica Neue",Arial,sans-serif;color:#e4e3dd}
${TAG}::before{content:"";position:absolute;left:0;right:0;top:0;height:150px;pointer-events:none;opacity:0;transition:opacity .6s ease;
  background:linear-gradient(to bottom,rgba(5,6,6,.86) 0%,rgba(5,6,6,.62) 38%,rgba(5,6,6,.24) 72%,rgba(5,6,6,0) 100%)}
${TAG}[data-scrolled]::before{opacity:1}
${TAG} .n1h-bar{position:relative;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;height:88px}
${TAG} .n1h-logo{justify-self:start;display:inline-flex;pointer-events:auto}
${TAG} .n1h-logo img{display:block;width:32px;height:32px;border-radius:0}
${TAG} .n1h-tag{margin:0;justify-self:center;font-size:11.5px;line-height:1;font-weight:400;letter-spacing:.22em;text-transform:uppercase;color:rgba(236,235,230,.78);white-space:nowrap}
${TAG} .n1h-right{justify-self:end;display:flex;gap:8px;pointer-events:auto}
${TAG} .n1h-btn{display:inline-flex;align-items:center;gap:10px;height:44px;padding:0 18px;border-radius:10px;font:500 12.5px/1 Barlow,Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase;text-decoration:none;cursor:pointer;
  color:#e4e3dd;background:rgba(12,14,13,.46);border:1px solid rgba(228,227,221,.1);-webkit-backdrop-filter:blur(10px) saturate(115%);backdrop-filter:blur(10px) saturate(115%);transition:background-color .35s ease,border-color .35s ease,color .35s ease}
${TAG} .n1h-btn:hover{background:rgba(22,25,23,.62);border-color:rgba(228,227,221,.2);color:#f1f0ea}
${TAG} .n1h-cta{border-color:rgba(168,207,98,.24)}
${TAG} .n1h-cta:hover{border-color:rgba(168,207,98,.5)}
${TAG} .n1h-dot{width:6px;height:6px;border-radius:50%;background:var(--n1-accent,#A8CF62);flex:none;transition:transform .35s ${EASE}}
${TAG} .n1h-cta:hover .n1h-dot{transform:scale(1.35)}
${TAG} .n1h-menu{min-width:112px;justify-content:space-between}
${TAG}[data-open] .n1h-menu{background:rgba(24,27,25,.86);border-color:rgba(236,235,230,.16)}
${TAG} .n1h-lbl{position:relative;display:inline-block;height:13px;overflow:hidden}
${TAG} .n1h-lbl span{display:block;height:13px;transition:transform .45s ${EASE}}
${TAG}[data-open] .n1h-lbl span{transform:translateY(-13px)}
${TAG} .n1h-ico{position:relative;width:14px;height:14px;flex:none}
${TAG} .n1h-ico i{position:absolute;left:3px;width:8px;height:1.5px;background:currentColor;border-radius:1px;transition:transform .45s ${EASE},top .45s ${EASE}}
${TAG} .n1h-ico i:nth-child(1){top:4px}${TAG} .n1h-ico i:nth-child(2){top:9px}
${TAG}[data-open] .n1h-ico i:nth-child(1){top:6.25px;transform:rotate(45deg)}
${TAG}[data-open] .n1h-ico i:nth-child(2){top:6.25px;transform:rotate(-45deg)}
${TAG} .n1h-btn:focus-visible,${TAG} .n1h-logo:focus-visible{outline:2px solid #ecebe6;outline-offset:3px}
@media (max-width:900px){${TAG}{display:none}}

.n1h-panel{position:fixed;z-index:901;top:96px;right:calc((100% - var(--site-w,90%)) / 2);width:min(380px,var(--site-w,90%));display:grid;gap:8px;
  font-family:Barlow,"Helvetica Neue",Arial,sans-serif;visibility:hidden;pointer-events:none;transition:visibility 0s linear .42s}
.n1h-panel[data-open]{visibility:visible;pointer-events:auto;transition-delay:0s}
.n1h-card{background:#111312;color:#ecebe6;border-radius:14px;box-shadow:0 18px 40px rgba(0,0,0,.45);
  opacity:0;transform:translate3d(0,-10px,0) scale(.985);transform-origin:top right;
  transition:opacity .22s ease,transform .32s ${EASE};transition-delay:calc(var(--i,0) * 30ms)}
.n1h-panel[data-open] .n1h-card{opacity:1;transform:none;transition:opacity .34s ease,transform .5s ${EASE};transition-delay:calc(var(--i,0) * 55ms)}

/* marka öğesi: menünün alt kartı, ana sayfaya döner */
.n1h-brandcard{padding:8px}
.n1h-brand{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:14px 16px;border-radius:9px;color:var(--n1-accent,#A8CF62);text-decoration:none;transition:background-color .3s ease,color .3s ease}
.n1h-brand b{display:block;font:600 22px/1 "Barlow Condensed",Barlow,Arial,sans-serif;letter-spacing:.01em}
.n1h-brand small{display:block;margin-top:6px;font:400 12px/1 Barlow,Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:rgba(228,227,221,.45);transition:color .3s ease}
.n1h-brand .n1h-bline{display:block;height:1px;width:22px;background:currentColor;opacity:.6;transition:width .5s ${EASE},opacity .3s ease}
.n1h-brand:hover,.n1h-brand:focus-visible{background:#171b18;color:#C2E384;outline:none}
.n1h-brand:hover small,.n1h-brand:focus-visible small{color:rgba(228,227,221,.7)}
.n1h-brand:hover .n1h-bline,.n1h-brand:focus-visible .n1h-bline{width:56px;opacity:1}

.n1h-nav{list-style:none;margin:0;padding:10px}
.n1h-item{position:relative;display:flex;align-items:center;gap:14px;width:100%;min-height:50px;padding:0 14px;border:0;border-radius:9px;background:transparent;color:#ecebe6;cursor:pointer;text-align:left;
  font:500 27px/1 "Barlow Condensed",Barlow,Arial,sans-serif;letter-spacing:.005em;transition:background-color .25s ease,color .25s ease}
.n1h-item .n1h-mark{width:6px;height:6px;border-radius:50%;background:var(--n1-accent,#A8CF62);flex:none;transform:scale(0);opacity:0;transition:transform .35s ${EASE},opacity .25s ease}
.n1h-item .n1h-txt{flex:1;display:inline-block;transition:transform .35s ${EASE}}
.n1h-item .n1h-more{font:400 11.5px/1 Barlow,Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:rgba(228,227,221,.34);transition:transform .35s ${EASE},color .25s ease}
.n1h-item:hover,.n1h-item:focus-visible,.n1h-item[aria-expanded="true"]{background:#1a1d1b;outline:none}
.n1h-item:hover .n1h-txt,.n1h-item:focus-visible .n1h-txt,.n1h-item[aria-expanded="true"] .n1h-txt{transform:translateX(4px)}
.n1h-item:hover .n1h-more,.n1h-item[aria-expanded="true"] .n1h-more{transform:translateX(-3px);color:var(--n1-accent,#A8CF62)}
.n1h-item[data-current] .n1h-mark,.n1h-item:hover .n1h-mark,.n1h-item:focus-visible .n1h-mark,.n1h-item[aria-expanded="true"] .n1h-mark{transform:scale(1);opacity:1}
.n1h-nav li.n1h-last{margin-top:6px}
.n1h-nav li.n1h-last .n1h-item{font-size:21px;color:rgba(228,227,221,.72);min-height:46px}
.n1h-nav li.n1h-last .n1h-item:hover,.n1h-nav li.n1h-last .n1h-item[aria-expanded="true"]{color:#ecebe6}

/* alt menü kartı: ana kartın solunda, aynı yüzey ve köşe */
.n1h-sub{position:absolute;right:calc(100% + 8px);top:0;width:300px;padding:10px;background:#111312;border-radius:14px;box-shadow:0 18px 40px rgba(0,0,0,.45);
  opacity:0;transform:translate3d(8px,0,0);visibility:hidden;pointer-events:none;transition:opacity .22s ease,transform .3s ${EASE},visibility 0s linear .3s}
.n1h-sub[data-open]{opacity:1;transform:none;visibility:visible;pointer-events:auto;transition:opacity .3s ease,transform .45s ${EASE},visibility 0s}
.n1h-sub h3{margin:6px 14px 8px;font:500 11px/1 Barlow,Arial,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:rgba(236,235,230,.45)}
.n1h-sub ul{list-style:none;margin:0;padding:0}
.n1h-sub a,.n1h-sub span.n1h-soon{display:flex;align-items:center;justify-content:space-between;gap:10px;min-height:42px;padding:0 14px;border-radius:8px;font:400 17px/1.15 Barlow,Arial,sans-serif;text-decoration:none}
.n1h-sub a{color:#ecebe6;transition:background-color .25s ease}
.n1h-sub a .n1h-st{transition:transform .35s ${EASE}}
.n1h-sub a:hover,.n1h-sub a:focus-visible{background:#1a1d1b;outline:none}
.n1h-sub a:hover .n1h-st,.n1h-sub a:focus-visible .n1h-st{transform:translateX(4px)}
.n1h-sub span.n1h-soon{color:rgba(228,227,221,.66);cursor:default}
.n1h-sub span.n1h-soon em{font-style:normal;font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:rgba(236,235,230,.3)}

.n1h-foot{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px 18px 16px 24px}
.n1h-foot .n1h-dot{width:6px;height:6px;border-radius:50%;background:var(--n1-accent,#A8CF62)}
.n1h-foot p{margin:0;font-size:13px;line-height:1.35;color:rgba(236,235,230,.62)}
.n1h-foot a{flex:none;display:inline-flex;align-items:center;gap:10px;height:40px;padding:0 14px;border-radius:9px;background:#1a1d1b;color:#ecebe6;text-decoration:none;font:500 14px/1 Barlow,Arial,sans-serif;white-space:nowrap;transition:background-color .25s ease}
.n1h-foot a:hover,.n1h-foot a:focus-visible{background:#242825;outline:none}
@media (max-width:900px){.n1h-panel{display:none}}
@media (prefers-reduced-motion: reduce){
  ${TAG} *,${TAG}::before,.n1h-panel,.n1h-panel *{transition-duration:0s!important;transition-delay:0s!important}
}
`;
  const DEFAULT_MENU = {
    brand: { text: '1N Digital Media', note: 'Başlangıca dön', href: '#ust' },
    items: [
      { title: 'Kısaca Biz', note: 'Stüdyo', sub: [{ text: 'Stüdyo Hikâyesi' }, { text: 'Yaratıcı Bakışımız' }, { text: 'Çalışma Ritmimiz' }] },
      { title: 'Hizmetler', note: '6 disiplin', sub: [{ text: 'Creative Studio' }, { text: 'Brand Experience' }, { text: 'Digital Performance' }, { text: 'Social & Content' }, { text: 'Web & Commerce' }, { text: 'AI & Innovation' }] },
      { title: 'Markalar', note: 'Seçili işler', sub: [{ text: 'Seçili İşler' }, { text: 'Marka Hikâyeleri' }, { text: 'Creative Showcase' }] },
      { title: 'Akademi', note: 'Workshops', sub: [{ text: '1N Academy' }, { text: 'Workshops' }, { text: 'İçgörüler' }] },
      { title: 'İletişim', note: 'Birlikte üretelim', sub: [{ text: 'Birlikte Üretelim' }, { text: 'Teklif Al' }] },
      { title: 'İnsan Kaynakları', note: 'Ekibe katıl', sub: [{ text: 'Ekibimize Katıl' }, { text: 'Açık Pozisyonlar' }] },
    ],
  };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  class N1Header extends HTMLElement {
    connectedCallback() {
      if (this._on) return; this._on = true;
      if (!document.getElementById('n1h-style')) { const s = document.createElement('style'); s.id = 'n1h-style'; s.textContent = css; document.head.appendChild(s); }
      const A = (n, d) => (this.hasAttribute(n) ? this.getAttribute(n) : d);
      if (this.hasAttribute('accent')) { this.style.setProperty('--n1-accent', this.getAttribute('accent')); document.documentElement.style.setProperty('--n1-accent', this.getAttribute('accent')); }
      let menu = DEFAULT_MENU;
      const js = this.querySelector('script[type="application/json"]');
      if (js) { try { menu = JSON.parse(js.textContent); } catch (e) { console.warn('[n1-header] menü JSON okunamadı; varsayılan kullanılıyor', e); } }
      this.menu = menu;
      const id = 'n1h-panel-' + Math.random().toString(36).slice(2, 7);
      this.innerHTML = `<div class="n1h-bar site-container">
  <a class="n1h-logo" href="${esc(A('logo-href', menu.brand && menu.brand.href || '#ust'))}" aria-label="1N Digital Media ana sayfa"><img src="${esc(A('logo', '1n-logo.svg'))}" alt="${esc(A('logo-alt', '1N Digital Media'))}" width="32" height="32"></a>
  <p class="n1h-tag">${esc(A('tagline', 'DIGITAL ADVERTISING AGENCY.'))}</p>
  <div class="n1h-right">
    <a class="n1h-btn n1h-cta" href="${esc(A('cta-href', '#iletisim'))}"><span class="n1h-dot" aria-hidden="true"></span>${esc(A('cta-text', 'Teklif Al'))}</a>
    <button class="n1h-btn n1h-menu" type="button" aria-expanded="false" aria-controls="${id}">
      <span class="n1h-lbl" aria-hidden="true"><span>Menu</span><span>Close</span></span><span class="n1h-sr" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">Menüyü aç</span>
      <span class="n1h-ico" aria-hidden="true"><i></i><i></i></span>
    </button>
  </div>
</div>`;
      const p = this.panel = document.createElement('div');
      p.className = 'n1h-panel'; p.id = id; p.setAttribute('role', 'dialog'); p.setAttribute('aria-label', 'Site menüsü'); p.inert = true;
      
      const items = menu.items || [];
      p.innerHTML = `<nav class="n1h-card n1h-main" style="--i:0;position:relative" aria-label="Ana menü">
  <ul class="n1h-nav">${items.map((it, i) => `<li${i === items.length - 1 ? ' class="n1h-last"' : ''}><button class="n1h-item" type="button" aria-expanded="false" aria-controls="${id}-s${i}" data-i="${i}"><span class="n1h-mark" aria-hidden="true"></span><span class="n1h-txt">${esc(it.title)}</span><span class="n1h-more" aria-hidden="true">${esc(it.note || '')}</span></button></li>`).join('')}</ul>
  ${items.map((it, i) => `<div class="n1h-sub" id="${id}-s${i}" role="group" aria-label="${esc(it.title)}"><h3>${esc(it.title)}</h3><ul>${(it.sub || []).map((s) => s.href
        ? `<li><a href="${esc(s.href)}"><span class="n1h-st">${esc(s.text)}</span></a></li>`
        : `<li><span class="n1h-soon" aria-disabled="true">${esc(s.text)}</span></li>`).join('')}</ul></div>`).join('')}
</nav>
<div class="n1h-card n1h-brandcard" style="--i:1"><a class="n1h-brand" href="${esc(menu.brand.href)}"><span><b>${esc(menu.brand.text)}</b><small>${esc(menu.brand.note || 'Başlangıca dön')}</small></span><span class="n1h-bline" aria-hidden="true"></span></a></div>`;
      document.body.appendChild(p);
      this.btn = this.querySelector('.n1h-menu'); this.sr = this.querySelector('.n1h-sr');
      this.items = [...p.querySelectorAll('.n1h-item')]; this.subs = [...p.querySelectorAll('.n1h-sub')];
      this.btn.addEventListener('click', () => this.toggle());
      p.addEventListener('click', (e) => {
        const it = e.target.closest('.n1h-item'); if (it) { const i = +it.dataset.i; this.sub === i && e.detail ? null : this._openSub(i); return; }
        if (e.target.closest('a')) this.close(false);
      });
      // fareyle ana başlık üzerine gelince kısa gecikmeyle alt menü açılır (çaprazdan geçişte titremesin)
      this.items.forEach((it) => it.addEventListener('pointerenter', () => { clearTimeout(this._ht); this._ht = setTimeout(() => this._openSub(+it.dataset.i), 90); }));
      p.querySelector('.n1h-brand').addEventListener('pointerenter', () => { clearTimeout(this._ht); this._ht = setTimeout(() => this._openSub(-1), 120); });
      p.addEventListener('keydown', (e) => {
        const it = e.target.closest('.n1h-item');
        if (it && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
          if (e.key === 'ArrowLeft') { this._openSub(+it.dataset.i); const f = this.subs[+it.dataset.i].querySelector('a'); f && f.focus(); } else this._openSub(-1);
          e.preventDefault();
        } else if (e.target.closest('.n1h-sub') && e.key === 'ArrowRight') { const i = this.sub; this._openSub(-1); this.items[i] && this.items[i].focus(); e.preventDefault(); }
        else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          const list = [...this.items, p.querySelector('.n1h-brand')], k = list.indexOf(document.activeElement);
          if (k >= 0) { list[(k + (e.key === 'ArrowDown' ? 1 : list.length - 1)) % list.length].focus(); e.preventDefault(); }
        }
      });
      this._doc = (e) => { if (this.open && !p.contains(e.target) && !this.btn.contains(e.target)) this.close(false); };
      this._key = (e) => {
        if (e.key !== 'Escape' || !this.open) return; e.preventDefault();
        if (this.sub >= 0) { const i = this.sub; this._openSub(-1); this.items[i] && this.items[i].focus(); } else this.close(true);
      };
      document.addEventListener('pointerdown', this._doc); document.addEventListener('keydown', this._key);
      this._scroll = () => { if (!this._raf) this._raf = requestAnimationFrame(() => { this._raf = 0; this._update(); }); };
      addEventListener('scroll', this._scroll, { passive: true }); addEventListener('resize', this._scroll);
      this._targets = items.map((it) => (it.match && it.match.startsWith('#') ? document.getElementById(it.match.slice(1)) : null));
      this.sub = -1; this._update();
    }
    disconnectedCallback() {
      this._on = false; removeEventListener('scroll', this._scroll); removeEventListener('resize', this._scroll);
      document.removeEventListener('pointerdown', this._doc); document.removeEventListener('keydown', this._key); this.panel && this.panel.remove();
    }
    toggle() { this.open ? this.close(true) : this.show(); }
    show() {
      this.open = true; this.dataset.open = ''; this.panel.dataset.open = ''; this.panel.inert = false;
      this.btn.setAttribute('aria-expanded', 'true'); this.sr.textContent = 'Menüyü kapat';
      const first = this.panel.querySelector('.n1h-item'); requestAnimationFrame(() => first && first.focus({ preventScroll: true }));
    }
    close(returnFocus) {
      this._openSub(-1);
      this.open = false; delete this.dataset.open; delete this.panel.dataset.open; this.panel.inert = true;
      this.btn.setAttribute('aria-expanded', 'false'); this.sr.textContent = 'Menüyü aç';
      if (returnFocus) this.btn.focus({ preventScroll: true });
    }
    _openSub(i) {
      clearTimeout(this._ht);
      if (i === this.sub) return;
      this.subs.forEach((s, k) => { if (k === i) s.dataset.open = ''; else delete s.dataset.open; });
      this.items.forEach((it, k) => it.setAttribute('aria-expanded', String(k === i)));
      if (i >= 0) { // alt kartı ilgili satırın hizasına getir (ekran içinde kalacak şekilde)
        const main = this.panel.querySelector('.n1h-main'), row = this.items[i], s = this.subs[i];
        const top = row.offsetTop - 10, maxTop = innerHeight - main.getBoundingClientRect().top - s.offsetHeight - 16;
        s.style.top = Math.max(0, Math.min(top, maxTop)) + 'px';
      }
      this.sub = i;
    }
    _update() {
      if (scrollY > 24) this.dataset.scrolled = ''; else delete this.dataset.scrolled;
      const y = innerHeight * 0.33; let cur = -1;
      this._targets.forEach((el, i) => { if (el) { const r = el.getBoundingClientRect(); if (r.top <= y && r.bottom > y) cur = i; } });
      this.items && this.items.forEach((it, i) => { if (i === cur) it.dataset.current = ''; else delete it.dataset.current; });
    }
  }
  customElements.define(TAG, N1Header);
})();
