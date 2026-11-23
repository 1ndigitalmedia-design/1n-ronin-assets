/*!
 * n1-site-wix-test-v1 — 1N Digital Media · Wix Studio Custom Element TEST PAKETİ (yalnızca Ronin Hero + Header)
 * Referans: v6.47 (değiştirilmedi). Wix ortamında HENÜZ DOĞRULANMADI.
 *
 * Wix Studio → Custom Element:
 *   Kaynak: bu dosyanın HTTPS adresi (Velo public/custom-elements veya harici sunucu)
 *   Etiket (Tag name): n1-site-test
 *   Öznitelikler (Set attributes):
 *     assets-base   Ronin medya klasörünün HTTPS adresi, sonu "/" ile. ZORUNLU (yayınlanınca girilir; uydurma adres yok).
 *     debug         (isteğe bağlı) Wix kapsayıcı tanılama panelini gösterir.
 *     sticky-fix    VARSAYILAN KAPALI. İlk testte EKLENMEZ. Tanılama bir sorun doğrularsa ve ayrıca onaylanırsa
 *                   kullanılır: yalnızca bu bileşenin üst zincirinde overflow hidden/auto/scroll → clip yapar.
 *     header-z      (isteğe bağlı) Header katman sırası; varsayılan 900 (v6.47 ile aynı).
 *
 * Bu dosyanın yapısı:
 *   1) Orijinal v6.47 modülleri — DEĞİŞTİRİLMEDEN gömülü: ronin-hero-v67.js, ronin-type-v613.js, n1-header-v613.js
 *   2) <n1-site-test> uyum katmanı — medya manifestosu, kapsamlı CSS, Header'ı body'ye taşıma, tanılama, temizlik
 * GSAP: bu iki bileşen GSAP kullanmıyor (v6.47 kodunda doğrulandı); bu pakette GSAP yüklenmez.
 *       Tam sayfa aşamasında GSAP 3.13.0 + ScrollTrigger + SplitText tek kez yüklenecek (bkz. ensureGsap, şimdilik çağrılmıyor).
 */

/* ====================================================================================
 * ORİJİNAL MODÜL (v6.47, değiştirilmedi): ronin-hero-v67.js
 * ==================================================================================== */
/*!
 * ronin-hero-v67 — 1N Digital Media · Ronin Ustası (v6.7 test sürümü: görüntü kalitesi)
 * v6.7 farkları (yalnızca görüntü): (1) canvas boyutu karenin gerçek boyutundan alınır — 1920 px kareler 1600'e küçültülüp
 * yeniden büyütülmez; (2) kenar zemini renkleri nitelikle verilebilir: edge-top, edge-mid, edge-bottom (renk düzenlemesine uysun diye).
 * Hareket, kaydırma, takip, yükleme v6.4 ile aynı.
 *
 * v6.4 notu:
 * v6.4 tek fark: masaüstünde sahnenin altında statik bir geçiş katmanı (rh6-fade); sisli alt kenar sayfa zeminine karışır.
 * Nitelik: fade-color (varsayılan #0c0c0d — sonraki bölümün arka plan rengiyle aynı olmalı), fade-height (px; varsayılan clamp(160px,24vh,260px)).
 *
 * v6.3 notu:
 * v6.3 değişiklikleri (yalnızca ilk görüntü): canvas ilk kare çizilene kadar gizli, poster bu sürede görünür;
 * ilk parça (a0) yalnızca 1. sahne + seyrek iskelet; JSON çözme hızlandırıldı. Yerleşim/kaydırma/takip v6.2 ile aynı.
 *
 * v6.2 notu:
 * v6.1'e göre tek fark: bulanık/uzatılmış kenar kopyası (rh6-amb) tamamen kaldırıldı; yerine videonun dışında
 * düz koyu bir sahne zemini ve video kenarında bu zemine yumuşak geçiş (statik katmanlar) var. Video boyutu/konumu v6.1 ile aynıdır.
 * Bağımsız Custom Element (light DOM). v3/v4/v5/v5x dosyalarından ayrıdır; etiket adı da farklıdır.
 *
 * Kaynak: Samuray_Video.mp4 (20,587 sn, 1920×1080, 29,97 fps, 617 kare)
 *   - 24→30 dönüşümünden kalan 119 tekrar kare çıkarıldı, 498 benzersiz kare kendi zaman damgasıyla saklandı.
 *   - Süre, renk ve kamera hareketi değişmedi: kaydırma ilerlemesi önce zamana (ms), sonra o zamana en yakın gerçek kareye çevrilir.
 *
 * Kaydırma: tarayıcının kendi kaydırması kullanılır. Tekerlek/dokunma olayı yakalanmaz, kaydırma kilitlenmez,
 * sahneler arasında otomatik atlama veya zorunlu duraklama yoktur. Aşağı = ileri, yukarı = geri, durunca doğru karede kalır.
 * Takip: X1 (v5x) mantığı — kısa üstel yumuşatma (smooth-ms, varsayılan 30 ms), hedefe varınca tam kareye oturur.
 *
 * Sahneler (gerçek karelerden ölçüldü; kaynak kare no / zaman):
 *   1 Kabzayı kavrar          0–42     0,000–1,401 sn
 *   2 Kılıcı çeker            43–237   1,435–7,908 sn  (Signal_Distortion 136–143 ≈ 4,54–4,77 sn, olduğu gibi)
 *   3 Kınına yerleştirir      238–385  7,941–12,846 sn
 *   4 Kamera döner            386–515  12,880–17,184 sn
 *   5 Yaklaşır / sabit kalır  516–616  17,217–20,554 sn (529'dan sonra neredeyse hareketsiz)
 *
 * Nitelikler:
 *   frames-base   paket/poster adres öneki (sonunda /)
 *   pack-d, pack-m  virgülle ayrılmış parça listesi (.bin veya .json); varsayılan ronin-{d|m}-v63-a0.bin,…-a.bin,…-b.bin
 *   poster-d, poster-m  (poster-fetch: posteri fetch→blob ile yükler; doğrudan medya sunmayan ortamlar için)
 *   scroll-vh     kaydırma izi yüksekliği (vh); varsayılan 400. Aktif kaydırma = iz − 1 ekran yüksekliği
 *   scroll-px     verilirse iz = 1 ekran + N px (aktif kaydırma ekran boyundan bağımsız N px); scroll-vh yerine geçer
 *   height-mode   self (varsayılan) | container (Wix kutusu yüksekliği belirler)
 *   stage-weights beş sahnenin kaydırma payı; varsayılan "9,33,22,27,9"
 *   smooth-ms     varsayılan 30
 *   window-d, window-m  aynı anda çözülmüş tutulacak en fazla kare (varsayılan 24 / 24; tepe = pencere + 6)
 *   accent        varsayılan #A1FF00
 *   slogan, cta-text, cta-href
 *   debug         küçük durum satırı gösterir
 * Olay: "rh6:progress" (detail: {p, t, frame, stage})
 */
