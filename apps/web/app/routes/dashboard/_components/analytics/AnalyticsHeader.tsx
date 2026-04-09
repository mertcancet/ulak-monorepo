import { Calendar, ChevronDown, Edit2, Filter, Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import DashboardHeader from "../dashboard-header";

export const AnalyticsHeader = () => {
  return (
    <DashboardHeader>
      <div className="flex items-center space-x-3">
        <div className="bg-primary/10 rounded-lg p-2">
          <Filter className="text-primary h-4 w-4" />
        </div>
        <h1 className="text-lg font-bold tracking-tight">
          Analizler ve İstatistikler
        </h1>
      </div>
      <div className="flex items-center space-x-3">
        <div className="bg-secondary/50 border-border hover:bg-secondary flex cursor-pointer items-center space-x-2 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all">
          <Calendar className="text-muted-foreground h-3.5 w-3.5" />
          <span>Son 7 Gün: 16 Şub - 23 Şub</span>
          <ChevronDown className="text-muted-foreground h-3 w-3" />
        </div>

        <Button variant="outline" size="sm" className="h-9 gap-2">
          <Filter className="h-3.5 w-3.5" />
          Filtrele
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground h-9"
        >
          Sıfırla
        </Button>

        <div className="bg-border mx-1 h-4 w-px" />

        <Button
          size="sm"
          className="gradient-primary shadow-primary/20 h-9 gap-2 font-semibold shadow-lg"
        >
          <Plus className="h-3.5 w-3.5" />
          Grafik Ekle
        </Button>

        <Button variant="outline" size="sm" className="h-9 gap-2">
          <Edit2 className="h-3.5 w-3.5" />
          Düzenle
        </Button>
      </div>
    </DashboardHeader>
  );
};
