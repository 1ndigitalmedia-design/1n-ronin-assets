#!/usr/bin/env python3
"""Global Menü V2.2 derleme. Kaynak: @f661795 (V2.1) yayın dosyaları. Değişen TEK şey: header v15 → v16 ve menü verisi v16 → v17 adresleri.
Kullanım: python3 build_v22.py <header v16 + menü verisi v17 commit SHA>"""
import os,sys,re
H=os.path.abspath(os.path.join(os.path.dirname(__file__),'..'));C=sys.argv[1];assert re.fullmatch(r'[0-9a-f]{40}',C)
M='9bbcefd65becbc196baebea26600060b01af406c';H15='6df38aa58398670c8e2617632ef88b9895bfd4e9'
CDN='https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@';GS='wix-global-shell-v1'
def once(s,o,n,c=1):
    if s.count(o)!=c: sys.exit('eşleşme %d≠%d %r'%(s.count(o),c,o[:100]))
    return s.replace(o,n)
s=open(os.path.join(H,'n1-global-shell-v1-1.js'),encoding='utf-8').read(); defs=re.findall(r"customElements\.define\(([^,]+),",s)
s=once(s,"  var VERSION = '1.1.0';   /* V2.1: header v15 (tek renkli kompakt platform logoları) */","  var VERSION = '1.2.0';   /* V2.2: header v16 + menü verisi v17 (Uygulama ve Platformlar yerine 1N Intelligence kartı) */")
s=once(s,"    markup: CGS + '/wix-global-shell-v1/site/n1-site-markup-v16.js',","    markup: '%s/wix-global-shell-v1/site/n1-site-markup-v17.js',"%C)
s=once(s,"    header: '%s/wix-global-shell-v1/modules/n1-header-v15.js',"%H15,"    header: '%s/wix-global-shell-v1/modules/n1-header-v16.js',"%C)
assert 'n1-header-v15' not in s and 'markup-v16' not in s and re.findall(r"customElements\.define\(([^,]+),",s)==defs
open(os.path.join(H,'n1-global-shell-v1-2.js'),'w',encoding='utf-8').write(s); print('yazıldı n1-global-shell-v1-2.js',len(s.encode()))
JOBS=[('pages/n1-career-v3.js','pages/n1-career-v4.js'),('sites/home/n1-site-wix-v662.js','sites/home/n1-site-wix-v663.js')]+[
 ('sites/pages/wix-%s-v%d/n1-%s-v%d.js'%(n,v,n,v),'sites/pages/wix-%s-v%d/n1-%s-v%d.js'%(n,v+1,n,v+1)) for n,v in
 [('kreatif-produksiyon',27),('e-ticaret-yonetimi',28),('sosyal-medya',31),('reklam-yonetimi',27),('uiux-tasarim',33),('yapay-zeka',6),('uygulama-gelistirme',6),('kisaca-biz',4),('markalar',14),('yasal-sayfalar',4)]]
NOTE='/* GLOBAL MENÜ V2.2 (wix-global-shell-v1) — kaynak: %s @f661795. Değişen tek şey: Header v15 → v16 ve menü verisi v16 → v17 adresleri (1N Intelligence kartı). */\n'
for src,dst in JOBS:
    s=open(os.path.join(H,src),encoding='utf-8').read(); defs=re.findall(r"customElements\.define\(([^,]+),",s)
    assert s.startswith('/* GLOBAL MENÜ V2.1'); s=s.split('\n',1)[1]
    if dst.startswith('sites/home/'):
        s=once(s,CDN+H15+'/'+GS+'/modules/n1-header-v15.js',CDN+C+'/'+GS+'/modules/n1-header-v16.js',3)
        s=once(s,CDN+M+'/'+GS+'/site/n1-site-markup-v16.js',CDN+C+'/'+GS+'/site/n1-site-markup-v17.js')
        s=once(s,r"/n1-site-wix-v662\.js(\?|$)/",r"/n1-site-wix-v663\.js(\?|$)/")
    else:
        s=once(s,"    markup: CCR + '/%s/site/n1-site-markup-v16.js',"%GS,"    markup: '%s/%s/site/n1-site-markup-v17.js',"%(C,GS))
        s=once(s,"    header: '%s/%s/modules/n1-header-v15.js',"%(H15,GS),"    header: '%s/%s/modules/n1-header-v16.js',"%(C,GS))
        s=once(s,r"/n1-header-v15\.js|n1-site-markup-v16\.js/",r"/n1-header-v16\.js|n1-site-markup-v17\.js/")
    assert 'n1-header-v15' not in s and 'n1-site-markup-v16' not in s,dst
    assert re.findall(r"customElements\.define\(([^,]+),",s)==defs
    s=NOTE%src+s
    o=os.path.join(H,dst);os.makedirs(os.path.dirname(o),exist_ok=True);open(o,'w',encoding='utf-8').write(s);print('yazıldı',dst,len(s.encode()))
