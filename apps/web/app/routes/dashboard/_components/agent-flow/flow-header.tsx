import React from "react";
import DashboardHeader from "../dashboard-header";
import { useFlowStore } from "~/store/flow-store";
import {
  Home,
  Edit,
  Copy,
  Clock,
  Info,
  MessageCircle,
  MoreHorizontal,
  Share,
  History,
  Play,
} from "lucide-react";
import { Button } from "~/components/ui/button";

export const FlowHeader: React.FC = () => {
  const { nodes, edges } = useFlowStore();

  const handlePublish = () => {
    // Transform nodes to include their connections
    const enrichedNodes = nodes.map((node) => {
      // Find edges where this node is the source
      const outgoingEdges = edges.filter((edge) => edge.source === node.id);

      return {
        ...node,
        data: {
          ...node.data,
          // Attach target node IDs directly to the node data
          nextNodes: outgoingEdges.map((edge) => edge.target),
        },
      };
    });

    console.log("--- ENRICHED NODES (with connections) ---");
    console.log(enrichedNodes);
    alert("Bağlantı bilgileri node içine gömüldü ve konsola yazdırıldı!");
  };
  return (
    <DashboardHeader>
      <div className="flex flex-col gap-1">
        <div className="flex">
          <div className="mr-1 bg-secondary/50 rounded">
            <Button variant="outline" size="icon">
              <Home className="text-muted-foreground w-5 h-5" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="font-semibold text-md">
              Patient Screening (from template)
            </h1>
            <Edit className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors w-3 h-3" />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-medium font-display">
            <span className="flex items-center gap-1">Agent ID: ag...acc </span>
            <Copy className="w-3 h-3 cursor-pointer hover:text-foreground" />
            <span className="flex items-center gap-1">
              CF ID: co...774{" "}
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
            className="text-foreground border-b-2 border-primary h-14 flex items-center translate-y-[1px]"
            href="#"
          >
            Create
          </a>
          <a
            className="text-muted-foreground h-14 flex items-center hover:text-foreground transition-colors"
            href="#"
          >
            Simulation
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-foreground bg-background border border-border rounded hover:bg-secondary transition-colors">
            <MessageCircle className="w-3 h-3 text-muted-foreground" /> Give
            feedback
          </button>
          <div className="flex items-center border border-border rounded overflow-hidden">
            <button className="p-1.5 px-2 hover:bg-secondary border-r border-border transition-colors">
              <MoreHorizontal className="w-3 h-3 text-muted-foreground" />
            </button>
            <button className="p-1.5 px-2 hover:bg-secondary border-r border-border transition-colors">
              <Share className="w-3 h-3 text-muted-foreground" />
            </button>
            <button className="p-1.5 px-2 hover:bg-secondary border-r border-border transition-colors">
              <History className="w-3 h-3 text-muted-foreground" />
            </button>
            <button className="p-1.5 px-2 hover:bg-secondary transition-colors">
              <Play className="w-3 h-3 text-muted-foreground" />
            </button>
          </div>
          <Button
            variant="default"
            size="sm"
            className="px-5 py-1.5"
            onClick={handlePublish}
          >
            Publish
          </Button>
        </div>
      </div>
    </DashboardHeader>
  );
};
