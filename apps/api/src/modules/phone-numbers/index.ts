import { eq } from "drizzle-orm";
import Elysia from "elysia";
import db from "~/db";
import { phone_numbers } from "~/db/schema";
import models from "~/plugins/models";
import problemDetails from "~/plugins/problem-details";
import authModule from "../auth";

const phoneNumberModule = () =>
  new Elysia({
    name: "phone-numbers",
    prefix: "/phone-numbers",
    tags: ["Phone Numbers"],
  })
    .use(models())
    .use(authModule())
    .use(problemDetails())
    .get(
      "",
      async ({ headers }) => {
        const workspaceId = headers["cleon-workspace-id"];

        return await db
          .select()
          .from(phone_numbers)
          .where(eq(phone_numbers.workspaceId, workspaceId));
      },
      { requireAuth: true, headers: "headers.workspaceId" },
    );

export default phoneNumberModule;
