# Tek kaynak: Global Shell V1 yayın adresleri (SERVER_URLS / DEPLOYMENT / ROLLBACK üreticileri bunu içe aktarır)
J='https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@'
P='144d964a795e515e3b79f0e39c0eeee244a786f8'   # bileşen paketi, kariyer v2, 11 sayfa
M='9bbcefd65becbc196baebea26600060b01af406c'   # header v14 + markup v16
A='9a8e261f72975ccc5d94d33dfe9e6313b4e8f5dd'   # platform logoları
V14='36a24d3d5af5be5e5493598af4375f070a26b002'; V12='39f762f63a2af58a470e9712d8ca0895d6f73f9f'
SHELL=J+P+'/wix-global-shell-v1/n1-global-shell-v1.js'
CAREER=J+P+'/wix-global-shell-v1/pages/n1-career-v2.js'
TAGS={'header':'n1-global-header-v1','footer':'n1-global-footer-v1','floating':'n1-global-floating-v1'}
NEW=[('İnsan Kaynakları','/insan-kaynaklari','n1-insan-kaynaklari-v1','İnsan Kaynakları | 1N Reklam ve Digital Media','1N Digital Media kariyer fırsatlarını keşfedin. Açık pozisyonlarımızı ve staj programlarımızı takip ederek yaratıcı dünyamıza adım atın.'),
 ('Açık Pozisyonlar','/acik-pozisyonlar','n1-acik-pozisyonlar-v1','Açık Pozisyonlar | 1N Reklam ve Digital Media','1N Digital Media bünyesindeki güncel iş fırsatlarını ve açık pozisyonları takip edin. Yeni kariyer duyurularımızı keşfedin.'),
 ('Staj Programları','/staj-programlari','n1-staj-programlari-v1','Staj Programları | 1N Reklam ve Digital Media','1N Digital Media staj programlarına ilişkin güncel duyuruları ve gelecekteki staj fırsatlarını bu sayfadan takip edin.')]
S=J+P+'/wix-global-shell-v1/sites/'
EX=[('Ana Sayfa','/','n1-site-v1',S+'home/n1-site-wix-v661.js',J+V14+'/wix-mobile-performance-v14/home/n1-site-wix-v659.js','`assets-base`, `ronin-base`, `ronin-mobile-base`, `ronin-tier`, `hero-video`, `hero-poster`, `home-base`, `sticky-fix`, `debug` (tanımlı olanlar aynen)'),
 ('Kreatif Prodüksiyon','/kreatif-produksiyon','n1-kreatif-produksiyon-v23',S+'pages/wix-kreatif-produksiyon-v26/n1-kreatif-produksiyon-v26.js',J+V14+'/wix-mobile-performance-v14/pages/wix-kreatif-produksiyon-v24/n1-kreatif-produksiyon-v24.js',None),
 ('E-Ticaret Yönetimi','/e-ticaret-yonetimi','n1-e-ticaret-yonetimi-v23',S+'pages/wix-e-ticaret-yonetimi-v27/n1-e-ticaret-yonetimi-v27.js',J+V14+'/wix-mobile-performance-v14/pages/wix-e-ticaret-yonetimi-v25/n1-e-ticaret-yonetimi-v25.js',None),
 ('Sosyal Medya','/sosyal-medya','n1-sosyal-medya-v27',S+'pages/wix-sosyal-medya-v30/n1-sosyal-medya-v30.js',J+V14+'/wix-mobile-performance-v14/pages/wix-sosyal-medya-v28/n1-sosyal-medya-v28.js',None),
 ('Reklam Yönetimi','/reklam-yonetimi','n1-reklam-yonetimi-v23',S+'pages/wix-reklam-yonetimi-v26/n1-reklam-yonetimi-v26.js',J+V14+'/wix-mobile-performance-v14/pages/wix-reklam-yonetimi-v24/n1-reklam-yonetimi-v24.js',None),
 ('UI/UX Tasarım','/ui-ux-tasarim','n1-uiux-tasarim-v28',S+'pages/wix-uiux-tasarim-v32/n1-uiux-tasarim-v32.js',J+V14+'/wix-mobile-performance-v14/pages/wix-uiux-tasarim-v30/n1-uiux-tasarim-v30.js',None),
 ('Yapay Zekâ','/yapay-zeka','n1-yapay-zeka-v2',S+'pages/wix-yapay-zeka-v5/n1-yapay-zeka-v5.js',J+V14+'/wix-mobile-performance-v14/pages/wix-yapay-zeka-v3/n1-yapay-zeka-v3.js',None),
 ('Uygulama Geliştirme','/uygulama-gelistirme','n1-uygulama-gelistirme-v2',S+'pages/wix-uygulama-gelistirme-v5/n1-uygulama-gelistirme-v5.js',J+V14+'/wix-mobile-performance-v14/pages/wix-uygulama-gelistirme-v3/n1-uygulama-gelistirme-v3.js',None),
 ('Kısaca Biz','/kisaca-biz','n1-kisaca-biz-v1',S+'pages/wix-kisaca-biz-v3/n1-kisaca-biz-v3.js',J+V12+'/wix-global-menu-v12/pages/wix-kisaca-biz-v1/n1-kisaca-biz-v1.js',None),
 ('Markalar','/markalar','n1-markalar-v11',S+'pages/wix-markalar-v13/n1-markalar-v13.js',J+V12+'/wix-global-menu-v12/pages/wix-markalar-v1/n1-markalar-v11.js',None)]
