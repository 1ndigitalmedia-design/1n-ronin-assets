# STRESS_TEST_V132 — Güvenilir mobil stres testi (fiziksel iPhone / iPad Safari)

V1.3.1 testi (`?n1t=stress`) test sisteminin kendi hataları nedeniyle karşılaştırma için geçersizdir (STRESS_V132_REPORT.md §2–3). Bu sürüm onun yerine geçer.
**Tanı aracıdır, düzeltme değildir.** Canlı V1.3 sürümüne dokunmaz.

## 1. Wix kurulumu (sizin tarafınızdan, tek değişiklik)
1. Depo kökünde: `bash wix-global-stability-v13/wix-custom-code/verify-cdn-v13.sh` → `TAMAM`.
2. Wix Studio → Ayarlar → Özel Kod → **"1N - V1.3 Test Anahtarı (HEAD)"** → Düzenle → içeriğin **tamamını** `wix-global-stability-v13/wix-custom-code/TEST-SWITCH-v13.2-head.html` ile değiştir.
3. Ayarlar aynı: **Tüm sayfalar · Head · Her yeni sayfada yükle · Head listesinde en üstte**. Yayınla.
v13.2, v13 / v13.1 ile geriye uyumludur. Geri dönüş: içeriği önceki dosyayla değiştir (`TEST-SWITCH-v13.1-head.html` ya da `TEST-SWITCH-v13-head.html`).
Normal ziyaretçi: yalnız URL + 1 sessionStorage + 2 localStorage okuması; dosya/zamanlayıcı yok.

## 2. Cihaz hazırlığı (her test öncesi aynı)
- **Düşük Güç Modu KAPALI** (Ayarlar → Pil). Açıkken iOS otomatik video oynatmayı engeller; V1.3.1'de bütün ölçümlerde Ronin "blocked" idi.
- Otomatik Kilit: **Hiçbir Zaman**; şarja takılı; Wi-Fi (testler boyunca aynı ağ).
- Safari'de **yalnız bir sekme** açık (diğer sekmeleri kapatın). Safari'yi yeniden başlatın (uygulama değiştiriciden kaydırıp açın) → eşit başlangıç.

## 3. Test
```
https://www.reklam1n.com/?n1t=stress2
```
1. Sayfa açılınca **10 sn bekleyin, dokunmayın** → **1 · Video kontrolü**. 12 sn içinde Ronin'in kendiliğinden oynayıp oynamadığı ölçülür (currentTime ilerlemesi, çözünürlük, readyState).
   - "OTOMATİK OYNATMA ÇALIŞIYOR · ronin-m5-film-2x.mp4 1120x1504 …" → devam.
   - "DOĞRULANMADI" → Düşük Güç Modu'nu kapatıp sayfayı yenileyin, tekrar ölçün. Ayrım için **Dokunarak dene** (bir gerçek dokunuş): dokunuşla oynuyorsa sorun otomatik oynatma engelidir. Doğrulanmadan başlatılırsa rapor "VİDEO GEÇERSİZ" yazar.
2. Varsayılan odaklı plan (değiştirmeyin): **B, D, Ronin 2× (zorunlu), Ronin poster × Reklam Yönetimi, Kreatif Prodüksiyon × normal, erken geri 1 sn × 3 tekrar = 48 adım**, yaklaşık **35–45 dk**.
3. **2 · Başlat**. Sonrası otomatik. Ekrana dokunmayın.
4. Bitince **Rapor → Paylaş / Kopyala / İndir (.md, .csv)** → bize iletin. Kapatmak: **Test modunu kapat** ya da `?n1t=0`.

## 4. Test ne yapar (her plan adımı = bir deneme, gerekirse ek deneme)
1. Varyant bayraklarıyla **taze ana sayfa** açılır (`location.replace` — geçmiş büyümez, her deneme aynı başlangıç).
2. Ana sayfa hazır → 2 sn → video örneği (iki örnek, 1 sn arayla: oynuyor mu, kaynak, çözünürlük).
3. Hizmetler bağlantısına kademeli kaydırma → **gerçek bağlantıya tıklama**.
4. **Normal:** hizmet sayfası hazır → video örneği → 200 px / 300 ms ile sona kadar → video örneği → **tarayıcı geri**.
   **Erken geri 1 sn:** sayfa yüklenirken (Head kodundan, yalnız taze yüklemede) **tarayıcı geri**; gerçek tetiklenme anı ve belge durumu kaydedilir.
