import { type } from "arktype";

const envSchema = type({
  NODE_ENV: "'development' | 'production' | 'test'",
  PORT: "string.numeric.parse |> 0 < number <= 65535",
  DATABASE_URL: "string.url",
});

const env = envSchema({
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || "3000",
  DATABASE_URL: process.env.DATABASE_URL,
});

if (env instanceof type.errors) {
  throw new Error(env.summary);
}

export default env as typeof envSchema.infer;
