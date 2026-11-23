/* 1N Digital Media — FloatingControls (v6.31, v6.32: tıklanabilir içerikten kaçınma)
 * <n1-floating-controls> : Yukarı Çık + WhatsApp sabit kontrol sistemi.
 *
 * - Görsel dil header butonlarıyla aynı aile: 10px köşe, 1px ince çizgi, koyu yarı saydam yüzey, soft yeşil vurgu.
 * - Yeni kütüphane yok: sayfadaki GSAP 3.13 kullanılır (yoksa CSS'e düşer).
 * - Kaydırma motoruna dokunmaz: yukarı çıkış, tarayıcının kendi kaydırma konumunu GSAP ile adım adım
 *   küçültür (window.scrollTo). Ronin Hero ve ScrollTrigger yalnızca normal 'scroll' olaylarını görür.
 *   Kullanıcı tekerlek / dokunma / tuş / tıklama ile araya girerse çıkış anında bırakılır.
 * - Wix Studio: fixed konumlu katman document.body'ye taşınır (transform'lu kapsayıcıların içinde
 *   fixed bozulmasın). Bileşen kaldırıldığında katman, dinleyiciler ve animasyonlar temizlenir.
 *
 * Nitelikler:
 *   whatsapp-href   WhatsApp bağlantısı (zorunlu bağlantı aynen verilir)
 *   show-after      Yukarı Çık'ın görüneceği kaydırma mesafesi, ekran yüksekliği cinsinden (vars. 1)
 *   label           WhatsApp hover etiketi (vars. WHATSAPP'TAN YAZ)
 */
