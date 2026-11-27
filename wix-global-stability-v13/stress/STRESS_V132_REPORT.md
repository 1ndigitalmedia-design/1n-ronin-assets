# STRESS_V132_REPORT — V1.3.1 stres testi denetimi, düzeltilmiş veri ve V1.3.2 güvenilir test

Tarih: 27 Kasım 2026 · Dal `mobile-stability-v1-audit` · Draft PR #2
**Canlı V1.3 sürümüne (menü, loader v13, ana sayfa v658, E-Ticaret v24, UI/UX v29) dokunulmadı. Wix'te değişiklik yapılmadı.**
**iPhone çökmesi çözülmüş değildir.** Bu rapor test aracının güvenilirliği ve verinin doğru okunması hakkındadır.

## 1. Girdi
Fiziksel iPhone (UA iOS 18.7 / Safari 27.0.1, ekran 440×956@3) · plan 7 varyant × 7 sayfa × 2 senaryo × 1 tekrar = 98 adım · 19:32–21:02 (90 dk).
Dosyalar (değiştirilmeden saklandı): `stress/results-v1.3.1/n1-stres-1795813501641.csv` (299 kayıt), `n1-stres-1795813479512.md`.

## 2. Kök neden — test denetleyicisi (n1-stress-v1.js), ham kayıtlarla eşleştirilmiş
Kullanıcı kaynaklı **varsayılmadı**: aşağıdaki her mekanizma kaynak satırı ve ham kayıtla gösteriliyor.

