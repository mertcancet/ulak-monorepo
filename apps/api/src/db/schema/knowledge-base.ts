import { sql } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { workspaces } from "./workspaces";

export const knowledgeBaseTypeEnum = pgEnum("knowledge_base_type", [
  "file",
  "text",
  "website",
]);

export const knowledgeBase = pgTable("knowledge_base", {
  id: uuid().primaryKey().default(sql`uuidv7()`),
  workspaceId: uuid()
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),

  name: text().notNull(),
  description: text(),
  type: knowledgeBaseTypeEnum().notNull(),
  textContent: text(),
  websiteUrl: text(),
  fileName: text(),
  fileUrl: text(),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
