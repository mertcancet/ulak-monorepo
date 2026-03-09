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
}

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
  nodes: initialNodes,
  edges: initialEdges,
  selectedNodeId: null,
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  setNodes: (updateFn: (nds: Node[]) => Node[]) => {
    set({ nodes: updateFn(get().nodes) });
  },
  setEdges: (updateFn: (eds: Edge[]) => Edge[]) => {
    set({ edges: updateFn(get().edges) });
  },
  addNode: (node: Node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },
  setSelectedNodeId: (nodeId: string | null) => {
    set({ selectedNodeId: nodeId });
  },
}));
