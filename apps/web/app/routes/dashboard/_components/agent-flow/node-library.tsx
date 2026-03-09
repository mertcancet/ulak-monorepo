import { useFlowStore } from "~/store/flow-store";
import { NODE_TYPES } from "./constants";

export const NodeLibrary: React.FC = () => {
  const { addNode } = useFlowStore();

  const handleAddNode = (nodeType: (typeof NODE_TYPES)[0]) => {
    const newNode = {
      id: `${nodeType.id}-${Date.now()}`,
      type: "custom",
      position: {
        x: Math.random() * 200 + 100,
        y: Math.random() * 200 + 100,
      },
      data: {
        title: nodeType.label,
        content: `New ${nodeType.label} node added.`,
        color: nodeType.color,
        isGlobal: false,
      },
    };
    addNode(newNode);
  };

  return (
    <aside className="w-64 bg-background border-r border-border flex flex-col font-display">
      <div className="flex border-b border-border">
        <button
          type="button"
          className="flex-1 py-3 text-xs font-bold border-b-2 border-primary"
        >
          Node
        </button>
        <button
          type="button"
          className="flex-1 py-3 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Components
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-hide">
        {NODE_TYPES.map(node => (
          <button
            type="button"
            key={node.id}
            onClick={() => handleAddNode(node)}
            className="w-full flex items-center gap-3 p-2 hover:bg-secondary rounded-lg cursor-pointer group transition-all"
          >
            <span
              className={`material-icons-outlined ${node.color} text-lg group-hover:scale-110 transition-transform`}
            >
              {node.icon}
            </span>
            <span className="text-xs font-medium text-foreground/80 group-hover:text-foreground transition-colors">
              {node.label}
            </span>
          </button>
        ))}

        {/* Yeni: Tetikleyici Düğüm */}
        <button
          type="button"
          onClick={() =>
            addNode({
              id: `trigger-${Date.now()}`,
              type: "trigger",
              position: { x: Math.random() * 200, y: Math.random() * 200 },
              data: {
                title: "Call Start",
                content: "Agent answers the call",
                color: "text-green-500",
                isGlobal: false,
              },
            })
          }
          className="w-full flex items-center gap-3 p-2 hover:bg-secondary rounded-lg cursor-pointer group transition-all"
        >
          <span className="material-icons-outlined text-green-500 text-lg group-hover:scale-110 transition-transform">
            phone_callback
          </span>
          <span className="text-xs font-medium text-foreground/80 group-hover:text-foreground transition-colors">
            Call Start
          </span>
        </button>

        {/* Yeni: Mantık Düğümü */}
        <button
          type="button"
          onClick={() =>
            addNode({
              id: `logic-${Date.now()}`,
              type: "logic_split",
              position: { x: Math.random() * 200, y: Math.random() * 200 },
              data: {
                title: "Check Balance",
                content: "If balance > 0, go to payment, else go to top-up",
                color: "text-blue-500",
                conditions: [],
                isGlobal: false,
              },
            })
          }
          className="w-full flex items-center gap-3 p-2 hover:bg-secondary rounded-lg cursor-pointer group transition-all"
        >
          <span className="material-icons-outlined text-blue-500 text-lg group-hover:scale-110 transition-transform">
            call_split
          </span>
          <span className="text-xs font-medium text-foreground/80 group-hover:text-foreground transition-colors">
            Logic Split
          </span>
        </button>
      </div>
    </aside>
  );
};
