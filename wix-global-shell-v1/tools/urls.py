# Tek kaynak: Global Shell V1 yayın adresleri (SERVER_URLS / DEPLOYMENT / ROLLBACK üreticileri bunu içe aktarır)
J='https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@'
P='a80045ca8ebbb3d5d59b16069910f00d24dd95aa'   # bileşen paketi, kariyer v2, 11 sayfa
M='cce282464fb3eac460bb13b4d03286b250d65712'   # header v14 + markup v16
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
