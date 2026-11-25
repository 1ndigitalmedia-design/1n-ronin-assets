# COOKIE_AUDIT_CHECKLIST — Çerez taraması ve rıza yönetimi

Çerez Politikası'ndaki çerez listesi **bilinçli olarak boş** bırakıldı. Gerçek bir tarama yapılmadan çerez adı, sağlayıcı veya süre yazılmadı. Wix kullanılması, belirli bir Wix çerezinin sitede gerçekten çalıştığı anlamına gelmez. Bu liste tamamlanmadan Çerez Politikası yayımlanmamalıdır (C-01 – C-06).

## 1. Tarama nasıl yapılır

1. **Hazırlık**
   - Gizli pencere açın veya tarayıcı verilerini temizleyin.
   - Uzantıları kapatın.
2. **Rıza öncesi tarama**
   - Ana sayfayı ve şu sayfaları açın: tüm hizmet sayfaları, /iletisim, /teklif-al, /ekibimize-katil, /acik-pozisyonlar ve beş yasal sayfa.
   - Çerez bandında hiçbir seçim yapmayın.
   - Tarayıcı geliştirici araçlarında Application → Cookies / Local Storage / Session Storage bölümlerini ve Network sekmesindeki üçüncü taraf istekleri kaydedin.
3. **Reddet sonrası tarama**
   - "Reddet" seçin, sayfaları yeniden gezin ve kayıt alın.
   - Bu adımda zorunlu olmayan hiçbir çerez veya etiket isteği görünmemelidir.
4. **Kabul sonrası tarama**
   - Kategorileri tek tek ve toplu olarak kabul edin.
   - Her seçimden sonra oluşan çerezleri kaydedin.
5. **Form ve etkileşim taraması**
   - Bir form doldurun (test verisiyle).
   - WhatsApp bağlantısını, video oynatmayı ve sosyal medya bağlantılarını deneyin.
6. **Mobil tarama**
   - Aynı adımları bir mobil tarayıcıda tekrarlayın.
7. **Otomatik tarama (isteğe bağlı)**
   - Otomatik bir çerez tarayıcısı ile sonuçları karşılaştırın.
   - Otomatik sonuç tek başına yeterli değildir; elle doğrulayın.

## 2. Her çerez için toplanacak bilgi

`COOKIES` dizisine aşağıdaki biçimde girilir (`n1-yasal-sayfalar-v1.js`):

```js
var COOKIES = [
  { name: 'çerez_adı', provider: 'Sağlayıcı (birinci / üçüncü taraf)', purpose: 'Ne için kullanıldığı',
    category: 'zorunlu', duration: 'Oturum / 12 ay', basis: 'KVKK m.5/2-c ve f' }
  // category: zorunlu | islevsel | analitik | pazarlama
  // basis: zorunlu çerezler için m.5/2-c / f; diğerleri için "Açık rıza (KVKK m.5/1)"
];
```

| Kontrol | Evet / Hayır | Not |
|---|---|---|
| Her çerezin adı, sağlayıcısı, alan adı (birinci/üçüncü taraf) ve süresi kaydedildi. | | |
| Local storage, session storage, piksel ve beacon gibi benzer teknolojiler de kaydedildi. | | |
| Her çerez doğru kategoriye ayrıldı. Yalnızca talep edilen hizmet için kesinlikle gerekli olanlar "zorunlu" sayıldı. | | |
| Analitik ve pazarlama çerezleri açık rızaya bağlandı. | | |
| Üçüncü taraf sağlayıcıların sunucu konumu ve yurt dışı aktarım dayanağı belirlendi (D-08 ile birlikte). | | |

## 3. Rıza yönetim aracı (CMP) için teknik gereklilikler

Rıza yönetimi yalnızca politika metniyle sağlanamaz. Aşağıdakiler sitenin kendisinde kurulmalıdır:

| Gereklilik | Evet / Hayır |
|---|---|
| Zorunlu olmayan etiketler (analitik, reklam pikseli, Google Tag Manager vb.) rızadan **önce** çalışmıyor. Etiketler rızaya göre tetikleniyor (C-03). | |
| İlk katmanda "Kabul et" ve "Reddet" seçenekleri aynı görünürlükte ve aynı kolaylıkta. "Reddet" ikinci katmana gizlenmemiş. | |
| Kategoriler önceden işaretli gelmiyor. | |
| Sayfada gezinmek veya kaydırmak rıza sayılmıyor. | |
| Site, rıza vermeyen kullanıcıya da açık (çerez duvarı yok). | |
| Banner'da Çerez Politikası ve KVKK Aydınlatma Metni bağlantıları var. Açık rıza ifadesi aydınlatma metniyle aynı metne gömülmemiş (Kurul'un 2026/347 sayılı İlke Kararı). | |
| Rıza kaydı tutuluyor: tarih, kategori seçimleri, banner sürümü. | |
| Kullanıcı tercihlerini her sayfadan yeniden açabiliyor. Footer'a sabit bir bağlantı önerilir; bu, onaylı Footer'da değişiklik gerektirdiğinden ayrıca karar verilmelidir. | |
| Rıza geri alındığında ilgili etiketler duruyor ve mümkün olan çerezler siliniyor. | |
| Wix'in kendi çerez bandı veya bir üçüncü taraf CMP kullanılıyorsa, Wix'in hangi çerezleri hangi kategoriye koyduğu taramayla doğrulandı. | |

## 4. Çerez Politikası sayfasına bağlama

- CMP'nin tercih penceresini açan global bir fonksiyon varsa yolunu yazın:
  - Custom Element'e `cookie-settings="yol.fonksiyon"` özniteliği olarak, veya
  - dosyadaki `COOKIE_SETTINGS_FN` alanına.
- Bu durumda sayfada "Çerez tercihlerini yönet" düğmesi görünür ve tıklandığında o fonksiyonu çağırır.
- Fonksiyon bulunamazsa düğme gösterilmez. Onun yerine, tarayıcı ayarlarını ve e-posta yolunu anlatan bir metin görünür. **Çalışmayan bir düğme hiçbir koşulda gösterilmez.**
- Testte sahte bir fonksiyonla düğmenin göründüğü ve fonksiyonu çağırdığı doğrulandı. Gerçek bir CMP ile test edilmedi.