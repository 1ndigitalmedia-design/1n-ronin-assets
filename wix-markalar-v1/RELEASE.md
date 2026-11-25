# Markalar V1 — Yayın ve Kurulum Kaydı

Tarih: 25 Kasım 2026
Sayfa: `/markalar`
Custom Element: `n1-markalar-v1`

## GitHub tamamlandı

Kaynak dosyaları ve veri dosyası sabit commit `52887065746fb9eaaecb470a2ff199335d3790f8` üzerinden birlikte doğrulandı.

**Server URL:**
`https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@52887065746fb9eaaecb470a2ff199335d3790f8/wix-markalar-v1/n1-markalar-v1.js`

**Marka veri dosyası:**
`https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@52887065746fb9eaaecb470a2ff199335d3790f8/wix-markalar-v1/n1-markalar-data-v1.js`

Kaynak dosya, kendi URL'sini bulamazsa aynı içeriğin sabit commit üzerindeki veri dosyasına geri döner. Veriyi ve JS kaynağını ayrı CDN commitleriyle karıştırmayın.

## İçerik kapsamı

- 112 marka/proje, 20 sektör
- Öne çıkan 22 kayıt
- Sektörel listede 90 kayıt ve 18 ayrı grup
- Türkçe karakter destekli arama ve sektör filtresi
- GSAP 3.13 + ScrollTrigger + Flip; hareket azaltma desteği
- Mobil, tablet, masaüstü responsive düzen
- Var olmayan logo ve marka/proje linkleri eklenmedi
- Mevcut 1N Header/Footer kaynakları korundu, yeni üstbilgi/altbilgi üretilmedi

## Wix Studio kurulum

1. Mevcut sitenin **Markalar** sayfasını aç (yoksa `/markalar` slug'ıyla oluştur).
2. Sayfaya **Custom Element** ekle veya mevcut Markalar elementini seç; ikinci bir tam sayfa elementi ekleme.
3. **Server URL** alanına yukarıdaki JS URL'sini gir.
4. **Tag Name**: `n1-markalar-v1`.
5. Mevcut diğer hizmet sayfalarındaki Custom Element düzeniyle aynı mantıkta genişliği %100 yap; Auto Height mümkünse seç, içeriği kesen sabit yükseklikten kaçın.
6. Sayfanın Wix native Header/Footer kopyalarını onaylı ortak Header/Footer ile çiftlenmeyecek biçimde kontrol et.
7. Önizlemede 390, 834 ve 1440 px ekranlarda filtre, arama, boş sonuç ve Footer yüksekliğini kontrol et.
8. SEO: Title `Markalar ve Referanslar | 1N Digital Media`. Description `1N Digital Media'nın farklı sektörlerden marka ve proje portföyünü keşfedin. Kreatif prodüksiyon, dijital pazarlama, tasarım ve teknoloji odaklı çalışmalar.`
9. **Publish** yap ve `https://www.reklam1n.com/markalar` adresinde yeni içeriğin gerçekten yüklendiğini doğrula.

## QA ve yayın durumunun sınırları

- Yerel paket test raporu 12 responsive genişlik, arama/filtre, animasyon, DOM yaşam döngüsü ve boşluk kontrollerini içerir.
- Bağımsız olarak GitHub'dan iki JS kaynağı tekrar okundu; JavaScript sözdizimi ve 112 / 22 / 20 sayıları doğrulandı.
- Wix Studio canlı önizlemesinde görüntü ve dinamik yükseklik ayrıca doğrulanmalı.
- Wix Studio Custom Element düzenleyicisini bu bağlantının izinleriyle değiştiren destekli bir işlem bulunmadığından editör kaynağı bu oturumda değiştirilmedi; canlı yayın **tamamlanmadı**.
- `/markalar` tarayıcı sekmesinin önceden yüklü içeriği ayrıca güncel Wix yayını için kesin kanıt değildir.
- Yalnızca GitHub'a yüklemek sayfayı canlıya almaz; kaynak URL ve tag'ı Wix Studio'da uygulanmalıdır.

## SEO sınırı

Marka adları JavaScript ile render edilir. Wix SEO meta ayarları ayrıca editörden girilmelidir. Sayfa yayımlandıktan sonra URL denetimiyle Google'ın oluşturulmuş HTML'yi işleyebildiğini kontrol et.
