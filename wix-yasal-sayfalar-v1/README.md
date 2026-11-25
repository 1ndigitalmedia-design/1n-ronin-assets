# 1N Digital Media — Yasal Sayfalar V1

Bu paket beş yasal sayfayı içerir. Hepsi tek bir JavaScript dosyasındaki beş Wix Studio Custom Element ile oluşturulur.

| # | Sayfa | URL | Tag Name |
|---|---|---|---|
| 01 | Gizlilik Politikası | /gizlilik-politikasi | `n1-gizlilik-politikasi-v1` |
| 02 | KVKK Aydınlatma Metni | /kvkk-aydinlatma-metni | `n1-kvkk-aydinlatma-v1` |
| 03 | Çerez Politikası | /cerez-politikasi | `n1-cerez-politikasi-v1` |
| 04 | Kullanım Koşulları | /kullanim-kosullari | `n1-kullanim-kosullari-v1` |
| 05 | Veri Sahibi Başvuru Formu | /veri-sahibi-basvuru-formu | `n1-veri-sahibi-basvuru-v1` |

> **Durum: taslak, yayına hazır değil.** Metinler Türkiye mevzuatı esas alınarak yazıldı, ancak işletmenin gerçek veri işleme envanteri bilinmiyor. Yayından önce:
> - LEGAL_PUBLISH_GATE.md'deki maddeler işletmeyle doğrulanmalı,
> - metinler yetkin bir hukuk uzmanınca incelenmelidir.
>
> Ayrıca:
> - GitHub'a veya Wix Studio'ya yükleme yapılmadı.
> - Wix Studio içinde test yapılmadı.

## Dosyalar

| Dosya | İçerik |
|---|---|
| `n1-yasal-sayfalar-v1.js` | Üretim dosyası. Beş Custom Element, tek HTTPS adresinden yüklenir. |
| `preview.html` | Beş sayfanın bağımsız önizlemesi. Ziyaretçi ve inceleme görünümü sunar. |
| `WIX_SETUP.md` | Server URL, Tag Name ve Wix kurulum adımları. |
| `LEGAL_PUBLISH_GATE.md` | Yayını engelleyen kontrol tablosu. İlk okunacak belge budur. |
| `LEGAL_CONTENT_REVIEW.md` | Hukuki yapı, kaynak listesi, tutarlılık kontrolü, uzman görüşü gereken noktalar. |
| `DATA_PROCESSING_CHECKLIST.md` | İşletmeye sorulacak veri işleme soruları. |
| `COOKIE_AUDIT_CHECKLIST.md` | Çerez taraması ve rıza yönetimi gereklilikleri. |
| `SEO_METADATA.md` | Beş sayfanın SEO başlıkları, açıklamaları ve canonical adresleri. |
| `QA_REPORT.md` | Yapılan testler ve sınırlar. |
| `screenshots/` | 390, 820 ve 1440 px ekran görüntüleri ile yazdırılan formun A4 görüntüsü. |

## Önizleme

Dosyalar bir sunucu üzerinden açılmalıdır. Klasörde örneğin `python3 -m http.server` çalıştırıp `preview.html` adresini açın. Header, Footer ve fontlar onaylı HTTPS adreslerinden yüklendiği için önizleme internet bağlantısı ister.

Önizleme adresleri:
- `preview.html?sayfa=kvkk`: ziyaretçi görünümü.
- `preview.html?sayfa=kvkk&inceleme=1`: yayın öncesi işaretleri gösterir.
- `&tarih=2026-12-01`: son güncelleme tarihini dener.

Sayfa seçimi yalnızca önizleme dosyasında URL'den yapılır. Custom Element'ler URL'ye bakmaz; her biri kendi Tag Name'iyle kendi metnini oluşturur. Bu sayede Wix Studio önizlemesinde de doğru sayfa görünür.

## Mimari

- **Tek dosya, beş etiket:**
  - Ortak bir `N1LegalPage` sınıfı var; her etiket bunu genişleten ayrı bir sınıfla tanımlanır.
  - Dosya iki kez yüklenirse `customElements.get` kontrolü sayesinde yeniden tanımlama hatası oluşmaz.
