import Elysia from "elysia";
import { z } from "zod";
import db from "~/db";
import { workspaces } from "~/db/schema";
import authModule from "../auth";
import { workspaceSchema } from "./types";

const workspacesModule = () =>
  new Elysia({
    name: "workspaces",
    prefix: "/workspaces",
    tags: ["Workspaces"],
  })
    .use(authModule())
    .post(
      "",
      async ({ body, session }) => {
        const [workspace] = await db
          .insert(workspaces)
          .values({
            ...body,
            userId: session.userId,
          })
          .returning({ id: workspaces.id });

        return workspace;
      },
      {
        requireAuth: true,
        body: workspaceSchema,
        response: {
          201: z.object({ id: z.string() }),
        },
      },
    );

export default workspacesModule;
