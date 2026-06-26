import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { betterAuth } from "better-auth";
import { openAPI } from "better-auth/plugins";
import { render } from "jsx-email";
import type { OpenAPIV3 } from "openapi-types";
import db from "~/db";
import * as schema from "~/db/schema";
import { PasswordResetEmail, VerificationEmail } from "~/emails";
import { emailService } from "~/shared/email-service";
import env from "~/shared/env";

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
  baseURL: env.BASE_URL,
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
    crossSubDomainCookies: {
      enabled: false,
    },
    database: {
      generateId: false,
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      const html = await render(<PasswordResetEmail passwordResetURL={url} />);

      void emailService.send({
        to: user.email,
        subject: "Reset your password",
        html,
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      const html = await render(<VerificationEmail verificationURL={url} />);

      void emailService.send({
        to: user.email,
        subject: "Verify your email address",
        html,
      });
    },
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
