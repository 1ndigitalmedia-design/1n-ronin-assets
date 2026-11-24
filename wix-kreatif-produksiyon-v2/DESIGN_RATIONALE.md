# Tasarım Gerekçesi — Kreatif Prodüksiyon V2

## Önce video: gerçekte ne var?

Video, yerleşik tarayıcıda açılıp kare kare incelendi. Kareler `video-analizi/` klasöründe; parlaklık her 0,25 saniyede ölçüldü (121 örnek). Teknik özellikler: 30,17 sn, 1920×1080, 16:9, ses izi var.

**Karakter**
- Siyah zemin üzerinde hızlı kesmeler ve glitch/datamosh geçişleri.
- HUD çizgileri: altıgen çerçeveler, artı işaretleri ve "00:00:00:292" gibi zaman kodları.
- Ritim çok hızlı: görüntü çoğu yerde yaklaşık 0,25 saniyelik flaşlarla gelip gidiyor.

**Renk**
- Büyük ölçüde siyah-beyaz. Ölçümde R, G ve B çoğu karede eşit çıktı.
- Kısa sıcak anlar: fırlatma alevi, yaklaşık 6. ve 7. saniyeler.
- Soğuk mavi bir zirve: gökyüzü ve bulutlar, 18–22. saniyeler.
- Yeşil yalnızca 22. saniyedeki ışık çizgilerinde.

**Gerçek bölümler** (sayfadaki monitörün bölüm listesi bunlardır)

| Zaman | Görülen |
|---|---|
| 0,5 sn | "1N_Digital_Media" yazısı parazitle açılır |
| 3,6 sn | Arayüz katmanı: altıgenler, zaman kodu, "PRESENTS" |
| 5,9 sn | "IMAGINATION" ve gün batımında fırlatma |
| 9,4 sn | Uzaydan bulutların ve Dünya'nın görüntüsü |
| 12,4 sn | "BRUTALIZE", kırılan görüntü blokları |
| 15,2 sn | Karlı sırtta ilerleyen dağcılar |
| 18,3 sn | Beyaz flaş, ardından bulutların üstünde serbest düşüş |
| 22,4 sn | Işık çizgileri ve glitch başlık kartı |
| 26,2 sn | Siyah zeminde kısa jenerik |

**Açılış ve kapanış atmosferi:** İlk ve son saniyeler neredeyse tamamen siyah. Film karanlıktan açılıp karanlığa kapanıyor.

Videoda görünmeyen kişi, ürün ya da mekân tarif edilmedi. İçerikle ilgili lisans notu QA_REPORT.md §8'de.

## Fikir: "Kadraj"

Video zaten kendi içinde bir kadraj dili kullanıyor (HUD, zaman kodu, köşe işaretleri). Sayfa bu dili, bir film setindeki **kadraj** nesnesine çevirir. Her bölüm, aynı kadraj fikrinin başka bir hâlidir:

| Bölüm | Kadrajın hâli | Hareket karakteri |
|---|---|---|
| 01 Açılış karesi | Gerçek video, köşe işaretli 16:9 kadraj | Kadraj ince bir yarıktan sinemaskop gibi açılır; başlık maskeden yükselir; kaydırınca kamera geri çekilir |
| 02 Fikir | Boş bir 16:9 kare | Metin okundukça kare katman katman kurulur: nokta (strateji) → ışık konisi → üçte bir ızgarası → hareket yolu → kesme |
| 03 Yolculuk | Dört storyboard karesi | Her karenin kendi çizim hareketi var; soldaki omurga kaydırmayla dolar |
| 04 Hareket | Kurgu monitörü | Gerçek film; bölümler ve videonun ölçülmüş ışık ritmi |
| 05 Formatlar | Oranı değişen tek kadraj | Aynı gerçek kare, her üretim alanında yeniden kadrajlanır |
| 06 Felsefe | Siyah bantlarla sinemaskopa kapanan ekran | "Hikâye inşa ediyoruz" harfleri yukarıdan düşüp üst üste oturur |
| 07 Final | Kapanış kadrajı | Köşeler içeri kayarak kapanır; zaman kodu filmin son karesine (00:30.17) sayar |

