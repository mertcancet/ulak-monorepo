import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "~/db/schema";
import env from "~/shared/env";
import relations from "./relations";

const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

const db = drizzle({
  client: pool,
  casing: "snake_case",
  schema,
  relations,
});

export default db;
