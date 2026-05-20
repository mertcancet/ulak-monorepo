import Elysia from "elysia";
import { z } from "zod";

const models = () =>
  new Elysia({
    name: "models",
  }).model({
    "created.response": z.object({ id: z.uuidv7() }),
    "headers.workspaceId": z
      .looseObject(z.object({ "cleon-workspace-id": z.uuidv7() }).shape)
      .toJSONSchema(),
    "headers.workspaceId-optional": z
      .looseObject(
        z.object({ "cleon-workspace-id": z.uuidv7().optional() }).shape,
      )
      .toJSONSchema(),
    "headers.cleonAgentSecret": z
      .looseObject(z.object({ "cleon-agent-secret": z.string() }).shape)
      .toJSONSchema(),
  });

export default models;
