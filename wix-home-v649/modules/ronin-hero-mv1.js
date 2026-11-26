/*!
 * ronin-hero-mv1 — 1N Digital Media · Ronin Ustası · MOBİL / TABLET dikey motor (v1)
 * ronin-hero-v67.js'ten türetildi (tools/make_ronin_mv1.py). Masaüstü motoru ve etiketi (ronin-hero-v67) değişmedi.
 *
 * Kaynak: M0.mp4 (1080×1360, 19,152 sn, 29,97 fps, 574 kare; tekrar kare yok). Paketler: tools/build_ronin_packs.py
 *   telefon  ronin-mv-v1-{a0,a,b}.bin  648×816   358 kare
 *   tablet   ronin-tv-v1-{a0,a,b}.bin  720×907   408 kare  (V1.1; V1: 864×1088)
 * Sahne sınırları (V1.1): M0 kare kare incelendi — 0 / 50 / 248 / 376 / 504. Kaydırma payları 12,30,22,22,14.
 * Aynı RHPK biçimi, aynı parça parça akış, aynı kayan pencere (pencere + 6 çözülmüş kare), aynı X1 takip.
 *
 * Yerleşim (v67'den fark): kare oranı paketten okunur (4:5'e yakın dikey). Video HİÇ kırpılmaz ve esnetilmez:
 *   dikey ekranda tam genişlik, yatay/alçak ekranda tam yükseklik (yanlarda düz koyu zemin). Alt kenar (sis, açık ton)
 *   maske ile sayfa zeminine erir; yatay birleşim çizgisi oluşmaz. Slogan ve CTA videonun altında, yer yoksa yanında.
 *
 * Nitelikler:
 *   profile       m (telefon) | t (tablet) — çözünürlük varsayılanları ve pencere boyu
 *   frames-base   paket/poster adres öneki (sonunda /)
 *   packs         virgülle ayrılmış parça listesi          poster   poster dosyası
 *   scroll-vh     kaydırma izi (svh); varsayılan 300       scroll-px  verilirse iz = 1 ekran + N px
 *   stage-weights beş sahnenin kaydırma payı; varsayılan "12,30,22,22,14"
 *   smooth-ms     varsayılan 30                            window   aynı anda çözülmüş kare (m:22, t:14)
 *   accent, fade-color, slogan, cta-text, cta-href, top-offset, debug
 * Olay: "rh6:progress" (detail: {p, t, frame, stage})  ·  window.__rh6 = etkin motor (test araçları)
 */
