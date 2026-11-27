# 1N V1.3 mobil stres testi — sonuç raporu
Betik 1.0.0 · rapor 2026-11-27T19:20:23.647Z
Cihaz: Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1 · ekran 390x844@3
Plan: {"vars":["B","R1"],"rep":1,"modes":"ne","np":3}
NOT: "OLASI ÇÖKME" = beklenmeyen belge yeniden yüklemesi (iOS sekmeyi yeniden yükledi ya da kullanıcı yeniden yükledi). Kesin çökme kanıtı değildir. Bellek ölçülmez (Safari desteklemez).

## Varyant özeti
| Varyant | Adım (tamam/sorun) | OLASI ÇÖKME | Atlanan | Geri sonrası yeniden yükleme (Wix ATS?) | Erken geri tetiklendi | Hizmet sayfası TTFB / DCL / bileşen hazır (medyan ms) | Ana sayfa Ronin (kaynak, çözünürlük, durum) | 1N JS hatası |
|---|---|---|---|---|---|---|---|---|
| B · yayındaki V1.3 | 6 / 1 | 1 | 0 | 3 | 3/3 | – / 1781 / 3202 | ronin-m5-film-2x.mp4 1120x1504 playing | 0 |
| Ronin 1× | 6 / 0 | 0 | 0 | 3 | 3/3 | – / 1019 / 2288 | ronin-m5-film.mp4 560x752 playing | 0 |

## Sayfa × varyant: OLASI ÇÖKME / adım
| Sayfa | B | R1 |
|---|---|---|
| /kreatif-produksiyon | 0/2 | 0/2 |
| /e-ticaret-yonetimi | 1/3 | 0/2 |
| /sosyal-medya | 0/2 | 0/2 |
| /reklam-yonetimi | 0/0 | 0/0 |
| /ui-ux-tasarim | 0/0 | 0/0 |
| /yapay-zeka | 0/0 | 0/0 |
| /uygulama-gelistirme | 0/0 | 0/0 |

## Sorunlu adımlar
- 7:16:45 PM · B · yayındaki V1.3 · /e-ticaret-yonetimi · normal · deneme 1 · OLASI ÇÖKME: hizmet sayfası üzerindeyken yeniden yüklendi (reload) · aşama page · videolar {"n":0,"src":0,"play":0,"err":0}

## Ham veri (CSV)
t,v,r,p,m,d,try,crash,anomaly,how,pageNt,backNt,backReload,ebFired,earlyBeforeRunner,navStartDelay,ttfb,dcl,load,ceReady,loaderGone,scrollSteps,scrollMs,pageVideos,pagePlaying,homeHero,homeHeroRes,homeHeroState,homePlaying,homeBackReadyMs,errs
2026-11-27T19:16:28.608Z,B,1,/kreatif-produksiyon,n,0,1,0,,bağlantı,navigate,reload,0,0,0,69,,2214,2711,3921,8353,42,13195,2,0,ronin-m5-film-2x.mp4,1120x1504,playing,1,1004,0
2026-11-27T19:16:36.684Z,B,1,/kreatif-produksiyon,e,500,1,0,,bağlantı,,reload,0,1,1,,,,,,,,,,,ronin-m5-film-2x.mp4,1120x1504,playing,1,512,0
2026-11-27T19:16:45.669Z,B,1,/e-ticaret-yonetimi,n,0,1,1,OLASI ÇÖKME: hizmet sayfası üzerindeyken yeniden yüklendi (reload),bağlantı,navigate,,0,0,0,57,,,,3446,7160,,,3,0,ronin-m5-film-2x.mp4,1120x1504,playing,1,,0
2026-11-27T19:17:28.020Z,B,1,/e-ticaret-yonetimi,n,0,2,0,,bağlantı,navigate,reload,0,0,0,56,,933,1395,2453,6252,49,15224,3,0,ronin-m5-film-2x.mp4,1120x1504,playing,1,560,0
2026-11-27T19:17:35.799Z,B,1,/e-ticaret-yonetimi,e,1000,1,0,,bağlantı,,back_forward,0,1,1,,,,,,,,,,,ronin-m5-film-2x.mp4,1120x1504,playing,1,514,0
2026-11-27T19:18:07.477Z,B,1,/sosyal-medya,n,0,1,0,,bağlantı,navigate,back_forward,0,0,0,48,,1781,2240,3202,6708,49,15081,4,0,ronin-m5-film-2x.mp4,1120x1504,playing,1,1258,0
2026-11-27T19:18:17.632Z,B,1,/sosyal-medya,e,2000,1,0,,bağlantı,navigate,back_forward,0,1,0,70,,,,,,,,,,ronin-m5-film-2x.mp4,1120x1504,playing,1,1277,0
2026-11-27T19:18:55.386Z,R1,1,/kreatif-produksiyon,n,0,1,0,,bağlantı,navigate,reload,0,0,0,59,,971,1443,2919,6450,42,13278,2,0,ronin-m5-film.mp4,560x752,playing,1,1014,0
2026-11-27T19:19:02.995Z,R1,1,/kreatif-produksiyon,e,500,1,0,,bağlantı,,reload,0,1,1,,,,,,,,,,,ronin-m5-film.mp4,560x752,playing,1,754,0
2026-11-27T19:19:34.459Z,R1,1,/e-ticaret-yonetimi,n,0,1,0,,bağlantı,navigate,reload,0,0,0,38,,1019,1452,2205,5959,49,15241,3,0,ronin-m5-film.mp4,560x752,playing,1,757,0
2026-11-27T19:19:41.407Z,R1,1,/e-ticaret-yonetimi,e,1000,1,0,,bağlantı,navigate,back_forward,0,1,0,62,,,,,,,,,,ronin-m5-film.mp4,560x752,playing,1,0,0
2026-11-27T19:20:12.808Z,R1,1,/sosyal-medya,n,0,1,0,,bağlantı,navigate,back_forward,0,0,0,71,,1162,1601,2288,6594,49,14964,4,0,ronin-m5-film.mp4,560x752,playing,1,1271,0
2026-11-27T19:20:21.587Z,R1,1,/sosyal-medya,e,2000,1,0,,bağlantı,navigate,back_forward,0,1,0,46,,,,,,,,,,ronin-m5-film.mp4,560x752,playing,1,1010,0