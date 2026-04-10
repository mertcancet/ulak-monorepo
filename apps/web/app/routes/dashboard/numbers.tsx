import {
  Bot,
  Check,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Filter,
  Globe,
  Loader2,
  MoreHorizontal,
  Phone,
  Plus,
  RotateCw,
  Search,
  User,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
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

interface PhoneNumber {
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
  calls: CallRecord[];
}

interface AddNumberSearchState {
  country: string;
  numberType: "Yerel" | "Ücretsiz" | "Mobil";
  areaCode: string;
  label: string;
}

interface AvailableNumber {
  number: string;
  region: string;
  type: "Yerel" | "Ücretsiz" | "Mobil";
  capabilities: string[];
  monthlyCost: string;
}

const mockNumbers: PhoneNumber[] = [
  {
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
    purchasedAt: "2024-01-15",
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
          { role: "user", text: "İade yapmak istiyorum.", time: "13:12:08" },
          {
            role: "agent",
            text: "Anladım. İade talebinizi kayıt altına aldım. Detayları için size SMS gönderilecek.",
            time: "13:12:18",
          },
          { role: "user", text: "Tamam, teşekkürler.", time: "13:12:22" },
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
    ],
  },
  {
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
    purchasedAt: "2024-02-01",
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
          { role: "user", text: "Sure, go ahead.", time: "16:00:22" },
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
  {
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
    purchasedAt: "2024-03-01",
    calls: [],
  },
];

const mockAvailableNumbers: AvailableNumber[] = [
  {
    number: "+90 850 987 65 43",
    region: "Istanbul",
    type: "Yerel",
    capabilities: ["Sesli", "SMS"],
    monthlyCost: "$8.00",
  },
  {
    number: "+90 212 444 12 34",
    region: "Istanbul",
    type: "Yerel",
    capabilities: ["Sesli"],
    monthlyCost: "$6.00",
  },
  {
    number: "+90 312 500 22 44",
    region: "Ankara",
    type: "Yerel",
    capabilities: ["Sesli", "SMS"],
    monthlyCost: "$8.00",
  },
  {
    number: "+90 800 123 45 67",
    region: "Ulusal",
    type: "Ücretsiz",
    capabilities: ["Sesli"],
    monthlyCost: "$15.00",
  },
  {
    number: "+1 415 700 8899",
    region: "San Francisco",
    type: "Yerel",
    capabilities: ["Sesli"],
    monthlyCost: "$10.00",
  },
];

const supportedCountries = [
  { name: "Türkiye", prefix: "+90" },
  { name: "Amerika Birleşik Devletleri", prefix: "+1" },
  { name: "Ingiltere", prefix: "+44" },
  { name: "Almanya", prefix: "+49" },
];

const statusConfig = {
  Aktif: {
    label: "Aktif",
    className: "bg-success/10 text-success border-success/20",
  },
  Pasif: {
    label: "Pasif",
    className: "bg-muted text-muted-foreground border-border",
  },
};

const sentimentConfig = {
  Pozitif: { dot: "bg-success" },
  Nötr: { dot: "bg-muted-foreground" },
  Negatif: { dot: "bg-destructive" },
  Belirsiz: { dot: "bg-muted-foreground/40" },
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
          "max-w-[75%] rounded-2xl px-3 py-2",
          isAgent
            ? "bg-secondary text-foreground rounded-tl-sm"
            : "bg-primary text-primary-foreground rounded-tr-sm",
        )}
      >
        <p className="text-[12px] leading-relaxed">{line.text}</p>
        <p
          className={cn(
            "mt-0.5 text-[10px]",
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

function CallRow({ call }: { call: CallRecord }) {
  const [expanded, setExpanded] = useState(false);
  const sentimentDot = sentimentConfig[call.sentiment];
  const statusConf = callStatusConfig[call.status];

  return (
    <div className="border-border/50 overflow-hidden rounded-lg border">
      <button
        type="button"
        onClick={() => setExpanded(p => !p)}
        className={cn(
          "hover:bg-secondary/60 flex w-full items-center gap-3 px-4 py-3 text-left transition-colors",
          expanded && "bg-secondary/40",
        )}
      >
        <ChevronRight
          className={cn(
            "text-muted-foreground h-3.5 w-3.5 shrink-0 transition-transform duration-200",
            expanded && "rotate-90",
          )}
        />

        <div className="flex flex-1 flex-wrap items-center gap-x-6 gap-y-1">
          <span className="min-w-32 font-mono text-xs font-bold tracking-tight whitespace-nowrap">
            {call.time}
          </span>

          <span className="text-muted-foreground min-w-12 text-xs font-semibold">
            {call.duration}
          </span>

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

          <div className="flex items-center gap-1.5">
            <div className={cn("h-1.5 w-1.5 rounded-full", sentimentDot.dot)} />
            <span className="text-muted-foreground text-[11px] font-semibold">
              {call.sentiment}
            </span>
          </div>

          <span className="text-muted-foreground/60 font-mono text-[11px]">
            {call.callerNumber}
          </span>

          <span className="text-primary font-mono text-xs font-bold">
            {call.cost}
          </span>
        </div>

        <Badge
          // biome-ignore lint/suspicious/noExplicitAny: <>
          variant={statusConf.variant as any}
          className="px-2 py-0.5 text-[10px] font-black tracking-wider uppercase"
        >
          {call.status}
        </Badge>
      </button>

      {expanded && (
        <div className="border-border/30 border-t px-4 py-4">
          {call.transcript.length === 0 ? (
            <p className="text-muted-foreground py-4 text-center text-xs">
              Bu çağrı için konuşma kaydı bulunmamaktadır.
            </p>
          ) : (
            <div className="space-y-3">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
                  Konuşma Geçmişi
                </span>
                <span className="text-muted-foreground text-[10px]">
                  {call.transcript.length} mesaj
                </span>
              </div>
              <div className="space-y-2">
                {call.transcript.map((line, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: <>
                  <TranscriptLine key={i} line={line} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function NumberRow({ number }: { number: PhoneNumber }) {
  const [expanded, setExpanded] = useState(false);
  const statusConf = statusConfig[number.status];

  return (
    <div className="border-border/50 overflow-hidden rounded-xl border transition-shadow hover:shadow-sm">
      {/* Main Row */}
      <div className="bg-card flex items-center gap-4 px-5 py-4">
        {/* Expand Toggle */}
        <button
          type="button"
          onClick={() => setExpanded(p => !p)}
          className="text-muted-foreground hover:text-foreground shrink-0 transition-colors"
          aria-label="Konuşmaları Göster"
        >
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              expanded && "rotate-180",
            )}
          />
        </button>

        {/* Phone Icon */}
        <div className="bg-primary/10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
          <Phone className="text-primary h-4 w-4" />
        </div>

        {/* Number Info */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-sm font-bold tracking-tight">
              {number.number}
            </span>
            <Badge
              variant="outline"
              className={cn(
                "px-2 py-0 text-[10px] font-bold",
                statusConf.className,
              )}
            >
              {statusConf.label}
            </Badge>
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
          <p className="text-muted-foreground mt-0.5 text-[11px]">
            {number.friendlyName} · {number.country}
          </p>
        </div>

        {/* Agent */}
        <div className="hidden min-w-28 sm:block">
          {number.agentName ? (
            <div className="flex items-center gap-1.5">
              <Bot className="text-primary h-3.5 w-3.5 shrink-0" />
              <span className="text-foreground/80 truncate text-xs font-semibold">
                {number.agentName}
              </span>
            </div>
          ) : (
            <span className="text-muted-foreground/50 text-xs">
              Ajan atanmamış
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="hidden gap-6 sm:flex">
          <div className="text-center">
            <p className="text-foreground text-sm font-bold">
              {number.inboundCalls}
            </p>
            <p className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
              Gelen
            </p>
          </div>
          <div className="text-center">
            <p className="text-foreground text-sm font-bold">
              {number.outboundCalls}
            </p>
            <p className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
              Giden
            </p>
          </div>
        </div>

        {/* Cost */}
        <div className="hidden text-right sm:block">
          <p className="text-primary font-mono text-sm font-bold">
            {number.monthlyCost}
          </p>
          <p className="text-muted-foreground text-[10px]">/ ay</p>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-1">
          <Link to={`/dashboard/numbers/${number.id}`}>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground h-8 w-8"
              title="Detay"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground h-8 w-8"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Expanded Calls Section */}
      {expanded && (
        <div className="border-border/30 border-t px-5 py-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
              Konuşmalar ({number.calls.length})
            </span>
            <Link
              to={`/dashboard/numbers/${number.id}`}
              className="text-primary text-[11px] font-semibold hover:underline"
            >
              Tümünü Gör →
            </Link>
          </div>

          {number.calls.length === 0 ? (
            <div className="text-muted-foreground bg-secondary/30 rounded-lg py-6 text-center text-xs">
              Bu numara için henüz konuşma kaydı bulunmamaktadır.
            </div>
          ) : (
            <div className="space-y-2">
              {number.calls.map(call => (
                <CallRow key={call.id} call={call} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function AddNumberDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [step, setStep] = useState<1 | 2>(1);
  const [isSearching, setIsSearching] = useState(false);
  const [searchState, setSearchState] = useState<AddNumberSearchState>({
    country: "Türkiye",
    numberType: "Yerel",
    areaCode: "",
    label: "",
  });
  const [selectedNumber, setSelectedNumber] = useState<string>("");

  const updateField = <K extends keyof AddNumberSearchState>(
    field: K,
    value: AddNumberSearchState[K],
  ) => {
    setSearchState(state => ({ ...state, [field]: value }));
  };

  const handleClose = (nextOpen: boolean) => {
    if (nextOpen) {
      onOpenChange(true);
      return;
    }

    onOpenChange(false);
    setTimeout(() => {
      setStep(1);
      setIsSearching(false);
      setSelectedNumber("");
      setSearchState({
        country: "Türkiye",
        numberType: "Yerel",
        areaCode: "",
        label: "",
      });
    }, 200);
  };

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setStep(2);
    }, 700);
  };

  const handleSubmit = () => {
    onOpenChange(false);
  };

  const selectedCountry = supportedCountries.find(
    country => country.name === searchState.country,
  );

  const filteredNumbers = mockAvailableNumbers.filter(number => {
    const typeMatches =
      searchState.numberType === "Yerel"
        ? number.type === "Yerel"
        : number.type === searchState.numberType;

    const countryMatches =
      searchState.country === "Türkiye"
        ? number.number.startsWith("+90")
        : searchState.country === "Amerika Birleşik Devletleri"
          ? number.number.startsWith("+1")
          : searchState.country === "Ingiltere"
            ? number.number.startsWith("+44")
            : true;

    const areaMatches = searchState.areaCode.trim()
      ? number.number.includes(searchState.areaCode.trim())
      : true;

    return typeMatches && countryMatches && areaMatches;
  });

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="border-border/60 bg-background max-w-xl rounded-3xl p-0">
        <DialogHeader className="border-border/50 gap-3 border-b px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-2xl">
              <Phone className="text-primary h-4 w-4" />
            </div>
            <div>
              <DialogTitle className="text-base font-bold tracking-tight">
                Numara Ekle
              </DialogTitle>
              <DialogDescription className="mt-1 text-xs">
                {step === 1
                  ? "Ulke ve numara tipine gore uygun numaralari ara."
                  : "Uygun numaralardan birini secip eklemeyi tamamla."}
              </DialogDescription>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-black",
                  step === 1
                    ? "bg-primary text-white"
                    : "bg-success/15 text-success",
                )}
              >
                {step === 1 ? 1 : <Check className="h-3.5 w-3.5" />}
              </div>
              <span className="text-xs font-semibold">Kriterler</span>
            </div>
            <div className="bg-border h-px flex-1" />
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-black",
                  step === 2
                    ? "bg-primary text-white"
                    : "bg-secondary text-muted-foreground",
                )}
              >
                2
              </div>
              <span className="text-xs font-semibold">Numara Sec</span>
            </div>
          </div>
        </DialogHeader>

        <div className="grid gap-5 px-6 py-5">
          {step === 1 ? (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <label htmlFor="number-country" className="grid gap-2">
                  <span className="text-muted-foreground text-[11px] font-bold tracking-widest uppercase">
                    Ulke
                  </span>
                  <select
                    id="number-country"
                    value={searchState.country}
                    onChange={e => updateField("country", e.target.value)}
                    className="bg-background border-border text-foreground focus:border-ring focus:ring-ring/20 rounded-xl border px-3 py-2.5 text-sm outline-none focus:ring-2"
                  >
                    {supportedCountries.map(country => (
                      <option key={country.name}>{country.name}</option>
                    ))}
                  </select>
                </label>

                <label htmlFor="number-type" className="grid gap-2">
                  <span className="text-muted-foreground text-[11px] font-bold tracking-widest uppercase">
                    Numara Tipi
                  </span>
                  <select
                    id="number-type"
                    value={searchState.numberType}
                    onChange={e =>
                      updateField(
                        "numberType",
                        e.target.value as AddNumberSearchState["numberType"],
                      )
                    }
                    className="bg-background border-border text-foreground focus:border-ring focus:ring-ring/20 rounded-xl border px-3 py-2.5 text-sm outline-none focus:ring-2"
                  >
                    <option>Yerel</option>
                    <option>Ücretsiz</option>
                    <option>Mobil</option>
                  </select>
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-[1fr_1.2fr]">
                <label htmlFor="number-area-code" className="grid gap-2">
                  <span className="text-muted-foreground text-[11px] font-bold tracking-widest uppercase">
                    Alan Kodu
                  </span>
                  <div className="bg-background border-border focus-within:border-ring focus-within:ring-ring/20 flex items-center gap-2 rounded-xl border px-3 py-2.5 focus-within:ring-2">
                    <Globe className="text-muted-foreground h-4 w-4 shrink-0" />
                    <span className="text-muted-foreground text-sm">
                      {selectedCountry?.prefix}
                    </span>
                    <input
                      id="number-area-code"
                      type="text"
                      value={searchState.areaCode}
                      onChange={e => updateField("areaCode", e.target.value)}
                      placeholder="850, 212..."
                      className="text-foreground placeholder:text-muted-foreground w-full bg-transparent text-sm outline-none"
                    />
                  </div>
                </label>

                <label htmlFor="number-label" className="grid gap-2">
                  <span className="text-muted-foreground text-[11px] font-bold tracking-widest uppercase">
                    Kolay Isim
                  </span>
                  <input
                    id="number-label"
                    type="text"
                    value={searchState.label}
                    onChange={e => updateField("label", e.target.value)}
                    placeholder="Orn. Destek hatti"
                    className="bg-background border-border placeholder:text-muted-foreground text-foreground focus:border-ring focus:ring-ring/20 rounded-xl border px-3 py-2.5 text-sm outline-none focus:ring-2"
                  />
                </label>
              </div>

              <div className="bg-secondary/30 border-border/50 rounded-2xl border p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-muted-foreground text-[11px] font-bold tracking-widest uppercase">
                    Arama Ozeti
                  </span>
                  <span className="text-primary text-xs font-bold">
                    {searchState.numberType}
                  </span>
                </div>
                <div className="text-muted-foreground grid gap-1.5 text-xs">
                  <p>Ulke: {searchState.country}</p>
                  <p>Prefix: {selectedCountry?.prefix}</p>
                  <p>
                    Alan kodu: {searchState.areaCode.trim() || "Belirtilmedi"}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="grid gap-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">Uygun numaralar</p>
                  <p className="text-muted-foreground text-xs">
                    {filteredNumbers.length} sonuc bulundu
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-muted-foreground hover:text-foreground text-xs font-semibold transition-colors"
                >
                  Geri don
                </button>
              </div>

              <div className="grid max-h-80 gap-2 overflow-y-auto pr-1">
                {filteredNumbers.length === 0 ? (
                  <div className="text-muted-foreground bg-secondary/30 border-border/50 rounded-2xl border px-4 py-8 text-center text-sm">
                    Bu kriterlere uygun numara bulunamadi.
                  </div>
                ) : (
                  filteredNumbers.map(number => (
                    <button
                      key={number.number}
                      type="button"
                      onClick={() => setSelectedNumber(number.number)}
                      className={cn(
                        "border-border/60 bg-background hover:border-border flex items-center justify-between rounded-2xl border px-4 py-3 text-left transition-colors",
                        selectedNumber === number.number &&
                          "border-primary/40 bg-primary/5",
                      )}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-bold">
                            {number.number}
                          </span>
                          <Badge variant="outline" className="text-[10px]">
                            {number.type}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mt-1 text-xs">
                          {number.region} · {number.capabilities.join(", ")}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-primary font-mono text-sm font-bold">
                          {number.monthlyCost}
                        </span>
                        <div
                          className={cn(
                            "flex h-5 w-5 items-center justify-center rounded-full border",
                            selectedNumber === number.number
                              ? "border-primary bg-primary text-white"
                              : "border-border bg-background",
                          )}
                        >
                          {selectedNumber === number.number && (
                            <Check className="h-3 w-3" />
                          )}
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="border-border/50 flex items-center justify-between border-t px-6 py-4">
          <Button variant="outline" onClick={() => handleClose(false)}>
            Vazgec
          </Button>

          {step === 1 ? (
            <Button
              onClick={handleSearch}
              className="gap-2"
              disabled={isSearching}
            >
              {isSearching ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Araniyor
                </>
              ) : (
                <>
                  <Search className="h-3.5 w-3.5" />
                  Numara Ara
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="gap-2"
              disabled={!selectedNumber}
            >
              <Plus className="h-3.5 w-3.5" />
              Numarayi Ekle
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

const NumbersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddNumberDialogOpen, setIsAddNumberDialogOpen] = useState(false);

  const filtered = mockNumbers.filter(
    n =>
      n.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.friendlyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (n.agentName ?? "").toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalInbound = mockNumbers.reduce((s, n) => s + n.inboundCalls, 0);
  const totalOutbound = mockNumbers.reduce((s, n) => s + n.outboundCalls, 0);
  const activeNumbers = mockNumbers.filter(n => n.status === "Aktif").length;

  return (
    <div className="bg-background animate-in fade-in flex h-full flex-col duration-500">
      <AddNumberDialog
        open={isAddNumberDialogOpen}
        onOpenChange={setIsAddNumberDialogOpen}
      />

      {/* Header */}
      <DashboardHeader>
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-lg">
            <Phone className="text-primary h-4 w-4" />
          </div>
          <h1 className="text-sm font-bold tracking-tight">
            Telefon Numaraları
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:bg-secondary h-8 w-8"
          >
            <RotateCw className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="border-border bg-secondary/50 h-8 gap-2 border text-xs font-semibold"
          >
            <Filter className="h-3.5 w-3.5" />
            Filtrele
          </Button>
          <Button
            size="sm"
            className="h-8 gap-2 text-xs font-bold"
            onClick={() => setIsAddNumberDialogOpen(true)}
          >
            <Plus className="h-3.5 w-3.5" />
            Numara Ekle
          </Button>
        </div>
      </DashboardHeader>

      {/* Stats Bar */}
      <div className="border-border/50 bg-secondary/20 flex shrink-0 items-center gap-8 border-b px-6 py-3">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
            Toplam
          </span>
          <span className="text-foreground text-sm font-bold">
            {mockNumbers.length}
          </span>
        </div>
        <div className="bg-border h-4 w-px" />
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
            Aktif
          </span>
          <span className="text-success text-sm font-bold">
            {activeNumbers}
          </span>
        </div>
        <div className="bg-border h-4 w-px" />
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
            Gelen Çağrı
          </span>
          <span className="text-foreground text-sm font-bold">
            {totalInbound}
          </span>
        </div>
        <div className="bg-border h-4 w-px" />
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
            Giden Çağrı
          </span>
          <span className="text-foreground text-sm font-bold">
            {totalOutbound}
          </span>
        </div>
      </div>

      {/* Search */}
      <div className="border-border/50 shrink-0 border-b px-6 py-3">
        <div className="bg-secondary/50 border-border focus-within:border-primary/50 flex items-center gap-2 rounded-lg border px-3 py-2 transition-colors">
          <Search className="text-muted-foreground h-3.5 w-3.5 shrink-0" />
          <input
            type="text"
            placeholder="Numara, isim veya ajan ara..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="text-foreground placeholder:text-muted-foreground flex-1 bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      {/* Numbers List */}
      <div className="scrollbar-thin flex-1 overflow-y-auto p-6">
        {filtered.length === 0 ? (
          <div className="text-muted-foreground flex flex-col items-center justify-center py-20 text-sm">
            <Phone className="mb-3 h-10 w-10 opacity-20" />
            <p>Sonuç bulunamadı.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(number => (
              <NumberRow key={number.id} number={number} />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-border bg-card/80 shrink-0 border-t px-6 py-3 backdrop-blur-sm">
        <span className="text-muted-foreground text-[11px] font-bold tracking-widest uppercase">
          {filtered.length} numara gösteriliyor
        </span>
      </footer>
    </div>
  );
};

export default NumbersPage;
