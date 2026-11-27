#!/usr/bin/env python3
"""Test anahtarı v14 = v13.2 + ?n1t=kabul14 (V1.4 kabul testi). v13.2 davranışı (A–F, stress2, stress) birebir korunur.
Kullanım: python3 build_switch.py <ACCEPT_SHA>"""
import os,sys
R=os.path.abspath(os.path.join(os.path.dirname(__file__),'..','..'));SHA=sys.argv[1]
s=open(os.path.join(R,'wix-global-stability-v13','wix-custom-code','TEST-SWITCH-v13.2-head.html'),encoding='utf-8').read()
def rep(o,n,c=1):
    global s
    if s.count(o)!=c: sys.exit('eşleşme %d≠%d: %r'%(s.count(o),c,o[:90]))
    s=s.replace(o,n)
rep("<!-- 1N - V1.3 Test Anahtarı (HEAD) · sürüm 1.3.2 (güvenilir stres testi ?n1t=stress2; 1.3.0 / 1.3.1 ile geriye uyumlu)",
    "<!-- 1N - V1.4 Test Anahtarı (HEAD) · sürüm 1.4.0 (V1.4 kabul testi ?n1t=kabul14; 1.3.2 / 1.3.1 / 1.3.0 ile geriye uyumlu)")
rep("     1.3.2 — GÜVENİLİR STRES TESTİ:","     1.4.0 — V1.4 KABUL TESTİ (tek bağlantı, otomatik, ~10–12 dk):  https://www.reklam1n.com/?n1t=kabul14   (ayrıntı: wix-mobile-performance-v14/PHYSICAL_DEVICE_ACCEPTANCE.md)\n     1.3.2 — GÜVENİLİR STRES TESTİ:")
rep("          kv.split(',').forEach(function (x) { if (!x) return; var p = x.split(':'); ss.setItem('n1t-' + p[0], p[1] || '1'); });\n        });\n",
    "          kv.split(',').forEach(function (x) { if (!x) return; var p = x.split(':'); ss.setItem('n1t-' + p[0], p[1] || '1'); });\n        });\n        if (ss.getItem('n1t-kabul14') === '1') ss.setItem('n1k4-auto', '1');   /* bağlantıyla açıldı: kabul testi kendiliğinden başlar */\n")
rep("      if (m && /^(0|off)$/.test(decodeURIComponent(m[1]))) { ['n1s-active', 'n1s-flags', 'n1s-eb', 'n1s-ebdone', 'n1s-ebat', 'n1s-state', 'n1s2-active', 'n1s2-flags', 'n1s2-eb', 'n1s2-ebdone', 'n1s2-ebat', 'n1s2-lease']",
    "      if (m && /^(0|off)$/.test(decodeURIComponent(m[1]))) { ss.removeItem('n1k4-auto'); ['n1s-active', 'n1s-flags', 'n1s-eb', 'n1s-ebdone', 'n1s-ebat', 'n1s-state', 'n1s2-active', 'n1s2-flags', 'n1s2-eb', 'n1s2-ebdone', 'n1s2-ebat', 'n1s2-lease', 'n1k4-active', 'n1k4-flags', 'n1k4-eb', 'n1k4-ebdone', 'n1k4-ebat', 'n1k4-lease']")
rep("      else if (ls.getItem('n1s2-active') === '1') {",
    """      else if (ls.getItem('n1k4-active') === '1') {
        var f4 = {}; try { f4 = JSON.parse(ls.getItem('n1k4-flags') || '{}'); } catch (e) {}
        Object.keys(ss).forEach(function (k) { if (k.indexOf('n1t-') === 0 && k !== 'n1t-log') ss.removeItem(k); });
        ss.setItem('n1t', '1'); ss.setItem('n1t-kabul14', '1'); Object.keys(f4).forEach(function (k) { ss.setItem('n1t-' + k, f4[k]); });
      }
      else if (ls.getItem('n1s2-active') === '1') {""")
rep("if ((ss.getItem('n1t-stress') === '1' || ss.getItem('n1t-stress2') === '1') && !/","if ((ss.getItem('n1t-stress') === '1' || ss.getItem('n1t-stress2') === '1' || ss.getItem('n1t-kabul14') === '1') && !/")
rep("      stress2: CDN + 'fca86234d3d9a2904d17d1ee218c3e3f049f19a4/wix-global-stability-v13/stress/n1-stress-v2.js',",
    "      kabul14: CDN + '%s/wix-mobile-performance-v14/acceptance/n1-accept-v14.js',\n      stress2: CDN + 'fca86234d3d9a2904d17d1ee218c3e3f049f19a4/wix-global-stability-v13/stress/n1-stress-v2.js',"%SHA)
rep("window.__n1Test = { version: '1.3.2',","window.__n1Test = { version: '1.4.0',")
i=s.index("    if (F('stress2') === '1') {");j=s.index("      add(URL.stress2);\n    }\n",i)+len("      add(URL.stress2);\n    }\n")
blk=s[i:j]
k=blk.replace("F('stress2')","F('kabul14')").replace("'n1s2-","'n1k4-").replace("URL.stress2","URL.kabul14").replace("var E2 = window.__n1sErr","var E4 = window.__n1sErr").replace("E2.","E4.").replace("eb2","eb4").replace("nv ","nv4 ").replace("nv ===","nv4 ===").replace("here2","here4")
k=k.replace("/* 1.3.2","/* 1.4.0 kabul testi (1.3.2 ile aynı çekirdek, ayrı depolama anahtarları n1k4-*)")
s=s[:j]+"\n    /* 1.4.0 V1.4 kabul testi: aynı çekirdek, ayrı depolama anahtarları (n1k4-*) */\n"+k+s[j:]
rep("'ana v658: ' + (document.querySelector('script[src*=\"n1-video-m5-v13\"]') ? 'EVET' : (home ? 'hayır' : '-')) +",
    "'video m5: ' + (performance.getEntriesByType('resource').some(function (e) { return /n1-video-m5-v14/.test(e.name); }) ? 'v14' : (document.querySelector('script[src*=\"n1-video-m5-v13\"]') ? 'v13' : (home ? 'hayır' : '-'))) + '  V1.4 sayfa: ' + (performance.getEntriesByType('resource').some(function (e) { return /wix-mobile-performance-v14\\/pages\\//.test(e.name); }) ? 'EVET' : '-') +")
out=os.path.join(R,'wix-mobile-performance-v14','wix-custom-code','TEST-SWITCH-v14-head.html')
open(out,'w',encoding='utf-8').write(s);print('yazıldı',out,len(s))
