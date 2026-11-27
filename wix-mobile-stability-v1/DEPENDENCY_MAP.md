# DEPENDENCY_MAP — Canlı sitenin gerçekte yüklediği 1N kaynakları

Kaynak: 26 Kasım 2026, Playwright ile canlı ağ istekleri (`qa/results/netmap.json`) + canlı HTML'deki Wix özel kod girişleri (`qa/results/wix-custom-code-live.json`). Kısaltma: `J = https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@`

## 1. Sayfa → Custom Element (canlı)

| Sayfa | Etiket (Tag Name) | Server URL (canlı) |
|---|---|---|
| `/` (Wix sayfa adı "Ana Sayfa", slug `n1-full-test`) | `n1-site-v1` | `J f97db8edb37f1e1388f276d840e262fc8452b80a/wix-home-v656/n1-site-wix-v656.js` |
| `/kreatif-produksiyon` | `n1-kreatif-produksiyon-v23` | `J f97db8ed…/wix-sitewide-mobile-fix-2026-11-26/wix-kreatif-produksiyon-v23/n1-kreatif-produksiyon-v23.js` |
| `/e-ticaret-yonetimi` | `n1-e-ticaret-yonetimi-v23` | `J f97db8ed…/wix-sitewide-mobile-fix-2026-11-26/wix-e-ticaret-yonetimi-v23/n1-e-ticaret-yonetimi-v23.js` |
| `/sosyal-medya` | `n1-sosyal-medya-v27` | `J f97db8ed…/wix-sitewide-mobile-fix-2026-11-26/wix-sosyal-medya-v27/n1-sosyal-medya-v27.js` |
| `/reklam-yonetimi` | `n1-reklam-yonetimi-v23` | `J f97db8ed…/wix-sitewide-mobile-fix-2026-11-26/wix-reklam-yonetimi-v23/n1-reklam-yonetimi-v23.js` |
| `/ui-ux-tasarim` | `n1-uiux-tasarim-v28` | `J f97db8ed…/wix-sitewide-mobile-fix-2026-11-26/wix-uiux-tasarim-v28/n1-uiux-tasarim-v28.js` |
| `/yapay-zeka` | `n1-yapay-zeka-v2` | `J f97db8ed…/wix-sitewide-mobile-fix-2026-11-26/wix-yapay-zeka-v2/n1-yapay-zeka-v2.js` |
| `/uygulama-gelistirme` | `n1-uygulama-gelistirme-v2` | `J f97db8ed…/wix-sitewide-mobile-fix-2026-11-26/wix-uygulama-gelistirme-v2/n1-uygulama-gelistirme-v2.js` |
| `/markalar` | `n1-markalar-v11` | `J f97db8ed…/wix-sitewide-mobile-fix-2026-11-26/wix-markalar-v1/n1-markalar-v11.js` |
| `/kisaca-biz` | `n1-kisaca-biz-v1` | `J f97db8ed…/wix-sitewide-mobile-fix-2026-11-26/wix-kisaca-biz-v1/n1-kisaca-biz-v1.js` |
| `/kvkk-aydinlatma-metni` (örnek yasal sayfa) | `n1-kvkk-aydinlatma-v1` | `J f97db8ed…/wix-sitewide-mobile-fix-2026-11-26/wix-yasal-sayfalar-v1/n1-yasal-sayfalar-v1.js` |

`f97db8ed…` = `f97db8edb37f1e1388f276d840e262fc8452b80a`. Diğer yasal sayfalar (gizlilik, çerez, kullanım koşulları, veri sahibi başvuru) aynı dosyayı farklı etiketlerle kullanır; bu çalışmada yalnızca KVKK canlıda doğrulandı.

Ana sayfa öğesinin canlı öznitelikleri: `code-base=J 376e9ae1…/wix-full-v1/`, `assets-base=J f142fafe…/wix-full-v1/aktarim-medya/`, `ronin-base=J dbd9df18…/wix-v647/media/`. v6.56 kod tabanını içeride sabit `d24fa373…` adresine bağlıyor. `code-base` özniteliği kullanılmıyor.

## 2. Ortak modüller ve canlı ↔ GitHub karşılaştırması

| Dosya | Canlı commit | Kullanan | Temiz tabanla |
|---|---|---|---|
| `wix-home-v648/modules/n1-nav-v1.js` | `b35d9875…` | Tüm sayfalar (Wix özel kod) + ana sayfa (`n1-site-wix-v656.js:80`) | Aynı |
| `wix-home-v648/modules/n1-header-v648.js` | `d24fa373…` | Tüm sayfalar | Aynı |
| `wix-home-v648/site/n1-site-markup-v648.js` | `d24fa373…` | Tüm sayfalar | Aynı |
| `wix-full-v1/modules/n1-footer-v646.js` + `n1-footer-v636.css` | `d24fa373…` | Tüm sayfalar | Aynı |
| `wix-full-v1/modules/n1-links-v646.js` | `d24fa373…` | Tüm sayfalar | Aynı |
| `wix-full-v1/modules/n1-floating-controls-v632.js` | `d24fa373…` | Tüm sayfalar | Aynı |
| `wix-studyo-v1/site/n1-inner-responsive-v6.css` | `09612df9…` | İç sayfalar | **Tabanda yoktu** → bu dala aynen eklendi (`dd8e6d4`) |
| `wix-full-v1/site/n1-site-base-v1.css` + 11 modül CSS + 13 modül JS (partners, stats, about, contact-cta, ecosystem, gads, brands, showreel, sectors, service-links, gsap-vault-mit, onizleme, samurai-video CSS, video-band CSS) | `d24fa373…` | Ana sayfa | Aynı |
| `wix-home-v656/modules/{n1-m5-build,n1-video-m5,n1-home-m5}.js`, `site/n1-home-m5.css`, `media/ronin-m5-film.mp4`, `media/ronin-m5-poster.webp` | `f97db8ed…` | Ana sayfa (mobil/tablet) | Aynı |
| `wix-full-v1/aktarim-medya/img/partners/*` | `f142fafe…`, `d24fa373…` | Footer | — |
| GSAP 3.13.0 `gsap.min.js`, `ScrollTrigger.min.js` (+ `SplitText.min.js` ana sayfa, `Flip.min.js` Markalar) | cdnjs | Tüm sayfalar | Harici, sürüm sabit, SRI yok |

