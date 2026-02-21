import openapi from "@elysiajs/openapi";
import { type } from "arktype";
import { Elysia } from "elysia";

const Payload = type({
  username: "string.alphanumeric > 0",
  password: "string",
});

const badRequestModule = type.module({
  "#ValidationError": {
    path: "string",
    message: "string",
  },
  Schema: {
    title: "string",
    "detail?": "string",
    status: "100 < number < 599",
    instance: "string",
    "errors?": "ValidationError[]",
  },
});

type BadRequestSchema = typeof badRequestModule.Schema.infer;

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
  .derive(({ request }) => ({
    problem: ({
      title = "Bad Request",
      status: statusCode = 400,
      detail,
      errors,
    }: Pick<
      Partial<BadRequestSchema>,
      "title" | "detail" | "status" | "errors"
    > = {}) => {
      return Response.json(
        {
          title,
          detail,
          status: statusCode,
          instance: `${request.method} ${new URL(request.url).pathname}`,
          errors,
        } satisfies BadRequestSchema,
        { status: statusCode },
      );
    },
  }))
  .onError(({ code, error, problem }) => {
    if (code === "VALIDATION") {
      return problem({
        title: "Bad Request",
        status: 400,
        errors: error.all.map((e) => ({
          path: e.path,
          message: e.message,
        })),
      });
    }
    if (code === "INTERNAL_SERVER_ERROR" && !!problem) {
      return problem({
        title: "Internal Server Error",
        status: 500,
      });
    }
  })
  .get("/", () => "Hello Elysia")
  .post(
    "/sign-in",
    ({ body }) => {
      return {
        status: 200,
        id: "30PKTuqj4FstWTdFpQWS8PcxeHvZ1HFjxOUtAmriWGE=",
      };
    },
    {
      body: Payload,
      response: {
        400: badRequestModule.Schema,
      },
    },
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);

export type UlakApi = typeof app;
