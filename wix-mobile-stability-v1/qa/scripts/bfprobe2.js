const pw=require('playwright');
const init=`(function(){var K='__n1ev';function log(s){try{var a=JSON.parse(sessionStorage.getItem(K)||'[]');a.push(location.pathname+' '+s+' t='+Math.round(performance.now()));sessionStorage.setItem(K,JSON.stringify(a))}catch(e){}}
log('init nav='+((performance.getEntriesByType('navigation')[0]||{}).type));
['pagehide','pageshow','beforeunload','unload'].forEach(function(t){window.addEventListener(t,function(e){log(t+('persisted' in e?':'+e.persisted:''))},true)});
var r=Location.prototype.reload; try{Object.defineProperty(Location.prototype,'reload',{value:function(){log('RELOAD CALLED '+(new Error().stack||'').split('\\n').slice(1,5).join(' | ').slice(0,500));return r.call(this)}})}catch(e){log('cannot wrap reload '+e)}
})();`;
(async()=>{
 for (const [name,bt,opts] of [['chromium-bfcache',pw.chromium,{ignoreDefaultArgs:['--disable-back-forward-cache']}],['webkit',pw.webkit,{}]]){
  const b=await bt.launch(opts); const ctx=await b.newContext(); const pg=await ctx.newPage();
  await pg.addInitScript(init);
  await pg.goto('https://www.reklam1n.com/kisaca-biz',{waitUntil:'load'}); await pg.waitForTimeout(3000);
  await pg.goto('https://www.reklam1n.com/markalar',{waitUntil:'load'}); await pg.waitForTimeout(3000);
  await pg.goBack({waitUntil:'load'}); await pg.waitForTimeout(3000);
  console.log(name); (await pg.evaluate(()=>JSON.parse(sessionStorage.getItem('__n1ev')))).forEach(l=>console.log('  ',l));
  await b.close();
 }
})();
