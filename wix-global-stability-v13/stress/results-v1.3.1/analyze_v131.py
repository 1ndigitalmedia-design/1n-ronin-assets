# V1.3.1 ham verisinin düzeltilmiş analizi (ham dosyalar değiştirilmez). python3 analyze_v131.py > STRESS_V131_CORRECTED_DATA.txt
import csv,re,collections,json
R=list(csv.DictReader(open('n1-stres-1795813501641.csv',encoding='utf-8')))
V=['B','D','E','R2','R15','R1','RP'];P=['/kreatif-produksiyon','/e-ticaret-yonetimi','/sosyal-medya','/reklam-yonetimi','/ui-ux-tasarim','/yapay-zeka','/uygulama-gelistirme']
def idx(r): return V.index(r['v'])*14+P.index(r['p'])*2+(1 if r['m']=='e' else 0)
def nt_of(r):
    a=r['anomaly'];m=re.search(r'\((reload|navigate|back_forward|bfcache)\)',a)
    if m: return m.group(1)
    if 'geri dönüşte hizmet sayfası yeniden yüklendi' in a: return 'reload'
    m=re.search(r', (\w+)\)',a);return m.group(1) if m else ''
def cls(r):
    a=r['anomaly']
    if not a: return 'tamam'
    if 'OLASI' in a:
        nt=nt_of(r)
        if nt!='reload': return 'yanlış sınıflandırılmış gezinme ('+nt+') — çökme değil'
        if 'ana sayfada' in a: return 'belirsiz: ana sayfa yeniden yüklendi (Wix ATS / çökme / elle)'
        if 'geri dönüşte' in a: return 'çökme adayı: geri dönerken hizmet sayfası yeniden yüklendi'
        return 'çökme adayı: hizmet sayfası etkinken yeniden yüklendi'
    if a.startswith('beklenmeyen sayfa'): return 'test denetleyicisi: beklenmeyen sayfa'
    if a.startswith('geri dönüş ana'): return 'test denetleyicisi: geri ana sayfaya ulaşmadı'
    if a.startswith('gezinme 25'): return 'test denetleyicisi: eski zamanlayıcı zaman aşımı'
    return 'diğer'
out=[]
p=out.append
p('V1.3.1 FİZİKSEL iPHONE STRES TESTİ — DÜZELTİLMİŞ VERİ ANALİZİ (ham kayıtlar değiştirilmedi)')
p('Kaynak: n1-stres-1795813501641.csv (%d kayıt), n1-stres-1795813479512.md · %s → %s'%(len(R),R[0]['t'],R[-1]['t']))
p('')
p('1) HAM SAYIMLAR (raporda göründüğü gibi)')
C=collections.Counter('tamam' if not r['anomaly'] else ('OLASI ÇÖKME' if 'OLASI' in r['anomaly'] else 'diğer anomali') for r in R)
p('  toplam %d · tamam %d · OLASI ÇÖKME %d · diğer %d'%(len(R),C['tamam'],C['OLASI ÇÖKME'],C['diğer anomali']))
for v in V:
    S=[r for r in R if r['v']==v];c=collections.Counter('tamam' if not r['anomaly'] else ('OLASI ÇÖKME' if 'OLASI' in r['anomaly'] else 'diğer') for r in S)
    p('  %-3s kayıt %3d · tamam %3d · OLASI ÇÖKME %2d · diğer %2d'%(v,len(S),c['tamam'],c['OLASI ÇÖKME'],c['diğer']))
p('')
p('2) VERİ BÜTÜNLÜĞÜ')
key=collections.Counter((r['v'],r['r'],r['p'],r['m'],r['try']) for r in R)
dups=sum(n-1 for n in key.values() if n>1)
p('  plan: 7 varyant × 7 sayfa × 2 senaryo × 1 tekrar = 98 benzersiz adım')
p('  aynı (varyant, tekrar, sayfa, senaryo, deneme) birleşiminde fazladan kayıt: %d'%dups)
prev=-1;regs=[]
for k,r in enumerate(R):
    i=idx(r)
    if i<prev: regs.append((k,r['t'][11:19],prev,i))
    prev=i
