# Kurulum — n1-site-wix-v1 (tam ana sayfa · Wix Studio Custom Element)

> **Durum:** Yerel Wix benzetiminde test edildi; Wix Studio'da **henüz doğrulanmadı**. Bu paketten hiçbir şey GitHub'a, jsDelivr'e veya Wix'e yüklenmedi. Aşağıdaki adımlar yalnızca onay verildiğinde uygulanır. `n1-site-test` (Aşama 03) bu paketten bağımsızdır ve değiştirilmedi.

## 1. Barındırma (onay sonrası)
Kod ve aktarım görselleri HTTPS ve CORS açık bir yerde olmalı. Önerilen yer, Aşama 03'te kullanılan GitHub/jsDelivr deposunda **yeni bir klasör veya etiket**. `main` ve `wix-test-v647` dallarına dokunulmaz.

| Yüklenecek | Klasör yapısı korunur | Wix özniteliği |
|---|---|---|
| `n1-site-wix-v1.js`, `modules/`, `site/` | aynı kök klasörde, alt klasörler aynen | `code-base` (verilmezse giriş dosyasının adresinden bulunur) |
| `aktarim-medya/` içeriği (`img/…`, `media/…`, 11 dosya) | `img/eco`, `img/partners`, `media` aynen | `assets-base` |
| Ronin kareleri | **yeniden yüklenmez**; Aşama 03'te kullanılan klasör | `ronin-base` |

**jsDelivr notu:** dal adresi yerine **commit veya etiket** adresi kullanın; aksi halde eski önbellek sunulabilir.

## 2. Wix Studio Test Site (ziyaretçi oranı %0)
1. Test Site'ta yeni bir sayfa açın:
   - **sayfa zemini #080A09**;
   - **Wix'in kendi header'ı boş veya gizli** (bizim Header body'de oluşturulur);
   - Wix kaydırma efektleri ve giriş animasyonları **kapalı**;
   - SEO: dizine eklenmesin.
2. Tam genişlikte tek bölüme **Custom Element** ekleyin:
   - genişlik %100, kenar boşluğu 0;
   - **yükseklik: otomatik** (Aşama 03'teki gibi);
   - orantılı ölçek kapalı.
3. Custom Element ayarları:
   - **Kaynak:** `n1-site-wix-v1.js` dosyasının HTTPS adresi
   - **Tag name:** `n1-site-v1`
   - **Öznitelikler:**
     - `assets-base` = aktarım görselleri klasörü (sonu `/`)
     - `ronin-base` = Aşama 03 Ronin klasörü (sonu `/`)
     - `debug` (test için açık)
     - **`sticky-fix` EKLEMEYİN** (varsayılan kapalı)
4. Bölümün altına küçük bir Wix bölümü koyun (sayfa sonu boşluğu kontrolü).

## 3. İlk kontrol (Test Site URL'si; 1366 / 1440 / 1920)
- **Tanılama paneli** (sol alt):
  - bileşen = kapsayıcı = bölümler toplamı;
  - "sticky'yi bozabilecek üst öğe: yok";
  - header 1, yüzen 1;
  - pin satırı Ecosystem için görünür.
- **Beklenen bileşen yüksekliği** (yerel ölçüm, v6.47 ile aynı): 1366 × 768 → 11.473 px · 1440 × 900 → 12.752 px · 1920 × 1080 → 15.517 px. Wix'te pencere yüksekliği farklıysa Ronin'in 3 ekranlık bölümü buna göre değişir.
- **Konsol:** hata yok; `[n1-site-v1]` uyarısı yok.
- `RAPOR.md` bölüm 7'deki kontrol listesini uygulayın.

## 4. Paket bütünlüğü
`sha256sum -c SHA256SUMS.txt`
