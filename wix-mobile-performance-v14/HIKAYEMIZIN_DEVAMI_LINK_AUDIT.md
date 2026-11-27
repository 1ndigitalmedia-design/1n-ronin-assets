# HIKAYEMIZIN_DEVAMI_LINK_AUDIT — "Hikâyemizin Devamı" bağlantı denetimi (P08)

## 1. Tarama
`tests/linkaudit.js`: canlı sitedeki 29 kurumsal sayfa ve `/studyo-hikayesi`, masaüstünde (1440×900) sona kadar kaydırılarak tarandı. Normal DOM ve tüm Shadow DOM'lar dahil; `a`, `button`, `[role=link]` ve `[data-link]` öğelerinde `/hik[aâ]yemizin\s+devam/i` metni arandı. Ham çıktı: `qa/linkaudit-live-masaustu.log`, `qa/linkaudit-v14.log`.

| Sayfa | Canlı (V1.3) | Kaynak | Tür |
|---|---|---|---|
| `/` masaüstü | `a.n1ab-cta` → **`/studyo-hikayesi`** (`data-link="studyo-hikayesi"`) | `site/n1-site-markup-v12.js` (Hakkımızda bölümü) | Kod (Custom Element) |
| `/` tablet + mobil | `a.m4-link` → **`/studyo-hikayesi`** | aynı işaretleme (m4 mobil düzeni) | Kod |
| Diğer 28 sayfa + `/studyo-hikayesi` | yok | — | — |

**Wix yerel (editörde tanımlı) "Hikâyemizin Devamı" düğmesi bulunamadı.** Bu, bütün kurumsal sayfalarda Shadow DOM dahil yapılan tarama sonucudur.

`/studyo-hikayesi` **404** döndürüyor (curl, 27 Kasım 2026); `/kisaca-biz` **200**. Görev gereği `/studyo-hikayesi` sayfası ve bu adrese giden diğer referanslar toplu değiştirilmedi ve silinmedi.

## 2. Değişiklik
`site/n1-site-markup-v14.js` = v12'deki tek satır değişikliği:
```html
<a class="n1ab-cta" data-link="kisaca-biz" href="/kisaca-biz">Hikâyemizin Devamı</a>
```
- `data-link` de değiştirildi. Hakkımızda modülü `data-link`'i `N1_ROUTES` haritasında arar; `kisaca-biz` anahtarı olmadığı için `href` korunur (modül kodu değişmedi).
- Bu işaretlemeyi yalnız ana sayfa işler. İç sayfalar aynı işaretlemeyi yalnız başlık ve altbilgi için, etkisiz bir `<template>` içinde kullanır. Sayfa taramasında iç sayfalarda görünür bağlantı yok.
- Ana sayfa v659, işaretleme v14'ü yükler. Wix'te tek değişiklik **Ana Sayfa Server URL**'idir.

## 3. Doğrulama (V1.4, çalışma anında, gerçek tıklama)
| Profil | Öğe | href | Tıklama sonrası |
|---|---|---|---|
| Masaüstü 1440 | `a.n1ab-cta` | `/kisaca-biz` | **`/kisaca-biz`** |
| Tablet 820 | `a.m4-link` | `/kisaca-biz` | **`/kisaca-biz`** |
| Mobil 390 | `a.m4-link` | `/kisaca-biz` | **`/kisaca-biz`** |

Canlıda üç profilde de tıklama `/studyo-hikayesi`'ne (404) gidiyordu. V1.4'te `/studyo-hikayesi`'ne giden "Hikâyemizin Devamı" kalmadı. Kabul testi bunu cihazda yeniden kontrol eder (ana sayfa: `"Hikâyemizin Devamı" → /kisaca-biz`).
