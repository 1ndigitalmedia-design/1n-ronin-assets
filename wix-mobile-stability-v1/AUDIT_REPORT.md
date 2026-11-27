# AUDIT_REPORT — 1N Digital Media · Mobile Stability & Technical Optimization V1.0 / V1.1

## V1.1 ek denetim (27 Kasım 2026) — bağımsız incelemenin 10 maddesi

| # | Madde | Bulgu | Önem | Kanıt | Durum |
|---|---|---|---|---|---|
| B-01 | Ön yükleme (WARM) etkisi | V1.0'da 36 URL. A/B (n=3, yavaş 4G + 4× CPU): yalnız ana sayfa listesi faydalı (−2,2/−2,4 sn header); iç sayfa ve ortak listeler tutarlı fayda göstermedi, `full` +13 istek ve kreatif'te heap +2,6 MB getirdi; aktarılan bayt ve CPU görev süresinde anlamlı fark yok | Orta | `qa/results/ab-warm-summary.txt` | Düzeltildi (F-09) |
| B-02 | `credentials:'include'` | Gereksiz: Chromium'da `omit` ve `same-origin` aynı önbellek isabetini veriyor; WebKit/WPE'de doğrulanamadı | Düşük (gizlilik) | `qa/scripts/credtest.js` | Düzeltildi (`omit`) |
| B-03 | Kapsam | V1.0 modülleri Wix "Tüm sayfalar" girişiyle Intelligence, müşteri ve yönetim sayfalarında da yükleniyordu (video yoksa etkisizdi, ancak dinleyici/gözlemci kuruluyordu) | Orta | Kod | Düzeltildi (F-07) |
| B-04 | Yaşam döngüsü | V1.0: `farTimers` Map'i ayrık videolara güçlü referans tutuyordu; MO pagehide'da açık kalıyordu; BFCache dönüşünde IO yeniden kurulmuyordu (eski IO devam ediyordu); profil değişimi ele alınmıyordu; uzaktayken DOM'dan çıkan videonun zamanlayıcısı kalıyordu (V1.1 ilk test turunda bulundu) | Orta | `qa/results/v11-functional-results.txt` | Düzeltildi (F-08) |
| B-05 | Nav yükleme sırası | Ana sayfa (`n1-site-wix-v656.js:468`) eski v1.0.1'i kendisi yüklüyor. Chromium'da yeni nav 6 sn geciktiğinde **v1.0.1 etkin oldu**; WebKit'te aynı senaryoda v1.0.3. Risk gerçek ve motora bağlı | Yüksek | `qa/results/navorder-*.json` | Düzeltildi (F-10, head koruması) |
| B-06 | Yeni nav yüklenemezse | Koruma varken v1.0.3 hiç gelmezse hiçbir nav etkin olmaz (yerel çapa davranışı: Hizmetler bağlantısı yine çalışır, header ofseti olmadan) | Düşük | Senaryo F | Kabul edilen bozulma, rapor |
| B-07 | Ronin 2× seçimi | Safari'de `deviceMemory` yok → tüm iPhone'lar 2× (WebKit'te 1×'e göre +58 MB) | Yüksek (aday) | MOBILE_MEDIA_BENCHMARK.md | Ölçüldü, üretime uygulanmadı |
| B-08 | Wix ATS | `handleAccessTokens.inline.473e3296`: `client-session-bind` ve `sec-fetch-unsupported` çerezleri yoksa back_forward → reload (3/60 sn) | Yüksek (Wix) | WIX_SUPPORT_REPORT.md | Destek raporu hazır |
| B-09 | Döngü testi bekleme süresi | V1.0 testinde kaydırma sonrası 2,8 sn bekleme < 4 sn bırakma eşiği → uzak-bırakma ölçülmemişti | Orta (test) | `qa/scripts/cycle2.js` (6 sn bekleme) | Yeniden ölçüldü (TEST_REPORT §10) |
| B-10 | Tanılama | V1.0 parametresiz de sessionStorage'a günlük yazıyordu | Düşük | Kod | Düzeltildi (F-11) |
| B-11 | src çakışması | Bileşen bırakılmış videoya yeni kaynak atarsa V1.0 geri yükleme eski kaynağı yazabilirdi | Düşük | Birim testi | Düzeltildi (F-12) |
| B-12 | Ölçüm kapsamı | V1.0 raporundaki "belge içi birikim yok" ifadesi yalnızca ölçülen sayaçlar için geçerli | — | TEST_REPORT §11 | Düzeltildi (sınırlar açıkça yazıldı) |

