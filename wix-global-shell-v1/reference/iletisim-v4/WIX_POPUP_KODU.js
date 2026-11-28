import wixWindowFrontend from 'wix-window-frontend';
const allowed = new Set([
  "https://www.a7-1n.com/a7-produksiyon",
  "https://www.carsialtin.com/faprika/canli-piyasalar/",
  "https://www.hementik.la/",
  "https://www.reklam1n.com/",
  "https://www.reklam1n.com/acik-pozisyonlar",
  "https://www.reklam1n.com/e-ticaret-yonetimi",
  "https://www.reklam1n.com/iletisim",
  "https://www.reklam1n.com/insan-kaynaklari",
  "https://www.reklam1n.com/intelligence",
  "https://www.reklam1n.com/kisaca-biz",
  "https://www.reklam1n.com/kreatif-produksiyon",
  "https://www.reklam1n.com/markalar",
  "https://www.reklam1n.com/reklam-ajansi",
  "https://www.reklam1n.com/reklam-yonetimi",
  "https://www.reklam1n.com/sosyal-medya",
  "https://www.reklam1n.com/staj-programlari",
  "https://www.reklam1n.com/ui-ux-tasarim",
  "https://www.reklam1n.com/uygulama-gelistirme",
  "https://www.reklam1n.com/yapay-zeka",
  "https://www.zeyp.com.tr/"
]);
$w.onReady(function () {
  $w('#n1MenuHtml').onMessage((event) => {
    const data = event.data;
    if (data?.type === 'N1_MENU_CLOSE_V2') wixWindowFrontend.lightbox.close();
    if (data?.type === 'N1_MENU_NAV_V2' && allowed.has(data.url)) {
      wixWindowFrontend.lightbox.close({url:data.url});
    }
  });
});