47 canlı JS/CSS dosyasından 46'sı `git hash-object` ile temiz tabandaki dosyayla bayt düzeyinde aynı. `d24fa373…` commit'i GitHub'daki hiçbir dalda yok; jsDelivr onu önbellekten sunuyor. Dosya içerikleri temiz tabanla aynı, ancak bu adresin uzun vadede kalıcılığı garanti değil (öneri: ortak modüller bir sonraki sürümde temiz hatta sabit bir commit'e taşınmalı).

## 3. Wix özel kod girişleri (canlı)

| Ad | Konum | Sayfalar | Her sayfada yükle | İçerik |
|---|---|---|---|---|
| 1N - Hizmetler Capa Navigasyonu | Body end | Tüm sayfalar | Evet (`loadOnce:false`) | `N1_NAV_CONFIG={home:'/'}` + `n1-nav-v1.js@b35d9875` `defer` |
| Özel Yükleniyor % Script | Head | 13 sayfa (ana sayfa, 7 hizmet, markalar, kısaca biz, yasal) | Evet | Tam ekran % yükleyici, `setInterval(checkRoute,500)` |
| Sayfa Yükleniyor Script | Head | 14 müşteri sayfası | Evet | Eski yükleyici (1N sayfalarında değil) |

## 4. Bulunamayan / doğrulanamayan bağlantılar
- Wix Editor'daki Custom Element ayarları (Server URL alanı) doğrudan okunamadı. Değerler canlı ağ isteklerinden çıkarıldı.
- `/ekibimize-katil`, `/acik-pozisyonlar`, `/reklam-ajansi` (Akademi), `/teklif-al`: Wix sayfa listesinde yok ya da bu çalışmada açılmadı.
- `n1-studyo-v1`, `n1-yaratici-v1` etiketleri yalnızca yükleyici özel kodunda geçiyor; ilgili sayfalar canlı sayfa listesinde bulunamadı.
- Ortamın engellediği üçüncü taraf hostlar: `browser.sentry-cdn.com`, `graphs.bestfreecdn.com`, `*.wixappcloud.com`, Google Ads/Analytics, Facebook. Bunların davranışı ölçülemedi.

## 5. Bu çalışmanın eklediği yeni bağımlılıklar (V1.1 — yayınlanacak olan)

| Dosya | Commit | Nerede yüklenecek | Kapsam |
|---|---|---|---|
| `wix-mobile-stability-v1/n1-nav-v1.0.3.js` | `bdd12eb7eeb1abdd3c0fada821f5ff3d19d206a2` | Wix özel kod, body end (v1.0.1'in yerine) | Kurumsal rotalar |
| `wix-mobile-stability-v1/n1-stability-v1.1.js` | `bdd12eb7eeb1abdd3c0fada821f5ff3d19d206a2` | Wix özel kod, body end | Kurumsal rotalar, yalnız mobil/tablet profili |
| Satır içi head koruması (`wix-custom-code/01-production-head.html`) | — (ağ isteği yok) | Wix özel kod, head | Tüm sayfalar (yalnızca bir işaret yazar) |

İki dosya da jsDelivr'den 200 ve depo dosyasıyla bayt düzeyinde aynı doğrulandı.

**Kurumsal kapsam (izin listesi, iki dosyada aynı):** `/`, `/n1-full-test`, `/kisaca-biz`, `/markalar`, `/kreatif-produksiyon`, `/e-ticaret-yonetimi`, `/sosyal-medya`, `/reklam-yonetimi`, `/ui-ux-tasarim`, `/yapay-zeka`, `/uygulama-gelistirme`, `/kvkk-aydinlatma-metni`, `/cerez-politikasi`, `/kullanim-kosullari`, `/gizlilik`, `/gizlilik-politikasi`, `/veri-sahibi-basvuru-formu`.

**Açık red listesi (önceliklidir):** yol parçası `intelligence`, `admin`, `dashboard`/`dasboard`, `panel`, `login`, `giris`, `signin`, `account`/`my-account`/`hesabim`, `profile`, `settings`, `notifications`, `my-addresses`, `member(s)`/`uye`, `popup-`, `n1i-` ile başlayan rotalar. Wix sayfa listesindeki Intelligence (`/intelligence`, `/intelligence-admin`, `/intelligencesecurityqa`), Dashboard (`/dashboard`), güvenlik testleri (`/n1i-sonda-test*`), üye sayfaları (`/profile-1`, `/my-account`, `/settings`, `/notifications`, `/my-addresses`) ve müşteri sayfaları (izin listesinde olmadıkları için) kapsam dışıdır. **Bu alanların hiçbir kaynak dosyasına dokunulmadı.**

V1.0 dosyaları (`n1-stability-v1.js`, `n1-nav-v1.0.2.js` @ `102b76a…`) depoda geçmiş olarak duruyor; yayınlanmayacak.
