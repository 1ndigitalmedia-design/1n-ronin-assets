const pw=require('playwright');const fs=require('fs');const {execSync}=require('child_process');const PORT=process.env.PORT||8790;
function procs(){const rows=execSync('ps -eo pid=,ppid=,rss=,comm=').toString().trim().split('\n').map(l=>{const m=l.trim().split(/\s+/);return [+m[0],+m[1],+m[2],m.slice(3).join(' ')]});const kids=new Map();rows.forEach(([p,pp,r,c])=>{if(!kids.has(pp))kids.set(pp,[]);kids.get(pp).push([p,r,c])});let tot=0,mx=0;const st=[process.pid];while(st.length){const p=st.pop();(kids.get(p)||[]).forEach(([c,r])=>{tot+=r;mx=Math.max(mx,r);st.push(c)})}return {totalMB:Math.round(tot/1024),maxProcMB:Math.round(mx/1024)};}
(async()=>{const out=[];
for(const br of ['webkit','chromium'])for(let rep=1;rep<=3;rep++)for(const f of ['none','1x','1.5x','2x']){
 const b=await pw[br].launch(br==='chromium'?{args:['--autoplay-policy=no-user-gesture-required']}:{});
 const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:3});const pg=await ctx.newPage();
 let cdp=null;if(br==='chromium'){cdp=await ctx.newCDPSession(pg);}
 await pg.goto(`http://localhost:${PORT}/?f=${f}`);await pg.waitForTimeout(2000);const before=procs();const qa=await pg.evaluate(()=>window.V&&V.getVideoPlaybackQuality?V.getVideoPlaybackQuality().totalVideoFrames:0);
 await pg.waitForTimeout(12000);const after=procs();
 const q=await pg.evaluate(()=>{if(!window.V)return {};const p=V.getVideoPlaybackQuality?V.getVideoPlaybackQuality():{};return {t:+V.currentTime.toFixed(2),w:V.videoWidth,h:V.videoHeight,total:p.totalVideoFrames,dropped:p.droppedVideoFrames,paused:V.paused,R:window.R}});
 const caps=rep===1&&f==='none'?await pg.evaluate(()=>caps()):undefined;
 let thr=null;
 if(cdp&&f!=='none'){await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});const q0=await pg.evaluate(()=>V.getVideoPlaybackQuality());await pg.waitForTimeout(8000);const q1=await pg.evaluate(()=>V.getVideoPlaybackQuality());thr={fps:+((q1.totalVideoFrames-q0.totalVideoFrames)/8).toFixed(1),droppedPct:+(100*(q1.droppedVideoFrames-q0.droppedVideoFrames)/Math.max(1,q1.totalVideoFrames-q0.totalVideoFrames)).toFixed(1)};}
 const rec={br,rep,f,...after,deltaTotal:after.totalMB-before.totalMB,quality:q,fps:q.total?+((q.total-qa)/12).toFixed(1):null,throttle4x:thr,caps};out.push(rec);console.log(JSON.stringify(rec));await b.close();}
fs.writeFileSync('mediabench.json',JSON.stringify(out,null,1));})();
