#!/usr/bin/env python3
"""n1-site-markup v15 = v14 (wix-mobile-performance-v14/site/n1-site-markup-v14.js; "Hikâyemizin Devamı" → /kisaca-biz korunur)
 + menü JSON'unda yalnız "İnsan Kaynakları": href /insan-kaynaklari, not "Kariyer", alt menü Açık Pozisyonlar + Staj Programları.
 "Ekibimize Katıl" kaldırılır. Başka hiçbir karakter değişmez."""
import os,sys
R=os.path.abspath(os.path.join(os.path.dirname(__file__),'..','..'))
s=open(os.path.join(R,'wix-mobile-performance-v14','site','n1-site-markup-v14.js'),encoding='utf-8').read()
old='''      \\"title\\": \\"İnsan Kaynakları\\",\\n      \\"note\\": \\"Ekibe katıl\\",\\n      \\"sub\\": [\\n        {\\n          \\"text\\": \\"Ekibimize Katıl\\",\\n          \\"href\\": \\"/ekibimize-katil\\"\\n        },\\n        {\\n          \\"text\\": \\"Açık Pozisyonlar\\",\\n          \\"href\\": \\"/acik-pozisyonlar\\"\\n        }\\n      ]'''
new='''      \\"title\\": \\"İnsan Kaynakları\\",\\n      \\"note\\": \\"Kariyer\\",\\n      \\"href\\": \\"/insan-kaynaklari\\",\\n      \\"sub\\": [\\n        {\\n          \\"text\\": \\"Açık Pozisyonlar\\",\\n          \\"href\\": \\"/acik-pozisyonlar\\"\\n        },\\n        {\\n          \\"text\\": \\"Staj Programları\\",\\n          \\"href\\": \\"/staj-programlari\\"\\n        }\\n      ]'''
if s.count(old)!=1: sys.exit('menü bloğu bulunamadı: %d'%s.count(old))
s=s.replace(old,new)
hdr_old=s.split('\n',1)[0]
if not hdr_old.startswith('/* MOBILE PERFORMANCE V1.4'): sys.exit('başlık beklenmiyor')
s='/* KARİYER V1 — n1-site-markup-v15.js = n1-site-markup-v14.js (V1.4: Hikâyemizin Devamı → /kisaca-biz) + menüde yalnız İnsan Kaynakları: /insan-kaynaklari bağlantısı, alt menü Açık Pozisyonlar + Staj Programları; Ekibimize Katıl kaldırıldı. */\n'+s.split('\n',1)[1]
out=os.path.join(R,'wix-career-v1','site','n1-site-markup-v15.js');open(out,'w',encoding='utf-8').write(s);print('yazıldı',out,len(s))
