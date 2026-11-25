# ASSET_MANIFEST — Uygulama Geliştirme V1

Bütün medya brief'te verilen 6 görsel ve 4 videodur. Her biri gerçek tarayıcıda açılıp incelendi (videolardan farklı saniyelerde kare alındı); aşağıdaki açıklamalar bu karelere dayanır. Medya **müşteri işi veya doğrulanmış referans olarak sunulmaz**; ilgili bölümlerde "Temsili görsel" / "Konsept ürün videosu · 1N Digital Media müşteri işi değildir" notları vardır.

## Videolar

Yalnızca verilen 720p adresleri kullanılır; 480p veya 1080p adresi üretilmedi. Hiçbirinde `poster` yok; ilk kare gelene kadar koyu zemin görünür, önce bir fotoğraf görünüp sonra videoya dönüşen bir katman yoktur.

| # | Adres | Boyut · süre (tarayıcıda ölçüldü) | İçerik | Kullanıldığı yer | Neden |
|---|---|---|---|---|---|
| V4 | `https://video.wixstatic.com/video/6dbf5e_8957dee5671c411da297848f5ee956d0/720p/mp4/file.mp4` | 1280×720 · 7,0 sn | Siyah zeminde su damlaları; sarı-yeşil bir ışık çizgisi gelir, sıvı bir küre döner, sıvı kıvrılarak bir telefona dönüşür | **Hero** — tam genişlik sahne | Videonun kendisi "fikirden ürüne" geçiş: biçimsiz bir şey bir ürüne dönüşüyor. Yatay kadraj tam genişlik Hero'ya uygun. Telefon karenin sağ-ortasında olduğu için `object-position` masaüstünde %62, tablette %70, telefonda %64 |
| V2 | `https://video.wixstatic.com/video/6dbf5e_58f4d602044e4af1972b2898b5a5694a/720p/mp4/file.mp4` | 720×1280 · 6,7 sn | Koyu arayüz panelleri; telefondaki listeden büyük bir monitördeki web arayüzüne geçiş | **Ne yapıyoruz** — 02 WEB APPLICATIONS | Aynı arayüzün telefondan tarayıcıya taşınması web uygulamasını anlatıyor. Masaüstünde yalnızca bu hizmet seçiliyken oynar |
| V1 | `https://video.wixstatic.com/video/6dbf5e_23811760080b45b7aa77526f31898777/720p/mp4/file.mp4` | 720×1280 · 11,4 sn | Açık, pastel tonlarda arayüz kartları; kartlar birbirine dönüşür, telefon, figürler. **Bazı karelerde bir spor markasının (Nike) logosu ve "29.60 km" koşu kartı görünür** | **Hareket deneyimin bir parçasıdır** | Arayüz öğelerinin birbirine dönüşmesi, bölümün konusu olan "anlamlı geçiş"in sinematik karşılığı; yanında gerçek mikro etkileşimler var |
| V3 | `https://video.wixstatic.com/video/6dbf5e_cbd02cfab44141d6838302d4f3b915c7/720p/mp4/file.mp4` | 720×1280 · 5,7 sn | Yeşil tonlu konsept ürün ("Quarn", "AI Agent Battlecard"): telefon, masaüstü monitör, büyük ekran ve saat | **Her ekranda doğru deneyim** | Aynı ürünün dört farklı ekranda görünmesi bölümün konusu. Videoda başka bir ürün adı geçtiği için "Konsept ürün videosu · müşteri işi değildir" notu eklendi |

**Yükleme ve oynatma:** Hero videosu sayfa açılınca yüklenir (`preload` auto; hareket azaltma veya veri tasarrufunda `metadata`). Diğerleri görünüme 600 px kala yüklenir. Aynı anda en fazla bir video oynar (ekranda en az %35 görünen ve en çok görünen); masaüstünde seçili olmayan hizmet panelindeki video oynamaz. Duraklatılmışken videonun kendi anlamlı karesi gösterilir (V2 3,2 sn, V3 1,6 sn, V1 3,0 sn).

**Renk notu:** V3'teki parlak yeşil ve görsellerdeki sarı-yeşil vurgu, medyanın kendi içindedir. Sayfanın arayüz vurgu rengi yalnızca #A8CF62'dir.

## Görseller

