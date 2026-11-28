# Biçim doğruluğu: tek renkli SVG (Playwright ile 512 px'e çizilir) ↔ özgün PNG'nin aynı bölgesindeki şekil maskesi → IoU (kesişim/birleşim)
import os,json,subprocess,sys
import numpy as np
from PIL import Image
H=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..'); P=os.path.join(H,'assets','platforms'); OUT=sys.argv[1]
man=json.load(open(os.path.join(P,'mono','manifest.json')))
js="""const pw=require('playwright'),fs=require('fs');(async()=>{const b=await pw.chromium.launch();const p=await b.newPage({viewport:{width:512,height:512}});
for(const n of %s){for(const mode of ['all','front']){let s=fs.readFileSync('%s/'+n+'.svg','utf8').replace('fill="currentColor"','fill="#fff"');if(mode==='front'){if(n!=='01-zeyp')continue;s=s.replace(/<g[^>]*fill-opacity[^>]*>.*?<\\/g>/,'');}else s=s.replace(/ fill-opacity="[^"]+"/g,'');
await p.setContent('<body style="margin:0;background:#000">'+s.replace('<svg ','<svg width="512" height="512" ')+'</body>');await p.screenshot({path:'%s/'+n+'-'+mode+'.png'});}}await b.close()})();"""%(json.dumps(list(man)),os.path.join(P,'mono'),OUT)
open(os.path.join(OUT,'r.js'),'w').write(js); subprocess.run(['node',os.path.join(OUT,'r.js')],check=True,cwd=os.path.join(H,'tests'))
def dist(a,c): return np.sqrt(((a-np.array(c))**2).sum(-1))
res={}
for n,m in man.items():
    x,y,w,_=map(float,m['viewBox'].split()); a=np.asarray(Image.open(os.path.join(P,'source',n+'.png')).convert('RGB')).astype(int)
    # viewBox 1000-ızgarada → kaynak 2000 px
    crop=Image.fromarray(a.astype(np.uint8)).crop((int(x*2),int(y*2),int((x+w)*2),int((y+w)*2))).resize((512,512),Image.LANCZOS); c=np.asarray(crop).astype(int)
    if n=='01-zeyp':
        db,dl=dist(c,(28,28,28)),dist(c,(162,255,0)); olive=(c[...,1]>90)&(c[...,1]<200)&(c[...,0]<130)&(dl>60)
        src={'all':(db<60)|olive,'front':db<60}
    elif n=='02-market': src={'all':dist(c,(239,239,239))>70}
    elif n=='03-hemen-tikla': src={'all':dist(c,(40,7,53))>45}
    else: src={'all':c.mean(-1)<110}
    for mode,sm in src.items():
        r=np.asarray(Image.open(os.path.join(OUT,n+'-'+mode+'.png')).convert('L'))>127
        iou=(r&sm).sum()/max(1,(r|sm).sum()); res[n+('' if mode=='all' else ' (öndeki "2")')]=round(float(iou),4)
print(json.dumps(res,ensure_ascii=False)); json.dump(res,open(os.path.join(H,'qa','v21','form-iou.json'),'w'),ensure_ascii=False,indent=1)
