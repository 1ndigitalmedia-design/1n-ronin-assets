// Global Shell V1 testi — bağımsız Header/Footer (İletişim, Akademi, 404 birleşik test sayfaları) + yeni global menü.
// node shell-test.js <chromium|webkit> <genişlik> [out.json]   (genişlik: 1920 1440 1024 820 440 390 375 320)
const pw = require('playwright'); const fs = require('fs');
const [, , BR = 'chromium', WS = '1440', OUT] = process.argv; const WIDTH = +WS;
const MOBILE = WIDTH <= 1024, H = WIDTH >= 1440 ? 900 : WIDTH >= 1024 ? 768 : WIDTH >= 820 ? 1180 : WIDTH >= 440 ? 956 : WIDTH >= 390 ? 844 : WIDTH >= 375 ? 667 : 568;
const IOS = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.7 Mobile/15E148 Safari/604.1';
const CTX = MOBILE ? { viewport: { width: WIDTH, height: H }, deviceScaleFactor: 2, hasTouch: true, isMobile: BR === 'chromium', userAgent: WIDTH < 768 ? IOS : undefined } : { viewport: { width: WIDTH, height: H }, deviceScaleFactor: 1 };
if (!CTX.userAgent) delete CTX.userAgent;
const SH = 'https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@' + (process.env.SHELL_SHA || '0000000000000000000000000000000000000000') + '/wix-global-shell-v1/n1-global-shell-v1.js';
const B = 'https://www.reklam1n.com';
const EXP_ITEMS = [['Kısaca Biz', '/kisaca-biz'], ['Hizmetler', null], ['Markalar', '/markalar'], ['Akademi', '/reklam-ajansi'], ['İnsan Kaynakları', '/insan-kaynaklari'], ['İletişim', '/iletisim']];
const EXP_PLAT = [['ZEYP', 'https://www.zeyp.com.tr/', '01-zeyp'], ['Market — Canlı Piyasalar', 'https://www.carsialtin.com/faprika/canli-piyasalar/', '02-market'], ['Hemen Tıkla', 'https://www.hementik.la/', '03-hemen-tikla'], ['1N Intelligence', 'https://www.reklam1n.com/intelligence', '04-intelligence']];
const IGN = /googleadservices|doubleclick|Cross-origin script|Failed to fetch|Load failed|ChunkLoad|SiteAssets|notifyEventToEditorApp|Fetch API|Transition/;
const results = []; let pass = 0, fail = 0; const meas = {};
function T(g, n, ok, info) { results.push({ g, n, ok: !!ok, info }); ok ? pass++ : fail++; console.log(BR, WIDTH, ok ? 'GEÇTİ' : 'KALDI', g, '·', n, info === undefined ? '' : '· ' + JSON.stringify(info).slice(0, 230)); }
const INSTR = `(function(){var C={win:0,doc:0};window.__lc=C;function wrap(t,k){var a=t.addEventListener,r=t.removeEventListener,seen=new Map();
t.addEventListener=function(ty,fn,o){var c=typeof o==='boolean'?o:!!(o&&o.capture),id=ty+'|'+c,m=seen.get(fn)||new Set();if(!m.has(id)){m.add(id);seen.set(fn,m);C[k]++;}return a.apply(this,arguments);};
t.removeEventListener=function(ty,fn,o){var c=typeof o==='boolean'?o:!!(o&&o.capture),id=ty+'|'+c,m=seen.get(fn);if(m&&m.has(id)){m.delete(id);C[k]--;}return r.apply(this,arguments);};}wrap(window,'win');wrap(document,'doc');})();`;

