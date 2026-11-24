# E-Ticaret Yönetimi V1 — Tasarım gerekçesi

## Fikir: sayfa bir alışverişin yolunu izler
Kısaca Biz bir ajansı, Kreatif Prodüksiyon bir film setini anlatıyordu. Bu sayfanın konusu satış; bu yüzden sayfanın kendisi bir alışveriş gibi ilerler. Her bölüm e-ticaretin tanıdık bir nesnesini ödünç alır ama onu dekor olarak değil, anlatının taşıyıcısı olarak kullanır:

| Bölüm | Ödünç alınan nesne | Ne anlatıyor |
|---|---|---|
| 01 Vitrin | Sayfa yolu (breadcrumb), alışveriş yolu şeridi, dikey ödeme filmi | Satışın son karesi bir karardır; o karara giden yol bir deneyimdir. |
| 02 Satış bir deneyimdir | Dükkân kepengi | Fiziksel vitrinden ekrandaki vitrine: kepenk kaydırdıkça açılır. |
| 03 Uçtan uca yönetim | Sipariş özeti | Sekiz hizmet "kalem" gibi listelenir, en altta "Toplam: tek bir sistem." |
| 04 Ziyaretten satışa | Ödeme adımları göstergesi | Beş adım; yapışkan bir adım şeridi ve soldan sağa "dolan" fiiller. |
| 05 İçerik, performans, büyüme | Üç kadraj | İçerik ve performans kareleri, büyüme filminin iki yanına doğru yaklaşıp birleşir. |
| 06 Sistem | Dağınık harfler | "Tek tek" harfler dağınık başlar, kaydırdıkça hizaya girer; "işleyen sistemler" bütün hâlinde gelir. |
| 07 Final | Ürün sayfası açık bir telefon | Son çağrı ve iki CTA. |

Kart sistemi, ikon ızgarası, sayaç veya istatistik yok. Uydurma veri, müşteri, ödül veya sonuç yok.

## Videolar
İki video da dikey (9:16) ve yaklaşık 12 saniyelik. Bu bir kısıt değil, bir fırsat olarak ele alındı: dikey kadraj telefon ekranını, yani bugün alışverişin büyük kısmının yapıldığı yeri hatırlatır. Cihaz çerçevesi çizilmedi; video yalnızca ince köşeli dikey bir pencere olarak tipografinin yanında durur.

- **Hero — `ceba6b18…` (dizüstünde kartla ödeme, sıcak mutfak ışığı):** "Satışa giden dijital deneyim" cümlesinin varış noktası. Altındaki ince yeşil çizgi videonun ilerlemesini gösterir; dekor değil, gerçek oynatma süresi. Başlık "fiyat panosu" gibi harf harf dönerek açılır; film alttan bir ürün yuvası gibi yükselir.
- **Omurga — `abd33fe4…` (moda mağazası ekranı ve kart, açık zemin):** Üçlü sahnenin merkezinde "Büyüme". İçerik ve performans görselleri iki yandan ona doğru gelir.
- Aynı anda tek video oynar; ekran dışındaki durur, ikinci video bölüme yaklaşmadan indirilmez. Mobilde 480p, diğerlerinde 720p. Yüklenemezse Wix'in ürettiği gerçek kare kalır.

## Görseller (9 görselin 9'u, her biri bir göreve bağlı)
| Görsel | Nerede | Neden |
|---|---|---|
| `b3b2…` taş sokakta küçük dükkân vitrini | Deneyim, ana kare (kepenk) | "Müşteri ürünü görmeden önce markayı hisseder" cümlesinin en saf hâli: bir vitrin. Yatay ve geniş, kepenk hareketine uygun. |
| `c24b…` askılı butik | Deneyim destek karesi; Kapsam "Ürün ve kategori" | Raftaki deneyim; askılar kategori fikrinin görsel karşılığı. |
| `9d12…` sade duvar önünde telefon | Deneyim destek karesi; Kapsam "Kampanya" | Aynı vitrinin cebe sığmış hâli; sakin kompozisyon diğer iki kareyi dengeler. |
| `1be3…` dizüstünde ürün listesi | Kapsam "Mağaza kurgusu" | Gerçek bir ürün listesi ekranı. |
| `7aa4…` görsel düzenleyen kişi | Kapsam "Görsel ve içerik"; Omurga "İçerik" | İçerik üretiminin kendisi. |
| `bb2c…` telefonda ürün sayfası | Kapsam "Kullanıcı deneyimi"; Final | Mobil alışveriş anı; final çağrısının yanında "deneyim" vurgusu. |
| `e1dc…` mağaza sayfası ve telefonda ödeme | Kapsam "Dönüşüm" (küçük kare) | Ödeme adımı. Üzerinde belirgin bir ödeme markası logosu olduğu için büyük kullanılmadı; bir iş birliği izlenimi vermesin. |
| `75cf…` tablette analiz paneli | Kapsam "Reklam ve performans"; Omurga "Performans" | Ölçüm ve performans. |
| `ac2f…` basılı grafik raporu | Kapsam "Sürdürülebilir büyüme" (küçük kare) | En klişe kare; bu yüzden yalnızca küçük bir kalem görseli olarak, gri tonda ve yalnızca etkin olduğunda renkli. |

Kapsam listesinde küçük kareler varsayılan olarak gri ve karartılmıştır; yalnızca etkin kalem renklenir. Böylece sekiz görsel bir kolaj gibi değil, bir sipariş özetindeki ürün küçük resimleri gibi okunur.

## Tipografi ve renk
- Barlow Condensed 600–700 büyük başlıklar, Barlow 400–500 metin. Başlıklar Türkçe büyük harfle yazıldı (İ, Ş, Ğ, Ü, Ö); satır maskelerinde üst ve alt güvenli pay var.
- Zemin #080A09, tek vurgu #A8CF62. Vurgu yalnızca anlam taşıyan yerlerde: ikinci başlık satırları, etkin kalem, adım numarası, video ilerlemesi, toplam satırı.

## Hareket
Her bölümün hareketi kendi fikrine hizmet eder; genel "fade-up" yerine:
- Vitrin: harf harf dönen başlık, alttan açılan film, sırayla yanan alışveriş yolu, imleçle çok hafif eğilen film (yalnızca masaüstü + fare).
- Deneyim: kaydırmaya bağlı kepenk; üç cümle sırayla yanar; destek kareleri farklı yönlerden açılır, farklı hızda kayar.
- Kapsam: kalemler fiş gibi satır satır yazılır; ekranın ortasındaki kalem etkinleşir (masaüstünde imleç de seçer).
- Akış: fiiller kaydırdıkça soldan sağa dolar; yapışkan adım şeridi ilerler (pin değil, `position: sticky`).
- Omurga: iki kare dışarıdan gelip filmin iki yanına yaklaşır, film kadrajı genişler.
- Sistem: dağınık harfler hizaya girer.
- Final: görsel alttan açılır.
Hareket azaltma açıkken bunların hiçbiri çalışmaz; içerik son hâliyle görünür.
