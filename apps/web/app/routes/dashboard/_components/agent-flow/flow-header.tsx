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
            className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#f0f0f0] hover:bg-[#e8e8e8] transition-colors text-[#8e8e93] hover:text-[#222222]"
            onClick={() => navigate("/dashboard")}
            aria-label="Dashboard'a dön"
          >
            <Home className="w-3.5 h-3.5" />
          </button>
          <span className="text-[#8e8e93] text-xs">/</span>
          <div className="flex items-center gap-1.5">
            <h1 className="font-semibold text-sm text-[#222222] font-display">
              {agentName}
            </h1>
            <Edit className="w-3 h-3 text-[#8e8e93] cursor-pointer hover:text-[#222222] transition-colors" />
          </div>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-[#8e8e93] font-medium pl-9">
          <span>Agent ID: {shortAgentId}</span>
          <Copy className="w-2.5 h-2.5 cursor-pointer hover:text-[#222222] transition-colors" />
          <span>Flow: {flowId}</span>
          <Copy className="w-2.5 h-2.5 cursor-pointer hover:text-[#222222] transition-colors" />
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
            className="px-3 py-1.5 text-sm font-medium text-[#181e25] bg-[rgba(0,0,0,0.05)] rounded-full transition-colors"
            href="#create"
          >
            Oluştur
          </a>
          <a
            className="px-3 py-1.5 text-sm font-medium text-[#8e8e93] hover:text-[#222222] rounded-full hover:bg-[rgba(0,0,0,0.05)] transition-colors"
            href="#sim"
          >
            Simülasyon
          </a>
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-[#45515e] bg-white border border-[#e5e7eb] rounded-lg hover:bg-[#f0f0f0] transition-colors"
          >
            <MessageCircle className="w-3 h-3 text-[#8e8e93]" /> Geri bildirim
          </button>
          <div className="flex items-center border border-[#e5e7eb] rounded-lg overflow-hidden">
            <button
              type="button"
              className="p-1.5 px-2 hover:bg-[#f0f0f0] border-r border-[#e5e7eb] transition-colors text-[#8e8e93] hover:text-[#222222]"
            >
              <MoreHorizontal className="w-3 h-3" />
            </button>
            <button
              type="button"
              className="p-1.5 px-2 hover:bg-[#f0f0f0] border-r border-[#e5e7eb] transition-colors text-[#8e8e93] hover:text-[#222222]"
            >
              <Share className="w-3 h-3" />
            </button>
            <button
              type="button"
              className="p-1.5 px-2 hover:bg-[#f0f0f0] border-r border-[#e5e7eb] transition-colors text-[#8e8e93] hover:text-[#222222]"
            >
              <History className="w-3 h-3" />
            </button>
            <button
              type="button"
              className="p-1.5 px-2 hover:bg-[#f0f0f0] transition-colors text-[#8e8e93] hover:text-[#222222]"
            >
              <Play className="w-3 h-3" />
            </button>
          </div>
          <Button onClick={() => onSave()} disabled={!canSave}>
            {isSaving ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </div>
      </div>
    </DashboardHeader>
  );
};
