import json,sys,statistics as S,os
br=sys.argv[1]
for v in ['A','B','C','D','E','F1x']:
    f=f'v13c/{br}-{v}.json'
    if not os.path.exists(f):print(v,'yok');continue
    d=json.load(open(f));R=d['rows'];ok=[r for r in R if 'maxProcMB' in r]
    errs=[r for r in R if 'ERROR' in r.get('label','')]
    mp=[r['maxProcMB'] for r in ok];rs=[r['rssMB'] for r in ok]
    home=[r['maxProcMB'] for r in ok if 'home-after-back' in r['label']]
    heap=[r.get('JSHeapUsedSize') for r in ok if r.get('JSHeapUsedSize')]
    cyc=sum(1 for r in R if r.get('label','').endswith('home-after-back'))
    cfg=d.get('cfg') or {}
    c=cfg if isinstance(cfg,dict) else {}
    print(f"{v:4} döngü {cyc}/21 hata {len(errs)} çökme {d['crashes']} takılma {len(d['hangs'])} | en büyük süreç ort {S.mean(mp):.0f} maks {max(mp)} MB | toplam RSS ort {S.mean(rs):.0f} maks {max(rs)} | geri-sonrası ana sayfa ort {S.mean(home):.0f}"+(f" | heap ort {S.mean(heap):.0f}MB" if heap else '')+f" | cfg menu={c.get('menu')} loader={c.get('loader')} nav={c.get('nav')} stab={c.get('stab')} v658={c.get('m5v13')} hero={c.get('hero')} | 1N konsol {len([x for x in d['cons'] if 'n1' in x.lower()])}")
