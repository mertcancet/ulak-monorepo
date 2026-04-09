import {
  Bot,
  CheckCircle2,
  ChevronRight,
  PhoneCall,
  Timer,
} from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

const performanceData = [
  {
    id: 1,
    name: "Müşteri Destek AI",
    calls: 1240,
    avgDuration: "2dk 14sn",
    successRate: 88,
    status: "Aktif",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    id: 2,
    name: "Satış Tanıtım AI",
    calls: 850,
    avgDuration: "1dk 45sn",
    successRate: 64,
    status: "Aktif",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    id: 3,
    name: "Randevu Hatırlatıcı",
    calls: 620,
    avgDuration: "1dk 12sn",
    successRate: 92,
    status: "Beklemede",
    color: "text-warning",
    bg: "bg-warning/10",
  },
];

export const PerformanceTable = () => {
  return (
    <div className="bg-card border-border overflow-hidden rounded-2xl border shadow-sm">
      <div className="border-border bg-secondary/10 flex items-center justify-between border-b p-6">
        <div>
          <h3 className="text-sm font-bold tracking-widest uppercase">
            Asistan Bazlı Performans
          </h3>
          <p className="text-muted-foreground mt-1 text-[10px] font-medium">
            En son güncellenen veriler
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-primary hover:bg-primary/5 h-8 gap-1.5 text-[11px] font-bold tracking-wider uppercase"
        >
          Tümünü Gör
          <ChevronRight className="h-3.5 w-3.5" />
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-secondary/20 hover:bg-transparent">
            <TableHead className="h-12 px-6 text-[10px] font-black tracking-widest uppercase">
              Asistan Adı
            </TableHead>
            <TableHead className="h-12 px-6 text-[10px] font-black tracking-widest uppercase">
              <div className="flex items-center gap-1.5">
                <PhoneCall className="h-3 w-3" />
                Çağrı
              </div>
            </TableHead>
            <TableHead className="h-12 px-6 text-[10px] font-black tracking-widest uppercase">
              <div className="flex items-center gap-1.5">
                <Timer className="h-3 w-3" />
                Ort. Süre
              </div>
            </TableHead>
            <TableHead className="h-12 px-6 text-[10px] font-black tracking-widest uppercase">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3 w-3" />
                Başarı
              </div>
            </TableHead>
            <TableHead className="h-12 px-6 text-[10px] font-black tracking-widest uppercase">
              Durum
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {performanceData.map(item => (
            <TableRow
              key={item.id}
              className="group hover:bg-secondary/10 border-border/50 transition-colors"
            >
              <TableCell className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-10 w-10 rounded-xl ${item.bg} flex items-center justify-center transition-transform group-hover:scale-105`}
                  >
                    <Bot className={`h-5 w-5 ${item.color}`} />
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
                  <div className="bg-secondary h-1.5 w-24 overflow-hidden rounded-full shadow-inner">
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
                  className={`px-2 py-0.5 text-[10px] font-black tracking-wider uppercase ${
                    item.status === "Aktif"
                      ? "bg-success/10 text-success border-success/20"
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
