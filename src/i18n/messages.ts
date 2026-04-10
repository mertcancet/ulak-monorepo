import type { Locale } from '@/i18n/config';

export const messages = {
  tr: {
    navbar: {
      features: 'Özellikler',
      solutions: 'Çözümler',
      analytics: 'Analitik',
      pricing: 'Fiyatlandırma',
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
      fallbackTitle: 'CallingAI',
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
        availability: 'Aktif otomasyon kapsaması',
        teams: 'Değerlendiren ekip',
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
          company: 'Örn. Ulak Teknoloji',
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
      success: {
        title: 'Talebin alındı.',
        description:
          'Satış ekibimiz kısa süre içinde seninle iletişime geçip canlı demo için uygun zaman önerecek.',
        reset: 'Yeni talep oluştur',
      },
    },
    landing: {
      features: {
        sectionTitle: 'Eşsiz Yapay Zeka Yetenekleri',
        sectionDescription:
          'Her çağrı mükemmellik için bir fırsattır. Yapay zekamız karmaşık süreci yönetir, ekibiniz büyümeye odaklanır.',
        items: {
          voiceAgent: {
            title: 'Yapay Zeka Ses Ajanı',
            description:
              'İnsan sesinden ayırt edilemeyen, doğal ve ultra düşük gecikmeli sesli etkileşim.',
          },
          transcription: {
            title: 'Transkripsiyon',
            description:
              'Anında dokümantasyon için %99.9 doğrulukla gerçek zamanlı, çok dilli transkripsiyon.',
          },
          sentiment: {
            title: 'Duygu Analizi',
            description:
              'Arayanın ruh halini ve niyetini algılayan derin duygusal zeka ile dinamik ton uyarlaması.',
          },
          routing: {
            title: 'Akıllı Yönlendirme',
            description: 'Arayan geçmişi ve ajan uzmanlık seviyesine göre öngörülü yönlendirme.',
          },
        },
      },
      howItWorks: {
        sectionTitle: 'Nasıl Çalışır?',
        steps: {
          connect: {
            title: '1. Bağlan',
            description:
              "CRM'inizi, bilgi tabanınızı ve telefon numaralarınızı dakikalar içinde entegre edin.",
          },
          automate: {
            title: '2. Otomatize Et',
            description:
              'Yapay zeka süreçlerinizi öğrenir ve çağrıları hassasiyetle yönetmeye başlar.',
          },
          scale: {
            title: '3. Ölçekle',
            description: 'Sıfır ek maliyetle farklı saat dilimlerinde global dağıtım sağlayın.',
          },
        },
      },
      analyticsPreview: {
        titlePrefix: 'Her',
        titleHighlight: 'heceye',
        titleSuffix: 'hakim olun',
        description:
          'Gerçek zamanlı panelimiz; müşteri memnuniyeti, çözüm oranları ve yapay zeka performans metriklerine kuşbakışı hakimiyet sağlar.',
        bullets: {
          sentimentHeatmaps: 'Canlı duygu ısı haritaları',
          conversionAlerts: 'Dönüşüm optimizasyonu uyarı sistemi',
          coachingMetrics: 'Otomatik ajan koçluk metrikleri',
        },
        metrics: {
          totalCallsToday: 'Bugün Toplam Çağrı',
          sentimentScore: 'Duygu Skoru',
          sentimentStatus: 'Mükemmel',
        },
      },
      cta: {
        titleLine1: 'Müşteri hizmetlerinizi',
        titleLine2: 'otomatize etmeye hazır mısınız?',
        description: 'Bugün Ulak AI ile iletişimini ölçeklendiren 500+ kuruma sen de katıl.',
        primaryButton: 'Hemen Başla',
        secondaryButton: 'Satış Ekibiyle Görüş',
      },
      footer: {
        brandDescription:
          'Otonom müşteri ses etkileşimlerinin yeni çağını şekillendiriyoruz. Aileniz kadar yakın hissettiren yapay zeka.',
        sections: {
          product: 'Ürün',
          company: 'Şirket',
          resources: 'Kaynaklar',
          legal: 'Yasal',
        },
        links: {
          aiVoice: 'Yapay Zeka Ses',
          integrations: 'Entegrasyonlar',
          dashboard: 'Panel',
          security: 'Güvenlik',
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
        copyright: '© 2024 Ulak AI. Tüm hakları saklıdır.',
      },
    },
  },
  en: {
    navbar: {
      features: 'Features',
      solutions: 'Solutions',
      analytics: 'Analytics',
      pricing: 'Pricing',
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
      fallbackTitle: 'CallingAI',
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
        availability: 'Automation coverage',
        teams: 'Teams evaluating',
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
          company: 'e.g. Ulak Technology',
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
      success: {
        title: 'Your request has been received.',
        description:
          'Our sales team will contact you shortly to suggest a time for your live demo.',
        reset: 'Create another request',
      },
    },
    landing: {
      features: {
        sectionTitle: 'Unrivaled AI Capabilities',
        sectionDescription:
          'Every call is an opportunity for perfection. Our AI handles the complexity so your team can focus on growth.',
        items: {
          voiceAgent: {
            title: 'AI Voice Agent',
            description:
              'Natural, ultra-low latency voice interaction that sounds indistinguishable from humans.',
          },
          transcription: {
            title: 'Transcription',
            description:
              'Real-time, multi-language transcription with 99.9% accuracy for instant documentation.',
          },
          sentiment: {
            title: 'Sentiment Analysis',
            description:
              'Deep emotional intelligence detecting caller mood and intent to adjust tone dynamically.',
          },
          routing: {
            title: 'Smart Routing',
            description:
              'Predictive routing based on caller history and current agent expertise levels.',
          },
        },
      },
      howItWorks: {
        sectionTitle: 'How It Works?',
        steps: {
          connect: {
            title: '1. Connect',
            description: 'Integrate your CRM, knowledge base, and phone numbers in minutes.',
          },
          automate: {
            title: '2. Automate',
            description: 'AI learns your processes and starts handling calls with precision.',
          },
          scale: {
            title: '3. Scale',
            description: 'Global deployment across timezones with zero overhead costs.',
          },
        },
      },
      analyticsPreview: {
        titlePrefix: 'Insight into every',
        titleHighlight: 'syllable',
        titleSuffix: '',
        description:
          "Our real-time dashboard gives you a bird's eye view of customer satisfaction, resolution rates, and AI performance metrics.",
        bullets: {
          sentimentHeatmaps: 'Live sentiment heatmaps',
          conversionAlerts: 'Conversion optimization alerts',
          coachingMetrics: 'Automated agent coaching metrics',
        },
        metrics: {
          totalCallsToday: 'Total Calls Today',
          sentimentScore: 'Sentiment Score',
          sentimentStatus: 'Excellent',
        },
      },
      cta: {
        titleLine1: 'Ready to automate your',
        titleLine2: 'customer service?',
        description: 'Join 500+ enterprises scaling their communication with Ulak AI today.',
        primaryButton: 'Get Started Now',
        secondaryButton: 'Talk to Sales',
      },
      footer: {
        brandDescription:
          'Pioneering the next era of autonomous customer voice interactions. AI that sounds like family.',
        sections: {
          product: 'Product',
          company: 'Company',
          resources: 'Resources',
          legal: 'Legal',
        },
        links: {
          aiVoice: 'AI Voice',
          integrations: 'Integrations',
          dashboard: 'Dashboard',
          security: 'Security',
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
        copyright: '© 2024 Ulak AI. All rights reserved.',
      },
    },
  },
} as const satisfies Record<Locale, Record<string, unknown>>;
