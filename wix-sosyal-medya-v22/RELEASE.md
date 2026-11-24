# Sosyal Medya V2.2 — Strateji Bölümü 5 Medya Revizyonu

## Revizyon kapsamı

Sayfa: `/sosyal-medya`

Sadece **HER İÇERİĞİN BİR NEDENİ VAR.** başlıklı Strateji bölümündeki beş aşamanın görsel medyası değiştirilmiştir. Beşli tab etkileşimi, metinler, GSAP animasyonları, mobil/tablet düzeni ve onaylı Header/Footer korunmuştur.

| Sıra | Strateji aşaması | Yeni kaynak |
|---|---|---|
| 01 | Markayı anlamak | `https://video.wixstatic.com/video/6dbf5e_044b3674636a4813b20f3f7dd8a402fe/480p/mp4/file.mp4` |
| 02 | Topluluğu tanımak | `https://static.wixstatic.com/media/6dbf5e_6262e9a67b0946368174e46ee526afe8~mv2.jpg` |
| 03 | Yayın dilini kurmak | `https://static.wixstatic.com/media/6dbf5e_95f2de32bdfd4e16aab6d632d36e0c52~mv2.jpg` |
| 04 | İletişimi sürdürmek | `https://static.wixstatic.com/media/6dbf5e_b01c811daf7844ecacdb404ed347cfd5~mv2.jpg` |
| 05 | Sonuçlardan öğrenmek | `https://static.wixstatic.com/media/6dbf5e_71c7d0b1c9c747bcb4c1105856997a8e~mv2.jpg` |

### İlk strateji videosu

- Video tam olarak verilen **480p** kaynak adresini kullanır; tahmini 720p/1080p adresi üretilmez.
- Sessiz, döngülü ve `playsinline` özellikli oynatıcıdır.
- Yalnızca ilk aşama seçiliyken ve video görünürken otomatik oynatma denenir.
- Aşama değişince, sayfa arka plana geçince veya bölüm görünmez olunca duraklatılır.
- Ses otomatik açılmaz.
- Play/pause düğmesi gerçek inline SVG ile oluşturulmuştur, klavye ile erişilebilir.
- `prefers-reduced-motion` veya veri tasarrufu etkinse otomatik oynatma devre dışıdır; kullanıcı videoyu manuel başlatabilir.
- Video başarısız olursa durum mesajı ve metinsel fallback gösterilir.

## Önceki bölümlerde korunanlar

- Hero: `67c5c858b42a4ce3b0e76195a59c8b3e` 720p videosu
- Hareket: `c2ed46fab1384b26adbbfc8e1f66cf36` videosu
- Final sahnesindeki statik görsel
- Onaylı Header, Footer, WhatsApp, yukarı çık
- `#A8CF62` vurgu rengi

## Wix Studio — Sunucu kaynağı

- **Sayfa:** `/sosyal-medya`
- **Tag Name:** `n1-sosyal-medya-v22`
- **Server URL:** `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@abd07de458cd8f2527c9f43b85c484e353431716/wix-sosyal-medya-v22/n1-sosyal-medya-v22.js`

Wix Studio'da Sosyal Medya sayfasının **mevcut** Custom Element öğesini seçerek **Choose Source → Server URL** alanını güncelleyin ve Tag Name'i `n1-sosyal-medya-v22` yapın. Eski V2.1 ve yeni V2.2 Custom Element'lerini birlikte bırakmayın. 390 px mobil, 820 px tablet ve 1440 px masaüstünde tüm sekmeleri, video kontrollerini, Footer ve doğal yüksekliği kontrol edin; ardından **Publish** yapın.

## Doğrulama sınırları

JavaScript sözdizimi kontrol edildi ve GitHub'daki yeni dosya tekrar okunarak kaynak kimlikleri doğrulandı. Gerçek Wix Studio ortamında 480p videonun oynatılması ve mobil/tablet görsel çıktısı bağımsız olarak doğrulanmadı.

GitHub'a yükleme, Wix Studio Custom Element kaynak ayarını veya canlı Wix sitesini kendiliğinden değiştirmez.
