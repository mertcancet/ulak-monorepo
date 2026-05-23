import { z } from "zod";
import { roleSelectSchema } from "./role";

export const workspaceSelectSchema = z.object({
  id: z.uuidv7(),
  name: z.string().min(3),
  ownerId: z.uuidv7(),
});

export const workspaceInsertSchema = workspaceSelectSchema.omit({
  id: true,
  ownerId: true,
});

export const workspaceUpdateSchema = workspaceSelectSchema.pick({
  name: true,
});

export const workspaceMembersSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  roles: roleSelectSchema
    .omit({ workspaceId: true, description: true })
    .array(),
});

export type Workspace = z.infer<typeof workspaceSelectSchema>;
export type WorkspaceInsert = z.infer<typeof workspaceInsertSchema>;
export type WorkspaceUpdate = z.infer<typeof workspaceUpdateSchema>;

export type WorkspaceMember = z.infer<typeof workspaceMembersSchema>;
