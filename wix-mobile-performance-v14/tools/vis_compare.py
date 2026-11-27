# Görsel regresyon karşılaştırması: vis-<mode>-<profile>.json + ekran görüntüleri → qa/vis-compare.json + yan yana sayfalar
import json,os,sys
from PIL import Image,ImageChops
D='screenshots/visual';out=[];os.makedirs(D+'/compare',exist_ok=True)
def load(m,p):
    f=f'{D}/vis-{m}-{p}.json';return {r['page']:r for r in json.load(open(f))} if os.path.exists(f) else {}
for prof in ['masaustu','mobil','tablet']:
    L,V=load('live',prof),load('v14',prof)
    for page in L:
        a,b=L[page],V.get(page)
        if not b: continue
        la=sorted([x for x in a.get('boxes',[]) if x['vis']],key=lambda x:(x['y'],x['x']));lb=sorted([x for x in b.get('boxes',[]) if x['vis']],key=lambda x:(x['y'],x['x']))
        pairs=[];
        for x in la:
            m=min(lb,key=lambda y:abs(y['y']-x['y'])+abs(y['x']-x['x'])) if lb else None
            if m: pairs.append({'live':f"{x['k']}@{x['x']},{x['y']} {x['w']}x{x['h']}",'v14':f"{m['k']}@{m['x']},{m['y']} {m['w']}x{m['h']} fit={m['fit']} doğal={m['nat']}",'d':max(abs(x['x']-m['x']),abs(x['y']-m['y']),abs(x['w']-m['w']),abs(x['h']-m['h']))})
        shots=[]
        for sa,sb in zip(a.get('shots',[]),b.get('shots',[])):
            sa=sa.replace('../','');sb=sb.replace('../','');A=Image.open(sa).convert('RGB');B=Image.open(sb).convert('RGB')
            if A.size!=B.size: shots.append({'shot':os.path.basename(sb),'diffPct':None});continue
            df=ImageChops.difference(A,B).convert('L').point(lambda v:255 if v>24 else 0);bb=df.getbbox();pct=round(100*sum(1 for v in df.getdata() if v)/ (A.size[0]*A.size[1]),2)
            shots.append({'shot':os.path.basename(sb),'diffPct':pct,'bbox':bb})
            if prof!='masaustu':
                w,h=A.size;S=Image.new('RGB',(w*2+10,h),(40,40,40));S.paste(A,(0,0));S.paste(B,(w+10,0));S.thumbnail((1200,1200));S.save(f"{D}/compare/{os.path.basename(sb).replace('-v14-','-')}".replace('.png','.jpg'),quality=82)
        out.append({'page':page,'profile':prof,'heightLive':a.get('height'),'heightV14':b.get('height'),'overflowV14':b.get('overflowX'),'maxBoxDelta':max([p['d'] for p in pairs],default=0),'pairs':pairs,'shots':shots})
        print(prof,page.ljust(22),'yükseklik',a.get('height'),'→',b.get('height'),'| taşma',b.get('overflowX'),'| kutu farkı en çok',max([p['d'] for p in pairs],default=0),'px | piksel farkı %',[s['diffPct'] for s in shots])
json.dump(out,open('qa/vis-compare.json','w'),ensure_ascii=False,indent=1)
