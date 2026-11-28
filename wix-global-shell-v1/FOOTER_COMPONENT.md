# FOOTER_COMPONENT — `n1-global-footer-v1`

Orijinal kurumsal footer'ın bağımsız hâli. Ayrı bir kopya değildir: kurumsal sayfaların kullandığı işaretlemeyi (site işaretlemesi v16 içindeki `[data-n1-footer]`), footer CSS v636'yı ve footer JS v646'yı (@d24fa37) **aynı adreslerden** yükler. Kurumsal footer değişirse bu bileşen de aynı kaynaktan beslenir.

## İçerik (testte tek tek doğrulandı)
- Marka bloğu.
- 4 SVG sosyal medya simgesi (img değil, SVG).
- Adres, telefon (`tel:`), e-posta (`mailto:`).
- Yasal bağlantılar.
- 5 partner logosu. TikTok gri ve görünür (opaklık/kontrast ölçüldü).
- Copyright; yıl çalışma anında güncellenir.

## Yerleşim
- Dış genişlik %100 (Wix bölümü), arka plan #080A09, içerik %90.
- Ek dış boşluk yok. Mobil yerleşim korunur: üst kısım tek sütun, marka 45 px.
- Altta boşluk yok: footer'ın alt kenarı sayfanın sonuna eşit ölçüldü (fark 0 px).

## Ölçülen yükseklikler (Chromium, içerikten gelen)
Güncel değerler: DEPLOYMENT.md §4 ve TEST_REPORT. Yazı tipi yükleme farkı nedeniyle WebKit birkaç piksel farklı ölçebilir. Bu yüzden Wix'te yükseklik **Auto** önerilir.

## Wix ayarları ve alt boşluk
DEPLOYMENT.md §4:
- Son bölüm olmalı; iç ve dış boşluk 0.
- Öğe yüksekliği Auto.
- Sayfanın Wix footer'ı gizli olmalı.

## Partner görselleri
Partner `<picture>` görselleri, kurumsal footer'daki Wix Medya PNG'leridir (2 dosya, 200 image/png; CDN_VERIFICATION). Yeniden yüklenmedi, kopyalanmadı.

## WhatsApp / Yukarı Çık — `n1-global-floating-v1` (isteğe bağlı)
- Onaylı katmanı (floating controls v632 @d24fa37) aynı Server URL'den, ayrı etiketle yükler. Yeni bir bileşen yazılmadı, kopyalanmadı.
- `body.n1-inner-fc-enabled` ekler.
- Sayfada zaten bir katman varsa çizim yapmaz (çift WhatsApp düğmesi oluşmaz).