| # | Kusur | Kaynak | Ham kayıttaki iz |
|---|---|---|---|
| K1 | **Zamanlayıcılar belge değişince iptal edilmiyor.** `later()` yalnız `st.run/paused`'a bakıyor; belge BFCache'e girince bekleyen zamanlayıcılar donar, belge geri gelince kaldığı yerden çalışır | `:174` | "gezinme 25 sn içinde başlamadı" 6 kayıt — hepsi eski ana sayfa belgesinin 25 sn kontrolü (`:244`), plan geriye düşüşleriyle aynı anda (kayıt 55, 65) |
| K2 | **Eski belge, durumu ve adım verisini üzerine yazıyor.** Geri çağrılar `st.cur = cur; save()` ile kapanıştaki (closure) eski `cur`'u ve bellekteki `st`'yi yazıyor; sürüm/karşılaştırma yok | `:226`, `:252`, `:253`, `:258`, `:264` | **14 plan geriye düşüşü** (ör. kayıt 31: adım 19 D → adım 4 B, 19:41:35) ve ardından B adımlarının yeniden koşulması; **151 mükerrer kayıt** |
| K3 | **Geçmiş büyüyor.** Kurtarma ve varyant geçişi `location.assign('/')` (yeni geçmiş girdisi) | `:219`, `:284`, `:296` | `history.back()` ana sayfa yerine eski hizmet sayfası girdisine: **41** "geri ana sayfaya ulaşmadı" (32'si `back_forward`), **63** "beklenmeyen sayfa"; kayıt 30→31: Sosyal (D) geri → eski Sosyal belgesi (B, 7 dk önceki) |
| K4 | **Erken geri yedeği eski belgede tetikleniyor.** Hizmet sayfasındaki `history.back()` yedeği (`cur.d + 6000`) BFCache dönüşünde çalışıyor → çift geri | `:253` | K3 ile birlikte yanlış sayfalara dönüş |
| K5 | **Çökme sınıflandırması gezinme türüne bakmıyor.** "page" / "home" aşamasında gelen her yeni belge "OLASI ÇÖKME" | `:194`, `:202` | 60 "OLASI ÇÖKME"nin **30'u** `navigate` (15) / `back_forward` (13) / `bfcache` (2) — Safari çökme sonrası yeniden yüklemesi `reload` olur; bunlar çökme olamaz |
| K6 | **Tek sekme garantisi yok.** Aynı localStorage'ı iki sekme sürebilir | — | Bu çalıştırmada kanıt yok; V1.3.2'de önlem alındı |
| K7 | **Video ölçümü anlık ve tek örnek.** `!paused && readyState>2`; otomatik oynatma engeli ayrıca doğrulanmıyor | `videos()` | 216 Ronin ölçümünün tamamı `0x0`, durum `blocked`/`loading`; oynayan video 0 |

## 3. Düzeltilmiş veri (ayrıntı: `results-v1.3.1/STRESS_V131_CORRECTED_DATA.txt`, betik `analyze_v131.py`)
**Ham** (raporda olduğu gibi): 299 kayıt · 129 tamam · 60 OLASI ÇÖKME · 110 diğer. **Filtrelenmiş** (kayıt metnindeki gezinme türüne göre; belirsizler silinmedi):

| Sınıf | Kayıt |
|---|---|
| tamam | 129 |
| test denetleyicisi: beklenmeyen sayfa / geri ana sayfaya ulaşmadı / eski zamanlayıcı | 63 / 41 / 6 |
| yanlış sınıflandırılmış gezinme (navigate / back_forward / bfcache) — çökme değil | 15 / 13 / 2 |
| **çökme adayı:** hizmet sayfası etkinken `reload` · geri dönerken hizmet sayfası `reload` | **13 · 5** |
| belirsiz: ana sayfa `reload` (Wix ATS / çökme / elle) | 12 |

Benzersiz plan adımı bazında (14 adım/varyant): ≥1 "tamam" B 13 · D 14 · E 9 · R2 13 · R15 7 · R1 9 · RP 12 (toplam 77/98). Çökme adayı olan adım: B 6 · D 2 · E 1 · R2 2 · R15 3 · R1 3 · RP 0.
Çökme adayı sayfa dağılımı (ham → filtrelenmiş): Reklam 15→5 · Kreatif 12→3 · Sosyal 9→4 · Yapay Zekâ 8→1 · UI/UX 7→2 · E-Ticaret 5→2 · Uygulama 4→1.

**Geçerli örneklem: varyant karşılaştırması için yok.** Kayıt sayıları 16–100 arasında, sıra karışık (14 geriye düşüş), video hiç oynamadı, çökme etiketlerinin yarısı yanlış. D'nin düşük oranı, poster'in sıfırı ve E'nin farksızlığı bu veriyle **sonuç sayılamaz**.
Kullanılabilir tek sinyal: 18 "reload" türü hizmet sayfası yeniden yüklemesi — iPhone'da çökmenin sürdüğünü destekler, nedenini göstermez.

## 4. Video ölçümü
- 216/216 Ronin ölçümü `0x0`; durum çoğunlukla `blocked` → iOS otomatik oynatmayı reddetti. En olası neden **Düşük Güç Modu** (ya da Safari'nin otomatik oynatma ayarı). Bu yüzden V1.3.1'de video yükü hiç oluşmadı; Ronin 2×/1,5×/1×/poster karşılaştırması **geçersiz**.
- B'de kayıtlı dosya 1× (`ronin-m5-film.mp4`) — bu cihazda seçim kuralı 2× verir (`n1-m5-build.js:33`: 440 × 3 = 1320 > 840). **Olası neden:** `n1-video-m5-v13.js:284` 2× 9 sn içinde kare üretmezse 1×'e geçer. V1.3.2 doğrulamasında bu geçiş bir kez gözlendi (deneme 0.1: `ronin-m5-film.mp4 560x752 adv1`) — davranış gerçek; iPhone'daki sıklığı V1.3.2 raporunda görülecek.
- V1.3.2 her ölçümde 1 sn arayla iki örnek alır: `currentTime` ilerlemesi + `paused`, `readyState`, `networkState`, `videoWidth×videoHeight`, kaynak, medya olay sayaçları (`loadedmetadata`, `loadeddata`, `playing`, `pause`, `waiting`, `stalled`, `error`). Başlangıçta otomatik oynatma 12 sn ölçülür; olmazsa ayrı bir gerçek dokunuşla ayrım yapılır. Dokunuş izni sonraki belgelere taşınmaz (iOS); her yükleme yeniden ölçülür. Video bekleyen varyantta oynatma <%80 doğrulanırsa varyant "⚠ geçersiz", ön kontrol başarısızsa çalıştırma "VİDEO GEÇERSİZ".

## 5. Reklam Yönetimi ve Kreatif Prodüksiyon — kaynak inceleme (değişiklik yok)
| Konu | Reklam (`n1-reklam-yonetimi-v23.js`) | Kreatif (`n1-kreatif-produksiyon-v23.js`) |
|---|---|---|
| Videolar | 3: hero + manifesto aynı kaynak (`V_ADS`, `:61`, 1280×720), karar paneli **1080p** (`V_DEC`, `:62`) | 2: hero (720p) + monitör (`:273`, `:329`, `preload="none"`) |
| İlk yükleme | Karar videosunun `src`'si işaretlemede, `preload="metadata"` (`:367`) → işaretleme kurulur kurulmaz istek; yaklaşınca `auto` (`:643`, `:671`) | Hero `preload=auto` bağlanmada senkron (`:991`); monitör 400 px yaklaşınca (`:987`) |
| Görünmezlik | `visibilitychange` yalnız duraklatır (`:646`, `:711`) | aynı (`:990`) |
| Kaynak bırakma | Yalnız `disconnectedCallback` temizliğinde `pause + removeAttribute('src') + load()` (`:650`, `:714`) | aynı (`:994`, rVFC iptali dahil) |
| GSAP / ScrollTrigger | `disconnectedCallback`: `ctx.revert()`, kendi ST'leri `kill`, kendi tween'leri (`:981-995`) | aynı (`:1270-1279`) |
| `pagehide` / BFCache | **Yok** — sayfa BFCache'e girerse `disconnectedCallback` çalışmaz, kaynaklar bağlı kalır | **Yok** |
| GPU katmanı adayları | — | büyük başlıkta `mix-blend-mode:difference` (`:461`) yalnız masaüstü; mobilde `normal` (`:628`) |
**Değerlendirme:** İki sayfada da video kaynakları ve GSAP temizliği yalnız belge içi bileşen kaldırılınca çalışıyor; belge değişiminde (`pagehide`, BFCache) bırakma yok. Bu, bellek/kod çözücü baskısı için **aday mekanizmadır, kanıt değildir** (Safari bellek ölçtürmez). Varyant **D** (stabilite modülü `pagehide`'da 1N videolarının kaynağını bırakır) tam olarak bu adayı sınar → V1.3.2 planında öncelikli.

## 6. V1.3.2 güvenilir test (`stress/n1-stress-v2.js` @`fca8623`, anahtar `TEST-SWITCH-v13.2-head.html`)
Kullanım: `stress/STRESS_TEST_V132.md`. Tasarım:
| Gereksinim | Uygulama |
|---|---|
| runId / stepId / attemptId / docId | Her çalıştırma `runId`; plan adımı `stepId` (en çok plan uzunluğu); deneme `attemptId = runId|stepId|deneme`; her belge `docId`; her sekme `tabId` |
| Tek etkin denetleyici | Sekme kirası (localStorage, 5 sn nabız, 15 sn eskime); ikinci sekme PASİF; etkin sekme kapanınca yeni sekme 15 sn sonra devralır |
| Monoton durum | Her yazma karşılaştır-ve-yaz (`rev`); bildiği `rev` güncel değilse belge yazamaz ve pasifleşir |
| Eski zamanlayıcı / belge | `pagehide` ve `pageshow` kuşak (generation) sayacını artırır; bütün zamanlayıcı, yoklama ve kaydırma döngüleri kuşak + rev denetler |
| İdempotent kayıt | Sonuçlar `attemptId` anahtarlı nesnede birleştirilir; aynı deneme iki satır olamaz; ek denemeler ayrı satır (deneme no) |
| Geçmiş | Her deneme ve kurtarma `location.replace('/')` (taze ana sayfa, eşit başlangıç); geçmiş en çok [ana sayfa, hizmet sayfası] |
| Sınıflandırma | §5 STRESS_TEST_V132.md: tamam · çökme adayı (beklenmeyen `reload`) · belirsiz · Wix ATS (geri sonrası 8 sn) · beklenmeyen gezinme · yanlış geçmiş girdisi · test zaman aşımı. BFCache dönüşü çökme sayılmaz. Doğrudan ana sayfaya gitmek başarılı geri sayılmaz |
| Erken geri | Test anahtarında, **yalnız taze `navigate` yüklemede** (reload / BFCache'te asla), tek seferlik jeton |
| Odaklı plan | B, D, Ronin 2×, poster × Reklam, Kreatif × normal, erken geri 1 sn × 3 tekrar = **48 adım** (~35–45 dk); her blokta varyant sırası döndürülür |

## 7. Doğrulama (Playwright WebKit 440×956@3, iPhone UA; canlı HTML'de anahtar v13.2 enjekte, betik yerel) — iPhone değildir
| Senaryo | Beklenen | Sonuç |
|---|---|---|
| Video ön kontrolü (normal) | otomatik oynatma doğrulanır | ✓ "ÇALIŞIYOR · 2x 1120x1504" |
| Düşük Güç Modu benzetimi (dokunuşsuz `play()` reddedilir) | doğrulanmadı + dokunuş ayrımı + geçersiz işareti | ✓ "DOĞRULANMADI (blocked)"; dokunuşla "OYNUYOR"; başlatınca onay + `videoInvalid: true`, panel "VİDEO GEÇERSİZ" |
| A · hizmet sayfası etkinken zorla yeniden yükleme | çökme adayı, sonraki adım | ✓ `crash` → adım 1 |
| B · geri yanlış sayfaya | yanlış geçmiş girdisi → replace ile ana sayfa → ek deneme | ✓ `wronghist` → 1.2 `ok` |
| C · ana sayfa etkinken beklenmeyen sayfa | beklenmeyen gezinme → ek deneme | ✓ `unexpected` → 2.2 `ok` |
| D · eş zamanlı ikinci sekme | pasif, yazmaz | ✓ "PASİF", 0 olay, 0 durum yazımı |
| E · etkin sekme kapanır, bağlantı yeni sekmede | 15 sn sonra devralma, kaldığı yerden | ✓ devralma 21:31:50; kesilen deneme `unexpected`, 0.2 `ok`, çalıştırma tamamlandı |
| BFCache geri dönüşü | çökme değil | ✓ `bfcache`/`back_forward` dönüşler `ok` |
| Erken geri + Wix ATS yeniden yüklemesi | geri + ATS (çökme/belirsiz değil) | ✓ düzeltildi: 1.1 `ok`, `ats 1` (ilk sürümde "belirsiz" çıkıyordu → betik düzeltildi) |
| Mükerrer kayıt / monotonluk | deneme başına 1 kayıt; rev hiç geri gitmez | ✓ 4 plan adımı → 6 benzersiz deneme; 2 → 2; 2 → 3; rev 150 + 70 + 101 örnekte monoton |
| Normal ziyaretçi (anahtar v13.2) | test nesnesi/dosyası yok | ✓ 0 test dosyası isteği, depolama anahtarı yok |
Ham çıktılar: `qa/results/st132*.md`, `st132.log`; betikler `qa/scripts/st132*.js`, `pre132.js`, `nv132.js`.

## 8. CDN
`verify-cdn-v13.sh`: 11 adres × 20 = **220/220** (JS 200, mp4 206), bayt eşleşmesi; stres betiği v2 `@fca8623` 43 776 B.

## 9. Wix kurulumu (sizin tarafınızdan) ve geri dönüş
Kurulum: "1N - V1.3 Test Anahtarı (HEAD)" içeriğini **tamamen** `wix-custom-code/TEST-SWITCH-v13.2-head.html` ile değiştir (Tüm sayfalar · Head · en üstte) → Yayınla → `https://www.reklam1n.com/?n1t=stress2`.
Geri dönüş: içeriği `TEST-SWITCH-v13.1-head.html` (ya da `TEST-SWITCH-v13-head.html`) ile değiştir. Canlı V1.3'ün diğer parçaları etkilenmez. Cihazda testten çıkış: `?n1t=0`.

## 10. Kararlar ve sınırlar
- Stabilite modülü **varsayılan kapalı** kalır; Ronin üretimde **2×**; menü / loader V1.3, E-Ticaret v24, UI/UX v29 değişmedi.
- V1.3.1 sonuçlarına dayanarak hiçbir üretim kararı verilmez (geçersiz örneklem).
- iOS Safari'de bellek/GPU ölçülemez; çökme yalnız beklenmeyen `reload` olarak çıkarılır (elle yeniden yüklemeden ayırt edilemez).
