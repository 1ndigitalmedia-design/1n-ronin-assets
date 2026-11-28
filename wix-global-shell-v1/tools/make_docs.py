# SERVER_URLS.md, DEPLOYMENT.md, ROLLBACK.md — GLOBAL MENÜ V2.2. Tek kaynak tools/urls.py. Önceki üreticiler: make_docs_v21.py, make_docs_v2.py
import os,sys,json
sys.path.insert(0,os.path.dirname(__file__)); from urls import *
D=os.path.join(os.path.dirname(__file__),'..')
AB=json.load(open(os.path.join(D,'qa','v21','footer-ab-chromium.json')))
def fh(w): return AB[str(w)]['v21']['h']
STD=[('İletişim','/iletisim'),('Akademi','/reklam-ajansi'),('Error 404','error404')]
cb=lambda u:['```',u,'```']
# ---------- SERVER_URLS ----------
L=['# SERVER_URLS — 1N Global Menü V2.2','',
'Menünün alt bölümünde "Uygulama ve Platformlar" kartı kaldırıldı; yerine A7 Prodüksiyon kartıyla aynı tasarımda **1N Intelligence** kartı geldi. Kartlar: Başlangıca Dön · A7 Prodüksiyon · 1N Intelligence.','',
'- Bütün adresler jsDelivr GitHub adresidir ve **commit SHA ile sabittir** (dal adı ya da `@latest` yok).',
'- Wix\'te yalnız **Server URL** alanı değişir. **Tag Name ve öznitelikler değişmez.**',
'- V2.2, canlıdaki V2.1 adreslerinin (`@f661795`) yerine geçer. V2.1 adresleri geri dönüş olarak kalır.','',
'## A. Bağımsız Header / Footer / WhatsApp (tek Server URL, üç Tag Name)','','Yeni Server URL (dosya adı: `n1-global-shell-v1-2.js`):']+cb(SHELL22)+['',
'| Bileşen | Tag Name (değişmez) |','|---|---|','| Bağımsız Header | `%s` |'%TAGS['header'],'| Bağımsız Footer | `%s` |'%TAGS['footer'],'| WhatsApp / Yukarı Çık (isteğe bağlı) | `%s` |'%TAGS['floating'],'',
'Footer ve WhatsApp kodu değişmedi: paket V2.1\'e göre yalnız sürüm numarası ve header/menü verisi adreslerinde farklı. Footer v646/v636 ve WhatsApp v632 modülleri aynı adreslerden (`@d24fa37`) yüklenir.','','Geri dönüş (V2.1):']+cb(SHELL21)+['',
'## B. Kariyer sayfaları (aynı Server URL, farklı Tag Name)','','Yeni Server URL:']+cb(CAREER22)+['',
'| Sayfa | URL | Tag Name (değişmez) |','|---|---|---|']+['| %s | `%s` | `%s` |'%(n,u,t) for n,u,t,_,_ in NEW]+['','Geri dönüş (V2.1):']+cb(CAREER21)+['','## C. Mevcut sayfalar','']
for n,u,t,new,cur,keep in EX22: L+=['### %s — `%s` · Tag Name `%s`'%(n,u,t),'Yeni Server URL (V2.2):']+cb(new)+['Geri dönüş (V2.1, şu an canlı):']+cb(cur)+['']
L+=['### Yasal sayfalar (5 sayfa, aynı dosya)','| Sayfa | Tag Name (değişmez) |','|---|---|']+['| %s | `%s` |'%x for x in LEG]+['','Yeni Server URL (5 sayfada):']+cb(LEG22)+['Geri dönüş (V2.1):']+cb(LEG21)+['',
'## D. Bileşenlerin kendiliğinden yüklediği ortak dosyalar (Wix\'e girilmez)','| Dosya | Adres |','|---|---|',
'| Header v16 (Global Menü V2.2) | `%s%s/wix-global-shell-v1/modules/n1-header-v16.js` |'%(J,C22),'| Menü verisi v17 (Intelligence kartı; footer ve WhatsApp işaretlemesi aynı) | `%s%s/wix-global-shell-v1/site/n1-site-markup-v17.js` |'%(J,C22),'',
'## E. Özel kod','Değişiklik yok. Loader v13.1, Menü Kapanış V1.3, GA/GTM/Meta Pixel/Google Ads girişleri ve müşteri panellerindeki "Sayfa Yükleniyor Script" girişi aynı kalır.']
open(os.path.join(D,'SERVER_URLS.md'),'w').write('\n'.join(L)+'\n')
# ---------- DEPLOYMENT ----------
L=['# DEPLOYMENT — Global Menü V2.2: Wix Studio güncellemesi (ana belge)','',
'> **Hiçbir adım canlıya uygulanmadı** (Wix Save / Publish yok, PR birleştirilmedi). Adresler: **SERVER_URLS.md** · Geri dönüş: **ROLLBACK.md** · Rapor: **GLOBAL_MENU_V22.md**.','',
'## 0. Önce',
'1. Depo kökünde `bash wix-global-shell-v1/wix-custom-code/verify-cdn-v22.sh` komutunu çalıştırın; sonuç **TAMAM** olmalı (21 adres).',
'2. Bütün satırlar tek oturumda değiştirilir ve **tek Yayınla** ile canlıya alınır. Yarım kalırsa bazı sayfalar eski platform kartını gösterir; hata oluşmaz.','',
'## 1. Merkezi güncelleme',
'Sabit SHA mimarisinde güvenli bir merkezi yol yok (V2.1 raporu §4\'teki inceleme geçerli). Mevcut mimari korundu; aşağıdaki Server URL\'leri değişir.','',
'## 2. Değiştirilecek Server URL\'lerinin tamamı (tek tablo)',
'Yalnız **Server URL** alanı değişir. **Tag Name ve Wix\'te tanımlı öznitelikler aynen kalır.** Bütün dosyalarda değişen tek şey header (v15 → v16) ve menü verisi (v16 → v17) adresleridir.','',
'| # | Sayfa | URL | Tag Name (değişmez) | Yeni Server URL (V2.2) | Şu anki Server URL (V2.1) = geri dönüş | Korunacak öznitelikler |','|---|---|---|---|---|---|---|']
i=0
for n,u,t,new,cur,keep in EX22: i+=1; L.append('| %d | %s | `%s` | `%s` | `%s` | `%s` | %s |'%(i,n,u,t,new,cur,keep or DEFKEEP))
for n,t in LEG: i+=1; L.append('| %d | %s | (mevcut) | `%s` | `%s` | `%s` | tanımlı olanlar (aynen) |'%(i,n,t,LEG22,LEG21))
for n,u,t,_,_ in NEW: i+=1; L.append('| %d | %s | `%s` | `%s` | `%s` | `%s` | yok |'%(i,n,u,t,CAREER22,CAREER21))
for n,u in STD:
    for k in ('header','footer','floating'): i+=1; L.append('| %d | %s (bağımsız bileşen) | `%s` | `%s` | `%s` | `%s` | yok |'%(i,n,u,TAGS[k],SHELL22,SHELL21))
