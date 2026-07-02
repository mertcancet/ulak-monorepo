import {
  Activity,
  Calendar,
  Car,
  CheckCircle2,
  Headphones,
  Utensils,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Farklı sektörler için simülasyon verileri
const SECTOR_DATA = {
  restaurant: {
    id: "restaurant",
    label: "Restoran",
    icon: Utensils,
    phone: "+90 850 123 45 67",
    customer1:
      "Merhaba, kolay gelsin. Yarın akşam 4 kişilik bir akşam yemeği rezervasyonu yaptırmak istiyordum, yeriniz var mı?",
    aiResponse:
      "Tabii ki, yarın akşam saat 20:00 için 4 kişilik masamız müsaittir. Rezervasyonunuzu onaylamak adına isim ve soyisminizi alabilir miyim?",
    customer2: "Selin Akman, çok sevinirim.",
    action: "Rezervasyon RevoCRM'e işlendi ve onay SMS'i gönderildi.",
  },
  health: {
    id: "health",
    label: "Sağlık / Klinik",
    icon: Calendar,
    phone: "+90 212 987 65 43",
    customer1:
      "İyi günler, dermatoloji bölümünden Dr. Ahmet Bey için Cuma gününe uygun bir kontrol randevusu var mı?",
    aiResponse:
      "Cuma günü saat 14:30 ve 16:00 saatleri uygundur. Hangi saati tercih edersiniz?",
    customer2: "14:30 benim için çok uygun, teşekkürler.",
    action: "Randevu Hastane Bilgi Sistemine (HBYS) kaydedildi.",
  },
  automotive: {
    id: "automotive",
    label: "Oto Servis",
    icon: Car,
    phone: "+90 312 444 0 123",
    customer1:
      "Selamlar, 10.000 km periyodik bakımı için aracımı Cumartesi sabahı getirebilir miyim? Fiyat ne olur?",
    aiResponse:
      "Cumartesi 09:00 için randevunuzu oluşturabilirim. Aracınızın modeline göre periyodik bakım ücreti işçilik dahil 4.500 TL'dir.",
    customer2: "Tamamdır, Cumartesi sabahı orada olurum.",
    action: "Servis randevusu oluşturuldu, iş emri açıldı.",
  },
};

type SectorKey = keyof typeof SECTOR_DATA;
type BubblePhase = "hidden" | "typing" | "visible";

const ChatBubble = ({
  phase,
  text,
  align,
  label,
  labelClassName,
  bubbleClassName,
}: {
  phase: BubblePhase;
  text: string;
  align: "left" | "right";
  label: string;
  labelClassName: string;
  bubbleClassName: string;
}) => {
  if (phase === "hidden") return null;

  return (
    <div
      className={`cleon-pop-in flex max-w-[85%] flex-col space-y-1 ${
        align === "right" ? "ml-auto items-end" : "items-start"
      }`}
    >
      <span className={`px-1 text-[10px] ${labelClassName}`}>{label}</span>
      <div
        className={`rounded-2xl px-3.5 py-2.5 shadow-sm transition-[padding] duration-300 ${
          align === "right" ? "rounded-tr-none" : "rounded-tl-none"
        } ${bubbleClassName}`}
      >
        {phase === "typing" ? (
          <span className="flex items-center gap-1 py-0.5">
            <span className="cleon-dot h-1.5 w-1.5 rounded-full bg-current opacity-70 [animation-delay:0ms]" />
            <span className="cleon-dot h-1.5 w-1.5 rounded-full bg-current opacity-70 [animation-delay:160ms]" />
            <span className="cleon-dot h-1.5 w-1.5 rounded-full bg-current opacity-70 [animation-delay:320ms]" />
          </span>
        ) : (
          <span className="cleon-text-reveal block">{text}</span>
        )}
      </div>
    </div>
  );
};

const OperatorCalls = () => {
  const [activeTab, setActiveTab] = useState<SectorKey>("restaurant");
  const [runId, setRunId] = useState(0);

  const [phase1, setPhase1] = useState<BubblePhase>("hidden");
  const [waveVisible, setWaveVisible] = useState(false);
  const [phase2, setPhase2] = useState<BubblePhase>("hidden");
  const [phase3, setPhase3] = useState<BubblePhase>("hidden");
  const [actionVisible, setActionVisible] = useState(false);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPhase1("hidden");
    setWaveVisible(false);
    setPhase2("hidden");
    setPhase3("hidden");
    setActionVisible(false);

    const schedule = (fn: () => void, delay: number) => {
      timers.current.push(setTimeout(fn, delay));
    };

    schedule(() => setPhase1("typing"), 150);
    schedule(() => setPhase1("visible"), 900);

    schedule(() => setWaveVisible(true), 1500);

    schedule(() => setPhase2("typing"), 2300);
    schedule(() => setPhase2("visible"), 3200);

    schedule(() => setPhase3("typing"), 3900);
    schedule(() => setPhase3("visible"), 4500);

    schedule(() => setActionVisible(true), 5200);

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, []);

  const currentData = SECTOR_DATA[activeTab];

  const handleTabClick = (tabKey: SectorKey) => {
    setActiveTab(tabKey);
    setRunId(prev => prev + 1);
  };

  return (
    <div className="relative flex flex-col items-center gap-4 p-6">
      <style>{`
        @keyframes cleonPopIn {
          0% { opacity: 0; transform: translateY(8px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .cleon-pop-in {
          animation: cleonPopIn 320ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes cleonDotBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-3px); opacity: 1; }
        }
        .cleon-dot {
          animation: cleonDotBounce 1s ease-in-out infinite;
        }
        @keyframes cleonTextReveal {
          0% { opacity: 0; transform: translateY(2px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .cleon-text-reveal {
          animation: cleonTextReveal 260ms ease-out both;
        }
        @keyframes cleonWaveIn {
          0% { opacity: 0; transform: scaleX(0.85); }
          100% { opacity: 1; transform: scaleX(1); }
        }
        .cleon-wave-in {
          animation: cleonWaveIn 280ms ease-out both;
        }
        .cleon-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .cleon-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="flex w-[380px] gap-1 rounded-xl border border-slate-800/80 bg-slate-950/60 p-1 backdrop-blur-md">
        {(Object.keys(SECTOR_DATA) as SectorKey[]).map(tabKey => {
          const tab = SECTOR_DATA[tabKey];
          const TabIcon = tab.icon;
          const isActive = activeTab === tabKey;

          return (
            // biome-ignore lint/a11y/useButtonType: <explanation>
            <button
              key={tab.id}
              onClick={() => handleTabClick(tabKey)}
              className={`flex flex-1 flex-col items-center justify-center gap-1.5 rounded-lg py-2 text-[11px] font-medium transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-b from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/20"
                  : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
              }`}
            >
              <TabIcon
                className={`h-4 w-4 ${isActive ? "text-white" : "text-slate-500"}`}
              />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="relative flex h-[560px] w-[380px] flex-col rounded-2xl border border-slate-800/80 bg-gradient-to-b from-slate-950 to-slate-900/90 p-5 shadow-2xl backdrop-blur-md">
        <div className="pointer-events-none absolute inset-0 -m-6 rounded-3xl bg-gradient-to-tr from-blue-600/10 to-transparent blur-2xl" />

        <div className="relative flex shrink-0 items-center justify-between border-b border-slate-800/60 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-[#0091ff]">
              <Headphones className="h-4 w-4" />
              <span className="absolute -right-0.5 -top-0.5 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-200">
                CleonAI Operatör
              </div>
              <div className="flex items-center gap-1 text-[10px] text-slate-500">
                <Activity className="h-2.5 w-2.5 animate-pulse text-emerald-500" />
                Canlı Çağrı Analizi
              </div>
            </div>
          </div>
          <span className="rounded border border-slate-800 bg-slate-900 px-2 py-0.5 text-[10px] font-medium text-slate-400 transition-all duration-300">
            {currentData.phone}
          </span>
        </div>

        <div
          key={runId}
          className="cleon-scroll relative mt-5 flex-1 space-y-4 overflow-y-auto pr-1 text-xs"
        >
          {waveVisible && (
            <div className="cleon-wave-in flex items-center justify-center gap-1 py-2">
              <div className="h-1 w-6 animate-pulse rounded-full bg-blue-500/40" />
              <div className="h-3 w-1 animate-pulse rounded-full bg-[#0091ff]" />
              <div className="h-5 w-1 animate-pulse rounded-full bg-[#0091ff] [animation-delay:0.2s]" />
              <div className="h-2 w-1 animate-pulse rounded-full bg-[#0091ff] [animation-delay:0.4s]" />
              <div className="h-4 w-1 animate-pulse rounded-full bg-[#006eff] [animation-delay:0.1s]" />
              <div className="h-1 w-6 animate-pulse rounded-full bg-blue-500/40" />
            </div>
          )}
          <ChatBubble
            phase={phase1}
            text={currentData.customer1}
            align="left"
            label="Müşteri"
            labelClassName="text-slate-500"
            bubbleClassName="border border-slate-800/40 bg-slate-800/60 text-slate-300"
          />

          <ChatBubble
            phase={phase2}
            text={currentData.aiResponse}
            align="right"
            label="CleonAI"
            labelClassName="font-medium text-[#0091ff]"
            bubbleClassName="border border-blue-500/20 bg-gradient-to-r from-[#0091ff]/15 to-[#006eff]/5 text-slate-200 shadow-[0_0_15px_rgba(0,145,255,0.05)]"
          />

          <div className="pt-1">
            <ChatBubble
              phase={phase3}
              text={currentData.customer2}
              align="left"
              label="Müşteri"
              labelClassName="text-slate-500"
              bubbleClassName="border border-slate-800/40 bg-slate-800/60 text-slate-300"
            />
          </div>

          {actionVisible && (
            <div className="cleon-pop-in flex items-center gap-2 rounded-xl border border-emerald-500/10 bg-emerald-500/5 px-3 py-2 text-[11px] text-emerald-400">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>
                <strong>Aksiyon:</strong> {currentData.action}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OperatorCalls;
