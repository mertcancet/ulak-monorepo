# CleonAI Icerik Ozeti

Bu dokuman teknik implementasyon detaylarini degil, urunde su an hangi iceriklerin ve yeteneklerin bulundugunu ozetler.
Amac, urunu ilk kez inceleyen birinin "hangi bolum ne icin var" sorusuna hizli yanit vermektir.

## Frontend Icerikleri

### Giris ve Kullanici Ekranlari

Kullanici yolculugu burada baslar. Hesaba erisim, temel yonlendirme ve uygulamaya gecis bu katmanda toplanir.

- Giris yapma ve kayit olma akislari: kullanicinin guvenli sekilde sisteme dahil olmasini saglar.
- Dashboard tabanli ana uygulama deneyimi: tum ozelliklere tek bir merkezden erisim verir.

### Dashboard Ana Deneyimi

Bu alan, urunun gunluk kullanim omurgasidir. Ajanlarin yonetimi ve konusma akislarinin tasarimi burada yapilir.

- Ajanlari listeleme, arama ve yonetme: ekipteki tum aktif ajanlari gorup hizli aksiyon alma imkani verir.
- Ajan detaylarini duzenleme: ajan adi, amaci ve davranis cercevesi gibi temel bilgileri guncellemeyi saglar.
- Agent Flow Builder ile gorusel akis tasarlama: konusma adimlarini gorsel olarak kurgulayip optimize etmeye yardimci olur.

### Knowledge Base Deneyimi

Bu bolum, ajanin bilgi kaynagini olusturur. Ajanin verdigi yanitlarin daha tutarli ve baglama uygun olmasi burada desteklenir.

- Isletme (business) bazli bilgi tabani yonetimi: farkli markalar veya is birimleri icin ayri bilgi alanlari tanimlamayi kolaylastirir.
- Knowledge base olusturma, secme, guncelleme, silme: bilgi setlerini yasam dongusu boyunca yonetmeyi saglar.
- Kaynak ekleme: metin, website, dosya: farkli icerik tiplerini tek bilgi yapisi altinda toplar.
- Kaynaklari listeleme, duzenleme ve silme: icerigin guncel, dogru ve temiz kalmasina yardimci olur.

### Araclar (Tools) Deneyimi

Tools alani, ajanin sadece konusmakla kalmayip aksiyon alabilmesini hedefler. Burada ajanin kullanacagi operasyonel yetenekler tanimlanir.

- Tool listesi ve tool yonetimi: mevcut araclari tek yerde gorup duzenli yonetmeyi saglar.
- Yeni tool olusturma: ajanin ihtiyacina gore yeni eylem kabiliyetleri eklemeyi mumkun kilir.
- HTTP tool olusturma/duzenleme: dis servislerle entegre calisma senaryolarini destekler.
- End Call tool olusturma/duzenleme: gorusmenin uygun noktada kontrollu bicimde sonlandirilmasini saglar.
- Tool detaylarini guncelleme: degisen is kurallarina gore arac davranislarini hizla yeniler.

### Cagri ve Operasyon Ekranlari

Operasyon ekipleri icin en kritik gunluk takip alani burasidir. Cagri hareketi, numara performansi ve toplu arama surecleri izlenir.

- Numbers ekrani ve numara detay gorunumu: sahip olunan numaralarin durumunu ve kullanim profilini gormeyi saglar.
- Bulk Calls akislari ve bulk call tasarim ekrani: toplu cagri operasyonlarini planli ve olceklenebilir sekilde yonetmeye yardimci olur.
- Call History listesi: gecmis gorusmeleri tek bakista izlemeyi saglar.
- Call History detay sayfasi: tekil cagri seviyesinde daha derin analiz yapma imkani verir.

### Izleme ve Is Tarafi Ekranlari

Bu ekranlar, urunun sadece teknik degil is etkisini de takip etmeye odaklanir. Performans, kalite, ekip ve maliyet boyutlari birlikte gorulur.

- Analytics gorunumu: temel metrikleri ve trendleri izleyerek karar surecini guclendirir.
- AI QA (AI Kalite Guvencesi) gorunumu: ajan yanit kalitesini ve iyilestirme alanlarini takip etmeyi kolaylastirir.
- Billing (faturalama/kullanim) gorunumu: maliyet, paket ve kullanim farkindaligini artirir.
- Members (ekip uyeleri) ekrani: ekip erisimini ve birlikte calisma yapisini yonetmeye yardimci olur.
- Settings (uygulama ayarlari, bildirimler, API anahtari alani vb.): urunun kurum ihtiyacina gore kisilestirilmesini saglar.

