# SERVER_URLS.md, DEPLOYMENT.md, ROLLBACK.md — GLOBAL MENÜ V2.1 (tek kaynak tools/urls.py; yer tutucu yok). V2 üreticisi: make_docs_v2.py
import os,sys,json
sys.path.insert(0,os.path.dirname(__file__)); from urls import *
D=os.path.join(os.path.dirname(__file__),'..')
AB=json.load(open(os.path.join(D,'qa','v21','footer-ab-chromium.json')))
def fh(w): return AB[str(w)]['v21']['h']
STD=[('İletişim','/iletisim'),('Akademi','/reklam-ajansi'),('Error 404','error404')]
# ---------- SERVER_URLS ----------
L=['# SERVER_URLS — 1N Global Menü V2.1 (tek renkli kompakt platform logoları)','',
'Bütün adresler jsDelivr GitHub adresidir ve **commit SHA ile sabittir** (dal adı ya da `@latest` yok). Wix\'te yalnız **Server URL** alanı değişir. **Tag Name ve öznitelikler değişmez.**','',
'V2.1, Wix\'te uygulanan V2 adreslerinin (`@144d964`) yerine geçer. Fark yalnız menüdeki "Uygulama ve Platformlar" bölümünün görünümüdür (header v15). V2 adresleri geri dönüş olarak kalır (ROLLBACK.md).','',
'## A. Bağımsız Header / Footer / WhatsApp (tek Server URL, üç Tag Name)','','Yeni Server URL (dosya adı değişti: `n1-global-shell-v1-1.js`):','```',SHELL21,'```','',
'| Bileşen | Tag Name (değişmez) |','|---|---|','| Bağımsız Header | `%s` |'%TAGS['header'],'| Bağımsız Footer | `%s` |'%TAGS['footer'],'| WhatsApp / Yukarı Çık (isteğe bağlı) | `%s` |'%TAGS['floating'],'',
'Geri dönüş (V2):','```',SHELL2,'```','',
'## B. Kariyer sayfaları (aynı Server URL, farklı Tag Name)','','Yeni Server URL:','```',CAREER21,'```','',
'| Sayfa | URL | Tag Name (değişmez) |','|---|---|---|']+['| %s | `%s` | `%s` |'%(n,u,t) for n,u,t,_,_ in NEW]+['','Geri dönüş (V2):','```',CAREER2,'```','',
'## C. Mevcut sayfalar','']
for n,u,t,new,cur,old,keep in EX21: L+=['### %s — `%s` · Tag Name `%s`'%(n,u,t),'Yeni Server URL (V2.1):','```',new,'```','Geri dönüş (V2, Wix\'te şu an girili):','```',cur,'```','']
L+=['### Yasal sayfalar (5 sayfa, aynı dosya)','| Sayfa | Tag Name (değişmez) |','|---|---|']+['| %s | `%s` |'%x for x in LEG]+['','Yeni Server URL (5 sayfada):','```',LEG21,'```','Geri dönüş (V2):','```',LEG2,'```','',
'## D. Bileşenlerin kendiliğinden yüklediği ortak dosyalar (Wix\'e girilmez)','| Dosya | Adres |','|---|---|',
'| Header v15 (Global Menü V2.1) | `%s%s/wix-global-shell-v1/modules/n1-header-v15.js` |'%(J,H15),'| Site işaretlemesi v16 (menü verisi, footer, WhatsApp; **değişmedi**) | `%s%s/wix-global-shell-v1/site/n1-site-markup-v16.js` |'%(J,M),
'| Tek renkli logo SVG\'leri (header v15\'e gömülü; ayrıca dosya olarak) | `%s%s/wix-global-shell-v1/assets/platforms/mono/` |'%(J,H15),'',
'## E. Özel kod','Değişiklik yok. Loader v13.1, Menü Kapanış V1.3, GA/GTM/Meta Pixel/Google Ads girişleri ve müşteri panellerindeki "Sayfa Yükleniyor Script" girişi aynı kalır.']
open(os.path.join(D,'SERVER_URLS.md'),'w').write('\n'.join(L)+'\n')
# ---------- DEPLOYMENT ----------
L=['# DEPLOYMENT — Global Menü V2.1: Wix Studio güncellemesi (ana belge)','',
'> **Hiçbir adım canlıya uygulanmadı** (Wix Save / Publish yok, PR birleştirilmedi). Adresler: **SERVER_URLS.md** · Geri dönüş: **ROLLBACK.md** · Rapor: **PLATFORM_REVISION_V21.md**.','',
'## 0. Önce',
'1. Depo kökünde `bash wix-global-shell-v1/wix-custom-code/verify-cdn-v21.sh` komutunu çalıştırın; sonuç **TAMAM** olmalı (25 adres).',
'2. Bütün satırlar tek oturumda değiştirilir ve **tek Yayınla** ile canlıya alınır. Yarım kalırsa sayfaların bir kısmı eski (renkli) logoları gösterir. Bu bir hata üretmez, yalnız görünüm tutarsız kalır.','',
'## 1. Merkezi güncelleme mümkün mü?',
'**Hayır, güvenli bir yolu yok.** Her sayfanın Server URL\'si sabit SHA\'lı bir dosyayı yükler. O dosya da header\'ı ve logo stilini yine sabit SHA ile yükler. jsDelivr\'da sabit SHA\'lı bir adresin içeriği değişmez; merkezi bir değişiklik ancak şu yollardan biriyle yapılabilirdi:',
'- dal ya da `@latest` adresi,',
'- değişebilen bir yapılandırma dosyası,',
'- genel Wix Özel Kodu,',
'- sayfaya sonradan DOM müdahalesi.',
'',
'Bunların hepsi talimatla yasak ve header yükleme yarışı ya da sürüm güvenliği riski taşıyor. Bu yüzden mevcut mimari korundu ve aşağıdaki satırların Server URL\'si değişir. Ayrıntı: PLATFORM_REVISION_V21 §4.','',
'## 2. Değiştirilecek Server URL\'lerinin tamamı (tek tablo)',
'Yalnız **Server URL** alanı değişir. **Tag Name ve Wix\'te tanımlı öznitelikler aynen kalır.** Bütün dosyalarda değişen tek şey header adresidir (v14 → v15).','',
'| # | Sayfa | URL | Tag Name (değişmez) | Yeni Server URL (V2.1) | Şu anki Server URL (V2) = geri dönüş | Korunacak öznitelikler |','|---|---|---|---|---|---|---|']
i=0
for n,u,t,new,cur,old,keep in EX21: i+=1; L.append('| %d | %s | `%s` | `%s` | `%s` | `%s` | %s |'%(i,n,u,t,new,cur,keep or DEFKEEP))
for n,t in LEG: i+=1; L.append('| %d | %s | (mevcut) | `%s` | `%s` | `%s` | tanımlı olanlar (aynen) |'%(i,n,t,LEG21,LEG2))
for n,u,t,_,_ in NEW: i+=1; L.append('| %d | %s | `%s` | `%s` | `%s` | `%s` | yok |'%(i,n,u,t,CAREER21,CAREER2))
for n,u in STD:
    for k in ('header','footer','floating'): i+=1; L.append('| %d | %s (yalnız bağımsız bileşen kurulduysa) | `%s` | `%s` | `%s` | `%s` | yok |'%(i,n,u,TAGS[k],SHELL21,SHELL2))
