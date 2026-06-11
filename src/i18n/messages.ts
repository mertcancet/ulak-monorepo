import type { Locale } from '@/i18n/config';

export const messages = {
  tr: {
    navbar: {
      features: 'Özellikler',
      solutions: 'Çözümler',
      analytics: 'Analitik',
      pricing: 'Demo',
      login: 'Giriş Yap',
      launchApp: 'Demo İste',
      switchLanguage: 'Dil Değiştir',
    },
    sidebar: {
      overview: 'Genel Bakış',
      agents: 'Yapay Zeka Ajanları',
      calls: 'Çağrılar',
      analytics: 'Analitik',
      settings: 'Ayarlar',
      brandSubtitle: 'Çağrı Merkezi Platformu',
      mainMenu: 'Ana Menü',
      systemStatus: 'Sistem Durumu',
      aiEngine: 'Yapay Zeka Motoru',
      online: 'Çevrimiçi',
      activeCalls: 'Aktif Çağrılar',
    },
    topbar: {
      searchPlaceholder: 'Çağrıları, ajanları ara...',
      newCall: 'Yeni Çağrı',
    },
    pageMeta: {
      dashboardTitle: 'Panel',
      dashboardDescription: 'Çağrı merkezi operasyonlarınızın genel görünümü',
      agentsTitle: 'Yapay Zeka Ajanları',
      agentsDescription: 'Yapay zeka ajanlarınızı yönetin ve izleyin',
      callsTitle: 'Çağrılar',
      callsDescription: 'Tüm çağrı kayıtlarını görüntüleyin ve yönetin',
      analyticsTitle: 'Analitik',
      analyticsDescription: 'Performans içgörüleri ve raporlar',
      settingsTitle: 'Ayarlar',
      settingsDescription: 'Platform ayarlarınızı yapılandırın',
      fallbackTitle: 'CleonAI',
    },
    demoPage: {
      badge: 'Canlı ürün demosu',
      backToHome: 'Ana sayfaya dön',
      title: 'Ekibine uygun yapay zeka çağrı akışını birlikte kuralım.',
      description:
        'Kısa bir demo görüşmesinde kullanım senaryonu, çağrı yoğunluğunu ve entegrasyon ihtiyaçlarını netleştirelim. Sana özel akışı canlı gösterelim.',
      highlights: {
        setup: {
          title: 'Dakikalar içinde senaryo tasarımı',
          description:
            'Inbound, outbound, randevu, satış ve destek akışlarını ürün uzmanıyla birlikte canlı kurgula.',
        },
        voice: {
          title: 'Gerçekçi ses deneyimi',
          description:
            'Doğal konuşma, aksiyon alma ve çağrı yönlendirme kalitesini gerçek örneklerle dinle.',
        },
        security: {
          title: 'Entegrasyon ve güvenlik kontrolü',
          description:
            'CRM, santral ve veri güvenliği gereksinimlerini ekiplerinle birlikte hızlıca doğrula.',
        },
      },
      metrics: {
        discovery: 'Keşif görüşmesi',
        discoveryValue: '15 dk',
        availability: 'Aktif otomasyon kapsaması',
        availabilityValue: '24/7',
        teams: 'Değerlendiren ekip',
        teamsValue: '500+',
      },
      form: {
        title: 'Demo talep formu',
        description:
          'Formu doldur, ekibimiz sana uygun bir zaman ve senaryo önerisiyle geri dönsün.',
        fields: {
          fullName: 'Ad soyad',
          company: 'Şirket adı',
          email: 'İş e-postası',
          phone: 'Telefon',
          callVolume: 'Aylık çağrı hacmi',
          useCase: 'Kullanım senaryon',
        },
        placeholders: {
          fullName: 'Örn. John Doe',
          company: 'Örn. Cleon Teknoloji',
          email: 'ornek@sirket.com',
          phone: '+90 5xx xxx xx xx',
          callVolume: 'Bir aralık seç',
          useCase:
            'Hangi ekip için kullanmak istiyorsun? Destek, satış, randevu, tahsilat veya özel akışları kısaca yaz.',
        },
        options: {
          callVolume: {
            low: '0 - 500 çağrı',
            mid: '500 - 5.000 çağrı',
            high: '5.000+ çağrı',
          },
        },
        disclaimer:
          'Gönderdiğin bilgiler sadece demo planlaması ve ürün uygunluğu değerlendirmesi için kullanılır.',
        submit: 'Demo iste',
        submitting: 'Gönderiliyor...',
      },
      compose: {
        title: 'Gmail taslağı açıldı',
        description:
          'Demo talebin Gmail taslağı olarak açıldı. Gönderimi buradan tamamlayabilirsin.',
        notice:
          'E-posta uygulaman otomatik olarak açılacak. Gmail açılamazsa taslak yeni sekmede hazırlanır.',
        reset: 'Formu temizle',
        submit: "Gmail'de aç",
      },
      email: {
        subjectPrefix: 'Yeni demo talebi',
        intro: 'Yeni demo talebi alındı.',
        labels: {
          fullName: 'Ad Soyad',
          company: 'Şirket',
          email: 'E-posta',
          phone: 'Telefon',
          callVolume: 'Çağrı Hacmi',
          useCase: 'Use Case',
        },
      },
      success: {
        title: 'Talebin alındı.',
        description:
          'Satış ekibimiz kısa süre içinde seninle iletişime geçip canlı demo için uygun zaman önerecek.',
        reset: 'Yeni talep oluştur',
      },
    },
    landing: {
      hero: {
        badge: 'Çağrı operasyonları için AI kontrol merkezi',
        description:
          'Agent oluştur, konuşma akışını görsel olarak tasarla, bilgi tabanını bağla ve çağrı performansını tek panelden yönet. CleonAI web uygulamasında geliştirdiğimiz tüm çekirdek modüller burada.',
        primaryButton: 'Canlı Demoyu Planla',
        secondaryButton: 'Modülleri İncele',
        highlights: {
          0: 'Dakikalar içinde canlıya çık',
          1: 'Gerçek operasyonlara uygun akışlar',
          2: 'Kalite ve maliyet takibi tek panelde',
        },
      },
      positioning: {
        badge: 'NEDEN CLEONAI',
        title: 'Demo vaatleri değil, operasyon gerçeği',
        description:
          'Rakiplerde sık görülen genel AI iddiaları yerine, CleonAI doğrudan sahada kullandığınız modüller ve ölçülebilir sonuçlar üzerine konumlanır.',
        legacy: {
          title: 'Geleneksel yaklaşımın sorunları',
          pains: {
            0: 'Sabit IVR menüleri karmaşık senaryolarda yetersiz kalır.',
            1: 'Dağınık araçlar ekip verimini düşürür ve görünürlüğü azaltır.',
            2: 'Test ve kalite döngüsü zayıf olduğu için üretimde hata oranı artar.',
          },
        },
        cleon: {
          title: 'CleonAI yaklaşımı',
          strengths: {
            0: 'Agent, Flow Builder, Knowledge Base ve Tools tek operasyon katmanında birleşir.',
            1: 'Call History, Analytics ve AI QA ile sürekli iyileştirme döngüsü kurulur.',
            2: 'Workspace + yetki yapısı ile ekip bazlı güvenli kullanım sağlanır.',
          },
        },
      },
      legacyProblem: {
        badge: 'SORUN',
        title: 'Eski nesil çağrı merkezleri sizi anlamıyor',
        quotes: {
          0: 'Bu konuda yardımcı olamam.',
          1: 'Görüşmeyi sonlandırmam gerekiyor.',
          2: 'Üzgünüm, anlamadım.',
          3: 'Tekrar eder misiniz?',
        },
        cards: {
          emotions: {
            title: 'Duygularınızı anlamıyor',
          },
          latency: {
            title: 'Yüksek gecikmeyle boğuşuyor',
          },
          conversation: {
            title: 'Gerçek konuşmaya hazır değil',
          },
        },
      },
      painPoints: {
        sectionTitle: 'Geleneksel müşteri hizmetleri modern talebi karşılayamıyor.',
        items: {
          ivr: {
            title: 'IVR sistemleri arık öldü',
            description:
              'Katı menü yapıları ve yavaş yönlendirme müşterileri sinir ediyor ve genel deneyimi zedeli yor.',
          },
          scale: {
            title: 'İnsan odaklı çağrı merkezleri ölçeklenemiyor',
            description:
              'Geleneksel çağrı merkezleri artan talebi karşılayamıyor; yoğun dönemlerde kalite eksiklikleri anında görünür hale geliyor.',
          },
          cost: {
            title: 'Yükselen operasyon maliyetleri',
            description:
              'İşgücü ve eğitim ciddi bir yük oluşturuyor; hacim büyüdükçe maliyetlerin kontrolü güleşiyor.',
          },
          ai: {
            title: 'Yüzeysel AI araçları üretimde tutunmuyor',
            description:
              'Hazır çözümler demoda çalışabilir; ancak gerçek entegrasyon ve kurumsal performans söz konusu olduğunda yetersiz kalıyor.',
          },
        },
      },
      socialProof: {
        lead: 'Tek platformda uçtan uca çağrı otomasyonu',
        items: {
          agents: 'Agent Yönetimi',
          flowBuilder: 'Flow Builder',
          knowledgeBase: 'Knowledge Base',
          callHistory: 'Çağrı Geçmişi',
          analytics: 'Analitik',
          numbers: 'Numara Yönetimi',
        },
      },
      features: {
        sectionTitle: 'Web Uygulamasındaki Temel Modüller',
        sectionDescription:
          'Landing artık genel vaatler yerine, üründe aktif olarak kullandığınız ekranları ve iş akışlarını anlatır.',
        items: {
          voiceAgent: {
            title: 'Agent Stüdyosu',
            description:
              'Temsilci oluştur, isimlendir, yapılandır ve test et. Tek bir listeden tüm agent yaşam döngüsünü yönet.',
          },
          transcription: {
            title: 'Görsel Flow Builder',
            description:
              'Node tabanlı canvas ile konuşma akışını tasarla, kaydet ve sürdür. Karmaşık senaryoları görsel olarak kur.',
          },
          sentiment: {
            title: 'Knowledge Base',
            description:
              'Metin, dosya ve web kaynaklarını ekleyerek ajanın bilgi katmanını oluştur; içerikleri tek yerden güncelle.',
          },
          routing: {
            title: 'Çağrı Geçmişi ve Analitik',
            description:
              'Durum, duygu, maliyet ve gecikme gibi metrikleri izle; tablo ve grafiklerle operasyonel kararları hızlandır.',
          },
        },
      },
      useCases: {
        sectionTitle: 'Aynı platform, farklı operasyon senaryoları',
        sectionDescription:
          'CleonAI platformu, çeşitli sektörlerde akıllı çağrı otomasyonu ve AI aracılı iş akışlarını destekler.',
        labels: {
          problem: 'Problem',
          solution: 'Çözüm',
          keyFeatures: 'Temel Özellikler',
        },
        items: {
          healthcare: {
            title: 'Sağlık Sektörü',
            problem:
              'Randevu yönetimi, hasta hatırlatmaları ve poliklinik yönlendirmesi manuel işlemlerle karışıklık yaratıyor.',
            solution:
              'Hastalar tek bir çağrıda randevu alabilir, otomatik hatırlatmalar alabilir ve sigorta durumlarına uygun poliklinikler yönlendirilir.',
            features: {
              0: 'No-show oranını düşüren otomatik hatırlatmalar',
              1: 'Poliklinik / doktor / sigorta bazlı yönlendirme',
            },
          },
          realEstate: {
            title: 'Gayrimenkul & Emlak',
            problem:
              'Emlak danışmanları çok sayıda müşteri sorgusuyla meşgul, potansiyel satış fırsatları kaçırılıyor.',
            solution:
              'AI ajanı müşteri sorularını yanıtlar, mülk önerileri sunar ve görüş saati planlaması yapar.',
            features: {
              0: '7/24 müşteri desteği ve ön niteliklandırma',
              1: 'Mülk bilgileri ve fiyat sorguları anlık yanıt',
            },
          },
          ecommerce: {
            title: 'E-Ticaret & Perakende',
            problem:
              'Müşteri hizmetleri, siparişleri takip etme ve iade işlemleriyle aşırı yüklenmiş.',
            solution:
              'AI sistem otomatik olarak sipariş statüsü sağlıyor, iade işlemleri yönetiyor ve ürün önerileri yapıyor.',
            features: {
              0: 'Siparişleri takip etme ve durum bildirimleri',
              1: 'İade ve değişim talepleri otomatik işleme',
            },
          },
          restaurant: {
            title: 'Restoran & Turizm',
            problem:
              'Restoran rezervasyonları ve müşteri soruları manuel olarak yönetiliyor, yoğun saatlarda çağrılar kaçırılıyor.',
            solution:
              'AI ajanı masa rezervasyonlarını yönetir, menü sorularını yanıtlar ve özel istekleri kaydeder.',
            features: {
              0: 'Otomasyon ile masa boş alanlarını değerlendirme',
              1: 'Menü, fiyatlar ve alerjiler hakkında bilgi',
            },
          },
          education: {
            title: 'Eğitim & Kurslar',
            problem:
              'Kurs müdürleri öğrenci kayıtları, program bilgileri ve danışmanlık için çok zaman harcıyor.',
            solution:
              'AI asistan öğrenci sorularını yanıtlar, program seçiminde rehberlik eder ve kayıt işlemlerini hızlandırır.',
            features: {
              0: 'Kurs programları ve müfredatı hakkında detaylı bilgi',
              1: 'Öğrenci seçimine uygun program tavsiyesi',
            },
          },
          banking: {
            title: 'Banka & Sigorta Firmaları',
            problem:
              'Müşteri hizmetleri, kredi başvuruları, sigorta teklifi ve hesap sorularıyla aşırı meşgul, başvuru işlemleri uzun sürüyor.',
            solution:
              'AI ajanı müşteri profili değerlendirir, uygun kredi/sigorta ürünleri önerir ve işlemleri hızlandırır.',
            features: {
              0: 'Kredi uygunluğu hızlı değerlendirmesi',
              1: 'Sigorta ürünleri analiz ve önerileri',
            },
          },
        },
      },
      ourApproach: {
        badge: 'SUNUM ADIMI',
        titleLine1: 'Hızlı başlat,',
        titleLine2: 'doğru ölçeklendir;',
        titleHighlight: 'CleonAI ile',
        description:
          'Ürün ekibimiz tüm süreç boyunca sizinle birlikte çalışır. Analiz, kurulum ve iyileştirme aşamalarında yanınızda oluruz.',
        stepLabel: 'ADIM',
        steps: {
          discover: {
            title: 'İhtiyacı ve senaryoları belirleriz',
            description:
              'Sizi dinler, operasyonunuzun nerede yavaşladığını anlar ve çağrı akışlarını buna uygun senaryolarla tasarlarız.',
            status: 'Niyet Anlaşıldı',
          },
          integrate: {
            title: 'Telefon ve veri altyapısına bağlarız',
            description:
              'Santral, PBX, CRM ya da gerekli servisleri aynı yapıda birleştirir; gelen ve giden aramaları hazır hale getiririz.',
            status: 'Takım',
          },
          personalize: {
            title: 'Kişiselleştirilmiş iletişimi devreye alırız',
            description:
              'CleonAI sadece cevap vermez; müşteriye uygun tonla konuşur, bilgi çeker, aksiyon yaratır ve gerektiğinde insana aktarır.',
            status: 'Aksiyon',
          },
          optimize: {
            title: 'Analizlerle süreci geliştiririz',
            description:
              'Her görüşme sonrası sonuç, kalite ve verimlilik verilerini ölçer; senaryoları ekip geri bildirimleriyle iyileştiririz.',
            status: 'Optimize',
          },
        },
        ctaTitle: 'Başarınız önceliğimiz',
        ctaDescription:
          'Her adımda destek, her aşamada iyileştirme. CleonAI, işletmenizin büyümesinin ortağıdır.',
        ctaButton: 'Süreci Başlatalım',
      },
      howItWorks: {
        sectionTitle: 'Üründe Akış Nasıl İlerliyor?',
        steps: {
          connect: {
            title: "1. Agent'ı oluştur",
            description:
              "Dashboard'dan yeni agent aç, temel ayarları gir ve test panelinde ilk konuşmayı hızlıca doğrula.",
          },
          automate: {
            title: '2. Akışı görsel olarak tasarla',
            description: "Flow Builder'da node'ları bağla, mantığı kurgula ve sürümünü kaydet.",
          },
          scale: {
            title: '3. Bilgiyi besle, performansı izle',
            description:
              'Knowledge Base kaynaklarını ekle; çağrı geçmişi ve analitik ekranlarından kaliteyi sürekli iyileştir.',
          },
        },
      },
      analyticsPreview: {
        titlePrefix: 'Operasyonu',
        titleHighlight: 'gerçek zamanlı',
        titleSuffix: 'takip edin',
        description:
          "Dashboard ve çağrı geçmişi ekranları; toplam çağrı, başarı oranı, maliyet, gecikme ve insan operatöre aktarım gibi kritik KPI'ları tek bakışta gösterir.",
        bullets: {
          sentimentHeatmaps: 'Çağrı durumu ve duygu kırılımı',
          conversionAlerts: 'Başarı oranı ve gecikme trendi',
          coachingMetrics: 'Tablo + grafik birleşik performans görünümü',
        },
        metrics: {
          totalCallsToday: 'Toplam Çağrı',
          sentimentScore: 'Başarı Oranı',
          sentimentStatus: 'İyileşiyor',
        },
      },
      cta: {
        titleLine1: "CleonAI dashboard'unu",
        titleLine2: 'ekibinle canlı deneyimle',
        description:
          'Agent, akış, knowledge base ve analitik modüllerini kendi senaryonla birlikte demo oturumunda görelim.',
        primaryButton: 'Demo Planla',
        secondaryButton: 'Kullanım Senaryonu Paylaş',
      },
      footer: {
        brandDescription:
          'CleonAI, ekiplerin agent tasarımı, bilgi yönetimi ve çağrı performansını tek panelde birleştirdiği operasyon platformudur.',
        sections: {
          product: 'Ürün',
          company: 'Şirket',
          resources: 'Kaynaklar',
          legal: 'Yasal',
        },
        links: {
          aiVoice: 'Agent Yönetimi',
          integrations: 'Flow Builder',
          dashboard: 'Dashboard',
          security: 'Knowledge Base',
          about: 'Hakkımızda',
          blog: 'Blog',
          careers: 'Kariyer',
          contact: 'İletişim',
          documentation: 'Dokümantasyon',
          apiReference: 'API Referansı',
          community: 'Topluluk',
          support: 'Destek',
          privacy: 'Gizlilik',
          terms: 'Koşullar',
          gdpr: 'KVKK/GDPR',
        },
        copyright: '© 2024 Cleon AI. Tüm hakları saklıdır.',
      },
    },
  },
  en: {
    navbar: {
      features: 'Features',
      solutions: 'Solutions',
      analytics: 'Analytics',
      pricing: 'Demo',
      login: 'Login',
      launchApp: 'Request Demo',
      switchLanguage: 'Switch Language',
    },
    sidebar: {
      overview: 'Overview',
      agents: 'AI Agents',
      calls: 'Calls',
      analytics: 'Analytics',
      settings: 'Settings',
      brandSubtitle: 'Call Center Platform',
      mainMenu: 'Main Menu',
      systemStatus: 'System Status',
      aiEngine: 'AI Engine',
      online: 'Online',
      activeCalls: 'Active Calls',
    },
    topbar: {
      searchPlaceholder: 'Search calls, agents...',
      newCall: 'New Call',
    },
    pageMeta: {
      dashboardTitle: 'Dashboard',
      dashboardDescription: 'Overview of your call center operations',
      agentsTitle: 'AI Agents',
      agentsDescription: 'Manage and monitor your AI agents',
      callsTitle: 'Calls',
      callsDescription: 'View and manage all call records',
      analyticsTitle: 'Analytics',
      analyticsDescription: 'Performance insights and reports',
      settingsTitle: 'Settings',
      settingsDescription: 'Configure your platform settings',
      fallbackTitle: 'CleonAI',
    },
    demoPage: {
      badge: 'Live product walkthrough',
      backToHome: 'Back to home',
      title: "Let's design the right AI calling flow for your team.",
      description:
        'In a short demo session, we will review your use case, call volume, and integration needs, then show the best-fit workflow live.',
      highlights: {
        setup: {
          title: 'Scenario design in minutes',
          description:
            'Map inbound, outbound, appointment, sales, and support flows with a product specialist in real time.',
        },
        voice: {
          title: 'Realistic voice experience',
          description:
            'Hear natural conversations, action handling, and smart routing quality with practical examples.',
        },
        security: {
          title: 'Integration and security review',
          description:
            'Validate CRM, telephony, and security requirements together with the right stakeholders.',
        },
      },
      metrics: {
        discovery: 'Discovery session',
        discoveryValue: '15 min',
        availability: 'Automation coverage',
        availabilityValue: '24/7',
        teams: 'Teams evaluating',
        teamsValue: '500+',
      },
      form: {
        title: 'Request a demo',
        description:
          'Fill out the form and our team will follow up with a recommended time slot and demo scenario.',
        fields: {
          fullName: 'Full name',
          company: 'Company name',
          email: 'Work email',
          phone: 'Phone',
          callVolume: 'Monthly call volume',
          useCase: 'Your use case',
        },
        placeholders: {
          fullName: 'e.g. John Doe',
          company: 'e.g. Cleon Technology',
          email: 'name@company.com',
          phone: '+90 5xx xxx xx xx',
          callVolume: 'Select a range',
          useCase:
            'What do you want to automate? Support, sales, scheduling, collections, or a custom voice workflow.',
        },
        options: {
          callVolume: {
            low: '0 - 500 calls',
            mid: '500 - 5,000 calls',
            high: '5,000+ calls',
          },
        },
        disclaimer:
          'We only use this information to plan your demo and assess product fit for your team.',
        submit: 'Request demo',
        submitting: 'Submitting...',
      },
      compose: {
        title: 'Gmail draft opened',
        description:
          'Your demo request was opened as a Gmail draft. You can finish sending it from here.',
        notice:
          'Your email app will open automatically. If Gmail cannot open, the draft will be prepared in a new tab.',
        reset: 'Clear form',
        submit: 'Open in Gmail',
      },
      email: {
        subjectPrefix: 'New demo request',
        intro: 'A new demo request has been received.',
        labels: {
          fullName: 'Full name',
          company: 'Company',
          email: 'Email',
          phone: 'Phone',
          callVolume: 'Call volume',
          useCase: 'Use case',
        },
      },
      success: {
        title: 'Your request has been received.',
        description:
          'Our sales team will contact you shortly to suggest a time for your live demo.',
        reset: 'Create another request',
      },
    },
    landing: {
      hero: {
        badge: 'AI control center for call operations',
        description:
          'Create agents, design conversation flows visually, connect your knowledge base, and track call performance from a single dashboard. This landing now reflects the core modules already built in our CleonAI web app.',
        primaryButton: 'Schedule Live Demo',
        secondaryButton: 'Explore Modules',
        highlights: {
          0: 'Go live in minutes',
          1: 'Workflows built for real operations',
          2: 'Quality and cost visibility in one dashboard',
        },
      },
      positioning: {
        badge: 'WHY CLEONAI',
        title: 'Not demo promises, real operations',
        description:
          'Instead of broad AI claims, CleonAI is positioned around the modules you actively run in production and the outcomes you can measure.',
        legacy: {
          title: 'Limitations of legacy approach',
          pains: {
            0: 'Rigid IVR-style flows break on complex real-world scenarios.',
            1: 'Fragmented tools reduce team velocity and operational visibility.',
            2: 'Weak testing and QA loops increase production failure risk.',
          },
        },
        cleon: {
          title: 'CleonAI approach',
          strengths: {
            0: 'Agent, Flow Builder, Knowledge Base, and Tools operate in one control layer.',
            1: 'Call History, Analytics, and AI QA create a continuous optimization loop.',
            2: 'Workspace and permission architecture enables secure team-based operations.',
          },
        },
      },
      legacyProblem: {
        badge: 'THE PROBLEM',
        title: 'Legacy call centers don\u2019t understand you',
        quotes: {
          0: 'I can\u2019t help you with that.',
          1: 'I have to end the call now.',
          2: 'Sorry, I don\u2019t understand.',
          3: 'Could you repeat that?',
        },
        cards: {
          emotions: {
            title: 'Cascaded agents don\u2019t understand your emotions',
          },
          latency: {
            title: 'Cascaded agents suffer from high latency',
          },
          conversation: {
            title: 'Cascaded agents aren\u2019t built for conversations',
          },
        },
      },
      painPoints: {
        sectionTitle: 'Traditional customer operations cannot keep up with modern demand.',
        items: {
          ivr: {
            title: 'IVR systems are dead',
            description:
              'Rigid menu trees and slow routing frustrate customers and damage the overall experience.',
          },
          scale: {
            title: 'Human call centers don’t scale',
            description:
              'Traditional call centers cannot handle rising demand, and peak periods quickly expose quality gaps.',
          },
          cost: {
            title: 'Rising operational costs',
            description:
              'Labor and training create a heavy burden, and costs become harder to control as volume grows.',
          },
          ai: {
            title: 'AI wrappers fail in production',
            description:
              'Off-the-shelf tools may work in demos, but fail to integrate deeply or perform in real enterprise environments.',
          },
        },
      },
      socialProof: {
        lead: 'End-to-end call automation in one platform',
        items: {
          agents: 'Agent Management',
          flowBuilder: 'Flow Builder',
          knowledgeBase: 'Knowledge Base',
          callHistory: 'Call History',
          analytics: 'Analytics',
          numbers: 'Number Management',
        },
      },
      features: {
        sectionTitle: 'Core Modules in the Web App',
        sectionDescription:
          'Instead of generic claims, this page now highlights the exact workflows your team is already building and using.',
        items: {
          voiceAgent: {
            title: 'Agent Studio',
            description:
              'Create, configure, and test agents with a practical list-and-edit workflow in one place.',
          },
          transcription: {
            title: 'Visual Flow Builder',
            description: 'Build and save complex conversation logic on a node-based canvas.',
          },
          sentiment: {
            title: 'Knowledge Base',
            description:
              'Feed your assistant with text, file, and website sources and keep content current.',
          },
          routing: {
            title: 'Call History & Analytics',
            description:
              'Track status, sentiment, cost, and latency with combined tables and charts.',
          },
        },
      },
      useCases: {
        sectionTitle: 'One platform, multiple operational scenarios',
        sectionDescription:
          'The CleonAI platform supports intelligent call automation and AI-assisted workflows across different industries.',
        labels: {
          problem: 'Problem',
          solution: 'Solution',
          keyFeatures: 'Key Features',
        },
        items: {
          healthcare: {
            title: 'Healthcare',
            problem:
              'Appointment scheduling, patient reminders, and clinic routing become confusing when handled manually.',
            solution:
              'Patients can book appointments in a single call, receive automated reminders, and get routed to clinics based on insurance.',
            features: {
              0: 'Automated reminders that reduce no-show rates',
              1: 'Clinic / doctor / insurance-based routing',
            },
          },
          realEstate: {
            title: 'Real Estate',
            problem:
              'Agents are overloaded with inquiries, causing high-intent opportunities to be missed.',
            solution:
              'The AI agent answers buyer questions, suggests properties, and schedules viewing appointments.',
            features: {
              0: '24/7 customer support and lead pre-qualification',
              1: 'Instant property information and pricing responses',
            },
          },
          ecommerce: {
            title: 'E-commerce & Retail',
            problem: 'Support teams are overloaded with order tracking and return requests.',
            solution:
              'The AI system provides order status automatically, handles returns, and recommends products.',
            features: {
              0: 'Order tracking and status notifications',
              1: 'Automated return and exchange processing',
            },
          },
          restaurant: {
            title: 'Restaurants & Hospitality',
            problem:
              'Reservations and customer questions are managed manually, so calls are missed during peak hours.',
            solution:
              'The AI agent manages table reservations, answers menu questions, and records special requests.',
            features: {
              0: 'Automated table capacity optimization',
              1: 'Menu, pricing, and allergy information',
            },
          },
          education: {
            title: 'Education & Courses',
            problem:
              'Course managers spend too much time on student registration, program information, and guidance.',
            solution:
              'The AI assistant answers student questions, guides program selection, and accelerates enrollment steps.',
            features: {
              0: 'Detailed program and curriculum information',
              1: 'Program recommendations based on student fit',
            },
          },
          banking: {
            title: 'Banking & Insurance',
            problem:
              'Support teams are overwhelmed by loan applications, insurance quotes, and account-related inquiries.',
            solution:
              'The AI agent evaluates customer profiles, suggests suitable products, and speeds up application handling.',
            features: {
              0: 'Fast loan eligibility assessment',
              1: 'Insurance product analysis and recommendations',
            },
          },
        },
      },
      ourApproach: {
        badge: 'DELIVERY STEPS',
        titleLine1: 'Start fast,',
        titleLine2: 'scale right;',
        titleHighlight: 'with CleonAI',
        description:
          'Our product team works with you throughout the whole journey. We stay by your side during analysis, setup, and optimization stages.',
        stepLabel: 'STEP',
        steps: {
          discover: {
            title: 'We define needs and scenarios',
            description:
              'We listen, identify where your operation slows down, and design call flows with scenarios tailored to your process.',
            status: 'Intent Captured',
          },
          integrate: {
            title: 'We connect telephony and data infrastructure',
            description:
              'We unify PBX, CRM, and required services in a single architecture and prepare inbound and outbound call operations.',
            status: 'Integrated',
          },
          personalize: {
            title: 'We launch personalized communication',
            description:
              'CleonAI does more than respond. It speaks in the right tone, fetches information, triggers actions, and hands off to humans when needed.',
            status: 'Activated',
          },
          optimize: {
            title: 'We improve the process with analytics',
            description:
              'After each conversation, we measure outcomes, quality, and efficiency, then improve scenarios with team feedback.',
            status: 'Optimized',
          },
        },
        ctaTitle: 'Your success is our priority',
        ctaDescription:
          'Support at every step, optimization at every stage. CleonAI is a growth partner for your business.',
        ctaButton: 'Start the Process',
      },
      howItWorks: {
        sectionTitle: 'How the Product Workflow Runs',
        steps: {
          connect: {
            title: '1. Create your agent',
            description:
              'Start from the dashboard, configure essentials, and validate behavior in the testing panel.',
          },
          automate: {
            title: '2. Design the flow visually',
            description: 'Connect nodes in Flow Builder, define logic, and save your scenario.',
          },
          scale: {
            title: '3. Feed knowledge, optimize with data',
            description:
              'Add knowledge sources, then improve outcomes through call history and analytics.',
          },
        },
      },
      analyticsPreview: {
        titlePrefix: 'Monitor operations',
        titleHighlight: 'in real time',
        titleSuffix: '',
        description:
          'Dashboard and call history surfaces key KPIs such as total calls, success rate, cost, latency, and human handoff ratio.',
        bullets: {
          sentimentHeatmaps: 'Call status and sentiment breakdown',
          conversionAlerts: 'Success rate and latency trend',
          coachingMetrics: 'Unified table and chart performance view',
        },
        metrics: {
          totalCallsToday: 'Total Calls',
          sentimentScore: 'Success Rate',
          sentimentStatus: 'Improving',
        },
      },
      cta: {
        titleLine1: 'Experience the CleonAI',
        titleLine2: 'dashboard with your team',
        description:
          'Walk through Agent, Flow, Knowledge Base, and Analytics modules on your own use case in a live demo.',
        primaryButton: 'Book Demo',
        secondaryButton: 'Share Use Case',
      },
      footer: {
        brandDescription:
          'CleonAI is an operations platform where teams manage agent design, knowledge, and call performance from one control panel.',
        sections: {
          product: 'Product',
          company: 'Company',
          resources: 'Resources',
          legal: 'Legal',
        },
        links: {
          aiVoice: 'Agent Management',
          integrations: 'Flow Builder',
          dashboard: 'Dashboard',
          security: 'Knowledge Base',
          about: 'About',
          blog: 'Blog',
          careers: 'Careers',
          contact: 'Contact',
          documentation: 'Documentation',
          apiReference: 'API Reference',
          community: 'Community',
          support: 'Support',
          privacy: 'Privacy',
          terms: 'Terms',
          gdpr: 'GDPR',
        },
        copyright: '© 2024 Cleon AI. All rights reserved.',
      },
    },
  },
} as const satisfies Record<Locale, Record<string, unknown>>;
