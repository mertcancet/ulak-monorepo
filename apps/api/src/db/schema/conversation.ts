import type { FileResult } from "@cleon/shared";
import { sql } from "drizzle-orm";
import {
  doublePrecision,
  index,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { agents } from "./agents";

export const conversations = pgTable(
  "conversations",
  {
    id: uuid().primaryKey().default(sql`uuidv7()`),
    agentId: uuid()
      .notNull()
      .references(() => agents.id, { onDelete: "cascade" }),
    startedAt: timestamp({ withTimezone: true }).notNull(),
    endedAt: timestamp({ withTimezone: true }).notNull(),
    duration: doublePrecision().notNull(),
    file: jsonb().$type<FileResult>().notNull(),
    summary: text(),
    fromNumber: text(),
    toNumber: text(),
  },
  table => [index().on(table.agentId)],
);
