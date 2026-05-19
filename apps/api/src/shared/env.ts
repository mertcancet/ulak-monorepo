import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.literal(["development", "production", "test"]),
  PORT: z.coerce.number(),
  DATABASE_URL: z.url(),
  BETTER_AUTH_SECRET: z.string(),

  BASE_URL: z.url(),
  FRONTEND_URL: z.url(),

  CORS_ORIGINS: z
    .string()
    .transform(origins => origins.split(","))
    .pipe(z.string().array()),
  OPENAPI_SERVERS: z
    .string()
    .transform(servers => servers.split(","))
    .pipe(z.string().array()),
  CLEON_AGENT_SECRET: z.string(),

  LIVEKIT_URL: z.url(),
  LIVEKIT_API_KEY: z.string(),
  LIVEKIT_API_SECRET: z.string(),

  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),

  AWS_SES_REGION: z.string(),
  AWS_SES_ACCESS_KEY: z.string(),
  AWS_SES_SECRET_KEY: z.string(),

  EMAIL_FROM: z.string(),
});

const result = envSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || "3000",
  DATABASE_URL: process.env.DATABASE_URL,
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,

  BASE_URL: process.env.BASE_URL,
  FRONTEND_URL: process.env.FRONTEND_URL,

  CORS_ORIGINS: process.env.CORS_ORIGINS || "http://localhost:5173",
  OPENAPI_SERVERS: process.env.OPENAPI_SERVERS || "http://localhost:3000",

  CLEON_AGENT_SECRET: process.env.CLEON_AGENT_SECRET,

  LIVEKIT_URL: process.env.LIVEKIT_URL,
  LIVEKIT_API_KEY: process.env.LIVEKIT_API_KEY,
  LIVEKIT_API_SECRET: process.env.LIVEKIT_API_SECRET,

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

  AWS_SES_REGION: process.env.AWS_SES_REGION || "us-east-2",
  AWS_SES_ACCESS_KEY: process.env.AWS_SES_ACCESS_KEY,
  AWS_SES_SECRET_KEY: process.env.AWS_SES_SECRET_KEY,

  EMAIL_FROM: process.env.EMAIL_FROM,
});

if (!result.success) {
  throw new Error(result.error.message);
}

const env = result.data;

export default env;