- **Header, Footer, WhatsApp ve Yukarı Çık:**
  - Onaylı commit `d24fa373d6d76c0218b3f3b77897a8c2ace04e5e` modülleri değiştirilmeden yüklenir: `n1-header-v648.js`, `n1-footer-v646.js`, `n1-footer-v636.css`, `n1-site-markup-v648.js`.
  - Diğer iç sayfalardaki entegrasyon mantığı aynen korundu.
  - Sayfada zaten bir Header, Footer veya yüzen düğme varsa ikinci kopya eklenmez.
- **Stil kapsamı:**
  - Bütün kurallar `[data-n1lg]` kapsamındadır.
  - Kapsam dışında kalan kurallar yalnızca şunlardır: Header menü panelinin kendi işareti, baskı modu ve yazdırılan form. Testte bu doğrulandı.
  - Diğer hizmet sayfaları etkilenmez.
  - Stil etiketi tektir; son yasal sayfa kaldırılınca silinir.
- **Dış bağımlılık:**
  - Onaylı Header ve Footer modülleri ile Google Fonts (Barlow, Barlow Condensed) yüklenir.
  - GSAP veya başka bir kütüphane **yüklenmez**.
  - Tek hareket, başlık satırlarının CSS ile yukarı kayarak girmesidir. Hareket azaltma tercihinde bu da kapanır. Animasyon olmadan bütün metin eksiksiz görünür.
- **Temizlik:** Kaldırılınca bütün dinleyiciler (kaydırma, boyut, tıklama, baskı) kapanır ve içerik silinir.

## Tasarım

Görsel, video, fotoğraf ve illüstrasyon kullanılmadı. Tasarım tipografi, ince çizgiler ve boşluklarla kuruldu. Hizmet sayfalarından daha sakin, okuma odaklı bir düzen hedeflendi.

- **Renk:** Zemin #080A09, metin kırık beyaz ve açık gri, tek vurgu #A8CF62.
- **Hero:**
  - "Yasal / 01" etiketi.
  - İki satırlık Barlow Condensed başlık; ikinci satır vurgu renginde.
  - Kısa açıklama; doğrulanmış bir tarih girildiyse "Son güncelleme".
- **Masaüstü (1025 px ve üzeri):**
  - Solda yapışkan (sticky) "Bu sayfada" listesi.
  - Okunan bölüm vurgu çizgisiyle işaretlenir.
  - Tıklanan bölüme yumuşak kaydırma yapılır. Header'ın altında kalmaması için ofset uygulanır, ardından odak başlığa taşınır.
- **Metin sütunu:** Paragraflar en fazla 72 karakter genişliğindedir. Tablolar sütunun tamamını kullanır.
- **Tablet ve telefon:**
  - İçindekiler açılır-kapanır bir "İçindekiler" listesine dönüşür.
  - Tabletteki geniş tablolar yalnızca kendi alanında yatay kayar.
  - Telefonda her tablo satırı alt alta okunur; hücre adları etiket olarak görünür.
- **Sayfa sonu:** Diğer dört yasal metne bağlantılar, iletişim bilgileri ve onaylı Footer.
- **Baskı:** Header, Footer, içindekiler ve düğmeler gizlenir; metin beyaz kâğıtta siyah basılır.

## Veri Sahibi Başvuru Formu

- Erişilebilir bir form taslağıdır. Her alanın gerçek bir `label`'ı vardır; klavyeyle kullanılabilir.
- **Gönderim yoktur.** Sayfada "Başvuruyu Gönder" düğmesi bulunmaz.
- **Yazdır:**
  - Doldurulan bilgilerle A4 düzeninde bir başvuru formu hazırlar ve tarayıcının yazdırma penceresini açar.
  - Testte A4, 2 sayfa oldu.
  - Yazdırılan formda veri sorumlusu bilgileri, seçilen haklar ve imza alanı yer alır.
  - Yazdırılan formda T.C. kimlik numarası ve imza boş bırakılır; elle doldurulur.
