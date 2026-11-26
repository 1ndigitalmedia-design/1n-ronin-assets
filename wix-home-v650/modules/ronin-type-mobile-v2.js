/*!
 * ronin-type-mobile-v2 — 1N Digital Media · Ronin sahne tipografisi, MOBİL / TABLET (v2 · v6.50 / V1.2)
 *
 * Masaüstü modülü ronin-type-v613.js ve v6.49'un ronin-type-mobile-v1.js dosyası DEĞİŞMEDİ. Bu dosya yalnızca mobil/tablet
 * profilinde yüklenir ve kendi etiketini tanımlar: <ronin-type-m2 for="hero"> (yükleyici, işaretlemedeki <ronin-type>
 * öğesini mobil profilde bununla değiştirir; iki modül aynı sahneye yazı katmanı eklemez).
 *
 * Metinler, sıra ve karakter masaüstüyle aynı: Workshops to / Blow Your Mind. · BRANDING · CREATIVE · THINK / BEYOND ·
 * CREATE / IMPACT. Barlow Condensed; kırık beyaz #D9D8D1; vurgu: mobil/tablet tasarım tokenı --n1m-acc (#A8CF62,
 * Kısaca Biz sayfasının onaylı vurgu rengi). Animasyon v1 ile aynı: satır maskesinden yükselme, çıkışta süzülme
 * (yalnızca transform + opacity).
 *
 * V1.2 hizalama sistemi (M0'ın 574 karesindeki karakter maskesiyle doğrulandı — tools/m0/text_safe_boxes.py):
 *   Sağ sütun — slogan, BRANDING, CREATIVE: ortak SAĞ kenar (kadraj genişliğinin %95'i) ve ortak DİKEY MERKEZ
 *     (kadraj yüksekliğinin %62'si). Kutular karakterin sağındaki boş alanda; görünür oldukları bütün karelerde
 *     karakterle kesişim %0 (kılıç çekme sırasındaki tam kadraj "signal distortion" geçişi, kare 136–144, hariç).
 *   Çift sahneler — THINK | BEYOND, CREATE | IMPACT: aynı yatay eksende (kadraj yüksekliğinin %35'i), karakterin solunda
 *     (sola yaslı) ve sağında (sağa yaslı). 440–451. karelerde yatay duran kılıç bu bandın altında kalır.
 *   Yazı boyutu: tek kelimelerin hepsi AYNI boyutta (en dar güvenli kutuya sığan boyut); slogan ayrı, daha küçük boyut.
 *   CREATIVE penceresi 11,0 sn'de kapanır: kılıç kınına girerken sağa uzanır (ölçüm: 11,0 sn sonrasında kesişim > %1).
 *   Yatay telefon (video yanında yazı sütunu): v1'deki yan sütun düzeni.
 *
 * Senkron: ayrı zamanlayıcı ya da ikinci kaydırma motoru YOK. Ronin motorunun "rh6:progress" olayında EKRANDA ÇİZİLİ
 * karenin (detail.shown) zaman damgası kullanılır; ileri/geri/hızlı kaydırmada aynı fonksiyon aynı durumu verir.
 * prefers-reduced-motion: yalnızca slogan, animasyonsuz ve sabit olarak sağ sütunda görünür.
 */
