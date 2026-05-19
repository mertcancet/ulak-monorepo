import { and, DrizzleQueryError, eq, inArray } from "drizzle-orm";
import Elysia from "elysia";
import { DatabaseError } from "pg";
import { z } from "zod";
import db from "~/db";
import { roles, user_roles } from "~/db/schema";
import models from "~/plugins/models";
import { checkPermissions, isWorkspaceMember } from "~/shared/auth-helpers";
import authModule from "../auth";

const usersModule = () =>
  new Elysia({
    name: "users",
    prefix: "/users",
    tags: ["Users"],
  })
    .use(models())
    .use(authModule())
    .post(
      ":id/roles",
      async ({ headers, params, session, body, problem }) => {
        const workspaceId = headers["cleon-workspace-id"];
        const { roleIds } = body;

        const isMember = await isWorkspaceMember({
          userId: params.id,
          workspaceId,
        });

        if (!isMember) {
          return problem({
            title: "Bad Request",
            code: "users.not_workspace_member",
          });
        }

        const targetRoles = await db
          .select()
          .from(roles)
          .where(
            and(inArray(roles.id, roleIds), eq(roles.workspaceId, workspaceId)),
          );

        const targetAuthority = targetRoles.map(r => r.permissions);

        const isAllowed = await checkPermissions({
          user: {
            id: session.userId,
          },
          resource: {
            kind: "user",
            workspaceId,
          },
          action: "add-role",
          targetAuthority,
        });

        if (!isAllowed) return problem({ title: "Forbidden", status: 403 });

        try {
          await db.insert(user_roles).values(
            roleIds.map(roleId => ({
              roleId,
              userId: params.id,
            })),
          );
        } catch (e) {
          if (
            e instanceof DrizzleQueryError &&
            e.cause instanceof DatabaseError &&
            e.cause.code === "23505"
          ) {
            return problem({
              title: "Bad Request",
              code: "users.role_exists",
            });
          }
          throw e;
        }
      },
      {
        requireAuth: true,
        headers: "headers.workspaceId",
        body: z.object({
          roleIds: z.uuidv7().array(),
        }),
      },
    )
    .delete(
      ":id/roles",
      async ({ headers, params, session, body, problem }) => {
        const workspaceId = headers["cleon-workspace-id"];
        const { roleIds } = body;

        const isMember = await isWorkspaceMember({
          userId: params.id,
          workspaceId,
        });

        if (!isMember) {
          return problem({
            title: "Bad Request",
            code: "users.not_workspace_member",
          });
        }

        const targetRoles = await db
          .select()
          .from(roles)
          .where(
            and(inArray(roles.id, roleIds), eq(roles.workspaceId, workspaceId)),
          );

        const targetAuthority = targetRoles.map(r => r.permissions);

        const isAllowed = await checkPermissions({
          user: {
            id: session.userId,
          },
          resource: {
            kind: "user",
            workspaceId,
          },
          action: "remove-role",
          targetAuthority,
        });

        if (!isAllowed) return problem({ title: "Forbidden", status: 403 });

        await db
          .delete(user_roles)
          .where(
            and(
              eq(user_roles.userId, params.id),
              inArray(user_roles.roleId, roleIds),
            ),
          );
      },
      {
        requireAuth: true,
        headers: "headers.workspaceId",
        body: z.object({
          roleIds: z.uuidv7().array(),
        }),
      },
    );

export default usersModule;
