# V1.2 QA
`scripts/scen.js` — senaryo düzeneği: canlı HTML her istekte `curl` ile alınır; **A** aynen; **B** Wix'in "Capa Navigasyonu" ve "V1.1 Test Anahtarı" özel kod bloklarını HTML'den çıkarır ve canlı Custom Element betiklerini (`@f97db8ed`) `wix-global-menu-v12/pages/` dosyalarıyla değiştirir; **C** = B + `n1-stability-v1.1.1.js`. A da aynı yönlendirme katmanından geçer (eşit önbellek koşulu).
- `scencheck.js` — A/B/C kurulum doğrulaması (nav/stabilite/menü/Hizmetler bölümü)
- `menutest.js` — menü kullanılabilirliği, 5 görünüm, ekran görüntüleri (`../screenshots/`)
- `menuhop.js` — menüden 7 hizmet sayfası + 7 geri + 7 ileri; bellek ve ATS
- `cycle3.js` — 21 döngü (6 sn bekleme), `SCEN=A|B|C`
- `livev11.js` — canlıdaki V1.1 test anahtarı kontrolü
