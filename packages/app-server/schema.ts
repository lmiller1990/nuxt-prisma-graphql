import { makeSchema } from "nexus";
import { join } from "path";
import path from "path/posix";
import * as types from './types'

export const graphqlSchema = makeSchema({
  types,
  outputs: {
    typegen: join(__dirname, "nexus-typegen.ts"),
    schema: join(__dirname, "schema.graphql"),
  },
  contextType: {
    module: path.join(__dirname, "context.ts"),
    export: "Context",
  },
});
