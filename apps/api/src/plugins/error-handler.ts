import { DrizzleQueryError } from "drizzle-orm";
import Elysia from "elysia";
import { DatabaseError } from "pg";
import env from "~/shared/env";
import problemDetails from "./problem-details";

const errorHandler = () =>
  new Elysia({
    name: "error-handler",
  })
    .use(problemDetails())
    .onError({ as: "global" }, ({ code, error, problem }) => {
      if (code === "VALIDATION") {
        if (env.NODE_ENV === "development") {
          return problem({
            title: "Bad Request",
            status: 400,
            errors: error.all.map(e => ({
              path: e.path,
              message: e.message,
            })),
          });
        }

        return problem({
          title: "Bad Request",
          status: 400,
        });
      }

      if (!problem) return;

      if (code === "INTERNAL_SERVER_ERROR") {
        return problem({
          title: "Internal Server Error",
          status: 500,
          detail: error.message,
        });
      }

      if (
        error instanceof DrizzleQueryError &&
        error.cause instanceof DatabaseError
      ) {
        const classCode = error.cause.code?.slice(0, 2);
        const clientErrors = ["22", "23", "42"];

        if (
          env.NODE_ENV === "development" &&
          classCode &&
          clientErrors.includes(classCode)
        ) {
          return problem({
            title: "Bad Request",
            detail: error.cause.message,
            status: 400,
          });
        }

        return problem({
          title: "Database Error",
          detail: error.cause.message,
          status: 500,
        });
      }

      console.error(error);

      return problem({
        title: "Internal Server Error",
        detail: (error as Record<string, string>)?.message,
        status: 500,
      });
    });

export default errorHandler;
