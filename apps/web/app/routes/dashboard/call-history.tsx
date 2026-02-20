import React from "react";
import {
  History,
  Calendar,
  Filter,
  Columns,
  SlidersHorizontal,
  Upload,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Download,
  Search,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { cn } from "~/lib/utils";
import DashboardHeader from "./_components/dashboard-header";

const CallHistoryPage = () => {
  const calls = [
    {
      id: "call_3b2a...9082",
      time: "2024-03-21 14:30:22 +03",
      duration: "0:45",
      channel: "web_call",
      cost: "$0.021",
      reason: "Kullanıcı Kapattı",
      sentiment: "Pozitif",
      direction: "Gelen",
      status: "Başarılı",
      reasonColor: "bg-green-500",
      sentimentColor: "bg-blue-500",
      statusVariant: "success",
    },
    {
      id: "call_9a1f...bc7d",
      time: "2024-03-21 14:22:10 +03",
      duration: "2:12",
      channel: "phone_call",
      cost: "$0.142",
      reason: "Kullanıcı Kapattı",
      sentiment: "Nötr",
      direction: "Giden",
      status: "Başarılı",
      reasonColor: "bg-green-500",
      sentimentColor: "bg-slate-400",
      statusVariant: "success",
    },
    {
      id: "call_f821...a12c",
      time: "2024-03-21 14:15:05 +03",
      duration: "0:12",
      channel: "web_call",
      cost: "$0.008",
      reason: "Sistem Hatası",
      sentiment: "Belirsiz",
      direction: "Gelen",
      status: "Başarısız",
      reasonColor: "bg-red-500",
      sentimentColor: "bg-slate-400",
      statusVariant: "destructive",
    },
    {
      id: "call_e55d...221b",
      time: "2024-03-21 13:58:45 +03",
      duration: "1:30",
      channel: "phone_call",
      cost: "$0.089",
      reason: "Temsilci Kapattı",
      sentiment: "Pozitif",
      direction: "Giden",
      status: "Başarılı",
      reasonColor: "bg-green-500",
      sentimentColor: "bg-blue-500",
      statusVariant: "success",
    },
  ];

  return (
    <div className="flex flex-col h-full bg-background animate-in fade-in duration-500">
      {/* Header */}
      <DashboardHeader>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <History className="w-4 h-4 text-primary" />
          </div>
          <h1 className="text-sm font-bold tracking-tight">Çağrı Geçmişi</h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-secondary/50 rounded-lg p-0.5 border border-border">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-2 text-xs font-semibold px-3 hover:bg-background shadow-none"
            >
              <Calendar className="w-3.5 h-3.5" />
              Tarih Aralığı
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-2 text-xs font-semibold px-3 hover:bg-background shadow-none border-x border-border/50 rounded-none"
            >
              <Filter className="w-3.5 h-3.5" />
              Filtrele
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-2 text-xs font-semibold px-3 hover:bg-background shadow-none border-r border-border/50 rounded-none"
            >
              <Columns className="w-3.5 h-3.5" />
              Görünüm
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-2 text-xs font-semibold px-3 hover:bg-background shadow-none"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Özel Nitelikler
            </Button>
          </div>

          <div className="h-6 w-px bg-border mx-1" />

          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-2 text-xs font-bold border-border bg-card hover:bg-secondary"
          >
            <Upload className="w-3.5 h-3.5 text-muted-foreground" />
            Dışa Aktar
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:bg-secondary"
          >
            <RotateCw className="w-4 h-4" />
          </Button>
        </div>
      </DashboardHeader>

      {/* Table Content */}
      <div className="flex-1 overflow-auto scrollbar-thin">
        <table className="w-full text-left border-collapse min-w-[1200px]">
          <thead className="sticky top-0 z-10">
            <tr className="border-b border-border bg-secondary/30 backdrop-blur-md">
              <th className="px-6 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">
                Zaman
              </th>
              <th className="px-4 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">
                Süre
              </th>
              <th className="px-4 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">
                Kanal
              </th>
              <th className="px-4 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">
                Maliyet
              </th>
              <th className="px-4 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">
                Oturum ID
              </th>
              <th className="px-4 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">
                Bitiş Nedeni
              </th>
              <th className="px-4 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">
                Duygu
              </th>
              <th className="px-4 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">
                Yön
              </th>
              <th className="px-4 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">
                Sonuç
              </th>
              <th className="px-4 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">
                İşlem
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {calls.map((call, idx) => (
              <tr
                key={idx}
                className="group hover:bg-secondary/40 transition-all duration-200 cursor-pointer"
              >
                <td className="px-6 py-4 text-[11px] font-bold tracking-tight whitespace-nowrap">
                  {call.time}
                </td>
                <td className="px-4 py-4 text-xs font-semibold text-muted-foreground">
                  {call.duration}
                </td>
                <td className="px-4 py-4">
                  <Badge
                    variant="outline"
                    className="font-bold text-[10px] uppercase bg-secondary/50 border-border/50 py-0 px-2 rounded-md"
                  >
                    {call.channel.replace("_", " ")}
                  </Badge>
                </td>
                <td className="px-4 py-4 text-xs font-bold font-mono text-primary">
                  {call.cost}
                </td>
                <td className="px-4 py-4 text-xs font-mono text-muted-foreground/60">
                  {call.id}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-foreground/80">
                    <div
                      className={cn(
                        "w-1.5 h-1.5 rounded-full shadow-[0_0_8px]",
                        call.reasonColor.replace("bg-", "text-"),
                      )}
                      style={{
                        backgroundColor: call.reasonColor.includes("green")
                          ? "#10b981"
                          : "#ef4444",
                      }}
                    />
                    {call.reason}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-foreground/80">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        backgroundColor: call.sentimentColor.includes("blue")
                          ? "#3b82f6"
                          : "#94a3b8",
                      }}
                    />
                    {call.sentiment}
                  </div>
                </td>
                <td className="px-4 py-4 text-[11px] font-bold text-muted-foreground/70 uppercase tracking-tight">
                  {call.direction}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <Badge
                    variant={call.statusVariant as any}
                    className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 shadow-sm"
                  >
                    {call.status}
                  </Badge>
                </td>
                <td className="px-4 py-4 text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination */}
      <footer className="p-4 border-t border-border bg-card/80 backdrop-blur-sm flex items-center justify-between shrink-0">
        <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
          Sayfa 1 / 1 <span className="mx-2 text-border">•</span> Toplam Oturum:
          4
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
              Görüntüle:
            </span>
            <select className="text-[11px] font-bold bg-secondary/50 border border-border rounded-lg p-1 px-2 focus:ring-1 focus:ring-primary/20 outline-none">
              <option>20 / sayfa</option>
              <option selected>50 / sayfa</option>
              <option>100 / sayfa</option>
            </select>
          </div>

          <div className="flex items-center gap-1 bg-secondary/50 p-1 rounded-xl border border-border">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg disabled:opacity-30"
              disabled
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="h-8 px-3 flex items-center justify-center text-xs font-black bg-primary text-white rounded-lg shadow-lg shadow-primary/20">
              1
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg disabled:opacity-30"
              disabled
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CallHistoryPage;
