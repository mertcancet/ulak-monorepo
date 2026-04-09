export const NODE_TYPES = [
  {
    id: "agent",
    icon: "support_agent",
    label: "Agent",
    color: "text-emerald-500",
  },
  {
    id: "http_tool",
    icon: "cloud",
    label: "HTTP Tool",
    color: "text-sky-500",
  },
  {
    id: "calculation",
    icon: "calculate",
    label: "Calculation",
    color: "text-amber-500",
  },
] as const;

export type NodeLibraryItem = (typeof NODE_TYPES)[number];

export interface NodeLibrarySection {
  id: string;
  label: string;
  items: readonly NodeLibraryItem[];
  dividerAfter?: boolean;
}

export const NODE_LIBRARY_SECTIONS: readonly NodeLibrarySection[] = [
  {
    id: "node",
    label: "Node",
    items: [NODE_TYPES[0]],
    dividerAfter: true,
  },
  {
    id: "tools",
    label: "Tools",
    items: [NODE_TYPES[1], NODE_TYPES[2]],
  },
];

export const SETTINGS_MENU_ITEMS = [
  { id: "knowledge_base", icon: "menu_book", label: "Knowledge Base" },
  {
    id: "speech_settings",
    icon: "record_voice_over",
    label: "Speech Settings",
  },
  {
    id: "transcription",
    icon: "translate",
    label: "Realtime Transcription Settings",
  },
  { id: "call_settings", icon: "settings_phone", label: "Call Settings" },
  { id: "post_call", icon: "assessment", label: "Post-Call Data Extraction" },
  { id: "security", icon: "security", label: "Security & Fallback Settings" },
  { id: "webhook", icon: "webhook", label: "Webhook Settings" },
];
