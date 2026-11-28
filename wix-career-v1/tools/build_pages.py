#!/usr/bin/env python3
"""Kariyer modülü n1-career-v1.js üretici: src/n1-career-template.js + src/career-content.js + Kısaca Biz v1 onaylı yardımcıları
(n1MobileRepair … loadCss, birebir; yalnız yeniden deneme kalıbı header v13 / markup v15 adlarına uyarlanır).
Kullanım: python3 build_pages.py <header v13 + markup v15 commit SHA>"""
import os,sys,re
R=os.path.abspath(os.path.join(os.path.dirname(__file__),'..','..'));CCR=sys.argv[1]
assert re.fullmatch(r'[0-9a-f]{40}',CCR)
kb=open(os.path.join(R,'wix-global-menu-v12','pages','wix-kisaca-biz-v1','n1-kisaca-biz-v1.js'),encoding='utf-8').read().split('\n')
def line(prefix):
    m=[l for l in kb if l.startswith(prefix)]; assert len(m)==1,prefix; return m[0]
helpers=[line('  function n1MobileRepair()'),line('  function n1Deadline('),line('  function n1Optional('),line('  function n1Listen(')]
i=kb.index('  function loadJs(src, ready, fresh) {'); j=kb.index('  function loadCss(href) {')
k=j
while kb[k]!='  }': k+=1
block=kb[i:k+1]
helpers=helpers+block
H='\n'.join(helpers)
old="/n1-header-v12\\.js|n1-site-markup-v12\\.js/"
assert H.count(old)==1; H=H.replace(old,"/n1-header-v13\\.js|n1-site-markup-v15\\.js/")
t=open(os.path.join(R,'wix-career-v1','src','n1-career-template.js'),encoding='utf-8').read()
c=open(os.path.join(R,'wix-career-v1','src','career-content.js'),encoding='utf-8').read().rstrip('\n')
for a,b in [('{{CCR}}',CCR),('{{CONTENT}}',c),('{{HELPERS}}',H)]:
    assert t.count(a)==1,a; t=t.replace(a,b)
out=os.path.join(R,'wix-career-v1','pages','n1-career-v1.js');open(out,'w',encoding='utf-8').write(t);print('yazıldı',out,len(t.encode()))
