# 1N Digital Media — Sosyal Medya V2 Yayın Paketi

**Sayfa URL:** `/sosyal-medya`

**Custom Element Tag Name:** `n1-sosyal-medya-v2`

**Server URL:**
`https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@752d21309a5a877f5e09dc7ff919623c3abe25b4/wix-sosyal-medya-v2/n1-sosyal-medya-v2.js`

**GitHub kodu:** `main`, commit `752d21309a5a877f5e09dc7ff919623c3abe25b4`. Sosyal Medya V1 değiştirilmedi.

## Paket
- `n1-sosyal-medya-v2.js` — üretim Custom Element giriş dosyası.
- `preview.html` — bağımsız önizleme (Wix kaynakları çevrim içi yüklenir).
- `README.md` — teknik kurulum ve mimari.
- `QA_REPORT.md` — Claude'un doğruladığı ve doğrulayamadığı kontroller.
- `DESIGN_RATIONALE.md` — tasarım yaklaşımı.
- `ASSET_MANIFEST.md` — medya kaynakları ve fallback planı.
- Kaynak ZIP'teki ekran görüntüleri, GitHub depoya ikili dosya olarak yüklenmedi.

## Wix Studio'da uygulanması gerekenler
1. `/sosyal-medya` sayfasını Wix Studio görsel editöründe aç.
2. Varsa önceki Sosyal Medya Custom Element'ini **değiştir**; iki sürümü aynı sayfada bırakma.
3. **Choose Source → Server URL** alanına yukarıdaki yeni URL'yi yaz.
4. **Tag Name** = `n1-sosyal-medya-v2` olarak ayarla.
5. Elementi tam genişlikte ve içerik kesilmeyecek doğal yükseklikte konumlandır. Başka bir Header/Footer/WhatsApp bileşeni ekleme.
6. Önce Wix Test Site üzerinde 390 px mobil, 820 px tablet ve masaüstünde video, sekmeler, menü, Footer ve yüzen kontrolleri denetle.
7. Ardından Studio Editor'de **Publish** ile canlıya al.

## Kalan riskler
- Bu repo commit'i, Wix Studio'daki Custom Element kaynağını otomatik güncellemez; canlı site hâlen önceki kaynakta olabilir.
- Wix'in dış Custom Element kapsayıcı yüksekliği, gerçek Safari/Android cihazlar ve performans verileri yerel Chromium QA'inde doğrulanmadı.
- Hareket videosu sosyal ağ platform simgelerini içeriyor; marka kullanımı açısından yayın öncesi gözden geçir.
- Github kaynak dosyası ve dokümanlar doğrulandı. Gerçek Wix Editor'de kaynak değişimi ve Publish bu dosya yüklemesinin bir parçası değildir.
