/*!
 * n1-stress v2.0.0 — 1N Digital Media · V1.3.2 güvenilir mobil stres testi (fiziksel iPhone / iPad Safari)
 *
 * Yalnız test anahtarı v13.2 ile `?n1t=stress2` açılmış sekmede, yalnız ana sayfa + 7 hizmet sayfasında yüklenir.
 *
 * V1.3.1'den (n1-stress-v1.js) farkları — STRESS_V132_REPORT.md §2'deki kök nedenler:
 *  1. Tek denetleyici + monoton durum makinesi: her yazma "karşılaştır-ve-yaz" (rev). Belgenin bildiği rev, depodaki ile aynı değilse
 *     yazamaz → BFCache'ten dönen eski belgeler durumu geri alamaz.
 *  2. Kuşak (generation) koruması: pagehide / pageshow kuşağı artırır; eski kuşağın bütün zamanlayıcıları ve geri çağrıları etkisizdir.
 *  3. Kimlikler: runId (çalıştırma), stepId (plan adımı, en çok plan uzunluğu), attemptId (deneme), docId (belge), tabId (sekme).
 *     Sonuçlar attemptId anahtarıyla idempotent yazılır (aynı deneme iki kez kaydedilmez, yalnız birleştirilir).
 *  4. Geçmiş büyümez: kurtarma ve her denemenin başlangıcı location.replace('/') — geçmişte en çok [ana sayfa, hizmet sayfası].
 *     Her deneme TAZE bir ana sayfa belgesiyle başlar (eşit başlangıç koşulu).
 *  5. Sınıflandırma (navigation type + beklenen geçiş jetonu):
 *       ok · çökme adayı (beklenmeyen yeniden yükleme: Safari çökme sonrası yeniden yükleme YA DA elle yeniden yükleme — ayırt edilemez)
 *       · Wix ATS yeniden yüklemesi (olası) · beklenmeyen gezinme · yanlış geçmiş girdisi · test zaman aşımı · arka plan/kilit arası.
 *     BFCache dönüşü tek başına hiçbir zaman çökme sayılmaz. Doğrudan ana sayfaya gitmek başarılı "geri" sayılmaz.
 *  6. Tek sekme: sekme kirası (lease). Başka sekmede etkin test varken bu sekme pasif kalır ("Bu sekmeye al" ile devralınır).
 *  7. Video ölçümü: başlangıçta video kontrolü (otomatik oynatma; gerekirse tek gerçek dokunuş); her ölçümde currentTime ilerlemesi,
 *     readyState, networkState, videoWidth/Height, paused, kaynak, medya olay sayaçları. Video bekleyen varyantta oynatma doğrulanmazsa
 *     deneme "video geçersiz" işaretlenir.
 *
 * Ölçülemeyenler: bellek, GPU, Düşük Güç Modu (dolaylı: otomatik oynatma engeli), kesin çökme nedeni.
 */