(function () {
  'use strict';
  const TAG = 'ronin-hero-v67';
  if (customElements.get(TAG)) return;

  const STAGE_NAMES = ['Kabzayı kavrar', 'Kılıcı çeker', 'Kınına yerleştirir', 'Kamera döner', 'Yaklaşır / sabit'];
  const DEF_STAGES = [0, 1434.767, 7941.267, 12879.533, 17217.2];
  const DEF_WEIGHTS = [9, 33, 22, 27, 9];
  const BG = '#0c0c0d';
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
${TAG}[data-orient="portrait"] .rh6-media canvas.rh6-main,${TAG}[data-orient="portrait"] .rh6-media img{-webkit-mask-image:linear-gradient(to bottom,transparent 0,#000 6%,#000 86%,transparent 100%);mask-image:linear-gradient(to bottom,transparent 0,#000 6%,#000 86%,transparent 100%)}
${TAG} .rh6-debug{position:fixed;z-index:2147483000;left:8px;top:8px;max-width:calc(100vw - 16px);font:11px/1.35 ui-monospace,Menlo,Consolas,monospace;color:#cfe;background:rgba(0,0,0,.8);padding:5px 7px;white-space:pre-wrap;pointer-events:none}
@media (prefers-reduced-motion: reduce){${TAG} .rh6-copy{transition:none;transform:none}}
`;

  class RoninHeroV6 extends HTMLElement {
    connectedCallback() {
      if (this._on) return; this._on = true;
      if (!document.getElementById('rh67-style')) { const s = document.createElement('style'); s.id = 'rh67-style'; s.textContent = css; document.head.appendChild(s); }
      const A = (n, d) => (this.hasAttribute(n) ? this.getAttribute(n) : d);
      const base = A('frames-base', '');
      const accent = A('accent', ''); if (accent) this.style.setProperty('--rh6-accent', accent);
      ['edge-top', 'edge-mid', 'edge-bottom'].forEach((a, i) => { if (this.hasAttribute(a)) this.style.setProperty(`--rh6-e${i + 1}`, this.getAttribute(a)); });
      if (this.hasAttribute('fade-color')) this.style.setProperty('--rh6-fade-c', this.getAttribute('fade-color'));
      if (this.hasAttribute('fade-height')) this.style.setProperty('--rh6-fade-h', parseFloat(this.getAttribute('fade-height')) + 'px');
      if (this.getAttribute('height-mode') === 'container') this.dataset.height = 'container';
      if (this.hasAttribute('scroll-px')) this.setPx(parseFloat(this.getAttribute('scroll-px')) || 600); else this.setVh(parseFloat(A('scroll-vh', '400')) || 400);
      const w = String(A('stage-weights', '')).split(',').map(Number);
      this.weights = w.length === 5 && w.every((x) => x > 0) ? w : DEF_WEIGHTS.slice();
      this.smoothMs = Math.max(0, parseFloat(A('smooth-ms', '30')) || 0);

      this.kind = matchMedia('(max-width: 900px)').matches ? 'm' : 'd';
      this.srcW = this.kind === 'm' ? 960 : 1600; this.srcH = this.kind === 'm' ? 540 : 900;
      this.winMax = parseInt(A(`window-${this.kind}`, this.kind === 'm' ? '24' : '24'), 10) || 24;
      const packs = A(`pack-${this.kind}`, `ronin-${this.kind}-v63-a0.bin,ronin-${this.kind}-v63-a.bin,ronin-${this.kind}-v63-b.bin`).split(',').map((s) => abs(base, s.trim())).filter(Boolean);
      const poster = abs(base, A(`poster-${this.kind}`, `ronin-v6-poster-${this.kind}.webp`));

      this.innerHTML = `<div class="rh6-stage">
  <div class="rh6-media"><img class="rh6-poster" src="${poster}" alt="" fetchpriority="high" decoding="async"><canvas class="rh6-main" aria-hidden="true"></canvas></div>
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
      this._loadAll(packs).catch((e) => { this.stats.err = String((e && e.message) || e); console.warn('[ronin-hero-v63] paket yüklenemedi; poster görünür kalır', e); });
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

    /* ---------- yerleşim: video oranı korunur; masaüstünde en çok %5 yan kırpma, ötesi kırpılmaz ---------- */
    /* ---------- yerleşim ----------
     * Güvenli kırpma sınırları (498 karenin kenar ölçümünden): sol %2, sağ %6, üst %1, alt %3.
     *   üst: kapüşon ve 100. karede kılıç ucu üst kenara değiyor · alt: 4–5. sahnede ayaklar ≈%96'da
     *   sol: 100. karede kabza/el sol kenarda · sağ: kılıç ucu en çok x≈%93 (bozulma kareleri hariç)
     * Video bu sınırlar içinde olabildiğince büyütülür (yatay/dikey esnetme yok, oran sabit 16:9).
     * Kaynakta olmayan görüntü üretilmez: ekran 16:9'dan genişse kalan alan düz koyu zemindir (aşağıya bakın). */
    _layout() {
      const W = this.stage.clientWidth, H = this.stage.clientHeight; if (!W || !H) return;
      const ar = 16 / 9, portrait = W / H < 1.2 || W <= 900;
      this.dataset.orient = portrait ? 'portrait' : 'landscape';
      const saT = this.sa ? parseFloat(getComputedStyle(this.sa).paddingTop) || 0 : 0;
      const topOff = (parseFloat(this.getAttribute('top-offset')) || 0) + saT;  // Wix sabit header yüksekliği + iPhone çentiği
      let vw, vh, vx, vy, amb = '';
      if (!portrait) {
        const L = 0.02, R = 0.06, T = 0.01, B = 0.03, H2 = H - topOff;
        vw = Math.min(Math.max(W, H2 * ar), W / (1 - L - R), (H2 / (1 - T - B)) * ar); vh = vw / ar;
        const ox = vw - W, oy = vh - H2;
        vx = ox > 0 ? -clamp(ox / 2, ox - R * vw, L * vw) : -ox / 2;
        vy = topOff + (oy > 0 ? -clamp(oy / 2, oy - B * vh, T * vh) : -oy / 2);
        if (ox < -1) amb = 'x'; else if (oy < -1) amb = 'y';
        // güvenli alan: videonun x %69–%95, y %58–%88 bölgesi (beş sahnede de karakter/kılıç yok); ekran içinde tutulur
        const cx = clamp(vx + vw * 0.69, 24, W - 260), cw = Math.max(Math.min(vw * 0.26, W - cx - 24), 220);
        Object.assign(this.copy.style, { left: cx + 'px', top: Math.max(vy + vh * 0.58, topOff) + 'px', width: cw + 'px', bottom: 'auto', right: 'auto' });
      } else {
        // dar ekran: 16:9 kadraj kırpılmadan tam genişlikte, sahnenin üstünden başlar; yazı hemen altında.
        // v6'daki dikey ortalama ve 56 px alt sınır kaldırıldı (üst boşluğun gerçek nedeni buydu).
        vw = W; vh = W / ar; vx = 0; vy = topOff + Math.round(Math.min(Math.max(W * 0.03, 8), 20));
        Object.assign(this.copy.style, { left: '20px', right: '20px', width: 'auto', top: vy + vh + Math.round(clamp(W * 0.06, 18, 32)) + 'px', bottom: 'auto' });
      }
      for (const el of [this.canvas, this.poster]) Object.assign(el.style, { left: vx + 'px', top: vy + 'px', width: vw + 'px', height: vh + 'px' });
      // Videonun dışında kalan alan: yalnızca düz koyu zemin (sahne arka planı). Video kenarı, kendi genişliğinin %12'si (üst/alt %5)
      // boyunca bu zemine yumuşakça geçer. Katmanlar statiktir; kare değiştikçe yeniden çizilmez. Videonun pikselleri kopyalanmaz.
      const [eL, eR, eT, eB] = this.edges, fx = Math.round(vw * 0.12), fy = Math.round(vh * 0.05);
      const box = (el, l, t, w, h, solid) => { Object.assign(el.style, { left: l + 'px', top: t + 'px', width: w + 'px', height: h + 'px', display: '' }); el.style.setProperty('--rh6-solid', solid + 'px'); };
      const hide = (el) => (el.style.display = 'none');
      if (amb === 'x') { const bw = Math.ceil(vx); box(eL, 0, 0, bw + fx, H, bw); box(eR, Math.floor(vx + vw) - fx, 0, W - Math.floor(vx + vw) + fx, H, W - Math.floor(vx + vw)); hide(eT); hide(eB); }
      else if (amb === 'y') { const bh = Math.ceil(vy); box(eT, 0, 0, W, bh + fy, bh); box(eB, 0, Math.floor(vy + vh) - fy, W, H - Math.floor(vy + vh) + fy, H - Math.floor(vy + vh)); hide(eL); hide(eR); }
      if (amb) this.dataset.edge = amb; else delete this.dataset.edge;
      delete this.dataset.amb;
      this.rect = { vx, vy, vw, vh, W, H, topOff, amb };
    }

    /* ---------- paket yükleme (parça parça, akışla) ---------- */
    async _loadAll(urls) {
      for (const u of urls) { if (this._dead) return; await this._loadPack(u); this.stats.chunkMs.push(Math.round(performance.now() - this.stats.t0)); }
    }
    _initHead(h) {
      if (!this.times) {
        this.n = h.count; this.times = h.times; this.tmax = h.times[h.times.length - 1]; this.src = h.src;
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
      const w = this.weights, S = w.reduce((a, b) => a + b, 0), tb = this.stages.concat([this.tmax || 20553.9]);
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
      this.dbg.textContent = `v6 ${this.kind} iz:${this.px ? '100svh+' + this.px + 'px' : this.vh + 'vh'} p:${s.p.toFixed(3)} t:${(this.cur / 1000).toFixed(3)}s kare:${k}(kaynak ${this.src ? this.src[k] : '-'}) gösterilen:${shown} sahne:${s.stage} ${STAGE_NAMES[s.stage - 1]}\nyüklenen:${s.loaded}/${this.n} çözülmüş:${s.decoded} (tepe ${s.peakDecoded}) ilk kare:${s.firstFrameMs}ms parçalar:${s.chunkMs.join(',')}ms`;
    }
  }
  customElements.define(TAG, RoninHeroV6);
})();

/* ====================================================================================
 * ORİJİNAL MODÜL (v6.47, değiştirilmedi): ronin-type-v613.js
 * ==================================================================================== */
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

/* ====================================================================================
 * ORİJİNAL MODÜL (v6.47, değiştirilmedi): n1-header-v613.js
 * ==================================================================================== */
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
      { title: 'Projeler', note: 'Seçili işler', sub: [{ text: 'Seçili İşler' }, { text: 'Marka Hikâyeleri' }, { text: 'Creative Showcase' }] },
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

/* ====================================================================================
 * <n1-site-test> — Wix Studio uyum katmanı (yeni)
 * ==================================================================================== */
(function () {
  'use strict';
  var TAG = 'n1-site-test';
  if (customElements.get(TAG)) return;

  /* ---------- 1) Ayarlar ---------- */
  var CONFIG = {
    // Medya klasörünün adresi. Boş bırakıldı: henüz yayınlanmadı. Wix'te "assets-base" özniteliği bunun yerine geçer.
    ASSETS_BASE: '',
    HERO_ID: 'n1-hero',             // v6.47'de 'hero'; Wix sayfasındaki olası çakışmayı önlemek için ayrı ad
    HEADER_Z: 900                   // v6.47 ile aynı
  };

  /* ---------- 2) Medya manifestosu (dosya adları; adres = assets-base + ad) ---------- */
  // Kareler v6.47 ile bayt bayt aynı (.json yerine base64'süz .bin; Ronin kodu ikisini de okur).
  var MEDIA = {
    ronin: {
      Bx: { packs: ['ronin-Bx-v67-a0.bin', 'ronin-Bx-v67-a.bin', 'ronin-Bx-v67-b.bin'], poster: 'ronin-v67-poster-Bx.webp' },  // 1920 px, B tonu
      Bd: { packs: ['ronin-Bd-v67-a0.bin', 'ronin-Bd-v67-a.bin', 'ronin-Bd-v67-b.bin'], poster: 'ronin-v67-poster-Bd.webp' },  // 1600 px, B tonu
      m:  { packs: ['ronin-m-v63-a0.bin', 'ronin-m-v63-a.bin', 'ronin-m-v63-b.bin'],   poster: 'ronin-v6-poster-m.webp' }       // mobil (v6.3, değişmedi)
    }
  };

  /* ---------- 3) Header içeriği (v6.47'den birebir) ---------- */
  var LOGO = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxNDQ4IDE0NDgiIHdpZHRoPSIxNDQ4LjBwdCIgaGVpZ2h0PSIxNDQ4LjBwdCI+CjxwYXRoIGQ9Ik0gMC4wMCAwLjAwIEwgMTQ0OC4wMCAwLjAwIEwgMTQ0OC4wMCAxNDQ4LjAwIEwgMC4wMCAxNDQ4LjAwIEwgMC4wMCAwLjAwIFoiIGZpbGw9IiNhMmZmMDAiIC8+CjxwYXRoIGQ9Ik0gODY1Ljk5IDQzNy44OSBDIDg4Mi4yOSA0MzkuNDIgODk4LjI0IDQ0MS43NiA5MTMuOTggNDQ2LjM1IEMgOTMzLjU2IDQ1MS45OSA5NTIuMzIgNDYwLjI0IDk2OS4wMCA0NzIuMDQgQyA5ODEuMjYgNDgwLjgyIDk5Mi40NSA0OTEuMjQgMTAwMS44NiA1MDMuMDUgQyAxMDE0LjI0IDUxOC41MSAxMDIzLjc1IDUzNi41MyAxMDMwLjY2IDU1NS4wNCBDIDEwNDMuNjkgNTkwLjM2IDEwNDcuOTAgNjI2LjU3IDEwNDguODggNjY0LjAwIEMgMTA0OS4wNCA2NzMuNjYgMTA0OC45NiA2ODMuMzMgMTA0OC45NSA2OTMuMDAgQyAxMDQ4LjkxIDc5OS4zMyAxMDQ4Ljk2IDkwNS42NiAxMDQ4LjkwIDEwMTEuOTkgQyA5OTMuMjkgMTAxMS45NSA5MzcuNjcgMTAxMS45MyA4ODIuMDYgMTAxMi4wMiBDIDg4MS44MSA5MDIuNjggODgyLjAxIDc5My4zNCA4ODEuOTYgNjg0LjAwIEMgODgxLjg3IDY2Ni4wOCA4ODIuNjAgNjQ2LjU4IDg3OC45MCA2MjkuMDEgQyA4NzYuMDYgNjE2Ljg2IDg3MC41MyA2MDQuMjAgODYwLjEzIDU5Ni42OCBDIDg0OS44NCA1ODkuMDAgODM2LjM2IDU4Ny43MyA4MjMuOTkgNTg5LjU2IEMgODE1LjM5IDU5MC42NCA4MDguNDkgNTk1LjUyIDgwMi40OCA2MDEuNDggQyA3OTMuNjggNjEwLjM3IDc4Ny4zMSA2MjEuNzYgNzgyLjAwIDYzMy4wMCBDIDc3NS40MyA2NDcuMjUgNzY5Ljg2IDY2MS44OCA3NjQuNTggNjc2LjY1IEMgNzUyLjkwIDcwOS43MCA3NDIuOTcgNzQzLjQ2IDczMi44MSA3NzcuMDIgQyA3MTkuOTIgODIwLjM2IDcwNi45MyA4NjMuNjggNjkzLjk0IDkwNy4wMCBDIDY4My41NCA5NDEuNzkgNjczLjIyIDk3Ni42OSA2NjIuNTkgMTAxMS40MCBDIDY1Ny43MyAxMDExLjU2IDY1Mi44NiAxMDExLjUwIDY0OC4wMCAxMDExLjUzIEMgNTg1LjAxIDEwMTEuNTYgNTIyLjAyIDEwMTEuNTkgNDU5LjA0IDEwMTEuNDggQyA0NTYuNTcgOTg5LjMzIDQ1NC43NCA5NjcuMTIgNDUyLjAwIDk0NS4wMCBDIDQ1MC41NSA5MzEuMTMgNDQ4LjY3IDkxNy4zMSA0NDcuNDUgOTAzLjQzIEMgNDQ1LjEzIDg4MC4yNiA0NDIuNTQgODU3LjEyIDQzOS45NyA4MzMuOTggQyA0MzUuMDAgNzg2LjY0IDQyOS43OSA3MzkuMzcgNDI0Ljc3IDY5Mi4wMCBDIDQyMC44MCA2NTYuNjcgNDE3LjI5IDYyMS4zMCA0MTMuMTIgNTg1Ljk5IEMgNDA4LjY1IDU0MC4zNCA0MDMuMjEgNDk0LjgwIDM5OC43MSA0NDkuMTUgQyA0NTEuNzYgNDQ5LjAxIDUwNC44MiA0NDkuMDYgNTU3Ljg4IDQ0OS4wOCBDIDU1OC43MSA0NjMuODQgNTYwLjU4IDQ3OC4yMyA1NjIuMjAgNDkzLjAwIEMgNTY2LjQ4IDUzMC42NSA1NzAuMTUgNTY4LjM1IDU3NC4zNCA2MDYuMDEgQyA1NzguNzUgNjQ4LjMyIDU4My41MiA2OTAuNTggNTg3Ljk5IDczMi44OSBMIDU4OS43NCA3MzIuODMgQyA2MDIuMTIgNjkzLjk3IDYxNC4wMCA2NTUuMDYgNjI4Ljc3IDYxNy4wMSBDIDY0MC41NCA1ODYuNDggNjU0LjIzIDU1NS42MSA2NzEuNzMgNTI3LjkxIEMgNjgxLjc1IDUxMi4wNSA2OTIuNjQgNDk3LjI1IDcwNi40MCA0ODQuNDAgQyA3MzAuMjkgNDYxLjg0IDc2MC43MiA0NDYuNzggNzkyLjk5IDQ0MC44NSBDIDgxNy4xMSA0MzYuMjQgODQxLjU4IDQzNS42OCA4NjUuOTkgNDM3Ljg5IFoiIGZpbGw9IiMxYjFiMWIiIC8+Cjwvc3ZnPg==";
  var MENU = {
    "brand": {
      "text": "1N Digital Media",
      "note": "Başlangıca dön",
      "href": "#ust"
    },
    "items": [
      {
        "title": "Kısaca Biz",
        "note": "Stüdyo",
        "match": "#hakkimizda",
        "sub": [
          {
            "text": "Stüdyo Hikâyesi",
            "href": "/studyo-hikayesi"
          },
          {
            "text": "Yaratıcı Bakışımız",
            "href": "/yaratici-bakisimiz"
          },
          {
            "text": "Çalışma Ritmimiz",
            "href": "/calisma-ritmimiz"
          }
        ]
      },
      {
        "title": "Hizmetler",
        "note": "6 disiplin",
        "match": "#hizmetler",
        "sub": [
          {
            "text": "Kreatif Stüdyo",
            "href": "/kreatif-studyo"
          },
          {
            "text": "Marka Deneyimi",
            "href": "/marka-deneyimi"
          },
          {
            "text": "Dijital Performans",
            "href": "/dijital-performans"
          },
          {
            "text": "Sosyal Medya & İçerik",
            "href": "/sosyal-medya-icerik"
          },
          {
            "text": "Web & E-Ticaret",
            "href": "/web-e-ticaret"
          },
          {
            "text": "Yapay Zekâ & İnovasyon",
            "href": "/yapay-zeka-inovasyon"
          }
        ]
      },
      {
        "title": "Projeler",
        "note": "Seçili işler",
        "match": "#isler",
        "sub": [
          {
            "text": "Seçili İşler",
            "href": "/secili-isler"
          },
          {
            "text": "Marka Hikâyeleri",
            "href": "/marka-hikayeleri"
          },
          {
            "text": "Creative Showcase",
            "href": "/creative-showcase"
          }
        ]
      },
      {
        "title": "Akademi",
        "note": "Workshops",
        "sub": [
          {
            "text": "1N Academy",
            "href": "/reklam-ajansi"
          },
          {
            "text": "Workshops",
            "href": "/workshops"
          },
          {
            "text": "İçgörüler",
            "href": "/icgoruler"
          }
        ]
      },
      {
        "title": "İletişim",
        "note": "Birlikte üretelim",
        "match": "#iletisim",
        "sub": [
          {
            "text": "Birlikte Üretelim",
            "href": "/iletisim"
          },
          {
            "text": "Teklif Al",
            "href": "/teklif-al"
          }
        ]
      },
      {
        "title": "İnsan Kaynakları",
        "note": "Ekibe katıl",
        "sub": [
          {
            "text": "Ekibimize Katıl",
            "href": "/ekibimize-katil"
          },
          {
            "text": "Açık Pozisyonlar",
            "href": "/acik-pozisyonlar"
          }
        ]
      }
    ]
  };

  /* ---------- 4) Kapsamlı CSS ----------
   * v6.47 index.html genel kuralları (*, html, body, a, :focus-visible, img) Wix sayfasına sızmasın diye yalnızca
   * bu bileşenin kökü, body'ye taşınan Header ve menü paneli altında uygulanır. :where() özgüllüğü 0 tutar →
   * orijinal kuralların özgüllüğüyle aynı; bileşenlerin kendi kuralları eskisi gibi baskın kalır.
   * html/body'ye HİÇBİR kural yazılmaz. Sayfa zemini Wix'te ayarlanır (#080A09). */
  var SCOPE = ':where(n1-site-test, n1-header[data-n1-owner], .n1h-panel[data-n1-owner])';
  var CSS = [
    'n1-site-test{display:block;position:relative;width:100%;margin:0;padding:0;',
    '  --bg:#080A09;--bg-2:transparent;--ink:#eeede8;--mute:#8e8f89;--line:#232325;--accent:#A1FF00;--pad:clamp(20px,4.5vw,72px);',
    '  color-scheme:dark;background:#080A09;color:#eeede8;font:400 17px/1.6 Barlow,Arial,sans-serif;-webkit-font-smoothing:antialiased;',
    '  overflow-x:clip}',                                                     /* v6.47: body{overflow-x:clip} — clip, sticky'yi bozmaz */
    'n1-header[data-n1-owner],.n1h-panel[data-n1-owner]{color-scheme:dark;font-size:17px;line-height:1.6;-webkit-font-smoothing:antialiased}',
    '.n1h-panel[data-n1-owner]{font-family:Barlow,Arial,sans-serif;color:#eeede8}', /* v6.47'de panel bu değerleri body'den alıyordu */
    /* v6.47 :root{--site-w:90%} ve :root{--n1-accent:#A8CF62} — html yerine bileşen köklerine */
    'n1-site-test,n1-header[data-n1-owner],.n1h-panel[data-n1-owner]{--site-w:90%;--n1-accent:#A8CF62}',
    /* v6.47 *{box-sizing:border-box;min-width:0}. Wix'in genel kurallarına yenilmesin diye burada özgüllük bilerek
       sıfırlanmadı (bileşenlerin hiçbiri farklı bir box-sizing kullanmıyor; değer v6.47 ile aynı). */
    'n1-site-test,n1-site-test *,n1-header[data-n1-owner],n1-header[data-n1-owner] *,.n1h-panel[data-n1-owner],.n1h-panel[data-n1-owner] *{box-sizing:border-box;min-width:0}',
    /* v6.47: masaüstünde hero yazıları ronin-type katmanından gelir; Ronin'in eski slogan/CTA katmanı gizli (mobil değişmez) */
    '@media (min-width:901px){n1-site-test ronin-hero-v67 .rh6-copy{display:none!important}}',
    SCOPE + ' a{color:inherit}',
    SCOPE + ' :focus-visible{outline:2px solid #A1FF00;outline-offset:3px}',
    SCOPE + ' img{display:block;max-width:100%}',
    '.n1st-note{margin:0;padding:28px 5%;font:400 14px/1.5 Barlow,Arial,sans-serif;color:#8e8f89;border-bottom:1px solid #232325}',
    '.n1st-diag{position:fixed;z-index:2147483001;right:8px;bottom:8px;max-width:min(560px,calc(100vw - 16px));max-height:60vh;overflow:auto;',
    '  font:11px/1.4 ui-monospace,Menlo,Consolas,monospace;color:#cfe;background:rgba(0,0,0,.86);padding:8px 10px;white-space:pre-wrap;pointer-events:auto}'
  ].join('\n');

  var FONTS_HREF = 'https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@500;600;700&display=swap';

  function ensureHead() {
    if (!document.getElementById('n1st-style')) {
      var s = document.createElement('style'); s.id = 'n1st-style'; s.textContent = CSS; document.head.appendChild(s);
    }
    if (!document.querySelector('link[data-n1st-fonts],link[href*="family=Barlow"]')) {
      ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'].forEach(function (u, i) {
        var p = document.createElement('link'); p.rel = 'preconnect'; p.href = u; if (i) p.crossOrigin = ''; p.setAttribute('data-n1st-fonts', ''); document.head.appendChild(p);
      });
      var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = FONTS_HREF; l.setAttribute('data-n1st-fonts', ''); document.head.appendChild(l);
    }
  }

  /* GSAP — tam sayfa aşaması için hazır; bu test paketinde çağrılmaz. Sayfada zaten varsa tekrar yüklemez. */
  function ensureGsap() {
    if (window.gsap && window.ScrollTrigger) return Promise.resolve(window.gsap);
    var base = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/';
    var files = window.gsap ? ['ScrollTrigger.min.js', 'SplitText.min.js'] : ['gsap.min.js', 'ScrollTrigger.min.js', 'SplitText.min.js'];
    return files.reduce(function (p, f) {
      return p.then(function () { return new Promise(function (res, rej) {
        var sc = document.createElement('script'); sc.src = base + f; sc.onload = res; sc.onerror = rej; document.head.appendChild(sc); }); });
    }, Promise.resolve()).then(function () { window.gsap.registerPlugin(window.ScrollTrigger, window.SplitText); return window.gsap; });
  }

  /* n1-header (orijinal, değiştirilmedi) <head>'e #n1h-style ekliyor; içinde genel bir `.site-container{…}` kuralı var.
     Wix sayfasında bu sınıfı kullanan başka öğeleri etkilemesin diye, yalnızca bu test paketinde, kural
     `n1-header[data-n1-owner] .site-container{…}` olarak daraltılır. Header'ın kendi çubuğu bu sınıfı kullandığı için
     Header'da hiçbir şey değişmez. Bir kez yapılır; kural bulunamazsa dokunulmaz ve konsola not düşülür. */
  function scopeHeaderCss() {
    var st = document.getElementById('n1h-style');
    if (!st || st.getAttribute('data-n1st-scoped') === '1') return;
    var t = st.textContent, from = '.site-container{', to = 'n1-header[data-n1-owner] .site-container{';
    var n = t.split(from).length - 1;
    if (n === 1 && t.indexOf(to) < 0) { st.textContent = t.replace(from, to); st.setAttribute('data-n1st-scoped', '1'); }
    else { try { console.warn('[n1-site-test] .site-container kuralı beklenen biçimde bulunamadı (' + n + '); dokunulmadı'); } catch (e) {} }
  }

  var live = 0;

  class N1SiteTest extends HTMLElement {
    static get observedAttributes() { return ['assets-base', 'debug', 'sticky-fix']; }

    connectedCallback() {
      if (this._on) return; this._on = true; live++;
      ensureHead();
      this._mountHeader();
      this._mountHero();
      // tanılama: yalnızca boyut değişince (ResizeObserver) + yükleme sonunda bir kez; sürekli döngü yok
      this._diagQueued = false;
      this._ro = new ResizeObserver(() => this._queueDiag()); this._ro.observe(this);
      if (this.parentElement) this._ro.observe(this.parentElement);
      this._onLoad = () => this._queueDiag(); addEventListener('load', this._onLoad, { once: true });
      this._queueDiag();
    }

    disconnectedCallback() {
      this._on = false; live = Math.max(0, live - 1);
      if (this._ro) this._ro.disconnect();
      removeEventListener('load', this._onLoad);
      cancelAnimationFrame(this._diagRaf);
      // Header body'deydi: kaldırılınca kendi disconnectedCallback'i dinleyicilerini ve panelini temizler
      if (this._header) { this._header.remove(); this._header = null; }
      this._unmountHero();
      this._restoreSticky();
      if (this._diagEl) { this._diagEl.remove(); this._diagEl = null; }
      if (!live) { var s = document.getElementById('n1st-style'); s && s.remove(); }
    }

    attributeChangedCallback(name, oldV, newV) {
      if (!this._on || oldV === newV) return;
      if (name === 'assets-base') this._mountHero();
      else this._queueDiag();
    }

    /* Header: Wix kapsayıcılarındaki transform/overflow/z-index etkilenmesin diye doğrudan body'ye eklenir
       (v6.47'de de body'nin doğrudan çocuğuydu; menü paneli zaten body'ye taşınıyor). Tek kopya garanti. */
    _mountHeader() {
      document.querySelectorAll('n1-header[data-n1-owner="' + TAG + '"]').forEach(function (h) { h.remove(); });
      var h = document.createElement('n1-header');
      h.setAttribute('data-n1-owner', TAG);
      h.setAttribute('logo', LOGO);
      h.setAttribute('cta-text', 'Teklif Al');
      h.setAttribute('cta-href', (window.N1_ROUTES && window.N1_ROUTES['teklif-al']) || '/teklif-al');
      // 'accent' özniteliği bilerek VERİLMEDİ: n1-header bu öznitelikle html'e --n1-accent yazıyor (Wix sayfasına sızar).
      // Aynı değer (#A8CF62) kapsamlı CSS'te n1-header[data-n1-owner], panel ve bileşen köküne tanımlı → görünüm aynı.
      var z = parseInt(this.getAttribute('header-z'), 10) || CONFIG.HEADER_Z;
      if (z !== 900) h.style.zIndex = String(z);
      var js = document.createElement('script'); js.type = 'application/json'; js.textContent = JSON.stringify(MENU);
      h.appendChild(js);
      document.body.appendChild(h);              // n1-header burada bağlanır ve paneli body'ye ekler
      scopeHeaderCss();                          // Header'ın genel .site-container kuralını yalnızca kendi içine sınırla
      var self = this;
      requestAnimationFrame(function () {
        if (h.panel) { h.panel.setAttribute('data-n1-owner', TAG); if (z !== 900) h.panel.style.zIndex = String(z + 1); }
      });
      this._header = h;
    }

    _assetsBase() {
      var b = (this.getAttribute('assets-base') || CONFIG.ASSETS_BASE || '').trim();
      if (b && !/\/$/.test(b)) b += '/';
      return b;
    }

    _unmountHero() {
      if (this._type) { this._type.remove(); this._type = null; }
      if (this._hero) { this._hero.remove(); this._hero = null; }
      if (this._note) { this._note.remove(); this._note = null; }
    }

    /* Ronin: v6.47 index.html'deki oluşturma betiğiyle aynı öznitelikler; yalnızca id, paket biçimi (.bin) ve
       poster yükleme yolu (doğrudan <img>) Wix için ayarlandı. */
    _mountHero() {
      var base = this._assetsBase();
      if (this._hero && this._heroBase === base) return;
      this._unmountHero();
      this._heroBase = base;
      if (!base) {
        var n = this._note = document.createElement('p'); n.className = 'n1st-note';
        n.textContent = 'Ronin Hero medya adresi tanımlanmadı (assets-base). Medya yayınlanınca Custom Element özniteliği olarak girilecek.';
        this.appendChild(n); return;
      }
      var tier = innerWidth * (devicePixelRatio || 1) > 1700 ? 'x' : 'd';
      var D = tier === 'x' ? MEDIA.ronin.Bx : MEDIA.ronin.Bd, M = MEDIA.ronin.m;
      var el = document.createElement('ronin-hero-v67');
      var at = {
        id: CONFIG.HERO_ID, 'frames-base': base, 'fade-color': '#080A09', 'scroll-vh': '300', 'stage-weights': '9,33,22,27,9', 'smooth-ms': '30',
        accent: matchMedia('(max-width: 900px)').matches ? '#A1FF00' : '#93C25A', 'cta-href': '#iletisim',
        'edge-top': '#040404', 'edge-mid': '#080808', 'edge-bottom': '#101010',
        'pack-d': D.packs.join(','), 'poster-d': D.poster, 'pack-m': M.packs.join(','), 'poster-m': M.poster
      };
      for (var k in at) el.setAttribute(k, at[k]);
      el.dataset.fogMid = '0';
      this.appendChild(el); this._hero = el;
      var t = document.createElement('ronin-type'); t.setAttribute('for', CONFIG.HERO_ID);
      this.appendChild(t); this._type = t;
      window.__tier = tier;
    }

    /* ---------- Wix kapsayıcı tanılaması ----------
     * Sticky'yi bozan: üst öğede overflow hidden/auto/scroll (clip bozmaz).
     * Fixed'i etkileyen: transform/filter/perspective/contain (Header body'de olduğu için Header'ı etkilemez; bilgi amaçlı).
     * Yükseklik: bileşen ile doğrudan kapsayıcısı arasındaki fark (boşluk veya kesilme belirtisi). */
    _queueDiag() {
      if (this._diagQueued) return; this._diagQueued = true;
      this._diagRaf = requestAnimationFrame(() => { this._diagQueued = false; this._diagnose(); });
    }

    _diagnose() {
      if (!this._on) return;
      var out = { selfH: Math.round(this.getBoundingClientRect().height), expectedH: this._hero ? Math.round(innerHeight * 3) : null, parentH: null, sticky: [], fixedCtx: [], clipped: [] };
      var p = this.parentElement;
      if (p) out.parentH = Math.round(p.getBoundingClientRect().height);
      var selfH = out.selfH;
      for (var a = this.parentElement; a && a !== document.documentElement; a = a.parentElement) {
        var cs = getComputedStyle(a), name = a.tagName.toLowerCase() + (a.id ? '#' + a.id : '') + (a.className && typeof a.className === 'string' ? '.' + a.className.trim().split(/\s+/).slice(0, 2).join('.') : '');
        if (/(hidden|auto|scroll)/.test(cs.overflowX + ' ' + cs.overflowY)) out.sticky.push(name + ' overflow:' + cs.overflowX + '/' + cs.overflowY);
        if ((cs.transform && cs.transform !== 'none') || (cs.filter && cs.filter !== 'none') || (cs.perspective && cs.perspective !== 'none') || /paint|layout|strict|content/.test(cs.contain || ''))
          out.fixedCtx.push(name + ' transform/filter/contain');
        var h = a.getBoundingClientRect().height;
        if (h + 1 < selfH && /(hidden|clip)/.test(cs.overflowY)) out.clipped.push(name + ' yükseklik ' + Math.round(h) + ' < ' + selfH);
      }
      // Tanılama yalnızca okur; hiçbir Wix öğesini değiştirmez. Müdahale sadece 'sticky-fix' özniteliği AÇIKÇA verilirse.
      if (this.hasAttribute('sticky-fix') && !(this._stickyFixed && this._stickyFixed.length)) this._applySticky();
      this.diag = out;
      window.__n1SiteTestDiag = out;
      var key = JSON.stringify(out);
      if (key !== this._lastDiag) { this._lastDiag = key; try { console.info('[n1-site-test] tanılama', out); } catch (e) {} }
      if (this.hasAttribute('debug')) {
        if (!this._diagEl) { this._diagEl = document.createElement('div'); this._diagEl.className = 'n1st-diag'; document.body.appendChild(this._diagEl); }
        this._diagEl.textContent = 'n1-site-test tanılama\n' +
          'bileşen yüksekliği: ' + out.selfH + ' px' + (out.expectedH ? ' (beklenen ≈ ' + out.expectedH + ')' : '') + '\n' +
          'kapsayıcı yüksekliği: ' + out.parentH + ' px' + (out.parentH != null && Math.abs(out.parentH - out.selfH) > 2 ? '  ⚠ fark ' + (out.parentH - out.selfH) + ' px' : '  ✓') + '\n' +
          'sticky\'yi bozabilecek üst öğe: ' + (out.sticky.length ? '\n  ⚠ ' + out.sticky.join('\n  ⚠ ') : 'yok ✓') + '\n' +
          'kesen üst öğe: ' + (out.clipped.length ? '\n  ⚠ ' + out.clipped.join('\n  ⚠ ') : 'yok ✓') + '\n' +
          'transform/filter içeren üst öğe: ' + (out.fixedCtx.length ? out.fixedCtx.length + ' (Header body\'de, etkilenmez)' : 'yok') +
          (this._stickyFixed && this._stickyFixed.length ? '\nsticky-fix uygulandı: ' + this._stickyFixed.length + ' öğe' : '');
      } else if (this._diagEl) { this._diagEl.remove(); this._diagEl = null; }
    }

    /* İsteğe bağlı (sticky-fix): yalnızca bu bileşenin üst zincirinde overflow hidden/auto/scroll → clip.
       Kırpma davranışı korunur, kaydırma kabı oluşmaz; eski satır içi değerler kaldırılınca geri yüklenir. */
    _applySticky() {
      this._stickyFixed = this._stickyFixed || [];
      for (var a = this.parentElement; a && a !== document.body && a !== document.documentElement; a = a.parentElement) {
        var cs = getComputedStyle(a);
        ['overflowX', 'overflowY'].forEach((prop) => {
          if (/(hidden|auto|scroll)/.test(cs[prop])) {
            this._stickyFixed.push([a, prop, a.style[prop]]);
            a.style[prop] = 'clip';
          }
        });
      }
    }
    _restoreSticky() {
      (this._stickyFixed || []).forEach(function (r) { r[0].style[r[1]] = r[2]; });
      this._stickyFixed = [];
    }
  }

  customElements.define(TAG, N1SiteTest);
  window.N1SiteTest = { config: CONFIG, media: MEDIA, ensureGsap: ensureGsap };
})();
