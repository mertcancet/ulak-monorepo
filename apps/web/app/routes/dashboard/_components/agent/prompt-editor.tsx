import { Textarea } from "~/components/ui/textarea";
import { DEFAULT_PROMPT } from "./constants";

export const PromptEditor = () => {
  return (
    <div className="bg-card border-border flex flex-1 flex-col overflow-hidden rounded-xl border shadow-sm">
      <div className="border-border bg-secondary/20 flex items-center justify-between border-b p-4">
        <div className="flex items-center space-x-2">
          <div className="bg-primary h-4 w-1.5 rounded-full" />
          <h2 className="text-sm font-bold tracking-tight">
            Sistem Talimatları
          </h2>
        </div>
        <span className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
          Markdown desteklenir
        </span>
      </div>
      <div className="flex flex-1 flex-col p-0">
        <Textarea
          className="text-foreground/80 scrollbar-thin flex-1 resize-none border-none bg-transparent p-6 text-sm leading-relaxed font-medium focus-visible:ring-0"
          placeholder="Agent talimatlarını buraya girin..."
          defaultValue={DEFAULT_PROMPT}
        />
      </div>
    </div>
  );
};
