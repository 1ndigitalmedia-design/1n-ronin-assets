# TEST_REPORT.md + VISUAL_REGRESSION_REPORT.md — qa/test/*.json ve qa/visual-compare.json'dan üretilir
import json,glob,os
D=os.path.join(os.path.dirname(__file__),'..'); Q=os.path.join(D,'qa','test')
def L(p): return json.load(open(p))
W=[1920,1440,1024,820,440,390,375,320]
sh={(b,w):L(os.path.join(Q,'shell-%s-%d.json'%(b,w))) for b in ('chromium','webkit') for w in W}
pg={}
for f in glob.glob(os.path.join(Q,'pages-*.json')): j=L(f); pg[(j['br'],j['width'])]=j
ac={}
for f in glob.glob(os.path.join(Q,'active-*.json')):
    b,w=os.path.basename(f)[7:-5].split('-'); ac[(b,int(w))]=L(f)
tp=sum(j['pass'] for j in sh.values())+sum(j['pass'] for j in pg.values())+sum(j['pass'] for j in ac.values())
tf=sum(j['fail'] for j in sh.values())+sum(j['fail'] for j in pg.values())+sum(j['fail'] for j in ac.values())
o=['# TEST_REPORT — Global Shell V1 (Playwright Chromium + WebKit)','',
'> Bu sonuçlar Playwright testleridir. **WebKit iPhone Safari değildir.** Fiziksel cihaz ve Firefox testi yapılmadı, gerçek Wix yayınında doğrulama yapılmadı (WIX_COMPATIBILITY).','',
'**Toplam: %d kontrol geçti, %d kaldı.** Ham sonuçlar `qa/test/*.json` ve `*.log` dosyalarında. Testler: `tests/shell-test.js`, `tests/pages-test.js`, `tests/active-test.js`.'%(tp,tf),'',
'## Düzenek',
'- **Canlı site + yerel dosya:** testler canlı `www.reklam1n.com` sayfalarını açar; `tests/routeshell.js` canlıdaki Server URL isteklerini bu paketin yerel dosyalarına yönlendirir. Böylece Wix\'in gerçek DOM\'u, Wix bileşenleri ve yükleyici ortamında yeni dosyalar çalışır.',
'- **Bağımsız bileşenler:** `/iletisim`, `/reklam-ajansi` ve 404 adreslerinde `tests/shell-page.html` açılır. Bu sayfa Wix bölüm yapısını taklit eder: sticky header bölümü, `overflow:hidden` ve `transform`. İçinde İletişim HTML V4 (iframe), Wix Forms yer tutucusu, Header CE ve Footer CE vardır.',
'- **Profiller:** masaüstü 1920/1440 × 900; tablet 1024/820 × 1366 (dokunmatik, 2×); mobil 440/390/375 × 844 ve 320 × 568 (dokunmatik, 2×, iOS UA). Chromium\'da `isMobile` açıktır.','',
'## 1. Bağımsız Header/Footer (shell-test, 40–41 kontrol × 16 çalıştırma)',
'| Genişlik | Chromium | WebKit | Header yük. | Footer yük. (Chromium / WebKit) | Panel üst–alt (iç kaydırma) | Platform kutusu |','|---|---|---|---|---|---|---|']
for w in W:
    c,k=sh[('chromium',w)],sh[('webkit',w)]; m=c['meas']
    o.append('| %d | %d/%d | %d/%d | %s px | %s / %s px | %s–%s %s | %s px |'%(w,c['pass'],c['pass']+c['fail'],k['pass'],k['pass']+k['fail'],m['headerH'],m['footerH'],k['meas']['footerH'],m['panel']['top'],m['panel']['bottom'],'(kayar)' if m['panel']['scroll'] else '(sığıyor)',m['plat']))
