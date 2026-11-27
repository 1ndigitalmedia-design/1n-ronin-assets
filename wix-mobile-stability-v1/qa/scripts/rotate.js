const pw=require('playwright');const [,,BR='webkit']=process.argv;
(async()=>{const b=await pw[BR].launch();const o={viewport:{width:390,height:844},hasTouch:true};if(BR==='chromium')o.isMobile=true;const ctx=await b.newContext(o);if(process.env.N1_ROUTES)await require('./route.js')(ctx);const pg=await ctx.newPage();
await pg.goto('https://www.reklam1n.com/markalar',{waitUntil:'domcontentloaded'});await pg.waitForTimeout(9000);
const S=()=>pg.evaluate(()=>{document.querySelector('.mk-show').scrollIntoView({block:'start'});const vw=document.documentElement.clientWidth;return [...document.querySelectorAll('.mk-mq__row')].map(r=>{const t=r.querySelector('.mk-mq__track');const tr=t.getBoundingClientRect();return {l:Math.round(tr.left),r:Math.round(tr.right),vw,op:getComputedStyle(r).opacity}})});
for(const vp of [{width:844,height:390},{width:390,height:844},{width:1180,height:820},{width:820,height:1180}]){await pg.setViewportSize(vp);await pg.waitForTimeout(1500);const a=await S();await pg.waitForTimeout(1000);const c=await S();
console.log(BR,JSON.stringify(vp),a.map((x,i)=>`row${i+1}:${x.l!==c[i].l?'moving':'STUCK'} coversRight=${c[i].r>=c[i].vw} op=${c[i].op}`).join(' | '));}
await pg.screenshot({path:'shots/markalar-rotated-'+BR+'.png'});await b.close();})();
