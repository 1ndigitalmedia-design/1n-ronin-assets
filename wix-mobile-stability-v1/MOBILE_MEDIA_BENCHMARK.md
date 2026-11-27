# MOBILE_MEDIA_BENCHMARK — Ronin mobil filmi 1× / 1,5× / 2×

**Üretim yapılandırması değiştirilmedi.** Ana sayfa canlıda iPhone'da 2× filmi kullanmaya devam ediyor. Bu belge ölçüm ve seçenekleri sunar; karar sizindir.

Ölçüm ortamı: Playwright WebKit 26.6 (Linux/WPE, yazılım çözücü) ve Chromium 158, yerel sunucu (Range destekli, `with_server.py` ile yönetildi), 390×844 görünüm, DPR 3, film CSS boyutu 367×475 px (canlı hero ile aynı), sessiz/inline/döngü. Her ölçüm 3 tekrar, her tekrar yeni tarayıcı. Betikler: `qa/media-bench/`, sonuçlar: `qa/results/mediabench.json`, `qa/results/ffprobe-film-*.json`.

## 1. Dosya özellikleri (ffprobe)

| | 1× (`ronin-m5-film.mp4`) | 1,5× (yalnız test kodlaması) | 2× (`ronin-m5-film-2x.mp4`) |
|---|---|---|---|
| Çözünürlük | 560×752 (0,42 Mpx) | 840×1128 (0,95 Mpx) | 1120×1504 (1,68 Mpx) |
| Codec / profil / seviye | H.264 High @3.1 | H.264 High @4.0 | H.264 High @4.2 |
| Kare hızı / kare sayısı | 24 fps / 433 | 24 fps / 433 | 24 fps / 433 |
| Süre | 18,04 sn | 18,04 sn | 18,04 sn |
| Video bitrate | 1,83 Mbps | 2,26 Mbps | 2,80 Mbps |
| Dosya boyutu | 4,13 MB | 5,11 MB | 6,32 MB |
| B-kare / ses | 2 / yok | 2 / yok | 2 / yok |

1,5× dosyası 2× kaynaktan Lanczos ölçekleme + libx264 (preset slow, 2,3 Mbps hedef) ile **yalnızca bellek/boyut ölçümü için** üretildi. Görsel kalitesi orijinal ana kaynaktan üretilecek bir kodlama ile aynı değildir ve depoya eklenmedi.

## 2. Çözülmüş kare belleği (teorik)

NV12 kare = genişlik × yükseklik × 1,5 bayt. H.264 seviye sınırına göre en fazla DPB karesi + ~6 çıktı yüzeyi + 1 RGBA kompozit doku varsayımı:

| | NV12/kare | Seviye DPB sınırı | DPB + 6 yüzey | RGBA doku | Tahmini toplam |
|---|---|---|---|---|---|
| 1× | 0,60 MiB | 10 kare (L3.1) | ≈ 9,6 MiB | 1,6 MiB | ≈ 11 MiB |
| 1,5× | 1,36 MiB | 8 kare (L4.0) | ≈ 19,0 MiB | 3,6 MiB | ≈ 23 MiB |
| 2× | 2,41 MiB | 5 kare (L4.2) | ≈ 26,5 MiB | 6,4 MiB | ≈ 33 MiB |

Gerçek çözücüler (iOS VideoToolbox dahil) havuz boyutunu kendi belirler. Bu tablo yalnızca büyüklük sırasını gösterir.

## 3. Ölçülen süreç belleği (poster gösteren aynı sayfaya göre artış, 12 sn oynatma)

| | WebKit tarayıcı süreçleri Δ | WebKit en büyük süreç | Chromium Δ | Chromium en büyük süreç |
|---|---|---|---|---|
| Poster (video yok) | 0 (515 MB toplam) | 328 MB | 0 (422 MB) | 103 MB |
| 1× | **+71 MB** (71/71/71) | 396 MB | +44 MB (44/44/46) | 143 MB |
| 1,5× | **+99 MB** (97/99/103) | 425 MB | +68 MB (69/67/68) | 162 MB |
| 2× | **+129 MB** (130/129/129) | 454 MB | +95 MB (95/95/97) | 183 MB |