o+=['','Her çalıştırmada doğrulanan kontroller:']
o+=['- '+r['n'] for r in sh[('chromium',1440)]['results'] if r['g'].startswith('S iletişim')]
o+=['- Akademi: menüde Akademi aktif · 404: aktif öğe yok · her senaryoda JS hatası yok','',
'## 2. Menünün mevcut sayfalardaki yeni sürümleri (pages-test)',
'Sayfalar: `/`, `/reklam-yonetimi`, `/kisaca-biz`, `/markalar`, `/gizlilik`, `/insan-kaynaklari`, `/staj-programlari`; ayrıca V1.4 koruma kontrolleri.','',
'| Motor / genişlik | Sonuç |','|---|---|']
for key in sorted(pg): j=pg[key]; o.append('| %s %d | %d/%d |'%(key[0],key[1],j['pass'],j['pass']+j['fail']))
o+=['','Kontroller (sayfa başına):']+['- '+n for n in sorted(set(r['n'] for j in pg.values() for r in j['results'] if not r['g'].startswith('V1.4')))]
o+=['','V1.4 koruma:']+['- '+n for n in sorted(set(r['n'] for j in pg.values() for r in j['results'] if r['g'].startswith('V1.4')))]
o+=['','## 3. Adres tabanlı aktif durum (active-test, gerçek adreslerde)','| Motor / genişlik | Sonuç |','|---|---|']
for key in sorted(ac): o.append('| %s %d | %d/%d |'%(key[0],key[1],ac[key]['pass'],ac[key]['pass']+ac[key]['fail']))
o+=['','| Adres | Vurgulanan satır | `aria-current` |','|---|---|---|']
for x in ac[('chromium',1440)]['out']: o.append('| `%s` | %s | %s |'%(x['path'],', '.join(x['c'].get('cur') or ['—']),', '.join(x['c'].get('aria') or ['—'])))
o+=['','## 4. Testte bulunan sorunlar ve düzeltmeler',
'| # | Bulgu | Kök neden | Sonuç |','|---|---|---|---|',
'| 1 | 820 px tablette platform kutuları 174 px\'e kadar büyüyordu | 4 sütun `1fr` | Kutu en fazla 96 px (`repeat(4,minmax(0,96px))`, `sizes="96px"`); header v14 @9bbcefd, bağımlılar @144d964 yeniden üretildi |',
'| 2 | Klavye testi odak ölçümünü panelden çıktıktan sonra yapıyordu | test adımı | ölçüm 4. Tab\'a alındı (ürün değişmedi) |',
'| 3 | Kariyer sayfalarında "Kısaca Biz" aktif görünüyordu | test düzeneği kariyer sayfalarını `/kisaca-biz` kabuğunda açıyor | kontrol gerçek adreslerde çalışan `active-test.js`\'e taşındı (8/8) |',
'| 4 | Mobil 390/320 px\'de Ronin 1× dosyası (beklenen 2×) | test beklentisi yanlış: V1.4 kuralı `film px × DPR > 840` → 390×2=780 doğal dosya; DPR 3\'te 2× | ölçümle doğrulandı (WebKit 390: DPR 2 → `ronin-m5-film.mp4`, DPR 3 → `ronin-m5-film-2x.mp4`; `qa/test/probe-art-ronin.json`); test kurala göre düzeltildi, ürün değişmedi |',
'| 5 | WebKit mobilde footer partner görseli yüklenmemiş ölçüldü | görsel `loading=lazy`; WebKit\'in tembel yükleme eşiği Chromium\'dan dar, test kaydırmadan ölçüyordu | footer\'a kaydırınca WebKit 320/390\'da yükleniyor (1080 px); test kullanıcı gibi kaydıracak şekilde düzeltildi |',
'| 6 | Birleşik İletişim görüntüsünde içerik 640 px\'te kesik | test sayfasındaki iframe sabit yükseklikteydi | test sayfası içerik yüksekliğine uyar; Wix\'te HTML Embed yüksekliği içeriğe göre verilmeli (DEPLOYMENT §6) |','',
'## 5. Doğrulanmayanlar',
'- Gerçek Wix yayını (panel katmanı, 404 sayfasında CE, footer yüksekliği, Wix Forms).',
'- Fiziksel iPhone/iPad/Android, Firefox.',
'- Dış bağlantıların hedef sayfaları (A7, ZEYP, Market, Hemen Tıkla): ortamdan erişim yok; yalnız href/target/rel.',
'- Performans (FPS/CLS) bu aşamada ölçülmedi; bileşenlerde video/canvas/WebGL/sürekli animasyon yok (kod incelemesi).']
open(os.path.join(D,'TEST_REPORT.md'),'w').write('\n'.join(o)+'\n')
# ---- görsel
v=L(os.path.join(D,'qa','visual-compare.json'))
o=['# VISUAL_REGRESSION_REPORT — görsel karşılaştırma (Chromium)','',
'Ekran görüntüleri: `screenshots/`. Ölçümler: `qa/visual-compare.json` (`tests/visuals.js`). Konum `[x, y, genişlik, yükseklik]` px.','',
'## 1. Menü: önce (bugün canlı V1.4) ↔ sonra',
'| Görünüm | Önce | Sonra |','|---|---|---|',
'| Masaüstü 1440 | `global-menu-masaustu-ONCE-canli.png` | `global-menu-masaustu.png` |','| Mobil 390 | `global-menu-mobil-ONCE-canli.png` | `global-menu-mobil.png` |',
'| İK alt menüsü | — | `global-menu-ik-alt-menu-masaustu.png`, `-mobil.png` |','| A7 + Platformlar | — | `a7-ve-platformlar-masaustu.png`, `-mobil.png` |','',
'Değişen: İletişim satırı (diğerleriyle aynı boyut), İK "KARİYER +" ve bağlantılı başlık, Ekibimize Katıl yok, A7 Prodüksiyon ve Uygulama ve Platformlar kartları. Değişmeyen: diğer satırların tasarımı, Başlangıca Dön kartı, renkler, yazı tipleri, MENU/CLOSE.','',
'## 2. Kurumsal header ↔ bağımsız header','| Profil | Ölçü | Kurumsal | Bağımsız |','|---|---|---|---|']
for p in ('masaustu','tablet','mobil'):
    a,b=v['header_'+p]['kurumsal'],v['header_'+p]['bagimsiz']
    for k in ('h','bar','logo','tag','tagFont','menu','cta'): o.append('| %s | %s | `%s` | `%s` |'%(p,k,a[k],b[k]))
