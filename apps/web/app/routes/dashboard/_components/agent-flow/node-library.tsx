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
    <aside className="bg-background border-border font-display flex h-full w-64 flex-col border-r">
      <div className="scrollbar-hide flex-1 space-y-3 overflow-y-auto p-3">
        {NODE_LIBRARY_SECTIONS.map(section => (
          <div key={section.id} className="space-y-1">
            <p className="text-muted-foreground px-2 text-[10px] font-semibold tracking-widest uppercase">
              {section.label}
            </p>

            {section.items.map(node => (
              <button
                type="button"
                key={node.id}
                onClick={() => handleAddNode(node)}
                className="hover:bg-secondary group flex w-full cursor-pointer items-center gap-3 rounded-lg p-2 transition-all"
              >
                <span
                  className={`material-icons-outlined ${node.color} text-lg transition-transform group-hover:scale-110`}
                >
                  {node.icon}
                </span>
                <span className="text-foreground/80 group-hover:text-foreground text-xs font-medium transition-colors">
                  {node.label}
                </span>
              </button>
            ))}

            {section.dividerAfter && (
              <div className="border-border my-2 border-t" />
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};