Skill kullanımı (V1.1): **GSAP** (ScrollTrigger yenileme/temizlik ve performans bölümleri: modül GSAP kayıtlarına dokunmuyor; rAF döngüsünün ScrollTrigger'ın kendi `_rafBugFix`'i olduğu doğrulandı, ekran dışı animasyonlar sayfa kodlarında zaten duraklatılıyor). **Webapp Testing** (`with_server.py` ile yerel sunucu yaşam döngüsü: medya benchmark'ı ve birim testi; keşif → eylem yaklaşımı ile seçici doğrulama). Responsive Mobile QA (V1.0). Karpathy Guidelines, Caveman: kurulu değil.

---

Tarih: 26 Kasım 2026 · Dal: `mobile-stability-v1-audit` · Başlangıç: `mobile-stability-clean-base-20261126` @ `876de80af05318e38638d79fe0f3bb128b1d4007`

Canlı site: https://www.reklam1n.com/ — **Wix'te hiçbir değişiklik yapılmadı, yayın yapılmadı, dal birleştirilmedi.**

## 1. Yöntem

| Adım | Nasıl | Kanıt |
|---|---|---|
| Canlı kaynak tespiti | Canlı HTML'deki Wix özel kod girişleri + Playwright ile 12 sayfanın tüm ağ istekleri | `qa/results/netmap.json`, `qa/results/livemap.txt`, `qa/results/wix-custom-code-live.json` |
| Canlı ↔ GitHub karşılaştırması | jsDelivr'den 47 canlı dosya indirildi, `git hash-object` ile temiz tabanla karşılaştırıldı | DEPENDENCY_MAP.md §2 |
| Çalışma zamanı ölçümü | Sayfa betiklerinden önce enjekte edilen sayaçlar (rAF, interval, observer, window/document dinleyicileri, video durumları, GSAP tween, ScrollTrigger) + Chromium CDP + süreç RSS | `qa/scripts/instrument.js`, `qa/scripts/cycle.js` |
| 21 döngü navigasyon | Ana sayfa → 7 hizmet sayfası (sırayla, 3 tur) → geri; Chromium ve WebKit; canlı ve düzeltmeli | TEST_REPORT.md §2 |
| Kod incelemesi | Ortak modüller (header v648, nav v1, floating, footer, links), ana sayfa v6.56, 7 hizmet sayfası + Markalar + Kısaca Biz (sitewide-fix sürümleri) | Bu rapor §3 |

**Ortam sınırları:** Gerçek iPhone yok. Playwright WebKit 26.6 (Linux/WPE) ≠ iOS Safari. Ortam ağı bazı üçüncü taraf hostları (Sentry, Google Ads, Facebook, wixappcloud) engelliyor; bunlardan doğan konsol hataları ayrıştırıldı. Playwright Chromium'da BFCache geri yüklemesi gerçekleşmedi (`notRestoredReasons: masked`), bu yüzden BFCache yolu sentetik `pagehide/pageshow(persisted)` olaylarıyla test edildi.

## 2. Canlı sitenin gerçekte kullandığı kaynaklar (özet)

GitHub'daki en güncel dosya varsayılmadı; canlı ağ istekleri ölçüldü:

- Ana sayfa `n1-site-v1` → `wix-home-v656/n1-site-wix-v656.js` @ `f97db8ed…` (+ ortak modüller @ `d24fa373…`).
- 7 hizmet sayfası + Markalar + Kısaca Biz + yasal sayfalar → `wix-sitewide-mobile-fix-2026-11-26/...` @ `f97db8ed…`.
- Ortak: `n1-header-v648.js`, `n1-site-markup-v648.js`, footer/links/floating @ `d24fa373…`; iç sayfa CSS'i `wix-studyo-v1/site/n1-inner-responsive-v6.css` @ `09612df9…` (**yalnızca `wix-test-v647` dalında**).
- Site geneli Wix özel kodu: `n1-nav-v1.js` @ `b35d9875…` (tüm sayfalar, bodyEnd, `defer`).
- GSAP 3.13.0 + ScrollTrigger (+ SplitText ana sayfa, Flip Markalar) cdnjs'ten.
- 47 canlı dosyanın 46'sı temiz tabandaki dosyalarla **bayt düzeyinde aynı**; tek eksik `n1-inner-responsive-v6.css` idi → bu dala aynen eklendi (`dd8e6d4`).
- `d24fa373…` commit'i hiçbir dalda yok (jsDelivr önbelleğinden servis ediliyor); dosyaları temiz tabanla aynı. Tam liste: DEPENDENCY_MAP.md.

## 3. Bulgular

Önem: **Kritik / Yüksek / Orta / Düşük / Bilgi**. "Durum": Düzeltildi · Azaltıldı · Doğrulanamadı · Wix kaynaklı · Rapor.

| # | Bulgu | Dosya:satır | Önem | Kanıt | Durum |
|---|---|---|---|---|---|
| A-01 | Ana sayfa videoları `pagehide`'da yalnızca **duraklatılıyor**, kaynak/çözücü bırakılmıyor | `wix-home-v656/modules/n1-video-m5.js:155`, `:344`; bırakma yalnız `destroy` içinde `:158`, `:359` | Yüksek | Kod; WebKit sentetik BFCache testi | Azaltıldı (F-01) |
| A-02 | Hizmet sayfalarında `pagehide` işleyicisi **yok**; video kaynağı yalnızca `disconnectedCallback`'te bırakılıyor, tam sayfa geçişinde bu çalışmıyor | ör. `wix-sitewide-mobile-fix-2026-11-26/wix-kreatif-produksiyon-v23/n1-kreatif-produksiyon-v23.js:990-993`, `:1268`; diğer 6 sayfa için ROOT_CAUSE_ANALYSIS.md §3 | Yüksek | `grep -c pagehide` = 0 (10 dosya) | Azaltıldı (F-01) |
| A-03 | Kaydırılıp geçilen videolar duraklatılıyor ama tamponları tutuluyor | kreatif `:974-981` (IO yalnız `pause`) | Orta | Chromium 21 döngü: sayfa sonunda 60 videonun 54'ü `readyState≥2` | Azaltıldı (F-02) |
| A-04 | **Wix ATS** betiği BFCache dışı her geri/ileri gezinmesini 60 sn'de 3 kereye kadar `location.reload()` ile ikinci kez yüklüyor | Wix çekirdeği (canlı HTML, satır içi `security_overrideGlobals` bloğu) | Yüksek (bellek/süre) | `qa/scripts/bfprobe2.js`: `back_forward` → ~200 ms sonra `reload`; geri yolunda WebKit süreci +150–250 MB | Wix kaynaklı — kodla değiştirilemez |
| A-05 | WebKit'te tek WebContent süreci 21 döngüde 1040 → ~1700 MB büyüyor | — | Yüksek (iOS jetsam riski) | `qa/results/base-webkit.json` | Kısmen açıklandı; ROOT_CAUSE §4 |
| A-06 | Nav v1.0.1, Wix ATS yeniden yüklemesini "kullanıcı yenilemesi" sanıp `/#hizmetler-ozet` çapasını siliyor (ileri tuşu → en üst) | `wix-home-v648/modules/n1-nav-v1.js:224-230` | Orta | Chromium masaüstü: `top 2781, hash ''` | Düzeltildi (F-03) |
| A-07 | Ana sayfada mobil header, Wix'in Custom Element betiğini geç istemesi (≈8,4 sn, yavaş 4G + 4× CPU) + bizim seri zincirimiz yüzünden ≈11,5 sn'de görünüyor | `wix-home-v656/n1-site-wix-v656.js:470-485` (14 CSS → **seri** `n1-home-m5.css` `:471` → render → header JS `:483`) | Yüksek (Sorun 04) | `qa/scripts/tl.js` zaman çizelgesi | Azaltıldı (F-04: −1,8 / −2,2 sn) |
| A-08 | İç sayfalarda header, markup + 2 CSS beklendikten sonra **sırayla** yükleniyor | kreatif `:794`, `:828`, `:871` | Orta | Header ≈3,4–4,4 sn | Kısmen azaltıldı (F-04, sıcak önbellekte −0,6…−0,8 sn) |
| A-09 | Ana sayfada nav hem Wix özel kodundan hem `n1-site-wix-v656.js:80,468`'den yükleniyor | — | Düşük | `window.__n1Nav` koruması (`n1-nav-v1.js:25`) çift başlatmayı engelliyor | Rapor (zararsız) |
| A-10 | Canlı iç sayfa CSS'i yalnızca `wix-test-v647` dalındaki bir commit'te | `09612df9…` | Orta (sürdürülebilirlik) | `git branch -r --contains` | Düzeltildi (dosya bu dala kopyalandı) |
| A-11 | `AbortError: Transition was skipped` yakalanmamış Promise hatası (iç sayfadan MENU → Hizmetler) | Wix View Transitions (canlı HTML `:root:active-view-transition …`, `pagereveal`) | Düşük | Canlıda da var, 1N kodunda VT kullanımı yok | Wix kaynaklı |
| A-12 | Sürekli rAF döngüsü (≈120/sn) | GSAP ScrollTrigger iç `_rafBugFix` | Bilgi | `qa/scripts/rafsrc.js` yığın izi | Bizim kodumuz değil; işlem yok |
| A-13 | Markalar: 2./3. satır ve siyah boşluk | eski `wix-markalar-v1/n1-markalar-v11.js` (mobilde satırlar `opacity:0` + ScrollTrigger tetikli) | Orta | Canlı (sitewide-fix) ve eski sürüm emülasyonda **çalışıyor** | Yeniden üretilemedi; canlı sürümde önlem mevcut (`:553`, `:563`, `:654`) |
| A-14 | E-Ticaret: 2160×2700 px görsel 140×175 px'te gösteriliyor | `wix-sitewide-mobile-fix-2026-11-26/wix-e-ticaret-yonetimi-v23/...` (Wix medya `6dbf5e_568ef15…`) | Düşük | `qa/scripts/imgs.js` | Rapor (görsel içeriğe dokunulmadı) |
| A-15 | Her sayfada üçüncü taraf `graphs.bestfreecdn.com` (Wix "Graphs" uygulaması) betiği | Wix uygulaması | Düşük (güvenlik/performans) | `qa/scripts/pwcheck.js` | Rapor |
| A-16 | "Özel Yükleniyor %" özel kodu `setInterval(checkRoute, 500)` ile süresiz çalışıyor | Wix özel kodu (repo dışı) | Düşük | `qa/results/wix-custom-code-live.json` | Rapor |
| A-17 | `n1-header-v648.js` `disconnectedCallback` bekleyen rAF'ı iptal etmiyor | `wix-home-v648/modules/n1-header-v648.js:218`, `:224` | Düşük | Kod | Rapor (etkisi ihmal edilebilir, canlı dosyaya dokunulmadı) |
| A-18 | Güvenlik: karışık içerik yok, herkese açık sayfalarda şifre alanı yok, HSTS + `nosniff` var, CSP yok | — | Bilgi | §4 | Rapor |

## 4. Sorun 06 — Güvenlik ve "Zayıf şifre" uyarısı

- 5 sayfada `http://` ile başlayan istek: **0**. `isSecureContext: true`. Canlı JS/CSS kaynaklarında `http://` adres: **0** (yalnız SVG ad alanları).
- Başlıklar: `strict-transport-security: max-age=31556952` (`includeSubDomains`/`preload` yok), `x-content-type-options: nosniff`. CSP ve `X-Frame-Options` yok. Bunlar Wix tarafından yönetiliyor.
- `reklam1n.com` → 301 → `https://www.reklam1n.com/`. TLS sertifikası bu ortamdan doğrulanamadı: çıkış trafiği TLS denetleyen bir proxy'den geçiyor.
- 1N kodları sabit commit SHA ile yükleniyor (iyi uygulama). cdnjs GSAP sürüm sabit ama SRI (integrity) yok. Wix Custom Element betiklerine SRI eklenemiyor.
- **"Zayıf şifre tespit edildi":** Ana sayfa, 3 hizmet/içerik sayfası ve /iletisim'de (shadow DOM dahil) `input[type=password]` sayısı **0**. Canlı HTML ve 47 1N kaynak dosyasında "zayıf/şifre" metni yok. Bu uyarı sitenin ürettiği bir içerik değil; Chrome'un Şifre Yöneticisi'nin (Password Checkup) bu alan adı için **kayıtlı** bir şifreyi zayıf bulmasıdır. Uyarı büyük olasılıkla Wix üye/Intelligence girişinde kaydedilmiş bir şifreden geliyor. Doğrulamak için: Chrome → `chrome://password-manager/checkup` veya https://passwords.google.com → reklam1n.com kaydı "zayıf" olarak listelenir. Çözüm: o hesabın şifresini güçlü bir şifreyle değiştirmek. Intelligence giriş sistemine, şifrelere ve backend'e **dokunulmadı**.

## 5. Kullanılan / erişilemeyen skill'ler

| Skill | Durum |
|---|---|
| Responsive Mobile QA (`anthropic-skills:responsive-mobile-qa`) | Yüklendi; test matrisi (320–1920 px), yatay taşma, tekil Header, gerçek cihaz kontrol listesi bu skill'e göre uygulandı |
| Webapp Testing, GSAP, Creative Scroll Motion, Design Motion Principles, Accessible Typography, Web Design Guidelines | Kurulu. Bu çalışmada yeniden tasarım ve animasyon değişikliği yapılmadığı için yüklenmedi; GSAP/ScrollTrigger yaşam döngüsü kod düzeyinde incelendi |
| Karpathy Guidelines, Caveman | **Bu oturumda kurulu değil / erişilemedi** |
