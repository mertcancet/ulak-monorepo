import React from "react";
import { Calendar, Filter, Plus, Edit2, ChevronDown } from "lucide-react";
import { Button } from "~/components/ui/button";
import DashboardHeader from "../dashboard-header";

export const AnalyticsHeader = () => {
  return (
    <DashboardHeader>
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Filter className="w-4 h-4 text-primary" />
        </div>
        <h1 className="text-lg font-bold tracking-tight">
          Analizler ve İstatistikler
        </h1>
      </div>
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 bg-secondary/50 border border-border rounded-lg px-3 py-1.5 text-xs font-semibold cursor-pointer hover:bg-secondary transition-all">
          <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
          <span>Son 7 Gün: 16 Şub - 23 Şub</span>
          <ChevronDown className="w-3 h-3 text-muted-foreground" />
        </div>

        <Button variant="outline" size="sm" className="h-9 gap-2">
          <Filter className="w-3.5 h-3.5" />
          Filtrele
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="h-9 text-muted-foreground hover:text-foreground"
        >
          Sıfırla
        </Button>

        <div className="h-4 w-px bg-border mx-1" />

        <Button
          size="sm"
          className="h-9 gap-2 font-semibold gradient-primary shadow-lg shadow-primary/20"
        >
          <Plus className="w-3.5 h-3.5" />
          Grafik Ekle
        </Button>

        <Button variant="outline" size="sm" className="h-9 gap-2">
          <Edit2 className="w-3.5 h-3.5" />
          Düzenle
        </Button>
      </div>
    </DashboardHeader>
  );
};
