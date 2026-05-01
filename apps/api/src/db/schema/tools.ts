import type { ToolSettings } from "@ulak/shared";
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
import { createInsertSchema, createSelectSchema } from "drizzle-orm/zod";
import { z } from "zod";
import { toolSettingsSchema } from "~/modules/tools/types";
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
      .references(() => agents.id),
    toolId: uuid()
      .notNull()
      .references(() => tools.id),
  },
  table => [
    primaryKey({
      columns: [table.agentId, table.toolId],
    }),
  ],
);

export const toolsSelectSchema = createSelectSchema(tools, {
  settings: toolSettingsSchema,
});

export const toolsInsertSchema = createInsertSchema(tools, {
  workspaceId: z.uuidv7(),
  name: z
    .string()
    .min(3)
    .regex(/^[a-z][a-z0-9_-]*$/, {
      message:
        "Tool name should only contain alphanumeric characters, underscores and hyphens.",
    }),
  settings: toolSettingsSchema,
}).omit({ id: true, workspaceId: true });

export const toolsUpdateSchema = toolsInsertSchema.partial();
