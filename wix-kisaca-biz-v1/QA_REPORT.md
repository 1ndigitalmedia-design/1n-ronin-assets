# QA Raporu — Kısaca Biz V1 (`n1-kisaca-biz-v1`)

**Test ortamı:** Google Chrome (Playwright, başsız), `preview.html`.

**Önemli:**
- **Wix Studio'da test edilmedi.**
- **Safari / iOS / Firefox'ta test edilmedi.**

**Ağ:** jsDelivr bu test ortamından erişilemediği için ortak dosyalar aynı commit'lerden (`d24fa37`, `09612df`) GitHub'dan indirilip tarayıcıya aynı jsDelivr adresleriyle verildi. Dosya içerikleri yayındakilerle aynıdır.

`static.wixstatic.com` erişilemediği için tablet/mobil partner görseli yüklenemedi. Testlerde bu durumdaki yedek davranış (orijinal 5 logo) doğrulandı; görselin kendisi görülmedi.

## 1. Kullanılan beceriler ve araçlar

| | Kullanım |
|---|---|
| frontend-design (skill) | Tasarım yönü, tipografi ve düzen kararları |
| gsap (skill) | GSAP context / matchMedia / ScrollTrigger yaşam döngüsü |
| webapp-testing (skill) + Playwright | Bütün tarayıcı testleri ve ekran görüntüleri |
| GitHub erişimi | Onaylı v6.48 Header, işaretleme, Footer ve Stüdyo iç sayfa CSS'inin okunması |

Kullanılmayanlar: SplitText, GSAP Vault ürünleri, harici görsel/video.

## 2. Responsive ve yerleşim testleri

Her genişlikte sayfa sonuna kadar kaydırılıp ölçüldü. Sayfa yüksekliği px cinsindendir. Her genişlikte ayrıca: tek Header, tek Footer, tek WhatsApp, tek H1, pin-spacer 0, Unicode ok 0, konsol hatası 0.

| Genişlik | Sayfa yüksekliği | Yatay taşma | Footer altında boşluk | Başlık satırı çakışması | Görünmez kalan içerik | Header görünür | WhatsApp görünür |
|---|---|---|---|---|---|---|---|
| 360 | 6.522 | yok | 0 | yok | yok* | evet | evet |
| 375 | 6.403 | yok | 0 | yok | yok* | evet | evet |
| 390 | 6.463 | yok | 0 | yok | yok* | evet | evet |
| 430 | 6.572 | yok | 1 px (yuvarlama) | yok | yok* | evet | evet |
| 768 | 6.203 | yok | 0 | yok | yok | evet | evet |
| 820 | 6.264 | yok | 0 | yok | yok | evet | evet |
| 1024 | 6.324 | yok | 0 | yok | yok | evet | evet |
| 1366 | 5.974 | yok | 0 | yok | yok | evet | evet |
| 1440 | 6.224 | yok | 0 | yok | yok | evet | evet |
| 1920 | 7.755 | yok | 0 | yok | yok | evet | evet |

\* Mobilde hero geometrisi bilerek %34 opaklıktadır (başlığın arkasında dekoratif katman).

**Ölçüm yöntemi:**
- **Başlık satırı çakışması:** aynı başlıktaki ardışık satır kutularının kesişmesi ölçüldü. Ayrıca İ, Ü, Ş, Ç noktalarının üstteki etikete değmediği gözle kontrol edildi (BİZ., FİKİRDEN, GERÇEK ETKİYE., BİRLİKTE ÜRETELİM.).
- **Taşma:** metin, bağlantı ve buton kutularının görünür alanın dışına çıkması ölçüldü.
  - İstisna: "Fikirden / gerçek etkiye." bölümü kaydırmaya bağlı yatay kayma kullanır. Kayma bitince başlık hizalıdır; kapsayıcı `overflow:hidden` olduğu için yatay kaydırma oluşmaz.

## 3. Menü testleri

| Test | Sonuç |
|---|---|
| Menü verisi | Kısaca Biz `/kisaca-biz`, Hizmetler `/#hizmetler-ozet`, Markalar `/markalar`, Akademi `/reklam-ajansi`, İnsan Kaynakları (alt menü) |
| Alt menüler | Yalnızca İnsan Kaynakları: `/ekibimize-katil`, `/acik-pozisyonlar` |
| Logo / marka satırı / Teklif Al | `/`, `/`, `/teklif-al` |
| Masaüstü (1366, 1440, 1920) | MENU açılıyor, İnsan Kaynakları üzerine gelince alt menü görünüyor, Hizmetler'e geçince alt menü kapanıyor |
| Masaüstü klavye | Enter ile açılıyor, odak menüye geçiyor, Escape alt menüyü sonra menüyü kapatıyor |
| Dokunmatik (360–1024) | Dokunarak açılıyor, panel ekran içinde, İnsan Kaynakları'na dokununca alt menü görünüyor; MENU ile ve dışarı dokunarak kapanıyor |

