# Reklam Yönetimi V2.2 — Analiz bölümünde yalnızca video

## Değişiklik

`/reklam-yonetimi` sayfasındaki **VERİYİ OKUMAK YETMEZ. KARARA DÖNÜŞTÜRMEK GEREKİR.** bölümünde V2.1 sürümünde video başlamadan önce gösterilen eski analitik fotoğraf kaldırıldı.

- Kaldırılan öğe: `img.ry-dec__img` (eski analitik laptop görüntüsü).
- Video doğrudan yerleştirilir: `https://video.wixstatic.com/video/6dbf5e_3855bf1db1384a9c961782c650b3686d/1080p/mp4/file.mp4`
- Video için **poster veya fotoğraf fallback yok**. Video ilk karesini hazır edene kadar `#080A09` koyu arka plan görünür.
- Video `muted playsinline loop preload="metadata"` kullanır; sayfa aşağı kaydırıldığında ilgili alana yaklaşırken daha hızlı yüklenir.
- Görünürken otomatik oynatılabilir ve SVG oynat/duraklat butonuyla kontrol edilir.
- Kullanıcının `prefers-reduced-motion` veya veri tasarrufu tercihi varsa otomatik oynatma kapalıdır.
- Video yüklenemezse eski fotoğraf görünmez; yalnızca hata mesajı gösterilir.
- Eski yerleşim, GSAP/ScrollTrigger, Header, Footer, diğer videolar ve `#A8CF62` korundu.

## Wix Studio

- Sayfa: `/reklam-yonetimi`
- **Server URL:** `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@3ea5ebd20ec0c36f4ed703d619d6bffb0f7086a1/wix-reklam-yonetimi-v22/n1-reklam-yonetimi-v22.js`
- **Tag Name:** `n1-reklam-yonetimi-v22`

Wix Studio'da mevcut Reklam Yönetimi Custom Element'ini seç, **Choose Source → Server URL** bağlantısını ve **Tag Name** değerini güncelle, eski öğenin kopyasını ekleme. Masaüstü/tablet/mobil önizlemede video alanını kontrol ederek **Publish** yap.

## QA

- JavaScript parse / sözdizimi kontrolü başarılı.
- GitHub'daki dosyanın gerçek içeriği commit üzerinden tekrar okunarak doğrulandı.
- Bölümün `<img>` öğesi bulunmadığı, doğrudan video içerdiği ve eski görsel referansının kaldırıldığı doğrulandı.
- Gerçek Wix Studio görünümü, CDN video yükleme hızı ve yayına alma işlemi bu oturumda doğrulanamadı.
- GitHub güncellemesi canlı Wix sayfasına otomatik olarak uygulanmaz.
