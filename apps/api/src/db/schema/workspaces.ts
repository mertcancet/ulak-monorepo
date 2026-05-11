import { sql } from "drizzle-orm";
import { index, pgTable, primaryKey, text, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

export const workspaces = pgTable(
  "workspaces",
  {
    id: uuid().primaryKey().default(sql`uuidv7()`),
    name: text().notNull(),
    ownerId: uuid()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  table => [index().on(table.ownerId)],
);

export const workspace_members = pgTable(
  "workspace_members",
  {
    userId: uuid()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    workspaceId: uuid()
      .notNull()
      .references(() => workspaces.id, { onDelete: "cascade" }),
  },
  table => [
    primaryKey({
      columns: [table.userId, table.workspaceId],
    }),
  ],
);
