// UI/UX gri tonlamalı önizleme anahtarı: tekrar tekrar aç/kapa. node ux29.js <webkit|chromium> <v28|v29> <n> <gapMs> <clicks>
const pw=require('playwright');const fs=require('fs');const [,,BR='webkit',VER='v29',N='3',GAP='800',CL='12']=process.argv;
(async()=>{for(let k=1;k<=+N;k++){const b=await pw[BR].launch();const o={viewport:{width:390,height:844},deviceScaleFactor:3,hasTouch:true};if(BR==='chromium')o.isMobile=true;
 const ctx=await b.newContext(o);const st={};await require('./routeUx.js')(ctx,VER,st,process.env.CDNURL?require('child_process').execFileSync('curl',['-sS','-f',process.env.CDNURL]):null);const pg=await ctx.newPage();let c=false;pg.on('crash',()=>c=true);let n=0,info='';
 try{await pg.goto('https://www.reklam1n.com/ui-ux-tasarim',{waitUntil:'domcontentloaded'});await pg.waitForSelector('.ux-screen--acc',{timeout:45000});await pg.waitForTimeout(6000);
  await pg.evaluate(()=>document.querySelector('.ux-screen--acc').scrollIntoView({block:'center'}));await pg.waitForTimeout(1500);
  const sw=await pg.evaluateHandle(()=>{const s=document.querySelector('.ux-screen--acc');const root=s.closest('section')||document;return [...root.querySelectorAll('[aria-checked]')].find(b=>/gri/i.test((b.textContent||'')+(b.getAttribute('aria-label')||'')));});
  const states=[];
  for(n=0;n<+CL&&!c;n++){await sw.tap?await sw.evaluate(b=>b.click()):0;await pg.waitForTimeout(+GAP);if(n<2)states.push(await pg.evaluate(()=>{const s=document.querySelector('.ux-screen--acc');return (s.classList.contains('is-gray')?'gri:':'renkli:')+getComputedStyle(s).filter+' aria='+[...(s.closest('section')||document).querySelectorAll('[aria-checked]')].find(b=>/gri/i.test(b.textContent||'')).getAttribute('aria-checked')}));}
  info=states.join(' → ');
 }catch(e){info+=' HATA '+String(e.message).split('\n')[0].slice(0,60);}
 const r={br:BR,ver:VER,run:k,gap:+GAP,clicks:n,crash:c,route:st.hit||0};fs.appendFileSync('ux29.jsonl',JSON.stringify(r)+'\n');
 console.log(BR,VER,'#'+k,'aralık',GAP+'ms',c?'ÇÖKME ('+n+'. tıklamada)':'tamam ('+n+' tıklama)','| yönl',r.route,'|',info);await b.close().catch(()=>{});}})();
