import { type } from "arktype";

const envSchema = type({
  NODE_ENV: "'development' | 'production' | 'test'",
  PORT: "string.numeric.parse |> 0 < number <= 65535",
  DATABASE_URL: "string.url",
  BETTER_AUTH_SECRET: "string",
  BETTER_AUTH_URL: "string.url",
  CORS_ORIGINS: type("string")
    .pipe(origins => origins.split(","))
    .to("string.url[]"),
});

const env = envSchema({
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || "3000",
  DATABASE_URL: process.env.DATABASE_URL,
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
  BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
  CORS_ORIGINS: process.env.CORS_ORIGINS || "http://localhost:5173",
});

if (env instanceof type.errors) {
  throw new Error(env.summary);
}

export default env as typeof envSchema.infer;
