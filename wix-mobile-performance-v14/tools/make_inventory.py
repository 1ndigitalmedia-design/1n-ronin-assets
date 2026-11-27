# P09: canlı tarama (qa/inventory/live-v13.json) + video sondaları + statik kaynak analizi → MEDIA_INVENTORY.json / .md
import json,re,os,collections
R='/home/user/1n-ronin-assets/'
CDN='https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@'
d=json.load(open('qa/inventory/live-v13.json'))
probe=open('qa/inventory/video-probe-primary.txt').read()+open('media/stills/probe.txt').read() if os.path.exists('media/stills/probe.txt') else ''
V14={'/':'home/n1-site-wix-v659.js','/kreatif-produksiyon':'pages/wix-kreatif-produksiyon-v24/n1-kreatif-produksiyon-v24.js',
 '/e-ticaret-yonetimi':'pages/wix-e-ticaret-yonetimi-v25/n1-e-ticaret-yonetimi-v25.js','/sosyal-medya':'pages/wix-sosyal-medya-v28/n1-sosyal-medya-v28.js',
 '/reklam-yonetimi':'pages/wix-reklam-yonetimi-v24/n1-reklam-yonetimi-v24.js','/ui-ux-tasarim':'pages/wix-uiux-tasarim-v30/n1-uiux-tasarim-v30.js',
 '/yapay-zeka':'pages/wix-yapay-zeka-v3/n1-yapay-zeka-v3.js','/uygulama-gelistirme':'pages/wix-uygulama-gelistirme-v3/n1-uygulama-gelistirme-v3.js'}
def stat(path):
  try:s=open(R+path,encoding='utf-8').read()
  except Exception:return None
  c=lambda p:len(re.findall(p,s))
  return {'bytes':len(s.encode()),'gsap':c(r'gsap\.(to|from|fromTo|timeline|set)\('),'scrollTrigger':c(r'scrollTrigger\s*:|ScrollTrigger\.create'),
   'addEventListener':c(r'addEventListener\('),'removeEventListener':c(r'removeEventListener\('),'n1Listen':c(r'n1Listen\('),
   'setTimeout':c(r'setTimeout\('),'setInterval':c(r'setInterval\('),'rAF':c(r'requestAnimationFrame\('),
   'IntersectionObserver':c(r'new IntersectionObserver'),'ResizeObserver':c(r'new ResizeObserver'),'MutationObserver':c(r'new MutationObserver'),
   'disconnectedCallback':c(r'disconnectedCallback'),'pagehide':c(r"'pagehide'"),'pageshow':c(r"'pageshow'"),'visibilitychange':c(r"'visibilitychange'"),
   'canvas':c(r'getContext\('),'fetch':c(r'\bfetch\('),'filterCSS':c(r'filter\s*:'),'backdrop':c(r'backdrop-filter'),'infiniteCSS':c(r'infinite')}
pages=collections.OrderedDict()
for r in d: pages.setdefault(r['page'],{})[r['profile']]=r
out=[]
for p,pr in pages.items():
  m=pr.get('mobil',{});ds=pr.get('masaustu',{});tb=pr.get('tablet_yatay',{})
  main=[s for s in m.get('scripts',[]) if re.search(r'/(pages|home)/.+\.js$',s) and 'menu-close' not in s]
  ce=[c for c in m.get('ce',[]) if c not in('n1-header','n1-floating-controls')]
  src_path=main[0].split('/',1)[1] if main else None
  st=stat(src_path) if src_path else None
  def nets(r):
    n=r.get('net',{});return {'mediaRequests':n.get('mediaCount'),'mediaMB':round((n.get('mediaBytes') or 0)/1048576,2),'imageRequests':n.get('imageCount'),
      'imageMB':round((n.get('imageBytes') or 0)/1048576,2),'totalMB':round((n.get('totalBytes') or 0)/1048576,2),'requests':n.get('requests')}
  vids=[]
  for v in m.get('videos',[])+[v for v in ds.get('videos',[]) if v.get('src') not in [x.get('src') for x in m.get('videos',[])]]:
    src=v.get('src') or '';mid=re.search(r'6dbf5e_([0-9a-f]{8})',src)
    vids.append({'class':v.get('cls'),'src':src,'resolution':f"{v.get('w')}x{v.get('h')}" if v.get('w') else None,'durationS':v.get('dur'),
      'preload':v.get('preload'),'autoplay':v.get('autoplay'),'loop':v.get('loop'),'muted':v.get('muted'),'codec':'H.264 (mp4)' if src else None,
      'onMobileLive':src in [x.get('src') for x in m.get('videos',[])],'onDesktopLive':src in [x.get('src') for x in ds.get('videos',[])]})
  imgs=m.get('images',[])
  rec={'page':p,'ceTags':ce,'wixNative':not ce,'serverUrlLive':(CDN+main[0]) if main else None,
   'v14File':('wix-mobile-performance-v14/'+V14[p]) if p in V14 else None,'modules':[s.split('/')[-1] for s in m.get('scripts',[])],
   'videos':vids,'images':{'count':len(imgs),'lazy':sum(1 for i in imgs if i.get('loading')=='lazy'),'withWH':sum(1 for i in imgs if i.get('hasWH')),
     'oversized':[{'src':i['src'][-60:],'natural':f"{i.get('nw')}x{i.get('nh')}",'display':f"{i.get('dw')}x{i.get('dh')}"} for i in imgs if i.get('nw') and i.get('dw') and i['nw']>3.5*max(i['dw'],1)][:12]},
   'scrollTriggersRuntime':{'mobil':m.get('scrollTriggers'),'masaustu':ds.get('scrollTriggers'),'tablet_yatay':tb.get('scrollTriggers')},
   'domNodes':m.get('dom'),'heightPx':m.get('height'),'netLive':{'mobil':nets(m),'tablet_yatay':nets(tb),'masaustu':nets(ds)},'static':st}
  risks=[]
  if st:
    if st['pagehide']==0 and vids:risks.append('pagehide’da video kaynağı bırakılmıyor (canlı)')
    if st['setInterval']:risks.append(f"setInterval ×{st['setInterval']}")
    if st['filterCSS']:risks.append(f"CSS filter ×{st['filterCSS']} (WebKit filter→none geçişi V1.3’te düzeltildi; yeni filtre eklenmedi)")
    if st['backdrop']:risks.append(f"backdrop-filter ×{st['backdrop']}")
  if not ce and vids:risks.append('Wix yerel video (kod kapsamı dışında, Wix Editor’de yönetilir)')
  rec['bfcacheRisks']=risks;out.append(rec)
json.dump({'generated':'2026-11-27','source':'canlı tarama Chromium CDP (mobil 390×844, tablet_yatay 1180×820, masaüstü 1440×900) + statik analiz','note':'medya baytları yalnız tamamlanan istekleri sayar (kısmi video indirmeleri eksik sayılır); istek sayıları için qa/net/*.json','pages':out},open('MEDIA_INVENTORY.json','w'),ensure_ascii=False,indent=1)
print(len(out))
