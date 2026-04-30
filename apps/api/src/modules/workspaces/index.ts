import Elysia from "elysia";
import db from "~/db";
import { workspaces } from "~/db/schema";
import models from "~/plugins/models";
import authModule from "../auth";
import { workspaceSchema } from "./types";

const workspacesModule = () =>
  new Elysia({
    name: "workspaces",
    prefix: "/workspaces",
    tags: ["Workspaces"],
  })
    .use(models())
    .use(authModule())
    .post(
      "",
      async ({ body }) => {
        // TODO: Permission Check - workspace resource
        const [workspace] = await db
          .insert(workspaces)
          .values(body)
          .returning({ id: workspaces.id });

        return workspace;
      },
      {
        requireAuth: true,
        body: workspaceSchema,
        response: {
          201: "created.response",
        },
      },
    );

export default workspacesModule;
