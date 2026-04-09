import type React from "react";
import { useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  ConnectionLineType,
  Panel,
  ReactFlowProvider,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";

import {
  Grid3X3,
  Hand,
  Maximize,
  MousePointer2,
  Rows3,
  Search,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { cn } from "~/lib/utils";
import { useFlowStore } from "~/store/flow-store";
import { nodeTypes } from "./node-types";

const FlowCanvasInner: React.FC = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setSelectedNodeId,
    setNodes,
  } = useFlowStore();

  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const [showGrid, setShowGrid] = useState(true);
  const [isPanMode, setIsPanMode] = useState(false);
  const renderedEdges = edges.map(edge => ({
    ...edge,
    type: "step",
  }));

  // Auto-layout algorithm: arrange nodes by hierarchy based on edges
  const handleAutoLayout = () => {
    if (nodes.length === 0) return;

    // Build graph structure
    const incomingEdges = new Map<string, string[]>();
    const outgoingEdges = new Map<string, string[]>();

    nodes.forEach(node => {
      incomingEdges.set(node.id, []);
      outgoingEdges.set(node.id, []);
    });

    edges.forEach(edge => {
      const incoming = incomingEdges.get(edge.target) || [];
      incoming.push(edge.source);
      incomingEdges.set(edge.target, incoming);

      const outgoing = outgoingEdges.get(edge.source) || [];
      outgoing.push(edge.target);
      outgoingEdges.set(edge.source, outgoing);
    });

    // Find root nodes (no incoming edges)
    const rootNodes = nodes.filter(
      node => (incomingEdges.get(node.id) || []).length === 0,
    );

    // BFS to assign layers from roots (left -> right)
    const layers = new Map<string, number>();
    const queue = rootNodes.map(node => ({ id: node.id, layer: 0 }));

    while (queue.length > 0) {
      const next = queue.shift();
      if (!next) break;

      const { id, layer } = next;
      if (layers.has(id)) continue;

      layers.set(id, layer);
      const children = outgoingEdges.get(id) || [];
      children.forEach(childId => {
        if (!layers.has(childId)) {
          queue.push({ id: childId, layer: layer + 1 });
        }
      });
    }

    // Fallback for disconnected/cyclic nodes to keep every node visible
    nodes.forEach(node => {
      if (!layers.has(node.id)) {
        const parentLayers = (incomingEdges.get(node.id) || [])
          .map(parentId => layers.get(parentId))
          .filter((value): value is number => typeof value === "number");

        const fallbackLayer =
          parentLayers.length > 0 ? Math.max(...parentLayers) + 1 : 0;
        layers.set(node.id, fallbackLayer);
      }
    });

    // Group nodes by layer and count positions
    const layerNodes = new Map<number, string[]>();
    layers.forEach((layer, nodeId) => {
      if (!layerNodes.has(layer)) layerNodes.set(layer, []);
      const bucket = layerNodes.get(layer);
      if (bucket) {
        bucket.push(nodeId);
      }
    });

    // Calculate positions
    const LAYER_SPACING_X = 340;
    const NODE_SPACING_Y = 200;
    const ORIGIN_X = 120;
    const ORIGIN_Y = 120;

    const newNodes = nodes.map(node => {
      const layer = layers.get(node.id) ?? 0;
      const nodesInLayer = layerNodes.get(layer) || [];
      const indexInLayer = nodesInLayer.indexOf(node.id);

      const safeIndex = indexInLayer >= 0 ? indexInLayer : 0;
      const x = layer * LAYER_SPACING_X + ORIGIN_X;
      const y = safeIndex * NODE_SPACING_Y + ORIGIN_Y;

      return {
        ...node,
        position: { x, y },
      };
    });

    setNodes(() => newNodes);
    setTimeout(
      () => fitView({ padding: 0.5, minZoom: 0.5, maxZoom: 1, duration: 600 }),
      100,
    );
  };

  return (
    <div className="relative h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={renderedEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(_, node) => setSelectedNodeId(node.id)}
        onPaneClick={() => setSelectedNodeId(null)}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={{
          type: "step",
          style: { strokeWidth: 2 },
        }}
        connectionLineType={ConnectionLineType.Step}
        panOnDrag={isPanMode}
        selectionOnDrag={!isPanMode}
        snapToGrid={showGrid}
        snapGrid={[15, 15]}
        minZoom={0.1}
        maxZoom={2}
        fitView
        fitViewOptions={{ padding: 0.5, minZoom: 0.5, maxZoom: 1 }}
        onlyRenderVisibleElements={true}
        className={cn("transition-all", !showGrid && "bg-secondary/10")}
      >
        {showGrid && (
          <Background
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1}
            color="hsl(var(--border))"
          />
        )}

        {/* Floating View Controls (Bottom-Center) */}
        <Panel position="bottom-center" className="mb-6">
          <div className="border-border bg-card flex items-center gap-5 rounded-full border px-5 py-2.5 shadow-xl transition-all hover:shadow-2xl">
            <button
              type="button"
              onClick={() => setIsPanMode(!isPanMode)}
              className={cn(
                "rounded-md p-1 transition-colors",
                isPanMode
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
              title={isPanMode ? "Pan Mode (Hand)" : "Selection Mode (Pointer)"}
            >
              {isPanMode ? (
                <Hand className="h-4 w-4" />
              ) : (
                <MousePointer2 className="h-4 w-4" />
              )}
            </button>
            <div className="bg-border h-4 w-px"></div>

            <button
              type="button"
              onClick={() => setShowGrid(!showGrid)}
              className={cn(
                "rounded-md p-1 transition-colors",
                showGrid
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
              title="Toggle Grid"
            >
              <Grid3X3 className="h-4 w-4" />
            </button>

            <button
              type="button"
              className="text-muted-foreground hover:text-foreground p-1 transition-colors"
              title="Search (Coming Soon)"
            >
              <Search className="h-4 w-4" />
            </button>

            <div className="bg-border h-4 w-px"></div>

            <button
              type="button"
              onClick={handleAutoLayout}
              className="text-muted-foreground hover:text-foreground p-1 transition-colors"
              title="Auto Layout"
            >
              <Rows3 className="h-4 w-4" />
            </button>

            <div className="bg-border h-4 w-px"></div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => zoomOut()}
                className="text-muted-foreground hover:text-foreground p-1 transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => zoomIn()}
                className="text-muted-foreground hover:text-foreground p-1 transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => fitView({ padding: 0.2, duration: 800 })}
                className="text-muted-foreground hover:text-foreground p-1 transition-colors"
                title="Fit View"
              >
                <Maximize className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Panel>
      </ReactFlow>

      <style
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <>
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
        .react-flow__node.selected .flow-node-card {
          border-color: hsl(var(--ring)) !important;
          box-shadow: 0 0 0 2px hsl(var(--ring));
        }
        .react-flow__edge-path {
          stroke: hsl(var(--border));
          stroke-width: 2;
          transition: stroke 0.1s ease-in-out, stroke-width 0.1s ease-in-out;
        }
        .react-flow__edge:hover .react-flow__edge-path,
        .react-flow__edge.selected .react-flow__edge-path {
          stroke: hsl(var(--ring)) !important;
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
    <section className="bg-secondary/20 relative flex-1 overflow-hidden">
      <ReactFlowProvider>
        <FlowCanvasInner />
      </ReactFlowProvider>
    </section>
  );
};
