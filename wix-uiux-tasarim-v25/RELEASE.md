# UI/UX Tasarım V2.5 — Hizmetler Kapsamı Sol Görsel Güncellemesi

## Değişiklik

Sayfa: `/ui-ux-tasarim`

Bölüm: **HER EKRANDA AYNI DÜŞÜNCE. FARKLI DENEYİMLER.**

Kullanıcının ekran görüntüsünde sol tarafta yer alan çalışma masası/monitör fotoğrafı yerine şu görsel yerleştirildi:

`https://static.wixstatic.com/media/6dbf5e_8395ead1385a4780a59061b0273629ad~mv2.png`

- Önceki `pic(IM.desk, 'ux-scope__img', ...)` kullanımı bu bölümden kaldırıldı.
- Doğrudan verilen PNG URL'sini kullanan tek `<img class="ux-scope__img">` yerleştirildi.
- Masaüstü `position:sticky` sol görsel yerleşimi, `aspect-ratio:4/5`, `object-fit:cover`, mobil/tablet CSS ve karşısındaki hizmetler listesi korundu.
- Önceki fotoğrafı tanımlayan açıklama yerine nötr bir figcaption kullanıldı: “Farklı ekranlarda tutarlı ve anlaşılır deneyimler.”
- Yeni görselin gerçek oranı kontrol edilmedi; `object-fit:cover` nedeniyle gerekirse Wix önizlemesinden sonra kadraj revizyonu yapılmalıdır.

## Korunanlar

- Hero'daki iki PNG ile fare/dokunma radial-reveal efekti.
- His bölümüne V2.4'te eklenen **720p video**.
- V2.1'de güncellenmiş Keşif, Tanımlama, Tasarım, Prototipleme, Doğrulama, İyileştirme süreç görselleri.
- GSAP/ScrollTrigger, UX demoları, erişilebilirlik örneği.
- Header/Footer, menü, floating controls, `#A8CF62`.

## Wix Studio

- **Sayfa:** `/ui-ux-tasarim`
- **Server URL:** `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@4816cc83a799a48e81144193d9ddfefd3be4a4b2/wix-uiux-tasarim-v25/n1-uiux-tasarim-v25.js`
- **Tag Name:** `n1-uiux-tasarim-v25`

1. Wix Studio'da `/ui-ux-tasarim` sayfasını aç.
2. Sayfadaki mevcut Custom Element'i seç. Yanına ikinci bir öğe ekleme.
3. **Choose Source → Server URL** bağlantısını yukarıdaki URL ile değiştir.
4. **Tag Name** değerini `n1-uiux-tasarim-v25` olarak güncelle.
5. Masaüstü, tablet ve mobil önizlemede kapsam bölümü görseli, yeni kadraj, Hero efekti, His videosu ve altı süreç görselini kontrol et.
6. Uygun olduğunda **Publish** ile canlıya al.

## Kontrol ve sınırlar

- JavaScript sözdizimi kontrolü başarılı.
- GitHub'daki dosya commit üzerinden yeniden okunarak etiket, görsel URL'si ve doğru bölüm eşleştirmesi doğrulandı.
- Yeni görselin Wix CDN üzerinden gerçek yüklenişi ve Wix Studio tarayıcı görünümü test edilmedi.
- GitHub'a dosya eklenmesi Wix Studio Custom Element kaynağını kendiliğinden değiştirmez. **Wix editöründe kaynak ayarı ve canlı yayın henüz yapılmadı.**
