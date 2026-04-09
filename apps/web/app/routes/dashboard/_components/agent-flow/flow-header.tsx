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
            className="flex items-center justify-center w-7 h-7 rounded-lg bg-secondary hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            onClick={() => navigate("/dashboard")}
            aria-label="Dashboard'a dön"
          >
            <Home className="w-3.5 h-3.5" />
          </button>
          <span className="text-muted-foreground text-xs">/</span>
          <div className="flex items-center gap-1.5">
            <h1 className="font-semibold text-sm text-foreground font-display">
              {agentName}
            </h1>
            <Edit className="w-3 h-3 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
          </div>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-medium pl-9">
          <span>Agent ID: {shortAgentId}</span>
          <Copy className="w-2.5 h-2.5 cursor-pointer hover:text-foreground transition-colors" />
          <span>Flow: {flowId}</span>
          <Copy className="w-2.5 h-2.5 cursor-pointer hover:text-foreground transition-colors" />
          <span>$0.115/dk</span>
          <span className="flex items-center gap-1">
            <Clock className="w-2.5 h-2.5" /> 820-1150ms
          </span>
          <span className="flex items-center gap-1">
            <Info className="w-2.5 h-2.5" /> 104-304 token
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <nav className="flex items-center gap-1 mr-2">
          <a
            className="px-3 py-1.5 text-sm font-medium text-foreground bg-[rgba(0,0,0,0.05)] rounded-full transition-colors"
            href="#create"
          >
            Oluştur
          </a>
          <a
            className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-full hover:bg-[rgba(0,0,0,0.05)] transition-colors"
            href="#sim"
          >
            Simülasyon
          </a>
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-secondary-foreground bg-background border border-border rounded-lg hover:bg-secondary transition-colors"
          >
            <MessageCircle className="w-3 h-3 text-muted-foreground" /> Geri
            bildirim
          </button>
          <div className="flex items-center border border-border rounded-lg overflow-hidden">
            <button
              type="button"
              className="p-1.5 px-2 hover:bg-secondary border-r border-border transition-colors text-muted-foreground hover:text-foreground"
            >
              <MoreHorizontal className="w-3 h-3" />
            </button>
            <button
              type="button"
              className="p-1.5 px-2 hover:bg-secondary border-r border-border transition-colors text-muted-foreground hover:text-foreground"
            >
              <Share className="w-3 h-3" />
            </button>
            <button
              type="button"
              className="p-1.5 px-2 hover:bg-secondary border-r border-border transition-colors text-muted-foreground hover:text-foreground"
            >
              <History className="w-3 h-3" />
            </button>
            <button
              type="button"
              className="p-1.5 px-2 hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
            >
              <Play className="w-3 h-3" />
            </button>
          </div>
          <Button
            variant="outline"
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
