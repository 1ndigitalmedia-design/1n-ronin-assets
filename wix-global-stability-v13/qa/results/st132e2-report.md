# 1N V1.3.2 mobil stres testi — sonuç raporu
Betik 2.0.0 · runId rmwzhxiqk7nw29 · rapor 2026-11-27T21:33:11.762Z
Cihaz: Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.7 Mobile/15E148 Safari/604.1 · ekran 440x956@3
Seçenekler: {"vars":["B"],"pages":["/reklam-yonetimi"],"scen":["n","e1000"],"rep":1} · plan adımı 2 · deneme kaydı 3 (benzersiz attemptId)
Video ön kontrolü: OTOMATİK OYNATMA ÇALIŞIYOR · ronin-m5-film-2x.mp4 1120x1504 rs4 ns1
Sınıflar: ÇÖKME ADAYI = test beklemiyorken sayfa yeniden yüklendi (Safari çökme sonrası yeniden yükleme YA DA elle yeniden yükleme; ayırt edilemez). BFCache dönüşü çökme sayılmaz. Wix ATS yeniden yüklemesi ayrı sayılır.

## Varyant özeti (yalnız 1. denemeler; ek denemeler ayrı sütunda)
| Varyant | Plan adımı | Geçerli 1. deneme | ÇÖKME ADAYI | Belirsiz yeniden yükleme | Test kaynaklı sorun (beklenmeyen/yanlış geçmiş/zaman aşımı) | Ek deneme | Wix ATS yeniden yükleme | Video doğrulandı (ana sayfa) | Ronin (kaynak, çözünürlük) | Hizmet TTFB/DCL/bileşen (medyan ms) | 1N JS hatası |
|---|---|---|---|---|---|---|---|---|---|---|---|
| B · yayındaki V1.3 | 2 | 1 | 0 | 0 | 1 | 1 | 2 | 2/2 | ronin-m5-film.mp4 560x752 playing; ronin-m5-film-2x.mp4 1120x1504 playing | – / – / – | 0 |

## Sayfa × senaryo × varyant (1. denemeler: çökme adayı / geçerli)
| Sayfa | Senaryo | B |
|---|---|---|
| /reklam-yonetimi | normal (sona kadar kaydır + geri) | 0/0 |
| /reklam-yonetimi | erken geri 1 sn | 0/1 |

## Sorunlu denemeler
- 0.1 · B · yayındaki V1.3 · /reklam-yonetimi · normal (sona kadar kaydır + geri) · beklenmeyen gezinme · hizmet sayfası etkinken beklenmeyen gezinme (navigate → /) · {"nt":"navigate","path":"/","phase":"page","exp":"link","gapMs":16346}

## Olay günlüğü (son 60)
- 21:31:18 preflight / doc:4cg5t ""
- 21:31:18 start / doc:4cg5t ""
- 21:31:50 lease-takeover / doc:wgacq ""
- 21:31:50 issue / doc:wgacq {"nt":"navigate","path":"/","phase":"page","exp":"link","gapMs":16346}
- 21:32:47 ok / doc:jbpcy ""
- 21:33:09 ok / doc:v0ddi 1
- 21:33:09 done / doc:v0ddi ""

## Ham veri — denemeler (CSV, attemptId başına bir satır)
attemptId,stepId,attempt,block,v,p,sc,r,cls,msg,homeNt,pageNt,backNt,atsReload,earlyBeforeRunner,ebFired,ebAtMs,ebReadyState,navStartDelay,ttfb,dcl,load,ceReady,loaderGone,videoOk,heroSrc,heroWxH,heroState,heroRs,heroNs,heroAdv,homePlaying,homeVideos,pagePlaying,pageVideos,pagePlayingEnd,mevPlaying,mevWaiting,mevStalled,mevError,scrollSteps,scrollMs,homeBackPlaying,errs,tStart,tEnd
0.1,0,1,0,B,/reklam-yonetimi,n,1,unexpected,hizmet sayfası etkinken beklenmeyen gezinme (navigate → /),navigate,navigate,,0,0,,,,48,,,,,,1,ronin-m5-film.mp4,560x752,playing,4,1,1,1,5,,,,,,,,,,,0,2026-11-27T21:31:18.428Z,2026-11-27T21:31:50.861Z
0.2,0,2,0,B,/reklam-yonetimi,n,1,ok,,navigate,navigate,reload,1,0,,,,60,,1080,1562,2431,5951,1,ronin-m5-film-2x.mp4,1120x1504,playing,4,1,1,1,5,0,3,0,12,12,1,0,72,22933,1,0,2026-11-27T21:31:54.709Z,2026-11-27T21:32:47.763Z
1.1,1,1,1,B,/reklam-yonetimi,e1000,1,ok,,navigate,,reload,1,1,1,1001,loading,,,,,,,1,ronin-m5-film-2x.mp4,1120x1504,playing,4,1,1,1,5,,,,,,,,,,1,,2026-11-27T21:32:47.763Z,2026-11-27T21:33:09.899Z