# UI/UX Tasarım V2.3 — Hero fareyle görsel ortaya çıkarma efekti geri yüklendi

## Değişiklik

`/ui-ux-tasarim` sayfasının Hero bölümündeki V2.2 revizyonunda kaldırılmış olan iki katmanlı etkileşim geri getirildi. Yeni görsel, öncekinin üzerine dairesel maske ile açılıyor.

- **Alt katman:** `https://static.wixstatic.com/media/6dbf5e_ac664ac6ed364a05a9fb9c00790285d2~mv2.png` (önceki Hero görseli, gri tonlama)
- **Üst katman:** `https://static.wixstatic.com/media/6dbf5e_0992f3a7b09a4a2386de18ee61fdbe0d~mv2.png` (yeni, fare/dokunmayla görünür).
- Üst katman `mask-image` ve `-webkit-mask-image` radial-gradient ile açılır, `--x`/`--y` değişkenleri `pointermove` veya `pointerdown` ile güncellenir.
- Reduced-motion açıkken efekt konumu animasyon olmadan doğrudan güncellenir.
- Mobil/tablette dokunma ile efekt konumu güncellenir.
- Etkileşim devam ederken `requestAnimationFrame` yalnızca hedef konuma yaklaşana kadar çalışır ve bileşen kaldırılınca temizlenir.
- Hero'daki etkileşim açıklaması, artık gerçek davranışı anlatır.

## Korunanlar

- V2.1'de eklenen altı süreç görseli, mobil ve masaüstü eşleştirmeleri.
- GSAP, etkileşimli UX demoları, Header, Footer ve floating controls.
- `#080A09` ve `#A8CF62` renk sistemi.

## Wix Studio

- **Sayfa:** `/ui-ux-tasarim`
- **Server URL:** `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@67155c0518edada1233d1af7da47beba3ba29153/wix-uiux-tasarim-v23/n1-uiux-tasarim-v23.js`
- **Tag Name:** `n1-uiux-tasarim-v23`

1. Wix Studio'da `/ui-ux-tasarim` sayfasını aç.
2. Mevcut Custom Element'i seç; eski öğenin yanına ikinci bir öğe ekleme.
3. **Choose Source → Server URL** adresini V2.3 kaynağıyla değiştir.
4. **Tag Name** alanını `n1-uiux-tasarim-v23` olarak güncelle.
5. Önizlemede masaüstünde fare hareketini, tablet/mobilde dokunmayı ve iki görselin kırpılmasını kontrol et.
6. Uygunsa **Publish** ile canlıya al.

## Test sınırları

- GitHub kaynağı commit üzerinden yeniden okundu; her iki PNG, maske stilleri, pointer dinleyicileri, ayrı tag ve önceki altı süreç görseli doğrulandı.
- JavaScript sözdizimi kontrolü geçti.
- Wix Studio'nun gerçek tarayıcısındaki fare/dokunma testi veya PNG'lerin CDN yüklenmesi bu oturumda doğrulanmadı.
- GitHub güncellemesi, Wix Studio Custom Element kaynak adresini veya canlı siteyi kendiliğinden değiştirmez; Wix editörüne uygulama ve canlı yayın henüz yapılmadı.
