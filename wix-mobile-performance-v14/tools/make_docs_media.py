# MEDIA_INVENTORY.md + MOBILE_MEDIA_MAPPING.md üretimi (MEDIA_INVENTORY.json, sondalar, stills-manifest.json)
import json,re
inv=json.load(open('MEDIA_INVENTORY.json'));man=json.load(open('media/stills/stills-manifest.json'))
meta={}
for l in open('qa/inventory/video-probe-primary-meta.txt'):
  u,_,r=l.strip().partition('|')
  if r:
    a=r.split();f=a[0].split(',');meta[u]={'codec':f[0],'profile':f[1],'wh':f[2]+'×'+f[3],'fps':round(eval(f[4]),2),'kbps':round(int(f[5])/1000),'dur':float(a[1])}
size={l.split('|')[0]:int(l.split('|')[1]) for l in open('qa/inventory/video-probe-primary.txt') if '|' in l}
smeta={}
for l in open('media/stills/probe.txt'):
  a=l.split()
  if len(a)>=4:
    f=a[3].split(',');smeta[a[0]]={'q':a[1],'bytes':int(a[2]),'codec':f[0],'wh':f[2]+'×'+f[3],'fps':round(eval(f[4]),2),'kbps':round(int(f[5])/1000),'dur':float(a[4]) if len(a)>4 else None}
MB=lambda b:f"{b/1048576:.2f}"
ROLE={'/':'ana sayfa (Ronin 2×, mini, bantlar) — değişmedi'}
L=['# MEDIA_INVENTORY — V1.4 kurumsal sayfa medya envanteri','',
'Kaynak: canlı tarama (27 Kasım 2026, Chromium CDP, profiller mobil 390×844 / tablet yatay 1180×820 / masaüstü 1440×900, sona kadar kademeli kaydırma), video sondaları (ilk 3 MB, `curl -r` + ffprobe) ve statik kaynak analizi. Makine okunur sürüm: `MEDIA_INVENTORY.json`. Ham veri: `qa/inventory/`.','',
'> Medya baytları yalnız tamamlanan istekleri sayar; kısmi video indirmeleri eksik görünür. Video istek sayıları için `qa/net/*.json`, aktarılan bayt için `PERFORMANCE_BEFORE_AFTER.md`.','',
'## 1. Sayfa özeti (canlı V1.3)','','| Sayfa | CE etiketi | Wix yerel | Video (mob/masa) | Görsel | ST çalışma (mob) | Mobil medya MB | Mobil görsel MB | Masaüstü medya MB |','|---|---|---|---|---|---|---|---|---|']
for p in inv['pages']:
  n=p['netLive'];vm=sum(1 for v in p['videos'] if v['onMobileLive']);vd=sum(1 for v in p['videos'] if v['onDesktopLive'])
  L.append(f"| `{p['page']}` | {', '.join('`'+c+'`' for c in p['ceTags']) or '—'} | {'evet' if p['wixNative'] else 'hayır'} | {vm}/{vd} | {p['images']['count']} | {p['scrollTriggersRuntime']['mobil']} | {n['mobil']['mediaMB']} | {n['mobil']['imageMB']} | {n['masaustu']['mediaMB']} |")
L+=['','## 2. Server URL (canlı) ve V1.4 dosyası','','| Sayfa | Canlı Server URL | V1.4 |','|---|---|---|']
for p in inv['pages']:
  if p['serverUrlLive']:L.append(f"| `{p['page']}` | `{p['serverUrlLive']}` | {('`'+p['v14File']+'`') if p['v14File'] else 'değişmedi'} |")
L+=['','Wix yerel sayfalar (Custom Element yok, kod kapsamı dışında): '+', '.join('`'+p['page']+'`' for p in inv['pages'] if p['wixNative'])+'.','',
'## 3. Videolar','','### 3.1 Ana / kahraman videolar (mobilde korunur)','','| Adres | Çözünürlük | Süre sn | Codec | Bit hızı kb/s | Boyut MB |','|---|---|---|---|---|---|']
for u,m in meta.items():
  L.append(f"| `{u.replace('https://video.wixstatic.com/video/','wix:').replace('https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@','cdn@')[:110]}` | {m['wh']} | {m['dur']:.2f} | {m['codec']} {m['profile']} | {m['kbps']} | {MB(size.get(u,0))} |")