## 4. GSAP ve yaşam döngüsü

| Test | Sonuç |
|---|---|
| GSAP / ScrollTrigger kopya sayısı | 1 / 1; sayfada varsa yeniden yüklenmez |
| Pin / pin-spacer | Yok / 0 |
| İlk açılış | 25 ScrollTrigger (tek seferlik giriş tetikleyicileri tetiklendikçe kendini kaldırır) |
| Bileşen kaldırıldı (Wix sayfa geçişi benzetimi) | ScrollTrigger 0; Header, panel, WhatsApp, Footer, stil ve body sınıfı kaldırıldı |
| Yeniden bağlandı (3 kez) | Her seferinde 25 ScrollTrigger, 1 Header, 1 panel, 1 WhatsApp, 1 Footer; hero animasyonu tamamlanıyor |
| `prefers-reduced-motion: reduce` | Animasyon ve ScrollTrigger yok, bütün içerik görünür |
| GSAP yüklenemezse | Bütün içerik görünür, Header/Footer/WhatsApp çalışır; konsolda yalnızca uyarı |
| Disiplin çarkı | Tıklama, klavye okları ve üzerine gelme seçimi değiştiriyor; ilgili çizgiler yanıyor; "Disiplini incele" bağlantısı güncelleniyor |
| Yukarı Çık | Masaüstünde 5.324 → 0, mobilde 5.619 → 0 (gerçek sayfa kaydırması) |

## 5. Renk, ikon ve kod denetimleri

- **Renk:** Yeni tasarımdaki tek yeşil `#A8CF62`. Giriş dosyasında `#A1FF00` / `#A2FF00` yok.
  - Onaylı Header'ın logo dosyası kendi içinde `#a2ff00` zemin kullanır; Header değiştirilmediği için korunmuştur.
- **İkonlar:** Yön ikonları satır içi SVG (4 adet: iki CTA, "Disiplini incele" ve hero'daki "Keşfet" aşağı oku). Görünür metinde Unicode ok sayısı 0.
- **Kod:**
  - `node --check` ile sözdizimi doğrulandı.
  - Kodda yer tutucu veya tahmini URL yok; bütün ortak dosya adresleri GitHub'dan indirilerek doğrulandı.
  - Kullanıcıya görünen hata ayıklama paneli yok.

## 6. Wix Studio'da kontrol edilmesi gerekenler (test edilmedi)

- [ ] Custom Element yüksekliği Auto iken sayfanın tam boyunca açılıyor, Footer altında boşluk yok
- [ ] Wix Header/Footer'ı bu sayfada gizli; tek Header ve tek WhatsApp var
- [ ] Wix'in kendi kaydırma davranışında (sayfa geçişleri dahil) animasyonlar yeniden çalışıyor
- [ ] Hizmetler bağlantısı ana sayfada `#hizmetler-ozet` bölümüne iniyor
- [ ] Tablet/mobil partner görseli Wix Medya'dan yükleniyor
- [ ] iOS Safari ve Android Chrome'da menü, alt menü ve Yukarı Çık
- [ ] 7 disiplin sayfasının Wix'te yayında olduğu

## 7. Kalan riskler

1. **Wix kapsayıcıları:** Wix Studio'nun bölüm yerleşimi (ör. bölüm yüksekliği sabitse) Auto yüksekliği kısıtlayabilir. Bu durum yalnızca Wix'te test edilerek görülebilir.
2. **Wix sayfa geçişleri:** Sayfa geçişinde Wix'in Custom Element'i kaldırıp yeniden eklediği varsayıldı; yaşam döngüsü bu senaryoda yerelde test edildi.
3. **Partner görselleri:** Wix Medya adresleri değişirse tablet/mobil footer otomatik olarak orijinal 5 logoya döner.
4. **Paylaşılan Header modülü:** Header 900 px altında kendini gizler. Tablet/mobil düzeni, Stüdyo Hikâyesi'nde onaylanan iç sayfa CSS'i ve bu sayfadaki aynı kurallarla sağlanır. Ana sayfa (Ronin) bu dosyadan etkilenmez.