# 1N E-Ticaret Yönetimi — V1 (Creative Commerce Experience)

| | |
|---|---|
| Sayfa | `/e-ticaret-yonetimi` |
| Dosya | `n1-e-ticaret-yonetimi-v1.js` (~82 KB, tek dosya, bağımlılıkları kendisi yükler) |
| Custom Element etiketi | `n1-e-ticaret-yonetimi-v1` |
| Stil kimliği | `n1-ec1-style` (yalnızca bu etiket kapsamında) |

## Wix Studio'ya ekleme
1. Dosyayı GitHub'da yeni bir klasöre yükleyin (öneri: `wix-e-ticaret-yonetimi-v1/n1-e-ticaret-yonetimi-v1.js`). Mevcut hiçbir dosyanın üzerine yazılmaz.
2. Commit'e sabitlenmiş jsDelivr adresini alın: `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@<commit>/wix-e-ticaret-yonetimi-v1/n1-e-ticaret-yonetimi-v1.js`
3. `/e-ticaret-yonetimi` sayfasına bir Custom Element ekleyin: **Server URL** = bu adres, **Tag name** = `n1-e-ticaret-yonetimi-v1`.
4. Bölüm ve öğe yüksekliğini otomatik / içeriğe göre bırakın; sabit piksel yükseklik vermeyin. Sayfada ayrıca Wix Header/Footer bölümü olmamalı (bileşen onaylı Header/Footer'ı kendisi ekler; sayfada başka bir `n1-header`, `footer.n1ft` veya kontrol katmanı varsa ikincisini oluşturmaz).
5. Önce Test Site'ta yayınlayıp masaüstü, tablet ve telefonda kontrol edin.

## Kullandığı onaylı kaynaklar (commit `d24fa373…`, değiştirilmedi)
- Header `wix-home-v648/modules/n1-header-v648.js` + menü verisi `wix-home-v648/site/n1-site-markup-v648.js`
- Footer `wix-full-v1/modules/n1-footer-v646.js` + `n1-footer-v636.css`
- WhatsApp / Yukarı Çık `wix-full-v1/modules/n1-floating-controls-v632.js`, bağlantılar `n1-links-v646.js`
- İç sayfa duyarlı CSS `wix-studyo-v1/site/n1-inner-responsive-v6.css` (commit `09612df…`, diğer iç sayfalarla aynı)

Menüde yalnızca "Hizmetler" bağlantısı ana sayfadaki `/#hizmetler-ozet` bölümüne gidecek şekilde ayarlanır (diğer iç sayfalarla aynı); logo `/` adresine gider.

## Teknik özet
- Light DOM, sınıf öneki `ec-`. CSS diğer sayfalara sızmaz.
- GSAP 3.13.0 + ScrollTrigger yalnızca sayfada yoksa yüklenir; pin ve spacer yok. Bütün animasyonlar `gsap.context` + `gsap.matchMedia` içinde.
- Bileşen kaldırılınca: ScrollTrigger'lar, zaman çizelgeleri, IntersectionObserver'lar, ResizeObserver, zamanlayıcı ve dinleyiciler temizlenir; videolar durdurulur ve kaynakları bırakılır.
- GSAP yüklenemezse veya `prefers-reduced-motion` açıksa bütün içerik görünür ve kullanılabilir kalır.
- Debug paneli veya konsol çıktısı yok (yalnızca hata durumunda `console.warn/error`).

## Önizleme
`preview.html` bir HTTP sunucusu üzerinden açılmalı (ör. bu klasörde `python3 -m http.server`). Header/Footer, fontlar, GSAP, video ve görseller internetten yüklenir.
