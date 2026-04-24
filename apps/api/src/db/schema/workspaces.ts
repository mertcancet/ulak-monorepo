import { sql } from "drizzle-orm";
import { index, pgTable, primaryKey, text, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

export const workspaces = pgTable("workspaces", {
  id: uuid().primaryKey().default(sql`uuidv7()`),
  name: text().notNull(),
});

export const workspace_members = pgTable(
  "workspace_members",
  {
    userId: uuid()
      .notNull()
      .references(() => users.id),
    workspaceId: uuid()
      .notNull()
      .references(() => workspaces.id),
  },
  table => [
    primaryKey({
      columns: [table.userId, table.workspaceId],
    }),
  ],
);

export const roles = pgTable(
  "roles",
  {
    id: uuid().primaryKey().default(sql`uuidv7()`),
    workspaceId: uuid()
      .notNull()
      .references(() => workspaces.id),
    name: text().notNull(),
  },
  table => [index().on(table.workspaceId)],
);
