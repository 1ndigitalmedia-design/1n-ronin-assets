// KARİYER V1 odaklı işlev testi (Wix'e dokunmadan; routecareer.js ile yeni sürümler canlı sitenin içinde).
// node career-test.js <chromium|webkit> <masaustu|tablet|mobil> [out.json]
// Senaryolar: M menü (her kapsam içi sayfa türünde), K kariyer sayfaları (kartlar, geri bağlantısı, geri/ileri), A klavye/odak, P V1.4 koruma.
const pw = require('playwright'); const fs = require('fs');
const [, , BR = 'chromium', PROF = 'masaustu', OUT] = process.argv;
const IOS = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.7 Mobile/15E148 Safari/604.1';
const P = { masaustu: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 }, tablet: { viewport: { width: 820, height: 1180 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true },
  mobil: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, hasTouch: true, isMobile: true, userAgent: IOS } }[PROF];
const TOUCH = !!P.hasTouch, B = 'https://www.reklam1n.com';
const IGN = /googleadservices|doubleclick|Cross-origin script|Failed to fetch|Load failed|ChunkLoad|SiteAssets|notifyEventToEditorApp|Fetch API|Transition/;
const results = []; let pass = 0, fail = 0;
function T(group, name, ok, info) { results.push({ group, name, ok: !!ok, info }); ok ? pass++ : fail++; console.log(BR, PROF, ok ? 'GEÇTİ' : 'KALDI', group, '·', name, info === undefined ? '' : '· ' + (typeof info === 'string' ? info : JSON.stringify(info)).slice(0, 220)); }
let SPA = 0;   // Chromium: Wix istemci yönlendiricisi (Navigation API) canlıda olmayan kariyer adresine belge yüklemeden geçerse adres doğrulanır, akış doğrudan yüklemeyle sürer
async function waitPath(pg, p, ms) { const t0 = Date.now(); while (Date.now() - t0 < (ms || 25000)) { try { const u = new URL(pg.url()); if ((u.searchParams.get('n1career') ? '/' + u.searchParams.get('n1career') : '') === p) return 'belge'; } catch (e) {} await pg.waitForTimeout(400); }
  let path = ''; try { path = new URL(pg.url()).pathname.replace(/\/+$/, ''); } catch (e) {}
  if (path === p) { SPA++; console.log(BR, PROF, 'NOT', 'Wix istemci gezinmesi →', p, '(adres doğru; hedef canlıda yok, doğrudan yükleniyor)'); await pg.goto(B + p, { waitUntil: 'domcontentloaded', timeout: 60000 }); await pg.waitForTimeout(2000); await waitPath(pg, p, 30000); return 'wix-spa'; }
  throw new Error('waitPath ' + p + ' zaman aşımı; adres ' + pg.url()); }
const cur = (pg) => { const u = new URL(pg.url()); return u.searchParams.get('n1career') ? '/' + u.searchParams.get('n1career') : (u.pathname.replace(/\/+$/, '') || '/'); };

