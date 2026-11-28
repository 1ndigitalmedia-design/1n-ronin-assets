#!/usr/bin/env python3
"""n1-site-markup v16 = v15 (wix-career-v1/site/n1-site-markup-v15.js; Hikâyemizin Devamı → /kisaca-biz, kariyer menüsü) +
menü verisine İletişim satırı, A7 Prodüksiyon ve Uygulama ve Platformlar. Header JSON dışında hiçbir karakter değişmez
(dizge çöz → yalnız <n1-header> JSON'u değiştir → aynı kodlamayla yaz; çözme/kodlama birebir doğrulanır)."""
import os,sys,json,re
R=os.path.abspath(os.path.join(os.path.dirname(__file__),'..','..'));ASSET=sys.argv[1]
LOGO='https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@%s/wix-global-shell-v1/assets/platforms/'%ASSET
src=open(os.path.join(R,'wix-career-v1','site','n1-site-markup-v15.js'),encoding='utf-8').read()
head,body=src.split('\n',1)
m=re.match(r'(?s)(.*?window\.N1_SITE_MARKUP = )(".*")(;\s*)$',body); assert m
lit=m.group(2); val=json.loads(lit)
enc=lambda v: json.dumps(v,ensure_ascii=False)
assert enc(val)==lit, 'birebir kodlama doğrulanamadı'
j=re.search(r'(<n1-header[^>]*>\s*<script type="application/json">)(.*?)(</script>)',val,re.S); assert j
menu=json.loads(j.group(2))
assert [i['title'] for i in menu['items']]==['Kısaca Biz','Hizmetler','Markalar','Akademi','İnsan Kaynakları']
menu['items'].append({"title":"İletişim","note":"Bize ulaşın","href":"/iletisim"})
menu['a7']={"text":"A7 Prodüksiyon","note":"a7-1n.com","href":"https://www.a7-1n.com/a7-produksiyon"}
menu['platforms']={"title":"Uygulama ve Platformlar","items":[
 {"name":"ZEYP","href":"https://www.zeyp.com.tr/","img":LOGO+"01-zeyp"},
 {"name":"Market — Canlı Piyasalar","href":"https://www.carsialtin.com/faprika/canli-piyasalar/","img":LOGO+"02-market"},
 {"name":"Hemen Tıkla","href":"https://www.hementik.la/","img":LOGO+"03-hemen-tikla"},
 {"name":"1N Intelligence","href":"https://www.reklam1n.com/intelligence","img":LOGO+"04-intelligence"}]}
newjson=json.dumps(menu,ensure_ascii=False,indent=2)
val2=val[:j.start(2)]+'\n'+newjson+'\n'+val[j.end(2):]
out_src='/* GLOBAL SHELL V1 — n1-site-markup-v16.js = v15 (kariyer menüsü, Hikâyemizin Devamı → /kisaca-biz) + menü verisinde İletişim, A7 Prodüksiyon, Uygulama ve Platformlar. Header JSON dışında değişiklik yok. */\n'+m.group(1)+enc(val2)+m.group(3)
o=os.path.join(R,'wix-global-shell-v1','site','n1-site-markup-v16.js');os.makedirs(os.path.dirname(o),exist_ok=True);open(o,'w',encoding='utf-8').write(out_src)
# yalnız header JSON'unun değiştiğini doğrula
a=val[:j.start(2)]+val[j.end(2):]; b=val2[:j.start(2)]+val2[j.start(2)+len(newjson)+2:]
assert a==b; print('yazıldı',o,len(out_src),'öğeler',[i['title'] for i in menu['items']])
