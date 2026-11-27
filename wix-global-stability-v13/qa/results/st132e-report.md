# 1N V1.3.2 mobil stres testi — sonuç raporu
Betik 2.0.0 · runId rmwzhviwaavlkr · rapor 2026-11-27T21:31:03.929Z
Cihaz: Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.7 Mobile/15E148 Safari/604.1 · ekran 440x956@3
Seçenekler: {"vars":["B"],"pages":["/reklam-yonetimi"],"scen":["n","e1000"],"rep":1} · plan adımı 2 · deneme kaydı 2 (benzersiz attemptId)
Video ön kontrolü: OTOMATİK OYNATMA ÇALIŞIYOR · ronin-m5-film-2x.mp4 1120x1504 rs4 ns1
Sınıflar: ÇÖKME ADAYI = test beklemiyorken sayfa yeniden yüklendi (Safari çökme sonrası yeniden yükleme YA DA elle yeniden yükleme; ayırt edilemez). BFCache dönüşü çökme sayılmaz. Wix ATS yeniden yüklemesi ayrı sayılır.

## Varyant özeti (yalnız 1. denemeler; ek denemeler ayrı sütunda)
| Varyant | Plan adımı | Geçerli 1. deneme | ÇÖKME ADAYI | Belirsiz yeniden yükleme | Test kaynaklı sorun (beklenmeyen/yanlış geçmiş/zaman aşımı) | Ek deneme | Wix ATS yeniden yükleme | Video doğrulandı (ana sayfa) | Ronin (kaynak, çözünürlük) | Hizmet TTFB/DCL/bileşen (medyan ms) | 1N JS hatası |
|---|---|---|---|---|---|---|---|---|---|---|---|
| B · yayındaki V1.3 | 2 | 2 | 0 | 0 | 0 | 0 | 2 | 2/2 | ronin-m5-film-2x.mp4 1120x1504 playing | – / 1245 / 2282 | 0 |

## Sayfa × senaryo × varyant (1. denemeler: çökme adayı / geçerli)
| Sayfa | Senaryo | B |
|---|---|---|
| /reklam-yonetimi | normal (sona kadar kaydır + geri) | 0/1 |
| /reklam-yonetimi | erken geri 1 sn | 0/1 |

## Sorunlu denemeler
Yok.

## Olay günlüğü (son 60)
- 21:29:45 preflight / doc:mcrlq ""
- 21:29:45 start / doc:mcrlq ""
- 21:30:39 ok / doc:wy4sl ""
- 21:31:02 ok / doc:f9uyi 1
- 21:31:02 done / doc:f9uyi ""

## Ham veri — denemeler (CSV, attemptId başına bir satır)
attemptId,stepId,attempt,block,v,p,sc,r,cls,msg,homeNt,pageNt,backNt,atsReload,earlyBeforeRunner,ebFired,ebAtMs,ebReadyState,navStartDelay,ttfb,dcl,load,ceReady,loaderGone,videoOk,heroSrc,heroWxH,heroState,heroRs,heroNs,heroAdv,homePlaying,homeVideos,pagePlaying,pageVideos,pagePlayingEnd,mevPlaying,mevWaiting,mevStalled,mevError,scrollSteps,scrollMs,homeBackPlaying,errs,tStart,tEnd
0.1,0,1,0,B,/reklam-yonetimi,n,1,ok,,navigate,navigate,reload,1,0,,,,43,,1245,1668,2282,6181,1,ronin-m5-film-2x.mp4,1120x1504,playing,4,1,1,1,5,0,3,0,12,11,1,0,72,23164,1,0,2026-11-27T21:29:45.323Z,2026-11-27T21:30:39.445Z
1.1,1,1,1,B,/reklam-yonetimi,e1000,1,ok,,navigate,navigate,reload,1,0,1,1012,loading,65,,,,,,1,ronin-m5-film-2x.mp4,1120x1504,playing,4,1,1,1,5,,,,,,,,,,1,,2026-11-27T21:30:39.446Z,2026-11-27T21:31:02.165Z