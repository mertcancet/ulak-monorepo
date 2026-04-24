import Elysia from "elysia";
import { z } from "zod";

const models = () =>
  new Elysia({
    name: "models",
  }).model({
    "created.response": z.object({ id: z.uuidv7() }),
  });

export default models;
