import { CheckCircle2, Copy, Edit, RotateCw, Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";

const TabHeader = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center justify-between mb-8 px-4 border-b border-border h-16">
      <div>
        <h1 className="text-xl font-bold text-foreground mb-2">{title}</h1>
        <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
          <span className="flex items-center gap-1">
            ID: know...1ce
            <button
              type="button"
              className="hover:text-foreground transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </span>
          <span className="text-border">•</span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            Yüklendi: 02/17/2026 12:14
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button>
          <Edit className="w-4 h-4" /> Düzenle
        </Button>
        <Button
          variant="outline"
          className="gap-2 border-border hover:bg-secondary h-10 px-4 text-sm font-semibold"
        >
          <RotateCw className="w-4 h-4" /> Sayfaları Senkronize Et
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 text-muted-foreground hover:text-destructive hover:bg-destructive/10 border-border transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default TabHeader;
