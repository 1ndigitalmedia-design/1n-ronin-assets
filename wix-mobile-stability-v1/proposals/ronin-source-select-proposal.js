/*!
 * ÖNERİ — üretimde KULLANILMIYOR. MOBILE_MEDIA_BENCHMARK.md §5.
 * Ronin mobil filmi için deviceMemory'ye (Safari'de yok) dayanmayan kaynak seçimi.
 * Mevcut kural (wix-home-v656/modules/n1-m5-build.js:34):
 *   if (!saveData && !(deviceMemory <= 2) && filmCss * dpr > 840) → 2× (1120×1504), yoksa 1× (560×752)
 *   Safari'de deviceMemory tanımsız → bellek koşulu hiç uygulanmaz; iPhone (DPR 3) her zaman 2× alır.
 *
 * Öneri: "gereksinim + yetenek + oturum" kararı. Görsel kalite varsayılanı korunur (2× yetenekli cihazda 2× kalır);
 * yalnızca sinyaller düşük kapasite gösterdiğinde 1×'e inilir.
 *   1) Gereksinim: filmCss × min(DPR, 3) ≤ 700 → 1× zaten yeterli (≤1,25× büyütme).
 *   2) Yetenek: navigator.mediaCapabilities.decodingInfo(2× profil) → smooth && powerEfficient değilse 1×.
 *      (Safari 13+, Chrome 66+ destekler; desteklenmiyorsa bu adım atlanır.)
 *   3) Veri tasarrufu / hareket azaltma: saveData veya prefers-reduced-motion → 1× (mevcut davranışla uyumlu).
 *   4) Oturum bütçesi (isteğe bağlı): aynı sekmede 2× film bu oturumda ≥ N kez yüklendiyse ve önceki yükleme
 *      BFCache dışı bir geri dönüşe denk geldiyse 1× (sessionStorage sayacı). Kalite tutarlılığı için varsayılan KAPALI.
 *   5) Mevcut güvenlik ağı korunur: 2× 9 sn içinde kare veremezse 1×'e geçiş (n1-video-m5.js:279).
 * ÖLÇÜM SONUCU (MOBILE_MEDIA_BENCHMARK.md §4): Playwright Chromium ve WebKit'te 1×/1,5×/2× için decodingInfo üçü de
 *   {supported:true, smooth:true, powerEfficient:false} döndü (yazılım çözücü). iPhone'da H.264 donanımla çözüldüğü
 *   için büyük olasılıkla üçü de powerEfficient:true döner → bu kapı iPhone'da 1× ile 2×'i AYIRT ETMEYEBİLİR.
 *   Gerçek cihazda doğrulanmadan bu adıma güvenilmemeli; asıl karar kalite ↔ bellek tercihidir (rapor §5).
 * Dönüş: Promise<'2x'|'1x'> — kurulum (build) senkron olduğundan, uygulanacaksa build öncesi tek seferlik await gerekir.
 */
function n1PickRoninSource(filmCss, opts) {
  opts = opts || {};
  var dpr = Math.min(window.devicePixelRatio || 1, 3);
  var c = navigator.connection || {};
  if (c.saveData) return Promise.resolve('1x');
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return Promise.resolve('1x');
  if (filmCss * dpr <= 700) return Promise.resolve('1x');
  if (typeof navigator.deviceMemory === 'number' && navigator.deviceMemory <= 2) return Promise.resolve('1x');
  if (!navigator.mediaCapabilities || !navigator.mediaCapabilities.decodingInfo) return Promise.resolve('2x');
  return navigator.mediaCapabilities.decodingInfo({
    type: 'file',
    video: { contentType: 'video/mp4; codecs="avc1.64002A"', width: 1120, height: 1504, bitrate: 2800000, framerate: 24 }
  }).then(function (r) { return (r.supported && r.smooth && r.powerEfficient) ? '2x' : '1x'; }, function () { return '2x'; });
}
