import {
  Clock,
  Copy,
  Edit,
  History,
  Home,
  Info,
  MessageCircle,
  MoreHorizontal,
  Play,
  Share,
} from "lucide-react";
import type React from "react";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { useFlowStore } from "~/store/flow-store";
import DashboardHeader from "../dashboard-header";

type FlowHeaderProps = {
  agentId: string | null;
  agentName: string;
  onSave: () => Promise<void> | void;
  canSave: boolean;
  isSaving: boolean;
};

export const FlowHeader: React.FC<FlowHeaderProps> = ({
  agentId,
  agentName,
  onSave,
  canSave,
  isSaving,
}) => {
  const navigate = useNavigate();
  const { nodes, edges } = useFlowStore();

  const shortAgentId = agentId
    ? `${agentId.slice(0, 2)}...${agentId.slice(-3)}`
    : "-";
  const flowId = `${nodes.length}N-${edges.length}E`;

  return (
    <DashboardHeader>
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="bg-secondary hover:bg-muted text-muted-foreground hover:text-foreground flex h-7 w-7 items-center justify-center rounded-lg transition-colors"
            onClick={() => navigate("/dashboard")}
            aria-label="Dashboard'a dön"
          >
            <Home className="h-3.5 w-3.5" />
          </button>
          <span className="text-muted-foreground text-xs">/</span>
          <div className="flex items-center gap-1.5">
            <h1 className="text-foreground font-display text-sm font-semibold">
              {agentName}
            </h1>
            <Edit className="text-muted-foreground hover:text-foreground h-3 w-3 cursor-pointer transition-colors" />
          </div>
        </div>
        <div className="text-muted-foreground flex items-center gap-3 pl-9 text-[10px] font-medium">
          <span>Agent ID: {shortAgentId}</span>
          <Copy className="hover:text-foreground h-2.5 w-2.5 cursor-pointer transition-colors" />
          <span>Flow: {flowId}</span>
          <Copy className="hover:text-foreground h-2.5 w-2.5 cursor-pointer transition-colors" />
          <span>$0.115/dk</span>
          <span className="flex items-center gap-1">
            <Clock className="h-2.5 w-2.5" /> 820-1150ms
          </span>
          <span className="flex items-center gap-1">
            <Info className="h-2.5 w-2.5" /> 104-304 token
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <nav className="mr-2 flex items-center gap-1">
          <a
            className="text-foreground rounded-full bg-[rgba(0,0,0,0.05)] px-3 py-1.5 text-sm font-medium transition-colors"
            href="#create"
          >
            Oluştur
          </a>
          <a
            className="text-muted-foreground hover:text-foreground rounded-full px-3 py-1.5 text-sm font-medium transition-colors hover:bg-[rgba(0,0,0,0.05)]"
            href="#sim"
          >
            Simülasyon
          </a>
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            className="text-secondary-foreground bg-background border-border hover:bg-secondary flex h-8 items-center gap-1 rounded-lg border px-3 text-xs font-medium transition-colors"
          >
            <MessageCircle className="text-muted-foreground h-3 w-3" /> Geri
            bildirim
          </button>
          <div className="border-border flex h-8 items-center overflow-hidden rounded-lg border">
            <button
              type="button"
              className="hover:bg-secondary border-border text-muted-foreground hover:text-foreground flex h-full items-center justify-center border-r px-2 transition-colors"
            >
              <MoreHorizontal className="h-3 w-3" />
            </button>
            <button
              type="button"
              className="hover:bg-secondary border-border text-muted-foreground hover:text-foreground flex h-full items-center justify-center border-r px-2 transition-colors"
            >
              <Share className="h-3 w-3" />
            </button>
            <button
              type="button"
              className="hover:bg-secondary border-border text-muted-foreground hover:text-foreground flex h-full items-center justify-center border-r px-2 transition-colors"
            >
              <History className="h-3 w-3" />
            </button>
            <button
              type="button"
              className="hover:bg-secondary text-muted-foreground hover:text-foreground flex h-full items-center justify-center px-2 transition-colors"
            >
              <Play className="h-3 w-3" />
            </button>
          </div>
          <Button
            variant="outline"
            className="h-8 px-3 text-xs"
            onClick={() => onSave()}
            disabled={!canSave}
          >
            {isSaving ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </div>
      </div>
    </DashboardHeader>
  );
};
