// Global menü regresyonu — menüyü taşıyan mevcut kurumsal sayfaların yeni sürümleri (canlı sitenin içinde, routeshell.js ile).
// node pages-test.js <chromium|webkit> <1440|1024|390|320> [out.json]
const pw = require('playwright'); const fs = require('fs');
const [, , BR = 'chromium', WS = '1440', OUT] = process.argv; const WIDTH = +WS, MOBILE = WIDTH <= 1024;
const IOS = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.7 Mobile/15E148 Safari/604.1';
const CTX = MOBILE ? Object.assign({ viewport: { width: WIDTH, height: WIDTH < 400 ? (WIDTH < 340 ? 568 : 844) : 1366 }, deviceScaleFactor: 2, hasTouch: true }, BR === 'chromium' ? { isMobile: true } : {}, WIDTH < 768 ? { userAgent: IOS } : {}) : { viewport: { width: WIDTH, height: 900 } };
const B = 'https://www.reklam1n.com';
const EXP = [['Kısaca Biz', '/kisaca-biz'], ['Hizmetler', null], ['Markalar', '/markalar'], ['Akademi', '/reklam-ajansi'], ['İnsan Kaynakları', '/insan-kaynaklari'], ['İletişim', '/iletisim']];
const IGN = /googleadservices|doubleclick|Cross-origin script|Failed to fetch|Load failed|ChunkLoad|SiteAssets|notifyEventToEditorApp|Fetch API|Transition/;
const results = []; let pass = 0, fail = 0;
function T(g, n, ok, info) { results.push({ g, n, ok: !!ok, info }); ok ? pass++ : fail++; console.log(BR, WIDTH, ok ? 'GEÇTİ' : 'KALDI', g, '·', n, info === undefined ? '' : '· ' + JSON.stringify(info).slice(0, 220)); }
(async () => {
  const b = await pw[BR].launch(BR === 'chromium' ? { args: ['--autoplay-policy=no-user-gesture-required'] } : {});
  const tap = async (pg, l) => { if (MOBILE) await l.tap(); else await l.click(); };
  for (const path of ['/', '/reklam-yonetimi', '/kisaca-biz', '/markalar', '/gizlilik', '/insan-kaynaklari', '/staj-programlari']) {
    const ctx = await b.newContext(CTX); const st = {}; await require('./routeshell.js')(ctx, st); const pg = await ctx.newPage(); const errs = [];
    pg.on('pageerror', (e) => { if (!IGN.test(e.message)) errs.push(e.message.slice(0, 140)); });
    const g = 'P ' + path;
    try {
      await pg.goto(B + path, { waitUntil: 'domcontentloaded', timeout: 60000 }); await pg.waitForTimeout(9000);
      const pre = await pg.evaluate(() => performance.getEntriesByType('resource').filter((e) => /assets\/platforms/.test(e.name)).length);
      await tap(pg, pg.locator('n1-header .n1h-menu').first()); await pg.waitForTimeout(900);
      const s = await pg.evaluate(() => { const p = [...document.querySelectorAll('.n1h-panel')].find((x) => x.hasAttribute('data-open')); if (!p) return null; const r = p.getBoundingClientRect();
        return { items: [...p.querySelectorAll('.n1h-main .n1h-item')].map((i) => [i.querySelector('.n1h-txt').textContent.trim(), i.getAttribute('href')]), eki: /Ekibimize/.test(document.body.innerText + p.textContent),
          a7: (p.querySelector('.n1h-a7') || {}).href, plats: [...p.querySelectorAll('.n1h-plat')].map((a) => a.getAttribute('href')), bottom: Math.round(r.bottom), vh: innerHeight, right: Math.round(r.right), vw: innerWidth, sh: p.scrollHeight, ch: p.clientHeight,
          brand: p.querySelector('.n1h-brand').getAttribute('href'), cur: [...p.querySelectorAll('.n1h-item[data-current]')].map((i) => i.querySelector('.n1h-txt').textContent.trim()), last: [...p.querySelectorAll('.n1h-main .n1h-item .n1h-txt')].map((t) => getComputedStyle(t.parentNode).fontSize) }; });
      T(g, 'menü: 6 başlık, sıra ve adresler (İletişim dahil)', s && JSON.stringify(s.items) === JSON.stringify(EXP), s && s.items);
      T(g, 'Ekibimize Katıl yok', s && !s.eki);
      T(g, 'A7 + 4 platform bağlantısı', s && s.a7 === 'https://www.a7-1n.com/a7-produksiyon' && s.plats.join() === 'https://www.zeyp.com.tr/,https://www.carsialtin.com/faprika/canli-piyasalar/,https://www.hementik.la/,https://www.reklam1n.com/intelligence', s && s.plats);
      T(g, 'bütün satırlar aynı yazı boyutu (İletişim dahil)', s && new Set(s.last).size === 1, s && s.last);
      T(g, 'panel ekran içinde (gerekirse iç kaydırma), yatay taşma yok', s && s.bottom <= s.vh + 1 && s.right <= s.vw, s && { bottom: s.bottom, vh: s.vh, sh: s.sh, ch: s.ch });
      T(g, 'Başlangıca Dön → /', s && (s.brand === '/' || s.brand === '#ust' && path === '/'), s && s.brand);
      T(g, 'logolar menü açılmadan indirilmedi', pre === 0, pre);
      // kariyer sayfaları test düzeneğinde /kisaca-biz kabuğunda açılır; adres tabanlı aktif durum active-test.js ile gerçek adreste doğrulanır
      // kapanış: dokunmatikte MENU, masaüstünde Escape
      if (MOBILE) await tap(pg, pg.locator('n1-header .n1h-menu').first()); else await pg.keyboard.press('Escape');
      await pg.waitForTimeout(700);
      const left = await pg.evaluate(() => [...document.querySelectorAll('.n1h-panel .n1h-card,.n1h-panel .n1h-sub')].filter((c) => { const cs = getComputedStyle(c); return cs.visibility !== 'hidden' && +cs.opacity > 0.05 && c.getBoundingClientRect().height > 0; }).length);
      T(g, 'normal kapanış: ekranda kart kalmıyor', left === 0, left);
      // bağlantıyla ayrılma: İletişim → /iletisim (mevcut Wix sayfası)
      await tap(pg, pg.locator('n1-header .n1h-menu').first()); await pg.waitForTimeout(800);
      await tap(pg, pg.locator('.n1h-panel[data-open] a.n1h-item', { hasText: 'İletişim' }));
      let ok = false; for (let i = 0; i < 60 && !ok; i++) { await pg.waitForTimeout(500); try { ok = new URL(pg.url()).pathname.replace(/\/+$/, '') === '/iletisim'; } catch (e) {} }
      await pg.waitForTimeout(2500);
      const after = await pg.evaluate(() => [...document.querySelectorAll('.n1h-panel')].filter((p) => p.hasAttribute('data-open')).length);
      T(g, 'İletişim bağlantısı /iletisim; menü kapalı, katman kalmıyor', ok && after === 0, { url: pg.url(), open: after });
      await pg.goBack({ waitUntil: 'domcontentloaded' }).catch(() => {}); await pg.waitForTimeout(6000);
      const back = await pg.evaluate(() => [...document.querySelectorAll('.n1h-panel')].filter((p) => p.hasAttribute('data-open')).length);
      T(g, 'tarayıcı geri: menü açık kalmıyor', back === 0, { url: pg.url(), open: back });
    } catch (e) { T(g, 'senaryo hatası', false, e.message.slice(0, 160)); }
    T(g, 'JS hatası yok', errs.length === 0, errs.slice(0, 2));
    await ctx.close();
  }
  // V1.4 koruma (mobil/tablet) ve ana sayfa
  {
    const ctx = await b.newContext(CTX); await require('./routeshell.js')(ctx, {}); const pg = await ctx.newPage();
    await pg.goto(B + '/', { waitUntil: 'domcontentloaded' }); await pg.waitForTimeout(9000);
    const h = await pg.evaluate(() => ({ cta: [...document.querySelectorAll('a')].filter((a) => /Hikâyemizin Devamı/.test(a.textContent)).map((a) => a.getAttribute('href')), m5: performance.getEntriesByType('resource').some((e) => /n1-video-m5-v14\.js/.test(e.name)),
      v661: performance.getEntriesByType('resource').some((e) => /n1-site-wix-v659\.js/.test(e.name)), dpr: devicePixelRatio, film: Math.min(innerWidth, innerWidth > innerHeight ? innerHeight * 0.745 : innerWidth), ronin: [...document.querySelectorAll('video')].map((v) => (v.currentSrc || v.getAttribute('src') || '').split('/').pop()).filter((x) => /ronin/.test(x)) }));
    T('V1.4 ana sayfa', '"Hikâyemizin Devamı" → /kisaca-biz', h.cta.length && h.cta.every((x) => x === '/kisaca-biz'), h.cta);
    if (MOBILE) { T('V1.4 ana sayfa', 'mobil video modülü v14', h.m5, h); { const want2x = h.film * h.dpr > 840; T('V1.4 ana sayfa', 'Ronin kademesi V1.4 kuralına uygun (film px × DPR > 840 → 2×, değilse doğal)', h.ronin.some((x) => want2x ? /ronin-m5-film-2x\.mp4/.test(x) : /ronin-m5-film\.mp4/.test(x)), { ronin: h.ronin, film: h.film, dpr: h.dpr, want2x }); } }
    await ctx.close();
    if (MOBILE) { const c2 = await b.newContext(CTX); await require('./routeshell.js')(c2, {}); const p2 = await c2.newPage(); await p2.goto(B + '/e-ticaret-yonetimi', { waitUntil: 'domcontentloaded' }); await p2.waitForTimeout(9000);
      const e = await p2.evaluate(() => ({ stills: document.querySelectorAll('img[data-n1-still]').length, vSrc: [...document.querySelectorAll('video')].filter((v) => v.currentSrc || v.getAttribute('src')).length }));
      T('V1.4 hizmet', 'E-Ticaret: WebP kare 2, kaynaklı video ≤ 1', e.stills === 2 && e.vSrc <= 1, e); await c2.close(); }
  }
  console.log(BR, WIDTH, 'TOPLAM', pass, 'geçti', fail, 'kaldı');
  if (OUT) fs.writeFileSync(OUT, JSON.stringify({ br: BR, width: WIDTH, pass, fail, results }, null, 1));
  await b.close();
})();
