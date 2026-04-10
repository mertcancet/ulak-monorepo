import {
  ArrowLeft,
  Bot,
  ChevronRight,
  Copy,
  ExternalLink,
  MoreHorizontal,
  Phone,
  Settings,
  User,
} from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import DashboardHeader from "./_components/dashboard-header";

interface CallTranscriptLine {
  role: "agent" | "user";
  text: string;
  time: string;
}

interface CallRecord {
  id: string;
  time: string;
  duration: string;
  direction: "Gelen" | "Giden";
  status: "Başarılı" | "Başarısız" | "Cevapsız";
  sentiment: "Pozitif" | "Nötr" | "Negatif" | "Belirsiz";
  cost: string;
  callerNumber: string;
  transcript: CallTranscriptLine[];
}

interface PhoneNumberDetail {
  id: string;
  number: string;
  friendlyName: string;
  country: string;
  countryCode: string;
  status: "Aktif" | "Pasif";
  agentName: string | null;
  capabilities: string[];
  inboundCalls: number;
  outboundCalls: number;
  monthlyCost: string;
  purchasedAt: string;
  sid: string;
  calls: CallRecord[];
}

const mockData: Record<string, PhoneNumberDetail> = {
  num_001: {
    id: "num_001",
    number: "+90 850 123 45 67",
    friendlyName: "Müşteri Destek Hattı",
    country: "Türkiye",
    countryCode: "TR",
    status: "Aktif",
    agentName: "Destek Asistanı",
    capabilities: ["Sesli", "SMS"],
    inboundCalls: 342,
    outboundCalls: 58,
    monthlyCost: "$29.00",
    purchasedAt: "15 Ocak 2024",
    sid: "PN4a2b3c4d5e6f7a8b9c0d1e2f",
    calls: [
      {
        id: "call_a1b2c3",
        time: "2024-03-21 14:30",
        duration: "3:42",
        direction: "Gelen",
        status: "Başarılı",
        sentiment: "Pozitif",
        cost: "$0.021",
        callerNumber: "+90 532 111 22 33",
        transcript: [
          {
            role: "agent",
            text: "Merhaba, Calling AI Müşteri Destek hattına hoş geldiniz. Size nasıl yardımcı olabilirim?",
            time: "14:30:05",
          },
          {
            role: "user",
            text: "Merhaba. Sipariş durumumu öğrenmek istiyorum, numaram 78432.",
            time: "14:30:12",
          },
          {
            role: "agent",
            text: "Tabii, sipariş numaranızı aldım. Siparişiniz şu an kargoda ve yarın teslim edilmesi bekleniyor.",
            time: "14:30:20",
          },
          {
            role: "user",
            text: "Harika, teşekkür ederim!",
            time: "14:30:28",
          },
          {
            role: "agent",
            text: "Rica ederim, iyi günler dilerim. Başka bir konuda yardım ister misiniz?",
            time: "14:30:32",
          },
          {
            role: "user",
            text: "Hayır, hepsi bu kadar. Güle güle.",
            time: "14:30:37",
          },
        ],
      },
      {
        id: "call_d4e5f6",
        time: "2024-03-21 13:12",
        duration: "1:15",
        direction: "Gelen",
        status: "Başarılı",
        sentiment: "Nötr",
        cost: "$0.009",
        callerNumber: "+90 542 999 88 77",
        transcript: [
          {
            role: "agent",
            text: "Merhaba, Calling AI Müşteri Destek hattına hoş geldiniz. Size nasıl yardımcı olabilirim?",
            time: "13:12:01",
          },
          {
            role: "user",
            text: "İade yapmak istiyorum.",
            time: "13:12:08",
          },
          {
            role: "agent",
            text: "Anladım. İade talebinizi kayıt altına aldım. Detayları için size SMS gönderilecek.",
            time: "13:12:18",
          },
          {
            role: "user",
            text: "Tamam, teşekkürler.",
            time: "13:12:22",
          },
        ],
      },
      {
        id: "call_g7h8i9",
        time: "2024-03-21 11:05",
        duration: "0:28",
        direction: "Gelen",
        status: "Cevapsız",
        sentiment: "Belirsiz",
        cost: "$0.000",
        callerNumber: "+90 505 777 66 55",
        transcript: [],
      },
      {
        id: "call_m4n5o6",
        time: "2024-03-20 16:44",
        duration: "2:55",
        direction: "Giden",
        status: "Başarılı",
        sentiment: "Pozitif",
        cost: "$0.032",
        callerNumber: "+90 530 444 33 22",
        transcript: [
          {
            role: "agent",
            text: "Merhaba, sizi arıyorum. Memnuniyet anketimize katılmak ister misiniz? Sadece 2 dakika sürecek.",
            time: "16:44:05",
          },
          {
            role: "user",
            text: "Evet, tabii ki.",
            time: "16:44:10",
          },
          {
            role: "agent",
            text: "Hizmetimizi 1 ile 10 arasında kaç puan verir siniz?",
            time: "16:44:15",
          },
          {
            role: "user",
            text: "9 puan veririm, gayet iyiydi.",
            time: "16:44:21",
          },
          {
            role: "agent",
            text: "Teşekkür ederiz! Görüşünüz bizim için çok değerli. İyi günler dileriz.",
            time: "16:44:28",
          },
        ],
      },
      {
        id: "call_p7q8r9",
        time: "2024-03-20 10:30",
        duration: "0:48",
        direction: "Gelen",
        status: "Başarısız",
        sentiment: "Negatif",
        cost: "$0.005",
        callerNumber: "+90 312 222 11 00",
        transcript: [
          {
            role: "agent",
            text: "Merhaba, Calling AI Müşteri Destek hattına hoş geldiniz. Size nasıl yardımcı olabilirim?",
            time: "10:30:01",
          },
          {
            role: "user",
            text: "Bu ne biçim hizmet, bana yanlış ürün gönderildi!",
            time: "10:30:08",
          },
          {
            role: "agent",
            text: "Özür dilerim, bu konuda yardımcı olmak istiyorum. Sipariş numaranızı öğrenebilir miyim?",
            time: "10:30:18",
          },
          {
            role: "user",
            text: "Beklemek istemiyorum, insan operatöre bağla!",
            time: "10:30:25",
          },
          {
            role: "agent",
            text: "Anladım, sizi hemen bir temsilciye bağlıyorum, lütfen bekleyiniz...",
            time: "10:30:30",
          },
        ],
      },
    ],
  },
  num_002: {
    id: "num_002",
    number: "+1 415 234 5678",
    friendlyName: "Satış Hattı",
    country: "ABD",
    countryCode: "US",
    status: "Aktif",
    agentName: "Satış Asistanı",
    capabilities: ["Sesli"],
    inboundCalls: 89,
    outboundCalls: 214,
    monthlyCost: "$15.00",
    purchasedAt: "1 Şubat 2024",
    sid: "PN9z8y7x6w5v4u3t2s1r0q",
    calls: [
      {
        id: "call_j1k2l3",
        time: "2024-03-21 16:00",
        duration: "5:30",
        direction: "Giden",
        status: "Başarılı",
        sentiment: "Pozitif",
        cost: "$0.055",
        callerNumber: "+1 650 333 4444",
        transcript: [
          {
            role: "agent",
            text: "Hello, this is Calling AI Sales line. How can I help you today?",
            time: "16:00:03",
          },
          {
            role: "user",
            text: "Hi, I received your call about the enterprise plan.",
            time: "16:00:09",
          },
          {
            role: "agent",
            text: "Yes, I wanted to share some exciting new features we've added to our enterprise tier. Do you have a few minutes?",
            time: "16:00:18",
          },
          {
            role: "user",
            text: "Sure, go ahead.",
            time: "16:00:22",
          },
          {
            role: "agent",
            text: "Our enterprise plan now includes unlimited agents, priority support, and custom AI model fine-tuning.",
            time: "16:00:30",
          },
          {
            role: "user",
            text: "That sounds interesting. Can you send me the pricing details?",
            time: "16:00:42",
          },
          {
            role: "agent",
            text: "Absolutely, I'll send a detailed proposal to your email right away. Thank you for your time!",
            time: "16:00:50",
          },
        ],
      },
    ],
  },
  num_003: {
    id: "num_003",
    number: "+44 20 7946 0321",
    friendlyName: "İngiltere Destek",
    country: "İngiltere",
    countryCode: "GB",
    status: "Pasif",
    agentName: null,
    capabilities: ["Sesli", "SMS"],
    inboundCalls: 0,
    outboundCalls: 0,
    monthlyCost: "$12.00",
    purchasedAt: "1 Mart 2024",
    sid: "PN1a2b3c4d5e6f7g8h9i0j",
    calls: [],
  },
};

