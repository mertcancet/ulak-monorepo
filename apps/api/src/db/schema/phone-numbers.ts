import { sql } from "drizzle-orm";
import { pgTable, text, unique, uuid } from "drizzle-orm/pg-core";
import { sip_trunks } from "./sip-trunks";
import { workspaces } from "./workspaces";

export const phone_numbers = pgTable(
  "phone_numbers",
  {
    id: uuid().primaryKey().default(sql`uuidv7()`),
    workspaceId: uuid()
      .notNull()
      .references(() => workspaces.id, { onDelete: "cascade" }),
    sipTrunkId: uuid()
      .notNull()
      .references(() => sip_trunks.id, { onDelete: "cascade" }),
    number: text().notNull(),
  },
  table => [unique().on(table.sipTrunkId, table.number)],
);
