import { NODE_TYPES } from "./constants";
import { useFlowStore } from "~/store/flow-store";

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
      },
    };
    addNode(newNode);
  };

  return (
    <aside className="w-64 bg-background border-r border-border flex flex-col font-display">
      <div className="flex border-b border-border">
        <button className="flex-1 py-3 text-xs font-bold border-b-2 border-primary">
          Node
        </button>
        <button className="flex-1 py-3 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
          Components
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-hide">
        {NODE_TYPES.map((node) => (
          <div
            key={node.id}
            onClick={() => handleAddNode(node)}
            className="flex items-center gap-3 p-2 hover:bg-secondary rounded-lg cursor-pointer group transition-all"
          >
            <span
              className={`material-icons-outlined ${node.color} text-lg group-hover:scale-110 transition-transform`}
            >
              {node.icon}
            </span>
            <span className="text-xs font-medium text-foreground/80 group-hover:text-foreground transition-colors">
              {node.label}
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
};
