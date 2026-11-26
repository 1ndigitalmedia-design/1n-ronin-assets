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
