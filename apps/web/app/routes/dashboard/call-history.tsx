import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Columns,
  Filter,
  History,
  MoreHorizontal,
  RotateCw,
  SlidersHorizontal,
  Upload,
} from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
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
      reasonColor: "bg-success",
      sentimentColor: "bg-primary",
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
      reasonColor: "bg-success",
      sentimentColor: "bg-muted-foreground",
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
      reasonColor: "bg-destructive/100",
      sentimentColor: "bg-muted-foreground",
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
      reasonColor: "bg-success",
      sentimentColor: "bg-primary",
      statusVariant: "success",
    },
  ];

  return (
    <div className="bg-background animate-in fade-in flex h-full flex-col duration-500">
      {/* Header */}
      <DashboardHeader>
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-lg">
            <History className="text-primary h-4 w-4" />
          </div>
          <h1 className="text-sm font-bold tracking-tight">Çağrı Geçmişi</h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-secondary/50 border-border flex items-center rounded-lg border p-0.5">
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-background h-8 gap-2 px-3 text-xs font-semibold shadow-none"
            >
              <Calendar className="h-3.5 w-3.5" />
              Tarih Aralığı
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-background border-border/50 h-8 gap-2 rounded-none border-x px-3 text-xs font-semibold shadow-none"
            >
              <Filter className="h-3.5 w-3.5" />
              Filtrele
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-background border-border/50 h-8 gap-2 rounded-none border-r px-3 text-xs font-semibold shadow-none"
            >
              <Columns className="h-3.5 w-3.5" />
              Görünüm
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-background h-8 gap-2 px-3 text-xs font-semibold shadow-none"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Özel Nitelikler
            </Button>
          </div>

          <div className="bg-border mx-1 h-6 w-px" />

          <Button
            variant="outline"
            size="sm"
            className="border-border bg-card hover:bg-secondary h-8 gap-2 text-xs font-bold"
          >
            <Upload className="text-muted-foreground h-3.5 w-3.5" />
            Dışa Aktar
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:bg-secondary h-8 w-8"
          >
            <RotateCw className="h-4 w-4" />
          </Button>
        </div>
      </DashboardHeader>

      {/* Table Content */}
      <div className="scrollbar-thin flex-1 overflow-auto">
        <table className="w-full min-w-300 border-collapse text-left">
          <thead className="sticky top-0 z-10">
            <tr className="border-border bg-secondary/30 border-b backdrop-blur-md">
              <th className="text-muted-foreground px-6 py-3 text-[10px] leading-none font-bold tracking-widest uppercase">
                Zaman
              </th>
              <th className="text-muted-foreground px-4 py-3 text-[10px] leading-none font-bold tracking-widest uppercase">
                Süre
              </th>
              <th className="text-muted-foreground px-4 py-3 text-[10px] leading-none font-bold tracking-widest uppercase">
                Kanal
              </th>
              <th className="text-muted-foreground px-4 py-3 text-[10px] leading-none font-bold tracking-widest uppercase">
                Maliyet
              </th>
              <th className="text-muted-foreground px-4 py-3 text-[10px] leading-none font-bold tracking-widest uppercase">
                Oturum ID
              </th>
              <th className="text-muted-foreground px-4 py-3 text-[10px] leading-none font-bold tracking-widest uppercase">
                Bitiş Nedeni
              </th>
              <th className="text-muted-foreground px-4 py-3 text-[10px] leading-none font-bold tracking-widest uppercase">
                Duygu
              </th>
              <th className="text-muted-foreground px-4 py-3 text-[10px] leading-none font-bold tracking-widest uppercase">
                Yön
              </th>
              <th className="text-muted-foreground px-4 py-3 text-[10px] leading-none font-bold tracking-widest uppercase">
                Sonuç
              </th>
              <th className="text-muted-foreground px-4 py-3 text-[10px] leading-none font-bold tracking-widest uppercase">
                İşlem
              </th>
            </tr>
          </thead>
          <tbody className="divide-border/50 divide-y">
            {calls.map((call, idx) => (
              <tr
                // biome-ignore lint/suspicious/noArrayIndexKey: <>
                key={idx}
                className="group hover:bg-secondary/40 cursor-pointer transition-all duration-200"
              >
                <td className="px-6 py-4 text-[11px] font-bold tracking-tight whitespace-nowrap">
                  {call.time}
                </td>
                <td className="text-muted-foreground px-4 py-4 text-xs font-semibold">
                  {call.duration}
                </td>
                <td className="px-4 py-4">
                  <Badge
                    variant="outline"
                    className="bg-secondary/50 border-border/50 rounded-md px-2 py-0 text-[10px] font-bold uppercase"
                  >
                    {call.channel.replace("_", " ")}
                  </Badge>
                </td>
                <td className="text-primary px-4 py-4 font-mono text-xs font-bold">
                  {call.cost}
                </td>
                <td className="text-muted-foreground/60 px-4 py-4 font-mono text-xs">
                  {call.id}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-foreground/80 flex items-center gap-2 text-[11px] font-bold">
                    <div
                      className={cn(
                        "h-1.5 w-1.5 rounded-full shadow-[0_0_8px]",
                        call.reasonColor.replace("bg-", "text-"),
                      )}
                      style={{
                        backgroundColor: call.reasonColor.includes("green")
                          ? "hsl(var(--success))"
                          : "hsl(var(--destructive))",
                      }}
                    />
                    {call.reason}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-foreground/80 flex items-center gap-2 text-[11px] font-bold">
                    <div
                      className="h-1.5 w-1.5 rounded-full"
                      style={{
                        backgroundColor: call.sentimentColor.includes("blue")
                          ? "hsl(var(--primary))"
                          : "hsl(var(--muted-foreground))",
                      }}
                    />
                    {call.sentiment}
                  </div>
                </td>
                <td className="text-muted-foreground/70 px-4 py-4 text-[11px] font-bold tracking-tight uppercase">
                  {call.direction}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <Badge
                    // biome-ignore lint/suspicious/noExplicitAny: <>
                    variant={call.statusVariant as any}
                    className="px-2 py-0.5 text-[10px] font-black tracking-wider uppercase shadow-sm"
                  >
                    {call.status}
                  </Badge>
                </td>
                <td className="px-4 py-4 text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination */}
      <footer className="border-border bg-card/80 flex shrink-0 items-center justify-between border-t p-4 backdrop-blur-sm">
        <div className="text-muted-foreground text-[11px] font-bold tracking-widest uppercase">
          Sayfa 1 / 1 <span className="text-border mx-2">•</span> Toplam Oturum:
          4
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-[11px] font-bold tracking-widest uppercase">
              Görüntüle:
            </span>
            <select className="bg-secondary/50 border-border focus:ring-primary/20 rounded-lg border p-1 px-2 text-[11px] font-bold outline-none focus:ring-1">
              <option>20 / sayfa</option>
              <option selected>50 / sayfa</option>
              <option>100 / sayfa</option>
            </select>
          </div>

          <div className="bg-secondary/50 border-border flex items-center gap-1 rounded-xl border p-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg disabled:opacity-30"
              disabled
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="bg-primary shadow-primary/20 flex h-8 items-center justify-center rounded-lg px-3 text-xs font-black text-white shadow-lg">
              1
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg disabled:opacity-30"
              disabled
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CallHistoryPage;
