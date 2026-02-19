import React, { useCallback } from "react";
import ReactFlow, {
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
  Panel,
  BackgroundVariant,
  useReactFlow,
  ReactFlowProvider,
} from "reactflow";
import type { Connection, Edge, NodeProps, Node } from "reactflow";
import "reactflow/dist/style.css";

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
} from "lucide-react";

const FlowCanvasInner: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

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
    setNodes((nds) => nds.concat(newNode));
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
        fitView
        snapToGrid
        snapGrid={[15, 15]}
        className="canvas-grid"
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#cbd5e1"
        />

        {/* Floating View Controls (Bottom-Center) */}
        <Panel position="bottom-center" className="mb-6">
          <div className="bg-card shadow-xl rounded-full border border-border px-5 py-2.5 flex items-center gap-5 transition-all hover:shadow-2xl">
            <button
              className="text-muted-foreground hover:text-foreground transition-colors p-1"
              title="Navigation"
            >
              <Navigation className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-border"></div>

            <button
              className="text-muted-foreground hover:text-foreground transition-colors p-1"
              title="Grid View"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>

            <button
              className="text-muted-foreground hover:text-foreground transition-colors p-1"
              title="Search"
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
                onClick={() => fitView()}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
                title="Fit View"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Panel>

        {/* Add Button (Bottom-Left) */}
        <Panel position="bottom-left" className="ml-6 mb-6">
          <button
            onClick={onAddNode}
            className="bg-primary text-primary-foreground p-3.5 rounded-full border border-primary shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center group"
            title="Add Node"
          >
            <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
          </button>
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
