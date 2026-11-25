/*!
 * 1N Digital Media — Yasal Sayfalar V1 (Gizlilik Politikası, KVKK Aydınlatma Metni, Çerez Politikası,
 * Kullanım Koşulları, Veri Sahibi Başvuru Formu)
 * Tek dosya, beş Wix Studio Custom Element:
 *   n1-gizlilik-politikasi-v1 · n1-kvkk-aydinlatma-v1 · n1-cerez-politikasi-v1 · n1-kullanim-kosullari-v1 · n1-veri-sahibi-basvuru-v1
 * Header/Footer: onaylı commit d24fa373d6d76c0218b3f3b77897a8c2ace04e5e modülleri değiştirilmeden yüklenir.
 * Öznitelikler: updated="YYYY-AA-GG" (son güncelleme tarihi), review (yayın öncesi inceleme işaretlerini gösterir),
 *   cookie-settings="window.yolu.fonksiyon" (gerçek çerez tercih aracını açan fonksiyon; yoksa düğme gösterilmez).
 * Hukuki metinler taslaktır; yayından önce LEGAL_PUBLISH_GATE.md tamamlanmalı ve bir hukuk uzmanı incelemelidir.
 */
(function () {
  'use strict';
  /* ---------- Onaylı kaynaklar (commit'e sabit) ---------- */
  var CDN = 'https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@';
  var C648 = 'd24fa373d6d76c0218b3f3b77897a8c2ace04e5e';
  var CRESP = '09612df97e85978976d13edbd79dad0adcc1d1f1';
  var PATHS = {
    markup: C648 + '/wix-home-v648/site/n1-site-markup-v648.js',
    header: C648 + '/wix-home-v648/modules/n1-header-v648.js',
    footerJs: C648 + '/wix-full-v1/modules/n1-footer-v646.js',
    footerCss: C648 + '/wix-full-v1/modules/n1-footer-v636.css',
    links: C648 + '/wix-full-v1/modules/n1-links-v646.js',
    floating: C648 + '/wix-full-v1/modules/n1-floating-controls-v632.js',
    responsive: CRESP + '/wix-studyo-v1/site/n1-inner-responsive-v6.css',
    assets: C648 + '/wix-full-v1/aktarim-medya/'
  };
  var FONTS = 'https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@400;500;600;700&display=swap';
  var PARTNER_ART = {
    tablet: 'https://static.wixstatic.com/media/6dbf5e_800ff5a00ba244f9bb31761a6b2d713d~mv2.png',
    mobile: 'https://static.wixstatic.com/media/6dbf5e_32b849155e954320a1f6479f27fd6ad2~mv2.png'
  };

  /* =====================================================================
     İŞLETME BİLGİLERİ — beş sayfada da yalnızca buradan okunur.
     Doğrulanmamış bilgi (vergi no, MERSİS, KEP vb.) eklenmedi; KEP boş bırakıldı.
     ===================================================================== */
  var BIZ = {
    brand: '1N Digital Media',
    controller: '1N Digital Media - Fatma Elçin Bozkurt',
    addr: 'Adalet Mah. Manas Bulvarı No: 39 - 3408, Folkart Tower, Bayraklı İzmir - Türkiye',
    tel: '+90 232 400 20 94', telHref: '+902324002094',
    mail: 'pro.media@reklam1n.com',
    web: 'https://www.reklam1n.com', webText: 'www.reklam1n.com',
    kep: ''          // Yalnızca gerçek bir KEP adresi doğrulanırsa doldurun (G-03). E-posta adresi KEP değildir.
  };

  /* =====================================================================
     ÇEREZ LİSTESİ — gerçek çerez taraması yapılmadan DOLDURULMAZ (C-01, C-04).
     Örnek satır biçimi (değerler uydurma değildir, yalnızca alan adlarıdır):
     { name: '', provider: '', purpose: '', category: 'zorunlu|islevsel|analitik|pazarlama', duration: '', basis: '' }
     ===================================================================== */
  var COOKIES = [];

  /* =====================================================================
     YAYIN KAPISI — LEGAL_PUBLISH_GATE.md ile aynı kimlikler.
     Bir madde doğrulandığında kimliğini VERIFIED dizisine ekleyin.
     ===================================================================== */
  var VERIFIED = [];

  /* Son güncelleme tarihleri (YYYY-AA-GG). Gerçek yayın/yürürlük tarihi doğrulanınca doldurun (P-01).
     Boş bırakılırsa sayfada tarih gösterilmez. Custom Element'teki updated="..." özniteliği bunu geçersiz kılar. */
  var DATES = { gizlilik: '', kvkk: '', cerez: '', kullanim: '', basvuru: '' };

  /* Gerçek çerez tercih aracını açan global fonksiyonun yolu (örn. 'cmpAraci.ayarlariAc'). Boşsa düğme gösterilmez (C-02).
     Custom Element'teki cookie-settings="..." özniteliği bunu geçersiz kılar. */
  var COOKIE_SETTINGS_FN = '';
  var GATES = {
    'G-01': 'Hukuki statü ve veri sorumlusunun kimliği (şahıs işletmesi / şirket, unvan, MERSİS / vergi bilgisi)',
    'G-02': 'Tebligat ve başvuru adresi (Footer\'da "Bayraklı Bornova - İzmir 35530" yazıyor; brief\'te "Bayraklı İzmir")',
    'G-03': 'KEP adresi bulunup bulunmadığı',
    'G-04': 'pro.media@reklam1n.com adresinin başvuru kanalı olarak kullanılması ve kayıtlı e-posta eşleştirmesi',
    'G-05': 'VERBİS kayıt yükümlülüğü ve Saklama ve İmha Politikası gerekliliği',
    'D-01': 'İletişim ve teklif formlarının gerçek alanları ve verinin kaydedildiği yer',
    'D-02': 'WhatsApp hattının kullanımı, mesajların saklanması ve aktarım',
    'D-03': 'Telefon görüşmelerinin kayda alınıp alınmadığı',
    'D-04': 'Müşteri ve iş ortağı süreçleri: sözleşme, faturalama, muhasebe desteği',
    'D-05': 'İş başvuruları (/ekibimize-katil, /acik-pozisyonlar) ve ayrı aydınlatma',
    'D-06': 'Ticari elektronik ileti / bülten gönderimi, onay ve İYS',
    'D-07': 'Hizmet sağlayıcıların listesi ve konumları (Wix, e-posta, bulut, CRM, analitik, reklam)',
    'D-08': 'Yurt dışına aktarımın hukuki dayanağı (yeterlilik kararı / standart sözleşme ve bildirimi / arızi istisna)',
    'D-09': 'Her faaliyet için saklama süreleri ve imha süreci',
    'D-10': 'Uygulanan teknik ve idari güvenlik tedbirleri',
    'D-11': 'Teknik kayıtlar (log) ve bunlara kimin eriştiği',
    'D-12': 'Özel nitelikli kişisel veri işlenmediğinin teyidi',
    'D-13': 'Müşteriler adına yürütülen işlerde veri işleyen rolü ve sözleşmeler',
    'C-01': 'Gerçek çerez taraması (rıza öncesi ve sonrası, tüm sayfalar)',
    'C-02': 'Çerez yönetim aracı: eşit "Reddet", önceden işaretsiz kategoriler, rıza kaydı',
    'C-03': 'Zorunlu olmayan etiketlerin rızadan önce çalışmaması',
    'C-04': 'Çerez tablosunun tarama sonucuyla doldurulması',
    'C-05': 'Çerez sağlayıcıları üzerinden yurt dışı aktarım',
    'C-06': 'Gömülü üçüncü taraf içerikler (video, harita, sosyal medya)',
    'K-01': 'Elektronik Ticaret Kanunu m.3 kapsamındaki tanıtıcı bilgilerin gerekip gerekmediği',
    'K-02': '"1N Digital Media" markasının tescil durumu',
    'K-03': 'Sitede yer alan müşteri marka, logo ve işlerinin kullanım izinleri',
    'B-01': 'Başvuru alma, kimlik doğrulama ve yanıt süreci (sorumlu kişi, kayıt, süre takibi)',
    'B-02': 'Elektronik başvuru için güvenli entegrasyon (ilk sürümde yok)',
    'P-01': 'Yürürlük / son güncelleme tarihinin girilmesi',
    'P-02': 'Yetkin bir hukuk uzmanının incelemesi'
  };
  function g(id) { return '<i class="lg-g" data-g="' + id + '" title="' + GATES[id].replace(/"/g, '&quot;') + '">' + id + '</i>'; }

  /* ---------- Metin yardımcıları ---------- */
  function P(t) { return '<p>' + t + '</p>'; }
  function H3(t) { return '<h3>' + t + '</h3>'; }
  function UL(a) { return '<ul class="lg-ul">' + a.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>'; }
  function OL(a) { return '<ol class="lg-ol">' + a.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ol>'; }
  function NOTE(t) { return '<p class="lg-note">' + t + '</p>'; }
  function A(href, t) { return '<a href="' + href + '">' + t + '</a>'; }
  function TBL(cap, heads, rows, cls) {
    return '<div class="lg-tbl' + (cls ? ' ' + cls : '') + '" role="region" aria-label="' + cap + '" tabindex="0"><table><caption>' + cap + '</caption><thead><tr>' +
      heads.map(function (h) { return '<th scope="col">' + h + '</th>'; }).join('') + '</tr></thead><tbody>' +
      rows.map(function (r) { return '<tr>' + r.map(function (c, i) { return (i === 0 ? '<th scope="row" data-th="' + heads[0] + '">' : '<td data-th="' + heads[i] + '">') + c + (i === 0 ? '</th>' : '</td>'); }).join('') + '</tr>'; }).join('') +
      '</tbody></table></div>';
  }
  var MAIL = function () { return '<a href="mailto:' + BIZ.mail + '">' + BIZ.mail + '</a>'; };
  var TEL = function () { return '<a href="tel:' + BIZ.telHref + '">' + BIZ.tel + '</a>'; };
  var L = {
    gizlilik: { href: '/gizlilik-politikasi', t: 'Gizlilik Politikası' },
    kvkk: { href: '/kvkk-aydinlatma-metni', t: 'KVKK Aydınlatma Metni' },
    cerez: { href: '/cerez-politikasi', t: 'Çerez Politikası' },
    kullanim: { href: '/kullanim-kosullari', t: 'Kullanım Koşulları' },
    basvuru: { href: '/veri-sahibi-basvuru-formu', t: 'Veri Sahibi Başvuru Formu' }
  };
  function LK(k) { return A(L[k].href, L[k].t); }

  /* Kimlik bloğu — beş sayfada aynı */
  function IDENT() {
    return '<dl class="lg-id">' +
      '<div><dt>Veri sorumlusu</dt><dd>' + BIZ.controller + ' ' + g('G-01') + '</dd></div>' +
      '<div><dt>Adres</dt><dd>' + BIZ.addr + ' ' + g('G-02') + '</dd></div>' +
      '<div><dt>Telefon</dt><dd>' + TEL() + '</dd></div>' +
      '<div><dt>E-posta</dt><dd>' + MAIL() + '</dd></div>' +
      (BIZ.kep ? '<div><dt>KEP adresi</dt><dd>' + BIZ.kep + '</dd></div>' : '') +
      '<div><dt>İnternet sitesi</dt><dd><a href="' + BIZ.web + '">' + BIZ.webText + '</a></dd></div>' +
      '</dl>';
  }

  /* KVKK m.11 hakları — yalnızca Başvuru Formu sayfasında tam liste; diğerlerinde kısa özet + bağlantı */
  var RIGHTS = [
    'Kişisel verilerinizin işlenip işlenmediğini öğrenme,',
    'İşlenmişse buna ilişkin bilgi talep etme,',
    'İşlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,',
    'Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,',
    'Eksik veya yanlış işlenmişse düzeltilmesini isteme,',
    'Kanunun 7. maddesindeki şartlar çerçevesinde silinmesini veya yok edilmesini isteme,',
    'Düzeltme, silme veya yok etme işlemlerinin, verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,',
    'İşlenen verilerin münhasıran otomatik sistemlerle analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme,',
    'Kanuna aykırı işleme sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme.'
  ];
  function RIGHTS_SHORT() {
    return P('6698 sayılı Kanun\'un 11. maddesi uyarınca; kişisel verilerinizin işlenip işlenmediğini öğrenme, bilgi isteme, amaca uygun kullanılıp kullanılmadığını ve aktarıldığı üçüncü kişileri öğrenme, düzeltme, silme veya yok etme isteme, bu işlemlerin aktarılan kişilere bildirilmesini isteme, münhasıran otomatik analiz sonucunda aleyhinize çıkan bir sonuca itiraz etme ve kanuna aykırı işleme nedeniyle uğradığınız zararın giderilmesini talep etme haklarına sahipsiniz. Hakların tam listesi ve başvuru yöntemleri ' + LK('basvuru') + ' sayfasındadır.');
  }

  /* =====================================================================
     SAYFALAR
     ===================================================================== */
  var PAGES = {};

  /* ---------------------------------------------------------------- 01 */
  PAGES.gizlilik = {
    tag: 'n1-gizlilik-politikasi-v1', key: 'gizlilik', no: '01',
    h1: ['GİZLİLİK', 'POLİTİKASI.'], title: 'Gizlilik Politikası',
    lede: 'Web sitemizi ziyaret ettiğinizde, bize yazdığınızda veya bir proje için teklif istediğinizde bilgilerinizle nasıl ilgilendiğimizi sade bir dille anlatıyoruz.',
    sections: [
      { id: 'kapsam', t: 'Bu politikanın kapsamı', h:
        P('Bu politika, ' + BIZ.webText + ' adresindeki web sitemizi ziyaret eden kişiler, bizimle iletişime geçen potansiyel müşteriler ve iş ortakları ile teklif talebinde bulunan kişiler için hazırlanmıştır. Amacı; hangi bilgilerin hangi durumlarda bize ulaşabileceğini, bunları ne için kullandığımızı ve haklarınızı nasıl kullanabileceğinizi genel olarak açıklamaktır.') +
        P('Bu politika, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamındaki aydınlatmanın yerine geçmez. Her veri işleme faaliyetine ilişkin veri kategorileri, amaçlar ve hukuki sebepler ' + LK('kvkk') + '\'nde; çerez ve benzeri teknolojiler ise ' + LK('cerez') + '\'nda ayrıca açıklanır.') +
        P('Müşterilerimiz adına yürüttüğümüz reklam, sosyal medya veya e-ticaret çalışmalarında işlenen veriler bu politikanın konusu değildir. Bu çalışmalarda ilgili müşterinin kendi aydınlatma ve gizlilik metinleri ile aramızdaki sözleşme uygulanır. ' + g('D-13'))
      },
      { id: 'biz', t: 'Biz kimiz', h:
        P('Bu politikada "1N Digital Media" veya "biz" ifadeleri, aşağıdaki işletmeyi ifade eder. KVKK bakımından veri sorumlusu bu işletmedir.') + IDENT()
      },
      { id: 'veriler', t: 'Hangi bilgiler bize ulaşabilir', h:
        P('Bize ulaşan bilgiler, siteyi nasıl kullandığınıza ve bizimle hangi yoldan iletişime geçtiğinize göre değişir. Gerekmeyen bilgiyi istemeyiz.') +
        H3('Siteyi yalnızca ziyaret ettiğinizde') +
        P('Sitenin çalışması için bağlantı sırasında tarayıcınızın gönderdiği teknik bilgiler (IP adresi, tarih ve saat, tarayıcı ve cihaz türü, ziyaret edilen sayfa gibi) site altyapısı tarafından işlenebilir. Zorunlu olmayan çerezler ve benzeri teknolojiler yalnızca izin vermeniz hâlinde kullanılır. ' + g('D-11') + g('C-03')) +
        H3('Bize yazdığınızda veya teklif istediğinizde') +
        P('İletişim ve teklif süreçlerinde genellikle adınız ve soyadınız, e-posta adresiniz, telefon numaranız, temsil ettiğiniz firma ve talebinizin içeriği bize ulaşır. Formlarda zorunlu ve isteğe bağlı alanlar ayrıca belirtilir. ' + g('D-01')) +
        P('Sitedeki WhatsApp bağlantısı, e-posta ve telefon da iletişim yolu olarak kullanılabilir. Bu yollarla paylaştığınız bilgiler, ilgili hizmetin kendi altyapısından da geçer. ' + g('D-02')) +
        H3('Sizden istemediğimiz bilgiler') +
        P('Sağlık, din, etnik köken, biyometrik veri gibi özel nitelikli kişisel verileri iletişim veya teklif süreçlerinde istemiyoruz. Lütfen mesajlarınızda bu tür bilgileri paylaşmayın. ' + g('D-12'))
      },
      { id: 'amaclar', t: 'Bilgileri ne için kullanırız', h:
        UL([
          'Sorularınıza ve iletişim taleplerinize yanıt vermek,',
          'Teklif talebinizi değerlendirmek, ihtiyaçlarınızı anlamak için görüşme planlamak ve teklif hazırlamak,',
          'Bir iş ilişkisi kurulursa projeyi yürütmek, faturalama ve kanuni yükümlülüklerimizi yerine getirmek, ' + g('D-04'),
          'Sitenin güvenli ve doğru çalışmasını sağlamak, kötüye kullanımı önlemek,',
          'Yalnızca izin vermeniz hâlinde sitenin kullanımını ölçmek ve tanıtım faaliyetlerimizin etkisini değerlendirmek, ' + g('C-01'),
          'Kişisel verilerinize ilişkin başvurularınızı sonuçlandırmak.'
        ]) +
        P('Bilgilerinizi satmayız. ' + g('D-07') + ' Bilgilerinizi, size açıklanan amaçlarla bağlantısız bir amaç için kullanmayız; yeni bir amaç ortaya çıkarsa işleme başlamadan önce sizi ayrıca bilgilendiririz.') +
        P('Size kampanya veya bülten gibi ticari elektronik ileti göndermemiz, ancak buna ayrıca onay vermeniz hâlinde mümkündür; onayınızı istediğiniz zaman geri alabilirsiniz. ' + g('D-06'))
      },
      { id: 'yaklasim', t: 'Kişisel verileri korumaya yaklaşımımız', h:
        P('Kişisel verileri KVKK\'nın 4. maddesindeki genel ilkelere uygun olarak işlemeyi esas alırız: hukuka ve dürüstlük kurallarına uygunluk, doğruluk ve gerektiğinde güncellik, belirli, açık ve meşru amaçlar, amaçla bağlantılı, sınırlı ve ölçülü olma ve yalnızca gerekli süre kadar saklama.') +
        P('Bir veri işleme faaliyeti açık rızanıza dayanıyorsa bunu sizden ayrı bir metinle ve özgür iradenize bırakarak isteriz. Aydınlatma metinleri bir onay metni değildir; yalnızca okuduğunuzu ve anladığınızı belirtmeniz istenebilir.')
      },
      { id: 'saglayicilar', t: 'Üçüncü taraf hizmet sağlayıcılar', h:
        P('Web sitemiz Wix altyapısı üzerinde yayınlanmaktadır. Sitenin barındırılması, formların iletilmesi, e-posta, bulut depolama ve iletişim gibi işler için hizmet sağlayıcılardan yararlanabiliriz. Bu sağlayıcılar, kişisel verilere yalnızca hizmeti sunmak için gerektiği ölçüde erişebilir. ' + g('D-07')) +
        P('Hizmet sağlayıcının yurt dışında bulunması veya verilere yurt dışından erişmesi, kişisel verilerin yurt dışına aktarılması sonucunu doğurabilir. Bu durumda aktarım, KVKK\'nın 9. maddesinde öngörülen yollardan birine dayandırılır. Ayrıntılar ' + LK('kvkk') + '\'ndedir. ' + g('D-08')) +
        P('Sitede yer alan sosyal medya hesaplarımıza (Instagram, Facebook, LinkedIn, YouTube) veya başka sitelere verilen bağlantılara tıkladığınızda, o platformların kendi gizlilik kuralları geçerli olur.')
      },
      { id: 'saklama', t: 'Saklama ve silme', h:
        P('Kişisel verileri, işlendikleri amaç için gerekli olan süre boyunca ve ilgili mevzuatta öngörülen süreler kadar saklarız. Teklif ve iletişim talepleri, talep sonuçlandıktan sonra gereksiz hâle geldiğinde; iş ilişkisine ilişkin kayıtlar ise ticari ve vergisel saklama yükümlülükleri sona erdiğinde silinir, yok edilir veya anonim hâle getirilir. ' + g('D-09')) +
        P('Silme, yok etme ve anonim hâle getirme işlemleri KVKK\'nın 7. maddesi ve Kişisel Verilerin Silinmesi, Yok Edilmesi veya Anonim Hâle Getirilmesi Hakkında Yönetmelik çerçevesinde yürütülür. ' + g('G-05'))
      },
      { id: 'guvenlik', t: 'Web sitesi güvenliği', h:
        P('KVKK\'nın 12. maddesi uyarınca kişisel verilerin hukuka aykırı olarak işlenmesini ve erişilmesini önlemek, verileri korumak için uygun güvenlik düzeyini sağlamaya yönelik teknik ve idari tedbirleri almakla yükümlüyüz. Bu kapsamda erişimi yalnızca işi gereği ihtiyaç duyan kişilerle sınırlamayı, hesaplarda güçlü kimlik doğrulama kullanmayı ve hizmet sağlayıcılarımızla gizlilik yükümlülüklerini belirlemeyi esas alırız. ' + g('D-10')) +
        P('Hiçbir internet iletimi veya depolama yöntemi tamamen risksiz değildir. İşlenen kişisel verilerin kanuni olmayan yollarla başkaları tarafından elde edilmesi hâlinde, durumu KVKK\'nın 12. maddesi uyarınca en kısa sürede ilgili kişilere ve Kişisel Verileri Koruma Kuruluna bildiririz.')
      },
      { id: 'iliskiler', t: 'Diğer yasal metinlerle ilişkisi', h:
        UL([
          LK('kvkk') + ': KVKK\'nın 10. maddesi kapsamındaki aydınlatma. Hangi faaliyette hangi verinin, hangi amaçla ve hangi hukuki sebeple işlendiğini tablo hâlinde gösterir.',
          LK('cerez') + ': Çerez ve benzeri teknolojiler, kategorileri ve tercihlerinizi nasıl yöneteceğiniz.',
          LK('kullanim') + ': Web sitesinin kullanım esasları.',
          LK('basvuru') + ': KVKK kapsamındaki haklarınızı kullanmak için başvuru yöntemleri ve yazdırılabilir form.'
        ])
      },
      { id: 'haklar', t: 'Haklarınız ve başvuru', h:
        RIGHTS_SHORT() +
        P('Başvurularınız, talebin niteliğine göre en kısa sürede ve en geç 30 gün içinde ücretsiz olarak sonuçlandırılır. İşlemin ayrıca bir maliyet gerektirmesi hâlinde Kişisel Verileri Koruma Kurulunca belirlenen tarifedeki ücret alınabilir.')
      },
      { id: 'degisiklik', t: 'Politikadaki değişiklikler', h:
        P('Veri işleme faaliyetlerimiz, kullandığımız hizmetler veya mevzuat değiştiğinde bu politikayı güncelleriz. Güncel sürüm her zaman bu sayfada yayımlanır ve sayfanın başındaki tarih değişir. Önemli değişikliklerde, mümkün olduğu ölçüde sizi ayrıca bilgilendiririz. ' + g('P-01'))
      },
      { id: 'iletisim', t: 'İletişim', h:
        P('Bu politika veya kişisel verileriniz hakkındaki sorularınız için bize ' + MAIL() + ' adresinden ya da ' + TEL() + ' numarasından ulaşabilirsiniz. KVKK kapsamındaki resmî başvurular için ' + LK('basvuru') + ' sayfasındaki yöntemleri kullanmanız gerekir.')
      }
    ]
  };

  /* ---------------------------------------------------------------- 02 */
  PAGES.kvkk = {
    tag: 'n1-kvkk-aydinlatma-v1', key: 'kvkk', no: '02',
    h1: ['KVKK AYDINLATMA', 'METNİ.'], title: 'KVKK Aydınlatma Metni',
    lede: '6698 sayılı Kanun\'un 10. maddesi ve Aydınlatma Yükümlülüğünün Yerine Getirilmesinde Uyulacak Usul ve Esaslar Hakkında Tebliğ kapsamında; web sitesi ziyaretçileri, bizimle iletişime geçen kişiler, potansiyel müşteriler ve iş ortakları için hazırlanmıştır.',
    sections: [
      { id: 'sorumlu', t: 'Veri sorumlusu', h:
        P('Kişisel verileriniz, veri sorumlusu sıfatıyla aşağıda bilgileri yer alan işletme tarafından işlenmektedir.') + IDENT() +
        NOTE('Bu metin bir bilgilendirmedir; onay veya açık rıza metni değildir. Açık rızaya dayanan faaliyetler için rızanız ayrı bir metinle ve ayrı bir beyanla istenir.')
      },
      { id: 'faaliyetler', t: 'İşleme faaliyetleri, amaçlar ve hukuki sebepler', h:
        P('Aşağıdaki tabloda her faaliyet için işlenen veri kategorileri, işleme amacı, verinin elde edilme yöntemi ve dayanılan hukuki sebep birlikte gösterilmiştir. Hukuki sebepler KVKK\'nın 5. maddesinde sayılan şartlardır.') +
        TBL('Kişisel veri işleme faaliyetleri', ['Faaliyet', 'Veri kategorileri', 'Amaç', 'Toplama yöntemi', 'Hukuki sebep'], [
          ['İletişim talepleri ' + g('D-01') + g('D-02') + g('D-03'), 'Kimlik (ad, soyad); iletişim (e-posta, telefon); talep içeriği; varsa temsil edilen firma ve unvan', 'Soru ve taleplere yanıt vermek, gerekiyorsa sizi geri aramak', 'Sitedeki iletişim formu, e-posta, telefon ve WhatsApp üzerinden, sizin paylaşmanızla; elektronik ortamda kısmen otomatik', 'KVKK m.5/2-f: talebinize yanıt verebilmemiz için veri işlenmesinin meşru menfaatimiz bakımından zorunlu olması'],
          ['Teklif talepleri ' + g('D-01'), 'Kimlik; iletişim; firma bilgisi; proje ihtiyacı, kapsam ve varsa bütçe ve zaman tercihleri; görüşme notları', 'Talebi değerlendirmek, görüşme planlamak, teklif hazırlamak ve sunmak', 'Teklif formu, e-posta, telefon veya görüşme sırasında sizin paylaşmanızla', 'KVKK m.5/2-c: talebiniz üzerine bir sözleşmenin kurulmasıyla doğrudan ilgili olması (sözleşme öncesi aşama); firma çalışanları bakımından m.5/2-f'],
          ['Müşteri ve iş ortağı ilişkileri ' + g('D-04'), 'Kimlik; iletişim; müşteri işlem bilgileri (sözleşme, sipariş, proje yazışmaları); finans (fatura ve ödeme bilgileri); hukuki işlem', 'Sözleşmeyi kurmak ve ifa etmek, projeyi yürütmek, faturalamak, ticari ve vergisel yükümlülükleri yerine getirmek', 'Sözleşme süreci, e-posta, proje yazışmaları ve muhasebe kayıtları', 'KVKK m.5/2-c sözleşmenin kurulması ve ifası; m.5/2-ç hukuki yükümlülüğümüzü yerine getirebilmemiz; m.5/2-e bir hakkın tesisi, kullanılması veya korunması'],
          ['Web sitesinin güvenli çalışması ' + g('D-11'), 'İşlem güvenliği (IP adresi, tarih ve saat, tarayıcı ve cihaz bilgisi, erişim kayıtları)', 'Sitenin teknik olarak çalışması, güvenliğinin sağlanması, hataların ve kötüye kullanımın tespiti', 'Siteyi ziyaretiniz sırasında site altyapısı tarafından otomatik olarak', 'KVKK m.5/2-f meşru menfaat; uyuşmazlık hâlinde m.5/2-e'],
          ['Zorunlu çerezler ' + g('C-01'), 'İşlem güvenliği; site tercihleri (örneğin çerez tercihiniz)', 'Talep ettiğiniz sayfanın ve işlevin sunulması, çerez tercihinizin hatırlanması', 'Tarayıcınıza yerleştirilen çerezler aracılığıyla otomatik olarak', 'KVKK m.5/2-c ve m.5/2-f (ayrıntı: ' + LK('cerez') + ')'],
          ['Analitik ve pazarlama çerezleri (kullanılıyorsa) ' + g('C-01') + g('C-03'), 'Pazarlama; internet sitesi kullanım bilgileri (görüntülenen sayfalar, etkileşimler, çevrim içi tanımlayıcılar)', 'Site kullanımını ölçmek, tanıtım ve reklam faaliyetlerinin etkisini değerlendirmek', 'Çerezler ve benzeri teknolojilerle, yalnızca izin vermenizin ardından otomatik olarak', 'KVKK m.5/1 açık rıza (ayrı olarak ve çerez tercih aracıyla alınır)'],
          ['Ticari elektronik ileti (yapılıyorsa) ' + g('D-06'), 'İletişim (e-posta, telefon); pazarlama tercihleri', 'Kampanya, bülten ve tanıtım iletileri göndermek', 'Ayrıca verdiğiniz onayla, form veya yazılı ortamda', 'KVKK m.5/1 açık rıza; ayrıca 6563 sayılı Kanun uyarınca ileti onayı'],
          ['Çalışan adayı başvuruları ' + g('D-05'), 'Kimlik; iletişim; özgeçmiş ve mesleki deneyim bilgileri; başvuru yazışmaları', 'Başvuruyu değerlendirmek ve sizinle iletişime geçmek', 'Başvuru sayfaları veya e-posta yoluyla, sizin paylaşmanızla', 'KVKK m.5/2-c (talebiniz üzerine iş sözleşmesinin kurulmasıyla doğrudan ilgili olması); m.5/2-f'],
          ['İlgili kişi başvuruları', 'Kimlik; iletişim; talep konusu ve ekleri', 'KVKK kapsamındaki başvurunuzu sonuçlandırmak ve kayıt altına almak', 'Yazılı başvuru ve Tebliğ\'de öngörülen elektronik yöntemler', 'KVKK m.5/2-ç (Kanun\'un 13. maddesindeki yükümlülük)'],
          ['Hukuki süreçler ve resmî talepler', 'Kimlik; iletişim; hukuki işlem; ilgili yazışmalar', 'Uyuşmazlıklarda hakların korunması, yetkili kurumların taleplerinin karşılanması', 'Mevcut kayıtlardan', 'KVKK m.5/2-ç ve m.5/2-e']
        ]) +
        P('Özel nitelikli kişisel verilerinizi bu faaliyetler kapsamında işlemeyi amaçlamıyoruz. Bu tür bilgileri formlarda veya mesajlarda paylaşmamanızı rica ederiz. ' + g('D-12'))
      },
      { id: 'aktarim', t: 'Aktarılabileceği alıcı grupları', h:
        P('Kişisel verileriniz, yukarıdaki amaçlarla sınırlı olarak ve KVKK\'nın 8. maddesine uygun şekilde aşağıdaki alıcı gruplarına aktarılabilir:') +
        TBL('Alıcı grupları ve aktarım amaçları', ['Alıcı grubu', 'Aktarım amacı'], [
          ['Web sitesi altyapı ve barındırma hizmeti sağlayıcıları ' + g('D-07'), 'Sitenin yayınlanması, formların iletilmesi ve teknik güvenlik'],
          ['E-posta, bulut depolama, iletişim ve mesajlaşma hizmeti sağlayıcıları ' + g('D-07'), 'Yazışmaların yürütülmesi ve kayıtların saklanması'],
          ['Ölçüm ve reklam hizmeti sağlayıcıları (yalnızca açık rıza verilmişse) ' + g('C-01'), 'Site kullanımının ölçülmesi ve tanıtım faaliyetlerinin değerlendirilmesi'],
          ['Muhasebe ve mali danışmanlık desteği alınan kişiler ' + g('D-04'), 'Faturalama ve vergisel yükümlülüklerin yerine getirilmesi'],
          ['Hukuk danışmanları', 'Hakların korunması ve hukuki süreçlerin yürütülmesi'],
          ['Yetkili kamu kurum ve kuruluşları ile yargı mercileri', 'Kanunen yetkili mercilerin talebi ve hukuki yükümlülüklerin yerine getirilmesi']
        ])
      },
      { id: 'yurtdisi', t: 'Yurt dışına aktarım', h:
        P('Hizmet aldığımız bazı sağlayıcıların sunucularının yurt dışında bulunması veya verilere yurt dışından erişilmesi, kişisel verilerin yurt dışına aktarılması sonucunu doğurabilir. ' + g('D-07') + g('D-08')) +
        P('Bu durumda aktarım, 7499 sayılı Kanun ile değişik KVKK\'nın 9. maddesi ve Kişisel Verilerin Yurt Dışına Aktarılmasına İlişkin Usul ve Esaslar Hakkında Yönetmelik kapsamında yürütülür:') +
        OL([
          'Aktarımın yapılacağı ülke, sektör veya uluslararası kuruluş hakkında Kişisel Verileri Koruma Kurulunun yeterlilik kararı varsa ve KVKK\'nın 5. veya 6. maddesindeki şartlardan biri mevcutsa aktarım bu karara dayanır.',
          'Yeterlilik kararı yoksa, ilgili kişinin aktarımın yapılacağı ülkede de haklarını kullanma ve etkili kanun yollarına başvurma imkânının bulunması kaydıyla, Kanun\'da sayılan uygun güvencelerden biri sağlanır. Kurulun ilan ettiği standart sözleşme kullanılırsa, sözleşme imzaların tamamlanmasından itibaren beş iş günü içinde Kurula bildirilir.',
          'Yeterlilik kararı ve uygun güvence bulunmuyorsa aktarım, yalnızca arızi nitelikte ve Kanun\'un 9. maddesinin altıncı fıkrasında sayılan hâllerden birinin varlığı hâlinde yapılabilir. Bu hâllerden biri, olası riskler hakkında bilgilendirilmeniz kaydıyla açık rızanızdır. Düzenli ve süreklilik gösteren aktarımlar bu istisnalara dayandırılamaz.'
        ]) +
        P('Hangi sağlayıcı için hangi yolun kullanıldığı, talebiniz üzerine ' + LK('basvuru') + ' yoluyla size bildirilir.')
      },
      { id: 'saklama', t: 'Saklama ve imha', h:
        P('Kişisel verileriniz, yukarıda belirtilen amaçlar için gerekli olan süre ve ilgili mevzuatta öngörülen saklama süreleri boyunca saklanır. Ticari defter ve belgeler ile faturaya ilişkin kayıtlar Türk Ticaret Kanunu ve Vergi Usul Kanunu\'nda öngörülen süreler kadar saklanır. ' + g('D-09')) +
        P('Saklama süresinin dolması veya işleme şartlarının ortadan kalkması hâlinde kişisel veriler, KVKK\'nın 7. maddesi ve Kişisel Verilerin Silinmesi, Yok Edilmesi veya Anonim Hâle Getirilmesi Hakkında Yönetmelik uyarınca re\'sen veya talebiniz üzerine silinir, yok edilir ya da anonim hâle getirilir. ' + g('G-05'))
      },
      { id: 'haklar', t: 'Haklarınız', h: RIGHTS_SHORT() },
      { id: 'basvuru', t: 'Başvuru yöntemleri', h:
        P('KVKK\'nın 13. maddesi ve Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ uyarınca başvurunuzu Türkçe olarak; yazılı şekilde yukarıdaki adresimize veya Tebliğ\'de öngörülen elektronik yöntemlerle iletebilirsiniz. Başvuru yöntemleri, başvuruda bulunması gereken bilgiler ve yazdırılabilir form ' + LK('basvuru') + ' sayfasında yer alır.') +
        P('Başvurularınız en kısa sürede ve en geç 30 gün içinde ücretsiz olarak sonuçlandırılır; işlemin ayrıca bir maliyet gerektirmesi hâlinde Kurulca belirlenen tarifedeki ücret alınabilir.')
      },
      { id: 'iletisim', t: 'İletişim ve güncelleme', h:
        P('Bu metne ilişkin sorularınız için ' + MAIL() + ' adresine yazabilir veya ' + TEL() + ' numarasını arayabilirsiniz.') +
        P('Veri işleme faaliyetlerimiz değiştiğinde bu metin güncellenir; işleme amacı değiştiğinde, yeni amaç için işleme başlamadan önce ayrıca bilgilendirme yapılır. ' + g('P-01'))
      }
    ]
  };

  /* ---------------------------------------------------------------- 03 */
  PAGES.cerez = {
    tag: 'n1-cerez-politikasi-v1', key: 'cerez', no: '03',
    h1: ['ÇEREZ', 'POLİTİKASI.'], title: 'Çerez Politikası',
    lede: 'Web sitemizde çerezlerin ve benzeri teknolojilerin nasıl çalıştığını, hangi amaçlarla kullanılabileceğini ve tercihlerinizi nasıl yöneteceğinizi açıklıyoruz.',
    sections: [
      { id: 'nedir', t: 'Çerez nedir', h:
        P('Çerez, bir web sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza kaydedilen küçük bir metin dosyasıdır. Site veya çerezi yerleştiren hizmet, sonraki isteklerde bu dosyayı okuyarak örneğin tercihlerinizi hatırlayabilir ya da oturumunuzun devam ettiğini anlayabilir.') +
        P('Çerezlere benzer şekilde çalışan başka teknolojiler de vardır: piksel etiketleri, tarayıcının yerel depolama alanı (local storage), SDK\'lar ve cihaz parmak izi yöntemleri gibi. Bu politikada "çerez" ifadesi, aksi belirtilmedikçe bu teknolojileri de kapsar. Kişisel Verileri Koruma Kurumunun Çerez Uygulamaları Hakkında Rehberi esas olarak çerezleri ele alır; benzer teknolojilerle kişisel veri işlenmesi de KVKK\'ya tabidir.')
      },
      { id: 'calisma', t: 'Çerezler nasıl çalışır', h:
        H3('Birinci taraf ve üçüncü taraf çerezleri') +
        P('Birinci taraf çerezleri, ziyaret ettiğiniz site tarafından yerleştirilir. Üçüncü taraf çerezleri ise sitede kullanılan başka bir hizmet (örneğin bir ölçüm veya reklam aracı ya da gömülü bir video) tarafından yerleştirilir ve o hizmetin kendi kurallarına tabidir.') +
        H3('Oturum ve kalıcı çerezler') +
        P('Oturum çerezleri tarayıcınızı kapattığınızda silinir. Kalıcı çerezler ise belirlenen süre dolana veya siz silene kadar cihazınızda kalır. Her çerezin saklama süresi aşağıdaki çerez listesinde gösterilir.')
      },
      { id: 'kategoriler', t: 'Çerez kategorileri ve amaçları', h:
        H3('Kesinlikle gerekli çerezler') +
        P('Sitenin açılması, sayfalar arasında gezinmeniz, güvenliğin sağlanması ve çerez tercihinizin hatırlanması gibi, açıkça talep ettiğiniz hizmetin sunulması için zorunlu olan çerezlerdir. Bu çerezler olmadan site düzgün çalışmaz; bu nedenle tercih aracında kapatılamaz.') +
        H3('İşlevsel ve tercih çerezleri') +
        P('Dil, bölge veya görüntüleme tercihleri gibi seçimlerinizi hatırlayarak daha kişisel bir deneyim sunar. Sitenin temel işleyişi için zorunlu değildir; yalnızca izin vermeniz hâlinde kullanılır.') +
        H3('Analitik ve performans çerezleri') +
        P('Sitenin nasıl kullanıldığını (hangi sayfaların ziyaret edildiği, ne kadar süre kalındığı, hata alınıp alınmadığı gibi) ölçmek için kullanılır. Yalnızca izin vermeniz hâlinde etkinleştirilir.') +
        H3('Reklam ve pazarlama çerezleri') +
        P('Tanıtım ve reklam faaliyetlerinin etkisini ölçmek, ilgi alanlarınıza göre reklam göstermek veya sosyal medya platformlarıyla etkileşim sağlamak için kullanılır. Yalnızca izin vermeniz hâlinde etkinleştirilir.') +
        NOTE('Bir dijital reklam ajansı olarak ölçüm ve reklam teknolojileriyle çalışıyoruz; ancak bu sitede hangi araçların gerçekten kullanıldığı aşağıdaki çerez listesinde gösterilir. Listede yer almayan bir aracın sitede çalışması beklenmez. ' + g('C-01'))
      },
      { id: 'liste', t: 'Sitede kullanılan çerezler', h: '<div data-lg-cookies></div>' },
      { id: 'hukuki', t: 'Hukuki sebepler ve açık rıza', h:
        P('Kesinlikle gerekli çerezler aracılığıyla yapılan işleme, talep ettiğiniz hizmetin sunulmasıyla doğrudan ilgili olduğu için KVKK\'nın 5. maddesinin ikinci fıkrasının (c) bendine ve meşru menfaatimiz bakımından zorunlu olduğu ölçüde (f) bendine dayanır.') +
        P('İşlevsel, analitik ve reklam/pazarlama çerezleri ise açık rızanıza (KVKK m.5/1) dayanır. Açık rıza; belirli bir konuya ilişkin, bilgilendirilmeye dayanan ve özgür iradeyle açıklanan rızadır. Bu nedenle:') +
        UL([
          'Zorunlu olmayan çerezler, siz izin vermeden çalıştırılmaz. ' + g('C-03'),
          'Tercih aracında kategoriler önceden seçili gelmez; "Kabul et" ve "Reddet" seçenekleri aynı kolaylıkta sunulur. ' + g('C-02'),
          'Sayfada gezinmeye veya kaydırmaya devam etmek rıza sayılmaz.',
          'Siteye erişim, zorunlu olmayan çerezleri kabul etme şartına bağlanmaz.',
          'Verdiğiniz rıza, kategori bazında ve kayıt altına alınacak şekilde istenir. ' + g('C-02')
        ])
      },
      { id: 'yonetim', t: 'Çerez tercihlerinin yönetimi', h:
        P('Siteyi ilk ziyaretinizde zorunlu olmayan çerezler için tercihiniz sorulur. Tercihinizi daha sonra değiştirmek veya verdiğiniz rızayı geri almak için aşağıdaki kontrolü kullanabilirsiniz.') +
        '<div data-lg-cmp></div>' +
        H3('Rızanın geri alınması') +
        P('Rızanızı istediğiniz zaman, verdiğiniz kadar kolay bir şekilde geri alabilirsiniz. Geri alma, o ana kadar rızaya dayanarak yapılan işlemlerin hukuka uygunluğunu etkilemez; geri almanızdan sonra ilgili çerezler yeniden çalıştırılmaz.') +
        H3('Tarayıcı üzerinden yönetim') +
        P('Çerezleri tarayıcınızın ayarlarından da silebilir veya engelleyebilirsiniz. Bu ayarlar genellikle tarayıcının "Gizlilik" veya "Site verileri" bölümündedir (Chrome, Safari, Firefox, Edge ve mobil tarayıcılarda adları farklı olabilir). Kesinlikle gerekli çerezleri engellemeniz hâlinde sitenin bazı bölümleri çalışmayabilir. Tarayıcı ayarı, sitedeki tercih aracının yerine geçmez; her iki yöntemi de kullanabilirsiniz.')
      },
      { id: 'ucuncu', t: 'Üçüncü taraf hizmet sağlayıcılar ve yurt dışı aktarım', h:
        P('Web sitemiz Wix altyapısı üzerinde yayınlanmaktadır. Sitenin çalışması için altyapı sağlayıcısının çerezleri, ölçüm veya reklam araçları kullanılıyorsa bu araçların sağlayıcıları çerez listesinde ayrıca belirtilir. ' + g('C-01') + g('C-06')) +
        P('Üçüncü taraf çerezleri aracılığıyla elde edilen veriler, sağlayıcının yurt dışındaki sunucularında işlenebilir. Bu durumda aktarım KVKK\'nın 9. maddesinde öngörülen yollardan birine dayandırılır; ayrıntılar ' + LK('kvkk') + '\'nin "Yurt dışına aktarım" bölümündedir. ' + g('C-05'))
      },
      { id: 'guncelleme', t: 'Politikadaki değişiklikler', h:
        P('Sitede kullanılan çerezler değiştiğinde çerez listesi ve bu politika güncellenir. Yeni bir zorunlu olmayan çerez kategorisi eklenirse rızanız yeniden istenir. ' + g('P-01'))
      },
      { id: 'iletisim', t: 'İletişim', h:
        P('Çerezlerle ilgili sorularınız için ' + MAIL() + ' adresine yazabilirsiniz. KVKK kapsamındaki haklarınızı kullanmak için ' + LK('basvuru') + ' sayfasındaki yöntemleri kullanabilirsiniz.')
      }
    ]
  };

  /* ---------------------------------------------------------------- 04 */
  PAGES.kullanim = {
    tag: 'n1-kullanim-kosullari-v1', key: 'kullanim', no: '04',
    h1: ['KULLANIM', 'KOŞULLARI.'], title: 'Kullanım Koşulları',
    lede: BIZ.webText + ' web sitesinin kullanım esaslarını açıklar. Bu koşullar bir hizmet sözleşmesi veya satış sözleşmesi değildir.',
    sections: [
      { id: 'taraflar', t: 'Tanımlar ve taraflar', h:
        UL([
          '<strong>Site:</strong> ' + BIZ.webText + ' alan adı altındaki tüm sayfalar.',
          '<strong>1N Digital Media / biz:</strong> ' + BIZ.controller + '. ' + g('G-01'),
          '<strong>Kullanıcı / siz:</strong> Siteyi ziyaret eden veya Site üzerinden bizimle iletişime geçen herkes.'
        ]) +
        P('Bu koşullar Siteyi kullanan herkes için geçerlidir. Koşullar, kanunun emredici hükümlerinden ve tüketici olarak sahip olduğunuz haklardan hiçbirini ortadan kaldırmaz veya sınırlamaz.')
      },
      { id: 'kapsam', t: 'Sitenin kapsamı ve hizmet tanıtımları', h:
        P('Site; 1N Digital Media\'yı, ekibini, çalışma yaklaşımını ve sunduğu reklam, sosyal medya, kreatif prodüksiyon, e-ticaret yönetimi, UI/UX tasarım, uygulama geliştirme ve yapay zekâ çözümleri gibi hizmetleri tanıtmak için hazırlanmıştır.') +
        P('Site üzerinden ürün veya hizmet satışı, ödeme ya da üyelik işlemi yapılmaz. Sitede yer alan hizmet açıklamaları, örnek çalışmalar ve görseller tanıtım amaçlıdır; bir teklif, fiyat taahhüdü veya belirli bir sonucun garantisi değildir.')
      },
      { id: 'erisim', t: 'Siteye erişim ve kullanım', h:
        P('Siteyi yürürlükteki mevzuata, bu koşullara ve dürüstlük kurallarına uygun şekilde kullanabilirsiniz. Siteye kesintisiz erişimi amaçlarız; ancak bakım, güncelleme veya altyapı sağlayıcısından kaynaklanan sebeplerle erişim geçici olarak durabilir.')
      },
      { id: 'sorumluluk-kullanici', t: 'Kullanıcının sorumlulukları ve güvenli kullanım', h:
        P('Siteyi kullanırken aşağıdakileri yapmamanızı rica ederiz:') +
        UL([
          'Sitenin veya altyapısının işleyişini bozmaya, güvenlik önlemlerini aşmaya, yetkisiz erişim sağlamaya yönelik girişimlerde bulunmak,',
          'Siteyi zararlı yazılım yaymak, istenmeyen ileti göndermek veya otomatik araçlarla aşırı yük oluşturmak için kullanmak,',
          'Formlar aracılığıyla başkasına ait bilgileri izinsiz paylaşmak, gerçeğe aykırı veya hukuka aykırı içerik göndermek,',
          'Sitedeki içerikleri aşağıdaki fikrî haklar bölümüne aykırı şekilde kopyalamak veya kullanmak.'
        ]) +
        P('Formlar veya iletişim kanalları aracılığıyla bize ilettiğiniz bilgilerin doğru olmasından ve üçüncü kişilere ait bilgileri paylaşıyorsanız buna yetkili olmanızdan siz sorumlusunuz.')
      },
      { id: 'fikri', t: 'İçeriklerin fikrî hakları', h:
        P('Sitedeki metinler, tasarımlar, fotoğraflar, videolar, animasyonlar, yazılım kodları ve diğer içerikler 5846 sayılı Fikir ve Sanat Eserleri Kanunu kapsamında korunur. Bu içeriklerin hakları, aksi belirtilmedikçe 1N Digital Media\'ya veya içerik sahiplerine aittir.') +
        P('İçerikleri kişisel bilgilenme amacıyla görüntüleyebilir ve kaynak göstererek kısa alıntılar yapabilirsiniz. Bunun dışında içeriklerin çoğaltılması, işlenmesi, yayılması veya ticari amaçla kullanılması için önceden yazılı iznimizi almanız gerekir.')
      },
      { id: 'marka', t: 'Marka, logo ve görsel kullanımı', h:
        P('"1N Digital Media" adı, 1N logosu ve sitenin görsel kimliği iznimiz olmadan kullanılamaz. Bu unsurların, bizimle bir bağlantı olduğu izlenimini verecek şekilde kullanılması da buna dahildir. ' + g('K-02')) +
        P('Sitede yer alan müşteri ve iş ortağı adları, logoları ve çalışmaları ilgili hak sahiplerine aittir ve yalnızca birlikte yürütülen işleri tanıtmak amacıyla yer alır. ' + g('K-03'))
      },
      { id: 'baglanti', t: 'Üçüncü taraf bağlantıları', h:
        P('Site; sosyal medya hesaplarımıza, iş ortaklarımızın sitelerine ve başka internet sitelerine bağlantılar içerebilir. Bu siteler bizim kontrolümüzde değildir; içerikleri, güvenlikleri ve gizlilik uygulamaları kendi koşullarına tabidir. Bağlantı verilmesi, o sitenin içeriğinin onaylandığı anlamına gelmez.')
      },
      { id: 'teklif', t: 'İletişim ve teklif talepleri', h:
        P('Site üzerinden gönderdiğiniz bir iletişim veya teklif talebi, sizinle iletişime geçmemiz için bir davettir. Talebin gönderilmesi tek başına taraflar arasında bağlayıcı bir hizmet sözleşmesi kurmaz ve tarafları bir sözleşme yapmakla yükümlü kılmaz.') +
        P('Bir işbirliği kararlaştırılırsa hizmetin kapsamı, süresi, bedeli, ödeme koşulları, fikrî hakların devri ve diğer hususlar taraflar arasında ayrıca yapılacak yazılı bir hizmet sözleşmesi veya teklif onayıyla belirlenir. Bu koşullar o sözleşmenin yerine geçmez.') +
        P('Teklif ve iletişim süreçlerinde kişisel verilerinizin nasıl işlendiği ' + LK('kvkk') + '\'nde açıklanır.')
      },
      { id: 'guncellik', t: 'Bilgilerin güncelliği ve hizmetlerdeki değişiklikler', h:
        P('Sitedeki bilgilerin doğru ve güncel olması için özen gösteririz. Bununla birlikte hizmetlerimiz, çalışma yöntemlerimiz ve sitedeki içerikler zaman içinde değişebilir; bir hizmeti sunmayı bırakabilir, yeni hizmetler ekleyebilir veya içerikleri önceden bildirmeksizin güncelleyebiliriz. Güncel kapsam ve koşullar için bizimle iletişime geçmeniz önerilir.')
      },
      { id: 'sorumluluk', t: 'Sorumluluk', h:
        P('Sitedeki içerikler genel bilgilendirme amaçlıdır. Bu içeriklere dayanarak verilen kararlar için, size özel bir değerlendirme yapılmadan önce bizimle iletişime geçmenizi öneririz.') +
        P('Sitenin geçici olarak erişilemez olmasından veya üçüncü taraf sitelerdeki içeriklerden doğan zararlar bakımından sorumluluğumuz, yürürlükteki mevzuatın izin verdiği ölçüdedir. Bu sınırlama; kast veya ağır ihmalden doğan sorumluluğu (6098 sayılı Türk Borçlar Kanunu m.115) ve kanunun emredici hükümlerinden doğan sorumluluğu kapsamaz.')
      },
      { id: 'veriler', t: 'Kişisel veriler ve çerezler', h:
        P('Site kullanımı sırasında işlenen kişisel veriler hakkında bilgi ' + LK('gizlilik') + ' ve ' + LK('kvkk') + '\'nde, çerez ve benzeri teknolojiler hakkında bilgi ' + LK('cerez') + '\'nda yer alır. KVKK kapsamındaki haklarınızı ' + LK('basvuru') + ' sayfasındaki yöntemlerle kullanabilirsiniz.')
      },
      { id: 'hukuk', t: 'Uygulanacak hukuk ve uyuşmazlıklar', h:
        P('Bu koşullar Türkiye Cumhuriyeti hukukuna tabidir. Uyuşmazlıklarda yetkili mahkeme ve icra daireleri, yürürlükteki usul hukuku kurallarına göre belirlenir.') +
        P('Tüketici sıfatıyla hareket ediyorsanız, 6502 sayılı Tüketicinin Korunması Hakkında Kanun uyarınca tüketici hakem heyetlerine ve tüketici mahkemelerine başvurma hakkınız saklıdır.')
      },
      { id: 'guncelleme', t: 'Koşulların güncellenmesi', h:
        P('Bu koşulları gerektiğinde güncelleyebiliriz. Güncel metin bu sayfada yayımlandığı andan itibaren Sitenin kullanımına uygulanır; önceden kurulmuş sözleşmeleri değiştirmez. ' + g('P-01'))
      },
      { id: 'iletisim', t: 'İletişim', h: P('Bu koşullarla ilgili sorularınız için:') + IDENT() + ' ' + g('K-01') }
    ]
  };

  /* ---------------------------------------------------------------- 05 */
  PAGES.basvuru = {
    tag: 'n1-veri-sahibi-basvuru-v1', key: 'basvuru', no: '05',
    h1: ['VERİ SAHİBİ', 'BAŞVURU FORMU.'], title: 'Veri Sahibi Başvuru Formu',
    lede: '6698 sayılı Kanun kapsamındaki haklarınızı kullanmak için başvuru yöntemlerini açıklar. Formu bu sayfada doldurup yazdırabilir, imzalayarak başvurunuzda kullanabilirsiniz.',
    sections: [
      { id: 'aciklama', t: 'Başvuru hakkında', h:
        P('Kişisel verisi işlenen gerçek kişiler (ilgili kişiler), KVKK\'nın 11. maddesindeki haklarına ilişkin taleplerini veri sorumlusuna iletebilir. Başvurular Türkçe yapılmalıdır.') +
        NOTE('Bu sayfadaki form bir gönderim formu değildir. Alanlara yazdıklarınız hiçbir yere gönderilmez ve kaydedilmez; yalnızca yazdırma için tarayıcınızda kullanılır. Başvurunuzu aşağıdaki yöntemlerden biriyle iletmeniz gerekir.')
      },
      { id: 'sorumlu', t: 'Veri sorumlusu', h: IDENT() },
      { id: 'haklar', t: 'İlgili kişi hakları', h: P('KVKK\'nın 11. maddesi uyarınca veri sorumlusuna başvurarak kendinizle ilgili;') + OL(RIGHTS) },
      { id: 'yollar', t: 'Başvuru yolları', h:
        P('Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ\'in 5. maddesine göre başvurular yazılı olarak veya Tebliğ\'de sayılan elektronik yöntemlerle yapılır:') +
        TBL('Başvuru yolları', ['Yöntem', 'Nasıl yapılır', 'Başvuru tarihi'], [
          ['Yazılı başvuru ' + g('G-02') + g('B-01'), 'Formu doldurup ıslak imzalayarak elden teslim edin, iadeli taahhütlü posta, kargo veya noter aracılığıyla şu adrese gönderin: ' + BIZ.addr, 'Evrakın veri sorumlusuna tebliğ edildiği tarih'],
          ['Güvenli elektronik imza veya mobil imza ' + g('G-04'), 'Formu güvenli elektronik imza veya mobil imza ile imzalayıp ' + MAIL() + ' adresine gönderin.', 'Başvurunun veri sorumlusuna ulaştığı tarih'],
          ['Daha önce bildirdiğiniz e-posta adresi ' + g('G-04'), 'Daha önce tarafımıza bildirdiğiniz ve sistemimizde kayıtlı olan e-posta adresinizden ' + MAIL() + ' adresine gönderin.', 'Başvurunun veri sorumlusuna ulaştığı tarih'],
          ['Kayıtlı elektronik posta (KEP) ' + g('G-03'), BIZ.kep ? 'KEP adresinizden ' + BIZ.kep + ' adresine gönderin.' : 'Tebliğ\'de öngörülen yöntemlerden biridir. KEP yoluyla başvuru için güncel KEP adresimizi ' + MAIL() + ' veya ' + TEL() + ' üzerinden öğrenebilirsiniz.', 'Başvurunun veri sorumlusuna ulaştığı tarih']
        ]) +
        P('Sistemimizde kayıtlı olmayan bir e-posta adresinden yapılan ve güvenli elektronik imza ya da mobil imza taşımayan başvurular, Tebliğ\'deki yöntemlere uygun bir başvuru sayılmayabilir. Bu durumda kimliğinizi doğrulayabilmek için sizden ek bilgi isteyebilir veya başvurunuzu Tebliğ\'e uygun bir yöntemle yenilemenizi rica edebiliriz.') +
        NOTE('Başvuru amacıyla geliştirilmiş bir yazılım veya uygulama ilk sürümde sunulmamaktadır. Bu sayfadaki "Yazdır" düğmesi yalnızca yazdırma içindir; formu internet üzerinden göndermez. ' + g('B-02'))
      },
      { id: 'bilgiler', t: 'Başvuruda bulunması gereken bilgiler', h:
        P('Tebliğ\'in 5. maddesi uyarınca başvuruda şu bilgilerin bulunması zorunludur:') +
        OL([
          'Ad, soyad ve başvuru yazılı ise imza,',
          'Türkiye Cumhuriyeti vatandaşları için T.C. kimlik numarası; yabancılar için uyruk, pasaport numarası veya varsa kimlik numarası,',
          'Tebligata esas yerleşim yeri veya iş yeri adresi,',
          'Varsa bildirime esas elektronik posta adresi, telefon ve faks numarası,',
          'Talep konusu.'
        ]) +
        P('Konuya ilişkin bilgi ve belgeler başvuruya eklenir. Başkası adına başvuru yapılıyorsa, başvuru yapan kişinin bu konuda yetkili olduğunu gösteren belge (örneğin vekâletname) eklenmelidir.')
      },
      { id: 'guvenlik', t: 'Kimlik doğrulama ve başvuru güvenliği', h:
        P('Kişisel verilerinizin başkasına açıklanmasını önlemek için başvurunun gerçekten size ait olduğunu doğrulamamız gerekir. Bu amaçla, başvurudaki bilgiler kayıtlarımızla uyuşmazsa sizden ek bilgi isteyebiliriz. ' + g('B-01')) +
        UL([
          'T.C. kimlik numaranızı ve imzanızı yalnızca yazdırdığınız forma elle yazın. Bu bilgiler web sayfasındaki alanlara girilmez.',
          'Kimlik kartınızın fotoğrafını veya taramasını, biz açıkça istemedikçe göndermeyin. Gerekirse bunun için güvenli bir yöntem öneririz.',
          'Sağlık bilgisi gibi özel nitelikli kişisel verileri, talebiniz için gerekli olmadıkça başvurunuza eklemeyin.'
        ])
      },
      { id: 'sure', t: 'Cevap süresi ve ücret', h:
        P('Başvurunuz, talebin niteliğine göre en kısa sürede ve en geç 30 gün içinde ücretsiz olarak sonuçlandırılır (KVKK m.13/2). Cevabımız yazılı olarak veya elektronik ortamda, başvurunuzda belirttiğiniz yönteme göre bildirilir.') +
        P('İşlemin ayrıca bir maliyet gerektirmesi hâlinde, Kurulca belirlenen tarifeye göre ücret alınabilir. Tebliğ\'e göre yazılı cevaplarda 10 sayfaya kadar ücret alınmaz; 10 sayfanın üzerindeki her sayfa için 1 Türk lirası işlem ücreti alınabilir. Cevap CD veya bellek gibi bir kayıt ortamında verilirse, alınacak ücret kayıt ortamının maliyetini geçemez. Başvurunun veri sorumlusunun hatasından kaynaklanması hâlinde alınan ücret iade edilir.') +
        P('Talebiniz kabul edilirse gereği yerine getirilir; reddedilirse gerekçesi size bildirilir.')
      },
      { id: 'sikayet', t: 'Kurula şikâyet hakkı', h:
        P('Başvurunuzun reddedilmesi, verilen cevabı yetersiz bulmanız veya süresinde cevap verilmemesi hâlinde; cevabı öğrendiğiniz tarihten itibaren 30 gün ve her hâlde başvuru tarihinden itibaren 60 gün içinde Kişisel Verileri Koruma Kuruluna şikâyette bulunabilirsiniz (KVKK m.14/1). Veri sorumlusuna başvuru yolu tüketilmeden şikâyet yoluna gidilemez (KVKK m.14/2).') +
        P('Şikâyet, Kişisel Verileri Koruma Kurumunun ' + A('https://www.kvkk.gov.tr', 'www.kvkk.gov.tr') + ' adresinde belirtilen yöntemlerle yapılır. Şikâyetinize veri sorumlusuna yaptığınız başvurunun ve varsa aldığınız cevabın eklenmesi önerilir. Kurul, şikâyet tarihinden itibaren 60 gün içinde cevap vermezse talep reddedilmiş sayılır (KVKK m.15/2).')
      },
      { id: 'form', t: 'Başvuru formu', h: '<div data-lg-form></div>' },
      { id: 'iletisim', t: 'Başvuru için iletişim', h:
        P('Başvuru yöntemleri hakkında sorularınız için ' + MAIL() + ' adresine yazabilir veya ' + TEL() + ' numarasını arayabilirsiniz. Telefonla yapılan görüşmeler, Tebliğ\'de sayılan başvuru yöntemlerinden biri değildir; yalnızca bilgi almak içindir.')
      }
    ]
  };

  /* ---------- Yardımcılar ---------- */
  function loadJs(src, ready, fresh) {
    return new Promise(function (ok, fail) {
      if (ready && ready()) return ok();
      var ex = fresh ? null : [].find.call(document.scripts, function (s) { return s.src === src; });
      if (ex) {
        if (ready && ready()) return ok();
        ex.addEventListener('load', function () { ok(); }); ex.addEventListener('error', function () { fail(new Error('JS: ' + src)); });
        if (ready) { var t0 = Date.now(); (function poll() { if (ready()) return ok(); if (Date.now() - t0 > 8000) return fail(new Error('JS zaman aşımı: ' + src)); setTimeout(poll, 50); })(); }
        return;
      }
      var s = document.createElement('script'); s.src = src; s.async = false;
      s.onload = function () { if (fresh) s.remove(); ok(); }; s.onerror = function () { s.remove(); fail(new Error('JS: ' + src)); };
      document.head.appendChild(s);
    });
  }
  function loadCss(href) {
    return new Promise(function (ok, fail) {
      if ([].some.call(document.querySelectorAll('link[rel="stylesheet"]'), function (l) { return l.href === href; })) return ok();
      var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = href;
      l.onload = function () { ok(); }; l.onerror = function () { fail(new Error('CSS: ' + href)); };
      document.head.appendChild(l);
    });
  }
  // İkonlar: tek 16'lık ızgara, 1.5 çizgi, aria-hidden
  var SV = ' viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" aria-hidden="true" focusable="false"';
  var I = {
    arrow: '<svg class="ap-ico"' + SV + '><path d="M4.5 11.5l7-7M5.5 4.5h6v6"/></svg>',
    down: '<svg class="ap-ico"' + SV + '><path d="M8 3v10M3.5 8.5L8 13l4.5-4.5"/></svg>',
    play: '<svg class="ap-ico ap-ico--play"' + SV + '><path d="M5 3.5v9l7-4.5z"/></svg>',
    pause: '<svg class="ap-ico ap-ico--pause"' + SV + '><path d="M5.5 3.5v9M10.5 3.5v9"/></svg>',
    prev: '<svg class="ap-ico"' + SV + '><path d="M13 8H3M7.5 3.5L3 8l4.5 4.5"/></svg>',
    next: '<svg class="ap-ico"' + SV + '><path d="M3 8h10M8.5 3.5L13 8l-4.5 4.5"/></svg>'
  };

  /* ---------- CSS (yalnızca [data-n1lg] kapsamında) ---------- */
  var STYLE_CSS = "[data-n1lg]{--bg:#080A09;--g1:#0D0F0E;--ink:#ECEBE5;--soft:#C9C8C1;--mute:#9C9D97;--dim:#72746E;--line:rgba(228,227,221,.13);--line2:rgba(228,227,221,.07);--acc:#A8CF62;--ease:cubic-bezier(.22,1,.36,1);--hdr:88px;--gap:clamp(18px,2.2vw,40px);\ndisplay:block;position:relative;width:100%;background:var(--bg);color:var(--ink);font:400 18px/1.7 Barlow,Arial,sans-serif;-webkit-font-smoothing:antialiased;overflow-x:clip;text-align:left}\n[data-n1lg] *,[data-n1lg] *::before,[data-n1lg] *::after{box-sizing:border-box;min-width:0}\n[data-n1lg] :where(.lg) :where(p,h1,h2,h3,ul,ol,dl,dd,figure,table,caption){margin:0}\n[data-n1lg] :where(.lg) :where(ul,ol){padding:0;list-style:none}\n[data-n1lg] :where(.lg) :where(button){font:inherit;color:inherit;background:none;border:0;padding:0;margin:0;cursor:pointer;-webkit-tap-highlight-color:transparent}\n[data-n1lg] .lg :focus-visible{outline:2px solid var(--acc);outline-offset:3px;border-radius:2px}\n[data-n1lg] .lg-wrap{width:90%;max-width:1680px;margin-left:auto;margin-right:auto}\n[data-n1lg] .lg-sr{position:absolute!important;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}\n[data-n1lg] .lg-ico{display:block;flex:none;width:18px;height:18px}\n[data-n1lg] .lg a{color:var(--ink);text-decoration:underline;text-decoration-color:rgba(168,207,98,.55);text-decoration-thickness:1px;text-underline-offset:.22em;overflow-wrap:anywhere;transition:color .25s ease,text-decoration-color .25s ease}\n[data-n1lg] .lg a:hover{color:var(--acc);text-decoration-color:var(--acc)}\n[data-n1lg] .lg-hero{padding:calc(var(--hdr) + clamp(64px,7vw,128px)) 0 clamp(52px,5vw,88px);border-bottom:1px solid var(--line)}\n[data-n1lg] .lg-kick{display:flex;align-items:center;gap:12px;font:500 15px/1.3 Barlow,Arial,sans-serif;letter-spacing:.04em;color:var(--mute)}\n[data-n1lg] .lg-kick::before{content:\"\";flex:none;width:7px;height:7px;border-radius:1px;background:var(--acc)}\n[data-n1lg] .lg-kick b{font-weight:500;color:var(--ink)}\n[data-n1lg] .lg-h1{margin-top:clamp(22px,2.2vw,36px);font:700 clamp(54px,7.4vw,138px)/.9 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:-.012em;color:var(--ink)}\n[data-n1lg] .lg-ln{display:block;overflow:hidden;padding:.16em 0 .06em;margin:-.16em 0 -.06em}\n[data-n1lg] .lg-ln>span{display:block;animation:lg-up .95s var(--ease) both}\n[data-n1lg] .lg-ln:nth-child(2)>span{animation-delay:.08s}\n[data-n1lg] .lg-ln:nth-child(2){color:var(--acc)}\n@keyframes lg-up{from{transform:translateY(102%)}to{transform:none}}\n[data-n1lg] .lg-hero__foot{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);row-gap:22px;align-items:end;margin-top:clamp(34px,3.4vw,58px)}\n[data-n1lg] .lg-lede{grid-column:1/8;max-width:58ch;font-size:clamp(18px,1.3vw,21px);line-height:1.6;color:var(--soft)}\n[data-n1lg] .lg-meta{grid-column:9/13;justify-self:end;display:flex;flex-direction:column;gap:4px;font-size:15px;line-height:1.45;color:var(--mute);text-align:right}\n[data-n1lg] .lg-meta b{font-weight:500;color:var(--ink)}\n[data-n1lg] .lg-body{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);padding:clamp(56px,5vw,96px) 0 clamp(70px,6vw,120px)}\n[data-n1lg] .lg-toc{grid-column:1/4;position:sticky;top:calc(var(--hdr) + 28px);align-self:start;max-height:calc(100vh - var(--hdr) - 56px);overflow:auto;padding-right:8px;scrollbar-width:thin}\n[data-n1lg] .lg-toc__h{font:500 14px/1.3 Barlow,Arial,sans-serif;letter-spacing:.04em;color:var(--mute);margin-bottom:14px}\n[data-n1lg] .lg-toc ol{counter-reset:t;display:flex;flex-direction:column}\n[data-n1lg] .lg-toc li{counter-increment:t}\n[data-n1lg] .lg .lg-toc a{position:relative;display:flex;gap:12px;min-height:44px;align-items:center;padding:6px 0 6px 16px;border-left:1px solid var(--line);font-size:15px;line-height:1.35;color:var(--mute);text-decoration:none;transition:color .25s ease,border-color .25s ease}\n[data-n1lg] .lg .lg-toc a::before{content:counter(t) \".\";flex:none;width:1.6em;font-variant-numeric:tabular-nums;color:var(--dim)}\n[data-n1lg] .lg .lg-toc a:hover{color:var(--ink)}\n[data-n1lg] .lg .lg-toc a[aria-current=\"true\"]{color:var(--ink);border-left-color:var(--acc)}\n[data-n1lg] .lg .lg-toc a[aria-current=\"true\"]::before{color:var(--acc)}\n[data-n1lg] .lg-tocm{display:none}\n[data-n1lg] .lg-doc{grid-column:4/13;padding-left:clamp(0px,2vw,40px)}\n[data-n1lg] .lg-sec{scroll-margin-top:calc(var(--hdr) + 24px);padding:clamp(40px,3.4vw,60px) 0;border-top:1px solid var(--line)}\n[data-n1lg] .lg-sec:first-child{padding-top:0;border-top:0}\n[data-n1lg] .lg-sec:last-child{padding-bottom:0}\n[data-n1lg] .lg-h2{display:flex;gap:.45em;max-width:30ch;font:600 clamp(30px,2.5vw,42px)/1.08 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:.002em;color:var(--ink);scroll-margin-top:calc(var(--hdr) + 24px)}\n[data-n1lg] .lg-h2:focus{outline:none}\n[data-n1lg] .lg-h2__n{flex:none;color:var(--acc);font-variant-numeric:tabular-nums}\n[data-n1lg] .lg-sec>*+*{margin-top:18px}\n[data-n1lg] .lg-sec>.lg-h2+*{margin-top:24px}\n[data-n1lg] .lg-sec p,[data-n1lg] .lg-sec .lg-ul,[data-n1lg] .lg-sec .lg-ol,[data-n1lg] .lg-sec .lg-id{max-width:72ch}\n[data-n1lg] .lg-sec p{color:var(--soft)}\n[data-n1lg] .lg-sec strong{color:var(--ink);font-weight:600}\n[data-n1lg] .lg-sec h3{margin-top:32px;font:600 19px/1.4 Barlow,Arial,sans-serif;color:var(--ink)}\n[data-n1lg] .lg-sec h3+p{margin-top:8px}\n[data-n1lg] .lg-ul>li,[data-n1lg] .lg-ol>li{position:relative;padding-left:2em;color:var(--soft)}\n[data-n1lg] .lg-ul>li+li,[data-n1lg] .lg-ol>li+li{margin-top:10px}\n[data-n1lg] .lg-ul>li::before{content:\"\";position:absolute;left:.3em;top:.82em;width:.7em;height:1px;background:var(--acc)}\n[data-n1lg] .lg-ol{counter-reset:o}\n[data-n1lg] .lg-ol>li{counter-increment:o}\n[data-n1lg] .lg-ol>li::before{content:counter(o) \".\";position:absolute;left:0;top:0;font-weight:600;font-variant-numeric:tabular-nums;color:var(--acc)}\n[data-n1lg] .lg-note{padding:2px 0 2px 18px;border-left:2px solid var(--acc);color:var(--ink)!important}\n[data-n1lg] .lg-id{display:grid;border-top:1px solid var(--line)}\n[data-n1lg] .lg-id>div{display:grid;grid-template-columns:minmax(130px,1fr) minmax(0,2.6fr);column-gap:var(--gap);padding:12px 0;border-bottom:1px solid var(--line)}\n[data-n1lg] .lg-id dt{font-size:15px;line-height:1.6;color:var(--mute)}\n[data-n1lg] .lg-id dd{font-size:17px;line-height:1.6;color:var(--ink);overflow-wrap:anywhere}\n[data-n1lg] .lg-tbl{position:relative;width:100%;margin-top:26px!important;overflow-x:auto;overscroll-behavior-x:contain;border-top:1px solid rgba(228,227,221,.28)}\n[data-n1lg] .lg-tbl:focus-visible{outline:2px solid var(--acc);outline-offset:4px}\n[data-n1lg] .lg-tbl table{width:100%;border-collapse:collapse;font-size:15.5px;line-height:1.55}\n[data-n1lg] .lg-tbl caption{caption-side:top;padding:12px 0 0;text-align:left;font:500 14px/1.3 Barlow,Arial,sans-serif;color:var(--mute)}\n[data-n1lg] .lg-tbl thead th{padding:14px 18px 12px 0;text-align:left;vertical-align:bottom;font:600 14px/1.35 Barlow,Arial,sans-serif;letter-spacing:.02em;color:var(--mute);border-bottom:1px solid rgba(228,227,221,.28)}\n[data-n1lg] .lg-tbl tbody th,[data-n1lg] .lg-tbl td{padding:16px 18px 16px 0;text-align:left;vertical-align:top;border-bottom:1px solid var(--line);color:var(--soft);overflow-wrap:break-word}\n[data-n1lg] .lg-tbl tbody th{font-weight:600;color:var(--ink)}\n[data-n1lg] .lg-tbl td:last-child,[data-n1lg] .lg-tbl th:last-child{padding-right:0}\n[data-n1lg] .lg-tbl--empty td{color:var(--mute)}\n[data-n1lg] .lg-cmp{display:flex;flex-wrap:wrap;align-items:center;gap:14px 20px;margin-top:22px!important}\n[data-n1lg] .lg-btn{position:relative;display:inline-flex;align-items:center;gap:14px;min-height:52px;padding:0 20px;border-radius:10px;border:1px solid rgba(168,207,98,.5);background:rgba(16,19,17,.8);font:600 16px/1 Barlow,Arial,sans-serif;color:var(--ink);text-decoration:none!important;transition:background-color .3s var(--ease),color .3s var(--ease),border-color .3s var(--ease);touch-action:manipulation}\n[data-n1lg] .lg-btn:hover{background:var(--acc);border-color:var(--acc);color:#0A0B0B!important}\n[data-n1lg] .lg-btn .lg-ico{color:var(--acc);transition:color .3s var(--ease)}\n[data-n1lg] .lg-btn:hover .lg-ico{color:#0A0B0B}\n[data-n1lg] .lg-btn--ghost{border-color:rgba(228,227,221,.24);background:transparent}\n[data-n1lg] .lg-msg{font-size:15px;line-height:1.5;color:var(--mute)}\n[data-n1lg] .lg-form{max-width:880px;margin-top:26px!important;padding:clamp(22px,2.4vw,40px);border:1px solid var(--line);border-radius:14px;background:var(--g1)}\n[data-n1lg] .lg-form fieldset{margin:0;padding:0;border:0;min-width:0}\n[data-n1lg] .lg-form fieldset+fieldset{margin-top:34px;padding-top:30px;border-top:1px solid var(--line)}\n[data-n1lg] .lg-form fieldset:first-of-type{margin-top:30px}\n[data-n1lg] .lg-form legend{float:left;width:100%;padding:0;font:600 clamp(22px,1.7vw,26px)/1.2 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:.01em;color:var(--ink)}\n[data-n1lg] .lg-form legend+*{clear:both;margin-top:0;padding-top:10px}\n[data-n1lg] .lg-form legend+.lg-grid{padding-top:0;margin-top:0}\n[data-n1lg] .lg-form legend+.lg-grid::before{content:\"\";grid-column:1/-1;height:0}\n[data-n1lg] .lg-fhint{max-width:68ch;font-size:15px;line-height:1.55;color:var(--mute)}\n[data-n1lg] .lg-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px 20px;margin-top:20px}\n[data-n1lg] .lg-f{display:flex;flex-direction:column;gap:8px}\n[data-n1lg] .lg-f--full{grid-column:1/-1}\n[data-n1lg] .lg-f>label,[data-n1lg] .lg-flabel{font:600 15px/1.35 Barlow,Arial,sans-serif;color:var(--ink)}\n[data-n1lg] .lg-f small{font-weight:400;font-size:13.5px;color:var(--mute)}\n[data-n1lg] .lg-in{width:100%;min-height:50px;padding:12px 14px;border-radius:9px;border:1px solid rgba(228,227,221,.22);background:#080A09;color:var(--ink);font:400 16px/1.45 Barlow,Arial,sans-serif;transition:border-color .2s ease}\n[data-n1lg] .lg-in:hover{border-color:rgba(228,227,221,.4)}\n[data-n1lg] .lg-in:focus{outline:2px solid var(--acc);outline-offset:1px;border-color:var(--acc)}\n[data-n1lg] textarea.lg-in{min-height:132px;resize:vertical}\n[data-n1lg] .lg-in[type=\"date\"]{color-scheme:dark}\n[data-n1lg] .lg-hand{display:flex;align-items:center;min-height:50px;padding:12px 14px;border-radius:9px;border:1px dashed rgba(228,227,221,.24);font-size:15px;line-height:1.45;color:var(--mute)}\n[data-n1lg] .lg-opts{display:grid;gap:4px;margin-top:14px}\n[data-n1lg] .lg-opts--2{grid-template-columns:repeat(2,minmax(0,1fr));column-gap:20px}\n[data-n1lg] .lg-opt{position:relative;display:flex;align-items:flex-start;gap:12px;min-height:44px;padding:10px 0;cursor:pointer;font-size:16px;line-height:1.45;color:var(--soft)}\n[data-n1lg] .lg-opt input{position:absolute;opacity:0;width:22px;height:22px;margin:0;left:0;top:10px;cursor:pointer}\n[data-n1lg] .lg-box{flex:none;display:grid;place-items:center;width:22px;height:22px;margin-top:1px;border:1.5px solid rgba(228,227,221,.45);border-radius:6px;color:#0A0B0B;transition:background-color .2s ease,border-color .2s ease}\n[data-n1lg] .lg-opt input[type=\"radio\"]+.lg-box{border-radius:50%}\n[data-n1lg] .lg-box svg{width:14px;height:14px;opacity:0;transform:scale(.5);transition:opacity .15s ease,transform .25s var(--ease)}\n[data-n1lg] .lg-opt input:checked+.lg-box{background:var(--acc);border-color:var(--acc)}\n[data-n1lg] .lg-opt input:checked+.lg-box svg{opacity:1;transform:none}\n[data-n1lg] .lg-opt input:focus-visible+.lg-box{outline:2px solid var(--acc);outline-offset:3px}\n[data-n1lg] .lg-opt input:checked~span:last-child{color:var(--ink)}\n[data-n1lg] .lg-actions{display:flex;flex-wrap:wrap;align-items:center;gap:12px 14px;margin-top:34px;padding-top:28px;border-top:1px solid var(--line)}\n[data-n1lg] .lg-actions .lg-msg{flex:1 1 260px}\n[data-n1lg] .lg-print{display:none}\n[data-n1lg] .lg-end{border-top:1px solid var(--line);padding:clamp(60px,5.6vw,104px) 0 clamp(80px,7vw,130px)}\n[data-n1lg] .lg-end__in{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);row-gap:56px}\n[data-n1lg] .lg-end__h{font:600 clamp(28px,2.3vw,38px)/1.1 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;color:var(--ink)}\n[data-n1lg] .lg-rel{grid-column:1/8}\n[data-n1lg] .lg-rel ol{margin-top:22px;border-top:1px solid var(--line)}\n[data-n1lg] .lg .lg-rel a{display:grid;grid-template-columns:3.2em minmax(0,1fr) auto;align-items:center;column-gap:14px;min-height:64px;padding:14px 0;border-bottom:1px solid var(--line);text-decoration:none;color:var(--ink)}\n[data-n1lg] .lg-rel__n{font:600 15px/1 Barlow,Arial,sans-serif;font-variant-numeric:tabular-nums;color:var(--dim)}\n[data-n1lg] .lg-rel__t{font:600 clamp(19px,1.45vw,23px)/1.25 Barlow,Arial,sans-serif}\n[data-n1lg] .lg-rel__t small{display:block;margin-top:4px;font-weight:400;font-size:14.5px;line-height:1.45;color:var(--mute)}\n[data-n1lg] .lg-rel .lg-ico{color:var(--mute);transition:transform .35s var(--ease),color .25s ease}\n[data-n1lg] .lg .lg-rel a:hover .lg-rel__n,[data-n1lg] .lg .lg-rel a:hover .lg-ico{color:var(--acc)}\n[data-n1lg] .lg .lg-rel a:hover .lg-ico{transform:translateX(4px)}\n[data-n1lg] .lg-con{grid-column:9/13}\n[data-n1lg] .lg-con .lg-id{margin-top:22px}\n[data-n1lg] .lg-con .lg-id>div{grid-template-columns:1fr}\n[data-n1lg] .lg-con .lg-id dd{font-size:16px}\n[data-n1lg] .lg-g{display:none}\n[data-n1lg][review] .lg-g{display:inline-block;margin:0 0 0 6px;padding:2px 7px;border-radius:5px;background:#3A2E07;border:1px solid #D7A72C;font:600 12px/1.4 Barlow,Arial,sans-serif;font-style:normal;letter-spacing:.02em;color:#F3D27A;vertical-align:middle;cursor:help;white-space:nowrap}\n[data-n1lg] .lg-review{border-bottom:1px solid #6B5416;background:#1A1505}\n[data-n1lg] .lg-review__in{padding:26px 0 30px}\n[data-n1lg] .lg-review h2{font:600 22px/1.2 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;color:#F3D27A}\n[data-n1lg] .lg-review p{margin-top:8px;max-width:90ch;font-size:15px;line-height:1.55;color:#E5D8B0}\n[data-n1lg] .lg-review ul{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:6px 28px;margin-top:14px}\n[data-n1lg] .lg-review li{display:grid;grid-template-columns:3.6em minmax(0,1fr);font-size:14.5px;line-height:1.45;color:#E5D8B0}\n[data-n1lg] .lg-review li b{color:#F3D27A}\n.n1h-panel[data-n1-lg],.n1h-panel[data-n1-lg] *,.n1h-panel[data-n1-lg] *::before,.n1h-panel[data-n1-lg] *::after{box-sizing:border-box}\n.n1h-panel[data-n1-lg] a.n1h-item{text-decoration:none;color:#ecebe6}\n.n1h-panel[data-n1-lg] .n1h-sub a{text-decoration:none}\n@media (max-width:1024px){.n1h-panel[data-n1-lg][data-open]::before{content:\"\";position:fixed;left:0;right:0;bottom:0;top:72px;z-index:-1;pointer-events:none;background:rgba(8,10,9,.8);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}}\n@media (max-width:767px){.n1h-panel[data-n1-lg][data-open]::before{top:64px}}\n[data-n1lg] .n1ft-partner-art{display:none}\n@media (max-width:1024px){[data-n1lg] n1-header{display:block!important;position:fixed!important;top:0!important;left:0!important;right:0!important;width:100%!important;min-height:0!important;height:auto!important;z-index:900!important;background:rgba(8,10,9,.95);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);border-bottom:1px solid rgba(228,227,221,.07)}[data-n1lg] n1-header .n1h-bar.site-container{display:grid!important;align-items:center!important;width:calc(100% - 48px)!important;margin-inline:auto!important;padding-inline:0!important;height:72px!important;max-width:100%!important}[data-n1lg] n1-header .n1h-logo{margin:0!important;flex:none}[data-n1lg] n1-header .n1h-logo img{width:32px!important;height:32px!important;max-width:none!important}[data-n1lg] n1-header .n1h-right{align-items:center!important}[data-n1lg] n1-header .n1h-menu{display:inline-flex!important;height:40px!important;margin:0!important}[data-n1lg] n1-header .n1h-cta{display:none!important}[data-n1lg] footer.n1ft .n1ft-partner{opacity:1!important;visibility:visible!important;transform:none!important}}\n@media (max-width:900px){[data-n1lg] .n1ft-inner{width:90%}}\n@media (max-width:767px){[data-n1lg] n1-header .n1h-bar.site-container{width:calc(100% - 40px)!important;height:64px!important}[data-n1lg] n1-header .n1h-logo img{width:30px!important;height:30px!important}[data-n1lg] .n1ft-inner{width:calc(100% - 40px)}[data-n1lg] .n1ft-top{grid-template-columns:1fr!important;gap:32px;padding:39px 0 36px}[data-n1lg] .n1ft-col--brand{grid-column:auto}[data-n1lg] .n1ft-brand{font-size:45px}}\n@media (max-width:360px){[data-n1lg] .lg-wrap,[data-n1lg] .n1ft-inner{width:calc(100% - 32px)}[data-n1lg] n1-header .n1h-bar.site-container{width:calc(100% - 32px)!important}}\n@media (max-width:1024px){\n[data-n1lg]{--hdr:72px}\n[data-n1lg] .lg-hero{padding-top:calc(var(--hdr) + 64px)}\n[data-n1lg] .lg-lede{grid-column:1/-1}\n[data-n1lg] .lg-meta{grid-column:1/-1;justify-self:start;text-align:left}\n[data-n1lg] .lg-body{display:block;padding-top:40px}\n[data-n1lg] .lg-toc{display:none}\n[data-n1lg] .lg-tocm{display:block;margin-bottom:44px;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}\n[data-n1lg] .lg-tocm summary{display:flex;align-items:center;justify-content:space-between;gap:16px;min-height:60px;cursor:pointer;list-style:none;font:600 18px/1.3 Barlow,Arial,sans-serif;color:var(--ink)}\n[data-n1lg] .lg-tocm summary::-webkit-details-marker{display:none}\n[data-n1lg] .lg-tocm summary .lg-ico{color:var(--acc);transition:transform .3s var(--ease)}\n[data-n1lg] .lg-tocm[open] summary .lg-ico{transform:rotate(180deg)}\n[data-n1lg] .lg-tocm ol{counter-reset:t;padding-bottom:14px}\n[data-n1lg] .lg-tocm li{counter-increment:t}\n[data-n1lg] .lg .lg-tocm a{display:flex;gap:12px;align-items:center;min-height:46px;padding:6px 0;font-size:16.5px;line-height:1.35;color:var(--soft);text-decoration:none}\n[data-n1lg] .lg .lg-tocm a::before{content:counter(t) \".\";flex:none;width:1.7em;font-variant-numeric:tabular-nums;color:var(--acc)}\n[data-n1lg] .lg-doc{padding-left:0}\n[data-n1lg] .lg-tbl--wide table{min-width:820px}\n[data-n1lg] .lg-rel,[data-n1lg] .lg-con{grid-column:1/-1}\n[data-n1lg] .lg-con .lg-id>div{grid-template-columns:minmax(130px,1fr) minmax(0,2.6fr)}\n}\n@media (max-width:767px){\n[data-n1lg]{--hdr:64px;font-size:17px}\n[data-n1lg] .lg-hero{padding-top:calc(var(--hdr) + 48px);padding-bottom:44px}\n[data-n1lg] .lg-h1{font-size:clamp(44px,13.4vw,72px);line-height:.94}\n[data-n1lg] .lg-lede{font-size:17.5px}\n[data-n1lg] .lg-sec{padding:38px 0}\n[data-n1lg] .lg-h2{font-size:clamp(27px,7.6vw,32px)}\n[data-n1lg] .lg-sec h3{margin-top:26px;font-size:18px}\n[data-n1lg] .lg-ul>li,[data-n1lg] .lg-ol>li{padding-left:1.7em}\n[data-n1lg] .lg-id>div,[data-n1lg] .lg-con .lg-id>div{grid-template-columns:1fr;row-gap:2px}\n[data-n1lg] .lg-id dt{font-size:14px}\n[data-n1lg] .lg-tbl{overflow:visible;border-top:0}\n[data-n1lg] .lg-tbl--wide table{min-width:0}\n[data-n1lg] .lg-tbl table,[data-n1lg] .lg-tbl tbody,[data-n1lg] .lg-tbl tr,[data-n1lg] .lg-tbl th,[data-n1lg] .lg-tbl td{display:block;width:100%}\n[data-n1lg] .lg-tbl thead{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}\n[data-n1lg] .lg-tbl caption{display:block;padding:0 0 10px;border-bottom:1px solid rgba(228,227,221,.28)}\n[data-n1lg] .lg-tbl tr{padding:18px 0;border-bottom:1px solid var(--line)}\n[data-n1lg] .lg-tbl tbody th,[data-n1lg] .lg-tbl td{padding:0;border:0}\n[data-n1lg] .lg-tbl tbody th{font-size:17px;line-height:1.4}\n[data-n1lg] .lg-tbl td{margin-top:12px;font-size:16px}\n[data-n1lg] .lg-tbl td::before{content:attr(data-th);display:block;margin-bottom:2px;font:600 13.5px/1.35 Barlow,Arial,sans-serif;letter-spacing:.02em;color:var(--mute)}\n[data-n1lg] .lg-tbl--empty td::before{display:none}\n[data-n1lg] .lg-form{padding:20px 18px;border-radius:12px;margin-left:-4px;margin-right:-4px}\n[data-n1lg] .lg-grid,[data-n1lg] .lg-opts--2{grid-template-columns:1fr}\n[data-n1lg] .lg-actions .lg-btn{flex:1 1 100%;justify-content:center}\n[data-n1lg] .lg .lg-rel a{grid-template-columns:2.6em minmax(0,1fr) auto}\n[data-n1lg][review] .lg-g{white-space:normal}\n}\n@media (max-width:360px){[data-n1lg] .lg-wrap,[data-n1lg] .n1ft-inner{width:calc(100% - 32px)}[data-n1lg] n1-header .n1h-bar.site-container{width:calc(100% - 32px)!important}}\n@media (prefers-reduced-motion:reduce){[data-n1lg] .lg *,[data-n1lg] .lg *::before,[data-n1lg] .lg *::after{animation:none!important;transition-duration:.01ms!important;scroll-behavior:auto!important}}\n@media print{\n@page{size:A4;margin:16mm 15mm}\n[data-n1lg]{background:#fff!important;color:#000!important;font-size:10.5pt;line-height:1.5;overflow:visible}\n[data-n1lg] n1-header,[data-n1lg] footer.n1ft,[data-n1lg] n1-floating-controls,[data-n1lg] .lg-toc,[data-n1lg] .lg-tocm,[data-n1lg] .lg-review,[data-n1lg] .lg-cmp,[data-n1lg] .lg-actions,[data-n1lg] .lg-g,[data-n1lg] .lg-end{display:none!important}\nbody:has([data-n1lg]) .n1fc,body:has([data-n1lg]) .n1h-panel{display:none!important}\n[data-n1lg] .lg-wrap{width:100%!important;max-width:none}\n[data-n1lg] .lg-hero{padding:0 0 8mm!important;border-color:#999}\n[data-n1lg] .lg-h1{font-size:28pt!important;color:#000!important}\n[data-n1lg] .lg-ln>span{animation:none!important}\n[data-n1lg] .lg-ln:nth-child(2),[data-n1lg] .lg-h2__n,[data-n1lg] .lg-ol>li::before{color:#000!important}\n[data-n1lg] .lg-lede,[data-n1lg] .lg-meta,[data-n1lg] .lg-sec p,[data-n1lg] .lg-ul>li,[data-n1lg] .lg-ol>li,[data-n1lg] .lg-tbl td,[data-n1lg] .lg-id dd,[data-n1lg] .lg-id dt,[data-n1lg] .lg-kick{color:#000!important}\n[data-n1lg] .lg-body{display:block;padding:6mm 0 0}\n[data-n1lg] .lg-doc{padding:0}\n[data-n1lg] .lg-sec{padding:5mm 0;border-color:#bbb;break-inside:auto}\n[data-n1lg] .lg-h2{font-size:15pt!important;color:#000!important;break-after:avoid}\n[data-n1lg] .lg-tbl{overflow:visible;border-color:#999}\n[data-n1lg] .lg-tbl table{min-width:0!important;font-size:9pt}\n[data-n1lg] .lg-tbl thead th,[data-n1lg] .lg-tbl tbody th{color:#000!important;border-color:#999}\n[data-n1lg] .lg-tbl tr{break-inside:avoid}\n[data-n1lg] .lg a{color:#000!important;text-decoration:none}\n[data-n1lg] .lg-ul>li::before{background:#000}\n[data-n1lg] .lg-note{border-color:#000;color:#000!important}\n[data-n1lg] .lg-form{display:none!important}\n}\n@media print{\nhtml.lg-printing,html.lg-printing body{background:#fff!important;height:auto!important;min-height:0!important;overflow:visible!important}\nhtml.lg-printing body *:not(:has(.lg-print)):not(.lg-print):not(.lg-print *){display:none!important}\nhtml.lg-printing body :has(.lg-print){position:static!important;display:block!important;width:auto!important;height:auto!important;min-height:0!important;max-height:none!important;margin:0!important;padding:0!important;border:0!important;transform:none!important;overflow:visible!important;background:none!important;box-shadow:none!important}\nhtml.lg-printing .lg-print{display:block!important;color:#000;font:10.5pt/1.45 Barlow,Arial,sans-serif}\n.lg-print h1{margin:0 0 2mm;font:700 18pt/1.1 \"Barlow Condensed\",\"Arial Narrow\",Arial,sans-serif;letter-spacing:.01em}\n.lg-print .pr-sub{margin:0 0 5mm;font-size:9.5pt;color:#333}\n.lg-print h2{margin:5mm 0 2mm;padding-bottom:1mm;border-bottom:.3mm solid #000;font:700 11pt/1.2 Barlow,Arial,sans-serif;break-after:avoid}\n.lg-print table{width:100%;border-collapse:collapse}\n.lg-print td,.lg-print th{padding:1.6mm 2mm;border:.25mm solid #777;vertical-align:top;text-align:left;font-size:10pt}\n.lg-print th{width:34%;font-weight:600;background:#f1f1f1}\n.lg-print .pr-v{white-space:pre-wrap;overflow-wrap:anywhere}\n.lg-print .pr-blank{height:9mm}\n.lg-print .pr-tall{height:26mm}\n.lg-print ul{margin:0;padding:0;list-style:none;columns:1}\n.lg-print li{display:flex;gap:2.4mm;align-items:flex-start;margin:0 0 1.4mm;break-inside:avoid}\n.lg-print .pr-box{flex:none;display:inline-block;width:3.4mm;height:3.4mm;margin-top:.5mm;border:.3mm solid #000;text-align:center;font:700 8pt/3.2mm Arial,sans-serif}\n.lg-print .pr-note{margin-top:3mm;font-size:8.8pt;line-height:1.4;color:#222}\n.lg-print .pr-sign{display:grid;grid-template-columns:1fr 1fr;gap:10mm;margin-top:8mm}\n.lg-print .pr-sign div{padding-top:14mm;border-bottom:.3mm solid #000;font-size:9.5pt}\n.lg-print section{break-inside:avoid}\n}";

  /* ---------- İkonlar (satır içi SVG) ---------- */
  function svg(d, cls) { return '<svg class="lg-ico' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + d + '</svg>'; }
  var IC = {
    arrow: svg('<path d="M5 12h13M13 6l6 6-6 6"/>'),
    chev: svg('<path d="M6 9l6 6 6-6"/>'),
    print: svg('<path d="M7 9V3h10v6M7 17H4v-7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v7h-3M7 14h10v7H7z"/>'),
    clear: svg('<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>'),
    sliders: svg('<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>'),
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>'
  };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  var ORDER = ['gizlilik', 'kvkk', 'cerez', 'kullanim', 'basvuru'];
  var DESC = {
    gizlilik: 'Bilgilerinizle nasıl ilgilendiğimizin genel açıklaması',
    kvkk: 'Faaliyet, veri, amaç ve hukuki sebep tablosu',
    cerez: 'Çerez kategorileri ve tercihlerin yönetimi',
    kullanim: 'Web sitesinin kullanım esasları',
    basvuru: 'KVKK haklarınız için başvuru yolları ve yazdırılabilir form'
  };

  /* ---------- İşaretleme ---------- */
  function heroM(pg, updated) {
    var meta = '';
    if (updated) meta = '<p class="lg-meta"><span>Son güncelleme</span><b><time datetime="' + esc(updated.iso) + '">' + esc(updated.text) + '</time></b></p>';
    else meta = '<p class="lg-meta">' + g('P-01') + '</p>';
    return '<header class="lg-hero lg-wrap">' +
      '<p class="lg-kick"><b>Yasal</b><span>/ ' + pg.no + '</span></p>' +
      '<h1 class="lg-h1" id="lg-' + pg.key + '-h1">' + pg.h1.map(function (l) { return '<span class="lg-ln"><span>' + l + '</span></span>'; }).join(' ') + '</h1>' +
      '<div class="lg-hero__foot"><p class="lg-lede">' + pg.lede + '</p>' + meta + '</div>' +
      '</header>';
  }
  function sid(pg, s) { return pg.key + '-' + s.id; }
  function tocItems(pg) { return pg.sections.map(function (s) { return '<li><a href="#' + sid(pg, s) + '" data-lg-to="' + sid(pg, s) + '">' + s.t + '</a></li>'; }).join(''); }
  function bodyM(pg) {
    return '<div class="lg-body lg-wrap">' +
      '<nav class="lg-toc" aria-labelledby="lg-' + pg.key + '-toc"><p class="lg-toc__h" id="lg-' + pg.key + '-toc">Bu sayfada</p><ol>' + tocItems(pg) + '</ol></nav>' +
      '<details class="lg-tocm"><summary><span>İçindekiler</span>' + IC.chev + '</summary><nav aria-label="İçindekiler"><ol>' + tocItems(pg) + '</ol></nav></details>' +
      '<article class="lg-doc" aria-labelledby="lg-' + pg.key + '-h1">' + pg.sections.map(function (s, i) {
        return '<section class="lg-sec" id="' + sid(pg, s) + '" aria-labelledby="' + sid(pg, s) + '-h"><h2 class="lg-h2" id="' + sid(pg, s) + '-h" tabindex="-1"><span class="lg-h2__n">' + (i + 1) + '.</span><span>' + s.t + '</span></h2>' + s.h + '</section>';
      }).join('') + '</article></div>';
  }
  function endM(pg) {
    var others = ORDER.filter(function (k) { return k !== pg.key; });
    return '<aside class="lg-end" aria-label="İlgili yasal metinler ve iletişim"><div class="lg-wrap lg-end__in">' +
      '<div class="lg-rel"><h2 class="lg-end__h">İlgili yasal metinler</h2><ol>' + others.map(function (k) {
        return '<li><a href="' + L[k].href + '"><span class="lg-rel__n">' + PAGES[k].no + '</span><span class="lg-rel__t">' + L[k].t + '<small>' + DESC[k] + '</small></span>' + IC.arrow + '</a></li>';
      }).join('') + '</ol></div>' +
      '<div class="lg-con"><h2 class="lg-end__h">İletişim</h2>' + IDENT() + '</div>' +
      '</div></aside>';
  }
  function reviewM(pg, html) {
    var ids = [], re = /data-g="([A-Z]-\d\d)"/g, m;
    while ((m = re.exec(html))) if (ids.indexOf(m[1]) < 0) ids.push(m[1]);
    ['P-02'].forEach(function (x) { if (ids.indexOf(x) < 0) ids.push(x); });
    ids.sort();
    var open = ids.filter(function (x) { return VERIFIED.indexOf(x) < 0; });
    return { open: open, html: '<section class="lg-review" aria-labelledby="lg-rv-h"><div class="lg-wrap lg-review__in">' +
      '<h2 id="lg-rv-h">İnceleme modu: yayına hazır değil</h2>' +
      '<p>Bu panel yalnızca <b>review</b> özniteliği eklendiğinde görünür ve ziyaretçilere gösterilmez. Sarı işaretler, bu sayfada yayından önce işletmeden veya hukuk uzmanından doğrulanması gereken noktalardır. Kimlikler LEGAL_PUBLISH_GATE.md ile aynıdır.</p>' +
      '<ul>' + open.map(function (x) { return '<li><b>' + x + '</b> ' + esc(GATES[x]) + '</li>'; }).join('') + '</ul>' +
      '</div></section>' };
  }

  /* ---------- Çerez listesi ve tercih kontrolü ---------- */
  var CAT = { zorunlu: 'Kesinlikle gerekli', islevsel: 'İşlevsel ve tercih', analitik: 'Analitik ve performans', pazarlama: 'Reklam ve pazarlama' };
  function cookiesM() {
    var heads = ['Çerez adı', 'Sağlayıcı', 'Amaç', 'Kategori', 'Saklama süresi', 'Hukuki sebep'];
    if (!COOKIES.length) {
      return '<div class="lg-tbl lg-tbl--wide lg-tbl--empty" role="region" aria-label="Çerez listesi" tabindex="0"><table><caption>Çerez listesi ' + g('C-04') + '</caption><thead><tr>' +
        heads.map(function (h) { return '<th scope="col">' + h + '</th>'; }).join('') + '</tr></thead><tbody><tr><td colspan="6">Bu liste, sitede gerçekten çalışan çerezlerin teknik taramasıyla hazırlanır ve tarama tamamlandığında bu tabloda yayımlanır.</td></tr></tbody></table></div>';
    }
    return TBL('Çerez listesi', heads, COOKIES.map(function (c) {
      return [esc(c.name), esc(c.provider), esc(c.purpose), esc(CAT[c.category] || c.category), esc(c.duration), esc(c.basis)];
    }), 'lg-tbl--wide');
  }
  function resolveFn(path) {
    if (!path) return null;
    var o = window, parts = path.split('.'), ctx = null;
    for (var i = 0; i < parts.length; i++) { if (o == null) return null; ctx = o; o = o[parts[i]]; }
    return typeof o === 'function' ? { fn: o, ctx: ctx } : null;
  }

  /* ---------- Başvuru formu ---------- */
  var REL = ['Web sitesi ziyaretçisi', 'Bizimle iletişime geçen / teklif isteyen kişi', 'Müşteri veya müşteri çalışanı', 'İş ortağı veya tedarikçi çalışanı', 'Çalışan adayı', 'Diğer'];
  var REPLY = ['Adresime posta ile gönderilsin', 'E-posta adresime gönderilsin', 'Elden teslim almak istiyorum'];
  function opt(type, name, val, label, id) {
    return '<label class="lg-opt" for="' + id + '"><input type="' + type + '" id="' + id + '" name="' + name + '" value="' + esc(val) + '"><span class="lg-box">' + IC.check + '</span><span>' + label + '</span></label>';
  }
  function formM() {
    var F = function (id, label, type, extra, full, hint) {
      var tag = type === 'textarea' ? '<textarea class="lg-in" id="lgf-' + id + '" name="' + id + '"' + (extra || '') + '></textarea>' : '<input class="lg-in" type="' + type + '" id="lgf-' + id + '" name="' + id + '"' + (extra || '') + '>';
      return '<div class="lg-f' + (full ? ' lg-f--full' : '') + '"><label for="lgf-' + id + '">' + label + (hint ? ' <small>' + hint + '</small>' : '') + '</label>' + tag + '</div>';
    };
    return '<form class="lg-form" novalidate aria-describedby="lgf-desc">' +
      '<p class="lg-fhint" id="lgf-desc">Alanları doldurup "Yazdır" düğmesine basın. Yazdırılan forma T.C. kimlik numaranızı ve imzanızı elle ekleyin. Bu sayfa bilgilerinizi göndermez veya kaydetmez.</p>' +
      '<fieldset><legend>1. Başvuru sahibi</legend><div class="lg-grid">' +
        F('ad', 'Ad', 'text', ' autocomplete="given-name"') + F('soyad', 'Soyad', 'text', ' autocomplete="family-name"') +
        '<div class="lg-f lg-f--full"><span class="lg-flabel" id="lgf-tc-l">T.C. kimlik numarası / yabancılar için uyruk ve pasaport numarası</span><p class="lg-hand" aria-labelledby="lgf-tc-l">Güvenliğiniz için bu bilgi web sayfasına girilmez; yazdırılan forma elle yazılır.</p></div>' +
      '</div>' +
      '<div class="lg-opts" role="radiogroup" aria-labelledby="lgf-adina"><span class="lg-flabel" id="lgf-adina">Başvuruyu kim adına yapıyorsunuz?</span>' +
        opt('radio', 'adina', 'Kendi adıma', 'Kendi adıma', 'lgf-adina-1') + opt('radio', 'adina', 'Başkası adına (yetki belgesi ekliyorum)', 'Başkası adına (yetki belgesini ekliyorum)', 'lgf-adina-2') +
      '</div></fieldset>' +
      '<fieldset><legend>2. Tebligat ve iletişim bilgileri</legend><div class="lg-grid">' +
        F('adres', 'Tebligata esas yerleşim yeri veya iş yeri adresi', 'textarea', ' rows="3" autocomplete="street-address"', true) +
        F('eposta', 'E-posta adresi', 'email', ' autocomplete="email" inputmode="email"', false, '(varsa)') + F('telefon', 'Telefon numarası', 'tel', ' autocomplete="tel" inputmode="tel"', false, '(varsa)') +
      '</div>' +
      '<div class="lg-opts" role="radiogroup" aria-labelledby="lgf-cevap"><span class="lg-flabel" id="lgf-cevap">Cevabın size hangi yolla iletilmesini istersiniz?</span>' +
        REPLY.map(function (r, i) { return opt('radio', 'cevap', r, r, 'lgf-cevap-' + i); }).join('') +
      '</div></fieldset>' +
      '<fieldset><legend>3. Veri sorumlusuyla ilişkiniz</legend><p class="lg-fhint">Başvurunuzun doğru kayıtlarla eşleştirilebilmesi için uygun olanları seçin.</p><div class="lg-opts lg-opts--2">' +
        REL.map(function (r, i) { return opt('checkbox', 'iliski', r, r, 'lgf-iliski-' + i); }).join('') +
      '</div><div class="lg-grid">' + F('iliski-diger', 'İlişkinizi kısaca açıklayın', 'text', '', true, '(isteğe bağlı)') + '</div></fieldset>' +
      '<fieldset><legend>4. Talebinizin konusu</legend><p class="lg-fhint">KVKK m.11 kapsamında kullanmak istediğiniz hakları seçin.</p><div class="lg-opts">' +
        RIGHTS.map(function (r, i) { var t = r.replace(/[,.]$/, ''); return opt('checkbox', 'talep', t, t, 'lgf-talep-' + i); }).join('') +
      '</div><div class="lg-grid">' +
        F('aciklama', 'Talebinizin açıklaması', 'textarea', ' rows="5"', true, '(hangi veri, hangi dönem, hangi işlem)') +
        F('ekler', 'Başvuruya eklediğiniz belgeler', 'text', '', true, '(varsa)') +
        F('tarih', 'Tarih', 'date', '', false) +
      '</div></fieldset>' +
      '<div class="lg-actions"><button type="button" class="lg-btn" data-lg-print>' + IC.print + '<span>Yazdır</span></button>' +
        '<button type="button" class="lg-btn lg-btn--ghost" data-lg-clear>' + IC.clear + '<span>Formu temizle</span></button>' +
        '<p class="lg-msg" role="status" aria-live="polite" data-lg-msg></p></div>' +
      '</form><div class="lg-print" aria-hidden="true"></div>';
  }
  function printM(form) {
    var v = function (n) { var el = form.elements[n]; return el ? String(el.value || '').trim() : ''; };
    var picked = function (n) { return [].filter.call(form.querySelectorAll('input[name="' + n + '"]'), function (i) { return i.checked; }).map(function (i) { return i.value; }); };
    var row = function (k, val, cls) { return '<tr><th>' + k + '</th><td class="pr-v' + (val ? '' : ' ' + (cls || 'pr-blank')) + '">' + esc(val) + '</td></tr>'; };
    var list = function (all, sel) { return '<ul>' + all.map(function (a) { a = a.replace(/[,.]$/, ''); var on = sel.indexOf(a) > -1; return '<li><span class="pr-box">' + (on ? 'X' : '') + '</span><span>' + esc(a) + '</span></li>'; }).join('') + '</ul>'; };
    var d = v('tarih'), dt = '';
    if (d) { var p = d.split('-'); if (p.length === 3) dt = p[2] + '.' + p[1] + '.' + p[0]; }
    var adina = picked('adina')[0] || '';
    return '<h1>VERİ SAHİBİ BAŞVURU FORMU</h1>' +
      '<p class="pr-sub">6698 sayılı Kişisel Verilerin Korunması Kanunu m.11 ve m.13; Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ m.5</p>' +
      '<section><h2>Veri sorumlusu</h2><table>' + row('Veri sorumlusu', BIZ.controller) + row('Adres', BIZ.addr) + row('E-posta', BIZ.mail) + row('Telefon', BIZ.tel) + (BIZ.kep ? row('KEP adresi', BIZ.kep) : '') + '</table></section>' +
      '<section><h2>1. Başvuru sahibi</h2><table>' + row('Ad', v('ad')) + row('Soyad', v('soyad')) + row('T.C. kimlik numarası / uyruk ve pasaport numarası', '') + row('Başvuru kim adına', adina) + '</table></section>' +
      '<section><h2>2. Tebligat ve iletişim</h2><table>' + row('Tebligata esas adres', v('adres'), 'pr-tall') + row('E-posta', v('eposta')) + row('Telefon', v('telefon')) + row('Cevabın iletilme yolu', picked('cevap')[0] || '') + '</table></section>' +
      '<section><h2>3. Veri sorumlusuyla ilişki</h2>' + list(REL, picked('iliski')) + (v('iliski-diger') ? '<p class="pr-note">Açıklama: ' + esc(v('iliski-diger')) + '</p>' : '') + '</section>' +
      '<section><h2>4. Talep konusu (KVKK m.11)</h2>' + list(RIGHTS, picked('talep')) + '</section>' +
      '<section><h2>Talebin açıklaması</h2><table>' + row('Açıklama', v('aciklama'), 'pr-tall') + row('Ekler', v('ekler')) + '</table></section>' +
      '<p class="pr-note">Başvurular en kısa sürede ve en geç 30 gün içinde ücretsiz olarak sonuçlandırılır; işlemin ayrıca bir maliyet gerektirmesi hâlinde Kurulca belirlenen tarifedeki ücret alınabilir (KVKK m.13/2). Başkası adına yapılan başvurularda yetki belgesi eklenmelidir.</p>' +
      '<div class="pr-sign"><div>Tarih: ' + esc(dt) + '</div><div>Ad soyad ve imza:</div></div>';
  }

  /* ---------- Bileşen ---------- */
  var STYLE_ID = 'n1-lg1-style';
  class N1LegalPage extends HTMLElement {
    static get observedAttributes() { return ['updated', 'cookie-settings']; }
    attributeChangedCallback(n, o, v) {
      if (!this._on || o === v || !this.querySelector('main.lg')) return;
      if (n === 'updated') { var m = this.querySelector('.lg-meta'), d = this._date(); if (m) m.outerHTML = d ? '<p class="lg-meta"><span>Son güncelleme</span><b><time datetime="' + esc(d.iso) + '">' + esc(d.text) + '</time></b></p>' : '<p class="lg-meta">' + g('P-01') + '</p>'; }
      if (n === 'cookie-settings') this._cmp();
    }
    connectedCallback() {
      if (this._on) return;
      this._on = true;
      this._cleanups = [];
      this._pg = PAGES[this.constructor.pageKey];
      var base = this.getAttribute('deps-base');
      this._url = function (k) { return (base ? base.replace(/\/?$/, '/') + 'gh@' : CDN) + PATHS[k]; };
      this.setAttribute('data-n1lg', this._pg.key);
      this.classList.add('n1-inner-page');
      this._mount().catch((e) => {
        console.error('[' + this._pg.tag + ']', e);
        if (!this.querySelector('main.lg')) this.innerHTML = '<p style="padding:120px 5% 60px;color:#ECEBE5;font:17px/1.6 Barlow,Arial,sans-serif">' + this._pg.title + ' yüklenemedi. Lütfen sayfayı yenileyin veya ' + BIZ.mail + ' adresine yazın.</p>';
      });
    }

    _ev(el, ev, fn, opt) { if (!el) return; el.addEventListener(ev, fn, opt); this._cleanups.push(function () { el.removeEventListener(ev, fn, opt); }); }

    _date() {
      var a = (this.getAttribute('updated') || DATES[this._pg.key] || '').trim(), m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(a);
      if (!m) return null;
      var d = new Date(+m[1], +m[2] - 1, +m[3]);
      if (isNaN(d) || d.getMonth() !== +m[2] - 1) return null;
      return { iso: a, text: d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }) };
    }

    async _mount() {
      var self = this, url = this._url, pg = this._pg;
      if (!document.getElementById(STYLE_ID)) {
        var st = document.createElement('style'); st.id = STYLE_ID; st.textContent = STYLE_CSS; document.head.appendChild(st);
      }
      this.innerHTML = '<div id="ust" style="height:0"></div><main class="lg lg--' + pg.key + '" id="lg-main">' + heroM(pg, this._date()) + bodyM(pg) + endM(pg) + '</main>';
      this._fill();
      var rv = reviewM(pg, this.querySelector('main.lg').innerHTML);
      if (this.hasAttribute('review')) this.querySelector('.lg-hero').insertAdjacentHTML('afterend', rv.html);
      else if (rv.open.length) console.warn('[' + pg.tag + '] Yayın öncesi doğrulanmamış ' + rv.open.length + ' madde var (' + rv.open.join(', ') + '). Ayrıntı: LEGAL_PUBLISH_GATE.md');
      this._toc();

      var fonts = loadCss(FONTS).catch(function (e) { console.warn('[' + pg.tag + '] Font yüklenemedi, yedek font kullanılıyor', e); });
      await Promise.all([loadCss(url('footerCss')), loadCss(url('responsive')), loadJs(url('markup'), function () { return !!window.N1_SITE_MARKUP; })]);
      if (!this._on) return;

      var tpl = document.createElement('template');
      tpl.innerHTML = String(window.N1_SITE_MARKUP || '').split('{{ASSETS}}').join(url('assets'));
      var hdr = tpl.content.querySelector('n1-header'), ft = tpl.content.querySelector('[data-n1-footer]'), fc = tpl.content.querySelector('n1-floating-controls');
      if (!hdr || !ft) throw new Error('Onaylı Header/Footer işaretlemesi bulunamadı');
      var main = this.querySelector('main.lg');

      var otherHeader = [].some.call(document.querySelectorAll('n1-header'), function (h) { return !self.contains(h); });
      if (!otherHeader) {
        var header = hdr.cloneNode(true);
        header.setAttribute('logo-href', '/');
        header.setAttribute('cta-href', header.getAttribute('cta-href') || '/teklif-al');
        var js = header.querySelector('script[type="application/json"]');
        if (js) {
          try {
            var menu = JSON.parse(js.textContent);
            if (menu.brand) menu.brand.href = '/';
            (menu.items || []).forEach(function (it) {
              if (it.href === '#hizmetler-ozet' || it.title === 'Hizmetler') { it.href = '/#hizmetler-ozet'; delete it.match; }
            });
            js.textContent = JSON.stringify(menu);
          } catch (e) { console.warn('[' + pg.tag + '] Menü verisi okunamadı; onaylı veri olduğu gibi kullanılıyor', e); }
        }
        this.insertBefore(header, main);
        this._header = header;
      }

      var otherFooter = [].some.call(document.querySelectorAll('footer.n1ft'), function (f) { return !self.contains(f); });
      if (!otherFooter) {
        var fw = document.createElement('template'); fw.innerHTML = ft.outerHTML;
        var footerRoot = fw.content.querySelector('footer.n1ft');
        var partners = footerRoot && footerRoot.querySelector('.n1ft-partners');
        if (partners) {
          var pc = document.createElement('picture'); pc.className = 'n1ft-partner-art';
          var src = document.createElement('source'); src.media = '(max-width: 767px)'; src.srcset = PARTNER_ART.mobile;
          var im = document.createElement('img'); im.src = PARTNER_ART.tablet; im.alt = '1N Digital Media iş ortakları ve sertifikalar'; im.loading = 'lazy'; im.decoding = 'async';
          im.onerror = function () { pc.classList.add('n1-art-failed'); };
          pc.append(src, im); partners.parentNode.insertBefore(pc, partners);
        }
        var copy = fw.content.querySelector('.n1ft-copy');
        if (copy) copy.textContent = copy.textContent.replace(/©\s*\d{4}/, '© ' + new Date().getFullYear());
        this.append(fw.content);
        this._footerOwned = true;
      }

      var otherFc = [].some.call(document.querySelectorAll('n1-floating-controls'), function (f) { return !self.contains(f); }) || !!document.querySelector('.n1fc:not([data-n1-lg])');
      if (fc && !otherFc) {
        var floating = fc.cloneNode(true);
        if (matchMedia('(max-width:1024px)').matches) floating.setAttribute('show-after', '0.5');
        this.append(floating);
        document.body.classList.add('n1-inner-fc-enabled');
        this._fcOwned = true;
      }

      await fonts;
      if (!this._on) return;
      await loadJs(url('links'), null, true);
      if (this._header) {
        if (!customElements.get('n1-header')) await loadJs(url('header'), function () { return !!customElements.get('n1-header'); });
        else if (!this._header.panel && this._header.connectedCallback) this._header.connectedCallback();
        if (this._header.panel) { this._header.panel.classList.add('n1-inner-panel'); this._header.panel.setAttribute('data-n1-lg', ''); }
      }
      if (this._footerOwned) await loadJs(url('footerJs'), null, true);
      if (this._fcOwned && !customElements.get('n1-floating-controls')) await loadJs(url('floating'), function () { return !!customElements.get('n1-floating-controls'); });
      var layer = document.querySelector('body > .n1fc:last-of-type'); if (this._fcOwned && layer) layer.setAttribute('data-n1-lg', '');
      if (!this._on) return;
      this._markLegal();
      this._hashJump();
    }

    /* Footer'daki yasal bağlantılardan bu sayfanınkini işaretler (yalnızca aria-current; görünüm değişmez) */
    _markLegal() {
      var a = this.querySelector('footer.n1ft a[href="' + L[this._pg.key].href + '"]');
      if (a) a.setAttribute('aria-current', 'page');
    }

    _offset() {
      var h = this.querySelector('n1-header'), b = 0;
      if (h) { var r = h.getBoundingClientRect(), cs = getComputedStyle(h); if ((cs.position === 'fixed' || cs.position === 'sticky') && r.bottom > 0) b = r.bottom; }
      return Math.max(b, parseFloat(getComputedStyle(this).getPropertyValue('--hdr')) || 0) + 20;
    }
    _go(id, focus) {
      var t = this.querySelector('#' + CSS_ESC(id)); if (!t) return;
      var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
      scrollTo({ top: Math.max(0, t.getBoundingClientRect().top + scrollY - this._offset()), behavior: reduce ? 'auto' : 'smooth' });
      if (focus) { var h = t.querySelector('.lg-h2'); if (h) h.focus({ preventScroll: true }); }
    }
    _hashJump() {
      var id = decodeURIComponent((location.hash || '').slice(1));
      if (!id || !this.querySelector('#' + CSS_ESC(id))) return;
      var self = this; setTimeout(function () { if (self._on) self._go(id, false); }, 120);
    }

    _toc() {
      var self = this;
      var links = [].slice.call(this.querySelectorAll('[data-lg-to]'));
      var desk = [].slice.call(this.querySelectorAll('.lg-toc [data-lg-to]'));
      var secs = [].slice.call(this.querySelectorAll('.lg-sec'));
      var dm = this.querySelector('.lg-tocm');
      links.forEach(function (a) {
        self._ev(a, 'click', function (e) {
          e.preventDefault();
          if (dm && dm.contains(a)) dm.open = false;
          self._go(a.getAttribute('data-lg-to'), true);
        });
      });
      var raf = 0, cur = null;
      function pick() {
        raf = 0;
        var line = Math.max(self._offset() + 40, innerHeight * 0.33), act = secs[0];
        for (var i = 0; i < secs.length; i++) { if (secs[i].getBoundingClientRect().top <= line) act = secs[i]; else break; }
        if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4 && secs.length) { var last = secs[secs.length - 1]; if (last.getBoundingClientRect().top < innerHeight) act = last; }
        var id = act && act.id;
        if (id === cur) return; cur = id;
        desk.forEach(function (a) { if (a.getAttribute('data-lg-to') === id) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
      }
      var onScroll = function () { if (!raf) raf = requestAnimationFrame(pick); };
      this._ev(window, 'scroll', onScroll, { passive: true });
      this._ev(window, 'resize', onScroll, { passive: true });
      this._cleanups.push(function () { if (raf) cancelAnimationFrame(raf); });
      pick();
    }

    _fill() {
      var self = this;
      var ck = this.querySelector('[data-lg-cookies]'); if (ck) ck.outerHTML = cookiesM();
      var cm = this.querySelector('[data-lg-cmp]');
      if (cm) { cm.outerHTML = '<div class="lg-cmpbox"></div>'; this._cmp(); }
      var fm = this.querySelector('[data-lg-form]');
      if (fm) { fm.outerHTML = formM(); this._form(); }
    }

    _cmp() {
      var self = this, box = this.querySelector('.lg-cmpbox'); if (!box) return;
      if (this._cmpOff) { this._cmpOff(); this._cmpOff = null; }
      var path = this.getAttribute('cookie-settings') || COOKIE_SETTINGS_FN, f = resolveFn(path);
        if (f) {
          box.innerHTML = '<div class="lg-cmp"><button type="button" class="lg-btn" data-lg-cmp-open>' + IC.sliders + '<span>Çerez tercihlerini yönet</span></button><p class="lg-msg" role="status" aria-live="polite" data-lg-cmp-msg></p></div>';
          var b = box.querySelector('[data-lg-cmp-open]'), msg = box.querySelector('[data-lg-cmp-msg]');
          var onClick = function () {
            var now = resolveFn(path);
            try { if (!now) throw new Error('yok'); now.fn.call(now.ctx); msg.textContent = ''; }
            catch (e) { msg.textContent = 'Tercih aracı şu anda açılamadı. Tarayıcı ayarlarınızı kullanabilir veya ' + BIZ.mail + ' adresine yazabilirsiniz.'; console.warn('[' + self._pg.tag + '] Çerez tercih aracı açılamadı', e); }
          };
          b.addEventListener('click', onClick);
          this._cmpOff = function () { b.removeEventListener('click', onClick); };
        } else {
          box.innerHTML = '<p class="lg-cmp lg-msg">Bu sayfada şu anda bir tercih düğmesi bulunmuyor. Tercihlerinizi tarayıcınızın ayarlarından yönetebilir veya ' + MAIL() + ' adresine yazarak rızanızı geri alabilirsiniz. ' + g('C-02') + '</p>';
        }
    }

    _form() {
      var self = this, form = this.querySelector('.lg-form'), out = this.querySelector('.lg-print'), msg = this.querySelector('[data-lg-msg]');
      var root = document.documentElement;
      var done = function () { root.classList.remove('lg-printing'); out.innerHTML = ''; };
      this._ev(form, 'submit', function (e) { e.preventDefault(); });
      this._ev(this.querySelector('[data-lg-print]'), 'click', function () {
        out.innerHTML = printM(form);
        root.classList.add('lg-printing');
        msg.textContent = 'Yazdırma penceresi açılıyor. Formu yazdırdıktan sonra T.C. kimlik numaranızı ve imzanızı elle ekleyin.';
        try { window.print(); } catch (e) { msg.textContent = 'Tarayıcınız yazdırmayı başlatamadı. Tarayıcı menüsündeki "Yazdır" komutunu kullanabilirsiniz.'; }
      });
      // Baskı görünümü yalnızca @media print'te etkilidir; ekranda hiçbir şey değişmez. Baskı bitince temizlenir.
      this._ev(window, 'afterprint', function () { setTimeout(done, 300); });
      this._ev(this.querySelector('[data-lg-clear]'), 'click', function () {
        form.reset(); msg.textContent = 'Form temizlendi.';
        var first = form.querySelector('#lgf-ad'); if (first) first.focus();
      });
      this._cleanups.push(done);
    }

    disconnectedCallback() {
      this._on = false;
      (this._cleanups || []).forEach(function (f) { try { f(); } catch (e) {} });
      this._cleanups = [];
      if (this._cmpOff) { this._cmpOff(); this._cmpOff = null; }
      if (this._fcOwned) document.body.classList.remove('n1-inner-fc-enabled');
      this._fcOwned = false; this._footerOwned = false; this._header = null;
      this.replaceChildren();
      var st = document.getElementById(STYLE_ID); if (st && !document.querySelector('[data-n1lg]')) st.remove();
    }
  }
  function CSS_ESC(s) { return window.CSS && window.CSS.escape ? window.CSS.escape(s) : String(s).replace(/[^\w-]/g, '\\$&'); }

  /* Beş Custom Element: aynı dosya, farklı Tag Name. Her biri yalnızca kendi metnini oluşturur (URL'ye bakmaz). */
  ORDER.forEach(function (k) {
    var tag = PAGES[k].tag;
    if (customElements.get(tag)) return;
    var C = class extends N1LegalPage {};
    C.pageKey = k;
    customElements.define(tag, C);
  });
})();