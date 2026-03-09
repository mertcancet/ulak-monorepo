import type {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
} from "reactflow";
import { addEdge, applyEdgeChanges, applyNodeChanges } from "reactflow";
import { create } from "zustand";

import {
  initialEdges,
  initialNodes,
} from "../routes/dashboard/_components/agent-flow/data";

export interface Condition {
  id: string;
  text: string;
  nextNodes?: string[];
  nextNode?: string | null;
}

export interface GlobalNodeData {
  textArea?: string;
}

export interface FlowNodeData {
  title?: string;
  content?: string;
  color?: string;
  conditions?: Condition[];
  isGlobal?: boolean;
  global?: GlobalNodeData;
  outcomes?: Record<string, string[]>;
  nextNodes?: string[];
}

const buildNodeTrackingData = (node: Node, edges: Edge[]) => {
  const nodeData = (node.data ?? {}) as FlowNodeData;
  const outgoingEdges = edges.filter(edge => edge.source === node.id);
  const outcomes: Record<string, string[]> = {};

  outgoingEdges.forEach(edge => {
    const handleId = edge.sourceHandle ?? "default";
    if (!outcomes[handleId]) {
      outcomes[handleId] = [];
    }
    outcomes[handleId].push(edge.target);
  });

  const trackedConditions = nodeData.conditions?.map(condition => {
    const conditionTargets = outcomes[condition.id] ?? [];

    return {
      ...condition,
      nextNodes: conditionTargets,
      nextNode: conditionTargets[0] ?? null,
    };
  });

  return {
    outcomes,
    nextNodes: [...new Set(outgoingEdges.map(edge => edge.target))],
    conditions: trackedConditions,
  };
};

const withTrackedConnections = (nodes: Node[], edges: Edge[]) =>
  nodes.map(node => {
    const currentData = (node.data ?? {}) as Record<string, unknown>;
    const trackingData = buildNodeTrackingData(node, edges);

    return {
      ...node,
      data: {
        ...currentData,
        ...trackingData,
      },
    };
  });

interface FlowState {
  nodes: Node[];
  edges: Edge[];
  selectedNodeId: string | null;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (updateFn: (nds: Node[]) => Node[]) => void;
  setEdges: (updateFn: (eds: Edge[]) => Edge[]) => void;
  addNode: (node: Node) => void;
  setSelectedNodeId: (nodeId: string | null) => void;
}

export const useFlowStore = create<FlowState>((set, get) => ({
  nodes: withTrackedConnections(initialNodes, initialEdges),
  edges: initialEdges,
  selectedNodeId: null,
  onNodesChange: (changes: NodeChange[]) => {
    const nextNodes = applyNodeChanges(changes, get().nodes);
    set({
      nodes: withTrackedConnections(nextNodes, get().edges),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    const nextEdges = applyEdgeChanges(changes, get().edges);
    set({
      edges: nextEdges,
      nodes: withTrackedConnections(get().nodes, nextEdges),
    });
  },
  onConnect: (connection: Connection) => {
    const nextEdges = addEdge(connection, get().edges);
    set({
      edges: nextEdges,
      nodes: withTrackedConnections(get().nodes, nextEdges),
    });
  },
  setNodes: (updateFn: (nds: Node[]) => Node[]) => {
    const nextNodes = updateFn(get().nodes);
    set({ nodes: withTrackedConnections(nextNodes, get().edges) });
  },
  setEdges: (updateFn: (eds: Edge[]) => Edge[]) => {
    const nextEdges = updateFn(get().edges);
    set({
      edges: nextEdges,
      nodes: withTrackedConnections(get().nodes, nextEdges),
    });
  },
  addNode: (node: Node) => {
    const nextNodes = [...get().nodes, node];
    set({
      nodes: withTrackedConnections(nextNodes, get().edges),
    });
  },
  setSelectedNodeId: (nodeId: string | null) => {
    set({ selectedNodeId: nodeId });
  },
}));
