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
      <div className="flex flex-col gap-1">
        <div className="flex">
          <div className="mr-1 bg-secondary/50 rounded">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate("/dashboard")}
            >
              <Home className="text-muted-foreground w-5 h-5" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="font-semibold text-md">{agentName}</h1>
            <Edit className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors w-3 h-3" />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-medium font-display">
            <span className="flex items-center gap-1">
              Agent ID: {shortAgentId}
            </span>
            <Copy className="w-3 h-3 cursor-pointer hover:text-foreground" />
            <span className="flex items-center gap-1">
              Flow ID: {flowId}{" "}
              <Copy className="w-3 h-3 cursor-pointer hover:text-foreground" />
            </span>
            <span>$0.115/min</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> 820-1150ms latency
            </span>
            <span className="flex items-center gap-1">
              <Info className="w-3 h-3" /> 104-304 tokens
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <nav className="flex items-center gap-6 text-sm font-medium mr-4">
          <a
            className="text-foreground border-b-2 border-primary h-14 flex items-center translate-y-px"
            href="#hey"
          >
            Create
          </a>
          <a
            className="text-muted-foreground h-14 flex items-center hover:text-foreground transition-colors"
            href="#hey"
          >
            Simulation
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-foreground bg-background border border-border rounded hover:bg-secondary transition-colors"
          >
            <MessageCircle className="w-3 h-3 text-muted-foreground" /> Give
            feedback
          </button>
          <div className="flex items-center border border-border rounded overflow-hidden">
            <button
              type="button"
              className="p-1.5 px-2 hover:bg-secondary border-r border-border transition-colors"
            >
              <MoreHorizontal className="w-3 h-3 text-muted-foreground" />
            </button>
            <button
              type="button"
              className="p-1.5 px-2 hover:bg-secondary border-r border-border transition-colors"
            >
              <Share className="w-3 h-3 text-muted-foreground" />
            </button>
            <button
              type="button"
              className="p-1.5 px-2 hover:bg-secondary border-r border-border transition-colors"
            >
              <History className="w-3 h-3 text-muted-foreground" />
            </button>
            <button
              type="button"
              className="p-1.5 px-2 hover:bg-secondary transition-colors"
            >
              <Play className="w-3 h-3 text-muted-foreground" />
            </button>
          </div>
          <Button
            variant="default"
            size="sm"
            className="px-5 py-1.5"
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
