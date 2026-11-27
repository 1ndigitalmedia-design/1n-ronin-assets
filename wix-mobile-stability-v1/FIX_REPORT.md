# FIX_REPORT — Uygulanan düzeltmeler

## V1.1 (27 Kasım 2026) — bağımsız inceleme sonrası

Yeni dosyalar: `n1-stability-v1.1.js` (v1.1.0), `n1-nav-v1.0.3.js`, `wix-custom-code/01–05`. V1.0 dosyaları (`n1-stability-v1.js`, `n1-nav-v1.0.2.js`) değiştirilmedi ve **yayınlanmayacak**; V1.1 bunların yerine geçer. Canlıda kullanılan hiçbir dosyaya dokunulmadı.

Kod commit'leri: `4d1b75d` (v1.1 + nav v1.0.3), `1bd1f1e` (src koruması), `bdd12eb` (uzak-bırakma varsayılan kapalı). **Dağıtım SHA'sı: `bdd12eb7eeb1abdd3c0fada821f5ff3d19d206a2`.**

| Kod | Değişiklik | Dosya:satır | İnceleme maddesi | Test |
|---|---|---|---|---|
| F-07 | **Kapsam:** kurumsal rota izin listesi + açık red listesi (`intelligence`, `admin`, `dashboard`, `panel`, `login`, `giris`, `account`, `profile`, `settings`, `members`, `popup-`, `n1i-` …). Kapsam dışında dinleyici, gözlemci, zamanlayıcı ve ağ isteği yok | `n1-stability-v1.1.js:32-38`, `n1-nav-v1.0.3.js` başlangıç | 2 | /intelligence, /intelligence-admin, /dashboard, /ella-cikolata, /iletisim → iki modül de pasif (Chromium + WebKit) |
| F-08 | **Yaşam döngüsü** (uzak-bırakma `?n1far=1` ile açıkken geçerli kısımlar dahil): zamanlayıcı öğe üzerinde (`__n1farT`, modülde Map yok); `pagehide` → zamanlayıcılar temiz, IO/MO kapalı; `pageshow(persisted)` → tek IO yeniden; ayrık video → `forget()` (gözlem bırakılır, kaynak geri yüklenmez, sarmalayıcı kaldırılır); uzaktayken çıkan video zamanlayıcıda temizlenir; masaüstü ↔ mobil profil geçişi | `n1-stability-v1.1.js` `onFar`, `forget`, `connect`, `disconnect`, `onPageHide`, `onPageShow`, `onProfile` | 3 | 12/12 işlevsel (iki motor); 2 sentetik BFCache döngüsünde `starts=1`, gözlemci tekrarı yok |
| F-09 | **Ön yükleme:** A/B sonrası yalnızca ana sayfa listesi (`WARM_MODE='home'`); iç sayfa ve ortak listeler kaldırıldı; `credentials:'omit'` | `n1-stability-v1.1.js:41-75` | 1 | Ana sayfa header −2,2 / −2,4 sn; iç sayfalarda `page`/`full` fayda göstermedi |
| F-10 | **Nav yükleme sırası koruması:** head satır içi `window.__n1Nav={pending:'1.0.3'}`; v1.0.3 `pending`'i devralır, gerçek örnek varsa `__n1NavConflict` raporlar | `n1-nav-v1.0.3.js` başlangıç; `wix-custom-code/01` | 4 | Chromium'da koruma yokken gecikmede v1.0.1 kazandı; korumayla 7 senaryonun hepsinde doğru |
| F-11 | **Tanılama:** yalnızca `?n1diag=1` (sekme boyunca kalıcı, `?n1diag=0` kapatır); normal ziyaretçide sessionStorage yazımı, günlük, interval ve DOM yok | `n1-stability-v1.1.js` tanılama bölümü | 8 | Normal ziyaretçi: n1* sessionStorage yazımı 0; tanılama ana sayfa → hizmet sayfasında açık ve günlük taşındı |
| F-12 | **src koruması:** bileşen bırakılmış videoya yeni kaynak atadıysa (ör. hero yedek dosyası) geri yükleme onu ezmez | `n1-stability-v1.1.js:139` `restore()` | 3 | Birim testi 5/5 (iki motor) |
| F-14 | **Uzak-bırakma varsayılan kapalı:** 21 döngü × 2 eşleştirilmiş WebKit koşusunda süreç belleği düşmedi; IO/MO yalnızca `?n1far=1` (sekme boyunca) ile kurulur | `n1-stability-v1.1.js` `FAR_RELEASE_DEFAULT`, `farOn`, `connect()` | 7 | Varsayılan: IO/MO yok (13/13); `?n1far=1` ile bırakma 8/8 |
| F-13 | **Test anahtarı:** canlıda yalnızca `?n1v11=1` açan cihazda V1.1; normal ziyaretçi bugünkü davranışı görür | `wix-custom-code/03`, `04` | 9 | 8/8 (iki motor), gerçek CDN adresleriyle |

