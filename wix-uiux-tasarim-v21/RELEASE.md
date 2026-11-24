# 1N — UI/UX Tasarım V2.1

## Revizyon

`/ui-ux-tasarim` sayfasındaki **HER İYİ DENEYİMİN BİR MANTIĞI VAR** tasarım süreci bölümünde altı aşamanın görselleri değiştirildi.

Masaüstü/tablet için `.ux-proc__frame .ux-proc__img` sahnesi ve mobil için `.ux-st__fig .ux-st__img` görselleri aynı altı kaynakla güncellendi. Görsel değişim mantığı, animasyonlar, süreç metinleri, diğer sayfa görselleri ve tüm etkileşimli UI demoları korunur.

| Sıra | Aşama | Yeni görsel |
|---|---|---|
| 01 | Keşif | https://static.wixstatic.com/media/6dbf5e_2b9f938206d14b5e81bcc471ee445150~mv2.jpg |
| 02 | Tanımlama | https://static.wixstatic.com/media/6dbf5e_045521fe819c455fa19615f94f7825b2~mv2.jpg |
| 03 | Tasarım | https://static.wixstatic.com/media/6dbf5e_91290906ba324d6b8d515e02d6ee037b~mv2.jpg |
| 04 | Prototipleme | https://static.wixstatic.com/media/6dbf5e_caafc3cb0dce40ae9b4cd1be3cde5145~mv2.jpg |
| 05 | Doğrulama | https://static.wixstatic.com/media/6dbf5e_8281c4859bd04de18739b74be080349c~mv2.jpg |
| 06 | İyileştirme | https://static.wixstatic.com/media/6dbf5e_c568d39f92d247c4b7762337dfac03ab~mv2.jpg |

Orijinal sahnedeki dördüncü görsele özel agresif büyütme/kırpma işareti yeni resme taşınmadı. Yeni fotoğraflar için başlangıç merkezi kadrajdır. Gerçek görsellerin konuya göre son kadraj kontrolü Wix Studio önizlemesinde yapılmalıdır.

## Korunanlar

- Header, Footer, ana menü, WhatsApp ve Yukarı Çık
- GSAP / ScrollTrigger süreç geçişleri
- Experience in Action, Interface Lab ve erişilebilirlik demoları
- Sayfanın diğer medyaları ve içerikleri
- `#080A09` / `#A8CF62` renk sistemi

## Wix Studio

- **Sayfa:** `/ui-ux-tasarim`
- **Server URL:** `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f292a487d4f48a888a44d87e4f8a05e8b586f735/wix-uiux-tasarim-v21/n1-uiux-tasarim-v21.js`
- **Tag Name:** `n1-uiux-tasarim-v21`

1. Wix Studio'da `/ui-ux-tasarim` sayfasını aç.
2. Sayfadaki **mevcut** Custom Element'i seç.
3. **Choose Source → Server URL** adresini güncelle.
4. **Tag Name** değerini `n1-uiux-tasarim-v21` yap.
5. Eski V2 elementini ayrıca sayfaya ekleme.
6. Önizlemede altı görselin sıralamasını, mobil/tablet kadrajlarını, kaydırmaya bağlı aşama geçişlerini ve sayfa yüksekliğini kontrol et.
7. Uygunsa **Publish** ile canlıya al.

## Doğrulama ve sınırlamalar

- GitHub'daki V2.1 dosyası tekrar okunup yeni altı medya ID'si ve her iki görsel alanı doğrulandı.
- JavaScript sözdizimi kontrolü başarılı.
- V2.1 yeni bir dosyadır, orijinal V2 silinmedi ya da değiştirilmedi.
- Görsellerin Wix CDN üzerinden gerçek yüklenmesi, yeni kadrajları ve Wix Studio canlı sayfa testi bu oturumda doğrulanamadı.
- GitHub'a dosya yüklemek Custom Element'in Wix Studio kaynağını **otomatik değiştirmez**; ilgili alanlar güncellenmeden yalnızca Wix Publish işlemi V2.1'i canlıya almaz.
