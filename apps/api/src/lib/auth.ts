import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { betterAuth } from "better-auth";
import db from "~/db";
import * as schema from "~/db/schema";
import { ensureDefaultAgentForUser } from "~/modules/agents/default-agent";

import env from "~/shared/env";

const auth = betterAuth({
  // @ts-expect-error
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema,
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
  databaseHooks: {
    user: {
      create: {
        after: async user => {
          if (!user?.id) {
            return;
          }

          await ensureDefaultAgentForUser(user.id);
        },
      },
    },
  },
});

export default auth;
