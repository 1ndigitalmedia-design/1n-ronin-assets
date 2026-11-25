# QA_REPORT — Uygulama Geliştirme V1

Bu rapor yalnızca gerçekten çalıştırılan testleri içerir. **Wix Studio içinde test yapılmadı**; gerçek telefon/tablet, ekran okuyucu, Lighthouse veya performans ölçümü yapılmadı.

## Test ortamları
1. **Otomatik (Playwright, Chromium headless)** — `preview.html` yerel sunucuda. Görseller aynı boyutta yer tutucu PNG'lerle, videolar aynı süreli yerel test WebM dosyalarıyla değiştirildi (bu ortam wixstatic'e erişemiyor). GSAP 3.12.5 yerel kopyadan yüklendi. Header/Footer, onaylı modüllerin kendisi.
2. **Gerçek tarayıcı (Claude masaüstü uygulamasındaki tarayıcı, Chromium)** — Gerçek wixstatic görselleri ve 720p videolarıyla. Ekran görüntüleri buradan alındı. Not: bu tarayıcıdaki paket, son beş CSS düzeltmesinden önceki derlemedir; düzeltmeler ekran görüntüsü öncesi aynı kurallarla CSS olarak enjekte edildi, ardından aynı kurallar kaynağa eklenip dosya yeniden derlendi. Teslim edilen JS bu kuralları içerir.

## Genişlik testi (son derleme, 10 genişlik)
360, 375, 390, 430, 768, 820, 1024, 1366, 1440, 1920:

| Kontrol | Sonuç |
|---|---|
| Yatay taşma (scrollWidth = genişlik) | 10/10 geçti |
| Footer altı boşluk | 0–1 px |
| Final → Footer arası | 0 px |
| Header / Footer / WhatsApp / Yukarı Çık sayısı | 1/1/1/1 |
| GSAP yüklenme sayısı | 1 |
| Pin / spacer | 0 |
| Görünmez kalan içerik | 0 |
| Metin–medya çakışması | 0 |
| 44 px altı dokunma hedefi | 0 |
| Konsol hatası | 0 |
| Unicode ok / emoji | 0 |
| #A1FF00 / #A2FF00 | yok |
| Adsız düğme / etiketsiz SVG | 0 |
| Header mobil menü + İK alt menüsü | açılıyor, alt bağlantılar görünüyor |

## App Lab (her genişlikte)
- Mobil: proje açma, durum değiştirme (Sürüyor, %33 · 1/3 görev), görev işaretleme, geri, filtre, Görevler sekmesi, tamamlananları göster — çalıştı.
- Klavye: görünüm sekmeleri ok tuşlarıyla — çalıştı.
- Web: arama, boş sonuç, durum ve tür filtreleri, satır açma, görevler — çalıştı.
- Pano: özet sayıları (1421), ilerletme sonrası değişim (0521), tür filtresi, ilerleme görünümü, sütun sayısı (telefonda 1, diğerlerinde 4), panodan web görünümünde açma — çalıştı.
- Sıfırla: başlangıç verisine döndü (2321).
- Görünüm geçişi sonrası cihazda satır içi stil kalmadı.

## Diğer etkileşimler
- Hizmet dizini (≥1025 px): beş başlık düğme; seçilen web hizmetinde video oynuyor. Altında: düğme yok, beş medya görünür.
- Süreç: adım tıklama ve kaydırma ile aşama değişimi (05 / 07) — çalıştı.
- Hareket demosu: beş mikro etkileşim ve "Hareket" anahtarı — çalıştı.
- Bağlam seçici (yolda/toplantıda/masada) — çalıştı.
- CTA'lar /iletisim ve /teklif-al'a gidiyor ve tıklanabilir; final bağlantı çizgisi masaüstünde paragrafı kesmiyor.
- Video istekleri yalnızca verilen dört 720p bağlantısı; poster/autoplay özniteliği yok.
- Video düğmesi isabet testi: 10 genişlikte tüm görünür düğmeler tıklanabilir. Masaüstünde web videosu yalnızca dizinde seçildiğinde görünür; seçilmiş hâlde 1366/1440/1920'de geçti.

## Senaryo testleri
| Senaryo | Sonuç |
|---|---|
| Aynı anda oynayan video | en fazla 1 |
| Sekme gizlenince | 0 video oynuyor |
| 3 kez kaldırıp yeniden bağlama | ScrollTrigger 4→0, katmanlar 1/1/1/1↔0/0/0/0, hata yok |
| Yukarı Çık | 14152 → 0 |
| Hareket azaltma (1440, 390) | içerik görünür, otomatik oynatma yok, Lab çalışıyor, demo "hareketsiz" başlıyor |
| GSAP yüklenemezse (1440, 390) | içerik görünür, Lab çalışıyor |
| Video yüklenemezse | dört videoda hata durumu ve mesaj, yerine alakasız görsel yok |
| Veri tasarrufu | otomatik oynatma yok, elle oynatma var |
| Yön değişimi (844 ↔ 390) | taşma ve boşluk yok |

## Görsel QA'da bulunup düzeltilen sorunlar
- Telefonda video düğmesi WhatsApp düğmesine yakındı → düğmeler 1024 px altında sola alındı; masaüstü Hero'da sağ üste.
- Masaüstünde telefon simülatörü ekrandan uzundu → yükseklik ekran yüksekliğiyle sınırlandı.
- Görsel 2'de mağaza rozeti kenarı görünüyordu → kırpma sıkılaştırıldı.
- Tabletteki süreç tahtası çok büyüktü → 600 px, 16:10.
- Pano sütun başlığı ilk karta yapışıktı → boşluk eklendi.
- Hero'da "İ/Ü" noktaları yalnızca kontur kalıyordu → dolgu payı eklendi.

## Bilinen test notu
Mobil menü testi, etkileşim testlerinden **sonra** çalıştırıldığında İK alt menüsü bir kez başarısız göründü. Nedeni Playwright'ın sayfada bıraktığı fare imlecinin onaylı Header'ın hover davranışını tetiklemesi (gerçek dokunmatik kullanımda oluşmaz). Menü testi önce çalıştırıldığında 10 genişlikte geçiyor. Header'a dokunulmadı.

## Doğrulanmayanlar
- Wix Studio Custom Element içinde çalışma, Wix dış kutu yüksekliği, yayınlanmış sayfa.
- `/uygulama-gelistirme` slug'ının canlı sitede doğrulanması (README'ye bakın).
- Gerçek iOS/Android cihaz, Safari, Firefox.
- Ekran okuyucu, Lighthouse/Core Web Vitals.