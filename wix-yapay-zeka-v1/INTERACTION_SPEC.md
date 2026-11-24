# INTERACTION_SPEC — AI / Yapay Zekâ V1

## 1. AI Creative Lab — Creative Direction Mixer

**Ne olduğu:** Aynı fikir ("FİKRİN ÖTESİNDE.") ve aynı iki mevcut görsel (sky + wave) için üç sanat yönetimi yorumu. Bir yorum seçilince sahnedeki maske, tipografi, oran, ritim, renk ve hareket birlikte değişir; altında hangi kararın değiştiği karar kaydında yazılır.

**Ne olmadığı:** Gerçek bir yapay zekâ üretimi değildir. Hiçbir API çağrılmaz, yeni görsel üretilmez, ilerleme çubuğu, "üretiliyor…" yazısı veya sahte bekleme yoktur. Bölüm metni bunu açıkça yazar: *"Creative Direction Demo. Bu alan yeni görsel üretmez ve bir yapay zekâ servisine bağlanmaz; sayfadaki mevcut iki görselin üç tasarım yorumunu gösterir."* Sahnenin altında da "Temsili yorum · mevcut görseller kullanılır, yeni görsel üretilmez" notu vardır.

### Durumlar

Başlangıç durumu: **Cinematic** (işaretli radyo düğmesi ve `data-dir="cinematic"`).

