export type AiModel = {
  id: string;
  name: string;
  provider: string;
  description: string;
};

export type LanguageOption = {
  code: string;
  label: string;
};

export type VoiceTab = "platform" | "custom";

export type VoiceOption = {
  id: string;
  name: string;
  provider: string;
  accent: string;
  ageGroup: string;
  gender: string;
  type: string;
  category: VoiceTab;
  recommended?: boolean;
};

export const AI_MODELS: AiModel[] = [
  {
    id: "gpt-4.1",
    name: "GPT 4.1",
    provider: "OpenAI",
    description: "Genel amaçlı, hızlı ve dengeli.",
  },
  {
    id: "gpt-4o-realtime",
    name: "GPT 4o Realtime",
    provider: "OpenAI",
    description: "Canlı konuşma ve düşük gecikme için optimize.",
  },
  {
    id: "claude-3.7-sonnet",
    name: "Claude 3.7 Sonnet",
    provider: "Anthropic",
    description: "Uzun bağlam ve kaliteli metin yanıtları.",
  },
  {
    id: "gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    provider: "Google",
    description: "Hız odaklı çoklu görev senaryoları.",
  },
];

export const LANGUAGES: LanguageOption[] = [
  { code: "tr", label: "Türkçe" },
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "it", label: "Italiano" },
  { code: "ar", label: "العربية" },
];

export const VOICE_PROVIDERS: string[] = [
  "MiniMax",
  "Fish Audio",
  "ElevenLabs",
  "Cartesia",
  "OpenAI",
];

export const VOICE_OPTIONS: VoiceOption[] = [
  {
    id: "minimax-cimo",
    name: "Can",
    provider: "MiniMax",
    accent: "Amerikan",
    ageGroup: "Orta Yaş",
    gender: "Erkek",
    type: "Retell",
    category: "platform",
    recommended: true,
  },
  {
    id: "minimax-grace",
    name: "Ece",
    provider: "MiniMax",
    accent: "Amerikan",
    ageGroup: "Orta Yaş",
    gender: "Kadın",
    type: "Retell",
    category: "platform",
    recommended: true,
  },
  {
    id: "minimax-hailey",
    name: "Hale",
    provider: "MiniMax",
    accent: "Amerikan",
    ageGroup: "Genç",
    gender: "Kadın",
    type: "Retell",
    category: "platform",
    recommended: true,
  },
  {
    id: "minimax-nia",
    name: "Nisa",
    provider: "MiniMax",
    accent: "Amerikan",
    ageGroup: "Genç",
    gender: "Kadın",
    type: "Retell",
    category: "platform",
    recommended: true,
  },
  {
    id: "minimax-nico",
    name: "Nihat",
    provider: "MiniMax",
    accent: "Amerikan",
    ageGroup: "Orta Yaş",
    gender: "Erkek",
    type: "Retell",
    category: "platform",
    recommended: true,
  },
  {
    id: "elevenlabs-caner",
    name: "Caner",
    provider: "ElevenLabs",
    accent: "Türkçe",
    ageGroup: "Genç",
    gender: "Erkek",
    type: "Sağlayıcı",
    category: "custom",
    recommended: true,
  },
  {
    id: "elevenlabs-deniz",
    name: "Deniz",
    provider: "ElevenLabs",
    accent: "Türkçe",
    ageGroup: "Orta Yaş",
    gender: "Kadın",
    type: "Sağlayıcı",
    category: "custom",
    recommended: true,
  },
  {
    id: "fishaudio-adrian",
    name: "Arda",
    provider: "Fish Audio",
    accent: "Amerikan",
    ageGroup: "Genç",
    gender: "Erkek",
    type: "Retell",
    category: "custom",
  },
  {
    id: "fishaudio-ashley",
    name: "Asli",
    provider: "Fish Audio",
    accent: "Amerikan",
    ageGroup: "Orta Yaş",
    gender: "Kadın",
    type: "Sağlayıcı",
    category: "custom",
  },
  {
    id: "openai-alloy",
    name: "Ala",
    provider: "OpenAI",
    accent: "Nötr",
    ageGroup: "Genç",
    gender: "Nötr",
    type: "Stüdyo",
    category: "custom",
  },
  {
    id: "cartesia-sonic",
    name: "Soner",
    provider: "Cartesia",
    accent: "İngiliz",
    ageGroup: "Orta Yaş",
    gender: "Erkek",
    type: "Sağlayıcı",
    category: "custom",
  },
  {
    id: "elevenlabs-zeynep",
    name: "Zeynep",
    provider: "ElevenLabs",
    accent: "Türkçe",
    ageGroup: "Genç",
    gender: "Kadın",
    type: "Stüdyo",
    category: "custom",
  },
];

export const GENDER_FILTERS: string[] = ["Tümü", "Kadın", "Erkek", "Nötr"];
export const ACCENT_FILTERS: string[] = [
  "Tümü",
  "Türkçe",
  "Amerikan",
  "İngiliz",
  "Nötr",
];
export const TYPE_FILTERS: string[] = ["Tümü", "Retell", "Sağlayıcı", "Stüdyo"];
export const VOICE_TONES: string[] = [
  "Doğal",
  "Enerjik",
  "Sakin",
  "Kurumsal",
  "Empatik",
];
