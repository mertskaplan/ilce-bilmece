# İlçe Bilmece

Türkiye'deki ilçelerin hangi ile bağlı olduğunu tahmin ettiğin bir coğrafya bilgi yarışması.

**Oyna:** https://lab.mertskaplan.com/ilce-bilmece/

![İlçe Bilmece ekran görüntüsü](logo/screenshot-mockup-web.jpg)

## Özellikler

- **81 il, 922 ilçe:** Merkez ilçeler hariç tüm ilçeler soru havuzunda.
- **Dört oyun modu:**
  - **Klasik Mod:** 3 can hakkı, serbest tempo. Yanlış cevaplarda ilçe ve il hakkında bilgi notu gösterilir.
  - **Zamana Karşı:** 60 saniyede bilebildiğin kadar ilçe; sorular otomatik geçer.
  - **Bölgesel Mod:** Seçtiğin coğrafi bölgenin ilçeleriyle çalışırsın. Yanlış şıklar da aynı bölgeden seçilir.
  - **Günün Bilmecesi:** Her gün herkese aynı 10 soru. Ayrıntılar aşağıda.
- **Jokerler:** %50 Eleme (1 hak), İpucu (3 hak: plaka, bölge, lezzet, ünlüler, coğrafya, komşu iller vb.) ve Pas Geç (1 hak).
- **Haritalar:** Cevaptan sonra Türkiye haritasında doğru il yeşil, yanlış seçilen il kırmızı gösterilir. İlin ilçe haritasında sorulan ilçe vurgulanır.
  - Geniş ekranda haritalar oyun alanının sağında, dar ekranda bilgi notunun altında yer alır.
  - Zamana Karşı modunda haritalar gösterilmez.
- **Rekorlar:** Her mod için ayrı rekor tutulur; Bölgesel Mod'da ayrıca her bölge için. Günün Bilmecesi'nde rekor yerine seri ve skor dağılımı tutulur.
- **Yarım kalan oyun:** Sayfa kapansa bile oyun 24 saat boyunca kaldığı yerden sürdürülebilir.
- **Klavye ile oynanış:** Tüm oyun klavyeyle oynanabilir (aşağıdaki tabloya bakın).
- **Çevrimdışı çalışma (PWA):** Uygulama olarak yüklenebilir. İlk ziyaretten sonra ilçe haritaları dahil tüm içerik internetsiz çalışır.
- **Erişilebilirlik:** Karanlık ve aydınlık tema, ses ve hareket efektlerini kapatma, ekran okuyucu etiketleri, belirgin odak göstergesi.

## Günün Bilmecesi

Her gün Türkiye saatiyle 00.00'da yeni bir bulmaca açılır. İlk bulmaca (#1) 19 Ekim 2026 tarihlidir.

- **Kurallar:** 10 soru, can yok; tüm sorular cevaplanır. Yalnızca İpucu jokeri kullanılabilir (3 hak). Bulmaca günde bir kez oynanır, yarıda bırakılırsa kaldığı yerden sürer.
- **Sonuç ve istatistikler:** Skor, süre, oynanan gün sayısı, başarı oranı, güncel ve en uzun seri, 0–10 skor dağılımı ve sonraki bulmacaya geri sayım. Seri, art arda oynanan günleri sayar.
- **Paylaşım:** Sonuç, cevabı ele vermeden Wordle tarzı paylaşılır. Mobilde telefonun paylaşım menüsü açılır, bilgisayarda metin panoya kopyalanır:

  ```
  İlçe Bilmece #1 · 8/10
  🟩🟩🟥🟨🟩
  🟩🟥🟩🟩🟩
  ⏱ 1:42 · 🔥 5 günlük seri
  https://lab.mertskaplan.com/ilce-bilmece/?mod=gunluk
  ```

  🟩 doğru, 🟨 ipucuyla doğru, 🟥 yanlış. Bağlantıdaki `?mod=gunluk` oyunu doğrudan Günün Bilmecesi'nde açar.
- **Görsel paylaşım:** Sonuç, oyuncunun seçtiği temada (aydınlık/karanlık) 1080×1080 bir görsel olarak da paylaşılabilir. Görselde skor, skora göre bir unvan, kareler, süre, seri ve oyunun adresi yer alır; il ve ilçe adları yer almaz. Görsel tarayıcıda Canvas ile üretilir. Destekleyen cihazlarda (Android, iPhone) paylaşım menüsüyle Instagram, WhatsApp gibi uygulamalara gönderilir; desteklemeyenlerde PNG olarak indirilir.

### Bulmacalar nasıl üretilir?

Sunucu kullanılmaz; sorular ve şıklar, bulmaca numarasıyla tohumlanan bir rastgele sayı üreteciyle (mulberry32) tarayıcıda üretilir. Bu yüzden aynı gün herkes aynı soruları ve aynı şıkları görür.