const sentimentConfig = {
  Pozitif: { dot: "bg-success", label: "text-success" },
  Nötr: { dot: "bg-muted-foreground", label: "text-muted-foreground" },
  Negatif: { dot: "bg-destructive", label: "text-destructive" },
  Belirsiz: {
    dot: "bg-muted-foreground/40",
    label: "text-muted-foreground/60",
  },
};

const callStatusConfig = {
  Başarılı: { variant: "success" as const },
  Başarısız: { variant: "destructive" as const },
  Cevapsız: { variant: "secondary" as const },
};

function TranscriptLine({ line }: { line: CallTranscriptLine }) {
  const isAgent = line.role === "agent";
  return (
    <div
      className={cn("flex gap-3", isAgent ? "justify-start" : "justify-end")}
    >
      {isAgent && (
        <div className="bg-primary/10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
          <Bot className="text-primary h-3 w-3" />
        </div>
      )}
      <div
        className={cn(
          "max-w-[70%] rounded-2xl px-3.5 py-2.5",
          isAgent
            ? "bg-secondary text-foreground rounded-tl-sm"
            : "bg-primary text-primary-foreground rounded-tr-sm",
        )}
      >
        <p className="text-[12px] leading-relaxed">{line.text}</p>
        <p
          className={cn(
            "mt-1 text-[10px]",
            isAgent ? "text-muted-foreground" : "text-primary-foreground/60",
          )}
        >
          {line.time}
        </p>
      </div>
      {!isAgent && (
        <div className="bg-muted mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
          <User className="text-muted-foreground h-3 w-3" />
        </div>
      )}
    </div>
  );
}

