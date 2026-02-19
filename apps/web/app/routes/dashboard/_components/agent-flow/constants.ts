export const NODE_TYPES = [
  {
    id: "conversation",
    icon: "chat",
    label: "Conversation",
    color: "text-pink-500",
  },
  {
    id: "function",
    icon: "functions",
    label: "Function",
    color: "text-purple-500",
  },
  {
    id: "call_transfer",
    icon: "phone_forwarded",
    label: "Call Transfer",
    color: "text-orange-400",
  },
  {
    id: "press_digit",
    icon: "dialpad",
    label: "Press Digit",
    color: "text-blue-400",
  },
  {
    id: "logic_split",
    icon: "call_split",
    label: "Logic Split Node",
    color: "text-indigo-400",
  },
  {
    id: "agent_transfer",
    icon: "support_agent",
    label: "Agent Transfer",
    color: "text-orange-500",
  },
  { id: "sms", icon: "sms", label: "SMS", color: "text-yellow-500" },
  {
    id: "extract_variable",
    icon: "code",
    label: "Extract Variable",
    color: "text-slate-400",
  },
  { id: "mpc", icon: "hub", label: "MPC", color: "text-purple-400" },
  { id: "ending", icon: "block", label: "Ending", color: "text-teal-400" },
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