L+=['','### 3.2 İkincil videolar (V1.4’te mobil/tablette WebP kare)','','| Anahtar | Sayfa | Kaynak | Çözünürlük | Süre sn | Codec | kb/s | Boyut MB |','|---|---|---|---|---|---|---|---|']
for k,v in man.items():
  s=smeta.get(k,{})
  L.append(f"| `{k}` | {v['page']} | `{v['wixVideoId']}/{v['sourceQuality']}` | {s.get('wh','')} | {s.get('dur') or ''} | {s.get('codec','')} | {s.get('kbps','')} | {MB(s.get('bytes',0))} |")
L+=['','Wix yerel sayfalardaki videolar (`/cgi-reklamlar`, `/marka-danismanligi`, `/web-tasarim-ve-yazilim-programlama`) Wix Video Player öğeleridir; kodla değiştirilemez, Wix Editor’de yönetilir (OPTIMIZATION_DECISIONS §5).','',
'### 3.3 Video öznitelikleri (canlı, mobil)','','| Sayfa | Sınıf | preload | autoplay | loop | muted | Mobil | Masaüstü |','|---|---|---|---|---|---|---|---|']
for p in inv['pages']:
  for v in p['videos']:
    L.append(f"| `{p['page']}` | `{v['class']}` | {v['preload']} | {v['autoplay']} | {v['loop']} | {v['muted']} | {'yükler' if v['onMobileLive'] else '—'} | {'yükler' if v['onDesktopLive'] else '—'} |")
L+=['','## 4. Görseller (mobil)','','| Sayfa | Adet | lazy | width/height | Aşırı büyük örnekler (doğal → görüntülenen) |','|---|---|---|---|---|']
for p in inv['pages']:
  i=p['images'];L.append(f"| `{p['page']}` | {i['count']} | {i['lazy']} | {i['withWH']} | {'; '.join(o['natural']+'→'+o['display'] for o in i['oversized'][:4])} |")
L+=['','## 5. Animasyon, dinleyici, zamanlayıcı, temizlik (statik analiz, canlı kaynak)','','| Sayfa | gsap çağrısı | scrollTrigger | addEvt/removeEvt/n1Listen | setTimeout/setInterval/rAF | IO/RO/MO | disconnected | pagehide/pageshow/visibility | CSS filter / backdrop / infinite |','|---|---|---|---|---|---|---|---|---|']
for p in inv['pages']:
  s=p['static']
  if not s:continue
  L.append(f"| `{p['page']}` | {s['gsap']} | {s['scrollTrigger']} | {s['addEventListener']}/{s['removeEventListener']}/{s['n1Listen']} | {s['setTimeout']}/{s['setInterval']}/{s['rAF']} | {s['IntersectionObserver']}/{s['ResizeObserver']}/{s['MutationObserver']} | {s['disconnectedCallback']} | {s['pagehide']}/{s['pageshow']}/{s['visibilitychange']} | {s['filterCSS']}/{s['backdrop']}/{s['infiniteCSS']} |")
L+=['','Ana sayfa satırı yalnız sarmalayıcıyı (`n1-site-wix-v658.js`) sayar; video modülü (`n1-video-m5-v13.js`), m5 yapımı ve ortak modüller ayrı dosyalardır.','',
'## 6. BFCache / yaşam döngüsü riskleri (canlı)','','| Sayfa | Risk | V1.4 |','|---|---|---|']
for p in inv['pages']:
  for r in p['bfcacheRisks']:
    fix='`n1Life` pagehide’da bırakır, pageshow’da geri yükler' if 'pagehide' in r and p['page']!='/' else ('video modülü v14 bırakır/geri yükler (mobil)' if p['page']=='/' and 'pagehide' in r else 'değişmedi (gerekçe: RESOURCE_LIFECYCLE §4)')
    L.append(f"| `{p['page']}` | {r} | {fix} |")
