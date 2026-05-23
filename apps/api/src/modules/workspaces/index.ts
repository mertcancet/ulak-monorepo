import {
  type RolePermissions,
  workspaceInsertSchema,
  workspaceMembersSchema,
  workspaceSelectSchema,
  workspaceUpdateSchema,
} from "@cleon/shared";
import { and, desc, eq, sql } from "drizzle-orm";
import Elysia from "elysia";
import { z } from "zod";
import db from "~/db";
import {
  roles,
  user_roles,
  users,
  workspace_members,
  workspaces,
} from "~/db/schema";
import models from "~/plugins/models";
import { checkPermissions } from "~/shared/auth-helpers";
import authModule from "../auth";

const workspacesModule = () =>
  new Elysia({
    name: "workspaces",
    prefix: "/workspaces",
    tags: ["Workspaces"],
  })
    .use(models())
    .use(authModule())
    .get(
      "",
      async ({ session }) => {
        return await db
          .select({
            id: workspaces.id,
            name: workspaces.name,
            ownerId: workspaces.ownerId,
          })
          .from(workspaces)
          .innerJoin(
            workspace_members,
            eq(workspace_members.workspaceId, workspaces.id),
          )
          .where(eq(workspace_members.userId, session.userId))
          .orderBy(desc(workspaces.id));
      },
      {
        requireAuth: true,
        response: workspaceSelectSchema.array(),
      },
    )
    .post(
      "",
      async ({ body, session, problem }) => {
        return await db.transaction(async tx => {
          const [workspace] = await tx
            .insert(workspaces)
            .values({ ...body, ownerId: session.userId })
            .returning({ id: workspaces.id });

          if (!workspace) throw problem({ title: "Bad Request" });

          await tx.insert(workspace_members).values({
            userId: session.userId,
            workspaceId: workspace.id,
          });

          const defaultRoles = await tx
            .insert(roles)
            .values([
              {
                name: "Workspace Admin",
                workspaceId: workspace.id,
                permissions: {
                  agent: ["*"],
                  role: ["*"],
                  tool: ["*"],
                  workspace: ["update"],
                  invitation: ["view", "create", "delete", "update"],
                  user: ["add-role", "remove-role"],
                } satisfies RolePermissions,
              },
              {
                name: "Member",
                workspaceId: workspace.id,
                permissions: {
                  agent: ["view"],
                  tool: ["view"],
                } satisfies RolePermissions,
              },
            ])
            .returning({ id: roles.id });

          const memberRole = defaultRoles[1];

          if (!memberRole) throw problem({ title: "Internal Server Error" });

          await tx.insert(user_roles).values({
            roleId: memberRole.id,
            userId: session.userId,
          });

          return workspace;
        });
      },
      {
        requireAuth: true,
        body: workspaceInsertSchema,
        response: {
          201: "created.response",
          400: z.any(),
        },
      },
    )
    .get(
      ":id/members",
      async ({ params, session, problem }) => {
        const workspaceId = params.id;

        const isAllowed = await checkPermissions({
          user: {
            id: session.userId,
          },
          resource: {
            kind: "workspace",
            workspaceId,
          },
          action: "view",
        });

        if (!isAllowed) return problem({ title: "Forbidden", status: 403 });

        return await db
          .select({
            id: workspace_members.userId,
            name: users.name,
            email: users.email,
            roles: sql`COALESCE(
              JSON_AGG(
                JSON_BUILD_OBJECT(
                  'id', ${roles.id},
                  'name', ${roles.name},
                  'permissions', ${roles.permissions}
                )
              ),
              '[]'::json
            )`.as("roles"),
          })
          .from(workspace_members)
          .leftJoin(users, eq(users.id, workspace_members.userId))
          .leftJoin(user_roles, eq(user_roles.userId, workspace_members.userId))
          .leftJoin(roles, eq(roles.id, user_roles.roleId))
          .where(
            and(
              eq(workspace_members.workspaceId, workspaceId),
              eq(roles.workspaceId, workspaceId),
            ),
          )
          .groupBy(workspace_members.userId, users.name, users.email);
      },
      {
        requireAuth: true,
        response: {
          200: workspaceMembersSchema.array(),
          403: z.any(),
        },
      },
    )
    .patch(
      ":id",
      async ({ params, body, session, problem }) => {
        const isAllowed = await checkPermissions({
          user: {
            id: session.userId,
          },
          resource: {
            kind: "workspace",
            workspaceId: params.id,
          },
          action: "update",
        });

        if (!isAllowed) return problem({ title: "Forbidden", status: 403 });

        await db
          .update(workspaces)
          .set(body)
          .where(eq(workspaces.id, params.id));
      },
      {
        requireAuth: true,
        body: workspaceUpdateSchema,
      },
    )
    .delete(
      ":id",
      async ({ session, params, problem }) => {
        const [workspace] = await db
          .select({ ownerId: workspaces.ownerId })
          .from(workspaces)
          .where(eq(workspaces.id, params.id));

        if (!workspace) return problem({ title: "Not Found", status: 404 });

        const isAllowed = workspace.ownerId === session.userId;

        if (!isAllowed) return problem({ title: "Forbidden", status: 403 });

        await db.delete(workspaces).where(eq(workspaces.id, params.id));
      },
      {
        requireAuth: true,
        detail: {
          description: "Only workspace owners can delete a workspace.",
        },
      },
    );

export default workspacesModule;
