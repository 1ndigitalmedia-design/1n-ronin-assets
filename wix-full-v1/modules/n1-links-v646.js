/* 1N Digital Media — MERKEZİ BAĞLANTI HARİTASI (v6.46)
 * Sitedeki bütün iç sayfa adresleri ve dış bağlantılar tek yerde. Bir adres değişirse yalnızca burası güncellenir.
 * İç adresler kök-göreli (/sayfa): yayında hangi alan adındaysa onun kökündeki sayfaya gider, aynı sekmede açılır.
 * Alan adı bilerek yazılmadı (Wix'e aynen aktarılır). Dış bağlantılar yeni sekmede, rel="noopener noreferrer".
 * Bu dosya diğer modüllerden ÖNCE yüklenir; modüller adresleri window.N1_ROUTES'tan okur. */
(function () {
  'use strict';
  var R = {
    // Header / menü
    'studyo-hikayesi':      '/studyo-hikayesi',
    'yaratici-bakisimiz':   '/yaratici-bakisimiz',
    'calisma-ritmimiz':     '/calisma-ritmimiz',
    'kreatif-studyo':       '/kreatif-studyo',
    'marka-deneyimi':       '/marka-deneyimi',
    'dijital-performans':   '/dijital-performans',
    'sosyal-medya-icerik':  '/sosyal-medya-icerik',
    'web-e-ticaret':        '/web-e-ticaret',
    'yapay-zeka-inovasyon': '/yapay-zeka-inovasyon',
    'secili-isler':         '/secili-isler',
    'marka-hikayeleri':     '/marka-hikayeleri',
    'creative-showcase':    '/creative-showcase',
    '1n-academy':           '/reklam-ajansi',
    'workshops':            '/workshops',
    'icgoruler':            '/icgoruler',
    'iletisim':             '/iletisim',
    'teklif-al':            '/teklif-al',
    'ekibimize-katil':      '/ekibimize-katil',
    'acik-pozisyonlar':     '/acik-pozisyonlar',
    // Ana sayfa — Scroll Text Highlight hizmetleri
    'kreatif-produksiyon':  '/kreatif-produksiyon',
    'e-ticaret-yonetimi':   '/e-ticaret-yonetimi',
    'sosyal-medya':         '/sosyal-medya',
    'reklam-yonetimi':      '/reklam-yonetimi',
    'ui-ux-tasarim':        '/ui-ux-tasarim',
    'ai':                   '/yapay-zeka',
    'uygulama':             '/uygulama-gelistirme',
    // Bölüm butonları
    'markalar':             '/markalar',
    // Footer — yasal
    'gizlilik':             '/gizlilik-politikasi',
    'kvkk':                 '/kvkk-aydinlatma-metni',
    'cerez':                '/cerez-politikasi',
    'kullanim':             '/kullanim-kosullari',
    'basvuru':              '/veri-sahibi-basvuru-formu'
  };
  var EXTERNAL = {
    'whatsapp':  'https://api.whatsapp.com/send/?phone=905516816026&text&type=phone_number&app_absent=0',
    'a7':        'https://www.a7-1n.com/a7-produksiyon',
    'hementik':  'https://www.hementik.la/',
    'zeyp':      'https://www.zeyp.com.tr/',
    'live':      'https://www.carsialtin.com/faprika/canli-piyasalar/',
    // Footer — sosyal medya (v6.46)
    'instagram': 'https://www.instagram.com/reklam1n/',
    'facebook':  'https://www.facebook.com/1nreklam/',
    'linkedin':  'https://www.linkedin.com/in/1n-reklam-ajans%C4%B1',
    'youtube':   'https://www.youtube.com/@1nakademi'
  };
  window.N1_ROUTES = R;
  window.N1_EXTERNAL = EXTERNAL;
  window.N1_ROUTE = function (key) { return R[key] || null; };
})();
