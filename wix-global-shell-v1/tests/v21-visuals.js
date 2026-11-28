// V2.1 görselleri: platform alanı eski (V2) ↔ yeni (V2.1), masaüstü/tablet/mobil; tam menü; hover/odak; bağımsız header menüsü. Çıktı: screenshots/v21/
const pw = require('playwright'); const { execFileSync } = require('child_process'); const fs = require('fs');
const OUT = __dirname + '/../screenshots/v21/'; fs.mkdirSync(OUT, { recursive: true }); const B = 'https://www.reklam1n.com';
const PROF = { masaustu: { viewport: { width: 1440, height: 900 } }, tablet: { viewport: { width: 820, height: 1180 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true }, mobil: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true } };
const SH = (f) => 'https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@0000000000000000000000000000000000000000/wix-global-shell-v1/' + f;
(async () => {
  const b = await pw.chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] });
  async function shot(prof, ver, path, sel, name, extra) {
    process.env.N1_VER = ver === 'eski' ? '20' : '21'; delete require.cache[require.resolve('./routeshell.js')]; const rs = require('./routeshell.js');
    const ctx = await b.newContext(PROF[prof]); await rs(ctx, {}); if (path.includes('n1shell')) await rs.shellPages(ctx, SH(ver === 'eski' ? 'n1-global-shell-v1.js' : 'n1-global-shell-v1-1.js'));
    const pg = await ctx.newPage(); await pg.goto(B + path, { waitUntil: 'domcontentloaded', timeout: 60000 }); await pg.waitForTimeout(path.includes('n1shell') ? 6000 : 9000);
    const m = pg.locator(sel).first(); prof === 'masaustu' ? await m.click() : await m.tap(); await pg.waitForTimeout(1300);
    const card = pg.locator('.n1h-panel[data-open] .n1h-platcard'); await card.scrollIntoViewIfNeeded(); await pg.waitForTimeout(400);
    await card.screenshot({ path: OUT + `platform-${prof}-${ver}${name || ''}.png` });
    if (extra) await extra(pg, prof, ver);
    await ctx.close();
  }
  for (const prof of ['masaustu', 'tablet', 'mobil']) for (const ver of ['eski', 'yeni'])
    await shot(prof, ver, '/reklam-yonetimi', 'n1-header .n1h-menu', '', async (pg) => {
      await pg.evaluate(() => { const p = document.querySelector('.n1h-panel[data-open]'); if (p) p.scrollTop = 0; });
      await pg.screenshot({ path: OUT + `menu-${prof}-${ver}.png` });
      if (ver === 'yeni' && prof === 'masaustu') { await pg.locator('.n1h-panel[data-open] a.n1h-plat').nth(1).hover(); await pg.waitForTimeout(400); await pg.locator('.n1h-panel[data-open] .n1h-platcard').screenshot({ path: OUT + 'platform-masaustu-yeni-hover.png' });
        await pg.mouse.move(5, 400); await pg.evaluate(() => document.querySelector('.n1h-panel[data-open] .n1h-a7').focus()); await pg.keyboard.press('Tab'); await pg.waitForTimeout(300); await pg.locator('.n1h-panel[data-open] .n1h-platcard').screenshot({ path: OUT + 'platform-masaustu-yeni-odak.png' }); }
    });
  for (const prof of ['masaustu', 'tablet', 'mobil']) await shot(prof, 'yeni', '/iletisim?n1shell=iletisim', 'n1-global-header-v1 .n1h-menu', '-bagimsiz', async (pg) => { await pg.screenshot({ path: OUT + `bagimsiz-header-menu-${prof}.png` }); });
  // yan yana karşılaştırma görselleri (ImageMagick)
  for (const prof of ['masaustu', 'tablet', 'mobil']) execFileSync('convert', [OUT + `platform-${prof}-eski.png`, OUT + `platform-${prof}-yeni.png`, '-background', '#080A09', '-gravity', 'north', '-splice', '0x0', '+append', OUT + `karsilastirma-${prof}.png`]);
  await b.close(); console.log(fs.readdirSync(OUT).join('\n'));
})();
