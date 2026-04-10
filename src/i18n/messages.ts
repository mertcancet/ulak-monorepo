import type { Locale } from "@/i18n/config";

export const messages = {
  tr: {
    navbar: {
      features: "Özellikler",
      solutions: "Çözümler",
      analytics: "Analitik",
      pricing: "Demo",
      login: "Giriş Yap",
      launchApp: "Demo İste",
      switchLanguage: "Dil Değiştir",
    },
    sidebar: {
      overview: "Genel Bakış",
      agents: "Yapay Zeka Ajanları",
      calls: "Çağrılar",
      analytics: "Analitik",
      settings: "Ayarlar",
      brandSubtitle: "Çağrı Merkezi Platformu",
      mainMenu: "Ana Menü",
      systemStatus: "Sistem Durumu",
      aiEngine: "Yapay Zeka Motoru",
      online: "Çevrimiçi",
      activeCalls: "Aktif Çağrılar",
    },
    topbar: {
      searchPlaceholder: "Çağrıları, ajanları ara...",
      newCall: "Yeni Çağrı",
    },
    pageMeta: {
      dashboardTitle: "Panel",
      dashboardDescription: "Çağrı merkezi operasyonlarınızın genel görünümü",
      agentsTitle: "Yapay Zeka Ajanları",
      agentsDescription: "Yapay zeka ajanlarınızı yönetin ve izleyin",
      callsTitle: "Çağrılar",
      callsDescription: "Tüm çağrı kayıtlarını görüntüleyin ve yönetin",
      analyticsTitle: "Analitik",
      analyticsDescription: "Performans içgörüleri ve raporlar",
      settingsTitle: "Ayarlar",
      settingsDescription: "Platform ayarlarınızı yapılandırın",
      fallbackTitle: "CallingAI",
    },
    demoPage: {
      badge: "Canlı ürün demosu",
      backToHome: "Ana sayfaya dön",
      title: "Ekibine uygun yapay zeka çağrı akışını birlikte kuralım.",
      description:
        "Kısa bir demo görüşmesinde kullanım senaryonu, çağrı yoğunluğunu ve entegrasyon ihtiyaçlarını netleştirelim. Sana özel akışı canlı gösterelim.",
      highlights: {
        setup: {
          title: "Dakikalar içinde senaryo tasarımı",
          description:
            "Inbound, outbound, randevu, satış ve destek akışlarını ürün uzmanıyla birlikte canlı kurgula.",
        },
        voice: {
          title: "Gerçekçi ses deneyimi",
          description:
            "Doğal konuşma, aksiyon alma ve çağrı yönlendirme kalitesini gerçek örneklerle dinle.",
        },
        security: {
          title: "Entegrasyon ve güvenlik kontrolü",
          description:
            "CRM, santral ve veri güvenliği gereksinimlerini ekiplerinle birlikte hızlıca doğrula.",
        },
      },
      metrics: {
        discovery: "Keşif görüşmesi",
        availability: "Aktif otomasyon kapsaması",
        teams: "Değerlendiren ekip",
      },
      form: {
        title: "Demo talep formu",
        description:
          "Formu doldur, ekibimiz sana uygun bir zaman ve senaryo önerisiyle geri dönsün.",
        fields: {
          fullName: "Ad soyad",
          company: "Şirket adı",
          email: "İş e-postası",
          phone: "Telefon",
          callVolume: "Aylık çağrı hacmi",
          useCase: "Kullanım senaryon",
        },
        placeholders: {
          fullName: "Örn. John Doe",
          company: "Örn. Ulak Teknoloji",
          email: "ornek@sirket.com",
          phone: "+90 5xx xxx xx xx",
          callVolume: "Bir aralık seç",
          useCase:
            "Hangi ekip için kullanmak istiyorsun? Destek, satış, randevu, tahsilat veya özel akışları kısaca yaz.",
        },
        options: {
          callVolume: {
            low: "0 - 500 çağrı",
            mid: "500 - 5.000 çağrı",
            high: "5.000+ çağrı",
          },
        },
        disclaimer:
          "Gönderdiğin bilgiler sadece demo planlaması ve ürün uygunluğu değerlendirmesi için kullanılır.",
        submit: "Demo iste",
        submitting: "Gönderiliyor...",
      },
      success: {
        title: "Talebin alındı.",
        description:
          "Satış ekibimiz kısa süre içinde seninle iletişime geçip canlı demo için uygun zaman önerecek.",
        reset: "Yeni talep oluştur",
      },
    },
    landing: {
      hero: {
        badge: "Çağrı operasyonları için AI kontrol merkezi",
        description:
          "Agent oluştur, konuşma akışını görsel olarak tasarla, bilgi tabanını bağla ve çağrı performansını tek panelden yönet. CallingAI web uygulamasında geliştirdiğimiz tüm çekirdek modüller burada.",
        primaryButton: "Canlı Demoyu Planla",
        secondaryButton: "Modülleri İncele",
      },
      socialProof: {
        lead: "Tek platformda uçtan uca çağrı otomasyonu",
        items: {
          agents: "Agent Yönetimi",
          flowBuilder: "Flow Builder",
          knowledgeBase: "Knowledge Base",
          callHistory: "Çağrı Geçmişi",
          analytics: "Analitik",
          numbers: "Numara Yönetimi",
        },
      },
      features: {
        sectionTitle: "Web Uygulamasındaki Temel Modüller",
        sectionDescription:
          "Landing artık genel vaatler yerine, üründe aktif olarak kullandığınız ekranları ve iş akışlarını anlatır.",
        items: {
          voiceAgent: {
            title: "Agent Stüdyosu",
            description:
              "Temsilci oluştur, isimlendir, yapılandır ve test et. Tek bir listeden tüm agent yaşam döngüsünü yönet.",
          },
          transcription: {
            title: "Görsel Flow Builder",
            description:
              "Node tabanlı canvas ile konuşma akışını tasarla, kaydet ve sürdür. Karmaşık senaryoları görsel olarak kur.",
          },
          sentiment: {
            title: "Knowledge Base",
            description:
              "Metin, dosya ve web kaynaklarını ekleyerek ajanın bilgi katmanını oluştur; içerikleri tek yerden güncelle.",
          },
          routing: {
            title: "Çağrı Geçmişi ve Analitik",
            description:
              "Durum, duygu, maliyet ve gecikme gibi metrikleri izle; tablo ve grafiklerle operasyonel kararları hızlandır.",
          },
        },
      },
      howItWorks: {
        sectionTitle: "Üründe Akış Nasıl İlerliyor?",
        steps: {
          connect: {
            title: "1. Agent'ı oluştur",
            description:
              "Dashboard'dan yeni agent aç, temel ayarları gir ve test panelinde ilk konuşmayı hızlıca doğrula.",
          },
          automate: {
            title: "2. Akışı görsel olarak tasarla",
            description:
              "Flow Builder'da node'ları bağla, mantığı kurgula ve sürümünü kaydet.",
          },
          scale: {
            title: "3. Bilgiyi besle, performansı izle",
            description:
              "Knowledge Base kaynaklarını ekle; çağrı geçmişi ve analitik ekranlarından kaliteyi sürekli iyileştir.",
          },
        },
      },
      analyticsPreview: {
        titlePrefix: "Operasyonu",
        titleHighlight: "gerçek zamanlı",
        titleSuffix: "takip edin",
        description:
          "Dashboard ve çağrı geçmişi ekranları; toplam çağrı, başarı oranı, maliyet, gecikme ve insan operatöre aktarım gibi kritik KPI'ları tek bakışta gösterir.",
        bullets: {
          sentimentHeatmaps: "Çağrı durumu ve duygu kırılımı",
          conversionAlerts: "Başarı oranı ve gecikme trendi",
          coachingMetrics: "Tablo + grafik birleşik performans görünümü",
        },
        metrics: {
          totalCallsToday: "Toplam Çağrı",
          sentimentScore: "Başarı Oranı",
          sentimentStatus: "İyileşiyor",
        },
      },
      cta: {
        titleLine1: "CallingAI dashboard'unu",
        titleLine2: "ekibinle canlı deneyimle",
        description:
          "Agent, akış, knowledge base ve analitik modüllerini kendi senaryonla birlikte demo oturumunda görelim.",
        primaryButton: "Demo Planla",
        secondaryButton: "Kullanım Senaryonu Paylaş",
      },
      footer: {
        brandDescription:
          "CallingAI, ekiplerin agent tasarımı, bilgi yönetimi ve çağrı performansını tek panelde birleştirdiği operasyon platformudur.",
        sections: {
          product: "Ürün",
          company: "Şirket",
          resources: "Kaynaklar",
          legal: "Yasal",
        },
        links: {
          aiVoice: "Agent Yönetimi",
          integrations: "Flow Builder",
          dashboard: "Dashboard",
          security: "Knowledge Base",
          about: "Hakkımızda",
          blog: "Blog",
          careers: "Kariyer",
          contact: "İletişim",
          documentation: "Dokümantasyon",
          apiReference: "API Referansı",
          community: "Topluluk",
          support: "Destek",
          privacy: "Gizlilik",
          terms: "Koşullar",
          gdpr: "KVKK/GDPR",
        },
        copyright: "© 2024 Ulak AI. Tüm hakları saklıdır.",
      },
    },
  },
  en: {
    navbar: {
      features: "Features",
      solutions: "Solutions",
      analytics: "Analytics",
      pricing: "Demo",
      login: "Login",
      launchApp: "Request Demo",
      switchLanguage: "Switch Language",
    },
    sidebar: {
      overview: "Overview",
      agents: "AI Agents",
      calls: "Calls",
      analytics: "Analytics",
      settings: "Settings",
      brandSubtitle: "Call Center Platform",
      mainMenu: "Main Menu",
      systemStatus: "System Status",
      aiEngine: "AI Engine",
      online: "Online",
      activeCalls: "Active Calls",
    },
    topbar: {
      searchPlaceholder: "Search calls, agents...",
      newCall: "New Call",
    },
    pageMeta: {
      dashboardTitle: "Dashboard",
      dashboardDescription: "Overview of your call center operations",
      agentsTitle: "AI Agents",
      agentsDescription: "Manage and monitor your AI agents",
      callsTitle: "Calls",
      callsDescription: "View and manage all call records",
      analyticsTitle: "Analytics",
      analyticsDescription: "Performance insights and reports",
      settingsTitle: "Settings",
      settingsDescription: "Configure your platform settings",
      fallbackTitle: "CallingAI",
    },
    demoPage: {
      badge: "Live product walkthrough",
      backToHome: "Back to home",
      title: "Let's design the right AI calling flow for your team.",
      description:
        "In a short demo session, we will review your use case, call volume, and integration needs, then show the best-fit workflow live.",
      highlights: {
        setup: {
          title: "Scenario design in minutes",
          description:
            "Map inbound, outbound, appointment, sales, and support flows with a product specialist in real time.",
        },
        voice: {
          title: "Realistic voice experience",
          description:
            "Hear natural conversations, action handling, and smart routing quality with practical examples.",
        },
        security: {
          title: "Integration and security review",
          description:
            "Validate CRM, telephony, and security requirements together with the right stakeholders.",
        },
      },
      metrics: {
        discovery: "Discovery session",
        availability: "Automation coverage",
        teams: "Teams evaluating",
      },
      form: {
        title: "Request a demo",
        description:
          "Fill out the form and our team will follow up with a recommended time slot and demo scenario.",
        fields: {
          fullName: "Full name",
          company: "Company name",
          email: "Work email",
          phone: "Phone",
          callVolume: "Monthly call volume",
          useCase: "Your use case",
        },
        placeholders: {
          fullName: "e.g. John Doe",
          company: "e.g. Ulak Technology",
          email: "name@company.com",
          phone: "+90 5xx xxx xx xx",
          callVolume: "Select a range",
          useCase:
            "What do you want to automate? Support, sales, scheduling, collections, or a custom voice workflow.",
        },
        options: {
          callVolume: {
            low: "0 - 500 calls",
            mid: "500 - 5,000 calls",
            high: "5,000+ calls",
          },
        },
        disclaimer:
          "We only use this information to plan your demo and assess product fit for your team.",
        submit: "Request demo",
        submitting: "Submitting...",
      },
      success: {
        title: "Your request has been received.",
        description:
          "Our sales team will contact you shortly to suggest a time for your live demo.",
        reset: "Create another request",
      },
    },
    landing: {
      hero: {
        badge: "AI control center for call operations",
        description:
          "Create agents, design conversation flows visually, connect your knowledge base, and track call performance from a single dashboard. This landing now reflects the core modules already built in our CallingAI web app.",
        primaryButton: "Schedule Live Demo",
        secondaryButton: "Explore Modules",
      },
      socialProof: {
        lead: "End-to-end call automation in one platform",
        items: {
          agents: "Agent Management",
          flowBuilder: "Flow Builder",
          knowledgeBase: "Knowledge Base",
          callHistory: "Call History",
          analytics: "Analytics",
          numbers: "Number Management",
        },
      },
      features: {
        sectionTitle: "Core Modules in the Web App",
        sectionDescription:
          "Instead of generic claims, this page now highlights the exact workflows your team is already building and using.",
        items: {
          voiceAgent: {
            title: "Agent Studio",
            description:
              "Create, configure, and test agents with a practical list-and-edit workflow in one place.",
          },
          transcription: {
            title: "Visual Flow Builder",
            description:
              "Build and save complex conversation logic on a node-based canvas.",
          },
          sentiment: {
            title: "Knowledge Base",
            description:
              "Feed your assistant with text, file, and website sources and keep content current.",
          },
          routing: {
            title: "Call History & Analytics",
            description:
              "Track status, sentiment, cost, and latency with combined tables and charts.",
          },
        },
      },
      howItWorks: {
        sectionTitle: "How the Product Workflow Runs",
        steps: {
          connect: {
            title: "1. Create your agent",
            description:
              "Start from the dashboard, configure essentials, and validate behavior in the testing panel.",
          },
          automate: {
            title: "2. Design the flow visually",
            description:
              "Connect nodes in Flow Builder, define logic, and save your scenario.",
          },
          scale: {
            title: "3. Feed knowledge, optimize with data",
            description:
              "Add knowledge sources, then improve outcomes through call history and analytics.",
          },
        },
      },
      analyticsPreview: {
        titlePrefix: "Monitor operations",
        titleHighlight: "in real time",
        titleSuffix: "",
        description:
          "Dashboard and call history surfaces key KPIs such as total calls, success rate, cost, latency, and human handoff ratio.",
        bullets: {
          sentimentHeatmaps: "Call status and sentiment breakdown",
          conversionAlerts: "Success rate and latency trend",
          coachingMetrics: "Unified table and chart performance view",
        },
        metrics: {
          totalCallsToday: "Total Calls",
          sentimentScore: "Success Rate",
          sentimentStatus: "Improving",
        },
      },
      cta: {
        titleLine1: "Experience the CallingAI",
        titleLine2: "dashboard with your team",
        description:
          "Walk through Agent, Flow, Knowledge Base, and Analytics modules on your own use case in a live demo.",
        primaryButton: "Book Demo",
        secondaryButton: "Share Use Case",
      },
      footer: {
        brandDescription:
          "CallingAI is an operations platform where teams manage agent design, knowledge, and call performance from one control panel.",
        sections: {
          product: "Product",
          company: "Company",
          resources: "Resources",
          legal: "Legal",
        },
        links: {
          aiVoice: "Agent Management",
          integrations: "Flow Builder",
          dashboard: "Dashboard",
          security: "Knowledge Base",
          about: "About",
          blog: "Blog",
          careers: "Careers",
          contact: "Contact",
          documentation: "Documentation",
          apiReference: "API Reference",
          community: "Community",
          support: "Support",
          privacy: "Privacy",
          terms: "Terms",
          gdpr: "GDPR",
        },
        copyright: "© 2024 Ulak AI. All rights reserved.",
      },
    },
  },
} as const satisfies Record<Locale, Record<string, unknown>>;