(function () {
  'use strict';
  if (window.__n1Stress2) return;
  var VERSION = '2.0.0';

  /* ---------- kapsam ---------- */
  var HOME = '/';
  var ALL_PAGES = ['/kreatif-produksiyon', '/e-ticaret-yonetimi', '/sosyal-medya', '/reklam-yonetimi', '/ui-ux-tasarim', '/yapay-zeka', '/uygulama-gelistirme'];
  var TAGS = { '/': 'n1-site-v1', '/kreatif-produksiyon': 'n1-kreatif-produksiyon-v23', '/e-ticaret-yonetimi': 'n1-e-ticaret-yonetimi-v23',
    '/sosyal-medya': 'n1-sosyal-medya-v27', '/reklam-yonetimi': 'n1-reklam-yonetimi-v23', '/ui-ux-tasarim': 'n1-uiux-tasarim-v28',
    '/yapay-zeka': 'n1-yapay-zeka-v2', '/uygulama-gelistirme': 'n1-uygulama-gelistirme-v2' };
  function curPath() { return location.pathname.replace(/\/+$/, '') || '/'; }
  if (!TAGS[curPath()]) return;
  window.__n1Stress2 = { version: VERSION };   // doc/tab: tanılama için (aşağıda atanır)

  /* ---------- varyantlar ve odaklı plan ---------- */
  var VARIANTS = {
    B:   { label: 'B · yayındaki V1.3', flags: {}, video: true },
    D:   { label: 'D · + stabilite modülü', flags: { stab: '1' }, video: true },
    E:   { label: 'E · loader kapalı', flags: { loader: 'off' }, video: true },
    R2:  { label: 'Ronin 2× (zorunlu)', flags: { hero: '2x' }, video: true },
    R15: { label: 'Ronin 1,5×', flags: { hero: '1.5x' }, video: true },
    R1:  { label: 'Ronin 1×', flags: { hero: '1x' }, video: true },
    RP:  { label: 'Ronin yalnız poster', flags: { hero: 'poster' }, video: false }
  };
  var DEFAULT = { vars: ['B', 'D', 'R2', 'RP'], pages: ['/reklam-yonetimi', '/kreatif-produksiyon'], scen: ['n', 'e1000'], rep: 3 };
  var SCEN = { n: { label: 'normal (sona kadar kaydır + geri)', early: 0 }, e500: { label: 'erken geri 0,5 sn', early: 500 }, e1000: { label: 'erken geri 1 sn', early: 1000 }, e2000: { label: 'erken geri 2 sn', early: 2000 } };
  var MAX_ATTEMPTS = 3;            // 1 asıl + en çok 2 ek deneme (yalnız test sistemi kaynaklı sorunlarda)
  var ATS_WINDOW = 8000;           // geri dönüşten sonra Wix ATS yeniden yüklemesi için bekleme penceresi
  var LEASE_STALE = 15000;

  // plan: tekrar → sayfa → senaryo → varyant (her blokta varyant sırası döndürülür: zaman kaymasına karşı denge)
  function buildPlan(o) {
    var steps = [], b = 0;
    for (var r = 0; r < o.rep; r++) o.pages.forEach(function (p, pi) { o.scen.forEach(function (sc, si) {
      var n = o.vars.length, rot = (r + pi + si) % n;
      for (var k = 0; k < n; k++) { var v = o.vars[(k + rot) % n]; steps.push({ id: steps.length, v: v, p: p, sc: sc, r: r + 1, blk: b }); }
      b++;
    }); });
    return steps;
  }

  /* ---------- depolama ---------- */
  var K = { active: 'n1s2-active', flags: 'n1s2-flags', eb: 'n1s2-eb', ebdone: 'n1s2-ebdone', ebat: 'n1s2-ebat', state: 'n1s2-state', res: 'n1s2-res', ev: 'n1s2-ev', lease: 'n1s2-lease', pre: 'n1s2-pre' };
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } }
  function lsDel(k) { try { localStorage.removeItem(k); } catch (e) {} }
  function jget(k, d) { try { var v = lsGet(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function jset(k, o) { return lsSet(k, JSON.stringify(o)); }
  function rid(p) { return p + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }

  var DOC = rid('d');                                     // bu belge
  var TAB = (function () { try { var t = sessionStorage.getItem('n1s2-tab'); if (!t) { t = rid('t'); sessionStorage.setItem('n1s2-tab', t); } return t; } catch (e) { return rid('t'); } })();
  var gen = 0;                                            // pagehide/pageshow ile artar
  window.__n1Stress2.doc = DOC; window.__n1Stress2.tab = TAB;
  var myRev = -1;                                         // bu belgenin bildiği durum sürümü
  var st = null;

  /* ---------- durum: karşılaştır-ve-yaz ---------- */
  function readState() { return jget(K.state, null); }
  function adopt() { st = readState(); myRev = st ? st.rev : -1; return st; }
  // mut(st) → durumu değiştirir. Başka bir belge araya girdiyse (rev farklı) yazmaz ve false döner.
  function commit(mut) {
    var cur = readState();
    if (!cur || !st || cur.runId !== st.runId || cur.rev !== myRev) { passive('durum başka bir belge tarafından ilerletildi'); return false; }
    if (!holdsLease()) { passive('kira başka sekmede'); return false; }
    mut(cur); cur.rev++; cur.ut = Date.now(); cur.by = DOC;
    if (!jset(K.state, cur)) { note('UYARI: durum yazılamadı (depolama?)'); return false; }
    st = cur; myRev = cur.rev; renewLease(); return true;
  }
  /* ---------- kira (tek etkin sekme) ---------- */
  function lease() { return jget(K.lease, null); }
  function holdsLease() { var l = lease(); return !!l && l.tab === TAB; }
  function renewLease() { jset(K.lease, { tab: TAB, doc: DOC, t: Date.now() }); }
  function canTake() { var l = lease(); return !l || l.tab === TAB || Date.now() - l.t > LEASE_STALE; }

  /* ---------- sonuçlar (idempotent, attemptId anahtarlı) ---------- */
  function results() { return jget(K.res, {}); }
  function putResult(aid, patch) { var R = results(); R[aid] = Object.assign(R[aid] || {}, patch); if (!jset(K.res, R)) note('UYARI: sonuç yazılamadı'); }
  function ev(type, data) { var E = jget(K.ev, []); E.push(Object.assign({ t: Date.now(), type: type, doc: DOC, path: curPath() }, data || {})); if (E.length > 400) E = E.slice(-400); jset(K.ev, E); }

  /* ---------- zamanlayıcı: kuşak + kira + durum korumalı ---------- */
  function later(fn, ms) {
    var g = gen;
    return setTimeout(function () {
      if (g !== gen) return;                                     // eski kuşak (BFCache öncesi) → etkisiz
      var s = readState(); if (!s || !st || s.runId !== st.runId || s.rev !== myRev) return;   // başka belge ilerletti
      if (!s.run || s.paused) return status();
      if (!holdsLease()) return passive('kira başka sekmede');
      fn();
    }, ms);
  }

  /* ---------- ölçüm ---------- */
  function navEntry() { try { return performance.getEntriesByType('navigation')[0] || null; } catch (e) { return null; } }
  function navType(persisted) { if (persisted) return 'bfcache'; var n = navEntry(); return n ? n.type : '?'; }
  function r0(x) { return x > 0 ? Math.round(x) : null; }
  function timing() { var n = navEntry(); return n ? { ttfb: r0(n.responseStart), dcl: r0(n.domContentLoadedEventEnd), load: r0(n.loadEventEnd) } : {}; }
  function fileOf(u) { u = u || ''; if (u.indexOf('data:') === 0) return 'poster-only'; return u.split('?')[0].split('/').pop() || ''; }
  var MEV = { loadedmetadata: 0, loadeddata: 0, playing: 0, pause: 0, waiting: 0, stalled: 0, error: 0 };
  Object.keys(MEV).forEach(function (t) { document.addEventListener(t, function (e) { if (e.target && e.target.tagName === 'VIDEO') MEV[t]++; }, true); });
  function vone(v) { return { src: fileOf(v.currentSrc), p: v.paused ? 1 : 0, rs: v.readyState, ns: v.networkState, t: Math.round(v.currentTime * 100) / 100, w: v.videoWidth, h: v.videoHeight, e: v.error ? v.error.code : 0 }; }
  // 2 örnek, 1 sn arayla: oynatma = currentTime ilerliyor ve paused değil
  function sampleVideos(cb) {
    var V = [].slice.call(document.getElementsByTagName('video')), a = V.map(vone);
    setTimeout(function () {
      var b = V.map(vone), adv = 0, hero = null;
      b.forEach(function (x, i) { x.adv = (x.t - a[i].t > 0.2 && !x.p) ? 1 : 0; adv += x.adv; });
      var hr = document.querySelector('[data-m4-film]'), hv = hr && hr.querySelector('video');
      if (hv) { var i = V.indexOf(hv); hero = Object.assign({ st: hr.getAttribute('data-n1v-state') || '' }, i >= 0 ? b[i] : vone(hv)); }
      cb({ n: V.length, playing: adv, hero: hero, vids: b.slice(0, 6), mev: Object.assign({}, MEV) });
    }, 1000);
  }
  function errs() { var e = window.__n1sErr || []; return { n: e.length, last: e.slice(-2).join(' | ').slice(0, 160) }; }
  function waitReady(cb, maxMs) {
    var tag = TAGS[curPath()], t0 = performance.now(), ce = null, ld = null, g = gen;
    (function poll() {
      if (g !== gen) return;
      var now = performance.now(), el = document.getElementsByTagName(tag)[0];
      if (ce == null && el && el.childElementCount > 0 && el.querySelector('section,main')) ce = Math.round(now);
      if (ld == null && !document.getElementById('n1GlobalLoader')) ld = Math.round(now);
      if ((ce != null && ld != null) || now - t0 > (maxMs || 20000)) return cb({ ce: ce, loader: ld, waited: Math.round(now - t0), timeout: ce == null });
      setTimeout(poll, 250);
    })();
  }

  /* ---------- panel ---------- */
  var ui = {};
  function el(tag, css, txt) { var e = document.createElement(tag); if (css) e.style.cssText = css; if (txt != null) e.textContent = txt; return e; }
  var BTN = 'font:600 12px/1 -apple-system,system-ui,sans-serif;color:#0b0d0c;background:#a8cf62;border:0;border-radius:6px;padding:9px 11px;margin:6px 6px 0 0';
  function panel() {
    if (ui.root && ui.root.isConnected) return;
    var r = el('div', 'position:fixed;left:8px;bottom:8px;z-index:2147483647;width:min(74vw,340px);max-height:72vh;overflow:auto;font:11px/1.4 ui-monospace,Menlo,monospace;' +
      'color:#e8ffe0;background:rgba(0,0,0,.88);border:1px solid #a8cf62;border-radius:8px;padding:8px;pointer-events:auto;view-transition-name:n1-stress-panel');
    r.id = 'n1-stress-panel';
    ui.title = el('div', 'font-weight:700;color:#a8cf62'); ui.l1 = el('div'); ui.l2 = el('div'); ui.l3 = el('div', 'color:#ffb4a8'); ui.btns = el('div');
    [ui.title, ui.l1, ui.l2, ui.l3, ui.btns].forEach(function (x) { r.appendChild(x); });
    (document.body || document.documentElement).appendChild(r); ui.root = r;
  }
  function btn(label, fn) { var b = el('button', BTN, label); b.type = 'button'; b.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); fn(e); }); ui.btns.appendChild(b); return b; }
  function note(t) { panel(); ui.l3.textContent = t; }
  var passiveLoop = 0;
  function passive(why) {
    if (!passiveLoop) passiveLoop = setInterval(function () { if (canTake() && lsGet(K.active) === '1') { clearInterval(passiveLoop); passiveLoop = 0; ev('lease-takeover', { why: 'kira boşaldı' }); adopt(); arrive(false, true); } }, 3000);
    panel(); ui.title.textContent = 'N1 STRES ' + VERSION + ' · PASİF'; ui.l1.textContent = why; ui.l2.textContent = ''; ui.btns.innerHTML = '';
    btn('Bu sekmeye al', function () { if (!confirm('Test bu sekmeden sürdürülsün mü? Diğer sekme pasif kalır.')) return; renewLease(); adopt(); arrive(false, true); });
    btn('Rapor', showReport); }
  function status(extra) {
    panel(); if (!st) return;
    var S = st.plan, T = S.length, cur = st.seq < T ? S[st.seq] : null, R = results(), crash = 0;
    Object.keys(R).forEach(function (k) { if (R[k].runId === st.runId && R[k].cls === 'crash') crash++; });
    ui.title.textContent = 'N1 STRES ' + VERSION + ' · çökme adayı: ' + crash + (st.paused ? ' · DURAKLATILDI' : '') + (st.videoInvalid ? ' · VİDEO GEÇERSİZ' : '');
    ui.l1.textContent = cur ? ('Adım ' + (st.seq + 1) + '/' + T + ' · deneme ' + st.att + ' · ' + VARIANTS[cur.v].label) : 'Tamamlandı';
    ui.l2.textContent = cur ? (cur.p + ' · ' + SCEN[cur.sc].label + ' · tekrar ' + cur.r + ' · aşama ' + st.phase) : '';
    if (extra) ui.l3.textContent = extra;
    ui.btns.innerHTML = '';
    if (cur) btn(st.paused ? 'Devam' : 'Duraklat', function () { var p = !st.paused; if (commit(function (s) { s.paused = p; })) { status(); if (!p) resume(); } });
    btn('Rapor', showReport);
    btn('Durdur', function () { if (confirm('Test durdurulsun mu? Sonuçlar silinmez.')) stopRun(); });
  }

  /* ---------- kurulum + video ön kontrolü ---------- */
  function showSetup() {
    panel(); ui.title.textContent = 'N1 STRES ' + VERSION + ' · kurulum'; ui.l3.textContent = ''; ui.btns.innerHTML = '';
    ui.l1.textContent = 'Önce: Otomatik Kilit = Hiçbir Zaman · Düşük Güç Modu KAPALI · şarjda · tek Safari sekmesi.';
    ui.l2.innerHTML = '';
    var box = el('div', 'margin-top:4px'), sel = {};
    function group(title, items, on) { box.appendChild(el('div', 'margin-top:6px;color:#a8cf62', title)); items.forEach(function (it) {
      var lab = el('label', 'display:block;padding:2px 0'), cb = el('input'); cb.type = 'checkbox'; cb.checked = on.indexOf(it[0]) >= 0; cb.value = it[0]; cb.style.marginRight = '6px';
      lab.appendChild(cb); lab.appendChild(document.createTextNode(it[1])); box.appendChild(lab); (sel[title] = sel[title] || []).push(cb); }); }
    group('Varyant', Object.keys(VARIANTS).map(function (k) { return [k, VARIANTS[k].label]; }), DEFAULT.vars);
    group('Sayfa', ALL_PAGES.map(function (p) { return [p, p]; }), DEFAULT.pages);
    group('Senaryo', Object.keys(SCEN).map(function (k) { return [k, SCEN[k].label]; }), DEFAULT.scen);
    var rep = el('select', 'margin:6px 6px 0 0'); [1, 2, 3, 4, 5].forEach(function (n) { var o = el('option', null, n + ' tekrar'); o.value = n; if (n === DEFAULT.rep) o.selected = true; rep.appendChild(o); });
    var est = el('div', 'color:#bdbcb5;margin-top:4px');
    function opts() { var g = function (t) { return (sel[t] || []).filter(function (c) { return c.checked; }).map(function (c) { return c.value; }); };
      var o = { vars: g('Varyant'), pages: g('Sayfa'), scen: g('Senaryo'), rep: +rep.value }, n = o.vars.length * o.pages.length * o.scen.length * o.rep;
      var mins = Math.round(o.vars.length * o.pages.length * o.rep * o.scen.reduce(function (a, s) { return a + (s === 'n' ? 55 : 30); }, 0) / 60);
      est.textContent = n + ' plan adımı · tahmini ' + mins + ' dk'; return o; }
    box.addEventListener('change', opts); rep.addEventListener('change', opts);
    ui.l2.appendChild(box); ui.l2.appendChild(rep); ui.l2.appendChild(est); opts();
    var pre = jget(K.pre, null);
    ui.l2.appendChild(el('div', 'margin-top:6px;color:' + (pre && pre.autoplay ? '#a8cf62' : '#ffb4a8'), 'Video kontrolü: ' + (pre ? pre.summary : 'yapılmadı')));
    btn('1 · Video kontrolü', preflight);
    btn('2 · Başlat', function () { var o = opts(); if (!o.vars.length || !o.pages.length || !o.scen.length) return note('En az bir varyant, sayfa ve senaryo seçin.');
      var p = jget(K.pre, null); if (curPath() !== HOME) return note('Video kontrolü ve başlatma ana sayfada yapılır.');
      if (!p || !p.autoplay) { if (!confirm('Otomatik video oynatma DOĞRULANMADI. Test video performansı için GEÇERSİZ işaretlenecek. Yine de başlatılsın mı?')) return; }
      startRun(o, p); });
    var R = results(); if (Object.keys(R).length) { btn('Önceki rapor', showReport); btn('Sonuçları sil', function () { if (confirm('Kaydedilmiş bütün V1.3.2 sonuçları silinsin mi?')) { [K.res, K.ev, K.pre].forEach(lsDel); showSetup(); } }); }
    btn('Test modunu kapat', function () { location.replace('/?n1t=0'); });
  }
  // Video ön kontrolü (ana sayfa): 1) dokunuşsuz otomatik oynatma 12 sn içinde başladı mı (currentTime ilerlemesi)?
  // 2) başlamadıysa kullanıcı ayrı bir dokunuşla "Dokunarak dene" der → aynı olay içinde play(): otomatik oynatma ile dokunuşla oynatma ayrı kaydedilir.
  // Dokunuşla sağlanan oynatma sonraki belgelere taşınmaz (iOS) — test her yüklemede otomatik oynatmayı ayrıca ölçer.
  function heroEl() { var hr = document.querySelector('[data-m4-film]'); return hr ? { r: hr, v: hr.querySelector('video') } : null; }
  function watchAdv(v, ms, cb) { var a = vone(v), t0 = Date.now(); (function poll() { var b = vone(v); if (b.t - a.t > 0.3 && !b.p) return cb(true, b); if (Date.now() - t0 > ms) return cb(false, b); setTimeout(poll, 400); })(); }
  function preflight() {
    if (curPath() !== HOME) return note('Video kontrolü ana sayfada yapılır.');
    var H = heroEl(); if (!H || !H.v) { jset(K.pre, { autoplay: false, summary: 'hero video bulunamadı (masaüstü düzeni?)', t: Date.now() }); return showSetup(); }
    note('Otomatik oynatma ölçülüyor (12 sn\'ye kadar, dokunmayın)…');
    watchAdv(H.v, 12000, function (ok, b) {
      var o = { t: Date.now(), dpr: window.devicePixelRatio || 1, vw: innerWidth, ua: navigator.userAgent, autoplay: ok, hero: b, heroSt: H.r.getAttribute('data-n1v-state') || '' };
      o.summary = (ok ? 'OTOMATİK OYNATMA ÇALIŞIYOR' : 'OTOMATİK OYNATMA DOĞRULANMADI (durum: ' + o.heroSt + ')') + ' · ' + (b.src || '-') + ' ' + b.w + 'x' + b.h + ' rs' + b.rs + ' ns' + b.ns;
      jset(K.pre, o); ev('preflight', o); showSetup();
      if (!ok) { note('Otomatik oynatma çalışmıyor. Düşük Güç Modu\'nu kapatıp sayfayı yenileyin ve tekrar ölçün. Ayrım için "Dokunarak dene".');
        btn('Dokunarak dene', function () {
          var pr = null; try { var r = H.v.play(); pr = 'çağrıldı'; if (r && r.then) r.then(function () { pr = 'kabul'; }, function (e) { pr = 'ret:' + (e && e.name); }); } catch (e) { pr = 'hata'; }
          watchAdv(H.v, 6000, function (g, b2) { o.gesture = g; o.gestureResult = pr; o.summary += ' · dokunuşla: ' + (g ? 'OYNUYOR (→ otomatik oynatma engeli: Düşük Güç Modu / Safari ayarı olası)' : 'oynamıyor (' + pr + ')');
            jset(K.pre, o); ev('preflight-gesture', { g: g, pr: pr }); showSetup(); });
        }); }
    });
  }

  /* ---------- çalıştırma ---------- */
  function startRun(o, pre) {
    var plan = buildPlan(o), run = { runId: rid('r'), rev: 0, run: true, paused: false, opts: o, plan: plan, seq: 0, att: 1, phase: 'prep', exp: null,
      startedAt: Date.now(), ua: navigator.userAgent, scr: screen.width + 'x' + screen.height + '@' + (window.devicePixelRatio || 1),
      pre: pre ? { autoplay: pre.autoplay, summary: pre.summary } : null, videoInvalid: !(pre && pre.autoplay) };
    renewLease(); lsSet(K.active, '1'); jset(K.state, run); adopt();
    ev('start', { runId: run.runId, opts: o, n: plan.length, pre: run.pre });
    beginAttempt();
  }
  function stopRun() {
    ev('stop', { runId: st && st.runId, seq: st && st.seq });
    if (st) commit(function (s) { s.run = false; s.phase = 'stopped'; });
    [K.active, K.flags, K.eb, K.ebdone, K.ebat, K.lease].forEach(lsDel);
    location.replace('/?n1t=0');
  }
  function aid() { return st.runId + '|' + st.seq + '|' + st.att; }
  function stepNow() { return st.plan[st.seq]; }
  function applyFlags(v) {
    var f = VARIANTS[v].flags; jset(K.flags, f);
    try { Object.keys(sessionStorage).forEach(function (k) { if (k.indexOf('n1t-') === 0 && k !== 'n1t-log') sessionStorage.removeItem(k); });
      sessionStorage.setItem('n1t', '1'); sessionStorage.setItem('n1t-stress2', '1'); Object.keys(f).forEach(function (k) { sessionStorage.setItem('n1t-' + k, f[k]); }); } catch (e) {}
  }
  // Her deneme: varyant bayraklarıyla TAZE ana sayfa (replace → geçmiş büyümez)
  function beginAttempt() {
    if (st.seq >= st.plan.length) return done();
    var s = stepNow(), nonce = rid('n');
    applyFlags(s.v);
    if (!commit(function (x) { x.phase = 'prep'; x.exp = { nonce: nonce, kind: 'fresh-home', to: HOME, t: Date.now() }; })) return;
    putResult(aid(), { runId: st.runId, stepId: s.id, attempt: st.att, v: s.v, p: s.p, sc: s.sc, r: s.r, blk: s.blk, tStart: Date.now() });
    lsDel(K.eb);
    status('taze ana sayfa yükleniyor');
    setTimeout(function () { location.replace('/'); }, 300);
  }

  /* gelen belge / BFCache dönüşü: beklenen geçişle karşılaştır */
  function arrive(persisted, takeover) {
    adopt();
    if (!st || !st.run) { if (lsGet(K.active) !== '1' && curPath() === HOME) showSetup(); else if (!st) showSetup(); else finalPanel(); return; }
    if (!takeover && !canTake()) return passive('Test başka bir sekmede etkin (son işaret ' + Math.round((Date.now() - lease().t) / 1000) + ' sn önce). Bu sekme pasif.');
    renewLease();
    var nt = navType(persisted), path = curPath(), x = st.exp || {}, s = stepNow(), A = aid(), gap = st.ut ? Date.now() - st.ut : 0;
    if (!s) return done();
    var info = { nt: nt, path: path, phase: st.phase, exp: x.kind, gapMs: gap };
    if (gap > 60000) ev('gap', info);
    var ph = st.phase;

    if (ph === 'prep') {                                     // taze ana sayfa bekleniyor
      if (path === HOME && (nt === 'navigate' || nt === 'reload')) return homeFresh(nt);
      return issue('unexpected', 'taze ana sayfa yerine ' + path + ' (' + nt + ')', info);
    }
    if (ph === 'home') {                                      // ana sayfada hazırlanırken yeni belge
      if (nt === 'reload' && path === HOME) return issue('crash', 'ana sayfa etkinken yeniden yüklendi', info);
      return issue('unexpected', 'ana sayfa etkinken beklenmeyen gezinme (' + nt + ' → ' + path + ')', info);
    }
    if (ph === 'nav') {                                       // hizmet sayfasına bağlantı tıklandı
      if (path === s.p && nt === 'navigate') return pageArrived();
      if (path === s.p && nt === 'reload') return issue('crash', 'hizmet sayfası yüklenirken yeniden yüklendi', info);
      if (path === HOME && SCEN[s.sc].early && (nt === 'bfcache' || nt === 'back_forward')) { putResult(A, { earlyBeforeRunner: 1 }); return returned(nt); }
      if (path === HOME && nt === 'reload') return issue('ambiguous', 'geçiş sırasında ana sayfa yeniden yüklendi (çökme ya da Wix ATS; ayırt edilemez)', info);
      return issue('unexpected', 'bağlantı sonrası beklenmeyen sayfa (' + path + ', ' + nt + ')', info);
    }
    if (ph === 'page') {                                      // hizmet sayfası etkinken yeni belge
      if (nt === 'reload' && path === s.p) return issue('crash', 'hizmet sayfası etkinken yeniden yüklendi', info);
      return issue('unexpected', 'hizmet sayfası etkinken beklenmeyen gezinme (' + nt + ' → ' + path + ')', info);
    }
    if (ph === 'back') {                                      // history.back() verildi
      if (path === HOME && (nt === 'bfcache' || nt === 'back_forward')) return returned(nt);
      if (path === HOME && nt === 'reload') return returned('reload');       // geri + hemen yeniden yükleme: Wix ATS olası (çökme sayılmaz, ayrıca sayılır)
      if (path === HOME) return issue('unexpected', 'geri yerine ana sayfa yeniden açıldı (' + nt + ')', info);
      if (path === s.p && nt === 'reload') return issue('crash', 'geri dönerken hizmet sayfası yeniden yüklendi', info);
      return issue('wronghist', 'geri, ana sayfa yerine ' + path + ' (' + nt + ')', info);
    }
    if (ph === 'returned') {                                  // geri dönüldü, ATS penceresi / ölçüm
      if (path === HOME && nt === 'reload' && Date.now() - (st.retT || 0) < ATS_WINDOW) { putResult(A, { atsReload: 1 }); ev('ats', info); return returnedSettle(); }
      if (path === HOME && nt === 'reload') return issue('ambiguous', 'geri dönüşten sonra ana sayfa yeniden yüklendi (ATS penceresi dışında)', info);
      return issue('unexpected', 'geri dönüş sonrası beklenmeyen gezinme (' + nt + ' → ' + path + ')', info);
    }
    if (ph === 'recover') { if (path === HOME) return retryOrNext(); return issue('unexpected', 'kurtarma ana sayfaya ulaşmadı', info); }
    if (ph === 'done' || ph === 'stopped') return finalPanel();
    return issue('unexpected', 'bilinmeyen aşama ' + ph, info);
  }

  // Sorun: sınıflandır, kaydet, kontrollü kurtarma (replace) → aynı adımı yeniden dene ya da sonraki adım
  // cls: crash (çökme adayı: beklenmeyen yeniden yükleme) · ambiguous · unexpected · wronghist · timeout
  function issue(cls, msg, info) {
    var A = aid(), s = stepNow();
    putResult(A, { cls: cls, msg: msg, info: info, tEnd: Date.now(), errs: errs() });
    ev('issue', { cls: cls, msg: msg, seq: st.seq, att: st.att, info: info });
    var retry = (cls === 'unexpected' || cls === 'wronghist' || cls === 'timeout') && st.att < MAX_ATTEMPTS;   // test sistemi kaynaklı → yeniden dene
    if (!commit(function (x) { x.phase = 'recover'; x.retry = retry; x.exp = { kind: 'recover', to: HOME, t: Date.now() }; })) return;
    status(msg + (retry ? ' · ek deneme yapılacak' : ' · sonraki adım'));
    lsDel(K.eb);
    later(function () { location.replace('/'); }, 2500);   // kontrollü kurtarma: geçmiş büyümez; ana sayfaya bu yolla ulaşmak başarılı "geri" sayılmaz
  }
  function retryOrNext() {
    var retry = st.retry;
    if (!commit(function (x) { if (retry) x.att++; else { x.seq++; x.att = 1; } x.retry = false; })) return;
    beginAttempt();
  }

  /* ana sayfa (taze): hazır → video örneği → Hizmetler bağlantısına kademeli kaydır → tıkla */
  function homeFresh(nt) {
    var A = aid(), s = stepNow();
    if (!commit(function (x) { x.phase = 'home'; })) return;
    putResult(A, { homeNt: nt, homeT: timing() });
    status();
    waitReady(function (rd) {
      later(function () {
        sampleVideos(function (vs) {
          var expectVideo = VARIANTS[s.v].video, ok = !expectVideo || !!(vs.hero && vs.hero.adv);
          putResult(A, { homeReady: rd, homeVid: vs, videoOk: ok ? 1 : 0 });
          var sel = 'a.n1m-svc-link[href="' + s.p + '"],a.m4-svc-a[href="' + s.p + '"],#hizmetler-ozet a[href="' + s.p + '"]', t0 = Date.now();
          (function findLink() {
            var a = document.querySelector(sel);
            if (!a && Date.now() - t0 < 8000) return later(findLink, 400);
            if (!a) return issue('timeout', 'Hizmetler bağlantısı bulunamadı', { path: curPath() });
            var target = Math.max(0, a.getBoundingClientRect().top + scrollY - innerHeight / 2);
            gradual(target, 300, 250, function () { later(function () { clickLink(s, document.querySelector(sel)); }, 700); });
          })();
        });
      }, 2000);   // eşit başlangıç: hazır olduktan sonra 2 sn
    });
  }
  function clickLink(s, a) {
    if (!a) return issue('timeout', 'Hizmetler bağlantısı kayboldu', { path: curPath() });
    var early = SCEN[s.sc].early, nonce = rid('e');
    if (early) jset(K.eb, { id: nonce, path: s.p, ms: early }); else lsDel(K.eb);
    if (!commit(function (x) { x.phase = 'nav'; x.exp = { nonce: nonce, kind: 'link', to: s.p, t: Date.now() }; })) return;
    putResult(aid(), { tClick: Date.now(), ebId: early ? nonce : null });
    status(); a.click();
    later(function () { if (curPath() === HOME && st.phase === 'nav') issue('timeout', 'bağlantıdan sonra 25 sn içinde gezinme olmadı', { path: HOME }); }, 25000);
  }
  /* hizmet sayfası */
  function pageArrived() {
    var A = aid(), s = stepNow(), early = SCEN[s.sc].early;
    putResult(A, { pageNt: 'navigate', navStartDelay: (performance.timeOrigin && results()[A] && results()[A].tClick) ? Math.round(performance.timeOrigin - results()[A].tClick) : null });
    if (early) {                       // geri, test anahtarı tarafından (Head) zamanlandı; burada yalnız ölç
      if (!commit(function (x) { x.phase = 'back'; x.exp = { kind: 'back', to: HOME, t: Date.now() }; })) return;
      status('erken geri bekleniyor');
      waitReady(function (rd) { putResult(A, { pageReady: rd, pageT: timing() }); }, early + 4000);
      later(function () { if (curPath() === s.p) { putResult(A, { ebLate: 1 }); history.back(); } }, early + 6000);   // anahtar tetikleyemediyse
      return;
    }
    if (!commit(function (x) { x.phase = 'page'; })) return;
    status();
    waitReady(function (rd) {
      putResult(A, { pageReady: rd });
      later(function () {
        sampleVideos(function (vs) {
          putResult(A, { pageVid: vs });
          var t0 = Date.now(), H = Math.max(0, document.documentElement.scrollHeight - innerHeight);
          gradual(H, 200, 300, function (n) {
            sampleVideos(function (ve) {
              putResult(A, { scroll: { steps: n, ms: Date.now() - t0, y: Math.round(scrollY), H: H }, pageT: timing(), pageVidEnd: ve, errs: errs() });
              if (!commit(function (x) { x.phase = 'back'; x.exp = { kind: 'back', to: HOME, t: Date.now() }; })) return;
              later(function () { putResult(A, { tBack: Date.now() }); history.back(); }, 800);
              later(function () { if (curPath() === s.p && st.phase === 'back') issue('timeout', 'geri 15 sn içinde gerçekleşmedi', { path: s.p }); }, 15800);
            });
          });
        });
      }, 1500);
    });
  }
  /* geri dönüş: ATS penceresi → ana sayfa yeniden hazır → deneme tamam */
  function returned(nt) {
    var A = aid(), eb = jget(K.eb, null), ebd = lsGet(K.ebdone);
    var patch = { backNt: nt, tReturn: Date.now() };
    if (eb) { patch.ebFired = (ebd === eb.id) ? 1 : 0; patch.ebAt = patch.ebFired ? jget(K.ebat, null) : null; }
    if (nt === 'reload') patch.atsReload = 1;
    putResult(A, patch);
    if (!commit(function (x) { x.phase = 'returned'; x.retT = Date.now(); x.exp = { kind: 'settle', to: HOME, t: Date.now() }; })) return;
    status('geri dönüldü (' + nt + ') · Wix ATS penceresi');
    later(returnedSettle, ATS_WINDOW);
  }
  function returnedSettle() {
    var A = aid();
    later(function () {
      waitReady(function (rd) {
        sampleVideos(function (vs) {
          var r = results()[A] || {};
          putResult(A, { homeBackReady: rd, homeBackVid: vs, cls: r.cls || 'ok', tEnd: Date.now() });
          ev('ok', { seq: st.seq, att: st.att });
          if (!commit(function (x) { x.seq++; x.att = 1; x.phase = 'prep'; x.exp = null; })) return;
          beginAttempt();
        });
      }, 15000);
    }, 500);
  }
  function done() {
    if (st.run) commit(function (x) { x.run = false; x.phase = 'done'; });
    [K.active, K.flags, K.eb, K.lease].forEach(lsDel);
    ev('done', { runId: st.runId }); finalPanel();
  }
  function finalPanel() {
    panel(); ui.title.textContent = 'N1 STRES ' + VERSION + ' · ' + (st && st.phase === 'done' ? 'TAMAMLANDI' : 'DURDU');
    ui.l1.textContent = 'Raporu kopyalayın / paylaşın / indirin.'; ui.l2.textContent = ''; ui.l3.textContent = ''; ui.btns.innerHTML = '';
    btn('Rapor', showReport); btn('Yeni test', function () { lsDel(K.state); showSetup(); }); btn('Test modunu kapat', function () { location.replace('/?n1t=0'); });
  }
  function resume() { adopt(); arrive(false, true); }
  function gradual(target, stepPx, ms, cb) {
    var y = scrollY, n = 0, g = gen;
    (function tick() {
      if (g !== gen) return; var s = readState(); if (!s || s.rev !== myRev || s.paused || !s.run) return;
      if (y >= target - 2 || n >= 150) return cb(n);
      y = Math.min(target, y + stepPx); n++; try { window.scrollTo(0, y); } catch (e) {}
      if (n % 10 === 0 && ui.l3) ui.l3.textContent = 'kaydırma ' + Math.round(100 * y / Math.max(1, target)) + '%';
      setTimeout(tick, ms);
    })();
  }

  /* ---------- rapor ---------- */
  function med(a) { a = a.filter(function (x) { return typeof x === 'number'; }).sort(function (x, y) { return x - y; }); return a.length ? a[Math.floor((a.length - 1) / 2)] : '–'; }
  var CLS = { ok: 'tamam', crash: 'ÇÖKME ADAYI (beklenmeyen yeniden yükleme)', ambiguous: 'belirsiz yeniden yükleme', unexpected: 'beklenmeyen gezinme', wronghist: 'yanlış geçmiş girdisi', timeout: 'test zaman aşımı' };
  function buildReport() {
    var s0 = readState(), R = results(), E = jget(K.ev, []), pre = jget(K.pre, null);
    var runId = s0 ? s0.runId : null, A = Object.keys(R).map(function (k) { return Object.assign({ aid: k }, R[k]); }).filter(function (x) { return !runId || x.runId === runId; });
    var out = [], plan = s0 ? s0.plan : [];
    out.push('# 1N V1.3.2 mobil stres testi — sonuç raporu');
    out.push('Betik ' + VERSION + ' · runId ' + runId + ' · rapor ' + new Date().toISOString());
    out.push('Cihaz: ' + (s0 && s0.ua || navigator.userAgent) + ' · ekran ' + (s0 && s0.scr || ''));
    out.push('Seçenekler: ' + (s0 ? JSON.stringify(s0.opts) : '-') + ' · plan adımı ' + plan.length + ' · deneme kaydı ' + A.length + ' (benzersiz attemptId)');
    out.push('Video ön kontrolü: ' + (pre ? pre.summary : 'yapılmadı') + (s0 && s0.videoInvalid ? ' → **VİDEO PERFORMANS TESTİ OLARAK GEÇERSİZ**' : ''));
    out.push('Sınıflar: ÇÖKME ADAYI = test beklemiyorken sayfa yeniden yüklendi (Safari çökme sonrası yeniden yükleme YA DA elle yeniden yükleme; ayırt edilemez). BFCache dönüşü çökme sayılmaz. Wix ATS yeniden yüklemesi ayrı sayılır.');
    out.push('');
    out.push('## Varyant özeti (yalnız 1. denemeler; ek denemeler ayrı sütunda)');
    out.push('| Varyant | Plan adımı | Geçerli 1. deneme | ÇÖKME ADAYI | Belirsiz yeniden yükleme | Test kaynaklı sorun (beklenmeyen/yanlış geçmiş/zaman aşımı) | Ek deneme | Wix ATS yeniden yükleme | Video doğrulandı (ana sayfa) | Ronin (kaynak, çözünürlük) | Hizmet TTFB/DCL/bileşen (medyan ms) | 1N JS hatası |');
    out.push('|---|---|---|---|---|---|---|---|---|---|---|---|');
    Object.keys(VARIANTS).forEach(function (v) {
      var P = plan.filter(function (x) { return x.v === v; }); if (!P.length) return;
      var first = A.filter(function (x) { return x.v === v && x.attempt === 1; }), extra = A.filter(function (x) { return x.v === v && x.attempt > 1; });
      var valid = first.filter(function (x) { return x.cls === 'ok' || x.cls === 'crash' || x.cls === 'ambiguous'; });
      var c = function (k) { return first.filter(function (x) { return x.cls === k; }).length; };
      var vids = first.filter(function (x) { return x.homeVid; }), vok = vids.filter(function (x) { return x.videoOk; }).length;
      var heroes = {}; vids.forEach(function (x) { var h = x.homeVid.hero; if (h) { var k = (h.src || '-') + ' ' + h.w + 'x' + h.h + ' ' + h.st; heroes[k] = (heroes[k] || 0) + 1; } });
      var ok = first.filter(function (x) { return x.cls === 'ok' && !SCEN[x.sc].early; });
      out.push('| ' + VARIANTS[v].label + ' | ' + P.length + ' | ' + valid.length + ' | ' + c('crash') + ' | ' + c('ambiguous') + ' | ' + (c('unexpected') + c('wronghist') + c('timeout')) + ' | ' + extra.length + ' | ' +
        A.filter(function (x) { return x.v === v && x.atsReload; }).length + ' | ' + (VARIANTS[v].video ? vok + '/' + vids.length + (vids.length && vok / vids.length < 0.8 ? ' ⚠ geçersiz' : '') : 'beklenmiyor') + ' | ' +
        (Object.keys(heroes).sort(function (a, b) { return heroes[b] - heroes[a]; }).slice(0, 2).join('; ') || '–') + ' | ' +
        med(ok.map(function (x) { return x.pageT && x.pageT.ttfb; })) + ' / ' + med(ok.map(function (x) { return x.pageT && x.pageT.dcl; })) + ' / ' + med(ok.map(function (x) { return x.pageReady && x.pageReady.ce; })) + ' | ' +
        A.filter(function (x) { return x.v === v; }).reduce(function (a, x) { return a + ((x.errs && x.errs.n) || 0); }, 0) + ' |');
    });
    out.push('');
    out.push('## Sayfa × senaryo × varyant (1. denemeler: çökme adayı / geçerli)');
    var vs = Object.keys(VARIANTS).filter(function (v) { return plan.some(function (x) { return x.v === v; }); });
    out.push('| Sayfa | Senaryo | ' + vs.join(' | ') + ' |'); out.push('|---|---|' + vs.map(function () { return '---'; }).join('|') + '|');
    (s0 ? s0.opts.pages : []).forEach(function (p) { (s0.opts.scen || []).forEach(function (sc) {
      out.push('| ' + p + ' | ' + SCEN[sc].label + ' | ' + vs.map(function (v) { var F = A.filter(function (x) { return x.v === v && x.p === p && x.sc === sc && x.attempt === 1; });
        var val = F.filter(function (x) { return x.cls === 'ok' || x.cls === 'crash' || x.cls === 'ambiguous'; }); return F.filter(function (x) { return x.cls === 'crash'; }).length + '/' + val.length; }).join(' | ') + ' |'); }); });
    out.push('');
    out.push('## Sorunlu denemeler');
    var bad = A.filter(function (x) { return x.cls && x.cls !== 'ok'; }).sort(function (a, b) { return (a.tStart || 0) - (b.tStart || 0); });
    if (!bad.length) out.push('Yok.');
    bad.forEach(function (x) { out.push('- ' + x.aid.split('|').slice(1).join('.') + ' · ' + VARIANTS[x.v].label + ' · ' + x.p + ' · ' + SCEN[x.sc].label + ' · ' + CLS[x.cls] + ' · ' + (x.msg || '') + (x.info ? ' · ' + JSON.stringify(x.info) : '')); });
    out.push('');
    out.push('## Olay günlüğü (son 60)');
    E.filter(function (e) { return !runId || !e.runId || e.runId === runId || true; }).slice(-60).forEach(function (e) { out.push('- ' + new Date(e.t).toISOString().slice(11, 19) + ' ' + e.type + ' ' + e.path + ' doc:' + e.doc.slice(-5) + ' ' + JSON.stringify(e.info || e.cls || e.seq || '').slice(0, 140)); });
    out.push('');
    out.push('## Ham veri — denemeler (CSV, attemptId başına bir satır)');
    out.push(csv(A));
    return out.join('\n');
  }
  function csv(A) {
    var cols = ['attemptId', 'stepId', 'attempt', 'block', 'v', 'p', 'sc', 'r', 'cls', 'msg', 'homeNt', 'pageNt', 'backNt', 'atsReload', 'earlyBeforeRunner', 'ebFired', 'ebAtMs', 'ebReadyState', 'navStartDelay', 'ttfb', 'dcl', 'load', 'ceReady', 'loaderGone',
      'videoOk', 'heroSrc', 'heroWxH', 'heroState', 'heroRs', 'heroNs', 'heroAdv', 'homePlaying', 'homeVideos', 'pagePlaying', 'pageVideos', 'pagePlayingEnd', 'mevPlaying', 'mevWaiting', 'mevStalled', 'mevError', 'scrollSteps', 'scrollMs', 'homeBackPlaying', 'errs', 'tStart', 'tEnd'];
    var rows = [cols.join(',')];
    A.forEach(function (x) {
      var h = x.homeVid || {}, hh = h.hero || {}, pv = x.pageVid || {}, pe = x.pageVidEnd || {}, m = pe.mev || pv.mev || {}, pt = x.pageT || {}, pr = x.pageReady || {};
      var r = [x.aid.split('|').slice(1).join('.'), x.stepId, x.attempt, x.blk, x.v, x.p, x.sc, x.r, x.cls || '', x.msg || '', x.homeNt || '', x.pageNt || '', x.backNt || '', x.atsReload || 0, x.earlyBeforeRunner || 0, x.ebFired, x.ebAt && x.ebAt.ms, x.ebAt && x.ebAt.rs,
        x.navStartDelay, pt.ttfb, pt.dcl, pt.load, pr.ce, pr.loader, x.videoOk, hh.src, hh.w != null ? hh.w + 'x' + hh.h : '', hh.st, hh.rs, hh.ns, hh.adv, h.playing, h.n, pv.playing, pv.n, pe.playing, m.playing, m.waiting, m.stalled, m.error,
        x.scroll && x.scroll.steps, x.scroll && x.scroll.ms, x.homeBackVid && x.homeBackVid.playing, x.errs ? x.errs.n : '', x.tStart ? new Date(x.tStart).toISOString() : '', x.tEnd ? new Date(x.tEnd).toISOString() : ''];
      rows.push(r.map(function (c) { c = c == null ? '' : String(c); return /[",\n]/.test(c) ? '"' + c.replace(/"/g, '""') + '"' : c; }).join(','));
    });
    return rows.join('\n');
  }
  function showReport() {
    var txt = buildReport(), ov = el('div', 'position:fixed;inset:0;z-index:2147483647;background:rgba(0,0,0,.93);padding:12px;display:flex;flex-direction:column;gap:8px');
    var ta = el('textarea', 'flex:1;width:100%;font:11px/1.35 ui-monospace,Menlo,monospace;color:#e8ffe0;background:#0b0d0c;border:1px solid #a8cf62;border-radius:6px;padding:8px');
    ta.readOnly = true; ta.value = txt; var bar = el('div'); ov.appendChild(ta); ov.appendChild(bar);
    function b(l, f) { var x = el('button', BTN, l); x.type = 'button'; x.addEventListener('click', f); bar.appendChild(x); }
    b('Kopyala', function () { var ok = function () { ta.style.borderColor = '#ffffff'; }; if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(ok, function () { ta.focus(); ta.select(); document.execCommand('copy'); }); else { ta.focus(); ta.select(); document.execCommand('copy'); } });
    if (navigator.share) b('Paylaş', function () { navigator.share({ title: '1N stres testi V1.3.2', text: txt }).catch(function () {}); });
    b('İndir (.md)', function () { dl(txt, 'n1-stres2-' + Date.now() + '.md', 'text/markdown'); });
    b('İndir (.csv)', function () { var s0 = readState(), R = results(); dl(csv(Object.keys(R).map(function (k) { return Object.assign({ aid: k }, R[k]); }).filter(function (x) { return !s0 || x.runId === s0.runId; })), 'n1-stres2-' + Date.now() + '.csv', 'text/csv'); });
    b('Kapat', function () { ov.remove(); });
    document.body.appendChild(ov);
  }
  function dl(text, name, type) { try { var u = URL.createObjectURL(new Blob([text], { type: type + ';charset=utf-8' })), a = el('a'); a.href = u; a.download = name; document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(u); a.remove(); }, 4000); } catch (e) { note('İndirme desteklenmedi; Kopyala kullanın.'); } }

  /* ---------- yaşam döngüsü ---------- */
  setInterval(function () { var s = readState(); if (s && s.run && st && s.runId === st.runId && s.rev === myRev && holdsLease() && !document.hidden) renewLease(); }, 5000);   // kira nabzı (küçük tek yazma)
  window.addEventListener('pagehide', function () { gen++; });                         // bu belgenin bütün zamanlayıcıları etkisiz
  window.addEventListener('pageshow', function (e) { if (!e.persisted) return; gen++; if (ui.root) { ui.root.remove(); ui.root = null; } ev('bfcache-show', {}); arrive(true); });
  function boot() { arrive(false); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true }); else boot();
})();