- 922 ilçe her "tur" için sabit bir tohumla karıştırılır ve her gün sıradaki 10 ilçe sorulur. Bir tur 92 gün sürer ve tur boyunca hiçbir ilçe tekrar sorulmaz.
- Art arda iki günde ortak ilçe çıkmaz; aynı adlı ilçesi olan iller (ör. Gölbaşı: Adıyaman ve Ankara) yanlış şık olarak gelmez.
- Üretim süresizdir. 19.10.2026 ile 19.10.2031 arasındaki 1827 bulmacanın hepsi bu kurallara göre doğrulanmıştır.
- Sıralama veri setindeki dizilişten bağımsızdır. Ancak `datasets.js` dosyasına ilçe eklemek veya çıkarmak sonraki bulmacaları değiştirir.

## Klavye kısayolları

Oyunda başlıktaki ⌨ butonu ya da `?` tuşu bu listeyi açar.

| Tuş | İşlev |
| --- | --- |
| `1` – `4` | Şık seç |
| `Q` / `W` / `E` | %50 Eleme / İpucu / Pas Geç jokeri |
| `Enter` / `Space` | Oyuna başla, sonraki soru, tekrar oyna |
| `M` | Oyun modu seçimini aç / kapat |
| `1` – `4` / `1` – `8` | Mod penceresinde mod, bölge penceresinde bölge seç |
| `Tab` / `Shift` + `Tab` | Butonlar arasında gezin |
| `Esc` | Açık pencereyi kapat |
| `?` | Kısayollar penceresini aç / kapat |

## Yerelde çalıştırma

Proje derleme adımı veya bağımlılık gerektirmez; düz HTML, CSS ve JavaScript'ten oluşur.

- **En hızlı yol:** `index.html` dosyasını tarayıcıda açın. Oyun ve haritalar `file://` üzerinden de çalışır.
- **Service worker ve çevrimdışı mod için** sayfanın bir sunucu üzerinden açılması gerekir:

  ```bash
  python3 -m http.server 8000
  ```

  Ardından http://localhost:8000 adresini açın.

## Proje yapısı

```
index.html             Sayfa yapısı ve pencereler (modallar)
styles.css             Tüm stiller (tema, yerleşim, haritalar)
scripts.js             Oyun mantığı, Günün Bilmecesi, jokerler, klavye kısayolları, haritalar
datasets.js            İl ve ilçe verileri, bilgi notları, ipuçları
sw.js                  Service worker (önbellek ve çevrimdışı çalışma)
manifest.webmanifest   PWA bildirimi
maps/iller.js          Türkiye iller haritası
maps/ilceler/NN.js     İlçe haritaları (NN = plaka kodu, ör. 06.js)
logo/                  İkonlar, kapak ve ekran görüntüleri
```

### Veri

`datasets.js` üç yapı içerir:

- `ilceler`: Her il ve ilçe listesi.
- `ilEkstraBilgiler`: İl başına plaka, bölge, lezzet, ünlüler, önemli yerler, coğrafya, ekonomi ve komşu iller.
- `ilceBilgileri`: İlçe başına kısa bilgi notu.

Haritalar il ve ilçelerle şöyle eşleşir:

- İller haritasında her il, `data-plaka` etiketi taşıyan bir `<path>` öğesidir. Eşleştirme plaka koduyla yapılır.
- İlçe haritalarında her ilçe, veri setindeki adıyla birebir aynı bir `data-ilce` etiketi taşır. Merkez ilçeler `data-merkez` ile işaretlidir.
- Harita dosyaları SVG'yi `window.ilceBilmeceMaps[anahtar]` olarak kaydeden küçük JS dosyalarıdır. `fetch` yerine `<script>` ile yüklendikleri için `file://` üzerinden de çalışırlar.

Veri setine ilçe eklerken veya bir ilçenin adını değiştirirken ilgili harita dosyasındaki `data-ilce` değerinin de güncellenmesi gerekir.

## Yayınlama

1. `sw.js` dosyasındaki `CACHE_NAME` sürümünü artırın (ör. `ilce-bilmece-v2.1.1` → `ilce-bilmece-v2.1.2`). Sürüm değişmezse kullanıcılar önbellekteki eski sürümü görmeye devam eder.
2. Tüm dosyaları `maps/` klasörü dahil sunucuya yükleyin.
3. Ziyaret sayacı kullanılıyorsa `sayac.js` dosyasını da sunucuya yükleyin. Bu dosya `.gitignore` ile depo dışında tutulur; `index.html` onu çağırır, dosya yoksa sayaç yüklenmez ve oyun etkilenmez.

## Lisans

Bu proje [GNU Genel Kamu Lisansı v3.0 (GPL-3.0)](LICENSE) ile lisanslanmıştır. Yazılımı bu lisansın koşulları altında kullanabilir, değiştirebilir ve dağıtabilirsiniz. Değiştirilmiş sürümlerin de aynı lisansla paylaşılması gerekir.

## Geliştirici

[Mert S. Kaplan](https://mertskaplan.com)

## Destek

İlçe Bilmece gibi özgür yazılım projelerinin altyapı ve sürdürülebilirlik maliyetleri bulunuyor. Benzer projelerin reklamsız ve herkesin erişimine açık şekilde geliştirilebilmesi için [Kreosus](https://kreosus.com/mertskaplan) üzerinden destek olabilirsiniz.