Kaldırılan / değişen V1.0 davranışları: iç sayfa ve ortak dosya ön yüklemesi (fayda yok); `credentials:'include'` (gereksiz); tanılamanın parametresiz günlük yazması; MutationObserver'ın sayfadan ayrılırken açık kalması.

Uygulanmayanlar (onay gerekir): Ronin 2× → 1× / 1,5× (MOBILE_MEDIA_BENCHMARK.md §5); Wix ATS (WIX_SUPPORT_REPORT.md).

---

## V1.0 (26 Kasım 2026)

Bu dalda yapılan değişikliklerin tamamı **yeni dosyalardır**. Canlıda kullanılan hiçbir dosya değiştirilmedi. Böylece mevcut CDN adresleri birebir korunuyor ve geri dönüş, Wix'te tek satırın eski haline getirilmesinden ibaret.

Kod commit'i (CDN sabitlemesi için): `102b76a46417417be9c87d5cc71ce210d8e1f791`

| Kod | Dosya | Commit | Sorun |
|---|---|---|---|
| F-01 | `wix-mobile-stability-v1/n1-stability-v1.js` (pagehide/pageshow medya yaşam döngüsü) | `bbdea4a` | 01, 03 |
| F-02 | aynı dosya (ekran dışı medya bırakma) | `bbdea4a` | 01, 03 |
| F-04 | aynı dosya (sayfa bağımlılıklarını önbelleğe ısıtma) | `bbdea4a`, `2154e7e` | 04 |
| F-03 | `wix-mobile-stability-v1/n1-nav-v1.0.2.js` | `102b76a` | 02 |
| F-05 | `wix-studyo-v1/site/n1-inner-responsive-v6.css` (canlı bağımlılığın korunması) | `dd8e6d4` | Sürdürülebilirlik |

---

## F-01 · Sayfadan ayrılırken video kaynaklarını bırakma, BFCache dönüşünde geri yükleme
- **Sorun:** A-01, A-02 (AUDIT_REPORT). Videolar `pagehide`'da yalnızca duraklatılıyor, çözücü ve tampon bellekte kalıyor.
- **Önem:** Yüksek.
- **Çözüm:** `n1-stability-v1.js`, `pagehide` (capture) anında `<n1-*>` içindeki ve `src` özniteliği olan her video için konum ve "oynuyordu" bilgisini saklar, ardından `pause → removeAttribute('src') → load()` uygular. `pageshow(persisted)` (capture, bileşen işleyicilerinden **önce**) anında ekranda/yakında olanların kaynağını ve konumunu geri yükler. Sayfadan ayrılırken oynayan ve hâlâ görünür olan video sessiz/inline yeniden başlatılır; **kullanıcının duraklattığı video oynatılmaz**. Uzaktakiler yaklaşınca yüklenir.
- **Kapsam dışı:** Wix'in kendi videoları (`n1-*` dışı), `<source>` kullanan videolar, masaüstü (modül yalnızca `(max-width:1024px), (hover:none) and (pointer:coarse)` profilinde aktif).
- **Test:** Chromium + WebKit sentetik BFCache: kaynaklar bırakıldı (`readyState 0`); `pageshow` sonrası Ronin hero `playing`, `is-ready`, kareler 83 → 131, konum 13,86 → 15,87 sn. **Geçti.**

## F-02 · Ekranın çok dışındaki duraklatılmış videoların kaynağını bırakma
- **Sorun:** A-03. Uzun sayfalarda geçilen videoların tamponları tutuluyor.
- **Çözüm:** `IntersectionObserver` (`rootMargin 150%`). Uzak bölgede ve **duraklatılmış** olarak ≥4 sn kalan videonun kaynağı bırakılır, yaklaşınca kaynak ve konum geri gelir. Oynatma kararı yine sayfa bileşenindedir. Bırakılmış videoda bileşen `play()` çağırırsa örnek düzeyindeki bir sarmalayıcı önce kaynağı geri yükler (`playIntercepts`). Oynayan videoya dokunulmaz.
- **Test:** `/uygulama-gelistirme` sonunda 4 videonun 3'ü bırakıldı, başa dönünce hero geri yüklenip oynadı. Kreatif'te kullanıcı duraklatması bırakma + geri yükleme sonrası korundu (8/8, iki motor). **Geçti.**
- **Risk değerlendirmesi:** `requestVideoFrameCallback` zincirinin `src` sıfırlamasında kopmadığı ayrıca doğrulandı (Chromium 48→85, WebKit 45→86 kare). Ronin hero'nun kare izleme mantığı korunuyor.

