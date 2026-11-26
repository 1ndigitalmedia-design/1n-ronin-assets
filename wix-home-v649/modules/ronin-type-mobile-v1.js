/*!
 * ronin-type-mobile-v1 — 1N Digital Media · Ronin sahne tipografisi, MOBİL / TABLET (≤ 900 px)
 *
 * Masaüstü modülü ronin-type-v613.js DEĞİŞMEDİ ve masaüstünde aynen çalışır. Bu dosya yalnızca mobil/tablet profilinde
 * yüklenir ve kendi etiketini tanımlar: <ronin-type-m for="hero"></ronin-type-m> (yükleyici, mobil profilde işaretlemedeki
 * <ronin-type> öğesini bununla değiştirir; böylece iki modül aynı sahneye yazı katmanı eklemez ve tablet döndürülüp
 * masaüstü profiline geçildiğinde masaüstü etiketi hâlâ tanımlanabilir durumdadır).
 *
 * Metinler, sıra ve tipografi karakteri masaüstüyle aynı: Workshops to / Blow Your Mind. · BRANDING · CREATIVE ·
 * THINK / BEYOND · CREATE / IMPACT — Barlow Condensed 500 (slogan) ve 600 büyük harf (kelimeler); kırık beyaz #D9D8D1,
 * vurgu #A2FF00. Animasyon masaüstündeki gibi: satır maskesinden yükselir (overflow:hidden + translateY), satır başına
 * gecikme, çıkışta daha kısa yukarı süzülme ve sönme. Yalnızca transform ve opacity değişir.
 *
 * Senkron: ayrı zamanlayıcı, ayrı kaydırma motoru ya da sürekli döngü YOK. Ronin motorunun "rh6:progress" olayında,
 * o an EKRANDA ÇİZİLİ karenin (detail.shown) gerçek zaman damgası kullanılır. Kare geç çözülürse yazı da o karede bekler;
 * hedef kareye göre öne geçmez. Geri kaydırmada aynı fonksiyon ters yönde aynı durumu verir; hızlı kaydırmada yalnızca
 * zamana bağlı olduğu için ara sahne yazısı "takılı" kalmaz, sahne pencereleri çakışmaz.
 *
 * Sahne pencereleri (ms), M0.mp4 kare kare incelenerek belirlendi (RONIN_MOBILE_FRAME_REPORT.md):
 *   sahne sınırları 0 · 1668 (kol uzanır) · 8275 (kılıç iner) · 12546 (kılıç kında) · 16817 (final)
 *
 * Yerleşim (kutular, M0 karelerinin sahne bazlı doluluk ölçümünden seçildi; yüz, kapüşon, eller ve kılıç kapanmaz):
 *   telefon dikey  : bütün sahneler videonun eriyen alt bölümünde, CTA'nın hemen üstünde (alttan hizalı)
 *   telefon yatay  : videonun sağındaki yazı sütununda, CTA'nın üstünde
 *   tablet dikey   : slogan alt bölgede; BRANDING / CREATIVE sağ alt boşlukta; THINK–BEYOND ve CREATE–IMPACT
 *                    uzak planda karakterin solunda ve sağında
 * prefers-reduced-motion: katman kurulmaz; motorun sabit sloganı ve CTA görünür kalır.
 */
