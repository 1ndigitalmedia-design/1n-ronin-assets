# PERFORMANCE_REPORT

Tüm ölçümler bu ortamda, Playwright ile yapıldı. Yazılım çizimi ve emülasyon gerçek cihaz performansı değildir. Mutlak değerler değil, aynı koşuldaki **canlı ↔ düzeltmeli farkları** anlamlıdır.

## 1. Header görünme süresi (Sorun 04)

Koşul: Chromium, 390×844 mobil, ağ 150 ms RTT / 1,6 Mbps (yavaş 4G), CPU 4× yavaş. Ölçüt: `n1-header .n1h-logo` ve `.n1h-menu` ilk görünür kare (`performance.now()`, ms). Soğuk = yeni bağlam, sıcak = aynı bağlamda ikinci ziyaret. Her değer 4 bağımsız turun medyanı (`qa/results/hdr-summary.txt`).

| Sayfa | Soğuk canlı | Soğuk düzeltmeli | Δ | Sıcak canlı | Sıcak düzeltmeli | Δ |
|---|---|---|---|---|---|---|
| `/` | 11 494 | **9 697** | **−1 797** | 11 576 | **9 402** | **−2 174** |
| `/kreatif-produksiyon` | 4 415 | 3 670 | −745 | 4 063 | 3 275 | −787 |
| `/e-ticaret-yonetimi` | 3 736 | 4 056 | +319 | 3 934 | 3 307 | −626 |
| `/markalar` | 3 743 | 3 634 | −109 | 4 101 | 3 440 | −661 |
| `/sosyal-medya` | 3 909 | 3 888 | −21 | 3 902 | 3 336 | −566 |

- Ana sayfa: canlı 4 turun hepsi 11,3–12,0 sn, düzeltmeli 4 turun hepsi 9,2–9,8 sn (dağılımlar örtüşmüyor) → **iyileşme güvenilir**.
- İç sayfalar sıcakta tutarlı biçimde ~0,6–0,8 sn daha iyi. Soğukta tek tek turlar ±1 sn dalgalanıyor → **kesin bir iyileşme iddia edilmiyor.**
- Tek tur ölçümünde kalan 5 sayfa (`hdr-live3.json` / `hdr-fix3.json`) benzer, karışık sonuç veriyor.
- Ana sayfa zaman çizelgesi (canlı, `qa/scripts/tl.js`): nav özel kodu 1,38 sn'de, Wix'in Custom Element isteği **8,45 sn**'de, 14 CSS 9,35–10,35 sn, `n1-home-m5.css` (seri) 10,35–11,07 sn, header JS 11,12–11,53 sn, header görünür 11,59 sn. Header'ın ilk ~8,4 sn'si Wix'in hidrasyon süresi. Bu süre 1N kodundan değiştirilemez.

## 2. Bellek (Sorun 01)

| Ölçüm | Canlı | Düzeltmeli | Kaynak |
|---|---|---|---|
| WebKit WebContent süreci, 21 döngü ort. / maks. | 1486 / 1949 MB | 1465 / 1886 MB | `base-webkit.json`, `fix-webkit.json` |
| Aynı, son 15 ölçüm ort. | 1690 MB | 1626 MB | |
| Chromium toplam RSS ort. / maks. | 1115 / 1298 MB | 1093 / 1322 MB | `base-chromium.json`, `fix-chromium.json` |
| Chromium JS heap ort. / maks. | 47 / 69 MB | 42 / 54 MB | |

Kontrollü WebKit deneyleri (`qa/scripts/growth*.js`, canlı, 20 gezinme):

| Senaryo | Süreç belleği | Yorum |
|---|---|---|
| Wix-only sayfalar (iletişim ↔ kullanım koşulları), goto | 574 → 631 MB | plato |
| 1N videosuz (kısaca-biz ↔ markalar), goto | 564 → 625 MB | plato |
| 1N videolu (uygulama ↔ yapay-zeka), goto | 703 → 810 MB | plato, +180 MB taban |
| Ana sayfa ↔ kreatif, goto (10 tur) | 742 → 890 MB | plato |
| Ana sayfa ↔ kreatif, **tıkla + geri** (10 tur) | 992 → 1136 MB | büyüme sürüyor; 4/10 Wix ATS reload |

Sonuç: Medya bırakma işlevsel olarak doğru çalışıyor (kaynak `readyState 0`). Ancak emülasyonda süreç belleğine etkisi ölçüm gürültüsü içinde (~%4). En büyük ölçülen bellek farkı Wix ATS'nin geri yolundaki çift yüklemesinden geliyor.

## 3. Çalışma zamanı yükü (canlı, belge başına, mobil)

| Sayfa | Video | Canlı ST | GSAP tween (açılış) | GPU katman zirvesi (DPR3) | Çözülmüş görsel | `backdrop-filter` öğesi |
|---|---|---|---|---|---|---|
| `/` | 5 | 13 | 6–11 | 49 katman, 11,8 Mpx | 8,3 Mpx | 6 |
| kreatif | 2 | 26 | 101 | 37, 8,2 Mpx | 9,6 Mpx | 6 |
| e-ticaret | 3 | 60 | 81 | 66, 5,9 Mpx | **30,5 Mpx** | 9 |
| sosyal-medya | 4 | 46 | 90 | 41, 8,3 Mpx | 5,1 Mpx | 9 |
| reklam-yönetimi | 3 | 63 | 90 | 50, 10,6 Mpx | 4,7 Mpx | 9 |
| ui-ux | 1 | 46 | 54 | 58, 7,5 Mpx | 8,7 Mpx | 6 |
| yapay-zeka | 3 | 66 | 103 | 47, **16,7 Mpx** | 5,2 Mpx | 6 |
| uygulama | 4 | 41 | 42 | 22, **17,1 Mpx** | 5,1 Mpx | 6 |
| markalar | 0 | 3 | — | 18, 3,8 Mpx | 6,4 Mpx | 6 (+48 `filter`) |
| kısaca-biz | 0 | 15 | — | 16, 3,1 Mpx | 3,9 Mpx | 6 |

(`qa/results/gpu.json`, `netmap.json`, `base-chromium.json`.) rAF: tüm sayfalarda GSAP ScrollTrigger'ın kendi döngüsü (≈60–120 çağrı/sn, boş geri çağırma), 1N kaynaklı ek döngü yok. Uzun sayfalarda kaydırma sonunda canlıda videoların %90'ı tamponlu kalıyor; düzeltmede ≥4 sn uzakta kalınca bırakılıyor.

## 4. Optimizasyon önerileri (uygulanmadı — onay gerekir)

1. iPhone'da hero 2× film (6,3 MB) yerine 1× (4,1 MB) — `n1-m5-build.js:34` (`deviceMemory` Safari'de yok).
2. E-Ticaret `6dbf5e_568ef15…~mv2.jpg` (2160×2700, 5,8 Mpx) 140×175 px'te. Wix `/v1/fill/w_420,h_525` dönüşümü DPR 3'te kaliteyi korur, ~5,6 Mpx çözülmüş bellek kazandırır.
3. Wix ATS çift yüklemesi → Wix desteğe bildirim.
4. Üçüncü taraf "Graphs" Wix uygulaması (`graphs.bestfreecdn.com`) her sayfada yükleniyor. Kullanılmıyorsa kaldırılması.
5. "Özel Yükleniyor %" özel kodu: `setInterval(checkRoute, 500)` yerine yalnızca `popstate`/`pageshow` dinlemek yeterli; tam sayfa geçişlerinde her belge zaten yeniden başlıyor.
