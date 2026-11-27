# MENU_FIX_REPORT — PROBLEM 01 · Menü sayfa geçişinde tam kapanmıyor

Tarih: 27 Kasım 2026 · Dal `mobile-stability-v1-audit` · Draft PR #2 · **Wix'te değişiklik yapılmadı.**
Düzeltme dosyası: `wix-global-stability-v13/n1-menu-close-v13.js` (commit `bb6ebc7`), Wix özel kod **Body-end** girişi olarak eklenir. Header/markup dosyaları ve Custom Element adresleri **değişmez**.

## 1. Belirti (iPhone, kullanıcı bildirimi)
Menüden bir alt kategoriye (Hizmetler → ör. Kreatif Prodüksiyon) basınca yeni sayfaya geçerken "1N Digital Media — Başlangıca Dön" kartı görünür kalıyor, MENU simgesi açık (×/eksi) durumda görünüyor.

## 2. Yeniden üretme
1. `/sosyal-medya` aç, 6 sn bekle.
2. MENU → "Hizmetler" → "Kreatif Prodüksiyon".
3. Eski sayfada her animasyon karesinde header/panel durumu örneklenir; gezinme başladıktan sonra çizilen **son kare** kaydedilir (`sessionStorage`), yeni sayfada okunur.

Düzenek: `qa` betikleri `p01rec.js` (kayıt + video), `p01vp.js` (4 görünüm). Her ölçüm: `[data-open, panel visibility, Başlangıca Dön kartı opacity, MENU simgesi çizgisi transform, aria-expanded, panel inert]`.

## 3. Kanıt (canlı V1.2)

WebKit, mobil 390×844 (`p01rec.js`, dokunuştan sonraki son kareler):
```
[0 ms,  true,  visible, 1.00, matrix(0.707…) ]   ← menü açık
[38 ms, true,  visible, 1.00, matrix(0.707…) ]
[146 ms,false, visible, 1.00, matrix(0.707…) ]   ← SON ÇİZİLEN KARE: durum "kapalı", ama kart tam görünür, simge × (45°)
```
Yani `close()` çağrıldı (`data-open` kalktı), fakat görünüm CSS geçişleriyle kapanacağı için tarayıcı belgeden ayrılırken **geçiş başlamadan önceki** kareyi tutuyor. iOS Safari yeni sayfa çizilene kadar bu kareyi gösterir; Wix'in sayfa geçişi (View Transition) ve BFCache de aynı kareyi kullanabilir.

4 görünüm × 2 motor (`p01vp.js`, eski sayfanın son karesi):

| Görünüm | WebKit canlı | Chromium canlı | WebKit düzeltme | Chromium düzeltme |
|---|---|---|---|---|
| Masaüstü 1440×900 (tıklama) | **kalıntı**: panel visible, kart .24, simge dönüyor | **kalıntı**: panel visible, simge dönüyor | kapalı | kapalı |
| Tablet 834×1194 (dokunma) | **kalıntı**: kart 1.00, simge × | **kalıntı**: kart .23 | kapalı | kapalı |
| Tablet yatay 1194×834 | **kalıntı**: kart 1.00, simge × | **kalıntı**: kart .10 | kapalı | kapalı |
| Mobil 390×844 | **kalıntı**: data-open hâlâ true, kart 1.00, × | **kalıntı**: kart .06 | kapalı | kapalı |
| Yeni sayfada menü | kapalı | kapalı | kapalı | kapalı |
| Geri dönüşte eski sayfa menüsü | kapalı | kapalı | kapalı | kapalı |
| **Toplam (12 kontrol)** | **8/12** | **8/12** | **12/12** | **12/12** |

"Kapalı" = `data-open` yok, panel `hidden`, kart opacity `0.00`, simge `none`, `aria-expanded` ≠ true, panel `inert`.

## 4. Kök neden (dosya / satır)
`wix-global-menu-v12/modules/n1-header-v12.js`
- `:57` `.n1h-panel{visibility:hidden; … transition:visibility 0s linear .42s}` — panel kapanınca 420 ms daha görünür kalır.
- `:63` kapalı kart: `transition:opacity .22s, transform .32s; transition-delay:calc(var(--i)*30ms)` — "Başlangıca Dön" kartı `--i:1` (`:196`) olduğu için ek 30 ms gecikmeli söner.
- `:49` MENU simgesi çizgileri `transition:transform .45s` — × → çizgi dönüşü 450 ms sürer.
- `:203` alt menü bağlantısında `this.close(false)` çağrılır; tarayıcı aynı anda gezinmeye başlar → geçişler hiç ilerlemeden belge donar.

