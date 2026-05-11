import type { LLMSettings } from "@cleon/shared";
import { sql } from "drizzle-orm";
import {
  boolean,
  index,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { workspaces } from "./workspaces";

export const agents = pgTable(
  "agents",
  {
    id: uuid().primaryKey().default(sql`uuidv7()`),
    workspaceId: uuid()
      .notNull()
      .references(() => workspaces.id, { onDelete: "cascade" }),
    name: text().notNull(),
    phoneNumber: text().unique(),
    llm: jsonb().$type<LLMSettings>(),
    instructions: text().notNull(),
    allowInterruptions: boolean().default(true).notNull(),
    greetPrompt: text(),
    goodbyePrompt: text(),
    createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp({ withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  table => [index().on(table.workspaceId)],
);
