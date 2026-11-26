# ROLLBACK — Geri dönüş

Bu sürüm yalnızca **tek bir Wix özel kod girişini** değiştiriyor. Geri dönüş o girişi eski haline getirmekten ibaret. Sayfa Custom Element'leri hiç değişmediği için onlarda geri dönüş gerekmez.

## 1. Tam geri dönüş (önceki canlı durum)

Wix Studio → Site Ayarları → Özel Kod → "1N - Hizmetler Capa Navigasyonu" → içeriği aşağıdakiyle değiştirin. Ayarlar aynı kalır: Tüm sayfalar · Body - end · Her yeni sayfada yükle.

```html
<script>
window.N1_NAV_CONFIG = {
  home: '/'
};
</script>

<script src="https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@b35d9875ac0e3288c8a8d953428574bdf42a5b61/wix-home-v648/modules/n1-nav-v1.js" defer></script>
```

Bu içerik 26 Kasım 2026'da canlı HTML'den birebir alınmıştır (`qa/results/wix-custom-code-live.json`). Ardından siteyi yayınlayın.

## 2. Kısmi geri dönüş

| Durum | Yapılacak |
|---|---|
| Yalnızca stabilite modülü sorun çıkarıyorsa | `n1-stability-v1.js` satırını silin, nav v1.0.2 satırını bırakın |
| Yalnızca nav v1.0.2 sorun çıkarıyorsa | v1.0.2 satırını §1'deki v1.0.1 satırıyla değiştirin, stabilite satırını bırakın |

## 3. Diğer geri dönüş adresleri (değişmedi, referans)

| Bileşen | Canlı / geri dönüş adresi |
|---|---|
| Ana sayfa v6.56 (canlı) | `…@f97db8edb37f1e1388f276d840e262fc8452b80a/wix-home-v656/n1-site-wix-v656.js` |
| Ana sayfa v6.55 (önceki) | `wix-home-v655/n1-site-wix-v655.js` (temiz tabanda mevcut; Wix'teki önceki adresin commit'i RELEASE notlarından doğrulanmalı) |
| Hizmet sayfaları orijinal (sitewide-fix öncesi) | `wix-video-autoplay-fix-2026-11-25/RELEASE.md` tablosundaki adresler (ör. `@2c5634cf…/wix-kreatif-produksiyon-v23/…`) |
| Temiz başlangıç | dal `mobile-stability-clean-base-20261126` @ `876de80af05318e38638d79fe0f3bb128b1d4007` |
| Tam kurtarma | dal `sitewide-mobile-fix-20261126` @ `f97db8edb37f1e1388f276d840e262fc8452b80a` |

## 4. Git
Bu dalda force push yapılmadı, geçmiş değiştirilmedi, hiçbir dal silinmedi. `main`, `mobile-stability-clean-base-20261126` ve kurtarma dalları değişmedi. Kod geri alınmak istenirse dal birleştirilmez ya da `git revert <commit>` kullanılır.
