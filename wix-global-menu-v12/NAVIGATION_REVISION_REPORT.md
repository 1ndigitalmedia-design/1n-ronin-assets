# NAVIGATION_REVISION_REPORT — Global Menu & Navigation Revision V1.2

Tarih: 27 Kasım 2026 · Dal: `mobile-stability-v1-audit` · Draft PR #2
**Wix'te hiçbir değişiklik yapılmadı, yayın yapılmadı, dal birleştirilmedi.** Gerçek iPhone testi yapılmadı; mobil çökmenin çözüldüğü iddia edilmiyor.

## 0. Önce: V1.1 cihaz testi hakkında önemli bulgu

26–27 Kasım'daki canlı HTML'de Wix özel kodu planlanandan farklı (canlı HTML'den okundu, `qa/results/` altında değil, bu raporda alıntı):

| Wix girişi | Konum | İçerik |
|---|---|---|
| "1N - Hizmetler Capa Navigasyonu" | **Head** | `N1_NAV_CONFIG` + `n1-nav-v1.js@b35d9875` + V1.1 yükleyicisi (`if(!window.__n1V11)return; … document.body.appendChild`) |
| "1N - V1.1 Test Anahtarı (HEAD)" | Head | `?n1v11=1` bayrağı + `window.__n1Nav={pending:'1.0.3'}` |
| "1N - Hizmetler Capa Navigasyonu" | Body end | `N1_NAV_CONFIG` + `n1-nav-v1.js@b35d9875` (orijinal) |

Playwright ile canlıda `?n1v11=1` (Chromium ve WebKit, ana sayfa ve kreatif):
`n1-v11` bayrağı = 1, `__n1V11` = true, **`__n1Stability` = yok**, **`__n1Nav` = `{pending:'1.0.3'}` (hiçbir nav etkin değil)**, `n1-nav-v1.js` üç kez indirildi ama koruma nedeniyle çalışmadı, tanılama kutusu yok.

Neden: V1.1 yükleyicisi, test anahtarından **önce** çalışan bir Head girişine konmuş; o anda `__n1V11` tanımsız olduğu için yükleyici hiçbir şey yüklemiyor (ayrıca Head'de `document.body` henüz yoktur).

Sonuç: Cihaz testi `?n1v11=1` ile yapıldıysa, test edilen yapılandırma **"V1.1" değil, "hiçbir 1N navigasyon modülü ve stabilite modülü olmadan canlı site"** idi. Çökme o durumda da sürdüyse bu, **özel çapa navigasyonunun çökmenin nedeni olmadığına dair güçlü bir işarettir** (kanıt değil: cihaz, tarayıcı ve parametre bilgisi bizde yok). Parametresiz yapıldıysa test edilen şey mevcut canlı yapıydı (v1.0.1 etkin, iki kez yükleniyor). Aşağıdaki aşamalı plan bu belirsizliği gidermek için tasarlandı.

## 1. Global menü revizyonu

| Değişiklik | Dosya | Fark |
|---|---|---|
| Menü verisi: "Hizmetler" artık `#hizmetler-ozet`'e gitmiyor; 7 alt bağlantılı alt menü | `wix-global-menu-v12/site/n1-site-markup-v12.js` | Yalnızca header JSON'u; sayfa HTML'i v648 ile birebir aynı (doğrulandı) |
| Alt menü başlığı tıklama/dokunma/Enter ile **aç-kapa**; fareyle açma yalnız `(hover: hover) and (pointer: fine)` cihazlarda | `wix-global-menu-v12/modules/n1-header-v12.js` | 16 satır; CSS, işaretleme ve tasarım aynı |

Alt menü (sıra ve adresler, standart `<a href>`): Kreatif Prodüksiyon `/kreatif-produksiyon` · E-Ticaret Yönetimi `/e-ticaret-yonetimi` · Sosyal Medya `/sosyal-medya` · Reklam Yönetimi `/reklam-yonetimi` · UI/UX Tasarım `/ui-ux-tasarim` · AI `/yapay-zeka` · Uygulama Geliştirme `/uygulama-gelistirme`.

- Alt menü İnsan Kaynakları ile **aynı bileşen, aynı CSS** kullanır (`.n1h-sub` kartı; masaüstünde ana kartın solunda, mobil/tablette panel içinde satır içi). Yeni CSS eklenmedi.
- Header v6.48'de bir alt menü başlığına ikinci basış menüyü kapatmıyordu; v12'de kapatır (İnsan Kaynakları da aynı davranışı kazanır).
- Test sırasında iki etkileşim hatası bulundu ve düzeltildi: (a) dokunuş sonrası WebKit'in ürettiği uyumluluk "mouse" olayları alt menüyü kapatıp açıyordu; (b) fareyle yeniden üzerine gelme, tıklamayla açılmış menüyü "hover" durumuna çevirip sonraki tıklamanın kapatmasını engelliyordu.
- Hiçbir JavaScript navigasyon motoru eklenmedi: alt bağlantılar tarayıcının normal gezinmesiyle çalışır.

## 2. Ana sayfadaki Hizmetler bölümü — korunuyor

- `#hizmetler-ozet` bölümü, metni, 7 hizmet bağlantısı, videoları ve GSAP animasyonları değişmedi (markup HTML birebir aynı; A/B/C'de bölüm ve 7 bağlantı mevcut, ScrollTrigger sayısı aynı: ana sayfa 13).
- **ID korunmalı:** `wix-home-v656/modules/n1-m5-build.js:100` ve `n1-site-wix-v656.js:266-271` mobil/tablet kurulumunda `#hizmetler-ozet` seçicisini kullanıyor (paragrafı hizmet satırlarına dönüştürüyor ve aynı ID'yi yeni kutuya veriyor). ID kaldırılırsa mobil Hizmetler bölümü kurulamaz.
- E-Ticaret sayfasının breadcrumb'ındaki `/#hizmetler-ozet` bağlantısı korunuyor (`wix-e-ticaret-yonetimi-v23` `:254`); artık tarayıcının standart çapa davranışıyla çalışır.

## 3. Özel çapa navigasyonunun devreden çıkarılması — bağımlılık envanteri

| Bağımlılık | Yer | V1.2 durumu |
|---|---|---|
| `n1-nav-v1.js@b35d9875` | Wix özel kod: Head "Capa Navigasyonu" + Body-end "Capa Navigasyonu" | **Silinecek** (DEPLOYMENT Aşama 0/B) |
| `n1-nav-v1.js@b35d9875` | Ana sayfa `n1-site-wix-v656.js:80` (`NAV_SRC`), `:468` (`loadScript(NAV_SRC)`) | **v657'de `NAV_SRC = ""`** → yüklenmez |
| `n1-nav-v1.0.2.js`, `n1-nav-v1.0.3.js` | Yalnızca V1.0/V1.1 Wix kod dosyaları (yayınlanmadı / hatalı yayınlandı) | Hiçbir V1.2 yapılandırmasında yok |
| `window.N1_NAV_CONFIG` | Wix özel kod (iki giriş) | Girişlerle birlikte silinir |
| `window.__n1Nav` | Nav modülleri + V1.1 test anahtarı (`{pending}`) | B/C'de hiç tanımlanmıyor (doğrulandı) |
| `#hizmetler-ozet` menü hedefi | `n1-site-markup-v648.js` header JSON, `n1-header-v648.js:126` varsayılan menü, 10 iç sayfa "Hizmetler → /#hizmetler-ozet" satırı | markup v12 / header v12 kullanılıyor; iç sayfa satırı yalnız alt menüsüz eski veride çalışacak şekilde daraltıldı |
| `__n1Stability` tanılama ekranı | `n1-stability-v1.1(.1).js` yalnız `__n1Nav` sürümünü **gösterir** | Bağımlılık değil |
| Diğer modüller | `n1-links-v646.js` (adres haritası), `n1-service-links-v644.js` (hizmet bağlantıları), footer, yüzen kontroller (yukarı çık) | Nav'a bağımlı değil; değişmedi |

Doğrulama (Playwright, senaryo B ve C, ana sayfa + kreatif): `__n1Nav` tanımsız, `N1_NAV_CONFIG` tanımsız, sayfadaki `n1-nav*` betik sayısı **0**. A'da (canlı) ana sayfada 3, kreatif'te 2 nav betiği yükleniyor ve v1.0.1 etkin.

Eski adresler: `/#hizmetler-ozet` doğrudan açılınca bölüm mevcut ve tarayıcı standart çapa kaydırmasını yapıyor (özel ofset yok; hedef header'ın hemen altında/arkasında kalabilir). `/n1-full-test` → 301 → `/` (Wix).

## 4. Stabilite modülü — ayrı değerlendirme

- `n1-stability-v1.1.1.js` = v1.1.0 + yalnızca ana sayfa ön yükleme listesi v657/v12 adreslerine güncellendi. Nav'a bağımlılığı yok.
- Aşama B'de **yüklenmez** (izolasyon: ne özel nav ne stabilite). Aşama C'de **tek başına** yüklenir (`wix-custom-code/C-stability-only-body-end.html`).

## 5. Aşamalı geçiş (her aşamada tek değişiklik)

| Aşama | Wix özel kod | Custom Element Server URL'leri | Test edilen |
|---|---|---|---|
| **0 — Temizlik** | Head "Capa Navigasyonu" ve Head "V1.1 Test Anahtarı" **silinir**; body-end "Capa Navigasyonu" (orijinal) kalır | Değişmez (canlı f97db8ed) | = Senaryo A (temiz canlı) |
| **B** | Body-end "Capa Navigasyonu" da **silinir** (1N nav kodu kalmaz) | 11 sayfa v12 adreslerine | Yeni menü, özel nav yok, stabilite yok |
| **C** | Yeni giriş: `C-stability-only-body-end.html` | B ile aynı | B + yalnız stabilite |

Adresler, ayarlar ve adım adım talimat: DEPLOYMENT.md. Geri dönüş: ROLLBACK.md.

## 6. Test sonuçları (özet; ayrıntı TEST_REPORT.md V1.2)

| Test | Chromium | WebKit |
|---|---|---|
| Kurulum: B/C'de `__n1Nav`/`N1_NAV_CONFIG` yok, `n1-nav*` betiği 0; Hizmetler bölümü ve 7 bağlantı korunuyor | ✓ | — |
| Menü kullanılabilirliği (5 görünüm: aç/kapa, klavye, dokunma alanı, kaydırma, gezinme, geri/ileri, İK) | **93/93** | **93/93** |
| 21 döngü A/B/C: çökme / asılı kalma / hata | 0 / 0 / 0 (her senaryo) | 0 / 0 / 0 (her senaryo) |
| 21 döngü en büyük süreç ortalaması A / B / C (MB) | 513 / 468 / 478 | 1464 / 1446 / 1454 |
| Menüden gezinme + 7 geri + 7 ileri (22 adım) | A, B, C: 22/22 | B, C: 22/22; A: 1 koşuda ileri 1/7, 2 tekrarda 22/22 |

**Yorum:** Emülasyonda özel çapa navigasyonunu kaldırmak (B) ve stabilite eklemek (C), canlıya (A) göre ölçülebilir bir bellek ya da kararlılık farkı yaratmıyor (WebKit ±%1–2). Bu, çapa navigasyonunun çökmenin kesin nedeni olduğu varsayımını **desteklemiyor**; ancak gerçek iPhone'un yerine geçmez. Ayırt edici kanıt, aşamalı fiziksel cihaz testinden gelecek (TEST_REPORT.md V1.2 §6).

## 7. Riskler
- **jsDelivr 403 (yeni adresler):** depo 50 MB'ı aştığı için yeni commit adresleri ilk dakikalarda bazı uç sunuculardan `403 Package size exceeded` dönebiliyor (gözlendi; ~1 dk ısınmadan sonra 20/20 başarılı). Canlı adresler 282/282 başarılı. **Wix'te adres değiştirmeden önce `wix-custom-code/verify-cdn.sh` çalıştırılmalı.**
- Hizmetler artık ana sayfa bölümüne kaydırmıyor (istenen davranış). Ana sayfadaki bölüme menüden değil, sayfayı kaydırarak ulaşılır.
- Gerçek iPhone/iPad davranışı doğrulanmadı.
