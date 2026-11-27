import json,os,statistics as st
P='v12/'
def load(f):
    return json.load(open(P+f)) if os.path.exists(P+f) else None
out=[]
def W(s): out.append(s); print(s)
W('| Motor | Senaryo | Ölçüm | Hatalı döngü / asılı / çökme | Geri dönüşte ATS reload | En büyük süreç ort. / maks. / son 15 ort. (MB) | Hizmet sayfası bekleme sonrası oynayan / tamponlu / toplam video | Header görünür |')
W('|---|---|---|---|---|---|---|---|')
for br,files in [('WebKit',['webkit-A.json','webkit-B.json','webkit-C.json']),('Chromium',['chromium-A-p.json','chromium-B-p.json','chromium-C-p.json'])]:
    for f in files:
        D=load(f)
        if not D: W(f'| {br} | {f} | sonuç yok |'); continue
        R=D['rows']; ok=[r for r in R if 'videos' in r]
        hb=[r for r in ok if 'home-after-back' in r['label']]
        ats=sum(1 for r in hb if r.get('nav')=='reload')
        mp=[r['maxProcMB'] for r in ok if r.get('maxProcMB')]
        sv=[r for r in ok if 'scrolled' in r['label']]
        hdr=sum(1 for r in ok if r.get('headerVisible')=='visible' and r.get('logoVisible')=='visible' and r.get('menuBtn')=='visible')
        sc=f.split('-')[1][0]
        W(f"| {br} | {sc} | {len(ok)} | {len([r for r in R if 'ERROR' in r['label']])} / {len(D.get('hangs') or [])} / {D.get('crashes')} | {ats}/{len(hb)} | {round(st.mean(mp))} / {max(mp)} / {round(st.mean(mp[-15:]))} | {sum(r['videosPlaying'] for r in sv)} / {sum(r['videosBuffered'] for r in sv)} / {sum(r['videos'] for r in sv)} | {hdr}/{len(ok)} |")
open('v12/summary.md','w').write('\n'.join(out))
