# TEST_REPORT

**Önemli:** Playwright WebKit 26.6 (Linux/WPE) testleri **gerçek iPhone Safari testi değildir.** Gerçek cihazda test yapılmadı; kabul senaryosu §8'de.

"Düzeltmeli" testlerde yeni dosyalar canlı sayfaya `DOMContentLoaded` anında enjekte edildi (Wix bodyEnd `defer` özel kodunun çalıştığı an). Eski nav v1.0.1 bir yer tutucuyla devre dışı bırakıldı (= Wix'te v1.0.1 satırının v1.0.2 ile değiştirilmesi). İlk denemede Playwright `route` kullanılmıştı; bu yöntem HTTP önbelleğini kapattığı için zaman ölçümünü +8,5 sn bozuyordu. Bu sonuçlar **atıldı**, yöntem değiştirildi (`qa/scripts/build-inject.sh`).

Betikler: `qa/scripts/` · Ham sonuçlar: `qa/results/`

## 1. Özet

| Test | Chromium | WebKit | Sonuç |
|---|---|---|---|
| 21 döngü ana sayfa ↔ 7 hizmet sayfası, canlı | 21/21 döngü, 63/63 ölçüm | 19/21 döngü (2 adım `domcontentloaded` zaman aşımı) | Çökme 0 |
| 21 döngü, düzeltmeli | 21/21, 63/63 | 19/21 (aynı tür 2 zaman aşımı) | Çökme 0, asılı kalma 0 |
| İlk WebKit canlı koşusu | — | 14. döngüden sonra WebContent 1,6 GB'ta asılı kaldı | Tekrarlanmadı, kanıt `qa/results/base-webkit-run1-hang*` |
| Navigasyon (7 senaryo × 3 cihaz) | 22/24 (2 = Wix AbortError) | **27/27** | Geçti |
| Video davranışı (8 adım) | **8/8** | **8/8** | Geçti |
| Markalar slider (3 görünüm + döndürme) | Geçti | Geçti | Hata yeniden üretilemedi |
| Görsel regresyon (3 sayfa × 3 cihaz) | Geometri 9/9 aynı | — | Geçti |
| Genişletilmiş görünüm matrisi (14 ölçü × 2 sayfa) | **28/28** | — | Geçti |
| Konsol / yakalanmamış Promise (1N kaynaklı) | 0 / 0 | 0 / 0 | Geçti |
| Karışık içerik | 0 istek | — | Geçti |

## 2. Tekrarlı navigasyon döngüsü (21 döngü: ana sayfa → hizmet i → kaydır → geri)

Ölçüm: her yükleme +6 sn ve kaydırma sonrası. Sayaçlar: `qa/scripts/instrument.js`.

**Belge başına sayaçlar (ana sayfa, geri dönüş sonrası, 21 döngü boyunca):** window dinleyici 112–115, document dinleyici 42, interval 8, canlı IO 8 / MO 4 / RO 1, ScrollTrigger 13, video 5 (kaynaklı 1–2). Hizmet sayfaları da kendi içinde sabit. **Belge içi birikim yok.** Header/Logo/MENU 4 koşunun 244/244 ölçümünde görünür (yükleme + 6 sn sonrası; ilk saniyelerdeki gecikme §PERFORMANCE'ta ölçüldü).

| Metrik | Canlı | Düzeltmeli |
|---|---|---|
| Chromium toplam tarayıcı RSS ort./maks. | 1115 / 1298 MB | 1093 / 1322 MB |
| Chromium JS heap ort./maks. | 47 / 69 MB | 42 / 54 MB |
| WebKit WebContent süreci ort./maks. | 1486 / 1949 MB | 1465 / 1886 MB |
| WebKit son 15 ölçüm ort. | 1690 MB | 1626 MB |
| Yakalanmamış Promise (1N) | 0 | 0 |

Yorum: Düzeltmenin süreç belleğine etkisi emülasyonda **gürültü düzeyinde (~%4)**. Neden bu kadar küçük kaldığı ROOT_CAUSE_ANALYSIS.md §4'te açıklanıyor.

## 3. Navigasyon (Sorun 02) — `qa/results/nav-*.json`

| Senaryo | Mobil 390 | Tablet 820 | Masaüstü 1440 |
|---|---|---|---|
| Ana sayfa MENU → Hizmetler (hedef header altında) | ✓ top 76 / header 64 | ✓ 84/72 | ✓ 100/88 |
| İç sayfa MENU → Hizmetler → `/#hizmetler-ozet` | ✓ | ✓ | ✓ |
| Geri → hizmet sayfası | ✓ | ✓ | ✓ |
| İleri → `/#hizmetler-ozet` konumu | ✓ | ✓ | ✓ (**v1.0.1'de FAIL**: top 2781) |
| Yenileme: çapa temizlenir, en üst | ✓ | ✓ | ✓ |
| Doğrudan URL `/#hizmetler-ozet` | ✓ | ✓ | ✓ |
| `/n1-full-test` → 301 → `/` | ✓ | ✓ | ✓ |
| Aktif nav sürümü | 1.0.2 | 1.0.2 | 1.0.2 |

Chromium mobil/tablette `AbortError: Transition was skipped` görüldü; canlıda da var ve Wix View Transitions kaynaklı.

## 4. Video davranışı (Sorun 03) — `/kreatif-produksiyon`, `qa/scripts/videotest.js`

| Adım | Chromium | WebKit |
|---|---|---|
| Görünürken sessiz + inline oynuyor | ✓ | ✓ |
| Ekran dışına çıkınca duruyor | ✓ | ✓ |
| Geri gelince devam ediyor | ✓ | ✓ |
| Kullanıcı duraklattı | ✓ (t=10,21) | ✓ (t=7,31) |
| Uzakta 4 sn+ → kaynak bırakıldı (`readyState 0`) | ✓ | ✓ |
| Geri dönünce kullanıcı duraklatması korunuyor | ✓ | ✓ |
| Kaynak ve konum geri geldi | ✓ (10,21) | ✓ (7,31) |
| Kullanıcı tekrar oynatınca oynuyor | ✓ | ✓ |

Ana sayfa (`qa/scripts/func.js`): sayfa sonunda yukarıdaki 3 video bırakıldı. Başa dönünce Ronin hero geri yüklendi ve oynadı. Sentetik BFCache sonrası hero `playing / is-ready`, kareler ilerliyor (WebKit). Hata 0.

## 5. Markalar (Sorun 05) — `qa/scripts/marquee.js`, `rotate.js`

Canlı (sitewide-fix v11) ve eski v11 aynı sonucu verdi: 390×844, 820×1180, 1180×820 ve döndürme (844×390 ↔ 390×844, 1180×820 ↔ 820×1180) senaryolarında üç satır hareket ediyor. Satırlar sağ kenarı dolduruyor (`coversRight=true`). En büyük boşluk logolar arası normal aralık kadar (46/72/76 px). Uzaklaşıp dönünce satırlar devam ediyor. **Hata emülasyonda yeniden üretilemedi** → fiziksel cihazda §8-M ile kontrol edilmeli.

## 6. Görsel regresyon — `qa/results/vr-chromium.json`

Canlı ↔ düzeltmeli. Header çubuğu, logo, MENU, ilk başlık, font, 40 bölümün konum/yükseklikleri ve belge yüksekliği 9/9 kombinasyonda **birebir aynı**. Header şeridi piksel farkı: 0,00% (8 kombinasyon), mobil ana sayfada %1,02 (fark y=115–139 px: header altındaki Ronin filminin farklı karesi; header aynı).

## 7. Genişletilmiş matris — `qa/results/matrix.json`

320×640, 360×780, 375×812, 390×844, 414×896, 430×932, 844×390, 768×1024, 820×1180, 1024×1366, 1180×820, 1280×800, 1440×900, 1920×1080 × (`/`, `/kreatif-produksiyon`): yatay taşma 0, tek header (görünür), tek yüzen kontrol, 1N kaynaklı hata 0 → **28/28**. 1180×820'de emülasyon `pointer: fine` olduğundan modül pasifti; gerçek iPad yatayda aktif olmalı (§8-T).

## 8. Fiziksel cihaz kabul testi (yapılmadı — sizin tarafınızdan)

Hazırlık: Wix'te DEPLOYMENT.md uygulanıp yayınlandıktan sonra. Her testi önce `https://www.reklam1n.com/?n1diag=1` ile açın; sol altta günlük görünür.

**iPhone — Safari ve Chrome (ayrı ayrı):**
1. Ana sayfa → Hizmetler → bir hizmet sayfası → telefonun geri hareketi → başka hizmet. 7 hizmetin tamamı × 3 tur (21 döngü). Beklenen: "Bu sayfa pek çok hata ile karşılaştı" uyarısı **yok**.
2. Geri dönüşte günlükte `pageshow persisted=true` (BFCache) mi, `nav=reload` (Wix ATS) mı yazdığını not edin.
3. Her dönüşte Header, logo, MENU 1 sn içinde görünür mü?
4. Ronin filmi dönüşte oynuyor mu (poster takılı kalmamalı)?
5. Hizmet sayfasında videoyu elle durdurun → aşağı kaydırıp 5 sn bekleyin → geri çıkın: video durmuş kalmalı, aynı karede.
6. Düşük Güç Modu açıkken: video oynamazsa poster + oynat simgesi görünmeli, tek dokunuşla oynamalı.
7. MENU → Hizmetler (ana sayfada ve iç sayfada) → doğru bölüme iner mi? İleri/geri tuşları doğru konuma gider mi?
- (Mac varsa) Safari Web Inspector → Timelines → Memory: 21 döngüde "Page" belleğinin sürekli artıp artmadığını kaydedin.

**T — iPad dikey ve yatay:** 1–7 aynı. Yatayda `?n1diag=1` günlüğünde `mobil=true` görünmeli.

**M — Markalar:** iPhone ve iPad'de "Öne çıkan markalar" bölümünde 3 satırın da kaydığını, siyah boşluk olmadığını kontrol edin. Ekranı döndürüp tekrar bakın.

**Windows masaüstü:** Ana sayfa ve 2 hizmet sayfasında görünümün değişmediğini kontrol edin (modül masaüstünde pasif).

Sonuçları (cihaz modeli, iOS sürümü, tarayıcı, döngü sayısı, uyarı çıktı mı, günlük ekran görüntüsü) bildirin.
