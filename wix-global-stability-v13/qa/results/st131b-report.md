# 1N V1.3 mobil stres testi — sonuç raporu
Betik 1.0.0 · rapor 2026-11-27T19:21:29.742Z
Cihaz: Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1 · ekran 390x844@3
Plan: {"vars":["R1"],"rep":1,"modes":"e","np":3}
Erken geri: geri, yeni sayfanın Head kodu çalışır çalışmaz zamanlanır; CSV ebAtMs = gerçek tetiklenme anı (gezinme başlangıcından ms), ebReadyState = o andaki belge durumu.
NOT: "OLASI ÇÖKME" = beklenmeyen belge yeniden yüklemesi (iOS sekmeyi yeniden yükledi ya da kullanıcı yeniden yükledi). Kesin çökme kanıtı değildir. Bellek ölçülmez (Safari desteklemez).

## Varyant özeti
| Varyant | Adım (tamam/sorun) | OLASI ÇÖKME | Atlanan | Geri sonrası yeniden yükleme (Wix ATS?) | Erken geri tetiklendi | Hizmet sayfası TTFB / DCL / bileşen hazır (medyan ms) | Ana sayfa Ronin (kaynak, çözünürlük, durum) | 1N JS hatası |
|---|---|---|---|---|---|---|---|---|
| Ronin 1× | 3 / 0 | 0 | 0 | 3 | 3/3 | – / – / – | ronin-m5-film.mp4 560x752 playing | 0 |

## Sayfa × varyant: OLASI ÇÖKME / adım
| Sayfa | R1 |
|---|---|
| /kreatif-produksiyon | 0/1 |
| /e-ticaret-yonetimi | 0/1 |
| /sosyal-medya | 0/1 |

## Sorunlu adımlar
Yok.

## Ham veri (CSV)
t,v,r,p,m,d,try,crash,anomaly,how,pageNt,backNt,backReload,ebFired,ebAtMs,ebReadyState,ebVideos,ebLoader,earlyBeforeRunner,navStartDelay,ttfb,dcl,load,ceReady,loaderGone,scrollSteps,scrollMs,pageVideos,pagePlaying,homeHero,homeHeroRes,homeHeroState,homePlaying,homeBackReadyMs,errs
2026-11-27T19:21:12.564Z,R1,1,/kreatif-produksiyon,e,500,1,0,,bağlantı,,reload,0,1,912,loading,0,0,1,,,,,,,,,,,ronin-m5-film.mp4,560x752,playing,1,259,0
2026-11-27T19:21:20.027Z,R1,1,/e-ticaret-yonetimi,e,1000,1,0,,bağlantı,,reload,0,1,1108,loading,0,0,1,,,,,,,,,,,ronin-m5-film.mp4,560x752,playing,1,250,0
2026-11-27T19:21:29.095Z,R1,1,/sosyal-medya,e,2000,1,0,,bağlantı,navigate,reload,0,1,2155,complete,0,1,0,41,,,,,,,,,,ronin-m5-film.mp4,560x752,playing,1,251,0