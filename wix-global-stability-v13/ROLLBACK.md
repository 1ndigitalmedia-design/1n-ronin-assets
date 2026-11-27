# ROLLBACK — V1.3

Her aşama bağımsız geri alınır (DEPLOYMENT §2). Wix Studio → Site Ayarları → Özel Kod / sayfa Custom Element ayarı → **Yayınla**.

| Aşama | Sorun görülürse | Sonuç |
|---|---|---|
| T Test anahtarı | "1N - V1.3 Test Anahtarı (HEAD)" girişini sil | Normal ziyaretçi zaten etkilenmiyordu |
| 1 Capa nav kaldırma | Body-end girişini `wix-global-menu-v12/wix-custom-code/A-rollback-original-nav-body-end.html` içeriğiyle yeniden ekle (Tüm sayfalar · Body - end · Her yeni sayfada yükle). Dosya 26 Kasım canlı koduyla birebir aynı | V1.2 canlı (nav v1.0.1 etkin) |
| 2 Menü kapanışı | "1N - Menü Kapanış V1.3" girişini sil | V1.2 menü (kalıntı kare geri gelir) |
| 3 Loader v13 | "Özel Yükleniyor % Script" içeriğini `wix-custom-code/LOADER-LIVE-BACKUP-ozel-yukleniyor.html` ile değiştir (sayfa seçimi aynı) | Canlı loader v1 (canlı HTML'den alınmış, birebir) |
| 4 Ana sayfa v658 | Ana Sayfa Custom Element Server URL → `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-home-v657/n1-site-wix-v657.js` (etiket `n1-site-v1` aynı) | V1.2 ana sayfa |
| 5 Stabilite | Body-end stabilite girişini sil | C |

Test sırasında anlık geri dönüş (yalnız o sekme): `?n1t=A` (menü düzeltmesi kapalı), `?n1t=0` (test anahtarı kapalı).

## Daha eski geri dönüş noktaları (değişmedi)
- V1.2 geri dönüşü: `wix-mobile-stability-v1/ROLLBACK.md` §V1.2 (11 sayfa `f97db8ed` adresleri).
- Tam kurtarma: dal `sitewide-mobile-fix-20261126` @ `f97db8e`; temiz taban `mobile-stability-clean-base-20261126` @ `876de80`.

## Git
Force push yok, geçmiş değiştirilmedi, hiçbir dal ya da eski sürüm dosyası silinmedi. `main` (`99866f2`), temiz taban ve kurtarma dalları değişmedi. V1.3 dosyaları yalnız yeni klasöre (`wix-global-stability-v13/`) eklendi; canlıda kullanılan hiçbir dosya değiştirilmedi.
