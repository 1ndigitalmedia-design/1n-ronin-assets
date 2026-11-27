# ROLLBACK — V1.4 geri dönüş

Her satır bağımsızdır. Wix Studio → sayfa → Custom Element → Ayarlar → **Server URL** alanına aşağıdaki V1.3 adresi → **Yayınla**. Tag Name ve öznitelikler zaten değişmemiştir.

| Sayfa | Tag (değişmez) | Geri dönüş Server URL (canlı V1.3) | Sonuç |
|---|---|---|---|
| Ana Sayfa | `n1-site-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@b9c8fca79bee3d6ab9baca96d19e3888575c9c06/wix-global-stability-v13/home/n1-site-wix-v658.js` | V1.3 ana sayfa (bağlantı yeniden `/studyo-hikayesi`) |
| Kreatif Prodüksiyon | `n1-kreatif-produksiyon-v23` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-kreatif-produksiyon-v23/n1-kreatif-produksiyon-v23.js` | V1.2/V1.3 |
| E-Ticaret Yönetimi | `n1-e-ticaret-yonetimi-v23` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@997f951a4ae76ab2dd95440c4e8e597ffa682499/wix-global-stability-v13/pages/wix-e-ticaret-yonetimi-v24/n1-e-ticaret-yonetimi-v24.js` | V1.3 (v24) |
| Sosyal Medya | `n1-sosyal-medya-v27` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-sosyal-medya-v27/n1-sosyal-medya-v27.js` | V1.2/V1.3 |
| Reklam Yönetimi | `n1-reklam-yonetimi-v23` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-reklam-yonetimi-v23/n1-reklam-yonetimi-v23.js` | V1.2/V1.3 |
| UI/UX Tasarım | `n1-uiux-tasarim-v28` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@d33a9ffc77cd85f466fcc439518d2b74d639abda/wix-global-stability-v13/pages/wix-uiux-tasarim-v29/n1-uiux-tasarim-v29.js` | V1.3 (v29) |
| Yapay Zekâ | `n1-yapay-zeka-v2` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-yapay-zeka-v2/n1-yapay-zeka-v2.js` | V1.2/V1.3 |
| Uygulama Geliştirme | `n1-uygulama-gelistirme-v2` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-uygulama-gelistirme-v2/n1-uygulama-gelistirme-v2.js` | V1.2/V1.3 |
| Test anahtarı v14 (kurulduysa) | — | İçeriği `wix-global-stability-v13/wix-custom-code/TEST-SWITCH-v13.2-head.html` ile değiştirin ya da girişi kaldırın; cihazda `?n1t=0` | v13.2 |

Bu adresler canlıda bugün kullanılan adreslerdir (canlı HTML'den okundu, `qa/inventory/live-v13.json`). jsDelivr SHA ile sabit, silinmez.

## Daha eski geri dönüş noktaları (değişmedi)
- **V1.3:** `wix-global-stability-v13/ROLLBACK.md`.
- **V1.2:** `wix-mobile-stability-v1/ROLLBACK.md`.
- **Tam kurtarma:** dal `sitewide-mobile-fix-20261126` @ `f97db8e`; temiz taban `mobile-stability-clean-base-20261126` @ `876de80`.

## Git
- V1.4 yalnız yeni klasöre (`wix-mobile-performance-v14/`) ve yeni dala (`mobile-performance-v14`) eklendi.
- Canlıda kullanılan hiçbir dosya değiştirilmedi ya da silinmedi.
- `main`, `mobile-stability-v1-audit`, kurtarma dalları ve temiz taban değişmedi.
- Force push yok, geçmiş yeniden yazılmadı.
