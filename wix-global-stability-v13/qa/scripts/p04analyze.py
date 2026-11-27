import sys,glob,re
from PIL import Image
import numpy as np
d=sys.argv[1];rows=[]
for f in sorted(glob.glob(d+'/f*.png')):
    t=int(re.search(r'_(-?\d+)\.png',f).group(1));a=np.asarray(Image.open(f).convert('RGB')).astype(int)
    h,w,_=a.shape;c=a[int(h*.3):int(h*.7),int(w*.05):int(w*.95)]
    lime=((abs(c[...,0]-161)<40)&(c[...,1]>215)&(c[...,2]<70)).mean()*100      # % işareti (#A1FF00)
    dark=((abs(a[...,0]-8)<6)&(abs(a[...,1]-10)<6)&(abs(a[...,2]-9)<6)).mean()*100  # loader zemini #080A09
    rows.append((t,lime,dark,a.std()))
state=[]
for t,lime,dark,sd in rows:
    s='LOADER' if lime>0.4 and dark>60 else ('BOŞ' if sd<6 else 'İÇERİK')
    state.append((t,s,lime,dark))
seq=[];
for t,s,l,dk in state:
    if not seq or seq[-1][1]!=s: seq.append([t,s,1])
    else: seq[-1][2]+=1
print(' → '.join(f"{s}@{t}ms(x{n})" for t,s,n in seq))
# flicker: LOADER sonra İÇERİK sonra tekrar LOADER
ss=[s for _,s,_ in seq]
fl=any(ss[i]=='LOADER' and ss[i+1]=='İÇERİK' and 'LOADER' in ss[i+2:] for i in range(len(ss)-2))
print('FLICKER (loader→içerik→loader):', 'EVET' if fl else 'hayır')
