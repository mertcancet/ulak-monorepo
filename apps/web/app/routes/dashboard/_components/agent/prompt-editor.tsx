import { Textarea } from "~/components/ui/textarea";
import { DEFAULT_PROMPT } from "./constants";

export const PromptEditor = () => {
  return (
    <div className="flex-1 bg-card border border-border rounded-xl shadow-sm flex flex-col overflow-hidden">
      <div className="p-4 border-b border-border flex justify-between items-center bg-secondary/20">
        <div className="flex items-center space-x-2">
          <div className="w-1.5 h-4 bg-primary rounded-full" />
          <h2 className="text-sm font-bold tracking-tight">
            Sistem Talimatları
          </h2>
        </div>
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          Markdown desteklenir
        </span>
      </div>
      <div className="flex-1 p-0 flex flex-col">
        <Textarea
          className="flex-1 border-none focus-visible:ring-0 bg-transparent text-sm leading-relaxed p-6 resize-none font-medium text-foreground/80 scrollbar-thin"
          placeholder="Agent talimatlarını buraya girin..."
          defaultValue={DEFAULT_PROMPT}
        />
      </div>
    </div>
  );
};