| Karar | 01 Cinematic | 02 Editorial | 03 Experimental |
|---|---|---|---|
| Maske | Sinemaskop şeritler (2,39:1) | Dik dikdörtgen kadraj, kenar boşluklu | Eğik, kırpılmış çokgen |
| Tipografi | Altta, geniş harf aralığıyla tek satır | Solda büyük, iki satırlık başlık | Görselin üzerine taşan dev başlık |
| Oran | Tek ana görsel, tam genişlik | Ana görsel %55, ikinci görsel küçük | İki görsel üst üste, kaydırılmış |
| Ritim | Yavaş, 1,4 sn geçiş (`expo.inOut`) | Net, 0,8 sn geçiş (`power3.inOut`) | Hızlı, sekmeli 0,62 sn geçiş (`back.inOut`) |
| Renk | Koyu sahne, sıcak ışık | Kırık beyaz zemin, koyu metin | Yeşil (#A8CF62) vurgu, renk kanalları ayrık |
| Hareket | Yumuşak, uzun yavaşlama; harf aralığı açılarak gelen başlık | Kararlı; satırlar alttan yükselir | Sıçrayan; satırlar karşı yönlerden, hafif dönerek gelir |

Karar kaydındaki her satır, sahnede gerçekten uygulanan CSS kararını yazar (metin ile görünüm aynı kaynaktan gelir).

### Geçiş tekniği
- Yerleşim `left/top/width/height` yüzdeleriyle tanımlıdır (`data-dir` öznitelikli CSS kuralları). Yorum değişince öğelerin eski piksel konumları ölçülür, yeni durum uygulanır, GSAP eski konumdan yenisine (FLIP) geçirir ve bitince satır içi stilleri temizler.
- Her geçişten önce sahnedeki çalışan tween'ler durdurulur; art arda hızlı tıklamada son seçilen yorum temiz biçimde kalır (test: 100 hızlı değişim, son durum doğru, kalıntı yok).
- Tipografi konteyner sorgusu birimleriyle (`cqw`) ölçeklenir; sahne genişliği ne olursa olsun başlık kadraja göre büyür.
- Masaüstü, tablet ve telefon için ayrı yerleşim kuralları vardır (telefonda Experimental küçük görseli başlığın üstüne binmeyecek şekilde konumlandırıldı).

### Girdi
- **Fare / dokunma:** Yorum kartına tıklamak/dokunmak seçer. Kartın tamamı `label`dır; hedefler 44 px'ten büyük.
- **Klavye:** Üç yorum tek bir radyo grubudur (`name="ai-dir"`). Tab gruba girer, ok tuşları yorum değiştirir, değişiklik anında uygulanır. Odak halkası görünür.
- **Ekran okuyucu:** Sahne `aria-label`ı seçili yoruma göre güncellenir; `aria-live="polite"` alanı "Deneysel yorum seçildi. …" gibi bir cümle duyurur.
- **GSAP yoksa / hareket azaltma açıksa:** Yorum değişimi aynı şekilde çalışır, yalnızca geçiş animasyonu olmadan anında uygulanır.

## 2. Videolar

| Kural | Davranış |
|---|---|
| Öznitelikler | `muted`, `playsinline`, `loop`, `preload="none"`; `poster` ve `autoplay` yok |
| İlk görüntü | İlk kare gelene kadar yalnız zemin rengi. Meta veri gelince video duruyorsa `first` saniyesine (story için 1,2 sn) atlanıp gerçek bir kare gösterilir, sonra `is-ready` ile yumuşakça belirir |
| Yükleme | Hero hemen; diğerleri görünüme 600 px kala |
| Otomatik oynatma | Hareket azaltma kapalı ve Veri Tasarrufu kapalıysa: ekranda ≥ %35 görünen videolardan en çok görüneni oynar, diğerleri durur. **Aynı anda en fazla bir video** |
| Sekme gizlenince | Bütün videolar durur; geri gelince kural yeniden uygulanır |
| Oynat/duraklat düğmesi | SVG ikon, `aria-label` "Videoyu duraklat" / "Videoyu oynat". Elle oynatılan video 2,5 sn boyunca otomatik kural tarafından durdurulmaz; elle duraklatılan video otomatik başlamaz |
| Hata | `error` olunca `is-failed`: video gizli kalır, düğme devre dışı, "Video şu anda yüklenemedi." yazısı görünür. Yerine görsel konmaz |
| Hareket azaltma / Veri Tasarrufu | Otomatik oynatma yok; ilk kare görünür, düğmeyle elle oynatılabilir |
| Düğme konumu | Masaüstünde sağ alt. 1024 px ve altında tam genişlikteki videolarda (Hero, Üretim) sol alta alınır, böylece sabit WhatsApp/Yukarı Çık düğmeleriyle çakışmaz. Hareket videosu kenara uzanmadığı için sağda kalır |

## 3. Hareket & Üretken Anlatı — bölüm (chapter) listesi

- Hikâye videosu 4 bölüme ayrıldı: **0 sn** Tek bir tuş (GİRDİ) · **3 sn** Çoğalan parçalar (ÇOĞALMA) · **5 sn** Bir düzen kurulur (YAPI) · **8,8 sn** Bir dünya belirir (DÜNYA). Saniyeler videonun gerçek karelerine bakılarak belirlendi.
- Video oynarken etkin bölüm vurgulanır (`aria-current="true"`), altındaki çizgi bölümün ilerleyişine göre dolar; videonun üzerindeki büyük kelime bölüm anahtarını gösterir.
- Bölüm düğmesine tıklamak videoyu o saniyeye götürür ve oynatır. Video ekranda %50'den az görünüyorsa önce görünüme kaydırılır (hareket azaltmada yumuşak kaydırma yok).

## 4. Diğer etkileşimler

- **Hero:** Sayfa açılınca "YAPAY ZEKÂ." harfleri yazılır, imleç yanıp söner, ardından imleç pencere boyuna uzar ve video penceresi ortadan açılır; kelimeler iki yana çekilir. Masaüstünde kaydırırken pencere hafifçe büyür, kelimeler dışa kayar (scrub, pin yok). "Creative Lab'i deneyin" bağlantısı Lab'e kaydırır.
- **Süreç (6 aşama):** Kaydırmayla bağlantılı editoryal dizi; her aşamanın çizgisi görünüme girdikçe dolar. Pin yok.
- **Sorumlu üretim (8 konu):** Başlıkta "ÜRETMEK YETMEZ." satırının üstü bir çizgiyle çizilir, ardından "DOĞRU ÜRETMEK GEREKİR." yükselir. 8 konunun her biri bir kontrol sorusu olarak yazılır ve görünüme girdikçe belirir. Sertifika, garanti veya "%100 güvenli" iddiası yok.
- **Final:** "GELECEĞİ BİRLİKTE ÜRETELİM." harfleri yazılır, imleç kalır. PROJENİZİ KONUŞALIM → `/iletisim`, TEKLİF AL → `/teklif-al`.

## 5. Glitch kuralları (yalnızca Gelecek bölümü)

- Sürekli değil: 768 px ve üzerinde görsel görünüme girince **bir kez** (~0,8 sn) çalışır.
- Masaüstünde (ince işaretçi, hover destekli, ≥ 1025 px) fareyle görselin üzerine gelince daha kısa bir sürümü çalışır; iki glitch arası en az 1,8 sn.
- Tablette (768–1024 px) yalnızca görünüme girişte bir kez; hover tetiklemesi yok. **Telefonda (< 768 px) glitch hiç çalışmaz**; yalnızca başlıklar ve görselin sabit hâli görünür.
- `prefers-reduced-motion` açıkken hiç çalışmaz. GSAP yoksa çalışmaz, görsel normal görünür.
- Teknik: görselin iki renk kanalı kopyası kısa süre kaydırılıp yatay şeritlerle kırpılır, sonra tamamen kaybolur ve stiller temizlenir.

## 6. Header/Footer ve sabit kontroller
Onaylı modüllerden gelir ve değiştirilmez. Bileşen sayfada zaten varsa ikinci kopya oluşturmaz. Testte: masaüstü menü bağlantıları, telefonda menü açma ve İnsan Kaynakları alt menüsü, Esc ile kapanma, Yukarı Çık düğmesi (sayfanın sonundan 0'a) çalıştı.
