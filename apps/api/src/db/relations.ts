import { defineRelations } from "drizzle-orm";
import * as schema from "~/db/schema";

const mainPart = defineRelations(schema);

const relations = {
  ...mainPart,
  ...schema.authRelations,
  ...schema.knowledgeBaseRelations,
};

export default relations;
