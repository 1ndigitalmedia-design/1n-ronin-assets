# V4 kurulum

Header Teklif Al kaldırıldı. Footer %90 iç genişlik; ekran görüntüsüne uygun kolon, ikon ve logo boyutları. Wix dış bölüm ve embed genişliği %100, yatay padding 0 olmalı.

## Önerilen header: Custom Element
Wix Studio > Kod > Public > custom-elements altında n1-html-header-v4.js dosyasını oluşturup paketteki aynı adlı JS içeriğini yapıştırın. İletişim sayfasında eski HTML header yerine Custom Element ekleyin; Choose Source > Velo file > ilgili dosya; Tag Name n1-html-header-v4. Genişlik %100, yükseklik masaüstü 72 / mobil 64 px. Bu bileşen canlı DOM'da menüyü body içine sabit panel olarak yerleştirir. Editör/preview iframe nedeniyle kırpılabilir; canlı/test site doğrulaması gerekir. Eski header'ı silmeden önce yedek alın.

## HTML alternatifi
header.html ayrı iframe olarak kullanılırsa önce V3 Popup + Velo köprüsünü kurmak zorunludur. Popup adı 1N Global Menu, HTML ID n1HeaderHtml ve n1MenuHtml; WIX_SAYFA_KODU.js ve WIX_POPUP_KODU.js ilgili kodlara eklenir. menu-popup.html Popup içeriğidir. Alternatif header-iframe-menulu.html kendi iframe sınırlarında açılır, yüksek iframe gerekir; önerilmez.

## Footer
footer.html içeriğini değiştirin. Wix bölüm ve HTML öğesi %100 genişlik, ek padding/max-width yok; HTML kendi %5 kenarlarını oluşturur. Yüksekliği breakpoint başına içeriğe göre ayarlayın. İletişim içeriği ve Wix Forms değişmez. Gerçek Wix ortamı, uzak logo kaynakları ve iPhone henüz doğrulanmadı.
