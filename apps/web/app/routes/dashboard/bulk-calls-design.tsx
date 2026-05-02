import { ArrowLeft, Search, Upload } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { type AgentListItem, agentsApi } from "~/lib/agents-api";
import { contactNumberItems } from "./_components/bulk-calls";
import DashboardHeader from "./_components/dashboard-header";

export default function BulkCallsDesignPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [agents, setAgents] = useState<AgentListItem[]>([]);
  const [selectedAgentId, setSelectedAgentId] = useState("");
  const [isAgentsLoading, setIsAgentsLoading] = useState(true);
  const [agentsError, setAgentsError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadAgents = async () => {
      setIsAgentsLoading(true);
      setAgentsError(null);

      try {
        const rows = await agentsApi.listAgents();
        const items = rows.data;
        if (cancelled) return;

        setAgents(items);
        if (items.length > 0) {
          setSelectedAgentId(items[0]?.id ?? "");
        }
      } catch (error) {
        if (cancelled) return;

        setAgentsError(
          error instanceof Error ? error.message : "Agent listesi alinamadi.",
        );
      } finally {
        if (!cancelled) {
          setIsAgentsLoading(false);
        }
      }
    };

    void loadAgents();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredNumbers = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    if (!normalized) {
      return contactNumberItems;
    }

    return contactNumberItems.filter(item =>
      [item.fullName, item.phone, item.audienceName, item.customerGroup]
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
  }, [searchTerm]);

  const toggleSelection = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
  };

  const toggleAllVisible = () => {
    const visibleIds = filteredNumbers.map(item => item.id);
    const allVisibleSelected = visibleIds.every(id => selectedIds.includes(id));

    if (allVisibleSelected) {
      setSelectedIds(prev => prev.filter(id => !visibleIds.includes(id)));
      return;
    }

    setSelectedIds(prev => Array.from(new Set([...prev, ...visibleIds])));
  };

  const allVisibleSelected =
    filteredNumbers.length > 0 &&
    filteredNumbers.every(item => selectedIds.includes(item.id));

  return (
    <div className="bg-background animate-in fade-in flex h-full flex-col overflow-hidden duration-300">
      <DashboardHeader>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="gap-2"
            onClick={() => navigate("/dashboard/bulk-calls")}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Toplu Cagriya Don
          </Button>
          <h1 className="text-foreground font-display text-base font-semibold">
            Kampanya Tasarimi
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" size="sm" className="gap-2">
            <Upload className="h-3.5 w-3.5" />
            CSV Yukle
          </Button>
          <Button type="button" size="sm">
            Kampanyayi Kaydet
          </Button>
        </div>
      </DashboardHeader>

      <main className="scrollbar-thin flex-1 space-y-6 overflow-y-auto p-6">
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <article className="bg-card border-border rounded-2xl border p-5 shadow-sm xl:col-span-7">
            <h2 className="text-foreground text-sm font-semibold">
              Kampanya Bilgileri
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <label
                  htmlFor="campaign-name"
                  className="text-muted-foreground text-xs"
                >
                  Kampanya Adi
                </label>
                <Input
                  id="campaign-name"
                  placeholder="Orn. Bahar Kontrol Bilgilendirme"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="audience-name"
                  className="text-muted-foreground text-xs"
                >
                  Hedef Kitle Adi
                </label>
                <Input
                  id="audience-name"
                  placeholder="Orn. Sadakat Geri Kazanim"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label
                  htmlFor="call-window"
                  className="text-muted-foreground text-xs"
                >
                  Arama Penceresi
                </label>
                <select
                  id="call-window"
                  className="border-border bg-background text-foreground h-9 w-full rounded-md border px-3 text-sm"
                >
                  <option>09:00 - 18:00</option>
                  <option>10:00 - 20:00</option>
                  <option>Hafta ici 12:00 - 21:00</option>
                </select>
              </div>
            </div>

            <div className="mt-4 space-y-1.5">
              <label
                htmlFor="agent-select"
                className="text-muted-foreground text-xs"
              >
                Agent Secimi
              </label>
              <select
                id="agent-select"
                value={selectedAgentId}
                onChange={event => setSelectedAgentId(event.target.value)}
                disabled={isAgentsLoading || agents.length === 0}
                className="border-border bg-background text-foreground h-9 w-full rounded-md border px-3 text-sm disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isAgentsLoading && <option>Agentler yukleniyor...</option>}

                {!isAgentsLoading && agents.length === 0 && (
                  <option value="">Secilebilir agent yok</option>
                )}

                {!isAgentsLoading &&
                  agents.map(agent => (
                    <option key={agent.id} value={agent.id}>
                      {agent.name}
                    </option>
                  ))}
              </select>
              {agentsError && (
                <p className="text-destructive text-xs">{agentsError}</p>
              )}
            </div>
          </article>

          <article className="bg-card border-border rounded-2xl border p-5 shadow-sm xl:col-span-5">
            <h2 className="text-foreground text-sm font-semibold">
              CSV Yukleme
            </h2>
            <p className="text-muted-foreground mt-1 text-xs">
              Numaralari tek seferde eklemek icin CSV dosyasi yukleyin.
            </p>
            <label
              htmlFor="csv-upload"
              className="border-border bg-secondary/30 mt-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed p-6 text-center"
            >
              <Upload className="text-muted-foreground mb-2 h-5 w-5" />
              <span className="text-foreground text-sm font-medium">
                CSV Dosyasi Sec
              </span>
              <span className="text-muted-foreground mt-1 text-xs">
                Beklenen kolonlar: ad, telefon, hedef_kitle, musteri_grubu,
                sehir
              </span>
            </label>
            <input
              id="csv-upload"
              type="file"
              accept=".csv"
              className="hidden"
            />

            <div className="bg-secondary/40 mt-4 rounded-xl p-3 text-xs">
              <p className="text-muted-foreground">Secili numara</p>
              <p className="text-foreground mt-1 text-lg font-semibold">
                {selectedIds.length}
              </p>
            </div>
          </article>
        </section>

        <section className="bg-card border-border overflow-hidden rounded-2xl border shadow-sm">
          <div className="border-border flex flex-col gap-3 border-b p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-foreground text-sm font-semibold">
                Tablodan Numara Secimi
              </h2>
              <p className="text-muted-foreground mt-1 text-xs">
                Hedef kitleyi numara tablosundan secerek olusturun.
              </p>
            </div>

            <div className="group relative w-full md:w-72">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2" />
              <Input
                value={searchTerm}
                onChange={event => setSearchTerm(event.target.value)}
                placeholder="Kisi, telefon veya grup ara"
                className="h-8 pl-9 text-xs"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/50 border-border border-b hover:bg-transparent">
                <TableHead className="h-10 w-12 pl-4">
                  <input
                    type="checkbox"
                    aria-label="Tumunu sec"
                    checked={allVisibleSelected}
                    onChange={toggleAllVisible}
                  />
                </TableHead>
                <TableHead className="h-10 text-[11px]">Kisi</TableHead>
                <TableHead className="h-10 text-[11px]">Telefon</TableHead>
                <TableHead className="h-10 text-[11px]">Hedef Kitle</TableHead>
                <TableHead className="h-10 text-[11px]">
                  Musteri Grubu
                </TableHead>
                <TableHead className="h-10 text-[11px]">Sehir</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNumbers.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-muted-foreground py-8 text-center text-xs"
                  >
                    Sonuc bulunamadi.
                  </TableCell>
                </TableRow>
              )}

              {filteredNumbers.map(item => {
                const isSelected = selectedIds.includes(item.id);

                return (
                  <TableRow
                    key={item.id}
                    className="border-border/80 border-b last:border-b-0"
                  >
                    <TableCell className="pl-4">
                      <input
                        type="checkbox"
                        aria-label={`${item.fullName} sec`}
                        checked={isSelected}
                        onChange={() => toggleSelection(item.id)}
                      />
                    </TableCell>
                    <TableCell className="py-3 text-xs font-semibold">
                      {item.fullName}
                    </TableCell>
                    <TableCell className="py-3 text-xs">{item.phone}</TableCell>
                    <TableCell className="py-3 text-xs">
                      {item.audienceName}
                    </TableCell>
                    <TableCell className="py-3">
                      <Badge className="text-[11px]">
                        {item.customerGroup}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3 text-xs">{item.city}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </section>
      </main>
    </div>
  );
}