- WebKit'te 2× film, 1×'e göre **+58 MB**, 1,5×'e göre **+30 MB** fazla süreç belleği kullanıyor (tek film, tek sayfa).
- Chromium'da 24 fps korundu (1×: 24, 1,5×: 24, 2×: 24,1). WebKit/WPE'de `getVideoPlaybackQuality()` kare sayıları tutarsız (6,7 / 9,9 / 12,8 "fps"); bu ortamda **FPS ölçülemedi**. 4× CPU yavaşlatmalı kare düşürme ölçümü bu turda değer üretmedi; **ölçülmedi** kabul edilmeli.
- Bu değerler yazılım çözücüyle ölçüldü. iPhone'da donanım çözücü belleği süreç RSS'inde farklı görünebilir; mutlak değerler değil, oranlar anlamlıdır.

## 4. Kaynak seçim sorunu (Safari ve `navigator.deviceMemory`)

`wix-home-v656/modules/n1-m5-build.js:34`:
`if (!c.saveData && !(mem && mem <= 2) && filmCss * dpr > 840) heroSrc = 2× | 1×`
- `navigator.deviceMemory` Safari'de **yok** → bellek koşulu iPhone'da hiç devreye girmiyor.
- iPhone'da `filmCss ≈ 367 × DPR 3 ≈ 1101 > 840` → **her iPhone 2× alıyor** (eski/az bellekli modeller dahil).
- Gerekli görüntü genişliği ≈1101 px: 1× (560 px) ≈2× büyütülür (belirgin yumuşama), 1,5× (840 px) ≈1,3× büyütülür, 2× (1120 px) yerel çözünürlüğe yakın.

`navigator.mediaCapabilities.decodingInfo()` sonuçları (iki motor, üç profil): `{supported:true, smooth:true, powerEfficient:false}`. Yazılım çözücü olduğu için burada ayırt edici değil. iPhone'da H.264 donanımla çözüldüğünden üçü de büyük olasılıkla `powerEfficient:true` döner. Yani bu API tek başına iPhone'da 1× ile 2×'i **ayırt etmeyebilir** (gerçek cihazda doğrulanmadı).

## 5. Alternatifler (hiçbiri üretime uygulanmadı)

| Seçenek | Bellek (WebKit, ölçülen) | Görsel kalite | Risk / not |
|---|---|---|---|
| **A. Mevcut 2× + V1.1 medya bırakma** (önerilen ilk adım) | 2× oynarken +129 MB; sayfadan ayrılınca (pagehide) bırakılıyor; uzak-bırakma ölçülebilir fayda göstermediği için varsayılan kapalı | Değişmez | Kalite korunur. Etki, fiziksel cihaz testiyle doğrulanmalı |
| B. `mediaCapabilities` kapısı (`proposals/ronin-source-select-proposal.js`) | Cihaza bağlı | Yetenekli cihazda değişmez | iPhone'da ayırt edici olmayabilir (§4); önce gerçek cihazda `decodingInfo` sonucu okunmalı |
| C. Mobilde tek 1,5× varlık (ana kaynaktan yeni kodlama) | +99 MB (2×'e göre −30 MB, −%23) | Hafif düşüş (≈1,3× büyütme) | Tasarım onayı + yeni varlık üretimi gerekir |
| D. 1× zorlama | +71 MB (−58 MB, −%45) | Belirgin düşüş (≈2× büyütme) | Ronin kalitesini düşürür, önerilmez |
| E. Oturum bütçesi: aynı sekmede çok sayıda geri dönüşten sonra 1× | Uzun oturumda azalır | Oturum içinde tutarsız | Kullanıcı deneyimi tutarsızlığı; varsayılan kapalı tasarlandı |
| F. Düşük Güç Modu sinyali: otomatik oynatma reddedilirse (NotAllowedError) poster + 1× | Düşük güçte azalır | Yalnız o durumda düşük | iOS'ta güvenilir tek sinyal olabilir; gerçek cihazda test edilmeli |

**Öneri:** Önce A (V1.1) fiziksel cihazda test edilmeli. Çökme sürerse, ikinci adım olarak tasarım onayıyla C (ana kaynaktan 1,5× kodlama) değerlendirilmeli. B ve F, gerçek iPhone'da `decodingInfo` ve otomatik oynatma reddi davranışı okunduktan sonra karar verilecek ek sinyallerdir.

## 6. Gerçek cihazda okunacak değerler (test sırasında Safari konsolunda)
```js
navigator.mediaCapabilities.decodingInfo({type:'file',video:{contentType:'video/mp4; codecs="avc1.64002A"',width:1120,height:1504,bitrate:2800000,framerate:24}}).then(r=>console.log(JSON.stringify(r)))
document.querySelector('[data-m4-film] video').currentSrc   // hangi dosya seçildi
```
