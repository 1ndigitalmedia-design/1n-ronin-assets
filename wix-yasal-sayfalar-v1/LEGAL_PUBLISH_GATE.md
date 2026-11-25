# LEGAL_PUBLISH_GATE — Yayın kapısı

**Durum: YAYINA HAZIR DEĞİL.**

Beş sayfanın metinleri ve kodu hazır. Ancak aşağıdaki maddeler doğrulanmadan sayfalar yayına alınmamalıdır. Metinler, işletmenin gerçek veri işleme envanteri bilinmeden yazılmış taslaklardır. Yayından önce yetkin bir hukuk uzmanı tarafından incelenmelidir.

## Nasıl kullanılır

- Her maddenin kimliği (örn. `D-01`) koddaki işaretle aynıdır.
- İnceleme modunda (`review` özniteliği veya önizlemede "İnceleme" bağlantısı) işaretler, ilgili cümlenin yanında sarı etiket olarak görünür. Ziyaretçi görünümünde bu etiketler yer almaz.
- Bir madde doğrulanınca:
  1. Gerekiyorsa metni düzeltin. Metinler `n1-yasal-sayfalar-v1.js` içinde `PAGES` bölümündedir.
  2. Maddenin kimliğini dosyadaki `VERIFIED` dizisine ekleyin.
- Doğrulanmamış madde kaldıkça tarayıcı konsolunda bir uyarı yazılır.
- **Kritik** maddelerden biri bile açıksa sayfa yayımlanmaz.

## Kapı tablosu

