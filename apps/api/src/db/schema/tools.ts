import { sql } from "drizzle-orm";
import {
  boolean,
  index,
  jsonb,
  pgTable,
  text,
  uuid,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-orm/zod";
import { z } from "zod";
import { type ToolSettings, toolSettingsSchema } from "~/modules/tools/types";
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

export const toolsSelectSchema = createSelectSchema(tools, {
  settings: toolSettingsSchema,
});

export const toolsInsertSchema = createInsertSchema(tools, {
  workspaceId: z.uuidv7(),
  settings: toolSettingsSchema,
}).omit({ id: true });

export const toolsUpdateSchema = toolsInsertSchema.partial().omit({
  workspaceId: true,
});
