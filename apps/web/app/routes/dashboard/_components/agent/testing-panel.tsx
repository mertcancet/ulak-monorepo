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
    <div className="w-1/3 flex flex-col bg-card border border-border rounded-xl shadow-lg overflow-hidden relative">
      <div className="p-2 border-b border-border flex items-center justify-between bg-secondary/30 backdrop-blur-sm">
        <div className="flex space-x-1 bg-background/50 p-1 rounded-lg border border-border flex-1 shadow-inner">
          <button
            type="button"
            className="flex-1 flex items-center justify-center space-x-2 py-1.5 px-3 bg-background shadow-sm rounded-md text-xs font-bold transition-all"
          >
            <PhoneCall className="w-3.5 h-3.5 text-primary" />
            <span>Ses Testi</span>
          </button>
          <button
            type="button"
            className="flex-1 flex items-center justify-center space-x-2 py-1.5 px-3 text-muted-foreground text-xs font-bold hover:bg-background/80 rounded-md transition-all"
          >
            <MessagesSquare className="w-3.5 h-3.5" />
            <span>Sohbet Testi</span>
          </button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="ml-2 h-8 w-8 text-muted-foreground hover:bg-background/80"
        >
          <Code className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative z-10">
        <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mb-6 relative group">
          <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping opacity-20" />
          <div className="w-16 h-16 bg-linear-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-xl shadow-primary/20 transition-transform group-hover:scale-105">
            <Mic className="text-white w-8 h-8" />
          </div>
        </div>

        <h3 className="text-xl font-bold tracking-tight mb-2">
          Temsilciyi Test Et
        </h3>
        <p className="text-sm text-muted-foreground max-w-65 mb-8 font-medium">
          Yapılandırmanızın nasıl çalıştığını gerçek zamanlı olarak
          deneyimleyin.
        </p>

        <div className="bg-primary/5 text-primary text-[11px] py-2 px-4 rounded-full flex items-center space-x-2 mb-8 font-bold border border-primary/10">
          <Info className="w-3.5 h-3.5" />
          <span>Web aramalarında çağrı aktarma desteklenmez.</span>
        </div>

        <Button
          size="lg"
          className="px-10 h-12 font-bold bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:scale-[1.02] transition-transform active:scale-[0.98]"
        >
          Testi Başlat
        </Button>
      </div>

      {/* Decorative background pulse for testing panel */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />
    </div>
  );
};
