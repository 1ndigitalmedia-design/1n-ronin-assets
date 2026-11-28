// Teslim görselleri + görsel karşılaştırma ölçümleri (Chromium). Çıktı: wix-global-shell-v1/screenshots/
const pw = require('playwright'); const fs = require('fs'); const { execFileSync } = require('child_process');
const OUT = __dirname + '/../screenshots/'; const B = 'https://www.reklam1n.com';
const SH = 'https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@' + (process.env.SHELL_SHA || '0000000000000000000000000000000000000000') + '/wix-global-shell-v1/' + (process.env.SHELL_FILE || 'n1-global-shell-v1-2.js');
const PROF = { masaustu: { viewport: { width: 1440, height: 900 } }, tablet: { viewport: { width: 820, height: 1180 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true }, mobil: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true } };
const report = {};
(async () => {
  const b = await pw.chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] });
  async function page(prof, path, opt) { const ctx = await b.newContext(PROF[prof]); const rs = require('./routeshell.js'); await rs(ctx, {}, opt && opt.live ? { mode: 'live' } : {}); await rs.shellPages(ctx, SH);
    const pg = await ctx.newPage(); await pg.goto(B + path, { waitUntil: 'domcontentloaded', timeout: 60000 }); await pg.waitForTimeout(opt && opt.wait || 9000); return { ctx, pg }; }
  const tap = (prof, l) => prof === 'masaustu' ? l.click() : l.tap();
  const ONLY = process.env.VIS_ONLY; if (ONLY !== 'birlesik') {
  // 1) yeni global menü (mevcut sayfada, yeni sürüm) — masaüstü ve mobil; İK alt menüsü açık
  for (const prof of ['masaustu', 'mobil']) {
    const { ctx, pg } = await page(prof, '/reklam-yonetimi');
    await tap(prof, pg.locator('n1-header .n1h-menu').first()); await pg.waitForTimeout(1200);
    await pg.screenshot({ path: OUT + `global-menu-${prof}.png` });
    await tap(prof, pg.locator('.n1h-panel[data-open] .n1h-subtog')); await pg.waitForTimeout(900);
    await pg.screenshot({ path: OUT + `global-menu-ik-alt-menu-${prof}.png` });
    await tap(prof, pg.locator('.n1h-panel[data-open] .n1h-subtog')); await pg.waitForTimeout(700);
    await pg.locator('.n1h-panel[data-open] .n1h-a7card').scrollIntoViewIfNeeded(); await pg.locator('.n1h-panel[data-open] .n1h-platcard').scrollIntoViewIfNeeded(); await pg.waitForTimeout(500);
    const ba = await pg.locator('.n1h-panel[data-open] .n1h-a7card').boundingBox(), bp = await pg.locator('.n1h-panel[data-open] .n1h-platcard').boundingBox();
    const x0 = Math.max(0, Math.min(ba.x, bp.x) - 8), y0 = Math.max(0, Math.min(ba.y, bp.y) - 8);
    const cards = { x: x0, y: y0, width: Math.min(PROF[prof].viewport.width - x0, Math.max(ba.x + ba.width, bp.x + bp.width) - x0 + 8), height: Math.min(PROF[prof].viewport.height - y0, Math.max(ba.y + ba.height, bp.y + bp.height) - y0 + 8) };
    report['cards_' + prof] = { a7: ba, plat: bp };
    await pg.screenshot({ path: OUT + `a7-ve-platformlar-${prof}.png`, clip: cards });
    await ctx.close();
  }
  // eski menü (bugün canlı V1.4) — karşılaştırma için
  for (const prof of ['masaustu', 'mobil']) { const { ctx, pg } = await page(prof, '/reklam-yonetimi', { live: true }); await tap(prof, pg.locator('n1-header .n1h-menu').first()); await pg.waitForTimeout(1200); await pg.screenshot({ path: OUT + `global-menu-${prof}-ONCE-canli.png` }); await ctx.close(); }
  // 2) bağımsız header — kapalı ve menü açık; kurumsal header ile karşılaştırma (aynı genişlik)
  for (const prof of ['masaustu', 'tablet', 'mobil']) {
    const { ctx, pg } = await page(prof, '/iletisim?n1shell=iletisim', { wait: 6000 }); await pg.waitForSelector('n1-global-header-v1[data-ready]');
    const hh = await pg.evaluate(() => Math.round(document.querySelector('n1-global-header-v1').getBoundingClientRect().height));
    await pg.screenshot({ path: OUT + `bagimsiz-header-${prof}.png`, clip: { x: 0, y: 0, width: PROF[prof].viewport.width, height: hh } });
    await tap(prof, pg.locator('n1-global-header-v1 .n1h-menu')); await pg.waitForTimeout(1200);
    await pg.screenshot({ path: OUT + `bagimsiz-header-menu-${prof}.png` });
    const shellH = await pg.evaluate(() => { const h = document.querySelector('n1-global-header-v1'), l = h.querySelector('.n1h-logo img'), t = h.querySelector('.n1h-tag'), m = h.querySelector('.n1h-menu'), bar = h.querySelector('.n1h-bar');
      const r = (e) => { const q = e.getBoundingClientRect(); return [Math.round(q.left), Math.round(q.top), Math.round(q.width), Math.round(q.height)]; };
      return { h: Math.round(h.getBoundingClientRect().height), logo: r(l), logoSrc: l.src.length, tag: r(t), tagFont: getComputedStyle(t).font, menu: r(m), menuFont: getComputedStyle(m).font, bar: r(bar), cta: !!h.querySelector('.n1h-cta') }; });
    await ctx.close();
    const c = await page(prof, '/kisaca-biz');
    await c.pg.evaluate(() => scrollTo(0, 0)); await c.pg.waitForTimeout(600);
    const corpH = await c.pg.evaluate(() => { const h = document.querySelector('n1-header'), l = h.querySelector('.n1h-logo img'), t = h.querySelector('.n1h-tag'), m = h.querySelector('.n1h-menu'), bar = h.querySelector('.n1h-bar');
      const r = (e) => { const q = e.getBoundingClientRect(); return [Math.round(q.left), Math.round(q.top), Math.round(q.width), Math.round(q.height)]; };
      return { h: Math.round(bar.getBoundingClientRect().height), logo: r(l), logoSrc: l.src.length, tag: r(t), tagFont: getComputedStyle(t).font, menu: r(m), menuFont: getComputedStyle(m).font, bar: r(bar), cta: !!(h.querySelector('.n1h-cta') && h.querySelector('.n1h-cta').getBoundingClientRect().width) }; });
    await c.pg.screenshot({ path: OUT + `kurumsal-header-${prof}.png`, clip: { x: 0, y: 0, width: PROF[prof].viewport.width, height: corpH.h } });
    await c.ctx.close();
    report['header_' + prof] = { bagimsiz: shellH, kurumsal: corpH };
  }
  // 3) bağımsız footer ↔ kurumsal footer (aynı genişlik)
  for (const prof of ['masaustu', 'tablet', 'mobil']) {
    const { ctx, pg } = await page(prof, '/iletisim?n1shell=iletisim', { wait: 6000 }); await pg.waitForSelector('n1-global-footer-v1[data-ready]'); await pg.waitForTimeout(2500);
    await pg.evaluate(() => document.querySelector('n1-global-footer-v1').scrollIntoView()); await pg.waitForTimeout(2500);
    const fs1 = await pg.evaluate(() => { const f = document.querySelector('n1-global-footer-v1'); const r = f.getBoundingClientRect(); const pick = (s) => { const e = f.querySelector(s); if (!e) return null; const q = e.getBoundingClientRect(); return [Math.round(q.left), Math.round(q.top - r.top), Math.round(q.width), Math.round(q.height), getComputedStyle(e).fontSize, getComputedStyle(e).fontFamily.split(',')[0]]; };
      return { h: Math.round(r.height), brand: pick('.n1ft-brand'), top: pick('.n1ft-top'), legal: pick('.n1ft-legal'), partners: pick('.n1ft-partners'), art: pick('.n1ft-partner-art'), copy: pick('.n1ft-copy') }; });
    await pg.locator('n1-global-footer-v1').screenshot({ path: OUT + `bagimsiz-footer-${prof}.png` });
    await ctx.close();
    const c = await page(prof, '/kisaca-biz'); await c.pg.evaluate(() => document.querySelector('footer.n1ft').scrollIntoView()); await c.pg.waitForTimeout(3000);
    const fs2 = await c.pg.evaluate(() => { const f = document.querySelector('footer.n1ft'); const r = f.getBoundingClientRect(); const pick = (s) => { const e = f.querySelector(s); if (!e) return null; const q = e.getBoundingClientRect(); return [Math.round(q.left), Math.round(q.top - r.top), Math.round(q.width), Math.round(q.height), getComputedStyle(e).fontSize, getComputedStyle(e).fontFamily.split(',')[0]]; };
      return { h: Math.round(r.height), brand: pick('.n1ft-brand'), top: pick('.n1ft-top'), legal: pick('.n1ft-legal'), partners: pick('.n1ft-partners'), art: pick('.n1ft-partner-art'), copy: pick('.n1ft-copy') }; });
    await c.pg.locator('footer.n1ft').screenshot({ path: OUT + `kurumsal-footer-${prof}.png` });
    await c.ctx.close();
    report['footer_' + prof] = { bagimsiz: fs1, kurumsal: fs2 };
  }
  }
  // 4) birleşik sayfalar (İletişim: header + HTML V4 içerik + Wix Forms alanı + footer), Akademi, 404
  for (const prof of ['masaustu', 'tablet', 'mobil']) for (const [path, n] of [['/iletisim?n1shell=iletisim', 'iletisim'], ['/reklam-ajansi?n1shell=akademi', 'akademi'], ['/bu-sayfa-yok-xyz?n1shell=404', '404']]) {
    if (n !== 'iletisim' && prof === 'tablet') continue;
    const { ctx, pg } = await page(prof, path, { wait: 7000 }); await pg.waitForTimeout(1500);
    await pg.screenshot({ path: OUT + `birlesik-${n}-${prof}.png`, fullPage: true }); await ctx.close();
  }
  if (!ONLY) fs.writeFileSync(__dirname + '/../qa/visual-compare.json', JSON.stringify(report, null, 1)); console.log(JSON.stringify(report).slice(0, 3000));
  await b.close();
})();
