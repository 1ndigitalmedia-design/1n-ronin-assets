/*!
 * ronin-type — 1N Digital Media · Ronin hero sahne tipografisi (v6.13, yalnızca masaüstü)
 * Ronin hero bileşenine dokunmaz: onun sahnesine (sticky stage) bir yazı katmanı ekler ve "rh6:progress"
 * olayındaki animasyon zamanına (ms) göre metinleri gösterir. Kaydırma ileri/geri aynı şekilde çalışır.
 * Yerleşim, videonun kendi koordinatlarına göre (rect.vx, vy, vw, vh) yapılır; kutular her sahnede samurayın
 * bulunmadığı boş alanlardan seçildi (498 karenin kenar/parlaklık doluluk ölçümüyle).
 *
 * Kullanım: <ronin-type for="hero"></ronin-type>  (for = ronin-hero öğesinin id'si)
 */
(function () {
  'use strict';
  const TAG = 'ronin-type';
  if (customElements.get(TAG)) return;
  const css = `
${TAG}{display:none}
.rt-layer{position:absolute;inset:0;z-index:2;pointer-events:none;font-family:"Barlow Condensed","Arial Narrow",Arial,sans-serif;--rt-ink:#D9D8D1;--rt-acc:var(--n1-accent,#A8CF62)}
.rt-blk{position:absolute;display:block;margin:0;white-space:nowrap;line-height:.86}
.rt-ln{display:block;overflow:hidden;padding:.04em 0 .06em}
.rt-ln > span{display:block;will-change:transform,opacity}
.rt-ink{color:var(--rt-ink)}
.rt-acc{color:var(--rt-acc)}
.rt-word{font-weight:600;text-transform:uppercase;letter-spacing:-.012em}
.rt-slogan{font-weight:500;letter-spacing:-.01em;line-height:.92}
@media (max-width:900px){.rt-layer{display:none}}
`;
  // zaman pencereleri (ms): [görünmeye başla, tam görünür, kaybolmaya başla, tamamen kaybol]; sahne sınırları 1435 / 7941 / 12880 / 17217
  const BLOCKS = [
    { id: 'slogan', t: [-1, 0, 1050, 1700], cls: 'rt-slogan', lines: [['Workshops to', 'rt-ink'], ['Blow Your Mind.', 'rt-acc']], box: [0.555, 0.94, 0.36, 0.72], align: 'left', fill: 1 },
    { id: 'branding', t: [2400, 3150, 6900, 7650], cls: 'rt-word', lines: [['Branding', 'rt-acc']], box: [0.585, 0.95, 0.735, 0.92], align: 'right' },
    { id: 'creative', t: [8500, 9250, 11850, 12550], cls: 'rt-word', lines: [['Creative', 'rt-ink']], box: [0.605, 0.95, 0.15, 0.36], align: 'right' },
    { id: 'think', t: [13400, 14150, 16500, 17150], cls: 'rt-word', lines: [['Think', 'rt-ink']], box: [0.05, 0.33, 0.33, 0.52], align: 'left', pair: 'beyond' },
    { id: 'beyond', t: [13650, 14400, 16500, 17150], cls: 'rt-word', lines: [['Beyond', 'rt-acc']], box: [0.665, 0.95, 0.33, 0.52], align: 'right', pair: 'think' },
    { id: 'create', t: [17700, 18450, 1e9, 1e9], cls: 'rt-word', lines: [['Create', 'rt-ink']], box: [0.045, 0.335, 0.32, 0.50], align: 'left', pair: 'impact' },
    { id: 'impact', t: [17950, 18700, 1e9, 1e9], cls: 'rt-word', lines: [['Impact', 'rt-acc']], box: [0.665, 0.955, 0.32, 0.50], align: 'right', pair: 'create' },
  ];
  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  const ease = (x) => 1 - Math.pow(1 - x, 3);                 // yumuşak çıkış
  const easeIn = (x) => x * x;

  class RoninType extends HTMLElement {
    connectedCallback() {
      if (this._on) return; this._on = true;
      if (!document.getElementById('rt-style')) { const s = document.createElement('style'); s.id = 'rt-style'; s.textContent = css; document.head.appendChild(s); }
      this.reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
      const attach = () => {
        const hero = document.getElementById(this.getAttribute('for') || 'hero');
        if (!hero || !hero.stage) return setTimeout(attach, 50);
        this.hero = hero;
        const L = this.layer = document.createElement('div'); L.className = 'rt-layer'; L.setAttribute('aria-hidden', 'true'); L.lang = 'en';   // büyük harfte Türkçe 'İ' oluşmasın
        L.innerHTML = BLOCKS.map((b) => `<p class="rt-blk ${b.cls}" data-id="${b.id}">${b.lines.map(([t, c]) => `<span class="rt-ln"><span class="${c}">${t}</span></span>`).join('')}</p>`).join('');
        hero.stage.appendChild(L);
        this.els = {}; L.querySelectorAll('.rt-blk').forEach((e) => (this.els[e.dataset.id] = e));
        // ekran okuyucular için tek, sabit metin (görsel katman aria-hidden)
        const sr = document.createElement('p'); sr.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0';
        sr.textContent = 'Workshops to Blow Your Mind. Branding. Creative. Think beyond. Create impact.'; hero.stage.appendChild(sr);
        this._t = 0;
        hero.addEventListener('rh6:progress', (e) => { this._t = e.detail.t; this._apply(); });
        this._ro = new ResizeObserver(() => this._layout()); this._ro.observe(hero.stage);
        (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(() => { this._layout(); this._apply(); });
        this._layout(); this._apply();
      };
      attach();
    }
    disconnectedCallback() { this._on = false; this._ro && this._ro.disconnect(); this.layer && this.layer.remove(); }

    // yazı boyutu: kutuya sığacak en büyük değer; eş kelimeler (THINK/BEYOND, CREATE/IMPACT) aynı boyutta
    _layout() {
      const r = this.hero && this.hero.rect; if (!r || !this.els) return;
      if (this.hero.dataset.orient === 'portrait') return;
      const size = {};
      const W = r.W || innerWidth;
      // kutu, %90 içerik alanının (iki yanda %5) içine sınırlanır
      const bx = (b) => [Math.max(r.vx + b.box[0] * r.vw, W * 0.05), Math.min(r.vx + b.box[1] * r.vw, W * 0.95)];
      for (const b of BLOCKS) {
        const [x0, x1] = bx(b), el = this.els[b.id], bw = x1 - x0, bh = (b.box[3] - b.box[2]) * r.vh;
        el.style.fontSize = '100px';
        const w = el.scrollWidth, h = el.scrollHeight;
        size[b.id] = Math.min(100 * bw / w, 100 * bh / h);
      }
      for (const b of BLOCKS) {
        let fs = size[b.id]; if (b.pair) fs = Math.min(fs, size[b.pair]);
        const el = this.els[b.id]; el.style.fontSize = fs.toFixed(1) + 'px';
        const [x0, x1] = bx(b), y0 = r.vy + b.box[2] * r.vh, y1 = r.vy + b.box[3] * r.vh;
        const top = Math.max(y0 + ((y1 - y0) - el.offsetHeight) / 2, 96);   // header'ın altında kalır
        Object.assign(el.style, { top: top + 'px', textAlign: b.align, left: b.align === 'right' ? 'auto' : x0 + 'px', right: b.align === 'right' ? (W - x1) + 'px' : 'auto' });
      }
    }
    _apply() {
      if (!this.els) return; const t = this._t;
      for (const b of BLOCKS) {
        const [a0, a1, d0, d1] = b.t;
        const u = a0 < 0 ? 1 : clamp((t - a0) / (a1 - a0), 0, 1), v = clamp((t - d0) / (d1 - d0), 0, 1);
        const el = this.els[b.id], vis = u * (1 - v);
        el.style.visibility = vis <= 0.001 ? 'hidden' : 'visible';
        if (vis <= 0.001) continue;
        const lines = el.querySelectorAll('.rt-ln > span');
        lines.forEach((s, i) => {
          // satır maskesinden yükselir, giderken yukarı süzülür; çok satırda hafif gecikme
          const ui = clamp(u * 1.15 - i * 0.15, 0, 1), eu = ease(ui), ev = easeIn(v);
          const y = this.reduce ? 0 : (1 - eu) * 105 - ev * 35;
          s.style.transform = `translate3d(0,${y.toFixed(2)}%,0)`;
          s.style.opacity = (eu * (1 - ev)).toFixed(3);
        });
      }
    }
  }
  customElements.define(TAG, RoninType);
})();
