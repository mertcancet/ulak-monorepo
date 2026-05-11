import { cors } from "@elysiajs/cors";
import openapi from "@elysiajs/openapi";
import { Elysia } from "elysia";
import type { z } from "zod";
import agentsModule from "~/modules/agents";
import authModule from "~/modules/auth";
import knowledgeBaseModule from "~/modules/knowledge-base";
import errorHandler from "~/plugins/error-handler";
import env from "~/shared/env";
import { BetterAuthOpenAPI } from "./lib/auth";
import rolesModule from "./modules/roles";
import toolsModule from "./modules/tools";
import workspacesModule from "./modules/workspaces";

const app = new Elysia()
  .use(
    openapi({
      documentation: {
        info: {
          title: "Cleon Api Docs",
          version: "v1",
        },
        servers: env.OPENAPI_SERVERS.map(server => ({
          url: server,
          variables: {
            port: {
              default: env.PORT.toString(),
            },
          },
        })),
        components: {
          ...(await BetterAuthOpenAPI.components),

          securitySchemes: {
            WorkspaceId: {
              type: "apiKey",
              in: "header",
              name: "cleon-workspace-id",
            },
            AgentSecret: {
              type: "apiKey",
              in: "header",
              name: "cleon-agent-secret",
            },
          },
        },
        paths: await BetterAuthOpenAPI.getPaths(),
      },
      scalar: {
        persistAuth: true,
        telemetry: false,
        tagsSorter: "alpha",
      },
      mapJsonSchema: {
        zod: (schema: z.ZodTypeAny) => {
          return schema.toJSONSchema?.({
            unrepresentable: "any",
            override: ctx => {
              const def = ctx.zodSchema._zod.def;

              if (def.type === "date") {
                ctx.jsonSchema.type = "string";
                ctx.jsonSchema.format = "date-time";
              }
            },
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
  .use(agentsModule())
  .use(toolsModule())
  .use(workspacesModule())
  .use(rolesModule())
  .use(knowledgeBaseModule())
  .listen(env.PORT);

console.log(
  `Server running at http://${app.server?.hostname}:${app.server?.port}`,
);

export type cleonApi = typeof app;
