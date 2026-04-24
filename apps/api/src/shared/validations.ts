import { z } from "zod";

export const headerSchema = z.looseObject(
  z.object({ "cleon-workspace-id": z.uuidv7() }).shape,
);

export const idSchema = z.object({ id: z.uuidv7() });
