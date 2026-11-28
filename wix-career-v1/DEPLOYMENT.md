# DEPLOYMENT — Kariyer V1 Wix Studio kurulum belgesi (ana belge)

> **Hiçbir adım canlıya uygulanmadı.** Wix'te Save / Publish yapılmadı, PR birleştirilmedi. Bu belge sizin yapacağınız işlemleri en aza indirerek sıralar.
> Kopyalanabilir tam adresler: **SERVER_URLS.md** · SEO: **SEO_SETTINGS.md** · Geri dönüş: **ROLLBACK.md** · CDN: **CDN_VERIFICATION.md**

## 0. Önce
1. Depo kökünde `bash wix-career-v1/wix-custom-code/verify-cdn-career.sh` → **TAMAM** olmalı (403 görürseniz 1–2 dk sonra tekrar).
2. Wix Studio → Site Geçmişi'nde mevcut sürümü not edin (ek güvence).
3. Bütün işlemler **tek oturumda** yapılıp **tek bir Yayınla** ile canlıya alınır (Wix yayını site genelidir). Yarım kurulumda yayınlamayın: menü yeni sayfalara işaret eder.

## 1. Yeni 3 sayfa
| Sayfa | URL | Yeni mi? | Tag Name | Server URL | Gerekli öznitelik | Korunacak öznitelik | SEO Title | Meta Description | Özel kod | Geri dönüş |
|---|---|---|---|---|---|---|---|---|---|---|
| İnsan Kaynakları | `/insan-kaynaklari` | **Yeni oluşturulacak** | `n1-insan-kaynaklari-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@2aa9a9b483e53be78aebcd67f5af54e5ba485f90/wix-career-v1/pages/n1-career-v1.js` | yok | — (yeni) | `İnsan Kaynakları | 1N Reklam ve Digital Media` | 1N Digital Media kariyer fırsatlarını keşfedin. Açık pozisyonlarımızı ve staj programlarımızı takip ederek yaratıcı dünyamıza adım atın. | Loader v13.1 sayfa seçimine ekle (§3) | Sayfayı yayından kaldır / menüyü geri al (ROLLBACK) |
| Açık Pozisyonlar | `/acik-pozisyonlar` | **Yeni oluşturulacak** | `n1-acik-pozisyonlar-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@2aa9a9b483e53be78aebcd67f5af54e5ba485f90/wix-career-v1/pages/n1-career-v1.js` | yok | — (yeni) | `Açık Pozisyonlar | 1N Reklam ve Digital Media` | 1N Digital Media bünyesindeki güncel iş fırsatlarını ve açık pozisyonları takip edin. Yeni kariyer duyurularımızı keşfedin. | Loader v13.1 sayfa seçimine ekle (§3) | Sayfayı yayından kaldır / menüyü geri al (ROLLBACK) |
| Staj Programları | `/staj-programlari` | **Yeni oluşturulacak** | `n1-staj-programlari-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@2aa9a9b483e53be78aebcd67f5af54e5ba485f90/wix-career-v1/pages/n1-career-v1.js` | yok | — (yeni) | `Staj Programları | 1N Reklam ve Digital Media` | 1N Digital Media staj programlarına ilişkin güncel duyuruları ve gelecekteki staj fırsatlarını bu sayfadan takip edin. | Loader v13.1 sayfa seçimine ekle (§3) | Sayfayı yayından kaldır / menüyü geri al (ROLLBACK) |

**Wix Studio adımları (her yeni sayfa için):**
1. Sayfalar → **+ Sayfa Ekle** → boş sayfa. Sayfa adı: tablodaki ad.
2. Sayfa Ayarları → **SEO Temelleri** → URL slug: `insan-kaynaklari` / `acik-pozisyonlar` / `staj-programlari` (Türkçe karakter yok); SEO Title ve Meta Description: tablo (SEO_SETTINGS.md). Canonical alanı boş.
3. Sayfaya **Ekle → Embed Code → Custom Element** (mevcut Kısaca Biz sayfasındaki kurulumla aynı):
   - **Server URL** = tablodaki adres (üç sayfada aynı), **Tag Name** = tablodaki etiket.
   - Öğe genişliği **%100**, kenar boşlukları 0; öğe ve bölüm yüksekliği **Auto** (içerikten gelir). Sabit piksel yükseklik vermeyin.
