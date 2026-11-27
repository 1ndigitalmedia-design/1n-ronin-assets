# V1.3 QA — betikler ve ham sonuçlar

Betikler Playwright ile canlı siteye karşı çalışır (`npm i playwright`, ya da hazır Playwright kurulumu). Çoğu yerel dosyaları `/home/user/1n-ronin-assets/` yolundan okur; başka makinede `R=` sabitlerini düzeltin.

| Betik | Ne ölçer | Sonuç |
|---|---|---|
| `live13.js` | 15 sayfa canlı yapılandırma | `results/live13.json` |
| `p01vp.js`, `p01rec.js`, `menutest.js` | P01 menü kalıntısı (4 görünüm), menü kullanılabilirliği | MENU_FIX_REPORT |
| `p04frames.js`, `p04analyze.py`, `p04batch.sh`, `vtdet.js`, `k2h.js`, `ld8.js` | Loader kare analizi, View Transition denemesi, 8 sn üst sınır | `results/p04-batch.log` |
| `p02gesture.js`, `route658.js` | Düşük Güç Modu dokunuş testi (v657 ↔ v658) | TEST_REPORT §8 |
| `p03back.js`, `p03batch.sh` | Yüklenirken geri matrisi (392 döngü) | `results/p03/` |
| `cycle13.js`, `scen13.js`, `af.sh`, `af_sum.py`, `instrument.js` | A–F 21 döngü | `results/af/` |
| `tswitch.js`, `inj-*.js` | Test anahtarı / Ronin varyantları | MOBILE_MEDIA_BENCHMARK |
| `p02pages.js` | Sayfa kaynak profili | `results/p02/` |
| `p02et.js`, `p02bis.js`, `p02jump.js`, `gradual.js` | E-Ticaret çökmesinin izolasyonu | ROOT_CAUSE §P02-B |
| `grad24.js`, `grad24.sh`, `routeEt.js` | Kademeli kaydırma regresyonu (v23 ↔ v24) | `results/grad24.*` |
| `vis24.js` | v23 ↔ v24 görsel eşdeğerlik | `results/visual/` |
| `uxgray.js` | UI/UX "Gri tonlamalı önizle" anahtarı | ROOT_CAUSE §P02-C |

`minimal-repro/`: site kodu olmadan WebKit filtre geçişi çökmesi. `index.html` için yanına 192×240 boyutlu herhangi bir `t.png` koyun; `node run.js "grayscale(1) brightness(.42)"` → çökme, `ON="grayscale(0) brightness(1)" node run.js …` → çökme yok.