## Backend Icerikleri

Backend katmani, frontendde gorulen tum deneyimin arkasindaki is kurallarini ve veri akisini yonetir.

### Kimlik ve Oturum

Kimin sisteme erisebilecegi ve erisen kullanicinin oturum durumunun dogru sekilde yonetilmesi bu bolumun amacidir.

- Auth entegrasyonu ve oturum dogrulama: kullanicinin kimligini dogrulayip guvenli erisim saglar.
- Korumali endpoint mantigi (yetkili kullanici erisimi): sadece izinli kullanicilarin ilgili islemleri yapabilmesini garanti eder.

### Workspace ve Yetki Altyapisi

Verilerin dogru ekip veya musteride izole kalmasi ve erisim sinirlarinin korunmasi bu katmanda ele alinir.

- Workspace olusturma: ekip veya organizasyon bazli calisma alanlari tanimlamayi saglar.
- Workspace baglaminda erisim kontrolu: kullanicinin sadece yetkili oldugu alanda islem yapmasini temin eder.

### Agent Yonetimi

Agent tarafi, urunun merkezindeki AI varliklarinin yasam dongusunu yoneten ana backend icerigidir.

- Agent listeleme: mevcut ajan havuzunu siralama ve goruntuleme imkani verir.
- Agent olusturma: yeni gorevler veya senaryolar icin hizli ajan devreye alma surecini destekler.
- Agent detay getirme: tek bir ajanin tum temel bilgilerine erisim saglar.
- Agent guncelleme: ajan davranisini degisen ihtiyaca gore surekli iyilestirme imkani verir.
- Agent silme: artik kullanilmayan ajanlari sistemden temiz tutmaya yardimci olur.
- Agente tool baglama: ajanin kullanabilecegi eylem yeteneklerini merkezi sekilde tanimlar.
- Agent bootstrap akisi (ozel dogrulama ile baslatma verisi): calisma aninda gerekli baslangic baglamini guvenli sekilde saglar.

### Tool Yonetimi

Tool backendi, ajanlarin eylem kapasitesini merkezi bir katalog gibi yonetir.

- Tool listeleme: kullanilan ve kullanima hazir araclari goruntuler.
- Tool olusturma: yeni entegrasyon veya aksiyon senaryolari eklemeyi saglar.
- Tool detay getirme: araclarin ayarlarini ve tanimlarini incelemeye imkan verir.
- Tool guncelleme: mevcut araclarin degisen sureclere uyarlanmasini kolaylastirir.
- Tool silme: gereksiz veya eski araclari kaldirarak yapiyi sade tutar.

### Knowledge Base Yonetimi

Bilgi tabani backendi, ajanin dogru icerikle beslenmesini ve bu icerigin surdurulebilir sekilde yonetilmesini saglar.

- Isletme (business) CRUD islemleri: bilgi yapisini organizasyon seviyesinde duzenler.
- Business'e bagli knowledge base CRUD islemleri: her isletme icin ayri bilgi alanlari olusturur ve yonetir.
- Knowledge base source CRUD islemleri: bilgi kaynaklarini surekli guncel tutmaya imkan tanir.
- Source tipleri: file, text, website: farkli kaynaklardan gelen bilgiyi ayni sistemde birlestirir.

## Urun Olarak Toplam Deger

- Ajan olusturma, egitme ve operasyonel olarak kullanma: fikirden canli operasyona giden sureci tek platformda toplar.
- Bilgi tabaniyla ajan bilgisini besleme: yanit kalitesini isinizin gercek icerigiyle guclendirir.
- Tool mantigiyla ajanin eylem yetenegini artirma: ajani sadece konusan degil is yapan bir yapıya donusturur.
- Cagri operasyonlarini izleme (numbers, history, bulk): gunluk operasyonu olcebilir ve yonetilebilir hale getirir.
- Kalite, analiz ve faturalama tarafini tek panelden takip etme: urunun teknik ve ticari etkisini birlikte gormeyi saglar.