4. Bu sayfalarda Wix'in kendi Header/Footer'ı ya da ayrı bir WhatsApp öğesi kullanılmaz; bileşen onaylı Header, Footer, WhatsApp ve Yukarı Çık'ı kendisi getirir (diğer 1N sayfaları gibi). Site düzeyinde Wix header/footer bölümleri bu sayfalarda gizli olmalıdır (Kısaca Biz sayfasıyla aynı ayar).
5. Sayfa menüde (Wix site menüsü) gösterilmek zorunda değildir; menü 1N Header'dadır.

## 2. Menü nedeniyle Server URL'i değişen mevcut sayfalar (11 dosya / 15 Custom Element)
Her satırda **yalnız Server URL** alanı değişir. Tag Name ve Wix'te tanımlı tüm öznitelikler olduğu gibi kalır. Yeni dosyalarda değişen tek şey Header v13 + site işaretlemesi v15 adresleridir (MENU_UPDATE_REPORT §4); V1.4 mobil optimizasyonları, içerik, tasarım ve medya aynıdır.

| Sayfa | URL | Tag Name (değişmez) | Yeni Server URL | Korunacak öznitelikler | Geri dönüş (bugün canlı) |
|---|---|---|---|---|---|
| Ana Sayfa | `/` | `n1-site-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@2aa9a9b483e53be78aebcd67f5af54e5ba485f90/wix-career-v1/sites/home/n1-site-wix-v660.js` | `assets-base`, `ronin-base`, `ronin-mobile-base`, `ronin-tier`, `hero-video`, `hero-poster`, `home-base`, `sticky-fix`, `debug` (tanımlı olanlar aynen) | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@36a24d3d5af5be5e5493598af4375f070a26b002/wix-mobile-performance-v14/home/n1-site-wix-v659.js` |
| Kreatif Prodüksiyon | `/kreatif-produksiyon` | `n1-kreatif-produksiyon-v23` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@2aa9a9b483e53be78aebcd67f5af54e5ba485f90/wix-career-v1/sites/pages/wix-kreatif-produksiyon-v25/n1-kreatif-produksiyon-v25.js` | `deps-base`, `cta-href` ve tanımlı diğerleri (aynen) | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@36a24d3d5af5be5e5493598af4375f070a26b002/wix-mobile-performance-v14/pages/wix-kreatif-produksiyon-v24/n1-kreatif-produksiyon-v24.js` |
| E-Ticaret Yönetimi | `/e-ticaret-yonetimi` | `n1-e-ticaret-yonetimi-v23` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@2aa9a9b483e53be78aebcd67f5af54e5ba485f90/wix-career-v1/sites/pages/wix-e-ticaret-yonetimi-v26/n1-e-ticaret-yonetimi-v26.js` | `deps-base`, `cta-href` ve tanımlı diğerleri (aynen) | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@36a24d3d5af5be5e5493598af4375f070a26b002/wix-mobile-performance-v14/pages/wix-e-ticaret-yonetimi-v25/n1-e-ticaret-yonetimi-v25.js` |
| Sosyal Medya | `/sosyal-medya` | `n1-sosyal-medya-v27` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@2aa9a9b483e53be78aebcd67f5af54e5ba485f90/wix-career-v1/sites/pages/wix-sosyal-medya-v29/n1-sosyal-medya-v29.js` | `deps-base`, `cta-href` ve tanımlı diğerleri (aynen) | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@36a24d3d5af5be5e5493598af4375f070a26b002/wix-mobile-performance-v14/pages/wix-sosyal-medya-v28/n1-sosyal-medya-v28.js` |
| Reklam Yönetimi | `/reklam-yonetimi` | `n1-reklam-yonetimi-v23` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@2aa9a9b483e53be78aebcd67f5af54e5ba485f90/wix-career-v1/sites/pages/wix-reklam-yonetimi-v25/n1-reklam-yonetimi-v25.js` | `deps-base`, `cta-href` ve tanımlı diğerleri (aynen) | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@36a24d3d5af5be5e5493598af4375f070a26b002/wix-mobile-performance-v14/pages/wix-reklam-yonetimi-v24/n1-reklam-yonetimi-v24.js` |
| UI/UX Tasarım | `/ui-ux-tasarim` | `n1-uiux-tasarim-v28` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@2aa9a9b483e53be78aebcd67f5af54e5ba485f90/wix-career-v1/sites/pages/wix-uiux-tasarim-v31/n1-uiux-tasarim-v31.js` | `deps-base`, `cta-href` ve tanımlı diğerleri (aynen) | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@36a24d3d5af5be5e5493598af4375f070a26b002/wix-mobile-performance-v14/pages/wix-uiux-tasarim-v30/n1-uiux-tasarim-v30.js` |
| Yapay Zekâ | `/yapay-zeka` | `n1-yapay-zeka-v2` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@2aa9a9b483e53be78aebcd67f5af54e5ba485f90/wix-career-v1/sites/pages/wix-yapay-zeka-v4/n1-yapay-zeka-v4.js` | `deps-base`, `cta-href` ve tanımlı diğerleri (aynen) | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@36a24d3d5af5be5e5493598af4375f070a26b002/wix-mobile-performance-v14/pages/wix-yapay-zeka-v3/n1-yapay-zeka-v3.js` |
| Uygulama Geliştirme | `/uygulama-gelistirme` | `n1-uygulama-gelistirme-v2` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@2aa9a9b483e53be78aebcd67f5af54e5ba485f90/wix-career-v1/sites/pages/wix-uygulama-gelistirme-v4/n1-uygulama-gelistirme-v4.js` | `deps-base`, `cta-href` ve tanımlı diğerleri (aynen) | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@36a24d3d5af5be5e5493598af4375f070a26b002/wix-mobile-performance-v14/pages/wix-uygulama-gelistirme-v3/n1-uygulama-gelistirme-v3.js` |
| Kısaca Biz | `/kisaca-biz` | `n1-kisaca-biz-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@2aa9a9b483e53be78aebcd67f5af54e5ba485f90/wix-career-v1/sites/pages/wix-kisaca-biz-v2/n1-kisaca-biz-v2.js` | `deps-base`, `cta-href` ve tanımlı diğerleri (aynen) | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-kisaca-biz-v1/n1-kisaca-biz-v1.js` |
| Markalar | `/markalar` | `n1-markalar-v11` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@2aa9a9b483e53be78aebcd67f5af54e5ba485f90/wix-career-v1/sites/pages/wix-markalar-v12/n1-markalar-v12.js` | `deps-base`, `cta-href` ve tanımlı diğerleri (aynen) | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-markalar-v1/n1-markalar-v11.js` |
| Gizlilik Politikası | (Wix'teki mevcut) | `n1-gizlilik-politikasi-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@2aa9a9b483e53be78aebcd67f5af54e5ba485f90/wix-career-v1/sites/pages/wix-yasal-sayfalar-v2/n1-yasal-sayfalar-v2.js` | tanımlı olanlar (aynen) | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-yasal-sayfalar-v1/n1-yasal-sayfalar-v1.js` |
| KVKK Aydınlatma Metni | (Wix'teki mevcut) | `n1-kvkk-aydinlatma-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@2aa9a9b483e53be78aebcd67f5af54e5ba485f90/wix-career-v1/sites/pages/wix-yasal-sayfalar-v2/n1-yasal-sayfalar-v2.js` | tanımlı olanlar (aynen) | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-yasal-sayfalar-v1/n1-yasal-sayfalar-v1.js` |
| Çerez Politikası | (Wix'teki mevcut) | `n1-cerez-politikasi-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@2aa9a9b483e53be78aebcd67f5af54e5ba485f90/wix-career-v1/sites/pages/wix-yasal-sayfalar-v2/n1-yasal-sayfalar-v2.js` | tanımlı olanlar (aynen) | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-yasal-sayfalar-v1/n1-yasal-sayfalar-v1.js` |
| Kullanım Koşulları | (Wix'teki mevcut) | `n1-kullanim-kosullari-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@2aa9a9b483e53be78aebcd67f5af54e5ba485f90/wix-career-v1/sites/pages/wix-yasal-sayfalar-v2/n1-yasal-sayfalar-v2.js` | tanımlı olanlar (aynen) | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-yasal-sayfalar-v1/n1-yasal-sayfalar-v1.js` |
| Veri Sahibi Başvuru Formu | (Wix'teki mevcut) | `n1-veri-sahibi-basvuru-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@2aa9a9b483e53be78aebcd67f5af54e5ba485f90/wix-career-v1/sites/pages/wix-yasal-sayfalar-v2/n1-yasal-sayfalar-v2.js` | tanımlı olanlar (aynen) | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-yasal-sayfalar-v1/n1-yasal-sayfalar-v1.js` |

## 3. Özel kod: Loader rotası
"Özel Yükleniyor % Script" girişini düzenleyin:
1. İçeriği tamamen silin → `wix-career-v1/wix-custom-code/LOADER-v13.1-ozel-yukleniyor.html` dosyasının **tamamını** yapıştırın. (V1.3 ile tek fark iki rota: `/insan-kaynaklari`, `/staj-programlari`; `/acik-pozisyonlar` zaten vardı. Başka hiçbir davranış değişmedi.)
2. Konum (Head) ve "her yeni sayfada yükle" aynı kalır. **Sayfa seçimine** İnsan Kaynakları, Açık Pozisyonlar ve Staj Programları sayfalarını ekleyin.
Menü Kapanış V1.3, test anahtarı, Google Ads / Meta Pixel / GTM / GA girişlerine **dokunmayın**.

## 4. `/ekibimize-katil` → `/insan-kaynaklari` kalıcı 301 yönlendirmesi
Bu yönlendirmeyi kod yapamaz; Wix sunucusunda **URL Yönlendirme Yöneticisi** ile siz eklersiniz (gerçek HTTP 301):
1. Wix kontrol paneli (Dashboard) → **Ayarlar** → **SEO** (Pazarlama ve SEO → SEO Araçları) → **URL Yönlendirme Yöneticisi** (URL Redirect Manager).
2. **+ Yeni Yönlendirme** → Eski URL: `/ekibimize-katil` → Yeni URL: `/insan-kaynaklari` (sitenizdeki sayfa olarak seçin) → türü **301 (Kalıcı)** → Kaydet.
3. Not: `/ekibimize-katil` bugün canlıda **404** (yayında sayfa yok), bu yüzden yönlendirme doğrudan eklenebilir. Wix, yayındaki bir sayfanın adresini kaynak olarak kabul etmez. Editörde bu adresi kullanan gizli bir "Ekibimize Katıl" sayfası varsa **silmeyin**: önce o sayfanın URL slug'ını `ekibimize-katil-arsiv` yapın (sayfa ve içeriği korunur), sonra yönlendirmeyi ekleyin.
4. Doğrulama (yayından sonra): `curl -I https://www.reklam1n.com/ekibimize-katil` → `301` ve `location: https://www.reklam1n.com/insan-kaynaklari`.

## 5. Wix site menüsü (yalnız varsa)
Wix yerel sayfalar (Akademi, /1n, /iletisim vb.) 1N Header kullanmaz. Canlı taramada bu sayfalarda "Ekibimize Katıl" bağlantısı **bulunmadı** (`qa/native-scan.log`). Wix Editor → Site Menüsü'nde gizli bir "Ekibimize Katıl" öğesi varsa kaldırın; yoksa işlem yok.

## 6. Yayından sonra kontrol (5 dk)
1. Ana sayfa, bir hizmet sayfası ve Kısaca Biz'de: MENU → İnsan Kaynakları yazısına tıkla → `/insan-kaynaklari`. Menüyü aç → İK satırındaki **KARİYER +** düğmesi → Açık Pozisyonlar / Staj Programları görünür; Ekibimize Katıl yok.
2. Telefonda aynısı (başlık sayfaya gider, düğme alt menüyü açar).
3. `/insan-kaynaklari` → iki kart; kartlar ilgili sayfalara gider; alt sayfalarda "İnsan Kaynaklarına Dön" çalışır.
4. Ana sayfada "Hikâyemizin Devamı" → `/kisaca-biz`; telefonda hizmet sayfalarında V1.4 kareleri (ör. E-Ticaret) yerinde.
5. `/ekibimize-katil` → `/insan-kaynaklari` (301).

## 7. Ne değişmez
Ana sayfa tasarımı, Ronin/Samuray animasyonu ve video kaynakları; masaüstü tasarımları; hizmet sayfası içerikleri ve videoları; V1.4 mobil medya/kaynak optimizasyonları; Hikâyemizin Devamı → /kisaca-biz; Menü Kapanış V1.3 ve Loader V1.3 davranışı (yalnız iki rota eklendi); Intelligence, müşteri panelleri, takip kodları.
