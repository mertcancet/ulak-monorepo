import { invitationStatuses } from "@cleon/shared";
import { sql } from "drizzle-orm";
import { index, pgEnum, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";
import { workspaces } from "./workspaces";

export const invitationStatusEnum = pgEnum(
  "invitation_status",
  invitationStatuses,
);

export const invitations = pgTable(
  "invitations",
  {
    id: uuid().primaryKey().default(sql`uuidv7()`),
    workspaceId: uuid()
      .notNull()
      .references(() => workspaces.id, { onDelete: "cascade" }),
    userId: uuid()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    invitedBy: uuid()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    roles: uuid().array().notNull(),
    status: invitationStatusEnum().default("pending").notNull(),
    createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
    expiresAt: timestamp({ withTimezone: true }).notNull(),
  },
  table => [index().on(table.workspaceId)],
);
