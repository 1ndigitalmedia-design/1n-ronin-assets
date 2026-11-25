# DATA_VALIDATION — Marka verisi doğrulama raporu

Kaynak: `Marka_Listesi_Temiz_Guncel.xlsx`, sayfa "Marka Listesi" (tek ve kesin kaynak). Karşılaştırma: sayfa "Sektör Özeti".

## Sonuç

| Kontrol | Sonuç |
|---|---|
| Excel'deki kayıt sayısı | 112 |
| Sayfada görünen kayıt (öne çıkan + sektörel) | 112 (Playwright ile DOM'dan okundu; eksik 0, fazla 0, yinelenen 0) |
| Öne çıkan ("Öncelikli – ulusal / uluslararası") | 22 kayıt; Sıra No 1–22, Excel sırası birebir |
| Sektörel liste | 90 kayıt, 18 sektör grubunda |
| Farklı sektör (tüm liste) | 20 — Hero'daki "FARKLI SEKTÖR" bu sayıdır |
| Sıra No | 1–112 kesintisiz |
| Sektör Özeti ile karşılaştırma | 20 sektörün tamamında Toplam / Öncelikli / Sektörel sayıları birebir aynı. (Özet sayfasındaki TOPLAM satırı formül olduğu için hesaplanmış değer dosyada yoktu; toplamlar listeden yeniden hesaplandı: 112 / 22 / 90.) |
| Marka adları | Excel'deki yazımla birebir; yalnızca hücre başı/sonu boşlukları temizlendi. Türkçe karakterler korundu (testte Türkçe karakterli bütün adlar sayfada bulundu). |
| Sektör adları | Excel'den birebir; yeniden adlandırma, birleştirme veya bölme yapılmadı ("Bahçe ve Dış Mekan Mobilyaları" ve "Bar Kafe Restoran" gibi büyük harf farkları da korundu). |
| Sayılar | Toplam, öne çıkan ve sektör sayıları sayfada veri dosyasından hesaplanır; kodda sabit sayı yoktur. |

## Excel'de olduğu gibi bırakılan yazımlar (karar sizin)

Brief gereği marka adları düzeltilmedi. Aşağıdakiler yazım hatası olabilir; düzeltilecekse Excel'de düzeltip `build_data.py` ile veri dosyasını yeniden üretin:

- Sıra 20: "Oyak Enerji Fsstivali" (Festivali?)
- Sıra 34: "4x4 Oto Ekpertiz" (Ekspertiz?)
- Sıra 62: "Casual Cauture" (Couture?)
- Sıra 111: "Makfry Fast Food Solitions" (Solutions?)

## Sektör dağılımı

| Sektör | Öne çıkan | Sektörel | Toplam |
|---|---|---|---|
| Havacılık ve ulaşım | 1 | 0 | 1 |
| Otomotiv ve ekspertiz | 4 | 1 | 5 |
| Akaryakıt ve enerji | 5 | 1 | 6 |
| Perakende, moda ve spor giyim | 3 | 2 | 5 |
| Endüstri, üretim ve teknoloji | 2 | 11 | 13 |
| Finans ve ödeme sistemleri | 1 | 0 | 1 |
| Gıda, içecek ve tarım | 1 | 7 | 8 |
| Spor, fitness ve etkinlik | 3 | 4 | 7 |
| Sağlık ve medikal | 1 | 1 | 2 |
| Kuyumculuk ve mücevher | 1 | 26 | 27 |
| İnşaat ve gayrimenkul | 0 | 10 | 10 |
| Bahçe ve Dış Mekan Mobilyaları | 0 | 1 | 1 |
| Turizm, konaklama ve yeme-içme | 0 | 3 | 3 |
| Eğitim | 0 | 3 | 3 |
| Bar Kafe Restoran | 0 | 5 | 5 |
| Sanat, müzik ve kişisel markalar | 0 | 6 | 6 |
| Mobilya ve ev yaşamı | 0 | 5 | 5 |
| Çiçekçilik | 0 | 1 | 1 |
| Hukuk | 0 | 1 | 1 |
| Endüstriyel mutfak ekipmanları | 0 | 2 | 2 |

"Havacılık ve ulaşım" ve "Finans ve ödeme sistemleri" sektörlerindeki kayıtların tamamı öne çıkan grupta olduğundan, sektörel bölümde ve sektör filtresinde yer almazlar (18 sektör). Bu kayıtlar aramada "Öne çıkan markalarda" grubunda bulunur.

## Eksik logo dosyaları

Proje arşivinde (GitHub `1n-ronin-assets` deposu ve onaylı site modülleri) listedeki markalara ait doğrulanmış logo dosyası bulunamadı. Depoda yalnızca iş ortaklığı/sertifika görselleri (Google, Meta, TikTok, Wix) ve `eco/` klasöründe listede olmayan 4 görsel var. Ana sayfadaki marka modülü de logo kullanmıyor. Bu nedenle **112 kaydın tamamında `logo` alanı boş**; adlar tipografik olarak gösterilir. Sahte veya yeniden çizilmiş logo üretilmedi.

Logo eklemek için: dosyayı (SVG, WebP veya PNG; kullanım izni doğrulanmış) depoya yükleyin ve ilgili kaydın `logo` alanına commit'e sabit adresini yazın. İsteğe bağlı: `logoAlt` (alternatif metin), `logoMono: true` (tek renk gösterim). Öne çıkan bölümde logo, adın yerine görünür; ad ekran okuyucu ve arama motorları için metin olarak kalır.

Logo dosyası olmayan kayıtlar (112):

1. Türk Hava Yolları
2. Mercedes Ticari
3. Petrol Ofisi
4. Total
5. Opel Grandland X Trailer
6. Peugeot 3008 Trailer
7. Boyner Hopi
8. Reebok Etkinlik Aftermovie
9. Schneider Electric
10. Renault MAİS İzmir
11. İyzico
12. Aytemiz
13. Moil
14. Pürsu
15. Jolly Tur Whitefest
16. Coloplast
17. Cetaş Jewellery
18. On Türkiye
19. Total A Milli Basket Takımı
20. Oyak Enerji Fsstivali
21. Tolkar
22. UPS World Run
23. Seykoç Alüminyum
24. AlfaPack
25. Dore Kimya
26. Escubedo
27. Hepteknik Makina
28. İz Granit
29. Kral Far
30. Norm Teknik
31. Teknomak
32. Volkan Crafted Technology
33. Uplass İstanbul
34. 4x4 Oto Ekpertiz
35. Load Enerji
36. Abidin Kuyumculuk
37. Aktip Kuyumculuk
38. Altın Asya Kuyumculuk
39. Altınzel Kuyumculuk
40. Balım Jewellery
41. Batuhan Kuyumculuk
42. Diamond Lumiere
43. E Goldia Jewellery
44. Fırat Kuyumculuk
45. Hilal Gold
46. Innuendo Jewellery
47. İlhan Kuyumculuk
48. İlkay Kuyumculuk
49. İstinye Kuyumculuk
50. Kadir Yıldız Kuyumculuk
51. Kaptan Kuyumculuk
52. Kayalar Kuyumculuk
53. Kurtuluş Kuyumculuk
54. Louvre Kuyumculuk
55. Tiftikçioğlu Kuyumculuk
56. Volkan Kuyumculuk
57. Çarşı Atölye
58. Çelebi Kuyumculuk
59. Özyurt Kuyumculuk
60. Semih Haşhaş
61. Avenuca
62. Casual Cauture
63. Natural Shop Budva - Montenegro
64. Altay Besi Çiftliği
65. Ege Doğuş Gıda
66. Kairos Food
67. Otherland Juice
68. Sultan Sera - Jeotermal Seracılık
69. Türkeri Gıda
70. Velibaba Spice
71. Avcılar İnşaat
72. Avcılar Lusso
73. Batıhome İnşaat
74. Dörtler Yapı
75. Kent Prestij
76. Layda Gayrimenkul
77. Liman Alaçatı
78. Livin İzmir
79. Mehmet Ceylan Yapı İnşaat
80. Önder Çelik
81. Ceka Garden
82. Lotus Alaçatı Konakları
83. Suess Alaçatı
84. Sığacık Marina
85. Nora İşitme
86. Ege Eğitim Vakfı Okulları
87. Elçin Tün Eğitim Kurumları
88. Eraslan Okulları
89. Focus Max
90. Kuşadası Tango Festivali
91. Monkey Jungle Oyun Parkı
92. Olympia
93. Minimal Bar
94. The Stay Rituals Alaçatı
95. BEEGEEJ
96. Jack Lifes Here
97. Ella Çikolata
98. Bora Duran
99. Ecem Çelik
100. Elçin Yavuz Coğuplugil
101. Esra Yıldırım
102. Sami Aksu
103. Deniz Yeşil Mavi
104. Bedbox
105. İpek Mobilya - Bölge Ege Batı
106. Mondi Mobilya - Bölge Seferihisar
107. Tino Furniture
108. Vivense - Bölge İzmir Şirinyer
109. Beyaz Çiçeklilik
110. Yemci Koç Hukuk
111. Makfry Fast Food Solitions
112. Şef Endüstriyel Mutfak

## Proje bağlantıları

Doğrulanmış proje sayfası olmadığından 112 kaydın tamamında `projectUrl` boş; sayfada hiçbir marka bağlantı değildir. Alan doldurulursa ad, o adrese giden bir bağlantıya dönüşür.