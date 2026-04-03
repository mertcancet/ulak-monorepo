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
      className={`absolute -top-5 left-2 z-20 rounded-xs border border-emerald-700/80 bg-emerald-500 px-1.5 py-px text-[6px] font-bold uppercase tracking-[0.08em] text-white shadow-sm ${className}`}
    >
      Global Node
    </div>
  );
};

const CustomNode = ({ data }: NodeProps<CustomNodeData>) => {
  return (
    <div className="flow-node-card bg-card p-4 rounded-xl shadow-sm border border-border w-48 text-[10px] transform hover:scale-105 transition-all duration-200 group relative">
      <GlobalNodeTag isGlobal={data.isGlobal} />

      <Handle
        type="target"
        position={Position.Left}
        className="w-2 h-2 bg-border! border-2 border-background! hover:bg-primary! transition-colors"
      />

      <div className={`${data.color} font-bold mb-1 uppercase tracking-tight`}>
        {data.title}
      </div>
      <p className="text-muted-foreground leading-tight">{data.content}</p>

      <Handle
        type="source"
        position={Position.Right}
        className="w-2 h-2 bg-border! border-2 border-background! hover:bg-primary! transition-colors"
      />
    </div>
  );
};

// Yeni: Sadece çıkışı olan bir Tetikleyici Düğümü (Trigger Node)
const TriggerNode = ({ data }: NodeProps<CustomNodeData>) => {
  return (
    <div className="flow-node-card bg-card p-4 rounded-2xl shadow-lg border-2 border-primary/20 w-48 text-[10px] transform hover:scale-105 transition-all duration-200 ring-4 ring-primary/5 relative">
      <GlobalNodeTag isGlobal={data.isGlobal} />

      <div
        className={`${data.color} font-black mb-1 uppercase tracking-widest flex items-center gap-2`}
      >
        <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
        {data.title}
      </div>
      <p className="text-foreground font-medium leading-tight">
        {data.content}
      </p>

      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-primary! border-2 border-background!"
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
      <div className="flow-node-card bg-card/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-border/50 w-64 overflow-hidden transform hover:scale-[1.02] transition-all duration-300 ring-1 ring-white/10 group relative">
        <Handle
          type="target"
          position={Position.Left}
          className="w-3 h-3 bg-blue-500! border-2 border-background! -left-1.5"
        />

        {/* Header Section */}
        <div className="p-4 bg-linear-to-br from-blue-500/10 to-indigo-500/10 border-b border-border/50">
          <div className="flex items-center justify-between mb-2">
            <div
              className={`${data.color} font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2`}
            >
              <div className="p-1.5 bg-background rounded-lg shadow-sm">
                <Split size={14} />
              </div>
              {data.title}
            </div>
          </div>
          <p className="text-[10px] text-muted-foreground leading-relaxed font-medium">
            {data.content}
          </p>
        </div>

        {/* Conditions List */}
        <div className="p-3 bg-secondary/20">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
              Outcomes
            </span>
            <button
              type="button"
              onClick={handleAddCondition}
              className="p-1 hover:bg-primary/20 rounded-md transition-colors text-primary"
            >
              <PlusIcon size={14} />
            </button>
          </div>

          <div className="space-y-1.5">
            {/* Custom Dynamic Outcomes */}
            {conditions.map(condition => (
              <div
                key={condition.id}
                className="flex items-center justify-between bg-primary/5 hover:bg-primary/10 p-2 rounded-xl border border-primary/20 relative transition-all group/item"
              >
                <input
                  type="text"
                  value={condition.text}
                  onChange={e =>
                    handleUpdateCondition(condition.id, e.target.value)
                  }
                  className="bg-transparent border-none focus:outline-none w-full text-[10px] font-medium pr-6"
                  placeholder="Condition..."
                />
                <button
                  type="button"
                  onClick={() => handleRemoveCondition(condition.id)}
                  className="opacity-0 group-hover/item:opacity-100 transition-opacity absolute right-2 p-0.5 hover:bg-destructive/20 rounded"
                >
                  <XIcon size={10} className="text-destructive" />
                </button>
                <Handle
                  type="source"
                  position={Position.Right}
                  id={condition.id}
                  style={{ right: -6, top: "50%" }}
                  className="w-2.5 h-2.5 bg-blue-500! border-2 border-background!"
                />
              </div>
            ))}
          </div>

          <div className="mt-3 border-t border-border/40 pt-2 space-y-1.5">
            <p className="text-[8px] uppercase tracking-widest text-muted-foreground font-bold">
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
                        ? "font-semibold text-foreground truncate"
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
