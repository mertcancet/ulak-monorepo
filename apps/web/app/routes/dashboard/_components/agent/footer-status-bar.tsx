import { AGENT_MOCK_DATA } from "./constants";

export const FooterStatusBar = () => {
  return (
    <footer className="h-8 border-t border-border bg-card/80 backdrop-blur-sm flex items-center justify-between px-4 text-[10px] text-muted-foreground font-bold uppercase tracking-widest shrink-0">
      <div className="flex items-center space-x-6">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 bg-success rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
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
