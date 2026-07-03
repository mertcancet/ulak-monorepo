import {
  type SipInboundSettings,
  type SipOutboundSettings,
  sipTrunkTypes,
} from "@cleon/shared";
import { sql } from "drizzle-orm";
import {
  index,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { workspaces } from "./workspaces";

export const sipTrunkType = pgEnum("sip_trunk_type", sipTrunkTypes);

export const sip_trunks = pgTable(
  "sip_trunks",
  {
    id: uuid().primaryKey().default(sql`uuidv7()`),
    workspaceId: uuid()
      .notNull()
      .references(() => workspaces.id, { onDelete: "cascade" }),
    name: text().notNull(),
    lkTrunkId: text().notNull(),
    type: sipTrunkType().notNull(),
    username: text(),
    password: text(),
    settings: jsonb().$type<SipInboundSettings | SipOutboundSettings>(),
    createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  },
  table => [index().on(table.workspaceId, table.createdAt)],
);

export const sip_dispatch_rules = pgTable(
  "sip_dispatch_rules",
  {
    id: uuid().primaryKey().default(sql`uuidv7()`),
    sipTrunkId: uuid()
      .notNull()
      .references(() => sip_trunks.id, { onDelete: "cascade" })
      .unique(),
    lkSipDispatchRuleId: text().notNull(),
  },
  table => [index().on(table.sipTrunkId)],
);
