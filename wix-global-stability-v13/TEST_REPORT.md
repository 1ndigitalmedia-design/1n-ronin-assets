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
(bölüm aşağıda — `grad24.js`, `vis24.js`, `p02bis.js`, `uxgray.js`)

## 7. Test anahtarı ve Ronin varyantları (`tswitch.js`)
Parametresiz: hiçbir ek dosya/kutu yok. `C,hero:1.5x` → yalnız 1,5× indi, kutu 840×1128 playing · `A,hero:poster` → film yok · `D,hero:1x` → 560×752 + stab 1.1.1 · `E,hero:2x` → 1120×1504, loader 1.3-off. Ayrıntı MOBILE_MEDIA_BENCHMARK §2.

## 8. Ana sayfa video dokunuşu (P02-A, `p02gesture.js`)
Düşük Güç Modu benzetimi (kullanıcı etkileşimi yoksa `play()` reddedilir), Hizmetler bağlantısına dokunma: canlı v657 Chromium 1 / WebKit 1 `play()` (`ronin-m5-film.mp4`) → v658 0 / 0.

## 9. CDN
`verify-cdn-v13.sh`: 8 adres × 20 → 160/160 (JS 200, mp4 206), bayt eşleşmesi (E-Ticaret v24 94 324 B, v658 57 582 B, menü 5 598 B, video modülü 27 592 B, stabilite 17 076 B; mp4 ilk 64 KB).
