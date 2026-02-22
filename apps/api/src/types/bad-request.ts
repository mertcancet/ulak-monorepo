import { type } from "arktype";

const badRequestModule = type.module({
  "#ValidationError": {
    path: "string",
    message: "string",
  },
  Schema: {
    title: "string",
    "detail?": "string",
    status: "100 < number < 599",
    instance: "string",
    "errors?": "ValidationError[]",
  },
});

export const badRequestSchema = badRequestModule.Schema;
export type BadRequest = typeof badRequestSchema.infer;
