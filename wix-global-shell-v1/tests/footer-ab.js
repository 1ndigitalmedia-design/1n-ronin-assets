// Footer A/B: V2 paketi (n1-global-shell-v1.js) ↔ V2.1 paketi (n1-global-shell-v1-1.js), aynı koşul (footer'a kaydırılır, görsel yüklenir). node footer-ab.js <br>
const pw = require('playwright'); const fs = require('fs'); const BR = process.argv[2] || 'chromium';
const W = [1920, 1440, 1024, 820, 390, 375, 320]; const out = {};
const SH = (f) => 'https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@0000000000000000000000000000000000000000/wix-global-shell-v1/' + f;
(async () => { const b = await pw[BR].launch(); const rs = require('./routeshell.js');
  for (const w of W) for (const f of ['n1-global-shell-v1.js', 'n1-global-shell-v1-1.js']) {
    const T = w <= 1024; const ctx = await b.newContext(T ? Object.assign({ viewport: { width: w, height: w < 400 ? (w < 340 ? 568 : 844) : 1366 }, deviceScaleFactor: 2, hasTouch: true }, BR === 'chromium' ? { isMobile: true } : {}) : { viewport: { width: w, height: 900 } });
    await rs(ctx, {}); await rs.shellPages(ctx, SH(f)); const pg = await ctx.newPage();
    await pg.goto('https://www.reklam1n.com/iletisim?n1shell=iletisim', { waitUntil: 'domcontentloaded', timeout: 60000 }); await pg.waitForSelector('n1-global-footer-v1[data-ready]', { timeout: 60000 });
    await pg.evaluate(() => document.querySelector('n1-global-footer-v1').scrollIntoView()); await pg.waitForTimeout(3500);
    const m = await pg.evaluate(() => { const ft = document.querySelector('n1-global-footer-v1'), r = ft.getBoundingClientRect(), art = ft.querySelector('.n1ft-partner-art img'); return { h: Math.round(r.height), html: ft.innerHTML.replace(/© \d{4}/, '©').length, art: art ? art.naturalWidth : null, gap: Math.round(document.documentElement.scrollHeight - (r.bottom + scrollY)) }; });
    (out[w] = out[w] || {})[f.includes('v1-1') ? 'v21' : 'v2'] = m; await ctx.close(); }
  for (const w of W) out[w].same = out[w].v2.h === out[w].v21.h && out[w].v2.html === out[w].v21.html;
  console.log(JSON.stringify(out)); fs.writeFileSync(__dirname + '/../qa/v21/footer-ab-' + BR + '.json', JSON.stringify(out, null, 1)); await b.close(); })();
