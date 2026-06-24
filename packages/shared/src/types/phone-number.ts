import { z } from "zod";

export const phoneNumberSchema = z.object({
  id: z.uuidv7(),
  workspaceId: z.uuidv7(),
  sipTrunkId: z.uuidv7(),
  number: z.e164(),
});

export type PhoneNumber = z.infer<typeof phoneNumberSchema>;
