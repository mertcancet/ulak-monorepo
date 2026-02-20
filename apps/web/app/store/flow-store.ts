import { create } from "zustand";
import { addEdge, applyNodeChanges, applyEdgeChanges } from "reactflow";
import type {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
} from "reactflow";

import {
  initialNodes,
  initialEdges,
} from "../routes/dashboard/_components/agent-flow/data";

interface FlowState {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (updateFn: (nds: Node[]) => Node[]) => void;
  setEdges: (updateFn: (eds: Edge[]) => Edge[]) => void;
  addNode: (node: Node) => void;
}

export const useFlowStore = create<FlowState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
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
}));
