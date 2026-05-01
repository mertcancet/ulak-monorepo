import type { LLMSettings } from "@cleon/shared";
import { z } from "zod";

export const llmSettingsSchema = z.object({
  provider: z.literal(["google"]),
  model: z.string(),
  instructions: z.string().optional(),
  is_realtime: z.boolean().default(false).optional(),
  voice: z.string().optional(),
  api_key: z.string(),
});

export type { LLMSettings };
