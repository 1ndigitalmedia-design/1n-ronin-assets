#!/usr/bin/env python3
"""Global Menü V2.1 derleme. Kaynak: @144d964 yayın dosyaları (bu klasördeki V2 sürümleri).
Değişen TEK şey: header adresi v14 (@9bbcefd) → v15 (<H15 commit>). Menü verisi v16 (@9bbcefd), footer, WhatsApp, V1.4, Ronin aynı.
Kullanım: python3 build_v21.py <header v15 commit SHA>"""
import os,sys,re
H=os.path.abspath(os.path.join(os.path.dirname(__file__),'..'));H15=sys.argv[1];assert re.fullmatch(r'[0-9a-f]{40}',H15)
M='9bbcefd65becbc196baebea26600060b01af406c';CDN='https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@';GS='wix-global-shell-v1'
OLDH=CDN+M+'/'+GS+'/modules/n1-header-v14.js'; NEWH=CDN+H15+'/'+GS+'/modules/n1-header-v15.js'
def once(s,o,n,c=1):
    if s.count(o)!=c: sys.exit('eşleşme %d≠%d %r'%(s.count(o),c,o[:100]))
    return s.replace(o,n)
# 1) bağımsız bileşen paketi v1.1 (aynı üç etiket)
s=open(os.path.join(H,'n1-global-shell-v1.js'),encoding='utf-8').read(); defs=re.findall(r"customElements\.define\(([^,]+),",s)
s=once(s,"  var VERSION = '1.0.0';","  var VERSION = '1.1.0';   /* V2.1: header v15 (tek renkli kompakt platform logoları) */")
s=once(s,"    header: CGS + '/wix-global-shell-v1/modules/n1-header-v14.js',","    header: '%s/wix-global-shell-v1/modules/n1-header-v15.js',"%H15)
assert 'n1-header-v14' not in s
open(os.path.join(H,'n1-global-shell-v1-1.js'),'w',encoding='utf-8').write(s); print('yazıldı n1-global-shell-v1-1.js',len(s.encode()))
JOBS=[('pages/n1-career-v2.js','pages/n1-career-v3.js'),('sites/home/n1-site-wix-v661.js','sites/home/n1-site-wix-v662.js')]+[
 ('sites/pages/wix-%s-v%d/n1-%s-v%d.js'%(n,v,n,v),'sites/pages/wix-%s-v%d/n1-%s-v%d.js'%(n,v+1,n,v+1)) for n,v in
 [('kreatif-produksiyon',26),('e-ticaret-yonetimi',27),('sosyal-medya',30),('reklam-yonetimi',26),('uiux-tasarim',32),('yapay-zeka',5),('uygulama-gelistirme',5),('kisaca-biz',3),('markalar',13),('yasal-sayfalar',3)]]
NOTE='/* GLOBAL MENÜ V2.1 (wix-global-shell-v1) — kaynak: %s @144d964. Değişen tek şey: Header v14 → v15 adresi (tek renkli kompakt platform logoları). */\n'
for src,dst in JOBS:
    s=open(os.path.join(H,src),encoding='utf-8').read(); defs=re.findall(r"customElements\.define\(([^,]+),",s)
    s=s.split('\n',1)[1] if s.startswith('/* GLOBAL SHELL V1') else s
    if dst.startswith('sites/home/'):
        s=once(s,OLDH,NEWH,3); s=once(s,r"/n1-site-wix-v661\.js(\?|$)/",r"/n1-site-wix-v662\.js(\?|$)/")
    else:
        ind='    '
        s=once(s,ind+"header: CCR + '/%s/modules/n1-header-v14.js',"%GS,ind+"header: '%s/%s/modules/n1-header-v15.js',"%(H15,GS))
        s=once(s,r"/n1-header-v14\.js|n1-site-markup-v16\.js/",r"/n1-header-v15\.js|n1-site-markup-v16\.js/")
    assert 'n1-header-v14' not in s and 'n1-site-markup-v16.js' in s,dst
    assert re.findall(r"customElements\.define\(([^,]+),",s)==defs
    s=NOTE%src+s
    o=os.path.join(H,dst);os.makedirs(os.path.dirname(o),exist_ok=True);open(o,'w',encoding='utf-8').write(s);print('yazıldı',dst,len(s.encode()))
