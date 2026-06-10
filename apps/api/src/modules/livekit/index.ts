import Elysia from "elysia";
import { AccessToken, RoomConfiguration } from "livekit-server-sdk";
import { z } from "zod";
import env from "~/shared/env";
import authModule from "../auth";

const livekitModule = () =>
  new Elysia({
    name: "livekit",
    prefix: "/livekit",
    tags: ["LiveKit"],
  })
    .use(authModule())
    .post(
      "token",
      async ({ user, body: payload, status }) => {
        const at = new AccessToken(
          env.LIVEKIT_API_KEY,
          env.LIVEKIT_API_SECRET,
          {
            identity: user.id,
            name: user.name,
            attributes: {
              "test.agentId": payload.agentId,
            },
            ttl: "10m",
          },
        );

        const defaultRoom = `room-${Date.now()}`;

        at.addGrant({
          room: payload.room || defaultRoom,
          roomJoin: true,
          canPublish: true,
          canSubscribe: true,
          canSubscribeMetrics: true,
        });

        at.roomConfig = new RoomConfiguration({
          name: payload.room || defaultRoom,
          agents: [
            {
              agentName: "cleon",
            },
          ],
        });

        return status("Created", {
          token: await at.toJwt(),
        });
      },
      {
        requireAuth: true,
        body: z.object({
          room: z.string().min(3).optional(),
          agentId: z.uuidv7(),
        }),
        response: {
          201: z.object({ token: z.string() }),
        },
      },
    );

export default livekitModule;
