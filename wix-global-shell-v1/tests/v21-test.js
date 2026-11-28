// Global Menü V2.1 hedefli test: yalnız "Uygulama ve Platformlar" + etkilenen menü davranışı. node v21-test.js <chromium|webkit> <width> [out.json]
const pw = require('playwright'); const fs = require('fs');
const [, , BR = 'chromium', WS = '1440', OUT] = process.argv; const WIDTH = +WS; const TOUCH = WIDTH <= 1024;
const IOS = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.7 Mobile/15E148 Safari/604.1';
const CTX = TOUCH ? Object.assign({ viewport: { width: WIDTH, height: WIDTH < 400 ? (WIDTH < 340 ? 568 : 844) : 1366 }, deviceScaleFactor: 2, hasTouch: true }, BR === 'chromium' ? { isMobile: true } : {}, WIDTH < 768 ? { userAgent: IOS } : {}) : { viewport: { width: WIDTH, height: 900 } };
const B = 'https://www.reklam1n.com'; const SH = 'https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@' + (process.env.SHELL_SHA || '0000000000000000000000000000000000000000') + '/wix-global-shell-v1/' + (process.env.SHELL_FILE || 'n1-global-shell-v1-1.js');
const BOX = WIDTH > 1024 ? 56 : WIDTH > 767 ? 52 : 48, ICO = WIDTH > 1024 ? 32 : WIDTH > 767 ? 30 : 28, GAP = WIDTH > 767 ? 10 : 8;
const LINKS = [['https://www.zeyp.com.tr/', 1], ['https://www.carsialtin.com/faprika/canli-piyasalar/', 1], ['https://www.hementik.la/', 1], ['https://www.reklam1n.com/intelligence', 0]];
const IGN = /googleadservices|doubleclick|Cross-origin script|Failed to fetch|Load failed|ChunkLoad|SiteAssets|notifyEventToEditorApp|Fetch API|Transition/;
const results = []; let pass = 0, fail = 0; const meas = {};
function T(g, n, ok, info) { results.push({ g, n, ok: !!ok, info }); ok ? pass++ : fail++; console.log(BR, WIDTH, ok ? 'GEÇTİ' : 'KALDI', g, '·', n, info === undefined ? '' : '· ' + JSON.stringify(info).slice(0, 260)); }
const plat = () => { const p = [...document.querySelectorAll('.n1h-panel')].find((x) => x.hasAttribute('data-open')); if (!p) return null; const card = p.querySelector('.n1h-platcard'), h3 = card.querySelector('h3'); const pr = p.getBoundingClientRect(), cr = card.getBoundingClientRect();
  const tiles = [...card.querySelectorAll('a.n1h-plat')].map((a) => { const r = a.getBoundingClientRect(), s = a.querySelector('svg'), sr = s ? s.getBoundingClientRect() : null, cs = getComputedStyle(a);
    return { href: a.getAttribute('href'), target: a.getAttribute('target'), rel: a.getAttribute('rel'), label: a.getAttribute('aria-label'), x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width * 10) / 10, h: Math.round(r.height * 10) / 10, svg: !!s, img: !!a.querySelector('img'), sw: sr && Math.round(sr.width), sh: sr && Math.round(sr.height), paths: s ? s.querySelectorAll('path').length : 0, fill: s && getComputedStyle(s.querySelector('path')).fill, color: cs.color, bg: cs.backgroundColor, rad: cs.borderTopLeftRadius, shadow: cs.boxShadow, trans: cs.transitionDuration, transform: cs.transform }; });
  return { tiles, h3x: Math.round(h3.getBoundingClientRect().left), h3b: Math.round(h3.getBoundingClientRect().bottom), cardH: Math.round(cr.height), cardW: Math.round(cr.width), panelW: Math.round(pr.width), panelR: Math.round(pr.right), panelB: Math.round(pr.bottom), vw: innerWidth, vh: innerHeight, ox: p.scrollWidth > p.clientWidth + 1 || document.documentElement.scrollWidth > innerWidth, webp: performance.getEntriesByType('resource').filter((e) => /assets\/platforms\/.*\.webp/.test(e.name)).length }; };
