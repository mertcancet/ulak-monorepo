import type { LLMSettings } from "@cleon/shared";
import { sql } from "drizzle-orm";
import {
  boolean,
  index,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-orm/zod";
import { z } from "zod";
import { llmSettingsSchema } from "~/modules/agents/types";
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
    isDefault: boolean().default(false).notNull(),
    createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp({ withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  table => [
    index().on(table.workspaceId),
    uniqueIndex()
      .on(table.workspaceId, table.isDefault)
      .where(sql`${table.isDefault} = true`),
  ],
);

export const agentSelectSchema = createSelectSchema(agents, {
  llm: llmSettingsSchema,
});

export const agentInsertSchema = createInsertSchema(agents, {
  llm: llmSettingsSchema,
  name: z.string().min(3),
}).omit({
  id: true,
  workspaceId: true,
  createdAt: true,
  updatedAt: true,
});

export const agentUpdateSchema = agentInsertSchema.partial();

export type Agent = z.infer<typeof agentSelectSchema>;