(function () {
  'use strict';
  const TAG = 'n1-floating-controls';
  if (customElements.get(TAG)) return;
  const EASE = 'cubic-bezier(.22,1,.36,1)';

  const CSS = `
.n1fc{position:fixed;z-index:880;right:var(--n1fc-x,5vw);bottom:var(--n1fc-y,clamp(22px,3.6vh,40px));display:flex;flex-direction:column;align-items:flex-end;gap:10px;pointer-events:none;
  font-family:Barlow,"Helvetica Neue",Arial,sans-serif;transition:opacity .4s ease,visibility 0s linear .4s}
.n1fc[data-hidden],.n1fc[data-dodge]{opacity:0;visibility:hidden}
.n1fc:not([data-hidden]){transition:opacity .4s ease,visibility 0s}
.n1fc-row{position:relative;display:flex;align-items:center;justify-content:flex-end}
.n1fc-btn{position:relative;display:grid;place-items:center;width:var(--n1fc-s,52px);height:var(--n1fc-s,52px);padding:0;margin:0;border-radius:10px;cursor:pointer;pointer-events:auto;
  color:#e4e3dd;background:rgba(12,14,13,.62);border:1px solid rgba(228,227,221,.12);text-decoration:none;outline:none;
  -webkit-backdrop-filter:blur(10px) saturate(115%);backdrop-filter:blur(10px) saturate(115%);
  transition:background-color .35s ease,border-color .35s ease,color .35s ease;-webkit-tap-highlight-color:transparent}
.n1fc-btn:hover,.n1fc-btn:focus-visible{background:rgba(20,23,21,.78);border-color:rgba(228,227,221,.22);color:#f3f2ec}
.n1fc-btn:focus-visible{box-shadow:0 0 0 1px #0A0B0B,0 0 0 2px rgba(168,207,98,.75)}
.n1fc-btn svg{display:block;overflow:visible}
/* Yukarı Çık: kenar boyunca ilerleme çizgisi + maskelenmiş ok */
.n1fc-top{transition:background-color .35s ease,border-color .35s ease,color .35s ease,opacity .45s ${EASE},transform .55s ${EASE},visibility 0s linear .45s;
  opacity:0;transform:translateY(14px);visibility:hidden}
.n1fc-top[data-on]{opacity:1;transform:none;visibility:visible;transition:background-color .35s ease,border-color .35s ease,color .35s ease,opacity .45s ${EASE},transform .55s ${EASE},visibility 0s}
.n1fc-ring{position:absolute;inset:-1px;width:calc(100% + 2px);height:calc(100% + 2px);pointer-events:none}
.n1fc-ring rect{fill:none;stroke:#A8CF62;stroke-width:1.25;stroke-linecap:round;opacity:.85}
.n1fc-arrowbox{position:relative;width:18px;height:18px;overflow:hidden}
.n1fc-arrow{position:absolute;inset:0}
/* WhatsApp */
.n1fc-wa svg{width:22px;height:22px;transition:color .35s ease}
.n1fc-wa:hover svg,.n1fc-wa:focus-visible svg{color:#C4DE8F}
.n1fc-wa::after{content:"";position:absolute;top:9px;right:9px;width:5px;height:5px;border-radius:50%;background:#A8CF62;opacity:.9}
.n1fc-label{position:absolute;right:calc(100% + 10px);top:50%;height:36px;margin-top:-18px;display:flex;align-items:center;padding:0 14px;border-radius:8px;white-space:nowrap;pointer-events:none;
  font:500 11.5px/1 Barlow,Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#e4e3dd;
  background:rgba(12,14,13,.72);border:1px solid rgba(228,227,221,.12);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);
  clip-path:inset(0 0 0 100% round 8px);opacity:0}
.n1fc-sr{position:absolute;width:1px;height:1px;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
/* Mobil bu sürümde değişmez: kontroller yalnızca masaüstünde */
@media (max-width:900px){.n1fc{display:none}}
@media (min-width:1920px){.n1fc{--n1fc-s:56px}}
@media (min-width:2400px){.n1fc{--n1fc-s:62px}.n1fc-wa svg{width:25px;height:25px}.n1fc-arrowbox{width:20px;height:20px}}
@media (prefers-reduced-motion:reduce){.n1fc,.n1fc-top,.n1fc-top[data-on],.n1fc-btn{transition:none}.n1fc-top{transform:none}}
`;

  // WhatsApp: tanınabilir ince çizgi simgesi (konuşma balonu + ahize)
  const WA_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
    + '<path d="M3.6 20.4l1.25-4.1A8.6 8.6 0 1 1 8 19.3z"/>'
    + '<path d="M9.05 8.05c.3-.55.75-.6 1.05-.6.25 0 .45.1.55.35l.75 1.75c.08.2.05.45-.1.62l-.6.68c.6 1.2 1.55 2.15 2.8 2.8l.68-.6c.17-.15.42-.18.62-.1l1.75.75c.25.1.35.3.35.55 0 .3-.05.75-.6 1.05-.6.33-1.45.45-2.4.05a9.6 9.6 0 0 1-4.9-4.9c-.4-.95-.28-1.8.05-2.4z" fill="currentColor" stroke="none"/></svg>';
  const ARROW = '<svg class="n1fc-arrow" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" aria-hidden="true"><path d="M9 15.5V3"/><path d="M4 8l5-5 5 5"/></svg>';

  let styleAdded = false;

  class N1FloatingControls extends HTMLElement {
    connectedCallback() {
      if (this._on) return; this._on = true;
      if (!styleAdded) { const st = document.createElement('style'); st.id = 'n1fc-style'; st.textContent = CSS; document.head.appendChild(st); styleAdded = true; }
      const href = this.getAttribute('whatsapp-href') || '';
      const label = this.getAttribute('label') || "WHATSAPP'TAN YAZ";
      this.showAfter = parseFloat(this.getAttribute('show-after') || '1') || 1;
      this.reduce = matchMedia('(prefers-reduced-motion: reduce)');

      // Sabit katman body seviyesinde (Wix'te transform'lu kapsayıcıların etkisinden kaçmak için)
      const root = this.layer = document.createElement('div');
      root.className = 'n1fc'; root.setAttribute('role', 'group'); root.setAttribute('aria-label', 'Hızlı erişim');
      root.innerHTML =
        '<div class="n1fc-row"><button class="n1fc-btn n1fc-top" type="button" aria-label="Sayfanın başına dön">'
        + '<svg class="n1fc-ring" aria-hidden="true"><rect x=".5" y=".5" rx="10" ry="10"></rect></svg>'
        + '<span class="n1fc-arrowbox">' + ARROW + '</span></button></div>'
        + '<div class="n1fc-row"><span class="n1fc-label" aria-hidden="true"></span>'
        + '<a class="n1fc-btn n1fc-wa" target="_blank" rel="noopener noreferrer">' + WA_SVG
        + '<span class="n1fc-sr">WhatsApp\'tan 1N Digital Media\'ya yaz (yeni sekmede açılır)</span></a></div>';
      root.querySelector('.n1fc-label').append(label);
      this.topBtn = root.querySelector('.n1fc-top');
      this.wa = root.querySelector('.n1fc-wa'); this.wa.href = href;
      this.lbl = root.querySelector('.n1fc-label');
      this.arrow = root.querySelector('.n1fc-arrow');
      this.ring = root.querySelector('.n1fc-ring rect');
      document.body.appendChild(root);

      this.topOn = false; this.topBtn.inert = true; this.topBtn.setAttribute('aria-hidden', 'true');
      this._raf = 0; this._tween = null;
      const G = window.gsap;
      this.G = G;
      this.ctx = G ? G.context(() => {}) : null;

      // ---- kaydırma durumu (yalnızca okur; kaydırmayı değiştirmez) ----
      this._onScroll = () => { if (!this._raf) this._raf = requestAnimationFrame(() => { this._raf = 0; this._update(); }); };
      addEventListener('scroll', this._onScroll, { passive: true });
      addEventListener('resize', this._onScroll);
      this._onResize = () => this._sizeRing(); addEventListener('resize', this._onResize);

      // ---- Yukarı Çık ----
      this._onTop = () => this.scrollTop();
      this.topBtn.addEventListener('click', this._onTop);
      // Kullanıcı araya girerse yukarı çıkışı bırak
      this._cancel = () => { if (this._tween) { this._tween.kill(); this._tween = null; } };
      this._onKey = (e) => { if (this._tween && !['Shift', 'Control', 'Alt', 'Meta'].includes(e.key)) this._cancel(); };
      addEventListener('wheel', this._cancel, { passive: true });
      addEventListener('touchstart', this._cancel, { passive: true });
      addEventListener('keydown', this._onKey);
      this._onDown = (e) => { if (this._tween && !root.contains(e.target)) this._cancel(); };
      addEventListener('pointerdown', this._onDown);

      // ---- hover / odak mikro etkileşimleri ----
      if (G) {
        this._arrowTl = null;
        this._arrowIn = () => {
          if (this.reduce.matches || (this._arrowTl && this._arrowTl.isActive())) return;
          this.ctx.add(() => {
            this._arrowTl = G.timeline()
              .to(this.arrow, { yPercent: -110, duration: 0.32, ease: 'power2.in' })
              .set(this.arrow, { yPercent: 110 })
              .to(this.arrow, { yPercent: 0, duration: 0.5, ease: 'expo.out' });
          });
        };
        this._waIn = () => { if (this.reduce.matches) { G.set(this.lbl, { opacity: 1, clipPath: 'inset(0 0 0 0% round 8px)' }); return; }
          G.to(this.lbl, { opacity: 1, clipPath: 'inset(0 0 0 0% round 8px)', duration: 0.5, ease: 'expo.out', overwrite: true }); };
        this._waOut = () => { if (this.reduce.matches) { G.set(this.lbl, { opacity: 0, clipPath: 'inset(0 0 0 100% round 8px)' }); return; }
          G.to(this.lbl, { opacity: 0, clipPath: 'inset(0 0 0 100% round 8px)', duration: 0.35, ease: 'power2.out', overwrite: true }); };
      } else {
        this._arrowIn = () => {};
        this._waIn = () => { this.lbl.style.opacity = 1; this.lbl.style.clipPath = 'inset(0 0 0 0% round 8px)'; };
        this._waOut = () => { this.lbl.style.opacity = 0; this.lbl.style.clipPath = 'inset(0 0 0 100% round 8px)'; };
      }
      this.topBtn.addEventListener('pointerenter', this._arrowIn);
      this.topBtn.addEventListener('focus', this._arrowIn);
      this.wa.addEventListener('pointerenter', this._waIn);
      this.wa.addEventListener('pointerleave', this._waOut);
      this.wa.addEventListener('focus', this._waIn);
      this.wa.addEventListener('blur', this._waOut);

      // ---- başka sistemlerle uyum: menü açıkken ve Showreel izleme modunda gizlen ----
      this._mo = new MutationObserver(() => this._update());
      this._watchTargets();
      this._update();
      requestAnimationFrame(() => this._sizeRing());
    }

    _watchTargets() {
      const header = document.querySelector('n1-header');
      const sr = document.querySelector('[data-n1-showreel]');
      if (header) this._mo.observe(header, { attributes: true, attributeFilter: ['data-open'] });
      if (sr) this._mo.observe(sr, { attributes: true, attributeFilter: ['data-state'] });
      this.header = header; this.sr = sr;
    }

    _sizeRing() {
      const svg = this.ring.ownerSVGElement, b = svg.getBoundingClientRect(); if (!b.width) return;
      const w = b.width - 1, h = b.height - 1; // çizgi .5px içeriden, tam kenara oturur
      svg.setAttribute('viewBox', '0 0 ' + b.width + ' ' + b.height);
      this.ring.setAttribute('width', w); this.ring.setAttribute('height', h);
      let len = 0; try { len = this.ring.getTotalLength(); } catch (e) { len = 2 * (w + h); }
      this.ringLen = len; this.ring.style.strokeDasharray = len + ' ' + len;
      this._update();
    }

    _update() {
      if (!this.layer) return;
      const y = scrollY, vh = innerHeight, max = Math.max(1, document.documentElement.scrollHeight - vh);
      // menü açık ya da Showreel izleme/açılma/kapanma modunda tüm kontroller gizlenir
      const srState = this.sr && this.sr.getAttribute('data-state');
      const blocked = (this.header && this.header.hasAttribute('data-open')) || (srState && srState !== 'preview');
      if (blocked) { if (!this.layer.hasAttribute('data-hidden')) { this.layer.setAttribute('data-hidden', ''); this.layer.inert = true; this._waOut(); } }
      else if (this.layer.hasAttribute('data-hidden')) { this.layer.removeAttribute('data-hidden'); this.layer.inert = false; }

      // v6.32: kontrollerin altına tıklanabilir bir öğe (ör. "Tüm markaları gör") girerse geçici olarak çekil
      const dodge = !blocked && this._overInteractive();
      if (dodge !== this.layer.hasAttribute('data-dodge')) {
        if (dodge) { this.layer.setAttribute('data-dodge', ''); this.layer.inert = true; this._waOut(); }
        else { this.layer.removeAttribute('data-dodge'); if (!this.layer.hasAttribute('data-hidden')) this.layer.inert = false; }
      }

      const on = y > vh * this.showAfter;
      if (on !== this.topOn) {
        this.topOn = on;
        if (on) { this.topBtn.setAttribute('data-on', ''); this.topBtn.inert = false; this.topBtn.removeAttribute('aria-hidden'); }
        else {
          if (document.activeElement === this.topBtn) this.topBtn.blur();
          this.topBtn.removeAttribute('data-on'); this.topBtn.inert = true; this.topBtn.setAttribute('aria-hidden', 'true');
        }
      }
      if (this.ringLen) this.ring.style.strokeDashoffset = String(this.ringLen * (1 - Math.min(1, y / max)));
    }

    // Kontrollerin kapladığı alanda (gizli Yukarı Çık hariç) sayfadaki bir bağlantı/buton var mı?
    _overInteractive() {
      const btns = [this.wa]; if (this.topOn) btns.push(this.topBtn);
      const SEL = 'a,button,[role="button"],input,select,textarea,summary';
      for (const b of btns) {
        const r = b.getBoundingClientRect(); if (!r.width) continue;
        const pts = [[r.left + 4, r.top + 4], [r.right - 4, r.top + 4], [r.left + 4, r.bottom - 4], [r.right - 4, r.bottom - 4], [r.left + r.width / 2, r.top + r.height / 2]];
        for (const [x, y] of pts) {
          const stack = document.elementsFromPoint(x, y);
          for (const el of stack) {
            if (this.layer.contains(el)) continue;
            const hit = el.closest(SEL);
            if (hit && !hit.closest('n1-header') && !hit.closest('.n1h-panel') && !hit.closest('.n1sr-stage')) return true;
          }
        }
      }
      return false;
    }

    // Sayfanın başına yumuşak dönüş. Kaydırma motoru yok: yalnızca window.scrollTo.
    scrollTop() {
      const G = this.G, from = scrollY;
      if (from <= 0) return;
      this._cancel();
      if (!G || this.reduce.matches) { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); return; }
      const dist = from / innerHeight; // ekran sayısı
      const duration = Math.min(1.9, Math.max(0.7, 0.55 + Math.sqrt(dist) * 0.32));
      // Gerçek saate bağlı ilerleme: kareler seyrekleşse (arka plan / düşük güç) bile çıkış
      // hedeflenen sürede biter. Eğri GSAP'in power3.inOut eğrisidir; ayrı tween kullanılmaz.
      const ease = G.parseEase('power3.inOut'), t0 = performance.now(), ms = duration * 1000;
      const job = { killed: false, kill() { this.killed = true; cancelAnimationFrame(this.raf); clearInterval(this.iv); } };
      const tick = () => {
        if (job.killed) return;
        const k = Math.min(1, (performance.now() - t0) / ms);
        window.scrollTo({ top: Math.round(from * (1 - ease(k))), left: 0, behavior: 'instant' });
        if (k >= 1) { job.kill(); if (this._tween === job) this._tween = null; }
      };
      const loop = () => { tick(); if (!job.killed) job.raf = requestAnimationFrame(loop); };
      this._tween = job;
      job.raf = requestAnimationFrame(loop);
      job.iv = setInterval(tick, 100); // kareler durursa yedek
      // klavye kullanıcısı için odağı sayfanın başına taşı (kaydırmadan)
      const target = document.querySelector('n1-header .n1h-logo') || document.body;
      if (this.topBtn.matches(':focus-visible') && target.focus) setTimeout(() => target.focus({ preventScroll: true }), duration * 1000 + 50);
    }

    disconnectedCallback() {
      this._on = false;
      removeEventListener('scroll', this._onScroll); removeEventListener('resize', this._onScroll); removeEventListener('resize', this._onResize);
      removeEventListener('wheel', this._cancel); removeEventListener('touchstart', this._cancel);
      removeEventListener('keydown', this._onKey); removeEventListener('pointerdown', this._onDown);
      cancelAnimationFrame(this._raf); this._raf = 0;
      if (this._mo) this._mo.disconnect();
      if (this._tween) this._tween.kill();
      if (this.ctx) this.ctx.revert();
      this._tween = null;
      if (this.layer) this.layer.remove(); this.layer = null;
    }
  }
  customElements.define(TAG, N1FloatingControls);
})();
