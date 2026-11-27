# DEPLOYMENT — V1.1 Wix uygulama planı (açık onayınızla, sizin tarafınızdan)

**Bu çalışmada Wix'te hiçbir şey değiştirilmedi ve yayınlanmadı.** Yapıştırılacak kodlar elle yazım hatası olmasın diye dosya olarak hazır: `wix-custom-code/`.

Kod commit'i (CDN sabitlemesi): `bdd12eb7eeb1abdd3c0fada821f5ff3d19d206a2` — iki dosya da jsDelivr'den 200 ve depo ile bayt düzeyinde aynı doğrulandı.

## Aşama 1 — Gerçek cihaz testi (önerilen; normal ziyaretçiyi etkilemez)

Amaç: V1.1'i yalnızca test eden iPhone/iPad'de çalıştırmak. Diğer ziyaretçiler bugünkü canlı davranışı görmeye devam eder.

| Wix girişi | Konum | Sayfalar | Yükleme | İçerik |
|---|---|---|---|---|
| **YENİ** "1N - V1.1 Test Anahtarı (HEAD)" | Head | Tüm sayfalar | Her yeni sayfada | `wix-custom-code/03-test-switch-head.html` |
| Mevcut "1N - Hizmetler Capa Navigasyonu" | Body - end | Tüm sayfalar | Her yeni sayfada | `wix-custom-code/04-test-switch-body-end.html` |

- Test cihazında **bir kez** `https://www.reklam1n.com/?n1v11=1` açın; aynı sekme boyunca tüm sayfalarda V1.1 çalışır. Tanılama için `?n1v11=1&n1diag=1`.
- Uzak-bırakmanın gerçek cihazdaki etkisini ayrıca karşılaştırmak için aynı sekmede `?n1far=1` (açık) / `?n1far=0` (kapalı, varsayılan).
- Kapatmak için `?n1v11=0`. Sekmeyi kapatmak da sıfırlar (sessionStorage).
- Normal ziyaretçide: head'de bayrak okuyan tek satır, body-end'de bugünkü v1.0.1 betiği ve hiçbir şey yüklemeyen bir satır içi kontrol. Playwright doğrulaması TEST_REPORT.md §9'da: normal yolda nav 1.0.1 ve stabilite yok, test yolunda 1.0.3 + 1.1.0.

**Alternatif (sıfır canlı değişiklik):** Wix → Site İşlemleri → Siteyi Çoğalt → çoğaltılan sitede Aşama 2 kodları → ücretsiz `wixsite.com` adresinde test. Dezavantajlar: özel alan adı, çerezler ve ATS davranışı birebir aynı olmayabilir; reklam/izleme kodları test sitesinden de tetiklenir (filtrelenmeli); içerik kopyası güncel tutulmalı.

## Aşama 2 — Üretim (fiziksel cihaz testi başarılıysa)

| Wix girişi | Konum | Sayfalar | Yükleme | İçerik |
|---|---|---|---|---|
| "1N - Nav Koruma (HEAD)" (Aşama 1'deki test anahtarı girişinin yerine) | Head | Tüm sayfalar | Her yeni sayfada | `wix-custom-code/01-production-head.html` |
| "1N - Hizmetler Capa Navigasyonu" | Body - end | Tüm sayfalar | Her yeni sayfada | `wix-custom-code/02-production-body-end.html` |

Neden head girişi şart (nav yükleme sırası riski): Ana sayfa `n1-site-wix-v656.js:468` eski v1.0.1'i kendisi de yüklüyor. Chromium testinde yeni nav 6 sn geciktiğinde, head koruması olmadan **v1.0.1 etkin oldu** (TEST_REPORT.md §3b-C). Koruma varken tüm sıralamalarda v1.0.3 etkin. Head koruması tek satırlık satır içi bir işarettir; ağ isteği yapmaz.

Kapsam: İki modül de kendi içinde yalnızca kurumsal rotalarda çalışır (izin listesi: `/`, 7 hizmet sayfası, `/markalar`, `/kisaca-biz`, yasal sayfalar). Intelligence, admin, giriş, hesap, panel ve müşteri sayfalarında hiçbir dinleyici kurmaz. Ek güvence için Wix'te bu girişlerin "Sayfalara ekle" ayarı **"Seçili sayfalar"** yapılıp yalnızca bu kurumsal sayfalar seçilebilir; bu yapılırsa ana sayfa ve tüm hizmet/yasal sayfaların seçili olduğundan emin olun.

## Custom Element'ler — değişiklik YOK
Sayfa etiketleri ve Server URL'leri aynı kalır (DEPENDENCY_MAP.md §1). V1.1 hiçbir sayfa dosyasını değiştirmez.

## Yayın sonrası 5 dk kontrol
1. Telefonda `https://www.reklam1n.com/?n1diag=1` → sol altta `n1-stability 1.1.0 · mobil=true · n1Nav=1.0.3`.
2. Masaüstü konsol: `__n1Nav.version` → `"1.0.3"`, `__n1NavConflict` → `undefined`, `__n1Stability.report().mobile` → `false`.
3. `https://www.reklam1n.com/intelligence` (yalnızca konsol kontrolü): `__n1Stability.active` → `false`, `__n1Nav.active` → `false`.
4. TEST_REPORT.md §8 fiziksel cihaz senaryosu.

## Bakım
- Ana sayfanın Custom Element adresi değişirse `n1-stability-v1.1.js` içindeki `WARM_HOME` listesi güncellenmeli. Liste eski kalırsa işlev bozulmaz, yalnızca ön yükleme boşa gider.
- Yeni bir kurumsal sayfa eklenirse iki dosyadaki `SCOPE_ALLOW` listesine eklenmeli.

## Pull Request
Draft PR #2 güncellendi; birleştirilmedi. Wix adresleri commit SHA ile sabit olduğu için birleştirme canlıyı etkilemez.
