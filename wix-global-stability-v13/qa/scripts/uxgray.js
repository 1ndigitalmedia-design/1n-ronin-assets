const pw=require('playwright');const [,,BR='webkit',N='3']=process.argv;
(async()=>{for(let k=1;k<=+N;k++){const b=await pw[BR].launch();const o={viewport:{width:390,height:844},deviceScaleFactor:3,hasTouch:true};if(BR==='chromium')o.isMobile=true;
const cx=await b.newContext(o);if(process.env.CSS)await cx.addInitScript(c=>{document.addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.textContent=c;document.head.appendChild(s);});},process.env.CSS);const pg=await cx.newPage();let c=false;pg.on('crash',()=>c=true);let n=0,info='';
try{await pg.goto('https://www.reklam1n.com/ui-ux-tasarim',{waitUntil:'domcontentloaded'});await pg.waitForTimeout(8000);
 const sel=await pg.evaluate(()=>{const s=document.querySelector('.ux-screen--acc');if(!s)return '';const root=s.closest('section')||document;const g=[...root.querySelectorAll('[role="switch"],[aria-checked]')];return g.length+' anahtar';});info=sel;
 await pg.evaluate(()=>document.querySelector('.ux-screen--acc').scrollIntoView({block:'center'}));await pg.waitForTimeout(1500);
 const handle=await pg.evaluateHandle(()=>{const s=document.querySelector('.ux-screen--acc');const root=s.closest('section')||document;return [...root.querySelectorAll('[aria-checked]')].find(b=>/gri|gray|renk/i.test((b.textContent||'')+(b.getAttribute('aria-label')||'')+(b.className||'')))||root.querySelector('[aria-checked]');});
 info+=' | '+await handle.evaluate(b=>(b.textContent||b.getAttribute('aria-label')||b.className).trim().slice(0,40));
 for(n=0;n<12&&!c;n++){await handle.evaluate(b=>b.click());await pg.waitForTimeout(+(process.env.GAP||250));}
 await pg.waitForTimeout(1000);info+=' | is-gray='+await pg.evaluate(()=>document.querySelector('.ux-screen--acc').classList.contains('is-gray')).catch(()=>'?');
}catch(e){info+=' HATA '+String(e.message).slice(0,60);}
console.log(BR,'ui-ux gri anahtarı #'+k,c?'ÇÖKME ('+n+'. tıklamada)':'tamam ('+n+' tıklama)','|',info);await b.close().catch(()=>{});}})();
