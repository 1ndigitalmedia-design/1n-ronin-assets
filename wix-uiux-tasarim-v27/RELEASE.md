# UI/UX Tasarım V2.7 — Tek görselle fare/dokunma renk açma efekti

## Revizyon

Sayfa: `/ui-ux-tasarim`.

Hero bölümünde kullanıcı tarafından önceden istenen etkileşim V2.6'da yanlışlıkla kaldırıldığı için yeniden getirildi. V2.7 yalnızca **tek bir PNG kaynağı** kullanır:

`https://static.wixstatic.com/media/6dbf5e_0992f3a7b09a4a2386de18ee61fdbe0d~mv2.png`

- Sadece bir gerçek `img.ux-spot__img` öğesi vardır.
- Alt görüntü CSS `filter: grayscale(1) brightness(.55) contrast(1.05)` ile oluşturulur.
- Renkli görünüm, aynı URL'yi kullanan CSS `.ux-spot__canvas::after` pseudo-elementinin `background-image: var(--ux-hero-img)` kaynağıyla oluşturulur.
- Dairesel `mask-image` ve `-webkit-mask-image` maskeleri `--x`, `--y` değişkenleriyle fareyi ve dokunmayı takip eder.
- Eski `ac664...` PNG kullanılmaz; ayrıca sağlanan siyah-beyaz `82105...` PNG'ye gerek kalmadı.
- `pointermove` ve `pointerdown` olayları; hareket azaltma desteği; `requestAnimationFrame` ile akıcı geçiş ve temizleme.
- GSAP Hero girişindeki yakınlaşma **görsel ve renkli görünümün ortak kapsayıcısına** uygulanır. Böylece animasyon sırasında katmanlar hizalı kalır.
- Mobil kırpma ile renkli arka plan kırpması aynı `50% 42%` konumunu kullanır.

## Korunanlar

- V2.4: His bölümündeki 720p video
- V2.5: Hizmetler kapsamı sol PNG
- V2.1: Altı süreç görseli
- Diğer UI/UX laboratuvarı, GSAP, Header, Footer, floating controls, renk `#A8CF62`

## Wix Studio

- **Sayfa:** `/ui-ux-tasarim`
- **Server URL:** `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@1257e71aba609515b61007b09ab8cd664ca7f66f/wix-uiux-tasarim-v27/n1-uiux-tasarim-v27.js`
- **Tag Name:** `n1-uiux-tasarim-v27`

Wix Studio'da sayfanın mevcut Custom Element öğesinde Server URL ve Tag Name değerlerini yukarıdaki adreslerle değiştir. Yeni ikinci bir öğe ekleme. Masaüstünde fare, mobil/tablette dokunma, Hero giriş animasyonu ve görüntü kadrajını kontrol ederek **Publish** yap.

## Doğrulama sınırları

GitHub commit üzerindeki kaynak tekrar okunarak yeni PNG'nin tek kaynak olması, CSS gri ve radial renk maskesi, fare/dokunma olayları, GSAP hedefi ve eski alt fotoğrafın yokluğu doğrulandı. JavaScript sözdizimi kontrolü geçti.

Gerçek Wix Studio önizlemesindeki fare hareketi ve mobil dokunma, CDN'nin çalışması ve canlıya yayınlama bu oturumda doğrulanmadı. GitHub'a yeni JS kaydetmek Wix Studio Custom Element'ini otomatik güncellemez.
