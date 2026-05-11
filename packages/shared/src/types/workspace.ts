import { z } from "zod";

export const workspaceSelectSchema = z.object({
  id: z.uuidv7(),
  name: z.string().min(3),
});

export const workspaceInsertSchema = workspaceSelectSchema.omit({
  id: true,
});