Orijinal adres biçimi `https://static.wixstatic.com/media/6dbf5e_<id>~mv2.png`. Sayfada Wix görsel servisiyle genişliğe göre istenir; orijinalden büyük istenmez, PNG biçimi korunur:
`…/6dbf5e_<id>~mv2.png/v1/fit/w_<W>,h_<3W>,q_86,enc_auto/uygulama-gelistirme.png` — `srcset` 480/760/1100/1500/1800 w (orijinal genişlikle sınırlı). Hepsi `loading="lazy"`, `decoding="async"`, `width`/`height` öznitelikli.

| Ad | id | Boyut | İçerik | Kullanıldığı yer | Kırpma |
|---|---|---|---|---|---|
| human | `cd0f0715f18d4141bf8e71149a13ad33` | 1671×941 | Gözleri kapalı, kulaklıklı bir kadın; yanında süzülen cam arayüz kartları | **Önce insanı anlarız** — geniş görsel, yüzden başlayan daireyle açılır | Masaüstü 2:1 (yüz %28 yatay konumda korunur), telefonda 4:5 (yüz merkezde) |
| phone | `743bc98f9700467488238240371a7f82` | 941×1672 | Eğik telefonda "Move Smarter" etkinlik paneli, arkasında cam ikinci ekran, sıvı kıvrımlar | **Ne yapıyoruz** — 01 MOBILE APPLICATIONS | 4:5, üstten hizalı. **Alttaki App Store / Google Play rozetleri kadraj dışında bırakıldı** (gerçekte olmayan mağaza yayını izlenimi vermemek için) |
| stack | `b4395e2c7e014e258d21d6204343e770` | 941×1672 | Işık huzmesiyle telefonun üstünde yükselen cam kart yığını, sıvı şeritler | **Ne yapıyoruz** — 03 CUSTOM DIGITAL PRODUCTS | 4:5, dikey %40 |
| track | `4f7093b2349244c6807bf0e39b6a3a81` | 1122×1402 | "Track More, Achieve More" grafikli telefon, çevresinde sıvı halka | **Ne yapıyoruz** — 04 DASHBOARDS & MANAGEMENT INTERFACES | Telefon/tablette 5:4 (dikey %19); masaüstünde görsel kutusu sahnenin %150'si yüksekliğinde ve %6 yukarı kaydırılmış, yani görselin yalnız üst ~%70'i görünür. **Mağaza rozetleri her genişlikte kadraj dışında** (gerçek tarayıcıda gerçek görselle kontrol edildi) |
| layers | `736ef9d37279475fa0acfff055377404` | 941×1672 | Telefonun üzerinde katmanlarına ayrılmış cam kartlar (oynat, görsel, grafik, mesaj) | **Ne yapıyoruz** — 05 PROTOTYPES & MVP | 4:5, dikey %30. Katmanlara ayrılmış ürün, prototipin "parçaları denemek" fikrine karşılık |
| rock | `afe04b8ed3574774becd2a9d5c851888` | 941×1672 | Ekranında yeşil dalga çizgileri olan eğik telefon, kaya zemin üzerinde | **Güzel görünmek yetmez** | Masaüstünde 941:1500 (neredeyse tam görsel), telefonda 4:5. Sağlam zemin üzerinde duran ürün = güvenilirlik |

Altı görselin her biri bir kez, farklı bir kompozisyonda kullanıldı.

## Dikkat edilmesi gerekenler
- **V1'de Nike logosu** birkaç karede görünüyor. Sayfa bir marka ilişkisi iddia etmiyor, ama yayına almadan önce bu videonun kullanım hakkının ve logolu karelerin uygun olup olmadığını kontrol etmenizi öneririm; gerekirse logosuz bir sürümle değiştirilebilir (kod değişikliği gerekmez, yalnızca adres).
- **V3'te "Quarn" adlı bir ürün adı** görünüyor; bölümde "Konsept ürün videosu · müşteri işi değildir" notu var.
- Görsel 1 ve 2'deki mağaza rozetleri kırpılarak gizlendi; görsellerin kendisi değiştirilmedi.

## Kullanılmayanlar
- Stok görsel, genel teknoloji ikonu, boş telefon mockup'ı, sahte müşteri logosu, mağaza rozeti yok.
- App Lab'deki arayüzler görsel değildir; HTML/CSS/JavaScript ile çizilen çalışan temsili arayüzlerdir.