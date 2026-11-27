# STRESS_TEST — 1N V1.3 yarı otomatik mobil stres testi (fiziksel iPhone / iPad Safari)

Amaç: hizmet sayfalarına geçişlerde **aralıklı** görülen iPhone çökmesini, yedi sayfayı ve varyantları elle tek tek denemeden, aynı cihazda çok sayıda tekrarla yakalamak ve hangi varyant / sayfa / senaryoda oluştuğunu kaydetmek.

**Bu test bir tanı aracıdır, düzeltme değildir.** Sonuçları bize iletin; karar sonuçlara göre verilir.

## 1. Kurulum (Wix'te tek değişiklik — sizin tarafınızdan)
Yeni giriş eklenmez. Mevcut **"1N - V1.3 Test Anahtarı (HEAD)"** girişinin içeriği güncellenir:

1. Wix Studio → Ayarlar → Özel Kod → "1N - V1.3 Test Anahtarı (HEAD)" → Düzenle.
2. İçeriğin **tamamını** silin, `wix-global-stability-v13/wix-custom-code/TEST-SWITCH-v13.1-head.html` dosyasının **tamamını** yapıştırın.
3. Ayarlar aynı kalır: **Tüm sayfalar · Head · Her yeni sayfada yükle · Head listesinde en üstte** (loader girişinden önce — loader kapalı varyantı bu sıraya bağlı).
4. Yayınla.

v13.1, v13 ile geriye uyumludur: `?n1t=A…F`, `hero:…`, `diag:1` aynen çalışır. Geri dönüş: içeriği `TEST-SWITCH-v13-head.html` ile değiştirin.

**Normal ziyaretçi:** her sayfada yalnız URL kontrolü + 1 `sessionStorage` + 1 `localStorage` okuması. Dosya indirilmez, zamanlayıcı/gözlemci kurulmaz (Playwright ile doğrulandı: test nesnesi yok, test dosyası isteği 0).

## 2. Test bağlantısı
```
https://www.reklam1n.com/?n1t=stress
```
Açılınca sol altta **N1 STRES** paneli çıkar:
- Varyantlar (varsayılan hepsi): **B** yayındaki V1.3 · **D** + stabilite modülü · **E** loader kapalı · **Ronin 2×** (zorunlu) · **Ronin 1,5×** · **Ronin 1×** · **Ronin yalnız poster**
- Tekrar: 1 / 2 / 3 (aralıklı çökme için 2–3 önerilir)
- Senaryo: normal + erken geri / yalnız normal / yalnız erken geri
- Sayfa: 7 hizmet sayfası (tam) / 3 sayfa (kısa deneme)
- Panel tahmini süreyi gösterir. Tam plan (7 varyant × 1 tekrar × 7 sayfa × 2 senaryo = 98 adım) yaklaşık **60–90 dk**.

**Başlat**'a dokunun. Sonrası otomatiktir.

### Test sırasında
- **Ekranı açık tutun:** Ayarlar → Ekran ve Parlaklık → Otomatik Kilit → **Hiçbir Zaman** (test bitince geri alın). Ekran kilitlenirse ya da Safari arka plana geçerse iOS zamanlayıcıları durdurur; test bekler ve ön plana dönünce devam eder (rapora "ara" olarak yazılır).
- Cihazı şarja takın. Düşük Güç Modu durumunu **not edin** (Safari bunu okuyamaz).
- Ekrana dokunmayın (dokunuşlar testi bozmaz ama video davranışını değiştirebilir). **Duraklat / Devam / Durdur / Rapor** düğmeleri paneldedir.

