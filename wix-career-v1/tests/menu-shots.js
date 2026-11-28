// Menü ekran görüntüleri: İK alt menüsü açık (masaüstü fare, mobil dokunma) — V1.4 canlı ve Kariyer V1 karşılaştırması
const pw=require('playwright');const [,,BR='chromium']=process.argv;
const IOS='Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.7 Mobile/15E148 Safari/604.1';
(async()=>{const b=await pw[BR].launch();
for(const [prof,o] of [['masaustu',{viewport:{width:1440,height:900},deviceScaleFactor:1}],['mobil',{viewport:{width:390,height:844},deviceScaleFactor:2,hasTouch:true,userAgent:IOS}]]){
 for(const mode of ['live','new']){const ctx=await b.newContext(o);await require('./routecareer.js')(ctx,{},{mode});const pg=await ctx.newPage();
  await pg.goto('https://www.reklam1n.com/reklam-yonetimi',{waitUntil:'domcontentloaded'});await pg.waitForTimeout(9000);
  const act=l=>o.hasTouch?l.tap():l.click();await act(pg.locator('n1-header .n1h-menu').first());await pg.waitForTimeout(800);
  const t=pg.locator('.n1h-panel[data-open] .n1h-subtog');if(await t.count())await act(t);else await act(pg.locator('.n1h-panel[data-open] button.n1h-item',{hasText:'İnsan Kaynakları'}));
  await pg.waitForTimeout(900);await pg.screenshot({path:`../screenshots/menu-${prof}-${mode==='live'?'v14-canli':'kariyer-v1'}.png`});console.log(prof,mode,'ok');await ctx.close();}}
await b.close();})();
