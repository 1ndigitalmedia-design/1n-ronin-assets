# 1N Digital Media — UI/UX Tasarım V2

## Sürüm / Kaynak
- Sayfa: `/ui-ux-tasarim`
- Concept: **Designed to Feel. Built to Work. — Hissedilen Tasarım. İşleyen Deneyim.**
- JavaScript: `n1-uiux-tasarim-v2.js`
- Custom Element **Tag Name**: `n1-uiux-tasarim-v2`
- **Server URL**: `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@72f73d7224b82d6ceb877dd542dfdac381379b3a/wix-uiux-tasarim-v2/n1-uiux-tasarim-v2.js`
- Önceki UI/UX ve diğer hizmet sayfaları değiştirilmedi; bu dosya yeni `wix-uiux-tasarim-v2` klasörüne eklendi.

## İçerik ve etkileşimler
1. UI/UX Hero: kullanıcı konumuna / dokunuşa tepki veren görsel.
2. Tasarım yalnızca görünmez: görsel hiyerarşi ve deneyim.
3. Deneyimi anlatmıyoruz, yaşatıyoruz: Netlik / Akış / Geri Bildirim sekmeleri ve çalışan demolar.
4. Altı aşamalı tasarım süreci.
5. Interface Lab: boşluk, tipografi, kontrast ve buton davranışı ayarları.
6. Farklı ekranlara yönelik hizmet kapsamı.
7. Erişilebilirlik: form geri bildirimi ve kontrast denemesi.
8. Tasarım manifestosu.
9. Final CTA ve onaylı Footer.

## Korunan sistem
- Ana renk: `#080A09`; vurgu: `#A8CF62`
- Barlow / Barlow Condensed
- GSAP 3.13 + ScrollTrigger; reduced-motion desteği
- Onaylı Header `n1-header-v648.js`, Footer `n1-footer-v646.js`, floating controls
- Inline SVG yön ikonları; mobil/tablette emojiye dönüşen Unicode ok kullanılmaz
- ZIP paketindeki görseller Wix medya kütüphanesi adreslerinden yüklenir; video yoktur

## Bağımsız kontrol (ChatGPT, 24.11.2026)
- JavaScript `node --check`: geçti.
- Gerçek kullanıcı ZIP paketindeki 15 ekran görüntüsü incelendi.
- Bağımsız Chromium DOM kontrolleri: 360, 375, 390, 430, 768, 820, 1024, 1366, 1440 ve 1920 px; yatay taşma yok.
- 10 genişlikte 1 Header, 1 Footer, 1 H1; üç UX demo sekmesi var, sekme seçimi çalıştı, JavaScript çalışma hatası yok.
- **Sınır:** Bağımsız Chromium kontrolünde dış bağımlılıklar ve görseller taklit edildi. Bu, GSAP animasyonlarının ve gerçek Wix ortamının uçtan uca testi değildir. Claude QA raporundaki Wix Studio testinin yapılmadığı ifadesi geçerlidir.
- **Wix Studio canlı yayını: henüz yapılmadı.**

## Wix Studio yayına alma
1. Wix Studio'da `/ui-ux-tasarim` sayfasını aç veya henüz yoksa bu slug ile oluştur.
2. Sayfaya bir Custom Element yerleştir veya mevcut öğeyi seç. V1 ile V2'yi aynı sayfada çift yükleme.
3. **Choose Source → Server URL** alanına yukarıdaki commit'e sabit adresi gir.
4. **Tag Name:** `n1-uiux-tasarim-v2`
5. Custom Element genişliği %100, yüksekliği içerikle uyumlu olmalı. Orantılı ölçek kullanma.
6. Masaüstü, tablet ve mobilde Hero, demo sekmeleri, Interface Lab, Header/Footer ve sayfa yüksekliğini Wix önizlemesinde kontrol et.
7. Her şey doğruysa **Publish** ile canlıya al.

## Sınırlama
GitHub'a JS yüklemek Wix Studio sayfasına otomatik eklemez. Mevcut bağlantı üzerinden Studio Custom Element editör ayarlarını değiştiren doğrulanmış bir API bulunmadı. Bu nedenle taslaktaki başka değişiklikleri yanlışlıkla yayına almamak için yalnızca site Publish API'si çalıştırılmadı.

Orijinal Claude ZIP'inde ayrıca README.md, QA_REPORT.md, INTERACTION_SPEC.md, DESIGN_RATIONALE.md, ASSET_MANIFEST.md, preview.html ve 15 ekran görüntüsü yer alır.