5. Ana sayfaya dönüş türü (BFCache / back_forward / reload) → **8 sn Wix ATS penceresi** → ana sayfa yeniden hazır + video örneği → deneme tamam.
Sıra: tekrar → sayfa → senaryo → **varyant (her blokta sıra döndürülür)** → varyantlar zamana yayılır, her varyant aynı sayıda dener.

## 5. Sınıflandırma
| Sınıf | Ne zaman | Çökme mi? |
|---|---|---|
| tamam | beklenen geçişler gerçekleşti | — |
| **ÇÖKME ADAYI** | test hiçbir gezinme beklemiyorken sayfa **yeniden yüklendi** (`reload`) — hizmet sayfası etkinken / yüklenirken / geri dönerken, ana sayfa etkinken | Safari çökme sonrası yeniden yüklemesi **ya da** elle yeniden yükleme — **ayırt edilemez** |
| belirsiz yeniden yükleme | geçiş sırasında ya da ATS penceresi dışında ana sayfa reload | belirsiz |
| Wix ATS yeniden yüklemesi | geri dönüşten sonraki 8 sn içinde ana sayfa reload | hayır (ayrı sayılır) |
| beklenmeyen gezinme | test beklemiyorken başka bir sayfa / navigate / back_forward | hayır (test sistemi) → ek deneme |
| yanlış geçmiş girdisi | "geri" ana sayfa yerine başka sayfaya gitti | hayır → kontrollü ana sayfa (replace), **başarılı geri sayılmaz**, ek deneme |
| test zaman aşımı | bağlantı bulunamadı / gezinme 25 sn içinde olmadı / geri 15 sn içinde olmadı | hayır → ek deneme |
BFCache dönüşü hiçbir zaman tek başına çökme sayılmaz. Çökme adayı ve belirsiz sınıflarında ek deneme yapılmaz (ölçümün kendisi), sonraki adıma geçilir.

## 6. Güvenilirlik önlemleri (V1.3.1 kök nedenlerine karşı)
- **runId / stepId / attemptId / docId / tabId.** Sonuçlar attemptId anahtarıyla yazılır: aynı deneme iki kez kaydedilemez. Plan adımı sayısı seçilen plan kadardır; ek denemeler ayrı sayılır.
- **Karşılaştır-ve-yaz (rev):** bir belge yalnız bildiği sürüm depodakiyle aynıysa durumu değiştirebilir → BFCache'ten dönen eski belgeler durumu geri alamaz; ilerleme monoton.
- **Kuşak koruması:** `pagehide` ve `pageshow` her belgenin bütün eski zamanlayıcılarını ve geri çağrılarını geçersiz kılar.
- **Sekme kirası:** yalnız bir sekme denetler; ikinci sekme pasif kalır ("Bu sekmeye al" ile devralınabilir); etkin sekme kapanırsa 15 sn sonra yeni sekme kendiliğinden devralır.
- **Geçmiş büyümez:** her deneme ve her kurtarma `location.replace`.
- **Çökme sonrası devam:** durum localStorage'da; iOS sekmeyi yeniden yüklerse test kaldığı adımdan sürer. "Bir sorun tekrar tekrar oluştu" sayfasında **Yeniden Yükle**'ye dokunun ya da bağlantıyı açın.

## 7. iOS Safari sınırları
Bellek ve GPU ölçülemez. Çökme yalnız "beklenmeyen yeniden yükleme" olarak çıkarılır; elle yeniden yüklemeden ayırt edilemez (testi çalışırken yenilemeyin). Dokunuşla verilen oynatma izni sonraki belgelere taşınmaz; test her yüklemede otomatik oynatmayı ayrı ölçer. Ekran kilidi / arka plan testi duraklatır (rapora "ara" yazılır). Erken geri, yeni sayfanın Head kodu çalışmadan tetiklenemez.
