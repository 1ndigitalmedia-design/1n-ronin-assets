# header v15 (GLOBAL MENÜ V2.1) = header v14 + yalnız "Uygulama ve Platformlar" bölümünün görsel revizyonu.
# Kesin eşleşmeli değiştirmeler; başka hiçbir satır değişmez (sonda doğrulanır).
# Logolar: assets/platforms/mono/manifest.json'daki tek renkli SVG sembolleri gömülür (ek istek yok, fill=currentColor).
import os,json,re,difflib
H=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..')
src=open(os.path.join(H,'modules','n1-header-v14.js')).read()
man=json.load(open(os.path.join(H,'assets','platforms','mono','manifest.json')))
def svg(m): return '<svg viewBox="%s" fill="currentColor" aria-hidden="true" focusable="false">%s</svg>'%(m['viewBox'],''.join('<g transform="%s"%s><path d="%s"/></g>'%(p['tr'],'' if p['op']==1 else ' fill-opacity="%s"'%p['op'],p['d']) for p in m['paths']))
ICONS={k:svg(v) for k,v in man.items()}
R=[]
def rep(a,b):
    global src
    assert src.count(a)==1,('bulunamadı/çoklu',a[:80]); src=src.replace(a,b); R.append((a,b))
rep(' * n1-header — 1N Digital Media header (v14 · GLOBAL MENÜ V2; v13 tabanı)\n',
    ' * n1-header — 1N Digital Media header (v15 · GLOBAL MENÜ V2.1; v14 tabanı)\n * v15: yalnız "Uygulama ve Platformlar": tek renkli gömülü SVG logolar (#BDBFB9, hover/odak #A2FF00), ortak koyu kutu #1A1C1B,\n *   kompakt ölçü (masaüstü 56 / tablet 52 / mobil 48 px kutu), başlıkla sola hizalı. Diğer her şey v14 ile aynıdır.\n')
rep(""".n1h-platcard{padding:10px 10px 12px}
.n1h-platcard h3{margin:6px 6px 10px;font:500 11px/1 Barlow,Arial,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:rgba(236,235,230,.45)}
.n1h-plats{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(4,minmax(0,96px));justify-content:start;gap:8px}   /* kutu en çok 96 px: geniş tablet panelinde logolar büyümez */
.n1h-plats li{min-width:0}
.n1h-plat{position:relative;display:block;aspect-ratio:1/1;min-width:44px;min-height:44px;border-radius:9px;overflow:hidden;background:#1a1d1b;outline:none;transition:transform .35s ${EASE},box-shadow .3s ease}
.n1h-plat img{display:block;width:100%;height:100%;object-fit:cover;border-radius:inherit}
.n1h-plat:hover{transform:translateY(-2px)}
.n1h-plat:focus-visible{box-shadow:0 0 0 2px #111312,0 0 0 4px #ecebe6}
""",""".n1h-platcard{padding:14px 16px 16px}
.n1h-platcard h3{margin:0 0 11px;font:500 11px/1 Barlow,Arial,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:rgba(236,235,230,.45)}
/* v15: kompakt tek renkli platform logoları — kutular sola hizalı, kart genişliğine yayılmaz */
.n1h-plats{list-style:none;margin:0;padding:0;display:flex;flex-wrap:nowrap;justify-content:flex-start;gap:10px}
.n1h-plats li{flex:0 0 auto}
.n1h-plat{--pb:56px;--pi:32px;position:relative;display:grid;place-items:center;width:var(--pb);height:var(--pb);min-width:44px;min-height:44px;box-sizing:border-box;border-radius:8px;background:#1A1C1B;color:#BDBFB9;box-shadow:inset 0 0 0 1px rgba(189,191,185,.14);outline:none;transition:color .2s ease,box-shadow .2s ease}
.n1h-plat svg{display:block;width:var(--pi);height:var(--pi);pointer-events:none}
.n1h-plat img{display:block;width:var(--pi);height:var(--pi);object-fit:contain}
@media (hover:hover) and (pointer:fine){.n1h-plat:hover{color:#A2FF00;box-shadow:inset 0 0 0 1px rgba(162,255,0,.32)}}
.n1h-plat:focus-visible{color:#A2FF00;box-shadow:inset 0 0 0 1px rgba(162,255,0,.32),0 0 0 2px #111312,0 0 0 4px #A2FF00}
@media (max-width:1024px){.n1h-plat{--pb:52px;--pi:30px}}
@media (max-width:767px){.n1h-plats{gap:8px}.n1h-plat{--pb:48px;--pi:28px}}
""")
rep("""  .n1h-platcard{padding:8px 10px 10px}
  .n1h-platcard h3{margin:4px 6px 8px}
  .n1h-plats{grid-template-columns:repeat(4,64px);justify-content:space-between}
""","""  .n1h-platcard{padding:11px 16px 12px}
  .n1h-platcard h3{margin:0 0 10px}
""")
old='return `<li><a class="n1h-plat" href="${esc(pl.href)}"${ext ? \' target="_blank" rel="noopener noreferrer"\' : \'\'} aria-label="${esc(pl.name)}${ext ? \' (yeni sekmede açılır)\' : \'\'}"><img alt="" width="160" height="160" decoding="async" data-src="${esc(pl.img)}-160.webp" data-srcset="${esc(pl.img)}-160.webp 160w, ${esc(pl.img)}-320.webp 320w" sizes="96px"></a></li>`; }'
new='const ico = PLAT_ICONS[String(pl.icon || pl.img || \'\').split(\'/\').pop()]; return `<li><a class="n1h-plat" href="${esc(pl.href)}"${ext ? \' target="_blank" rel="noopener noreferrer"\' : \'\'} aria-label="${esc(pl.name)}${ext ? \' (yeni sekmede açılır)\' : \'\'}">${ico || `<img alt="" width="160" height="160" decoding="async" data-src="${esc(pl.img)}-160.webp" data-srcset="${esc(pl.img)}-160.webp 160w, ${esc(pl.img)}-320.webp 320w" sizes="32px">`}</a></li>`; }'
rep(old,new)
# simge sözlüğü: ilk "const " bildiriminden önce eklenir (modül kapsamı)
m=re.search(r'\n(  )?const [A-Z_]+ = ',src); assert m
ins='\n  /* v15: tek renkli platform logoları (tools/build_platform_mono.py → assets/platforms/mono/*.svg; menü verisindeki görsel adıyla eşleşir) */\n  const PLAT_ICONS = '+json.dumps(ICONS,ensure_ascii=False)+';'
src=src[:m.start()]+ins+src[m.start():]
open(os.path.join(H,'modules','n1-header-v15.js'),'w').write(src)
# doğrulama: v14 ile fark yalnız yukarıdakiler
a=open(os.path.join(H,'modules','n1-header-v14.js')).read().splitlines(); b=src.splitlines()
ch=[l for l in difflib.unified_diff(a,b,lineterm='',n=0) if l[:1] in '+-' and not l.startswith(('+++','---'))]
print('değişen satır:',len(ch),'boyut',len(src))
