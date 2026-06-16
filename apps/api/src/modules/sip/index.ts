import {
  type SipInboundSettings,
  sipTrunkCreateSchema,
  sipTrunkSelectSchema,
  sipTrunkUpdateSchema,
} from "@cleon/shared";
import { eq, getColumns, sql } from "drizzle-orm";
import Elysia from "elysia";
import {
  SIPInboundTrunkInfo,
  SIPOutboundTrunkInfo,
  SipClient,
} from "livekit-server-sdk";
import { z } from "zod";
import db from "~/db";
import { sip_trunks } from "~/db/schema";
import models from "~/plugins/models";
import problemDetails from "~/plugins/problem-details";
import { checkPermissions } from "~/shared/auth-helpers";
import env from "~/shared/env";
import authModule from "../auth";

const sipClient = new SipClient(
  env.LIVEKIT_URL,
  env.LIVEKIT_API_KEY,
  env.LIVEKIT_API_SECRET,
);

const sipModule = () =>
  new Elysia({
    name: "sip",
    prefix: "/sip",
    tags: ["Sip"],
  })
    .use(models())
    .use(authModule())
    .use(problemDetails())
    .get(
      "trunks",
      async ({ session, headers, problem }) => {
        const workspaceId = headers["cleon-workspace-id"];

        const isAllowed = await checkPermissions({
          user: {
            id: session.userId,
          },
          resource: {
            kind: "sip_trunk",
            workspaceId,
          },
          action: "view",
        });

        if (!isAllowed) return problem({ title: "Forbidden", status: 403 });

        return await db
          .select({
            ...getColumns(sip_trunks),
            password: sql`${sql.param("*".repeat(12))}`,
          })
          .from(sip_trunks)
          .where(eq(sip_trunks.workspaceId, workspaceId));
      },
      {
        requireAuth: true,
        headers: "headers.workspaceId",
        response: {
          200: sipTrunkSelectSchema.array(),
          403: z.any(),
        },
      },
    )
    .post(
      "trunks",
      async ({ session, headers, body: payload, status, problem }) => {
        const workspaceId = headers["cleon-workspace-id"];

        const isAllowed = await checkPermissions({
          user: {
            id: session.userId,
          },
          resource: {
            kind: "sip_trunk",
            workspaceId,
          },
          action: "create",
        });

        if (!isAllowed) return problem({ title: "Forbidden", status: 403 });

        let lkTrunkId: string;

        if (payload.type === "inbound") {
          const trunk = await sipClient.createSipInboundTrunk(
            payload.name,
            payload.phoneNumbers,
            {
              allowedAddresses: payload.settings?.allowedAddresses || undefined,
              metadata: JSON.stringify({ workspaceId }),
              authUsername: payload.username || undefined,
              authPassword: payload.password || undefined,
            },
          );

          lkTrunkId = trunk.sipTrunkId;
        } else {
          const trunk = await sipClient.createSipOutboundTrunk(
            payload.name,
            payload.settings.address,
            payload.phoneNumbers,
            {
              transport: 0,
              metadata: JSON.stringify({ workspaceId }),
              authUsername: payload.username || undefined,
              authPassword: payload.password || undefined,
            },
          );

          lkTrunkId = trunk.sipTrunkId;
        }

        const [data] = await db
          .insert(sip_trunks)
          .values({
            ...payload,
            workspaceId,
            lkTrunkId,
          })
          .returning({ id: sip_trunks.id });

        return status("Created", data!);
      },
      {
        requireAuth: true,
        headers: "headers.workspaceId",
        body: sipTrunkCreateSchema,
        response: {
          201: "created.response",
          403: z.any(),
        },
      },
    )
    .patch(
      "trunks/:id",
      async ({ params, session, headers, body: payload, problem }) => {
        const workspaceId = headers["cleon-workspace-id"];

        const isAllowed = await checkPermissions({
          user: {
            id: session.userId,
          },
          resource: {
            kind: "sip_trunk",
            workspaceId,
          },
          action: "update",
        });

        if (!isAllowed) return problem({ title: "Forbidden", status: 403 });

        const [trunk] = await db
          .select()
          .from(sip_trunks)
          .where(eq(sip_trunks.id, params.id));

        if (!trunk) return problem({ title: "Not Found", status: 404 });

        if (payload.type !== trunk.type)
          return problem({
            title: "Bad Request",
            detail: "Trunk type mismatch.",
          });

        if (payload.type === "inbound") {
          await sipClient.updateSipInboundTrunk(
            trunk.lkTrunkId,
            new SIPInboundTrunkInfo({
              name: payload.name,
              numbers: payload.phoneNumbers,
              metadata: JSON.stringify({ workspaceId }),
              authUsername: payload.username || trunk.username || undefined,
              authPassword: payload.password || trunk.password || undefined,
              allowedAddresses:
                payload.settings?.allowedAddresses ||
                (trunk.settings as SipInboundSettings)?.allowedAddresses ||
                undefined,
            }),
          );

          await db.update(sip_trunks).set(payload);
          return;
        }

        await sipClient.updateSipOutboundTrunk(
          trunk.lkTrunkId,
          new SIPOutboundTrunkInfo({
            name: payload.name,
            metadata: JSON.stringify({ workspaceId }),
            numbers: payload.phoneNumbers || trunk.phoneNumbers,
            authUsername: payload.username || trunk.username || undefined,
            authPassword: payload.password || trunk.password || undefined,
            address: payload.settings?.address,
          }),
        );

        await db.update(sip_trunks).set(payload);
      },
      {
        requireAuth: true,
        headers: "headers.workspaceId",
        body: sipTrunkUpdateSchema,
      },
    )
    .delete(
      "trunks/:id",
      async ({ params, session, headers, problem }) => {
        const workspaceId = headers["cleon-workspace-id"];

        const isAllowed = await checkPermissions({
          user: {
            id: session.userId,
          },
          resource: {
            kind: "sip_trunk",
            workspaceId,
          },
          action: "delete",
        });

        if (!isAllowed) return problem({ title: "Forbidden", status: 403 });

        const [trunk] = await db
          .select({ lkTrunkId: sip_trunks.lkTrunkId })
          .from(sip_trunks)
          .where(eq(sip_trunks.id, params.id));

        if (!trunk) return problem({ title: "Not Found", status: 404 });

        await sipClient.deleteSipTrunk(trunk.lkTrunkId);
        await db.delete(sip_trunks).where(eq(sip_trunks.id, params.id));
      },
      {
        requireAuth: true,
        headers: "headers.workspaceId",
      },
    );

export default sipModule;
