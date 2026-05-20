import { z } from "zod";

export const permissions = [
  "view",
  "share",
  "create",
  "update",
  "delete",
  "add-role",
  "remove-role",
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
  invitation: permissionSchema,
  knowledge_base: permissionSchema,
  user: permissionSchema,
});

export const roleSelectSchema = z.object({
  id: z.uuidv7(),
  workspaceId: z.uuidv7(),
  name: z.string().min(3),
  description: z.string().nullable().optional(),
  permissions: rolePermissionSchema,
});

export const roleInsertSchema = roleSelectSchema.omit({
  id: true,
  workspaceId: true,
});

export const roleUpdateSchema = roleInsertSchema.partial();

export type RolePermissions = z.infer<typeof rolePermissionSchema>;
export type Role = z.infer<typeof roleSelectSchema>;
export type RoleInsert = z.infer<typeof roleInsertSchema>;
export type RoleUpdate = z.infer<typeof roleUpdateSchema>;
