import wixWindowFrontend from 'wix-window-frontend';
import wixLocationFrontend from 'wix-location-frontend';
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
  let opening = false;
  $w('#n1HeaderHtml').onMessage(async (event) => {
    if (event.data?.type !== 'N1_MENU_OPEN_V2' || opening) return;
    opening = true;
    try {
      const result = await wixWindowFrontend.openLightbox('1N Global Menu');
      if (result && allowed.has(result.url)) wixLocationFrontend.to(result.url);
    } catch (error) { console.error('1N menu:', error); }
    finally { opening = false; }
  });
});
