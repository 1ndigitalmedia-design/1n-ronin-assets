#!/usr/bin/env python3
"""Global Shell V1 derleme: (1) bağımsız bileşen paketi n1-global-shell-v1.js; (2) kariyer modülü v2 ve menüyü taşıyan 11 sayfa dosyasının
yeni sürümleri. Kaynak: Kariyer V1 (wix-career-v1, V1.4 tabanlı). Sayfalarda YALNIZ header v13→v14 ve markup v15→v16 adresleri değişir.
Kullanım: python3 build_all.py <header v14 + markup v16 commit SHA>"""
import os,sys,re
R=os.path.abspath(os.path.join(os.path.dirname(__file__),'..','..'));CGS=sys.argv[1];assert re.fullmatch(r'[0-9a-f]{40}',CGS)
CCR='f40415a3785e0172bdcc58189479253ff10cd17e';CDN='https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@'
GS='wix-global-shell-v1'
t=open(os.path.join(R,GS,'src','n1-global-shell-template.js'),encoding='utf-8').read();assert t.count('{{CGS}}')==1
open(os.path.join(R,GS,'n1-global-shell-v1.js'),'w',encoding='utf-8').write(t.replace('{{CGS}}',CGS));print('yazıldı n1-global-shell-v1.js')
JOBS=[('wix-career-v1/pages/n1-career-v1.js','pages/n1-career-v2.js'),
 ('wix-career-v1/sites/home/n1-site-wix-v660.js','sites/home/n1-site-wix-v661.js'),
 ('wix-career-v1/sites/pages/wix-kreatif-produksiyon-v25/n1-kreatif-produksiyon-v25.js','sites/pages/wix-kreatif-produksiyon-v26/n1-kreatif-produksiyon-v26.js'),
 ('wix-career-v1/sites/pages/wix-e-ticaret-yonetimi-v26/n1-e-ticaret-yonetimi-v26.js','sites/pages/wix-e-ticaret-yonetimi-v27/n1-e-ticaret-yonetimi-v27.js'),
 ('wix-career-v1/sites/pages/wix-sosyal-medya-v29/n1-sosyal-medya-v29.js','sites/pages/wix-sosyal-medya-v30/n1-sosyal-medya-v30.js'),
 ('wix-career-v1/sites/pages/wix-reklam-yonetimi-v25/n1-reklam-yonetimi-v25.js','sites/pages/wix-reklam-yonetimi-v26/n1-reklam-yonetimi-v26.js'),
 ('wix-career-v1/sites/pages/wix-uiux-tasarim-v31/n1-uiux-tasarim-v31.js','sites/pages/wix-uiux-tasarim-v32/n1-uiux-tasarim-v32.js'),
 ('wix-career-v1/sites/pages/wix-yapay-zeka-v4/n1-yapay-zeka-v4.js','sites/pages/wix-yapay-zeka-v5/n1-yapay-zeka-v5.js'),
 ('wix-career-v1/sites/pages/wix-uygulama-gelistirme-v4/n1-uygulama-gelistirme-v4.js','sites/pages/wix-uygulama-gelistirme-v5/n1-uygulama-gelistirme-v5.js'),
 ('wix-career-v1/sites/pages/wix-kisaca-biz-v2/n1-kisaca-biz-v2.js','sites/pages/wix-kisaca-biz-v3/n1-kisaca-biz-v3.js'),
 ('wix-career-v1/sites/pages/wix-markalar-v12/n1-markalar-v12.js','sites/pages/wix-markalar-v13/n1-markalar-v13.js'),
 ('wix-career-v1/sites/pages/wix-yasal-sayfalar-v2/n1-yasal-sayfalar-v2.js','sites/pages/wix-yasal-sayfalar-v3/n1-yasal-sayfalar-v3.js')]
NOTE='/* GLOBAL SHELL V1 (wix-global-shell-v1) — kaynak: %s. Değişen tek şey: Header v14 (İletişim, A7 Prodüksiyon, Uygulama ve Platformlar) ve site işaretlemesi v16 adresleri. */\n'
def once(s,o,n,c=1):
    if s.count(o)!=c: sys.exit('eşleşme %d≠%d %r'%(s.count(o),c,o[:100]))
    return s.replace(o,n)
for src,dst in JOBS:
    s=open(os.path.join(R,src),encoding='utf-8').read(); defs=re.findall(r"customElements\.define\(([^,]+),",s)
    if dst.startswith('sites/home/'):
        s=once(s,CDN+CCR+'/wix-career-v1/modules/n1-header-v13.js',CDN+CGS+'/'+GS+'/modules/n1-header-v14.js',3)
        s=once(s,CDN+CCR+'/wix-career-v1/site/n1-site-markup-v15.js',CDN+CGS+'/'+GS+'/site/n1-site-markup-v16.js')
        s=once(s,r"/n1-site-wix-v660\.js(\?|$)/",r"/n1-site-wix-v661\.js(\?|$)/")
    elif dst.startswith('pages/'):
        s=once(s,"var CCR = '%s';"%CCR,"var CCR = '%s';"%CGS)
        s=once(s,"markup: CCR + '/wix-career-v1/site/n1-site-markup-v15.js',","markup: CCR + '/%s/site/n1-site-markup-v16.js',"%GS)
        s=once(s,"header: CCR + '/wix-career-v1/modules/n1-header-v13.js',","header: CCR + '/%s/modules/n1-header-v14.js',"%GS)
        s=once(s,r"/n1-header-v13\.js|n1-site-markup-v15\.js/",r"/n1-header-v14\.js|n1-site-markup-v16\.js/")
    else:
        s=once(s,"  var CCR = '%s';"%CCR,"  var CCR = '%s';"%CGS)
        s=once(s,"    markup: CCR + '/wix-career-v1/site/n1-site-markup-v15.js',","    markup: CCR + '/%s/site/n1-site-markup-v16.js',"%GS)
        s=once(s,"    header: CCR + '/wix-career-v1/modules/n1-header-v13.js',","    header: CCR + '/%s/modules/n1-header-v14.js',"%GS)
        s=once(s,r"/n1-header-v13\.js|n1-site-markup-v15\.js/",r"/n1-header-v14\.js|n1-site-markup-v16\.js/")
    assert 'n1-header-v13' not in s and 'n1-site-markup-v15' not in s and 'n1-header-v12' not in s,dst
    assert re.findall(r"customElements\.define\(([^,]+),",s)==defs
    s=NOTE%src+s
    o=os.path.join(R,GS,dst);os.makedirs(os.path.dirname(o),exist_ok=True);open(o,'w',encoding='utf-8').write(s);print('yazıldı',dst,len(s.encode()))