o+=['','Sonuç: masaüstü ve mobilde birebir aynı (mobil 1 px fark kaydırma çubuğu/yuvarlamadan). Tablette bağımsız header **%90 içerik** kuralını uygular (kenar 41 px); kurumsal tablet header 24 px kenar boşluğu kullanır. Bu fark brief gereğidir. Bağımsız header\'da Teklif Al yok (kurumsal masaüstünde var).','',
'Görüntüler: `kurumsal-header-*.png` ↔ `bagimsiz-header-*.png`; menü açık: `bagimsiz-header-menu-*.png`.','',
'## 3. Kurumsal footer ↔ bağımsız footer','| Profil | Ölçü | Kurumsal | Bağımsız |','|---|---|---|---|']
for p in ('masaustu','tablet','mobil'):
    a,b=v['footer_'+p]['kurumsal'],v['footer_'+p]['bagimsiz']
    for k in ('h','brand','top','legal','art','copy'): o.append('| %s | %s | `%s` | `%s` |'%(p,k,a[k],b[k]))
o+=['','Sonuç: yükseklik, marka, üst blok, yasal blok, partner görseli ve copyright konumları/yazı tipleri **üç profilde aynı** (mobilde 1 px genişlik farkı yuvarlama). Görüntüler: `kurumsal-footer-*.png` ↔ `bagimsiz-footer-*.png`.','',
'## 4. Birleşik sayfalar (test sayfasında)','`birlesik-iletisim-{masaustu,tablet,mobil}.png`: Header CE → İletişim HTML V4 (değişmeden) → Wix Forms bölümü (yer tutucu) → Footer CE. `birlesik-akademi-*.png`, `birlesik-404-*.png`: içerik yer tutucusu + Header/Footer CE. Bölümler birbirine binmiyor; footer altında boşluk yok. **Gerçek Wix sayfaları değil**, Wix bölüm yapısının benzetimi.']
open(os.path.join(D,'VISUAL_REGRESSION_REPORT.md'),'w').write('\n'.join(o)+'\n'); print('ok',tp,tf)
