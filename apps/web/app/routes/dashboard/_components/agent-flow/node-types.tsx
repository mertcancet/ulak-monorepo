import { PlusIcon, Split, XIcon } from "lucide-react";
import { memo } from "react";
import type { NodeProps } from "reactflow";
import { Handle, Position } from "reactflow";
import { useFlowStore } from "~/store/flow-store";

interface Condition {
  id: string;
  text: string;
}

export interface CustomNodeData {
  title: string;
  content: string;
  color: string;
  conditions?: Condition[];
  isGlobal?: boolean;
}

const GlobalNodeTag = ({
  isGlobal,
  className,
}: {
  isGlobal?: boolean;
  className?: string;
}) => {
  if (!isGlobal) {
    return null;
  }

  return (
    <div
      className={`border-success/80 bg-success absolute -top-5 left-2 z-20 rounded-xs border px-1.5 py-px text-[6px] font-bold tracking-[0.08em] text-white uppercase shadow-sm ${className}`}
    >
      Global Node
    </div>
  );
};

const CustomNode = ({ data }: NodeProps<CustomNodeData>) => {
  return (
    <div className="flow-node-card bg-card border-border group relative w-48 transform rounded-xl border p-4 text-[10px] shadow-sm transition-all duration-200 hover:scale-105">
      <GlobalNodeTag isGlobal={data.isGlobal} />

      <Handle
        type="target"
        position={Position.Left}
        className="bg-border! border-background! hover:bg-primary! h-2 w-2 border-2 transition-colors"
      />

      <div className={`${data.color} mb-1 font-bold tracking-tight uppercase`}>
        {data.title}
      </div>
      <p className="text-muted-foreground leading-tight">{data.content}</p>

      <Handle
        type="source"
        position={Position.Right}
        className="bg-border! border-background! hover:bg-primary! h-2 w-2 border-2 transition-colors"
      />
    </div>
  );
};

// Yeni: Sadece çıkışı olan bir Tetikleyici Düğümü (Trigger Node)
const TriggerNode = ({ data }: NodeProps<CustomNodeData>) => {
  return (
    <div className="flow-node-card bg-card border-primary/20 ring-primary/5 relative w-48 transform rounded-2xl border-2 p-4 text-[10px] shadow-lg ring-4 transition-all duration-200 hover:scale-105">
      <GlobalNodeTag isGlobal={data.isGlobal} />

      <div
        className={`${data.color} mb-1 flex items-center gap-2 font-black tracking-widest uppercase`}
      >
        <span className="bg-primary h-2 w-2 animate-pulse rounded-full" />
        {data.title}
      </div>
      <p className="text-foreground leading-tight font-medium">
        {data.content}
      </p>

      <Handle
        type="source"
        position={Position.Right}
        className="bg-primary! border-background! h-3 w-3 border-2"
      />
    </div>
  );
};

