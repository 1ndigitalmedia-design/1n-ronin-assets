# TEST_REPORT — V1.4 test sonuçları

**Ortam:**
- Playwright Chromium 1243 ve WebKit 2359 (Linux, headless).
- V1.4 kodu canlı sitenin içinde çalıştırıldı: `tests/route14.js` yerel dosyaları, `tests/routecdn.js` gerçek CDN adreslerini kullandı.
- Wix'e hiçbir değişiklik yapılmadı.
- **Playwright WebKit iPhone değildir; Chromium mobil benzetimi Android cihaz değildir.**
- Firefox bu ortamda kurulu değil (`/opt/pw-browsers` yalnız Chromium + WebKit; ortam kuralı gereği ayrıca tarayıcı kurulmadı) → **Firefox test edilmedi.**

Profiller:
- **masaüstü:** 1440×900.
- **mobil:** 390×844 @3, iPhone UA.
- **android:** 412×915 @2,625.
- **tablet:** 820×1180, dokunmatik.
- **tablet yatay:** 1180×820, dokunmatik, iPad UA.

## 1. Özet
| # | Test | Kapsam | Sonuç |
|---|---|---|---|
| 1 | Ağ: mobilde ikincil video indirilmiyor (P11) | 8 sayfa × {mobil, android, tablet, tablet yatay} × Chromium + {mobil, tablet yatay} × WebKit | **GEÇTİ** (48/48) |
| 2 | Ağ: masaüstü canlıyla aynı | 8 sayfa × 2 motor | **GEÇTİ** (16/16 aynı istek listesi) |
| 3 | Gerçek CDN adresleriyle uçtan uca | 8 sayfa × {mobil, masaüstü} × 2 motor | **GEÇTİ** (32/32) |
| 4 | BFCache yaşam döngüsü (benzetilmiş, 3 döngü) | 8 sayfa × {mobil, masaüstü} Chromium + 8 sayfa mobil WebKit | **GEÇTİ** (Chromium 16/16; WebKit bırakma ve geri yükleme 8/8, oynatma ölçülemedi) |
| 5 | Döndürme ×4 | 8 sayfa × 2 motor | **GEÇTİ** (yeni ikincil video isteği 0, öğe sayısı sabit, taşma yok) |
| 6 | Kademeli kaydırma (WebKit çökme regresyonu, 150 px) | 8 sayfa × {mobil, masaüstü} WebKit | **GEÇTİ** (16/16 sona kadar + geri, çökme 0) |
| 7 | UI/UX gri anahtarı (V1.3 düzeltmesi) | masaüstü + mobil WebKit, 12 tıklama | **GEÇTİ** (çökme 0; `grayscale(0)` ↔ `grayscale(1)`) |
| 8 | Menü aç/kapa, Hizmetler → sayfa → geri | mobil + masaüstü, WebKit + Chromium, canlı ve V1.4 | **GEÇTİ** (panel kapalı, loader artığı 0 (mobil)) |
| 9 | "Hikâyemizin Devamı" → `/kisaca-biz` | 29 sayfa tarama + 3 profil tıklama | **GEÇTİ** |
| 10 | Görsel regresyon | 8 sayfa × 3 profil | **GEÇTİ** (yükseklik ve kutu farkı 0) |
| 11 | Bellek / DOM (Chromium) | 2 tur × 8 sayfa | sızıntı belirtisi yok; düğüm −10 % |
| 12 | Kabul testi benzetimi (tek bağlantı, otomatik) | WebKit iPhone benzetimi, 14 adım | **GEÇTİ** (çökme adayı 0, V1.4 tablosu 7/7, gerçek süre 9,1 dk) |
| 13 | CDN doğrulama | 55 adres | **TAMAM** (CDN_VERIFICATION) |
| 14 | Konsol / 1N JS hatası / kırık medya | yukarıdaki tüm koşular | 1N hatası 0, kırık medya 0 |

## 2. Ağ (P11) — `tests/net14.js`, `qa/net/`
**Hafif profilde video öğesi / medya isteği** (8 sayfa: Ana Sayfa, Kreatif, E-Ticaret, Sosyal, Reklam, UI/UX, Yapay Zekâ, Uygulama). Hepsinde 1N hatası 0.

| Motor · profil | Video öğesi | Medya isteği |
|---|---|---|
| Chromium mobil | 5 · 2 · 1 · 1 · 1 · 0 · 1 · 1 | 5 · **1 · 1 · 1 · 1 · 0 · 1 · 1** |
| Chromium android | aynı | aynı |
| Chromium tablet | aynı | aynı |
| Chromium tablet yatay | aynı | aynı |
| WebKit mobil | aynı | aynı |
| WebKit tablet yatay | aynı | aynı |

