import json,sys
d=json.load(open(sys.argv[1]))
print(d['BR'],d['MODE'])
print(f"{'label':44} {'nav':12} {'rss':>5} {'heap':>4} {'nodes':>6} {'jsL':>5} {'vid':>3} {'src':>3} {'play':>4} {'buf':>3} {'raf/s':>5} {'int':>3} {'IO':>3} {'MO':>3} {'RO':>3} {'winL':>4} {'docL':>4} {'tw':>4} {'ST':>3} hdr/logo/menu")
for r in d['rows']:
    if 'err' in r and 'videos' not in r: print(r['label'],'ERR',r.get('err'),r.get('url')); continue
    ol=r.get('obsLive',{})
    print(f"{r['label'][:44]:44} {str(r.get('nav')):12} {r.get('rssMB',''):>5} {str(r.get('JSHeapUsedSize','')):>4} {str(r.get('Nodes','')):>6} {str(r.get('JSEventListeners','')):>5} {r.get('videos',''):>3} {r.get('videosWithSrc',''):>3} {r.get('videosPlaying',''):>4} {r.get('videosBuffered',''):>3} {r.get('rafPerSec',''):>5} {r.get('intervals',''):>3} {ol.get('IO',''):>3} {ol.get('MO',''):>3} {ol.get('RO',''):>3} {r.get('winListeners',''):>4} {r.get('docListeners',''):>4} {str(r.get('gsapTweens','')):>4} {str(r.get('scrollTriggers','')):>3} {r.get('headerVisible')}/{r.get('logoVisible')}/{r.get('menuBtn')} {(' E:'+'|'.join(r.get('errors',[]))[:120]) if r.get('errors') else ''}{(' R:'+'|'.join(r.get('rejections',[]))[:120]) if r.get('rejections') else ''}")
print('console:',*d['cons'][:15],sep='\n  ')
print('fails:',*d['fails'][:15],sep='\n  ')
