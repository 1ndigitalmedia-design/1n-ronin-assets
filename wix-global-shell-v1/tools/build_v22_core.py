# GLOBAL MENÜ V2.2: header v16 = v15 − "Uygulama ve Platformlar" kartı + "1N Intelligence" kartı (A7 Prodüksiyon kartıyla aynı sınıflar, aynı sekme)
#                  menü verisi v17 = v16 − platforms + intel. Başka hiçbir şey değişmez (doğrulanır). Logo dosyaları depoda kalır.
import os,re,json,difflib
H=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..')
INTEL={"text":"1N Intelligence","note":"DİJİTAL ZEKA PLATFORMU","href":"https://www.reklam1n.com/intelligence"}
# ---------- header v16 ----------
s=open(os.path.join(H,'modules','n1-header-v15.js'),encoding='utf-8').read(); v15=s
def rep(a,b,c=1):
    global s; assert s.count(a)==c,(s.count(a),a[:90]); s=s.replace(a,b)
rep(' * n1-header — 1N Digital Media header (v15 · GLOBAL MENÜ V2.1; v14 tabanı)\n',
    ' * n1-header — 1N Digital Media header (v16 · GLOBAL MENÜ V2.2; v15 tabanı)\n * v16: "Uygulama ve Platformlar" kartı kaldırıldı; yerine A7 Prodüksiyon kartıyla aynı tasarımda "1N Intelligence" kartı (menü verisi: intel; aynı sekme).\n *   Kartlar: Başlangıca Dön · A7 Prodüksiyon · 1N Intelligence. Diğer her şey v15 ile aynıdır.\n')
# gömülü platform simgeleri kaldırılır
s,n=re.subn(r'\n  /\* v15: tek renkli platform logoları[^\n]*\*/\n  const PLAT_ICONS = \{.*?\};',"",s,flags=re.S); assert n==1
# platform kartı → Intelligence kartı
b=s.index("${menu.platforms &&"); e=s.index("</ul></div>` : ''}",b)+len("</ul></div>` : ''}")
ARROW='<span class="n1h-ext"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" aria-hidden="true" focusable="false"><path d="M5 11L11 5M6 5h5v5"/></svg></span>'
assert s.count(ARROW)==1
card="${menu.intel && menu.intel.href ? `<div class=\"n1h-card n1h-a7card n1h-intelcard\" style=\"--i:3\"><a class=\"n1h-a7 n1h-intel\" href=\"${esc(menu.intel.href)}\"><span><b>${esc(menu.intel.text)}</b>${menu.intel.note ? `<small>${esc(menu.intel.note)}</small>` : ''}</span>"+ARROW+"</a></div>` : ''}"
s=s[:b]+card+s[e:]
# varsayılan menü verisi (header içi yedek): platforms → intel
b=s.index('    "platforms": {'); e=s.index('\n    }\n  };',b)+len('\n    }')
s=s[:b]+'    "intel": '+json.dumps(INTEL,ensure_ascii=False).replace('{"','{ "').replace('"}','" }').replace('", "','", "')+s[e:]
# v15 platform CSS'i kaldırılır (kart artık yok)
lines=s.split('\n'); out=[]
for l in lines:
    if re.search(r'n1h-plat',l) and not l.startswith('@media (prefers-reduced-motion'):
        if l.startswith('@media (max-width:1024px){.n1h-plat') or l.startswith('@media (max-width:767px){.n1h-plats') or l.startswith('@media (hover:hover) and (pointer:fine){.n1h-plat') or l.lstrip().startswith(('.n1h-plat','.n1h-panel.n1-inner-panel .n1h-platcard','.n1h-panel .n1h-platcard')) or l.startswith('/* v15: kompakt'):
            continue
    out.append(l)
s='\n'.join(out)
rep('@media (prefers-reduced-motion: reduce){.n1h-plat,.n1h-a7,','@media (prefers-reduced-motion: reduce){.n1h-a7,')
assert 'n1h-plat' not in s and 'PLAT_ICONS' not in s, [l for l in s.split('\n') if 'n1h-plat' in l][:3]
open(os.path.join(H,'modules','n1-header-v16.js'),'w',encoding='utf-8').write(s)
d=[l for l in difflib.unified_diff(v15.split('\n'),s.split('\n'),lineterm='',n=0) if l[:1] in '+-' and not l.startswith(('+++','---'))]
print('header v16:',len(s),'B; değişen satır',len(d))
for l in d: print('   ',l[:150])
# ---------- menü verisi v17 ----------
src=open(os.path.join(H,'site','n1-site-markup-v16.js'),encoding='utf-8').read()
head,body=src.split('\n',1)
m=re.match(r'(?s)(.*?window\.N1_SITE_MARKUP = )(".*")(;\s*)$',body); assert m
lit=m.group(2); val=json.loads(lit); enc=lambda v: json.dumps(v,ensure_ascii=False); assert enc(val)==lit
j=re.search(r'(<n1-header[^>]*>\s*<script type="application/json">)(.*?)(</script>)',val,re.S); assert j
menu=json.loads(j.group(2)); assert 'platforms' in menu and 'a7' in menu
keys=list(menu); menu2={}
for k in keys:
    if k=='platforms': menu2['intel']=INTEL
    else: menu2[k]=menu[k]
newjson=json.dumps(menu2,ensure_ascii=False,indent=2)
val2=val[:j.start(2)]+'\n'+newjson+'\n'+val[j.end(2):]
a=val[:j.start(2)]+val[j.end(2):]; b2=val2[:j.start(2)]+val2[j.start(2)+len(newjson)+2:]; assert a==b2
out='/* GLOBAL MENÜ V2.2 — n1-site-markup-v17.js = v16 + menü verisinde "Uygulama ve Platformlar" yerine "1N Intelligence" kartı (intel). Header JSON dışında değişiklik yok. */\n'+m.group(1)+enc(val2)+m.group(3)
open(os.path.join(H,'site','n1-site-markup-v17.js'),'w',encoding='utf-8').write(out)
print('markup v17:',len(out),'B; anahtarlar',list(menu2))