## Bölüm kararları

### 01 — Açılış karesi
- **Video ana rolde:** Videonun kendisi bir kadrajın içinde durur. Arka plan videosu ya da banner değildir.
- **Başlık ile video:** "KREATİF PRODÜKSİYON." videonun sol alt köşesinin üzerine taşar ve masaüstünde `mix-blend-mode: difference` ile videoya karışır. Glitch kareler başlığın içinden geçer. Bu, videonun parazitli tipografisiyle aynı dili konuşur.
- **Neden letterbox açılışı:** Filmin kendisi karanlıktan açılıyor. Sayfa da aynı şekilde siyahtan ince bir yarığa, oradan tam kareye açılır.
- **Mikro metinler gerçek bilgidir:**
  - "16:9 / 1920 x 1080" gerçek çözünürlük.
  - Zaman kodu videonun gerçek konumunu gösterir.
  - "00:30.17" gerçek süre.
- **Tablet ve mobil:** Başlık üstte, video tam genişlikte 16:9 olarak altta. Video kırpılmaz ve esnetilmez (`object-fit: contain`).

### 02 — Her güçlü kare bir fikirle başlar
- **Metin:** Kamera ekipmanını değil, kararları anlatır: neyi göstermek, neyi dışarıda bırakmak, hangi duyguyu taşımak.
- **Metin ile kare aynı anda ilerler:** Kaydırdıkça kelimeler sırayla aydınlanır. Beş anahtar kelimeye (strateji, ışık, kompozisyon, hareket, kurgu) gelindiğinde yandaki boş kare o katmanı kazanır. "Fikirden görüntüye geçiş" metaforu böylece kelimenin tam anlamıyla gösterilir.

### 03 — Bir fikrin yolculuğu
- **Yaklaşım:** Kart değil, bir storyboard. Her sahne bir çizim karesi ve onun not satırıdır (Çerçeve 01, A kamera, ana ışık...).
- **Sahne çizimleri:**
  - 01 Creative Direction: üst üste kayan referans kareleri ve bir fikir halkası.
  - 02 Pre-Production: kuşbakışı çekim planı; iki kamera özneye döner, dolly yolu çizilir.
  - 03 Production: ışık düzeni; ana ışık konisi flaş gibi adım adım yanar.
  - 04 Post-Production: kurgu zaman çizelgesi; oynatma çizgisi klipler boyunca kayar, renk tekerleği döner.
- **Kaydırma:** Pin yok. Sahneler doğal kaydırmayla gelir; soldaki omurga ilerlemeyi gösterir. Mobilde aynı sırayla dikey akar.
- **Süreklilik:** Giriş metni prodüksiyonu tek seferlik bir iş olarak değil, kampanya filminden aylık içerik üretimine kadar ölçeklenen bir süreç olarak anlatır.

### 04 — Hareket bir anlatım dilidir
- **Monitör:** Filmin ikinci kullanımı bir kurgu monitörüdür. Ziyaretçi bölümler arasında atlayabilir, sürükleyebilir ve klavyeyle sarabilir.
- **Ritim çizgisi:** Videodan ölçülmüş gerçek veridir. Her çubuk 0,25 saniyedeki ortalama ışığı gösterir. 18–22. saniyelerdeki yükselen blok serbest düşüş sahnesidir; sondaki düz hat kapanıştaki karanlıktır. Hareketin "dil" olduğunu, filmin kendi kesme ritmini görünür kılarak anlatır.
- **Teknik karar:** Kaydırmaya bağlı video scrubbing kurulmadı, çünkü mobilde kırılgandır. Bölüm atlama ve zaman çizgisi güvenilir ve test edilebilir. Aynı anda tek video oynar.

### 05 — Her formatta aynı yaratıcı bakış
- **Tek kadraj:** Kart yok; tek bir kadraj ve yedi üretim alanı var. Bir alan seçildiğinde kadrajın oranı o formata dönüşür.
- **Formatlar ve oranlar:**

