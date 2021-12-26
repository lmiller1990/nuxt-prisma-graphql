import { makeSchema } from "nexus";
import path from "path";
import * as types from './types'

export const graphqlSchema = makeSchema({
  types,
  outputs: {
    typegen: path.join(__dirname, "nexus-typegen.ts"),
    schema: path.join(__dirname, "schema.graphql"),
  },
  contextType: {
    module: path.join(__dirname, "context.ts"),
    export: "Context",
  },
});
