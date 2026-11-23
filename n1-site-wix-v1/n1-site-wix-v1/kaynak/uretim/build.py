"""n1-site-wix-v1 paketini v6.47 kaynaklarından üretir. v6.47 dosyaları yalnızca okunur."""
import re, os, json, shutil, hashlib
import css_scope
SRC = '/home/claude/v647/yayin/'
OUT = '/home/claude/wix-full-v1/n1-site-wix-v1/'
shutil.rmtree(OUT, ignore_errors=True)
for d in ['modules/js', 'site', 'aktarim-medya/img/eco', 'aktarim-medya/img/partners', 'aktarim-medya/media', 'test', 'kaynak']:
    os.makedirs(OUT + d, exist_ok=True)
html = open(SRC + 'index.html').read()

# ---------- 1) modüller (v6.47 sırasıyla, değiştirilmeden) ----------
CSS_ORDER = re.findall(r'<link rel="stylesheet" href="([^"h][^"]*)">', html)
JS_ORDER = [s for s in re.findall(r'<script src="([^"]+)"></script>', html) if not s.startswith('http')]
EXCLUDE = {'js/onizleme-baglanti-v644.js'}            # yalnızca Claude önizlemesi
JS_ORDER = [s for s in JS_ORDER if s not in EXCLUDE]
GSAP = [s for s in re.findall(r'<script src="(https://cdnjs[^"]+)"></script>', html)]
FONTS = re.search(r'<link href="(https://fonts.googleapis.com/css2[^"]+)" rel="stylesheet">', html).group(1)
for f in CSS_ORDER + JS_ORDER:
    shutil.copy(SRC + f, OUT + 'modules/' + f)
# Ecosystem: Wix'te kırılacak tek modül içi yol (4 ikon). Yalnızca bu dört satır değişir; kopyası -wix adıyla.
eco = open(SRC + 'n1-ecosystem-v647.js').read()
n = 0
for k in ['a7', 'hementik', 'zeyp', 'live']:
    old = f"local: 'img/eco/{k}.png'"
    assert eco.count(old) == 1, k
    eco = eco.replace(old, f"local: (window.N1_ASSET_BASE || '') + 'img/eco/{k}.png'"); n += 1
eco = eco.replace('/* ', '/* [n1-site-wix-v1] Wix kopyası: yalnızca 4 ikon yolu window.N1_ASSET_BASE ile öneklenir; başka değişiklik yok.\n * ', 1)
open(OUT + 'modules/n1-ecosystem-v647-wix.js', 'w').write(eco)
os.remove(OUT + 'modules/n1-ecosystem-v647.js')
JS_ORDER = ['n1-ecosystem-v647-wix.js' if s == 'n1-ecosystem-v647.js' else s for s in JS_ORDER]

# ---------- 2) genel stil → bileşen kapsamı ----------
style = re.search(r'<style>(.*?)</style>', html, re.S).group(1)
base_css = ('/* n1-site-wix-v1 — v6.47 index.html genel stili, <n1-site-v1> kapsamına alınmış hali (css_scope.py ile üretildi).\n'
            ' * Özgüllük v6.47 ile aynı (:where). html/body\'ye kural yazılmaz. [data-n1-owner] = body\'ye taşınan site öğeleri. */\n'
            + css_scope.scope_css(style) +
            '\n/* v6.47: zemin html\'den geliyordu, body şeffaftı → kökün kendi zemini */\n:where(n1-site-v1){display:block;position:relative;width:100%;background:var(--bg)}\n'
            '/* body\'ye taşınan öğeler v6.47\'de font/renk/boyutu body\'den alıyordu */\n'
            ':where([data-n1-owner]){font-family:Barlow,Arial,sans-serif;color:var(--ink,#eeede8);-webkit-font-smoothing:antialiased}\n'
            ':where(.n1h-panel[data-n1-owner],n1-header[data-n1-owner]){font-size:17px;line-height:1.6}\n'
            ':where(n1-site-v1,[data-n1-owner]){--site-w:90%;--n1-accent:#A8CF62}\n'
            '/* Wix sıfırlama koruması: v6.47 görsellerinde tarayıcı varsayılanı (kenarlık yok) açıkça yazılır; görünüm değişmez */\n'
            ':where(n1-site-v1,[data-n1-owner]) img{border:0}\n'
            '.n1s-note{margin:0;padding:28px 5%;font:400 14px/1.5 Barlow,Arial,sans-serif;color:#8e8f89;border-bottom:1px solid #232325}\n'
            '.n1s-diag{position:fixed;z-index:2147483001;left:8px;bottom:8px;max-width:min(620px,calc(100vw - 16px));max-height:60vh;overflow:auto;'
            'font:11px/1.45 ui-monospace,Menlo,Consolas,monospace;color:#cfe;background:rgba(0,0,0,.88);padding:8px 10px;white-space:pre-wrap}\n')
