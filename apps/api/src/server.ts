import { cors } from "@elysiajs/cors";
import openapi from "@elysiajs/openapi";
import type { type } from "arktype";
import { Elysia } from "elysia";
import authModule from "~/modules/auth";
import knowledgeBaseModule from "~/modules/knowledge-base";
import errorHandler from "~/plugins/error-handler";
import env from "~/shared/env";

const app = new Elysia()
  .use(
    openapi({
      documentation: {
        info: {
          title: "Ulak Api Docs",
          version: "v1",
        },
      },
      scalar: {
        persistAuth: true,
        telemetry: false,
      },
      mapJsonSchema: {
        arktype: (schema: type) => {
          return schema["~standard"].jsonSchema.input({
            target: "draft-2020-12",
          });
        },
      },
    }),
  )
  .use(
    cors({
      origin: env.CORS_ORIGINS,
      credentials: true,
    }),
  )
  .use(errorHandler())
  .use(authModule())
  .use(knowledgeBaseModule())
  .get("/", () => "Hello Elysia")
  .get("/user", ({ user }) => user, {
    auth: true,
  })
  .listen(env.PORT);

console.log(
  `Server running at http://${app.server?.hostname}:${app.server?.port}`,
);

export type UlakApi = typeof app;
