# SERVER_URLS.md, DEPLOYMENT.md, ROLLBACK.md — tek kaynak tools/urls.py (yer tutucu yok)
import os,sys,json,glob
sys.path.insert(0,os.path.dirname(__file__)); from urls import *
D=os.path.join(os.path.dirname(__file__),'..')
FH={}
for f in glob.glob(os.path.join(D,'qa','test','shell-chromium-*.json')):
    j=json.load(open(f)); FH[j['width']]=j['meas']
def fh(w): return FH.get(w,{}).get('footerH','—')
# ---------- SERVER_URLS ----------
L=['# SERVER_URLS — 1N birleşik yayın paketi (Kariyer V1 + Global Menü V2 + bağımsız Header/Footer)','',
'Bütün adresler jsDelivr GitHub adresidir ve **commit SHA ile sabittir** (dal adı ya da `@latest` yok). Wix\'te yalnız **Server URL** ve **Tag Name** alanları kullanılır. **Bu paket, PR #4\'teki Kariyer V1 adreslerinin yerine geçer** (Kariyer V1 adreslerini kullanmayın; aynı sayfalar burada daha yeni menüyle).','',
'## A. Bağımsız Header / Footer / WhatsApp (tek Server URL, üç Tag Name)','',
'Server URL (üç bileşende aynı):','```',SHELL,'```','',
'| Bileşen | Tag Name |','|---|---|',
'| Bağımsız Header | `%s` |'%TAGS['header'],'| Bağımsız Footer | `%s` |'%TAGS['footer'],'| WhatsApp / Yukarı Çık (isteğe bağlı) | `%s` |'%TAGS['floating'],'',
'## B. Kariyer sayfaları (yeni oluşturulacak; aynı Server URL, farklı Tag Name)','','Server URL:','```',CAREER,'```','',
'| Sayfa | URL | Tag Name |','|---|---|---|']+['| %s | `%s` | `%s` |'%(n,u,t) for n,u,t,_,_ in NEW]+['','`/insan-kaynaklari` ve `/staj-programlari` canlıda var ama yanlış Custom Element taşıyor (Veri Sahibi Başvuru Formu). Bu iki sayfada mevcut öğenin Server URL ve Tag Name değerlerini değiştirin (DEPLOYMENT §1).','',
'## C. Global menü nedeniyle Server URL\'i değişen mevcut sayfalar','']
for n,u,t,new,old,keep in EX: L+=['### %s — `%s` · Tag Name `%s`'%(n,u,t),'Yeni Server URL:','```',new,'```','Geri dönüş (bugün canlı):','```',old,'```','']
L+=['### Yasal sayfalar (5 sayfa, aynı dosya)','| Sayfa | Tag Name |','|---|---|']+['| %s | `%s` |'%x for x in LEG]+['','Yeni Server URL (5 sayfada):','```',LEGNEW,'```','Geri dönüş (bugün canlı):','```',LEGOLD,'```','',
'## D. Bileşenlerin kendiliğinden yüklediği ortak dosyalar (Wix\'e girilmez)','| Dosya | Adres |','|---|---|',
'| Header v14 (global menü V2) | `%s%s/wix-global-shell-v1/modules/n1-header-v14.js` |'%(J,M),'| Site işaretlemesi v16 (menü verisi, footer, WhatsApp) | `%s%s/wix-global-shell-v1/site/n1-site-markup-v16.js` |'%(J,M),
'| Platform logoları (160/320 WebP) | `%s%s/wix-global-shell-v1/assets/platforms/` |'%(J,A),'',
'## E. Özel kod','| Giriş | Dosya |','|---|---|','| "Özel Yükleniyor % Script" → v13.1 (Kariyer V1\'den; yalnız iki rota) | `wix-career-v1/wix-custom-code/LOADER-v13.1-ozel-yukleniyor.html` |','',
'Bağımsız Header/Footer için **özel kod değişikliği gerekmez.** Menü Kapanış V1.3, test anahtarı, GA/GTM/Meta Pixel/Google Ads girişleri değişmez; müşteri panellerindeki "Sayfa Yükleniyor Script" girişine dokunulmaz.']
open(os.path.join(D,'SERVER_URLS.md'),'w').write('\n'.join(L)+'\n')
# ---------- DEPLOYMENT ----------
L=['# DEPLOYMENT — 1N birleşik yayın paketi: Wix Studio kurulumu (ana belge)','',
'> **Hiçbir adım canlıya uygulanmadı** (Wix Save / Publish yok, PR birleştirilmedi). Adresler: **SERVER_URLS.md** · Geri dönüş: **ROLLBACK.md** · CDN: **CDN_VERIFICATION.md** · Wix davranışı: **WIX_COMPATIBILITY.md**.','',
'## 0. Önce (2 dk)',
'1. Depo kökünde `bash wix-global-shell-v1/wix-custom-code/verify-cdn-shell.sh` → **TAMAM**.',
'2. Wix Studio → Site Geçmişi\'nde mevcut sürümü not edin.',
'3. Bütün adımlar tek oturumda yapılır ve **tek Yayınla** ile canlıya alınır. Yarım kurulumda yayınlamayın (menü yeni sayfalara ve İletişim\'e işaret eder).','',
'## 1. Kariyer sayfaları (Kariyer V1 kurulumu; adresler bu pakettekiler)',
'| Sayfa | URL | Yeni mi? | Tag Name | Server URL | Öznitelik | SEO Title | Meta Description | Özel kod | Geri dönüş |','|---|---|---|---|---|---|---|---|---|---|']
ST={'/insan-kaynaklari':'**canlıda VAR, içerik yanlış**','/staj-programlari':'**canlıda VAR, içerik yanlış**','/acik-pozisyonlar':'**yeni** (canlıda 404)'}
for n,u,t,ti,de in NEW: L.append('| %s | `%s` | %s | `%s` | `%s` | yok | `%s` | %s | Loader v13.1 sayfa seçimine ekle | ROLLBACK §3 |'%(n,u,ST[u],t,CAREER,ti,de))
L+=['','> **28 Kasım 2026 canlı tespiti:** `/insan-kaynaklari` ve `/staj-programlari` sayfaları Wix\'te oluşturulmuş ve yayında. Ancak ikisinde de **"VERİ SAHİBİ BAŞVURU FORMU."** içeriği çiziliyor: Custom Element bir yasal sayfanın kopyası (Server URL `…@39f762f…/n1-yasal-sayfalar-v1.js`, Tag Name `n1-veri-sahibi-basvuru-v1`). Meta description yok. Menü eski (v12, İletişim yok). `/acik-pozisyonlar` hâlâ 404.',
'> Bu iki sayfada **yeni sayfa oluşturmayın**. Sayfadaki mevcut Custom Element\'i seçin; **Server URL**\'yi yukarıdaki kariyer adresiyle, **Tag Name**\'i tablodaki etiketle değiştirin (`n1-insan-kaynaklari-v1` / `n1-staj-programlari-v1`). Wix\'te tanımlı öznitelikleri silin (kariyer bileşeni öznitelik kullanmaz). Ardından SEO alanlarını tablodaki değerlerle doldurun. Yalnız **Açık Pozisyonlar** yeni sayfa olarak oluşturulur.','','Her biri: Sayfalar → + Sayfa Ekle → boş sayfa · SEO Temelleri: slug ve tablodaki title/description (canonical boş) · Custom Element: Server URL + Tag Name, genişlik %100, yükseklik Auto · bu sayfalarda Wix\'in kendi header/footer\'ı gizli (Kısaca Biz ile aynı). Ayrıntı: `wix-career-v1/SEO_SETTINGS.md`.','',
'## 2. Menü nedeniyle Server URL\'i değişen mevcut sayfalar (11 dosya / 15 Custom Element)','Yalnız **Server URL** alanı değişir; Tag Name ve Wix\'te tanımlı öznitelikler aynen kalır. Dosyalarda değişen tek şey Header v14 + site işaretlemesi v16 adresleri; V1.4 optimizasyonları, içerik, tasarım ve medya aynı.','',
'| Sayfa | URL | Tag Name (değişmez) | Eski Server URL (bugün canlı = geri dönüş) | Yeni Server URL | Korunacak öznitelikler |','|---|---|---|---|---|---|']
for n,u,t,new,old,keep in EX: L.append('| %s | `%s` | `%s` | `%s` | `%s` | %s |'%(n,u,t,old,new,keep or DEFKEEP))
for n,t in LEG: L.append('| %s | (mevcut) | `%s` | `%s` | `%s` | tanımlı olanlar (aynen) |'%(n,t,LEGOLD,LEGNEW))
L+=['',
'## 3. Bağımsız HEADER — `%s`'%TAGS['header'],
'| Ayar | Değer |','|---|---|',
'| Server URL | `%s` |'%SHELL,'| Tag Name | `%s` |'%TAGS['header'],'| Gerekli öznitelik | yok (`deps-base` yalnız Wix dışı önizleme içindir; eklemeyin) |',
'| Masaüstü (> 1024 px) | genişlik **%%100**, yükseklik **88 px** |','| Tablet (768–1024 px) | genişlik **%100**, yükseklik **72 px** |','| Mobil (≤ 767 px) | genişlik **%100**, yükseklik **64 px** |',
'| Wix yerleşimi | Sayfanın en üst bölümü (ya da sayfanın Header alanı). Bölüm: tam genişlik (Stretch / Full width), yatay iç boşluk 0, kenar boşluğu 0. Öğe: bölüme sabitlenmiş (dock) üst-sol, genişlik %100, yükseklik yukarıdaki değerler (ya da Auto). İçerik genişliği (%90, kenarlarda %5) bileşenin içindedir; Wix\'te ayrıca kenar boşluğu vermeyin. |',
'| Sabitleme / sticky | İsteğe bağlı. Kurumsal sayfalardaki gibi ekranın üstünde kalsın isterseniz Header bölümünü Wix\'te **"Sabitle / Freeze"** (Studio: Header → Scroll effect: *Freeze* ya da bölüm *Sticky*) yapın. Bileşen kendisi `position:fixed` kullanmaz; Wix\'in sabitlemesiyle çakışmaz. |',
'| Overflow | Wix\'te ek ayar gerekmez: menü paneli bileşenin içinde değil, sayfanın gövdesinde (`document.body`, `position:fixed`) açılır; bölümün "taşmayı gizle" ayarı paneli kırpmaz. |',
'| Katman sırası | Header bölümünü sayfa içeriğinin üstünde bırakın (Wix varsayılanı). Menü paneli z-index 99990 ile içerik, Wix Forms ve footer\'ın üzerindedir; yalnız Wix\'in kendi sabit katmanları (ör. sohbet balonu) bunun üstünde olabilir. |',
'| Menü için ek Wix ayarı | yok: Popup, Lightbox, Velo dosyası, sayfa kodu ya da HTML Embed mesajlaşması gerekmez. |',
'| Önemli | Editörde ve Önizleme\'de Custom Element iframe içinde çizilir; menü orada kutuya sıkışmış görünebilir. Menünün sayfanın üzerinde açıldığını **yayınlanmış sitede** kontrol edin (WIX_COMPATIBILITY.md). |','',
'## 4. Bağımsız FOOTER — `%s`'%TAGS['footer'],
'| Ayar | Değer |','|---|---|','| Server URL | `%s` |'%SHELL,'| Tag Name | `%s` |'%TAGS['footer'],'| Gerekli öznitelik | yok |',
'| Masaüstü 1920 / 1440 px | genişlik %%100 · ölçülen içerik yüksekliği **%s / %s px** |'%(fh(1920),fh(1440)),
'| Tablet 1024 / 820 px | genişlik %%100 · **%s / %s px** |'%(fh(1024),fh(820)),
'| Mobil 440 / 390 / 375 / 320 px | genişlik %%100 · **%s / %s / %s / %s px** |'%(fh(440),fh(390),fh(375),fh(320)),
'| Wix yerleşimi | Sayfanın en alt bölümü: tam genişlik, iç/dış boşluk 0, arka plan #080A09. Öğe genişliği %100, yüksekliği **Auto** (önerilen; içerikten gelir). Auto kullanılamıyorsa her kırılma noktasında yukarıdaki yükseklikleri girin (yazı tipi farkı için +0–8 px pay bırakmayın; fazla yükseklik altta boşluk bırakır). |',
'| Alt boşluk olmaması için | Footer bölümü sayfanın son bölümü olsun; altında boş bölüm ya da Wix\'in kendi footer\'ı kalmasın (sayfa ayarlarında Wix footer\'ını gizleyin); bölümün alt boşluğu 0; öğe yüksekliği Auto. |','',
'## 5. WhatsApp / Yukarı Çık (isteğe bağlı) — `%s`'%TAGS['floating'],
'Sayfanın herhangi bir yerine (ör. footer bölümünün içine) 1×1 px\'lik bir Custom Element olarak ekleyin; Server URL yukarıdakiyle aynı. Kontroller ekrana sabit katman olarak (`document.body`) eklenir, footer\'ın içine sıkışmaz. Sayfada zaten WhatsApp katmanı varsa ikincisini oluşturmaz. Kurumsal (1N) sayfalara eklemeyin; onlar kendi katmanını getirir.','',
'## 6. Sayfa kurulum sıraları',
'### İletişim — `/iletisim`',
'1. Sayfa ayarları → Wix\'in genel Header ve Footer\'ını bu sayfada gizleyin.',
'2. **Bölüm 1 (Header):** tam genişlik bölüm → Custom Element `%s` (§3).'%TAGS['header'],
'3. **Bölüm 2 (İçerik):** mevcut İletişim HTML V4 bölümü **olduğu gibi** (kod değişmez; HTML Embed genişliği %100, yüksekliği içeriğe göre).',
'4. **Bölüm 3 (Form):** ayrı, tam genişlik bir bölüm → **Wix Forms** formunuz. Bu bölüm İletişim içeriği ile Footer arasında, kendi bölümünde durur; HTML Embed\'in içine konmaz.',
'5. **Bölüm 4 (Footer):** Custom Element `%s` (§4); isteğe bağlı aynı bölüme `%s` (§5).'%(TAGS['footer'],TAGS['floating']),
'6. Header, içerik, form ve footer ayrı bölümlerdir; birbirine binmez (test sayfasında doğrulandı, TEST_REPORT).','',
'### Akademi — `/reklam-ajansi`',
'1. Mevcut içerik (blog, yazılar, görseller, Wix bileşenleri) **değişmez**.',
'2. Wix\'in bu sayfadaki header\'ını gizleyin; en üste tam genişlik bölüm → `%s`.'%TAGS['header'],
'3. Wix footer\'ını gizleyin; en alta tam genişlik bölüm → `%s` (+ isteğe bağlı `%s`).'%(TAGS['footer'],TAGS['floating']),
'4. Menüde "Akademi" aktif görünür (adres tabanlı; ek ayar yok).','',
'### Error 404',
'Wix Studio\'da 404 sayfası, URL slug\'ı **`error404`** olan normal bir sayfadır (Wix Yardım: *Studio Editor: Creating a Custom 404 Page*); öğe eklenebilir ve genel header/footer gizlenebilir. Wix durum kodunu (404) kendisi döndürür; bu kurulum durum kodunu ya da hatalı adreslerin davranışını değiştirmez (yönlendirme yok).',
'1. Sayfalar → mevcut 404 (error404) sayfası. İçerik tasarımına dokunmayın.',
'2. Genel header/footer\'ı bu sayfada gizleyin; en üste `%s`, en alta `%s` bölümlerini ekleyin.'%(TAGS['header'],TAGS['footer']),
'3. **Doğrulama zorunlu:** Custom Element\'in 404 sayfasında desteklendiği belgelerle uyumludur ancak canlı ortamda doğrulanmadı. Yayından sonra `https://www.reklam1n.com/olmayan-bir-adres` açın: header, menü ve footer görünmeli; `curl -I` hâlâ **404** döndürmeli.',
'4. **Wix 404 sayfasında Custom Element görünmezse (desteklenen alternatif):** bileşenleri kaldırın, sayfanın mevcut Wix header/footer\'ını geri açın (bugünkü hâl). Bu, 404 durum kodunu ve içeriği korur; kurumsal görünüme en yakın desteklenen seçenek odur. Hiçbir yönlendirme kurmayın.','',
'## 7. Özel kod: Loader',
'Kariyer V1\'deki **Loader v13.1** (yalnız `/insan-kaynaklari` ve `/staj-programlari` rotaları) kurulacak: "Özel Yükleniyor % Script" içeriğini `wix-career-v1/wix-custom-code/LOADER-v13.1-ozel-yukleniyor.html` ile değiştirin; sayfa seçimine 3 kariyer sayfasını ekleyin. Yedek: `wix-global-stability-v13/wix-custom-code/LOADER-v13-ozel-yukleniyor.html`.',
'İletişim ve Akademi zaten loader rotalarında; loader bu sayfalarda yalnız Wix\'in ana içerik kabını bekler (`#SITE_CONTAINER`/`main`), bağımsız bileşenleri **beklemez** → takılma yok. 404 rotalarda yok → loader çalışmaz. Bu yüzden **ek loader değişikliği gerekmez.** Müşteri panellerindeki "Sayfa Yükleniyor Script" girişine dokunmayın.','',
'## 8. 301: `/ekibimize-katil` → `/insan-kaynaklari`',
'Panel → Ayarlar → SEO → **URL Yönlendirme Yöneticisi** → Yeni yönlendirme: `/ekibimize-katil` → `/insan-kaynaklari`, **301**. (`/ekibimize-katil` bugün 404; doğrudan eklenebilir. Editörde bu adresli gizli bir sayfa varsa silmeyin; slug\'ını `ekibimize-katil-arsiv` yapıp yönlendirmeyi ekleyin.)','',
'## 9. Yayından sonra 5 dakikalık kontrol',
'1. Kurumsal bir sayfada MENU: 6 başlık (İletişim dahil), İK → KARİYER + alt menüsü, Başlangıca Dön, A7 Prodüksiyon (yeni sekme), 4 logo (ZEYP, Market, Hemen Tıkla, Intelligence).',
'2. Telefonda menü ekranı aşmıyor (gerekirse kendi içinde kayar); bağlantıya dokununca menü kapanıyor; geri tuşunda menü kapalı.',
'3. İletişim / Akademi / 404: bağımsız header (Teklif Al yok, yeşil #A2FF00 logo), menü sayfanın üzerinde açılıyor, footer altta boşluk yok.',
'4. Ana sayfa: Ronin ve "Hikâyemizin Devamı" → /kisaca-biz; telefonda hizmet sayfalarında V1.4 kareleri yerinde.']
open(os.path.join(D,'DEPLOYMENT.md'),'w').write('\n'.join(L)+'\n')
# ---------- ROLLBACK ----------
L=['# ROLLBACK — birleşik paket geri dönüşü','',
'Her satır bağımsızdır. Wix Studio → sayfa → Custom Element → Server URL = aşağıdaki adres → Yayınla. Tag Name ve öznitelikler zaten değişmedi. Adresler 28 Kasım 2026\'da canlıda kullanılanlardır (V1.4 yayında).','',
'## 1. Mevcut sayfalar (menü)','| Sayfa | Tag | Geri dönüş Server URL |','|---|---|---|']
for n,u,t,new,old,keep in EX: L.append('| %s | `%s` | `%s` |'%(n,t,old))
L+=['| Yasal 5 sayfa | (5 etiket) | `%s` |'%LEGOLD,'',
'Header tek etikettir (`n1-header`); sürümler karışırsa sayfalar çalışmaya devam eder (eski header yeni menü verisini, yeni header eski veriyi işler), yalnız menü içeriği sayfaya göre farklı görünür. Tam geri dönüşte bütün satırları birlikte geri alın.','',
'## 2. Bağımsız Header/Footer (İletişim, Akademi, 404)','Custom Element bölümlerini silin ve sayfa ayarlarında Wix\'in genel header/footer\'ını yeniden açın (bugünkü hâl). Başka adres yoktur.','',
'## 3. Kariyer sayfaları','Açık Pozisyonlar → Yayından kaldır (silmeyin). İnsan Kaynakları ve Staj Programları kurulumdan önce canlıdaydı (yanlış içerikle). Onları yayından kaldırın ya da bugünkü değerlere dönün: Server URL `'+LEGOLD+'`, Tag Name `n1-veri-sahibi-basvuru-v1`. Bugünkü hâl de hatalı olduğu için yayından kaldırmak önerilir. Önce §1\'i geri alın (menü bu sayfalara işaret eder). 301 kaydını silin.','',
'## 4. Loader','"Özel Yükleniyor % Script" → `wix-global-stability-v13/wix-custom-code/LOADER-v13-ozel-yukleniyor.html`; sayfa seçiminden kariyer sayfalarını çıkarın.','',
'## 5. Önceki paketler (silinmedi)','Kariyer V1: `wix-career-v1/ROLLBACK.md` · V1.4: `wix-mobile-performance-v14/ROLLBACK.md` · V1.3: `wix-global-stability-v13/ROLLBACK.md` · tam kurtarma: `sitewide-mobile-fix-20261126` @ `f97db8e`.','',
'## 6. Git','Dal `claude/happy-sagan-l6tbsc` (Kariyer V1 üzerine). Yalnız `wix-global-shell-v1/` eklendi; önceki klasörler, dallar ve `main` değişmedi; force push yok.']
open(os.path.join(D,'ROLLBACK.md'),'w').write('\n'.join(L)+'\n'); print('ok')
