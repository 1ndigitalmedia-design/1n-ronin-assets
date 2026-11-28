  /* ---------- İçerik (tek kaynak) ----------
   * Sayfa metinleri yalnız buradan okunur. İleride gerçek ilan / staj dönemi açıldığında ilgili sayfanın "items" dizisine
   * kayıt eklenir: { title: 'Pozisyon adı', meta: 'Tam zamanlı · İzmir', href: '/acik-pozisyonlar/pozisyon-adi' }.
   * Dizi boşken liste hiç oluşturulmaz; sayaç ve durum metni "empty" alanından gelir. CMS / backend / form YOKTUR. */
  var PAGES = {
    'n1-insan-kaynaklari-v1': {
      kind: 'hub', path: '/insan-kaynaklari', kicker: ['01', 'KARİYER'],
      title: ['İNSAN', 'KAYNAKLARI'], accent: 'Geleceği birlikte tasarlıyoruz.',
      desc: 'Yaratıcılığı, teknolojiyi ve farklı bakış açılarını bir araya getiren ekibimizde kariyer fırsatlarını keşfet.',
      doors: [
        { tone: 'acc', kicker: ['01', 'CAREER'], title: ['AÇIK', 'POZİSYONLAR'], sub: 'Kariyer fırsatlarını keşfet.', href: '/acik-pozisyonlar' },
        { tone: 'dark', kicker: ['02', 'INTERNSHIP'], title: ['STAJ', 'PROGRAMLARI'], sub: 'Kariyerine ilk adımı at.', href: '/staj-programlari' }
      ]
    },
    'n1-acik-pozisyonlar-v1': {
      kind: 'info', path: '/acik-pozisyonlar', kicker: ['01', 'CAREER'],
      title: ['AÇIK', 'POZİSYONLAR'], accent: 'Yeni fırsatlarda görüşmek üzere.',
      desc: 'Şu anda ekibimizde açık bir pozisyon bulunmamaktadır. Yeni kariyer fırsatlarımızı bu sayfa üzerinden takip edebilirsiniz.',
      countLabel: 'Açık pozisyon', empty: 'Şu anda açık pozisyon bulunmuyor.', listLabel: 'Açık pozisyonlar',
      items: [],
      back: { text: 'İnsan Kaynaklarına Dön', href: '/insan-kaynaklari' }
    },
    'n1-staj-programlari-v1': {
      kind: 'info', path: '/staj-programlari', kicker: ['02', 'INTERNSHIP'],
      title: ['STAJ', 'PROGRAMLARI'], accent: 'Geleceğin yeteneklerine.',
      desc: 'Şu anda aktif bir staj programımız bulunmamaktadır. Yeni staj dönemlerimize ilişkin duyuruları bu sayfa üzerinden takip edebilirsiniz.',
      countLabel: 'Aktif program', empty: 'Staj başvuruları şu anda kapalı.', listLabel: 'Staj programları',
      items: [],
      back: { text: 'İnsan Kaynaklarına Dön', href: '/insan-kaynaklari' }
    }
  };
