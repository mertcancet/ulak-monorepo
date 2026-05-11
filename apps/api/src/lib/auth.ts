import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { betterAuth } from "better-auth";
import { openAPI } from "better-auth/plugins";
import type { OpenAPIV3 } from "openapi-types";
import db from "~/db";
import * as schema from "~/db/schema";
import env from "~/shared/env";

const authUrlHost = new URL(env.BETTER_AUTH_URL).hostname;
const isLocalAuthHost =
  authUrlHost === "localhost" ||
  authUrlHost === "127.0.0.1" ||
  authUrlHost === "::1";

const socialProviders =
  env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET
    ? {
        google: {
          clientId: env.GOOGLE_CLIENT_ID,
          clientSecret: env.GOOGLE_CLIENT_SECRET,
        },
      }
    : undefined;

const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema,
  }),
  appName: "Cleon",
  basePath: "/auth",
  trustedOrigins: env.CORS_ORIGINS,
  user: {
    additionalFields: {
      metadata: {
        type: "json",
        input: false,
        required: false,
      },
    },
  },
  advanced: {
    cookiePrefix: "cleon",
    database: {
      generateId: false,
    },
    crossSubDomainCookies: {
      enabled: !isLocalAuthHost,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders,
  plugins: [openAPI()],
});

let _schema: ReturnType<typeof auth.api.generateOpenAPISchema>;
const getAuthOpenAPISchema = async () =>
  (_schema ??= auth.api.generateOpenAPISchema());

export const BetterAuthOpenAPI = {
  getPaths: (prefix = "/auth") =>
    getAuthOpenAPISchema().then(({ paths }) => {
      const reference: typeof paths = Object.create(null);
      for (const path of Object.keys(paths)) {
        const key = prefix + path;
        // @ts-expect-error
        reference[key] = paths[path];
        // @ts-expect-error
        for (const method of Object.keys(paths[path])) {
          const operation = (reference[key] as Record<string, unknown>)[
            method
          ] as Record<string, unknown>;
          operation.tags = ["Auth"];
        }
      }
      return reference;
    }) as Promise<OpenAPIV3.PathsObject>,
  components: getAuthOpenAPISchema().then(
    ({ components }) => components,
  ) as Promise<OpenAPIV3.ComponentsObject>,
} as const;

export default auth;