L+=['',
'- Satır 1–18: ana sayfa, 7 hizmet, Kısaca Biz, Markalar, 5 yasal ve 3 kariyer sayfası.',
'- Satır 19–27: İletişim, Akademi ve 404\'teki bağımsız Header/Footer/WhatsApp öğeleri. Üçü aynı yeni Server URL\'yi kullanır; yalnız sayfada bulunan öğeleri değiştirin.','',
'## 3. Bağımsız Header / Footer / WhatsApp',
'Ölçüler ve Wix ayarları değişmedi:',
'- **Header:** genişlik %100; yükseklik 88 / 72 / 64 px (masaüstü / tablet / mobil); tam genişlik bölüm.',
'- **Footer:** genişlik %%100; yükseklik Auto. Ölçülen değerler: 1920: %s, 1440: %s, 1024: %s, 820: %s, 390: %s, 375: %s, 320: %s px.'%(fh(1920),fh(1440),fh(1024),fh(820),fh(390),fh(375),fh(320)),
'- **WhatsApp:** davranış aynı.','',
'Editör ve Önizleme\'de menü iframe içinde kırpılmış görünebilir; yayınlanmış sitede kontrol edin.','',
'## 4. Özel kod, SEO, 301','Değişiklik yok. Loader v13.1, SEO ayarları ve `/ekibimize-katil` → `/insan-kaynaklari` 301 kuralı aynen kalır.','',
'## 5. Yayından sonra 1 dakikalık kontrol',
'1. Kurumsal bir sayfada MENU\'yü açın. Alt bölümde yalnız üç kart olmalı: **1N Digital Media — Başlangıca Dön**, **A7 Prodüksiyon**, **1N Intelligence (DİJİTAL ZEKA PLATFORMU)**. Logo kutuları olmamalı.',
'2. 1N Intelligence kartına dokunun: aynı sekmede `/intelligence` açılmalı.',
'3. İletişim, Akademi ve 404\'te bağımsız header menüsünde aynı üç kart olmalı; footer ve WhatsApp aynı kalmalı.']
open(os.path.join(D,'DEPLOYMENT.md'),'w').write('\n'.join(L)+'\n')
# ---------- ROLLBACK ----------
L=['# ROLLBACK — Global Menü V2.2 geri dönüşü','',
'Her satır bağımsızdır: Wix Studio → sayfa → Custom Element → Server URL alanına aşağıdaki adresi girin → Yayınla. Tag Name ve öznitelikler değişmedi.','',
'## 1. V2.2 → V2.1 (tek renkli platform logoları; bugün canlı olan adresler)','| Sayfa | Tag | Geri dönüş Server URL (V2.1) |','|---|---|---|']
for n,u,t,new,cur,keep in EX22: L.append('| %s | `%s` | `%s` |'%(n,t,cur))
L+=['| Yasal 5 sayfa | (5 etiket) | `%s` |'%LEG21,'| Kariyer 3 sayfa | (3 etiket) | `%s` |'%CAREER21,'| Bağımsız Header/Footer/WhatsApp | (3 etiket) | `%s` |'%SHELL21,'',
'Sürümler karışırsa (bazı sayfalar V2.1, bazıları V2.2) sayfalar çalışmaya devam eder; yalnız menünün son kartı sayfadan sayfaya farklı görünür.','',
'## 2. Daha eski sürümler',
'- **V2.1 → V2 (renkli logolar):** `make_docs_v21.py` çıktısı; git geçmişinde `ROLLBACK.md` @224531b.',
'- **V2 → V1.4:** git geçmişinde `ROLLBACK.md` @7486d81.',
'- Önceki paketler silinmedi: `wix-career-v1/ROLLBACK.md` · `wix-mobile-performance-v14/ROLLBACK.md` · `wix-global-stability-v13/ROLLBACK.md` · tam kurtarma: `sitewide-mobile-fix-20261126` @ `f97db8e`.','',
'## 3. Git','Dal `claude/happy-sagan-l6tbsc`. V2.2 yalnız yeni dosyalar ekledi: header v16, menü verisi v17, paket v1.2, kariyer v4 ve 11 sayfa sürümü. V2.1 ve V2 dosyaları ile özgün renkli ve tek renkli logo dosyaları (`assets/platforms/`, `assets/platforms/mono/`) silinmedi. Force push yapılmadı.']
open(os.path.join(D,'ROLLBACK.md'),'w').write('\n'.join(L)+'\n'); print('ok')
