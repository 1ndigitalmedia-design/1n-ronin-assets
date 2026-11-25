# QA_REPORT — Yasal Sayfalar V1

Bu rapor yalnızca gerçekten çalıştırılan testleri içerir.

**Yapılmayan testler**
- Wix Studio içinde test yapılmadı.
- Gerçek telefon ve tablette, Safari ve Firefox'ta test yapılmadı.
- Ekran okuyucu, Lighthouse ve gerçek yazıcı testi yapılmadı.
- **Hukuki doğruluk bir test değildir:** metinler avukat incelemesinden geçmedi (P-02).

## Test ortamı

- **Tarayıcı:** Playwright ile Chromium (headless). `preview.html` yerel bir sunucudan açıldı.
- **Header ve Footer:** Onaylı commit `d24fa373…` dosyalarının yerel kopyalarından yüklendi. Bunlar CDN'deki dosyalarla aynı commit'e aittir. Bu ortam jsDelivr'e doğrudan erişemiyor.
- **Fontlar:** Barlow ve Barlow Condensed yerel kopyadan yüklendi.
- **Medya:** Sayfalarda görsel veya video yok; harici medya gerekmedi.
- **Ekran görüntüleri:** Aynı ortamda alındı.

## 1. Genişlik testi

Beş sayfa × 10 genişlikte 50 çalıştırma yapıldı. Genişlikler: 360, 375, 390, 430, 768, 820, 1024, 1366, 1440, 1920.

| Kontrol | Sonuç |
|---|---|
| Yatay taşma (scrollWidth = genişlik) | 50/50 geçti |
| Görünür bir öğenin ekran dışına taşması (tablolar hariç) | 0 |
| Tablonun sayfa dışına taşması | 0. Tablet tabloları yalnızca kendi alanında kayar; telefonda alt alta okunur. |
| Footer altı boşluk | 0–1 px |
| Header / Footer / WhatsApp bileşeni / yüzen katman sayısı | 1 / 1 / 1 / 1 |
| H1 sayısı | Her sayfada 1; beş sayfada farklı |
| 13,5 px'ten küçük metin (inceleme etiketleri hariç) | 0 |
| 44 px'ten kısa dokunma hedefi (düğmeler, içindekiler bağlantıları, form alanları, seçenekler) | 0. Satır içi metin bağlantıları ölçüme dahil edilmedi. |
| Sayfa içi bağlantılar | Yalnızca beş yasal slug, mailto, tel, reklam1n.com ve kvkk.gov.tr. İzin verilmeyen bağlantı: 0 |
| Kırık sayfa içi çapa / tekrarlanan id | 0 / 0 |
| Konsol hatası | 0 |
| Emoji veya Unicode ok | 0 |
| #A1FF00 / #A2FF00 | yok |
| Ziyaretçi görünümünde görünen inceleme işareti veya "[YAYIN ÖNCESİ…]" metni | 0 |
| Ziyaretçi görünümünde "A.Ş., Ltd., Şti, MERSİS, vergi numarası" | yok (şirket türü ve kimlik numarası uydurulmadı) |

## 2. İçindekiler

| Genişlik | Davranış | Sonuç |
|---|---|---|
| 1366 / 1440 / 1920 | Sol sütunda yapışkan (sticky) liste. Testte ilk, ortadaki ve son bölüme tıklandı. | Başlık Header'ın altında, ekranın üst %60'ında kaldı. Odak başlığa taşındı. Listedeki işaret (`aria-current`) doğru bölüme geçti. |
| 360 – 1024 | Açılır "İçindekiler" listesi. Aynı üç bölüme tıklandı. | Liste kapandı. Başlık Header'ın altında göründü. Odak başlığa taşındı. |
| Bağlantıyla açılış (`#cerez-yonetim`, 390 px, hareket azaltma açık) | Sayfa ilgili bölüme açıldı. | Başlık Header'ın altında kaldı. |

## 3. Senaryolar

