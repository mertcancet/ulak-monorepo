import {
  Bot,
  ChevronLeft,
  ChevronRight,
  Download,
  MoreVertical,
  Search,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
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
import { initialEdges, initialNodes } from "./_components/agent-flow/data";
import DashboardHeader from "./_components/dashboard-header";

const DEFAULT_VOICE_NAME = "Autonoe";
const DEFAULT_VOICE_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDFE04qOA0LzD1UUmktDRXDrl-UvuwAudLMxFGmnVqVdBZ7AeN9gf8LnFm_8gm39d6ACuczz67VSE-kiF9AI_Ax8clL_F03_gZeC77QphBQfMOh3rpENrHLnEQS8chh18ss_rUF-f53uqawef7bYC0Twexri6KFpWgF6hjN-C6xynZtie99MQmzGy-P4moWodPMU0xg-L8WLPE4h700MImRJyeM7AKMocGaW4hJBkEe_ai97yh2It8vddTIoyIShRSJy0LtzcjlF_A";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("tr-TR", {
    dateStyle: "short",
    timeStyle: "short",
  });

export default function Dashboard() {
  const navigate = useNavigate();
  const [agents, setAgents] = useState<AgentListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [deletingAgentId, setDeletingAgentId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const filteredAgents = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    if (!normalized) return agents;

    return agents.filter(agent =>
      [agent.name, agent.description ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
  }, [agents, searchTerm]);

  useEffect(() => {
    let cancelled = false;

    const loadAgents = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const rows = await agentsApi.listAgents();
        if (!cancelled) {
          setAgents(rows);
        }
      } catch (error) {
        if (!cancelled) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "Temsilci listesi alinamadi.",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadAgents();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleCreateAgent = async () => {
    setIsCreating(true);
    setErrorMessage(null);

    try {
      const clonedNodes = structuredClone(initialNodes);
      const clonedEdges = structuredClone(initialEdges);

      const createdAgent = await agentsApi.createAgent({
        name: "Yeni Agent",
        flow: {
          nodes: clonedNodes,
          edges: clonedEdges,
        },
      });

      navigate(`/dashboard/agent-flow?agentId=${createdAgent.id}`);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Temsilci olusturulamadi.",
      );
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteAgent = async (agentId: string) => {
    const approved = window.confirm(
      "Bu temsilciyi silmek istedigine emin misin?",
    );
    if (!approved) return;

    setDeletingAgentId(agentId);
    setErrorMessage(null);

    try {
      await agentsApi.deleteAgent(agentId);
      setAgents(prev => prev.filter(agent => agent.id !== agentId));
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Temsilci silinemedi.",
      );
    } finally {
      setDeletingAgentId(null);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden animate-in fade-in duration-300">
      <DashboardHeader>
        <h1 className="text-base font-semibold text-foreground font-display">
          Temsilciler
        </h1>
        <div className="flex items-center gap-2.5">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-3.5 h-3.5 group-focus-within:text-brand transition-colors" />
            <Input
              className="pl-9 pr-4 h-9 w-60 bg-secondary border-transparent focus:bg-background focus:border-border transition-all rounded-lg text-sm text-foreground placeholder:text-muted-foreground"
              placeholder="Temsilci ara..."
              value={searchTerm}
              onChange={event => setSearchTerm(event.target.value)}
            />
          </div>
          <button
            type="button"
            className="h-9 px-3.5 flex items-center gap-1.5 text-sm font-medium text-foreground bg-secondary hover:bg-muted rounded-lg transition-colors border-0"
          >
            <Download className="w-3.5 h-3.5" />
            İçe Aktar
          </button>
          <button
            type="button"
            className="h-9 px-4 flex items-center gap-1.5 text-sm font-semibold text-white bg-foreground hover:bg-foreground/90 rounded-lg transition-colors"
            onClick={handleCreateAgent}
            disabled={isCreating}
          >
            <span>{isCreating ? "Oluşturuluyor..." : "Temsilci Oluştur"}</span>
          </button>
        </div>
      </DashboardHeader>

      <div className="p-6 space-y-5 flex-1 overflow-auto bg-background">
        {errorMessage && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {errorMessage}
          </div>
        )}

        <div className="rounded-2xl border border-border bg-background shadow-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent bg-secondary/60 border-b border-border">
                <TableHead className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground h-11 pl-6">
                  Temsilci Adı
                </TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground h-11">
                  Tür
                </TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground h-11">
                  Ses
                </TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground h-11">
                  Telefon
                </TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground h-11">
                  Son Düzenleme
                </TableHead>
                <TableHead className="w-12 h-11"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell
                    className="py-10 text-center text-sm text-muted-foreground"
                    colSpan={6}
                  >
                    Temsilciler yükleniyor...
                  </TableCell>
                </TableRow>
              )}

              {!isLoading && filteredAgents.length === 0 && (
                <TableRow>
                  <TableCell
                    className="py-10 text-center text-sm text-muted-foreground"
                    colSpan={6}
                  >
                    Temsilci bulunamadı.
                  </TableCell>
                </TableRow>
              )}

              {!isLoading &&
                filteredAgents.map(agent => (
                  <TableRow
                    key={agent.id}
                    className="group hover:bg-secondary/40 transition-colors border-b border-muted last:border-b-0"
                  >
                    <TableCell className="py-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-brand/8 rounded-xl border border-brand/15 group-hover:border-brand/30 transition-colors">
                          <Bot className="w-4 h-4 text-brand" />
                        </div>
                        <button
                          type="button"
                          className="text-sm font-semibold text-foreground text-left hover:text-brand transition-colors"
                          onClick={() =>
                            navigate(
                              `/dashboard/agent-flow?agentId=${agent.id}`,
                            )
                          }
                        >
                          {agent.name}
                        </button>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-secondary text-secondary-foreground">
                        {agent.hasFlow ? "Sohbet Akışı" : "Boş"}
                      </span>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6 ring-1 ring-border">
                          <AvatarImage src={DEFAULT_VOICE_IMAGE} />
                          <AvatarFallback className="text-[10px]">
                            V
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-secondary-foreground font-medium">
                          {DEFAULT_VOICE_NAME}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-sm text-muted-foreground">
                      -
                    </TableCell>
                    <TableCell className="py-4 text-sm text-muted-foreground">
                      {formatDate(agent.updatedAt)}
                    </TableCell>
                    <TableCell className="py-4 text-right pr-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            className="h-8 w-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-40 border-border rounded-xl shadow-card"
                        >
                          <DropdownMenuItem
                            onClick={() =>
                              navigate(
                                `/dashboard/agent-flow?agentId=${agent.id}`,
                              )
                            }
                          >
                            Düzenle
                          </DropdownMenuItem>
                          <DropdownMenuItem>Kopyala</DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            disabled={deletingAgentId === agent.id}
                            onClick={() => handleDeleteAgent(agent.id)}
                          >
                            Sil
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          <div className="px-6 py-3.5 bg-secondary/30 border-t border-border flex items-center justify-center gap-3">
            <button
              type="button"
              className="h-8 w-8 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary transition-colors disabled:opacity-30"
              disabled
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="w-7 h-7 flex items-center justify-center bg-foreground text-white rounded-lg text-xs font-semibold">
              1
            </div>
            <button
              type="button"
              className="h-8 w-8 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
