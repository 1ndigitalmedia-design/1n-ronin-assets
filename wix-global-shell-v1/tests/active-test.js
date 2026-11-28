// Adres tabanlı aktif menü durumu — gerçek adreslerde (bağımsız header test sayfası, header v14 aynı kod). node active-test.js <br> <genişlik> [out]
const pw=require('playwright');const fs=require('fs');const [,,BR='chromium',WS='1440',OUT]=process.argv;const W=+WS,M=W<=1024;
const SH='https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@'+(process.env.SHELL_SHA||'0000000000000000000000000000000000000000')+'/wix-global-shell-v1/n1-global-shell-v1.js';
const CASES=[['/insan-kaynaklari','İnsan Kaynakları','İnsan Kaynakları'],['/acik-pozisyonlar','İnsan Kaynakları','Açık Pozisyonlar'],['/staj-programlari','İnsan Kaynakları','Staj Programları'],['/reklam-ajansi','Akademi','Akademi'],['/iletisim','İletişim','İletişim'],['/kisaca-biz','Kısaca Biz','Kısaca Biz'],['/e-ticaret-yonetimi','Hizmetler','E-Ticaret'],['/bu-sayfa-yok-xyz',null,null]];
const out=[];let pass=0,fail=0;
(async()=>{const b=await pw[BR].launch();for(const [path,item,aria] of CASES){const ctx=await b.newContext(M?Object.assign({viewport:{width:W,height:844},hasTouch:true,deviceScaleFactor:2},BR==='chromium'?{isMobile:true}:{}):{viewport:{width:W,height:900}});
 const rs=require('./routeshell.js');await rs(ctx,{});await rs.shellPages(ctx,SH);const pg=await ctx.newPage();await pg.goto('https://www.reklam1n.com'+path+'?n1shell=aktif',{waitUntil:'domcontentloaded'});
 await pg.waitForSelector('n1-global-header-v1[data-ready]',{timeout:30000});const btn=pg.locator('n1-global-header-v1 .n1h-menu');M?await btn.tap():await btn.click();await pg.waitForTimeout(700);
 const c=await pg.evaluate(()=>({cur:[...document.querySelectorAll('.n1h-panel .n1h-item[data-current]')].map(e=>e.querySelector('.n1h-txt').textContent.trim()),aria:[...document.querySelectorAll('.n1h-panel [aria-current="page"]')].map(e=>e.textContent.trim())}));
 const ok=item?c.cur.join()===item&&c.aria.some(x=>x.startsWith(aria)):c.cur.length===0&&c.aria.length===0;ok?pass++:fail++;out.push({path,ok,c});console.log(BR,W,ok?'GEÇTİ':'KALDI',path,'→',JSON.stringify(c));await ctx.close();}
console.log(BR,W,'TOPLAM',pass,'geçti',fail,'kaldı');if(OUT)fs.writeFileSync(OUT,JSON.stringify({pass,fail,out},null,1));await b.close();})();
