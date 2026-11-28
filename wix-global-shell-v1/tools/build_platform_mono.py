# Global Menü V2.1 — özgün renkli PNG kaynaklarından arka planı temizlenmiş, tek renkli (currentColor) SVG logo sembolleri.
# Gri tonlama filtresi DEĞİL: her logonun şekli renk kümelerinden maskelenir, potrace ile vektöre çevrilir.
# ZEYP: arkadaki şekil %42 opaklık + öndeki "2" çevresinde boşluk (iki şekil birbirine karışmaz).
# Çıktı: assets/platforms/mono/<ad>.svg (fill=currentColor) + mono/manifest.json (viewBox, yol verisi; header v15 bunu gömer).
import os,sys,json,subprocess,tempfile,re
import numpy as np
from PIL import Image, ImageFilter
D=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','assets','platforms')
SRC=os.path.join(D,'source'); OUT=os.path.join(D,'mono'); os.makedirs(OUT,exist_ok=True)
N=1000   # izleme çözünürlüğü (2000 → 1000)
def load(n): return np.asarray(Image.open(os.path.join(SRC,n+'.png')).convert('RGB').resize((N,N),Image.LANCZOS)).astype(np.int32)
def dist(a,c): return np.sqrt(((a-np.array(c))**2).sum(-1))
def clean(m,r=1):
    im=Image.fromarray((m*255).astype(np.uint8)).filter(ImageFilter.MedianFilter(3))
    return np.asarray(im)>127
def dilate(m,px):
    im=Image.fromarray((m*255).astype(np.uint8)).filter(ImageFilter.MaxFilter(px*2+1)); return np.asarray(im)>127
def trace(m):
    with tempfile.TemporaryDirectory() as t:
        p=os.path.join(t,'m.pbm'); Image.fromarray(((~m)*255).astype(np.uint8)).convert('1').save(p)
        subprocess.run(['potrace','-b','svg','--flat','-t','12','-a','1.0','-O','0.5','-u','1','-o',os.path.join(t,'o.svg'),p],check=True)
        s=open(os.path.join(t,'o.svg')).read()
    d=' '.join(re.findall(r'<path d="([^"]+)"',s)); tr=re.search(r'transform="([^"]+)"',s).group(1)
    return d,tr
masks={}
a=load('01-zeyp')
lime,olive,black=(162,255,0),None,(28,28,28)
olivepx=a[(a[...,1]>90)&(a[...,1]<170)&(a[...,0]<130)]; olive=tuple(np.median(olivepx,0).astype(int))
dl,do,db=dist(a,lime),dist(a,olive),dist(a,black)
front=clean((db<do)&(db<dl)); back=clean((do<db)&(do<dl)) & ~dilate(front,9)
masks['01-zeyp']=[('back',back,0.42),('front',front,1)]
a=load('02-market'); masks['02-market']=[('m',clean(dist(a,(239,239,239))>70),1)]
a=load('03-hemen-tikla'); masks['03-hemen-tikla']=[('m',clean(dist(a,(40,7,53))>45),1)]
a=load('04-intelligence'); masks['04-intelligence']=[('m',clean(a.mean(-1)<110),1)]
# algısal denge: kare viewBox = sınır kutusu × optik katsayı (ölçüm: bbox ve mürekkep alanı manifest'e yazılır)
OPT={'01-zeyp':1.0,'02-market':0.86,'03-hemen-tikla':1.0,'04-intelligence':0.91}
man={}
for n,parts in masks.items():
    allm=np.zeros((N,N),bool)
    for _,m,op in parts: allm|=m
    ys,xs=np.nonzero(allm); x0,x1,y0,y1=xs.min(),xs.max(),ys.min(),ys.max(); bw,bh=x1-x0,y1-y0
    ink=sum(m.sum()*op for _,m,op in parts)
    # optik düzeltme: dolu/geniş şekiller (Market, Intelligence) aynı kutu doluluğunda daha ağır görünür → biraz küçültülür
    side=max(bw,bh)*1.04/OPT.get(n,1.0)
    cx,cy=(x0+x1)/2,(y0+y1)/2
    vb=[round(cx-side/2,1),round(cy-side/2,1),round(side,1),round(side,1)]
    paths=[]
    for k,m,op in parts:
        d,tr=trace(m); paths.append({'k':k,'d':d,'op':op,'tr':tr})
    svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="%s" fill="currentColor" aria-hidden="true">%s</svg>'%(' '.join(map(str,vb)),''.join('<g transform="%s"%s><path d="%s"/></g>'%(p['tr'],'' if p['op']==1 else ' fill-opacity="%s"'%p['op'],p['d']) for p in paths))
    open(os.path.join(OUT,n+'.svg'),'w').write(svg+'\n')
    man[n]={'viewBox':' '.join(map(str,vb)),'paths':paths,'bytes':len(svg),'bbox':[int(bw),int(bh)],'ink':int(ink)}
    print(n,'olive' if n=='01-zeyp' else '', 'bbox',bw,bh,'ink',int(ink),'vb',vb,'bytes',len(svg))
json.dump(man,open(os.path.join(OUT,'manifest.json'),'w'),ensure_ascii=False)