(function () {
  'use strict';
  const TAG = 'ronin-hero-mv1';
  if (customElements.get(TAG)) return;

  const STAGE_NAMES = ['Bekleyiş', 'Kılıcı çeker', 'Kılıcı indirir, kınına koyar', 'Kamera uzaklaşır ve döner', 'Final duruşu'];
  const DEF_STAGES = [0, 1668.3, 8274.9, 12545.9, 16816.8];   // V1.1: M0 kare 0 / 50 / 248 / 376 / 504
  const DEF_WEIGHTS = [12, 30, 22, 22, 14];
  const BG = '#080A09';
  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  const abs = (base, u) => (/^(https?:|blob:|data:|\/)/.test(u) ? u : base + u);

  const css = `
${TAG}{display:block;position:relative;background:${BG};color:#fff;--rh6-accent:#A1FF00;--rh6-vh:400;height:calc(var(--rh6-vh) * 1vh);height:calc(var(--rh6-vh) * 1svh)}
${TAG}[data-height="container"]{height:100%}
${TAG}[data-static]{height:100vh;height:100svh}
${TAG} *{box-sizing:border-box}
${TAG} .rh6-stage{position:sticky;top:0;height:100vh;height:100svh;overflow:hidden;background:${BG}}
${TAG} .rh6-media{position:absolute;left:0;top:0;width:100%;height:100%}
${TAG} .rh6-media canvas,${TAG} .rh6-media img{position:absolute;display:block;max-width:none}
${TAG}[data-orient="landscape"] .rh6-stage{background:linear-gradient(to bottom,var(--rh6-e1,#0d0d0e) 0%,var(--rh6-e2,#121213) 55%,var(--rh6-e3,#1d1d1e) 100%)}
${TAG} .rh6-edge{position:absolute;z-index:1;pointer-events:none;display:none;background:linear-gradient(to bottom,var(--rh6-e1,#0d0d0e) 0%,var(--rh6-e2,#121213) 55%,var(--rh6-e3,#1d1d1e) 100%)}
${TAG}[data-edge] .rh6-edge{display:block}
${TAG} .rh6-edge-l{-webkit-mask-image:linear-gradient(to right,#000 var(--rh6-solid),rgba(0,0,0,.82) calc(var(--rh6-solid) + (100% - var(--rh6-solid)) * .3),rgba(0,0,0,.45) calc(var(--rh6-solid) + (100% - var(--rh6-solid)) * .62),transparent 100%);mask-image:linear-gradient(to right,#000 var(--rh6-solid),rgba(0,0,0,.82) calc(var(--rh6-solid) + (100% - var(--rh6-solid)) * .3),rgba(0,0,0,.45) calc(var(--rh6-solid) + (100% - var(--rh6-solid)) * .62),transparent 100%)}
${TAG} .rh6-edge-r{-webkit-mask-image:linear-gradient(to left,#000 var(--rh6-solid),rgba(0,0,0,.82) calc(var(--rh6-solid) + (100% - var(--rh6-solid)) * .3),rgba(0,0,0,.45) calc(var(--rh6-solid) + (100% - var(--rh6-solid)) * .62),transparent 100%);mask-image:linear-gradient(to left,#000 var(--rh6-solid),rgba(0,0,0,.82) calc(var(--rh6-solid) + (100% - var(--rh6-solid)) * .3),rgba(0,0,0,.45) calc(var(--rh6-solid) + (100% - var(--rh6-solid)) * .62),transparent 100%)}
${TAG} .rh6-edge-t{background:var(--rh6-e1,#0d0d0e);-webkit-mask-image:linear-gradient(to bottom,#000 var(--rh6-solid),rgba(0,0,0,.82) calc(var(--rh6-solid) + (100% - var(--rh6-solid)) * .3),rgba(0,0,0,.45) calc(var(--rh6-solid) + (100% - var(--rh6-solid)) * .62),transparent 100%);mask-image:linear-gradient(to bottom,#000 var(--rh6-solid),rgba(0,0,0,.82) calc(var(--rh6-solid) + (100% - var(--rh6-solid)) * .3),rgba(0,0,0,.45) calc(var(--rh6-solid) + (100% - var(--rh6-solid)) * .62),transparent 100%)}
${TAG} .rh6-edge-b{background:var(--rh6-e3,#1d1d1e);-webkit-mask-image:linear-gradient(to top,#000 var(--rh6-solid),rgba(0,0,0,.82) calc(var(--rh6-solid) + (100% - var(--rh6-solid)) * .3),rgba(0,0,0,.45) calc(var(--rh6-solid) + (100% - var(--rh6-solid)) * .62),transparent 100%);mask-image:linear-gradient(to top,#000 var(--rh6-solid),rgba(0,0,0,.82) calc(var(--rh6-solid) + (100% - var(--rh6-solid)) * .3),rgba(0,0,0,.45) calc(var(--rh6-solid) + (100% - var(--rh6-solid)) * .62),transparent 100%)}
${TAG} .rh6-fade{position:absolute;left:0;right:0;bottom:0;z-index:1;pointer-events:none;display:none;height:var(--rh6-fade-h,clamp(160px,24vh,260px));
  background:linear-gradient(to bottom,rgba(12,12,13,0) 0%,rgba(12,12,13,.1) 22%,rgba(12,12,13,.36) 48%,rgba(12,12,13,.72) 74%,rgba(12,12,13,.94) 92%,#0c0c0d 100%);
  background:linear-gradient(to bottom,transparent 0%,color-mix(in srgb,var(--rh6-fade-c,#0c0c0d) 10%,transparent) 22%,color-mix(in srgb,var(--rh6-fade-c,#0c0c0d) 36%,transparent) 48%,color-mix(in srgb,var(--rh6-fade-c,#0c0c0d) 72%,transparent) 74%,color-mix(in srgb,var(--rh6-fade-c,#0c0c0d) 94%,transparent) 92%,var(--rh6-fade-c,#0c0c0d) 100%)}
${TAG}[data-orient="landscape"] .rh6-fade{display:block}
${TAG} .rh6-sa{position:absolute;visibility:hidden;pointer-events:none;top:0;left:0;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
${TAG} .rh6-media canvas.rh6-main{visibility:hidden}
${TAG}[data-live] .rh6-media canvas.rh6-main{visibility:visible}
${TAG} .rh6-media img[hidden]{display:none}
${TAG} .rh6-copy{position:absolute;z-index:2;display:flex;flex-direction:column;align-items:flex-start;gap:clamp(16px,1.6vw,28px);pointer-events:none}
${TAG} .rh6-slogan{margin:0;font:700 clamp(30px,3.1vw,60px)/.98 "Barlow Condensed","Arial Narrow",Arial,sans-serif;letter-spacing:0;text-wrap:balance;text-shadow:0 2px 18px rgba(0,0,0,.55)}
${TAG} .rh6-cta{pointer-events:auto;display:inline-flex;align-items:center;min-height:48px;padding:0 22px;background:var(--rh6-accent);color:#0b0b0c;font:600 16px/1 Barlow,Arial,sans-serif;text-decoration:none;border-radius:2px;transition:background-color .18s,color .18s}
${TAG} .rh6-cta:hover{background:#fff}
${TAG} .rh6-cta:focus-visible{outline:2px solid #fff;outline-offset:3px}
${TAG} .rh6-copy{opacity:0;transform:translateY(10px);transition:opacity .7s ease .2s,transform .7s cubic-bezier(.2,.7,.2,1) .2s}
${TAG}[data-ready] .rh6-copy{opacity:1;transform:none}
${TAG}[data-orient="portrait"] .rh6-copy{align-items:flex-start}
${TAG} .rh6-media canvas.rh6-main,${TAG} .rh6-media img{-webkit-mask-image:linear-gradient(to bottom,transparent 0,#000 5%,#000 70%,rgba(0,0,0,.72) 80%,rgba(0,0,0,.3) 91%,transparent 100%);mask-image:linear-gradient(to bottom,transparent 0,#000 5%,#000 70%,rgba(0,0,0,.72) 80%,rgba(0,0,0,.3) 91%,transparent 100%)}
${TAG} .rh6-stage{background:var(--rh6-fade-c,#080A09)}
${TAG} .rh6-edge{background:var(--rh6-fade-c,#080A09)!important}
${TAG} .rh6-slogan{font-size:clamp(30px,8.4vw,52px)}
${TAG} .rh6-cta{min-height:50px;padding:0 24px;border-radius:10px;letter-spacing:.02em}
${TAG} .rh6-debug{position:fixed;z-index:2147483000;left:8px;top:8px;max-width:calc(100vw - 16px);font:11px/1.35 ui-monospace,Menlo,Consolas,monospace;color:#cfe;background:rgba(0,0,0,.8);padding:5px 7px;white-space:pre-wrap;pointer-events:none}
@media (prefers-reduced-motion: reduce){${TAG} .rh6-copy{transition:none;transform:none}}
`;

  class RoninHeroV6 extends HTMLElement {
    connectedCallback() {
      if (this._on) return; this._on = true;
      if (!document.getElementById('rhmv1-style')) { const s = document.createElement('style'); s.id = 'rhmv1-style'; s.textContent = css; document.head.appendChild(s); }
      const A = (n, d) => (this.hasAttribute(n) ? this.getAttribute(n) : d);
      const base = A('frames-base', '');
      const accent = A('accent', ''); if (accent) this.style.setProperty('--rh6-accent', accent);
      ['edge-top', 'edge-mid', 'edge-bottom'].forEach((a, i) => { if (this.hasAttribute(a)) this.style.setProperty(`--rh6-e${i + 1}`, this.getAttribute(a)); });
      if (this.hasAttribute('fade-color')) this.style.setProperty('--rh6-fade-c', this.getAttribute('fade-color'));
      if (this.hasAttribute('fade-height')) this.style.setProperty('--rh6-fade-h', parseFloat(this.getAttribute('fade-height')) + 'px');
      if (this.getAttribute('height-mode') === 'container') this.dataset.height = 'container';
      if (this.hasAttribute('scroll-px')) this.setPx(parseFloat(this.getAttribute('scroll-px')) || 600); else this.setVh(parseFloat(A('scroll-vh', '300')) || 300);
      const w = String(A('stage-weights', '')).split(',').map(Number);
      this.weights = w.length === 5 && w.every((x) => x > 0) ? w : DEF_WEIGHTS.slice();
      this.smoothMs = Math.max(0, parseFloat(A('smooth-ms', '30')) || 0);

      this.kind = A('profile', 'm') === 't' ? 't' : 'm';
      this.srcW = this.kind === 't' ? 864 : 648; this.srcH = this.kind === 't' ? 1088 : 816;
      this.winMax = parseInt(A('window', this.kind === 't' ? '14' : '22'), 10) || 22;
      const pfx = this.kind === 't' ? 'ronin-tv-v1' : 'ronin-mv-v1';
      const packs = A('packs', `${pfx}-a0.bin,${pfx}-a.bin,${pfx}-b.bin`).split(',').map((s) => abs(base, s.trim())).filter(Boolean);
      const poster = abs(base, A('poster', `${pfx}-poster.webp`));

      this.innerHTML = `<div class="rh6-stage">
  <div class="rh6-media"><img class="rh6-poster" src="${poster}" alt="" width="${this.srcW}" height="${this.srcH}" fetchpriority="high" decoding="async"><canvas class="rh6-main" aria-hidden="true"></canvas></div>
  <div class="rh6-edge rh6-edge-l"></div><div class="rh6-edge rh6-edge-r"></div><div class="rh6-edge rh6-edge-t"></div><div class="rh6-edge rh6-edge-b"></div><div class="rh6-fade" aria-hidden="true"></div>
  <div class="rh6-sa" aria-hidden="true"></div>
  <div class="rh6-copy"><p class="rh6-slogan"></p><a class="rh6-cta"></a></div>
</div>`;
      this.stage = this.querySelector('.rh6-stage');
      this.canvas = this.querySelector('canvas.rh6-main'); this.edges = [...this.querySelectorAll('.rh6-edge')]; this.sa = this.querySelector('.rh6-sa'); this.ctx = this.canvas.getContext('2d', { alpha: false });
      this.canvas.width = this.srcW; this.canvas.height = this.srcH;
      this.poster = this.querySelector('.rh6-poster');
      this.poster.addEventListener('load', () => { if (this.stats && this.stats.posterMs == null) this.stats.posterMs = Math.round(performance.now()); }, { once: true });
      if (this.hasAttribute('poster-fetch')) { this.poster.removeAttribute('src'); fetch(poster).then((r) => r.blob()).then((b) => { if (!this.poster.hidden) this.poster.src = URL.createObjectURL(b); }).catch(() => {}); }
      this.copy = this.querySelector('.rh6-copy');
      this.querySelector('.rh6-slogan').textContent = A('slogan', 'Workshops to Blow Your Mind.');
      const cta = this.querySelector('.rh6-cta'); cta.textContent = A('cta-text', 'Projenizi Konuşalım'); cta.href = A('cta-href', '#iletisim');
      if (this.hasAttribute('debug') || /[?&]rh6-debug=1/.test(location.search)) { this.dbg = document.createElement('div'); this.dbg.className = 'rh6-debug'; this.appendChild(this.dbg); }

      // Kare deposu: sıkıştırılmış WebP blob'ları (küçük) tamamı tutulur; çözülmüş bitmap'ler yalnızca kayan pencerede.
      this.n = 0; this.times = null; this.stages = DEF_STAGES.slice(); this.blobs = []; this.bmp = new Map(); this.pending = new Set();
      this.stats = { kind: this.kind, packs, loaded: 0, bytes: 0, decoded: 0, decodes: 0, evicted: 0, firstFrameMs: null, chunkMs: [], t0: performance.now(), frame: 0, stage: 1, p: 0, peakDecoded: 0 };
      window.__rh6 = this;  // test araçları aynı adı kullanır

      this.cur = 0; this.target = 0; this.drawn = -1; this.want = 0; this.dirSign = 1;
      this._layout();
      this._ro = new ResizeObserver(() => this._layout()); this._ro.observe(this.stage);
      this._onScroll = () => this._kick(); addEventListener('scroll', this._onScroll, { passive: true });
      this._onResize = () => { this._layout(); this._kick(); }; addEventListener('resize', this._onResize);
      requestAnimationFrame(() => (this.dataset.ready = ''));

      if (matchMedia('(prefers-reduced-motion: reduce)').matches || this.getAttribute('mode') === 'static') { this.dataset.static = ''; return; }
      this._loadAll(packs).catch((e) => { this.stats.err = String((e && e.message) || e); console.warn('[ronin-hero-mv1] paket yüklenemedi; poster görünür kalır', e); });
      this._kick();
    }
    disconnectedCallback() {
      this._on = false; removeEventListener('scroll', this._onScroll); removeEventListener('resize', this._onResize);
      if (this._ro) this._ro.disconnect(); cancelAnimationFrame(this._raf); this._raf = 0;
      this.bmp.forEach((b) => b.close && b.close()); this.bmp.clear(); this._dead = true;
    }

    setVh(vh) { this.vh = vh; this.px = 0; this.style.removeProperty('height'); this.style.setProperty('--rh6-vh', String(vh)); this._kick && this._kick(); }
    // ekran yüksekliğinden bağımsız sabit aktif mesafe: iz = 1 ekran + N px (tekerlek çentiği sayısı ekrana göre değişmez)
    setPx(px) { this.px = px; this.vh = 0; this.style.setProperty('height', `calc(100svh + ${px}px)`); this._kick && this._kick(); }
    setWeights(w) { if (w.length === 5 && w.every((x) => x > 0)) { this.weights = w.slice(); this._kick(); } }

    /* ---------- yerleşim: dikey kaynak; kırpma ve esnetme yok ----------
     * Güvenli kadraj (574 karenin ölçümü): kılıç ve kabza kılıç çekme / kınına koyma sahnelerinde sol ve sağ kenara
     * kadar uzanır (x %0–%99) → yatay kırpma YOK. Üst kenar koyu (kapüşon üstünde boşluk), alt kenar parlak sis →
     * alt %30 maskeyle zemine erir (ayaklar en geç sahnelerde ≈ %75'te; maskenin opak bölgesinde kalır).
     * Dikey ekran: video tam genişlik. Kalan yükseklik slogan + CTA içindir; artan boşluk üstte/altta dengelenir.
     * Yatay / alçak ekran: video tam yükseklik, ortada; yanlar düz koyu zemin + yumuşak kenar; yazı sağda. */
    _layout() {
      const W = this.stage.clientWidth, H = this.stage.clientHeight; if (!W || !H) return;
      const ar = this.srcW / this.srcH;
      this.dataset.orient = 'portrait';
      const cs = this.sa ? getComputedStyle(this.sa) : null, saT = cs ? parseFloat(cs.paddingTop) || 0 : 0, saB = cs ? parseFloat(cs.paddingBottom) || 0 : 0;
      const topOff = parseFloat(this.getAttribute('top-offset')) || 0;
      const pad = Math.round(clamp(W * 0.05, 18, 40)), bottomPad = Math.max(22, saB + 14), gap = Math.round(clamp(W * 0.045, 14, 26));
      let vw = W, vh = W / ar, amb = '';
      if (vh > H - topOff) { vh = H - topOff; vw = vh * ar; }
      let vx = (W - vw) / 2, vy = topOff;
      const side = W - vw >= 300 && W > H;                      // yazı videonun yanına sığıyor (yatay telefon/alçak ekran)
      if (side) {
        vx = Math.max(pad, Math.round((W - vw) * 0.22));
        Object.assign(this.copy.style, { left: Math.round(vx + vw + pad) + 'px', right: pad + 'px', width: 'auto', top: 'auto', bottom: Math.max(bottomPad, Math.round(H * 0.16)) + 'px' });
        amb = 'x';
      } else {
        Object.assign(this.copy.style, { left: pad + 'px', right: pad + 'px', width: 'auto', bottom: 'auto', top: '0px' });
        const copyH = this.copy.offsetHeight || 120, textAt = 0.86;                 // yazı, videonun eriyen alt bölgesinin içinden başlar
        const total = vh * textAt + gap + copyH, free = H - topOff - bottomPad - total;
        if (free > 0) vy = topOff + Math.round(Math.min(free * 0.46, 132 + saT));    // artan boşluk: üstte Header payı kadar
        const top = Math.min(vy + vh * textAt + gap, H - bottomPad - copyH);
        this.copy.style.top = Math.round(top) + 'px';
        if (vw < W - 1) amb = 'x';
      }
      for (const el of [this.canvas, this.poster]) Object.assign(el.style, { left: vx + 'px', top: vy + 'px', width: vw + 'px', height: vh + 'px' });
      const [eL, eR, eT, eB] = this.edges, fx = Math.round(vw * 0.14);
      const box = (el, l, t, w, h, solid) => { Object.assign(el.style, { left: l + 'px', top: t + 'px', width: w + 'px', height: h + 'px', display: '' }); el.style.setProperty('--rh6-solid', solid + 'px'); };
      const hide = (el) => (el.style.display = 'none');
      if (amb === 'x') { const bw = Math.ceil(vx); box(eL, 0, 0, bw + fx, H, bw); box(eR, Math.floor(vx + vw) - fx, 0, W - Math.floor(vx + vw) + fx, H, W - Math.floor(vx + vw)); hide(eT); hide(eB); this.dataset.edge = 'x'; }
      else { [eL, eR, eT, eB].forEach(hide); delete this.dataset.edge; }
      this.rect = { vx, vy, vw, vh, W, H, topOff, amb, side };
    }

    /* ---------- paket yükleme (parça parça, akışla) ---------- */
    async _loadAll(urls) {
      for (const u of urls) { if (this._dead) return; await this._loadPack(u); this.stats.chunkMs.push(Math.round(performance.now() - this.stats.t0)); }
    }
    _initHead(h) {
      if (!this.times) {
        this.n = h.count; this.times = h.times; if (h.w && h.h && (h.w !== this.srcW || h.h !== this.srcH)) { this.srcW = h.w; this.srcH = h.h; this.canvas.width = h.w; this.canvas.height = h.h; this._layout(); } this.tmax = h.times[h.times.length - 1]; this.src = h.src;
        if (h.stages && h.stages.length === 5) this.stages = h.stages;
        this.blobs = new Array(this.n).fill(null);
      }
    }
    _gotBlob(k, blob) {
      if (this.blobs[k]) return; this.blobs[k] = blob; this.stats.loaded++;
      if (k === this.want || Math.abs(k - this.want) <= 2) this._kick();
      if (this.stats.loaded === 1) this._kick();
    }
    async _loadPack(url) {
      const res = await fetch(url); if (!res.ok) throw new Error(url + ' ' + res.status);
      if (/\.json(\?|#|$)/.test(url)) {
        const j = await res.json(); this._initHead(j);
        const str = atob(j.data), bin = new Uint8Array(str.length); for (let i = 0; i < str.length; i++) bin[i] = str.charCodeAt(i); this.stats.bytes += bin.length;
        j.idx.forEach((k, i) => this._gotBlob(k, new Blob([bin.subarray(j.offsets[i], j.offsets[i] + j.sizes[i])], { type: j.type })));
        return;
      }
      const rd = res.body && res.body.getReader ? res.body.getReader() : null;
      if (!rd) { const b = new Uint8Array(await res.arrayBuffer()); return this._parseAll(b); }
      let buf = new Uint8Array(1 << 20), len = 0, head = null, hEnd = 0, next = 0;
      for (;;) {
        const { done, value } = await rd.read(); if (done) break; if (this._dead) { rd.cancel(); return; }
        if (len + value.length > buf.length) { const nb = new Uint8Array(Math.max(buf.length * 2, len + value.length)); nb.set(buf.subarray(0, len)); buf = nb; }
        buf.set(value, len); len += value.length; this.stats.bytes += value.length;
        if (!head && len >= 8) {
          if (String.fromCharCode(buf[0], buf[1], buf[2], buf[3]) !== 'RHPK') throw new Error('Geçersiz paket');
          const hl = new DataView(buf.buffer).getUint32(4, true);
          if (len >= 8 + hl) { head = JSON.parse(new TextDecoder().decode(buf.subarray(8, 8 + hl))); hEnd = 8 + hl; this._initHead(head); }
        }
        if (head) while (next < head.idx.length && hEnd + head.offsets[next] + head.sizes[next] <= len) {
          const o = hEnd + head.offsets[next]; this._gotBlob(head.idx[next], new Blob([buf.slice(o, o + head.sizes[next])], { type: head.type })); next++;
        }
      }
    }
    _parseAll(b) {
      const hl = new DataView(b.buffer).getUint32(4, true), head = JSON.parse(new TextDecoder().decode(b.subarray(8, 8 + hl)));
      this._initHead(head); head.idx.forEach((k, i) => { const o = 8 + hl + head.offsets[i]; this._gotBlob(k, new Blob([b.slice(o, o + head.sizes[i])], { type: head.type })); });
    }

    /* ---------- ilerleme → zaman → kare ---------- */
    progress() {
      const r = this.getBoundingClientRect(), H = this.stage.clientHeight, span = r.height - H;
      return span > 0 ? clamp(-r.top / span, 0, 1) : 0;
    }
    timeFor(p) {
      const w = this.weights, S = w.reduce((a, b) => a + b, 0), tb = this.stages.concat([this.tmax || 19119.1]);
      let acc = 0;
      for (let i = 0; i < 5; i++) {
        const share = w[i] / S;
        if (p <= acc + share || i === 4) return tb[i] + clamp((p - acc) / share, 0, 1) * (tb[i + 1] - tb[i]);
        acc += share;
      }
      return tb[5];
    }
    stageOf(t) { let s = 0; for (let i = 0; i < 5; i++) if (t >= this.stages[i] - 0.5) s = i; return s; }
    frameAt(t) {
      const T = this.times; if (!T) return 0;
      let lo = 0, hi = T.length - 1;
      while (hi - lo > 1) { const m = (lo + hi) >> 1; if (T[m] <= t) lo = m; else hi = m; }
      return t - T[lo] <= T[hi] - t ? lo : hi;
    }

    /* ---------- X1 takip döngüsü ---------- */
    _kick() { if (!this._raf && !this._dead) { this._last = performance.now(); this._raf = requestAnimationFrame((ts) => this._tick(ts)); } }
    _tick(ts) {
      this._raf = 0; if (this._dead) return;
      const now = performance.now(), dt = Math.min(now - this._last, 100); this._last = now;
      const p = this.progress(); this.stats.p = p;
      this.target = this.timeFor(p);
      const diff = this.target - this.cur;
      if (this.smoothMs <= 0) this.cur = this.target;
      else {
        this.cur += diff * (1 - Math.exp(-dt / this.smoothMs));
        // hedef kareye ulaşıldıysa tam hedefe otur (son kare her zaman gerçek, doğru kare)
        if (this.times && this.frameAt(this.cur) === this.frameAt(this.target)) this.cur = this.target;
      }
      if (diff) this.dirSign = diff > 0 ? 1 : -1;
      const k = this.frameAt(this.cur); this.want = k;
      const shown = this._draw(k);
      this._ensure(k);
      const st = this.stageOf(this.cur);
      this.stats.frame = k; this.stats.stage = st + 1;
      this.dispatchEvent(new CustomEvent('rh6:progress', { detail: { p, t: this.cur, frame: k, src: this.src ? this.src[k] : k, stage: st + 1, stageName: STAGE_NAMES[st], shown } }));
      if (this.dbg) this._debug(k, shown);
      // hedefe varınca döngü durur; istenen kare sonradan çözülür/yüklenirse _decode ve _gotBlob döngüyü yeniden başlatır
      if (this.cur !== this.target) this._raf = requestAnimationFrame((t2) => this._tick(t2));
    }
    _draw(k) {
      if (!this.times) return -1;
      let j = this.bmp.has(k) ? k : -1;
      if (j < 0) { // istenen kare henüz çözülmediyse: gösterilen kare ile hedef ARASINDAKİ en yakın çözülmüş kare (geri sıçrama ve hedefi aşma yok)
        const d0 = this.drawn; let best = d0 >= 0 && this.bmp.has(d0) ? Math.abs(d0 - k) : Infinity;
        this.bmp.forEach((_, i) => { const d = Math.abs(i - k); if (d < best && (d0 < 0 || ((i - d0) * (k - d0) >= 0 && (i - k) * (d0 - k) >= 0))) { best = d; j = i; } });
      }
      if (j >= 0 && j !== this.drawn && this.bmp.has(j)) {
        const bm = this.bmp.get(j);
        // canvas, karenin kendi çözünürlüğünde (ör. 1920×1080) tutulur; varsayılan 1600×900'e küçültme yok
        if (bm.width && bm.width !== this.srcW) { this.srcW = bm.width; this.srcH = bm.height; this.canvas.width = this.srcW; this.canvas.height = this.srcH; this.stats.srcW = this.srcW; }
        this.ctx.drawImage(bm, 0, 0, this.srcW, this.srcH); this.drawn = j;
        if (this.stats.firstFrameMs == null) {
          // v6/v6.2 hatası: alpha:false canvas başlangıçta opak siyahtır ve posterin üstündedir; poster hiç görünmüyordu.
          // v6.3: canvas ilk kare çizilene kadar gizli; çizilince görünür olur, poster iki kare sonra kaldırılır.
          this.stats.firstFrameMs = Math.round(performance.now() - this.stats.t0); this.dataset.live = '';
          requestAnimationFrame(() => requestAnimationFrame(() => { this.poster.hidden = true; }));
        }
      }
      return this.drawn;
    }
    _ensure(k) {
      if (!this.times) return;
      const n = this.n, W = this.winMax, ahead = Math.round(W * 0.65), behind = W - ahead - 1, d = this.dirSign;
      const lo = clamp(d > 0 ? k - behind : k - ahead, 0, n - 1), hi = clamp(d > 0 ? k + ahead : k + behind, 0, n - 1);
      // pencere dışındaki bitmap'ler bırakılır
      this.bmp.forEach((b, i) => { if (Math.abs(i - k) > W && i !== this.drawn) { b.close && b.close(); this.bmp.delete(i); this.stats.evicted++; } });
      if (this.bmp.size > W + 6) { // üst sınır: en uzak kareler bırakılır (bellek = en çok W+6 çözülmüş kare)
        [...this.bmp.keys()].filter((i) => i !== this.drawn).sort((a, b) => Math.abs(b - k) - Math.abs(a - k)).slice(0, this.bmp.size - W - 6).forEach((i) => { const b = this.bmp.get(i); b.close && b.close(); this.bmp.delete(i); this.stats.evicted++; });
      }
      // öncelik: istenen kare, sonra hareket yönünde yakından uzağa
      const order = [k];
      // hızlı kaydırmada hedefle gösterilen kare arası boş kalmasın: aradaki kareler seyrek (3'te 1) önceliklendirilir
      if (this.drawn >= 0 && Math.abs(k - this.drawn) > 3) { const st = k > this.drawn ? -3 : 3; for (let i = k + st, c = 0; c < 8 && (st < 0 ? i > this.drawn : i < this.drawn); i += st, c++) order.push(i); }
      for (let s = 1; s <= Math.max(ahead, behind); s++) { const a = k + d * s, b = k - d * s; if (a >= lo && a <= hi) order.push(a); if (b >= lo && b <= hi) order.push(b); }
      for (const i of order) {
        if (this.pending.size >= 3) break;
        if (this.bmp.has(i) || this.pending.has(i)) continue;
        let src = i;
        if (!this.blobs[i]) { if (i !== k) continue; src = this._nearestBlob(i); if (src < 0 || this.bmp.has(src) || this.pending.has(src)) continue; }
        this._decode(src, lo, hi);
      }
      this.stats.decoded = this.bmp.size; if (this.bmp.size > this.stats.peakDecoded) this.stats.peakDecoded = this.bmp.size;
    }
    // Kare henüz inmediyse: önce hareket yönünün gerisindeki en yakın inmiş kare (en çok 40 kare geri) — ileri sıçrayıp
    // sonra geri dönme olmaz; yoksa en yakın inmiş kare.
    _nearestBlob(i) {
      const d = this.dirSign || 1;
      for (let s = 1; s <= 40; s++) { const j = i - d * s; if (j < 0 || j >= this.n) break; if (this.blobs[j]) return j; }
      for (let s = 1; s < this.n; s++) { if (i - s >= 0 && this.blobs[i - s]) return i - s; if (i + s < this.n && this.blobs[i + s]) return i + s; if (i - s < 0 && i + s >= this.n) break; } return -1;
    }
    _decode(i, lo, hi) {
      this.pending.add(i);
      const p = typeof createImageBitmap === 'function' ? createImageBitmap(this.blobs[i]) : this._imgDecode(this.blobs[i]);
      const td = performance.now();
      p.then((b) => {
        this.pending.delete(i); this.stats.decodes++; if (this.stats.firstDecodeMs == null) this.stats.firstDecodeMs = +(performance.now() - td).toFixed(1);
        if (this._dead) { b.close && b.close(); return; }
        const k = this.want, W = this.winMax;
        if (Math.abs(i - k) > W) { b.close && b.close(); this.stats.evicted++; } else this.bmp.set(i, b);
        this._kick();
      }, () => { this.pending.delete(i); });
    }
    _imgDecode(blob) { const img = new Image(), u = URL.createObjectURL(blob); img.src = u; return img.decode().then(() => { URL.revokeObjectURL(u); return img; }); }
    _debug(k, shown) {
      const s = this.stats;
      this.dbg.textContent = `mv1 ${this.kind} iz:${this.px ? '100svh+' + this.px + 'px' : this.vh + 'vh'} p:${s.p.toFixed(3)} t:${(this.cur / 1000).toFixed(3)}s kare:${k}(kaynak ${this.src ? this.src[k] : '-'}) gösterilen:${shown} sahne:${s.stage} ${STAGE_NAMES[s.stage - 1]}\nyüklenen:${s.loaded}/${this.n} çözülmüş:${s.decoded} (tepe ${s.peakDecoded}) ilk kare:${s.firstFrameMs}ms parçalar:${s.chunkMs.join(',')}ms`;
    }
  }
  customElements.define(TAG, RoninHeroV6);
})();
