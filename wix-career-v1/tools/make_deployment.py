# DEPLOYMENT.md üretici: tablo adresleri SERVER_URLS ile aynı kaynaktan. python3 make_deployment.py <PAGES_SHA>
import sys,os,importlib.util
P=sys.argv[1]
spec=importlib.util.spec_from_file_location('su',os.path.join(os.path.dirname(__file__),'make_server_urls.py'))
J='https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@'
src=open(os.path.join(os.path.dirname(__file__),'make_server_urls.py')).read()
ns={};exec(src.split("L=['# SERVER_URLS")[0].replace("P=sys.argv[1]","P=%r"%P),ns)
NEW,EX,LEG,LEGNEW,LEGOLD,CAREER=ns['NEW'],ns['EX'],ns['LEG'],ns['LEGNEW'],ns['LEGOLD'],ns['CAREER']
SEO={'/insan-kaynaklari':('İnsan Kaynakları | 1N Reklam ve Digital Media','1N Digital Media kariyer fırsatlarını keşfedin. Açık pozisyonlarımızı ve staj programlarımızı takip ederek yaratıcı dünyamıza adım atın.'),
 '/acik-pozisyonlar':('Açık Pozisyonlar | 1N Reklam ve Digital Media','1N Digital Media bünyesindeki güncel iş fırsatlarını ve açık pozisyonları takip edin. Yeni kariyer duyurularımızı keşfedin.'),
 '/staj-programlari':('Staj Programları | 1N Reklam ve Digital Media','1N Digital Media staj programlarına ilişkin güncel duyuruları ve gelecekteki staj fırsatlarını bu sayfadan takip edin.')}
KEEP={'n1-site-v1':'`assets-base`, `ronin-base`, `ronin-mobile-base`, `ronin-tier`, `hero-video`, `hero-poster`, `home-base`, `sticky-fix`, `debug` (tanımlı olanlar aynen)'}
L=['# DEPLOYMENT — Kariyer V1 Wix Studio kurulum belgesi (ana belge)','',
'> **Hiçbir adım canlıya uygulanmadı.** Wix\'te Save / Publish yapılmadı, PR birleştirilmedi. Bu belge sizin yapacağınız işlemleri en aza indirerek sıralar.','> Kopyalanabilir tam adresler: **SERVER_URLS.md** · SEO: **SEO_SETTINGS.md** · Geri dönüş: **ROLLBACK.md** · CDN: **CDN_VERIFICATION.md**','',
'## 0. Önce',
'1. Depo kökünde `bash wix-career-v1/wix-custom-code/verify-cdn-career.sh` → **TAMAM** olmalı (403 görürseniz 1–2 dk sonra tekrar).',
'2. Wix Studio → Site Geçmişi\'nde mevcut sürümü not edin (ek güvence).',
'3. Bütün işlemler **tek oturumda** yapılıp **tek bir Yayınla** ile canlıya alınır (Wix yayını site genelidir). Yarım kurulumda yayınlamayın: menü yeni sayfalara işaret eder.','',
'## 1. Yeni 3 sayfa',
'| Sayfa | URL | Yeni mi? | Tag Name | Server URL | Gerekli öznitelik | Korunacak öznitelik | SEO Title | Meta Description | Özel kod | Geri dönüş |','|---|---|---|---|---|---|---|---|---|---|---|']
for n,u,t in NEW:
    L.append('| %s | `%s` | **Yeni oluşturulacak** | `%s` | `%s` | yok | — (yeni) | `%s` | %s | Loader v13.1 sayfa seçimine ekle (§3) | Sayfayı yayından kaldır / menüyü geri al (ROLLBACK) |'%(n,u,t,CAREER,SEO[u][0],SEO[u][1]))
L+=['','**Wix Studio adımları (her yeni sayfa için):**',
'1. Sayfalar → **+ Sayfa Ekle** → boş sayfa. Sayfa adı: tablodaki ad.',
'2. Sayfa Ayarları → **SEO Temelleri** → URL slug: `insan-kaynaklari` / `acik-pozisyonlar` / `staj-programlari` (Türkçe karakter yok); SEO Title ve Meta Description: tablo (SEO_SETTINGS.md). Canonical alanı boş.',
'3. Sayfaya **Ekle → Embed Code → Custom Element** (mevcut Kısaca Biz sayfasındaki kurulumla aynı):',
'   - **Server URL** = tablodaki adres (üç sayfada aynı), **Tag Name** = tablodaki etiket.',
'   - Öğe genişliği **%100**, kenar boşlukları 0; öğe ve bölüm yüksekliği **Auto** (içerikten gelir). Sabit piksel yükseklik vermeyin.',
'4. Bu sayfalarda Wix\'in kendi Header/Footer\'ı ya da ayrı bir WhatsApp öğesi kullanılmaz; bileşen onaylı Header, Footer, WhatsApp ve Yukarı Çık\'ı kendisi getirir (diğer 1N sayfaları gibi). Site düzeyinde Wix header/footer bölümleri bu sayfalarda gizli olmalıdır (Kısaca Biz sayfasıyla aynı ayar).',
'5. Sayfa menüde (Wix site menüsü) gösterilmek zorunda değildir; menü 1N Header\'dadır.','',
'## 2. Menü nedeniyle Server URL\'i değişen mevcut sayfalar (11 dosya / 15 Custom Element)',
'Her satırda **yalnız Server URL** alanı değişir. Tag Name ve Wix\'te tanımlı tüm öznitelikler olduğu gibi kalır. Yeni dosyalarda değişen tek şey Header v13 + site işaretlemesi v15 adresleridir (MENU_UPDATE_REPORT §4); V1.4 mobil optimizasyonları, içerik, tasarım ve medya aynıdır.','',
'| Sayfa | URL | Tag Name (değişmez) | Yeni Server URL | Korunacak öznitelikler | Geri dönüş (bugün canlı) |','|---|---|---|---|---|---|']
for n,u,t,f,old in EX:
    L.append('| %s | `%s` | `%s` | `%s` | %s | `%s` |'%(n,u,t,J+P+'/wix-career-v1/sites/'+f,KEEP.get(t,'`deps-base`, `cta-href` ve tanımlı diğerleri (aynen)'),old))
