# Kariyer V1 — İnsan Kaynakları, Açık Pozisyonlar, Staj Programları + global menü

**Dal:** `claude/happy-sagan-l6tbsc`; tabanı V1.4 (`mobile-performance-v14` @ `624430a`, canlıda yayında).

**Durum:** kod, test ve Wix kurulum paketi hazır. **Wix'e uygulanmadı** (Save / Publish yok), PR birleştirilmedi.

## Ne yapıldı
- **Üç yeni sayfa** (tek bileşen dosyası, üç etiket): `/insan-kaynaklari`, `/acik-pozisyonlar`, `/staj-programlari`.
  - Tasarım: tipografik, kısa ve hafif (video, görsel, canvas yok). Ayrıntı: DESIGN_GUIDE.
- **Global menü:** İnsan Kaynakları artık `/insan-kaynaklari`'ya giden bir bağlantı. Yanındaki ayrı **KARİYER +** düğmesi alt menüyü açar: Açık Pozisyonlar, Staj Programları. "Ekibimize Katıl" kaldırıldı.
  - Header v13 ve site işaretlemesi v15 üretildi.
  - Menüyü taşıyan **11 sayfa dosyasının** (15 Custom Element) yeni sürümü üretildi. Bu dosyalarda yalnız header/markup adresleri değişti; ana sayfa ve hizmet sayfaları V1.4 tabanlıdır.
  - Ayrıntı: MENU_UPDATE_REPORT.
- **Loader v13.1:** V1.3 + iki rota.
- **301 talimatı** (`/ekibimize-katil` → `/insan-kaynaklari`): DEPLOYMENT §4.
- **SEO:** SEO_SETTINGS.

## Klasör
```
modules/          n1-header-v13.js            (hibrit İK satırı)
site/             n1-site-markup-v15.js       (kariyer menüsü; V1.4 Hikâyemizin Devamı → /kisaca-biz korunur)
pages/            n1-career-v1.js             (3 kariyer sayfası)
sites/            home/ + pages/              (menü için yeniden yayınlanacak 11 mevcut sayfa dosyası)
src/              kariyer sayfası şablonu + içerik (tek kaynak; ileride ilan/staj eklemek için "items" dizileri)
wix-custom-code/  LOADER-v13.1-ozel-yukleniyor.html, verify-cdn-career.sh
tools/            build_header.py, build_markup.py, build_pages.py, build_sites.py, make_server_urls.py, make_deployment.py, make_rollback.py
tests/            routecareer.js (Wix'e dokunmadan canlı sitede test), career-test.js, extra-test.js, shots.js, cdn-smoke.js, native-scan.js, live-urls.js
qa/               ham test sonuçları ve günlükler
screenshots/      3 sayfa × masaüstü / tablet / tablet yatay / mobil
```

## Belgeler
DEPLOYMENT (ana kurulum belgesi) · SERVER_URLS · ROLLBACK · CDN_VERIFICATION · SEO_SETTINGS · MENU_UPDATE_REPORT · DESIGN_GUIDE · TEST_REPORT · FINAL_REPORT

## Yeniden üretim
```bash
python3 wix-career-v1/tools/build_header.py
```
```bash
python3 wix-career-v1/tools/build_markup.py
```
```bash
python3 wix-career-v1/tools/build_pages.py f40415a3785e0172bdcc58189479253ff10cd17e
```
```bash
python3 wix-career-v1/tools/build_sites.py f40415a3785e0172bdcc58189479253ff10cd17e
```
```bash
bash wix-career-v1/wix-custom-code/verify-cdn-career.sh
```
