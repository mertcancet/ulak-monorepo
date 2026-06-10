import { z } from "zod";

const voices = [
  "Achernar",
  "Achird",
  "Algenib",
  "Algieba",
  "Alnilam",
  "Aoede",
  "Autonoe",
  "Callirrhoe",
  "Charon",
  "Despina",
  "Enceladus",
  "Erinome",
  "Fenrir",
  "Gacrux",
  "Iapetus",
  "Kore",
  "Laomedeia",
  "Leda",
  "Orus",
  "Pulcherrima",
  "Puck",
  "Rasalgethi",
  "Sadachbia",
  "Sadaltager",
  "Schedar",
  "Sulafat",
  "Umbriel",
  "Vindemiatrix",
  "Zephyr",
  "Zubenelgenubi",
] as const;

export const llmSettingsSchema = z.object({
  provider: z.literal(["google"]),
  model: z.literal([
    "gemini-2.5-flash-native-audio-preview-12-2025",
    "gemini-live-2.5-flash-native-audio",
    "gemini-3.1-flash-live-preview",
  ]),
  instructions: z.string().optional(),
  is_realtime: z.literal(true).default(true).optional(),
  voice: z.literal(voices).optional(),
  api_key: z.string(),
});

export const agentSelectSchema = z.object({
  id: z.uuidv7(),
  workspaceId: z.uuidv7(),
  name: z.string().min(3),
  phoneNumber: z.string().nullable().optional(),
  llm: llmSettingsSchema,
  instructions: z.string(),
  allowInterruptions: z.boolean().default(true),
  greetPrompt: z.string().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const agentInsertSchema = agentSelectSchema
  .omit({
    id: true,
    workspaceId: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    toolIds: z.uuidv7().array().optional(),
  });

export const agentUpdateSchema = agentInsertSchema.partial();

export type Agent = z.infer<typeof agentSelectSchema>;
export type AgentInsert = z.infer<typeof agentInsertSchema>;
export type AgentUpdate = z.infer<typeof agentUpdateSchema>;
export type LLMSettings = z.infer<typeof llmSettingsSchema>;
