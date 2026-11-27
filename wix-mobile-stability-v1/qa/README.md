# QA betikleri ve sonuçları

Playwright 1.63 (Chromium 1243, WebKit 26.6). Canlı site üzerinde çalışır; Wix'te hiçbir şey değiştirmez.

```bash
bash scripts/build-inject.sh > inject-all.js           # düzeltmeli test paketi
node scripts/cycle.js webkit live 21 base.json          # 21 döngü canlı
N1_INJECT=$PWD/inject-all.js node scripts/cycle.js webkit patched 21 fix.json
N1_INJECT=$PWD/inject-all.js node scripts/navtest.js webkit patched
N1_INJECT=$PWD/inject-all.js node scripts/videotest.js webkit patched
node scripts/hdrtime.js live hdr-live.json              # yavaş 4G + 4× CPU header süresi
python3 scripts/summarize.py base.json
```

Betikler `instrument.js`'i göreli yolla yükler; `scripts/` klasöründen çalıştırın. `route.js` yalnızca işlevsel testlerde kullanıldı (HTTP önbelleğini kapattığı için zaman ölçümünde kullanılmaz).

`results/`: `base-*/fix-*` (21 döngü), `hdr-*` (header süresi), `nav-*`, `vr-chromium.json` (görsel regresyon), `matrix.json`, `gpu.json`, `netmap.json` / `livemap.txt` (canlı bağımlılıklar), `wix-custom-code-live.json` (canlı özel kod, geri dönüş kaynağı), `base-webkit-run1-hang*` (tekrarlanmayan asılı kalma kaydı).

## V1.1 eklenenler
- `scripts/build11.sh <off|home|page|full> <1|0>` — V1.1 test paketi (head koruması + nav v1.0.3 + stabilite v1.1, ön yükleme modu seçilebilir)
- `scripts/ab.js` — ön yükleme A/B (header süresi, bayt, CPU, heap); `results/ab-warm/`, `results/ab-warm-summary.txt`
- `scripts/navorder.js` — canlı HTML yeniden yazılarak nav yükleme sırası senaryoları; `results/navorder-*.json`
- `scripts/optin.js` — `wix-custom-code/01–05` yapılandırmaları gerçek CDN ile
- `scripts/v11func.js` — kapsam, tanılama, BFCache, ayrık video
- `scripts/credtest.js` — fetch credentials modları ve önbellek isabeti
- `scripts/cycle2.js` — 6 sn bekleme süreli 21 döngü (`DWELL` ortam değişkeni); `results/long-*.json`
- `media-bench/` — Ronin 1×/1,5×/2× benchmark ve birim testi (`with_server.py --server "node server.js 8790" --port 8790 -- node mediabench.js`); 1,5× dosyası depoya eklenmedi (test kodlaması)
