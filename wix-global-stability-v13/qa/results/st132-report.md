# 1N V1.3.2 mobil stres testi — sonuç raporu
Betik 2.0.0 · runId rmwzhr7x9fgblv · rapor 2026-11-27T21:29:17.464Z
Cihaz: Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.7 Mobile/15E148 Safari/604.1 · ekran 440x956@3
Seçenekler: {"vars":["B","RP"],"pages":["/reklam-yonetimi"],"scen":["n","e1000"],"rep":1} · plan adımı 4 · deneme kaydı 6 (benzersiz attemptId)
Video ön kontrolü: OTOMATİK OYNATMA ÇALIŞIYOR · ronin-m5-film-2x.mp4 1120x1504 rs4 ns1
Sınıflar: ÇÖKME ADAYI = test beklemiyorken sayfa yeniden yüklendi (Safari çökme sonrası yeniden yükleme YA DA elle yeniden yükleme; ayırt edilemez). BFCache dönüşü çökme sayılmaz. Wix ATS yeniden yüklemesi ayrı sayılır.

## Varyant özeti (yalnız 1. denemeler; ek denemeler ayrı sütunda)
| Varyant | Plan adımı | Geçerli 1. deneme | ÇÖKME ADAYI | Belirsiz yeniden yükleme | Test kaynaklı sorun (beklenmeyen/yanlış geçmiş/zaman aşımı) | Ek deneme | Wix ATS yeniden yükleme | Video doğrulandı (ana sayfa) | Ronin (kaynak, çözünürlük) | Hizmet TTFB/DCL/bileşen (medyan ms) | 1N JS hatası |
|---|---|---|---|---|---|---|---|---|---|---|---|
| B · yayındaki V1.3 | 2 | 2 | 1 | 1 | 0 | 0 | 0 | 2/2 | ronin-m5-film-2x.mp4 1120x1504 playing | – / – / – | 0 |
| Ronin yalnız poster | 2 | 0 | 0 | 0 | 2 | 2 | 2 | beklenmiyor | poster-only 0x0 error | – / – / – | 0 |

## Sayfa × senaryo × varyant (1. denemeler: çökme adayı / geçerli)
| Sayfa | Senaryo | B | RP |
|---|---|---|---|
| /reklam-yonetimi | normal (sona kadar kaydır + geri) | 1/1 | 0/0 |
| /reklam-yonetimi | erken geri 1 sn | 0/1 | 0/0 |

## Sorunlu denemeler
- 0.1 · B · yayındaki V1.3 · /reklam-yonetimi · normal (sona kadar kaydır + geri) · ÇÖKME ADAYI (beklenmeyen yeniden yükleme) · hizmet sayfası etkinken yeniden yüklendi · {"nt":"reload","path":"/reklam-yonetimi","phase":"page","exp":"link","gapMs":3976}
- 1.1 · Ronin yalnız poster · /reklam-yonetimi · normal (sona kadar kaydır + geri) · yanlış geçmiş girdisi · geri, ana sayfa yerine /sosyal-medya (navigate) · {"nt":"navigate","path":"/sosyal-medya","phase":"back","exp":"back","gapMs":2972}
- 2.1 · Ronin yalnız poster · /reklam-yonetimi · erken geri 1 sn · beklenmeyen gezinme · ana sayfa etkinken beklenmeyen gezinme (navigate → /yapay-zeka) · {"nt":"navigate","path":"/yapay-zeka","phase":"home","exp":"fresh-home","gapMs":2545}
- 3.1 · B · yayındaki V1.3 · /reklam-yonetimi · erken geri 1 sn · belirsiz yeniden yükleme · geçiş sırasında ana sayfa yeniden yüklendi (çökme ya da Wix ATS; ayırt edilemez) · {"nt":"reload","path":"/","phase":"nav","exp":"link","gapMs":2313}

