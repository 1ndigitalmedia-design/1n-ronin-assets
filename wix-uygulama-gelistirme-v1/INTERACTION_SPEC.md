# INTERACTION_SPEC — Uygulama Geliştirme V1

## 1. Interactive App Lab — Product Experience Simulator

**Ne olduğu:** "Atölye" adlı temsili bir proje yönetimi uygulaması. Aynı örnek veri (8 proje, 26 görev) üç farklı deneyimde kullanılır: **Mobile App**, **Web App**, **Dashboard**. Bir görünümde yapılan değişiklik (durum, görev) diğer ikisine de yansır; bölümün mesajı "bir uygulama, birden fazla deneyim" budur.

**Ne olmadığı:** Gerçek bir ürün değildir. Sunucu, API, giriş, canlı kullanıcı, gerçek zamanlı analiz yoktur; hiçbir veri gönderilmez veya kaydedilmez. Değişiklikler yalnızca sayfa açıkken bellekte tutulur, "Demoyu sıfırla" ile ya da sayfa yenilenince başa döner. Bunu bölüm metni ve altındaki "Temsili ürün demosu · örnek veri · 1N Digital Media müşteri projesi değildir" notu söyler. Dashboard'daki sayılar yalnızca bu örnek veriden hesaplanır (ekranda yazılı).

### Veri
- Durumlar: Planlandı → Sürüyor → İncelemede → Tamamlandı. Durum yalnızca renkle değil, simge biçimiyle (boş daire, yarım dolu, kesik çizgili halka, dolu) ve yazıyla gösterilir.
- İlerleme yüzdesi her projenin tamamlanan görevlerinden hesaplanır.
- Proje adları iş türlerini anlatır (Lansman filmi, Web sitesi yenileme…); müşteri adı yoktur.

### Mobile App (telefon çerçevesi)
| Ekran | Kontroller | Davranış |
|---|---|---|
| Projeler | Tümü / Aktif / Tamamlanan süzgeci; proje satırları | Süzgeç listeyi gerçekten süzer; satıra dokunmak detayı açar |
| Proje detayı | Geri ("Projeler"), 4 durum düğmesi, görev kutuları | Durum değişir, rozet kısa bir büyümeyle yanıt verir; görev işaretlenince ilerleme çubuğu yeni değere akar; Geri listeye döner ve odak açılan satıra geri gelir |
| Görevler | Bütün açık görevler | İşaretlenen görev "Tamamlanan görevleri göster" kapalıysa listeden çıkar |
| Ayarlar | "Tamamlanan görevleri göster", "Sıkı liste" anahtarları (`role=switch`) | Görevler ve Projeler ekranlarını gerçekten değiştirir |
| Alt menü | Projeler / Görevler / Ayarlar | Etkin sekme `aria-current="page"` |

Geçişler: detay sağdan gelir, geri dönüş soldan; proje adı listedeki yerinden detaydaki başlığa kayar (ortak öğe geçişi).

### Web App (tarayıcı çerçevesi)
| Alan | Kontroller | Davranış |
|---|---|---|
| Sol menü | Projeler, Görevler (sayılarıyla) | İçerik alanını değiştirir |
| Liste | Arama kutusu, Durum seçimi (`select`), Tür çipleri | Üçü birlikte süzer; sonuç yoksa "“…” için proje bulunamadı" + "Filtreleri temizle" |
| Detay | Durum düğmeleri, görevler | Seçilen satır vurgulanır; detay değişir |
| Görevler | Açık / Tümü | Bütün projelerin görevleri tablo düzeninde, proje adı ve durumuyla |

