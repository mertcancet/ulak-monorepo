import { z } from "zod";

export const llmSettingsSchema = z.object({
  provider: z.literal(["google"]),
  model: z.string(),
  instructions: z.string().optional(),
  is_realtime: z.boolean().default(false).optional(),
  voice: z.string().optional(),
  api_key: z.string(),
});

export const agentSelectSchema = z.object({
  id: z.uuidv7(),
  workspaceId: z.uuidv7(),
  name: z.string().min(3),
  phoneNumber: z.string().optional(),
  llm: llmSettingsSchema,
  instructions: z.string(),
  allowInterruptions: z.boolean().default(true),
  greetPrompt: z.string().optional(),
  goodbyePrompt: z.string().optional(),

  createdAt: z.date(),
  updatedAt: z.date(),
});

export const agentInsertSchema = agentSelectSchema.omit({
  id: true,
  workspaceId: true,
  createdAt: true,
  updatedAt: true,
});

export const agentUpdateSchema = agentInsertSchema.partial();

export type Agent = z.infer<typeof agentSelectSchema>;
export type LLMSettings = z.infer<typeof llmSettingsSchema>;
