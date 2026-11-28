// Global Menü V2.2 hedefli test: kart sırası, 1N Intelligence kartı (A7 ile ölçü/stil eşliği), bağlantı, açılış/kapanış, taşma. node v22-test.js <br> <width> [out.json]
const pw = require('playwright'); const fs = require('fs');
const [, , BR = 'chromium', WS = '1440', OUT] = process.argv; const WIDTH = +WS; const TOUCH = WIDTH <= 1024;
const IOS = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.7 Mobile/15E148 Safari/604.1';
const CTX = TOUCH ? Object.assign({ viewport: { width: WIDTH, height: WIDTH < 400 ? (WIDTH < 340 ? 568 : 844) : 1366 }, deviceScaleFactor: 2, hasTouch: true }, BR === 'chromium' ? { isMobile: true } : {}, WIDTH < 768 ? { userAgent: IOS } : {}) : { viewport: { width: WIDTH, height: 900 } };
const B = 'https://www.reklam1n.com'; const SH = 'https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@0000000000000000000000000000000000000000/wix-global-shell-v1/' + (process.env.SHELL_FILE || 'n1-global-shell-v1-2.js');
const IGN = /googleadservices|doubleclick|Cross-origin script|Failed to fetch|Load failed|ChunkLoad|SiteAssets|notifyEventToEditorApp|Fetch API|Transition/;
const FOOT = { 1920: 611, 1440: 578, 1024: 821, 820: 791, 390: 867, 375: 865, 320: 856 };
const results = []; let pass = 0, fail = 0; const meas = {};
function T(g, n, ok, info) { results.push({ g, n, ok: !!ok, info }); ok ? pass++ : fail++; console.log(BR, WIDTH, ok ? 'GEÇTİ' : 'KALDI', g, '·', n, info === undefined ? '' : '· ' + JSON.stringify(info).slice(0, 280)); }
const read = () => { const p = [...document.querySelectorAll('.n1h-panel')].find((x) => x.hasAttribute('data-open')); if (!p) return null;
  const R = (e) => { const r = e.getBoundingClientRect(); return { x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width * 10) / 10, h: Math.round(r.height * 10) / 10 }; };
  const st = (e, ks) => { const c = getComputedStyle(e); return ks.map((k) => c.getPropertyValue(k)).join('|'); };
  const card = (sel) => { const c = p.querySelector(sel); if (!c) return null; const a = c.querySelector('a'), b = a.querySelector('b'), sm = a.querySelector('small'), ext = a.querySelector('.n1h-ext');
    return { box: R(c), a: R(a), cardSt: st(c, ['padding-top', 'padding-left', 'border-radius', 'background-color', 'border-top-width', 'border-top-color']), aSt: st(a, ['padding-top', 'padding-left', 'border-radius', 'color', 'transition-duration', 'display', 'justify-content']),
      bSt: b && st(b, ['font-family', 'font-size', 'font-weight', 'line-height', 'letter-spacing']), smSt: sm && st(sm, ['font-family', 'font-size', 'letter-spacing', 'text-transform', 'color']), ext: ext && R(ext), extSt: ext && st(ext, ['border-top-width', 'border-top-color', 'border-radius', 'color']), arrow: ext && ext.innerHTML,
      text: b && b.textContent, note: sm && sm.textContent, href: a.getAttribute('href'), target: a.getAttribute('target'), rel: a.getAttribute('rel'), aFillsCard: Math.abs(R(a).w - (R(c).w - 2 * parseFloat(getComputedStyle(c).paddingLeft))) < 1.5 }; };
  return { cards: [...p.querySelectorAll('.n1h-card:not(.n1h-main)')].map((c) => c.className.replace('n1h-card ', '')), order: ['.n1h-brandcard', '.n1h-a7card:not(.n1h-intelcard)', '.n1h-intelcard'].map((s) => p.querySelector(s) ? Math.round(p.querySelector(s).getBoundingClientRect().top) : null),
    plat: p.querySelectorAll('.n1h-platcard,.n1h-plat,.n1h-plats').length, platText: /Uygulama ve Platformlar|ZEYP|Hemen Tıkla|carsialtin|zeyp\.com|hementik/.test(p.innerHTML), a7: card('.n1h-a7card:not(.n1h-intelcard)'), intel: card('.n1h-intelcard'),
    panel: R(p), vw: innerWidth, vh: innerHeight, sh: p.scrollHeight, ch: p.clientHeight, ox: p.scrollWidth > p.clientWidth + 1 || document.documentElement.scrollWidth > innerWidth, webp: performance.getEntriesByType('resource').filter((e) => /assets\/platforms/.test(e.name)).length }; };
