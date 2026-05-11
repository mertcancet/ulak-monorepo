import { toolsInsertSchema, toolsSelectSchema } from "@cleon/shared";
import { desc, eq, getColumns, sql } from "drizzle-orm";
import Elysia from "elysia";
import { z } from "zod";
import db from "~/db";
import { tools } from "~/db/schema";
import models from "~/plugins/models";
import { checkPermissions } from "~/shared/auth-helpers";
import paginatedQuerySchema, {
  paginatedResponse,
} from "~/shared/paginated-query";
import authModule from "../auth";

const toolsModule = () =>
  new Elysia({
    name: "tools",
    prefix: "/tools",
    tags: ["Tools"],
  })
    .use(models())
    .use(authModule())
    .get(
      "",
      async ({ query, session, headers, problem }) => {
        const { page, pageSize } = query;
        const workspaceId = headers["cleon-workspace-id"];

        const isAllowed = await checkPermissions({
          user: {
            id: session.userId,
          },
          resource: {
            kind: "tool",
            workspaceId,
          },
          action: "view",
        });

        if (!isAllowed) return problem({ title: "Forbidden", status: 403 });

        const data = await db
          .select({
            ...getColumns(tools),
            total: sql`count(*) over()`.mapWith(Number),
          })
          .from(tools)
          .where(eq(tools.workspaceId, workspaceId))
          .offset((page - 1) * pageSize)
          .limit(pageSize)
          .orderBy(desc(tools.id));

        const total = data?.[0]?.total || 0;

        return {
          data,
          pagination: {
            page,
            pageSize,
            total,
          },
        };
      },
      {
        requireAuth: true,
        headers: "headers.workspaceId",
        query: paginatedQuerySchema,
        response: {
          200: paginatedResponse(toolsSelectSchema.array()),
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
            kind: "tool",
            workspaceId,
          },
          action: "create",
        });

        if (!isAllowed) return problem({ title: "Forbidden", status: 403 });

        const [data] = await db
          .insert(tools)
          .values({
            ...body,
            workspaceId,
          })
          .returning({ id: tools.id });

        return data;
      },
      {
        requireAuth: true,
        headers: "headers.workspaceId",
        body: toolsInsertSchema,
        response: {
          201: "created.response",
        },
      },
    )
    .get(
      ":id",
      async ({ params: { id }, session, headers, problem }) => {
        const workspaceId = headers["cleon-workspace-id"];

        const isAllowed = await checkPermissions({
          user: {
            id: session.userId,
          },
          resource: {
            kind: "tool",
            workspaceId,
          },
          action: "view",
        });

        if (!isAllowed) return problem({ title: "Forbidden", status: 403 });

        const [tool] = await db.select().from(tools).where(eq(tools.id, id));

        if (!tool) return problem({ title: "Not Found", status: 404 });

        return tool;
      },
      {
        requireAuth: true,
        headers: "headers.workspaceId",
        response: {
          200: toolsSelectSchema,
          403: z.any(),
        },
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
            kind: "tool",
            workspaceId,
          },
          action: "update",
        });

        if (!isAllowed) return problem({ title: "Forbidden", status: 403 });

        await db
          .update(tools)
          .set({ ...body, workspaceId })
          .where(eq(tools.id, id));
      },
      {
        requireAuth: true,
        headers: "headers.workspaceId",
        body: toolsInsertSchema,
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
            kind: "tool",
            workspaceId,
          },
          action: "delete",
        });

        if (!isAllowed) return problem({ title: "Forbidden", status: 403 });

        await db.delete(tools).where(eq(tools.id, id));
      },
      {
        requireAuth: true,
        headers: "headers.workspaceId",
      },
    );

export default toolsModule;
