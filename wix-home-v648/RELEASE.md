# 1N Digital Media — Homepage v6.48 Production Release
## GitHub'daki durum
- Üretim kaynakları `main` dalına taşındı. Mevcut eski kök medya dosyaları korunmuştur.
- Ronin v6.47 ve ana sayfa bölüm modülleri değiştirilmedi; prod kaynakları sabit commit ile yüklenecek.
- Yeni Custom Element ana giriş dosyası: `wix-home-v648/n1-site-wix-v648.js`
- Wix Studio tag: `n1-site-v1` (farklı `n1-site-test` etiketi **değildir**).
- Server URL: `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@dd2c7b80b62e88287987e063dd757f36bd3805bb/wix-home-v648/n1-site-wix-v648.js`
- `code-base` otomatik sabit üretim sürümünden alınır; `assets-base` / `ronin-base` girişleri yoksa üretim medya adresleri kullanılır.
- Eski test bileşeni `n1-site-test` aynı ana sayfada ikinci kez çalıştırılmamalıdır.
## Yeni menü
1. Kısaca Biz → `/kisaca-biz`
2. Hizmetler → `#hizmetler-ozet` (ana sayfadaki hizmetler açıklama paragrafı)
3. Markalar → `/markalar`
4. Akademi → `/reklam-ajansi`
5. İnsan Kaynakları → alt menü: Ekibimize Katıl (`/ekibimize-katil`), Açık Pozisyonlar (`/acik-pozisyonlar`).
Diğer tüm alt menüler kaldırıldı. İletişim ana menü öğesi kaldırıldı; üstteki Teklif Al CTA ve ana sayfanın diğer bölümleri korunmuştur.
## Stüdyo Hikâyesi
Referans için mevcut `wix-test-v647/wix-studyo-v1/n1-studyo-wix-compact-v10.js` ve onaylı V9 korunmuştur. Diğer iç sayfa çalışmalarının kodları yine `wix-test-v647` dalındadır; bu üretim paketine dahil edilmemiştir. GitHub'dan silinmemiş olmaları Wix Studio sayfalarının canlılığını değiştirmez.
## Wix Studio'da kalan adımlar
1. Ana sayfa Custom Element kaynağını yukarıdaki yeni Server URL'ye taşı; Tag Name `n1-site-v1` olmalı.
2. Test için kullanılan `n1-site-test` öğesini ana sayfada ikinci bir bileşen olarak bırakma.
3. Sayfa zemini `#080A09`, Custom Element tam genişlik; yükseklik/kesilme ve sabit header pozisyonunu kontrol et.
4. Gerçek masaüstü, tablet, mobil önizlemede Ronin, menü, Hizmetler çapa kaydırması, Markalar, Akademi, İK alt menüsü, footer ve WhatsApp işlevini doğrula.
5. Üzerinde çalışılan diğer iç sayfaları ana menüden çıkar; yayından kaldırılmaları isteniyorsa Wix Studio editöründe sayfa düzenleme/silme işlemi gerekir. Wix Studio tek bir sayfayı ayrı ayrı unpublish edememektedir. Değerli içerikleri silmeden önce yedekle.
6. **Editör değişiklikleri kaydedildikten sonra** siteyi yayınla. Sadece site publish API'sini çağırmak, yeni GitHub JS URL'sini otomatik olarak Wix sayfasına bağlamaz.
## Durum
GitHub üretim dosyaları hazır; Wix Studio editör kaydı, gerçek cihaz doğrulaması ve canlı yayın henüz yapılmamıştır.
