import subprocess,json,os,sys,numpy as np
from PIL import Image,ImageDraw,ImageFont
HINT={'uygulama-web':[3.2],'uygulama-screens':[1.6],'uygulama-motion':[3.0],'yapay-story':[1.2],'yapay-gen':[0.0]}
def grab(f,t,out):
    subprocess.run(['ffmpeg','-v','error','-y','-ss',f'{t:.3f}','-i',f,'-frames:v','1','-q:v','1',out],check=True)
def metrics(p):
    a=np.asarray(Image.open(p).convert('L'),dtype=np.float32);a=a[::2,::2]
    lap=(a[1:-1,1:-1]*4-a[:-2,1:-1]-a[2:,1:-1]-a[1:-1,:-2]-a[1:-1,2:])
    return float(a.mean()),float(a.std()),float(lap.var())
res={}
for line in open('probe.txt'):
    n=line.split()[0];f=n+'.mp4';dur=float(line.split()[-1])
    os.makedirs('fr/'+n,exist_ok=True)
    ts=sorted(set([round(dur*(0.04+0.92*i/39),3) for i in range(40)]+[t for t in HINT.get(n,[]) if t<dur]))
    rows=[]
    for t in ts:
        p=f'fr/{n}/{t:07.3f}.png';grab(f,t,p)
        q=f'fr/{n}/_{t:07.3f}.png';grab(f,min(dur-0.05,t+0.12),q)
        m,s,sh=metrics(p)
        A=np.asarray(Image.open(p).convert('L'),dtype=np.float32);B=np.asarray(Image.open(q).convert('L'),dtype=np.float32);mot=float(np.abs(A-B).mean())
        os.remove(q);rows.append(dict(t=t,mean=m,std=s,sharp=sh,motion=mot,hint=t in HINT.get(n,[])))
    sh=np.array([r['sharp'] for r in rows]);sd=np.array([r['std'] for r in rows]);mo=np.array([r['motion'] for r in rows])
    nz=lambda x:(x-x.min())/(x.max()-x.min()+1e-9)
    for r,a,b,c in zip(rows,nz(sh),nz(sd),nz(mo)):
        r['score']=round(0.5*a+0.3*b+0.2*(1-c)+(0.15 if r['hint'] else 0)-(1 if r['mean']<22 else 0),3)
    rows.sort(key=lambda r:-r['score'])
    pick=[];[pick.append(r) for r in rows if all(abs(r['t']-p['t'])>dur*0.08 for p in pick) and len(pick)<6]
    res[n]=dict(dur=dur,candidates=pick)
    ims=[Image.open(f"fr/{n}/{r['t']:07.3f}.png").convert('RGB') for r in pick];h=320
    ims=[im.resize((int(im.width*h/im.height),h)) for im in ims];W=sum(i.width for i in ims)+8*(len(ims)-1)
    sheet=Image.new('RGB',(W,h+26),(30,30,30));x=0;d=ImageDraw.Draw(sheet)
    for i,(im,r) in enumerate(zip(ims,pick)):
        sheet.paste(im,(x,26));d.text((x+4,4),f"{i+1}) t={r['t']:.2f} s={r['score']:.2f} L={r['mean']:.0f}",fill=(162,255,0));x+=im.width+8
    sheet.save(f'sheet-{n}.jpg',quality=85)
    print(n,'aday:',[(round(r['t'],2),r['score']) for r in pick])
json.dump(res,open('candidates.json','w'),indent=1)