async function checks(pg, g, menuSel, ctx) {
  const tap = (l) => TOUCH ? l.tap() : l.click();
  await tap(pg.locator(menuSel).first()); await pg.waitForTimeout(1100);
  const s = await pg.evaluate(read); if (!s) { T(g, 'menü açıldı', false); return null; } meas[g] = s;
  T(g, 'alt kartlar yalnız: Başlangıca Dön · A7 Prodüksiyon · 1N Intelligence (sıra)', JSON.stringify(s.cards) === JSON.stringify(['n1h-brandcard', 'n1h-a7card', 'n1h-a7card n1h-intelcard']) && s.order[0] < s.order[1] && s.order[1] < s.order[2], { cards: s.cards, order: s.order });
  T(g, 'Uygulama ve Platformlar kartı, logolar ve bağlantı kutuları yok; logo dosyası indirilmedi', s.plat === 0 && !s.platText && s.webp === 0, { plat: s.plat, txt: s.platText, webp: s.webp });
  const i = s.intel, a = s.a7;
  T(g, 'Intelligence: başlık, alt açıklama, adres', i && i.text === '1N Intelligence' && i.note === 'DİJİTAL ZEKA PLATFORMU' && i.href === 'https://www.reklam1n.com/intelligence', i && [i.text, i.note, i.href]);
  T(g, 'Intelligence: aynı sekme (target/rel yok), kartın tamamı bağlantı', i && i.target === null && i.rel === null && i.aFillsCard, i && { t: i.target, r: i.rel, fill: i.aFillsCard });
  T(g, 'A7 değişmedi (adres, yeni sekme, noopener noreferrer)', a && a.href === 'https://www.a7-1n.com/a7-produksiyon' && a.target === '_blank' && a.rel === 'noopener noreferrer', a && [a.href, a.target, a.rel]);
  T(g, 'ölçü eşliği: kart genişliği, yüksekliği ve x konumu A7 ile aynı', i && a && i.box.w === a.box.w && i.box.h === a.box.h && i.box.x === a.box.x && i.a.h === a.a.h, i && { a7: a.box, intel: i.box });
  T(g, 'stil eşliği: iç boşluk, köşe, zemin, tipografi, ok düğmesi', i && a && i.cardSt === a.cardSt && i.aSt === a.aSt && i.bSt === a.bSt && i.smSt === a.smSt && i.extSt === a.extSt && i.ext.w === a.ext.w && i.ext.h === a.ext.h && i.arrow === a.arrow, i && { card: [a.cardSt, i.cardSt], b: [a.bSt, i.bSt] });
  T(g, 'kart aralığı tutarlı (Başlangıca Dön→A7 ≈ A7→Intelligence, A7 ile Intelligence aynı yükseklikte)', i && a && Math.abs((s.order[2] - s.order[1]) - a.box.h) <= 12, { order: s.order, a7h: a && a.box.h });
  T(g, 'panel ekran içinde (gerekirse iç kaydırma), yatay taşma yok', !s.ox && s.panel.x + s.panel.w <= s.vw + 0.5 && s.panel.y + s.panel.h <= s.vh + 1, { panel: s.panel, vw: s.vw, vh: s.vh, ox: s.ox });
  if (!TOUCH) {
    const hov = async (sel) => { await pg.locator(sel).first().hover(); await pg.waitForTimeout(450); return pg.evaluate((q) => { const x = document.querySelector(q), e = x.querySelector('.n1h-ext'); return [getComputedStyle(x).backgroundColor, getComputedStyle(e).borderTopColor, getComputedStyle(x.querySelector('small')).color].join('|'); }, sel); };
    const h1 = await hov('.n1h-panel[data-open] .n1h-a7card:not(.n1h-intelcard) a'), h2 = await hov('.n1h-panel[data-open] .n1h-intelcard a'); await pg.mouse.move(5, 500);
    T(g, 'hover davranışı A7 ile aynı', h1 === h2 && /rgb\(23, 27, 24\)/.test(h2), { a7: h1, intel: h2 });
  }
  // klavye: A7'den Tab → Intelligence
  await pg.evaluate(() => document.querySelector('.n1h-panel[data-open] .n1h-a7card:not(.n1h-intelcard) a').focus()); await pg.keyboard.press('Tab'); await pg.waitForTimeout(200);
  const kf = await pg.evaluate(() => document.activeElement && document.activeElement.className);
  T(g, 'klavye: A7 → Tab → 1N Intelligence', /n1h-intel/.test(kf || ''), kf);
  // normal kapanış
  if (TOUCH) await tap(pg.locator(menuSel).first()); else await pg.keyboard.press('Escape'); await pg.waitForTimeout(800);
  const left = await pg.evaluate(() => ({ open: document.querySelectorAll('.n1h-panel[data-open]').length, vis: [...document.querySelectorAll('.n1h-panel .n1h-card,.n1h-panel .n1h-sub')].filter((c) => { const cs = getComputedStyle(c); return cs.visibility !== 'hidden' && +cs.opacity > 0.05 && c.getBoundingClientRect().height > 0; }).length }));
  T(g, 'normal kapanış: kart kalmıyor', left.open === 0 && left.vis === 0, left);
  // bağlantıyla ayrılma: Intelligence → /intelligence (aynı sekme)
  await tap(pg.locator(menuSel).first()); await pg.waitForTimeout(900);
  const pages0 = ctx.pages().length; await tap(pg.locator('.n1h-panel[data-open] .n1h-intelcard a'));
  let ok = false; for (let k = 0; k < 60 && !ok; k++) { await pg.waitForTimeout(500); try { ok = new URL(pg.url()).pathname.replace(/\/+$/, '') === '/intelligence'; } catch (e) {} }
  await pg.waitForTimeout(1500); const after = await pg.evaluate(() => document.querySelectorAll('.n1h-panel[data-open]').length).catch(() => 0);
  T(g, 'Intelligence tıklaması aynı sekmede /intelligence; menü kapalı', ok && ctx.pages().length === pages0 && after === 0, { url: pg.url(), pages: ctx.pages().length, open: after });
  return s;
}
(async () => {
  const b = await pw[BR].launch(BR === 'chromium' ? { args: ['--autoplay-policy=no-user-gesture-required'] } : {}); const rs = require('./routeshell.js'); let corp, shell;
  { const ctx = await b.newContext(CTX); await rs(ctx, {}); const pg = await ctx.newPage(); const errs = []; pg.on('pageerror', (e) => { if (!IGN.test(e.message)) errs.push(e.message.slice(0, 140)); });
    const urls = []; pg.on('request', (r) => { if (/n1-header-v1\d\.js|n1-site-markup-v1\d\.js/.test(r.url())) urls.push(r.url().split('/').pop()); });
    await pg.goto(B + '/reklam-yonetimi', { waitUntil: 'domcontentloaded', timeout: 60000 }); await pg.waitForTimeout(9000);
    T('kurumsal', 'header v16 + menü verisi v17 yüklendi (eski sürüm yok)', urls.includes('n1-header-v16.js') && urls.includes('n1-site-markup-v17.js') && !urls.some((u) => /v15\.js|markup-v16/.test(u)), urls);
    corp = await checks(pg, 'kurumsal', 'n1-header .n1h-menu', ctx); T('kurumsal', 'JS hatası yok', !errs.length, errs); await ctx.close(); }
  { const ctx = await b.newContext(CTX); await rs(ctx, {}); await rs.shellPages(ctx, SH); const pg = await ctx.newPage(); const errs = []; pg.on('pageerror', (e) => { if (!IGN.test(e.message)) errs.push(e.message.slice(0, 140)); });
    await pg.goto(B + '/iletisim?n1shell=iletisim', { waitUntil: 'domcontentloaded', timeout: 60000 }); await pg.waitForSelector('n1-global-header-v1[data-ready]', { timeout: 60000 }); await pg.waitForSelector('n1-global-footer-v1[data-ready]', { timeout: 60000 });
    await pg.evaluate(() => document.querySelector('n1-global-footer-v1').scrollIntoView()); await pg.waitForTimeout(3000); await pg.evaluate(() => scrollTo(0, 0)); await pg.waitForTimeout(500);
    const h = await pg.evaluate(() => { const hd = document.querySelector('n1-global-header-v1'), f = document.querySelector('n1-global-footer-v1'); return { ver: window.__n1GlobalShell.version, cta: !!hd.querySelector('.n1h-cta') && hd.querySelector('.n1h-cta').getBoundingClientRect().width > 0, hH: Math.round(hd.getBoundingClientRect().height), fH: Math.round(f.getBoundingClientRect().height), legal: f.querySelectorAll('.n1ft-legal a').length, partners: f.querySelectorAll('.n1ft-partner').length, fc: document.querySelectorAll('.n1fc').length }; });
    T('bağımsız', 'paket v1.2.0; Teklif Al yok; header yüksekliği aynı', h.ver === '1.2.0' && !h.cta && h.hH === (WIDTH > 1024 ? 88 : WIDTH > 767 ? 72 : 64), h);
    T('bağımsız', 'footer değişmedi (V2.1 ölçümüyle aynı yükseklik, 5 yasal, 5 partner) ve WhatsApp tek katman', Math.abs(h.fH - FOOT[WIDTH]) <= 2 && h.legal === 5 && h.partners === 5 && h.fc === 1, { fH: h.fH, beklenen: FOOT[WIDTH], fc: h.fc });
    shell = await checks(pg, 'bağımsız', 'n1-global-header-v1 .n1h-menu', ctx); T('bağımsız', 'JS hatası yok', !errs.length, errs); await ctx.close(); }
  if (corp && shell) T('tutarlılık', 'kurumsal ve bağımsız menüde Intelligence kartı aynı ölçü ve stilde', corp.intel.box.w === shell.intel.box.w && corp.intel.box.h === shell.intel.box.h && corp.intel.cardSt === shell.intel.cardSt && corp.intel.bSt === shell.intel.bSt, { c: corp.intel.box, s: shell.intel.box });
  console.log(BR, WIDTH, 'TOPLAM', pass, 'geçti', fail, 'kaldı');
  if (OUT) fs.writeFileSync(OUT, JSON.stringify({ br: BR, width: WIDTH, pass, fail, meas, results }, null, 1)); await b.close();
})();
