import { sql } from "drizzle-orm";
import { pgTable, text, unique, uuid } from "drizzle-orm/pg-core";
import { agents } from "./agents";
import { sip_trunks } from "./sip-trunks";

export const phone_numbers = pgTable(
  "phone_numbers",
  {
    id: uuid().primaryKey().default(sql`uuidv7()`),
    sipTrunkId: uuid()
      .notNull()
      .references(() => sip_trunks.id, { onDelete: "cascade" }),
    number: text().notNull(),
    label: text(),
    agentId: uuid().references(() => agents.id, { onDelete: "set null" }),
  },
  table => [
    unique().on(table.sipTrunkId, table.number),
    unique().on(table.number, table.agentId),
  ],
);
