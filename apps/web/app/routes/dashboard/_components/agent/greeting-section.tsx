import { ChevronRight, Timer } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

export const GreetingSection = () => {
  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-sm shadow-black/5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold tracking-tight">Karşılama Mesajı</h2>
        <Badge
          variant="outline"
          className="text-[10px] font-bold gap-1.5 border-border bg-secondary/50 py-0.5"
        >
          <Timer className="w-2.5 h-2.5" />
          Konuşma Öncesi Duraklatma: 0s
        </Badge>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          className="h-auto py-3 px-4 flex flex-col items-start gap-1 justify-center bg-background/50 border-border hover:bg-secondary hover:border-primary/30 transition-all group"
        >
          <div className="flex items-center justify-between w-full">
            <span className="text-xs font-bold text-foreground/80">
              Önce AI Konuşur
            </span>
            <ChevronRight className="w-3 h-3 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
          </div>
          <span className="text-[10px] text-muted-foreground font-medium">
            Statik karşılama mesajı
          </span>
        </Button>
        <Button
          variant="outline"
          className="h-auto py-3 px-4 flex flex-col items-start gap-1 justify-center bg-background/50 border-border hover:bg-secondary hover:border-primary/30 transition-all group"
        >
          <div className="flex items-center justify-between w-full">
            <span className="text-xs font-bold text-foreground/80">
              Dinamik Mesaj
            </span>
            <ChevronRight className="w-3 h-3 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
          </div>
          <span className="text-[10px] text-muted-foreground font-medium">
            API üzerinden tetiklenen mesaj
          </span>
        </Button>
      </div>
    </div>
  );
};
