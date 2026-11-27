/*!
 * n1-stress v1.0.0 — 1N Digital Media · V1.3 yarı otomatik mobil stres testi (fiziksel iPhone/iPad Safari için)
 *
 * YALNIZCA test anahtarı v13.1 tarafından, `?n1t=stress` ile başlatılmış bir sekmede yüklenir. Normal ziyaretçide yüklenmez.
 * Yalnızca ana sayfa ve 7 hizmet sayfasında çalışır; diğer bütün sayfalarda (müşteri panelleri, Intelligence vb.) hiçbir şey yapmaz.
 *
 * Ne yapar: seçilen her varyant (B, D, E, Ronin 2× / 1,5× / 1× / poster) için ana sayfa ↔ 7 hizmet sayfası arasında
 *   - ana sayfada Hizmetler bağlantısına kadar kademeli kaydırma + gerçek bağlantıya tıklama,
 *   - "normal" adım: hizmet sayfası yüklenir → kademeli kaydırma sona kadar → history.back(),
 *   - "erken geri" adım: hizmet sayfası yüklenirken (0,5 / 1 / 2 / 3 sn) history.back() — zamanlayıcı test anahtarında (Head) çalışır,
 * döngülerini yürütür; her adımın süreleri, video durumları ve olası çökmeler localStorage'a yazılır.
 *
 * Çökme sonrası devam: durum localStorage'da. iOS sekmeyi yeniden yüklerse test anahtarı varyant bayraklarını geri yükler,
 * bu betik beklenmeyen yeniden yüklemeyi "OLASI ÇÖKME" olarak kaydeder ve 5 sn sonra kaldığı yerden devam eder.
 * Aynı adım 2 kez çökerse adım atlanır (sonsuz döngü yok).
 *
 * Ölçülemeyenler (iOS Safari): bellek (performance.memory yok), Düşük Güç Modu, termal durum, kod çözücü sayısı, kesin çökme nedeni.
 * "OLASI ÇÖKME" bir çıkarımdır: beklenmeyen bir belge yeniden yüklemesidir; kesin çökme kanıtı değildir.
 */
