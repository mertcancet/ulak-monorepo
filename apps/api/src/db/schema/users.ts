import { sql } from "drizzle-orm";
import {
  boolean,
  jsonb,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import type { RolePermission } from "~/shared/auth-helpers";
import { roles } from "./workspaces";

export const users = pgTable("users", {
  id: uuid().primaryKey().default(sql`uuidv7()`),
  name: text().notNull(),
  email: text().notNull().unique(),
  emailVerified: boolean().default(false).notNull(),
  image: text(),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true })
    .$onUpdate(() => new Date())
    .notNull(),
});

export const role_permissions = pgTable("role_permissions", {
  id: uuid()
    .references(() => roles.id)
    .primaryKey(),
  permissions: jsonb().$type<RolePermission>().notNull().default({}),
});

export const user_roles = pgTable(
  "user_roles",
  {
    userId: uuid()
      .notNull()
      .references(() => users.id),
    roleId: uuid()
      .notNull()
      .references(() => roles.id),
  },
  table => [primaryKey({ columns: [table.userId, table.roleId] })],
);
