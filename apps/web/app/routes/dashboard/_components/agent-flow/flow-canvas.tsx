import React, { useState } from "react";
import ReactFlow, {
  Background,
  Panel,
  BackgroundVariant,
  useReactFlow,
  ReactFlowProvider,
  ConnectionLineType,
} from "reactflow";
import type { Connection, Edge, NodeProps, Node } from "reactflow";
import "reactflow/dist/style.css";

import { useFlowStore } from "~/store/flow-store";
import { nodeTypes } from "./node-types";
import { initialNodes, initialEdges } from "./data";
import {
  Search,
  Grid3X3,
  Navigation,
  Plus,
  ZoomIn,
  ZoomOut,
  Maximize,
  Hand,
  MousePointer2,
} from "lucide-react";
import { cn } from "~/lib/utils";

const FlowCanvasInner: React.FC = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode } =
    useFlowStore();

  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const [showGrid, setShowGrid] = useState(true);
  const [isPanMode, setIsPanMode] = useState(false);

  const onAddNode = () => {
    const newNode = {
      id: `node-${Date.now()}`,
      type: "custom",
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: {
        title: "New node",
        content: "Edit this content...",
        color: "text-gray-500",
      },
    };
    addNode(newNode);
  };

  return (
    <div className="w-full h-full relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={{
          type: "smoothstep",
          style: { strokeWidth: 2 },
        }}
        connectionLineType={ConnectionLineType.SmoothStep}
        panOnDrag={isPanMode}
        selectionOnDrag={!isPanMode}
        snapToGrid={showGrid}
        snapGrid={[15, 15]}
        minZoom={0.1}
        maxZoom={2}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        onlyRenderVisibleElements={true}
        className={cn("transition-all", !showGrid && "bg-secondary/10")}
      >
        {showGrid && (
          <Background
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1}
            color="#cbd5e1"
          />
        )}

        {/* Floating View Controls (Bottom-Center) */}
        <Panel position="bottom-center" className="mb-6">
          <div className="bg-card shadow-xl rounded-full border border-border px-5 py-2.5 flex items-center gap-5 transition-all hover:shadow-2xl">
            <button
              onClick={() => setIsPanMode(!isPanMode)}
              className={cn(
                "transition-colors p-1 rounded-md",
                isPanMode
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground",
              )}
              title={isPanMode ? "Pan Mode (Hand)" : "Selection Mode (Pointer)"}
            >
              {isPanMode ? (
                <Hand className="w-4 h-4" />
              ) : (
                <MousePointer2 className="w-4 h-4" />
              )}
            </button>
            <div className="w-px h-4 bg-border"></div>

            <button
              onClick={() => setShowGrid(!showGrid)}
              className={cn(
                "transition-colors p-1 rounded-md",
                showGrid
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground",
              )}
              title="Toggle Grid"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>

            <button
              className="text-muted-foreground hover:text-foreground transition-colors p-1"
              title="Search (Coming Soon)"
            >
              <Search className="w-4 h-4" />
            </button>

            <div className="w-px h-4 bg-border"></div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => zoomOut()}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={() => zoomIn()}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => fitView({ padding: 0.2, duration: 800 })}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
                title="Fit View"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Panel>

        {/* Flow Indicator (Bottom-Right) */}
        <Panel position="bottom-right" className="mr-6 mb-6">
          <div className="flex items-center bg-card px-4 py-2 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow">
            <span className="text-[10px] font-bold uppercase text-muted-foreground mr-3 tracking-widest leading-none">
              Flow
            </span>
            <span className="text-sm font-semibold leading-none">
              Main Flow
            </span>
          </div>
        </Panel>
      </ReactFlow>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .react-flow__attribution {
          display: none;
        }
        .react-flow__handle {
          width: 8px !important;
          height: 8px !important;
          background: hsl(var(--border)) !important;
          border: 2px solid hsl(var(--background)) !important;
        }
        .react-flow__handle:hover {
          background: hsl(var(--primary)) !important;
        }
        .react-flow__edge-path {
          stroke: hsl(var(--border));
          stroke-width: 2;
          transition: stroke 0.1s ease-in-out, stroke-width 0.1s ease-in-out;
        }
        .react-flow__edge:hover .react-flow__edge-path,
        .react-flow__edge.selected .react-flow__edge-path {
          stroke: #3b82f6 !important;
          stroke-width: 3;
        }
        .react-flow__edge.animated path {
          stroke-dasharray: 5;
          animation: dashdraw 0.5s linear infinite;
        }
        @keyframes dashdraw {
          from { stroke-dashoffset: 10; }
          to { stroke-dashoffset: 0; }
        }
      `,
        }}
      />
    </div>
  );
};

export const FlowCanvas: React.FC = () => {
  return (
    <section className="flex-1 relative bg-secondary/20 overflow-hidden">
      <ReactFlowProvider>
        <FlowCanvasInner />
      </ReactFlowProvider>
    </section>
  );
};