Dar alanda (simülatör 760 px'ten darsa — telefon ekranı) liste ve detay yan yana sığmaz: liste → detay → "Liste" geri düğmesi akışına dönüşür (container query ile, sayfa genişliğine değil simülatör genişliğine göre).

### Dashboard
| Alan | Kontroller | Davranış |
|---|---|---|
| Durum özeti | 4 kutu (sayılar) | Dar alanda hangi sütunun gösterileceğini seçer; geniş alanda seçili sütunu vurgular |
| Tür | Tümü / Tasarım / Video / Ürün | Kutuları, panoyu ve ilerleme listesini süzer |
| Görünüm | Pano / İlerleme | Pano: 4 durum sütunu. İlerleme: projeler yüzdeye göre sıralı çubuklar |
| Kart | "Detay", "Sonraki aşamaya taşı" (ok ikonu) | Taşı: kart yeni sütuna kayarak geçer (FLIP), sayılar güncellenir, ekran okuyucuya duyurulur. Detay: Web App görünümüne geçer ve o projeyi açar |

Dar alanda (640 px altı) pano tek sütun gösterir; sütun özet kutularından seçilir.

### Görünüm değiştirme
- Üç görünüm bir `tablist`; sekmeler `role=tab`, panel `role=tabpanel`. Ok tuşları, Home/End çalışır; seçili sekme odakta kalır.
- Geçişte simülatörün boyutu eski ölçüden yenisine yumuşakça dönüşür (telefon → tarayıcı → panel), içerik ardından belirir. Bittiğinde satır içi ölçüler temizlenir.

### Erişilebilirlik
- Bütün kontroller gerçek `button`, `input type=checkbox` + `label`, `select`, `input type=search`. Dokunma alanları en az 44×44 px.
- Her yeniden çizimde odak aynı kontrole geri verilir (arama kutusunda imleç konumu korunur).
- Değişiklikler `aria-live="polite"` ile duyurulur (ör. "Katalog çekimi: Sürüyor olarak güncellendi.").
- Veriler DOM'a yalnızca `textContent` ile yazılır; arama metni HTML olarak yorumlanmaz.
- GSAP yoksa veya hareket azaltma açıksa her şey aynı çalışır, yalnızca geçişler anlık olur.

## 2. Ne yapıyoruz — hizmet dizini
- **Masaüstü (1025 px+):** Solda beş hizmet adı, sağda tek sahne. Adlar `button` + `aria-expanded` + `aria-controls` (açılır panel düzeni); tıklama, klavye veya fareyle üzerine gelince (140 ms gecikme) açılır. Açılan hizmetin açıklaması genişler, sahnedeki medya yukarı/aşağı yöne göre silinerek değişir. Web Applications seçiliyken video oynar, başka hizmete geçince durur.
- **Tablet ve telefon:** Düğme yoktur; beş hizmet alt alta, her biri kendi medyasıyla tamamen görünür (işlevsiz düğme bırakılmaz). Kırılma noktası değişince düzen kendini yeniden kurar.

## 3. Fikir kodla buluştuğunda — süreç tahtası
- Yedi aşama; yanında (telefonda üstünde, yapışkan) küçük bir ürün ekranı. Okuma çizgisini geçen aşamaya göre tahta değişir: DISCOVER sorular → DEFINE akış şeması → DESIGN tel çerçeve → PROTOTYPE tıklanabilir alan → DEVELOP gerçek içerik ve renk → TEST & REFINE kontrol etiketleri → EVOLVE v1.1 ve yeni arama.
- Pin veya GSAP spacer yok; yalnızca CSS `position: sticky`. Wix kapsayıcısı sticky'yi engellerse tahta normal akışta kalır, aşamalar yine çalışır.
- Aşamalar düğmedir; tıklanınca tahta o aşamaya geçer ve kullanıcı ~120 px kaydırana kadar seçim korunur.
- Kaydırma takibi pasif `scroll` dinleyicisi + `requestAnimationFrame` ile; GSAP gerekmez.

## 4. Hareket deneyimin bir parçasıdır — mikro etkileşimler
| Örnek | Kontrol | Hareket ne anlatıyor |
|---|---|---|
| İşlem tamamlandı | "Görevi tamamla" → "Geri al" | Düğme onay işaretine dönüşür, bildirim gelir; Geri al gerçekten geri alır, odak düğmeye döner |
| Sayfa geçişi | Satır → detay → geri | Yeni ekran dokunulan yönden gelir |
| Durum değişimi | Bildirimler anahtarı (`role=switch`) | Anahtar, simge ve yazı birlikte değişir |
| Geri bildirim | Kaydet (`aria-pressed`) | Simge dolar ve bir an büyür |
| Yükleme durumu | İçeriği yükle | 0,9 sn iskelet, sonra içerik. Ekranda yazılı: bekleme bir canlandırmadır, gerçek istek yapılmaz |

- **Hareket anahtarı** (`role=switch`): kapatınca aynı işlemler animasyonsuz çalışır ve açıklamaya "Hareket kapalı: sonuç aynı, ama değişimi fark etmek zorlaşır." eklenir. Hareket azaltma açıksa başlangıçta kapalıdır.
- Açıklama alanı `aria-live="polite"`.

## 5. Her ekranda doğru deneyim — bağlamlar
- Üç bağlam düğmesi (`aria-pressed`): **Yolda** (tek elde telefon), **Toplantıda** (tablet), **Masada** (masaüstü).
- Seçince SVG şema (başparmak erişim alanı, alt menü / sekmeler ve kalem / yan menü ve imleç) ve dört karar satırı (Navigasyon, Hedef ve girdi alanı, İçerik önceliği, Girdi biçimi) birlikte değişir; değişiklik ekran okuyucuya tek cümleyle duyurulur.
- App Lab'in tekrarı değildir: ürün değil, tasarım kararlarını gösterir.

## 6. Videolar
| Kural | Davranış |
|---|---|
| Öznitelikler | `muted`, `playsinline`, `loop`, `preload="none"`, `disablepictureinpicture`; `poster` ve `autoplay` yok |
| İlk görüntü | İlk kare gelene kadar koyu zemin; duraklatılmışsa videonun kendi anlamlı karesi |
| Otomatik oynatma | Hareket azaltma ve veri tasarrufu kapalıysa: ekranda ≥ %35 görünen, en çok görünen ve gizli panelde olmayan video oynar. Aynı anda en fazla bir video |
| Sekme gizlenince | Hepsi durur |
| Düğme | SVG oynat/duraklat, `aria-label` durumla güncellenir; diğer videolarda 1024 px ve altında sol altta, masaüstünde sağ altta; Hero videosunda 768 px ve üzerinde sağ üstte, telefonda sol altta (sabit WhatsApp / Yukarı Çık düğmeleriyle çakışmaz). Elle oynatılan video 2,5 sn otomatik kuralla durdurulmaz; elle duraklatılan kendiliğinden başlamaz |
| Hata | "Video şu anda yüklenemedi.", düğme devre dışı, yerine görsel konmaz |

## 7. Final
- "BİR FİKRİN / VAR MI?" iki yandan gelir, soru işareti yerine oturur. Masaüstünde soru işaretinden birincil düğmenin soluna noktalı bir çizgi iner (çizgi gerçek konumlardan hesaplanır, boyut değişince yeniden çizilir; tablet ve telefonda yok).
- PROJENİZİ KONUŞALIM → `/iletisim`, TEKLİF AL → `/teklif-al`.

## 8. Header/Footer ve sabit kontroller
Onaylı modüllerden gelir, değiştirilmez; sayfada zaten varsa ikinci kopya oluşturulmaz.