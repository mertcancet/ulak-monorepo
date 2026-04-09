import { Brain, ChevronDown, Languages, Mic2 } from "lucide-react";
import { Button } from "~/components/ui/button";

export const QuickSelectToolbar = () => {
  return (
    <div className="border-border flex items-center space-x-3 rounded-xl border p-2 shadow-sm backdrop-blur-sm">
      <Button
        variant="outline"
        size="sm"
        className="bg-background/50 border-border hover:bg-secondary h-8 gap-2"
      >
        <Brain className="text-primary h-3.5 w-3.5" />
        <span className="text-xs font-semibold">GPT 4.1</span>
        <ChevronDown className="text-muted-foreground h-3 w-3" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="bg-background/50 border-border hover:bg-secondary h-8 gap-2"
      >
        <Mic2 className="text-primary h-3.5 w-3.5" />
        <span className="text-xs font-semibold">Caner (Doğal)</span>
        <ChevronDown className="text-muted-foreground h-3 w-3" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="bg-background/50 border-border hover:bg-secondary ml-auto h-8 gap-2"
      >
        <Languages className="text-primary h-3.5 w-3.5" />
        <span className="text-xs font-bold tracking-wider uppercase">
          Türkçe
        </span>
        <ChevronDown className="text-muted-foreground h-3 w-3" />
      </Button>
    </div>
  );
};