p('  plan sırasında geriye düşüş (bir önceki kayıttan küçük adım): %d kez'%len(regs))
for k,t,a,b in regs[:25]: p('    kayıt %3d %s: adım %2d → %2d (%s → %s)'%(k,t,a,b,V[a//14],V[b//14]))
okSteps=set(idx(r) for r in R if not r['anomaly'])
p('  en az bir "tamam" kaydı olan benzersiz adım: %d/98'%len(okSteps))
p('  eksik adımlar: '+', '.join('%s %s %s'%(V[i//14],P[(i%14)//2][1:12],'erken' if i%2 else 'normal') for i in range(98) if i not in okSteps))
p('')
p('3) YENİDEN SINIFLANDIRMA (kayıt metnindeki gezinme türüne göre; belirsizler silinmedi)')
CC=collections.Counter(cls(r) for r in R)
for k,n in CC.most_common(): p('  %3d  %s'%(n,k))
p('  Not: Safari çökme sonrası yeniden yüklemesi gezinme türünü "reload" yapar. "navigate", "back_forward", "bfcache" türündeki 30 "OLASI ÇÖKME" kaydı çökme olamaz;')
p('       bunlar test denetleyicisinin eski belge zamanlayıcıları ve büyüyen geçmiş nedeniyle oluşan gezinmelerdir (STRESS_V132_REPORT.md §2).')
p('')
p('4) FİLTRELENMİŞ: benzersiz plan adımı bazında (her adım için kayıtlar birleştirildi)')
p('  varyant | adım | ≥1 tamam | çökme adayı olan adım (hizmet sayfası reload) | belirsiz ana sayfa reload olan adım | test denetleyicisi sorunu olan adım')
for v in V:
    ids=range(V.index(v)*14,V.index(v)*14+14)
    g=lambda f: len([i for i in ids if any(f(cls(r)) for r in R if idx(r)==i)])
    p('  %-3s | 14 | %2d | %2d | %2d | %2d'%(v,len([i for i in ids if i in okSteps]),g(lambda c:c.startswith('çökme adayı')),g(lambda c:c.startswith('belirsiz')),g(lambda c:c.startswith('test denetleyicisi') or c.startswith('yanlış'))))
p('')
p('5) ÇÖKME ADAYI KAYITLARI — sayfa dağılımı (yalnız "reload" türü hizmet sayfası kayıtları; ham sayıyla birlikte)')
raw=collections.Counter(r['p'] for r in R if 'OLASI' in r['anomaly'])
fil=collections.Counter(r['p'] for r in R if cls(r).startswith('çökme adayı'))
for pg in P: p('  %-22s ham OLASI ÇÖKME %2d · çökme adayı (reload) %2d'%(pg,raw[pg],fil[pg]))
p('')
p('6) VİDEO ÖLÇÜMÜNÜN GEÇERLİLİĞİ')
hero=collections.Counter((r['homeHero'],r['homeHeroRes'],r['homeHeroState']) for r in R if r['homeHero'])
for k,n in hero.most_common(): p('  %3d  ana sayfa Ronin: %s %s %s'%(n,*k))
p('  çözünürlüğü 0x0 olmayan kayıt: %d · ana sayfada oynayan video >0: %d · hizmet sayfasında oynayan video >0: %d'%(
  sum(1 for r in R if r['homeHeroRes'] and r['homeHeroRes']!='0x0'),sum(1 for r in R if r['homePlaying'] not in ('','0')),sum(1 for r in R if r['pagePlaying'] not in ('','0'))))
p('  SONUÇ: Ronin hiçbir ölçümde oynamadı (otomatik oynatma "blocked"). Ronin varyantları (2×/1,5×/1×/poster) arasında oynatma yükü karşılaştırması GEÇERSİZ.')
p('  B varyantında kayıtlı dosya 1× (ronin-m5-film.mp4): bu iPhone\'da (440×956@3) 2× seçilir; olası neden — 2× 9 sn içinde kare üretmeyince video modülü 1×\'e geçer (n1-video-m5-v13.js:284); oynatma engelliyken doğrulanamadı.')
p('')
p('7) GEÇERLİ ÖRNEKLEM')
p('  Varyant karşılaştırması için geçerli örneklem: YOK. Kayıt sayıları eşit değil (16–100), sıra karışık, video oynamadı, çökme sınıflandırması yarı yarıya yanlış.')
p('  Kullanılabilecek tek sinyal: "reload" türü hizmet sayfası yeniden yüklemeleri (çökme adayı) gerçekleşiyor — iPhone çökmesinin sürdüğünü destekler, nedenini göstermez.')
print('\n'.join(out))
