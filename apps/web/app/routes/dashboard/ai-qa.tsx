import {
  AlertTriangle,
  CheckCircle2,
  Download,
  FlaskConical,
  Microscope,
  RefreshCw,
  Search,
  ShieldCheck,
  Timer,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Progress } from "~/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { cn } from "~/lib/utils";
import DashboardHeader from "./_components/dashboard-header";

type QaStatus = "Gecti" | "Riskli" | "Kritik";

interface QaEvaluation {
  id: string;
  agentName: string;
  scenario: string;
  status: QaStatus;
  score: number;
  latencyMs: number;
  hallucinationRate: number;
  evaluatedAt: string;
}

interface QaIssue {
  id: string;
  title: string;
  severity: "Yuksek" | "Orta" | "Dusuk";
  agentName: string;
  openedSince: string;
  owner: string;
}

const qaEvaluations: QaEvaluation[] = [
  {
    id: "qa_101",
    agentName: "Destek Asistani",
    scenario: "Iade sureci bilgilendirmesi",
    status: "Gecti",
    score: 94,
    latencyMs: 812,
    hallucinationRate: 1.2,
    evaluatedAt: "Bugun 10:42",
  },
  {
    id: "qa_102",
    agentName: "Satis Asistani",
    scenario: "Kurumsal fiyatlandirma teklifi",
    status: "Riskli",
    score: 73,
    latencyMs: 1340,
    hallucinationRate: 4.8,
    evaluatedAt: "Bugun 10:36",
  },
  {
    id: "qa_103",
    agentName: "Randevu Asistani",
    scenario: "Randevu degisiklik talebi",
    status: "Kritik",
    score: 48,
    latencyMs: 1890,
    hallucinationRate: 9.1,
    evaluatedAt: "Bugun 10:20",
  },
  {
    id: "qa_104",
    agentName: "Destek Asistani",
    scenario: "Siparis gecikmesi telafisi",
    status: "Gecti",
    score: 91,
    latencyMs: 930,
    hallucinationRate: 1.9,
    evaluatedAt: "Bugun 09:58",
  },
  {
    id: "qa_105",
    agentName: "Satis Asistani",
    scenario: "Cok dilli urun sunumu",
    status: "Riskli",
    score: 69,
    latencyMs: 1510,
    hallucinationRate: 5.4,
    evaluatedAt: "Bugun 09:34",
  },
];

const qaIssues: QaIssue[] = [
  {
    id: "iss_01",
    title: "Yuksek gecikmede yanit tutarliligi dusuyor",
    severity: "Yuksek",
    agentName: "Randevu Asistani",
    openedSince: "2 saat",
    owner: "Mert",
  },
  {
    id: "iss_02",
    title: "Fiyat bilgisi guncel olmayan kaynakla eslesiyor",
    severity: "Orta",
    agentName: "Satis Asistani",
    openedSince: "5 saat",
    owner: "QA Bot",
  },
  {
    id: "iss_03",
    title: "Nadir edge-case senaryolarinda kararsiz ton",
    severity: "Dusuk",
    agentName: "Destek Asistani",
    openedSince: "1 gun",
    owner: "Ekip",
  },
];

