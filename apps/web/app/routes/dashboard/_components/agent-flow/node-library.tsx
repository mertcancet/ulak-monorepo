import { useFlowStore } from "~/store/flow-store";
import { NODE_LIBRARY_SECTIONS, type NodeLibraryItem } from "./constants";

export const NodeLibrary: React.FC = () => {
  const { addNode } = useFlowStore();

  const handleAddNode = (nodeType: NodeLibraryItem) => {
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
      <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-hide">
        {NODE_LIBRARY_SECTIONS.map(section => (
          <div key={section.id} className="space-y-1">
            <p className="px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              {section.label}
            </p>

            {section.items.map(node => (
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

            {section.dividerAfter && (
              <div className="my-2 border-t border-border" />
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};