| Format | Oran | Rehber çizgiler |
|---|---|---|
| Marka ve kampanya filmleri | 2.39:1 | — |
| Ürün fotoğraf ve video | 4:5 | Merkez artısı |
| Sosyal medya kısa video | 9:16 | Arayüz güvenli alanı |
| Konsept ve art direction | 3:2 | Üçte bir ızgarası |
| Motion design | 16:9 | Hareket yolu |
| Post-production ve adaptasyon | 16:9 / 1:1 / 9:16 | Üç oran iç içe |
| AI destekli üretim | 1:1 | Varyasyon ızgarası |

- **Kadrajdaki görüntü:** Filmin gerçek bir karesidir (Wix'in ürettiği poster karesi, karlı sırt).
- **Bilinçli kırpma:** Kırpma burada konunun kendisidir: aynı kare her formatta yeniden kadrajlanır. Odak noktası her oranda dağcıları içeride tutacak şekilde ayarlandı.
- **Proje görseli yok:** Uydurma proje görseli, müşteri adı veya başarı iddiası kullanılmadı.

### 06 — Prodüksiyon felsefemiz
- **İki ses:** "Sadece görüntü / üretmiyoruz." gri ve sağa kayan bir kompozisyonda. "Hikâye / inşa ediyoruz." açık renk ve vurgu renginde.
- **Hareket:**
  - Kaydırdıkça üstten ve alttan siyah bantlar gelir; ekran sinemaskop bir kadraja dönüşür.
  - İlk iki satırın kelimeleri zıt yönlerden gelip yerine oturur.
  - "Hikâye" harfleri yukarıdan iner.
  - "İnşa ediyoruz." harfleri tuğla gibi tek tek düşüp üst üste oturur. Fiil, harekete dönüşür.
- **Boşluk:** Tipografi ile boşluk ilişkisi bilinçli olarak geniş tutuldu.

### 07 — Final
- **Kapanış sahnesi:** Bir filmin kapanış sahnesi gibi, yeşil köşe işaretleri dışarıdan içeri kayarak kadrajı kapatır.
- **Metin:** "Bir fikrin var mı?" küçük bir soru. "Onu hayata geçirelim." büyük cevap.
- **Son satır:** Zaman kodu 00:30.17'ye, yani filmin son karesine sayar.
- **Footer geçişi:** Footer, Final'in degradesinden boşluksuz başlar.

## Kısaca Biz V3 ile ilişki

**Alınanlar:** Altyapı aynı:
- Header/Footer entegrasyonu
- CSS kapsamı
- matchMedia/context mimarisi
- Türkçe satır maskesi payı
- SVG ikon standardı
- #A8CF62 tek vurgu

**Bilinçli olarak alınmayanlar:** Creative Engine, Team listesi, Standart satırları ve Uzmanlık şeridi kopyalanmadı.

**Bu sayfanın kendine özgü dili:** Kadraj, zaman kodu, storyboard, letterbox. Kısaca Biz ekibi geometriyle anlatıyor; bu sayfa prodüksiyonu filmin kendi araçlarıyla anlatıyor.

## Renk ve tipografi

- **Renkler:**
  - Arka plan `#080A09`; monitör ve storyboard yüzeyleri `#0D0F0E`.
  - Video ekranı `#050605`; videonun siyahıyla birleşir.
  - Vurgu yalnızca `#A8CF62`: aktif bölüm, ışık konisi, oynatma çizgisi, kapanış köşeleri.
  - Neon parlama, cam efekti ve yuvarlak kart yok.
- **Tipografi:**
  - Başlıklarda Barlow Condensed 600–700, büyük harf. `lang="tr"` sayesinde i → İ dönüşümü doğru.
  - Gövde metninde Barlow 400–500.
  - Zaman kodlarında `tabular-nums`; rakamlar akarken titremez.
- **Türkçe karakterler:** Satır maskelerinde üst %17, alt %9 pay bırakıldı. İ, Ş, Ğ ve Ü işaretlerinin çakışmadığı 10 genişlikte ölçüldü.

## Bilinçli olarak yapılmayanlar

- WebGL, video scrubbing, aynı anda iki oynatıcı.
- Pin ve büyük ScrollTrigger spacer'ı.
- Sahte proje görseli, müşteri adı, ödül veya istatistik.
- Her bölümde aynı fade-up animasyonu.
