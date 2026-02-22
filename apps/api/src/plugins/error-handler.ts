import Elysia from "elysia";
import problemDetails from "./problem-details";

const errorHandler = () =>
  new Elysia({
    name: "error-handler",
  })
    .use(problemDetails())
    .onError({ as: "global" }, ({ code, error, problem }) => {
      if (code === "VALIDATION") {
        return problem({
          title: "Bad Request",
          status: 400,
          errors: error.all.map(e => ({
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

      if (!problem) return;

      return problem({
        title: "Internal Server Error",
        detail: (error as Record<string, string>)?.message,
        status: 500,
      });
    });

export default errorHandler;
