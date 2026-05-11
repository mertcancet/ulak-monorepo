import { z } from "zod";

export const permissions = [
  "view",
  "share",
  "invite",
  "create",
  "update",
  "delete",
  "*",
] as const;

export type Permission = (typeof permissions)[number];
export type ResourceKind = keyof z.infer<typeof rolePermissionSchema>;

const permissionSchema = z.enum(permissions).array().optional();

export const rolePermissionSchema = z.object({
  workspace: permissionSchema,
  role: permissionSchema,
  agent: permissionSchema,
  tool: permissionSchema,
});

export const roleSelectSchema = z.object({
  id: z.uuidv7(),
  workspaceId: z.uuidv7(),
  name: z.string().min(3),
  permissions: rolePermissionSchema,
});

export const roleInsertSchema = roleSelectSchema.omit({
  id: true,
  workspaceId: true,
});

export const roleUpdateSchema = roleInsertSchema.partial();
