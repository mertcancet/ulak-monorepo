import {
  ArrowLeft,
  AudioLines,
  Bot,
  Clock3,
  Copy,
  Gauge,
  Phone,
  User,
} from "lucide-react";
import { Link, useParams } from "react-router";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { cn } from "~/lib/utils";
import {
  type CallHistoryItem,
  getCallById,
  type TranscriptLine,
} from "./_components/call-history/mock-data";
import DashboardHeader from "./_components/dashboard-header";

const formatDuration = (durationSeconds: number): string => {
  const minutes = Math.floor(durationSeconds / 60);
  const seconds = durationSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
};

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

const statusBadgeClass: Record<CallHistoryItem["status"], string> = {
  Basarili: "border-emerald-400/30 bg-emerald-500/10 text-emerald-300",
  Basarisiz: "border-red-400/30 bg-red-500/10 text-red-300",
  Cevapsiz: "border-zinc-500/40 bg-zinc-700/30 text-zinc-300",
};

const statusLabelMap: Record<CallHistoryItem["status"], string> = {
  Basarili: "Basarili",
  Basarisiz: "Basarisiz",
  Cevapsiz: "Cevapsiz",
};

const TranscriptBubble = ({ line }: { line: TranscriptLine }) => {
  const isAssistant = line.role === "assistant";
  const isSystem = line.role === "system";

  if (isSystem) {
    return (
      <div className="text-muted-foreground mx-auto rounded-full border border-dashed px-3 py-1 text-[11px]">
        {line.at} · {line.text}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex gap-3",
        isAssistant ? "justify-start" : "justify-end",
      )}
    >
      {isAssistant && (
        <div className="bg-primary/10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
          <Bot className="text-primary h-3 w-3" />
        </div>
      )}

      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-3 py-2",
          isAssistant
            ? "bg-secondary text-foreground rounded-tl-sm"
            : "bg-primary text-primary-foreground rounded-tr-sm",
        )}
      >
        <p className="text-xs leading-relaxed">{line.text}</p>
        <p
          className={cn(
            "mt-1 text-[10px]",
            isAssistant
              ? "text-muted-foreground"
              : "text-primary-foreground/70",
          )}
        >
          {line.at}
        </p>
      </div>

      {!isAssistant && (
        <div className="bg-muted mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
          <User className="text-muted-foreground h-3 w-3" />
        </div>
      )}
    </div>
  );
};

const CallHistoryDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const call = id ? getCallById(id) : undefined;

  if (!call) {
    return (
      <div className="bg-background flex h-full flex-col">
        <DashboardHeader>
          <Link to="/dashboard/call-history">
            <Button variant="ghost" size="sm" className="gap-2 text-xs">
              <ArrowLeft className="h-3.5 w-3.5" />
              Cagri Gecmisine Don
            </Button>
          </Link>
        </DashboardHeader>

        <div className="text-muted-foreground flex flex-1 flex-col items-center justify-center px-6 text-center">
          <Phone className="mb-3 h-10 w-10 opacity-30" />
          <p className="text-sm font-medium">Cagri kaydi bulunamadi.</p>
          <p className="mt-1 text-xs">
            Baglantinin dogru oldugunu kontrol edin.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background animate-in fade-in flex h-full flex-col duration-500">
      <DashboardHeader>
        <div className="flex items-center gap-3">
          <Link to="/dashboard/call-history">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>

          <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-lg">
            <Phone className="text-primary h-4 w-4" />
          </div>

          <div>
            <h1 className="font-mono text-sm font-bold tracking-tight">
              {call.id}
            </h1>
            <p className="text-muted-foreground text-[11px]">
              {call.userName} · {call.callerNumber}
            </p>
          </div>

          <Badge
            variant="outline"
            className={cn(
              "rounded-md px-2 py-0 text-[10px] font-bold uppercase",
              statusBadgeClass[call.status],
            )}
          >
            {statusLabelMap[call.status]}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="border-border bg-secondary/50 h-8 gap-2 border text-xs font-semibold"
            onClick={() => navigator.clipboard.writeText(call.id)}
          >
            <Copy className="h-3.5 w-3.5" />
            ID Kopyala
          </Button>
        </div>
      </DashboardHeader>

      <div className="border-border/50 bg-secondary/15 grid grid-cols-2 gap-px border-y sm:grid-cols-4">
        {[
          { label: "Sure", value: formatDuration(call.durationSeconds) },
          { label: "Maliyet", value: `$${call.costUsd.toFixed(3)}` },
          { label: "Model", value: call.model },
          { label: "Gecikme", value: `${call.latencyMs} ms` },
        ].map(metric => (
          <div key={metric.label} className="bg-background px-5 py-4">
            <p className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
              {metric.label}
            </p>
            <p className="text-foreground mt-1 text-lg font-bold">
              {metric.value}
            </p>
          </div>
        ))}
      </div>

      <div className="scrollbar-thin flex-1 overflow-y-auto px-6 py-5">
        <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="border-border/50 bg-card rounded-xl border p-4">
            <p className="text-muted-foreground mb-1 text-[10px] font-bold tracking-widest uppercase">
              Baslangic
            </p>
            <p className="font-mono text-xs font-semibold">
              {formatDateTime(call.startedAt)}
            </p>
          </div>
          <div className="border-border/50 bg-card rounded-xl border p-4">
            <p className="text-muted-foreground mb-1 text-[10px] font-bold tracking-widest uppercase">
              Kanal · Yon
            </p>
            <p className="text-xs font-semibold uppercase">
              {call.channel.replace("_", " ")} · {call.direction}
            </p>
          </div>
          <div className="border-border/50 bg-card rounded-xl border p-4">
            <p className="text-muted-foreground mb-1 text-[10px] font-bold tracking-widest uppercase">
              Ajan
            </p>
            <p className="text-xs font-semibold">{call.agentName}</p>
          </div>
          <div className="border-border/50 bg-card rounded-xl border p-4">
            <p className="text-muted-foreground mb-1 text-[10px] font-bold tracking-widest uppercase">
              Aktarim
            </p>
            <p className="text-xs font-semibold">
              {call.transferedToHuman
                ? "Insan temsilciye aktarildi"
                : "Ajan tarafinda tamamlandi"}
            </p>
          </div>
        </div>

        <Tabs defaultValue="overview" className="gap-4">
          <TabsList>
            <TabsTrigger value="overview" className="text-xs">
              Genel Bakis
            </TabsTrigger>
            <TabsTrigger value="transcript" className="text-xs">
              Transcript
            </TabsTrigger>
            <TabsTrigger value="timeline" className="text-xs">
              Zaman Cizelgesi
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
              <section className="border-border/50 bg-card rounded-xl border p-5">
                <h2 className="text-foreground text-sm font-bold">
                  Cagri Ozeti
                </h2>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {call.summary}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {call.tags.map(tag => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-border/60 bg-secondary/40 px-2 py-0 text-[10px]"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </section>

              <section className="border-border/50 bg-card rounded-xl border p-5">
                <h2 className="text-foreground text-sm font-bold">
                  Teknik Bilgiler
                </h2>
                <div className="mt-3 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <Clock3 className="h-3.5 w-3.5" /> Kesinti
                    </span>
                    <span className="font-semibold">{call.interruptions}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <Gauge className="h-3.5 w-3.5" /> Gecikme
                    </span>
                    <span className="font-semibold">{call.latencyMs} ms</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <AudioLines className="h-3.5 w-3.5" /> Kayit
                    </span>
                    <span className="font-semibold">
                      {call.recordingAvailable ? "Mevcut" : "Yok"}
                    </span>
                  </div>
                </div>
              </section>
            </div>
          </TabsContent>

          <TabsContent value="transcript">
            <section className="border-border/50 bg-card rounded-xl border p-5">
              {call.transcript.length === 0 ? (
                <div className="text-muted-foreground flex flex-col items-center justify-center py-12 text-sm">
                  <AudioLines className="mb-2 h-7 w-7 opacity-30" />
                  Bu cagrida transcript kaydi bulunmuyor.
                </div>
              ) : (
                <div className="space-y-3">
                  {call.transcript.map((line, index) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: static mock transcript
                    <TranscriptBubble key={index} line={line} />
                  ))}
                </div>
              )}
            </section>
          </TabsContent>

          <TabsContent value="timeline">
            <section className="border-border/50 bg-card rounded-xl border p-5">
              <div className="space-y-4">
                {call.timeline.map(event => (
                  <div
                    key={`${call.id}-${event.at}-${event.title}`}
                    className="flex gap-3"
                  >
                    <div className="bg-primary mt-1 h-2 w-2 rounded-full" />
                    <div>
                      <p className="text-foreground text-xs font-semibold">
                        {event.title}{" "}
                        <span className="text-muted-foreground">
                          · {event.at}
                        </span>
                      </p>
                      <p className="text-muted-foreground mt-1 text-xs">
                        {event.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CallHistoryDetailPage;
