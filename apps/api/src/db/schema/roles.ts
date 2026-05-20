import { sql } from "drizzle-orm";
import {
  index,
  jsonb,
  pgTable,
  primaryKey,
  text,
  uuid,
} from "drizzle-orm/pg-core";
import type { ResourcePermission } from "~/shared/auth-helpers";
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
    description: text().notNull().default(""),
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