function CallDetailRow({ call }: { call: CallRecord }) {
  const [expanded, setExpanded] = useState(false);
  const sentiment = sentimentConfig[call.sentiment];
  const status = callStatusConfig[call.status];

  return (
    <div
      className={cn(
        "border-border/40 bg-card overflow-hidden rounded-xl border transition-shadow",
        expanded && "shadow-md",
      )}
    >
      {/* Row Header */}
      <button
        type="button"
        onClick={() => setExpanded(p => !p)}
        className={cn(
          "hover:bg-secondary/50 flex w-full items-center gap-4 px-5 py-4 text-left transition-colors",
          expanded && "bg-secondary/30",
        )}
      >
        <div
          className={cn(
            "bg-secondary flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors",
            expanded && "bg-primary/10",
          )}
        >
          <ChevronRight
            className={cn(
              "text-muted-foreground h-4 w-4 transition-transform duration-200",
              expanded && "text-primary rotate-90",
            )}
          />
        </div>

        {/* Call Info Grid */}
        <div className="flex flex-1 flex-wrap items-center gap-x-8 gap-y-2">
          <div>
            <p className="font-mono text-xs font-bold tracking-tight">
              {call.time}
            </p>
            <p className="text-muted-foreground text-[10px]">
              {call.callerNumber}
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <Phone
              className={cn(
                "h-3.5 w-3.5",
                call.direction === "Gelen"
                  ? "text-blue-400"
                  : "text-orange-400",
              )}
            />
            <Badge
              variant="outline"
              className={cn(
                "rounded-md px-2 py-0 text-[10px] font-bold uppercase",
                call.direction === "Gelen"
                  ? "border-blue-500/20 bg-blue-500/10 text-blue-400"
                  : "border-orange-500/20 bg-orange-500/10 text-orange-400",
              )}
            >
              {call.direction}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-xs font-semibold">
              {call.duration}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <div className={cn("h-1.5 w-1.5 rounded-full", sentiment.dot)} />
            <span className={cn("text-[11px] font-semibold", sentiment.label)}>
              {call.sentiment}
            </span>
          </div>

          <span className="text-primary font-mono text-xs font-bold">
            {call.cost}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Badge
            // biome-ignore lint/suspicious/noExplicitAny: <>
            variant={status.variant as any}
            className="px-2 py-0.5 text-[10px] font-black tracking-wider uppercase"
          >
            {call.status}
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground h-7 w-7"
            onClick={e => e.stopPropagation()}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </button>

      {/* Transcript */}
      {expanded && (
        <div className="border-border/30 border-t px-5 py-5">
          {call.transcript.length === 0 ? (
            <div className="text-muted-foreground flex flex-col items-center justify-center py-8 text-sm">
              <Phone className="mb-2 h-8 w-8 opacity-20" />
              <p>Bu çağrı için konuşma metni bulunmamaktadır.</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 flex h-5 w-5 items-center justify-center rounded">
                    <Bot className="text-primary h-3 w-3" />
                  </div>
                  <span className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
                    Konuşma Geçmişi · {call.transcript.length} mesaj
                  </span>
                </div>
              </div>

              <div className="border-border/40 bg-background/70 rounded-2xl border p-3 sm:p-4">
                <div className="space-y-2.5">
                  {call.transcript.map((line, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: <>
                    <TranscriptLine key={i} line={line} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const NumberDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const number = id ? mockData[id] : undefined;

  if (!number) {
    return (
      <div className="bg-background flex h-full flex-col">
        <DashboardHeader>
          <Link to="/dashboard/numbers">
            <Button variant="ghost" size="sm" className="gap-2 text-xs">
              <ArrowLeft className="h-3.5 w-3.5" />
              Geri Dön
            </Button>
          </Link>
        </DashboardHeader>
        <div className="text-muted-foreground flex flex-1 flex-col items-center justify-center">
          <Phone className="mb-3 h-12 w-12 opacity-20" />
          <p className="text-sm">Numara bulunamadı.</p>
        </div>
      </div>
    );
  }

  const totalCalls = number.inboundCalls + number.outboundCalls;
  const successRate =
    number.calls.length > 0
      ? Math.round(
          (number.calls.filter(c => c.status === "Başarılı").length /
            number.calls.length) *
            100,
        )
      : 0;

  return (
    <div className="bg-background animate-in fade-in flex h-full flex-col duration-500">
      {/* Header */}
      <DashboardHeader>
        <div className="flex items-center gap-3">
          <Link to="/dashboard/numbers">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-lg">
            <Phone className="text-primary h-4 w-4" />
          </div>
          <div>
            <h1 className="font-mono text-sm font-bold tracking-tight">
              {number.number}
            </h1>
            <p className="text-muted-foreground text-[11px]">
              {number.friendlyName}
            </p>
          </div>
          <Badge
            variant="outline"
            className={cn(
              "px-2 py-0 text-[10px] font-bold",
              number.status === "Aktif"
                ? "bg-success/10 text-success border-success/20"
                : "bg-muted text-muted-foreground border-border",
            )}
          >
            {number.status}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="border-border bg-secondary/50 h-8 gap-2 border text-xs font-semibold"
          >
            <Settings className="h-3.5 w-3.5" />
            Ayarlar
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground h-8 w-8"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </DashboardHeader>

      <div className="scrollbar-thin flex-1 overflow-y-auto">
        {/* Number Info Cards */}
        <div className="border-border/50 bg-border/30 grid grid-cols-2 gap-px border-b sm:grid-cols-4">
          {[
            { label: "Toplam Çağrı", value: String(totalCalls) },
            { label: "Gelen", value: String(number.inboundCalls) },
            { label: "Giden", value: String(number.outboundCalls) },
            { label: "Başarı Oranı", value: `%${successRate}` },
          ].map(stat => (
            <div key={stat.label} className="bg-background px-6 py-4">
              <p className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
                {stat.label}
              </p>
              <p className="text-foreground mt-1 text-2xl font-bold">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Info Row */}
        <div className="border-border/50 bg-secondary/10 flex flex-wrap items-center gap-6 border-b px-6 py-3">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
              Ülke
            </span>
            <span className="text-foreground text-xs font-semibold">
              {number.country} ({number.countryCode})
            </span>
          </div>
          <div className="bg-border h-4 w-px" />
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
              Özellikler
            </span>
            <div className="flex gap-1">
              {number.capabilities.map(cap => (
                <Badge
                  key={cap}
                  variant="outline"
                  className="bg-secondary/50 border-border/50 px-2 py-0 text-[10px] font-bold"
                >
                  {cap}
                </Badge>
              ))}
            </div>
          </div>
          <div className="bg-border h-4 w-px" />
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
              Ajan
            </span>
            {number.agentName ? (
              <div className="flex items-center gap-1.5">
                <Bot className="text-primary h-3.5 w-3.5" />
                <span className="text-foreground text-xs font-semibold">
                  {number.agentName}
                </span>
                <Link to="/dashboard/agent">
                  <ExternalLink className="text-muted-foreground h-3 w-3" />
                </Link>
              </div>
            ) : (
              <span className="text-muted-foreground/50 text-xs">
                Atanmamış
              </span>
            )}
          </div>
          <div className="bg-border h-4 w-px" />
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
              Aylık Maliyet
            </span>
            <span className="text-primary font-mono text-xs font-bold">
              {number.monthlyCost}
            </span>
          </div>
          <div className="bg-border h-4 w-px" />
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
              SID
            </span>
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(number.sid)}
              className="text-muted-foreground/60 hover:text-foreground flex items-center gap-1 font-mono text-[11px] transition-colors"
            >
              <span>{number.sid.slice(0, 20)}...</span>
              <Copy className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Calls Section */}
        <div className="px-6 py-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
              Konuşmalar ({number.calls.length})
            </h2>
          </div>

          {number.calls.length === 0 ? (
            <div className="text-muted-foreground border-border/30 flex flex-col items-center justify-center rounded-xl border py-16 text-sm">
              <Phone className="mb-3 h-10 w-10 opacity-20" />
              <p>Henüz konuşma kaydı bulunmamaktadır.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {number.calls.map(call => (
                <CallDetailRow key={call.id} call={call} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NumberDetailPage;
