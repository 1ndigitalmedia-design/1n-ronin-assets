"""Excel → n1-markalar-data-v1.js. Kullanım: python3 build_data.py <xlsx> <çıktı.js>
Marka adları ve sektörler Excel'den birebir alınır (yalnızca baş/son boşluk temizlenir; yazım düzeltilmez)."""
import sys, json, re, unicodedata, openpyxl, datetime
src, out = sys.argv[1], sys.argv[2]
wb = openpyxl.load_workbook(src, data_only=True)
ws = wb['Marka Listesi']
rows = list(ws.iter_rows(values_only=True))
head = [str(h).strip() for h in rows[0]]
assert head[:4] == ['Sıra No', 'Marka / Proje Adı', 'Sektör', 'Liste Grubu'], head
TR = str.maketrans('çğıöşüÇĞİÖŞÜâîû', 'cgiosuCGIOSUaiu')
def slug(s):
    s = s.translate(TR).lower()
    s = unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode()
    return re.sub(r'[^a-z0-9]+', '-', s).strip('-')
brands, seen = [], set()
for r in rows[1:]:
    if r[0] is None and not r[1]: continue
    order, name, sector, group = int(r[0]), str(r[1]).strip(), str(r[2]).strip(), str(r[3]).strip()
    i = slug(name); base = i; n = 2
    while i in seen: i = base + '-' + str(n); n += 1
    seen.add(i)
    brands.append({'id': i, 'order': order, 'name': name, 'sector': sector, 'group': group,
                   'featured': group.startswith('Öncelikli'), 'logo': '', 'projectUrl': ''})
data = {'source': src.rsplit('/', 1)[-1].split('-', 1)[-1] if '-' in src.rsplit('/', 1)[-1][:9] else src.rsplit('/', 1)[-1],
        'sheet': 'Marka Listesi', 'generated': datetime.date.today().isoformat(), 'brands': brands}
js = ('/*!\n * 1N Digital Media — Markalar sayfası veri dosyası (tek ve kesin kaynak: ' + data['source'] + ', "Marka Listesi")\n'
      ' * Bu dosya build_data.py ile Excel\'den üretilir. Elle düzenlenebilir; tasarım koduna dokunmanız gerekmez.\n'
      ' * Alanlar: id, order (Sıra No), name, sector, group (Liste Grubu), featured (Öncelikli grup), logo (doğrulanmış logo URL, yoksa boş),\n'
      ' *          logoAlt (isteğe bağlı), projectUrl (doğrulanmış proje sayfası, yoksa boş).\n'
      ' * Sayılar (toplam, sektör, öne çıkan) sayfada bu listeden hesaplanır.\n */\n'
      'window.N1_MARKALAR_DATA = ' + json.dumps(data, ensure_ascii=False, indent=2) + ';\n')
open(out, 'w', encoding='utf-8').write(js)
# Doğrulama: Sektör Özeti ile karşılaştır
sm = wb['Sektör Özeti']; rep = []
calc = {}
for b in brands:
    c = calc.setdefault(b['sector'], [0, 0, 0]); c[0] += 1; c[1 if b['featured'] else 2] += 1
sheet = {}
for r in list(sm.iter_rows(values_only=True))[1:]:
    if r[0] and r[0] != 'TOPLAM': sheet[str(r[0]).strip()] = [r[1], r[2], r[3]]
print(json.dumps({'total': len(brands), 'featured': sum(b['featured'] for b in brands), 'sectors': len(calc),
  'mismatch': {k: (calc.get(k), sheet.get(k)) for k in set(calc) | set(sheet) if calc.get(k) != sheet.get(k)},
  'orders_contiguous': [b['order'] for b in brands] == list(range(1, len(brands) + 1)),
  'groups': sorted(set(b['group'] for b in brands))}, ensure_ascii=False))