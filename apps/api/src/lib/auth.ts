import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { betterAuth } from "better-auth";
import db from "~/db";
import { accounts, sessions, users, verifications } from "~/db/schema";
import env from "~/shared/env";

const auth = betterAuth({
  // @ts-expect-error
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema: {
      users: users,
      sessions: sessions,
      accounts: accounts,
      verifications: verifications,
    },
  }),
  experimental: { joins: true },
  appName: "Ulak",
  basePath: "/auth",
  trustedOrigins: env.CORS_ORIGINS,
  advanced: {
    useSecureCookies: env.NODE_ENV === "production",
    cookiePrefix: "ulak",
    database: {
      generateId: false,
    },
    crossSubDomainCookies: {
      enabled: true,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
});

export default auth;
