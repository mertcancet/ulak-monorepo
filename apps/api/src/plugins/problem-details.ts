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
      errors,
    }: Pick<
      Partial<BadRequest>,
      "title" | "detail" | "status" | "errors"
    > = {}) {
      return Response.json(
        {
          title,
          detail,
          status: statusCode,
          instance: `${request.method} ${new URL(request.url).pathname}`,
          errors,
        } satisfies BadRequest,
        { status: statusCode },
      );
    },
  }));

export default problemDetails;