open('MEDIA_INVENTORY.md','w').write('\n'.join(L)+'\n')
# ---- MOBILE_MEDIA_MAPPING
M=['# MOBILE_MEDIA_MAPPING — ikincil video → WebP kare eşlemesi','','Kare seçimi: her video için aday kareler (`media/stills/candidates.json`, temas sayfaları `media/stills/contact-sheets/`) görsel olarak incelendi; anlatıyı en iyi taşıyan, bulanık/geçiş karesi olmayan an seçildi. Üretim: `frames.py` (ffmpeg tek kare, kaynak en yüksek mevcut kalite) → `make_webp.py` (WebP q84, method 6, **animasyonlu değil**, büyütme yok). Klasör sürümlü: `wix-mobile-performance-v14/media/stills/<sayfa>/<anahtar>-<genişlik>.webp`, CDN’de commit SHA ile sabit.','',
'Kural: yalnız **hafif profil** (telefon + tablet, iPad yatay dahil) kare alır. Masaüstü aynı videoları birebir aynı şekilde yükler. Ana sayfa kahraman/Ronin ve hizmet sayfası kahraman videoları mobilde de video kalır.','',
'| Anahtar | Sayfa | Kaynak video (Wix id / kalite) | Kare sn | Gerekçe | Boyutlar (px → KB) | Video MB (önce) |','|---|---|---|---|---|---|---|']
tot_v=0;tot_w=0
for k,v in man.items():
  s=smeta.get(k,{});tot_v+=s.get('bytes',0);big=max(v['files'],key=lambda f:f['w']);tot_w+=big['bytes']
  M.append(f"| `{k}` | {v['page']} | `{v['wixVideoId']}` / {v['sourceQuality']} {v['sourceWxH']} | {v['time']} | {v['reason']} | {', '.join(str(f['w'])+'→'+str(round(f['bytes']/1024))+'' for f in v['files'])} | {MB(s.get('bytes',0))} |")
M+=['',f"Not: `sosyal-final` ve `reklam-karar` aynı kaynak dosyadır (md5 aynı); kareleri ayrı tutuldu (sayfa klasörü bağımsızlığı).",'',
'## Sayfa koduna entegrasyon','','| Sayfa | Öğe | Masaüstü | Hafif profil |','|---|---|---|---|',
'| Kreatif Prodüksiyon | Monitör (bölüm oynatıcısı) | otomatik oynar | `kreatif-monitor` kare poster; video yalnız kullanıcı bölüm/oynat dokunuşunda kaynak alır (otomatik/yakın-yükleme kapalı) |',
'| E-Ticaret | Mağaza ekranı, üçlü ekran | video | `eticaret-store`, `eticaret-trio` (video öğesi oluşturulmaz) |',
'| Sosyal Medya | Hareket, final, strateji | video | `sosyal-hareket`, `sosyal-final`, `sosyal-strateji`; oynat düğmesi çıkarıldı |',
'| Reklam Yönetimi | Manifesto ekranı, karar videosu | video | `reklam-manifesto`, `reklam-karar`; düğmeler gizli |',
'| UI/UX | FEEL videosu | video | `uiux-feel`; oynat düğmesi çıkarıldı (gri önizleme anahtarı masaüstünde aynı) |',
'| Yapay Zekâ | Üretim, hikâye | video | `yapay-gen`, `yapay-story` |',
'| Uygulama Geliştirme | Web, ekranlar, hareket | video | `uygulama-web`, `uygulama-screens`, `uygulama-motion` |','',
'Görsel: `<img data-n1-still loading="lazy" decoding="async" srcset="… 480w, 720w, … " sizes="…" width height>`; ilk ekrandaki kareler `loading="eager"`. Kutu oranı eski video kutusuyla aynı (`position:absolute; inset:0; object-fit:cover`) → düzen kayması yok (CLS ölçümü PERFORMANCE_BEFORE_AFTER).','',
f"Toplam: 14 ikincil video kaynağı ({MB(tot_v)} MB, ilk kalite) ↔ en büyük WebP’lerin toplamı {MB(tot_w)} MB; tüm WebP klasörü 2,4 MB (cihaz yalnız `sizes`’a uyan tek boyutu indirir)."]
open('MOBILE_MEDIA_MAPPING.md','w').write('\n'.join(M)+'\n');print('ok')