Kapanış **animasyon bitişine** (onComplete) bağlı değil; durum anında kapalı. Sorun yalnızca **görsel**: son kare, CSS geçişinin başındaki kare. (Tasarım gereği kapanış animasyonu korunmalı; bu yüzden header'ın CSS'i değiştirilmedi.)

## 5. Düzeltme — `n1-menu-close-v13.js` (91 satır)
| Satır | Ne yapar |
|---|---|
| `26-33` | Tek seferlik stil: `[data-n1-instant]` işaretli header/panel ve tüm alt öğelerinde `transition:none; animation:none` |
| `40-55` `closeInstant()` | İşareti koyar → header'ın kendi `close(false)` yöntemini çağırır → yedek olarak `data-open`, alt menü `data-open`, `aria-expanded`, `inert`, `h.open`, `h.sub` sıfırlanır → `offsetWidth` ile stil hesabı zorlanır: **kapalı görünüm aynı karede** çizilir |
| `64-70` `leavesDocument()` | Yalnızca BAŞKA belgeye giden bağlantılar (farklı yol/sorgu, `target` yok, `download` yok, `#`/`mailto:`/`tel:` değil) |
| `73-81` | `click` **capture** dinleyicisi: header'ın kendi işleyicisinden önce çalışır; `preventDefault` YOK, JS ile yönlendirme YOK — gezinmeyi tarayıcı yapar. Gezinme olmazsa 1,5 sn sonra animasyonlar geri açılır |
| `83-85` | `pageswap` + `pagehide`: açık menü varsa geçişsiz kapatılır (View Transition görüntüsü ve BFCache kopyası kapalı) |
| `86-90` | `pageshow(persisted)`: BFCache dönüşünde kapalı durum yeniden doğrulanır, geçişler 2 kare sonra geri açılır |

Değişmeyenler: menü tasarımı, açılış/kapanış animasyonları (normal aç-kapa), Hizmetler ve İnsan Kaynakları alt menüleri, aynı sayfa çapaları, klavye/odak davranışı. Kapsam: yalnız `n1-header` olan sayfalar (Intelligence/müşteri sayfalarında header yoksa hiçbir şey yapmaz; her sayfada çalışsa da yalnızca bir `click` dinleyicisi ve iki yaşam döngüsü dinleyicisi ekler).

## 6. Testler
- Görsel kalıntı: yukarıdaki tablo (WebKit + Chromium, 4 görünüm). Video kayıtları: `qa`/`p01/vid-*`.
- Menü kullanılabilirliği (`menutest.js`, 5 görünüm, düzeltme enjekte): Chromium **88/93**, WebKit **88/93**. 5 "FAIL" yalnızca bilgi satırı: eski `/#hizmetler-ozet` adresinin standart tarayıcı davranışıyla açıldığını raporlayan ve canlıda hâlâ etkin olan Capa nav'ı (`__n1Nav`) gören kontrol — menü hatası değil.
- Geri/ileri ve BFCache: 8/8 geri dönüşte menü kapalı (bir kısmı Wix ATS `reload`, bir kısmı `back_forward`).
- Gezinme kesintisi yok: tüm testlerde URL `commit` süresi canlıyla aynı aralıkta (WebKit 0,46 sn / Chromium 0,23 sn).

## 7. Riskler / sınırlar
- iOS Safari'nin geçiş sırasında hangi kareyi gösterdiği Playwright WebKit ile **birebir aynı değildir**; düzeltme "son çizilen kare kapalı" koşulunu iki motorda da sağlar. Gerçek cihazda doğrulama: ACCEPTANCE §1.
- `pagehide` sırasında kapanış; sekme arka plana alınırken de çalışır (menü açıkken uygulamadan çıkılırsa dönüşte kapalı bulunur — kabul edilebilir).
- Header ileride `close()` adını değiştirirse yedek DOM sıfırlaması yine çalışır.
