# 1N Sosyal Medya — V2.4 / Kapanış Videosu

## Yapılan değişiklik

- Sayfa: `/sosyal-medya`
- Bölüm: **MARKANIZIN HİKÂYESİNİ BİRLİKTE ANLATALIM.**
- Değişen alan: final CTA sağındaki eski statik görsel (`figure.sm-fin__fig`).
- Yeni medya: `https://video.wixstatic.com/video/6dbf5e_f14a9f803bc442838bfe159f0aa49e72/1080p/mp4/file.mp4`
- Kaynak tüm cihazlarda tam olarak verilen **1080p** adresidir; doğrulanmamış 720p/480p adresleri türetilmez.
- Film `muted`, `playsinline`, `loop` ve `preload="none"` davranışıyla çalışır.
- Görüntü oranı, mevcut final dikey görsel alanının **9:16** kapsayıcısında `object-fit:cover` olarak korunur; kadrajın gerçek video içeriğine uygunluğu Wix'te kontrol edilmelidir.
- Görünmeyen video durur, kaynak bölüme yaklaşılana kadar yüklenmez, oynat/duraklat butonu erişilebilirdir.
- Hareket azaltma ve veri tasarrufu tercihlerinde otomatik oynatılmaz.
- Film yüklenemediğinde eski statik görsel poster/fallback olarak kalır.
- Önceki GSAP reveal efekti artık final video kapsayıcısına uygulanır.
- **Not:** Önceki sürümde final görseli 767 px ve altında gizliydi. Mevcut mobil gizleme davranışı değiştirilmedi; mobilde bu final videosu da gösterilmez.

## Korunanlar

- Hero: `67c5c858b42a4ce3b0e76195a59c8b3e` videosu
- Strateji: `044b3674636a4813b20f3f7dd8a402fe` 480p videosu + dört JPG
- Hareket: `c530416b744a449cba5892bc85e2bdae` 720p videosu
- Onaylı Header/Footer/menü/floating controls, GSAP/ScrollTrigger, `#A8CF62`.

## Wix Studio kurulum

- **Sayfa:** `/sosyal-medya`
- **Tag Name:** `n1-sosyal-medya-v24`
- **Server URL:** `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@0530479e9bcd17c7e05c3fbd8a8fd300503fb2ef/wix-sosyal-medya-v24/n1-sosyal-medya-v24.js`

1. Wix Studio'da `/sosyal-medya` sayfasını aç.
2. Eski Custom Element'i seç. Başka Custom Element ekleyip çift içerik oluşturma.
3. **Choose Source → Server URL** değerini yukarıdaki URL ile değiştir.
4. **Tag Name** değerini `n1-sosyal-medya-v24` yap.
5. Önizlemede masaüstü/tablet final videosu, oynat/duraklat, sayfa yüksekliği, GSAP, Header/Footer ve video kadrajını kontrol et.
6. Uygun bulduktan sonra **Publish** ile canlıya al.

## Test/Dağıtım durumu

- JavaScript sözdizimi kontrolünden geçti.
- GitHub deposundaki yeni kaynak tekrar okunarak etiket, video ID'leri ve final HTML işaretlemesi doğrulandı.
- Video CDN indirmesi ve Wix Studio içindeki canlı medya oynatma/yerleşim testi yapılmadı.
- GitHub dosyası üretime hazır; **Wix Studio Custom Element kaynağı henüz güncellenmedi ve canlıya alınmadı**. Kaynak değiştirilmeden yalnızca Site Publish API'sinin çalıştırılması V2.4'ü aktarmayacağı ve başka taslakları yanlışlıkla yayınlayabileceği için yapılmadı.
