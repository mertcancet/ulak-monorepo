import Elysia from "elysia";
import { z } from "zod";

const models = () =>
  new Elysia({
    name: "models",
  }).model({
    "created.response": z.object({ id: z.uuidv7() }),
    "headers.authorization": z.looseObject({ authorization: z.string() }),
    "headers.workspaceId": z
      .looseObject({ "cleon-workspace-id": z.uuidv7() })
      .toJSONSchema(),
    "headers.workspaceId-optional": z
      .looseObject({ "cleon-workspace-id": z.uuidv7().optional() })
      .toJSONSchema(),
    "headers.cleonAgentSecret": z
      .looseObject({ "cleon-agent-secret": z.string() })
      .toJSONSchema(),
  });

export default models;
