import { ChevronRight, Timer } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

interface GreetingSectionProps {
  greetPrompt?: string | null;
}

export const GreetingSection = ({ greetPrompt }: GreetingSectionProps) => {
  return (
    <div className="bg-card border-border rounded-xl border p-4 shadow-sm shadow-black/5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-bold tracking-tight">Karşılama Mesajı</h2>
        <Badge
          variant="outline"
          className="border-border bg-secondary/50 gap-1.5 py-0.5 text-[10px] font-bold"
        >
          <Timer className="h-2.5 w-2.5" />
          Konuşma Öncesi Duraklatma: 0s
        </Badge>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          className="bg-background/50 border-border hover:bg-secondary hover:border-primary/30 group flex h-auto flex-col items-start justify-center gap-1 px-4 py-3 transition-all"
        >
          <div className="flex w-full items-center justify-between">
            <span className="text-foreground/80 text-xs font-bold">
              Önce AI Konuşur
            </span>
            <ChevronRight className="text-muted-foreground h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </div>
          <span className="text-muted-foreground text-[10px] font-medium">
            Statik karşılama mesajı
          </span>
        </Button>
        <Button
          variant="outline"
          className="bg-background/50 border-border hover:bg-secondary hover:border-primary/30 group flex h-auto flex-col items-start justify-center gap-1 px-4 py-3 transition-all"
        >
          <div className="flex w-full items-center justify-between">
            <span className="text-foreground/80 text-xs font-bold">
              Dinamik Mesaj
            </span>
            <ChevronRight className="text-muted-foreground h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </div>
          <span className="text-muted-foreground text-[10px] font-medium">
            API üzerinden tetiklenen mesaj
          </span>
        </Button>
      </div>
      {greetPrompt && (
        <div className="bg-secondary/30 border-border mt-3 rounded-lg border p-3">
          <p className="text-muted-foreground text-[11px] font-semibold uppercase">
            Mevcut Karşılama Metni
          </p>
          <p className="text-foreground mt-1 text-xs">{greetPrompt}</p>
        </div>
      )}
    </div>
  );
};
