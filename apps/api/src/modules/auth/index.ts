import { type } from "arktype";
import Elysia from "elysia";
import { badRequestSchema } from "types/bad-request";

const Payload = type({
  username: "string.alphanumeric > 0",
  password: "string",
});

const authModule = () =>
  new Elysia({ prefix: "/auth", tags: ["Auth"] }).post(
    "login",
    () => {
      return {
        status: 200,
        id: "30PKTuqj4FstWTdFpQWS8PcxeHvZ1HFjxOUtAmriWGE=",
      };
    },
    {
      body: Payload,
      response: {
        400: badRequestSchema,
      },
    },
  );

export default authModule;
