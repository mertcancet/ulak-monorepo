import type { UseCase, UseCaseId } from "./types";

export const useCases: Record<UseCaseId, UseCase> = {
  healthcare: {
    id: "healthcare",
    icon: "Heart",
    title: "Sağlık Sektörü",
    problem: "Randevu yönetimi, hasta hatırlatmaları ve poliklinik yönlendirmesi manuel işlemlerle karışıklık yaratıyor.",
    solution: "Hastalar tek bir çağrıda randevu alabilir, otomatik hatırlatmalar alabilir ve sigorta durumlarına uygun poliklinikler yönlendirilir.",
    features: [
      "No-show oranını düşüren otomatik hatırlatmalar",
      "Poliklinik / doktor / sigorta bazlı yönlendirme",
      "Yoğun saatlerde bile aynı ses kalitesi ve hız",
      "Multilingual destek (Türkçe, İngilizce, vb.)",
    ],
    timeline: [
      {
        time: "00:02",
        step: "Dış hekimi randevu talebini talebi tespit edildi",
        status: "Niyet Anlaşıldı",
      },
      {
        time: "00:11",
        step: "Uygun saatler kontrol edildi",
        status: "Takım",
      },
      {
        time: "00:24",
        step: "Yarın 14:00 için rezervasyon oluşturuldu",
        status: "Aksiyon",
      },
    ],
  },
  realEstate: {
    id: "realEstate",
    icon: "Building2",
    title: "Gayrimenkul & Emlak",
    problem: "Emlak danışmanları çok sayıda müşteri sorgusuyla meşgul, potansiyel satış fırsatları kaçırılıyor.",
    solution: "AI ajanı müşteri sorularını yanıtlar, mülk önerileri sunar ve görüş saati planlaması yapar.",
    features: [
      "7/24 müşteri desteği ve ön niteliklandırma",
      "Mülk bilgileri ve fiyat sorguları anlık yanıt",
      "Müşteri tercihlerine uygun emlak önerileri",
      "Otomatik görüş saati ayarlaması",
    ],
    timeline: [
      {
        time: "00:03",
        step: "Müşteri bütçe ve konum tercihini belirtti",
        status: "Tercih Alındı",
      },
      {
        time: "00:15",
        step: "Uygun gayrimenkuller filtrelendi",
        status: "Arama",
      },
      {
        time: "00:28",
        step: "Yarın 10:00'da görüş saati ayarlandı",
        status: "Randevu",
      },
    ],
  },
  ecommerce: {
    id: "ecommerce",
    icon: "ShoppingCart",
    title: "E-Ticaret & Perakende",
    problem: "Müşteri hizmetleri, siparişleri takip etme ve iade işlemleriyle aşırı yüklenmiş.",
    solution: "AI sistem otomatik olarak sipariş statüsü sağlıyor, iade işlemleri yönetiyor ve ürün önerileri yapıyor.",
    features: [
      "Siparişleri takip etme ve durum bildirimleri",
      "İade ve değişim talepleri otomatik işleme",
      "Ürün önerileri ve geliştirilmiş müşteri deneyimi",
      "Ödeme sorularına anında yanıt",
    ],
    timeline: [
      {
        time: "00:01",
        step: "Müşteri sipariş numarasını söyledi",
        status: "Tespit",
      },
      {
        time: "00:08",
        step: "Kargo bilgileri ve teslim tarihi kontrol edildi",
        status: "Arama",
      },
      {
        time: "00:15",
        step: "SMS ile kargo takip linki gönderildi",
        status: "Bildirim",
      },
    ],
  },
  restaurant: {
    id: "restaurant",
    icon: "UtensilsCrossed",
    title: "Restoran & Turizm",
    problem: "Restoran rezervasyonları ve müşteri soruları manuel olarak yönetiliyor, yoğun saatlarda çağrılar kaçırılıyor.",
    solution: "AI ajanı masa rezervasyonlarını yönetir, menü sorularını yanıtlar ve özel istekleri kaydeder.",
    features: [
      "Otomasyon ile masa boş alanlarını değerlendirme",
      "Menü, fiyatlar ve alerjiler hakkında bilgi",
      "Grup rezervasyonları ve özel etkinlikler yönetimi",
      "Müşteri tercihlerini öğrenme ve CRM entegrasyonu",
    ],
    timeline: [
      {
        time: "00:04",
        step: "Müşteri 4 kişi, hafta sonu rezervasyon talep etti",
        status: "Talep",
      },
      {
        time: "00:12",
        step: "Uygun saatler gösterildi ve tercih alındı",
        status: "Tercih",
      },
      {
        time: "00:20",
        step: "Özel istekler not edilerek rezervasyon onaylandı",
        status: "Onay",
      },
    ],
  },
  education: {
    id: "education",
    icon: "BookOpen",
    title: "Eğitim & Kurslar",
    problem: "Kurs müdürleri öğrenci kayıtları, program bilgileri ve danışmanlık için çok zaman harcıyor.",
    solution: "AI asistan öğrenci sorularını yanıtlar, program seçiminde rehberlik eder ve kayıt işlemlerini hızlandırır.",
    features: [
      "Kurs programları ve müfredatı hakkında detaylı bilgi",
      "Öğrenci seçimine uygun program tavsiyesi",
      "Öğrenci başvurusu ve kayıt işlemlerinin hızlandırılması",
      "Zamanlamalar, ödemeler ve sertifikasyon sorularına yanıt",
    ],
    timeline: [
      {
        time: "00:02",
        step: "Öğrenci ilgi alanı ve seviyesi soruldu",
        status: "Değerlendirme",
      },
      {
        time: "00:18",
        step: "Uygun kurs programları önerildi",
        status: "Tavsiye",
      },
      {
        time: "00:35",
        step: "Başvuru formu dolduruldu ve ödeme işlemi başlatıldı",
        status: "Kayıt",
      },
    ],
  },
  banking: {
    id: "banking",
    icon: "DollarSign",
    title: "Banka & Sigorta Firmaları",
    problem: "Müşteri hizmetleri, kredi başvuruları, sigorta teklifi ve hesap sorularıyla aşırı meşgul, başvuru işlemleri uzun sürüyor.",
    solution: "AI ajanı müşteri profili değerlendirir, uygun kredi/sigorta ürünleri önerir ve işlemleri hızlandırır.",
    features: [
      "Kredi uygunluğu hızlı değerlendirmesi",
      "Sigorta ürünleri analiz ve önerileri",
      "Başvuru formu otomatik doldurma ve işleme",
      "KYC (Know Your Customer) protokolü uyumluluğu",
    ],
    timeline: [
      {
        time: "00:03",
        step: "Müşteri kredi türü ve tutarını belirtti",
        status: "Talep",
      },
      {
        time: "00:18",
        step: "Kredi profili değerlendirildi, uygun ürünler sunuldu",
        status: "Değerlendirme",
      },
      {
        time: "00:45",
        step: "Başvuru onaylandı, sonraki adımlar iletildi",
        status: "Onay",
      },
    ],
  },
};

export const useCaseIds = Object.keys(useCases) as UseCaseId[];