(async () => {
  const b = await pw[BR].launch(BR === 'chromium' ? { args: ['--autoplay-policy=no-user-gesture-required'] } : {});
  async function open(path) {
    const o = Object.assign({}, P); if (BR !== 'chromium') delete o.isMobile;
    const ctx = await b.newContext(o); const st = {}; await require('./routecareer.js')(ctx, st);
    const pg = await ctx.newPage(); const errs = []; const media = [];
    pg.on('pageerror', (e) => { const m = String(e.message); if (!IGN.test(m)) errs.push(m.slice(0, 140)); });
    pg.on('console', (m) => { if (m.type() === 'error' && /\[n1|n1-header|cr-/.test(m.text())) errs.push('console: ' + m.text().slice(0, 140)); });
    pg.on('request', (q) => { if (q.resourceType() === 'media' || /\.mp4(\?|$)/.test(q.url())) media.push(q.url().slice(-60)); });
    await pg.goto(B + path, { waitUntil: 'domcontentloaded', timeout: 60000 }); await pg.waitForTimeout(9000);
    return { ctx, pg, st, errs, media };
  }
  const act = async (pg, loc) => { if (TOUCH) await loc.tap(); else await loc.click(); };
  const panelState = (pg) => pg.evaluate(() => {
    const p = [...document.querySelectorAll('.n1h-panel')].find((x) => x.isConnected); if (!p) return null;
    const rows = [...p.querySelectorAll('.n1h-main .n1h-item')].map((it) => ({ tag: it.tagName, txt: it.querySelector('.n1h-txt').textContent.trim(), href: it.getAttribute('href') }));
    const tog = p.querySelector('.n1h-subtog'); const subs = [...p.querySelectorAll('.n1h-sub')].map((s) => ({ t: s.querySelector('h3').textContent, open: s.hasAttribute('data-open'), links: [...s.querySelectorAll('a')].map((a) => [a.textContent.trim(), a.getAttribute('href')]) }));
    const vis = (el) => !!el && getComputedStyle(el).visibility !== 'hidden' && getComputedStyle(el).display !== 'none' && el.getBoundingClientRect().height > 0;
    return { open: p.hasAttribute('data-open'), rows, tog: tog ? { exp: tog.getAttribute('aria-expanded'), label: tog.getAttribute('aria-label'), vis: vis(tog), h: Math.round(tog.getBoundingClientRect().height), w: Math.round(tog.getBoundingClientRect().width) } : null, subs,
      ekibimize: /Ekibimize/i.test(p.textContent), overflow: p.scrollWidth > p.clientWidth + 1, panelRight: Math.round(p.getBoundingClientRect().right), vw: innerWidth, subVisible: subs.map((s, i) => vis(p.querySelectorAll('.n1h-sub')[i])) };
  });

  /* ---------- M: menü, sayfa türü başına ---------- */
  const MENU_PAGES = ['/', '/reklam-yonetimi', '/kisaca-biz', '/markalar', '/gizlilik', '/insan-kaynaklari'];
  for (const path of MENU_PAGES) {
    const { ctx, pg, st, errs } = await open(path);
    const g = 'M ' + path;
    try {
      const btn = pg.locator('n1-header .n1h-menu').first();
      await act(pg, btn); await pg.waitForTimeout(700);
      let s = await panelState(pg);
      const ik = s && s.rows.find((r) => r.txt === 'İnsan Kaynakları');
      T(g, 'menü açılıyor', s && s.open);
      T(g, 'İnsan Kaynakları bağlantı → /insan-kaynaklari', ik && ik.tag === 'A' && ik.href === '/insan-kaynaklari', ik);
      T(g, 'Ekibimize Katıl yok (panel + sayfa)', s && !s.ekibimize && !(await pg.evaluate(() => /Ekibimize Katıl/.test(document.body.innerText))));
      T(g, 'alt menü düğmesi ayrı, dokunma hedefi ≥ 44 px', s && s.tog && s.tog.vis && s.tog.w >= 44 && s.tog.h >= 44, s && s.tog);
      T(g, 'diğer başlıklar değişmedi', s && JSON.stringify(s.rows.map((r) => [r.txt, r.tag, r.href])) === JSON.stringify([['Kısaca Biz', 'A', '/kisaca-biz'], ['Hizmetler', 'BUTTON', null], ['Markalar', 'A', '/markalar'], ['Akademi', 'A', '/reklam-ajansi'], ['İnsan Kaynakları', 'A', '/insan-kaynaklari']]), s && s.rows.map((r) => r.txt + ':' + r.tag + ':' + r.href).join(' | '));
      // alt menü düğmesi: aç / kapa
      await act(pg, pg.locator('.n1h-panel[data-open] .n1h-subtog')); await pg.waitForTimeout(500);
      s = await panelState(pg); const ikSub = s.subs.find((x) => x.t === 'İnsan Kaynakları'); const ikI = s.subs.indexOf(ikSub);
      T(g, 'düğme alt menüyü açıyor; sayfa değişmiyor', ikSub && ikSub.open && s.subVisible[ikI] && s.tog.exp === 'true' && cur(pg) === path, ikSub);
      T(g, 'alt menü: Açık Pozisyonlar + Staj Programları', ikSub && JSON.stringify(ikSub.links) === JSON.stringify([['Açık Pozisyonlar', '/acik-pozisyonlar'], ['Staj Programları', '/staj-programlari']]), ikSub && ikSub.links);
      T(g, 'panel ekran içinde, yatay taşma yok', s.panelRight <= s.vw && !s.overflow, { right: s.panelRight, vw: s.vw });
      await act(pg, pg.locator('.n1h-panel[data-open] .n1h-subtog')); await pg.waitForTimeout(500);
      s = await panelState(pg); T(g, 'aynı düğme alt menüyü kapatıyor', !s.subs.find((x) => x.t === 'İnsan Kaynakları').open && s.tog.exp === 'false');
      // Hizmetler hâlâ çalışıyor
      await act(pg, pg.locator('.n1h-panel[data-open] button.n1h-item', { hasText: 'Hizmetler' })); await pg.waitForTimeout(500);
      s = await panelState(pg); const hz = s.subs.find((x) => x.t === 'Hizmetler');
      T(g, 'Hizmetler alt menüsü (7 bağlantı) çalışıyor', hz && hz.open && hz.links.length === 7, hz && hz.links.map((l) => l[1]).join(','));
      // masaüstü fare: başlığın üzerine gelince İK alt menüsü açılır
      if (!TOUCH) { await pg.locator('.n1h-panel[data-open] a.n1h-item[data-sub]').hover(); await pg.waitForTimeout(450); s = await panelState(pg); T(g, 'fare üzerine gelince İK alt menüsü açılıyor', s.subs.find((x) => x.t === 'İnsan Kaynakları').open); }
      // Escape: alt menü → menü kapanır, odak MENU düğmesine
      if (!TOUCH) { await pg.keyboard.press('Escape'); await pg.waitForTimeout(250); await pg.keyboard.press('Escape'); await pg.waitForTimeout(500); s = await panelState(pg);
        T(g, 'Escape ×2 menüyü kapatıyor, odak MENU düğmesinde', !s.open && await pg.evaluate(() => !!document.activeElement && document.activeElement.classList.contains('n1h-menu'))); }
      else { await act(pg, btn); await pg.waitForTimeout(600); s = await panelState(pg); T(g, 'MENU düğmesi menüyü kapatıyor', !s.open); }
      // İK başlığına tıklama → /insan-kaynaklari (kariyer sayfasındaysa aynı sayfa)
      await act(pg, btn); await pg.waitForTimeout(700);
      if (path !== '/insan-kaynaklari') {
        await act(pg, pg.locator('.n1h-panel[data-open] a.n1h-item[data-sub]')); await waitPath(pg, '/insan-kaynaklari');
        await pg.waitForTimeout(6000);
        s = await panelState(pg);
        T(g, 'İK başlığı /insan-kaynaklari sayfasına gidiyor; yeni sayfada menü kapalı', (st.navs || []).includes('/insan-kaynaklari') && cur(pg) === '/insan-kaynaklari' && (!s || !s.open), { navs: st.navs, url: cur(pg) });
        await act(pg, pg.locator('n1-header .n1h-menu').first()); await pg.waitForTimeout(700);
      }
      await act(pg, pg.locator('.n1h-panel[data-open] .n1h-subtog')); await pg.waitForTimeout(500);
      await act(pg, pg.locator('.n1h-panel[data-open] .n1h-sub[data-open] a', { hasText: 'Açık Pozisyonlar' })); await waitPath(pg, '/acik-pozisyonlar');
      await pg.waitForTimeout(6000); s = await panelState(pg);
      T(g, 'Açık Pozisyonlar alt menüsü → /acik-pozisyonlar; menü kapalı', cur(pg) === '/acik-pozisyonlar' && (!s || !s.open), cur(pg));
      await act(pg, pg.locator('n1-header .n1h-menu').first()); await pg.waitForTimeout(700);
      await act(pg, pg.locator('.n1h-panel[data-open] .n1h-subtog')); await pg.waitForTimeout(500);
      await act(pg, pg.locator('.n1h-panel[data-open] .n1h-sub[data-open] a', { hasText: 'Staj Programları' })); await waitPath(pg, '/staj-programlari');
      await pg.waitForTimeout(6000); s = await panelState(pg);
      T(g, 'Staj Programları alt menüsü → /staj-programlari; menü kapalı', cur(pg) === '/staj-programlari' && (!s || !s.open), cur(pg));
      await pg.goBack({ waitUntil: 'domcontentloaded' }).catch(() => {}); await pg.waitForTimeout(6000); s = await panelState(pg);
      T(g, 'tarayıcı geri: önceki sayfa, menü kapalı', cur(pg) === '/acik-pozisyonlar' && (!s || !s.open), cur(pg));
      await pg.goForward({ waitUntil: 'domcontentloaded' }).catch(() => {}); await pg.waitForTimeout(6000);
      T(g, 'tarayıcı ileri', cur(pg) === '/staj-programlari', cur(pg));
    } catch (e) { T(g, 'senaryo hatası', false, e.message.slice(0, 160)); }
    T(g, '1N JS hatası yok', errs.length === 0, errs.slice(0, 2));
    await ctx.close();
  }

  /* ---------- K: kariyer sayfaları ---------- */
  {
    const { ctx, pg, st, errs, media } = await open('/insan-kaynaklari'); const g = 'K hub';
    try {
      const d = await pg.evaluate(() => ({ doors: [...document.querySelectorAll('.cr-door')].map((a) => { const r = a.getBoundingClientRect(); return { href: a.getAttribute('href'), x: Math.round(r.left), y: Math.round(r.top + scrollY), w: Math.round(r.width), h: Math.round(r.height), bg: getComputedStyle(a).backgroundColor }; }),
        h1: [...document.querySelectorAll('h1')].map((h) => h.textContent), h2: [...document.querySelectorAll('.cr h2')].map((h) => h.textContent), kicker: document.querySelector('.cr-kicker').textContent.replace(/\s+/g, ' '),
        accent: document.querySelector('.cr-accent').textContent, desc: document.querySelector('.cr-desc').textContent, vids: document.querySelectorAll('video').length, cv: document.querySelectorAll('canvas').length }));
      T(g, 'içerik birebir', d.kicker === '01/KARİYER' && d.h1.join('|') === 'İNSAN KAYNAKLARI.' && d.accent === 'Geleceği birlikte tasarlıyoruz.' && d.desc === 'Yaratıcılığı, teknolojiyi ve farklı bakış açılarını bir araya getiren ekibimizde kariyer fırsatlarını keşfet.', d);
      T(g, 'tek H1', d.h1.length === 1, d.h1);
      T(g, 'kartlar: hedef + sıra + renk', d.doors.length === 2 && d.doors[0].href === '/acik-pozisyonlar' && d.doors[1].href === '/staj-programlari' && /162, 255, 0/.test(d.doors[0].bg), d.doors);
      const side = PROF === 'mobil' ? d.doors[1].y > d.doors[0].y + d.doors[0].h - 2 : Math.abs(d.doors[0].y - d.doors[1].y) < 2 && d.doors[1].x > d.doors[0].x;
      T(g, PROF === 'mobil' ? 'mobil: kartlar alt alta' : 'kartlar yan yana, eşit boyut', side && Math.abs(d.doors[0].w - d.doors[1].w) <= 2 && Math.abs(d.doors[0].h - d.doors[1].h) <= 2, d.doors.map((x) => x.w + 'x' + x.h + '@' + x.x + ',' + x.y).join(' '));
      T(g, 'video / canvas / medya isteği yok', d.vids === 0 && d.cv === 0 && media.length === 0, { vids: d.vids, media });
      // kartın tamamı tıklanabilir: başlık dışındaki boş alana tıklama
      await pg.locator('.cr-door').nth(1).scrollIntoViewIfNeeded(); await pg.waitForTimeout(1500);
      const b2 = await pg.locator('.cr-door').nth(1).boundingBox();
      await TOUCH ? pg.touchscreen.tap(b2.x + b2.width * 0.6, b2.y + b2.height * 0.4) : pg.mouse.click(b2.x + b2.width * 0.6, b2.y + b2.height * 0.4); await waitPath(pg, '/staj-programlari');
      await pg.waitForTimeout(6000);
      T(g, 'Staj kartı (boş alan) → /staj-programlari', cur(pg) === '/staj-programlari', cur(pg));
      // geri bağlantısı
      await pg.locator('.cr-back__a').scrollIntoViewIfNeeded();
      await act(pg, pg.locator('.cr-back__a')); await waitPath(pg, '/insan-kaynaklari'); await pg.waitForTimeout(6000);
      T(g, 'Staj: "İnsan Kaynaklarına Dön" → /insan-kaynaklari', cur(pg) === '/insan-kaynaklari', cur(pg));
      await pg.locator('.cr-door').first().scrollIntoViewIfNeeded();
      await act(pg, pg.locator('.cr-door').first()); await waitPath(pg, '/acik-pozisyonlar'); await pg.waitForTimeout(6000);
      T(g, 'Açık Pozisyonlar kartı → /acik-pozisyonlar', cur(pg) === '/acik-pozisyonlar', cur(pg));
      const info = await pg.evaluate(() => ({ h1: [...document.querySelectorAll('h1')].map((h) => h.textContent), kicker: document.querySelector('.cr-kicker').textContent.replace(/\s+/g, ' '), accent: document.querySelector('.cr-accent').textContent, status: document.querySelector('.cr-status__text').textContent, count: document.querySelector('.cr-status__count data').getAttribute('value'), back: document.querySelector('.cr-back__a').getAttribute('href'), backT: document.querySelector('.cr-back__a').textContent, forms: document.querySelectorAll('.cr form,.cr input,.cr button').length, ld: [...document.querySelectorAll('script[type="application/ld+json"]')].filter((s) => /JobPosting/.test(s.textContent)).length }));
      T('K açık', 'içerik + durum + geri bağlantısı', info.h1.join('|') === 'AÇIK POZİSYONLAR.' && info.kicker === '01/CAREER' && info.accent === 'Yeni fırsatlarda görüşmek üzere.' && info.status === 'Şu anda açık pozisyon bulunmuyor.' && info.count === '0' && info.back === '/insan-kaynaklari' && info.backT === 'İnsan Kaynaklarına Dön', info);
      T('K açık', 'form / başvuru / JobPosting yok', info.forms === 0 && info.ld === 0, info);
      await pg.locator('.cr-back__a').scrollIntoViewIfNeeded();
      await act(pg, pg.locator('.cr-back__a')); await waitPath(pg, '/insan-kaynaklari'); await pg.waitForTimeout(6000);
      T('K açık', '"İnsan Kaynaklarına Dön" → /insan-kaynaklari', cur(pg) === '/insan-kaynaklari', cur(pg));
      await pg.goBack({ waitUntil: 'domcontentloaded' }).catch(() => {}); await pg.waitForTimeout(6000);
      T('K geçmiş', 'geri → /acik-pozisyonlar ve içerik yeniden kuruluyor', cur(pg) === '/acik-pozisyonlar' && await pg.evaluate(() => document.querySelectorAll('h1').length === 1 && !!document.querySelector('.cr-status')), cur(pg));
      await pg.goForward({ waitUntil: 'domcontentloaded' }).catch(() => {}); await pg.waitForTimeout(6000);
      T('K geçmiş', 'ileri → /insan-kaynaklari', cur(pg) === '/insan-kaynaklari' && await pg.evaluate(() => document.querySelectorAll('.cr-door').length === 2), cur(pg));
      // BFCache benzetimi: pagehide/pageshow(persisted) sonrası Header + içerik yerinde, dinleyici birikmiyor
      const bf = await pg.evaluate(async () => { const n0 = document.querySelectorAll('.n1h-panel').length; for (let i = 0; i < 3; i++) { dispatchEvent(new PageTransitionEvent('pagehide', { persisted: true })); dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true })); await new Promise((r) => setTimeout(r, 600)); }
        return { panels: document.querySelectorAll('.n1h-panel').length, n0, headers: document.querySelectorAll('n1-header').length, doors: document.querySelectorAll('.cr-door').length, vis: getComputedStyle(document.querySelector('.cr-title')).opacity }; });
      T('K BFCache', 'benzetilmiş dönüş ×3: tek Header/panel, içerik görünür', bf.panels === bf.n0 && bf.headers === 1 && bf.doors === 2 && +bf.vis === 1, bf);
    } catch (e) { T(g, 'senaryo hatası', false, e.message.slice(0, 160)); }
    T(g, '1N JS hatası yok', errs.length === 0, errs.slice(0, 2));
    await ctx.close();
  }

  /* ---------- A: klavye + odak (yalnız masaüstü) ---------- */
  if (!TOUCH) {
    const { ctx, pg } = await open('/insan-kaynaklari'); const g = 'A klavye';
    try {
      const seen = []; let outline = null;
      for (let i = 0; i < 14; i++) { await pg.keyboard.press('Tab'); const a = await pg.evaluate(() => { const e = document.activeElement; const cs = e && getComputedStyle(e); return e ? { cls: String(e.className || e.tagName).slice(0, 30), href: e.getAttribute && e.getAttribute('href'), outline: cs.outlineStyle + ' ' + cs.outlineWidth + ' ' + cs.outlineColor } : null; }); seen.push(a); if (a && /cr-door/.test(a.cls) && !outline) outline = a.outline; }
      T(g, 'Tab ile iki kart sırayla odaklanıyor', seen.some((a) => a && a.href === '/acik-pozisyonlar') && seen.some((a) => a && a.href === '/staj-programlari'), seen.map((a) => a && (a.href || a.cls)).join(' → '));
      T(g, 'kart odak çerçevesi görünür (focus-visible)', outline && /solid 2px/.test(outline), outline);
      // menü klavye: MENU → Enter, İK satırında ← alt menüyü açar ve ilk alt bağlantıya odaklanır
      await pg.locator('n1-header .n1h-menu').focus(); await pg.keyboard.press('Enter'); await pg.waitForTimeout(600);
      await pg.locator('.n1h-panel[data-open] a.n1h-item[data-sub]').focus(); await pg.keyboard.press('ArrowLeft'); await pg.waitForTimeout(400);
      const k = await pg.evaluate(() => ({ active: document.activeElement && document.activeElement.textContent.trim(), open: !!document.querySelector('.n1h-sub[data-open]') }));
      T(g, 'menüde ← İK alt menüsünü açıp ilk bağlantıya odaklanıyor', k.open && k.active === 'Açık Pozisyonlar', k);
      await pg.keyboard.press('ArrowRight'); await pg.waitForTimeout(300);
      const k2 = await pg.evaluate(() => ({ active: document.activeElement && (document.activeElement.className || ''), open: !!document.querySelector('.n1h-sub[data-open]') }));
      T(g, '→ alt menüyü kapatıp İK satırına dönüyor', !k2.open && /n1h-subtog/.test(k2.active), k2);
    } catch (e) { T(g, 'senaryo hatası', false, e.message.slice(0, 160)); }
    await ctx.close();
  }

  /* ---------- P: V1.4 ve korunan davranışlar ---------- */
  {
    const { ctx, pg, errs, media } = await open('/'); const g = 'P ana sayfa';
    const h = await pg.evaluate(() => ({ cta: [...document.querySelectorAll('a')].filter((a) => /Hikâyemizin Devamı/.test(a.textContent)).map((a) => a.getAttribute('href')), m5: performance.getEntriesByType('resource').some((e) => /n1-video-m5-v14\.js/.test(e.name)), v660: performance.getEntriesByType('resource').some((e) => /n1-site-wix-v660\.js|wix-career-v1\/sites\/home|n1-site-wix-v658\.js/.test(e.name)), vids: document.querySelectorAll('video').length, ronin: (() => { const v = document.querySelector('[data-m4-film] video, ronin-hero-v67 video'); return v ? (v.currentSrc || v.getAttribute('src') || v.getAttribute('data-src') || '') : ''; })() }));
    T(g, '"Hikâyemizin Devamı" → /kisaca-biz', h.cta.length >= 1 && h.cta.every((x) => x === '/kisaca-biz'), h.cta);
    if (PROF !== 'masaustu') T(g, 'mobil video modülü v14 yükleniyor (V1.4)', h.m5, h);
    if (PROF === 'mobil') T(g, 'Ronin 2× kaynağı korunuyor', /ronin-m5-film-2x\.mp4/.test(h.ronin) || /ronin-m5-film/.test(media.join(' ')), h.ronin.slice(-40) || media);
    T(g, '1N JS hatası yok', errs.length === 0, errs.slice(0, 2));
    await ctx.close();
    if (PROF !== 'masaustu') {
      const r = await open('/e-ticaret-yonetimi');
      const e = await r.pg.evaluate(() => ({ stills: document.querySelectorAll('img[data-n1-still]').length, vSrc: [...document.querySelectorAll('video')].filter((v) => v.currentSrc || v.getAttribute('src')).length }));
      T('P hizmet', 'E-Ticaret: V1.4 hafif profil (kare 2, kaynaklı video ≤ 1)', e.stills === 2 && e.vSrc <= 1, e);
      T('P hizmet', '1N JS hatası yok', r.errs.length === 0, r.errs.slice(0, 2));
      await r.ctx.close();
    }
  }
  console.log(BR, PROF, 'TOPLAM', pass, 'geçti', fail, 'kaldı', '· Wix istemci gezinmesi (adres doğrulandı, doğrudan yüklendi):', SPA);
  if (OUT) fs.writeFileSync(OUT, JSON.stringify({ br: BR, profile: PROF, pass, fail, wixSpaNavs: SPA, results }, null, 1));
  await b.close();
})();
