// V2.2 görselleri: yeni menü (masaüstü/tablet/mobil; kurumsal + bağımsız), alt kartlar eski (V2.1) ↔ yeni (V2.2). Çıktı: screenshots/v22/
const pw = require('playwright'); const { execFileSync } = require('child_process'); const fs = require('fs');
const OUT = __dirname + '/../screenshots/v22/'; fs.mkdirSync(OUT, { recursive: true }); const B = 'https://www.reklam1n.com';
const PROF = { masaustu: { viewport: { width: 1440, height: 900 } }, tablet: { viewport: { width: 820, height: 1180 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true }, mobil: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true } };
const SH = (f) => 'https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@0000000000000000000000000000000000000000/wix-global-shell-v1/' + f;
(async () => { const b = await pw.chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] });
  async function shot(prof, ver, path, sel, fn) {
    process.env.N1_VER = ver === 'eski' ? '21' : '22'; delete require.cache[require.resolve('./routeshell.js')]; const rs = require('./routeshell.js');
    const ctx = await b.newContext(PROF[prof]); await rs(ctx, {}); if (path.includes('n1shell')) await rs.shellPages(ctx, SH(ver === 'eski' ? 'n1-global-shell-v1-1.js' : 'n1-global-shell-v1-2.js'));
    const pg = await ctx.newPage(); await pg.goto(B + path, { waitUntil: 'domcontentloaded', timeout: 60000 }); await pg.waitForTimeout(path.includes('n1shell') ? 6000 : 9000);
    const m = pg.locator(sel).first(); prof === 'masaustu' ? await m.click() : await m.tap(); await pg.waitForTimeout(1300); await fn(pg); await ctx.close(); }
  const cards = async (pg, file) => { const r = await pg.evaluate(() => { const p = document.querySelector('.n1h-panel[data-open]'); p.scrollTop = 0; const cs = [...p.querySelectorAll('.n1h-card:not(.n1h-main)')].map((c) => c.getBoundingClientRect()); const top = Math.min(...cs.map((c) => c.top)), bot = Math.max(...cs.map((c) => c.bottom)); return { x: cs[0].left - 6, y: top - 6, w: cs[0].width + 12, h: bot - top + 12, bot }; });
    if (r.bot > PROF.mobil.viewport.height && false) {} await pg.screenshot({ path: file, clip: { x: Math.max(0, r.x), y: Math.max(0, r.y), width: r.w, height: r.h }, fullPage: true }); };
  for (const prof of ['masaustu', 'tablet', 'mobil']) for (const ver of ['eski', 'yeni']) await shot(prof, ver, '/reklam-yonetimi', 'n1-header .n1h-menu', async (pg) => {
    if (ver === 'yeni') await pg.screenshot({ path: OUT + `menu-${prof}.png` });
    if (prof === 'masaustu' && ver === 'yeni') { await pg.locator('.n1h-panel[data-open] .n1h-intelcard a').hover(); await pg.waitForTimeout(450); await pg.screenshot({ path: OUT + 'menu-masaustu-intelligence-hover.png' }); await pg.mouse.move(5, 500); await pg.waitForTimeout(400); }
    await cards(pg, OUT + `kartlar-${prof}-${ver}.png`); });
  for (const prof of ['masaustu', 'mobil']) await shot(prof, 'yeni', '/iletisim?n1shell=iletisim', 'n1-global-header-v1 .n1h-menu', async (pg) => { await pg.screenshot({ path: OUT + `bagimsiz-header-menu-${prof}.png` }); });
  for (const prof of ['masaustu', 'tablet', 'mobil']) execFileSync('convert', [OUT + `kartlar-${prof}-eski.png`, OUT + `kartlar-${prof}-yeni.png`, '-background', '#080A09', '-gravity', 'north', '+append', OUT + `karsilastirma-${prof}.png`]);
  await b.close(); console.log(fs.readdirSync(OUT).join(' ')); })();
