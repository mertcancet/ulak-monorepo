export type CallDirection = "Gelen" | "Giden";
export type CallStatus = "Basarili" | "Basarisiz" | "Cevapsiz";
export type CallSentiment = "Pozitif" | "Notr" | "Negatif" | "Belirsiz";

export interface TranscriptLine {
  role: "assistant" | "user" | "system";
  text: string;
  at: string;
}

export interface CallTimelineEvent {
  at: string;
  title: string;
  detail: string;
}

export interface CallHistoryItem {
  id: string;
  startedAt: string;
  endedAt: string;
  durationSeconds: number;
  channel: "web_call" | "phone_call";
  direction: CallDirection;
  status: CallStatus;
  endReason: string;
  sentiment: CallSentiment;
  costUsd: number;
  callerNumber: string;
  calleeNumber: string;
  userName: string;
  agentName: string;
  language: string;
  model: string;
  latencyMs: number;
  interruptions: number;
  transferedToHuman: boolean;
  recordingAvailable: boolean;
  summary: string;
  tags: string[];
  transcript: TranscriptLine[];
  timeline: CallTimelineEvent[];
}

export const callHistoryMockData: CallHistoryItem[] = [
  {
    id: "call_3b2a9082",
    startedAt: "2026-04-09T14:30:22+03:00",
    endedAt: "2026-04-09T14:31:07+03:00",
    durationSeconds: 45,
    channel: "web_call",
    direction: "Gelen",
    status: "Basarili",
    endReason: "Kullanici kapatti",
    sentiment: "Pozitif",
    costUsd: 0.021,
    callerNumber: "+90 532 111 22 33",
    calleeNumber: "+90 850 123 45 67",
    userName: "Ayse Y.",
    agentName: "Destek Asistani",
    language: "tr-TR",
    model: "gpt-4o-realtime",
    latencyMs: 610,
    interruptions: 1,
    transferedToHuman: false,
    recordingAvailable: true,
    summary:
      "Kullanici siparisinin teslim durumunu sordu. Ajan kargo bilgisini paylasti ve gorusme memnuniyetle sonlandi.",
    tags: ["siparis", "durum", "memnun"],
    transcript: [
      {
        role: "assistant",
        text: "Merhaba, Calling AI destek hattina hos geldiniz. Size nasil yardimci olabilirim?",
        at: "14:30:25",
      },
      {
        role: "user",
        text: "Siparisimin durumunu ogrenmek istiyorum.",
        at: "14:30:30",
      },
      {
        role: "assistant",
        text: "Kontrol ettim, siparisiniz dagitimda ve bugun teslim gorunuyor.",
        at: "14:30:40",
      },
    ],
    timeline: [
      {
        at: "14:30:22",
        title: "Cagri basladi",
        detail: "Web widget uzerinden inbound cagri alindi.",
      },
      {
        at: "14:30:24",
        title: "STT tamamlandi",
        detail: "Ilk ses parcasi 410ms icinde metne cevrildi.",
      },
      {
        at: "14:31:07",
        title: "Cagri sonlandi",
        detail: "Kullanici gorusmeyi kendi sonlandirdi.",
      },
    ],
  },
  {
    id: "call_9a1fbc7d",
    startedAt: "2026-04-09T14:22:10+03:00",
    endedAt: "2026-04-09T14:24:22+03:00",
    durationSeconds: 132,
    channel: "phone_call",
    direction: "Giden",
    status: "Basarili",
    endReason: "Kullanici kapatti",
    sentiment: "Notr",
    costUsd: 0.142,
    callerNumber: "+90 850 123 45 67",
    calleeNumber: "+90 541 222 33 44",
    userName: "Murat K.",
    agentName: "Satis Asistani",
    language: "tr-TR",
    model: "gpt-4o-realtime",
    latencyMs: 720,
    interruptions: 2,
    transferedToHuman: false,
    recordingAvailable: true,
    summary:
      "Plan yenileme hatirlatma aramasi yapildi. Kullanici teklif bilgisini e-posta ile istemeyi tercih etti.",
    tags: ["yenileme", "satis", "takip"],
    transcript: [
      {
        role: "assistant",
        text: "Merhaba, abonelik yenilemeniz hakkinda bilgilendirme icin ariyorum.",
        at: "14:22:15",
      },
      {
        role: "user",
        text: "Bilgiyi mail olarak gonderebilir misiniz?",
        at: "14:22:32",
      },
      {
        role: "assistant",
        text: "Elbette, hemen paylasiyorum. Iyi gunler dilerim.",
        at: "14:24:10",
      },
    ],
    timeline: [
      {
        at: "14:22:10",
        title: "Outbound baslatildi",
        detail: "Kampanya listesi uzerinden otomatik arama baslatildi.",
      },
      {
        at: "14:22:14",
        title: "Arama baglandi",
        detail: "SIP trunk ile baglanti kuruldu.",
      },
      {
        at: "14:24:22",
        title: "Cagri sonlandi",
        detail: "Kullanici kapatti.",
      },
    ],
  },
  {
    id: "call_f821a12c",
    startedAt: "2026-04-09T14:15:05+03:00",
    endedAt: "2026-04-09T14:15:17+03:00",
    durationSeconds: 12,
    channel: "web_call",
    direction: "Gelen",
    status: "Basarisiz",
    endReason: "Sistem hatasi",
    sentiment: "Belirsiz",
    costUsd: 0.008,
    callerNumber: "Anonim",
    calleeNumber: "+90 850 123 45 67",
    userName: "Bilinmiyor",
    agentName: "Destek Asistani",
    language: "tr-TR",
    model: "gpt-4o-realtime",
    latencyMs: 1300,
    interruptions: 0,
    transferedToHuman: false,
    recordingAvailable: false,
    summary:
      "Ses akisinda kopma algilandi. Cagri hata kodu SIP-503 ile sonlandi.",
    tags: ["hata", "altyapi"],
    transcript: [],
    timeline: [
      {
        at: "14:15:05",
        title: "Cagri basladi",
        detail: "WebRTC baglantisi olusturuldu.",
      },
      {
        at: "14:15:12",
        title: "Hata",
        detail: "SIP 503: upstream gateway unavailable.",
      },
      {
        at: "14:15:17",
        title: "Cagri sonlandi",
        detail: "Sistem tarafindan otomatik sonlandirma.",
      },
    ],
  },
  {
    id: "call_e55d221b",
    startedAt: "2026-04-09T13:58:45+03:00",
    endedAt: "2026-04-09T14:00:15+03:00",
    durationSeconds: 90,
    channel: "phone_call",
    direction: "Giden",
    status: "Basarili",
    endReason: "Temsilci kapatti",
    sentiment: "Pozitif",
    costUsd: 0.089,
    callerNumber: "+90 850 123 45 67",
    calleeNumber: "+90 532 444 55 66",
    userName: "Ece T.",
    agentName: "Randevu Asistani",
    language: "tr-TR",
    model: "gpt-4o-realtime",
    latencyMs: 580,
    interruptions: 1,
    transferedToHuman: false,
    recordingAvailable: true,
    summary:
      "Randevu teyidi alindi, kullanici yeni saat bilgisi verdi ve kayit guncellendi.",
    tags: ["randevu", "teyit"],
    transcript: [
      {
        role: "assistant",
        text: "Yarin saat 16.00 randevunuzu teyit etmek icin ariyorum.",
        at: "13:58:53",
      },
      {
        role: "user",
        text: "17.00 yapabilir miyiz?",
        at: "13:59:02",
      },
      {
        role: "assistant",
        text: "Elbette, kaydinizi 17.00 olarak guncelledim.",
        at: "13:59:22",
      },
    ],
    timeline: [
      {
        at: "13:58:45",
        title: "Outbound baslatildi",
        detail: "Randevu teyit listesi uzerinden cagrildi.",
      },
      {
        at: "13:58:52",
        title: "Baglanti kuruldu",
        detail: "Kullanici cevapladi.",
      },
      {
        at: "14:00:15",
        title: "Cagri sonlandi",
        detail: "Ajan konusmayi tamamlayip sonlandirdi.",
      },
    ],
  },
  {
    id: "call_77cd1451",
    startedAt: "2026-04-08T18:10:15+03:00",
    endedAt: "2026-04-08T18:10:35+03:00",
    durationSeconds: 20,
    channel: "phone_call",
    direction: "Gelen",
    status: "Cevapsiz",
    endReason: "Hat mesgul",
    sentiment: "Belirsiz",
    costUsd: 0,
    callerNumber: "+90 553 111 99 00",
    calleeNumber: "+90 850 123 45 67",
    userName: "Bilinmiyor",
    agentName: "Destek Asistani",
    language: "tr-TR",
    model: "gpt-4o-realtime",
    latencyMs: 0,
    interruptions: 0,
    transferedToHuman: false,
    recordingAvailable: false,
    summary: "Cagri hatta bekledi ancak kullanici sesli menuden secim yapmadi.",
    tags: ["cevapsiz"],
    transcript: [],
    timeline: [
      {
        at: "18:10:15",
        title: "Inbound alindi",
        detail: "IVR sesi oynatildi.",
      },
      {
        at: "18:10:35",
        title: "Timeout",
        detail: "Kullanici secim yapmadigi icin cagri sonlandi.",
      },
    ],
  },
];

export const getCallById = (id: string): CallHistoryItem | undefined =>
  callHistoryMockData.find(call => call.id === id);