## 3. Her adımda ne olur
Bir "adım" = bir varyant × bir hizmet sayfası × bir senaryo:
1. Ana sayfa: bileşen kurulana ve loader kalkana kadar bekler (en çok 20 sn); Ronin ve video durumlarını kaydeder.
2. Hizmetler bölümündeki ilgili bağlantıya kadar **kademeli kaydırır** (300 px / 250 ms) ve **gerçek bağlantıya tıklar** (bulunamazsa doğrudan gider; raporda "doğrudan" yazar).
3. **Normal:** hizmet sayfası kurulunca 1,5 sn bekler, **200 px / 300 ms** ile sayfa sonuna kadar kaydırır, 1 sn bekler, **geri** (`history.back()`).
   **Erken geri:** hizmet sayfası yüklenirken, gezinme başlangıcından **0,5 / 1 / 2 / 3 sn** sonra geri (sayfaya göre dönüşümlü).
4. Ana sayfaya dönüş: dönüş türü (BFCache / back_forward / **reload**) ve ana sayfanın yeniden hazır olma süresi kaydedilir. Sonraki adıma geçilir.
5. Varyant değişirken ana sayfa o varyantın bayraklarıyla yeniden açılır.

## 4. Çökme ve kaldığı yerden devam
- Durum ve sonuçlar **localStorage**'da (sekme çökse de kaybolmaz). Her aşama değişiminde yazılır.
- iOS bir sekmeyi çökme sonrası **kendisi yeniden yüklerse** ("Bu web sayfası bir sorun oluştuğu için yeniden yüklendi"): test anahtarı varyant bayraklarını geri yükler, betik beklenmeyen yeniden yüklemeyi **"OLASI ÇÖKME"** olarak kaydeder (hangi aşamada, hangi sayfada), 5 sn sonra aynı adımı **yeniden dener**. Aynı adımda ikinci sorunda adım **atlanır** (sonsuz döngü yok).
- Safari **"Bir sorun tekrar tekrar oluştu"** sayfasını gösterirse orada JavaScript çalışmaz: **Yeniden Yükle**'ye dokunun ya da test bağlantısını yeniden açın → test kaldığı yerden devam eder.
- Safari tamamen kapanırsa / cihaz yeniden başlarsa: test bağlantısını açın → devam eder.

