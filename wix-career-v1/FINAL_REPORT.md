# FINAL_REPORT — Kariyer V1: İnsan Kaynakları, Açık Pozisyonlar, Staj Programları + global menü

**Wix'te Save / Publish yapılmadı, PR birleştirilmedi, force push yok, hiçbir dosya ya da dal silinmedi.** Sonuçlar Playwright (Chromium, WebKit) testleridir; fiziksel cihaz testi yapılmadı.

## 1. Başlangıç durumu (28 Kasım 2026, canlı)
- **V1.4 canlıda yayında:** ana sayfa ve 7 hizmet sayfası `@36a24d3`. Bu iş V1.4'ü temel aldı; geri dönüş adresleri bugünkü canlı adreslerdir.
- **Menü:** "İnsan Kaynakları" bağlantısız bir düğmeydi; alt menüsünde "Ekibimize Katıl" ve "Açık Pozisyonlar" vardı. `/ekibimize-katil`, `/insan-kaynaklari`, `/acik-pozisyonlar` ve `/staj-programlari` canlıda **404**.
- **Menü kaynağı:** her sayfanın sabit SHA ile yüklediği header v12 ve markup JSON'u. Footer'da kariyer bağlantısı yok. Wix yerel sayfalarda da yok (14 sayfa tarandı).
- **Tag Name:** kariyer sayfaları için Wix'te tanımlı bir etiket yoktu (sayfalar yok). Önerilen etiketler kullanıldı.

## 2. Yapılanlar
| İş | Sonuç |
|---|---|
| Üç sayfa | `n1-career-v1.js`: tek dosya, üç etiket (`n1-insan-kaynaklari-v1`, `n1-acik-pozisyonlar-v1`, `n1-staj-programlari-v1`), 33,8 KB. İçerik birebir brief. Sayfa metinleri ve ileride eklenecek ilan/dönem kayıtları tek bir içerik dizisinde; CMS, backend ve form yok. |
| Tasarım | Dev Barlow Condensed başlık, vurgu renginde nokta, 1 px çizgiler, keskin köşeli bloklar. İK'da #A2FF00 ve koyu iki büyük kart. Durum sayfalarında çerçeveli tipografik durum alanı ve "00" sayacı. Video, görsel, canvas ve sürekli animasyon yok. DESIGN_GUIDE. |
| Menü | Header v13: İK başlığı `/insan-kaynaklari` bağlantısı; ayrı **KARİYER +** düğmesi alt menüyü açar (dokunmatikte birbirini engellemez). Ekibimize Katıl kaldırıldı. Diğer başlıklar, tasarım, animasyon ve V1.3 kapanış davranışı aynı. |
| Kapsam | Menüyü taşıyan 11 dosya / 15 Custom Element yeniden üretildi: ana sayfa, 7 hizmet sayfası (V1.4 tabanlı), Kısaca Biz, Markalar, 5 yasal sayfa. Yalnız header/markup adresleri değişti. |
| Loader | v13.1: V1.3 + `/insan-kaynaklari`, `/staj-programlari` rotaları. |
| 301 | `/ekibimize-katil` → `/insan-kaynaklari`: Wix URL Yönlendirme Yöneticisi adımları (DEPLOYMENT §4). Kod tarafında yönlendirme yapılamaz; işlem sizin. |
| SEO | Üç sayfanın title ve description'ı, tek H1, canonical varsayılan; JobPosting yok (SEO_SETTINGS). |

## 3. Test sonuçları
| Test | Sonuç |
|---|---|
| İşlev matrisi: menü (6 sayfa türü), kartlar, geri bağlantıları, geri/ileri, klavye, BFCache benzetimi, V1.4 koruma | **Chromium** 128/121/122 · **WebKit** 128/121/122 (masaüstü / tablet / mobil): **0 hata** |
| 320/375 px, hareket azaltma, geri bağlantısı klavye | Chromium 10/10, WebKit 10/10 |
| Görünüm (3 sayfa × 4 profil) | tek H1, yatay taşma yok, footer altı boşluk 0 px, medya isteği 0, JS hatası 0 |
| Gerçek CDN (8 sayfa × 3 profil/motor) | 24/24 |
| CDN doğrulama | 14 adres, 280/280 istek: 200, `application/javascript`, CORS `*`, tam SHA-256 eşleşmesi |

Testte bulunan ve düzeltilen 3 hata:
1. Mobil header gizliydi.
2. Ç ile İ noktası çakışıyordu.
3. Sayfa sonundaki blok gizli kalabiliyordu.

Ayrıntı: TEST_REPORT §3.

**Sınır:** kariyer sayfaları canlıda olmadığı için Chromium'da Wix istemci gezinmesi 404 kabuğu çiziyor. Test bu gezinmelerde adresin doğru hedefe değiştiğini doğruladı ve hedefi doğrudan yükledi (TEST_REPORT §4).

## 4. Wix'te yapacaklarınız (özet)
1. `bash wix-career-v1/wix-custom-code/verify-cdn-career.sh` → TAMAM.
2. 3 yeni sayfa oluşturun (slug, SEO, Custom Element: aynı Server URL, farklı Tag Name; genişlik %100, yükseklik Auto).
3. 15 mevcut Custom Element'te yalnız Server URL'yi değiştirin (DEPLOYMENT §2).
4. Loader girişini v13.1 ile değiştirin ve 3 sayfayı sayfa seçimine ekleyin.
5. `/ekibimize-katil` → `/insan-kaynaklari` 301 yönlendirmesini ekleyin.
6. Tek **Yayınla**, ardından DEPLOYMENT §6 kontrolü.

Kopyalanabilir adresler: **SERVER_URLS.md**.

## 5. Korunanlar
- **Ana sayfa:** tasarım, Ronin/Samuray animasyonu ve video kaynakları (Ronin 2× testte doğrulandı).
- **Masaüstü tasarımları.**
- **Hizmet sayfaları:** içerik ve videolar.
- **V1.4:** mobil medya ve kaynak optimizasyonları (E-Ticaret kareleri testte doğrulandı).
- **Hikâyemizin Devamı → `/kisaca-biz`.**
- **Menü Kapanış V1.3 ve Loader V1.3 davranışı.**
- **Kapsam dışı:** Intelligence, müşteri panelleri, backend, GA/GTM/Meta Pixel/Google Ads, oturum ve finans sistemlerine dokunulmadı.

## 6. Notlar
- Yasal metindeki iç doğrulama maddesi `D-05` ("İş başvuruları (/ekibimize-katil, /acik-pozisyonlar) …") hukuki içerik olduğu için değiştirilmedi. Hukuk incelemesinde güncellenmesi önerilir.
- Ortak Header ve Footer kendi vurgu tonunu (#A8CF62) korur. Kariyer içeriği brief'teki #A2FF00'ı kullanır.

## 7. Commit'ler (dal `claude/happy-sagan-l6tbsc`)
| Commit | İçerik |
|---|---|
| `f40415a` | header v13 + markup v15 |
| `755f905` | kariyer modülü, 11 sayfa sürümü, loader v13.1 |
| `2aa9a9b` | reveal düzeltmesi (Server URL'lerin SHA'sı) |
| son commit | belgeler, testler, ham sonuçlar, ekran görüntüleri |