(function () {
  'use strict';
  const TAG = 'ronin-type-m2';
  if (customElements.get(TAG)) return;

  const css = `
${TAG}{display:none}
.rtm2-layer{position:absolute;inset:0;z-index:3;pointer-events:none;overflow:hidden;font-family:"Barlow Condensed","Arial Narrow",Arial,sans-serif;--rtm-ink:#D9D8D1;--rtm-acc:var(--n1m-acc,#A8CF62);-webkit-font-smoothing:antialiased}
.rtm2-blk{position:absolute;display:block;margin:0;white-space:nowrap;line-height:.88;visibility:hidden}
.rtm2-ln{display:block;overflow:hidden;padding:.05em 0 .07em}
.rtm2-ln > span{display:block;opacity:0;transform:translate3d(0,105%,0);will-change:transform,opacity}
.rtm2-ink{color:var(--rtm-ink)}
.rtm2-acc{color:var(--rtm-acc)}
.rtm2-word{font-weight:600;text-transform:uppercase;letter-spacing:.005em}
.rtm2-slogan{font-weight:500;letter-spacing:0;line-height:.96}
.rtm2-layer[data-static] .rtm2-ln > span{opacity:1;transform:none;will-change:auto}
`;
  // t: [görünmeye başla, tam görünür, kaybolmaya başla, tamamen kaybol] (ms, M0 zaman çizgisi)
  // box: [x0, x1, y0, y1] kadraj koordinatı (0–1) · al: hizalama · axis: 'r' sağ sütun, 'p' çift satırı
  const BLOCKS = [
    { id: 'slogan',   t: [-1, 0, 1250, 1750],       cls: 'rtm2-slogan', lines: [['Workshops to', 'rtm2-ink'], ['Blow Your Mind.', 'rtm2-acc']], al: 'right', axis: 'r', box: [0.52, 0.95, 0.50, 0.74] },
    { id: 'branding', t: [2700, 3400, 7900, 8350],  cls: 'rtm2-word', lines: [['Branding', 'rtm2-acc']], al: 'right', axis: 'r', box: [0.60, 0.95, 0.56, 0.68] },
    { id: 'creative', t: [8700, 9300, 10500, 11000], cls: 'rtm2-word', lines: [['Creative', 'rtm2-ink']], al: 'right', axis: 'r', box: [0.66, 0.95, 0.56, 0.68] },
    { id: 'think',    t: [12900, 13600, 16200, 16750], cls: 'rtm2-word', lines: [['Think', 'rtm2-ink']],  al: 'left',  axis: 'p', pair: 'beyond', box: [0.04, 0.33, 0.29, 0.41] },
    { id: 'beyond',   t: [13150, 13850, 16200, 16750], cls: 'rtm2-word', lines: [['Beyond', 'rtm2-acc']], al: 'right', axis: 'p', pair: 'think',  box: [0.67, 0.96, 0.29, 0.41] },
    { id: 'create',   t: [17000, 17700, 1e9, 1e9],  cls: 'rtm2-word', lines: [['Create', 'rtm2-ink']],  al: 'left',  axis: 'p', pair: 'impact', box: [0.04, 0.33, 0.29, 0.41] },
    { id: 'impact',   t: [17250, 17950, 1e9, 1e9],  cls: 'rtm2-word', lines: [['Impact', 'rtm2-acc']], al: 'right', axis: 'p', pair: 'create', box: [0.67, 0.96, 0.29, 0.41] },
  ];
  const AXIS = { r: 0.62, p: 0.35 };          // dikey merkezler (kadraj yüksekliği oranı)
  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  const easeOut = (x) => 1 - Math.pow(1 - x, 3);
  const easeIn = (x) => x * x;

  class RoninTypeMobile2 extends HTMLElement {
    connectedCallback() {
      if (this._on) return; this._on = true;
      this._reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!document.getElementById('rtm2-style')) { const s = document.createElement('style'); s.id = 'rtm2-style'; s.setAttribute('data-n1-owner', 'n1-site-v1'); s.textContent = css; document.head.appendChild(s); }
      this._tries = 0;
      const attach = () => {
        if (!this._on) return;
        const hero = document.getElementById(this.getAttribute('for') || 'hero');
        if (!hero || !hero.stage || !hero.copy || !hero.rect) { if (++this._tries < 400) this._wait = setTimeout(attach, 50); return; }
        this.hero = hero;
        const blocks = this._reduce ? BLOCKS.filter((b) => b.id === 'slogan') : BLOCKS;
        const L = this.layer = document.createElement('div'); L.className = 'rtm2-layer'; L.setAttribute('aria-hidden', 'true'); L.lang = 'en';
        if (this._reduce) L.setAttribute('data-static', '');
        L.innerHTML = blocks.map((b) => `<p class="rtm2-blk ${b.cls}" data-id="${b.id}">${b.lines.map(([t, c]) => `<span class="rtm2-ln"><span class="${c}">${t}</span></span>`).join('')}</p>`).join('');
        hero.stage.appendChild(L);
        this.blocks = blocks; this.els = {}; this.spans = {};
        L.querySelectorAll('.rtm2-blk').forEach((e) => { this.els[e.dataset.id] = e; this.spans[e.dataset.id] = [].slice.call(e.querySelectorAll('.rtm2-ln > span')); });
        hero.setAttribute('data-rtm', '');                     // motorun sabit sloganı gizlenir (yerine bu katman)
        const sr = this.sr = document.createElement('p'); sr.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;white-space:nowrap';
        sr.lang = 'en'; sr.textContent = this._reduce ? 'Workshops to Blow Your Mind.' : 'Workshops to Blow Your Mind. Branding. Creative. Think beyond. Create impact.'; hero.stage.appendChild(sr);
        this._t = 0; this._vis = {};
        this._onProg = (e) => { const d = e.detail || {}, T = hero.times, k = d.shown; this._t = T && k >= 0 && k < T.length ? T[k] : 0; this._apply(); };
        this._onLay = () => { cancelAnimationFrame(this._lr); this._lr = requestAnimationFrame(() => { this._layout(); this._apply(true); }); };
        if (!this._reduce) hero.addEventListener('rh6:progress', this._onProg);
        hero.addEventListener('rh6:layout', this._onLay);
        this._ro = new ResizeObserver(this._onLay); this._ro.observe(hero.stage);
        (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(() => { if (this._on) this._onLay(); });
        if (hero.drawn >= 0 && hero.times) this._t = hero.times[hero.drawn];
        this._layout(); this._apply(true);
      };
      attach();
    }
    disconnectedCallback() {
      this._on = false; clearTimeout(this._wait); cancelAnimationFrame(this._lr);
      if (this._ro) this._ro.disconnect();
      if (this.hero) { this.hero.removeEventListener('rh6:progress', this._onProg); this.hero.removeEventListener('rh6:layout', this._onLay); this.hero.removeAttribute('data-rtm'); }
      if (this.layer) this.layer.remove(); if (this.sr) this.sr.remove();
      this.layer = this.sr = this.hero = null;
    }

    _fit(id, bw, bh) {
      const el = this.els[id]; el.style.fontSize = '100px';
      const w = el.scrollWidth || 1, hh = el.scrollHeight || 1;
      return Math.max(8, Math.min(100 * bw / w, 100 * bh / hh));
    }

    _layout() {
      const h = this.hero; if (!h || !h.rect || !this.els) return;
      const r = h.rect, W = r.W, H = r.H, pad = Math.round(clamp(W * 0.05, 18, 40));
      const headB = r.hb || 0;
      const ctaTop = r.ctaTop != null ? r.ctaTop : H - 90;
      this._mode = r.side ? 'side' : 'frame';
      if (r.side) return this._layoutSide(r, pad, headB);
      const px = (b) => {
        const x0 = Math.max(r.vx + b.box[0] * r.vw, pad), x1 = Math.min(r.vx + b.box[1] * r.vw, W - pad);
        return { x0, x1, w: Math.max(30, x1 - x0), h: Math.max(16, (b.box[3] - b.box[2]) * r.vh) };
      };
      const P = {}; this.blocks.forEach((b) => (P[b.id] = px(b)));
      // tek kelimeler: hepsi aynı boyut (en dar güvenli kutu belirler); üst sınır kadraj genişliğinin %11'i / 76 px
      let word = Infinity;
      this.blocks.forEach((b) => { if (b.cls === 'rtm2-word') word = Math.min(word, this._fit(b.id, P[b.id].w, P[b.id].h)); });
      word = Math.min(word, r.vw * 0.11, 76);
      const fs = {};
      this.blocks.forEach((b) => { fs[b.id] = b.cls === 'rtm2-word' ? word : Math.min(this._fit(b.id, P[b.id].w, P[b.id].h), r.vw * 0.075, 52); });
      for (const b of this.blocks) {
        const el = this.els[b.id], p = P[b.id]; el.style.fontSize = fs[b.id].toFixed(1) + 'px';
        const eh = el.offsetHeight, cy = r.vy + AXIS[b.axis] * r.vh;
        let top = Math.round(cy - eh / 2);
        top = clamp(top, headB + 8, ctaTop - 12 - eh);
        Object.assign(el.style, { top: top + 'px', textAlign: b.al, left: b.al === 'right' ? 'auto' : Math.round(p.x0) + 'px', right: b.al === 'right' ? Math.round(W - p.x1) + 'px' : 'auto' });
      }
    }

    // yatay telefon: video solda, yazı sütunu sağda (CTA'nın üstü) — v1 ile aynı mantık
    _layoutSide(r, pad, headB) {
      const h = this.hero, st = h.stage.getBoundingClientRect(), cta = h.querySelector('.rh6-cta'), cr = cta ? cta.getBoundingClientRect() : null;
      const W = r.W, H = r.H, zB = (cr && cr.height ? cr.top - st.top : H - 90) - 14;
      const z = { l: parseFloat(h.copy.style.left) || (r.vx + r.vw + pad), r: W - pad, t: Math.max(headB + 12, zB - H * 0.6), b: zB };
      const zw = Math.max(40, z.r - z.l), zh = Math.max(40, z.b - z.t), fs = {};
      for (const b of this.blocks) fs[b.id] = b.pair ? this._fit(b.id, zw, zh / 2) : this._fit(b.id, zw, zh);
      for (const b of this.blocks) {
        let f = fs[b.id]; if (b.pair && fs[b.pair]) f = Math.min(f, fs[b.pair]); if (b.id !== 'slogan') f = Math.min(f, W * 0.12);
        const el = this.els[b.id]; el.style.fontSize = f.toFixed(1) + 'px';
        const eh = el.offsetHeight, row = b.pair ? (b.al === 'left' ? 0 : 1) : -1;
        const top = Math.max(row === 0 ? z.b - eh * 2 : z.b - eh, headB + 8);
        Object.assign(el.style, { top: Math.round(top) + 'px', textAlign: b.al, left: b.al === 'right' ? 'auto' : Math.round(z.l) + 'px', right: b.al === 'right' ? Math.round(W - z.r) + 'px' : 'auto' });
      }
    }

    _apply(force) {
      if (!this.els) return;
      if (this._reduce) { const e = this.els.slogan; if (e && (force || !this._vis.slogan)) { e.style.visibility = 'visible'; this._vis.slogan = true; } return; }
      const t = this._t;
      for (const b of this.blocks) {
        const [a0, a1, d0, d1] = b.t;
        const u = a0 < 0 ? 1 : clamp((t - a0) / (a1 - a0), 0, 1), v = d1 > d0 ? clamp((t - d0) / (d1 - d0), 0, 1) : (t >= d0 ? 1 : 0);
        const vis = u * (1 - v), el = this.els[b.id], on = vis > 0.001;
        if (on !== this._vis[b.id] || force) { el.style.visibility = on ? 'visible' : 'hidden'; this._vis[b.id] = on; }
        if (!on) continue;
        this.spans[b.id].forEach((s, i) => {
          const eu = easeOut(clamp(u * 1.15 - i * 0.15, 0, 1)), ev = easeIn(v);
          s.style.transform = `translate3d(0,${((1 - eu) * 105 - ev * 35).toFixed(2)}%,0)`;
          s.style.opacity = (eu * (1 - ev)).toFixed(3);
        });
      }
    }
  }
  customElements.define(TAG, RoninTypeMobile2);
})();
