# TEST_REPORT — Kariyer V1

**Araçlar ve ortam:**
- Playwright Chromium 1243 ve WebKit 2359 (Linux, headless).
- **Playwright WebKit iPhone değildir;** fiziksel cihaz testi yapılmadı.
- Firefox bu ortamda kurulu değil, test edilmedi.

**Yöntem:** testler canlı sitenin (www.reklam1n.com) içinde, Wix'e dokunmadan çalıştı (`tests/routecareer.js`).
- **Mevcut sayfalar:** canlı Server URL'leri yeni sürümlere yönlendirildi.
- **Kariyer sayfaları:** canlıda henüz yok. Bu adreslere giden belge isteği yakalanıp kaydedildi; Wix'in gerçek Kısaca Biz sayfa kabuğu açıldı ve içinde kariyer bileşeni çalıştı.
- **Canlı özel kodlar** (Menü Kapanış V1.3, loader, takip kodları) testlerde sayfada **çalışır durumdaydı.**

**Profiller:**
- masaüstü 1440×900
- tablet 820×1180 (dokunmatik)
- mobil 390×844 @3 (iPhone UA)
- ek: 320×640, 375×667, tablet yatay 1180×820 (ekran görüntüsü)

## 1. Özet
| Test | Kapsam | Sonuç |
|---|---|---|
| İşlev matrisi (`tests/career-test.js`) | 2 motor × 3 profil | **Chromium:** masaüstü 128/128 · tablet 121/121 · mobil 122/122. **WebKit:** masaüstü 128/128 · tablet 121/121 · mobil 122/122 |
| Ek testler (`tests/extra-test.js`) | 320/375 px taşma ve kırpılma, hareket azaltma, geri bağlantısı klavye | Chromium 10/10 · WebKit 10/10 |
| Görünüm ve taşma (`tests/shots.js`) | 3 sayfa × masaüstü, tablet, tablet yatay, mobil | tek H1, taşma yok, footer altı boşluk 0 px, medya isteği 0, hata 0 |
| Gerçek CDN (`tests/cdn-smoke.js`) | 8 sayfa × {WebKit mobil, Chromium masaüstü, Chromium mobil} | 24/24: yeni menü, düğme, Ekibimize yok, hata 0 |
| CDN doğrulama | 14 adres | 280/280 istek 200, MIME, CORS, tam SHA-256 eşleşmesi |
| Wix yerel sayfa taraması (`tests/native-scan.js`) | 14 sayfa | kariyer bağlantısı / "Ekibimize Katıl" yok |

