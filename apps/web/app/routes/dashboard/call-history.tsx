import {
  ArrowRight,
  Calendar,
  Filter,
  History,
  Phone,
  RotateCw,
  Search,
  Upload,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router";
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
import {
  type CallHistoryItem,
  callHistoryMockData,
} from "./_components/call-history/mock-data";
import DashboardHeader from "./_components/dashboard-header";

const statusFilterOptions = [
  "Tum Sonuclar",
  "Basarili",
  "Basarisiz",
  "Cevapsiz",
] as const;

const statusViewMap: Record<CallHistoryItem["status"], string> = {
  Basarili: "Basarili",
  Basarisiz: "Basarisiz",
  Cevapsiz: "Cevapsiz",
};

const formatCurrency = (amount: number): string => `$${amount.toFixed(3)}`;

const formatDateTime = (value: string): string => {
  const date = new Date(value);
  return date.toLocaleString("tr-TR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

const formatDuration = (durationSeconds: number): string => {
  const minutes = Math.floor(durationSeconds / 60);
  const seconds = durationSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
};

const statusBadgeClass: Record<CallHistoryItem["status"], string> = {
  Basarili: "border-emerald-400/30 bg-emerald-500/10 text-emerald-300",
  Basarisiz: "border-red-400/30 bg-red-500/10 text-red-300",
  Cevapsiz: "border-zinc-500/40 bg-zinc-700/30 text-zinc-300",
};

const sentimentDotClass: Record<CallHistoryItem["sentiment"], string> = {
  Pozitif: "bg-emerald-400",
  Notr: "bg-zinc-300",
  Negatif: "bg-red-400",
  Belirsiz: "bg-zinc-500",
};

const CallHistoryPage = () => {
  const [query, setQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] =
    useState<(typeof statusFilterOptions)[number]>("Tum Sonuclar");

  const filteredCalls = useMemo(() => {
    return callHistoryMockData.filter(call => {
      const matchesSearch =
        call.id.toLowerCase().includes(query.toLowerCase()) ||
        call.userName.toLowerCase().includes(query.toLowerCase()) ||
        call.callerNumber.toLowerCase().includes(query.toLowerCase()) ||
        call.agentName.toLowerCase().includes(query.toLowerCase());

      const matchesStatus =
        statusFilter === "Tum Sonuclar"
          ? true
          : statusViewMap[call.status] === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [query, statusFilter]);

  const totalCost = filteredCalls.reduce((sum, item) => sum + item.costUsd, 0);
  const successfulCalls = filteredCalls.filter(
    call => call.status === "Basarili",
  ).length;
  const successRate =
    filteredCalls.length === 0
      ? 0
      : Math.round((successfulCalls / filteredCalls.length) * 100);

  return (
    <div className="bg-background animate-in fade-in flex h-full flex-col duration-500">
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
              className="hover:bg-background border-border/50 h-8 gap-2 rounded-none border-l px-3 text-xs font-semibold shadow-none"
            >
              <Filter className="h-3.5 w-3.5" />
              Filtrele
            </Button>
          </div>

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

      <div className="border-border/50 bg-secondary/15 grid grid-cols-2 gap-px border-y sm:grid-cols-4">
        {[
          { label: "Toplam Cagri", value: String(filteredCalls.length) },
          {
            label: "Basari Orani",
            value: filteredCalls.length === 0 ? "-%" : `%${successRate}`,
          },
          {
            label: "Toplam Maliyet",
            value: formatCurrency(totalCost),
          },
          {
            label: "Ortalama Gecikme",
            value:
              filteredCalls.length === 0
                ? "-"
                : `${Math.round(
                    filteredCalls.reduce(
                      (sum, item) => sum + item.latencyMs,
                      0,
                    ) / filteredCalls.length,
                  )} ms`,
          },
        ].map(item => (
          <div key={item.label} className="bg-background px-5 py-4">
            <p className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
              {item.label}
            </p>
            <p className="text-foreground mt-1 text-xl font-bold">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="border-border/50 flex flex-wrap items-center gap-3 border-b px-6 py-3">
        <div className="border-border bg-secondary/40 flex h-9 min-w-65 items-center gap-2 rounded-lg border px-3">
          <Search className="text-muted-foreground h-4 w-4" />
          <input
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Oturum ID, kullanici, numara veya ajan ara"
            className="text-foreground placeholder:text-muted-foreground h-full w-full bg-transparent text-sm outline-none"
          />
        </div>

        <select
          value={statusFilter}
          onChange={event =>
            setStatusFilter(
              event.target.value as (typeof statusFilterOptions)[number],
            )
          }
          className="border-border bg-secondary/40 text-foreground h-9 rounded-lg border px-3 text-sm font-medium outline-none"
        >
          {statusFilterOptions.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <div className="text-muted-foreground ml-auto flex items-center gap-2 text-xs font-semibold">
          <Phone className="h-3.5 w-3.5" />
          {filteredCalls.length} kayit listeleniyor
        </div>
      </div>

      <div className="scrollbar-thin flex-1 overflow-auto px-4 py-4">
        <Table className="min-w-265">
          <TableHeader>
            <TableRow className="bg-secondary/60 border-border border-b hover:bg-transparent">
              <TableHead className="text-muted-foreground h-10 pl-4 text-[11px] font-semibold tracking-wider uppercase">
                Baslangic
              </TableHead>
              <TableHead className="text-muted-foreground h-10 text-[11px] font-semibold tracking-wider uppercase">
                Sure
              </TableHead>
              <TableHead className="text-muted-foreground h-10 text-[11px] font-semibold tracking-wider uppercase">
                Kanal
              </TableHead>
              <TableHead className="text-muted-foreground h-10 text-[11px] font-semibold tracking-wider uppercase">
                Maliyet
              </TableHead>
              <TableHead className="text-muted-foreground h-10 text-[11px] font-semibold tracking-wider uppercase">
                Kullanici
              </TableHead>
              <TableHead className="text-muted-foreground h-10 text-[11px] font-semibold tracking-wider uppercase">
                Bitis Nedeni
              </TableHead>
              <TableHead className="text-muted-foreground h-10 text-[11px] font-semibold tracking-wider uppercase">
                Duygu
              </TableHead>
              <TableHead className="text-muted-foreground h-10 text-[11px] font-semibold tracking-wider uppercase">
                Sonuc
              </TableHead>
              <TableHead className="text-muted-foreground h-10 pr-4 text-right text-[11px] font-semibold tracking-wider uppercase">
                Detay
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCalls.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="text-muted-foreground py-8 text-center text-xs"
                >
                  <p>Filtreye uygun cagri kaydi bulunamadi.</p>
                </TableCell>
              </TableRow>
            )}

            {filteredCalls.map(call => (
              <TableRow
                key={call.id}
                className="border-border/80 hover:bg-secondary/20 border-b transition-colors last:border-b-0"
              >
                <TableCell className="py-3 pl-4">
                  <div>
                    <p className="font-mono text-xs font-bold">
                      {formatDateTime(call.startedAt)}
                    </p>
                    <p className="text-muted-foreground mt-1 text-[11px]">
                      {call.id}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground py-3 text-xs font-semibold">
                  {formatDuration(call.durationSeconds)}
                </TableCell>
                <TableCell className="py-3">
                  <Badge
                    variant="outline"
                    className="border-border/50 bg-secondary/40 rounded-md px-2 py-0 text-[10px] font-bold uppercase"
                  >
                    {call.channel.replace("_", " ")}
                  </Badge>
                </TableCell>
                <TableCell className="text-primary py-3 font-mono text-xs font-bold">
                  {formatCurrency(call.costUsd)}
                </TableCell>
                <TableCell className="py-3">
                  <div>
                    <p className="text-xs font-semibold">{call.userName}</p>
                    <p className="text-muted-foreground text-[11px]">
                      {call.callerNumber}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-foreground/80 py-3 text-[11px] font-semibold">
                  {call.endReason}
                </TableCell>
                <TableCell className="py-3">
                  <div className="text-foreground/80 flex items-center gap-2 text-[11px] font-semibold">
                    <div
                      className={`h-1.5 w-1.5 rounded-full ${sentimentDotClass[call.sentiment]}`}
                    />
                    {call.sentiment}
                  </div>
                </TableCell>
                <TableCell className="py-3">
                  <Badge
                    variant="outline"
                    className={`rounded-md px-2 py-0 text-[10px] font-black tracking-wider uppercase ${statusBadgeClass[call.status]}`}
                  >
                    {statusViewMap[call.status]}
                  </Badge>
                </TableCell>
                <TableCell className="py-3 pr-4 text-right">
                  <Link to={`/dashboard/call-history/${call.id}`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-foreground gap-1.5"
                    >
                      Incele
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <footer className="border-border bg-card/80 flex shrink-0 items-center justify-between border-t p-4 backdrop-blur-sm">
        <div className="text-muted-foreground text-[11px] font-bold tracking-widest uppercase">
          Toplam Kayit: {filteredCalls.length}
        </div>

        <div className="text-muted-foreground text-[11px] font-semibold">
          Kayıtları satıra tıklayarak veya Incele ile detaylandırabilirsiniz.
        </div>
      </footer>
    </div>
  );
};

export default CallHistoryPage;
