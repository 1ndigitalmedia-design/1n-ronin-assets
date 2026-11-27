import json,os,statistics as st
runs=[('WebKit koşu 1','long/webkit-live.json','long/webkit-v11.json',None),('WebKit koşu 2','long/webkit-live-r2.json','long/webkit-v11-r2.json','long/webkit-nofar-r2.json'),('Chromium','long/chromium-live-p.json','long/chromium-v11-p.json',None)]
out=[]
def P(s): out.append(s); print(s)
P('| Koşu | Varyant | Hizmet sayfası bekleme sonrası tamponlu / toplam video | Bırakılan | En büyük süreç ort. / maks. / son 15 ort. (MB) | Hatalı döngü / asılı kalma / çökme |')
P('|---|---|---|---|---|---|')
for name,*fs in runs:
    for lab,f in zip(['canlı','V1.1','V1.1 uzak-bırakma kapalı'],fs):
        if not f or not os.path.exists(f): continue
        D=json.load(open(f));R=D['rows']
        sv=[r for r in R if 'scrolled' in r['label'] and 'videos' in r]
        mp=[r['maxProcMB'] for r in R if r.get('maxProcMB')]
        hang=len(D.get('hangs') or [])
        P(f"| {name} | {lab} | {sum(r['videosBuffered'] for r in sv)} / {sum(r['videos'] for r in sv)} | {sum(r.get('videosReleased',0) for r in sv)} | {round(st.mean(mp))} / {max(mp)} / {round(st.mean(mp[-15:]))} | {len([r for r in R if 'ERROR' in r['label']])} / {hang} / {D.get('crashes')} |")
open('long/summary2.md','w').write('\n'.join(out))