// Yeni: Birden fazla çıkışı olan Mantık Düğümü (Logic Node)
const LogicNode = ({ id, data }: NodeProps<CustomNodeData>) => {
  const setNodes = useFlowStore(state => state.setNodes);
  const edges = useFlowStore(state => state.edges);
  const nodes = useFlowStore(state => state.nodes);
  const conditions = data.conditions || [];

  const getTargetsForHandle = (handleId: string) => {
    const matchingEdges = edges.filter(
      edge =>
        edge.source === id && (edge.sourceHandle || "default") === handleId,
    );

    return matchingEdges.map(edge => {
      const targetNode = nodes.find(node => node.id === edge.target);
      const targetData = (targetNode?.data || {}) as Partial<CustomNodeData>;
      const title = targetData.title?.trim();
      return title || edge.target;
    });
  };

  const outcomes = [
    ...conditions.map(condition => ({
      id: condition.id,
      label: condition.text || "Untitled condition",
    })),
  ];

  const updateConditions = (newConditions: Condition[]) => {
    setNodes(nds =>
      nds.map(node => {
        if (node.id === id) {
          return {
            ...node,
            data: { ...node.data, conditions: newConditions },
          };
        }
        return node;
      }),
    );
  };

  const handleAddCondition = () => {
    updateConditions([
      ...conditions,
      { id: crypto.randomUUID(), text: "New Condition" },
    ]);
  };

  const handleUpdateCondition = (condId: string, value: string) => {
    updateConditions(
      conditions.map(c => (c.id === condId ? { ...c, text: value } : c)),
    );
  };

  const handleRemoveCondition = (condId: string) => {
    updateConditions(conditions.filter(c => c.id !== condId));
  };

  return (
    <div className="relative">
      <GlobalNodeTag isGlobal={data.isGlobal} className="-top-4" />
      <div className="flow-node-card bg-card/90 border-border/50 group relative w-64 transform overflow-hidden rounded-2xl border shadow-2xl ring-1 ring-white/10 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02]">
        <Handle
          type="target"
          position={Position.Left}
          className="bg-primary! border-background! -left-1.5 h-3 w-3 border-2"
        />

        {/* Header Section */}
        <div className="from-primary/10 to-accent/10 border-border/50 border-b bg-linear-to-br p-4">
          <div className="mb-2 flex items-center justify-between">
            <div
              className={`${data.color} flex items-center gap-2 text-[10px] font-black tracking-[0.2em] uppercase`}
            >
              <div className="bg-background rounded-lg p-1.5 shadow-sm">
                <Split size={14} />
              </div>
              {data.title}
            </div>
          </div>
          <p className="text-muted-foreground text-[10px] leading-relaxed font-medium">
            {data.content}
          </p>
        </div>

        {/* Conditions List */}
        <div className="bg-secondary/20 p-3">
          <div className="mb-3 flex items-center justify-between px-1">
            <span className="text-muted-foreground text-[9px] font-bold tracking-widest uppercase">
              Outcomes
            </span>
            <button
              type="button"
              onClick={handleAddCondition}
              className="hover:bg-primary/20 text-primary rounded-md p-1 transition-colors"
            >
              <PlusIcon size={14} />
            </button>
          </div>

          <div className="space-y-1.5">
            {/* Custom Dynamic Outcomes */}
            {conditions.map(condition => (
              <div
                key={condition.id}
                className="bg-primary/5 hover:bg-primary/10 border-primary/20 group/item relative flex items-center justify-between rounded-xl border p-2 transition-all"
              >
                <input
                  type="text"
                  value={condition.text}
                  onChange={e =>
                    handleUpdateCondition(condition.id, e.target.value)
                  }
                  className="w-full border-none bg-transparent pr-6 text-[10px] font-medium focus:outline-none"
                  placeholder="Condition..."
                />
                <button
                  type="button"
                  onClick={() => handleRemoveCondition(condition.id)}
                  className="hover:bg-destructive/20 absolute right-2 rounded p-0.5 opacity-0 transition-opacity group-hover/item:opacity-100"
                >
                  <XIcon size={10} className="text-destructive" />
                </button>
                <Handle
                  type="source"
                  position={Position.Right}
                  id={condition.id}
                  style={{ right: -6, top: "50%" }}
                  className="bg-primary! border-background! h-2.5 w-2.5 border-2"
                />
              </div>
            ))}
          </div>

          <div className="border-border/40 mt-3 space-y-1.5 border-t pt-2">
            <p className="text-muted-foreground text-[8px] font-bold tracking-widest uppercase">
              Connections
            </p>
            {outcomes.map(outcome => {
              const targets = getTargetsForHandle(outcome.id);

              return (
                <div
                  key={outcome.id}
                  className="flex items-center justify-between gap-2 text-[9px]"
                >
                  <span className="text-muted-foreground truncate">
                    {outcome.label}
                  </span>
                  <span
                    className={
                      targets.length > 0
                        ? "text-foreground truncate font-semibold"
                        : "text-muted-foreground/80 italic"
                    }
                  >
                    {targets.length > 0 ? targets.join(", ") : "Not connected"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export const nodeTypes = {
  custom: memo(CustomNode),
  trigger: memo(TriggerNode),
  logic_split: memo(LogicNode),
};
