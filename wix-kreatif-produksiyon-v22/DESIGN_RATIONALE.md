# V22 — Tasarım gerekçesi

## Sorun
V21'deki Fikir bölümü fikri bir şema olarak anlatıyordu: üst üste binen dış çizgili dikdörtgenler, daireler, kesikli bağlantı çizgileri ve HUD etiketleri. Bir prodüksiyon ajansı için bu, işin kendisini (görüntüyü) göstermek yerine onun diyagramını gösteriyordu. Aynı dil storyboard'daki SVG tel kafes karelerde de tekrar ediyordu.

## Yaklaşım: "kontakt baskı" değil, tek kare
Fikir bölümünün metni zaten bir sıralama içeriyor: *kamera, ışık, kurgu … strateji, ışık, kompozisyon, hareket, kurgu*. V22 bu sıralamayı bir galeri gibi yan yana dizmek yerine **tek bir kadrajda, sırayla** gösterir. İzleyici aynı anda tek bir kareye bakar; kaydırdıkça kare değişir. Bu, bir kurgu masasında kareden kareye geçmenin karşılığıdır ve galeri / slider / grid / kart dilinden bilinçli olarak uzak durur.

Kompozisyon üç katmandan oluşur:
1. **Ana kare** (4:5, çerçevesiz, yalnızca hafif bir alt vinyet). Kalın kenarlık yok.
2. **"Sıradaki kare"** — ana karenin köşesine taşan küçük, gölgeli bir önizleme. Kurgu masasındaki "next shot" monitörünü çağrıştırır ve kompozisyona derinlik katar; ayrı bir kart gibi değil, ana karenin üzerine bırakılmış bir baskı gibi durur.
3. **Altyazı** — sayaç (`02 / 05`), anahtar kelime ve tek cümlelik açıklama; altında 5 anahtar kelime düğmesi.

## Kare seçimi (havuzdaki 11 görselden 10'u)
| Sıra | Anahtar kelime | Görsel | Neden |
|---|---|---|---|
| 00 | Kamera | Grafitili aynada fotoğraf makinesiyle kendini çeken fotoğrafçı | "Bir araç" cümlesinin birebir karşılığı: kadrajın içinde kadraj, kameranın kendisi görünür. Kadraj fotoğrafçıyı tutacak şekilde sağa kaydırıldı (`object-position: 74%`). |
| 01 | Strateji | Beyaz stüdyoda, elleri siyah iplerle örülü kadın | İpler "bağlantıları kurmak" fikrini görselleştirir; sade beyaz zemin düşünme anını hissettirir. |
| 02 | Işık | Yelpazeden süzülen ışıkla yüzüne gölge düşen kadın | Işığın neyi gösterip neyi gizlediğini tek karede anlatan en net görsel. |
| 03 | Kompozisyon | Turuncu/turkuaz ışıklı beton yapı önünde duran kadın | Güçlü çizgiler, tamamlayıcı renkler ve ölçek: kompozisyonun ders kitabı örneği. |
| 04 | Hareket | Dağda rüzgârda savrulan turuncu pelerinli kadın | Hareketi donmuş kumaşla gösterir; setin dışına, dış çekime açılır. |
| 05 | Kurgu | Kırmızı zemin önünde beyaz kâğıt başlık takan model | En grafik, en "son karar" hissi veren kare; dizinin kapanışı. |

Storyboard: Sahne 01 kırmızı kemer önündeki üç kadın (konsept/renk dünyası), Sahne 02 kırmızı ışıklı set (ön prodüksiyon/set kurulumu), Sahne 03 ışık stantları arasında DJ (çekim günü, ekipman görünür), Sahne 04 neon tabelalı mekân (post-prodüksiyon/renk). Kullanılmayan tek görsel mavi tonlu kare: paletin sıcak kırmızı-turuncu ekseninden ayrılıyordu ve 10 kare ihtiyacı karşılıyordu.

## Hareket
- Her kare kendine özgü bir açılışla gelir: Strateji aşağıdan perde gibi, Işık merkezden açılarak (kısa bir parlaklık patlamasıyla), Kompozisyon soldan, Hareket yatay kayma ile, Kurgu sert kesmeyle. Geri kaydırmada her zaman sert kesme kullanılır — kurgu dilinde geri sarma budur.
- Eşikler metin boyunca eşit aralıklı (1/6 adım); kaydırma `scrub: .6` ile yumuşatılır.
- Önizleme karesinde hafif parallax; masaüstünde imleçle çok küçük derinlik hareketi (yalnızca `hover: hover` cihazlarda).
- Mobilde hover bağımlılığı yok; anahtar kelime düğmeleri her cihazda doğrudan kareyi değiştirir.
- `prefers-reduced-motion`: kareler animasyonsuz değişir, kelime karartma uygulanmaz. GSAP hiç yüklenmezse düğmeler yine çalışır, tüm metin görünür.

## Sayfanın geri kalanı
Storyboard'daki köşe parantezleri ve tel kafes SVG'ler kaldırıldı. Hero, monitör, formatlar ve kapanıştaki köşe işaretleri ile format kılavuz çizgileri **bilerek korundu**: hero/monitör video kadrajını, formatlar ise en-boy oranlarını anlatan işlevsel öğeler; brief'in "Header/Footer, hero ve video altyapısını koru" maddesiyle de çelişmemesi için dokunulmadı. İstenirse bir sonraki turda sadeleştirilebilir.
