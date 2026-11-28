import sys,os
P=sys.argv[1];src=open(os.path.join(os.path.dirname(__file__),'make_server_urls.py')).read();ns={};exec(src.split("L=['# SERVER_URLS")[0].replace("P=sys.argv[1]","P=%r"%P),ns)
EX,LEG,LEGOLD=ns['EX'],ns['LEG'],ns['LEGOLD']
L=['# ROLLBACK — Kariyer V1 geri dönüş','','Her satır bağımsız geri alınır: Wix Studio → sayfa → Custom Element → Ayarlar → **Server URL** = aşağıdaki adres → **Yayınla**. Tag Name ve öznitelikler zaten değişmemiştir. Adresler bugün canlıda kullanılanlardır (canlı sayfaların yüklediği betikler, 28 Kasım 2026; `tests/live-urls.js`).','',
'## 1. Mevcut sayfalar','| Sayfa | Tag (değişmez) | Geri dönüş Server URL | Sonuç |','|---|---|---|---|']
for n,u,t,f,old in EX: L.append('| %s | `%s` | `%s` | %s |'%(n,t,old,'V1.4 (eski menü)' if 'mobile-performance' in old else 'V1.2 (eski menü)'))
L.append('| Yasal 5 sayfa (%s) | (5 etiket) | `%s` | V1.2 (eski menü) |'%(', '.join(x[0] for x in LEG),LEGOLD))
L+=['','**Bütünlük notu:** Header tek bir etikettir (`n1-header`). Menü sürümleri karışırsa (bir sayfa v12, diğeri v13) sayfalar yine çalışır. v13 eski menü verisini, v12 yeni menü verisini işleyebilir (MENU_UPDATE_REPORT §3). Yalnız menü içeriği sayfaya göre farklı görünür. Tam geri dönüşte bütün satırları birlikte geri alın.','',
'## 2. Yeni sayfalar',
'- **Sayfalar:** İnsan Kaynakları, Açık Pozisyonlar, Staj Programları. Sayfa Ayarları → "Yayından kaldır" ya da sayfayı gizleyin. **Silmeyin**, yeniden açmak kolay olsun.',
'- **Sıra:** menü bu sayfalara işaret ettiği için önce §1\'deki sayfaları geri alın.',
'- **301:** Wix URL Yönlendirme Yöneticisi\'ndeki `/ekibimize-katil → /insan-kaynaklari` kaydını silin ya da hedefini değiştirin.','',
'## 3. Özel kod',
'"Özel Yükleniyor % Script" içeriğini `wix-global-stability-v13/wix-custom-code/LOADER-v13-ozel-yukleniyor.html` (V1.3) ile değiştirin. Sayfa seçiminden 3 kariyer sayfasını çıkarın.','',
'## 4. Daha eski geri dönüş noktaları (değişmedi)',
'V1.4: `wix-mobile-performance-v14/ROLLBACK.md` · V1.3: `wix-global-stability-v13/ROLLBACK.md` · V1.2: `wix-mobile-stability-v1/ROLLBACK.md` · tam kurtarma: `sitewide-mobile-fix-20261126` @ `f97db8e`.','',
'## 5. Git',
'- **Dal:** `claude/happy-sagan-l6tbsc`, tabanı `mobile-performance-v14` @ `624430a`. İleri sarma yapıldı; geçmiş yeniden yazılmadı.',
'- **Dosyalar:** yalnız yeni `wix-career-v1/` klasörü eklendi. Hiçbir eski dosya değiştirilmedi ya da silinmedi.',
'- **Dokunulmayan dallar:** `main`, V1.4 dalı, kurtarma dalları.',
'- Force push yok.']
open(os.path.join(os.path.dirname(__file__),'..','ROLLBACK.md'),'w').write('\n'.join(L)+'\n');print('ok')