(function () {
  'use strict';
  const TAG = 'ronin-type-m';
  if (customElements.get(TAG)) return;

  const css = `
${TAG}{display:none}
.rtm-layer{position:absolute;inset:0;z-index:3;pointer-events:none;overflow:hidden;font-family:"Barlow Condensed","Arial Narrow",Arial,sans-serif;--rtm-ink:#D9D8D1;--rtm-acc:#A2FF00;-webkit-font-smoothing:antialiased}
.rtm-blk{position:absolute;display:block;margin:0;white-space:nowrap;line-height:.86;visibility:hidden}
.rtm-ln{display:block;overflow:hidden;padding:.04em 0 .06em}
.rtm-ln > span{display:block;opacity:0;transform:translate3d(0,105%,0);will-change:transform,opacity}
.rtm-ink{color:var(--rtm-ink)}
.rtm-acc{color:var(--rtm-acc)}
.rtm-word{font-weight:600;text-transform:uppercase;letter-spacing:-.012em}
.rtm-slogan{font-weight:500;letter-spacing:-.01em;line-height:.92}
ronin-hero-mv1[data-rtm] .rh6-slogan{opacity:0}
@media (min-width:901px){.rtm-layer{display:none}}
`;
  // [görünmeye başla, tam görünür, kaybolmaya başla, tamamen kaybol] — ms, M0 zaman çizgisi
  const BLOCKS = [
    { id: 'slogan', t: [-1, 0, 1250, 1750], cls: 'rtm-slogan', lines: [['Workshops to', 'rtm-ink'], ['Blow Your Mind.', 'rtm-acc']], al: 'left', tab: null },
    { id: 'branding', t: [2700, 3400, 7900, 8350], cls: 'rtm-word', lines: [['Branding', 'rtm-acc']], al: 'right', tab: [0.60, 0.95, 0.50, 0.80] },
    { id: 'creative', t: [8700, 9400, 12000, 12500], cls: 'rtm-word', lines: [['Creative', 'rtm-ink']], al: 'right', tab: [0.70, 0.95, 0.52, 0.70] },
    { id: 'think', t: [12900, 13600, 16200, 16750], cls: 'rtm-word', lines: [['Think', 'rtm-ink']], al: 'left', pair: 'beyond', row: 0, tab: [0.05, 0.32, 0.12, 0.40] },
    { id: 'beyond', t: [13150, 13850, 16200, 16750], cls: 'rtm-word', lines: [['Beyond', 'rtm-acc']], al: 'right', pair: 'think', row: 1, tab: [0.68, 0.95, 0.12, 0.40] },
    { id: 'create', t: [17000, 17700, 1e9, 1e9], cls: 'rtm-word', lines: [['Create', 'rtm-ink']], al: 'left', pair: 'impact', row: 0, tab: [0.05, 0.32, 0.12, 0.42] },
    { id: 'impact', t: [17250, 17950, 1e9, 1e9], cls: 'rtm-word', lines: [['Impact', 'rtm-acc']], al: 'right', pair: 'create', row: 1, tab: [0.68, 0.95, 0.12, 0.42] },
  ];
  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  const easeOut = (x) => 1 - Math.pow(1 - x, 3);
  const easeIn = (x) => x * x;

  class RoninTypeMobile extends HTMLElement {
    connectedCallback() {
      if (this._on) return; this._on = true;
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;          // sabit slogan + CTA kalır
      if (!document.getElementById('rtm-style')) { const s = document.createElement('style'); s.id = 'rtm-style'; s.setAttribute('data-n1-owner', 'n1-site-v1'); s.textContent = css; document.head.appendChild(s); }
      this._tries = 0;
      const attach = () => {
        if (!this._on) return;
        const hero = document.getElementById(this.getAttribute('for') || 'hero');
        if (!hero || !hero.stage || !hero.copy) { if (++this._tries < 400) this._wait = setTimeout(attach, 50); return; }
        if (hero.hasAttribute('data-static')) return;                                // motor statik (reduced-motion / mode=static)
        this.hero = hero;
        const L = this.layer = document.createElement('div'); L.className = 'rtm-layer'; L.setAttribute('aria-hidden', 'true'); L.lang = 'en';
        L.innerHTML = BLOCKS.map((b) => `<p class="rtm-blk ${b.cls}" data-id="${b.id}">${b.lines.map(([t, c]) => `<span class="rtm-ln"><span class="${c}">${t}</span></span>`).join('')}</p>`).join('');
        hero.stage.appendChild(L);
        this.els = {}; this.spans = {};
        L.querySelectorAll('.rtm-blk').forEach((e) => { this.els[e.dataset.id] = e; this.spans[e.dataset.id] = [].slice.call(e.querySelectorAll('.rtm-ln > span')); });
        hero.setAttribute('data-rtm', '');                                           // sabit slogan görsel olarak gizlenir (yer ve erişilebilir metin kalır)
        // ekran okuyucular: sabit slogan erişilebilir kalır; sahne kelimeleri tek, sabit metin olarak eklenir
        const sr = this.sr = document.createElement('p'); sr.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;white-space:nowrap';
        sr.lang = 'en'; sr.textContent = 'Branding. Creative. Think beyond. Create impact.'; hero.stage.appendChild(sr);
        this._t = 0; this._vis = {};
        this._onProg = (e) => {
          const d = e.detail || {}, T = hero.times, k = d.shown;
          this._t = T && k >= 0 && k < T.length ? T[k] : 0;                         // gösterilen karenin zamanı
          this._apply();
        };
        hero.addEventListener('rh6:progress', this._onProg);
        this._ro = new ResizeObserver(() => { cancelAnimationFrame(this._lr); this._lr = requestAnimationFrame(() => { this._layout(); this._apply(true); }); });
        this._ro.observe(hero.stage);
        (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(() => { if (this._on) { this._layout(); this._apply(true); } });
        if (hero.drawn >= 0 && hero.times) this._t = hero.times[hero.drawn];
        this._layout(); this._apply(true);
      };
      attach();
    }
    disconnectedCallback() {
      this._on = false; clearTimeout(this._wait); cancelAnimationFrame(this._lr);
      if (this._ro) this._ro.disconnect();
      if (this.hero) { this.hero.removeEventListener('rh6:progress', this._onProg); this.hero.removeAttribute('data-rtm'); }
      if (this.layer) this.layer.remove(); if (this.sr) this.sr.remove();
      this.layer = this.sr = this.hero = null;
    }

    /* Yerleşim alanları (sahne koordinatları; sahne sticky olduğu için görünüm alanıyla aynı) */
    _zones() {
      const h = this.hero, r = h.rect, st = h.stage.getBoundingClientRect();
      const cta = h.querySelector('.rh6-cta'), cr = cta ? cta.getBoundingClientRect() : null;
      const W = r.W, H = r.H, pad = Math.round(clamp(W * 0.05, 18, 40));
      const bar = document.querySelector('n1-header[data-n1hm] .n1h-bar');
      const headB = bar ? Math.max(0, bar.getBoundingClientRect().bottom - st.top) : 0;
      const ctaTop = cr && cr.height ? cr.top - st.top : H - 90;
      const zB = ctaTop - Math.round(clamp(W * 0.03, 10, 18));
      let z;
      if (r.side) {
        const cl = parseFloat(h.copy.style.left) || (r.vx + r.vw + pad);
        z = { l: cl, r: W - pad, t: Math.max(headB + 12, zB - H * 0.6), b: zB };
      } else {
        z = { l: pad, r: W - pad, t: Math.max(headB + 10, r.vy + r.vh * 0.74), b: zB };
      }
      return { z, r, W, H, headB, mode: r.side ? 'side' : (W >= 700 ? 'tablet' : 'phone') };
    }

    _fit(id, bw, bh) {
      const el = this.els[id]; el.style.fontSize = '100px';
      const w = el.scrollWidth || 1, hh = el.scrollHeight || 1;
      return Math.max(8, Math.min(100 * bw / w, 100 * bh / hh));
    }

    _layout() {
      const h = this.hero; if (!h || !h.rect || !this.els) return;
      const Z = this._zones(), z = Z.z, r = Z.r; this._mode = Z.mode;
      const zw = Math.max(40, z.r - z.l), zh = Math.max(40, z.b - z.t);
      const size = {}, place = {};
      for (const b of BLOCKS) {
        if (Z.mode === 'tablet' && b.tab) {
          // tablet: kutu videonun kendi koordinatlarında; içerik alanı (iki yanda %5) ve Header altıyla sınırlı
          const x0 = Math.max(r.vx + b.tab[0] * r.vw, Z.W * 0.05), x1 = Math.min(r.vx + b.tab[1] * r.vw, Z.W * 0.95);
          const y0 = Math.max(r.vy + b.tab[2] * r.vh, Z.headB + 14), y1 = r.vy + b.tab[3] * r.vh;
          size[b.id] = this._fit(b.id, x1 - x0, Math.max(30, y1 - y0)); place[b.id] = { x0, x1, y0, y1, mid: true };
        } else if (b.pair) {
          // telefon: eş kelimeler iki satır — üst satır sola, alt satır sağa yaslı; alttan CTA'nın üstüne hizalı
          size[b.id] = this._fit(b.id, zw, zh / 2); place[b.id] = { x0: z.l, x1: z.r, row: b.row };
        } else {
          size[b.id] = this._fit(b.id, zw, zh); place[b.id] = { x0: z.l, x1: z.r };
        }
      }
      for (const b of BLOCKS) {
        let fs = size[b.id]; if (b.pair) fs = Math.min(fs, size[b.pair]);
        if (b.id !== 'slogan' && !(Z.mode === 'tablet' && b.tab)) fs = Math.min(fs, Z.W * 0.26);   // tek kelime telefonda ekranı yutmasın
        const el = this.els[b.id], P = place[b.id]; el.style.fontSize = fs.toFixed(1) + 'px';
        const eh = el.offsetHeight;
        let top;
        if (P.mid) top = P.y0 + Math.max(0, ((P.y1 - P.y0) - eh) / 2);
        else if (P.row === 0) top = z.b - eh * 2;
        else top = z.b - eh;
        top = Math.max(top, Z.headB + 8);
        Object.assign(el.style, { top: Math.round(top) + 'px', textAlign: b.al, left: b.al === 'right' ? 'auto' : Math.round(P.x0) + 'px', right: b.al === 'right' ? Math.round(Z.W - P.x1) + 'px' : 'auto' });
      }
    }

    _apply(force) {
      if (!this.els) return; const t = this._t;
      for (const b of BLOCKS) {
        const [a0, a1, d0, d1] = b.t;
        const u = a0 < 0 ? 1 : clamp((t - a0) / (a1 - a0), 0, 1), v = clamp((t - d0) / (d1 - d0), 0, 1);
        const vis = u * (1 - v), el = this.els[b.id], on = vis > 0.001;
        if (on !== this._vis[b.id] || force) { el.style.visibility = on ? 'visible' : 'hidden'; this._vis[b.id] = on; }
        if (!on) continue;
        this.spans[b.id].forEach((s, i) => {
          // satır maskesinden yükselir (çok satırda %15 gecikme); çıkışta daha kısa yukarı süzülür
          const eu = easeOut(clamp(u * 1.15 - i * 0.15, 0, 1)), ev = easeIn(v);
          const y = (1 - eu) * 105 - ev * 35;
          s.style.transform = `translate3d(0,${y.toFixed(2)}%,0)`;
          s.style.opacity = (eu * (1 - ev)).toFixed(3);
        });
      }
    }
  }
  customElements.define(TAG, RoninTypeMobile);
})();
