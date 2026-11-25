# 1N Digital Media — Uygulama Geliştirme V1 / Beyond the Screen

## Yayın Kaynağı
- **Sayfa:** `/uygulama-gelistirme` (Türkçe karakterli slug kullanılmaz)
- **Custom Element Tag Name:** `n1-uygulama-gelistirme-v1`
- **Server URL:** `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@cb4cbb0c71e3992ef20d26459e3468ee2d5a2fd4/wix-uygulama-gelistirme-v1/n1-uygulama-gelistirme-v1.js`
- **Kaynak JavaScript:** `wix-uygulama-gelistirme-v1/n1-uygulama-gelistirme-v1.js`
- **Önizleme:** `wix-uygulama-gelistirme-v1/preview.html`

## Kaynak Paket
Kullanıcı tarafından sağlanan `1N_Uygulama_Gelistirme_V1_Beyond_The_Screen.zip` içindeki orijinal JavaScript, ayrı bir sürüm klasörüne eklendi. Dosyanın GitHub'dan tekrar indirilmiş metni 175713 karakter; JavaScript sözdizimi kontrolünden geçti ve brief'teki 6 görsel / 4 video URL'sinin tümü mevcut. Diğer hizmet sayfaları ve onaylı Header/Footer değiştirilmedi.

## Bölümler
1. Hero — FİKİRDEN ÜRÜNE.
2. ÖNCE İNSANI ANLARIZ.
3. Interactive App Lab — Mobile App, Web App, Dashboard (örnek veriler; backend yok)
4. FARKLI EKRANLAR. TEK BİR DÜŞÜNCE.
5. FİKİR KODLA BULUŞTUĞUNDA. (7 süreç adımı)
6. HAREKET DENEYİMİN BİR PARÇASIDIR.
7. HER EKRANDA DOĞRU DENEYİM.
8. GÜZEL GÖRÜNMEK YETMEZ. DOĞRU ÇALIŞMALI.
9. Final CTA — /iletisim ve /teklif-al.

## Korunanlar
- Ortak Header `n1-header-v648` / Footer `n1-footer-v646`
- SVG ikonları, GSAP ve ScrollTrigger, `#A8CF62` vurgu rengi
- Görünürlük denetimli videolar: yalnızca verilen 720p URL'leri
- Mobil/tablet/masaüstü duyarlılık, GSAP cleanup ve reduced-motion
- Diğer tüm Wix sayfaları

## Wix Studio kurulum adımları
1. Wix Studio'da `/uygulama-gelistirme` sayfasını aç veya bu URL ile yeni sayfa oluştur.
2. Sayfada **bir adet** tam sayfa Custom Element kullan. Varsa eski bir Custom Element'i ayrıca çoğaltma.
3. Custom Element'in Server URL alanına yukarıdaki commit'e sabitlenmiş jsDelivr bağlantısını, Tag Name alanına `n1-uygulama-gelistirme-v1` gir.
4. Custom Element'in kapsayıcı genişliği %100 olmalı. İçeriği sabit yükseklikli bir kutuya hapsetme; yerel önizlemede düzgün çalışan yükseklik gerçek Wix Studio'da ayrıca doğrulanmalıdır.
5. Header/Footer ve floating controls çift olup olmadığını kontrol et.
6. 390 px mobil, 820 px tablet ve 1440 px masaüstü görünümünde Hero, App Lab'in üç görünümü, tüm videolar ve final CTA'yı test et.
7. Kontrollerden sonra Wix Studio'da **Publish** ile canlıya al.

## Gerçek durum / sınırlar
- GitHub: JavaScript ve kurulum dosyaları yüklendi.
- Zip'in QA_REPORT.md dosyasında 10 genişlikte yerel otomatik Chromium testleri ve bazı gerçek medya ekran görüntüleri bildiriliyor; bunlar Claude'un raporlarıdır. Burada bağımsız yapılan test kaynak kodun sözdizimi ve bağlantı varlığı kontrolüdür.
- **Wix Studio Custom Element Server URL/Tag Name editör üzerinden henüz güncellenmedi.**
- **Bu sürüm mevcut Wix sitesinde canlıya alınmış olarak doğrulanmadı.**
- Wix REST API'sindeki Publish Site işlemi sayfa editöründeki Custom Element bağlantısını kendi kendine oluşturmaz veya değiştirmez. Bu nedenle önce editör kaynak ayarları tamamlanmadan siteyi yayınlamak yeni sayfayı aktaramaz.