- **Formu temizle:** Bütün alanları sıfırlar.
- **Güvenlik:**
  - Sayfa hiçbir bilgiyi göndermez ve kaydetmez (localStorage, sessionStorage veya çerez kullanılmaz; testte doğrulandı).
  - T.C. kimlik numarası ve kimlik belgesi görüntüsü web formunda istenmez.

### Elektronik başvuru planı (B-02, ilk sürümde yok)

İnternetten başvuru alınmak istenirse en az şunlar gerekir:

1. **Kimlik ve imza:** Başvuru, Tebliğ m.5'teki yöntemlerden birine dayanmalıdır. Elektronik başvuru için iki yol vardır:
   - güvenli elektronik imza veya mobil imza ile imzalanmış başvuru, ya da
   - başvuru amacıyla geliştirilmiş bir yazılım.

   Bu yazılımda başvuru sahibi, sistemde kayıtlı bir iletişim kanalıyla doğrulanmalıdır (örneğin daha önce bildirilmiş e-postaya gönderilen tek kullanımlık kod).
2. **İletim ve saklama:**
   - Gönderim HTTPS ile yapılmalı.
   - Veri, yalnızca yetkili kişilerin erişebildiği bir kutuda saklanmalı (Wix Forms ve otomasyon kullanılacaksa veri konumu ve yurt dışı aktarım D-07 ve D-08 kapsamında değerlendirilmeli).
   - Ek dosya sınırlaması olmalı.
   - Kötüye kullanıma karşı koruma olmalı; CAPTCHA kullanılacaksa onun da çerez etkisi değerlendirilmeli.
3. **Veri en aza indirme:**
   - T.C. kimlik numarası ancak bu güvenli altyapı kurulduktan sonra ve gerekliyse istenmeli.
   - Kimlik belgesi görüntüsü istenmemeli.
4. **Süreç:**
   - Başvuru tarihi otomatik kaydedilmeli.
   - 30 günlük süre için hatırlatma kurulmalı.
   - Cevap, başvuranın seçtiği yöntemle verilmeli.
   - Başvuru kayıtları belirlenen süre boyunca saklanmalı.
5. **Gönder düğmesi:** Bu altyapı kurulup test edilmeden sayfaya bir "Gönder" düğmesi eklenmemelidir.

## Çerez tercih düğmesi

Çerez Politikası'ndaki "Çerez tercihlerini yönet" düğmesi yalnızca gerçek bir çerez yönetim aracının fonksiyonu bağlandığında görünür (`cookie-settings` özniteliği veya `COOKIE_SETTINGS_FN`). Bağlı değilse düğme yerine tarayıcı ayarlarını ve e-posta yolunu anlatan bir metin görünür.

## Bilinen sınırlar

- **Hukuki araştırma:**
  - mevzuat.gov.tr ve kvkk.gov.tr sayfaları bu ortamdan doğrudan açılamadı.
  - Kaynaklar arama özetleri ve ikincil kaynaklardan kontrol edildi (ayrıntı: LEGAL_CONTENT_REVIEW.md).
  - Çerez Rehberi'nin Temmuz 2025 sürümünün tam metni okunamadı.
- **Çerez listesi:** Çerez taraması yapılmadı; liste boş.
- **İçerik:** Saklama süreleri, hizmet sağlayıcılar ve yurt dışı aktarım dayanakları işletmeden bilgi bekliyor.
- **Testler:**
  - Wix Studio içinde, gerçek telefon ve tablette, Safari ve Firefox'ta, ekran okuyucuyla test yapılmadı.
  - Gerçek bir yazıcıda baskı denenmedi; baskı Chromium'un PDF çıktısıyla kontrol edildi.
- **Adres farkı:** Footer'daki adres ("Bayraklı Bornova - İzmir 35530") ile brief'teki adres ("Bayraklı İzmir") farklı. Yasal metinlerde brief'teki adres kullanıldı. Footer'a dokunulmadı (G-02).