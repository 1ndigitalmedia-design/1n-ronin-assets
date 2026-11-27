# PHYSICAL_DEVICE_ACCEPTANCE — V1.4 fiziksel cihaz kabulü

**Durum: BEKLEMEDE.** Bu çalışmada fiziksel iPhone, iPad ya da Android cihaz yoktu. Aşağıdaki sonuçlar yalnız **Playwright benzetimidir; iPhone sonucu değildir.** Hiçbir mobil çökme sorunu "çözüldü" olarak raporlanmaz.

## 1. Tek bağlantı (V1.4 yayınlandıktan sonra)
```
https://www.reklam1n.com/?n1t=kabul14
```
**Ön koşullar:**
- DEPLOYMENT §1'deki 8 Server URL yayınlanmış olmalı.
- "1N - V1.3 Test Anahtarı (HEAD)" girişi v14 içeriğiyle güncellenmiş olmalı (DEPLOYMENT §3).

Bağlantı yalnız açıldığı sekmede test modunu açar; normal ziyaretçiler etkilenmez.

**Cihazda hazırlık:**
- Otomatik Kilit = Hiçbir Zaman.
- Düşük Güç Modu kapalı.
- Şarjda.
- Tek Safari sekmesi.

## 2. Ne yapar (tam otomatik)
1. **Ana sayfa:** kahraman videosu oluşunca otomatik oynatma ön kontrolü (12 sn'ye kadar).
   - Oynatma doğrulanırsa test 2 sn içinde başlar.
   - Doğrulanmazsa 20 sn bekler; bu sürede "Dokunarak dene" ile Düşük Güç Modu ayrımı yapılabilir. Sonra test başlar ve video sonucu geçersiz işaretlenir.
2. **Plan:** 7 hizmet sayfası × {normal: sona kadar kademeli kaydır + geri, erken geri 1 sn} = **14 adım**. Her adım taze bir ana sayfa ile başlar ve Hizmetler bağlantısına gerçek bir tıklama yapılır.
   - Denetleyici V1.3.2 ile aynıdır: tek sekme kirası, monoton durum (rev), kuşak koruması, gezinme türüne göre sınıflandırma, `location.replace` ile geçmiş büyümeden kurtarma.
3. **Her hizmet sayfasında V1.4 denetimi:**
   - Hafif profil mi?
   - V1.4 kodu yüklendi mi?
   - Kaynaklı video sayısı ≤ beklenen (UI/UX 0, diğerleri 1)?
   - Kaç mp4 isteği yapıldı?
   - WebP kareler yüklendi mi, kırık var mı?
4. **Ana sayfada:**
   - Video modülü v14 yüklü mü?
   - "Hikâyemizin Devamı" → `/kisaca-biz` mi?
5. **Rapor:** gerçek süre, sınıflar (çökme adayı / belirsiz / Wix ATS / test kaynaklı), V1.4 yapılandırma tablosu, CSV. "Kopyala", "Paylaş", "İndir (.md / .csv)" düğmeleri var.

Test bitince sekmede `?n1t=0` açılmalı (test modunu kapatır, sonuçları silmez).

## 3. Kabul ölçütleri (cihaz başına)
| Ölçüt | Beklenen |
|---|---|
| Çökme adayı (beklenmeyen yeniden yükleme) | 0 |
| V1.4 yapılandırma tablosu | 7/7 GEÇTİ (hafif profil, V1.4 kodu, video ≤ beklenen, kare kırığı 0) |
| Ana sayfa | video modülü v14 yüklü, bağlantı `/kisaca-biz` |
| Video ön kontrolü | OTOMATİK OYNATMA ÇALIŞIYOR (değilse video sonucu geçersiz; Düşük Güç Modu kontrol edilir) |
| Gerçek süre | raporda (beklenen ~8–12 dk) |
| Göz kontrolü | kareler keskin, boş kutu yok, masaüstü değişmemiş |

## 4. Cihaz listesi (doldurulacak)
| Cihaz | iOS / Android | Tarayıcı | Tarih | Gerçek süre | Çökme adayı | V1.4 tablosu | Sonuç |
|---|---|---|---|---|---|---|---|
| iPhone (asıl çökme bildirilen cihaz) | | Safari | | | | | BEKLEMEDE |
| iPad (yatay + dikey) | | Safari | | | | | BEKLEMEDE |
| Android telefon | | Chrome | | | | | BEKLEMEDE |

## 5. Benzetim sonucu (Playwright WebKit, iPhone DEĞİL) — `qa/accept/accept14-sim-webkit.md`
- **Akış:** canlı HTML'deki test anahtarı v14 ile değiştirildi, 8 Server URL V1.4'e yönlendirildi (= V1.4 üretim yapılandırması). Tek bağlantı açıldı, **hiçbir dokunuş yapılmadı.**
- **Başlama:** açılıştan 9 sn sonra kendiliğinden. Video ön kontrolü: OTOMATİK OYNATMA ÇALIŞIYOR · `ronin-m5-film-2x.mp4` 1120×1504.
- **Plan:** 14/14 geçerli 1. deneme.
  - Çökme adayı 0, belirsiz 0, test kaynaklı sorun 0, ek deneme 0.
  - Wix ATS yeniden yüklemesi 11 (geri sonrası; çökme sayılmaz).
  - Video 14/14, 1N JS hatası 0.
- **V1.4 yapılandırma tablosu: 7/7 GEÇTİ.**
  - Hafif profil evet, V1.4 kodu evet.
  - Kaynaklı video = 1 (UI/UX 0), benzersiz mp4 = 1 (UI/UX 0).
  - Kare kırığı 0.
- **Ana sayfa:** video modülü v14 yüklü, "Hikâyemizin Devamı" → `/kisaca-biz`, 14/14.
- **Gerçek süre: 9,1 dk** (bağlantıdan rapora 9,2 dk). Fiziksel cihazda ağ ve sayfa hazırlığı daha yavaş olabilir; beklenen 9–12 dk.

İlk benzetim (`accept14-sim-webkit-run1.md`) betiğin iki ölçüm hatasını ortaya çıkardı; ikisi de düzeltildi (TEST_REPORT §7).
