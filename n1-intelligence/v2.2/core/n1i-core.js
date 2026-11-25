/* =====================================================================
   1N INTELLIGENCE V2.1 — Ortak çekirdek (2.1.0)
   V2: merkezi tema protokolü (açık öncelikli), grafik tema kaydı, kayan segment göstergesi.
   V2.1: cam grafik tooltip'i (HTML), çizgi grafiklerde dikey kılavuz, uzun sayıların kartta
         otomatik kısa biçime geçmesi, okunur eksen yazıları, açıklama kutusu mikro hareketi.
   Her HTML Embed (iFrame) bu dosyayı bir kez yükler.
   İçerik: yapılandırma, biçimlendirme (tr-TR), güvenli mesaj köprüsü,
   yükseklik bildirimi, durum bileşenleri, açıklama balonları,
   Chart.js 4.4.0 ve GSAP 3.13.0 için tembel ve sabit sürümlü yükleme.
   Bu dosyada müşteri verisi, hesap kimliği veya gizli bilgi YOKTUR.
   ===================================================================== */
(function () {
  'use strict';
  if (window.N1I) return; // aynı iFrame'de ikinci kez yüklenirse yok say

  var VERSION = '2.2.0';
  var CDN = {
    chart: 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js',
    gsap: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js'
  };

  /* ---------------- Yapılandırma ----------------
     window.N1I_CONFIG embed kodunda tanımlanır (gizli bilgi içermez).
     demo yalnızca prototip sayfası URL'sinde ?demo=1 varsa açılır; üretim
     embed kodunda demo verisi yoktur ve demo bayrağı yapılandırmadan açılamaz. */
  var qs = new URLSearchParams(location.search);
  var userCfg = window.N1I_CONFIG || {};
  var cfg = {
    module: userCfg.module || document.documentElement.getAttribute('data-n1i-module') || 'unknown',
    client: userCfg.client || {},
    timeZone: userCfg.timeZone || 'Europe/Istanbul',
    currency: userCfg.currency || 'TRY',
    allowedOrigins: Array.isArray(userCfg.allowedOrigins) ? userCfg.allowedOrigins : [],
    heightMessages: userCfg.heightMessages !== false,
    motion: userCfg.motion !== false,
    responseTimeoutMs: userCfg.responseTimeoutMs || 30000,
    demo: qs.get('demo') === '1',
    noGlass: qs.get('noglass') === '1',
    options: userCfg.options || {}
  };
  if (cfg.noGlass) document.documentElement.classList.add('n1i-no-glass');
  // Yalnızca prototipte (demo=1) bekleme süresi test için kısaltılabilir.
  if (cfg.demo && /^\d{3,6}$/.test(qs.get('timeout') || '')) cfg.responseTimeoutMs = Number(qs.get('timeout'));

  /* ---------------- Biçimlendirme (Türkçe) ---------------- */
  var nfInt = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 0 });
  var nf1 = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  var nf2 = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  var nfCompact = new Intl.NumberFormat('tr-TR', { notation: 'compact', maximumFractionDigits: 1 });
  function isNum(v) { return v !== null && v !== undefined && v !== '' && isFinite(Number(v)); }
  var DASH = '—';
  var fmt = {
    isNum: isNum,
    int: function (v) { return isNum(v) ? nfInt.format(Math.round(Number(v))) : DASH; },
    dec1: function (v) { return isNum(v) ? nf1.format(Number(v)) : DASH; },
    dec2: function (v) { return isNum(v) ? nf2.format(Number(v)) : DASH; },
    compact: function (v) { return isNum(v) ? nfCompact.format(Number(v)) : DASH; },
    signed: function (v) { if (!isNum(v)) return DASH; v = Math.round(Number(v)); return (v > 0 ? '+' : v < 0 ? '−' : '') + nfInt.format(Math.abs(v)); },
    /* Para: sembol sonda, TL. Hesap para birimi platformdan gelmediği için cfg.currency varsayılır. */
    money: function (v) { return isNum(v) ? nf2.format(Number(v)) + ' ' + (cfg.currency === 'TRY' ? 'TL' : cfg.currency) : DASH; },
    moneyShort: function (v) { return isNum(v) ? nfCompact.format(Number(v)) + ' ' + (cfg.currency === 'TRY' ? 'TL' : cfg.currency) : DASH; },
    /* Yüzde: oran (0–1) verilir. 0.1'in altı "<%0,1" olarak yazılır. */
    pctRatio: function (r, digits) {
      if (!isNum(r)) return DASH;
      var p = Number(r) * 100, d = digits === undefined ? 1 : digits;
      if (p > 0 && p < 0.1) return '<%0,1';
      return '%' + new Intl.NumberFormat('tr-TR', { minimumFractionDigits: d, maximumFractionDigits: d }).format(p);
    },
    duration: function (sec) {
      if (!isNum(sec)) return DASH;
      var s = Math.round(Number(sec)), m = Math.floor(s / 60), r = s % 60;
      return m > 0 ? m + ' dk ' + r + ' sn' : r + ' sn';
    },
    /* 'YYYYMMDD' veya 'YYYY-MM-DD' → Date (UTC öğlen, saat dilimi kaymasından etkilenmez) */
    parseDay: function (s) {
      if (!s) return null;
      var t = String(s).replace(/-/g, '');
      if (!/^\d{8}$/.test(t)) return null;
      return new Date(Date.UTC(+t.slice(0, 4), +t.slice(4, 6) - 1, +t.slice(6, 8), 12));
    },
    dayKey: function (d) { return d.getUTCFullYear() + String(d.getUTCMonth() + 1).padStart(2, '0') + String(d.getUTCDate()).padStart(2, '0'); },
    dayShort: function (s) { var d = fmt.parseDay(s); return d ? new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'short', timeZone: 'UTC' }).format(d) : DASH; },
    dayLong: function (s) { var d = fmt.parseDay(s); return d ? new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(d) : DASH; },
    dateTR: function (date) { return new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: cfg.timeZone }).format(date); },
    timeTR: function (date) { return new Intl.DateTimeFormat('tr-TR', { hour: '2-digit', minute: '2-digit', timeZone: cfg.timeZone }).format(date); },
    /* Yapılandırılmış saat dilimine göre bugünün 'YYYY-MM-DD' karşılığı */
    todayISO: function (now) {
      var p = new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: cfg.timeZone }).formatToParts(now || new Date());
      var o = {}; p.forEach(function (x) { o[x.type] = x.value; });
      return o.year + '-' + o.month + '-' + o.day;
    }
  };

  function esc(v) {
    return String(v === null || v === undefined ? '' : v)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* ---------------- İkonlar (satır içi SVG, 24 ızgara, 1.5 çizgi) ---------------- */
  var P = {
    summary: '<path d="M4 13h4v7H4zM10 8h4v12h-4zM16 4h4v16h-4z"/>',
    ga4: '<path d="M4 19V9M10 19V5M16 19v-7M3 19h18"/>',
    meta: '<path d="M3 15c2-7 5-9 7-5l4 7c2 3 5 1 6-3s-1-8-4-6-5 7-9 10"/>',
    gads: '<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>',
    instagram: '<rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.5"/><circle cx="17" cy="7" r="0.6"/>',
    sheets: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
    ai: '<path d="M12 3l1.8 4.7L18.5 9.5 13.8 11.3 12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/><path d="M18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8z"/>',
    domain: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',
    drive: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    glossary: '<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h11"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8v.01"/>',
    alert: '<path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17v.01"/>',
    error: '<circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/>',
    ok: '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.6 2.5L16 9.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    empty: '<rect x="4" y="5" width="16" height="14" rx="2"/><path d="M4 13h4l2 2h4l2-2h4"/>',
    refresh: '<path d="M20 11a8 8 0 1 0-2.3 5.7M20 5v6h-6"/>',
    up: '<path d="M12 19V5M6 11l6-6 6 6"/>',
    down: '<path d="M12 5v14M6 13l6 6 6-6"/>',
    flat: '<path d="M5 12h14"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4 4"/>',
    send: '<path d="M5 12h13M13 6l6 6-6 6"/>',
    external: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    chevron: '<path d="M6 9l6 6 6-6"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    lock: '<rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 20a8 8 0 0 1 16 0"/>',
    table: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M9 10v9"/>',
    chart: '<path d="M4 17l5-5 4 3 7-8"/>',
    calendar: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>'
  };
  function icon(name, cls) {
    return '<svg class="' + (cls || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + (P[name] || P.info) + '</svg>';
  }

  /* ---------------- Güvenli mesaj köprüsü ----------------
     Gelen: yalnızca üst pencereden (event.source === window.parent),
     izin listesi tanımlıysa yalnızca o origin'lerden, nesne tipinde ve
     modülün şema kontrolünden geçen mesajlar işlenir. Aynı içerikli
     mesaj ikinci kez gelirse yeniden çizilmez.
     Giden: mevcut sözleşmedeki mesajlar ({action:'changeRange'}, {action:'askAI'})
     değiştirilmeden gönderilir. Hedef origin, tarayıcı destekliyorsa üst
     sayfanın origin'idir; değilse '*' (mevcut davranış). */
  var bridge = (function () {
    var lastSig = {};
    function parentOrigin() {
      try { if (location.ancestorOrigins && location.ancestorOrigins.length) return location.ancestorOrigins[0]; } catch (e) {}
      return '*';
    }
    function sig(d) { try { return JSON.stringify(d); } catch (e) { return String(Math.random()); } }
    function listen(handler, opts) {
      opts = opts || {};
      window.addEventListener('message', function (e) {
        if (window.parent !== window && e.source !== window.parent) return;
        if (cfg.allowedOrigins.length && cfg.allowedOrigins.indexOf(e.origin) === -1) { stats.rejectedOrigin++; return; }
        var d = e.data;
        if (!d || typeof d !== 'object' || Array.isArray(d)) { stats.rejectedShape++; return; }
        if (d.type === 'N1I_HEIGHT' || d.type === 'N1I_NAV' || d.action === 'n1iTheme' || d.action === 'n1iLocked' || d.action === 'n1iUnlocked') return; // kendi protokolümüz, veri değil
        if (opts.accept && !opts.accept(d)) { stats.rejectedShape++; return; }
        var key = opts.kind ? opts.kind(d) : 'default';
        var s = sig(d);
        var isDup = lastSig[key] === s;
        lastSig[key] = s;
        if (isDup && (!opts.dedupe || opts.dedupe(d))) { stats.duplicates++; return; }
        stats.accepted++;
        try { handler(d, e); } catch (err) { stats.renderErrors++; console.error('[1N Intelligence] çizim hatası', err); if (opts.onError) opts.onError(err); }
      });
    }
    function forget(key) { delete lastSig[key || 'default']; }
    function send(msg) {
      if (window.parent === window) return false;
      window.parent.postMessage(msg, parentOrigin());
      return true;
    }
    var stats = { accepted: 0, duplicates: 0, rejectedShape: 0, rejectedOrigin: 0, renderErrors: 0 };
    return { listen: listen, send: send, forget: forget, stats: stats, parentOrigin: parentOrigin };
  })();

  /* ---------------- Yükseklik bildirimi (yalnızca iFrame için) ----------------
     Wix HTML Embed bir iFrame'dir ve kendi yüksekliğini değiştiremez.
     İçerik yüksekliği üst sayfaya bildirilir; üst sayfadaki Özel Kod
     (embeds/wix-custom-code-auto-height.html) iFrame'i bu yüksekliğe ayarlar.
     Döngü önleme: içerik iFrame yüksekliğine bağlı değildir (100vh yok),
     2 px altındaki değişiklikler gönderilmez. */
  var height = (function () {
    var last = 0, timer = 0, root = null;
    function measure() {
      if (window.N1I && window.N1I.seg) window.N1I.seg.sync(document, true, true);
      if (!root) return;
      var veil = document.documentElement.classList.contains('n1i-locked') ? document.querySelector('.n1i-lockveil') : null;
      var target = veil || root;
      if (!veil) fitNumbers(root);
      var r = target.getBoundingClientRect();
      var h = Math.ceil(Math.max(r.height, target.scrollHeight) + (veil ? 32 : 0) + (parseFloat(getComputedStyle(document.body).paddingBottom) || 0));
      if (!isFinite(h) || h < 1 || Math.abs(h - last) < 2) return;
      last = h;
      if (window.parent !== window) window.parent.postMessage({ type: 'N1I_HEIGHT', module: cfg.module, height: h }, '*');
    }
    function schedule() { clearTimeout(timer); timer = setTimeout(measure, 60); }
    function start(el) {
      if (!cfg.heightMessages) return;
      root = el;
      if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(el);
      window.addEventListener('resize', schedule);
      window.addEventListener('load', schedule);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(schedule);
      measure(); setTimeout(schedule, 400); setTimeout(schedule, 1500);
    }
    return { start: start, now: measure, schedule: schedule, last: function () { return last; } };
  })();

  /* ---------------- Komut dosyası yükleme ---------------- */
  var loaded = {};
  function loadScript(src, test, timeoutMs) {
    if (test()) return Promise.resolve();
    if (loaded[src]) return loaded[src];
    loaded[src] = new Promise(function (res, rej) {
      var s = document.createElement('script');
      s.src = src; s.async = true; s.crossOrigin = 'anonymous';
      var t = setTimeout(function () { rej(new Error('timeout ' + src)); }, timeoutMs || 12000);
      s.onload = function () { clearTimeout(t); test() ? res() : rej(new Error('missing ' + src)); };
      s.onerror = function () { clearTimeout(t); rej(new Error('load ' + src)); };
      document.head.appendChild(s);
    });
    loaded[src].catch(function () { delete loaded[src]; });
    return loaded[src];
  }

  /* ---------------- Uzun sayılar (V2.1) ----------------
     data-full / data-compact taşıyan değerler kart dar gelirse kısa biçime geçer (ör. 12,3 Mn TL).
     Tam değer aria-label ve title'da kalır; genişleyince tam biçime döner. Yazı küçültülmez. */
  function unitHtml(t) { return String(t).replace(/ TL$/, '<small>TL</small>'); }
  function fitNumbers(scope, force) {
    (scope || document).querySelectorAll('[data-full]').forEach(function (el) {
      var cw = String(el.clientWidth);
      if (!force && el.getAttribute('data-fit-w') === cw) return;
      el.setAttribute('data-fit-w', cw);
      var full = el.getAttribute('data-full'), comp = el.getAttribute('data-compact');
      el.innerHTML = unitHtml(full); el.removeAttribute('data-compact-on'); el.removeAttribute('title'); el.style.fontSize = '';
      el.setAttribute('aria-label', full);
      if (el.scrollWidth <= el.clientWidth + 1) return;
      /* 1. adım: büyük vurgu sayılarında (≥ 36 px) bir kademe küçült; 2. adım: kısa biçim */
      var fs = parseFloat(getComputedStyle(el).fontSize);
      if (fs >= 36) { el.style.fontSize = Math.round(fs * 0.76) + 'px'; if (el.scrollWidth <= el.clientWidth + 1) return; }
      if (comp) { el.innerHTML = unitHtml(comp); el.setAttribute('data-compact-on', '1'); el.title = full; }
    });
  }

  /* ---------------- Hareket (GSAP 3.13.0, isteğe bağlı) ----------------
     GSAP yüklenemezse veya kullanıcı hareketi azaltmışsa hiçbir şey
     beklenmez; içerik zaten görünür ve son değerindedir. */
  var reduceMQ = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  var motion = {
    allowed: function () { return cfg.motion && !reduceMQ.matches; },
    gsap: function () {
      if (!motion.allowed()) return Promise.resolve(null);
      return loadScript(CDN.gsap, function () { return !!window.gsap; }, 8000).then(function () { return window.gsap; }, function () { return null; });
    },
    /* Kısa giriş: yalnızca ilk veri geldiğinde, 240 ms, 6 px. */
    enter: function (els) {
      var list = Array.prototype.slice.call(els || []).filter(Boolean);
      if (!list.length) return;
      motion.gsap().then(function (g) {
        if (!g) return;
        g.fromTo(list, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.34, ease: 'power3.out', stagger: 0.04, clearProps: 'opacity,transform' });
      });
    },
    /* Sayı geçişi: yalnızca ilk yüklemede; erişilebilir değer hemen aria-label'a yazılır. */
    count: function (el, value, formatter) {
      if (!el || !isNum(value)) return;
      var unit = function (t) { return String(t).replace(/ TL$/, '<small>TL</small>'); };
      var final = unit(formatter(value));
      el.setAttribute('aria-label', final.replace(/<[^>]+>/g, ''));
      el.innerHTML = final;
      fitNumbers(el.parentNode, true);
      if (el.getAttribute('data-counted') === '1' || Math.abs(Number(value)) < 10 || el.hasAttribute('data-compact-on')) return;
      el.setAttribute('data-counted', '1');
      motion.gsap().then(function (g) {
        if (!g) return;
        var o = { v: 0 };
        g.to(o, { v: Number(value), duration: 0.5, ease: 'power2.out', onUpdate: function () { el.innerHTML = unit(formatter(o.v)); }, onComplete: function () { el.innerHTML = final; fitNumbers(el.parentNode, true); } });
      });
    },
    /* Oran çubukları: soldan doluş, 300 ms. */
    bars: function (els) {
      var list = Array.prototype.slice.call(els || []);
      if (!list.length) return;
      motion.gsap().then(function (g) { if (g) g.from(list, { scaleX: 0, duration: 0.3, ease: 'power2.out', stagger: 0.02, clearProps: 'transform' }); });
    }
  };

  /* ---------------- Grafikler (Chart.js 4.4.0, mevcut altyapı) ---------------- */
  function css(name) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); }
  var charts = {
    registry: [],
    load: function () {
      return loadScript(CDN.chart, function () { return !!window.Chart; }, 12000).then(function () { charts.theme(window.Chart); return window.Chart; });
    },
    /* Chart.js varsayılanları güncel tema tokenlarından okunur; tema değişince yeniden çağrılır. */
    theme: function (Chart) {
      Chart = Chart || window.Chart; if (!Chart) return;
      Chart.defaults.font.family = "'Barlow', 'Helvetica Neue', Arial, sans-serif";
      Chart.defaults.font.size = 12.5;
      Chart.defaults.font.weight = '500';
      Chart.defaults.color = css('--n1i-muted');
      Chart.defaults.borderColor = css('--n1i-grid');
      Chart.defaults.locale = 'tr-TR';
      Chart.defaults.animation = motion.allowed() ? { duration: 360, easing: 'easeOutQuart' } : false;
      /* Renk animasyonu kapalı: degrade dolgular (CanvasGradient) ara değer hesaplanamaz; tema geçişi zaten anlıktır. */
      if (Chart.defaults.animations) Chart.defaults.animations.colors = false;
      Chart.defaults.plugins.legend.display = false; // açıklama HTML olarak çizilir
      var tt = Chart.defaults.plugins.tooltip;
      /* V2.1: tooltip HTML olarak çizilir (cam yüzey, büyük değer, okunur yazı) */
      tt.enabled = false; tt.external = charts.externalTooltip;
      tt.displayColors = true; tt.usePointStyle = true;
      Chart.defaults.interaction = { mode: 'index', intersect: false };
      Chart.defaults.maintainAspectRatio = false;
      Chart.defaults.responsive = true;
      var el = Chart.defaults.elements;
      el.line.borderWidth = 2.25; el.line.tension = 0.32; el.line.borderCapStyle = 'round'; el.line.borderJoinStyle = 'round';
      el.point.radius = 0; el.point.hoverRadius = 5; el.point.hitRadius = 14; el.point.hoverBorderWidth = 2.5;
      el.point.hoverBackgroundColor = css('--n1i-surface');
      el.bar.borderRadius = 6;
      if (!charts._plugin) { charts._plugin = true; Chart.register(charts.crosshair); }
    },
    /* Çizgi grafiklerde etkin noktada ince dikey kılavuz (okuma kolaylığı). */
    crosshair: {
      id: 'n1iCrosshair',
      afterDatasetsDraw: function (chart) {
        if (chart.config.type !== 'line' || !chart.tooltip) return;
        var a = chart.tooltip.getActiveElements ? chart.tooltip.getActiveElements() : [];
        if (!a || !a.length) return;
        var x = a[0].element.x, area = chart.chartArea, ctx = chart.ctx;
        ctx.save(); ctx.strokeStyle = css('--n1i-line-strong'); ctx.lineWidth = 1; ctx.setLineDash([3, 3]);
        ctx.beginPath(); ctx.moveTo(x, area.top); ctx.lineTo(x, area.bottom); ctx.stroke(); ctx.restore();
      }
    },
    /* Dış tooltip: başlık + her seri için ad / değer. Etiket geri çağrılarının " Ad: değer" çıktısı ayrıştırılır. */
    externalTooltip: function (context) {
      var chart = context.chart, tt = context.tooltip, host = chart.canvas.parentNode;
      var el = host.querySelector(':scope > .n1i-ctip');
      if (!el) { el = document.createElement('div'); el.className = 'n1i-ctip'; el.setAttribute('aria-hidden', 'true'); host.appendChild(el); }
      if (!tt || tt.opacity === 0) { el.classList.remove('is-on'); return; }
      var rows = (tt.body || []).map(function (b, i) {
        var line = (b.lines || []).join(' ').trim(), k = line.lastIndexOf(': ');
        var name = k > -1 ? line.slice(0, k) : '', val = k > -1 ? line.slice(k + 2) : line;
        var col = tt.labelColors && tt.labelColors[i] ? (tt.labelColors[i].borderColor || tt.labelColors[i].backgroundColor) : 'transparent';
        if (typeof col !== 'string') col = 'transparent';
        return '<div class="n1i-ctip__row"><span class="n1i-ctip__name">' + (name ? '<span class="n1i-ctip__sw" style="background:' + esc(col) + '"></span>' + esc(name) : '') + '</span><span class="n1i-ctip__val">' + esc(val) + '</span></div>';
      }).join('');
      var title = (tt.title || []).join(' ');
      el.innerHTML = (title ? '<div class="n1i-ctip__title">' + esc(title) + '</div>' : '') + rows;
      var hw = host.clientWidth, hh = host.clientHeight, w = el.offsetWidth, h = el.offsetHeight;
      var x = tt.caretX + 14; if (x + w > hw) x = tt.caretX - w - 14; if (x < 0) x = Math.max(0, Math.min(hw - w, tt.caretX - w / 2));
      var y = Math.max(-8, Math.min(hh - h + 8, tt.caretY - h / 2));
      el.style.left = Math.round(x) + 'px'; el.style.top = Math.round(y) + 'px';
      el.classList.add('is-on');
    },
    color: css,
    /* Alan dolgusu: üstte token rengi, altta saydam (çizgi grafikler). Tema değişince yeniden okunur. */
    areaFill: function (varName) {
      return function (ctx) {
        var ch = ctx.chart, a = ch.chartArea; if (!a) return css(varName);
        var g = ch.ctx.createLinearGradient(0, a.top, 0, a.bottom);
        g.addColorStop(0, css(varName)); g.addColorStop(1, 'rgba(0,0,0,0)'); return g;
      };
    },
    axis: function (extra) {
      return Object.assign({ grid: { color: css('--n1i-grid'), drawTicks: false }, border: { display: false, dash: [3, 4] }, ticks: { color: css('--n1i-muted'), padding: 10, font: { size: 12.5, weight: '500' } } }, extra || {});
    },
    /* Grafik oluşturma: build() güncel tokenlarla TAM yapılandırma döndürür.
       Tema değişince yalnızca renk ve seçenekler yeniden uygulanır; veri dizileri aynen kalır. */
    create: function (canvas, build) {
      var cfg = build();
      var chart = new window.Chart(canvas, cfg);
      charts.registry.push({ chart: chart, build: build });
      return chart;
    },
    retheme: function () {
      if (!window.Chart) return;
      charts.theme(window.Chart);
      charts.registry = charts.registry.filter(function (r) { return r.chart.canvas && r.chart.canvas.isConnected; });
      charts.registry.forEach(function (r) {
        var cfg = r.build();
        r.chart.data.datasets.forEach(function (ds, i) {
          var nd = cfg.data.datasets[i]; if (!nd) return;
          Object.keys(nd).forEach(function (k) { if (k !== 'data' && k !== 'label') ds[k] = nd[k]; });
        });
        window.Chart.helpers.merge(r.chart.options, cfg.options);
        r.chart.update('none');
      });
    }
  };

  /* ---------------- Durum bileşenleri ---------------- */
  var ui = {
    icon: icon,
    state: function (kind, title, text, actionsHtml) {
      var ic = { error: 'error', warn: 'alert', info: 'info', empty: 'empty', ok: 'ok' }[kind] || 'info';
      return '<div class="n1i-state n1i-state--' + kind + '" role="' + (kind === 'error' ? 'alert' : 'status') + '">' + icon(ic) +
        '<div class="n1i-state__body"><p class="n1i-state__title">' + esc(title) + '</p>' + (text ? '<p class="n1i-state__text">' + text + '</p>' : '') +
        (actionsHtml ? '<div class="n1i-state__actions">' + actionsHtml + '</div>' : '') + '</div></div>';
    },
    skelKpis: function (n) {
      var h = '';
      for (var i = 0; i < n; i++) h += '<div class="n1i-kpi" aria-hidden="true"><div class="n1i-skel n1i-skel--text" style="width:55%"></div><div class="n1i-skel n1i-skel--value"></div><div class="n1i-skel n1i-skel--text" style="width:40%"></div></div>';
      return '<div class="n1i-kpis">' + h + '</div>';
    },
    skelPanel: function (h) { return '<div class="n1i-panel" aria-hidden="true"><div class="n1i-skel n1i-skel--text" style="width:30%"></div><div class="n1i-skel" style="height:' + (h || 200) + 'px;margin-top:12px"></div></div>'; },
    chip: function (kind, text, ic) { return '<span class="n1i-chip' + (kind ? ' n1i-chip--' + kind : '') + '">' + (ic ? icon(ic) : '') + esc(text) + '</span>'; },
    demoChip: function () { return cfg.demo ? '<span class="n1i-chip n1i-chip--demo" title="Bu alandaki bütün sayılar örnek veridir">DEMO VERİ</span>' : ''; },
    /* Açıklama: düğme + açılır kutu. Klavye: Enter/Space açar, Esc kapatır. */
    tip: function (html, label, left) {
      var id = 'tip' + Math.random().toString(36).slice(2, 8);
      return '<span class="n1i-tip' + (left ? ' n1i-tip--left' : '') + '"><button type="button" class="n1i-iconbtn" aria-expanded="false" aria-controls="' + id + '" aria-label="' + esc(label || 'Açıklama') + '" data-n1i-tip>' + icon('info') + '</button>' +
        '<span class="n1i-tip__pop" id="' + id + '" role="tooltip" hidden>' + html + '</span></span>';
    },
    kpi: function (o) {
      // o: {id, label, value(metin), compact(kısa metin, isteğe bağlı), foot(html), aside(html), tip(html), state:'ok'|'na'|'err', cls}
      var cls = 'n1i-kpi' + (o.state === 'na' ? ' n1i-kpi--na' : '') + (o.state === 'err' ? ' n1i-kpi--err' : '') + (o.cls ? ' ' + o.cls : '');
      return '<div class="' + cls + '"' + (o.id ? ' id="' + o.id + '"' : '') + '><div class="n1i-kpi__top"><span class="n1i-kpi__label">' + esc(o.label) + '</span>' + (o.tip ? ui.tip(o.tip, o.label + ' açıklaması') : '') + '</div>' +
        '<div class="n1i-kpi__value n1i-num" data-v' + (o.compact ? ' data-full="' + esc(String(o.value)) + '" data-compact="' + esc(o.compact) + '" aria-label="' + esc(String(o.value)) + '"' : '') + '>' + String(o.value).replace(/ TL$/, '<small>TL</small>') + '</div>' + (o.foot ? '<div class="n1i-kpi__foot">' + o.foot + '</div>' : '') + (o.aside ? '<div class="n1i-kpi__aside">' + o.aside + '</div>' : '') + '</div>';
    },
    seg: function (name, items, active, label) {
      return '<div class="n1i-seg" role="group" aria-label="' + esc(label) + '">' + items.map(function (it) {
        return '<button type="button" class="n1i-seg__btn" data-' + name + '="' + esc(it.key) + '" aria-pressed="' + (it.key === active) + '">' + esc(it.label) + '</button>';
      }).join('') + '</div>';
    },
    received: function () { return 'Alındı ' + fmt.timeTR(new Date()) + ' (TSİ)'; },
    /* V2.2: sunucunun gönderdiği aralık (n1iRange) varsa gerçek tarihlerle yazılır; yoksa V2.1 metni. */
    rangeText: function (d, legacyAll) {
      var r = d && d.n1iRange;
      if (!r || !r.label) return (d.rangeLabel || 'Son 7 gün') + (d.rangeKey === 'all' ? ' (' + legacyAll + ')' : ' · bugün dahil');
      var t = r.label + (r.open ? ' · veri başlangıcından bugüne' : (r.span ? ' · ' + r.span : ''));
      if (r.clamped) t += ' · bugünün verisi henüz alınamadı';
      else if (r.partialToday) t += ' · bugün devam ediyor';
      return t;
    },
    rangeTitle: function (d) {
      var r = d && d.n1iRange;
      return r && r.note ? r.label + ': ' + r.note + (r.tz ? ' (' + r.tz + ')' : '') : '';
    }
  };

  // Açıklama kutuları: tek yerden olay yönetimi
  document.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('[data-n1i-tip]') : null;
    document.querySelectorAll('[data-n1i-tip][aria-expanded="true"]').forEach(function (o) {
      if (o !== b) { o.setAttribute('aria-expanded', 'false'); var p = document.getElementById(o.getAttribute('aria-controls')); if (p) p.hidden = true; }
    });
    if (!b) return;
    var pop = document.getElementById(b.getAttribute('aria-controls'));
    var open = b.getAttribute('aria-expanded') !== 'true';
    b.setAttribute('aria-expanded', String(open));
    if (pop) {
      pop.hidden = !open;
      if (open && window.gsap && motion.allowed()) window.gsap.fromTo(pop, { opacity: 0, y: -4, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.16, ease: 'power2.out', clearProps: 'opacity,transform' });
    }
    height.schedule();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('[data-n1i-tip][aria-expanded="true"]').forEach(function (o) {
      o.setAttribute('aria-expanded', 'false'); var p = document.getElementById(o.getAttribute('aria-controls')); if (p) p.hidden = true; o.focus();
    });
  });

  /* ---------------- Modül başlığı ---------------- */
  function header(o) {
    // o: {icon, title, meta:[html], tools(html), tip}
    return '<header class="n1i-head"' + (o.tone ? ' data-tone="' + o.tone + '"' : '') + '><div class="n1i-head__title"><span class="n1i-head__icon">' + icon(o.icon) + '</span><div style="min-width:0">' +
      '<h2 class="n1i-h1">' + esc(o.title) + '</h2>' + (o.meta && o.meta.length ? '<div class="n1i-meta">' + o.meta.filter(Boolean).join('<span class="n1i-meta__sep" aria-hidden="true"></span>') + '</div>' : '') +
      '</div></div>' + (o.tools ? '<div class="n1i-head__tools">' + o.tools + '</div>' : '') + '</header>';
  }

  /* ---------------- Tarih yardımcıları ---------------- */
  /* Günlük seriyi takvimle hizalar: eksik günler 'fill' değeriyle (null = boşluk) doldurulur. */
  function alignDays(rows, getKey, getVals, fill) {
    var map = {}, keys = [];
    rows.forEach(function (r) { var k = String(getKey(r)).replace(/-/g, ''); if (/^\d{8}$/.test(k)) { map[k] = getVals(r); keys.push(k); } });
    if (!keys.length) return { labels: [], keys: [], values: [] };
    keys.sort();
    var start = fmt.parseDay(keys[0]), end = fmt.parseDay(keys[keys.length - 1]);
    var outK = [], outV = [], d = new Date(start.getTime()), guard = 0;
    while (d <= end && guard++ < 4000) {
      var k = fmt.dayKey(d);
      outK.push(k); outV.push(map[k] !== undefined ? map[k] : fill);
      d.setUTCDate(d.getUTCDate() + 1);
    }
    return { keys: outK, labels: outK.map(fmt.dayShort), values: outV };
  }

  /* ---------------- Tarih aralığı denetleyicisi (GA4 / Meta / Google Ads) ----------------
     Mevcut sözleşme: widget → {action:'changeRange', range:'7'|'30'|'all'};
     Velo yalnızca güncel aralığın verisini {..., rangeLabel, rangeKey} olarak geri yollar.
     Ek koruma: bekleyen bir seçim varken farklı rangeKey ile gelen geç yanıt çizilmez.
     Yanıt gelmezse (varsayılan 30 sn) eski veri soluk kalır ve tekrar deneme sunulur. */
  var RANGES_BASE = [{ key: '7', label: '7 gün' }, { key: '30', label: '30 gün' }, { key: 'all', label: 'Tüm zamanlar' }];
  function rangeController(o) {
    /* V2.2: reklam platformlarında uzun dönem "3 yıl" (1095 gün); GA4'te "Tüm zamanlar". Anahtar 'all' aynı kalır. */
    var RANGES = o.allLabel ? [RANGES_BASE[0], RANGES_BASE[1], { key: 'all', label: o.allLabel }] : RANGES_BASE;
    var st = { current: o.initial || '7', pending: null, timer: 0, hasData: false };
    function setPressed(key) { o.root.querySelectorAll('[data-range]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-range') === key)); }); }
    function request(key) {
      st.pending = key; setPressed(key);
      if (o.onPending) o.onPending(key);
      clearTimeout(st.timer);
      st.timer = setTimeout(function () { if (st.pending === key && o.onTimeout) o.onTimeout(key); }, cfg.responseTimeoutMs);
      bridge.send({ action: 'changeRange', range: key });
    }
    /* İlk yanıt hiç gelmezse (Velo hata yakalayıp mesaj göndermediğinde) sonsuz yükleme yerine durum göster. */
    st.timer = setTimeout(function () { if (!st.hasData && !st.pending && o.onInitialTimeout) o.onInitialTimeout(st.current); }, cfg.responseTimeoutMs);
    o.root.addEventListener('click', function (e) {
      var b = e.target.closest('[data-range]'); if (!b) return;
      var key = b.getAttribute('data-range');
      if (key === st.current && !st.pending && st.hasData) return;
      request(key);
    });
    return {
      RANGES: RANGES,
      state: st,
      retry: function () { request(st.pending || st.current); },
      /* Gelen yük kabul edilsin mi? */
      accept: function (d) {
        var k = d.rangeKey || '7';
        if (st.pending) return k === st.pending;
        return k === st.current || !st.hasData;
      },
      isPending: function () { return !!st.pending; },
      done: function (d) { clearTimeout(st.timer); st.current = d.rangeKey || '7'; st.pending = null; st.hasData = true; setPressed(st.current); },
      segHtml: function () { return ui.seg('range', RANGES, st.pending || st.current, 'Tarih aralığı'); }
    };
  }

  /* Aralık seçimi olmayan modüller için ilk veri bekçisi */
  function watchdog(onTimeout) {
    var done = false, t = setTimeout(function () { if (!done) onTimeout(); }, cfg.responseTimeoutMs);
    return function () { done = true; clearTimeout(t); };
  }

  /* ---------------- V2.2 kilit (erişim kodu doğrulanmadan) ----------------
     Velo → embed: { action:'n1iLocked' } / { action:'n1iUnlocked' }. Kilitliyken modül içeriği gizlenir,
     yerine kısa bir bilgi kartı gösterilir; "veri gelmedi" uyarıları kullanıcıya görünmez.
     Kilit yalnızca görünümdür; veri zaten sunucuda oturum olmadan verilmez. */
  (function () {
    var embedded = window.parent !== window;
    function veil() {
      var v = document.querySelector('.n1i-lockveil'); if (v) return v;
      v = document.createElement('div'); v.className = 'n1i-lockveil n1i-glass'; v.setAttribute('role', 'status');
      var T = { summary: 'Genel özet', ga4: 'Google Analytics 4', meta: 'Meta Ads', gads: 'Google Ads', instagram: 'Instagram', sheets: 'İş takip', ai: 'AI rapor asistanı', domain: 'Domain ve lisans', drive: 'Dijital varlık arşivi', glossary: 'Terimler sözlüğü' };
      var name = T[cfg.module] || 'Rapor bölümü';
      v.innerHTML = '<span class="n1i-lockveil__ic" aria-hidden="true">' + icon(T[cfg.module] ? cfg.module : 'info') + '</span><span class="n1i-lockveil__t">' + esc(name) + '</span>' +
        '<span class="n1i-lockveil__s">' + icon('lock') + '<span>Erişim kodundan sonra</span></span>';
      document.body.insertBefore(v, document.body.firstChild); return v;
    }
    window.addEventListener('message', function (e) {
      if (embedded && e.source !== window.parent) return;
      if (cfg.allowedOrigins.length && cfg.allowedOrigins.indexOf(e.origin) === -1) return;
      var d = e.data; if (!d || typeof d !== 'object') return;
      if (d.action === 'n1iLocked') { veil(); document.documentElement.classList.add('n1i-locked'); }
      else if (d.action === 'n1iUnlocked') { document.documentElement.classList.remove('n1i-locked'); }
      else return;
      setTimeout(function () { height.now(); }, 0);
    });
  })();

  /* ---------------- Tema (merkezi protokol) ----------------
     - Varsayılan: AÇIK. prefers-color-scheme okunmaz.
     - Tema seçimi bileşende saklanmaz. Sahibi Wix sayfa kodudur (Velo): tercihi saklar ve
       bütün embed'lere { action:'n1iTheme', theme } gönderir.
     - Embed açılışta { action:'n1iThemeRequest' } ister; ~450 ms içinde yanıt gelmezse açık temada kalır.
     - Değiştirme isteği yalnızca çalışma alanı embed'inden gider: { action:'n1iSetTheme', theme }.
     - Tema değişimi DOM'u yeniden çizmez, veri istemez; yalnızca token ve grafik renkleri değişir. */
  var theme = (function () {
    var de = document.documentElement, listeners = [], current = 'light', first = true, waitTimer = 0;
    de.setAttribute('data-theme', 'light');
    var embedded = window.parent !== window;
    if (embedded && cfg.themeWait !== false) {
      de.classList.add('n1i-theme-wait');
      waitTimer = setTimeout(function () { de.classList.remove('n1i-theme-wait'); first = false; }, cfg.themeWaitMs || 450);
    }
    function apply(t, opts) {
      t = t === 'dark' ? 'dark' : 'light';
      var changed = t !== current;
      var animate = changed && !first && motion.allowed() && !(opts && opts.instant);
      if (animate) { de.classList.add('n1i-theme-anim'); clearTimeout(apply._t); apply._t = setTimeout(function () { de.classList.remove('n1i-theme-anim'); }, 420); }
      current = t;
      de.setAttribute('data-theme', t);
      clearTimeout(waitTimer); de.classList.remove('n1i-theme-wait'); first = false;
      if (changed) {
        charts.retheme();
        listeners.forEach(function (fn) { try { fn(t); } catch (e) {} });
      }
    }
    window.addEventListener('message', function (e) {
      if (embedded && e.source !== window.parent) return;
      if (cfg.allowedOrigins.length && cfg.allowedOrigins.indexOf(e.origin) === -1) return;
      var d = e.data;
      if (!d || typeof d !== 'object' || d.action !== 'n1iTheme' || (d.theme !== 'light' && d.theme !== 'dark')) return;
      apply(d.theme);
    });
    if (embedded) window.parent.postMessage({ action: 'n1iThemeRequest', module: cfg.module }, bridge.parentOrigin());
    return {
      get: function () { return current; },
      onChange: function (fn) { listeners.push(fn); },
      /* Yalnızca çalışma alanı embed'i çağırır: isteği sahibine (Velo) iletir, kendisi uygulamaz. */
      request: function (t) { return bridge.send({ action: 'n1iSetTheme', theme: t === 'dark' ? 'dark' : 'light', module: cfg.module }); },
      _apply: apply
    };
  })();

  /* ---------------- Segment kontrolü: kayan gösterge ----------------
     Seçili düğmenin altına tek bir gösterge yerleşir. GSAP varsa 240 ms kayar; yoksa
     doğrudan konumlanır. Hareket azaltmada animasyon yok. */
  var seg = {
    sync: function (scope, animate, onlyChanged) {
      (scope || document).querySelectorAll('.n1i-seg').forEach(function (s) {
        var btn = s.querySelector('[aria-pressed="true"]');
        var key = btn ? Array.prototype.indexOf.call(s.querySelectorAll('.n1i-seg__btn'), btn) + ':' + btn.offsetWidth : 'none';
        if (onlyChanged && s.getAttribute('data-ind-key') === key) return;
        s.setAttribute('data-ind-key', key);
        var ind = s.querySelector('.n1i-seg__ind');
        if (!ind) { ind = document.createElement('span'); ind.className = 'n1i-seg__ind'; ind.setAttribute('aria-hidden', 'true'); s.insertBefore(ind, s.firstChild); }
        if (!btn || !btn.offsetWidth) { s.classList.remove('has-ind'); return; }
        var to = { x: btn.offsetLeft - 4, width: btn.offsetWidth };
        s.classList.add('has-ind');
        var g = window.gsap;
        if (animate && g && motion.allowed() && s.getAttribute('data-ind-ready')) g.to(ind, { x: to.x, width: to.width, duration: 0.24, ease: 'power3.out', overwrite: true });
        else { if (g) g.set(ind, { x: to.x, width: to.width }); else { ind.style.transform = 'translateX(' + to.x + 'px)'; ind.style.width = to.width + 'px'; } }
        s.setAttribute('data-ind-ready', '1');
      });
    }
  };
  window.addEventListener('resize', function () { clearTimeout(seg._t); seg._t = setTimeout(function () { seg.sync(document, false); }, 80); });
  document.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('.n1i-seg__btn') : null;
    if (b) requestAnimationFrame(function () { seg.sync(b.closest('.n1i-seg').parentNode, true); });
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { seg.sync(document, false); });

  window.N1I = {
    version: VERSION, cdn: CDN, cfg: cfg, fmt: fmt, esc: esc, icon: icon, bridge: bridge, height: height,
    motion: motion, charts: charts, ui: ui, header: header, fitNumbers: fitNumbers, alignDays: alignDays, loadScript: loadScript, DASH: DASH, rangeController: rangeController, RANGES: RANGES_BASE, watchdog: watchdog, theme: theme, seg: seg
  };
})();
