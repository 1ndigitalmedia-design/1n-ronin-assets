# ROLLBACK — Geri dönüş (V1.1)

V1.1 yalnızca Wix özel kod girişlerini değiştirir: mevcut body-end girişi ve yeni bir head girişi. Sayfa Custom Element'leri değişmediği için onlarda geri dönüş gerekmez.

## 1. Tam geri dönüş (26 Kasım 2026 canlı durumu)
1. Wix Studio → Site Ayarları → Özel Kod → **HEAD** girişini silin ("1N - Nav Koruma (HEAD)" ya da "1N - V1.1 Test Anahtarı (HEAD)").
2. "1N - Hizmetler Capa Navigasyonu" girişinin içeriğini `wix-custom-code/05-rollback-body-end.html` ile değiştirin. Ayarlar aynı: Tüm sayfalar · Body - end · Her yeni sayfada yükle.
3. Yayınlayın.

`05-rollback-body-end.html` (yorum satırları hariç), canlı HTML'den alınan özel kodla **birebir aynı** doğrulandı (`qa/results/wix-custom-code-live.json`). Playwright ile geri dönüş yapılandırmasında nav 1.0.1 etkin, stabilite modülü yok (TEST_REPORT.md §9).

## 2. Kısmi geri dönüş

| Durum | Yapılacak |
|---|---|
| Yalnızca stabilite modülü sorun çıkarıyor | Body-end'den `n1-stability-v1.1.js` satırını silin; head koruması ve nav v1.0.3 kalır |
| Yalnızca nav v1.0.3 sorun çıkarıyor | Head girişini silin; body-end'de v1.0.3 satırını `05`'teki v1.0.1 satırıyla değiştirin |
| Test anahtarı aşamasında sorun | `?n1v11=0` (yalnız o cihaz) ya da head test girişini silip body-end'e `05`'i koyun |

## 3. Diğer geri dönüş adresleri (değişmedi)

| Bileşen | Adres / dal |
|---|---|
| Ana sayfa v6.56 (canlı) | `…@f97db8edb37f1e1388f276d840e262fc8452b80a/wix-home-v656/n1-site-wix-v656.js` |
| Hizmet sayfaları (canlı) | `…@f97db8ed…/wix-sitewide-mobile-fix-2026-11-26/…` (DEPENDENCY_MAP.md §1) |
| V1.0 dosyaları (yayınlanmadı) | `…@102b76a46417417be9c87d5cc71ce210d8e1f791/wix-mobile-stability-v1/n1-stability-v1.js`, `n1-nav-v1.0.2.js` |
| Temiz başlangıç | dal `mobile-stability-clean-base-20261126` @ `876de80af05318e38638d79fe0f3bb128b1d4007` |
| Tam kurtarma | dal `sitewide-mobile-fix-20261126` @ `f97db8edb37f1e1388f276d840e262fc8452b80a` |

## 4. Git
Force push yapılmadı, geçmiş değiştirilmedi, hiçbir dal silinmedi. `main` (`99866f2`), `mobile-stability-clean-base-20261126` (`876de80`) ve kurtarma dalları değişmedi. Kod geri alınacaksa dal birleştirilmez ya da `git revert` kullanılır.
