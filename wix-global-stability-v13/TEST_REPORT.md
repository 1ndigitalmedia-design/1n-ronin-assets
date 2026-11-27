# TEST_REPORT — V1.3

Ortam: Playwright 1.63 (Chromium 1243, WebKit 2359 ≈ Safari 26.6), Linux, 4 çekirdek. Canlı site `www.reklam1n.com`; V1.3 dosyaları test düzeneğinde yerel yönlendirme ya da canlı HTML'e özel kod enjeksiyonuyla denendi (Wix'te değişiklik yok).
**WebKit ≠ iPhone.** Ölçülemeyenler: MOBILE_STABILITY_REPORT §7. Betikler ve ham sonuçlar: `qa/`.

## 1. Canlı doğrulama (15 sayfa)
`live13.js` → `qa/results/live13.json`: Custom Element adresleri V1.2 (15/15), Capa nav **etkin** (15/15), loader 13/15 sayfada (`/gizlilik`, `/veri-sahibi-basvuru-formu` hariç), stabilite yok.

## 2. P01 Menü (MENU_FIX_REPORT)
| Test | Chromium | WebKit |
|---|---|---|
| Eski sayfanın son karesi kapalı, 4 görünüm (canlı → düzeltme) | 0/4 → **4/4** | 0/4 → **4/4** |
| Yeni sayfada menü kapalı | 4/4 · 4/4 | 4/4 · 4/4 |
| Geri dönüşte menü kapalı (back_forward ya da ATS reload) | 4/4 · 4/4 | 4/4 · 4/4 |
| Menü kullanılabilirliği (`menutest.js`, 5 görünüm, düzeltme enjekte) | 88/93 | 88/93 |
`menutest` 5 "FAIL" = bilgi kontrolü (canlıda hâlâ etkin Capa nav'ın `__n1Nav` nesnesi görülüyor), menü hatası değil.

## 3. P03 Yüklenirken geri — 392 döngü (`p03back.js`)
Ana sayfa → Hizmetler bağlantısına dokunma → **0,25 / 0,5 / 1 / 2 / 3 / 5 sn / tam yükleme** sonra geri → 7 sn sağlık kontrolü. 7 sayfa × 7 zaman × {canlı, v13} × {normal, yavaş: betik +1,2 sn, video +3 sn} × {Chromium, WebKit}.

| Grup | Döngü | Çökme | Takılma | Ana sayfaya dönüş | Menü açık | 1N JS hatası | ATS reload |
|---|---|---|---|---|---|---|---|
| WebKit canlı normal | 49 | 0 | 0 | 49 | 0 | 0 | 25 |
| WebKit v13 normal | 49 | 0 | 0 | 49 | 0 | 0 | 0* |
| WebKit canlı yavaş | 49 | 0 | 0 | 49 | 0 | 0 | 0 |
| WebKit v13 yavaş | 49 | 0 | 0 | 49 | 0 | 0 | 0 |
| Chromium canlı normal | 49 | 0 | 0 | 49 | 0 | 0 | 11 |
| Chromium v13 normal | 49 | 0 | 0 | 49 | 0 | 0 | 0* |
| Chromium canlı yavaş | 49 | 0 | 0 | 49 | 0 | 0 | 0 |
| Chromium v13 yavaş | 49 | 0 | 0 | 49 | 0 | 0 | 0 |
| **Toplam** | **392** | **0** | **0** | **392** | **0** | **0** | |

- Kalan sayfa hataları yalnız Wix çalışma zamanı ve reklam etiketleri (`Failed to fetch` 410, `SiteAssetsFallbackError` 23, `ChunkLoadError`, tag-manager) — iptal edilen istekler; hiçbiri 1N dosyası değil.
- \* v13 modunda yerel yönlendirme önbelleği ve gezinmeyi etkiliyor; "v13 ATS reload'u azaltıyor" sonucu **çıkarılmadı**.
- Yavaş ağda ana sayfa 7 sn içinde kurulamıyor (ölçüm penceresi kısa); döngüler yine tamamlandı.
- v13 normal WebKit'te 2 örnekte 7 sn sonra loader görünür (Ronin "loading"); ayrı testte üst sınır doğrulandı: film 20 sn geciktirilince loader 9,2 sn (WebKit) / 9,5 sn (Chromium) kapanıyor.

## 4. Varyantlar A–F — 21 döngü (`cycle13.js`, `scen13.js`)
Tablolar: MOBILE_STABILITY_REPORT §4. Özet: Chromium 6×21 temiz; WebKit A, C (×2), D (2 tekrar), E, F1x temiz; B 2 takılma (ana sayfa kaydırma >40 sn); D ilk koşu 8. döngüden sonra gezinme tamamlanmadı (tekrarlanmadı). Bellek farkları ±%5.

## 5. P04/P05 Loader (LOADER_FIX_REPORT)
| Test | Canlı | v13 |
|---|---|---|
| Flicker, kare analizi (Chromium, ön yükleme açık) | 2/18 | 0/17 |
| Ana sayfada loader | yok | 5/5 (312–528 ms → 3,66–3,91 sn) |
| Belirleyici View Transition denemesi (`vtdet.js`) | yeniden üretilemedi | — |
| Film 20 sn gecikmede ana sayfa loader kapanışı | — | 9,2 sn W / 9,5 sn C |

## 6. E-Ticaret v24 ve kademeli kaydırma regresyonu
### 6.1 Çökmenin izolasyonu (canlı v23, WebKit) — ROOT_CAUSE §P02-B
Kademeli kaydırmada e-ticaret 2/2 + 4/4 + 3/3 çökme (y≈4000–4250); 5 büyük atlamada 0/3; Chromium 0/2. Video/görsel/GSAP engelli, DPR 1, iPhone UA, ana sayfadan gelme, belge yönlendirmesi: hepsinde çöküyor. `#ec-kapsam` gizli 0/2; `.ec-line__img` filtresi/geçişi yok 0/2; ölçek yok 2/2 çökme; küçük görsel 3/3 çökme. Bağımsız sayfa: `grayscale→none` çöküyor (4/4), `grayscale(0)` hedefi 0/4, `brightness`→`none` 0/2.

### 6.2 Görsel eşdeğerlik v23 ↔ v24 (`vis24.js`)
8 satırın her biri sırayla etkin, geçiş bitince `.ec-lines` ekran görüntüsü (390×844, DPR 2).
| Motor | Sonuç |
|---|---|
| Chromium (geçişler açık) | 8/8 durumda fark yok (en büyük kanal farkı 1/255) |
| WebKit (geçişler kapalı — v23 geçişle tamamlanamıyor) | Küçük resimler 8/8 aynı; tek fark satır 0'da küçük resim sütunu dışında (x ≥ 132) etkin olmayan başlıklarda GSAP yazı belirme zamanlaması (0,37 %) — filtreyle ilgisiz |
Hesaplanan filtre: etkin satır v23 `none`, v24 `grayscale(0) brightness(1)`; etkin olmayan satırlar ikisinde de `grayscale(1) brightness(0.42)`.

### 6.3 Kademeli kaydırma regresyonu (`grad24.js`) — 390×844 DPR 3, 300 ms/adım, sayfa sonuna kadar
| Sayfa | Adım | WebKit | Chromium |
|---|---|---|---|
| Ana sayfa | 150 px | 2/2 sona kadar | 2/2 |
| Kreatif | 150 | 2/2 | 2/2 |
| **E-Ticaret v24** | **100 / 150 / 250** | **6/6** (aktif filtre `grayscale(0) brightness(1)`) | 6/6 |
| Sosyal Medya | 150 | 2/2 | 2/2 |
| Reklam | 150 | 2/2 | 2/2 |
| UI/UX | 150 | 2/2 | 2/2 |
| AI | 150 | 2/2 | 2/2 |
| Uygulama | 150 | 2/2 | 2/2 |
| **E-Ticaret v23 (kontrol)** | 100 / 250 | **ÇÖKME** @2900 / @4250 (`ec-kapsam` sonu) | 2/2 sona kadar |
| **E-Ticaret v24 gerçek CDN dosyası** (`cdn24.js`, 94 324 B) | 150 | 2/2 sona kadar | — |
Toplam (E-Ticaret odaklı tur): 42 kaydırma koşusu, v24 ile 0 çökme, 0 1N JS hatası; v23 kontrolü WebKit'te 2/2 çöküyor. Ham sonuç: `qa/results/grad24.*`.

### 6.4 Desenin diğer sayfalarda aranması (kaynak kod)
Canlıda yüklenen 46 dosya (15 sayfa + ortak modüller + CSS) tarandı: `transition` içinde `filter` geçen yalnız 2 kural var.
- E-Ticaret `:490` → v24 ile giderildi.
- UI/UX `:486` `.ux-screen--acc{transition:filter .4s}` (temel `none`) ↔ `.is-gray{filter:grayscale(1)}` — **aynı desen**, "Gri tonlamalı önizle" anahtarıyla tetikleniyor → v29 ile giderildi (§6.5).
Diğer gri tonlama filtreleri (ana sayfa bant videoları, AI, UI/UX `.ux-spot__img`) durağan; geçiş yok.
**V1.3 nihai üretim kümesi yeniden tarandı** (v23/v28 yerine v24/v29; 49 dosya + loader ve test anahtarı girişleri): `filter` geçişi yalnız v24 (`grayscale(1) brightness(.42)` ↔ `grayscale(0) brightness(1)`) ve v29 (`grayscale(0)` ↔ `grayscale(1)`) — ikisi de aynı işlev listeleri arasında; **`filter:none` hedefi kalmadı**; loader ve test anahtarında filtre geçişi yok.

### 6.5 UI/UX v29 — hedefli regresyon (`ux29.js`, `vis29.js`, `grad24.js` + `routeUx.js`)
| Test | WebKit | Chromium |
|---|---|---|
| Anahtar 12× aç/kapa, 800 ms (geçiş tamamlanır) — v28 kontrol | **2/4 çökme** (önceki 3/7 ile toplam 5/11) | 1/1 temiz |
| Aynı — **v29** | **6/6 temiz** | 2/2 temiz |
| Anahtar 20× hızlı, 250 ms (geçiş yarıda kesilir) — v29 | 3/3 temiz; ara değerler `grayscale(0.988)` / `grayscale(0.009)` → animasyon korunuyor | — |
| Hesaplanan değerler v29 | gri `grayscale(1)`, renkli `grayscale(0)`; anahtar `aria-checked` true/false doğru | aynı |
| Geçiş tanımı v28 / v29 | — | ikisi de `filter 0.4s cubic-bezier(0.22, 1, 0.36, 1)` |
| Geçiş ortası filtre (tıklamadan 100 / 200 / 300 ms sonra) v28 → v29 | — | 0,691 → 0,691 · 0,961 → 0,946 · 0,997 → 0,997 (örnekleme zamanlaması farkı içinde aynı eğri) |
| Görsel eşdeğerlik: renkli ve gri son durum ekran görüntüsü v28 ↔ v29 | 0 fark (geçiş kapalı) | 0 fark (geçiş açık; en büyük kanal farkı 1/255) |
| Durumlar ayırt edilebiliyor mu (test duyarlılığı) | ort. doygunluk renkli 5,3 → gri 0,0 (v28 ve v29 aynı) | aynı |
| Kademeli kaydırma, sayfa sonuna kadar (16 548 px): 150 px ×2, 100 px, 250 px | 4/4 temiz, 0 JS hatası | 4/4 temiz |
Değişmeyenler (dosya karşılaştırması): v29 = v28 + 1 başlık yorum satırı + CSS dizgisinde tek kural (`filter:grayscale(0);` eklendi). İçerik, görseller, videolar, tipografi, etkileşimli bileşenler, erişilebilirlik öznitelikleri ve GSAP kodu bayt düzeyinde aynı.

## 7. Test anahtarı ve Ronin varyantları (`tswitch.js`)
Parametresiz: hiçbir ek dosya/kutu yok. `C,hero:1.5x` → yalnız 1,5× indi, kutu 840×1128 playing · `A,hero:poster` → film yok · `D,hero:1x` → 560×752 + stab 1.1.1 · `E,hero:2x` → 1120×1504, loader 1.3-off. Ayrıntı MOBILE_MEDIA_BENCHMARK §2.

## 8. Ana sayfa video dokunuşu (P02-A, `p02gesture.js`)
Düşük Güç Modu benzetimi (kullanıcı etkileşimi yoksa `play()` reddedilir), Hizmetler bağlantısına dokunma: canlı v657 Chromium 1 / WebKit 1 `play()` (`ronin-m5-film.mp4`) → v658 0 / 0.

## 9. CDN
`verify-cdn-v13.sh`: **9 adres × 20 → 180/180** (JS 200, mp4 206), bayt eşleşmesi: UI/UX v29 130 896 B, E-Ticaret v24 94 324 B, v658 57 582 B, menü 5 598 B, video modülü 27 592 B, stabilite 17 076 B; mp4 ilk 64 KB. Yeni v29 adresi ilk dakikalarda ara ara 403 döndü (jsDelivr 50 MB sınırı), ~2 dk sonra 20/20.
Gerçek CDN dosyasıyla tarayıcı testi: E-Ticaret v24 kademeli kaydırma WebKit 2/2 temiz (`cdn24.js`); UI/UX v29 anahtar 12× aç/kapa WebKit 2/2 temiz (`ux29.js`, `CDNURL`).
