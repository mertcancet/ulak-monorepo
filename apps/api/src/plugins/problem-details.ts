import Elysia from "elysia";
import type { BadRequest } from "~/types/bad-request";

const problemDetails = () =>
  new Elysia({
    name: "problem-details",
  }).derive({ as: "global" }, ({ request }) => ({
    problem({
      title = "Bad Request",
      status: statusCode = 400,
      detail,
      code,
      errors,
    }: Pick<
      Partial<BadRequest>,
      "title" | "detail" | "status" | "errors" | "code"
    > = {}) {
      const badRequest = {
        title,
        detail,
        status: statusCode,
        instance: `${request.method} ${new URL(request.url).pathname}`,
        code,
        errors,
      } satisfies BadRequest;

      console.error(badRequest);

      return Response.json(badRequest, { status: statusCode });
    },
  }));

export default problemDetails;