L+=['','Satır 1–18, uyguladığınız 18 sayfadır (ana sayfa, 7 hizmet, Kısaca Biz, Markalar, 5 yasal, 3 kariyer). İletişim, Akademi ve 404\'e bağımsız Header/Footer/WhatsApp eklediyseniz, o öğelerin Server URL\'si de aynı yeni pakete geçer; eklemediyseniz §3\'teki kurulumda doğrudan yeni adresi kullanın.','',
'## 3. Bağımsız HEADER — `%s`'%TAGS['header'],
'| Ayar | Değer |','|---|---|','| Server URL | `%s` |'%SHELL21,'| Tag Name | `%s` |'%TAGS['header'],'| Gerekli öznitelik | yok |',
'| Masaüstü (> 1024 px) | genişlik %100, yükseklik **88 px** |','| Tablet (768–1024 px) | genişlik %100, yükseklik **72 px** |','| Mobil (≤ 767 px) | genişlik %100, yükseklik **64 px** |',
'| Wix yerleşimi | sayfanın en üst bölümü, tam genişlik, iç ve dış boşluk 0; içerik genişliği (%90) bileşenin içinde |','| Sabitleme | isteğe bağlı (Wix "Freeze"); bileşen kendisi `position:fixed` kullanmaz |','| Overflow / katman | ek ayar yok; menü paneli `document.body`\'de açılır (z-index 99990) |',
'| Not | Editör ve Önizleme\'de Custom Element iframe içinde çizilir; menü kutuya sıkışmış görünebilir. Menüyü yayınlanmış sitede kontrol edin. |','',
'## 4. Bağımsız FOOTER — `%s` (V2 ile birebir aynı)'%TAGS['footer'],
'| Ayar | Değer |','|---|---|','| Server URL | `%s` |'%SHELL21,'| Tag Name | `%s` |'%TAGS['footer'],
'| Masaüstü 1920 / 1440 px | genişlik %%100 · **%s / %s px** |'%(fh(1920),fh(1440)),'| Tablet 1024 / 820 px | genişlik %%100 · **%s / %s px** |'%(fh(1024),fh(820)),'| Mobil 390 / 375 / 320 px | genişlik %%100 · **%s / %s / %s px** |'%(fh(390),fh(375),fh(320)),
'| Wix yerleşimi | son bölüm; iç ve dış boşluk 0; öğe yüksekliği **Auto** (önerilen); Wix footer\'ı gizli |','',
'> **Düzeltme:** V2 belgesindeki tablet/mobil footer yükseklikleri (1024: 718, 820: 784, 375: 844 px), tablet/mobil partner görseli tembel yüklenmeden ölçülmüştü. Yukarıdaki değerler görsel yüklendikten sonraki ölçümdür. V2 ve V2.1 footer\'ı aynı koşulda birebir aynı çıktı (`qa/v21/footer-ab-*.json`). Yükseklik **Auto** kullanıyorsanız işlem gerekmez; elle yükseklik girdiyseniz bu değerleri kullanın.','',
'## 5. WhatsApp / Yukarı Çık (isteğe bağlı) — `%s`'%TAGS['floating'],'Aynı Server URL (`%s`). Davranış değişmedi.'%SHELL21,'',
'## 6. Sayfa kurulum sıraları (değişmedi)',
'- **İletişim `/iletisim`:** Wix header/footer gizli → Bölüm 1 Header CE → Bölüm 2 İletişim HTML V4 (değişmez; HTML Embed yüksekliği içeriğe göre) → Bölüm 3 Wix Forms → Bölüm 4 Footer CE (+ isteğe bağlı WhatsApp).',
'- **Akademi `/reklam-ajansi`:** içerik değişmez. En üste Header CE, en alta Footer CE. Menüde Akademi aktif görünür.',
'- **Error 404 (slug `error404`):** en üste Header CE, en alta Footer CE. Durum kodu Wix\'te kalır, yönlendirme yok. Yayından sonra bilinmeyen bir adresle kontrol edin; CE görünmezse Wix header/footer\'ını geri açın.','',
'## 7. Kariyer sayfaları (canlı tespit, 28 Kasım 2026)',
'`/insan-kaynaklari` ve `/staj-programlari` daha önce yayında "Veri Sahibi Başvuru Formu" gösteriyordu. Kariyer Server URL\'sini ve Tag Name\'ini uyguladıysanız bu sorun giderilmiştir; V2.1\'de yalnız Server URL `n1-career-v3.js` olur. SEO ayarları ve 301 kuralı değişmez.','',
'## 8. Özel kod',
'Değişiklik yok. Loader v13.1 aynen kalır.','',
'## 9. Yayından sonra 2 dakikalık kontrol',
'1. Kurumsal bir sayfada MENU\'yü açın. "Uygulama ve Platformlar" bölümünde 4 küçük koyu kutu, tek renkli gri logolar olmalı. Masaüstünde fareyle üzerine gelince logo yeşile döner.',
'2. Telefonda: 4 logo tek satırda; dokununca doğru siteye gider (ZEYP, Market, Hemen Tıkla yeni sekmede; Intelligence aynı sekmede).',
'3. İletişim / Akademi / 404\'te bağımsız header menüsünde aynı görünüm olmalı; footer değişmemiş olmalı.']
open(os.path.join(D,'DEPLOYMENT.md'),'w').write('\n'.join(L)+'\n')
# ---------- ROLLBACK ----------
L=['# ROLLBACK — Global Menü V2.1 geri dönüşü','',
'Her satır bağımsızdır: Wix Studio → sayfa → Custom Element → Server URL alanına aşağıdaki adresi girin → Yayınla. Tag Name ve öznitelikler zaten değişmedi.','',
'## 1. V2.1 → V2 (renkli logolar; Wix\'e daha önce girdiğiniz adresler)','| Sayfa | Tag | Geri dönüş Server URL (V2) |','|---|---|---|']
for n,u,t,new,cur,old,keep in EX21: L.append('| %s | `%s` | `%s` |'%(n,t,cur))
L+=['| Yasal 5 sayfa | (5 etiket) | `%s` |'%LEG2,'| Kariyer 3 sayfa | (3 etiket) | `%s` |'%CAREER2,'| Bağımsız Header/Footer/WhatsApp | (3 etiket) | `%s` |'%SHELL2,'',
'Sürüm karışırsa (bazı sayfalar V2, bazıları V2.1) sayfalar çalışmaya devam eder; yalnız platform logolarının görünümü sayfadan sayfaya farklı olur.','',
'## 2. V2 → V2.4 öncesi (Global Menü V2 hiç uygulanmamış hâl: V1.4 canlı adresleri)','| Sayfa | Tag | Server URL (V1.4 / V1.2) |','|---|---|---|']
for n,u,t,new,cur,old,keep in EX21: L.append('| %s | `%s` | `%s` |'%(n,t,old))
L+=['| Yasal 5 sayfa | (5 etiket) | `%s` |'%LEGOLD,'','Bu seviyede kariyer sayfalarını yayından kaldırın ve bağımsız bileşenleri silip Wix header/footer\'ını geri açın (V2 geri dönüş adımları: `make_docs_v2.py` çıktısı, git geçmişinde `ROLLBACK.md` @7486d81).','',
'## 3. Önceki paketler (silinmedi)','Kariyer V1: `wix-career-v1/ROLLBACK.md` · V1.4: `wix-mobile-performance-v14/ROLLBACK.md` · V1.3: `wix-global-stability-v13/ROLLBACK.md` · tam kurtarma: `sitewide-mobile-fix-20261126` @ `f97db8e`.','',
'## 4. Git','Dal `claude/happy-sagan-l6tbsc`. V2.1 yeni dosyalar ekledi (header v15, paket v1.1, kariyer v3, 11 sayfa sürümü, `assets/platforms/mono/`). V2 dosyaları ve özgün renkli logolar silinmedi; force push yok.']
s='\n'.join(L)+'\n'; s=s.replace('V2 → V2.4 öncesi','V2 → V2 öncesi'); open(os.path.join(D,'ROLLBACK.md'),'w').write(s); print('ok')