- **Hizmet sayfalarındaki tek istek** sayfanın kahraman videosudur. **UI/UX'te istek yoktur.**
- **Kreatif'teki 2. video öğesi** kaynaksız monitör oynatıcısıdır: `src` yok, istek yok. Yalnız dokunuşla yüklenir.
- **Canlı (önce), mobil:** Kreatif 2, E-Ticaret 3, Sosyal 2–4, Reklam 2, UI/UX 1, Yapay Zekâ 3, Uygulama 4 istek.
- **Masaüstü V1.4 = canlı:** istek listeleri birebir aynı (ör. Sosyal 4 istek: `67c5c858/720p`, `044b3674/480p`, `4892baa5/1080p`, `f14a9f80/1080p`).
- **WebP kareler:** her sayfada `img[data-n1-still]` yüklendi (`naturalWidth` > 0). Tembel olup ekrana gelmemiş olanlar "YÜKLENMEDİ" görünür; bu beklenen davranıştır.

## 3. Gerçek CDN testi — `tests/routecdn.js`
Canlı Server URL'leri jsDelivr'daki V1.4 adreslerine (`@36a24d3…`) yönlendirildi; kareler ve alt modüller doğrudan CDN'den geldi (Wix'te adres değiştirmenin birebir benzetimi). Ham: `qa/net/cdn-real.log`, `qa/net/*-cdn-*.json`.

