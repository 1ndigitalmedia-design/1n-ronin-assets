# Sosyal Medya V2.6 — Büyük Arka Plan Videosu Düzeltmesi

## Kullanıcının düzeltmesi

Sosyal Medya (`/sosyal-medya`) sayfasının **İçerik Harekete Geçtiğinde** bölümünde değiştirilmesi gereken medya, sağ alttaki küçük Glitch portresi değil, **arkadaki büyük yatay videodur**.

- **Büyük arka plan videosu:** `https://video.wixstatic.com/video/6dbf5e_4892baa5590541faae6c24693b7fb00c/1080p/mp4/file.mp4`
- **Küçük Glitch portresi:** V2.4 sürümündeki eski **sabit görsele** geri döndürüldü, video değildir.
- Yeni video yalnızca tam **1080p** URL ile yüklenir; 720p/480p türetilmez.
- Büyük video kapsayıcısı, oranları, GSAP, kontroller, diğer medya ve Header/Footer korunur.
- Bu sürüm, V2.5'in yanlış küçük-video revizyonunu geri almak amacıyla doğrulanmış V2.4 kaynak dosyası üzerinden hazırlanmıştır.

## Korunanlar
- Hero videosu, stratejinin 480p videosu ve dört görseli, final CTA 1080p videosu
- Header/Footer, menüler, floating controls, GSAP ve `#A8CF62`.

## Wix Studio
- **Sayfa:** `/sosyal-medya`
- **Tag Name:** `n1-sosyal-medya-v26`
- **Server URL:** `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@dcd9b7fa00cb0833ea8c26f73662444fabfbb402/wix-sosyal-medya-v26/n1-sosyal-medya-v26.js`

1. Wix Studio'da `/sosyal-medya` sayfasındaki mevcut Custom Element'i seç.
2. **Choose Source → Server URL** alanına yeni URL'yi gir.
3. **Tag Name** alanını `n1-sosyal-medya-v26` yap.
4. V2.5 ve V2.6 elementlerini aynı sayfada bırakma.
5. Masaüstü/tablet/mobilde büyük 1080p video ve öndeki sabit görselin konumunu test et; ardından **Publish** yap.

## Kontrol
- JavaScript sözdizimi başarılı.
- Commit'ten kaynak tekrar okunarak büyük arka planın V_MOTION ile yeni 1080p kaynağa bağlı olduğu ve küçük öğenin `pic(IM.glitch, 'sm-glitch__img')` olduğu doğrulandı.
- Gerçek Wix Studio oynatma/görünüm testi yapılmadı.
- GitHub kaynak dosyası değişikliği, Wix Studio Custom Element'i kendiliğinden güncellemez. Wix editöründe kaynak URL güncellenip Publish yapılana kadar canlı site eski sürümdedir.