(async () => {
  const b = await pw[BR].launch(BR === 'chromium' ? { args: ['--autoplay-policy=no-user-gesture-required'] } : {});
  async function open(path, opt) {
    const ctx = await b.newContext(CTX); const rs = require('./routeshell.js'); const st = {}; await rs(ctx, st); await rs.shellPages(ctx, SH);
    if (opt && opt.instr) await ctx.addInitScript(INSTR);
    const pg = await ctx.newPage(); const errs = [], reqs = [];
    pg.on('pageerror', (e) => { const m = String(e.message); if (!IGN.test(m)) errs.push(m.slice(0, 140)); });
    pg.on('console', (m) => { if (m.type() === 'error' && /n1|N1/.test(m.text())) errs.push('console: ' + m.text().slice(0, 140)); });
    pg.on('request', (q) => reqs.push(q.url()));
    await pg.goto(B + path, { waitUntil: 'domcontentloaded', timeout: 60000 }); await pg.waitForTimeout(opt && opt.wait || 6000);
    return { ctx, pg, st, errs, reqs };
  }
  const tap = async (pg, loc) => { if (MOBILE) await loc.tap(); else await loc.click(); };
  const panel = (pg, sel) => pg.evaluate((sel) => {
    const p = document.querySelector(sel); if (!p) return null; const r = p.getBoundingClientRect(); const vis = (e) => !!e && getComputedStyle(e).visibility !== 'hidden' && getComputedStyle(e).display !== 'none' && e.getBoundingClientRect().height > 0;
    const a7 = p.querySelector('.n1h-a7'), plats = [...p.querySelectorAll('.n1h-plat')];
    return { open: p.hasAttribute('data-open'), top: Math.round(r.top), bottom: Math.round(r.bottom), left: Math.round(r.left), right: Math.round(r.right), vh: innerHeight, vw: innerWidth, sh: p.scrollHeight, ch: p.clientHeight, oy: getComputedStyle(p).overflowY,
      items: [...p.querySelectorAll('.n1h-main .n1h-item')].map((i) => [i.querySelector('.n1h-txt').textContent.trim(), i.getAttribute('href')]),
      eki: /Ekibimize/.test(p.textContent), hz: [...p.querySelectorAll('.n1h-sub')].map((s) => [s.querySelector('h3').textContent, s.querySelectorAll('a').length, s.hasAttribute('data-open')]),
      a7: a7 && { href: a7.getAttribute('href'), target: a7.target, rel: a7.rel, text: a7.querySelector('b').textContent, vis: vis(a7), h: Math.round(a7.getBoundingClientRect().height) },
      plats: plats.map((a) => { const im = a.querySelector('img'), br = a.getBoundingClientRect(); return { label: a.getAttribute('aria-label'), href: a.getAttribute('href'), target: a.target, rel: a.rel, src: (im.currentSrc || im.getAttribute('src') || '').split('/').pop(), nw: im.naturalWidth, w: Math.round(br.width), h: Math.round(br.height), x: Math.round(br.left), y: Math.round(br.top) }; }),
      brand: (p.querySelector('.n1h-brand') || {}).getAttribute && p.querySelector('.n1h-brand').getAttribute('href'),
      cards: [...p.children].filter(vis).map((c) => { const q = c.getBoundingClientRect(); return { c: String(c.className).split(' ').slice(0, 2).join('.'), top: Math.round(q.top), bottom: Math.round(q.bottom) }; }) };
  }, sel || '.n1h-panel[data-open], .n1h-panel');

  /* ===== S: bağımsız Header/Footer — İletişim birleşik sayfası ===== */
  {
    const { ctx, pg, errs, reqs } = await open('/iletisim?n1shell=iletisim', { instr: true }); const g = 'S iletişim';
    try {
      await pg.waitForSelector('n1-global-header-v1[data-ready]', { timeout: 30000 }); await pg.waitForSelector('n1-global-footer-v1[data-ready]', { timeout: 30000 });
      const h = await pg.evaluate(() => { const host = document.querySelector('n1-global-header-v1'), bar = host.querySelector('.n1h-bar'), logo = host.querySelector('.n1h-logo img'), tag = host.querySelector('.n1h-tag'), btn = host.querySelector('.n1h-menu');
        let fill = ''; try { const svg = atob(logo.src.split(',')[1]); fill = (svg.match(/fill="(#[0-9a-fA-F]{6})"/) || [])[1]; } catch (e) {}
        return { hostH: Math.round(host.getBoundingClientRect().height), hostW: Math.round(host.getBoundingClientRect().width), barW: Math.round(bar.getBoundingClientRect().width), barL: Math.round(bar.getBoundingClientRect().left), vw: innerWidth,
          cta: !!host.querySelector('.n1h-cta'), logoFill: fill, logoW: Math.round(logo.getBoundingClientRect().width), tag: tag.textContent.trim(), tagFont: getComputedStyle(tag).fontFamily.split(',')[0], btnVis: !!btn && btn.getBoundingClientRect().width > 0,
          headers: document.querySelectorAll('n1-header').length, panels: document.querySelectorAll('.n1h-panel').length, preLogo: performance.getEntriesByType('resource').filter((e) => /assets\/platforms/.test(e.name)).length };
      });
      meas.headerH = h.hostH;
      T(g, 'Header: Teklif Al yok', !h.cta, h);
      T(g, 'Header: orijinal SVG logo kare zemini #A2FF00', /^#a2ff00$/i.test(h.logoFill), h.logoFill);
      T(g, 'Header: dış genişlik %100, içerik %90 (±1 px), sol/sağ %5', h.hostW === h.vw && Math.abs(h.barW - h.vw * 0.9) <= 1 && Math.abs(h.barL - h.vw * 0.05) <= 1, { barW: h.barW, vw: h.vw, left: h.barL });
      T(g, 'Header: yükseklik kurumsal ölçü (88/72/64)', h.hostH === (WIDTH > 1024 ? 88 : WIDTH >= 768 ? 72 : 64), h.hostH);
      T(g, 'Header: DIGITAL ADVERTISING AGENCY. + Barlow + MENU düğmesi', h.tag === 'DIGITAL ADVERTISING AGENCY.' && /Barlow/.test(h.tagFont) && h.btnVis, h);
      T(g, 'Tek header, tek panel', h.headers === 1 && h.panels === 1, h);
      T(g, 'Platform logoları menü açılmadan indirilmiyor', h.preLogo === 0, h.preLogo);
      const lc0 = await pg.evaluate(() => Object.assign({}, window.__lc));
      // menü
      await tap(pg, pg.locator('n1-global-header-v1 .n1h-menu')); await pg.waitForTimeout(900);
      let s = await panel(pg, '.n1h-panel[data-n1-gs]');
      T(g, 'MENU açıyor', s.open, s.open);
      T(g, 'ana menü sırası ve adresleri (İletişim dahil)', JSON.stringify(s.items) === JSON.stringify(EXP_ITEMS), s.items);
      T(g, 'Ekibimize Katıl yok', !s.eki);
      const fits = s.bottom <= s.vh + 1 || (/(auto|scroll)/.test(s.oy) && s.bottom <= s.vh + 1);
      T(g, 'panel ekran içinde (gerekirse kendi içinde kayar), yatay taşma yok', fits && s.left >= 0 && s.right <= s.vw, { top: s.top, bottom: s.bottom, vh: s.vh, sh: s.sh, ch: s.ch, oy: s.oy, l: s.left, r: s.right });
      meas.panel = { top: s.top, bottom: s.bottom, sh: s.sh, ch: s.ch, scroll: s.sh > s.ch + 1 };
      T(g, 'Başlangıca Dön → /', s.brand === '/', s.brand);
      T(g, 'A7 Prodüksiyon: adres, yeni sekme, noopener noreferrer', s.a7 && s.a7.href === 'https://www.a7-1n.com/a7-produksiyon' && s.a7.target === '_blank' && /noopener/.test(s.a7.rel) && /noreferrer/.test(s.a7.rel) && s.a7.text === 'A7 Prodüksiyon', s.a7);
      T(g, 'Platformlar: sıra, adres, etiket', JSON.stringify(s.plats.map((p) => [p.label.replace(' (yeni sekmede açılır)', ''), p.href, p.src.replace(/-(160|320)\.webp$/, '')])) === JSON.stringify(EXP_PLAT), s.plats.map((p) => p.label + ' ' + p.src));
      T(g, 'Platformlar: dış bağlantılar yeni sekme + noopener noreferrer; Intelligence aynı sekme', s.plats.slice(0, 3).every((p) => p.target === '_blank' && /noopener/.test(p.rel) && /noreferrer/.test(p.rel)) && s.plats[3].target === '', s.plats.map((p) => p.target + '|' + p.rel));
      await pg.waitForTimeout(800); s = await panel(pg, '.n1h-panel[data-n1-gs]');
      const sq = s.plats.every((p) => Math.abs(p.w - p.h) <= 1 && p.w === s.plats[0].w && p.w >= 44) && new Set(s.plats.map((p) => p.y)).size === 1 && s.plats.every((p, i) => i === 0 || p.x > s.plats[i - 1].x);
      T(g, 'Platformlar: kare, eşit boyut, ≥ 44 px, tek satır, soldan sağa', sq, s.plats.map((p) => p.w + 'x' + p.h + '@' + p.x + ',' + p.y).join(' '));
      T(g, 'Platform logoları yüklendi (doğru dosya)', s.plats.every((p) => p.nw > 0 && /^0[1-4]-.+-(160|320)\.webp$/.test(p.src)), s.plats.map((p) => p.src + ':' + p.nw));
      meas.plat = s.plats.map((p) => p.w)[0]; meas.platSrc = s.plats[0].src;
      // İK alt menüsü
      await tap(pg, pg.locator('.n1h-panel[data-n1-gs] .n1h-subtog')); await pg.waitForTimeout(500); s = await panel(pg, '.n1h-panel[data-n1-gs]');
      const ik = s.hz.find((x) => x[0] === 'İnsan Kaynakları'); T(g, 'İK alt menüsü açılıyor (2 bağlantı)', ik && ik[1] === 2 && ik[2], s.hz);
      await tap(pg, pg.locator('.n1h-panel[data-n1-gs] .n1h-subtog')); await pg.waitForTimeout(400);
      await tap(pg, pg.locator('.n1h-panel[data-n1-gs] button.n1h-item', { hasText: 'Hizmetler' })); await pg.waitForTimeout(500); s = await panel(pg, '.n1h-panel[data-n1-gs]');
      const hz = s.hz.find((x) => x[0] === 'Hizmetler'); T(g, 'Hizmetler alt menüsü (7) açılıyor', hz && hz[1] === 7 && hz[2], s.hz);
      if (MOBILE || s.sh > s.ch + 1) { s = await panel(pg, '.n1h-panel[data-n1-gs]'); const fit2 = s.bottom <= s.vh + 1; T(g, 'alt menü açıkken de panel ekran içinde (iç kaydırma)', fit2, { bottom: s.bottom, vh: s.vh, sh: s.sh, ch: s.ch }); }
      // klavye (masaüstü)
      if (!MOBILE) {
        await pg.keyboard.press('Escape'); await pg.waitForTimeout(250);
        await pg.locator('.n1h-panel[data-n1-gs] .n1h-a7').focus(); let seq = [];
        let fv = '';
        for (let i = 0; i < 4; i++) { await pg.keyboard.press('Tab'); seq.push(await pg.evaluate(() => { const e = document.activeElement; return e && (e.getAttribute('aria-label') || e.className); })); if (i === 3) fv = await pg.evaluate(() => { const e = document.activeElement; return e && getComputedStyle(e).boxShadow; }); }
        T(g, 'klavye: A7 → 4 platform bağlantısı sırayla odaklanıyor, odak görünür', seq.slice(0, 4).map((x) => (x || '').replace(' (yeni sekmede açılır)', '')).join('|') === EXP_PLAT.map((p) => p[0]).join('|') && /rgb/.test(fv), seq);
        await pg.keyboard.press('Escape'); await pg.waitForTimeout(500);
        s = await panel(pg, '.n1h-panel[data-n1-gs]'); T(g, 'Escape menüyü kapatıyor, odak MENU düğmesine', !s.open && await pg.evaluate(() => document.activeElement && document.activeElement.classList.contains('n1h-menu')));
      } else { await tap(pg, pg.locator('n1-global-header-v1 .n1h-menu')); await pg.waitForTimeout(700); s = await panel(pg, '.n1h-panel[data-n1-gs]'); T(g, 'CLOSE menüyü kapatıyor, kart kalmıyor', !s.open && s.cards.length === 0, s.cards); }
      const cardsLeft = await pg.evaluate(() => [...document.querySelectorAll('.n1h-panel .n1h-card,.n1h-panel .n1h-sub')].filter((c) => { const cs = getComputedStyle(c); return cs.visibility !== 'hidden' && +cs.opacity > 0.05 && c.getBoundingClientRect().height > 0; }).length);
      T(g, 'kapanınca ekranda kart kalmıyor', cardsLeft === 0, cardsLeft);
      // A7'ye tıklama: yeni sekme açılır, menü kapanır
      await tap(pg, pg.locator('n1-global-header-v1 .n1h-menu')); await pg.waitForTimeout(800);
      const [pop] = await Promise.all([pg.context().waitForEvent('page', { timeout: 15000 }).catch(() => null), tap(pg, pg.locator('.n1h-panel[data-n1-gs] .n1h-a7'))]);
      await pg.waitForTimeout(700); s = await panel(pg, '.n1h-panel[data-n1-gs]');
      T(g, 'A7 tıklaması yeni sekme açıyor ve menü kapanıyor', !!pop && !s.open, { pop: pop && pop.url(), open: s.open });
      if (pop) await pop.close();
      // BFCache benzetimi: menü açıkken pagehide/pageshow(persisted) → kapalı ve kullanılabilir
      await tap(pg, pg.locator('n1-global-header-v1 .n1h-menu')); await pg.waitForTimeout(700);
      await pg.evaluate(() => { dispatchEvent(new PageTransitionEvent('pagehide', { persisted: true })); dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true })); }); await pg.waitForTimeout(700);
      s = await panel(pg, '.n1h-panel[data-n1-gs]'); T(g, 'BFCache dönüşünde menü kapalı', !s.open, s.open);
      await tap(pg, pg.locator('n1-global-header-v1 .n1h-menu')); await pg.waitForTimeout(700); s = await panel(pg, '.n1h-panel[data-n1-gs]'); T(g, 'BFCache sonrası menü yeniden açılıyor', s.open);
      await tap(pg, pg.locator('n1-global-header-v1 .n1h-menu')); await pg.waitForTimeout(600);
      // yeniden bağlama ×3: dinleyici / panel çoğalmıyor
      for (let i = 0; i < 3; i++) { await pg.evaluate(() => { const h = document.querySelector('n1-global-header-v1'), f = document.querySelector('n1-global-footer-v1'); const hp = h.parentNode, fp = f.parentNode; hp.removeChild(h); fp.removeChild(f); hp.appendChild(h); fp.appendChild(f); }); await pg.waitForTimeout(1800); }
      const lc1 = await pg.evaluate(() => Object.assign({}, window.__lc, { panels: document.querySelectorAll('.n1h-panel').length, headers: document.querySelectorAll('n1-header').length, footers: document.querySelectorAll('footer.n1ft').length, fc: document.querySelectorAll('.n1fc').length }));
      T(g, 'yeniden bağlama ×3: tek header/panel/footer, dinleyici artışı yok', lc1.panels === 1 && lc1.headers === 1 && lc1.footers === 1 && lc1.win - lc0.win <= 0 && lc1.doc - lc0.doc <= 0, { lc0, lc1 });
      // footer (partner görseli loading=lazy: kullanıcı gibi footer'a kaydırılır)
      await pg.evaluate(() => document.querySelector('n1-global-footer-v1').scrollIntoView()); await pg.waitForTimeout(3000);
      const f = await pg.evaluate(() => { const host = document.querySelector('n1-global-footer-v1'), inner = host.querySelector('.n1ft-inner'), r = host.getBoundingClientRect();
        const soc = [...host.querySelectorAll('.n1ft-socials a, .n1ft-social a, a[aria-label*="acebook"], a[aria-label*="nstagram"], a[aria-label*="ouTube"], a[aria-label*="inked"]')].map((a) => a.href).filter((v, i, a) => a.indexOf(v) === i);
        const legal = [...host.querySelectorAll('.n1ft-legal a')].map((a) => [a.textContent.trim(), a.getAttribute('href')]);
        const svgs = host.querySelectorAll('.n1ft-socials svg, .n1ft-social svg').length;
        const pl = [...host.querySelectorAll('.n1ft-partner')].map((li) => { const e = li.querySelector('.n1ft-logo, img'); const cs = getComputedStyle(li); return { k: li.getAttribute('data-partner'), vis: cs.display !== 'none' && li.getBoundingClientRect().height > 0, op: +getComputedStyle(e).opacity, w: Math.round(e.getBoundingClientRect().width), nw: e.naturalWidth === undefined ? null : e.naturalWidth }; });
        const art = host.querySelector('.n1ft-partner-art img'), artVis = art && getComputedStyle(art.parentNode).display !== 'none';
        const tt = host.querySelector('[data-partner="tiktok"] .n1ft-logo, [data-partner="tiktok"] img');
        return { h: Math.round(r.height), w: Math.round(r.width), innerW: Math.round(inner.getBoundingClientRect().width), innerL: Math.round(inner.getBoundingClientRect().left), vw: innerWidth, gap: Math.round(document.documentElement.scrollHeight - (r.bottom + scrollY)),
          brand: (host.querySelector('.n1ft-brand') || {}).textContent, addr: (host.querySelector('.n1ft-addr') || {}).textContent, tel: [...host.querySelectorAll('a[href^="tel:"]')].map((a) => a.getAttribute('href')), mail: [...host.querySelectorAll('a[href^="mailto:"]')].map((a) => a.getAttribute('href')),
          soc, svgs, legal, pl, artVis: !!artVis, artNW: art ? art.naturalWidth : null, tt: tt && { op: +getComputedStyle(tt).opacity, bg: getComputedStyle(tt).backgroundColor, filter: getComputedStyle(tt).filter, w: Math.round(tt.getBoundingClientRect().width) }, copy: (host.querySelector('.n1ft-copy') || {}).textContent, ox: document.documentElement.scrollWidth > innerWidth };
      });
      meas.footerH = f.h;
      T(g, 'Footer: dış genişlik %100, içerik %90 (±1 px)', f.w === f.vw && Math.abs(f.innerW - f.vw * 0.9) <= 1 && Math.abs(f.innerL - f.vw * 0.05) <= 1, { innerW: f.innerW, vw: f.vw, l: f.innerL });
      T(g, 'Footer: başlık, adres, telefon, e-posta (onaylı kaynak)', /1N Digital Media/.test(f.brand) && /Folkart Tower/.test(f.addr) && f.tel.includes('tel:+902324002094') && f.mail.includes('mailto:pro.media@reklam1n.com'), { brand: f.brand, tel: f.tel, mail: f.mail });
      T(g, 'Footer: 4 sosyal bağlantı SVG ikonlu (Facebook, Instagram, YouTube, LinkedIn)', f.soc.length === 4 && f.svgs >= 4 && ['facebook.com', 'instagram.com', 'youtube.com', 'linkedin.com'].every((d) => f.soc.some((u) => u.includes(d))), f.soc);
      T(g, 'Footer: 5 yasal bağlantı', f.legal.length === 5 && f.legal.every((l) => /^\//.test(l[1])), f.legal);
      if (!MOBILE) {
        T(g, 'Footer: 5 partner logosu görünür (TikTok, Meta, Google, Wix, Velo)', f.pl.length === 5 && f.pl.every((p) => p.vis && p.op > 0.3 && p.w > 20), f.pl);
        T(g, 'Footer: TikTok logosu koyu zeminde görünür (gri)', f.tt && f.tt.op > 0.3 && f.tt.w > 40, f.tt);
      } else T(g, 'Footer (≤1024): onaylı partner görseli yüklendi (5 logo, TikTok dahil)', f.artVis && f.artNW > 0, { artVis: f.artVis, nw: f.artNW });
      T(g, 'Footer: copyright', /© \d{4} by 1N/.test(f.copy), f.copy);
      T(g, 'Footer altında boşluk yok, yatay taşma yok', Math.abs(f.gap) <= 1 && !f.ox, { gap: f.gap, ox: f.ox });
      const fc = await pg.evaluate(() => ({ n: document.querySelectorAll('.n1fc').length, wa: !!document.querySelector('.n1fc a[href*="whatsapp"], .n1fc [href*="whatsapp"]') }));
      T(g, 'WhatsApp / Yukarı Çık: tek katman (isteğe bağlı bileşen)', fc.n === 1 && fc.wa, fc);
      const big = reqs.filter((u) => /\.(mp4|webm|mov)(\?|$)/.test(u));
      T(g, 'video yok; platform logoları 160/320 WebP', big.length === 0 && reqs.filter((u) => /assets\/platforms\/.+\.png/.test(u)).length === 0, big);
    } catch (e) { T(g, 'senaryo hatası', false, e.message.slice(0, 200)); }
    T(g, 'JS hatası yok', errs.length === 0, errs.slice(0, 3));
    await pg.screenshot({ path: `../screenshots/raw/shell-iletisim-${WIDTH}-${BR}-full.png`, fullPage: true }).catch(() => {});
    await ctx.close();
  }
  /* ===== A: Akademi aktif durumu, 404 ===== */
  for (const [path, name, act] of [['/reklam-ajansi?n1shell=akademi', 'akademi', 'Akademi'], ['/bu-sayfa-yok-xyz?n1shell=404', '404', null]]) {
    const { ctx, pg, errs } = await open(path); const g = 'S ' + name;
    try {
      await pg.waitForSelector('n1-global-header-v1[data-ready]', { timeout: 30000 });
      await tap(pg, pg.locator('n1-global-header-v1 .n1h-menu')); await pg.waitForTimeout(800);
      const c = await pg.evaluate(() => ({ cur: [...document.querySelectorAll('.n1h-panel .n1h-item[data-current]')].map((e) => e.querySelector('.n1h-txt').textContent.trim()), aria: [...document.querySelectorAll('.n1h-panel [aria-current="page"]')].map((e) => e.textContent.trim().slice(0, 20)) }));
      T(g, act ? 'menüde aktif durum: ' + act : 'aktif öğe yok', act ? c.cur.join() === act && c.aria.some((x) => x.startsWith(act)) : c.cur.length === 0, c);
      await pg.screenshot({ path: `../screenshots/raw/shell-${name}-${WIDTH}-${BR}-menu.png` });
    } catch (e) { T(g, 'senaryo hatası', false, e.message.slice(0, 160)); }
    T(g, 'JS hatası yok', errs.length === 0, errs.slice(0, 2)); await ctx.close();
  }
  console.log(BR, WIDTH, 'ÖLÇÜ', JSON.stringify(meas));
  console.log(BR, WIDTH, 'TOPLAM', pass, 'geçti', fail, 'kaldı');
  if (OUT) fs.writeFileSync(OUT, JSON.stringify({ br: BR, width: WIDTH, pass, fail, meas, results }, null, 1));
  await b.close();
})();
