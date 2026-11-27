import subprocess,json,os,hashlib
from PIL import Image
OUT='/home/user/1n-ronin-assets/wix-mobile-performance-v14/media/stills'
PICK={ # ad: (sayfa, kaynak video adı, saniye, wix video id, kaynak çözünürlük etiketi, gerekçe)
 'kreatif-monitor':('kreatif-produksiyon',1.21,'1N_Digital_Media başlık karesi; glitch dili, temiz, marka'),
 'eticaret-store':('e-ticaret-yonetimi',0.55,'menü sayfaları en düz ve okunur hâlde'),
 'eticaret-trio':('e-ticaret-yonetimi',1.69,'kasklı figür, keskin, koyu zemin'),
 'reklam-manifesto':('reklam-yonetimi',0.25,'bütün panolar dolu, "AND SOLUTIONS EMERGE"'),
 'reklam-karar':('reklam-yonetimi',1.50,'vitrin, en keskin kare'),
 'sosyal-hareket':('sosyal-medya',1.17,'ekranlı oda kompozisyonu (arka plan kullanımına uygun)'),
 'sosyal-final':('sosyal-medya',1.50,'vitrin, en keskin kare (reklam-karar ile aynı dosya)'),
 'sosyal-strateji':('sosyal-medya',0.28,'ERA formu düzgün, deformasyonsuz'),
 'uiux-feel':('ui-ux-tasarim',5.11,'sporcu + arayüz, aydınlık, keskin'),
 'yapay-gen':('yapay-zeka',0.0,'tasarımcının belirlediği ilk kare (first:0); düzenli ızgara'),
 'yapay-story':('yapay-zeka',12.61,'ağaç ve kutup ışıkları; hikâyenin doruk karesi'),
 'uygulama-web':('uygulama-gelistirme',4.04,'monitörde pano arayüzü, keskin'),
 'uygulama-screens':('uygulama-gelistirme',4.56,'elde telefon, aydınlık, keskin'),
 'uygulama-motion':('uygulama-gelistirme',4.47,'GCT Balance telefon, net arayüz'),
}
ids=dict(l.split() for l in open('ids.txt'))
probe={l.split()[0]:l.split() for l in open('probe.txt')}
os.makedirs(OUT,exist_ok=True);man={}
for n,(page,t,why) in PICK.items():
    src=n+'.mp4';png=f'final-{n}.png'
    subprocess.run(['ffmpeg','-v','error','-y','-ss',f'{t:.3f}','-i',src,'-frames:v','1',png],check=True)
    im=Image.open(png).convert('RGB');W,H=im.size
    widths=sorted(set([w for w in (480,720,960,1280,1920) if w<W]+[W]))
    d=os.path.join(OUT,page);os.makedirs(d,exist_ok=True);files=[]
    for w in widths:
        h=round(H*w/W);f=os.path.join(d,f'{n}-{w}.webp')
        (im if w==W else im.resize((w,h),Image.LANCZOS)).save(f,'WEBP',quality=84,method=6)
        files.append({'w':w,'h':h,'file':os.path.relpath(f,'/home/user/1n-ronin-assets'),'bytes':os.path.getsize(f)})
    q=probe[n]
    man[n]={'page':page,'wixVideoId':'6dbf5e_'+ids[n],'sourceUrl':f'https://video.wixstatic.com/video/6dbf5e_{ids[n]}/{q[1]}/mp4/file.mp4','sourceQuality':q[1],'sourceWxH':f'{W}x{H}','time':t,'reason':why,'files':files}
    print(n.ljust(18),f'{W}x{H}',t,'→',', '.join(f"{x['w']}w {x['bytes']//1024}KB" for x in files))
json.dump(man,open(os.path.join(OUT,'stills-manifest.json'),'w'),indent=1,ensure_ascii=False)
