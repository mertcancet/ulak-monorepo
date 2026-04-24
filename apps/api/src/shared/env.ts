import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.literal(["development", "production", "test"]),
  PORT: z.coerce.number(),
  DATABASE_URL: z.url(),
  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.url(),
  CORS_ORIGINS: z
    .string()
    .transform(origins => origins.split(","))
    .pipe(z.string().array()),
  OPENAPI_SERVERS: z
    .string()
    .transform(servers => servers.split(","))
    .pipe(z.string().array()),
});

const result = envSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || "3000",
  DATABASE_URL: process.env.DATABASE_URL,
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
  BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
  CORS_ORIGINS: process.env.CORS_ORIGINS || "http://localhost:5173",
  OPENAPI_SERVERS: process.env.OPENAPI_SERVERS || "http://localhost:3000",
});

if (!result.success) {
  throw new Error(result.error.message);
}

const env = result.data;

export default env;