| Motor · profil | Video öğesi / medya isteği (Ana, Kreatif, E-Tic., Sosyal, Reklam, UI/UX, YZ, Uyg.) | WebP kareler (CDN'den) | 1N hata |
|---|---|---|---|
| WebKit mobil | 5/5 · 2/1 · 1/1 · 1/1 · 1/1 · 0/0 · 1/1 · 1/1 | 13/14 yüklendi; `sosyal-final` tembel, ekrana gelmeden ölçüldü | 0 |
| Chromium mobil | aynı | aynı | 0 |
| WebKit masaüstü | 3/3 · 2/2 · 3/3 · 4/4 · 3/2 · 1/1 · 3/3 · 4/4 (canlıyla aynı) | kare yok (beklenen) | 0 |
| Chromium masaüstü | aynı | kare yok | 0 |

Sonuç: **GEÇTİ.** Gerçek jsDelivr adresleriyle V1.4, yerel testlerle aynı davranıyor.

## 4. BFCache yaşam döngüsü (P13) — `tests/bfsynth.js`, `qa/life/`
Belge içinde `PageTransitionEvent('pagehide' | 'pageshow', {persisted:true})`, 3 döngü.

| Motor · profil | Gizlenince kaynaklı video | Dönüşte kaynak | Dönüşte oynayan | Dinleyici artışı (win/doc) | 1N hata |
|---|---|---|---|---|---|
| Chromium mobil (8 sayfa) | **0** (8/8) | başlangıçla aynı | oynayan her sayfada ≥ 1 (UI/UX'te video yok) | 0 / 0 | 0 |
| Chromium masaüstü (8 sayfa) | **0** (7/7 hizmet sayfası); ana sayfa masaüstü 2/3 (farklı modül, kapsam dışı) | aynı | ≥ 1 (UI/UX masaüstü kahraman otomatik oynatmaz → 0 beklenir) | 0 / 0 | 0 |
| WebKit mobil (8 sayfa) | **0** (8/8) | aynı | ölçülemez² | 0 / 0 | 0 |

² WebKit Linux headless, videonun `currentTime` değerini ilk yüklemede de ilerletmiyor (`qa/life/bfdbg-webkit-reklam.log`: `t0.00`, `rs2`). Aynı sayfada Chromium'da dönüşte video oynuyor (`qa/life/bfdbg-chromium-reklam.log`).

Not: ilk çalıştırmalardaki "ilerleyen 0" sonuçları (`bfsynth-v14-run1/2.log`) kısa döngüsel videoların (1,8–7 sn) ölçüm penceresinde başa sarmasından kaynaklanıyordu. Ölçüm mutlak değişime göre düzeltildi ve sonuç 16/16 oldu. Ayrıca `n1Life` geri yüklemesi yakalama evresine alındı ve `canplay`'de yeniden deneme eklendi (build öncesi).

Gerçek BFCache'te Playwright Wix sayfalarını önbelleğe almıyor; her geri dönüş taze `back_forward` (`tests/life14.js`). Taze dönüşte ana sayfa aynı şekilde kuruluyor (ScrollTrigger 13; `tests/homediag.js`).

## 5. Döndürme (P14) — `tests/reg14.js rotate`, `qa/reg14.log`
Dikey → yatay → dikey → yatay → dikey (390×844 ↔ 844×390), her adımda %40 kaydırma.
- Video öğesi ve kare sayısı her sayfada sabit; yatay taşma yok; hata 0.
- WebKit'te Reklam, Yapay Zekâ ve Uygulama'da döndürme sırasında 1–2 istek görüldü. Hepsi **sayfanın kendi kahraman videosu** (Range devamı; `qa/reg14-rotate-urls.log`). İkincil video isteği 0.

## 6. Kademeli kaydırma, gri anahtar, menü — `qa/reg14.log`, `qa/reg-webkit-menu-gray.log`
- **WebKit kademeli kaydırma** (150 px / 250 ms, sona kadar ve 600 px adımlarla başa): 16/16 tamam, çökme 0. V1.3'teki E-Ticaret `filter` düzeltmesi korunuyor.
- **UI/UX gri anahtarı**, 12 tıklama, masaüstü + mobil WebKit: çökme 0. Hesaplanan filtre `grayscale(0)` → `grayscale(0,9999)` → `grayscale(0,003)` (geçiş sürüyor).
- **FEEL:**
  - Masaüstünde `VIDEO` + oynat düğmesi.
  - Mobilde `IMG` (`uiux-feel`), düğme yok.
- **Menü** (WebKit + Chromium; mobil + masaüstü; canlı ve V1.4):
  - Aç ✔ · kapa ✔.
  - Hizmetler → E-Ticaret ✔.
  - Yeni sayfada panel kapalı ✔.
  - Geri → `/` ✔, panel kapalı ✔.
  - Mobil loader artığı 0.
  - Masaüstü WebKit'te "loader artığı 3" hem **canlıda (V1.3)** hem V1.4'te aynı. Seçici `[class*=loader]` geniş olduğundan görünür başka öğeleri de sayıyor; Chromium'da 0. Loader kodu V1.4'te değişmedi; regresyon yok.
- **Yüzen düğmeler** (WhatsApp, yukarı): ekran görüntülerinde her iki sürümde görünür (`screenshots/visual/compare/*`). Betikteki sayaç Shadow DOM seçicisi nedeniyle 0 okur (canlıda da 0).

## 7. Kabul testi benzetimi (§14) — `qa/accept/accept14-sim-webkit.md`
- **Akış:** WebKit iPhone benzetimi; canlı HTML'deki test anahtarı v14 ile değiştirildi; CE adresleri V1.4'e yönlendirildi. Tek bağlantı `/?n1t=kabul14`, **hiç dokunuş yok.**
- **Başlama:** açılıştan 9 sn sonra kendiliğinden (video ön kontrolü: OTOMATİK OYNATMA ÇALIŞIYOR, `ronin-m5-film-2x.mp4` 1120×1504).
- **Plan:** 14 adım, 14 geçerli 1. deneme.
  - Çökme adayı 0, belirsiz 0, test kaynaklı sorun 0, ek deneme 0.
  - 11 Wix ATS yeniden yüklemesi (geri sonrası; çökme sayılmaz).
  - Video 14/14, 1N JS hatası 0.
- **V1.4 yapılandırma tablosu:** 7/7 GEÇTİ. Ana sayfa: modül v14, bağlantı `/kisaca-biz`, 14/14.
- **Gerçek süre:** 9,1 dk (bağlantıdan rapora 9,2 dk).
- **İlk koşu** (`accept14-sim-webkit-run1.md`) betiğin iki ölçüm hatasını gösterdi, ikisi de düzeltildi:
  - V1.4 kodu yalnız adres kalıbından aranıyordu; benzetimde adres canlı olduğu için "HAYIR" çıktı. Artık `#n1-still-v14` işareti de aranıyor.
  - Aynı mp4'ün Range istekleri ayrı sayılıyordu; artık benzersiz adres sayılıyor.
- İlk koşuda bir adımda Ronin 1× görüldü. Bu, V1.3'ten beri var olan yedek davranıştır: 2× 9 sn içinde kare üretmezse 1×'e geçer (`n1-video-m5-v13.js:284`, V1.3.2 raporu). V1.4 bu kuralı değiştirmedi. 2. koşuda 14/14 2×.

## 8. Kapsam dışı yan etki denetimi
- V1.4 dosyalarında `gtag`, `fbq`, `dataLayer`, Intelligence ve müşteri sayfası referanslarında V1.3'e göre **yeni satır yok** (`git diff` canlı kaynak ↔ V1.4; FINAL_REPORT §6).
- Test anahtarı v14 müşteri ve dashboard sayfalarında bayrak uygulamaz.