| Senaryo | Sonuç |
|---|---|
| Başvuru formu (390 ve 1440) | Alanlar doldurulup seçimler yapıldı. Enter tuşu formu göndermedi. "Yazdır" tıklandığında yazdırma fonksiyonu 1 kez çağrıldı. Yazdırılacak form; değerleri, 3 işaretli kutuyu ve boş T.C. kimlik no / imza alanlarını içeriyordu. Girilen `<script>` metni kod olarak değil, düz metin olarak basıldı. |
| Baskı çıktısı (Chromium PDF, A4) | Yalnızca form basıldı; ekranda görünen başka öğe yoktu. A4, 2 sayfa. Görüntüler: `screenshots/print-…`. |
| Baskı sonrası temizlik ve "Formu temizle" | Baskı hazırlığı kaldırıldı. Temizle tüm alanları sıfırladı ve odağı ilk alana taşıdı. |
| Tarayıcı depolama | localStorage 0, sessionStorage 0, çerez yok. Form hiçbir şey kaydetmiyor. |
| Genel sayfa baskısı (KVKK, A4) | Header, Footer, içindekiler, yüzen düğmeler ve sayfa sonu gizlendi. Beyaz zemin, siyah metin. 5 sayfa. |
| Çerez tercih düğmesi, CMP bağlı değilken | Düğme yok; açıklayıcı metin var. |
| Çerez tercih düğmesi, sahte CMP fonksiyonu bağlıyken | Düğme göründü ve fonksiyonu 1 kez çağırdı. Fonksiyon kaldırılınca anlaşılır bir hata mesajı gösterildi. |
| Öznitelikleri sonradan değiştirme | `cookie-settings` ve `updated` sonradan verildi; düğme ve tarih güncellendi. Öznitelik kaldırılınca düğme kalktı. |
| Ardışık üç farklı etiket ile değiştirme | Her seferinde Header 1, Footer 1, yüzen düğme 1, stil etiketi 1 kaldı. Son öğe kaldırılınca stil etiketi ve Header da kaldırıldı. |
| Dosyanın ikinci kez yüklenmesi | Hata yok; beş etiket de tanımlı. |
| İnceleme modu ve tarih | Panel ve 20 işaret görünür oldu. Tarih "1 Aralık 2026" olarak gösterildi. Geçersiz tarih (2026-02-31) gösterilmedi. |
| Hareket azaltma | Başlık animasyonu yok; içerik tam görünür. |
| CSS kapsamı | Kapsam dışı kural: 0. Tüm kurallar `[data-n1lg]`, baskı modu veya Header panel işaretiyle sınırlı. |

## 4. Görsel kontrol (ekran görüntüleri)

Ekran görüntüleri 390, 820 ve 1440 px'te alındı ve tek tek incelendi. Bulunan ve düzeltilen sorunlar:

- Form alt başlıkları (`legend`) çerçeve çizgisinin üzerine biniyordu ve ilk başlık açıklamaya yapışıktı. Düzen değiştirildi.
- H1'in iki satırı ekran okuyucuya bitişik okunabiliyordu ("GİZLİLİKPOLİTİKASI"). Satırlar arasına boşluk eklendi.
- Masaüstünde okunan bölüm geç işaretleniyordu. İşaret çizgisi, Header'daki mantığa uygun olarak ekranın üst üçte birine alındı.
- Yazdırılan formda son hakkın sonunda nokta kalıyordu. Kaldırıldı.

Bilinen görünüm notu: Onaylı Header masaüstünde şeffaftır; sayfa kaydırılınca yalnızca kendi geçişli koyu zeminini gösterir. Bu nedenle en üstteki metin satırı, Header yazısının altından geçerken soluklaşır. Bu Header'ın kendi tasarımıdır; değiştirilmedi.

## 5. Doğrulanamayanlar

- Wix Studio Custom Element içinde çalışma, Wix dış kutusunun yüksekliği, Wix önizlemesi ve canlı yayın.
- Wix sayfa ayarlarında `sticky` içindekilerin davranışı. Wix bir ata öğede `overflow` kullanıyorsa yapışkanlık çalışmayabilir; liste yine kullanılabilir kalır.
- Gerçek bir CMP ile bağlantı.
- Gerçek yazıcıda ve iOS Safari'de baskı. Tarayıcıların yazdırma penceresi davranışı farklıdır.
- Ekran okuyucu ile okuma ve kontrast ölçüm aracı. Renk değerleri yüksek kontrastlı seçildi ama ayrıca ölçülmedi.
- Hukuki içerik: LEGAL_PUBLISH_GATE.md'deki kritik maddeler açık. **Sayfalar yayına hazır değildir.**