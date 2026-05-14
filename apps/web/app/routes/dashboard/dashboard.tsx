import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Bot,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Search,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
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
import { agentsApi } from "~/lib/agents-api";
import { useRoles } from "~/store/roles-store";
import { useWorkspaceStore } from "~/store/workspace-store";
import DashboardHeader from "./_components/dashboard-header";

const DEFAULT_VOICE_NAME = "Autonoe";
const DEFAULT_VOICE_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDFE04qOA0LzD1UUmktDRXDrl-UvuwAudLMxFGmnVqVdBZ7AeN9gf8LnFm_8gm39d6ACuczz67VSE-kiF9AI_Ax8clL_F03_gZeC77QphBQfMOh3rpENrHLnEQS8chh18ss_rUF-f53uqawef7bYC0Twexri6KFpWgF6hjN-C6xynZtie99MQmzGy-P4moWodPMU0xg-L8WLPE4h700MImRJyeM7AKMocGaW4hJBkEe_ai97yh2It8vddTIoyIShRSJy0LtzcjlF_A";

const _formatDate = (iso: string) =>
  new Date(iso).toLocaleString("tr-TR", {
    dateStyle: "short",
    timeStyle: "short",
  });

export default function Dashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [deletingAgentId, setDeletingAgentId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [actionErrorMessage, setActionErrorMessage] = useState<string | null>(
    null,
  );
  const { permissions } = useRoles();

  console.log(permissions);

  const { selectedWorkspaceId } = useWorkspaceStore();
  const {
    data: agentsResponse,
    isLoading: isAgentsLoading,
    error: agentsQueryError,
  } = useQuery({
    queryKey: ["agents", selectedWorkspaceId, 1, 20],
    queryFn: () => agentsApi.listAgents(1, 20),
    enabled: !!selectedWorkspaceId,
  });

  const agents = agentsResponse?.data ?? [];
  const errorMessage =
    actionErrorMessage ??
    (agentsQueryError instanceof Error ? agentsQueryError.message : null);

  const filteredAgents = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    if (!normalized) return agents;

    // Sadece agent.name ile filtrele
    return agents.filter(agent =>
      agent.name.toLowerCase().includes(normalized),
    );
  }, [agents, searchTerm]);

  const deleteMutation = useMutation({
    mutationFn: (agentId: string) => agentsApi.deleteAgent(agentId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["agents", selectedWorkspaceId, 1, 20],
      });
    },
  });

  const handleCreateAgent = () => {
    setActionErrorMessage(null);
    navigate("/dashboard/agent?draft=true");
  };

  const handleDeleteAgent = async (agentId: string) => {
    const approved = window.confirm(
      "Bu temsilciyi silmek istedigine emin misin?",
    );
    if (!approved) return;

    setDeletingAgentId(agentId);
    setActionErrorMessage(null);

    try {
      await deleteMutation.mutateAsync(agentId);
    } catch (error) {
      setActionErrorMessage(
        error instanceof Error ? error.message : "Temsilci silinemedi.",
      );
    } finally {
      setDeletingAgentId(null);
    }
  };

  return (
    <div className="animate-in fade-in flex h-full flex-col overflow-hidden duration-300">
      <DashboardHeader>
        <h1 className="text-foreground font-display text-base font-semibold">
          Temsilciler
        </h1>
        <div className="flex items-center gap-2.5">
          <div className="group relative">
            <Search className="text-muted-foreground group-focus-within:text-brand absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 transition-colors" />
            <Input
              className="bg-secondary focus:bg-background focus:border-border text-foreground placeholder:text-muted-foreground h-9 w-60 rounded-lg border-transparent pr-4 pl-9 text-sm transition-all"
              placeholder="Temsilci ara..."
              value={searchTerm}
              onChange={event => setSearchTerm(event.target.value)}
            />
          </div>
          {permissions?.agent?.includes("*") ||
          permissions?.agent?.includes("create") ? (
            <Button type="button" onClick={handleCreateAgent}>
              <span>Temsilci Oluştur</span>
            </Button>
          ) : null}
        </div>
      </DashboardHeader>

      <div className="bg-background flex-1 space-y-5 overflow-auto p-6">
        {errorMessage && (
          <div className="border-destructive/30 bg-destructive/10 text-destructive rounded-xl border px-4 py-3 text-sm">
            {errorMessage}
          </div>
        )}

        <div className="border-border bg-background shadow-card overflow-hidden rounded-2xl border">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/60 border-border border-b hover:bg-transparent">
                <TableHead className="text-muted-foreground h-11 pl-6 text-[11px] font-semibold tracking-wider uppercase">
                  Temsilci Adı
                </TableHead>
                <TableHead className="text-muted-foreground h-11 text-[11px] font-semibold tracking-wider uppercase">
                  Tür
                </TableHead>
                <TableHead className="text-muted-foreground h-11 text-[11px] font-semibold tracking-wider uppercase">
                  Ses
                </TableHead>
                <TableHead className="text-muted-foreground h-11 text-[11px] font-semibold tracking-wider uppercase">
                  Telefon
                </TableHead>
                <TableHead className="text-muted-foreground h-11 text-[11px] font-semibold tracking-wider uppercase">
                  Son Düzenleme
                </TableHead>
                <TableHead className="h-11 w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isAgentsLoading && (
                <TableRow>
                  <TableCell
                    className="text-muted-foreground py-10 text-center text-sm"
                    colSpan={6}
                  >
                    Temsilciler yükleniyor...
                  </TableCell>
                </TableRow>
              )}

              {!isAgentsLoading && filteredAgents.length === 0 && (
                <TableRow>
                  <TableCell
                    className="text-muted-foreground py-10 text-center text-sm"
                    colSpan={6}
                  >
                    Temsilci bulunamadı.
                  </TableCell>
                </TableRow>
              )}

              {!isAgentsLoading &&
                filteredAgents.map(agent => (
                  <TableRow
                    key={agent.id}
                    className="group hover:bg-secondary/40 border-muted border-b transition-colors last:border-b-0"
                  >
                    <TableCell className="py-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="bg-brand/8 border-brand/15 group-hover:border-brand/30 rounded-xl border p-2 transition-colors">
                          <Bot className="text-brand h-4 w-4" />
                        </div>
                        <button
                          type="button"
                          className="text-foreground hover:text-brand text-left text-sm font-semibold transition-colors"
                          onClick={() =>
                            navigate(`/dashboard/agent?agentId=${agent.id}`)
                          }
                        >
                          {agent.name}
                        </button>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="bg-secondary text-secondary-foreground inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium">
                        Boş
                      </span>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="ring-border h-6 w-6 ring-1">
                          <AvatarImage src={DEFAULT_VOICE_IMAGE} />
                          <AvatarFallback className="text-[10px]">
                            V
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-secondary-foreground text-sm font-medium">
                          {DEFAULT_VOICE_NAME}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground py-4 text-sm">
                      -
                    </TableCell>
                    <TableCell className="text-muted-foreground py-4 text-sm">
                      {agent.updatedAt.toLocaleString("tr-TR", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </TableCell>
                    <TableCell className="py-4 pr-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            className="text-muted-foreground hover:text-foreground hover:bg-secondary flex h-8 w-8 items-center justify-center rounded-lg opacity-0 transition-colors group-hover:opacity-100"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="border-border shadow-card w-40 rounded-xl"
                        >
                          <DropdownMenuItem
                            onClick={() =>
                              navigate(`/dashboard/agent?agentId=${agent.id}`)
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

          <div className="bg-secondary/30 border-border flex items-center justify-center gap-3 border-t px-6 py-3.5">
            <button
              type="button"
              className="text-muted-foreground hover:bg-secondary flex h-8 w-8 items-center justify-center rounded-lg transition-colors disabled:opacity-30"
              disabled
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="bg-foreground text-background flex h-7 w-7 items-center justify-center rounded-lg text-xs font-semibold">
              1
            </div>
            <button
              type="button"
              className="text-muted-foreground hover:bg-secondary flex h-8 w-8 items-center justify-center rounded-lg transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