const statusConfig: Record<QaStatus, { label: string; className: string }> = {
  Gecti: {
    label: "Gecti",
    className: "bg-success/10 text-success border-success/20",
  },
  Riskli: {
    label: "Riskli",
    className: "bg-warning/10 text-warning border-warning/20",
  },
  Kritik: {
    label: "Kritik",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
};

const severityConfig: Record<QaIssue["severity"], string> = {
  Yuksek: "bg-destructive/10 text-destructive border-destructive/20",
  Orta: "bg-warning/10 text-warning border-warning/20",
  Dusuk: "bg-muted text-muted-foreground border-border",
};

export default function AiQaPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"Tum" | QaStatus>("Tum");

  const filteredEvaluations = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return qaEvaluations.filter(item => {
      const matchesText =
        !query ||
        [item.agentName, item.scenario, item.id]
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "Tum" || item.status === statusFilter;

      return matchesText && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const avgScore = Math.round(
    qaEvaluations.reduce((acc, item) => acc + item.score, 0) /
      qaEvaluations.length,
  );

  return (
    <div className="bg-background flex h-full flex-col overflow-hidden">
      <DashboardHeader>
        <h1 className="text-foreground font-display text-base font-semibold">
          AI Kalite Guvencesi
        </h1>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" size="sm" className="gap-2">
            <Download className="h-3.5 w-3.5" />
            Rapor Disa Aktar
          </Button>
          <Button type="button" size="sm" className="gap-2">
            <RefreshCw className="h-3.5 w-3.5" />
            Testleri Yenile
          </Button>
        </div>
      </DashboardHeader>

      <main className="scrollbar-thin flex-1 space-y-6 overflow-y-auto p-6">
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="bg-card border-border rounded-2xl border p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-muted-foreground text-xs">
                Ortalama Guven Skoru
              </p>
              <ShieldCheck className="text-brand h-4 w-4" />
            </div>
            <p className="text-foreground text-2xl font-semibold tracking-tight">
              %{avgScore}
            </p>
            <Progress value={avgScore} className="mt-3" />
          </article>

          <article className="bg-card border-border rounded-2xl border p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-muted-foreground text-xs">Kritik Hata</p>
              <AlertTriangle className="text-destructive h-4 w-4" />
            </div>
            <p className="text-foreground text-2xl font-semibold tracking-tight">
              1
            </p>
            <p className="text-muted-foreground mt-2 text-xs">
              Son 24 saatte tespit edildi
            </p>
          </article>

          <article className="bg-card border-border rounded-2xl border p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-muted-foreground text-xs">Son Kosu</p>
              <Timer className="text-brand h-4 w-4" />
            </div>
            <p className="text-foreground text-2xl font-semibold tracking-tight">
              10:42
            </p>
            <p className="text-muted-foreground mt-2 text-xs">
              Toplam 128 senaryo calisti
            </p>
          </article>

          <article className="bg-card border-border rounded-2xl border p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-muted-foreground text-xs">Aksiyon Bekleyen</p>
              <Microscope className="text-brand h-4 w-4" />
            </div>
            <p className="text-foreground text-2xl font-semibold tracking-tight">
              {qaIssues.length}
            </p>
            <p className="text-muted-foreground mt-2 text-xs">
              Dogrulama kuyruunda
            </p>
          </article>
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <article className="bg-card border-border overflow-hidden rounded-2xl border shadow-sm xl:col-span-8">
            <div className="border-border flex flex-col gap-3 border-b p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-foreground text-sm font-semibold">
                  Degerlendirme Sonuclari
                </h2>
                <p className="text-muted-foreground mt-1 text-xs">
                  Ajan cevaplari tutarlilik, halusinasyon ve gecikme
                  metrikleriyle puanlanir.
                </p>
              </div>

              <div className="flex w-full flex-col gap-2 sm:flex-row md:w-auto">
                <div className="group relative w-full sm:w-56">
                  <Search className="text-muted-foreground group-focus-within:text-brand absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 transition-colors" />
                  <Input
                    value={searchTerm}
                    onChange={event => setSearchTerm(event.target.value)}
                    placeholder="Ajan veya senaryo ara"
                    className="h-8 pl-9 text-xs"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={event =>
                    setStatusFilter(event.target.value as "Tum" | QaStatus)
                  }
                  className="border-border bg-background text-foreground h-8 rounded-lg border px-2.5 text-xs"
                >
                  <option value="Tum">Tum Durumlar</option>
                  <option value="Gecti">Gecti</option>
                  <option value="Riskli">Riskli</option>
                  <option value="Kritik">Kritik</option>
                </select>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/60 border-border border-b hover:bg-transparent">
                  <TableHead className="h-10 pl-4 text-[11px]">Ajan</TableHead>
                  <TableHead className="h-10 text-[11px]">Senaryo</TableHead>
                  <TableHead className="h-10 text-[11px]">Skor</TableHead>
                  <TableHead className="h-10 text-[11px]">Durum</TableHead>
                  <TableHead className="h-10 text-[11px]">Gecikme</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvaluations.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-muted-foreground py-8 text-center text-xs"
                    >
                      Filtreye uygun sonuc bulunamadi.
                    </TableCell>
                  </TableRow>
                )}

                {filteredEvaluations.map(item => (
                  <TableRow
                    key={item.id}
                    className="border-border/80 border-b last:border-b-0"
                  >
                    <TableCell className="py-3 pl-4">
                      <p className="text-foreground text-xs font-medium">
                        {item.agentName}
                      </p>
                      <p className="text-muted-foreground mt-1 text-[11px]">
                        {item.id}
                      </p>
                    </TableCell>
                    <TableCell className="py-3 text-xs">
                      {item.scenario}
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="min-w-28">
                        <p className="text-foreground text-xs font-semibold">
                          %{item.score}
                        </p>
                        <Progress value={item.score} className="mt-1.5 h-1.5" />
                      </div>
                    </TableCell>
                    <TableCell className="py-3">
                      <Badge
                        className={cn(
                          "border",
                          statusConfig[item.status].className,
                        )}
                      >
                        {statusConfig[item.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3">
                      <p className="text-foreground text-xs">
                        {item.latencyMs} ms
                      </p>
                      <p className="text-muted-foreground mt-1 text-[11px]">
                        Halusinasyon %{item.hallucinationRate}
                      </p>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </article>

          <aside className="space-y-4 xl:col-span-4">
            <article className="bg-card border-border rounded-2xl border p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-foreground text-sm font-semibold">
                  Risk Kuyrugu
                </h2>
                <Badge variant="secondary">{qaIssues.length} acik</Badge>
              </div>

              <div className="space-y-3">
                {qaIssues.map(issue => (
                  <div
                    key={issue.id}
                    className="border-border rounded-xl border p-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-foreground text-xs font-medium">
                        {issue.title}
                      </p>
                      <Badge
                        className={cn("border", severityConfig[issue.severity])}
                      >
                        {issue.severity}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mt-2 text-[11px]">
                      {issue.agentName} · {issue.openedSince} once · Sorumlu:{" "}
                      {issue.owner}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <article className="bg-card border-border rounded-2xl border p-4 shadow-sm">
              <h2 className="text-foreground mb-2 text-sm font-semibold">
                Kural Seti Kapsami
              </h2>
              <p className="text-muted-foreground mb-4 text-xs">
                Her release oncesi zorunlu kontrol adimlari.
              </p>

              <ul className="space-y-2">
                <li className="text-foreground flex items-center gap-2 text-xs">
                  <CheckCircle2 className="text-success h-3.5 w-3.5" />
                  Prompt Injection dayaniklilik testi
                </li>
                <li className="text-foreground flex items-center gap-2 text-xs">
                  <CheckCircle2 className="text-success h-3.5 w-3.5" />
                  Hassas veri maskeleme dogrulamasi
                </li>
                <li className="text-foreground flex items-center gap-2 text-xs">
                  <FlaskConical className="text-warning h-3.5 w-3.5" />
                  Cok dilli tutarlilik benchmarki (devam ediyor)
                </li>
              </ul>
            </article>
          </aside>
        </section>
      </main>
    </div>
  );
}
