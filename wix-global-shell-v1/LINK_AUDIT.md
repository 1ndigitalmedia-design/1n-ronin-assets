# LINK_AUDIT — menü, kartlar, footer

Testler her sayfa türünde menünün DOM'unu okuyarak `href`, `target` ve `rel` değerlerini doğruladı. Site içi hedeflerin HTTP durumu canlıda `curl` ile ölçüldü (28 Kasım 2026). Dış alan adlarına bu ortamdan erişilemedi (vekil engeli), bu yüzden yalnız adresleri doğrulandı.

## Menü
| Öğe | Hedef | Açılış | Canlı durum |
|---|---|---|---|
| Kısaca Biz | `/kisaca-biz` | aynı sekme | 200 |
| Hizmetler | alt menü (7 hizmet sayfası, değişmedi) | düğme | 7 × 200 |
| Markalar | `/markalar` | aynı sekme | 200 |
| Akademi | `/reklam-ajansi` | aynı sekme | 200 |
| İnsan Kaynakları (not: KARİYER) | `/insan-kaynaklari`; alt menü: Açık Pozisyonlar `/acik-pozisyonlar`, Staj Programları `/staj-programlari` | başlık bağlantı, ayrı düğme alt menüyü açar | `/insan-kaynaklari` 200, `/staj-programlari` 200 (**ikisi de yanlış içerik: Veri Sahibi Başvuru Formu**), `/acik-pozisyonlar` **404**. Kurulumla düzelir (DEPLOYMENT §1). |
| İletişim (not: BİZE ULAŞIN) | `/iletisim` | aynı sekme | 200 |
| Ekibimize Katıl | **kaldırıldı** (hiçbir sayfada yok; testte doğrulandı) | | 301 → `/insan-kaynaklari` (DEPLOYMENT §8) |
| 1N Digital Media — Başlangıca Dön | `/` (ana sayfada `#ust`) | aynı sekme | 200 |
| A7 Prodüksiyon | `https://www.a7-1n.com/a7-produksiyon` | yeni sekme, `noopener noreferrer` | doğrulanamadı (vekil) |
| ZEYP | `https://www.zeyp.com.tr/` | yeni sekme, `noopener noreferrer` | doğrulanamadı (vekil) |
| Market | `https://www.carsialtin.com/faprika/canli-piyasalar/` | yeni sekme, `noopener noreferrer` | doğrulanamadı (vekil) |
| Hemen Tıkla | `https://www.hementik.la/` | yeni sekme, `noopener noreferrer` | doğrulanamadı (vekil) |
| 1N Intelligence | `https://www.reklam1n.com/intelligence` | aynı sekme | 200 |

## Footer (kurumsal footer ile aynı işaretleme)
Telefon `tel:`, e-posta `mailto:`, 4 sosyal bağlantı ve yasal bağlantılar kurumsal footer'daki değerlerle birebir aynı (aynı kaynak dosya; testte sayıldı). Footer içeriği değişmedi.

## Aktif durum (adres tabanlı)
Bulunulan sayfanın satırı `data-current`, bağlantısı `aria-current="page"` alır. Gerçek adreslerde test edildi: kariyer sayfaları → İnsan Kaynakları, `/iletisim` → İletişim, `/reklam-ajansi` → Akademi, hizmet sayfası → Hizmetler, 404 → hiçbiri, ana sayfa → hiçbiri.

## Not
Yasal metindeki iç doğrulama maddesi D-05 `/ekibimize-katil` adresini anar. Hukuki içerik olduğu için değiştirilmedi; hukuk incelemesinde güncellenmesi önerilir.