## 2. Doğrulanan maddeler (istenen liste)
| Madde | Nasıl doğrulandı | Sonuç |
|---|---|---|
| İnsan Kaynakları ana menüsü → `/insan-kaynaklari` | 6 sayfa türünde (ana sayfa, hizmet, Kısaca Biz, Markalar, Yasal, kariyer) başlık `A`, `href` doğru; tıklama → hedef | ✔ 2 motor × 3 profil |
| Açık Pozisyonlar alt menüsü → `/acik-pozisyonlar` | alt menü düğmesi → bağlantı → hedef | ✔ |
| Staj Programları alt menüsü → `/staj-programlari` | aynı | ✔ |
| Ekibimize Katıl görünmüyor | panel metni + `document.body.innerText` | ✔ (0) |
| İK sayfasındaki iki yönlendirme alanı | hedef, sıra, renk (#A2FF00), eşit boyut; boş alana tıklama gezinir (kartın tamamı bağlantı) | ✔ |
| Geri dönüş bağlantıları | Açık Pozisyonlar ve Staj → "İnsan Kaynaklarına Dön" → `/insan-kaynaklari` | ✔ |
| Menü doğru kapanıyor | sayfa değişince panel kapalı. Masaüstü: Escape ×2 → kapalı, odak MENU'de. Dokunmatik: MENU ile kapanıyor | ✔ |
| Hizmetler ve diğer menüler bozulmadı | Hizmetler alt menüsü 7 bağlantı; başlık listesi `[Kısaca Biz A, Hizmetler BUTTON, Markalar A, Akademi A, İnsan Kaynakları A]` birebir | ✔ |
| Dokunmatikte bağlantı ve alt menü birbirini engellemiyor | düğmeye dokunma alt menüyü açar ve sayfa değişmez; aynı düğme kapatır; başlık sayfaya gider; düğme ≥ 44×44 px | ✔ |
| Fare ile üzerine gelme | İK başlığının üzerine gelince alt menü açılır | ✔ (masaüstü) |
| Tarayıcı geri / ileri | menü gezintisi ve kart gezintisi sonrası geri ve ileri; içerik yeniden kuruluyor, menü kapalı | ✔ |
| Footer ve header doğru | header logosu, footer, WhatsApp / Yukarı Çık öğeleri her sayfada; mobil ve tablet header görünür (ekran görüntüleri) | ✔ |
| Mobilde yatay taşma / gereksiz boşluk yok | `scrollWidth ≤ innerWidth`; `.cr` içindeki hiçbir öğe ekran dışında değil; footer altı 0 px; 320 px'te başlık satırları ekran içinde | ✔ |
| Gereksiz video / büyük medya isteği yok | kariyer sayfalarında `<video>` 0, `<canvas>` 0, medya isteği 0, > 400 KB görsel/medya yanıtı 0 | ✔ |
| JavaScript hatası yok | sayfa hataları + 1N konsol hataları (Wix'in kendi analitik / üçüncü taraf hataları süzüldü) | ✔ 0 |
| Kırık bağlantı yok | menüdeki bütün yeni hedefler ve sayfa içi bağlantılar gezinme ile doğrulandı. 4 kariyer adresi bugün canlıda 404; yayından sonra sayfa olarak var olacak | ✔ (tasarım gereği) |
| Ana sayfa ve hizmet sayfalarında V1.4 korunuyor | mobil ana sayfa: video modülü v14 yükleniyor, Ronin `ronin-m5-film-2x.mp4`. E-Ticaret (tablet/mobil): WebP kare 2, kaynaklı video ≤ 1 | ✔ |
| Hikâyemizin Devamı → `/kisaca-biz` | ana sayfadaki bütün "Hikâyemizin Devamı" bağlantıları | ✔ |
| Klavye ve odak | Tab ile iki kart sırayla; kart ve geri bağlantısında `:focus-visible` 2 px #A2FF00. Menüde ← İK alt menüsünü açıp ilk bağlantıya, → düğmeye döner. Enter ile geri bağlantısı | ✔ |
| BFCache | benzetilmiş `pagehide`/`pageshow(persisted)` × 3: tek Header ve panel, içerik görünür | ✔ |
| Hareket azaltma | `prefers-reduced-motion: reduce`: içerik hemen opaklık 1, GSAP tween 0 | ✔ |
| Tek H1, JobPosting yok, form yok | otomatik | ✔ |

## 3. Bulunan ve düzeltilen hatalar
1. **Mobil header görünmüyordu (ilk taslak).** Ortak header 900 px altında kendini gizliyor; iç sayfalar mobil header'ı kendi CSS'leriyle açar. Kısaca Biz'in onaylı mobil header ve footer kuralları kariyer etiketlerine eklendi.
2. **Satır çakışması.** "AÇIK / POZİSYONLAR"da Ç kuyruğu alt satırın İ noktasına değiyordu. Satır aralığı .9 yapıldı ve satırlar arasına .12em eklendi.
3. **Sayfa sonundaki blok gizli kalabiliyordu.** Giriş animasyonu "görünür alanın %8 içi" eşiğiyle tetikleniyordu. Mobilde "İnsan Kaynaklarına Dön" bağlantısı ekranın alt kenarında gizli kaldı ve dokunulamadı (test yakaladı). Düzeltme:
   - Tetikleme ilk görünür pikselde.
   - Görünür alandaki tetiklenmemiş öğeler 3 sn sonra açılıyor.
   - Klavye odağı geldiğinde hepsi açılıyor.

   Commit `2aa9a9b`.

## 4. Test düzeneği sınırları (dürüst not)
- **Chromium gezinme notu:** Wix istemci yönlendiricisi Chromium'da iç bağlantıları belge yüklemeden (Navigation API) işler. Hedef kariyer sayfası canlıda henüz olmadığı için, bu durumda Wix 404 kabuğu çizer.
  - Bu durumda test adres değişiminin **doğru hedefe** olduğunu doğrular, akışı o hedefin doğrudan yüklenmesiyle sürdürür ve sayar.
  - Chromium masaüstü 13, tablet 14, mobil 13 gezinme. Ham veride `wixSpaNavs`.
  - WebKit'te bütün gezinmeler tam belge yüklemesiyle doğrulandı.
  - Yayından sonra sayfalar var olacağı için Wix bu gezinmeleri kendi yönlendiricisiyle sorunsuz yapar. Bileşenin Wix iç gezinmesindeki bağlanma/kopma döngüsü, onaylı Kısaca Biz iskeletiyle aynıdır.
- **Loader v13.1:** rota listesi değişikliği diff ile doğrulandı (yalnız iki satır ve sürüm etiketi). Test düzeneği kariyer adreslerini Kısaca Biz kabuğunda açtığı için loader'ın kariyer rotası tarayıcıda ayrıca ölçülmedi.
- **Gerçek BFCache ve fiziksel iPhone/iPad/Android:** ölçülmedi.

## 5. Kapsam dışı yan etki denetimi
- **Kariyer klasörü dışında değişen dosya yok:** `git diff 624430a -- . ':!wix-career-v1'` boş.
- **11 sayfa dosyası:** yalnız header/markup adresleri değişti (`tools/build_sites.py`; eski adres kalmadı, etiket tanımları aynı).
- **Takip ve oturum kodları:** yeni dosyalarda `gtag`, `fbq`, `dataLayer`, Intelligence, müşteri paneli ya da oturum koduna eklenen satır yok.
- **Footer:** değişmedi.

## 6. Ham veri
- `qa/test/*.json|log`: işlev matrisi ve ek testler.
- `qa/shots.log`, `screenshots/shots-*.json`: görünüm.
- `qa/cdn-career.log`, `qa/cdn-smoke-*.log`: CDN.
- `qa/native-scan.log`: Wix yerel sayfa taraması.
- `qa/smoke/`: ilk taslak ekran görüntüleri.
- `qa/test-old/`: düzeltme öncesi koşular.
