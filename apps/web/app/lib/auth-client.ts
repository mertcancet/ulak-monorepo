import type auth from "@ulak/auth";
import { createAuthClient } from "better-auth/client";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  // TODO: Environment
  baseURL: "http://localhost:3000",
  basePath: "/auth",
  plugins: [inferAdditionalFields<typeof auth>()],
});