async function checks(pg, g, menuSel) {
  const tap = (l) => TOUCH ? l.tap() : l.click();
  await tap(pg.locator(menuSel).first()); await pg.waitForTimeout(1000);
  const s = await pg.evaluate(plat); if (!s) { T(g, 'menü açıldı', false); return null; }
  const t = s.tiles; meas[g] = s;
  T(g, 'sıra ve bağlantılar değişmedi (4 platform)', t.length === 4 && t.every((x, i) => x.href === LINKS[i][0]), t.map((x) => x.href));
  T(g, 'yeni sekme + noopener noreferrer (dış), Intelligence aynı sekme; erişilebilir etiket', t.every((x, i) => LINKS[i][1] ? x.target === '_blank' && x.rel === 'noopener noreferrer' && /\(yeni sekmede açılır\)/.test(x.label) : !x.target && x.label === '1N Intelligence'), t.map((x) => [x.target, x.rel, x.label]));
  T(g, `kutu ${BOX}×${BOX} px (aşmıyor), ≥ 44 px dokunma hedefi`, t.every((x) => Math.abs(x.w - BOX) < 0.6 && Math.abs(x.h - BOX) < 0.6 && x.w >= 44), t.map((x) => [x.w, x.h]));
  T(g, `sembol ${ICO} px (tek renkli SVG, görsel değil)`, t.every((x) => x.svg && !x.img && Math.abs(x.sw - ICO) <= 1 && x.paths >= 1), t.map((x) => [x.sw, x.paths, x.img]));
  T(g, `tek satır, aralık ${GAP} px, sola hizalı (başlıkla aynı x)`, t.every((x) => x.y === t[0].y) && t.slice(1).every((x, i) => Math.abs(x.x - (t[i].x + t[i].w) - GAP) <= 1) && Math.abs(t[0].x - s.h3x) <= 1, { xs: t.map((x) => x.x), h3x: s.h3x });
  T(g, 'başlık–logo satırı aralığı 10–12 px', t[0].y - s.h3b >= 10 && t[0].y - s.h3b <= 12, t[0].y - s.h3b);
  T(g, 'normal görünüm: zemin #1A1C1B, logo #BDBFB9, köşe 8 px, ince çerçeve', t.every((x) => x.bg === 'rgb(26, 28, 27)' && x.color === 'rgb(189, 191, 185)' && x.fill === 'rgb(189, 191, 185)' && x.rad === '8px' && /rgba\(189, 191, 185, 0\.14\)/.test(x.shadow)), t.map((x) => [x.bg, x.fill, x.rad]));
  T(g, 'renkli WebP logolar indirilmedi', s.webp === 0, s.webp);
  T(g, 'panel ekran içinde, yatay taşma yok', !s.ox && s.panelR <= s.vw && s.panelB <= s.vh + 1, { ox: s.ox, r: s.panelR, vw: s.vw, b: s.panelB, vh: s.vh });
  T(g, 'kart kompakt (yükseklik ≤ ' + (BOX + 62) + ' px)', s.cardH <= BOX + 62, s.cardH);
  if (!TOUCH) {
    await pg.locator('.n1h-panel[data-open] a.n1h-plat').nth(1).hover(); await pg.waitForTimeout(400);
    const hv = await pg.evaluate(() => { const a = document.querySelectorAll('.n1h-panel[data-open] a.n1h-plat')[1], cs = getComputedStyle(a); return { color: cs.color, fill: getComputedStyle(a.querySelector('path')).fill, shadow: cs.boxShadow, bg: cs.backgroundColor, transform: cs.transform, dur: cs.transitionDuration, prop: cs.transitionProperty }; });
    T(g, 'hover: logo #A2FF00, çerçeve düşük yoğunluklu #A2FF00, zemin koyu, büyüme/dönme yok, 200 ms', hv.color === 'rgb(162, 255, 0)' && hv.fill === 'rgb(162, 255, 0)' && /rgba\(162, 255, 0, 0\.32\)/.test(hv.shadow) && hv.bg === 'rgb(26, 28, 27)' && hv.transform === 'none' && /0\.2s/.test(hv.dur) && !/transform/.test(hv.prop), hv);
    await pg.mouse.move(5, 300); await pg.waitForTimeout(400);
    const back = await pg.evaluate(() => getComputedStyle(document.querySelectorAll('.n1h-panel[data-open] a.n1h-plat')[1]).color);
    T(g, 'hover bitince monokroma döner', back === 'rgb(189, 191, 185)', back);
  } else {
    const hv = await pg.evaluate(() => matchMedia('(hover:hover) and (pointer:fine)').matches);
    T(g, 'dokunmatikte hover kuralı devre dışı (işlev hover\'a bağlı değil)', !hv, hv);
  }
  // klavye odağı: odağı ilk platform bağlantısından önceki öğeye koy, Tab
  await pg.evaluate(() => { const a = document.querySelector('.n1h-panel[data-open] .n1h-a7') || document.querySelector('.n1h-panel[data-open] .n1h-brand'); a.focus(); });
  await pg.keyboard.press('Tab'); await pg.waitForTimeout(300);
  const fv = await pg.evaluate(() => { const a = document.activeElement; return { cls: a && a.className, fv: a && a.matches(':focus-visible'), shadow: a && getComputedStyle(a).boxShadow, color: a && getComputedStyle(a).color }; });
  T(g, 'klavye focus-visible: #A2FF00 halka', /n1h-plat/.test(fv.cls) && fv.fv && /rgb\(162, 255, 0\) 0px 0px 0px 4px/.test(fv.shadow) && fv.color === 'rgb(162, 255, 0)', fv);
  // kapanış
  if (TOUCH) await tap(pg.locator(menuSel).first()); else await pg.keyboard.press('Escape');
  await pg.waitForTimeout(800);
  const left = await pg.evaluate(() => ({ open: document.querySelectorAll('.n1h-panel[data-open]').length, vis: [...document.querySelectorAll('.n1h-panel .n1h-card,.n1h-panel .n1h-sub')].filter((c) => { const cs = getComputedStyle(c); return cs.visibility !== 'hidden' && +cs.opacity > 0.05 && c.getBoundingClientRect().height > 0; }).length }));
  T(g, 'menü kapanıyor, kart kalmıyor', left.open === 0 && left.vis === 0, left);
  await tap(pg.locator(menuSel).first()); await pg.waitForTimeout(900);
  const re = await pg.evaluate(() => document.querySelectorAll('.n1h-panel[data-open] a.n1h-plat svg').length);
  T(g, 'yeniden açılış: logolar yerinde', re === 4, re);
  if (TOUCH) await tap(pg.locator(menuSel).first()); else await pg.keyboard.press('Escape'); await pg.waitForTimeout(600);
  return s;
}
(async () => {
  const b = await pw[BR].launch(BR === 'chromium' ? { args: ['--autoplay-policy=no-user-gesture-required'] } : {}); const rs = require('./routeshell.js');
  // 1) kurumsal sayfa (ortak header v15, mevcut sayfa)
  let corp, shell, hdr = {};
  { const ctx = await b.newContext(CTX); await rs(ctx, {}); const pg = await ctx.newPage(); const errs = []; pg.on('pageerror', (e) => { if (!IGN.test(e.message)) errs.push(e.message.slice(0, 140)); });
    const urls = []; pg.on('request', (r) => { if (/n1-header-v1\d\.js/.test(r.url())) urls.push(r.url().split('/').pop()); });
    await pg.goto(B + '/reklam-yonetimi', { waitUntil: 'domcontentloaded', timeout: 60000 }); await pg.waitForTimeout(9000);
    T('kurumsal', 'header v15 yüklendi (v14 yok)', urls.includes('n1-header-v15.js') && !urls.includes('n1-header-v14.js'), urls);
    hdr.corp = await pg.evaluate(() => { const h = document.querySelector('n1-header'), r = (e) => { const q = e.getBoundingClientRect(); return [Math.round(q.left), Math.round(q.top), Math.round(q.width), Math.round(q.height)]; }; return { logo: r(h.querySelector('.n1h-logo img')), tag: r(h.querySelector('.n1h-tag')), menu: r(h.querySelector('.n1h-menu')), cta: !!(h.querySelector('.n1h-cta') && h.querySelector('.n1h-cta').getBoundingClientRect().width) }; });
    corp = await checks(pg, 'kurumsal', 'n1-header .n1h-menu'); T('kurumsal', 'JS hatası yok', !errs.length, errs); await ctx.close(); }
  // 2) bağımsız header (İletişim test sayfası)
  { const ctx = await b.newContext(CTX); await rs(ctx, {}); await rs.shellPages(ctx, SH); const pg = await ctx.newPage(); const errs = []; pg.on('pageerror', (e) => { if (!IGN.test(e.message)) errs.push(e.message.slice(0, 140)); });
    await pg.goto(B + '/iletisim?n1shell=iletisim', { waitUntil: 'domcontentloaded', timeout: 60000 }); await pg.waitForSelector('n1-global-header-v1[data-ready]', { timeout: 60000 }); await pg.waitForSelector('n1-global-footer-v1[data-ready]', { timeout: 60000 }); await pg.waitForTimeout(1500);
    hdr.shell = await pg.evaluate(() => { const h = document.querySelector('n1-global-header-v1'), r = (e) => { const q = e.getBoundingClientRect(); return [Math.round(q.left), Math.round(q.top), Math.round(q.width), Math.round(q.height)]; }; return { logo: r(h.querySelector('.n1h-logo img')), tag: r(h.querySelector('.n1h-tag')), menu: r(h.querySelector('.n1h-menu')), cta: !!h.querySelector('.n1h-cta') && !!h.querySelector('.n1h-cta').getBoundingClientRect().width, ver: (window.__n1GlobalShell || {}).version, hH: Math.round(h.getBoundingClientRect().height),
      footer: (() => { const f = document.querySelector('n1-global-footer-v1'); return { h: Math.round(f.getBoundingClientRect().height), legal: f.querySelectorAll('.n1ft-legal a').length, soc: f.querySelectorAll('.n1ft-socials svg, .n1ft-social svg').length, partners: f.querySelectorAll('.n1ft-partner').length }; })(), fc: document.querySelectorAll('.n1fc').length }; });
    T('bağımsız', 'paket v1.1.0, Teklif Al yok', hdr.shell.ver === '1.1.0' && !hdr.shell.cta, { ver: hdr.shell.ver, cta: hdr.shell.cta });
    shell = await checks(pg, 'bağımsız', 'n1-global-header-v1 .n1h-menu');
    const f = hdr.shell.footer, EXPF = { 1920: 611, 1440: 578, 1024: 718, 820: 784, 390: 867, 375: 844, 320: 856 }[WIDTH];
    T('bağımsız', 'footer değişmedi (yükseklik V2 ölçümüyle aynı, 5 yasal, 4 sosyal SVG, 5 partner)', Math.abs(f.h - EXPF) <= 8 && f.legal === 5 && f.soc === 4 && f.partners === 5, { f, EXPF });
    T('bağımsız', 'WhatsApp/Yukarı Çık tek katman', hdr.shell.fc <= 1, hdr.shell.fc);
    T('bağımsız', 'JS hatası yok', !errs.length, errs); await ctx.close(); }
  // 3) tutarlılık
  if (corp && shell) {
    T('tutarlılık', 'kurumsal ve bağımsız menüde platform kutuları aynı (boyut, sembol, renk)', corp.tiles.every((x, i) => x.w === shell.tiles[i].w && x.sw === shell.tiles[i].sw && x.bg === shell.tiles[i].bg && x.color === shell.tiles[i].color), { c: corp.tiles.map((x) => [x.w, x.sw]), s: shell.tiles.map((x) => [x.w, x.sw]) });
    const sameTop = JSON.stringify(hdr.corp.logo) === JSON.stringify(hdr.shell.logo) && hdr.corp.tag[3] === hdr.shell.tag[3];
    T('tutarlılık', 'header üst bölümü: logo ve slogan kurumsal ile tutarlı', WIDTH <= 1024 && WIDTH > 767 ? hdr.corp.tag[3] === hdr.shell.tag[3] : sameTop, { corp: hdr.corp, shell: { logo: hdr.shell.logo, tag: hdr.shell.tag } });
  }
  console.log(BR, WIDTH, 'TOPLAM', pass, 'geçti', fail, 'kaldı');
  if (OUT) fs.writeFileSync(OUT, JSON.stringify({ br: BR, width: WIDTH, pass, fail, meas, hdr, results }, null, 1));
  await b.close();
})();
