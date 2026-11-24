# Sosyal Medya V2.5 — Hareket Bölümündeki Küçük Görsel Yerine Video

## Değişiklik
- Sayfa: `/sosyal-medya`
- Bölüm: **İçerik Harekete Geçtiğinde**, büyük videonun sağ altına yerleştirilmiş küçük renkli **Glitch portresi** (`.sm-glitch`).
- Eski görsel, aktif medya olmaktan çıkarıldı; hata/yükleme sırasında yedek olarak saklandı.
- Yeni kaynak: `https://video.wixstatic.com/video/6dbf5e_4892baa5590541faae6c24693b7fb00c/1080p/mp4/file.mp4`.
- Yalnızca sağlanan **1080p** sürümü kullanılır; tahmini diğer kalite adresleri üretilmez.
- Mevcut küçük portrait panelin `aspect-ratio:2/3` ölçüsü, konumu, mobil düzeni, GSAP reveal/parallax hareketi korunmuştur.
- Video `muted`, `playsinline`, `loop`, `preload="none"` ile çalışır.
- Video yalnızca görünürken oynar; görünmezse veya sekme arka plana geçerse durur.
- `prefers-reduced-motion` ve veri tasarrufu için otomatik oynatma kapalıdır. SVG ikonlu erişilebilir oynat/duraklat kontrolü korunur.
- Aynı bölümün arka planındaki büyük video ile küçük video eşzamanlı oynayabilir; diğer bölümlerle mevcut video durdurma mantığı sürer.
- Gerçek video en-boy oranı doğrulanmadığı için `object-fit:cover` kadrajı Wix Studio'da kontrol edilmelidir.

## Korunan önceki revizyonlar
- Hero `67c5c858b42a4ce3b0e76195a59c8b3e` / 720p
- Strateji ilk sekme `044b3674636a4813b20f3f7dd8a402fe` / 480p
- Stratejide dört JPG görsel
- Büyük Hareket videosu `c530416b744a449cba5892bc85e2bdae` / 720p
- Final CTA videosu `f14a9f803bc442838bfe159f0aa49e72` / 1080p
- GSAP/ScrollTrigger, Header, Footer, menüler, WhatsApp/yukarı çık kontrolleri, `#A8CF62`.

## Wix Studio — Kurulum
- **Sayfa:** `/sosyal-medya`
- **Tag Name:** `n1-sosyal-medya-v25`
- **Server URL:** `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@97a703a47e478f6b6e324a8ca0292be4abb80854/wix-sosyal-medya-v25/n1-sosyal-medya-v25.js`

1. Wix Studio'da `/sosyal-medya` sayfasını aç.
2. Mevcut Custom Element'i seç; yeni bir kopya ekleme.
3. **Choose Source → Server URL** alanına yeni URL'yi yapıştır.
4. **Tag Name** değerini `n1-sosyal-medya-v25` yap.
5. Önizlemede hem büyük videonun hem küçük videonun çalışmasını; mobil/tablet kadrajını; Footer ve kaydırma yüksekliğini kontrol et.
6. **Publish** ile yayına al.

## Doğrulama ve sınırlamalar
- JavaScript sözdizimi kontrolü başarılı, kaynak GitHub commit üzerinden tekrar okunup doğrulandı.
- Gerçek CDN oynatma testi ve Wix Studio'nun masaüstü/mobil/tablet görünümü doğrulanmadı.
- GitHub kodu yüklendi; Wix Studio Custom Element kaynak alanı ve canlı site bu işlemle kendiliğinden güncellenmez.
- Kaynak adresi değiştirilmeden siteyi yeniden yayınlamak V2.5'i canlıya almaz; bu nedenle yalnızca Publish API'si çalıştırılmadı.