(function () {
  'use strict';
  if (window.__n1Stress) return;
  var VERSION = '1.0.0';

  /* ---------- yalnız 1N kurumsal ana sayfa + 7 hizmet sayfası ---------- */
  var HOME = '/';
  var PAGES = ['/kreatif-produksiyon', '/e-ticaret-yonetimi', '/sosyal-medya', '/reklam-yonetimi', '/ui-ux-tasarim', '/yapay-zeka', '/uygulama-gelistirme'];
  var TAGS = { '/': 'n1-site-v1', '/kreatif-produksiyon': 'n1-kreatif-produksiyon-v23', '/e-ticaret-yonetimi': 'n1-e-ticaret-yonetimi-v23',
    '/sosyal-medya': 'n1-sosyal-medya-v27', '/reklam-yonetimi': 'n1-reklam-yonetimi-v23', '/ui-ux-tasarim': 'n1-uiux-tasarim-v28',
    '/yapay-zeka': 'n1-yapay-zeka-v2', '/uygulama-gelistirme': 'n1-uygulama-gelistirme-v2' };
  function curPath() { return (location.pathname.replace(/\/+$/, '') || '/'); }
  var PATH = curPath();
  if (!TAGS[PATH]) return;
  window.__n1Stress = { version: VERSION };

  /* ---------- varyantlar (test anahtarı bayrakları) ---------- */
  var VARIANTS = {
    B:   { label: 'B · yayındaki V1.3', flags: {} },
    D:   { label: 'D · + stabilite modülü', flags: { stab: '1' } },
    E:   { label: 'E · loader kapalı', flags: { loader: 'off' } },
    R2:  { label: 'Ronin 2× (zorunlu)', flags: { hero: '2x' } },
    R15: { label: 'Ronin 1,5×', flags: { hero: '1.5x' } },
    R1:  { label: 'Ronin 1×', flags: { hero: '1x' } },
    RP:  { label: 'Ronin yalnız poster', flags: { hero: 'poster' } }
  };
  var ORDER = ['B', 'D', 'E', 'R2', 'R15', 'R1', 'RP'];
  var EARLY = [500, 1000, 2000, 3000];

  /* ---------- depolama (localStorage: sekme çökse de kalır) ---------- */
  var K = { active: 'n1s-active', flags: 'n1s-flags', eb: 'n1s-eb', ebdone: 'n1s-ebdone', state: 'n1s-state', log: 'n1s-log' };
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } }
  function lsDel(k) { try { localStorage.removeItem(k); } catch (e) {} }
  function jget(k, d) { try { var v = lsGet(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function jset(k, o) { return lsSet(k, JSON.stringify(o)); }
  function logAll() { var s = lsGet(K.log); if (!s) return []; return s.split('\n').filter(Boolean).map(function (l) { try { return JSON.parse(l); } catch (e) { return null; } }).filter(Boolean); }
  function logAdd(rec) { var s = lsGet(K.log) || ''; if (!lsSet(K.log, s + JSON.stringify(rec) + '\n')) note('UYARI: kayıt yazılamadı (depolama dolu/özel mod?)'); }

  var st = null;
  function load() { st = jget(K.state, null); return st; }
  function save() { if (st) { st.pt = Date.now(); jset(K.state, st); } }

  /* ---------- plan ---------- */
  function modesOf(plan) { return plan.modes === 'n' ? ['n'] : plan.modes === 'e' ? ['e'] : ['n', 'e']; }
  function pagesOf(plan) { return PAGES.slice(0, plan.np || PAGES.length); }
  function total(plan) { return plan.vars.length * plan.rep * pagesOf(plan).length * modesOf(plan).length; }
  function stepAt(plan, i) {
    var PG = pagesOf(plan), M = modesOf(plan), perR = PG.length * M.length, perV = plan.rep * perR;
    var vi = Math.floor(i / perV), a = i % perV, r = Math.floor(a / perR), b = a % perR, pi = Math.floor(b / M.length), m = M[b % M.length];
    return { i: i, v: plan.vars[vi], r: r + 1, p: PG[pi], m: m, d: m === 'e' ? EARLY[(pi + r) % EARLY.length] : 0 };
  }
  function applyFlags(v) {
    var f = (VARIANTS[v] || VARIANTS.B).flags;
    jset(K.flags, f);
    try {   // bu sekmede hemen geçerli olsun (test anahtarı her sayfada localStorage'dan yeniden uygular)
      Object.keys(sessionStorage).forEach(function (k) { if (k.indexOf('n1t-') === 0 && k !== 'n1t-stress') sessionStorage.removeItem(k); });
      sessionStorage.setItem('n1t', '1'); sessionStorage.setItem('n1t-stress', '1');
      Object.keys(f).forEach(function (k) { sessionStorage.setItem('n1t-' + k, f[k]); });
    } catch (e) {}
  }

  /* ---------- ölçüm yardımcıları (hafif; yalnız gerektiğinde) ---------- */
  function navEntry() { try { return performance.getEntriesByType('navigation')[0] || null; } catch (e) { return null; } }
  function navType(persisted) { if (persisted) return 'bfcache'; var n = navEntry(); return n ? n.type : (performance.navigation ? ['navigate', 'reload', 'back_forward'][performance.navigation.type] || 'navigate' : '?'); }
  function r0(x) { return x > 0 ? Math.round(x) : null; }
  function timing() { var n = navEntry(); if (!n) return {}; return { ttfb: r0(n.responseStart), dcl: r0(n.domContentLoadedEventEnd), load: r0(n.loadEventEnd) }; }
  function fileOf(u) { u = u || ''; if (u.indexOf('data:') === 0) return 'poster-only'; return u.split('?')[0].split('/').pop() || '-'; }
  function videos() {
    var v = document.getElementsByTagName('video'), o = { n: v.length, src: 0, play: 0, err: 0 };
    for (var i = 0; i < v.length; i++) { if (v[i].currentSrc) o.src++; if (!v[i].paused && v[i].readyState > 2) o.play++; if (v[i].error) o.err++; }
    var h = document.querySelector('[data-m4-film]'), hv = h && h.querySelector('video');
    if (hv) { o.hero = fileOf(hv.currentSrc || hv.getAttribute('data-src')); o.heroRes = hv.videoWidth ? hv.videoWidth + 'x' + hv.videoHeight : '0x0'; o.heroSt = h.getAttribute('data-n1v-state') || ''; }
    return o;
  }
  function errs() { var e = window.__n1sErr || []; return { n: e.length, last: e.slice(-2).join(' | ').slice(0, 160) }; }
  // sayfanın ana bileşeni kuruldu mu / loader kalktı mı: 250 ms'de bir, en çok 20 sn (yalnız bu iki öğeye bakar)
  function waitReady(cb) {
    var tag = TAGS[curPath()], t0 = performance.now(), ce = null, ld = null, n = 0;
    (function poll() {
      var now = performance.now(), el = document.getElementsByTagName(tag)[0];
      if (ce == null && el && el.childElementCount > 0 && el.querySelector('section,main')) ce = Math.round(now);
      if (ld == null && !document.getElementById('n1GlobalLoader')) ld = Math.round(now);
      if ((ce != null && ld != null) || now - t0 > 20000) return cb({ ce: ce, loader: ld, waited: Math.round(now - t0) });
      n++; setTimeout(poll, 250);
    })();
  }

  /* ---------- panel ---------- */
  var ui = {};
  function el(tag, css, txt) { var e = document.createElement(tag); if (css) e.style.cssText = css; if (txt != null) e.textContent = txt; return e; }
  var BTN = 'font:600 12px/1 -apple-system,system-ui,sans-serif;color:#0b0d0c;background:#a8cf62;border:0;border-radius:6px;padding:8px 10px;margin:6px 6px 0 0';
  function panel() {
    if (ui.root && ui.root.isConnected) return ui.root;
    var r = el('div', 'position:fixed;left:8px;bottom:8px;z-index:2147483647;width:min(70vw,330px);max-height:70vh;overflow:auto;' +
      'font:11px/1.4 ui-monospace,Menlo,monospace;color:#e8ffe0;background:rgba(0,0,0,.86);border:1px solid #a8cf62;border-radius:8px;padding:8px;' +
      'pointer-events:auto;-webkit-user-select:text;user-select:text;view-transition-name:n1-stress-panel');
    r.id = 'n1-stress-panel';
    ui.title = el('div', 'font-weight:700;color:#a8cf62', 'N1 STRES ' + VERSION); ui.l1 = el('div'); ui.l2 = el('div'); ui.l3 = el('div', 'color:#ffb4a8'); ui.btns = el('div');
    r.appendChild(ui.title); r.appendChild(ui.l1); r.appendChild(ui.l2); r.appendChild(ui.l3); r.appendChild(ui.btns);
    (document.body || document.documentElement).appendChild(r); ui.root = r; return r;
  }
  function btn(label, fn) { var b = el('button', BTN, label); b.type = 'button'; b.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); fn(); }); ui.btns.appendChild(b); return b; }
  function note(t) { panel(); ui.l3.textContent = t; }
  function status() {
    if (!st) return; panel();
    var T = total(st.plan), s = st.i < T ? stepAt(st.plan, st.i) : null, L = logAll(), crash = L.filter(function (x) { return x.crash; }).length;
    ui.l1.textContent = s ? ('Varyant ' + (st.plan.vars.indexOf(s.v) + 1) + '/' + st.plan.vars.length + ': ' + VARIANTS[s.v].label) : 'Tamamlandı';
    ui.l2.textContent = s ? ('Adım ' + (st.i + 1) + '/' + T + ' · tekrar ' + s.r + ' · ' + s.p + ' · ' + (s.m === 'e' ? 'erken geri ' + s.d + ' ms' : 'normal') + ' · ' + (st.phase || '')) : (T + ' adım');
    ui.title.textContent = 'N1 STRES ' + VERSION + ' · olası çökme: ' + crash + (st.paused ? ' · DURAKLATILDI' : '');
    ui.btns.innerHTML = '';
    if (s) btn(st.paused ? 'Devam' : 'Duraklat', function () { st.paused = !st.paused; save(); status(); if (!st.paused) proceed(); });
    btn('Rapor', showReport);
    btn('Durdur', function () { if (!confirm('Test durdurulsun mu? Kaydedilen sonuçlar silinmez.')) return; stopRun(); });
  }

  /* ---------- kurulum ekranı ---------- */
  function showSetup() {
    panel(); ui.title.textContent = 'N1 STRES ' + VERSION + ' · kurulum';
    ui.l1.textContent = 'Ekranı açık tutun (Ayarlar → Ekran → Otomatik Kilit: Hiçbir Zaman), Safari önde kalsın.';
    ui.l2.innerHTML = ''; ui.l3.textContent = ''; ui.btns.innerHTML = '';
    var box = el('div', 'margin-top:6px');
    ORDER.forEach(function (v) {
      var lab = el('label', 'display:block;padding:3px 0'); var cb = el('input'); cb.type = 'checkbox'; cb.checked = true; cb.value = v; cb.style.marginRight = '6px';
      lab.appendChild(cb); lab.appendChild(document.createTextNode(VARIANTS[v].label)); box.appendChild(lab);
    });
    var rep = el('select', 'margin:6px 6px 0 0'); [1, 2, 3].forEach(function (n) { var o = el('option', null, n + ' tekrar'); o.value = n; rep.appendChild(o); });
    var mode = el('select', 'margin:6px 0 0 0'); [['ne', 'normal + erken geri'], ['n', 'yalnız normal'], ['e', 'yalnız erken geri']].forEach(function (m) { var o = el('option', null, m[1]); o.value = m[0]; mode.appendChild(o); });
    var np = el('select', 'margin:6px 6px 0 0'); [[7, '7 hizmet sayfası (tam)'], [3, '3 sayfa (kısa deneme)']].forEach(function (m) { var o = el('option', null, m[1]); o.value = m[0]; np.appendChild(o); });
    var est = el('div', 'color:#bdbcb5;margin-top:4px');
    function upd() { var vars = [].slice.call(box.querySelectorAll('input:checked')).map(function (c) { return c.value; }); var p = { vars: vars, rep: +rep.value, modes: mode.value, np: +np.value };
      var t = total(p), mins = Math.round(vars.length * +rep.value * (+np.value) * ((mode.value !== 'e' ? 55 : 0) + (mode.value !== 'n' ? 22 : 0)) / 60);
      est.textContent = t + ' adım · tahmini ' + mins + ' dk (sayfa ve bağlantı hızına göre değişir)'; return p; }
    [box, rep, mode, np].forEach(function (x) { x.addEventListener('change', upd); });
    ui.l2.appendChild(box); ui.l2.appendChild(rep); ui.l2.appendChild(mode); ui.l2.appendChild(np); ui.l2.appendChild(est); upd();
    var prev = logAll().length;
    btn('Başlat', function () { var p = upd(); if (!p.vars.length) return; startRun(p); });
    if (prev) { btn('Önceki rapor (' + prev + ')', showReport); btn('Sonuçları sil', function () { if (confirm('Kayıtlı ' + prev + ' sonuç silinsin mi?')) { lsDel(K.log); showSetup(); } }); }
    btn('Test modunu kapat', function () { location.href = '/?n1t=0'; });
  }

  /* ---------- akış ---------- */
  function startRun(plan) {
    st = { v: 1, run: true, paused: false, plan: plan, i: 0, phase: 'goHome', cur: null, tries: {}, startedAt: Date.now(), ua: navigator.userAgent,
      scr: screen.width + 'x' + screen.height + '@' + (window.devicePixelRatio || 1) };
    lsSet(K.active, '1'); logAdd({ t: Date.now(), ev: 'start', plan: plan, ua: st.ua, scr: st.scr, ver: VERSION });
    applyFlags(stepAt(plan, 0).v); save(); location.assign('/');
  }
  function stopRun() {
    if (st) { st.run = false; save(); }
    logAdd({ t: Date.now(), ev: 'stop', i: st ? st.i : null });
    [K.active, K.flags, K.eb, K.ebdone, K.state].forEach(lsDel);
    location.href = '/?n1t=0';
  }
  function later(fn, ms) { setTimeout(function () { if (!st || !st.run) return; if (st.paused) { status(); return; } fn(); }, ms); }
  function setPhase(p) { st.phase = p; st.pht = Date.now(); save(); status(); }

  // yeni belge (ya da BFCache dönüşü) geldiğinde: beklenen mi, beklenmeyen mi?
  function arrive(persisted) {
    load();
    if (!st || !st.run) { if (lsGet(K.active) !== '1') showSetup(); return; }
    var nt = navType(persisted), path = curPath(), cur = st.cur || {}, ph = st.phase, gap = st.pht ? Date.now() - st.pht : 0;
    var T = total(st.plan);
    if (st.i >= T) return done();
    var anomaly = null;
    if (ph === 'goHome') {
      if (path !== HOME) anomaly = 'beklenmeyen sayfa (' + path + ')';
      else { st.cur = { i: st.i, homeNt: nt, homeT: timing() }; save(); return later(homeWork, 600); }
    } else if (ph === 'nav') {
      if (path === cur.p) { cur.pageNt = nt; if (nt === 'reload') anomaly = 'OLASI ÇÖKME: hizmet sayfası yüklenirken yeniden yüklendi'; }
      else if (path === HOME && cur.m === 'e') { cur.earlyBeforeRunner = 1; return homeAfterBack(nt, persisted); }
      else if (path === HOME) anomaly = nt === 'reload' ? 'OLASI ÇÖKME: geçiş sırasında ana sayfa yeniden yüklendi' : 'gidiş gerçekleşmedi';
      else anomaly = 'beklenmeyen sayfa (' + path + ')';
      if (!anomaly) { st.cur = cur; return pageArrived(); }
    } else if (ph === 'page') {
      anomaly = 'OLASI ÇÖKME: ' + (path === cur.p ? 'hizmet sayfası üzerindeyken yeniden yüklendi' : 'hizmet sayfası üzerindeyken beklenmeyen gezinme') + ' (' + nt + ')';
    } else if (ph === 'back') {
      if (path === HOME) return homeAfterBack(nt, persisted);
      anomaly = (path === cur.p && nt === 'reload') ? 'OLASI ÇÖKME: geri dönüşte hizmet sayfası yeniden yüklendi' : 'geri dönüş ana sayfaya ulaşmadı (' + path + ', ' + nt + ')';
    } else if (ph === 'settle') {   // geri sonrası 4 sn: Wix ATS ana sayfayı yeniden yükleyebilir (çökme sayılmaz, ayrıca sayılır)
      if (path === HOME) { cur.backReload = (cur.backReload || 0) + 1; st.cur = cur; save(); return later(finishStep, 3000); }
      anomaly = 'beklenmeyen sayfa (' + path + ')';
    } else if (ph === 'home') {
      anomaly = 'OLASI ÇÖKME: ana sayfada (bekleme/kaydırma) yeniden yüklendi (' + nt + ')';
    } else anomaly = 'bilinmeyen aşama ' + ph;
    if (gap > 90000) anomaly += ' · ' + Math.round(gap / 1000) + ' sn ara (ekran kilidi/arka plan olabilir)';
    return onAnomaly(anomaly, nt, path);
  }

  function onAnomaly(msg, nt, path) {
    var cur = st.cur || {}, s = stepAt(st.plan, st.i), crash = /OLASI ÇÖKME/.test(msg);
    st.tries[st.i] = (st.tries[st.i] || 0) + 1;
    logAdd(Object.assign({ t: Date.now(), ev: 'step', crash: crash ? 1 : 0, anomaly: msg, at: path, nt: nt, phase: st.phase, try: st.tries[st.i], vids: videos(), errs: errs() }, s, cur));
    var skip = st.tries[st.i] >= 2;
    if (skip) { logAdd({ t: Date.now(), ev: 'skip', i: st.i, why: 'aynı adımda 2 sorun' }); st.i++; }
    st.cur = null; st.phase = 'goHome'; save();
    note(msg + (skip ? ' · adım atlandı' : ' · adım tekrarlanacak') + ' · 5 sn sonra devam');
    if (st.i >= total(st.plan)) return done();
    applyFlags(stepAt(st.plan, st.i).v);
    later(function () { location.assign('/'); }, 5000);
  }

  /* ana sayfa: hazır olunca ölç, Hizmetler bağlantısına kademeli kaydır, bağlantıya tıkla */
  function homeWork() {
    var s = stepAt(st.plan, st.i); setPhase('home');
    waitReady(function (rd) {
      var cur = st.cur || { i: st.i }; cur.homeReady = rd; cur.homeVid = videos(); st.cur = cur; save();
      var sel = 'a.n1m-svc-link[href="' + s.p + '"],a.m4-svc-a[href="' + s.p + '"],#hizmetler-ozet a[href="' + s.p + '"]';
      var t0 = Date.now();
      (function findLink() {   // mobil Hizmetler bölümü gecikmeli kurulabilir: en çok 8 sn bekle
        var a = document.querySelector(sel);
        if (!a && Date.now() - t0 < 8000) return later(findLink, 400);
        var target = a ? Math.max(0, a.getBoundingClientRect().top + scrollY - innerHeight / 2) : 0;
        gradual(target, 300, 250, function () { later(function () { go(s, document.querySelector(sel)); }, 700); });
      })();
    });
  }
  function go(s, a) {
    var cur = { i: s.i, v: s.v, r: s.r, p: s.p, m: s.m, d: s.d, tClick: Date.now(), homeNt: (st.cur || {}).homeNt, homeReady: (st.cur || {}).homeReady, homeVid: (st.cur || {}).homeVid };
    if (s.m === 'e') jset(K.eb, { id: 'e' + s.i + '-' + (st.tries[s.i] || 0) + '-' + Date.now(), path: s.p, ms: s.d }); else lsDel(K.eb);
    st.cur = cur; setPhase('nav');
    if (a) { cur.how = 'bağlantı'; save(); a.click(); }
    else { cur.how = 'doğrudan (bağlantı bulunamadı)'; save(); location.assign(s.p); }
    // gezinme 25 sn içinde gerçekleşmezse
    later(function () { if (curPath() === HOME && st.phase === 'nav') onAnomaly('gezinme 25 sn içinde başlamadı', navType(false), HOME); }, 25000);
  }
  /* hizmet sayfası */
  function pageArrived() {
    var cur = st.cur, n = navEntry();
    cur.navStartDelay = (performance.timeOrigin && cur.tClick) ? Math.round(performance.timeOrigin - cur.tClick) : null;
    if (cur.m === 'e') {   // geri, test anahtarı tarafından (Head) zamanlanmış durumda
      setPhase('back');
      waitReady(function (rd) { cur.pageReady = rd; cur.pageT = timing(); cur.pageVid = videos(); st.cur = cur; save(); });
      later(function () { if (curPath() === cur.p && st.phase === 'back') { cur.ebLate = 1; st.cur = cur; save(); history.back(); } }, cur.d + 6000);
      return;
    }
    setPhase('page');
    waitReady(function (rd) {
      cur.pageReady = rd; cur.pageVid = videos(); st.cur = cur; save();
      later(function () {
        var t0 = Date.now(), H = Math.max(0, document.documentElement.scrollHeight - innerHeight);
        gradual(H, 200, 300, function (steps) {
          cur.scroll = { px: Math.round(scrollY), steps: steps, ms: Date.now() - t0 }; cur.pageT = timing(); cur.pageVidEnd = videos(); cur.errs = errs(); st.cur = cur;
          setPhase('back');
          later(function () { cur.tBack = Date.now(); st.cur = cur; save(); history.back(); }, 1000);
        });
      }, 1500);
    });
  }
  function homeAfterBack(nt, persisted) {
    var cur = st.cur || {}; cur.backNt = nt; cur.tHome = Date.now();
    var eb = jget(K.eb, null), ebd = lsGet(K.ebdone); if (cur.m === 'e') { cur.ebFired = !!(eb && ebd === eb.id); cur.ebAt = cur.ebFired ? jget('n1s-ebat', null) : null; }
    st.cur = cur; setPhase('settle');
    later(finishStep, 4000);
  }
  function finishStep() {
    var cur = st.cur || {};
    waitReady(function (rd) {
      cur.homeBackReady = rd; cur.homeBackVid = videos();
      logAdd(Object.assign({ t: Date.now(), ev: 'step', crash: 0, try: (st.tries[st.i] || 0) + 1 }, stepAt(st.plan, st.i), cur));
      lsDel(K.eb);
      var prevV = stepAt(st.plan, st.i).v; st.i++; st.cur = null;
      if (st.i >= total(st.plan)) { save(); return done(); }
      var s = stepAt(st.plan, st.i);
      if (s.v !== prevV) { applyFlags(s.v); st.phase = 'goHome'; save(); status(); return later(function () { location.assign('/'); }, 1000); }
      st.cur = { i: st.i, homeNt: 'devam', homeT: null }; save(); homeWork();
    });
  }
  function done() {
    st.run = false; st.phase = 'done'; save(); lsDel(K.active); lsDel(K.flags); lsDel(K.eb);
    logAdd({ t: Date.now(), ev: 'done' });
    panel(); ui.title.textContent = 'N1 STRES ' + VERSION + ' · TAMAMLANDI'; ui.l1.textContent = 'Test bitti. Raporu kopyalayın ya da indirin.'; ui.l2.textContent = ''; ui.btns.innerHTML = '';
    btn('Rapor', showReport); btn('Test modunu kapat', function () { location.href = '/?n1t=0'; });
  }
  function proceed() {   // duraklatmadan dönüş
    load(); if (!st || !st.run) return;
    if (st.phase === 'home' || st.phase === 'goHome') return curPath() === HOME ? homeWork() : location.assign('/');
    if (st.phase === 'page') return pageArrived();
    if (st.phase === 'settle') return finishStep();
    if (st.phase === 'back') return history.back();
  }
  // kademeli kaydırma: stepPx / ms; hedefe ya da 150 adıma kadar
  function gradual(target, stepPx, ms, cb) {
    var y = scrollY, n = 0;
    (function tick() {
      if (!st || !st.run) return; if (st.paused) return status();
      if (y >= target - 2 || n >= 150) return cb(n);
      y = Math.min(target, y + stepPx); n++;
      try { window.scrollTo(0, y); } catch (e) {}
      if (n % 10 === 0 && ui.l3) { ui.l3.textContent = 'kaydırma ' + Math.round(100 * y / Math.max(1, target)) + '%'; }
      setTimeout(tick, ms);
    })();
  }

  /* ---------- rapor ---------- */
  function med(a) { a = a.filter(function (x) { return typeof x === 'number'; }).sort(function (x, y) { return x - y; }); return a.length ? a[Math.floor((a.length - 1) / 2)] : '–'; }
  function buildReport() {
    var L = logAll(), steps = L.filter(function (x) { return x.ev === 'step'; }), start = L.filter(function (x) { return x.ev === 'start'; }).pop() || {};
    var out = [];
    out.push('# 1N V1.3 mobil stres testi — sonuç raporu');
    out.push('Betik ' + VERSION + ' · rapor ' + new Date().toISOString());
    out.push('Cihaz: ' + (start.ua || navigator.userAgent) + ' · ekran ' + (start.scr || ''));
    out.push('Plan: ' + (start.plan ? JSON.stringify(start.plan) : '-'));
    out.push('Erken geri: geri, yeni sayfanın Head kodu çalışır çalışmaz zamanlanır; CSV ebAtMs = gerçek tetiklenme anı (gezinme başlangıcından ms), ebReadyState = o andaki belge durumu.');
    out.push('NOT: "OLASI ÇÖKME" = beklenmeyen belge yeniden yüklemesi (iOS sekmeyi yeniden yükledi ya da kullanıcı yeniden yükledi). Kesin çökme kanıtı değildir. Bellek ölçülmez (Safari desteklemez).');
    out.push('');
    out.push('## Varyant özeti');
    out.push('| Varyant | Adım (tamam/sorun) | OLASI ÇÖKME | Atlanan | Geri sonrası yeniden yükleme (Wix ATS?) | Erken geri tetiklendi | Hizmet sayfası TTFB / DCL / bileşen hazır (medyan ms) | Ana sayfa Ronin (kaynak, çözünürlük, durum) | 1N JS hatası |');
    out.push('|---|---|---|---|---|---|---|---|---|');
    var skips = L.filter(function (x) { return x.ev === 'skip'; });
    ORDER.forEach(function (v) {
      var S = steps.filter(function (x) { return x.v === v; }); if (!S.length) return;
      var ok = S.filter(function (x) { return !x.anomaly; }), cr = S.filter(function (x) { return x.crash; }), an = S.filter(function (x) { return x.anomaly && !x.crash; });
      var heroes = {}; S.forEach(function (x) { var h = x.homeVid || x.homeBackVid; if (h && h.hero) { var k = h.hero + ' ' + h.heroRes + ' ' + h.heroSt; heroes[k] = (heroes[k] || 0) + 1; } });
      var hk = Object.keys(heroes).sort(function (a, b) { return heroes[b] - heroes[a]; }).slice(0, 2).join('; ');
      var e = S.filter(function (x) { return x.m === 'e'; });
      out.push('| ' + VARIANTS[v].label + ' | ' + ok.length + ' / ' + (cr.length + an.length) + ' | ' + cr.length + ' | ' +
        skips.filter(function (k) { var s = start.plan ? stepAt(start.plan, k.i) : null; return s && s.v === v; }).length + ' | ' +
        S.filter(function (x) { return x.backNt === 'reload' || x.backReload; }).length + ' | ' +
        e.filter(function (x) { return x.ebFired || x.earlyBeforeRunner; }).length + '/' + e.length + ' | ' +
        med(ok.map(function (x) { return x.pageT && x.pageT.ttfb; })) + ' / ' + med(ok.map(function (x) { return x.pageT && x.pageT.dcl; })) + ' / ' + med(ok.map(function (x) { return x.pageReady && x.pageReady.ce; })) + ' | ' +
        (hk || '–') + ' | ' + S.reduce(function (a, x) { return a + ((x.errs && x.errs.n) || 0); }, 0) + ' |');
    });
    out.push('');
    out.push('## Sayfa × varyant: OLASI ÇÖKME / adım');
    out.push('| Sayfa | ' + ORDER.filter(function (v) { return steps.some(function (x) { return x.v === v; }); }).map(function (v) { return v; }).join(' | ') + ' |');
    out.push('|---|' + ORDER.filter(function (v) { return steps.some(function (x) { return x.v === v; }); }).map(function () { return '---'; }).join('|') + '|');
    PAGES.filter(function (p) { return steps.some(function (x) { return x.p === p; }); }).forEach(function (p) {
      out.push('| ' + p + ' | ' + ORDER.filter(function (v) { return steps.some(function (x) { return x.v === v; }); }).map(function (v) {
        var S = steps.filter(function (x) { return x.v === v && x.p === p; }); return S.filter(function (x) { return x.crash; }).length + '/' + S.length; }).join(' | ') + ' |');
    });
    out.push('');
    out.push('## Sorunlu adımlar');
    var bad = steps.filter(function (x) { return x.anomaly; });
    if (!bad.length) out.push('Yok.');
    bad.forEach(function (x) { out.push('- ' + new Date(x.t).toLocaleTimeString() + ' · ' + (VARIANTS[x.v] || {}).label + ' · ' + x.p + ' · ' + (x.m === 'e' ? 'erken geri ' + x.d + ' ms' : 'normal') + ' · deneme ' + x.try + ' · ' + x.anomaly + ' · aşama ' + x.phase + ' · videolar ' + JSON.stringify(x.vids || {}) + (x.errs && x.errs.n ? ' · hata: ' + x.errs.last : '')); });
    out.push('');
    out.push('## Ham veri (CSV)');
    out.push(csv(steps));
    return out.join('\n');
  }
  function csv(steps) {
    var cols = ['t', 'v', 'r', 'p', 'm', 'd', 'try', 'crash', 'anomaly', 'how', 'pageNt', 'backNt', 'backReload', 'ebFired', 'ebAtMs', 'ebReadyState', 'ebVideos', 'ebLoader', 'earlyBeforeRunner', 'navStartDelay', 'ttfb', 'dcl', 'load', 'ceReady', 'loaderGone', 'scrollSteps', 'scrollMs', 'pageVideos', 'pagePlaying', 'homeHero', 'homeHeroRes', 'homeHeroState', 'homePlaying', 'homeBackReadyMs', 'errs'];
    var rows = [cols.join(',')];
    steps.forEach(function (x) {
      var pt = x.pageT || {}, pr = x.pageReady || {}, pv = x.pageVidEnd || x.pageVid || {}, hv = x.homeVid || {}, hb = x.homeBackReady || {};
      var r = [new Date(x.t).toISOString(), x.v, x.r, x.p, x.m, x.d, x.try, x.crash, x.anomaly || '', x.how || '', x.pageNt || '', x.backNt || '', x.backReload || 0, x.ebFired ? 1 : 0, x.ebAt && x.ebAt.ms, x.ebAt && x.ebAt.rs, x.ebAt && x.ebAt.vids, x.ebAt ? (x.ebAt.loader ? 1 : 0) : '', x.earlyBeforeRunner ? 1 : 0,
        x.navStartDelay, pt.ttfb, pt.dcl, pt.load, pr.ce, pr.loader, x.scroll && x.scroll.steps, x.scroll && x.scroll.ms, pv.n, pv.play, hv.hero, hv.heroRes, hv.heroSt, hv.play, hb.waited, (x.errs && x.errs.n) || 0];
      rows.push(r.map(function (c) { c = c == null ? '' : String(c); return /[",\n]/.test(c) ? '"' + c.replace(/"/g, '""') + '"' : c; }).join(','));
    });
    return rows.join('\n');
  }
  function showReport() {
    var txt = buildReport();
    var ov = el('div', 'position:fixed;inset:0;z-index:2147483647;background:rgba(0,0,0,.92);padding:12px;display:flex;flex-direction:column;gap:8px');
    var ta = el('textarea', 'flex:1;width:100%;font:11px/1.35 ui-monospace,Menlo,monospace;color:#e8ffe0;background:#0b0d0c;border:1px solid #a8cf62;border-radius:6px;padding:8px');
    ta.readOnly = true; ta.value = txt;
    var bar = el('div'); ov.appendChild(ta); ov.appendChild(bar);
    function b(label, fn) { var x = el('button', BTN, label); x.type = 'button'; x.addEventListener('click', fn); bar.appendChild(x); }
    b('Kopyala', function () {
      var ok = function () { note('Rapor panoya kopyalandı.'); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(ok, function () { ta.focus(); ta.select(); document.execCommand('copy'); ok(); });
      else { ta.focus(); ta.select(); try { document.execCommand('copy'); ok(); } catch (e) {} }
    });
    if (navigator.share) b('Paylaş', function () { navigator.share({ title: '1N stres testi', text: txt }).catch(function () {}); });
    b('İndir (.md)', function () { dl(txt, 'n1-stres-' + Date.now() + '.md', 'text/markdown'); });
    b('İndir (.csv)', function () { dl(csv(logAll().filter(function (x) { return x.ev === 'step'; })), 'n1-stres-' + Date.now() + '.csv', 'text/csv'); });
    b('Kapat', function () { ov.remove(); });
    document.body.appendChild(ov);
  }
  function dl(text, name, type) {
    try { var u = URL.createObjectURL(new Blob([text], { type: type + ';charset=utf-8' })), a = el('a'); a.href = u; a.download = name; document.body.appendChild(a); a.click();
      setTimeout(function () { URL.revokeObjectURL(u); a.remove(); }, 4000); } catch (e) { note('İndirme desteklenmedi; Kopyala kullanın.'); }
  }

  /* ---------- başlangıç ---------- */
  document.addEventListener('visibilitychange', function () {
    if (!st || !st.run) return;
    if (document.visibilityState === 'hidden') { st.hidden = (st.hidden || 0) + 1; save(); }
  });
  window.addEventListener('pageshow', function (e) { if (e.persisted) { if (ui.root) ui.root.remove(); ui.root = null; arrive(true); } });
  function boot() { arrive(false); if (st && st.run) status(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true }); else boot();
})();
