# UI/UX Tasarım V2.2 — Hero görselini tek PNG ile değiştirme

## Yapılan değişiklik

Sayfa: `/ui-ux-tasarim`

Hero alanının iki katmanlı, aynı görseli kullanan eski siyah-beyaz ve renkli maske düzeni kaldırıldı. Onun yerine tek bir statik PNG yerleştirildi:

`https://static.wixstatic.com/media/6dbf5e_ac664ac6ed364a05a9fb9c00790285d2~mv2.png`

- Kaldırılan kaynaklar: `.ux-spot__img--base` ve `.ux-spot__img--top` (Hero'daki eski iki görsel).
- Kaldırılan davranış: fare/dokunma hareketiyle radikal maske açılması. Etkileşim artık kullanıcıya sunulmadığı için ilgili açıklama da değiştirildi.
- Yeni Hero: Tek `<img class="ux-spot__img">` ve doğrudan kullanıcı tarafından verilen PNG URL'si; `loading="eager"`, `fetchpriority="high"`, `decoding="async"`.
- Hero'nun mevcut `aspect-ratio:3/4` konteyneri, responsive kırpma, GSAP reveal animasyonu ve tipografisi korundu.
- Diğer sayfa alanlarında, özellikle Final CTA'da orijinal görsel farklı bir amaçla kullanıldığından korunmuştur.

## Korunanlar

- V2.1'de değiştirilen altı süreç görseli (Keşif, Tanımlama, Tasarım, Prototipleme, Doğrulama, İyileştirme)
- Mobil/masaüstü süreç görseli eşleştirmeleri
- GSAP/ScrollTrigger ve tüm diğer UI/UX etkileşimleri
- Header, Footer, menü, floating controls
- `#080A09` arka plan ve `#A8CF62` vurgu rengi

## Wix Studio yayına alma

- **Sayfa:** `/ui-ux-tasarim`
- **Server URL:** `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@4a5c245d5b1b8da0a5ccfb5e5f89f1ae213dce15/wix-uiux-tasarim-v22/n1-uiux-tasarim-v22.js`
- **Tag Name:** `n1-uiux-tasarim-v22`

1. Wix Studio'da `/ui-ux-tasarim` sayfasını aç.
2. Sayfadaki mevcut Custom Element'i seç.
3. **Choose Source → Server URL** alanını yukarıdaki tam URL ile güncelle.
4. **Tag Name** alanına `n1-uiux-tasarim-v22` yaz.
5. V2.1 elementini kopya olarak bırakma. Kaynağı mevcut öğe üzerinde değiştir.
6. Masaüstü, tablet ve mobil önizlemede Hero'nun kadrajını ve görselin doğal en-boy oranına göre kırpılmasını kontrol et. Ardından diğer interaktif bölümleri test et.
7. **Publish** ile canlıya al.

## Gerçek doğrulamalar ve sınırlar

- GitHub'daki V2.2 dosyası commit'ten yeniden okunup tek Hero görseli, kaldırılan maske, ayrı CSS ID ve altı süreç görseli doğrulandı.
- JavaScript sözdizimi kontrolü başarılı.
- PNG URL'sinin CDN'den indirilebilirliği ve görüntünün yeni kadrajı gerçek Wix Studio tarayıcısında doğrulanmadı.
- GitHub yüklemesi Wix Studio Custom Element URL'sini otomatik güncellemez. **Wix editöründe kaynak güncellemesi ve canlı Publish henüz yapılmadı**.
