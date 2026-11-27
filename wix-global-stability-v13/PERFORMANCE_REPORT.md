# PERFORMANCE_REPORT — V1.3 (önce / sonra)

Tüm ölçümler Playwright (Chromium + WebKit, Linux, 4 çekirdek; çoğu ölçüm paralel koşularla aynı makinede, bu yüzden zamanlamalar ±%10 gürültülü). iPhone değerleri değildir.

## 1. Değişiklik başına maliyet
| Değişiklik | Normal ziyaretçi için ek yük |
|---|---|
| Test anahtarı (Head) | 1 regex + 1 `sessionStorage` okuması; dosya yok, zamanlayıcı yok |
| Menü kapanışı (Body-end) | 5,6 KB betik (önbelleklenir), 1 `click` (capture) + `pageswap`/`pagehide`/`pageshow` dinleyicileri; menü kapalıyken hiçbir iş yok |
| Loader v13 | Canlıya göre **daha az**: süresiz 500 ms `setInterval` kaldırıldı; ana sayfada loader eklendi (24 ms sayaç, ≤~9,5 sn) |
| Ana sayfa v658 | v657 ile aynı boyut ±1 satır; video modülü aynı boyut +1 satır |
| E-Ticaret v24 | v23 ile aynı (+1 yorum satırı, 94,3 KB) |

## 2. Bellek (21 döngü ortalaması, en büyük süreç, MB)
| | A canlı | B | C | D | E | F1x |
|---|---|---|---|---|---|---|
| WebKit | 1986 | 1851 | 2047 / 2024 | 2027 / 2044 | 2032 | 1996 |
| Chromium | 494 | 512 | 512 | 521 | 504 | 491 |
Fark ±%5 → ölçülebilir etki yok (iyileşme ya da gerileme).

## 3. Loader zamanlaması (Chromium kare analizi)
| | Canlı | v13 |
|---|---|---|
| Ana sayfa | **loader yok** | 312–528 ms'de görünür, 3,66–3,91 sn'de kapanır (5/5) |
| Ana sayfa → Kreatif | loader ~0,44–0,70 sn → içerik ~3,1 sn; 2/18 flicker | ~0,48–0,57 sn → ~2,8–3,1 sn; 0/17 flicker |
| Film çok yavaşsa (20 sn gecikme) | — | ana sayfa loader'ı 9,2 sn (WebKit) / 9,5 sn (Chromium) kapanır (8 sn içerik sınırı) |

**Öneri (yapılmadı):** ana sayfa içerik sınırı 8 sn → 4–5 sn ya da poster görünür olunca kapanma; yavaş bağlantıda loader süresini kısaltır.

## 4. Gezinme
| | WebKit | Chromium |
|---|---|---|
| Menü alt bağlantısı → `commit` (canlı ↔ düzeltme) | 1,92 → 0,46 sn (tekil ölçüm; ağ gürültüsü) | 0,23 sn |
| Geri (P03, `commit` ort.) canlı / v13 | 262 / 409 ms | 98 / 303 ms |
v13'teki geri süresi artışı test düzeneğinin yerel yönlendirmesinden (önbellek devre dışı) kaynaklanıyor; A–F karşılaştırmasında (aynı yönlendirme) gezinme süreleri arasında fark yok.

## 5. Sayfa ağırlığı (Chromium, sona kadar kaydırma)
E-Ticaret **29,4 MB / 30,5 MP görsel** ile açık ara en ağır sayfa (diğerleri 1,7–7,8 MB). Öneri MOBILE_STABILITY_REPORT §5.
