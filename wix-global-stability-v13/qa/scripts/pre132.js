// Düşük Güç Modu benzetimi: kullanıcı etkileşimi olmadan play() reddedilir → ön kontrol "doğrulanmadı", "Dokunarak dene" ayrımı, geçersiz işaretleme
const pw=require('playwright');const fs=require('fs');const {execFileSync}=require('child_process');const R='/home/user/1n-ronin-assets/wix-global-stability-v13/';
const SW=fs.readFileSync(R+'wix-custom-code/TEST-SWITCH-v13.2-head.html','utf8');const RUN=fs.readFileSync(R+'stress/n1-stress-v2.js');
function curl(u){return execFileSync('curl',['-sS','-f','-L','--compressed','--max-time','25',u],{maxBuffer:64<<20}).toString('utf8');}
function entries(h){const out=[];const re=/\{"id":"[0-9a-f-]+","embedType":"custom",(?:"pages":\[[^\]]*\],)?"position":"(\w+)","loadOnce":\w+,"content":\{"type":"custom","html":"((?:[^"\\]|\\.)*)"/g;let m;while((m=re.exec(h)))out.push(JSON.parse('"'+m[2]+'"'));return out;}
const LP=`(function(){var o=HTMLMediaElement.prototype.play;HTMLMediaElement.prototype.play=function(){var ua=window.__tap;if(!ua)return Promise.reject(new DOMException('LPM test','NotAllowedError'));return o.apply(this,arguments);};
document.addEventListener('touchstart',function(){window.__tap=true;setTimeout(function(){window.__tap=false},1000)},true);})();`;
(async()=>{const b=await pw.webkit.launch();const ctx=await b.newContext({viewport:{width:440,height:956},deviceScaleFactor:3,hasTouch:true,isMobile:false});await ctx.addInitScript(LP);
await ctx.route(r=>r.hostname==='www.reklam1n.com',async route=>{const q=route.request();if(q.resourceType()!=='document')return route.continue();let h=curl(q.url());const e=entries(h).find(x=>x.includes('__n1Test'));if(e&&h.includes(e.trim()))h=h.split(e.trim()).join(SW);route.fulfill({status:200,body:h,headers:{'content-type':'text/html; charset=utf-8'}});});
await ctx.route(/n1-stress-v2\.js$/,r=>r.fulfill({status:200,body:RUN,headers:{'content-type':'application/javascript','access-control-allow-origin':'*'}}));
const pg=await ctx.newPage();pg.on('dialog',d=>{console.log('onay sorusu:',d.message().slice(0,90));d.accept();});
await pg.goto('https://www.reklam1n.com/?n1t=stress2',{waitUntil:'domcontentloaded'});await pg.waitForSelector('#n1-stress-panel',{timeout:45000});await pg.waitForTimeout(4000);
await pg.evaluate(()=>[...document.querySelectorAll('#n1-stress-panel button')].find(b=>/Video kontrol/.test(b.textContent)).click());
await pg.waitForFunction(()=>/Video kontrolü: (?!yapılmadı)/.test(document.getElementById('n1-stress-panel').innerText),{timeout:30000});
const txt=()=>pg.evaluate(()=>document.getElementById('n1-stress-panel').innerText.match(/Video kontrolü:.*$/m)[0]);
console.log('1) dokunuşsuz:',(await txt()).slice(0,170));
const bt=await pg.$('#n1-stress-panel button:has-text("Dokunarak dene")');console.log('   "Dokunarak dene" düğmesi:',!!bt);
if(bt){await bt.tap();await pg.waitForFunction(()=>/dokunuşla/.test(document.getElementById('n1-stress-panel').innerText),{timeout:15000}).catch(()=>{});console.log('2) dokunuşla:',(await txt()).slice(0,230));}
await pg.evaluate(()=>[...document.querySelectorAll('#n1-stress-panel button')].find(b=>/Başlat/.test(b.textContent)).click());await pg.waitForTimeout(4000);
const s=await pg.evaluate(()=>{const x=JSON.parse(localStorage.getItem('n1s2-state')||'null');return x&&{videoInvalid:x.videoInvalid,pre:x.pre,phase:x.phase,n:x.plan.length}});
console.log('3) başlatılan çalıştırma: videoInvalid',s&&s.videoInvalid,'plan',s&&s.n,'aşama',s&&s.phase);
const title=await pg.evaluate(()=>document.getElementById('n1-stress-panel').innerText.split('\n')[0]).catch(()=>'');console.log('   panel başlığı:',title);
await pg.evaluate(()=>{localStorage.removeItem('n1s2-active');});await b.close();})();
