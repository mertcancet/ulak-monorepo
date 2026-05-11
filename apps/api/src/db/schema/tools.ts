import type { ToolSettings } from "@cleon/shared";
import { sql } from "drizzle-orm";
import {
  boolean,
  index,
  jsonb,
  pgTable,
  primaryKey,
  text,
  uuid,
} from "drizzle-orm/pg-core";
import { agents } from "./agents";
import { workspaces } from "./workspaces";

export const tools = pgTable(
  "tools",
  {
    id: uuid().primaryKey().default(sql`uuidv7()`),
    workspaceId: uuid()
      .notNull()
      .references(() => workspaces.id, { onDelete: "cascade" }),
    name: text().notNull(),
    description: text().notNull(),
    disallowInterruptions: boolean().default(false),
    settings: jsonb().$type<ToolSettings>().notNull(),
  },
  table => [index().on(table.workspaceId)],
);

export const agent_tools = pgTable(
  "agent_tools",
  {
    agentId: uuid()
      .notNull()
      .references(() => agents.id, { onDelete: "cascade" }),
    toolId: uuid()
      .notNull()
      .references(() => tools.id, { onDelete: "cascade" }),
  },
  table => [
    primaryKey({
      columns: [table.agentId, table.toolId],
    }),
  ],
);
