# CDN_VERIFICATION — jsDelivr doğrulaması (28 Kasım 2026)

Script: `bash wix-global-shell-v1/wix-custom-code/verify-cdn-shell.sh` (depo kökünden; tekrar çalıştırılabilir). Ham çıktı: `qa/cdn-shell.log`.

Kontroller:
- Her depo adresine **10 istek** gönderilir; hepsi 200 dönmeli.
- MIME doğru olmalı: JS `application/javascript`, CSS `text/css`, WebP `image/webp`.
- CORS: `Origin` başlığıyla istendiğinde `access-control-allow-origin: *` dönmeli.
- **Bütünlük:** indirilen dosyanın SHA-256'sı, git'teki aynı commit'in dosyasıyla birebir aynı olmalı.

Bütün adresler dal adıyla değil, **tam commit SHA'sıyla** sabitlenmiştir.

**Sonuç: TAMAM — 29 adres** (27 depo adresi + 2 Wix Medya PNG). Hepsi 200, MIME doğru, CORS `*`, içerik eşleşiyor.

| Dosya | Commit | İstek | MIME | CORS | SHA-256 |
|---|---|---|---|---|---|
| `wix-global-shell-v1/n1-global-shell-v1.js` | `144d964` | 10/10 × 200 | `application/javascript` | `*` | eşleşiyor (`3fb5539ecc0f0743…`, 17022 B) |
| `wix-global-shell-v1/modules/n1-header-v14.js` | `9bbcefd` | 10/10 × 200 | `application/javascript` | `*` | eşleşiyor (`cec079893e78bbee…`, 33120 B) |
| `wix-global-shell-v1/site/n1-site-markup-v16.js` | `9bbcefd` | 10/10 × 200 | `application/javascript` | `*` | eşleşiyor (`8be43d84f6949530…`, 39254 B) |
| `wix-global-shell-v1/pages/n1-career-v2.js` | `144d964` | 10/10 × 200 | `application/javascript` | `*` | eşleşiyor (`91c9655ee5cd874f…`, 34032 B) |
| `wix-global-shell-v1/sites/home/n1-site-wix-v661.js` | `144d964` | 10/10 × 200 | `application/javascript` | `*` | eşleşiyor (`c69bf3be98262d11…`, 58351 B) |
| `wix-global-shell-v1/sites/pages/wix-kreatif-produksiyon-v26/n1-kreatif-produksiyon-v26.js` | `144d964` | 10/10 × 200 | `application/javascript` | `*` | eşleşiyor (`4b11303fb3ec6df2…`, 110892 B) |
| `wix-global-shell-v1/sites/pages/wix-e-ticaret-yonetimi-v27/n1-e-ticaret-yonetimi-v27.js` | `144d964` | 10/10 × 200 | `application/javascript` | `*` | eşleşiyor (`29684e33675557d7…`, 100505 B) |
| `wix-global-shell-v1/sites/pages/wix-sosyal-medya-v30/n1-sosyal-medya-v30.js` | `144d964` | 10/10 × 200 | `application/javascript` | `*` | eşleşiyor (`0efa763ee7cd01b0…`, 103275 B) |
| `wix-global-shell-v1/sites/pages/wix-reklam-yonetimi-v26/n1-reklam-yonetimi-v26.js` | `144d964` | 10/10 × 200 | `application/javascript` | `*` | eşleşiyor (`ce2a22bcd5bef78a…`, 113921 B) |
| `wix-global-shell-v1/sites/pages/wix-uiux-tasarim-v32/n1-uiux-tasarim-v32.js` | `144d964` | 10/10 × 200 | `application/javascript` | `*` | eşleşiyor (`51ec2d3496b43fc4…`, 136269 B) |
| `wix-global-shell-v1/sites/pages/wix-yapay-zeka-v5/n1-yapay-zeka-v5.js` | `144d964` | 10/10 × 200 | `application/javascript` | `*` | eşleşiyor (`1a8a9633e852d46a…`, 116366 B) |
| `wix-global-shell-v1/sites/pages/wix-uygulama-gelistirme-v5/n1-uygulama-gelistirme-v5.js` | `144d964` | 10/10 × 200 | `application/javascript` | `*` | eşleşiyor (`859ce7ed5450ed36…`, 189725 B) |
| `wix-global-shell-v1/sites/pages/wix-kisaca-biz-v3/n1-kisaca-biz-v3.js` | `144d964` | 10/10 × 200 | `application/javascript` | `*` | eşleşiyor (`9d6c5e49c568ac11…`, 62216 B) |
| `wix-global-shell-v1/sites/pages/wix-markalar-v13/n1-markalar-v13.js` | `144d964` | 10/10 × 200 | `application/javascript` | `*` | eşleşiyor (`d1d270cdc9840ffa…`, 238501 B) |
| `wix-global-shell-v1/sites/pages/wix-yasal-sayfalar-v3/n1-yasal-sayfalar-v3.js` | `144d964` | 10/10 × 200 | `application/javascript` | `*` | eşleşiyor (`65390bb748126e7e…`, 114584 B) |
| `wix-global-shell-v1/assets/platforms/01-zeyp-160.webp` | `9a8e261` | 10/10 × 200 | `image/webp` | `*` | eşleşiyor (`c33ea79d77297e26…`, 4390 B) |
| `wix-global-shell-v1/assets/platforms/01-zeyp-320.webp` | `9a8e261` | 10/10 × 200 | `image/webp` | `*` | eşleşiyor (`8c79856b031d679b…`, 10716 B) |
| `wix-global-shell-v1/assets/platforms/02-market-160.webp` | `9a8e261` | 10/10 × 200 | `image/webp` | `*` | eşleşiyor (`a9ed58c38420a7cb…`, 5838 B) |
| `wix-global-shell-v1/assets/platforms/02-market-320.webp` | `9a8e261` | 10/10 × 200 | `image/webp` | `*` | eşleşiyor (`ee28b014d4a1604b…`, 12172 B) |
| `wix-global-shell-v1/assets/platforms/03-hemen-tikla-160.webp` | `9a8e261` | 10/10 × 200 | `image/webp` | `*` | eşleşiyor (`acea8c1674d3e94a…`, 1104 B) |
| `wix-global-shell-v1/assets/platforms/03-hemen-tikla-320.webp` | `9a8e261` | 10/10 × 200 | `image/webp` | `*` | eşleşiyor (`052b4fae5f489220…`, 2390 B) |
| `wix-global-shell-v1/assets/platforms/04-intelligence-160.webp` | `9a8e261` | 10/10 × 200 | `image/webp` | `*` | eşleşiyor (`bdf9e8b6d72dde3d…`, 3926 B) |
| `wix-global-shell-v1/assets/platforms/04-intelligence-320.webp` | `9a8e261` | 10/10 × 200 | `image/webp` | `*` | eşleşiyor (`57babf47030de6dc…`, 8836 B) |
| `wix-full-v1/modules/n1-footer-v646.js` | `d24fa37` | 10/10 × 200 | `application/javascript` | `*` | eşleşiyor (`d02942e62fdb1938…`, 5381 B) |
| `wix-full-v1/modules/n1-footer-v636.css` | `d24fa37` | 10/10 × 200 | `text/css` | `*` | eşleşiyor (`24e0370cbb2d0de5…`, 5333 B) |
| `wix-full-v1/modules/n1-floating-controls-v632.js` | `d24fa37` | 10/10 × 200 | `application/javascript` | `*` | eşleşiyor (`2102fd396ac2f7ab…`, 16986 B) |
| `wix-studyo-v1/site/n1-inner-responsive-v6.css` | `09612df` | 10/10 × 200 | `text/css` | `*` | eşleşiyor (`02e8d45793c82cb6…`, 17497 B) |
| Wix Medya `6dbf5e_800ff5a00ba244f9bb31761a6b2d713d~mv2.png` | (Wix) | 200 | `image/png` | — | 27010 B |
| Wix Medya `6dbf5e_32b849155e954320a1f6479f27fd6ad2~mv2.png` | (Wix) | 200 | `image/png` | — | 33275 B |

Tam SHA'lar:
| Kısa | Tam | İçerik |
|---|---|---|
| `144d964` | `144d964a795e515e3b79f0e39c0eeee244a786f8` | paket, kariyer v2, 11 sayfa dosyası |
| `9bbcefd` | `9bbcefd65becbc196baebea26600060b01af406c` | header v14, menü verisi v16 |
| `9a8e261` | `9a8e261f72975ccc5d94d33dfe9e6313b4e8f5dd` | platform logoları |
| `d24fa37` | `d24fa373d6d76c0218b3f3b77897a8c2ace04e5e` | footer, floating (değişmedi) |
| `09612df` | `09612df97e85978976d13edbd79dad0adcc1d1f1` | ortak duyarlı CSS (değişmedi) |

Yeni bir commit'in dosyaları jsDelivr'de ilk dakikalarda 403 dönebilir. Script bu durumda "BEKLEYİN/KONTROL" yazar. 1–2 dakika bekleyip tekrar çalıştırın; sonuç TAMAM olmadıkça Wix'e geçmeyin.