| Kimlik | Konu | Etkilenen sayfa | Ne yapılmalı | Önem |
|---|---|---|---|---|
| G-01 | Hukuki statü ve veri sorumlusunun kimliği | Tümü | İşletmenin şahıs işletmesi mi, şirket mi olduğunu belirleyin. Şahıs işletmesiyse veri sorumlusu gerçek kişidir (Fatma Elçin Bozkurt). Şirketse tam unvan yazılmalı; MERSİS ve vergi bilgisinin eklenip eklenmeyeceği değerlendirilmeli. Metinde "1N Digital Media - Fatma Elçin Bozkurt" kullanıldı; şirket türü yazılmadı. | Kritik |
| G-02 | Tebligat ve başvuru adresi | Tümü | Brief'teki adres: "Adalet Mah. Manas Bulvarı No: 39 - 3408, Folkart Tower, Bayraklı İzmir". Onaylı Footer'daki adres: "Bayraklı **Bornova** - İzmir 35530". Doğru ilçe ve posta kodunu teyit edin. Gerekirse `BIZ.addr` alanını güncelleyin. Footer'a dokunulmadı. | Kritik |
| G-03 | KEP adresi | Başvuru | KEP adresi varsa `BIZ.kep` alanına yazın; yoksa boş bırakın. E-posta adresi KEP adresi olarak gösterilmedi. | Önemli |
| G-04 | Elektronik başvuru kanalı | Başvuru, KVKK | pro.media@reklam1n.com adresinin KVKK başvurularını alacağını teyit edin. Ayrıca şunları belirleyin: başvuruları kim takip edecek, "daha önce bildirilen ve sistemde kayıtlı e-posta" eşleştirmesi nasıl yapılacak. | Kritik |
| G-05 | VERBİS ve Saklama ve İmha Politikası | Gizlilik, KVKK | Kayıt yükümlülüğünü güncel istisna kriterlerine göre değerlendirin. Kurul'un 2025/1572 ve 2025/2393 sayılı kararlarına göre, ana faaliyet konusu özel nitelikli veri olmayan veri sorumlularında yıllık çalışan sayısı 50'den az ve bilanço esasında yıllık mali bilanço toplamı 100 milyon TL'den az olanlar istisnadır; bilanço esasına göre defter tutmayanlarda yalnızca çalışan sayısına bakılır. Kayıt yükümlülüğü varsa Saklama ve İmha Politikası hazırlanmalıdır. | Önemli |
| D-01 | Form alanları ve verinin kaydedildiği yer | Gizlilik, KVKK | /iletisim ve /teklif-al formlarındaki gerçek alanları listeleyin. Verinin nereye gittiğini belirleyin (Wix Forms, e-posta bildirimi, CRM vb.). Ardından tablo satırlarını gerçek alanlara göre düzeltin. | Kritik |
| D-02 | WhatsApp hattı | Gizlilik, KVKK | Sitedeki WhatsApp bağlantısı +90 551 681 60 26 numarasına gidiyor. Bunu teyit edin: hat kişisel mi, Business mı; mesajlar ne kadar saklanıyor; aktarım dayanağı ne. | Önemli |
| D-03 | Telefon kaydı | KVKK | Görüşmeler kayda alınıyor mu? Alınıyorsa ayrı bir aydınlatma ve süreç gerekir; alınmıyorsa işareti kapatın. | Önemli |
| D-04 | Müşteri ve iş ortağı süreçleri | Gizlilik, KVKK | Sözleşme, faturalama, muhasebe desteği ve proje araçlarını teyit edin. Bu sürecin web sitesi aydınlatmasında mı yoksa ayrı bir müşteri aydınlatmasında mı yer alacağına karar verin. | Önemli |
| D-05 | İş başvuruları | KVKK | Header menüsünde /ekibimize-katil ve /acik-pozisyonlar sayfaları var. Başvuruların nasıl alındığını ve özgeçmişlerin ne kadar saklandığını belirleyin. Çalışan adayları için ayrı bir aydınlatma metni önerilir. | Önemli |
| D-06 | Ticari elektronik ileti | Gizlilik, KVKK | Bülten veya kampanya gönderimi yoksa satırı kaldırın. Varsa şunlar gerekir: 6563 sayılı Kanun ve ilgili Yönetmelik uyarınca onay metni, İYS kaydı ve ret hakkı. Bu onay, hizmetin ön koşulu yapılmamalı. | Önemli |
| D-07 | Hizmet sağlayıcılar | Gizlilik, KVKK | Tam liste çıkarın: Wix, e-posta sağlayıcısı, bulut, CRM, analitik, reklam ve mesajlaşma. Her biri için konum ve sözleşme bilgisini ekleyin. "Bilgilerinizi satmayız" taahhüdünü teyit edin. | Kritik |
| D-08 | Yurt dışı aktarım dayanağı | Gizlilik, KVKK, Çerez | Yurt dışı aktarım yapılan her sağlayıcı için dayanağı belirleyin: yeterlilik kararı, uygun güvence (standart sözleşme imzalanmışsa 5 iş günü içinde Kurula bildirim) veya yalnızca arızi istisna. Düzenli aktarım arızi istisnaya dayandırılamaz. | Kritik |
| D-09 | Saklama süreleri ve imha | Gizlilik, KVKK | Her faaliyet için somut saklama süresini ve imha yöntemini belirleyin. Metin şu anda yalnızca ölçütleri anlatıyor. | Kritik |
| D-10 | Güvenlik tedbirleri | Gizlilik | Metinde sayılan tedbirlerin gerçekten uygulandığını teyit edin: yetki sınırlama, güçlü kimlik doğrulama, sağlayıcılarla gizlilik yükümlülüğü. | Önemli |
| D-11 | Teknik kayıtlar | Gizlilik, KVKK | Wix ve diğer sağlayıcıların hangi erişim kayıtlarını tuttuğunu ve işletmenin bunlara erişip erişmediğini belirleyin. | Orta |
| D-12 | Özel nitelikli veri | Gizlilik, KVKK | Hiçbir süreçte özel nitelikli kişisel verinin istenmediğini teyit edin. | Önemli |
| D-13 | Veri işleyen rolü | Gizlilik | Müşteriler adına yürütülen reklam, sosyal medya ve e-ticaret işlerinde ajansın veri işleyen olduğu durumları belirleyin. Bu işler için veri işleme sözleşmelerini hazırlayın. | Önemli |
| C-01 | Gerçek çerez taraması | Çerez, KVKK, Gizlilik | COOKIE_AUDIT_CHECKLIST.md'ye göre tüm sayfaları rıza öncesinde ve sonrasında tarayın. | Kritik |
| C-02 | Çerez yönetim aracı | Çerez | Aracın şu özellikleri olmalı: eşit "Reddet", önceden seçili olmayan kategoriler, rıza kaydı, tercihleri yeniden açma. Aracı açan fonksiyon `cookie-settings` özniteliğine veya `COOKIE_SETTINGS_FN` alanına bağlanmalı. Bağlanmazsa sayfada düğme görünmez. | Kritik |
| C-03 | Etiketlerin rızadan önce engellenmesi | Çerez, Gizlilik, KVKK | Zorunlu olmayan çerezlerin ve etiketlerin rıza verilmeden çalışmadığını teknik olarak doğrulayın. Metin bunu taahhüt ediyor. | Kritik |
| C-04 | Çerez tablosu | Çerez | Tarama sonucuyla `COOKIES` dizisini doldurun. Boşken sayfada "tarama tamamlandığında yayımlanır" yazar. | Kritik |
| C-05 | Çerez sağlayıcılarıyla yurt dışı aktarım | Çerez | D-08 ile birlikte değerlendirin. | Kritik |
| C-06 | Gömülü içerikler | Çerez | Video, harita veya sosyal medya yerleştirmesi varsa çerez davranışlarını belirleyin. | Orta |
| K-01 | Elektronik Ticaret Kanunu m.3 bilgileri | Kullanım | Sitenin 6563 sayılı Kanun kapsamında tanıtıcı bilgi (unvan, MERSİS, vergi bilgisi vb.) yayımlama yükümlülüğü doğurup doğurmadığını değerlendirin. Site satış yapmıyor. | Önemli |
| K-02 | Marka tescili | Kullanım | Metinde markanın tescilli olduğu söylenmedi. Tescil varsa eklenebilir. | Düşük |
| K-03 | Müşteri işleri ve logoları | Kullanım | Sitede gösterilen müşteri adları, logoları ve işleri için kullanım izinlerini teyit edin. | Önemli |
| B-01 | Başvuru süreci | Başvuru | Şunları belirleyin: sorumlu kişi, başvuru kayıt defteri, 30 günlük süre takibi, kimlik doğrulama yöntemi, cevap şablonu. | Kritik |
| B-02 | Elektronik başvuru entegrasyonu | Başvuru | İlk sürümde internetten gönderim yok; bu bilinçli bir tercih. İleride eklenecekse README'deki "Elektronik başvuru planı" uygulanmalı. | Bilgi |
| P-01 | Yürürlük tarihi | Tümü | Yayın tarihi kesinleşince `DATES` alanını veya `updated` özniteliğini doldurun. | Önemli |
| P-02 | Hukuk incelemesi | Tümü | Beş metnin tamamını yetkin bir hukuk uzmanına inceletin. Ayrıca LEGAL_CONTENT_REVIEW.md'deki "Uzman görüşü gereken noktalar" bölümünü birlikte değerlendirin. | Kritik |

## Teknik yayın koşulları

- [ ] JS dosyası HTTPS bir adrese yüklendi; beş sayfada aynı Server URL, farklı Tag Name kullanıldı (WIX_SETUP.md).
- [ ] Her sayfanın SEO başlığı, açıklaması ve canonical ayarı Wix'te girildi (SEO_METADATA.md).
- [ ] Wix Studio önizlemesinde ve canlı sitede kontrol edildi:
  - [ ] Header, Footer ve WhatsApp tek kez görünüyor.
  - [ ] Sayfa sonunda boşluk yok.
  - [ ] İçindekiler doğru bölüme kaydırıyor.
- [ ] Başvuru formunun baskısı gerçek bir yazıcıda veya PDF'te kontrol edildi.
- [ ] Footer'daki beş yasal bağlantı doğru sayfalara gidiyor.