# WIX_SETUP — Beş sayfa için kurulum

> GitHub'a yükleme yapılmadı. Wix Studio'da sayfa oluşturulmadı ve yayın yapılmadı. Aşağıdaki adımlar sizin tarafınızdan uygulanmalıdır. Bu paket Wix Studio içinde test **edilmedi**.

## 1. Dosyayı HTTPS bir adrese yükleyin

1. `n1-yasal-sayfalar-v1.js` dosyasını repoya ekleyin. Önerilen yol:
   `1ndigitalmedia-design/1n-ronin-assets/wix-yasal-v1/n1-yasal-sayfalar-v1.js`
2. Commit oluşturun.
3. Commit kimliğine sabitlenmiş jsDelivr adresini kullanın (dal adı değil, commit kimliği; böylece onaylı sürüm değişmez):

```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@<COMMIT>/wix-yasal-v1/n1-yasal-sayfalar-v1.js
```

`<COMMIT>` yerine kendi commit kimliğinizi yazın. Bu adres henüz mevcut değildir.

## 2. Sayfaları oluşturun

Beş sayfada da **aynı Server URL** kullanılır; yalnızca **Tag Name** değişir.

| Sayfa adı (Wix) | URL slug | Tag Name |
|---|---|---|
| Gizlilik Politikası | gizlilik-politikasi | `n1-gizlilik-politikasi-v1` |
| KVKK Aydınlatma Metni | kvkk-aydinlatma-metni | `n1-kvkk-aydinlatma-v1` |
| Çerez Politikası | cerez-politikasi | `n1-cerez-politikasi-v1` |
| Kullanım Koşulları | kullanim-kosullari | `n1-kullanim-kosullari-v1` |
| Veri Sahibi Başvuru Formu | veri-sahibi-basvuru-formu | `n1-veri-sahibi-basvuru-v1` |

Her sayfa için:

1. Yeni bir boş sayfa oluşturun ve slug'ı tablodaki gibi ayarlayın.
2. Sayfada Wix'in kendi Header ve Footer'ını gizleyin veya kaldırın. Diğer iç sayfalarda nasıl yapıldıysa aynı şekilde yapın. Header, Footer ve WhatsApp düğmesi Custom Element tarafından onaylı modüllerden eklenir. Sayfada zaten bir `n1-header`, `footer.n1ft` veya yüzen düğme varsa, Custom Element ikinci bir kopya eklemez.
3. Ekle → Gömülü (Embed) → **Custom Element** ekleyin.
4. "Kaynak seç" bölümünde **Server URL** seçin ve 1. adımdaki adresi yapıştırın.
5. **Tag Name** alanına tablodaki etiketi yazın.
6. Custom Element'i bir bölümün içinde tam genişlik yapın:
   - genişlik %100,
   - X = 0, Y = 0, kenar boşlukları 0,
   - duyarlı davranış "orantılı ölçek" olmasın.
7. Bölümün yüksekliğini **otomatik** yapın.
8. Editördeki başlangıç yüksekliğini masaüstü, tablet ve mobil için içeriğe yakın girin.

Custom Element bir iFrame değildir; sayfanın içinde çalışır. Ancak Wix'in dış kutusu yüksekliği nasıl yönettiğini bu ortamda doğrulayamadım. Diğer iç sayfalarda kullandığınız yükseklik ayarı burada da kullanılmalıdır. Canlı sitede şunları kontrol edin:
- sayfa sonunda boşluk kalmıyor,
- içerik kırpılmıyor.

## 3. İsteğe bağlı öznitelikler

Wix Studio'da Custom Element ayarlarında öznitelik ekleme alanı yoksa, aynı değerleri dosyanın başındaki yapılandırma alanlarına yazabilirsiniz.

| Öznitelik | Örnek | Ne yapar | Dosyadaki karşılığı |
|---|---|---|---|
| `updated` | `2026-12-01` | Hero'da "Son güncelleme: 1 Aralık 2026" gösterir. Geçersiz tarih yok sayılır. | `DATES` |
| `cookie-settings` | `cmpAraci.ayarlariAc` | Çerez Politikası'nda "Çerez tercihlerini yönet" düğmesini gösterir ve bu global fonksiyonu çağırır. Fonksiyon yoksa düğme hiç görünmez. | `COOKIE_SETTINGS_FN` |
| `review` | (değersiz) | Yayın öncesi inceleme panelini ve sarı işaretleri gösterir. **Canlı sayfada kullanmayın.** | — |

Öznitelikler Velo ile de verilebilir:

```js
$w.onReady(() => { $w('#customElement1').setAttribute('updated', '2026-12-01'); });
```

Bileşen bu değişikliği sonradan algılar (`attributeChangedCallback`); testte doğrulandı.

## 4. İçeriği güncelleme

Dosyanın başındaki alanlar şunlardır:

| Alan | İçerik |
|---|---|
| `BIZ` | İşletme bilgileri. Beş sayfa bu tek kaynaktan okur. |
| `COOKIES` | Çerez listesi. |
| `VERIFIED` | Doğrulanmış kapı maddeleri. |
| `DATES` | Son güncelleme tarihleri. |
| `COOKIE_SETTINGS_FN` | Çerez tercih aracını açan fonksiyonun yolu. |
| `PAGES` | Sayfa metinleri. |

Her değişiklikten sonra yeni bir commit oluşturun ve Wix'teki Server URL'yi yeni commit kimliğiyle güncelleyin.

## 5. Yayından önce

- LEGAL_PUBLISH_GATE.md'deki kritik maddelerin tamamı kapanmalıdır.
- SEO_METADATA.md'deki başlık ve açıklamalar Wix'e girilmelidir.
- Footer'daki yasal bağlantılar bu slug'lara gidiyor; slug'lar değiştirilmemelidir.