assert 'html' not in re.sub(r'/\*.*?\*/', '', base_css, flags=re.S).replace('has-', '').split('{')[0]
open(OUT + 'site/n1-site-base-v1.css', 'w').write(base_css)

# ---------- 3) sayfa iskeleti ----------
b0 = html.index('<body>') + len('<body>'); b1 = html.index('<script src="https://cdnjs')
markup = html[b0:b1].strip()
markup += '\n<ronin-type for="hero"></ronin-type>\n'
# Header: accent özniteliği html'e --n1-accent yazdırıyordu → kaldırılır (değer kapsamlı CSS'te)
markup, k = re.subn(r'(<n1-header[^>]*?)\s+accent="[^"]*"', r'\1', markup); assert k == 1
# Videolar: yalnızca Wix adresleri (önizleme dosyaları Wix'te yok)
def wixonly(m):
    parts = [p for p in m.group(1).split('|') if p.startswith('https://video.wixstatic.com/')]
    assert len(parts) == 1, m.group(0)
    return f'data-sources="{parts[0]}"'
markup, k = re.subn(r'data-sources="([^"]+)"', wixonly, markup); assert k == 3
# Wix URL'si olmayan görseller → aktarım klasörü ({{ASSETS}} = assets-base)
assets = []
def asset(m):
    assets.append(m.group(2)); return f'{m.group(1)}="{{{{ASSETS}}}}{m.group(2)}"'
markup, k = re.subn(r'\b(src|data-src|data-thumbs)="((?:img|media)/[^"]+)"', asset, markup)
markup, k2 = re.subn(r'url\((["\']?)((?:img|media)/[^)"\']+)\1\)', lambda m: 'url(' + m.group(1) + '{{ASSETS}}' + m.group(2) + m.group(1) + ')', markup)
assets = sorted(set(assets))
for a in assets:
    shutil.copy(SRC + a, OUT + 'aktarim-medya/' + a)
for k_ in ['a7', 'hementik', 'zeyp', 'live']:
    a = f'img/eco/{k_}.png'; shutil.copy(SRC + a, OUT + 'aktarim-medya/' + a); assets.append(a)
assets = sorted(set(assets))
assert not re.search(r'(=|url\()["\']?(img|media)/', markup), 'göreli yol kaldı'
assert 'src="img/' not in markup and 'media/' not in re.sub(r'video\.wixstatic\.com/video/[^"]+', '', markup).replace('{{ASSETS}}media/', '')
open(OUT + 'kaynak/n1-site-markup-v1.html', 'w').write(markup)
open(OUT + 'site/n1-site-markup-v1.js', 'w').write(
    '/* n1-site-wix-v1 — sayfa iskeleti (v6.47 <body> içeriği; Wix için yalnızca: Header accent özniteliği kaldırıldı,\n'
    ' * videolar yalnızca Wix adresleri, Wix adresi olmayan görseller {{ASSETS}} öneki). Okunur kaynak: kaynak/n1-site-markup-v1.html */\n'
    'window.N1_SITE_MARKUP = ' + json.dumps(markup, ensure_ascii=False) + ';\n')

# ---------- 4) Ronin (v6.47 oluşturma betiğiyle aynı öznitelikler; test paketi gibi .bin + ronin-base) ----------
json.dump({'css': CSS_ORDER, 'js': JS_ORDER, 'gsap': GSAP, 'fonts': FONTS, 'assets': assets}, open('/tmp/n1-order.json', 'w'), indent=1)
print('CSS', len(CSS_ORDER), 'JS', len(JS_ORDER), 'GSAP', len(GSAP), 'görsel', len(assets))
print(JS_ORDER)

# ---------- 5) giriş dosyası (entry.src.js + derlenen sıra) ----------
src = open('/home/claude/wix-full-v1/entry.src.js').read()
open(OUT + 'n1-site-wix-v1.js', 'w').write(src.replace('%ORDER%', json.dumps({'fonts': FONTS, 'gsap': GSAP, 'css': CSS_ORDER, 'js': JS_ORDER}, indent=2).replace('\n', '\n  ')))
shutil.copy('/home/claude/wix-full-v1/test-page.html', OUT + 'test/wix-benzetim.html')
