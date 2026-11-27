// v28 ↔ v29: renkli ve gri son durum ekran görüntüleri + geçiş sırasında (100/200/300 ms) hesaplanan filtre
const pw=require('playwright');const fs=require('fs');const [,,BR='chromium']=process.argv;
async function run(ver){const b=await pw[BR].launch();const o={viewport:{width:390,height:844},deviceScaleFactor:2,hasTouch:true};if(BR==='chromium')o.isMobile=true;
 const ctx=await b.newContext(o);await require('./routeUx.js')(ctx,ver);
 if(process.env.NOTRANS)await ctx.addInitScript(()=>{document.addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.textContent='.ux-screen--acc{transition:none!important}';document.head.appendChild(s);});});
 const pg=await ctx.newPage();let crash=0;pg.on('crash',()=>crash++);
 await pg.goto('https://www.reklam1n.com/ui-ux-tasarim',{waitUntil:'domcontentloaded'});await pg.waitForSelector('.ux-screen--acc',{timeout:45000});await pg.waitForTimeout(6000);
 await pg.evaluate(()=>document.querySelector('.ux-screen--acc').scrollIntoView({block:'center'}));await pg.waitForTimeout(2500);
 const click=()=>pg.evaluate(()=>{const s=document.querySelector('.ux-screen--acc');[...(s.closest('section')||document).querySelectorAll('[aria-checked]')].find(b=>/gri/i.test(b.textContent||'')).click();});
 const el=await pg.$('.ux-screen--acc');const out={ver,mid:[]};
 await el.screenshot({path:`vis/ux-${BR}-${ver}-renkli.png`,animations:'disabled'});
 if(!process.env.NOTRANS){await click();for(const t of [100,200,300]){await pg.waitForTimeout(t===100?100:100);out.mid.push(t+'ms:'+await pg.evaluate(()=>getComputedStyle(document.querySelector('.ux-screen--acc')).filter));}await pg.waitForTimeout(900);}
 else{await click();await pg.waitForTimeout(900);}
 await el.screenshot({path:`vis/ux-${BR}-${ver}-gri.png`,animations:'disabled'});
 out.trans=await pg.evaluate(()=>{const c=getComputedStyle(document.querySelector('.ux-screen--acc'));return c.transitionProperty+' '+c.transitionDuration+' '+c.transitionTimingFunction;});out.crash=crash;await b.close();return out;}
(async()=>{fs.mkdirSync('vis',{recursive:true});const a=await run('v28'),c=await run('v29');
 console.log(BR,'çökme',a.crash,c.crash,'| geçiş v28:',a.trans,'| v29:',c.trans);if(a.mid.length)console.log(' geçiş ortası v28:',a.mid.join(' '),'\n geçiş ortası v29:',c.mid.join(' '));})();
