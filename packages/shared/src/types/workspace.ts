import { z } from "zod";

export const workspaceSelectSchema = z.object({
  id: z.uuidv7(),
  name: z.string().min(3),
  ownerId: z.uuidv7(),
});

export const workspaceInsertSchema = workspaceSelectSchema.omit({
  id: true,
  ownerId: true,
});

export type Workspace = z.infer<typeof workspaceSelectSchema>;
export type WorkspaceInsert = z.infer<typeof workspaceInsertSchema>;