for n,t in LEG:
    L.append('| %s | (Wix\'teki mevcut) | `%s` | `%s` | tanımlı olanlar (aynen) | `%s` |'%(n,t,LEGNEW,LEGOLD))
L+=['','## 3. Özel kod: Loader rotası',
'"Özel Yükleniyor % Script" girişini düzenleyin:',
'1. İçeriği tamamen silin → `wix-career-v1/wix-custom-code/LOADER-v13.1-ozel-yukleniyor.html` dosyasının **tamamını** yapıştırın. (V1.3 ile tek fark iki rota: `/insan-kaynaklari`, `/staj-programlari`; `/acik-pozisyonlar` zaten vardı. Başka hiçbir davranış değişmedi.)',
'2. Konum (Head) ve "her yeni sayfada yükle" aynı kalır. **Sayfa seçimine** İnsan Kaynakları, Açık Pozisyonlar ve Staj Programları sayfalarını ekleyin.',
'Menü Kapanış V1.3, test anahtarı, Google Ads / Meta Pixel / GTM / GA girişlerine **dokunmayın**.','',
'## 4. `/ekibimize-katil` → `/insan-kaynaklari` kalıcı 301 yönlendirmesi',
'Bu yönlendirmeyi kod yapamaz; Wix sunucusunda **URL Yönlendirme Yöneticisi** ile siz eklersiniz (gerçek HTTP 301):',
'1. Wix kontrol paneli (Dashboard) → **Ayarlar** → **SEO** (Pazarlama ve SEO → SEO Araçları) → **URL Yönlendirme Yöneticisi** (URL Redirect Manager).',
'2. **+ Yeni Yönlendirme** → Eski URL: `/ekibimize-katil` → Yeni URL: `/insan-kaynaklari` (sitenizdeki sayfa olarak seçin) → türü **301 (Kalıcı)** → Kaydet.',
'3. Not: `/ekibimize-katil` bugün canlıda **404** (yayında sayfa yok), bu yüzden yönlendirme doğrudan eklenebilir. Wix, yayındaki bir sayfanın adresini kaynak olarak kabul etmez. Editörde bu adresi kullanan gizli bir "Ekibimize Katıl" sayfası varsa **silmeyin**: önce o sayfanın URL slug\'ını `ekibimize-katil-arsiv` yapın (sayfa ve içeriği korunur), sonra yönlendirmeyi ekleyin.',
'4. Doğrulama (yayından sonra): `curl -I https://www.reklam1n.com/ekibimize-katil` → `301` ve `location: https://www.reklam1n.com/insan-kaynaklari`.','',
'## 5. Wix site menüsü (yalnız varsa)',
'Wix yerel sayfalar (Akademi, /1n, /iletisim vb.) 1N Header kullanmaz. Canlı taramada bu sayfalarda "Ekibimize Katıl" bağlantısı **bulunmadı** (`qa/native-scan.log`). Wix Editor → Site Menüsü\'nde gizli bir "Ekibimize Katıl" öğesi varsa kaldırın; yoksa işlem yok.','',
'## 6. Yayından sonra kontrol (5 dk)',
'1. Ana sayfa, bir hizmet sayfası ve Kısaca Biz\'de: MENU → İnsan Kaynakları yazısına tıkla → `/insan-kaynaklari`. Menüyü aç → İK satırındaki **KARİYER +** düğmesi → Açık Pozisyonlar / Staj Programları görünür; Ekibimize Katıl yok.',
'2. Telefonda aynısı (başlık sayfaya gider, düğme alt menüyü açar).',
'3. `/insan-kaynaklari` → iki kart; kartlar ilgili sayfalara gider; alt sayfalarda "İnsan Kaynaklarına Dön" çalışır.',
'4. Ana sayfada "Hikâyemizin Devamı" → `/kisaca-biz`; telefonda hizmet sayfalarında V1.4 kareleri (ör. E-Ticaret) yerinde.',
'5. `/ekibimize-katil` → `/insan-kaynaklari` (301).','',
'## 7. Ne değişmez',
'Ana sayfa tasarımı, Ronin/Samuray animasyonu ve video kaynakları; masaüstü tasarımları; hizmet sayfası içerikleri ve videoları; V1.4 mobil medya/kaynak optimizasyonları; Hikâyemizin Devamı → /kisaca-biz; Menü Kapanış V1.3 ve Loader V1.3 davranışı (yalnız iki rota eklendi); Intelligence, müşteri panelleri, takip kodları.']
open(os.path.join(os.path.dirname(__file__),'..','DEPLOYMENT.md'),'w').write('\n'.join(L)+'\n');print('ok')