## Olay günlüğü (son 60)
- 21:26:24 preflight / doc:8teya ""
- 21:26:24 start / doc:8teya ""
- 21:26:42 issue /reklam-yonetimi doc:g06kf {"nt":"reload","path":"/reklam-yonetimi","phase":"page","exp":"link","gapMs":3976}
- 21:27:30 issue /sosyal-medya doc:eauc3 {"nt":"navigate","path":"/sosyal-medya","phase":"back","exp":"back","gapMs":2972}
- 21:28:28 ok / doc:vylfr 1
- 21:28:31 issue /yapay-zeka doc:t2rrb {"nt":"navigate","path":"/yapay-zeka","phase":"home","exp":"fresh-home","gapMs":2545}
- 21:28:58 ok / doc:2ez2e 2
- 21:29:11 issue / doc:l84sp {"nt":"reload","path":"/","phase":"nav","exp":"link","gapMs":2313}
- 21:29:15 done / doc:y4mc9 ""

## Ham veri — denemeler (CSV, attemptId başına bir satır)
attemptId,stepId,attempt,block,v,p,sc,r,cls,msg,homeNt,pageNt,backNt,atsReload,earlyBeforeRunner,ebFired,ebAtMs,ebReadyState,navStartDelay,ttfb,dcl,load,ceReady,loaderGone,videoOk,heroSrc,heroWxH,heroState,heroRs,heroNs,heroAdv,homePlaying,homeVideos,pagePlaying,pageVideos,pagePlayingEnd,mevPlaying,mevWaiting,mevStalled,mevError,scrollSteps,scrollMs,homeBackPlaying,errs,tStart,tEnd
0.1,0,1,0,B,/reklam-yonetimi,n,1,crash,hizmet sayfası etkinken yeniden yüklendi,navigate,navigate,,0,0,,,,45,,,,,,1,ronin-m5-film-2x.mp4,1120x1504,playing,4,1,1,1,5,,,,,,,,,,,0,2026-11-27T21:26:24.477Z,2026-11-27T21:26:42.034Z
1.1,1,1,0,RP,/reklam-yonetimi,n,1,wronghist,"geri, ana sayfa yerine /sosyal-medya (navigate)",navigate,navigate,,0,0,,,,57,,1289,1772,2678,6167,1,poster-only,0x0,error,0,3,0,0,5,0,3,0,31,32,0,0,72,23119,,0,2026-11-27T21:26:45.636Z,2026-11-27T21:27:30.497Z
1.2,1,2,0,RP,/reklam-yonetimi,n,1,ok,,navigate,navigate,reload,1,0,,,,45,,1511,1976,3096,6822,1,poster-only,0x0,error,0,3,0,0,5,0,3,0,35,35,0,0,72,22997,0,0,2026-11-27T21:27:34.012Z,2026-11-27T21:28:28.058Z
2.1,2,1,1,RP,/reklam-yonetimi,e1000,1,unexpected,ana sayfa etkinken beklenmeyen gezinme (navigate → /yapay-zeka),navigate,,,0,0,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0,2026-11-27T21:28:28.059Z,2026-11-27T21:28:31.806Z
2.2,2,2,1,RP,/reklam-yonetimi,e1000,1,ok,,navigate,navigate,reload,1,0,1,1005,interactive,54,,,,,,1,poster-only,0x0,error,0,3,0,0,5,,,,,,,,,,0,,2026-11-27T21:28:36.934Z,2026-11-27T21:28:58.019Z
3.1,3,1,1,B,/reklam-yonetimi,e1000,1,ambiguous,geçiş sırasında ana sayfa yeniden yüklendi (çökme ya da Wix ATS; ayırt edilemez),navigate,,,0,0,,,,,,,,,,1,ronin-m5-film-2x.mp4,1120x1504,playing,4,1,1,1,5,,,,,,,,,,,0,2026-11-27T21:28:58.020Z,2026-11-27T21:29:11.245Z