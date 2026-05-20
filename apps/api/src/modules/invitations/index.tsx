import {
  invitationCreateSchema,
  invitationSelectSchema,
  invitationUpdateSchema,
} from "@cleon/shared";
import dayjs from "dayjs";
import { and, eq, getColumns, inArray, sql } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import Elysia from "elysia";
import { render } from "jsx-email";
import { z } from "zod";
import db from "~/db";
import {
  invitations,
  roles,
  user_roles,
  users,
  workspace_members,
  workspaces,
} from "~/db/schema";
import { WorkspaceInviteEmail } from "~/emails";
import models from "~/plugins/models";
import { checkPermissions } from "~/shared/auth-helpers";
import { emailService } from "~/shared/email-service";
import env from "~/shared/env";
import authModule from "../auth";

const invitationsModule = () =>
  new Elysia({
    name: "invitations",
    prefix: "/invitations",
    tags: ["Invitations"],
  })
    .use(models())
    .use(authModule())
    .model({
      "invitation.id": z.object({ invitationId: z.string() }),
    })
    .get(
      "",
      async ({ headers, query, session, problem }) => {
        const inviter = alias(users, "inviter");

        if (query.scope === "personal") {
          return await db
            .select({
              ...getColumns(invitations),
              email: users.email,
              workspaceName: workspaces.name,
              invitedBy: sql`COALESCE(
                JSON_BUILD_OBJECT(
                  'name', ${inviter.name},
                  'email', ${inviter.email}
                ),
                '{}'::json
              )`.as("invited_by"),
            })
            .from(invitations)
            .innerJoin(users, eq(users.id, invitations.userId))
            .innerJoin(workspaces, eq(workspaces.id, invitations.workspaceId))
            .innerJoin(inviter, eq(inviter.id, invitations.invitedBy))
            .where(
              and(
                eq(invitations.userId, session.userId),
                eq(invitations.status, "pending"),
              ),
            );
        }

        const workspaceId = headers["cleon-workspace-id"];

        if (!workspaceId)
          return problem({
            title: "Bad Request",
            detail: "cleon-workspace-id is missing in header.",
          });

        const isAllowed = await checkPermissions({
          user: {
            id: session.userId,
          },
          resource: {
            kind: "invitation",
            workspaceId,
          },
          action: "view",
        });

        if (!isAllowed) return problem({ title: "Forbidden", status: 403 });

        return await db
          .select({
            ...getColumns(invitations),
            email: users.email,
            workspaceName: workspaces.name,
            invitedBy: sql`COALESCE(
              JSON_BUILD_OBJECT(
                'name', ${inviter.name},
                'email', ${inviter.email}
              ),
              '{}'::json
            )`.as("invited_by"),
          })
          .from(invitations)
          .innerJoin(users, eq(users.id, invitations.userId))
          .innerJoin(workspaces, eq(workspaces.id, invitations.workspaceId))
          .innerJoin(inviter, eq(inviter.id, invitations.invitedBy))
          .where(eq(invitations.workspaceId, workspaceId));
      },
      {
        requireAuth: true,
        headers: "headers.workspaceId-optional",
        query: z.object({
          scope: z.enum(["personal", "workspace"]),
        }),
        response: {
          200: invitationSelectSchema.array(),
          403: z.any(),
        },
      },
    )
    .post(
      "",
      async ({ headers, session, user, body, problem }) => {
        const workspaceId = headers["cleon-workspace-id"];

        const { email, roles: roleIds } = body;

        const [invitedUser] = await db
          .select({
            id: users.id,
            emailVerified: users.emailVerified,
          })
          .from(users)
          .where(eq(users.email, email));

        if (!invitedUser) return problem({ title: "Bad Request" });

        const [member] = await db
          .select()
          .from(workspace_members)
          .where(
            and(
              eq(workspace_members.userId, invitedUser.id),
              eq(workspace_members.workspaceId, workspaceId),
            ),
          );

        if (member) return problem({ title: "Bad Request" });

        const targetRoles = await db
          .select()
          .from(roles)
          .where(inArray(roles.id, roleIds));

        const targetAuthority = targetRoles.map(r => r.permissions);

        const isAllowed = await checkPermissions({
          user: {
            id: session.userId,
          },
          resource: {
            kind: "invitation",
            workspaceId,
          },
          action: "create",
          targetAuthority,
        });

        if (!isAllowed) return problem({ title: "Forbidden", status: 403 });

        const [data] = await db
          .insert(invitations)
          .values({
            workspaceId,
            userId: invitedUser.id,
            status: "pending",
            roles: roleIds,
            invitedBy: session.userId,
            expiresAt: dayjs().add(48, "hours").toDate(),
          })
          .returning({ id: invitations.id });

        const inviteURL = `${env.FRONTEND_URL}/workspaces`;

        const [workspace] = await db
          .select({ name: workspaces.name })
          .from(workspaces)
          .where(eq(workspaces.id, workspaceId));

        if (!workspace)
          throw problem({ title: "Internal Server Error", status: 500 });

        if (invitedUser.emailVerified) {
          const html = await render(
            <WorkspaceInviteEmail
              workspace={workspace.name}
              inviteURL={inviteURL}
              invitedBy={{
                email: user.email,
                name: user.name,
              }}
            />,
          );

          void emailService.send({
            subject: `You've been invited to join ${workspace.name}`,
            to: email,
            html,
          });
        }

        return data;
      },
      {
        requireAuth: true,
        headers: "headers.workspaceId",
        body: invitationCreateSchema,
        response: {
          201: "created.response",
          403: z.any(),
        },
      },
    )
    .patch(
      ":id",
      async ({ headers, session, params, body, problem }) => {
        const workspaceId = headers["cleon-workspace-id"];
        const { id } = params;
        const { roles: roleIds } = body;

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
            kind: "invitation",
            workspaceId,
          },
          action: "update",
          targetAuthority,
        });

        if (!isAllowed) return problem({ title: "Forbidden", status: 403 });

        await db.update(invitations).set(body).where(eq(invitations.id, id));
      },
      {
        requireAuth: true,
        headers: "headers.workspaceId",
        body: invitationUpdateSchema,
      },
    )
    .delete(
      ":id",
      async ({ headers, session, params, problem }) => {
        const workspaceId = headers["cleon-workspace-id"];
        const { id } = params;

        const isAllowed = await checkPermissions({
          user: {
            id: session.userId,
          },
          resource: {
            kind: "invitation",
            workspaceId,
          },
          action: "delete",
        });

        if (!isAllowed) return problem({ title: "Forbidden", status: 403 });

        await db.delete(invitations).where(eq(invitations.id, id));
      },
      {
        requireAuth: true,
        headers: "headers.workspaceId",
      },
    )
    .post(
      "accept",
      async ({ session, body, problem }) => {
        const { invitationId } = body;

        const [invitation] = await db
          .select()
          .from(invitations)
          .where(
            and(
              eq(invitations.id, invitationId),
              eq(invitations.userId, session.userId),
            ),
          );

        if (!invitation || invitation.status !== "pending")
          return problem({ title: "Bad Request" });

        if (invitation.expiresAt.getTime() < Date.now())
          return problem({
            title: "Bad Request",
            code: "invitations.expired",
          });

        await db.transaction(async tx => {
          await tx
            .update(invitations)
            .set({ status: "accepted" })
            .where(eq(invitations.id, invitationId));

          await tx.insert(workspace_members).values({
            userId: invitation.userId,
            workspaceId: invitation.workspaceId,
          });

          await tx.insert(user_roles).values(
            invitation.roles.map(roleId => ({
              roleId,
              userId: invitation.userId,
            })),
          );
        });
      },
      {
        requireAuth: true,
        body: "invitation.id",
      },
    )
    .post(
      "decline",
      async ({ session, body, problem }) => {
        const { invitationId } = body;

        const [invitation] = await db
          .select()
          .from(invitations)
          .where(
            and(
              eq(invitations.id, invitationId),
              eq(invitations.userId, session.userId),
            ),
          );

        if (!invitation || invitation.status !== "pending")
          return problem({ title: "Bad Request" });

        if (invitation.expiresAt.getTime() < Date.now())
          return problem({
            title: "Bad Request",
            code: "invitations.expired",
          });

        await db
          .update(invitations)
          .set({ status: "declined" })
          .where(eq(invitations.id, invitationId));

        // TODO: Email notifications
      },
      {
        requireAuth: true,
        body: "invitation.id",
      },
    );

export default invitationsModule;
