import { Code, Info, Mic, PhoneCall } from "lucide-react";
import { Button } from "~/components/ui/button";

const MessagesSquare = ({ className }: { className?: string }) => (
  // biome-ignore lint/a11y/noSvgWithoutTitle: <>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <path d="M13 8H7" />
    <path d="M13 12H7" />
  </svg>
);

export const TestingPanel = () => {
  return (
    <div className="bg-card border-border relative flex w-1/3 flex-col overflow-hidden rounded-xl border shadow-lg">
      <div className="border-border bg-secondary/30 flex items-center justify-between rounded-t-xl border-b p-2 backdrop-blur-sm">
        <div className="bg-background/50 border-border flex flex-1 space-x-1 rounded-lg border p-1 shadow-inner">
          <button
            type="button"
            className="bg-background flex flex-1 items-center justify-center space-x-2 rounded-md px-3 py-1.5 text-xs font-bold shadow-sm transition-all"
          >
            <PhoneCall className="text-primary h-3.5 w-3.5" />
            <span>Ses Testi</span>
          </button>
          <button
            type="button"
            className="text-muted-foreground hover:bg-background/80 flex flex-1 items-center justify-center space-x-2 rounded-md px-3 py-1.5 text-xs font-bold transition-all"
          >
            <MessagesSquare className="h-3.5 w-3.5" />
            <span>Sohbet Testi</span>
          </button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:bg-background/80 ml-2 h-8 w-8"
        >
          <Code className="h-4 w-4" />
        </Button>
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center p-8 text-center">
        <div className="bg-primary/5 group relative mb-6 flex h-20 w-20 items-center justify-center rounded-full">
          <div className="bg-primary/10 absolute inset-0 animate-ping rounded-full opacity-20" />
          <div className="from-primary to-primary/80 shadow-primary/20 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br shadow-xl transition-transform group-hover:scale-105">
            <Mic className="h-8 w-8 text-white" />
          </div>
        </div>

        <h3 className="mb-2 text-xl font-bold tracking-tight">
          Temsilciyi Test Et
        </h3>
        <p className="text-muted-foreground mb-8 max-w-65 text-sm font-medium">
          Yapılandırmanızın nasıl çalıştığını gerçek zamanlı olarak
          deneyimleyin.
        </p>

        <div className="bg-primary/5 text-primary border-primary/10 mb-8 flex items-center space-x-2 rounded-full border px-4 py-2 text-[11px] font-bold">
          <Info className="h-3.5 w-3.5" />
          <span>Web aramalarında çağrı aktarma desteklenmez.</span>
        </div>

        <Button
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-10 font-bold shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Testi Başlat
        </Button>
      </div>

      {/* Decorative background pulse for testing panel */}
      <div className="bg-primary/5 pointer-events-none absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full blur-[80px]" />
    </div>
  );
};
