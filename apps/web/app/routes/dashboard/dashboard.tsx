import {
  Bot,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  MoreVertical,
  Search,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
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
    <div className="animate-in fade-in duration-500">
      <DashboardHeader>
        <h1 className="text-lg font-bold tracking-tight">Temsilciler</h1>
        <div className="flex items-center space-x-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-primary transition-colors" />
            <Input
              className="pl-9 pr-4 h-9 w-64 bg-secondary/50 border-border focus:bg-card transition-all"
              placeholder="Temsilci ara..."
              value={searchTerm}
              onChange={event => setSearchTerm(event.target.value)}
            />
          </div>
          <Button variant="outline" size="sm" className="h-9 gap-2">
            <Download className="w-3.5 h-3.5" />
            İçe Aktar
          </Button>
          <Button
            size="sm"
            className="h-9 gap-2 font-semibold"
            onClick={handleCreateAgent}
            disabled={isCreating}
          >
            <span>Temsilci Oluştur</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </Button>
        </div>
      </DashboardHeader>

      <div className="p-8 space-y-6 flex-1 overflow-auto">
        {errorMessage && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            {errorMessage}
          </div>
        )}

        <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden glass">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent bg-secondary/30">
                <TableHead className="w-75 text-[11px] uppercase tracking-wider font-bold h-12">
                  Temsilci Adı
                </TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider font-bold h-12">
                  Temsilci Türü
                </TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider font-bold h-12">
                  Ses
                </TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider font-bold h-12">
                  Telefon
                </TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider font-bold h-12">
                  Son Düzenleme
                </TableHead>
                <TableHead className="w-12 h-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell
                    className="py-8 text-center text-muted-foreground"
                    colSpan={6}
                  >
                    Temsilciler yukleniyor...
                  </TableCell>
                </TableRow>
              )}

              {!isLoading && filteredAgents.length === 0 && (
                <TableRow>
                  <TableCell
                    className="py-8 text-center text-muted-foreground"
                    colSpan={6}
                  >
                    Temsilci bulunamadi.
                  </TableCell>
                </TableRow>
              )}

              {!isLoading &&
                filteredAgents.map(agent => (
                  <TableRow
                    key={agent.id}
                    className="group hover:bg-secondary/20 transition-colors"
                  >
                    <TableCell className="py-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-secondary rounded-lg border border-border group-hover:border-primary/20 transition-colors">
                          <Bot className="w-4 h-4 text-primary" />
                        </div>
                        <button
                          type="button"
                          className="text-sm font-semibold tracking-tight text-left hover:underline"
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
                      <Badge
                        variant="secondary"
                        className="font-medium text-[10px] px-2 py-0 h-5 bg-secondary text-muted-foreground border-border"
                      >
                        {agent.hasFlow ? "Sohbet Akisi" : "Bos"}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-6 h-6 ring-1 ring-border">
                          <AvatarImage src={DEFAULT_VOICE_IMAGE} />
                          <AvatarFallback>V</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-foreground/80 font-medium">
                          {DEFAULT_VOICE_NAME}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-sm text-muted-foreground">
                      -
                    </TableCell>
                    <TableCell className="py-4 text-sm text-muted-foreground/80">
                      {formatDate(agent.updatedAt)}
                    </TableCell>
                    <TableCell className="py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-40 border-border"
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

          <div className="px-6 py-4 bg-secondary/10 border-t border-border flex items-center justify-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground disabled:opacity-30"
              disabled
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="w-7 h-7 flex items-center justify-center bg-primary text-primary-foreground rounded-lg text-xs font-bold shadow-sm">
              1
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
