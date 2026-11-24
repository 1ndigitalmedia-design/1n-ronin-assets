# UI/UX Tasarım V2.6 — Hero tek görsel, hover efekti kapalı

## Talep ve uygulama

Sayfa: `/ui-ux-tasarim`

Hero görseli artık **yalnızca** aşağıdaki PNG kaynağını kullanır:
`https://static.wixstatic.com/media/6dbf5e_0992f3a7b09a4a2386de18ee61fdbe0d~mv2.png`

- Önceki alt görsel `ac664ac6ed364a05a9fb9c00790285d2` kaldırıldı.
- Üst/alt görsel katmanı tek bir `img.ux-spot__img` ile değiştirildi.
- Fare/dokunma ile çalışan radial reveal ve renkli maske CSS'i kaldırıldı.
- Eski `_hero()` handler'ı, `pointermove` / `pointerdown` dinleyicileri ve kare animasyonu kaldırıldı.
- Hero altındaki etkileşim açıklaması statik bir tasarım mesajıyla değiştirildi.
- Hero bölümündeki diğer başlık ve scroll/GSAP animasyonları korunuyor. Yalnızca görsel üzerinde istenmeyen interaktif efekt kapalı.

## Diğer bölümler korunmuştur

- His bölümündeki 720p video
- Hizmetler kapsamındaki 8395...PNG
- Keşif/Tanımlama/Tasarım/Prototipleme/Doğrulama/İyileştirme görselleri
- UX demoları, GSAP/ScrollTrigger, Header/Footer, menü ve floating controls
- `#A8CF62` renk standardı

## Wix Studio

- **Sayfa:** `/ui-ux-tasarim`
- **Tag Name:** `n1-uiux-tasarim-v26`
- **Server URL:** `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@8abe6c2f83edc0503df2e83a80b63c3e5fe47210/wix-uiux-tasarim-v26/n1-uiux-tasarim-v26.js`

Mevcut Custom Element'te Choose Source → Server URL alanına yeni URL'yi yapıştır, Tag Name'i V2.6 yap. Eski elementin ikinci kopyasını ekleme. Masaüstü/tablet/mobil önizlemeyi kontrol ettikten sonra **Publish** yap.

## Gerçekleştirilen kontroller

GitHub commit üzerinden kaynak tekrar okunmuştur. JavaScript sözdizimi başarılıdır. Hero'da tek görüntü, ikinci katmanın olmaması ve eski handler'ın kaldırılması doğrulanmıştır. Yeni görselin Wix Studio'daki gerçek kadrajı ve canlı sitenin V2.6'ya geçişi bu oturumda doğrulanmamıştır. GitHub kaynağının eklenmesi tek başına Wix Studio Custom Element ayarını veya yayını değiştirmez.
