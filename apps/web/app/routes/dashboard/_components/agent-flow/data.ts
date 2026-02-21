import type { Node, Edge } from "reactflow";

export const initialNodes: Node[] = [
  {
    id: "greetings",
    type: "custom",
    position: { x: 50, y: 150 },
    data: {
      title: "Greetings",
      content: "Hi, This is Anna. I'm an AI agent representing Northwell...",
      color: "text-pink-500",
    },
  },
  {
    id: "identity-confirmation",
    type: "custom",
    position: { x: 300, y: 150 },
    data: {
      title: "Identity Confirmation",
      content: "Can I confirm I'm speaking with {{customer_name}}?",
      color: "text-indigo-500",
    },
  },
  {
    id: "success-path",
    type: "custom",
    position: { x: 550, y: 150 },
    data: {
      title: "Success Path",
      content: "Proceeding to screening questions...",
      color: "text-green-500",
    },
  },
];

export const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "greetings",
    target: "identity-confirmation",
    type: "smoothstep",
  },
  {
    id: "e2-3",
    source: "identity-confirmation",
    target: "success-path",
    type: "smoothstep",
  },
];