## 5. Rapor
Test bitince (ya da istediğiniz an) **Rapor**:
- **Kopyala** (panoya) · **Paylaş** (iOS paylaşım sayfası: Mesajlar, Mail, Notlar…) · **İndir (.md)** · **İndir (.csv)**. Metin ayrıca ekranda seçilebilir.
- İçerik: cihaz/ekran bilgisi, plan, **varyant özeti** (adım, OLASI ÇÖKME, atlanan, geri sonrası yeniden yükleme, erken geri tetiklenme oranı, hizmet sayfası TTFB / DOMContentLoaded / bileşen hazır medyanları, ana sayfa Ronin'in **gerçek** kaynağı-çözünürlüğü-durumu, 1N JS hata sayısı), **sayfa × varyant çökme tablosu**, sorunlu adımların listesi, ham CSV.
- Sonuçlar silinmez; yeni test eklenir. Panelde **Sonuçları sil** ile temizlenir. Testi kapatmak: **Test modunu kapat** ya da `https://www.reklam1n.com/?n1t=0`.

## 6. Raporu okumak
| Alan | Anlamı |
|---|---|
| **OLASI ÇÖKME** | Test belge yeniden yüklemesi beklemiyordu ama sayfa yeniden yüklendi (iOS'un çökme sonrası yeniden yüklemesi ya da elle yeniden yükleme). **Çıkarımdır, kesin kanıt değildir.** "aşama" alanı nerede olduğunu söyler: `nav` = hizmet sayfası yüklenirken, `page` = hizmet sayfasında kaydırırken, `back` = geri dönerken, `home` = ana sayfada |
| Geri sonrası yeniden yükleme | Geri dönüşte ana sayfanın `reload` ile açılması. Wix'in oturum kodu (ATS) bunu bilerek yapabilir; **çökme sayılmaz**, ayrı sütunda sayılır |
| Erken geri tetiklendi | Planlanan erken geri gerçekten çalıştı mı (sayfa çok hızlı/yavaş yüklendiyse sapabilir) |
| Ronin kaynağı | Ana sayfada gerçekten oynayan dosya ve çözünürlük (`ronin-m5-film-2x.mp4 1120x1504 playing` gibi). Ronin varyantlarının doğru uygulandığını gösterir |
| Varyantlar arası karşılaştırma | Örn. B'de 5/98 olası çökme, Ronin 1×'te 0/98 → Ronin kalitesi güçlü aday. D'de azalma → video kaynağı bırakma (stabilite) etkili. E'de azalma → loader ilişkili |

## 7. iOS Safari'nin gerçek sınırları (dürüst liste)
| Konu | Durum |
|---|---|
| Otomatik gezinme | **Çalışır**: bağlantıya programla tıklama, `location`, `history.back()` kullanıcı dokunuşu gerektirmez |
| Kaydırma | **Çalışır**: programla kaydırma. Parmakla kaydırmanın hız/ivme davranışı birebir taklit edilmez |
| Video otomatik oynatma | Sessiz satır içi videolar oynar; **Düşük Güç Modu'nda engellenir** (raporda `blocked`). Test dokunuş üretemez |
| Bellek | **Ölçülemez** (Safari `performance.memory` sunmaz). Raporda bellek yok |
| Çökme tespiti | **Doğrudan algılanamaz**; yalnız sonraki yüklemede "beklenmeyen yeniden yükleme" olarak çıkarılır. iOS'un sekmeyi bellek baskısıyla arka planda kapatması da aynı görünür |
| Çökme sonrası devam | iOS sekmeyi kendisi yeniden yüklerse **otomatik**; "sorun tekrar tekrar oluştu" sayfasında **elle yeniden yükleme** gerekir |
| Ekran kilidi / arka plan | Zamanlayıcılar durur; test bekler, rapora ara olarak yazılır |
| Erken geri zamanlaması | Geri, yeni sayfanın Head'i çalışır çalışmaz (en erken nokta) zamanlanır; ağ çok yavaşsa planlanan 0,5 sn'den geç olabilir. Gerçek tetiklenme zamanı kaydedilir |
| Panoya kopyalama / paylaşma | Düğmeye dokunarak çalışır (iOS kullanıcı dokunuşu ister) |
| Gerçek kullanıcı farkı | Parmak dokunuşu, kaydırma ataleti, uygulama değiştirme ve bildirimler taklit edilmez |

## 8. Testin kendi yükü
- Test betiği ~30 KB (sıkıştırılmış ~10 KB), yalnız test sekmesinde, jsDelivr'den bir kez (sonra önbellekten).
- Sürekli döngü yok: "hazır mı" denetimi 250 ms'de bir yalnız 2 öğeye bakar (en çok 20 sn); kaydırma 250–300 ms aralıklı; panel metni aşama değişiminde güncellenir (kare başına değil).
- localStorage yazımı adım başına ~5 küçük yazma + 1 kayıt satırı.
- Ölçüm sırasında tanılama kutusu (`diag`) kapalıdır.
- Hata sayacı yalnız 1N dosyalarından gelen JS hatalarını sayar.

## 9. Kapsam ve güvenlik
- Yalnız ana sayfa + 7 hizmet sayfası. Test sürerken aynı sekmede başka bir sayfaya (müşteri panelleri, Intelligence, diğer kurumsal sayfalar) gidilirse test anahtarı **o sayfada hiçbir bayrak uygulamaz** ve betik çalışmaz.
- Reklam/izleme kodlarına, tasarıma, içeriğe dokunulmaz. Stabilite modülü yalnız **D** varyantında, yalnız test sekmesinde yüklenir. Ronin 1,5×/1×/poster yalnız ilgili varyantta, yalnız test sekmesinde.
- Testten çıkış: `?n1t=0` (bu sekmede bütün test bayrakları ve stres durumu kapanır; kaydedilmiş sonuçlar kalır).
