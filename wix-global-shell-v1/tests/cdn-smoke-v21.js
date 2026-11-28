// Gerçek jsDelivr duman testi (yönlendirme YOK): V2.1 paketi + header v15 + menü verisi v16 CDN'den; 3 etiket, platform logoları, footer
const pw = require('playwright'); const fs = require('fs');
const U = 'https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/n1-global-shell-v1-1.js';
(async () => { const out = [];
  for (const br of ['chromium', 'webkit']) for (const w of [1440, 390]) {
    const b = await pw[br].launch(); const ctx = await b.newContext({ viewport: { width: w, height: w < 500 ? 844 : 900 } }); const pg = await ctx.newPage(); const req = [];
    pg.on('request', (r) => { if (/jsdelivr/.test(r.url())) req.push(r.url().replace(/.*1n-ronin-assets@(\w{7})\w*\//, '$1 ')); });
    await ctx.route('https://www.reklam1n.com/n1-cdn-smoke', (r) => r.fulfill({ status: 200, contentType: 'text/html', body: `<!doctype html><meta charset=utf-8><meta name=viewport content="width=device-width"><body style="margin:0;background:#080A09"><n1-global-header-v1></n1-global-header-v1><div style="height:1200px"></div><n1-global-footer-v1></n1-global-footer-v1><n1-global-floating-v1></n1-global-floating-v1><script src="${U}"></script></body>` }));
    await pg.goto('https://www.reklam1n.com/n1-cdn-smoke'); await pg.waitForSelector('n1-global-header-v1[data-ready]', { timeout: 60000 }); await pg.waitForSelector('n1-global-footer-v1[data-ready]', { timeout: 60000 });
    await pg.locator('n1-global-header-v1 .n1h-menu').click(); await pg.waitForTimeout(1000);
    const r = await pg.evaluate(() => ({ ver: window.__n1GlobalShell.version, tiles: [...document.querySelectorAll('.n1h-panel[data-open] a.n1h-plat')].map((a) => [Math.round(a.getBoundingClientRect().width), !!a.querySelector('svg'), getComputedStyle(a).color]), footer: Math.round(document.querySelector('n1-global-footer-v1').getBoundingClientRect().height), fc: document.querySelectorAll('.n1fc').length, cta: !!document.querySelector('n1-global-header-v1 .n1h-cta') && document.querySelector('n1-global-header-v1 .n1h-cta').getBoundingClientRect().width > 0 }));
    const ok = r.ver === '1.1.0' && r.tiles.length === 4 && r.tiles.every((t) => t[0] === (w > 1024 ? 56 : 48) && t[1] && t[2] === 'rgb(189, 191, 185)') && r.footer > 500 && !r.cta && req.some((x) => /6df38aa wix-global-shell-v1\/modules\/n1-header-v15\.js/.test(x)) && !req.some((x) => /n1-header-v14|assets\/platforms\/.*webp/.test(x));
    out.push({ br, w, ok, r, req }); console.log(br, w, ok ? 'GEÇTİ' : 'KALDI', JSON.stringify(r)); await b.close(); }
  fs.writeFileSync(__dirname + '/../qa/v21/cdn-smoke-v21.json', JSON.stringify(out, null, 1)); console.log('TOPLAM', out.filter((x) => x.ok).length, '/', out.length); })();
