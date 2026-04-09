import { AGENT_MOCK_DATA } from "./constants";

export const FooterStatusBar = () => {
  return (
    <footer className="border-border bg-card/80 text-muted-foreground flex h-8 shrink-0 items-center justify-between border-t px-4 text-[10px] font-bold tracking-widest uppercase backdrop-blur-sm">
      <div className="flex items-center space-x-6">
        <span className="flex items-center gap-2">
          <span className="bg-success h-2 w-2 animate-pulse rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          Sistem Hazır
        </span>
        <span className="opacity-50">•</span>
        <span>API Versiyon: {AGENT_MOCK_DATA.version}</span>
      </div>
      <div className="flex items-center space-x-6">
        <span className="hover:text-primary cursor-pointer transition-colors">
          Dokümantasyon
        </span>
        <span className="hover:text-primary cursor-pointer transition-colors">
          Destek
        </span>
      </div>
    </footer>
  );
};
