import {
  roleInsertSchema,
  roleSelectSchema,
  roleUpdateSchema,
} from "@cleon/shared";
import { desc, eq } from "drizzle-orm";
import Elysia from "elysia";
import { z } from "zod";
import db from "~/db";
import { roles } from "~/db/schema";
import models from "~/plugins/models";
import { checkPermissions } from "~/shared/auth-helpers";
import authModule from "../auth";

const rolesModule = () =>
  new Elysia({
    name: "roles",
    prefix: "/roles",
    tags: ["Roles"],
  })
    .use(models())
    .use(authModule())
    .get(
      "",
      async ({ session, headers, problem }) => {
        const workspaceId = headers["cleon-workspace-id"];

        const isAllowed = await checkPermissions({
          user: {
            id: session.userId,
          },
          resource: {
            kind: "role",
            workspaceId,
          },
          action: "view",
        });

        if (!isAllowed) return problem({ title: "Forbidden", status: 403 });

        return await db.select().from(roles).orderBy(desc(roles.id));
      },
      {
        requireAuth: true,
        headers: "headers.workspaceId",
        response: {
          200: roleSelectSchema.array(),
          403: z.any(),
        },
      },
    )
    .post(
      "",
      async ({ body, session, headers, problem }) => {
        const workspaceId = headers["cleon-workspace-id"];

        const isAllowed = await checkPermissions({
          user: {
            id: session.userId,
          },
          resource: {
            kind: "role",
            workspaceId,
          },
          action: "create",
        });

        if (!isAllowed) return problem({ title: "Forbidden", status: 403 });

        const [data] = await db
          .insert(roles)
          .values({ ...body, workspaceId })
          .returning({ id: roles.id });

        return data;
      },
      {
        requireAuth: true,
        headers: "headers.workspaceId",
        body: roleInsertSchema,
        response: { 201: "created.response" },
      },
    )
    .patch(
      ":id",
      async ({ params: { id }, body, session, headers, problem }) => {
        const workspaceId = headers["cleon-workspace-id"];

        const isAllowed = await checkPermissions({
          user: {
            id: session.userId,
          },
          resource: {
            kind: "role",
            workspaceId,
          },
          action: "update",
        });

        if (!isAllowed) return problem({ title: "Forbidden", status: 403 });

        await db.update(roles).set(body).where(eq(roles.id, id));
      },
      {
        requireAuth: true,
        headers: "headers.workspaceId",
        body: roleUpdateSchema,
      },
    )
    .delete(
      ":id",
      async ({ params: { id }, session, headers, problem }) => {
        const workspaceId = headers["cleon-workspace-id"];

        const isAllowed = await checkPermissions({
          user: {
            id: session.userId,
          },
          resource: {
            kind: "role",
            workspaceId,
          },
          action: "delete",
        });

        if (!isAllowed) return problem({ title: "Forbidden", status: 403 });

        await db.delete(roles).where(eq(roles.id, id));
      },
      {
        requireAuth: true,
        headers: "headers.workspaceId",
      },
    );

export default rolesModule;
