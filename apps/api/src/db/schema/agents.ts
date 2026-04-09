import { sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export type AgentFlowDocument = {
  nodes: unknown[];
  edges: unknown[];
  viewport?: unknown;
  metadata?: Record<string, unknown>;
};

export const agents = pgTable(
  "agents",
  {
    id: uuid("id").primaryKey().default(sql`uuidv7()`),
    ownerUserId: uuid("owner_user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    description: text("description"),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  table => [index().on(table.ownerUserId), index().on(table.isActive)],
);

export const agentFlows = pgTable(
  "agent_flows",
  {
    id: uuid("id").primaryKey().default(sql`uuidv7()`),
    agentId: uuid("agent_id")
      .notNull()
      .references(() => agents.id, { onDelete: "cascade" }),
    ownerUserId: uuid("owner_user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    flow: jsonb("flow").$type<AgentFlowDocument>().notNull(),
    version: integer("version").default(1).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  table => [
    uniqueIndex().on(table.agentId),
    index().on(table.ownerUserId),
    index().on(table.updatedAt),
  ],
);
