# SERVER_URLS.md üretici (yer tutucu yok; tüm adresler tam ve SHA sabit). python3 make_server_urls.py <PAGES_SHA>
import sys,os
P=sys.argv[1];J='https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@'
V14='36a24d3d5af5be5e5493598af4375f070a26b002';V12='39f762f63a2af58a470e9712d8ca0895d6f73f9f';M='f40415a3785e0172bdcc58189479253ff10cd17e'
NEW=[('İnsan Kaynakları','/insan-kaynaklari','n1-insan-kaynaklari-v1'),('Açık Pozisyonlar','/acik-pozisyonlar','n1-acik-pozisyonlar-v1'),('Staj Programları','/staj-programlari','n1-staj-programlari-v1')]
EX=[('Ana Sayfa','/','n1-site-v1','home/n1-site-wix-v660.js',J+V14+'/wix-mobile-performance-v14/home/n1-site-wix-v659.js'),
 ('Kreatif Prodüksiyon','/kreatif-produksiyon','n1-kreatif-produksiyon-v23','pages/wix-kreatif-produksiyon-v25/n1-kreatif-produksiyon-v25.js',J+V14+'/wix-mobile-performance-v14/pages/wix-kreatif-produksiyon-v24/n1-kreatif-produksiyon-v24.js'),
 ('E-Ticaret Yönetimi','/e-ticaret-yonetimi','n1-e-ticaret-yonetimi-v23','pages/wix-e-ticaret-yonetimi-v26/n1-e-ticaret-yonetimi-v26.js',J+V14+'/wix-mobile-performance-v14/pages/wix-e-ticaret-yonetimi-v25/n1-e-ticaret-yonetimi-v25.js'),
 ('Sosyal Medya','/sosyal-medya','n1-sosyal-medya-v27','pages/wix-sosyal-medya-v29/n1-sosyal-medya-v29.js',J+V14+'/wix-mobile-performance-v14/pages/wix-sosyal-medya-v28/n1-sosyal-medya-v28.js'),
 ('Reklam Yönetimi','/reklam-yonetimi','n1-reklam-yonetimi-v23','pages/wix-reklam-yonetimi-v25/n1-reklam-yonetimi-v25.js',J+V14+'/wix-mobile-performance-v14/pages/wix-reklam-yonetimi-v24/n1-reklam-yonetimi-v24.js'),
 ('UI/UX Tasarım','/ui-ux-tasarim','n1-uiux-tasarim-v28','pages/wix-uiux-tasarim-v31/n1-uiux-tasarim-v31.js',J+V14+'/wix-mobile-performance-v14/pages/wix-uiux-tasarim-v30/n1-uiux-tasarim-v30.js'),
 ('Yapay Zekâ','/yapay-zeka','n1-yapay-zeka-v2','pages/wix-yapay-zeka-v4/n1-yapay-zeka-v4.js',J+V14+'/wix-mobile-performance-v14/pages/wix-yapay-zeka-v3/n1-yapay-zeka-v3.js'),
 ('Uygulama Geliştirme','/uygulama-gelistirme','n1-uygulama-gelistirme-v2','pages/wix-uygulama-gelistirme-v4/n1-uygulama-gelistirme-v4.js',J+V14+'/wix-mobile-performance-v14/pages/wix-uygulama-gelistirme-v3/n1-uygulama-gelistirme-v3.js'),
 ('Kısaca Biz','/kisaca-biz','n1-kisaca-biz-v1','pages/wix-kisaca-biz-v2/n1-kisaca-biz-v2.js',J+V12+'/wix-global-menu-v12/pages/wix-kisaca-biz-v1/n1-kisaca-biz-v1.js'),
 ('Markalar','/markalar','n1-markalar-v11','pages/wix-markalar-v12/n1-markalar-v12.js',J+V12+'/wix-global-menu-v12/pages/wix-markalar-v1/n1-markalar-v11.js')]
LEG=[('Gizlilik Politikası','n1-gizlilik-politikasi-v1'),('KVKK Aydınlatma Metni','n1-kvkk-aydinlatma-v1'),('Çerez Politikası','n1-cerez-politikasi-v1'),('Kullanım Koşulları','n1-kullanim-kosullari-v1'),('Veri Sahibi Başvuru Formu','n1-veri-sahibi-basvuru-v1')]
LEGNEW=J+P+'/wix-career-v1/sites/pages/wix-yasal-sayfalar-v2/n1-yasal-sayfalar-v2.js';LEGOLD=J+V12+'/wix-global-menu-v12/pages/wix-yasal-sayfalar-v1/n1-yasal-sayfalar-v1.js'
CAREER=J+P+'/wix-career-v1/pages/n1-career-v1.js'
L=['# SERVER_URLS — Kariyer V1 Wix adresleri','','Tümü jsDelivr GitHub adresi, **commit SHA ile sabit** (dal adı / `@latest` yok). Wix\'te yalnız **Server URL** alanına yapıştırılır. **Tag Name ve mevcut öznitelikler değişmez** (yeni sayfalarda öznitelik gerekmez). CDN doğrulaması: CDN_VERIFICATION.md.','',
'## A. Yeni 3 sayfa (aynı Server URL, farklı Tag Name)','']
for n,u,t in NEW: L+=['### %s — `%s`'%(n,u),'- Tag Name: `%s`'%t,'- Server URL:','```',CAREER,'```','']
L+=['## B. Menü nedeniyle Server URL\'i değişen mevcut sayfalar','']
for n,u,t,f,old in EX: L+=['### %s — `%s`'%(n,u),'- Tag Name (değişmez): `%s`'%t,'- Yeni Server URL:','```',J+P+'/wix-career-v1/sites/'+f,'```','- Geri dönüş (bugün canlı):','```',old,'```','']
L+=['### Yasal sayfalar (5 sayfa, aynı dosya)','| Sayfa | Tag Name (değişmez) |','|---|---|']+['| %s | `%s` |'%x for x in LEG]+['','- Yeni Server URL (5 sayfanın hepsinde):','```',LEGNEW,'```','- Geri dönüş (bugün canlı):','```',LEGOLD,'```','',
'## C. Sayfaların kendiliğinden yüklediği ortak dosyalar (Wix\'e girilmez)','| Dosya | Adres |','|---|---|',
'| Header v13 (kariyer menüsü) | `%s%s/wix-career-v1/modules/n1-header-v13.js` |'%(J,M),'| Site işaretlemesi v15 (menü JSON, Footer, WhatsApp) | `%s%s/wix-career-v1/site/n1-site-markup-v15.js` |'%(J,M),'',
'## D. Özel kod (Custom Code)','| Giriş | Dosya | Not |','|---|---|---|','| "Özel Yükleniyor % Script" içeriği → v13.1 | `wix-career-v1/wix-custom-code/LOADER-v13.1-ozel-yukleniyor.html` | V1.3 + yalnız `/insan-kaynaklari`, `/staj-programlari` rotaları; sayfa seçimine 3 yeni sayfa eklenir. Geri dönüş: `wix-global-stability-v13/wix-custom-code/LOADER-v13-ozel-yukleniyor.html` |','',
'Değişmeyen özel kodlar: Menü Kapanış V1.3 (`@bb6ebc7…/n1-menu-close-v13.js`), test anahtarı, Google Ads / Meta Pixel / GTM / GA girişleri.']
open(os.path.join(os.path.dirname(__file__),'..','SERVER_URLS.md'),'w').write('\n'.join(L)+'\n');print('ok')
