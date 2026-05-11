import { sql } from "drizzle-orm";
import {
  index,
  jsonb,
  pgTable,
  primaryKey,
  text,
  uuid,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-orm/zod";
import { z } from "zod";
import {
  type ResourcePermission,
  rolePermissionSchema,
} from "~/shared/auth-helpers";
import { users } from "./users";
import { workspaces } from "./workspaces";

export const roles = pgTable(
  "roles",
  {
    id: uuid().primaryKey().default(sql`uuidv7()`),
    workspaceId: uuid()
      .notNull()
      .references(() => workspaces.id, { onDelete: "cascade" }),
    name: text().notNull(),
    permissions: jsonb().$type<ResourcePermission>().notNull().default({}),
  },
  table => [index().on(table.workspaceId)],
);

export const user_roles = pgTable(
  "user_roles",
  {
    userId: uuid()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    roleId: uuid()
      .notNull()
      .references(() => roles.id, { onDelete: "cascade" }),
  },
  table => [primaryKey({ columns: [table.userId, table.roleId] })],
);

export const roleSelectSchema = createSelectSchema(roles, {
  permissions: rolePermissionSchema,
});

export const roleInsertSchema = createInsertSchema(roles, {
  name: z.string().min(3),
  permissions: rolePermissionSchema,
}).omit({
  id: true,
  workspaceId: true,
});

export const roleUpdateSchema = roleInsertSchema.partial();
