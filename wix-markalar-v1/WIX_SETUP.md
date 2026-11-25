# WIX_SETUP — Markalar sayfası (/markalar)

> GitHub kaynakları `52887065746fb9eaaecb470a2ff199335d3790f8` commit'inde doğrulandı. Wix Studio Custom Element kurulumu ve canlı yayın henüz yapılmadı.

## 1. GitHub

Depodaki mevcut düzene göre klasör adı `wix-markalar-v1/` olmalı. Aynı klasöre şu iki dosya birlikte yüklenmeli:

```
wix-markalar-v1/n1-markalar-v1.js
wix-markalar-v1/n1-markalar-data-v1.js
```

Bileşen, veri dosyasını kendi dosyasının yanından otomatik olarak yükler. Bu yüzden iki dosya aynı klasörde ve aynı commit'te olmalı.

## 2. Kopyalanacak değerler

**Server URL**

```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@52887065746fb9eaaecb470a2ff199335d3790f8/wix-markalar-v1/n1-markalar-v1.js
```

**Tag Name**

```
n1-markalar-v1
```

**Veri dosyası** (yalnızca bilgi için; ayrıca girilmez)

```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@52887065746fb9eaaecb470a2ff199335d3790f8/wix-markalar-v1/n1-markalar-data-v1.js
```

**Velo kodu:** Gerekmiyor.

## 3. Wix Studio adımları

1. **Sayfa:** Sayfalar panelinde "Markalar" sayfasını açın; yoksa oluşturun. URL slug'ı `markalar` olmalı.
   - Header menüsünde "Markalar" zaten `/markalar` adresine gidiyor (onaylı site işaretlemesi).
   - Ana sayfadaki "Tüm markaları gör" bağlantısı da aynı adrese gidiyor.
   - Menüde değişiklik gerekmez.
2. **Wix'in kendi Header/Footer'ı:** Sayfada gizleyin veya kaldırın; diğer iç sayfalardaki gibi.
   - Onaylı Header, Footer, WhatsApp ve Yukarı Çık bileşenleri Custom Element tarafından eklenir.
   - Sayfada bunlardan biri zaten varsa ikinci kopya eklenmez.
3. **Custom Element ekleyin:**
   - Ekle → Gömülü → **Custom Element**.
   - Kaynak: **Server URL** → yukarıdaki adres.
   - Tag Name: `n1-markalar-v1`.
4. **Düzen:**
   - Custom Element'i boş bir bölümün içine yerleştirin.
   - Genişlik %100; X = 0, Y = 0; kenar boşlukları 0.
   - Duyarlı davranış "orantılı ölçek" olmasın.
   - Bölüm yüksekliği **otomatik** olsun.
5. **Başlangıç yüksekliği:** Editördeki başlangıç yüksekliğini içeriğe yakın girin. Yerel testteki toplam sayfa yükseklikleri (Header ve Footer dahil):
   - 1440 px'te yaklaşık 7.850 px
   - 834 px'te yaklaşık 8.900 px
   - 390 px'te yaklaşık 9.460 px

   Custom Element iFrame değildir. İçerik sayfanın içinde akar, yükseklik filtre ve aramayla kendiliğinden değişir; iFrame yükseklik kodu gerekmez. Yine de Wix'in dış kutusunun davranışı Wix içinde **test edilmedi**. Yayından sonra canlı sitede şunları kontrol edin:
   - sayfa sonunda boşluk kalmıyor,
   - filtre sonrası Footer içeriğe yapışıyor.
6. **SEO** (Sayfa → SEO temel ayarları):
   - **Başlık:** `Markalar ve Referanslar | 1N Digital Media`
   - **Açıklama:** `1N Digital Media'nın farklı sektörlerden marka ve proje portföyünü keşfedin. Kreatif prodüksiyon, dijital pazarlama, tasarım ve teknoloji odaklı çalışmalar.`
   - **Slug:** `markalar`
   - **Canonical:** `https://www.reklam1n.com/markalar`. Wix bunu varsayılan olarak üretir; birincil alan adı www ile değilse ona göre düzeltin.
   - Sayfada Custom Element dışında ikinci bir H1 olmamalı.
7. **Yayın:** Yayınlayın, ardından canlı sitede masaüstü ve telefonda kontrol edin.

## 4. SEO ile ilgili gerçek sınır

- **Sunucu tarafında içerik yok:** Custom Element'in içeriği (H1, marka adları) tarayıcıda JavaScript ile oluşturulur. Wix bu içeriği sunucu tarafında HTML olarak vermez.
- **Arama motorları:** Google sayfaları JavaScript çalıştırarak işleyebilir, ancak bu garanti değildir ve gecikebilir. JavaScript çalıştırmayan arama motorları ve sosyal medya önizlemeleri marka adlarını göremez.
- **Yapılabilecekler:**
  - Wix SEO başlık ve açıklamasını mutlaka girin.
  - Yayından sonra Google Search Console'da "URL Denetimi → Canlı URL'yi test et" ile oluşturulan HTML'de marka adlarının göründüğünü doğrulayın.
- **İsteğe bağlı:** Marka adlarının sunucu HTML'inde de olması kesin olarak istenirse, Wix'in kendi metin öğesiyle **görünür** bir liste eklemek gerekir. Gizli metin eklenmemelidir. Bu tasarım kararı size ait; bu pakette yapılmadı.
- **Yapılandırılmış veri:** Mevcut olmayan proje sayfaları için yapılandırılmış veri veya URL oluşturulmadı.

## 5. Güncelleme

1. Marka listesini değiştirmek için Excel'i güncelleyin.
2. Veri dosyasını yeniden üretin:
   ```
   python3 build_data.py Marka_Listesi_Temiz_Guncel.xlsx n1-markalar-data-v1.js
   ```
3. İki dosyayı yeni bir commit'le yükleyin.
4. Wix'teki Server URL'de commit kimliğini güncelleyin.

Tasarım koduna dokunmanız gerekmez. Sayılar ve sektör filtreleri listeden kendiliğinden hesaplanır.