# PERFORMANCE_BEFORE_AFTER.md tabloları: qa/bytes/*.json (aktarım) + qa/net/*.json (video istekleri) + qa/mem (bellek, varsa)
import json,os
B=lambda m,p:{r['page']:r for r in json.load(open(f'qa/bytes/{m}-{p}.json'))}
NET=lambda b,m,p:{r['page']:r for r in json.load(open(f'qa/net/{b}-{m}-{p}.json'))} if os.path.exists(f'qa/net/{b}-{m}-{p}.json') else {}
MB=lambda x:(x or 0)/1048576
L=[]
for prof,ad in [('mobil','Mobil (iPhone benzetimi 390×844 @3, Chromium)'),('tablet_yatay','Tablet yatay (iPad benzetimi 1180×820 @2, dokunmatik, Chromium)'),('masaustu','Masaüstü 1440×900 @1 (Chromium)')]:
  a,b=B('live',prof),B('v14',prof);nl,nv=NET('chromium','live',prof),NET('chromium','v14',prof)
  L+=[f'### {ad}','','| Sayfa | Video istekleri önce→sonra | Video MB önce→sonra | Görsel MB önce→sonra | Toplam MB önce→sonra | Toplam fark | CLS önce→sonra | LCP ms önce→sonra |','|---|---|---|---|---|---|---|---|']
  ta=tb=0
  for p in a:
    x,y=a[p],b.get(p,{});ta+=x['total'];tb+=y.get('total',0)
    vr=f"{len(nl[p]['media'])}→{len(nv[p]['media'])}" if p in nl and p in nv else '–'
    d=MB(y.get('total',0))-MB(x['total'])
    L.append(f"| `{p}` | {vr} | {MB(x['byType'].get('Media')):.2f} → {MB(y['byType'].get('Media')):.2f} | {MB(x['byType'].get('Image')):.2f} → {MB(y['byType'].get('Image')):.2f} | {MB(x['total']):.2f} → {MB(y['total']):.2f} | {d:+.2f} ({100*d/MB(x['total']):+.0f}%) | {x.get('cls')} → {y.get('cls')} | {x.get('lcp')} → {y.get('lcp')} |")
  L+=[f"| **8 sayfa toplamı** | | | | **{MB(ta):.1f} → {MB(tb):.1f}** | **{MB(tb)-MB(ta):+.1f} MB ({100*(tb-ta)/ta:+.0f}%)** | | |",'']
open('qa/perf-tables.md','w').write('\n'.join(L));print('\n'.join(L))
