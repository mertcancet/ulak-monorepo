import { Search } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { cn } from "~/lib/utils";
import type { CampaignItem, CampaignStatus } from "./constants";
import { statusStyles } from "./constants";

interface CampaignQueueSectionProps {
  filteredCampaigns: CampaignItem[];
  query: string;
  statusFilter: "Tum" | CampaignStatus;
  setQuery: (value: string) => void;
  setStatusFilter: (value: "Tum" | CampaignStatus) => void;
  totalTargets: number;
  totalAnswered: number;
  avgConversion: number;
}

export function CampaignQueueSection({
  filteredCampaigns,
  query,
  statusFilter,
  setQuery,
  setStatusFilter,
  totalTargets,
  totalAnswered,
  avgConversion,
}: CampaignQueueSectionProps) {
  return (
    <section className="bg-card border-border overflow-hidden rounded-2xl border shadow-sm">
      <div className="border-border flex flex-col gap-3 border-b p-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-foreground text-sm font-semibold">
            Kampanya Kuyrugu
          </h2>
          <p className="text-muted-foreground mt-1 text-xs">
            Aktif, planli ve tamamlanan toplu cagri operasyonlari.
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 sm:flex-row md:w-auto">
          <div className="group relative w-full sm:w-64">
            <Search className="text-muted-foreground group-focus-within:text-brand absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 transition-colors" />
            <Input
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Kampanya ara"
              className="h-8 pl-9 text-xs"
            />
          </div>

          <select
            value={statusFilter}
            onChange={event =>
              setStatusFilter(event.target.value as "Tum" | CampaignStatus)
            }
            className="border-border bg-background text-foreground h-8 rounded-lg border px-2.5 text-xs"
          >
            <option value="Tum">Tum Durumlar</option>
            <option value="Taslak">Taslak</option>
            <option value="Planlandi">Planlandi</option>
            <option value="Calisiyor">Calisiyor</option>
            <option value="Tamamlandi">Tamamlandi</option>
          </select>
        </div>
      </div>

      <div className="border-border/60 grid grid-cols-1 border-b md:grid-cols-3">
        {[
          {
            label: "Toplam Hedef",
            value: totalTargets.toLocaleString("tr-TR"),
          },
          {
            label: "Ulasilan Kisi",
            value: totalAnswered.toLocaleString("tr-TR"),
          },
          { label: "Ort. Donusum", value: `%${avgConversion}` },
        ].map(item => (
          <div
            key={item.label}
            className="border-border/60 p-4 last:border-r-0 md:border-r"
          >
            <p className="text-muted-foreground text-[11px] tracking-wide uppercase">
              {item.label}
            </p>
            <p className="text-foreground mt-1 text-lg font-semibold">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-secondary/50 border-border border-b hover:bg-transparent">
            <TableHead className="h-10 pl-4 text-[11px]">Kampanya</TableHead>
            <TableHead className="h-10 text-[11px]">Segment</TableHead>
            <TableHead className="h-10 text-[11px]">Durum</TableHead>
            <TableHead className="h-10 text-[11px]">Plan</TableHead>
            <TableHead className="h-10 text-[11px]">Donusum</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCampaigns.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-muted-foreground py-8 text-center text-xs"
              >
                Filtreye uygun kampanya bulunamadi.
              </TableCell>
            </TableRow>
          )}

          {filteredCampaigns.map(item => (
            <TableRow
              key={item.id}
              className="border-border/80 border-b last:border-b-0"
            >
              <TableCell className="py-3 pl-4">
                <div>
                  <p className="text-foreground text-xs font-semibold">
                    {item.name}
                  </p>
                  <p className="text-muted-foreground text-[11px]">{item.id}</p>
                </div>
              </TableCell>
              <TableCell className="py-3 text-xs">{item.segment}</TableCell>
              <TableCell className="py-3">
                <Badge className={cn("text-[11px]", statusStyles[item.status])}>
                  {item.status}
                </Badge>
              </TableCell>
              <TableCell className="py-3 text-xs">{item.plannedAt}</TableCell>
              <TableCell className="py-3 text-xs">
                %{item.conversionRate}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
