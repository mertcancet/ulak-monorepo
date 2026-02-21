import openapi from "@elysiajs/openapi";
import { type } from "arktype";
import { Elysia } from "elysia";

const app = new Elysia()
  .use(
    openapi({
      documentation: {
        info: {
          title: "Ulak Api Docs",
          version: "v1",
        },
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
  .get("/", () => "Hello Elysia")
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);

export type UlakApi = typeof app;
