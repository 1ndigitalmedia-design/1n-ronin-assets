# 1N Digital Media — AI / Yapay Zekâ V1
## Beyond the Prompt / Fikrin Ötesindeki Zekâ

### Kurulum
- **Sayfa:** `/yapay-zeka`
- **Menü:** AI (onaylı mevcut Header menü yapısı değiştirilmedi)
- **Tag Name:** `n1-yapay-zeka-v1`
- **Server URL:** `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@e6a88e04fad47aa8c3891e4e41a6a207eb89ac7d/wix-yapay-zeka-v1/n1-yapay-zeka-v1.js`
- **Kaynak commit:** `e6a88e04fad47aa8c3891e4e41a6a207eb89ac7d`

### İçerik ve tasarım
- Dokuz bölüm: Hero → İnsan × Zekâ → AI Creative Production → Creative Lab → Idea to Output → Motion Storytelling → Responsible Intelligence → Future → CTA.
- Beş verilen Wix görseli ve üç verilen Wix video bağlantısı kullanılır.
- Hero video: `8da46d06b07a4784a27a413446f081f9` (720p).
- Üretim videosu: `e177591c89e44710be97a52b3e6284f1` (1080p).
- Anlatı videosu: `6c47eb3e5ef6409fb3285c7623d6054f` (1080p).
- GSAP/ScrollTrigger; pin/spacer oluşturmaz; renkler `#080A09` ve `#A8CF62`.
- Creative Lab: Cinematic, Editorial ve Experimental yorumları; yalnızca hazır görsellerden örnek sunumlar, **AI API ile görsel üretimi yoktur**.
- Onaylı Header v648, Footer v646, floating controls ve menü bağlantıları korunur.

### Wix Studio sayfasında yayına alma

1. Wix Studio'da var olan `/yapay-zeka` sayfasını aç. Sayfada başka bir hizmete ait yanlış Custom Element varsa **onu güncelle veya değiştir**; üstüne ikinci bir tam sayfa Custom Element ekleme.
2. Mevcut veya yeni tek bir **Custom Element** öğesini seç.
3. **Server URL** değerini yukarıdaki tam jsDelivr adresiyle değiştir.
4. **Tag Name** değerini tam olarak `n1-yapay-zeka-v1` yap.
5. Genişliği bölümü kaplayacak biçimde ayarla; dış kutu yüksekliği için Wix Studio'nun uygun duyarlı davranışını kullan. **Sabit 5000–10000 px yüksekliğe veya orantılı ölçeklemeye zorlamak** kesilme ve aşırı boşluk üretebilir.
6. Masaüstü, tablet ve mobil önizlemede Header/Footer'ın tek olduğunu, medya yüklenmesini, Lab'in 3 durumunu, CTA'ları, alt boşluğu ve dokunmatik/video davranışlarını kontrol et.
7. Kontroller başarılıysa Wix Studio'da **Publish** ile canlıya al. Site ana yayın komutu, sayfa Custom Element'i değişmeden çalıştırılırsa bu V1 kodunu siteye eklemez.

### Doğrulama ve önemli sınırlar
- 25 Kasım 2026: Yüklenen **orijinal Claude JS dosyası** repo commit'inden okunup orijinaliyle karakter bazında eşleşecek şekilde doğrulandı. JS sözdizimi `node --check` ile başarılı.
- Claude teslim paketinde 20 gerçek ekran görüntüsü, Playwright/Chromium QA raporu ve etkileşim teknik belgesi bulunuyor; bunlar kullanıcıya sunulan orijinal ZIP içindedir.
- Bu entegrasyonda Wix Studio Custom Element düzenleme yetkisi desteklenmiyor. **Wix Studio editöründeki URL/Tag Name güncellemesi ve gerçek canlı yayın henüz yapılmadı.**
- Wix dış kapsayıcı yüksekliği, iOS/Android gerçek cihaz testi, canlı Wix video akışı, erişilebilirlik ekran okuyucusu ve performans ölçümleri bu oturumda bağımsız olarak doğrulanmadı.
