import { z } from "zod";

export const standardPermissions = [
  "view",
  "create",
  "update",
  "delete",
  "*",
] as const;

const userPermissions = ["add-role", "remove-role", "*"] as const;
const workspacePermissions = ["view", "update", "remove-member", "*"] as const;

export type ResourceKind = keyof z.infer<typeof rolePermissionSchema>;

export const rolePermissionSchema = z.object({
  workspace: z.enum(workspacePermissions).array().optional(),
  role: z.enum(standardPermissions).array().optional(),
  agent: z.enum(standardPermissions).array().optional(),
  tool: z.enum(standardPermissions).array().optional(),
  invitation: z.enum(standardPermissions).array().optional(),
  knowledge_base: z.enum(standardPermissions).array().optional(),
  user: z.enum(userPermissions).array().optional(),
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
export type ResourcePermission = {
  [K in keyof RolePermissions]: NonNullable<RolePermissions[K]>[number];
};

export type Role = z.infer<typeof roleSelectSchema>;
export type RoleInsert = z.infer<typeof roleInsertSchema>;
export type RoleUpdate = z.infer<typeof roleUpdateSchema>;