LEG=[('Gizlilik Politikası','n1-gizlilik-politikasi-v1'),('KVKK Aydınlatma Metni','n1-kvkk-aydinlatma-v1'),('Çerez Politikası','n1-cerez-politikasi-v1'),('Kullanım Koşulları','n1-kullanim-kosullari-v1'),('Veri Sahibi Başvuru Formu','n1-veri-sahibi-basvuru-v1')]
LEGNEW=S+'pages/wix-yasal-sayfalar-v3/n1-yasal-sayfalar-v3.js'; LEGOLD=J+V12+'/wix-global-menu-v12/pages/wix-yasal-sayfalar-v1/n1-yasal-sayfalar-v1.js'
DEFKEEP='`deps-base`, `cta-href` ve tanımlı diğerleri (aynen)'
# ---- GLOBAL MENÜ V2.1 (tek renkli kompakt platform logoları) ----
F='f661795b75a011f8e882930df64a20f60a863cba'   # paket v1.1, kariyer v3, 11 sayfa (V2.1 yayın commit'i)
H15='6df38aa58398670c8e2617632ef88b9895bfd4e9' # header v15 + tek renkli SVG logolar
SHELL2=SHELL; CAREER2=CAREER                   # V2 (Wix'te uygulanmış) = V2.1 geri dönüşü
SHELL21=J+F+'/wix-global-shell-v1/n1-global-shell-v1-1.js'
CAREER21=J+F+'/wix-global-shell-v1/pages/n1-career-v3.js'
S21=J+F+'/wix-global-shell-v1/sites/'
_BUMP={'home/n1-site-wix-v661.js':'home/n1-site-wix-v662.js'}
for _n,_v in [('kreatif-produksiyon',26),('e-ticaret-yonetimi',27),('sosyal-medya',30),('reklam-yonetimi',26),('uiux-tasarim',32),('yapay-zeka',5),('uygulama-gelistirme',5),('kisaca-biz',3),('markalar',13),('yasal-sayfalar',3)]:
    _BUMP['pages/wix-%s-v%d/n1-%s-v%d.js'%(_n,_v,_n,_v)]='pages/wix-%s-v%d/n1-%s-v%d.js'%(_n,_v+1,_n,_v+1)
def v21(u): k=u[len(S):]; return S21+_BUMP[k]
# EX21: (ad, adres, etiket, V2.1 yeni, V2 şu anki = geri dönüş, V1.4/V1.2 önceki canlı, öznitelikler)
EX21=[(n,u,t,v21(new),new,old,keep) for n,u,t,new,old,keep in EX]
LEG21=v21(LEGNEW); LEG2=LEGNEW
