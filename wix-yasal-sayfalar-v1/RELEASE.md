# 1N Digital Media — Yasal Sayfalar V1 / Release Status

**Durum: DRAFT ONLY / YAYINA HAZIR DEĞİL (25 Kasım 2026).**

Claude tarafından oluşturulmuş 5 sayfanın ortak JavaScript dosyası, dokuz metin/dokümantasyon/önizleme dosyası GitHub'a taslak olarak yüklendi. Orijinal ZIP'teki ekran görüntüleri GitHub'a kopyalanmadı; ZIP içindedir.

## Kaynak

- Ortak Server URL: `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f48ea4bd458751f8d456a312da0fb0accadd35c6/wix-yasal-sayfalar-v1/n1-yasal-sayfalar-v1.js`
- Wix Studio'da henüz **uygulanmadı**. Bu URL şu aşamada yalnızca ilerideki teknik entegrasyon içindir, canlı sitede kullanılmamalıdır.
- Site: `https://www.reklam1n.com`

## Beş bağımsız Custom Element

| Sayfa | Slug | Tag Name |
|---|---|---|
| Gizlilik Politikası | `/gizlilik-politikasi` | `n1-gizlilik-politikasi-v1` |
| KVKK Aydınlatma Metni | `/kvkk-aydinlatma-metni` | `n1-kvkk-aydinlatma-v1` |
| Çerez Politikası | `/cerez-politikasi` | `n1-cerez-politikasi-v1` |
| Kullanım Koşulları | `/kullanim-kosullari` | `n1-kullanim-kosullari-v1` |
| Veri Sahibi Başvuru Formu | `/veri-sahibi-basvuru-formu` | `n1-veri-sahibi-basvuru-v1` |

## Kritik yayın kapısı

`LEGAL_PUBLISH_GATE.md` içindeki 31 kontrol maddesinden 14'ü **Kritik**. Doğrulanmamış maddeler:

- `G-01`: veri sorumlusunun hukuki statüsü / kimliği
- `G-02`: iletişim adresi ile eski Footer adresinin uyuşmaması
- `G-04`: başvuru e-posta kanalı ve gelen başvuruların işlenişi
- `D-01`: gerçek iletişim ve teklif formları, saklama yeri
- `D-07`: gerçek hizmet sağlayıcılar
- `D-08`: yurt dışı veri aktarımı ve hukuki dayanak
- `D-09`: saklama süreleri / imha
- `C-01`: gerçek çerez taraması
- `C-02`: çalışan çerez tercih yönetimi
- `C-03`: zorunlu olmayan çerezlerin rıza öncesi bloke edilmesi
- `C-04`: gerçek çerez envanteri
- `C-05`: çerez sağlayıcıları üzerinden yurt dışı aktarımı
- `B-01`: veri sahibi başvuru iş akışı
- `P-02`: yetkin hukuk uzmanı incelemesi

Kaynak JS içinde `VERIFIED = []`, `COOKIES = []` ve `DATES` boş hâlde bırakılmıştır. Uyarılar ziyaretçi modunda gizlense bile bu, hukuki doğrulamanın yapıldığı veya yayımlamanın engellendiği anlamına gelmez; **Wix'te canlıya alınmamalıdır.**

## Teknik doğrulama

- Kullanıcının ZIP paketinden alınan JavaScript, GitHub'a aktarıldı ve GitHub'dan geri okundu: **kaynak eşleşmesi birebir**.
- `node --check`: başarılı.
- Beş Custom Element etiketinin tanımlanması doğrulandı.
- GitHub'da 10 dosya mevcut: JS, preview.html ve 8 ayrı .md.
- ZIP'teki `QA_REPORT.md`, Chromium'da 5 sayfa × 10 genişlik testinin başarıyla yapıldığını bildiriyor. Bu bağımsız olarak yeniden çalıştırılmadı.
- Wix Studio'da özel öğeleri sayfalara yerleştirme, Server URL/Tag Name güncellemesi ve Publish **yapılmadı**; mevcut erişimde editör içeriklerini değiştiren bir işlem bulunamadı.
- Yalnızca GitHub'a yüklemek Wix Studio yayınını değiştirmez.

## Sonraki adımlar

1. `DATA_PROCESSING_CHECKLIST.md` ve `COOKIE_AUDIT_CHECKLIST.md` gerçek işletme kayıtlarına göre doldurulsun.
2. `LEGAL_PUBLISH_GATE.md` içindeki kritik maddeler kapatılsın, gerekli metin düzeltmeleri kodda yapılsın.
3. Yetkin hukuk uzmanı bütün sayfaları inceleyip onaylasın.
4. Wix Studio'da beş sayfa oluşturulsun veya mevcutsa açılsın; aynı Server URL ve tabloda belirtilen ayrı Tag Name değerleri kullanılsın.
5. Wix'te sayfaların SEO ve erişilebilirlik ayarları kontrol edilip ancak bundan sonra Publish yapılsın.

**Not:** GitHub deposuna kaynak kodu eklemek, yukarıdaki yasal durumdan dolayı sayfaların yayımlanmasına onay verildiği anlamına gelmez.
