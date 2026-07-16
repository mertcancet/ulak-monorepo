import { z } from "zod";

export const fileResultSchema = z.object({
  filename: z.string(),
  location: z.string(),
  manifestLocation: z.string(),
});

export const conversationSelectSchema = z.object({
  id: z.uuidv7(),
  agent: z.object({
    id: z.string(),
    name: z.string(),
  }),
  startedAt: z.date(),
  endedAt: z.date(),
  duration: z.number(),
  file: fileResultSchema.optional(),
  summary: z.string().nullish(),
  fromNumber: z.string().nullish(),
  toNumber: z.string().nullish(),
});

export type Conversation = z.infer<typeof conversationSelectSchema>;
export type FileResult = z.infer<typeof fileResultSchema>;
