import { Brain, ChevronDown, Languages, Mic2 } from "lucide-react";
import { Button } from "~/components/ui/button";

export const QuickSelectToolbar = () => {
  return (
    <div className="flex items-center space-x-3 bg-card/50 backdrop-blur-sm border border-border p-2 rounded-xl shadow-sm glass">
      <Button
        variant="outline"
        size="sm"
        className="h-8 gap-2 bg-background/50 border-border hover:bg-secondary"
      >
        <Brain className="h-3.5 w-3.5 text-primary" />
        <span className="text-xs font-semibold">GPT 4.1</span>
        <ChevronDown className="h-3 w-3 text-muted-foreground" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="h-8 gap-2 bg-background/50 border-border hover:bg-secondary"
      >
        <Mic2 className="h-3.5 w-3.5 text-primary" />
        <span className="text-xs font-semibold">Caner (Doğal)</span>
        <ChevronDown className="h-3 w-3 text-muted-foreground" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="ml-auto h-8 gap-2 bg-background/50 border-border hover:bg-secondary"
      >
        <Languages className="h-3.5 w-3.5 text-primary" />
        <span className="text-xs font-bold uppercase tracking-wider">
          Türkçe
        </span>
        <ChevronDown className="h-3 w-3 text-muted-foreground" />
      </Button>
    </div>
  );
};
