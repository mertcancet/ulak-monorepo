import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";
import {
  Bot,
  ChevronRight,
  PhoneCall,
  Timer,
  CheckCircle2,
} from "lucide-react";
import { Button } from "~/components/ui/button";

const performanceData = [
  {
    id: 1,
    name: "Müşteri Destek AI",
    calls: 1240,
    avgDuration: "2dk 14sn",
    successRate: 88,
    status: "Aktif",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    id: 2,
    name: "Satış Tanıtım AI",
    calls: 850,
    avgDuration: "1dk 45sn",
    successRate: 64,
    status: "Aktif",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    id: 3,
    name: "Randevu Hatırlatıcı",
    calls: 620,
    avgDuration: "1dk 12sn",
    successRate: 92,
    status: "Beklemede",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
];

export const PerformanceTable = () => {
  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden glass">
      <div className="p-6 border-b border-border flex justify-between items-center bg-secondary/10">
        <div>
          <h3 className="font-bold text-sm uppercase tracking-widest">
            Asistan Bazlı Performans
          </h3>
          <p className="text-[10px] text-muted-foreground mt-1 font-medium">
            En son güncellenen veriler
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 text-[11px] font-bold text-primary hover:bg-primary/5 gap-1.5 uppercase tracking-wider"
        >
          Tümünü Gör
          <ChevronRight className="w-3.5 h-3.5" />
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent bg-secondary/20">
            <TableHead className="text-[10px] font-black uppercase tracking-widest h-12 px-6">
              Asistan Adı
            </TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-widest h-12 px-6">
              <div className="flex items-center gap-1.5">
                <PhoneCall className="w-3 h-3" />
                Çağrı
              </div>
            </TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-widest h-12 px-6">
              <div className="flex items-center gap-1.5">
                <Timer className="w-3 h-3" />
                Ort. Süre
              </div>
            </TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-widest h-12 px-6">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3" />
                Başarı
              </div>
            </TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-widest h-12 px-6">
              Durum
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {performanceData.map((item) => (
            <TableRow
              key={item.id}
              className="group hover:bg-secondary/10 transition-colors border-border/50"
            >
              <TableCell className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center transition-transform group-hover:scale-105`}
                  >
                    <Bot className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <span className="text-sm font-bold tracking-tight">
                    {item.name}
                  </span>
                </div>
              </TableCell>
              <TableCell className="px-6 py-4 text-sm font-bold opacity-80">
                {item.calls.toLocaleString()}
              </TableCell>
              <TableCell className="px-6 py-4 text-sm font-bold opacity-80">
                {item.avgDuration}
              </TableCell>
              <TableCell className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-secondary h-1.5 rounded-full overflow-hidden shadow-inner">
                    <div
                      className="bg-primary h-full transition-all duration-1000 ease-out"
                      style={{ width: `${item.successRate}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-black tabular-nums">
                    {item.successRate}%
                  </span>
                </div>
              </TableCell>
              <TableCell className="px-6 py-4">
                <Badge
                  variant="secondary"
                  className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 ${
                    item.status === "Aktif"
                      ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {item.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