## F-03 · Nav v1.0.2 — Wix ATS yeniden yüklemesinde çapanın korunması
- **Sorun:** A-06. `n1-nav-v1.js:224-230` `reload` tipindeki her yüklemede `/#hizmetler-ozet`'i silip en üste atıyor. Wix ATS geri/ileri gezinmesini `reload`'a çevirdiği için ileri tuşu yanlış konuma gidiyordu.
- **Önem:** Orta.
- **Çözüm:** Her sayfadan ayrılırken yol `sessionStorage`'a yazılır. `reload` yüklemesinde son ayrılan sayfa **farklı yolsa** (≤15 sn) bu bir geri/ileri gezinmesi sayılır ve çapa korunur. Aynı sayfada gerçek yenileme davranışı değişmedi. Başka satır değişmedi (diff: +17 satır, yalnızca yorum, yardımcılar ve tek koşul).
- **Test:** Chromium masaüstü ileri tuşu: önce `top 2781, hash ''` (FAIL) → sonra `top 100` (PASS). WebKit mobil/tablet/masaüstü **27/27**, Chromium 22/24 (2 FAIL = Wix View Transition AbortError, canlıda da var).

## F-04 · Ortak ve sayfaya özgü bağımlılıkları Wix hidrasyonu sırasında önbelleğe ısıtma
- **Sorun:** A-07, A-08. Wix, Custom Element betiğini ancak kendi hidrasyonu bitince (≈8,4 sn, yavaş 4G + 4× CPU) istiyor. Header ondan sonra 14 CSS + seri `n1-home-m5.css` + markup + header JS zincirini bekliyor. Site geneli özel kod ise ≈1,4 sn'de çalışıyor.
- **Çözüm:** `n1-stability-v1.js` çalıştığı anda, o sayfanın canlıda kullandığı dosyaları (sayfa betiği, ana sayfa CSS'leri, header/markup/footer/links/floating, GSAP) `fetch(..., {mode:'no-cors', priority:'low'})` ile HTTP önbelleğine ısıtır. Hiçbir şey çalıştırılmaz veya DOM'a eklenmez. Save-Data açıkken yapılmaz. 36 URL'nin hepsi 200 doğrulandı. Ana sayfa koduna dokunulmadı (alternatif olan v657 kopyası 10 MB medyanın kopyalanmasını ya da adres sabitlemesini gerektiriyordu).
- **Test (yavaş 4G + 4× CPU, n=4, medyan):** Ana sayfa header **11 494 → 9 697 ms (soğuk, −1,8 sn)**, **11 576 → 9 402 ms (sıcak, −2,2 sn)**. İç sayfalar sıcakta −566…−787 ms; soğukta −745…+319 ms (kesin değil). Ayrıntı: PERFORMANCE_REPORT.md.
- **Bakım notu:** Wix'te bir sayfanın Custom Element adresi değişirse `WARM_PAGE` listesi de güncellenmelidir. Eski kalan liste işlevi bozmaz, yalnızca boşa indirme yapar.

## F-05 · Canlı iç sayfa CSS bağımlılığının temiz hatta korunması
- **Sorun:** A-10. `n1-inner-responsive-v6.css` yalnızca `wix-test-v647` dalındaki `09612df9` commit'inde.
- **Çözüm:** Dosya aynen kopyalandı (git blob SHA ve canlı CDN içeriğiyle aynı). Canlı adres **değiştirilmedi**.

## F-06 · Tanılama
`?n1diag=1` ile sol altta pagehide/pageshow (persisted), navigasyon tipi, video/bırakılan sayısı günlüğü. `window.__n1Stability.report()` konsolda. Fiziksel cihaz kabul testi için eklendi; parametre olmadan görünmez.

---

## Bilerek yapılmayanlar (onay/ayrı çalışma gerektirir)
- Ana sayfa hero 2× filmini iPhone'da 1× ile sınırlamak (video kalitesi, ROOT_CAUSE §5).
- E-Ticaret'teki büyük görseli Wix dönüşüm adresiyle küçültmek (görsel içerik).
- "Özel Yükleniyor %" Wix özel kodundaki süresiz `setInterval` (Wix tarafı, repo dışı).
- Wix ATS çift yüklemesi ve View Transition AbortError (Wix çekirdeği).
- `n1-header-v648.js` rAF iptali (canlı ortak dosya, etkisi ihmal edilebilir).
- Markalar slider (Sorun 05): canlı sürüm iki motorda, 3 görünümde ve döndürmede sorunsuz. Yeniden üretilemeyen bir hata için kod değiştirilmedi.
