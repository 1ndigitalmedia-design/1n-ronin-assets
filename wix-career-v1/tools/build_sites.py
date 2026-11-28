#!/usr/bin/env python3
"""Kariyer menüsünü bütün kapsam içi Custom Element sayfalarına taşır: her kaynak dosyada YALNIZ header ve site işaretlemesi
adresleri değişir (header v12 → v13, markup v12/v14 → v15, ikisi de <CCR> commit'inde). Etiketler, öznitelikler, içerik, medya ve
V1.4 optimizasyonları aynen kalır. Kaynaklar: V1.4 dalındaki en güncel sürümler (ana sayfa v659 ve 7 hizmet sayfası V1.4; Kısaca Biz,
Markalar, Yasal sayfalar canlı V1.2 dosyaları). Kullanım: python3 build_sites.py <CCR>"""
import os,sys,re
R=os.path.abspath(os.path.join(os.path.dirname(__file__),'..','..'));CCR=sys.argv[1];assert re.fullmatch(r'[0-9a-f]{40}',CCR)
CDN='https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@'
H12=CDN+'162599ec580db98d848cf6670bcde7ee30bf97f5/wix-global-menu-v12/modules/n1-header-v12.js'
H13=CDN+CCR+'/wix-career-v1/modules/n1-header-v13.js'
M15=CDN+CCR+'/wix-career-v1/site/n1-site-markup-v15.js'
NOTE='/* KARİYER V1 (wix-career-v1/sites) — kaynak: %s. Değişen tek şey: Header v13 (İnsan Kaynakları bağlantı + ayrı alt menü düğmesi) ve site işaretlemesi v15 (kariyer menüsü) adresleri. */\n'
JOBS=[ # (kaynak, hedef klasör/dosya, etiket)
 ('wix-mobile-performance-v14/home/n1-site-wix-v659.js','home/n1-site-wix-v660.js','n1-site-v1'),
 ('wix-mobile-performance-v14/pages/wix-kreatif-produksiyon-v24/n1-kreatif-produksiyon-v24.js','pages/wix-kreatif-produksiyon-v25/n1-kreatif-produksiyon-v25.js','n1-kreatif-produksiyon-v23'),
 ('wix-mobile-performance-v14/pages/wix-e-ticaret-yonetimi-v25/n1-e-ticaret-yonetimi-v25.js','pages/wix-e-ticaret-yonetimi-v26/n1-e-ticaret-yonetimi-v26.js','n1-e-ticaret-yonetimi-v23'),
 ('wix-mobile-performance-v14/pages/wix-sosyal-medya-v28/n1-sosyal-medya-v28.js','pages/wix-sosyal-medya-v29/n1-sosyal-medya-v29.js','n1-sosyal-medya-v27'),
 ('wix-mobile-performance-v14/pages/wix-reklam-yonetimi-v24/n1-reklam-yonetimi-v24.js','pages/wix-reklam-yonetimi-v25/n1-reklam-yonetimi-v25.js','n1-reklam-yonetimi-v23'),
 ('wix-mobile-performance-v14/pages/wix-uiux-tasarim-v30/n1-uiux-tasarim-v30.js','pages/wix-uiux-tasarim-v31/n1-uiux-tasarim-v31.js','n1-uiux-tasarim-v28'),
 ('wix-mobile-performance-v14/pages/wix-yapay-zeka-v3/n1-yapay-zeka-v3.js','pages/wix-yapay-zeka-v4/n1-yapay-zeka-v4.js','n1-yapay-zeka-v2'),
 ('wix-mobile-performance-v14/pages/wix-uygulama-gelistirme-v3/n1-uygulama-gelistirme-v3.js','pages/wix-uygulama-gelistirme-v4/n1-uygulama-gelistirme-v4.js','n1-uygulama-gelistirme-v2'),
 ('wix-global-menu-v12/pages/wix-kisaca-biz-v1/n1-kisaca-biz-v1.js','pages/wix-kisaca-biz-v2/n1-kisaca-biz-v2.js','n1-kisaca-biz-v1'),
 ('wix-global-menu-v12/pages/wix-markalar-v1/n1-markalar-v11.js','pages/wix-markalar-v12/n1-markalar-v12.js','n1-markalar-v11'),
 ('wix-global-menu-v12/pages/wix-yasal-sayfalar-v1/n1-yasal-sayfalar-v1.js','pages/wix-yasal-sayfalar-v2/n1-yasal-sayfalar-v2.js',None),
]
def once(s,o,n,c=1):
    if s.count(o)!=c: sys.exit('eşleşme %d≠%d: %r'%(s.count(o),c,o[:110]))
    return s.replace(o,n)
for src,dst,tag in JOBS:
    s=open(os.path.join(R,src),encoding='utf-8').read(); defs=re.findall(r"customElements\.define\(([^,]+),",s)
    if dst.startswith('home/'):
        s=once(s,H12,H13,3)
        s=once(s,CDN+'fbc905e6b07721d26a78eb84df56a076693ad7e2/wix-mobile-performance-v14/site/n1-site-markup-v14.js',M15)
        s=once(s,r"/n1-site-wix-v659\.js(\?|$)/",r"/n1-site-wix-v660\.js(\?|$)/")
    else:
        s=once(s,"    markup: CM12 + '/wix-global-menu-v12/site/n1-site-markup-v12.js',","    markup: CCR + '/wix-career-v1/site/n1-site-markup-v15.js',")
        s=once(s,"    header: CM12 + '/wix-global-menu-v12/modules/n1-header-v12.js',","    header: CCR + '/wix-career-v1/modules/n1-header-v13.js',")
        m=re.search(r"\n(  var CM12 = '162599ec580db98d848cf6670bcde7ee30bf97f5';[^\n]*)\n",s); assert m,src
        s=s.replace(m.group(0),m.group(0)+"  var CCR = '%s';   /* KARİYER V1: header v13 + site işaretlemesi v15 (İnsan Kaynakları menüsü) */\n"%CCR,1)
        s=once(s,r"/n1-header-v12\.js|n1-site-markup-v12\.js/",r"/n1-header-v13\.js|n1-site-markup-v15\.js/")
    assert 'n1-header-v12' not in s and 'n1-site-markup-v12.js' not in s and 'n1-site-markup-v14.js' not in s, src
    assert re.findall(r"customElements\.define\(([^,]+),",s)==defs
    s=NOTE%(src)+s
    out=os.path.join(R,'wix-career-v1','sites',dst); os.makedirs(os.path.dirname(out),exist_ok=True)
    open(out,'w',encoding='utf-8').write(s); print('yazıldı',dst,len(s.encode()),'etiket',tag or 'yasal (5 etiket)')
